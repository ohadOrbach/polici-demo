'use client';

import { useState } from 'react';
import { 
  Activity,
  Target,
  Clock,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  AlertTriangle,
  Ship,
  Users,
  Calendar,
  BarChart3,
  PieChart,
  Gauge,
  Award,
  Zap,
  Shield,
  Timer,
  Download,
  Filter
} from 'lucide-react';

const kpiMetrics = [
  {
    title: 'Overall Performance Score',
    value: '87.3',
    unit: '/100',
    change: '+3.2',
    trend: 'up',
    target: '90',
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-900/20',
    icon: Target
  },
  {
    title: 'Mission Success Rate',
    value: '94.5',
    unit: '%',
    change: '+1.8',
    trend: 'up',
    target: '95',
    color: 'text-green-400',
    bgColor: 'bg-green-900/20',
    icon: CheckCircle
  },
  {
    title: 'Average Response Time',
    value: '3.2',
    unit: 'hrs',
    change: '-0.5',
    trend: 'up',
    target: '3.0',
    color: 'text-blue-400',
    bgColor: 'bg-blue-900/20',
    icon: Timer
  },
  {
    title: 'Compliance Rating',
    value: '96.1',
    unit: '%',
    change: '+2.1',
    trend: 'up',
    target: '98',
    color: 'text-purple-400',
    bgColor: 'bg-purple-900/20',
    icon: Shield
  }
];

const performanceCategories = [
  {
    category: 'Safety Performance',
    metrics: [
      { name: 'Safety Incidents', value: '2', change: '-1', trend: 'up', unit: 'incidents' },
      { name: 'Safety Training Completion', value: '98%', change: '+2%', trend: 'up', unit: '' },
      { name: 'Safety Drill Response Time', value: '4.2min', change: '-0.3min', trend: 'up', unit: '' },
      { name: 'Safety Equipment Status', value: '99.1%', change: '+0.1%', trend: 'up', unit: '' }
    ]
  },
  {
    category: 'Operational Efficiency',
    metrics: [
      { name: 'Mission Completion Time', value: '2.1h', change: '-0.2h', trend: 'up', unit: '' },
      { name: 'Resource Utilization', value: '87%', change: '+3%', trend: 'up', unit: '' },
      { name: 'Fuel Efficiency', value: '12.3L/nm', change: '-0.4L/nm', trend: 'up', unit: '' },
      { name: 'Route Optimization', value: '94%', change: '+1%', trend: 'up', unit: '' }
    ]
  },
  {
    category: 'Crew Performance',
    metrics: [
      { name: 'Task Completion Rate', value: '96%', change: '+2%', trend: 'up', unit: '' },
      { name: 'Training Hours', value: '24h', change: '+4h', trend: 'up', unit: '' },
      { name: 'Certification Status', value: '100%', change: '0%', trend: 'neutral', unit: '' },
      { name: 'Performance Rating', value: '4.7/5', change: '+0.1', trend: 'up', unit: '' }
    ]
  },
  {
    category: 'Maintenance Performance',
    metrics: [
      { name: 'Preventive Maintenance', value: '95%', change: '+3%', trend: 'up', unit: '' },
      { name: 'Equipment Uptime', value: '98.7%', change: '+0.2%', trend: 'up', unit: '' },
      { name: 'Repair Response Time', value: '1.8h', change: '-0.3h', trend: 'up', unit: '' },
      { name: 'Parts Availability', value: '92%', change: '-2%', trend: 'down', unit: '' }
    ]
  }
];

