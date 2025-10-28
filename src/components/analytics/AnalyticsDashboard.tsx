'use client';

import React, { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Download, 
  RefreshCw,
  Users,
  Ship,
  Fuel,
  Clock,
  MapPin,
  FileText,
  Activity,
  Target,
  Award,
  Eye
} from 'lucide-react';

interface ComplianceMetric {
  category: string;
  score: number;
  trend: 'up' | 'down' | 'stable';
  change: number;
  status: 'excellent' | 'good' | 'warning' | 'critical';
  details: {
    compliant: number;
    total: number;
    lastAudit: string;
  };
}

interface FleetMetric {
  label: string;
  value: string;
  change: number;
  trend: 'up' | 'down' | 'stable';
  icon: React.ElementType;
  color: string;
}

interface ChartData {
  label: string;
  value: number;
  color: string;
}

const complianceMetrics: ComplianceMetric[] = [
  {
    category: 'Safety Compliance (SOLAS)',
    score: 96,
    trend: 'up',
    change: 2.3,
    status: 'excellent',
    details: {
      compliant: 48,
      total: 50,
      lastAudit: '2025-09-15'
    }
  },
  {
    category: 'Environmental (MARPOL)',
    score: 92,
    trend: 'stable',
    change: 0.1,
    status: 'excellent',
    details: {
      compliant: 46,
      total: 50,
      lastAudit: '2025-09-12'
    }
  },
  {
    category: 'Security (ISPS)',
    score: 88,
    trend: 'up',
    change: 1.8,
    status: 'good',
    details: {
      compliant: 44,
      total: 50,
      lastAudit: '2025-09-10'
    }
  },
  {
    category: 'Labor Standards (MLC)',
    score: 94,
    trend: 'down',
    change: -1.2,
    status: 'excellent',
    details: {
      compliant: 47,
      total: 50,
      lastAudit: '2025-09-08'
    }
  },
  {
    category: 'Port State Control',
    score: 85,
    trend: 'up',
    change: 3.1,
    status: 'good',
    details: {
      compliant: 42,
      total: 50,
      lastAudit: '2025-09-05'
    }
  },
  {
    category: 'Flag State Inspection',
    score: 78,
    trend: 'down',
    change: -2.8,
    status: 'warning',
    details: {
      compliant: 39,
      total: 50,
      lastAudit: '2025-09-03'
    }
  }
];

const fleetMetrics: FleetMetric[] = [
  {
    label: 'Active Vessels',
    value: '5',
    change: 0,
    trend: 'stable',
    icon: Ship,
    color: 'text-cyan-400'
  },
  {
    label: 'Total Crew',
    value: '109',
    change: 2.3,
    trend: 'up',
    icon: Users,
    color: 'text-green-400'
  },
  {
    label: 'Fuel Efficiency',
    value: '87.2%',
    change: 1.8,
    trend: 'up',
    icon: Fuel,
    color: 'text-blue-400'
  },
  {
    label: 'On-Time Delivery',
    value: '94.5%',
    change: -0.8,
    trend: 'down',
    icon: Clock,
    color: 'text-yellow-400'
  },
  {
    label: 'Port Calls',
    value: '23',
    change: 15.2,
    trend: 'up',
    icon: MapPin,
    color: 'text-purple-400'
  },
  {
    label: 'Incidents',
    value: '2',
    change: -33.3,
    trend: 'down',
    icon: AlertTriangle,
    color: 'text-red-400'
  }
];

const complianceChartData: ChartData[] = [
  { label: 'Excellent (90-100%)', value: 65, color: 'bg-green-500' },
  { label: 'Good (80-89%)', value: 25, color: 'bg-yellow-500' },
  { label: 'Warning (70-79%)', value: 8, color: 'bg-orange-500' },
  { label: 'Critical (<70%)', value: 2, color: 'bg-red-500' }
];

