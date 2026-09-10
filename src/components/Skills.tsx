import React from 'react';
import {
  Code,
  Layout,
  Server,
  Database,
  Cpu,
  Wrench,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { TechGraph3D } from './TechGraph3D.tsx';
import { ThreeDCard } from './ThreeDCard.tsx';
import { ErrorBoundary } from './ErrorBoundary.tsx';

interface SkillCategoryItem {
  id: string;
  category: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  skills: string[];
  gradient: string;
}

const skillCategories: SkillCategoryItem[] = [
  {
    id: 'programming',
    category: 'Programming',
    subtitle: 'Core Languages',
    icon: Code,
    skills: ['Java', 'Python', 'JavaScript'],
    gradient: 'from-blue-500/10 to-indigo-500/10 border-blue-500/20 text-blue-400',
  },
  {
    id: 'frontend',
    category: 'Frontend',
    subtitle: 'UI & Web Interfaces',
    icon: Layout,
    skills: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Web Design'],
    gradient: 'from-indigo-500/10 to-purple-500/10 border-indigo-500/20 text-indigo-400',
  },
  {
    id: 'backend',
    category: 'Backend',
    subtitle: 'Server & API Architecture',
    icon: Server,
    skills: ['Node.js', 'Express.js', 'REST APIs'],
    gradient: 'from-emerald-500/10 to-teal-500/10 border-emerald-500/20 text-emerald-400',
  },
  {
    id: 'database',
    category: 'Database',
    subtitle: 'Data Persistence & Queries',
    icon: Database,
    skills: ['MongoDB', 'SQL', 'Database Management'],
    gradient: 'from-amber-500/10 to-orange-500/10 border-amber-500/20 text-amber-400',
  },
  {
    id: 'cs-foundations',
    category: 'Computer Science',
    subtitle: 'Foundational Knowledge',
    icon: Cpu,
    skills: [
      'Data Structures and Algorithms',
      'Object-Oriented Programming',
      'Problem Solving',
    ],
    gradient: 'from-cyan-500/10 to-blue-500/10 border-cyan-500/20 text-cyan-400',
  },
  {
    id: 'tools',
    category: 'Tools & Workflow',
    subtitle: 'Development Environment',
    icon: Wrench,
    skills: ['Git', 'GitHub', 'VS Code'],
    gradient: 'from-rose-500/10 to-pink-500/10 border-rose-500/20 text-rose-400',
  },
];

const additionalCompetencies = [
  'Frontend Development',
  'Backend Development',
  'Full Stack Development',
  'Data Analysis',
  'AI/ML Fundamentals',
];

export const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-24 relative bg-slate-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-blue-400 mb-3">
            <Code className="w-3.5 h-3.5 text-blue-400" />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Technical Skills
          </h2>
          <div className="w-12 h-1 bg-blue-600 rounded-full mt-4 mb-4"></div>
          <p className="text-slate-400 text-sm max-w-xl">
            Structured proficiencies acquired through academic coursework, software engineering projects, and algorithmic problem solving.
          </p>
        </div>

        {/* Categorized Skills Grid with 3D Tilt */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {skillCategories.map((cat) => {
            const IconComponent = cat.icon;
            return (
              <ThreeDCard key={cat.id} depth={8} glowColor="rgba(59, 130, 246, 0.2)">
                <div
                  id={`skill-card-${cat.id}`}
                  className="group h-full p-6 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-blue-500/50 transition-all duration-300 shadow-xl backdrop-blur-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex items-center gap-3">
                        <div className={`p-2.5 rounded-xl border bg-gradient-to-br ${cat.gradient}`}>
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors">
                            {cat.category}
                          </h3>
                          <span className="text-xs text-slate-400 font-mono">{cat.subtitle}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-2">
                      {cat.skills.map((skill) => (
                        <span
                          key={skill}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-950/80 text-slate-200 border border-slate-800 group-hover:border-slate-700 transition-colors"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                          <span>{skill}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </ThreeDCard>
            );
          })}
        </div>

        {/* Additional Competencies Banner */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="p-2.5 rounded-xl bg-blue-600/10 text-blue-400 border border-blue-500/20 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Applied Technical Domains</h4>
              <p className="text-xs text-slate-400">Integrated across software and academic projects</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 justify-center sm:justify-end">
            {additionalCompetencies.map((comp) => (
              <span
                key={comp}
                className="px-3 py-1 rounded-lg text-xs font-semibold bg-slate-950 text-slate-300 border border-slate-800 shadow-sm"
              >
                {comp}
              </span>
            ))}
          </div>
        </div>

        {/* 3D Interactive Technology Matrix & Orbit */}
        <ErrorBoundary fallback={null}>
          <TechGraph3D />
        </ErrorBoundary>
      </div>
    </section>
  );
};
