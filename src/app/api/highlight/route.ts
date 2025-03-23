import { NextResponse } from 'next/server';
import { Highlight } from '@/types/highlight';
import { getChatCompletion } from '@/utils/openai';
import { validateAuth } from '@/utils/auth';
import { saveHighlights } from '@/utils/firestore';
import { parseOpenAIJson } from '@/utils/parseOpenAIJson';
import { errorResponse } from '@/utils/errors';

export async function POST(req: Request) {
  try {
    const userId = await validateAuth(req);
    const { text, url } = await req.json();

    if (!text) {
      return errorResponse('Article text is required', 400)
    }

    const prompt = `Please extract the key highlights and main points from the following article. Your response must be a valid JSON object with exactly this structure:
    {
      "mainPoints": ["point 1", "point 2", ...],
      "keyQuotes": ["quote 1", "quote 2", ...],
      "summary": "A brief 2-3 sentence summary"
    }

    Do not include any text before or after the JSON object. The response must be valid JSON that can be parsed.

    Article:
    ${text}`;

    const systemMessage = "You are a helpful assistant that extracts key highlights and main points from articles. You must always respond with valid JSON."
    const response = await getChatCompletion(prompt, systemMessage, 1000);

    const result = parseOpenAIJson(response) as Highlight;

    if (!result.mainPoints || !result.keyQuotes || !result.summary) {
      throw new Error('Invalid response structure from OpenAI');
    }

    await saveHighlights({
      userId,
      originalText: text,
      highlights: result,
      url
    })

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error processing article:', error);
    return errorResponse(error instanceof Error ? error.message : 'Failed to process article', 500)
  }
} 