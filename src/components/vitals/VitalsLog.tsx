import { type VitalsEntry } from "@/types";
import { VitalsEntry as VitalsEntryComponent } from "./VitalsEntry";
import { EmptyState } from "@/components/shared/EmptyState";

interface VitalsLogProps {
  vitals: VitalsEntry[];
  onAddVitals: () => void;
}

export function VitalsLog({ vitals, onAddVitals }: VitalsLogProps) {
  if (vitals.length === 0) {
    return (
      <EmptyState
        imageSrc='/src/assets/vitals.svg'
        imageAlt='No vitals logged yet'
        message='No vitals logged yet.'
        buttonText='Add Vitals'
        onButtonClick={onAddVitals}
      />
    );
  }

  return (
    <div className='bg-white rounded-lg shadow p-6 flex-1 w-full flex flex-col gap-4 overflow-y-hidden'>
      <h2 className='text-xl font-semibold text-gray-800'>Vitals History</h2>
      <div className='space-y-3 overflow-y-auto'>
        {vitals.map((entry) => (
          <VitalsEntryComponent key={entry.id} entry={entry} />
        ))}
      </div>
    </div>
  );
}
