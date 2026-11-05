import React, { useState } from 'react';
import { 
  Folder, 
  FolderOpen, 
  FileCode, 
  FileText, 
  TestTube, 
  User, 
  Filter, 
  Search 
} from 'lucide-react';
import { FlutterFile } from '../../types';

interface FileTreeProps {
  files: FlutterFile[];
  selectedFile: FlutterFile;
  onSelectFile: (file: FlutterFile) => void;
}

export const FileTree: React.FC<FileTreeProps> = ({
  files,
  selectedFile,
  onSelectFile,
}) => {
  const [filterStudent, setFilterStudent] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredFiles = files.filter((file) => {
    const matchesStudent =
      filterStudent === 'All' || file.student === filterStudent;
    const matchesSearch =
      file.path.toLowerCase().includes(searchQuery.toLowerCase()) ||
      file.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStudent && matchesSearch;
  });

  // Group files by folder
  const folders = Array.from(new Set(filteredFiles.map((f) => f.folder)));

  const getStudentBadge = (student: FlutterFile['student']) => {
    switch (student) {
      case 'Student 1':
        return 'bg-amber-500/15 text-amber-300 border-amber-500/30';
      case 'Student 2':
        return 'bg-blue-500/15 text-blue-300 border-blue-500/30';
      case 'Student 3':
        return 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30';
      default:
        return 'bg-purple-500/15 text-purple-300 border-purple-500/30';
    }
  };

  const getFileIcon = (file: FlutterFile) => {
    if (file.path.startsWith('test/')) {
      return <TestTube size={14} className="text-emerald-400 shrink-0" />;
    }
    if (file.path.endsWith('.md')) {
      return <FileText size={14} className="text-blue-400 shrink-0" />;
    }
    if (file.path.endsWith('.yaml')) {
      return <FileCode size={14} className="text-amber-400 shrink-0" />;
    }
    return <FileCode size={14} className="text-cyan-400 shrink-0" />;
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 border-r border-slate-800 text-slate-300 text-xs">
      {/* Search & Student Filter Bar */}
      <div className="p-3 border-b border-slate-800 space-y-2">
        <div className="relative">
          <Search size={13} className="absolute left-2.5 top-2.5 text-slate-500" />
          <input
            type="text"
            placeholder="Filter files..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-2 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs outline-hidden text-slate-200 focus:border-blue-600"
          />
        </div>

        {/* Student Filter Chips */}
        <div className="flex flex-wrap gap-1 text-[10px]">
          {['All', 'Student 1', 'Student 2', 'Student 3'].map((item) => (
            <button
              key={item}
              onClick={() => setFilterStudent(item)}
              className={`px-2 py-0.5 rounded cursor-pointer transition-colors ${
                filterStudent === item
                  ? 'bg-blue-600 text-white font-bold'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Project Structure Header */}
      <div className="px-3 py-2 bg-slate-950/60 border-b border-slate-800/80 flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wider">
        <span>news_hub/</span>
        <span className="text-[10px] text-slate-500 font-mono">
          {filteredFiles.length} files
        </span>
      </div>

      {/* Files List organized by folders */}
      <div className="flex-1 overflow-y-auto p-2 space-y-3">
        {folders.map((folder) => {
          const folderFiles = filteredFiles.filter((f) => f.folder === folder);
          if (folderFiles.length === 0) return null;

          return (
            <div key={folder} className="space-y-0.5">
              <div className="flex items-center gap-1.5 px-2 py-1 text-slate-400 font-mono text-[11px] font-semibold">
                <FolderOpen size={13} className="text-amber-400/80" />
                <span>{folder === 'root' ? '/' : `${folder}/`}</span>
              </div>

              <div className="pl-3 space-y-0.5">
                {folderFiles.map((file) => {
                  const isSelected = selectedFile.path === file.path;

                  return (
                    <button
                      key={file.path}
                      onClick={() => onSelectFile(file)}
                      className={`w-full flex items-center justify-between px-2 py-1.5 rounded-md text-left transition-colors cursor-pointer group ${
                        isSelected
                          ? 'bg-blue-600/20 text-white font-semibold border-l-2 border-blue-500'
                          : 'hover:bg-slate-800/60 text-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 min-w-0 pr-1">
                        {getFileIcon(file)}
                        <span className="truncate font-mono text-xs">{file.name}</span>
                      </div>
                      <span
                        className={`text-[9px] px-1.5 py-0.5 rounded border whitespace-nowrap shrink-0 ${getStudentBadge(
                          file.student
                        )}`}
                      >
                        {file.student.replace('Student ', 'S')}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
