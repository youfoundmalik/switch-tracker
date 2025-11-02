import { useToast } from '@/hooks/context/useToast';
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { useState, type FormEvent } from "react";

interface MedicationFormProps {
  onAddMedication: (name: string, dosage: string, frequency: string) => Promise<void>;
  isLoading?: boolean;
  onClose: () => void;
}

export function MedicationForm({ onAddMedication, isLoading = false, onClose }: MedicationFormProps) {
  const [name, setName] = useState("");
  const [dosage, setDosage] = useState("");
  const [frequency, setFrequency] = useState("");
  const { showToast } = useToast();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name.trim() && dosage.trim() && frequency.trim()) {
      await onAddMedication(name, dosage, frequency);
      setName("");
      setDosage("");
      setFrequency("");
      onClose();
      showToast("Medication added successfully", "success", "dashboard");
    }
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-4 px-2'>
      <div>
        <Label htmlFor='med-name'>Medication Name</Label>
        <Input id='med-name' type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder='e.g., Lisinopril' required />
      </div>
      <div>
        <Label htmlFor='med-dosage'>Dosage</Label>
        <Input id='med-dosage' type='text' value={dosage} onChange={(e) => setDosage(e.target.value)} placeholder='e.g., 20mg' required />
      </div>
      <div>
        <Label htmlFor='med-frequency'>Frequency</Label>
        <Input
          id='med-frequency'
          type='text'
          value={frequency}
          onChange={(e) => setFrequency(e.target.value)}
          placeholder='e.g., Once daily in the morning'
          required
        />
      </div>
      <Button type='submit' variant='solid' color='primary' disabled={isLoading} loading={isLoading} loadingText='Adding...'>
        Add Medication
      </Button>
    </form>
  );
}
