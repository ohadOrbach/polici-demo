'use client';

import { useState } from 'react';
import { Bell } from 'lucide-react';
import NotificationCenter from './NotificationCenter';

interface NotificationBellProps {
  variant?: 'web' | 'mobile';
  unreadCount?: number;
}

export default function NotificationBell({ variant = 'web', unreadCount = 5 }: NotificationBellProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="relative p-2 text-slate-400 hover:text-slate-300 transition-colors"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      <NotificationCenter
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        variant={variant}
      />
    </>
  );
}
