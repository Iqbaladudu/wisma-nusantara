import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { SOPList } from '@/components/features/sop/SOPList';

export default function SOPManagementPage() {
  return (
    <div className="container mx-auto">
      <PageHeader
        title="SOP Management"
        description="Browse, search, and manage all Standard Operating Procedures."
        actions={
          <Link href="/sop/new" passHref>
            <Button>
              <PlusCircle className="mr-2 h-5 w-5" />
              Add New SOP
            </Button>
          </Link>
        }
      />
      <SOPList />
    </div>
  );
}
