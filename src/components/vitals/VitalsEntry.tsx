import { type VitalsEntry as VitalsEntryType } from '@/types';

interface VitalsEntryProps {
  entry: VitalsEntryType;
}

function formatTimestamp(timestamp: string): string {
  const date = new Date(timestamp);
  return date.toLocaleString();
}

export function VitalsEntry({ entry }: VitalsEntryProps) {
  return (
    <div className="border border-gray-200 rounded-md p-4 hover:shadow-md transition-shadow">
      <div className="mb-2">
        <strong className="text-gray-800">{formatTimestamp(entry.timestamp)}</strong>
      </div>
      <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
        <div>
          <span className="font-medium">Blood Pressure:</span> {entry.systolic}/
          {entry.diastolic}
        </div>
        <div>
          <span className="font-medium">Heart Rate:</span> {entry.heartRate} BPM
        </div>
        <div>
          <span className="font-medium">Weight:</span> {entry.weight}
        </div>
      </div>
    </div>
  );
}

