import { 
  Plus, Send, MessageSquare, FolderOpen, Settings, 
  Share2, LogOut, DoorOpen, ExternalLink, ChevronLeft, 
  ChevronRight, TrendingUp, Menu, Home, ArrowLeft
} from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import { Avatar } from './ui/avatar';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { BrieflyLogo } from './BrieflyLogo';

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

interface ChatbotPageProps {
  onNavigate: (page: string) => void;
}

export function ChatbotPage({ onNavigate }: ChatbotPageProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m Briefly, your AI press agent. I can summarize the latest news, answer questions about current events, or brief you on specific topics. What would you like to know?',
    }
  ]);
  const [showSources, setShowSources] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const previousChats: Chat[] = [
    { id: '1', title: 'Morning Brief', lastMessage: 'Latest tech news' },
    { id: '2', title: 'Tech Digest', lastMessage: 'AI developments' },
    { id: '3', title: 'World News', lastMessage: 'Global updates' },
    { id: '4', title: 'Business Brief', lastMessage: 'Market analysis' },
    { id: '5', title: 'Science Updates', lastMessage: 'New discoveries' },
  ];

  const trendingTopics = [
    'AI & Technology',
    'Climate Change',
    'Global Economy',
    'Space Exploration',
    'Healthcare Innovation',
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Here's a summary based on your query about "${inputValue}": Recent developments show significant progress in this area. Multiple trusted sources have reported on this topic, with key highlights including important updates and expert analysis. This information has been verified across major news outlets including Reuters, BBC, and The Guardian.`,
        sources: ['Reuters', 'BBC News', 'The Guardian'],
      };
      setMessages(prev => [...prev, assistantMessage]);
    }, 1000);
  };

  const handleNewChat = () => {
    setMessages([
      {
        id: '1',
        role: 'assistant',
        content: 'Hello! I\'m Briefly, your AI press agent. I can summarize the latest news, answer questions about current events, or brief you on specific topics. What would you like to know?',
      }
    ]);
  };

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      {/* Left Sidebar - Desktop */}
      <div className={`hidden md:flex flex-col bg-slate-900 text-white transition-all duration-300 ${
        sidebarOpen ? 'w-64' : 'w-0'
      } overflow-hidden`}>
        <div className="p-4 space-y-4 flex-1 flex flex-col">
          {/* Logo */}
          <div className="flex items-center space-x-2 mb-4">
            <BrieflyLogo size="sm" />
            <span className="text-white">Briefly</span>
          </div>

          {/* New Chat Button */}
          <Button 
            onClick={handleNewChat}
            className="w-full bg-blue-600 hover:bg-blue-700 justify-start"
          >
            <Plus size={18} className="mr-2" />
            New Chat
          </Button>

          {/* Previous Chats */}
          <div className="flex-1 overflow-hidden flex flex-col">
            <div className="text-slate-400 text-sm mb-2">Recent</div>
            <ScrollArea className="flex-1">
              <div className="space-y-1">
                {previousChats.map((chat) => (
                  <button
                    key={chat.id}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-800 transition-colors group"
                  >
                    <div className="flex items-center space-x-2">
                      <MessageSquare size={16} className="text-slate-400 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm text-white truncate">{chat.title}</div>
                        <div className="text-xs text-slate-400 truncate">{chat.lastMessage}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </ScrollArea>
          </div>

          <Separator className="bg-slate-700" />

          {/* Bottom Navigation */}
          <div className="space-y-1">
            <button 
              onClick={() => onNavigate('landing')}
              className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-slate-800 transition-colors text-slate-300 hover:text-white"
            >
              <Home size={18} />
              <span className="text-sm">Back to Home</span>
            </button>
            <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-slate-800 transition-colors text-slate-300">
              <FolderOpen size={18} />
              <span className="text-sm">Library</span>
            </button>
            <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-slate-800 transition-colors text-slate-300">
              <Settings size={18} />
              <span className="text-sm">Settings</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {mobileSidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black bg-opacity-50" onClick={() => setMobileSidebarOpen(false)}>
          <div className="w-64 h-full bg-slate-900 text-white" onClick={(e) => e.stopPropagation()}>
            <div className="p-4 space-y-4 flex flex-col h-full">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <BrieflyLogo size="sm" />
                  <span className="text-white">Briefly</span>
                </div>
                <button onClick={() => setMobileSidebarOpen(false)} className="text-slate-400 hover:text-white">
                  <ChevronLeft size={24} />
                </button>
              </div>

              <Button 
                onClick={() => {
                  handleNewChat();
                  setMobileSidebarOpen(false);
                }}
                className="w-full bg-blue-600 hover:bg-blue-700 justify-start"
              >
                <Plus size={18} className="mr-2" />
                New Chat
              </Button>

              <div className="flex-1 overflow-hidden">
                <div className="text-slate-400 text-sm mb-2">Recent</div>
                <ScrollArea className="h-full">
                  <div className="space-y-1">
                    {previousChats.map((chat) => (
                      <button
                        key={chat.id}
                        className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-800 transition-colors"
                      >
                        <div className="flex items-center space-x-2">
                          <MessageSquare size={16} className="text-slate-400" />
                          <div>
                            <div className="text-sm text-white">{chat.title}</div>
                            <div className="text-xs text-slate-400">{chat.lastMessage}</div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </ScrollArea>
              </div>

              <Separator className="bg-slate-700" />

              {/* Mobile Bottom Navigation */}
              <div className="space-y-1">
                <button 
                  onClick={() => {
                    onNavigate('landing');
                    setMobileSidebarOpen(false);
                  }}
                  className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-slate-800 transition-colors text-slate-300 hover:text-white"
                >
                  <Home size={18} />
                  <span className="text-sm">Back to Home</span>
                </button>
                <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-slate-800 transition-colors text-slate-300">
                  <FolderOpen size={18} />
                  <span className="text-sm">Library</span>
                </button>
                <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-slate-800 transition-colors text-slate-300">
                  <Settings size={18} />
                  <span className="text-sm">Settings</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="h-16 border-b border-slate-200 flex items-center justify-between px-4">
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setMobileSidebarOpen(true)}
              className="md:hidden p-2 hover:bg-slate-100 rounded-lg"
            >
              <Menu size={20} />
            </button>
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="hidden md:block p-2 hover:bg-slate-100 rounded-lg"
            >
              {sidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
            </button>
            <span className="text-slate-900">New Chat</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onNavigate('landing')}
              className="border-slate-300"
            >
              <ArrowLeft size={16} className="mr-2" />
              <span className="hidden sm:inline">Back to Home</span>
              <span className="sm:hidden">Home</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowSources(!showSources)}
              className="border-slate-300"
            >
              <ExternalLink size={16} className="mr-2" />
              <span className="hidden sm:inline">Sources</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setRightSidebarOpen(!rightSidebarOpen)}
              className="border-slate-300 hidden lg:flex"
            >
              {rightSidebarOpen ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            </Button>
          </div>
        </div>

        {/* Messages Area */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto px-4 py-8"
        >
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex space-x-3 max-w-[80%] ${message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <Avatar className={`w-8 h-8 flex-shrink-0 ${message.role === 'assistant' ? 'bg-blue-600' : 'bg-slate-700'}`}>
                    <div className="w-full h-full flex items-center justify-center text-white text-sm">
                      {message.role === 'assistant' ? 'B' : 'U'}
                    </div>
                  </Avatar>
                  <div className="space-y-2">
                    <div className={`rounded-2xl px-4 py-3 ${
                      message.role === 'user' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-slate-100 text-slate-900'
                    }`}>
                      {message.content}
                    </div>
                    {message.sources && showSources && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {message.sources.map((source, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs border-blue-200 text-blue-700 bg-blue-50">
                            {source}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Input Area */}
        <div className="border-t border-slate-200 p-4 bg-white">
          <div className="max-w-3xl mx-auto">
            <div className="flex space-x-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask about the latest news..."
                className="flex-1 border-slate-300"
              />
              <Button 
                onClick={handleSendMessage}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Send size={18} />
              </Button>
            </div>
            <p className="text-xs text-slate-400 mt-2 text-center">
              Briefly may make mistakes. Verify important information with original sources.
            </p>
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className={`hidden lg:flex flex-col bg-slate-50 border-l border-slate-200 transition-all duration-300 ${
        rightSidebarOpen ? 'w-64' : 'w-0'
      } overflow-hidden`}>
        <div className="p-4 space-y-6">
          <div>
            <h3 className="text-slate-900 mb-3">Actions</h3>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start border-slate-300">
                <Share2 size={16} className="mr-2" />
                Share
              </Button>
              <Button variant="outline" className="w-full justify-start border-slate-300">
                <DoorOpen size={16} className="mr-2" />
                Leave Chat
              </Button>
              <Button variant="outline" className="w-full justify-start border-slate-300 text-red-600 hover:text-red-700">
                <LogOut size={16} className="mr-2" />
                Disconnect
              </Button>
            </div>
          </div>

          <Separator className="bg-slate-200" />

          <div>
            <div className="flex items-center space-x-2 mb-3">
              <TrendingUp size={16} className="text-slate-600" />
              <h3 className="text-slate-900">Trending Topics</h3>
            </div>
            <div className="space-y-2">
              {trendingTopics.map((topic, idx) => (
                <Card 
                  key={idx}
                  className="p-3 border-slate-200 hover:shadow-md hover:border-blue-300 transition-all cursor-pointer"
                >
                  <div className="text-sm text-slate-700">{topic}</div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
