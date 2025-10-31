import { type Medication } from '@/types';

interface MedicationItemProps {
  medication: Medication;
  onRemove: (id: string) => void;
}

export function MedicationItem({
  medication,
  onRemove,
}: MedicationItemProps) {
  return (
    <div>
      <div>
        <strong>{medication.name}</strong>
      </div>
      <div>Dosage: {medication.dosage}</div>
      <div>Frequency: {medication.frequency}</div>
      <button type="button" onClick={() => onRemove(medication.id)}>
        Remove
      </button>
    </div>
  );
}

