'use client';

import React, { useState, useMemo } from 'react';
import { 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  FileText,
  Play,
  Download,
  WifiOff,
  ChevronDown,
  ChevronUp,
  Users,
  MapPin,
  Star,
  Shield,
  User,
  CheckSquare,
  Camera,
  Video,
  Paperclip,
  Edit3
} from 'lucide-react';
import { useMissions } from '@/contexts/MissionsContext';
import { Mission } from '@/data/mockData';

interface TaskCheckbox {
  id: string;
  text: string;
  description?: string;
  required: boolean;
  checked: boolean;
  type: 'checkbox' | 'photo' | 'video' | 'file' | 'signature';
}

interface TaskAssignee {
  name: string;
  role: string;
  avatar?: string;
}

interface EnhancedMission {
  id: string; // Changed from number to string
  title: string;
  description: string;
  vessel: string;
  assignedBy: TaskAssignee;
  assignedTo: TaskAssignee;
  status: 'pending' | 'in-progress' | 'completed' | 'overdue';
  priority: 'high' | 'medium' | 'low';
  dueTime: string;
  estimatedDuration: string;
  offline: boolean;
  progress: number;
  type: 'safety' | 'equipment' | 'maintenance' | 'training';
  checkboxes: TaskCheckbox[];
  notes?: string;
  completedRequired: number;
  totalRequired: number;
  totalOptional: number;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed': return 'text-green-400';
    case 'in-progress': return 'text-yellow-400';
    case 'pending': return 'text-slate-400';
    case 'overdue': return 'text-red-400';
    default: return 'text-slate-400';
  }
};

const getPriorityColor = (priority: 'high' | 'medium' | 'low') => {
  switch (priority) {
    case 'high': return 'border-l-red-500 bg-slate-800/80';
    case 'medium': return 'border-l-yellow-500 bg-slate-800/80';
    case 'low': return 'border-l-green-500 bg-slate-800/80';
    default: return 'border-l-slate-500 bg-slate-800/80';
  }
};

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'safety': return AlertTriangle;
    case 'equipment': return CheckSquare;
    case 'maintenance': return FileText;
    case 'training': return Play;
    default: return FileText;
  }
};

const getRoleIcon = (role: string) => {
  switch (role.toLowerCase()) {
    case 'safety manager': return Shield;
    case 'fleet manager': return Users;
    case 'ship captain': 
    case 'captain': return Star;
    default: return User;
  }
};

const getCheckboxIcon = (type: string) => {
  switch (type) {
    case 'photo': return Camera;
    case 'video': return Video;
    case 'file': return Paperclip;
    case 'signature': return Edit3;
    default: return CheckSquare;
  }
};

