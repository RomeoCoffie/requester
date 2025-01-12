import React, { useState } from 'react';
import Modal from './components/Modal/Modal';
import WelcomeScreen from './components/Screens/WelcomeScreen';
import FormScreen from './components/Screens/FormScreen';
import ConfirmationScreen from './components/Screens/ConfirmationScreen';

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [formData, setFormData] = useState({});

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setCurrentScreen('welcome');
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentScreen('welcome');
  };

  const renderModalContent = () => {
    switch (currentScreen) {
      case 'welcome':
        return (
          <WelcomeScreen 
            onNext={() => setCurrentScreen('form')}
            onClose={handleCloseModal}
          />
        );
      case 'form':
        return (
          <FormScreen 
            onSubmit={(data) => {
              setFormData(data);
              setCurrentScreen('confirmation');
            }}
            onClose={handleCloseModal}
          />
        );
      case 'confirmation':
        return (
          <ConfirmationScreen 
            onClose={handleCloseModal}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <button
        onClick={handleOpenModal}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Submit Wanted Request
      </button>

      <Modal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal}
      >
        {renderModalContent()}
      </Modal>
    </div>
  );
};

export default App; 