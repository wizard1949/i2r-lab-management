import { Equipment, User, Reservation, UsageLog } from '../types';

export const mockEquipment: Equipment[] = [
  {
    id: '1',
    name: 'Ultimaker S3 3D Printer',
    category: 'mechanical',
    description: 'Professional 3D printer for rapid prototyping with dual extrusion capability',
    location: 'Room 101A',
    status: 'available',
    totalQuantity: 2,
    availableQuantity: 2,
    imageUrl: 'https://images.pexels.com/photos/5691659/pexels-photo-5691659.jpeg?auto=compress&cs=tinysrgb&w=400',
    specifications: {
      'Build Volume': '230 × 190 × 200 mm',
      'Layer Height': '0.25 mm',
      'Materials': 'PLA, ABS, PETG, TPU',
      'Nozzle Diameter': '0.4 mm'
    },
    safetyRequirements: ['Safety glasses required', 'No loose clothing', 'Proper ventilation'],
    trainingRequired: true
  },
  {
    id: '2',
    name: 'Haas Mini Mill CNC',
    category: 'mechanical',
    description: 'Precision CNC milling machine for metal and plastic machining',
    location: 'Room 102B',
    status: 'in-use',
    totalQuantity: 1,
    availableQuantity: 0,
    imageUrl: 'https://images.pexels.com/photos/5691665/pexels-photo-5691665.jpeg?auto=compress&cs=tinysrgb&w=400',
    specifications: {
      'Spindle Speed': '10,000 RPM',
      'Table Size': '406 × 305 mm',
      'Materials': 'Aluminum, Steel, Plastic',
      'Tolerance': '±0.01 mm'
    },
    safetyRequirements: ['Safety glasses mandatory', 'Steel-toed boots required', 'Hearing protection'],
    trainingRequired: true
  },
  {
    id: '3',
    name: 'Weller Soldering Station',
    category: 'electronics',
    description: 'Professional soldering station with temperature control',
    location: 'Room 103A',
    status: 'available',
    totalQuantity: 5,
    availableQuantity: 4,
    imageUrl: 'https://images.pexels.com/photos/5691661/pexels-photo-5691661.jpeg?auto=compress&cs=tinysrgb&w=400',
    specifications: {
      'Temperature Range': '150°C - 450°C',
      'Power': '80W',
      'Tip Types': 'Chisel, Conical, Knife',
      'ESD Safe': 'Yes'
    },
    safetyRequirements: ['ESD wrist strap required', 'Proper ventilation', 'Fire safety awareness'],
    trainingRequired: false
  },
  {
    id: '4',
    name: 'Keysight Oscilloscope',
    category: 'testing',
    description: 'Digital oscilloscope for signal analysis and debugging',
    location: 'Room 104B',
    status: 'available',
    totalQuantity: 3,
    availableQuantity: 2,
    imageUrl: 'https://images.pexels.com/photos/5691663/pexels-photo-5691663.jpeg?auto=compress&cs=tinysrgb&w=400',
    specifications: {
      'Bandwidth': '100 MHz',
      'Channels': '4',
      'Sample Rate': '1 GSa/s',
      'Memory Depth': '1 Mpts'
    },
    safetyRequirements: ['Proper grounding', 'Voltage limits awareness'],
    trainingRequired: true
  },
  {
    id: '5',
    name: 'Universal Testing Machine',
    category: 'testing',
    description: 'Material testing machine for tensile and compression testing',
    location: 'Room 105A',
    status: 'maintenance',
    totalQuantity: 1,
    availableQuantity: 0,
    imageUrl: 'https://images.pexels.com/photos/5691667/pexels-photo-5691667.jpeg?auto=compress&cs=tinysrgb&w=400',
    specifications: {
      'Load Capacity': '50 kN',
      'Test Speed': '0.01 - 500 mm/min',
      'Accuracy': '±0.5%',
      'Test Types': 'Tensile, Compression, Flexural'
    },
    safetyRequirements: ['Safety barriers required', 'Proper specimen handling', 'Emergency stop awareness'],
    trainingRequired: true
  },
  {
    id: '6',
    name: 'Laser Cutter',
    category: 'mechanical',
    description: 'CO2 laser cutter for precise cutting and engraving',
    location: 'Room 106B',
    status: 'available',
    totalQuantity: 1,
    availableQuantity: 1,
    imageUrl: 'https://images.pexels.com/photos/5691669/pexels-photo-5691669.jpeg?auto=compress&cs=tinysrgb&w=400',
    specifications: {
      'Bed Size': '600 × 400 mm',
      'Laser Power': '40W',
      'Materials': 'Acrylic, Wood, Paper, Cardboard',
      'Cutting Thickness': 'Up to 10mm'
    },
    safetyRequirements: ['Laser safety glasses mandatory', 'Proper ventilation', 'Fire safety protocols'],
    trainingRequired: true
  }
];

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@student.kit.edu',
    department: 'Computer Science',
    role: 'student',
    isAuthenticated: true,
    trainingCompleted: ['1', '3']
  },
  {
    id: '2',
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@kit.edu',
    department: 'Mechanical Engineering',
    role: 'faculty',
    isAuthenticated: false,
    trainingCompleted: ['1', '2', '4', '5', '6']
  },
  {
    id: '3',
    name: 'Mike Chen',
    email: 'mike.chen@kit.edu',
    department: 'Electronics',
    role: 'tech-secretary',
    isAuthenticated: false,
    trainingCompleted: ['1', '2', '3', '4', '6']
  },
  {
    id: '4',
    name: 'Alex Rodriguez',
    email: 'alex.rodriguez@kit.edu',
    department: 'Robotics Club',
    role: 'club-lead',
    isAuthenticated: false,
    trainingCompleted: ['1', '2', '3', '4', '5', '6']
  },
  {
    id: '5',
    name: 'Dr. Priya Sharma',
    email: 'priya.sharma@kit.edu',
    department: 'Materials Science',
    role: 'phd-scholar',
    isAuthenticated: false,
    trainingCompleted: ['1', '2', '4', '5', '6']
  },
  {
    id: '6',
    name: 'Emma Wilson',
    email: 'emma.wilson@student.kit.edu',
    department: 'Electrical Engineering',
    role: 'student',
    isAuthenticated: false,
    trainingCompleted: ['3', '4']
  },
  {
    id: '7',
    name: 'David Kim',
    email: 'david.kim@student.kit.edu',
    department: 'Mechanical Engineering',
    role: 'student',
    isAuthenticated: false,
    trainingCompleted: ['1', '6']
  }
];

