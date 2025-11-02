import { type Medication } from "@/types";
import { MedicationItem } from "./MedicationItem";
import { Button } from "@/ui/button";

interface MedicationListProps {
  medications: Medication[];
  onRemoveMedication: (id: string) => Promise<void>;
  onAddMedication: () => void;
  isRemoving: (id: string) => boolean;
}

export function MedicationList({ medications, onRemoveMedication, onAddMedication, isRemoving }: MedicationListProps) {
  if (medications.length === 0) {
    return (
      <div className='bg-white rounded-lg shadow w-full p-6 flex-1 flex items-center justify-center'>
        <div className='gap-4 flex flex-col items-center justify-center'>
          <img src='/med.svg' alt='No vitals logged yet' style={{ maxWidth: "75%" }} />
          <p className='text-gray-500 text-center'>No medications added yet.</p>
          <Button variant='outline' color='secondary' onClick={onAddMedication} className='max-w-[250px]'>
            Add Medication
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className='bg-white rounded-lg shadow p-6 flex-1 w-full flex flex-col gap-4 overflow-y-hidden'>
      <h2 className='text-xl font-semibold text-gray-800'>Your Medications</h2>
      <div className='space-y-3 overflow-y-auto'>
        {medications.map((medication) => (
          <MedicationItem key={medication.id} medication={medication} onRemove={onRemoveMedication} isLoading={isRemoving(medication.id)} />
        ))}
      </div>
    </div>
  );
}
