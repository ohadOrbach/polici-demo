'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Ship, 
  Clock, 
  CheckCircle, 
  ArrowLeft,
  MapPin,
  Calendar
} from 'lucide-react';

interface ShipProgress {
  shipId: string;
  shipName: string;
  captain: string;
  status: 'pending' | 'in-progress' | 'completed' | 'overdue';
  progress: number;
  totalTasks: number;
  completedTasks: number;
  lastUpdate: string;
  location: string;
  assignedDate: string;
  dueDate: string;
  notes: string[];
  attachments: number;
}

interface MissionDetail {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: 'high' | 'medium' | 'low';
  createdDate: string;
  dueDate: string;
  assignedBy: string;
  totalShips: number;
  completedShips: number;
  overallProgress: number;
}

// Mock data
const missionDetail: MissionDetail = {
  id: 'MSN-001',
  title: 'Safety Drill - Fire Emergency',
  description: 'Complete fire safety drill including evacuation procedures and equipment check. This comprehensive drill must be conducted according to SOLAS regulations and documented thoroughly.',
  category: 'Safety Compliance',
  priority: 'high',
  createdDate: '2025-09-15',
  dueDate: '2025-09-20',
  assignedBy: 'Sarah Johnson - Safety Manager',
  totalShips: 5,
  completedShips: 2,
  overallProgress: 68
};

const shipProgress: ShipProgress[] = [
  {
    shipId: 'ship_001',
    shipName: 'MV Northern Star',
    captain: 'Captain James Smith',
    status: 'completed',
    progress: 100,
    totalTasks: 8,
    completedTasks: 8,
    lastUpdate: '2025-09-18T14:30:00Z',
    location: 'Port of Rotterdam',
    assignedDate: '2025-09-15',
    dueDate: '2025-09-20',
    notes: ['All crew participated successfully', 'Minor equipment issue resolved', 'Excellent response time'],
    attachments: 12
  },
  {
    shipId: 'ship_002',
    shipName: 'MV Ocean Explorer',
    captain: 'Captain Maria Rodriguez',
    status: 'completed',
    progress: 100,
    totalTasks: 8,
    completedTasks: 8,
    lastUpdate: '2025-09-17T16:45:00Z',
    location: 'Atlantic Ocean',
    assignedDate: '2025-09-15',
    dueDate: '2025-09-20',
    notes: ['Drill completed ahead of schedule', 'All safety equipment verified'],
    attachments: 8
  },
  {
    shipId: 'ship_003',
    shipName: 'MV Atlantic Voyager',
    captain: 'Captain David Thompson',
    status: 'in-progress',
    progress: 75,
    totalTasks: 8,
    completedTasks: 6,
    lastUpdate: '2025-09-19T09:15:00Z',
    location: 'Gulf of Mexico',
    assignedDate: '2025-09-15',
    dueDate: '2025-09-20',
    notes: ['Drill in progress', 'Equipment check completed', 'Awaiting final documentation'],
    attachments: 6
  },
  {
    shipId: 'ship_004',
    shipName: 'MV Pacific Dream',
    captain: 'Captain Lisa Chen',
    status: 'pending',
    progress: 25,
    totalTasks: 8,
    completedTasks: 2,
    lastUpdate: '2025-09-16T11:00:00Z',
    location: 'Singapore Port',
    assignedDate: '2025-09-15',
    dueDate: '2025-09-20',
    notes: ['Initial preparation completed'],
    attachments: 2
  },
  {
    shipId: 'ship_005',
    shipName: 'MV Caribbean Queen',
    captain: 'Captain Robert Martinez',
    status: 'overdue',
    progress: 40,
    totalTasks: 8,
    completedTasks: 3,
    lastUpdate: '2025-09-19T08:30:00Z',
    location: 'Port of Miami',
    assignedDate: '2025-09-15',
    dueDate: '2025-09-20',
    notes: ['Delayed due to port restrictions', 'Partial completion only'],
    attachments: 3
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed': return 'text-green-400 bg-green-900/30 border-green-500/30';
    case 'in-progress': return 'text-yellow-400 bg-yellow-900/30 border-yellow-500/30';
    case 'pending': return 'text-slate-400 bg-slate-700 border-slate-600';
    case 'overdue': return 'text-red-400 bg-red-900/30 border-red-500/30';
    default: return 'text-slate-400 bg-slate-700 border-slate-600';
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high': return 'text-red-400 bg-red-900/30 border-red-500/30';
    case 'medium': return 'text-yellow-400 bg-yellow-900/30 border-yellow-500/30';
    case 'low': return 'text-green-400 bg-green-900/30 border-green-500/30';
    default: return 'text-slate-400 bg-slate-700 border-slate-600';
  }
};

interface MissionViewDetailProps {
  missionId: string;
}

