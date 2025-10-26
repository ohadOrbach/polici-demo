'use client';

import { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Calendar, 
  Filter, 
  Download,
  BarChart3,
  LineChart,
  PieChart,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  Ship
} from 'lucide-react';

const trendMetrics = [
  {
    title: 'Compliance Score Trend',
    value: '94.2%',
    change: '+2.3%',
    trend: 'up',
    period: 'vs last month',
    color: 'text-green-400',
    bgColor: 'bg-green-900/20',
    icon: CheckCircle
  },
  {
    title: 'Mission Completion Rate',
    value: '87.5%',
    change: '-1.2%',
    trend: 'down',
    period: 'vs last month',
    color: 'text-red-400',
    bgColor: 'bg-red-900/20',
    icon: Activity
  },
  {
    title: 'Average Response Time',
    value: '4.2h',
    change: '-0.8h',
    trend: 'up',
    period: 'vs last month',
    color: 'text-green-400',
    bgColor: 'bg-green-900/20',
    icon: Clock
  },
  {
    title: 'Critical Issues',
    value: '12',
    change: '+3',
    trend: 'down',
    period: 'vs last month',
    color: 'text-red-400',
    bgColor: 'bg-red-900/20',
    icon: AlertTriangle
  }
];

const timeRanges = [
  { label: '7 Days', value: '7d' },
  { label: '30 Days', value: '30d' },
  { label: '90 Days', value: '90d' },
  { label: '1 Year', value: '1y' }
];

const chartTypes = [
  { label: 'Line Chart', value: 'line', icon: LineChart },
  { label: 'Bar Chart', value: 'bar', icon: BarChart3 },
  { label: 'Area Chart', value: 'area', icon: Activity }
];

const vesselTrends = [
  {
    vessel: 'MV Northern Star',
    compliance: 96,
    missions: 24,
    issues: 2,
    trend: 'up',
    change: '+3.2%'
  },
  {
    vessel: 'MV Ocean Explorer',
    compliance: 89,
    missions: 18,
    issues: 5,
    trend: 'down',
    change: '-1.8%'
  },
  {
    vessel: 'MV Atlantic Voyager',
    compliance: 92,
    missions: 21,
    issues: 3,
    trend: 'up',
    change: '+2.1%'
  },
  {
    vessel: 'MV Pacific Dream',
    compliance: 98,
    missions: 15,
    issues: 1,
    trend: 'up',
    change: '+5.4%'
  },
  {
    vessel: 'MV Caribbean Queen',
    compliance: 85,
    missions: 19,
    issues: 7,
    trend: 'down',
    change: '-4.2%'
  }
];

