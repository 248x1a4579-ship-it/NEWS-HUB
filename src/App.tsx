import React, { useState, useEffect } from 'react';
import { 
  Download, 
  Play, 
  Smartphone, 
  Code2, 
  BookOpen, 
  Users, 
  CheckCircle2, 
  Sparkles, 
  ExternalLink, 
  ShieldCheck, 
  RotateCcw, 
  Terminal, 
  Moon, 
  Sun,
  LayoutGrid,
  FileCheck2,
  AlertTriangle,
  Bug
} from 'lucide-react';
import { NewsArticle, NewsCategory, ActiveTab, FlutterFile } from './types';
import { INITIAL_NEWS_ARTICLES, CATEGORIES_LIST } from './data/sampleNews';
import { FLUTTER_FILES } from './data/flutterFiles';
import { PhoneFrame } from './components/AndroidEmulator/PhoneFrame';
import { SplashScreenView } from './components/AndroidEmulator/SplashScreenView';
import { HomeScreenView } from './components/AndroidEmulator/HomeScreenView';
import { CategoriesScreenView } from './components/AndroidEmulator/CategoriesScreenView';
import { SearchScreenView } from './components/AndroidEmulator/SearchScreenView';
import { NewsDetailsScreenView } from './components/AndroidEmulator/NewsDetailsScreenView';
import { BookmarksScreenView } from './components/AndroidEmulator/BookmarksScreenView';
import { SettingsModal } from './components/AndroidEmulator/SettingsModal';
import { FileTree } from './components/CodeStudio/FileTree';
import { CodeViewer } from './components/CodeStudio/CodeViewer';
import { TutorialGuide } from './components/CodeStudio/TutorialGuide';
import { TestRunnerModal } from './components/CodeStudio/TestRunnerModal';
import { downloadFlutterProjectZip } from './utils/zipExporter';

type ViewLayout = 'split' | 'phone' | 'code';
type StudioTab = 'code' | 'guide' | 'defects' | 'team';

