import React, { useState } from 'react';
import './LoginScreen.css';

const LoginScreen = ({ onLoginSuccess, onBack }) => {
  const [formData, setFormData] = useState({
    emailOrUsername: '',
    password: ''
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

    if (!formData.emailOrUsername.trim()) {
      newErrors.emailOrUsername = 'Email or username is required';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onLoginSuccess(formData);
    }
  };

  return (
    <div className="login-screen">
      <div className="login-container">
        <div className="login-content">
          <div className="login-header">
            <button className="back-btn" onClick={onBack}>
              ← Back
            </button>
            <h1>Welcome Back</h1>
            <p>Please enter your information to continue</p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="emailOrUsername">Email or Username</label>
              <input
                type="text"
                id="emailOrUsername"
                name="emailOrUsername"
                value={formData.emailOrUsername}
                onChange={handleInputChange}
                className={`form-input ${errors.emailOrUsername ? 'error' : ''}`}
                placeholder="Enter your email or username"
              />
              {errors.emailOrUsername && <span className="error-message">{errors.emailOrUsername}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`form-input ${errors.password ? 'error' : ''}`}
                placeholder="Enter your password"
              />
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            <button type="submit" className="login-btn">
              Login
            </button>
          </form>

          <div className="login-footer">
            <p>By continuing, you agree to our Terms of Service and Privacy Policy</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen; 