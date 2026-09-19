// Survey Questions Store
// Allows full dynamic editing, adding, reordering, and deleting of Community & Professional survey questions
// Supports Multiple Choice, Checkboxes, Written Answer, Dropdown, and Rating

export type QuestionType = 'multiple_choice' | 'checkboxes' | 'text' | 'dropdown' | 'rating';

export interface SurveyQuestionItem {
  id: string;
  surveyType: 'community' | 'professional';
  category: string;
  question: string;
  helpText?: string;
  type: QuestionType;
  options: string[];
  allowOther?: boolean;
  required: boolean;
  order: number;
  placeholder?: string;
}

const STORAGE_KEY = 'ftg_custom_survey_questions_v1';

// Default Comprehensive Question Set for Community Survey in Newfoundland & Labrador
export const DEFAULT_COMMUNITY_QUESTIONS: SurveyQuestionItem[] = [
  {
    id: 'comm_q1',
    surveyType: 'community',
    category: 'Location & Eligibility',
    question: 'Where do you currently reside in Newfoundland & Labrador?',
    helpText: 'Helps us map regional service disparities across the Avalon and province.',
    type: 'dropdown',
    options: [
      "St. John's (Downtown / Central)",
      "St. John's (East End / Torbay Rd)",
      "St. John's (West End / Shea Heights)",
      'Mount Pearl',
      'Conception Bay South (CBS)',
      'Paradise',
      'Portugal Cove - St. Philip\'s / Torbay',
      'Southern Shore / Bay Bulls / Witless Bay',
      'Conception Bay North / Carbonear',
      'Clarenville / Bonavista Peninsula',
      'Central Newfoundland (Gander, Grand Falls-Windsor)',
      'Western Newfoundland (Corner Brook, Stephenville)',
      'Labrador (Happy Valley-Goose Bay, Labrador West, Coast)',
      'Other area in NL'
    ],
    required: true,
    order: 1,
  },
  {
    id: 'comm_q2',
    surveyType: 'community',
    category: 'Primary Gaps',
    question: 'Which community services or essential supports have you or someone you know struggled to access?',
    helpText: 'Select all areas where you have experienced service shortages or long wait times.',
    type: 'checkboxes',
    options: [
      'Affordable & Safe Housing / Emergency Shelter',
      'Emergency Food Support / Food Banks / Hot Meals',
      'Mental Health Counselling & Crisis Care',
      'Addiction Treatment & Harm Reduction Services',
      'Affordable Public Transportation & Transit Routes',
      'Family & Childcare Support / After-School Care',
      'Senior Services & Elder Care',
      'Employment Services & Job Training',
      'Legal Aid & System Navigation Assistance',
      'Dental, Vision & Specialized Healthcare',
      'Youth Drop-in Spaces & Mentorship'
    ],
    allowOther: true,
    required: true,
    order: 2,
  },
  {
    id: 'comm_q3',
    surveyType: 'community',
    category: 'System Experience',
    question: 'Have you ever been referred between multiple organizations without receiving the help you actually needed?',
    helpText: 'Also known as the "runaround" or service referral loop.',
    type: 'multiple_choice',
    options: [
      'Yes, frequently (sent from agency to agency with no resolution)',
      'Yes, once or twice',
      'No, the referral process worked smoothly',
      'I have never reached out for service referrals'
    ],
    required: true,
    order: 3,
  },
  {
    id: 'comm_q4',
    surveyType: 'community',
    category: 'Housing & Cost of Living',
    question: 'How would you rate the affordability and availability of housing in your area?',
    type: 'multiple_choice',
    options: [
      'Critical Crisis — Severe shortage, completely unaffordable',
      'Poor — Very difficult to find decent housing',
      'Moderate — Manageable but stressful',
      'Good — Adequate options available',
      'Unsure / Not applicable'
    ],
    required: true,
    order: 4,
  },
  {
    id: 'comm_q5',
    surveyType: 'community',
    category: 'Systemic Barriers',
    question: 'What are the main barriers that make accessing support difficult?',
    type: 'checkboxes',
    options: [
      'Long waitlists (months or years for intake)',
      'Strict eligibility requirements / income thresholds',
      'Lack of transportation to appointments / offices',
      'Limited hours of operation (no evenings or weekends)',
      'Complicated paperwork and digital-only applications',
      'Stigma, discrimination, or fear of judgment',
      'Services are siloed and don\'t communicate with each other'
    ],
    allowOther: true,
    required: false,
    order: 5,
  },
  {
    id: 'comm_q6',
    surveyType: 'community',
    category: 'Community Vision',
    question: 'If you could create ONE new service or facility in our community tomorrow, what would it be?',
    helpText: 'Your boldest idea for making St. John\'s & NL stronger.',
    type: 'text',
    options: [],
    placeholder: 'e.g., A 24/7 central community resource hub with hot meals, walk-in mental health care, and transit vouchers under one roof...',
    required: true,
    order: 6,
  },
  {
    id: 'comm_q7',
    surveyType: 'community',
    category: 'Open Feedback',
    question: 'Is there anything else you would like community leaders, service providers, or organizers to understand about daily life here?',
    type: 'text',
    options: [],
    placeholder: 'Share your lived experience, suggestions, or words of encouragement...',
    required: false,
    order: 7,
  }
];

