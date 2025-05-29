"use client";

import { useState, useEffect, useMemo } from 'react';
import { getAllSOPs } from '@/lib/sop-service';
import type { SOP } from '@/lib/types';
import { SOPCard } from './SOPCard';
import { SOPFilter } from './SOPFilter';
import { FileSearch } from 'lucide-react';

export function SOPList() {
  const [sops, setSops] = useState<SOP[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  // const [categoryFilter, setCategoryFilter] = useState('all'); // Example for category filter

  useEffect(() => {
    // This check ensures localStorage is accessed only on the client
    if (typeof window !== 'undefined') {
      setSops(getAllSOPs());
    }
  }, []);

  const filteredSOPs = useMemo(() => {
    return sops.filter(sop => {
      const matchesSearchTerm = sop.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                sop.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                sop.category.toLowerCase().includes(searchTerm.toLowerCase());
      // const matchesCategory = categoryFilter === 'all' || sop.category.toLowerCase() === categoryFilter.toLowerCase();
      // return matchesSearchTerm && matchesCategory;
      return matchesSearchTerm;
    }).sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()); // Sort by most recently updated
  }, [sops, searchTerm/*, categoryFilter*/]);

  if (typeof window === 'undefined') {
     // Return a placeholder or null during SSR if localStorage access is strictly client-side
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">Loading SOPs...</p>
      </div>
    );
  }


  return (
    <div>
      <SOPFilter
        searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
        // category={categoryFilter}
        // onCategoryChange={setCategoryFilter}
      />
      {filteredSOPs.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredSOPs.map(sop => (
            <SOPCard key={sop.id} sop={sop} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <FileSearch className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold text-foreground">No SOPs Found</h3>
          <p className="text-muted-foreground mt-2">
            {sops.length === 0 ? "There are no SOPs in the system yet." : "Try adjusting your search or filter criteria."}
          </p>
        </div>
      )}
    </div>
  );
}
