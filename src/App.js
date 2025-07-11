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
import Navigation from './components/Navigation';
import Notifications from './components/Notifications';
import DarkModeToggle from './components/DarkModeToggle';

function App() {
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [navigationData, setNavigationData] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'event',
      title: 'New Event Created',
      message: 'Spring Formal 2024 has been added to your calendar',
      time: '2 hours ago',
      read: false
    },
    {
      id: 2,
      type: 'member',
      title: 'New Member Joined',
      message: 'Jeremiah joined Alpha Beta Gamma',
      time: '4 hours ago',
      read: false
    },
    {
      id: 3,
      type: 'reminder',
      title: 'Event Reminder',
      message: 'Charity Fundraiser starts in 2 hours',
      time: '1 day ago',
      read: true
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
      organization: userData.organization || { name: 'Alpha Beta Gamma', type: 'Fraternity' },
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
      organization: { name: 'Alpha Beta Gamma', type: 'Fraternity' },
      year: 'Junior',
      major: 'Computer Science',
      bio: 'Passionate about technology and Greek life.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face'
    };
    setUser(mockUserData);
    setIsAuthenticated(true);
    setCurrentScreen('home');
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
    } else if (answer && typeof answer === 'object') {
      // User submitted a join request
      setUser(answer);
      setIsAuthenticated(true);
      setCurrentScreen('home');
    } else {
      // Fallback for any other case
      setIsAuthenticated(true);
      setCurrentScreen('home');
    }
  };

  const handleOrganizationSelect = (organization) => {
    setUser(prev => ({ ...prev, organization }));
    setIsAuthenticated(true);
    setCurrentScreen('home');
  };

  const handleClubSelect = (club) => {
    setUser(prev => ({ ...prev, club }));
    setIsAuthenticated(true);
    setCurrentScreen('home');
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

  const handleNotificationDismiss = (notificationId) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
  };

  const handleNotificationMarkAsRead = (notificationId) => {
    setNotifications(prev => 
      prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
    );
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
          onNavigate={handleNavigate} 
          onStartConversation={handleStartConversation}
        />;
      case 'clubs':
        return <ClubsScreen user={user} onSelect={handleClubSelect} onBack={() => setCurrentScreen('greek-question')} />;
      case 'home':
        return <HomeScreen user={user} onNavigate={handleNavigate} />;
      case 'events':
        return <EventsScreen user={user} onNavigate={handleNavigate} />;
      case 'messages':
        return <MessagesScreen 
          user={user} 
          onNavigate={handleNavigate} 
          conversations={conversations}
          setConversations={setConversations}
          activeConversation={activeConversation}
          setActiveConversation={setActiveConversation}
        />;
      case 'profile':
        return <ProfileScreen user={user} onNavigate={handleNavigate} />;
      case 'settings':
        return <SettingsScreen user={user} onNavigate={handleNavigate} onLogout={handleLogout} onProfileUpdate={updatedProfile => setUser(prev => ({ ...prev, ...updatedProfile }))} />;
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
                <Notifications 
                  notifications={notifications}
                  onDismiss={handleNotificationDismiss}
                  onMarkAsRead={handleNotificationMarkAsRead}
                />
                <DarkModeToggle 
                  isDarkMode={isDarkMode}
                  onToggle={handleDarkModeToggle}
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
      </div>
    </ErrorBoundary>
  );
}

export default App;
