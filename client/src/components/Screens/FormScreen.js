import React, { useState } from 'react';
import { Select, MenuItem, TextField } from '@mui/material';

const FormScreen = ({ onSubmit, onClose }) => {
  const [failedImages, setFailedImages] = useState(new Set());
  const [formData, setFormData] = useState({
    location: '',
    propertyNeed: '',
    aboutYou: '',
    aboutNeed: '',
    name: '',
    email: '',
    whatsapp: '',
    status: ''
  });

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

  const handleImageError = (listingId) => {
    setFailedImages(prev => new Set([...prev, listingId]));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const inputStyle = {
    '& .MuiOutlinedInput-root': {
      borderRadius: '8px',
      backgroundColor: '#fff',
      '& fieldset': {
        borderColor: '#e5e7eb',
      },
      '&:hover fieldset': {
        borderColor: '#A36404',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#A36404',
      },
    },
    '& .MuiInputLabel-root': {
      color: '#6b7280',
      '&.Mui-focused': {
        color: '#A36404',
      },
    },
    '& .MuiOutlinedInput-input': {
      padding: '12px 14px',
    },
    '& .MuiSelect-select': {
      padding: '12px 14px',
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header Section - Fixed */}
      <div className="sticky top-0 flex justify-between items-center p-4 border-b w-full bg-white z-10">
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

          {/* Right Section - Form */}
          <div className="w-full md:w-[60%] p-4 md:p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select
                  value={formData.location}
                  onChange={handleChange}
                  name="location"
                  displayEmpty
                  sx={inputStyle}
                  className="w-full"
                >
                  <MenuItem value="" disabled>Select Location</MenuItem>
                  <MenuItem value="location1">Location 1</MenuItem>
                  <MenuItem value="location2">Location 2</MenuItem>
                </Select>

                <Select
                  value={formData.propertyNeed}
                  onChange={handleChange}
                  name="propertyNeed"
                  displayEmpty
                  sx={inputStyle}
                  className="w-full"
                >
                  <MenuItem value="" disabled>Select Property Need</MenuItem>
                  <MenuItem value="need1">Need 1</MenuItem>
                  <MenuItem value="need2">Need 2</MenuItem>
                </Select>
              </div>

              <TextField
                multiline
                rows={3}
                name="aboutYou"
                value={formData.aboutYou}
                onChange={handleChange}
                placeholder="Tell us a bit about you"
                sx={inputStyle}
                className="w-full"
              />

              <TextField
                multiline
                rows={3}
                name="aboutNeed"
                value={formData.aboutNeed}
                onChange={handleChange}
                placeholder="Tell us a bit about your Need"
                sx={inputStyle}
                className="w-full"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextField
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter Name"
                  sx={inputStyle}
                  className="w-full"
                />

                <TextField
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter Email"
                  type="email"
                  sx={inputStyle}
                  className="w-full"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextField
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleChange}
                  placeholder="Enter WhatsApp"
                  sx={inputStyle}
                  className="w-full"
                />

                <Select
                  value={formData.status}
                  onChange={handleChange}
                  name="status"
                  displayEmpty
                  sx={inputStyle}
                  className="w-full"
                >
                  <MenuItem value="" disabled>Select Status</MenuItem>
                  <MenuItem value="status1">Status 1</MenuItem>
                  <MenuItem value="status2">Status 2</MenuItem>
                </Select>
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white rounded-lg py-2.5 md:py-3 text-sm md:text-base font-semibold hover:bg-opacity-90 transition-colors mt-4 md:mt-6"
              >
                Submit Now
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormScreen; 