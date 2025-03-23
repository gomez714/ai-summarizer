import { NextResponse } from 'next/server';
import { db } from '@/firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';

export async function GET(request: Request) {
  try {
    // Get the user ID from the request headers
    const userId = request.headers.get('x-user-id');
    
    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 401 }
      );
    }

    // Query Firestore for the user's summaries
    const summariesRef = collection(db, 'summaries');
    const q = query(summariesRef, where('userId', '==', userId));
    const querySnapshot = await getDocs(q);

    // Convert the query snapshot to an array of summaries
    const summaries = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return NextResponse.json({ summaries });
  } catch (error) {
    console.error('Error fetching summaries:', error);
    return NextResponse.json(
      { error: 'Failed to fetch summaries' },
      { status: 500 }
    );
  }
} 