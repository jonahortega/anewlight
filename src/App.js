import React, { useState, useEffect } from 'react';
import './App.css';
import ErrorBoundary from './ErrorBoundary';
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import UserInfoScreen from './screens/UserInfoScreen';
import UniversityScreen from './screens/UniversityScreen';
import GreekQuestionScreen from './screens/GreekQuestionScreen';
import OrganizationsScreen from './screens/OrganizationsScreen';
import OrganizationProfileScreen from './screens/OrganizationProfileScreen';
import ClubsScreen from './screens/ClubsScreen';
import HomeScreen from './screens/HomeScreen';
import EventsScreen from './screens/EventsScreen';
import MessagesScreen from './screens/MessagesScreen';
import TicketsScreen from './screens/TicketsScreen';
import ProfileScreen from './screens/ProfileScreen';
import SettingsScreen from './screens/SettingsScreen';
import HelpScreen from './screens/HelpScreen';
import LabScreen from './screens/LabScreen';
import Navigation from './components/Navigation';
import Notifications from './components/Notifications';
import MessagesDropdown from './components/MessagesDropdown';
import DarkModeToggle from './components/DarkModeToggle';
import WelcomeModal from './components/WelcomeModal';


function App() {
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [navigationData, setNavigationData] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [joinedEvents, setJoinedEvents] = useState([]);
  
  // Search functionality for header
  const [searchTerm, setSearchTerm] = useState('');
  const [searchCategory, setSearchCategory] = useState('all');
  const [searchSortBy, setSearchSortBy] = useState('date');
  const [showMyEvents, setShowMyEvents] = useState(false);
  const [activeTab, setActiveTab] = useState('events');
  const [showFilterPopup, setShowFilterPopup] = useState(false);
  const [searchType, setSearchType] = useState('both'); // 'events', 'organizations', or 'both'
  
  // View mode state for home screen
  const [homeViewMode, setHomeViewMode] = useState('list');
  const [homeCurrentMonth, setHomeCurrentMonth] = useState(new Date(2025, 6, 1));
  
  // Search categories - dynamic based on activeTab
  const eventCategories = [
    { id: 'all', name: 'All Events', icon: '🎉' },
    { id: 'social', name: 'Social', icon: '🎊' },
    { id: 'philanthropy', name: 'Philanthropy', icon: '❤️' },
    { id: 'academic', name: 'Academic', icon: '📚' },
    { id: 'leadership', name: 'Leadership', icon: '👑' },
    { id: 'sports', name: 'Sports', icon: '⚽' },
    { id: 'cultural', name: 'Cultural', icon: '🌍' }
  ];

  const organizationCategories = [
    { id: 'all', name: 'All Organizations', icon: '🏛️' },
    { id: 'fraternity', name: 'Fraternities', icon: '🤝' },
    { id: 'sorority', name: 'Sororities', icon: '👭' },
    { id: 'professional', name: 'Professional', icon: '💼' },
    { id: 'academic', name: 'Academic', icon: '📚' },
    { id: 'cultural', name: 'Cultural', icon: '🌍' },
    { id: 'service', name: 'Service', icon: '🤲' }
  ];

  const searchCategories = activeTab === 'events' ? eventCategories : organizationCategories;
  
  // Reset search category when switching between events and organizations
  useEffect(() => {
    setSearchCategory('all');
  }, [activeTab]);
  
  // Mock notifications with event invitations and messages
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'event-invitation',
      title: 'Event Invitation: Spring Formal 2024',
      message: 'Alpha Beta Gamma has invited you to their Spring Formal event on March 15th at 8:00 PM.',
      time: '2 hours ago',
      read: false,
      organization: 'Alpha Beta Gamma',
      eventDetails: {
        date: 'March 15, 2024',
        time: '8:00 PM',
        location: 'Grand Ballroom',
        description: 'Join us for an unforgettable night of dancing, great food, and amazing company!'
      }
    },
    {
      id: 2,
      type: 'message',
      title: 'New Message from Sarah Johnson',
      message: 'Hey! Are you going to the philanthropy event this weekend?',
      time: '1 hour ago',
      read: false,
      sender: 'Sarah Johnson',
      senderAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 3,
      type: 'event-invitation',
      title: 'Event Invitation: Leadership Workshop',
      message: 'Theta Iota Kappa is hosting a leadership development workshop and would love for you to attend.',
      time: '3 hours ago',
      read: true,
      organization: 'Theta Iota Kappa',
      eventDetails: {
        date: 'March 20, 2024',
        time: '6:30 PM',
        location: 'Student Union Building',
        description: 'Develop your leadership skills with interactive workshops and guest speakers.'
      }
    },
    {
      id: 4,
      type: 'message',
      title: 'New Message from Michael Chen',
      message: 'Thanks for sharing that post! The event looks amazing.',
      time: '4 hours ago',
      read: true,
      sender: 'Michael Chen',
      senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 5,
      type: 'event-invitation',
      title: 'Event Invitation: Philanthropy Fundraiser',
      message: 'Delta Epsilon Zeta invites you to support breast cancer awareness at their annual fundraiser.',
      time: '1 day ago',
      read: false,
      organization: 'Delta Epsilon Zeta',
      eventDetails: {
        date: 'March 22, 2024',
        time: '6:30 PM',
        location: 'Delta Epsilon Zeta House',
        description: 'Support breast cancer awareness with gourmet food, silent auctions, and inspiring speakers.'
      }
    }
  ]);
  
  // Messaging state
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);

  // Apply dark mode class to body
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  const handleNavigate = (screen, data = null) => {
    console.log('Navigating to:', screen, 'with data:', data);
    console.log('Current user:', user);
    console.log('Is authenticated:', isAuthenticated);
    setCurrentScreen(screen);
    setNavigationData(data);
  };

  const handleUserInfo = (userData) => {
    // userData comes from signup and includes username, name, email, etc.
    setUser({
      ...userData,
      username: userData.username, // ensure username is set
      name: userData.name,
      email: userData.email,
      university: userData.university || 'University of California, Berkeley',
      organization: userData.organization || null, // Don't default to any organization
      year: userData.year || 'Junior',
      major: userData.major || 'Computer Science',
      bio: userData.bio || 'Passionate about technology and Greek life.',
      image: userData.image || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face'
    });
    setCurrentScreen('university');
  };

  const handleLoginSuccess = (loginData) => {
    console.log('Login success with data:', loginData);
    // If loginData has a username (from signup), use it; otherwise, fallback
    const username = loginData.username || (loginData.emailOrUsername && !loginData.emailOrUsername.includes('@') ? loginData.emailOrUsername : 'alex.johnson');
    const name = loginData.name || (loginData.emailOrUsername && loginData.emailOrUsername.includes('@') ? 'Alex Johnson' : loginData.emailOrUsername);
    const email = loginData.email || (loginData.emailOrUsername && loginData.emailOrUsername.includes('@') ? loginData.emailOrUsername : 'alex.johnson@email.com');
    const mockUserData = {
      name,
      username,
      email,
      university: 'University of California, Berkeley',
      organization: null, // Don't default to any organization
      year: 'Junior',
      major: 'Computer Science',
      bio: 'Passionate about technology and Greek life.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face'
    };
    setUser(mockUserData);
    setIsAuthenticated(true);
    setCurrentScreen('home');
    setShowWelcomeModal(true);
  };

  const handleUniversitySelect = (universityData) => {
    // universityData is the full university object from UniversityScreen
    setUser(prev => ({ ...prev, university: universityData.name }));
    setCurrentScreen('greek-question');
  };

  const handleGreekQuestion = (answer) => {
    if (typeof answer === 'boolean') {
      // User selected "Not currently involved"
      setIsAuthenticated(true);
      setCurrentScreen('home');
      setShowWelcomeModal(true);
    } else if (answer && typeof answer === 'object') {
      // User submitted a join request
      setUser(answer);
      setIsAuthenticated(true);
      setCurrentScreen('home');
      setShowWelcomeModal(true);
    } else {
      // Fallback for any other case
      setIsAuthenticated(true);
      setCurrentScreen('home');
      setShowWelcomeModal(true);
    }
  };

  const handleOrganizationSelect = (organization) => {
    setUser(prev => ({ ...prev, organization }));
    setIsAuthenticated(true);
    setCurrentScreen('home');
    setShowWelcomeModal(true);
  };

  const handleClubSelect = (club) => {
    setUser(prev => ({ ...prev, club }));
    setIsAuthenticated(true);
    setCurrentScreen('home');
    setShowWelcomeModal(true);
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setCurrentScreen('welcome');
    setNavigationData(null);
  };

  const handleDarkModeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Notification handlers
  const handleNotificationDismiss = (notificationId) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
  };

  const handleNotificationMarkAsRead = (notificationId) => {
    setNotifications(prev => 
      prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
    );
  };

  // Function to add a new notification (for demo purposes)
  const addNotification = (notification) => {
    setNotifications(prev => [notification, ...prev]);
  };

  const handleCloseWelcomeModal = () => {
    setShowWelcomeModal(false);
  };

  const handleStartConversation = (organization) => {
    // Check if user is part of this organization
    const isUserInOrganization = () => {
      if (!user) return false;
      
      const userOrgNames = [];
      
      // Check user's organizations
      if (user.organization) {
        if (typeof user.organization === 'string') {
          userOrgNames.push(user.organization.toLowerCase());
        } else if (user.organization.name) {
          userOrgNames.push(user.organization.name.toLowerCase());
        }
      }
      
      if (user.organizations && Array.isArray(user.organizations)) {
        user.organizations.forEach(org => {
          if (org.name) userOrgNames.push(org.name.toLowerCase());
        });
      }
      
      if (user.greekOrganization && user.greekOrganization.name) {
        userOrgNames.push(user.greekOrganization.name.toLowerCase());
      }
      
      if (user.club && user.club.name) {
        userOrgNames.push(user.club.name.toLowerCase());
      }
      
      const orgName = organization.name.toLowerCase();
      return userOrgNames.some(userOrg => 
        userOrg.includes(orgName) || orgName.includes(userOrg)
      );
    };
    
    if (!isUserInOrganization()) {
      alert('You can only message organizations you are part of.');
      return;
    }
    
    // Check if conversation already exists
    const existingConversation = conversations.find(conv => conv.id === `org-${organization.id}`);
    
    if (!existingConversation) {
      const newConversation = {
        id: `org-${organization.id}`,
        type: 'organization',
        name: organization.name,
        shortName: organization.name,
        avatar: organization.image,
        members: organization.members,
        isOnline: true,
        lastMessage: '',
        time: 'Now',
        unread: 0,
        color: '#667eea',
        messages: [
          {
            id: 1,
            sender: 'system',
            content: `You joined the ${organization.name} group chat`,
            timestamp: new Date().toISOString(),
            type: 'system'
          }
        ]
      };
      
      setConversations(prev => [newConversation, ...prev]);
      setActiveConversation(newConversation.id);
    } else {
      setActiveConversation(existingConversation.id);
    }
    
    // Navigate to messages screen
    setCurrentScreen('messages');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'welcome':
        return <WelcomeScreen onNavigate={handleNavigate} />;
      case 'user-info':
        return <UserInfoScreen onContinue={handleUserInfo} onBack={() => setCurrentScreen('welcome')} />;
      case 'login':
        return <LoginScreen onLoginSuccess={handleLoginSuccess} onBack={() => setCurrentScreen('welcome')} />;
      case 'university':
        return <UniversityScreen onUniversitySelect={handleUniversitySelect} onBack={() => setCurrentScreen('user-info')} />;
      case 'greek-question':
        return <GreekQuestionScreen user={user} onAnswer={handleGreekQuestion} onBack={() => setCurrentScreen('university')} />;
      case 'organizations':
        return <OrganizationsScreen user={user} onSelect={handleOrganizationSelect} onNavigate={handleNavigate} />;
      case 'organization-profile':
        return <OrganizationProfileScreen 
          organization={navigationData?.organization} 
          user={user}
          onNavigate={handleNavigate} 
          onStartConversation={handleStartConversation}
          joinedEvents={joinedEvents}
          setJoinedEvents={setJoinedEvents}
        />;
      case 'clubs':
        return <ClubsScreen user={user} onSelect={handleClubSelect} onBack={() => setCurrentScreen('greek-question')} />;
      case 'home':
        return <HomeScreen 
          user={user} 
          onNavigate={handleNavigate} 
          joinedEvents={joinedEvents}
          setJoinedEvents={setJoinedEvents}
          viewMode={homeViewMode}
          setViewMode={setHomeViewMode}
          currentMonth={homeCurrentMonth}
          setCurrentMonth={setHomeCurrentMonth}
        />;
      case 'events':
        return <EventsScreen 
          user={user} 
          onNavigate={handleNavigate} 
          navigationData={navigationData}
          joinedEvents={joinedEvents}
          setJoinedEvents={setJoinedEvents}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          searchCategory={searchCategory}
          setSearchCategory={setSearchCategory}
          searchSortBy={searchSortBy}
          setSearchSortBy={setSearchSortBy}
          showMyEvents={showMyEvents}
          setShowMyEvents={setShowMyEvents}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          searchType={searchType}
          setSearchType={setSearchType}
        />;
      case 'messages':
        return <MessagesScreen 
          user={user} 
          onNavigate={handleNavigate} 
          conversations={conversations} 
          setConversations={setConversations} 
          activeConversation={activeConversation} 
          setActiveConversation={setActiveConversation}
          navigationData={navigationData}
        />;
      case 'tickets':
        return <TicketsScreen 
          user={user} 
          onNavigate={handleNavigate} 
          joinedEvents={joinedEvents}
        />;
      case 'profile':
        return <ProfileScreen user={user} onNavigate={handleNavigate} joinedEvents={joinedEvents} setJoinedEvents={setJoinedEvents} />;
      case 'settings':
        return <SettingsScreen user={user} onNavigate={handleNavigate} onLogout={handleLogout} onProfileUpdate={updatedProfile => setUser(prev => ({ ...prev, ...updatedProfile }))} />;
      case 'help':
        return <HelpScreen user={user} onNavigate={handleNavigate} />;
      case 'lab':
        return <LabScreen onNavigate={handleNavigate} />;
      default:
        return <HomeScreen user={user} onNavigate={handleNavigate} />;
    }
  };

  // Show navigation for all authenticated screens except onboarding screens
  const showNavigation = isAuthenticated && 
    !['welcome', 'user-info', 'login', 'university', 'greek-question', 'clubs'].includes(currentScreen);

  console.log('Navigation visibility:', {
    isAuthenticated,
    currentScreen,
    showNavigation,
    excludedScreens: ['welcome', 'user-info', 'login', 'university', 'greek-question', 'clubs']
  });

  
  return (
    <ErrorBoundary>
      <div className={`App ${isDarkMode ? 'dark-mode' : ''}`}>
        {showNavigation && (
          <div className="top-bar">
            <div className="top-bar-content">
              <div className="top-bar-left">
                {currentScreen === 'home' ? (
                  <div className="header-actions">
                    <button 
                      className={`university-btn ${homeViewMode === 'list' ? 'active' : ''}`}
                      onClick={() => setHomeViewMode('list')}
                      title={user?.university || 'University of California, Berkeley'}
                    >
                      <span className="university-name">
                        {user?.university || 'UC Berkeley'}
                      </span>
                    </button>
                    <button 
                      className={`view-toggle-btn ${homeViewMode === 'calendar' ? 'active' : ''}`}
                      onClick={() => {
                        setHomeViewMode('calendar');
                        setHomeCurrentMonth(new Date(2025, 6, 1));
                      }}
                    >
                      <span className="view-icon">📅</span>
                    </button>
                    <button 
                      className={`view-toggle-btn ${homeViewMode === 'map' ? 'active' : ''}`}
                      onClick={() => setHomeViewMode('map')}
                    >
                      <span className="view-icon">🗺️</span>
                    </button>
                  </div>
                ) : currentScreen !== 'events' && currentScreen !== 'profile' && currentScreen !== 'messages' && currentScreen !== 'organization-profile' && currentScreen !== 'tickets' && currentScreen !== 'lab' && (
                  <h2 className="app-title">@{user?.username || 'jonahortega'}</h2>
                )}
              </div>
              <div className="top-bar-center">
                {currentScreen === 'events' && (
                  <div className="header-search-container">
                    <div className="header-search-input">
                      <span className="search-icon"></span>
                      <input
                        type="text"
                        placeholder="Search events, organizations, or keywords..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="header-search-field"
                      />
                    </div>
                    <div className="header-search-filters">
                      <button 
                        className="filter-btn"
                        onClick={() => setShowFilterPopup(!showFilterPopup)}
                      >
                        Filters
                      </button>
                    </div>
                  </div>
                )}
                
                {/* Filter Popup */}
                {showFilterPopup && currentScreen === 'events' && (
                  <div 
                    className="filter-popup-overlay" 
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setShowFilterPopup(false);
                    }}
                  >
                    <div 
                      className="filter-popup" 
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                    >
                      <div className="filter-popup-header">
                        <h3>Search Filters</h3>
                        <button 
                          className="filter-close-btn" 
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setShowFilterPopup(false);
                          }}
                        >
                          ×
                        </button>
                      </div>
                      
                      <div className="filter-popup-content">
                        <div className="filter-section">
                          <h4>Search Type</h4>
                          <div className="filter-options">
                            <button 
                              className={`filter-option ${searchType === 'both' ? 'active' : ''}`}
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setSearchType('both');
                              }}
                            >
                              📅🏛️ Both Events & Organizations
                            </button>
                            <button 
                              className={`filter-option ${searchType === 'events' ? 'active' : ''}`}
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setSearchType('events');
                              }}
                            >
                              📅 Events Only
                            </button>
                            <button 
                              className={`filter-option ${searchType === 'organizations' ? 'active' : ''}`}
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setSearchType('organizations');
                              }}
                            >
                              🏛️ Organizations Only
                            </button>
                          </div>
                        </div>
                        
                        {(searchType === 'events' || searchType === 'both') && (
                          <div className="filter-section">
                            <h4>Event Categories</h4>
                            <div className="filter-options">
                              {eventCategories.map(category => (
                                <button 
                                  key={category.id}
                                  className={`filter-option ${searchCategory === category.id ? 'active' : ''}`}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    setSearchCategory(category.id);
                                  }}
                                >
                                  {category.name}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {(searchType === 'organizations' || searchType === 'both') && (
                          <div className="filter-section">
                            <h4>Organization Types</h4>
                            <div className="filter-options">
                              {organizationCategories.map(category => (
                                <button 
                                  key={category.id}
                                  className={`filter-option ${searchCategory === category.id ? 'active' : ''}`}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    setSearchCategory(category.id);
                                  }}
                                >
                                  {category.name}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="filter-popup-footer">
                        <button 
                          className="filter-clear-btn"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setSearchType('both');
                            setSearchCategory('all');
                            setShowMyEvents(false);
                          }}
                        >
                          Clear Filters
                        </button>
                        <button 
                          className="filter-apply-btn"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setShowFilterPopup(false);
                          }}
                        >
                          Apply
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="top-bar-right">
                {currentScreen !== 'events' && currentScreen !== 'lab' && (
                  <>
                    <button 
                      className="lab-btn"
                      onClick={() => handleNavigate('lab')}
                      title="Component Lab"
                    >
                      <span className="lab-icon">🧪</span>
                    </button>
                    <MessagesDropdown 
                      conversations={conversations}
                      onNavigate={handleNavigate}
                      onStartConversation={handleStartConversation}
                    />
                    <Notifications 
                      notifications={notifications}
                      onDismiss={handleNotificationDismiss}
                      onMarkAsRead={handleNotificationMarkAsRead}
                      onNavigate={handleNavigate}
                    />
                    {currentScreen === 'profile' && (
                      <button 
                        className="settings-btn"
                        onClick={() => handleNavigate('settings')}
                      >
                        <span className="settings-icon">⚙️</span>
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        )}
        
        {showNavigation && (
          <Navigation 
            currentScreen={currentScreen} 
            onNavigate={handleNavigate}
          />
        )}
        
        <main className="main-content">
          {renderScreen()}
        </main>
        
        <WelcomeModal 
          isOpen={showWelcomeModal}
          onClose={handleCloseWelcomeModal}
          user={user}
        />
      </div>
    </ErrorBoundary>
  );
}


export default App;
