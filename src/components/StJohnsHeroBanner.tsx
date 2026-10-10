import React from 'react';
import {
  MapPin,
  HelpCircle,
  Heart,
  Shield,
  Search,
  Layers,
  Sparkles,
  ArrowRight,
  ClipboardList,
  Briefcase,
  ExternalLink,
} from 'lucide-react';
import { GOFUNDME_CAMPAIGN_URL } from '../data/adminStore';

interface StJohnsHeroHeaderProps {
  onOpenSurvey: () => void;
  onOpenProfessionalSurvey: () => void;
  onNavigateToDonate: () => void;
  onNavigateToNeedHelp?: () => void;
}

export const StJohnsHeroHeader: React.FC<StJohnsHeroHeaderProps> = ({
  onOpenSurvey,
  onOpenProfessionalSurvey,
  onNavigateToDonate,
  onNavigateToNeedHelp,
}) => {
  return (
    <div className="relative w-full bg-[#070b12] text-white border-b border-[#E5A93C]/40 shadow-2xl overflow-hidden min-h-[460px] sm:min-h-[520px] flex flex-col justify-between">
      
      {/* Background St. John's Scenic Photography */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="scenic_nl.jpg"
          alt="Scenic St. John's Newfoundland City View, Harbour, Hills and Coastal Architecture"
          className="w-full h-full object-cover object-[center_35%] brightness-105 contrast-105 scale-[1.01] transition-all duration-700"
          loading="eager"
          onError={(e) => {
            const target = e.currentTarget;
            if (!target.dataset.fallbackStep) {
              target.dataset.fallbackStep = '1';
              target.src = './scenic_nl.jpg';
            } else if (target.dataset.fallbackStep === '1') {
              target.dataset.fallbackStep = '2';
              target.src = '/scenic_nl.jpg';
            } else if (target.dataset.fallbackStep === '2') {
              target.dataset.fallbackStep = '3';
              target.src = 'docs/scenic_nl.jpg';
            } else if (target.dataset.fallbackStep === '3') {
              target.dataset.fallbackStep = '4';
              target.src = 'https://lh3.googleusercontent.com/d/1ohMOAS4FcwGDp3cTTjnMY6N_xfCXHcbh';
            }
          }}
        />
        {/* Soft, crisp gradient preserving vivid house colors and ocean view while ensuring high text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-black/20 to-slate-950/75" />
      </div>

      {/* Top Bar with Scenic Location Pill */}
      <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 flex items-center justify-start">
        {/* Prestige Regional Pill */}
        <a
          href="https://drive.google.com/file/d/1ohMOAS4FcwGDp3cTTjnMY6N_xfCXHcbh/view?usp=drive_link"
          target="_blank"
          rel="noopener noreferrer"
          title="View full St. John's city photo"
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 hover:bg-black/80 border border-white/20 hover:border-amber-400/50 text-[#F3BA4F] text-[11px] sm:text-xs font-bold shadow-lg backdrop-blur-md transition-all cursor-pointer group"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          <MapPin className="w-3.5 h-3.5 text-[#E5A93C] shrink-0 group-hover:scale-110 transition-transform" />
          <span className="hidden xs:inline">St. John’s & Newfoundland • City View</span>
          <span className="xs:hidden">St. John's, NL</span>
        </a>
      </div>

      {/* Main Hero Container with airy spacing to reveal the scenic backdrop */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 text-center space-y-6 sm:space-y-8">
        
        {/* Brand Headline & Purpose in Box Tightly Fitted to the Words */}
        <div className="inline-flex flex-col items-center max-w-md mx-auto px-4 py-3 sm:px-6 sm:py-4 rounded-2xl bg-black/60 border border-amber-300/40 shadow-2xl backdrop-blur-md space-y-2 text-center">
          <h1
            className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight uppercase leading-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            FILL THE GAP
          </h1>
          
          <p className="text-xs sm:text-sm font-semibold text-amber-100 leading-tight drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)]">
            Helping close the gaps between people, community resources, and the support they need.
          </p>
        </div>

        {/* GoFundMe Launch Fundraiser Banner — Directly Above Need Help & Donate Buttons */}
        <div className="max-w-3xl mx-auto p-4 sm:p-5 rounded-2xl bg-[#0b0f19]/90 border-2 border-[#E5A93C] shadow-2xl backdrop-blur-md text-left space-y-3 relative overflow-hidden group">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-2.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-[#F3BA4F] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#F3BA4F]" />
                Official GoFundMe Launch Fundraiser
              </span>
            </div>
            <span className="text-[10px] sm:text-[11px] font-bold text-amber-200 bg-amber-500/20 px-2.5 py-0.5 rounded-full border border-amber-400/40 self-start sm:self-auto">
              Credit Cards • Apple Pay • Google Pay
            </span>
          </div>

          <div className="space-y-1">
            <h2
              className="text-sm sm:text-base md:text-lg font-black text-white uppercase tracking-tight"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Support Fill the Gap Community Services Launch Fundraiser
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed">
              We've launched an official fundraiser to power our grassroots launch in St. John's and Newfoundland & Labrador. Your contribution directly funds vital community listening surveys, resource directories, and frontline support for folks falling through the cracks.
            </p>
          </div>

          <div className="pt-1 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2.5">
              <a
                href={GOFUNDME_CAMPAIGN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="gold-gradient-btn px-4 sm:px-5 py-2.5 rounded-xl text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-md border border-amber-200 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
              >
                <Heart className="w-3.5 h-3.5 fill-current text-slate-950" />
                <span>Donate on GoFundMe</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-950 shrink-0" />
              </a>

              <button
                type="button"
                onClick={onNavigateToDonate}
                className="px-3.5 py-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-amber-300 hover:text-white border border-amber-400/30 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <span>All Donation Options</span>
                <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
              </button>
            </div>

            <span className="text-[11px] text-slate-300 font-medium italic hidden md:inline">
              Secure online giving via GoFundMe
            </span>
          </div>
        </div>

        {/* Primary Action Buttons */}
        <div className="pt-2 max-w-4xl mx-auto space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            
            {/* 1. Need Help (Primary Gold) */}
            <button
              onClick={onNavigateToNeedHelp}
              className="gold-gradient-btn px-5 py-4 rounded-2xl text-slate-950 font-black text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center gap-2 border border-amber-200 cursor-pointer shadow-lg hover:-translate-y-0.5 transition-all"
            >
              <HelpCircle className="w-4 h-4 text-slate-950 shrink-0" />
              <span>NEED HELP?</span>
            </button>

            {/* 2. Donate (White with Gold Accent) */}
            <button
              onClick={onNavigateToDonate}
              className="px-5 py-4 rounded-2xl bg-white hover:bg-slate-100 text-slate-950 font-black text-xs sm:text-sm tracking-wider uppercase transition-all shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2 border border-white hover:border-[#E5A93C] cursor-pointer"
            >
              <Heart className="w-4 h-4 fill-current text-[#E5A93C] shrink-0" />
              <span>DONATE</span>
            </button>

            {/* 3. Community Surveys (White) */}
            <button
              onClick={onOpenSurvey}
              className="px-5 py-4 rounded-2xl bg-white hover:bg-slate-100 text-slate-950 font-black text-xs sm:text-sm tracking-wider uppercase transition-all shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2 border border-white hover:border-[#E5A93C] cursor-pointer"
            >
              <ClipboardList className="w-4 h-4 text-slate-950 shrink-0" />
              <span>COMMUNITY SURVEY</span>
            </button>

            {/* 4. Professional Surveys (Gold) */}
            <button
              onClick={onOpenProfessionalSurvey}
              className="gold-gradient-btn px-5 py-4 rounded-2xl text-slate-950 font-black text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center gap-2 border border-amber-200 cursor-pointer shadow-lg hover:-translate-y-0.5 transition-all"
            >
              <Briefcase className="w-4 h-4 text-slate-950 shrink-0" />
              <span>PROFESSIONAL SURVEY</span>
            </button>
          </div>

          {/* Quick Credibility / Feature Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-left">
            <div className="p-3.5 bg-black/60 border border-white/10 rounded-2xl flex items-center gap-3 backdrop-blur-md">
              <div className="w-8 h-8 rounded-xl bg-white/10 text-[#F3BA4F] flex items-center justify-center shrink-0 border border-[#E5A93C]/30 shadow-xs">
                <Shield className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <span className="font-bold text-white block">100% Anonymous</span>
                <span className="text-slate-300 text-[11px]">Confidential surveys</span>
              </div>
            </div>

            <div className="p-3.5 bg-black/60 border border-white/10 rounded-2xl flex items-center gap-3 backdrop-blur-md">
              <div className="w-8 h-8 rounded-xl bg-white/10 text-[#F3BA4F] flex items-center justify-center shrink-0 border border-[#E5A93C]/30 shadow-xs">
                <Search className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <span className="font-bold text-white block">Verified Help</span>
                <span className="text-slate-300 text-[11px]">Local support</span>
              </div>
            </div>

            <div className="p-3.5 bg-black/60 border border-white/10 rounded-2xl flex items-center gap-3 backdrop-blur-md">
              <div className="w-8 h-8 rounded-xl bg-white/10 text-[#F3BA4F] flex items-center justify-center shrink-0 border border-[#E5A93C]/30 shadow-xs">
                <Layers className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <span className="font-bold text-white block">Lived Experience</span>
                <span className="text-slate-300 text-[11px]">Rooted in real needs</span>
              </div>
            </div>

            <div className="p-3.5 bg-black/60 border border-white/10 rounded-2xl flex items-center gap-3 backdrop-blur-md">
              <div className="w-8 h-8 rounded-xl bg-white/10 text-[#F3BA4F] flex items-center justify-center shrink-0 border border-[#E5A93C]/30 shadow-xs">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <span className="font-bold text-white block">Collaborative</span>
                <span className="text-slate-300 text-[11px]">Community-guided</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom spacer / divider */}
      <div className="relative z-10 w-full h-2 bg-gradient-to-r from-[#F3BA4F]/20 via-[#E5A93C] to-[#F3BA4F]/20" />
    </div>
  );
};

export const StJohnsHeroBanner = StJohnsHeroHeader;