export default function TrendAnalysis() {
  const [selectedTimeRange, setSelectedTimeRange] = useState('30d');
  const [selectedChartType, setSelectedChartType] = useState('line');
  const [selectedVessel, setSelectedVessel] = useState('all');

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="bg-slate-800/80 rounded-2xl p-6 border border-slate-700">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center space-x-4">
            <h2 className="text-lg font-semibold text-white">Trend Analysis</h2>
            <div className="flex items-center space-x-2">
              {timeRanges.map((range) => (
                <button
                  key={range.value}
                  onClick={() => setSelectedTimeRange(range.value)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                    selectedTimeRange === range.value
                      ? 'bg-cyan-600 text-white'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-slate-400" />
              <select
                value={selectedVessel}
                onChange={(e) => setSelectedVessel(e.target.value)}
                className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-1 text-white text-sm focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              >
                <option value="all">All Vessels</option>
                <option value="mv-northern-star">MV Northern Star</option>
                <option value="mv-ocean-explorer">MV Ocean Explorer</option>
                <option value="mv-atlantic-voyager">MV Atlantic Voyager</option>
                <option value="mv-pacific-dream">MV Pacific Dream</option>
                <option value="mv-caribbean-queen">MV Caribbean Queen</option>
              </select>
            </div>

            <div className="flex items-center space-x-1 bg-slate-700 rounded-lg p-1">
              {chartTypes.map((chart) => (
                <button
                  key={chart.value}
                  onClick={() => setSelectedChartType(chart.value)}
                  className={`p-1.5 rounded-md transition-colors ${
                    selectedChartType === chart.value
                      ? 'bg-cyan-600 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  title={chart.label}
                >
                  <chart.icon className="h-4 w-4" />
                </button>
              ))}
            </div>

            <button className="flex items-center space-x-2 px-4 py-2 bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600 transition-colors">
              <Download className="h-4 w-4" />
              <span>Export</span>
            </button>
          </div>
        </div>
      </div>

      {/* Trend Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {trendMetrics.map((metric, index) => {
          const Icon = metric.icon;
          const TrendIcon = metric.trend === 'up' ? TrendingUp : TrendingDown;
          
          return (
            <div key={index} className="bg-slate-800/80 rounded-2xl p-6 border border-slate-700">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 ${metric.bgColor} rounded-xl flex items-center justify-center`}>
                  <Icon className={`h-5 w-5 ${metric.color}`} />
                </div>
                <div className={`flex items-center space-x-1 ${metric.color}`}>
                  <TrendIcon className="h-4 w-4" />
                  <span className="text-sm font-medium">{metric.change}</span>
                </div>
              </div>
              <h3 className="text-sm font-medium text-slate-400 mb-1">{metric.title}</h3>
              <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
              <p className="text-xs text-slate-500">{metric.period}</p>
            </div>
          );
        })}
      </div>

      {/* Main Trend Chart */}
      <div className="bg-slate-800/80 rounded-2xl p-6 border border-slate-700">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">Compliance Score Trend</h3>
          <div className="flex items-center space-x-4 text-sm text-slate-400">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
              <span>Current Period</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-slate-500 rounded-full"></div>
              <span>Previous Period</span>
            </div>
          </div>
        </div>
        
        {/* Simulated Chart Area */}
        <div className="h-80 bg-slate-900/50 rounded-xl flex items-center justify-center border border-slate-700">
          <div className="text-center">
            <LineChart className="h-16 w-16 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400">Trend Chart Visualization</p>
            <p className="text-sm text-slate-500 mt-2">
              {selectedChartType.charAt(0).toUpperCase() + selectedChartType.slice(1)} chart for {selectedTimeRange} period
            </p>
          </div>
        </div>
      </div>

      {/* Vessel Performance Trends */}
      <div className="bg-slate-800/80 rounded-2xl p-6 border border-slate-700">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">Vessel Performance Trends</h3>
          <div className="text-sm text-slate-400">Last 30 days</div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left py-3 px-4 text-sm font-medium text-slate-400">Vessel</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-slate-400">Compliance Score</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-slate-400">Missions</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-slate-400">Issues</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-slate-400">Trend</th>
              </tr>
            </thead>
            <tbody>
              {vesselTrends.map((vessel, index) => (
                <tr key={index} className="border-b border-slate-700/50">
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-slate-700 rounded-lg flex items-center justify-center">
                        <Ship className="h-4 w-4 text-slate-400" />
                      </div>
                      <span className="text-white font-medium">{vessel.vessel}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-full bg-slate-700 rounded-full h-2 max-w-[100px]">
                        <div 
                          className={`h-2 rounded-full ${
                            vessel.compliance >= 95 ? 'bg-green-500' :
                            vessel.compliance >= 90 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${vessel.compliance}%` }}
                        ></div>
                      </div>
                      <span className="text-white font-medium">{vessel.compliance}%</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-white">{vessel.missions}</td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      vessel.issues <= 2 ? 'bg-green-900/30 text-green-400' :
                      vessel.issues <= 5 ? 'bg-yellow-900/30 text-yellow-400' :
                      'bg-red-900/30 text-red-400'
                    }`}>
                      {vessel.issues}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className={`flex items-center space-x-1 ${
                      vessel.trend === 'up' ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {vessel.trend === 'up' ? (
                        <TrendingUp className="h-4 w-4" />
                      ) : (
                        <TrendingDown className="h-4 w-4" />
                      )}
                      <span className="text-sm font-medium">{vessel.change}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Trend Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-800/80 rounded-2xl p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">Key Insights</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div>
                <p className="text-white font-medium">Compliance scores improving</p>
                <p className="text-sm text-slate-400">Average fleet compliance up 2.3% this month</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
              <div>
                <p className="text-white font-medium">Response time optimization</p>
                <p className="text-sm text-slate-400">Mission response time decreased by 0.8 hours</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
              <div>
                <p className="text-white font-medium">Critical issues increase</p>
                <p className="text-sm text-slate-400">3 more critical issues compared to last month</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-800/80 rounded-2xl p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">Recommendations</h3>
          <div className="space-y-4">
            <div className="p-4 bg-blue-900/20 border border-blue-600/30 rounded-lg">
              <p className="text-blue-400 font-medium mb-2">Focus on MV Caribbean Queen</p>
              <p className="text-sm text-slate-300">Lowest compliance score (85%) - needs immediate attention</p>
            </div>
            <div className="p-4 bg-green-900/20 border border-green-600/30 rounded-lg">
              <p className="text-green-400 font-medium mb-2">Replicate MV Pacific Dream practices</p>
              <p className="text-sm text-slate-300">Highest compliance (98%) - share best practices with fleet</p>
            </div>
            <div className="p-4 bg-yellow-900/20 border border-yellow-600/30 rounded-lg">
              <p className="text-yellow-400 font-medium mb-2">Investigate critical issues pattern</p>
              <p className="text-sm text-slate-300">Rising trend in critical issues needs root cause analysis</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
