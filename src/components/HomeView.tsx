import React from 'react';
import { PuffinMascot } from './PuffinMascot';
import {
  Heart,
  MapPin,
  HelpCircle,
  Clock,
  ArrowRight,
  Ear,
  Search,
  BookOpen,
  CheckCircle2,
  Briefcase,
  Users,
  Compass,
  FileQuestion,
  ClipboardList,
  Sparkles,
  Quote,
  Construction,
} from 'lucide-react';
import { StJohnsHeroHeader } from './StJohnsHeroBanner';

interface HomeViewProps {
  onOpenSurvey: () => void;
  onOpenProfessionalSurvey: () => void;
  onNavigateToDonate: () => void;
  onNavigateToGetInvolved: () => void;
  onNavigateToWhatWeDo?: () => void;
  onNavigateToWhatWeHelpWith?: () => void;
  onNavigateToAbout: () => void;
  onNavigateToWhyIStarted?: () => void;
  onNavigateToContact?: () => void;
  onNavigateToNeedHelp?: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onOpenSurvey,
  onOpenProfessionalSurvey,
  onNavigateToDonate,
  onNavigateToGetInvolved,
  onNavigateToWhatWeDo,
  onNavigateToWhatWeHelpWith,
  onNavigateToWhyIStarted,
  onNavigateToNeedHelp,
}) => {
  return (
    <div className="space-y-16 sm:space-y-24 pb-24">
      
      {/* ============================================================ */}
      {/* 1. HERO HEADER */}
      {/* ============================================================ */}
      <section className="w-full">
        <StJohnsHeroHeader
          onOpenSurvey={onOpenSurvey}
          onOpenProfessionalSurvey={onOpenProfessionalSurvey}
          onNavigateToDonate={onNavigateToDonate}
          onNavigateToNeedHelp={onNavigateToNeedHelp}
        />
      </section>

      {/* ============================================================ */}
      {/* 2. WE'RE JUST GETTING STARTED (AT THE TOP) */}
      {/* ============================================================ */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="civic-card rounded-3xl p-8 sm:p-14 relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Main Text Content */}
            <div className="lg:col-span-8 space-y-6">
              <div className="space-y-3">
                <span className="text-[11px] font-black uppercase tracking-wider text-slate-800 bg-slate-100 px-3.5 py-1.5 rounded-full border border-slate-200 inline-flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#E5A93C]" />
                  St. John's, Newfoundland & Labrador
                </span>
                <h2
                  className="text-3xl sm:text-5xl font-black text-[#0f172a] tracking-tight uppercase"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  WE'RE JUST GETTING STARTED
                </h2>
              </div>

              <div className="space-y-4 text-stone-800 text-base sm:text-lg leading-relaxed">
                <p className="font-bold text-[#0f172a] text-lg sm:text-xl">
                  We're not going to pretend Fill the Gap has all the answers.
                </p>
                <p>
                  Right now, we're starting from the ground up. We don't have a huge team, a long list of programs, or the resources to fix every problem today.
                </p>
                
                <div className="p-5 sm:p-6 rounded-2xl bg-[#0B0F19] text-white border-2 border-[#E5A93C] shadow-lg my-2">
                  <p className="text-lg sm:text-xl font-black text-[#F3BA4F] leading-snug">
                    But that doesn't mean we're going to stop trying.
                  </p>
                </div>

                <p>
                  We're starting by listening, learning, and understanding where people are falling through the cracks.
                </p>
                <p>
                  We may not have the answer today. We may not be able to help with every problem today.
                </p>
                <p className="font-semibold text-slate-900">
                  But we're going to keep looking for the answers, keep learning, and keep building until we can.
                </p>

                <div className="pt-3 border-t border-slate-200 space-y-1">
                  <p className="text-xl sm:text-2xl font-black text-[#0f172a]" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    Fill the Gap has to start somewhere.
                  </p>
                  <p className="text-2xl sm:text-3xl font-black text-slate-800 uppercase" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    This is where we start.
                  </p>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                {onNavigateToNeedHelp && (
                  <button
                    onClick={onNavigateToNeedHelp}
                    className="gold-gradient-btn px-6 py-3.5 rounded-2xl text-[#0f172a] font-black text-xs uppercase tracking-wider transition-all shadow-sm border border-amber-200 flex items-center gap-2 cursor-pointer"
                  >
                    <HelpCircle className="w-4 h-4 text-[#0f172a]" />
                    <span>Need Help?</span>
                  </button>
                )}
                {(onNavigateToWhatWeDo || onNavigateToWhatWeHelpWith) && (
                  <button
                    onClick={onNavigateToWhatWeDo || onNavigateToWhatWeHelpWith}
                    className="px-5 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#F3BA4F]" />
                    <span>What We Do</span>
                  </button>
                )}
              </div>
            </div>

            {/* Prominent Mascot Picture Card on Home Screen */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center">
              <div className="w-full max-w-sm rounded-3xl bg-gradient-to-b from-amber-50 to-white border-2 border-[#E5A93C]/60 p-6 shadow-xl text-center space-y-4 relative group">
                
                <div className="relative mx-auto flex items-center justify-center p-2 rounded-2xl bg-white shadow-inner border border-amber-100 overflow-hidden">
                  <PuffinMascot
                    className="w-full max-h-72 object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300"
                    alt="Fill the Gap Atlantic Puffin Mascot with Toonie and Donation Box"
                  />
                </div>

                <div className="space-y-1.5 pt-1">
                  <span className="text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-slate-900 text-[#F3BA4F] inline-block shadow-xs">
                    Fill the Gap for Charity
                  </span>
                  <h3
                    className="text-lg font-black text-[#0f172a] uppercase"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    Giving Together
                  </h3>
                  <p className="text-xs text-stone-600 font-medium leading-relaxed">
                    Rooted in St. John's, NL. Listening to lived experiences and helping our community move forward.
                  </p>
                </div>

                <button
                  onClick={onNavigateToDonate}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 border border-slate-700 shadow-xs cursor-pointer"
                >
                  <Heart className="w-3.5 h-3.5 fill-current text-[#F3BA4F]" />
                  <span>Support The Cause</span>
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. WHY I STARTED FILL THE GAP (FOUNDER'S STORY) */}
      {/* ============================================================ */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0B0F19] text-white rounded-3xl p-8 sm:p-14 shadow-2xl border-2 border-[#E5A93C] relative overflow-hidden space-y-8">
          
          {/* Ambient blur */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#E5A93C]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#1e293b]/40 rounded-full blur-3xl pointer-events-none" />
          
          {/* Decorative watermark */}
          <div className="absolute top-6 right-8 text-[#E5A93C]/10 pointer-events-none">
            <Quote className="w-32 h-32 rotate-180" />
          </div>

          <div className="relative space-y-4">
            <span className="text-[11px] font-black uppercase tracking-wider text-[#F3BA4F] bg-[#0f172a] px-3.5 py-1.5 rounded-full border border-[#E5A93C]/40 inline-flex items-center gap-1.5 shadow-sm">
              <MapPin className="w-3.5 h-3.5 text-[#E5A93C]" />
              Founder's Story • St. John's, Newfoundland & Labrador
            </span>
            
            <h2
              className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              WHY WE STARTED FILL THE GAP
            </h2>
            <h3
              className="text-2xl sm:text-3xl font-black text-[#F3BA4F] uppercase tracking-wide border-b border-slate-700 pb-3"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              THE STORY BEHIND FILL THE GAP
            </h3>
          </div>

          <div className="relative space-y-4 text-slate-100 text-base sm:text-lg leading-relaxed bg-slate-900/60 p-6 sm:p-8 rounded-2xl border border-slate-700">
            <p className="font-semibold text-white text-lg">
              Fill the Gap was founded from a deeply personal experience that revealed a much broader need.
            </p>
            <p className="text-slate-300">
              As a sister supporting her brother, our founder experienced firsthand the challenges of navigating services, finding the right resources, and understanding where to turn for support. What began as an effort to help her brother ultimately revealed a larger gap—one that many individuals and families face when trying to access the support they need.
            </p>
            <p className="font-bold text-[#F3BA4F]">
              That experience became the driving force behind Fill the Gap.
            </p>
            <p className="text-slate-400 text-sm italic">
              Below, our founder shares the personal story that started it all.
            </p>
          </div>

          <div className="relative space-y-5 text-slate-100 text-base sm:text-lg leading-relaxed pt-2">
            <p>
              My brother has mental and physical challenges that mean he needs help with many aspects of his life.
            </p>
            <p>
              We've never minded being there for him. Being family, helping him is just something we've always done.
            </p>
            <p>
              Sometimes that means bringing him where he needs to go. Sometimes it means helping him problem-solve when something isn't working. Sometimes it means figuring out what needs to be done and finding the right person, service, or place to help get it done.
            </p>
            <p>
              We've learned that sometimes the hardest part isn't wanting help.
            </p>
            <p className="text-xl sm:text-2xl font-bold text-[#F3BA4F]">
              It's figuring out <strong className="font-black text-white">how to get it.</strong>
            </p>

            <div className="my-6 space-y-3 bg-slate-900 p-6 sm:p-7 rounded-2xl border-l-4 border-[#E5A93C] text-sm sm:text-base shadow-inner">
              <p className="text-slate-100 font-medium">
                There was one time when my brother really needed help with something important. We started trying to find the right place for him to get that help.
              </p>
              <p className="text-lg sm:text-xl font-black text-white pt-1">
                It took <span className="text-[#F3BA4F] underline decoration-[#E5A93C]">five phone calls</span> before we were finally given the information we needed.
              </p>
              <p className="text-slate-300 font-medium">
                We kept going because we knew he needed it.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <p className="text-lg sm:text-xl font-bold text-white">
                But it made us stop and think: <strong className="text-[#F3BA4F]">What if we weren't there?</strong>
              </p>
              <p className="text-slate-300">
                What if there was nobody to make those calls? Nobody to bring him where he needed to go? Nobody to help him figure out what to do next?
              </p>
            </div>

            <div className="p-6 sm:p-7 bg-slate-900 rounded-2xl border border-slate-200 text-white space-y-2 my-4">
              <p className="text-xs uppercase font-black tracking-wider text-[#F3BA4F]">
                The Core Principle
              </p>
              <p className="text-xl sm:text-3xl font-black text-white" style={{ fontFamily: "'Outfit', sans-serif" }}>
                People shouldn't have to figure everything out alone.
              </p>
            </div>
          </div>

          <div className="relative pt-2 flex flex-wrap items-center gap-4">
            {onNavigateToWhyIStarted && (
              <button
                onClick={onNavigateToWhyIStarted}
                className="gold-gradient-btn px-6 py-4 rounded-2xl text-[#0f172a] font-black text-xs uppercase tracking-wider transition-all shadow-md border border-amber-200 flex items-center gap-2 cursor-pointer"
              >
                <span>Read Full Story & What We Want to Become</span>
                <ArrowRight className="w-4 h-4 text-[#0f172a]" />
              </button>
            )}
            <button
              onClick={onOpenSurvey}
              className="px-6 py-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-[#F3BA4F] font-black text-xs uppercase tracking-wider transition-all shadow-sm border border-[#E5A93C]/50 flex items-center gap-2 cursor-pointer"
            >
              <span>Share Your Experience</span>
            </button>
          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. THE PROBLEM */}
      {/* ============================================================ */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="civic-card rounded-3xl p-8 sm:p-14 space-y-10 relative overflow-hidden">
          
          <div className="relative space-y-3">
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-800 bg-slate-100 px-3.5 py-1.5 rounded-full border border-slate-200 inline-flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-slate-800" />
              The Reality in Newfoundland & Labrador
            </span>
            <h2
              className="text-2xl sm:text-4xl lg:text-5xl font-black text-[#0f172a] tracking-tight uppercase"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              SOMETIMES PEOPLE FALL THROUGH THE CRACKS
            </h2>
            <p className="text-stone-600 text-base sm:text-lg max-w-3xl leading-relaxed">
              There are many dedicated organizations, programs, and people working hard across our province. Yet, individuals and families still struggle to get the support they urgently need.
            </p>
          </div>

          <div className="relative space-y-6">
            {/* 5 Barrier Cards with Micro-Tags */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-2">
              {[
                {
                  tag: 'NAVIGATION',
                  title: 'They may not know where to start.',
                  desc: 'Overwhelmed by multiple services and complex system entry points.',
                  icon: Compass,
                },
                {
                  tag: 'DISCOVERY',
                  title: 'They may not know who to call.',
                  desc: 'Unsure which provincial, municipal, or community agency has the mandate.',
                  icon: HelpCircle,
                },
                {
                  tag: 'ELIGIBILITY',
                  title: 'They may not qualify under rigid criteria.',
                  desc: 'Falling just outside income, demographic, or diagnosis cutoffs.',
                  icon: FileQuestion,
                },
                {
                  tag: 'PRACTICAL',
                  title: 'They face practical barrier friction.',
                  desc: 'Lacking bus fare, work boots, ID fees, or internet access.',
                  icon: Construction,
                },
                {
                  tag: 'ADVOCACY',
                  title: 'They have nobody in their corner.',
                  desc: 'Navigating alone with no dedicated advocate to follow through.',
                  icon: Users,
                },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-slate-50 border-slate-200/80 border border-slate-200 hover:border-[#1e293b]/40 hover:bg-slate-100 transition-all flex flex-col justify-between space-y-3"
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <div className="w-9 h-9 rounded-xl bg-[#0f172a] text-[#F3BA4F] flex items-center justify-center shrink-0 shadow-xs border border-[#E5A93C]/30">
                          <Icon className="w-4.5 h-4.5" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-800 bg-white px-2.5 py-0.5 rounded-md border border-slate-200">
                          {item.tag}
                        </span>
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-[#0f172a] leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-xs text-stone-600 leading-relaxed font-medium">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Core Thesis Card */}
            <div className="p-7 sm:p-9 rounded-3xl bg-[#0B0F19] text-white border-2 border-[#E5A93C] shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#E5A93C]/10 rounded-full blur-2xl pointer-events-none" />
              <div className="relative space-y-3">
                <span className="text-[11px] font-black uppercase tracking-widest text-[#F3BA4F] block">
                  The Core Thesis of Fill the Gap
                </span>
                <p className="font-extrabold text-lg sm:text-2xl text-white leading-snug">
                  Often the barrier isn't that support doesn't exist — the barrier is the <span className="text-[#F3BA4F] underline decoration-[#E5A93C]/60">gap</span> between the person who needs help and the resources that exist.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. WHAT IS THE GAP? */}
      {/* ============================================================ */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-[11px] font-black uppercase tracking-wider text-slate-800 bg-slate-100 px-3.5 py-1.5 rounded-full border border-slate-200">
            Defining The Challenge
          </span>
          <h2
            className="text-2xl sm:text-4xl font-black text-[#0f172a] tracking-tight uppercase"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            WHAT IS THE GAP?
          </h2>
          <p className="text-sm sm:text-base text-stone-600">
            A gap takes many forms in everyday community life across St. John's and Newfoundland & Labrador.
          </p>
        </div>

        {/* 5 Key Definitions of a Gap */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="civic-card rounded-3xl p-8 space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-[#0f172a] text-[#F3BA4F] flex items-center justify-center font-black text-sm border border-[#E5A93C]/40">
                01
              </div>
              <h3 className="text-lg font-black text-[#0f172a]">
                The space between a person and a service
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-medium">
                When a program exists, but complex paperwork, confusing eligibility rules, or communication hurdles make it impossible to reach.
              </p>
            </div>

            <div className="civic-card rounded-3xl p-8 space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-[#0f172a] text-[#F3BA4F] flex items-center justify-center font-black text-sm border border-[#E5A93C]/40">
                02
              </div>
              <h3 className="text-lg font-black text-[#0f172a]">
                The space between a need and an available resource
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-medium">
                When someone has an urgent basic need, but resources are tied up in strict categories, limited hours, or inaccessible locations.
              </p>
            </div>
          </div>

          <div className="civic-card rounded-3xl p-6 space-y-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#0f172a] text-[#F3BA4F] flex items-center justify-center font-black text-xs border border-[#E5A93C]/40">
              03
            </div>
            <h3 className="text-base font-black text-[#0f172a]">
              A barrier preventing movement forward
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed font-medium">
              Transportation limits, lost identification, small application fees, or lack of internet access halting progress.
            </p>
          </div>

          <div className="civic-card rounded-3xl p-6 space-y-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#0f172a] text-[#F3BA4F] flex items-center justify-center font-black text-xs border border-[#E5A93C]/40">
              04
            </div>
            <h3 className="text-base font-black text-[#0f172a]">
              Not knowing where to find help
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed font-medium">
              Facing a stressful crisis with no clear directory, trusted navigator, or knowledgeable human guide to contact.
            </p>
          </div>

          <div className="civic-card rounded-3xl p-6 space-y-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#0f172a] text-[#F3BA4F] flex items-center justify-center font-black text-xs border border-[#E5A93C]/40">
              05
            </div>
            <h3 className="text-base font-black text-[#0f172a]">
              A need unaddressed anywhere
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed font-medium">
              A genuine blind spot in community support where no local agency or non-profit currently operates an active program.
            </p>
          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* 6. HOMEPAGE SURVEY SECTION (COMMUNITY & PROFESSIONAL PATHWAYS) */}
      {/* ============================================================ */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0B0F19] text-white rounded-3xl p-8 sm:p-14 shadow-2xl border border-slate-800 relative overflow-hidden space-y-10">
          
          {/* Subtle Ambient Radial Glows */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#1e293b]/30 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#E5A93C]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative space-y-4 max-w-3xl">
            <span className="text-[11px] font-black uppercase tracking-wider text-[#F3BA4F] bg-slate-800 px-3.5 py-1.5 rounded-full border border-[#E5A93C]/40 inline-flex items-center gap-1.5 shadow-sm">
              <MapPin className="w-3.5 h-3.5 text-[#E5A93C]" />
              Community Voice • St. John's & NL
            </span>
            <h2
              className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              TELL US WHERE THE GAPS ARE
            </h2>
            <p className="text-slate-100 text-base sm:text-lg leading-relaxed">
              We never guess what our community needs. We listen directly to residents navigating challenges and frontline professionals supporting them every day.
            </p>
          </div>

          {/* Dual Survey Pathways: Community Members & Professionals */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
            
            {/* Card 1: Surveys for the Community */}
            <div className="bg-slate-900 border border-slate-700 rounded-3xl p-7 sm:p-8 flex flex-col justify-between space-y-6 hover:border-[#E5A93C] transition-all shadow-md">
              <div className="space-y-3">
                <div className="w-11 h-11 rounded-2xl bg-[#0f172a] text-[#F3BA4F] flex items-center justify-center border border-[#E5A93C]/40 shadow-xs">
                  <ClipboardList className="w-5 h-5" />
                </div>
                <h3
                  className="text-xl font-black text-white uppercase"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  SURVEYS FOR THE COMMUNITY
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
                  Share what you or your loved ones have experienced when trying to find help in St. John's and across Newfoundland & Labrador.
                </p>
              </div>

              <button
                onClick={onOpenSurvey}
                className="gold-gradient-btn w-full py-4 rounded-2xl text-[#0f172a] font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-amber-200 cursor-pointer"
              >
                <span>SURVEYS FOR THE COMMUNITY</span>
                <ArrowRight className="w-4 h-4 text-[#0f172a]" />
              </button>
            </div>

            {/* Card 2: Frontline Providers */}
            <div className="bg-slate-900 border-2 border-[#E5A93C]/80 rounded-3xl p-7 sm:p-8 flex flex-col justify-between space-y-6 hover:border-[#F3BA4F] transition-all shadow-md">
              <div className="space-y-3">
                <div className="w-11 h-11 rounded-2xl bg-[#0f172a] text-[#F3BA4F] flex items-center justify-center border border-[#E5A93C]/40 shadow-xs">
                  <Briefcase className="w-5 h-5" />
                </div>
                <h3
                  className="text-xl font-black text-[#F3BA4F] uppercase"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  FRONTLINE PROVIDERS
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
                  For caseworkers & organizations, non-profit staff, healthcare workers, and frontline teams sharing systemic bottlenecks and unserved client needs.
                </p>
              </div>

              <button
                onClick={onOpenProfessionalSurvey}
                className="w-full py-4 rounded-2xl bg-[#1e293b] hover:bg-slate-800 text-[#F3BA4F] font-black text-xs uppercase tracking-wider transition-all shadow-md border border-[#E5A93C]/60 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>PROFESSIONAL SURVEYS</span>
                <ArrowRight className="w-4 h-4 text-[#F3BA4F]" />
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* 7. HOMEPAGE FINAL SECTION */}
      {/* ============================================================ */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="civic-card rounded-3xl p-8 sm:p-14 text-center space-y-8">
          
          <div className="space-y-4 max-w-3xl mx-auto">
            <div className="w-14 h-14 rounded-2xl bg-[#0f172a] text-[#F3BA4F] flex items-center justify-center mx-auto border border-[#E5A93C]/40 shadow-sm">
              <Heart className="w-7 h-7 fill-current text-[#F3BA4F]" />
            </div>
            <h2
              className="text-3xl sm:text-5xl font-black text-[#0f172a] tracking-tight uppercase"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              EVERYONE DESERVES TO BE HEARD
            </h2>
          </div>

          <div className="space-y-4 text-stone-700 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            <p className="font-bold text-[#0f172a]">
              Everyone deserves to be treated with dignity.
            </p>
            <p>
              Everyone deserves a chance to get the help they need.
            </p>
            <p className="font-black text-[#0f172a]">
              And when there is a gap between a person and the support they need, we want to help find a way across it.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            {onNavigateToNeedHelp && (
              <button
                onClick={onNavigateToNeedHelp}
                className="gold-gradient-btn px-6 py-3.5 rounded-2xl text-[#0f172a] font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 border border-amber-200 cursor-pointer shadow-sm"
              >
                <HelpCircle className="w-4 h-4 text-[#0f172a]" />
                <span>NEED HELP?</span>
              </button>
            )}

            <button
              onClick={onNavigateToGetInvolved}
              className="px-6 py-3.5 rounded-2xl bg-[#0B0F19] hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>GET INVOLVED</span>
            </button>

            <button
              onClick={onNavigateToDonate}
              className="px-6 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md border border-slate-700 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Heart className="w-3.5 h-3.5 fill-current text-[#F3BA4F]" />
              <span>DONATE</span>
            </button>
          </div>

          {/* Transparency Footnote */}
          <div className="pt-6 border-t border-slate-200 max-w-md mx-auto">
            <p className="text-xs text-slate-800/80 leading-relaxed font-medium">
              Fill the Gap is a community initiative starting in St. John's, NL. We are not currently a registered charity.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
};
