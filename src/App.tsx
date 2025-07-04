import React, { useState } from 'react';
import { AppProvider } from './context/AppContext';
import { useApp } from './context/AppContext';
import LoginForm from './components/Auth/LoginForm';
import Header from './components/Layout/Header';
import UserDashboard from './components/Dashboard/UserDashboard';
import EquipmentCatalog from './components/Equipment/EquipmentCatalog';
import ReservationsView from './components/Reservations/ReservationsView';
import AdminDashboard from './components/Admin/AdminDashboard';

const AppContent: React.FC = () => {
  const { currentUser } = useApp();
  const [currentView, setCurrentView] = useState<string>('dashboard');

  // Show login form if no user is authenticated
  if (!currentUser) {
    return <LoginForm />;
  }

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <UserDashboard />;
      case 'equipment':
        return <EquipmentCatalog />;
      case 'reservations':
        return <ReservationsView />;
      case 'admin':
        // Only allow admin access for non-student roles
        return isAdmin(currentUser.role) ? <AdminDashboard /> : <UserDashboard />;
      default:
        return <UserDashboard />;
    }
  };

  const isAdmin = (role: string) => {
    return ['faculty', 'tech-secretary', 'club-lead', 'phd-scholar'].includes(role);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header 
        currentView={currentView} 
        onViewChange={setCurrentView}
        isAdmin={isAdmin(currentUser.role)}
      />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderView()}
      </main>
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;