export default function EnhancedMobileMissionList() {
  const { missions: rawMissions } = useMissions();
  
  const missions: EnhancedMission[] = useMemo(() => {
    return rawMissions.map((mission: Mission) => ({
      id: mission.id, // Use the original string ID
      title: mission.title,
      description: mission.description,
      vessel: mission.vessel,
      assignedBy: mission.assignedBy,
      assignedTo: mission.assignedTo,
      status: mission.status,
      priority: mission.priority,
      dueTime: mission.dueDate && !isNaN(new Date(mission.dueDate).getTime())
        ? new Date(mission.dueDate).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
        : 'No due date',
      estimatedDuration: mission.estimatedDuration,
      offline: mission.offline,
      progress: mission.progress,
      type: mission.type === 'compliance' ? 'safety' : mission.type as 'safety' | 'equipment' | 'maintenance' | 'training',
      checkboxes: mission.checkboxes.map(cb => ({
        id: cb.id,
        text: cb.text,
        description: cb.description,
        required: cb.required,
        checked: cb.checked,
        type: cb.type
      })),
      notes: mission.taskNotes,
      completedRequired: mission.checkboxes.filter(cb => cb.required && cb.checked).length,
      totalRequired: mission.checkboxes.filter(cb => cb.required).length,
      totalOptional: mission.checkboxes.filter(cb => !cb.required).length
    }));
  }, [rawMissions]);

  const [expandedMission, setExpandedMission] = useState<string | null>(null); // Changed from number to string
  const [activeFilter, setActiveFilter] = useState('all');

  const toggleMissionExpanded = (missionId: string) => { // Changed from number to string
    setExpandedMission(expandedMission === missionId ? null : missionId);
  };

  const filteredMissions = missions.filter(mission => {
    switch (activeFilter) {
      case 'pending': return mission.status === 'pending';
      case 'in-progress': return mission.status === 'in-progress';
      case 'completed': return mission.status === 'completed';
      case 'overdue': return mission.status === 'overdue';
      default: return true;
    }
  });

  return (
    <div className="p-4 space-y-4">
      {/* Filter Tabs */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {[
          { key: 'all', label: 'All Tasks' },
          { key: 'pending', label: 'Pending' },
          { key: 'in-progress', label: 'In Progress' },
          { key: 'completed', label: 'Completed' }
        ].map(filter => (
          <button
            key={filter.key}
            onClick={() => setActiveFilter(filter.key)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              activeFilter === filter.key
                ? 'bg-cyan-600 text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Mission Cards */}
      <div className="space-y-3">
        {filteredMissions.map((mission) => {
          const TypeIcon = getTypeIcon(mission.type);
          const isExpanded = expandedMission === mission.id;
          const canComplete = mission.completedRequired === mission.totalRequired;
          
          return (
            <div 
              key={mission.id} 
              className={`rounded-2xl border-l-4 ${getPriorityColor(mission.priority)} transition-all duration-300`}
            >
              {/* Mission Header */}
              <div 
                className="p-4 cursor-pointer"
                onClick={() => toggleMissionExpanded(mission.id)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start space-x-3 flex-1">
                    <div className={`p-2 rounded-lg bg-slate-700 ${getStatusColor(mission.status)}`}>
                      <TypeIcon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-semibold text-sm mb-1">{mission.title}</h3>
                      <p className="text-slate-400 text-xs mb-2 line-clamp-2">{mission.description}</p>
                      
                      {/* Mission Meta Info */}
                      <div className="flex items-center space-x-4 text-xs text-slate-500">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>Due: {mission.dueTime}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-3 w-3" />
                          <span>{mission.vessel}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="h-3 w-3" />
                          <span>{mission.estimatedDuration}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {/* Offline Indicator */}
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
                    
                    {/* Expand/Collapse Icon */}
                    {isExpanded ? (
                      <ChevronUp className="h-4 w-4 text-slate-400" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-slate-400" />
                    )}
                  </div>
                </div>

                {/* Progress Bar */}
                {mission.status === 'in-progress' && (
                  <div className="mb-3">
                    <div className="flex justify-between text-xs text-slate-400 mb-1">
                      <span>Progress</span>
                      <span>{mission.completedRequired}/{mission.totalRequired} required</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-500 ${
                          canComplete ? 'bg-gradient-to-r from-green-500 to-green-400' : 'bg-gradient-to-r from-cyan-500 to-blue-500'
                        }`}
                        style={{ width: `${(mission.completedRequired / mission.totalRequired) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Assignment Info */}
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-slate-700 rounded-full flex items-center justify-center">
                      {React.createElement(getRoleIcon(mission.assignedBy.role), {
                        className: "h-3 w-3 text-cyan-400"
                      })}
                    </div>
                    <div>
                      <p className="text-slate-500">From</p>
                      <p className="text-white font-medium">{mission.assignedBy.name}</p>
                      <p className="text-slate-400">{mission.assignedBy.role}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-slate-700 rounded-full flex items-center justify-center">
                      {React.createElement(getRoleIcon(mission.assignedTo.role), {
                        className: "h-3 w-3 text-green-400"
                      })}
                    </div>
                    <div>
                      <p className="text-slate-500">To</p>
                      <p className="text-white font-medium">{mission.assignedTo.name}</p>
                      <p className="text-slate-400">{mission.assignedTo.role}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Expanded Content */}
              {isExpanded && (
                <div className="border-t border-slate-700 p-4 space-y-4">
                  {/* Task Checklist Preview */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-sm font-medium text-white">Task Checklist</h4>
                      <div className="text-xs text-slate-400">
                        {mission.completedRequired}/{mission.totalRequired} required • 
                        {mission.checkboxes.filter(cb => !cb.required && cb.checked).length}/{mission.totalOptional} optional
                      </div>
                    </div>
                    
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {mission.checkboxes.map((checkbox) => {
                        const CheckboxIcon = getCheckboxIcon(checkbox.type);
                        
                        return (
                          <div 
                            key={checkbox.id} 
                            className={`flex items-center space-x-3 p-2 rounded-lg ${
                              checkbox.checked ? 'bg-green-900/20' : 'bg-slate-700/50'
                            }`}
                          >
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                              checkbox.checked 
                                ? 'bg-green-600 border-green-600' 
                                : checkbox.required
                                ? 'border-orange-500'
                                : 'border-slate-500'
                            }`}>
                              {checkbox.checked && <CheckCircle className="h-3 w-3 text-white" />}
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <span className={`text-xs ${
                                  checkbox.checked ? 'text-green-400 line-through' : 'text-white'
                                }`}>
                                  {checkbox.text}
                                </span>
                                <div className="flex items-center space-x-1">
                                  {checkbox.required && (
                                    <span className="px-1.5 py-0.5 bg-orange-900/30 text-orange-400 rounded text-xs">
                                      Required
                                    </span>
                                  )}
                                  {checkbox.type !== 'checkbox' && (
                                    <CheckboxIcon className={`h-3 w-3 ${
                                      checkbox.checked ? 'text-green-400' : 'text-slate-400'
                                    }`} />
                                  )}
                                </div>
                              </div>
                              {checkbox.description && (
                                <p className="text-xs text-slate-500 mt-1">{checkbox.description}</p>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3 pt-2">
                    {mission.status === 'completed' ? (
                      <div className="flex-1 py-2 bg-green-900/30 text-green-400 rounded-lg font-medium text-center text-sm flex items-center justify-center">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Completed
                      </div>
                    ) : (
                      <>
                        <button className="flex-1 py-2 bg-cyan-600 text-white rounded-lg font-medium hover:bg-cyan-700 transition-colors text-sm">
                          Open Task
                        </button>
                        {canComplete && (
                          <button className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors text-sm flex items-center">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Complete
                          </button>
                        )}
                      </>
                    )}
                  </div>

                  {/* Completion Requirements Warning */}
                  {!canComplete && mission.status !== 'completed' && (
                    <div className="flex items-center space-x-2 text-xs text-orange-400 bg-orange-900/20 p-2 rounded-lg">
                      <AlertTriangle className="h-3 w-3 flex-shrink-0" />
                      <span>{mission.totalRequired - mission.completedRequired} required items must be completed before task can be finished</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}