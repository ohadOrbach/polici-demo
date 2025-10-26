'use client';

import { useState } from 'react';
import { GripVertical, Check, Edit, Trash2, Plus } from 'lucide-react';

interface MissionItem {
  id: string;
  title: string;
  type: 'checklist' | 'video';
  required: boolean;
  completed?: boolean;
}

export default function MissionCreationForm() {
  const [missionItems, setMissionItems] = useState<MissionItem[]>([
    { id: '1', title: 'Pre-departure checks', type: 'checklist', required: true },
    { id: '2', title: 'Safety drill video', type: 'video', required: true },
    { id: '3', title: 'Engine inspection', type: 'checklist', required: false },
    { id: '4', title: 'Equipment overview', type: 'video', required: false },
    { id: '5', title: 'Safety briefing', type: 'checklist', required: true },
  ]);

  const addChecklistItem = () => {
    const newItem: MissionItem = {
      id: Date.now().toString(),
      title: 'New checklist item',
      type: 'checklist',
      required: false,
    };
    setMissionItems([...missionItems, newItem]);
  };

  const addVideoItem = () => {
    const newItem: MissionItem = {
      id: Date.now().toString(),
      title: 'New video item',
      type: 'video',
      required: false,
    };
    setMissionItems([...missionItems, newItem]);
  };

  const removeItem = (id: string) => {
    setMissionItems(missionItems.filter(item => item.id !== id));
  };

  // const updateItem = (id: string, title: string) => {
  //   setMissionItems(missionItems.map(item => 
  //     item.id === id ? { ...item, title } : item
  //   ));
  // };

  return (
    <div className="space-y-6">
      {/* Mission Title */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Mission title
        </label>
        <input
          type="text"
          placeholder="Enter mission title"
          className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Description
        </label>
        <textarea
          rows={4}
          placeholder="Enter mission description"
          className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none"
        />
      </div>

      {/* Vessel and Due Date */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Vessel
          </label>
          <select className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent">
            <option>Select a vessel</option>
            <option>MV Atlantic Star</option>
            <option>MV Pacific Queen</option>
            <option>MV Northern Wind</option>
            <option>MV Southern Cross</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Due date
          </label>
          <input
            type="text"
            placeholder="mm/dd/yyyy"
            className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Mission Items */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Mission Items</h3>
        <div className="space-y-3">
          {missionItems.map((item) => (
            <div key={item.id} className="flex items-center space-x-3 p-4 bg-slate-800 rounded-lg border border-slate-600">
              <button className="text-slate-400 hover:text-slate-300">
                <GripVertical className="h-5 w-5" />
              </button>
              
              <div className="flex items-center space-x-3">
                {item.type === 'checklist' ? (
                  <div className="w-5 h-5 border-2 border-cyan-500 rounded flex items-center justify-center bg-cyan-500">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                ) : (
                  <div className="w-5 h-5 border-2 border-cyan-500 rounded flex items-center justify-center">
                    <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                  </div>
                )}
                <span className="text-white font-medium">{item.title}</span>
                <span className="text-xs text-slate-400 px-2 py-1 bg-slate-700 rounded">
                  {item.required ? 'Required' : 'Optional'}
                </span>
              </div>
              
              <div className="flex-1"></div>
              
              <div className="flex items-center space-x-2">
                <button className="p-1 text-slate-400 hover:text-cyan-400">
                  <Edit className="h-4 w-4" />
                </button>
                <button 
                  onClick={() => removeItem(item.id)}
                  className="p-1 text-slate-400 hover:text-red-400"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Add Item Buttons */}
        <div className="flex space-x-4 mt-4">
          <button
            onClick={addChecklistItem}
            className="flex items-center space-x-2 px-4 py-2 bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Add Checklist Item</span>
          </button>
          <button
            onClick={addVideoItem}
            className="flex items-center space-x-2 px-4 py-2 bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Add Video Item</span>
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between pt-6">
        <button className="px-6 py-3 text-red-400 hover:text-red-300 font-medium transition-colors">
          Archive
        </button>
        <div className="flex space-x-4">
          <button className="px-6 py-3 bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600 font-medium transition-colors">
            Save Draft
          </button>
          <button className="px-6 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 font-medium transition-colors">
            Publish
          </button>
        </div>
      </div>
    </div>
  );
}
