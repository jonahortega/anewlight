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
// import MessagesScreen from './screens/MessagesScreen'; // REMOVED - MESSAGING FEATURE
import ProfileScreen from './screens/ProfileScreen';
import SettingsScreen from './screens/SettingsScreen';
import HelpScreen from './screens/HelpScreen';
import Navigation from './components/Navigation';
import Notifications from './components/Notifications';
import DarkModeToggle from './components/DarkModeToggle';
import WelcomeModal from './components/WelcomeModal';

function App() {
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [navigationData, setNavigationData] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  
  // Default notifications state (empty for now)
  const [notifications, setNotifications] = useState([]);
  
  // Messaging state
  // const [conversations, setConversations] = useState([]); // REMOVED - MESSAGING FEATURE
  // const [activeConversation, setActiveConversation] = useState(null); // REMOVED - MESSAGING FEATURE

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

  const handleCloseWelcomeModal = () => {
    setShowWelcomeModal(false);
  };

  // const handleStartConversation = (organization) => { // REMOVED - MESSAGING FEATURE
  //   // Check if conversation already exists // REMOVED - MESSAGING FEATURE
  //   const existingConversation = conversations.find(conv => conv.id === `org-${organization.id}`); // REMOVED - MESSAGING FEATURE
  //   
  //   if (!existingConversation) { // REMOVED - MESSAGING FEATURE
  //     const newConversation = { // REMOVED - MESSAGING FEATURE
  //       id: `org-${organization.id}`, // REMOVED - MESSAGING FEATURE
  //       type: 'organization', // REMOVED - MESSAGING FEATURE
  //       name: organization.name, // REMOVED - MESSAGING FEATURE
  //       shortName: organization.name, // REMOVED - MESSAGING FEATURE
  //       avatar: organization.image, // REMOVED - MESSAGING FEATURE
  //       members: organization.members, // REMOVED - MESSAGING FEATURE
  //       isOnline: true, // REMOVED - MESSAGING FEATURE
  //       lastMessage: '', // REMOVED - MESSAGING FEATURE
  //       time: 'Now', // REMOVED - MESSAGING FEATURE
  //       unread: 0, // REMOVED - MESSAGING FEATURE
  //       color: '#667eea', // REMOVED - MESSAGING FEATURE
  //       messages: [ // REMOVED - MESSAGING FEATURE
  //         { // REMOVED - MESSAGING FEATURE
  //           id: 1, // REMOVED - MESSAGING FEATURE
  //           sender: 'system', // REMOVED - MESSAGING FEATURE
  //           content: `You started a conversation with ${organization.name}`, // REMOVED - MESSAGING FEATURE
  //           timestamp: new Date().toISOString(), // REMOVED - MESSAGING FEATURE
  //           type: 'system' // REMOVED - MESSAGING FEATURE
  //         } // REMOVED - MESSAGING FEATURE
  //       ] // REMOVED - MESSAGING FEATURE
  //     }; // REMOVED - MESSAGING FEATURE
  //     
  //     setConversations(prev => [newConversation, ...prev]); // REMOVED - MESSAGING FEATURE
  //     setActiveConversation(newConversation.id); // REMOVED - MESSAGING FEATURE
  //   } else { // REMOVED - MESSAGING FEATURE
  //     setActiveConversation(existingConversation.id); // REMOVED - MESSAGING FEATURE
  //   } // REMOVED - MESSAGING FEATURE
  //   
  //   // Navigate to messages screen // REMOVED - MESSAGING FEATURE
  //   setCurrentScreen('messages'); // REMOVED - MESSAGING FEATURE
  // }; // REMOVED - MESSAGING FEATURE

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
          // onStartConversation={handleStartConversation} // REMOVED - MESSAGING FEATURE
        />;
      case 'clubs':
        return <ClubsScreen user={user} onSelect={handleClubSelect} onBack={() => setCurrentScreen('greek-question')} />;
      case 'home':
        return <HomeScreen user={user} onNavigate={handleNavigate} />;
      case 'events':
        return <EventsScreen user={user} onNavigate={handleNavigate} />;
      // case 'messages': // REMOVED - MESSAGING FEATURE
      //   return <MessagesScreen  // REMOVED - MESSAGING FEATURE
      //     user={user}  // REMOVED - MESSAGING FEATURE
      //     onNavigate={handleNavigate}  // REMOVED - MESSAGING FEATURE
      //     conversations={conversations} // REMOVED - MESSAGING FEATURE
      //     setConversations={setConversations} // REMOVED - MESSAGING FEATURE
      //     activeConversation={activeConversation} // REMOVED - MESSAGING FEATURE
      //     setActiveConversation={setActiveConversation} // REMOVED - MESSAGING FEATURE
      //   />; // REMOVED - MESSAGING FEATURE
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
                <Notifications 
                  notifications={notifications}
                  onDismiss={handleNotificationDismiss}
                  onMarkAsRead={handleNotificationMarkAsRead}
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
