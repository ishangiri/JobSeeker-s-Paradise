'use client';
import React, {useState, useEffect} from 'react';
import { Navbar } from "@/components/NavBar";
import JobContainer from '@/components/JobContainer';
import fetchData from '@/utils/fetchData';
import { useRouter } from 'next/navigation';

export default function Home() {

  const router = useRouter();
  const [allJobs, setJobs] = useState<any[]>([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetchData.get('applicants/jobs');
        setJobs(response.data.jobs);
        
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } 
    };

    fetchJobs();
  }, []);

const viewDetails = () => {
  router.push('/login');
}


  return (

    <div>
      <Navbar />
       <JobContainer allJobs={allJobs} onClick={viewDetails}/>
    </div>
     )
  
}