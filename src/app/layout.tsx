import "./globals.css";
import { AuthProvider } from '../lib/contexts/AuthContext';
import Auth from '../components/Auth';
import Navigation from '../components/Navigation';
import Link from 'next/link';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="text-black">
        <AuthProvider>
          <div className="min-h-screen bg-gray-100">
            <header className="bg-white shadow">
              <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                <Link href="/" className="text-3xl font-bold text-gray-900 hover:text-indigo-600">Social Media Manager</Link>
                <div className="flex items-center space-x-4">
                  <Navigation />
                  <Auth />
                </div>
              </div>
            </header>
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
              {children}
            </main>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}