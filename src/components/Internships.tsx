import React from 'react';
import { Briefcase, Leaf, Code2, Cpu, CheckCircle2, ShieldCheck, Terminal } from 'lucide-react';
import { ThreeDCard } from './ThreeDCard.tsx';

interface InternshipItem {
  name: string;
  badge: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  accent: string;
}

const internships: InternshipItem[] = [
  {
    name: 'CodeAlpha Internship',
    badge: 'Software Development & Engineering',
    icon: Terminal,
    description:
      'Virtual software engineering internship focused on full-stack web development, algorithmic task implementation, and modular application building.',
    accent: 'text-amber-400 border-amber-500/20 bg-amber-500/10',
  },
  {
    name: '1M1B Green Internship',
    badge: 'Sustainability & Green Tech',
    icon: Leaf,
    description:
      'Participated in the 1M1B (1 Million for 1 Billion) Green Internship program focused on environmental sustainability, awareness, and technological solutions for community and green initiatives.',
    accent: 'text-emerald-400 border-emerald-500/20 bg-emerald-500/10',
  },
  {
    name: 'QSpiders / QSkill Internship',
    badge: 'Core Java & Software Testing',
    icon: Cpu,
    description:
      'Hands-on technical internship training at QSpiders / QSkill covering Java fundamentals, object-oriented principles, software engineering methodologies, and practical test workflows.',
    accent: 'text-blue-400 border-blue-500/20 bg-blue-500/10',
  },
  {
    name: 'Tamizhan Skills Internship',
    badge: 'Skill Development & Engineering',
    icon: Code2,
    description:
      'Completed practical technical internship with Tamizhan Skills focused on advancing hands-on development competencies, applied programming concepts, and practical software workflows.',
    accent: 'text-sky-400 border-sky-500/20 bg-sky-500/10',
  },
];

export const Internships: React.FC = () => {
  return (
    <section id="internships" className="py-24 relative bg-slate-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-blue-400 mb-3">
            <Briefcase className="w-3.5 h-3.5 text-blue-400" />
            <span>Practical Experience</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Internships
          </h2>
          <div className="w-12 h-1 bg-blue-600 rounded-full mt-4 mb-4"></div>
          <p className="text-slate-400 text-sm max-w-xl">
            Practical internship training and engineering experiences completed during undergraduate studies.
          </p>
        </div>

        {/* 4 Internship Cards with 3D Depth */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {internships.map((internship, idx) => {
            const IconComponent = internship.icon;
            return (
              <ThreeDCard key={internship.name} depth={10} glowColor="rgba(59, 130, 246, 0.2)">
                <div
                  id={`internship-card-${idx}`}
                  className="group flex flex-col justify-between h-full p-6 sm:p-7 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-blue-500/50 shadow-xl backdrop-blur-sm transition-all duration-300"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-6">
                      <div className={`p-3 rounded-xl border ${internship.accent}`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-mono text-slate-400 bg-slate-950 px-2.5 py-1 rounded-md border border-slate-800">
                        {internship.badge}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors mb-3">
                      {internship.name}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-6">
                      {internship.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                    <span className="inline-flex items-center gap-1.5 text-blue-400 font-mono text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                      Completed
                    </span>
                    <span className="font-mono text-[11px] text-slate-500">Undergraduate Training</span>
                  </div>
                </div>
              </ThreeDCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};
