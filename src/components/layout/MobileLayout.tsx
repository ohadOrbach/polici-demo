'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  FileText, 
  Ship, 
  CheckCircle, 
  User,
  Menu,
  X,
  Anchor,
  Signal,
  Battery,
  Wifi,
  BarChart3,
  Monitor
} from 'lucide-react';

const bottomNavItems = [
  { name: 'Tasks', href: '/mobile/missions', icon: FileText, label: 'Tasks' },
];

interface MobileLayoutProps {
  children: React.ReactNode;
  title?: string;
  showBackButton?: boolean;
  onBack?: () => void;
}

export default function MobileLayout({ 
  children, 
  title = "Captain's Interface",
  showBackButton = false,
  onBack 
}: MobileLayoutProps) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      {/* Status Bar */}
      <div className="bg-slate-800 px-4 py-1 flex justify-between items-center text-xs text-slate-300">
        <div className="flex items-center space-x-2">
          <Signal className="h-3 w-3" />
          <span>4G</span>
          <Wifi className="h-3 w-3" />
        </div>
        <div className="flex items-center space-x-1">
          <span>14:23</span>
        </div>
        <div className="flex items-center space-x-2">
          <span>85%</span>
          <Battery className="h-3 w-3" />
        </div>
      </div>

      {/* Header */}
      <header className="bg-slate-800 border-b border-slate-700 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-cyan-600 rounded-lg flex items-center justify-center">
              <Anchor className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">{title}</h1>
              <p className="text-xs text-slate-400">MV Northern Star</p>
            </div>
          </div>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-slate-400 hover:text-white transition-colors"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-slate-800 border-b border-slate-700 z-50">
            <div className="px-4 py-3 space-y-2">
              <div className="text-sm font-medium text-slate-300 mb-3">Navigation</div>
              
              {/* Dashboard Link */}
              <Link
                href="/dashboard"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center space-x-3 px-3 py-2 text-slate-300 hover:bg-slate-700 rounded-lg transition-colors"
              >
                <Monitor className="h-5 w-5" />
                <span>Web Dashboard</span>
              </Link>
              
              {bottomNavItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center space-x-3 px-3 py-2 text-slate-300 hover:bg-slate-700 rounded-lg transition-colors"
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="bg-slate-800 border-t border-slate-700 px-2 py-1">
        <div className="flex justify-around">
          {bottomNavItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex flex-col items-center py-2 px-3 min-w-0 flex-1 transition-colors ${
                  isActive
                    ? 'text-cyan-400'
                    : 'text-slate-400 hover:text-slate-300'
                }`}
              >
                <Icon className="h-5 w-5 mb-1" />
                <span className="text-xs font-medium truncate">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
