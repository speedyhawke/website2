import React from 'react';
import { MapPin, Heart, Users, Ear, Wrench, Handshake, ShieldCheck, SunMedium, ArrowRight, Compass, Shield, Target } from 'lucide-react';

interface AboutViewProps {
  onOpenSurvey: () => void;
  onNavigateToGetInvolved: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({
  onOpenSurvey,
  onNavigateToGetInvolved,
}) => {
  const values = [
    {
      title: 'PEOPLE FIRST',
      desc: 'Treat every person with uncompromising dignity, respect, and compassion.',
      icon: Users,
      color: 'bg-slate-800 text-[#F3BA4F] border-[#E5A93C]/40'
    },
    {
      title: 'LISTENING',
      desc: 'The people experiencing a problem must have a central voice in defining it.',
      icon: Ear,
      color: 'bg-slate-800 text-slate-300 border-slate-600'
    },
    {
      title: 'PRACTICAL HELP',
      desc: 'Solutions must work in real life and remove actual daily friction.',
      icon: Wrench,
      color: 'bg-slate-800 text-[#F3BA4F] border-[#E5A93C]/40'
    },
    {
      title: 'COLLABORATION',
      desc: 'We work alongside existing organizations and community service providers.',
      icon: Handshake,
      color: 'bg-slate-800 text-slate-300 border-slate-600'
    },
    {
      title: 'RESPONSIBILITY',
      desc: 'We operate transparently and never promise what we cannot deliver.',
      icon: ShieldCheck,
      color: 'bg-slate-800 text-[#F3BA4F] border-[#E5A93C]/40'
    },
    {
      title: 'COMMUNITY',
      desc: 'The people of Newfoundland & Labrador help shape our evolution.',
      icon: Heart,
      color: 'bg-slate-800 text-[#F3BA4F] border-[#E5A93C]/40'
    },
    {
      title: 'HOPE',
      desc: 'A difficult situation never eliminates the possibility of a better outcome.',
      icon: SunMedium,
      color: 'bg-slate-800 text-[#F3BA4F] border-[#E5A93C]/40'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Page Title & Intro */}
      <div className="border-b border-slate-200 pb-8 space-y-3">
        <span className="text-[11px] font-black uppercase tracking-wider text-slate-800 bg-slate-100 px-3.5 py-1.5 rounded-full border border-slate-200 inline-flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-slate-800" />
          St. John's, Newfoundland & Labrador
        </span>
        <h1
          className="text-3xl sm:text-5xl font-black text-[#0f172a] tracking-tight uppercase"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          ABOUT FILL THE GAP
        </h1>
        <p className="text-base sm:text-lg text-stone-600 max-w-3xl leading-relaxed">
          Helping close the gaps between people, resources, and the support they need across St. John's and Newfoundland & Labrador.
        </p>
      </div>

      {/* 1. WHY WE EXIST */}
      <section className="civic-card rounded-3xl p-8 sm:p-12 space-y-6">
        <div className="space-y-2">
          <span className="text-[11px] font-black uppercase tracking-wider text-slate-800 bg-slate-100 px-3.5 py-1 rounded-full border border-slate-200">
            Our Purpose
          </span>
          <h2
            className="text-2xl sm:text-3xl font-black text-[#0f172a] uppercase"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            WHY WE EXIST
          </h2>
        </div>

        <div className="space-y-4 text-stone-700 text-base sm:text-lg leading-relaxed">
          <p className="font-bold text-[#0f172a] text-lg sm:text-xl">
            Fill the Gap exists because people can fall through gaps between existing services and the support they actually need.
          </p>
          <p>
            There are already many organizations and people doing important work in our communities.
          </p>
          <p className="font-bold text-slate-800">
            We don't want to replace that work.
          </p>
          <p>
            We want to understand where people are being missed, where they are getting stuck, and where practical gaps exist so we can build responsible pathways forward.
          </p>
        </div>
      </section>

      {/* 2. OUR APPROACH (ROYAL PURPLE CONTAINER) */}
      <section className="bg-[#0b0f19] text-white rounded-3xl p-8 sm:p-12 shadow-2xl border-2 border-[#E5A93C] space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#E5A93C]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative space-y-2">
          <span className="text-[11px] font-black uppercase tracking-wider text-[#F3BA4F] bg-slate-800 px-3.5 py-1.5 rounded-full border border-[#E5A93C]/40 inline-flex items-center gap-1.5">
            <Target className="w-3.5 h-3.5 text-[#E5A93C]" />
            Our Method
          </span>
          <h2
            className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            OUR APPROACH
          </h2>
        </div>

        <div className="relative p-7 sm:p-8 bg-slate-900 rounded-2xl border border-slate-700 space-y-4">
          <h3
            className="text-xl sm:text-2xl font-black text-[#F3BA4F] uppercase"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            WE LISTEN FIRST
          </h3>
          <div className="space-y-3 text-slate-100 text-sm sm:text-base leading-relaxed">
            <p>
              We don't assume we already know everything the community needs.
            </p>
            <p>
              We hear from people experiencing these gaps, learn from frontline practitioners, understand available programs, and identify recurring barriers.
            </p>
            <p className="font-bold text-white pt-1 text-lg">
              Then we look for responsible, collaborative solutions.
            </p>
          </div>
        </div>
      </section>

      {/* 3. OUR VALUES */}
      <section className="space-y-6">
        <div className="space-y-2 text-center sm:text-left">
          <span className="text-[11px] font-black uppercase tracking-wider text-slate-800 bg-slate-100 px-3.5 py-1 rounded-full border border-slate-200">
            Principles We Stand By
          </span>
          <h2
            className="text-2xl sm:text-3xl font-black text-[#0f172a] uppercase"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            OUR VALUES
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {values.map((v) => {
            const Icon = v.icon;
            return (
              <div
                key={v.title}
                className="civic-card rounded-3xl p-6 space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className={`w-11 h-11 rounded-2xl flex items-center justify-center border shrink-0 ${v.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3
                    className="text-base font-black text-[#0f172a] uppercase tracking-wide"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    {v.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-medium">
                    {v.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. WHERE WE ARE STARTING */}
      <section className="bg-slate-50 border-slate-200 border border-slate-200 rounded-3xl p-8 sm:p-12 space-y-5">
        <div className="space-y-2">
          <span className="text-[11px] font-black uppercase tracking-wider text-slate-800 bg-slate-100 px-3.5 py-1 rounded-full border border-slate-200 inline-flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-slate-800" />
            Geographic Scope
          </span>
          <h2
            className="text-2xl sm:text-3xl font-black text-[#0f172a] uppercase"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            WHERE WE ARE STARTING
          </h2>
        </div>

        <div className="space-y-4 text-stone-800 text-sm sm:text-base leading-relaxed">
          <p className="text-base sm:text-lg font-bold text-[#0f172a]">
            Fill the Gap is starting in <strong>St. John's, Newfoundland & Labrador</strong>.
          </p>
          <p>
            Starting locally allows us to listen deeply, map exact local support pathways, identify blind spots, and build responsibly.
          </p>
          <p className="text-xs sm:text-sm text-slate-800 font-bold">
            Our long-term commitment is to expand across Newfoundland and Labrador as our capacity grows.
          </p>
        </div>
      </section>

      {/* Bottom Action Card */}
      <div className="civic-card rounded-3xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-lg font-black text-[#0f172a] uppercase">Share your experience in NL</h3>
          <p className="text-xs sm:text-sm text-stone-600 font-medium">Your insight directly guides where Fill the Gap focuses energy.</p>
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
            className="px-5 py-3.5 rounded-2xl border border-slate-200 hover:bg-slate-100 text-[#0f172a] font-black text-xs uppercase tracking-wider transition-colors cursor-pointer"
          >
            Get Involved
          </button>
        </div>
      </div>

    </div>
  );
};
