import { useState } from 'react';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { LandingPage } from './components/LandingPage';
import { SubscribePage } from './components/SubscribePage';
import { ChatbotPage } from './components/ChatbotPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'landing' | 'subscribe' | 'chatbot'>('landing');

  const handleNavigate = (page: string) => {
    setCurrentPage(page as 'landing' | 'subscribe' | 'chatbot');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      {currentPage !== 'chatbot' && (
        <Navigation currentPage={currentPage} onNavigate={handleNavigate} />
      )}
      
      {currentPage === 'landing' && <LandingPage onNavigate={handleNavigate} />}
      {currentPage === 'subscribe' && <SubscribePage onNavigate={handleNavigate} />}
      {currentPage === 'chatbot' && <ChatbotPage onNavigate={handleNavigate} />}
      
      {currentPage !== 'chatbot' && <Footer />}
    </div>
  );
}
