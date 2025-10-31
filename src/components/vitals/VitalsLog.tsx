import { type VitalsEntry } from '@/types';
import { VitalsEntry as VitalsEntryComponent } from './VitalsEntry';

interface VitalsLogProps {
  vitals: VitalsEntry[];
}

export function VitalsLog({ vitals }: VitalsLogProps) {
  if (vitals.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-gray-500 text-center">No vitals logged yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Vitals History
      </h2>
      <div className="space-y-3">
        {vitals.map((entry) => (
          <VitalsEntryComponent key={entry.id} entry={entry} />
        ))}
      </div>
    </div>
  );
}

