import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle, XCircle, Clock, User, Calendar, MessageSquare } from 'lucide-react';

const PendingApprovals: React.FC = () => {
  const { reservations, updateReservation, currentUser } = useApp();

  const pendingReservations = reservations.filter(r => r.status === 'pending');

  const handleApproval = (reservationId: string, approved: boolean, comment: string = '') => {
    const reservation = reservations.find(r => r.id === reservationId);
    if (!reservation || !currentUser) return;

    const approvalKey = currentUser.role === 'tech-secretary' ? 'techSecretary' :
                       currentUser.role === 'club-lead' ? 'clubLead' :
                       currentUser.role === 'faculty' ? 'faculty' :
                       currentUser.role === 'phd-scholar' ? 'phdScholar' : null;

    if (!approvalKey) return;

    const updatedApprovals = {
      ...reservation.approvals,
      [approvalKey]: {
        approved,
        comment,
        date: new Date()
      }
    };

    // Determine if the reservation should be approved or rejected
    const hasRequiredApprovals = () => {
      // Basic approval logic - can be customized based on equipment type, user role, etc.
      if (currentUser.role === 'faculty') return approved;
      if (currentUser.role === 'tech-secretary') return approved;
      return false;
    };

    const newStatus = approved && hasRequiredApprovals() ? 'approved' : 
                     !approved ? 'rejected' : 'pending';

    updateReservation(reservationId, {
      status: newStatus,
      approvals: updatedApprovals
    });
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

  if (pendingReservations.length === 0) {
    return (
      <div className="text-center py-12">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          All Caught Up!
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          No pending reservations require your approval at this time.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Pending Approvals ({pendingReservations.length})
        </h3>
        <div className="flex items-center space-x-2">
          <Clock className="h-4 w-4 text-yellow-500" />
          <span className="text-sm text-yellow-600 dark:text-yellow-400">
            Requires attention
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {pendingReservations.map((reservation) => (
          <ReservationApprovalCard
            key={reservation.id}
            reservation={reservation}
            onApprove={(comment) => handleApproval(reservation.id, true, comment)}
            onReject={(comment) => handleApproval(reservation.id, false, comment)}
          />
        ))}
      </div>
    </div>
  );
};

interface ReservationApprovalCardProps {
  reservation: any;
  onApprove: (comment: string) => void;
  onReject: (comment: string) => void;
}

const ReservationApprovalCard: React.FC<ReservationApprovalCardProps> = ({
  reservation,
  onApprove,
  onReject
}) => {
  const [comment, setComment] = React.useState('');
  const [showCommentField, setShowCommentField] = React.useState(false);
  const [actionType, setActionType] = React.useState<'approve' | 'reject' | null>(null);

  const handleAction = (type: 'approve' | 'reject') => {
    setActionType(type);
    setShowCommentField(true);
  };

  const submitAction = () => {
    if (actionType === 'approve') {
      onApprove(comment);
    } else if (actionType === 'reject') {
      onReject(comment);
    }
    setComment('');
    setShowCommentField(false);
    setActionType(null);
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

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
              {reservation.equipmentName}
            </h4>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
              <Clock className="h-3 w-3 mr-1" />
              Pending
            </span>
          </div>
          <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">
            {reservation.projectTitle}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            {reservation.purpose}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-sm">
            <User className="h-4 w-4 text-gray-500" />
            <span className="text-gray-600 dark:text-gray-400">Requested by:</span>
            <span className="font-medium text-gray-900 dark:text-white">
              {reservation.userName}
            </span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <Calendar className="h-4 w-4 text-gray-500" />
            <span className="text-gray-600 dark:text-gray-400">Department:</span>
            <span className="font-medium text-gray-900 dark:text-white">
              {reservation.userDepartment}
            </span>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-sm">
            <Calendar className="h-4 w-4 text-gray-500" />
            <span className="text-gray-600 dark:text-gray-400">Start:</span>
            <span className="font-medium text-gray-900 dark:text-white">
              {formatDate(reservation.startTime)}
            </span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <Clock className="h-4 w-4 text-gray-500" />
            <span className="text-gray-600 dark:text-gray-400">Duration:</span>
            <span className="font-medium text-gray-900 dark:text-white">
              {reservation.duration} hours
            </span>
          </div>
        </div>
      </div>

      {showCommentField && (
        <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <MessageSquare className="inline h-4 w-4 mr-1" />
            Add comment {actionType === 'reject' ? '(required for rejection)' : '(optional)'}
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
            placeholder="Enter your comment..."
          />
          <div className="flex justify-end space-x-2 mt-3">
            <button
              onClick={() => {
                setShowCommentField(false);
                setActionType(null);
                setComment('');
              }}
              className="px-3 py-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
            >
              Cancel
            </button>
            <button
              onClick={submitAction}
              disabled={actionType === 'reject' && !comment.trim()}
              className={`px-4 py-2 text-sm font-medium rounded-lg ${
                actionType === 'approve'
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : 'bg-red-600 hover:bg-red-700 text-white'
              } disabled:bg-gray-400 disabled:cursor-not-allowed`}
            >
              {actionType === 'approve' ? 'Approve' : 'Reject'}
            </button>
          </div>
        </div>
      )}

      {!showCommentField && (
        <div className="flex justify-end space-x-3">
          <button
            onClick={() => handleAction('reject')}
            className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 border border-red-200 dark:border-red-800 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          >
            <XCircle className="h-4 w-4" />
            <span>Reject</span>
          </button>
          <button
            onClick={() => handleAction('approve')}
            className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 rounded-lg transition-colors"
          >
            <CheckCircle className="h-4 w-4" />
            <span>Approve</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default PendingApprovals;