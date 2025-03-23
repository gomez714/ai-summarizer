// firestore.ts
import { db } from "@/firebaseConfig";
import { collection, addDoc, serverTimestamp, getDocs, query, where } from "firebase/firestore";
import { Highlight } from "@/types/highlight";

interface SaveSummaryParams {
    userId: string;
    originalText: string;
    summary: string;
    url?: string | null;
}

interface SaveHighlightsParams {
    userId: string;
    originalText: string;
    highlights: Highlight;
    url?: string | null;
}

export async function saveSummary({
    userId,
    originalText,
    summary,
    url = null,
}: SaveSummaryParams) {
    try {
        const summaryEntry = {
            originalText,
            summary,
            createdAt: serverTimestamp(),
            userId,
            url
        };

        const docRef = await addDoc(collection(db, "summaries"), summaryEntry);
        return docRef.id;
    } catch (error) {
        console.error("Error saving summary:", error);
        throw new Error("Failed to save summary");
    }
}

export async function saveHighlights({
    userId,
    originalText,
    highlights,
    url = null,
}: SaveHighlightsParams) {
    try {
        const highlightEntry = {
            originalText,
            highlights,
            createdAt: serverTimestamp(),
            userId,
            url
        };

        const docRef = await addDoc(collection(db, "highlights"), highlightEntry);
        return docRef.id;
    } catch (error) {
        console.error("Error saving summary:", error);
        throw new Error("Failed to save summary");
    }
}

export async function getSummariesByUser(userId: string) {
    try {
        const q = query(collection(db, "summaries"), where("userId", "==", userId));
        const querySnapshot = await getDocs(q);
        const summaries = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));
        return summaries;
    } catch (error) {
        console.error("Error fetching summaries:", error);
        return [];
    }
}

export async function getHighlightsByUser(userId: string) {
    try {
        const q = query(collection(db, "highlights"), where("userId", "==", userId));
        const querySnapshot = await getDocs(q);
        const highlights = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));
        return highlights;
    } catch (error) {
        console.error("Error fetching highlights:", error);
        return [];
    }
}