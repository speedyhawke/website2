import React from 'react';
import {
  Briefcase,
  Eye,
  Users,
  Compass,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  HelpCircle,
  Building2,
  HeartHandshake,
  Lock,
  Layers
} from 'lucide-react';

interface ProfessionalsViewProps {
  onOpenProfessionalSurvey: () => void;
  onNavigateToCommunitySurvey?: () => void;
  onNavigateToWhatWeDo?: () => void;
}

export const ProfessionalsView: React.FC<ProfessionalsViewProps> = ({
  onOpenProfessionalSurvey,
  onNavigateToCommunitySurvey,
  onNavigateToWhatWeDo,
}) => {
  const recurringPatterns = [
    'Recurring barriers',
    'Unmet needs',
    'Referral difficulties',
    'Service navigation problems',
    'Gaps in information',
    'Eligibility issues',
    'Communication problems',
    'Resource limitations',
    'Areas where existing services work well',
    'Areas where people may need additional support',
  ];

  const whoShouldTakeSectors = [
    'Healthcare',
    'Mental-health services',
    'Social work and community services',
    'Non-profit and charitable organizations',
    'Housing and homelessness services',
    'Food programs and food banks',
    'Employment and career services',
    'Education (schools, colleges, universities)',
    'Childcare and family support',
    'Youth services',
    'Senior services',
    'Disability support',
    'Addictions and recovery services',
    'Legal and justice services',
    'Emergency and crisis services',
    'Government and public administration',
    'Community outreach',
    'Faith-based community programs',
    'Volunteer coordination',
    'Mutual aid and grassroots initiatives',
  ];

  const whatWeAreHopingToLearn = [
    'What are the most common challenges people face?',
    'Where do people struggle to find help?',
    'What barriers prevent people from getting the help they need?',
    'What happens when a person’s needs don’t fit into existing programs?',
    'What makes referring someone to another service difficult?',
    'What information is missing, outdated, or hard to find?',
    'What services or approaches are working well?',
    'What small changes could make a big difference?',
    'What should a new initiative like Fill the Gap research before doing anything?',
  ];

  return (
    <div className="bg-[#F8FAFC] min-h-screen text-slate-900 selection:bg-amber-300 selection:text-slate-950">
      
      {/* -------------------------------------------------- */}
      {/* HERO SECTION */}
      {/* -------------------------------------------------- */}
      <section className="relative bg-[#0B0F19] text-white py-16 sm:py-24 border-b border-white/10 overflow-hidden">
        {/* Subtle decorative background accents */}
        <div className="absolute inset-0 bg-radial-at-t from-slate-800/40 via-transparent to-transparent pointer-events-none" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#E5A93C]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          
          {/* Tone badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-amber-400 text-xs font-bold tracking-wider uppercase mb-6 backdrop-blur-md">
            <Briefcase className="w-3.5 h-3.5" />
            <span>COMMUNITY & FRONTLINE RESEARCH INITIATIVE</span>
          </div>

          {/* Exact Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white uppercase leading-tight mb-8">
            WE WANT TO HEAR FROM THE PEOPLE WHO SEE THE GAPS FIRSTHAND.
          </h1>

          {/* Exact Supporting Text */}
          <div className="space-y-4 text-slate-300 text-base sm:text-lg leading-relaxed max-w-3xl">
            <p className="font-semibold text-white">
              Professionals working in our communities often see things that the general public may never see.
            </p>
            <ul className="space-y-2.5 pt-2 text-slate-300">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E5A93C] mt-2.5 shrink-0" />
                <span>You may notice the same barriers happening repeatedly.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E5A93C] mt-2.5 shrink-0" />
                <span>You may see people being referred from one place to another.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E5A93C] mt-2.5 shrink-0" />
                <span>You may know about resources that people struggle to access.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E5A93C] mt-2.5 shrink-0" />
                <span>You may see needs that don’t fit neatly into existing programs.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E5A93C] mt-2.5 shrink-0" />
                <span>Or you may see things that are already working really well.</span>
              </li>
            </ul>

            <div className="pt-4 border-t border-white/10 mt-6 space-y-2 text-slate-200">
              <p className="font-bold text-[#F3BA4F] text-lg">We want to learn from your experience.</p>
              <p className="text-slate-300">
                Fill the Gap is starting from square one. We don’t have all the answers, and we’re not asking you to provide them. We’re asking you to help us understand what you’re seeing.
              </p>
            </div>
          </div>

          {/* Hero CTA Button */}
          <div className="pt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <button
              onClick={onOpenProfessionalSurvey}
              className="gold-gradient-btn text-slate-950 font-black px-8 py-4 rounded-xl text-sm sm:text-base tracking-wider uppercase shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-3 cursor-pointer focus-visible:ring-2 focus-visible:ring-[#E5A93C]"
            >
              <span>TAKE THE PROFESSIONAL SURVEY</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Clock className="w-4 h-4 text-[#E5A93C]" />
              <span>Estimated time: ~8–12 minutes • Anonymous & Confidential</span>
            </div>
          </div>

        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* SECTION: WHY PROFESSIONAL INPUT MATTERS */}
      {/* -------------------------------------------------- */}
      <section className="py-16 sm:py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-8">
          
          <div>
            <div className="flex items-center gap-2.5 text-amber-800 text-xs font-bold uppercase tracking-wider mb-2">
              <Eye className="w-4 h-4 text-amber-700" />
              <span>Ground-Level Insights</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight uppercase leading-snug">
              YOUR EXPERIENCE CAN SHOW US WHAT WE CAN’T SEE FROM THE OUTSIDE.
            </h2>
          </div>

          <div className="space-y-3 text-slate-700 text-base leading-relaxed">
            <p>
              A person experiencing a problem sees it from one perspective.
            </p>
            <p>
              A professional working with people may see that same problem repeatedly.
            </p>
            <p className="font-semibold text-slate-900 pt-2">
              That perspective can help us understand:
            </p>
          </div>

          {/* 10 Bullets Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {recurringPatterns.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 font-medium text-sm"
              >
                <CheckCircle2 className="w-4 h-4 text-[#C98A26] shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200/80 text-amber-950 text-sm leading-relaxed font-medium">
            <p className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-700 shrink-0" />
              <span>
                <strong>Our Commitment:</strong> We’re interested in the patterns you see — not in assigning blame.
              </span>
            </p>
          </div>

        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* SECTION: WHO SHOULD TAKE THIS SURVEY? */}
      {/* -------------------------------------------------- */}
      <section className="py-12 bg-slate-100/70 border-y border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div>
            <div className="flex items-center gap-2.5 text-amber-800 text-xs font-bold uppercase tracking-wider mb-2">
              <Users className="w-4 h-4 text-amber-700" />
              <span>Inclusive Community Scope</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight uppercase leading-snug">
              WHO IS THIS FOR?
            </h2>
            <p className="text-slate-700 text-base sm:text-lg mt-3 leading-relaxed">
              We want to hear from anyone whose work involves helping, supporting, serving, or working with people in Newfoundland and Labrador.
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-sm font-bold text-slate-900 uppercase tracking-wide">
              This includes people working or volunteering in:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
              {whoShouldTakeSectors.map((sector, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 p-3 rounded-lg bg-white border border-slate-200/80 text-xs sm:text-sm text-slate-800 font-semibold shadow-xs"
                >
                  <Building2 className="w-3.5 h-3.5 text-[#C98A26] shrink-0" />
                  <span className="leading-snug">{sector}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-slate-300 text-slate-800 text-sm leading-relaxed">
            <p>
              <strong>Please note:</strong> You don’t need to work in one of these fields specifically. If your work gives you insight into challenges people experience in our communities, we’d like to hear from you.
            </p>
          </div>

        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* SECTION: WHAT WE'RE ASKING / WHAT ARE WE HOPING TO LEARN? */}
      {/* -------------------------------------------------- */}
      <section className="py-16 sm:py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-8">
          
          <div>
            <div className="flex items-center gap-2.5 text-amber-800 text-xs font-bold uppercase tracking-wider mb-2">
              <Compass className="w-4 h-4 text-amber-700" />
              <span>Research Objectives</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight uppercase leading-snug">
              WHAT ARE WE HOPING TO LEARN?
            </h2>
            <p className="text-slate-700 text-base mt-2">
              We’re trying to understand the day-to-day realities of service access across the province:
            </p>
          </div>

          <div className="space-y-3">
            {whatWeAreHopingToLearn.map((question, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm font-semibold"
              >
                <HelpCircle className="w-4 h-4 text-[#C98A26] mt-0.5 shrink-0" />
                <span>{question}</span>
              </div>
            ))}
          </div>

          {/* Bold Core Philosophy Box */}
          <div className="p-6 rounded-2xl bg-[#0B0F19] text-white border border-white/10 shadow-lg text-center sm:text-left space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider text-[#F3BA4F] uppercase">
              <HeartHandshake className="w-4 h-4" />
              <span>Our Foundational Research Principle</span>
            </div>
            <p className="text-lg sm:text-xl font-black tracking-tight uppercase text-white leading-snug">
              WE ARE NOT ASKING YOU TO FIX THE PROBLEM FOR US. WE ARE ASKING YOU TO HELP US UNDERSTAND IT.
            </p>
            <p className="text-slate-300 text-sm leading-relaxed">
              We believe sustainable solutions only come from rigorous listening. Your input directly shapes what research areas and pilot initiatives Fill the Gap prioritizes.
            </p>
          </div>

        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* SECTION: PROFESSIONAL SURVEY CTA / LAUNCH */}
      {/* -------------------------------------------------- */}
      <section className="py-16 bg-gradient-to-b from-slate-900 to-[#0B0F19] text-white border-t border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-amber-400 text-xs font-bold tracking-wider uppercase">
            <Layers className="w-3.5 h-3.5" />
            <span>11 RESEARCH SECTIONS • 46 QUESTIONS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">
            PROFESSIONAL SURVEY
          </h2>

          <div className="max-w-2xl mx-auto space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            <p>
              The survey should take approximately <strong>8–12 minutes</strong> to complete. Responses will help Fill the Gap understand community needs and identify areas that may deserve further research.
            </p>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs sm:text-sm text-slate-300 space-y-2 text-left">
              <div className="flex items-start gap-2.5">
                <Lock className="w-4 h-4 text-[#F3BA4F] mt-0.5 shrink-0" />
                <span>
                  <strong>Confidentiality Guaranteed:</strong> Your answers will be kept confidential. We will not ask you to identify your employer or individual clients or patients.
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#F3BA4F] mt-0.5 shrink-0" />
                <span>
                  <strong>Voluntary:</strong> You can skip any questions you prefer not to answer. Contact details for follow-up are completely optional.
                </span>
              </div>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onOpenProfessionalSurvey}
              className="w-full sm:w-auto gold-gradient-btn text-slate-950 font-black px-10 py-4 rounded-xl text-base tracking-wider uppercase shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 cursor-pointer focus-visible:ring-2 focus-visible:ring-[#E5A93C]"
            >
              <span>START THE PROFESSIONAL SURVEY</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {onNavigateToCommunitySurvey && (
            <div className="pt-6 text-xs text-slate-400">
              <span>Looking for the community lived-experience survey instead? </span>
              <button
                onClick={onNavigateToCommunitySurvey}
                className="text-[#F3BA4F] hover:underline font-bold"
              >
                Take the Community Survey
              </button>
            </div>
          )}

        </div>
      </section>

    </div>
  );
};
