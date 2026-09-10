import React from 'react';
import {
  User,
  Target,
  GraduationCap,
  Briefcase,
  BookOpen,
  Calendar,
  Building,
  CheckCircle2,
} from 'lucide-react';
import { ThreeDCard } from './ThreeDCard.tsx';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-blue-400 mb-3">
            <User className="w-3.5 h-3.5 text-blue-400" />
            <span>Profile Overview</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            About Me
          </h2>
          <div className="w-12 h-1 bg-blue-600 rounded-full mt-4"></div>
        </div>

        {/* Content Layout with 3D Depth */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Main Biography Card */}
          <div className="lg:col-span-7">
            <ThreeDCard depth={8} glowColor="rgba(59, 130, 246, 0.2)">
              <div className="h-full flex flex-col justify-between p-8 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl backdrop-blur-sm hover:border-blue-500/50 transition-all duration-300">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2.5 rounded-xl bg-blue-600/10 text-blue-400 border border-blue-500/20">
                      <User className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-bold text-white">Professional Profile</h3>
                  </div>
                  <p className="text-slate-300 leading-relaxed text-base mb-8">
                    &quot;I am Abhishek S, a Computer Science and Engineering student at Easwari
                    Engineering College with a strong focus in Full Stack and Java development. I
                    specialize in engineering practical software solutions, solving complex algorithmic
                    problems, and designing distributed web architectures. With hands-on experience across
                    responsive frontends, robust backend microservices, and databases, my goal is
                    to build scalable, resilient, and mission-critical software systems.&quot;
                  </p>
                </div>

                {/* Career Objective Sub-section */}
                <div className="pt-6 border-t border-slate-800">
                  <div className="flex items-center gap-2.5 mb-3">
                    <Target className="w-4 h-4 text-blue-400" />
                    <h4 className="text-base font-semibold text-slate-200">Career Objective</h4>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed italic bg-slate-950/80 p-4 rounded-xl border border-slate-800">
                    &quot;Motivated and enthusiastic Computer Science and Engineering student with a
                    strong foundation in Java, Python, SQL, HTML, CSS, and JavaScript. Passionate about
                    software development, problem-solving, and emerging technologies. Seeking
                    opportunities to apply technical skills, contribute to innovative projects, and gain
                    practical industry experience while continuously enhancing professional growth.&quot;
                  </p>
                </div>
              </div>
            </ThreeDCard>
          </div>

          {/* Academic & Professional Credentials Card */}
          <div className="lg:col-span-5">
            <ThreeDCard depth={8} glowColor="rgba(59, 130, 246, 0.2)">
              <div className="h-full p-8 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl backdrop-blur-sm hover:border-blue-500/50 transition-all duration-300 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2.5">
                    <Building className="w-5 h-5 text-blue-400" />
                    Academic & Role Information
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
                      <GraduationCap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
                      <div>
                        <span className="text-xs text-slate-500 font-mono block">Institution</span>
                        <span className="text-sm font-semibold text-white">
                          Easwari Engineering College
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
                      <BookOpen className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
                      <div>
                        <span className="text-xs text-slate-500 font-mono block">Degree & Major</span>
                        <span className="text-sm font-semibold text-white">
                          B.E. Computer Science and Engineering
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
                        <span className="text-xs text-slate-500 font-mono block mb-1">Department</span>
                        <span className="text-sm font-semibold text-slate-200">CSE-A</span>
                      </div>
                      <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
                        <span className="text-xs text-slate-500 font-mono block mb-1">Current Year</span>
                        <span className="text-sm font-semibold text-blue-400">Second Year</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800">
                  <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
                    <div className="flex items-center gap-2 mb-1.5">
                      <Briefcase className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs text-slate-500 font-mono">Professional Roles</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="px-3 py-1 rounded-lg text-xs font-semibold bg-blue-950/80 text-blue-300 border border-blue-800/60">
                        Full Stack Developer
                      </span>
                      <span className="px-3 py-1 rounded-lg text-xs font-semibold bg-slate-800 text-slate-200 border border-slate-700">
                        Java Developer
                      </span>
                    </div>
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
