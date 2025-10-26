import Link from 'next/link';
import { Calendar, Clock, User, Ship, AlertTriangle, CheckCircle, FileText } from 'lucide-react';

// Mock mission data
const missions = [
  {
    id: 'MSN-001',
    title: 'Safety Drill - Fire Emergency',
    description: 'Complete fire safety drill including evacuation procedures and equipment check',
    ship: 'MV Atlantic Star',
    captain: 'Capt. Smith',
    status: 'in-progress',
    priority: 'high',
    dueDate: '2025-09-20',
    progress: 75,
    assignedDate: '2025-09-15',
    category: 'Safety Drill'
  },
  {
    id: 'MSN-002',
    title: 'Engine Room Inspection',
    description: 'Monthly engine room safety and maintenance compliance check',
    ship: 'MV Pacific Queen',
    captain: 'Capt. Jones',
    status: 'completed',
    priority: 'medium',
    dueDate: '2025-09-18',
    progress: 100,
    assignedDate: '2025-09-10',
    category: 'Inspection'
  },
  {
    id: 'MSN-003',
    title: 'Navigation Equipment Test',
    description: 'Test all navigation equipment including GPS, radar, and communication systems',
    ship: 'MV Northern Wind',
    captain: 'Capt. Wilson',
    status: 'overdue',
    priority: 'high',
    dueDate: '2025-09-16',
    progress: 30,
    assignedDate: '2025-09-12',
    category: 'Equipment Test'
  },
  {
    id: 'MSN-004',
    title: 'Crew Training - MOB Drill',
    description: 'Man overboard drill training for all crew members',
    ship: 'MV Southern Cross',
    captain: 'Capt. Davis',
    status: 'published',
    priority: 'medium',
    dueDate: '2025-09-25',
    progress: 0,
    assignedDate: '2025-09-17',
    category: 'Training'
  },
  {
    id: 'MSN-005',
    title: 'Cargo Hold Inspection',
    description: 'Pre-loading inspection of cargo holds and securing equipment',
    ship: 'MV Eastern Dawn',
    captain: 'Capt. Brown',
    status: 'in-progress',
    priority: 'medium',
    dueDate: '2025-09-22',
    progress: 45,
    assignedDate: '2025-09-16',
    category: 'Inspection'
  },
  {
    id: 'MSN-006',
    title: 'Environmental Compliance Check',
    description: 'Verify compliance with environmental regulations and waste management',
    ship: 'MV Western Explorer',
    captain: 'Capt. Taylor',
    status: 'draft',
    priority: 'low',
    dueDate: '2025-09-28',
    progress: 0,
    assignedDate: '2025-09-17',
    category: 'Compliance'
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'draft': return 'bg-slate-700 text-slate-300';
    case 'published': return 'bg-cyan-900/30 text-cyan-400';
    case 'in-progress': return 'bg-yellow-900/30 text-yellow-400';
    case 'completed': return 'bg-green-900/30 text-green-400';
    case 'overdue': return 'bg-red-900/30 text-red-400';
    default: return 'bg-slate-700 text-slate-300';
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high': return 'text-red-400';
    case 'medium': return 'text-yellow-400';
    case 'low': return 'text-green-400';
    default: return 'text-slate-400';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'completed': return CheckCircle;
    case 'overdue': return AlertTriangle;
    case 'in-progress': return Clock;
    default: return FileText;
  }
};

export default function MissionGrid() {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50">
      <div className="p-8 border-b border-gray-200/50">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center mr-3 shadow-lg">
              <FileText className="h-5 w-5 text-white" />
            </div>
            Active Missions
          </h2>
          <div className="flex items-center space-x-3">
            <button className="px-6 py-3 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 shadow-sm transition-colors">
              Export
            </button>
            <Link href="/missions" className="px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl hover:from-blue-700 hover:to-blue-800 shadow-lg transition-all inline-block">
              New Mission
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 p-8">
        {missions.map((mission) => {
          const StatusIcon = getStatusIcon(mission.status);
          return (
            <div key={mission.id} className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg border border-gray-200/50 p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 backdrop-blur-sm">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <StatusIcon className="h-5 w-5 text-gray-600" />
                  <span className="text-sm font-medium text-gray-500">{mission.id}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`status-badge ${getStatusColor(mission.status)}`}>
                    {mission.status.replace('-', ' ')}
                  </span>
                  <span className={`text-sm font-medium ${getPriorityColor(mission.priority)}`}>
                    {mission.priority}
                  </span>
                </div>
              </div>

              {/* Title and Description */}
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{mission.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">{mission.description}</p>
              </div>

              {/* Progress Bar */}
              {mission.status === 'in-progress' && (
                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                    <span>Progress</span>
                    <span>{mission.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${mission.progress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {/* Mission Details */}
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center">
                  <Ship className="h-4 w-4 mr-2 text-gray-400" />
                  <span>{mission.ship}</span>
                </div>
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2 text-gray-400" />
                  <span>{mission.captain}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                  <span>Due: {new Date(mission.dueDate).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    {mission.category}
                  </span>
                  <div className="flex space-x-2">
                    <Link href={`/missions/${mission.id}/view`} className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                      View
                    </Link>
                    <button className="text-gray-600 hover:text-gray-700 text-sm font-medium">
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Load More */}
      <div className="px-6 py-4 border-t border-gray-200 text-center">
        <button className="text-blue-600 hover:text-blue-700 font-medium">
          Load More Missions
        </button>
      </div>
    </div>
  );
}
