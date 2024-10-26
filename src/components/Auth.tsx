"use client";
import { useState } from 'react';
import { useAuth } from '../lib/hooks/useAuth';
import SignInWithGoogle from './SignInWithGoogle';

export default function Auth() {
  const { user, signOut } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      setError('Failed to sign out. Please try again.');
    }
  };

  if (user) {
    return (
      <div className="flex items-center space-x-4">
        <img src={user.photoURL || ''} alt={user.displayName || ''} className="w-8 h-8 rounded-full" />
        <span>{user.displayName}</span>
        <button onClick={handleSignOut} className="bg-red-500 text-white px-4 py-2 rounded">Sign Out</button>
        {error && <p className="text-red-500">{error}</p>}
      </div>
    );
  }

  return <SignInWithGoogle />;
}