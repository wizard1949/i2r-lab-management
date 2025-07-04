import React from 'react';
import { useApp } from '../../context/AppContext';
import { BarChart3, TrendingUp, Clock, Users, Calendar } from 'lucide-react';

const UsageAnalytics: React.FC = () => {
  const { equipment, reservations, usageLogs, users } = useApp();

  // Calculate analytics data
  const totalReservations = reservations.length;
  const completedReservations = usageLogs.length;
  const totalUsageHours = usageLogs.reduce((sum, log) => sum + (log.actualDuration || 0), 0);
  const averageUsagePerReservation = completedReservations > 0 ? totalUsageHours / completedReservations : 0;

  // Equipment usage statistics
  const equipmentUsage = equipment.map(eq => {
    const eqReservations = reservations.filter(r => r.equipmentId === eq.id);
    const eqUsageLogs = usageLogs.filter(log => log.equipmentId === eq.id);
    const totalHours = eqUsageLogs.reduce((sum, log) => sum + (log.actualDuration || 0), 0);
    
    return {
      name: eq.name,
      reservations: eqReservations.length,
      hours: totalHours,
      category: eq.category
    };
  });

  // Most popular equipment
  const popularEquipment = [...equipmentUsage]
    .sort((a, b) => b.reservations - a.reservations)
    .slice(0, 5);

  // Department usage
  const departmentUsage = users.reduce((acc, user) => {
    const userReservations = reservations.filter(r => r.userId === user.id);
    const userUsage = usageLogs.filter(log => log.userId === user.id);
    const totalHours = userUsage.reduce((sum, log) => sum + (log.actualDuration || 0), 0);
    
    if (!acc[user.department]) {
      acc[user.department] = { reservations: 0, hours: 0 };
    }
    acc[user.department].reservations += userReservations.length;
    acc[user.department].hours += totalHours;
    
    return acc;
  }, {} as Record<string, { reservations: number; hours: number }>);

  // Recent trends (last 30 days)
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
  const recentReservations = reservations.filter(r => r.createdAt > thirtyDaysAgo);
  const recentUsage = usageLogs.filter(log => log.checkInTime > thirtyDaysAgo);

  const weeklyData = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const startOfDay = new Date(date.setHours(0, 0, 0, 0));
    const endOfDay = new Date(date.setHours(23, 59, 59, 999));
    
    const dayReservations = recentReservations.filter(r => 
      r.createdAt >= startOfDay && r.createdAt <= endOfDay
    );
    
    weeklyData.push({
      day: date.toLocaleDateString('en-US', { weekday: 'short' }),
      reservations: dayReservations.length
    });
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        Usage Analytics & Reports
      </h3>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Total Reservations
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {totalReservations}
              </p>
            </div>
            <div className="p-3 rounded-full bg-blue-500">
              <Calendar className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Total Usage Hours
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {totalUsageHours.toFixed(1)}
              </p>
            </div>
            <div className="p-3 rounded-full bg-green-500">
              <Clock className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Average Usage
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {averageUsagePerReservation.toFixed(1)}h
              </p>
            </div>
            <div className="p-3 rounded-full bg-purple-500">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Active Users
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {users.length}
              </p>
            </div>
            <div className="p-3 rounded-full bg-orange-500">
              <Users className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Most Popular Equipment */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Most Popular Equipment
          </h4>
          <div className="space-y-4">
            {popularEquipment.map((item, index) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-blue-600 dark:text-blue-300">
                      {index + 1}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 capitalize">
                      {item.category}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {item.reservations} reservations
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    {item.hours.toFixed(1)}h total
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Department Usage */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Usage by Department
          </h4>
          <div className="space-y-4">
            {Object.entries(departmentUsage).map(([department, data]) => (
              <div key={department} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {department}
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {data.reservations} reservations
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{
                      width: `${Math.min((data.reservations / totalReservations) * 100, 100)}%`
                    }}
                  />
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  {data.hours.toFixed(1)} hours total usage
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Weekly Reservations Trend */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Weekly Reservations Trend
        </h4>
        <div className="flex items-end justify-between h-32 space-x-2">
          {weeklyData.map((day, index) => (
            <div key={index} className="flex flex-col items-center flex-1">
              <div
                className="bg-blue-500 rounded-t w-full transition-all duration-300 hover:bg-blue-600"
                style={{
                  height: `${Math.max((day.reservations / Math.max(...weeklyData.map(d => d.reservations))) * 100, 10)}%`
                }}
              />
              <span className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                {day.day}
              </span>
              <span className="text-xs text-gray-400 dark:text-gray-600">
                {day.reservations}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Export Options */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Export Reports
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center justify-center space-x-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
            <BarChart3 className="h-4 w-4" />
            <span>Usage Report</span>
          </button>
          <button className="flex items-center justify-center space-x-2 px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
            <Calendar className="h-4 w-4" />
            <span>Reservations Report</span>
          </button>
          <button className="flex items-center justify-center space-x-2 px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors">
            <Users className="h-4 w-4" />
            <span>User Report</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UsageAnalytics;