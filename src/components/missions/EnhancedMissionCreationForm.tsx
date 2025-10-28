'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  GripVertical, 
  Edit, 
  Trash2, 
  Plus, 
  X, 
  Save,
  Camera,
  Video,
  Paperclip,
  Edit3,
  CheckSquare
} from 'lucide-react';
import { useMissions } from '@/contexts/MissionsContext';
import { Mission } from '@/data/mockData';

interface MissionItem {
  id: string;
  title: string;
  description?: string;
  type: 'checkbox' | 'photo' | 'video' | 'file' | 'signature';
  required: boolean;
  completed?: boolean;
}

export default function EnhancedMissionCreationForm() {
  const { addMission } = useMissions();
  const router = useRouter();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [vessel, setVessel] = useState('');
  const [dueDate, setDueDate] = useState('');

  const [missionItems, setMissionItems] = useState<MissionItem[]>([
    { id: '1', title: 'Pre-departure safety checks', type: 'checkbox', required: true, description: 'Complete all pre-departure safety procedures' },
    { id: '2', title: 'Safety drill documentation', type: 'photo', required: true, description: 'Take photos of crew at muster stations' },
    { id: '3', title: 'Engine inspection video', type: 'video', required: false, description: 'Record walkthrough of engine room inspection' },
    { id: '4', title: 'Maintenance report upload', type: 'file', required: true, description: 'Upload completed maintenance documentation' },
    { id: '5', title: 'Captain sign-off', type: 'signature', required: true, description: 'Digital signature confirming completion' },
  ]);

  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newItem, setNewItem] = useState<Partial<MissionItem>>({
    title: '',
    description: '',
    type: 'checkbox',
    required: false
  });

  const handlePublish = () => {
    if (!title || !vessel || !dueDate) {
      alert('Please fill out all mission fields.');
      return;
    }

    const newMission: Omit<Mission, 'id' | 'createdAt' | 'updatedAt'> = {
      title,
      description,
      vessel,
      dueDate,
      status: 'pending',
      priority: 'medium', // Default priority
      progress: 0,
      offline: false, // Default offline status
      type: 'maintenance', // Default type
      estimatedDuration: '1h 30m', // Default duration
      assignedBy: { name: 'Fleet Manager', role: 'Fleet Manager' },
      assignedTo: { name: 'Ship Captain', role: 'Ship Captain' },
      taskNotes: '',
      checkboxes: missionItems.map(item => ({...item, checked: false}))
    };
    
    // The context will handle adding id, createdAt, etc.
    addMission(newMission as Mission);

    // Redirect to dashboard after publishing
    router.push('/dashboard');
  };

  const addMissionItem = () => {
    if (!newItem.title?.trim()) return;
    
    const item: MissionItem = {
      id: Date.now().toString(),
      title: newItem.title,
      description: newItem.description || '',
      type: newItem.type || 'checkbox',
      required: newItem.required || false,
    };
    
    setMissionItems([...missionItems, item]);
    setNewItem({ title: '', description: '', type: 'checkbox', required: false });
    setShowAddModal(false);
  };

  const removeItem = (id: string) => {
    setMissionItems(missionItems.filter(item => item.id !== id));
  };

  const startEditing = (item: MissionItem) => {
    setEditingItem(item.id);
    setEditTitle(item.title);
    setEditDescription(item.description || '');
  };

  const saveEdit = (id: string) => {
    setMissionItems(missionItems.map(item => 
      item.id === id 
        ? { ...item, title: editTitle, description: editDescription }
        : item
    ));
    setEditingItem(null);
    setEditTitle('');
    setEditDescription('');
  };

  const cancelEdit = () => {
    setEditingItem(null);
    setEditTitle('');
    setEditDescription('');
  };

  const toggleRequired = (id: string) => {
    setMissionItems(missionItems.map(item => 
      item.id === id ? { ...item, required: !item.required } : item
    ));
  };

  const changeItemType = (id: string, type: MissionItem['type']) => {
    setMissionItems(missionItems.map(item => 
      item.id === id ? { ...item, type } : item
    ));
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'photo': return Camera;
      case 'video': return Video;
      case 'file': return Paperclip;
      case 'signature': return Edit3;
      default: return CheckSquare;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'photo': return 'text-cyan-400 bg-cyan-900/30 border-cyan-500/30';
      case 'video': return 'text-red-400 bg-red-900/30 border-red-500/30';
      case 'file': return 'text-purple-400 bg-purple-900/30 border-purple-500/30';
      case 'signature': return 'text-orange-400 bg-orange-900/30 border-orange-500/30';
      default: return 'text-green-400 bg-green-900/30 border-green-500/30';
    }
  };

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
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none"
        />
      </div>

      {/* Vessel and Due Date */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Vessel
          </label>
          <select 
            value={vessel}
            onChange={(e) => setVessel(e.target.value)}
            className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
          >
            <option>Select a vessel</option>
            <option>MV Northern Star</option>
            <option>MV Ocean Explorer</option>
            <option>MV Atlantic Voyager</option>
            <option>MV Pacific Dream</option>
            <option>MV Caribbean Queen</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Due date
          </label>
          <input
            type="datetime-local"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Mission Items */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Mission Checklist</h3>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Add Item</span>
          </button>
        </div>

        <div className="space-y-3">
          {missionItems.map((item) => {
            const TypeIcon = getTypeIcon(item.type);
            const isEditing = editingItem === item.id;
            
            return (
              <div key={item.id} className="p-4 bg-slate-800 rounded-lg border border-slate-600">
                {isEditing ? (
                  // Edit Mode
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Item Title
                      </label>
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-700 border border-slate-500 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Description (Optional)
                      </label>
                      <textarea
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                        rows={2}
                        className="w-full px-3 py-2 bg-slate-700 border border-slate-500 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() => saveEdit(item.id)}
                          className="flex items-center space-x-1 px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        >
                          <Save className="h-3 w-3" />
                          <span className="text-sm">Save</span>
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="flex items-center space-x-1 px-3 py-1 bg-slate-600 text-slate-300 rounded-lg hover:bg-slate-500 transition-colors"
                        >
                          <X className="h-3 w-3" />
                          <span className="text-sm">Cancel</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Display Mode
                  <div className="flex items-start space-x-3">
                    <button className="text-slate-400 hover:text-slate-300 mt-1">
                      <GripVertical className="h-5 w-5" />
                    </button>
                    
                    <div className="flex-1 space-y-3">
                      {/* Item Header */}
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <div className={`p-2 rounded-lg border ${getTypeColor(item.type)}`}>
                            <TypeIcon className="h-4 w-4" />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-white font-medium">{item.title}</h4>
                            {item.description && (
                              <p className="text-sm text-slate-400 mt-1">{item.description}</p>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => startEditing(item)}
                            className="p-1 text-slate-400 hover:text-cyan-400 transition-colors"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => removeItem(item.id)}
                            className="p-1 text-slate-400 hover:text-red-400 transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      {/* Item Settings */}
                      <div className="flex items-center justify-between bg-slate-700/50 p-3 rounded-lg">
                        <div className="flex items-center space-x-4">
                          {/* Required Toggle */}
                          <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={item.required}
                              onChange={() => toggleRequired(item.id)}
                              className="w-4 h-4 text-orange-600 bg-slate-700 border-slate-500 rounded focus:ring-orange-500"
                            />
                            <span className={`text-sm font-medium ${item.required ? 'text-orange-400' : 'text-slate-400'}`}>
                              Required
                            </span>
                          </label>

                          {/* Type Selector */}
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-slate-400">Type:</span>
                            <select
                              value={item.type}
                              onChange={(e) => changeItemType(item.id, e.target.value as MissionItem['type'])}
                              className="px-2 py-1 bg-slate-600 border border-slate-500 rounded text-white text-sm focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                            >
                              <option value="checkbox">Checkbox</option>
                              <option value="photo">Photo</option>
                              <option value="video">Video</option>
                              <option value="file">File</option>
                              <option value="signature">Signature</option>
                            </select>
                          </div>
                        </div>

                        {/* Type Badge */}
                        <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getTypeColor(item.type)}`}>
                          {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
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
          <button 
            onClick={handlePublish}
            className="px-6 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 font-medium transition-colors"
          >
            Publish Mission
          </button>
        </div>
      </div>

      {/* Add Item Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">Add Checklist Item</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 text-slate-400 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Item Title *
                </label>
                <input
                  type="text"
                  value={newItem.title || ''}
                  onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                  placeholder="Enter item title"
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-500 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Description (Optional)
                </label>
                <textarea
                  value={newItem.description || ''}
                  onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                  placeholder="Enter item description"
                  rows={2}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-500 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Item Type
                </label>
                <select
                  value={newItem.type || 'checkbox'}
                  onChange={(e) => setNewItem({ ...newItem, type: e.target.value as MissionItem['type'] })}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-500 rounded-lg text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                >
                  <option value="checkbox">Checkbox - Simple yes/no task</option>
                  <option value="photo">Photo - Requires photo upload</option>
                  <option value="video">Video - Requires video recording</option>
                  <option value="file">File - Requires file attachment</option>
                  <option value="signature">Signature - Requires digital signature</option>
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="required"
                  checked={newItem.required || false}
                  onChange={(e) => setNewItem({ ...newItem, required: e.target.checked })}
                  className="w-4 h-4 text-orange-600 bg-slate-700 border-slate-500 rounded focus:ring-orange-500"
                />
                <label htmlFor="required" className="text-sm font-medium text-slate-300 cursor-pointer">
                  Mark as required item
                </label>
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 py-2 bg-slate-600 text-slate-300 rounded-lg hover:bg-slate-500 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={addMissionItem}
                disabled={!newItem.title?.trim()}
                className="flex-1 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors"
              >
                Add Item
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
