'use client';
import React, { useState, useEffect } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import UserProfile, { UserProfileFormValues } from '@/components/UserProfile';
import fetchData from '@/utils/fetchData';
import { useUser } from '@/context/authContext';
import { toast } from 'react-toastify';


// Form schema definition
const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Company name must be at least 2 characters.',
  }),
  location: z.string().min(2, {
    message: 'Location must be at least 2 characters.',
  }),
});



export default function Page(){
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [uploadLoading, setUploadLoading] = useState(false);
  const { user, setUser } = useUser(); // Assuming setUser is available

  const form = useForm<UserProfileFormValues>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (user?.name || user?.location) {
      form.reset({
        name: user.name || '',
        location: user.location || '',
      });
      setIsLoading(false);
    }
    console.log(user);
  }, [user, form]);

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const uploadAvatar = async () => {
    if (!image) {
      toast.error('Please select an image before uploading.');
      return;
    }

    const formData = new FormData();
    formData.append('avatar', image);

    try {
      setUploadLoading(true);
      const response = await fetchData.patch('api/applicants/updateApplicantAvatar', formData);
      toast.success('Applicant updated successfully!');
      // Update user context with new avatar
      setUser({ ...user, avatar: response.data.avatar }); // Assuming response includes updated avatar URL
    } catch (err: string | any) {
      console.error(err);
      toast.error(err?.response?.data?.message || 'Failed to upload avatar.');
    }
    setUploadLoading(false);
  };

  const onSubmit = async (data: UserProfileFormValues) => {
    try {
      console.log('Form data being sent:', data);
      const response = await fetchData.patch('api/applicants/updateApplicant', data);
      console.log('Backend response:', response);
      toast.success('Applicant updated successfully!');
      // Update user context with new data
      setUser({ ...user, ...data });
      // Update form with new values
      form.reset(data);
    } catch (err: any) {
      console.log('Error response:', err);
      toast.error(err?.response?.data?.message || 'Failed to update profile');
    }
    setIsEditing(false);
  };

  const resetForm = () => {
    form.reset();
    setImagePreview(null);
    setImage(null);
  };

  return (
    <UserProfile
      form={form}
      isLoading={isLoading}
      isEditing={isEditing}
      setIsEditing={setIsEditing}
      imagePreview={imagePreview}
      user={user}
      onImageChange={onImageChange}
      onSubmit={onSubmit}
      uploadAvatar={uploadAvatar}
      uploadLoading={uploadLoading}
      resetForm={resetForm}
    />
  );
};

