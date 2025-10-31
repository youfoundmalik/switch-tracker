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
    return <div>No medications added yet.</div>;
  }

  return (
    <div>
      <h2>Your Medications</h2>
      {medications.map((medication) => (
        <MedicationItem
          key={medication.id}
          medication={medication}
          onRemove={onRemoveMedication}
        />
      ))}
    </div>
  );
}