const monthlyTrendData = [
  { month: 'Jan', safety: 94, environmental: 91, security: 86 },
  { month: 'Feb', safety: 95, environmental: 90, security: 87 },
  { month: 'Mar', safety: 93, environmental: 92, security: 85 },
  { month: 'Apr', safety: 96, environmental: 91, security: 88 },
  { month: 'May', safety: 95, environmental: 93, security: 87 },
  { month: 'Jun', safety: 97, environmental: 92, security: 89 },
  { month: 'Jul', safety: 96, environmental: 94, security: 88 },
  { month: 'Aug', safety: 98, environmental: 93, security: 90 },
  { month: 'Sep', safety: 96, environmental: 92, security: 88 }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'excellent': return 'text-green-400 bg-green-900/30 border-green-500';
    case 'good': return 'text-blue-400 bg-blue-900/30 border-blue-500';
    case 'warning': return 'text-yellow-400 bg-yellow-900/30 border-yellow-500';
    case 'critical': return 'text-red-400 bg-red-900/30 border-red-500';
    default: return 'text-slate-400 bg-slate-800 border-slate-600';
  }
};

const getTrendIcon = (trend: string) => {
  switch (trend) {
    case 'up': return TrendingUp;
    case 'down': return TrendingDown;
    default: return Activity;
  }
};

const getTrendColor = (trend: string) => {
  switch (trend) {
    case 'up': return 'text-green-400';
    case 'down': return 'text-red-400';
    default: return 'text-slate-400';
  }
};

