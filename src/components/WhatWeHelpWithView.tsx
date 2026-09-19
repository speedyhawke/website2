import React from 'react';
import {
  Compass,
  PhoneCall,
  Search,
  HelpCircle,
  Mail,
  ClipboardList,
  Users,
  MapPin,
  CheckCircle2,
  AlertCircle,
  ShieldAlert,
  Layers,
  ArrowRight,
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
          St. John’s & NL Navigation Support
        </span>
        
        <h1
          className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#0f172a] tracking-tight uppercase"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          WHAT WE DO
        </h1>

        <div className="space-y-4 text-base sm:text-xl text-stone-800 font-medium leading-relaxed max-w-3xl">
          <p className="text-lg sm:text-2xl font-bold text-[#0f172a] italic leading-snug">
            Fill the Gap helps people who are having difficulty finding, accessing, or navigating services and supports.
          </p>

          <p className="text-stone-700 text-base sm:text-lg">
            Sometimes the help someone needs already exists, but getting connected to it isn't as simple as it should be.
          </p>

          {/* Maybe they... cards */}
          <div className="space-y-2.5 pt-2">
            {[
              "Maybe they don't know who to call.",
              "Maybe they've been given a referral but don't know what happens next.",
              "Maybe they've called somewhere and aren't sure what they were told.",
              "Maybe they're overwhelmed by the process.",
              "Maybe they've been referred from one organization to another and don't know where to go from there.",
            ].map((text, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3.5 sm:p-4 rounded-xl bg-slate-50 border border-slate-200 text-sm sm:text-base text-stone-800 font-medium leading-relaxed"
              >
                <span className="w-2 h-2 rounded-full bg-[#E5A93C] shrink-0 mt-2" />
                <span>{text}</span>
              </div>
            ))}
          </div>

          <p className="text-stone-700 text-base sm:text-lg pt-1">
            Sometimes one barrier can make it difficult to move forward.
          </p>

          <div className="p-5 rounded-2xl bg-amber-50 border-2 border-[#E5A93C] text-[#0f172a] shadow-xs">
            <p className="text-lg sm:text-xl font-black italic">
              That's where Fill the Gap wants to help.
            </p>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 2. WHAT WE CAN PROMISE */}
      {/* ============================================================ */}
      <section className="civic-card rounded-3xl p-6 sm:p-10 space-y-6 shadow-md">
        <div className="flex items-center gap-3.5 border-b border-slate-100 pb-4">
          <div className="w-11 h-11 rounded-2xl bg-[#0f172a] text-[#F3BA4F] flex items-center justify-center shrink-0 border border-[#E5A93C]/40 shadow-xs">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <h2
            className="text-2xl sm:text-3xl font-black text-[#0f172a] uppercase tracking-tight"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            What We Can Promise
          </h2>
        </div>

        <div className="space-y-4 text-stone-800 text-base sm:text-lg leading-relaxed">
          <p className="font-bold text-[#0f172a] text-lg italic">
            We can't guarantee that we'll be able to help with every situation.
          </p>

          <p className="text-stone-700">
            We also can't control what another organization does, whether someone qualifies for a service, how long a waitlist is, whether a program has space, or what decision another organization makes.
          </p>

          {/* Emergency disclaimer callout */}
          <div className="p-5 sm:p-6 rounded-2xl bg-amber-50/80 border-2 border-amber-300 text-stone-900 space-y-2">
            <div className="flex items-center gap-2 font-black text-amber-900 uppercase text-xs sm:text-sm tracking-wide">
              <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
              <span>Important Notice Concerning Emergencies</span>
            </div>
            <p className="font-bold text-amber-950 italic">
              We are not an emergency service and we are not equipped to respond to emergencies or provide immediate crisis assistance.
            </p>
            <p className="text-sm sm:text-base text-amber-900 leading-relaxed">
              If someone is in immediate danger or needs urgent medical, mental-health, or crisis assistance, they should contact the appropriate emergency or crisis service.
            </p>
          </div>

          <p className="font-bold text-[#0f172a] pt-2 italic">
            What we can do is listen, understand the situation, look at what options may exist, and do our best to help.
          </p>

          <div className="space-y-2.5 pt-1">
            {[
              'Sometimes that may mean helping someone make a phone call.',
              'Sometimes it may mean helping them understand a referral.',
              'Sometimes it may mean finding another resource.',
              'Sometimes it may mean identifying a practical barrier and seeing whether there is a reasonable way around it.',
              'And sometimes, despite our best efforts, we may not be able to find a solution.',
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-sm sm:text-base text-stone-800"
              >
                <CheckCircle2 className="w-5 h-5 text-[#E5A93C] shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 text-white border border-slate-700 shadow-sm mt-4">
            <p className="text-base sm:text-lg font-bold text-[#F3BA4F] italic text-center">
              We believe people should still have somewhere to turn and someone willing to listen.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. OUR MAIN FOCUS */}
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
            Our Main Focus
          </h2>
        </div>

        <div className="space-y-4 text-stone-800 text-base sm:text-lg leading-relaxed">
          <p>
            We're starting by helping people navigate the spaces between <em className="font-bold text-[#0f172a]">needing help and actually getting connected to it.</em>
          </p>

          <p className="font-semibold text-slate-900 pt-1">
            Our focus can include:
          </p>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {[
              'Treatment and recovery supports',
              'Mental-health and community services',
              'Healthcare and other appropriate supports',
              'Housing and homelessness-related services',
              'Family and support resources',
              'Other community programs and services',
            ].map((focus, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2.5 bg-slate-50 border border-slate-200 p-3.5 rounded-xl font-bold text-slate-900 text-sm sm:text-base"
              >
                <CheckCircle2 className="w-5 h-5 text-[#E5A93C] shrink-0 mt-0.5" />
                <span>{focus}</span>
              </li>
            ))}
          </ul>

          <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/10 border-2 border-[#E5A93C] text-[#0f172a] space-y-1.5 mt-4">
            <p className="font-black text-base sm:text-lg italic">
              We are not the service provider for these programs.
            </p>
            <p className="text-sm sm:text-base text-stone-700">
              Our role is to help people understand their options and navigate the process of getting connected.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. SOMETIMES THE FIRST STEP IS JUST MAKING THE CALL */}
      {/* ============================================================ */}
      <section className="civic-card rounded-3xl p-6 sm:p-10 space-y-6 shadow-md">
        <div className="flex items-center gap-3.5 border-b border-slate-100 pb-4">
          <div className="w-11 h-11 rounded-2xl bg-[#0f172a] text-[#F3BA4F] flex items-center justify-center shrink-0 border border-[#E5A93C]/40 shadow-xs">
            <PhoneCall className="w-5 h-5" />
          </div>
          <h2
            className="text-2xl sm:text-3xl font-black text-[#0f172a] uppercase tracking-tight"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Sometimes the First Step Is Just Making the Call
          </h2>
        </div>

        <div className="space-y-4 text-stone-800 text-base sm:text-lg leading-relaxed">
          <p>
            Making a phone call can sound simple.
          </p>
          <p className="text-stone-700">
            For someone who is overwhelmed, unsure what to say, worried about what they will be asked, or doesn't know which organization to contact, it can be a major barrier.
          </p>

          <p className="font-semibold text-slate-900 pt-2">
            Depending on the situation, FTG may be able to help by:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
            {[
              'Helping identify who to call',
              'Helping someone prepare for a phone call',
              'Helping them understand what information they may need',
              'Offering to make a call with or on behalf of someone when appropriate',
              'Helping them understand what they were told',
              'Helping figure out what to do if they were referred somewhere else',
              'Helping identify the next step after a call or referral',
              'Helping with follow-up when appropriate',
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2.5 p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-sm sm:text-base font-semibold text-slate-900"
              >
                <span className="w-2 h-2 rounded-full bg-[#E5A93C] shrink-0 mt-2" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className="p-5 sm:p-6 rounded-2xl bg-[#0f172a] text-white border-2 border-[#E5A93C] shadow-lg space-y-1.5 text-center my-4">
            <p className="text-lg sm:text-xl font-bold text-slate-200 italic">
              Sometimes people don't need another program.
            </p>
            <p className="text-xl sm:text-2xl font-black text-[#F3BA4F] italic" style={{ fontFamily: "'Outfit', sans-serif" }}>
              They need help getting through the process of accessing the program that already exists.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. HELPING PEOPLE NAVIGATE EXISTING SERVICES */}
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
            Helping People Navigate Existing Services
          </h2>
        </div>

        <div className="space-y-4 text-stone-800 text-base sm:text-lg leading-relaxed">
          <p>
            When an appropriate service already exists, we don't want to duplicate it.
          </p>
          <p className="text-stone-700">
            Instead, we want to help people find it and understand how to access it.
          </p>

          <p className="font-semibold text-slate-900 pt-2">
            Depending on the situation, this may include:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
            {[
              'Finding a relevant resource',
              'Explaining what the resource may provide',
              'Helping someone understand how to access it',
              'Helping them figure out what step comes next',
              'Helping them prepare for a referral or application',
              'Helping them understand what information or documents may be needed',
              'Helping make a connection when appropriate',
              'Following up to see whether the person was able to connect',
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2.5 p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-sm sm:text-base font-semibold text-slate-900"
              >
                <CheckCircle2 className="w-5 h-5 text-[#E5A93C] shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className="pt-2 space-y-2">
            <p className="text-stone-700 text-sm sm:text-base">
              We cannot control another organization's eligibility decisions, waitlists, availability, or policies.
            </p>
            <p className="font-bold text-[#0f172a] italic">
              We can help people navigate what is available and do our best to make the path a little clearer.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 6. WHEN SOMEONE GETS STUCK */}
      {/* ============================================================ */}
      <section className="civic-card rounded-3xl p-6 sm:p-10 space-y-6 shadow-md">
        <div className="flex items-center gap-3.5 border-b border-slate-100 pb-4">
          <div className="w-11 h-11 rounded-2xl bg-[#0f172a] text-[#F3BA4F] flex items-center justify-center shrink-0 border border-[#E5A93C]/40 shadow-xs">
            <AlertCircle className="w-5 h-5" />
          </div>
          <h2
            className="text-2xl sm:text-3xl font-black text-[#0f172a] uppercase tracking-tight"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            When Someone Gets Stuck
          </h2>
        </div>

        <div className="space-y-4 text-stone-800 text-base sm:text-lg leading-relaxed">
          <p>
            Sometimes a person has already been referred or connected with a service but something has gone wrong.
          </p>

          <p className="font-semibold text-slate-900">
            They may:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {[
              'Not understand what happens next',
              'Have difficulty reaching the organization',
              'Be unsure who they are supposed to contact',
              'Be overwhelmed by the process',
              'Have difficulty completing an application',
              'Be waiting for a response and not know what to do',
              'Be referred somewhere else without understanding why',
              'Have one practical barrier affecting their ability to move forward',
            ].map((reason, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200 text-sm sm:text-base text-stone-800"
              >
                <span className="w-2 h-2 rounded-full bg-[#E5A93C] shrink-0 mt-2" />
                <span>{reason}</span>
              </div>
            ))}
          </div>

          <div className="pt-2 space-y-3">
            <p className="font-semibold text-slate-900">
              FTG can look at the situation and ask:
            </p>

            <div className="p-6 rounded-2xl bg-[#0f172a] text-white border-2 border-[#E5A93C] shadow-lg text-center my-2">
              <p
                className="text-2xl sm:text-4xl font-black text-[#F3BA4F] italic uppercase tracking-wide"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                “What's getting in the way?”
              </p>
            </div>

            <p className="text-stone-700">
              Then we can look at whether there is an existing resource, another route, or something else that may reasonably help.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 7. PRACTICAL BARRIERS */}
      {/* ============================================================ */}
      <section className="civic-card rounded-3xl p-6 sm:p-10 space-y-6 shadow-md">
        <div className="flex items-center gap-3.5 border-b border-slate-100 pb-4">
          <div className="w-11 h-11 rounded-2xl bg-[#0f172a] text-[#F3BA4F] flex items-center justify-center shrink-0 border border-[#E5A93C]/40 shadow-xs">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <h2
            className="text-2xl sm:text-3xl font-black text-[#0f172a] uppercase tracking-tight"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Practical Barriers
          </h2>
        </div>

        <div className="space-y-4 text-stone-800 text-base sm:text-lg leading-relaxed">
          <p>
            Sometimes the problem isn't finding a service.
          </p>
          <p>
            The person may already know where they need to go, but something practical is making it difficult to complete the next step.
          </p>
          <p className="text-stone-700">
            This might involve transportation, communication, documents, technology, timing, or another circumstance affecting their ability to access support.
          </p>
          <p>
            FTG will look at these situations individually.
          </p>
          <p className="font-semibold text-slate-900">
            We may be able to help identify the barrier, find an existing resource that addresses it, or determine whether there is another appropriate option.
          </p>

          <div className="p-5 rounded-2xl bg-amber-50 border-2 border-amber-200 text-stone-900 space-y-2 mt-4">
            <p className="font-black text-base sm:text-lg text-amber-950 italic">
              We are not a general emergency assistance program, transportation service, housing provider, phone provider, or basic-needs program.
            </p>
            <p className="text-sm sm:text-base text-stone-700">
              When another organization is better equipped to help, we'll do our best to connect the person with that resource.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 8. WHEN THERE ISN'T AN EASY ANSWER */}
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
            When There Isn't an Easy Answer
          </h2>
        </div>

        <div className="space-y-4 text-stone-800 text-base sm:text-lg leading-relaxed">
          <p>
            Sometimes there may not be an obvious resource.
          </p>
          <p>
            Sometimes a person may have tried several options and still be stuck.
          </p>
          <p>
            Sometimes the need may fall outside what FTG can currently do.
          </p>

          <div className="p-5 sm:p-6 rounded-2xl bg-slate-900 text-white border-2 border-[#E5A93C] shadow-lg space-y-2 my-2">
            <p className="text-lg sm:text-xl font-bold text-[#F3BA4F] italic">
              We don't want to give someone false hope by promising an answer we may not have.
            </p>
            <p className="text-slate-200 text-base sm:text-lg">
              Instead, we'll listen, look at the situation, consider what resources or options may exist, and be honest about what we can and cannot do.
            </p>
          </div>

          <p className="font-semibold text-slate-900 pt-1">
            Even when we can't solve the problem ourselves, understanding what happened can help us learn.
          </p>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 9. LOOKING AT THE BIGGER PICTURE */}
      {/* ============================================================ */}
      <section className="civic-card rounded-3xl p-6 sm:p-10 space-y-6 shadow-md">
        <div className="flex items-center gap-3.5 border-b border-slate-100 pb-4">
          <div className="w-11 h-11 rounded-2xl bg-[#0f172a] text-[#F3BA4F] flex items-center justify-center shrink-0 border border-[#E5A93C]/40 shadow-xs">
            <Layers className="w-5 h-5" />
          </div>
          <h2
            className="text-2xl sm:text-3xl font-black text-[#0f172a] uppercase tracking-tight"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Looking at the Bigger Picture
          </h2>
        </div>

        <div className="space-y-4 text-stone-800 text-base sm:text-lg leading-relaxed">
          <p>
            The people who come to FTG can also help us understand where larger gaps may exist in our community.
          </p>
          <p className="text-stone-700">
            If we repeatedly hear that people are getting stuck in the same place, we can look more closely at why.
          </p>

          <p className="font-semibold text-slate-900 pt-2">
            For example:
          </p>

          <div className="space-y-2.5">
            {[
              "Are people repeatedly having trouble completing the same referral?",
              "Are people being passed between services without knowing what happens next?",
              "Is an existing service difficult to access for a particular reason?",
              "Is there a need that doesn't appear to have an appropriate resource?",
            ].map((q, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-sm sm:text-base text-stone-800"
              >
                <span className="w-2 h-2 rounded-full bg-[#E5A93C] shrink-0 mt-2" />
                <span className="font-medium">{q}</span>
              </div>
            ))}
          </div>

          <p className="pt-2">
            That doesn't automatically mean FTG will create a new program.
          </p>
          <p className="text-stone-700">
            First, we want to understand the problem, learn what already exists, and talk with the organizations involved.
          </p>
          <p>
            Over time, this may help us identify genuine gaps and determine whether there are ways FTG can contribute.
          </p>
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-[#0f172a] font-bold">
            Based on the recurring gaps we may be able to start a service or program
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 10. WE'RE STARTING SMALL */}
      {/* ============================================================ */}
      <section className="bg-[#0B0F19] text-white rounded-3xl p-8 sm:p-12 shadow-2xl border-2 border-[#E5A93C] relative overflow-hidden space-y-8">
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
            Fill the Gap is a new organization.
          </p>
          <p>
            We're not trying to provide every service a person might need.
          </p>
          <p className="font-bold text-white">
            We're starting with something simple:
          </p>
        </div>

        {/* The 5 Simple Principles */}
        <div className="space-y-2.5">
          {[
            'Listen.',
            'Understand the situation.',
            'Help people find their way through existing services.',
            'Help with barriers we can realistically address.',
            'Learn from what we encounter.',
          ].map((principle, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 p-4 rounded-xl bg-slate-900/80 border border-slate-700 text-base sm:text-lg font-bold text-slate-100 italic"
            >
              <CheckCircle2 className="w-5 h-5 text-[#E5A93C] shrink-0" />
              <span>{principle}</span>
            </div>
          ))}
        </div>

        <p className="text-stone-300 text-base sm:text-lg">
          As we learn, we may discover other ways Fill the Gap can help.
        </p>

        <div className="p-6 rounded-2xl bg-slate-900 border-2 border-[#E5A93C] space-y-3">
          <p className="text-lg sm:text-xl font-black text-[#F3BA4F] italic" style={{ fontFamily: "'Outfit', sans-serif" }}>
            If you're not sure whether your situation is something we can help with, reach out.
          </p>
          <p className="text-slate-200 text-base sm:text-lg">
            We'll listen, look at the situation, and do our best to help you figure out what the next step could be.
          </p>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 11. CONNECT WITH FILL THE GAP ACTIONS */}
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
              <div className="font-black text-sm text-white flex items-center justify-between">
                <span>Get in Touch</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
              </div>
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
              <div className="font-black text-sm text-[#0f172a] flex items-center justify-between">
                <span>Community Survey</span>
                <ArrowRight className="w-4 h-4 text-slate-600 group-hover:translate-x-1 transition-transform" />
              </div>
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
              <div className="font-black text-sm text-[#0f172a] flex items-center justify-between">
                <span>Frontline Agency Survey</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
              </div>
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

export const WhatWeDoView = WhatWeHelpWithView;

