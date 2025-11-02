import { type Medication } from "@/types";
import { MedicationItem } from "./MedicationItem";
import { EmptyState } from "@/components/shared/EmptyState";

interface MedicationListProps {
  medications: Medication[];
  onRemoveMedication: (id: string) => Promise<void>;
  onAddMedication: () => void;
  removingMedicationId: string | null;
}

export function MedicationList({ medications, onRemoveMedication, onAddMedication, removingMedicationId }: MedicationListProps) {
  if (medications.length === 0) {
    return (
      <EmptyState
        imageSrc='/src/assets/med.svg'
        imageAlt='No medications added yet'
        message='No medications added yet.'
        buttonText='Add Medication'
        onButtonClick={onAddMedication}
      />
    );
  }

  return (
    <div className='bg-white rounded-lg shadow p-6 flex-1 w-full flex flex-col gap-4 overflow-y-hidden'>
      <h2 className='text-xl font-semibold text-gray-800'>Your Medications</h2>
      <div className='space-y-3 overflow-y-auto'>
        {medications.map((medication) => (
          <MedicationItem key={medication.id} medication={medication} onRemove={onRemoveMedication} isLoading={removingMedicationId === medication.id} />
        ))}
      </div>
    </div>
  );
}
