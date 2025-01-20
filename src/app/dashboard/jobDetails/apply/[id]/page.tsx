"use client";
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ResumeUploadForm from '@/components/JobApply';
import fetchData from '@/utils/fetchData';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { Briefcase, Building2 } from 'lucide-react';

export default function page() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const params = useParams();
  const router = useRouter();
  const {id} = params;
  const {toast} = useToast();
  const [isUploading, setUploading] = useState(false);
  const [job, setJob] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async() => {
      setIsLoading(true);
      try {
        const response = await fetchData.get(`/api/applicants/jobs/${id}`);
        const job = response.data.job.position;
        setJob(job);
      } catch(error) {
        console.log(error);
        toast({
          variant: "destructive",
          description: "Failed to load job details",
        });
      } finally {
        setIsLoading(false);
      }
    }
    fetchJob();
  }, []);

  const handleFileUpload = async(file: File) => {
    const formData = new FormData();
    formData.append("resume", file);
    setUploading(true);
    try {
      await fetchData.post(`/api/applicants/applyJob/${id}`, formData);
      toast({
        description: "Application submitted successfully! We'll be in touch soon.",
      });
      setUploading(false);
      setUploadedFile(null);
    } catch(error) {
      console.log(error);
      toast({
        variant: "destructive",
        description: "Unable to submit application. Please try again.",
      });
      setUploading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Header Section */}
          <div className="text-center space-y-4 mb-8">
            <div className="inline-block p-2 bg-blue-100 rounded-full mb-4">
              <Briefcase className="h-8 w-8 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">
              Join Our Team
            </h1>
            {!isLoading && (
              <div className="bg-white/60 backdrop-blur-lg rounded-lg p-6 mt-4 border border-blue-100 shadow-sm">
                <h2 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  {job}
                </h2>
                <p className="text-gray-600 mt-2">
                  Take the next step in your career journey
                </p>
              </div>
            )}
          </div>

          {/* Main Content */}
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-blue-100 overflow-hidden">
            <div className="px-6 py-8 sm:p-10">
              <div className="space-y-6">
                {/* Steps */}
                <div className="flex justify-center space-x-12 mb-8">
             

                {/* Form */}
                <ResumeUploadForm
                  onSubmit={handleFileUpload}
                  isLoading={isUploading}
                  uploadedFile={uploadedFile}
                  setUploadedFile={setUploadedFile}
                />
              </div>
            </div>
          </div>

          {/* Footer Note */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              By submitting your application, you agree to our terms and conditions.
              Your information will be handled according to our privacy policy.
            </p>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}