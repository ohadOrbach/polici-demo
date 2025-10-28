'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Ship, 
  FileText, 
  BarChart3,
  Users,
  Smartphone,
  LogOut
} from 'lucide-react';
import NotificationBell from '@/components/notifications/NotificationBell';

const navigationItems = [
  { name: 'Dashboard', href: '/dashboard', icon: BarChart3 },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="bg-slate-800/95 backdrop-blur-md shadow-lg border-b border-slate-700 sticky top-0 z-40">
      <div className="container-lg">
        <div className="flex justify-between h-20">
          <div className="flex">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center py-3">
              <Link href="/" className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-cyan-600 to-cyan-700 rounded-xl flex items-center justify-center shadow-lg">
                  <Ship className="h-6 w-6 text-white" />
                </div>
                <span className="text-h3 bg-gradient-to-r from-cyan-400 to-cyan-200 bg-clip-text text-transparent">Captain&apos;s Eye</span>
              </Link>
            </div>

            {/* Navigation Links */}
            <div className="hidden sm:ml-8 sm:flex sm:space-x-2">
              {navigationItems.map((item) => {
                const isActive = pathname === item.href || 
                                (item.href === '/fleet' && pathname.startsWith('/fleet')) ||
                                (item.href === '/analytics' && pathname.startsWith('/analytics'));
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`inline-flex items-center px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-cyan-600 to-cyan-700 text-white shadow-lg'
                        : 'text-slate-300 hover:bg-slate-700 hover:text-cyan-300'
                    }`}
                  >
                    <item.icon className="h-4 w-4 mr-2" />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Right side */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-4">
            {/* Mobile View Link */}
            <Link
              href="/mobile"
              className="inline-flex items-center px-4 py-2 rounded-xl text-sm font-semibold text-slate-300 hover:bg-slate-700 hover:text-cyan-300 transition-all duration-200"
            >
              <Smartphone className="h-4 w-4 mr-2" />
              Mobile View
            </Link>

            {/* Notifications */}
            <NotificationBell variant="web" unreadCount={5} />

            {/* User Menu */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 bg-cyan-600 rounded-full flex items-center justify-center">
                  <Users className="h-4 w-4 text-white" />
                </div>
                <div className="text-sm">
                  <div className="font-medium text-white">Fleet Manager</div>
                  <div className="text-slate-400">Demo User</div>
                </div>
              </div>
              <button className="p-2 text-slate-400 hover:text-slate-300">
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu (hidden by default) */}
      <div className="sm:hidden">
        <div className="pt-2 pb-3 space-y-1">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href || 
                            (item.href === '/fleet' && pathname.startsWith('/fleet')) ||
                            (item.href === '/analytics' && pathname.startsWith('/analytics'));
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-colors duration-200 ${
                  isActive
                    ? 'bg-slate-700 border-cyan-500 text-cyan-300'
                    : 'border-transparent text-slate-300 hover:bg-slate-700 hover:border-slate-600 hover:text-white'
                }`}
              >
                <div className="flex items-center">
                  <item.icon className="h-4 w-4 mr-3" />
                  {item.name}
                </div>
              </Link>
            );
          })}
          
          {/* Mobile View Link for Mobile Menu */}
          <Link
            href="/mobile"
            className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-slate-300 hover:bg-slate-700 hover:border-slate-600 hover:text-white text-base font-medium transition-colors duration-200"
          >
            <div className="flex items-center">
              <Smartphone className="h-4 w-4 mr-3" />
              Mobile View
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
}
