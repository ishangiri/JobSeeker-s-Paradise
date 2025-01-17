'use client';

import React from 'react'
import { useJobs } from '@/context/jobsContext';
import JobContainer from '@/components/JobContainer';




const Page = () => {

  const {jobs, loading} = useJobs();
  



  const applyJOb = () => {
    console.log("Applied");
    
  }
    
  return (
    <div className="p-6">

     <JobContainer allJobs={jobs} onClick={applyJOb} loading={loading} />
      </div>
  
  )
}

export default Page