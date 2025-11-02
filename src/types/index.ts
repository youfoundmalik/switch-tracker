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

export interface User {
  email: string;
  name: string;
  username: string;
  dp: string; // profile picture URL
  dob: string; // date of birth (ISO string)
  age: number;
  gender: string;
  bloodType: string;
  genotype: string;
}
