import React, { useState } from 'react';
import {
  ArrowDown,
  Mail,
  Download,
  Github,
  Linkedin,
  Terminal,
  ShieldCheck,
  Loader2,
  Sparkles,
  Award,
} from 'lucide-react';
import { ResumeModal } from './ResumeModal.tsx';
import { ThreeDCard } from './ThreeDCard.tsx';

export const Hero: React.FC = () => {
  const [resumeChecking, setResumeChecking] = useState(false);
  const [showResumeModal, setShowResumeModal] = useState(false);

  const scrollToSection = (selector: string) => {
    const el = document.querySelector(selector);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDownloadResume = async (e: React.MouseEvent) => {
    e.preventDefault();
    setResumeChecking(true);

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
        // Direct download fallback route from server
        window.location.href = '/api/resume/download';
      }
    } catch {
      window.location.href = '/api/resume/download';
    } finally {
      setResumeChecking(false);
    }
  };

  return (
    <>
      <section
        id="home"
        className="relative min-h-[92vh] pt-32 pb-20 flex items-center justify-center overflow-hidden bg-transparent"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Introductions & CTAs */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              {/* Institution and status */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs font-mono text-slate-300 mb-6 shadow-sm backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Easwari Engineering College • B.E. CSE-A (Second Year)</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15] mb-4">
                Abhishek S
              </h1>

              {/* Subtitle */}
              <h2 className="text-xl sm:text-2xl font-semibold text-blue-400 mb-6 flex items-center gap-2">
                <span className="font-mono text-slate-500">&gt;</span>
                Full Stack Software Developer & Java Engineer
              </h2>

              {/* Professional introduction */}
              <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed mb-8">
                Computer Science and Engineering undergraduate focused on scalable full-stack web
                platforms, robust Java microservices, algorithmic problem solving, and modern distributed systems.
              </p>

              {/* Core Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 mb-10 w-full sm:w-auto">
                <button
                  onClick={() => scrollToSection('#projects')}
                  id="hero-view-projects-btn"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                >
                  <span>VIEW MY PROJECTS</span>
                  <ArrowDown className="w-4 h-4" />
                </button>

                <button
                  onClick={() => scrollToSection('#contact')}
                  id="hero-contact-me-btn"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer backdrop-blur-md"
                >
                  <Mail className="w-4 h-4 text-blue-400" />
                  <span>CONTACT ME</span>
                </button>

                <button
                  onClick={handleDownloadResume}
                  disabled={resumeChecking}
                  id="hero-download-resume-btn"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm bg-slate-900/90 hover:bg-slate-800 text-blue-400 hover:text-blue-300 border border-blue-500/40 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer disabled:opacity-60 backdrop-blur-md"
                >
                  {resumeChecking ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-blue-400" />
                      <span>DOWNLOADING...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4 text-blue-400" />
                      <span>DOWNLOAD RESUME</span>
                    </>
                  )}
                </button>
              </div>

              {/* Direct Links */}
              <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-slate-800/80 text-sm text-slate-400">
                <a
                  href="https://github.com/crispyabhi2006-max"
                  target="_blank"
                  rel="noopener noreferrer"
                  id="hero-github-link"
                  className="inline-flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Github className="w-4 h-4 text-slate-300" />
                  <span className="font-mono text-xs">crispyabhi2006-max</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/abhishek-s-642484381/"
                  target="_blank"
                  rel="noopener noreferrer"
                  id="hero-linkedin-link"
                  className="inline-flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Linkedin className="w-4 h-4 text-blue-400" />
                  <span className="font-mono text-xs">LinkedIn</span>
                </a>
                <a
                  href="mailto:crispyabhi2006@gmail.com"
                  id="hero-email-link"
                  className="inline-flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4 text-blue-400" />
                  <span className="font-mono text-xs">crispyabhi2006@gmail.com</span>
                </a>
              </div>
            </div>

            {/* Right Column: 3D Perspective Permanent Portrait Showcase */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <div className="w-full max-w-md">
                <ThreeDCard depth={14} glowColor="rgba(59, 130, 246, 0.25)">
                  <div className="relative p-3 sm:p-4 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl backdrop-blur-xl group">
                    {/* Glowing Accent Corner Brackets */}
                    <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-blue-500 pointer-events-none rounded-tl-sm"></div>
                    <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-blue-500 pointer-events-none rounded-tr-sm"></div>
                    <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-blue-500 pointer-events-none rounded-bl-sm"></div>
                    <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-blue-500 pointer-events-none rounded-br-sm"></div>

                    {/* Subtle Background 3D Radial Glow */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 via-sky-500/10 to-blue-700/20 rounded-3xl blur-xl -z-10 group-hover:opacity-100 opacity-60 transition-opacity"></div>

                    {/* Permanent Profile Image */}
                    <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800/80 shadow-inner">
                      <img
                        src="/frontend/assets/profile.jpg"
                        onError={(e) => {
                          const target = e.currentTarget as HTMLImageElement;
                          if (target.src.indexOf('/assets/profile.jpg') === -1) {
                            target.src = '/assets/profile.jpg';
                          }
                        }}
                        alt="Abhishek S - Full Stack & Java Developer"
                        id="hero-permanent-profile-image"
                        className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      />

                      {/* Top Overlay Badge */}
                      <div className="absolute top-3 left-3 bg-slate-950/85 backdrop-blur-md px-3 py-1 rounded-full border border-slate-800 text-[11px] font-mono text-slate-200 flex items-center gap-1.5 shadow-lg">
                        <Award className="w-3.5 h-3.5 text-blue-400" />
                        <span>Abhishek S • CSE-A</span>
                      </div>

                      {/* Bottom Verified Engineer Badge */}
                      <div className="absolute bottom-3 right-3 bg-slate-950/90 backdrop-blur-md px-3 py-1 rounded-full border border-slate-800 text-[11px] font-mono text-emerald-400 flex items-center gap-1.5 shadow-lg">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Verified Engineer</span>
                      </div>
                    </div>

                    {/* Bottom Technical Specifications Card */}
                    <div className="mt-4 pt-3.5 px-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                      <div className="flex items-center gap-2">
                        <Terminal className="w-3.5 h-3.5 text-blue-400" />
                        <span className="font-mono text-slate-300">Java • Python • MERN</span>
                      </div>
                      <div className="flex items-center gap-1.5 font-mono text-[11px] text-emerald-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span>Ready For Internships</span>
                      </div>
                    </div>
                  </div>
                </ThreeDCard>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resume Modal */}
      <ResumeModal isOpen={showResumeModal} onClose={() => setShowResumeModal(false)} />
    </>
  );
};
