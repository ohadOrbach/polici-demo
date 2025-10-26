'use client';

import React, { useState, useRef } from 'react';
import NextImage from 'next/image';
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
  CheckSquare,
  Circle,
  Edit3,
  Film,
  PenTool
} from 'lucide-react';

interface MissionStep {
  id: string;
  title: string;
  description: string;
  type: 'checklist' | 'photo' | 'video' | 'document' | 'signature' | 'notes';
  required: boolean;
  completed: boolean;
  data?: {
    photos?: string[];
    videos?: string[];
    documents?: string[];
    notes?: string;
    signature?: string;
    checklistItems?: { id: string; text: string; checked: boolean }[];
  };
}

interface Mission {
  id: string;
  title: string;
  description: string;
  vessel: string;
  assignedBy: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  estimatedDuration: string;
  steps: MissionStep[];
  startedAt?: string;
  completedAt?: string;
  status: 'active' | 'completed' | 'submitted';
}

// Sample mission data
const sampleMission: Mission = {
  id: 'mission-001',
  title: 'Emergency Safety Drill',
  description: 'Complete comprehensive fire drill and muster procedures according to SOLAS regulations',
  vessel: 'MV Northern Star',
  assignedBy: 'Safety Officer Johnson',
  dueDate: '2025-09-18T15:30:00Z',
  priority: 'high',
  estimatedDuration: '45 min',
  status: 'active',
  startedAt: '2025-09-17T14:15:00Z',
  steps: [
    {
      id: 'step-1',
      title: 'Sound General Alarm',
      description: 'Activate the general alarm system and verify all crew can hear it',
      type: 'checklist',
      required: true,
      completed: true,
      data: {
        checklistItems: [
          { id: 'check-1', text: 'Activate general alarm', checked: true },
          { id: 'check-2', text: 'Verify alarm audible in all areas', checked: true },
          { id: 'check-3', text: 'Check emergency lighting activation', checked: true }
        ]
      }
    },
    {
      id: 'step-2',
      title: 'Crew Muster Documentation',
      description: 'Take photos of crew at designated muster stations',
      type: 'photo',
      required: true,
      completed: false,
      data: {
        photos: []
      }
    },
    {
      id: 'step-3',
      title: 'Safety Equipment Verification',
      description: 'Record video walkthrough of safety equipment check',
      type: 'video',
      required: true,
      completed: false,
      data: {
        videos: []
      }
    },
    {
      id: 'step-4',
      title: 'Drill Observations',
      description: 'Record any observations, issues, or recommendations from the drill',
      type: 'notes',
      required: true,
      completed: false,
      data: {
        notes: ''
      }
    },
    {
      id: 'step-5',
      title: 'Captain Sign-off',
      description: 'Digital signature to confirm drill completion and compliance',
      type: 'signature',
      required: true,
      completed: false,
      data: {
        signature: ''
      }
    }
  ]
};

const getStepIcon = (type: string) => {
  switch (type) {
    case 'checklist': return CheckSquare;
    case 'photo': return Camera;
    case 'video': return Video;
    case 'document': return FileText;
    case 'signature': return PenTool;
    case 'notes': return Edit3;
    default: return Circle;
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high': return 'text-red-400 bg-red-900/30';
    case 'medium': return 'text-yellow-400 bg-yellow-900/30';
    case 'low': return 'text-green-400 bg-green-900/30';
    default: return 'text-slate-400 bg-slate-800';
  }
};

