import React from 'react';
import { useApp } from '../../context/AppContext';
import { Calendar, Clock, CheckCircle, XCircle, AlertTriangle, TrendingUp, Users, Wrench } from 'lucide-react';

const AdminStats: React.FC = () => {
  const { reservations, equipment, users, usageLogs } = useApp();

  const totalReservations = reservations.length;
  const pendingReservations = reservations.filter(r => r.status === 'pending').length;
  const approvedReservations = reservations.filter(r => r.status === 'approved').length;
  const rejectedReservations = reservations.filter(r => r.status === 'rejected').length;
  
  const totalEquipment = equipment.length;
  const availableEquipment = equipment.filter(e => e.status === 'available').length;
  const maintenanceEquipment = equipment.filter(e => e.status === 'maintenance').length;
  const inUseEquipment = equipment.filter(e => e.status === 'in-use').length;

  const totalUsers = users.length;
  const studentUsers = users.filter(u => u.role === 'student').length;
  const staffUsers = users.filter(u => u.role !== 'student').length;

  const totalUsageHours = usageLogs.reduce((sum, log) => sum + (log.actualDuration || 0), 0);

  const stats = [
    {
      title: 'Total Reservations',
      value: totalReservations,
      icon: Calendar,
      color: 'bg-blue-500',
      change: '+12%',
      changeType: 'increase'
    },
    {
      title: 'Pending Approvals',
      value: pendingReservations,
      icon: Clock,
      color: 'bg-yellow-500',
      change: `${pendingReservations} waiting`,
      changeType: 'neutral'
    },
    {
      title: 'Active Users',
      value: totalUsers,
      icon: Users,
      color: 'bg-green-500',
      change: '+3 this week',
      changeType: 'increase'
    },
    {
      title: 'Equipment Available',
      value: `${availableEquipment}/${totalEquipment}`,
      icon: Wrench,
      color: 'bg-purple-500',
      change: `${maintenanceEquipment} in maintenance`,
      changeType: 'neutral'
    }
  ];

  const recentActivity = [
    {
      user: 'John Doe',
      action: 'Reserved Ultimaker S3 3D Printer',
      time: '2 minutes ago',
      status: 'pending'
    },
    {
      user: 'Sarah Johnson',
      action: 'Approved reservation for CNC Machine',
      time: '15 minutes ago',
      status: 'approved'
    },
    {
      user: 'Mike Chen',
      action: 'Completed maintenance on Oscilloscope',
      time: '1 hour ago',
      status: 'completed'
    },
    {
      user: 'Emma Wilson',
      action: 'Submitted safety training completion',
      time: '2 hours ago',
      status: 'completed'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'approved':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'completed':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.title} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                    {stat.value}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                    {stat.change}
                  </p>
                </div>
                <div className={`p-3 rounded-full ${stat.color}`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Equipment Status Overview */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Equipment Status
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Available</span>
              </div>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {availableEquipment} items
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">In Use</span>
              </div>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {inUseEquipment} items
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Reserved</span>
              </div>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {equipment.filter(e => e.status === 'reserved').length} items
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Maintenance</span>
              </div>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {maintenanceEquipment} items
              </span>
            </div>
          </div>
        </div>

        {/* User Statistics */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            User Statistics
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Total Users</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {totalUsers}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Students</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {studentUsers}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Staff</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {staffUsers}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Total Usage Hours</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {totalUsageHours.toFixed(1)}h
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Recent Activity
        </h3>
        <div className="space-y-4">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {activity.user}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {activity.action}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(activity.status)}`}>
                  {activity.status}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-500">
                  {activity.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminStats;