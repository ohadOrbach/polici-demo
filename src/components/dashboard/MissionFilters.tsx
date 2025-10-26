'use client';

import { useState } from 'react';
import { Filter, Search, Calendar, Ship, User } from 'lucide-react';

const statusFilters = [
  { id: 'all', label: 'All Missions', count: 156, color: 'bg-slate-700 text-slate-300' },
  { id: 'draft', label: 'Draft', count: 23, color: 'bg-slate-700 text-slate-300' },
  { id: 'published', label: 'Published', count: 45, color: 'bg-cyan-900/30 text-cyan-400' },
  { id: 'in-progress', label: 'In Progress', count: 67, color: 'bg-yellow-900/30 text-yellow-400' },
  { id: 'completed', label: 'Completed', count: 43, color: 'bg-green-900/30 text-green-400' },
  { id: 'overdue', label: 'Overdue', count: 7, color: 'bg-red-900/30 text-red-400' }
];

const fleetFilters = [
  { id: 'all-fleets', label: 'All Fleets' },
  { id: 'cargo', label: 'Cargo Fleet' },
  { id: 'passenger', label: 'Passenger Fleet' },
  { id: 'tanker', label: 'Tanker Fleet' },
  { id: 'offshore', label: 'Offshore Fleet' }
];

export default function MissionFilters() {
  const [activeStatus, setActiveStatus] = useState('all');
  const [activeFleet, setActiveFleet] = useState('all-fleets');
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-700 p-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-white flex items-center">
          <div className="w-10 h-10 bg-gradient-to-r from-cyan-600 to-cyan-700 rounded-xl flex items-center justify-center mr-3 shadow-lg">
            <Filter className="h-5 w-5 text-white" />
          </div>
          Mission Filters
        </h2>
        <button className="px-4 py-2 text-sm text-cyan-400 hover:text-cyan-300 font-semibold bg-slate-700 hover:bg-slate-600 rounded-xl transition-colors">
          Clear All Filters
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative">
          <Search className="h-5 w-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search missions, ships, or crew..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 text-lg border border-slate-600 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent bg-slate-700 hover:bg-slate-600 transition-colors text-white placeholder-slate-400"
          />
        </div>
      </div>

      {/* Status Filters */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-slate-300 mb-3">Mission Status</h3>
        <div className="flex flex-wrap gap-2">
          {statusFilters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveStatus(filter.id)}
              className={`inline-flex items-center px-3 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                activeStatus === filter.id
                  ? 'bg-cyan-600 text-white'
                  : `${filter.color} hover:bg-opacity-80`
              }`}
            >
              {filter.label}
              <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                activeStatus === filter.id
                  ? 'bg-cyan-500 text-white'
                  : 'bg-slate-600 text-slate-300'
              }`}>
                {filter.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Additional Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Fleet Filter */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            <Ship className="h-4 w-4 inline mr-1" />
            Fleet
          </label>
          <select
            value={activeFleet}
            onChange={(e) => setActiveFleet(e.target.value)}
            className="w-full px-3 py-2 border border-slate-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent bg-slate-700 text-white"
          >
            {fleetFilters.map((fleet) => (
              <option key={fleet.id} value={fleet.id}>
                {fleet.label}
              </option>
            ))}
          </select>
        </div>

        {/* Date Range */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            <Calendar className="h-4 w-4 inline mr-1" />
            Date Range
          </label>
          <select className="w-full px-3 py-2 border border-slate-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent bg-slate-700 text-white">
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
          </select>
        </div>

        {/* Assigned To */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            <User className="h-4 w-4 inline mr-1" />
            Assigned To
          </label>
          <select className="w-full px-3 py-2 border border-slate-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent bg-slate-700 text-white">
            <option value="all">All Captains</option>
            <option value="capt-smith">Capt. Smith</option>
            <option value="capt-jones">Capt. Jones</option>
            <option value="capt-wilson">Capt. Wilson</option>
            <option value="unassigned">Unassigned</option>
          </select>
        </div>
      </div>
    </div>
  );
}
