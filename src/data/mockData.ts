// Mock Data for Captain's Eye Policy 2.0 - Visual Mockups
// This file contains comprehensive mock data for visual demonstration

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Safety Manager' | 'Fleet Manager' | 'Ship Captain' | 'Chief Engineer' | 'Crew' | 'Certification Company' | 'Owner/Admin';
  avatar?: string;
  company: string;
  vessels?: string[];
  permissions: string[];
}

export interface TaskCheckbox {
  id: string;
  text: string;
  description?: string;
  required: boolean;
  checked: boolean;
  type: 'checkbox' | 'photo' | 'video' | 'file' | 'signature';
  attachments?: {
    photos?: string[];
    videos?: string[];
    files?: string[];
    signature?: string;
  };
}

export interface TaskNote {
  id: string;
  text: string;
  timestamp: string;
  author: string;
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  vessel: string;
  assignedBy: {
    id: string;
    name: string;
    role: string;
    avatar?: string;
  };
  assignedTo: {
    id: string;
    name: string;
    role: string;
    avatar?: string;
  };
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  estimatedDuration: string;
  status: 'pending' | 'in-progress' | 'completed' | 'overdue';
  type: 'safety' | 'equipment' | 'maintenance' | 'training' | 'compliance';
  checkboxes: TaskCheckbox[];
  notes: TaskNote[];
  taskNotes: string;
  completedAt?: string;
  startedAt?: string;
  offline: boolean;
  progress: number;
  createdAt: string;
  updatedAt: string;
}

// Mock Users
export const mockUsers: User[] = [
  {
    id: 'user_001',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@maritimesafety.com',
    role: 'Safety Manager',
    avatar: '/avatars/sarah-johnson.jpg',
    company: 'Maritime Safety Corp',
    vessels: ['MV Northern Star', 'MV Ocean Explorer', 'MV Atlantic Voyager'],
    permissions: ['create_missions', 'assign_tasks', 'view_reports', 'manage_compliance']
  },
  {
    id: 'user_002', 
    name: 'Mike Chen',
    email: 'mike.chen@fleetmanagement.com',
    role: 'Fleet Manager',
    avatar: '/avatars/mike-chen.jpg',
    company: 'Global Fleet Management',
    vessels: ['MV Northern Star', 'MV Pacific Dream', 'MV Caribbean Queen'],
    permissions: ['view_fleet', 'assign_vessels', 'generate_reports', 'monitor_compliance']
  },
  {
    id: 'user_003',
    name: 'Captain James Smith',
    email: 'j.smith@northernstar.com',
    role: 'Ship Captain',
    avatar: '/avatars/captain-smith.jpg',
    company: 'Northern Star Shipping',
    vessels: ['MV Northern Star'],
    permissions: ['complete_missions', 'upload_media', 'add_notes', 'sign_documents']
  },
  {
    id: 'user_004',
    name: 'Chief Engineer Davis',
    email: 'r.davis@northernstar.com',
    role: 'Chief Engineer',
    avatar: '/avatars/engineer-davis.jpg',
    company: 'Northern Star Shipping',
    vessels: ['MV Northern Star'],
    permissions: ['complete_missions', 'technical_reports', 'maintenance_logs']
  },
  {
    id: 'user_005',
    name: 'Tom Wilson',
    email: 'tom.wilson@maritimesafety.com',
    role: 'Safety Manager',
    avatar: '/avatars/tom-wilson.jpg',
    company: 'Maritime Safety Corp',
    vessels: ['MV Ocean Explorer', 'MV Atlantic Voyager'],
    permissions: ['create_missions', 'safety_inspections', 'compliance_audits']
  },
  {
    id: 'user_006',
    name: 'Captain Maria Rodriguez',
    email: 'm.rodriguez@oceanexplorer.com',
    role: 'Ship Captain',
    avatar: '/avatars/captain-rodriguez.jpg',
    company: 'Ocean Explorer Ltd',
    vessels: ['MV Ocean Explorer'],
    permissions: ['complete_missions', 'crew_management', 'navigation_reports']
  },
  {
    id: 'user_007',
    name: 'Dr. Emma Thompson',
    email: 'e.thompson@certificationcorp.com',
    role: 'Certification Company',
    avatar: '/avatars/dr-thompson.jpg',
    company: 'Maritime Certification Corp',
    permissions: ['create_compliance_tests', 'audit_reports', 'certification_management']
  }
];

