import React from 'react';
import { X, Calendar, Database, Layers, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Project } from '../types.ts';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
          <div>
            <span className="text-xs font-mono text-blue-400 block mb-1">
              Project Specification
            </span>
            <h3 className="text-2xl font-bold text-white tracking-tight">{project.title}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="space-y-6">
          {/* Detailed Overview */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
              Project Overview & Architecture
            </h4>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
              {project.description}
            </p>
          </div>

          {/* Technologies Used */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2.5 flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-400" />
              Technologies & Frameworks
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-blue-950/40 text-blue-300 border border-blue-800/40"
                >
                  <CheckCircle2 className="w-3 h-3 text-blue-400" />
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Authentic Metadata */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-slate-800 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Authentic Project Record</span>
            </div>
            {project.createdAt && (
              <div className="flex items-center gap-2 sm:justify-end font-mono">
                <Calendar className="w-4 h-4 text-slate-500" />
                <span>Added: {new Date(project.createdAt).toLocaleDateString()}</span>
              </div>
            )}
          </div>

          {/* Links note */}
          {!project.github && !project.liveDemo && (
            <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-800/60 text-xs text-slate-500 text-center">
              Source code and deployments are available upon academic or interview request. No unverified external URLs are published.
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="mt-8 pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white transition-colors"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
};