const vesselPerformance = [
  {
    vessel: 'MV Northern Star',
    overall: 92,
    safety: 95,
    operational: 89,
    crew: 94,
    maintenance: 90,
    status: 'excellent'
  },
  {
    vessel: 'MV Ocean Explorer',
    overall: 87,
    safety: 91,
    operational: 85,
    crew: 88,
    maintenance: 84,
    status: 'good'
  },
  {
    vessel: 'MV Atlantic Voyager',
    overall: 84,
    safety: 88,
    operational: 82,
    crew: 85,
    maintenance: 81,
    status: 'average'
  },
  {
    vessel: 'MV Pacific Dream',
    overall: 95,
    safety: 97,
    operational: 93,
    crew: 96,
    maintenance: 94,
    status: 'excellent'
  },
  {
    vessel: 'MV Caribbean Queen',
    overall: 79,
    safety: 82,
    operational: 76,
    crew: 81,
    maintenance: 77,
    status: 'needs_improvement'
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'excellent': return 'text-green-400 bg-green-900/30';
    case 'good': return 'text-blue-400 bg-blue-900/30';
    case 'average': return 'text-yellow-400 bg-yellow-900/30';
    case 'needs_improvement': return 'text-red-400 bg-red-900/30';
    default: return 'text-slate-400 bg-slate-700';
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'excellent': return 'Excellent';
    case 'good': return 'Good';
    case 'average': return 'Average';
    case 'needs_improvement': return 'Needs Improvement';
    default: return 'Unknown';
  }
};

