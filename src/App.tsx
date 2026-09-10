import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { About } from './components/About.tsx';
import { Skills } from './components/Skills.tsx';
import { Education } from './components/Education.tsx';
import { Projects } from './components/Projects.tsx';
import { Internships } from './components/Internships.tsx';
import { Achievements } from './components/Achievements.tsx';
import { Languages } from './components/Languages.tsx';
import { Contact } from './components/Contact.tsx';
import { Footer } from './components/Footer.tsx';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const sectionIds = [
      'home',
      'about',
      'skills',
      'education',
      'projects',
      'internships',
      'achievements',
      'languages',
      'contact',
    ];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const element = document.getElementById(id);

        if (element) {
          const top = element.offsetTop;

          if (scrollPosition >= top) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-600/30 selection:text-blue-200 relative">

      {/* Sticky Navbar */}
      <Navbar activeSection={activeSection} />

      {/* Main Sections */}
      <main className="flex-grow relative z-10">
        <Hero />
        <About />
        <Skills />
        <Education />
        <Projects />
        <Internships />
        <Achievements />
        <Languages />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}