export default function MissionViewDetail({ missionId }: MissionViewDetailProps) {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filteredShips = shipProgress.filter(ship => {
    switch (selectedFilter) {
      case 'completed': return ship.status === 'completed';
      case 'in-progress': return ship.status === 'in-progress';
      case 'pending': return ship.status === 'pending';
      case 'overdue': return ship.status === 'overdue';
      default: return true;
    }
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-800/80 rounded-2xl p-6 border border-slate-700">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <Link 
              href="/dashboard" 
              className="p-2 bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-white">{missionDetail.title}</h1>
              <p className="text-slate-400">Mission ID: {missionDetail.id}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getPriorityColor(missionDetail.priority)}`}>
              {missionDetail.priority.toUpperCase()}
            </span>
            <button className="flex items-center space-x-2 px-4 py-2 bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600 transition-colors">
              <span>Export Report</span>
            </button>
          </div>
        </div>

        <p className="text-slate-300 mb-4">{missionDetail.description}</p>

        {/* Mission Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-slate-900/50 rounded-xl p-4">
            <div className="flex items-center space-x-3 mb-2">
              <Ship className="h-5 w-5 text-cyan-400" />
              <span className="text-slate-400 text-sm">Total Ships</span>
            </div>
            <div className="text-2xl font-bold text-white">{missionDetail.totalShips}</div>
          </div>
          
          <div className="bg-slate-900/50 rounded-xl p-4">
            <div className="flex items-center space-x-3 mb-2">
              <CheckCircle className="h-5 w-5 text-green-400" />
              <span className="text-slate-400 text-sm">Completed</span>
            </div>
            <div className="text-2xl font-bold text-white">{missionDetail.completedShips}</div>
          </div>
          
          <div className="bg-slate-900/50 rounded-xl p-4">
            <div className="flex items-center space-x-3 mb-2">
              <span className="text-slate-400 text-sm">Overall Progress</span>
            </div>
            <div className="text-2xl font-bold text-white">{missionDetail.overallProgress}%</div>
          </div>
          
          <div className="bg-slate-900/50 rounded-xl p-4">
            <div className="flex items-center space-x-3 mb-2">
              <Calendar className="h-5 w-5 text-yellow-400" />
              <span className="text-slate-400 text-sm">Due Date</span>
            </div>
            <div className="text-lg font-bold text-white">{new Date(missionDetail.dueDate).toLocaleDateString()}</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-slate-800/80 rounded-2xl p-4 border border-slate-700">
        <div className="flex items-center justify-between">
          <div className="flex space-x-2">
            {[
              { key: 'all', label: 'All Ships', count: shipProgress.length },
              { key: 'completed', label: 'Completed', count: shipProgress.filter(s => s.status === 'completed').length },
              { key: 'in-progress', label: 'In Progress', count: shipProgress.filter(s => s.status === 'in-progress').length },
              { key: 'pending', label: 'Pending', count: shipProgress.filter(s => s.status === 'pending').length },
              { key: 'overdue', label: 'Overdue', count: shipProgress.filter(s => s.status === 'overdue').length }
            ].map(filter => (
              <button
                key={filter.key}
                onClick={() => setSelectedFilter(filter.key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedFilter === filter.key
                    ? 'bg-cyan-600 text-white'
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                {filter.label} ({filter.count})
              </button>
            ))}
          </div>
          
          <div className="text-sm text-slate-400">
            Last updated: {new Date().toLocaleString()}
          </div>
        </div>
      </div>

      {/* Ship Progress List */}
      <div className="bg-slate-800/80 rounded-2xl border border-slate-700 overflow-hidden">
        <div className="p-6 border-b border-slate-700">
          <h3 className="text-lg font-semibold text-white">Ship Progress</h3>
        </div>
        
        <div className="divide-y divide-slate-700">
          {filteredShips.map((ship) => (
            <Link
              key={ship.shipId}
              href={`/missions/${missionId}/ships/${ship.shipId}`}
              className="block p-6 hover:bg-slate-700/30 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-slate-700 rounded-xl flex items-center justify-center">
                    <Ship className="h-6 w-6 text-slate-400" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-1">
                      <h4 className="text-white font-semibold">{ship.shipName}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(ship.status)}`}>
                        {ship.status.replace('-', ' ').toUpperCase()}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-slate-400 mb-2">
                      <div className="flex items-center space-x-1">
                        <span>{ship.captain}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-3 w-3" />
                        <span>{ship.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>Updated: {new Date(ship.lastUpdate).toLocaleDateString()}</span>
                      </div>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="flex items-center space-x-3">
                      <div className="flex-1">
                        <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                          <span>Progress</span>
                          <span>{ship.completedTasks}/{ship.totalTasks} tasks</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-500 ${
                              ship.progress === 100 ? 'bg-green-500' :
                              ship.progress >= 50 ? 'bg-yellow-500' : 'bg-cyan-500'
                            }`}
                            style={{ width: `${ship.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-white">{ship.progress}%</div>
                        <div className="text-xs text-slate-400">{ship.attachments} files</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Mission Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-800/80 rounded-2xl p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">Mission Information</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-slate-400">Category</label>
                <p className="text-white font-medium">{missionDetail.category}</p>
              </div>
              <div>
                <label className="text-sm text-slate-400">Assigned By</label>
                <p className="text-white font-medium">{missionDetail.assignedBy}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-slate-400">Created Date</label>
                <p className="text-white font-medium">{new Date(missionDetail.createdDate).toLocaleDateString()}</p>
              </div>
              <div>
                <label className="text-sm text-slate-400">Due Date</label>
                <p className="text-white font-medium">{new Date(missionDetail.dueDate).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-800/80 rounded-2xl p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">Progress Summary</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Completion Rate</span>
              <span className="text-white font-bold">{Math.round((missionDetail.completedShips / missionDetail.totalShips) * 100)}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">On Schedule</span>
              <span className="text-green-400 font-bold">{shipProgress.filter(s => s.status !== 'overdue').length}/{shipProgress.length}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Total Attachments</span>
              <span className="text-white font-bold">{shipProgress.reduce((sum, ship) => sum + ship.attachments, 0)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
