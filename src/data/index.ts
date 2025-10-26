// Centralized export for all mock data and API functions
export * from './mockData';
export * from './dashboardData';
export { default as mockData } from './mockData';
export { default as dashboardData } from './dashboardData';

// Re-export commonly used types
export type {
  User,
  Mission,
  TaskCheckbox,
  TaskNote,
  DashboardStats,
  FleetStatus,
  ComplianceAlert,
  MissionSummary
} from './mockData';

// Re-export API functions
export { mockAPI } from './mockData';
export { dashboardUtils } from './dashboardData';
