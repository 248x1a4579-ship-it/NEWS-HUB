import React, { useState } from 'react';
import { Copy, Check, FileCode, Terminal, User, BookOpen } from 'lucide-react';
import { FlutterFile } from '../../types';

interface CodeViewerProps {
  file: FlutterFile;
}

export const CodeViewer: React.FC<CodeViewerProps> = ({ file }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard?.writeText?.(file.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = file.code.split('\n');

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-950 overflow-hidden">
      {/* File Header & Action Bar */}
      <div className="px-4 py-3 bg-slate-900 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="p-1.5 rounded-lg bg-blue-600/20 text-blue-400">
            <FileCode size={18} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-slate-100">
                {file.path}
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-950 text-blue-300 border border-blue-800 font-semibold">
                Assigned: {file.student}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 truncate max-w-xl">
              {file.purpose}
            </p>
          </div>
        </div>

        {/* Copy Button */}
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold transition-all shadow cursor-pointer"
        >
          {copied ? <Check size={14} className="text-white" /> : <Copy size={14} />}
          <span>{copied ? 'Copied to Clipboard!' : 'Copy Code'}</span>
        </button>
      </div>

      {/* Beginner Instruction Strip */}
      <div className="px-4 py-2 bg-slate-900/40 border-b border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Terminal size={13} className="text-emerald-400" />
          <span>
            Create this file inside <code className="text-cyan-300 font-mono">news_hub/{file.path}</code>
          </span>
        </div>
        <span className="text-slate-500 font-mono text-[10px]">
          {lines.length} lines • Dart / Flutter
        </span>
      </div>

      {/* Code Area with Line Numbers */}
      <div className="flex-1 overflow-auto p-4 font-mono text-xs leading-relaxed text-slate-200 select-text">
        <div className="flex min-w-max">
          {/* Line Numbers */}
          <div className="select-none text-slate-600 text-right pr-4 border-r border-slate-800 shrink-0 font-mono text-[11px]">
            {lines.map((_, i) => (
              <div key={i}>{i + 1}</div>
            ))}
          </div>

          {/* Actual Code */}
          <pre className="pl-4 font-mono text-[12px] text-slate-200">
            <code>{file.code}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};
