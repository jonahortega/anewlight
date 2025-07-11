import React, { useState } from 'react';
import './OrganizationProfileScreen.css';

const OrganizationProfileScreen = ({ organization, onNavigate, onStartConversation }) => {
  const [activeTab, setActiveTab] = useState('events');
  const [rsvpStatus, setRsvpStatus] = useState({});

  // Organization-specific events based on type and category
  const getOrganizationEvents = (org) => {
    const baseEvents = {
      'Fraternity': [
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
  const organizationPosts = getOrganizationPosts(organization);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const handleRSVP = (eventId) => {
    setRsvpStatus(prev => ({
      ...prev,
      [eventId]: !prev[eventId]
    }));
  };

  return (
    <div className="organization-profile-screen">
      {/* Header */}
      <div className="profile-header">
        <button className="back-button" onClick={() => onNavigate('organizations')}>
          ← Back
        </button>
        <div className="settings-button">⋯</div>
      </div>

      {/* Profile Container */}
      <div className="profile-container">
        <div className="profile-info-section">
          <div className="profile-avatar-section">
            <div className="profile-avatar">
              <img src={organization.image} alt={organization.name} />
            </div>
          </div>
          
          <div className="profile-details">
            <div className="profile-name-section">
              <h1 className="profile-name">{organization.name}</h1>
              <span className="profile-username">{organization.type}</span>
            </div>
            
            <div className="profile-stats">
              <div className="stat-item">
                <span className="stat-number">{organization.members}</span>
                <span className="stat-label">Members</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{organizationEvents.length}</span>
                <span className="stat-label">Events</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{organization.category}</span>
                <span className="stat-label">Category</span>
              </div>
            </div>
            
            <div className="profile-bio-section">
              <p className="profile-bio">{organization.description}</p>
              <div className="profile-location">
                <span className="location-icon">📍</span>
                <span>University Campus</span>
              </div>
              <div className="profile-organization">
                <span className="org-icon">🏛️</span>
                <span>Founded 2020</span>
              </div>
            </div>
            
            <div className="profile-actions">
              <button className="btn btn-primary" onClick={() => onNavigate('events')}>
                View Events
              </button>
              <button className="btn btn-secondary" onClick={() => onStartConversation(organization)}>
                Message
              </button>
            </div>
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
          className={`tab-button ${activeTab === 'members' ? 'active' : ''}`}
          onClick={() => setActiveTab('members')}
        >
          👥 Members
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
          <div className="events-section">
            <h2>Upcoming Events</h2>
            <div className="events-grid">
              {organizationEvents.map(event => (
                <div key={event.id} className="event-card">
                  <div className="event-image">
                    <img src={event.image} alt={event.title} />
                  </div>
                  
                  <div className="event-content">
                    <h3>{event.title}</h3>
                    <p className="event-description">{event.description}</p>
                    
                    <div className="event-details">
                      <div className="event-detail">
                        <span className="detail-icon">📅</span>
                        <span>{formatDate(event.date)} at {event.time}</span>
                      </div>
                      <div className="event-detail">
                        <span className="detail-icon">📍</span>
                        <span>{event.location}</span>
                      </div>
                      <div className="event-detail">
                        <span className="detail-icon">👥</span>
                        <span>{event.attendees}/{event.maxAttendees} attending</span>
                      </div>
                    </div>
                    
                    <div className="event-footer">
                      <div className="event-summary">
                        <div className="event-summary-item">
                          <span className="event-summary-icon">📅</span>
                          <span>{formatDate(event.date)}</span>
                        </div>
                        <div className="event-summary-item">
                          <span className="event-summary-icon">🕒</span>
                          <span>{event.time}</span>
                        </div>
                        <div className="event-summary-item">
                          <span className="event-summary-icon">📍</span>
                          <span>{event.location}</span>
                        </div>
                        <div className="event-summary-item">
                          <span className="event-summary-icon">👥</span>
                          <span>{event.attendees}/{event.maxAttendees} attending</span>
                        </div>
                      </div>
                      
                      <button 
                        className={`event-rsvp ${rsvpStatus[event.id] ? 'rsvpd' : ''}`}
                        onClick={() => handleRSVP(event.id)}
                      >
                        {rsvpStatus[event.id] ? '✓ RSVP\'d' : 'RSVP'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'members' && (
          <div className="members-section">
            <h2>Members ({organizationMembers.length})</h2>
            <div className="members-grid">
              {organizationMembers.map(member => (
                <div key={member.id} className="member-card">
                  <div className="member-avatar">
                    <img src={member.avatar} alt={member.name} />
                  </div>
                  
                  <div className="member-info">
                    <h3>{member.name}</h3>
                    <p className="member-role">{member.role}</p>
                    <div className="member-details">
                      <span className="member-year">{member.year}</span>
                      <span className="member-major">{member.major}</span>
                    </div>
                  </div>
                  
                  <button className="btn btn-outline member-message">
                    Message
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'posts' && (
          <div className="posts-section">
            <h2>Posts</h2>
            <div className="posts-grid">
              {organizationPosts.map(post => (
                <div key={post.id} className="post-card">
                  <div className={`post-type-badge ${post.type}`}>
                    {post.type}
                  </div>
                  
                  <div className="post-author">
                    <img src={post.authorAvatar} alt={post.author} />
                    <div>
                      <span>{post.author}</span>
                      <div style={{ fontSize: '0.85rem', color: '#6b7280', marginTop: '2px' }}>
                        {post.authorRole}
                      </div>
                    </div>
                  </div>
                  
                  <div className="post-content">
                    <p>{post.content}</p>
                    
                    {post.image && (
                      <div className="post-image">
                        <img src={post.image} alt="Post content" />
                      </div>
                    )}
                    
                    <div className="post-details">
                      <div className="post-detail">
                        <span className="detail-icon">👍</span>
                        <span>{post.likes} likes</span>
                      </div>
                      <div className="post-detail">
                        <span className="detail-icon">💬</span>
                        <span>{post.comments} comments</span>
                      </div>
                      <div className="post-detail">
                        <span className="detail-icon">🕒</span>
                        <span>{post.timestamp}</span>
                      </div>
                    </div>
                    
                    <div className="post-actions">
                      <button className="post-action-btn">
                        👍 Like
                      </button>
                      <button className="post-action-btn">
                        💬 Comment
                      </button>
                      <button className="post-action-btn">
                        🔄 Share
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
  );
};

export default OrganizationProfileScreen; 