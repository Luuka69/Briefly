import { Twitter, Linkedin, Github, Mail } from 'lucide-react';
import { BrieflyLogo } from './BrieflyLogo';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          {/* Logo and Copyright */}
          <div className="flex items-center space-x-3">
            <BrieflyLogo size="sm" />
            <div>
              <div className="text-slate-200">Briefly</div>
              <div className="text-slate-400 text-sm">© {currentYear} All rights reserved</div>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex items-center space-x-6">
            <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
              <Twitter size={20} />
            </a>
            <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
              <Linkedin size={20} />
            </a>
            <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
              <Github size={20} />
            </a>
            <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
