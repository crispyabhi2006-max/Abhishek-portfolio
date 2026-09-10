import React, { useState, useEffect } from 'react';
import {
  FolderGit2,
  Database,
  ExternalLink,
  Layers,
  Search,
  Plus,
  RefreshCw,
  Info,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { Project } from '../types.ts';
import { ProjectModal } from './ProjectModal.tsx';
import { AddProjectModal } from './AddProjectModal.tsx';
import { ThreeDCard } from './ThreeDCard.tsx';

export const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dataSource, setDataSource] = useState<string>('loading');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTech, setSelectedTech] = useState<string>('ALL');

  const fetchProjects = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/projects');
      if (!res.ok) {
        throw new Error(`API responded with status ${res.status}`);
      }
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setProjects(json.data);
        setDataSource(json.source || 'api');
      } else {
        throw new Error('Invalid project response format.');
      }
    } catch (err: any) {
      console.warn('[Projects] Failed to fetch from API, using client fallback', err);
      setError('Could not connect to backend API server. Check server status.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleProjectAdded = (newProject: Project) => {
    setProjects((prev) => [newProject, ...prev]);
  };

  // Collect all unique technologies for filter tabs
  const allTechs = Array.from(
    new Set(projects.flatMap((p) => p.technologies || []))
  ).slice(0, 8);

  // Filtered projects
  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.technologies.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesTech =
      selectedTech === 'ALL' || project.technologies.includes(selectedTech);

    return matchesSearch && matchesTech;
  });

  return (
    <section id="projects" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-blue-400 mb-3">
            <FolderGit2 className="w-3.5 h-3.5 text-blue-400" />
            <span>Curated Engineering Portfolio</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Featured Projects
          </h2>
          <div className="w-12 h-1 bg-blue-600 rounded-full mt-4 mb-4"></div>
          <p className="text-slate-400 text-sm max-w-2xl">
            Key engineering platforms, intelligent tools, and web applications engineered with modern software architectures.
          </p>
        </div>

        {/* Action Bar: Search, Filters & Add Project */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects or technologies..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          {/* Technology Quick Filters */}
          <div className="flex flex-wrap items-center gap-1.5 justify-center">
            <button
              onClick={() => setSelectedTech('ALL')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                selectedTech === 'ALL'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              All Projects
            </button>
            {allTechs.map((tech) => (
              <button
                key={tech}
                onClick={() => setSelectedTech(tech)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  selectedTech === tech
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {tech}
              </button>
            ))}
          </div>

          {/* Add Project Button */}
          <button
            onClick={() => setIsAddModalOpen(true)}
            id="test-add-project-btn"
            className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-blue-400 hover:text-blue-300 border border-blue-500/30 transition-colors cursor-pointer whitespace-nowrap"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Project Entry</span>
          </button>
        </div>

        {/* Project Cards Grid */}
        {loading && projects.length === 0 ? (
          <div className="py-20 flex flex-col items-center justify-center text-slate-400">
            <RefreshCw className="w-8 h-8 animate-spin text-indigo-400 mb-3" />
            <p className="text-sm">Fetching projects from Express backend API...</p>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-slate-900/60 border border-slate-800 text-slate-400">
            <Info className="w-8 h-8 text-indigo-400 mx-auto mb-2" />
            <p className="text-sm font-medium text-slate-300">No projects match the search criteria.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedTech('ALL');
              }}
              className="mt-3 text-xs text-indigo-400 hover:underline"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, idx) => (
              <ThreeDCard key={project._id || idx} depth={9} glowColor="rgba(59, 130, 246, 0.2)">
                <div
                  id={`project-card-${idx}`}
                  className="group flex flex-col justify-between h-full p-6 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-blue-500/50 shadow-xl backdrop-blur-sm transition-all duration-300"
                >
                  <div>
                    {/* Top Badge */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="text-[11px] font-mono text-blue-400 bg-blue-950/60 px-2.5 py-1 rounded-md border border-blue-800/40">
                        Project {idx + 1}
                      </span>
                      <span className="w-2 h-2 rounded-full bg-emerald-400/80 shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors mb-2.5 tracking-tight">
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3">
                      {project.description}
                    </p>
                  </div>

                  {/* Footer Area: Tech tags & Details CTA */}
                  <div>
                    {/* Technologies tags */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-slate-950 text-slate-300 border border-slate-800"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="px-2 py-1 rounded-md text-[11px] font-mono text-blue-300 bg-slate-950 border border-slate-800">
                          +{project.technologies.length - 4}
                        </span>
                      )}
                    </div>

                    {/* Actions: Details Modal */}
                    <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                      <button
                        onClick={() => setSelectedProject(project)}
                        id={`project-details-btn-${idx}`}
                        className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-950 hover:bg-blue-950/60 text-slate-200 hover:text-blue-200 border border-slate-800 hover:border-blue-500/40 transition-colors cursor-pointer"
                      >
                        <span>Project Details</span>
                        <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
                      </button>
                    </div>
                  </div>
                </div>
              </ThreeDCard>
            ))}
          </div>
        )}

        {/* Project Details Modal */}
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />

        {/* Add Project Modal for testing POST endpoint */}
        <AddProjectModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onProjectAdded={handleProjectAdded}
        />
      </div>
    </section>
  );
};
