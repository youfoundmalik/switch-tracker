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
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Add Medication
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="med-name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Medication Name
          </label>
          <input
            id="med-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Lisinopril"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label
            htmlFor="med-dosage"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Dosage
          </label>
          <input
            id="med-dosage"
            type="text"
            value={dosage}
            onChange={(e) => setDosage(e.target.value)}
            placeholder="e.g., 20mg"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label
            htmlFor="med-frequency"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Frequency
          </label>
          <input
            id="med-frequency"
            type="text"
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            placeholder="e.g., Once daily in the morning"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          Add Medication
        </button>
      </form>
    </div>
  );
}

