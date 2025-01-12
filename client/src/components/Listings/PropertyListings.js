import React, { useState, useEffect } from 'react';
import { getListings } from '../../services/api';
import { CircularProgress } from '@mui/material';

const PropertyListings = () => {
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const data = await getListings();
        setListings(data);
      } catch (error) {
        setError('Failed to load listings');
      } finally {
        setIsLoading(false);
      }
    };

    fetchListings();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-48">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-600 text-center p-4">
        {error}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      {listings.map((listing) => (
        <div 
          key={listing.id} 
          className="relative aspect-square rounded-lg overflow-hidden"
        >
          <img
            src={listing.image_url}
            alt={listing.title}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  );
};

export default PropertyListings; 