import React, { useState } from 'react';
import { Search, X, TrendingUp, SearchX, Clock, Bookmark, BookmarkCheck } from 'lucide-react';
import { NewsArticle } from '../../types';

interface SearchScreenViewProps {
  articles: NewsArticle[];
  onSelectArticle: (article: NewsArticle) => void;
  onToggleBookmark: (article: NewsArticle) => void;
  isBookmarked: (id: string) => boolean;
  isDark: boolean;
}

export const SearchScreenView: React.FC<SearchScreenViewProps> = ({
  articles,
  onSelectArticle,
  onToggleBookmark,
  isBookmarked,
  isDark,
}) => {
  const [query, setQuery] = useState('');
  const [submittedQuery, setSubmittedQuery] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);

  const trendingTopics = [
    'Artificial Intelligence',
    'Space',
    'Solid-State Battery',
    'Flutter',
    'Inflation',
    'Champions League',
    'Climate Accord',
  ];

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = query.trim();

    // Form Validation requirement for college evaluation
    if (!trimmed) {
      setValidationError('Please enter a search keyword.');
      return;
    }
    if (trimmed.length < 2) {
      setValidationError('Search query must be at least 2 characters long.');
      return;
    }

    setValidationError(null);
    setSubmittedQuery(trimmed);
  };

  const handleTopicClick = (topic: string) => {
    setQuery(topic);
    setValidationError(null);
    setSubmittedQuery(topic);
  };

  const handleClear = () => {
    setQuery('');
    setSubmittedQuery('');
    setValidationError(null);
  };

  // Filter matching articles
  const searchResults = submittedQuery
    ? articles.filter(
        (a) =>
          a.title.toLowerCase().includes(submittedQuery.toLowerCase()) ||
          a.description.toLowerCase().includes(submittedQuery.toLowerCase()) ||
          a.category.toLowerCase().includes(submittedQuery.toLowerCase()) ||
          a.author.toLowerCase().includes(submittedQuery.toLowerCase())
      )
    : [];

  return (
    <div className="flex-1 flex flex-col">
      {/* App Bar */}
      <div 
        className={`px-4 py-3 border-b shrink-0 ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <h2 className="font-extrabold text-base tracking-tight">Search News</h2>
        <p className="text-[11px] text-slate-400">Search by headline, keyword, or topic</p>
      </div>

      {/* Validated Search Form Container */}
      <div className="p-3 border-b border-slate-100 dark:border-slate-800 shrink-0">
        <form onSubmit={handleSearchSubmit} className="space-y-1.5">
          <div className="relative flex items-center">
            <Search 
              size={16} 
              className="absolute left-3 text-slate-400 pointer-events-none" 
            />
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                if (validationError) setValidationError(null);
              }}
              placeholder="Search news (e.g., Space, Battery)..."
              className={`w-full pl-9 pr-16 py-2 rounded-xl text-xs font-medium outline-hidden transition-all ${
                validationError
                  ? 'bg-red-50 dark:bg-red-950/30 border border-red-500 text-red-900 dark:text-red-200'
                  : isDark
                  ? 'bg-slate-900 border border-slate-800 focus:border-[#1E3A8A] text-slate-100'
                  : 'bg-slate-100 border border-slate-200 focus:border-[#1E3A8A] text-slate-900'
              }`}
            />
            
            <div className="absolute right-2 flex items-center gap-1">
              {query && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="p-1 text-slate-400 hover:text-slate-600 rounded-full cursor-pointer"
                >
                  <X size={14} />
                </button>
              )}
              <button
                type="submit"
                className="bg-[#1E3A8A] text-white text-[11px] font-bold px-2.5 py-1 rounded-lg cursor-pointer hover:bg-blue-900 transition-colors"
              >
                Go
              </button>
            </div>
          </div>

          {/* Validation Feedback Message */}
          {validationError && (
            <p className="text-[11px] font-semibold text-red-600 pl-1">
              ⚠️ {validationError}
            </p>
          )}
        </form>
      </div>

      {/* Content Body */}
      <div className="flex-1 overflow-y-auto no-scrollbar p-3 space-y-3">
        {/* Popular Topics Pill Grid if no query submitted */}
        {!submittedQuery && (
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 mb-2">
              <TrendingUp size={14} className="text-red-600" />
              <span>Trending Search Keywords</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {trendingTopics.map((topic) => (
                <button
                  key={topic}
                  onClick={() => handleTopicClick(topic)}
                  className={`text-xs px-3 py-1 rounded-full border transition-colors cursor-pointer ${
                    isDark
                      ? 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-600'
                      : 'bg-white border-slate-200 text-slate-700 hover:border-blue-500 shadow-2xs'
                  }`}
                >
                  #{topic}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search Results State */}
        {submittedQuery && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500">
                Results for "{submittedQuery}"
              </span>
              <span className="text-[11px] font-semibold text-red-600">
                {searchResults.length} found
              </span>
            </div>

            {searchResults.length === 0 ? (
              <div className="py-14 text-center space-y-2">
                <div className="w-12 h-12 mx-auto rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-slate-400">
                  <SearchX size={24} />
                </div>
                <h4 className="text-sm font-bold">No Matching Stories Found</h4>
                <p className="text-xs text-slate-400 max-w-xs mx-auto">
                  We couldn't find any news articles matching "{submittedQuery}". Try another keyword like "Technology" or "Science".
                </p>
              </div>
            ) : (
              <div className="space-y-2.5">
                {searchResults.map((article) => {
                  const saved = isBookmarked(article.id);
                  return (
                    <div
                      key={article.id}
                      onClick={() => onSelectArticle(article)}
                      className={`p-2.5 rounded-xl border transition-all cursor-pointer flex gap-3 ${
                        isDark 
                          ? 'bg-slate-900/90 border-slate-800 hover:border-slate-700' 
                          : 'bg-white border-slate-100 hover:border-slate-300 shadow-xs'
                      }`}
                    >
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-18 h-18 rounded-lg object-cover shrink-0"
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
                              className={`p-1 rounded cursor-pointer ${
                                saved ? 'text-red-600' : 'text-slate-400 hover:text-slate-600'
                              }`}
                            >
                              {saved ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
                            </button>
                          </div>
                          <h4 className="text-xs font-bold leading-snug line-clamp-2 mt-0.5">
                            {article.title}
                          </h4>
                        </div>

                        <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1">
                          <span className="text-slate-500 font-medium">{article.category}</span>
                          <span className="flex items-center gap-1">
                            <Clock size={10} /> 3 min read
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
