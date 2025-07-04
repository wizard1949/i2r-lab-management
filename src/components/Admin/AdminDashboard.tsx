import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import AdminStats from './AdminStats';
import PendingApprovals from './PendingApprovals';
import EquipmentManagement from './EquipmentManagement';
import UserManagement from './UserManagement';
import UsageAnalytics from './UsageAnalytics';
import { Settings, Users, Wrench, BarChart3, CheckCircle, Clock } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const { currentUser, reservations, equipment, users } = useApp();
  const [activeTab, setActiveTab] = useState<string>('overview');

  const pendingCount = reservations.filter(r => r.status === 'pending').length;
  const maintenanceCount = equipment.filter(e => e.status === 'maintenance').length;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'approvals', label: 'Approvals', icon: CheckCircle, badge: pendingCount },
    { id: 'equipment', label: 'Equipment', icon: Wrench, badge: maintenanceCount },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <AdminStats />;
      case 'approvals':
        return <PendingApprovals />;
      case 'equipment':
        return <EquipmentManagement />;
      case 'users':
        return <UserManagement />;
      case 'analytics':
        return <UsageAnalytics />;
      default:
        return <AdminStats />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Admin Dashboard
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage laboratory operations and user requests
          </p>
        </div>
        <div className="flex items-center space-x-2 mt-4 sm:mt-0">
          <span className="text-sm text-gray-500 dark:text-gray-400">Role:</span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 capitalize">
            {currentUser?.role.replace('-', ' ')}
          </span>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                  {tab.badge && tab.badge > 0 && (
                    <span className="ml-2 bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300 text-xs font-medium px-2 py-0.5 rounded-full">
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;