export default function MissionCompletion() {
  const [mission, setMission] = useState<Mission>(sampleMission);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [notes, setNotes] = useState('');
  const [signature, setSignature] = useState('');
  const [showSignaturePad, setShowSignaturePad] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const currentStep = mission.steps[currentStepIndex];
  const completedSteps = mission.steps.filter(step => step.completed).length;
  const totalSteps = mission.steps.length;
  const progressPercentage = (completedSteps / totalSteps) * 100;

  const handleStepComplete = (stepId: string, data?: MissionStep['data']) => {
    setMission(prev => ({
      ...prev,
      steps: prev.steps.map(step => 
        step.id === stepId 
          ? { ...step, completed: true, data: { ...step.data, ...data } }
          : step
      )
    }));
  };

  const handleNextStep = () => {
    if (currentStepIndex < mission.steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const handleMediaCapture = (type: 'photo' | 'video') => {
    if (type === 'photo') {
      // Simulate photo capture
      const photoUrl = `data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxAAPwCdABmX/9k=`;
      handleStepComplete(currentStep.id, { photos: [...(currentStep.data?.photos || []), photoUrl] });
    } else {
      // Simulate video capture
      const videoUrl = 'data:video/mp4;base64,AAAAIGZ0eXBpc29tAAACAGlzb21pc28yYXZjMW1wNDEAAAAIZnJlZQAAAr3mZGF0AAACrgYF//+q3EXpvebZSLeWLNgg2SPu73gyNjQgLSBjb3JlIDE1NSByMjkwMSA3ZDBmZjIyIC0gSC4yNjQvTVBFRy00IEFWQyBjb2RlYyAtIENvcHlsZWZ0IDIwMDMtMjAxOCAtIGh0dHA6Ly93d3cudmlkZW9sYW4ub3JnL3gyNjQuaHRtbCAtIG9wdGlvbnM6IGNhYmFjPTEgcmVmPTMgZGVibG9jaz0xOjA6MCBhbmFseXNlPTB4MzoweDExMyBtZT1oZXggc3VibWU9NyBwc3k9MSBwc3lfcmQ9MS4wMDowLjAwIG1peGVkX3JlZj0xIG1lX3JhbmdlPTE2IGNocm9tYV9tZT0xIHRyZWxsaXM9MSA4eDhkY3Q9MSBjcW09MCBkZWFkem9uZT0yMSwxMSBmYXN0X3Bza2lwPTEgY2hyb21hX3FwX29mZnNldD0tMiB0aHJlYWRzPTYgbG9va2FoZWFkX3RocmVhZHM9MSBzbGljZWRfdGhyZWFkcz0wIG5yPTAgZGVjaW1hdGU9MSBpbnRlcmxhY2VkPTAgYmx1cmF5X2NvbXBhdD0wIGNvbnN0cmFpbmVkX2ludHJhPTAgYmZyYW1lcz0zIGJfcHlyYW1pZD0yIGJfYWRhcHQ9MSBiX2JpYXM9MCBkaXJlY3Q9MSB3ZWlnaHRiPTEgb3Blbl9nb3A9MCB3ZWlnaHRwPTIga2V5aW50PTI1MCBrZXlpbnRfbWluPTI1IHNjZW5lY3V0PTQwIGludHJhX3JlZnJlc2g9MCByY19sb29rYWhlYWQ9NDAgcmM9Y3JmIG1idHJlZT0xIGNyZj0yMy4wIHFjb21wPTAuNjAgcXBtaW49MCBxcG1heD02OSBxcHN0ZXA9NCBpcF9yYXRpbz0xLjQwIGFxPTE6MS4wMACAAAABWWWIhAA3//728P4FNjuY0JcRzMheBA==';
      handleStepComplete(currentStep.id, { videos: [...(currentStep.data?.videos || []), videoUrl] });
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          
          if (file.type.startsWith('image/')) {
            handleStepComplete(currentStep.id, { 
              photos: [...(currentStep.data?.photos || []), result] 
            });
          } else if (file.type.startsWith('video/')) {
            handleStepComplete(currentStep.id, { 
              videos: [...(currentStep.data?.videos || []), result] 
            });
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleNotesSubmit = () => {
    if (notes.trim()) {
      handleStepComplete(currentStep.id, { notes });
      setNotes('');
    }
  };

  const handleSignatureSubmit = () => {
    if (signature.trim()) {
      handleStepComplete(currentStep.id, { signature });
      setSignature('');
      setShowSignaturePad(false);
    }
  };

  const handleMissionSubmit = () => {
    setMission(prev => ({
      ...prev,
      status: 'completed',
      completedAt: new Date().toISOString()
    }));
  };

  const renderStepContent = () => {
    switch (currentStep.type) {
      case 'checklist':
        return (
          <div className="space-y-4">
            <div className="space-y-3">
              {currentStep.data?.checklistItems?.map((item) => (
                <div key={item.id} className="flex items-center space-x-3 p-3 bg-slate-700/50 rounded-lg">
                  <button
                    onClick={() => {
                      const updatedItems = currentStep.data?.checklistItems?.map(i => 
                        i.id === item.id ? { ...i, checked: !i.checked } : i
                      );
                      handleStepComplete(currentStep.id, { checklistItems: updatedItems });
                    }}
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                      item.checked 
                        ? 'bg-green-600 border-green-600' 
                        : 'border-slate-500 hover:border-slate-400'
                    }`}
                  >
                    {item.checked && <CheckCircle className="h-3 w-3 text-white" />}
                  </button>
                  <span className={`text-sm ${item.checked ? 'text-green-400 line-through' : 'text-white'}`}>
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'photo':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleMediaCapture('photo')}
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

            {currentStep.data?.photos && currentStep.data.photos.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-white">Captured Photos ({currentStep.data.photos.length})</h4>
                <div className="grid grid-cols-3 gap-2">
                  {currentStep.data.photos.map((photo, index) => (
                    <div key={index} className="relative aspect-square bg-slate-700 rounded-lg overflow-hidden">
                      <NextImage src={photo} alt={`Photo ${index + 1}`} layout="fill" objectFit="cover" />
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
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>
        );

      case 'video':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleMediaCapture('video')}
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

            {currentStep.data?.videos && currentStep.data.videos.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-white">Recorded Videos ({currentStep.data.videos.length})</h4>
                <div className="grid grid-cols-2 gap-2">
                  {currentStep.data.videos.map((video, index) => (
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
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>
        );

      case 'notes':
        return (
          <div className="space-y-4">
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Enter your observations, notes, or comments..."
              className="w-full h-32 p-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none"
            />
            
            <button
              onClick={handleNotesSubmit}
              disabled={!notes.trim()}
              className="w-full py-3 bg-cyan-600 text-white rounded-lg font-medium hover:bg-cyan-700 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Notes
            </button>

            {currentStep.data?.notes && (
              <div className="p-3 bg-green-900/20 border border-green-600/30 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span className="text-sm font-medium text-green-400">Notes Saved</span>
                </div>
                <p className="text-sm text-slate-300">{currentStep.data.notes}</p>
              </div>
            )}
          </div>
        );

      case 'signature':
        return (
          <div className="space-y-4">
            {!showSignaturePad ? (
              <button
                onClick={() => setShowSignaturePad(true)}
                className="w-full p-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center"
              >
                <PenTool className="h-5 w-5 mr-2" />
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
                      onClick={handleSignatureSubmit}
                      disabled={!signature.trim()}
                      className="flex-1 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors"
                    >
                      Confirm Signature
                    </button>
                    <button
                      onClick={() => {
                        setShowSignaturePad(false);
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

            {currentStep.data?.signature && (
              <div className="p-3 bg-green-900/20 border border-green-600/30 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span className="text-sm font-medium text-green-400">Signature Captured</span>
                </div>
                <p className="text-sm text-slate-300">Signed by: {currentStep.data.signature}</p>
                <p className="text-xs text-slate-400">
                  {new Date().toLocaleString()}
                </p>
              </div>
            )}
          </div>
        );

      default:
        return (
          <div className="text-center py-8">
            <Circle className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-400">Step type not implemented</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 p-4">
      {/* Header */}
      <div className="bg-slate-800 rounded-2xl p-6 mb-6 border border-slate-700">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-xl font-bold text-white mb-1">{mission.title}</h1>
            <p className="text-slate-400 text-sm mb-3">{mission.description}</p>
            
            <div className="flex items-center space-x-4 text-xs text-slate-500">
              <div className="flex items-center space-x-1">
                <MapPin className="h-3 w-3" />
                <span>{mission.vessel}</span>
              </div>
              <div className="flex items-center space-x-1">
                <User className="h-3 w-3" />
                <span>{mission.assignedBy}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-3 w-3" />
                <span>{mission.estimatedDuration}</span>
              </div>
            </div>
          </div>
          
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(mission.priority)}`}>
            {mission.priority.toUpperCase()}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-sm text-slate-400 mb-2">
            <span>Progress</span>
            <span>{completedSteps}/{totalSteps} steps completed</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-cyan-500 to-green-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Step Navigation */}
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {mission.steps.map((step, index) => {
            const StepIcon = getStepIcon(step.type);
            return (
              <button
                key={step.id}
                onClick={() => setCurrentStepIndex(index)}
                className={`flex-shrink-0 p-2 rounded-lg border-2 transition-all ${
                  index === currentStepIndex
                    ? 'border-cyan-500 bg-cyan-900/30'
                    : step.completed
                    ? 'border-green-500 bg-green-900/30'
                    : 'border-slate-600 bg-slate-700/50'
                }`}
              >
                <StepIcon className={`h-4 w-4 ${
                  index === currentStepIndex
                    ? 'text-cyan-400'
                    : step.completed
                    ? 'text-green-400'
                    : 'text-slate-400'
                }`} />
              </button>
            );
          })}
        </div>
      </div>

      {/* Current Step */}
      <div className="bg-slate-800 rounded-2xl p-6 mb-6 border border-slate-700">
        <div className="flex items-center space-x-3 mb-4">
          <div className={`p-2 rounded-lg ${
            currentStep.completed ? 'bg-green-600' : 'bg-slate-700'
          }`}>
            {React.createElement(getStepIcon(currentStep.type), {
              className: `h-5 w-5 ${currentStep.completed ? 'text-white' : 'text-cyan-400'}`
            })}
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-bold text-white">{currentStep.title}</h2>
            <p className="text-slate-400 text-sm">{currentStep.description}</p>
          </div>
          {currentStep.required && (
            <span className="px-2 py-1 bg-red-900/30 text-red-400 rounded text-xs font-medium">
              Required
            </span>
          )}
        </div>

        {renderStepContent()}
      </div>

      {/* Navigation Controls */}
      <div className="flex space-x-4">
        <button
          onClick={handlePreviousStep}
          disabled={currentStepIndex === 0}
          className="px-6 py-3 bg-slate-700 text-slate-300 rounded-lg font-medium hover:bg-slate-600 disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed transition-colors"
        >
          Previous
        </button>
        
        {currentStepIndex < mission.steps.length - 1 ? (
          <button
            onClick={handleNextStep}
            className="flex-1 py-3 bg-cyan-600 text-white rounded-lg font-medium hover:bg-cyan-700 transition-colors"
          >
            Next Step
          </button>
        ) : (
          <button
            onClick={handleMissionSubmit}
            disabled={mission.steps.some(step => step.required && !step.completed)}
            className="flex-1 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
          >
            <Send className="h-4 w-4 mr-2" />
            Submit Mission
          </button>
        )}
      </div>

      {/* Mission Completed State */}
      {mission.status === 'completed' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700 max-w-md w-full text-center">
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Mission Completed!</h3>
            <p className="text-slate-400 mb-6">
              Your mission has been successfully completed and submitted for review.
            </p>
            <button
              onClick={() => window.history.back()}
              className="w-full py-3 bg-cyan-600 text-white rounded-lg font-medium hover:bg-cyan-700 transition-colors"
            >
              Return to Mission List
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
