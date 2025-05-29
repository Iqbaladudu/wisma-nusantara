"use client";

import type { SOP, SOPInput } from './types';

const SOP_STORAGE_KEY = 'sopZenSOPs';

function getSOPsFromStorage(): SOP[] {
  if (typeof window === 'undefined') {
    return [];
  }
  const sopsJson = localStorage.getItem(SOP_STORAGE_KEY);
  return sopsJson ? JSON.parse(sopsJson) : [];
}

function saveSOPsToStorage(sops: SOP[]): void {
  if (typeof window === 'undefined') {
    return;
  }
  localStorage.setItem(SOP_STORAGE_KEY, JSON.stringify(sops));
}

export function getAllSOPs(): SOP[] {
  return getSOPsFromStorage();
}

export function getSOPById(id: string): SOP | undefined {
  const sops = getSOPsFromStorage();
  return sops.find(sop => sop.id === id);
}

export function createSOP(sopInput: SOPInput): SOP {
  const sops = getSOPsFromStorage();
  const now = new Date().toISOString();
  const newSOP: SOP = {
    ...sopInput,
    id: crypto.randomUUID(),
    createdAt: now,
    updatedAt: now,
  };
  sops.push(newSOP);
  saveSOPsToStorage(sops);
  return newSOP;
}

export function updateSOP(id: string, updates: Partial<SOPInput>): SOP | undefined {
  const sops = getSOPsFromStorage();
  const index = sops.findIndex(sop => sop.id === id);
  if (index === -1) {
    return undefined;
  }
  const updatedSOP = {
    ...sops[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  sops[index] = updatedSOP;
  saveSOPsToStorage(sops);
  return updatedSOP;
}

export function deleteSOP(id: string): boolean {
  let sops = getSOPsFromStorage();
  const initialLength = sops.length;
  sops = sops.filter(sop => sop.id !== id);
  if (sops.length < initialLength) {
    saveSOPsToStorage(sops);
    return true;
  }
  return false;
}
