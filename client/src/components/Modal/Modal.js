import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start md:items-center justify-center"
      onClick={handleBackdropClick}
    >
      <div className="fixed inset-0 bg-black bg-opacity-50" />
      
      <div className="relative bg-white w-full h-full md:h-auto md:max-w-[1000px] md:max-h-[85vh] md:rounded-lg flex flex-col" onClick={e => e.stopPropagation()}>
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal; 