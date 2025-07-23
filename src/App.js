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
import ProfileScreen from './screens/ProfileScreen';
import SettingsScreen from './screens/SettingsScreen';
import HelpScreen from './screens/HelpScreen';
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
            content: `You started a conversation with ${organization.name}`,
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
        />;
      case 'clubs':
        return <ClubsScreen user={user} onSelect={handleClubSelect} onBack={() => setCurrentScreen('greek-question')} />;
      case 'home':
        return <HomeScreen user={user} onNavigate={handleNavigate} />;
      case 'events':
        return <EventsScreen user={user} onNavigate={handleNavigate} navigationData={navigationData} />;
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
      case 'profile':
        return <ProfileScreen user={user} onNavigate={handleNavigate} />;
      case 'settings':
        return <SettingsScreen user={user} onNavigate={handleNavigate} onLogout={handleLogout} onProfileUpdate={updatedProfile => setUser(prev => ({ ...prev, ...updatedProfile }))} />;
      case 'help':
        return <HelpScreen user={user} onNavigate={handleNavigate} />;
      default:
        return <HomeScreen user={user} onNavigate={handleNavigate} />;
    }
  };

  // Show navigation for all authenticated screens except onboarding screens and organization profile
  const showNavigation = isAuthenticated && 
    !['welcome', 'user-info', 'login', 'university', 'greek-question', 'organization-profile', 'clubs'].includes(currentScreen);

  console.log('Navigation visibility:', {
    isAuthenticated,
    currentScreen,
    showNavigation,
    excludedScreens: ['welcome', 'user-info', 'login', 'university', 'greek-question', 'organization-profile', 'clubs']
  });

  return (
    <ErrorBoundary>
      <div className={`App ${isDarkMode ? 'dark-mode' : ''}`}>
        {showNavigation && (
          <div className="top-bar">
            <div className="top-bar-content">
              <div className="top-bar-left">
                <h2 className="app-title">Greek Life</h2>
              </div>
              <div className="top-bar-right">
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
