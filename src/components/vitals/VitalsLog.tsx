import { type VitalsEntry } from "@/types";
import { VitalsEntry as VitalsEntryComponent } from "./VitalsEntry";
import { Button } from "@/ui/button";

interface VitalsLogProps {
  vitals: VitalsEntry[];
  onAddVitals: () => void;
}

export function VitalsLog({ vitals, onAddVitals }: VitalsLogProps) {
  if (vitals.length === 0) {
    return (
      <div className='bg-white rounded-lg shadow w-full p-6 flex-1 flex items-center justify-center'>
        <div className='gap-4 flex flex-col items-center justify-center'>
          <img src='/vitals.svg' alt='No vitals logged yet' style={{ maxWidth: "75%" }} />
          <p className='text-gray-500 text-center'>No vitals logged yet.</p>
          <Button variant='outline' color='secondary' onClick={onAddVitals} className='max-w-[250px]'>
            Add Vitals
          </Button>
        </div>
      </div>
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
