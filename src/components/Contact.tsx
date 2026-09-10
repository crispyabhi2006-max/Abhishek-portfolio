import React, { useState } from 'react';
import {
  Mail,
  Phone,
  Github,
  Linkedin,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Building,
  Sparkles,
  Database,
} from 'lucide-react';
import { ContactFormData } from '../types.ts';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});

  const validate = (): boolean => {
    const errors: { name?: string; email?: string; message?: string } = {};

    if (!formData.name.trim()) {
      errors.name = 'Please enter your name.';
    }

    if (!formData.email.trim()) {
      errors.email = 'Please enter your email address.';
    } else if (!EMAIL_REGEX.test(formData.email.trim())) {
      errors.email = 'Please enter a valid email format (e.g. name@domain.com).';
    }

    if (!formData.message.trim()) {
      errors.message = 'Please write a message before sending.';
    } else if (formData.message.trim().length < 5) {
      errors.message = 'Message must be at least 5 characters long.';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage(null);
    setErrorMessage(null);

    if (!validate()) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to send message. Please try again.');
      }

      setSuccessMessage('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
      setFieldErrors({});
    } catch (err: any) {
      setErrorMessage(
        err.message || 'A network error occurred. Please check your connection and try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-blue-400 mb-3">
            <Mail className="w-3.5 h-3.5 text-blue-400" />
            <span>Get In Touch</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Contact Me
          </h2>
          <div className="w-12 h-1 bg-blue-600 rounded-full mt-4 mb-4"></div>
          <p className="text-slate-400 text-sm max-w-xl">
            Have a project, internship opportunity, or question? Send a message directly and I will respond promptly.
          </p>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
          {/* Left Column: Direct Contacts & Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Connect Directly</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Feel free to reach out for software engineering roles, academic collaborations, or technical inquiries.
                </p>
              </div>

              <div className="space-y-4">
                {/* Email */}
                <a
                  href="mailto:crispyabhi2006@gmail.com"
                  id="contact-email-card"
                  className="flex items-center gap-3.5 p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-indigo-500/40 transition-colors group"
                >
                  <div className="p-2.5 rounded-lg bg-indigo-600/15 text-indigo-400 border border-indigo-500/30 group-hover:scale-105 transition-transform">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="overflow-hidden">
                    <span className="text-[11px] font-mono text-slate-400 block">Email</span>
                    <span className="text-xs sm:text-sm font-semibold text-white group-hover:text-indigo-300 transition-colors truncate block">
                      crispyabhi2006@gmail.com
                    </span>
                  </div>
                </a>

                {/* Phone */}
                <a
                  href="tel:+919962853431"
                  id="contact-phone-card"
                  className="flex items-center gap-3.5 p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-indigo-500/40 transition-colors group"
                >
                  <div className="p-2.5 rounded-lg bg-emerald-600/15 text-emerald-400 border border-emerald-500/30 group-hover:scale-105 transition-transform">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-slate-400 block">Phone</span>
                    <span className="text-xs sm:text-sm font-semibold text-white group-hover:text-emerald-300 transition-colors">
                      +91 9962853431
                    </span>
                  </div>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/abhishek-s-642484381/"
                  target="_blank"
                  rel="noopener noreferrer"
                  id="contact-linkedin-card"
                  className="flex items-center gap-3.5 p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-indigo-500/40 transition-colors group"
                >
                  <div className="p-2.5 rounded-lg bg-blue-600/15 text-blue-400 border border-blue-500/30 group-hover:scale-105 transition-transform">
                    <Linkedin className="w-4 h-4" />
                  </div>
                  <div className="overflow-hidden">
                    <span className="text-[11px] font-mono text-slate-400 block">LinkedIn</span>
                    <span className="text-xs sm:text-sm font-semibold text-white group-hover:text-blue-300 transition-colors truncate block">
                      abhishek-s-642484381
                    </span>
                  </div>
                </a>

                {/* GitHub */}
                <a
                  href="https://github.com/crispyabhi2006-max"
                  target="_blank"
                  rel="noopener noreferrer"
                  id="contact-github-card"
                  className="flex items-center gap-3.5 p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-indigo-500/40 transition-colors group"
                >
                  <div className="p-2.5 rounded-lg bg-slate-800 text-slate-200 border border-slate-700 group-hover:scale-105 transition-transform">
                    <Github className="w-4 h-4" />
                  </div>
                  <div className="overflow-hidden">
                    <span className="text-[11px] font-mono text-slate-400 block">GitHub</span>
                    <span className="text-xs sm:text-sm font-semibold text-white group-hover:text-slate-300 transition-colors truncate block">
                      crispyabhi2006-max
                    </span>
                  </div>
                </a>

                {/* College Info */}
                <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80">
                  <div className="p-2.5 rounded-lg bg-amber-600/15 text-amber-400 border border-amber-500/30">
                    <Building className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-slate-400 block">College</span>
                    <span className="text-xs sm:text-sm font-semibold text-white">
                      Easwari Engineering College (CSE-A)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
                <h3 className="text-xl font-bold text-white">Send a Message</h3>
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Direct Communication</span>
                </div>
              </div>

              {/* Status alerts */}
              {successMessage && (
                <div
                  id="contact-success-alert"
                  className="mb-6 p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-sm flex items-center gap-3 animate-in fade-in"
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span className="font-semibold">{successMessage}</span>
                </div>
              )}

              {errorMessage && (
                <div
                  id="contact-error-alert"
                  className="mb-6 p-4 rounded-xl bg-rose-500/15 border border-rose-500/40 text-rose-300 text-sm flex items-center gap-3 animate-in fade-in"
                >
                  <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate className="space-y-5 text-left">
                {/* Name */}
                <div>
                  <label
                    htmlFor="contact-name-input"
                    className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5"
                  >
                    Name <span className="text-rose-400">*</span>
                  </label>
                  <input
                    id="contact-name-input"
                    type="text"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      if (fieldErrors.name) setFieldErrors({ ...fieldErrors, name: undefined });
                    }}
                    placeholder="Enter your full name"
                    disabled={loading}
                    className={`w-full px-4 py-3 rounded-xl bg-slate-950 border text-sm text-white placeholder-slate-500 transition-colors focus:outline-none ${
                      fieldErrors.name
                        ? 'border-rose-500 focus:border-rose-500 ring-1 ring-rose-500'
                        : 'border-slate-800 focus:border-indigo-500'
                    }`}
                  />
                  {fieldErrors.name && (
                    <p className="mt-1.5 text-xs text-rose-400 font-medium flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {fieldErrors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="contact-email-input"
                    className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5"
                  >
                    Email <span className="text-rose-400">*</span>
                  </label>
                  <input
                    id="contact-email-input"
                    type="email"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (fieldErrors.email) setFieldErrors({ ...fieldErrors, email: undefined });
                    }}
                    placeholder="name@example.com"
                    disabled={loading}
                    className={`w-full px-4 py-3 rounded-xl bg-slate-950 border text-sm text-white placeholder-slate-500 transition-colors focus:outline-none ${
                      fieldErrors.email
                        ? 'border-rose-500 focus:border-rose-500 ring-1 ring-rose-500'
                        : 'border-slate-800 focus:border-indigo-500'
                    }`}
                  />
                  {fieldErrors.email && (
                    <p className="mt-1.5 text-xs text-rose-400 font-medium flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {fieldErrors.email}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="contact-message-input"
                    className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5"
                  >
                    Message <span className="text-rose-400">*</span>
                  </label>
                  <textarea
                    id="contact-message-input"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value });
                      if (fieldErrors.message)
                        setFieldErrors({ ...fieldErrors, message: undefined });
                    }}
                    placeholder="Write your message or inquiry here..."
                    disabled={loading}
                    className={`w-full px-4 py-3 rounded-xl bg-slate-950 border text-sm text-white placeholder-slate-500 transition-colors focus:outline-none resize-none ${
                      fieldErrors.message
                        ? 'border-rose-500 focus:border-rose-500 ring-1 ring-rose-500'
                        : 'border-slate-800 focus:border-indigo-500'
                    }`}
                  />
                  {fieldErrors.message && (
                    <p className="mt-1.5 text-xs text-rose-400 font-medium flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {fieldErrors.message}
                    </p>
                  )}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  id="contact-submit-btn"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/25 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
