'use client';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Camera, Edit2 } from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

// Define types for the form values
export interface UserProfileFormValues {
  name: string;
  location: string;
}

// Define the props interface
interface CompanyProfileProps {
  form: UseFormReturn<UserProfileFormValues>;
  isLoading: boolean;
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
  imagePreview: string | null;
  user: {
    email?: string;
    avatar?: string;
    name?: string;
    location?: string;
  } | null;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (data: UserProfileFormValues) => void;
  uploadAvatar: () => void;
  uploadLoading: boolean;
  resetForm: () => void;

}

const UserProfile: React.FC<CompanyProfileProps> = ({
  form,
  isLoading,
  isEditing,
  setIsEditing,
  imagePreview,
  user,
  onImageChange,
  onSubmit,
  uploadAvatar,
  uploadLoading,
  resetForm,

}) => {
  if (isLoading) {
    return (
      <Card className="w-full max-w-xl mx-auto">
        <CardContent className="p-6">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card style={{ backgroundColor: "#EEEE", color: "black" }} className="w-full max-w-xl mx-auto">
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold">Company Profile</CardTitle>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setIsEditing(!isEditing)}
          >
            <Edit2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex flex-col items-center space-y-6">
          {/* Avatar Section */}
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border-4 border-white shadow-lg">
              <img 
                src={imagePreview ? imagePreview : user?.avatar} 
                alt="Company avatar" 
                className="w-full h-full object-cover" 
              />
            </div>
            {isEditing && (
              <label 
                htmlFor="avatar" 
                className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-lg cursor-pointer hover:bg-gray-50 border border-gray-200"
              >
                <Camera className="w-5 h-5 text-gray-600" />
                <input
                  id="avatar"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={onImageChange}
                />
              </label>
            )}
          </div>

          {/* Email display */}
          <div className="text-center">
            <p className="text-sm">Email</p>
            <p className="font-light">{user?.email}</p>
          </div>
          
          {isEditing && 
            <Button onClick={uploadAvatar}>
              {uploadLoading ? "Uploading Avatar..." : "Upload Avatar"}
            </Button>
          }

          <Separator className="my-4" />

          {/* Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      {isEditing ? (
                        <Input {...field} className="w-full" />
                      ) : (
                        <p className="font-bold pt-2">{field.value}</p>
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      {isEditing ? (
                        <Input {...field} className="w-full" />
                      ) : (
                        <p className="font-bold pt-2">{field.value}</p>
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {isEditing && (
                <div className="flex gap-4 text-black">
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="w-full"
                    onClick={() => {
                      setIsEditing(false);
                      resetForm();
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="w-full">
                    Save Changes
                  </Button>
                </div>
              )}
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfile;