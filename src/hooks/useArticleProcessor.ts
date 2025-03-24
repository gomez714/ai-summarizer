import { useState } from 'react';
import { processArticle } from '@/utils/articleProcessing';

interface UseArticleProcessorProps {
  onResult: (result: any, type: 'highlights' | 'summary') => void;
}

export function useArticleProcessor({ onResult }: UseArticleProcessorProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const process = async (article: string, url: string | null, type: 'highlights' | 'summary') => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await processArticle({ text: article, url, type });
      onResult(result, type);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    process,
    isLoading,
    error
  };
}