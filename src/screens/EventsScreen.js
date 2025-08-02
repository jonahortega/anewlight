import React, { useState } from 'react';
import './EventsScreen.css';

const EventsScreen = ({ 
  user, 
  onNavigate, 
  navigationData, 
  joinedEvents, 
  setJoinedEvents,
  searchTerm,
  setSearchTerm,
  searchCategory,
  setSearchCategory,
  searchSortBy,
  setSearchSortBy,
  showMyEvents,
  setShowMyEvents,
  activeTab,
  setActiveTab
}) => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const [rsvpProcessing, setRsvpProcessing] = useState(new Set());
  
  // Share modal state
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareEvent, setShareEvent] = useState(null);
  const [shareMessage, setShareMessage] = useState('');
  const [selectedRecipient, setSelectedRecipient] = useState('');
  const [recipientType, setRecipientType] = useState('person');
  


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
  const organizations = [
    {
      id: 1,
      name: 'Alpha Beta Gamma Fraternity',
      type: 'Fraternity',
      description: 'Building better men through brotherhood, scholarship, and service.',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=400&fit=crop',
      members: 127,
      events: 15
    },
    {
      id: 2,
      name: 'Delta Epsilon Zeta Sorority',
      type: 'Sorority',
      description: 'Empowering women through sisterhood, leadership, and philanthropy.',
      image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      members: 89,
      events: 12
    },
    {
      id: 3,
      name: 'Theta Iota Kappa Fraternity',
      type: 'Fraternity',
      description: 'Developing leaders through brotherhood, academic achievement, and community service.',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      members: 73,
      events: 18
    },
    {
      id: 4,
      name: 'Greek Life Council',
      type: 'Council',
      description: 'The governing body for all Greek organizations on campus.',
      image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=400&fit=crop',
      members: 301,
      events: 25
    },
    {
      id: 5,
      name: 'Delta Gamma',
      type: 'Sorority',
      description: 'Do Good. Building confidence in women through sisterhood.',
      image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      members: 52,
      events: 15
    },
    {
      id: 6,
      name: 'Beta Theta Pi',
      type: 'Fraternity',
      description: 'Developing men of principle for a principled life.',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      members: 38,
      events: 10
    }
  ];

  // Filter organizations based on search
  const filteredOrganizations = organizations.filter(org => {
    const matchesSearch = org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         org.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         org.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = searchCategory === 'all' || 
                           (searchCategory === 'fraternity' && org.type === 'Fraternity') ||
                           (searchCategory === 'sorority' && org.type === 'Sorority') ||
                           (searchCategory === 'professional' && org.type === 'Professional') ||
                           (searchCategory === 'academic' && org.type === 'Academic') ||
                           (searchCategory === 'cultural' && org.type === 'Cultural') ||
                           (searchCategory === 'service' && org.type === 'Service');
    return matchesSearch && matchesCategory;
  });

  const isUserAttending = (eventId) => {
    return joinedEvents.some(event => event.id === eventId);
  };

  // Function to get organization profile by name
  const getOrganizationProfile = (orgName) => {
    return organizations.find(org => org.name === orgName) || {
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
        const wasAttending = isUserAttending(event.id);
        
        if (wasAttending) {
          // Remove from joined events
          setJoinedEvents(prev => prev.filter(e => e.id !== event.id));
        } else {
          // Add to joined events
          const eventWithId = {
            ...event,
            id: event.id || `event_${Date.now()}`,
            joinedAt: new Date().toISOString()
          };
          setJoinedEvents(prev => [...prev, eventWithId]);
          
          // Show ticket notification
          alert(`🎫 Ticket generated for ${event.title}! Check your Tickets section to view your QR code.`);
        }
        
        setRsvpProcessing(prev => {
          const newSet = new Set(prev);
          newSet.delete(event.id);
          return newSet;
        });
      }
    }, 100);
  };

  const handlePayment = () => {
    const eventWithId = {
      ...selectedEvent,
      id: selectedEvent.id || `event_${Date.now()}`,
      joinedAt: new Date().toISOString()
    };
    setJoinedEvents(prev => [...prev, eventWithId]);
    
    // Show ticket notification
    alert(`🎫 Ticket generated for ${selectedEvent.title}! Check your Tickets section to view your QR code.`);
    
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



  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = searchCategory === 'all' || event.category.toLowerCase() === searchCategory;
    const matchesMyEvents = !showMyEvents || isUserAttending(event.id);
    
    return matchesSearch && matchesCategory && matchesMyEvents;
  });

  const sortedEvents = [...filteredEvents].sort((a, b) => {
    switch (searchSortBy) {
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

        </div>
      </div>

      {/* Content Container */}
      <div className="events-container">
        {activeTab === 'events' && (
          <>
          <div className="shotgun-events-feed">
            {sortedEvents.map(event => (
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
                    <div className="shotgun-event-org">{event.organization}</div>
                    <div className="shotgun-event-category">{event.category}</div>
                  </div>
                  
                  <h3 className="shotgun-event-title">{event.title}</h3>
                  
                  <div className="shotgun-event-meta">
                    <div className="shotgun-event-details">
                                    <span className="shotgun-event-date">{event.date}, {event.time}</span>
              <span className="shotgun-event-location">{event.location}</span>
                    </div>
                    <div className="shotgun-event-attendance">
                      <span className="shotgun-attendance-count">{event.attendees}/{event.maxAttendees}</span>
                    </div>
                  </div>
                  
                  <div className="shotgun-event-actions-bottom">
                    <button 
                      className={`shotgun-rsvp-btn ${isUserAttending(event.id) ? 'attending' : ''} ${rsvpProcessing.has(event.id) ? 'processing' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRSVP(event);
                      }}
                      disabled={rsvpProcessing.has(event.id)}
                    >
                      {rsvpProcessing.has(event.id) ? 'Processing...' : 
                       isUserAttending(event.id) ? '✓ Attending' : 'Join Event'}
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
                  </div>
                </div>
              </div>
            ))}
            
            {filteredOrganizations.length === 0 && (
              <div className="no-organizations">
                <div className="no-organizations-icon">🏛️</div>
                <h3>No organizations found</h3>
                <p>Try adjusting your search to find more organizations.</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Enhanced Event Details Modal */}
      {selectedEvent && (
        <div className="event-modal-overlay" onClick={handleCloseModal}>
          <div className="event-modal" onClick={(e) => e.stopPropagation()}>
            <div className="event-modal-header">
              <h3>Event Details</h3>
              <button className="modal-close-btn" onClick={handleCloseModal}>×</button>
            </div>
            
            <div className="event-modal-content">
              <div className="event-modal-header-info">
                <div className="event-title-section">
                  <h2 className="event-modal-title">{selectedEvent.title}</h2>
                  <span className="event-modal-type-badge">{selectedEvent.category}</span>
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
                    <p>{shareEvent.date}, {shareEvent.time}</p>
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


    </div>
  );
};

export default EventsScreen; 