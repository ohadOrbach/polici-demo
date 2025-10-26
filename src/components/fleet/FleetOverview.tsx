'use client';

import { useState } from 'react';
import { 
  Ship, 
  MapPin, 
  Users, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Anchor,
  Navigation,
  Fuel,
  Shield,
  Radio,
  Eye,
  Filter,
  Search,
  MoreVertical,
  Send,
  Calendar,
  Activity
} from 'lucide-react';

interface Vessel {
  id: string;
  name: string;
  type: 'cargo' | 'tanker' | 'container' | 'passenger' | 'research';
  status: 'active' | 'docked' | 'maintenance' | 'emergency';
  location: {
    lat: number;
    lng: number;
    port?: string;
    region: string;
  };
  captain: string;
  crew: number;
  maxCrew: number;
  lastUpdate: string;
  missions: {
    active: number;
    pending: number;
    completed: number;
    overdue: number;
  };
  compliance: {
    safety: number;
    environmental: number;
    operational: number;
    overall: number;
  };
  systems: {
    navigation: 'operational' | 'warning' | 'critical';
    communication: 'operational' | 'warning' | 'critical';
    engine: 'operational' | 'warning' | 'critical';
    safety: 'operational' | 'warning' | 'critical';
  };
  nextPort: string;
  eta: string;
  fuel: number;
  speed: number;
  heading: number;
}

const fleetData: Vessel[] = [
  {
    id: 'mv-001',
    name: 'MV Northern Star',
    type: 'cargo',
    status: 'active',
    location: {
      lat: 59.3293,
      lng: 18.0686,
      region: 'Baltic Sea',
      port: 'Stockholm'
    },
    captain: 'Captain Anderson',
    crew: 18,
    maxCrew: 22,
    lastUpdate: '2 min ago',
    missions: {
      active: 3,
      pending: 2,
      completed: 15,
      overdue: 0
    },
    compliance: {
      safety: 98,
      environmental: 95,
      operational: 97,
      overall: 97
    },
    systems: {
      navigation: 'operational',
      communication: 'operational',
      engine: 'operational',
      safety: 'operational'
    },
    nextPort: 'Helsinki',
    eta: '14:30 Today',
    fuel: 78,
    speed: 12.5,
    heading: 45
  },
  {
    id: 'mv-002',
    name: 'MV Atlantic Pioneer',
    type: 'container',
    status: 'active',
    location: {
      lat: 51.5074,
      lng: -0.1278,
      region: 'English Channel',
      port: 'London'
    },
    captain: 'Captain Rodriguez',
    crew: 24,
    maxCrew: 28,
    lastUpdate: '5 min ago',
    missions: {
      active: 2,
      pending: 4,
      completed: 22,
      overdue: 1
    },
    compliance: {
      safety: 92,
      environmental: 88,
      operational: 94,
      overall: 91
    },
    systems: {
      navigation: 'operational',
      communication: 'warning',
      engine: 'operational',
      safety: 'operational'
    },
    nextPort: 'Rotterdam',
    eta: '08:15 Tomorrow',
    fuel: 65,
    speed: 18.2,
    heading: 120
  },
  {
    id: 'mv-003',
    name: 'MV Pacific Explorer',
    type: 'tanker',
    status: 'docked',
    location: {
      lat: 37.7749,
      lng: -122.4194,
      region: 'San Francisco Bay',
      port: 'San Francisco'
    },
    captain: 'Captain Chen',
    crew: 20,
    maxCrew: 25,
    lastUpdate: '1 min ago',
    missions: {
      active: 1,
      pending: 3,
      completed: 18,
      overdue: 0
    },
    compliance: {
      safety: 96,
      environmental: 99,
      operational: 95,
      overall: 97
    },
    systems: {
      navigation: 'operational',
      communication: 'operational',
      engine: 'maintenance',
      safety: 'operational'
    },
    nextPort: 'Los Angeles',
    eta: '16:00 Tomorrow',
    fuel: 45,
    speed: 0,
    heading: 0
  },
  {
    id: 'mv-004',
    name: 'MV Arctic Voyager',
    type: 'research',
    status: 'active',
    location: {
      lat: 70.2676,
      lng: 31.1107,
      region: 'Barents Sea',
      port: 'Murmansk'
    },
    captain: 'Captain Larsen',
    crew: 15,
    maxCrew: 18,
    lastUpdate: '8 min ago',
    missions: {
      active: 4,
      pending: 1,
      completed: 12,
      overdue: 0
    },
    compliance: {
      safety: 99,
      environmental: 97,
      operational: 98,
      overall: 98
    },
    systems: {
      navigation: 'operational',
      communication: 'operational',
      engine: 'operational',
      safety: 'operational'
    },
    nextPort: 'Tromsø',
    eta: '12:45 Dec 18',
    fuel: 82,
    speed: 8.3,
    heading: 270
  },
  {
    id: 'mv-005',
    name: 'MV Mediterranean Sun',
    type: 'passenger',
    status: 'maintenance',
    location: {
      lat: 43.7696,
      lng: 11.2558,
      region: 'Mediterranean Sea',
      port: 'Florence'
    },
    captain: 'Captain Rossi',
    crew: 32,
    maxCrew: 35,
    lastUpdate: '15 min ago',
    missions: {
      active: 0,
      pending: 6,
      completed: 8,
      overdue: 2
    },
    compliance: {
      safety: 85,
      environmental: 90,
      operational: 78,
      overall: 84
    },
    systems: {
      navigation: 'operational',
      communication: 'operational',
      engine: 'critical',
      safety: 'warning'
    },
    nextPort: 'Naples',
    eta: 'TBD',
    fuel: 30,
    speed: 0,
    heading: 0
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active': return 'text-green-400 bg-green-900/30';
    case 'docked': return 'text-blue-400 bg-blue-900/30';
    case 'maintenance': return 'text-yellow-400 bg-yellow-900/30';
    case 'emergency': return 'text-red-400 bg-red-900/30';
    default: return 'text-slate-400 bg-slate-800';
  }
};

