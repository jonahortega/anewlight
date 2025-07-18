import React, { useState } from 'react';
import './ProfileScreen.css';

const ProfileScreen = ({ user, onNavigate }) => {
  const [activeTab, setActiveTab] = useState('posts');
  const [selectedPost, setSelectedPost] = useState(null);
  const [showPostModal, setShowPostModal] = useState(false);
  const [profile] = useState({
    name: user?.name || "Alex Johnson",
    username: user?.username || "alex.johnson",
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
    image: user?.image || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    posts: 42,
    followers: 156,
    following: 89
  });

  // Debug logging to help identify issues
  console.log('ProfileScreen - User data:', user);
  console.log('ProfileScreen - Profile data:', profile);

  // Mock posts data with detailed comments
  const posts = [
    {
      id: 1,
      type: 'image',
      content: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=400&fit=crop',
      caption: 'Amazing time at our chapter retreat! 🏛️ #GreekLife #Brotherhood',
      likes: 24,
      comments: [
        { id: 1, user: 'mike.smith', text: 'Looks like an incredible time! 🔥', timestamp: '1 hour ago' },
        { id: 2, user: 'sarah.jones', text: 'Wish I could have been there!', timestamp: '2 hours ago' },
        { id: 3, user: 'john.doe', text: 'Brotherhood goals right here 💪', timestamp: '2 hours ago' },
        { id: 4, user: 'emma.wilson', text: 'The retreat was absolutely amazing!', timestamp: '3 hours ago' },
        { id: 5, user: 'david.brown', text: 'Can\'t wait for next year\'s retreat!', timestamp: '4 hours ago' },
        { id: 6, user: 'lisa.garcia', text: 'Great memories made! 📸', timestamp: '5 hours ago' },
        { id: 7, user: 'tom.lee', text: 'The brotherhood is strong!', timestamp: '6 hours ago' },
        { id: 8, user: 'anna.clark', text: 'Love this energy! ✨', timestamp: '7 hours ago' }
      ],
      timestamp: '2 hours ago',
      liked: true
    },
    {
      id: 2,
      type: 'image',
      content: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&h=400&fit=crop',
      caption: 'Community service day with the brothers 👥 #Service #Community',
      likes: 31,
      comments: [
        { id: 1, user: 'jessica.martinez', text: 'Making a difference together! 🌟', timestamp: '30 min ago' },
        { id: 2, user: 'ryan.taylor', text: 'This is what it\'s all about!', timestamp: '1 hour ago' },
        { id: 3, user: 'megan.white', text: 'So proud of our chapter!', timestamp: '2 hours ago' },
        { id: 4, user: 'kevin.rodriguez', text: 'Service above self! 🙏', timestamp: '3 hours ago' },
        { id: 5, user: 'rachel.green', text: 'Love seeing the impact we make!', timestamp: '4 hours ago' },
        { id: 6, user: 'chris.miller', text: 'Great work everyone!', timestamp: '5 hours ago' },
        { id: 7, user: 'ashley.davis', text: 'Community service is the best!', timestamp: '6 hours ago' },
        { id: 8, user: 'brandon.wilson', text: 'Proud to be part of this!', timestamp: '7 hours ago' },
        { id: 9, user: 'crystal.thomas', text: 'Amazing initiative! 👏', timestamp: '8 hours ago' },
        { id: 10, user: 'jordan.anderson', text: 'This is why I joined!', timestamp: '9 hours ago' },
        { id: 11, user: 'taylor.moore', text: 'Service with a smile! 😊', timestamp: '10 hours ago' },
        { id: 12, user: 'alex.johnson', text: 'Thanks everyone for coming out!', timestamp: '11 hours ago' }
      ],
      timestamp: '1 day ago',
      liked: false
    },
    {
      id: 3,
      type: 'image',
      content: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=400&fit=crop',
      caption: 'Study session with the squad 📚 #AcademicExcellence',
      likes: 18,
      comments: [
        { id: 1, user: 'daniel.kim', text: 'Study buddies for life! 📖', timestamp: '2 hours ago' },
        { id: 2, user: 'sophia.chen', text: 'Academic excellence! 💯', timestamp: '3 hours ago' },
        { id: 3, user: 'nathan.wong', text: 'Great study group!', timestamp: '4 hours ago' },
        { id: 4, user: 'isabella.nguyen', text: 'Love the study vibes!', timestamp: '5 hours ago' },
        { id: 5, user: 'ethan.patel', text: 'Knowledge is power! 💪', timestamp: '6 hours ago' }
      ],
      timestamp: '3 days ago',
      liked: true
    }
  ];

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

  const handlePostClick = (post) => {
    setSelectedPost(post);
    setShowPostModal(true);
  };

  const handleCloseModal = () => {
    setShowPostModal(false);
    setSelectedPost(null);
  };

  const handleLikePost = (postId) => {
    // In a real app, this would update the backend
    // eslint-disable-next-line no-unused-vars
    const updatedPosts = posts.map(post => 
      post.id === postId 
        ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
        : post
    );
    // Update the posts state (you'd need to add this state)
  };

  const handleAddComment = (postId, commentText) => {
    // In a real app, this would add to the backend
    // eslint-disable-next-line no-unused-vars
    const newComment = {
      id: Date.now(),
      user: profile.username,
      text: commentText,
      timestamp: 'Just now'
    };
    // Add comment to the post (you'd need to update the posts state)
  };

  return (
    <div className="profile-screen">
      <div className="profile-header">
        <button className="back-button" onClick={() => onNavigate('home')}>
          ← Back to Home
        </button>
        <h1>Profile</h1>
        <button className="settings-button" onClick={() => onNavigate('settings')}>
          ⚙️
        </button>
      </div>

      <div className="profile-container">
        {/* Instagram-style Profile Header */}
        <div className="profile-info-section">
          <div className="profile-avatar-section">
            <img src={profile.image} alt={profile.name} className="profile-avatar" />
          </div>
          
          <div className="profile-details">
            <div className="profile-name-section">
              <h2 className="profile-name">{profile.name}</h2>
              <span className="profile-username">@{profile.username}</span>
            </div>
            
            <div className="profile-stats">
              <div className="stat-item">
                <span className="stat-number">{profile.posts}</span>
                <span className="stat-label">posts</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{profile.followers}</span>
                <span className="stat-label">followers</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{profile.following}</span>
                <span className="stat-label">following</span>
              </div>
            </div>
            
            <div className="profile-bio-section">
              <p className="profile-bio">{profile.bio}</p>
              <div className="profile-location">
                <span className="location-icon">📍</span>
                <span>{profile.university}</span>
              </div>
              <div className="profile-organization">
                <span className="org-icon">🏛️</span>
                <span>{profile.organization}</span>
              </div>
            </div>
            
            <div className="profile-actions">
              <button className="btn btn-primary edit-profile-btn" onClick={() => onNavigate('settings')}>
                Edit Profile
              </button>
              <button className="btn btn-secondary" onClick={() => onNavigate('organizations')}>
                Manage Organizations
              </button>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="profile-tabs">
          <button 
            className={`tab-button ${activeTab === 'posts' ? 'active' : ''}`}
            onClick={() => setActiveTab('posts')}
          >
            📷 Posts
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
            📋 Requests
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'posts' && (
          <div className="posts-section">
            <div className="posts-grid">
              {posts.map(post => (
                <div key={post.id} className="post-item" onClick={() => handlePostClick(post)}>
                  <img src={post.content} alt="Post" className="post-image" />
                  <div className="post-overlay">
                    <div className="post-stats">
                      <span className="post-stat">❤️ {post.likes}</span>
                      <span className="post-stat">💬 {post.comments.length}</span>
                    </div>
                  </div>
                </div>
              ))}
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
                  Manage Organizations
                </button>
                <button className="btn btn-secondary" onClick={() => onNavigate('events')}>
                  View Organization Events
                </button>
              </div>
            </div>
            
            <div className="search-organizations-section">
              <div className="search-org-card">
                <div className="search-org-content">
                  <h4>Looking for More Organizations?</h4>
                  <p>Discover and join new clubs, fraternities, sororities, and campus organizations</p>
                  <button className="btn btn-primary search-org-btn" onClick={() => onNavigate('organizations')}>
                    🔍 Search Organizations
                  </button>
                </div>
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

      {/* Instagram-style Post Modal */}
      {showPostModal && selectedPost && (
        <div className="post-modal-overlay" onClick={handleCloseModal}>
          <div className="post-modal" onClick={(e) => e.stopPropagation()}>
            <div className="post-modal-header">
              <button className="modal-close-btn" onClick={handleCloseModal}>×</button>
            </div>
            
            <div className="post-modal-content">
              <div className="post-modal-image">
                <img src={selectedPost.content} alt="Post" />
              </div>
              
              <div className="post-modal-details">
                <div className="post-modal-header-info">
                  <div className="post-user-info">
                    <img src={profile.image} alt={profile.name} className="post-user-avatar" />
                    <div className="post-user-details">
                      <span className="post-username">{profile.username}</span>
                      <span className="post-location">{profile.university}</span>
                    </div>
                  </div>
                  <button className="post-options-btn">⋯</button>
                </div>
                
                <div className="post-modal-actions">
                  <div className="post-action-buttons">
                    <button 
                      className={`action-btn ${selectedPost.liked ? 'liked' : ''}`}
                      onClick={() => handleLikePost(selectedPost.id)}
                    >
                      {selectedPost.liked ? '❤️' : '🤍'}
                    </button>
                    <button className="action-btn">💬</button>
                    <button className="action-btn">📤</button>
                    <button className="action-btn">🔖</button>
                  </div>
                  <button className="action-btn">📌</button>
                </div>
                
                <div className="post-likes">
                  <span className="likes-count">{selectedPost.likes} likes</span>
                </div>
                
                <div className="post-caption">
                  <span className="caption-username">{profile.username}</span>
                  <span className="caption-text">{selectedPost.caption}</span>
                </div>
                
                <div className="post-comments">
                  {selectedPost.comments.slice(0, 3).map(comment => (
                    <div key={comment.id} className="comment">
                      <span className="comment-username">{comment.user}</span>
                      <span className="comment-text">{comment.text}</span>
                    </div>
                  ))}
                  {selectedPost.comments.length > 3 && (
                    <button className="view-all-comments">
                      View all {selectedPost.comments.length} comments
                    </button>
                  )}
                </div>
                
                <div className="post-timestamp">
                  <span>{selectedPost.timestamp}</span>
                </div>
                
                <div className="post-add-comment">
                  <input 
                    type="text" 
                    placeholder="Add a comment..." 
                    className="comment-input"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && e.target.value.trim()) {
                        handleAddComment(selectedPost.id, e.target.value);
                        e.target.value = '';
                      }
                    }}
                  />
                  <button className="post-btn">Post</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileScreen; 