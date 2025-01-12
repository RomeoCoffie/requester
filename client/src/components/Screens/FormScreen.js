import React, { useState } from 'react';
import { Select, MenuItem, TextField, ListSubheader, ListItemText } from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Menu from '@mui/material/Menu';
import ErrorScreen from './ErrorScreen';
import { submitForm } from '../../services/api';

const FormScreen = ({ onSubmit, onClose }) => {
  const [failedImages, setFailedImages] = useState(new Set());
  const [locationAnchor, setLocationAnchor] = useState(null);
  const [regionAnchor, setRegionAnchor] = useState(null);
  const [cityAnchor, setCityAnchor] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
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
  const [showError, setShowError] = useState(false);
  const [errors, setErrors] = useState({});

  const locations = {
    Ghana: {
      'Greater Accra': ['Accra', 'Tema', 'East Legon', 'Spintex', 'Teshie', 'Nungua'],
      'Ashanti': ['Kumasi', 'Obuasi', 'Konongo', 'Mampong', 'Ejisu'],
      'Western': ['Takoradi', 'Tarkwa', 'Sekondi', 'Axim', 'Bogoso'],
      'Central': ['Cape Coast', 'Winneba', 'Kasoa', 'Elmina', 'Mankessim'],
      'Eastern': ['Koforidua', 'Nsawam', 'Nkawkaw', 'Akosombo', 'Akim Oda']
    },
    UAE: {
      'Dubai': ['Dubai Marina', 'Downtown Dubai', 'Palm Jumeirah', 'Business Bay', 'JBR'],
      'Abu Dhabi': ['Al Reem Island', 'Yas Island', 'Saadiyat Island', 'Al Raha Beach', 'Khalifa City'],
      'Sharjah': ['Al Majaz', 'Al Khan', 'Al Nahda', 'Al Qasimia', 'Al Taawun'],
      'Ajman': ['Al Jurf', 'Al Rashidiya', 'Al Nuaimia', 'Al Zahra', 'Emirates City'],
      'Ras Al Khaimah': ['Al Hamra', 'Al Marjan Island', 'Al Nakheel', 'Al Qawasim Corniche', 'Al Dhait']
    }
  };

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
    setFormData(prev => {
      const newData = { ...prev, [name]: value };
      
      // Reset dependent fields when country or region changes
      if (name === 'country') {
        newData.region = '';
        newData.city = '';
      } else if (name === 'region') {
        newData.city = '';
      }
      
      return newData;
    });
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Check location
    if (!formData.location) {
      newErrors.location = 'Please select a location';
    }

    // Check property need
    if (!formData.propertyNeed) {
      newErrors.propertyNeed = 'Please select a property need';
    }

    // Check about you
    if (!formData.aboutYou || formData.aboutYou.trim().length < 10) {
      newErrors.aboutYou = 'Please tell us about yourself (minimum 10 characters)';
    }

    // Check about need
    if (!formData.aboutNeed || formData.aboutNeed.trim().length < 10) {
      newErrors.aboutNeed = 'Please describe your need (minimum 10 characters)';
    }

    // Check name
    if (!formData.name || formData.name.trim().length < 2) {
      newErrors.name = 'Please enter your name';
    }

    // Check email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Check WhatsApp
    if (!formData.whatsapp || formData.whatsapp.trim().length < 10) {
      newErrors.whatsapp = 'Please enter a valid WhatsApp number';
    }

    // Check status
    if (!formData.status) {
      newErrors.status = 'Please select a status';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        const response = await submitForm(formData);
        console.log('Submission successful:', response);
        onSubmit(formData); // Proceed to confirmation screen
      } catch (error) {
        console.error('Submission error:', error);
        setShowError(true);
        setErrors(prev => ({
          ...prev,
          submit: error.message
        }));
      }
    } else {
      setShowError(true);
    }
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

  const handleLocationClick = (event) => {
    setLocationAnchor(event.currentTarget);
  };

  const handleCountryClick = (country, event) => {
    event.preventDefault();
    event.stopPropagation();
    setSelectedCountry(country);
    setRegionAnchor(event.currentTarget);
    setLocationAnchor(null);
  };

  const handleRegionClick = (region, event) => {
    event.preventDefault();
    event.stopPropagation();
    setSelectedRegion(region);
    setCityAnchor(event.currentTarget);
    setRegionAnchor(null);
  };

  const handleCityClick = (city) => {
    const fullLocation = `${selectedCountry}, ${selectedRegion}, ${city}`;
    setFormData(prev => ({
      ...prev,
      location: fullLocation
    }));
    setCityAnchor(null);
    setSelectedCountry('');
    setSelectedRegion('');
  };

  const handleClose = () => {
    setLocationAnchor(null);
    setRegionAnchor(null);
    setCityAnchor(null);
    setSelectedCountry('');
    setSelectedRegion('');
  };

  if (showError) {
    return (
      <ErrorScreen
        message="Please fill in all required fields correctly before submitting."
        onRetry={() => setShowError(false)}
      />
    );
  }

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

      {/* Main Content Area */}
      <div className="flex-1 min-h-0">
        {/* Content Container */}
        <div className="h-full flex flex-col md:flex-row">
          {/* Left Section - Images */}
          <div className="w-full md:w-[40%] p-4 md:p-6 bg-white">
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
          <div className="w-full md:w-[60%] h-full overflow-y-auto">
            <div className="p-4 md:p-6">
              <form onSubmit={handleSubmit} className="space-y-4 max-w-[600px] mx-auto pb-6">
                {/* Location and Property Need Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Location Selection with Nested Submenus */}
                  <div>
                    <button
                      type="button"
                      onClick={handleLocationClick}
                      className={`w-full px-4 py-3 text-left border rounded-lg hover:border-[#A36404] transition-colors bg-white ${
                        errors.location ? 'border-red-500' : ''
                      }`}
                    >
                      {formData.location || 'Select Location'}
                    </button>
                    {errors.location && (
                      <p className="mt-1 text-sm text-red-500">{errors.location}</p>
                    )}

                    {/* Country Menu */}
                    <Menu
                      anchorEl={locationAnchor}
                      open={Boolean(locationAnchor)}
                      onClose={handleClose}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                      }}
                      PaperProps={{
                        sx: { 
                          width: 'auto',
                          maxHeight: 400,
                        }
                      }}
                    >
                      {Object.keys(locations).map((country) => (
                        <MenuItem
                          key={country}
                          onClick={(e) => handleCountryClick(country, e)}
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            minWidth: 200
                          }}
                        >
                          <ListItemText primary={country} />
                          <KeyboardArrowRightIcon />
                        </MenuItem>
                      ))}
                    </Menu>

                    {/* Region Menu */}
                    <Menu
                      anchorEl={regionAnchor}
                      open={Boolean(regionAnchor)}
                      onClose={handleClose}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                      }}
                      PaperProps={{
                        sx: { 
                          width: 'auto',
                          maxHeight: 400,
                        }
                      }}
                    >
                      {selectedCountry && Object.keys(locations[selectedCountry]).map((region) => (
                        <MenuItem
                          key={region}
                          onClick={(e) => handleRegionClick(region, e)}
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            minWidth: 200
                          }}
                        >
                          <ListItemText primary={region} />
                          <KeyboardArrowRightIcon />
                        </MenuItem>
                      ))}
                    </Menu>

                    {/* City Menu */}
                    <Menu
                      anchorEl={cityAnchor}
                      open={Boolean(cityAnchor)}
                      onClose={handleClose}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                      }}
                      PaperProps={{
                        sx: { 
                          width: 'auto',
                          maxHeight: 400,
                        }
                      }}
                    >
                      {selectedCountry && selectedRegion && locations[selectedCountry][selectedRegion].map((city) => (
                        <MenuItem
                          key={city}
                          onClick={() => handleCityClick(city)}
                          sx={{
                            minWidth: 200
                          }}
                        >
                          <ListItemText primary={city} />
                        </MenuItem>
                      ))}
                    </Menu>
                  </div>

                  {/* Property Need Selection */}
                  <div>
                    <Select
                      value={formData.propertyNeed}
                      onChange={handleChange}
                      name="propertyNeed"
                      displayEmpty
                      sx={{
                        ...inputStyle,
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: errors.propertyNeed ? '#ef4444' : '#e5e7eb',
                        },
                      }}
                      className="w-full"
                    >
                      <MenuItem value="" disabled>Select Property Need</MenuItem>
                      <MenuItem value="need1">Short-Let</MenuItem>
                      <MenuItem value="need2">Rent Residential</MenuItem>
                      <MenuItem value="need3">Rent Commercial</MenuItem>
                      <MenuItem value="need4">Buy Residential</MenuItem>
                      <MenuItem value="need5">Buy Commercial</MenuItem>
                      <MenuItem value="need6">Invest</MenuItem>
                      <MenuItem value="need7">Other</MenuItem>
                    </Select>
                    {errors.propertyNeed && (
                      <p className="mt-1 text-sm text-red-500">{errors.propertyNeed}</p>
                    )}
                  </div>
                </div>

                <div>
                  <TextField
                    multiline
                    rows={3}
                    name="aboutYou"
                    value={formData.aboutYou}
                    onChange={handleChange}
                    placeholder="Tell us a bit about you"
                    sx={{
                      ...inputStyle,
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: errors.aboutYou ? '#ef4444' : '#e5e7eb',
                      },
                    }}
                    className="w-full"
                  />
                  {errors.aboutYou && (
                    <p className="mt-1 text-sm text-red-500">{errors.aboutYou}</p>
                  )}
                </div>

                <div>
                  <TextField
                    multiline
                    rows={3}
                    name="aboutNeed"
                    value={formData.aboutNeed}
                    onChange={handleChange}
                    placeholder="Tell us a bit about your Need"
                    sx={{
                      ...inputStyle,
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: errors.aboutNeed ? '#ef4444' : '#e5e7eb',
                      },
                    }}
                    className="w-full"
                  />
                  {errors.aboutNeed && (
                    <p className="mt-1 text-sm text-red-500">{errors.aboutNeed}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <TextField
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter Name"
                      sx={{
                        ...inputStyle,
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: errors.name ? '#ef4444' : '#e5e7eb',
                        },
                      }}
                      className="w-full"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <TextField
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter Email"
                      type="email"
                      sx={{
                        ...inputStyle,
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: errors.email ? '#ef4444' : '#e5e7eb',
                        },
                      }}
                      className="w-full"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <TextField
                      name="whatsapp"
                      value={formData.whatsapp}
                      onChange={handleChange}
                      placeholder="Enter WhatsApp"
                      sx={{
                        ...inputStyle,
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: errors.whatsapp ? '#ef4444' : '#e5e7eb',
                        },
                      }}
                      className="w-full"
                    />
                    {errors.whatsapp && (
                      <p className="mt-1 text-sm text-red-500">{errors.whatsapp}</p>
                    )}
                  </div>

                  <div>
                    <Select
                      value={formData.status}
                      onChange={handleChange}
                      name="status"
                      displayEmpty
                      sx={{
                        ...inputStyle,
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: errors.status ? '#ef4444' : '#e5e7eb',
                        },
                      }}
                      className="w-full"
                    >
                      <MenuItem value="" disabled>Select Status</MenuItem>
                      <MenuItem value="status1">Not on the market (off-market)</MenuItem>
                      <MenuItem value="status2">1-3 months on the market</MenuItem>
                      <MenuItem value="status3">3-6 months on the market</MenuItem>
                      <MenuItem value="status4">6+ months on the market</MenuItem>
                    </Select>
                    {errors.status && (
                      <p className="mt-1 text-sm text-red-500">{errors.status}</p>
                    )}
                  </div>
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
    </div>
  );
};

export default FormScreen; 