const getSystemStatusColor = (status: string) => {
  switch (status) {
    case 'operational': return 'text-green-400';
    case 'warning': return 'text-yellow-400';
    case 'critical': return 'text-red-400';
    default: return 'text-slate-400';
  }
};

const getVesselTypeIcon = (type: string) => {
  switch (type) {
    case 'cargo': return Ship;
    case 'container': return Ship;
    case 'tanker': return Fuel;
    case 'passenger': return Users;
    case 'research': return Activity;
    default: return Ship;
  }
};

export default function FleetOverview() {
  const [selectedVessel, setSelectedVessel] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredVessels = fleetData.filter(vessel => {
    const matchesSearch = vessel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vessel.captain.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vessel.location.region.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || vessel.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const fleetStats = {
    total: fleetData.length,
    active: fleetData.filter(v => v.status === 'active').length,
    docked: fleetData.filter(v => v.status === 'docked').length,
    maintenance: fleetData.filter(v => v.status === 'maintenance').length,
    emergency: fleetData.filter(v => v.status === 'emergency').length,
    totalMissions: fleetData.reduce((sum, v) => sum + v.missions.active + v.missions.pending, 0),
    overdueMissions: fleetData.reduce((sum, v) => sum + v.missions.overdue, 0),
    avgCompliance: Math.round(fleetData.reduce((sum, v) => sum + v.compliance.overall, 0) / fleetData.length)
  };

  return (
    <div className="space-y-6">
      {/* Fleet Statistics Header */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        <div className="bg-slate-800 rounded-2xl p-4 border border-slate-700">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-cyan-600 rounded-lg">
              <Ship className="h-4 w-4 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{fleetStats.total}</div>
              <div className="text-sm text-slate-400">Total Vessels</div>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 rounded-2xl p-4 border border-slate-700">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-600 rounded-lg">
              <Navigation className="h-4 w-4 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-green-400">{fleetStats.active}</div>
              <div className="text-sm text-slate-400">Active</div>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 rounded-2xl p-4 border border-slate-700">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Anchor className="h-4 w-4 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-400">{fleetStats.docked}</div>
              <div className="text-sm text-slate-400">Docked</div>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 rounded-2xl p-4 border border-slate-700">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-yellow-600 rounded-lg">
              <AlertTriangle className="h-4 w-4 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-400">{fleetStats.maintenance}</div>
              <div className="text-sm text-slate-400">Maintenance</div>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 rounded-2xl p-4 border border-slate-700">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-600 rounded-lg">
              <Clock className="h-4 w-4 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-400">{fleetStats.totalMissions}</div>
              <div className="text-sm text-slate-400">Active Missions</div>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 rounded-2xl p-4 border border-slate-700">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-red-600 rounded-lg">
              <AlertTriangle className="h-4 w-4 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-red-400">{fleetStats.overdueMissions}</div>
              <div className="text-sm text-slate-400">Overdue</div>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 rounded-2xl p-4 border border-slate-700">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-600 rounded-lg">
              <Shield className="h-4 w-4 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-green-400">{fleetStats.avgCompliance}%</div>
              <div className="text-sm text-slate-400">Avg Compliance</div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Controls */}
      <div className="bg-slate-800/80 rounded-2xl p-6 border border-slate-700">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex items-center space-x-4">
            <h2 className="text-xl font-bold text-white">Fleet Management</h2>
            <div className="flex space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  viewMode === 'grid' ? 'bg-cyan-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  viewMode === 'list' ? 'bg-cyan-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                List
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            {/* Search */}
            <div className="relative">
              <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search vessels..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
            </div>

            {/* Status Filter */}
            <div className="flex space-x-2">
              {['all', 'active', 'docked', 'maintenance', 'emergency'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                    filterStatus === status
                      ? 'bg-cyan-600 text-white'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  {status === 'all' ? 'All' : status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Vessel Grid/List */}
      <div className={viewMode === 'grid' ? 'grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6' : 'space-y-4'}>
        {filteredVessels.map((vessel) => {
          const VesselIcon = getVesselTypeIcon(vessel.type);
          
          return (
            <div 
              key={vessel.id} 
              className="bg-slate-800 rounded-2xl border border-slate-700 hover:border-cyan-500/50 transition-all duration-300 cursor-pointer"
              onClick={() => setSelectedVessel(selectedVessel === vessel.id ? null : vessel.id)}
            >
              {/* Vessel Header */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-3">
                    <div className="p-3 bg-slate-700 rounded-xl">
                      <VesselIcon className="h-6 w-6 text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1">{vessel.name}</h3>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(vessel.status)}`}>
                          {vessel.status.charAt(0).toUpperCase() + vessel.status.slice(1)}
                        </span>
                        <span className="text-xs text-slate-400 capitalize">{vessel.type}</span>
                      </div>
                    </div>
                  </div>
                  
                  <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors">
                    <MoreVertical className="h-4 w-4" />
                  </button>
                </div>

                {/* Location and Captain */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2 text-sm">
                    <MapPin className="h-4 w-4 text-slate-400" />
                    <span className="text-white">{vessel.location.region}</span>
                    {vessel.location.port && (
                      <span className="text-slate-400">• {vessel.location.port}</span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Users className="h-4 w-4 text-slate-400" />
                    <span className="text-white">{vessel.captain}</span>
                    <span className="text-slate-400">• {vessel.crew}/{vessel.maxCrew} crew</span>
                  </div>
                </div>

                {/* Mission Summary */}
                <div className="grid grid-cols-4 gap-2 mb-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-400">{vessel.missions.active}</div>
                    <div className="text-xs text-slate-400">Active</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-yellow-400">{vessel.missions.pending}</div>
                    <div className="text-xs text-slate-400">Pending</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-400">{vessel.missions.completed}</div>
                    <div className="text-xs text-slate-400">Done</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-red-400">{vessel.missions.overdue}</div>
                    <div className="text-xs text-slate-400">Overdue</div>
                  </div>
                </div>

                {/* Compliance Score */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-slate-400">Overall Compliance</span>
                    <span className="text-sm font-medium text-white">{vessel.compliance.overall}%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        vessel.compliance.overall >= 95 ? 'bg-green-500' :
                        vessel.compliance.overall >= 85 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${vessel.compliance.overall}%` }}
                    ></div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="flex space-x-2">
                  <button className="flex-1 py-2 bg-cyan-600 text-white rounded-lg text-sm font-medium hover:bg-cyan-700 transition-colors flex items-center justify-center">
                    <Send className="h-3 w-3 mr-1" />
                    Assign Mission
                  </button>
                  <button className="px-3 py-2 bg-slate-700 text-slate-300 rounded-lg text-sm font-medium hover:bg-slate-600 transition-colors">
                    <Eye className="h-3 w-3" />
                  </button>
                  <button className="px-3 py-2 bg-slate-700 text-slate-300 rounded-lg text-sm font-medium hover:bg-slate-600 transition-colors">
                    <Radio className="h-3 w-3" />
                  </button>
                </div>
              </div>

              {/* Expanded Details */}
              {selectedVessel === vessel.id && (
                <div className="border-t border-slate-700 p-6 bg-slate-800/50">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* System Status */}
                    <div>
                      <h4 className="text-sm font-semibold text-white mb-3">System Status</h4>
                      <div className="space-y-2">
                        {Object.entries(vessel.systems).map(([system, status]) => (
                          <div key={system} className="flex items-center justify-between">
                            <span className="text-sm text-slate-400 capitalize">{system}</span>
                            <span className={`text-sm font-medium ${getSystemStatusColor(status)} capitalize`}>
                              {status}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Navigation Info */}
                    <div>
                      <h4 className="text-sm font-semibold text-white mb-3">Navigation</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-400">Next Port</span>
                          <span className="text-sm text-white">{vessel.nextPort}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-400">ETA</span>
                          <span className="text-sm text-white">{vessel.eta}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-400">Speed</span>
                          <span className="text-sm text-white">{vessel.speed} knots</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-400">Fuel</span>
                          <span className="text-sm text-white">{vessel.fuel}%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Detailed Compliance */}
                  <div className="mt-6">
                    <h4 className="text-sm font-semibold text-white mb-3">Compliance Details</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {Object.entries(vessel.compliance).filter(([key]) => key !== 'overall').map(([category, score]) => (
                        <div key={category} className="text-center">
                          <div className={`text-lg font-bold ${
                            score >= 95 ? 'text-green-400' :
                            score >= 85 ? 'text-yellow-400' : 'text-red-400'
                          }`}>
                            {score}%
                          </div>
                          <div className="text-xs text-slate-400 capitalize">{category}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Extended Actions */}
                  <div className="flex flex-wrap gap-2 mt-6">
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      Schedule Inspection
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center">
                      <Radio className="h-3 w-3 mr-1" />
                      Contact Vessel
                    </button>
                    <button className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors flex items-center">
                      <Eye className="h-3 w-3 mr-1" />
                      View Details
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Last Update Footer */}
      <div className="text-center text-sm text-slate-400">
        Fleet data last updated: {new Date().toLocaleTimeString()} • {filteredVessels.length} vessels shown
      </div>
    </div>
  );
}
