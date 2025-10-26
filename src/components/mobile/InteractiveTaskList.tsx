'use client';

import React, { useState, useRef } from 'react';
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
  Edit3,
  Upload,
  X,
  Save
} from 'lucide-react';

interface TaskCheckbox {
  id: string;
  text: string;
  description?: string;
  required: boolean;
  checked: boolean;
  type: 'checkbox' | 'photo' | 'video' | 'file' | 'signature';
  attachments?: {
    photos?: string[];
    videos?: string[];
    files?: string[];
    signature?: string;
  };
}

interface TaskAssignee {
  name: string;
  role: string;
  avatar?: string;
}

interface InteractiveTask {
  id: number;
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

// Import mock data and transform it
import { mockMissions } from '@/data/mockData';

const tasks: InteractiveTask[] = mockMissions.slice(0, 6).map(mission => ({
  id: parseInt(mission.id.split('_')[1]),
  title: mission.title,
  description: mission.description,
  vessel: mission.vessel,
  assignedBy: mission.assignedBy,
  assignedTo: mission.assignedTo,
  status: mission.status,
  priority: mission.priority,
  dueTime: new Date(mission.dueDate).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
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
    type: cb.type,
    attachments: cb.attachments
  })),
  notes: mission.taskNotes,
  completedRequired: mission.checkboxes.filter(cb => cb.required && cb.checked).length,
  totalRequired: mission.checkboxes.filter(cb => cb.required).length,
  totalOptional: mission.checkboxes.filter(cb => !cb.required).length
}));

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed': return 'text-green-400';
    case 'in-progress': return 'text-yellow-400';
    case 'pending': return 'text-slate-400';
    case 'overdue': return 'text-red-400';
    default: return 'text-slate-400';
  }
};

