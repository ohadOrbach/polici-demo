// Custom React hook for using mock API data
import { useState, useEffect } from 'react';
import { Mission, User, mockAPI } from '@/data/mockData';
import { DashboardStats, FleetStatus, ComplianceAlert, MissionSummary } from '@/data/dashboardData';
import dashboardData from '@/data/dashboardData';

// Generic hook for API calls with loading states
export function useAsyncData<T>(
  apiCall: () => Promise<T>,
  dependencies: any[] = []
): { data: T | null; loading: boolean; error: string | null; refresh: () => void } {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiCall();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, dependencies);

  return { data, loading, error, refresh: fetchData };
}

// Hook for fetching all missions
export function useMissions() {
  return useAsyncData(() => mockAPI.getMissions());
}

// Hook for fetching a specific mission
export function useMission(id: string) {
  return useAsyncData(() => mockAPI.getMission(id), [id]);
}

// Hook for fetching all users
export function useUsers() {
  return useAsyncData(() => mockAPI.getUsers());
}

// Hook for fetching a specific user
export function useUser(id: string) {
  return useAsyncData(() => mockAPI.getUser(id), [id]);
}

// Hook for dashboard statistics
export function useDashboardStats() {
  return useAsyncData<DashboardStats>(() => 
    new Promise(resolve => setTimeout(() => resolve(dashboardData.stats), 300))
  );
}

// Hook for fleet status
export function useFleetStatus() {
  return useAsyncData<FleetStatus[]>(() =>
    new Promise(resolve => setTimeout(() => resolve(dashboardData.fleetStatus), 400))
  );
}

// Hook for compliance alerts
export function useComplianceAlerts() {
  return useAsyncData<ComplianceAlert[]>(() =>
    new Promise(resolve => setTimeout(() => resolve(dashboardData.alerts), 250))
  );
}

// Hook for mission summary
export function useMissionSummary() {
  return useAsyncData<MissionSummary[]>(() =>
    new Promise(resolve => setTimeout(() => resolve(dashboardData.missionSummary), 350))
  );
}

// Hook for updating mission data
export function useMissionUpdater() {
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateMission = async (id: string, updates: Partial<Mission>): Promise<Mission | null> => {
    try {
      setUpdating(true);
      setError(null);
      const result = await mockAPI.updateMission(id, updates);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Update failed');
      return null;
    } finally {
      setUpdating(false);
    }
  };

  const completeMission = async (id: string): Promise<Mission | null> => {
    try {
      setUpdating(true);
      setError(null);
      const result = await mockAPI.completeMission(id);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Completion failed');
      return null;
    } finally {
      setUpdating(false);
    }
  };

  return { updateMission, completeMission, updating, error };
}

// Hook for filtering missions
export function useFilteredMissions(filter: string = 'all') {
  const { data: missions, loading, error, refresh } = useMissions();

  const filteredMissions = missions?.filter(mission => {
    switch (filter) {
      case 'pending': return mission.status === 'pending';
      case 'in-progress': return mission.status === 'in-progress';
      case 'completed': return mission.status === 'completed';
      case 'overdue': return mission.status === 'overdue';
      case 'high-priority': return mission.priority === 'high';
      default: return true;
    }
  }) || [];

  return { 
    missions: filteredMissions, 
    loading, 
    error, 
    refresh,
    totalCount: missions?.length || 0,
    filteredCount: filteredMissions.length
  };
}

// Hook for user-specific missions
export function useUserMissions(userId: string) {
  const { data: missions, loading, error, refresh } = useMissions();

  const userMissions = missions?.filter(mission => 
    mission.assignedTo.id === userId || mission.assignedBy.id === userId
  ) || [];

  return { missions: userMissions, loading, error, refresh };
}

// Hook for vessel-specific missions
export function useVesselMissions(vesselName: string) {
  const { data: missions, loading, error, refresh } = useMissions();

  const vesselMissions = missions?.filter(mission => 
    mission.vessel === vesselName
  ) || [];

  return { missions: vesselMissions, loading, error, refresh };
}

// Hook for real-time mission updates (simulated)
export function useRealTimeMissions(intervalMs: number = 30000) {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  useEffect(() => {
    const fetchMissions = async () => {
      try {
        setError(null);
        const data = await mockAPI.getMissions();
        setMissions(data);
        setLastUpdate(new Date());
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch missions');
      } finally {
        setLoading(false);
      }
    };

    // Initial fetch
    fetchMissions();

    // Set up interval for updates
    const interval = setInterval(fetchMissions, intervalMs);

    return () => clearInterval(interval);
  }, [intervalMs]);

  return { missions, loading, error, lastUpdate };
}

// Hook for mission statistics
export function useMissionStatistics() {
  const { data: missions, loading, error } = useMissions();

  const statistics = {
    total: missions?.length || 0,
    pending: missions?.filter(m => m.status === 'pending').length || 0,
    inProgress: missions?.filter(m => m.status === 'in-progress').length || 0,
    completed: missions?.filter(m => m.status === 'completed').length || 0,
    overdue: missions?.filter(m => m.status === 'overdue').length || 0,
    highPriority: missions?.filter(m => m.priority === 'high').length || 0,
    completionRate: missions && missions.length > 0 
      ? (missions.filter(m => m.status === 'completed').length / missions.length) * 100 
      : 0
  };

  return { statistics, loading, error };
}

export default {
  useMissions,
  useMission,
  useUsers,
  useUser,
  useDashboardStats,
  useFleetStatus,
  useComplianceAlerts,
  useMissionSummary,
  useMissionUpdater,
  useFilteredMissions,
  useUserMissions,
  useVesselMissions,
  useRealTimeMissions,
  useMissionStatistics
};
