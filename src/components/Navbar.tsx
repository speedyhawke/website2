import React, { useState, useEffect } from 'react';
import { Heart, Menu, X } from 'lucide-react';
import { Logo } from './Logo';
import { CMSStore, CMSPage } from '../data/cmsStore';

export type NavTabId =
  | 'home'
  | 'about'
  | 'what-we-do'
  | 'what-we-help-with'
  | 'need-help'
  | 'why-i-started'
  | 'get-involved'
  | 'donate'
  | 'contact'
  | string;

interface NavbarProps {
  activeTab: NavTabId;
  setActiveTab: (tab: NavTabId) => void;
  onOpenSurvey: () => void;
  onOpenAdmin?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenSurvey,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [customNavPages, setCustomNavPages] = useState<CMSPage[]>([]);

  useEffect(() => {
    setCustomNavPages(CMSStore.getNavPages());
  }, [activeTab]);

  const defaultNavTabs: { id: NavTabId; label: string }[] = [
    { id: 'home', label: 'HOME' },
    { id: 'about', label: 'ABOUT' },
    { id: 'what-we-do', label: 'WHAT WE DO' },
    { id: 'what-we-help-with', label: 'WHAT WE HELP WITH' },
    { id: 'need-help', label: 'NEED HELP?' },
    { id: 'why-i-started', label: 'WHY WE STARTED' },
    { id: 'get-involved', label: 'GET INVOLVED' },
    { id: 'contact', label: 'CONTACT' },
  ];

  // Merge built-in tabs and any custom pages enabled in CMS
  const navTabs = [
    ...defaultNavTabs,
    ...customNavPages.map((cp) => ({
      id: cp.slug,
      label: cp.navLabel || cp.title.toUpperCase(),
    }))
  ];

  const handleTabClick = (tabId: NavTabId | 'community-survey') => {
    if (tabId === 'community-survey') {
      onOpenSurvey();
      setMobileMenuOpen(false);
      return;
    }
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0B0F19]/90 backdrop-blur-lg border-b border-white/10 shadow-xl shadow-black/20 transition-all">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-2">
          
          {/* Brand Identity */}
          <button
            onClick={() => handleTabClick('home')}
            className="flex items-center text-left cursor-pointer transition-transform hover:scale-[1.01] active:scale-[0.99] shrink-0 focus-visible:ring-2 focus-visible:ring-[#E5A93C] rounded-xl p-1 -ml-1"
            aria-label="Fill the Gap Home"
          >
            <Logo variant="full" isDark={true} />
          </button>

          {/* Desktop & Laptop Navigation Tabs Bar */}
          <nav
            aria-label="Main Navigation"
            className="hidden lg:flex items-center gap-0.5 xl:gap-1 bg-black/40 backdrop-blur-md p-1 xl:p-1.5 rounded-2xl border border-white/10 shadow-inner overflow-x-auto no-scrollbar"
          >
            {navTabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`px-2.5 xl:px-3.5 py-1.5 xl:py-2 rounded-xl text-[10px] xl:text-[11px] 2xl:text-xs font-bold tracking-wider uppercase transition-all duration-150 whitespace-nowrap cursor-pointer focus-visible:ring-2 focus-visible:ring-[#E5A93C] ${
                    isActive
                      ? 'text-white bg-slate-800 font-black shadow-sm ring-1 ring-[#E5A93C]/60'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </nav>

          {/* Desktop Right Action: Donate CTA */}
          <div className="hidden lg:flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => handleTabClick('donate')}
              className={`px-5 py-2.5 rounded-xl text-xs font-black tracking-wider uppercase transition-all duration-200 flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer focus-visible:ring-2 focus-visible:ring-[#E5A93C] ${
                activeTab === 'donate'
                  ? 'bg-[#F3BA4F] text-slate-950 ring-2 ring-[#F3BA4F] ring-offset-2 ring-offset-slate-950 shadow-lg shadow-amber-500/25'
                  : 'gold-gradient-btn text-slate-950 border border-amber-300 font-extrabold'
              }`}
            >
              <Heart className="w-3.5 h-3.5 fill-current text-slate-950" />
              <span>DONATE</span>
            </button>
          </div>

          {/* Mobile & Tablet Action Buttons */}
          <div className="flex items-center gap-1.5 lg:hidden">
            <button
              onClick={() => handleTabClick('donate')}
              className="px-3 py-1.5 rounded-lg text-xs font-black tracking-wider uppercase bg-gradient-to-r from-[#E5A93C] to-[#D4972B] text-slate-950 flex items-center gap-1.5 shadow-sm"
            >
              <Heart className="w-3 h-3 fill-current text-slate-950" />
              <span>DONATE</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 hover:text-white transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile & Tablet Horizontal Scrolling Tab Bar (Always accessible on top) */}
      <div className="lg:hidden bg-slate-950 border-t border-slate-800 px-2 py-1.5 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-1.5 min-w-max px-1">
          {navTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-bold tracking-wider uppercase whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-slate-800 text-white font-black border border-[#E5A93C]/60 shadow-xs'
                    : 'text-slate-300 hover:text-white bg-slate-900/80'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile / Tablet Full Dropdown Menu when toggled */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0B0F19] border-b border-slate-800 px-4 pt-3 pb-6 space-y-2 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="grid grid-cols-1 gap-1.5">
            {navTabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-between ${
                    isActive
                      ? 'bg-slate-800 text-white font-black border-l-4 border-[#E5A93C]'
                      : 'text-slate-300 hover:bg-slate-800/60'
                  }`}
                >
                  <span>{tab.label}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#E5A93C]" />}
                </button>
              );
            })}

            <button
              onClick={() => handleTabClick('donate')}
              className="w-full mt-2 py-3.5 px-4 rounded-xl gold-gradient-btn text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-amber-300"
            >
              <Heart className="w-4 h-4 fill-current text-slate-950" />
              <span>DONATE</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
