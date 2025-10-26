// Dashboard-specific mock data for web interface
import { Mission } from './mockData';

export interface DashboardStats {
  totalMissions: number;
  activeMissions: number;
  completedMissions: number;
  overdueMissions: number;
  totalVessels: number;
  activeVessels: number;
  complianceScore: number;
  criticalAlerts: number;
}

export interface FleetStatus {
  vesselId: string;
  vesselName: string;
  status: 'at_sea' | 'in_port' | 'maintenance';
  location: string;
  activeMissions: number;
  overdueMissions: number;
  complianceScore: number;
  lastUpdate: string;
  captain: string;
  nextPort: string;
  eta: string;
}

export interface ComplianceAlert {
  id: string;
  type: 'overdue' | 'critical' | 'warning' | 'info';
  title: string;
  description: string;
  vessel: string;
  priority: 'high' | 'medium' | 'low';
  timestamp: string;
  resolved: boolean;
}

export interface MissionSummary {
  missionId: string;
  title: string;
  vessel: string;
  assignee: string;
  status: 'pending' | 'in-progress' | 'completed' | 'overdue';
  priority: 'high' | 'medium' | 'low';
  dueDate: string;
  progress: number;
  requiredItems: number;
  completedItems: number;
}

// Mock Dashboard Statistics
export const mockDashboardStats: DashboardStats = {
  totalMissions: 24,
  activeMissions: 8,
  completedMissions: 14,
  overdueMissions: 2,
  totalVessels: 6,
  activeVessels: 4,
  complianceScore: 87,
  criticalAlerts: 3
};

// Mock Fleet Status
export const mockFleetStatus: FleetStatus[] = [
  {
    vesselId: 'vessel_001',
    vesselName: 'MV Northern Star',
    status: 'in_port',
    location: 'Port of Rotterdam, Netherlands',
    activeMissions: 3,
    overdueMissions: 0,
    complianceScore: 92,
    lastUpdate: '2025-09-24T15:30:00Z',
    captain: 'Captain James Smith',
    nextPort: 'Port of Hamburg',
    eta: '2025-09-26T08:00:00Z'
  },
  {
    vesselId: 'vessel_002',
    vesselName: 'MV Ocean Explorer',
    status: 'at_sea',
    location: 'Atlantic Ocean (42.3601° N, 71.0589° W)',
    activeMissions: 2,
    overdueMissions: 0,
    complianceScore: 89,
    lastUpdate: '2025-09-24T14:45:00Z',
    captain: 'Captain Maria Rodriguez',
    nextPort: 'Port of New York',
    eta: '2025-09-25T12:00:00Z'
  },
  {
    vesselId: 'vessel_003',
    vesselName: 'MV Atlantic Voyager',
    status: 'at_sea',
    location: 'Gulf of Mexico (29.7604° N, 95.3698° W)',
    activeMissions: 1,
    overdueMissions: 1,
    complianceScore: 78,
    lastUpdate: '2025-09-24T16:20:00Z',
    captain: 'Captain David Thompson',
    nextPort: 'Port of Houston',
    eta: '2025-09-25T06:00:00Z'
  },
  {
    vesselId: 'vessel_004',
    vesselName: 'MV Pacific Dream',
    status: 'maintenance',
    location: 'Singapore Shipyard',
    activeMissions: 0,
    overdueMissions: 0,
    complianceScore: 95,
    lastUpdate: '2025-09-24T10:15:00Z',
    captain: 'Captain Lisa Chen',
    nextPort: 'Port of Singapore',
    eta: '2025-09-28T14:00:00Z'
  },
  {
    vesselId: 'vessel_005',
    vesselName: 'MV Caribbean Queen',
    status: 'in_port',
    location: 'Port of Miami, USA',
    activeMissions: 2,
    overdueMissions: 1,
    complianceScore: 84,
    lastUpdate: '2025-09-24T13:00:00Z',
    captain: 'Captain Robert Martinez',
    nextPort: 'Port of Kingston',
    eta: '2025-09-26T16:00:00Z'
  },
  {
    vesselId: 'vessel_006',
    vesselName: 'MV Nordic Wind',
    status: 'at_sea',
    location: 'North Sea (56.0° N, 3.0° E)',
    activeMissions: 0,
    overdueMissions: 0,
    complianceScore: 91,
    lastUpdate: '2025-09-24T17:00:00Z',
    captain: 'Captain Erik Olsen',
    nextPort: 'Port of Oslo',
    eta: '2025-09-25T20:00:00Z'
  }
];

