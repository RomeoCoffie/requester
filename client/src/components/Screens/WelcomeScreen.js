import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const WelcomeScreen = ({ onNext, onClose }) => {
  const [currentPair, setCurrentPair] = useState(0);
  const [failedImages, setFailedImages] = useState(new Set());

  const listings = [
    { 
      id: 1, 
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=320&auto=format&fit=crop',
      fallback: 'https://via.placeholder.com/400x320/f5f5f5/a36404?text=Luxury+Home',
      alt: 'Modern luxury home with pool'
    },
    { 
      id: 2, 
      image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=400&h=320&auto=format&fit=crop',
      fallback: 'https://via.placeholder.com/400x320/f5f5f5/a36404?text=Bedroom',
      alt: 'Modern bedroom interior'
    },
    { 
      id: 3, 
      image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=400&h=320&auto=format&fit=crop',
      fallback: 'https://via.placeholder.com/400x320/f5f5f5/a36404?text=Living+Room',
      alt: 'Luxury living room'
    },
    { 
      id: 4, 
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=320&auto=format&fit=crop',
      fallback: 'https://via.placeholder.com/400x320/f5f5f5/a36404?text=Modern+Home',
      alt: 'Modern house exterior'
    }
  ];

  const keywords = [
    { 
      text: 'Any Request',
      icon: (
        <div className="w-5 h-5 rounded bg-[rgba(163,100,4,0.25)] flex items-center justify-center">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 6L9 17L4 12" stroke="#A36404" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      )
    },
    { 
      text: 'Any Property',
      icon: (
        <div className="w-5 h-5 rounded bg-[rgba(163,100,4,0.25)] flex items-center justify-center">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 6L9 17L4 12" stroke="#A36404" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      )
    },
    { 
      text: 'Any Person',
      icon: (
        <div className="w-5 h-5 rounded bg-[rgba(163,100,4,0.25)] flex items-center justify-center">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 6L9 17L4 12" stroke="#A36404" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      )
    },
    { 
      text: 'Any Location',
      icon: (
        <div className="w-5 h-5 rounded bg-[rgba(163,100,4,0.25)] flex items-center justify-center">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 6L9 17L4 12" stroke="#A36404" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      )
    },
    { 
      text: 'Any Service',
      icon: (
        <div className="w-5 h-5 rounded bg-[rgba(163,100,4,0.25)] flex items-center justify-center">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 6L9 17L4 12" stroke="#A36404" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      )
    },
    { 
      text: 'Any Business',
      icon: (
        <div className="w-5 h-5 rounded bg-[rgba(163,100,4,0.25)] flex items-center justify-center">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 6L9 17L4 12" stroke="#A36404" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      )
    }
  ];

  const reviews = [
    { 
      id: 1, 
      name: "Nicole McFear", 
      rating: 5,
      image: "https://randomuser.me/api/portraits/women/32.jpg",
      text: "Dealing at a different property was like having the comfort of home with their warm consideration. It really my searching job and brought best results!"
    },
    { 
      id: 2, 
      name: "Edward Arthur", 
      rating: 5,
      image: "https://randomuser.me/api/portraits/men/45.jpg",
      text: "Our family process as a member did a very perfect approach, but friends, and reliable. It felt like a real home away from home!"
    },
    { 
      id: 3, 
      name: "Mike Johnson", 
      rating: 5,
      image: "https://randomuser.me/api/portraits/men/22.jpg",
      text: "Exceptional service and attention to detail. Highly recommended for anyone looking for property solutions..."
    }
  ];

  const handleImageError = (listingId) => {
    setFailedImages(prev => new Set([...prev, listingId]));
  };

  const nextSlide = () => {
    setCurrentPair((prev) => (prev + 1) % Math.ceil(reviews.length / 2));
  };

  const prevSlide = () => {
    setCurrentPair((prev) => (prev - 1 + Math.ceil(reviews.length / 2)) % Math.ceil(reviews.length / 2));
  };

  const getCurrentPairOfReviews = () => {
    const startIndex = currentPair * 2;
    return reviews.slice(startIndex, startIndex + 2);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header Section - Fixed */}
      <div className="sticky top-0 flex justify-between items-center p-4 border-b w-full bg-white z-10">
        <button 
          onClick={() => onClose()}
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
        {/* Main Content Section */}
        <div className="flex flex-col md:flex-row">
          {/* Left Section - Images */}
          <div className="w-full md:w-[40%] p-4 md:p-6">
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              {listings.map((listing) => (
                <div 
                  key={listing.id} 
                  className="aspect-square rounded-lg overflow-hidden bg-[#f5f5f5] relative"
                >
                  <img 
                    src={failedImages.has(listing.id) ? listing.fallback : listing.image}
                    alt={listing.alt}
                    onError={() => handleImageError(listing.id)}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right Section - Content */}
          <div className="w-full md:w-[60%] p-4 md:p-6">
            {/* Title and Description */}
            <div className="mb-6 md:mb-8">
              <h1 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Wanted Request</h1>
              <p className="text-gray-600 text-sm md:text-base">
                Unsure if our wide range of services is suitable for you? Do you have 
                a different need than what is shared on our site? Not to worry just 
                do wanted request and we will help you with it.
              </p>
            </div>

            {/* Keywords Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-6 md:mb-8">
              {keywords.map((keyword, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-2 p-2"
                >
                  {keyword.icon}
                  <span className="text-xs md:text-sm text-[#A36404]">{keyword.text}</span>
                </div>
              ))}
            </div>

            {/* Reviews Section */}
            <div className="mb-6 md:mb-8">
              <h2 className="text-base md:text-lg font-semibold mb-4 md:mb-6 text-center">
                See what Others are saying about Homestyle Realty
              </h2>
              <div className="relative">
                <div className="flex items-center">
                  <IconButton 
                    onClick={prevSlide} 
                    size="small"
                    className="hover:text-[#A36404] transition-colors"
                  >
                    <ChevronLeftIcon />
                  </IconButton>
                  <div className="flex-1 px-2 md:px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      {getCurrentPairOfReviews().map((review) => (
                        <div key={review.id} className="flex flex-col items-center text-center">
                          <div 
                            className="w-10 h-10 md:w-12 md:h-12 rounded-full mb-2 md:mb-3 flex-shrink-0 overflow-hidden"
                          >
                            <img 
                              src={review.image} 
                              alt={review.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <div className="flex flex-col items-center gap-1 mb-2">
                              <span className="font-medium text-sm md:text-base">{review.name}</span>
                              <div className="flex">
                                {[...Array(review.rating)].map((_, i) => (
                                  <span key={i} className="text-sm md:text-base" style={{ color: '#A36404' }}>★</span>
                                ))}
                              </div>
                            </div>
                            <p className="text-xs md:text-sm text-gray-600 max-w-[250px]">{review.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <IconButton 
                    onClick={nextSlide} 
                    size="small"
                    className="hover:text-[#A36404] transition-colors"
                  >
                    <ChevronRightIcon />
                  </IconButton>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="flex justify-center">
              <button
                onClick={onNext}
                className="bg-black text-white rounded-lg py-2.5 md:py-3 px-8 md:px-10 text-sm md:text-base font-semibold hover:bg-opacity-90 transition-colors mb-4"
              >
                Do Tailored Request
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen; 