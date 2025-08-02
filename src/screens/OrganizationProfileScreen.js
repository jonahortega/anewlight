import React, { useState, useEffect } from 'react';
import './OrganizationProfileScreen.css';

const OrganizationProfileScreen = ({ organization, user, onNavigate, onStartConversation, joinedEvents, setJoinedEvents }) => {
  const [activeTab, setActiveTab] = useState('events');
  const [rsvpStatus, setRsvpStatus] = useState({});
  const [showRequestPopup, setShowRequestPopup] = useState(false);
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [selectedPostForComments, setSelectedPostForComments] = useState(null);
  const [showEventFromPostModal, setShowEventFromPostModal] = useState(false);
  const [selectedEventFromPost, setSelectedEventFromPost] = useState(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareEvent, setShareEvent] = useState(null);
  const [shareMessage, setShareMessage] = useState('');
  const [selectedRecipient, setSelectedRecipient] = useState('');
  const [recipientType, setRecipientType] = useState('organization');
  const [requestMessage, setRequestMessage] = useState('');
  const [organizationPosts, setOrganizationPosts] = useState([]);
  const [showMembersPopup, setShowMembersPopup] = useState(false);

  // Initialize organization posts
  useEffect(() => {
    const posts = getOrganizationPosts(organization);
    setOrganizationPosts(posts);
  }, [organization]);

  // Share recipients data
  const shareRecipients = {
    organizations: [
      { id: 1, name: 'Alpha Beta Gamma Fraternity', type: 'Fraternity', university: 'UC Berkeley' },
      { id: 2, name: 'Delta Epsilon Zeta Sorority', type: 'Sorority', university: 'UC Berkeley' },
      { id: 3, name: 'Theta Iota Kappa Fraternity', type: 'Fraternity', university: 'UC Berkeley' },
      { id: 4, name: 'Greek Life Council', type: 'Council', university: 'UC Berkeley' },
      { id: 5, name: 'Professional Greek Association', type: 'Professional Association', university: 'UC Berkeley' }
    ]
  };
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showPostModal, setShowPostModal] = useState(false);
  const [showNewEventModal, setShowNewEventModal] = useState(false);
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [showCreateOptions, setShowCreateOptions] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    description: '',
    maxAttendees: '',
    price: '',
    image: null,
    category: 'Event'
  });
  const [newPost, setNewPost] = useState({
    caption: '',
    image: null,
    attachedEvent: null
  });

  // Organization-specific events based on type and category
  const getOrganizationEvents = (org) => {
    const baseEvents = {
      'Fraternity': [
        {
          id: 'past-1',
          title: "Fall Rush Week",
          date: "2023-09-15",
          time: "6:00 PM",
          location: "Greek Row",
          description: "Our annual Fall Rush Week event where potential new members got to meet the brothers and learn about our fraternity.",
          attendees: 75,
          maxAttendees: 100,
          image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=400&h=200&fit=crop"
        },
        {
          id: 'past-2',
          title: "Holiday Charity Drive",
          date: "2023-12-10",
          time: "2:00 PM",
          location: "Student Union",
          description: "Annual holiday charity drive where we collected donations for local families in need.",
          attendees: 120,
          maxAttendees: 150,
          image: "https://images.unsplash.com/photo-1482517967863-00e15c9b44be?w=400&h=200&fit=crop"
        },
        {
          id: 1,
          title: "Brotherhood Retreat",
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
          title: "Philanthropy Fundraiser",
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
          title: "Academic Excellence Workshop",
          date: "2024-04-05",
          time: "3:00 PM",
          location: "Library Study Room",
          description: "Study skills workshop and academic support session for brothers.",
          attendees: 25,
          maxAttendees: 35,
          image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=200&fit=crop"
        }
      ],
      'Sorority': [
        {
          id: 1,
          title: "Sisterhood Social",
          date: "2024-03-25",
          time: "7:00 PM",
          location: "Sorority House",
          description: "Monthly sisterhood bonding event with activities and sister connections.",
          attendees: 42,
          maxAttendees: 55,
          image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=200&fit=crop"
        },
        {
          id: 2,
          title: "Philanthropy Fashion Show",
          date: "2024-03-30",
          time: "8:00 PM",
          location: "Student Union",
          description: "Annual fashion show to raise awareness and funds for our national philanthropy.",
          attendees: 35,
          maxAttendees: 45,
          image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=200&fit=crop"
        },
        {
          id: 3,
          title: "Leadership Development Seminar",
          date: "2024-04-05",
          time: "2:00 PM",
          location: "Conference Center",
          description: "Professional development workshop for sisters.",
          attendees: 28,
          maxAttendees: 40,
          image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=200&fit=crop"
        }
      ],
      'Academic Club': [
        {
          id: 1,
          title: "Math Competition Prep",
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
          title: "Guest Speaker Series",
          date: "2024-03-30",
          time: "6:00 PM",
          location: "Lecture Hall",
          description: "Renowned mathematician speaking on advanced mathematical concepts.",
          attendees: 22,
          maxAttendees: 30,
          image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=200&fit=crop"
        }
      ],
      'Sports Club': [
        {
          id: 1,
          title: "Soccer Tournament",
          date: "2024-03-25",
          time: "2:00 PM",
          location: "University Fields",
          description: "Intramural soccer tournament with multiple teams competing.",
          attendees: 25,
          maxAttendees: 32,
          image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=200&fit=crop"
        },
        {
          id: 2,
          title: "Fitness Training Session",
          date: "2024-03-30",
          time: "5:00 PM",
          location: "Rec Center",
          description: "Group fitness training and conditioning for team members.",
          attendees: 20,
          maxAttendees: 28,
          image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=200&fit=crop"
        }
      ],
      'Service Club': [
        {
          id: 1,
          title: "Community Cleanup Day",
          date: "2024-03-25",
          time: "9:00 AM",
          location: "Local Park",
          description: "Volunteer event to clean up local parks and community spaces.",
          attendees: 30,
          maxAttendees: 40,
          image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&h=200&fit=crop"
        },
        {
          id: 2,
          title: "Food Drive Collection",
          date: "2024-03-30",
          time: "10:00 AM",
          location: "Student Union",
          description: "Collecting food donations for local food bank.",
          attendees: 25,
          maxAttendees: 35,
          image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=200&fit=crop"
        }
      ]
    };

    return baseEvents[org.type] || baseEvents['Academic Club'];
  };

  // Organization-specific members based on type
  const getOrganizationMembers = (org) => {
    const baseMembers = {
      'Fraternity': [
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
      'Sorority': [
        {
          id: 1,
          name: "Sarah Chen",
          role: "Sorority President",
          year: "Senior",
          major: "Business Administration",
          avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
        },
        {
          id: 2,
          name: "Emily Davis",
          role: "Vice President",
          year: "Junior",
          major: "Psychology",
          avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
        },
        {
          id: 3,
          name: "Lisa Thompson",
          role: "Treasurer",
          year: "Junior",
          major: "Biology",
          avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face"
        },
        {
          id: 4,
          name: "Jessica Brown",
          role: "Social Chair",
          year: "Sophomore",
          major: "Communications",
          avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
        },
        {
          id: 5,
          name: "Amanda Garcia",
          role: "Philanthropy Chair",
          year: "Sophomore",
          major: "Sociology",
          avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
        },
        {
          id: 6,
          name: "Rachel Lee",
          role: "Sister",
          year: "Freshman",
          major: "Art History",
          avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face"
        }
      ],
      'Academic Club': [
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
      ],
      'Sports Club': [
        {
          id: 1,
          name: "Coach Mike Johnson",
          role: "Head Coach",
          year: "Staff",
          major: "Physical Education",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
        },
        {
          id: 2,
          name: "Carlos Mendez",
          role: "Team Captain",
          year: "Senior",
          major: "Kinesiology",
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
        },
        {
          id: 3,
          name: "Tyler Williams",
          role: "Vice Captain",
          year: "Junior",
          major: "Sports Management",
          avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face"
        },
        {
          id: 4,
          name: "Jordan Taylor",
          role: "Player",
          year: "Sophomore",
          major: "Business",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
        }
      ],
      'Service Club': [
        {
          id: 1,
          name: "Dr. Jennifer Adams",
          role: "Faculty Advisor",
          year: "Professor",
          major: "Social Work",
          avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
        },
        {
          id: 2,
          name: "Ashley Rodriguez",
          role: "Club President",
          year: "Senior",
          major: "Social Work",
          avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
        },
        {
          id: 3,
          name: "Marcus Johnson",
          role: "Vice President",
          year: "Junior",
          major: "Psychology",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
        },
        {
          id: 4,
          name: "Nina Patel",
          role: "Volunteer Coordinator",
          year: "Sophomore",
          major: "Public Health",
          avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face"
        },
        {
          id: 5,
          name: "Brandon Lee",
          role: "Fundraising Chair",
          year: "Sophomore",
          major: "Business",
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
        }
      ]
    };

    return baseMembers[org.type] || baseMembers['Academic Club'];
  };

  // Organization-specific posts based on type
  const getOrganizationPosts = (org) => {
    const basePosts = {
      'Fraternity': [
        {
          id: 1,
          author: "Alex Johnson",
          authorRole: "Frat President",
          authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
          content: "Just wrapped up an amazing brotherhood retreat! The bonds we built this weekend will last a lifetime. Proud to be part of such an incredible brotherhood! 💪 #Brotherhood #GreekLife",
          image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=300&fit=crop",
          likes: 24,
          comments: 8,
          timestamp: "2 hours ago",
          type: "event"
        },
        {
          id: 2,
          author: "Michael Rodriguez",
          authorRole: "Vice President",
          authorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face",
          content: "Our philanthropy fundraiser was a huge success! Raised over $5,000 for our national cause. Thank you to everyone who came out and supported us! 🙏 #Philanthropy #GivingBack",
          image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&h=300&fit=crop",
          likes: 31,
          comments: 12,
          timestamp: "1 day ago",
          type: "philanthropy"
        },
        {
          id: 3,
          author: "David Kim",
          authorRole: "Treasurer",
          authorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop&crop=face",
          content: "Study session tonight at the library! Brothers, don't forget to bring your textbooks. Let's ace these finals together! 📚 #AcademicExcellence #StudyBuddies",
          image: null,
          likes: 18,
          comments: 5,
          timestamp: "3 days ago",
          type: "academic"
        }
      ],
      'Sorority': [
        {
          id: 1,
          author: "Sarah Williams",
          authorRole: "Sorority President",
          authorAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face",
          content: "Our sisterhood social was absolutely magical! The love and support in this room tonight was incredible. Sisters forever! 💕 #Sisterhood #GreekLife",
          image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=300&fit=crop",
          likes: 28,
          comments: 15,
          timestamp: "4 hours ago",
          type: "event"
        },
        {
          id: 2,
          author: "Emily Davis",
          authorRole: "Philanthropy Chair",
          authorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face",
          content: "Fashion show planning is in full swing! Can't wait to showcase our amazing sisters and raise awareness for our philanthropy. The runway is going to be 🔥 #FashionShow #Philanthropy",
          image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
          likes: 35,
          comments: 9,
          timestamp: "1 day ago",
          type: "philanthropy"
        },
        {
          id: 3,
          author: "Jessica Brown",
          authorRole: "Academic Chair",
          authorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=50&h=50&fit=crop&crop=face",
          content: "Leadership development seminar this weekend! Excited to help our sisters grow as leaders. Remember, strong women empower other women! 💪 #Leadership #Empowerment",
          image: null,
          likes: 22,
          comments: 7,
          timestamp: "2 days ago",
          type: "leadership"
        }
      ],
      'Academic Club': [
        {
          id: 1,
          author: "Dr. Jennifer Adams",
          authorRole: "Faculty Advisor",
          authorAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face",
          content: "Math competition prep session was a huge success! Our students are showing incredible problem-solving skills. Proud of their dedication! 🧮 #MathCompetition #AcademicExcellence",
          image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=300&fit=crop",
          likes: 15,
          comments: 6,
          timestamp: "5 hours ago",
          type: "academic"
        },
        {
          id: 2,
          author: "Marcus Johnson",
          authorRole: "Club President",
          authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
          content: "Guest speaker series announcement! Dr. Smith will be joining us next week to discuss advanced mathematical concepts. Don't miss this opportunity! 📚 #GuestSpeaker #Mathematics",
          image: null,
          likes: 12,
          comments: 4,
          timestamp: "1 day ago",
          type: "academic"
        }
      ],
      'Sports Club': [
        {
          id: 1,
          author: "Jordan Taylor",
          authorRole: "Team Captain",
          authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
          content: "Soccer tournament was intense! Our team showed amazing teamwork and determination. Great job everyone! ⚽ #SoccerTournament #Teamwork",
          image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
          likes: 20,
          comments: 8,
          timestamp: "6 hours ago",
          type: "sports"
        },
        {
          id: 2,
          author: "Brandon Lee",
          authorRole: "Fitness Coordinator",
          authorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face",
          content: "Fitness training session was a blast! Everyone pushed their limits and showed great progress. Keep up the hard work! 💪 #FitnessTraining #Progress",
          image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=300&fit=crop",
          likes: 18,
          comments: 5,
          timestamp: "1 day ago",
          type: "fitness"
        }
      ],
      'Service Club': [
        {
          id: 1,
          author: "Ashley Rodriguez",
          authorRole: "Club President",
          authorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face",
          content: "Community cleanup day was a huge success! We collected over 50 bags of trash and made our local park beautiful again. Thank you to all volunteers! 🌱 #CommunityService #CleanUp",
          image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&h=300&fit=crop",
          likes: 25,
          comments: 10,
          timestamp: "8 hours ago",
          type: "service"
        },
        {
          id: 2,
          author: "Nina Patel",
          authorRole: "Volunteer Coordinator",
          authorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=50&h=50&fit=crop&crop=face",
          content: "Food drive collection is going strong! We've already collected over 200 pounds of food for the local food bank. Every donation counts! 🥫 #FoodDrive #GivingBack",
          image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
          likes: 22,
          comments: 7,
          timestamp: "2 days ago",
          type: "service"
        }
      ]
    };

    return basePosts[org.type] || basePosts['Academic Club'];
  };

  const organizationEvents = getOrganizationEvents(organization);
  const organizationMembers = getOrganizationMembers(organization);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const isUserAttending = (eventId) => {
    return joinedEvents.some(event => event.id === eventId);
  };

  const handleRSVP = (eventId) => {
    const event = organizationEvents.find(e => e.id === eventId);
    if (!event) return;
    
    const wasAttending = isUserAttending(eventId);
    
    if (wasAttending) {
      // Remove from joined events
      setJoinedEvents(prev => prev.filter(e => e.id !== eventId));
    } else {
      // Add to joined events
      const eventWithId = {
        ...event,
        id: eventId,
        joinedAt: new Date().toISOString()
      };
      setJoinedEvents(prev => [...prev, eventWithId]);
    }
  };

  const handleRequestClick = () => {
    setShowRequestPopup(true);
  };

  const handleCloseRequestPopup = () => {
    setShowRequestPopup(false);
    setRequestMessage('');
  };

  const handleSubmitRequest = () => {
    // In a real app, this would send the request to the backend
    console.log('Submitting join request:', {
      organization: organization.name,
      message: requestMessage
    });
    
    // Show success message and close popup
    alert('Join request submitted successfully!');
    handleCloseRequestPopup();
  };

  const handleMembersClick = () => {
    setShowMembersPopup(true);
  };

  const handleCloseMembersPopup = () => {
    setShowMembersPopup(false);
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setShowEventModal(true);
  };

  const handleCloseEventModal = () => {
    setShowEventModal(false);
    setSelectedEvent(null);
  };

  const handlePostClick = (post) => {
    setSelectedPost(post);
    setShowPostModal(true);
  };

  const handleClosePostModal = () => {
    setShowPostModal(false);
    setSelectedPost(null);
  };

  const handleShare = (event) => {
    setShareEvent(event);
    setShowShareModal(true);
    setShareMessage('');
    setSelectedRecipient('');
    setRecipientType('organization');
  };

  const closeShareModal = () => {
    setShowShareModal(false);
    setShareEvent(null);
    setShareMessage('');
    setSelectedRecipient('');
  };

  const handleSendShare = () => {
    if (selectedRecipient && shareEvent) {
      // In a real app, this would send the share to the backend
      console.log('Sharing event:', shareEvent.id, 'to:', selectedRecipient, 'type:', recipientType, 'message:', shareMessage);
      alert(`Event shared successfully to ${selectedRecipient}!`);
      closeShareModal();
    } else {
      alert('Please select a recipient to share with.');
    }
  };

  const handleLikePost = (postId, event) => {
    event.stopPropagation(); // Prevent opening the post modal
    
    setLikedPosts(prevLiked => {
      const newLiked = new Set(prevLiked);
      if (newLiked.has(postId)) {
        newLiked.delete(postId);
        // Unlike - decrease count
        setOrganizationPosts(prevPosts => 
          prevPosts.map(post => 
            post.id === postId 
              ? { ...post, likes: Math.max(0, post.likes - 1) }
              : post
          )
        );
      } else {
        newLiked.add(postId);
        // Like - increase count
        setOrganizationPosts(prevPosts => 
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

  const handleCommentClick = (post) => {
    setSelectedPostForComments(post);
    setShowCommentModal(true);
  };

  const handleCloseCommentModal = () => {
    setShowCommentModal(false);
    setSelectedPostForComments(null);
  };

  const handleEventFromPostClick = (post) => {
    // Find the associated event for this post
    const associatedEvent = organizationEvents.find(event => 
      event.title.toLowerCase().includes(post.content.toLowerCase()) ||
      post.content.toLowerCase().includes(event.title.toLowerCase())
    );
    
    if (associatedEvent) {
      setSelectedEventFromPost(associatedEvent);
      setShowEventFromPostModal(true);
      } else {
      // If no specific event found, create a generic one based on the post
      const genericEvent = {
        id: `post-${post.id}`,
        title: post.content.split(' ').slice(0, 4).join(' ') + '...',
        date: 'Upcoming',
        time: 'TBD',
        location: 'Campus',
        description: post.content,
        attendees: post.likes || 0,
        maxAttendees: 50,
        image: post.image || 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=200&fit=crop',
        category: 'Event'
      };
      setSelectedEventFromPost(genericEvent);
      setShowEventFromPostModal(true);
    }
  };

  const handleCloseEventFromPostModal = () => {
    setShowEventFromPostModal(false);
    setSelectedEventFromPost(null);
  };

  const handleNewEventClick = () => {
    setShowNewEventModal(true);
  };

  const handleCloseNewEventModal = () => {
    setShowNewEventModal(false);
    setNewEvent({
      title: '',
      date: '',
      time: '',
      location: '',
      description: '',
      maxAttendees: '',
      image: null,
      category: 'Event'
    });
  };

  const handleNewEventInputChange = (field, value) => {
    setNewEvent(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNewEventImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setNewEvent(prev => ({
          ...prev,
          image: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitNewEvent = () => {
    // Validate required fields
    if (!newEvent.title || !newEvent.date || !newEvent.time || !newEvent.location || !newEvent.description) {
      alert('Please fill in all required fields');
      return;
    }

    // Create the new event object
    const eventToAdd = {
      id: Date.now(), // Simple ID generation
      title: newEvent.title,
      date: newEvent.date,
      time: newEvent.time,
      location: newEvent.location,
      description: newEvent.description,
      attendees: 0,
      maxAttendees: newEvent.maxAttendees || 'Unlimited',
      price: newEvent.price ? parseFloat(newEvent.price) : null,
      isPaid: newEvent.price && parseFloat(newEvent.price) > 0,
      image: newEvent.image || "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=200&fit=crop",
      category: newEvent.category,
      createdBy: user?.name || 'Club Leader',
      createdAt: new Date().toISOString()
    };

    // In a real app, this would be sent to the backend
    console.log('New event created:', eventToAdd);
    
    // Show success message
    alert('Event created successfully!');
    
    // Close modal and reset form
    handleCloseNewEventModal();
  };

  const handlePlusButtonClick = () => {
    setShowCreateOptions(!showCreateOptions);
  };

  const handleCreateOptionClick = (option) => {
    setShowCreateOptions(false);
    if (option === 'event') {
      setShowNewEventModal(true);
    } else if (option === 'post') {
      setShowNewPostModal(true);
    }
  };

  const handleCloseNewPostModal = () => {
    setShowNewPostModal(false);
    setNewPost({
      caption: '',
      image: null,
      attachedEvent: null
    });
  };

  const handleNewPostInputChange = (field, value) => {
    setNewPost(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNewPostImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setNewPost(prev => ({
          ...prev,
          image: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAttachEventClick = () => {
    // This would open an event selector modal
    // For now, we'll just show an alert
    alert('Event attachment feature coming soon!');
  };

  const handleSubmitNewPost = () => {
    if (!newPost.caption.trim()) {
      alert('Please add a caption to your post');
      return;
    }

    const postToAdd = {
      id: Date.now(),
      caption: newPost.caption,
      image: newPost.image || "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=200&fit=crop",
      attachedEvent: newPost.attachedEvent,
      author: user?.name || 'Club Member',
      likes: 0,
      comments: 0,
      createdAt: new Date().toISOString(),
      organization: organization.name
    };

    console.log('New post created:', postToAdd);
    alert('Post created successfully!');
    handleCloseNewPostModal();
  };

  // Check if user is already a member of this organization
  const isUserMember = () => {
    if (!user || !organization) return false;
    
    // Debug logging
    console.log('Checking membership for:', organization.name);
    console.log('User data:', user);
    
    const orgName = organization.name.toLowerCase();
    
    // Check if user has a direct organization match
    if (user.organization && typeof user.organization === 'string') {
      const userOrg = user.organization.toLowerCase();
      console.log('Checking direct organization string:', userOrg, 'vs', orgName);
      if (userOrg === orgName) return true;
    }
    
    // Check if user has organization object
    if (user.organization && user.organization.name) {
      const userOrg = user.organization.name.toLowerCase();
      console.log('Checking organization object:', userOrg, 'vs', orgName);
      if (userOrg === orgName) return true;
    }
    
    // Check if user has greekOrganization
    if (user.greekOrganization && user.greekOrganization.name) {
      const userOrg = user.greekOrganization.name.toLowerCase();
      console.log('Checking greekOrganization:', userOrg, 'vs', orgName);
      if (userOrg === orgName) return true;
    }
    
    // Check if user has club
    if (user.club && user.club.name) {
      const userOrg = user.club.name.toLowerCase();
      console.log('Checking club:', userOrg, 'vs', orgName);
      if (userOrg === orgName) return true;
    }
    
    // Check userOrganizations array if it exists
    if (user.organizations && Array.isArray(user.organizations)) {
      const hasMatch = user.organizations.some(org => {
        if (org.name) {
          const userOrg = org.name.toLowerCase();
          console.log('Checking userOrganizations:', userOrg, 'vs', orgName);
          return userOrg === orgName;
        }
        return false;
      });
      if (hasMatch) return true;
    }
    
    // Check for partial matches (e.g., "Computer Science Club" vs "Computer Science Society")
    const checkPartialMatch = (userOrgName) => {
      const userWords = userOrgName.split(' ');
      const orgWords = orgName.split(' ');
      
      // If both have "Computer Science" in the name, consider it a match
      if (userWords.includes('computer') && userWords.includes('science') &&
          orgWords.includes('computer') && orgWords.includes('science')) {
        console.log('Found partial match for Computer Science organization');
        return true;
      }
      
      return false;
    };
    
    // Check all possible user organization names for partial matches
    const userOrgNames = [];
    if (user.organization && typeof user.organization === 'string') {
      userOrgNames.push(user.organization.toLowerCase());
    }
    if (user.organization && user.organization.name) {
      userOrgNames.push(user.organization.name.toLowerCase());
    }
    if (user.greekOrganization && user.greekOrganization.name) {
      userOrgNames.push(user.greekOrganization.name.toLowerCase());
    }
    if (user.club && user.club.name) {
      userOrgNames.push(user.club.name.toLowerCase());
    }
    if (user.organizations && Array.isArray(user.organizations)) {
      user.organizations.forEach(org => {
        if (org.name) userOrgNames.push(org.name.toLowerCase());
      });
    }
    
    for (const userOrgName of userOrgNames) {
      if (checkPartialMatch(userOrgName)) {
        return true;
      }
    }
    
    console.log('No membership match found');
    return false;
  };

  // Check if user is a leader of this organization
  const isUserLeader = () => {
    if (!user || !organization) return false;
    
    const orgName = organization.name.toLowerCase();
    
    // For Computer Science Club, automatically make the user a leader
    if (orgName.includes('computer') && orgName.includes('science')) {
      console.log('User is leader of Computer Science organization');
      return true;
    }
    
    // Check if user has a leadership role in the organization
    const leadershipRoles = ['president', 'vice president', 'treasurer', 'secretary', 'leader', 'chair'];
    
    // Check user's role in the organization
    if (user.organization && user.organization.role) {
      const userRole = user.organization.role.toLowerCase();
      if (leadershipRoles.some(role => userRole.includes(role))) {
        return true;
      }
    }
    
    // Check userOrganizations array for leadership role
    if (user.organizations && Array.isArray(user.organizations)) {
      const hasLeadershipRole = user.organizations.some(org => {
        if (org.name && org.name.toLowerCase() === orgName && org.role) {
          const userRole = org.role.toLowerCase();
          return leadershipRoles.some(role => userRole.includes(role));
        }
        return false;
      });
      if (hasLeadershipRole) return true;
    }
    
    return false;
  };

  return (
    <div className="profile-screen">
      <div className="profile-container">

        
        {/* Request Button - Top Right */}
        {!isUserMember() && (
          <button className="modern-request-btn" onClick={handleRequestClick}>
            Request
        </button>
        )}
        
        {/* New Event/Post Button - Top Right */}
        {isUserLeader() && (
          <div className="create-options-container">
            <button className="new-event-top-btn" onClick={handlePlusButtonClick}>
              <span>+</span>
            </button>
            {showCreateOptions && (
              <div className="create-options-dropdown">
                <button 
                  className="create-option-btn"
                  onClick={() => handleCreateOptionClick('event')}
                >
                  📅 Create Event
                </button>
                <button 
                  className="create-option-btn"
                  onClick={() => handleCreateOptionClick('post')}
                >
                  📝 Create Post
                </button>
              </div>
            )}
          </div>
        )}



        {/* Profile Header Section with Avatar at Top */}
        <div className="profile-header-section">
          <div className="profile-avatar-container">
            <div className="profile-avatar-border">
              <img 
                src={organization.image} 
                alt={organization.name} 
                className="profile-avatar"
              />
            </div>
            </div>
          </div>
          
        {/* Profile Info Section */}
        <div className="profile-info-section">
          <div className="profile-details">
            <div className="profile-name-section">
              <h2 className="profile-name">{organization.name}</h2>
            <span className="profile-username">@{organization.name.toLowerCase().replace(/\s+/g, '').replace('club', '')}</span>
            </div>
            
            <div className="profile-stats">
              <div className="stat-item clickable" onClick={handleMembersClick}>
                <span className="stat-number">{organization.members}</span>
                <span className="stat-label">members</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{organizationEvents.length}</span>
                <span className="stat-label">events</span>
              </div>
              <div className="stat-item">
              <span className="stat-number">{organization.type.replace(' Club', '')}</span>
                <span className="stat-label">club</span>
              </div>
            </div>
            
            <div className="profile-bio-section">
              <p className="profile-bio">{organization.description}</p>
            </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="profile-tabs">
        <button 
          className={`tab-button ${activeTab === 'events' ? 'active' : ''}`}
          onClick={() => setActiveTab('events')}
        >
          📅 Events
        </button>

        <button 
          className={`tab-button ${activeTab === 'posts' ? 'active' : ''}`}
          onClick={() => setActiveTab('posts')}
        >
          📝 Posts
        </button>
      </div>

      {/* Tab Content */}
      <div className="profile-content">
        {activeTab === 'events' && (
          <div className="shotgun-events-feed">
              {organizationEvents.map(event => (
              <div key={event.id} className="shotgun-event-card">
                <div className="shotgun-event-image">
                  <img src={event.image} alt={event.title} />
                  <div className="shotgun-event-overlay">
                    <div className="shotgun-event-badges">
                      {event.isPaid && (
                        <div className="shotgun-price-badge">${event.price}</div>
                      )}
                      {isUserAttending(event.id) && (
                        <div className="shotgun-attending-badge">✓</div>
                      )}
                    </div>
                    <div className="shotgun-event-actions">
                      <button 
                        className="shotgun-share-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleShare(event);
                        }}
                      >
                        📤
                      </button>
                    </div>
                  </div>
                  </div>
                  
                <div className="shotgun-event-content">
                  <div className="shotgun-event-header">
                    <div className="shotgun-event-org">{organization.name}</div>
                    <div className="shotgun-event-category">{event.category || 'Event'}</div>
                  </div>
                  
                  <h3 className="shotgun-event-title">{event.title}</h3>
                  
                  <div className="shotgun-event-meta">
                    <div className="shotgun-event-details">
                      <span className="shotgun-event-date">{formatDate(event.date)}, {event.time}</span>
                      <span className="shotgun-event-location">{event.location}</span>
                    </div>
                    <div className="shotgun-event-attendance">
                      <span className="shotgun-attendance-count">{event.attendees}/{event.maxAttendees || 'Unlimited'}</span>
                    </div>
                      </div>
                      
                  <div className="shotgun-event-actions-bottom">
                      <button 
                      className={`shotgun-rsvp-btn ${isUserAttending(event.id) ? 'attending' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRSVP(event.id);
                        }}
                      >
                      {isUserAttending(event.id) ? '✓ Attending' : 'Join Event'}
                      </button>
                    <button 
                      className="shotgun-details-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEventClick(event);
                      }}
                    >
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}



        {activeTab === 'posts' && (
          <div className="posts-section">
            <div className="posts-grid">
              {organizationPosts.map(post => (
                <div key={post.id} className="post-item" onClick={() => handlePostClick(post)}>
                  <img 
                    src={post.image || 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=400&fit=crop'} 
                    alt="Post" 
                    className="post-image" 
                  />
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
      </div>
      </div>

      {/* Join Request Popup Modal */}
      {showRequestPopup && (
        <div className="request-popup-overlay" onClick={handleCloseRequestPopup}>
          <div className="request-popup" onClick={(e) => e.stopPropagation()}>
            <div className="request-popup-header">
              <h3>Join Request</h3>
              <button className="popup-close-btn" onClick={handleCloseRequestPopup}>×</button>
            </div>
            
            <div className="request-popup-content">
              <div className="request-org-info">
                <h4>{organization.name}</h4>
                <p className="request-org-type">{organization.category}</p>
              </div>
              
              <div className="request-form">
                <label htmlFor="request-message">Why would you like to join this organization?</label>
                <textarea
                  id="request-message"
                  value={requestMessage}
                  onChange={(e) => setRequestMessage(e.target.value)}
                  placeholder="Tell us about your interest in this organization, your relevant experience, and why you'd be a great fit..."
                  rows="4"
                  className="request-message-input"
                />
                
                <div className="request-actions">
                  <button 
                    className="btn btn-secondary"
                    onClick={handleCloseRequestPopup}
                  >
                    Cancel
                  </button>
                  <button 
                    className="btn btn-primary"
                    onClick={handleSubmitRequest}
                    disabled={!requestMessage.trim()}
                  >
                    Submit Request
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Members Popup Modal */}
      {showMembersPopup && (
        <div className="members-popup-overlay" onClick={handleCloseMembersPopup}>
          <div className="members-popup" onClick={(e) => e.stopPropagation()}>
            <div className="members-popup-header">
              <h3>Members</h3>
              <button className="popup-close-btn" onClick={handleCloseMembersPopup}>×</button>
            </div>
            
            <div className="members-popup-content">
              <div className="members-popup-org-info">
                <h4>{organization.name}</h4>
                <p className="members-popup-count">{organizationMembers.length} members</p>
              </div>
              
              <div className="members-list">
                {organizationMembers.map(member => (
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
                    
                    <button 
                      className="btn btn-secondary member-popup-message"
                      onClick={() => onStartConversation(member)}
                    >
                      Message
                    </button>
                  </div>
                ))}
              </div>
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
                  <h2 className="event-modal-title">{selectedEvent.title}</h2>
                  <span className="event-modal-type-badge">{selectedEvent.category || 'Event'}</span>
                </div>
              </div>
              
              <div className="event-modal-grid">
                <div className="event-modal-info-item">
                  <div className="event-modal-info-content">
                    <span className="event-modal-label">Date & Time</span>
                    <span className="event-modal-value">{formatDate(selectedEvent.date)}, {selectedEvent.time}</span>
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
                    <span className="event-modal-value">{selectedEvent.attendees}/{selectedEvent.maxAttendees || 'Unlimited'} people</span>
                  </div>
                </div>
                
                <div className="event-modal-info-item">
                  <div className="event-modal-info-content">
                    <span className="event-modal-label">Organization</span>
                    <span className="event-modal-value">{organization.name}</span>
                  </div>
                </div>
                
                <div className="event-modal-info-item">
                  <div className="event-modal-info-content">
                    <span className="event-modal-label">Category</span>
                    <span className="event-modal-value">{selectedEvent.category || 'Event'}</span>
                  </div>
                </div>
              </div>
              
              <div className="event-modal-description">
                <h4>Event Description</h4>
                <p>{selectedEvent.description}</p>
              </div>
              
              <div className="event-modal-actions">
                <button 
                  className={`event-modal-rsvp-btn ${isUserAttending(selectedEvent.id) ? 'attending' : ''}`}
                  onClick={() => handleRSVP(selectedEvent.id)}
                >
                  {isUserAttending(selectedEvent.id) ? '✓ Attending' : 'Join Event'}
                </button>
                <button 
                  className="event-modal-share-btn"
                  onClick={() => handleShare(selectedEvent)}
                >
                  Share Event
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Instagram-style Post Modal */}
      {showPostModal && selectedPost && (
        <div className="post-modal-overlay" onClick={handleClosePostModal}>
          <div className="post-modal" onClick={(e) => e.stopPropagation()}>
            <div className="post-modal-header">
              <button className="modal-close-btn" onClick={handleClosePostModal}>×</button>
            </div>
            
            <div className="post-modal-content">
                <div className="post-modal-header-info">
                  <div className="post-user-info">
                    <img src={organization.image} alt={organization.name} className="post-user-avatar" />
                    <div className="post-user-details">
                      <span className="post-username">{organization.name}</span>
                      <span className="post-location">{user?.university || 'University of California, Berkeley'}</span>
                    </div>
                  </div>
                <button className="post-options-btn" onClick={() => handleEventFromPostClick(selectedPost)}>Event</button>
                </div>
                
              <div className="post-modal-image">
                <img src={selectedPost.image || 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=400&fit=crop'} alt="Post" />
              </div>
                
              <div className="post-modal-details">
                <div className="post-caption">
                  <div className="caption-content">
                    <span className="caption-username">{organization.name}</span>
                    <span className="caption-text">{selectedPost.content}</span>
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

      {/* Event Details Modal from Post */}
      {showEventFromPostModal && selectedEventFromPost && (
        <div className="event-modal-overlay" onClick={handleCloseEventFromPostModal}>
          <div className="event-modal" onClick={(e) => e.stopPropagation()}>
            <div className="event-modal-header">
              <h3>Event Details</h3>
              <button className="modal-close-btn" onClick={handleCloseEventFromPostModal}>×</button>
            </div>
            
            <div className="event-modal-content">
              <div className="event-modal-header-info">
                <div className="event-title-section">
                  <h2 className="event-modal-title">{selectedEventFromPost.title}</h2>
                  <span className="event-modal-type-badge">{selectedEventFromPost.category || 'Event'}</span>
                </div>
              </div>
              
              <div className="event-modal-grid">
                <div className="event-modal-info-item">
                  <div className="event-modal-info-content">
                    <span className="event-modal-label">Date & Time</span>
                    <span className="event-modal-value">{selectedEventFromPost.date}, {selectedEventFromPost.time}</span>
                  </div>
                </div>
                
                <div className="event-modal-info-item">
                  <div className="event-modal-info-content">
                    <span className="event-modal-label">Location</span>
                    <span className="event-modal-value">{selectedEventFromPost.location}</span>
                  </div>
                </div>
                
                <div className="event-modal-info-item">
                  <div className="event-modal-info-content">
                    <span className="event-modal-label">Attendees</span>
                    <span className="event-modal-value">{selectedEventFromPost.attendees}/{selectedEventFromPost.maxAttendees || 'Unlimited'} people</span>
                  </div>
                </div>
                
                <div className="event-modal-info-item">
                  <div className="event-modal-info-content">
                    <span className="event-modal-label">Organization</span>
                    <span className="event-modal-value">{organization.name}</span>
                  </div>
                </div>
                
                <div className="event-modal-info-item">
                  <div className="event-modal-info-content">
                    <span className="event-modal-label">Category</span>
                    <span className="event-modal-value">{selectedEventFromPost.category || 'Event'}</span>
                  </div>
                </div>
              </div>
              
              <div className="event-modal-description">
                <h4>Event Description</h4>
                <p>{selectedEventFromPost.description}</p>
              </div>
              
              <div className="event-modal-actions">
                    <button 
                  className={`event-modal-rsvp-btn ${isUserAttending(selectedEventFromPost.id) ? 'attending' : ''}`}
                  onClick={() => handleRSVP(selectedEventFromPost.id)}
                    >
                  {isUserAttending(selectedEventFromPost.id) ? '✓ Attending' : 'Join Event'}
                    </button>
                    <button 
                  className="event-modal-share-btn"
                  onClick={() => handleShare(selectedEventFromPost)}
                    >
                  Share Event
                    </button>
                  </div>
                </div>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {showShareModal && shareEvent && (
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
                      <img src={shareEvent.image} alt={shareEvent.title} />
              </div>
                    <div className="share-post-info">
                      <h4>{organization.name}</h4>
                      <p>{shareEvent.description.substring(0, 100)}...</p>
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
                  {recipientType === 'organization' && shareRecipients.organizations.map(org => (
                    <option key={org.id} value={org.name}>
                      {org.name} ({org.type}) - {org.university}
                    </option>
                  ))}
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

      {/* New Event Modal */}
      {showNewEventModal && (
        <div className="request-popup-overlay" onClick={handleCloseNewEventModal}>
          <div className="request-popup" onClick={(e) => e.stopPropagation()}>
            <div className="request-popup-header">
              <h3>Create New Event</h3>
              <button className="popup-close-btn" onClick={handleCloseNewEventModal}>×</button>
            </div>
            
            <div className="request-popup-content">
              <div className="request-org-info">
                <h4>{organization.name}</h4>
                <p className="request-org-type">Event Creation</p>
              </div>
              
              <div className="request-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="event-title">Event Title *</label>
                    <input
                      id="event-title"
                      type="text"
                      value={newEvent.title}
                      onChange={(e) => handleNewEventInputChange('title', e.target.value)}
                      placeholder="Enter event title"
                      className="request-message-input"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="event-category">Category</label>
                    <select
                      id="event-category"
                      value={newEvent.category}
                      onChange={(e) => handleNewEventInputChange('category', e.target.value)}
                      className="request-message-input"
                    >
                      <option value="Event">General Event</option>
                      <option value="Academic">Academic</option>
                      <option value="Social">Social</option>
                      <option value="Philanthropy">Philanthropy</option>
                      <option value="Sports">Sports</option>
                      <option value="Service">Service</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="event-date">Date *</label>
                    <input
                      id="event-date"
                      type="date"
                      value={newEvent.date}
                      onChange={(e) => handleNewEventInputChange('date', e.target.value)}
                      className="request-message-input"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="event-time">Time *</label>
                    <input
                      id="event-time"
                      type="time"
                      value={newEvent.time}
                      onChange={(e) => handleNewEventInputChange('time', e.target.value)}
                      className="request-message-input"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="event-location">Location *</label>
                    <input
                      id="event-location"
                      type="text"
                      value={newEvent.location}
                      onChange={(e) => handleNewEventInputChange('location', e.target.value)}
                      placeholder="Enter event location"
                      className="request-message-input"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="event-max-attendees">Max Attendees</label>
                    <input
                      id="event-max-attendees"
                      type="number"
                      value={newEvent.maxAttendees}
                      onChange={(e) => handleNewEventInputChange('maxAttendees', e.target.value)}
                      placeholder="Leave empty for unlimited"
                      className="request-message-input"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="event-price">Price (Optional)</label>
                    <input
                      id="event-price"
                      type="number"
                      value={newEvent.price}
                      onChange={(e) => handleNewEventInputChange('price', e.target.value)}
                      placeholder="Enter price (e.g., 25)"
                      min="0"
                      step="0.01"
                      className="request-message-input"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="event-image">Event Image</label>
                    <input
                      id="event-image"
                      type="file"
                      accept="image/*"
                      onChange={handleNewEventImageUpload}
                      className="request-message-input"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="event-description">Event Description *</label>
                  <textarea
                    id="event-description"
                    value={newEvent.description}
                    onChange={(e) => handleNewEventInputChange('description', e.target.value)}
                    placeholder="Describe your event..."
                    rows="4"
                    className="request-message-input"
                  />
                </div>

                {newEvent.image && (
                  <div className="image-preview">
                    <img src={newEvent.image} alt="Preview" style={{ width: '100px', height: '100px', objectFit: 'cover', marginTop: '10px' }} />
                  </div>
                )}
                
                <div className="request-actions">
                  <button 
                    className="btn btn-secondary"
                    onClick={handleCloseNewEventModal}
                  >
                    Cancel
                  </button>
                  <button 
                    className="btn btn-primary"
                    onClick={handleSubmitNewEvent}
                  >
                    Create Event
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Post Modal */}
      {showNewPostModal && (
        <div className="request-popup-overlay" onClick={handleCloseNewPostModal}>
          <div className="request-popup" onClick={(e) => e.stopPropagation()}>
            <div className="request-popup-header">
              <h3>Create New Post</h3>
              <button className="popup-close-btn" onClick={handleCloseNewPostModal}>×</button>
            </div>
            
            <div className="request-popup-content">
              <div className="request-org-info">
                <h4>{organization.name}</h4>
                <p className="request-org-type">Post Creation</p>
              </div>
              
              <div className="request-form">
                <div className="form-group">
                  <label htmlFor="post-caption">Caption *</label>
                  <textarea
                    id="post-caption"
                    value={newPost.caption}
                    onChange={(e) => handleNewPostInputChange('caption', e.target.value)}
                    placeholder="What's on your mind?"
                    rows="4"
                    className="request-message-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="post-image">Image (Optional)</label>
                  <input
                    id="post-image"
                    type="file"
                    accept="image/*"
                    onChange={handleNewPostImageUpload}
                    className="request-message-input"
                  />
                  {newPost.image && (
                    <div className="image-preview">
                      <img src={newPost.image} alt="Preview" style={{ width: '100px', height: '100px', objectFit: 'cover', marginTop: '10px' }} />
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="post-attach-event">Attach Event (Optional)</label>
                  <button 
                    className="btn btn-secondary"
                    onClick={handleAttachEventClick}
                    style={{ width: '100%', marginTop: '8px' }}
                  >
                    Select Event
                  </button>
                  {newPost.attachedEvent && (
                    <div className="attached-event-preview">
                      <p>Attached: {newPost.attachedEvent.title}</p>
                    </div>
                  )}
                </div>
                
                <div className="request-actions">
                  <button 
                    className="btn btn-secondary"
                    onClick={handleCloseNewPostModal}
                  >
                    Cancel
                  </button>
                  <button 
                    className="btn btn-primary"
                    onClick={handleSubmitNewPost}
                  >
                    Share Post
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

export default OrganizationProfileScreen; 