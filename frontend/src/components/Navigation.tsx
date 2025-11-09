// File: src/components/Navigation.tsx

import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import { BrieflyLogo } from './BrieflyLogo';
import { type Page } from '../App'; // <-- 1. IMPORT THE 'Page' TYPE

// 2. UPDATE THE PROPS INTERFACE
interface NavigationProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // This structure is fine because 'landing' is a valid 'Page' type.
  const navLinks = [
    { label: 'Home', page: 'landing' },
    { label: 'About', page: 'landing', scrollTo: 'about' },
    { label: 'Sources', page: 'landing', scrollTo: 'sources' },
    { label: 'Contact', page: 'landing', scrollTo: 'contact' },
  ];

  // 3. (BEST PRACTICE) UPDATE THE INTERNAL HANDLER'S TYPE
  const handleNavClick = (page: Page, scrollTo?: string) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    
    if (scrollTo) {
      setTimeout(() => {
        const element = document.getElementById(scrollTo);
        element?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <button 
            onClick={() => onNavigate('landing')}
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
          >
            <BrieflyLogo size="sm" />
            <span className="text-slate-900">Briefly</span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.page as Page, link.scrollTo)} // 'as Page' ensures type safety
                className="text-slate-600 hover:text-blue-600 transition-colors"
              >
                {link.label}
              </button>
            ))}
            <Button 
              onClick={() => onNavigate('subscribe')}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Subscribe
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-slate-100"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.page as Page, link.scrollTo)} // 'as Page' ensures type safety
                className="block w-full text-left px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-blue-600 transition-colors"
              >
                {link.label}
              </button>
            ))}
            <Button 
              onClick={() => {
                onNavigate('subscribe');
                setMobileMenuOpen(false);
              }}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Subscribe
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}