import { NextResponse } from 'next/server';
import { getChatCompletion } from '@/utils/openai';
import { validateAuth } from '@/utils/auth';
import { saveSummary } from '@/utils/firestore';
import { errorResponse } from '@/utils/errors';
export async function POST(req: Request) {
  try {
    const userId = await validateAuth(req);
    const { text, url } = await req.json();
    
    if (!text) {
      return errorResponse('Article text is required', 400)
    }


    const prompt = `Please summarize the following article:\n\n${text}`;
    const systemMessage = "You are a helpful assistant that creates concise, informative summaries of articles. Focus on the main points and key takeaways."

    const summary = await getChatCompletion(prompt, systemMessage, 500);
    
    if (!summary) {
      throw new Error('Failed to generate summary');
    }

    await saveSummary({
      userId,
      originalText: text,
      summary,
      url
    });

    return NextResponse.json({ summary });
  } catch (error) {
    console.error('Error in summarize route:', error);
    return errorResponse('Failed to generate summary', 500)
  }
} 