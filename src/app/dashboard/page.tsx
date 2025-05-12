"use client";
import React, { useState, useEffect } from "react";
import JobContainer from "@/components/JobContainer";
import { useJobs } from "@/context/jobsContext";
import SearchBar from "@/components/SearchBar";
import { useUser } from "@/context/authContext";
import {useRouter} from "next/navigation";

export default function Home() {
  const { jobs, loading: jobsLoading } = useJobs();
  const [searchValue, setSearchValue] = useState("");
  const [locationValue, setLocationValue] = useState("");
  const [filteredJobs, setFilteredJobs] = useState(jobs);

  const {authenticated} = useUser();
  const router = useRouter();
  
//if not authenticated, redirect to login page
useEffect(() => {
  if(!authenticated){
    router.push('/login');
   }
   return;
},[authenticated, router]);

  // Update filtered jobs when jobs data changes or search criteria change
  useEffect(() => {
    filterJobs();
  }, [jobs, searchValue, locationValue]);

  const filterJobs = () => {
    if (!jobs) return;
    let filtered = [...jobs];
    if (searchValue.trim()) {
      const searchTerm = searchValue.toLowerCase();
      filtered = filtered.filter(job => 
        job.position.toLowerCase().includes(searchTerm) ||
        job.company.toLowerCase().includes(searchTerm)
      );
    }
    if (locationValue.trim()) {
      const locationTerm = locationValue.toLowerCase();
      filtered = filtered.filter(job => 
        job.jobLocation.toLowerCase().includes(locationTerm)
      );
    }
    setFilteredJobs(filtered);
  };




  return (
    <div className="min-h-screen">
      <SearchBar
        searchValue={searchValue}
        onChangeInputValue={(e) => setSearchValue(e.target.value)}
        onClick={filterJobs}
        LocationValue={locationValue}
        onchangeInputLocationValue={(e) => setLocationValue(e.target.value)}
      />
      <JobContainer
        allJobs={filteredJobs}
        loading={jobsLoading}
      />
    </div>
  );
}


