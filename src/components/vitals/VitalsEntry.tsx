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
    <div>
      <div>
        <strong>{formatTimestamp(entry.timestamp)}</strong>
      </div>
      <div>Blood Pressure: {entry.systolic}/{entry.diastolic}</div>
      <div>Heart Rate: {entry.heartRate} BPM</div>
      <div>Weight: {entry.weight}</div>
    </div>
  );
}

