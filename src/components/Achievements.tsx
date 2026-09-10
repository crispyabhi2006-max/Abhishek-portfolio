import React from 'react';
import { Award, Code2, Trophy, Rocket, TrendingUp, CheckCircle } from 'lucide-react';
import { ThreeDCard } from './ThreeDCard.tsx';

interface AchievementItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
}

const achievementsList: AchievementItem[] = [
  {
    id: 'leetcode',
    title: 'Active LeetCode Problem Solver',
    subtitle: 'Data Structures & Algorithms',
    description:
      'Consistently practicing algorithmic problem solving on LeetCode with a focus on arrays, strings, dynamic programming, and object-oriented solutions in Java.',
    icon: Code2,
    accentColor: 'text-amber-400 border-amber-500/30 bg-amber-500/10',
  },
  {
    id: 'coding-challenges',
    title: 'Participated in Coding Challenges',
    subtitle: 'Competitive Programming',
    description:
      'Actively participated in collegiate and platform coding challenges, strengthening analytical thinking, time-complexity analysis, and edge-case testing.',
    icon: Trophy,
    accentColor: 'text-blue-400 border-blue-500/30 bg-blue-500/10',
  },
  {
    id: 'software-projects',
    title: 'Developed Multiple Software Projects',
    subtitle: 'Practical Application Building',
    description:
      'Designed and engineered end-to-end applications spanning full-stack web platforms, sentiment analysis tools, student guidance systems, and Python utilities.',
    icon: Rocket,
    accentColor: 'text-sky-400 border-sky-500/30 bg-sky-500/10',
  },
  {
    id: 'continuous-growth',
    title: 'Continuous Technical Improvement',
    subtitle: 'Skill Mastery & Evolution',
    description:
      'Dedicated to mastering modern developer frameworks, cloud tools, backend systems architecture, and best practices in clean, maintainable software design.',
    icon: TrendingUp,
    accentColor: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
  },
];

export const Achievements: React.FC = () => {
  return (
    <section id="achievements" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-blue-400 mb-3">
            <Award className="w-3.5 h-3.5 text-blue-400" />
            <span>Milestones & Dedication</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Achievements & Focus
          </h2>
          <div className="w-12 h-1 bg-blue-600 rounded-full mt-4 mb-4"></div>
          <p className="text-slate-400 text-sm max-w-xl">
            Key milestones highlighting dedication to problem solving, software building, and engineering rigor.
          </p>
        </div>

        {/* 3D Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {achievementsList.map((item) => {
            const IconComp = item.icon;
            return (
              <ThreeDCard key={item.id} depth={9} glowColor="rgba(59, 130, 246, 0.2)">
                <div
                  id={`achievement-card-${item.id}`}
                  className="group h-full p-6 sm:p-7 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-blue-500/50 shadow-xl backdrop-blur-sm transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-3.5 mb-4">
                      <div className={`p-3 rounded-xl border ${item.accentColor}`}>
                        <IconComp className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors">
                          {item.title}
                        </h3>
                        <span className="text-xs font-mono text-slate-400">{item.subtitle}</span>
                      </div>
                    </div>

                    <p className="text-slate-300 text-sm leading-relaxed mb-6">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-800/80 flex items-center gap-2 text-xs text-blue-400 font-mono">
                    <CheckCircle className="w-4 h-4 text-blue-400 shrink-0" />
                    <span>Active Commitment</span>
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
