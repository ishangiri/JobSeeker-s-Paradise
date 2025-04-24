import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Briefcase, MapPin } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import fetchData from "@/utils/fetchData";

// Define the job details interface
interface JobDetails {
  position: string;
  company: string;
  jobType: string;
  jobLocation: string;
  salary: string;
  jobDescription: string;
  avatar: string | null; // Add avatar field
}

// Define the job interface to match API response
interface Job {
  _id: string;
  jobId: string;
  status: string;
  interViewDate: string;
  interViewScheduled: boolean;
  jobDetails: JobDetails;
}

const AppliedJobs: React.FC = () => {
  const [appliedJobs, setAppliedJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        setLoading(true);
        const response = await fetchData.get("/api/applicants/getAppliedJobs");
        const data = response.data;
        setAppliedJobs(data.appliedJobs || []);
        setError(null);
      } catch (error) {
        console.error("Error fetching applied jobs:", error);
        setError("Unable to load your applied jobs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchAppliedJobs();
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">Pending</Badge>;
      case "interview":
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Interview</Badge>;
      case "declined":
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">Declined</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "Not scheduled";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (e) {
      return dateString;
    }
  };

  const getJobTypeBadge = (jobType: string) => {
    return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-100">{jobType}</Badge>;
  };

  return (
    <Card className="w-full shadow-sm">
      <CardHeader className="bg-slate-50">
        <CardTitle className="text-xl font-semibold flex items-center">
          <Briefcase className="w-5 h-5 mr-2 text-slate-500" />
          Applied Jobs
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {loading ? (
          <div className="p-4 space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
        ) : error ? (
          <div className="p-6 text-center text-red-500">{error}</div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-medium">Position</TableHead>
                  <TableHead className="font-medium">Company</TableHead>
                  <TableHead className="font-medium">Status</TableHead>
                  <TableHead className="font-medium hidden md:table-cell">Location</TableHead>

                  <TableHead className="font-medium hidden lg:table-cell">Interview</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {appliedJobs.length > 0 ? (
                  appliedJobs.map((job) => (
                    <TableRow key={job._id} className="hover:bg-slate-50">
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          <Briefcase className="w-4 h-4 mr-2 text-slate-400" />
                          {job.jobDetails.position || "Unknown Position"}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          {job.jobDetails.avatar ? (
                            <img
                              src={job.jobDetails.avatar}
                              alt="Company Avatar"
                              className="w-4 h-4 mr-2 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-4 h-4 mr-2 rounded-full bg-slate-200" /> // Fallback if no avatar
                          )}
                          {job.jobDetails.company || "Unknown Company"}
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(job.status)}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1 text-slate-400" />
                          {job.jobDetails.jobLocation || "Remote"}
                        </div>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        {job.status === "declined" ? (
                        
                            <span className="text-slate-500 text-sm">Not scheduled</span>
                        ) : (
                            <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1 text-green-500" />
                            {formatDate(job.interViewDate)}
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-6 text-slate-500">
                      No applied jobs found. Start applying to see your applications here.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AppliedJobs;