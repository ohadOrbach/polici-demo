'use client';

import React, { useState } from 'react';
import { 
  Ship, 
  Users, 
  Clock, 
  CheckCircle, 
  Send, 
  X, 
  Calendar,
  FileText,
  Target,
  Zap,
  Shield,
  Search
} from 'lucide-react';

interface Mission {
  id: string;
  title: string;
  description: string;
  type: 'safety' | 'maintenance' | 'inspection' | 'training' | 'compliance';
  priority: 'high' | 'medium' | 'low';
  estimatedHours: number;
  dueDate: string;
  requirements: string[];
  assignedVessels: string[];
  status: 'draft' | 'ready' | 'assigned' | 'active';
}

interface Vessel {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'docked' | 'maintenance';
  location: string;
  captain: string;
  crew: number;
  currentMissions: number;
  maxMissions: number;
  compliance: number;
  lastContact: string;
}

const availableMissions: Mission[] = [
  {
    id: 'mission-001',
    title: 'Emergency Safety Drill',
    description: 'Conduct comprehensive fire drill and muster procedures according to SOLAS regulations',
    type: 'safety',
    priority: 'high',
    estimatedHours: 2,
    dueDate: '2025-09-18',
    requirements: ['Fire safety equipment', 'Crew availability', 'Emergency procedures manual'],
    assignedVessels: [],
    status: 'ready'
  },
  {
    id: 'mission-002',
    title: 'Navigation Equipment Calibration',
    description: 'Calibrate and test all navigation equipment including GPS, radar, and compass systems',
    type: 'maintenance',
    priority: 'medium',
    estimatedHours: 4,
    dueDate: '2025-09-20',
    requirements: ['Technical crew', 'Calibration tools', 'Port access'],
    assignedVessels: ['mv-001'],
    status: 'assigned'
  },
  {
    id: 'mission-003',
    title: 'Environmental Compliance Audit',
    description: 'Complete environmental compliance audit and documentation review',
    type: 'compliance',
    priority: 'high',
    estimatedHours: 6,
    dueDate: '2025-09-19',
    requirements: ['Environmental officer', 'Documentation access', 'Audit checklist'],
    assignedVessels: [],
    status: 'ready'
  },
  {
    id: 'mission-004',
    title: 'Crew Training - Bridge Operations',
    description: 'Advanced bridge operations training for navigation officers',
    type: 'training',
    priority: 'medium',
    estimatedHours: 8,
    dueDate: '2025-09-25',
    requirements: ['Training materials', 'Bridge simulator access', 'Certified instructor'],
    assignedVessels: [],
    status: 'draft'
  },
  {
    id: 'mission-005',
    title: 'Hull Inspection',
    description: 'Underwater hull inspection and maintenance assessment',
    type: 'inspection',
    priority: 'high',
    estimatedHours: 3,
    dueDate: '2025-09-22',
    requirements: ['Diving equipment', 'Dry dock access', 'Inspection crew'],
    assignedVessels: ['mv-003'],
    status: 'assigned'
  }
];

const fleetVessels: Vessel[] = [
  {
    id: 'mv-001',
    name: 'MV Northern Star',
    type: 'Cargo',
    status: 'active',
    location: 'Baltic Sea',
    captain: 'Captain Anderson',
    crew: 18,
    currentMissions: 3,
    maxMissions: 5,
    compliance: 97,
    lastContact: '2 min ago'
  },
  {
    id: 'mv-002',
    name: 'MV Atlantic Pioneer',
    type: 'Container',
    status: 'active',
    location: 'English Channel',
    captain: 'Captain Rodriguez',
    crew: 24,
    currentMissions: 2,
    maxMissions: 6,
    compliance: 91,
    lastContact: '5 min ago'
  },
  {
    id: 'mv-003',
    name: 'MV Pacific Explorer',
    type: 'Tanker',
    status: 'docked',
    location: 'San Francisco Bay',
    captain: 'Captain Chen',
    crew: 20,
    currentMissions: 1,
    maxMissions: 4,
    compliance: 97,
    lastContact: '1 min ago'
  },
  {
    id: 'mv-004',
    name: 'MV Arctic Voyager',
    type: 'Research',
    status: 'active',
    location: 'Barents Sea',
    captain: 'Captain Larsen',
    crew: 15,
    currentMissions: 4,
    maxMissions: 5,
    compliance: 98,
    lastContact: '8 min ago'
  },
  {
    id: 'mv-005',
    name: 'MV Mediterranean Sun',
    type: 'Passenger',
    status: 'maintenance',
    location: 'Mediterranean Sea',
    captain: 'Captain Rossi',
    crew: 32,
    currentMissions: 0,
    maxMissions: 3,
    compliance: 84,
    lastContact: '15 min ago'
  }
];

