'use client';

import JobDetails from '@/components/JobDetails';
import fetchData from '@/utils/fetchData';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Job {
    company: string;
    position: string;
    salary: string;
    jobType: string;
    jobLocation: string;
    jobDescription: string;
    _id: string;
    updatedAt: string;
}

export default function Page() {
    const params = useParams();
    const { id } = params;
    const [job, setJob] = useState<Job | undefined>();

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const response = await fetchData.get(`/api/applicants/jobs/${id}`);
                const job = response.data.job;
                setJob(job);
                console.log(response);
            } catch (error) {
                console.log(error);
            }
        };

        fetchJob();
    }, [id]);

    const handleApply = () => {
        console.log("Applied");
        
    }

    // Conditional rendering to handle undefined job state
    if (!job) {
        return <div>Loading...</div>; // Or any loading state you'd like
    }

    return (
        <div>
            <JobDetails 
                position={job.position} 
                company={job.company} 
                jobDescription={job.jobDescription} 
                jobLocation={job.jobLocation} 
                jobType={job.jobType} 
                updatedAt={job.updatedAt} 
                handleApply={handleApply}
                salary={job.salary}
            />
        </div>
    );
}

