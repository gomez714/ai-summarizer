import { useState } from 'react';
import { auth } from '@/firebaseConfig';
import { Highlight } from '@/types/highlight';
import { Summary } from '@/types/summary';

type ProcessingResult = Highlight | Summary;

interface ArticleProcessorProps {
  article: string;
  url?: string | null;
  onResult: (result: ProcessingResult, type: 'highlights' | 'summary') => void;
}

export default function ArticleProcessor({ article, url,onResult }: ArticleProcessorProps) {
  const [type, setType] = useState<'highlights' | 'summary'>('highlights');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTypeChange = (newType: 'highlights' | 'summary') => {
    setType(newType);
    setError(null);
  };

  const processArticle = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const endpoint = type === 'highlights' ? '/api/highlight' : '/api/summarize';
      
      // Get the current user's ID token
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
        body: JSON.stringify({ text: article, url }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to process article');
      }

      const result = await response.json();
      onResult(result, type);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4 text-black">
        <label className="flex items-center space-x-2 ">
          <input
            type="radio"
            value="highlights"
            checked={type === 'highlights'}
            onChange={() => handleTypeChange('highlights')}
            className="form-radio"
          />
          <span>Highlights</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            value="summary"
            checked={type === 'summary'}
            onChange={() => handleTypeChange('summary')}
            className="form-radio"
          />
          <span>Summary</span>
        </label>
      </div>

      <button
        onClick={processArticle}
        disabled={isLoading}
        className={`px-4 py-2 rounded-md ${
          isLoading
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-500 hover:bg-blue-600 text-white'
        }`}
      >
        {isLoading ? 'Processing...' : 'Process Article'}
      </button>

      {error && (
        <div className="text-red-500 text-sm">
          {error}
        </div>
      )}
    </div>
  );
} 