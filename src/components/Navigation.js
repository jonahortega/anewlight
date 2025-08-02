import React from 'react';
import './Navigation.css';

const Navigation = ({ currentScreen, onNavigate }) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'events', label: 'Search', icon: '🔎' },
    { id: 'tickets', label: 'Tickets', icon: '🎫' },
    { id: 'profile', label: 'Profile', icon: '👤' }
  ];

  return (
    <nav className="navigation">
      <div className="nav-container">
        {navItems.map(item => (
          <button
            key={item.id}
            className={`nav-item ${currentScreen === item.id ? 'active' : ''}`}
            onClick={() => onNavigate(item.id)}
            title={item.label}
          >
            <span className="nav-icon">{item.icon}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navigation; 