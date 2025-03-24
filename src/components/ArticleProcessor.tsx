import { useState } from 'react';
import { Highlight } from '@/types/highlight';
import { Summary } from '@/types/summary';
import { useArticleProcessor } from '@/hooks/useArticleProcessor';

type ProcessingResult = Highlight | Summary;

interface ArticleProcessorProps {
  article: string;
  url?: string | null;
  onResult: (result: ProcessingResult, type: 'highlights' | 'summary') => void;
}

export default function ArticleProcessor({ article, url, onResult }: ArticleProcessorProps) {
  const [type, setType] = useState<'highlights' | 'summary'>('highlights');
  
  const { process, isLoading, error } = useArticleProcessor({ onResult });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await process(article, url ?? null, type);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4 text-black">
        <label className="flex items-center space-x-2 ">
          <input
            type="radio"
            value="highlights"
            checked={type === 'highlights'}
            onChange={() => setType('highlights')}
            className="form-radio"
          />
          <span>Highlights</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            value="summary"
            checked={type === 'summary'}
            onChange={() => setType('summary')}
            className="form-radio"
          />
          <span>Summary</span>
        </label>
      </div>

      <button
        onClick={handleSubmit}
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