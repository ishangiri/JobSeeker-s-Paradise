'use client';
import React from 'react'
import OtpForm from '@/components/OtpForm'
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/authContext';
import fetchData from '@/utils/fetchData';
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from '@/components/ui/toast';

interface otp {
    otp : string,
}



const Page = () => {


    const router = useRouter();
    const {userData} = useUser();
    const {toast} = useToast();

    

    const onsubmit = async(otp : otp ) => {
        //combining the otp and userData
        const combinedData = { ...userData, ...otp };
        console.log(combinedData);
     try{  
        await fetchData.post('/api/auth/registerApplicant', combinedData);
        toast({
            title : "Registered Successfully",
            description : "Please log in to start applying for jobs"
        })
        router.push('/login');

      }catch(error){
        console.log(error);
        toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "There was a problem with your request.",
            action: <ToastAction altText="Try again">Try again</ToastAction>,
          })
      }
    };

  return (
    <div className='min-h-screen flex justify-center items-center'>
    <OtpForm onSubmit={onsubmit} />
    </div>
  )

}

export default Page