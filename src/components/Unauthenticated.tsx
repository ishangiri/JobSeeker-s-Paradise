import React from 'react'
import Link from 'next/link';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';


const Unauthenticated = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-900 p-4">
          <div className="max-w-md w-full">
            <Alert className="bg-slate-800 border-red-600">
                <div className='flex flex-row items-center gap-2'>
              <AlertCircle className=" text-red-600" />
              <AlertTitle className="text-red-600">Authentication Required</AlertTitle>
              </div>
              <AlertDescription className="space-y-4">
                <div className="text-slate-300">
                  <p className="mb-2">Your session has expired or you are not authorized to view this dashboard.</p>
                  <p>Please log in to regain access to your account.</p>
                </div>
                
                <div className="flex justify-center mt-6">
                  <Link href="/login">
                    <Button className="bg-red-600 hover:bg-red-700 text-white">
                      Return to Login
                    </Button>
                  </Link>
                </div>
              </AlertDescription>
            </Alert>
          </div>
        </div>
      );
}

export default Unauthenticated