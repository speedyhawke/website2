import React from 'react';
import { Ear, BookOpen, Compass, CheckCircle2, MapPin, ArrowRight } from 'lucide-react';

interface WhatWeDoViewProps {
  onOpenSurvey?: () => void;
  onNavigateToWhatWeHelpWith?: () => void;
}

export const WhatWeDoView: React.FC<WhatWeDoViewProps> = ({
  onOpenSurvey,
  onNavigateToWhatWeHelpWith,
}) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-12">
      
      {/* Page Header */}
      <div className="border-b border-slate-200 pb-8 space-y-3">
        <span className="text-[11px] font-black uppercase tracking-wider text-[#1e293b] bg-slate-100 px-3.5 py-1.5 rounded-full border border-slate-200 inline-flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-[#E5A93C]" />
          Our Approach & Mission
        </span>
        <h1
          className="text-4xl sm:text-6xl font-black text-[#0f172a] tracking-tight uppercase"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          WHAT WE DO
        </h1>
      </div>

      {/* SECTION 1: WE'RE STARTING BY LISTENING */}
      <section className="civic-card rounded-3xl p-8 sm:p-12 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#0f172a] text-[#F3BA4F] flex items-center justify-center border border-[#E5A93C]/40 shadow-xs shrink-0">
            <Ear className="w-5 h-5" />
          </div>
          <h2
            className="text-2xl sm:text-3xl font-black text-[#0f172a] uppercase tracking-tight"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            WE'RE STARTING BY LISTENING
          </h2>
        </div>

        <div className="space-y-4 text-stone-700 text-base sm:text-lg leading-relaxed">
          <p className="font-bold text-[#0f172a] text-lg sm:text-xl">
            Fill the Gap is just getting started.
          </p>
          <p>
            Right now, our focus isn't on trying to solve every problem in our community.
          </p>
          <p className="font-bold text-[#1e293b]">
            It's on understanding them.
          </p>
          <p>
            We want to hear from people who have experienced gaps in getting the help or support they needed.
          </p>
        </div>

        {/* Questions list */}
        <div className="bg-slate-100 border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-3">
          <div className="space-y-2.5 text-stone-800 text-base font-medium">
            <p className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#E5A93C] shrink-0" />
              <span>What happened?</span>
            </p>
            <p className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#E5A93C] shrink-0" />
              <span>Where did you get stuck?</span>
            </p>
            <p className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#E5A93C] shrink-0" />
              <span>What did you need?</span>
            </p>
            <p className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#E5A93C] shrink-0" />
              <span>What made it difficult to get?</span>
            </p>
          </div>

          <div className="pt-4 border-t border-slate-200 space-y-1">
            <p className="text-xs uppercase tracking-wider text-[#1e293b] font-black">
              And most importantly:
            </p>
            <p className="text-lg sm:text-xl font-black text-[#0f172a]">
              What do you wish had been available?
            </p>
          </div>
        </div>

        {onOpenSurvey && (
          <div className="pt-2">
            <button
              onClick={onOpenSurvey}
              className="gold-gradient-btn px-6 py-3.5 rounded-2xl text-[#0f172a] font-black text-xs uppercase tracking-wider transition-all shadow-sm border border-amber-200 flex items-center gap-2 cursor-pointer"
            >
              <span>Share Your Experience in the Survey</span>
              <ArrowRight className="w-4 h-4 text-[#0f172a]" />
            </button>
          </div>
        )}
      </section>

      {/* SECTION 2: WE'RE LEARNING */}
      <section className="civic-card rounded-3xl p-8 sm:p-12 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#0f172a] text-[#F3BA4F] flex items-center justify-center border border-[#E5A93C]/40 shadow-xs shrink-0">
            <BookOpen className="w-5 h-5" />
          </div>
          <h2
            className="text-2xl sm:text-3xl font-black text-[#0f172a] uppercase tracking-tight"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            WE'RE LEARNING
          </h2>
        </div>

        <div className="space-y-4 text-stone-700 text-base sm:text-lg leading-relaxed">
          <p>
            There are already organizations, programs, and services doing important work in our community.
          </p>
          <p>
            Before we try to create something new, we want to understand what's already available.
          </p>
          <p className="font-bold text-[#0f172a]">
            We want to learn what works, what doesn't, and where people are still falling through the cracks.
          </p>
        </div>
      </section>

      {/* SECTION 3: WE'RE IDENTIFYING THE GAPS */}
      <section className="civic-card rounded-3xl p-8 sm:p-12 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#0f172a] text-[#F3BA4F] flex items-center justify-center border border-[#E5A93C]/40 shadow-xs shrink-0">
            <Compass className="w-5 h-5" />
          </div>
          <h2
            className="text-2xl sm:text-3xl font-black text-[#0f172a] uppercase tracking-tight"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            WE'RE IDENTIFYING THE GAPS
          </h2>
        </div>

        <div className="space-y-4 text-stone-700 text-base sm:text-lg leading-relaxed">
          <p>
            As we listen and learn, we'll start to see where the biggest gaps may be.
          </p>
          <p>
            Some may be things that can be solved simply by helping people find information.
          </p>
          <p>
            Others may require collaboration with existing organizations.
          </p>
          <p>
            Some may be larger problems that take time, resources, and planning to address.
          </p>
          <p className="font-bold text-[#1e293b] pt-2 text-lg">
            We don't want to promise solutions before we understand the problem.
          </p>
        </div>
      </section>

      {/* SECTION 4: THEN WE'LL DECIDE WHAT WE CAN DO */}
      <section className="civic-card rounded-3xl p-8 sm:p-12 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#0f172a] text-[#F3BA4F] flex items-center justify-center border border-[#E5A93C]/40 shadow-xs shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <h2
            className="text-2xl sm:text-3xl font-black text-[#0f172a] uppercase tracking-tight"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            THEN WE'LL DECIDE WHAT WE CAN DO
          </h2>
        </div>

        <div className="space-y-5 text-stone-700 text-base sm:text-lg leading-relaxed">
          <p>
            This is where Fill the Gap will grow.
          </p>
          <p>
            We'll look at the gaps we discover and ask:
          </p>

          <div className="p-6 rounded-2xl bg-[#0b0f19] text-white border-2 border-[#E5A93C] shadow-lg">
            <p className="text-xl sm:text-2xl font-black text-[#F3BA4F] leading-snug">
              Is there something we can realistically do?
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <p>
              If there is, we'll work toward a practical solution.
            </p>
            <p>
              If someone else is already better equipped to help, we'll point people toward them.
            </p>
            <p>
              And if a gap is too large for us right now, that doesn't mean we'll ignore it. It means we'll learn from it and consider what might be possible in the future.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 5: STARTING SMALL */}
      <section className="bg-[#0b0f19] text-white rounded-3xl p-8 sm:p-14 space-y-8 border-2 border-[#E5A93C] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#E5A93C]/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0f172a] border border-[#E5A93C]/40 text-[#F3BA4F] text-xs font-black uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5 text-[#E5A93C]" />
            <span>St. John's, Newfoundland & Labrador</span>
          </div>

          <h2
            className="text-3xl sm:text-5xl font-black uppercase text-white tracking-tight"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            STARTING SMALL
          </h2>

          <div className="space-y-4 text-white text-base sm:text-lg leading-relaxed font-medium">
            <p className="text-white">
              Fill the Gap is starting in <strong className="text-white font-black">St. John's, Newfoundland & Labrador</strong>.
            </p>

            <p className="text-white">
              We aren't trying to become everything to everyone overnight.
            </p>

            <p className="text-white">
              We're starting with something much simpler:
            </p>

            <div className="p-6 rounded-2xl bg-[#170932] border border-[#E5A93C]/40 text-center sm:text-left my-4 shadow-lg">
              <p
                className="text-xl sm:text-2xl font-black text-[#F3BA4F] tracking-wide"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Listen. Learn. Identify. Then act where we can make a real difference.
              </p>
            </div>

            <p className="text-white">
              As Fill the Gap grows, so will our ability to help.
            </p>

            <div className="p-6 rounded-2xl bg-[#0f172a] border-l-4 border-[#E5A93C] text-white font-bold text-lg sm:text-xl border border-slate-700/60">
              We want our actions to be guided by real community needs — not assumptions about what people need.
            </div>

            {onNavigateToWhatWeHelpWith && (
              <div className="pt-4 flex items-center">
                <button
                  onClick={onNavigateToWhatWeHelpWith}
                  className="gold-gradient-btn px-6 py-3.5 rounded-2xl text-[#0f172a] font-black text-xs uppercase tracking-wider transition-all shadow-md border border-amber-200 flex items-center gap-2 cursor-pointer"
                >
                  <span>See What We Help With</span>
                  <ArrowRight className="w-4 h-4 text-[#0f172a]" />
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

    </div>
  );
};
