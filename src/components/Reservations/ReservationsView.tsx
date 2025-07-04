import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Calendar, Clock, CheckCircle, XCircle, AlertCircle, Filter, Search, PlayCircle, StopCircle } from 'lucide-react';

const ReservationsView: React.FC = () => {
  const { currentUser, reservations, updateReservation, addUsageLog } = useApp();
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const userReservations = reservations.filter(r => 
    currentUser?.role !== 'student' ? true : r.userId === currentUser?.id
  );

  const filteredReservations = userReservations.filter(reservation => {
    const matchesSearch = reservation.equipmentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reservation.projectTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reservation.userName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || reservation.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleCheckIn = (reservationId: string) => {
    const reservation = reservations.find(r => r.id === reservationId);
    if (!reservation) return;

    updateReservation(reservationId, { status: 'active' });
    
    addUsageLog({
      reservationId,
      equipmentId: reservation.equipmentId,
      userId: reservation.userId,
      checkInTime: new Date(),
      condition: 'good',
      notes: 'Equipment checked in successfully'
    });
  };

  const handleCheckOut = (reservationId: string) => {
    const reservation = reservations.find(r => r.id === reservationId);
    if (!reservation) return;

    updateReservation(reservationId, { status: 'completed' });
    
    // In a real app, you'd show a modal to collect check-out details
    const checkInTime = new Date(reservation.startTime);
    const checkOutTime = new Date();
    const actualDuration = (checkOutTime.getTime() - checkInTime.getTime()) / (1000 * 60 * 60);

    addUsageLog({
      reservationId,
      equipmentId: reservation.equipmentId,
      userId: reservation.userId,
      checkInTime,
      checkOutTime,
      actualDuration,
      condition: 'good',
      notes: 'Equipment checked out successfully'
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'rejected':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'active':
        return <PlayCircle className="h-5 w-5 text-blue-500" />;
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
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
      case 'active':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const canCheckIn = (reservation: any) => {
    return reservation.status === 'approved' && new Date() >= new Date(reservation.startTime);
  };

  const canCheckOut = (reservation: any) => {
    return reservation.status === 'active';
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {currentUser?.role === 'student' ? 'My Reservations' : 'All Reservations'}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {currentUser?.role === 'student' 
              ? 'View and manage your equipment reservations'
              : 'Monitor and manage all laboratory reservations'
            }
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search reservations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-500" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {/* Reservations List */}
      {filteredReservations.length === 0 ? (
        <div className="text-center py-12">
          <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No reservations found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            {currentUser?.role === 'student' 
              ? "You haven't made any reservations yet"
              : "No reservations match your current filters"
            }
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredReservations.map((reservation) => (
            <div key={reservation.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    {getStatusIcon(reservation.status)}
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {reservation.equipmentName}
                    </h3>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(reservation.status)}`}>
                      {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
                    </span>
                  </div>
                  
                  <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                    {reservation.projectTitle}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {reservation.purpose}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                    {currentUser?.role !== 'student' && (
                      <div>
                        <span className="text-gray-500 dark:text-gray-400">User:</span>
                        <span className="ml-2 font-medium text-gray-900 dark:text-white">
                          {reservation.userName}
                        </span>
                      </div>
                    )}
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Start:</span>
                      <span className="ml-2 font-medium text-gray-900 dark:text-white">
                        {formatDate(reservation.startTime)}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Duration:</span>
                      <span className="ml-2 font-medium text-gray-900 dark:text-white">
                        {reservation.duration}h
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Created:</span>
                      <span className="ml-2 font-medium text-gray-900 dark:text-white">
                        {new Date(reservation.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {/* Approval Details */}
                  {Object.keys(reservation.approvals).length > 0 && (
                    <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                        Approval History
                      </h4>
                      <div className="space-y-1">
                        {Object.entries(reservation.approvals).map(([role, approval]) => (
                          <div key={role} className="flex items-center justify-between text-sm">
                            <span className="text-gray-600 dark:text-gray-400 capitalize">
                              {role.replace(/([A-Z])/g, ' $1').toLowerCase()}:
                            </span>
                            <div className="flex items-center space-x-2">
                              {approval.approved ? (
                                <CheckCircle className="h-4 w-4 text-green-500" />
                              ) : (
                                <XCircle className="h-4 w-4 text-red-500" />
                              )}
                              <span className={approval.approved ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                                {approval.approved ? 'Approved' : 'Rejected'}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="mt-4 lg:mt-0 lg:ml-6 flex flex-col space-y-2">
                  {canCheckIn(reservation) && (
                    <button
                      onClick={() => handleCheckIn(reservation.id)}
                      className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                    >
                      <PlayCircle className="h-4 w-4" />
                      <span>Check In</span>
                    </button>
                  )}
                  {canCheckOut(reservation) && (
                    <button
                      onClick={() => handleCheckOut(reservation.id)}
                      className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                    >
                      <StopCircle className="h-4 w-4" />
                      <span>Check Out</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReservationsView;