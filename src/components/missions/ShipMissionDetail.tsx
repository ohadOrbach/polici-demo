'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Ship, 
  Clock, 
  CheckCircle, 
  User, 
  MapPin,
  ArrowLeft,
  ChevronDown,
  ChevronRight,
  Image,
  Video,
  File,
  Download,
  MessageSquare,
  Paperclip,
  Eye,
  X
} from 'lucide-react';

interface TaskItem {
  id: string;
  title: string;
  description: string;
  required: boolean;
  completed: boolean;
  completedAt?: string;
  attachments: Attachment[];
  notes: string[];
}

interface Attachment {
  id: string;
  name: string;
  type: 'image' | 'video' | 'document';
  url: string;
  uploadedAt: string;
  size: string;
}

interface ShipMissionData {
  missionId: string;
  missionTitle: string;
  shipId: string;
  shipName: string;
  captain: string;
  location: string;
  status: 'pending' | 'in-progress' | 'completed' | 'overdue';
  assignedDate: string;
  dueDate: string;
  startedAt?: string;
  completedAt?: string;
  lastUpdate: string;
  overallProgress: number;
  tasks: TaskItem[];
  generalNotes: string[];
}

// Mock data
const shipMissionData: ShipMissionData = {
  missionId: 'MSN-001',
  missionTitle: 'Safety Drill - Fire Emergency',
  shipId: 'ship_001',
  shipName: 'MV Northern Star',
  captain: 'Captain James Smith',
  location: 'Port of Rotterdam',
  status: 'completed',
  assignedDate: '2025-09-15T08:00:00Z',
  dueDate: '2025-09-20T23:59:00Z',
  startedAt: '2025-09-16T10:30:00Z',
  completedAt: '2025-09-18T14:30:00Z',
  lastUpdate: '2025-09-18T14:30:00Z',
  overallProgress: 100,
  generalNotes: [
    'All crew members participated actively in the drill',
    'Minor equipment issue with fire hose #3 was identified and resolved',
    'Excellent response time achieved - under 5 minutes',
    'Drill completed 2 days ahead of schedule'
  ],
  tasks: [
    {
      id: 'task_001',
      title: 'Crew Muster and Roll Call',
      description: 'Conduct complete crew muster at designated assembly stations and verify all personnel are accounted for',
      required: true,
      completed: true,
      completedAt: '2025-09-16T10:35:00Z',
      attachments: [
        {
          id: 'att_001',
          name: 'muster_list_photo.jpg',
          type: 'image',
          url: '/mock/muster_list.jpg',
          uploadedAt: '2025-09-16T10:35:00Z',
          size: '2.4 MB'
        },
        {
          id: 'att_002',
          name: 'crew_assembly_video.mp4',
          type: 'video',
          url: '/mock/assembly.mp4',
          uploadedAt: '2025-09-16T10:37:00Z',
          size: '15.2 MB'
        }
      ],
      notes: ['All 24 crew members present', 'Assembly completed in 3 minutes 45 seconds']
    },
    {
      id: 'task_002',
      title: 'Fire Detection System Check',
      description: 'Test all fire detection systems including smoke detectors, heat sensors, and alarm systems',
      required: true,
      completed: true,
      completedAt: '2025-09-16T11:15:00Z',
      attachments: [
        {
          id: 'att_003',
          name: 'detection_system_report.pdf',
          type: 'document',
          url: '/mock/detection_report.pdf',
          uploadedAt: '2025-09-16T11:15:00Z',
          size: '1.8 MB'
        }
      ],
      notes: ['All 47 detectors tested successfully', 'Zone 3 alarm delay noted - within acceptable range']
    },
    {
      id: 'task_003',
      title: 'Fire Suppression Equipment Inspection',
      description: 'Inspect and test fire extinguishers, fire hoses, and suppression systems',
      required: true,
      completed: true,
      completedAt: '2025-09-16T12:30:00Z',
      attachments: [
        {
          id: 'att_004',
          name: 'equipment_photos.jpg',
          type: 'image',
          url: '/mock/equipment.jpg',
          uploadedAt: '2025-09-16T12:30:00Z',
          size: '3.1 MB'
        },
        {
          id: 'att_005',
          name: 'pressure_test_results.pdf',
          type: 'document',
          url: '/mock/pressure_test.pdf',
          uploadedAt: '2025-09-16T12:35:00Z',
          size: '945 KB'
        }
      ],
      notes: ['Fire hose #3 showed minor leak - replaced immediately', '18 extinguishers checked and verified']
    },
    {
      id: 'task_004',
      title: 'Emergency Evacuation Drill',
      description: 'Conduct full evacuation drill from all areas of the vessel to designated muster stations',
      required: true,
      completed: true,
      completedAt: '2025-09-17T09:20:00Z',
      attachments: [
        {
          id: 'att_006',
          name: 'evacuation_drill_video.mp4',
          type: 'video',
          url: '/mock/evacuation.mp4',
          uploadedAt: '2025-09-17T09:25:00Z',
          size: '28.7 MB'
        }
      ],
      notes: ['Evacuation completed in 4 minutes 12 seconds', 'Excellent crew coordination observed']
    },
    {
      id: 'task_005',
      title: 'Communication Systems Test',
      description: 'Test all emergency communication systems including PA, radio, and alarm systems',
      required: true,
      completed: true,
      completedAt: '2025-09-17T14:45:00Z',
      attachments: [
        {
          id: 'att_007',
          name: 'comm_test_log.pdf',
          type: 'document',
          url: '/mock/comm_test.pdf',
          uploadedAt: '2025-09-17T14:45:00Z',
          size: '1.2 MB'
        }
      ],
      notes: ['All systems operational', 'Bridge-to-engine room communication clear']
    },
    {
      id: 'task_006',
      title: 'Fire Fighting Team Deployment',
      description: 'Deploy and test fire fighting teams with proper equipment and procedures',
      required: true,
      completed: true,
      completedAt: '2025-09-18T11:00:00Z',
      attachments: [
        {
          id: 'att_008',
          name: 'firefighting_team_action.mp4',
          type: 'video',
          url: '/mock/firefighting.mp4',
          uploadedAt: '2025-09-18T11:05:00Z',
          size: '22.1 MB'
        },
        {
          id: 'att_009',
          name: 'team_equipment_checklist.pdf',
          type: 'document',
          url: '/mock/equipment_checklist.pdf',
          uploadedAt: '2025-09-18T11:10:00Z',
          size: '876 KB'
        }
      ],
      notes: ['Team A response time: 2 minutes 30 seconds', 'Team B response time: 2 minutes 45 seconds', 'All equipment functioning properly']
    },
    {
      id: 'task_007',
      title: 'Documentation and Reporting',
      description: 'Complete all required documentation and incident reports',
      required: true,
      completed: true,
      completedAt: '2025-09-18T13:30:00Z',
      attachments: [
        {
          id: 'att_010',
          name: 'drill_completion_report.pdf',
          type: 'document',
          url: '/mock/completion_report.pdf',
          uploadedAt: '2025-09-18T13:30:00Z',
          size: '2.7 MB'
        },
        {
          id: 'att_011',
          name: 'crew_feedback_forms.pdf',
          type: 'document',
          url: '/mock/feedback_forms.pdf',
          uploadedAt: '2025-09-18T13:35:00Z',
          size: '1.9 MB'
        }
      ],
      notes: ['All documentation completed', 'Crew feedback collected and analyzed']
    },
    {
      id: 'task_008',
      title: 'Equipment Reset and Stowage',
      description: 'Reset all systems and properly stow all equipment used during the drill',
      required: false,
      completed: true,
      completedAt: '2025-09-18T14:30:00Z',
      attachments: [
        {
          id: 'att_012',
          name: 'final_equipment_check.jpg',
          type: 'image',
          url: '/mock/final_check.jpg',
          uploadedAt: '2025-09-18T14:30:00Z',
          size: '1.8 MB'
        }
      ],
      notes: ['All equipment properly stowed', 'Systems reset and ready for normal operations']
    }
  ]
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed': return 'text-green-400 bg-green-900/30 border-green-500/30';
    case 'in-progress': return 'text-yellow-400 bg-yellow-900/30 border-yellow-500/30';
    case 'pending': return 'text-slate-400 bg-slate-700 border-slate-600';
    case 'overdue': return 'text-red-400 bg-red-900/30 border-red-500/30';
    default: return 'text-slate-400 bg-slate-700 border-slate-600';
  }
};

