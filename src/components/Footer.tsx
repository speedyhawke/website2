import React, { useState, useEffect } from 'react';
import { NavTabId } from './Navbar';
import { Logo } from './Logo';
import { Mail, MapPin, Briefcase, ClipboardList } from 'lucide-react';
import { LegalModalType } from './LegalModal';
import { CMSStore, CMSPage } from '../data/cmsStore';

interface FooterProps {
  setActiveTab: (tab: NavTabId) => void;
  onOpenSurvey: () => void;
  onOpenProfessionalSurvey?: () => void;
  onOpenLegalModal?: (type: LegalModalType) => void;
  onOpenAdmin?: () => void;
  onOpenCodeExport?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  setActiveTab,
  onOpenSurvey,
  onOpenProfessionalSurvey,
  onOpenLegalModal,
  onOpenAdmin,
  onOpenCodeExport,
}) => {
  const [footerCustomPages, setFooterCustomPages] = useState<CMSPage[]>([]);

  useEffect(() => {
    setFooterCustomPages(CMSStore.getFooterPages());
  }, []);

  const defaultNavLinks: { id: NavTabId; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'what-we-do', label: 'What We Do' },
    { id: 'what-we-help-with', label: 'What We Help With' },
    { id: 'need-help', label: 'Need Help' },
    { id: 'why-i-started', label: 'Why We Started' },
    { id: 'get-involved', label: 'Get Involved' },
    { id: 'donate', label: 'Donate' },
    { id: 'contact', label: 'Contact' },
  ];

  const allNavLinks = [
    ...defaultNavLinks,
    ...footerCustomPages.map((p) => ({
      id: p.slug,
      label: p.title,
    }))
  ];

  return (
    <footer className="bg-[#0b0f19] text-white border-t border-slate-800 shadow-2xl">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 space-y-12">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <Logo isDark={true} />
            </div>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-sm">
              Helping close the gaps between people, resources, and the support they need across St. John’s and Newfoundland & Labrador.
            </p>

            <div className="pt-2 text-xs text-slate-400 flex flex-col gap-2.5">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#F3BA4F] shrink-0" />
                <span>St. John's, Newfoundland & Labrador, Canada</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#F3BA4F] shrink-0" />
                <a
                  href="mailto:info@fillthegapnl.ca"
                  className="hover:text-[#F3BA4F] font-bold transition-colors text-slate-200"
                >
                  info@fillthegapnl.ca
                </a>
              </div>
            </div>
          </div>

          {/* Navigation Links Column */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-[#F3BA4F]">
              Navigation
            </h4>
            <div className="grid grid-cols-2 gap-y-2.5 gap-x-4 text-xs sm:text-sm">
              {allNavLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    setActiveTab(link.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-left text-slate-300 hover:text-white hover:translate-x-0.5 transition-all py-0.5 font-medium cursor-pointer"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Surveys Column */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-[#F3BA4F]">
              Community Listening
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Help us identify and map gaps in support across Newfoundland & Labrador:
            </p>
            <div className="space-y-2.5 pt-1">
              <button
                onClick={onOpenSurvey}
                className="w-full py-2.5 px-3.5 rounded-xl gold-gradient-btn text-[#0f172a] font-black text-xs uppercase tracking-wider transition-all shadow-md border border-amber-200 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <ClipboardList className="w-3.5 h-3.5 text-[#0f172a]" />
                <span>Community Survey</span>
              </button>
              {onOpenProfessionalSurvey && (
                <button
                  onClick={onOpenProfessionalSurvey}
                  className="w-full py-2.5 px-3.5 rounded-xl bg-[#1e293b] hover:bg-[#334155] text-[#F3BA4F] font-black text-xs uppercase tracking-wider transition-all shadow-sm border border-[#E5A93C]/50 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Briefcase className="w-3.5 h-3.5 text-[#F3BA4F]" />
                  <span>Professional Survey</span>
                </button>
              )}
            </div>
          </div>

        </div>

        {/* Bottom Bar: Legal, Policy links, and Admin Button */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          
          <div className="flex items-center gap-1 text-center sm:text-left text-slate-400">
            <span>© {new Date().getFullYear()} Fill the Gap • St. John's, NL. All rights reserved.</span>
          </div>

          {/* Links for Privacy, Terms, Accessibility, and Export Code */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 font-semibold text-slate-400">
            <button
              onClick={() => onOpenLegalModal && onOpenLegalModal('privacy')}
              className="hover:text-white transition-colors cursor-pointer text-slate-300"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => onOpenLegalModal && onOpenLegalModal('terms')}
              className="hover:text-white transition-colors cursor-pointer text-slate-300"
            >
              Terms of Service
            </button>
            <button
              onClick={() => onOpenLegalModal && onOpenLegalModal('accessibility')}
              className="hover:text-white transition-colors cursor-pointer text-slate-300"
            >
              Accessibility
            </button>
          </div>

        </div>

      </div>

    </footer>
  );
};
