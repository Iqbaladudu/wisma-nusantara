"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PageHeader } from '@/components/shared/PageHeader';
import { SOPForm } from '@/components/features/sop/SOPForm';
import { createSOP } from '@/lib/sop-service';
import type { SOPInput } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function NewSOPPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (data: SOPInput) => {
    setIsSubmitting(true);
    try {
      createSOP(data);
      toast({
        title: "SOP Created",
        description: `"${data.title}" has been successfully created.`,
        variant: "default", // Using default which uses accent color
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
    <div className="container mx-auto">
      <PageHeader
        title="Add New Standard Operating Procedure"
        description="Fill in the details below to create a new SOP."
      />
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl">SOP Details</CardTitle>
        </CardHeader>
        <CardContent>
          <SOPForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
        </CardContent>
      </Card>
    </div>
  );
}
