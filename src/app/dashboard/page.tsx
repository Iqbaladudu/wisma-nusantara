import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, PlusCircle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function DashboardPage() {
  return (
    <div className="container mx-auto">
      <PageHeader
        title="Welcome to SOP Zen"
        description="Your central hub for managing Standard Operating Procedures efficiently."
      />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">View All SOPs</CardTitle>
            <FileText className="h-6 w-6 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Browse, search, and filter all your existing SOPs. Keep everything organized and accessible.
            </p>
            <Link href="/sop" passHref>
              <Button className="w-full" variant="outline">
                Go to SOPs
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Create New SOP</CardTitle>
            <PlusCircle className="h-6 w-6 text-accent" />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Add a new Standard Operating Procedure to your system. Define title, content, category, and revision dates.
            </p>
            <Link href="/sop/new" passHref>
              <Button className="w-full" variant="default">
                Add SOP
              </Button>
            </Link>
          </CardContent>
        </Card>
        
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 md:col-span-2 lg:col-span-1">
          <CardHeader className="pb-2">
             <CardTitle className="text-lg font-medium">Hotel Operations Hub</CardTitle>
          </CardHeader>
          <CardContent>
             <div className="aspect-video overflow-hidden rounded-md">
                <Image 
                    src="https://placehold.co/600x400.png" 
                    alt="Hotel operations" 
                    width={600} 
                    height={400} 
                    className="object-cover w-full h-full"
                    data-ai-hint="hotel lobby" 
                />
             </div>
            <p className="text-sm text-muted-foreground mt-4">
              SOP Zen helps streamline hotel operations by ensuring consistency and clarity in procedures.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
