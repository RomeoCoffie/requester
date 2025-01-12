import React from 'react';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const ErrorScreen = ({ message, onRetry }) => {
  return (
    <div className="p-6 text-center">
      <div className="mb-6">
        <ErrorOutlineIcon 
          className="text-red-500 text-6xl"
        />
      </div>

      <h2 className="text-2xl font-bold mb-4">
        Submission Failed
      </h2>
      
      <p className="text-gray-600 mb-8">
        {message || 'There was an error processing your request. Please try again.'}
      </p>

      <button
        onClick={onRetry}
        className="px-8 py-3 bg-black text-white rounded-lg hover:bg-gray-900 transition-colors"
      >
        Try Again
      </button>
    </div>
  );
};

export default ErrorScreen; 