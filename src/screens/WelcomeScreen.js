import React from 'react';
import './WelcomeScreen.css';

const WelcomeScreen = ({ onNavigate }) => {
  const handleGetStarted = () => {
    // Navigate to user info collection screen
    onNavigate('user-info');
  };

  const handleLogin = () => {
    // Navigate to login screen
    onNavigate('login');
  };

  const handleButtonClick = (action) => {
    // Add a small delay to show the click animation
    setTimeout(() => {
      if (action === 'signup') {
        handleGetStarted();
      } else if (action === 'login') {
        handleLogin();
      }
    }, 150);
  };

  return (
    <div className="welcome-screen">
      <div className="welcome-container">
        <div className="welcome-content">
          <div className="welcome-header">
            <div className="welcome-icon">🏛️</div>
            <h1 className="welcome-title">Greek Life</h1>
            <p className="welcome-subtitle">Connect, Engage, Thrive</p>
          </div>
          
          <div className="welcome-description">
            <p>Welcome to the ultimate platform for interacting with college communities. Connect with your Greek organization, campus clubs, or discover events, and stay engaged with your organization.</p>
          </div>
          
          <div className="welcome-features">
            <div className="feature-item">
              <span className="feature-icon">📅</span>
              <span className="feature-text">Discover Events</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🏛️</span>
              <span className="feature-text">Join Organizations</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">💬</span>
              <span className="feature-text">Stay Connected</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🗺️</span>
              <span className="feature-text">Campus Map</span>
            </div>
          </div>
          
          <div className="welcome-actions">
            <button className="welcome-btn primary" onClick={() => handleButtonClick('signup')}>
              Get Started
            </button>
            <button className="welcome-btn secondary" onClick={() => handleButtonClick('login')}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen; 