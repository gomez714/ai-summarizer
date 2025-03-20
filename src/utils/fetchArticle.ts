export async function fetchArticleText(url: string): Promise<string> {
  try {
    const response = await fetch('/api/fetch-article', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch article');
    }

    const data = await response.json();
    return data.content;
  } catch (error) {
    console.error('Error fetching article:', error);
    throw new Error('Failed to fetch article content');
  }
} 