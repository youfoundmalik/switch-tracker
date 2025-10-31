import { type Medication } from '@/types';

export function useMedications() {
  return {
    medications: [] as Medication[],
    addMedication: (med: Medication) => {},
    removeMedication: (id: string) => {},
  };
}

