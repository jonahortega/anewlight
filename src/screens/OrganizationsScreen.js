import React, { useState, useEffect } from 'react';
import './OrganizationsScreen.css';

const OrganizationsScreen = ({ user, onNavigate }) => {
  const [selectedOrganization, setSelectedOrganization] = useState(null);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [activeTab, setActiveTab] = useState('my-organizations');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [isLoading, setIsLoading] = useState(true);
  const [searchFilters, setSearchFilters] = useState({
    category: 'all',
    type: 'all'
  });

  // Mock data for user's organizations
  const userOrganizations = [
    {
      id: 1,
      name: "Alpha Sigma Phi",
      type: "Fraternity",
      category: "Greek",
      description: "Building better men through brotherhood, scholarship, and leadership development.",
      members: 45,
      founded: "1845",
      contact: "alphasig@university.edu",
      image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=300&fit=crop",
      icon: "🏛️",
      status: "approved"
    },
    {
      id: 2,
      name: "Community Service Club",
      type: "Club",
      category: "Club",
      description: "Make a difference in our community through volunteer work, fundraising events, and service projects.",
      members: 120,
      founded: "2010",
      contact: "service@university.edu",
      image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&h=300&fit=crop",
      icon: "🤝",
      status: "approved"
    },
    {
      id: 3,
      name: "Kappa Delta",
      type: "Sorority",
      category: "Greek",
      description: "Empowering women through leadership, scholarship, and sisterhood.",
      members: 65,
      founded: "1897",
      contact: "kappadelta@university.edu",
      image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=300&fit=crop",
      icon: "🌸",
      status: "pending"
    },
    {
      id: 4,
      name: "Computer Science Society",
      type: "Academic Club",
      category: "Club",
      description: "Advancing computer science education and fostering innovation in technology.",
      members: 85,
      founded: "2005",
      contact: "cssociety@university.edu",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop",
      icon: "💻",
      status: "approved"
    }
  ];

  // Mock data for all available organizations
  const allOrganizations = [
    ...userOrganizations,
    {
      id: 5,
      name: "Sigma Chi",
      type: "Fraternity",
      category: "Greek",
      description: "Building enduring friendships and developing character through leadership and service.",
      members: 52,
      founded: "1855",
      contact: "sigmachi@university.edu",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
      icon: "🏛️"
    },
    {
      id: 6,
      name: "Delta Gamma",
      type: "Sorority",
      category: "Greek",
      description: "Do Good through sisterhood, scholarship, and service to others.",
      members: 58,
      founded: "1873",
      contact: "deltagamma@university.edu",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=300&fit=crop",
      icon: "🌸"
    },
    {
      id: 7,
      name: "Environmental Club",
      type: "Club",
      category: "Club",
      description: "Promoting environmental awareness and sustainability on campus and in the community.",
      members: 95,
      founded: "2012",
      contact: "envclub@university.edu",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop",
      icon: "🌱"
    },
    {
      id: 8,
      name: "Business Association",
      type: "Professional Club",
      category: "Club",
      description: "Connecting business students with industry professionals and career opportunities.",
      members: 150,
      founded: "1998",
      contact: "busassoc@university.edu",
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=300&fit=crop",
      icon: "💼"
    },
    {
      id: 9,
      name: "Phi Beta Kappa",
      type: "Honor Society",
      category: "Academic",
      description: "Recognizing academic excellence and fostering intellectual achievement.",
      members: 25,
      founded: "1776",
      contact: "phibetakappa@university.edu",
      image: "https://images.unsplash.com/photo-1523240798132-8751934f31eb?w=400&h=300&fit=crop",
      icon: "🎓"
    },
    {
      id: 10,
      name: "Chess Club",
      type: "Recreational Club",
      category: "Club",
      description: "Strategic thinking and friendly competition through the game of chess.",
      members: 40,
      founded: "2015",
      contact: "chessclub@university.edu",
      image: "https://images.unsplash.com/photo-1528819622764-d9b2d2c0c0e4?w=400&h=300&fit=crop",
      icon: "♟️"
    }
  ];

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  const getFilteredOrganizations = () => {
    let filtered = userOrganizations;
    
    if (searchTerm) {
      filtered = filtered.filter(org => 
        org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        org.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  };

  const getSearchResults = () => {
    let filtered = allOrganizations.filter(org => 
      !userOrganizations.some(userOrg => userOrg.id === org.id)
    );
    
    if (searchTerm) {
      filtered = filtered.filter(org => 
        org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        org.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (searchFilters.category !== 'all') {
      filtered = filtered.filter(org => org.category === searchFilters.category);
    }
    
    if (searchFilters.type !== 'all') {
      filtered = filtered.filter(org => org.type === searchFilters.type);
    }
    
    return filtered;
  };

  const handleOrganizationClick = (org) => {
    setSelectedOrganization(org);
    if (org.status === 'pending') {
      setShowJoinModal(true);
    } else {
      onNavigate('organization-profile', { organization: org });
    }
  };

  const handleViewProfile = (org, e) => {
    e.stopPropagation();
    onNavigate('organization-profile', { organization: org });
  };

  const handleCloseModal = () => {
    setShowJoinModal(false);
    setSelectedOrganization(null);
  };

  const handleJoinRequest = () => {
    // Simulate admin approval process
    setTimeout(() => {
      // Update the organization status
      setSelectedOrganization(prev => ({ ...prev, status: 'approved' }));
    }, 2000);
  };

  const getRequestStatus = (organizationId) => {
    const org = userOrganizations.find(o => o.id === organizationId);
    return org ? org.status : 'none';
  };

  const getRequestDate = (organizationId) => {
    const dates = {
      1: '2024-01-15',
      2: '2024-02-20',
      3: '2024-03-10',
      4: '2024-01-30'
    };
    return dates[organizationId] || '2024-01-01';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'approved': return 'Approved';
      case 'pending': return 'Pending';
      case 'denied': return 'Denied';
      default: return 'Not Joined';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved': return '✅';
      case 'pending': return '⏳';
      case 'denied': return '❌';
      default: return '➕';
    }
  };

  const filteredOrganizations = getFilteredOrganizations();
  const searchResultsList = getSearchResults();

  if (isLoading) {
    return (
      <div className="organizations-screen">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading organizations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="organizations-screen">
      <div className="organizations-header">
        <div className="header-content">
          <h1 className="organizations-title">Organizations</h1>
          <p className="organizations-subtitle">Manage your memberships and discover new opportunities</p>
        </div>
        <button className="back-button" onClick={() => onNavigate('home')}>
          ← Back to Home
        </button>
      </div>

      <div className="tab-navigation">
        <button 
          className={`tab-nav-btn ${activeTab === 'my-organizations' ? 'active' : ''}`}
          onClick={() => setActiveTab('my-organizations')}
        >
          <span className="tab-icon">🏠</span>
          My Organizations
          <span className="tab-count">({userOrganizations.length})</span>
        </button>
        <button 
          className={`tab-nav-btn ${activeTab === 'search-organizations' ? 'active' : ''}`}
          onClick={() => setActiveTab('search-organizations')}
        >
          <span className="tab-icon">🔍</span>
          Search Organizations
          <span className="tab-count">({allOrganizations.length - userOrganizations.length})</span>
        </button>
      </div>

      {activeTab === 'my-organizations' && (
        <div className="tab-content">
          <div className="controls-section">
            <div className="search-container">
              <input
                type="text"
                placeholder="Search your organizations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <span className="search-icon">🔍</span>
            </div>

            <div className="sort-controls">
              <label htmlFor="sort-select">Sort by:</label>
              <select 
                id="sort-select"
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                <option value="date">Date Requested</option>
                <option value="name">Name</option>
                <option value="members">Members</option>
              </select>
            </div>
          </div>

          {filteredOrganizations.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🏛️</div>
              <h3>No Organizations Found</h3>
              <p>
                {searchTerm 
                  ? `No organizations match "${searchTerm}"` 
                  : "You haven't joined or requested to join any organizations yet."
                }
              </p>
              <button className="btn-join" onClick={() => setActiveTab('search-organizations')}>
                Discover Organizations
              </button>
            </div>
          ) : (
            <div className="organizations-grid">
              {filteredOrganizations.map(org => {
                const status = getRequestStatus(org.id);
                
                return (
                  <div key={org.id} className="organization-card" onClick={() => handleOrganizationClick(org)}>
                    <div className="organization-image-container">
                      <img src={org.image} alt={org.name} className="organization-image" />
                      <div className="organization-overlay">
                        <div className="organization-icon-large">{org.icon}</div>
                      </div>
                      <div className={`status-badge status-${status}`}>
                        <span className="status-icon">{getStatusIcon(status)}</span>
                        {getStatusText(status)}
                      </div>
                    </div>

                    <div className="organization-content">
                      <div className="organization-header">
                        <div className="organization-icon-small">
                          {org.icon}
                        </div>
                        <div className="organization-info">
                          <h3 className="organization-name">{org.name}</h3>
                          <p className="organization-type">{org.type}</p>
                        </div>
                      </div>

                      <p className="organization-description">{org.description}</p>
                      
                      <div className="organization-stats">
                        <div className="stat-item">
                          <span className="stat-icon">👥</span>
                          <span className="stat-value">{org.members} members</span>
                        </div>
                        <div className="stat-item">
                          <span className="stat-icon">🏷️</span>
                          <span className="stat-value">{org.category}</span>
                        </div>
                        <div className="stat-item">
                          <span className="stat-icon">📅</span>
                          <span className="stat-value">Founded {org.founded}</span>
                        </div>
                      </div>

                      <div className="organization-actions">
                        <button 
                          className="btn-view"
                          onClick={(e) => handleViewProfile(org, e)}
                        >
                          View Profile
                        </button>
                        <button 
                          className="btn-message"
                          onClick={(e) => {
                            e.stopPropagation();
                            onNavigate('messages');
                          }}
                        >
                          Message
                        </button>
                      </div>

                      <div className="request-info">
                        <div className="request-date">
                          <span className="date-icon">📅</span>
                          Requested: {formatDate(getRequestDate(org.id))}
                        </div>
                        {status === 'pending' && (
                          <div className="pending-notice">
                            <span className="notice-icon">⏰</span>
                            Review in progress
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {activeTab === 'search-organizations' && (
        <div className="tab-content">
          <div className="search-section">
            <div className="search-header">
              <h2>Discover Organizations</h2>
              <p>Find and join fraternities, sororities, clubs, and organizations at your university</p>
            </div>
            
            <div className="search-controls">
              <div className="search-container">
                <input
                  type="text"
                  placeholder="Search organizations by name or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
                <span className="search-icon">🔍</span>
              </div>

              <div className="filter-controls">
                <div className="filter-group">
                  <label>Category:</label>
                  <select 
                    value={searchFilters.category} 
                    onChange={(e) => setSearchFilters({...searchFilters, category: e.target.value})}
                    className="filter-select"
                  >
                    <option value="all">All Categories</option>
                    <option value="Greek">Greek Life</option>
                    <option value="Club">Clubs</option>
                    <option value="Academic">Academic</option>
                  </select>
                </div>

                <div className="filter-group">
                  <label>Type:</label>
                  <select 
                    value={searchFilters.type} 
                    onChange={(e) => setSearchFilters({...searchFilters, type: e.target.value})}
                    className="filter-select"
                  >
                    <option value="all">All Types</option>
                    <option value="Fraternity">Fraternity</option>
                    <option value="Sorority">Sorority</option>
                    <option value="Club">Club</option>
                    <option value="Academic Club">Academic Club</option>
                    <option value="Professional Club">Professional Club</option>
                    <option value="Honor Society">Honor Society</option>
                  </select>
                </div>
              </div>
            </div>

            {searchResultsList.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">🔍</div>
                <h3>No Organizations Found</h3>
                <p>
                  {searchTerm 
                    ? `No organizations match "${searchTerm}" with the current filters.` 
                    : "Try adjusting your search terms or filters."
                  }
                </p>
              </div>
            ) : (
              <div className="search-results">
                <div className="results-header">
                  <h3>Available Organizations ({searchResultsList.length})</h3>
                </div>
                <div className="organizations-grid">
                  {searchResultsList.map(org => (
                    <div key={org.id} className="organization-card search-card" onClick={() => handleOrganizationClick(org)}>
                      <div className="organization-image-container">
                        <img src={org.image} alt={org.name} className="organization-image" />
                        <div className="organization-overlay">
                          <div className="organization-icon-large">{org.icon}</div>
                        </div>
                        <div className="join-badge">
                          <span className="join-icon">➕</span>
                          Join
                        </div>
                      </div>

                      <div className="organization-content">
                        <div className="organization-header">
                          <div className="organization-icon-small">
                            {org.icon}
                          </div>
                          <div className="organization-info">
                            <h3 className="organization-name">{org.name}</h3>
                            <p className="organization-type">{org.type}</p>
                          </div>
                        </div>

                        <p className="organization-description">{org.description}</p>
                        
                        <div className="organization-stats">
                          <div className="stat-item">
                            <span className="stat-icon">👥</span>
                            <span className="stat-value">{org.members} members</span>
                          </div>
                          <div className="stat-item">
                            <span className="stat-icon">🏷️</span>
                            <span className="stat-value">{org.category}</span>
                          </div>
                          <div className="stat-item">
                            <span className="stat-icon">📅</span>
                            <span className="stat-value">Founded {org.founded}</span>
                          </div>
                        </div>

                        <div className="organization-actions">
                          <button 
                            className="btn-join-org"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleJoinRequest();
                            }}
                          >
                            Request to Join
                          </button>
                          <button 
                            className="btn-view"
                            onClick={(e) => handleViewProfile(org, e)}
                          >
                            Learn More
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Enhanced Organization Detail Modal */}
      {showJoinModal && selectedOrganization && (
        <div className="modal" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-header-content">
                <div className="modal-title-section">
                  <h2 className="modal-title">{selectedOrganization.name}</h2>
                  <p className="modal-subtitle">{selectedOrganization.type}</p>
                </div>
                <div className="modal-status">
                  {activeTab === 'my-organizations' ? (
                    <div className={`status-badge status-${getRequestStatus(selectedOrganization.id)}`}>
                      <span className="status-icon">{getStatusIcon(getRequestStatus(selectedOrganization.id))}</span>
                      {getStatusText(getRequestStatus(selectedOrganization.id))}
                    </div>
                  ) : (
                    <div className="join-badge">
                      <span className="join-icon">➕</span>
                      Available to Join
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="modal-body">
              <div className="modal-grid">
                <div className="modal-section">
                  <h3 className="section-title">About</h3>
                  <p className="section-content">{selectedOrganization.description}</p>
                </div>

                <div className="modal-section">
                  <h3 className="section-title">Details</h3>
                  <div className="details-grid">
                    <div className="detail-item">
                      <span className="detail-label">Category:</span>
                      <span className="detail-value">{selectedOrganization.category}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Members:</span>
                      <span className="detail-value">{selectedOrganization.members} members</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Founded:</span>
                      <span className="detail-value">{selectedOrganization.founded}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Contact:</span>
                      <span className="detail-value">{selectedOrganization.contact}</span>
                    </div>
                  </div>
                </div>

                {activeTab === 'my-organizations' && (
                  <div className="modal-section">
                    <h3 className="section-title">Request Details</h3>
                    <div className="request-details">
                      <div className="status-message">
                        <div className={`message ${getRequestStatus(selectedOrganization.id)}`}>
                          <span className="message-icon">{getStatusIcon(getRequestStatus(selectedOrganization.id))}</span>
                          <div className="message-content">
                            <h4>{getStatusText(getRequestStatus(selectedOrganization.id))}</h4>
                            <p>Request submitted on {formatDate(getRequestDate(selectedOrganization.id))}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="modal-actions">
              {activeTab === 'search-organizations' ? (
                <>
                  <button 
                    className="btn-primary"
                    onClick={() => handleJoinRequest()}
                  >
                    Request to Join
                  </button>
                  <button 
                    className="btn-secondary"
                    onClick={() => handleViewProfile(selectedOrganization)}
                  >
                    View Full Profile
                  </button>
                </>
              ) : (
                <>
                  <button 
                    className="btn-primary"
                    onClick={() => handleViewProfile(selectedOrganization)}
                  >
                    View Profile
                  </button>
                  <button 
                    className="btn-secondary"
                    onClick={() => onNavigate('messages')}
                  >
                    Send Message
                  </button>
                </>
              )}
              <button className="btn-cancel" onClick={handleCloseModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrganizationsScreen; 