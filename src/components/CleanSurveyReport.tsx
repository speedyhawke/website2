import React, { useState, useMemo } from 'react';
import {
  AdminStore,
  CommunitySurveyResponse,
  ProfessionalSurveyResponse,
} from '../data/adminStore';
import {
  FileText,
  Search,
  Download,
  Filter,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  BarChart3,
  Printer,
  Users,
  Briefcase,
  Copy,
  Check,
  RefreshCw,
  Info,
  Upload,
  ExternalLink,
} from 'lucide-react';

interface CleanSurveyReportProps {
  communitySurveys: CommunitySurveyResponse[];
  professionalSurveys: ProfessionalSurveyResponse[];
  onExportCsv: (type: 'community' | 'professional') => void;
}

interface QuestionDef {
  id: string;
  field: string;
  title: string;
  section: string;
  type: 'single' | 'multi' | 'scale' | 'text';
  options?: string[];
}

// Definition of Community Questions (Q1 to Q46)
const COMMUNITY_QUESTIONS: QuestionDef[] = [
  { id: 'Q1', field: 'q1', title: 'What is your connection to Newfoundland & Labrador?', section: 'Section 1: About You & Your Community', type: 'single', options: ['Born and raised here', 'Living here now (moved from elsewhere)', 'Lived here previously', 'Regular visitor', 'Other'] },
  { id: 'Q2', field: 'q2', title: 'What area of Newfoundland & Labrador do you live in?', section: 'Section 1: About You & Your Community', type: 'single', options: ["St. John's Metro Area (Mount Pearl, Paradise, CBS, Torbay, Portugal Cove-St. Philip's)", 'Conception Bay North (Carbonear, Harbour Grace, Bay Roberts)', 'Avalon Peninsula (outside metro & CBN)', 'Burin Peninsula (Marystown, Grand Bank, St. Lawrence)', 'Bonavista Peninsula & Clarenville Area', 'Central Newfoundland (Gander, Grand Falls-Windsor, Lewisporte)', 'Western Newfoundland (Corner Brook, Deer Lake, Stephenville)', 'Northern Peninsula & Southern Labrador Coast', 'Labrador (Happy Valley-Goose Bay, Labrador West, Coast)', 'Prefer not to say', 'Other'] },
  { id: 'Q3', field: 'q3', title: 'What age group do you belong to?', section: 'Section 1: About You & Your Community', type: 'single', options: ['Under 18', '18–24', '25–34', '35–44', '45–54', '55–64', '65+', 'Prefer not to say'] },
  { id: 'Q4', field: 'q4', title: 'Which of the following best describes your household?', section: 'Section 1: About You & Your Community', type: 'single', options: ['Single adult living alone', 'Single parent with children', 'Couple without children', 'Couple with children', 'Multi-generational household', 'Living with roommates or extended family', 'Prefer not to say', 'Other'] },
  { id: 'Q5', field: 'q5', title: 'Do you feel you have someone to turn to when unexpected difficulties arise?', section: 'Section 1: About You & Your Community', type: 'single', options: ['Always', 'Most of the time', 'Sometimes', 'Rarely', 'Never', 'Prefer not to say'] },
  
  { id: 'Q6', field: 'q6', title: 'Have you needed help or support in the past 5 years?', section: 'Section 2: Finding Help', type: 'single', options: ['Yes', 'No', 'Prefer not to say'] },
  { id: 'Q7', field: 'q7', title: 'What types of help did you look for?', section: 'Section 2: Finding Help', type: 'multi', options: ['Housing or rent assistance', 'Food or basic essentials', 'Mental health or counselling', 'Addiction or recovery support', 'Healthcare or medical travel', 'Emergency financial assistance', 'Employment or job training', 'Legal or advocacy support', 'Disability support services', 'Senior or elder care', 'Child or youth services', 'Transportation', 'Other'] },
  { id: 'Q8', field: 'q8', title: 'How easy was it to figure out where to go for help?', section: 'Section 2: Finding Help', type: 'single', options: ['Very easy', 'Somewhat easy', 'Neither easy nor difficult', 'Somewhat difficult', 'Very difficult', 'Not applicable'] },
  { id: 'Q9', field: 'q9', title: 'How many different organizations did you contact before finding the right help?', section: 'Section 2: Finding Help', type: 'single', options: ['1 organization', '2 to 3 organizations', '4 to 5 organizations', '6 or more organizations', 'Never found the right help', 'Not applicable'] },
  { id: 'Q10', field: 'q10', title: 'Were you ever referred from one place to another without receiving direct help?', section: 'Section 2: Finding Help', type: 'single', options: ['Never', 'Once or twice', 'Multiple times', 'Frequently / almost every time', 'Not applicable'] },
  { id: 'Q11', field: 'q11', title: 'How difficult was it to figure out who is responsible for providing the service?', section: 'Section 2: Finding Help', type: 'single', options: ['Very easy', 'Somewhat easy', 'Neutral', 'Somewhat difficult', 'Very difficult', 'Not applicable'] },
  
  { id: 'Q12', field: 'q12', title: 'What barriers did you experience when trying to access help?', section: 'Section 3: Systemic Barriers', type: 'multi', options: ['Long waitlists or delays', 'Strict eligibility requirements', 'Too much paperwork or complicated forms', 'Lack of transportation', 'Services not available in my area', 'Not knowing what was available', 'Cost or fees', 'Limited hours of operation', 'Stigma, shame, or fear of judgment', 'Lack of follow-through from services', 'Technology or internet barriers', 'None / Not applicable', 'Other'] },
  { id: 'Q13', field: 'q13', title: 'Which 3 barriers had the biggest impact on you or your family?', section: 'Section 3: Systemic Barriers', type: 'multi' },
  { id: 'Q14', field: 'q14', title: 'Have you ever given up trying to get help because the process was too overwhelming?', section: 'Section 3: Systemic Barriers', type: 'single', options: ['Yes', 'No', 'Prefer not to say'] },
  { id: 'Q15', field: 'q15', title: 'If you feel comfortable sharing, what happened when you gave up?', section: 'Section 3: Systemic Barriers', type: 'text' },
  
  { id: 'Q16', field: 'q16', title: 'How easy is it to find clear, accurate information about community programs in NL?', section: 'Section 4: Information & Resources', type: 'single', options: ['Very easy', 'Somewhat easy', 'Neither easy nor difficult', 'Somewhat difficult', 'Very difficult', 'Not sure'] },
  { id: 'Q17', field: 'q17', title: 'Where do you typically look for information when you need help?', section: 'Section 4: Information & Resources', type: 'multi', options: ['Google search', 'Facebook or social media', 'Word of mouth (friends, family)', 'Calling 211 / 811', 'Community centres or libraries', 'Doctor or health professional', 'Government websites', 'Church or faith community', 'Other'] },
  { id: 'Q18', field: 'q18', title: 'Have you ever found information online that turned out to be outdated, incorrect, or disconnected?', section: 'Section 4: Information & Resources', type: 'single', options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Very often'] },
  { id: 'Q19', field: 'q19', title: 'What would make finding community resources easier for you and your family?', section: 'Section 4: Information & Resources', type: 'multi', options: ['A single searchable website with verified info', 'A physical directory / guide in local libraries', 'A real person to talk to / navigator', 'Clear eligibility checklists upfront', 'Step-by-step application guides', 'Mobile-friendly app', 'Regularly updated program hours & phone numbers', 'Other'] },
  
  { id: 'Q20', field: 'q20', title: 'Have you ever needed a service where your situation did not fit neatly into eligibility rules?', section: 'Section 5: Gaps Between Services', type: 'single', options: ['Yes', 'No', 'Not sure', 'Prefer not to say'] },
  { id: 'Q21', field: 'q21', title: 'What made your situation a poor fit for existing rules?', section: 'Section 5: Gaps Between Services', type: 'multi', options: ['Income slightly too high for threshold', 'Age did not match criteria', 'Diagnosis or condition not covered', 'Live just outside service boundary', 'Needed help between scheduled appointment dates', 'Multiple intersecting needs that no single agency handled', 'Other'] },
  { id: 'Q22', field: 'q22', title: 'Have you ever needed help with something where no organization existed for it?', section: 'Section 5: Gaps Between Services', type: 'single', options: ['Yes', 'No', 'Not sure'] },
  { id: 'Q23', field: 'q23', title: 'Can you describe what kind of help was missing?', section: 'Section 5: Gaps Between Services', type: 'text' },
  
  { id: 'Q24', field: 'q24', title: 'How important is having someone in your corner to help navigate difficulties? (1-5 Stars)', section: 'Section 6: Advocates & Navigators', type: 'scale' },
  { id: 'Q25', field: 'q25', title: 'What happens to people in NL who do not have someone in their corner?', section: 'Section 6: Advocates & Navigators', type: 'multi', options: ['Fall through cracks completely', 'Give up on getting help', 'Issues become medical or crisis emergencies', 'Financial debt and housing loss', 'Isolation and severe mental health strain', 'Rely solely on emergency rooms or police', 'Other'] },
  { id: 'Q26', field: 'q26', title: 'Have you ever acted as an informal navigator or helper for family, friends, or neighbors?', section: 'Section 6: Advocates & Navigators', type: 'single', options: ['Yes, frequently', 'Yes, a few times', 'No', 'Prefer not to say'] },
  { id: 'Q27', field: 'q27', title: 'What kinds of things did you help them with?', section: 'Section 6: Advocates & Navigators', type: 'multi', options: ['Filling out complicated government paperwork', 'Making phone calls on their behalf', 'Driving them to appointments', 'Researching programs and eligibility', 'Providing emergency funds or groceries', 'Emotional support and checking in', 'Other'] },
  { id: 'Q28', field: 'q28', title: 'How difficult was it for you to figure out what to do for that person?', section: 'Section 6: Advocates & Navigators', type: 'single', options: ['Very easy', 'Somewhat easy', 'Moderate', 'Difficult', 'Very stressful / exhausting', 'Not applicable'] },
  
  { id: 'Q29', field: 'q29', title: 'What forms of community support would make the biggest difference in everyday NL life?', section: 'Section 7: Solutions & What Works', type: 'multi', options: ['Free personalized navigation support', 'Emergency micro-grants for immediate crises', 'Rural transportation vouchers / rides', 'Community meals and open gathering spaces', 'Simplified single-application portal', 'Peer support groups and mentors', 'Other'] },
  { id: 'Q30', field: 'q30', title: 'If you could make ONE thing easier about getting help in NL, what would it be?', section: 'Section 7: Solutions & What Works', type: 'text' },
  { id: 'Q31', field: 'q31', title: 'What is one community problem you feel is frequently ignored or overlooked?', section: 'Section 7: Solutions & What Works', type: 'text' },
  { id: 'Q32', field: 'q32', title: 'What is one small change that could make a meaningful difference for local families?', section: 'Section 7: Solutions & What Works', type: 'text' },
  
  { id: 'Q33', field: 'q33', title: 'Which areas deserve the most urgent attention across Newfoundland & Labrador?', section: 'Section 8: Community Priorities', type: 'multi', options: ['Housing affordability & homelessness', 'Food security & grocery access', 'Mental health & addictions support', 'Healthcare access & medical travel', 'Senior care & aging in place', 'Youth programs & recreation', 'Rural transportation', 'Employment & living wage jobs', 'Other'] },
  { id: 'Q34', field: 'q34', title: 'Which ONE area is the single most urgent top priority for your community?', section: 'Section 8: Community Priorities', type: 'single' },
  { id: 'Q35', field: 'q35', title: 'Why is this area so crucial right now?', section: 'Section 8: Community Priorities', type: 'text' },
  
  { id: 'Q36', field: 'q36', title: 'What should a new community organization like Fill The Gap focus on learning first?', section: 'Section 9: Building Fill The Gap', type: 'text' },
  { id: 'Q37', field: 'q37', title: 'What would make you trust Fill The Gap to do good work in your community?', section: 'Section 9: Building Fill The Gap', type: 'multi', options: ['100% financial transparency and open books', 'Local presence and community town halls', 'Direct assistance without red tape', 'Working with existing charities rather than competing', 'Clear measurement and publicly reported results', 'Compassionate, non-judgmental staff', 'Other'] },
  { id: 'Q38', field: 'q38', title: 'What would make you lose trust in a new community organization?', section: 'Section 9: Building Fill The Gap', type: 'text' },
  { id: 'Q39', field: 'q39', title: 'How should Fill The Gap decide which programs and gaps to work on?', section: 'Section 9: Building Fill The Gap', type: 'multi', options: ['Direct feedback from people with lived experience', 'Data from frontline social workers & charities', 'Open community votes and surveys', 'Independent community advisory board', 'Partnerships with existing local shelters & food banks', 'Other'] },
  
  { id: 'Q40', field: 'q40', title: 'Do you have a personal story or experience of falling through the cracks you would like to share?', section: 'Section 10: Stories & Lived Experience', type: 'text' },
  { id: 'Q41', field: 'q41', title: 'What is something you wish someone had told you when you were going through a difficult time?', section: 'Section 10: Stories & Lived Experience', type: 'text' },
  { id: 'Q42', field: 'q42', title: 'What is something you wish existed when you needed help most?', section: 'Section 10: Stories & Lived Experience', type: 'text' },
  
  { id: 'Q43', field: 'q43', title: 'Is there anything else you would like Fill The Gap to know or consider?', section: 'Section 11: Final Thoughts', type: 'text' },
  { id: 'Q44', field: 'q44', title: 'Would you be interested in receiving a copy of the published research results?', section: 'Section 11: Final Thoughts', type: 'single', options: ['Yes', 'No', 'Maybe'] },
  { id: 'Q45', field: 'q45', title: 'How would you prefer to receive the research findings?', section: 'Section 11: Final Thoughts', type: 'single', options: ['Email newsletter summary', 'Public website report download', 'Social media summary', 'Other'] },
  { id: 'Q46', field: 'q46', title: 'Optional Email Address for research updates:', section: 'Section 11: Final Thoughts', type: 'text' },
];

// Definition of Professional Questions (Q1 to Q46)
const PROFESSIONAL_QUESTIONS: QuestionDef[] = [
  { id: 'Q1', field: 'q1', title: 'What general field or sector do you work in?', section: 'Section 1: Professional Background', type: 'single', options: ['Healthcare & Medical Services', 'Mental Health & Addictions', 'Housing, Shelter & Homelessness', 'Food Security & Emergency Relief', 'Social Work & Community Services', 'Legal, Justice & Advocacy', 'Education & Youth Development', 'Senior Care & Elder Services', 'Government / Public Sector', 'Other'] },
  { id: 'Q2', field: 'q2', title: 'How long have you worked or volunteered in this field in Newfoundland & Labrador?', section: 'Section 1: Professional Background', type: 'single', options: ['Less than 1 year', '1 to 3 years', '4 to 7 years', '8 to 15 years', '15+ years'] },
  { id: 'Q3', field: 'q3', title: 'Which best describes your primary professional role?', section: 'Section 1: Professional Background', type: 'single', options: ['Frontline Worker / Case Manager / Navigator', 'Direct Support Provider / Clinician / Counselor', 'Executive Director / Senior Leadership', 'Program Coordinator / Manager', 'Volunteer / Community Advocate', 'Policy Analyst / Researcher', 'Other'] },
  { id: 'Q4', field: 'q4', title: 'What geographic area does your work primarily serve?', section: 'Section 1: Professional Background', type: 'single', options: ["St. John's Metro Area", 'Conception Bay North & Avalon', 'Burin Peninsula', 'Central Newfoundland', 'Western Newfoundland', 'Northern Peninsula & Southern Labrador', 'Labrador (Happy Valley-Goose Bay, Coast)', 'Province-wide (all of NL)', 'Other'] },

  { id: 'Q5', field: 'q5', title: 'In your day-to-day work, what are the most common areas where people seek support?', section: 'Section 2: What You See on the Frontlines', type: 'multi', options: ['Affordable housing & eviction prevention', 'Emergency food assistance', 'Mental health crisis & ongoing counselling', 'Addiction recovery & harm reduction', 'Income support & financial emergencies', 'Transportation & medical travel', 'Navigating complex government systems', 'Senior care & isolation', 'Legal assistance & tenant rights', 'Childcare & youth support', 'Other'] },
  { id: 'Q6', field: 'q6', title: 'Which areas present the greatest systemic challenges or longest wait times for clients?', section: 'Section 2: What You See on the Frontlines', type: 'multi', options: ['Long-term subsidized housing', 'Specialized mental health services', 'Detox & addiction residential treatment', 'Accessible medical specialists', 'Rural public transportation', 'Affordable legal aid', 'Emergency cash/micro-grants', 'Other'] },
  { id: 'Q7', field: 'q7', title: 'Which ONE single area creates the most severe crisis if left unaddressed?', section: 'Section 2: What You See on the Frontlines', type: 'single' },
  { id: 'Q8', field: 'q8', title: 'How often do you encounter people who have no idea where to start looking for help?', section: 'Section 2: What You See on the Frontlines', type: 'single', options: ['Daily / Constantly', 'Weekly', 'A few times a month', 'Rarely', 'Never'] },
  { id: 'Q9', field: 'q9', title: 'How often do you see clients dealing with 3 or more overlapping challenges at the same time?', section: 'Section 2: What You See on the Frontlines', type: 'single', options: ['Almost all clients (80%+)', 'Majority of clients (50–80%)', 'Some clients (20–50%)', 'Rarely (<20%)'] },

  { id: 'Q10', field: 'q10', title: 'What are the biggest barriers preventing people from accessing existing services?', section: 'Section 3: Systemic Barriers', type: 'multi', options: ['Strict and inflexible eligibility criteria', 'Exhausting paperwork & documentation hurdles', 'Transportation lack across rural NL', 'Months-long waitlists', 'Services operating during 9-5 hours only', 'Stigma, pride, and shame', 'Fragmented systems with no single coordinator', 'Lack of telephone / internet / computer access', 'Other'] },
  { id: 'Q11', field: 'q11', title: 'Which 3 barriers have the highest rate of client burnout or abandonment?', section: 'Section 3: Systemic Barriers', type: 'multi' },
  { id: 'Q12', field: 'q12', title: 'How frequently do you observe clients simply give up trying to navigate the system?', section: 'Section 3: Systemic Barriers', type: 'single', options: ['Very frequently (routine occurrence)', 'Frequently', 'Occasionally', 'Rarely', 'Never'] },
  { id: 'Q13', field: 'q13', title: 'What is the primary trigger that causes clients to give up?', section: 'Section 3: Systemic Barriers', type: 'multi', options: ['Being bounced between 3+ organizations with no help', 'Being told they make $50 too much for assistance', 'Waitlists longer than 6 months', 'Exhausting paperwork with no one to assist', 'Discouraging or dehumanizing interactions', 'Other'] },

  { id: 'Q14', field: 'q14', title: 'How often does your role require referring clients to outside agencies?', section: 'Section 4: Referrals & Navigation', type: 'single', options: ['Daily', 'Several times a week', 'Once a week', 'Occasionally', 'Rarely'] },
  { id: 'Q15', field: 'q15', title: 'How often is it difficult for YOU as a professional to find an appropriate referral destination?', section: 'Section 4: Referrals & Navigation', type: 'single', options: ['Very often / Constantly', 'Often', 'Sometimes', 'Rarely', 'Never'] },
  { id: 'Q16', field: 'q16', title: 'What makes making successful referrals so challenging?', section: 'Section 4: Referrals & Navigation', type: 'multi', options: ['Programs have closed or changed criteria without notice', 'Waitlists are closed to new referrals', 'No agency covers the specific gap', 'Referral forms are excessively complex', 'No warm hand-off (client must restart from scratch)', 'Other'] },
  { id: 'Q17', field: 'q17', title: 'Have you referred a client to a service, only to find out they were turned away?', section: 'Section 4: Referrals & Navigation', type: 'single', options: ['Frequently', 'Sometimes', 'Rarely', 'Never'] },
  { id: 'Q18', field: 'q18', title: 'What typically happens to the client when a referral fails or dead-ends?', section: 'Section 4: Referrals & Navigation', type: 'text' },

  { id: 'Q19', field: 'q19', title: 'How common is it for client situations to fall completely between existing agency mandates?', section: 'Section 5: Gaps Between Services', type: 'single', options: ['Extremely common', 'Common', 'Occasional', 'Rare'] },
  { id: 'Q20', field: 'q20', title: 'What types of needs most frequently fall between organizational cracks?', section: 'Section 5: Gaps Between Services', type: 'multi', options: ['Working poor (income slightly above cutoff)', 'Complex dual diagnosis (mental health + physical disability)', 'Immediate short-term crisis cash ($100-$500)', 'Older adults not yet 65 with high care needs', 'Rural residents needing non-medical transport', 'Youth transitioning out of care (ages 18-24)', 'Other'] },
  { id: 'Q21', field: 'q21', title: 'Do you regularly encounter needs where you know no local service exists in NL?', section: 'Section 5: Gaps Between Services', type: 'single', options: ['Yes, regularly', 'Yes, occasionally', 'No', 'Not sure'] },
  { id: 'Q22', field: 'q22', title: 'Can you describe the most pressing unmet need you encounter?', section: 'Section 5: Gaps Between Services', type: 'text' },

  { id: 'Q23', field: 'q23', title: 'How easy is it for frontline workers in NL to maintain up-to-date knowledge of all programs?', section: 'Section 6: Information & Resource Quality', type: 'single', options: ['Very difficult / Impossible to stay updated', 'Somewhat difficult', 'Neutral', 'Easy', 'Very easy'] },
  { id: 'Q24', field: 'q24', title: 'How often do you encounter outdated or conflicting eligibility guidelines online?', section: 'Section 6: Information & Resource Quality', type: 'single', options: ['Daily / Weekly', 'Monthly', 'Occasionally', 'Rarely'] },
  { id: 'Q25', field: 'q25', title: 'What would most improve frontline referral accuracy and resource discovery?', section: 'Section 6: Information & Resource Quality', type: 'multi', options: ['A continuously verified digital directory', 'Direct peer-to-peer frontline network', 'A dedicated client navigation agency with flexible funds', 'Shared case management protocols', 'Other'] },

  { id: 'Q26', field: 'q26', title: 'What existing community organizations or programs are doing exceptional work in NL?', section: 'Section 7: What Is Working Well?', type: 'text' },
  { id: 'Q27', field: 'q27', title: 'What specific attributes make those successful programs work so effectively?', section: 'Section 7: What Is Working Well?', type: 'text' },
  { id: 'Q28', field: 'q28', title: 'Are there hidden or under-utilized community resources more people should know about?', section: 'Section 7: What Is Working Well?', type: 'single', options: ['Yes, many', 'Yes, a few', 'No', 'Not sure'] },
  { id: 'Q29', field: 'q29', title: 'Please describe the hidden or under-utilized resources:', section: 'Section 7: What Is Working Well?', type: 'text' },

  { id: 'Q30', field: 'q30', title: 'What are the highest-impact opportunities for systemic improvement in NL?', section: 'Section 8: Opportunities & Innovation', type: 'multi', options: ['Independent community navigators', 'Low-barrier emergency crisis funds', 'Centralized eligibility screening portal', 'Co-located multiservice community hubs', 'Flexible peer support networks', 'Other'] },
  { id: 'Q31', field: 'q31', title: 'What is one realistic, small change that would dramatically improve frontline outcomes?', section: 'Section 8: Opportunities & Innovation', type: 'text' },
  { id: 'Q32', field: 'q32', title: 'What is one major problem that policymakers and donors repeatedly overlook?', section: 'Section 8: Opportunities & Innovation', type: 'text' },
  { id: 'Q33', field: 'q33', title: 'If you had the power to eliminate one single barrier tomorrow, which would it be?', section: 'Section 8: Opportunities & Innovation', type: 'text' },

  { id: 'Q34', field: 'q34', title: 'What must Fill The Gap research and understand before launching community programs?', section: 'Section 9: Advice for Fill The Gap', type: 'text' },
  { id: 'Q35', field: 'q35', title: 'What would make you comfortable collaborating with or referring clients to Fill The Gap?', section: 'Section 9: Advice for Fill The Gap', type: 'multi', options: ['100% transparency & open books', 'Zero red-tape / rapid response times', 'Clear boundary definitions (not duplicating others)', 'Compassionate, experienced case workers', 'Warm hand-off protocols with regular updates', 'Other'] },
  { id: 'Q36', field: 'q36', title: 'What concerns or pitfalls should a new nonprofit be cautious to avoid?', section: 'Section 9: Advice for Fill The Gap', type: 'text' },
  { id: 'Q37', field: 'q37', title: 'What areas should Fill The Gap NOT try to duplicate because they are already well-handled?', section: 'Section 9: Advice for Fill The Gap', type: 'text' },
  { id: 'Q38', field: 'q38', title: 'What is your top recommendation for the Fill The Gap leadership team?', section: 'Section 9: Advice for Fill The Gap', type: 'text' },

  { id: 'Q39', field: 'q39', title: 'What do you wish the general public understood about the realities of poverty and need in NL?', section: 'Section 10: Professional Perspective', type: 'text' },
  { id: 'Q40', field: 'q40', title: 'What do you wish community organizations understood about collaborating more effectively?', section: 'Section 10: Professional Perspective', type: 'text' },
  { id: 'Q41', field: 'q41', title: 'What do you wish policymakers and government funders understood about frontline work?', section: 'Section 10: Professional Perspective', type: 'text' },
  { id: 'Q42', field: 'q42', title: 'What is the biggest misconception about the clients you support?', section: 'Section 10: Professional Perspective', type: 'text' },

  { id: 'Q43', field: 'q43', title: 'Is there anything else you would like to share with Fill The Gap?', section: 'Section 11: Final Thoughts & Follow-Up', type: 'text' },
  { id: 'Q44', field: 'q44', title: 'Would you be open to participating in a follow-up conversation or advisory panel?', section: 'Section 11: Final Thoughts & Follow-Up', type: 'single', options: ['Yes', 'Maybe', 'No'] },
  { id: 'Q45', field: 'q45', title: 'What is your preferred method of contact?', section: 'Section 11: Final Thoughts & Follow-Up', type: 'single', options: ['Email', 'Phone', 'Either', 'Prefer not to be contacted'] },
  { id: 'Q46', field: 'q46', title: 'Professional Contact Info (Name, Organization, Email, Phone):', section: 'Section 11: Final Thoughts & Follow-Up', type: 'text' },
];

export const CleanSurveyReport: React.FC<CleanSurveyReportProps> = ({
  communitySurveys,
  professionalSurveys,
  onExportCsv,
}) => {
  const [surveyType, setSurveyType] = useState<'community' | 'professional'>('community');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSection, setSelectedSection] = useState<string>('all');
  const [showWrittenOnly, setShowWrittenOnly] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedTextQuestion, setExpandedTextQuestion] = useState<string | null>(null);
  const [isImporting, setIsImporting] = useState(false);
  const [importStatus, setImportStatus] = useState<string | null>(null);

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    setImportStatus('Reading CSV file...');

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const text = event.target?.result as string;
        if (text) {
          const result = await AdminStore.importCommunitySurveysFromCsv(text);
          if (result.error) {
            setImportStatus(`⚠️ ${result.error}`);
          } else {
            setImportStatus(`✅ Successfully imported ${result.count} response${result.count === 1 ? '' : 's'} from Google Sheet CSV!`);
            setTimeout(() => setImportStatus(null), 5000);
          }
        }
      } catch (err: any) {
        setImportStatus(`⚠️ Error: ${err?.message || 'Failed to process file'}`);
      } finally {
        setIsImporting(false);
        if (fileInputRef.current) fileInputRef.current.value = '';
      }
    };
    reader.readAsText(file);
  };

  const activeSurveys = surveyType === 'community' ? communitySurveys : professionalSurveys;
  const questionSet = surveyType === 'community' ? COMMUNITY_QUESTIONS : PROFESSIONAL_QUESTIONS;
  const totalResponses = activeSurveys.length;

  // Extract unique sections for the active survey type
  const sections = useMemo(() => {
    const set = new Set<string>();
    questionSet.forEach((q) => set.add(q.section));
    return Array.from(set);
  }, [questionSet]);

  // Filter questions
  const filteredQuestions = useMemo(() => {
    return questionSet.filter((q) => {
      if (selectedSection !== 'all' && q.section !== selectedSection) return false;
      if (showWrittenOnly && q.type !== 'text') return false;
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        return (
          q.id.toLowerCase().includes(term) ||
          q.title.toLowerCase().includes(term) ||
          q.section.toLowerCase().includes(term)
        );
      }
      return true;
    });
  }, [questionSet, selectedSection, showWrittenOnly, searchTerm]);

  // Copy table text to clipboard
  const handleCopySummary = (qId: string, title: string, rows: [string, number, number][]) => {
    const text = `${qId}: ${title}\n` + rows.map(([opt, count, pct]) => `• ${opt}: ${count} votes (${pct}%)`).join('\n');
    navigator.clipboard.writeText(text);
    setCopiedId(qId);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="space-y-6 text-white">
      {/* Top Header Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0f172a] border-2 border-amber-400/50 shadow-2xl space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40 text-xs font-black uppercase tracking-wider">
              <FileText className="w-3.5 h-3.5" />
              <span>Full Survey Results & Question Breakdown</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
              Executive Survey Reader & Tallies
            </h2>
            <p className="text-sm text-stone-300 max-w-3xl leading-relaxed">
              Read every single question (Q1 through Q46) and see exactly what options people picked, complete with clean counts, percentages, and written submissions.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Hidden CSV file input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept=".csv,text/csv"
              className="hidden"
            />

            <a
              href={surveyType === 'community' 
                ? (AdminStore.getGoogleConfig().communityFormUrl || 'https://docs.google.com/forms/d/e/1FAIpQLSdUbd7uHKfjodSI6qiixViDSO03lpE9fLEEzvqxs5uw9jWgtg/viewform?usp=header')
                : (AdminStore.getGoogleConfig().professionalFormUrl || 'https://docs.google.com/forms/d/e/1FAIpQLSe-dE9Qn93on48qiv7y2qHzDI7wdUqZjNtIJ8NvGaZ04ijmbg/viewform?usp=header')
              }
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2.5 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 text-purple-200 border border-purple-500/40 text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer"
              title={`Open Official ${surveyType === 'community' ? 'Community' : 'Professional'} Google Form in new tab`}
            >
              <ExternalLink className="w-3.5 h-3.5 text-purple-300" />
              <span>Open {surveyType === 'community' ? 'Community' : 'Professional'} Form</span>
            </a>

            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isImporting}
              className="px-3.5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-2 border border-amber-300 shadow-md cursor-pointer transition-all hover:scale-105 disabled:opacity-50"
              title="Upload CSV exported from your Google Sheet to update tallies"
            >
              <Upload className={`w-3.5 h-3.5 ${isImporting ? 'animate-bounce' : ''}`} />
              <span>{isImporting ? 'Importing...' : 'Import Google Sheet CSV'}</span>
            </button>

            <button
              onClick={() => AdminStore.fetchServerData()}
              className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-stone-200 font-bold text-xs uppercase tracking-wider flex items-center gap-2 border border-slate-700 cursor-pointer transition-colors"
              title="Sync latest submissions from Cloud Firestore database"
            >
              <RefreshCw className="w-3.5 h-3.5 text-sky-400" />
              <span>Sync Live Database</span>
            </button>

            <button
              onClick={() => onExportCsv(surveyType)}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg border border-emerald-400 cursor-pointer transition-all hover:scale-105"
            >
              <Download className="w-4 h-4" />
              <span>Export Clean CSV</span>
            </button>

            <button
              onClick={() => window.print()}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-stone-200 font-bold text-xs uppercase tracking-wider flex items-center gap-2 border border-slate-700 cursor-pointer transition-colors"
            >
              <Printer className="w-4 h-4 text-amber-400" />
              <span>Print / Save PDF</span>
            </button>
          </div>
        </div>

        {/* Import Status Alert if active */}
        {importStatus && (
          <div className="p-4 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-100 text-xs sm:text-sm font-semibold flex items-center justify-between gap-3">
            <span>{importStatus}</span>
            <button
              onClick={() => setImportStatus(null)}
              className="text-xs uppercase font-bold underline cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Survey Type Selector Tabs */}
        <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-slate-800">
          <button
            onClick={() => {
              setSurveyType('community');
              setSelectedSection('all');
            }}
            className={`px-5 py-3 rounded-2xl font-black text-sm uppercase tracking-wider flex items-center gap-2.5 transition-all cursor-pointer ${
              surveyType === 'community'
                ? 'bg-amber-400 text-slate-950 shadow-xl border-2 border-amber-300 scale-105'
                : 'bg-slate-900 text-stone-300 hover:bg-slate-800 border border-slate-700'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Community Surveys ({communitySurveys.length} Submissions)</span>
          </button>

          <button
            onClick={() => {
              setSurveyType('professional');
              setSelectedSection('all');
            }}
            className={`px-5 py-3 rounded-2xl font-black text-sm uppercase tracking-wider flex items-center gap-2.5 transition-all cursor-pointer ${
              surveyType === 'professional'
                ? 'bg-sky-400 text-slate-950 shadow-xl border-2 border-sky-300 scale-105'
                : 'bg-slate-900 text-stone-300 hover:bg-slate-800 border border-slate-700'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Frontline & Professional Surveys ({professionalSurveys.length} Submissions)</span>
          </button>
        </div>

        {/* Search & Filter Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-stone-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search question, keyword, or number (e.g. Q7, housing)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white placeholder-stone-500 focus:outline-none focus:border-amber-400"
            />
          </div>

          {/* Section Filter */}
          <div>
            <select
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-amber-400"
            >
              <option value="all">All Sections (Q1 to Q46)</option>
              {sections.map((sec) => (
                <option key={sec} value={sec}>
                  {sec}
                </option>
              ))}
            </select>
          </div>

          {/* Written Only Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowWrittenOnly(!showWrittenOnly)}
              className={`w-full py-2.5 px-4 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 border transition-all cursor-pointer ${
                showWrittenOnly
                  ? 'bg-purple-950 text-purple-200 border-purple-400'
                  : 'bg-slate-900 text-stone-300 border-slate-700 hover:bg-slate-800'
              }`}
            >
              <Filter className="w-3.5 h-3.5" />
              <span>{showWrittenOnly ? 'Showing Written Feedback Only' : 'Show All Types (Choices + Written)'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-6">
        {totalResponses === 0 && (
          <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3.5">
            <Info className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1 text-xs sm:text-sm">
              <p className="font-bold text-amber-200">
                0 {surveyType === 'community' ? 'Community' : 'Frontline & Professional'} Submissions Recorded So Far
              </p>
              <p className="text-stone-300">
                All 46 questions in the survey are listed below showing available choices and 0% tallies. As new real responses are submitted on the site, option counts, percentages, and written quotes will update automatically.
              </p>
            </div>
          </div>
        )}

        {filteredQuestions.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-[#0f172a] border border-slate-800 space-y-3">
            <Search className="w-8 h-8 text-stone-500 mx-auto" />
            <h3 className="text-base font-bold text-stone-300">No questions match your filter</h3>
            <p className="text-xs text-stone-500">Try changing your search keywords or resetting the section filter.</p>
          </div>
        ) : (
          filteredQuestions.map((q) => {
            // Aggregate values based on question type
            if (q.type === 'single') {
              const counts: Record<string, number> = {};
              activeSurveys.forEach((s: any) => {
                const val = s[q.field];
                if (val && typeof val === 'string' && val.trim()) {
                  counts[val] = (counts[val] || 0) + 1;
                }
              });

              // Also include predefined options if available so user sees options with 0 votes too
              const optionKeys = q.options ? Array.from(new Set([...q.options, ...Object.keys(counts)])) : Object.keys(counts);
              const rows: [string, number, number][] = optionKeys
                .map((opt) => {
                  const count = counts[opt] || 0;
                  const pct = totalResponses > 0 ? Math.round((count / totalResponses) * 100) : 0;
                  return [opt, count, pct] as [string, number, number];
                })
                .sort((a, b) => b[1] - a[1]);

              return (
                <div key={q.id} className="p-6 rounded-3xl bg-[#0f172a] border-2 border-slate-700 shadow-xl space-y-4 hover:border-amber-400/50 transition-all">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 border-b border-slate-800 pb-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded-md bg-amber-400/20 text-amber-300 font-mono font-black text-xs uppercase tracking-wider">
                          {q.id}
                        </span>
                        <span className="text-xs text-stone-400 font-bold uppercase">{q.section}</span>
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-white leading-snug">{q.title}</h3>
                    </div>

                    <button
                      onClick={() => handleCopySummary(q.id, q.title, rows)}
                      className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-stone-300 hover:text-white border border-slate-700 text-xs font-bold flex items-center gap-1.5 shrink-0 cursor-pointer self-start"
                      title="Copy Question Summary to Clipboard"
                    >
                      {copiedId === q.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-amber-400" />}
                      <span>{copiedId === q.id ? 'Copied!' : 'Copy Summary'}</span>
                    </button>
                  </div>

                  {/* Options & Votes Table */}
                  <div className="space-y-2 pt-1">
                    {rows.length === 0 ? (
                      <div className="text-xs text-stone-400 italic p-4 bg-slate-900 rounded-2xl border border-slate-800 text-center">
                        No responses recorded yet for this question.
                      </div>
                    ) : (
                      rows.map(([opt, count, pct]) => (
                        <div key={opt} className="p-3 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-800/80 transition-colors">
                          <div className="flex items-center gap-3 flex-1">
                            <div className="w-6 h-6 rounded-lg bg-slate-800 border border-slate-700 text-stone-300 text-xs font-mono font-bold flex items-center justify-center shrink-0">
                              {count > 0 ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : '•'}
                            </div>
                            <span className="text-sm font-semibold text-slate-200">{opt}</span>
                          </div>

                          <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                            {/* Progress bar */}
                            <div className="w-24 sm:w-36 h-2.5 rounded-full bg-slate-800 overflow-hidden border border-slate-700/60 hidden sm:block">
                              <div className="h-full bg-amber-400 rounded-full transition-all" style={{ width: `${pct}%` }} />
                            </div>
                            <span className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 font-mono text-xs font-bold text-white min-w-[70px] text-center">
                              {count} {count === 1 ? 'vote' : 'votes'}
                            </span>
                            <span className="font-mono text-xs font-extrabold text-amber-400 min-w-[45px] text-right">
                              {pct}%
                            </span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              );
            }

            if (q.type === 'multi') {
              const counts: Record<string, number> = {};
              activeSurveys.forEach((s: any) => {
                const list = s[q.field];
                if (Array.isArray(list)) {
                  list.forEach((item: string) => {
                    if (item && item.trim()) counts[item] = (counts[item] || 0) + 1;
                  });
                }
              });

              const optionKeys = q.options ? Array.from(new Set([...q.options, ...Object.keys(counts)])) : Object.keys(counts);
              const rows: [string, number, number][] = optionKeys
                .map((opt) => {
                  const count = counts[opt] || 0;
                  const pct = totalResponses > 0 ? Math.round((count / totalResponses) * 100) : 0;
                  return [opt, count, pct] as [string, number, number];
                })
                .sort((a, b) => b[1] - a[1]);

              return (
                <div key={q.id} className="p-6 rounded-3xl bg-[#0f172a] border-2 border-slate-700 shadow-xl space-y-4 hover:border-amber-400/50 transition-all">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 border-b border-slate-800 pb-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded-md bg-emerald-400/20 text-emerald-300 font-mono font-black text-xs uppercase tracking-wider">
                          {q.id} (Multi-Choice)
                        </span>
                        <span className="text-xs text-stone-400 font-bold uppercase">{q.section}</span>
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-white leading-snug">{q.title}</h3>
                    </div>

                    <button
                      onClick={() => handleCopySummary(q.id, q.title, rows)}
                      className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-stone-300 hover:text-white border border-slate-700 text-xs font-bold flex items-center gap-1.5 shrink-0 cursor-pointer self-start"
                      title="Copy Question Summary to Clipboard"
                    >
                      {copiedId === q.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-amber-400" />}
                      <span>{copiedId === q.id ? 'Copied!' : 'Copy Summary'}</span>
                    </button>
                  </div>

                  {/* Options & Votes Table */}
                  <div className="space-y-2 pt-1">
                    {rows.length === 0 ? (
                      <div className="text-xs text-stone-400 italic p-4 bg-slate-900 rounded-2xl border border-slate-800 text-center">
                        No responses recorded yet for this question.
                      </div>
                    ) : (
                      rows.map(([opt, count, pct], idx) => (
                        <div key={opt} className="p-3 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-800/80 transition-colors">
                          <div className="flex items-center gap-3 flex-1">
                            <span className="text-xs font-mono font-black text-amber-400 w-6 shrink-0">#{idx + 1}</span>
                            <span className="text-sm font-semibold text-slate-200">{opt}</span>
                          </div>

                          <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                            <div className="w-24 sm:w-36 h-2.5 rounded-full bg-slate-800 overflow-hidden border border-slate-700/60 hidden sm:block">
                              <div className="h-full bg-emerald-400 rounded-full transition-all" style={{ width: `${pct}%` }} />
                            </div>
                            <span className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 font-mono text-xs font-bold text-white min-w-[70px] text-center">
                              {count} {count === 1 ? 'vote' : 'votes'}
                            </span>
                            <span className="font-mono text-xs font-extrabold text-emerald-400 min-w-[45px] text-right">
                              {pct}%
                            </span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              );
            }

            if (q.type === 'scale') {
              const ratings = activeSurveys
                .map((s: any) => s[q.field])
                .filter((r) => typeof r === 'number' && r >= 1 && r <= 5) as number[];
              const avg = ratings.length > 0 ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1) : '—';

              const scaleLabels: Record<number, string> = {
                1: '1 Star — Not at all important',
                2: '2 Stars — Slightly important',
                3: '3 Stars — Moderately important',
                4: '4 Stars — Very important',
                5: '5 Stars — Extremely critical / Essential',
              };

              return (
                <div key={q.id} className="p-6 rounded-3xl bg-[#0f172a] border-2 border-slate-700 shadow-xl space-y-4 hover:border-purple-400/50 transition-all">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 border-b border-slate-800 pb-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded-md bg-purple-400/20 text-purple-300 font-mono font-black text-xs uppercase tracking-wider">
                          {q.id} (1 to 5 Rating)
                        </span>
                        <span className="text-xs text-stone-400 font-bold uppercase">{q.section}</span>
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-white leading-snug">{q.title}</h3>
                    </div>

                    <div className="px-3.5 py-1.5 rounded-xl bg-purple-950 border border-purple-600/60 text-purple-200 text-xs font-mono font-black flex items-center gap-1.5 shrink-0 self-start">
                      <span>Overall Avg:</span>
                      <span className="text-amber-300 text-sm font-black">{avg} / 5</span>
                    </div>
                  </div>

                  <div className="space-y-2 pt-1">
                    {[5, 4, 3, 2, 1].map((num) => {
                      const count = ratings.filter((r) => r === num).length;
                      const pct = totalResponses > 0 ? Math.round((count / totalResponses) * 100) : 0;
                      return (
                        <div key={num} className="p-3 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <span className="text-sm font-semibold text-slate-200">{scaleLabels[num]}</span>
                          <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                            <div className="w-24 sm:w-36 h-2.5 rounded-full bg-slate-800 overflow-hidden border border-slate-700/60 hidden sm:block">
                              <div className="h-full bg-purple-400 rounded-full transition-all" style={{ width: `${pct}%` }} />
                            </div>
                            <span className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 font-mono text-xs font-bold text-white min-w-[70px] text-center">
                              {count} {count === 1 ? 'vote' : 'votes'}
                            </span>
                            <span className="font-mono text-xs font-extrabold text-purple-300 min-w-[45px] text-right">
                              {pct}%
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            }

            // TEXT / OPEN-ENDED QUESTIONS
            const writtenAnswers = activeSurveys
              .map((s: any) => ({
                text: s[q.field] || (q.field === 'q46' ? (s.q46Email || (s.q46Name ? `${s.q46Name} (${s.q46Org || ''}) - ${s.q46Email || ''} ${s.q46Phone || ''}` : '')) : ''),
                town: s.q2 || s.q4 || (s.orgName ? `${s.orgName} (${s.role || ''})` : 'NL Resident / Professional'),
                date: s.submittedAt,
              }))
              .filter((item) => item.text && typeof item.text === 'string' && item.text.trim().length > 0);

            const isExpanded = expandedTextQuestion === q.id;
            const displayedAnswers = isExpanded ? writtenAnswers : writtenAnswers.slice(0, 5);

            return (
              <div key={q.id} className="p-6 rounded-3xl bg-[#0f172a] border-2 border-slate-700 shadow-xl space-y-4 hover:border-sky-400/50 transition-all">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 border-b border-slate-800 pb-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-md bg-sky-400/20 text-sky-300 font-mono font-black text-xs uppercase tracking-wider">
                        {q.id} (Written Feedback)
                      </span>
                      <span className="text-xs text-stone-400 font-bold uppercase">{q.section}</span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-white leading-snug">{q.title}</h3>
                  </div>

                  <span className="px-3 py-1.5 rounded-xl bg-sky-950 border border-sky-700/60 text-sky-200 text-xs font-mono font-bold shrink-0 self-start">
                    {writtenAnswers.length} responses ({totalResponses > 0 ? Math.round((writtenAnswers.length / totalResponses) * 100) : 0}%)
                  </span>
                </div>

                <div className="space-y-3 pt-1">
                  {writtenAnswers.length === 0 ? (
                    <div className="text-xs text-stone-400 italic p-4 bg-slate-900 rounded-2xl border border-slate-800 text-center">
                      No written responses submitted for this question yet.
                    </div>
                  ) : (
                    <>
                      {displayedAnswers.map((item, idx) => (
                        <div key={idx} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                          <div className="flex items-center justify-between text-xs text-stone-400 border-b border-slate-800/80 pb-1.5">
                            <span className="font-bold text-amber-300">{item.town}</span>
                            <span className="font-mono text-[11px]">{new Date(item.date).toLocaleDateString()}</span>
                          </div>
                          <p className="text-sm text-slate-200 italic leading-relaxed">
                            "{item.text}"
                          </p>
                        </div>
                      ))}

                      {writtenAnswers.length > 5 && (
                        <button
                          onClick={() => setExpandedTextQuestion(isExpanded ? null : q.id)}
                          className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-sky-300 flex items-center justify-center gap-1.5 border border-slate-700 transition-colors cursor-pointer"
                        >
                          {isExpanded ? (
                            <>
                              <span>Collapse to 5 answers</span>
                              <ChevronUp className="w-4 h-4" />
                            </>
                          ) : (
                            <>
                              <span>View all {writtenAnswers.length} written responses</span>
                              <ChevronDown className="w-4 h-4" />
                            </>
                          )}
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
