import React, { useState } from 'react';
import { Bookmark, Trash2, Clock, ChevronRight, AlertCircle, Sparkles } from 'lucide-react';
import { NewsArticle } from '../../types';

interface BookmarksScreenViewProps {
  bookmarks: NewsArticle[];
  onSelectArticle: (article: NewsArticle) => void;
  onRemoveBookmark: (articleId: string) => void;
  onClearAll: () => void;
  onExploreNews: () => void;
  isDark: boolean;
}

export const BookmarksScreenView: React.FC<BookmarksScreenViewProps> = ({
  bookmarks,
  onSelectArticle,
  onRemoveBookmark,
  onClearAll,
  onExploreNews,
  isDark,
}) => {
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  return (
    <div className="flex-1 flex flex-col relative">
      {/* App Bar */}
      <div 
        className={`px-4 py-3 border-b shrink-0 flex items-center justify-between ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div>
          <h2 className="font-extrabold text-base tracking-tight">Saved Bookmarks</h2>
          <p className="text-[10px] text-slate-400">Stored locally in SharedPreferences</p>
        </div>

        {bookmarks.length > 0 && (
          <button
            onClick={() => setShowClearConfirm(true)}
            className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors"
            title="Clear all saved bookmarks"
          >
            <Trash2 size={15} />
            <span>Clear</span>
          </button>
        )}
      </div>

      {/* Clear Confirmation Dialog Modal */}
      {showClearConfirm && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-xs z-30 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 max-w-[320px] w-full space-y-3 shadow-xl border border-slate-200 dark:border-slate-800 animate-in zoom-in-95">
            <div className="flex items-center gap-2 text-red-600 font-bold text-sm">
              <AlertCircle size={18} />
              <span>Clear All Bookmarks?</span>
            </div>
            <p className="text-xs text-slate-500">
              Are you sure you want to remove all {bookmarks.length} saved articles from your local storage?
            </p>
            <div className="flex justify-end gap-2 pt-1">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 rounded-lg cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onClearAll();
                  setShowClearConfirm(false);
                }}
                className="px-3 py-1.5 text-xs font-bold bg-red-600 hover:bg-red-700 text-white rounded-lg cursor-pointer shadow-xs"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bookmarks List or Empty State */}
      <div className="flex-1 overflow-y-auto no-scrollbar p-3 space-y-2.5">
        {bookmarks.length === 0 ? (
          <div className="py-20 px-4 flex flex-col items-center justify-center text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-blue-50 dark:bg-blue-950/40 flex items-center justify-center text-[#1E3A8A] dark:text-blue-400">
              <Bookmark size={30} />
            </div>
            <h3 className="font-extrabold text-base">No Saved Articles</h3>
            <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
              Tap the bookmark icon on any news story to save it for offline reading. Your articles will persist even after closing the app.
            </p>
            <button
              onClick={onExploreNews}
              className="mt-2 px-4 py-2 bg-[#1E3A8A] hover:bg-blue-900 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
            >
              <Sparkles size={14} /> Explore Headlines
            </button>
          </div>
        ) : (
          bookmarks.map((article) => (
            <div
              key={article.id}
              className={`p-2.5 rounded-xl border transition-all flex gap-3 group ${
                isDark 
                  ? 'bg-slate-900/90 border-slate-800 hover:border-slate-700' 
                  : 'bg-white border-slate-100 hover:border-slate-300 shadow-xs'
              }`}
            >
              <img
                src={article.image}
                alt={article.title}
                onClick={() => onSelectArticle(article)}
                className="w-20 h-20 rounded-lg object-cover shrink-0 cursor-pointer"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80';
                }}
              />

              <div className="flex-1 flex flex-col justify-between">
                <div onClick={() => onSelectArticle(article)} className="cursor-pointer">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-red-600 uppercase">
                      {article.source.name}
                    </span>
                    <span className="text-[10px] text-slate-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">
                      {article.category}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold leading-snug line-clamp-2 mt-0.5">
                    {article.title}
                  </h4>
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1">
                  <span className="flex items-center gap-1">
                    <Clock size={10} /> 3 min read
                  </span>
                  <button
                    onClick={() => onRemoveBookmark(article.id)}
                    className="text-red-500 hover:text-red-700 flex items-center gap-1 font-semibold p-1 cursor-pointer"
                    title="Remove from saved"
                  >
                    <Trash2 size={13} />
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
