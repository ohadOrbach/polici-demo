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
  X,
  Printer
} from 'lucide-react';
import { useMissions } from '@/contexts/MissionsContext';
import { generatePdfReport } from '@/utils/generatePdfReport';

interface Attachment {
  id: string;
  name: string;
  type: 'image' | 'video' | 'document';
  url: string;
  uploadedAt: string;
  size: string;
}

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
  const { missions } = useMissions();
  // Find the specific mission from the context
  const mission = missions.find(m => m.id === params.id);

  const [expandedTasks, setExpandedTasks] = useState<Set<string>>(new Set());
  const [selectedAttachment, setSelectedAttachment] = useState<Attachment | null>(null);

  if (!mission) {
    return <div>Mission not found</div>;
  }

  const handleGenerateReport = async () => {
    await generatePdfReport(mission);
  };
  
  const completedTasks = mission.checkboxes.filter(task => task.checked).length;
  const requiredTasks = mission.checkboxes.filter(task => task.required).length;
  const completedRequiredTasks = mission.checkboxes.filter(task => task.required && task.checked).length;

  const toggleTaskExpansion = (taskId: string) => {
    const newExpanded = new Set(expandedTasks);
    if (newExpanded.has(taskId)) {
      newExpanded.delete(taskId);
    } else {
      newExpanded.add(taskId);
    }
    setExpandedTasks(newExpanded);
  };

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
                <h1 className="text-2xl font-bold text-white">{mission.vessel}</h1>
                <p className="text-slate-400">{mission.title}</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(mission.status)}`}>
              {mission.status.replace('-', ' ').toUpperCase()}
            </span>
            <button 
              onClick={handleGenerateReport}
              className="flex items-center space-x-2 px-4 py-2 bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600 transition-colors"
            >
              <Printer className="h-4 w-4" />
              <span>Generate Report</span>
            </button>
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
            <div className="text-white font-medium">{mission.assignedTo.name}</div>
          </div>
          
          <div className="bg-slate-900/50 rounded-xl p-4">
            <div className="flex items-center space-x-3 mb-2">
              <MapPin className="h-5 w-5 text-green-400" />
              <span className="text-slate-400 text-sm">Vessel</span>
            </div>
            <div className="text-white font-medium">{mission.vessel}</div>
          </div>
          
          <div className="bg-slate-900/50 rounded-xl p-4">
            <div className="flex items-center space-x-3 mb-2">
              <CheckCircle className="h-5 w-5 text-purple-400" />
              <span className="text-slate-400 text-sm">Progress</span>
            </div>
            <div className="text-white font-medium">{mission.progress}%</div>
          </div>
          
          <div className="bg-slate-900/50 rounded-xl p-4">
            <div className="flex items-center space-x-3 mb-2">
              <Clock className="h-5 w-5 text-yellow-400" />
              <span className="text-slate-400 text-sm">Last Update</span>
            </div>
            <div className="text-white font-medium">{new Date(mission.updatedAt).toLocaleDateString()}</div>
          </div>
        </div>

        {/* Progress Summary */}
        <div className="bg-slate-900/50 rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-slate-400">Task Completion</span>
            <span className="text-white font-bold">{completedTasks}/{mission.checkboxes.length} tasks</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-3 mb-2">
            <div 
              className="h-3 bg-gradient-to-r from-cyan-500 to-green-500 rounded-full transition-all duration-500"
              style={{ width: `${(completedTasks / mission.checkboxes.length) * 100}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Required: {completedRequiredTasks}/{requiredTasks}</span>
            <span className="text-slate-400">Optional: {completedTasks - completedRequiredTasks}/{mission.checkboxes.length - requiredTasks}</span>
          </div>
        </div>
      </div>

      {/* General Notes */}
      {mission.taskNotes && (
        <div className="bg-slate-800/80 rounded-2xl p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
            <MessageSquare className="h-5 w-5" />
            <span>General Notes</span>
          </h3>
          <div className="space-y-2">
            <div className="bg-slate-900/50 rounded-lg p-3 border-l-4 border-cyan-500">
              <p className="text-slate-300">{mission.taskNotes}</p>
            </div>
          </div>
        </div>
      )}

      {/* Task Details */}
      <div className="bg-slate-800/80 rounded-2xl border border-slate-700 overflow-hidden">
        <div className="p-6 border-b border-slate-700">
          <h3 className="text-lg font-semibold text-white">Task Details</h3>
        </div>
        
        <div className="divide-y divide-slate-700">
          {mission.checkboxes.map((task) => (
            <div key={task.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4 flex-1">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    task.checked ? 'bg-green-500' : 'bg-slate-600'
                  }`}>
                    {task.checked ? (
                      <CheckCircle className="h-4 w-4 text-white" />
                    ) : (
                      <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="text-white font-semibold">{task.text}</h4>
                      {task.required && (
                        <span className="px-2 py-1 bg-red-900/30 text-red-400 rounded-full text-xs font-medium border border-red-500/30">
                          REQUIRED
                        </span>
                      )}
                    </div>
                    <p className="text-slate-400 mb-3">{task.description}</p>
                    
                    {/* Attachments and Notes Summary */}
                    <div className="flex items-center space-x-4 text-sm text-slate-400">
                      {task.attachments && (
                        <div className="flex items-center space-x-1">
                          <Paperclip className="h-4 w-4" />
                          <span>{Object.values(task.attachments).flat().length} file(s)</span>
                        </div>
                      )}
                      {task.note && (
                        <div className="flex items-center space-x-1">
                          <MessageSquare className="h-4 w-4" />
                          <span>1 note</span>
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
                  {task.note && (
                    <div>
                      <h5 className="text-white font-medium mb-2">Notes</h5>
                      <div className="space-y-2">
                        <div className="bg-slate-900/50 rounded-lg p-3 border-l-4 border-blue-500">
                          <p className="text-slate-300">{task.note}</p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Attachments */}
                  {task.attachments && (
                    <div>
                      <h5 className="text-white font-medium mb-2">Attachments</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {Object.entries(task.attachments).map(([type, files]) => 
                          (files as string[]).map((file, index) => {
                            const attachmentType = type.slice(0, -1); // photos -> photo
                            const AttachmentIcon = getAttachmentIcon(attachmentType);
                            return (
                              <div 
                                key={`${type}-${index}`}
                                className="bg-slate-900/50 rounded-lg p-3 border border-slate-700 hover:border-slate-600 transition-colors cursor-pointer"
                              >
                                <div className="flex items-center space-x-3 mb-2">
                                  <AttachmentIcon className="h-5 w-5 text-slate-400" />
                                  <div className="flex-1 min-w-0">
                                    <p className="text-white font-medium truncate">{`${attachmentType} ${index + 1}`}</p>
                                  </div>
                                  <Eye className="h-4 w-4 text-slate-400" />
                                </div>
                              </div>
                            );
                          })
                        )}
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
