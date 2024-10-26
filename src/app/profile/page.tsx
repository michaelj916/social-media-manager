'use client';

import { useState } from 'react';
import { useAuth } from '../../lib/hooks/useAuth';
import Navigation from '../../components/Navigation';
import { updateDocument } from '../../lib/firebase/firebaseUtils';

export default function Profile() {
  const { user } = useAuth();
  const [socialLinks, setSocialLinks] = useState({
    twitter: '',
    linkedin: '',
    instagram: '',
    tiktok: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSocialLinks((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      await updateDocument('users', user.uid, { socialLinks });
      alert('Profile updated successfully!');
    }
  };

  if (!user) {
    return <div>Please sign in to view your profile.</div>;
  }

  return (
    <div>
      <Navigation />
      <h1 className="text-2xl font-semibold mb-4">Your Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {Object.entries(socialLinks).map(([platform, link]) => (
          <div key={platform}>
            <label htmlFor={platform} className="block text-sm font-medium text-gray-700">
              {platform.charAt(0).toUpperCase() + platform.slice(1)}
            </label>
            <input
              type="url"
              name={platform}
              id={platform}
              value={link}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder={`Enter your ${platform} profile URL`}
            />
          </div>
        ))}
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Save Profile
        </button>
      </form>
    </div>
  );
}
