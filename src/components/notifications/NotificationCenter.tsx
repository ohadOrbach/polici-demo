'use client';

import React, { useState } from 'react';
import { Bell, X, AlertTriangle, CheckCircle, Info, Ship, Shield, FileText, Users, Settings, Mail, Trash2, Eye, EyeOff } from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'safety' | 'mission' | 'compliance' | 'system' | 'info';
  priority: 'critical' | 'high' | 'medium' | 'low';
  timestamp: string;
  read: boolean;
  source: string;
  actionRequired?: boolean;
  relatedEntity?: {
    type: 'vessel' | 'mission' | 'user';
    id: string;
    name: string;
  };
}

const notifications: Notification[] = [
  {
    id: 'notif-001',
    title: 'Critical Safety Alert',
    message: 'Emergency drill required on MV Northern Star within 24 hours due to upcoming port inspection.',
    type: 'safety',
    priority: 'critical',
    timestamp: '2025-09-17T11:30:00Z',
    read: false,
    source: 'Safety Management System',
    actionRequired: true,
    relatedEntity: {
      type: 'vessel',
      id: 'mv-001',
      name: 'MV Northern Star'
    }
  },
  {
    id: 'notif-002',
    title: 'Mission Assignment',
    message: 'New navigation equipment check assigned to your vessel. Due: Today 16:00.',
    type: 'mission',
    priority: 'high',
    timestamp: '2025-09-17T10:15:00Z',
    read: false,
    source: 'Fleet Operations',
    actionRequired: true,
    relatedEntity: {
      type: 'mission',
      id: 'mission-002',
      name: 'Navigation Equipment Check'
    }
  },
  {
    id: 'notif-003',
    title: 'Compliance Deadline',
    message: 'MARPOL environmental compliance report due in 3 days. Please complete all required documentation.',
    type: 'compliance',
    priority: 'high',
    timestamp: '2025-09-17T09:45:00Z',
    read: false,
    source: 'Compliance Office',
    actionRequired: true
  },
  {
    id: 'notif-004',
    title: 'Mission Completed',
    message: 'Engine room inspection completed successfully by Captain Chen on MV Pacific Explorer.',
    type: 'mission',
    priority: 'medium',
    timestamp: '2025-09-17T08:20:00Z',
    read: true,
    source: 'Mission Control',
    relatedEntity: {
      type: 'vessel',
      id: 'mv-003',
      name: 'MV Pacific Explorer'
    }
  },
  {
    id: 'notif-005',
    title: 'System Maintenance',
    message: 'Scheduled system maintenance will occur tonight from 02:00-04:00 UTC. Limited functionality expected.',
    type: 'system',
    priority: 'medium',
    timestamp: '2025-09-17T07:30:00Z',
    read: true,
    source: 'IT Operations'
  },
  {
    id: 'notif-006',
    title: 'Weather Alert',
    message: 'Severe weather warning for Baltic Sea region. Vessels should take necessary precautions.',
    type: 'safety',
    priority: 'high',
    timestamp: '2025-09-17T06:15:00Z',
    read: false,
    source: 'Weather Service',
    actionRequired: true
  },
  {
    id: 'notif-007',
    title: 'Crew Training Reminder',
    message: 'Annual safety training certification expires in 30 days for 3 crew members.',
    type: 'compliance',
    priority: 'medium',
    timestamp: '2025-09-16T16:45:00Z',
    read: true,
    source: 'Training Department'
  },
  {
    id: 'notif-008',
    title: 'Port State Control Inspection',
    message: 'PSC inspection scheduled for MV Atlantic Pioneer at Rotterdam port on September 20th.',
    type: 'compliance',
    priority: 'high',
    timestamp: '2025-09-16T14:20:00Z',
    read: false,
    source: 'Port Authority',
    actionRequired: true,
    relatedEntity: {
      type: 'vessel',
      id: 'mv-002',
      name: 'MV Atlantic Pioneer'
    }
  }
];

const getNotificationIcon = (type: string) => {
  switch (type) {
    case 'safety': return AlertTriangle;
    case 'mission': return FileText;
    case 'compliance': return Shield;
    case 'system': return Settings;
    default: return Info;
  }
};

const getNotificationColor = (type: string, priority: string) => {
  if (priority === 'critical') return 'text-red-400 bg-red-900/30 border-red-500';
  
  switch (type) {
    case 'safety': return 'text-orange-400 bg-orange-900/30 border-orange-500';
    case 'mission': return 'text-cyan-400 bg-cyan-900/30 border-cyan-500';
    case 'compliance': return 'text-purple-400 bg-purple-900/30 border-purple-500';
    case 'system': return 'text-blue-400 bg-blue-900/30 border-blue-500';
    default: return 'text-slate-400 bg-slate-800 border-slate-600';
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'critical': return 'text-red-400 bg-red-900/30';
    case 'high': return 'text-orange-400 bg-orange-900/30';
    case 'medium': return 'text-yellow-400 bg-yellow-900/30';
    case 'low': return 'text-green-400 bg-green-900/30';
    default: return 'text-slate-400 bg-slate-800';
  }
};