// Mock Missions
export const mockMissions: Mission[] = [
  {
    id: 'mission_001',
    title: 'Emergency Safety Drill Compliance',
    description: 'Complete comprehensive fire drill and muster procedures according to SOLAS regulations. This drill must be conducted with all crew members and properly documented for compliance purposes.',
    vessel: 'MV Northern Star',
    assignedBy: {
      id: 'user_001',
      name: 'Sarah Johnson',
      role: 'Safety Manager',
      avatar: '/avatars/sarah-johnson.jpg'
    },
    assignedTo: {
      id: 'user_003',
      name: 'Captain James Smith',
      role: 'Ship Captain',
      avatar: '/avatars/captain-smith.jpg'
    },
    dueDate: '2025-09-25T15:30:00Z',
    priority: 'high',
    estimatedDuration: '45 min',
    status: 'in-progress',
    type: 'safety',
    offline: true,
    progress: 60,
    taskNotes: 'Weather conditions are favorable for conducting the drill. All crew members have been notified.',
    createdAt: '2025-09-20T10:00:00Z',
    updatedAt: '2025-09-24T14:30:00Z',
    startedAt: '2025-09-24T14:15:00Z',
    notes: [
      {
        id: 'note_001',
        text: 'Please ensure all crew members are aware of the drill timing. Special attention to new crew members who joined last week.',
        timestamp: '2025-09-20T10:15:00Z',
        author: 'Safety Manager Johnson'
      },
      {
        id: 'note_002',
        text: 'Weather forecast shows clear conditions for Thursday afternoon - ideal for the drill.',
        timestamp: '2025-09-23T16:20:00Z',
        author: 'Safety Manager Johnson'
      }
    ],
    checkboxes: [
      {
        id: 'check_001_001',
        text: 'Sound General Alarm',
        description: 'Activate the general alarm system and verify all crew can hear it clearly in all areas of the vessel',
        required: true,
        checked: true,
        type: 'checkbox'
      },
      {
        id: 'check_001_002',
        text: 'Crew Muster Documentation',
        description: 'Take photos of crew at designated muster stations showing proper assembly and headcount',
        required: true,
        checked: true,
        type: 'photo',
        attachments: {
          photos: [
            'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=',
            'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k='
          ]
        }
      },
      {
        id: 'check_001_003',
        text: 'Safety Equipment Verification',
        description: 'Record video walkthrough of safety equipment check including life jackets, fire extinguishers, and emergency exits',
        required: true,
        checked: false,
        type: 'video',
        attachments: {
          videos: []
        }
      },
      {
        id: 'check_001_004',
        text: 'Emergency Lighting Test',
        description: 'Verify emergency lighting activation during drill and test backup power systems',
        required: true,
        checked: true,
        type: 'checkbox'
      },
      {
        id: 'check_001_005',
        text: 'Drill Report Documentation',
        description: 'Upload completed drill report form with timing, attendance, and observations',
        required: true,
        checked: false,
        type: 'file',
        attachments: {
          files: []
        }
      },
      {
        id: 'check_001_006',
        text: 'Captain Sign-off',
        description: 'Digital signature to confirm drill completion and compliance with SOLAS requirements',
        required: true,
        checked: false,
        type: 'signature',
        attachments: {
          signature: ''
        }
      },
      {
        id: 'check_001_007',
        text: 'Communication System Test',
        description: 'Test all emergency communication devices and PA system functionality',
        required: false,
        checked: false,
        type: 'checkbox'
      },
      {
        id: 'check_001_008',
        text: 'Additional Documentation',
        description: 'Upload any additional photos or reports from the drill',
        required: false,
        checked: false,
        type: 'file',
        attachments: {
          files: []
        }
      }
    ]
  },
  {
    id: 'mission_002',
    title: 'Navigation Equipment Calibration',
    description: 'Comprehensive testing and calibration of all navigation equipment including GPS, radar, and communication systems for operational readiness',
    vessel: 'MV Northern Star',
    assignedBy: {
      id: 'user_002',
      name: 'Mike Chen',
      role: 'Fleet Manager',
      avatar: '/avatars/mike-chen.jpg'
    },
    assignedTo: {
      id: 'user_003',
      name: 'Captain James Smith',
      role: 'Ship Captain',
      avatar: '/avatars/captain-smith.jpg'
    },
    dueDate: '2025-09-26T16:00:00Z',
    priority: 'medium',
    estimatedDuration: '30 min',
    status: 'pending',
    type: 'equipment',
    offline: true,
    progress: 0,
    taskNotes: '',
    createdAt: '2025-09-22T09:00:00Z',
    updatedAt: '2025-09-22T09:00:00Z',
    notes: [
      {
        id: 'note_002_001',
        text: 'Please coordinate with the technical team for any calibration issues. New GPS firmware was installed last week.',
        timestamp: '2025-09-22T09:15:00Z',
        author: 'Fleet Manager Chen'
      }
    ],
    checkboxes: [
      {
        id: 'check_002_001',
        text: 'GPS System Test',
        description: 'Verify GPS accuracy and functionality, test position accuracy against known coordinates',
        required: true,
        checked: false,
        type: 'checkbox'
      },
      {
        id: 'check_002_002',
        text: 'Radar Calibration Check',
        description: 'Test radar system calibration, range accuracy, and target detection capabilities',
        required: true,
        checked: false,
        type: 'checkbox'
      },
      {
        id: 'check_002_003',
        text: 'Communication Equipment Test',
        description: 'Test VHF, satellite communication, and emergency radio systems',
        required: true,
        checked: false,
        type: 'checkbox'
      },
      {
        id: 'check_002_004',
        text: 'Equipment Status Photos',
        description: 'Document current status of all navigation equipment with photos',
        required: true,
        checked: false,
        type: 'photo',
        attachments: {
          photos: []
        }
      },
      {
        id: 'check_002_005',
        text: 'Maintenance Log Upload',
        description: 'Upload recent maintenance documentation for navigation equipment',
        required: false,
        checked: false,
        type: 'file',
        attachments: {
          files: []
        }
      }
    ]
  },
  {
    id: 'mission_003',
    title: 'Engine Room Daily Inspection',
    description: 'Comprehensive daily engine room safety and maintenance inspection including all critical systems and safety equipment',
    vessel: 'MV Northern Star',
    assignedBy: {
      id: 'user_005',
      name: 'Tom Wilson',
      role: 'Safety Manager',
      avatar: '/avatars/tom-wilson.jpg'
    },
    assignedTo: {
      id: 'user_004',
      name: 'Chief Engineer Davis',
      role: 'Chief Engineer',
      avatar: '/avatars/engineer-davis.jpg'
    },
    dueDate: '2025-09-24T13:00:00Z',
    priority: 'medium',
    estimatedDuration: '60 min',
    status: 'completed',
    type: 'maintenance',
    offline: true,
    progress: 100,
    taskNotes: 'All systems operating within normal parameters. Minor oil leak in auxiliary engine addressed.',
    createdAt: '2025-09-24T06:00:00Z',
    updatedAt: '2025-09-24T14:30:00Z',
    startedAt: '2025-09-24T12:30:00Z',
    completedAt: '2025-09-24T14:15:00Z',
    notes: [
      {
        id: 'note_003_001',
        text: 'Pay special attention to the auxiliary engine - there were some vibration reports yesterday.',
        timestamp: '2025-09-24T06:15:00Z',
        author: 'Safety Manager Wilson'
      }
    ],
    checkboxes: [
      {
        id: 'check_003_001',
        text: 'Engine Temperature Check',
        description: 'Monitor and record all engine temperature readings',
        required: true,
        checked: true,
        type: 'checkbox'
      },
      {
        id: 'check_003_002',
        text: 'Oil Level Verification',
        description: 'Check and record oil levels for main and auxiliary engines',
        required: true,
        checked: true,
        type: 'checkbox'
      },
      {
        id: 'check_003_003',
        text: 'Safety Equipment Documentation',
        description: 'Photograph all safety equipment in engine room including fire suppression systems',
        required: true,
        checked: true,
        type: 'photo',
        attachments: {
          photos: [
            'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k='
          ]
        }
      },
      {
        id: 'check_003_004',
        text: 'Maintenance Log Documentation',
        description: 'Upload completed maintenance checklist and any repair documentation',
        required: true,
        checked: true,
        type: 'file',
        attachments: {
          files: [
            'data:application/pdf;base64,JVBERi0xLjQKJcOkw7zDtsO8CjIgMCBvYmoKPDwKL0xlbmd0aCAzIDAgUgovRmlsdGVyIC9GbGF0ZURlY29kZQo+PgpzdHJlYW0KeJxLy8wpTVWwUsjIzEvLTFGwVTJQUCjJSFUoLU4tykvMTVWwVTJQUEjNS85ILCpRsAUAMxsKUAplbmRzdHJlYW0KZW5kb2JqCjQgMCBvYmoKPDwKL1R5cGUgL1BhZ2UKL1BhcmVudCAzIDAgUgovUmVzb3VyY2VzIDw8Ci9Gb250IDw8Ci9GMSAxIDAgUgo+Pgo+PgovTWVkaWFCb3ggWzAgMCA2MTIgNzkyXQovQ29udGVudHMgMiAwIFIKPj4KZW5kb2JqCjUgMCBvYmoKPDwKL1R5cGUgL0ZvbnQKL1N1YnR5cGUgL1R5cGUxCi9CYXNlRm9udCAvSGVsdmV0aWNhCj4+CmVuZG9iago2IDAgb2JqCjw8Ci9UeXBlIC9DYXRhbG9nCi9QYWdlcyAzIDAgUgo+PgplbmRvYmoKMyAwIG9iago8PAovVHlwZSAvUGFnZXMKL0NvdW50IDEKL0tpZHMgWzQgMCBSXQo+PgplbmRvYmoKMSAwIG9iago8PAovVHlwZSAvRm9udAovU3VidHlwZSAvVHlwZTEKL0Jhc2VGb250IC9IZWx2ZXRpY2EKPj4KZW5kb2JqCnhyZWYKMCA3CjAwMDAwMDAwMDAgNjU1MzUgZiAKMDAwMDAwMDI3MyAwMDAwMCBuIAowMDAwMDAwMDE5IDAwMDAwIG4gCjAwMDAwMDAyMjAgMDAwMDAgbiAKMDAwMDAwMDA3OSAwMDAwMCBuIAowMDAwMDAwMTczIDAwMDAwIG4gCjAwMDAwMDAxNjcgMDAwMDAgbiAKdHJhaWxlcgo8PAovU2l6ZSA3Ci9Sb290IDYgMCBSCj4+CnN0YXJ0eHJlZgozMjcKJSVFT0YK'
          ]
        }
      },
      {
        id: 'check_003_005',
        text: 'Visual Inspection Video',
        description: 'Record video walkthrough of engine room highlighting any issues or concerns',
        required: true,
        checked: true,
        type: 'video',
        attachments: {
          videos: [
            'data:video/mp4;base64,AAAAIGZ0eXBpc29tAAACAGlzb21pc28yYXZjMW1wNDEAAAAIZnJlZQAAAr3mZGF0AAACrgYF//+q3EXpvebZSLeWLNgg2SPu73gyNjQgLSBjb3JlIDE1NSByMjkwMSA3ZDBmZjIyIC0gSC4yNjQvTVBFRy00IEFWQyBjb2RlYyAtIENvcHlsZWZ0IDIwMDMtMjAxOCAtIGh0dHA6Ly93d3cudmlkZW9sYW4ub3JnL3gyNjQuaHRtbCAtIG9wdGlvbnM6IGNhYmFjPTEgcmVmPTMgZGVibG9jaz0xOjA6MCBhbmFseXNlPTB4MzoweDExMyBtZT1oZXggc3VibWU9NyBwc3k9MSBwc3lfcmQ9MS4wMDowLjAwIG1peGVkX3JlZj0xIG1lX3JhbmdlPTE2IGNocm9tYV9tZT0xIHRyZWxsaXM9MSA4eDhkY3Q9MSBjcW09MCBkZWFkem9uZT0yMSwxMSBmYXN0X3Bza2lwPTEgY2hyb21hX3FwX29mZnNldD0tMiB0aHJlYWRzPTYgbG9va2FoZWFkX3RocmVhZHM9MSBzbGljZWRfdGhyZWFkcz0wIG5yPTAgZGVjaW1hdGU9MSBpbnRlcmxhY2VkPTAgYmx1cmF5X2NvbXBhdD0wIGNvbnN0cmFpbmVkX2ludHJhPTAgYmZyYW1lcz0zIGJfcHlyYW1pZD0yIGJfYWRhcHQ9MSBiX2JpYXM9MCBkaXJlY3Q9MSB3ZWlnaHRiPTEgb3Blbl9nb3A9MCB3ZWlnaHRwPTIga2V5aW50PTI1MCBrZXlpbnRfbWluPTI1IHNjZW5lY3V0PTQwIGludHJhX3JlZnJlc2g9MCByY19sb29rYWhlYWQ9NDAgcmM9Y3JmIG1idHJlZT0xIGNyZj0yMy4wIHFjb21wPTAuNjAgcXBtaW49MCBxcG1heD02OSBxcHN0ZXA9NCBpcF9yYXRpbz0xLjQwIGFxPTE6MS4wMACAAAABWWWIhAA3//728P4FNjuY0JcRzMheBA=='
          ]
        }
      },
      {
        id: 'check_003_006',
        text: 'Chief Engineer Sign-off',
        description: 'Digital signature confirming inspection completion and system status',
        required: true,
        checked: true,
        type: 'signature',
        attachments: {
          signature: 'Chief Engineer R. Davis'
        }
      }
    ]
  },
  {
    id: 'mission_004',
    title: 'Mandatory Safety Training Completion',
    description: 'Complete mandatory safety training video and assessment for all crew members. This training covers updated STCW requirements and emergency procedures.',
    vessel: 'MV Northern Star',
    assignedBy: {
      id: 'user_001',
      name: 'Sarah Johnson',
      role: 'Safety Manager',
      avatar: '/avatars/sarah-johnson.jpg'
    },
    assignedTo: {
      id: 'user_003',
      name: 'Captain James Smith',
      role: 'Ship Captain',
      avatar: '/avatars/captain-smith.jpg'
    },
    dueDate: '2025-09-27T18:00:00Z',
    priority: 'low',
    estimatedDuration: '25 min',
    status: 'pending',
    type: 'training',
    offline: false,
    progress: 0,
    taskNotes: '',
    createdAt: '2025-09-21T11:00:00Z',
    updatedAt: '2025-09-21T11:00:00Z',
    notes: [
      {
        id: 'note_004_001',
        text: 'This training requires internet connection. Please complete when in port or with stable satellite connection.',
        timestamp: '2025-09-21T11:15:00Z',
        author: 'Safety Manager Johnson'
      }
    ],
    checkboxes: [
      {
        id: 'check_004_001',
        text: 'Watch Training Video',
        description: 'Complete the 20-minute safety training video covering updated STCW requirements',
        required: true,
        checked: false,
        type: 'checkbox'
      },
      {
        id: 'check_004_002',
        text: 'Complete Assessment Quiz',
        description: 'Pass the training assessment quiz with minimum 80% score',
        required: true,
        checked: false,
        type: 'checkbox'
      },
      {
        id: 'check_004_003',
        text: 'Training Certificate Upload',
        description: 'Upload the completion certificate generated after passing the assessment',
        required: true,
        checked: false,
        type: 'file',
        attachments: {
          files: []
        }
      }
    ]
  },
  {
    id: 'mission_005',
    title: 'Port State Control Preparation',
    description: 'Comprehensive preparation for upcoming port state control inspection including documentation review and equipment verification',
    vessel: 'MV Ocean Explorer',
    assignedBy: {
      id: 'user_005',
      name: 'Tom Wilson',
      role: 'Safety Manager',
      avatar: '/avatars/tom-wilson.jpg'
    },
    assignedTo: {
      id: 'user_006',
      name: 'Captain Maria Rodriguez',
      role: 'Ship Captain',
      avatar: '/avatars/captain-rodriguez.jpg'
    },
    dueDate: '2025-09-28T12:00:00Z',
    priority: 'high',
    estimatedDuration: '90 min',
    status: 'pending',
    type: 'compliance',
    offline: true,
    progress: 0,
    taskNotes: '',
    createdAt: '2025-09-23T08:00:00Z',
    updatedAt: '2025-09-23T08:00:00Z',
    notes: [
      {
        id: 'note_005_001',
        text: 'PSC inspection scheduled for Friday morning. Please ensure all documentation is current and accessible.',
        timestamp: '2025-09-23T08:15:00Z',
        author: 'Safety Manager Wilson'
      },
      {
        id: 'note_005_002',
        text: 'Special focus on MARPOL compliance - new regulations came into effect last month.',
        timestamp: '2025-09-23T14:30:00Z',
        author: 'Safety Manager Wilson'
      }
    ],
    checkboxes: [
      {
        id: 'check_005_001',
        text: 'Certificate Verification',
        description: 'Verify all vessel certificates are current and properly displayed',
        required: true,
        checked: false,
        type: 'checkbox'
      },
      {
        id: 'check_005_002',
        text: 'Safety Equipment Inventory',
        description: 'Complete inventory of all safety equipment and verify compliance',
        required: true,
        checked: false,
        type: 'checkbox'
      },
      {
        id: 'check_005_003',
        text: 'Documentation Photos',
        description: 'Photograph all certificates and compliance documentation',
        required: true,
        checked: false,
        type: 'photo',
        attachments: {
          photos: []
        }
      },
      {
        id: 'check_005_004',
        text: 'MARPOL Compliance Check',
        description: 'Verify compliance with updated MARPOL regulations',
        required: true,
        checked: false,
        type: 'checkbox'
      },
      {
        id: 'check_005_005',
        text: 'Crew Documentation Review',
        description: 'Review all crew certificates and medical fitness documents',
        required: true,
        checked: false,
        type: 'checkbox'
      },
      {
        id: 'check_005_006',
        text: 'Pre-inspection Report',
        description: 'Upload completed pre-inspection checklist and readiness report',
        required: true,
        checked: false,
        type: 'file',
        attachments: {
          files: []
        }
      },
      {
        id: 'check_005_007',
        text: 'Captain Readiness Confirmation',
        description: 'Digital signature confirming vessel readiness for PSC inspection',
        required: true,
        checked: false,
        type: 'signature',
        attachments: {
          signature: ''
        }
      },
      {
        id: 'check_005_008',
        text: 'Additional Documentation',
        description: 'Upload any additional supporting documentation',
        required: false,
        checked: false,
        type: 'file',
        attachments: {
          files: []
        }
      }
    ]
  },
  {
    id: 'mission_006',
    title: 'Weekly Security Drill',
    description: 'Conduct weekly security drill according to ISPS Code requirements including anti-piracy procedures and security team response',
    vessel: 'MV Atlantic Voyager',
    assignedBy: {
      id: 'user_001',
      name: 'Sarah Johnson',
      role: 'Safety Manager',
      avatar: '/avatars/sarah-johnson.jpg'
    },
    assignedTo: {
      id: 'user_003',
      name: 'Captain James Smith',
      role: 'Ship Captain',
      avatar: '/avatars/captain-smith.jpg'
    },
    dueDate: '2025-09-25T10:00:00Z',
    priority: 'medium',
    estimatedDuration: '35 min',
    status: 'overdue',
    type: 'security',
    offline: true,
    progress: 0,
    taskNotes: '',
    createdAt: '2025-09-18T09:00:00Z',
    updatedAt: '2025-09-18T09:00:00Z',
    notes: [
      {
        id: 'note_006_001',
        text: 'Focus on new anti-piracy procedures implemented last month. Ensure all security team members participate.',
        timestamp: '2025-09-18T09:15:00Z',
        author: 'Safety Manager Johnson'
      }
    ],
    checkboxes: [
      {
        id: 'check_006_001',
        text: 'Security Alert Activation',
        description: 'Activate security alert system and verify all crew response',
        required: true,
        checked: false,
        type: 'checkbox'
      },
      {
        id: 'check_006_002',
        text: 'Security Team Assembly',
        description: 'Document security team assembly and role assignments',
        required: true,
        checked: false,
        type: 'photo',
        attachments: {
          photos: []
        }
      },
      {
        id: 'check_006_003',
        text: 'Anti-piracy Procedures',
        description: 'Execute and document anti-piracy response procedures',
        required: true,
        checked: false,
        type: 'video',
        attachments: {
          videos: []
        }
      },
      {
        id: 'check_006_004',
        text: 'Communication Test',
        description: 'Test all security communication channels and emergency contacts',
        required: true,
        checked: false,
        type: 'checkbox'
      },
      {
        id: 'check_006_005',
        text: 'Security Drill Report',
        description: 'Complete and upload security drill report form',
        required: true,
        checked: false,
        type: 'file',
        attachments: {
          files: []
        }
      }
    ]
  }
];

