'use client';

import { useState } from 'react';
import { useAuth } from '../../lib/hooks/useAuth';
import Navigation from '../../components/Navigation';
import { addDocument, uploadFile } from '../../lib/firebase/firebaseUtils';

export default function CreatePost() {
  const { user } = useAuth();
  const [postContent, setPostContent] = useState('');
  const [media, setMedia] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsLoading(true);
    try {
      let mediaUrl = '';
      if (media) {
        mediaUrl = await uploadFile(media, `posts/${user.uid}/${Date.now()}_${media.name}`);
      }

      await addDocument('posts', {
        userId: user.uid,
        content: postContent,
        mediaUrl,
        createdAt: new Date().toISOString(),
      });

      setPostContent('');
      setMedia(null);
      alert('Post created successfully!');
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Failed to create post. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return <div>Please sign in to create a post.</div>;
  }

  return (
    <div>
      <Navigation />
      <h1 className="text-2xl font-semibold mb-4">Create a New Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">
            Post Content
          </label>
          <textarea
            id="content"
            name="content"
            rows={4}
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="What's on your mind?"
          />
        </div>
        <div>
          <label htmlFor="media" className="block text-sm font-medium text-gray-700">
            Upload Media (Image or Video)
          </label>
          <input
            type="file"
            id="media"
            name="media"
            accept="image/*,video/*"
            onChange={(e) => setMedia(e.target.files?.[0] || null)}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {isLoading ? 'Creating Post...' : 'Create Post'}
        </button>
      </form>
    </div>
  );
}
