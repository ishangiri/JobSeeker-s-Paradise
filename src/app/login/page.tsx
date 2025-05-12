'use client';

import SignInForm from '@/components/SignInForm';
import React from 'react'
import fetchData from '@/utils/fetchData';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { useUser } from '@/context/authContext';
import BackgroundImage from '@/components/BackgroundImage';
import CompanyMessage from '@/components/CompanyMessage';

const Page = () => {


  const {setAuthenticated} = useUser();

  const router = useRouter();
  const {toast} = useToast();
  const [isLoading, setIsLoading] = React.useState(false);

    const onSubmit = async(data :object) => {
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

     } catch(error : any){
      console.log(error);
      toast({
        title: `${error?.response?.data.msg}`,
        description: "There was a problem with your request.",
      })
      setIsLoading(false);
     }

    }


    return (
      <div className="relative min-h-screen flex flex-col space-y-10 items-center justify-center overflow-hidden">
        <BackgroundImage />
        <CompanyMessage />
        <SignInForm onSubmit={onSubmit} loading={isLoading} />
      </div>
    );
  
}

export default Page