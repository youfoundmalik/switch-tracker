import { type Medication, type VitalsEntry, type UserSession } from '@/types';

export function saveMedications(username: string, medications: Medication[]): void {}

export function loadMedications(username: string): Medication[] {
  return [];
}

export function saveVitals(username: string, vitals: VitalsEntry[]): void {}

export function loadVitals(username: string): VitalsEntry[] {
  return [];
}

export function saveCurrentUser(username: string): void {}

export function loadCurrentUser(): UserSession | null {
  return null;
}

export function clearCurrentUser(): void {}

