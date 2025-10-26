'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BarChart3, FileText, TrendingUp, PieChart } from 'lucide-react';

const analyticsNavItems = [
  { name: 'Analytics Dashboard', href: '/analytics', icon: BarChart3 },
  { name: 'Report Generator', href: '/analytics/reports', icon: FileText },
  { name: 'Trends Analysis', href: '/analytics/trends', icon: TrendingUp },
  { name: 'Performance Metrics', href: '/analytics/performance', icon: PieChart },
];

export default function AnalyticsNavigation() {
  const pathname = usePathname();

  return (
    <div className="bg-slate-800/80 rounded-2xl p-2 border border-slate-700 mb-6">
      <div className="flex flex-wrap gap-2">
        {analyticsNavItems.map((item) => {
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
