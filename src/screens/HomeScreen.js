import React, { useState, useEffect } from 'react';
import './HomeScreen.css';

const HomeScreen = ({ user, onNavigate }) => {
  const [selectedPost, setSelectedPost] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [showShareModal, setShowShareModal] = useState(false);
  const [sharePost, setSharePost] = useState(null);
  const [shareMessage, setShareMessage] = useState('');
  const [selectedRecipient, setSelectedRecipient] = useState('');
  const [recipientType, setRecipientType] = useState('person'); // 'person' or 'organization'
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  // Function to generate feed posts based on user's university
  const generateFeedPosts = (userUniversity) => {
    const university = userUniversity || 'University of California, Berkeley';
    const universityShort = university.includes('UC Berkeley') ? 'UC Berkeley' : 
                           university.includes('Stanford') ? 'Stanford' :
                           university.includes('UCLA') ? 'UCLA' :
                           university.includes('USC') ? 'USC' :
                           university.includes('NYU') ? 'NYU' :
                           university.includes('Harvard') ? 'Harvard' :
                           university.includes('MIT') ? 'MIT' :
                           university.includes('Yale') ? 'Yale' :
                           university.includes('Princeton') ? 'Princeton' :
                           university.includes('Columbia') ? 'Columbia' :
                           university.split(',')[0]; // Use first part of university name

    return [
      {
        id: 1,
        type: 'event',
        author: {
          name: 'Alpha Beta Gamma',
          avatar: '🏛️',
          isOrganization: true,
          university: university
        },
        content: {
          caption: `Spring Formal 2024 is just around the corner! 🎉 Join us for an unforgettable night of dancing, great food, and amazing company. Early bird tickets are selling fast! #SpringFormal #GreekLife #${universityShort.replace(/\s+/g, '')}`,
          image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&h=400&fit=crop&crop=center&q=80',
          eventDetails: {
            date: 'March 15, 2024',
            time: '8:00 PM',
            location: 'Grand Ballroom',
            attendees: 127,
            maxAttendees: 200,
            isPaid: true,
            price: 25,
            category: 'Social'
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
        type: 'past-event',
        author: {
          name: 'Delta Epsilon Zeta',
          avatar: '🏛️',
          isOrganization: true,
          university: university
        },
        content: {
          caption: `What an incredible philanthropy fundraiser last night! 🎗️ Thank you to everyone who came out to support breast cancer awareness. We raised over $3,500! The silent auction was amazing and the guest speakers were truly inspiring. Can't wait for our next event! #Philanthropy #Charity #DEZ #${universityShort.replace(/\s+/g, '')}`,
          image: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=600&h=400&fit=crop&crop=center&q=80',
          eventDetails: {
            date: 'March 8, 2024',
            time: '6:30 PM',
            location: 'Delta Epsilon Zeta House',
            attendees: 156,
            maxAttendees: 150,
            isPaid: true,
            price: 35,
            category: 'Philanthropy',
            isPast: true,
            fundsRaised: 3500,
            nextEvent: 'March 22, 2024'
          }
        },
        likes: 234,
        comments: [
          {
            id: 1,
            author: 'Rachel Green',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
            text: 'Such an amazing night! The energy was incredible! 💕',
            timestamp: '2 hours ago'
          },
          {
            id: 2,
            author: 'Alex Thompson',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
            text: 'Proud to be part of such an impactful event!',
            timestamp: '3 hours ago'
          }
        ],
        shares: 45,
        timestamp: '1 day ago',
        isLiked: true,
        isSaved: false
      },
      {
        id: 3,
        type: 'photo',
        author: {
          name: 'Sarah Johnson',
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
          isOrganization: false,
          university: university,
          organization: 'Delta Epsilon Zeta'
        },
      content: {
        caption: 'Amazing time at our sisterhood retreat this weekend! 💕 The bonds we create here are truly special. Can\'t wait for our next adventure together! #Sisterhood #GreekLife #Retreat #DEZ',
        image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&h=400&fit=crop&crop=center&q=80',
        eventDetails: {
          date: 'March 10-12, 2024',
          time: 'All Day Event',
          location: 'Lake Tahoe Resort',
          attendees: 45,
          maxAttendees: 50,
          isPaid: false,
          price: null,
          category: 'Retreat'
        }
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
        id: 4,
        type: 'past-event',
        author: {
          name: 'Theta Iota Kappa',
          avatar: '🏛️',
          isOrganization: true,
          university: university
        },
      content: {
        caption: 'Winter Formal was absolutely magical! ❄️✨ Thank you to all 180+ brothers and guests who made it such a special night. The venue was stunning, the music was perfect, and the memories we made will last forever. Our next social event is coming up soon! #WinterFormal #TIK #GreekLife #UCBerkeley',
        image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&h=400&fit=crop&crop=center&q=80',
        eventDetails: {
          date: 'February 24, 2024',
          time: '8:00 PM',
          location: 'Grand Ballroom',
          attendees: 182,
          maxAttendees: 200,
          isPaid: true,
          price: 30,
          category: 'Social',
          isPast: true,
          nextEvent: 'March 20, 2024'
        }
      },
      likes: 198,
      comments: [
        {
          id: 1,
          author: 'David Rodriguez',
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
          text: 'Best formal ever! The decorations were incredible!',
          timestamp: '1 day ago'
        },
        {
          id: 2,
          author: 'Mike Johnson',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
          text: 'Can\'t believe how amazing it was! Already excited for next time!',
          timestamp: '2 days ago'
        }
      ],
      shares: 67,
      timestamp: '3 days ago',
      isLiked: false,
      isSaved: true
    },
    {
      id: 5,
      type: 'announcement',
      author: {
        name: 'Theta Iota Kappa',
        avatar: '🏛️',
        isOrganization: true,
        university: 'UC Berkeley'
      },
      content: {
        caption: 'Congratulations to our brothers who made Dean\'s List this semester! 🎓 Your hard work and dedication inspire us all. Keep up the excellent work! #AcademicExcellence #DeanList #TIK #UCBerkeley',
        image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop&crop=center&q=80',
        eventDetails: {
          date: 'March 20, 2024',
          time: '6:00 PM',
          location: 'TIK House',
          attendees: 28,
          maxAttendees: 35,
          isPaid: false,
          price: null,
          category: 'Academic'
        }
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
      id: 6,
      type: 'past-event',
      author: {
        name: 'Alpha Beta Gamma',
        avatar: '🏛️',
        isOrganization: true,
        university: 'UC Berkeley'
      },
      content: {
        caption: 'Community Service Day was a huge success! 👥 We had 42 brothers show up to help clean up the local park and assist at the food bank. The community was so grateful and we made a real difference. Our next service event is scheduled for April 5th! #CommunityService #Volunteer #ABG #UCBerkeley',
        image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&h=400&fit=crop&crop=center&q=80',
        eventDetails: {
          date: 'March 1, 2024',
          time: '9:00 AM - 3:00 PM',
          location: 'Local Community Center',
          attendees: 42,
          maxAttendees: 40,
          isPaid: false,
          price: null,
          category: 'Service',
          isPast: true,
          hoursVolunteered: 6,
          nextEvent: 'April 5, 2024'
        }
      },
      likes: 145,
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
      shares: 23,
      timestamp: '1 week ago',
      isLiked: false,
      isSaved: true
    },
    {
      id: 7,
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
          attendees: 67,
          maxAttendees: 100,
          isPaid: true,
          price: 20,
          category: 'Leadership'
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
  ];
  };

  const [feedPosts, setFeedPosts] = useState(generateFeedPosts(user?.university));

  // Update feed when user's university changes
  useEffect(() => {
    setFeedPosts(generateFeedPosts(user?.university));
  }, [user?.university]);

  // Mock data for share recipients
  const shareRecipients = {
    people: [
      { id: 1, name: 'Sarah Johnson', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face', university: user?.university || 'University of California, Berkeley' },
      { id: 2, name: 'Michael Chen', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face', university: user?.university || 'University of California, Berkeley' },
      { id: 3, name: 'Emma Wilson', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face', university: user?.university || 'University of California, Berkeley' },
      { id: 4, name: 'Jessica Lee', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face', university: user?.university || 'University of California, Berkeley' },
      { id: 5, name: 'David Rodriguez', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face', university: user?.university || 'University of California, Berkeley' }
    ],
    organizations: [
      { id: 1, name: 'Alpha Beta Gamma', avatar: '🏛️', type: 'Fraternity', university: user?.university || 'University of California, Berkeley' },
      { id: 2, name: 'Delta Epsilon Zeta', avatar: '🏛️', type: 'Sorority', university: user?.university || 'University of California, Berkeley' },
      { id: 3, name: 'Theta Iota Kappa', avatar: '🏛️', type: 'Fraternity', university: user?.university || 'University of California, Berkeley' },
      { id: 4, name: 'Lambda Mu Nu', avatar: '🏛️', type: 'Sorority', university: user?.university || 'University of California, Berkeley' },
      { id: 5, name: 'Sigma Tau Upsilon', avatar: '🏛️', type: 'Fraternity', university: user?.university || 'University of California, Berkeley' }
    ]
  };

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
    const post = feedPosts.find(p => p.id === postId);
    setSharePost(post);
    setShowShareModal(true);
    setShareMessage('');
    setSelectedRecipient('');
    setRecipientType('person');
  };

  const closeShareModal = () => {
    setShowShareModal(false);
    setSharePost(null);
    setShareMessage('');
    setSelectedRecipient('');
  };

  const handleSendShare = () => {
    if (selectedRecipient && sharePost) {
      // In a real app, this would send the share to the backend
      console.log('Sharing post:', sharePost.id, 'to:', selectedRecipient, 'type:', recipientType, 'message:', shareMessage);
      alert(`Post shared successfully to ${selectedRecipient}!`);
      closeShareModal();
    } else {
      alert('Please select a recipient to share with.');
    }
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

  const handleLearnMore = (eventDetails, post) => {
    setSelectedEvent({ ...eventDetails, post });
    setShowEventModal(true);
  };

  const closeEventModal = () => {
    setShowEventModal(false);
    setSelectedEvent(null);
  };

  const handleEventRSVP = () => {
    // Handle RSVP logic here
    console.log('RSVP for event:', selectedEvent);
    // You could add logic to update the event attendance count
    closeEventModal();
  };

  const handleEventShare = () => {
    setSharePost(selectedEvent.post);
    setShowEventModal(false);
    setShowShareModal(true);
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

        {/* Enhanced Event Card */}
        {post.content.eventDetails && (
          <div className="event-card" onClick={() => handleEventClick(post.content.eventDetails)}>
            <div className="event-header">
              <div className="event-category-badge">
                {post.content.eventDetails.category}
              </div>
              {post.content.eventDetails.isPast ? (
                <div className="event-past-badge">
                  Past Event
                </div>
              ) : post.content.eventDetails.isPaid && (
                <div className="event-price-badge">
                  ${post.content.eventDetails.price}
                </div>
              )}
            </div>
            <div className="event-content">
              <div className="event-details">
                <div className="event-detail-item">
                  <span className="event-icon">📅</span>
                  <span className="event-text">{post.content.eventDetails.date}</span>
                </div>
                <div className="event-detail-item">
                  <span className="event-icon">🕒</span>
                  <span className="event-text">{post.content.eventDetails.time}</span>
                </div>
                <div className="event-detail-item">
                  <span className="event-icon">📍</span>
                  <span className="event-text">{post.content.eventDetails.location}</span>
                </div>
                <div className="event-detail-item">
                  <span className="event-icon">👥</span>
                  <span className="event-text">
                    {post.content.eventDetails.isPast 
                      ? `${post.content.eventDetails.attendees} attended`
                      : `${post.content.eventDetails.attendees}/${post.content.eventDetails.maxAttendees} attending`
                    }
                  </span>
                </div>
                {post.content.eventDetails.isPast && post.content.eventDetails.fundsRaised && (
                  <div className="event-detail-item">
                    <span className="event-icon">💰</span>
                    <span className="event-text">${post.content.eventDetails.fundsRaised} raised</span>
                  </div>
                )}
                {post.content.eventDetails.isPast && post.content.eventDetails.hoursVolunteered && (
                  <div className="event-detail-item">
                    <span className="event-icon">⏱️</span>
                    <span className="event-text">{post.content.eventDetails.hoursVolunteered} hours</span>
                  </div>
                )}
                {post.content.eventDetails.isPast && post.content.eventDetails.nextEvent && (
                  <div className="event-detail-item next-event">
                    <span className="event-icon">🎉</span>
                    <span className="event-text">Next: {post.content.eventDetails.nextEvent}</span>
                  </div>
                )}
              </div>
              <div className="event-actions">
                {!post.content.eventDetails.isPast && (
                  <>
                    <button className="event-action-btn primary">
                      {post.content.eventDetails.isPaid ? 'Get Tickets' : 'RSVP Now'}
                    </button>
                    <button 
                      className="event-action-btn secondary"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLearnMore(post.content.eventDetails, post);
                      }}
                    >
                      Learn More
                    </button>
                  </>
                )}
              </div>
            </div>
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
          <span className="action-icon">{post.isSaved ? '🔖' : ''}</span>
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

      {/* Share Modal */}
      {showShareModal && sharePost && (
        <div className="share-modal-overlay" onClick={closeShareModal}>
          <div className="share-modal" onClick={(e) => e.stopPropagation()}>
            <div className="share-modal-header">
              <h3>Share Post</h3>
              <button className="close-btn" onClick={closeShareModal}>×</button>
            </div>
            
            <div className="share-modal-content">
              {/* Post Preview */}
              <div className="share-post-preview">
                <div className="share-post-header">
                  <div className="share-post-author">
                    <div className="share-post-avatar">
                      {sharePost.author.isOrganization ? (
                        <span className="org-avatar">{sharePost.author.avatar}</span>
                      ) : (
                        <img src={sharePost.author.avatar} alt={sharePost.author.name} />
                      )}
                    </div>
                    <div className="share-post-info">
                      <h4>{sharePost.author.name}</h4>
                      <p>{sharePost.content.caption.substring(0, 100)}...</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recipient Type Selection */}
              <div className="share-recipient-type">
                <label>
                  <input
                    type="radio"
                    name="recipientType"
                    value="person"
                    checked={recipientType === 'person'}
                    onChange={(e) => setRecipientType(e.target.value)}
                  />
                  Share with Person
                </label>
                <label>
                  <input
                    type="radio"
                    name="recipientType"
                    value="organization"
                    checked={recipientType === 'organization'}
                    onChange={(e) => setRecipientType(e.target.value)}
                  />
                  Share with Organization
                </label>
              </div>

              {/* Recipient Selection */}
              <div className="share-recipient-selection">
                <label>Select Recipient:</label>
                <select 
                  value={selectedRecipient} 
                  onChange={(e) => setSelectedRecipient(e.target.value)}
                  className="share-recipient-select"
                >
                  <option value="">Choose a {recipientType}...</option>
                  {recipientType === 'person' 
                    ? shareRecipients.people.map(person => (
                        <option key={person.id} value={person.name}>
                          {person.name} - {person.university}
                        </option>
                      ))
                    : shareRecipients.organizations.map(org => (
                        <option key={org.id} value={org.name}>
                          {org.name} ({org.type}) - {org.university}
                        </option>
                      ))
                  }
                </select>
              </div>

              {/* Message Input */}
              <div className="share-message-input">
                <label>Add a message (optional):</label>
                <textarea
                  value={shareMessage}
                  onChange={(e) => setShareMessage(e.target.value)}
                  placeholder="Add a personal message..."
                  className="share-message-textarea"
                  rows="3"
                />
              </div>

              {/* Share Button */}
              <div className="share-actions">
                <button 
                  className="share-send-btn"
                  onClick={handleSendShare}
                  disabled={!selectedRecipient}
                >
                  Send Share
                </button>
                <button 
                  className="share-cancel-btn"
                  onClick={closeShareModal}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Event Details Modal */}
      {showEventModal && selectedEvent && (
        <div className="event-modal-overlay" onClick={closeEventModal}>
          <div className="event-modal" onClick={(e) => e.stopPropagation()}>
            <div className="event-modal-header">
              <h3>Event Details</h3>
              <button className="close-btn" onClick={closeEventModal}>×</button>
            </div>
            
            <div className="event-modal-content">
              {/* Event Image */}
              {selectedEvent.post.content.image && (
                <div className="event-modal-image">
                  <img src={selectedEvent.post.content.image} alt="Event" />
                </div>
              )}
              
              {/* Event Details */}
              <div className="event-modal-details">
                <div className="event-modal-org-info">
                  <div className="event-modal-org-avatar">
                    {selectedEvent.post.author.isOrganization ? (
                      <span className="org-avatar">{selectedEvent.post.author.avatar}</span>
                    ) : (
                      <img src={selectedEvent.post.author.avatar} alt={selectedEvent.post.author.name} />
                    )}
                  </div>
                  <div className="event-modal-org-details">
                    <h4>{selectedEvent.post.author.name}</h4>
                    <p>{selectedEvent.post.author.university}</p>
                  </div>
                </div>

                <div className="event-modal-info">
                  <h2 className="event-modal-title">{selectedEvent.post.content.caption.split('!')[0]}!</h2>
                  
                  <div className="event-modal-details-grid">
                    <div className="event-modal-detail-item">
                      <span className="event-modal-icon">📅</span>
                      <div>
                        <label>Date</label>
                        <span>{selectedEvent.date}</span>
                      </div>
                    </div>
                    
                    <div className="event-modal-detail-item">
                      <span className="event-modal-icon">🕒</span>
                      <div>
                        <label>Time</label>
                        <span>{selectedEvent.time}</span>
                      </div>
                    </div>
                    
                    <div className="event-modal-detail-item">
                      <span className="event-modal-icon">📍</span>
                      <div>
                        <label>Location</label>
                        <span>{selectedEvent.location}</span>
                      </div>
                    </div>
                    
                    <div className="event-modal-detail-item">
                      <span className="event-modal-icon">👥</span>
                      <div>
                        <label>Attendance</label>
                        <span>{selectedEvent.attendees}/{selectedEvent.maxAttendees} people</span>
                      </div>
                    </div>
                    
                    {selectedEvent.isPaid && (
                      <div className="event-modal-detail-item">
                        <span className="event-modal-icon">💰</span>
                        <div>
                          <label>Price</label>
                          <span>${selectedEvent.price}</span>
                        </div>
                      </div>
                    )}
                    
                    {selectedEvent.category && (
                      <div className="event-modal-detail-item">
                        <span className="event-modal-icon">🏷️</span>
                        <div>
                          <label>Category</label>
                          <span>{selectedEvent.category}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="event-modal-description">
                    <h4>About This Event</h4>
                    <p>{selectedEvent.post.content.caption}</p>
                  </div>

                  <div className="event-modal-actions">
                    <button 
                      className="event-modal-rsvp-btn"
                      onClick={handleEventRSVP}
                    >
                      {selectedEvent.isPaid ? 'Get Tickets' : 'RSVP Now'}
                    </button>
                    <button 
                      className="event-modal-share-btn"
                      onClick={handleEventShare}
                    >
                      Share Event
                    </button>
                  </div>
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