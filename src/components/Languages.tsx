import React from 'react';
import { Globe2, MessageSquare, Check } from 'lucide-react';
import { ThreeDCard } from './ThreeDCard.tsx';

interface LanguageItem {
  name: string;
  nativeScript: string;
  badge: string;
}

const languages: LanguageItem[] = [
  {
    name: 'English',
    nativeScript: 'English',
    badge: 'Professional & Academic Communication',
  },
  {
    name: 'Tamil',
    nativeScript: 'தமிழ்',
    badge: 'Native Language',
  },
  {
    name: 'Telugu',
    nativeScript: 'తెలుగు',
    badge: 'Regional Language Proficiency',
  },
  {
    name: 'German',
    nativeScript: 'Deutsch',
    badge: 'Elementary Proficiency (A1) & Study',
  },
];

export const Languages: React.FC = () => {
  return (
    <section id="languages" className="py-24 relative bg-slate-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-blue-400 mb-3">
            <Globe2 className="w-3.5 h-3.5 text-blue-400" />
            <span>Linguistic Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Languages Known
          </h2>
          <div className="w-12 h-1 bg-blue-600 rounded-full mt-4 mb-4"></div>
          <p className="text-slate-400 text-sm max-w-md">
            Languages spoken and understood for collaborative and professional engineering environments.
          </p>
        </div>

        {/* 4 Cards matching resume with 3D depth */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {languages.map((lang, idx) => (
            <ThreeDCard key={lang.name} depth={9} glowColor="rgba(59, 130, 246, 0.2)">
              <div
                id={`language-card-${idx}`}
                className="h-full p-6 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-blue-500/50 shadow-xl backdrop-blur-sm transition-all duration-300 text-center flex flex-col items-center justify-between"
              >
                <div className="w-12 h-12 rounded-2xl bg-blue-600/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mb-4 shadow-inner">
                  <Globe2 className="w-6 h-6" />
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white mb-1">{lang.name}</h3>
                  <span className="text-xs font-mono text-blue-400 block mb-3">
                    {lang.nativeScript}
                  </span>
                  <p className="text-xs text-slate-400 leading-relaxed bg-slate-950 px-3 py-2 rounded-xl border border-slate-800">
                    {lang.badge}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 w-full flex items-center justify-center gap-1.5 text-[11px] text-emerald-400 font-mono">
                  <Check className="w-3.5 h-3.5" />
                  <span>Multilingual</span>
                </div>
              </div>
            </ThreeDCard>
          ))}
        </div>
      </div>
    </section>
  );
};
