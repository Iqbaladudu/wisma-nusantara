"use client";

import React from 'react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
} from '@/components/ui/sidebar';
import { SidebarNav } from './SidebarNav';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import Link from 'next/link';

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider defaultOpen >
      <Sidebar collapsible="icon" side="left" variant="sidebar">
        <SidebarHeader className="p-4">
          <Link href="/dashboard" className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-primary">
              <path d="M2 7h20M4 12h16M6 17h12" />
              <rect x="2" y="3" width="20" height="18" rx="2" ry="2" />
            </svg>
            <h1 className="text-2xl font-bold text-primary group-data-[collapsible=icon]:hidden">SOP Zen</h1>
          </Link>
        </SidebarHeader>
        <SidebarContent className="flex-1 overflow-y-auto p-0">
          <SidebarNav />
        </SidebarContent>
        <SidebarFooter className="p-4">
          <Button variant="ghost" className="w-full justify-start group-data-[collapsible=icon]:justify-center">
            <LogOut className="h-5 w-5 mr-3 group-data-[collapsible=icon]:mr-0" />
            <span className="group-data-[collapsible=icon]:hidden">Logout</span>
          </Button>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-background px-4 md:px-6 md:justify-end">
           <div className="md:hidden">
             <SidebarTrigger />
           </div>
           {/* Placeholder for User Profile / Settings Dropdown */}
           {/* <UserNav /> */}
        </header>
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
