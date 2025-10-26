'use client';

import React, { useState } from 'react';
import { 
  Bell, 
  AlertTriangle, 
  CheckCircle, 
  Info, 
  FileText, 
  Settings,
  Search,
  Mail,
  Trash2,
  Eye,
  EyeOff
} from 'lucide-react';

interface WebNotification {
  id: string;
  title: string;
  message: string;
  type: 'safety' | 'mission' | 'compliance' | 'system' | 'info';
  priority: 'critical' | 'high' | 'medium' | 'low';
  timestamp: string;
  read: boolean;
  source: string;
  actionRequired?: boolean;
}

const webNotifications: WebNotification[] = [
  {
    id: 'web-001',
    title: 'Critical Safety Alert',
    message: 'Emergency drill required on MV Northern Star within 24 hours due to upcoming port inspection.',
    type: 'safety',
    priority: 'critical',
    timestamp: '2025-09-17T11:30:00Z',
    read: false,
    source: 'Safety Management System',
    actionRequired: true
  },
  {
    id: 'web-002',
    title: 'Mission Assignment',
    message: 'New navigation equipment check assigned to your vessel. Due: Today 16:00.',
    type: 'mission',
    priority: 'high',
    timestamp: '2025-09-17T10:15:00Z',
    read: false,
    source: 'Fleet Operations',
    actionRequired: true
  },
  {
    id: 'web-003',
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
    id: 'web-004',
    title: 'Mission Completed',
    message: 'Engine room inspection completed successfully by Captain Chen on MV Pacific Explorer.',
    type: 'mission',
    priority: 'medium',
    timestamp: '2025-09-17T08:20:00Z',
    read: true,
    source: 'Mission Control'
  },
  {
    id: 'web-005',
    title: 'System Maintenance',
    message: 'Scheduled system maintenance will occur tonight from 02:00-04:00 UTC. Limited functionality expected.',
    type: 'system',
    priority: 'medium',
    timestamp: '2025-09-17T07:30:00Z',
    read: true,
    source: 'IT Operations'
  }
];

const getNotificationIcon = (type: string) => {
  switch (type) {
    case 'safety': return AlertTriangle;
    case 'mission': return FileText;
    case 'compliance': return AlertTriangle; // Changed from Shield to AlertTriangle for consistency
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

export default function WebNotifications() {
  const [filter, setFilter] = useState('all');
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredNotifications = webNotifications.filter(notification => {
    const matchesFilter = filter === 'all' || notification.type === filter;
    const matchesRead = !showUnreadOnly || !notification.read;
    const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesRead && matchesSearch;
  });

  const unreadCount = webNotifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-800/80 rounded-2xl p-6 border border-slate-700">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-cyan-600 rounded-xl">
              <Bell className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Notifications</h2>
              <p className="text-slate-400">{unreadCount} unread notifications</p>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <button className="px-4 py-2 bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600 transition-colors flex items-center">
              <Mail className="h-4 w-4 mr-2" />
              Mark All Read
            </button>
            <button className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors flex items-center">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </button>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search notifications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            />
          </div>

          {/* Filters */}
          <div className="flex space-x-2">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-cyan-500"
            >
              <option value="all">All Types</option>
              <option value="safety">Safety</option>
              <option value="mission">Mission</option>
              <option value="compliance">Compliance</option>
              <option value="system">System</option>
            </select>
            
            <button
              onClick={() => setShowUnreadOnly(!showUnreadOnly)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                showUnreadOnly
                  ? 'bg-cyan-600 text-white'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              {showUnreadOnly ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Notification List */}
      <div className="space-y-4">
        {filteredNotifications.length === 0 ? (
          <div className="bg-slate-800 rounded-2xl p-12 text-center border border-slate-700">
            <Bell className="h-16 w-16 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400 text-lg">No notifications found</p>
          </div>
        ) : (
          filteredNotifications.map((notification) => {
            const NotificationIcon = getNotificationIcon(notification.type);
            
            return (
              <div
                key={notification.id}
                className={`bg-slate-800 rounded-2xl p-6 border-l-4 ${getNotificationColor(notification.type, notification.priority)} hover:bg-slate-700/50 transition-colors`}
              >
                <div className="flex items-start space-x-4">
                  {/* Icon */}
                  <div className={`p-3 rounded-xl ${getNotificationColor(notification.type, notification.priority)}`}>
                    <NotificationIcon className="h-6 w-6" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className={`text-lg font-bold ${notification.read ? 'text-slate-300' : 'text-white'}`}>
                        {notification.title}
                      </h3>
                      <div className="flex items-center space-x-3 ml-4">
                        {notification.actionRequired && (
                          <div className="flex items-center space-x-1">
                            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                            <span className="text-xs text-red-400 font-medium">Action Required</span>
                          </div>
                        )}
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(notification.priority)}`}>
                          {notification.priority.toUpperCase()}
                        </span>
                      </div>
                    </div>

                    <p className={`text-sm mb-4 leading-relaxed ${notification.read ? 'text-slate-400' : 'text-slate-300'}`}>
                      {notification.message}
                    </p>

                    {/* Metadata */}
                    <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
                      <div className="flex items-center space-x-4">
                        <span>{notification.source}</span>
                        <span>{formatTimestamp(notification.timestamp)}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-3">
                      {notification.actionRequired && (
                        <button className="px-4 py-2 bg-cyan-600 text-white rounded-lg font-medium hover:bg-cyan-700 transition-colors">
                          Take Action
                        </button>
                      )}
                      <button className="px-4 py-2 bg-slate-700 text-slate-300 rounded-lg font-medium hover:bg-slate-600 transition-colors">
                        View Details
                      </button>
                      {!notification.read && (
                        <button className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Mark Read
                        </button>
                      )}
                      <button className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Dismiss
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Summary */}
      <div className="text-center text-sm text-slate-400">
        Showing {filteredNotifications.length} of {webNotifications.length} notifications
      </div>
    </div>
  );
}
