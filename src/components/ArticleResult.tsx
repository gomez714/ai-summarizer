import { Highlight } from '@/types/highlight';
import { Summary } from '@/types/summary';


type ProcessingResult = Highlight | Summary;

interface ArticleResultProps {
  result: ProcessingResult;
  type: 'highlights' | 'summary';
}

export default function ArticleResult({ result, type }: ArticleResultProps) {
  if (type === 'highlights' && 'mainPoints' in result) {
    return (
      <div className="space-y-6 p-4 bg-white rounded-lg shadow">
        <div>
          <h3 className="text-lg text-black font-semibold mb-2">Summary</h3>
          <p className="text-gray-700">{result.summary}</p>
        </div>

        <div>
          <h3 className="text-l text-black font-semibold mb-2">Main Points</h3>
          <ul className="list-disc list-inside space-y-2">
            {result.mainPoints.map((point, index) => (
              <li key={index} className="text-gray-700">{point}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg text-black font-semibold mb-2">Key Quotes</h3>
          <ul className="space-y-2">
            {result.keyQuotes.map((quote, index) => (
              <li key={index} className="text-gray-700 italic">&quot;{quote}&quot;</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 bg-white rounded-lg shadow">
      <div>
        <h3 className="text-lg text-black font-semibold mb-2">Summary</h3>
        <p className="text-gray-700">{result.summary}</p>
      </div>
    </div>
  );
} 