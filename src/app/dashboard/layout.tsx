'use client';
import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardNavBar from '@/components/DashboardNavBar';
import DashboardSidebar from '@/components/DashboardSidebar';
import { useUser } from '@/context/authContext';
import Unauthenticated from "@/components/Unauthenticated";


const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    
  const {name, authenticated} = useUser();

  
if (!authenticated) {
        return <Unauthenticated />;
    }
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
