import React, { useState, useEffect } from 'react';
import { Navbar, NavTabId } from './components/Navbar';
import { HomeView } from './components/HomeView';
import { AboutView } from './components/AboutView';
import { WhatWeHelpWithView } from './components/WhatWeHelpWithView';
import { ProfessionalsView } from './components/ProfessionalsView';
import { WhyIStartedView } from './components/WhyIStartedView';
import { GetInvolvedView } from './components/GetInvolvedView';
import { DonateView } from './components/DonateView';
import { ContactView } from './components/ContactView';
import { NeedHelpView } from './components/NeedHelpView';
import { SurveyView } from './components/SurveyView';
import { CommunitySurveyModal } from './components/CommunitySurveyModal';
import { ProfessionalSurveyModal } from './components/ProfessionalSurveyModal';
import { LegalModal, LegalModalType } from './components/LegalModal';
import { EntireWebsiteCodeModal } from './components/EntireWebsiteCodeModal';
import { EntireWebsiteCodeView } from './components/EntireWebsiteCodeView';
import { Footer } from './components/Footer';
import { AdminDashboard } from './components/AdminDashboard';
import { AdminStore } from './data/adminStore';
import { CMSStore, CMSAnnouncement } from './data/cmsStore';
import { CustomPageView } from './components/cms/CustomPageView';
import { X, ArrowRight, Sparkles } from 'lucide-react';

// Helper to detect GitHub Pages repository subpath (e.g. /my-repo/)
const getRepoBasePath = (): string => {
  if (typeof window === 'undefined') return '';
  const viteBase = (import.meta as any).env?.BASE_URL;
  if (viteBase && viteBase !== '/' && viteBase !== './') {
    return '/' + viteBase.replace(/^\/+|\/+$/g, '');
  }
  const knownRoots = [
    'home',
    'about',
    'what-we-do',
    'what-we-help-with',
    'need-help',
    'professionals',
    'why-i-started',
    'get-involved',
    'donate',
    'contact',
    'admin',
    'community-survey',
    'professional-survey',
    'pro-survey',
    'survey',
    'code',
    'index.html',
  ];
  const segments = window.location.pathname.split('/').filter(Boolean);
  if (segments.length > 0 && !knownRoots.includes(segments[0].toLowerCase())) {
    return '/' + segments[0];
  }
  return '';
};

