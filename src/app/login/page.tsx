'use client';

import SignInForm from '@/components/SignInForm';
import React, { useEffect } from 'react'
import fetchData from '@/utils/fetchData';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from '@/components/ui/toast';
import { useUser } from '@/context/authContext';

const Page = () => {


  const {setAuthenticated, authenticated} = useUser();

  const router = useRouter();
  const {toast} = useToast();
  const [isLoading, setIsLoading] = React.useState(false);

    const onsubmit = async(data :object) => {
     try{
      console.log(data);
      setIsLoading(true);
      await fetchData.post('/api/auth/loginApplicant', data);
      setIsLoading(false);
        toast({
          description: "Logged In Successfully",
        })
        router.push('/dashboard');
        setAuthenticated(true);

     } catch(error){
      console.log(error);
      toast({
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      })
     }

    }

    useEffect(() => {
     if(authenticated){
       router.push('/dashboard');
     }
    },[])


  return (
    <div className=' flex justify-center items-center min-h-screen bg-gradient-to-br from-slate-300 to-slate-900 '>
        <SignInForm onSubmit={onsubmit} loading={isLoading} />
       
    </div>
  )
}

export default Page