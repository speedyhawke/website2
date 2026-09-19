import React, { useState, useMemo } from 'react';
import { 
  Code2, 
  Download, 
  Copy, 
  Check, 
  FileText, 
  FolderTree, 
  Search, 
  ExternalLink, 
  Layers, 
  Terminal, 
  Database, 
  Sparkles,
  PackageCheck,
  Eye,
  FileCode,
  Archive,
  ArrowDownToLine,
  ListFilter
} from 'lucide-react';
import JSZip from 'jszip';
import { getAllProjectFiles, getFullProjectMarkdown, ProjectFile } from '../lib/sourceCodeProvider';
import { downloadEntireWebsiteZip } from '../lib/zipExporter';

interface EntireWebsiteCodeViewProps {
  onClose?: () => void;
}

export const EntireWebsiteCodeView: React.FC<EntireWebsiteCodeViewProps> = ({ onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedFilePath, setSelectedFilePath] = useState<string>('src/App.tsx');
  const [copiedAll, setCopiedAll] = useState<boolean>(false);
  const [copiedCurrent, setCopiedCurrent] = useState<boolean>(false);
  const [isZipping, setIsZipping] = useState<boolean>(false);
  const [zipProgressMsg, setZipProgressMsg] = useState<string>('');
  const [viewMode, setViewMode] = useState<'EXPLORER' | 'MONOLITHIC'>('EXPLORER');

  const files = useMemo(() => getAllProjectFiles(), []);

  const totalLines = useMemo(() => files.reduce((acc, f) => acc + f.lines, 0), [files]);
  const totalBytes = useMemo(() => files.reduce((acc, f) => acc + f.size, 0), [files]);

  const categories = useMemo(() => {
    const cats = ['ALL', ...Array.from(new Set(files.map(f => f.category)))];
    return cats;
  }, [files]);

  const filteredFiles = useMemo(() => {
    return files.filter(f => {
      const matchCat = selectedCategory === 'ALL' || f.category === selectedCategory;
      const matchSearch = searchQuery.trim() === '' || 
        f.path.toLowerCase().includes(searchQuery.toLowerCase()) || 
        f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.content.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [files, selectedCategory, searchQuery]);

  const selectedFile = useMemo(() => {
    return files.find(f => f.path === selectedFilePath) || filteredFiles[0] || files[0];
  }, [files, selectedFilePath, filteredFiles]);

  const handleCopyAllCode = async () => {
    try {
      const fullText = getFullProjectMarkdown();
      await navigator.clipboard.writeText(fullText);
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 3000);
    } catch (e) {
      console.error('Failed to copy all code', e);
    }
  };

  const handleCopySingleFile = async () => {
    if (!selectedFile) return;
    try {
      await navigator.clipboard.writeText(selectedFile.content);
      setCopiedCurrent(true);
      setTimeout(() => setCopiedCurrent(false), 2500);
    } catch (e) {
      console.error('Failed to copy file code', e);
    }
  };

  const handleDownloadZip = async () => {
    try {
      setIsZipping(true);
      const res = await downloadEntireWebsiteZip((prog) => {
        setZipProgressMsg(prog.message);
      });
      if (!res.success) {
        alert('Could not generate ZIP: ' + (res.error || 'Unknown error'));
      }
    } catch (e: any) {
      console.error('Error generating zip', e);
      alert('Could not generate ZIP automatically: ' + e?.message);
    } finally {
      setIsZipping(false);
      setTimeout(() => setZipProgressMsg(''), 4000);
    }
  };

  const handleDownloadCombinedText = () => {
    const fullText = getFullProjectMarkdown();
    const blob = new Blob([fullText], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `fillthegap-entire-codebase-${new Date().toISOString().slice(0, 10)}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadSingleFile = () => {
    if (!selectedFile) return;
    const blob = new Blob([selectedFile.content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = selectedFile.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div id="entire-website-code-view" className="space-y-6">
      {/* Master Hero Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 border-2 border-indigo-500/40 p-6 md:p-8 text-white shadow-2xl">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-12 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold tracking-wide">
              <Code2 className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
              100% COMPLETE LIVE SOURCE CODE REPOSITORY
            </div>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white flex items-center gap-3">
              Entire Website Source Code
            </h2>
            <p className="text-slate-300 text-sm md:text-base max-w-2xl">
              Instant access to literally every line of code, component, database schema, and style powering the entire Fill The Gap platform. Download as a runnable project ZIP, copy the entire repository, or inspect individual files.
            </p>

            {/* Quick Metrics Bar */}
            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-slate-300">
              <span className="px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/60 font-mono text-emerald-400 font-bold flex items-center gap-1.5">
                <FolderTree className="w-3.5 h-3.5" />
                {files.length} Source Files
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/60 font-mono text-cyan-400 font-bold flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5" />
                {totalLines.toLocaleString()} Lines of Code
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/60 font-mono text-indigo-300 font-bold flex items-center gap-1.5">
                <Archive className="w-3.5 h-3.5" />
                {(totalBytes / 1024).toFixed(1)} KB Total
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/60 font-mono text-amber-300 font-bold flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5" />
                Google Sheets Ready
              </span>
            </div>
          </div>

          {/* Master Export Actions */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 min-w-[260px]">
            <button
              id="download-entire-zip-btn"
              onClick={handleDownloadZip}
              disabled={isZipping}
              className="w-full inline-flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-sm shadow-lg shadow-emerald-900/40 transition-all active:scale-[0.98] cursor-pointer disabled:opacity-50"
            >
              {isZipping ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Generating Project ZIP...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  Download Complete Project (.ZIP)
                </>
              )}
            </button>

            <button
              id="copy-all-code-btn"
              onClick={handleCopyAllCode}
              className="w-full inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-md transition-all active:scale-[0.98] cursor-pointer"
            >
              {copiedAll ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  Copied All {files.length} Files to Clipboard!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy All Website Code
                </>
              )}
            </button>

            <button
              id="download-monolith-btn"
              onClick={handleDownloadCombinedText}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 hover:text-white font-semibold text-xs border border-slate-700 transition-all cursor-pointer"
            >
              <ArrowDownToLine className="w-3.5 h-3.5" />
              Download All in One File (.md)
            </button>
          </div>
        </div>
      </div>

      {/* Mode Selector & Quick Filters Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        {/* View Mode Toggle */}
        <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
          <button
            onClick={() => setViewMode('EXPLORER')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'EXPLORER'
                ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <FolderTree className="w-3.5 h-3.5" />
            File Explorer View
          </button>
          <button
            onClick={() => setViewMode('MONOLITHIC')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'MONOLITHIC'
                ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            All Code in One Stream
          </button>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white font-bold shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      {viewMode === 'EXPLORER' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* File Tree & Search (Left Column) */}
          <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm flex flex-col h-[750px]">
            <div className="p-3.5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 space-y-2">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search file name or code..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-1.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 px-1">
                <span>Showing {filteredFiles.length} of {files.length} files</span>
                <span>Click any file to inspect</span>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/60 p-1">
              {filteredFiles.map(file => {
                const isSelected = selectedFile?.path === file.path;
                return (
                  <button
                    key={file.path}
                    onClick={() => setSelectedFilePath(file.path)}
                    className={`w-full text-left px-3 py-2.5 rounded-lg transition-all flex items-start justify-between gap-2 cursor-pointer group ${
                      isSelected
                        ? 'bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800/80 text-indigo-950 dark:text-indigo-200 font-semibold'
                        : 'hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <div className="flex items-start gap-2.5 min-w-0">
                      <FileCode className={`w-4 h-4 mt-0.5 shrink-0 ${isSelected ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400 group-hover:text-indigo-500'}`} />
                      <div className="min-w-0">
                        <div className="text-xs font-mono truncate">{file.name}</div>
                        <div className="text-[10px] text-slate-400 dark:text-slate-500 truncate font-mono">{file.path}</div>
                      </div>
                    </div>
                    <div className="shrink-0 text-right">
                      <span className="text-[10px] font-mono text-slate-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">
                        {file.lines}L
                      </span>
                    </div>
                  </button>
                );
              })}
              {filteredFiles.length === 0 && (
                <div className="p-8 text-center text-slate-400 text-xs">
                  No files match "{searchQuery}"
                </div>
              )}
            </div>
          </div>

          {/* Active Code Viewer (Right Column) */}
          <div className="lg:col-span-8 bg-slate-950 rounded-xl border border-slate-800 overflow-hidden shadow-xl flex flex-col h-[750px]">
            {/* Editor Header */}
            <div className="px-4 py-3 bg-slate-900 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <div className="text-xs font-mono font-bold text-slate-200 truncate">
                  {selectedFile?.path}
                </div>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 text-[10px] font-mono">
                  {selectedFile?.category}
                </span>
                <span className="text-slate-400 text-[11px] font-mono">
                  {selectedFile?.lines} lines • {((selectedFile?.size || 0) / 1024).toFixed(1)} KB
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopySingleFile}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600/90 hover:bg-indigo-600 text-white font-medium text-xs transition-all active:scale-95 cursor-pointer"
                >
                  {copiedCurrent ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-300" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      Copy File
                    </>
                  )}
                </button>
                <button
                  onClick={handleDownloadSingleFile}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs transition-all cursor-pointer"
                  title="Download this file"
                >
                  <Download className="w-3.5 h-3.5" />
                  Save
                </button>
              </div>
            </div>

            {/* Code Body with Line Numbers */}
            <div className="flex-1 overflow-auto bg-slate-950 p-4 font-mono text-xs text-slate-300 leading-relaxed select-text">
              <pre className="relative tab-2">
                <code>
                  {selectedFile?.content.split('\n').map((line, idx) => (
                    <div key={idx} className="flex hover:bg-slate-900/60 py-0.5 rounded">
                      <span className="select-none text-slate-600 w-12 shrink-0 text-right pr-4 font-mono text-[11px]">
                        {idx + 1}
                      </span>
                      <span className="break-all whitespace-pre-wrap flex-1 text-slate-200">
                        {line}
                      </span>
                    </div>
                  ))}
                </code>
              </pre>
            </div>
          </div>
        </div>
      ) : (
        /* Monolithic Stream View */
        <div className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden shadow-2xl">
          <div className="p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
            <div className="text-sm font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-400" />
              Complete Sequential Monolithic Code Stream ({files.length} Files Combined)
            </div>
            <button
              onClick={handleCopyAllCode}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs cursor-pointer shadow"
            >
              {copiedAll ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
              {copiedAll ? 'Copied Entire Codebase!' : 'Copy All Code to Clipboard'}
            </button>
          </div>
          <div className="max-h-[800px] overflow-auto p-6 font-mono text-xs text-slate-300 leading-relaxed">
            {files.map((f, i) => (
              <div key={f.path} className="mb-12 border border-slate-800 rounded-xl overflow-hidden bg-slate-900/80">
                <div className="px-4 py-2.5 bg-slate-800 border-b border-slate-700 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-amber-400 font-bold">#{i + 1}</span>
                    <span className="text-white font-bold">{f.path}</span>
                    <span className="text-slate-400 text-[11px]">({f.lines} lines)</span>
                  </div>
                  <button
                    onClick={() => navigator.clipboard.writeText(f.content)}
                    className="text-xs text-indigo-300 hover:text-white px-2 py-1 rounded bg-slate-700 hover:bg-indigo-600 transition-all cursor-pointer"
                  >
                    Copy This File
                  </button>
                </div>
                <pre className="p-4 overflow-x-auto text-[11px] text-slate-300 bg-slate-950">
                  <code>{f.content}</code>
                </pre>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
