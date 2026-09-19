import React, { useState } from 'react';
import {
  X,
  FileText,
  Calendar,
  MapPin,
  Briefcase,
  Copy,
  Check,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Download,
  Mail,
  User,
  Phone,
  Building,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Sparkles
} from 'lucide-react';
import { CommunitySurveyResponse, ProfessionalSurveyResponse, AdminStore } from '../data/adminStore';

interface SurveyResponseInspectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'community' | 'professional';
  survey: CommunitySurveyResponse | ProfessionalSurveyResponse | null;
  onDelete?: (id: string) => void;
  allSurveys?: (CommunitySurveyResponse | ProfessionalSurveyResponse)[];
  onSelectSurvey?: (survey: any) => void;
}

export const SurveyResponseInspectorModal: React.FC<SurveyResponseInspectorModalProps> = ({
  isOpen,
  onClose,
  type,
  survey,
  onDelete,
  allSurveys = [],
  onSelectSurvey,
}) => {
  const [copied, setCopied] = useState(false);
  const [activeSectionTab, setActiveSectionTab] = useState<number>(0);

  if (!isOpen || !survey) return null;

  const isCommunity = type === 'community';
  const comm = survey as CommunitySurveyResponse;
  const prof = survey as ProfessionalSurveyResponse;

  // Index navigation
  const currentIndex = allSurveys.findIndex((s) => s.id === survey.id);
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex >= 0 && currentIndex < allSurveys.length - 1;

  const handlePrev = () => {
    if (hasPrev && onSelectSurvey) {
      onSelectSurvey(allSurveys[currentIndex - 1]);
    }
  };

  const handleNext = () => {
    if (hasNext && onSelectSurvey) {
      onSelectSurvey(allSurveys[currentIndex + 1]);
    }
  };

  const handleCopyJSON = () => {
    navigator.clipboard.writeText(JSON.stringify(survey, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadJSON = () => {
    const jsonStr = JSON.stringify(survey, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `survey-${type}-${survey.id}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const renderBadge = (label: string, value: string | undefined | null, color: string = 'bg-slate-800 text-slate-200') => {
    if (!value || value.trim() === '') return <span className="text-stone-500 italic text-xs">No response provided</span>;
    return (
      <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold ${color} border border-white/10`}>
        {value}
      </span>
    );
  };

  const renderMultiBadges = (items: string[] | undefined | null, color: string = 'bg-amber-500/10 text-amber-300 border-amber-500/20') => {
    if (!items || items.length === 0) return <span className="text-stone-500 italic text-xs">None selected</span>;
    return (
      <div className="flex flex-wrap gap-1.5 pt-1">
        {items.map((item, idx) => (
          <span key={idx} className={`px-2.5 py-1 rounded-lg text-xs font-medium ${color} border`}>
            {item}
          </span>
        ))}
      </div>
    );
  };

  const renderWrittenBlock = (text: string | undefined | null, placeholder: string = 'No written comment left for this question.') => {
    if (!text || text.trim() === '') {
      return (
        <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-stone-500 text-xs italic">
          {placeholder}
        </div>
      );
    }
    return (
      <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-xs leading-relaxed font-sans whitespace-pre-wrap selection:bg-amber-400 selection:text-slate-950">
        "{text}"
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#070a11]/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-[#0e1422] rounded-3xl max-w-4xl w-full my-6 border-2 border-slate-800 shadow-2xl relative max-h-[92vh] flex flex-col text-white overflow-hidden">
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-800 flex items-center justify-between gap-4 bg-[#0a0f1d] shrink-0">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold ${
              isCommunity ? 'bg-amber-500/20 text-[#F3BA4F] border border-amber-500/40' : 'bg-sky-500/20 text-sky-400 border border-sky-500/40'
            }`}>
              {isCommunity ? <MapPin className="w-5 h-5" /> : <Briefcase className="w-5 h-5" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-black uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800 text-stone-300">
                  {survey.id}
                </span>
                <span className="text-xs font-bold text-amber-400">
                  {isCommunity ? 'Community Survey Response' : 'Professional Survey Response'}
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-black text-white uppercase tracking-tight flex items-center gap-2">
                <span>{isCommunity ? (comm.q2 || 'NL Resident') : (prof.q46Org || prof.orgName || prof.q1 || 'Frontline Organization')}</span>
                <span className="text-xs font-normal text-stone-400 font-mono">
                  • {new Date(survey.submittedAt).toLocaleDateString()} {new Date(survey.submittedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </h2>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            {allSurveys.length > 1 && (
              <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-1">
                <button
                  onClick={handlePrev}
                  disabled={!hasPrev}
                  className="p-1.5 text-stone-400 hover:text-white disabled:opacity-30 disabled:hover:text-stone-400 cursor-pointer"
                  title="Previous Response"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-[11px] font-mono font-bold px-2 text-stone-400">
                  {currentIndex + 1}/{allSurveys.length}
                </span>
                <button
                  onClick={handleNext}
                  disabled={!hasNext}
                  className="p-1.5 text-stone-400 hover:text-white disabled:opacity-30 disabled:hover:text-stone-400 cursor-pointer"
                  title="Next Response"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

            <button
              onClick={handleCopyJSON}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-stone-300 hover:text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Copy JSON to clipboard"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
            </button>

            <button
              onClick={handleDownloadJSON}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-stone-300 hover:text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Download Response as JSON"
            >
              <Download className="w-4 h-4 text-amber-400" />
            </button>

            {onDelete && (
              <button
                onClick={() => {
                  if (confirm(`Delete this survey response (${survey.id})?`)) {
                    onDelete(survey.id);
                    onClose();
                  }
                }}
                className="p-2 rounded-xl bg-red-950/60 hover:bg-red-900/60 border border-red-800/60 text-red-300 text-xs font-bold flex items-center transition-colors cursor-pointer"
                title="Delete survey response"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-stone-400 hover:text-white border border-slate-800 transition-colors cursor-pointer ml-1"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: Scrollable Question Explorer */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          
          {/* Quick Summary Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-[#090d18] border border-slate-800/80 text-xs">
            <div>
              <span className="text-[10px] uppercase font-bold text-stone-400 block">Submitted At</span>
              <span className="font-mono text-slate-200">
                {new Date(survey.submittedAt).toLocaleString()}
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-stone-400 block">
                {isCommunity ? 'Region' : 'Geographic Area'}
              </span>
              <span className="font-bold text-amber-300">
                {isCommunity ? (comm.q2 || 'NL') : (prof.q4 || 'NL')}
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-stone-400 block">
                {isCommunity ? 'Age Group' : 'Sector / Field'}
              </span>
              <span className="font-bold text-slate-200">
                {isCommunity ? (comm.q3 || '—') : (prof.q1 || prof.sector || '—')}
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-stone-400 block">Contact Info</span>
              <span className="font-mono text-emerald-400 truncate block">
                {isCommunity
                  ? (comm.q46 || 'Anonymous')
                  : (prof.q46Email || prof.contactEmail || 'Anonymous')}
              </span>
            </div>
          </div>

          {/* COMMUNITY SURVEY VIEW */}
          {isCommunity && (
            <div className="space-y-6">
              
              {/* SECTION 1 */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#090e1a] border border-slate-800 space-y-4">
                <div className="border-b border-slate-800 pb-2 flex items-center justify-between">
                  <h3 className="text-xs font-black text-amber-400 uppercase tracking-wider">
                    Section 1: About Your Connection to the Community (Q1–Q5)
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-stone-400 font-bold block mb-1">1. Connection to Newfoundland & Labrador:</span>
                    {renderBadge('Q1', comm.q1 || comm.q1Other)}
                  </div>
                  <div>
                    <span className="text-stone-400 font-bold block mb-1">2. Area of NL Connected to:</span>
                    {renderBadge('Q2', comm.q2 || comm.q2Other, 'bg-amber-950 text-amber-300 border-amber-800/60')}
                  </div>
                  <div>
                    <span className="text-stone-400 font-bold block mb-1">3. Age Group:</span>
                    {renderBadge('Q3', comm.q3)}
                  </div>
                  <div>
                    <span className="text-stone-400 font-bold block mb-1">4. Household Arrangement:</span>
                    {renderBadge('Q4', comm.q4)}
                  </div>
                  <div className="sm:col-span-2">
                    <span className="text-stone-400 font-bold block mb-1">5. Someone in your corner to turn to:</span>
                    {renderBadge('Q5', comm.q5)}
                  </div>
                </div>
              </div>

              {/* SECTION 2 */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#090e1a] border border-slate-800 space-y-4">
                <div className="border-b border-slate-800 pb-2">
                  <h3 className="text-xs font-black text-amber-400 uppercase tracking-wider">
                    Section 2: Personal Experience with Help (Q6–Q11)
                  </h3>
                </div>
                <div className="space-y-3 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <span className="text-stone-400 font-bold block mb-1">6. Needed help in past 5 years:</span>
                      {renderBadge('Q6', comm.q6, comm.q6 === 'Yes' ? 'bg-amber-950 text-amber-300' : 'bg-slate-800 text-slate-300')}
                    </div>
                    <div>
                      <span className="text-stone-400 font-bold block mb-1">8. Difficulty figuring out where to go:</span>
                      {renderBadge('Q8', comm.q8)}
                    </div>
                  </div>
                  <div>
                    <span className="text-stone-400 font-bold block mb-1">7. Types of help needed:</span>
                    {renderMultiBadges(comm.q7)}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <span className="text-stone-400 font-bold block mb-1">9. Places contacted:</span>
                      {renderBadge('Q9', comm.q9)}
                    </div>
                    <div>
                      <span className="text-stone-400 font-bold block mb-1">10. Referred without help:</span>
                      {renderBadge('Q10', comm.q10)}
                    </div>
                    <div>
                      <span className="text-stone-400 font-bold block mb-1">11. Difficulty finding who is responsible:</span>
                      {renderBadge('Q11', comm.q11)}
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 3 */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#090e1a] border border-slate-800 space-y-4">
                <div className="border-b border-slate-800 pb-2">
                  <h3 className="text-xs font-black text-amber-400 uppercase tracking-wider">
                    Section 3: Barriers & Challenges (Q12–Q15)
                  </h3>
                </div>
                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-stone-400 font-bold block mb-1">12. All barriers experienced:</span>
                    {renderMultiBadges(comm.q12, 'bg-red-950/40 text-red-300 border-red-800/40')}
                  </div>
                  <div>
                    <span className="text-stone-400 font-bold block mb-1">13. Top 3 biggest barriers:</span>
                    {renderMultiBadges(comm.q13, 'bg-amber-950 text-amber-300 border-amber-800/80 font-bold')}
                  </div>
                  <div>
                    <span className="text-stone-400 font-bold block mb-1">14. Ever given up trying to get help:</span>
                    {renderBadge('Q14', comm.q14, comm.q14 === 'Yes' ? 'bg-red-950 text-red-300 font-bold' : 'bg-emerald-950 text-emerald-300')}
                  </div>
                  <div>
                    <span className="text-stone-400 font-bold block mb-1">15. Written reason for giving up:</span>
                    {renderWrittenBlock(comm.q15)}
                  </div>
                </div>
              </div>

              {/* SECTION 4 */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#090e1a] border border-slate-800 space-y-4">
                <div className="border-b border-slate-800 pb-2">
                  <h3 className="text-xs font-black text-amber-400 uppercase tracking-wider">
                    Section 4: Finding Information (Q16–Q19)
                  </h3>
                </div>
                <div className="space-y-3 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <span className="text-stone-400 font-bold block mb-1">16. Ease of finding accurate info:</span>
                      {renderBadge('Q16', comm.q16)}
                    </div>
                    <div>
                      <span className="text-stone-400 font-bold block mb-1">18. Found outdated/confusing info:</span>
                      {renderBadge('Q18', comm.q18)}
                    </div>
                  </div>
                  <div>
                    <span className="text-stone-400 font-bold block mb-1">17. Where you look for info:</span>
                    {renderMultiBadges(comm.q17)}
                  </div>
                  <div>
                    <span className="text-stone-400 font-bold block mb-1">19. What would make finding help easier:</span>
                    {renderMultiBadges(comm.q19, 'bg-sky-500/10 text-sky-300 border-sky-500/20')}
                  </div>
                </div>
              </div>

              {/* SECTION 5 */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#090e1a] border border-slate-800 space-y-4">
                <div className="border-b border-slate-800 pb-2">
                  <h3 className="text-xs font-black text-amber-400 uppercase tracking-wider">
                    Section 5: Services Not Fitting Needs (Q20–Q23)
                  </h3>
                </div>
                <div className="space-y-3 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <span className="text-stone-400 font-bold block mb-1">20. Service seemed right but didn't fit:</span>
                      {renderBadge('Q20', comm.q20)}
                    </div>
                    <div>
                      <span className="text-stone-400 font-bold block mb-1">22. Needed help not fitting neatly:</span>
                      {renderBadge('Q22', comm.q22)}
                    </div>
                  </div>
                  <div>
                    <span className="text-stone-400 font-bold block mb-1">21. What made it a poor fit:</span>
                    {renderMultiBadges(comm.q21)}
                  </div>
                  <div>
                    <span className="text-stone-400 font-bold block mb-1">23. Written story of what happened:</span>
                    {renderWrittenBlock(comm.q23)}
                  </div>
                </div>
              </div>

              {/* SECTION 6 */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#090e1a] border border-slate-800 space-y-4">
                <div className="border-b border-slate-800 pb-2">
                  <h3 className="text-xs font-black text-amber-400 uppercase tracking-wider">
                    Section 6: Having Someone in Your Corner (Q24–Q28)
                  </h3>
                </div>
                <div className="space-y-3 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <span className="text-stone-400 font-bold block mb-1">24. Importance rating (1-5):</span>
                      {renderBadge('Q24', comm.q24 ? `${comm.q24} / 5` : undefined, 'bg-amber-400 text-slate-950 font-black')}
                    </div>
                    <div>
                      <span className="text-stone-400 font-bold block mb-1">26. Have been that person for others:</span>
                      {renderBadge('Q26', comm.q26)}
                    </div>
                    <div>
                      <span className="text-stone-400 font-bold block mb-1">28. Difficulty figuring out what to do:</span>
                      {renderBadge('Q28', comm.q28)}
                    </div>
                  </div>
                  <div>
                    <span className="text-stone-400 font-bold block mb-1">25. What happens to people without someone in corner:</span>
                    {renderMultiBadges(comm.q25)}
                  </div>
                  <div>
                    <span className="text-stone-400 font-bold block mb-1">27. Kinds of things helped with:</span>
                    {renderMultiBadges(comm.q27)}
                  </div>
                </div>
              </div>

              {/* SECTION 7 */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#090e1a] border border-slate-800 space-y-4">
                <div className="border-b border-slate-800 pb-2">
                  <h3 className="text-xs font-black text-amber-400 uppercase tracking-wider">
                    Section 7: What Could Make Things Better (Q29–Q32)
                  </h3>
                </div>
                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-stone-400 font-bold block mb-1">29. Kinds of support making a difference:</span>
                    {renderMultiBadges(comm.q29)}
                  </div>
                  <div>
                    <span className="text-stone-400 font-bold block mb-1">30. One thing that could be made easier:</span>
                    {renderWrittenBlock(comm.q30)}
                  </div>
                  <div>
                    <span className="text-stone-400 font-bold block mb-1">31. One problem not talked about enough:</span>
                    {renderWrittenBlock(comm.q31)}
                  </div>
                  <div>
                    <span className="text-stone-400 font-bold block mb-1">32. One small change making big difference:</span>
                    {renderWrittenBlock(comm.q32)}
                  </div>
                </div>
              </div>

              {/* SECTION 8 */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#090e1a] border border-slate-800 space-y-4">
                <div className="border-b border-slate-800 pb-2">
                  <h3 className="text-xs font-black text-amber-400 uppercase tracking-wider">
                    Section 8: Priorities for Our Communities (Q33–Q35)
                  </h3>
                </div>
                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-stone-400 font-bold block mb-1">33. Areas deserving more attention:</span>
                    {renderMultiBadges(comm.q33)}
                  </div>
                  <div>
                    <span className="text-stone-400 font-bold block mb-1">34. Most urgent priority area:</span>
                    {renderBadge('Q34', comm.q34, 'bg-amber-400 text-slate-950 font-black')}
                  </div>
                  <div>
                    <span className="text-stone-400 font-bold block mb-1">35. Why that priority is most important:</span>
                    {renderWrittenBlock(comm.q35)}
                  </div>
                </div>
              </div>

              {/* SECTION 9 */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#090e1a] border border-slate-800 space-y-4">
                <div className="border-b border-slate-800 pb-2">
                  <h3 className="text-xs font-black text-amber-400 uppercase tracking-wider">
                    Section 9: Ideas for Fill the Gap (Q36–Q39)
                  </h3>
                </div>
                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-stone-400 font-bold block mb-1">36. What FTG should focus on learning about first:</span>
                    {renderWrittenBlock(comm.q36)}
                  </div>
                  <div>
                    <span className="text-stone-400 font-bold block mb-1">37. What would make you trust & use FTG:</span>
                    {renderMultiBadges(comm.q37)}
                  </div>
                  <div>
                    <span className="text-stone-400 font-bold block mb-1">38. What would make you NOT trust FTG:</span>
                    {renderWrittenBlock(comm.q38)}
                  </div>
                  <div>
                    <span className="text-stone-400 font-bold block mb-1">39. Criteria for deciding what programs to work on:</span>
                    {renderMultiBadges(comm.q39)}
                  </div>
                </div>
              </div>

              {/* SECTION 10 */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#090e1a] border border-slate-800 space-y-4">
                <div className="border-b border-slate-800 pb-2">
                  <h3 className="text-xs font-black text-amber-400 uppercase tracking-wider">
                    Section 10: Lived Experiences & Reflections (Q40–Q42)
                  </h3>
                </div>
                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-stone-400 font-bold block mb-1">40. Experience recognizing a gap in our community:</span>
                    {renderWrittenBlock(comm.q40)}
                  </div>
                  <div>
                    <span className="text-stone-400 font-bold block mb-1">41. Wish someone had told you when struggling:</span>
                    {renderWrittenBlock(comm.q41)}
                  </div>
                  <div>
                    <span className="text-stone-400 font-bold block mb-1">42. Something you wish existed when you needed help:</span>
                    {renderWrittenBlock(comm.q42)}
                  </div>
                </div>
              </div>

              {/* SECTION 11 */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#090e1a] border border-slate-800 space-y-4">
                <div className="border-b border-slate-800 pb-2">
                  <h3 className="text-xs font-black text-amber-400 uppercase tracking-wider">
                    Section 11: Final Thoughts & Follow-Up (Q43–Q46)
                  </h3>
                </div>
                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-stone-400 font-bold block mb-1">43. Anything else FTG should know:</span>
                    {renderWrittenBlock(comm.q43)}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <span className="text-stone-400 font-bold block mb-1">44. Interested in research results:</span>
                      {renderBadge('Q44', comm.q44)}
                    </div>
                    <div>
                      <span className="text-stone-400 font-bold block mb-1">45. Preferred channel:</span>
                      {renderBadge('Q45', comm.q45 || comm.q45Other)}
                    </div>
                    <div>
                      <span className="text-stone-400 font-bold block mb-1">46. Follow-up Email:</span>
                      {comm.q46 ? (
                        <a href={`mailto:${comm.q46}`} className="font-mono text-amber-300 font-bold hover:underline block truncate">
                          {comm.q46}
                        </a>
                      ) : (
                        <span className="text-stone-500 italic">None provided</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* PROFESSIONAL SURVEY VIEW */}
          {!isCommunity && (
            <div className="space-y-6">
              
              {/* SECTION 1 */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#090e1a] border border-slate-800 space-y-4">
                <div className="border-b border-slate-800 pb-2">
                  <h3 className="text-xs font-black text-sky-400 uppercase tracking-wider">
                    Section 1: Professional Background (Q1–Q4)
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-stone-400 font-bold block mb-1">1. General Field / Sector:</span>
                    {renderBadge('Q1', prof.q1 || prof.q1Other || prof.sector)}
                  </div>
                  <div>
                    <span className="text-stone-400 font-bold block mb-1">2. Years in Field:</span>
                    {renderBadge('Q2', prof.q2)}
                  </div>
                  <div>
                    <span className="text-stone-400 font-bold block mb-1">3. Role Description:</span>
                    {renderBadge('Q3', prof.q3 || prof.q3Other || prof.role)}
                  </div>
                  <div>
                    <span className="text-stone-400 font-bold block mb-1">4. Geographic Area Served:</span>
                    {renderBadge('Q4', prof.q4 || prof.q4Other, 'bg-sky-950 text-sky-300 border-sky-800/60')}
                  </div>
                </div>
              </div>

              {/* SECTION 2 */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#090e1a] border border-slate-800 space-y-4">
                <div className="border-b border-slate-800 pb-2">
                  <h3 className="text-xs font-black text-sky-400 uppercase tracking-wider">
                    Section 2: What You See (Q5–Q9)
                  </h3>
                </div>
                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-stone-400 font-bold block mb-1">5. Common areas where people seek help:</span>
                    {renderMultiBadges(prof.q5)}
                  </div>
                  <div>
                    <span className="text-stone-400 font-bold block mb-1">6. Areas creating greatest challenges (Up to 5):</span>
                    {renderMultiBadges(prof.q6, 'bg-red-950/40 text-red-300 border-red-800/40')}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <span className="text-stone-400 font-bold block mb-1">7. Area deserving most attention:</span>
                      {renderBadge('Q7', prof.q7 || prof.q7Other, 'bg-amber-400 text-slate-950 font-black')}
                    </div>
                    <div>
                      <span className="text-stone-400 font-bold block mb-1">8. Frequency of people not knowing where to turn:</span>
                      {renderBadge('Q8', prof.q8)}
                    </div>
                    <div>
                      <span className="text-stone-400 font-bold block mb-1">9. Needing multiple services:</span>
                      {renderBadge('Q9', prof.q9)}
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 3 */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#090e1a] border border-slate-800 space-y-4">
                <div className="border-b border-slate-800 pb-2">
                  <h3 className="text-xs font-black text-sky-400 uppercase tracking-wider">
                    Section 3: Barriers (Q10–Q13)
                  </h3>
                </div>
                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-stone-400 font-bold block mb-1">10. Common barriers preventing help:</span>
                    {renderMultiBadges(prof.q10 || prof.barriers)}
                  </div>
                  <div>
                    <span className="text-stone-400 font-bold block mb-1">11. Top three barriers with greatest impact:</span>
                    {renderMultiBadges(prof.q11, 'bg-amber-950 text-amber-300 border-amber-800/80 font-bold')}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <span className="text-stone-400 font-bold block mb-1">12. Frequency seeing people give up:</span>
                      {renderBadge('Q12', prof.q12)}
                    </div>
                    <div>
                      <span className="text-stone-400 font-bold block mb-1">13. Causes of giving up:</span>
                      {renderMultiBadges(prof.q13)}
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 4 */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#090e1a] border border-slate-800 space-y-4">
                <div className="border-b border-slate-800 pb-2">
                  <h3 className="text-xs font-black text-sky-400 uppercase tracking-wider">
                    Section 4: Referrals and Navigation (Q14–Q18)
                  </h3>
                </div>
                <div className="space-y-3 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <span className="text-stone-400 font-bold block mb-1">14. Frequency referring to others:</span>
                      {renderBadge('Q14', prof.q14)}
                    </div>
                    <div>
                      <span className="text-stone-400 font-bold block mb-1">15. Difficulty finding referral:</span>
                      {renderBadge('Q15', prof.q15)}
                    </div>
                    <div>
                      <span className="text-stone-400 font-bold block mb-1">17. Referred service couldn't help:</span>
                      {renderBadge('Q17', prof.q17)}
                    </div>
                  </div>
                  <div>
                    <span className="text-stone-400 font-bold block mb-1">16. What makes referrals difficult:</span>
                    {renderMultiBadges(prof.q16)}
                  </div>
                  <div>
                    <span className="text-stone-400 font-bold block mb-1">18. What tends to happen in those situations:</span>
                    {renderWrittenBlock(prof.q18 || prof.referralFailureReason)}
                  </div>
                </div>
              </div>

              {/* SECTION 5 */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#090e1a] border border-slate-800 space-y-4">
                <div className="border-b border-slate-800 pb-2">
                  <h3 className="text-xs font-black text-sky-400 uppercase tracking-wider">
                    Section 5: Gaps Between Services (Q19–Q22)
                  </h3>
                </div>
                <div className="space-y-3 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <span className="text-stone-400 font-bold block mb-1">19. Situations falling between services:</span>
                      {renderBadge('Q19', prof.q19 || prof.frequencyFallingThrough)}
                    </div>
                    <div>
                      <span className="text-stone-400 font-bold block mb-1">21. Encounter needs without existing service:</span>
                      {renderBadge('Q21', prof.q21)}
                    </div>
                  </div>
                  <div>
                    <span className="text-stone-400 font-bold block mb-1">20. Situations most likely to fall between:</span>
                    {renderMultiBadges(prof.q20)}
                  </div>
                  <div>
                    <span className="text-stone-400 font-bold block mb-1">22. General types of needs:</span>
                    {renderWrittenBlock(prof.q22)}
                  </div>
                </div>
              </div>

              {/* SECTION 6 */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#090e1a] border border-slate-800 space-y-4">
                <div className="border-b border-slate-800 pb-2">
                  <h3 className="text-xs font-black text-sky-400 uppercase tracking-wider">
                    Section 6: Information Access (Q23–Q25)
                  </h3>
                </div>
                <div className="space-y-3 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <span className="text-stone-400 font-bold block mb-1">23. Ease of finding accurate info:</span>
                      {renderBadge('Q23', prof.q23)}
                    </div>
                    <div>
                      <span className="text-stone-400 font-bold block mb-1">24. Encounter outdated/confusing info:</span>
                      {renderBadge('Q24', prof.q24)}
                    </div>
                  </div>
                  <div>
                    <span className="text-stone-400 font-bold block mb-1">25. What would make resource info easier to use:</span>
                    {renderMultiBadges(prof.q25)}
                  </div>
                </div>
              </div>

              {/* SECTION 7 */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#090e1a] border border-slate-800 space-y-4">
                <div className="border-b border-slate-800 pb-2">
                  <h3 className="text-xs font-black text-sky-400 uppercase tracking-wider">
                    Section 7: What Is Working? (Q26–Q29)
                  </h3>
                </div>
                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-stone-400 font-bold block mb-1">26. Services/organizations working well:</span>
                    {renderWrittenBlock(prof.q26)}
                  </div>
                  <div>
                    <span className="text-stone-400 font-bold block mb-1">27. What makes those approaches successful:</span>
                    {renderWrittenBlock(prof.q27)}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <span className="text-stone-400 font-bold block mb-1">28. Resources more should know about:</span>
                      {renderBadge('Q28', prof.q28)}
                    </div>
                    <div>
                      <span className="text-stone-400 font-bold block mb-1">29. Describe resource:</span>
                      {renderWrittenBlock(prof.q29)}
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 8 */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#090e1a] border border-slate-800 space-y-4">
                <div className="border-b border-slate-800 pb-2">
                  <h3 className="text-xs font-black text-sky-400 uppercase tracking-wider">
                    Section 8: Opportunities (Q30–Q33)
                  </h3>
                </div>
                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-stone-400 font-bold block mb-1">30. Opportunities for improvement:</span>
                    {renderMultiBadges(prof.q30)}
                  </div>
                  <div>
                    <span className="text-stone-400 font-bold block mb-1">31. One small change making meaningful difference:</span>
                    {renderWrittenBlock(prof.q31 || prof.mostNeededSupport)}
                  </div>
                  <div>
                    <span className="text-stone-400 font-bold block mb-1">32. One problem frequently overlooked:</span>
                    {renderWrittenBlock(prof.q32)}
                  </div>
                  <div>
                    <span className="text-stone-400 font-bold block mb-1">33. One barrier you would remove:</span>
                    {renderWrittenBlock(prof.q33)}
                  </div>
                </div>
              </div>

              {/* SECTION 9 */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#090e1a] border border-slate-800 space-y-4">
                <div className="border-b border-slate-800 pb-2">
                  <h3 className="text-xs font-black text-sky-400 uppercase tracking-wider">
                    Section 9: Fill The Gap Initiative (Q34–Q38)
                  </h3>
                </div>
                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-stone-400 font-bold block mb-1">34. What FTG should research before deciding:</span>
                    {renderWrittenBlock(prof.q34)}
                  </div>
                  <div>
                    <span className="text-stone-400 font-bold block mb-1">35. What would make comfortable working alongside/referring:</span>
                    {renderMultiBadges(prof.q35)}
                  </div>
                  <div>
                    <span className="text-stone-400 font-bold block mb-1">36. What would concern you about a new organization:</span>
                    {renderWrittenBlock(prof.q36)}
                  </div>
                  <div>
                    <span className="text-stone-400 font-bold block mb-1">37. Areas FTG should NOT try to duplicate:</span>
                    {renderWrittenBlock(prof.q37)}
                  </div>
                  <div>
                    <span className="text-stone-400 font-bold block mb-1">38. Recommendations before doing anything:</span>
                    {renderWrittenBlock(prof.q38)}
                  </div>
                </div>
              </div>

              {/* SECTION 10 */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#090e1a] border border-slate-800 space-y-4">
                <div className="border-b border-slate-800 pb-2">
                  <h3 className="text-xs font-black text-sky-400 uppercase tracking-wider">
                    Section 10: Professional Perspective (Q39–Q42)
                  </h3>
                </div>
                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-stone-400 font-bold block mb-1">39. What wish general public understood:</span>
                    {renderWrittenBlock(prof.q39)}
                  </div>
                  <div>
                    <span className="text-stone-400 font-bold block mb-1">40. What wish organizations understood:</span>
                    {renderWrittenBlock(prof.q40)}
                  </div>
                  <div>
                    <span className="text-stone-400 font-bold block mb-1">41. What wish policymakers/decision-makers understood:</span>
                    {renderWrittenBlock(prof.q41)}
                  </div>
                  <div>
                    <span className="text-stone-400 font-bold block mb-1">42. Misunderstandings about challenges:</span>
                    {renderWrittenBlock(prof.q42)}
                  </div>
                </div>
              </div>

              {/* SECTION 11 */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#090e1a] border border-slate-800 space-y-4">
                <div className="border-b border-slate-800 pb-2">
                  <h3 className="text-xs font-black text-sky-400 uppercase tracking-wider">
                    Section 11: Final Thoughts & Contact Info (Q43–Q46)
                  </h3>
                </div>
                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-stone-400 font-bold block mb-1">43. What else we didn't think to ask:</span>
                    {renderWrittenBlock(prof.q43 || prof.additionalComments)}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <span className="text-stone-400 font-bold block mb-1">44. Willing to participate in future conversation:</span>
                      {renderBadge('Q44', prof.q44)}
                    </div>
                    <div>
                      <span className="text-stone-400 font-bold block mb-1">45. Preferred contact method:</span>
                      {renderBadge('Q45', prof.q45 || prof.q45Other)}
                    </div>
                  </div>
                  
                  {/* Contact card */}
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2 mt-2">
                    <span className="text-[11px] font-black uppercase text-amber-400 tracking-wider block">
                      46. Contact & Organization Details
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="flex items-center gap-2">
                        <User className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                        <span className="text-slate-300 font-medium">{prof.q46Name || prof.contactName || 'Anonymous'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Building className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                        <span className="text-slate-300 font-medium">{prof.q46Org || prof.orgName || 'Anonymous Organization'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        {prof.q46Email || prof.contactEmail ? (
                          <a href={`mailto:${prof.q46Email || prof.contactEmail}`} className="text-amber-300 font-mono hover:underline truncate">
                            {prof.q46Email || prof.contactEmail}
                          </a>
                        ) : (
                          <span className="text-stone-500 italic">No email</span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                        <span className="text-slate-300 font-mono">{prof.q46Phone || prof.contactPhone || 'No phone'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 flex items-center justify-between bg-[#0a0f1d] shrink-0 text-xs">
          <div className="flex items-center gap-2 text-stone-400">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>All 46 survey questions & answers securely tracked and persisted.</span>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black uppercase tracking-wider cursor-pointer"
          >
            Close Viewer
          </button>
        </div>

      </div>
    </div>
  );
};
