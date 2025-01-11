'use client';
import React, { useEffect, useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from '@/components/ui/sidebar';
import { DialogTitle } from '@radix-ui/react-dialog';
import { Briefcase, BarChart, User, Settings } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NavigationItems = ({ onClick }: { onClick?: () => void }) => {
  const pathname = usePathname();
  const items = [
    { title: 'Jobs', url: '/dashboard', icon: Briefcase },
    { title: 'Stats', url: '/dashboard/stats', icon: BarChart },
    { title: 'Profile', url: '/dashboard/profile', icon: User },
    { title: 'Settings', url: '/dashboard/settings', icon: Settings },
  ];

  return (
    <SidebarMenu>
      {items.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton asChild>
            <Link
              href={item.url}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                pathname === item.url
                  ? 'bg-slate-700 text-white'
                  : 'hover:bg-slate-700/50 text-slate-300 hover:text-white'
              }`}
              onClick={onClick}
            >
              <item.icon size={20} />
              <span>{item.title}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
};

const DashboardSidebar = () => {
  const { openMobile, setOpenMobile } = useSidebar();


  return (
    <>
      {/* Desktop Sidebar */}
      <div className="">
        <Sidebar className="bg-slate-800 text-white">
          <SidebarContent>
            <div className="py-6 px-4">
              <h2 className="text-xl font-bold px-4 mb-6">Dashboard</h2>
              <NavigationItems />
            </div>
          </SidebarContent>
        </Sidebar>
      </div>

      {/* Mobile Sheet - Only render on mobile */}
       
        <Sheet open={openMobile} onOpenChange={setOpenMobile}>
          <SheetContent title='Dashboard' side="left" className="w-[240px] bg-slate-800 text-white p-0">
            <SheetHeader className="py-6 px-4">
              <DialogTitle className='sr-only'>Navigation Menu</DialogTitle>
              <SheetTitle className="text-xl font-bold text-white px-4">Dashboard</SheetTitle>
            </SheetHeader>
            <NavigationItems onClick={() => setOpenMobile(false)} />
          </SheetContent>
        </Sheet>
      
    </>
  );
};

export default DashboardSidebar;