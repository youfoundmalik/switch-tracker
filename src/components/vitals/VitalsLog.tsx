import { type VitalsEntry } from '@/types';
import { VitalsEntry as VitalsEntryComponent } from './VitalsEntry';

interface VitalsLogProps {
  vitals: VitalsEntry[];
}

export function VitalsLog({ vitals }: VitalsLogProps) {
  if (vitals.length === 0) {
    return <div>No vitals logged yet.</div>;
  }

  return (
    <div>
      <h2>Vitals History</h2>
      {vitals.map((entry) => (
        <VitalsEntryComponent key={entry.id} entry={entry} />
      ))}
    </div>
  );
}