const getPriorityColor = (priority: string) => {
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

export default function InteractiveTaskList() {
  const [taskList, setTaskList] = useState<InteractiveTask[]>(tasks);
  const [expandedTask, setExpandedTask] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [showMediaCapture, setShowMediaCapture] = useState<{taskId: number, checkboxId: string, type: string} | null>(null);
  const [signature, setSignature] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const toggleTaskExpanded = (taskId: number) => {
    setExpandedTask(expandedTask === taskId ? null : taskId);
  };

  const toggleCheckbox = (taskId: number, checkboxId: string) => {
    setTaskList(prevTasks => 
      prevTasks.map(task => {
        if (task.id === taskId) {
          const updatedCheckboxes = task.checkboxes.map(checkbox => {
            if (checkbox.id === checkboxId) {
              const newChecked = !checkbox.checked;
              
              // For non-checkbox types, show media capture interface
              if (checkbox.type !== 'checkbox' && newChecked) {
                setShowMediaCapture({taskId, checkboxId, type: checkbox.type});
                return checkbox; // Don't toggle yet, wait for media attachment
              }
              
              return { ...checkbox, checked: newChecked };
            }
            return checkbox;
          });
          
          // Recalculate progress
          const completedRequired = updatedCheckboxes.filter(cb => cb.required && cb.checked).length;
          const totalRequired = updatedCheckboxes.filter(cb => cb.required).length;
          const progress = totalRequired > 0 ? Math.round((completedRequired / totalRequired) * 100) : 0;
          
          return {
            ...task,
            checkboxes: updatedCheckboxes,
            completedRequired,
            progress,
            status: progress === 100 ? 'completed' as const : 
                   progress > 0 ? 'in-progress' as const : task.status
          };
        }
        return task;
      })
    );
  };

  const handleMediaCapture = (type: 'photo' | 'video') => {
    if (!showMediaCapture) return;
    
    const { taskId, checkboxId } = showMediaCapture;
    const mediaUrl = type === 'photo' 
      ? `data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=`
      : 'data:video/mp4;base64,AAAAIGZ0eXBpc29tAAACAGlzb21pc28yYXZjMW1wNDEAAAAIZnJlZQAAAr3mZGF0AAACrgYF//+q3EXpvebZSLeWLNgg2SPu73gyNjQgLSBjb3JlIDE1NSByMjkwMSA3ZDBmZjIyIC0gSC4yNjQvTVBFRy00IEFWQyBjb2RlYyAtIENvcHlsZWZ0IDIwMDMtMjAxOCAtIGh0dHA6Ly93d3cudmlkZW9sYW4ub3JnL3gyNjQuaHRtbCAtIG9wdGlvbnM6IGNhYmFjPTEgcmVmPTMgZGVibG9jaz0xOjA6MCBhbmFseXNlPTB4MzoweDExMyBtZT1oZXggc3VibWU9NyBwc3k9MSBwc3lfcmQ9MS4wMDowLjAwIG1peGVkX3JlZj0xIG1lX3JhbmdlPTE2IGNocm9tYV9tZT0xIHRyZWxsaXM9MSA4eDhkY3Q9MSBjcW09MCBkZWFkem9uZT0yMSwxMSBmYXN0X3Bza2lwPTEgY2hyb21hX3FwX29mZnNldD0tMiB0aHJlYWRzPTYgbG9va2FoZWFkX3RocmVhZHM9MSBzbGljZWRfdGhyZWFkcz0wIG5yPTAgZGVjaW1hdGU9MSBpbnRlcmxhY2VkPTAgYmx1cmF5X2NvbXBhdD0wIGNvbnN0cmFpbmVkX2ludHJhPTAgYmZyYW1lcz0zIGJfcHlyYW1pZD0yIGJfYWRhcHQ9MSBiX2JpYXM9MCBkaXJlY3Q9MSB3ZWlnaHRiPTEgb3Blbl9nb3A9MCB3ZWlnaHRwPTIga2V5aW50PTI1MCBrZXlpbnRfbWluPTI1IHNjZW5lY3V0PTQwIGludHJhX3JlZnJlc2g9MCByY19sb29rYWhlYWQ9NDAgcmM9Y3JmIG1idHJlZT0xIGNyZj0yMy4wIHFjb21wPTAuNjAgcXBtaW49MCBxcG1heD02OSBxcHN0ZXA9NCBpcF9yYXRpbz0xLjQwIGFxPTE6MS4wMACAAAABWWWIhAA3//728P4FNjuY0JcRzMheBA==';
    
    // Update the checkbox with media attachment
    setTaskList(prevTasks => 
      prevTasks.map(task => {
        if (task.id === taskId) {
          const updatedCheckboxes = task.checkboxes.map(checkbox => {
            if (checkbox.id === checkboxId) {
              const attachmentKey = type === 'photo' ? 'photos' : 'videos';
              const currentAttachments = checkbox.attachments?.[attachmentKey] || [];
              const newAttachments = [...currentAttachments, mediaUrl];
              
              return {
                ...checkbox,
                checked: true,
                attachments: {
                  ...checkbox.attachments,
                  [attachmentKey]: newAttachments
                }
              };
            }
            return checkbox;
          });
          
          // Recalculate progress
          const completedRequired = updatedCheckboxes.filter(cb => cb.required && cb.checked).length;
          const totalRequired = updatedCheckboxes.filter(cb => cb.required).length;
          const progress = totalRequired > 0 ? Math.round((completedRequired / totalRequired) * 100) : 0;
          
          return {
            ...task,
            checkboxes: updatedCheckboxes,
            completedRequired,
            progress,
            status: progress === 100 ? 'completed' as const : 
                   progress > 0 ? 'in-progress' as const : task.status
          };
        }
        return task;
      })
    );
    
    setShowMediaCapture(null);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!showMediaCapture) return;
    
    const files = event.target.files;
    if (files && files.length > 0) {
      const { taskId, checkboxId } = showMediaCapture;
      const file = files[0];
      const reader = new FileReader();
      
      reader.onload = (e) => {
        const result = e.target?.result as string;
        
        setTaskList(prevTasks => 
          prevTasks.map(task => {
            if (task.id === taskId) {
              const updatedCheckboxes = task.checkboxes.map(checkbox => {
                if (checkbox.id === checkboxId) {
                  const currentFiles = checkbox.attachments?.files || [];
                  const newFiles = [...currentFiles, result];
                  
                  return {
                    ...checkbox,
                    checked: true,
                    attachments: {
                      ...checkbox.attachments,
                      files: newFiles
                    }
                  };
                }
                return checkbox;
              });
              
              // Recalculate progress
              const completedRequired = updatedCheckboxes.filter(cb => cb.required && cb.checked).length;
              const totalRequired = updatedCheckboxes.filter(cb => cb.required).length;
              const progress = totalRequired > 0 ? Math.round((completedRequired / totalRequired) * 100) : 0;
              
              return {
                ...task,
                checkboxes: updatedCheckboxes,
                completedRequired,
                progress,
                status: progress === 100 ? 'completed' as const : 
                       progress > 0 ? 'in-progress' as const : task.status
              };
            }
            return task;
          })
        );
      };
      
      reader.readAsDataURL(file);
    }
    
    setShowMediaCapture(null);
  };

  const handleSignature = () => {
    if (!showMediaCapture || !signature.trim()) return;
    
    const { taskId, checkboxId } = showMediaCapture;
    
    setTaskList(prevTasks => 
      prevTasks.map(task => {
        if (task.id === taskId) {
          const updatedCheckboxes = task.checkboxes.map(checkbox => {
            if (checkbox.id === checkboxId) {
              return {
                ...checkbox,
                checked: true,
                attachments: {
                  ...checkbox.attachments,
                  signature
                }
              };
            }
            return checkbox;
          });
          
          // Recalculate progress
          const completedRequired = updatedCheckboxes.filter(cb => cb.required && cb.checked).length;
          const totalRequired = updatedCheckboxes.filter(cb => cb.required).length;
          const progress = totalRequired > 0 ? Math.round((completedRequired / totalRequired) * 100) : 0;
          
          return {
            ...task,
            checkboxes: updatedCheckboxes,
            completedRequired,
            progress,
            status: progress === 100 ? 'completed' as const : 
                   progress > 0 ? 'in-progress' as const : task.status
          };
        }
        return task;
      })
    );
    
    setSignature('');
    setShowMediaCapture(null);
  };

  const completeTask = (taskId: number) => {
    setTaskList(prevTasks => 
      prevTasks.map(task => {
        if (task.id === taskId) {
          return {
            ...task,
            status: 'completed' as const,
            progress: 100
          };
        }
        return task;
      })
    );
  };

  const filteredTasks = taskList.filter(task => {
    switch (activeFilter) {
      case 'pending': return task.status === 'pending';
      case 'in-progress': return task.status === 'in-progress';
      case 'completed': return task.status === 'completed';
      case 'overdue': return task.status === 'overdue';
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

      {/* Task Cards */}
      <div className="space-y-3">
        {filteredTasks.map((task) => {
          const TypeIcon = getTypeIcon(task.type);
          const isExpanded = expandedTask === task.id;
          const canComplete = task.completedRequired === task.totalRequired;
          
          return (
            <div 
              key={task.id} 
              className={`rounded-2xl border-l-4 ${getPriorityColor(task.priority)} transition-all duration-300`}
            >
              {/* Task Header */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start space-x-3 flex-1">
                    <div className={`p-2 rounded-lg bg-slate-700 ${getStatusColor(task.status)}`}>
                      <TypeIcon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-semibold text-sm mb-1">{task.title}</h3>
                      <p className="text-slate-400 text-xs mb-2 line-clamp-2">{task.description}</p>
                      
                      {/* Task Meta Info */}
                      <div className="flex items-center space-x-4 text-xs text-slate-500 mb-2">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>Due: {task.dueTime}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-3 w-3" />
                          <span>{task.vessel}</span>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-3">
                        <div className="flex justify-between text-xs text-slate-400 mb-1">
                          <span>Progress</span>
                          <span>{task.completedRequired}/{task.totalRequired} required</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-500 ${
                              task.progress === 100 ? 'bg-gradient-to-r from-green-500 to-green-400' : 'bg-gradient-to-r from-cyan-500 to-blue-500'
                            }`}
                            style={{ width: `${task.progress}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Assignment Info */}
                      <div className="grid grid-cols-2 gap-4 text-xs">
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-slate-700 rounded-full flex items-center justify-center">
                            {React.createElement(getRoleIcon(task.assignedBy.role), {
                              className: "h-3 w-3 text-cyan-400"
                            })}
                          </div>
                          <div>
                            <p className="text-slate-500">From</p>
                            <p className="text-white font-medium">{task.assignedBy.name}</p>
                            <p className="text-slate-400">{task.assignedBy.role}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-slate-700 rounded-full flex items-center justify-center">
                            {React.createElement(getRoleIcon(task.assignedTo.role), {
                              className: "h-3 w-3 text-green-400"
                            })}
                          </div>
                          <div>
                            <p className="text-slate-500">To</p>
                            <p className="text-white font-medium">{task.assignedTo.name}</p>
                            <p className="text-slate-400">{task.assignedTo.role}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {/* Offline Indicator */}
                    {task.offline ? (
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
                    
                    {/* Expand/Collapse Button */}
                    <button
                      onClick={() => toggleTaskExpanded(task.id)}
                      className="p-1 text-slate-400 hover:text-white transition-colors"
                    >
                      {isExpanded ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  {task.status === 'completed' ? (
                    <div className="flex-1 py-2 bg-green-900/30 text-green-400 rounded-lg font-medium text-center text-sm flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Completed
                    </div>
                  ) : (
                    <button 
                      onClick={() => completeTask(task.id)}
                      disabled={!canComplete}
                      className="flex-1 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors text-sm flex items-center justify-center"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Complete Task
                    </button>
                  )}
                </div>

                {/* Completion Requirements Warning */}
                {!canComplete && task.status !== 'completed' && (
                  <div className="flex items-center space-x-2 text-xs text-orange-400 bg-orange-900/20 p-2 rounded-lg mt-2">
                    <AlertTriangle className="h-3 w-3 flex-shrink-0" />
                    <span>{task.totalRequired - task.completedRequired} required items must be completed before task can be finished</span>
                  </div>
                )}
              </div>

              {/* Expanded Content - Interactive Checklist */}
              {isExpanded && (
                <div className="border-t border-slate-700 p-4 space-y-3">
                  <h4 className="text-sm font-medium text-white mb-3">Task Checklist</h4>
                  
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {task.checkboxes.map((checkbox) => {
                      const CheckboxIcon = getCheckboxIcon(checkbox.type);
                      
                      return (
                        <div 
                          key={checkbox.id} 
                          className={`p-3 rounded-lg border transition-colors ${
                            checkbox.checked 
                              ? 'bg-green-900/20 border-green-600/30' 
                              : 'bg-slate-700/50 border-slate-600 hover:border-slate-500'
                          }`}
                        >
                          <div className="flex items-start space-x-3">
                            <button
                              onClick={() => toggleCheckbox(task.id, checkbox.id)}
                              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                                checkbox.checked 
                                  ? 'bg-green-600 border-green-600' 
                                  : checkbox.required
                                  ? 'border-orange-500 hover:border-orange-400'
                                  : 'border-slate-500 hover:border-slate-400'
                              }`}
                            >
                              {checkbox.checked && <CheckCircle className="h-3 w-3 text-white" />}
                            </button>
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-1">
                                <span className={`text-sm ${
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
                                <p className="text-xs text-slate-500 mb-2">{checkbox.description}</p>
                              )}
                              
                              {/* Attachment indicators */}
                              {checkbox.attachments && (
                                <div className="flex items-center space-x-3 text-xs text-slate-500">
                                  {checkbox.attachments.photos && checkbox.attachments.photos.length > 0 && (
                                    <span className="text-green-400">{checkbox.attachments.photos.length} photo(s)</span>
                                  )}
                                  {checkbox.attachments.videos && checkbox.attachments.videos.length > 0 && (
                                    <span className="text-green-400">{checkbox.attachments.videos.length} video(s)</span>
                                  )}
                                  {checkbox.attachments.files && checkbox.attachments.files.length > 0 && (
                                    <span className="text-green-400">{checkbox.attachments.files.length} file(s)</span>
                                  )}
                                  {checkbox.attachments.signature && (
                                    <span className="text-green-400">Signed</span>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Media Capture Modal */}
      {showMediaCapture && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 max-w-sm w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">
                {showMediaCapture.type === 'photo' && 'Add Photo'}
                {showMediaCapture.type === 'video' && 'Add Video'}
                {showMediaCapture.type === 'file' && 'Add File'}
                {showMediaCapture.type === 'signature' && 'Add Signature'}
              </h3>
              <button
                onClick={() => setShowMediaCapture(null)}
                className="p-1 text-slate-400 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {showMediaCapture.type === 'photo' && (
              <div className="space-y-4">
                <button
                  onClick={() => handleMediaCapture('photo')}
                  className="w-full p-4 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors flex items-center justify-center"
                >
                  <Camera className="h-5 w-5 mr-2" />
                  Take Photo
                </button>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full p-4 bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600 transition-colors flex items-center justify-center"
                >
                  <Upload className="h-5 w-5 mr-2" />
                  Upload Photo
                </button>
              </div>
            )}

            {showMediaCapture.type === 'video' && (
              <div className="space-y-4">
                <button
                  onClick={() => handleMediaCapture('video')}
                  className="w-full p-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center"
                >
                  <Video className="h-5 w-5 mr-2" />
                  Record Video
                </button>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full p-4 bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600 transition-colors flex items-center justify-center"
                >
                  <Upload className="h-5 w-5 mr-2" />
                  Upload Video
                </button>
              </div>
            )}

            {showMediaCapture.type === 'file' && (
              <div className="space-y-4">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full p-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center"
                >
                  <Paperclip className="h-5 w-5 mr-2" />
                  Upload File
                </button>
              </div>
            )}

            {showMediaCapture.type === 'signature' && (
              <div className="space-y-4">
                <div className="bg-white rounded-lg h-32 flex items-center justify-center mb-4">
                  <span className="text-slate-600 text-sm">Signature Pad Area</span>
                </div>
                <input
                  type="text"
                  value={signature}
                  onChange={(e) => setSignature(e.target.value)}
                  placeholder="Type your name for digital signature"
                  className="w-full p-3 bg-slate-600 border border-slate-500 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <button
                  onClick={handleSignature}
                  disabled={!signature.trim()}
                  className="w-full py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Signature
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept={showMediaCapture?.type === 'photo' ? 'image/*' : 
               showMediaCapture?.type === 'video' ? 'video/*' : '*/*'}
        onChange={handleFileUpload}
        className="hidden"
      />
    </div>
  );
}
