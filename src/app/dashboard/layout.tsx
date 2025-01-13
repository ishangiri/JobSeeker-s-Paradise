'use client';
import React, { useEffect, useState } from 'react';
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardNavBar from '@/components/DashboardNavBar';
import DashboardSidebar from '@/components/DashboardSidebar';
import { useUser } from '@/context/authContext';
import fetchData from '@/utils/fetchData';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    
  const {name} = useUser();
  

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col">
          <DashboardNavBar name={name}/>
          <main className="flex-1 bg-gray-100 p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
