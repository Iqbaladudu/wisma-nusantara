"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
import { LogOut, Sparkles } from 'lucide-react';
import Link from 'next/link';

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider defaultOpen>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <Sidebar collapsible="icon" side="left" variant="sidebar" className="border-r border-border/50 backdrop-blur-xl bg-sidebar/95">
          <SidebarHeader className="p-4 border-b border-border/50">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link href="/dashboard" className="flex items-center gap-3 group">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="relative"
                >
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg">
                    <Sparkles className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary to-primary/70 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                </motion.div>
                <motion.h1 
                  className="text-2xl font-bold bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent group-data-[collapsible=icon]:hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  Wisma Nusantara
                </motion.h1>
              </Link>
            </motion.div>
          </SidebarHeader>
          
          <SidebarContent className="flex-1 overflow-y-auto p-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <SidebarNav />
            </motion.div>
          </SidebarContent>
          
          <SidebarFooter className="p-4 border-t border-border/50">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <Button 
                variant="ghost" 
                className="w-full justify-start group-data-[collapsible=icon]:justify-center hover:bg-destructive/10 hover:text-destructive transition-colors duration-200"
              >
                <LogOut className="h-5 w-5 mr-3 group-data-[collapsible=icon]:mr-0" />
                <span className="group-data-[collapsible=icon]:hidden">Logout</span>
              </Button>
            </motion.div>
          </SidebarFooter>
        </Sidebar>
        
        <SidebarInset>
          <motion.header 
            className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-border/50 bg-background/80 backdrop-blur-md px-4 md:px-6 md:justify-end shadow-sm"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="md:hidden">
              <SidebarTrigger />
            </div>
            {/* Placeholder for User Profile / Settings Dropdown */}
            {/* <UserNav /> */}
          </motion.header>
          
          <main className="flex-1 p-4 md:p-6 lg:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
