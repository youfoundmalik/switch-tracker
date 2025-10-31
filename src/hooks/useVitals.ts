import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { type VitalsEntry } from '@/types';
import { saveVitals, loadVitals } from '@/utils/localStorage';
import { useAuth } from './useAuth';

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

export function useVitals() {
  const { user } = useAuth();
  const [vitals, setVitals] = useState<VitalsEntry[]>([]);
  const isInitialLoad = useRef(true);

  useEffect(() => {
    if (user) {
      const loaded = loadVitals(user);
      setVitals(loaded);
      isInitialLoad.current = false;
    } else {
      setVitals([]);
      isInitialLoad.current = true;
    }
  }, [user]);

  useEffect(() => {
    if (!user || isInitialLoad.current) return;
    saveVitals(user, vitals);
  }, [user, vitals]);

  const sortedVitals = useMemo(() => {
    return [...vitals].sort((a, b) => {
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    });
  }, [vitals]);

  const logVitals = useCallback(
    (systolic: number, diastolic: number, heartRate: number, weight: number): void => {
      if (systolic <= 0 || diastolic <= 0 || heartRate <= 0 || weight <= 0) {
        return;
      }

      const newVital: VitalsEntry = {
        id: generateId(),
        systolic,
        diastolic,
        heartRate,
        weight,
        timestamp: new Date().toISOString(),
      };

      setVitals((prev) => [...prev, newVital]);
    },
    []
  );

  return {
    vitals: sortedVitals,
    logVitals,
  };
}

