import React, { useState } from 'react';
import { 
  ChevronLeft, 
  Bookmark, 
  BookmarkCheck, 
  Share2, 
  ExternalLink, 
  Calendar, 
  User, 
  Check, 
  Globe 
} from 'lucide-react';
import { NewsArticle } from '../../types';

interface NewsDetailsScreenViewProps {
  article: NewsArticle;
  onGoBack: () => void;
  onToggleBookmark: (article: NewsArticle) => void;
  isBookmarked: boolean;
  isDark: boolean;
}

export const NewsDetailsScreenView: React.FC<NewsDetailsScreenViewProps> = ({
  article,
  onGoBack,
  onToggleBookmark,
  isBookmarked,
  isDark,
}) => {
  const [showShareToast, setShowShareToast] = useState(false);
  const [showBrowserSimulation, setShowBrowserSimulation] = useState(false);

  const formattedDate = new Date(article.publishedAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.description,
        url: article.url,
      }).catch(() => {});
    } else {
      navigator.clipboard?.writeText?.(article.url);
      setShowShareToast(true);
      setTimeout(() => setShowShareToast(false), 2500);
    }
  };

  return (
    <div className="flex-1 flex flex-col relative">
      {/* Top Details App Bar */}
      <div 
        className={`px-3 py-2.5 flex items-center justify-between border-b shrink-0 z-10 ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
        }`}
      >
        <button
          onClick={onGoBack}
          className="flex items-center gap-1 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-red-600 transition-colors cursor-pointer"
        >
          <ChevronLeft size={18} />
          <span>Back</span>
        </button>

        <span className="text-xs font-bold truncate max-w-[170px] text-slate-600 dark:text-slate-300">
          {article.source.name}
        </span>

        <div className="flex items-center gap-1">
          <button
            onClick={() => onToggleBookmark(article)}
            className={`p-1.5 rounded-full cursor-pointer transition-colors ${
              isBookmarked 
                ? 'text-red-600 bg-red-50 dark:bg-red-950/60' 
                : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
            title={isBookmarked ? 'Remove Bookmark' : 'Save Article'}
          >
            {isBookmarked ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
          </button>
          <button
            onClick={handleShare}
            className="p-1.5 rounded-full text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-colors"
            title="Share Article"
          >
            <Share2 size={17} />
          </button>
        </div>
      </div>

      {/* Share Toast */}
      {showShareToast && (
        <div className="absolute top-12 left-1/2 -translate-x-1/2 z-30 bg-slate-900 text-white text-[11px] font-semibold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 border border-slate-700 animate-in fade-in slide-in-from-top-2">
          <Check size={14} className="text-emerald-400" />
          <span>Article link copied to clipboard!</span>
        </div>
      )}

      {/* Main Article Body */}
      <div className="flex-1 overflow-y-auto no-scrollbar pb-6">
        {/* Full Hero Image */}
        <div className="relative w-full h-52 bg-slate-900">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80';
            }}
          />
          <div className="absolute bottom-2 left-2">
            <span className="bg-red-600 text-white text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full shadow-md">
              {article.category}
            </span>
          </div>
        </div>

        {/* Content Details */}
        <div className="p-4 space-y-4">
          {/* Published Date */}
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
            <Calendar size={12} />
            <span>{formattedDate}</span>
          </div>

          {/* Headline */}
          <h1 className="text-lg font-extrabold leading-snug tracking-tight">
            {article.title}
          </h1>

          {/* Author & Source Card */}
          <div 
            className={`p-2.5 rounded-xl border flex items-center gap-3 ${
              isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="w-9 h-9 rounded-full bg-[#1E3A8A] text-white flex items-center justify-center font-bold text-xs shrink-0">
              {article.author.charAt(0) || 'N'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold truncate">{article.author}</p>
              <p className="text-[11px] text-slate-400 truncate">
                Staff Journalist • {article.source.name}
              </p>
            </div>
          </div>

          {/* Lead Summary */}
          <p className="text-xs font-semibold leading-relaxed text-slate-700 dark:text-slate-300 border-l-2 border-[#DC2626] pl-3 py-0.5">
            {article.description}
          </p>

          {/* Full Content */}
          <div className="space-y-3 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
            {article.content.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {/* Read Original Article Button */}
          <div className="pt-4">
            <button
              onClick={() => setShowBrowserSimulation(true)}
              className="w-full py-3 bg-[#1E3A8A] hover:bg-blue-900 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              <ExternalLink size={15} />
              <span>Read Original Article on {article.source.name}</span>
            </button>
            <p className="text-[10px] text-center text-slate-400 mt-1.5">
              Simulates Flutter's <code className="font-mono text-[#DC2626]">url_launcher</code> package
            </p>
          </div>
        </div>
      </div>

      {/* External Browser Simulator Modal */}
      {showBrowserSimulation && (
        <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs z-40 flex flex-col justify-end">
          <div className="bg-white dark:bg-slate-900 rounded-t-2xl p-4 space-y-3 border-t border-slate-200 dark:border-slate-800 animate-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Globe size={16} className="text-[#1E3A8A]" />
                <span className="text-xs font-bold">External Browser Link</span>
              </div>
              <button
                onClick={() => setShowBrowserSimulation(false)}
                className="text-xs font-bold text-slate-400 hover:text-slate-600"
              >
                Close
              </button>
            </div>
            <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-mono break-all text-blue-600 dark:text-blue-400">
              {article.url}
            </div>
            <p className="text-[11px] text-slate-500">
              In the real Android build, pressing this invokes <code className="text-red-500 font-mono">launchUrl(Uri.parse(url), mode: LaunchMode.externalApplication)</code> to open the user's Chrome/Android browser.
            </p>
            <div className="flex gap-2">
              <a
                href={article.url}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-2 bg-[#1E3A8A] text-white text-center text-xs font-bold rounded-lg hover:bg-blue-900"
              >
                Open in New Tab
              </a>
              <button
                onClick={() => setShowBrowserSimulation(false)}
                className="px-4 py-2 bg-slate-200 dark:bg-slate-800 text-xs font-bold rounded-lg"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
