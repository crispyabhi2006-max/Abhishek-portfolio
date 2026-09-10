import React from 'react';
import { Github, Linkedin, Mail, ArrowUp, Heart, Code2 } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-900 pt-16 pb-12 relative text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-12 border-b border-slate-900">
          {/* Identity */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-mono font-bold text-xs">
                AS
              </div>
              <h3 className="text-xl font-extrabold text-white tracking-tight">Abhishek S</h3>
            </div>
            <p className="text-sm font-medium text-blue-400 mb-1">
              Full Stack Developer | Java Developer
            </p>
            <p className="text-xs text-slate-500 font-mono">
              Easwari Engineering College • CSE-A (Second Year)
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/crispyabhi2006-max"
              target="_blank"
              rel="noopener noreferrer"
              id="footer-github-link"
              aria-label="GitHub Profile"
              className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-blue-500/40 hover:bg-slate-800 transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/abhishek-s-642484381/"
              target="_blank"
              rel="noopener noreferrer"
              id="footer-linkedin-link"
              aria-label="LinkedIn Profile"
              className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-blue-400 hover:border-blue-500/40 hover:bg-slate-800 transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="mailto:crispyabhi2006@gmail.com"
              id="footer-email-link"
              aria-label="Send Email"
              className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-blue-400 hover:border-blue-500/40 hover:bg-slate-800 transition-colors"
            >
              <Mail className="w-5 h-5" />
            </a>
            <button
              onClick={scrollToTop}
              id="footer-scroll-top-btn"
              aria-label="Scroll to top"
              className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ml-2"
            >
              <ArrowUp className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Copyright notice */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 text-center sm:text-left">
          <p>© 2026 Abhishek S. All rights reserved.</p>
          <p className="flex items-center gap-1.5 font-mono">
            <span>Portfolio & Engineering Showcase • Easwari Engineering College</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
