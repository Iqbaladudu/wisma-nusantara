"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { PageHeader } from '@/components/shared/PageHeader';
import { SOPForm } from '@/components/features/sop/SOPForm';
import { createSOP } from '@/lib/sop-service';
import type { SOPInput } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NewSOPPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (data: SOPInput) => {
    setIsSubmitting(true);
    try {
      createSOP(data);
      toast({
        title: "SOP Created Successfully! 🎉",
        description: `"${data.title}" has been successfully created and is ready for use.`,
        variant: "default",
      });
      router.push('/sop');
    } catch (error) {
      console.error("Failed to create SOP:", error);
      toast({
        title: "Error",
        description: "Failed to create SOP. Please try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

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
              <FileText className="h-8 w-8 text-primary" />
              Add New Standard Operating Procedure
            </span>
          }
          description="Create a comprehensive SOP to standardize processes and ensure consistent quality."
          actions={
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button variant="outline" onClick={() => router.back()}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to SOPs
              </Button>
            </motion.div>
          }
        />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <Card variant="elevated" className="bg-gradient-to-br from-card via-card to-card/90">
          <CardHeader className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-t-xl border-b border-border/50">
            <CardTitle className="text-xl flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <FileText className="h-4 w-4 text-primary" />
              </div>
              SOP Details
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <SOPForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
