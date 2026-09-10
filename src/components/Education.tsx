import React from 'react';
import { GraduationCap, Building2, Calendar, BookOpen, Award, CheckCircle } from 'lucide-react';
import { ThreeDCard } from './ThreeDCard.tsx';

export const Education: React.FC = () => {
  return (
    <section id="education" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-blue-400 mb-3">
            <GraduationCap className="w-3.5 h-3.5 text-blue-400" />
            <span>Academic Background</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Education
          </h2>
          <div className="w-12 h-1 bg-blue-600 rounded-full mt-4"></div>
        </div>

        {/* Education Timeline Card */}
        <div className="max-w-3xl mx-auto">
          <div className="relative pl-8 sm:pl-10 border-l-2 border-blue-600/40 space-y-12">
            {/* Timeline node icon */}
            <div className="absolute -left-[17px] top-1 w-8 h-8 rounded-full bg-blue-600 border-4 border-slate-950 flex items-center justify-center text-white shadow-md shadow-blue-600/30">
              <GraduationCap className="w-4 h-4" />
            </div>

            {/* Main Card with 3D Tilt */}
            <ThreeDCard depth={8} glowColor="rgba(59, 130, 246, 0.2)">
              <div className="p-8 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl relative group hover:border-blue-500/50 backdrop-blur-sm transition-all duration-300">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-4 border-b border-slate-800">
                  <div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold bg-blue-950/80 text-blue-300 border border-blue-800/50 mb-2">
                      Current Degree
                    </span>
                    <h3 className="text-2xl font-bold text-white tracking-tight">
                      B.E. Computer Science and Engineering
                    </h3>
                  </div>
                  <div className="sm:text-right">
                    <span className="text-xs font-mono text-blue-400 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 inline-block">
                      Second Year (Undergraduate)
                    </span>
                  </div>
                </div>

                {/* Institution and Department */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
                    <Building2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
                    <div>
                      <span className="text-xs text-slate-500 font-mono block">Institution</span>
                      <span className="text-sm font-semibold text-slate-100">
                        Easwari Engineering College
                      </span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
                    <BookOpen className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
                    <div>
                      <span className="text-xs text-slate-400 font-mono block">Department & Section</span>
                      <span className="text-sm font-semibold text-slate-100">
                        CSE-A
                      </span>
                    </div>
                  </div>
                </div>

                {/* Coursework Focus */}
                <div className="mt-6 pt-4 border-t border-slate-800/80">
                  <span className="text-xs font-mono text-slate-400 block mb-2.5">
                    Key Curriculum Focus Areas:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'Data Structures & Algorithms',
                      'Object-Oriented Programming (Java)',
                      'Database Management Systems',
                      'Web Development Fundamentals',
                      'Software Engineering Principles',
                    ].map((subject) => (
                      <span
                        key={subject}
                        className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-800/60 text-slate-300 border border-slate-700/50"
                      >
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </ThreeDCard>
          </div>
        </div>
      </div>
    </section>
  );
};
