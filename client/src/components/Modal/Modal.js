import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      
      <div className="relative bg-white w-full max-w-[1000px] rounded-lg overflow-hidden">
        {children}
      </div>
    </div>
  );
};

export default Modal; 