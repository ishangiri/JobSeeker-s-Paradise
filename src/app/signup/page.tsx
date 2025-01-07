'use client';

import React, {useEffect}from 'react'
import { SignUpForm } from '@/components/SignUpForm'
import { useRouter } from 'next/navigation';
import fetchData from '@/utils/fetchData';
import { useUser } from '@/context/authContext';
import { useToast } from '@/hooks/use-toast';
const page = () => {
    
    const {toast} = useToast();
    const router = useRouter();
    const { setUserData, userData } = useUser();

    const onsubmit = async(data: any) => {
       
       try{
         await fetchData.post('/api/otp/send-applicant-otp', data);
         setUserData(data);
         router.push('/otp');
        }catch(error : any){
            console.log(error);
            toast({
                variant : "destructive",
                title : error,
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
    <div> <SignUpForm onSubmit={onsubmit} /></div>
  )
}

export default page