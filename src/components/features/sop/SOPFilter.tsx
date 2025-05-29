"use client";

import { Input } from "@/components/ui/input";
import { Search, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SOPFilterProps {
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
  // Add category filter props if needed
  // category: string;
  // onCategoryChange: (category: string) => void;
}

export function SOPFilter({ searchTerm, onSearchTermChange }: SOPFilterProps) {
  return (
    <div className="mb-6 p-4 bg-card border border-border rounded-lg shadow">
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative w-full md:flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search SOPs by title or keyword..."
            value={searchTerm}
            onChange={(e) => onSearchTermChange(e.target.value)}
            className="pl-10 w-full"
          />
          {searchTerm && (
             <Button 
                variant="ghost" 
                size="icon" 
                className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7"
                onClick={() => onSearchTermChange('')}
                aria-label="Clear search"
              >
               <XCircle className="h-5 w-5 text-muted-foreground" />
             </Button>
          )}
        </div>
        {/* Example for category filter if added later:
        <Select onValueChange={onCategoryChange} value={category}>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="front-office">Front Office</SelectItem>
            <SelectItem value="housekeeping">Housekeeping</SelectItem>
          </SelectContent>
        </Select>
        */}
      </div>
    </div>
  );
}
