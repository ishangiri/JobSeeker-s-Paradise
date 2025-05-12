"use client";
import React, { useEffect, useState } from "react";
import JobStatsDashboard from "@/components/JobStatsDashboard";
import fetchData from "@/utils/fetchData";
import AppliedJobs from "@/components/AppliedJobs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, User, Briefcase } from "lucide-react";

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
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getApplicant = async () => {
      try {
        setLoading(true);
        const response = await fetchData.get("/api/applicants/getApplicant");
        console.log("API Response:", response.data);
        setApplicant(response.data.userWIthoutpass);
        setError(null);
      } catch (error) {
        console.error("Error fetching applicant data:", error);
        setError("Failed to load your profile. Please refresh or try again later.");
      } finally {
        setLoading(false);
      }
    };
    
    getApplicant();
  }, []);

  if (loading) {
    return (
      <div className="w-full max-w-6xl mx-auto p-4 md:p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-slate-200 rounded-md w-1/3"></div>
          <div className="h-64 bg-slate-200 rounded-md"></div>
          <div className="h-64 bg-slate-200 rounded-md"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-6xl mx-auto p-4 md:p-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-8">
      {applicant ? (
        <>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold flex items-center">
                <User className="mr-2 h-6 w-6 text-slate-500" />
                Welcome, {applicant.name}
              </h1>
              <p className="text-slate-500">{applicant.email}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">
                {applicant.appliedJobs?.length || 0} Applications
              </span>
            </div>
          </div>

          <Tabs defaultValue="applications" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="applications" className="sm:text-lg text-base font-bold">
                <Briefcase className="w-4 h-4 mr-2" />
                Applications
              </TabsTrigger>
              <TabsTrigger value="stats" className="sm:text-lg text-base font-blod">
                <Briefcase className="w-4 h-4 mr-2" />
                Statistics
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="applications" className="mt-0">
              <AppliedJobs />
            </TabsContent>
            
            <TabsContent value="stats" className="mt-0">
              <JobStatsDashboard applicant={applicant} />
            </TabsContent>
          </Tabs>
        </>
      ) : (
        <div className="text-center text-gray-500 py-12">
          No profile data found. Please log in to view your dashboard.
        </div>
      )}
    </div>
  );
};

export default Page;
