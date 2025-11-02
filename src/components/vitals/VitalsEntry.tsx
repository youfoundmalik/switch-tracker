import { type VitalsEntry as VitalsEntryType } from "@/types";
import { formatTimestamp } from "@/utils/dateFormatter";

interface VitalsEntryProps {
  entry: VitalsEntryType;
}

export function VitalsEntry({ entry }: VitalsEntryProps) {
  return (
    <div className='border border-gray-200 odd:bg-gray-50 even:bg-white rounded-md p-4 hover:shadow-md transition-shadow'>
      <div className='mb-2 flex justify-between items-center'>
        <strong className='text-gray-800'>{formatTimestamp(entry.timestamp)?.split(" - ")[0]}</strong>
        <strong className='text-gray-800'>{formatTimestamp(entry.timestamp)?.split(" - ")[1]}</strong>
      </div>
      <div className='grid grid-cols-2 gap-2 text-sm text-gray-600'>
        <div>
          <span className='font-medium'>Blood Pressure:</span> {entry.systolic}/{entry.diastolic}
        </div>
        <div>
          <span className='font-medium'>Heart Rate:</span> {entry.heartRate} BPM
        </div>
        <div>
          <span className='font-medium'>Weight:</span> {entry.weight} Kg
        </div>
      </div>
    </div>
  );
}
