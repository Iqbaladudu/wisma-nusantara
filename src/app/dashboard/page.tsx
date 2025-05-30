"use client"

import { motion } from 'framer-motion';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, PlusCircle, Hotel, TrendingUp, Users, Settings } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

export default function DashboardPage() {
  return (
    <div className="container mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <PageHeader
          title="Welcome to Wisma Nusantara"
          description="Your comprehensive hotel management system for seamless operations and exceptional guest experiences."
        />
      </motion.div>

      {/* Stats Cards */}
      <motion.div 
        className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {[
          { title: "Total SOPs", value: "24", icon: FileText, color: "text-blue-500" },
          { title: "Active Procedures", value: "18", icon: TrendingUp, color: "text-green-500" },
          { title: "Staff Members", value: "45", icon: Users, color: "text-purple-500" },
          { title: "Departments", value: "8", icon: Settings, color: "text-orange-500" }
        ].map((stat, index) => (
          <motion.div key={stat.title} variants={itemVariants}>
            <Card variant="elevated" className="bg-gradient-to-br from-card to-card/80">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold mt-1">{stat.value}</p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Main Action Cards */}
      <motion.div 
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <Card variant="elevated" className="group hover:border-primary/50 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-semibold">View All SOPs</CardTitle>
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <FileText className="h-6 w-6 text-primary" />
              </motion.div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                Browse, search, and filter all your existing SOPs. Keep everything organized and accessible for your team.
              </p>
              <Link href="/sop" passHref>
                <Button className="w-full group-hover:shadow-lg transition-all duration-300" variant="outline">
                  <FileText className="mr-2 h-4 w-4" />
                  Browse SOPs
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card variant="elevated" className="group hover:border-accent/50 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-semibold">Create New SOP</CardTitle>
              <motion.div
                whileHover={{ scale: 1.1, rotate: 90 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <PlusCircle className="h-6 w-6 text-accent" />
              </motion.div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                Add a new Standard Operating Procedure to your system. Define title, content, category, and revision dates.
              </p>
              <Link href="/sop/new" passHref>
                <Button className="w-full group-hover:shadow-lg transition-all duration-300">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add New SOP
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div variants={itemVariants} className="md:col-span-2 lg:col-span-1">
          <Card variant="elevated" className="group hover:border-primary/30 transition-all duration-300 overflow-hidden">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2">
                <Hotel className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg font-semibold">Hotel Operations Hub</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <motion.div 
                className="aspect-video overflow-hidden rounded-lg relative mb-4"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />
                <Image 
                  src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=600&h=400&auto=format&fit=crop" 
                  alt="Modern hotel lobby" 
                  width={600} 
                  height={400} 
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
              </motion.div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Wisma Nusantara helps streamline hotel operations by ensuring consistency and clarity in all procedures.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 rounded-2xl p-6 border border-border/50"
      >
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            ⚡
          </motion.div>
          Quick Actions
        </h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "View Recent SOPs", href: "/sop", icon: FileText },
            { label: "Add New SOP", href: "/sop/new", icon: PlusCircle },
            { label: "Staff Directory", href: "#", icon: Users },
            { label: "Settings", href: "#", icon: Settings }
          ].map((action, index) => (
            <motion.div
              key={action.label}
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Link href={action.href}>
                <Button variant="ghost" className="w-full justify-start h-auto p-3">
                  <action.icon className="mr-3 h-4 w-4" />
                  {action.label}
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