export const mockReservations: Reservation[] = [
  {
    id: '1',
    userId: '1',
    userName: 'John Doe',
    userEmail: 'john.doe@student.kit.edu',
    userDepartment: 'Computer Science',
    equipmentId: '1',
    equipmentName: 'Ultimaker S3 3D Printer',
    projectTitle: 'IoT Device Housing',
    purpose: 'Print custom enclosure for sensor module',
    duration: 4,
    startTime: new Date('2024-01-15T10:00:00'),
    endTime: new Date('2024-01-15T14:00:00'),
    status: 'pending',
    approvals: {},
    createdAt: new Date('2024-01-14T09:00:00'),
    updatedAt: new Date('2024-01-14T09:00:00')
  },
  {
    id: '2',
    userId: '6',
    userName: 'Emma Wilson',
    userEmail: 'emma.wilson@student.kit.edu',
    userDepartment: 'Electrical Engineering',
    equipmentId: '3',
    equipmentName: 'Weller Soldering Station',
    projectTitle: 'Circuit Board Assembly',
    purpose: 'Solder components for microcontroller board',
    duration: 2,
    startTime: new Date('2024-01-16T14:00:00'),
    endTime: new Date('2024-01-16T16:00:00'),
    status: 'approved',
    approvals: {
      techSecretary: {
        approved: true,
        comment: 'Approved for routine soldering work',
        date: new Date('2024-01-14T10:30:00')
      }
    },
    createdAt: new Date('2024-01-14T09:30:00'),
    updatedAt: new Date('2024-01-14T10:30:00')
  },
  {
    id: '3',
    userId: '7',
    userName: 'David Kim',
    userEmail: 'david.kim@student.kit.edu',
    userDepartment: 'Mechanical Engineering',
    equipmentId: '2',
    equipmentName: 'Haas Mini Mill CNC',
    projectTitle: 'Precision Part Manufacturing',
    purpose: 'Machine aluminum components for final year project',
    duration: 6,
    startTime: new Date('2024-01-17T09:00:00'),
    endTime: new Date('2024-01-17T15:00:00'),
    status: 'pending',
    approvals: {},
    createdAt: new Date('2024-01-15T11:00:00'),
    updatedAt: new Date('2024-01-15T11:00:00')
  }
];

export const mockUsageLogs: UsageLog[] = [
  {
    id: '1',
    reservationId: '2',
    equipmentId: '3',
    userId: '6',
    checkInTime: new Date('2024-01-13T14:00:00'),
    checkOutTime: new Date('2024-01-13T15:45:00'),
    actualDuration: 1.75,
    condition: 'good',
    notes: 'Equipment worked perfectly, cleaned after use'
  }
];