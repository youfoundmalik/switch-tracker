import { type Medication, type VitalsEntry, type UserSession } from '@/types';

const STORAGE_KEY_PREFIX = {
  MEDICATIONS: 'meds-',
  VITALS: 'vitals-',
  CURRENT_USER: 'currentUser',
} as const;

function getMedicationsKey(username: string): string {
  return `${STORAGE_KEY_PREFIX.MEDICATIONS}${username}`;
}

function getVitalsKey(username: string): string {
  return `${STORAGE_KEY_PREFIX.VITALS}${username}`;
}

export function saveMedications(username: string, medications: Medication[]): void {
  try {
    const key = getMedicationsKey(username);
    const serialized = JSON.stringify(medications);
    localStorage.setItem(key, serialized);
  } catch (error) {
    console.error('Failed to save medications:', error);
  }
}

export function loadMedications(username: string): Medication[] {
  try {
    const key = getMedicationsKey(username);
    const serialized = localStorage.getItem(key);
    
    if (!serialized) {
      return [];
    }

    const medications = JSON.parse(serialized) as Medication[];
    return Array.isArray(medications) ? medications : [];
  } catch (error) {
    console.error('Failed to load medications:', error);
    return [];
  }
}

export function saveVitals(username: string, vitals: VitalsEntry[]): void {
  try {
    const key = getVitalsKey(username);
    const serialized = JSON.stringify(vitals);
    localStorage.setItem(key, serialized);
  } catch (error) {
    console.error('Failed to save vitals:', error);
  }
}

export function loadVitals(username: string): VitalsEntry[] {
  try {
    const key = getVitalsKey(username);
    const serialized = localStorage.getItem(key);
    
    if (!serialized) {
      return [];
    }

    const vitals = JSON.parse(serialized) as VitalsEntry[];
    return Array.isArray(vitals) ? vitals : [];
  } catch (error) {
    console.error('Failed to load vitals:', error);
    return [];
  }
}

export function saveCurrentUser(username: string): void {
  try {
    const session: UserSession = {
      username,
      lastActivity: Date.now(),
    };
    const serialized = JSON.stringify(session);
    localStorage.setItem(STORAGE_KEY_PREFIX.CURRENT_USER, serialized);
  } catch (error) {
    console.error('Failed to save current user:', error);
  }
}

export function loadCurrentUser(): UserSession | null {
  try {
    const serialized = localStorage.getItem(STORAGE_KEY_PREFIX.CURRENT_USER);
    
    if (!serialized) {
      return null;
    }

    const session = JSON.parse(serialized) as UserSession;
    
    if (session.username && typeof session.lastActivity === 'number') {
      return session;
    }
    
    return null;
  } catch (error) {
    console.error('Failed to load current user:', error);
    return null;
  }
}

export function clearCurrentUser(): void {
  try {
    localStorage.removeItem(STORAGE_KEY_PREFIX.CURRENT_USER);
  } catch (error) {
    console.error('Failed to clear current user:', error);
  }
}

