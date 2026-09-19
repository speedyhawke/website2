import React, { useState, useEffect } from 'react';
import {
  Plus,
  Edit2,
  Trash2,
  ArrowUp,
  ArrowDown,
  Copy,
  RotateCcw,
  CheckCircle2,
  ListFilter,
  Layers,
  Sparkles,
  HelpCircle,
  X,
  Save,
  CheckSquare,
  Radio,
  FileText,
  ChevronDown,
  Star,
  Users,
  Briefcase,
  ExternalLink,
  Code2,
  Share2
} from 'lucide-react';
import {
  SurveyQuestionsStore,
  SurveyQuestionItem,
  QuestionType,
  DEFAULT_COMMUNITY_QUESTIONS,
  DEFAULT_PROFESSIONAL_QUESTIONS
} from '../data/surveyQuestionsStore';

const QUESTION_TYPE_LABELS: Record<QuestionType, { label: string; icon: any; description: string }> = {
  multiple_choice: {
    label: 'Multiple Choice (Single Select)',
    icon: Radio,
    description: 'Respondent selects only one option from a list of radio buttons.'
  },
  checkboxes: {
    label: 'Checkboxes (Select Multiple)',
    icon: CheckSquare,
    description: 'Respondent can check multiple answers (e.g. multiple services).'
  },
  text: {
    label: 'Written Answer (Short / Long Text)',
    icon: FileText,
    description: 'Respondent types their thoughts into an open text box.'
  },
  dropdown: {
    label: 'Dropdown Menu',
    icon: ChevronDown,
    description: 'A compact select menu (ideal for large lists like towns or zones).'
  },
  rating: {
    label: 'Rating Scale (1 - 5)',
    icon: Star,
    description: 'Numerical rating scale from 1 (lowest) to 5 (highest).'
  }
};

const POPULAR_COMMUNITY_CATEGORIES = [
  'Housing & Shelter',
  'Food & Emergency Supplies',
  'Mental Health & Counselling',
  'Healthcare & Addiction Support',
  'Transportation & Access',
  'Family & Youth Needs',
  'Systemic Barriers & Referrals',
  'Ideas & Vision',
  'Demographics & Location'
];

