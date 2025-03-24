import { Timestamp } from "firebase/firestore";

export type Highlight = {
  mainPoints: string[];
  keyQuotes: string[];
  summary: string;
};

export type FirestoreHighlight = {
  id: string;
  originalText: string;
  highlights: Highlight;
  createdAt: Timestamp;
  userId: string;
  url: string | null;
}; 