export default function App() {
  const extractRouteFromLocation = (): { tab: NavTabId; isAdmin: boolean; isSurvey: boolean; isProfSurvey: boolean } => {
    if (typeof window === 'undefined') {
      return { tab: 'home', isAdmin: false, isSurvey: false, isProfSurvey: false };
    }

    const basePath = getRepoBasePath();
    let rawPath = window.location.pathname;
    if (basePath && rawPath.toLowerCase().startsWith(basePath.toLowerCase())) {
      rawPath = rawPath.slice(basePath.length);
    }
    rawPath = rawPath.replace(/^\/+|\/+$/g, '').toLowerCase();
    const path = rawPath === 'index.html' ? '' : rawPath;
    const rawHash = window.location.hash.replace(/^#+\/?/, '').toLowerCase();
    const hash = rawHash === 'index.html' ? '' : rawHash;
    const search = window.location.search.toLowerCase();

    // Check query params for SPA redirects (e.g., ?/admin, ?p=admin, ?route=about)
    let queryRoute = '';
    if (search.startsWith('?/')) {
      queryRoute = search.slice(2).split('&')[0].replace(/^\/+|\/+$/g, '');
    } else if (search.includes('p=')) {
      const match = search.match(/[?&]p=([^&]+)/);
      if (match && match[1]) queryRoute = decodeURIComponent(match[1]).replace(/^\/+|\/+$/g, '');
    } else if (search.includes('tab=')) {
      const match = search.match(/[?&]tab=([^&]+)/);
      if (match && match[1]) queryRoute = decodeURIComponent(match[1]).replace(/^\/+|\/+$/g, '');
    }

    const effectiveRoute = path || queryRoute || hash || 'home';

    const isAdmin =
      effectiveRoute === 'admin' ||
      effectiveRoute.startsWith('admin/') ||
      search.includes('admin') ||
      hash.includes('admin') ||
      path === 'admin';

    const isProfSurvey =
      effectiveRoute === 'professional-survey' ||
      effectiveRoute === 'pro-survey' ||
      effectiveRoute === 'professionalsurvey' ||
      effectiveRoute === 'profsurvey' ||
      effectiveRoute === 'provider-survey' ||
      search.includes('survey=prof') ||
      search.includes('survey=pro') ||
      search.includes('type=prof') ||
      search.includes('type=pro') ||
      hash === 'professional-survey' ||
      hash === 'pro-survey';

    const isSurvey =
      !isProfSurvey &&
      (effectiveRoute === 'community-survey' ||
        effectiveRoute === 'survey' ||
        effectiveRoute === 'surveys' ||
        effectiveRoute === 'communitysurvey' ||
        search.includes('survey=community') ||
        search.includes('survey=open') ||
        search.includes('survey=true') ||
        search.includes('survey=1') ||
        search.includes('type=community') ||
        hash === 'survey' ||
        hash === 'community-survey');

    let tab: NavTabId = 'home';
    if (!isAdmin) {
      if (isSurvey || isProfSurvey) {
        tab = 'home';
      } else if (effectiveRoute === 'what-we-help-with' || effectiveRoute === 'what-we-do') {
        tab = 'what-we-do';
      } else {
        tab = effectiveRoute || 'home';
      }
    }

    return { tab, isAdmin, isSurvey, isProfSurvey };
  };

  const initialRoute = extractRouteFromLocation();
  const [activeTab, setActiveTab] = useState<NavTabId>(initialRoute.tab);
  const [isAdminRoute, setIsAdminRoute] = useState<boolean>(initialRoute.isAdmin);
  const [isSurveyOpen, setIsSurveyOpen] = useState<boolean>(initialRoute.isSurvey);
  const [isProfessionalSurveyOpen, setIsProfessionalSurveyOpen] = useState<boolean>(initialRoute.isProfSurvey);
  const [isCodeModalOpen, setIsCodeModalOpen] = useState<boolean>(false);
  const [legalModalType, setLegalModalType] = useState<LegalModalType>(null);
  
  // Announcement banner
  const [announcement, setAnnouncement] = useState<CMSAnnouncement>(() => CMSStore.getAnnouncement());
  const [isAnnouncementDismissed, setIsAnnouncementDismissed] = useState<boolean>(false);

  // Initialize and track visits & URL routing
  useEffect(() => {
    CMSStore.initialize();
    AdminStore.initialize();
    setAnnouncement(CMSStore.getAnnouncement());

    if (!isAdminRoute) {
      AdminStore.recordVisit(`/${activeTab}`);
    }

    const handleLocationChange = () => {
      const routeInfo = extractRouteFromLocation();
      setIsAdminRoute(routeInfo.isAdmin);
      if (!routeInfo.isAdmin) {
        setActiveTab(routeInfo.tab);
        if (routeInfo.isSurvey) setIsSurveyOpen(true);
        if (routeInfo.isProfSurvey) setIsProfessionalSurveyOpen(true);
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  // Sync scroll to top on tab change
  const handleTabChange = (tab: NavTabId) => {
    setActiveTab(tab);
    if (!isAdminRoute) {
      AdminStore.recordVisit(`/${tab}`);
    }
    const basePath = getRepoBasePath();
    try {
      if (tab === 'home') {
        window.history.pushState({}, '', basePath ? `${basePath}/` : '/');
      } else {
        window.history.pushState({}, '', basePath ? `${basePath}/${tab}` : `/${tab}`);
      }
    } catch {}
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenAdmin = () => {
    setIsAdminRoute(true);
    const basePath = getRepoBasePath();
    try {
      window.history.pushState({}, '', basePath ? `${basePath}/admin` : '/admin');
    } catch {}
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExitAdmin = () => {
    setIsAdminRoute(false);
    const basePath = getRepoBasePath();
    try {
      window.history.pushState({}, '', basePath ? `${basePath}/` : '/');
    } catch {}
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If viewing admin route (/admin or fillthegapnl.ca/admin)
  if (isAdminRoute) {
    return (
      <AdminDashboard
        onExit={handleExitAdmin}
        onNavigateToCustomPage={(slug) => {
          setIsAdminRoute(false);
          handleTabChange(slug);
        }}
      />
    );
  }

  // Check if activeTab is a custom CMS page or built-in tab
  const customPage = CMSStore.getPageBySlug(activeTab);
  const isKnownTab = ['home', 'about', 'what-we-do', 'what-we-help-with', 'need-help', 'professionals', 'why-i-started', 'get-involved', 'donate', 'contact'].includes(activeTab);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-stone-900 selection:bg-amber-300 selection:text-slate-950">
      
      {/* Top Global Announcement Banner (if enabled in CMS) */}
      {announcement?.isEnabled && !isAnnouncementDismissed && (
        <div
          className={`py-2.5 px-4 text-center text-xs sm:text-sm font-bold flex items-center justify-between gap-3 shadow-md relative z-50 ${
            announcement.variant === 'gold'
              ? 'bg-gradient-to-r from-[#E5A93C] via-[#F3BA4F] to-[#D4972B] text-slate-950'
              : announcement.variant === 'red'
              ? 'bg-red-600 text-white'
              : announcement.variant === 'green'
              ? 'bg-emerald-600 text-white'
              : 'bg-slate-900 text-white border-b border-amber-400/40'
          }`}
        >
          <div className="flex-1 flex items-center justify-center gap-2 flex-wrap">
            <Sparkles className="w-4 h-4 shrink-0" />
            <span>{announcement.text}</span>
            {announcement.linkText && (
              <button
                onClick={() => {
                  if (announcement.linkUrl?.includes('survey')) {
                    setIsSurveyOpen(true);
                  } else if (announcement.linkUrl) {
                    if (announcement.linkUrl.startsWith('http')) {
                      window.open(announcement.linkUrl, '_blank', 'noopener,noreferrer');
                    } else {
                      handleTabChange(announcement.linkUrl.replace(/^\/+/, ''));
                    }
                  }
                }}
                className="inline-flex items-center gap-1 underline font-black hover:opacity-80 cursor-pointer ml-1"
              >
                <span>{announcement.linkText}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {announcement.isDismissible && (
            <button
              onClick={() => setIsAnnouncementDismissed(true)}
              className="p-1 rounded-md hover:bg-black/10 cursor-pointer"
              aria-label="Dismiss banner"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      )}

      {/* Top Navigation Bar: Visible desktop tabs in exact requested order */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        onOpenSurvey={() => setIsSurveyOpen(true)}
        onOpenAdmin={handleOpenAdmin}
      />

      {/* Main Viewport */}
      <main className="flex-1">
        {/* Built-in System Pages */}
        {activeTab === 'home' && (
          <HomeView
            onOpenSurvey={() => setIsSurveyOpen(true)}
            onOpenProfessionalSurvey={() => setIsProfessionalSurveyOpen(true)}
            onNavigateToDonate={() => handleTabChange('donate')}
            onNavigateToGetInvolved={() => handleTabChange('get-involved')}
            onNavigateToWhatWeDo={() => handleTabChange('what-we-do')}
            onNavigateToWhatWeHelpWith={() => handleTabChange('what-we-do')}
            onNavigateToAbout={() => handleTabChange('about')}
            onNavigateToWhyIStarted={() => handleTabChange('why-i-started')}
            onNavigateToContact={() => handleTabChange('contact')}
            onNavigateToNeedHelp={() => handleTabChange('need-help')}
          />
        )}

        {activeTab === 'about' && (
          <AboutView
            onOpenSurvey={() => setIsSurveyOpen(true)}
            onNavigateToGetInvolved={() => handleTabChange('get-involved')}
          />
        )}

        {(activeTab === 'what-we-do' || activeTab === 'what-we-help-with') && (
          <WhatWeHelpWithView
            onOpenSurvey={() => setIsSurveyOpen(true)}
            onOpenProfessionalSurvey={() => setIsProfessionalSurveyOpen(true)}
            onNavigateToContact={() => handleTabChange('contact')}
            onNavigateToDonate={() => handleTabChange('donate')}
            onNavigateToGetInvolved={() => handleTabChange('get-involved')}
          />
        )}

        {activeTab === 'need-help' && (
          <NeedHelpView
            onNavigateToContact={() => handleTabChange('contact')}
            onNavigateToWhatWeHelpWith={() => handleTabChange('what-we-help-with')}
            onNavigateToGetInvolved={() => handleTabChange('get-involved')}
            onOpenSurvey={() => setIsSurveyOpen(true)}
          />
        )}

        {activeTab === 'professionals' && (
          <ProfessionalsView
            onOpenProfessionalSurvey={() => setIsProfessionalSurveyOpen(true)}
            onNavigateToCommunitySurvey={() => setIsSurveyOpen(true)}
          />
        )}

        {activeTab === 'why-i-started' && (
          <WhyIStartedView
            onOpenSurvey={() => setIsSurveyOpen(true)}
            onNavigateToGetInvolved={() => handleTabChange('get-involved')}
          />
        )}

        {activeTab === 'get-involved' && (
          <GetInvolvedView
            onOpenSurvey={() => setIsSurveyOpen(true)}
            onOpenProfessionalSurvey={() => setIsProfessionalSurveyOpen(true)}
            onNavigateToDonate={() => handleTabChange('donate')}
          />
        )}

        {activeTab === 'donate' && (
          <DonateView
            onOpenSurvey={() => setIsSurveyOpen(true)}
            onNavigateToGetInvolved={() => handleTabChange('get-involved')}
          />
        )}

        {activeTab === 'contact' && <ContactView />}
        {activeTab === 'code' && (
          <EntireWebsiteCodeView onClose={() => handleTabChange('home')} />
        )}
        {activeTab === 'survey' && (
          <SurveyView
            onOpenDetailedSurvey={() => setIsSurveyOpen(true)}
            onNavigateToResources={() => handleTabChange('what-we-help-with')}
          />
        )}

        {/* Dynamic Custom CMS Page Renderer */}
        {customPage && (
          <CustomPageView
            page={customPage}
            onOpenCommunitySurvey={() => setIsSurveyOpen(true)}
            onOpenProfessionalSurvey={() => setIsProfessionalSurveyOpen(true)}
            onNavigateToDonate={() => handleTabChange('donate')}
            onNavigateToContact={() => handleTabChange('contact')}
          />
        )}

        {/* Fallback to HomeView if route is not recognized and not a custom page */}
        {!isKnownTab && !customPage && (
          <HomeView
            onOpenSurvey={() => setIsSurveyOpen(true)}
            onOpenProfessionalSurvey={() => setIsProfessionalSurveyOpen(true)}
            onNavigateToDonate={() => handleTabChange('donate')}
            onNavigateToGetInvolved={() => handleTabChange('get-involved')}
            onNavigateToWhatWeDo={() => handleTabChange('what-we-do')}
            onNavigateToWhatWeHelpWith={() => handleTabChange('what-we-do')}
            onNavigateToAbout={() => handleTabChange('about')}
            onNavigateToWhyIStarted={() => handleTabChange('why-i-started')}
            onNavigateToContact={() => handleTabChange('contact')}
            onNavigateToNeedHelp={() => handleTabChange('need-help')}
          />
        )}
      </main>

      {/* Interactive Community Survey Modal */}
      <CommunitySurveyModal
        isOpen={isSurveyOpen}
        onClose={() => setIsSurveyOpen(false)}
      />

      {/* Interactive Professional / Frontline Survey Modal */}
      <ProfessionalSurveyModal
        isOpen={isProfessionalSurveyOpen}
        onClose={() => setIsProfessionalSurveyOpen(false)}
      />

      {/* Privacy / Terms / Accessibility Modal */}
      <LegalModal
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
      />

      {/* Code Export & Download ZIP Modal */}
      <EntireWebsiteCodeModal
        isOpen={isCodeModalOpen}
        onClose={() => setIsCodeModalOpen(false)}
        onOpenFullTab={() => {
          setIsCodeModalOpen(false);
          handleTabChange('code');
        }}
      />

      {/* Footer with Transparency Notice & Quick Links */}
      <Footer
        setActiveTab={handleTabChange}
        onOpenSurvey={() => setIsSurveyOpen(true)}
        onOpenProfessionalSurvey={() => setIsProfessionalSurveyOpen(true)}
        onOpenLegalModal={(type) => setLegalModalType(type)}
        onOpenAdmin={handleOpenAdmin}
        onOpenCodeExport={() => setIsCodeModalOpen(true)}
      />
    </div>
  );
}
