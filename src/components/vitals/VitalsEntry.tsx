import { type VitalsEntry as VitalsEntryType } from '@/types';

interface VitalsEntryProps {
  entry: VitalsEntryType;
}

export function VitalsEntry({ entry }: VitalsEntryProps) {
  return <div>VitalsEntry</div>;
}

