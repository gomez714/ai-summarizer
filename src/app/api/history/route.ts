import { NextResponse } from 'next/server';
import { FirestoreSummary } from '@/types/summary';
import { FirestoreHighlight } from '@/types/highlight';
import { getSummariesByUser, getHighlightsByUser } from '@/utils/firestore';
import { validateAuth } from '@/utils/auth';
import { errorResponse } from '@/utils/errors';


interface HistoryResponse {
  summaries: FirestoreSummary[];
  highlights: FirestoreHighlight[];
}

export async function GET(req: Request) {
  try {
    const userId = await validateAuth(req);
    
    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type') || 'all'; // 'all', 'summaries', or 'highlights'

    const response: HistoryResponse = {
      summaries: [],
      highlights: [],
    };

    // Fetch summaries if requested
    if (type === 'all' || type === 'summaries') {
      response.summaries = await getSummariesByUser(userId);
    }

    // Fetch highlights if requested
    if (type === 'all' || type === 'highlights') {
      response.highlights = await getHighlightsByUser(userId);
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching history:', error);
    return errorResponse('Failed to fetch history', 500);
  }
} 