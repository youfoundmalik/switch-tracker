export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
}

export interface VitalsEntry {
  id: string;
  systolic: number;
  diastolic: number;
  heartRate: number;
  weight: number;
  timestamp: string;
}

export interface UserSession {
  username: string;
  lastActivity: number;
}

