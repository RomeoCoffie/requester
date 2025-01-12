export const validateForm = (formData) => {
  const errors = {};
  
  if (!formData.location) {
    errors.location = 'Location is required';
  }
  
  if (!formData.propertyNeed) {
    errors.propertyNeed = 'Property need is required';
  }
  
  if (!formData.name) {
    errors.name = 'Name is required';
  }
  
  if (!formData.email) {
    errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = 'Email is invalid';
  }
  
  if (!formData.whatsapp) {
    errors.whatsapp = 'WhatsApp number is required';
  }
  
  if (!formData.about) {
    errors.about = 'Please tell us about yourself';
  }
  
  if (!formData.need) {
    errors.need = 'Please describe your need';
  }
  
  if (!formData.status) {
    errors.status = 'Status is required';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}; 