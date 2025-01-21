import { BsCursorFill } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { LoginDialog } from "./LoginDialog";
import { Skeleton } from "./ui/skeleton";
import { useUser } from "@/context/authContext";
import React, { useState } from "react";
import Link from "next/link";

type Job = {
  _id: string;
  position: string;
  company: string;
  jobType: string;
  jobLocation: string;
  updatedAt: string;
  salary: string;
};

type JobContainerProps = {
  allJobs: Job[];
  onClick: () => void;
  loading: boolean;
};

export default function JobContainer({ allJobs, onClick, loading }: JobContainerProps) {
  const { authenticated: loggedIn } = useUser();
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 6;

  const totalPages = Math.ceil(allJobs.length / jobsPerPage);
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = allJobs.slice(indexOfFirstJob, indexOfLastJob);

  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        pages.push(i);
      } else if (i === currentPage - 2 || i === currentPage + 2) {
        pages.push("ellipsis");
      }
    }
    return pages;
  };

  // Fill array with empty jobs if current page is not full
  const emptySlots = jobsPerPage - currentJobs.length;
  const fillerArray = emptySlots > 0 ? Array(emptySlots).fill(null) : [];

  return (
    <div className="flex flex-col items-center min-h-screen">
      <div className="flex flex-wrap gap-8 justify-center min-h-[800px]">
        {loading
          ? Array.from({ length: jobsPerPage }).map((_, index) => (
              <div
                key={index}
                className="sm:w-1/2 lg:w-1/3 w-full m-8 bg-slate-200 rounded-xl p-4 min-h-[300px]"
              >
                <Skeleton className="h-6 w-3/4 mb-4" />
                <Skeleton className="h-4 w-1/2 mb-2" />
                <Skeleton className="h-4 w-1/3 mb-4" />
                <Skeleton className="h-20 w-full mb-4" />
                <Skeleton className="h-8 w-1/2 mx-auto" />
              </div>
            ))
          : [...currentJobs, ...fillerArray].map((job, index) =>
              job ? (
                <Card
                  key={job._id}
                  className="sm:w-1/2 lg:w-1/3 w-full m-8 bg-white text-gray-800 border border-blue-200 shadow-lg hover:shadow-xl transition-shadow rounded-xl min-h-[300px] flex flex-col"
                >
                  <CardHeader className="bg-blue-50 p-4 rounded-t-xl">
                    <CardTitle className="text-lg font-semibold text-slate-700">
                      {job.position}
                    </CardTitle>
                    <CardDescription className="text-md font-bold text-blue-600">
                      {job.company}
                    </CardDescription>
                    <CardDescription className="text-sm text-slate-700">
                      <div className="flex items-center gap-2 text-slate-700">
                        <BsCursorFill />
                        <p>{job.jobLocation}</p>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 space-y-4 flex-grow">
                    <div className="flex justify-between items-center">
                      <p className="font-medium text-gray-700">Salary Range:</p>
                      <p className="text-sm text-slate-900 font-semi-bold">{job.salary}</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="font-medium text-gray-700">Job Type:</p>
                      <p className="text-gray-900">{job.jobType}</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="font-medium text-gray-700">Updated:</p>
                      <p className="text-sm text-gray-500 italic">
                        {Math.ceil((new Date().getTime() - new Date(job.updatedAt).getTime()) / (1000 * 60 * 60 * 24))}d ago
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-center bg-blue-50 p-4 rounded-b-xl mt-auto">
                    {loggedIn ? (
                      <Button asChild className="bg-slate-800 text-white hover:bg-slate-900 hover:text-white rounded-xl">
                        <Link href={`dashboard/jobDetails/${job._id}`}>View Details</Link>
                      </Button>
                    ) : (
                      <LoginDialog onClick={onClick} />
                    )}
                  </CardFooter>
                </Card>
              ) : (
                <div key={`empty-${index}`} className="sm:w-1/2 lg:w-1/3 w-full m-8 min-h-[300px]" />
              )
            )}
      </div>

      {!loading && totalPages > 1 && (
        <div className="w-full py-4 bg-white/80 backdrop-blur-sm">
          <Pagination className="my-4">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>

              {getPageNumbers().map((pageNumber, index) =>
                pageNumber === "ellipsis" ? (
                  <PaginationItem key={`ellipsis-${index}`}>
                    <PaginationEllipsis />
                  </PaginationItem>
                ) : (
                  <PaginationItem key={pageNumber}>
                    <PaginationLink
                      isActive={currentPage === pageNumber}
                      onClick={() => setCurrentPage(Number(pageNumber))}
                    >
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                )
              )}

              <PaginationItem>
                <PaginationNext
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}