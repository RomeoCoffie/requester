import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const WelcomeScreen = ({ onNext, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const listings = [
    { id: 1, image: 'https://via.placeholder.com/400x320' },
    { id: 2, image: 'https://via.placeholder.com/400x320' },
    { id: 3, image: 'https://via.placeholder.com/400x320' },
    { id: 4, image: 'https://via.placeholder.com/400x320' }
  ];

  const keywords = [
    { icon: '📄', text: 'Any Request' },
    { icon: '🏠', text: 'Any Property' },
    { icon: '👤', text: 'Any Person' },
    { icon: '📍', text: 'Any Location' },
    { icon: '🔧', text: 'Any Service' },
    { icon: '💼', text: 'Any Business' }
  ];

  const reviews = [
    { 
      id: 1, 
      name: 'James Alex', 
      rating: 5, 
      text: 'This is a perfect fit and choice for me because the team is helpful and knowledgeable at what they do and clearly...'
    },
    { 
      id: 2, 
      name: 'Sarah Smith', 
      rating: 4, 
      text: 'The best property agency I\'ve dealt with so far. The staff is very cooperative, and they know what they\'re doing...'
    },
    { 
      id: 3, 
      name: 'Mike Johnson', 
      rating: 5, 
      text: 'Exceptional service and attention to detail. Highly recommended for anyone looking for property solutions...'
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % reviews.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <div className="bg-white">
      {/* Header Section */}
      <div className="flex justify-between items-center p-4 border-b w-full">
        <button 
          onClick={onClose}
          className="text-gray-600 hover:text-gray-800"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
          <span className="text-[#A36404] text-xl">*</span>
        </div>
      </div>

      {/* Main Content Section with 40/60 split */}
      <div className="flex">
        {/* Left Section - 40% */}
        <div className="w-[40%] p-6">
          <div className="grid grid-cols-2 gap-4">
            {listings.map((listing) => (
              <div key={listing.id} className="aspect-square rounded-lg overflow-hidden">
                <img 
                  src={listing.image} 
                  alt={`Listing ${listing.id}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Section - 60% */}
        <div className="w-[60%] p-6">
          {/* Title and Description */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-4">Wanted Request</h1>
            <p className="text-gray-600">
              Unsure if our wide range of services is suitable for you? Do you have 
              a different need than what is shared on our site? Not to worry just 
              do wanted request and we will help you with it.
            </p>
          </div>

          {/* Keywords Grid */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {keywords.map((keyword, index) => (
              <div 
                key={index} 
                className="flex items-center gap-2 p-3 rounded-lg"
                style={{ backgroundColor: 'rgba(163, 100, 4, 0.25)' }}
              >
                <span>{keyword.icon}</span>
                <span className="text-sm" style={{ color: '#A36404' }}>{keyword.text}</span>
              </div>
            ))}
          </div>

          {/* Reviews Section */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">
              See what Others are saying about Homestyle Realty
            </h2>
            <div className="relative">
              <div className="flex items-center">
                <IconButton onClick={prevSlide} size="small">
                  <ChevronLeftIcon />
                </IconButton>
                <div className="flex-1 px-4">
                  <div className="flex items-start gap-4">
                    <div 
                      className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center"
                      style={{ backgroundColor: 'rgba(163, 100, 4, 0.25)' }}
                    >
                      {reviews[currentSlide].name.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{reviews[currentSlide].name}</span>
                        <div className="flex">
                          {[...Array(reviews[currentSlide].rating)].map((_, i) => (
                            <span key={i} style={{ color: '#A36404' }}>★</span>
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">{reviews[currentSlide].text}</p>
                    </div>
                  </div>
                </div>
                <IconButton onClick={nextSlide} size="small">
                  <ChevronRightIcon />
                </IconButton>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <button
            onClick={onNext}
            className="w-full bg-black text-white rounded-lg py-3 font-semibold hover:bg-opacity-90 transition-colors"
          >
            Do Tailored Request
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen; 