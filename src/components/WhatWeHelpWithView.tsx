import React from 'react';
import {
  Compass,
  HeartHandshake,
  Search,
  HelpCircle,
  Sparkles,
  Mail,
  ClipboardList,
  Users,
  MapPin,
  CheckCircle2,
} from 'lucide-react';

interface WhatWeHelpWithViewProps {
  onOpenSurvey?: () => void;
  onOpenProfessionalSurvey?: () => void;
  onNavigateToContact?: () => void;
  onNavigateToDonate?: () => void;
  onNavigateToGetInvolved?: () => void;
}

export const WhatWeHelpWithView: React.FC<WhatWeHelpWithViewProps> = ({
  onOpenSurvey,
  onOpenProfessionalSurvey,
  onNavigateToContact,
}) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-12 sm:space-y-16 text-stone-800">
      
      {/* ============================================================ */}
      {/* 1. HEADER & INTRO */}
      {/* ============================================================ */}
      <div className="border-b border-slate-200 pb-8 space-y-5">
        <span className="text-[11px] font-black uppercase tracking-wider text-slate-800 bg-slate-100 px-3.5 py-1.5 rounded-full border border-slate-200 inline-flex items-center gap-1.5 shadow-xs">
          <MapPin className="w-3.5 h-3.5 text-[#E5A93C]" />
          St. John’s & NL Community Support
        </span>
        
        <h1
          className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#0f172a] tracking-tight uppercase"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          WHAT WE HELP WITH
        </h1>

        <div className="space-y-4 text-base sm:text-xl text-stone-800 font-medium leading-relaxed max-w-3xl">
          <p>
            Fill the Gap exists to help <strong className="text-[#0f172a] font-bold">fill the gaps that can leave low-income people without a clear path forward.</strong>
          </p>
          <p className="text-stone-700 text-base sm:text-lg">
            Sometimes someone is doing everything they can to move forward, but one missing piece is standing in the way.
          </p>
          <p className="text-stone-700 text-base sm:text-lg">
            It may be a practical barrier during a major transition, a need that isn't covered by an existing program, or a situation where available supports don't quite meet the person's circumstances.
          </p>
          <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 text-[#0f172a]">
            <p className="text-lg sm:text-xl font-black">
              That's where Fill the Gap wants to help.
            </p>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 2. OUR MAIN FOCUS: PEOPLE IN TRANSITION */}
      {/* ============================================================ */}
      <section className="civic-card rounded-3xl p-6 sm:p-10 space-y-6 shadow-md">
        <div className="flex items-center gap-3.5 border-b border-slate-100 pb-4">
          <div className="w-11 h-11 rounded-2xl bg-[#0f172a] text-[#F3BA4F] flex items-center justify-center shrink-0 border border-[#E5A93C]/40 shadow-xs">
            <Compass className="w-5 h-5" />
          </div>
          <h2
            className="text-2xl sm:text-3xl font-black text-[#0f172a] uppercase tracking-tight"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Our Main Focus: People in Transition
          </h2>
        </div>

        <div className="space-y-4 text-stone-800 text-base sm:text-lg leading-relaxed">
          <p className="font-semibold text-slate-900">
            One of our primary areas of focus is supporting low-income people through significant transitions.
          </p>
          <p className="text-stone-700">
            This may include people who are:
          </p>
          
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {[
              'Leaving treatment',
              'Transitioning out of homelessness',
              'Moving from one support system to another',
              'Rebuilding their lives after a major setback',
            ].map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5 bg-slate-50 border border-slate-200 p-3.5 rounded-xl font-bold text-slate-900 text-sm sm:text-base">
                <CheckCircle2 className="w-5 h-5 text-[#E5A93C] shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <p className="pt-2">
            Even when programs and services are available, there can still be <strong className="text-slate-900 font-bold">gaps that make moving forward difficult.</strong>
          </p>

          <p>
            Fill the Gap looks at the individual situation and asks:
          </p>

          <div className="p-6 rounded-2xl bg-[#0f172a] text-white border-2 border-[#E5A93C] shadow-lg text-center my-4">
            <p className="text-2xl sm:text-4xl font-black text-[#F3BA4F] uppercase tracking-wide" style={{ fontFamily: "'Outfit', sans-serif" }}>
              “What's missing?”
            </p>
          </div>

          <p className="font-semibold text-slate-900">
            When we have the ability and resources to help fill that gap, we will do our best to help.
          </p>
        </div>

        {/* Sub-section: What Might a Gap Look Like? */}
        <div className="pt-6 border-t border-slate-200 space-y-4">
          <h3
            className="text-xl sm:text-2xl font-black text-[#0f172a] uppercase tracking-tight"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            What Might a Gap Look Like?
          </h3>
          <p className="text-stone-700 text-sm sm:text-base font-medium">
            Every situation is different, but a gap might look like:
          </p>

          <div className="space-y-3">
            {[
              'Someone leaving treatment who encounters a practical barrier that makes continuing their recovery more difficult.',
              'Someone transitioning out of homelessness who has a specific need that isn’t being addressed by the services available to them.',
              'Someone who has been offered a job but cannot afford something essential they need to accept or start the job.',
              'Someone moving from one support system to another who encounters an unmet practical need.',
              'Someone trying to move forward after a major setback who has one specific barrier preventing them from taking the next step.',
            ].map((example, idx) => (
              <div key={idx} className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200 text-sm sm:text-base text-stone-800 leading-relaxed">
                <span className="w-2 h-2 rounded-full bg-[#E5A93C] shrink-0 mt-2" />
                <span>{example}</span>
              </div>
            ))}
          </div>

          <p className="text-xs sm:text-sm text-stone-500 font-bold uppercase tracking-wider pt-1">
            These are examples, not a complete list.
          </p>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. TREATMENT & RECOVERY ACCESS */}
      {/* ============================================================ */}
      <section className="civic-card rounded-3xl p-6 sm:p-10 space-y-6 shadow-md">
        <div className="flex items-center gap-3.5 border-b border-slate-100 pb-4">
          <div className="w-11 h-11 rounded-2xl bg-[#0f172a] text-[#F3BA4F] flex items-center justify-center shrink-0 border border-[#E5A93C]/40 shadow-xs">
            <HeartHandshake className="w-5 h-5" />
          </div>
          <h2
            className="text-2xl sm:text-3xl font-black text-[#0f172a] uppercase tracking-tight"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Treatment & Recovery Access
          </h2>
        </div>

        <div className="space-y-4 text-stone-800 text-base sm:text-lg leading-relaxed">
          <p>
            We want to help people facing practical barriers to accessing treatment and recovery supports.
          </p>

          <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/10 border-2 border-[#E5A93C] text-[#0f172a]">
            <p className="font-black text-base sm:text-lg uppercase tracking-tight">
              We are not a treatment or recovery program.
            </p>
          </div>

          <p>
            Our role is to look at the barriers surrounding the person and determine what we may be able to do.
          </p>
          <p className="text-stone-700">
            This could include helping someone understand what resources are available, offering to make a phone call, helping them take the first step toward accessing a service, or addressing a practical gap when we have the ability to do so.
          </p>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. CONNECTING PEOPLE WITH EXISTING RESOURCES */}
      {/* ============================================================ */}
      <section className="civic-card rounded-3xl p-6 sm:p-10 space-y-6 shadow-md">
        <div className="flex items-center gap-3.5 border-b border-slate-100 pb-4">
          <div className="w-11 h-11 rounded-2xl bg-[#0f172a] text-[#F3BA4F] flex items-center justify-center shrink-0 border border-[#E5A93C]/40 shadow-xs">
            <Search className="w-5 h-5" />
          </div>
          <h2
            className="text-2xl sm:text-3xl font-black text-[#0f172a] uppercase tracking-tight"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Connecting People With Existing Resources
          </h2>
        </div>

        <div className="space-y-4 text-stone-800 text-base sm:text-lg leading-relaxed">
          <p className="font-semibold text-slate-900">
            Fill the Gap does not want to duplicate services that already exist in our community.
          </p>

          <p>
            When an existing organization or program may be able to help, <strong className="text-slate-900 font-bold">we will do our best to connect people with that resource.</strong>
          </p>

          <div className="space-y-2 pt-2">
            <p className="font-medium text-stone-800">
              Depending on the situation, this may mean:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {[
                'Helping someone identify a resource',
                'Helping them understand their options',
                'Offering to make a phone call',
                'Helping them figure out what step to take next',
                'Sharing information and resources we have available',
              ].map((step, idx) => (
                <div key={idx} className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-semibold text-slate-900">
                  <span className="w-2 h-2 rounded-full bg-[#E5A93C] shrink-0" />
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="pt-2">
            We can't guarantee that another organization will be able to help, but <strong className="text-slate-900 font-bold">we can do our best to help people find their way to the right place.</strong>
          </p>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. WHEN THERE IS STILL A GAP */}
      {/* ============================================================ */}
      <section className="civic-card rounded-3xl p-6 sm:p-10 space-y-6 shadow-md">
        <div className="flex items-center gap-3.5 border-b border-slate-100 pb-4">
          <div className="w-11 h-11 rounded-2xl bg-[#0f172a] text-[#F3BA4F] flex items-center justify-center shrink-0 border border-[#E5A93C]/40 shadow-xs">
            <Sparkles className="w-5 h-5" />
          </div>
          <h2
            className="text-2xl sm:text-3xl font-black text-[#0f172a] uppercase tracking-tight"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            When There Is Still a Gap
          </h2>
        </div>

        <div className="space-y-4 text-stone-800 text-base sm:text-lg leading-relaxed">
          <p>
            Sometimes there isn't an existing service that addresses the particular need.
          </p>
          <p>
            Sometimes a person has access to a program but is missing something practical that prevents them from moving forward.
          </p>

          <div className="p-5 sm:p-6 rounded-2xl bg-slate-900 text-white border-2 border-[#E5A93C] shadow-lg">
            <p className="text-base sm:text-xl font-black text-[#F3BA4F]">
              Those are the gaps Fill the Gap is most interested in addressing.
            </p>
          </div>

          <p className="font-semibold text-slate-900">
            We will look at each situation individually and determine whether there is something we can realistically and responsibly do.
          </p>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 6. MORE THAN WHAT'S LISTED HERE */}
      {/* ============================================================ */}
      <section className="civic-card rounded-3xl p-6 sm:p-10 space-y-6 shadow-md">
        <div className="flex items-center gap-3.5 border-b border-slate-100 pb-4">
          <div className="w-11 h-11 rounded-2xl bg-[#0f172a] text-[#F3BA4F] flex items-center justify-center shrink-0 border border-[#E5A93C]/40 shadow-xs">
            <HelpCircle className="w-5 h-5" />
          </div>
          <h2
            className="text-2xl sm:text-3xl font-black text-[#0f172a] uppercase tracking-tight"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            More Than What's Listed Here
          </h2>
        </div>

        <div className="space-y-4 text-stone-800 text-base sm:text-lg leading-relaxed">
          <p>
            The situations above are examples of where Fill the Gap may be able to help. <strong className="text-slate-900 font-bold">They are not a complete list.</strong>
          </p>
          <p className="text-stone-700">
            Every person's circumstances are different, and not every gap will fit neatly into a category.
          </p>
          <p className="font-semibold text-slate-900">
            If you're facing a situation and aren't sure whether Fill the Gap can help, <strong className="text-[#0f172a] underline decoration-[#E5A93C]">we encourage you to reach out.</strong>
          </p>
          <p className="text-stone-700">
            We'll listen, look at the situation, and do our best to determine whether we can help, connect you with an existing resource, or point you toward another appropriate option.
          </p>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 7. WE'RE STARTING SMALL */}
      {/* ============================================================ */}
      <section className="bg-[#0B0F19] text-white rounded-3xl p-8 sm:p-12 shadow-2xl border-2 border-[#E5A93C] relative overflow-hidden space-y-6">
        <div className="space-y-2">
          <span className="text-[11px] font-black uppercase tracking-widest text-[#F3BA4F] block">
            Our Foundation
          </span>
          <h2
            className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            We're Starting Small
          </h2>
        </div>

        <div className="space-y-4 text-stone-200 text-base sm:text-lg leading-relaxed">
          <p>
            Fill the Gap is a new organization. We don't have every program, resource, or answer in place yet.
          </p>
          <p>
            We're starting by listening, learning, identifying genuine gaps, and helping where we realistically can.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-700 space-y-3">
          <p className="text-base sm:text-lg font-bold text-slate-300">
            We can't promise that we'll be able to help every person or solve every problem.
          </p>
          <p className="text-xl sm:text-2xl font-black text-[#F3BA4F]" style={{ fontFamily: "'Outfit', sans-serif" }}>
            But when we can help, we'll do our best to make a difference.
          </p>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 8. CONNECT WITH FILL THE GAP ACTIONS */}
      {/* ============================================================ */}
      <section className="civic-card rounded-3xl p-6 sm:p-10 space-y-6">
        <div className="space-y-2">
          <h3
            className="text-xl sm:text-2xl font-black text-[#0f172a] uppercase tracking-tight"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Connect With Fill the Gap
          </h3>
          <p className="text-xs sm:text-sm text-stone-600">
            Reach out directly or let us know about the barriers you're seeing:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {onNavigateToContact && (
            <button
              onClick={onNavigateToContact}
              className="p-5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-left transition-all border border-slate-700 space-y-2 group cursor-pointer"
            >
              <div className="w-8 h-8 rounded-xl bg-slate-800 text-[#F3BA4F] flex items-center justify-center border border-slate-700 group-hover:scale-105 transition-transform">
                <Mail className="w-4 h-4" />
              </div>
              <div className="font-black text-sm text-white">Get in Touch</div>
              <p className="text-xs text-stone-400 font-normal">
                Ask a question, share a resource, or request navigation support.
              </p>
            </button>
          )}

          {onOpenSurvey && (
            <button
              onClick={onOpenSurvey}
              className="p-5 rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100/60 hover:to-amber-100 text-slate-900 font-bold text-left transition-all border-2 border-[#E5A93C]/60 space-y-2 group cursor-pointer"
            >
              <div className="w-8 h-8 rounded-xl bg-slate-900 text-[#F3BA4F] flex items-center justify-center border border-slate-800 group-hover:scale-105 transition-transform">
                <ClipboardList className="w-4 h-4" />
              </div>
              <div className="font-black text-sm text-[#0f172a]">Community Survey</div>
              <p className="text-xs text-stone-700 font-normal">
                Tell us what barriers you or someone you know have faced in NL.
              </p>
            </button>
          )}

          {onOpenProfessionalSurvey && (
            <button
              onClick={onOpenProfessionalSurvey}
              className="p-5 rounded-2xl bg-slate-50 hover:bg-slate-100 text-slate-900 font-bold text-left transition-all border border-slate-200 space-y-2 group cursor-pointer"
            >
              <div className="w-8 h-8 rounded-xl bg-slate-900 text-sky-400 flex items-center justify-center border border-slate-800 group-hover:scale-105 transition-transform">
                <Users className="w-4 h-4" />
              </div>
              <div className="font-black text-sm text-[#0f172a]">Frontline Agency Survey</div>
              <p className="text-xs text-stone-600 font-normal">
                Share systemic gaps seen by caseworkers, nurses, and staff.
              </p>
            </button>
          )}
        </div>
      </section>

    </div>
  );
};
