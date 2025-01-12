"use client";
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import fetchData from '@/utils/fetchData';

interface Job {
 company : string,
 position : string,
 salary : string,
 jobType : string,
 jobLocation : string,
 jobDescription : string,
 _id : string,
 updatedAt : string
}

interface jobsContextType {
  jobs : Job[],
  loading : boolean,
}

interface JobsProviderProps {
   children  : ReactNode,
}

    const jobsContext = createContext<jobsContextType | undefined>(undefined);


    export const useJobs = () : jobsContextType => {
     const context = useContext(jobsContext);
     if(!context){
        throw new Error("No context found")
     }
     return context;
    }

    
    export const JobsProvider = ({children} : JobsProviderProps) => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchJobs = async () => {
          try {
            const response = await fetchData.get('applicants/jobs');
            setJobs(response.data.jobs);
            setLoading(false);
          } catch (error) {
            console.error('Error fetching jobs:', error);
          }
        };
    
        fetchJobs();
      }, []);



        return (
            <jobsContext.Provider value={{jobs, loading}}>
               {children}
            </jobsContext.Provider>
        )



    }



