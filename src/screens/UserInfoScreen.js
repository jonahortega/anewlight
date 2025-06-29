import React, { useState } from 'react';
import './UserInfoScreen.css';

const UserInfoScreen = ({ onContinue, onBack }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onContinue(formData);
    }
  };

  return (
    <div className="user-info-screen">
      <div className="user-info-container">
        <div className="user-info-content">
          <div className="user-info-header">
            <button className="back-btn" onClick={onBack}>
              ← Back
            </button>
            <h1>Tell Us About Yourself</h1>
            <p>Let's get to know you better to personalize your experience</p>
          </div>

          <form onSubmit={handleSubmit} className="user-info-form">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`form-input ${errors.name ? 'error' : ''}`}
                placeholder="Enter your full name"
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`form-input ${errors.email ? 'error' : ''}`}
                placeholder="Enter your email address"
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <button type="submit" className="continue-btn">
              Continue
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserInfoScreen; 