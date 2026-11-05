import React from 'react';
import { Wifi, BatteryMedium, Signal, ChevronLeft, Moon, Sun, Sliders, ShieldCheck } from 'lucide-react';
import { ActiveTab } from '../../types';

interface PhoneFrameProps {
  children: React.ReactNode;
  isDark: boolean;
  onToggleTheme: () => void;
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  onOpenSettings: () => void;
  canGoBack?: boolean;
  onGoBack?: () => void;
  currentScreenTitle?: string;
  isNetworkErrorSimulated?: boolean;
  onToggleNetworkError?: () => void;
}

export const PhoneFrame: React.FC<PhoneFrameProps> = ({
  children,
  isDark,
  onToggleTheme,
  activeTab,
  onSelectTab,
  onOpenSettings,
  canGoBack,
  onGoBack,
  currentScreenTitle,
  isNetworkErrorSimulated,
  onToggleNetworkError,
}) => {
  const currentTime = '09:41';

  return (
    <div className="flex flex-col items-center">
      {/* Device Hardware Bezel */}
      <div 
        className={`relative w-[380px] sm:w-[400px] h-[780px] rounded-[48px] p-3 shadow-2xl transition-all duration-300 border-4 ${
          isDark 
            ? 'bg-slate-900 border-slate-700 shadow-blue-950/40' 
            : 'bg-slate-800 border-slate-600 shadow-slate-950/30'
        }`}
      >
        {/* Device Volume / Power Buttons Accent */}
        <div className="absolute -left-[7px] top-28 w-[3px] h-12 bg-slate-600 rounded-l-sm" />
        <div className="absolute -left-[7px] top-44 w-[3px] h-12 bg-slate-600 rounded-l-sm" />
        <div className="absolute -right-[7px] top-32 w-[3px] h-16 bg-slate-600 rounded-r-sm" />

        {/* Screen Glass Area */}
        <div 
          className={`relative w-full h-full rounded-[38px] overflow-hidden flex flex-col font-sans transition-colors duration-200 select-none ${
            isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
          }`}
        >
          {/* Status Bar */}
          <div className="h-9 px-6 flex items-center justify-between text-xs font-semibold z-30 pt-1 shrink-0">
            <span className="text-[13px] tracking-tight">{currentTime}</span>
            {/* Camera Punch Hole */}
            <div className="w-4 h-4 rounded-full bg-black ring-2 ring-slate-800/60 shadow-inner -mt-1 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-900 ring-1 ring-cyan-900" />
            </div>
            <div className="flex items-center gap-1.5 text-xs opacity-80">
              <Signal size={12} />
              <Wifi size={13} />
              <BatteryMedium size={14} />
            </div>
          </div>

          {/* Active Error Simulation Banner if enabled */}
          {isNetworkErrorSimulated && (
            <div className="bg-red-600 text-white text-[11px] font-bold px-3 py-1 flex items-center justify-between z-30">
              <span>⚠️ Network Failure Simulated (Testing Retry)</span>
              <button 
                onClick={onToggleNetworkError}
                className="underline text-[10px] bg-red-700 px-1.5 py-0.5 rounded cursor-pointer"
              >
                Disable
              </button>
            </div>
          )}

          {/* Screen Body */}
          <div className="flex-1 overflow-y-auto no-scrollbar relative flex flex-col">
            {children}
          </div>

          {/* Material 3 Bottom Navigation Bar */}
          <div 
            className={`h-16 px-2 flex items-center justify-around border-t z-20 shrink-0 ${
              isDark 
                ? 'bg-slate-900/95 border-slate-800/80 text-slate-400' 
                : 'bg-white/95 border-slate-200 text-slate-600 shadow-sm'
            }`}
          >
            {/* Home Tab */}
            <button
              onClick={() => onSelectTab('home')}
              className={`flex flex-col items-center justify-center w-16 py-1 cursor-pointer transition-colors ${
                activeTab === 'home' 
                  ? 'text-red-600 font-bold' 
                  : 'hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <div className={`px-4 py-0.5 rounded-full transition-all ${
                activeTab === 'home' 
                  ? isDark ? 'bg-red-950/60' : 'bg-red-50 text-red-600' 
                  : ''
              }`}>
                <svg className="w-5 h-5" fill={activeTab === 'home' ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <span className="text-[10px] mt-0.5">Home</span>
            </button>

            {/* Categories Tab */}
            <button
              onClick={() => onSelectTab('categories')}
              className={`flex flex-col items-center justify-center w-16 py-1 cursor-pointer transition-colors ${
                activeTab === 'categories' 
                  ? 'text-red-600 font-bold' 
                  : 'hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <div className={`px-4 py-0.5 rounded-full transition-all ${
                activeTab === 'categories' 
                  ? isDark ? 'bg-red-950/60' : 'bg-red-50 text-red-600' 
                  : ''
              }`}>
                <svg className="w-5 h-5" fill={activeTab === 'categories' ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </div>
              <span className="text-[10px] mt-0.5">Categories</span>
            </button>

            {/* Search Tab */}
            <button
              onClick={() => onSelectTab('search')}
              className={`flex flex-col items-center justify-center w-16 py-1 cursor-pointer transition-colors ${
                activeTab === 'search' 
                  ? 'text-red-600 font-bold' 
                  : 'hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <div className={`px-4 py-0.5 rounded-full transition-all ${
                activeTab === 'search' 
                  ? isDark ? 'bg-red-950/60' : 'bg-red-50 text-red-600' 
                  : ''
              }`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <span className="text-[10px] mt-0.5">Search</span>
            </button>

            {/* Bookmarks Tab */}
            <button
              onClick={() => onSelectTab('bookmarks')}
              className={`flex flex-col items-center justify-center w-16 py-1 cursor-pointer transition-colors ${
                activeTab === 'bookmarks' 
                  ? 'text-red-600 font-bold' 
                  : 'hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <div className={`px-4 py-0.5 rounded-full transition-all ${
                activeTab === 'bookmarks' 
                  ? isDark ? 'bg-red-950/60' : 'bg-red-50 text-red-600' 
                  : ''
              }`}>
                <svg className="w-5 h-5" fill={activeTab === 'bookmarks' ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
              </div>
              <span className="text-[10px] mt-0.5">Saved</span>
            </button>
          </div>

          {/* Android System Navigation Indicator Bar */}
          <div className="h-3 flex items-center justify-center shrink-0 pb-1">
            <div className={`w-32 h-1 rounded-full ${isDark ? 'bg-slate-700' : 'bg-slate-300'}`} />
          </div>
        </div>
      </div>
    </div>
  );
};
