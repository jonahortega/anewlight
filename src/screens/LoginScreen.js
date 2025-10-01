import React, { useState } from 'react';
import './LoginScreen.css';

const BackgroundGradientAnimation = () => {
  return (
    <div className="background-gradient-animation">
      <div className="floating-orb orb-1"></div>
      <div className="floating-orb orb-2"></div>
      <div className="floating-orb orb-3"></div>
      <div className="floating-orb orb-4"></div>
      <div className="floating-orb orb-5"></div>
      <div className="gradient-overlay"></div>
    </div>
  );
};

const LoginScreen = ({ onLoginSuccess, onBack }) => {
  const [formData, setFormData] = useState({
    emailOrUsername: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      
      // Simulate loading
      setTimeout(() => {
        setIsLoading(false);
        setShowSuccess(true);
        
        // Show success animation briefly then proceed
        setTimeout(() => {
          onLoginSuccess(formData);
        }, 1000);
      }, 1500);
    }
  };

  const handleBackClick = () => {
    onBack();
  };

  return (
    <div className="mcp-login-container">
      <BackgroundGradientAnimation />
      
      <div className="mcp-login-content">
        <button className="mcp-back-btn" onClick={handleBackClick}>
          <span className="back-arrow">←</span>
          <span className="back-text">Back</span>
        </button>

        <div className="mcp-login-card">
          <div className="mcp-login-header">
            <div className="mcp-logo-container">
              <div className="mcp-logo">
                <div className="logo-inner">
                  <span className="logo-text">GL</span>
                </div>
              </div>
            </div>
            <h1 className="mcp-login-title">Welcome Back</h1>
            <p className="mcp-login-subtitle">Access your Greek Life community</p>
          </div>

          <form className="mcp-login-form" onSubmit={handleSubmit}>
            <div className="mcp-form-group">
              <label htmlFor="emailOrUsername" className="mcp-form-label">
                Email or Username
              </label>
              <div className="mcp-input-container">
                <input
                  type="text"
                  id="emailOrUsername"
                  name="emailOrUsername"
                  value={formData.emailOrUsername}
                  onChange={handleInputChange}
                  className={`mcp-form-input ${errors.emailOrUsername ? 'error' : ''}`}
                  placeholder="Enter your email or username"
                  disabled={isLoading}
                />
                <div className="mcp-input-border"></div>
              </div>
              {errors.emailOrUsername && (
                <span className="mcp-error-message">{errors.emailOrUsername}</span>
              )}
            </div>

            <div className="mcp-form-group">
              <label htmlFor="password" className="mcp-form-label">
                Password
              </label>
              <div className="mcp-input-container">
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`mcp-form-input ${errors.password ? 'error' : ''}`}
                  placeholder="Enter your password"
                  disabled={isLoading}
                />
                <div className="mcp-input-border"></div>
              </div>
              {errors.password && (
                <span className="mcp-error-message">{errors.password}</span>
              )}
            </div>

            <button 
              type="submit" 
              className={`mcp-submit-btn ${isLoading ? 'loading' : ''} ${showSuccess ? 'success' : ''}`}
              disabled={isLoading}
            >
              <span className="btn-content">
                {isLoading ? (
                  <>
                    <div className="loading-spinner"></div>
                    <span>Authenticating...</span>
                  </>
                ) : showSuccess ? (
                  <>
                    <span className="success-icon">✓</span>
                    <span>Success!</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <span className="btn-arrow">→</span>
                  </>
                )}
              </span>
            </button>
          </form>

          <div className="mcp-login-footer">
            <p>By continuing, you agree to our Terms of Service and Privacy Policy</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;