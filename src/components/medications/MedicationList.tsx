import { type Medication } from '@/types';

interface MedicationListProps {
  medications: Medication[];
  onRemoveMedication?: (id: string) => void;
}

export function MedicationList({ medications, onRemoveMedication }: MedicationListProps) {
  return <div>MedicationList</div>;
}

