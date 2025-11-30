export enum UserRole {
  GUEST = 'GUEST',
  PATIENT = 'PATIENT',
  THERAPIST = 'THERAPIST',
  ADMIN = 'ADMIN'
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
  avatarUrl?: string;
}

export interface MoodEntry {
  date: string;
  score: number; // 1-10
  note?: string;
}

export interface Therapist {
  id: string;
  name: string;
  specialty: string;
  rate: number;
  available: boolean;
  rating: number;
  imageUrl: string;
}

export interface JournalResponse {
  sentiment: string;
  supportiveMessage: string;
  suggestedAction: string;
}
