import { type VitalsEntry } from '@/types';

interface VitalsFormProps {
  onLogVitals?: (vitals: Omit<VitalsEntry, 'id' | 'timestamp'>) => void;
}

export function VitalsForm({ onLogVitals }: VitalsFormProps) {
  return <div>VitalsForm</div>;
}

