'use client';
import fetchData from '@/utils/fetchData'
import React, { useEffect, useState } from 'react'
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import DashboardNavBar from '@/components/DashboardNavBar';
import DashboardSidebar from '@/components/DashboardSidebar';
import { useJobs } from '@/context/jobsContext';
import JobContainer from '@/components/JobContainer';

interface Job{
 company : string,
position : string,
salary : string,
jobType : string,
jobLocation : string,
jobDescription : string,
_id : string,
updatedAt : string
}


const page = () => {

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

export default page