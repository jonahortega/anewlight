import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import './TicketsScreen.css';

const TicketsScreen = ({ user, onNavigate, joinedEvents }) => {
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [showQRModal, setShowQRModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all'); // all, upcoming, past

  // Convert joined events to tickets
  const tickets = joinedEvents.map(event => ({
    id: `ticket_${event.id}_${Date.now()}`,
    eventId: event.id,
    eventTitle: event.title,
    organization: event.organization,
    date: event.date,
    time: event.time,
    location: event.location,
    category: event.category,
    image: event.image,
    joinedAt: event.joinedAt || new Date().toISOString(),
    status: new Date(event.date) > new Date() ? 'upcoming' : 'past',
    qrCode: generateQRCode(event.id, user?.id || 'user'),
    ticketNumber: `TKT-${event.id.toString().padStart(4, '0')}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
    price: event.isPaid ? `$${event.price}` : 'Free'
  }));

  // Generate QR code data
  function generateQRCode(eventId, userId) {
    const data = {
      eventId: eventId,
      userId: userId,
      timestamp: new Date().toISOString(),
      ticketId: `TKT-${eventId}-${userId}`
    };
    return JSON.stringify(data);
  }

  // Filter tickets based on search and status
  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.eventTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.organization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || ticket.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleViewTicket = (ticket) => {
    setSelectedTicket(ticket);
    setShowQRModal(true);
  };

  const handleCloseQRModal = () => {
    setShowQRModal(false);
    setSelectedTicket(null);
  };

  // Add keyboard support for closing modal
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && showQRModal) {
        handleCloseQRModal();
      }
    };

    if (showQRModal) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [showQRModal]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming': return '#4CAF50';
      case 'past': return '#9E9E9E';
      default: return '#2196F3';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'upcoming': return 'Upcoming';
      case 'past': return 'Past';
      default: return 'Active';
    }
  };

  return (
    <div className="tickets-screen">
      {/* Search and Filter */}
      <div className="tickets-controls">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search tickets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>
        
        <div className="filter-container">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Tickets</option>
            <option value="upcoming">Upcoming</option>
            <option value="past">Past</option>
          </select>
        </div>
      </div>

      {/* Tickets List */}
      <div className="tickets-list">
        {filteredTickets.length === 0 ? (
          <div className="no-tickets">
            <div className="no-tickets-icon">🎫</div>
            <h3>No tickets found</h3>
            <p>
              {searchTerm || filterStatus !== 'all' 
                ? 'Try adjusting your search or filters'
                : 'You haven\'t RSVP\'d to any events yet. Check out the events page to get started!'
              }
            </p>
            {!searchTerm && filterStatus === 'all' && (
              <button 
                className="browse-events-btn"
                onClick={() => onNavigate('events', { searchType: 'events' })}
              >
                Browse Events
              </button>
            )}
          </div>
        ) : (
          filteredTickets.map(ticket => (
            <div key={ticket.id} className="ticket-card">
              <div className="ticket-image">
                <img src={ticket.image} alt={ticket.eventTitle} />
                <div 
                  className="ticket-status"
                  style={{ backgroundColor: getStatusColor(ticket.status) }}
                >
                  {getStatusText(ticket.status)}
                </div>
              </div>
              
              <div className="ticket-content">
                <h3 className="ticket-title">{ticket.eventTitle}</h3>
                <p className="ticket-organization">{ticket.organization}</p>
                
                <div className="ticket-details">
                  <div className="ticket-detail">
                    <span className="detail-icon">📅</span>
                    <span>{formatDate(ticket.date)}</span>
                  </div>
                  <div className="ticket-detail">
                    <span className="detail-icon">🕒</span>
                    <span>{ticket.time}</span>
                  </div>
                  <div className="ticket-detail">
                    <span className="detail-icon">📍</span>
                    <span>{ticket.location}</span>
                  </div>
                  <div className="ticket-detail">
                    <span className="detail-icon">💰</span>
                    <span>{ticket.price}</span>
                  </div>
                </div>
                
                <div className="ticket-footer">
                  <span className="ticket-number">{ticket.ticketNumber}</span>
                  <button 
                    className="view-ticket-btn"
                    onClick={() => handleViewTicket(ticket)}
                  >
                    View Ticket
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* QR Code Modal */}
      {showQRModal && selectedTicket && (
        <div className="qr-modal-overlay" onClick={handleCloseQRModal}>
          <div className="qr-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-instruction">Click outside to close</div>
            <div className="qr-modal-header">
              <h2>Event Ticket</h2>
              <button className="close-btn" onClick={handleCloseQRModal} title="Close">
                <span className="close-icon">×</span>
                <span className="close-text">Close</span>
              </button>
            </div>
            
            <div className="qr-modal-content">
              <div className="ticket-info">
                <h3>{selectedTicket.eventTitle}</h3>
                <p className="organization">{selectedTicket.organization}</p>
                <div className="event-details">
                  <p><strong>Date:</strong> {formatDate(selectedTicket.date)}</p>
                  <p><strong>Time:</strong> {selectedTicket.time}</p>
                  <p><strong>Location:</strong> {selectedTicket.location}</p>
                  <p><strong>Price:</strong> {selectedTicket.price}</p>
                  <p><strong>Ticket #:</strong> {selectedTicket.ticketNumber}</p>
                </div>
              </div>
              
              <div className="qr-code-container">
                <div className="qr-code">
                  <QRCodeSVG 
                    value={selectedTicket.qrCode}
                    size={200}
                    level="H"
                    includeMargin={true}
                    bgColor="#FFFFFF"
                    fgColor="#000000"
                  />
                </div>
                <p className="qr-instructions">
                  Present this QR code at the event entrance for check-in
                </p>
              </div>
            </div>
            
            <div className="qr-modal-footer">
              <button className="download-btn">Download Ticket</button>
              <button className="share-btn">Share Ticket</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketsScreen; 