export default function App() {
  // Mobile App State
  const [isSplash, setIsSplash] = useState(true);
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [selectedCategory, setSelectedCategory] = useState<NewsCategory>('General');
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [isMobileDark, setIsMobileDark] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isTestModalOpen, setIsTestModalOpen] = useState(false);
  const [isDownloadingZip, setIsDownloadingZip] = useState(false);

  // Persistence: Bookmarks stored locally in localStorage (simulating SharedPreferences)
  const [bookmarks, setBookmarks] = useState<NewsArticle[]>(() => {
    try {
      const saved = localStorage.getItem('news_hub_bookmarks_v1');
      return saved ? JSON.parse(saved) : [INITIAL_NEWS_ARTICLES[0], INITIAL_NEWS_ARTICLES[1]];
    } catch {
      return [INITIAL_NEWS_ARTICLES[0], INITIAL_NEWS_ARTICLES[1]];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('news_hub_bookmarks_v1', JSON.stringify(bookmarks));
    } catch (e) {
      console.error('Failed to save bookmarks:', e);
    }
  }, [bookmarks]);

  // Error simulation state (for college requirement testing)
  const [isNetworkErrorSimulated, setIsNetworkErrorSimulated] = useState(false);
  const [customApiKey, setCustomApiKey] = useState('');
  const [isLoadingFeed, setIsLoadingFeed] = useState(false);

  // Code Studio State
  const [selectedFile, setSelectedFile] = useState<FlutterFile>(FLUTTER_FILES[1]); // main.dart default
  const [viewLayout, setViewLayout] = useState<ViewLayout>('split');
  const [studioTab, setStudioTab] = useState<StudioTab>('code');

  const handleToggleBookmark = (article: NewsArticle) => {
    setBookmarks((prev) => {
      const exists = prev.some((b) => b.id === article.id);
      if (exists) {
        return prev.filter((b) => b.id !== article.id);
      } else {
        return [article, ...prev];
      }
    });
  };

  const isArticleBookmarked = (id: string) => {
    return bookmarks.some((b) => b.id === id);
  };

  const handleRemoveBookmark = (articleId: string) => {
    setBookmarks((prev) => prev.filter((b) => b.id !== articleId));
  };

  const handleClearAllBookmarks = () => {
    setBookmarks([]);
  };

  const handleDownloadZip = async () => {
    setIsDownloadingZip(true);
    try {
      await downloadFlutterProjectZip();
    } catch (e) {
      console.error('Download error:', e);
    } finally {
      setIsDownloadingZip(false);
    }
  };

  const handleRestartSplash = () => {
    setIsSplash(true);
    setSelectedArticle(null);
  };

  const handleRetryFeed = () => {
    setIsLoadingFeed(true);
    setIsNetworkErrorSimulated(false);
    setTimeout(() => {
      setIsLoadingFeed(false);
    }, 600);
  };

  const breakingArticles = INITIAL_NEWS_ARTICLES.filter((a) => a.isBreaking);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans select-none">
      {/* Top Navigation Bar */}
      <header className="h-14 bg-slate-900 border-b border-slate-800 px-4 flex items-center justify-between z-30 shrink-0">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="bg-[#1E3A8A] text-white font-black text-xs px-2 py-1 rounded">
              NEWS
            </span>
            <span className="text-[#DC2626] font-black text-base tracking-wide">
              HUB
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-slate-800">
            <span className="text-[11px] font-semibold text-slate-300">
              Android Flutter App Studio
            </span>
            <span className="text-[10px] font-mono bg-blue-950 text-blue-400 border border-blue-800 px-2 py-0.5 rounded-full">
              Flutter 3.x • Provider • REST
            </span>
          </div>
        </div>

        {/* View Mode Switcher */}
        <div className="hidden md:flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setViewLayout('split')}
            className={`px-3 py-1 rounded-lg font-semibold flex items-center gap-1.5 cursor-pointer transition-colors ${
              viewLayout === 'split' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <LayoutGrid size={14} />
            <span>Dual View</span>
          </button>
          <button
            onClick={() => setViewLayout('phone')}
            className={`px-3 py-1 rounded-lg font-semibold flex items-center gap-1.5 cursor-pointer transition-colors ${
              viewLayout === 'phone' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Smartphone size={14} />
            <span>Mobile Only</span>
          </button>
          <button
            onClick={() => setViewLayout('code')}
            className={`px-3 py-1 rounded-lg font-semibold flex items-center gap-1.5 cursor-pointer transition-colors ${
              viewLayout === 'code' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Code2 size={14} />
            <span>Code & Guide</span>
          </button>
        </div>

        {/* Main Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Run Tests Button */}
          <button
            onClick={() => setIsTestModalOpen(true)}
            className="px-3 py-1.5 bg-emerald-700/30 hover:bg-emerald-700/50 text-emerald-300 border border-emerald-600/50 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
            title="Execute automated Flutter widget tests"
          >
            <ShieldCheck size={14} className="text-emerald-400" />
            <span className="hidden sm:inline">Run Tests</span>
          </button>

          {/* Download ZIP Button */}
          <button
            onClick={handleDownloadZip}
            disabled={isDownloadingZip}
            className="px-3 py-1.5 bg-gradient-to-r from-[#1E3A8A] to-[#DC2626] hover:opacity-90 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
            title="Download complete Flutter project as ready-to-unzip .zip file"
          >
            <Download size={14} />
            <span>{isDownloadingZip ? 'Zipping...' : 'Download Project (.zip)'}</span>
          </button>
        </div>
      </header>

      {/* Main Workspace Workspace */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Side: Interactive Android Mobile Device Emulator */}
        {(viewLayout === 'split' || viewLayout === 'phone') && (
          <div 
            className={`flex flex-col items-center justify-between p-4 bg-slate-950/70 border-r border-slate-800/80 overflow-y-auto no-scrollbar shrink-0 ${
              viewLayout === 'phone' ? 'w-full max-w-4xl mx-auto' : 'w-full lg:w-[480px] xl:w-[500px]'
            }`}
          >
            {/* Emulator Header Controls */}
            <div className="w-full max-w-[380px] sm:max-w-[400px] flex items-center justify-between pb-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-semibold text-slate-300">Android 14 • Pixel 8</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleRestartSplash}
                  className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer text-[11px]"
                  title="Restart App to see Splash Screen"
                >
                  <RotateCcw size={12} />
                  <span>Restart App</span>
                </button>
                <span>•</span>
                <button
                  onClick={() => setIsMobileDark(!isMobileDark)}
                  className="hover:text-white transition-colors cursor-pointer text-[11px]"
                >
                  {isMobileDark ? 'Light UI' : 'Dark UI'}
                </button>
              </div>
            </div>

            {/* Android Phone Hardware Frame */}
            <PhoneFrame
              isDark={isMobileDark}
              onToggleTheme={() => setIsMobileDark(!isMobileDark)}
              activeTab={activeTab}
              onSelectTab={(tab) => {
                setActiveTab(tab);
                setSelectedArticle(null);
                if (isSplash) setIsSplash(false);
              }}
              onOpenSettings={() => setIsSettingsOpen(true)}
              isNetworkErrorSimulated={isNetworkErrorSimulated}
              onToggleNetworkError={() => setIsNetworkErrorSimulated(!isNetworkErrorSimulated)}
            >
              {/* Screen Router */}
              {isSplash ? (
                <SplashScreenView onFinish={() => setIsSplash(false)} />
              ) : selectedArticle ? (
                <NewsDetailsScreenView
                  article={selectedArticle}
                  onGoBack={() => setSelectedArticle(null)}
                  onToggleBookmark={handleToggleBookmark}
                  isBookmarked={isArticleBookmarked(selectedArticle.id)}
                  isDark={isMobileDark}
                />
              ) : activeTab === 'home' ? (
                <HomeScreenView
                  articles={INITIAL_NEWS_ARTICLES}
                  breakingNews={breakingArticles}
                  isDark={isMobileDark}
                  onToggleTheme={() => setIsMobileDark(!isMobileDark)}
                  onSelectArticle={(article) => setSelectedArticle(article)}
                  onOpenSearch={() => setActiveTab('search')}
                  onOpenSettings={() => setIsSettingsOpen(true)}
                  onToggleBookmark={handleToggleBookmark}
                  isBookmarked={isArticleBookmarked}
                  isLoading={isLoadingFeed}
                  errorMessage={
                    isNetworkErrorSimulated
                      ? 'Simulated HTTP 503 Service Unavailable (Testing error and retry button)'
                      : null
                  }
                  onRetry={handleRetryFeed}
                />
              ) : activeTab === 'categories' ? (
                <CategoriesScreenView
                  articles={INITIAL_NEWS_ARTICLES}
                  selectedCategory={selectedCategory}
                  onSelectCategory={(cat) => setSelectedCategory(cat)}
                  onSelectArticle={(article) => setSelectedArticle(article)}
                  onToggleBookmark={handleToggleBookmark}
                  isBookmarked={isArticleBookmarked}
                  isDark={isMobileDark}
                />
              ) : activeTab === 'search' ? (
                <SearchScreenView
                  articles={INITIAL_NEWS_ARTICLES}
                  onSelectArticle={(article) => setSelectedArticle(article)}
                  onToggleBookmark={handleToggleBookmark}
                  isBookmarked={isArticleBookmarked}
                  isDark={isMobileDark}
                />
              ) : (
                <BookmarksScreenView
                  bookmarks={bookmarks}
                  onSelectArticle={(article) => setSelectedArticle(article)}
                  onRemoveBookmark={handleRemoveBookmark}
                  onClearAll={handleClearAllBookmarks}
                  onExploreNews={() => setActiveTab('home')}
                  isDark={isMobileDark}
                />
              )}

              {/* Settings & Evaluation Form Modal */}
              <SettingsModal
                isOpen={isSettingsOpen}
                onClose={() => setIsSettingsOpen(false)}
                isDark={isMobileDark}
                onToggleTheme={() => setIsMobileDark(!isMobileDark)}
                isNetworkErrorSimulated={isNetworkErrorSimulated}
                onToggleNetworkError={() => setIsNetworkErrorSimulated(!isNetworkErrorSimulated)}
                customApiKey={customApiKey}
                onSaveApiKey={(key) => setCustomApiKey(key)}
              />
            </PhoneFrame>

            {/* Quick Emulator Helper Footer */}
            <div className="w-full max-w-[380px] sm:max-w-[400px] mt-2 pt-2 border-t border-slate-900 text-[11px] text-slate-500 flex items-center justify-between">
              <span>Saved locally: {bookmarks.length} articles</span>
              <button
                onClick={() => setIsSettingsOpen(true)}
                className="text-red-400 hover:text-red-300 underline cursor-pointer"
              >
                Test Network Error / Form
              </button>
            </div>
          </div>
        )}

        {/* Right Side: College Project Studio, Codebase Explorer, Tutorial & Docs */}
        {(viewLayout === 'split' || viewLayout === 'code') && (
          <div className="flex-1 flex flex-col h-full bg-slate-950 overflow-hidden">
            {/* Studio Navigation Bar */}
            <div className="h-11 bg-slate-900/90 border-b border-slate-800 px-4 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setStudioTab('code')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors ${
                    studioTab === 'code'
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Code2 size={14} />
                  <span>Flutter Codebase ({FLUTTER_FILES.length} Files)</span>
                </button>

                <button
                  onClick={() => setStudioTab('guide')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors ${
                    studioTab === 'guide'
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <BookOpen size={14} />
                  <span>Step-by-Step Student Guide</span>
                </button>

                <button
                  onClick={() => setStudioTab('defects')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors ${
                    studioTab === 'defects'
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Bug size={14} />
                  <span>Defect Log & Evaluation</span>
                </button>

                <button
                  onClick={() => setStudioTab('team')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors ${
                    studioTab === 'team'
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Users size={14} />
                  <span>Team Work Breakdown</span>
                </button>
              </div>

              <div className="hidden lg:flex items-center gap-2 text-xs font-mono text-slate-400">
                <Terminal size={12} className="text-emerald-400" />
                <span>Ready for Android Studio & VS Code</span>
              </div>
            </div>

            {/* Studio Workspace Content */}
            <div className="flex-1 flex overflow-hidden">
              {studioTab === 'code' ? (
                <div className="flex-1 flex overflow-hidden">
                  {/* Left File Tree Column */}
                  <div className="w-64 sm:w-72 shrink-0 h-full">
                    <FileTree
                      files={FLUTTER_FILES}
                      selectedFile={selectedFile}
                      onSelectFile={(f) => setSelectedFile(f)}
                    />
                  </div>

                  {/* Right Code Viewer Column */}
                  <div className="flex-1 h-full overflow-hidden">
                    <CodeViewer file={selectedFile} />
                  </div>
                </div>
              ) : studioTab === 'guide' ? (
                <TutorialGuide />
              ) : studioTab === 'defects' ? (
                /* Defect Log & Evaluation Checklist */
                <div className="flex-1 overflow-y-auto p-6 space-y-6 text-slate-300">
                  <div>
                    <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
                      <FileCheck2 className="text-emerald-400" />
                      <span>Project Evaluation & Defect Log</span>
                    </h2>
                    <p className="text-xs text-slate-400 mt-1">
                      Formal software engineering documentation for college faculty review and project defense.
                    </p>
                  </div>

                  {/* Requirements Checklist */}
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
                    <h3 className="font-bold text-sm text-slate-100">
                      College Evaluation Criteria Verification
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                      <div className="flex items-center gap-2 p-2 bg-slate-950/60 rounded-lg border border-slate-800">
                        <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                        <span>Minimum 4 Functional Screens (6 implemented: Splash, Home, Categories, Details, Saved, Search)</span>
                      </div>
                      <div className="flex items-center gap-2 p-2 bg-slate-950/60 rounded-lg border border-slate-800">
                        <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                        <span>REST API Integration with Real-time & offline fallbacks</span>
                      </div>
                      <div className="flex items-center gap-2 p-2 bg-slate-950/60 rounded-lg border border-slate-800">
                        <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                        <span>Local storage persistence (SharedPreferences for bookmarks)</span>
                      </div>
                      <div className="flex items-center gap-2 p-2 bg-slate-950/60 rounded-lg border border-slate-800">
                        <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                        <span>Provider State Management (NewsProvider, BookmarkProvider, ThemeProvider)</span>
                      </div>
                      <div className="flex items-center gap-2 p-2 bg-slate-950/60 rounded-lg border border-slate-800">
                        <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                        <span>Validated Form with Error Handling (Search Screen & Evaluation Feedback Form)</span>
                      </div>
                      <div className="flex items-center gap-2 p-2 bg-slate-950/60 rounded-lg border border-slate-800">
                        <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                        <span>Network Error and Retry button functionality verified</span>
                      </div>
                      <div className="flex items-center gap-2 p-2 bg-slate-950/60 rounded-lg border border-slate-800">
                        <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                        <span>Automated Flutter Widget Tests (test/widget_test.dart)</span>
                      </div>
                      <div className="flex items-center gap-2 p-2 bg-slate-950/60 rounded-lg border border-slate-800">
                        <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                        <span>Clean White / Dark Blue / Red Material 3 Design System</span>
                      </div>
                    </div>
                  </div>

                  {/* Defect Log Table */}
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
                    <h3 className="font-bold text-sm text-slate-100">
                      Software Defect Log (Bugs & Verified Fixes)
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="border-b border-slate-800 text-slate-400">
                            <th className="py-2 px-3 font-semibold">ID</th>
                            <th className="py-2 px-3 font-semibold">Bug Description</th>
                            <th className="py-2 px-3 font-semibold">Root Cause</th>
                            <th className="py-2 px-3 font-semibold">Resolution Applied</th>
                            <th className="py-2 px-3 font-semibold">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/60">
                          <tr>
                            <td className="py-2.5 px-3 font-mono text-cyan-400">BUG-001</td>
                            <td className="py-2.5 px-3">Null pointer exception on missing image or author from API</td>
                            <td className="py-2.5 px-3 text-slate-400">Null values returned from GNews/NewsAPI JSON</td>
                            <td className="py-2.5 px-3">Added null-coalescing operators and Unsplash image fallbacks in <code>Article.fromJson</code></td>
                            <td className="py-2.5 px-3"><span className="bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded text-[10px] font-bold">Resolved</span></td>
                          </tr>
                          <tr>
                            <td className="py-2.5 px-3 font-mono text-cyan-400">BUG-002</td>
                            <td className="py-2.5 px-3">Bookmarks wiped after application restart</td>
                            <td className="py-2.5 px-3 text-slate-400">Bookmark state was only stored in memory</td>
                            <td className="py-2.5 px-3">Integrated <code>SharedPreferences</code> to serialize bookmarks as JSON strings to disk</td>
                            <td className="py-2.5 px-3"><span className="bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded text-[10px] font-bold">Resolved</span></td>
                          </tr>
                          <tr>
                            <td className="py-2.5 px-3 font-mono text-cyan-400">BUG-003</td>
                            <td className="py-2.5 px-3">Search trigger allowed empty query requests to API</td>
                            <td className="py-2.5 px-3 text-slate-400">No form validation on search input</td>
                            <td className="py-2.5 px-3">Enforced <code>Form</code> validator requiring at least 2 characters</td>
                            <td className="py-2.5 px-3"><span className="bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded text-[10px] font-bold">Resolved</span></td>
                          </tr>
                          <tr>
                            <td className="py-2.5 px-3 font-mono text-cyan-400">BUG-004</td>
                            <td className="py-2.5 px-3">API 429 rate limit error when quota exhausted</td>
                            <td className="py-2.5 px-3 text-slate-400">Free tier quota limit (100 req/day)</td>
                            <td className="py-2.5 px-3">Created local resilient fallback dataset inside <code>NewsApiService</code></td>
                            <td className="py-2.5 px-3"><span className="bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded text-[10px] font-bold">Resolved</span></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ) : (
                /* Team Work Breakdown Tab */
                <div className="flex-1 overflow-y-auto p-6 space-y-6 text-slate-300">
                  <div>
                    <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
                      <Users className="text-blue-400" />
                      <span>3-Student Team Work Distribution</span>
                    </h2>
                    <p className="text-xs text-slate-400 mt-1">
                      Individual role definitions, git commit ownership, and viva voce presentation preparation.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Student 1 Card */}
                    <div className="bg-slate-900 border border-amber-500/30 rounded-2xl p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-amber-300 bg-amber-950/60 px-2.5 py-1 rounded-full border border-amber-800">
                          Student 1
                        </span>
                        <span className="text-[11px] text-slate-400">UI / UX Lead</span>
                      </div>
                      <h3 className="font-extrabold text-sm text-white">Frontend & Screen Design</h3>
                      <ul className="text-xs space-y-1.5 text-slate-300 list-disc pl-4">
                        <li><strong>HomeScreen</strong> with Breaking News horizontal carousel</li>
                        <li><strong>CategoriesScreen</strong> with 7 topic filters</li>
                        <li>Material 3 Design Theme (Dark Blue & Red)</li>
                        <li><strong>NewsCard</strong> & <strong>BreakingNewsCard</strong> widgets</li>
                        <li><strong>NewsShimmerLoading</strong> skeleton widget</li>
                      </ul>
                    </div>

                    {/* Student 2 Card */}
                    <div className="bg-slate-900 border border-blue-500/30 rounded-2xl p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-blue-300 bg-blue-950/60 px-2.5 py-1 rounded-full border border-blue-800">
                          Student 2
                        </span>
                        <span className="text-[11px] text-slate-400">API & Logic Lead</span>
                      </div>
                      <h3 className="font-extrabold text-sm text-white">REST API & Details</h3>
                      <ul className="text-xs space-y-1.5 text-slate-300 list-disc pl-4">
                        <li><strong>NewsApiService</strong> REST client with HTTP calls</li>
                        <li><strong>Article</strong> model with JSON serialization</li>
                        <li><strong>NewsDetailsScreen</strong> with full story viewer</li>
                        <li><strong>SearchScreen</strong> with validated input form</li>
                        <li>Integration with <code>url_launcher</code> and <code>share_plus</code></li>
                      </ul>
                    </div>

                    {/* Student 3 Card */}
                    <div className="bg-slate-900 border border-emerald-500/30 rounded-2xl p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-emerald-300 bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-800">
                          Student 3
                        </span>
                        <span className="text-[11px] text-slate-400">State & QA Lead</span>
                      </div>
                      <h3 className="font-extrabold text-sm text-white">State, Storage & Tests</h3>
                      <ul className="text-xs space-y-1.5 text-slate-300 list-disc pl-4">
                        <li><strong>BookmarkProvider</strong> with <code>SharedPreferences</code></li>
                        <li><strong>NewsProvider</strong> & <strong>ThemeProvider</strong></li>
                        <li><strong>BookmarksScreen</strong> with swipe-to-dismiss</li>
                        <li>Automated widget tests in <code>test/widget_test.dart</code></li>
                        <li>README, Defect Log, and Release APK instructions</li>
                      </ul>
                    </div>
                  </div>

                  {/* Submission Checklist */}
                  <div className="p-4 bg-blue-950/30 border border-blue-900/60 rounded-2xl space-y-2">
                    <h4 className="font-bold text-sm text-blue-200">
                      College Submission Package Checklist
                    </h4>
                    <p className="text-xs text-slate-400">
                      When submitting to your professor or GitHub, include:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <div className="p-2 bg-slate-900/80 rounded-lg">1. Full Flutter source code (use Download Project button)</div>
                      <div className="p-2 bg-slate-900/80 rounded-lg">2. <code>README.md</code> with screenshots and team contributions</div>
                      <div className="p-2 bg-slate-900/80 rounded-lg">3. <code>DEFECT_LOG.md</code> documenting bugs and resolutions</div>
                      <div className="p-2 bg-slate-900/80 rounded-lg">4. Signed or Release APK from <code>flutter build apk --release</code></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Flutter Test Suite Runner Modal */}
      <TestRunnerModal
        isOpen={isTestModalOpen}
        onClose={() => setIsTestModalOpen(false)}
      />
    </div>
  );
}
