import { useState, useEffect, useCallback, useRef } from 'react';
import { type Medication } from '@/types';
import { saveMedications, loadMedications } from '@/utils/localStorage';
import { useAuth } from '@/contexts/AuthContext';

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

export function useMedications() {
  const { user } = useAuth();
  const [medications, setMedications] = useState<Medication[]>([]);
  const isInitialLoad = useRef(true);

  useEffect(() => {
    if (user) {
      const loaded = loadMedications(user);
      setMedications(loaded);
      isInitialLoad.current = false;
    } else {
      setMedications([]);
      isInitialLoad.current = true;
    }
  }, [user]);

  useEffect(() => {
    if (!user || isInitialLoad.current) return;
    saveMedications(user, medications);
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

