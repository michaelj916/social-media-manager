"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { name: 'Create Post', href: '/create-post' },
  { name: 'Profile', href: '/profile' },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav>
      <div className="flex space-x-4">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md ${
              pathname === item.href
                ? 'bg-indigo-100 text-indigo-700'
                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
            }`}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}