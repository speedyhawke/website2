// Central Store & Analytics Engine for Fill the Gap Admin Dashboard
// Real-time Cloud Firestore Persistence + Fast Local State Fallback

import {
  db,
  collection,
  doc,
  setDoc,
  getDocs,
  onSnapshot,
} from '../lib/firebase';

export interface VisitRecord {
  id: string;
  timestamp: string;
  path: string;
  referrer: string;
  userAgent: string;
  device: 'desktop' | 'mobile' | 'tablet';
}

export interface CommunitySurveyResponse {
  id: string;
  submittedAt: string;
  // Section 1
  q1?: string; // Connection to NL
  q1Other?: string;
  q2?: string; // Region/Town
  q2Other?: string;
  q3?: string; // Age group
  q4?: string; // Household
  q5?: string; // Someone to turn to
  // Section 2
  q6?: string; // Needed help in past 5 yrs
  q7?: string[]; // Types of help needed
  q7Other?: string;
  q8?: string; // Difficulty figuring out where to go
  q9?: string; // How many places contacted
  q10?: string; // Referred without getting help
  q11?: string; // Difficulty figuring out who is responsible
  // Section 3
  q12?: string[]; // Barriers experienced
  q12Other?: string;
  q13?: string[]; // Top 3 biggest barriers
  q13Other?: string;
  q14?: string; // Given up trying to get help
  q15?: string; // Written reason for giving up
  // Section 4
  q16?: string; // How easy to find accurate info
  q17?: string[]; // Where look for info
  q17Other?: string;
  q18?: string; // Found outdated/confusing info online
  q19?: string[]; // What would make finding help easier
  q19Other?: string;
  // Section 5
  q20?: string; // Service seemed like it should help but didn't fit
  q21?: string[]; // What made it a poor fit
  q21Other?: string;
  q22?: string; // Needed help with something not fitting neatly
  q23?: string; // Describe what happened
  // Section 6
  q24?: number | null; // Importance of someone in your corner (1-5)
  q25?: string[]; // What happens to people without someone in corner
  q25Other?: string;
  q26?: string; // Have you been that person for someone else
  q27?: string[]; // What kinds of things you helped with
  q27Other?: string;
  q28?: string; // How difficult to figure out what to do for that person
  // Section 7
  q29?: string[]; // Kinds of support making a difference
  q29Other?: string;
  q30?: string; // One thing easier (written)
  q31?: string; // Problem not talked about enough (written)
  q32?: string; // Small change big difference (written)
  // Section 8
  q33?: string[]; // Areas deserving more attention (up to 5)
  q33Other?: string;
  q34?: string; // Most urgent priority area
  q35?: string; // Why important (written)
  // Section 9
  q36?: string; // Focus on learning about first (written)
  q37?: string[]; // What would make you trust FTG
  q37Other?: string;
  q38?: string; // What would make you NOT trust FTG (written)
  q39?: string[]; // Deciding what programs to work on
  q39Other?: string;
  // Section 10
  q40?: string; // Experience recognizing a gap (written)
  q41?: string; // Wish someone had told you (written)
  q42?: string; // Wish existed when needed help (written)
  // Section 11
  q43?: string; // Anything else FTG should know (written)
  q44?: string; // Interested in hearing research results (Yes/No)
  q45?: string; // Preferred channel to hear results
  q45Other?: string;
  q46?: string; // Optional email address
}

export interface ProfessionalSurveyResponse {
  id: string;
  submittedAt: string;
  
  // Section 1 — Professional Background (Q1–Q4)
  q1?: string; // General field (Select one)
  q1Other?: string;
  q2?: string; // How long worked in field (Select one)
  q3?: string; // Role description (Select one)
  q3Other?: string;
  q4?: string; // Geographic area primarily served (Select one)
  q4Other?: string;

  // Section 2 — What You See (Q5–Q9)
  q5?: string[]; // Most common areas where people seek help (Multi)
  q5Other?: string;
  q6?: string[]; // Areas creating greatest challenges (Up to 5)
  q6Other?: string;
  q7?: string; // ONE area deserving most attention (Select one)
  q7Other?: string;
  q8?: string; // Frequency encounter people who don't know where to turn (Select one)
  q9?: string; // Frequency encounter people needing multiple services (Select one)

  // Section 3 — Barriers (Q10–Q13)
  q10?: string[]; // Barriers most commonly preventing people from accessing help (Multi)
  q10Other?: string;
  q11?: string[]; // Top three barriers with greatest impact (Up to 3)
  q11Other?: string;
  q12?: string; // How often see people give up because process too difficult (Select one)
  q13?: string[]; // What usually causes people to give up (Multi)
  q13Other?: string;

  // Section 4 — Referrals and Navigation (Q14–Q18)
  q14?: string; // How often refer people to other services (Select one)
  q15?: string; // How often encounter difficulty finding referral (Select one)
  q16?: string[]; // What makes referrals difficult (Multi)
  q16Other?: string;
  q17?: string; // Referred to service that couldn't meet needs (Select one)
  q18?: string; // What tends to happen in those situations (Optional written)

  // Section 5 — Gaps Between Services (Q19–Q22)
  q19?: string; // Situations where needs fall between existing services (Select one)
  q20?: string[]; // Situations most likely to fall between services (Multi)
  q20Other?: string;
  q21?: string; // Regularly encounter needs without service/referral (Select one)
  q22?: string; // General type of need (Optional written)

  // Section 6 — Information (Q23–Q25)
  q23?: string; // Ease of finding accurate resource information (Select one)
  q24?: string; // Encounter outdated/confusing info (Select one)
  q25?: string[]; // What would make resource info easier to use (Multi)
  q25Other?: string;

  // Section 7 — What Is Working? (Q26–Q29)
  q26?: string; // Services/organizations working well (Optional written)
  q27?: string; // What makes those approaches successful (Optional written)
  q28?: string; // Existing resources more should know about (Yes/No/Not sure)
  q29?: string; // Describe type of resource or service (Optional written)

  // Section 8 — Opportunities (Q30–Q33)
  q30?: string[]; // Opportunities for improvement (Multi)
  q30Other?: string;
  q31?: string; // One small change that could make meaningful difference (Optional written)
  q32?: string; // One problem frequently overlooked (Optional written)
  q33?: string; // One barrier you would remove (Optional written)

  // Section 9 — Fill The Gap (Q34–Q38)
  q34?: string; // What should new initiative research before deciding (Optional written)
  q35?: string[]; // What would make comfortable working alongside/referring (Multi)
  q35Other?: string;
  q36?: string; // What would concern you about a new organization (Optional written)
  q37?: string; // Areas FTG should NOT try to duplicate (Optional written)
  q38?: string; // Recommendations before doing anything (Optional written)

  // Section 10 — Your Professional Perspective (Q39–Q42)
  q39?: string; // What wish general public understood (Optional written)
  q40?: string; // What wish organizations understood (Optional written)
  q41?: string; // What wish policymakers/decision-makers understood (Optional written)
  q42?: string; // What people most often misunderstand about challenges (Optional written)

  // Section 11 — Final Thoughts (Q43)
  q43?: string; // Anything else FTG should know (Optional written)

  // Optional Follow-Up (Q44–Q46)
  q44?: string; // Willing to provide additional info / participate in conversation (Yes/No/Maybe)
  q45?: string; // Preferred contact method (Email, Phone, Other, Prefer not)
  q45Other?: string;
  q46Name?: string; // Optional Name
  q46Org?: string; // Optional Org
  q46Email?: string; // Optional Email
  q46Phone?: string; // Optional Phone

  // Legacy fallback fields for backward compatibility
  q29Name?: string;
  q29Title?: string;
  q29Org?: string;
  q29Email?: string;
  q29Phone?: string;
  orgName?: string;
  role?: string;
  sector?: string;
  barriers?: string[];
  frequencyFallingThrough?: string;
  referralFailureReason?: string;
  mostNeededSupport?: string;
  partnershipInterest?: string;
  contactName?: string;
  contactEmail?: string;
  contactPhone?: string;
  additionalComments?: string;
}

export interface DonationRecord {
  id: string;
  donorName: string;
  amount: number;
  date: string;
  method: 'e-Transfer' | 'Cash' | 'Cheque' | 'Online Pledge' | 'In-Person Event' | 'Corporate/Sponsor';
  notes?: string;
  isAnonymous: boolean;
  status: 'Received' | 'Pledged' | 'Verified';
}

export interface ContactMessageRecord {
  id: string;
  submittedAt: string;
  name: string;
  email: string;
  phone?: string;
  reason: string;
  message: string;
  status: 'Unread' | 'Read' | 'Replied' | 'Archived';
}

