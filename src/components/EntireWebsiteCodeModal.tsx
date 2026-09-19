import React, { useState } from 'react';
import { 
  Code2, 
  Download, 
  Copy, 
  Check, 
  FileText, 
  FolderTree, 
  Sparkles,
  FileCode,
  ArrowDownToLine,
  FileJson,
  CodeXml,
  X,
  CheckCircle2
} from 'lucide-react';
import JSZip from 'jszip';
import { getAllProjectFiles, getFullProjectMarkdown } from '../lib/sourceCodeProvider';
import { downloadEntireWebsiteZip } from '../lib/zipExporter';

interface EntireWebsiteCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenFullTab: () => void;
}

export const EntireWebsiteCodeModal: React.FC<EntireWebsiteCodeModalProps> = ({
  isOpen,
  onClose,
  onOpenFullTab
}) => {
  const [copiedAll, setCopiedAll] = useState(false);
  const [copiedJSON, setCopiedJSON] = useState(false);
  const [isZipping, setIsZipping] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const files = getAllProjectFiles();
  const totalLines = files.reduce((acc, f) => acc + f.lines, 0);
  const totalBytes = files.reduce((acc, f) => acc + f.size, 0);

  const flashStatus = (msg: string) => {
    setStatusMessage(msg);
    setTimeout(() => setStatusMessage(null), 3500);
  };

  // Option 1: Download ZIP
  const handleDownloadZip = async () => {
    try {
      setIsZipping(true);
      const res = await downloadEntireWebsiteZip((progress) => {
        setStatusMessage(`📦 ${progress.message}`);
      });
      if (res.success) {
        flashStatus(`📦 Entire website ZIP archive (${res.filename}) downloaded successfully!`);
      } else {
        alert('Failed to generate zip: ' + (res.error || 'Unknown error'));
      }
    } catch (e: any) {
      console.error(e);
      alert('Failed to generate zip: ' + e?.message);
    } finally {
      setIsZipping(false);
    }
  };

  // Option 2: Copy All Markdown
  const handleCopyAll = async () => {
    try {
      const fullText = getFullProjectMarkdown();
      await navigator.clipboard.writeText(fullText);
      setCopiedAll(true);
      flashStatus(`✅ Copied entire codebase (${files.length} files, ${totalLines.toLocaleString()} lines) to clipboard!`);
      setTimeout(() => setCopiedAll(false), 3000);
    } catch (e) {
      console.error(e);
    }
  };

  // Option 3: Download Markdown
  const handleDownloadMarkdown = () => {
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
    flashStatus('📄 Downloaded entire codebase as Markdown (.md)!');
  };

  // Option 4: Download JSON
  const handleDownloadJSON = () => {
    const jsonStr = JSON.stringify({
      project: "Fill The Gap (FTG)",
      exportedAt: new Date().toISOString(),
      totalFiles: files.length,
      totalLines,
      files: files.map(f => ({
        path: f.path,
        name: f.name,
        category: f.category,
        lines: f.lines,
        sizeBytes: f.size,
        content: f.content
      }))
    }, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `fillthegap-codebase-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    flashStatus('📄 Downloaded complete codebase JSON archive!');
  };

  // Option 5: Copy JSON
  const handleCopyJSON = async () => {
    try {
      const jsonStr = JSON.stringify({
        project: "Fill The Gap (FTG)",
        exportedAt: new Date().toISOString(),
        totalFiles: files.length,
        totalLines,
        files: files.map(f => ({
          path: f.path,
          name: f.name,
          category: f.category,
          lines: f.lines,
          sizeBytes: f.size,
          content: f.content
        }))
      }, null, 2);
      await navigator.clipboard.writeText(jsonStr);
      setCopiedJSON(true);
      flashStatus('✅ Copied entire codebase as JSON to clipboard!');
      setTimeout(() => setCopiedJSON(false), 3000);
    } catch (e) {
      console.error(e);
    }
  };

  // Option 6: Standalone HTML
  const handleDownloadHTML = () => {
    const fullText = getFullProjectMarkdown();
    const htmlContent = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8"><title>Fill The Gap - Entire Source Code</title>
  <style>body{font-family:monospace;background:#0f172a;color:#f8fafc;padding:24px;} pre{background:#020617;padding:16px;border-radius:8px;overflow-x:auto;white-space:pre-wrap;}</style>
</head>
<body>
  <h1>Fill The Gap (FTG) - Source Code Export</h1>
  <p>Generated: ${new Date().toLocaleString()} | ${files.length} Files | ${totalLines.toLocaleString()} Lines</p>
  <pre>${fullText.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</pre>
</body>
</html>`;
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `fillthegap-standalone-viewer-${new Date().toISOString().slice(0, 10)}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    flashStatus('🌐 Downloaded standalone HTML viewer!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 border-2 border-indigo-500/50 shadow-2xl p-6 sm:p-8 text-white space-y-6">
        
        {/* Toast */}
        {statusMessage && (
          <div className="sticky top-0 z-50 flex items-center justify-between gap-3 px-5 py-3 rounded-xl bg-emerald-600 text-white font-bold text-sm shadow-2xl">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              <span>{statusMessage}</span>
            </div>
            <button onClick={() => setStatusMessage(null)} className="text-white/80 hover:text-white text-xs underline cursor-pointer">
              Dismiss
            </button>
          </div>
        )}

        {/* Modal Header */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-5">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-black tracking-wider uppercase border border-indigo-400/40">
              <Code2 className="w-4 h-4 text-indigo-400 animate-pulse" />
              All Export & Code Options Available
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              Entire Website Source Code Options
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm max-w-2xl">
              Choose from all available export options to download, copy, inspect, or archive the complete codebase for Fill The Gap:
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer border border-slate-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stats Pill Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-left font-mono">
            <div className="text-[10px] text-slate-400 font-bold uppercase">Files</div>
            <div className="text-lg font-black text-emerald-400">{files.length} Files</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-left font-mono">
            <div className="text-[10px] text-slate-400 font-bold uppercase">Lines</div>
            <div className="text-lg font-black text-cyan-400">{totalLines.toLocaleString()}</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-left font-mono">
            <div className="text-[10px] text-slate-400 font-bold uppercase">Size</div>
            <div className="text-lg font-black text-indigo-300">{(totalBytes / 1024).toFixed(1)} KB</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-left font-mono">
            <div className="text-[10px] text-slate-400 font-bold uppercase">Database</div>
            <div className="text-lg font-black text-amber-400">Google Sheets</div>
          </div>
        </div>

        {/* The 4 Major Options Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Option 1 */}
          <button
            onClick={handleDownloadZip}
            disabled={isZipping}
            className="p-4 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white shadow-xl border border-emerald-400/40 text-left transition-all active:scale-[0.98] cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="p-2 rounded-xl bg-emerald-950/60 text-emerald-200">
                  <Download className="w-5 h-5" />
                </span>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-900 text-emerald-200">
                  Runnable ZIP
                </span>
              </div>
              <div className="text-base font-black text-white">1. Download Complete Project (.ZIP)</div>
              <p className="text-xs text-emerald-100/90 mt-1">
                Packages all source files, configs, package.json, and styles into a ready-to-run folder.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-emerald-400/30 text-xs font-bold text-emerald-200 flex items-center gap-1">
              Click to Download ZIP &rarr;
            </div>
          </button>

          {/* Option 2 */}
          <button
            onClick={handleCopyAll}
            className="p-4 rounded-2xl bg-gradient-to-br from-indigo-600 to-indigo-800 hover:from-indigo-500 hover:to-indigo-700 text-white shadow-xl border border-indigo-400/40 text-left transition-all active:scale-[0.98] cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="p-2 rounded-xl bg-indigo-950/60 text-indigo-200">
                  {copiedAll ? <Check className="w-5 h-5 text-emerald-300" /> : <Copy className="w-5 h-5" />}
                </span>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-indigo-900 text-indigo-200">
                  1-Click Copy
                </span>
              </div>
              <div className="text-base font-black text-white">2. Copy All Website Code</div>
              <p className="text-xs text-indigo-100/90 mt-1">
                Copies all formatted code across all files with line numbers and file fences to your clipboard.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-indigo-400/30 text-xs font-bold text-indigo-200 flex items-center gap-1">
              {copiedAll ? 'Copied to Clipboard!' : 'Click to Copy All &rarr;'}
            </div>
          </button>

          {/* Option 3 */}
          <button
            onClick={handleDownloadMarkdown}
            className="p-4 rounded-2xl bg-gradient-to-br from-cyan-700 to-blue-800 hover:from-cyan-600 hover:to-blue-700 text-white shadow-xl border border-cyan-400/40 text-left transition-all active:scale-[0.98] cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="p-2 rounded-xl bg-cyan-950/60 text-cyan-200">
                  <ArrowDownToLine className="w-5 h-5" />
                </span>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-cyan-900 text-cyan-200">
                  Markdown Document
                </span>
              </div>
              <div className="text-base font-black text-white">3. Download All-in-One File (.md)</div>
              <p className="text-xs text-cyan-100/90 mt-1">
                Downloads a single combined document holding literally every file cleanly formatted.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-cyan-400/30 text-xs font-bold text-cyan-200 flex items-center gap-1">
              Click to Download Markdown &rarr;
            </div>
          </button>

          {/* Option 4 */}
          <button
            onClick={handleDownloadJSON}
            className="p-4 rounded-2xl bg-gradient-to-br from-purple-700 to-purple-900 hover:from-purple-600 hover:to-purple-800 text-white shadow-xl border border-purple-400/40 text-left transition-all active:scale-[0.98] cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="p-2 rounded-xl bg-purple-950/60 text-purple-200">
                  <FileJson className="w-5 h-5" />
                </span>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-purple-900 text-purple-200">
                  JSON Representation
                </span>
              </div>
              <div className="text-base font-black text-white">4. Export Complete JSON Backup (.json)</div>
              <p className="text-xs text-purple-100/90 mt-1">
                Machine-readable JSON archive containing every file path, byte, and source block.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-purple-400/30 text-xs font-bold text-purple-200 flex items-center gap-1">
              Click to Download JSON &rarr;
            </div>
          </button>
        </div>

        {/* Extra Quick Options & Full Tab Jump */}
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleCopyJSON}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-700"
            >
              <FileJson className="w-3.5 h-3.5 text-purple-400" />
              {copiedJSON ? 'Copied JSON!' : 'Copy as JSON'}
            </button>

            <button
              onClick={handleDownloadHTML}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-700"
            >
              <CodeXml className="w-3.5 h-3.5 text-amber-400" />
              Download Standalone HTML (.html)
            </button>
          </div>

          <button
            onClick={() => {
              onClose();
              onOpenFullTab();
            }}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-indigo-950 cursor-pointer border border-indigo-400/50"
          >
            <FolderTree className="w-4 h-4 text-indigo-300" />
            Open Interactive Code Explorer &rarr;
          </button>
        </div>

      </div>
    </div>
  );
};
