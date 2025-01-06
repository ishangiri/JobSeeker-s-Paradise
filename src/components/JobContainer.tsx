'use client';

import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { BsCursorFill } from 'react-icons/bs';
import fetchData from '@/utils/fetchData';

const JobContainer = () => {
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


  return (
    <div>
   <div className='flex flex-wrap gap-6 justify-center'>
     
  
      {allJobs.map((job) => {
        const jobID = job._id;
        const date = job.updatedAt;
       const time =  new Date(date).toLocaleDateString();
        return (
          <div key={job._id}  className="border bg-gray-700 text-cyan-50 border-gray-700 sm:w-1/2 lg:w-1/3 rounded-xl p-6 m-6 w-full shadow-lg">
          <section className="flex flex-col gap-6">
          <div className="flex justify-between">
            <p className="font-semibold">Position:</p>
            <p>{job.position}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-semibold">Company:</p>
            <p>{job.company}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-semibold">Job Type:</p>
            <p>{job.jobType}</p>
          </div>
          
          <div className="flex justify-between">
          <div className='flex'><BsCursorFill/> <p>{job.jobLocation}</p></div>
            <p className='font-semibold italic'>{time}</p>
          </div>
          <div className='flex justify-center items-center'>
            <Button className='hover:bg-cyan-50 hover:text-slate-900 rounded-xl'>View Details</Button>
          </div>

        </section>
        </div>
        )
      })}
   
    </div>
    </div>
  );
};

export default JobContainer;
