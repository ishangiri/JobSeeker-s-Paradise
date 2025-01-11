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
import { LoginDialog } from "./LoginDialog";
import { Skeleton } from "./ui/skeleton";

type Job = {
  _id: string;
  position: string;
  company: string;
  jobType: string;
  jobLocation: string;
  updatedAt: string;
  salary : string;
};

type JobContainerProps = {
  allJobs: Job[];
  onClick: () => void;
  loading : boolean;
};

export default function JobContainer({ allJobs, onClick, loading }: JobContainerProps) {
  return (
    <div className="flex flex-wrap gap-8 justify-center">
      {loading
        ? Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="sm:w-1/2 lg:w-1/3 w-full m-8 bg-slate-200  rounded-xl p-4"
            >
            <Skeleton className="h-6 w-3/4 mb-4" />
             <Skeleton className="h-4 w-1/2 mb-2" />
              <Skeleton className="h-4 w-1/3 mb-4" />
              <Skeleton className="h-20 w-full mb-4" />
              <Skeleton className="h-8 w-1/2 mx-auto" />
            </div>
          ))
        : allJobs.map((job) => {
            const time = new Date(job.updatedAt).toLocaleDateString();
            return (
              <Card
                key={job._id}
                className="sm:w-1/2 lg:w-1/3 w-full m-8 bg-white text-gray-800 border border-blue-200 shadow-lg hover:shadow-xl transition-shadow rounded-xl"
              >
                <CardHeader className="bg-blue-50 p-4 rounded-t-xl">
                  <CardTitle className="text-lg font-semibold text-blue-800">
                    {job.position}
                  </CardTitle>
                  <CardDescription className="text-sm font-bold text-gray-600">
                    {job.company}
                  </CardDescription>
                  <CardDescription className="text-sm text-gray-600">
                    <div className="flex items-center gap-2 text-blue-600">
                      <BsCursorFill />
                      <p>{job.jobLocation}</p>
                    </div>
                  </CardDescription>
                  <CardDescription className="text-sm text-gray-600">
                    <div className="flex items-center gap-2 text-blue-600">
                      <p>{job.salary}</p>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <p className="font-medium text-gray-700">Job Type:</p>
                    <p className="text-gray-900">{job.jobType}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="font-medium text-gray-700">Posted At:</p>
                    <p className="text-sm text-gray-500 italic">{time}</p>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center bg-blue-50 p-4 rounded-b-xl">
                  <LoginDialog onClick={onClick} />
                </CardFooter>
              </Card>
            );
          })}
    </div>
  );
}
