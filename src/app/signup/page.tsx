'use client';
import React, {useEffect, useState}from 'react'
import { SignUpForm } from '@/components/SignUpForm'
import { useRouter } from 'next/navigation';
import fetchData from '@/utils/fetchData';
import { useUser } from '@/context/authContext';
import { useToast } from '@/hooks/use-toast';

interface signUp{
   name: string,
   lastName: string
   email: string,
   password: string,
   location: string,
}

const Page = () => {
    
    const {toast} = useToast();
    const router = useRouter();
    const { setUserData, userData } = useUser();
    const [isLoading, setIsLoading] = useState(false);

    const onsubmit = async(data: signUp) => {
       
       try{
        setIsLoading(true);
         await fetchData.post('/api/otp/send-applicant-otp', data);
         setUserData(data);
         setIsLoading(false);
         router.push('/otp');
          toast({
              title : "OTP Sent",
              description : "Please check your email for the OTP" })
        }catch (err){
            console.log(err);
            toast({
                variant : "destructive",
                title : "Error",
                description : "Something went wrong"
          })
        }
       }

    useEffect(() => {
        if (userData) {
          console.log('Updated userData:', userData);
        }
      }, [userData]);
  return (
    <div> <SignUpForm loading={isLoading} onSubmit={onsubmit} /></div>
  )
}

export default Page;