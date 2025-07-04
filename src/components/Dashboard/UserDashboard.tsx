import React from 'react';
import { useApp } from '../../context/AppContext';
import { Calendar, Clock, CheckCircle, AlertCircle, XCircle, TrendingUp } from 'lucide-react';

const UserDashboard: React.FC = () => {
  const { currentUser, reservations, equipment, usageLogs } = useApp();

  const userReservations = reservations.filter(r => r.userId === currentUser?.id);
  const userUsageLogs = usageLogs.filter(log => log.userId === currentUser?.id);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'rejected':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const stats = [
    {
      label: 'Total Reservations',
      value: userReservations.length,
      icon: Calendar,
      color: 'bg-blue-500'
    },
    {
      label: 'Pending Approvals',
      value: userReservations.filter(r => r.status === 'pending').length,
      icon: Clock,
      color: 'bg-yellow-500'
    },
    {
      label: 'Approved Reservations',
      value: userReservations.filter(r => r.status === 'approved').length,
      icon: CheckCircle,
      color: 'bg-green-500'
    },
    {
      label: 'Total Usage Hours',
      value: userUsageLogs.reduce((sum, log) => sum + (log.actualDuration || 0), 0).toFixed(1),
      icon: TrendingUp,
      color: 'bg-purple-500'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Welcome, {currentUser?.name}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Here's your laboratory activity overview
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {stat.label}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {stat.value}
                </p>
              </div>
              <div className={`p-3 rounded-full ${stat.color}`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Reservations */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Recent Reservations
          </h3>
        </div>
        <div className="p-6">
          {userReservations.length === 0 ? (
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">No reservations yet</p>
              <p className="text-sm text-gray-400 dark:text-gray-500">
                Start by browsing the equipment catalog
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {userReservations.slice(0, 5).map((reservation) => (
                <div key={reservation.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center space-x-4">
                    {getStatusIcon(reservation.status)}
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {reservation.equipmentName}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {reservation.projectTitle}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500">
                        {reservation.startTime.toLocaleDateString()} at {reservation.startTime.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(reservation.status)}`}>
                    {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Quick Actions
          </h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button className="flex items-center space-x-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
              <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              <div className="text-left">
                <p className="font-medium text-gray-900 dark:text-white">
                  Browse Equipment
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Find and reserve equipment
                </p>
              </div>
            </button>
            <button className="flex items-center space-x-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
              <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
              <div className="text-left">
                <p className="font-medium text-gray-900 dark:text-white">
                  Check In/Out
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Manage active reservations
                </p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;