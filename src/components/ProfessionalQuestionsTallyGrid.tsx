import React from 'react';
import { ProfessionalSurveyResponse } from '../data/adminStore';

interface ProfessionalQuestionsTallyGridProps {
  professionalSurveys: ProfessionalSurveyResponse[];
  totalProfessional: number;
  aggregateSingleChoice: (items: (string | undefined)[]) => Record<string, number>;
  aggregateMultiChoice: (itemsList: (string[] | undefined)[]) => Record<string, number>;
}

export const ProfessionalQuestionsTallyGrid: React.FC<ProfessionalQuestionsTallyGridProps> = ({
  professionalSurveys,
  totalProfessional,
  aggregateSingleChoice,
  aggregateMultiChoice,
}) => {
  // Helper to render single choice question card
  const renderSingleChoiceCard = (
    qNumber: string,
    badgeText: string,
    title: string,
    items: (string | undefined)[],
    order?: string[],
    badgeColor: string = 'bg-amber-400/20 text-[#F3BA4F]',
    countColor: string = 'text-amber-400',
    colSpan: string = 'col-span-1'
  ) => {
    const rawCounts = aggregateSingleChoice(items);
    let entries: [string, number][] = [];

    if (order && order.length > 0) {
      entries = order.map((opt) => [opt, rawCounts[opt] || 0]);
      Object.keys(rawCounts).forEach((key) => {
        if (!order.includes(key) && key.trim() !== '') {
          entries.push([key, rawCounts[key]]);
        }
      });
    } else {
      entries = (Object.entries(rawCounts) as [string, number][]).sort(([, a], [, b]) => b - a);
    }

    return (
      <div className={`p-5 rounded-2xl bg-[#0f172a] border border-slate-700/80 space-y-3 flex flex-col justify-between hover:border-amber-400/60 transition-all shadow-md ${colSpan}`}>
        <div>
          <div className="flex items-center justify-between border-b border-slate-700/80 pb-2 mb-2.5">
            <span className={`px-2.5 py-1 rounded-md text-xs font-mono font-black uppercase tracking-wider ${badgeColor}`}>
              {qNumber}
            </span>
            <span className="text-xs text-stone-300 font-bold uppercase truncate max-w-[160px] text-right">
              {badgeText}
            </span>
          </div>
          <h3 className="text-sm font-bold text-white leading-snug">{title}</h3>
        </div>

        <div className="space-y-2 text-sm pt-1 max-h-72 overflow-y-auto pr-1">
          {entries.length === 0 ? (
            <div className="text-xs text-stone-400 italic p-3 bg-slate-900/80 rounded-xl border border-slate-800 text-center">No responses recorded yet</div>
          ) : (
            entries.map(([opt, count]) => {
              const pct = totalProfessional > 0 ? Math.round((count / totalProfessional) * 100) : 0;
              return (
                <div
                  key={opt}
                  className="p-2.5 rounded-xl bg-slate-900 border border-slate-700/60 flex items-center justify-between gap-3 hover:bg-slate-800/80 transition-colors"
                >
                  <span className="text-slate-200 font-medium text-xs sm:text-sm" title={opt}>
                    {opt}
                  </span>
                  <div className="flex items-center gap-2 shrink-0 font-mono text-xs sm:text-sm">
                    <span className="text-white font-bold bg-slate-800 px-2 py-0.5 rounded border border-slate-700">{count}</span>
                    <span className={`${countColor} font-bold text-xs sm:text-sm`}>({pct}%)</span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    );
  };

  // Helper to render multi choice question card
  const renderMultiChoiceCard = (
    qNumber: string,
    badgeText: string,
    title: string,
    itemsList: (string[] | undefined)[],
    colSpan: string = 'col-span-1',
    badgeColor: string = 'bg-amber-400/20 text-[#F3BA4F]',
    countColor: string = 'text-emerald-400'
  ) => {
    const counts = aggregateMultiChoice(itemsList);
    const entries = (Object.entries(counts) as [string, number][]).sort(([, a], [, b]) => b - a);

    return (
      <div className={`p-5 rounded-2xl bg-[#0f172a] border border-slate-700/80 space-y-3 flex flex-col justify-between hover:border-amber-400/60 transition-all shadow-md ${colSpan}`}>
        <div>
          <div className="flex items-center justify-between border-b border-slate-700/80 pb-2 mb-2.5">
            <span className={`px-2.5 py-1 rounded-md text-xs font-mono font-black uppercase tracking-wider ${badgeColor}`}>
              {qNumber}
            </span>
            <span className="text-xs text-stone-300 font-bold uppercase truncate max-w-[200px] text-right">
              {badgeText}
            </span>
          </div>
          <h3 className="text-sm font-bold text-white leading-snug">{title}</h3>
        </div>

        <div className="space-y-2 text-sm pt-1 max-h-80 overflow-y-auto pr-1">
          {entries.length === 0 ? (
            <div className="text-xs text-stone-400 italic p-3 bg-slate-900/80 rounded-xl border border-slate-800 text-center">No responses recorded yet</div>
          ) : (
            entries.map(([opt, count], idx) => {
              const pct = totalProfessional > 0 ? Math.round((count / totalProfessional) * 100) : 0;
              return (
                <div
                  key={opt}
                  className="p-2.5 rounded-xl bg-slate-900 border border-slate-700/60 flex items-center justify-between gap-3 hover:bg-slate-800/80 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-amber-400/80 w-5 shrink-0">
                      #{idx + 1}
                    </span>
                    <span className="text-slate-200 font-medium text-xs sm:text-sm" title={opt}>
                      {opt}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 font-mono text-xs sm:text-sm">
                    <span className="text-white font-bold bg-slate-800 px-2 py-0.5 rounded border border-slate-700">{count}</span>
                    <span className={`${countColor} font-bold text-xs sm:text-sm`}>({pct}%)</span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    );
  };

  // Helper for written responses counter card with recent quotes
  const renderWrittenCounterCard = (
    qNumber: string,
    badgeText: string,
    title: string,
    answers: (string | undefined)[],
    colSpan: string = 'col-span-1',
    badgeColor: string = 'bg-sky-400/20 text-sky-300',
    countBadgeColor: string = 'bg-sky-950 text-sky-200 border-sky-700/60'
  ) => {
    const valid = answers.filter((a) => a && a.trim().length > 0) as string[];
    const pct = totalProfessional > 0 ? Math.round((valid.length / totalProfessional) * 100) : 0;
    const recent = valid.slice(0, 3);

    return (
      <div className={`p-5 rounded-2xl bg-[#0f172a] border border-slate-700/80 space-y-3 flex flex-col justify-between hover:border-sky-400/60 transition-all shadow-md ${colSpan}`}>
        <div>
          <div className="flex items-center justify-between border-b border-slate-700/80 pb-2 mb-2.5">
            <span className={`px-2.5 py-1 rounded-md text-xs font-mono font-black uppercase tracking-wider ${badgeColor}`}>
              {qNumber}
            </span>
            <span className="text-xs text-stone-300 font-bold uppercase truncate max-w-[160px] text-right">
              {badgeText}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white leading-snug">{title}</h3>
            <span className={`px-2.5 py-1 rounded-lg border text-xs font-mono font-bold shrink-0 ml-2 ${countBadgeColor}`}>
              {valid.length} responses ({pct}%)
            </span>
          </div>
        </div>

        <div className="space-y-2 pt-1 text-xs sm:text-sm">
          {recent.length === 0 ? (
            <div className="text-xs text-stone-400 italic p-3 bg-slate-900/80 rounded-xl border border-slate-800 text-center">No written entries yet</div>
          ) : (
            recent.map((text, i) => (
              <div key={i} className="p-2.5 rounded-xl bg-slate-900 border border-slate-700/60 text-slate-200 italic text-xs sm:text-sm line-clamp-2">
                "{text}"
              </div>
            ))
          )}
        </div>
      </div>
    );
  };

  const frequencyOptions = [
    'Very frequently',
    'Frequently',
    'Sometimes',
    'Rarely',
    'Never',
    'Not sure',
  ];

  return (
    <div className="space-y-10">
      
      {/* SECTION 1: PROFESSIONAL BACKGROUND (Q1–Q4) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-400/20 text-[#F3BA4F] text-xs font-bold uppercase font-mono">
              Section 1
            </span>
            <h3 className="text-sm font-black text-white uppercase tracking-wider">
              Professional Background
            </h3>
          </div>
          <span className="text-[11px] text-stone-400 font-mono">Questions 1–4</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Q1: General Field */}
          {renderSingleChoiceCard(
            'Q1',
            'Field of Practice',
            '1. General field currently working in',
            professionalSurveys.map((p) => p.q1 || p.sector || 'Community/nonprofit organization'),
            undefined,
            'bg-amber-400/20 text-[#F3BA4F]',
            'text-amber-400'
          )}

          {/* Q2: Years of Experience */}
          {renderSingleChoiceCard(
            'Q2',
            'Experience',
            '2. Years worked in field',
            professionalSurveys.map((p) => p.q2 || '6–10 years'),
            ['Less than 1 year', '1–3 years', '4–5 years', '6–10 years', '11–20 years', 'More than 20 years', 'Prefer not to say'],
            'bg-amber-400/20 text-[#F3BA4F]',
            'text-sky-400'
          )}

          {/* Q3: Role Description */}
          {renderSingleChoiceCard(
            'Q3',
            'Role',
            '3. Best describes role',
            professionalSurveys.map((p) => p.q3 || p.role || 'Case management/navigation'),
            undefined,
            'bg-amber-400/20 text-[#F3BA4F]',
            'text-emerald-400'
          )}

          {/* Q4: Geographic Area */}
          {renderSingleChoiceCard(
            'Q4',
            'Geography',
            '4. Geographic area primarily served',
            professionalSurveys.map((p) => p.q4 || "St. John's"),
            ["St. John's", 'Mount Pearl', 'Paradise', 'Northeast Avalon', 'Other area of Newfoundland', 'Labrador', 'Province-wide', 'Multiple locations'],
            'bg-amber-400/20 text-[#F3BA4F]',
            'text-amber-400'
          )}
        </div>
      </div>

      {/* SECTION 2: WHAT YOU SEE (Q5–Q9) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-blue-400/20 text-blue-300 text-xs font-bold uppercase font-mono">
              Section 2
            </span>
            <h3 className="text-sm font-black text-white uppercase tracking-wider">
              What You See (Demand & Frequency)
            </h3>
          </div>
          <span className="text-[11px] text-stone-400 font-mono">Questions 5–9</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Q5: Common Areas Seeking Help */}
          {renderMultiChoiceCard(
            'Q5',
            'Common Areas',
            '5. Most common areas where people seek help (All that apply)',
            professionalSurveys.map((p) => p.q5 || []),
            'col-span-1',
            'bg-blue-400/20 text-blue-300',
            'text-blue-300'
          )}

          {/* Q6: Greatest Challenges (Up to 5) */}
          {renderMultiChoiceCard(
            'Q6',
            'Top Challenges',
            '6. Areas creating greatest challenges (Up to 5)',
            professionalSurveys.map((p) => p.q6 || []),
            'col-span-1',
            'bg-blue-400/20 text-blue-300',
            'text-amber-400'
          )}

          {/* Q7: Area Deserving Most Attention */}
          {renderSingleChoiceCard(
            'Q7',
            'Priority Area',
            '7. ONE area deserving most attention',
            professionalSurveys.map((p) => p.q7 || 'Housing'),
            undefined,
            'bg-blue-400/20 text-blue-300',
            'text-emerald-400'
          )}

          {/* Q8: Frequency Don't Know Where to Turn */}
          {renderSingleChoiceCard(
            'Q8',
            'Unsure Where To Turn',
            '8. Frequency encountering people who don’t know where to turn',
            professionalSurveys.map((p) => p.q8 || 'Frequently'),
            frequencyOptions,
            'bg-blue-400/20 text-blue-300',
            'text-red-400',
            'md:col-span-1'
          )}

          {/* Q9: Frequency Needing Multiple Services */}
          {renderSingleChoiceCard(
            'Q9',
            'Multiple Needs',
            '9. Frequency encountering people needing several services simultaneously',
            professionalSurveys.map((p) => p.q9 || 'Very frequently'),
            frequencyOptions,
            'bg-blue-400/20 text-blue-300',
            'text-sky-300',
            'md:col-span-2'
          )}
        </div>
      </div>

      {/* SECTION 3: BARRIERS (Q10–Q13) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-red-400/20 text-red-300 text-xs font-bold uppercase font-mono">
              Section 3
            </span>
            <h3 className="text-sm font-black text-white uppercase tracking-wider">
              Barriers & Roadblocks
            </h3>
          </div>
          <span className="text-[11px] text-stone-400 font-mono">Questions 10–13</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Q10: All Common Barriers */}
          {renderMultiChoiceCard(
            'Q10',
            'Common Barriers',
            '10. Barriers preventing access (All that apply)',
            professionalSurveys.map((p) => p.q10 || p.barriers || []),
            'col-span-1',
            'bg-red-400/20 text-red-300',
            'text-red-300'
          )}

          {/* Q11: Top 3 Greatest Impact Barriers */}
          {renderMultiChoiceCard(
            'Q11',
            'Top 3 Barriers',
            '11. Three barriers with greatest impact',
            professionalSurveys.map((p) => p.q11 || []),
            'col-span-1',
            'bg-red-400/20 text-red-300',
            'text-amber-400'
          )}

          {/* Q12: Frequency Giving Up */}
          {renderSingleChoiceCard(
            'Q12',
            'Abandonment Rate',
            '12. How often people give up because process is too difficult',
            professionalSurveys.map((p) => p.q12 || 'Frequently'),
            frequencyOptions,
            'bg-red-400/20 text-red-300',
            'text-red-400'
          )}

          {/* Q13: What Causes People to Give Up */}
          {renderMultiChoiceCard(
            'Q13',
            'Causes of Giving Up',
            '13. What usually causes people to give up trying (All that apply)',
            professionalSurveys.map((p) => p.q13 || []),
            'md:col-span-2 lg:col-span-3',
            'bg-red-400/20 text-red-300',
            'text-rose-400'
          )}
        </div>
      </div>

      {/* SECTION 4: REFERRALS AND NAVIGATION (Q14–Q18) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-400/20 text-[#F3BA4F] text-xs font-bold uppercase font-mono">
              Section 4
            </span>
            <h3 className="text-sm font-black text-white uppercase tracking-wider">
              Referrals & Navigation
            </h3>
          </div>
          <span className="text-[11px] text-stone-400 font-mono">Questions 14–18</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Q14: Referral Frequency */}
          {renderSingleChoiceCard(
            'Q14',
            'Referral Volume',
            '14. Frequency referring people to other services',
            professionalSurveys.map((p) => p.q14 || 'Daily'),
            ['Several times a day', 'Daily', 'Several times a week', 'Weekly', 'Occasionally', 'Rarely', 'Never'],
            'bg-amber-400/20 text-[#F3BA4F]',
            'text-sky-400'
          )}

          {/* Q15: Difficulty Finding Referral */}
          {renderSingleChoiceCard(
            'Q15',
            'Referral Friction',
            '15. Frequency encountering difficulty finding referral',
            professionalSurveys.map((p) => p.q15 || 'Sometimes'),
            frequencyOptions,
            'bg-amber-400/20 text-[#F3BA4F]',
            'text-amber-400'
          )}

          {/* Q17: Referral Failure Encountered */}
          {renderSingleChoiceCard(
            'Q17',
            'Failed Referrals',
            '17. Ever referred someone only to find service couldn’t meet needs',
            professionalSurveys.map((p) => p.q17 || 'Frequently'),
            ['Frequently', 'Sometimes', 'Once or twice', 'Never', 'Not sure'],
            'bg-amber-400/20 text-[#F3BA4F]',
            'text-red-400'
          )}

          {/* Q16: What Makes Referrals Difficult */}
          {renderMultiChoiceCard(
            'Q16',
            'Referral Roadblocks',
            '16. What makes referrals difficult (All that apply)',
            professionalSurveys.map((p) => p.q16 || []),
            'col-span-1 md:col-span-2 lg:col-span-2',
            'bg-amber-400/20 text-[#F3BA4F]',
            'text-amber-300'
          )}

          {/* Q18: What Happens in Failed Referrals (Written) */}
          {renderWrittenCounterCard(
            'Q18',
            'Referral Stories',
            '18. What tends to happen when a referral fails',
            professionalSurveys.map((p) => p.q18 || p.referralFailureReason),
            'col-span-1',
            'bg-amber-400/20 text-[#F3BA4F]',
            'bg-amber-950 text-amber-300 border-amber-800/60'
          )}
        </div>
      </div>

      {/* SECTION 5: GAPS BETWEEN SERVICES (Q19–Q22) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 text-xs font-bold uppercase font-mono">
              Section 5
            </span>
            <h3 className="text-sm font-black text-white uppercase tracking-wider">
              Gaps Between Services
            </h3>
          </div>
          <span className="text-[11px] text-stone-400 font-mono">Questions 19–22</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Q19: Needs Fall Between Services */}
          {renderSingleChoiceCard(
            'Q19',
            'Falling Between',
            '19. Believe needs fall between existing services',
            professionalSurveys.map((p) => p.q19 || p.frequencyFallingThrough || 'Frequently'),
            frequencyOptions,
            'bg-emerald-400/20 text-emerald-300',
            'text-emerald-300'
          )}

          {/* Q21: Regular Encounter with No Referral Service */}
          {renderSingleChoiceCard(
            'Q21',
            'Unmet Needs',
            '21. Encounter needs with no appropriate service available',
            professionalSurveys.map((p) => p.q21 || 'Yes'),
            ['Yes', 'No', 'Sometimes', 'Not sure'],
            'bg-emerald-400/20 text-emerald-300',
            'text-sky-300'
          )}

          {/* Q22: General Type of Unmet Need (Written) */}
          {renderWrittenCounterCard(
            'Q22',
            'Unmet Need Types',
            '22. General type of unmet need regularly encountered',
            professionalSurveys.map((p) => p.q22),
            'col-span-1',
            'bg-emerald-400/20 text-emerald-300',
            'bg-emerald-950 text-emerald-300 border-emerald-800/60'
          )}

          {/* Q20: Situations Most Likely to Fall Between Services */}
          {renderMultiChoiceCard(
            'Q20',
            'Gap Situations',
            '20. Situations most likely to fall between services (All that apply)',
            professionalSurveys.map((p) => p.q20 || []),
            'md:col-span-2 lg:col-span-3',
            'bg-emerald-400/20 text-emerald-300',
            'text-teal-300'
          )}
        </div>
      </div>

      {/* SECTION 6: INFORMATION (Q23–Q25) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-400/20 text-cyan-300 text-xs font-bold uppercase font-mono">
              Section 6
            </span>
            <h3 className="text-sm font-black text-white uppercase tracking-wider">
              Information & Resource Discovery
            </h3>
          </div>
          <span className="text-[11px] text-stone-400 font-mono">Questions 23–25</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Q23: Ease of Finding Accurate Info */}
          {renderSingleChoiceCard(
            'Q23',
            'Information Ease',
            '23. Ease of finding accurate community resource info',
            professionalSurveys.map((p) => p.q23 || 'Somewhat difficult'),
            ['Very easy', 'Somewhat easy', 'Neither', 'Somewhat difficult', 'Very difficult', 'Not sure'],
            'bg-cyan-400/20 text-cyan-300',
            'text-cyan-300'
          )}

          {/* Q24: Frequency Outdated/Incomplete Info */}
          {renderSingleChoiceCard(
            'Q24',
            'Outdated Info',
            '24. Frequency encountering outdated or confusing info',
            professionalSurveys.map((p) => p.q24 || 'Frequently'),
            frequencyOptions,
            'bg-cyan-400/20 text-cyan-300',
            'text-red-400'
          )}

          {/* Q25: What Would Make Resource Info Easier */}
          {renderMultiChoiceCard(
            'Q25',
            'Info Improvements',
            '25. What would make resource info easier to use (All that apply)',
            professionalSurveys.map((p) => p.q25 || []),
            'col-span-1 md:col-span-2 lg:col-span-1',
            'bg-cyan-400/20 text-cyan-300',
            'text-cyan-300'
          )}
        </div>
      </div>

      {/* SECTION 7: WHAT IS WORKING? (Q26–Q29) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 text-xs font-bold uppercase font-mono">
              Section 7
            </span>
            <h3 className="text-sm font-black text-white uppercase tracking-wider">
              What Is Working Well?
            </h3>
          </div>
          <span className="text-[11px] text-stone-400 font-mono">Questions 26–29</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Q26: Working Particularly Well (Written) */}
          {renderWrittenCounterCard(
            'Q26',
            'Effective Programs',
            '26. Services, orgs, or approaches working particularly well',
            professionalSurveys.map((p) => p.q26),
            'col-span-1',
            'bg-emerald-400/20 text-emerald-300',
            'bg-emerald-950 text-emerald-300 border-emerald-800/60'
          )}

          {/* Q27: What Makes Approaches Successful (Written) */}
          {renderWrittenCounterCard(
            'Q27',
            'Success Factors',
            '27. What makes those approaches successful',
            professionalSurveys.map((p) => p.q27),
            'col-span-1',
            'bg-emerald-400/20 text-emerald-300',
            'bg-emerald-950 text-emerald-300 border-emerald-800/60'
          )}

          {/* Q28: Existing Resources More Should Know About */}
          {renderSingleChoiceCard(
            'Q28',
            'Hidden Gems',
            '28. Existing resources more people should know about',
            professionalSurveys.map((p) => p.q28 || 'Yes'),
            ['Yes', 'No', 'Not sure'],
            'bg-emerald-400/20 text-emerald-300',
            'text-emerald-400'
          )}

          {/* Q29: Description of Hidden Resources (Written) */}
          {renderWrittenCounterCard(
            'Q29',
            'Resource Descriptions',
            '29. Type of resource more should know about',
            professionalSurveys.map((p) => p.q29),
            'col-span-1',
            'bg-emerald-400/20 text-emerald-300',
            'bg-emerald-950 text-emerald-300 border-emerald-800/60'
          )}
        </div>
      </div>

      {/* SECTION 8: OPPORTUNITIES (Q30–Q33) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-purple-400/20 text-purple-300 text-xs font-bold uppercase font-mono">
              Section 8
            </span>
            <h3 className="text-sm font-black text-white uppercase tracking-wider">
              Opportunities & Leverage Points
            </h3>
          </div>
          <span className="text-[11px] text-stone-400 font-mono">Questions 30–33</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Q30: Opportunities for Improvement */}
          {renderMultiChoiceCard(
            'Q30',
            'Opportunity Areas',
            '30. Opportunities for improvement (All that apply)',
            professionalSurveys.map((p) => p.q30 || []),
            'col-span-1 md:col-span-2 lg:col-span-1',
            'bg-purple-400/20 text-purple-300',
            'text-purple-300'
          )}

          {/* Q31: Small Change, Meaningful Difference (Written) */}
          {renderWrittenCounterCard(
            'Q31',
            'High-Leverage Change',
            '31. Small change that could make a meaningful difference',
            professionalSurveys.map((p) => p.q31 || p.mostNeededSupport),
            'col-span-1',
            'bg-purple-400/20 text-purple-300',
            'bg-purple-950 text-purple-300 border-purple-800/60'
          )}

          {/* Q32: Frequently Overlooked Problem (Written) */}
          {renderWrittenCounterCard(
            'Q32',
            'Overlooked Issues',
            '32. Problem that is frequently overlooked',
            professionalSurveys.map((p) => p.q32),
            'col-span-1',
            'bg-purple-400/20 text-purple-300',
            'bg-purple-950 text-purple-300 border-purple-800/60'
          )}

          {/* Q33: Remove ONE Barrier (Written) */}
          {renderWrittenCounterCard(
            'Q33',
            'Single Barrier Removal',
            '33. If you could remove ONE barrier for clients',
            professionalSurveys.map((p) => p.q33),
            'col-span-1',
            'bg-purple-400/20 text-purple-300',
            'bg-purple-950 text-purple-300 border-purple-800/60'
          )}
        </div>
      </div>

      {/* SECTION 9: FILL THE GAP (Q34–Q38) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-400/20 text-[#F3BA4F] text-xs font-bold uppercase font-mono">
              Section 9
            </span>
            <h3 className="text-sm font-black text-white uppercase tracking-wider">
              Fill the Gap (Research & Expectations)
            </h3>
          </div>
          <span className="text-[11px] text-stone-400 font-mono">Questions 34–38</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Q34: What FTG Should Research (Written) */}
          {renderWrittenCounterCard(
            'Q34',
            'Research Priorities',
            '34. What new initiative should research before deciding what to do',
            professionalSurveys.map((p) => p.q34),
            'col-span-1',
            'bg-amber-400/20 text-[#F3BA4F]',
            'bg-amber-950 text-amber-300 border-amber-800/60'
          )}

          {/* Q35: What Makes Comfortable Working With FTG */}
          {renderMultiChoiceCard(
            'Q35',
            'Trust Factors',
            '35. What would make you comfortable collaborating with FTG',
            professionalSurveys.map((p) => p.q35 || []),
            'col-span-1 md:col-span-2 lg:col-span-2',
            'bg-amber-400/20 text-[#F3BA4F]',
            'text-amber-300'
          )}

          {/* Q36: Concerns About New Org (Written) */}
          {renderWrittenCounterCard(
            'Q36',
            'Community Concerns',
            '36. What would concern you about a new organization entering space',
            professionalSurveys.map((p) => p.q36 || (p as any).pitfallsToAvoid),
            'col-span-1',
            'bg-amber-400/20 text-[#F3BA4F]',
            'bg-amber-950 text-amber-300 border-amber-800/60'
          )}

          {/* Q37: Should NOT Duplicate (Written) */}
          {renderWrittenCounterCard(
            'Q37',
            'Avoid Duplication',
            '37. Areas Fill the Gap should NOT try to duplicate',
            professionalSurveys.map((p) => p.q37),
            'col-span-1',
            'bg-amber-400/20 text-[#F3BA4F]',
            'bg-amber-950 text-amber-300 border-amber-800/60'
          )}

          {/* Q38: Recommended Learning (Written) */}
          {renderWrittenCounterCard(
            'Q38',
            'Foundational Advice',
            '38. What someone starting FTG should learn before doing anything',
            professionalSurveys.map((p) => p.q38),
            'col-span-1',
            'bg-amber-400/20 text-[#F3BA4F]',
            'bg-amber-950 text-amber-300 border-amber-800/60'
          )}
        </div>
      </div>

      {/* SECTION 10: YOUR PERSPECTIVE (Q39–Q42) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-blue-400/20 text-blue-300 text-xs font-bold uppercase font-mono">
              Section 10
            </span>
            <h3 className="text-sm font-black text-white uppercase tracking-wider">
              Your Professional Perspective
            </h3>
          </div>
          <span className="text-[11px] text-stone-400 font-mono">Questions 39–42</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Q39: Wish Public Understood (Written) */}
          {renderWrittenCounterCard(
            'Q39',
            'Public Perception',
            '39. Wish general public better understood about accessing support',
            professionalSurveys.map((p) => p.q39),
            'col-span-1',
            'bg-blue-400/20 text-blue-300',
            'bg-blue-950 text-blue-300 border-blue-800/60'
          )}

          {/* Q40: Wish Orgs Understood (Written) */}
          {renderWrittenCounterCard(
            'Q40',
            'Org Empathy',
            '40. Wish organizations understood about the people they help',
            professionalSurveys.map((p) => p.q40),
            'col-span-1',
            'bg-blue-400/20 text-blue-300',
            'bg-blue-950 text-blue-300 border-blue-800/60'
          )}

          {/* Q41: Wish Policymakers Understood (Written) */}
          {renderWrittenCounterCard(
            'Q41',
            'Policy Reality',
            '41. Wish policymakers or decision-makers understood',
            professionalSurveys.map((p) => p.q41),
            'col-span-1',
            'bg-blue-400/20 text-blue-300',
            'bg-blue-950 text-blue-300 border-blue-800/60'
          )}

          {/* Q42: Most Often Misunderstood (Written) */}
          {renderWrittenCounterCard(
            'Q42',
            'Misconceptions',
            '42. Most often misunderstood about challenges faced by clients',
            professionalSurveys.map((p) => p.q42),
            'col-span-1',
            'bg-blue-400/20 text-blue-300',
            'bg-blue-950 text-blue-300 border-blue-800/60'
          )}
        </div>
      </div>

      {/* SECTION 11: FINAL THOUGHTS & FOLLOW-UP (Q43–Q46) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 text-xs font-bold uppercase font-mono">
              Section 11
            </span>
            <h3 className="text-sm font-black text-white uppercase tracking-wider">
              Final Thoughts & Research Follow-Up
            </h3>
          </div>
          <span className="text-[11px] text-stone-400 font-mono">Questions 43–46</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Q43: Anything We Didn't Ask (Written) */}
          {renderWrittenCounterCard(
            'Q43',
            'Unasked Insights',
            '43. What we didn’t think to ask that FTG should know',
            professionalSurveys.map((p) => p.q43 || p.additionalComments),
            'md:col-span-2',
            'bg-emerald-400/20 text-emerald-300',
            'bg-emerald-950 text-emerald-300 border-emerald-800/60'
          )}

          {/* Q44: Future Research Conversation Willingness */}
          {renderSingleChoiceCard(
            'Q44',
            'Research Chat',
            '44. Willing to participate in future research conversation',
            professionalSurveys.map((p) => p.q44 || p.partnershipInterest || 'Yes'),
            ['Yes', 'No', 'Maybe'],
            'bg-emerald-400/20 text-emerald-300',
            'text-emerald-400'
          )}

          {/* Q45: Preferred Contact Method */}
          {renderSingleChoiceCard(
            'Q45',
            'Contact Method',
            '45. Preferred way to be contacted',
            professionalSurveys.map((p) => p.q45 || 'Email'),
            ['Email', 'Phone', 'Other', 'I prefer not to be contacted'],
            'bg-emerald-400/20 text-emerald-300',
            'text-sky-300'
          )}
        </div>
      </div>

    </div>
  );
};
