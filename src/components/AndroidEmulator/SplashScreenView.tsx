import React, { useEffect } from 'react';
import { Newspaper, Loader2, Sparkles } from 'lucide-react';

interface SplashScreenViewProps {
  onFinish: () => void;
}

export const SplashScreenView: React.FC<SplashScreenViewProps> = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 2400);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="flex-1 bg-[#0A192F] flex flex-col items-center justify-center p-6 text-white text-center relative overflow-hidden select-none">
      {/* Background radial accent glow */}
      <div className="absolute w-72 h-72 rounded-full bg-blue-700/20 blur-3xl pointer-events-none" />
      <div className="absolute w-44 h-44 rounded-full bg-red-600/15 blur-2xl top-1/3 pointer-events-none" />

      {/* Pulsing Animated Brand Badge */}
      <div className="relative mb-6">
        <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#1E3A8A] via-[#1E40AF] to-[#DC2626] flex items-center justify-center shadow-xl shadow-red-900/40 ring-4 ring-white/10 animate-bounce duration-1000">
          <Newspaper className="w-12 h-12 text-white stroke-[2.2]" />
        </div>
        <div className="absolute -top-1 -right-1 bg-red-600 rounded-full p-1 shadow-md animate-pulse">
          <Sparkles className="w-3.5 h-3.5 text-white" />
        </div>
      </div>

      {/* Typography */}
      <div className="space-y-2 mb-8">
        <h1 className="text-3xl font-extrabold tracking-wider flex items-center justify-center gap-1.5">
          <span className="text-white">NEWS</span>
          <span className="text-[#DC2626] font-black">HUB</span>
        </h1>
        <p className="text-xs text-blue-200/80 font-medium tracking-wide">
          Instant • Verified • Global Headlines
        </p>
      </div>

      {/* Loading Spinner */}
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="w-7 h-7 text-[#DC2626] animate-spin" />
        <span className="text-[11px] text-slate-400 font-mono tracking-wider">
          Initializing Flutter Provider...
        </span>
      </div>

      {/* Skip Button for impatient tester */}
      <button
        onClick={onFinish}
        className="mt-12 text-[11px] text-slate-400 hover:text-white underline cursor-pointer transition-colors"
      >
        Skip Splash Animation →
      </button>

      {/* Footer college watermark */}
      <div className="absolute bottom-4 text-[10px] text-slate-500 font-mono">
        College Project • 3-Student Team
      </div>
    </div>
  );
};
