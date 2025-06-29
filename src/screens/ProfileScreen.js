import React, { useState } from 'react';
import './ProfileScreen.css';

const ProfileScreen = ({ user, onNavigate }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [profile] = useState({
    name: user?.name || "Alex Johnson",
    organization: (user?.organization?.name || user?.greekOrganization?.name || "Alpha Beta Gamma"),
    university: user?.university?.name || user?.university || "University of California, Berkeley",
    year: user?.year || "Junior",
    major: user?.major || "Computer Science",
    minor: user?.minor || "Mathematics",
    email: user?.email || "alex.johnson@email.com",
    phone: user?.phone || "(555) 123-4567",
    address: user?.address || "123 Greek Row, University City, ST 12345",
    bio: user?.bio || "Passionate about technology and Greek life. Currently serving as the chapter's social media coordinator and love organizing events that bring our community together.",
    interests: user?.interests || ["Technology", "Leadership", "Community Service", "Networking"],
    skills: user?.skills || ["Event Planning", "Social Media Management", "Public Speaking", "Team Leadership"],
    image: user?.image || "https://via.placeholder.com/200/667eea/ffffff?text=AJ"
  });

  // Mock join requests data
  const joinRequests = [
    {
      id: 1,
      organization: "Delta Epsilon Zeta",
      status: "pending",
      date: "2024-03-10",
      message: "Your application is under review"
    },
    {
      id: 2,
      organization: "Computer Science Club",
      status: "approved",
      date: "2024-03-05",
      message: "Welcome to the club!"
    },
    {
      id: 3,
      organization: "Environmental Club",
      status: "denied",
      date: "2024-03-01",
      message: "Unfortunately, we cannot accept your application at this time"
    }
  ];

  const handleLeaveOrganization = () => {
    if (window.confirm("Are you sure you want to leave your current organization? This action cannot be undone.")) {
      alert("You have left the organization. You can join a new one from the Organizations tab.");
      // In a real app, this would update the user's organization status
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'green';
      case 'denied': return 'red';
      case 'pending': return 'orange';
      default: return 'gray';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved': return '✅';
      case 'denied': return '❌';
      case 'pending': return '⏳';
      default: return '❓';
    }
  };

  return (
    <div className="profile-screen">
      <div className="profile-header">
        <button className="back-button" onClick={() => onNavigate('home')}>
          ← Back to Home
        </button>
        <h1>My Profile</h1>
        <p>View your personal information and organization membership</p>
      </div>

      <div className="profile-container">
        <div className="profile-tabs">
          <button 
            className={`tab-button ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            👤 Profile
          </button>
          <button 
            className={`tab-button ${activeTab === 'organization' ? 'active' : ''}`}
            onClick={() => setActiveTab('organization')}
          >
            🏛️ Organization
          </button>
          <button 
            className={`tab-button ${activeTab === 'requests' ? 'active' : ''}`}
            onClick={() => setActiveTab('requests')}
          >
            📋 Join Requests
          </button>
        </div>

        {activeTab === 'profile' && (
          <div className="profile-main">
            <div className="profile-card">
              <div className="profile-avatar-section">
                <img src={profile.image} alt={profile.name} className="profile-avatar" />
                <button 
                  className="btn btn-secondary edit-profile-btn" 
                  onClick={() => onNavigate('settings')}
                >
                  Edit Profile
                </button>
              </div>

              <div className="profile-info">
                <div className="profile-details">
                  <h2>{profile.name}</h2>
                  <p className="profile-organization">{profile.organization}</p>
                  <p className="profile-university">{profile.university}</p>
                  
                  <div className="profile-section">
                    <h3>Basic Information</h3>
                    <div className="info-grid">
                      <div className="info-item">
                        <span className="info-label">Year:</span>
                        <span className="info-value">{profile.year}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Major:</span>
                        <span className="info-value">{profile.major}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Minor:</span>
                        <span className="info-value">{profile.minor}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Email:</span>
                        <span className="info-value">{profile.email}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Phone:</span>
                        <span className="info-value">{profile.phone}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Address:</span>
                        <span className="info-value">{profile.address}</span>
                      </div>
                    </div>
                  </div>

                  <div className="profile-section">
                    <h3>Bio</h3>
                    <p className="profile-bio">{profile.bio}</p>
                  </div>

                  <div className="profile-section">
                    <h3>Interests</h3>
                    <div className="tags-container">
                      {profile.interests.map((interest, index) => (
                        <span key={index} className="tag">{interest}</span>
                      ))}
                    </div>
                  </div>

                  <div className="profile-section">
                    <h3>Skills</h3>
                    <div className="tags-container">
                      {profile.skills.map((skill, index) => (
                        <span key={index} className="tag">{skill}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'organization' && (
          <div className="organization-section">
            <div className="organization-card">
              <div className="org-header">
                <h3>Current Organization</h3>
                <button className="btn btn-danger" onClick={handleLeaveOrganization}>
                  Leave Organization
                </button>
              </div>
              
              <div className="org-info">
                <h4>{profile.organization}</h4>
                <p>Greek Organization</p>
                <div className="org-stats">
                  <span>👥 45 Members</span>
                  <span>🏆 Founded 1920</span>
                  <span>🌟 4.8/5 Rating</span>
                </div>
                <p className="org-description">
                  Premier Greek organization focused on leadership and community service. 
                  We strive to develop well-rounded individuals through academic excellence, 
                  social responsibility, and lifelong friendships.
                </p>
              </div>

              <div className="org-actions">
                <button className="btn btn-primary" onClick={() => onNavigate('organizations')}>
                  View Organization Details
                </button>
                <button className="btn btn-secondary" onClick={() => onNavigate('events')}>
                  View Organization Events
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'requests' && (
          <div className="requests-section">
            <div className="requests-header">
              <h3>Join Requests</h3>
              <button className="btn btn-primary" onClick={() => onNavigate('organizations')}>
                Discover New Organizations
              </button>
            </div>

            <div className="requests-list">
              {joinRequests.length > 0 ? (
                joinRequests.map(request => (
                  <div key={request.id} className={`request-card ${request.status}`}>
                    <div className="request-header">
                      <h4>{request.organization}</h4>
                      <span className={`status-badge ${getStatusColor(request.status)}`}>
                        {getStatusIcon(request.status)} {request.status}
                      </span>
                    </div>
                    <div className="request-details">
                      <p className="request-date">Submitted: {request.date}</p>
                      <p className="request-message">{request.message}</p>
                    </div>
                    {request.status === 'denied' && (
                      <button className="btn btn-secondary">
                        Reapply
                      </button>
                    )}
                  </div>
                ))
              ) : (
                <div className="no-requests">
                  <p>No join requests found.</p>
                  <p>Start exploring organizations to submit join requests!</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileScreen; 