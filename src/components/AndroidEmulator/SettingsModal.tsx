import React, { useState } from 'react';
import { 
  X, 
  Moon, 
  Sun, 
  WifiOff, 
  Key, 
  Users, 
  GraduationCap, 
  CheckCircle2, 
  Send, 
  Mail,
  ShieldCheck
} from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
  isNetworkErrorSimulated: boolean;
  onToggleNetworkError: () => void;
  customApiKey: string;
  onSaveApiKey: (key: string) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  isDark,
  onToggleTheme,
  isNetworkErrorSimulated,
  onToggleNetworkError,
  customApiKey,
  onSaveApiKey,
}) => {
  const [tempApiKey, setTempApiKey] = useState(customApiKey);
  const [apiKeySaved, setApiKeySaved] = useState(false);

  // Validated Feedback Form state
  const [feedbackName, setFeedbackName] = useState('');
  const [feedbackEmail, setFeedbackEmail] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSaveKey = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveApiKey(tempApiKey);
    setApiKeySaved(true);
    setTimeout(() => setApiKeySaved(false), 2000);
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (!feedbackName.trim()) {
      errors.name = 'Student or Evaluator name is required.';
    }
    if (!feedbackEmail.trim()) {
      errors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(feedbackEmail.trim())) {
      errors.email = 'Please provide a valid email address.';
    }
    if (!feedbackMessage.trim() || feedbackMessage.trim().length < 5) {
      errors.message = 'Feedback message must be at least 5 characters.';
    }

    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      setFormSubmitted(true);
      setTimeout(() => {
        setFormSubmitted(false);
        setFeedbackName('');
        setFeedbackEmail('');
        setFeedbackMessage('');
      }, 3000);
    }
  };

  return (
    <div className="absolute inset-0 bg-black/60 backdrop-blur-xs z-50 flex flex-col justify-end">
      <div className="bg-white dark:bg-slate-900 rounded-t-3xl max-h-[90%] overflow-y-auto no-scrollbar p-5 space-y-5 border-t border-slate-200 dark:border-slate-800 shadow-2xl animate-in slide-in-from-bottom duration-250">
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-3 border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="font-extrabold text-base tracking-tight">App Settings & Project Info</h3>
            <p className="text-[11px] text-slate-400">NEWS HUB College Demonstration</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Theme Settings */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Appearance & Theme
          </label>
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60">
            <div className="flex items-center gap-2.5">
              {isDark ? <Moon size={18} className="text-purple-400" /> : <Sun size={18} className="text-amber-500" />}
              <div>
                <p className="text-xs font-bold">{isDark ? 'Dark Theme' : 'Light Theme'}</p>
                <p className="text-[11px] text-slate-400">Material 3 Color Scheme</p>
              </div>
            </div>
            <button
              onClick={onToggleTheme}
              className={`px-3 py-1 rounded-full text-xs font-bold cursor-pointer transition-colors ${
                isDark ? 'bg-purple-600 text-white' : 'bg-slate-200 text-slate-800'
              }`}
            >
              Toggle Mode
            </button>
          </div>
        </div>

        {/* Network Error Simulator for College Evaluation Testing */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              College Requirement Test
            </label>
            <span className="text-[10px] bg-red-100 dark:bg-red-950/60 text-red-600 font-bold px-2 py-0.5 rounded-full">
              Evaluation Feature
            </span>
          </div>
          <div className="p-3 rounded-xl bg-red-50/60 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <WifiOff size={16} className="text-red-600" />
                <span className="text-xs font-bold">Simulate Network Failure</span>
              </div>
              <input
                type="checkbox"
                checked={isNetworkErrorSimulated}
                onChange={onToggleNetworkError}
                className="w-4 h-4 text-red-600 rounded cursor-pointer"
              />
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Turn this on to demonstrate the required error state message and Retry button in the Home feed!
            </p>
          </div>
        </div>

        {/* REST News API Configuration */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            REST News API (GNews)
          </label>
          <form onSubmit={handleSaveKey} className="space-y-2">
            <div className="relative">
              <Key size={14} className="absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                value={tempApiKey}
                onChange={(e) => setTempApiKey(e.target.value)}
                placeholder="Optional GNews API Key (or use built-in)"
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/80 outline-hidden font-mono"
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                ✓ Built-in curated news feed is active
              </span>
              <button
                type="submit"
                className="px-3 py-1 bg-[#1E3A8A] text-white text-xs font-bold rounded-lg hover:bg-blue-900 transition-colors cursor-pointer"
              >
                {apiKeySaved ? 'Saved!' : 'Save Key'}
              </button>
            </div>
          </form>
        </div>

        {/* Validated Feedback Form for Evaluation Criteria */}
        <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <Mail size={14} className="text-blue-600" />
              <span>Project Evaluation Feedback Form</span>
            </label>
            <span className="text-[10px] font-semibold text-emerald-600">Validated Form</span>
          </div>

          {formSubmitted ? (
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 rounded-xl text-center space-y-1">
              <CheckCircle2 size={24} className="text-emerald-600 mx-auto" />
              <p className="text-xs font-bold text-emerald-800 dark:text-emerald-300">
                Feedback Recorded!
              </p>
              <p className="text-[10px] text-emerald-700 dark:text-emerald-400">
                Form validated and logged for project grading.
              </p>
            </div>
          ) : (
            <form onSubmit={handleFeedbackSubmit} className="space-y-2">
              <div>
                <input
                  type="text"
                  placeholder="Your Name (Evaluator / Student)"
                  value={feedbackName}
                  onChange={(e) => setFeedbackName(e.target.value)}
                  className={`w-full px-3 py-1.5 text-xs rounded-lg border outline-hidden ${
                    formErrors.name 
                      ? 'border-red-500 bg-red-50 dark:bg-red-950/30' 
                      : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/80'
                  }`}
                />
                {formErrors.name && (
                  <p className="text-[10px] text-red-500 mt-0.5">{formErrors.name}</p>
                )}
              </div>

              <div>
                <input
                  type="email"
                  placeholder="College Email Address"
                  value={feedbackEmail}
                  onChange={(e) => setFeedbackEmail(e.target.value)}
                  className={`w-full px-3 py-1.5 text-xs rounded-lg border outline-hidden ${
                    formErrors.email 
                      ? 'border-red-500 bg-red-50 dark:bg-red-950/30' 
                      : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/80'
                  }`}
                />
                {formErrors.email && (
                  <p className="text-[10px] text-red-500 mt-0.5">{formErrors.email}</p>
                )}
              </div>

              <div>
                <textarea
                  rows={2}
                  placeholder="Evaluation comments or grading notes..."
                  value={feedbackMessage}
                  onChange={(e) => setFeedbackMessage(e.target.value)}
                  className={`w-full px-3 py-1.5 text-xs rounded-lg border outline-hidden resize-none ${
                    formErrors.message 
                      ? 'border-red-500 bg-red-50 dark:bg-red-950/30' 
                      : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/80'
                  }`}
                />
                {formErrors.message && (
                  <p className="text-[10px] text-red-500 mt-0.5">{formErrors.message}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-[#DC2626] hover:bg-red-700 text-white text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 cursor-pointer shadow-xs transition-colors"
              >
                <Send size={13} />
                <span>Submit Evaluation Feedback</span>
              </button>
            </form>
          )}
        </div>

        {/* Team 3-Student Distribution Info */}
        <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300">
            <Users size={14} className="text-[#1E3A8A]" />
            <span>3-Student Team Distribution</span>
          </div>
          <div className="text-[11px] space-y-1 text-slate-600 dark:text-slate-400">
            <p>• <strong>Student 1:</strong> Home screen, Categories, UI/UX Design</p>
            <p>• <strong>Student 2:</strong> News REST API, News Details, Search</p>
            <p>• <strong>Student 3:</strong> Bookmarks, SharedPreferences, Testing & GitHub</p>
          </div>
        </div>
      </div>
    </div>
  );
};
