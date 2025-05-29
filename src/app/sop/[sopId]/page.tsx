"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getSOPById } from '@/lib/sop-service';
import type { SOP } from '@/lib/types';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, CalendarDays, Edit, Tag, Trash2 } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from '@/hooks/use-toast';
import { deleteSOP } from '@/lib/sop-service'; // Assuming deleteSOP is implemented

export default function SOPDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const [sop, setSop] = useState<SOP | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const sopId = typeof params.sopId === 'string' ? params.sopId : '';

  useEffect(() => {
    if (sopId && typeof window !== 'undefined') {
      const fetchedSOP = getSOPById(sopId);
      if (fetchedSOP) {
        setSop(fetchedSOP);
      } else {
        // Handle SOP not found, e.g., redirect or show error
        toast({ title: "Error", description: "SOP not found.", variant: "destructive"});
        router.push('/sop');
      }
      setIsLoading(false);
    }
  }, [sopId, router, toast]);

  const handleDelete = () => {
    if (sop) {
      deleteSOP(sop.id);
      toast({
        title: "SOP Deleted",
        description: `"${sop.title}" has been successfully deleted.`,
      });
      router.push('/sop');
    }
  };

  if (isLoading) {
    return <div className="container mx-auto text-center py-10"><p className="text-muted-foreground">Loading SOP details...</p></div>;
  }

  if (!sop) {
    // This case should ideally be handled by the redirect in useEffect
    return <div className="container mx-auto text-center py-10"><p className="text-destructive">SOP not found.</p></div>;
  }

  return (
    <div className="container mx-auto">
      <PageHeader
        title={sop.title}
        actions={
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => router.back()}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to List
            </Button>
            {/* <Button onClick={() => router.push(`/sop/${sop.id}/edit`)}>
              <Edit className="mr-2 h-4 w-4" /> Edit SOP (Not Implemented)
            </Button> */}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">
                  <Trash2 className="mr-2 h-4 w-4" /> Delete SOP
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the SOP titled "{sop.title}".
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete} className={cn("bg-destructive text-destructive-foreground hover:bg-destructive/90")}>
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        }
      />
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
            <CardTitle className="text-2xl">{sop.title}</CardTitle>
            <div className="text-sm text-muted-foreground flex flex-col sm:flex-row sm:items-center gap-x-4 gap-y-1">
                <span className="flex items-center"><Tag className="h-4 w-4 mr-1.5 text-primary" /> Category: {sop.category}</span>
                <span className="flex items-center"><CalendarDays className="h-4 w-4 mr-1.5 text-primary" /> Revised: {format(parseISO(sop.revisionDate), 'PPP')}</span>
            </div>
          </div>
           <CardDescription>Created: {format(parseISO(sop.createdAt), 'PPP p')} | Last Updated: {format(parseISO(sop.updatedAt), 'PPP p')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none text-foreground">
            <h3 className="text-lg font-semibold mb-2 text-foreground border-b pb-1">Procedure Details:</h3>
            <p className="whitespace-pre-wrap leading-relaxed">{sop.description}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