const getMissionTypeIcon = (type: string) => {
  switch (type) {
    case 'safety': return Shield;
    case 'maintenance': return FileText;
    case 'inspection': return Target;
    case 'training': return Users;
    case 'compliance': return CheckCircle;
    default: return FileText;
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high': return 'text-red-400 bg-red-900/30 border-red-500';
    case 'medium': return 'text-yellow-400 bg-yellow-900/30 border-yellow-500';
    case 'low': return 'text-green-400 bg-green-900/30 border-green-500';
    default: return 'text-slate-400 bg-slate-800 border-slate-600';
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active': return 'text-green-400 bg-green-900/30';
    case 'docked': return 'text-blue-400 bg-blue-900/30';
    case 'maintenance': return 'text-yellow-400 bg-yellow-900/30';
    default: return 'text-slate-400 bg-slate-800';
  }
};

export default function ShipAssignment() {
  const [selectedMission, setSelectedMission] = useState<string | null>(null);
  const [selectedVessels, setSelectedVessels] = useState<string[]>([]);
  const [showAssignmentModal, setShowAssignmentModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredMissions = availableMissions.filter(mission => {
    const matchesSearch = mission.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mission.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || mission.type === filterType;
    const matchesStatus = filterStatus === 'all' || mission.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleVesselSelect = (vesselId: string) => {
    setSelectedVessels(prev => 
      prev.includes(vesselId) 
        ? prev.filter(id => id !== vesselId)
        : [...prev, vesselId]
    );
  };

  const handleAssignMission = () => {
    if (selectedMission && selectedVessels.length > 0) {
      // Here you would typically make an API call to assign the mission
      console.log('Assigning mission', selectedMission, 'to vessels', selectedVessels);
      setShowAssignmentModal(false);
      setSelectedMission(null);
      setSelectedVessels([]);
    }
  };

  const getVesselAvailability = (vessel: Vessel) => {
    const capacity = ((vessel.maxMissions - vessel.currentMissions) / vessel.maxMissions) * 100;
    return {
      percentage: capacity,
      color: capacity > 60 ? 'text-green-400' : capacity > 30 ? 'text-yellow-400' : 'text-red-400'
    };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-800/80 rounded-2xl p-6 border border-slate-700">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Mission Assignment</h2>
            <p className="text-slate-400">Assign missions to vessels across your fleet</p>
          </div>
          
          <button 
            onClick={() => setShowAssignmentModal(true)}
            className="px-6 py-3 bg-cyan-600 text-white rounded-lg font-medium hover:bg-cyan-700 transition-colors flex items-center"
          >
            <Send className="h-4 w-4 mr-2" />
            Create New Mission
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-slate-800/80 rounded-2xl p-6 border border-slate-700">
        <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search missions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            />
          </div>

          {/* Type Filter */}
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
          >
            <option value="all">All Types</option>
            <option value="safety">Safety</option>
            <option value="maintenance">Maintenance</option>
            <option value="inspection">Inspection</option>
            <option value="training">Training</option>
            <option value="compliance">Compliance</option>
          </select>

          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="draft">Draft</option>
            <option value="ready">Ready</option>
            <option value="assigned">Assigned</option>
            <option value="active">Active</option>
          </select>
        </div>
      </div>

      {/* Mission List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredMissions.map((mission) => {
          const MissionIcon = getMissionTypeIcon(mission.type);
          
          return (
            <div 
              key={mission.id} 
              className={`bg-slate-800 rounded-2xl border-l-4 ${getPriorityColor(mission.priority)} hover:border-cyan-500/50 transition-all duration-300`}
            >
              <div className="p-6">
                {/* Mission Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-slate-700 rounded-lg">
                      <MissionIcon className="h-5 w-5 text-cyan-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white mb-1">{mission.title}</h3>
                      <p className="text-slate-400 text-sm mb-2 line-clamp-2">{mission.description}</p>
                      
                      <div className="flex items-center space-x-4 text-xs text-slate-500">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{mission.estimatedHours}h</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>Due: {new Date(mission.dueDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end space-y-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
                      mission.status === 'ready' ? 'bg-green-900/30 text-green-400' :
                      mission.status === 'assigned' ? 'bg-blue-900/30 text-blue-400' :
                      mission.status === 'active' ? 'bg-purple-900/30 text-purple-400' :
                      'bg-slate-700 text-slate-400'
                    }`}>
                      {mission.status}
                    </span>
                    
                    <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getPriorityColor(mission.priority)}`}>
                      {mission.priority}
                    </span>
                  </div>
                </div>

                {/* Requirements */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-white mb-2">Requirements:</h4>
                  <div className="flex flex-wrap gap-1">
                    {mission.requirements.map((req, index) => (
                      <span key={index} className="px-2 py-1 bg-slate-700 text-slate-300 rounded text-xs">
                        {req}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Assigned Vessels */}
                {mission.assignedVessels.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-white mb-2">Assigned to:</h4>
                    <div className="space-y-1">
                      {mission.assignedVessels.map((vesselId) => {
                        const vessel = fleetVessels.find(v => v.id === vesselId);
                        return vessel ? (
                          <div key={vesselId} className="flex items-center space-x-2 text-sm">
                            <Ship className="h-3 w-3 text-cyan-400" />
                            <span className="text-white">{vessel.name}</span>
                            <span className="text-slate-400">({vessel.captain})</span>
                          </div>
                        ) : null;
                      })}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex space-x-2">
                  {mission.status === 'ready' && (
                    <button 
                      onClick={() => {
                        setSelectedMission(mission.id);
                        setShowAssignmentModal(true);
                      }}
                      className="flex-1 py-2 bg-cyan-600 text-white rounded-lg text-sm font-medium hover:bg-cyan-700 transition-colors flex items-center justify-center"
                    >
                      <Send className="h-3 w-3 mr-1" />
                      Assign to Vessel
                    </button>
                  )}
                  
                  {mission.status === 'assigned' && (
                    <button className="flex-1 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors flex items-center justify-center">
                      <Zap className="h-3 w-3 mr-1" />
                      Activate Mission
                    </button>
                  )}
                  
                  <button className="px-4 py-2 bg-slate-700 text-slate-300 rounded-lg text-sm font-medium hover:bg-slate-600 transition-colors">
                    Edit
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Assignment Modal */}
      {showAssignmentModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-2xl border border-slate-700 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-700">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">Assign Mission to Vessels</h3>
                <button 
                  onClick={() => {
                    setShowAssignmentModal(false);
                    setSelectedMission(null);
                    setSelectedVessels([]);
                  }}
                  className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="p-6">
              {selectedMission && (
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-white mb-2">
                    {availableMissions.find(m => m.id === selectedMission)?.title}
                  </h4>
                  <p className="text-slate-400 text-sm">
                    {availableMissions.find(m => m.id === selectedMission)?.description}
                  </p>
                </div>
              )}

              <h4 className="text-lg font-semibold text-white mb-4">Select Vessels:</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {fleetVessels.map((vessel) => {
                  const availability = getVesselAvailability(vessel);
                  const isSelected = selectedVessels.includes(vessel.id);
                  
                  return (
                    <div 
                      key={vessel.id}
                      onClick={() => handleVesselSelect(vessel.id)}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                        isSelected 
                          ? 'border-cyan-500 bg-cyan-900/20' 
                          : 'border-slate-600 bg-slate-700/50 hover:border-slate-500'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-start space-x-3">
                          <div className="p-2 bg-slate-600 rounded-lg">
                            <Ship className="h-4 w-4 text-cyan-400" />
                          </div>
                          <div>
                            <h5 className="text-white font-medium">{vessel.name}</h5>
                            <p className="text-slate-400 text-sm">{vessel.type} • {vessel.location}</p>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(vessel.status)}`}>
                            {vessel.status}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-400">Captain:</span>
                          <span className="text-white">{vessel.captain}</span>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-400">Crew:</span>
                          <span className="text-white">{vessel.crew} members</span>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-400">Mission Capacity:</span>
                          <span className={availability.color}>
                            {vessel.currentMissions}/{vessel.maxMissions}
                          </span>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-400">Compliance:</span>
                          <span className="text-white">{vessel.compliance}%</span>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-400">Last Contact:</span>
                          <span className="text-white">{vessel.lastContact}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex space-x-4">
                <button 
                  onClick={handleAssignMission}
                  disabled={selectedVessels.length === 0}
                  className="flex-1 py-3 bg-cyan-600 text-white rounded-lg font-medium hover:bg-cyan-700 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Assign to {selectedVessels.length} Vessel{selectedVessels.length !== 1 ? 's' : ''}
                </button>
                
                <button 
                  onClick={() => {
                    setShowAssignmentModal(false);
                    setSelectedMission(null);
                    setSelectedVessels([]);
                  }}
                  className="px-6 py-3 bg-slate-700 text-slate-300 rounded-lg font-medium hover:bg-slate-600 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
