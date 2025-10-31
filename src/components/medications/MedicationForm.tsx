import { useState, type FormEvent } from 'react';

interface MedicationFormProps {
  onAddMedication: (name: string, dosage: string, frequency: string) => void;
}

export function MedicationForm({ onAddMedication }: MedicationFormProps) {
  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name.trim() && dosage.trim() && frequency.trim()) {
      onAddMedication(name, dosage, frequency);
      setName('');
      setDosage('');
      setFrequency('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="med-name">Medication Name</label>
        <input
          id="med-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g., Lisinopril"
          required
        />
      </div>
      <div>
        <label htmlFor="med-dosage">Dosage</label>
        <input
          id="med-dosage"
          type="text"
          value={dosage}
          onChange={(e) => setDosage(e.target.value)}
          placeholder="e.g., 20mg"
          required
        />
      </div>
      <div>
        <label htmlFor="med-frequency">Frequency</label>
        <input
          id="med-frequency"
          type="text"
          value={frequency}
          onChange={(e) => setFrequency(e.target.value)}
          placeholder="e.g., Once daily in the morning"
          required
        />
      </div>
      <button type="submit">Add Medication</button>
    </form>
  );
}

