import React, { SetStateAction } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload } from 'lucide-react';
import { Form, FormField, FormItem, FormControl } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FileText, X } from 'lucide-react';

interface ResumeUploadFormProps {
  onSubmit: (file: File) => Promise<void>;
  isLoading: boolean;
  uploadedFile : File | null;
  setUploadedFile : React.Dispatch<SetStateAction<File | null>>;
}

const schema = z.object({
  resume: z
    .custom<File>((value) => value instanceof File, {
      message: 'Please upload a valid file.',
    })
    .refine(
      (file) =>
        ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type),
      { message: 'File must be a PDF or Word document.' }
    ),
});

export default function ResumeUploadForm({ onSubmit, isLoading, uploadedFile, setUploadedFile }: ResumeUploadFormProps) {
 

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: { resume: undefined },
  });

  const handleSubmit = async (data: { resume: File | undefined }) => {
    if (!data.resume) {
      return;
    }
    try {
      await onSubmit(data.resume);
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <Form {...form}>
      <form
        className="space-y-6"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <FormField
          control={form.control}
          name="resume"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div 
                  className={`
                    relative group
                    mt-1 flex flex-col items-center justify-center 
                    px-6 pt-5 pb-6 
                    border-2 border-dashed 
                    rounded-xl
                    transition-all duration-200
                    ${uploadedFile ? 'border-green-300 bg-green-50' : 'border-blue-200 hover:border-blue-400'}
                    ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                  `}
                >
                  <div className="space-y-4 text-center">
                    {/* Icon */}
                    <div className="mx-auto rounded-full p-2 bg-blue-50 group-hover:bg-blue-100 transition-colors duration-200">
                      {uploadedFile ? (
                        <FileText className="h-8 w-8 text-blue-600" />
                      ) : (
                        <Upload className="h-8 w-8 text-blue-600" />
                      )}
                    </div>

                    {/* Upload Area */}
                    <div className="space-y-2">
                      <label
                        htmlFor="resume"
                        className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                      >
                        <span className="inline-flex items-center">
                          {uploadedFile ? 'Change file' : 'Upload your resume'}
                        </span>
                        <Input
                          id="resume"
                          type="file"
                          className="sr-only"
                          accept=".pdf,.doc,.docx"
                          disabled={isLoading}
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              field.onChange(file);
                              setUploadedFile(file);
                            }
                          }}
                        />
                      </label>
                      
                      {!uploadedFile && (
                        <>
                          <p className="text-sm text-gray-500">
                            or drag and drop your file here
                          </p>
                          <p className="text-xs text-gray-400">
                            PDF or Word documents up to 100MB
                          </p>
                        </>
                      )}
                    </div>

                    {/* Uploaded File Info */}
                    {uploadedFile && (
                      <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                        <FileText className="h-4 w-4" />
                        <span className="font-medium">{uploadedFile.name}</span>
                        <button
                          type="button"
                          onClick={() => setUploadedFile(null)}
                          className="p-1 rounded-full hover:bg-gray-100"
                        >
                          <X className="h-4 w-4 text-gray-500" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </FormControl>
            </FormItem>
          )}
        />

        <Button 
          type="submit" 
          className={`
            w-full h-12 
            bg-gradient-to-r from-blue-600 to-indigo-600 
            hover:from-blue-700 hover:to-indigo-700 
            text-white font-medium
            rounded-lg 
            transition-all duration-200
            ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
          `}
          disabled={isLoading || !uploadedFile}
        >
          {isLoading ? (
            <span className="flex items-center space-x-2">
              <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
              <span>Uploading...</span>
            </span>
          ) : uploadedFile ? (
            'Submit Application'
          ) : (
            'Upload Resume to Continue'
          )}
        </Button>
      </form>
    </Form>
  );
}
