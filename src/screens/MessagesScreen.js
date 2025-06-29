import React, { useState, useRef, useEffect } from 'react';
import './MessagesScreen.css';

const MessagesScreen = ({ user, onNavigate }) => {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [selectedConversation]);

  // Enhanced organization group chats with detailed messages
  const generateOrganizationChats = () => {
    const chats = [];
    
    // Greek Organization Chats
    const greekOrganizations = [
      {
        id: 'theta-ki',
        name: 'Theta Kappa Iota',
        shortName: 'Theta KI',
        type: 'Fraternity',
        avatar: '🏛️',
        members: 68,
        isOnline: true,
        lastMessage: 'Hey guys! Hope you\'re having a great Fall Semester, we\'re holding our first Greek interest event for any newcomers looking to rush and meet the brothers',
        time: '2:15 PM',
        unread: 5,
        color: '#667eea'
      },
      {
        id: 'alpha-beta-gamma',
        name: 'Alpha Beta Gamma',
        shortName: 'ABG',
        type: 'Fraternity',
        avatar: '🏛️',
        members: 72,
        isOnline: true,
        lastMessage: 'Brotherhood retreat this weekend! Don\'t forget to bring your gear and positive energy! 🔥',
        time: '1:30 PM',
        unread: 2,
        color: '#764ba2'
      },
      {
        id: 'sigma-phi',
        name: 'Sigma Phi Sorority',
        shortName: 'Sigma Phi',
        type: 'Sorority',
        avatar: '👑',
        members: 85,
        isOnline: true,
        lastMessage: 'Sisterhood social tonight at 8PM! We\'ll be doing crafts and bonding activities 💕',
        time: '12:45 PM',
        unread: 8,
        color: '#f093fb'
      }
    ];

    // Club Organizations
    const clubOrganizations = [
      {
        id: 'soccer-club',
        name: 'University Soccer Club',
        shortName: 'Soccer Club',
        type: 'Sports Club',
        avatar: '⚽',
        members: 45,
        isOnline: true,
        lastMessage: 'Hey players, look forward to the semester kicking off again! We\'ll be having our first practice Monday at 8PM on Field K',
        time: '3:20 PM',
        unread: 3,
        color: '#4facfe'
      },
      {
        id: 'debate-club',
        name: 'Debate & Speech Club',
        shortName: 'Debate Club',
        type: 'Academic Club',
        avatar: '🎭',
        members: 32,
        isOnline: true,
        lastMessage: 'Great job at the tournament everyone! We\'re hosting a workshop next week for new members',
        time: '11:15 AM',
        unread: 0,
        color: '#43e97b'
      },
      {
        id: 'photography-club',
        name: 'Photography Society',
        shortName: 'Photo Club',
        type: 'Creative Club',
        avatar: '📸',
        members: 28,
        isOnline: false,
        lastMessage: 'Photo walk this Saturday! Meet at the campus fountain at 10AM. Don\'t forget your cameras!',
        time: 'Yesterday',
        unread: 1,
        color: '#fa709a'
      }
    ];

    // Service Organizations
    const serviceOrganizations = [
      {
        id: 'volunteer-corps',
        name: 'Volunteer Corps',
        shortName: 'Volunteer Corps',
        type: 'Service Club',
        avatar: '🤝',
        members: 55,
        isOnline: true,
        lastMessage: 'Community cleanup day this Sunday! We\'ll be meeting at the local park at 9AM. Bring friends!',
        time: '4:30 PM',
        unread: 4,
        color: '#ffecd2'
      },
      {
        id: 'environmental-club',
        name: 'Environmental Awareness Club',
        shortName: 'Eco Club',
        type: 'Service Club',
        avatar: '🌱',
        members: 38,
        isOnline: true,
        lastMessage: 'Tree planting event next week! We\'re partnering with the city to plant 100 new trees',
        time: '2:45 PM',
        unread: 6,
        color: '#a8edea'
      }
    ];

    // Add user's organizations if they exist
    if (user?.greekOrganization) {
      chats.push({
        ...greekOrganizations[0],
        id: `user-greek-${user.greekOrganization.id}`,
        name: user.greekOrganization.name,
        shortName: user.greekOrganization.name,
        members: user.greekOrganization.members || 45
      });
    }

    if (user?.club) {
      chats.push({
        ...clubOrganizations[0],
        id: `user-club-${user.club.id}`,
        name: user.club.name,
        shortName: user.club.name,
        members: user.club.members || 25
      });
    }

    // Add all other organizations
    return [...chats, ...greekOrganizations, ...clubOrganizations, ...serviceOrganizations];
  };

  // Enhanced individual conversations
  const individualConversations = [
    {
      id: 'individual-1',
      type: 'individual',
      name: 'Sarah Johnson',
      role: 'Theta KI President',
      lastMessage: 'Great meeting everyone! Don\'t forget about the social this weekend.',
      time: '2:30 PM',
      unread: 2,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      isOnline: true,
      status: 'Active now'
    },
    {
      id: 'individual-2',
      type: 'individual',
      name: 'Michael Chen',
      role: 'Soccer Club Captain',
      lastMessage: 'What time does the practice start tomorrow?',
      time: '1:45 PM',
      unread: 1,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      isOnline: false,
      status: 'Last seen 2 hours ago'
    },
    {
      id: 'individual-3',
      type: 'individual',
      name: 'Jessica Lee',
      role: 'Debate Club VP',
      lastMessage: 'Thanks for the help with the tournament prep!',
      time: '11:30 AM',
      unread: 0,
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      isOnline: true,
      status: 'Active now'
    }
  ];

  // Combine organization chats with individual conversations
  const allConversations = [...generateOrganizationChats(), ...individualConversations];

  // Enhanced messages for different conversations
  const getConversationMessages = (conversation) => {
    if (conversation.id === 'theta-ki' || conversation.id === 'user-greek-1') {
      return [
        { 
          id: 1, 
          sender: 'Theta KI', 
          senderRole: 'Organization',
          message: 'Hey guys! Hope you\'re having a great Fall Semester, we\'re holding our first Greek interest event for any newcomers looking to rush and meet the brothers', 
          time: '2:15 PM', 
          isOwn: false,
          type: 'announcement',
          reactions: { '👍': 12, '❤️': 8, '🔥': 5 }
        },
        { 
          id: 2, 
          sender: 'Alex Johnson', 
          senderRole: 'President',
          message: 'This is going to be amazing! We\'ll have food, games, and lots of brotherhood bonding', 
          time: '2:17 PM', 
          isOwn: false,
          type: 'message'
        },
        { 
          id: 3, 
          sender: 'You', 
          senderRole: 'Member',
          message: 'I\'ll definitely be there! Can\'t wait to meet the new potential brothers', 
          time: '2:18 PM', 
          isOwn: true,
          type: 'message'
        },
        { 
          id: 4, 
          sender: 'Mike Chen', 
          senderRole: 'Rush Chair',
          message: 'Perfect! I\'ll set up the registration form and send out the details', 
          time: '2:20 PM', 
          isOwn: false,
          type: 'message'
        },
        { 
          id: 5, 
          sender: 'Sarah Wilson', 
          senderRole: 'Social Chair',
          message: 'I\'ll handle the decorations and make sure everything looks great! 🎉', 
          time: '2:22 PM', 
          isOwn: false,
          type: 'message'
        }
      ];
    } else if (conversation.id === 'soccer-club' || conversation.id === 'user-club-1') {
      return [
        { 
          id: 1, 
          sender: 'Soccer Club', 
          senderRole: 'Organization',
          message: 'Hey players, look forward to the semester kicking off again! We\'ll be having our first practice Monday at 8PM on Field K', 
          time: '3:20 PM', 
          isOwn: false,
          type: 'announcement',
          reactions: { '⚽': 15, '👍': 10, '🔥': 7 }
        },
        { 
          id: 2, 
          sender: 'David Kim', 
          senderRole: 'Captain',
          message: 'Make sure to bring your cleats and water bottles! We\'ll be doing fitness tests', 
          time: '3:22 PM', 
          isOwn: false,
          type: 'message'
        },
        { 
          id: 3, 
          sender: 'You', 
          senderRole: 'Player',
          message: 'Can\'t wait to get back on the field! Will we have new jerseys this season?', 
          time: '3:23 PM', 
          isOwn: true,
          type: 'message'
        },
        { 
          id: 4, 
          sender: 'Coach Martinez', 
          senderRole: 'Coach',
          message: 'Yes! New jerseys are being ordered this week. We\'ll have them by the first game', 
          time: '3:25 PM', 
          isOwn: false,
          type: 'message'
        },
        { 
          id: 5, 
          sender: 'Emma Rodriguez', 
          senderRole: 'Vice Captain',
          message: 'I\'ll bring the cones and training equipment. Let\'s make this our best season yet! 💪', 
          time: '3:27 PM', 
          isOwn: false,
          type: 'message'
        }
      ];
    } else if (conversation.id === 'debate-club') {
      return [
        { 
          id: 1, 
          sender: 'Debate Club', 
          senderRole: 'Organization',
          message: 'Great job at the tournament everyone! We\'re hosting a workshop next week for new members', 
          time: '11:15 AM', 
          isOwn: false,
          type: 'announcement',
          reactions: { '🎭': 8, '👏': 12, '🏆': 6 }
        },
        { 
          id: 2, 
          sender: 'Jessica Lee', 
          senderRole: 'VP',
          message: 'We won first place! Everyone\'s hard work really paid off', 
          time: '11:17 AM', 
          isOwn: false,
          type: 'message'
        },
        { 
          id: 3, 
          sender: 'You', 
          senderRole: 'Member',
          message: 'The workshop sounds great! I\'ll help organize the materials', 
          time: '11:18 AM', 
          isOwn: true,
          type: 'message'
        }
      ];
    } else if (conversation.id === 'volunteer-corps') {
      return [
        { 
          id: 1, 
          sender: 'Volunteer Corps', 
          senderRole: 'Organization',
          message: 'Community cleanup day this Sunday! We\'ll be meeting at the local park at 9AM. Bring friends!', 
          time: '4:30 PM', 
          isOwn: false,
          type: 'announcement',
          reactions: { '🤝': 20, '🌍': 15, '❤️': 12 }
        },
        { 
          id: 2, 
          sender: 'Maria Garcia', 
          senderRole: 'Coordinator',
          message: 'We\'ll provide gloves and trash bags. Let\'s make our community beautiful!', 
          time: '4:32 PM', 
          isOwn: false,
          type: 'message'
        }
      ];
    } else if (conversation.type === 'individual') {
      return [
        { 
          id: 1, 
          sender: conversation.name, 
          senderRole: conversation.role,
          message: 'Hey! How are you doing?', 
          time: '2:30 PM', 
          isOwn: false,
          type: 'message'
        },
        { 
          id: 2, 
          sender: 'You', 
          senderRole: 'You',
          message: 'I\'m doing great! How about you?', 
          time: '2:32 PM', 
          isOwn: true,
          type: 'message'
        },
        { 
          id: 3, 
          sender: conversation.name, 
          senderRole: conversation.role,
          message: 'Pretty good! Are you coming to the social this weekend?', 
          time: '2:35 PM', 
          isOwn: false,
          type: 'message'
        },
        { 
          id: 4, 
          sender: 'You', 
          senderRole: 'You',
          message: 'Yes, I\'ll be there! Looking forward to it.', 
          time: '2:36 PM', 
          isOwn: true,
          type: 'message'
        },
        { 
          id: 5, 
          sender: conversation.name, 
          senderRole: conversation.role,
          message: 'Great! It\'s going to be so much fun! 🎉', 
          time: '2:38 PM', 
          isOwn: false,
          type: 'message'
        }
      ];
    } else {
      // Default organization messages
      return [
        { 
          id: 1, 
          sender: conversation.name, 
          senderRole: 'Organization',
          message: 'Welcome to the group! We\'re excited to have you here.', 
          time: '2:30 PM', 
          isOwn: false,
          type: 'announcement',
          reactions: { '👋': 5, '🎉': 3 }
        },
        { 
          id: 2, 
          sender: 'You', 
          senderRole: 'Member',
          message: 'Thanks! Happy to be part of the community!', 
          time: '2:32 PM', 
          isOwn: true,
          type: 'message'
        }
      ];
    }
  };

  const filteredConversations = allConversations.filter(conv =>
    conv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.shortName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // In a real app, this would send the message to the server
      setNewMessage('');
      setIsTyping(false);
    }
  };

  const handleTyping = (e) => {
    setNewMessage(e.target.value);
    if (!isTyping) {
      setIsTyping(true);
    }
  };

  const startNewConversation = () => {
    // In a real app, this would open a new conversation modal
    console.log('Start new conversation');
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log('File selected:', file.name);
      // In a real app, this would upload the file
    }
  };

  const renderConversationsList = () => (
    <div className="conversations-list">
      <div className="conversations-header">
        <h2>Messages</h2>
        <button className="new-conversation-btn" onClick={startNewConversation}>
          <span>+</span>
        </button>
      </div>

      <div className="search-section">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>
      </div>

      <div className="conversations">
        {filteredConversations.map(conversation => (
          <div 
            key={conversation.id} 
            className={`conversation-item ${selectedConversation?.id === conversation.id ? 'active' : ''}`}
            onClick={() => setSelectedConversation(conversation)}
          >
            <div className="conversation-avatar">
              {conversation.type === 'individual' ? (
                <img src={conversation.avatar} alt={conversation.name} />
              ) : (
                <div className="group-avatar" style={{ backgroundColor: conversation.color }}>
                  {conversation.avatar}
                </div>
              )}
              <span className={`status-dot ${conversation.isOnline ? 'online' : 'offline'}`}></span>
            </div>
            
            <div className="conversation-content">
              <div className="conversation-header">
                <h4>{conversation.shortName || conversation.name}</h4>
                <span className="conversation-time">{conversation.time}</span>
              </div>
              <p className="conversation-preview">{conversation.lastMessage}</p>
              <div className="conversation-meta">
                {conversation.type === 'group' && (
                  <span className="group-members">{conversation.members} members</span>
                )}
                {conversation.organizationType && (
                  <span className={`organization-badge ${conversation.organizationType.toLowerCase()}`}>
                    {conversation.organizationType}
                  </span>
                )}
                {conversation.role && (
                  <span className="role-badge">{conversation.role}</span>
                )}
              </div>
            </div>
            
            {conversation.unread > 0 && (
              <div className="unread-badge">
                {conversation.unread}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderChatView = () => (
    <div className="chat-view">
      <div className="chat-header">
        <button 
          className="back-to-conversations"
          onClick={() => setSelectedConversation(null)}
        >
          ← Back
        </button>
        <div className="chat-info">
          <div className="chat-avatar">
            {selectedConversation.type === 'individual' ? (
              <img src={selectedConversation.avatar} alt={selectedConversation.name} />
            ) : (
              <div className="group-avatar" style={{ backgroundColor: selectedConversation.color }}>
                {selectedConversation.avatar}
              </div>
            )}
            <span className={`status-dot ${selectedConversation.isOnline ? 'online' : 'offline'}`}></span>
          </div>
          <div className="chat-details">
            <h3>{selectedConversation.shortName || selectedConversation.name}</h3>
            <p>
              {selectedConversation.type === 'group' 
                ? `${selectedConversation.members} members` 
                : selectedConversation.status || 'Online'
              }
            </p>
          </div>
        </div>
        <div className="chat-actions">
          <button className="action-btn" title="Voice Call">📞</button>
          <button className="action-btn" title="Video Call">📹</button>
          <button className="action-btn" title="More Options">⋯</button>
        </div>
      </div>

      <div className="chat-messages">
        {getConversationMessages(selectedConversation).map(message => (
          <div key={message.id} className={`message ${message.isOwn ? 'own' : ''} ${message.type}`}>
            <div className="message-content">
              {!message.isOwn && (
                <div className="message-sender">
                  <span className="sender-name">{message.sender}</span>
                  {message.senderRole && (
                    <span className="sender-role">{message.senderRole}</span>
                  )}
                </div>
              )}
              <div className="message-text">{message.message}</div>
              {message.reactions && (
                <div className="message-reactions">
                  {Object.entries(message.reactions).map(([emoji, count]) => (
                    <span key={emoji} className="reaction">
                      {emoji} {count}
                    </span>
                  ))}
                </div>
              )}
              <div className="message-time">{message.time}</div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="message typing">
            <div className="message-content">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input">
        <div className="input-actions">
          <button className="input-action-btn" onClick={handleFileUpload} title="Attach File">
            📎
          </button>
          <button 
            className="input-action-btn" 
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            title="Emoji"
          >
            😊
          </button>
          <input
            ref={fileInputRef}
            type="file"
            style={{ display: 'none' }}
            onChange={handleFileSelect}
            accept="image/*,video/*,.pdf,.doc,.docx"
          />
        </div>
        <input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={handleTyping}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          className="message-input"
        />
        <button 
          className="send-btn"
          onClick={handleSendMessage}
          disabled={!newMessage.trim()}
        >
          Send
        </button>
      </div>
    </div>
  );

  return (
    <div className="messages-screen">
      <header className="messages-header">
        <button className="back-button" onClick={() => onNavigate('home')}>
          ← Back to Home
        </button>
        <h1>Messages</h1>
        <p>Stay connected with your campus community</p>
      </header>

      <div className="messages-container">
        <div className="messages-content">
          {!selectedConversation ? renderConversationsList() : renderChatView()}
        </div>
      </div>
    </div>
  );
};

export default MessagesScreen; 