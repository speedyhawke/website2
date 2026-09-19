import React from 'react';
import { CommunitySurveyResponse } from '../data/adminStore';

interface CommunityQuestionsTallyGridProps {
  communitySurveys: CommunitySurveyResponse[];
  totalCommunity: number;
  aggregateSingleChoice: (items: (string | undefined)[]) => Record<string, number>;
  aggregateMultiChoice: (itemsList: (string[] | undefined)[]) => Record<string, number>;
}

export const CommunityQuestionsTallyGrid: React.FC<CommunityQuestionsTallyGridProps> = ({
  communitySurveys,
  totalCommunity,
  aggregateSingleChoice,
  aggregateMultiChoice,
}) => {
  // Helper to render a card for single choice questions
  const renderSingleChoiceCard = (
    qNumber: string,
    badgeText: string,
    title: string,
    items: (string | undefined)[],
    order?: string[],
    badgeColor: string = 'bg-amber-400/20 text-[#F3BA4F]',
    countColor: string = 'text-amber-400'
  ) => {
    const rawCounts = aggregateSingleChoice(items);
    let entries: [string, number][] = [];

    if (order && order.length > 0) {
      entries = order.map((opt) => [opt, rawCounts[opt] || 0]);
      // Also catch any other answers not in predefined list
      Object.keys(rawCounts).forEach((key) => {
        if (!order.includes(key) && key.trim() !== '') {
          entries.push([key, rawCounts[key]]);
        }
      });
    } else {
      entries = (Object.entries(rawCounts) as [string, number][]).sort(([, a], [, b]) => b - a);
    }

    return (
      <div className="p-5 rounded-2xl bg-[#0f172a] border border-slate-700/80 space-y-3 flex flex-col justify-between hover:border-amber-400/60 transition-all shadow-md">
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
              const pct = totalCommunity > 0 ? Math.round((count / totalCommunity) * 100) : 0;
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

  // Helper to render a card for multi choice questions
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
              const pct = totalCommunity > 0 ? Math.round((count / totalCommunity) * 100) : 0;
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

  // Helper to render rating scale 1 to 5
  const renderScaleCard = (
    qNumber: string,
    badgeText: string,
    title: string,
    ratings: (number | undefined | null)[]
  ) => {
    const scale = [5, 4, 3, 2, 1];
    const validRatings = ratings.filter((r): r is number => typeof r === 'number');
    const avg = validRatings.length > 0 ? (validRatings.reduce((a, b) => a + b, 0) / validRatings.length).toFixed(1) : '—';

    return (
      <div className="p-5 rounded-2xl bg-[#0f172a] border border-slate-700/80 space-y-3 flex flex-col justify-between hover:border-purple-400/60 transition-all shadow-md">
        <div>
          <div className="flex items-center justify-between border-b border-slate-700/80 pb-2 mb-2.5">
            <span className="px-2.5 py-1 rounded-md text-xs font-mono font-black uppercase tracking-wider bg-purple-400/20 text-purple-300">
              {qNumber}
            </span>
            <span className="text-xs text-stone-300 font-bold uppercase truncate max-w-[160px] text-right">
              {badgeText}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white leading-snug">{title}</h3>
            <span className="px-2.5 py-1 rounded-lg bg-purple-950 text-purple-200 border border-purple-700/60 text-xs font-mono font-bold shrink-0 ml-2">
              Avg: {avg} / 5
            </span>
          </div>
        </div>

        <div className="space-y-2 text-sm pt-1">
          {scale.map((num) => {
            const count = ratings.filter((r) => r === num).length;
            const pct = totalCommunity > 0 ? Math.round((count / totalCommunity) * 100) : 0;
            const labels: Record<number, string> = {
              5: '5 - Extremely Important',
              4: '4 - Very Important',
              3: '3 - Moderately Important',
              2: '2 - Slightly Important',
              1: '1 - Not at all',
            };
            return (
              <div
                key={num}
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-700/60 flex items-center justify-between gap-3"
              >
                <span className="text-slate-200 font-medium text-xs sm:text-sm">{labels[num] || `${num} Stars`}</span>
                <div className="flex items-center gap-2 shrink-0 font-mono text-xs sm:text-sm">
                  <span className="text-white font-bold bg-slate-800 px-2 py-0.5 rounded border border-slate-700">{count}</span>
                  <span className="text-purple-400 font-bold text-xs sm:text-sm">({pct}%)</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Helper for written responses counter card with link to written tab
  const renderWrittenCounterCard = (
    qNumber: string,
    badgeText: string,
    title: string,
    answers: (string | undefined)[],
    colSpan: string = 'col-span-1'
  ) => {
    const valid = answers.filter((a) => a && a.trim().length > 0);
    const pct = totalCommunity > 0 ? Math.round((valid.length / totalCommunity) * 100) : 0;
    const recent = valid.slice(0, 2);

    return (
      <div className={`p-5 rounded-2xl bg-[#0f172a] border border-slate-700/80 space-y-3 flex flex-col justify-between hover:border-sky-400/60 transition-all shadow-md ${colSpan}`}>
        <div>
          <div className="flex items-center justify-between border-b border-slate-700/80 pb-2 mb-2.5">
            <span className="px-2.5 py-1 rounded-md text-xs font-mono font-black uppercase tracking-wider bg-sky-400/20 text-sky-300">
              {qNumber}
            </span>
            <span className="text-xs text-stone-300 font-bold uppercase truncate max-w-[160px] text-right">
              {badgeText}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white leading-snug">{title}</h3>
            <span className="px-2.5 py-1 rounded-lg bg-sky-950 text-sky-200 border border-sky-700/60 text-xs font-mono font-bold shrink-0 ml-2">
              {valid.length} answers ({pct}%)
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

  return (
    <div className="space-y-8">
      
      {/* SECTION 1: ABOUT YOU & YOUR COMMUNITY */}
      <div className="space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-400/20 text-[#F3BA4F] text-xs font-bold uppercase font-mono">
              Section 1
            </span>
            <h3 className="text-sm font-black text-white uppercase tracking-wider">
              About You & Your Community
            </h3>
          </div>
          <span className="text-[11px] text-stone-400 font-mono">Questions 1–5</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Q1 */}
          {renderSingleChoiceCard(
            'Q1',
            'Connection',
            'Connection to Newfoundland & Labrador',
            communitySurveys.map((c) => c.q1),
            [
              'I currently live in Newfoundland and Labrador',
              'I previously lived in Newfoundland and Labrador',
              'I have family or close connections in Newfoundland and Labrador',
              'I work or operate an organization in Newfoundland and Labrador',
              'Other'
            ]
          )}

          {/* Q2 */}
          {renderSingleChoiceCard(
            'Q2',
            'Geography',
            'Area / Region in NL',
            communitySurveys.map((c) => c.q2)
          )}

          {/* Q3 */}
          {renderSingleChoiceCard(
            'Q3',
            'Demographics',
            'Age Group Distribution',
            communitySurveys.map((c) => c.q3),
            ['Under 18', '18–24', '25–34', '35–44', '45–54', '55–64', '65+', 'Prefer not to say'],
            'bg-amber-400/20 text-[#F3BA4F]',
            'text-sky-400'
          )}

          {/* Q4 */}
          {renderSingleChoiceCard(
            'Q4',
            'Household',
            'Household Composition',
            communitySurveys.map((c) => c.q4),
            [
              'I live alone',
              'I live with a partner/spouse',
              'I live with children',
              'I live with partner and children',
              'I live with parents/family',
              'I live with roommates',
              'Prefer not to say',
              'Other'
            ]
          )}

          {/* Q5 */}
          {renderSingleChoiceCard(
            'Q5',
            'Support System',
            'Have someone to turn to when facing difficult challenges',
            communitySurveys.map((c) => c.q5),
            ['Yes, always', 'Yes, usually', 'Sometimes', 'Rarely', 'No, never', 'Prefer not to say'],
            'bg-amber-400/20 text-[#F3BA4F]',
            'text-emerald-400'
          )}
        </div>
      </div>

      {/* SECTION 2: EXPERIENCES WITH HELP & SUPPORT */}
      <div className="space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-400/20 text-[#F3BA4F] text-xs font-bold uppercase font-mono">
              Section 2
            </span>
            <h3 className="text-sm font-black text-white uppercase tracking-wider">
              Experiences with Help & Support
            </h3>
          </div>
          <span className="text-[11px] text-stone-400 font-mono">Questions 6–11</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Q6 */}
          {renderSingleChoiceCard(
            'Q6',
            'Support History',
            'Needed help or support in past 5 years',
            communitySurveys.map((c) => c.q6),
            ['Yes', 'No', 'Prefer not to say']
          )}

          {/* Q7 */}
          {renderMultiChoiceCard(
            'Q7',
            'Categories of Need',
            'Types of Support Needed (All that apply)',
            communitySurveys.map((c) => c.q7),
            'md:col-span-2'
          )}

          {/* Q8 */}
          {renderSingleChoiceCard(
            'Q8',
            'Navigation',
            'Difficulty figuring out where to go for help',
            communitySurveys.map((c) => c.q8),
            ['Very easy', 'Somewhat easy', 'Neither easy nor difficult', 'Somewhat difficult', 'Very difficult', 'Not applicable']
          )}

          {/* Q9 */}
          {renderSingleChoiceCard(
            'Q9',
            'Effort',
            'Number of places/people contacted before finding right help',
            communitySurveys.map((c) => c.q9),
            ['1 place', '2', '3', '4', '5 or more', 'Never found what was needed', 'Not applicable']
          )}

          {/* Q10 */}
          {renderSingleChoiceCard(
            'Q10',
            'Referral Loops',
            'Referred from one place to another without getting help',
            communitySurveys.map((c) => c.q10),
            ['Never', 'Once', 'Sometimes', 'Frequently', 'Not applicable']
          )}

          {/* Q11 */}
          {renderSingleChoiceCard(
            'Q11',
            'Responsibility',
            'Difficulty figuring out who is actually responsible for helping',
            communitySurveys.map((c) => c.q11),
            ['Yes, frequently', 'Yes, sometimes', 'No', 'Not sure', 'Not applicable']
          )}
        </div>
      </div>

      {/* SECTION 3: BARRIERS & ROADBLOCKS */}
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
          <span className="text-[11px] text-stone-400 font-mono">Questions 12–15</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Q12 */}
          {renderMultiChoiceCard(
            'Q12',
            'All Barriers',
            'Barriers Experienced When Trying to Get Help',
            communitySurveys.map((c) => c.q12),
            'md:col-span-2 lg:col-span-2',
            'bg-red-400/20 text-red-300',
            'text-red-300'
          )}

          {/* Q14 */}
          {renderSingleChoiceCard(
            'Q14',
            'Overwhelm',
            'Given up trying to get help due to overwhelming process',
            communitySurveys.map((c) => c.q14),
            ['Yes', 'No', 'Maybe', 'Prefer not to say'],
            'bg-red-400/20 text-red-300',
            'text-red-400'
          )}

          {/* Q13 */}
          {renderMultiChoiceCard(
            'Q13',
            'Top 3 Ranked',
            'Top 3 Biggest Barriers Ranked by Community',
            communitySurveys.map((c) => c.q13),
            'md:col-span-2 lg:col-span-2',
            'bg-amber-400/20 text-[#F3BA4F]',
            'text-[#F3BA4F]'
          )}

          {/* Q15 Written */}
          {renderWrittenCounterCard(
            'Q15',
            'Written Story',
            'Reasons for Giving Up on Getting Help',
            communitySurveys.map((c) => c.q15)
          )}
        </div>
      </div>

      {/* SECTION 4: INFORMATION & AWARENESS */}
      <div className="space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-sky-400/20 text-sky-300 text-xs font-bold uppercase font-mono">
              Section 4
            </span>
            <h3 className="text-sm font-black text-white uppercase tracking-wider">
              Information & Awareness
            </h3>
          </div>
          <span className="text-[11px] text-stone-400 font-mono">Questions 16–19</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Q16 */}
          {renderSingleChoiceCard(
            'Q16',
            'Info Search',
            'How easy or difficult is it to find accurate information',
            communitySurveys.map((c) => c.q16),
            ['Very easy', 'Somewhat easy', 'Neither easy nor difficult', 'Somewhat difficult', 'Very difficult', 'Not sure']
          )}

          {/* Q18 */}
          {renderSingleChoiceCard(
            'Q18',
            'Outdated Info',
            'Found outdated, confusing, or misleading info online',
            communitySurveys.map((c) => c.q18),
            ['Frequently', 'Sometimes', 'Rarely', 'Never', 'Not sure']
          )}

          {/* Q17 */}
          {renderMultiChoiceCard(
            'Q17',
            'Channels',
            'Where do you look first for information',
            communitySurveys.map((c) => c.q17)
          )}

          {/* Q19 */}
          {renderMultiChoiceCard(
            'Q19',
            'Solutions',
            'What would make finding help easier (Select up to three)',
            communitySurveys.map((c) => c.q19),
            'md:col-span-2 lg:col-span-3'
          )}
        </div>
      </div>

      {/* SECTION 5: FALLING BETWEEN THE CRACKS */}
      <div className="space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-400/20 text-[#F3BA4F] text-xs font-bold uppercase font-mono">
              Section 5
            </span>
            <h3 className="text-sm font-black text-white uppercase tracking-wider">
              Falling Between the Cracks
            </h3>
          </div>
          <span className="text-[11px] text-stone-400 font-mono">Questions 20–23</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Q20 */}
          {renderSingleChoiceCard(
            'Q20',
            'Service Mismatch',
            'Found a service that seemed like it should help, but didn\'t fit',
            communitySurveys.map((c) => c.q20),
            ['Yes, frequently', 'Yes, sometimes', 'Once', 'No, never', 'Not sure']
          )}

          {/* Q22 */}
          {renderSingleChoiceCard(
            'Q22',
            'Uncategorized Need',
            'Needed help with something that did not fit neatly into any existing program',
            communitySurveys.map((c) => c.q22),
            ['Yes', 'No', 'Not sure']
          )}

          {/* Q21 */}
          {renderMultiChoiceCard(
            'Q21',
            'Poor Fit Reasons',
            'What made the service a poor fit (All that apply)',
            communitySurveys.map((c) => c.q21)
          )}

          {/* Q23 Written */}
          {renderWrittenCounterCard(
            'Q23',
            'Written Story',
            'Personal Experience of Falling Between the Cracks',
            communitySurveys.map((c) => c.q23),
            'md:col-span-2 lg:col-span-3'
          )}
        </div>
      </div>

      {/* SECTION 6: ADVOCACY & NAVIGATING FOR OTHERS */}
      <div className="space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-purple-400/20 text-purple-300 text-xs font-bold uppercase font-mono">
              Section 6
            </span>
            <h3 className="text-sm font-black text-white uppercase tracking-wider">
              Advocacy & Navigating for Others
            </h3>
          </div>
          <span className="text-[11px] text-stone-400 font-mono">Questions 24–28</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Q24 Scale */}
          {renderScaleCard(
            'Q24',
            'Importance Scale',
            'Importance of having someone in your corner to help navigate',
            communitySurveys.map((c) => c.q24)
          )}

          {/* Q26 */}
          {renderSingleChoiceCard(
            'Q26',
            'Helping Others',
            'Have you been the navigator/advocate for someone else',
            communitySurveys.map((c) => c.q26),
            ['Yes, frequently', 'Yes, sometimes', 'Once or twice', 'No', 'Not sure']
          )}

          {/* Q28 */}
          {renderSingleChoiceCard(
            'Q28',
            'Difficulty for Others',
            'How difficult was it to figure out what to do for that person',
            communitySurveys.map((c) => c.q28),
            ['Very easy', 'Somewhat easy', 'Neither easy nor difficult', 'Somewhat difficult', 'Very difficult', 'Not applicable']
          )}

          {/* Q25 */}
          {renderMultiChoiceCard(
            'Q25',
            'Consequences',
            'What happens to people who don\'t have someone in their corner',
            communitySurveys.map((c) => c.q25)
          )}

          {/* Q27 */}
          {renderMultiChoiceCard(
            'Q27',
            'Support Types',
            'What kinds of things have you helped others with',
            communitySurveys.map((c) => c.q27),
            'md:col-span-2'
          )}
        </div>
      </div>

      {/* SECTION 7: WHAT WOULD MAKE A DIFFERENCE */}
      <div className="space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 text-xs font-bold uppercase font-mono">
              Section 7
            </span>
            <h3 className="text-sm font-black text-white uppercase tracking-wider">
              What Would Make a Difference
            </h3>
          </div>
          <span className="text-[11px] text-stone-400 font-mono">Questions 29–32</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Q29 */}
          {renderMultiChoiceCard(
            'Q29',
            'Impact Drivers',
            'What kinds of support would make the biggest difference (Up to 3)',
            communitySurveys.map((c) => c.q29),
            'md:col-span-2 lg:col-span-3',
            'bg-emerald-400/20 text-emerald-300',
            'text-emerald-300'
          )}

          {/* Q30 Written */}
          {renderWrittenCounterCard(
            'Q30',
            'Written Idea',
            'If you could make ONE thing easier when needing help',
            communitySurveys.map((c) => c.q30)
          )}

          {/* Q31 Written */}
          {renderWrittenCounterCard(
            'Q31',
            'Written Idea',
            'A problem in the community not talked about enough',
            communitySurveys.map((c) => c.q31)
          )}

          {/* Q32 Written */}
          {renderWrittenCounterCard(
            'Q32',
            'Written Idea',
            'A small change that could make a big difference',
            communitySurveys.map((c) => c.q32)
          )}
        </div>
      </div>

      {/* SECTION 8: COMMUNITY PRIORITIES */}
      <div className="space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-400/20 text-[#F3BA4F] text-xs font-bold uppercase font-mono">
              Section 8
            </span>
            <h3 className="text-sm font-black text-white uppercase tracking-wider">
              Community Priorities
            </h3>
          </div>
          <span className="text-[11px] text-stone-400 font-mono">Questions 33–35</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Q33 */}
          {renderMultiChoiceCard(
            'Q33',
            'Priority Areas',
            'Areas Deserving More Attention (Select up to 5)',
            communitySurveys.map((c) => c.q33),
            'md:col-span-2'
          )}

          {/* Q34 */}
          {renderSingleChoiceCard(
            'Q34',
            'Top Priority',
            'Single Most Urgent Priority Area',
            communitySurveys.map((c) => c.q34)
          )}

          {/* Q35 Written */}
          {renderWrittenCounterCard(
            'Q35',
            'Written Why',
            'Why is that priority area most important to you',
            communitySurveys.map((c) => c.q35),
            'md:col-span-2 lg:col-span-3'
          )}
        </div>
      </div>

      {/* SECTION 9: IDEAS FOR FILL THE GAP */}
      <div className="space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-400/20 text-[#F3BA4F] text-xs font-bold uppercase font-mono">
              Section 9
            </span>
            <h3 className="text-sm font-black text-white uppercase tracking-wider">
              Ideas for Fill the Gap
            </h3>
          </div>
          <span className="text-[11px] text-stone-400 font-mono">Questions 36–39</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Q37 */}
          {renderMultiChoiceCard(
            'Q37',
            'Building Trust',
            'What would make you trust & use Fill the Gap',
            communitySurveys.map((c) => c.q37),
            'md:col-span-2'
          )}

          {/* Q39 */}
          {renderMultiChoiceCard(
            'Q39',
            'Program Decisions',
            'Criteria for deciding what programs to work on (Up to 3)',
            communitySurveys.map((c) => c.q39)
          )}

          {/* Q36 Written */}
          {renderWrittenCounterCard(
            'Q36',
            'Written Focus',
            'What FTG should focus on learning about first',
            communitySurveys.map((c) => c.q36)
          )}

          {/* Q38 Written */}
          {renderWrittenCounterCard(
            'Q38',
            'Written Red Flags',
            'What would make you NOT trust an organization like FTG',
            communitySurveys.map((c) => c.q38),
            'md:col-span-2'
          )}
        </div>
      </div>

      {/* SECTION 10: YOUR EXPERIENCE */}
      <div className="space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-sky-400/20 text-sky-300 text-xs font-bold uppercase font-mono">
              Section 10
            </span>
            <h3 className="text-sm font-black text-white uppercase tracking-wider">
              Lived Experiences & Reflections
            </h3>
          </div>
          <span className="text-[11px] text-stone-400 font-mono">Questions 40–42</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Q40 Written */}
          {renderWrittenCounterCard(
            'Q40',
            'Lived Experience',
            'Experience recognizing a gap in our community',
            communitySurveys.map((c) => c.q40)
          )}

          {/* Q41 Written */}
          {renderWrittenCounterCard(
            'Q41',
            'Advice / Reflection',
            'Wish someone had told you when struggling',
            communitySurveys.map((c) => c.q41)
          )}

          {/* Q42 Written */}
          {renderWrittenCounterCard(
            'Q42',
            'Wish List',
            'Something you wish existed when you needed help',
            communitySurveys.map((c) => c.q42)
          )}
        </div>
      </div>

      {/* SECTION 11: FINAL THOUGHTS & RESEARCH FOLLOW-UP */}
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Q44 */}
          {renderSingleChoiceCard(
            'Q44',
            'Research Interest',
            'Interested in hearing research results from FTG',
            communitySurveys.map((c) => c.q44),
            ['Yes', 'No']
          )}

          {/* Q45 */}
          {renderSingleChoiceCard(
            'Q45',
            'Channel Preference',
            'Preferred channel to receive findings',
            communitySurveys.map((c) => c.q45),
            ['Fill the Gap website', 'Facebook', 'Email', 'Other']
          )}

          {/* Q46 Email count */}
          {renderSingleChoiceCard(
            'Q46',
            'Contact Opt-Ins',
            'Optional Email Provided for Follow-up',
            communitySurveys.map((c) => (c.q46 && c.q46.includes('@') ? 'Provided Email' : 'Anonymous / No Email')),
            ['Provided Email', 'Anonymous / No Email'],
            'bg-emerald-400/20 text-emerald-300',
            'text-emerald-400'
          )}

          {/* Q43 Written */}
          {renderWrittenCounterCard(
            'Q43',
            'Open Mic',
            'Anything else you would like Fill the Gap to know',
            communitySurveys.map((c) => c.q43),
            'md:col-span-2 lg:col-span-3'
          )}
        </div>
      </div>

    </div>
  );
};
