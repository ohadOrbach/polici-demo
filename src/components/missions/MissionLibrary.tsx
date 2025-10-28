'use client';

import { Search, Filter, MoreVertical, Calendar, Users, Ship, Eye, Edit, Copy, Trash2 } from 'lucide-react';
import { useMissions } from '@/contexts/MissionsContext';

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active': return 'bg-blue-100 text-blue-800';
    case 'completed': return 'bg-green-100 text-green-800';
    case 'in-progress': return 'bg-yellow-100 text-yellow-800';
    case 'draft': return 'bg-gray-100 text-gray-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'critical': return 'bg-red-100 text-red-800';
    case 'high': return 'bg-orange-100 text-orange-800';
    case 'medium': return 'bg-yellow-100 text-yellow-800';
    case 'low': return 'bg-green-100 text-green-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export default function MissionLibrary() {
  const { missions } = useMissions();

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-h2 text-navy-800 mb-2 flex items-center">
              <Ship className="h-8 w-8 mr-3 text-ocean-600" />
              🗂️ Mission Library
            </h2>
            <p className="text-body text-ocean-700">Manage and track all deployed maritime missions across your fleet</p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="px-4 py-2 border border-ocean-300 text-ocean-700 rounded-xl font-semibold hover:bg-ocean-50 transition-all duration-300 flex items-center">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </button>
            <button className="px-4 py-2 border border-ocean-300 text-ocean-700 rounded-xl font-semibold hover:bg-ocean-50 transition-all duration-300">
              Export
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="flex-1 relative">
            <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-ocean-400" />
            <input
              type="text"
              placeholder="Search missions by title, vessel, or category..."
              className="w-full pl-10 pr-4 py-3 border border-ocean-300 rounded-xl focus:ring-2 focus:ring-ocean-500 focus:border-transparent bg-white/70 backdrop-blur-sm"
            />
          </div>
          <select className="px-4 py-3 border border-ocean-300 rounded-xl focus:ring-2 focus:ring-ocean-500 focus:border-transparent bg-white/70 backdrop-blur-sm">
            <option>All Statuses</option>
            <option>Active</option>
            <option>Completed</option>
            <option>In Progress</option>
            <option>Draft</option>
          </select>
          <select className="px-4 py-3 border border-ocean-300 rounded-xl focus:ring-2 focus:ring-ocean-500 focus:border-transparent bg-white/70 backdrop-blur-sm">
            <option>All Categories</option>
            <option>Safety</option>
            <option>Equipment</option>
            <option>Training</option>
            <option>Compliance</option>
          </select>
        </div>
      </div>

      {/* Mission Cards */}
      <div className="space-y-4">
        {missions.map((mission) => {
          const priorityColor = getPriorityColor(mission.priority);
          const statusColor = getStatusColor(mission.status);
          return (
            <div key={mission.id} className="maritime-card-gradient p-6 rounded-2xl shadow-lg border border-ocean-200/30 maritime-hover backdrop-blur-sm">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-3">
                    <span className="text-body-sm font-mono text-ocean-600 bg-ocean-100 px-3 py-1 rounded-lg">
                      {mission.id}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor}`}>
                      {mission.status.replace('-', ' ')}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${priorityColor}`}>
                      {mission.priority}
                    </span>
                  </div>

                  <h3 className="text-h3 text-navy-800 font-bold mb-2">{mission.title}</h3>
                  <p className="text-body text-ocean-700 mb-4">{mission.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center space-x-2">
                      <Ship className="h-4 w-4 text-ocean-600" />
                      <div>
                        <div className="text-body-sm font-semibold text-navy-700">Assigned Vessels</div>
                        <div className="text-xs text-ocean-600">{mission.vessel}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-ocean-600" />
                      <div>
                        <div className="text-body-sm font-semibold text-navy-700">Due Date</div>
                        <div className="text-xs text-ocean-600">{new Date(mission.dueDate).toLocaleDateString()}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-ocean-600" />
                      <div>
                        <div className="text-body-sm font-semibold text-navy-700">Completion</div>
                        <div className="text-xs text-ocean-600">{mission.progress}%</div>
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  {mission.status === 'in-progress' && (
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-xs text-navy-600 mb-1">
                        <span>Progress</span>
                        <span>{mission.progress}%</span>
                      </div>
                      <div className="w-full bg-ocean-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-ocean-500 to-ocean-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${mission.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <span className="px-3 py-1 bg-ocean-100 text-ocean-800 rounded-full text-xs font-semibold">
                        {mission.type}
                      </span>
                      <span className="text-xs text-navy-500">
                        Modified {new Date(mission.updatedAt).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-ocean-600 hover:bg-ocean-100 rounded-lg transition-colors" title="View Details">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-ocean-600 hover:bg-ocean-100 rounded-lg transition-colors" title="Edit Mission">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-ocean-600 hover:bg-ocean-100 rounded-lg transition-colors" title="Duplicate Mission">
                        <Copy className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors" title="Delete Mission">
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-ocean-600 hover:bg-ocean-100 rounded-lg transition-colors">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Load More */}
      <div className="text-center mt-8">
        <button className="px-6 py-3 bg-gradient-to-r from-ocean-600 to-ocean-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
          Load More Missions
        </button>
      </div>
    </div>
  );
}
