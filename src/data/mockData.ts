import { CommunityResource, ResourceCategory } from '../types';

export const RESOURCE_CATEGORIES: ResourceCategory[] = [
  'FOOD',
  'HOUSING',
  'EMPLOYMENT',
  'ADDICTION & RECOVERY',
  'FAMILY & CHILDREN',
  'BASIC NEEDS',
  'TRANSPORTATION',
  'GOVERNMENT SERVICES',
  'COMMUNITY SERVICES',
  'OTHER SUPPORT'
];

export const INITIAL_ST_JOHNS_RESOURCES: CommunityResource[] = [
  // 1. FOOD
  {
    id: 'res-food-first-nl',
    name: 'Food First NL / Community Food Helpline',
    category: 'FOOD',
    description: 'Provincial non-profit dedicated to food security. The helpline helps individuals across NL find emergency food hampers, community meals, and food programs.',
    phone: '709-237-4026 (or dial 211)',
    website: 'https://www.foodfirstnl.ca',
    address: 'St. John\'s, NL',
    hours: 'Helpline: Mon–Fri 9:00 AM – 4:00 PM'
  },
  {
    id: 'res-bridges-to-hope',
    name: 'Bridges to Hope Food Pantry',
    category: 'FOOD',
    description: 'Community food pantry providing emergency food hampers and essential grocery support to individuals and families in St. John\'s.',
    phone: '709-722-9225',
    website: 'https://www.bridgestohope.ca',
    address: '39 Cookstown Rd, St. John\'s, NL',
    hours: 'Tues, Wed, Fri 9:30 AM – 1:00 PM'
  },
  {
    id: 'res-cfsa',
    name: 'Community Food Sharing Association',
    category: 'FOOD',
    description: 'Central distribution hub supplying over 60 food banks across Newfoundland & Labrador with emergency food provisions.',
    phone: '709-722-0130',
    website: 'https://cfsa.nf.net',
    address: '21 Hallett Cres, St. John\'s, NL'
  },

  // 2. HOUSING
  {
    id: 'res-gathering-place-housing',
    name: 'The Gathering Place — O\'Callaghan Centre & Shelter',
    category: 'HOUSING',
    description: 'Low-barrier community centre and emergency shelter providing safe emergency overnight beds, warm meals, laundry, and housing navigation for adults in St. John\'s.',
    phone: '709-753-3234',
    website: 'https://kindnesscrew.com',
    address: '172 Military Rd, St. John\'s, NL',
    hours: '24/7 emergency shelter access'
  },
  {
    id: 'res-stellas-circle-housing',
    name: 'Stella\'s Circle — Housing Services',
    category: 'HOUSING',
    description: 'Provides supportive and emergency housing (including the Naomi Centre for young women and Brian Martin Housing Resource Centre) in St. John\'s.',
    phone: '709-738-8390',
    website: 'https://stellascircle.ca',
    address: '142 Military Rd, St. John\'s, NL'
  },
  {
    id: 'res-nl-housing',
    name: 'Newfoundland and Labrador Housing Corporation (NLHC)',
    category: 'HOUSING',
    description: 'Provincial crown corporation providing social housing, emergency shelter placement assistance, and rent supplement programs in NL.',
    phone: '709-724-3000 (Emergency Housing: 1-833-724-2444)',
    website: 'https://www.nlhc.nl.ca',
    address: '2 Canada Dr, St. John\'s, NL'
  },

  // 3. EMPLOYMENT
  {
    id: 'res-stellas-circle-employment',
    name: 'Stella\'s Circle — Employment Services & Social Enterprise',
    category: 'EMPLOYMENT',
    description: 'Specialized employment counseling, workplace skills training, and supportive transitional employment opportunities (Clean Start, Hungry Heart Cafe).',
    phone: '709-738-7730',
    website: 'https://stellascircle.ca/employment-services/',
    address: '142 Military Rd, St. John\'s, NL'
  },
  {
    id: 'res-choices-employment',
    name: 'Choices for Youth — Employment & Education (Impact Co.)',
    category: 'EMPLOYMENT',
    description: 'Supportive training programs and social enterprise employment opportunities for vulnerable youth (ages 16–29) developing career readiness in St. John\'s.',
    phone: '709-754-0446',
    website: 'https://choicesforyouth.ca',
    address: '261 Duckworth St, St. John\'s, NL'
  },

  // 4. ADDICTION & RECOVERY
  {
    id: 'res-nlhs-recovery-centre',
    name: 'NL Health Services — Recovery Centre & Addictions Support',
    category: 'ADDICTION & RECOVERY',
    description: 'Provincial medical withdrawal management, crisis stabilization, and community referral services for individuals seeking addiction recovery support.',
    phone: '709-752-4980 (or dial 811)',
    website: 'https://www.nlhealthservices.ca',
    address: 'St. John\'s, NL',
    hours: '24/7 intake assessment'
  },
  {
    id: 'res-swapt-nl',
    name: 'SWAP NL (Safe Works Access Program)',
    category: 'ADDICTION & RECOVERY',
    description: 'Harm reduction initiative in St. John\'s providing non-judgmental supplies, education, naloxone kits, and community referrals.',
    phone: '709-757-7927',
    website: 'https://acnl.net/swap/',
    address: '47 Prescott St, St. John\'s, NL'
  },

  // 5. FAMILY & CHILDREN
  {
    id: 'res-spanl',
    name: 'Single Parent Association of Newfoundland & Labrador (SPANL)',
    category: 'FAMILY & CHILDREN',
    description: 'Offers essential supports, school supply drives, food assistance, parent workshops, and peer support for single parents and their children.',
    phone: '709-738-3401',
    website: 'https://www.spanl.ca',
    address: '472 Logy Bay Rd, St. John\'s, NL'
  },
  {
    id: 'res-daybreak',
    name: 'Daybreak Parent Child Centre',
    category: 'FAMILY & CHILDREN',
    description: 'Community-based non-profit early childhood education and family support centre helping families facing socio-economic barriers in St. John\'s.',
    phone: '709-726-8373',
    website: 'https://daybreakcentre.com',
    address: '74 The Boulevard, St. John\'s, NL'
  },

  // 6. BASIC NEEDS
  {
    id: 'res-jimmy-pratt',
    name: 'Jimmy Pratt Memorial Outreach Centre',
    category: 'BASIC NEEDS',
    description: 'Provides hot morning meals, clothing distribution, warm winter gear, and community inclusion for vulnerable individuals in downtown St. John\'s.',
    phone: '709-726-8781',
    website: 'https://jimmyprattcentre.ca',
    address: 'George Street United Church, 25 George St, St. John\'s, NL',
    hours: 'Breakfast: Mon–Fri 8:30 AM – 10:00 AM'
  },
  {
    id: 'res-svdp-stjohns',
    name: 'Society of St. Vincent de Paul — St. John\'s',
    category: 'BASIC NEEDS',
    description: 'Volunteer community conference providing emergency vouchers for food, clothing, essential household goods, and furniture assistance.',
    phone: '709-753-6180',
    website: 'https://www.ssvp.ca',
    address: 'St. John\'s, NL'
  },

  // 7. TRANSPORTATION
  {
    id: 'res-metrobus-community',
    name: 'Metrobus Transit & Community Passes (City of St. John\'s)',
    category: 'TRANSPORTATION',
    description: 'Public transit system serving St. John\'s and Mount Pearl. Information on subsidized community transit passes, bus routes, and transit schedules.',
    phone: '709-570-2040',
    website: 'https://www.metrobus.com',
    address: '25 Messenger Dr, St. John\'s, NL'
  },
  {
    id: 'res-gobus-accessible',
    name: 'GoBus Accessible Transit (St. John\'s & Mount Pearl)',
    category: 'TRANSPORTATION',
    description: 'Door-to-door paratransit service for persons with disabilities who are unable to access regular Metrobus transit routes.',
    phone: '709-368-1920',
    website: 'https://www.metrobus.com/gobus/',
    address: 'St. John\'s, NL'
  },

  // 8. GOVERNMENT SERVICES
  {
    id: 'res-mcp-nl',
    name: 'NL Medical Care Plan (MCP) & MCP Registration',
    category: 'GOVERNMENT SERVICES',
    description: 'Government of Newfoundland & Labrador medical insurance registration, health card renewals, and information on public healthcare coverage.',
    phone: '1-866-449-4459 (or 709-729-3508)',
    website: 'https://www.gov.nl.ca/hcs/mcp/',
    address: '45 Major\'s Path, St. John\'s, NL'
  },
  {
    id: 'res-legal-aid-nl',
    name: 'Legal Aid Commission of Newfoundland & Labrador',
    category: 'GOVERNMENT SERVICES',
    description: 'Provides legal advice and representation to low-income individuals in family and criminal law proceedings across NL.',
    phone: '709-753-7860 (Toll-Free: 1-800-563-9911)',
    website: 'https://www.court.nl.ca/legalaid',
    address: '251 Empire Ave, St. John\'s, NL'
  },

  // 9. COMMUNITY SERVICES
  {
    id: 'res-211-nl',
    name: '211 Newfoundland & Labrador',
    category: 'COMMUNITY SERVICES',
    description: 'Free, confidential, 24/7 service connecting residents to thousands of community, social, government, and health programs across the province.',
    phone: '2-1-1 (Toll-free: 1-855-258-0211)',
    website: 'https://211nl.ca',
    hours: '24/7 / 365 Days in 150+ languages'
  },
  {
    id: 'res-seniors-nl',
    name: 'SeniorsNL (Information & Referral Line)',
    category: 'COMMUNITY SERVICES',
    description: 'Dedicated information and peer referral network supporting older adults, seniors, and their families across Newfoundland and Labrador.',
    phone: '709-737-2333 (Toll-Free: 1-800-563-5599)',
    website: 'https://seniorsnl.ca',
    hours: 'Mon–Fri 8:30 AM – 4:30 PM'
  },
  {
    id: 'res-anc-nl',
    name: 'Association for New Canadians (ANC NL)',
    category: 'COMMUNITY SERVICES',
    description: 'Comprehensive settlement, language training, housing support, and integration services for newcomers and refugees arriving in Newfoundland & Labrador.',
    phone: '709-722-9680',
    website: 'https://www.ancnl.ca',
    address: '144 Military Rd, St. John\'s, NL'
  },

  // 10. OTHER SUPPORT
  {
    id: 'res-811-healthline',
    name: '811 HealthLine & Mental Health Crisis Support',
    category: 'OTHER SUPPORT',
    description: '24/7 confidential provincial health line staffed by registered nurses and mental health crisis clinicians. Call 811 from anywhere in NL.',
    phone: '8-1-1 (Crisis Text: 686868)',
    website: 'https://www.811healthline.ca',
    hours: '24/7 / 365 Days'
  },
  {
    id: 'res-988-suicide-line',
    name: '988 Suicide Crisis Helpline',
    category: 'OTHER SUPPORT',
    description: 'National 24/7 toll-free suicide prevention line providing immediate, compassionate crisis support by phone or text across Canada.',
    phone: '9-8-8',
    website: 'https://988.ca',
    hours: '24/7 by phone call or SMS text'
  }
];

