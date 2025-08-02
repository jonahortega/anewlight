import React, { useState } from 'react';
import './ProfileScreen.css';

const ProfileScreen = ({ user, onNavigate }) => {
  const [activeTab, setActiveTab] = useState('posts');
  const [selectedPost, setSelectedPost] = useState(null);
  const [showPostModal, setShowPostModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [selectedPostForComments, setSelectedPostForComments] = useState(null);
  const [showOrganizationsPopup, setShowOrganizationsPopup] = useState(false);
  const [showEventsPopup, setShowEventsPopup] = useState(false);
  const [showMembersPopup, setShowMembersPopup] = useState(false);
  const [selectedOrgForMembers, setSelectedOrgForMembers] = useState(null);
  const [showLeaveConfirmDialog, setShowLeaveConfirmDialog] = useState(false);
  const [showFinalConfirmDialog, setShowFinalConfirmDialog] = useState(false);
  const [selectedOrgToLeave, setSelectedOrgToLeave] = useState(null);
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [newPostImage, setNewPostImage] = useState(null);
  const [newPostCaption, setNewPostCaption] = useState('');
  const [selectedEventForPost, setSelectedEventForPost] = useState(null);
  const [showEventSelector, setShowEventSelector] = useState(false);
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [profile, setProfile] = useState({
    name: user?.name || "Alex Johnson",
    username: user?.username || "alex.johnson",
    organization: (user?.organization?.name || user?.greekOrganization?.name || null),
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
    posts: 5,
    organizations: 2,
    following: 4
  });

  // Debug logging to help identify issues
  console.log('ProfileScreen - User data:', user);
  console.log('ProfileScreen - Profile data:', profile);

  // Mock posts data with event details and descriptions
  const [posts, setPosts] = useState([
    {
      id: 1,
      type: 'event',
      content: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=400&fit=crop',
      caption: 'Amazing time at our chapter retreat! 🏛️ #GreekLife #Brotherhood',
      eventDetails: {
        name: 'Annual Chapter Retreat 2024',
        date: 'March 10-12, 2024',
        time: 'All Day Event',
        location: 'Lake Tahoe Resort',
        description: 'Our annual chapter retreat focused on team building, leadership development, and strengthening brotherhood bonds. Three days of activities, workshops, and unforgettable memories with the brothers.',
        attendees: 45,
        organization: 'Alpha Beta Gamma',
        eventType: 'Retreat',
        category: 'Leadership Development'
      },
      likes: 42,
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
      timestamp: '2 hours ago'
    },
    {
      id: 2,
      type: 'event',
      content: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&h=400&fit=crop',
      caption: 'Community service day with the brothers 👥 #Service #Community',
      eventDetails: {
        name: 'Community Service Day',
        date: 'March 8, 2024',
        time: '9:00 AM - 3:00 PM',
        location: 'Local Community Center',
        description: 'Annual community service event where our chapter volunteers at the local community center. We helped with food distribution, organized activities for children, and participated in neighborhood cleanup. Making a positive impact in our community through service and dedication.',
        attendees: 28,
        organization: 'Alpha Beta Gamma',
        eventType: 'Community Service',
        category: 'Philanthropy'
      },
      likes: 67,
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
      timestamp: '1 day ago'
    },
    {
      id: 3,
      type: 'event',
      content: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=400&fit=crop',
      caption: 'Study session with the squad 📚 #AcademicExcellence',
      eventDetails: {
        name: 'Academic Excellence Study Session',
        date: 'March 5, 2024',
        time: '6:00 PM - 9:00 PM',
        location: 'Chapter House Study Room',
        description: 'Weekly study session focused on academic excellence and peer tutoring. Brothers help each other with coursework, share study strategies, and maintain our commitment to scholastic achievement. Building a culture of academic success within our brotherhood.',
        attendees: 15,
        organization: 'Alpha Beta Gamma',
        eventType: 'Academic',
        category: 'Education'
      },
      likes: 28,
      comments: [
        { id: 1, user: 'daniel.kim', text: 'Study buddies for life! 📖', timestamp: '2 hours ago' },
        { id: 2, user: 'sophia.chen', text: 'Academic excellence! 💯', timestamp: '3 hours ago' },
        { id: 3, user: 'nathan.wong', text: 'Great study group!', timestamp: '4 hours ago' },
        { id: 4, user: 'isabella.nguyen', text: 'Love the study vibes!', timestamp: '5 hours ago' },
        { id: 5, user: 'ethan.patel', text: 'Knowledge is power! 💪', timestamp: '6 hours ago' }
      ],
      timestamp: '3 days ago'
    },
    {
      id: 4,
      type: 'event',
      content: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=400&fit=crop',
      caption: 'Spring Formal preparations are in full swing! 🎉 #SpringFormal #GreekLife',
      eventDetails: {
        name: 'Spring Formal 2024',
        date: 'March 15, 2024',
        time: '8:00 PM - 12:00 AM',
        location: 'Grand Ballroom, Downtown',
        description: 'Our annual Spring Formal is the highlight of the semester! A night of elegance, dancing, and celebration with brothers, dates, and special guests. Features live music, gourmet dinner, and unforgettable memories. Formal attire required.',
        attendees: 120,
        organization: 'Alpha Beta Gamma',
        eventType: 'Social',
        category: 'Formal Event'
      },
      likes: 89,
      comments: [
        { id: 1, user: 'emma.wilson', text: 'Can\'t wait for this! Already got my dress! 👗', timestamp: '1 hour ago' },
        { id: 2, user: 'michael.chen', text: 'This is going to be epic! 🎊', timestamp: '2 hours ago' },
        { id: 3, user: 'sarah.johnson', text: 'The decorations look amazing! ✨', timestamp: '3 hours ago' },
        { id: 4, user: 'david.rodriguez', text: 'Spring Formal is always the best night! 💫', timestamp: '4 hours ago' }
      ],
      timestamp: '4 days ago',
      liked: true
    },
    {
      id: 5,
      type: 'event',
      content: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=400&h=400&fit=crop',
      caption: 'Philanthropy fundraiser success! 🎗️ #Philanthropy #Charity #MakingADifference',
      eventDetails: {
        name: 'Breast Cancer Awareness Fundraiser',
        date: 'March 1, 2024',
        time: '6:30 PM - 9:30 PM',
        location: 'Alpha Beta Gamma House',
        description: 'Annual philanthropy fundraiser supporting breast cancer awareness and research. Features silent auctions, guest speakers, gourmet food, and community support. All proceeds go directly to breast cancer research and support programs.',
        attendees: 89,
        organization: 'Alpha Beta Gamma',
        eventType: 'Philanthropy',
        category: 'Charity Event'
      },
      likes: 156,
      comments: [
        { id: 1, user: 'rachel.green', text: 'Such an important cause! Count me in! 💕', timestamp: '2 hours ago' },
        { id: 2, user: 'alex.thompson', text: 'Amazing turnout for a great cause! 🙏', timestamp: '3 hours ago' },
        { id: 3, user: 'jessica.lee', text: 'Proud to be part of this! 💖', timestamp: '4 hours ago' },
        { id: 4, user: 'mike.davis', text: 'The impact we make is incredible! 🌟', timestamp: '5 hours ago' }
      ],
      timestamp: '5 days ago'
    }
  ]);

  // Mock user organizations data
  const userOrganizations = user?.organizations || (user?.organization ? [
    {
      id: 1,
      name: user.organization,
      type: "Greek Organization",
      role: "Member",
      joinedDate: "2023-09-15"
    }
  ] : []);



  // Mock data for attended events
  const attendedEvents = [
    {
      id: 1,
      name: 'Annual Chapter Retreat 2024',
      date: 'March 10-12, 2024',
      time: 'All Day Event',
      location: 'Lake Tahoe Resort',
      organization: 'Alpha Beta Gamma',
      eventType: 'Retreat',
      category: 'Leadership Development',
      attendees: 45,
      image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=400&fit=crop',
      description: 'Our annual chapter retreat focused on team building, leadership development, and strengthening brotherhood bonds.'
    },
    {
      id: 2,
      name: 'Community Service Day',
      date: 'March 8, 2024',
      time: '9:00 AM - 3:00 PM',
      location: 'Local Community Center',
      organization: 'Alpha Beta Gamma',
      eventType: 'Community Service',
      category: 'Philanthropy',
      attendees: 28,
      image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&h=400&fit=crop',
      description: 'Annual community service event where our chapter volunteers at the local community center.'
    },
    {
      id: 3,
      name: 'Academic Excellence Study Session',
      date: 'March 5, 2024',
      time: '6:00 PM - 9:00 PM',
      location: 'Chapter House Study Room',
      organization: 'Alpha Beta Gamma',
      eventType: 'Academic',
      category: 'Education',
      attendees: 15,
      image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=400&fit=crop',
      description: 'Weekly study session focused on academic excellence and peer tutoring.'
    },
    {
      id: 4,
      name: 'Spring Social Mixer',
      date: 'February 28, 2024',
      time: '7:00 PM - 11:00 PM',
      location: 'Greek Life Center',
      organization: 'Alpha Beta Gamma',
      eventType: 'Social',
      category: 'Networking',
      attendees: 120,
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=400&fit=crop',
      description: 'Spring social mixer with other Greek organizations to build connections and friendships.'
    }
  ];

  // Organization members data
  const getOrganizationMembers = (orgName) => {
    const membersData = {
      'Alpha Sigma Phi Fraternity': [
        {
          id: 1,
          name: "Alex Johnson",
          role: "Frat President",
          year: "Senior",
          major: "Computer Science",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
        },
        {
          id: 2,
          name: "Michael Rodriguez",
          role: "Vice President",
          year: "Senior",
          major: "Economics",
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
        },
        {
          id: 3,
          name: "David Kim",
          role: "Treasurer",
          year: "Junior",
          major: "Engineering",
          avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face"
        },
        {
          id: 4,
          name: "Chris Thompson",
          role: "Social Chair",
          year: "Junior",
          major: "Business",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
        },
        {
          id: 5,
          name: "Ryan Wilson",
          role: "Philanthropy Chair",
          year: "Sophomore",
          major: "Psychology",
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
        },
        {
          id: 6,
          name: "Jake Martinez",
          role: "Brother",
          year: "Freshman",
          major: "Biology",
          avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face"
        }
      ],
      'Computer Science Club': [
        {
          id: 1,
          name: "Dr. Robert Smith",
          role: "Faculty Advisor",
          year: "Professor",
          major: "Mathematics",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
        },
        {
          id: 2,
          name: "Kevin Zhang",
          role: "Club President",
          year: "Senior",
          major: "Mathematics",
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
        },
        {
          id: 3,
          name: "Maria Gonzalez",
          role: "Vice President",
          year: "Junior",
          major: "Computer Science",
          avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
        },
        {
          id: 4,
          name: "Daniel Park",
          role: "Treasurer",
          year: "Sophomore",
          major: "Physics",
          avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face"
        },
        {
          id: 5,
          name: "Sophie Anderson",
          role: "Secretary",
          year: "Sophomore",
          major: "Mathematics",
          avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
        }
      ]
    };
    
    return membersData[orgName] || [];
  };

  // Organization events data for new posts
  const getOrganizationEvents = (orgName) => {
    const eventsData = {
      'Alpha Sigma Phi Fraternity': [
        {
          id: 1,
          name: "Brotherhood Retreat",
          date: "2024-03-25",
          time: "7:00 PM",
          location: "Campus Center Ballroom",
          description: "Annual brotherhood bonding event with team building activities and social networking.",
          attendees: 45,
          maxAttendees: 60,
          image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=200&fit=crop"
        },
        {
          id: 2,
          name: "Philanthropy Fundraiser",
          date: "2024-03-30",
          time: "6:00 PM",
          location: "Greek Row",
          description: "Charity event to raise funds for our national philanthropy cause.",
          attendees: 38,
          maxAttendees: 50,
          image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&h=200&fit=crop"
        },
        {
          id: 3,
          name: "Academic Excellence Workshop",
          date: "2024-04-05",
          time: "3:00 PM",
          location: "Library Study Room",
          description: "Study skills workshop and academic support session for brothers.",
          attendees: 25,
          maxAttendees: 35,
          image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=200&fit=crop"
        }
      ],
      'Computer Science Club': [
        {
          id: 1,
          name: "Math Competition Prep",
          date: "2024-03-25",
          time: "4:00 PM",
          location: "Math Building",
          description: "Preparation session for upcoming math competitions and problem-solving practice.",
          attendees: 18,
          maxAttendees: 25,
          image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=200&fit=crop"
        },
        {
          id: 2,
          name: "Hackathon Planning Meeting",
          date: "2024-03-28",
          time: "5:00 PM",
          location: "Computer Science Lab",
          description: "Planning session for the upcoming campus hackathon event.",
          attendees: 12,
          maxAttendees: 20,
          image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=200&fit=crop"
        },
        {
          id: 3,
          name: "Guest Speaker Series",
          date: "2024-04-02",
          time: "6:30 PM",
          location: "Engineering Auditorium",
          description: "Tech industry professional sharing insights about software development careers.",
          attendees: 35,
          maxAttendees: 50,
          image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=200&fit=crop"
        }
      ]
    };
    
    return eventsData[orgName] || [];
  };

  const handleMembersClick = (orgName) => {
    setSelectedOrgForMembers(orgName);
    setShowMembersPopup(true);
  };

  const handleCloseMembersPopup = () => {
    setShowMembersPopup(false);
    setSelectedOrgForMembers(null);
  };

  const handleManageClick = (orgName) => {
    setSelectedOrgToLeave(orgName);
    setShowLeaveConfirmDialog(true);
  };

  const handleLeaveOrganization = () => {
    setShowLeaveConfirmDialog(false);
    setShowFinalConfirmDialog(true);
  };

  const handleConfirmLeave = () => {
    setShowFinalConfirmDialog(false);
    setSelectedOrgToLeave(null);
    alert("You have left the organization. You can join a new one from the Organizations tab.");
  };

  const handleCancelLeave = () => {
    setShowLeaveConfirmDialog(false);
    setShowFinalConfirmDialog(false);
    setSelectedOrgToLeave(null);
  };



  const handlePostClick = (post) => {
    setSelectedPost(post);
    setShowPostModal(true);
  };

  const handleCloseModal = () => {
    setShowPostModal(false);
    setSelectedPost(null);
  };



  const handleAddComment = (postId, commentText) => {
    // In a real app, this would add to the backend
    const newComment = {
      id: Date.now(),
      user: profile.username,
      text: commentText,
      timestamp: 'Just now'
    };
    
    // Update the post with the new comment (mock implementation)
    setSelectedPostForComments(prev => ({
      ...prev,
      comments: [...(prev.comments || []), newComment]
    }));
    
    // Also update the posts array to persist the comment
    setPosts(prevPosts => 
      prevPosts.map(post => 
        post.id === postId 
          ? { ...post, comments: [...(post.comments || []), newComment] }
          : post
      )
    );
  };

  const handleOrganizationsClick = () => {
    setShowOrganizationsPopup(true);
  };

  const handleCloseOrganizationsPopup = () => {
    setShowOrganizationsPopup(false);
  };

  const handleEventClick = (post) => {
    setSelectedEvent(post.eventDetails);
    setShowEventModal(true);
  };

  const handleCloseEventModal = () => {
    setShowEventModal(false);
    setSelectedEvent(null);
  };

  const handleCommentClick = (post) => {
    setSelectedPostForComments(post);
    setShowCommentModal(true);
  };

  const handleCloseCommentModal = () => {
    setShowCommentModal(false);
    setSelectedPostForComments(null);
  };

  const handleEventsClick = () => {
    setShowEventsPopup(true);
  };

  const handleCloseEventsPopup = () => {
    setShowEventsPopup(false);
  };

  // New post creation functions
  const handleNewPostClick = () => {
    setShowNewPostModal(true);
  };

  const handleCloseNewPostModal = () => {
    setShowNewPostModal(false);
    setNewPostImage(null);
    setNewPostCaption('');
    setSelectedEventForPost(null);
    setShowEventSelector(false);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setNewPostImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    const imageInput = document.getElementById('image-input');
    if (imageInput) {
      imageInput.click();
    }
  };

  const handleAttachEvent = () => {
    setShowEventSelector(true);
  };

  const handleSelectEvent = (event) => {
    setSelectedEventForPost(event);
    setShowEventSelector(false);
  };

  const handleRemoveEvent = () => {
    setSelectedEventForPost(null);
  };

  const handleSubmitPost = () => {
    if (!newPostImage) {
      alert('Please select an image for your post');
      return;
    }

    if (!newPostCaption.trim()) {
      alert('Please add a caption to your post');
      return;
    }

    // Create new post object
    const newPost = {
      id: Date.now(),
      type: selectedEventForPost ? 'event' : 'post',
      content: newPostImage,
      caption: newPostCaption,
      eventDetails: selectedEventForPost,
      likes: 0,
      comments: [],
      timestamp: 'Just now',
      author: profile.name,
      authorUsername: profile.username,
      authorImage: profile.image
    };

    // Add the new post to the posts array
    setPosts(prevPosts => [newPost, ...prevPosts]);
    
    // Update profile posts count
    setProfile(prevProfile => ({
      ...prevProfile,
      posts: prevProfile.posts + 1
    }));
    
    // Show success message
    alert('Post shared successfully!');
    
    // Close modal and reset form
    handleCloseNewPostModal();
  };

  const handleLikePost = (postId, event) => {
    event.stopPropagation(); // Prevent opening the post modal
    
    setLikedPosts(prevLiked => {
      const newLiked = new Set(prevLiked);
      if (newLiked.has(postId)) {
        newLiked.delete(postId);
        // Unlike - decrease count
        setPosts(prevPosts => 
          prevPosts.map(post => 
            post.id === postId 
              ? { ...post, likes: Math.max(0, post.likes - 1) }
              : post
          )
        );
      } else {
        newLiked.add(postId);
        // Like - increase count
        setPosts(prevPosts => 
          prevPosts.map(post => 
            post.id === postId 
              ? { ...post, likes: post.likes + 1 }
              : post
          )
        );
      }
      return newLiked;
    });
  };

  return (
    <div className="profile-screen">
      <div className="profile-container">
        {/* New Post Button - Floating at Top Right */}
        <div className="create-options-container">
          <button className="new-post-top-btn" onClick={handleNewPostClick}>
            <span>+</span>
          </button>
        </div>
        
        {/* Profile Header with Avatar at Top */}
        <div className="profile-header-section">
          <div className="profile-avatar-container">
            <div className="profile-avatar-border">
            <img src={profile.image} alt={profile.name} className="profile-avatar" />
            </div>
          </div>
          </div>
          
        {/* Profile Info Section */}
        <div className="profile-info-section">
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
              <div className="stat-item clickable" onClick={handleOrganizationsClick}>
                <span className="stat-number">{profile.organizations}</span>
                <span className="stat-label">organizations</span>
              </div>
                              <div className="stat-item clickable" onClick={handleEventsClick}>
                <span className="stat-number">{profile.following}</span>
                  <span className="stat-label">events</span>
              </div>
            </div>
            
            <div className="profile-bio-section">
              <p className="profile-bio">{profile.bio}</p>
            </div>
            

          </div>
        </div>

        {/* Tab Navigation */}
        <div className="profile-tabs">
          <button 
            className={`tab-button ${activeTab === 'posts' ? 'active' : ''}`}
            onClick={() => setActiveTab('posts')}
          >
            Posts
          </button>
          <button 
            className={`tab-button ${activeTab === 'organization' ? 'active' : ''}`}
            onClick={() => setActiveTab('organization')}
          >
            Organization
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
                    <div className="post-actions">
                      <button 
                        className={`like-btn ${likedPosts.has(post.id) ? 'liked' : ''}`}
                        onClick={(e) => handleLikePost(post.id, e)}
                      >
                        {likedPosts.has(post.id) ? '❤️' : '🤍'} {post.likes}
                      </button>
                      <button 
                        className="comment-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCommentClick(post);
                        }}
                      >
                        💬 {(post.comments || []).length}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'organization' && (
          <div className="organization-section">
            <div className="organizations-grid">
              {/* Alpha Sigma Phi Fraternity */}
              <div className="organization-card">
                <div className="org-header">
                  <h4>Alpha Sigma Phi Fraternity</h4>
                </div>
                
                <p className="org-description">
                  Building better men through brotherhood, scholarship, and service. 
                  We strive to develop well-rounded individuals through academic excellence, 
                  social responsibility, and lifelong friendships.
                </p>
                
                <div className="org-info">
                  <p>Fraternity</p>
                  <div className="org-stats">
                    <span 
                      className="clickable" 
                      onClick={() => handleMembersClick('Alpha Sigma Phi Fraternity')}
                      style={{ cursor: 'pointer' }}
                    >
                      👥 45 Members
                    </span>
                  </div>
                </div>

                <div className="org-actions">
                  <button className="btn btn-primary" onClick={() => handleManageClick('Alpha Sigma Phi Fraternity')}>
                    Manage
                  </button>
                  <button className="btn btn-secondary" onClick={() => onNavigate('organization-profile', { 
                    organization: {
                      name: 'Alpha Sigma Phi Fraternity',
                      type: 'Fraternity',
                      description: 'Building better men through brotherhood, scholarship, and service. We strive to develop well-rounded individuals through academic excellence, social responsibility, and lifelong friendships.',
                      members: 45,
                      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=400&fit=crop'
                    }
                  })}>
                    View Profile
                  </button>
                </div>
              </div>

              {/* Computer Science Club */}
              <div className="organization-card">
                <div className="org-header">
                  <h4>Computer Science Club</h4>
                  <span className="leader-badge">👑 Leader</span>
                </div>
                
                <p className="org-description">
                  Exploring technology and programming together. We focus on coding projects, 
                  hackathons, and building a community of tech enthusiasts.
                </p>
                
                <div className="org-info">
                  <p>Academic Club</p>
                  <div className="org-stats">
                    <span 
                      className="clickable" 
                      onClick={() => handleMembersClick('Computer Science Club')}
                      style={{ cursor: 'pointer' }}
                    >
                      👥 28 Members
                    </span>
                  </div>
                </div>

                <div className="org-actions">
                  <button className="btn btn-primary" onClick={() => handleManageClick('Computer Science Club')}>
                    Manage
                  </button>
                  <button className="btn btn-secondary" onClick={() => onNavigate('organization-profile', { 
                    organization: {
                      name: 'Computer Science Club',
                      type: 'Academic Club',
                      description: 'Exploring technology and programming together. We focus on coding projects, hackathons, and building a community of tech enthusiasts.',
                      members: 28,
                      image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=400&fit=crop'
                    }
                  })}>
                    View Profile
                  </button>
                </div>
              </div>
            </div>
            
            <div className="search-organizations-section">
              <div className="search-org-card">
                <div className="search-org-content">
                  <h4>Looking for More Organizations?</h4>
                  <p>Discover and join new clubs, fraternities, sororities, and campus organizations</p>
                  <button className="btn btn-primary search-org-btn" onClick={() => onNavigate('events', { defaultTab: 'organizations' })}>
                    🔍 Search Organizations
                  </button>
                </div>
              </div>
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
                <div className="post-modal-header-info">
                  <div className="post-user-info">
                    <img src={profile.image} alt={profile.name} className="post-user-avatar" />
                    <div className="post-user-details">
                      <span className="post-username">{profile.username}</span>
                      <span className="post-location">{profile.university}</span>
                    </div>
                  </div>
                <button className="post-options-btn" onClick={() => handleEventClick(selectedPost)}>Event</button>
                </div>
                
              <div className="post-modal-image">
                <img src={selectedPost.content} alt="Post" />
                </div>
                
              <div className="post-modal-details">
                <div className="post-caption">
                  <div className="caption-content">
                    <span className="caption-username">{profile.username}</span>
                    <span className="caption-text">{selectedPost.caption}</span>
                  </div>
                </div>
                
                <div className="post-modal-actions">
                  <div className="post-action-buttons">
                    <button 
                      className={`action-btn ${likedPosts.has(selectedPost.id) ? 'liked' : ''}`}
                      onClick={() => handleLikePost(selectedPost.id, { stopPropagation: () => {} })}
                    >
                      {likedPosts.has(selectedPost.id) ? '❤️' : '🤍'}
                    </button>
                    <button className="action-btn" onClick={() => handleCommentClick(selectedPost)}>💬</button>
                    <button className="action-btn">📤</button>
                </div>
                </div>
                
                <div className="post-likes">
                  <span className="likes-count">{selectedPost.likes} likes</span>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Organizations Popup Modal */}
      {showOrganizationsPopup && (
        <div className="organizations-popup-overlay" onClick={handleCloseOrganizationsPopup}>
          <div className="organizations-popup" onClick={(e) => e.stopPropagation()}>
            <div className="organizations-popup-header">
              <h3>My Organizations</h3>
              <button className="popup-close-btn" onClick={handleCloseOrganizationsPopup}>×</button>
            </div>
            
            <div className="organizations-popup-content">
              {userOrganizations.length > 0 ? (
                userOrganizations.map(org => (
                  <div key={org.id} className="organization-popup-item">
                    <div className="org-popup-info">
                      <h4>{org.name}</h4>
                      <p className="org-popup-type">{org.type}</p>
                      <p className="org-popup-role">Role: {org.role}</p>
                      <p className="org-popup-date">Joined: {org.joinedDate}</p>
                    </div>
                    <button 
                      className="btn btn-secondary org-popup-btn"
                      onClick={() => onNavigate('organizations')}
                    >
                      Manage
                    </button>
                  </div>
                ))
              ) : (
                <div className="no-organizations">
                  <p>You're not currently in any organizations.</p>
                  <button 
                    className="btn btn-primary"
                    onClick={() => {
                      handleCloseOrganizationsPopup();
                      onNavigate('events', { defaultTab: 'organizations' });
                    }}
                  >
                    Join an Organization
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Event Modal */}
      {showEventModal && selectedEvent && (
        <div className="event-modal-overlay" onClick={handleCloseEventModal}>
          <div className="event-modal" onClick={(e) => e.stopPropagation()}>
            <div className="event-modal-header">
              <h3>Event Details</h3>
              <button className="modal-close-btn" onClick={handleCloseEventModal}>×</button>
            </div>
            
            <div className="event-modal-content">
              <div className="event-modal-header-info">
                <div className="event-title-section">
                  <h2 className="event-modal-title">{selectedEvent.name}</h2>
                  <span className="event-modal-type-badge">{selectedEvent.eventType}</span>
                </div>
              </div>
              
              <div className="event-modal-grid">
                <div className="event-modal-info-item">
                  <div className="event-modal-info-content">
                    <span className="event-modal-label">Date & Time</span>
                    <span className="event-modal-value">{selectedEvent.date}, {selectedEvent.time}</span>
                  </div>
                </div>
                
                <div className="event-modal-info-item">
                  <div className="event-modal-info-content">
                    <span className="event-modal-label">Location</span>
                    <span className="event-modal-value">{selectedEvent.location}</span>
                  </div>
                </div>
                
                <div className="event-modal-info-item">
                  <div className="event-modal-info-content">
                    <span className="event-modal-label">Attendees</span>
                    <span className="event-modal-value">{selectedEvent.attendees} people</span>
                  </div>
                </div>
                
                <div className="event-modal-info-item">
                  <div className="event-modal-info-content">
                    <span className="event-modal-label">Organization</span>
                    <span className="event-modal-value">{selectedEvent.organization}</span>
                  </div>
                </div>
                
                <div className="event-modal-info-item">
                  <div className="event-modal-info-content">
                    <span className="event-modal-label">Category</span>
                    <span className="event-modal-value">{selectedEvent.category}</span>
                  </div>
                </div>
              </div>
              
              <div className="event-modal-description">
                <h4>Event Description</h4>
                <p>{selectedEvent.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Comment Modal */}
      {showCommentModal && selectedPostForComments && (
        <div className="comment-modal-overlay" onClick={handleCloseCommentModal}>
          <div className="comment-modal" onClick={(e) => e.stopPropagation()}>
            <div className="comment-modal-header">
              <h3>Comments</h3>
              <button className="modal-close-btn" onClick={handleCloseCommentModal}>×</button>
            </div>
            
            <div className="comment-modal-content">
              <div className="comment-modal-comments">
                {(selectedPostForComments.comments || []).map(comment => (
                  <div key={comment.id} className="comment-modal-item">
                    <div className="comment-modal-user">
                      <span className="comment-modal-username">{comment.user}</span>
                      <span className="comment-modal-timestamp">{comment.timestamp}</span>
                    </div>
                    <div className="comment-modal-text">{comment.text}</div>
                  </div>
                ))}
                {(!selectedPostForComments.comments || selectedPostForComments.comments.length === 0) && (
                  <div className="no-comments">
                    <p>No comments yet. Be the first to comment!</p>
                  </div>
                )}
              </div>
              
              <div className="comment-modal-add">
                <textarea 
                  placeholder="Add a comment..." 
                  className="comment-modal-input"
                  rows="1"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey && e.target.value.trim()) {
                      e.preventDefault();
                      handleAddComment(selectedPostForComments.id, e.target.value);
                      e.target.value = '';
                      e.target.style.height = 'auto';
                    }
                  }}
                  onChange={(e) => {
                    e.target.style.height = 'auto';
                    e.target.style.height = Math.min(e.target.scrollHeight, 80) + 'px';
                  }}
                />
                <button 
                  className="comment-modal-post-btn"
                  onClick={() => {
                    const input = document.querySelector('.comment-modal-input');
                    if (input && input.value.trim()) {
                      handleAddComment(selectedPostForComments.id, input.value);
                      input.value = '';
                      input.style.height = 'auto';
                    }
                  }}
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Events Popup Modal */}
      {showEventsPopup && (
        <div className="events-popup-overlay" onClick={handleCloseEventsPopup}>
          <div className="events-popup" onClick={(e) => e.stopPropagation()}>
            <div className="events-popup-header">
              <h3>Events I've Attended</h3>
              <button className="popup-close-btn" onClick={handleCloseEventsPopup}>×</button>
            </div>
            
            <div className="events-popup-content">
              {attendedEvents.map(event => (
                <div key={event.id} className="event-popup-item">
                  <div className="event-popup-image">
                    <img src={event.image} alt={event.name} />
                  </div>
                  <div className="event-popup-info">
                    <h4>{event.name}</h4>
                                  <p className="event-popup-date">{event.date}, {event.time}</p>
              <p className="event-popup-location">{event.location}</p>
              <p className="event-popup-organization">{event.organization}</p>
              <p className="event-popup-category">{event.category}</p>
              <p className="event-popup-attendees">{event.attendees} attendees</p>
                    <p className="event-popup-description">{event.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Leave Organization Confirmation Dialog */}
      {showLeaveConfirmDialog && selectedOrgToLeave && (
        <div className="request-popup-overlay" onClick={handleCancelLeave}>
          <div className="request-popup" onClick={(e) => e.stopPropagation()}>
            <div className="request-popup-header">
              <h3>Leave Organization</h3>
              <button className="popup-close-btn" onClick={handleCancelLeave}>×</button>
            </div>
            
            <div className="request-popup-content">
              <div className="request-org-info">
                <h4>{selectedOrgToLeave}</h4>
                <p className="request-org-type">Are you sure you want to leave this organization?</p>
              </div>
              
              <div className="request-actions">
                <button className="btn btn-secondary" onClick={handleCancelLeave}>
                  Cancel
                </button>
                <button className="btn btn-danger" onClick={handleLeaveOrganization}>
                  Leave Organization
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Final Confirmation Dialog */}
      {showFinalConfirmDialog && selectedOrgToLeave && (
        <div className="request-popup-overlay" onClick={handleCancelLeave}>
          <div className="request-popup" onClick={(e) => e.stopPropagation()}>
            <div className="request-popup-header">
              <h3>Final Confirmation</h3>
              <button className="popup-close-btn" onClick={handleCancelLeave}>×</button>
            </div>
            
            <div className="request-popup-content">
              <div className="request-org-info">
                <h4>Are you absolutely sure?</h4>
                <p className="request-org-type">This action cannot be undone. You will lose access to all organization features and will need to reapply if you want to rejoin later.</p>
              </div>
              
              <div className="request-actions">
                <button className="btn btn-secondary" onClick={handleCancelLeave}>
                  Cancel
                </button>
                <button className="btn btn-danger" onClick={handleConfirmLeave}>
                  Yes, Leave Organization
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Members Popup Modal */}
      {showMembersPopup && selectedOrgForMembers && (
        <div className="members-popup-overlay" onClick={handleCloseMembersPopup}>
          <div className="members-popup" onClick={(e) => e.stopPropagation()}>
            <div className="members-popup-header">
              <h3>Members</h3>
              <button className="popup-close-btn" onClick={handleCloseMembersPopup}>×</button>
            </div>
            
            <div className="members-popup-content">
              <div className="members-popup-org-info">
                <h4>{selectedOrgForMembers}</h4>
                <p className="members-popup-count">{getOrganizationMembers(selectedOrgForMembers).length} members</p>
              </div>
              
              <div className="members-list">
                {getOrganizationMembers(selectedOrgForMembers).map(member => (
                  <div key={member.id} className="member-popup-item">
                    <div className="member-popup-avatar">
                      <img src={member.avatar} alt={member.name} />
                    </div>
                    <div className="member-popup-info">
                      <h5>{member.name}</h5>
                      <p className="member-popup-role">{member.role}</p>
                      <div className="member-popup-details">
                        <span className="member-popup-year">{member.year}</span>
                        <span className="member-popup-major">{member.major}</span>
                      </div>
                    </div>
                    <button className="member-popup-message btn btn-primary">
                      Message
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Post Modal */}
      {showNewPostModal && (
        <div className="new-post-overlay" onClick={handleCloseNewPostModal}>
          <div className="new-post-modal" onClick={(e) => e.stopPropagation()}>
            <div className="new-post-header">
              <button className="cancel-btn" onClick={handleCloseNewPostModal}>
                Cancel
              </button>
            </div>
            
            <div className="new-post-content">
              <div className="new-post-left">
                {/* Image Upload Area */}
                <div className="image-upload-area">
                  {newPostImage ? (
                    <div className="image-preview-container">
                      <img src={newPostImage} alt="Preview" className="image-preview" />
                      <button 
                        className="change-image-btn"
                        onClick={handleImageClick}
                      >
                        Change Photo
                      </button>
                    </div>
                  ) : (
                    <div className="upload-area" onClick={handleImageClick}>
                      <div className="upload-icon">📷</div>
                      <p>Add photos</p>
                      <input 
                        id="image-input"
                        type="file" 
                        accept="image/*" 
                        onChange={handleImageUpload}
                        style={{ display: 'none' }}
                      />
                    </div>
                  )}
                </div>
              </div>
              
              <div className="new-post-right">
                {/* User Info */}
                <div className="post-user-info">
                  <img src={profile.image} alt={profile.name} className="user-avatar" />
                  <span className="username">{profile.username}</span>
                </div>
                
                {/* Caption Input */}
                <div className="caption-input-container">
                  <textarea
                    value={newPostCaption}
                    onChange={(e) => setNewPostCaption(e.target.value)}
                    placeholder="Write a caption..."
                    className="caption-textarea"
                    rows="8"
                  />
                  <div className="char-count">
                    {newPostCaption.length}/2200
                  </div>
                </div>
                
                {/* Event Attachment */}
                <div className="event-attachment-container">
                  {selectedEventForPost ? (
                    <div className="attached-event">
                      <div className="attached-event-header">
                        <span className="event-icon">📅</span>
                        <span className="event-label">Attached Event</span>
                        <button 
                          className="remove-event-btn"
                          onClick={handleRemoveEvent}
                        >
                          ×
                        </button>
                      </div>
                      <div className="attached-event-content">
                        <div className="attached-event-image">
                          <img src={selectedEventForPost.image} alt={selectedEventForPost.name} />
                          <div className="attached-event-badge">{selectedEventForPost.category}</div>
                        </div>
                        <div className="attached-event-details">
                          <h5>{selectedEventForPost.name}</h5>
                          <div className="attached-event-info">
                            <span>{selectedEventForPost.date}, {selectedEventForPost.time}</span>
                            <span>{selectedEventForPost.location}</span>
                            <span>{selectedEventForPost.attendees} attending</span>
                          </div>
                          <p className="attached-event-description">{selectedEventForPost.description}</p>
                        </div>
                      </div>
                    </div>
                  ) : null}
                  
                  <div className="post-action-buttons">
                    <button 
                      className="attach-event-btn"
                      onClick={handleAttachEvent}
                    >
                      <span className="event-icon">📅</span>
                      <span>Attach Event</span>
                    </button>
                    <button 
                      className="share-btn"
                      onClick={handleSubmitPost}
                      disabled={!newPostImage || !newPostCaption.trim()}
                    >
                      Share
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Event Selector Modal */}
      {showEventSelector && (
        <div className="event-selector-overlay" onClick={() => setShowEventSelector(false)}>
          <div className="event-selector-modal" onClick={(e) => e.stopPropagation()}>
            <div className="event-selector-header">
              <button className="back-btn" onClick={() => setShowEventSelector(false)}>
                ← Back
              </button>
              <h3>Select Event to Attach</h3>
            </div>
            
            <div className="event-selector-content">
              <div className="organization-events">
                <div className="org-section">
                  <h4 className="org-title">🏛️ Alpha Sigma Phi Fraternity</h4>
                  <div className="events-list">
                    {getOrganizationEvents('Alpha Sigma Phi Fraternity').map(event => (
                      <div key={event.id} className="event-list-item">
                        <div className="event-item-image">
                          <img src={event.image} alt={event.name} />
                        </div>
                        <div className="event-item-content">
                          <div className="event-item-details">
                            <h5 className="event-item-title">{event.name}</h5>
                            <div className="event-item-info">
                              <span>📅 {event.date}</span>
                              <span>🕒 {event.time}</span>
                              <span>📍 {event.location}</span>
                              <span>👥 {event.attendees} attending</span>
                            </div>
                            <p className="event-item-description">{event.description}</p>
                          </div>
                          <button 
                            className="select-event-btn"
                            onClick={() => handleSelectEvent(event)}
                          >
                            Select
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="org-section">
                  <h4 className="org-title">💻 Computer Science Club</h4>
                  <div className="events-list">
                    {getOrganizationEvents('Computer Science Club').map(event => (
                      <div key={event.id} className="event-list-item">
                        <div className="event-item-image">
                          <img src={event.image} alt={event.name} />
                        </div>
                        <div className="event-item-content">
                          <div className="event-item-details">
                            <h5 className="event-item-title">{event.name}</h5>
                            <div className="event-item-info">
                              <span>📅 {event.date}</span>
                              <span>🕒 {event.time}</span>
                              <span>📍 {event.location}</span>
                              <span>👥 {event.attendees} attending</span>
                            </div>
                            <p className="event-item-description">{event.description}</p>
                          </div>
                          <button 
                            className="select-event-btn"
                            onClick={() => handleSelectEvent(event)}
                          >
                            Select
                          </button>
                        </div>
                      </div>
                    ))}
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

export default ProfileScreen; 