const formatTimestamp = (timestamp: string) => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
  
  if (diffInMinutes < 1) return 'Just now';
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
  return date.toLocaleDateString();
};

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
  variant?: 'web' | 'mobile';
}

export default function NotificationCenter({ isOpen, onClose, variant = 'web' }: NotificationCenterProps) {
  const [filter, setFilter] = useState('all');
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);

  const filteredNotifications = notifications.filter(notification => {
    const matchesFilter = filter === 'all' || notification.type === filter;
    const matchesRead = !showUnreadOnly || !notification.read;
    return matchesFilter && matchesRead;
  });

  const unreadCount = notifications.filter(n => !n.read).length;
  const isMobile = variant === 'mobile';

  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 z-50 ${isMobile ? '' : 'flex items-start justify-end pt-16 pr-4'}`}>
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Notification Panel */}
      <div className={`relative bg-slate-800 border border-slate-700 shadow-2xl ${
        isMobile 
          ? 'w-full h-full' 
          : 'w-96 max-h-[80vh] rounded-2xl'
      } flex flex-col`}>
        
        {/* Header */}
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-cyan-600 rounded-lg">
                <Bell className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">Notifications</h2>
                <p className="text-sm text-slate-400">{unreadCount} unread</p>
              </div>
            </div>
            
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between">
            <div className="flex space-x-2">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-3 py-1 bg-slate-700 border border-slate-600 rounded-lg text-white text-sm focus:ring-2 focus:ring-cyan-500"
              >
                <option value="all">All Types</option>
                <option value="safety">Safety</option>
                <option value="mission">Mission</option>
                <option value="compliance">Compliance</option>
                <option value="system">System</option>
              </select>
              
              <button
                onClick={() => setShowUnreadOnly(!showUnreadOnly)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  showUnreadOnly
                    ? 'bg-cyan-600 text-white'
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                {showUnreadOnly ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
              </button>
            </div>

            <button className="px-3 py-1 bg-slate-700 text-slate-300 rounded-lg text-sm hover:bg-slate-600 transition-colors">
              <Mail className="h-3 w-3" />
            </button>
          </div>
        </div>

        {/* Notification List */}
        <div className="flex-1 overflow-y-auto">
          {filteredNotifications.length === 0 ? (
            <div className="p-8 text-center">
              <Bell className="h-12 w-12 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400">No notifications found</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-700">
              {filteredNotifications.map((notification) => {
                const NotificationIcon = getNotificationIcon(notification.type);
                
                return (
                  <div
                    key={notification.id}
                    className={`p-4 hover:bg-slate-700/30 transition-colors ${
                      !notification.read ? 'bg-slate-700/20' : ''
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      {/* Icon */}
                      <div className={`p-2 rounded-lg border-l-4 ${getNotificationColor(notification.type, notification.priority)}`}>
                        <NotificationIcon className="h-4 w-4" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className={`text-sm font-medium ${notification.read ? 'text-slate-300' : 'text-white'}`}>
                            {notification.title}
                          </h4>
                          <div className="flex items-center space-x-2 ml-2">
                            {notification.actionRequired && (
                              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                            )}
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(notification.priority)}`}>
                              {notification.priority}
                            </span>
                          </div>
                        </div>

                        <p className={`text-sm mb-3 ${notification.read ? 'text-slate-400' : 'text-slate-300'}`}>
                          {notification.message}
                        </p>

                        {/* Metadata */}
                        <div className="flex items-center justify-between text-xs text-slate-500">
                          <div className="flex items-center space-x-4">
                            <span>{notification.source}</span>
                            {notification.relatedEntity && (
                              <div className="flex items-center space-x-1">
                                {notification.relatedEntity.type === 'vessel' && <Ship className="h-3 w-3" />}
                                {notification.relatedEntity.type === 'mission' && <FileText className="h-3 w-3" />}
                                {notification.relatedEntity.type === 'user' && <Users className="h-3 w-3" />}
                                <span>{notification.relatedEntity.name}</span>
                              </div>
                            )}
                          </div>
                          <span>{formatTimestamp(notification.timestamp)}</span>
                        </div>

                        {/* Action Buttons */}
                        {notification.actionRequired && (
                          <div className="flex space-x-2 mt-3">
                            <button className="px-3 py-1 bg-cyan-600 text-white rounded text-xs font-medium hover:bg-cyan-700 transition-colors">
                              Take Action
                            </button>
                            <button className="px-3 py-1 bg-slate-700 text-slate-300 rounded text-xs font-medium hover:bg-slate-600 transition-colors">
                              View Details
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col space-y-1">
                        {!notification.read && (
                          <button className="p-1 text-slate-400 hover:text-cyan-400 transition-colors">
                            <CheckCircle className="h-3 w-3" />
                          </button>
                        )}
                        <button className="p-1 text-slate-400 hover:text-red-400 transition-colors">
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-700">
          <div className="flex items-center justify-between">
            <button className="text-sm text-slate-400 hover:text-cyan-400 transition-colors">
              View All Notifications
            </button>
            <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors">
              <Settings className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
