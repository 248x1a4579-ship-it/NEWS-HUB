import React from 'react';
import { Search, Moon, Sun, Sliders, Zap, Clock, Bookmark, BookmarkCheck, RefreshCw, AlertTriangle } from 'lucide-react';
import { NewsArticle } from '../../types';

interface HomeScreenViewProps {
  articles: NewsArticle[];
  breakingNews: NewsArticle[];
  isDark: boolean;
  onToggleTheme: () => void;
  onSelectArticle: (article: NewsArticle) => void;
  onOpenSearch: () => void;
  onOpenSettings: () => void;
  onToggleBookmark: (article: NewsArticle) => void;
  isBookmarked: (id: string) => boolean;
  isLoading: boolean;
  errorMessage: string | null;
  onRetry: () => void;
}

export const HomeScreenView: React.FC<HomeScreenViewProps> = ({
  articles,
  breakingNews,
  isDark,
  onToggleTheme,
  onSelectArticle,
  onOpenSearch,
  onOpenSettings,
  onToggleBookmark,
  isBookmarked,
  isLoading,
  errorMessage,
  onRetry,
}) => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="flex-1 flex flex-col">
      {/* App Bar */}
      <div 
        className={`px-4 py-3 flex items-center justify-between border-b shrink-0 ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className="flex items-center gap-1.5">
          <div className="bg-[#1E3A8A] text-white font-extrabold text-xs px-2 py-1 rounded">
            NEWS
          </div>
          <span className="text-red-600 font-extrabold text-base tracking-wide">
            HUB
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button 
            onClick={onToggleTheme}
            className={`p-1.5 rounded-full transition-colors cursor-pointer ${
              isDark ? 'hover:bg-slate-800 text-amber-400' : 'hover:bg-slate-100 text-slate-700'
            }`}
            title="Toggle Light/Dark Theme"
          >
            {isDark ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <button 
            onClick={onOpenSearch}
            className={`p-1.5 rounded-full transition-colors cursor-pointer ${
              isDark ? 'hover:bg-slate-800 text-slate-200' : 'hover:bg-slate-100 text-slate-700'
            }`}
            title="Search News"
          >
            <Search size={17} />
          </button>
          <button 
            onClick={onOpenSettings}
            className={`p-1.5 rounded-full transition-colors cursor-pointer ${
              isDark ? 'hover:bg-slate-800 text-slate-200' : 'hover:bg-slate-100 text-slate-700'
            }`}
            title="App Settings & Project Info"
          >
            <Sliders size={17} />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto no-scrollbar p-3 space-y-4">
        {/* Date & Welcome Greeting */}
        <div className="px-1 pt-1">
          <p className="text-[11px] font-bold text-red-600 uppercase tracking-wider">
            {currentDate}
          </p>
          <h2 className="text-xl font-extrabold tracking-tight mt-0.5">
            Good Morning, Reader 👋
          </h2>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Live curated news powered by Flutter REST Provider
          </p>
        </div>

        {/* Error Handling & Retry View */}
        {errorMessage ? (
          <div className="py-12 px-4 flex flex-col items-center justify-center text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-red-100 dark:bg-red-950/60 flex items-center justify-center text-red-600">
              <AlertTriangle size={28} />
            </div>
            <h3 className="font-bold text-base">Network Request Failed</h3>
            <p className="text-xs text-slate-500 max-w-xs">{errorMessage}</p>
            <button
              onClick={onRetry}
              className="mt-2 px-4 py-2 bg-[#1E3A8A] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow hover:bg-blue-900 transition-all cursor-pointer"
            >
              <RefreshCw size={14} /> Retry Connection
            </button>
          </div>
        ) : isLoading ? (
          /* Shimmer Loading Skeleton */
          <div className="space-y-3 animate-pulse">
            <div className="h-44 bg-slate-200 dark:bg-slate-800 rounded-2xl w-full" />
            <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded w-1/3" />
            <div className="space-y-2">
              <div className="h-20 bg-slate-200 dark:bg-slate-800 rounded-xl" />
              <div className="h-20 bg-slate-200 dark:bg-slate-800 rounded-xl" />
              <div className="h-20 bg-slate-200 dark:bg-slate-800 rounded-xl" />
            </div>
          </div>
        ) : (
          <>
            {/* Breaking News Carousel */}
            {breakingNews.length > 0 && (
              <div>
                <div className="flex items-center justify-between px-1 mb-2">
                  <div className="flex items-center gap-1.5 text-red-600 font-bold text-sm">
                    <Zap size={16} className="fill-red-600" />
                    <span>Breaking News</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-medium">Swipe cards →</span>
                </div>

                <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2 pt-0.5 px-0.5 snap-x snap-mandatory">
                  {breakingNews.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => onSelectArticle(item)}
                      className="min-w-[270px] max-w-[270px] h-[190px] rounded-2xl relative overflow-hidden shadow-md group cursor-pointer shrink-0 snap-start transform transition-transform active:scale-[0.98]"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80';
                        }}
                      />
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                      <div className="absolute inset-0 p-3 flex flex-col justify-between text-white">
                        <div className="flex items-center justify-between">
                          <span className="bg-red-600 text-white font-extrabold text-[9px] uppercase px-2 py-0.5 rounded-full tracking-wider shadow">
                            ⚡ BREAKING
                          </span>
                          <span className="text-[10px] bg-black/40 backdrop-blur-sm px-1.5 py-0.5 rounded text-white/90">
                            {item.source.name}
                          </span>
                        </div>

                        <div>
                          <p className="text-xs font-bold leading-snug line-clamp-2 drop-shadow">
                            {item.title}
                          </p>
                          <div className="flex items-center gap-2 mt-1.5 text-[10px] text-white/70">
                            <span>{item.category}</span>
                            <span>•</span>
                            <span className="flex items-center gap-0.5">
                              <Clock size={10} /> 3m read
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Latest News Section */}
            <div>
              <div className="flex items-center justify-between px-1 mb-2.5">
                <h3 className="font-bold text-sm tracking-tight">
                  Latest Headlines
                </h3>
                <span className="text-[11px] font-semibold text-[#1E3A8A] dark:text-blue-400">
                  {articles.length} Stories
                </span>
              </div>

              <div className="space-y-2.5">
                {articles.map((article) => {
                  const saved = isBookmarked(article.id);
                  return (
                    <div
                      key={article.id}
                      className={`p-2.5 rounded-xl border transition-all cursor-pointer flex gap-3 ${
                        isDark 
                          ? 'bg-slate-900/90 border-slate-800 hover:border-slate-700' 
                          : 'bg-white border-slate-100 hover:border-slate-300 shadow-xs'
                      }`}
                      onClick={() => onSelectArticle(article)}
                    >
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-20 h-20 rounded-lg object-cover shrink-0"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80';
                        }}
                      />

                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-red-600 uppercase">
                              {article.source.name}
                            </span>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                onToggleBookmark(article);
                              }}
                              className={`p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer ${
                                saved ? 'text-red-600' : 'text-slate-400'
                              }`}
                              title={saved ? 'Remove bookmark' : 'Bookmark story'}
                            >
                              {saved ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
                            </button>
                          </div>
                          <h4 className="text-xs font-bold leading-snug line-clamp-2 mt-0.5">
                            {article.title}
                          </h4>
                        </div>

                        <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1">
                          <span className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-slate-600 dark:text-slate-300 font-medium">
                            {article.category}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock size={10} /> 3 min read
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
