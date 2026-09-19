import React from 'react';
import { MapPin, Quote, ArrowRight, Heart } from 'lucide-react';

interface WhyIStartedViewProps {
  onOpenSurvey: () => void;
  onNavigateToGetInvolved: () => void;
}

export const WhyIStartedView: React.FC<WhyIStartedViewProps> = ({
  onOpenSurvey,
  onNavigateToGetInvolved,
}) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Page Header */}
      <div className="border-b border-slate-200 pb-8 space-y-3">
        <span className="text-[11px] font-black uppercase tracking-wider text-slate-800 bg-slate-100 px-3.5 py-1.5 rounded-full border border-slate-200 inline-flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-[#E5A93C]" />
          Founder's Story • St. John's, Newfoundland & Labrador
        </span>
        <h1
          className="text-4xl sm:text-6xl font-black text-[#0f172a] tracking-tight uppercase"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          WHY WE STARTED FILL THE GAP
        </h1>
      </div>

      {/* Main Story Container */}
      <article className="civic-card rounded-3xl p-8 sm:p-14 space-y-12 relative overflow-hidden">
        
        {/* Subtle decorative quote accent */}
        <div className="absolute top-6 right-8 text-[#E5A93C]/10 pointer-events-none">
          <Quote className="w-32 h-32 rotate-180" />
        </div>

        {/* SECTION 1: THE STORY BEHIND FILL THE GAP */}
        <section className="space-y-6 relative">
          <h2
            className="text-2xl sm:text-3xl font-black text-[#0f172a] uppercase tracking-wide border-b border-slate-200 pb-4"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            The Story Behind Fill the Gap
          </h2>

          <div className="space-y-4 text-stone-800 text-base sm:text-lg leading-relaxed">
            <p className="font-semibold text-slate-900 text-lg sm:text-xl">
              Fill the Gap was founded from a deeply personal experience that revealed a much broader need.
            </p>
            <p>
              As a sister supporting her brother, our founder experienced firsthand the challenges of navigating services, finding the right resources, and understanding where to turn for support. What began as an effort to help her brother ultimately revealed a larger gap—one that many individuals and families face when trying to access the support they need.
            </p>
            <div className="p-5 sm:p-6 rounded-2xl bg-amber-500/10 border-2 border-[#E5A93C] text-[#0f172a] font-bold text-base sm:text-lg">
              <p>That experience became the driving force behind Fill the Gap.</p>
            </div>
            <p className="text-stone-600 font-medium italic">
              Below, our founder shares the personal story that started it all.
            </p>
          </div>

          <div className="pt-6 border-t border-slate-200 space-y-4 text-stone-800 text-base sm:text-lg leading-relaxed">
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
            <p className="text-xl sm:text-2xl font-bold text-slate-800">
              It's figuring out <strong className="font-black text-[#0f172a]">how to get it.</strong>
            </p>
          </div>

          <div className="bg-slate-50 border-slate-200 border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4 my-6">
            <p className="text-stone-800 text-base sm:text-lg leading-relaxed">
              There was one time when my brother really needed help with something important. We started trying to find the right place for him to get that help.
            </p>
            <p className="text-xl sm:text-2xl font-black text-[#0f172a]">
              It took <span className="text-slate-800 bg-amber-100/80 px-2 py-0.5 rounded-lg">five phone calls</span> before we were finally given the information we needed.
            </p>
            <p className="text-stone-800 text-base sm:text-lg leading-relaxed">
              We kept going because we knew he needed it.
            </p>
          </div>

          <div className="space-y-4 text-stone-800 text-base sm:text-lg leading-relaxed">
            <p className="text-lg sm:text-xl font-bold text-[#0f172a]">
              But it made us stop and think:
            </p>

            <div className="p-6 sm:p-8 rounded-2xl bg-[#0b0f19] text-white border-2 border-[#E5A93C] shadow-lg space-y-3 my-4">
              <p className="text-2xl sm:text-3xl font-black text-[#F3BA4F]" style={{ fontFamily: "'Outfit', sans-serif" }}>
                What if we weren't there?
              </p>
              <div className="space-y-2 text-slate-100 text-base sm:text-lg font-medium pt-2 border-t border-slate-700/80">
                <p>What if there was nobody to make those calls?</p>
                <p>Nobody to bring him where he needed to go?</p>
                <p>Nobody to help him figure out what to do next?</p>
                <p>Nobody to help him find the service that could get the important things done?</p>
                <p className="text-white font-black text-lg pt-1">What if he had to figure all of that out on his own?</p>
              </div>
            </div>

            <p className="pt-2">
              And then we started thinking about all the other people who may not have someone in their corner.
            </p>
          </div>

          {/* People list */}
          <div className="my-6 space-y-3 bg-slate-50 border-slate-200 p-6 sm:p-8 rounded-2xl border-l-4 border-[#E5A93C] text-base sm:text-lg text-stone-800">
            <p className="font-medium">— People who are already struggling and don't know where to start.</p>
            <p className="font-medium">— People who don't know what services exist.</p>
            <p className="font-medium">— People who get sent from one place to another.</p>
            <p className="font-medium">— People who don't understand how to navigate the system.</p>
            <p className="font-medium">— People who are waiting for help.</p>
            <p className="font-bold text-[#0f172a] pt-1">
              — People who may know they need something but don't know <strong className="text-slate-800">how to get from needing it to actually getting it.</strong>
            </p>
          </div>

          <div className="space-y-4 text-stone-800 text-base sm:text-lg leading-relaxed">
            <p>
              We're not saying we can fix all of those problems.
            </p>
            <p className="font-bold text-[#0f172a]">
              We can't.
            </p>
            <p>
              And Fill the Gap isn't starting with all the answers.
            </p>
            <p>
              It's starting with a simple idea:
            </p>

            <div className="p-6 rounded-2xl bg-[#0f172a] text-white border border-slate-200 shadow-md my-4">
              <p
                className="text-xl sm:text-3xl font-black text-[#F3BA4F] leading-snug"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                People shouldn't have to figure everything out alone.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: WHAT WE WANT FILL THE GAP TO BECOME */}
        <section className="space-y-6 pt-4 relative">
          <h2
            className="text-2xl sm:text-3xl font-black text-[#0f172a] uppercase tracking-wide border-b border-slate-200 pb-4"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            WHAT WE WANT FILL THE GAP TO BECOME
          </h2>

          <div className="space-y-4 text-stone-800 text-base sm:text-lg leading-relaxed">
            <p className="font-bold text-[#0f172a] text-lg sm:text-xl">
              We want Fill the Gap to be a place that looks at those moments where people get stuck.
            </p>

            <div className="space-y-2.5 bg-slate-50 border-slate-200 p-6 rounded-2xl border border-slate-200 my-4 text-stone-800">
              <p className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#E5A93C] shrink-0 mt-2" />
                <span>Sometimes the answer may be helping someone find an existing resource.</span>
              </p>
              <p className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#E5A93C] shrink-0 mt-2" />
                <span>Sometimes it may be helping them understand where to start.</span>
              </p>
              <p className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#E5A93C] shrink-0 mt-2" />
                <span>Sometimes it may be a practical barrier that needs to be addressed.</span>
              </p>
              <p className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#E5A93C] shrink-0 mt-2" />
                <span>And sometimes we may discover a gap where something new is needed.</span>
              </p>
            </div>

            <p>
              We don't know yet what every answer will look like.
            </p>
            <p>
              And we don't want to pretend that we do.
            </p>
            <p className="font-medium text-slate-800">
              We want to listen to the people who are experiencing these problems.
            </p>
            <p className="font-medium text-slate-800">
              We want to learn what's already available.
            </p>
            <p className="font-medium text-slate-800">
              We want to understand what's missing.
            </p>
            <p>
              And then, as Fill the Gap grows, we want to do what we realistically can to help.
            </p>
          </div>

          {/* He Had Us */}
          <div className="p-8 sm:p-10 rounded-3xl bg-[#0b0f19] text-white border-2 border-[#E5A93C] shadow-2xl my-8 space-y-6">
            <div className="space-y-2">
              <p className="text-lg sm:text-xl text-slate-300 font-medium">
                My brother had someone in his corner.
              </p>
              <p
                className="text-3xl sm:text-5xl font-black text-[#F3BA4F] tracking-tight"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                He had us.
              </p>
            </div>

            <div className="space-y-3 text-slate-100 text-base sm:text-lg leading-relaxed pt-4 border-t border-slate-700">
              <p>That experience made us wonder about the people who don't have that.</p>
              <p>The people who need someone to help them figure out the next step.</p>
              <p>The people who just need someone to listen and help them find a way forward.</p>
            </div>

            <div className="pt-4 border-t border-slate-700 space-y-3">
              <p className="text-sm uppercase tracking-widest text-[#E5A93C] font-black">
                That's where Fill the Gap begins.
              </p>
              <div className="space-y-1">
                <p className="text-xl sm:text-2xl font-black text-white">
                  We may not have all the answers today.
                </p>
                <p className="text-xl sm:text-2xl font-black text-[#F3BA4F]">
                  But we're willing to listen, learn, and keep looking for them.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-700 space-y-2 text-slate-100 text-base sm:text-lg font-bold">
              <p>Because everyone deserves to be heard.</p>
              <p>Everyone deserves to be treated with dignity.</p>
              <p>And everyone deserves a chance to get the help they need.</p>
            </div>

            <div className="pt-4">
              <p
                className="text-2xl sm:text-4xl font-black text-[#F3BA4F] uppercase tracking-tight"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                That's why we started Fill the Gap.
              </p>
            </div>
          </div>
        </section>

      </article>

      {/* Action Footer */}
      <div className="bg-[#0b0f19] text-white rounded-3xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 border-2 border-[#E5A93C] shadow-2xl">
        <div className="space-y-1 text-center sm:text-left">
          <h3
            className="text-lg sm:text-xl font-black uppercase text-white"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Help shape what Fill the Gap becomes
          </h3>
          <p className="text-xs sm:text-sm text-slate-300/90 font-medium">
            Share what you've observed or experienced in Newfoundland & Labrador.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={onOpenSurvey}
            className="gold-gradient-btn px-6 py-3.5 rounded-2xl text-[#0f172a] font-black text-xs uppercase tracking-wider shadow-md border border-amber-200 cursor-pointer"
          >
            Take the Survey
          </button>
          <button
            onClick={onNavigateToGetInvolved}
            className="px-5 py-3.5 rounded-2xl bg-[#1e293b] hover:bg-[#334155] text-[#F3BA4F] border border-[#E5A93C]/40 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
          >
            Get Involved
          </button>
        </div>
      </div>

    </div>
  );
};
