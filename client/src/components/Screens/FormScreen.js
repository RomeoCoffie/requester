import React, { useState } from 'react';
import { TextField, MenuItem } from '@mui/material';
import PropertyListings from '../Listings/PropertyListings';
import { validateForm } from '../../utils/validation';
import { submitRequest } from '../../services/api';

const FormScreen = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    location: '',
    propertyNeed: '',
    name: '',
    email: '',
    whatsapp: '',
    about: '',
    need: '',
    status: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);
    
    const validation = validateForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsLoading(true);
    try {
      const response = await submitRequest(formData);
      onSubmit(response);
    } catch (error) {
      setSubmitError(error.message || 'Failed to submit request. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <PropertyListings />
      </div>

      {submitError && (
        <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-lg">
          {submitError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TextField
            select
            variant="outlined"
            label="Select Location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            error={!!errors.location}
            helperText={errors.location}
            fullWidth
            disabled={isLoading}
            className="bg-white"
          >
            <MenuItem value="location1">Location 1</MenuItem>
            <MenuItem value="location2">Location 2</MenuItem>
          </TextField>

          <TextField
            select
            variant="outlined"
            label="Select Property Need"
            name="propertyNeed"
            value={formData.propertyNeed}
            onChange={handleChange}
            error={!!errors.propertyNeed}
            helperText={errors.propertyNeed}
            fullWidth
            disabled={isLoading}
            className="bg-white"
          >
            <MenuItem value="need1">Need 1</MenuItem>
            <MenuItem value="need2">Need 2</MenuItem>
          </TextField>
        </div>

        <TextField
          variant="outlined"
          label="Tell us a bit about you"
          name="about"
          value={formData.about}
          onChange={handleChange}
          multiline
          rows={3}
          fullWidth
          error={!!errors.about}
          helperText={errors.about}
          disabled={isLoading}
          className="bg-white"
        />

        <TextField
          variant="outlined"
          label="Tell us a bit about your Need"
          name="need"
          value={formData.need}
          onChange={handleChange}
          multiline
          rows={3}
          fullWidth
          error={!!errors.need}
          helperText={errors.need}
          disabled={isLoading}
          className="bg-white"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TextField
            variant="outlined"
            label="Enter Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            error={!!errors.name}
            helperText={errors.name}
            disabled={isLoading}
            className="bg-white"
          />

          <TextField
            variant="outlined"
            label="Enter Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            error={!!errors.email}
            helperText={errors.email}
            disabled={isLoading}
            className="bg-white"
          />

          <TextField
            variant="outlined"
            label="Enter WhatsApp"
            name="whatsapp"
            value={formData.whatsapp}
            onChange={handleChange}
            fullWidth
            error={!!errors.whatsapp}
            helperText={errors.whatsapp}
            disabled={isLoading}
            className="bg-white"
          />

          <TextField
            select
            variant="outlined"
            label="Select Status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            fullWidth
            error={!!errors.status}
            helperText={errors.status}
            disabled={isLoading}
            className="bg-white"
          >
            <MenuItem value="status1">Status 1</MenuItem>
            <MenuItem value="status2">Status 2</MenuItem>
          </TextField>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 bg-black text-white rounded-lg hover:bg-gray-900 transition-colors"
        >
          {isLoading ? 'Submitting...' : 'Submit Now'}
        </button>
      </form>
    </div>
  );
};

export default FormScreen; 