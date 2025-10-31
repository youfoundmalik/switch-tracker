import { useState, useEffect, useCallback } from 'react';
import { type Medication } from '@/types';
import { saveMedications, loadMedications } from '@/utils/localStorage';
import { useAuth } from '@/contexts/AuthContext';

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

export function useMedications() {
  const { user } = useAuth();
  const [medications, setMedications] = useState<Medication[]>([]);

  useEffect(() => {
    if (user) {
      const loaded = loadMedications(user);
      setMedications(loaded);
    } else {
      setMedications([]);
    }
  }, [user]);

  const addMedication = useCallback(
    (name: string, dosage: string, frequency: string): void => {
      if (!name.trim() || !dosage.trim() || !frequency.trim() || !user) return;

      const newMedication: Medication = {
        id: generateId(),
        name: name.trim(),
        dosage: dosage.trim(),
        frequency: frequency.trim(),
      };

      const updated = [...medications, newMedication];
      setMedications(updated);
      saveMedications(user, updated);
    },
    [user, medications]
  );

  const removeMedication = useCallback(
    (id: string): void => {
      if (!user) return;

      const updated = medications.filter((med) => med.id !== id);
      setMedications(updated);
      saveMedications(user, updated);
    },
    [user, medications]
  );

  return {
    medications,
    addMedication,
    removeMedication,
  };
}

