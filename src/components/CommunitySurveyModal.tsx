import React, { useState, useEffect } from 'react';
import { 
  X, 
  ExternalLink, 
  ShieldCheck, 
  Sparkles, 
  Clock, 
  FileSpreadsheet, 
  CheckCircle2, 
  Users, 
  HelpCircle,
  Maximize2,
  RefreshCw
} from 'lucide-react';
import { AdminStore } from '../data/adminStore';

interface CommunitySurveyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommunitySurveyModal: React.FC<CommunitySurveyModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [googleConfig, setGoogleConfig] = useState(() => AdminStore.getGoogleConfig());
  const [effectiveCount, setEffectiveCount] = useState(() => AdminStore.getEffectiveCommunityCount());
  const [isLoadingIframe, setIsLoadingIframe] = useState(true);
  const [viewMode, setViewMode] = useState<'embedded' | 'overview'>('embedded');

  useEffect(() => {
    const handleUpdate = () => {
      setGoogleConfig(AdminStore.getGoogleConfig());
      setEffectiveCount(AdminStore.getEffectiveCommunityCount());
    };
    window.addEventListener('ftg_store_update', handleUpdate);
    window.addEventListener('ftg_google_config_updated', handleUpdate);
    return () => {
      window.removeEventListener('ftg_store_update', handleUpdate);
      window.removeEventListener('ftg_google_config_updated', handleUpdate);
    };
  }, []);

  if (!isOpen) return null;

  // Use configured form URL or fallback to the official community survey form
  const formUrl = googleConfig.communityFormUrl || 'https://docs.google.com/forms/d/e/1FAIpQLSdUbd7uHKfjodSI6qiixViDSO03lpE9fLEEzvqxs5uw9jWgtg/viewform?usp=header';
  const embedUrl = formUrl.includes('embedded=true') ? formUrl : `${formUrl}${formUrl.includes('?') ? '&' : '?'}embedded=true`;

  const handleOpenExternal = () => {
    window.open(formUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      id="community-survey-modal-overlay"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 md:p-6 transition-all duration-300"
    >
      <div
        id="community-survey-modal-content"
        className="relative bg-slate-900 border border-slate-700/80 rounded-3xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden text-slate-100"
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-5 sm:px-8 py-4 sm:py-5 border-b border-slate-800 bg-slate-950/70 backdrop-blur-md shrink-0">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-[#F3BA4F] shadow-xs">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-black text-white tracking-tight">
                  Community Voice Survey
                </h2>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-400/10 text-amber-300 border border-amber-400/20">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  Live Sync
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Helping map gaps in Newfoundland & Labrador community services
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleOpenExternal}
              title="Open survey in new tab"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
              <span>Open in New Tab</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-all cursor-pointer"
              aria-label="Close survey modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Live Status & Quick Info Bar */}
        <div className="px-5 sm:px-8 py-2.5 bg-slate-950/40 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-300">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-medium text-amber-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
              <span>{effectiveCount} Community Responses Logged</span>
            </span>
            <span className="hidden md:inline-flex items-center gap-1 text-slate-400">
              <Clock className="w-3.5 h-3.5" />
              <span>Takes ~3 to 5 minutes</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-[11px] text-slate-400 bg-slate-800/60 px-2.5 py-1 rounded-lg border border-slate-700/50">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>100% Confidential & Secure</span>
            </span>
          </div>
        </div>

        {/* Modal Body: Embedded Google Form */}
        <div className="flex-1 overflow-y-auto p-2 sm:p-4 bg-slate-900/50 flex flex-col relative min-h-[420px]">
          {isLoadingIframe && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/90 z-10 gap-3">
              <RefreshCw className="w-8 h-8 text-amber-400 animate-spin" />
              <p className="text-sm font-medium text-slate-300">Loading Secure Community Survey...</p>
              <button
                onClick={handleOpenExternal}
                className="mt-2 text-xs text-amber-400 hover:underline flex items-center gap-1"
              >
                <span>Taking too long? Open in new window</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          )}

          <div className="w-full h-full min-h-[560px] rounded-2xl overflow-hidden border border-slate-800 bg-white shadow-inner flex-1">
            <iframe
              src={embedUrl}
              title="Fill The Gap Community Survey"
              className="w-full h-full min-h-[560px] border-0"
              onLoad={() => setIsLoadingIframe(false)}
            >
              Loading survey...
            </iframe>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-5 sm:px-8 py-3.5 border-t border-slate-800 bg-slate-950/70 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <FileSpreadsheet className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Responses sync automatically to the official Fill The Gap analytics ledger.</span>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            <button
              onClick={handleOpenExternal}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold transition-all shadow-md cursor-pointer"
            >
              <span>Open in Full Window</span>
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold transition-all cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
