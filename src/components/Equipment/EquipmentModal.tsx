import React from 'react';
import { Equipment } from '../../types';
import { X, MapPin, Users, AlertCircle, CheckCircle, Wrench } from 'lucide-react';

interface EquipmentModalProps {
  equipment: Equipment;
  onClose: () => void;
  onReserve: () => void;
}

const EquipmentModal: React.FC<EquipmentModalProps> = ({ equipment, onClose, onReserve }) => {
  const getStatusColor = (status: Equipment['status']) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'reserved':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'in-use':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'maintenance':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getStatusIcon = (status: Equipment['status']) => {
    switch (status) {
      case 'available':
        return <CheckCircle className="h-4 w-4" />;
      case 'maintenance':
        return <AlertCircle className="h-4 w-4" />;
      case 'in-use':
        return <Wrench className="h-4 w-4" />;
      default:
        return <Users className="h-4 w-4" />;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Equipment Details
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          <div className="aspect-w-16 aspect-h-9 mb-6">
            <img
              src={equipment.imageUrl}
              alt={equipment.name}
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>

          <div className="space-y-6">
            <div>
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {equipment.name}
              </h4>
              <div className="flex items-center space-x-3 mb-3">
                <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(equipment.status)}`}>
                  {getStatusIcon(equipment.status)}
                  <span className="capitalize">{equipment.status}</span>
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                  {equipment.category}
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                {equipment.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-gray-500" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Location: {equipment.location}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-gray-500" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Available: {equipment.availableQuantity}/{equipment.totalQuantity}
                </span>
              </div>
            </div>

            <div>
              <h5 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                Specifications
              </h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {Object.entries(equipment.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {key}:
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h5 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                Safety Requirements
              </h5>
              <ul className="space-y-2">
                {equipment.safetyRequirements.map((requirement, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <AlertCircle className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {requirement}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {equipment.trainingRequired && (
              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                  <span className="text-sm text-yellow-700 dark:text-yellow-300 font-medium">
                    Training Required
                  </span>
                </div>
                <p className="text-sm text-yellow-600 dark:text-yellow-400 mt-1">
                  You must complete safety training before using this equipment.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            Close
          </button>
          <button
            onClick={onReserve}
            disabled={equipment.status === 'maintenance' || equipment.availableQuantity === 0}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed rounded-lg transition-colors"
          >
            Reserve Equipment
          </button>
        </div>
      </div>
    </div>
  );
};

export default EquipmentModal;