// Default Comprehensive Question Set for Frontline / Professional Survey
export const DEFAULT_PROFESSIONAL_QUESTIONS: SurveyQuestionItem[] = [
  {
    id: 'prof_q1',
    surveyType: 'professional',
    category: 'Organization Profile',
    question: 'What sector or type of service does your organization or agency provide?',
    type: 'multiple_choice',
    options: [
      'Non-Profit / Community-Based Agency',
      'Government / Municipal / Provincial Department',
      'Healthcare / Hospital / Primary Care Clinic',
      'Emergency Shelter / Supportive Housing Provider',
      'Food Bank / Meal Program / Food Security',
      'Mental Health & Addictions Facility',
      'Youth & Family Services',
      'Legal Aid / Advocacy / Social Justice',
      'Academic / Policy Research Institution',
      'Other'
    ],
    required: true,
    order: 1,
  },
  {
    id: 'prof_q2',
    surveyType: 'professional',
    category: 'Client Capacity',
    question: 'What is the current demand for your services compared to your operational capacity?',
    type: 'multiple_choice',
    options: [
      'Over Capacity (Turning clients away daily or massive waitlists)',
      'At Maximum Capacity (Operating at 100% with no margin)',
      'Manageable Capacity (Meeting current client volume)',
      'Under Capacity (Could take on additional clients)'
    ],
    required: true,
    order: 2,
  },
  {
    id: 'prof_q3',
    surveyType: 'professional',
    category: 'Inter-Agency Coordination',
    question: 'What are the biggest systemic bottlenecks in cross-agency referrals in Newfoundland & Labrador?',
    type: 'checkboxes',
    options: [
      'Lack of a unified, real-time shared referral directory',
      'Conflicting intake criteria between municipal and provincial agencies',
      'Data privacy & privacy legislation barriers preventing warm handoffs',
      'Client discharge from acute care into homelessness without transition plans',
      'Inconsistent hours and lack of evening / weekend triage availability',
      'Staff burnout and high turnover in frontline caseworkers'
    ],
    allowOther: true,
    required: true,
    order: 3,
  },
  {
    id: 'prof_q4',
    surveyType: 'professional',
    category: 'Systemic Gaps',
    question: 'Which specific client demographics are falling through the cracks most severely?',
    type: 'checkboxes',
    options: [
      'Youth transitioning out of foster care / aging out (18-24)',
      'Individuals with concurrent disorders (active addiction + severe mental illness)',
      'Seniors living on fixed OAS/GIS incomes facing renovictions',
      'Single parents with multiple young children',
      'Indigenous individuals relocating from remote/coastal communities',
      'Newcomers, refugees, and temporary foreign workers without MSI coverage',
      'People with physical mobility challenges in non-accessible housing'
    ],
    allowOther: true,
    required: true,
    order: 4,
  },
  {
    id: 'prof_q5',
    surveyType: 'professional',
    category: 'Collaborative Solutions',
    question: 'What collaborative platform or shared infrastructure would most improve your organization\'s ability to deliver impact?',
    type: 'text',
    options: [],
    placeholder: 'e.g., A shared bed-availability dashboard, weekly multi-agency case conference rounds, co-located emergency intake hub...',
    required: true,
    order: 5,
  }
];

