# Mock Data Documentation

This directory contains comprehensive mock data for the Captain's Eye Policy 2.0 visual mockups.

## Files Overview

### `mockData.ts`
Core mock data including:
- **Users**: Different roles (Safety Manager, Fleet Manager, Captain, etc.)
- **Missions**: Comprehensive mission objects with all task details
- **Task Checkboxes**: Various types (checkbox, photo, video, file, signature)
- **Mock API**: Simulated API functions for data operations

### `dashboardData.ts` 
Dashboard-specific data including:
- **Dashboard Statistics**: Overview metrics and KPIs
- **Fleet Status**: Real-time vessel information
- **Compliance Alerts**: System alerts and notifications
- **Mission Summary**: Condensed mission information for dashboard views

### `useMockAPI.ts`
React hooks for consuming mock data:
- **Data Fetching Hooks**: `useMissions()`, `useUsers()`, etc.
- **Real-time Updates**: Simulated real-time data updates
- **Filtering Hooks**: Pre-built filters for common use cases
- **Statistics Hooks**: Calculated metrics and analytics

### `index.ts`
Centralized exports for easy imports across the application.

## Data Structure

### Mission Object
```typescript
interface Mission {
  id: string;
  title: string;
  description: string;
  vessel: string;
  assignedBy: TaskAssignee;
  assignedTo: TaskAssignee;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in-progress' | 'completed' | 'overdue';
  checkboxes: TaskCheckbox[];
  notes: TaskNote[];
  // ... additional fields
}
```

### Task Checkbox Types
- **checkbox**: Standard true/false checkbox
- **photo**: Requires photo upload/capture
- **video**: Requires video recording/upload
- **file**: Requires file attachment
- **signature**: Requires digital signature

## Sample Data

### Users (7 different roles)
- Sarah Johnson (Safety Manager)
- Mike Chen (Fleet Manager)  
- Captain James Smith (Ship Captain)
- Chief Engineer Davis (Chief Engineer)
- Tom Wilson (Safety Manager)
- Captain Maria Rodriguez (Ship Captain)
- Dr. Emma Thompson (Certification Company)

### Missions (6 comprehensive examples)
1. **Emergency Safety Drill** - High priority safety mission
2. **Navigation Equipment Check** - Medium priority equipment mission  
3. **Engine Room Inspection** - Completed maintenance mission
4. **Safety Training** - Low priority training mission
5. **Port State Control Prep** - High priority compliance mission
6. **Security Drill** - Overdue security mission

### Vessels (6 different ships)
- MV Northern Star (Container Ship)
- MV Ocean Explorer (Bulk Carrier)
- MV Atlantic Voyager (Tanker)
- MV Pacific Dream (Container Ship)
- MV Caribbean Queen (Cruise Ship)
- MV Nordic Wind (General Cargo)

## Usage Examples

### Basic Data Fetching
```typescript
import { useMissions, useUsers } from '@/data';

function MyComponent() {
  const { data: missions, loading } = useMissions();
  const { data: users } = useUsers();
  
  if (loading) return <div>Loading...</div>;
  
  return (
    <div>
      <h2>Missions: {missions?.length}</h2>
      <h2>Users: {users?.length}</h2>
    </div>
  );
}
```

### Filtered Data
```typescript
import { useFilteredMissions } from '@/data';

function PendingMissions() {
  const { missions, loading } = useFilteredMissions('pending');
  
  return (
    <div>
      <h2>Pending Missions: {missions.length}</h2>
      {missions.map(mission => (
        <div key={mission.id}>{mission.title}</div>
      ))}
    </div>
  );
}
```

### Real-time Updates
```typescript
import { useRealTimeMissions } from '@/data';

function LiveDashboard() {
  const { missions, lastUpdate } = useRealTimeMissions(5000); // Update every 5 seconds
  
  return (
    <div>
      <p>Last updated: {lastUpdate.toLocaleTimeString()}</p>
      <p>Active missions: {missions.filter(m => m.status === 'in-progress').length}</p>
    </div>
  );
}
```

## API Simulation

The mock API includes simulated network delays and realistic response times:
- **getMissions()**: 500ms delay
- **getMission(id)**: 300ms delay  
- **updateMission()**: 400ms delay
- **completeMission()**: 600ms delay

## Data Features

### Comprehensive Task Types
Each mission includes various checkbox types to demonstrate the full range of functionality:
- Standard checkboxes for simple yes/no tasks
- Photo requirements with simulated image data
- Video requirements with mock video data
- File attachments with base64-encoded sample documents
- Digital signatures with timestamp and user information

### Realistic Scenarios
The mock data represents realistic maritime scenarios:
- SOLAS compliance requirements
- STCW training mandates
- Port State Control preparations
- Equipment calibration procedures
- Emergency drill documentation

### Role-based Assignments
Tasks are assigned between different user roles to demonstrate the workflow:
- Safety Managers create and assign safety-related tasks
- Fleet Managers handle operational and equipment tasks
- Captains and Engineers complete assigned tasks
- Certification Companies create compliance tests

## Integration

The mock data is integrated with the enhanced mobile interface to provide:
- Real task data in the mission list
- Comprehensive checkbox functionality
- Role and assignment information display
- Progress tracking and validation
- Media attachment simulation

This mock data system provides a complete foundation for visual demonstration of the Captain's Eye Policy 2.0 system without requiring backend infrastructure.
