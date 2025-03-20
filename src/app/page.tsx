'use client';

import { useState, useEffect } from 'react';
import { summarizeArticle } from '@/utils/summarize';
import { fetchArticleText } from '@/utils/fetchArticle';
import { saveSummary } from '@/utils/firestore';
import { auth } from '@/firebaseConfig';
import { User } from 'firebase/auth';
import Auth from '@/components/Auth';

export default function Home() {
  const [input, setInput] = useState('');
  const [url, setUrl] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [inputType, setInputType] = useState<'text' | 'url'>('text');
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setError('Please sign in to use the summarizer');
      return;
    }

    setLoading(true);
    setError('');
    setSummary('');
    setSaveSuccess(false);

    try {
      let textToSummarize = input;
      
      if (inputType === 'url' && url) {
        textToSummarize = await fetchArticleText(url);
      }

      const result = await summarizeArticle(textToSummarize);
      setSummary(result);

      // Save the summary automatically
      await saveSummary(
        textToSummarize,
        result,
        inputType === 'url' ? url : undefined
      );
      setSaveSuccess(true);
    } catch (err) {
      setError('Failed to generate summary. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">
            AI Article Summarizer
          </h1>
          <Auth />
        </div>

        {!user ? (
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <h2 className="text-xl text-gray-700 mb-4">
              Please sign in to use the summarizer
            </h2>
            <Auth />
          </div>
        ) : (
          <>
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <div className="flex justify-center gap-4 mb-6">
                <button
                  onClick={() => setInputType('text')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    inputType === 'text'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Paste Text
                </button>
                <button
                  onClick={() => setInputType('url')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    inputType === 'url'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Enter URL
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  {inputType === 'text' ? (
                    <textarea
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Paste your article text here..."
                      className="w-full h-40 p-4 border border-gray-200 rounded-lg text-black focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      required
                    />
                  ) : (
                    <input
                      type="url"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="Enter article URL..."
                      className="w-full p-4 border border-gray-200 rounded-lg text-black focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  )}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors"
                  >
                    {loading ? 'Generating Summary...' : 'Generate Summary'}
                  </button>
                </div>
              </form>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                {error}
              </div>
            )}

            {saveSuccess && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
                Summary saved successfully!
              </div>
            )}

            {summary && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-semibold text-gray-900">Summary</h2>
                </div>
                <div className="prose prose-lg max-w-none text-gray-600">
                  {summary.split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