// Mock Vessels
export const mockVessels = [
  {
    id: 'vessel_001',
    name: 'MV Northern Star',
    type: 'Container Ship',
    flag: 'Liberia',
    imo: '9123456',
    currentLocation: 'Port of Rotterdam',
    status: 'In Port',
    captain: 'Captain James Smith',
    crew: 24
  },
  {
    id: 'vessel_002',
    name: 'MV Ocean Explorer',
    type: 'Bulk Carrier',
    flag: 'Marshall Islands',
    imo: '9234567',
    currentLocation: 'Atlantic Ocean',
    status: 'At Sea',
    captain: 'Captain Maria Rodriguez',
    crew: 22
  },
  {
    id: 'vessel_003',
    name: 'MV Atlantic Voyager',
    type: 'Tanker',
    flag: 'Panama',
    imo: '9345678',
    currentLocation: 'Port of Houston',
    status: 'In Port',
    captain: 'Captain David Thompson',
    crew: 26
  }
];

// API Simulation Functions
export const mockAPI = {
  // Get all missions
  getMissions: async (): Promise<Mission[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockMissions), 500);
    });
  },

  // Get mission by ID
  getMission: async (id: string): Promise<Mission | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mission = mockMissions.find(m => m.id === id);
        resolve(mission || null);
      }, 300);
    });
  },

  // Update mission
  updateMission: async (id: string, updates: Partial<Mission>): Promise<Mission | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const missionIndex = mockMissions.findIndex(m => m.id === id);
        if (missionIndex !== -1) {
          mockMissions[missionIndex] = { ...mockMissions[missionIndex], ...updates };
          resolve(mockMissions[missionIndex]);
        } else {
          resolve(null);
        }
      }, 400);
    });
  },

  // Get users
  getUsers: async (): Promise<User[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockUsers), 300);
    });
  },

  // Get user by ID
  getUser: async (id: string): Promise<User | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = mockUsers.find(u => u.id === id);
        resolve(user || null);
      }, 200);
    });
  },

  // Complete mission
  completeMission: async (id: string): Promise<Mission | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const missionIndex = mockMissions.findIndex(m => m.id === id);
        if (missionIndex !== -1) {
          mockMissions[missionIndex] = {
            ...mockMissions[missionIndex],
            status: 'completed',
            completedAt: new Date().toISOString(),
            progress: 100
          };
          resolve(mockMissions[missionIndex]);
        } else {
          resolve(null);
        }
      }, 600);
    });
  }
};

// Export default mock data for easy imports
export default {
  users: mockUsers,
  missions: mockMissions,
  vessels: mockVessels,
  api: mockAPI
};
