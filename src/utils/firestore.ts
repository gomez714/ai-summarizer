// firestore.ts
import { db } from "@/firebaseConfig";
import { collection, addDoc, serverTimestamp, getDocs, query, where } from "firebase/firestore";
import { auth } from "@/firebaseConfig";

export async function saveSummary(text: string, summary: string, url?: string) {
    try {
        const summaryData = {
            originalText: text,
            summary,
            url: url || null,
            createdAt: serverTimestamp(),
            userId: auth.currentUser?.uid,
        };

        const docRef = await addDoc(collection(db, "summaries"), summaryData);
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