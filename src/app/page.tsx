'use client';

import { useState, useEffect } from 'react';
import { fetchArticleText } from '@/utils/fetchArticle';
import { auth } from '@/firebaseConfig';
import { User } from 'firebase/auth';
import Auth from '@/components/Auth';
import ArticleProcessor from '@/components/ArticleProcessor';
import ArticleResult from '@/components/ArticleResult';
import { Highlight } from '@/types/highlight';
import { Summary } from '@/types/summary';
import { toast } from "react-hot-toast";
import Link from 'next/link';
import { Paper, Button } from '@mantine/core';

type ProcessingResult = Highlight | Summary;

export default function Home() {
  const [input, setInput] = useState('');
  const [url, setUrl] = useState('');
  const [result, setResult] = useState<ProcessingResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [inputType, setInputType] = useState<'text' | 'url'>('text');
  const [user, setUser] = useState<User | null>(null);
  const [processingType, setProcessingType] = useState<'highlights' | 'summary'>('highlights');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleResult = async (result: ProcessingResult, type: 'highlights' | 'summary') => {
    
    try {
      setResult(result);
      setProcessingType(type);

      toast.success(type === 'highlights' ? "Highlights saved successfully" : "Summary saved successfully");
      
    } catch (err) {
      console.error('Error saving result:', err);
      toast.error("Failed to save summary or highlights");

    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setError('Please sign in to use the summarizer');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      let textToProcess = input;
      
      if (inputType === 'url' && url) {
        textToProcess = await fetchArticleText(url);
      }

      setInput(textToProcess);
    } catch (err) {
      setError('Failed to fetch article. Please try again.');
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
          <div className="flex items-center gap-4">
            <Link
              href="/history"
              className="text-blue-600 font-medium hover:underline transition"
            >
              View History
            </Link>
            <Auth />
          </div>
        </div>

        {!user ? (
          <Paper className='shadow-sm p-6 rounded-lg text-center border border-gray-200'>
            <h2 className="text-xl text-gray-700 mb-4">
              Please sign in to use the summarizer
            </h2>
          </Paper>
        ) : (
          <>
            <Paper className='shadow-sm p-6 rounded-lg text-center border border-gray-200'>
              <div className="flex justify-center gap-4 mb-6">
                <Button  onClick={() => setInputType('text')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    inputType === 'text'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Paste Text
                </Button>
                <Button  onClick={() => setInputType('url')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    inputType === 'url'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Enter URL
                </Button>
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
                    <>
                      <input
                        type="url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="Enter article URL..."
                        className="w-full p-4 border border-gray-200 rounded-lg text-black focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors"
                      >
                        {loading ? 'Loading...' : 'Fetch from URL'}
                      </button>
                    </>
                  )}
                  
                </div>
              </form>
            </Paper>


            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                {error}
              </div>
            )}

            {input && (
              <Paper className="bg-white rounded-lg shadow-sm p-6 mb-8">
                <ArticleProcessor
                  article={input}
                  url={inputType === 'url' ? url : null}
                  onResult={handleResult}
                />
              </Paper>
            )}

            {result && (
              <Paper className="bg-white rounded-lg shadow-sm p-6">
                <ArticleResult
                  result={result}
                  type={processingType}
                />
              </Paper>
            )}
          </>
        )}
      </div>
    </div>
  );
}
