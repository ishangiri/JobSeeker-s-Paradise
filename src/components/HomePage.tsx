'use client'

import React, { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

// Define TypeScript interface for the component props
interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = () => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-800 dark:bg-slate-900 dark:text-slate-100">
      {/* Hero Section */}
      <div className="relative min-h-screen overflow-hidden">
        {/* Hero Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/70 to-slate-900/90 z-10" />
          {mounted && (
            <div className="relative h-full w-full">
              <Image 
                src="/globe.svg" 
                alt="Office environment" 
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="relative z-20 px-6 py-24 mx-auto max-w-7xl">
          <div className="flex flex-col items-center text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Connect to Your <span className="text-blue-400">Career Future</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-200 max-w-2xl mb-8">
              We bring job seekers and employers together with a professional platform focused on meaningful connections.
            </p>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Job Seekers Card */}
            <div className="w-full">
              <Card className="h-full p-8 bg-white dark:bg-slate-800 border-0 shadow-lg rounded-xl overflow-hidden">
                <div className="flex flex-col h-full">
                  <div className="mb-6 pb-6 border-b border-slate-200 dark:border-slate-700">
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-3">
                      For Job Seekers
                    </h2>
                    <p className="text-slate-600 dark:text-slate-300">
                      Find opportunities that align with your skills and career goals.
                    </p>
                  </div>
                  
                  <div className="mb-8 flex-grow">
                    <ul className="space-y-4">
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3 mt-0.5">
                          <svg className="h-4 w-4 text-blue-600 dark:text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-slate-700 dark:text-slate-300">Discover relevant job openings in your area</span>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3 mt-0.5">
                          <svg className="h-4 w-4 text-blue-600 dark:text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-slate-700 dark:text-slate-300">Get personalized job alerts based on your preferences</span>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3 mt-0.5">
                          <svg className="h-4 w-4 text-blue-600 dark:text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-slate-700 dark:text-slate-300">Track applications and interview requests in one place</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="space-y-3 mt-auto">
                    <Button 
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg shadow-sm transition-colors"
                      onClick={() => router.push('/login')}
                    >
                      Log In
                    </Button>
                    <Button 
                      className="w-full bg-white hover:bg-slate-100 dark:bg-slate-700 dark:hover:bg-slate-600 text-blue-600 dark:text-white font-medium py-2.5 border border-slate-200 dark:border-slate-600 rounded-lg shadow-sm transition-colors"
                      onClick={() => router.push('/signup')}
                    >
                      Create Account
                    </Button>
                  </div>
                </div>
              </Card>
            </div>

            {/* Hiring Portal Card */}
            <div className="w-full">
              <Card className="h-full p-8 bg-white dark:bg-slate-800 border-0 shadow-lg rounded-xl overflow-hidden">
                <div className="flex flex-col h-full">
                  <div className="mb-6 pb-6 border-b border-slate-200 dark:border-slate-700">
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-3">
                      For Employers
                    </h2>
                    <p className="text-slate-600 dark:text-slate-300">
                      Find qualified candidates to help your business grow and succeed.
                    </p>
                  </div>
                  
                  <div className="mb-8 flex-grow">
                    <ul className="space-y-4">
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mr-3 mt-0.5">
                          <svg className="h-4 w-4 text-green-600 dark:text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-slate-700 dark:text-slate-300">Create and post job listings in minutes</span>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mr-3 mt-0.5">
                          <svg className="h-4 w-4 text-green-600 dark:text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-slate-700 dark:text-slate-300">Connect with qualified and relevant candidates</span>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mr-3 mt-0.5">
                          <svg className="h-4 w-4 text-green-600 dark:text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-slate-700 dark:text-slate-300">Track applicants and manage hiring workflows</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="mt-auto">
                    <Button 
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 rounded-lg shadow-sm transition-colors"
                      onClick={() => window.location.href = "https://mern-real-zeta.vercel.app"}
                    >
                      Access Hiring Portal
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

    </main>
  );
};

export default HomePage;