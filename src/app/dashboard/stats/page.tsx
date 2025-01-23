"use client";

import React, { useEffect, useState } from "react";
import JobStatsDashboard from "@/components/JobStatsDashboard";
import fetchData from "@/utils/fetchData";

interface ApplicantType {
  _id: string;
  name: string;
  email: string;
  appliedJobs: {
    jobId: string;
    status: "pending" | "declined" | "interview";
    _id: string;
  }[];
}

const Page = () => {
  const [applicant, setApplicant] = useState<ApplicantType | null>(null);

  useEffect(() => {
    const getApplicant = async () => {
      try {
        const response = await fetchData.get("/api/applicants/getApplicant");
        console.log("API Response:", response.data); 
        setApplicant(response.data.userWIthoutpass);
      } catch (error) {
        console.error("Error fetching applicant data:", error);
      }
    };

    getApplicant();
  }, []);

  return (
    <div>
      {applicant ? (
        <JobStatsDashboard applicant={applicant} />
      ) : (
        <div className="text-center text-gray-500">Loading...</div>
      )}
    </div>
  );
};

export default Page;
