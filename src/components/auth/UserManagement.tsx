'use client';

import { useState } from 'react';
import { 
  Users, 
  Plus, 
  Edit3, 
  Trash2, 
  Shield, 
  Ship, 
  BarChart3, 
  Search, 
  Filter, 
  MoreVertical,
  CheckCircle,
  XCircle,
  Clock,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Key,
  AlertTriangle
} from 'lucide-react';

interface User {
  id: string;
  username: string;
  email: string;
  fullName: string;
  role: 'captain' | 'shore_manager' | 'admin';
  status: 'active' | 'inactive' | 'pending';
  lastLogin: string;
  vessel?: string;
  location: string;
  phone: string;
  joinDate: string;
  permissions: string[];
}

const users: User[] = [
  {
    id: 'user-001',
    username: 'capt.anderson',
    email: 'anderson@northernstar.com',
    fullName: 'Captain James Anderson',
    role: 'captain',
    status: 'active',
    lastLogin: '2025-09-17T10:30:00Z',
    vessel: 'MV Northern Star',
    location: 'Baltic Sea',
    phone: '+46 70 123 4567',
    joinDate: '2023-03-15',
    permissions: ['mission_execution', 'crew_management', 'safety_reporting', 'navigation_control']
  },
  {
    id: 'user-002',
    username: 'capt.rodriguez',
    email: 'rodriguez@atlanticpioneer.com',
    fullName: 'Captain Maria Rodriguez',
    role: 'captain',
    status: 'active',
    lastLogin: '2025-09-17T09:15:00Z',
    vessel: 'MV Atlantic Pioneer',
    location: 'English Channel',
    phone: '+44 20 7946 0958',
    joinDate: '2022-11-08',
    permissions: ['mission_execution', 'crew_management', 'safety_reporting', 'navigation_control']
  },
  {
    id: 'user-003',
    username: 'manager.smith',
    email: 'smith@fleetops.com',
    fullName: 'David Smith',
    role: 'shore_manager',
    status: 'active',
    lastLogin: '2025-09-17T11:45:00Z',
    location: 'London, UK',
    phone: '+44 20 7123 4567',
    joinDate: '2021-06-20',
    permissions: ['fleet_management', 'mission_assignment', 'compliance_monitoring', 'analytics_access']
  },
  {
    id: 'user-004',
    username: 'admin.johnson',
    email: 'johnson@captainseye.com',
    fullName: 'Sarah Johnson',
    role: 'admin',
    status: 'active',
    lastLogin: '2025-09-17T08:20:00Z',
    location: 'New York, USA',
    phone: '+1 555 123 4567',
    joinDate: '2020-01-10',
    permissions: ['user_management', 'system_configuration', 'audit_access', 'full_permissions']
  },
  {
    id: 'user-005',
    username: 'capt.chen',
    email: 'chen@pacificexplorer.com',
    fullName: 'Captain Li Chen',
    role: 'captain',
    status: 'inactive',
    lastLogin: '2025-09-15T16:30:00Z',
    vessel: 'MV Pacific Explorer',
    location: 'San Francisco Bay',
    phone: '+1 415 555 0123',
    joinDate: '2023-08-12',
    permissions: ['mission_execution', 'crew_management', 'safety_reporting']
  }
];

const getRoleIcon = (role: string) => {
  switch (role) {
    case 'captain': return Ship;
    case 'shore_manager': return BarChart3;
    case 'admin': return Shield;
    default: return Users;
  }
};

const getRoleColor = (role: string) => {
  switch (role) {
    case 'captain': return 'text-cyan-400 bg-cyan-900/30';
    case 'shore_manager': return 'text-blue-400 bg-blue-900/30';
    case 'admin': return 'text-purple-400 bg-purple-900/30';
    default: return 'text-slate-400 bg-slate-800';
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active': return 'text-green-400 bg-green-900/30';
    case 'inactive': return 'text-red-400 bg-red-900/30';
    case 'pending': return 'text-yellow-400 bg-yellow-900/30';
    default: return 'text-slate-400 bg-slate-800';
  }
};

export default function UserManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [showAddUser, setShowAddUser] = useState(false);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.username.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const formatLastLogin = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-800/80 rounded-2xl p-6 border border-slate-700">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">User Management</h2>
            <p className="text-slate-400">Manage user accounts, roles, and permissions</p>
          </div>
          
          <button 
            onClick={() => setShowAddUser(true)}
            className="px-6 py-3 bg-cyan-600 text-white rounded-lg font-medium hover:bg-cyan-700 transition-colors flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New User
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-slate-800/80 rounded-2xl p-6 border border-slate-700">
        <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            />
          </div>

          {/* Role Filter */}
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
          >
            <option value="all">All Roles</option>
            <option value="captain">Captains</option>
            <option value="shore_manager">Shore Managers</option>
            <option value="admin">Administrators</option>
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>

      {/* User Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-800 rounded-2xl p-4 border border-slate-700">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-cyan-600 rounded-lg">
              <Users className="h-4 w-4 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{users.length}</div>
              <div className="text-sm text-slate-400">Total Users</div>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 rounded-2xl p-4 border border-slate-700">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-600 rounded-lg">
              <CheckCircle className="h-4 w-4 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-green-400">{users.filter(u => u.status === 'active').length}</div>
              <div className="text-sm text-slate-400">Active</div>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 rounded-2xl p-4 border border-slate-700">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-cyan-600 rounded-lg">
              <Ship className="h-4 w-4 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-cyan-400">{users.filter(u => u.role === 'captain').length}</div>
              <div className="text-sm text-slate-400">Captains</div>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 rounded-2xl p-4 border border-slate-700">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-600 rounded-lg">
              <Shield className="h-4 w-4 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-400">{users.filter(u => u.role === 'admin').length}</div>
              <div className="text-sm text-slate-400">Admins</div>
            </div>
          </div>
        </div>
      </div>

      {/* User List */}
      <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-700/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">User</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Role</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Last Login</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Location</th>
                <th className="px-6 py-4 text-right text-xs font-medium text-slate-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {filteredUsers.map((user) => {
                const RoleIcon = getRoleIcon(user.role);
                
                return (
                  <tr key={user.id} className="hover:bg-slate-700/30 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-cyan-600 to-cyan-700 rounded-full flex items-center justify-center">
                          <span className="text-white font-medium text-sm">
                            {user.fullName.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-white">{user.fullName}</div>
                          <div className="text-sm text-slate-400">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                        <RoleIcon className="h-3 w-3 mr-1" />
                        {user.role.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                        {user.status === 'active' && <CheckCircle className="h-3 w-3 mr-1" />}
                        {user.status === 'inactive' && <XCircle className="h-3 w-3 mr-1" />}
                        {user.status === 'pending' && <Clock className="h-3 w-3 mr-1" />}
                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                      {formatLastLogin(user.lastLogin)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-slate-300">{user.location}</div>
                      {user.vessel && (
                        <div className="text-xs text-slate-500">{user.vessel}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button className="text-slate-400 hover:text-cyan-400 transition-colors">
                          <Edit3 className="h-4 w-4" />
                        </button>
                        <button className="text-slate-400 hover:text-red-400 transition-colors">
                          <Trash2 className="h-4 w-4" />
                        </button>
                        <button className="text-slate-400 hover:text-slate-300 transition-colors">
                          <MoreVertical className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Results Summary */}
      <div className="text-center text-sm text-slate-400">
        Showing {filteredUsers.length} of {users.length} users
      </div>
    </div>
  );
}
