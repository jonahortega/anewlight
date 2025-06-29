import React, { useState } from 'react';
import './App.css';
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

function App() {
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [navigationData, setNavigationData] = useState(null);

  const handleNavigate = (screen, data = null) => {
    setCurrentScreen(screen);
    setNavigationData(data);
  };

  const handleUserInfo = (userData) => {
    setUser(userData);
    setCurrentScreen('university');
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

  const renderScreen = () => {
    switch (currentScreen) {
      case 'welcome':
        return <WelcomeScreen onNavigate={handleNavigate} />;
      case 'user-info':
        return <UserInfoScreen onContinue={handleUserInfo} onBack={() => setCurrentScreen('welcome')} />;
      case 'login':
        return <LoginScreen onLogin={handleUserInfo} onBack={() => setCurrentScreen('welcome')} />;
      case 'university':
        return <UniversityScreen onUniversitySelect={handleUniversitySelect} onBack={() => setCurrentScreen('user-info')} />;
      case 'greek-question':
        return <GreekQuestionScreen user={user} onAnswer={handleGreekQuestion} onBack={() => setCurrentScreen('university')} />;
      case 'organizations':
        return <OrganizationsScreen user={user} onSelect={handleOrganizationSelect} onNavigate={handleNavigate} />;
      case 'organization-profile':
        return <OrganizationProfileScreen organization={navigationData?.organization} onNavigate={handleNavigate} />;
      case 'clubs':
        return <ClubsScreen user={user} onSelect={handleClubSelect} onBack={() => setCurrentScreen('greek-question')} />;
      case 'home':
        return <HomeScreen user={user} onNavigate={handleNavigate} />;
      case 'events':
        return <EventsScreen user={user} onNavigate={handleNavigate} />;
      case 'messages':
        return <MessagesScreen user={user} onNavigate={handleNavigate} />;
      case 'profile':
        return <ProfileScreen user={user} onNavigate={handleNavigate} />;
      case 'settings':
        return <SettingsScreen user={user} onNavigate={handleNavigate} />;
      default:
        return <HomeScreen user={user} onNavigate={handleNavigate} />;
    }
  };

  // Show navigation for all authenticated screens except onboarding screens and organization profile
  const showNavigation = isAuthenticated && 
    !['welcome', 'user-info', 'login', 'university', 'greek-question', 'organizations', 'organization-profile', 'clubs'].includes(currentScreen);

  return (
    <div className="App">
      {showNavigation && (
        <Navigation 
          currentScreen={currentScreen} 
          onNavigate={handleNavigate}
          onLogout={handleLogout}
        />
      )}
      <main className="main-content">
        {renderScreen()}
      </main>
    </div>
  );
}

export default App;