// Mock Compliance Alerts
export const mockComplianceAlerts: ComplianceAlert[] = [
  {
    id: 'alert_001',
    type: 'overdue',
    title: 'Security Drill Overdue',
    description: 'Weekly security drill on MV Atlantic Voyager is 2 days overdue',
    vessel: 'MV Atlantic Voyager',
    priority: 'high',
    timestamp: '2025-09-24T16:30:00Z',
    resolved: false
  },
  {
    id: 'alert_002',
    type: 'critical',
    title: 'Certificate Expiring Soon',
    description: 'Safety Management Certificate expires in 7 days for MV Caribbean Queen',
    vessel: 'MV Caribbean Queen',
    priority: 'high',
    timestamp: '2025-09-24T09:15:00Z',
    resolved: false
  },
  {
    id: 'alert_003',
    type: 'warning',
    title: 'Training Completion Required',
    description: '3 crew members have not completed mandatory safety training',
    vessel: 'MV Northern Star',
    priority: 'medium',
    timestamp: '2025-09-24T11:45:00Z',
    resolved: false
  },
  {
    id: 'alert_004',
    type: 'info',
    title: 'Port State Control Inspection',
    description: 'PSC inspection scheduled for MV Ocean Explorer on arrival',
    vessel: 'MV Ocean Explorer',
    priority: 'medium',
    timestamp: '2025-09-23T14:20:00Z',
    resolved: false
  },
  {
    id: 'alert_005',
    type: 'warning',
    title: 'Equipment Calibration Due',
    description: 'Navigation equipment calibration due within 5 days',
    vessel: 'MV Nordic Wind',
    priority: 'medium',
    timestamp: '2025-09-24T08:30:00Z',
    resolved: false
  }
];

// Mock Mission Summary for Dashboard
export const mockMissionSummary: MissionSummary[] = [
  {
    missionId: 'mission_001',
    title: 'Emergency Safety Drill Compliance',
    vessel: 'MV Northern Star',
    assignee: 'Captain James Smith',
    status: 'in-progress',
    priority: 'high',
    dueDate: '2025-09-25T15:30:00Z',
    progress: 60,
    requiredItems: 6,
    completedItems: 3
  },
  {
    missionId: 'mission_002',
    title: 'Navigation Equipment Calibration',
    vessel: 'MV Northern Star',
    assignee: 'Captain James Smith',
    status: 'pending',
    priority: 'medium',
    dueDate: '2025-09-26T16:00:00Z',
    progress: 0,
    requiredItems: 4,
    completedItems: 0
  },
  {
    missionId: 'mission_003',
    title: 'Engine Room Daily Inspection',
    vessel: 'MV Northern Star',
    assignee: 'Chief Engineer Davis',
    status: 'completed',
    priority: 'medium',
    dueDate: '2025-09-24T13:00:00Z',
    progress: 100,
    requiredItems: 6,
    completedItems: 6
  },
  {
    missionId: 'mission_004',
    title: 'Mandatory Safety Training',
    vessel: 'MV Northern Star',
    assignee: 'Captain James Smith',
    status: 'pending',
    priority: 'low',
    dueDate: '2025-09-27T18:00:00Z',
    progress: 0,
    requiredItems: 3,
    completedItems: 0
  },
  {
    missionId: 'mission_005',
    title: 'Port State Control Preparation',
    vessel: 'MV Ocean Explorer',
    assignee: 'Captain Maria Rodriguez',
    status: 'pending',
    priority: 'high',
    dueDate: '2025-09-28T12:00:00Z',
    progress: 0,
    requiredItems: 7,
    completedItems: 0
  },
  {
    missionId: 'mission_006',
    title: 'Weekly Security Drill',
    vessel: 'MV Atlantic Voyager',
    assignee: 'Captain David Thompson',
    status: 'overdue',
    priority: 'medium',
    dueDate: '2025-09-25T10:00:00Z',
    progress: 0,
    requiredItems: 5,
    completedItems: 0
  }
];

// Utility functions for dashboard data
export const dashboardUtils = {
  // Calculate compliance score based on mission completion
  calculateComplianceScore: (missions: Mission[]): number => {
    if (missions.length === 0) return 100;
    
    const completed = missions.filter(m => m.status === 'completed').length;
    const overdue = missions.filter(m => m.status === 'overdue').length;
    
    const baseScore = (completed / missions.length) * 100;
    const overdueDeduction = overdue * 10; // 10 points deduction per overdue mission
    
    return Math.max(0, Math.min(100, baseScore - overdueDeduction));
  },

  // Get missions by status
  getMissionsByStatus: (missions: Mission[], status: string): Mission[] => {
    return missions.filter(m => m.status === status);
  },

  // Get high priority missions
  getHighPriorityMissions: (missions: Mission[]): Mission[] => {
    return missions.filter(m => m.priority === 'high');
  },

  // Get overdue missions
  getOverdueMissions: (missions: Mission[]): Mission[] => {
    return missions.filter(m => m.status === 'overdue');
  },

  // Calculate average completion time
  calculateAverageCompletionTime: (missions: Mission[]): number => {
    const completedMissions = missions.filter(m => m.completedAt && m.startedAt);
    
    if (completedMissions.length === 0) return 0;
    
    const totalTime = completedMissions.reduce((sum, mission) => {
      const start = new Date(mission.startedAt!).getTime();
      const end = new Date(mission.completedAt!).getTime();
      return sum + (end - start);
    }, 0);
    
    return totalTime / completedMissions.length / (1000 * 60); // Return in minutes
  },

  // Get upcoming deadlines
  getUpcomingDeadlines: (missions: Mission[], days: number = 7): Mission[] => {
    const now = new Date();
    const futureDate = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);
    
    return missions.filter(mission => {
      const dueDate = new Date(mission.dueDate);
      return dueDate >= now && dueDate <= futureDate && mission.status !== 'completed';
    });
  }
};

const dashboardData = {
  stats: mockDashboardStats,
  fleetStatus: mockFleetStatus,
  alerts: mockComplianceAlerts,
  missionSummary: mockMissionSummary,
  utils: dashboardUtils
};

export default dashboardData;
