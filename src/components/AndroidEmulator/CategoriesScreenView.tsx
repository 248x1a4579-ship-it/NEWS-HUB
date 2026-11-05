import React from 'react';
import { 
  Globe, 
  Cpu, 
  Trophy, 
  Briefcase, 
  Film, 
  HeartPulse, 
  Atom, 
  Clock, 
  Bookmark, 
  BookmarkCheck,
  ChevronRight 
} from 'lucide-react';
import { NewsArticle, NewsCategory } from '../../types';

interface CategoriesScreenViewProps {
  articles: NewsArticle[];
  selectedCategory: NewsCategory;
  onSelectCategory: (category: NewsCategory) => void;
  onSelectArticle: (article: NewsArticle) => void;
  onToggleBookmark: (article: NewsArticle) => void;
  isBookmarked: (id: string) => boolean;
  isDark: boolean;
}

const CATEGORY_CONFIG: Record<NewsCategory, { icon: React.ReactNode; color: string }> = {
  General: { icon: <Globe size={14} />, color: 'from-blue-600 to-indigo-600' },
  Technology: { icon: <Cpu size={14} />, color: 'from-cyan-600 to-blue-600' },
  Sports: { icon: <Trophy size={14} />, color: 'from-amber-600 to-orange-600' },
  Business: { icon: <Briefcase size={14} />, color: 'from-emerald-600 to-teal-600' },
  Entertainment: { icon: <Film size={14} />, color: 'from-purple-600 to-pink-600' },
  Health: { icon: <HeartPulse size={14} />, color: 'from-rose-600 to-red-600' },
  Science: { icon: <Atom size={14} />, color: 'from-violet-600 to-purple-700' },
};

export const CategoriesScreenView: React.FC<CategoriesScreenViewProps> = ({
  articles,
  selectedCategory,
  onSelectCategory,
  onSelectArticle,
  onToggleBookmark,
  isBookmarked,
  isDark,
}) => {
  const filteredArticles = articles.filter(
    (a) => a.category.toLowerCase() === selectedCategory.toLowerCase()
  );

  const categories: NewsCategory[] = [
    'General',
    'Technology',
    'Sports',
    'Business',
    'Entertainment',
    'Health',
    'Science',
  ];

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div 
        className={`px-4 py-3 border-b shrink-0 flex items-center justify-between ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <h2 className="font-extrabold text-base tracking-tight">Explore Categories</h2>
        <span className="text-[11px] font-bold text-red-600 bg-red-50 dark:bg-red-950/60 px-2 py-0.5 rounded-full">
          7 Topics
        </span>
      </div>

      {/* Horizontal Category Pill Bar */}
      <div className="px-3 py-2 overflow-x-auto no-scrollbar flex gap-1.5 shrink-0 border-b border-slate-100 dark:border-slate-800/60">
        {categories.map((cat) => {
          const isSelected = cat === selectedCategory;
          const { icon } = CATEGORY_CONFIG[cat];

          return (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                isSelected
                  ? 'bg-[#1E3A8A] text-white shadow-sm ring-1 ring-blue-700'
                  : isDark
                  ? 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <span>{icon}</span>
              <span>{cat}</span>
            </button>
          );
        })}
      </div>

      {/* Category Feed List */}
      <div className="flex-1 overflow-y-auto no-scrollbar p-3 space-y-2.5">
        <div className="flex items-center justify-between px-1">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            {selectedCategory} Stories ({filteredArticles.length})
          </p>
        </div>

        {filteredArticles.length === 0 ? (
          <div className="py-16 text-center text-slate-400">
            <p className="text-xs">No articles currently in this category.</p>
          </div>
        ) : (
          filteredArticles.map((article) => {
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
                    <span className="text-slate-500 font-medium">By {article.author}</span>
                    <span className="flex items-center gap-1">
                      <Clock size={10} /> 3 min read
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
