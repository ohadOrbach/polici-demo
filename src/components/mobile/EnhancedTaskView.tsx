'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { 
  CheckCircle, 
  Camera, 
  Video, 
  FileText, 
  Upload, 
  Send,
  Save,
  Clock,
  User,
  MapPin,
  AlertTriangle,
  Circle,
  Edit3,
  Film,
  Paperclip,
  ArrowLeft,
  Star,
  Shield,
  Users,
  Calendar,
  MessageSquare
} from 'lucide-react';
import CheckboxNoteModal from './CheckboxNoteModal';
import { useMissions } from '@/contexts/MissionsContext';

interface TaskCheckbox {
  id: string;
  text: string;
  description?: string;
  required: boolean;
  checked: boolean;
  type: 'checkbox' | 'photo' | 'video' | 'file' | 'signature';
  note?: string;
  attachments?: {
    photos?: string[];
    videos?: string[];
    files?: string[];
    signature?: string;
  };
}

interface TaskNote {
  id: string;
  text: string;
  timestamp: string;
  author: string;
}

interface EnhancedTask {
  id: string;
  title: string;
  description: string;
  vessel: string;
  assignedBy: {
    name: string;
    role: string;
    avatar?: string;
  };
  assignedTo: {
    name: string;
    role: string;
    avatar?: string;
  };
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  estimatedDuration: string;
  status: 'pending' | 'in-progress' | 'completed' | 'overdue';
  checkboxes: TaskCheckbox[];
  notes: TaskNote[];
  taskNotes: string; // User's own notes for this task
  completedAt?: string;
  startedAt?: string;
}

// Import mock data
import { mockMissions } from '@/data/mockData';

// Use first mission from mock data as sample
const sampleTask: EnhancedTask = {
  id: mockMissions[0].id,
  title: mockMissions[0].title,
  description: mockMissions[0].description,
  vessel: mockMissions[0].vessel,
  assignedBy: mockMissions[0].assignedBy,
  assignedTo: mockMissions[0].assignedTo,
  dueDate: mockMissions[0].dueDate,
  priority: mockMissions[0].priority,
  estimatedDuration: mockMissions[0].estimatedDuration,
  status: mockMissions[0].status,
  checkboxes: mockMissions[0].checkboxes,
  notes: mockMissions[0].notes,
  taskNotes: mockMissions[0].taskNotes,
  completedAt: mockMissions[0].completedAt,
  startedAt: mockMissions[0].startedAt
};

