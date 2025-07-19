import React, { useState } from 'react';
import './HomeScreen.css';

const HomeScreen = ({ user, onNavigate }) => {
  const [selectedPost, setSelectedPost] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [feedPosts, setFeedPosts] = useState([
    {
      id: 1,
      type: 'event',
      author: {
        name: 'Alpha Beta Gamma',
        avatar: '🏛️',
        isOrganization: true,
        university: 'UC Berkeley'
      },
      content: {
        caption: 'Spring Formal 2024 is just around the corner! 🎉 Join us for an unforgettable night of dancing, great food, and amazing company. Early bird tickets are selling fast! #SpringFormal #GreekLife #UCBerkeley',
        image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&h=400&fit=crop&crop=center&q=80',
        eventDetails: {
          date: 'March 15, 2024',
          time: '8:00 PM',
          location: 'Grand Ballroom',
          attendees: 127
        }
      },
      likes: 89,
      comments: [
        {
          id: 1,
          author: 'Sarah Johnson',
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
          text: 'Can\'t wait for this! Already got my ticket! 🎉',
          timestamp: '1 hour ago'
        },
        {
          id: 2,
          author: 'Michael Chen',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
          text: 'This is going to be epic! Who else is going?',
          timestamp: '30 minutes ago'
        }
      ],
      shares: 12,
      timestamp: '2 hours ago',
      isLiked: false,
      isSaved: false
    },
    {
      id: 2,
      type: 'photo',
      author: {
        name: 'Sarah Johnson',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
        isOrganization: false,
        university: 'UC Berkeley',
        organization: 'Delta Epsilon Zeta'
      },
      content: {
        caption: 'Amazing time at our sisterhood retreat this weekend! 💕 The bonds we create here are truly special. Can\'t wait for our next adventure together! #Sisterhood #GreekLife #Retreat #DEZ',
        image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&h=400&fit=crop&crop=center&q=80'
      },
      likes: 156,
      comments: [
        {
          id: 1,
          author: 'Emma Wilson',
          avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
          text: 'Looks like you had an amazing time! 💕',
          timestamp: '2 hours ago'
        },
        {
          id: 2,
          author: 'Jessica Lee',
          avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
          text: 'Miss you all already! Can\'t wait for next time!',
          timestamp: '1 hour ago'
        }
      ],
      shares: 8,
      timestamp: '4 hours ago',
      isLiked: true,
      isSaved: false
    },
    {
      id: 3,
      type: 'announcement',
      author: {
        name: 'Theta Iota Kappa',
        avatar: '🏛️',
        isOrganization: true,
        university: 'UC Berkeley'
      },
      content: {
        caption: 'Congratulations to our brothers who made Dean\'s List this semester! 🎓 Your hard work and dedication inspire us all. Keep up the excellent work! #AcademicExcellence #DeanList #TIK #UCBerkeley',
        image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop&crop=center&q=80'
      },
      likes: 203,
      comments: [
        {
          id: 1,
          author: 'David Rodriguez',
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
          text: 'Proud to be part of such an amazing brotherhood!',
          timestamp: '3 hours ago'
        }
      ],
      shares: 67,
      timestamp: '6 hours ago',
      isLiked: false,
      isSaved: true
    },
    {
      id: 4,
      type: 'event',
      author: {
        name: 'Delta Epsilon Zeta',
        avatar: '🏛️',
        isOrganization: true,
        university: 'UC Berkeley'
      },
      content: {
        caption: 'Join us for our annual philanthropy fundraiser! 🎗️ Support breast cancer awareness with gourmet food, silent auctions, and inspiring speakers. Let\'s make a difference together! #Philanthropy #Charity #DEZ #UCBerkeley',
        image: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=600&h=400&fit=crop&crop=center&q=80',
        eventDetails: {
          date: 'March 22, 2024',
          time: '6:30 PM',
          location: 'Delta Epsilon Zeta House',
          attendees: 89
        }
      },
      likes: 134,
      comments: [
        {
          id: 1,
          author: 'Rachel Green',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
          text: 'Such an important cause! Count me in! 💕',
          timestamp: '45 minutes ago'
        },
        {
          id: 2,
          author: 'Alex Thompson',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
          text: 'Can\'t wait to support this amazing cause!',
          timestamp: '1 hour ago'
        }
      ],
      shares: 23,
      timestamp: '3 hours ago',
      isLiked: true,
      isSaved: false
    },
    {
      id: 5,
      type: 'photo',
      author: {
        name: 'Michael Chen',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        isOrganization: false,
        university: 'UC Berkeley',
        organization: 'Alpha Beta Gamma'
      },
      content: {
        caption: 'Community service day with the brothers! 👥 Making a positive impact in our local community. Service above self! #CommunityService #Volunteer #ABG #UCBerkeley',
        image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&h=400&fit=crop&crop=center&q=80'
      },
      likes: 98,
      comments: [
        {
          id: 1,
          author: 'David Rodriguez',
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
          text: 'Great work everyone! Proud to be part of this!',
          timestamp: '2 hours ago'
        },
        {
          id: 2,
          author: 'Emma Wilson',
          avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
          text: 'This is what Greek life is all about! 💪',
          timestamp: '3 hours ago'
        }
      ],
      shares: 15,
      timestamp: '5 hours ago',
      isLiked: false,
      isSaved: true
    },
    {
      id: 6,
      type: 'event',
      author: {
        name: 'Greek Life Council',
        avatar: '🏛️',
        isOrganization: true,
        university: 'UC Berkeley'
      },
      content: {
        caption: 'Leadership Workshop Series starts next week! 🎯 Develop essential skills with industry professionals. Topics include public speaking, team management, and strategic planning. #Leadership #Workshop #GreekLife #UCBerkeley',
        image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600&h=400&fit=crop&crop=center&q=80',
        eventDetails: {
          date: 'March 28, 2024',
          time: '2:00 PM',
          location: 'Business School Auditorium',
          attendees: 67
        }
      },
      likes: 76,
      comments: [
        {
          id: 1,
          author: 'Jessica Lee',
          avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
          text: 'Perfect timing! I need to improve my leadership skills!',
          timestamp: '1 hour ago'
        }
      ],
      shares: 8,
      timestamp: '7 hours ago',
      isLiked: false,
      isSaved: false
    }
  ]);



  const handleLike = (postId) => {
    // In a real app, this would update the backend
    console.log('Liked post:', postId);
    // Toggle the liked state for the specific post
    const updatedPosts = feedPosts.map(post => 
      post.id === postId ? { ...post, isLiked: !post.isLiked } : post
    );
    setFeedPosts(updatedPosts);
  };

  const handleComment = (postId) => {
    const post = feedPosts.find(p => p.id === postId);
    setSelectedPost(post);
    setShowComments(true);
  };

  const handleShare = (postId) => {
    // In a real app, this would open a share modal
    console.log('Share post:', postId);
  };

  const handleSave = (postId) => {
    // In a real app, this would update the backend
    console.log('Save post:', postId);
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      // In a real app, this would add the comment to the backend
      console.log('Adding comment:', newComment);
      setNewComment('');
    }
  };

  const closeComments = () => {
    setShowComments(false);
    setSelectedPost(null);
    setNewComment('');
  };

  const handleEventClick = (eventId) => {
    onNavigate('events');
  };

  const handleActionClick = (action) => {
    onNavigate(action);
  };

  const renderFeedPost = (post) => (
    <div key={post.id} className="feed-post">
      {/* Post Header */}
      <div className="post-header">
        <div className="post-author">
          <div className="author-avatar">
            {post.author.isOrganization ? (
              <span className="org-avatar">{post.author.avatar}</span>
            ) : (
              <img 
                src={post.author.avatar} 
                alt={post.author.name}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
            )}
            {!post.author.isOrganization && (
              <div className="avatar-fallback" style={{ display: 'none' }}>
                {post.author.name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <div className="author-info">
            <h4 className="author-name">{post.author.name}</h4>
            <p className="author-details">
              {post.author.university}
              {post.author.organization && !post.author.isOrganization && (
                <span className="author-org"> • {post.author.organization}</span>
              )}
            </p>
          </div>
        </div>
        <div className="post-actions">
          <button className="post-action-btn">⋯</button>
        </div>
      </div>

      {/* Post Image */}
      {post.content.image && (
        <div className="post-image-container">
          <img 
            src={post.content.image} 
            alt="Post content"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentElement.innerHTML = '<div class="image-error">Image not available</div>';
            }}
          />
        </div>
      )}

      {/* Post Content */}
      <div className="post-content">
        {/* Caption */}
        <div className="post-caption">
          <span className="caption-author">{post.author.name}</span>
          <span className="caption-text">{post.content.caption}</span>
        </div>

        {/* Event Card */}
        {post.content.eventDetails && (
          <div className="event-card" onClick={() => handleEventClick(post.content.eventDetails)}>
            <div className="event-info">
              <h4>📅 {post.content.eventDetails.date}</h4>
              <p>🕒 {post.content.eventDetails.time}</p>
              <p>📍 {post.content.eventDetails.location}</p>
              <p>👥 {post.content.eventDetails.attendees} attending</p>
            </div>
            <button className="event-btn">View Event</button>
          </div>
        )}

        {/* Comments Preview */}
        {post.comments.length > 0 && (
          <div className="comments-preview">
            <div className="comment-preview">
              <span className="comment-author">{post.comments[0].author}</span>
              <span className="comment-text">{post.comments[0].text}</span>
            </div>
            {post.comments.length > 1 && (
              <button className="view-comments-btn" onClick={() => handleComment(post.id)}>
                View all {post.comments.length} comments
              </button>
            )}
          </div>
        )}
      </div>

      {/* Post Actions */}
      <div className="post-actions-bar">
        <div className="action-buttons">
          <button 
            className={`action-btn ${post.isLiked ? 'liked' : ''}`}
            onClick={() => handleLike(post.id)}
          >
            <span className="action-icon">{post.isLiked ? '❤️' : '🤍'}</span>
          </button>
          <button className="action-btn" onClick={() => handleComment(post.id)}>
            <span className="action-icon">💬</span>
          </button>
          <button className="action-btn" onClick={() => handleShare(post.id)}>
            <span className="action-icon">📤</span>
          </button>
        </div>
        <button 
          className={`save-btn ${post.isSaved ? 'saved' : ''}`}
          onClick={() => handleSave(post.id)}
        >
          <span className="action-icon">{post.isSaved ? '🔖' : '📌'}</span>
        </button>
      </div>

      {/* Post Stats */}
      <div className="post-stats">
        <span className="likes-count">{post.likes} likes</span>
        <span className="post-time">{post.timestamp}</span>
      </div>
    </div>
  );

  return (
    <div className="home-screen">
      <div className="user-info-section">
        <div className="user-info-card">
          <div className="user-avatar">
            <img src={user?.avatar || user?.image || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"} alt="User" />
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
        <div className="community-feed-full">
          <div className="feed-list">
            {feedPosts.map(renderFeedPost)}
          </div>
        </div>
      </div>

      {/* Comments Modal */}
      {showComments && selectedPost && (
        <div className="comments-modal-overlay" onClick={closeComments}>
          <div className="comments-modal" onClick={(e) => e.stopPropagation()}>
            <div className="comments-modal-header">
              <h3>Comments</h3>
              <button className="close-btn" onClick={closeComments}>×</button>
            </div>
            
            <div className="comments-modal-content">
              <div className="post-preview">
                <div className="post-preview-header">
                  <div className="post-preview-author">
                    <div className="post-preview-avatar">
                      {selectedPost.author.isOrganization ? (
                        <span className="org-avatar">{selectedPost.author.avatar}</span>
                      ) : (
                        <img src={selectedPost.author.avatar} alt={selectedPost.author.name} />
                      )}
                    </div>
                    <div className="post-preview-info">
                      <h4>{selectedPost.author.name}</h4>
                      <p>{selectedPost.content.caption.substring(0, 100)}...</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="comments-list">
                {selectedPost.comments.map(comment => (
                  <div key={comment.id} className="comment-item">
                    <div className="comment-avatar">
                      <img src={comment.avatar} alt={comment.author} />
                    </div>
                    <div className="comment-content">
                      <div className="comment-header">
                        <span className="comment-author">{comment.author}</span>
                        <span className="comment-time">{comment.timestamp}</span>
                      </div>
                      <p className="comment-text">{comment.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="add-comment-section">
                <div className="comment-input-container">
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="comment-input"
                    onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
                  />
                  <button 
                    className="comment-submit-btn"
                    onClick={handleAddComment}
                    disabled={!newComment.trim()}
                  >
                    Post
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeScreen; 