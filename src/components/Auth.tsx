import { auth, provider } from '@/firebaseConfig';
import { signInWithPopup, signOut } from 'firebase/auth';
import { useState } from 'react';
import Image from 'next/image';

interface AuthProps {
  onAuthStateChange?: (isAuthenticated: boolean) => void;
}

export default function Auth({ onAuthStateChange }: AuthProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignIn = async () => {
    try {
      setLoading(true);
      setError('');
      await signInWithPopup(auth, provider);
      onAuthStateChange?.(true);
    } catch (err) {
      console.error('Error signing in:', err);
      setError('Failed to sign in. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      setLoading(true);
      setError('');
      await signOut(auth);
      onAuthStateChange?.(false);
    } catch (err) {
      console.error('Error signing out:', err);
      setError('Failed to sign out. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-4">
      {auth.currentUser ? (
        <div className="flex items-center gap-4">
          {auth.currentUser.photoURL && (
            <Image
              src={auth.currentUser.photoURL}
              alt="Profile"
              width={32}
              height={32}
              className="rounded-full"
              unoptimized
            />
          )}
          <span className="text-sm text-gray-700">
            {auth.currentUser.displayName || auth.currentUser.email}
          </span>
          <button
            onClick={handleSignOut}
            disabled={loading}
            className="text-sm px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Signing out...' : 'Sign Out'}
          </button>
        </div>
      ) : (
        <button
          onClick={handleSignIn}
          disabled={loading}
          className="text-sm px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Signing in...' : 'Sign in with Google'}
        </button>
      )}
      {error && (
        <div className="text-sm text-red-600">{error}</div>
      )}
    </div>
  );
} 