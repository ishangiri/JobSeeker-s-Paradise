'use client';
import React, { useState, useEffect } from 'react';
import { Navbar } from "@/components/NavBar";
import JobContainer from '@/components/JobContainer';
import fetchData from '@/utils/fetchData';
import { useRouter } from 'next/navigation';
import SearchBar from '@/components/SearchBar';

export default function Home() {

  const router = useRouter();
  const [allJobs, setJobs] = useState<any[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [filteredJobs, setFilteredJobs] = useState<any[]>([]); // To store filtered jobs
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetchData.get('applicants/jobs');
        setJobs(response.data.jobs);
        setFilteredJobs(response.data.jobs); // Initialize filteredJobs
        setLoading(false);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  const viewDetails = () => {
    router.push('/login');
  };

  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchValue(e.target.value);
    const searchValues = (e.target.value).toLowerCase();
    const filtered = allJobs.filter(job =>
      job.position.toLowerCase().includes(searchValues) ||
      job.company.toLowerCase().includes(searchValues)
    );
    setFilteredJobs(filtered);
  };

  const searchJobs = () => {
    if (searchValue.trim() === "") {
      setFilteredJobs(allJobs); // Reset to all jobs if search is empty
    } else {
      const lowerCasedValue = searchValue.toLowerCase();
      const filtered = allJobs.filter(job =>
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
      <SearchBar value={searchValue} onChangeInputValue={onChangeValue} onClick={searchJobs} />
      <JobContainer allJobs={filteredJobs} onClick={viewDetails} loading = {loading} />
    </div>
  );
}
