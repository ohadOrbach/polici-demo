'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { mockMissions, Mission } from '@/data/mockData';

interface MissionsContextType {
  missions: Mission[];
  addMission: (mission: Mission) => void;
}

const MissionsContext = createContext<MissionsContextType | undefined>(undefined);

export const MissionsProvider = ({ children }: { children: ReactNode }) => {
  const [missions, setMissions] = useState<Mission[]>(mockMissions);

  const addMission = (mission: Mission) => {
    // A real implementation would also post to a server
    const newMission = { 
      ...mission, 
      id: `mission_${Date.now()}`, 
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
     };
    setMissions(prevMissions => [newMission, ...prevMissions]);
  };

  return (
    <MissionsContext.Provider value={{ missions, addMission }}>
      {children}
    </MissionsContext.Provider>
  );
};

export const useMissions = () => {
  const context = useContext(MissionsContext);
  if (context === undefined) {
    throw new Error('useMissions must be used within a MissionsProvider');
  }
  return context;
};
