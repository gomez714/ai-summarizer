import { NextResponse } from 'next/server';
import Mercury from '@postlight/mercury-parser';
import { errorResponse } from '@/utils/errors';

export async function POST(req: Request) {
  try {
    const { url } = await req.json();
    
    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    const article = await Mercury.parse(url);
    
    if (!article || !article.content) {
      throw new Error('Failed to extract article content');
    }

    // Convert HTML content to plain text (optional)
    const content = article.content.replace(/<[^>]+>/g, '').trim();

    return NextResponse.json({
      title: article.title,
      content,
      author: article.author,
      excerpt: article.excerpt,
      date_published: article.date_published,
    });

  } catch (error) {
    console.error('Error fetching article:', error);
    return errorResponse('Failed to fetch article content', 500)
  }
} 