export class SurveyQuestionsStore {
  private static loadAll(): SurveyQuestionItem[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Error reading custom survey questions:', e);
    }
    // Default fallback
    const defaults = [...DEFAULT_COMMUNITY_QUESTIONS, ...DEFAULT_PROFESSIONAL_QUESTIONS];
    this.saveAll(defaults);
    return defaults;
  }

  private static saveAll(items: SurveyQuestionItem[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('ftg_survey_questions_updated', { detail: items }));
      }
    } catch (e) {
      console.error('Failed to save survey questions:', e);
    }
  }

  static getQuestions(surveyType?: 'community' | 'professional'): SurveyQuestionItem[] {
    const all = this.loadAll();
    const filtered = surveyType ? all.filter((q) => q.surveyType === surveyType) : all;
    return filtered.sort((a, b) => a.order - b.order);
  }

  static getQuestionById(id: string): SurveyQuestionItem | undefined {
    return this.loadAll().find((q) => q.id === id);
  }

  static addQuestion(item: Omit<SurveyQuestionItem, 'id' | 'order'>): SurveyQuestionItem {
    const all = this.loadAll();
    const sameType = all.filter((q) => q.surveyType === item.surveyType);
    const maxOrder = sameType.reduce((max, q) => Math.max(max, q.order || 0), 0);

    const newQuestion: SurveyQuestionItem = {
      ...item,
      id: `q_${item.surveyType}_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      order: maxOrder + 1,
      options: item.options || [],
    };

    all.push(newQuestion);
    this.saveAll(all);
    return newQuestion;
  }

  static updateQuestion(id: string, updates: Partial<SurveyQuestionItem>): SurveyQuestionItem | null {
    const all = this.loadAll();
    const idx = all.findIndex((q) => q.id === id);
    if (idx === -1) return null;

    all[idx] = { ...all[idx], ...updates };
    this.saveAll(all);
    return all[idx];
  }

  static deleteQuestion(id: string): boolean {
    const all = this.loadAll();
    const target = all.find((q) => q.id === id);
    if (!target) return false;

    const filtered = all.filter((q) => q.id !== id);
    // Renumber remaining questions of same survey type
    let orderCounter = 1;
    filtered.forEach((q) => {
      if (q.surveyType === target.surveyType) {
        q.order = orderCounter++;
      }
    });

    this.saveAll(filtered);
    return true;
  }

  static reorderQuestion(id: string, direction: 'up' | 'down'): boolean {
    const all = this.loadAll();
    const target = all.find((q) => q.id === id);
    if (!target) return false;

    const sameType = all.filter((q) => q.surveyType === target.surveyType).sort((a, b) => a.order - b.order);
    const currIdx = sameType.findIndex((q) => q.id === id);

    if (direction === 'up' && currIdx > 0) {
      const prev = sameType[currIdx - 1];
      const tempOrder = target.order;
      target.order = prev.order;
      prev.order = tempOrder;
    } else if (direction === 'down' && currIdx < sameType.length - 1) {
      const next = sameType[currIdx + 1];
      const tempOrder = target.order;
      target.order = next.order;
      next.order = tempOrder;
    } else {
      return false;
    }

    this.saveAll(all);
    return true;
  }

  static duplicateQuestion(id: string): SurveyQuestionItem | null {
    const original = this.getQuestionById(id);
    if (!original) return null;

    return this.addQuestion({
      surveyType: original.surveyType,
      category: original.category,
      question: `${original.question} (Copy)`,
      helpText: original.helpText,
      type: original.type,
      options: [...original.options],
      allowOther: original.allowOther,
      required: original.required,
      placeholder: original.placeholder,
    });
  }

  static resetToDefaults(surveyType?: 'community' | 'professional'): void {
    let all = this.loadAll();
    if (!surveyType || surveyType === 'community') {
      all = all.filter((q) => q.surveyType !== 'community');
      all.push(...DEFAULT_COMMUNITY_QUESTIONS);
    }
    if (!surveyType || surveyType === 'professional') {
      all = all.filter((q) => q.surveyType !== 'professional');
      all.push(...DEFAULT_PROFESSIONAL_QUESTIONS);
    }
    this.saveAll(all);
  }

  static exportAsGoogleFormsGuide(surveyType: 'community' | 'professional'): string {
    const questions = this.getQuestions(surveyType);
    let output = `# ${surveyType === 'community' ? 'Community Voice Survey' : 'Frontline & Agency Survey'}\n\n`;
    output += `Total Questions: ${questions.length}\n`;
    output += `Generated on: ${new Date().toLocaleDateString()}\n\n`;
    output += `---\n\n`;

    questions.forEach((q, idx) => {
      output += `### Q${idx + 1}. [${q.category}] ${q.question}\n`;
      output += `- **Type**: ${q.type === 'multiple_choice' ? 'Multiple Choice (Radio)' : q.type === 'checkboxes' ? 'Checkboxes' : q.type === 'dropdown' ? 'Dropdown' : 'Paragraph / Short Answer'}\n`;
      output += `- **Required**: ${q.required ? 'Yes' : 'No'}\n`;
      if (q.helpText) output += `- **Description/Hint**: ${q.helpText}\n`;
      if (q.options && q.options.length > 0) {
        output += `- **Options**:\n`;
        q.options.forEach((opt) => {
          output += `  * ${opt}\n`;
        });
        if (q.allowOther) {
          output += `  * Other (Add "Other" text field)\n`;
        }
      }
      output += `\n`;
    });

    return output;
  }
}
