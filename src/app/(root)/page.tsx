'use client';
import React from 'react';
import { Navbar } from "@/components/NavBar";
import JobContainer from '@/components/JobContainer';


export default function Home() {

  return (

    <div>
      <Navbar />
       <JobContainer/>
    </div>
     )
  
}