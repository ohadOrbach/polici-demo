import { 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  FileText,
  Play,
  Download,
  WifiOff
} from 'lucide-react';

const missions = [
  {
    id: 1,
    title: 'Emergency Safety Drill',
    description: 'Complete fire drill and muster procedures',
    status: 'pending',
    priority: 'high',
    dueTime: '15:30',
    estimatedDuration: '45 min',
    offline: true,
    progress: 0,
    type: 'safety'
  },
  {
    id: 2,
    title: 'Navigation Equipment Check',
    description: 'Test GPS, radar, and communication systems',
    status: 'in-progress',
    priority: 'medium',
    dueTime: '16:00',
    estimatedDuration: '30 min',
    offline: true,
    progress: 60,
    type: 'equipment'
  },
  {
    id: 3,
    title: 'Engine Room Inspection',
    description: 'Daily engine room safety and maintenance check',
    status: 'completed',
    priority: 'medium',
    dueTime: '13:00',
    estimatedDuration: '60 min',
    offline: true,
    progress: 100,
    type: 'maintenance'
  },
  {
    id: 4,
    title: 'Crew Training Video',
    description: 'Watch mandatory safety training video',
    status: 'pending',
    priority: 'low',
    dueTime: '18:00',
    estimatedDuration: '25 min',
    offline: false,
    progress: 0,
    type: 'training'
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed': return 'text-green-400';
    case 'in-progress': return 'text-yellow-400';
    case 'pending': return 'text-slate-400';
    default: return 'text-slate-400';
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high': return 'border-red-500 bg-red-900/20';
    case 'medium': return 'border-yellow-500 bg-yellow-900/20';
    case 'low': return 'border-green-500 bg-green-900/20';
    default: return 'border-slate-600 bg-slate-800';
  }
};

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'safety': return AlertTriangle;
    case 'equipment': return CheckCircle;
    case 'maintenance': return FileText;
    case 'training': return Play;
    default: return FileText;
  }
};

export default function MobileMissionList() {
  return (
    <div className="p-4 space-y-4">
      {/* Filter Tabs */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        <button className="px-4 py-2 bg-cyan-600 text-white rounded-full text-sm font-medium whitespace-nowrap">
          All Tasks
        </button>
        <button className="px-4 py-2 bg-slate-700 text-slate-300 rounded-full text-sm font-medium whitespace-nowrap">
          Pending
        </button>
        <button className="px-4 py-2 bg-slate-700 text-slate-300 rounded-full text-sm font-medium whitespace-nowrap">
          In Progress
        </button>
        <button className="px-4 py-2 bg-slate-700 text-slate-300 rounded-full text-sm font-medium whitespace-nowrap">
          Completed
        </button>
      </div>

      {/* Mission Cards */}
      <div className="space-y-3">
        {missions.map((mission) => {
          const TypeIcon = getTypeIcon(mission.type);
          
          return (
            <div 
              key={mission.id} 
              className={`rounded-2xl border-l-4 p-4 ${getPriorityColor(mission.priority)}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-lg bg-slate-700 ${getStatusColor(mission.status)}`}>
                    <TypeIcon className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-semibold text-sm">{mission.title}</h3>
                    <p className="text-slate-400 text-xs mt-1">{mission.description}</p>
                  </div>
                </div>
                
                {/* Offline Indicator */}
                <div className="flex items-center space-x-2">
                  {mission.offline ? (
                    <div className="flex items-center space-x-1 px-2 py-1 bg-green-900/30 rounded-full">
                      <Download className="h-3 w-3 text-green-400" />
                      <span className="text-xs text-green-400">Offline</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-1 px-2 py-1 bg-orange-900/30 rounded-full">
                      <WifiOff className="h-3 w-3 text-orange-400" />
                      <span className="text-xs text-orange-400">Online</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Progress Bar (for in-progress missions) */}
              {mission.status === 'in-progress' && (
                <div className="mb-3">
                  <div className="flex justify-between text-xs text-slate-400 mb-1">
                    <span>Progress</span>
                    <span>{mission.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div 
                      className="bg-cyan-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${mission.progress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {/* Mission Details */}
              <div className="flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>Due: {mission.dueTime}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span>~{mission.estimatedDuration}</span>
                  </div>
                </div>
                
                <div className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
                  mission.status === 'completed' ? 'bg-green-900/30 text-green-400' :
                  mission.status === 'in-progress' ? 'bg-yellow-900/30 text-yellow-400' :
                  'bg-slate-700 text-slate-400'
                }`}>
                  {mission.status.replace('-', ' ')}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2 mt-3">
                {mission.status === 'pending' && (
                  <button className="flex-1 py-2 bg-cyan-600 text-white rounded-lg text-sm font-medium hover:bg-cyan-700 transition-colors">
                    Start Mission
                  </button>
                )}
                
                {mission.status === 'in-progress' && (
                  <>
                    <button className="flex-1 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
                      Continue
                    </button>
                    <button className="px-4 py-2 bg-slate-700 text-slate-300 rounded-lg text-sm font-medium hover:bg-slate-600 transition-colors">
                      Pause
                    </button>
                  </>
                )}
                
                {mission.status === 'completed' && (
                  <button className="flex-1 py-2 bg-slate-700 text-slate-300 rounded-lg text-sm font-medium hover:bg-slate-600 transition-colors">
                    View Report
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Sync Status */}
      <div className="bg-slate-800 rounded-2xl p-4 border border-slate-700 mt-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <div>
              <div className="text-sm font-medium text-white">All missions synced</div>
              <div className="text-xs text-slate-400">Last sync: 2 minutes ago</div>
            </div>
          </div>
          <button className="px-4 py-2 bg-slate-700 text-slate-300 rounded-lg text-sm font-medium hover:bg-slate-600 transition-colors">
            Sync Now
          </button>
        </div>
      </div>
    </div>
  );
}
