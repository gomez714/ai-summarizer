import { Timestamp } from "firebase/firestore";

export type Summary = {
  summary: string;
};

export type FirestoreSummary = {
  id: string;
  originalText: string;
  summary: string;
  createdAt: Timestamp;
  userId: string;
  url: string | null;
}; 