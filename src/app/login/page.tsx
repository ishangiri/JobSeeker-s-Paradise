'use client';

import SignInForm from '@/components/SignInForm';
import React from 'react'
import fetchData from '@/utils/fetchData';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from '@/components/ui/toast';

const page = () => {

  const router = useRouter();
  const {toast} = useToast();

    const onsubmit = async(data: any) => {
     try{
      console.log(data);
      await fetchData.post('/api/auth/loginApplicant', data);
        toast({
          description: "Logged In Successfully",
        })
        router.push('/dashboard');

     } catch(error){
      console.log(error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      })
     }
    }

  return (
    <div>
        <SignInForm onSubmit={onsubmit} />
       
    </div>
  )
}

export default page