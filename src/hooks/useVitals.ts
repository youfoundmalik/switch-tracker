import { useState, useEffect, useCallback, useMemo } from "react";
import { type VitalsEntry } from "@/types";
import { saveVitals, loadVitals } from "@/utils/localStorage";
import { useAuth } from "@/hooks/context/useAuth";

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

export function useVitals() {
  const { user } = useAuth();
  const [vitals, setVitals] = useState<VitalsEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      const loaded = loadVitals(user);
      setVitals(loaded);
    } else {
      setVitals([]);
    }
  }, [user]);

  const sortedVitals = useMemo(() => {
    return [...vitals].sort((a, b) => {
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    });
  }, [vitals]);

  const logVitals = useCallback(
    async (systolic: number, diastolic: number, heartRate: number, weight: number): Promise<void> => {
      if (systolic <= 0 || diastolic <= 0 || heartRate <= 0 || weight <= 0 || !user) {
        return;
      }

      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const newVital: VitalsEntry = {
        id: generateId(),
        systolic,
        diastolic,
        heartRate,
        weight,
        timestamp: new Date().toISOString(),
      };

      const updated = [...vitals, newVital];
      setVitals(updated);
      saveVitals(user, updated);
      setIsLoading(false);
    },
    [user, vitals]
  );

  return {
    vitals: sortedVitals,
    logVitals,
    isLoading,
  };
}
