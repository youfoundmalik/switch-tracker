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
    <div className="border border-gray-200 rounded-md p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-800 text-lg mb-2">
            {medication.name}
          </h3>
          <div className="space-y-1 text-sm text-gray-600">
            <div>
              <span className="font-medium">Dosage:</span> {medication.dosage}
            </div>
            <div>
              <span className="font-medium">Frequency:</span>{' '}
              {medication.frequency}
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={() => onRemove(medication.id)}
          className="ml-4 px-3 py-1 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
        >
          Remove
        </button>
      </div>
    </div>
  );
}

