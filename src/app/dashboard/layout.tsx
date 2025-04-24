'use client';
import React, { useEffect } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardNavBar from '@/components/DashboardNavBar';
import DashboardSidebar from '@/components/DashboardSidebar';
import { useUser } from '@/context/authContext';
import { useRouter } from "next/navigation";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    
  const {user, authenticated} = useUser();
  const router = useRouter();


  return ( <SidebarProvider>
    <div className="flex h-screen w-full">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col">
        <DashboardNavBar name={user?.name}/>
        <main className="flex-1 bg-gray-100 p-6">{children}</main>
      </div>
    </div>
  </SidebarProvider>
    )
 
   
  
};

export default DashboardLayout;
