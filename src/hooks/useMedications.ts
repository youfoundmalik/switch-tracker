import { useState, useEffect, useCallback } from 'react';
import { type Medication } from '@/types';
import { saveMedications, loadMedications } from '@/utils/localStorage';
import { useAuth } from '@/hooks/context/useAuth';

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

export function useMedications() {
  const { user } = useAuth();
  const [medications, setMedications] = useState<Medication[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [removingMedicationId, setRemovingMedicationId] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      const loaded = loadMedications(user);
      setMedications(loaded);
    } else {
      setMedications([]);
    }
  }, [user]);

  const addMedication = useCallback(
    async (name: string, dosage: string, frequency: string): Promise<void> => {
      if (!name.trim() || !dosage.trim() || !frequency.trim() || !user) return;

      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const newMedication: Medication = {
        id: generateId(),
        name: name.trim(),
        dosage: dosage.trim(),
        frequency: frequency.trim(),
      };

      const updated = [newMedication, ...medications];
      setMedications(updated);
      saveMedications(user, updated);
      setIsLoading(false);
    },
    [user, medications]
  );

  const removeMedication = useCallback(
    async (id: string): Promise<void> => {
      if (!user) return;

      setRemovingMedicationId(id);
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const updated = medications.filter((med) => med.id !== id);
      setMedications(updated);
      saveMedications(user, updated);
      setRemovingMedicationId(null);
    },
    [user, medications]
  );

  return {
    medications,
    addMedication,
    removeMedication,
    isLoading,
    removingMedicationId,
  };
}

