export interface Equipment {
  id: string;
  name: string;
  category: 'mechanical' | 'electronics' | 'testing';
  description: string;
  location: string;
  status: 'available' | 'reserved' | 'in-use' | 'maintenance';
  totalQuantity: number;
  availableQuantity: number;
  imageUrl: string;
  specifications: Record<string, string>;
  safetyRequirements: string[];
  trainingRequired: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  department: string;
  role: 'student' | 'tech-secretary' | 'club-lead' | 'faculty' | 'phd-scholar';
  isAuthenticated: boolean;
  trainingCompleted: string[];
}

export interface Reservation {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  userDepartment: string;
  equipmentId: string;
  equipmentName: string;
  projectTitle: string;
  purpose: string;
  duration: number; // in hours
  startTime: Date;
  endTime: Date;
  status: 'pending' | 'approved' | 'rejected' | 'active' | 'completed';
  approvals: {
    techSecretary?: { approved: boolean; comment: string; date: Date };
    clubLead?: { approved: boolean; comment: string; date: Date };
    faculty?: { approved: boolean; comment: string; date: Date };
    phdScholar?: { approved: boolean; comment: string; date: Date };
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface UsageLog {
  id: string;
  reservationId: string;
  equipmentId: string;
  userId: string;
  checkInTime: Date;
  checkOutTime?: Date;
  actualDuration?: number;
  condition: 'good' | 'fair' | 'damaged';
  notes: string;
}

export interface WaitlistEntry {
  id: string;
  userId: string;
  userName: string;
  equipmentId: string;
  requestedStartTime: Date;
  requestedDuration: number;
  priority: number;
  createdAt: Date;
}