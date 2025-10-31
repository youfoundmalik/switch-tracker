import { type Medication } from '@/types';

interface MedicationItemProps {
  medication: Medication;
  onRemove?: (id: string) => void;
}

export function MedicationItem({ medication, onRemove }: MedicationItemProps) {
  return <div>MedicationItem</div>;
}

