import React, { useState } from 'react';
import './EventsScreen.css';

const EventsScreen = ({ user, onNavigate, navigationData }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [userEvents, setUserEvents] = useState(new Set());
  const [viewMode, setViewMode] = useState('list'); // 'list', 'calendar', 'map'
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showMyEvents, setShowMyEvents] = useState(false);
  const [sortBy, setSortBy] = useState('date');
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 6, 1)); // July 2025
  const [rsvpProcessing, setRsvpProcessing] = useState(new Set());
  const [activeTab, setActiveTab] = useState(navigationData?.defaultTab || 'events'); // 'events' or 'organizations'
  const [showMyOrganizations, setShowMyOrganizations] = useState(false);
  
  // Share modal state
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareEvent, setShareEvent] = useState(null);
  const [shareMessage, setShareMessage] = useState('');
  const [selectedRecipient, setSelectedRecipient] = useState('');
  const [recipientType, setRecipientType] = useState('person');
  
  // Join request modal state
  const [showRequestPopup, setShowRequestPopup] = useState(false);
  const [requestMessage, setRequestMessage] = useState('');
  const [selectedOrgForRequest, setSelectedOrgForRequest] = useState(null);

  const events = [
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

  const categories = [
    { id: 'all', name: 'All Events', icon: '🎉' },
    { id: 'social', name: 'Social', icon: '🎊' },
    { id: 'academic', name: 'Academic', icon: '📚' },
    { id: 'service', name: 'Service', icon: '🤝' },
    { id: 'leadership', name: 'Leadership', icon: '⭐' },
    { id: 'philanthropy', name: 'Philanthropy', icon: '❤️' },
    { id: 'professional', name: 'Professional', icon: '💼' }
  ];

  // Campus map data with event locations
  const campusMap = {
    image: "https://images.unsplash.com/photo-1562774053-701939374585?w=1200&h=800&fit=crop&crop=center&q=80",
    locations: [
      {
        id: 1,
        name: "Grand Ballroom",
        x: 65, // percentage from left
        y: 35, // percentage from top
        events: [1], // event IDs
        description: "Main event venue for large gatherings"
      },
      {
        id: 2,
        name: "Delta Epsilon Zeta House",
        x: 25,
        y: 60,
        events: [2],
        description: "Sorority house and event space"
      },
      {
        id: 3,
        name: "Local Community Center",
        x: 80,
        y: 70,
        events: [3],
        description: "Off-campus community service location"
      },
      {
        id: 4,
        name: "Business School Auditorium",
        x: 45,
        y: 25,
        events: [4],
        description: "Academic and professional events"
      },
      {
        id: 5,
        name: "Crystal Beach",
        x: 90,
        y: 85,
        events: [5],
        description: "Beach location for outdoor events"
      },
      {
        id: 6,
        name: "Library Study Room 3",
        x: 35,
        y: 45,
        events: [6],
        description: "Academic study and tutoring space"
      },
      {
        id: 7,
        name: "University Stadium",
        x: 55,
        y: 75,
        events: [7],
        description: "Sports and large outdoor events"
      },
      {
        id: 8,
        name: "Alumni Center",
        x: 70,
        y: 20,
        events: [8],
        description: "Professional networking and alumni events"
      }
    ]
  };

  // Organizations Data
  const userOrganizations = [
    {
      id: 1,
      name: 'Alpha Sigma Phi',
      type: 'Fraternity',
      description: 'Building better men through brotherhood, scholarship, and service.',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      members: 45,
      events: 12
    },
    {
      id: 2,
      name: 'Computer Science Club',
      type: 'Academic Club',
      description: 'Exploring technology and programming together.',
      image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      members: 28,
      events: 8
    }
  ];

  const allOrganizations = [
    ...userOrganizations,
    {
      id: 3,
      name: 'Alpha Beta Gamma Fraternity',
      type: 'Fraternity',
      description: 'Building better men through brotherhood, scholarship, and service. We strive to develop well-rounded individuals through academic excellence, social responsibility, and lifelong friendships.',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=400&fit=crop',
      members: 127,
      events: 15
    },
    {
      id: 4,
      name: 'Delta Epsilon Zeta Sorority',
      type: 'Sorority',
      description: 'Empowering women through sisterhood, leadership, and philanthropy. We focus on academic excellence, community service, and building lasting friendships.',
      image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      members: 89,
      events: 12
    },
    {
      id: 5,
      name: 'Theta Iota Kappa Fraternity',
      type: 'Fraternity',
      description: 'Developing leaders through brotherhood, academic achievement, and community service. We promote excellence in scholarship, leadership, and character.',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      members: 73,
      events: 18
    },
    {
      id: 6,
      name: 'Greek Life Council',
      type: 'Council',
      description: 'The governing body for all Greek organizations on campus. We promote Greek unity, leadership development, and coordinate inter-fraternity and inter-sorority events.',
      image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=400&fit=crop',
      members: 301,
      events: 25
    },
    {
      id: 7,
      name: 'Professional Greek Association',
      type: 'Professional Association',
      description: 'Connecting Greek alumni and current members for professional development, networking opportunities, and career advancement.',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=400&fit=crop',
      members: 78,
      events: 8
    },
    {
      id: 8,
      name: 'Delta Gamma',
      type: 'Sorority',
      description: 'Do Good. Building confidence in women through sisterhood.',
      image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      members: 52,
      events: 15
    },
    {
      id: 9,
      name: 'Beta Theta Pi',
      type: 'Fraternity',
      description: 'Developing men of principle for a principled life.',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      members: 38,
      events: 10
    },
    {
      id: 10,
      name: 'Environmental Club',
      type: 'Service Club',
      description: 'Promoting sustainability and environmental awareness.',
      image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      members: 35,
      events: 6
    }
  ];

  // Filter organizations based on search and category
  const filteredOrganizations = allOrganizations.filter(org => {
    const matchesSearch = org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         org.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || org.type.toLowerCase().includes(selectedCategory.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  const isUserAttending = (eventId) => {
    return userEvents.has(eventId);
  };

  // Function to get organization profile by name
  const getOrganizationProfile = (orgName) => {
    return allOrganizations.find(org => org.name === orgName) || {
      name: orgName,
      type: 'Organization',
      description: 'A campus organization dedicated to student life and community engagement.',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=400&fit=crop',
      members: 50,
      events: 10
    };
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
    setShowPaymentModal(false);
  };

  const handleRSVP = (event) => {
    // Prevent multiple clicks
    if (rsvpProcessing.has(event.id)) return;
    
    // Add to processing set
    setRsvpProcessing(prev => new Set(prev).add(event.id));
    
    // Simulate a small delay for better UX
    setTimeout(() => {
      if (event.isPaid && !isUserAttending(event.id)) {
        setSelectedEvent(event);
        setShowPaymentModal(true);
        setRsvpProcessing(prev => {
          const newSet = new Set(prev);
          newSet.delete(event.id);
          return newSet;
        });
      } else {
        const newUserEvents = new Set(userEvents);
        const wasAttending = isUserAttending(event.id);
        
        if (wasAttending) {
          newUserEvents.delete(event.id);
        } else {
          newUserEvents.add(event.id);
        }
        
        setUserEvents(newUserEvents);
        setRsvpProcessing(prev => {
          const newSet = new Set(prev);
          newSet.delete(event.id);
          return newSet;
        });
      }
    }, 100);
  };

  const handlePayment = () => {
    const newUserEvents = new Set(userEvents);
    newUserEvents.add(selectedEvent.id);
    setUserEvents(newUserEvents);
    
    setShowPaymentModal(false);
    setSelectedEvent(null);
  };

  // Share recipients data (same as HomeScreen)
  const shareRecipients = {
    people: [
      { id: 1, name: 'Alex Johnson', university: 'UC Berkeley' },
      { id: 2, name: 'Sarah Wilson', university: 'UC Berkeley' },
      { id: 3, name: 'Mike Davis', university: 'UC Berkeley' },
      { id: 4, name: 'Emma Brown', university: 'UC Berkeley' },
      { id: 5, name: 'David Miller', university: 'UC Berkeley' }
    ],
    organizations: [
      { id: 1, name: 'Alpha Beta Gamma Fraternity', type: 'Fraternity', university: 'UC Berkeley' },
      { id: 2, name: 'Delta Epsilon Zeta Sorority', type: 'Sorority', university: 'UC Berkeley' },
      { id: 3, name: 'Theta Iota Kappa Fraternity', type: 'Fraternity', university: 'UC Berkeley' },
      { id: 4, name: 'Greek Life Council', type: 'Council', university: 'UC Berkeley' },
      { id: 5, name: 'Professional Greek Association', type: 'Professional Association', university: 'UC Berkeley' }
    ]
  };

  const handleShare = (event) => {
    setShareEvent(event);
    setShowShareModal(true);
    setShareMessage('');
    setSelectedRecipient('');
    setRecipientType('person');
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

  const handleJoinRequest = (org) => {
    setSelectedOrgForRequest(org);
    setShowRequestPopup(true);
    setRequestMessage('');
  };

  const handleCloseRequestPopup = () => {
    setShowRequestPopup(false);
    setRequestMessage('');
    setSelectedOrgForRequest(null);
  };

  const handleSubmitRequest = () => {
    if (selectedOrgForRequest && requestMessage.trim()) {
      // In a real app, this would send the request to the backend
      console.log('Submitting join request:', {
        organization: selectedOrgForRequest.name,
        message: requestMessage
      });
      
      // Show success message and close popup
      alert(`Join request submitted successfully to ${selectedOrgForRequest.name}! You'll be notified when they respond.`);
      handleCloseRequestPopup();
    } else {
      alert('Please provide a reason for wanting to join this organization.');
    }
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || event.category.toLowerCase() === selectedCategory;
    const matchesMyEvents = !showMyEvents || isUserAttending(event.id);
    
    return matchesSearch && matchesCategory && matchesMyEvents;
  });

  const sortedEvents = [...filteredEvents].sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return new Date(a.date) - new Date(b.date);
      case 'name':
        return a.title.localeCompare(b.title);
      case 'popularity':
        return b.attendees - a.attendees;
      default:
        return 0;
    }
  });

  const myEvents = events.filter(event => isUserAttending(event.id));

  // Calendar functions
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const getEventsForDate = (day) => {
    return sortedEvents.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.getDate() === day && 
             eventDate.getMonth() === currentMonth.getMonth() &&
             eventDate.getFullYear() === currentMonth.getFullYear();
    });
  };

  // Get events for a specific date that the user is attending
  const getMyEventsForDate = (day) => {
    return sortedEvents.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.getDate() === day && 
             eventDate.getMonth() === currentMonth.getMonth() &&
             eventDate.getFullYear() === currentMonth.getFullYear() &&
             isUserAttending(event.id);
    });
  };

  const getEventsForLocation = (locationId) => {
    return sortedEvents.filter(event => {
      const location = campusMap.locations.find(loc => loc.id === locationId);
      return location && location.events.includes(event.id);
    });
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayEvents = getEventsForDate(day);
      const myEvents = getMyEventsForDate(day);
      const isToday = new Date().getDate() === day && 
                     new Date().getMonth() === currentMonth.getMonth() &&
                     new Date().getFullYear() === currentMonth.getFullYear();

      days.push(
        <div key={day} className={`calendar-day ${isToday ? 'today' : ''}`}>
          <div className="calendar-day-number">{day}</div>
          
          {/* Show user's RSVP'd events first with special styling */}
          {myEvents.map(event => (
            <div 
              key={`my-${event.id}`} 
              className="calendar-event my-event"
              onClick={() => handleEventClick(event)}
            >
              <div className="calendar-event-title">✓ {event.title}</div>
              <div className="calendar-event-time">{event.time}</div>
            </div>
          ))}
          
          {/* Show other events */}
          {dayEvents.filter(event => !isUserAttending(event.id)).map(event => (
            <div 
              key={event.id} 
              className="calendar-event"
              onClick={() => handleEventClick(event)}
            >
              <div className="calendar-event-title">{event.title}</div>
              <div className="calendar-event-time">{event.time}</div>
            </div>
          ))}
        </div>
      );
    }

    return days;
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  return (
    <div className="events-screen">
      {/* Modern Header */}
      <div className="events-header">
        <div className="header-content">
          <div className="header-top">
            <button className="back-btn" onClick={() => onNavigate('home')}>
              <span className="back-icon">←</span>
              Back to Home
            </button>
            <div className="header-actions">
              <button 
                className={`view-toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
              >
                <span className="view-icon">☰</span>
              </button>
              <button 
                className={`view-toggle-btn ${viewMode === 'calendar' ? 'active' : ''}`}
                onClick={() => {
                  setViewMode('calendar');
                  // Set calendar to July 2025 when switching to calendar view
                  setCurrentMonth(new Date(2025, 6, 1));
                }}
              >
                <span className="view-icon">📅</span>
              </button>
              <button 
                className={`view-toggle-btn ${viewMode === 'map' ? 'active' : ''}`}
                onClick={() => setViewMode('map')}
              >
                <span className="view-icon">🗺️</span>
              </button>
            </div>
          </div>
          
          <div className="discover-tabs">
            <button 
              className={`discover-tab ${activeTab === 'events' ? 'active' : ''}`}
              onClick={() => setActiveTab('events')}
            >
              Events
            </button>
            <button 
              className={`discover-tab ${activeTab === 'organizations' ? 'active' : ''}`}
              onClick={() => setActiveTab('organizations')}
            >
              Organizations
            </button>
          </div>
          
          {activeTab === 'events' ? (
            <>
          <h1>Discover Events</h1>
          
          <div className="search-filter-bar">
            <div className="search-container">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search events, organizations, or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
            
            <div className="filter-controls">
              <select 
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="category-select"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.icon} {category.name}
                  </option>
                ))}
              </select>
              
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                <option value="date">📅 Sort by Date</option>
                <option value="name">📝 Sort by Name</option>
                <option value="popularity">🔥 Sort by Popularity</option>
              </select>
              
              <button 
                className={`my-events-btn ${showMyEvents ? 'active' : ''}`}
                onClick={() => setShowMyEvents(!showMyEvents)}
              >
                {showMyEvents ? '✓' : '👤'} My Events ({myEvents.length})
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <h1>Discover Organizations</h1>
          
                      <div className="search-filter-bar">
              <div className="search-container">
                <span className="search-icon">🔍</span>
                <input
                  type="text"
                  placeholder="Search organizations, fraternities, sororities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
      </div>

              <div className="filter-controls">
                <select 
                  value={selectedCategory} 
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="category-select"
                >
                  <option value="all">🏛️ All Organizations</option>
                  <option value="fraternity">👔 Fraternities</option>
                  <option value="sorority">👗 Sororities</option>
                  <option value="club">🎯 Clubs</option>
                </select>
                
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  className="sort-select"
                >
                  <option value="name">📝 Sort by Name</option>
                  <option value="popularity">🔥 Sort by Popularity</option>
                  <option value="members">👥 Sort by Members</option>
                </select>
                
                <button 
                  className={`my-organizations-btn ${showMyOrganizations ? 'active' : ''}`}
                  onClick={() => setShowMyOrganizations(!showMyOrganizations)}
                >
                  {showMyOrganizations ? '✓' : '👤'} My Organizations ({userOrganizations.length})
                </button>
              </div>
            </div>
        </>
      )}
        </div>
      </div>

      {/* Content Container */}
      <div className="events-container">
        {activeTab === 'events' && (
          <>
        {viewMode === 'list' && (
              <div className="events-grid">
            {sortedEvents.map(event => (
                  <div key={event.id} className="event-card" onClick={() => handleEventClick(event)}>
                    <div className="event-image-container">
                      <img src={event.image} alt={event.title} className="event-image" />
                      <div className="event-overlay">
                        <div className="event-badges">
                          {event.isPaid && (
                            <div className="paid-badge">💰 ${event.price}</div>
                          )}
                          {isUserAttending(event.id) && (
                            <div className="attending-badge">✓ Attending</div>
                          )}
                </div>
                        <div className="event-actions-overlay">
                          <button className="share-btn" onClick={(e) => {
                            e.stopPropagation();
                            handleShare(event);
                          }}>
                            📤
                          </button>
                  </div>
                      </div>
                    </div>
                    
                    <div className="event-content">
                      <div className="event-category">
                        {event.organization}
                      </div>
                      
                      <h3 className="event-title">{event.title}</h3>
                      
                      <p className="event-description">{event.description}</p>
                      
                      <div className="event-info">
                        <span>📅 {event.date}</span>
                        <span>🕒 {event.time}</span>
                    <span>📍 {event.location}</span>
                    <span>👥 {event.attendees}/{event.maxAttendees}</span>
                  </div>
                      
                      <div className="event-actions">
                  <button 
                    className={`rsvp-btn ${isUserAttending(event.id) ? 'attending' : ''} ${rsvpProcessing.has(event.id) ? 'processing' : ''}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRSVP(event);
                          }}
                    disabled={rsvpProcessing.has(event.id)}
                  >
                    {rsvpProcessing.has(event.id) ? 'Processing...' : 
                     isUserAttending(event.id) ? '✓ Attending' : 'RSVP'}
                  </button>
                        <button className="details-btn" onClick={(e) => {
                          e.stopPropagation();
                          handleEventClick(event);
                        }}>
                    Details
                  </button>
                      </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {viewMode === 'calendar' && (
          <div className="events-calendar">
            <div className="calendar-header">
              <button className="calendar-nav-btn" onClick={prevMonth}>‹</button>
              <h2>{formatDate(currentMonth)}</h2>
              <button className="calendar-nav-btn" onClick={nextMonth}>›</button>
            </div>
            <div className="calendar-weekdays">
              <div className="weekday">Sun</div>
              <div className="weekday">Mon</div>
              <div className="weekday">Tue</div>
              <div className="weekday">Wed</div>
              <div className="weekday">Thu</div>
              <div className="weekday">Fri</div>
              <div className="weekday">Sat</div>
            </div>
            <div className="calendar-grid">
              {renderCalendar()}
            </div>
          </div>
        )}

        {viewMode === 'map' && (
          <div className="events-map">
            <div className="map-header">
              <h2>Campus Map</h2>
              <p>Click on locations to see events happening there</p>
            </div>
            <div className="map-container">
              <div className="campus-map-image">
                <img src={campusMap.image} alt="Campus Map" />
                {campusMap.locations.map(location => {
                  const locationEvents = getEventsForLocation(location.id);
                  return (
                    <div
                      key={location.id}
                      className={`map-marker ${locationEvents.length > 0 ? 'has-events' : 'no-events'}`}
                      style={{
                        left: `${location.x}%`,
                        top: `${location.y}%`
                      }}
                      onClick={() => {
                        if (locationEvents.length > 0) {
                          const locationSection = document.getElementById(`location-${location.id}`);
                          if (locationSection) {
                            locationSection.scrollIntoView({ behavior: 'smooth' });
                          }
                        }
                      }}
                    >
                      <div className="marker-pin">
                        <span className="marker-icon">📍</span>
                        {locationEvents.length > 0 && (
                          <span className="event-count">{locationEvents.length}</span>
                        )}
                      </div>
                      <div className="marker-tooltip">
                        <h4>{location.name}</h4>
                            <p>{locationEvents.length} event{locationEvents.length !== 1 ? 's' : ''}</p>
                      </div>
                    </div>
                  );
                })}
            </div>
            <div className="map-legend">
              <div className="legend-item">
                      <div className="legend-marker has-events"></div>
                      <span>Has Events</span>
              </div>
              <div className="legend-item">
                      <div className="legend-marker no-events"></div>
                      <span>No Events</span>
              </div>
            </div>
              </div>
                          </div>
            )}

            {sortedEvents.length === 0 && (
              <div className="no-events">
                <div className="no-events-icon">📅</div>
                <h3>No events found</h3>
                <p>Try adjusting your search or filters to find more events.</p>
                              </div>
            )}
          </>
        )}
        
        {activeTab === 'organizations' && (
          <>


            {/* Organizations Content */}
            {showMyOrganizations ? (
              <div className="my-organizations-section">
                <h2>My Organizations</h2>
                <div className="organizations-grid">
                  {userOrganizations.map(org => (
                    <div key={org.id} className="organization-card">
                      <div className="org-image">
                        <img src={org.image} alt={org.name} />
                                </div>
                      <div className="org-content">
                        <h3>{org.name}</h3>
                        <p className="org-type">{org.type}</p>
                        <p className="org-description">{org.description}</p>
                        <div className="org-stats">
                          <span>👥 {org.members} members</span>
                          <span>📅 {org.events} events</span>
                        </div>
                        <button className="view-org-btn" onClick={() => onNavigate('organization-profile', { organization: org })}>
                          View Profile
                                  </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
            ) : (
              <div className="search-organizations-section">
                <div className="organizations-grid">
                  {filteredOrganizations.map(org => (
                    <div key={org.id} className="organization-card">
                      <div className="org-image">
                        <img src={org.image} alt={org.name} />
              </div>
                      <div className="org-content">
                        <h3>{org.name}</h3>
                        <p className="org-type">{org.type}</p>
                        <p className="org-description">{org.description}</p>
                        <div className="org-stats">
                          <span>👥 {org.members} members</span>
                          <span>📅 {org.events} events</span>
                        </div>
                        <div className="org-actions">
                          <button className="view-org-btn" onClick={() => onNavigate('organization-profile', { organization: org })}>
                            View Profile
                          </button>
                          <button className="join-org-btn" onClick={() => handleJoinRequest(org)}>
                            Request to Join
                          </button>
                  </div>
                </div>
            </div>
                  ))}
          </div>
          </div>
            )}
          </>
        )}
      </div>

      {/* Enhanced Event Details Modal */}
      {selectedEvent && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-category">{selectedEvent.category}</div>
              <h2>{selectedEvent.title}</h2>
              <button className="modal-close" onClick={handleCloseModal}>×</button>
            </div>
            
            <div className="modal-body">
              <div className="modal-image-container">
                <img src={selectedEvent.image} alt={selectedEvent.title} />
                <div className="modal-image-overlay">
                  <button className="share-btn-modal" onClick={() => handleShare(selectedEvent)}>
                    📤 Share Event
                  </button>
                </div>
              </div>
              
              <div className="modal-organization">
                <div className="org-info">
                  <span className="org-icon">🏢</span>
                  <strong>Hosted by:</strong> {selectedEvent.organization}
                </div>
                <button 
                  className="view-org-profile-btn"
                  onClick={() => {
                    handleCloseModal();
                    // Get the organization profile data and navigate to its profile
                    const orgData = getOrganizationProfile(selectedEvent.organization);
                    onNavigate('organization-profile', { organization: orgData });
                  }}
                >
                  View Profile
                </button>
              </div>
              
              <p className="modal-description">{selectedEvent.description}</p>
              
              <div className="modal-details">
                <div className="modal-detail">
                  <span className="detail-icon">📅</span>
                  <strong>Date:</strong> {selectedEvent.date}
                </div>
                <div className="modal-detail">
                  <span className="detail-icon">🕒</span>
                  <strong>Time:</strong> {selectedEvent.time}
                </div>
                <div className="modal-detail">
                  <span className="detail-icon">📍</span>
                  <strong>Location:</strong> {selectedEvent.location}
                </div>
                <div className="modal-detail">
                  <span className="detail-icon">👥</span>
                  <strong>Attendees:</strong> {selectedEvent.attendees}/{selectedEvent.maxAttendees}
                </div>
                {selectedEvent.isPaid && (
                  <div className="modal-detail">
                    <span className="detail-icon">💰</span>
                    <strong>Price:</strong> ${selectedEvent.price}
                  </div>
                )}
              </div>

              <div className="modal-tags">
                <strong>Tags:</strong>
                {selectedEvent.tags.map(tag => (
                  <span key={tag} className="modal-tag">#{tag}</span>
                ))}
              </div>
            </div>
            
            <div className="modal-footer">
              <button 
                className={`rsvp-btn ${isUserAttending(selectedEvent.id) ? 'attending' : ''} ${rsvpProcessing.has(selectedEvent.id) ? 'processing' : ''}`}
                onClick={() => handleRSVP(selectedEvent)}
                disabled={rsvpProcessing.has(selectedEvent.id)}
              >
                {rsvpProcessing.has(selectedEvent.id) ? 'Processing...' : 
                 isUserAttending(selectedEvent.id) ? '✓ Attending' : 'RSVP Now'}
              </button>
              <button className="close-btn" onClick={handleCloseModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Payment Modal */}
      {showPaymentModal && selectedEvent && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content payment-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Complete Payment</h2>
              <button className="modal-close" onClick={handleCloseModal}>×</button>
            </div>
            
            <div className="modal-body">
              <div className="payment-info">
                <h3>{selectedEvent.title}</h3>
                <p className="payment-price">Price: <span className="price-amount">${selectedEvent.price}</span></p>
              </div>
              
              <div className="payment-methods">
                <h4>Select Payment Method</h4>
                <div className="payment-options">
                  <div className="payment-option">
                    <input type="radio" id="card" name="payment" defaultChecked />
                    <label htmlFor="card">
                      <span className="payment-icon">💳</span>
                      Credit/Debit Card
                    </label>
                  </div>
                  <div className="payment-option">
                    <input type="radio" id="paypal" name="payment" />
                    <label htmlFor="paypal">
                      <span className="payment-icon">📱</span>
                      PayPal
                    </label>
                  </div>
                  <div className="payment-option">
                    <input type="radio" id="venmo" name="payment" />
                    <label htmlFor="venmo">
                      <span className="payment-icon">💰</span>
                      Venmo
                    </label>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="modal-footer">
              <button className="pay-btn" onClick={handlePayment}>
                Pay ${selectedEvent.price}
              </button>
              <button className="close-btn" onClick={handleCloseModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {showShareModal && shareEvent && (
        <div className="share-modal-overlay" onClick={closeShareModal}>
          <div className="share-modal" onClick={(e) => e.stopPropagation()}>
            <div className="share-modal-header">
              <h3>Share Event</h3>
              <button className="close-btn" onClick={closeShareModal}>×</button>
            </div>
            
            <div className="share-modal-content">
              {/* Event Preview */}
              <div className="share-event-preview">
                <div className="share-event-header">
                  <div className="share-event-info">
                    <h4>{shareEvent.title}</h4>
                    <p>Hosted by: {shareEvent.organization}</p>
                    <p>{shareEvent.date} at {shareEvent.time}</p>
                    <p>{shareEvent.location}</p>
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

      {/* Join Request Popup Modal */}
      {showRequestPopup && selectedOrgForRequest && (
        <div className="request-popup-overlay" onClick={handleCloseRequestPopup}>
          <div className="request-popup" onClick={(e) => e.stopPropagation()}>
            <div className="request-popup-header">
              <h3>Join Request</h3>
              <button className="popup-close-btn" onClick={handleCloseRequestPopup}>×</button>
            </div>
            
            <div className="request-popup-content">
              <div className="request-org-info">
                <h4>{selectedOrgForRequest.name}</h4>
                <p className="request-org-type">{selectedOrgForRequest.type}</p>
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
    </div>
  );
};

export default EventsScreen; 