export interface AdminCredentials {
  username: string;
  passwordHash: string;
  updatedAt: string;
}

export interface GoogleIntegrationConfig {
  communityFormUrl: string;
  communitySheetCsvUrl: string;
  communitySheetViewUrl: string;
  professionalFormUrl: string;
  professionalSheetCsvUrl: string;
  professionalSheetViewUrl: string;
  isAutoSyncEnabled: boolean;
  syncIntervalSeconds: number;
  lastSyncedAt?: string;
  lastSyncStatus?: 'success' | 'error' | 'idle' | 'syncing';
  lastSyncError?: string;
  communityCountFromSheet: number;
  professionalCountFromSheet: number;
  paypalEmail?: string;
  paypalMeHandle?: string;
  eTransferEmail?: string;
  donationInstructions?: string;
  // Direct Bank Account & Wire Transfer Details
  bankName?: string;
  accountHolderName?: string;
  institutionNumber?: string;
  transitNumber?: string;
  accountNumber?: string;
  swiftBic?: string;
  bankAddress?: string;
}

const DEFAULT_GOOGLE_CONFIG: GoogleIntegrationConfig = {
  communityFormUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSdUbd7uHKfjodSI6qiixViDSO03lpE9fLEEzvqxs5uw9jWgtg/viewform?usp=header',
  communitySheetCsvUrl: '',
  communitySheetViewUrl: '',
  professionalFormUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSe-dE9Qn93on48qiv7y2qHzDI7wdUqZjNtIJ8NvGaZ04ijmbg/viewform?usp=header',
  professionalSheetCsvUrl: '',
  professionalSheetViewUrl: '',
  isAutoSyncEnabled: true,
  syncIntervalSeconds: 60,
  communityCountFromSheet: 0,
  professionalCountFromSheet: 0,
  lastSyncStatus: 'idle',
  paypalEmail: '',
  paypalMeHandle: '',
  eTransferEmail: 'info@fillthegapnl.ca',
  donationInstructions: 'Fill the Gap is a grassroots community initiative serving St. John\'s & Newfoundland.',
  bankName: '',
  accountHolderName: 'Fill the Gap NL',
  institutionNumber: '',
  transitNumber: '',
  accountNumber: '',
  swiftBic: '',
  bankAddress: 'St. John\'s, NL, Canada',
};

const STORAGE_KEYS = {
  VISITS: 'ftg_site_visits_v2',
  COMMUNITY_SURVEYS: 'ftg_community_surveys_v2',
  PROFESSIONAL_SURVEYS: 'ftg_professional_surveys_v2',
  DONATIONS: 'ftg_donations_records_v2',
  CONTACT_MESSAGES: 'ftg_contact_messages_v1',
  CREDENTIALS: 'ftg_admin_credentials_v1',
  AUTH_SESSION: 'ftg_admin_session_v1',
  EXCLUDE_OWN_VISITS: 'ftg_exclude_admin_visits_v1',
  CLEAN_WIPE_FLAG: 'ftg_stats_zeroed_flag_v2',
  CUSTOM_MASCOT_IMAGE: 'ftg_custom_puffin_image_v1',
  CUSTOM_HERO_IMAGE: 'ftg_custom_hero_scenic_image_v1',
  GOOGLE_CONFIG: 'ftg_google_integration_config_v1',
};

// In-memory cache for fast, instant UI updates
let memoryCommunitySurveys: CommunitySurveyResponse[] = [];
let memoryProfessionalSurveys: ProfessionalSurveyResponse[] = [];
let memoryContactMessages: ContactMessageRecord[] = [];
let memoryDonations: DonationRecord[] = [];
let memoryVisits: VisitRecord[] = [];

const notifyStoreUpdated = () => {
  if (typeof window !== 'undefined') {
    try {
      window.dispatchEvent(new CustomEvent('ftg_store_update'));
    } catch {}
  }
};

export class AdminStore {
  private static isInitialized = false;
  private static isSubscribed = false;
  private static activeFetchPromise: Promise<{ success: boolean; error?: string }> | null = null;
  private static lastFetchTime = 0;

  // --------------------------------------------------------------------------
  // 0. Global Store Initialization & Firestore Real-Time Subscriptions
  // --------------------------------------------------------------------------
  static async initialize(): Promise<void> {
    // 1. Prime in-memory caches from localStorage immediately
    this.getVisits();
    this.getCommunitySurveys();
    this.getProfessionalSurveys();
    this.getDonations();
    this.getContactMessages();

    // 2. Set up real-time live listeners from Cloud Firestore
    this.setupFirestoreListeners();

    // 3. Perform initial fetch
    try {
      await this.fetchServerData();
    } catch (err) {
      console.warn('[AdminStore] Initial fetch notice:', err);
    }
    this.isInitialized = true;
  }

  private static setupFirestoreListeners(): void {
    if (this.isSubscribed || typeof window === 'undefined' || !db) return;
    this.isSubscribed = true;

    try {
      // Listen to Community Surveys in real time
      onSnapshot(collection(db, 'community_surveys'), (snapshot) => {
        const surveys: CommunitySurveyResponse[] = [];
        snapshot.forEach((docSnap) => {
          const data = docSnap.data();
          surveys.push({
            id: docSnap.id,
            ...(data as any),
          });
        });
        if (surveys.length > 0) {
          const localComm = AdminStore.getCommunitySurveys();
          const commMap = new Map<string, CommunitySurveyResponse>();
          localComm.forEach((s) => s && s.id && commMap.set(s.id, s));
          surveys.forEach((s) => s && s.id && commMap.set(s.id, s));
          const merged = Array.from(commMap.values()).sort(
            (a, b) => new Date(b.submittedAt || 0).getTime() - new Date(a.submittedAt || 0).getTime()
          );
          memoryCommunitySurveys = merged;
          try {
            localStorage.setItem(STORAGE_KEYS.COMMUNITY_SURVEYS, JSON.stringify(merged));
          } catch {}
          notifyStoreUpdated();
        }
      }, (err) => {
        console.warn('[Firestore] community_surveys listener notice:', err);
      });

      // Listen to Professional Surveys in real time
      onSnapshot(collection(db, 'professional_surveys'), (snapshot) => {
        const surveys: ProfessionalSurveyResponse[] = [];
        snapshot.forEach((docSnap) => {
          const data = docSnap.data();
          surveys.push({
            id: docSnap.id,
            ...(data as any),
          });
        });
        if (surveys.length > 0) {
          const localProf = AdminStore.getProfessionalSurveys();
          const profMap = new Map<string, ProfessionalSurveyResponse>();
          localProf.forEach((s) => s && s.id && profMap.set(s.id, s));
          surveys.forEach((s) => s && s.id && profMap.set(s.id, s));
          const merged = Array.from(profMap.values()).sort(
            (a, b) => new Date(b.submittedAt || 0).getTime() - new Date(a.submittedAt || 0).getTime()
          );
          memoryProfessionalSurveys = merged;
          try {
            localStorage.setItem(STORAGE_KEYS.PROFESSIONAL_SURVEYS, JSON.stringify(merged));
          } catch {}
          notifyStoreUpdated();
        }
      }, (err) => {
        console.warn('[Firestore] professional_surveys listener notice:', err);
      });

      // Listen to Visits in real time
      onSnapshot(collection(db, 'visits'), (snapshot) => {
        const visits: VisitRecord[] = [];
        snapshot.forEach((docSnap) => {
          const data = docSnap.data();
          visits.push({
            id: docSnap.id,
            ...(data as any),
          });
        });
        if (visits.length > 0) {
          const localVisits = AdminStore.getVisits();
          const visitMap = new Map<string, VisitRecord>();
          localVisits.forEach((v) => v && v.id && visitMap.set(v.id, v));
          visits.forEach((v) => v && v.id && visitMap.set(v.id, v));
          const merged = Array.from(visitMap.values()).sort(
            (a, b) => new Date(b.timestamp || 0).getTime() - new Date(a.timestamp || 0).getTime()
          );
          memoryVisits = merged;
          try {
            localStorage.setItem(STORAGE_KEYS.VISITS, JSON.stringify(merged));
          } catch {}
          notifyStoreUpdated();
        }
      }, (err) => {
        console.warn('[Firestore] visits listener notice:', err);
      });

      // Listen to Contact Messages in real time
      onSnapshot(collection(db, 'contact_messages'), (snapshot) => {
        const msgs: ContactMessageRecord[] = [];
        snapshot.forEach((docSnap) => {
          const data = docSnap.data();
          msgs.push({
            id: docSnap.id,
            ...(data as any),
          });
        });
        if (msgs.length > 0) {
          const localMsgs = AdminStore.getContactMessages();
          const msgMap = new Map<string, ContactMessageRecord>();
          localMsgs.forEach((m) => m && m.id && msgMap.set(m.id, m));
          msgs.forEach((m) => m && m.id && msgMap.set(m.id, m));
          const merged = Array.from(msgMap.values()).sort(
            (a, b) => new Date(b.submittedAt || 0).getTime() - new Date(a.submittedAt || 0).getTime()
          );
          memoryContactMessages = merged;
          try {
            localStorage.setItem(STORAGE_KEYS.CONTACT_MESSAGES, JSON.stringify(merged));
          } catch {}
          notifyStoreUpdated();
        }
      }, (err) => {
        console.warn('[Firestore] contact_messages listener notice:', err);
      });

      // Listen to Donations in real time
      onSnapshot(collection(db, 'donations'), (snapshot) => {
        const dons: DonationRecord[] = [];
        snapshot.forEach((docSnap) => {
          const data = docSnap.data();
          dons.push({
            id: docSnap.id,
            ...(data as any),
          });
        });
        if (dons.length > 0) {
          const localDons = AdminStore.getDonations();
          const donMap = new Map<string, DonationRecord>();
          localDons.forEach((d) => d && d.id && donMap.set(d.id, d));
          dons.forEach((d) => d && d.id && donMap.set(d.id, d));
          const merged = Array.from(donMap.values()).sort(
            (a, b) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime()
          );
          memoryDonations = merged;
          try {
            localStorage.setItem(STORAGE_KEYS.DONATIONS, JSON.stringify(merged));
          } catch {}
          notifyStoreUpdated();
        }
      }, (err) => {
        console.warn('[Firestore] donations listener notice:', err);
      });
    } catch (e) {
      console.warn('[AdminStore] Firestore listener initialization warning:', e);
    }
  }

