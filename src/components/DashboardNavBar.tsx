
// DashboardNavBar.tsx
'use client';
import React from 'react';
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useSidebar } from '@/components/ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, Menu } from 'lucide-react';

const DashboardNavBar = () => {
  const { setOpenMobile } = useSidebar();
  
  const handleLogout = () => {
    console.log("Logged out");
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-slate-800 text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <SidebarTrigger className='md:block hidden' />
          <Button 
            variant="ghost"
            size="icon"
            className=" hover:bg-slate-700 md:hidden"
            onClick={() => setOpenMobile(true)}
          >
          
            <Menu size={24} />
          </Button>
          <div className=" md:text-2xl font-bold truncate sm:text-xl text-sm">Jobseekers Paradise</div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="hover:bg-slate-700">
              <User size={24} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-slate-800 text-cyan-200 border-slate-700">
            <DropdownMenuItem 
              className="cursor-pointer hover:bg-slate-700 hover:text-white focus:bg-slate-700 focus:text-white" 
              onClick={handleLogout}
            >
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default DashboardNavBar;