export const EXPLORING_AREAS = [
  { id: 'food', title: 'Food insecurity', desc: 'Understanding gaps in emergency food access, food hampers, and community meal programs.' },
  { id: 'employment', title: 'Employment barriers', desc: 'Navigating hurdles to steady employment and transitional work opportunities.' },
  { id: 'resume', title: 'Resume and interview preparation', desc: 'Practical support preparing resumes, job applications, and interview confidence.' },
  { id: 'clothing', title: 'Work clothing and footwear', desc: 'Overcoming the cost barrier for mandatory steel-toed boots, uniforms, and work apparel.' },
  { id: 'transportation', title: 'Transportation barriers', desc: 'Physical transit challenges, bus fares, and mobility obstacles preventing access to care.' },
  { id: 'necessities', title: 'Basic necessities', desc: 'Gaps in accessing essential toiletries, winter clothing, blankets, and personal items.' },
  { id: 'navigation', title: 'Resource navigation', desc: 'Helping people figure out which agency or program handles their specific situation.' },
  { id: 'addiction', title: 'Addiction-related support navigation', desc: 'Helping individuals and loved ones find harm reduction and recovery programs.' },
  { id: 'family', title: 'Family support', desc: 'Addressing gaps in childcare access, single-parent resources, and family emergency help.' },
  { id: 'vulnerable', title: 'Support for vulnerable people', desc: 'Assisting people with disabilities, seniors, and youth facing complex barriers.' },
  { id: 'temp_work', title: 'Temporary employment opportunities', desc: 'Exploring low-barrier, dignified casual work pathways and skill-building opportunities.' },
  { id: 'other', title: 'Other needs identified by the community', desc: 'Blind spots and emerging issues brought forward directly through community feedback.' }
];
