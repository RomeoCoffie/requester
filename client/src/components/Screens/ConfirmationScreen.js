import React from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const ConfirmationScreen = ({ onClose }) => {
  return (
    <div className="flex flex-col h-full">
      {/* Header Section - Fixed */}
      <div className="sticky top-0 flex justify-between items-center p-4 border-b w-full bg-white z-10">
        <button 
          onClick={onClose}
          className="text-gray-600 hover:text-gray-800 p-2"
          aria-label="Close modal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
          <span className="text-[#A36404] text-xl">*</span>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Confirmation Content */}
        <div className="flex flex-col items-center justify-start px-4 md:px-6 py-8 md:py-12">
          {/* Success Icon */}
          <div className="mb-6 md:mb-8">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[rgba(163,100,4,0.1)] flex items-center justify-center">
              <CheckCircleIcon sx={{ 
                fontSize: { xs: 32, md: 40 }, 
                color: '#A36404' 
              }} />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-xl md:text-2xl font-bold mb-6 md:mb-8 text-center">
            Submission Confirmation
          </h1>

          {/* Success Message Box */}
          <div className="w-full max-w-md mb-6 md:mb-8">
            <div className="border border-[#A36404] rounded-lg p-4 md:p-5">
              <p className="text-base md:text-lg font-semibold text-[#A36404] text-center">
                Your Wanted request is Successfully submitted
              </p>
            </div>
          </div>

          {/* Additional Information */}
          <div className="text-center text-gray-600 mb-8 max-w-md px-4">
            <p className="text-sm md:text-base mb-2">
              You will receive an email within 24 hours with viewing guide. If any problem please talk to us on whatsapp, email or phone call.
            </p>
            <p className="text-sm md:text-base">
              Detail information will included below.
            </p>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="bg-[rgba(163,100,4,0.1)] text-[#A36404] px-8 md:px-12 py-2.5 md:py-3 rounded-lg text-sm md:text-base font-semibold hover:bg-[rgba(163,100,4,0.2)] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationScreen; 