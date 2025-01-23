"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/NavBar";
import JobContainer from "@/components/JobContainer";
import { useJobs } from "@/context/jobsContext";
import { useRouter } from "next/navigation";
import SearchBar from "@/components/SearchBar";
import { useUser } from "@/context/authContext";
import Loading from "./loading";

export default function Home() {
  const router = useRouter();
  
  // Using context
  const { jobs, loading } = useJobs();
  const {authenticated} = useUser();
  
  
  const [searchValue, setSearchValue] = useState("");
  const [locationValue, setLocationValue] = useState("");
  const [filteredJobs, setFilteredJobs] = useState(jobs); // Initially show all jobs


   // Update filteredJobs when jobs are fetched
   useEffect(() => {
    setFilteredJobs(jobs);
  }, [jobs]);

  useEffect(() => {
    if ( authenticated) {
      router.push("/dashboard");
    }
  }, [authenticated, router]);

  if (loading) {
    return <Loading />; // Show loader until auth check finishes
  }


  // Filter jobs based on search input
  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchValue(e.target.value);
    const searchValues = e.target.value.toLowerCase();
    const filtered = jobs.filter(
      (job) =>
        job.position.toLowerCase().includes(searchValues) ||
        job.company.toLowerCase().includes(searchValues) ||
        job.jobLocation.toLowerCase().includes(searchValues)
    );
    setFilteredJobs(filtered);
  };

  const onchangeInputLocationValue = (e: React.ChangeEvent<HTMLInputElement>): void => { 
    setLocationValue(e.target.value);
    const searchValues = e.target.value.toLowerCase();
    const filtered = jobs.filter(
      (job) =>
        job.jobLocation.toLowerCase().includes(searchValues)
    );
    setFilteredJobs(filtered);
  }

  const searchJobs = () => {
    if (searchValue.trim() === "") {
      setFilteredJobs(jobs); // Reset to all jobs if search is empty
    } else if(locationValue.trim() === ""){
       setFilteredJobs(jobs);
    }
    else{
      const lowerCasedValue = searchValue.toLowerCase() || locationValue.toLowerCase();
      const filtered = jobs.filter(
        (job) =>
          job.position.toLowerCase().includes(lowerCasedValue) ||
          job.company.toLowerCase().includes(lowerCasedValue) ||
          job.jobLocation.toLowerCase().includes(lowerCasedValue)
      );
      setFilteredJobs(filtered);
    }
  };





  return (
    <div>
      <Navbar />
      <SearchBar
        searchValue={searchValue}
        onChangeInputValue={onChangeValue}
        onClick={searchJobs}
        LocationValue={locationValue}
        onchangeInputLocationValue={onchangeInputLocationValue}
      />
      <JobContainer
        allJobs={filteredJobs}
        loading={loading}
      />
    </div>
  );
}