  // --------------------------------------------------------------------------
  // 1. Visit Tracking & Visitor Counter
  // --------------------------------------------------------------------------
  static isExcludeOwnVisitsEnabled(): boolean {
    try {
      if (typeof window === 'undefined' || typeof localStorage === 'undefined') return false;
      const stored = localStorage.getItem(STORAGE_KEYS.EXCLUDE_OWN_VISITS);
      return stored === 'true';
    } catch {
      return false;
    }
  }

  static setExcludeOwnVisits(enabled: boolean): void {
    try {
      if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
        localStorage.setItem(STORAGE_KEYS.EXCLUDE_OWN_VISITS, enabled ? 'true' : 'false');
      }
    } catch {}
  }

  static shouldExcludeCurrentVisit(path: string = ''): boolean {
    try {
      if (this.isExcludeOwnVisitsEnabled()) return true;
      if (typeof window !== 'undefined') {
        const cleanPath = (path || '').toLowerCase();
        const currentPath = (window.location.pathname || '').toLowerCase();
        const currentHash = (window.location.hash || '').toLowerCase();
        const currentSearch = (window.location.search || '').toLowerCase();
        if (
          cleanPath.startsWith('/admin') ||
          cleanPath === 'admin' ||
          currentPath === '/admin' ||
          currentPath.startsWith('/admin/') ||
          currentHash === '#admin' ||
          currentHash.startsWith('#admin/') ||
          currentSearch === '?admin' ||
          currentSearch.includes('admin=true')
        ) {
          return true;
        }
      }
    } catch {}
    return false;
  }

  static async recordVisit(path: string = '/'): Promise<void> {
    try {
      if (this.shouldExcludeCurrentVisit(path)) {
        return;
      }

      const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent || '' : '';
      let device: 'desktop' | 'mobile' | 'tablet' = 'desktop';
      if (/tablet|ipad/i.test(userAgent)) device = 'tablet';
      else if (/mobile|iphone|android/i.test(userAgent)) device = 'mobile';

      const visitId = 'vis-' + Date.now().toString(36) + '-' + Math.random().toString(36).substring(2, 7);
      const visit: VisitRecord = {
        id: visitId,
        timestamp: new Date().toISOString(),
        path: path || (typeof window !== 'undefined' ? window.location.pathname : '/'),
        referrer: typeof document !== 'undefined' ? document.referrer || 'Direct Visit' : 'Direct Visit',
        userAgent: userAgent.slice(0, 120),
        device,
      };

      // 1. Update memory & localStorage immediately
      const existing = this.getVisits();
      const updated = [visit, ...existing].slice(0, 2000);
      try {
        localStorage.setItem(STORAGE_KEYS.VISITS, JSON.stringify(updated));
      } catch {}
      memoryVisits = updated;
      notifyStoreUpdated();

      // 2. Persist to Cloud Firestore Database
      try {
        const docRef = doc(db, 'visits', visitId);
        setDoc(docRef, visit).catch((err) => {
          console.warn('[Firestore] Visit write notice:', err);
        });
      } catch (e) {
        console.warn('[Firestore] Visit write error:', e);
      }

      // 3. Optional local express backend backup
      if (typeof window !== 'undefined') {
        fetch('/api/visits', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(visit),
        }).catch(() => {});
      }
    } catch (e) {
      console.warn('Could not record visit:', e);
    }
  }

  static async recordTestVisit(path: string = '/test-page'): Promise<void> {
    try {
      const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent || '' : '';
      const visitId = 'vis-test-' + Date.now().toString(36) + '-' + Math.random().toString(36).substring(2, 7);
      const visit: VisitRecord = {
        id: visitId,
        timestamp: new Date().toISOString(),
        path: path || '/manual-test',
        referrer: 'Admin Manual Test',
        userAgent: userAgent.slice(0, 120) || 'Manual Test Agent',
        device: 'desktop',
      };

      const existing = this.getVisits();
      const updated = [visit, ...existing].slice(0, 2000);
      try {
        localStorage.setItem(STORAGE_KEYS.VISITS, JSON.stringify(updated));
      } catch {}
      memoryVisits = updated;
      notifyStoreUpdated();

      // Persist to Firestore
      try {
        setDoc(doc(db, 'visits', visitId), visit).catch(() => {});
      } catch {}

      if (typeof window !== 'undefined') {
        fetch('/api/visits', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(visit),
        }).catch(() => {});
      }
    } catch (e) {
      console.warn('Could not record test visit:', e);
    }
  }

  static getVisits(): VisitRecord[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.VISITS);
      const parsed = raw ? JSON.parse(raw) : [];
      const legacyRaw = localStorage.getItem('ftg_site_visits_v1');
      const legacyParsed = legacyRaw ? JSON.parse(legacyRaw) : [];

      const map = new Map<string, VisitRecord>();
      if (Array.isArray(legacyParsed)) {
        legacyParsed.forEach(v => {
          if (v && v.id) map.set(v.id, v);
        });
      }
      if (Array.isArray(parsed)) {
        parsed.forEach(v => {
          if (v && v.id) map.set(v.id, v);
        });
      }
      if (Array.isArray(memoryVisits)) {
        memoryVisits.forEach(v => {
          if (v && v.id) map.set(v.id, v);
        });
      }
      const res = Array.from(map.values()).sort(
        (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
      memoryVisits = res;
      return res;
    } catch {
      return memoryVisits || [];
    }
  }

  static async clearVisits(): Promise<void> {
    try {
      localStorage.setItem(STORAGE_KEYS.VISITS, JSON.stringify([]));
      localStorage.removeItem('ftg_site_visits_v1');
      memoryVisits = [];
      notifyStoreUpdated();

      if (typeof window !== 'undefined') {
        fetch('/api/visits', {
          method: 'DELETE',
        }).catch(() => {});
      }
    } catch {}
  }

  // --------------------------------------------------------------------------
  // 2. Community Surveys (Public Insert -> Firestore Database + Cache)
  // --------------------------------------------------------------------------
  static getCommunitySurveys(): CommunitySurveyResponse[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.COMMUNITY_SURVEYS);
      const parsed = raw ? JSON.parse(raw) : [];
      const legacyRaw = localStorage.getItem('ftg_community_surveys_v1');
      const legacyParsed = legacyRaw ? JSON.parse(legacyRaw) : [];

      const map = new Map<string, CommunitySurveyResponse>();
      if (Array.isArray(legacyParsed)) {
        legacyParsed.forEach(s => {
          if (s && s.id) map.set(s.id, s);
        });
      }
      if (Array.isArray(parsed)) {
        parsed.forEach(s => {
          if (s && s.id) map.set(s.id, s);
        });
      }
      if (Array.isArray(memoryCommunitySurveys)) {
        memoryCommunitySurveys.forEach(s => {
          if (s && s.id) map.set(s.id, s);
        });
      }
      const res = Array.from(map.values())
        .filter(s => !s.id?.startsWith('comm-seed-'))
        .sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());

      memoryCommunitySurveys = res;
      return res;
    } catch {
      return (memoryCommunitySurveys || []).filter(s => !s.id?.startsWith('comm-seed-'));
    }
  }

  static async addCommunitySurvey(data: Omit<CommunitySurveyResponse, 'id'>): Promise<{ success: boolean; id: string }> {
    const id = 'comm-' + Date.now().toString(36) + '-' + Math.random().toString(36).substring(2, 6);
    const newRecord: CommunitySurveyResponse = {
      id,
      ...data,
      submittedAt: data.submittedAt || new Date().toISOString(),
    };

    // 1. Update memory & local storage instantly
    try {
      const existing = this.getCommunitySurveys();
      const updated = [newRecord, ...existing.filter(s => s.id !== id)].sort(
        (a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
      );
      memoryCommunitySurveys = updated;
      localStorage.setItem(STORAGE_KEYS.COMMUNITY_SURVEYS, JSON.stringify(updated));
      notifyStoreUpdated();
    } catch (e) {
      console.warn('Local storage write warning:', e);
    }

    // 2. Persist to Cloud Firestore
    try {
      await setDoc(doc(db, 'community_surveys', id), newRecord);
    } catch (err) {
      console.warn('[Firestore] Community survey write warning:', err);
    }

    // 3. Backup to Express backend if online
    if (typeof window !== 'undefined') {
      try {
        fetch('/api/surveys/community', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newRecord),
        }).catch(() => {});
      } catch {}
    }

    notifyStoreUpdated();
    return { success: true, id };
  }

  static async deleteCommunitySurvey(id: string): Promise<void> {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.COMMUNITY_SURVEYS);
      const parsed: CommunitySurveyResponse[] = raw ? JSON.parse(raw) : [];
      const remaining = parsed.filter(s => s.id !== id);
      memoryCommunitySurveys = memoryCommunitySurveys.filter(s => s.id !== id);
      localStorage.setItem(STORAGE_KEYS.COMMUNITY_SURVEYS, JSON.stringify(remaining));
      notifyStoreUpdated();
    } catch {}
  }

  static async addTestCommunitySurvey(): Promise<{ success: boolean; id: string }> {
    const areas = ["St. John's", 'Mount Pearl', 'Conception Bay South', 'Corner Brook', 'Grand Falls-Windsor', 'Gander', 'Labrador City / Labrador'];
    const ages = ['18–24', '25–34', '35–44', '45–54', '55–64', '65+'];
    const households = ['Living alone', 'Living with partner / spouse', 'Living with children / family', 'Living with roommates'];
    const randomArea = areas[Math.floor(Math.random() * areas.length)];
    const randomAge = ages[Math.floor(Math.random() * ages.length)];
    const randomHousehold = households[Math.floor(Math.random() * households.length)];

    return this.addCommunitySurvey({
      submittedAt: new Date().toISOString(),
      q1: 'I currently live in Newfoundland and Labrador',
      q2: randomArea,
      q3: randomAge,
      q4: randomHousehold,
      q5: 'Yes, definitely',
      q6: 'Yes',
      q7: ['Food', 'Housing', 'Mental health/community support'],
      q8: 'Very difficult',
      q9: 'Several places',
      q10: 'Yes, multiple times',
      q11: 'Yes, often',
      q12: ['Not knowing where to start', 'Long waitlists', 'Eligibility criteria too strict', 'Lack of transportation'],
      q13: ['Not knowing where to start', 'Long waitlists', 'Eligibility criteria too strict'],
      q14: 'Yes',
      q15: 'The phone numbers were disconnected or I was told I did not qualify because I made slightly above the cutoff threshold.',
      q16: 'Somewhat difficult',
      q17: ['Searching online / Google', 'Asking friends or family', 'Calling 211 or community helplines'],
      q18: 'Often',
      q19: ['A single verified, up-to-date website of local help', 'A real person to talk to who can guide you', 'Clear explanations of who is eligible'],
      q20: 'Yes',
      q21: ['I did not meet the strict cutoff criteria', 'The program was full or had a closed intake', 'The process was too overwhelming to finish'],
      q22: 'Yes, often',
      q23: 'I needed temporary emergency support for dental and food while transitioning jobs, but standard assistance said I was not eligible.',
      q24: 5,
      q25: ['They give up and stop seeking help', 'Problems get worse before getting addressed', 'Feelings of isolation and distress'],
      q26: 'Yes',
      q27: ['Helping them make phone calls or apply for programs', 'Providing emotional support and listening', 'Finding information on where to go'],
      q28: 'Somewhat difficult',
      q29: ['A dedicated advocate or navigator who follows up', 'Emergency micro-grants for immediate basic needs', 'Clear step-by-step guidance on services'],
      q30: 'Having a centralized navigator who stays with you until you are connected to the right support.',
      q31: 'The gap for working individuals who make just above income thresholds but still cannot afford basic necessities.',
      q32: 'Direct communication between community agencies so people do not have to retell their traumatic stories 5 times.',
      q33: ['Housing stability & emergency shelter', 'Food security & grocery support', 'Mental health & addiction recovery'],
      q34: 'Housing stability & emergency shelter',
      q35: 'Without a stable roof over your head, it is impossible to heal, find work, or take care of your family.',
      q36: 'Understanding real wait times and actual service accessibility across rural and urban NL.',
      q37: ['Complete transparency and no bureaucratic red tape', 'Focusing on direct, practical assistance', 'Listening to lived community voices'],
      q38: 'If it becomes another slow bureaucracy that gives people the runaround.',
      q39: ['Direct community demand & reported gaps', 'Speed & feasibility of practical implementation', 'Filling holes other organizations cannot touch'],
      q40: 'Seeing seniors in my neighborhood choose between heating fuel and groceries in the winter.',
      q41: 'That asking for help is not a failure, and that you do not have to carry everything by yourself.',
      q42: 'A quick-response community navigator with micro-support funds for unexpected crises.',
      q43: 'Thank you for doing this research and listening to the people on the ground.',
      q44: 'Yes',
      q45: 'Fill the Gap website',
      q46: 'test-community@fillthegapnl.org',
    });
  }

  // --------------------------------------------------------------------------
  // 3. Professional Surveys (Public Insert -> Firestore Database + Cache)
  // --------------------------------------------------------------------------
  static getProfessionalSurveys(): ProfessionalSurveyResponse[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.PROFESSIONAL_SURVEYS);
      const parsed = raw ? JSON.parse(raw) : [];
      const legacyRaw = localStorage.getItem('ftg_professional_surveys_v1');
      const legacyParsed = legacyRaw ? JSON.parse(legacyRaw) : [];

      const map = new Map<string, ProfessionalSurveyResponse>();
      if (Array.isArray(legacyParsed)) {
        legacyParsed.forEach(s => {
          if (s && s.id) map.set(s.id, s);
        });
      }
      if (Array.isArray(parsed)) {
        parsed.forEach(s => {
          if (s && s.id) map.set(s.id, s);
        });
      }
      if (Array.isArray(memoryProfessionalSurveys)) {
        memoryProfessionalSurveys.forEach(s => {
          if (s && s.id) map.set(s.id, s);
        });
      }
      const res = Array.from(map.values())
        .filter(s => !s.id?.startsWith('prof-seed-'))
        .sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());

      memoryProfessionalSurveys = res;
      return res;
    } catch {
      return (memoryProfessionalSurveys || []).filter(s => !s.id?.startsWith('prof-seed-'));
    }
  }

  static async addProfessionalSurvey(data: Omit<ProfessionalSurveyResponse, 'id'>): Promise<{ success: boolean; id: string }> {
    const id = 'prof-' + Date.now().toString(36) + '-' + Math.random().toString(36).substring(2, 6);
    const newRecord: ProfessionalSurveyResponse = {
      id,
      ...data,
      submittedAt: data.submittedAt || new Date().toISOString(),
    };

    // 1. Update memory & local storage
    try {
      const existing = this.getProfessionalSurveys();
      const updated = [newRecord, ...existing.filter(s => s.id !== id)].sort(
        (a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
      );
      memoryProfessionalSurveys = updated;
      localStorage.setItem(STORAGE_KEYS.PROFESSIONAL_SURVEYS, JSON.stringify(updated));
      notifyStoreUpdated();
    } catch (e) {
      console.warn('Local storage write warning:', e);
    }

    // 2. Persist to Cloud Firestore
    try {
      await setDoc(doc(db, 'professional_surveys', id), newRecord);
    } catch (err) {
      console.warn('[Firestore] Professional survey write warning:', err);
    }

    // 3. Backup to Express API backend
    if (typeof window !== 'undefined') {
      try {
        fetch('/api/surveys/professional', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newRecord),
        }).catch(() => {});
      } catch {}
    }

    notifyStoreUpdated();
    return { success: true, id };
  }

  static async deleteProfessionalSurvey(id: string): Promise<void> {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.PROFESSIONAL_SURVEYS);
      const parsed: ProfessionalSurveyResponse[] = raw ? JSON.parse(raw) : [];
      const remaining = parsed.filter(s => s.id !== id);
      memoryProfessionalSurveys = memoryProfessionalSurveys.filter(s => s.id !== id);
      localStorage.setItem(STORAGE_KEYS.PROFESSIONAL_SURVEYS, JSON.stringify(remaining));
      notifyStoreUpdated();
    } catch {}
  }

  static async addTestProfessionalSurvey(): Promise<{ success: boolean; id: string }> {
    const orgs = ['Community Health NL', 'St. John’s Housing First Coalition', 'Eastern Youth Outreach', 'Avalon Family Care Centre', 'NL Legal Support Alliance'];
    const roles = ['Executive Director', 'Frontline Social Worker', 'Community Case Manager', 'Outreach Coordinator', 'Crisis Support Worker'];
    const sectors = ['Healthcare & Mental Health', 'Housing & Homelessness Support', 'Community Non-Profit Services', 'Family & Child Services', 'Legal & Advocacy Services'];
    const randomOrg = orgs[Math.floor(Math.random() * orgs.length)];
    const randomRole = roles[Math.floor(Math.random() * roles.length)];
    const randomSector = sectors[Math.floor(Math.random() * sectors.length)];

    return this.addProfessionalSurvey({
      submittedAt: new Date().toISOString(),
      q1: randomSector,
      sector: randomSector,
      q2: '6–10 years',
      q3: randomRole,
      role: randomRole,
      q4: "St. John's Metro & Surrounding Eastern NL",
      q5: ['Emergency housing & shelter', 'Food security & grocery vouchers', 'Mental health & addiction recovery navigation', 'Transportation to essential medical care'],
      q6: ['Emergency housing & shelter', 'Mental health & addiction recovery navigation', 'Transportation to essential medical care'],
      q7: 'Emergency housing & shelter',
      q8: 'Daily / Multiple times a day',
      q9: 'Very often — most clients present with compound intersecting needs',
      q10: ['Strict and inflexible eligibility criteria', 'Severe waitlists (weeks to months)', 'Lack of accessible transit in non-urban hubs', 'Digital barriers and confusing paperwork'],
      barriers: ['Strict and inflexible eligibility criteria', 'Severe waitlists (weeks to months)', 'Lack of accessible transit in non-urban hubs'],
      q11: ['Severe waitlists (weeks to months)', 'Strict and inflexible eligibility criteria', 'Lack of accessible transit in non-urban hubs'],
      q12: 'Often — clients experience burnout and exhaustion after multiple rejections',
      frequencyFallingThrough: 'Often — clients experience burnout after multiple rejections',
      q13: ['Exhaustion from repeated retelling of personal trauma', 'Inability to reach human staff on phone lines', 'Lack of emergency interim relief while waiting'],
      q14: 'Multiple times per week',
      q15: 'Often difficult because programs are full, criteria changed, or contacts are out of date',
      q16: ['Outdated contact or intake details', 'Unclear or changing mandates', 'No warm handoff or referral confirmation mechanism'],
      q17: 'Frequently (30–50% of the time)',
      q18: 'Clients return back to square one in greater distress or end up in hospital emergency departments.',
      referralFailureReason: 'Clients return back to square one in greater distress or end up in hospital emergency rooms.',
      q19: 'Weekly',
      q20: ['People who earn slightly above income thresholds for income support', 'Youth aging out of child welfare systems', 'Individuals with dual diagnosis (mental health + neurodivergence/physical disability)'],
      q21: 'Frequently — there is no clear agency mandated for low-barrier crisis navigation',
      q22: 'Direct bridge funding, immediate emergency transport vouchers, and personal casework navigation.',
      q23: 'Difficult — information is fragmented across dozens of separate PDFs and outdated websites.',
      q24: 'Weekly or more often',
      q25: ['A single shared live community directory maintained by frontline workers', 'Real-time intake status alerts (Open/Full/Waitlist)', 'Direct caseworker contact lines without phone trees'],
      q26: 'The Gathering Place and local food banks do heroic work with very limited funding.',
      q27: 'Warm human hospitality, non-judgmental low barrier entrance, and immediate hot meals.',
      q28: 'Yes',
      q29: 'Community free pantry networks and volunteer emergency driver networks.',
      q30: ['A centralized 24/7 navigation coordinator', 'Emergency small grants without 30-day paperwork delays', 'Shared client referral tracking to stop trauma re-telling'],
      q31: 'Allowing caseworkers to authorize up to $150 in emergency aid immediately for groceries or prescriptions.',
      q32: 'Adults without dependents who are working minimum wage jobs but have zero safety net when an unexpected medical expense hits.',
      q33: 'The requirement to exhaust every single dollar of personal savings before qualifying for emergency shelter or basic support.',
      q34: 'Talk directly to people who were turned away from services in the past 6 months to map where the safety net is torn.',
      q35: ['Open and transparent communication', 'No duplication of existing programs', 'Dedicated focus on practical frontline execution'],
      q36: 'Creating another layer of administration that consumes donations without helping individuals directly.',
      q37: 'Do not create another static phone directory that gets outdated in 6 months.',
      q38: 'Start with direct emergency support and expand as trust is earned from the community.',
      q39: 'People are not lazy or gaming the system; the cost of living and housing crisis has pushed normal working families to the brink.',
      q40: 'Partnerships and data sharing save lives; protecting organizational silos hurts the community.',
      q41: 'Emergency crisis intervention costs 10x more than preventative bridge funding.',
      q42: 'That a small $200 barrier (like car repair or utility disconnection) can trigger total homelessness.',
      q43: 'We strongly welcome Fill the Gap and are ready to partner and refer clients.',
      q44: 'Yes',
      q45: 'Email',
      q46Name: 'Sarah Mercer, BSW',
      q46Org: 'St. John’s Frontline Outreach',
      q46Email: 'sarah@frontlineoutreachnl.ca',
      q46Phone: '709-700-4491',
    });
  }

  // --------------------------------------------------------------------------
  // 4. Donations Records
  // --------------------------------------------------------------------------
  static getDonations(): DonationRecord[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.DONATIONS);
      const parsed = raw ? JSON.parse(raw) : [];
      const legacyRaw = localStorage.getItem('ftg_donations_records_v1');
      const legacyParsed = legacyRaw ? JSON.parse(legacyRaw) : [];

      const map = new Map<string, DonationRecord>();
      if (Array.isArray(legacyParsed)) {
        legacyParsed.forEach(d => {
          if (d && d.id) map.set(d.id, d);
        });
      }
      if (Array.isArray(parsed)) {
        parsed.forEach(d => {
          if (d && d.id) map.set(d.id, d);
        });
      }
      if (Array.isArray(memoryDonations)) {
        memoryDonations.forEach(d => {
          if (d && d.id) map.set(d.id, d);
        });
      }
      const res = Array.from(map.values()).sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      memoryDonations = res;
      return res;
    } catch {
      return memoryDonations || [];
    }
  }

  static async addDonation(donation: Omit<DonationRecord, 'id'>): Promise<DonationRecord> {
    const id = 'don-' + Date.now().toString(36) + '-' + Math.random().toString(36).substring(2, 6);
    const newRecord: DonationRecord = {
      id,
      ...donation,
    };
    const existing = this.getDonations();
    const updated = [newRecord, ...existing.filter(d => d.id !== id)].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    memoryDonations = updated;
    try {
      localStorage.setItem(STORAGE_KEYS.DONATIONS, JSON.stringify(updated));
    } catch {}
    notifyStoreUpdated();

    // Persist to Firestore
    try {
      setDoc(doc(db, 'donations', id), newRecord).catch(() => {});
    } catch {}

    if (typeof window !== 'undefined') {
      try {
        fetch('/api/donations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newRecord),
        }).catch(() => {});
      } catch {}
    }

    notifyStoreUpdated();
    return newRecord;
  }

  static async deleteDonation(id: string): Promise<void> {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.DONATIONS);
      const parsed: DonationRecord[] = raw ? JSON.parse(raw) : [];
      const remaining = parsed.filter(d => d.id !== id);
      memoryDonations = memoryDonations.filter(d => d.id !== id);
      localStorage.setItem(STORAGE_KEYS.DONATIONS, JSON.stringify(remaining));
      notifyStoreUpdated();
    } catch {}
  }

  static async updateDonationStatus(id: string, status: 'Received' | 'Pledged' | 'Verified'): Promise<void> {
    try {
      const existing = this.getDonations().map(d => (d.id === id ? { ...d, status } : d));
      memoryDonations = existing;
      localStorage.setItem(STORAGE_KEYS.DONATIONS, JSON.stringify(existing));
      notifyStoreUpdated();
    } catch {}
  }

  // --------------------------------------------------------------------------
  // 5. Contact Messages
  // --------------------------------------------------------------------------
  static getContactMessages(): ContactMessageRecord[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.CONTACT_MESSAGES);
      const parsed = raw ? JSON.parse(raw) : [];
      const map = new Map<string, ContactMessageRecord>();
      if (Array.isArray(parsed)) {
        parsed.forEach(m => {
          if (m && m.id) map.set(m.id, m);
        });
      }
      if (Array.isArray(memoryContactMessages)) {
        memoryContactMessages.forEach(m => {
          if (m && m.id) map.set(m.id, m);
        });
      }
      const res = Array.from(map.values()).sort(
        (a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
      );
      memoryContactMessages = res;
      return res;
    } catch {
      return memoryContactMessages || [];
    }
  }

  static async addContactMessage(message: Omit<ContactMessageRecord, 'id' | 'submittedAt' | 'status'> & { status?: ContactMessageRecord['status'] }): Promise<ContactMessageRecord> {
    const id = 'msg-' + Date.now().toString(36) + '-' + Math.random().toString(36).substring(2, 6);
    const newRecord: ContactMessageRecord = {
      id,
      submittedAt: new Date().toISOString(),
      status: message.status || 'Unread',
      ...message,
    };
    const existing = this.getContactMessages();
    const updated = [newRecord, ...existing.filter(m => m.id !== id)].sort(
      (a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
    );
    memoryContactMessages = updated;
    try {
      localStorage.setItem(STORAGE_KEYS.CONTACT_MESSAGES, JSON.stringify(updated));
    } catch {}
    notifyStoreUpdated();

    // Persist to Firestore
    try {
      setDoc(doc(db, 'contact_messages', id), newRecord).catch(() => {});
    } catch {}

    if (typeof window !== 'undefined') {
      try {
        fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newRecord),
        }).catch(() => {});
      } catch {}
    }

    return newRecord;
  }

  static async updateContactMessageStatus(id: string, status: ContactMessageRecord['status']): Promise<void> {
    try {
      const existing = this.getContactMessages().map(m => (m.id === id ? { ...m, status } : m));
      memoryContactMessages = existing;
      localStorage.setItem(STORAGE_KEYS.CONTACT_MESSAGES, JSON.stringify(existing));
      notifyStoreUpdated();
    } catch {}
  }

  static async deleteContactMessage(id: string): Promise<void> {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.CONTACT_MESSAGES);
      const parsed: ContactMessageRecord[] = raw ? JSON.parse(raw) : [];
      const remaining = parsed.filter(m => m.id !== id);
      memoryContactMessages = memoryContactMessages.filter(m => m.id !== id);
      localStorage.setItem(STORAGE_KEYS.CONTACT_MESSAGES, JSON.stringify(remaining));
      notifyStoreUpdated();
    } catch {}
  }

  // --------------------------------------------------------------------------
  // 6. Real-Time Cloud Firestore Sync & Fetch
  // --------------------------------------------------------------------------
  static async fetchServerData(): Promise<{ success: boolean; error?: string }> {
    const now = Date.now();
    if (this.activeFetchPromise) {
      return this.activeFetchPromise;
    }
    if (now - this.lastFetchTime < 1000) {
      return { success: true };
    }

    this.activeFetchPromise = (async () => {
      try {
        this.lastFetchTime = Date.now();

        // 1. Fetch from Firestore collections if configured
        if (db) {
          try {
            // Community surveys
            const commSnap = await getDocs(collection(db, 'community_surveys'));
          const firestoreComm: CommunitySurveyResponse[] = [];
          commSnap.forEach((d) => firestoreComm.push({ id: d.id, ...(d.data() as any) }));
          if (firestoreComm.length > 0) {
            const localComm = this.getCommunitySurveys();
            const map = new Map<string, CommunitySurveyResponse>();
            localComm.forEach((s) => s && s.id && map.set(s.id, s));
            firestoreComm.forEach((s) => s && s.id && map.set(s.id, s));
            const merged = Array.from(map.values()).sort(
              (a, b) => new Date(b.submittedAt || 0).getTime() - new Date(a.submittedAt || 0).getTime()
            );
            memoryCommunitySurveys = merged;
            localStorage.setItem(STORAGE_KEYS.COMMUNITY_SURVEYS, JSON.stringify(merged));
          }

          // Professional surveys
          const profSnap = await getDocs(collection(db, 'professional_surveys'));
          const firestoreProf: ProfessionalSurveyResponse[] = [];
          profSnap.forEach((d) => firestoreProf.push({ id: d.id, ...(d.data() as any) }));
          if (firestoreProf.length > 0) {
            const localProf = this.getProfessionalSurveys();
            const map = new Map<string, ProfessionalSurveyResponse>();
            localProf.forEach((s) => s && s.id && map.set(s.id, s));
            firestoreProf.forEach((s) => s && s.id && map.set(s.id, s));
            const merged = Array.from(map.values()).sort(
              (a, b) => new Date(b.submittedAt || 0).getTime() - new Date(a.submittedAt || 0).getTime()
            );
            memoryProfessionalSurveys = merged;
            localStorage.setItem(STORAGE_KEYS.PROFESSIONAL_SURVEYS, JSON.stringify(merged));
          }

          // Visits
          const visSnap = await getDocs(collection(db, 'visits'));
          const firestoreVis: VisitRecord[] = [];
          visSnap.forEach((d) => firestoreVis.push({ id: d.id, ...(d.data() as any) }));
          if (firestoreVis.length > 0) {
            const localVis = this.getVisits();
            const map = new Map<string, VisitRecord>();
            localVis.forEach((v) => v && v.id && map.set(v.id, v));
            firestoreVis.forEach((v) => v && v.id && map.set(v.id, v));
            const merged = Array.from(map.values()).sort(
              (a, b) => new Date(b.timestamp || 0).getTime() - new Date(a.timestamp || 0).getTime()
            );
            memoryVisits = merged;
            localStorage.setItem(STORAGE_KEYS.VISITS, JSON.stringify(merged));
          }
        } catch (firestoreErr) {
          console.warn('[AdminStore] Firestore direct fetch notice:', firestoreErr);
        }
      }

        // 2. Also check Express API route if available
        if (typeof window !== 'undefined') {
          try {
            const serverRes = await fetch('/api/admin/data');
            if (serverRes.ok) {
              const json = await serverRes.json();
              if (json && json.success && json.data) {
                if (Array.isArray(json.data.communitySurveys) && json.data.communitySurveys.length > 0) {
                  const localComm = this.getCommunitySurveys();
                  const commMap = new Map<string, CommunitySurveyResponse>();
                  localComm.forEach(s => s && s.id && commMap.set(s.id, s));
                  json.data.communitySurveys.forEach((s: any) => s && s.id && commMap.set(s.id, s));
                  const merged = Array.from(commMap.values()).sort(
                    (a, b) => new Date(b.submittedAt || (b as any).submitted_at || 0).getTime() - new Date(a.submittedAt || (a as any).submitted_at || 0).getTime()
                  );
                  memoryCommunitySurveys = merged;
                  localStorage.setItem(STORAGE_KEYS.COMMUNITY_SURVEYS, JSON.stringify(merged));
                }

                if (Array.isArray(json.data.professionalSurveys) && json.data.professionalSurveys.length > 0) {
                  const localProf = this.getProfessionalSurveys();
                  const profMap = new Map<string, ProfessionalSurveyResponse>();
                  localProf.forEach(s => s && s.id && profMap.set(s.id, s));
                  json.data.professionalSurveys.forEach((s: any) => s && s.id && profMap.set(s.id, s));
                  const merged = Array.from(profMap.values()).sort(
                    (a, b) => new Date(b.submittedAt || (b as any).submitted_at || 0).getTime() - new Date(a.submittedAt || (a as any).submitted_at || 0).getTime()
                  );
                  memoryProfessionalSurveys = merged;
                  localStorage.setItem(STORAGE_KEYS.PROFESSIONAL_SURVEYS, JSON.stringify(merged));
                }
              }
            }
          } catch {}
        }

        notifyStoreUpdated();
        return { success: true };
      } catch (err: any) {
        console.warn('[AdminStore] Data fetch warning:', err);
        notifyStoreUpdated();
        return { success: false, error: err?.message };
      }
    })().finally(() => {
      this.activeFetchPromise = null;
    });

    return this.activeFetchPromise;
  }

  // Push local data into Cloud Firestore
  static async syncLocalToServer(): Promise<{ success: boolean; message?: string }> {
    let syncedCount = 0;
    const localComm = this.getCommunitySurveys();
    const localProf = this.getProfessionalSurveys();
    const localMsg = this.getContactMessages();
    const localDon = this.getDonations();
    const localVis = this.getVisits();

    try {
      // Sync Community Surveys
      for (const s of localComm) {
        if (s && s.id) {
          await setDoc(doc(db, 'community_surveys', s.id), s);
          syncedCount++;
        }
      }

      // Sync Professional Surveys
      for (const p of localProf) {
        if (p && p.id) {
          await setDoc(doc(db, 'professional_surveys', p.id), p);
          syncedCount++;
        }
      }

      // Sync Visits
      for (const v of localVis.slice(0, 500)) {
        if (v && v.id) {
          await setDoc(doc(db, 'visits', v.id), v);
          syncedCount++;
        }
      }

      // Sync Contact messages
      for (const m of localMsg) {
        if (m && m.id) {
          await setDoc(doc(db, 'contact_messages', m.id), m);
          syncedCount++;
        }
      }

      // Sync Donations
      for (const d of localDon) {
        if (d && d.id) {
          await setDoc(doc(db, 'donations', d.id), d);
          syncedCount++;
        }
      }
    } catch (e: any) {
      console.warn('[Firestore] Sync warning:', e);
    }

    // Refetch and notify
    await this.fetchServerData();

    return {
      success: true,
      message: `Successfully synchronized ${syncedCount} records to Firebase Cloud Firestore!`,
    };
  }

  // --------------------------------------------------------------------------
  // 7. Authentication & Credentials
  // --------------------------------------------------------------------------
  static getCredentials(): AdminCredentials {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.CREDENTIALS);
      if (raw) {
        return JSON.parse(raw);
      }
    } catch {}
    return {
      username: 'info@fillthegapnl.ca',
      passwordHash: '',
      updatedAt: new Date().toISOString(),
    };
  }

  static setCredentials(username: string, passwordPlain: string): void {
    const creds: AdminCredentials = {
      username: username.trim(),
      passwordHash: passwordPlain.trim(),
      updatedAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEYS.CREDENTIALS, JSON.stringify(creds));
  }

  static isSessionAuthenticated(): boolean {
    try {
      const session = sessionStorage.getItem(STORAGE_KEYS.AUTH_SESSION);
      return Boolean(session);
    } catch {
      return false;
    }
  }

  static async login(emailOrUsername: string, passwordPlain: string): Promise<{ success: boolean; error?: string }> {
    const trimmedInput = emailOrUsername.trim().toLowerCase();
    const trimmedPassword = passwordPlain.trim();
    const creds = this.getCredentials();
    const envPassword = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_ADMIN_PASSWORD) || '';

    // 1. Verify against saved credentials if configured
    if (creds.passwordHash && creds.passwordHash.length > 0) {
      if (
        (trimmedInput === creds.username.toLowerCase() || trimmedInput === 'admin' || trimmedInput === 'info@fillthegapnl.ca') &&
        trimmedPassword === creds.passwordHash
      ) {
        sessionStorage.setItem(STORAGE_KEYS.AUTH_SESSION, 'ftg-admin-session-' + Date.now());
        try {
          await this.fetchServerData();
        } catch {}
        return { success: true };
      }
    }

    // 2. Verify against environment variable if provided
    if (envPassword && trimmedPassword === envPassword) {
      sessionStorage.setItem(STORAGE_KEYS.AUTH_SESSION, 'ftg-admin-session-' + Date.now());
      try {
        await this.fetchServerData();
      } catch {}
      return { success: true };
    }

    // 3. First-time setup: If no password is set yet in localStorage, set it on initial login
    if ((trimmedInput === 'admin' || trimmedInput === 'info@fillthegapnl.ca') && (!creds.passwordHash || creds.passwordHash === '')) {
      if (trimmedPassword.length >= 4) {
        this.setCredentials(trimmedInput, trimmedPassword);
        sessionStorage.setItem(STORAGE_KEYS.AUTH_SESSION, 'ftg-admin-session-' + Date.now());
        try {
          await this.fetchServerData();
        } catch {}
        return { success: true };
      }
    }

    return { success: false, error: 'Invalid username or password.' };
  }

  static async logout(): Promise<void> {
    try {
      sessionStorage.removeItem(STORAGE_KEYS.AUTH_SESSION);
      memoryCommunitySurveys = [];
      memoryProfessionalSurveys = [];
      memoryContactMessages = [];
      memoryDonations = [];
      memoryVisits = [];
      notifyStoreUpdated();
    } catch {}
  }

  // --------------------------------------------------------------------------
  // Bulk Import / Google Sheet Sync for Community Surveys
  // --------------------------------------------------------------------------
  static async importCommunitySurveysFromCsv(csvText: string): Promise<{ count: number; error?: string }> {
    try {
      const lines = csvText.trim().split(/\r?\n/);
      if (lines.length < 2) {
        return { count: 0, error: 'CSV file is empty or missing data rows.' };
      }

      // Simple CSV row parser handling quotes
      const parseCsvLine = (line: string): string[] => {
        const result: string[] = [];
        let current = '';
        let inQuotes = false;
        for (let i = 0; i < line.length; i++) {
          const char = line[i];
          if (char === '"' || char === '“' || char === '”') {
            inQuotes = !inQuotes;
          } else if (char === ',' && !inQuotes) {
            result.push(current.trim().replace(/^["']|["']$/g, ''));
            current = '';
          } else {
            current += char;
          }
        }
        result.push(current.trim().replace(/^["']|["']$/g, ''));
        return result;
      };

      const headers = parseCsvLine(lines[0]);
      let importedCount = 0;

      for (let i = 1; i < lines.length; i++) {
        if (!lines[i].trim()) continue;
        const row = parseCsvLine(lines[i]);
        if (row.length === 0 || row.every(val => !val)) continue;

        // Build survey response object matching Q1..Q46
        const record: any = {
          submittedAt: new Date().toISOString(),
        };

        // If first column looks like a timestamp (typical of Google Forms)
        if (row[0] && (row[0].includes('/') || row[0].includes('-') || row[0].includes(':'))) {
          try {
            const parsedDate = new Date(row[0]);
            if (!isNaN(parsedDate.getTime())) {
              record.submittedAt = parsedDate.toISOString();
            }
          } catch {}
        }

        // Map column indices or headers to q1..q46
        for (let col = 0; col < row.length; col++) {
          const val = row[col];
          if (!val) continue;

          // Check if header contains Q number, e.g. "Q1", "Q2", "1.", etc.
          const header = headers[col] || '';
          const matchQ = header.match(/Q\s*(\d+)/i) || header.match(/^(\d+)[\.\:]/);
          
          let targetField = '';
          if (matchQ && matchQ[1]) {
            targetField = `q${matchQ[1]}`;
          } else {
            // Sequential mapping if no explicit Q header (skip timestamp column 0)
            const qNum = col;
            if (qNum >= 1 && qNum <= 46) {
              targetField = `q${qNum}`;
            }
          }

          if (targetField) {
            // If value contains commas or semicolons for multi-choice questions
            if (val.includes(';') || (val.includes(',') && !val.includes('St. John'))) {
              record[targetField] = val.split(/[;,]/).map(s => s.trim()).filter(Boolean);
            } else {
              record[targetField] = val;
            }
          }
        }

        await this.addCommunitySurvey(record);
        importedCount++;
      }

      notifyStoreUpdated();
      return { count: importedCount };
    } catch (err: any) {
      console.error('Error importing CSV:', err);
      return { count: 0, error: err?.message || 'Failed to parse CSV' };
    }
  }

  // --------------------------------------------------------------------------
  // 8. Custom Brand Mascot & Hero Images
  // --------------------------------------------------------------------------
  static getCustomMascotImage(): string | null {
    try {
      return localStorage.getItem(STORAGE_KEYS.CUSTOM_MASCOT_IMAGE);
    } catch {
      return null;
    }
  }

  static setCustomMascotImage(base64Data: string): void {
    try {
      localStorage.setItem(STORAGE_KEYS.CUSTOM_MASCOT_IMAGE, base64Data);
      notifyStoreUpdated();
    } catch {}
  }

  static clearCustomMascotImage(): void {
    try {
      localStorage.removeItem(STORAGE_KEYS.CUSTOM_MASCOT_IMAGE);
      notifyStoreUpdated();
    } catch {}
  }

  static getCustomHeroImage(): string | null {
    try {
      return localStorage.getItem(STORAGE_KEYS.CUSTOM_HERO_IMAGE);
    } catch {
      return null;
    }
  }

  static setCustomHeroImage(base64Data: string): void {
    try {
      localStorage.setItem(STORAGE_KEYS.CUSTOM_HERO_IMAGE, base64Data);
      notifyStoreUpdated();
    } catch {}
  }

  static clearCustomHeroImage(): void {
    try {
      localStorage.removeItem(STORAGE_KEYS.CUSTOM_HERO_IMAGE);
      notifyStoreUpdated();
    } catch {}
  }

  // --------------------------------------------------------------------------
  // 9. Google Integration Config (Fallback / Supplementary)
  // --------------------------------------------------------------------------
  static getGoogleConfig(): GoogleIntegrationConfig {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.GOOGLE_CONFIG);
      if (raw) {
        const parsed = JSON.parse(raw);
        // Overwrite any stale mock/dummy form URLs
        if (!parsed.professionalFormUrl || parsed.professionalFormUrl.includes('professional_fillthegap')) {
          parsed.professionalFormUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSe-dE9Qn93on48qiv7y2qHzDI7wdUqZjNtIJ8NvGaZ04ijmbg/viewform?usp=header';
        }
        if (!parsed.communityFormUrl || parsed.communityFormUrl.includes('community_fillthegap')) {
          parsed.communityFormUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSdUbd7uHKfjodSI6qiixViDSO03lpE9fLEEzvqxs5uw9jWgtg/viewform?usp=header';
        }
        return { ...DEFAULT_GOOGLE_CONFIG, ...parsed };
      }
    } catch {}
    return { ...DEFAULT_GOOGLE_CONFIG };
  }

  static saveGoogleConfig(partial: Partial<GoogleIntegrationConfig>): GoogleIntegrationConfig {
    const current = this.getGoogleConfig();
    const updated = { ...current, ...partial };
    try {
      localStorage.setItem(STORAGE_KEYS.GOOGLE_CONFIG, JSON.stringify(updated));
      notifyStoreUpdated();
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('ftg_google_config_updated', { detail: updated }));
      }
    } catch (e) {
      console.error('Failed to save Google config:', e);
    }
    return updated;
  }

  private static parseGoogleSheetCsvRows(csvText: string): number {
    if (!csvText || typeof csvText !== 'string') return 0;
    const lines = csvText.trim().split(/\r?\n/).filter((l) => l.trim().length > 0);
    return Math.max(0, lines.length - 1);
  }

  static async syncWithGoogleSheets(force: boolean = false): Promise<{
    success: boolean;
    communityCount: number;
    professionalCount: number;
    error?: string;
  }> {
    const config = this.getGoogleConfig();
    let communityCount = config.communityCountFromSheet || 0;
    let professionalCount = config.professionalCountFromSheet || 0;
    let errorMessages: string[] = [];

    this.saveGoogleConfig({ lastSyncStatus: 'syncing', lastSyncError: undefined });

    try {
      if (config.communitySheetCsvUrl && config.communitySheetCsvUrl.trim().startsWith('http')) {
        try {
          const res = await fetch(config.communitySheetCsvUrl.trim(), { cache: 'no-store' });
          if (res.ok) {
            const csv = await res.text();
            communityCount = this.parseGoogleSheetCsvRows(csv);
          } else {
            errorMessages.push(`Community Sheet returned status ${res.status}`);
          }
        } catch (e: any) {
          console.warn('Community Sheet sync warning:', e);
          errorMessages.push(`Community Sheet sync notice: ${e?.message || 'Network error'}`);
        }
      }

      if (config.professionalSheetCsvUrl && config.professionalSheetCsvUrl.trim().startsWith('http')) {
        try {
          const res = await fetch(config.professionalSheetCsvUrl.trim(), { cache: 'no-store' });
          if (res.ok) {
            const csv = await res.text();
            professionalCount = this.parseGoogleSheetCsvRows(csv);
          } else {
            errorMessages.push(`Professional Sheet returned status ${res.status}`);
          }
        } catch (e: any) {
          console.warn('Professional Sheet sync warning:', e);
          errorMessages.push(`Professional Sheet sync notice: ${e?.message || 'Network error'}`);
        }
      }

      const updated = this.saveGoogleConfig({
        communityCountFromSheet: communityCount,
        professionalCountFromSheet: professionalCount,
        lastSyncedAt: new Date().toISOString(),
        lastSyncStatus: errorMessages.length > 0 && !communityCount && !professionalCount ? 'error' : 'success',
        lastSyncError: errorMessages.length > 0 ? errorMessages.join('; ') : undefined,
      });

      return {
        success: updated.lastSyncStatus === 'success',
        communityCount,
        professionalCount,
        error: updated.lastSyncError,
      };
    } catch (err: any) {
      this.saveGoogleConfig({
        lastSyncStatus: 'error',
        lastSyncError: err?.message || 'Failed to sync with Google Sheets',
      });
      return {
        success: false,
        communityCount,
        professionalCount,
        error: err?.message || 'Failed to sync with Google Sheets',
      };
    }
  }

  static getEffectiveCommunityCount(): number {
    const localCount = this.getCommunitySurveys().length;
    const googleCount = this.getGoogleConfig().communityCountFromSheet || 0;
    return Math.max(localCount, googleCount) || (localCount + googleCount);
  }

  static getEffectiveProfessionalCount(): number {
    const localCount = this.getProfessionalSurveys().length;
    const googleCount = this.getGoogleConfig().professionalCountFromSheet || 0;
    return Math.max(localCount, googleCount) || (localCount + googleCount);
  }

  static resetToZero(): void {
    try {
      localStorage.setItem(STORAGE_KEYS.VISITS, JSON.stringify([]));
      localStorage.setItem(STORAGE_KEYS.COMMUNITY_SURVEYS, JSON.stringify([]));
      localStorage.setItem(STORAGE_KEYS.PROFESSIONAL_SURVEYS, JSON.stringify([]));
      localStorage.setItem(STORAGE_KEYS.DONATIONS, JSON.stringify([]));
      localStorage.setItem(STORAGE_KEYS.CONTACT_MESSAGES, JSON.stringify([]));
      localStorage.setItem(STORAGE_KEYS.CLEAN_WIPE_FLAG, 'true');

      memoryVisits = [];
      memoryCommunitySurveys = [];
      memoryProfessionalSurveys = [];
      memoryDonations = [];
      memoryContactMessages = [];

      notifyStoreUpdated();
    } catch (e) {
      console.warn('Error wiping stats:', e);
    }
  }

  static exportAllDataAsJSON(): string {
    const payload = {
      exportDate: new Date().toISOString(),
      platform: 'Fill the Gap NL — Community Analytics Platform',
      websiteUrl: 'https://fillthegapnl.ca',
      database: 'Firebase Cloud Firestore & Local Cache',
      googleIntegration: this.getGoogleConfig(),
      effectiveCommunityCount: this.getEffectiveCommunityCount(),
      effectiveProfessionalCount: this.getEffectiveProfessionalCount(),
      visitsCount: this.getVisits().length,
      visits: this.getVisits(),
      communitySurveysCount: this.getCommunitySurveys().length,
      communitySurveys: this.getCommunitySurveys(),
      professionalSurveysCount: this.getProfessionalSurveys().length,
      professionalSurveys: this.getProfessionalSurveys(),
      donationsCount: this.getDonations().length,
      totalDonationsAmount: this.getDonations().reduce((acc, d) => acc + d.amount, 0),
      donations: this.getDonations(),
      contactMessagesCount: this.getContactMessages().length,
      contactMessages: this.getContactMessages(),
    };
    return JSON.stringify(payload, null, 2);
  }
}

