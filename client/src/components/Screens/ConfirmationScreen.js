import React from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const ConfirmationScreen = ({ onClose }) => {
  return (
    <div className="p-6 text-center">
      <div className="mb-6">
        <CheckCircleIcon 
          className="text-green-500 text-6xl"
        />
      </div>

      <h2 className="text-2xl font-bold mb-4">
        Your Wanted request is Successfully submitted
      </h2>
      
      <p className="text-gray-600 mb-8">
        You will receive an email within 24 hours with viewing guide. If any problem please talk to us on 
        whatsapp, mail or phone call.
        <br />
        Detail information will included below.
      </p>

      <button
        onClick={onClose}
        className="px-8 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
      >
        Close
      </button>
    </div>
  );
};

export default ConfirmationScreen; 