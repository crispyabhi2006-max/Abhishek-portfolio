import React, { useState, useEffect } from 'react';
import { Menu, X, Download, Loader2 } from 'lucide-react';
import { ResumeModal } from './ResumeModal.tsx';

interface NavbarProps {
  activeSection: string;
}

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Education', href: '#education' },
  { label: 'Projects', href: '#projects' },
  { label: 'Internships', href: '#internships' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Languages', href: '#languages' },
  { label: 'Contact', href: '#contact' },
];

export const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [resumeLoading, setResumeLoading] = useState(false);
  const [showResumeModal, setShowResumeModal] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDownloadResume = async (e: React.MouseEvent) => {
    e.preventDefault();
    setResumeLoading(true);

    try {
      const res = await fetch('/frontend/assets/Abhishek_S_Resume.pdf', { method: 'HEAD' });
      if (res.ok) {
        const a = document.createElement('a');
        a.href = '/frontend/assets/Abhishek_S_Resume.pdf';
        a.download = 'Abhishek_S_Resume.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } else {
        setShowResumeModal(true);
      }
    } catch {
      setShowResumeModal(true);
    } finally {
      setResumeLoading(false);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-slate-950/90 backdrop-blur-md border-b border-slate-800 shadow-lg py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo / Monogram */}
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#home');
              }}
              className="flex items-center gap-2.5 group cursor-pointer"
            >
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-mono font-bold text-sm shadow-md shadow-blue-600/25 group-hover:scale-105 transition-transform">
                AS
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-white text-base tracking-tight group-hover:text-blue-400 transition-colors">
                  Abhishek S
                </span>
                <span className="text-[10px] font-mono text-blue-400">
                  Full Stack • Java
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 bg-slate-900 px-3 py-1.5 rounded-full border border-slate-800 backdrop-blur-md shadow-inner">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.replace('#', '');
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }}
                    id={`nav-link-${item.label.toLowerCase()}`}
                    className={`px-3.5 py-1.5 text-xs font-medium rounded-full transition-all duration-200 cursor-pointer whitespace-nowrap ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-sm font-semibold'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
            </nav>

            {/* Right Action: Resume & Mobile Hamburger */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleDownloadResume}
                disabled={resumeLoading}
                id="nav-download-resume-btn"
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-sm shadow-blue-600/20 transition-all duration-200 cursor-pointer active:scale-95 disabled:opacity-60"
              >
                {resumeLoading ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Download className="w-3.5 h-3.5" />
                )}
                <span>Resume</span>
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                id="mobile-menu-toggle-btn"
                aria-label="Toggle navigation menu"
                className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 border border-slate-800 transition-colors"
              >
                {mobileMenuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <div
            id="mobile-nav-drawer"
            className="lg:hidden fixed inset-x-0 top-[65px] bg-slate-950/95 backdrop-blur-xl border-b border-slate-800 px-6 py-6 shadow-2xl transition-all animate-in slide-in-from-top-4 duration-200"
          >
            <div className="flex flex-col space-y-1">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.replace('#', '');
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }}
                    className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-blue-600 text-white font-semibold'
                        : 'text-slate-300 hover:text-white hover:bg-slate-900'
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}

              <div className="pt-4 mt-2 border-t border-slate-800">
                <button
                  onClick={(e) => {
                    setMobileMenuOpen(false);
                    handleDownloadResume(e);
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold bg-blue-600 text-white hover:bg-blue-500 shadow-md shadow-blue-600/30"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Resume (PDF)</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Resume Modal */}
      <ResumeModal isOpen={showResumeModal} onClose={() => setShowResumeModal(false)} />
    </>
  );
};
