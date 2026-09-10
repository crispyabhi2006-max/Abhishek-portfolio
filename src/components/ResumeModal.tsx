import React from 'react';
import { FileText, Download, X, CheckCircle2, ExternalLink, ShieldCheck } from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  error?: string | null;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-3xl bg-slate-900 border border-slate-700/80 shadow-2xl p-6 sm:p-8 text-left overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3.5 mb-6">
          <div className="p-3 rounded-2xl bg-blue-600/15 border border-blue-500/30 text-blue-400">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Abhishek S - Official Resume</h3>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              B.E. Computer Science and Engineering • Easwari Engineering College
            </p>
          </div>
        </div>

        {/* Content Preview & Details */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-4 text-xs text-slate-300">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-slate-400 font-mono text-[11px] pb-2 border-b border-slate-800">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Verified Document: Abhishek_S_Resume.pdf
              </span>
              <span>Size: ~2.6 KB • PDF</span>
            </div>

            <div className="pt-2 text-slate-300 space-y-1.5 leading-relaxed font-sans">
              <p className="font-semibold text-white">Contact & Profiles:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-400 font-mono">
                <div>Phone: +91 9962853431</div>
                <div>Email: crispyabhi2006@gmail.com</div>
                <div>LinkedIn: linkedin.com/in/abhishek-s-642484381</div>
                <div>GitHub: github.com/crispyabhi2006-max</div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="font-semibold text-white">Summary of Credentials:</div>
            <ul className="space-y-1 text-slate-400 list-disc list-inside">
              <li><strong className="text-slate-200">Education:</strong> Easwari Engineering College, CSE-A, Second Year</li>
              <li><strong className="text-slate-200">Skills:</strong> Java, Python, SQL, HTML, CSS, JavaScript, DSA, Database Management</li>
              <li><strong className="text-slate-200">Internships:</strong> CodeAlpha, 1M1B Green, QSpiders/QSkill, Tamizhan Skills</li>
              <li><strong className="text-slate-200">Projects:</strong> AI Study Assistant, Sentiment Analysis, Water Conservation, Web & Python Mini Projects</li>
              <li><strong className="text-slate-200">Languages:</strong> English, Tamil, Telugu, German</li>
            </ul>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer"
          >
            Close
          </button>
          <a
            href="/frontend/assets/Abhishek_S_Resume.pdf"
            download="Abhishek_S_Resume.pdf"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 shadow-md shadow-blue-600/30 transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Download PDF Now</span>
          </a>
        </div>
      </div>
    </div>
  );
};
