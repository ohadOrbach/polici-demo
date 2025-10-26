'use client';

import React from 'react';
import { 
  AlertTriangle, 
  X, 
  Shield, 
  Clock, 
  CheckCircle, 
  Info,
  Ship,
  MapPin,
  Calendar
} from 'lucide-react';

interface Alert {
  id: string;
  title: string;
  message: string;
  type: 'emergency' | 'safety' | 'weather' | 'compliance' | 'system';
  severity: 'critical' | 'high' | 'medium';
  timestamp: string;
  source: string;
  location?: string;
  affectedVessels?: string[];
  actionRequired: boolean;
  autoClose?: boolean;
  expiresAt?: string;
}

interface AlertModalProps {
  alert: Alert;
  isOpen: boolean;
  onClose: () => void;
  onAction?: (action: string) => void;
}

const getAlertIcon = (type: string) => {
  switch (type) {
    case 'emergency': return AlertTriangle;
    case 'safety': return Shield;
    case 'weather': return AlertTriangle;
    case 'compliance': return CheckCircle;
    case 'system': return Info;
    default: return Info;
  }
};

const getAlertColor = (severity: string) => {
  switch (severity) {
    case 'critical': return 'text-red-400 bg-red-900/30 border-red-500';
    case 'high': return 'text-orange-400 bg-orange-900/30 border-orange-500';
    case 'medium': return 'text-yellow-400 bg-yellow-900/30 border-yellow-500';
    default: return 'text-slate-400 bg-slate-800 border-slate-600';
  }
};

const getSeverityBadgeColor = (severity: string) => {
  switch (severity) {
    case 'critical': return 'bg-red-600 text-white';
    case 'high': return 'bg-orange-600 text-white';
    case 'medium': return 'bg-yellow-600 text-white';
    default: return 'bg-slate-600 text-white';
  }
};

export default function AlertModal({ alert, isOpen, onClose, onAction }: AlertModalProps) {
  if (!isOpen) return null;

  const AlertIcon = getAlertIcon(alert.type);
  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

      {/* Alert Modal */}
      <div className={`relative bg-slate-800 rounded-2xl border-l-4 ${getAlertColor(alert.severity)} shadow-2xl w-full max-w-lg animate-in slide-in-from-top-4 duration-300`}>
        
        {/* Header */}
        <div className="p-6 pb-0">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start space-x-4">
              <div className={`p-3 rounded-xl border-l-4 ${getAlertColor(alert.severity)}`}>
                <AlertIcon className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h2 className="text-xl font-bold text-white">{alert.title}</h2>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium uppercase ${getSeverityBadgeColor(alert.severity)}`}>
                    {alert.severity}
                  </span>
                </div>
                <div className="flex items-center space-x-4 text-sm text-slate-400">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>{formatTimestamp(alert.timestamp)}</span>
                  </div>
                  <span>{alert.source}</span>
                </div>
              </div>
            </div>
            
            {!alert.actionRequired && (
              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="px-6 pb-6">
          <div className="mb-6">
            <p className="text-slate-300 leading-relaxed">{alert.message}</p>
          </div>

          {/* Additional Info */}
          <div className="space-y-4 mb-6">
            {alert.location && (
              <div className="flex items-center space-x-2 text-sm">
                <MapPin className="h-4 w-4 text-slate-400" />
                <span className="text-slate-300">Location: {alert.location}</span>
              </div>
            )}

            {alert.affectedVessels && alert.affectedVessels.length > 0 && (
              <div className="flex items-start space-x-2 text-sm">
                <Ship className="h-4 w-4 text-slate-400 mt-0.5" />
                <div>
                  <span className="text-slate-300">Affected Vessels:</span>
                  <div className="mt-1 space-y-1">
                    {alert.affectedVessels.map((vessel, index) => (
                      <div key={index} className="text-cyan-400 text-xs">• {vessel}</div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {alert.expiresAt && (
              <div className="flex items-center space-x-2 text-sm">
                <Calendar className="h-4 w-4 text-slate-400" />
                <span className="text-slate-300">
                  Expires: {formatTimestamp(alert.expiresAt)}
                </span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            {alert.actionRequired ? (
              <>
                <button
                  onClick={() => onAction?.('acknowledge')}
                  className="flex-1 py-3 bg-cyan-600 text-white rounded-lg font-medium hover:bg-cyan-700 transition-colors flex items-center justify-center"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Acknowledge & Take Action
                </button>
                <button
                  onClick={() => onAction?.('dismiss')}
                  className="px-6 py-3 bg-slate-700 text-slate-300 rounded-lg font-medium hover:bg-slate-600 transition-colors"
                >
                  Dismiss
                </button>
              </>
            ) : (
              <button
                onClick={onClose}
                className="flex-1 py-3 bg-slate-700 text-slate-300 rounded-lg font-medium hover:bg-slate-600 transition-colors"
              >
                Close
              </button>
            )}
          </div>

          {/* Auto-close indicator */}
          {alert.autoClose && (
            <div className="mt-4 p-3 bg-slate-700/50 rounded-lg">
              <div className="flex items-center space-x-2 text-xs text-slate-400">
                <Clock className="h-3 w-3" />
                <span>This alert will auto-close in 30 seconds if no action is taken</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Sample alerts for demonstration
export const sampleAlerts: Alert[] = [
  {
    id: 'alert-001',
    title: 'Emergency Weather Alert',
    message: 'Severe storm approaching Baltic Sea region. All vessels should seek immediate shelter or alter course. Wind speeds expected to reach 45+ knots with 8-meter waves.',
    type: 'weather',
    severity: 'critical',
    timestamp: '2025-09-17T12:00:00Z',
    source: 'Maritime Weather Service',
    location: 'Baltic Sea, Coordinates: 59.3293°N, 18.0686°E',
    affectedVessels: ['MV Northern Star', 'MV Arctic Voyager'],
    actionRequired: true,
    autoClose: false
  },
  {
    id: 'alert-002',
    title: 'Safety Equipment Malfunction',
    message: 'Critical safety equipment failure detected on MV Atlantic Pioneer. Fire suppression system offline. Immediate inspection and repair required.',
    type: 'safety',
    severity: 'critical',
    timestamp: '2025-09-17T11:45:00Z',
    source: 'Vessel Monitoring System',
    location: 'English Channel',
    affectedVessels: ['MV Atlantic Pioneer'],
    actionRequired: true,
    autoClose: false
  },
  {
    id: 'alert-003',
    title: 'Port State Control Inspection',
    message: 'Unscheduled PSC inspection initiated at Rotterdam port. MV Atlantic Pioneer must comply with all inspection requirements immediately.',
    type: 'compliance',
    severity: 'high',
    timestamp: '2025-09-17T10:30:00Z',
    source: 'Port Authority Rotterdam',
    location: 'Rotterdam Port, Netherlands',
    affectedVessels: ['MV Atlantic Pioneer'],
    actionRequired: true,
    autoClose: false
  },
  {
    id: 'alert-004',
    title: 'System Maintenance Complete',
    message: 'Scheduled maintenance of the fleet management system has been completed successfully. All systems are now fully operational.',
    type: 'system',
    severity: 'medium',
    timestamp: '2025-09-17T04:00:00Z',
    source: 'IT Operations',
    actionRequired: false,
    autoClose: true,
    expiresAt: '2025-09-17T16:00:00Z'
  }
];
