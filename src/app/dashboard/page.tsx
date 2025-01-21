"use client";
import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/NavBar";
import JobContainer from "@/components/JobContainer";
import { useJobs } from "@/context/jobsContext";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/authContext";
import SearchBar from "@/components/SearchBar";
import Unauthenticated from "@/components/Unauthenticated";
import Loading from "../loading";

export default function Home() {
    const router = useRouter();
    const { jobs, loading: jobsLoading } = useJobs();
    const { checkAuthentication, authenticated } = useUser();
    const [searchValue, setSearchValue] = useState("");
    const [locationValue, setLocationValue] = useState("");
    const [filteredJobs, setFilteredJobs] = useState(jobs);
   

    // Check authentication on mount
    useEffect(() => {
        const verifyAuth = async () => {
       
            try {
                await checkAuthentication();
            } catch (error) {
                console.error("Authentication check failed:", error);
            } 
          
        };
        verifyAuth();
    }, []); // Remove dependencies to prevent infinite loop

    // Update filtered jobs when jobs data changes or search criteria change
    useEffect(() => {
        filterJobs();
    }, [jobs, searchValue, locationValue]);

    const filterJobs = () => {
        if (!jobs) return;
        
        let filtered = [...jobs];

        // Apply search filter
        if (searchValue.trim()) {
            const searchTerm = searchValue.toLowerCase();
            filtered = filtered.filter(job => 
                job.position.toLowerCase().includes(searchTerm) ||
                job.company.toLowerCase().includes(searchTerm)
            );
        }

        // Apply location filter
        if (locationValue.trim()) {
            const locationTerm = locationValue.toLowerCase();
            filtered = filtered.filter(job => 
                job.jobLocation.toLowerCase().includes(locationTerm)
            );
        }

        setFilteredJobs(filtered);
    };

    const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

    const handleLocationInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocationValue(e.target.value);
    };

    const handleSearch = () => {
        filterJobs();
    };

    const handleJobClick = () => {
        console.log("Job clicked:");
        // Add your job click handling logic here
    };

  

    return (
        <div className="min-h-screen">
            <SearchBar
                searchValue={searchValue}
                onChangeInputValue={handleSearchInputChange}
                onClick={handleSearch}
                LocationValue={locationValue}
                onchangeInputLocationValue={handleLocationInputChange}
            />
            <JobContainer
                allJobs={filteredJobs}
                onClick={handleJobClick}
                loading={jobsLoading}
            />
        </div>
    );
}