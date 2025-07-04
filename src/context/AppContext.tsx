import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Equipment, User, Reservation, UsageLog, WaitlistEntry } from '../types';
import { mockEquipment, mockUsers, mockReservations, mockUsageLogs } from '../data/mockData';

interface AppContextType {
  // State
  equipment: Equipment[];
  users: User[];
  currentUser: User | null;
  reservations: Reservation[];
  usageLogs: UsageLog[];
  waitlist: WaitlistEntry[];
  theme: 'light' | 'dark';
  
  // Actions
  setCurrentUser: (user: User | null) => void;
  addReservation: (reservation: Omit<Reservation, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateReservation: (id: string, updates: Partial<Reservation>) => void;
  updateEquipment: (id: string, updates: Partial<Equipment>) => void;
  addUsageLog: (log: Omit<UsageLog, 'id'>) => void;
  toggleTheme: () => void;
  addToWaitlist: (entry: Omit<WaitlistEntry, 'id' | 'createdAt'>) => void;
  removeFromWaitlist: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [equipment, setEquipment] = useState<Equipment[]>(mockEquipment);
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [currentUser, setCurrentUser] = useState<User | null>(null); // Start with no user logged in
  const [reservations, setReservations] = useState<Reservation[]>(mockReservations);
  const [usageLogs, setUsageLogs] = useState<UsageLog[]>(mockUsageLogs);
  const [waitlist, setWaitlist] = useState<WaitlistEntry[]>([]);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const addReservation = (reservation: Omit<Reservation, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newReservation: Reservation = {
      ...reservation,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    setReservations(prev => [...prev, newReservation]);
  };

  const updateReservation = (id: string, updates: Partial<Reservation>) => {
    setReservations(prev => prev.map(res => 
      res.id === id ? { ...res, ...updates, updatedAt: new Date() } : res
    ));
  };

  const updateEquipment = (id: string, updates: Partial<Equipment>) => {
    setEquipment(prev => prev.map(eq => 
      eq.id === id ? { ...eq, ...updates } : eq
    ));
  };

  const addUsageLog = (log: Omit<UsageLog, 'id'>) => {
    const newLog: UsageLog = {
      ...log,
      id: Date.now().toString()
    };
    setUsageLogs(prev => [...prev, newLog]);
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const addToWaitlist = (entry: Omit<WaitlistEntry, 'id' | 'createdAt'>) => {
    const newEntry: WaitlistEntry = {
      ...entry,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    setWaitlist(prev => [...prev, newEntry]);
  };

  const removeFromWaitlist = (id: string) => {
    setWaitlist(prev => prev.filter(entry => entry.id !== id));
  };

  const value: AppContextType = {
    equipment,
    users,
    currentUser,
    reservations,
    usageLogs,
    waitlist,
    theme,
    setCurrentUser,
    addReservation,
    updateReservation,
    updateEquipment,
    addUsageLog,
    toggleTheme,
    addToWaitlist,
    removeFromWaitlist
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};