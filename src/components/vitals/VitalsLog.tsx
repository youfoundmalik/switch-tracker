import { type VitalsEntry } from '@/types';

interface VitalsLogProps {
  vitals: VitalsEntry[];
}

export function VitalsLog({ vitals }: VitalsLogProps) {
  return <div>VitalsLog</div>;
}

