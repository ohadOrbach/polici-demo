'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Ship, Send, BarChart3, MapPin } from 'lucide-react';

const fleetNavItems = [
  { name: 'Fleet Overview', href: '/fleet', icon: Ship },
  { name: 'Mission Assignments', href: '/fleet/assignments', icon: Send },
  { name: 'Fleet Analytics', href: '/fleet/analytics', icon: BarChart3 },
  { name: 'Fleet Map', href: '/fleet/map', icon: MapPin },
];

export default function FleetNavigation() {
  const pathname = usePathname();

  return (
    <div className="bg-slate-800/80 rounded-2xl p-2 border border-slate-700 mb-6">
      <div className="flex flex-wrap gap-2">
        {fleetNavItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`inline-flex items-center px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
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
  );
}
