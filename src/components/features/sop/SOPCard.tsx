"use client";

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { SOP } from '@/lib/types';
import { format, parseISO } from 'date-fns';
import { ArrowRight, Tag, CalendarDays } from 'lucide-react';

interface SOPCardProps {
  sop: SOP;
}

export function SOPCard({ sop }: SOPCardProps) {
  const formattedRevisionDate = format(parseISO(sop.revisionDate), 'PPP');
  const descriptionSnippet = sop.description.length > 100 
    ? sop.description.substring(0, 100) + '...' 
    : sop.description;

  return (
    <Card className="flex flex-col h-full shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-xl">{sop.title}</CardTitle>
        <CardDescription className="flex items-center gap-2 pt-1">
          <Tag className="h-4 w-4 text-muted-foreground" /> <span>{sop.category}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground leading-relaxed">
          {descriptionSnippet}
        </p>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-2 border-t pt-4">
        <div className="text-xs text-muted-foreground flex items-center">
          <CalendarDays className="h-4 w-4 mr-1.5" />
          Revised: {formattedRevisionDate}
        </div>
        <Link href={`/sop/${sop.id}`} passHref>
          <Button variant="outline" size="sm">
            View Details <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
