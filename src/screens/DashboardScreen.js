import React, { useState } from 'react';
import './DashboardScreen.css';
import SearchBar from '../components/SearchBar';

const DashboardScreen = ({ user, onNavigate }) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('month');

  // Mock analytics data
  const analyticsData = {
    eventsAttended: 12,
    eventsHosted: 3,
    totalMembers: user?.greekOrganization?.members || 45,
    activeMembers: 38,
    upcomingEvents: 5,
    messagesSent: 127,
    communityHours: 24,
    fundraisingRaised: 1250
  };

  const recentStats = [
    {
      title: "Events This Month",
      value: analyticsData.eventsAttended,
      change: "+15%",
      trend: "up",
      icon: "📅"
    },
    {
      title: "Active Members",
      value: analyticsData.activeMembers,
      change: "+3",
      trend: "up",
      icon: "👥"
    },
    {
      title: "Community Hours",
      value: analyticsData.communityHours,
      change: "+8hrs",
      trend: "up",
      icon: "🤝"
    },
    {
      title: "Funds Raised",
      value: `$${analyticsData.fundraisingRaised}`,
      change: "+$250",
      trend: "up",
      icon: "💰"
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "Spring Formal",
      date: "Mar 15",
      attendees: 127,
      type: "Social"
    },
    {
      id: 2,
      title: "Charity Fundraiser",
      date: "Mar 22",
      attendees: 89,
      type: "Philanthropy"
    },
    {
      id: 3,
      title: "Study Group",
      date: "Mar 25",
      attendees: 45,
      type: "Academic"
    }
  ];

  const recentActivity = [
    {
      id: 1,
      type: "event",
      title: "New event created",
      description: "Spring Formal 2024 has been added",
      time: "2 hours ago",
      icon: "🎉"
    },
    {
      id: 2,
      type: "member",
      title: "New member joined",
      description: "Jeremiah joined Alpha Beta Gamma",
      time: "4 hours ago",
      icon: "👋"
    },
    {
      id: 3,
      type: "achievement",
      title: "Fundraising goal reached",
      description: "100% of monthly goal achieved",
      time: "1 day ago",
      icon: "🏆"
    }
  ];

  const handleTimeframeChange = (timeframe) => {
    setSelectedTimeframe(timeframe);
  };

  const handleSearch = (query) => {
    // Search functionality can be implemented here
  };

  const handleEventClick = (eventId) => {
    onNavigate('events');
  };

  const handleActionClick = (action) => {
    onNavigate(action);
  };

  return (
    <div className="dashboard-screen">
      <div className="dashboard-header">
        <div className="dashboard-title">
          <h1>Dashboard</h1>
          <p>Welcome back, {user?.name || 'User'}! Here's your Greek life overview.</p>
        </div>
        
        <div className="dashboard-controls">
          <SearchBar 
            placeholder="Search events, members, activities..."
            onSearch={handleSearch}
            className="dashboard-search"
          />
          
          <div className="timeframe-selector">
            <button 
              className={`timeframe-btn ${selectedTimeframe === 'week' ? 'active' : ''}`}
              onClick={() => handleTimeframeChange('week')}
            >
              Week
            </button>
            <button 
              className={`timeframe-btn ${selectedTimeframe === 'month' ? 'active' : ''}`}
              onClick={() => handleTimeframeChange('month')}
            >
              Month
            </button>
            <button 
              className={`timeframe-btn ${selectedTimeframe === 'year' ? 'active' : ''}`}
              onClick={() => handleTimeframeChange('year')}
            >
              Year
            </button>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        {/* Stats Cards */}
        <div className="stats-section">
          <h2>Key Metrics</h2>
          <div className="stats-grid">
            {recentStats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-content">
                  <h3>{stat.title}</h3>
                  <div className="stat-value">{stat.value}</div>
                  <div className={`stat-change ${stat.trend}`}>
                    {stat.change}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-main">
          <div className="dashboard-left">
            {/* Activity Chart */}
            <div className="chart-section">
              <h2>Activity Overview</h2>
              <div className="activity-chart">
                <div className="chart-placeholder">
                  <div className="chart-bars">
                    {[65, 80, 45, 90, 70, 85, 60].map((height, index) => (
                      <div 
                        key={index} 
                        className="chart-bar"
                        style={{ height: `${height}%` }}
                      >
                        <span className="bar-value">{height}</span>
                      </div>
                    ))}
                  </div>
                  <div className="chart-labels">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                      <span key={index} className="chart-label">{day}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="activity-section">
              <h2>Recent Activity</h2>
              <div className="activity-list">
                {recentActivity.map(activity => (
                  <div key={activity.id} className="activity-item">
                    <div className="activity-icon">
                      {activity.icon}
                    </div>
                    <div className="activity-content">
                      <h4>{activity.title}</h4>
                      <p>{activity.description}</p>
                      <span className="activity-time">{activity.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="dashboard-right">
            {/* Quick Actions */}
            <div className="quick-actions-section">
              <h2>Quick Actions</h2>
              <div className="quick-actions-grid">
                <button 
                  className="quick-action-btn"
                  onClick={() => handleActionClick('events')}
                >
                  <span className="action-icon">📅</span>
                  <span>Create Event</span>
                </button>
                <button 
                  className="quick-action-btn"
                  onClick={() => handleActionClick('messages')}
                >
                  <span className="action-icon">💬</span>
                  <span>Send Message</span>
                </button>
                <button 
                  className="quick-action-btn"
                  onClick={() => handleActionClick('profile')}
                >
                  <span className="action-icon">👤</span>
                  <span>Manage Organizations</span>
                </button>
                <button 
                  className="quick-action-btn"
                  onClick={() => handleActionClick('profile')}
                >
                  <span className="action-icon">👤</span>
                  <span>Update Profile</span>
                </button>
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="upcoming-events-section">
              <h2>Upcoming Events</h2>
              <div className="upcoming-events-list">
                {upcomingEvents.map(event => (
                  <div 
                    key={event.id} 
                    className="upcoming-event-item"
                    onClick={() => handleEventClick(event.id)}
                  >
                    <div className="event-date">
                      <span className="date-day">{event.date}</span>
                    </div>
                    <div className="event-details">
                      <h4>{event.title}</h4>
                      <p>{event.type} • {event.attendees} attending</p>
                    </div>
                    <div className="event-arrow">→</div>
                  </div>
                ))}
              </div>
              <button 
                className="view-all-btn"
                onClick={() => handleActionClick('events')}
              >
                View All Events
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardScreen; 