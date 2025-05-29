export interface SOP {
  id: string;
  title: string;
  description: string;
  category: string;
  revisionDate: string; // ISO date string
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export type SOPInput = Omit<SOP, 'id' | 'createdAt' | 'updatedAt'>;
