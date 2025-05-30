"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusCircle, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { SOPList } from "@/components/features/sop/SOPList";

export default function SOPManagementPage() {
  return (
    <motion.div
      className="container mx-auto space-y-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <PageHeader
          title={
            <span className="flex items-center gap-3">
              SOP Management
              <motion.div
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <Sparkles className="h-6 w-6 text-primary" />
              </motion.div>
            </span>
          }
          description="Browse, search, and manage all Standard Operating Procedures with ease."
          actions={
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link href="/sop/new" passHref>
                <Button className="shadow-lg hover:shadow-xl transition-all duration-300">
                  <PlusCircle className="mr-2 h-5 w-5" />
                  Add New SOP
                </Button>
              </Link>
            </motion.div>
          }
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <SOPList />
      </motion.div>
    </motion.div>
  );
}
