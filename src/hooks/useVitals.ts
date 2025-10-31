import { type VitalsEntry } from '@/types';

export function useVitals() {
  return {
    vitals: [] as VitalsEntry[],
    logVitals: (vitals: Omit<VitalsEntry, 'id' | 'timestamp'>) => {},
  };
}