export const SurveyQuestionManager: React.FC = () => {
  const [selectedSurveyType, setSelectedSurveyType] = useState<'community' | 'professional'>('community');
  const [questions, setQuestions] = useState<SurveyQuestionItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedNotification, setCopiedNotification] = useState<string | null>(null);

  // Edit / Create Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingQuestionId, setEditingQuestionId] = useState<string | null>(null);

  // Form Fields
  const [formCategory, setFormCategory] = useState('Housing & Shelter');
  const [formQuestion, setFormQuestion] = useState('');
  const [formHelpText, setFormHelpText] = useState('');
  const [formType, setFormType] = useState<QuestionType>('multiple_choice');
  const [formOptions, setFormOptions] = useState<string[]>(['Option 1', 'Option 2', 'Option 3']);
  const [formNewOptionInput, setFormNewOptionInput] = useState('');
  const [formAllowOther, setFormAllowOther] = useState(false);
  const [formRequired, setFormRequired] = useState(true);
  const [formPlaceholder, setFormPlaceholder] = useState('');

  // Blueprint Export Modal State
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  const loadQuestions = () => {
    const list = SurveyQuestionsStore.getQuestions(selectedSurveyType);
    setQuestions(list);
  };

  useEffect(() => {
    loadQuestions();
    const handleUpdate = () => loadQuestions();
    window.addEventListener('ftg_survey_questions_updated', handleUpdate);
    return () => window.removeEventListener('ftg_survey_questions_updated', handleUpdate);
  }, [selectedSurveyType]);

  const categories = Array.from(new Set(questions.map((q) => q.category))).filter(Boolean);

  const filteredQuestions = selectedCategory === 'all'
    ? questions
    : questions.filter((q) => q.category === selectedCategory);

  const handleOpenCreate = () => {
    setEditingQuestionId(null);
    setFormCategory(selectedSurveyType === 'community' ? 'Housing & Shelter' : 'Systemic Coordination');
    setFormQuestion('');
    setFormHelpText('');
    setFormType('multiple_choice');
    setFormOptions(['Option 1', 'Option 2', 'Option 3']);
    setFormNewOptionInput('');
    setFormAllowOther(false);
    setFormRequired(true);
    setFormPlaceholder('');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (q: SurveyQuestionItem) => {
    setEditingQuestionId(q.id);
    setFormCategory(q.category);
    setFormQuestion(q.question);
    setFormHelpText(q.helpText || '');
    setFormType(q.type);
    setFormOptions(q.options ? [...q.options] : []);
    setFormNewOptionInput('');
    setFormAllowOther(!!q.allowOther);
    setFormRequired(q.required);
    setFormPlaceholder(q.placeholder || '');
    setIsModalOpen(true);
  };

  const handleAddOption = () => {
    if (!formNewOptionInput.trim()) return;
    setFormOptions([...formOptions, formNewOptionInput.trim()]);
    setFormNewOptionInput('');
  };

  const handleRemoveOption = (index: number) => {
    setFormOptions(formOptions.filter((_, i) => i !== index));
  };

  const handleOptionChange = (index: number, val: string) => {
    const next = [...formOptions];
    next[index] = val;
    setFormOptions(next);
  };

  const handleSaveQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formQuestion.trim()) return;

    if (editingQuestionId) {
      SurveyQuestionsStore.updateQuestion(editingQuestionId, {
        category: formCategory.trim() || 'General',
        question: formQuestion.trim(),
        helpText: formHelpText.trim() || undefined,
        type: formType,
        options: (formType === 'text' || formType === 'rating') ? [] : formOptions.filter((o) => o.trim().length > 0),
        allowOther: formAllowOther,
        required: formRequired,
        placeholder: formPlaceholder.trim() || undefined,
      });
    } else {
      SurveyQuestionsStore.addQuestion({
        surveyType: selectedSurveyType,
        category: formCategory.trim() || 'General',
        question: formQuestion.trim(),
        helpText: formHelpText.trim() || undefined,
        type: formType,
        options: (formType === 'text' || formType === 'rating') ? [] : formOptions.filter((o) => o.trim().length > 0),
        allowOther: formAllowOther,
        required: formRequired,
        placeholder: formPlaceholder.trim() || undefined,
      });
    }

    setIsModalOpen(false);
    loadQuestions();
  };

  const handleDelete = (id: string, text: string) => {
    if (window.confirm(`Are you sure you want to remove this question?\n\n"${text}"`)) {
      SurveyQuestionsStore.deleteQuestion(id);
      loadQuestions();
    }
  };

  const handleReorder = (id: string, dir: 'up' | 'down') => {
    SurveyQuestionsStore.reorderQuestion(id, dir);
    loadQuestions();
  };

  const handleDuplicate = (id: string) => {
    SurveyQuestionsStore.duplicateQuestion(id);
    loadQuestions();
  };

  const handleResetDefaults = () => {
    if (window.confirm(`Reset ${selectedSurveyType === 'community' ? 'Community' : 'Frontline'} survey questions to recommended defaults? Any custom questions for this survey will be overwritten.`)) {
      SurveyQuestionsStore.resetToDefaults(selectedSurveyType);
      loadQuestions();
    }
  };

  const handleCopyExport = () => {
    const text = SurveyQuestionsStore.exportAsGoogleFormsGuide(selectedSurveyType);
    navigator.clipboard.writeText(text);
    setCopiedNotification('Questions guide copied to clipboard!');
    setTimeout(() => setCopiedNotification(null), 4000);
  };

  return (
    <div className="space-y-8">
      {/* Top Header & Survey Type Switcher */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-800 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5 flex-wrap">
            <div className="w-9 h-9 rounded-xl bg-amber-400/20 border border-amber-400/30 flex items-center justify-center text-amber-400">
              <Layers className="w-5 h-5" />
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
              Survey Question Builder & Editor
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-400/20 text-amber-300 border border-amber-400/40">
              {questions.length} Live Questions
            </span>
          </div>
          <p className="text-xs text-stone-400">
            Add new questions, rewrite wording, reorder, or choose between Multiple Choice, Checkboxes, and Written Answers.
          </p>
        </div>

        {/* Survey Type Selector Tabs */}
        <div className="flex items-center gap-2 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800 self-start md:self-auto">
          <button
            type="button"
            onClick={() => {
              setSelectedSurveyType('community');
              setSelectedCategory('all');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
              selectedSurveyType === 'community'
                ? 'bg-amber-400 text-slate-950 shadow-md'
                : 'text-stone-400 hover:text-white'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Community Survey</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setSelectedSurveyType('professional');
              setSelectedCategory('all');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
              selectedSurveyType === 'professional'
                ? 'bg-sky-400 text-slate-950 shadow-md'
                : 'text-stone-400 hover:text-white'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Frontline / Agency Survey</span>
          </button>
        </div>
      </div>

      {/* Action Bar & Category Filter */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-bold text-stone-400 flex items-center gap-1">
            <ListFilter className="w-3.5 h-3.5" />
            Filter by Category:
          </span>
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40'
                : 'bg-slate-800 text-stone-400 hover:text-stone-200'
            }`}
          >
            All Categories ({questions.length})
          </button>
          {categories.map((cat) => {
            const count = questions.filter((q) => q.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40'
                    : 'bg-slate-800 text-stone-400 hover:text-stone-200'
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
          <button
            type="button"
            onClick={handleCopyExport}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-stone-200 font-bold text-xs flex items-center gap-1.5 border border-slate-700 transition-all cursor-pointer"
            title="Copy all questions formatted for Google Forms"
          >
            <Share2 className="w-3.5 h-3.5 text-amber-400" />
            <span>Copy for Google Forms</span>
          </button>

          <button
            type="button"
            onClick={handleResetDefaults}
            className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-stone-400 hover:text-stone-200 font-bold text-xs flex items-center gap-1.5 border border-slate-700 transition-all cursor-pointer"
            title="Reset to recommended default NL questions"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>

          <button
            type="button"
            onClick={handleOpenCreate}
            className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-md cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Question</span>
          </button>
        </div>
      </div>

      {copiedNotification && (
        <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/50 text-emerald-200 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{copiedNotification}</span>
        </div>
      )}

      {/* Questions List */}
      <div className="space-y-4">
        {filteredQuestions.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-slate-900/50 border border-dashed border-slate-800 space-y-3">
            <Layers className="w-12 h-12 text-stone-600 mx-auto" />
            <h3 className="text-base font-bold text-white">No questions found in this category</h3>
            <p className="text-xs text-stone-400">Click "+ Add New Question" to create your first question.</p>
            <button
              onClick={handleOpenCreate}
              className="mt-2 px-4 py-2 rounded-xl bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider"
            >
              Add Question
            </button>
          </div>
        ) : (
          filteredQuestions.map((q, idx) => {
            const TypeIcon = QUESTION_TYPE_LABELS[q.type]?.icon || Radio;
            const typeLabel = QUESTION_TYPE_LABELS[q.type]?.label || q.type;

            return (
              <div
                key={q.id}
                className="p-5 sm:p-6 rounded-2xl bg-[#0e1422] border border-slate-800 hover:border-slate-700 transition-all space-y-4 shadow-md group"
              >
                {/* Header: Order, Category, Type, Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="w-7 h-7 rounded-lg bg-amber-400/10 border border-amber-400/30 text-amber-400 font-mono font-bold text-xs flex items-center justify-center">
                      Q{q.order}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-md bg-slate-800 text-stone-300 text-[11px] font-bold border border-slate-700">
                      {q.category}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-sky-950/60 text-sky-300 text-[11px] font-semibold border border-sky-800/50">
                      <TypeIcon className="w-3 h-3 text-sky-400" />
                      <span>{typeLabel}</span>
                    </span>
                    {q.required && (
                      <span className="px-2 py-0.5 rounded-md bg-rose-950/60 text-rose-300 text-[10px] font-bold border border-rose-800/40">
                        Required
                      </span>
                    )}
                  </div>

                  {/* Question Controls */}
                  <div className="flex items-center gap-1.5 self-end sm:self-auto">
                    <button
                      onClick={() => handleReorder(q.id, 'up')}
                      disabled={q.order === 1}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-stone-300 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                      title="Move Question Up"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleReorder(q.id, 'down')}
                      disabled={q.order === questions.length}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-stone-300 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                      title="Move Question Down"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDuplicate(q.id)}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-stone-300 transition-all"
                      title="Duplicate Question"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleOpenEdit(q)}
                      className="px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center gap-1 transition-all"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDelete(q.id, q.question)}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-900/60 text-rose-400 transition-all"
                      title="Delete Question"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Question Body */}
                <div className="space-y-2">
                  <h4 className="text-base font-bold text-white leading-snug">
                    {q.question}
                  </h4>
                  {q.helpText && (
                    <p className="text-xs text-stone-400 italic">
                      {q.helpText}
                    </p>
                  )}
                </div>

                {/* Options Preview for Multiple Choice & Checkboxes */}
                {(q.type === 'multiple_choice' || q.type === 'checkboxes' || q.type === 'dropdown') && (
                  <div className="pt-2">
                    <div className="text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-2">
                      Answer Choices ({q.options.length}):
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                      {q.options.map((opt, oIdx) => (
                        <div
                          key={oIdx}
                          className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-stone-300 flex items-center gap-2"
                        >
                          {q.type === 'multiple_choice' && <div className="w-3 h-3 rounded-full border border-stone-500 shrink-0" />}
                          {q.type === 'checkboxes' && <div className="w-3 h-3 rounded-sm border border-stone-500 shrink-0" />}
                          {q.type === 'dropdown' && <span className="text-stone-500 text-[10px]">{oIdx + 1}.</span>}
                          <span className="truncate">{opt}</span>
                        </div>
                      ))}
                      {q.allowOther && (
                        <div className="px-3 py-1.5 rounded-xl bg-slate-950 border border-dashed border-amber-400/40 text-xs text-amber-300 flex items-center gap-2">
                          <span>+ Other (Please specify)</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Text Input Preview */}
                {q.type === 'text' && (
                  <div className="p-3 rounded-xl bg-slate-950 border border-dashed border-slate-800 text-xs text-stone-500 italic">
                    {q.placeholder || 'Respondent types text answer here...'}
                  </div>
                )}

                {/* Rating Preview */}
                {q.type === 'rating' && (
                  <div className="flex items-center gap-2 text-xs text-amber-400">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <div key={star} className="w-7 h-7 rounded-lg bg-slate-950 border border-amber-400/30 flex items-center justify-center font-bold">
                          {star}
                        </div>
                      ))}
                    </div>
                    <span className="text-[11px] text-stone-400 ml-2">(1 = Poor / Disagree, 5 = Excellent / Strongly Agree)</span>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* ================================================================= */}
      {/* MODAL: ADD / EDIT QUESTION */}
      {/* ================================================================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-2xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden text-slate-100">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/70">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-400/20 border border-amber-400/30 flex items-center justify-center text-amber-400">
                  {editingQuestionId ? <Edit2 className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </div>
                <div>
                  <h3 className="text-base font-black text-white uppercase tracking-tight">
                    {editingQuestionId ? 'Edit Survey Question' : 'Add New Survey Question'}
                  </h3>
                  <p className="text-xs text-stone-400">
                    Target Survey: {selectedSurveyType === 'community' ? 'Community Survey' : 'Frontline / Professional'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-stone-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveQuestion} className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Question Text */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-white uppercase tracking-wider">
                  Question Text <span className="text-amber-400">*</span>
                </label>
                <textarea
                  required
                  rows={2}
                  value={formQuestion}
                  onChange={(e) => setFormQuestion(e.target.value)}
                  placeholder="e.g. Which community services have been hardest to access in your neighbourhood?"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* Category & Required Switch */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-stone-300">
                    Category Tag
                  </label>
                  <input
                    type="text"
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    placeholder="e.g. Housing, Food Security, Mental Health"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                  <div className="flex flex-wrap gap-1 mt-1">
                    {POPULAR_COMMUNITY_CATEGORIES.slice(0, 4).map((c) => (
                      <button
                        type="button"
                        key={c}
                        onClick={() => setFormCategory(c)}
                        className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-stone-400 hover:text-white"
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-stone-300">
                    Help Text / Subtitle (Optional)
                  </label>
                  <input
                    type="text"
                    value={formHelpText}
                    onChange={(e) => setFormHelpText(e.target.value)}
                    placeholder="e.g. Select all that apply to your household"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Question Type Selection */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-white uppercase tracking-wider">
                  Select Question Type:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {(Object.keys(QUESTION_TYPE_LABELS) as QuestionType[]).map((t) => {
                    const info = QUESTION_TYPE_LABELS[t];
                    const Icon = info.icon;
                    const isSelected = formType === t;

                    return (
                      <button
                        type="button"
                        key={t}
                        onClick={() => setFormType(t)}
                        className={`p-3 rounded-xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-amber-400/15 border-amber-400 text-white shadow-sm'
                            : 'bg-slate-950/60 border-slate-800 text-stone-400 hover:border-slate-700'
                        }`}
                      >
                        <div className={`p-2 rounded-lg ${isSelected ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-stone-400'}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white">{info.label}</div>
                          <div className="text-[11px] text-stone-400 leading-tight mt-0.5">{info.description}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Options Editor (For Multiple Choice, Checkboxes, Dropdown) */}
              {(formType === 'multiple_choice' || formType === 'checkboxes' || formType === 'dropdown') && (
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-white uppercase tracking-wider">
                      Answer Options ({formOptions.length})
                    </label>
                    <label className="flex items-center gap-2 text-xs text-amber-300 font-semibold cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formAllowOther}
                        onChange={(e) => setFormAllowOther(e.target.checked)}
                        className="rounded accent-amber-400"
                      />
                      <span>Include "Other (Please specify)"</span>
                    </label>
                  </div>

                  {/* Options List */}
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                    {formOptions.map((opt, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <span className="text-xs font-mono text-stone-500 w-5">{i + 1}.</span>
                        <input
                          type="text"
                          value={opt}
                          onChange={(e) => handleOptionChange(i, e.target.value)}
                          className="flex-1 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-400"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveOption(i)}
                          className="p-1.5 text-stone-500 hover:text-rose-400 rounded-lg hover:bg-slate-800"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Add Option Input */}
                  <div className="flex items-center gap-2 pt-2 border-t border-slate-800">
                    <input
                      type="text"
                      value={formNewOptionInput}
                      onChange={(e) => setFormNewOptionInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddOption();
                        }
                      }}
                      placeholder="Type an option and press Add..."
                      className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                    <button
                      type="button"
                      onClick={handleAddOption}
                      className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold cursor-pointer"
                    >
                      Add Option
                    </button>
                  </div>
                </div>
              )}

              {/* Text Input Configuration */}
              {formType === 'text' && (
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-stone-300">
                    Placeholder Hint Text (Optional)
                  </label>
                  <input
                    type="text"
                    value={formPlaceholder}
                    onChange={(e) => setFormPlaceholder(e.target.value)}
                    placeholder="e.g. Type your response in detail..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              )}

              {/* Required Toggle */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <div>
                  <div className="text-xs font-bold text-white">Require Respondent to Answer</div>
                  <div className="text-[11px] text-stone-400">Users cannot submit survey without answering this question.</div>
                </div>
                <input
                  type="checkbox"
                  checked={formRequired}
                  onChange={(e) => setFormRequired(e.target.checked)}
                  className="w-4 h-4 rounded accent-amber-400 cursor-pointer"
                />
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-stone-300 text-xs font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <Save className="w-4 h-4" />
                  <span>{editingQuestionId ? 'Save Changes' : 'Create Question'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
