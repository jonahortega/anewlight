import React, { useState, useEffect } from 'react';
import './HomeScreen.css';

const HomeScreen = ({ user, onNavigate, joinedEvents, setJoinedEvents }) => {
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
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
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

    // Use the same events data as EventsScreen
    const eventsData = [
      {
        id: 1,
        title: "Summer Formal 2025",
        organization: "Alpha Beta Gamma Fraternity",
        date: "July 5, 2025",
        time: "8:00 PM",
        location: "Grand Ballroom",
        description: "Join us for our annual summer formal celebration with live music, dancing, and great food. Dress to impress and enjoy an unforgettable evening with your Greek family!",
        attendees: 127,
        maxAttendees: 200,
        image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=600&fit=crop&crop=center&q=80",
        isPaid: true,
        price: 25,
        category: "Social",
        tags: ["formal", "dancing", "music"]
      },
      {
        id: 2,
        title: "Charity Fundraiser Gala",
        organization: "Delta Epsilon Zeta Sorority",
        date: "July 12, 2025",
        time: "6:30 PM",
        location: "Delta Epsilon Zeta House",
        description: "Support breast cancer awareness with our annual philanthropy fundraiser! Enjoy gourmet food, silent auctions, and inspiring speakers while making a difference.",
        attendees: 89,
        maxAttendees: 150,
        image: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800&h=600&fit=crop&crop=center&q=80",
        isPaid: true,
        price: 35,
        category: "Philanthropy",
        tags: ["charity", "fundraiser", "awareness"]
      },
      {
        id: 3,
        title: "Community Service Day",
        organization: "Theta Iota Kappa Fraternity",
        date: "July 15, 2025",
        time: "9:00 AM",
        location: "Local Community Center",
        description: "Make a positive impact in our community! We'll be working on various projects including park cleanup, food bank assistance, and mentoring local youth.",
        attendees: 28,
        maxAttendees: 40,
        image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&h=600&fit=crop&crop=center&q=80",
        isPaid: false,
        price: null,
        category: "Service",
        tags: ["community", "volunteer", "impact"]
      },
      {
        id: 4,
        title: "Leadership Workshop Series",
        organization: "Greek Life Council",
        date: "July 18, 2025",
        time: "2:00 PM",
        location: "Business School Auditorium",
        description: "Develop essential leadership skills with industry professionals and interactive workshops. Topics include public speaking, team management, and strategic planning.",
        attendees: 67,
        maxAttendees: 100,
        image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&h=600&fit=crop&crop=center&q=80",
        isPaid: true,
        price: 20,
        category: "Leadership",
        tags: ["workshop", "skills", "professional"]
      },
      {
        id: 5,
        title: "Beach Day Social",
        organization: "Alpha Beta Gamma Fraternity",
        date: "July 22, 2025",
        time: "11:00 AM",
        location: "Crystal Beach",
        description: "Enjoy a perfect day at the beach with your Greek family! We'll have beach games, volleyball, and a BBQ. Don't forget your sunscreen and beach towel!",
        attendees: 156,
        maxAttendees: 200,
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop&crop=center&q=80",
        isPaid: false,
        price: null,
        category: "Social",
        tags: ["beach", "outdoor", "fun"]
      },
      {
        id: 6,
        title: "Study Session & Academic Support",
        organization: "Theta Iota Kappa Fraternity",
        date: "July 25, 2025",
        time: "7:00 PM",
        location: "Library Study Room 3",
        description: "Join our weekly academic support session! Bring your books and questions. We'll have tutors available for various subjects and quiet study spaces.",
        attendees: 45,
        maxAttendees: 50,
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop&crop=center&q=80",
        isPaid: false,
        price: null,
        category: "Academic",
        tags: ["study", "tutoring", "academic"]
      },
      {
        id: 7,
        title: "Greek Olympics",
        organization: "Greek Life Council",
        date: "July 28, 2025",
        time: "10:00 AM",
        location: "University Stadium",
        description: "Compete in the annual Greek Olympics! Events include tug-of-war, relay races, and team challenges. Show your Greek pride and win bragging rights!",
        attendees: 234,
        maxAttendees: 300,
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&crop=center&q=80",
        isPaid: false,
        price: null,
        category: "Social",
        tags: ["competition", "sports", "team"]
      },
      {
        id: 8,
        title: "Career Networking Mixer",
        organization: "Professional Greek Association",
        date: "July 30, 2025",
        time: "6:00 PM",
        location: "Alumni Center",
        description: "Connect with Greek alumni and industry professionals! Perfect opportunity for internships, job opportunities, and professional development.",
        attendees: 78,
        maxAttendees: 120,
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop&crop=center&q=80",
        isPaid: true,
        price: 15,
        category: "Professional",
        tags: ["networking", "career", "alumni"]
      }
    ];

    // Convert events to feed posts
    return eventsData.map((event, index) => {
      const captions = [
        `🎉 Exciting news! Our annual ${event.title} is just around the corner! Join us for an unforgettable experience. This is one event you won't want to miss! #${event.category} #GreekLife #${universityShort.replace(/\s+/g, '')}`,
        `❤️ Join us for ${event.title}! ${event.description.split('.')[0]}. Let's make memories together! #${event.category} #GreekLife #${universityShort.replace(/\s+/g, '')}`,
        `🤝 ${event.title} is coming up! ${event.description.split('.')[0]}. Everyone is welcome! #${event.category} #GreekLife #${universityShort.replace(/\s+/g, '')}`,
        `⭐ ${event.title} is back! ${event.description.split('.')[0]}. Don't miss this opportunity! #${event.category} #GreekLife #${universityShort.replace(/\s+/g, '')}`,
        `🏖️ ${event.title} is happening! ${event.description.split('.')[0]}. Can't wait to see you there! #${event.category} #GreekLife #${universityShort.replace(/\s+/g, '')}`,
        `📚 ${event.title} is here! ${event.description.split('.')[0]}. Perfect for academic success! #${event.category} #GreekLife #${universityShort.replace(/\s+/g, '')}`,
        `🏆 ${event.title} is coming! ${event.description.split('.')[0]}. Show your Greek pride! #${event.category} #GreekLife #${universityShort.replace(/\s+/g, '')}`,
        `💼 ${event.title} is approaching! ${event.description.split('.')[0]}. Great networking opportunity! #${event.category} #GreekLife #${universityShort.replace(/\s+/g, '')}`
      ];

      const organizationAvatars = {
        "Alpha Beta Gamma Fraternity": "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=150&h=150&fit=crop&crop=center&q=80",
        "Delta Epsilon Zeta Sorority": "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=150&h=150&fit=crop&crop=center&q=80",
        "Theta Iota Kappa Fraternity": "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=150&h=150&fit=crop&crop=center&q=80",
        "Greek Life Council": "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=150&h=150&fit=crop&crop=center&q=80",
        "Professional Greek Association": "https://images.unsplash.com/photo-1552664730-d307ca884978?w=150&h=150&fit=crop&crop=center&q=80"
      };

      const organizationTypes = {
        "Alpha Beta Gamma Fraternity": "Fraternity",
        "Delta Epsilon Zeta Sorority": "Sorority",
        "Theta Iota Kappa Fraternity": "Fraternity",
        "Greek Life Council": "Council",
        "Professional Greek Association": "Professional Association"
      };

      return {
        id: event.id,
        type: 'event',
        author: {
          name: event.organization,
          avatar: organizationAvatars[event.organization] || "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=150&h=150&fit=crop&crop=center&q=80",
          isOrganization: true,
          university: university,
          organization: organizationTypes[event.organization] || "Organization"
        },
        content: {
          caption: captions[index % captions.length],
          image: event.image,
          eventDetails: {
            id: event.id,
            title: event.title,
            date: event.date,
            time: event.time,
            location: event.location,
            description: event.description,
            isPaid: event.isPaid,
            price: event.price,
            attendees: event.attendees,
            maxAttendees: event.maxAttendees,
            category: event.category
          }
        },
        likes: Math.floor(Math.random() * 200) + 50,
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
        shares: Math.floor(Math.random() * 50) + 10,
        timestamp: `${Math.floor(Math.random() * 24) + 1} hours ago`,
        isLiked: false,
        isSaved: false
      };
    });
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
    console.log('Join for event:', selectedEvent);
    console.log('isPaid:', selectedEvent.isPaid);
    console.log('price:', selectedEvent.price);
    
    // If it's a paid event, show payment modal
    if (selectedEvent.isPaid || selectedEvent.price) {
      console.log('Showing payment modal');
      setShowPaymentModal(true);
      setShowEventModal(false);
    } else {
      console.log('Closing modal - free event');
      // For free events, add to joined events and close modal
      addToJoinedEvents(selectedEvent);
      closeEventModal();
    }
  };

  const addToJoinedEvents = (event) => {
    const eventWithId = {
      ...event,
      id: event.id || `event_${Date.now()}`,
      joinedAt: new Date().toISOString()
    };
    
    setJoinedEvents(prev => {
      // Check if event is already joined
      const isAlreadyJoined = prev.some(e => e.id === eventWithId.id);
      if (isAlreadyJoined) {
        return prev;
      }
      return [...prev, eventWithId];
    });
    
    console.log('Added to joined events:', eventWithId);
    alert('Successfully joined the event!');
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
                                          {joinedEvents.some(event => event.id === post.content.eventDetails.id) ? (
                        <button className="event-action-btn joined" disabled>
                          ✓ Joined
                        </button>
                      ) : (
                        <button 
                          className="event-action-btn primary"
                          onClick={(e) => {
                            e.stopPropagation();
                            console.log('Join button clicked for event:', post.content.eventDetails);
                            console.log('isPaid:', post.content.eventDetails.isPaid);
                            console.log('price:', post.content.eventDetails.price);
                            
                            // Check if it's a paid event
                            if (post.content.eventDetails.isPaid || post.content.eventDetails.price) {
                              console.log('Setting up payment modal');
                              setSelectedEvent({ ...post.content.eventDetails, post });
                              setShowPaymentModal(true);
                            } else {
                              console.log('Free event - adding to joined events');
                              // For free events, add to joined events
                              addToJoinedEvents(post.content.eventDetails);
                            }
                          }}
                        >
                          Join
                        </button>
                      )}
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
                    <p>Join us for this exciting event!</p>
                  </div>

                  <div className="event-modal-actions">
                    <button 
                      className="event-modal-rsvp-btn"
                      onClick={handleEventRSVP}
                    >
                      Join
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

            {/* Payment Modal */}
      {console.log('Payment modal state:', { showPaymentModal, selectedEvent: !!selectedEvent })}
      
      {showPaymentModal && selectedEvent && (
        <div className="payment-modal-overlay" onClick={() => setShowPaymentModal(false)}>
          <div className="payment-modal" onClick={(e) => e.stopPropagation()}>
            <div className="payment-modal-header">
              <h3>Select Payment Method</h3>
              <button className="close-btn" onClick={() => setShowPaymentModal(false)}>×</button>
            </div>
            
            <div className="payment-modal-content">
              <div className="payment-event-info">
                <h4>Event Details</h4>
                <p><strong>Date:</strong> {selectedEvent.date}</p>
                <p><strong>Time:</strong> {selectedEvent.time}</p>
                <p><strong>Location:</strong> {selectedEvent.location}</p>
              </div>
              
              <div className="payment-amount">
                <div className="amount-label">Total Amount:</div>
                <div className="amount-value">${selectedEvent.price}</div>
              </div>
              
              <div className="payment-methods">
                <div 
                  className={`payment-method-option ${selectedPaymentMethod === 'card' ? 'selected' : ''}`}
                  onClick={() => setSelectedPaymentMethod('card')}
                >
                  <div className="payment-method-icon">💳</div>
                  <div className="payment-method-text">Credit/Debit Card</div>
                </div>
                <div 
                  className={`payment-method-option ${selectedPaymentMethod === 'paypal' ? 'selected' : ''}`}
                  onClick={() => setSelectedPaymentMethod('paypal')}
                >
                  <div className="payment-method-icon">📱</div>
                  <div className="payment-method-text">PayPal</div>
                </div>

              </div>
              
              <div className="payment-actions">
                <button 
                  className={`pay-btn ${!selectedPaymentMethod ? 'disabled' : ''}`} 
                  onClick={() => {
                    if (selectedPaymentMethod) {
                      alert(`Payment processed successfully using ${selectedPaymentMethod === 'card' ? 'Credit/Debit Card' : 'PayPal'}!`);
                      addToJoinedEvents(selectedEvent);
                      setShowPaymentModal(false);
                      setSelectedEvent(null);
                      setSelectedPaymentMethod(null);
                    } else {
                      alert('Please select a payment method first!');
                    }
                  }}
                  disabled={!selectedPaymentMethod}
                >
                  Pay ${selectedEvent.price}
                </button>
                <button className="cancel-btn" onClick={() => {
                  setShowPaymentModal(false);
                  setSelectedPaymentMethod(null);
                }}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeScreen; 