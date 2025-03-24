import { Card, Text, Badge, Button } from '@mantine/core';
import { FirestoreHighlight } from '@/types/highlight';
import { Summary, FirestoreSummary } from '@/types/summary';

interface Props {
  type: 'summary' | 'highlight';
  data: FirestoreSummary | FirestoreHighlight;
}

function formatDate(createdAt: any): string {
  if (createdAt?.toDate) {
    return createdAt.toDate().toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  }
  
  if (createdAt?.seconds) {
    return new Date(createdAt.seconds * 1000).toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  }
  
  return 'Unknown';
}

export default function HistoryCard({ type, data }: Props) {
  const createdAt = formatDate((data as any).createdAt);

  return (
    <Card className="border border-gray-200 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 bg-white">
      <div className="flex justify-between items-center mb-2">
        <Badge className="text-base px-3 py-1.5 font-semibold bg-blue-100 text-blue-800 rounded">
          {type === 'summary' ? 'Summary' : 'Highlights'}
        </Badge>
        <Text className='text-xs text-gray-400'>
          {createdAt}
        </Text>
      </div>

      <Text className="text-center text-lg font-semibold text-gray-900 mb-4">
        Title of the article
      </Text>

      <div className='flex flex-col gap-4 text-base leading-relaxed text-gray-800'>
        {type === 'summary' ? (
          <Text>{(data as Summary).summary}</Text>
        ) : (
          <>
            <Text className="text-lg font-semibold text-gray-800 mb-1">Summary:</Text>
            <Text className="text-base text-gray-700">
              {(data as any).highlights.summary}
            </Text>

            <Text className="text-lg font-semibold text-gray-800 mb-1">Main Points:</Text>
            <ul className="list-disc pl-6 space-y-2 text-base">
              {(data as any).highlights.mainPoints?.map((point: string, idx: number) => (
                <li key={idx}>{point}</li>
              ))}
            </ul>

            <Text className="text-lg font-semibold text-gray-800 mb-1">Key Quotes:</Text>
            <ul className="list-disc pl-6 space-y-1 italic text-gray-700 text-base">
              {(data as any).highlights.keyQuotes?.map((quote: string, idx: number) => (
                <li key={idx}>{quote}</li>
              ))}
            </ul>
          </>
        )}

        {data.url && (
          <a
            href={data.url}
            target="_blank"
            rel="noopener noreferrer"
            className='self-start mt-2'
          >
            <Button className="bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-2 rounded-md text-sm font-semibold cursor-pointer">
              View Source
            </Button>
          </a>
        )}
      </div>
    </Card>
  );
}