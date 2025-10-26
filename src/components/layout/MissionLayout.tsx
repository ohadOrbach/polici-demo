'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Ship, FileText, BarChart3, Upload, Bell } from 'lucide-react';
import { useRef } from 'react';

const navigationItems = [
  { name: 'Dashboard', href: '/dashboard', icon: BarChart3 },
  { name: 'Missions', href: '/missions', icon: FileText },
];

interface MissionLayoutProps {
  children: React.ReactNode;
}

export default function MissionLayout({ children }: MissionLayoutProps) {
  const pathname = usePathname();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Handle file import logic here
      console.log('Importing mission from file:', file.name);
      // You could parse CSV, JSON, Excel files here
      alert(`Importing mission from ${file.name}`);
    }
  };

  return (
    <div className="flex h-screen bg-slate-900">
      {/* Sidebar */}
      <nav className="w-64 bg-slate-800 border-r border-slate-700">
        {/* Logo */}
        <div className="p-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center">
              <Ship className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">Maritime</h1>
              <p className="text-sm text-slate-400">Missions</p>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="px-3">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-3 px-3 py-3 rounded-lg mb-1 transition-colors ${
                  isActive
                    ? 'bg-cyan-600 text-white'
                    : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}

          {/* Create from File Button */}
          <div className="mt-4 pt-4 border-t border-slate-700">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
            >
              <Upload className="h-5 w-5" />
              <span className="font-medium">Create from File</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv,.json,.xlsx,.xls"
              onChange={handleFileImport}
              className="hidden"
            />
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="bg-slate-900 border-b border-slate-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-white">Create Mission</h1>
              <p className="text-slate-400">Shore Managers can create and edit missions for vessels and their crew.</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-slate-400 hover:text-white transition-colors">
                <Bell className="h-5 w-5" />
              </button>
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-white">Jane Doe</p>
                  <p className="text-xs text-slate-400">Shore Manager</p>
                </div>
                <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">JD</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 bg-slate-900 p-6 overflow-auto">
          <div className="max-w-4xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
