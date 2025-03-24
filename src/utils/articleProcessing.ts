import { auth } from '@/firebaseConfig';

interface ProcessArticleParams {
  text: string;
  url?: string | null;
  type: 'highlights' | 'summary';
}

export async function processArticle({ text, url, type }: ProcessArticleParams) {
  const endpoint = type === 'highlights' ? '/api/highlight' : '/api/summarize';
  
  const user = auth.currentUser;
  if (!user) {
    throw new Error('User not authenticated');
  }
  const token = await user.getIdToken();

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ text, url }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to process article');
  }

  return response.json();
}