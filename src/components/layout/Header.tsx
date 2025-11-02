'use client';

import Link from 'next/link';
import { Users, Smartphone, LogOut } from 'lucide-react';
import NotificationBell from '@/components/notifications/NotificationBell';

export default function Header() {
  return (
    <header className="sticky top-0 bg-slate-800/95 backdrop-blur-md shadow-lg border-b border-slate-700 z-30">
      <div className="px-8 h-20 flex justify-end items-center">
        <div className="flex items-center space-x-4">
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
    </header>
  );
}
