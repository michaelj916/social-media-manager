import Link from "next/link";
import Navigation from '../components/Navigation';

export default function Home() {
  return (
    <div>
      <Navigation />
      <h1 className="text-2xl font-semibold mb-4">Welcome to Social Media Manager</h1>
      <p>Manage your social media posts across multiple platforms from one place.</p>
    </div>
  );
}
