'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Ship, FileText } from 'lucide-react';

const navigationItems = [
  { name: 'Missions', href: '/dashboard', icon: FileText },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col h-full p-4">
      {/* Logo */}
      <div className="flex-shrink-0 flex items-center mb-8">
        <Link href="/" className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-cyan-600 to-cyan-700 rounded-xl flex items-center justify-center shadow-lg">
            <Ship className="h-6 w-6 text-white" />
          </div>
          <span className="text-h3 bg-gradient-to-r from-cyan-400 to-cyan-200 bg-clip-text text-transparent">Captain&apos;s Eye</span>
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 space-y-2">
        {navigationItems.map((item) => {
          const isActive = pathname === item.href || (item.href === '/dashboard' && pathname.startsWith('/dashboard'));
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-600 to-cyan-700 text-white shadow-lg'
                  : 'text-slate-300 hover:bg-slate-700 hover:text-cyan-300'
              }`}
            >
              <item.icon className="h-4 w-4 mr-3" />
              {item.name}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
