import React, { useState } from 'react';
import './EventsScreen.css';

const EventsScreen = ({ user, onNavigate }) => {
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

  const isUserAttending = (eventId) => {
    return userEvents.has(eventId);
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

  const handleShare = (event) => {
    const shareText = `Check out this event: ${event.title} on ${event.date}!`;
    const shareUrl = window.location.href;
    
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: shareText,
        url: shareUrl
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
      alert('Event link copied to clipboard!');
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
          
          <h1>Discover Events</h1>
          
          {/* Search and Filter Bar */}
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
        </div>
      </div>

      {/* Events Container */}
      <div className="events-container">


        {viewMode === 'list' && (
          <div className="events-list">
            {sortedEvents.map(event => (
              <div key={event.id} className="event-list-item">
                <div className="list-item-image">
                  <img src={event.image} alt={event.title} />
                </div>
                <div className="list-item-content">
                  <div className="list-item-header">
                    <div className="list-item-category">{event.category}</div>
                    <h3>{event.title}</h3>
                    <div className="list-item-org">{event.organization}</div>
                  </div>
                  <p className="list-item-description">{event.description}</p>
                  <div className="list-item-info">
                    <span>📅 {event.date} at {event.time}</span>
                    <span>📍 {event.location}</span>
                    <span>👥 {event.attendees}/{event.maxAttendees}</span>
                  </div>
                </div>
                <div className="list-item-actions">
                  <button 
                    className={`rsvp-btn ${isUserAttending(event.id) ? 'attending' : ''} ${rsvpProcessing.has(event.id) ? 'processing' : ''}`}
                    onClick={() => handleRSVP(event)}
                    disabled={rsvpProcessing.has(event.id)}
                  >
                    {rsvpProcessing.has(event.id) ? 'Processing...' : 
                     isUserAttending(event.id) ? '✓ Attending' : 'RSVP'}
                  </button>
                  <button className="details-btn" onClick={() => handleEventClick(event)}>
                    Details
                  </button>
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
                          // Scroll to the events section for this location
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
                        <p>{location.description}</p>
                        {locationEvents.length > 0 && (
                          <div className="location-events">
                            <strong>Events:</strong>
                            {locationEvents.map(event => (
                              <div key={event.id} className="location-event">
                                • {event.title} ({event.date})
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="map-legend">
              <div className="legend-item">
                <span className="legend-marker has-events">📍</span>
                <span>Events happening</span>
              </div>
              <div className="legend-item">
                <span className="legend-marker no-events">📍</span>
                <span>No events scheduled</span>
              </div>
            </div>
            
            {/* New Events by Location Section */}
            <div className="events-by-location">
              <div className="section-header">
                <h3>Events by Location</h3>
                <p>Scroll down to explore events happening at specific campus locations</p>
              </div>
              
              <div className="locations-grid">
                {campusMap.locations
                  .filter(location => getEventsForLocation(location.id).length > 0)
                  .map(location => {
                    const locationEvents = getEventsForLocation(location.id);
                    return (
                      <div key={location.id} id={`location-${location.id}`} className="location-section">
                        <div className="location-header">
                          <div className="location-info">
                            <h4>{location.name}</h4>
                            <p>{location.description}</p>
                            <span className="event-count-badge">
                              {locationEvents.length} event{locationEvents.length !== 1 ? 's' : ''}
                            </span>
                          </div>
                          <div className="location-marker">
                            <span className="marker-icon">📍</span>
                          </div>
                        </div>
                        
                        <div className="location-events-list">
                          {locationEvents.map(event => (
                            <div key={event.id} className="location-event-card">
                              <div className="event-image">
                                <img src={event.image} alt={event.title} />
                                <div className="event-category">{event.category}</div>
                              </div>
                              <div className="event-details">
                                <h5>{event.title}</h5>
                                <p className="event-org">{event.organization}</p>
                                <p className="event-description">{event.description}</p>
                                <div className="event-meta">
                                  <span className="event-date">📅 {event.date} at {event.time}</span>
                                  <span className="event-attendees">👥 {event.attendees}/{event.maxAttendees}</span>
                                  {event.isPaid && (
                                    <span className="event-price">💰 ${event.price}</span>
                                  )}
                                </div>
                                <div className="event-actions">
                                  <button 
                                    className={`rsvp-btn ${isUserAttending(event.id) ? 'attending' : ''} ${rsvpProcessing.has(event.id) ? 'processing' : ''}`}
                                    onClick={() => handleRSVP(event)}
                                    disabled={rsvpProcessing.has(event.id)}
                                  >
                                    {rsvpProcessing.has(event.id) ? 'Processing...' : 
                                     isUserAttending(event.id) ? '✓ Attending' : 'RSVP'}
                                  </button>
                                  <button className="details-btn" onClick={() => handleEventClick(event)}>
                                    Details
                                  </button>
                                  <button className="share-btn" onClick={() => handleShare(event)}>
                                    Share
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
              </div>
              
              {campusMap.locations.filter(location => getEventsForLocation(location.id).length === 0).length > 0 && (
                <div className="no-events-locations">
                  <h4>Locations with No Events</h4>
                  <div className="empty-locations">
                    {campusMap.locations
                      .filter(location => getEventsForLocation(location.id).length === 0)
                      .map(location => (
                        <div key={location.id} className="empty-location">
                          <span className="location-icon">📍</span>
                          <span className="location-name">{location.name}</span>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {sortedEvents.length === 0 && (
          <div className="no-events">
            <span className="no-events-icon">🎭</span>
            <h3>No events found</h3>
            <p>Try adjusting your search or filters to find more events.</p>
          </div>
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
                <span className="org-icon">🏢</span>
                <strong>Hosted by:</strong> {selectedEvent.organization}
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
    </div>
  );
};

export default EventsScreen; 