
     // File: src/App.tsx

import { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { LandingPage } from './components/LandingPage';
import { SubscribePage } from './components/SubscribePage';
import { ChatbotPage } from './components/ChatbotPage';
import { LoginPage } from './components/LoginPage';

// Define a type for all possible pages for better type safety
export type Page = 'landing' | 'subscribe' | 'login' | 'chatbot';

export default function App() {
  // Use our new Page type for state
  const [currentPage, setCurrentPage] = useState<Page>('landing');

  // This effect checks if the user is already logged in when the app loads
  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (token) {
      // If a token exists, send the user directly to the chatbot
      setCurrentPage('chatbot');
    }
  }, []); // The empty array ensures this runs only once on component mount

  const handleNavigate = (page: Page) => {
    console.log('App.tsx: handleNavigate called with page:', page); // <-- ADD THIS LINE
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

  const renderContent = () => {
    switch (currentPage) {
      case 'subscribe':
        return <SubscribePage onNavigate={handleNavigate} onGoToLogin={() => handleNavigate('login')} />;
      case 'login':
        return <LoginPage onNavigate={handleNavigate} />;
      case 'chatbot':
        // The ChatbotPage will handle its own logout navigation
        return <ChatbotPage onNavigate={handleNavigate} />;
      case 'landing':
      default:
        return <LandingPage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {currentPage !== 'chatbot' && (
        <Navigation currentPage={currentPage} onNavigate={handleNavigate} />
      )}
      
      <main>
        {renderContent()}
      </main>
      
      {currentPage !== 'chatbot' && <Footer />}
    </div>
  );
}