const getCheckboxIcon = (type: string, checked: boolean) => {
  if (checked) return CheckCircle;
  
  switch (type) {
    case 'photo': return Camera;
    case 'video': return Video;
    case 'file': return Paperclip;
    case 'signature': return Edit3;
    default: return Circle;
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high': return 'text-red-400 bg-red-900/30 border-red-500/30';
    case 'medium': return 'text-yellow-400 bg-yellow-900/30 border-yellow-500/30';
    case 'low': return 'text-green-400 bg-green-900/30 border-green-500/30';
    default: return 'text-slate-400 bg-slate-800 border-slate-600';
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

interface EnhancedTaskViewProps {
  task?: EnhancedTask;
  onBack?: () => void;
  onComplete?: (task: EnhancedTask) => void;
}

export default function EnhancedTaskView({ 
  task = sampleTask, 
  onBack, 
  onComplete 
}: EnhancedTaskViewProps) {
  const { updateCheckboxNote } = useMissions();
  const [currentTask, setCurrentTask] = useState<EnhancedTask>(task);
  const [expandedCheckbox, setExpandedCheckbox] = useState<string | null>(null);
  const [showSignature, setShowSignature] = useState(false);
  const [signature, setSignature] = useState('');
  const [taskNotes, setTaskNotes] = useState(currentTask.taskNotes);
  const [showTaskNotes, setShowTaskNotes] = useState(false);
  const [editingNote, setEditingNote] = useState<TaskCheckbox | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const completedRequired = currentTask.checkboxes.filter(cb => cb.required && cb.checked).length;
  const totalRequired = currentTask.checkboxes.filter(cb => cb.required).length;
  const completedOptional = currentTask.checkboxes.filter(cb => !cb.required && cb.checked).length;
  const totalOptional = currentTask.checkboxes.filter(cb => !cb.required).length;
  const canComplete = completedRequired === totalRequired;

  const handleCheckboxToggle = (checkboxId: string, checked: boolean, attachments?: NonNullable<TaskCheckbox['attachments']>) => {
    setCurrentTask(prev => ({
      ...prev,
      checkboxes: prev.checkboxes.map(cb =>
        cb.id === checkboxId 
          ? { ...cb, checked, attachments: attachments ? { ...cb.attachments, ...attachments } : cb.attachments }
          : cb
      )
    }));
  };

  const handleMediaCapture = (checkboxId: string, type: 'photo' | 'video') => {
    // Simulate media capture
    const mediaUrl = type === 'photo' 
      ? `data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxAAPwCdABmX/9k=`
      : 'data:video/mp4;base64,AAAAIGZ0eXBpc29tAAACAGlzb21pc28yYXZjMW1wNDEAAAAIZnJlZQAAAr3mZGF0AAACrgYF//+q3EXpvebZSLeWLNgg2SPu73gyNjQgLSBjb3JlIDE1NSByMjkwMSA3ZDBmZjIyIC0gSC4yNjQvTVBFRy00IEFWQyBjb2RlYyAtIENvcHlsZWZ0IDIwMDMtMjAxOCAtIGh0dHA6Ly93d3cudmlkZW9sYW4ub3JnL3gyNjQuaHRtbCAtIG9wdGlvbnM6IGNhYmFjPTEgcmVmPTMgZGVibG9jaz0xOjA6MCBhbmFseXNlPTB4MzoweDExMyBtZT1oZXggc3VibWU9NyBwc3k9MSBwc3lfcmQ9MS4wMDowLjAwIG1peGVkX3JlZj0xIG1lX3JhbmdlPTE2IGNocm9tYV9tZT0xIHRyZWxsaXM9MSA4eDhkY3Q9MSBjcW09MCBkZWFkem9uZT0yMSwxMSBmYXN0X3Bza2lwPTEgY2hyb21hX3FwX29mZnNldD0tMiB0aHJlYWRzPTYgbG9va2FoZWFkX3RocmVhZHM9MSBzbGljZWRfdGhyZWFkcz0wIG5yPTAgZGVjaW1hdGU9MSBpbnRlcmxhY2VkPTAgYmx1cmF5X2NvbXBhdD0wIGNvbnN0cmFpbmVkX2ludHJhPTAgYmZyYW1lcz0zIGJfcHlyYW1pZD0yIGJfYWRhcHQ9MSBiX2JpYXM9MCBkaXJlY3Q9MSB3ZWlnaHRiPTEgb3Blbl9nb3A9MCB3ZWlnaHRwPTIga2V5aW50PTI1MCBrZXlpbnRfbWluPTI1IHNjZW5lY3V0PTQwIGludHJhX3JlZnJlc2g9MCByY19sb29rYWhlYWQ9NDAgcmM9Y3JmIG1idHJlZT0xIGNyZj0yMy4wIHFjb21wPTAuNjAgcXBtaW49MCBxcG1heD02OSBxcHN0ZXA9NCBpcF9yYXRpbz0xLjQwIGFxPTE6MS4wMACAAAABWWWIhAA3//728P4FNjuY0JcRzMheBA==';
    
    const checkbox = currentTask.checkboxes.find(cb => cb.id === checkboxId);
    if (checkbox) {
      const attachmentKey = type === 'photo' ? 'photos' : 'videos';
      const currentAttachments = checkbox.attachments?.[attachmentKey] || [];
      const newAttachments = [...currentAttachments, mediaUrl];
      
      handleCheckboxToggle(checkboxId, true, { [attachmentKey]: newAttachments });
    }
  };

  const handleFileUpload = (checkboxId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          const checkbox = currentTask.checkboxes.find(cb => cb.id === checkboxId);
          if (checkbox) {
            const currentFiles = checkbox.attachments?.files || [];
            const newFiles = [...currentFiles, result];
            handleCheckboxToggle(checkboxId, true, { files: newFiles });
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleSignature = (checkboxId: string) => {
    if (signature.trim()) {
      handleCheckboxToggle(checkboxId, true, { signature });
      setSignature('');
      setShowSignature(false);
    }
  };

  const handleCompleteTask = () => {
    const updatedTask = {
      ...currentTask,
      status: 'completed' as const,
      completedAt: new Date().toISOString(),
      taskNotes
    };
    setCurrentTask(updatedTask);
    onComplete?.(updatedTask);
  };

  const handleSaveNotes = () => {
    setCurrentTask(prev => ({ ...prev, taskNotes }));
    setShowTaskNotes(false);
  };

  const handleSaveCheckboxNote = (note: string) => {
    if (editingNote) {
      updateCheckboxNote(currentTask.id, editingNote.id, note);
      // We also need to update the local state to reflect the change immediately
      setCurrentTask(prev => ({
        ...prev,
        checkboxes: prev.checkboxes.map(cb =>
          cb.id === editingNote.id ? { ...cb, note } : cb
        ),
      }));
      setEditingNote(null);
    }
  };

  const renderCheckboxContent = (checkbox: TaskCheckbox) => {
    if (expandedCheckbox !== checkbox.id) return null;

    switch (checkbox.type) {
      case 'photo':
        return (
          <div className="mt-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleMediaCapture(checkbox.id, 'photo')}
                className="p-4 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors flex flex-col items-center"
              >
                <Camera className="h-6 w-6 mb-2" />
                <span className="text-sm font-medium">Take Photo</span>
              </button>
              
              <button
                onClick={() => fileInputRef.current?.click()}
                className="p-4 bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600 transition-colors flex flex-col items-center"
              >
                <Upload className="h-6 w-6 mb-2" />
                <span className="text-sm font-medium">Upload</span>
              </button>
            </div>

            {checkbox.attachments?.photos && checkbox.attachments.photos.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-white">Photos ({checkbox.attachments.photos.length})</h4>
                <div className="grid grid-cols-3 gap-2">
                  {checkbox.attachments.photos.map((photo, index) => (
                    <div key={index} className="relative aspect-square bg-slate-700 rounded-lg overflow-hidden">
                      <Image src={photo} alt={`Photo ${index + 1}`} layout="fill" objectFit="cover" />
                      <div className="absolute inset-0 bg-green-600/20 flex items-center justify-center">
                        <CheckCircle className="h-6 w-6 text-green-400" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => handleFileUpload(checkbox.id, e)}
              className="hidden"
            />
          </div>
        );

      case 'video':
        return (
          <div className="mt-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleMediaCapture(checkbox.id, 'video')}
                className="p-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex flex-col items-center"
              >
                <Video className="h-6 w-6 mb-2" />
                <span className="text-sm font-medium">Record Video</span>
              </button>
              
              <button
                onClick={() => fileInputRef.current?.click()}
                className="p-4 bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600 transition-colors flex flex-col items-center"
              >
                <Upload className="h-6 w-6 mb-2" />
                <span className="text-sm font-medium">Upload</span>
              </button>
            </div>

            {checkbox.attachments?.videos && checkbox.attachments.videos.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-white">Videos ({checkbox.attachments.videos.length})</h4>
                <div className="grid grid-cols-2 gap-2">
                  {checkbox.attachments.videos.map((video, index) => (
                    <div key={index} className="relative aspect-video bg-slate-700 rounded-lg overflow-hidden">
                      <Film className="h-full w-full text-slate-400 p-4" />
                      <div className="absolute inset-0 bg-green-600/20 flex items-center justify-center">
                        <CheckCircle className="h-6 w-6 text-green-400" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="video/*"
              multiple
              onChange={(e) => handleFileUpload(checkbox.id, e)}
              className="hidden"
            />
          </div>
        );

      case 'file':
        return (
          <div className="mt-4 space-y-4">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full p-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center"
            >
              <Paperclip className="h-5 w-5 mr-2" />
              Upload Files
            </button>

            {checkbox.attachments?.files && checkbox.attachments.files.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-white">Files ({checkbox.attachments.files.length})</h4>
                <div className="space-y-2">
                  {checkbox.attachments.files.map((file, index) => (
                    <div key={index} className="p-3 bg-slate-700 rounded-lg flex items-center space-x-3">
                      <FileText className="h-4 w-4 text-slate-400" />
                      <span className="text-sm text-white flex-1">Document {index + 1}</span>
                      <CheckCircle className="h-4 w-4 text-green-400" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              multiple
              onChange={(e) => handleFileUpload(checkbox.id, e)}
              className="hidden"
            />
          </div>
        );

      case 'signature':
        return (
          <div className="mt-4 space-y-4">
            {!showSignature ? (
              <button
                onClick={() => setShowSignature(true)}
                className="w-full p-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center"
              >
                <Edit3 className="h-5 w-5 mr-2" />
                Add Digital Signature
              </button>
            ) : (
              <div className="space-y-4">
                <div className="bg-slate-700 rounded-lg p-4">
                  <div className="bg-white rounded-lg h-32 flex items-center justify-center mb-4">
                    <span className="text-slate-600 text-sm">Signature Pad Area</span>
                  </div>
                  
                  <input
                    type="text"
                    value={signature}
                    onChange={(e) => setSignature(e.target.value)}
                    placeholder="Type your name for digital signature"
                    className="w-full p-3 bg-slate-600 border border-slate-500 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent mb-4"
                  />
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleSignature(checkbox.id)}
                      disabled={!signature.trim()}
                      className="flex-1 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors"
                    >
                      Confirm Signature
                    </button>
                    <button
                      onClick={() => {
                        setShowSignature(false);
                        setSignature('');
                      }}
                      className="px-4 py-2 bg-slate-600 text-slate-300 rounded-lg hover:bg-slate-500 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            {checkbox.attachments?.signature && (
              <div className="p-3 bg-green-900/20 border border-green-600/30 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span className="text-sm font-medium text-green-400">Signature Captured</span>
                </div>
                <p className="text-sm text-slate-300">Signed by: {checkbox.attachments.signature}</p>
                <p className="text-xs text-slate-400">
                  {new Date().toLocaleString()}
                </p>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 p-4">
      {/* Header */}
      <div className="bg-slate-800 rounded-2xl p-6 mb-6 border border-slate-700">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start space-x-3">
            {onBack && (
              <button
                onClick={onBack}
                className="p-2 bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
            )}
            <div className="flex-1">
              <h1 className="text-xl font-bold text-white mb-1">{currentTask.title}</h1>
              <p className="text-slate-400 text-sm mb-3">{currentTask.description}</p>
            </div>
          </div>
          
          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(currentTask.priority)}`}>
            {currentTask.priority.toUpperCase()}
          </span>
        </div>

        {/* Task Meta Info */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center">
                {React.createElement(getRoleIcon(currentTask.assignedBy.role), {
                  className: "h-4 w-4 text-cyan-400"
                })}
              </div>
              <div>
                <p className="text-xs text-slate-500">Assigned by</p>
                <p className="text-sm text-white font-medium">{currentTask.assignedBy.name}</p>
                <p className="text-xs text-slate-400">{currentTask.assignedBy.role}</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center">
                {React.createElement(getRoleIcon(currentTask.assignedTo.role), {
                  className: "h-4 w-4 text-green-400"
                })}
              </div>
              <div>
                <p className="text-xs text-slate-500">Assigned to</p>
                <p className="text-sm text-white font-medium">{currentTask.assignedTo.name}</p>
                <p className="text-xs text-slate-400">{currentTask.assignedTo.role}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Meta */}
        <div className="flex items-center space-x-4 text-xs text-slate-500 mb-4">
          <div className="flex items-center space-x-1">
            <MapPin className="h-3 w-3" />
            <span>{currentTask.vessel}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="h-3 w-3" />
            <span>{currentTask.estimatedDuration}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="h-3 w-3" />
            <span>Due: {new Date(currentTask.dueDate).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Progress Summary */}
        <div className="bg-slate-700/50 rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-white">Progress</span>
            <span className="text-sm text-slate-400">
              {completedRequired}/{totalRequired} required • {completedOptional}/{totalOptional} optional
            </span>
          </div>
          <div className="w-full bg-slate-600 rounded-full h-2 mb-2">
            <div 
              className="bg-gradient-to-r from-cyan-500 to-green-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(completedRequired / totalRequired) * 100}%` }}
            ></div>
          </div>
          {!canComplete && (
            <div className="flex items-center space-x-2 text-xs text-orange-400">
              <AlertTriangle className="h-3 w-3" />
              <span>{totalRequired - completedRequired} required items remaining</span>
            </div>
          )}
        </div>
      </div>

      {/* Task Notes from Assignee */}
      {currentTask.notes.length > 0 && (
        <div className="bg-slate-800 rounded-2xl p-6 mb-6 border border-slate-700">
          <h3 className="text-lg font-bold text-white mb-4">Notes from Assignee</h3>
          <div className="space-y-3">
            {currentTask.notes.map((note) => (
              <div key={note.id} className="p-3 bg-blue-900/20 border border-blue-600/30 rounded-lg">
                <p className="text-sm text-slate-300 mb-2">{note.text}</p>
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>{note.author}</span>
                  <span>{new Date(note.timestamp).toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Checkboxes */}
      <div className="bg-slate-800 rounded-2xl p-6 mb-6 border border-slate-700">
        <h3 className="text-lg font-bold text-white mb-4">Task Checklist</h3>
        <div className="space-y-3">
          {currentTask.checkboxes.map((checkbox) => {
            const CheckboxIcon = getCheckboxIcon(checkbox.type, checkbox.checked);
            
            return (
              <div key={checkbox.id} className="border border-slate-600 rounded-lg overflow-hidden">
                <div 
                  className={`p-4 cursor-pointer transition-colors ${
                    checkbox.checked ? 'bg-green-900/20' : 'bg-slate-700/50'
                  }`}
                  onClick={() => {
                    if (checkbox.type === 'checkbox') {
                      handleCheckboxToggle(checkbox.id, !checkbox.checked);
                    } else {
                      setExpandedCheckbox(
                        expandedCheckbox === checkbox.id ? null : checkbox.id
                      );
                    }
                  }}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                      checkbox.checked 
                        ? 'bg-green-600 border-green-600' 
                        : checkbox.required
                        ? 'border-orange-500 hover:border-orange-400'
                        : 'border-slate-500 hover:border-slate-400'
                    }`}>
                      {checkbox.checked && <CheckCircle className="h-4 w-4 text-white" />}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className={`text-sm font-medium ${
                          checkbox.checked ? 'text-green-400 line-through' : 'text-white'
                        }`}>
                          {checkbox.text}
                        </h4>
                        <div className="flex items-center space-x-2">
                          {checkbox.required && (
                            <span className="px-2 py-1 bg-orange-900/30 text-orange-400 rounded text-xs font-medium">
                              Required
                            </span>
                          )}
                          {checkbox.type !== 'checkbox' && (
                            <CheckboxIcon className={`h-4 w-4 ${
                              checkbox.checked ? 'text-green-400' : 'text-slate-400'
                            }`} />
                          )}
                        </div>
                      </div>
                      
                      {checkbox.description && (
                        <p className="text-xs text-slate-400">{checkbox.description}</p>
                      )}

                      {/* Attachment indicators */}
                      {checkbox.attachments && (
                        <div className="flex items-center space-x-4 mt-2 text-xs text-slate-500">
                          {checkbox.attachments.photos && checkbox.attachments.photos.length > 0 && (
                            <span>{checkbox.attachments.photos.length} photo(s)</span>
                          )}
                          {checkbox.attachments.videos && checkbox.attachments.videos.length > 0 && (
                            <span>{checkbox.attachments.videos.length} video(s)</span>
                          )}
                          {checkbox.attachments.files && checkbox.attachments.files.length > 0 && (
                            <span>{checkbox.attachments.files.length} file(s)</span>
                          )}
                          {checkbox.attachments.signature && (
                            <span>Signed</span>
                          )}
                        </div>
                      )}
                      {checkbox.note && (
                        <div className="mt-2 p-2 bg-slate-600/50 rounded-lg text-xs text-slate-300 italic">
                          {checkbox.note}
                        </div>
                      )}
                    </div>
                  </div>
                  <button 
                    onClick={() => setEditingNote(checkbox)}
                    className="p-2 text-slate-400 hover:text-white"
                  >
                    <MessageSquare className="h-4 w-4" />
                  </button>
                </div>

                {renderCheckboxContent(checkbox)}
              </div>
            );
          })}
        </div>
      </div>

      {/* Personal Notes Section */}
      <div className="bg-slate-800 rounded-2xl p-6 mb-6 border border-slate-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-white">Your Notes</h3>
          <button
            onClick={() => setShowTaskNotes(!showTaskNotes)}
            className="px-4 py-2 bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600 transition-colors text-sm"
          >
            {showTaskNotes ? 'Hide' : 'Add Notes'}
          </button>
        </div>

        {showTaskNotes && (
          <div className="space-y-4">
            <textarea
              value={taskNotes}
              onChange={(e) => setTaskNotes(e.target.value)}
              placeholder="Add your personal notes, observations, or comments about this task..."
              className="w-full h-32 p-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none"
            />
            
            <button
              onClick={handleSaveNotes}
              className="px-6 py-2 bg-cyan-600 text-white rounded-lg font-medium hover:bg-cyan-700 transition-colors flex items-center"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Notes
            </button>
          </div>
        )}

        {currentTask.taskNotes && !showTaskNotes && (
          <div className="p-3 bg-slate-700/50 rounded-lg">
            <p className="text-sm text-slate-300">{currentTask.taskNotes}</p>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-4">
        <button
          onClick={handleCompleteTask}
          disabled={!canComplete}
          className="flex-1 py-4 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
        >
          <Send className="h-5 w-5 mr-2" />
          Complete Task
        </button>
      </div>

      {/* Task Completed State */}
      {currentTask.status === 'completed' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700 max-w-md w-full text-center">
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Task Completed!</h3>
            <p className="text-slate-400 mb-6">
              Your task has been successfully completed and submitted for review.
            </p>
            <button
              onClick={onBack}
              className="w-full py-3 bg-cyan-600 text-white rounded-lg font-medium hover:bg-cyan-700 transition-colors"
            >
              Return to Task List
            </button>
          </div>
        </div>
      )}

      {editingNote && (
        <CheckboxNoteModal
          note={editingNote.note || ''}
          onSave={handleSaveCheckboxNote}
          onClose={() => setEditingNote(null)}
        />
      )}
    </div>
  );
}

