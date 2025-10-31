import { useState, useEffect, useCallback } from 'react';
import { type Medication } from '@/types';
import { saveMedications, loadMedications } from '@/utils/localStorage';
import { useAuth } from './useAuth';

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

  useEffect(() => {
    if (user && medications.length >= 0) {
      saveMedications(user, medications);
    }
  }, [user, medications]);

  const addMedication = useCallback(
    (name: string, dosage: string, frequency: string): void => {
      if (!name.trim() || !dosage.trim() || !frequency.trim()) return;

      const newMedication: Medication = {
        id: generateId(),
        name: name.trim(),
        dosage: dosage.trim(),
        frequency: frequency.trim(),
      };

      setMedications((prev) => [...prev, newMedication]);
    },
    []
  );

  const removeMedication = useCallback((id: string): void => {
    setMedications((prev) => prev.filter((med) => med.id !== id));
  }, []);

  return {
    medications,
    addMedication,
    removeMedication,
  };
}