export default function AnalyticsDashboard() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('30d');
  
  const overallCompliance = Math.round(
    complianceMetrics.reduce((sum, metric) => sum + metric.score, 0) / complianceMetrics.length
  );

  return (
    <div className="space-y-6">
      {/* Header with Controls */}
      <div className="bg-slate-800/80 rounded-2xl p-6 border border-slate-700">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Fleet Analytics & Compliance</h2>
            <p className="text-slate-400">Comprehensive maritime compliance and performance monitoring</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-4">
            {/* Timeframe Selector */}
            <div className="flex space-x-2">
              {['7d', '30d', '90d', '1y'].map((timeframe) => (
                <button
                  key={timeframe}
                  onClick={() => setSelectedTimeframe(timeframe)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                    selectedTimeframe === timeframe
                      ? 'bg-cyan-600 text-white'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  {timeframe}
                </button>
              ))}
            </div>

            {/* Action Buttons */}
            <button className="px-4 py-2 bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600 transition-colors flex items-center">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </button>
            
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </button>
          </div>
        </div>
      </div>

      {/* Key Metrics Overview */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {fleetMetrics.map((metric) => {
          const TrendIcon = getTrendIcon(metric.trend);
          
          return (
            <div key={metric.label} className="bg-slate-800 rounded-2xl p-4 border border-slate-700">
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 bg-slate-700 rounded-lg ${metric.color}`}>
                  <metric.icon className="h-4 w-4" />
                </div>
                {metric.change !== 0 && (
                  <div className={`flex items-center space-x-1 ${getTrendColor(metric.trend)}`}>
                    <TrendIcon className="h-3 w-3" />
                    <span className="text-xs font-medium">{Math.abs(metric.change)}%</span>
                  </div>
                )}
              </div>
              <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
              <div className="text-sm text-slate-400">{metric.label}</div>
            </div>
          );
        })}
      </div>

      {/* Overall Compliance Score */}
      <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white">Overall Fleet Compliance</h3>
          <div className="flex items-center space-x-2">
            <div className={`text-3xl font-bold ${
              overallCompliance >= 95 ? 'text-green-400' :
              overallCompliance >= 85 ? 'text-yellow-400' : 'text-red-400'
            }`}>
              {overallCompliance}%
            </div>
            <div className={`p-2 rounded-lg ${
              overallCompliance >= 95 ? 'bg-green-900/30' :
              overallCompliance >= 85 ? 'bg-yellow-900/30' : 'bg-red-900/30'
            }`}>
              {overallCompliance >= 95 ? (
                <Award className="h-6 w-6 text-green-400" />
              ) : overallCompliance >= 85 ? (
                <Target className="h-6 w-6 text-yellow-400" />
              ) : (
                <AlertTriangle className="h-6 w-6 text-red-400" />
              )}
            </div>
          </div>
        </div>

        {/* Compliance Distribution Chart */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-white mb-3">Compliance Distribution</h4>
          <div className="space-y-3">
            {complianceChartData.map((item) => (
              <div key={item.label} className="flex items-center space-x-3">
                <div className="flex-1">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-300">{item.label}</span>
                    <span className="text-white font-medium">{item.value}%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${item.color} transition-all duration-500`}
                      style={{ width: `${item.value}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Compliance Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {complianceMetrics.map((metric) => {
          const TrendIcon = getTrendIcon(metric.trend);
          
          return (
            <div key={metric.category} className={`bg-slate-800 rounded-2xl p-6 border-l-4 ${getStatusColor(metric.status)}`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-white mb-1">{metric.category}</h4>
                  <div className="flex items-center space-x-4 text-sm text-slate-400">
                    <span>{metric.details.compliant}/{metric.details.total} compliant</span>
                    <span>Last audit: {new Date(metric.details.lastAudit).toLocaleDateString()}</span>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-2xl font-bold text-white mb-1">{metric.score}%</div>
                  <div className={`flex items-center space-x-1 ${getTrendColor(metric.trend)}`}>
                    <TrendIcon className="h-3 w-3" />
                    <span className="text-xs font-medium">{Math.abs(metric.change)}%</span>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="w-full bg-slate-700 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full transition-all duration-500 ${
                      metric.score >= 95 ? 'bg-green-500' :
                      metric.score >= 85 ? 'bg-yellow-500' :
                      metric.score >= 70 ? 'bg-orange-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${metric.score}%` }}
                  ></div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2">
                <button className="flex-1 py-2 bg-slate-700 text-slate-300 rounded-lg text-sm font-medium hover:bg-slate-600 transition-colors flex items-center justify-center">
                  <Eye className="h-3 w-3 mr-1" />
                  View Details
                </button>
                <button className="px-4 py-2 bg-cyan-600 text-white rounded-lg text-sm font-medium hover:bg-cyan-700 transition-colors flex items-center">
                  <FileText className="h-3 w-3 mr-1" />
                  Report
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Monthly Trends Chart */}
      <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white">Compliance Trends</h3>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-slate-400">Safety</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-slate-400">Environmental</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span className="text-sm text-slate-400">Security</span>
            </div>
          </div>
        </div>

        {/* Simplified Chart Representation */}
        <div className="space-y-4">
          {monthlyTrendData.slice(-6).map((data) => (
            <div key={data.month} className="flex items-center space-x-4">
              <div className="w-12 text-sm text-slate-400 font-medium">{data.month}</div>
              
              <div className="flex-1 grid grid-cols-3 gap-2">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-green-400">Safety</span>
                    <span className="text-white">{data.safety}%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-1">
                    <div 
                      className="bg-green-500 h-1 rounded-full transition-all duration-500"
                      style={{ width: `${data.safety}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-blue-400">Environmental</span>
                    <span className="text-white">{data.environmental}%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-1">
                    <div 
                      className="bg-blue-500 h-1 rounded-full transition-all duration-500"
                      style={{ width: `${data.environmental}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-purple-400">Security</span>
                    <span className="text-white">{data.security}%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-1">
                    <div 
                      className="bg-purple-500 h-1 rounded-full transition-all duration-500"
                      style={{ width: `${data.security}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Last Updated */}
      <div className="text-center text-sm text-slate-400">
        Analytics data last updated: {new Date().toLocaleString()} • Next refresh in 15 minutes
      </div>
    </div>
  );
}
