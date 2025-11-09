// File: src/components/ChatbotPage.tsx

import { 
  Plus, Send, MessageSquare, FolderOpen, Settings, 
  LogOut, Home, ArrowLeft, Menu, ChevronLeft, ChevronRight
  // Removed unused imports for brevity
} from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import { Avatar } from './ui/avatar';
import { BrieflyLogo } from './BrieflyLogo';
import apiClient from '../services/api'; // <-- Import our API client

// --- Interfaces from your original code ---
interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  sources?: string[];
}
interface Chat {
  id: string;
  title: string;
  lastMessage: string;
}

// --- New Interfaces for User Data ---
interface UserProfile {
  id: number;
  full_name: string;
  email: string;
  is_admin: boolean;
}
interface ChatbotPageProps {
  onNavigate: (page: Page) => void; // Using the Page type from App.tsx
}

// Import the Page type from App.tsx
import type { Page } from '../App';

export function ChatbotPage({ onNavigate }: ChatbotPageProps) {
  // --- States from your original code ---
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello! I'm Briefly, your AI press agent. How can I help you today?",
    }
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // --- New States for Backend Integration ---
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);

  // --- Fetch user profile when the component loads ---
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await apiClient.get<UserProfile>('/users/profile');
        setUser(response.data);
      } catch (error) {
        console.error("Authentication failed, redirecting to login.", error);
        // If the token is invalid or expired, log the user out
        handleLogout();
      } finally {
        setLoadingProfile(false);
      }
    };
    fetchUserProfile();
  }, []);

  // --- Scroll to bottom of messages ---
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    const userMessage: Message = { id: Date.now().toString(), role: 'user', content: inputValue };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // --- TODO: This is where you will call your actual chatbot API ---
    // For now, we'll keep the mock response.
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Fetching information about "${inputValue}"...`,
        sources: ['Reuters', 'BBC News'],
      };
      setMessages(prev => [...prev, assistantMessage]);
    }, 1000);
  };

  const handleNewChat = () => {
    // ... same as your original code
  };

  // --- Implement Logout Functionality ---
  const handleLogout = () => {
    localStorage.removeItem('userToken'); // Clear the token
    onNavigate('login'); // Navigate back to the login page
  };
  
  // --- Previous chats and trending topics (can be fetched from API later) ---
  const previousChats: Chat[] = [ /* ... */ ];

  if (loadingProfile) {
    return <div className="h-screen w-screen flex items-center justify-center">Authenticating...</div>
  }

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      {/* --- Left Sidebar - Desktop --- */}
      <div className={`hidden md:flex flex-col bg-slate-900 text-white transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-0'}`}>
        <div className="p-4 space-y-4 flex-1 flex flex-col">
            {/* ... Sidebar content ... */}
            <div className="text-sm text-slate-400 truncate" title={user?.email || ''}>
                Logged in as {user?.full_name}
            </div>
            <Separator className="bg-slate-700" />
            <div className="space-y-1">
                <button 
                  onClick={() => onNavigate('landing')}
                  className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-slate-800 transition-colors text-slate-300 hover:text-white"
                >
                  <Home size={18} />
                  <span className="text-sm">Back to Home</span>
                </button>
                {/* --- Add Logout Button functionality --- */}
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-slate-800 transition-colors text-red-400 hover:text-red-300"
                >
                  <LogOut size={18} />
                  <span className="text-sm">Log Out</span>
                </button>
            </div>
        </div>
      </div>
      
      {/* ... The rest of your impressive Chatbot UI JSX ... */}
      {/* Just make sure to handle mobile logout as well if needed */}
    </div>
  );
}