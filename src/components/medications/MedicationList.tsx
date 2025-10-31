import { type Medication } from '@/types';
import { MedicationItem } from './MedicationItem';

interface MedicationListProps {
  medications: Medication[];
  onRemoveMedication: (id: string) => void;
}

export function MedicationList({
  medications,
  onRemoveMedication,
}: MedicationListProps) {
  if (medications.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-gray-500 text-center">No medications added yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Your Medications
      </h2>
      <div className="space-y-3">
        {medications.map((medication) => (
          <MedicationItem
            key={medication.id}
            medication={medication}
            onRemove={onRemoveMedication}
          />
        ))}
      </div>
    </div>
  );
}

