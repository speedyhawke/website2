import React, { useState, useEffect, useRef } from 'react';
import {
  MapPin,
  HelpCircle,
  Heart,
  Shield,
  Search,
  Layers,
  Sparkles,
  Camera,
  Image as ImageIcon,
  Check,
  Upload,
  RotateCcw,
  ChevronDown,
  ArrowRight,
  ClipboardList,
  Briefcase,
} from 'lucide-react';
import {
  DEFAULT_BATTERY_HERO_IMAGE,
  SCENIC_ST_JOHNS_PRESETS,
  ScenicHeroPreset,
} from '../data/heroImage';
import { AdminStore } from '../data/adminStore';

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
  const [heroImage, setHeroImage] = useState<string>(() => {
    const custom = AdminStore.getCustomHeroImage();
    // If it's a previous placeholder unsplash url, clear and use the authentic image
    if (custom && custom.includes('unsplash.com')) {
      AdminStore.clearCustomHeroImage();
      return DEFAULT_BATTERY_HERO_IMAGE;
    }
    return custom || DEFAULT_BATTERY_HERO_IMAGE;
  });
  const [showPhotoPicker, setShowPhotoPicker] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleHeroUpdate = () => {
      setHeroImage(AdminStore.getCustomHeroImage() || DEFAULT_BATTERY_HERO_IMAGE);
    };

    window.addEventListener('ftg_hero_updated', handleHeroUpdate);
    return () => {
      window.removeEventListener('ftg_hero_updated', handleHeroUpdate);
    };
  }, []);

  const handleSelectPreset = (preset: ScenicHeroPreset) => {
    AdminStore.setCustomHeroImage(preset.url);
    setHeroImage(preset.url);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          AdminStore.setCustomHeroImage(reader.result);
          setHeroImage(reader.result);
          setShowPhotoPicker(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetDefault = () => {
    AdminStore.clearCustomHeroImage();
    setHeroImage(DEFAULT_BATTERY_HERO_IMAGE);
  };

  return (
    <div className="relative w-full bg-[#070b12] text-white border-b border-[#E5A93C]/40 shadow-2xl overflow-hidden min-h-[460px] sm:min-h-[520px] flex flex-col justify-between">
      
      {/* Background St. John's Scenic Battery Houses & Harbour Photography */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={heroImage}
          alt="Scenic St. John's Newfoundland, The Battery colourful houses, Harbour, Hills and Water"
          className="w-full h-full object-cover object-[center_40%] brightness-105 contrast-105 scale-[1.01] transition-all duration-700"
          loading="eager"
        />
        {/* Soft, crisp gradient preserving vivid house colors and ocean view while ensuring high text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-black/20 to-slate-950/75" />
      </div>

      {/* Top Bar with Scenic Location Pill & Photo Switcher Button */}
      <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 flex items-center justify-between">
        {/* Prestige Regional Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 border border-white/20 text-[#F3BA4F] text-[11px] sm:text-xs font-bold shadow-lg backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          <MapPin className="w-3.5 h-3.5 text-[#E5A93C] shrink-0" />
          <span className="hidden xs:inline">St. John’s & Newfoundland • The Battery</span>
          <span className="xs:hidden">St. John's, NL</span>
        </div>

        {/* Change / Restore Scenic Photo Badge */}
        <div className="relative">
          <button
            onClick={() => setShowPhotoPicker(!showPhotoPicker)}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 hover:bg-black/90 border border-amber-400/40 hover:border-amber-400 text-amber-300 text-xs font-bold transition-all shadow-md backdrop-blur-md cursor-pointer"
            title="Choose scenic St. John's scenic view or Battery houses"
          >
            <Camera className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Scenic View</span>
            <ChevronDown className="w-3 h-3" />
          </button>

          {/* Scenic Photo Dropdown Picker */}
          {showPhotoPicker && (
            <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-slate-900/95 border border-amber-500/40 rounded-2xl shadow-2xl backdrop-blur-xl p-3 z-50 space-y-3 animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between border-b border-slate-700/80 pb-2">
                <span className="text-xs font-black uppercase text-amber-400 flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5" /> St. John's Scenic Views
                </span>
                <button
                  onClick={handleResetDefault}
                  className="text-[10px] text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
                  title="Reset to Battery Houses"
                >
                  <RotateCcw className="w-3 h-3" /> Reset Default
                </button>
              </div>

              {/* Presets Grid */}
              <div className="grid grid-cols-2 gap-2">
                {SCENIC_ST_JOHNS_PRESETS.map((preset) => {
                  const isSelected = heroImage === preset.url;
                  return (
                    <button
                      key={preset.id}
                      onClick={() => handleSelectPreset(preset)}
                      className={`group text-left p-1.5 rounded-xl border transition-all cursor-pointer relative overflow-hidden ${
                        isSelected
                          ? 'border-amber-400 bg-amber-400/10 ring-2 ring-amber-400/30'
                          : 'border-slate-700 hover:border-slate-500 bg-slate-800/50'
                      }`}
                    >
                      <div className="w-full h-14 rounded-lg overflow-hidden relative mb-1.5 bg-slate-950">
                        <img
                          src={preset.url}
                          alt={preset.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                        {isSelected && (
                          <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-[10px]">
                            <Check className="w-3 h-3" />
                          </div>
                        )}
                      </div>
                      <p className="text-[11px] font-bold text-white leading-tight truncate">
                        {preset.name}
                      </p>
                      <p className="text-[9px] text-slate-400 truncate">
                        {preset.location}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Upload Custom Photo Option */}
              <div className="pt-1 border-t border-slate-700/80">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-200 hover:text-white text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                >
                  <Upload className="w-3.5 h-3.5 text-amber-400" />
                  <span>Upload Your Scenic St. John's Photo</span>
                </button>
              </div>
            </div>
          )}
        </div>
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