const getAttachmentIcon = (type: string) => {
  switch (type) {
    case 'image': return Image;
    case 'video': return Video;
    case 'document': return File;
    default: return Paperclip;
  }
};

export default function ShipMissionDetail({ params }: { params: { id: string, shipId: string } }) {
  const [expandedTasks, setExpandedTasks] = useState<Set<string>>(new Set());
  const [selectedAttachment, setSelectedAttachment] = useState<Attachment | null>(null);

  const toggleTaskExpansion = (taskId: string) => {
    const newExpanded = new Set(expandedTasks);
    if (newExpanded.has(taskId)) {
      newExpanded.delete(taskId);
    } else {
      newExpanded.add(taskId);
    }
    setExpandedTasks(newExpanded);
  };

  const completedTasks = shipMissionData.tasks.filter(task => task.completed).length;
  const requiredTasks = shipMissionData.tasks.filter(task => task.required).length;
  const completedRequiredTasks = shipMissionData.tasks.filter(task => task.required && task.completed).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-800/80 rounded-2xl p-6 border border-slate-700">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <Link 
              href={`/missions/${params.id}/view`} 
              className="p-2 bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-slate-700 rounded-xl flex items-center justify-center">
                <Ship className="h-6 w-6 text-slate-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">{shipMissionData.shipName}</h1>
                <p className="text-slate-400">{shipMissionData.missionTitle}</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(shipMissionData.status)}`}>
              {shipMissionData.status.replace('-', ' ').toUpperCase()}
            </span>
            <button className="flex items-center space-x-2 px-4 py-2 bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600 transition-colors">
              <Download className="h-4 w-4" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Ship Info */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-slate-900/50 rounded-xl p-4">
            <div className="flex items-center space-x-3 mb-2">
              <User className="h-5 w-5 text-cyan-400" />
              <span className="text-slate-400 text-sm">Captain</span>
            </div>
            <div className="text-white font-medium">{shipMissionData.captain}</div>
          </div>
          
          <div className="bg-slate-900/50 rounded-xl p-4">
            <div className="flex items-center space-x-3 mb-2">
              <MapPin className="h-5 w-5 text-green-400" />
              <span className="text-slate-400 text-sm">Location</span>
            </div>
            <div className="text-white font-medium">{shipMissionData.location}</div>
          </div>
          
          <div className="bg-slate-900/50 rounded-xl p-4">
            <div className="flex items-center space-x-3 mb-2">
              <CheckCircle className="h-5 w-5 text-purple-400" />
              <span className="text-slate-400 text-sm">Progress</span>
            </div>
            <div className="text-white font-medium">{shipMissionData.overallProgress}%</div>
          </div>
          
          <div className="bg-slate-900/50 rounded-xl p-4">
            <div className="flex items-center space-x-3 mb-2">
              <Clock className="h-5 w-5 text-yellow-400" />
              <span className="text-slate-400 text-sm">Last Update</span>
            </div>
            <div className="text-white font-medium">{new Date(shipMissionData.lastUpdate).toLocaleDateString()}</div>
          </div>
        </div>

        {/* Progress Summary */}
        <div className="bg-slate-900/50 rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-slate-400">Task Completion</span>
            <span className="text-white font-bold">{completedTasks}/{shipMissionData.tasks.length} tasks</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-3 mb-2">
            <div 
              className="h-3 bg-gradient-to-r from-cyan-500 to-green-500 rounded-full transition-all duration-500"
              style={{ width: `${(completedTasks / shipMissionData.tasks.length) * 100}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Required: {completedRequiredTasks}/{requiredTasks}</span>
            <span className="text-slate-400">Optional: {completedTasks - completedRequiredTasks}/{shipMissionData.tasks.length - requiredTasks}</span>
          </div>
        </div>
      </div>

      {/* General Notes */}
      {shipMissionData.generalNotes.length > 0 && (
        <div className="bg-slate-800/80 rounded-2xl p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
            <MessageSquare className="h-5 w-5" />
            <span>General Notes</span>
          </h3>
          <div className="space-y-2">
            {shipMissionData.generalNotes.map((note, index) => (
              <div key={index} className="bg-slate-900/50 rounded-lg p-3 border-l-4 border-cyan-500">
                <p className="text-slate-300">{note}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Task Details */}
      <div className="bg-slate-800/80 rounded-2xl border border-slate-700 overflow-hidden">
        <div className="p-6 border-b border-slate-700">
          <h3 className="text-lg font-semibold text-white">Task Details</h3>
        </div>
        
        <div className="divide-y divide-slate-700">
          {shipMissionData.tasks.map((task) => (
            <div key={task.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4 flex-1">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    task.completed ? 'bg-green-500' : 'bg-slate-600'
                  }`}>
                    {task.completed ? (
                      <CheckCircle className="h-4 w-4 text-white" />
                    ) : (
                      <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="text-white font-semibold">{task.title}</h4>
                      {task.required && (
                        <span className="px-2 py-1 bg-red-900/30 text-red-400 rounded-full text-xs font-medium border border-red-500/30">
                          REQUIRED
                        </span>
                      )}
                      {task.completed && task.completedAt && (
                        <span className="text-sm text-slate-400">
                          Completed: {new Date(task.completedAt).toLocaleString()}
                        </span>
                      )}
                    </div>
                    <p className="text-slate-400 mb-3">{task.description}</p>
                    
                    {/* Attachments and Notes Summary */}
                    <div className="flex items-center space-x-4 text-sm text-slate-400">
                      {task.attachments.length > 0 && (
                        <div className="flex items-center space-x-1">
                          <Paperclip className="h-4 w-4" />
                          <span>{task.attachments.length} file{task.attachments.length !== 1 ? 's' : ''}</span>
                        </div>
                      )}
                      {task.notes.length > 0 && (
                        <div className="flex items-center space-x-1">
                          <MessageSquare className="h-4 w-4" />
                          <span>{task.notes.length} note{task.notes.length !== 1 ? 's' : ''}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={() => toggleTaskExpansion(task.id)}
                  className="p-2 text-slate-400 hover:text-white transition-colors"
                >
                  {expandedTasks.has(task.id) ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </button>
              </div>
              
              {/* Expanded Content */}
              {expandedTasks.has(task.id) && (
                <div className="ml-10 space-y-4">
                  {/* Notes */}
                  {task.notes.length > 0 && (
                    <div>
                      <h5 className="text-white font-medium mb-2">Notes</h5>
                      <div className="space-y-2">
                        {task.notes.map((note, index) => (
                          <div key={index} className="bg-slate-900/50 rounded-lg p-3 border-l-4 border-blue-500">
                            <p className="text-slate-300">{note}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Attachments */}
                  {task.attachments.length > 0 && (
                    <div>
                      <h5 className="text-white font-medium mb-2">Attachments</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {task.attachments.map((attachment) => {
                          const AttachmentIcon = getAttachmentIcon(attachment.type);
                          return (
                            <div 
                              key={attachment.id} 
                              className="bg-slate-900/50 rounded-lg p-3 border border-slate-700 hover:border-slate-600 transition-colors cursor-pointer"
                              onClick={() => setSelectedAttachment(attachment)}
                            >
                              <div className="flex items-center space-x-3 mb-2">
                                <AttachmentIcon className="h-5 w-5 text-slate-400" />
                                <div className="flex-1 min-w-0">
                                  <p className="text-white font-medium truncate">{attachment.name}</p>
                                  <p className="text-xs text-slate-400">{attachment.size}</p>
                                </div>
                                <Eye className="h-4 w-4 text-slate-400" />
                              </div>
                              <p className="text-xs text-slate-500">
                                Uploaded: {new Date(attachment.uploadedAt).toLocaleString()}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Attachment Modal */}
      {selectedAttachment && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-2xl max-w-4xl max-h-[90vh] w-full overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-slate-700">
              <div>
                <h3 className="text-lg font-semibold text-white">{selectedAttachment.name}</h3>
                <p className="text-slate-400 text-sm">
                  {selectedAttachment.type} • {selectedAttachment.size} • 
                  Uploaded: {new Date(selectedAttachment.uploadedAt).toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => setSelectedAttachment(null)}
                className="p-2 text-slate-400 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="bg-slate-900 rounded-xl p-8 text-center">
                <div className="w-16 h-16 bg-slate-700 rounded-xl flex items-center justify-center mx-auto mb-4">
                  {(() => {
                    const AttachmentIcon = getAttachmentIcon(selectedAttachment.type);
                    return <AttachmentIcon className="h-8 w-8 text-slate-400" />;
                  })()}
                </div>
                <p className="text-slate-400 mb-4">File preview not available in mockup</p>
                <button className="flex items-center space-x-2 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors mx-auto">
                  <Download className="h-4 w-4" />
                  <span>Download File</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
