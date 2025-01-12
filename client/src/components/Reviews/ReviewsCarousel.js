import React, { useState } from 'react';
import { IconButton, Avatar } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import StarIcon from '@mui/icons-material/Star';

const ReviewsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const reviews = [
    {
      id: 1,
      rating: 5,
      text: "Having a great experience with Homestyle Realty. The team is very professional and helpful.",
      author: "Sarah M.",
      avatar: "/avatars/sarah.jpg"
    },
    {
      id: 2,
      rating: 4,
      text: "Excellent service and communication throughout the process.",
      author: "John D.",
      avatar: "/avatars/john.jpg"
    }
  ];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative bg-gray-50 rounded-xl p-6">
      <div className="overflow-hidden">
        <div 
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {reviews.map((review) => (
            <div 
              key={review.id}
              className="w-full flex-shrink-0"
            >
              <div className="flex items-center gap-4 mb-4">
                <Avatar src={review.avatar} alt={review.author} />
                <div>
                  <p className="font-semibold">{review.author}</p>
                  <div className="flex gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <StarIcon key={i} className="text-yellow-400 w-4 h-4" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600">{review.text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center gap-2 mt-4">
        <IconButton 
          onClick={handlePrev}
          className="bg-white shadow-md hover:bg-gray-50"
        >
          <ChevronLeftIcon />
        </IconButton>
        <IconButton 
          onClick={handleNext}
          className="bg-white shadow-md hover:bg-gray-50"
        >
          <ChevronRightIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default ReviewsCarousel; 