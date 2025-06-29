import React, { useState } from 'react';
import './EventsScreen.css';

const EventsScreen = ({ user, onNavigate }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'calendar'
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [userEvents, setUserEvents] = useState(new Set()); // Track user's RSVPs
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Opening Week Party",
      date: "June 5, 2024",
      time: "8:00 PM",
      location: "Alpha Beta Gamma House",
      description: "Kick off the summer with our legendary opening week celebration! Join us for live music, delicious food, and an unforgettable night with your brothers. This is the perfect opportunity to meet new members and strengthen our brotherhood bonds.",
      attendees: 127,
      maxAttendees: 200,
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=200&fit=crop",
      isPaid: true,
      price: 15,
      category: "Social",
      hostedBy: "Alpha Beta Gamma Fraternity"
    },
    {
      id: 2,
      title: "Meet the Sisters",
      date: "June 8, 2024",
      time: "6:30 PM",
      location: "Delta Epsilon Zeta House",
      description: "Discover the amazing sisterhood of Delta Epsilon Zeta! Learn about our values, philanthropy work, and upcoming events. This is your chance to connect with sisters and find your place in our supportive community.",
      attendees: 89,
      maxAttendees: 150,
      image: "https://images.unsplash.com/photo-1529626455594-ef04bbd61622?w=400&h=200&fit=crop",
      isPaid: false,
      price: null,
      category: "Social",
      hostedBy: "Delta Epsilon Zeta Sorority"
    },
    {
      id: 3,
      title: "Community Service Day",
      date: "June 12, 2024",
      time: "9:00 AM",
      location: "Local Community Center",
      description: "Make a positive impact in our community! We'll be working on various projects including park cleanup, food bank assistance, and helping local families. Come join us in giving back and making a difference.",
      attendees: 28,
      maxAttendees: 40,
      image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&h=200&fit=crop",
      isPaid: false,
      price: null,
      category: "Service",
      hostedBy: "Theta Iota Kappa Fraternity"
    },
    {
      id: 4,
      title: "Summer Leadership Workshop",
      date: "June 15, 2024",
      time: "2:00 PM",
      location: "Business School Auditorium",
      description: "Develop essential leadership skills with industry professionals and interactive workshops. Learn communication strategies, team management, and personal development techniques. Open to all Greek life members.",
      attendees: 67,
      maxAttendees: 100,
      image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=200&fit=crop",
      isPaid: true,
      price: 20,
      category: "Leadership",
      hostedBy: "Greek Life Council"
    },
    {
      id: 5,
      title: "Beach Day Social",
      date: "June 18, 2024",
      time: "11:00 AM",
      location: "Crystal Beach",
      description: "Enjoy a perfect day at the beach with your Greek family! Activities include beach volleyball, swimming, sandcastle building, and great company. Don't forget your sunscreen and beach towels!",
      attendees: 156,
      maxAttendees: 200,
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=200&fit=crop",
      isPaid: false,
      price: null,
      category: "Social",
      hostedBy: "Alpha Beta Gamma Fraternity"
    },
    {
      id: 6,
      title: "Philanthropy Fundraiser",
      date: "June 22, 2024",
      time: "7:00 PM",
      location: "Delta Epsilon Zeta House",
      description: "Support breast cancer awareness with our annual philanthropy fundraiser! Enjoy a silent auction, live music, gourmet food, and inspiring stories. All proceeds go directly to breast cancer research and support programs.",
      attendees: 95,
      maxAttendees: 120,
      image: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=400&h=200&fit=crop",
      isPaid: true,
      price: 25,
      category: "Philanthropy",
      hostedBy: "Delta Epsilon Zeta Sorority"
    },
    {
      id: 7,
      title: "Study Session & Academic Support",
      date: "June 25, 2024",
      time: "7:00 PM",
      location: "Library Study Room 3",
      description: "Join our weekly academic support session! Bring your books, questions, and study materials. We'll have tutors available for various subjects, plus snacks and coffee to keep you energized. All members welcome!",
      attendees: 45,
      maxAttendees: 50,
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=200&fit=crop",
      isPaid: false,
      price: null,
      category: "Academic",
      hostedBy: "Theta Iota Kappa Fraternity"
    },
    {
      id: 8,
      title: "End of Month Mixer",
      date: "June 30, 2024",
      time: "8:00 PM",
      location: "Greek Life Center",
      description: "Celebrate the end of June with all Greek organizations! This is the perfect networking opportunity to meet members from different houses, play fun games, and enjoy great conversations. Let's strengthen our Greek community!",
      attendees: 180,
      maxAttendees: 250,
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=200&fit=crop",
      isPaid: false,
      price: null,
      category: "Social",
      hostedBy: "Greek Life Council"
    }
  ]);

  // Helper function to parse date string to Date object
  const parseEventDate = (dateStr) => {
    const [month, day, year] = dateStr.split(' ');
    const monthIndex = new Date(`${month} 1, 2000`).getMonth();
    return new Date(parseInt(year), monthIndex, parseInt(day));
  };

  // Get events for a specific date
  const getEventsForDate = (date) => {
    return events.filter(event => {
      const eventDate = parseEventDate(event.date);
      return eventDate.toDateString() === date.toDateString();
    });
  };

  // Check if user is attending an event
  const isUserAttending = (eventId) => {
    return userEvents.has(eventId);
  };

  // Update event attendees count when RSVP changes
  const updateEventAttendees = (eventId, isAttending) => {
    setEvents(prevEvents => 
      prevEvents.map(event => {
        if (event.id === eventId) {
          return {
            ...event,
            attendees: isAttending ? event.attendees + 1 : event.attendees - 1
          };
        }
        return event;
      })
    );
  };

  // Calendar navigation functions
  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const goToToday = () => {
    const today = new Date();
    setCurrentMonth(today);
    setSelectedDate(today);
  };

  // Calendar component
  const CalendarView = () => {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = new Date();
    const currentMonthYear = currentMonth.getMonth();
    const currentYear = currentMonth.getFullYear();
    
    // Get first day of current month
    const firstDay = new Date(currentYear, currentMonthYear, 1);
    const lastDay = new Date(currentYear, currentMonthYear + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    // Generate calendar days
    const calendarDays = [];
    for (let i = 0; i < startingDay; i++) {
      calendarDays.push(null); // Empty days
    }
    for (let i = 1; i <= daysInMonth; i++) {
      calendarDays.push(new Date(currentYear, currentMonthYear, i));
    }

    return (
      <div className="calendar-view">
        <div className="calendar-header">
          <h3>Event Calendar</h3>
          <div className="view-toggle">
            <button 
              className={`toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              📋 Grid
            </button>
            <button 
              className={`toggle-btn ${viewMode === 'calendar' ? 'active' : ''}`}
              onClick={() => setViewMode('calendar')}
            >
              📅 Calendar
            </button>
          </div>
        </div>

        <div className="calendar-container">
          <div className="calendar-month-header">
            <button className="month-nav-btn" onClick={goToPreviousMonth}>‹</button>
            <h4>{currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</h4>
            <button className="month-nav-btn" onClick={goToNextMonth}>›</button>
            <button className="today-btn" onClick={goToToday}>Today</button>
          </div>
          
          <div className="calendar-weekdays">
            {daysOfWeek.map(day => (
              <div key={day} className="weekday-header">
                {day}
              </div>
            ))}
          </div>

          <div className="calendar-grid">
            {calendarDays.map((date, index) => {
              if (!date) {
                return <div key={`empty-${index}`} className="calendar-day empty" />;
              }

              const dayEvents = getEventsForDate(date);
              const isToday = date.toDateString() === today.toDateString();
              const isSelected = selectedDate.toDateString() === date.toDateString();
              const isCurrentMonth = date.getMonth() === currentMonthYear;
              const hasUserEvents = dayEvents.some(event => isUserAttending(event.id));

              return (
                <div 
                  key={index} 
                  className={`calendar-day ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''} ${!isCurrentMonth ? 'other-month' : ''} ${hasUserEvents ? 'has-user-events' : ''}`}
                  onClick={() => setSelectedDate(date)}
                >
                  <div className="day-header">
                    <span className="day-number">{date.getDate()}</span>
                    {hasUserEvents && <span className="user-event-indicator">✓</span>}
                  </div>
                  <div className="day-events">
                    {dayEvents.slice(0, 3).map(event => (
                      <div 
                        key={event.id} 
                        className={`calendar-event ${isUserAttending(event.id) ? 'attending' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEventClick(event);
                        }}
                      >
                        <span className="event-title">{event.title}</span>
                        {event.isPaid && <span className="paid-indicator">💰</span>}
                        {isUserAttending(event.id) && <span className="attending-indicator">✓</span>}
                      </div>
                    ))}
                    {dayEvents.length > 3 && (
                      <div className="more-events">+{dayEvents.length - 3} more</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Selected day events */}
          {selectedDate && (
            <div className="selected-day-events">
              <h4>Events for {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</h4>
              {getEventsForDate(selectedDate).length === 0 ? (
                <p>No events scheduled for this day.</p>
              ) : (
                <div className="day-events-list">
                  {getEventsForDate(selectedDate).map(event => (
                    <div key={event.id} className="day-event-item" onClick={() => handleEventClick(event)}>
                      <div className="event-time">{event.time}</div>
                      <div className="event-info">
                        <h5>{event.title}</h5>
                        <p>{event.hostedBy}</p>
                        <span className="event-location">📍 {event.location}</span>
                        <span className="event-category">{event.category}</span>
                      </div>
                      <div className="event-status">
                        {isUserAttending(event.id) ? (
                          <span className="attending-badge">✓ Attending</span>
                        ) : (
                          <button className="rsvp-btn" onClick={(e) => {
                            e.stopPropagation();
                            handleRSVP(event);
                          }}>
                            RSVP
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
    setShowPaymentModal(false);
  };

  const handleRSVP = (event) => {
    if (event.isPaid && !isUserAttending(event.id)) {
      setShowPaymentModal(true);
    } else {
      // Toggle attendance
      const newUserEvents = new Set(userEvents);
      const wasAttending = isUserAttending(event.id);
      
      if (wasAttending) {
        newUserEvents.delete(event.id);
        updateEventAttendees(event.id, false);
      } else {
        newUserEvents.add(event.id);
        updateEventAttendees(event.id, true);
      }
      
      setUserEvents(newUserEvents);
      
      // In a real app, you'd update the server here
      console.log('RSVP updated:', event.title, wasAttending ? 'Cancelled' : 'Confirmed');
    }
  };

  const handlePayment = () => {
    // Simulate payment processing
    console.log('Processing payment for:', selectedEvent.title);
    
    // Add event to user's events after payment
    const newUserEvents = new Set(userEvents);
    newUserEvents.add(selectedEvent.id);
    setUserEvents(newUserEvents);
    updateEventAttendees(selectedEvent.id, true);
    
    setShowPaymentModal(false);
    setSelectedEvent(null);
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Social': '#667eea',
      'Philanthropy': '#f093fb',
      'Academic': '#4facfe',
      'Service': '#43e97b',
      'Leadership': '#fa709a'
    };
    return colors[category] || '#667eea';
  };

  return (
    <div className="events-screen">
      <div className="events-header">
        <div className="header-content">
          <div className="header-left">
            <h1>Events</h1>
            <p>Discover and join exciting events with your Greek life community</p>
          </div>
          <div className="header-right">
            <button className="btn btn-primary" onClick={() => onNavigate('home')}>
              ← Back to Home
            </button>
          </div>
        </div>
      </div>

      <div className="events-content">
        {viewMode === 'calendar' ? (
          <CalendarView />
        ) : (
          <>
            <div className="view-toggle-container">
              <div className="view-toggle">
                <button 
                  className={`toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => setViewMode('grid')}
                >
                  📋 Grid
                </button>
                <button 
                  className={`toggle-btn ${viewMode === 'calendar' ? 'active' : ''}`}
                  onClick={() => setViewMode('calendar')}
                >
                  📅 Calendar
                </button>
              </div>
            </div>

            <div className="events-grid">
              {events.map(event => (
                <div key={event.id} className="event-card" onClick={() => handleEventClick(event)}>
                  <div className="event-image">
                    <img src={event.image} alt={event.title} />
                    <div className="event-category" style={{ backgroundColor: getCategoryColor(event.category) }}>
                      {event.category}
                    </div>
                    {isUserAttending(event.id) && (
                      <div className="attending-badge">✅ Attending</div>
                    )}
                    {event.isPaid && (
                      <div className="paid-badge">💰 ${event.price}</div>
                    )}
                  </div>
                  
                  <div className="event-content">
                    <h3>{event.title}</h3>
                    <p className="event-host">Hosted by: {event.hostedBy}</p>
                    <p className="event-description">{event.description}</p>
                    
                    <div className="event-details">
                      <div className="detail-item">
                        <span className="detail-icon">📅</span>
                        <span>{event.date}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-icon">🕒</span>
                        <span>{event.time}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-icon">📍</span>
                        <span>{event.location}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-icon">👥</span>
                        <span>{event.attendees}/{event.maxAttendees} attending</span>
                      </div>
                    </div>

                    <div className="event-actions">
                      <button 
                        className={`btn ${isUserAttending(event.id) ? 'btn-secondary' : 'btn-primary'}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRSVP(event);
                        }}
                      >
                        {isUserAttending(event.id) ? 'Cancel RSVP' : 'RSVP'}
                      </button>
                      <button 
                        className="btn btn-outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEventClick(event);
                        }}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Event Detail Modal */}
      {selectedEvent && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{selectedEvent.title}</h2>
              <button className="modal-close" onClick={handleCloseModal}>×</button>
            </div>
            
            <div className="modal-body">
              <div className="modal-image">
                <img src={selectedEvent.image} alt={selectedEvent.title} />
              </div>
              
              <div className="modal-info">
                <p className="modal-description">{selectedEvent.description}</p>
                
                <div className="modal-details">
                  <div className="modal-detail">
                    <strong>Hosted by:</strong> {selectedEvent.hostedBy}
                  </div>
                  <div className="modal-detail">
                    <strong>Date:</strong> {selectedEvent.date}
                  </div>
                  <div className="modal-detail">
                    <strong>Time:</strong> {selectedEvent.time}
                  </div>
                  <div className="modal-detail">
                    <strong>Location:</strong> {selectedEvent.location}
                  </div>
                  <div className="modal-detail">
                    <strong>Category:</strong> {selectedEvent.category}
                  </div>
                  <div className="modal-detail">
                    <strong>Attendees:</strong> {selectedEvent.attendees}/{selectedEvent.maxAttendees}
                  </div>
                  {selectedEvent.isPaid && (
                    <div className="modal-detail">
                      <strong>Price:</strong> ${selectedEvent.price}
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="modal-footer">
              <button 
                className={`btn ${isUserAttending(selectedEvent.id) ? 'btn-secondary' : 'btn-primary'}`}
                onClick={() => handleRSVP(selectedEvent)}
              >
                {isUserAttending(selectedEvent.id) ? 'Cancel RSVP' : 'RSVP'}
              </button>
              <button className="btn btn-outline" onClick={handleCloseModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPaymentModal && selectedEvent && (
        <div className="modal-overlay" onClick={() => setShowPaymentModal(false)}>
          <div className="modal-content payment-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Payment Required</h2>
              <button className="modal-close" onClick={() => setShowPaymentModal(false)}>×</button>
            </div>
            
            <div className="modal-body">
              <div className="payment-info">
                <h3>{selectedEvent.title}</h3>
                <p>Price: <strong>${selectedEvent.price}</strong></p>
                <p>This event requires payment to attend.</p>
              </div>
              
              <div className="payment-methods">
                <h4>Select Payment Method:</h4>
                <div className="payment-option">
                  <input type="radio" id="card" name="payment" defaultChecked />
                  <label htmlFor="card">💳 Credit/Debit Card</label>
                </div>
                <div className="payment-option">
                  <input type="radio" id="paypal" name="payment" />
                  <label htmlFor="paypal">📱 PayPal</label>
                </div>
                <div className="payment-option">
                  <input type="radio" id="venmo" name="payment" />
                  <label htmlFor="venmo">💰 Venmo</label>
                </div>
              </div>
            </div>
            
            <div className="modal-footer">
              <button className="btn btn-primary" onClick={handlePayment}>
                Pay ${selectedEvent.price}
              </button>
              <button className="btn btn-outline" onClick={() => setShowPaymentModal(false)}>
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