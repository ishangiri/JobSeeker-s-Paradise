'use client';
import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardNavBar from '@/components/DashboardNavBar';
import DashboardSidebar from '@/components/DashboardSidebar';
import { UserProvider, useUser } from '@/context/authContext';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    
  const {user} = useUser();


  return (
    <UserProvider>
    <SidebarProvider>
    <div className="flex h-screen w-full">
      <DashboardSidebar />
     
      <div className="flex-1 flex flex-col">
        <DashboardNavBar name={user?.name}/>
        <main className="flex-1 bg-gray-100 p-6">{children}</main>
      </div>
    </div>
  </SidebarProvider>
  </UserProvider>
    )
 
   
  
};

export default DashboardLayout;
