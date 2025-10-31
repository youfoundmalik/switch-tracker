import { type Medication } from '@/types';

interface MedicationFormProps {
  onAddMedication?: (medication: Medication) => void;
}

export function MedicationForm({ onAddMedication }: MedicationFormProps) {
  return <div>MedicationForm</div>;
}

