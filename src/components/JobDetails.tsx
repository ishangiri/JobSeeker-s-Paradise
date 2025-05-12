
"use client"

import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Building2, BadgeDollarSign } from "lucide-react";

interface Job {
  company: string;
  position: string;
  salary: string;
  jobType: string;
  jobLocation: string;
  jobDescription: string;
  updatedAt: string;
  handleApply : () => void
}

export default function JobDetailsPage({company, position, salary, jobType, jobLocation, updatedAt, jobDescription, handleApply} : Job) {


 
    return (
        <div className="h-screen p-4 flex flex-col">
          <Card className="flex flex-col h-full">
            <CardHeader className="flex-shrink-0">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl font-bold">{position}</CardTitle>
                  <CardDescription className="flex items-center mt-2">
                    <Building2 className="w-4 h-4 mr-2" />
                    {company}
                  </CardDescription>
                </div>
                <Badge variant="secondary" className="text-sm">
                  {jobType}
                </Badge>
              </div>
            </CardHeader>
    
            <CardContent className="flex flex-col flex-grow overflow-hidden">
              <div className="flex-shrink-0 space-y-4 mb-4">
                <div className="flex items-center gap-2">
                  <BadgeDollarSign className="w-5 h-5 text-gray-500" />
                  <span>{salary}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-gray-500" />
                  <span>{jobLocation}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-gray-500" />
                  <span>Posted: {new Date(updatedAt).toLocaleDateString()}</span>
                </div>
              </div>
    
              <div className="flex-grow overflow-hidden">
                <h3 className="text-lg font-semibold mb-2">Job Description</h3>
                <div className="overflow-y-auto pr-4 h-[calc(100%-2rem)] custom-scrollbar">
                  <p className="text-gray-600 whitespace-pre-line text-base md:text-lg">
                    {jobDescription}
                  </p>
                </div>
              </div>
            </CardContent>
    
            <CardFooter className="flex-shrink-0 border-none bg-white">
              <Button 
                className="w-full bg-slate-700 text-white rounded-xl hover:bg-slate-950 hover:text-cyan-50"
                size="lg"
                onClick={handleApply}
              >
                Apply Now
              </Button>
            </CardFooter>
          </Card>
        </div>
      );
}