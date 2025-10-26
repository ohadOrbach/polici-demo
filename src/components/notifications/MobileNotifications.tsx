'use client';

import { useState } from 'react';
import { 
  Bell, 
  AlertTriangle, 
  CheckCircle, 
  X, 
  Clock, 
  Ship, 
  Shield, 
  FileText,
  Settings,
  Filter,
  Search
} from 'lucide-react';

interface MobileNotification {
  id: string;
  title: string;
  message: string;
  type: 'safety' | 'mission' | 'compliance' | 'system';
  priority: 'critical' | 'high' | 'medium' | 'low';
  timestamp: string;
  read: boolean;
  actionRequired?: boolean;
}

const mobileNotifications: MobileNotification[] = [
  {
    id: 'mobile-001',
    title: 'Emergency Drill Required',
    message: 'Safety drill must be completed within 24 hours',
    type: 'safety',
    priority: 'critical',
    timestamp: '2025-09-17T11:30:00Z',
    read: false,
    actionRequired: true
  },
  {
    id: 'mobile-002',
    title: 'New Mission Assigned',
    message: 'Navigation equipment check - Due: Today 16:00',
    type: 'mission',
    priority: 'high',
    timestamp: '2025-09-17T10:15:00Z',
    read: false,
    actionRequired: true
  },
  {
    id: 'mobile-003',
    title: 'Weather Warning',
    message: 'Severe weather approaching your location',
    type: 'safety',
    priority: 'high',
    timestamp: '2025-09-17T09:45:00Z',
    read: false,
    actionRequired: true
  },
  {
    id: 'mobile-004',
    title: 'Mission Completed',
    message: 'Engine inspection completed successfully',
    type: 'mission',
    priority: 'medium',
    timestamp: '2025-09-17T08:20:00Z',
    read: true
  },
  {
    id: 'mobile-005',
    title: 'System Update',
    message: 'App updated to version 2.1.0',
    type: 'system',
    priority: 'low',
    timestamp: '2025-09-17T07:30:00Z',
    read: true
  }
];

const getNotificationIcon = (type: string) => {
  switch (type) {
    case 'safety': return AlertTriangle;
    case 'mission': return FileText;
    case 'compliance': return Shield;
    case 'system': return Settings;
    default: return Bell;
  }
};

const getNotificationColor = (type: string, priority: string) => {
  if (priority === 'critical') return 'border-l-red-500 bg-red-900/10';
  
  switch (type) {
    case 'safety': return 'border-l-orange-500 bg-orange-900/10';
    case 'mission': return 'border-l-cyan-500 bg-cyan-900/10';
    case 'compliance': return 'border-l-purple-500 bg-purple-900/10';
    case 'system': return 'border-l-blue-500 bg-blue-900/10';
    default: return 'border-l-slate-500 bg-slate-800/10';
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'critical': return 'text-red-400';
    case 'high': return 'text-orange-400';
    case 'medium': return 'text-yellow-400';
    case 'low': return 'text-green-400';
    default: return 'text-slate-400';
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

export default function MobileNotifications() {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredNotifications = mobileNotifications.filter(notification => {
    const matchesFilter = filter === 'all' || notification.type === filter;
    const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const unreadCount = mobileNotifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-slate-900 p-4">
      {/* Status Bar Simulation */}
      <div className="bg-black/20 h-6 flex items-center justify-between px-4 text-white text-xs mb-4 -mx-4 -mt-4">
        <span>9:41</span>
        <div className="flex items-center space-x-1">
          <div className="w-4 h-2 border border-white rounded-sm">
            <div className="w-3 h-1 bg-white rounded-sm m-0.5"></div>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-cyan-600 rounded-xl">
              <Bell className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Notifications</h1>
              <p className="text-slate-400 text-sm">{unreadCount} unread alerts</p>
            </div>
          </div>
          
          <button className="p-2 bg-slate-800 text-slate-300 rounded-lg">
            <Settings className="h-5 w-5" />
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search notifications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {['all', 'safety', 'mission', 'compliance', 'system'].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                filter === type
                  ? 'bg-cyan-600 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {type === 'all' ? 'All' : type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Notification List */}
      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-12">
            <Bell className="h-16 w-16 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400">No notifications found</p>
          </div>
        ) : (
          filteredNotifications.map((notification) => {
            const NotificationIcon = getNotificationIcon(notification.type);
            
            return (
              <div
                key={notification.id}
                className={`p-4 rounded-2xl border-l-4 ${getNotificationColor(notification.type, notification.priority)} ${
                  !notification.read ? 'bg-slate-800/50' : 'bg-slate-800/30'
                }`}
              >
                <div className="flex items-start space-x-3">
                  {/* Icon */}
                  <div className={`p-2 rounded-lg ${getPriorityColor(notification.priority)}`}>
                    <NotificationIcon className="h-5 w-5" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className={`text-sm font-semibold ${notification.read ? 'text-slate-300' : 'text-white'}`}>
                        {notification.title}
                      </h3>
                      <div className="flex items-center space-x-2 ml-2">
                        {notification.actionRequired && (
                          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                        )}
                        {!notification.read && (
                          <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                        )}
                      </div>
                    </div>

                    <p className={`text-sm mb-3 ${notification.read ? 'text-slate-400' : 'text-slate-300'}`}>
                      {notification.message}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500">
                        {formatTimestamp(notification.timestamp)}
                      </span>
                      
                      <div className="flex space-x-2">
                        {notification.actionRequired && (
                          <button className="px-3 py-1 bg-cyan-600 text-white rounded-lg text-xs font-medium hover:bg-cyan-700 transition-colors">
                            Action Required
                          </button>
                        )}
                        {!notification.read && (
                          <button className="px-3 py-1 bg-slate-700 text-slate-300 rounded-lg text-xs font-medium hover:bg-slate-600 transition-colors">
                            Mark Read
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Dismiss */}
                  <button className="p-1 text-slate-400 hover:text-slate-300 transition-colors">
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Quick Actions */}
      <div className="mt-8 p-4 bg-slate-800/50 rounded-2xl border border-slate-700">
        <h3 className="text-sm font-semibold text-white mb-3">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-3">
          <button className="p-3 bg-slate-700 hover:bg-slate-600 rounded-xl transition-colors flex flex-col items-center text-center">
            <CheckCircle className="h-5 w-5 text-green-400 mb-1" />
            <span className="text-xs font-medium text-white">Mark All Read</span>
          </button>
          
          <button className="p-3 bg-slate-700 hover:bg-slate-600 rounded-xl transition-colors flex flex-col items-center text-center">
            <Settings className="h-5 w-5 text-slate-400 mb-1" />
            <span className="text-xs font-medium text-white">Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
}
