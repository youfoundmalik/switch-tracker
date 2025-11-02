import { type Medication } from "@/types";

interface MedicationItemProps {
  medication: Medication;
  onRemove: (id: string) => Promise<void>;
  isLoading?: boolean;
}

export function MedicationItem({ medication, onRemove, isLoading = false }: MedicationItemProps) {
  return (
    <div className='border border-gray-200 rounded-md odd:bg-gray-50 even:bg-white p-4 hover:shadow-md transition-shadow'>
      <div className='flex justify-between items-start'>
        <div className='flex-1'>
          <h3 className='font-semibold text-gray-800 text-lg mb-2'>{medication.name}</h3>
          <div className='space-y-1 text-sm text-gray-600'>
            <div>
              <span className='font-medium'>Dosage:</span> {medication.dosage}
            </div>
            <div>
              <span className='font-medium'>Frequency:</span> {medication.frequency}
            </div>
          </div>
        </div>
        <button
          type='button'
          onClick={async () => await onRemove(medication.id)}
          disabled={isLoading}
          className='ml-4 px-3 py-1 relative min-w-[115px] bg-red-500 text-white flex items-center justify-center gap-2 text-[13px] rounded-md hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
        >
          {isLoading && <div className='absolute inset-0 bg-white opacity-50 rounded-md' />}
          {isLoading && <div className='w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin' />}
          {isLoading ? "Removing..." : "Remove"}
        </button>
      </div>
    </div>
  );
}
