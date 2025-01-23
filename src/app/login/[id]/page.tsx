'use client';

import SignInForm from '@/components/SignInForm';
import React, { useEffect, useState } from 'react'
import fetchData from '@/utils/fetchData';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from '@/components/ui/toast';
import { useUser } from '@/context/authContext';
import { useParams } from 'next/navigation';
import JobApplyLogin from '@/components/JobApplyLogin';

const Page = () => {



 const [jobtitle, setJobTitle] = useState<string>("");
 const [company, setCompany] = useState<string>("");
  const {id} = useParams();
  const {setAuthenticated} = useUser();


  useEffect(() => {
    const fetchJob = async () => {
        try {
            const response = await fetchData.get(`/applicants/jobs/${id}`);
            const job = response.data.job;
            setJobTitle(job.position);
            setCompany(job.company);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };

    fetchJob();
}, []);

  const router = useRouter();
  const {toast} = useToast();

    const onsubmit = async(data :object) => {
     try{
      console.log(data);
      await fetchData.post('/api/auth/loginApplicant', data);
        toast({
          description: "Logged In Successfully",
        })
        router.push(`/dashboard/jobDetails/${id}`);
        setAuthenticated(true);

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
    <div className='min-h-screen flex flex-col items-center justify-center'>
       <JobApplyLogin position={jobtitle} company={company} />
        <SignInForm onSubmit={onsubmit} />
       
    </div>
  )
}

export default Page