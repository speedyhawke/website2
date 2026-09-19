import React, { useState } from 'react';
import { ShieldCheck, MapPin, ExternalLink, Sparkles, CheckCircle2, Clock, FileSpreadsheet, Maximize2 } from 'lucide-react';
import { AdminStore } from '../data/adminStore';

interface SurveyViewProps {
  onOpenDetailedSurvey?: () => void;
  onNavigateToResources?: () => void;
}

export const SurveyView: React.FC<SurveyViewProps> = ({ onNavigateToResources }) => {
  const [googleConfig] = useState(() => AdminStore.getGoogleConfig());
  const formUrl = googleConfig.communityFormUrl || 'https://docs.google.com/forms/d/e/1FAIpQLSdUbd7uHKfjodSI6qiixViDSO03lpE9fLEEzvqxs5uw9jWgtg/viewform?usp=header';
  const embedUrl = formUrl.includes('embedded=true') ? formUrl : `${formUrl}${formUrl.includes('?') ? '&' : '?'}embedded=true`;

  const handleOpenExternal = () => {
    window.open(formUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Title & Intro */}
      <div className="border-b border-slate-200 pb-6 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <span className="text-[11px] font-black uppercase tracking-wider text-slate-800 bg-slate-100 px-3.5 py-1 rounded-full border border-slate-200 inline-flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-slate-800" />
            Official St. John's & Newfoundland Community Survey
          </span>

          <button
            onClick={handleOpenExternal}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer"
          >
            <span>Open in Full Google Window</span>
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>

        <h1
          className="text-3xl sm:text-5xl font-black text-[#0f172a] tracking-tight uppercase"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          COMMUNITY VOICE & GAPS SURVEY
        </h1>
        <p className="text-sm sm:text-base text-stone-700 font-medium max-w-3xl leading-relaxed">
          We don't want to guess what our community needs. Your responses help map real service gaps across St. John's and Newfoundland & Labrador.
        </p>
      </div>

      {/* Embedded Google Form Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden flex flex-col">
        {/* Info Ribbon */}
        <div className="px-6 py-3.5 bg-slate-900 text-slate-200 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 text-amber-300 font-bold">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Official Google Forms Integration</span>
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 text-slate-400">
              <Clock className="w-3.5 h-3.5" />
              <span>Takes ~3 to 5 minutes</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-[11px] text-slate-300 bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>100% Anonymous & Confidential</span>
            </span>
          </div>
        </div>

        {/* The Embed Frame */}
        <div className="w-full bg-slate-50 min-h-[750px] relative">
          <iframe
            src={embedUrl}
            title="Official Fill The Gap Community Survey"
            className="w-full h-[850px] border-0"
          >
            Loading survey...
          </iframe>
        </div>

        {/* Bottom Actions */}
        <div className="p-5 bg-slate-100 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2 text-stone-600">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Submissions go directly into the official community research dataset.</span>
          </div>

          <div className="flex items-center gap-3">
            {onNavigateToResources && (
              <button
                type="button"
                onClick={onNavigateToResources}
                className="px-5 py-2.5 rounded-xl border border-slate-300 hover:bg-white text-slate-800 font-bold uppercase tracking-wider text-xs cursor-pointer transition-all"
              >
                Browse Verified Directory
              </button>
            )}
            <button
              type="button"
              onClick={handleOpenExternal}
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-black uppercase tracking-wider text-xs flex items-center gap-2 cursor-pointer transition-all"
            >
              <span>Open in Google Forms</span>
              <Maximize2 className="w-3.5 h-3.5 text-amber-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyView;
