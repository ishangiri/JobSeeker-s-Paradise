'use client';
import React from 'react';
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { LogOut, Menu, Settings, User as UserIcon } from 'lucide-react';
import fetchData from '@/utils/fetchData';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/authContext';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface DashboardProps {
  name?: string;
}

const DashboardNavBar = ({ name }: DashboardProps) => {
  const router = useRouter();
  const { setOpenMobile } = useSidebar();
  const { setAuthenticated, user } = useUser();

  const onLogout = async () => {
    try {
      await fetchData.get('/api/auth/logoutApplicant');
      setAuthenticated(false);
      router.push('/');
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleProfileClick = () => {
    router.push('dashboard/profile');
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-slate-800 text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between px-4 py-2">
        <div className="flex items-center gap-2">
          {/* Sidebar toggle button - visible on desktop */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="md:block hidden">
                  <SidebarTrigger />
                </div>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Toggle Sidebar</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-slate-700 md:hidden focus:ring-2 focus:ring-slate-400"
            onClick={() => setOpenMobile(true)}
            aria-label="Open menu"
          >
            <Menu size={24} />
          </Button>

          {/* Logo/Brand */}
          <div className="md:text-xl font-bold truncate sm:text-lg text-sm text-cyan-100">
            Jobseekers Paradise
          </div>
        </div>

        {/* User menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 px-2 hover:bg-slate-700 focus:ring-2 focus:ring-slate-400">
              <Avatar className="w-8 h-8 border border-slate-600">
                <AvatarImage src={user.avatar || ""} alt={name || "User"} />
                <AvatarFallback className="bg-slate-600 text-white">
                  {name?.charAt(0) || <UserIcon size={16} />}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium hidden sm:inline-block max-w-[120px] truncate">
                {name || "Guest"}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-slate-800 text-slate-200 border-slate-700 w-56">
            <DropdownMenuLabel className="text-cyan-200">My Account</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-slate-700" />
            <DropdownMenuItem 
              className="cursor-pointer hover:bg-slate-700 focus:bg-slate-700 gap-2"
              onClick={handleProfileClick}
            >
              <UserIcon size={16} />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-slate-700" />
            <DropdownMenuItem
              className="cursor-pointer hover:bg-slate-700 focus:text-red-200 focus:bg-slate-700 gap-2 text-red-300"
              onClick={onLogout}
            >
              <LogOut size={16} />
              <span>Sign out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default DashboardNavBar;