'use client';
import React, {useState} from 'react'
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
    const [isLoading, setIsLoading] = useState(false);

    

    const onsubmit = async(otp : otp ) => {
        //combining the otp and userData
        const combinedData = { ...userData, ...otp };
        console.log(combinedData);
     try{  
        setIsLoading(true);
        await fetchData.post('/api/auth/registerApplicant', combinedData);
        setIsLoading(false);
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
    <div className='min-h-screen flex flex-col justify-center items-center bg-slate-500'>
      <div>
        <h2 className='p-4 font-bold text-slate-900 text-lg' >Verify your email in order to continue to <span className='text-blue-900'>Job Seekers Paradise</span></h2>
      </div>
    <OtpForm loading={isLoading} onSubmit={onsubmit} />
    </div>
  )

}

export default Page