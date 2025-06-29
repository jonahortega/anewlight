import React from 'react';
import './HomeScreen.css';

const HomeScreen = ({ user, onNavigate }) => {
  const upcomingEvents = [
    {
      id: 1,
      title: "Spring Formal 2024",
      date: "MAR 15",
      time: "8:00 PM",
      location: "Grand Ballroom",
      attendees: 127,
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=200&fit=crop"
    },
    {
      id: 2,
      title: "Charity Fundraiser",
      date: "MAR 22",
      time: "6:30 PM",
      location: "Student Center",
      attendees: 89,
      image: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=400&h=200&fit=crop"
    },
    {
      id: 3,
      title: "Study Group Meetup",
      date: "MAR 25",
      time: "7:00 PM",
      location: "Library",
      attendees: 45,
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=200&fit=crop"
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: "event",
      title: "New event created",
      description: "Spring Formal 2024 has been added to the calendar",
      time: "2 hours ago",
      icon: "🎉"
    },
    {
      id: 2,
      type: "member",
      title: "New member joined",
      description: "Jeremiah Molester joined Alpha Beta Gamma",
      time: "4 hours ago",
      icon: "👋"
    },
    {
      id: 3,
      type: "message",
      title: "New message in group chat",
      description: "Devlin Bathsalts: 'Who's going to the formal?'",
      time: "6 hours ago",
      icon: "💬"
    }
  ];

  const handleEventClick = (eventId) => {
    onNavigate('events');
  };

  const handleActionClick = (action) => {
    onNavigate(action);
  };

  return (
    <div className="home-screen">
      <div className="home-header">
        <div className="welcome-section">
          <h1>Welcome back, {user?.name || 'User'}! 👋</h1>
          <p>Stay connected with your Greek life community and never miss an important event.</p>
        </div>

        <div className="user-info">
          <div className="user-avatar">
            <img src={user?.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"} alt="User" />
          </div>
          <div className="user-details">
            <h3>{user?.name || 'User Name'}</h3>
            <p>{user?.university?.name || user?.university || 'University'}</p>
            {user?.organization && (
              <span className="organization-badge">
                {typeof user.organization === 'string' ? user.organization : (user.organization?.name || 'Organization')}
              </span>
            )}
            {user?.greekOrganization && (
              <span className="organization-badge">
                {user.greekOrganization.name || 'Greek Organization'} ({user.greekOrganization.type || 'Organization'})
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="home-content">
        <div className="main-section">
          <div className="quick-actions">
            <h2>Quick Actions</h2>
            <div className="actions-grid">
              <div className="action-card" onClick={() => handleActionClick('organizations')}>
                <span className="action-icon">🏛️</span>
                <h3>Organizations</h3>
                <p>Connect with your Greek house and members</p>
              </div>
              <div className="action-card" onClick={() => handleActionClick('events')}>
                <span className="action-icon">📅</span>
                <h3>Events</h3>
                <p>Browse and RSVP to upcoming events</p>
              </div>
              <div className="action-card" onClick={() => handleActionClick('messages')}>
                <span className="action-icon">💬</span>
                <h3>Messages</h3>
                <p>Chat with your organization members</p>
              </div>
              <div className="action-card" onClick={() => handleActionClick('clubs')}>
                <span className="action-icon">🎯</span>
                <h3>Clubs</h3>
                <p>Join and manage campus clubs</p>
              </div>
            </div>
          </div>

          <div className="recent-activity">
            <h2>Recent Activity</h2>
            <div className="activity-list">
              {recentActivities.map(activity => (
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

        <div className="upcoming-events">
          <h2>Upcoming Events</h2>
          <div className="events-preview">
            {upcomingEvents.map(event => (
              <div key={event.id} className="event-preview-card" onClick={() => handleEventClick(event.id)}>
                <div className="event-preview-image">
                  <img src={event.image} alt={event.title} />
                  <div className="event-date">{event.date}</div>
                </div>
                <div className="event-preview-content">
                  <h4>{event.title}</h4>
                  <p>Join us for an amazing time with your Greek life community!</p>
                  <div className="event-meta">
                    <span>🕒 {event.time}</span>
                    <span>📍 {event.location}</span>
                    <span>👥 {event.attendees} attending</span>
                  </div>
                  <button className="btn btn-primary">View Details</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen; 