export default function PerformanceMetrics() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTimeframe, setSelectedTimeframe] = useState('30d');

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="bg-slate-800/80 rounded-2xl p-6 border border-slate-700">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center space-x-4">
            <h2 className="text-lg font-semibold text-white">Performance Metrics</h2>
            <div className="flex items-center space-x-2">
              {['7d', '30d', '90d', '1y'].map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedTimeframe(period)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                    selectedTimeframe === period
                      ? 'bg-cyan-600 text-white'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  {period === '7d' ? '7 Days' : period === '30d' ? '30 Days' : period === '90d' ? '90 Days' : '1 Year'}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 px-4 py-2 bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600 transition-colors">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600 transition-colors">
              <Download className="h-4 w-4" />
              <span>Export</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiMetrics.map((kpi, index) => {
          const Icon = kpi.icon;
          const TrendIcon = kpi.trend === 'up' ? TrendingUp : TrendingDown;
          const isOnTarget = parseFloat(kpi.value) >= parseFloat(kpi.target);
          
          return (
            <div key={index} className="bg-slate-800/80 rounded-2xl p-6 border border-slate-700">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 ${kpi.bgColor} rounded-xl flex items-center justify-center`}>
                  <Icon className={`h-5 w-5 ${kpi.color}`} />
                </div>
                <div className={`flex items-center space-x-1 ${
                  kpi.trend === 'up' ? 'text-green-400' : 'text-red-400'
                }`}>
                  <TrendIcon className="h-4 w-4" />
                  <span className="text-sm font-medium">{kpi.change}</span>
                </div>
              </div>
              
              <h3 className="text-sm font-medium text-slate-400 mb-2">{kpi.title}</h3>
              <div className="flex items-baseline space-x-1 mb-2">
                <span className="text-2xl font-bold text-white">{kpi.value}</span>
                <span className="text-sm text-slate-400">{kpi.unit}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="text-xs text-slate-500">
                  Target: {kpi.target}{kpi.unit}
                </div>
                <div className={`w-2 h-2 rounded-full ${
                  isOnTarget ? 'bg-green-500' : 'bg-yellow-500'
                }`}></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Performance Categories */}
      <div className="bg-slate-800/80 rounded-2xl p-6 border border-slate-700">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">Performance Categories</h3>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
          >
            <option value="all">All Categories</option>
            <option value="safety">Safety Performance</option>
            <option value="operational">Operational Efficiency</option>
            <option value="crew">Crew Performance</option>
            <option value="maintenance">Maintenance Performance</option>
          </select>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {performanceCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="bg-slate-900/50 rounded-xl p-4 border border-slate-700">
              <h4 className="text-white font-semibold mb-4 flex items-center space-x-2">
                <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                <span>{category.category}</span>
              </h4>
              
              <div className="space-y-3">
                {category.metrics.map((metric, metricIndex) => (
                  <div key={metricIndex} className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-sm text-slate-300 font-medium">{metric.name}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-white font-semibold">{metric.value}</span>
                      <div className={`flex items-center space-x-1 ${
                        metric.trend === 'up' ? 'text-green-400' :
                        metric.trend === 'down' ? 'text-red-400' : 'text-slate-400'
                      }`}>
                        {metric.trend === 'up' && <TrendingUp className="h-3 w-3" />}
                        {metric.trend === 'down' && <TrendingDown className="h-3 w-3" />}
                        <span className="text-xs font-medium">{metric.change}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Vessel Performance Comparison */}
      <div className="bg-slate-800/80 rounded-2xl p-6 border border-slate-700">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">Vessel Performance Comparison</h3>
          <div className="text-sm text-slate-400">Last 30 days</div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left py-3 px-4 text-sm font-medium text-slate-400">Vessel</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-slate-400">Overall</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-slate-400">Safety</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-slate-400">Operational</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-slate-400">Crew</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-slate-400">Maintenance</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-slate-400">Status</th>
              </tr>
            </thead>
            <tbody>
              {vesselPerformance.map((vessel, index) => (
                <tr key={index} className="border-b border-slate-700/50 hover:bg-slate-700/20">
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-slate-700 rounded-lg flex items-center justify-center">
                        <Ship className="h-4 w-4 text-slate-400" />
                      </div>
                      <span className="text-white font-medium">{vessel.vessel}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-12 h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${
                            vessel.overall >= 90 ? 'bg-green-500' :
                            vessel.overall >= 80 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${vessel.overall}%` }}
                        ></div>
                      </div>
                      <span className="text-white font-medium text-sm">{vessel.overall}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center text-white font-medium">{vessel.safety}</td>
                  <td className="py-4 px-4 text-center text-white font-medium">{vessel.operational}</td>
                  <td className="py-4 px-4 text-center text-white font-medium">{vessel.crew}</td>
                  <td className="py-4 px-4 text-center text-white font-medium">{vessel.maintenance}</td>
                  <td className="py-4 px-4 text-center">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(vessel.status)}`}>
                      {getStatusLabel(vessel.status)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Performance Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-slate-800/80 rounded-2xl p-6 border border-slate-700">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-green-900/30 rounded-xl flex items-center justify-center">
              <Award className="h-5 w-5 text-green-400" />
            </div>
            <h3 className="text-lg font-semibold text-white">Top Performers</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-slate-300">MV Pacific Dream</span>
              <span className="text-green-400 font-semibold">95/100</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-300">MV Northern Star</span>
              <span className="text-green-400 font-semibold">92/100</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-300">Safety Training Rate</span>
              <span className="text-green-400 font-semibold">98%</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-800/80 rounded-2xl p-6 border border-slate-700">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-yellow-900/30 rounded-xl flex items-center justify-center">
              <Zap className="h-5 w-5 text-yellow-400" />
            </div>
            <h3 className="text-lg font-semibold text-white">Improvements</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-slate-300">Response Time</span>
              <span className="text-yellow-400 font-semibold">-0.5h</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-300">Fuel Efficiency</span>
              <span className="text-yellow-400 font-semibold">-0.4L/nm</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-300">Mission Success</span>
              <span className="text-yellow-400 font-semibold">+1.8%</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-800/80 rounded-2xl p-6 border border-slate-700">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-red-900/30 rounded-xl flex items-center justify-center">
              <AlertTriangle className="h-5 w-5 text-red-400" />
            </div>
            <h3 className="text-lg font-semibold text-white">Attention Needed</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-slate-300">MV Caribbean Queen</span>
              <span className="text-red-400 font-semibold">79/100</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-300">Parts Availability</span>
              <span className="text-red-400 font-semibold">92%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-300">Maintenance Issues</span>
              <span className="text-red-400 font-semibold">+3</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
