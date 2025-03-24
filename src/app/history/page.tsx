'use client';

import { useEffect, useState } from 'react';
import { auth } from '@/firebaseConfig';
import { fetchHistory } from '@/utils/history';
import { FirestoreHighlight } from '@/types/highlight';
import { FirestoreSummary } from '@/types/summary';
import { toast } from 'react-hot-toast';
import HistoryCard from '@/components/HistoryCard';
import Link from 'next/link';

export default function HistoryPage() {
  const [summaries, setSummaries] = useState<FirestoreSummary[]>([]);
  const [highlights, setHighlights] = useState<FirestoreHighlight[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'summaries' | 'highlights'>('summaries');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) return;

      try {
        setLoading(true);
        const data = await fetchHistory(user.uid);
        setSummaries(data.summaries);
        setHighlights(data.highlights);
      } catch (err) {
        console.error('Failed to fetch history:', err);
        toast.error("Failed to retrieve history");
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen !bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto mb-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-4xl font-extrabold !text-gray-900">Your History</h1>

          <Link href="/" className="text-sm text-blue-600 hover:underline font-medium">
            ← Back to Home
          </Link>
        </div>

        <div className="inline-flex bg-gray-100 rounded-lg p-1 mb-8 shadow-sm">
          <button
            onClick={() => setViewMode('summaries')}
            className={`px-4 py-2 mx-1 rounded-md font-medium transition-colors ${
              viewMode === 'summaries'
                ? 'bg-blue-600 text-white shadow'
                : 'text-gray-700 hover:bg-gray-200'
            }`}
          >
            Summaries
          </button>
          <button
            onClick={() => setViewMode('highlights')}
            className={`px-4 py-2 mx-1 rounded-md font-medium transition-colors ${
              viewMode === 'highlights'
                ? 'bg-blue-600 text-white shadow'
                : 'text-gray-700 hover:bg-gray-200'
            }`}
          >
            Highlights
          </button>
        </div>
      </div>
      {loading ? (
        <p className='text-center text-gray-500 text-sm'>Loading...</p>
      ) : (
        <>
          {viewMode === 'summaries' ? (
            <section>
              {summaries.length === 0 ? (
                <p className="text-center text-gray-500 italic">No summaries yet.</p>
              ) : (
                <div className="space-y-4">
                  {summaries.map((summary, idx) => (
                    <div key={`summary-${idx}`} className="max-w-5xl mx-auto">
                      <HistoryCard key={`summary-${idx}`} type="summary" data={summary} />
                    </div>
                  ))}
                </div>
              )}
            </section>
          ) : (
            <section>
              {highlights.length === 0 ? (
                <p className="text-center text-gray-500 italic">No highlights yet.</p>
              ) : (
                <div className="space-y-6">
                  {highlights.map((highlight, idx) => (
                    <div key={`highlight-${idx}`} className="max-w-5xl mx-auto">
                      <HistoryCard key={`highlight-${idx}`} type="highlight" data={highlight} />
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}
        </>
      )}
    </div>
  );
}
