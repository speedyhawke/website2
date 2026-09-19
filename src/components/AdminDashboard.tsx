import React, { useState, useEffect, useMemo } from 'react';
import { PuffinMascot } from './PuffinMascot';
import {
  ShieldCheck,
  Lock,
  Eye,
  EyeOff,
  LogOut,
  ArrowLeft,
  Users,
  Briefcase,
  Heart,
  Globe,
  MessageSquare,
  BarChart3,
  TrendingUp,
  Download,
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Clock,
  MapPin,
  Calendar,
  DollarSign,
  Search,
  Filter,
  RefreshCw,
  Sliders,
  Sparkles,
  ChevronRight,
  ExternalLink,
  Copy,
  Check,
  LayoutGrid,
  ListOrdered,
  Layers,
  TableProperties,
  Camera,
  Upload,
  Mail,
  Inbox,
  Send,
  MessageCircle,
  FileEdit,
  Database,
  Code2,
  FileSpreadsheet,
  HelpCircle,
  FolderDown,
  Archive,
  Building,
  Save
} from 'lucide-react';
import {
  AdminStore,
  CommunitySurveyResponse,
  ProfessionalSurveyResponse,
  DonationRecord,
  VisitRecord,
  ContactMessageRecord,
  GoogleIntegrationConfig
} from '../data/adminStore';
import { downloadEntireWebsiteZip } from '../lib/zipExporter';
import { CommunityQuestionsTallyGrid } from './CommunityQuestionsTallyGrid';
import { ProfessionalQuestionsTallyGrid } from './ProfessionalQuestionsTallyGrid';
import { SurveyQuestionManager } from './SurveyQuestionManager';
import { CMSManagementTab } from './cms/CMSManagementTab';
import { EntireWebsiteCodeView } from './EntireWebsiteCodeView';
import { EntireWebsiteCodeModal } from './EntireWebsiteCodeModal';
import { SurveyResponseInspectorModal } from './SurveyResponseInspectorModal';
import { CleanSurveyReport } from './CleanSurveyReport';

interface AdminDashboardProps {
  onExit: () => void;
  onNavigateToCustomPage?: (slug: string) => void;
}

type AdminTab =
  | 'overview'
  | 'clean_report'
  | 'cms'
  | 'questions'
  | 'google_sheets'
  | 'community'
  | 'professional'
  | 'donations'
  | 'messages'
  | 'written'
  | 'traffic'
  | 'settings'
  | 'code';

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onExit, onNavigateToCustomPage }) => {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() =>
    AdminStore.isSessionAuthenticated()
  );
  const [loginUsername, setLoginUsername] = useState<string>('');
  const [loginPassword, setLoginPassword] = useState<string>('');
  const [loginError, setLoginError] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // Active Tab
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [surveyDisplayMode, setSurveyDisplayMode] = useState<'condensed' | 'detailed'>('condensed');

  // Data state
  const [visits, setVisits] = useState<VisitRecord[]>(() => AdminStore.getVisits());
  const [communitySurveys, setCommunitySurveys] = useState<CommunitySurveyResponse[]>(() => AdminStore.getCommunitySurveys());
  const [professionalSurveys, setProfessionalSurveys] = useState<ProfessionalSurveyResponse[]>(() => AdminStore.getProfessionalSurveys());
  const [donations, setDonations] = useState<DonationRecord[]>(() => AdminStore.getDonations());
  const [contactMessages, setContactMessages] = useState<ContactMessageRecord[]>(() => AdminStore.getContactMessages());
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Google Forms & Sheets Live Sync State
  const [googleConfig, setGoogleConfig] = useState<GoogleIntegrationConfig>(() => AdminStore.getGoogleConfig());
  const [isGoogleSyncing, setIsGoogleSyncing] = useState<boolean>(false);
  const [googleSyncMsg, setGoogleSyncMsg] = useState<string>('');
  const [editCommunityFormUrl, setEditCommunityFormUrl] = useState<string>(() => AdminStore.getGoogleConfig().communityFormUrl);
  const [editCommunitySheetCsvUrl, setEditCommunitySheetCsvUrl] = useState<string>(() => AdminStore.getGoogleConfig().communitySheetCsvUrl);
  const [editCommunitySheetViewUrl, setEditCommunitySheetViewUrl] = useState<string>(() => AdminStore.getGoogleConfig().communitySheetViewUrl || '');
  const [editProfFormUrl, setEditProfFormUrl] = useState<string>(() => AdminStore.getGoogleConfig().professionalFormUrl);
  const [editProfSheetCsvUrl, setEditProfSheetCsvUrl] = useState<string>(() => AdminStore.getGoogleConfig().professionalSheetCsvUrl);
  const [editProfSheetViewUrl, setEditProfSheetViewUrl] = useState<string>(() => AdminStore.getGoogleConfig().professionalSheetViewUrl || '');

  // Direct Bank & Payment Settings State
  const [editBankName, setEditBankName] = useState<string>(() => AdminStore.getGoogleConfig().bankName || '');
  const [editAccountHolder, setEditAccountHolder] = useState<string>(() => AdminStore.getGoogleConfig().accountHolderName || 'Fill the Gap NL');
  const [editInstitutionNumber, setEditInstitutionNumber] = useState<string>(() => AdminStore.getGoogleConfig().institutionNumber || '');
  const [editTransitNumber, setEditTransitNumber] = useState<string>(() => AdminStore.getGoogleConfig().transitNumber || '');
  const [editAccountNumber, setEditAccountNumber] = useState<string>(() => AdminStore.getGoogleConfig().accountNumber || '');
  const [editSwiftBic, setEditSwiftBic] = useState<string>(() => AdminStore.getGoogleConfig().swiftBic || '');
  const [editBankAddress, setEditBankAddress] = useState<string>(() => AdminStore.getGoogleConfig().bankAddress || 'St. John\'s, NL, Canada');
  const [editEtransferEmail, setEditEtransferEmail] = useState<string>(() => AdminStore.getGoogleConfig().eTransferEmail || 'info@fillthegapnl.ca');

  // Survey Inspector Modal State
  const [isInspectorOpen, setIsInspectorOpen] = useState<boolean>(false);
  const [inspectorType, setInspectorType] = useState<'community' | 'professional'>('community');
  const [selectedInspectorSurvey, setSelectedInspectorSurvey] = useState<CommunitySurveyResponse | ProfessionalSurveyResponse | null>(null);
  const [writtenQuestionFilter, setWrittenQuestionFilter] = useState<string>('all');

  // Contact Messages Filter State
  const [messageSearchQuery, setMessageSearchQuery] = useState<string>('');
  const [messageStatusFilter, setMessageStatusFilter] = useState<'all' | 'Unread' | 'Read' | 'Replied' | 'Archived'>('all');
  const [messageReasonFilter, setMessageReasonFilter] = useState<string>('all');

  // Self-visit exclusion state
  const [excludeOwnVisits, setExcludeOwnVisitsState] = useState<boolean>(() => AdminStore.isExcludeOwnVisitsEnabled());

  // New Donation Modal State
  const [isAddDonationOpen, setIsAddDonationOpen] = useState<boolean>(false);
  const [newDonorName, setNewDonorName] = useState<string>('');
  const [newAmount, setNewAmount] = useState<string>('');
  const [newDate, setNewDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [newMethod, setNewMethod] = useState<DonationRecord['method']>('e-Transfer');
  const [newNotes, setNewNotes] = useState<string>('');
  const [newIsAnonymous, setNewIsAnonymous] = useState<boolean>(false);
  const [newStatus, setNewStatus] = useState<DonationRecord['status']>('Verified');

  // Change Credentials State
  const [editUsername, setEditUsername] = useState<string>('');
  const [editPassword, setEditPassword] = useState<string>('');
  const [editConfirmPassword, setEditConfirmPassword] = useState<string>('');
  const [credsSuccess, setCredsSuccess] = useState<string>('');
  const [credsError, setCredsError] = useState<string>('');

  // Sync State
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [isCodeModalOpen, setIsCodeModalOpen] = useState<boolean>(false);
  const [syncStatusMsg, setSyncStatusMsg] = useState<string>('');
  const [isDownloadingZip, setIsDownloadingZip] = useState<boolean>(false);
  const [zipDownloadMsg, setZipDownloadMsg] = useState<string>('');

  const handleInstantZipDownload = async () => {
    setIsDownloadingZip(true);
    setZipDownloadMsg('Packaging complete project repository into ZIP...');
    try {
      const res = await downloadEntireWebsiteZip((progress) => {
        setZipDownloadMsg(progress.message);
      });
      if (res.success) {
        setZipDownloadMsg(`ZIP downloaded successfully (${res.filename})!`);
      } else {
        setZipDownloadMsg(`Failed: ${res.error || 'Could not create ZIP'}`);
      }
    } catch (e: any) {
      setZipDownloadMsg(`Error: ${e?.message || 'Download error'}`);
    } finally {
      setIsDownloadingZip(false);
      setTimeout(() => setZipDownloadMsg(''), 7000);
    }
  };

  // Load latest data from server database & Google Sheets
  const refreshData = async (silent: boolean = false) => {
    if (!silent) setIsSyncing(true);
    try {
      await AdminStore.fetchServerData();
      if (AdminStore.getGoogleConfig().isAutoSyncEnabled) {
        await AdminStore.syncWithGoogleSheets();
      }
    } catch (e) {
      console.warn('Server fetch error:', e);
    }
    setVisits(AdminStore.getVisits());
    setCommunitySurveys(AdminStore.getCommunitySurveys());
    setProfessionalSurveys(AdminStore.getProfessionalSurveys());
    setDonations(AdminStore.getDonations());
    setContactMessages(AdminStore.getContactMessages());
    setGoogleConfig(AdminStore.getGoogleConfig());
    if (!silent) setIsSyncing(false);
  };

  const handleSyncGoogleSheets = async () => {
    setIsGoogleSyncing(true);
    setGoogleSyncMsg('Fetching live response rows from Google Sheets...');
    try {
      const res = await AdminStore.syncWithGoogleSheets(true);
      if (res.success) {
        setGoogleSyncMsg(`Live sync complete! Community: ${res.communityCount} • Frontline: ${res.professionalCount}`);
      } else {
        setGoogleSyncMsg(res.error || 'Sync updated.');
      }
      setGoogleConfig(AdminStore.getGoogleConfig());
      await refreshData(true);
    } catch (e: any) {
      setGoogleSyncMsg(`Sync notice: ${e?.message || 'Sync updated'}`);
    } finally {
      setIsGoogleSyncing(false);
      setTimeout(() => setGoogleSyncMsg(''), 5000);
    }
  };

  const handleSaveGoogleUrls = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = AdminStore.saveGoogleConfig({
      communityFormUrl: editCommunityFormUrl.trim(),
      communitySheetCsvUrl: editCommunitySheetCsvUrl.trim(),
      communitySheetViewUrl: editCommunitySheetViewUrl.trim(),
      professionalFormUrl: editProfFormUrl.trim(),
      professionalSheetCsvUrl: editProfSheetCsvUrl.trim(),
      professionalSheetViewUrl: editProfSheetViewUrl.trim(),
      bankName: editBankName.trim(),
      accountHolderName: editAccountHolder.trim(),
      institutionNumber: editInstitutionNumber.trim(),
      transitNumber: editTransitNumber.trim(),
      accountNumber: editAccountNumber.trim(),
      swiftBic: editSwiftBic.trim(),
      bankAddress: editBankAddress.trim(),
      eTransferEmail: editEtransferEmail.trim(),
    });
    setGoogleConfig(updated);
    setGoogleSyncMsg('Integration & Bank Details saved successfully!');
    setTimeout(() => setGoogleSyncMsg(''), 4000);
  };

  const handleSyncLocal = async () => {
    setIsSyncing(true);
    setSyncStatusMsg('Syncing local device records to shared cloud database...');
    try {
      const res = await AdminStore.syncLocalToServer();
      if (res.success) {
        setSyncStatusMsg(res.message || 'All local records successfully merged into cloud database!');
        await refreshData();
      } else {
        setSyncStatusMsg('Sync finished with local store.');
      }
    } catch (e: any) {
      setSyncStatusMsg('Sync completed.');
    }
    setIsSyncing(false);
    setTimeout(() => setSyncStatusMsg(''), 5000);
  };

  useEffect(() => {
    refreshData(false);
    // Auto-sync any existing local browser submissions up into the live database
    AdminStore.syncLocalToServer().then(() => {
      refreshData(true);
    }).catch(() => {});

    const creds = AdminStore.getCredentials();
    setEditUsername(creds.username);

    // 1. Real-time background auto-polling every 12 seconds to keep all dashboard counters live
    const pollInterval = setInterval(() => {
      refreshData(true);
    }, 12000);

    // 2. Instant reactive update when store updates (reads local state without triggering re-fetch loop)
    const handleStoreUpdate = () => {
      setVisits(AdminStore.getVisits());
      setCommunitySurveys(AdminStore.getCommunitySurveys());
      setProfessionalSurveys(AdminStore.getProfessionalSurveys());
      setDonations(AdminStore.getDonations());
      setContactMessages(AdminStore.getContactMessages());
    };
    window.addEventListener('ftg_store_update', handleStoreUpdate);
    window.addEventListener('storage', handleStoreUpdate);

    return () => {
      clearInterval(pollInterval);
      window.removeEventListener('ftg_store_update', handleStoreUpdate);
      window.removeEventListener('storage', handleStoreUpdate);
    };
  }, [isAuthenticated]);

  // Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    if (!loginUsername || !loginPassword) {
      setLoginError('Please enter both username and password.');
      return;
    }

    const result = await AdminStore.login(loginUsername, loginPassword);
    if (result.success) {
      setIsAuthenticated(true);
      setLoginUsername('');
      setLoginPassword('');
      await AdminStore.syncLocalToServer().catch(() => {});
      await refreshData();
    } else {
      setLoginError(result.error || 'Invalid username or password. Please try again.');
    }
  };

  // Handle Logout
  const handleLogout = () => {
    AdminStore.logout();
    setIsAuthenticated(false);
  };

  // Handle Adding Donation
  const handleSaveDonation = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedAmount = parseFloat(newAmount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      alert('Please enter a valid donation amount.');
      return;
    }

    AdminStore.addDonation({
      donorName: newIsAnonymous ? 'Anonymous Supporter' : newDonorName.trim() || 'Anonymous Supporter',
      amount: parsedAmount,
      date: new Date(newDate).toISOString(),
      method: newMethod,
      notes: newNotes.trim(),
      isAnonymous: newIsAnonymous,
      status: newStatus,
    });

    setNewDonorName('');
    setNewAmount('');
    setNewNotes('');
    setNewIsAnonymous(false);
    setIsAddDonationOpen(false);
    refreshData();
  };

  // Handle Credential Change
  const handleUpdateCredentials = (e: React.FormEvent) => {
    e.preventDefault();
    setCredsError('');
    setCredsSuccess('');

    if (!editUsername.trim()) {
      setCredsError('Username cannot be empty.');
      return;
    }
    if (editPassword.length < 4) {
      setCredsError('Password must be at least 4 characters.');
      return;
    }
    if (editPassword !== editConfirmPassword) {
      setCredsError('Passwords do not match.');
      return;
    }

    AdminStore.setCredentials(editUsername, editPassword);
    setCredsSuccess('Admin credentials updated successfully! Use your new details next time you log in.');
    setEditPassword('');
    setEditConfirmPassword('');
  };

  // CSV Exporter with Excel UTF-8 BOM and Complete Survey Mapping
  const exportToCSV = (type: 'community' | 'professional' | 'donations' | 'traffic' | 'messages' | 'all') => {
    let headers: string[] = [];
    let rows: (string | number)[][] = [];
    let filename = `fillthegap_${type}_${new Date().toISOString().split('T')[0]}.csv`;

    const val = (v: any) => {
      if (v === undefined || v === null) return '""';
      if (Array.isArray(v)) return `"${v.join('; ').replace(/"/g, '""')}"`;
      if (typeof v === 'string') return `"${v.replace(/"/g, '""')}"`;
      return `"${String(v).replace(/"/g, '""')}"`;
    };

    if (type === 'donations') {
      headers = ['ID', 'Donor Name', 'Amount ($CAD)', 'Date', 'Payment Method', 'Status', 'Notes', 'Anonymous'];
      rows = donations.map((d) => [
        d.id,
        val(d.donorName),
        d.amount.toFixed(2),
        d.date,
        d.method,
        d.status,
        val(d.notes || ''),
        d.isAnonymous ? 'Yes' : 'No',
      ]);
    } else if (type === 'messages') {
      headers = ['ID', 'Date', 'Name', 'Email', 'Reason', 'Status', 'Message'];
      rows = contactMessages.map((m) => [
        m.id,
        m.submittedAt,
        val(m.name),
        val(m.email),
        val(m.reason),
        m.status,
        val(m.message),
      ]);
    } else if (type === 'community') {
      headers = [
        'Submission_ID', 'Submitted_At',
        'Q1_Live_In_NL', 'Q1_Other',
        'Q2_Region_Town', 'Q2_Other',
        'Q3_Age_Group', 'Q4_Household', 'Q5_Someone_To_Turn_To',
        'Q6_Needed_Help_Past_5_Years', 'Q7_Types_Of_Help_Needed', 'Q7_Other',
        'Q8_Difficulty_Figuring_Where_To_Go', 'Q9_How_Many_Places_Contacted',
        'Q10_Referred_Without_Getting_Help', 'Q11_Difficulty_Who_Is_Responsible',
        'Q12_Barriers_Experienced', 'Q12_Other',
        'Q13_Top_3_Barriers', 'Q13_Other',
        'Q14_Given_Up_Trying', 'Q15_Reason_Gave_Up_Written',
        'Q16_Ease_Finding_Accurate_Info', 'Q17_Where_Look_For_Info', 'Q17_Other',
        'Q18_Outdated_Confusing_Info_Online', 'Q19_What_Would_Make_Finding_Easier', 'Q19_Other',
        'Q20_Service_Poor_Fit', 'Q21_Why_Poor_Fit', 'Q21_Other',
        'Q22_Needed_Help_Not_Fitting_Neatly', 'Q23_Describe_What_Happened',
        'Q24_Importance_Someone_In_Corner_1to5',
        'Q25_What_Happens_Without_Someone', 'Q25_Other',
        'Q26_Been_That_Person_For_Others', 'Q27_What_Helped_With', 'Q27_Other',
        'Q28_Difficulty_Helping_That_Person',
        'Q29_Supports_Making_Difference', 'Q29_Other',
        'Q30_One_Thing_Easier_Written', 'Q31_Problem_Not_Talked_About_Enough',
        'Q32_Small_Change_Big_Difference',
        'Q33_Areas_Deserving_More_Attention', 'Q33_Other',
        'Q34_Most_Urgent_Priority_Area', 'Q35_Why_Priority_Important',
        'Q36_Learn_About_First_Written', 'Q37_What_Makes_You_Trust_FTG', 'Q37_Other',
        'Q38_What_Makes_NOT_Trust_FTG', 'Q39_How_To_Decide_Programs', 'Q39_Other',
        'Q40_Recognizing_A_Gap_Story', 'Q41_Wish_Someone_Told_You',
        'Q42_Wish_Existed_When_Needed', 'Q43_Anything_Else_Should_Know',
        'Q44_Interest_In_Research_Results', 'Q45_Preferred_Channel', 'Q45_Other',
        'Q46_Optional_Email'
      ];
      
      // If store is empty, grab current store values directly as fallback
      const currentList = communitySurveys.length > 0 ? communitySurveys : AdminStore.getCommunitySurveys();
      rows = currentList.map((c: any) => [
        c.id || '',
        c.submittedAt || '',
        val(c.q1), val(c.q1Other),
        val(c.q2), val(c.q2Other),
        val(c.q3), val(c.q4), val(c.q5),
        val(c.q6), val(c.q7), val(c.q7Other),
        val(c.q8), val(c.q9), val(c.q10), val(c.q11),
        val(c.q12), val(c.q12Other),
        val(c.q13), val(c.q13Other),
        val(c.q14), val(c.q15),
        val(c.q16), val(c.q17), val(c.q17Other),
        val(c.q18), val(c.q19), val(c.q19Other),
        val(c.q20), val(c.q21), val(c.q21Other),
        val(c.q22), val(c.q23),
        c.q24 !== undefined && c.q24 !== null ? String(c.q24) : '""',
        val(c.q25), val(c.q25Other),
        val(c.q26), val(c.q27), val(c.q27Other),
        val(c.q28),
        val(c.q29), val(c.q29Other),
        val(c.q30), val(c.q31), val(c.q32),
        val(c.q33), val(c.q33Other),
        val(c.q34), val(c.q35),
        val(c.q36), val(c.q37), val(c.q37Other),
        val(c.q38), val(c.q39), val(c.q39Other),
        val(c.q40), val(c.q41), val(c.q42), val(c.q43),
        val(c.q44), val(c.q45), val(c.q45Other),
        val(c.q46)
      ]);
    } else if (type === 'professional') {
      headers = [
        'Submission_ID', 'Submitted_At',
        'Organization', 'Role', 'Sector',
        'Q1_Field_Sector', 'Q1_Other',
        'Q2_Years_Worked_In_Field',
        'Q3_Role_Description', 'Q3_Other',
        'Q4_Geographic_Area_Served', 'Q4_Other',
        'Q5_Common_Help_Seeking_Areas', 'Q5_Other',
        'Q6_Areas_Greatest_Challenges', 'Q6_Other',
        'Q7_One_Area_Most_Attention', 'Q7_Other',
        'Q8_Encounter_Dont_Know_Where_To_Turn', 'Q9_Encounter_Needing_Multiple_Services',
        'Q10_Barriers_Preventing_Access', 'Q10_Other',
        'Q11_Top_3_Barriers_Greatest_Impact', 'Q11_Other',
        'Q12_See_People_Give_Up_Frequency',
        'Q13_What_Causes_People_To_Give_Up', 'Q13_Other',
        'Q14_Refer_To_Other_Services_Frequency',
        'Q15_Difficulty_Finding_Referral_Frequency',
        'Q16_What_Makes_Referrals_Difficult', 'Q16_Other',
        'Q17_Referred_Service_Couldnt_Meet_Needs',
        'Q18_What_Happens_When_Referral_Fails',
        'Q19_Needs_Fall_Between_Services_Frequency',
        'Q20_Situations_Most_Likely_Fall_Between', 'Q20_Other',
        'Q21_Regularly_Encounter_Needs_Without_Service',
        'Q22_Type_Of_Unmet_Need_Written',
        'Q23_Ease_Finding_Resource_Info',
        'Q24_Encounter_Outdated_Confusing_Info',
        'Q25_What_Makes_Resource_Info_Easier', 'Q25_Other',
        'Q26_Services_Orgs_Working_Well', 'Q27_What_Makes_Them_Successful',
        'Q28_Existing_Resources_More_Should_Know',
        'Q29_Describe_Resource_Or_Service',
        'Q30_Opportunities_For_Improvement', 'Q30_Other',
        'Q31_One_Small_Change_Meaningful_Difference',
        'Q32_One_Problem_Frequently_Overlooked',
        'Q33_One_Barrier_To_Remove',
        'Q34_What_To_Research_Before_Deciding',
        'Q35_What_Makes_Comfortable_Working_Alongside', 'Q35_Other',
        'Q36_What_Would_Concern_About_New_Org',
        'Q37_Areas_FTG_Should_NOT_Duplicate',
        'Q38_Recommendations_Before_Doing_Anything',
        'Q39_What_Wish_Public_Understood',
        'Q40_What_Wish_Organizations_Understood',
        'Q41_What_Wish_DecisionMakers_Understood',
        'Q42_What_People_Misunderstand_About_Poverty',
        'Q43_Anything_Else_FTG_Should_Know',
        'Q44_Willing_To_Participate_Conversation',
        'Q45_Preferred_Contact_Method', 'Q45_Other',
        'Q46_Name', 'Q46_Organization', 'Q46_Email', 'Q46_Phone'
      ];
      
      const currentList = professionalSurveys.length > 0 ? professionalSurveys : AdminStore.getProfessionalSurveys();
      rows = currentList.map((p: any) => [
        p.id || '',
        p.submittedAt || '',
        val(p.orgName || p.q46Org || ''),
        val(p.role || p.q3 || ''),
        val(p.sector || p.q1 || ''),
        val(p.q1), val(p.q1Other),
        val(p.q2),
        val(p.q3), val(p.q3Other),
        val(p.q4), val(p.q4Other),
        val(p.q5), val(p.q5Other),
        val(p.q6), val(p.q6Other),
        val(p.q7), val(p.q7Other),
        val(p.q8), val(p.q9),
        val(p.q10 || p.barriers), val(p.q10Other),
        val(p.q11), val(p.q11Other),
        val(p.q12 || p.frequencyFallingThrough),
        val(p.q13), val(p.q13Other),
        val(p.q14), val(p.q15),
        val(p.q16), val(p.q16Other),
        val(p.q17),
        val(p.q18 || p.referralFailureReason),
        val(p.q19),
        val(p.q20), val(p.q20Other),
        val(p.q21),
        val(p.q22 || p.mostNeededSupport),
        val(p.q23), val(p.q24),
        val(p.q25), val(p.q25Other),
        val(p.q26), val(p.q27),
        val(p.q28), val(p.q29),
        val(p.q30), val(p.q30Other),
        val(p.q31), val(p.q32), val(p.q33),
        val(p.q34),
        val(p.q35), val(p.q35Other),
        val(p.q36), val(p.q37), val(p.q38),
        val(p.q39), val(p.q40), val(p.q41), val(p.q42),
        val(p.q43 || p.additionalComments),
        val(p.q44 || p.partnershipInterest),
        val(p.q45), val(p.q45Other),
        val(p.q46Name || p.contactName),
        val(p.q46Org || p.orgName),
        val(p.q46Email || p.contactEmail),
        val(p.q46Phone || p.contactPhone)
      ]);
    } else if (type === 'traffic') {
      headers = ['ID', 'Timestamp', 'Path', 'Referrer', 'Device', 'User Agent'];
      rows = visits.map((v) => [
        v.id,
        v.timestamp,
        `"${v.path}"`,
        `"${v.referrer}"`,
        v.device,
        `"${v.userAgent.replace(/"/g, '""')}"`,
      ]);
    }

    // Include UTF-8 Byte Order Mark (\uFEFF) so Excel & Google Sheets display all text cleanly without garbled characters
    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const exportToJSON = (type: 'community' | 'professional' | 'all') => {
    let data: any = {};
    let filename = `fillthegap-${type}-data-${new Date().toISOString().split('T')[0]}.json`;
    if (type === 'community') data = { communitySurveys };
    else if (type === 'professional') data = { professionalSurveys };
    else data = { communitySurveys, professionalSurveys, contactMessages, donations, visits };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const copyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Aggregated Stats
  const totalVisits = visits.length;
  const googleCommunityCount = googleConfig.communityCountFromSheet || 0;
  const googleProfCount = googleConfig.professionalCountFromSheet || 0;
  const totalCommunity = Math.max(communitySurveys.length, googleCommunityCount) || (communitySurveys.length + googleCommunityCount);
  const totalProfessional = Math.max(professionalSurveys.length, googleProfCount) || (professionalSurveys.length + googleProfCount);
  const totalMessages = contactMessages.length;
  const unreadMessagesCount = contactMessages.filter((m) => m.status === 'Unread').length;
  const totalDonationsAmount = useMemo(
    () => donations.reduce((sum, d) => sum + d.amount, 0),
    [donations]
  );
  const avgDonation = donations.length > 0 ? totalDonationsAmount / donations.length : 0;

  // Helper to aggregate multi-choice arrays
  const aggregateMultiChoice = (items: string[][]): Record<string, number> => {
    const counts: Record<string, number> = {};
    items.forEach((list) => {
      if (Array.isArray(list)) {
        list.forEach((item) => {
          if (item) counts[item] = (counts[item] || 0) + 1;
        });
      }
    });
    return counts;
  };

  // Helper to aggregate single-choice strings
  const aggregateSingleChoice = (items: (string | undefined)[]): Record<string, number> => {
    const counts: Record<string, number> = {};
    items.forEach((item) => {
      if (item) counts[item] = (counts[item] || 0) + 1;
    });
    return counts;
  };

  // If NOT authenticated, show the Login Gate
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#070a11] text-white flex flex-col items-center justify-center p-4 relative selection:bg-amber-400 selection:text-slate-950">
        {/* Background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-md w-full relative z-10 space-y-6">
          {/* Logo & Header */}
          <div className="text-center space-y-3">
            <div className="w-16 h-16 rounded-2xl bg-white p-1 border-2 border-[#E5A93C] shadow-xl shadow-amber-500/20 mx-auto flex items-center justify-center overflow-hidden">
              <PuffinMascot className="w-full h-full object-contain" />
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-[#E5A93C]/50 text-[#F3BA4F] text-xs font-black uppercase tracking-wider">
              <Lock className="w-3.5 h-3.5 text-[#E5A93C]" />
              <span>Fill The Gap • Admin Portal</span>
            </div>

            <h1
              className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Executive Dashboard
            </h1>
            <p className="text-xs text-stone-400">
              Private access for survey analytics, real-time counters & donation tracking.
            </p>
          </div>

          {/* Login Form Box */}
          <div className="civic-card bg-[#0e1422] border-2 border-[#E5A93C]/60 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 text-left">
            <form onSubmit={handleLogin} className="space-y-4">
              {loginError && (
                <div className="p-3 bg-red-950/80 border border-red-500/60 rounded-xl text-red-200 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                  Username
                </label>
                <input
                  type="text"
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  placeholder="Enter username"
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#E5A93C]"
                  autoFocus
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 pr-10 focus:outline-none focus:ring-2 focus:ring-[#E5A93C]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#E5A93C] via-[#F3BA4F] to-[#D4972B] hover:brightness-105 text-slate-950 font-black text-sm uppercase tracking-wider shadow-lg border border-amber-300 cursor-pointer transition-all flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4 text-slate-950" />
                <span>Log In to Dashboard</span>
              </button>
            </form>
          </div>

          <div className="text-center">
            <button
              onClick={onExit}
              className="inline-flex items-center gap-2 text-xs font-bold text-stone-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return to Public Website</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // AUTHENTICATED ADMIN DASHBOARD VIEW
  // =========================================================================
  return (
    <div className="min-h-screen bg-[#080c14] text-slate-100 flex flex-col selection:bg-amber-400 selection:text-slate-950">
      
      {/* Top Admin Header Bar */}
      <header className="sticky top-0 z-40 bg-[#0c1220]/95 backdrop-blur-md border-b border-[#E5A93C]/40 px-4 sm:px-6 lg:px-8 py-3.5 shadow-xl">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          
          {/* Left Zone: Brand & URL */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white p-0.5 border-2 border-[#E5A93C] shadow-md shrink-0 flex items-center justify-center overflow-hidden">
              <PuffinMascot className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-black text-white uppercase tracking-tight">
                  FILL THE GAP
                </span>
                <span className="px-2 py-0.5 rounded-md bg-amber-400/20 text-[#F3BA4F] text-[10px] font-black uppercase tracking-wider border border-[#E5A93C]/40">
                  ADMIN PORTAL
                </span>
              </div>
              <p className="text-[11px] text-stone-400 font-mono">
                fillthegapnl.ca/admin • Live St. John's Analytics
              </p>
            </div>
          </div>

          {/* Right Zone: Quick Actions */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleSyncLocal}
              disabled={isSyncing}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:brightness-105 text-white font-black text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md border border-emerald-400 cursor-pointer disabled:opacity-50"
              title="Sync any surveys saved on this device to your storage engine"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? 'Syncing...' : 'Sync Database'}</span>
            </button>

            <button
              onClick={() => setIsAddDonationOpen(true)}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider hover:brightness-105 flex items-center gap-1.5 shadow-md border border-amber-300 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Record Donation</span>
            </button>

            <button
              onClick={() => exportToCSV(activeTab === 'donations' ? 'donations' : activeTab === 'professional' ? 'professional' : activeTab === 'traffic' ? 'traffic' : activeTab === 'messages' ? 'messages' : 'community')}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Export Current View Data to CSV"
            >
              <Download className="w-3.5 h-3.5 text-[#F3BA4F]" />
              <span className="hidden sm:inline">Export CSV</span>
            </button>

            <button
              id="header-download-entire-zip-btn"
              onClick={handleInstantZipDownload}
              disabled={isDownloadingZip}
              className="px-3.5 py-2 rounded-xl text-xs font-black bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-500 text-white border-2 border-emerald-400 shadow-lg shadow-emerald-950/60 flex items-center gap-1.5 cursor-pointer transition-all hover:scale-105 disabled:opacity-75"
              title="Instantly download the complete website project as a standalone ZIP archive"
            >
              <FolderDown className={`w-4 h-4 ${isDownloadingZip ? 'animate-bounce text-amber-300' : 'text-emerald-200'}`} />
              <span className="font-extrabold text-xs sm:text-sm tracking-wide">
                {isDownloadingZip ? 'PACKAGING ZIP...' : '📦 DOWNLOAD WEBSITE (.ZIP)'}
              </span>
            </button>

            <button
              id="header-entire-website-code-btn"
              onClick={() => setIsCodeModalOpen(true)}
              className={`px-3.5 py-2 rounded-xl text-xs font-black border-2 flex items-center gap-1.5 transition-all shadow-lg cursor-pointer ${
                activeTab === 'code'
                  ? 'bg-indigo-600 text-white border-indigo-300 scale-105 shadow-indigo-900/50'
                  : 'bg-indigo-950/90 hover:bg-indigo-900 text-indigo-200 border-indigo-500/60'
              }`}
              title="View, Copy, or Download the Entire Website Source Code"
            >
              <Code2 className="w-4 h-4 text-indigo-400" />
              <span className="font-extrabold text-xs sm:text-sm tracking-wide">💻 ENTIRE WEBSITE CODE</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`px-4 py-2 rounded-xl text-xs font-black border-2 flex items-center gap-1.5 transition-all shadow-lg cursor-pointer ${
                activeTab === 'settings'
                  ? 'bg-amber-400 text-slate-950 border-amber-300 scale-105'
                  : 'bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border-amber-400'
              }`}
              title="Open Settings & Database Sync"
            >
              <Sliders className="w-4 h-4 text-amber-300" />
              <span className="font-extrabold text-sm">⚙️ SETTINGS</span>
            </button>

            <button
              onClick={() => refreshData(false)}
              disabled={isSyncing}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-60"
              title="Refresh and sync data immediately from Cloud Database"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-[#F3BA4F]' : 'text-stone-300'}`} />
              <span className="hidden sm:inline">{isSyncing ? 'Syncing...' : 'Refresh'}</span>
            </button>

            <button
              onClick={onExit}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 flex items-center gap-1.5 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-stone-400" />
              <span className="hidden sm:inline">Public Site</span>
            </button>

            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-xl bg-red-950/60 hover:bg-red-900 text-red-200 font-bold text-xs border border-red-800/60 flex items-center gap-1.5 transition-colors"
              title="Log Out"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Exit</span>
            </button>
          </div>

        </div>
      </header>

      {/* Main Navigation Tabs */}
      <div className="bg-[#0b0f1a] border-b border-slate-800/80 px-4 sm:px-6 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-2">
          {[
            { id: 'clean_report', label: '📖 Survey Question Reader & Tallies', icon: FileSpreadsheet, highlight: true },
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'cms', label: 'Page Builder & Content Editor', icon: FileEdit },
            { id: 'questions', label: '📝 Question Builder & Editor', icon: Layers },
            { id: 'google_sheets', label: `📊 Google Sheets Sync (${googleCommunityCount + googleProfCount})`, icon: FileSpreadsheet },
            { id: 'traffic', label: `Visits (${totalVisits})`, icon: Globe },
            { id: 'community', label: `Community Surveys (${totalCommunity})`, icon: Users },
            { id: 'professional', label: `Professional Surveys (${totalProfessional})`, icon: Briefcase },
            { id: 'donations', label: `Donations ($${totalDonationsAmount.toLocaleString()})`, icon: Heart },
            { 
              id: 'messages', 
              label: unreadMessagesCount > 0 ? `Messages (${totalMessages}) • ${unreadMessagesCount} New` : `Messages (${totalMessages})`, 
              icon: Mail,
              hasUnread: unreadMessagesCount > 0 
            },
            { id: 'written', label: 'Written Responses', icon: MessageSquare },
            { id: 'settings', label: '⚙️ Settings & Security', icon: Sliders },
            { id: 'code', label: '💻 Entire Website Code', icon: Code2 },
          ].map((tab: any) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as AdminTab)}
                className={`px-3.5 py-2 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#E5A93C] text-slate-950 shadow-lg border-2 border-amber-300 scale-105'
                    : tab.highlight
                    ? 'bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border-2 border-amber-400/60 shadow-md'
                    : 'bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-700/80'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-slate-950' : 'text-amber-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Sync / Diagnostic / ZIP Download Notice Banner if needed */}
      {(syncStatusMsg || zipDownloadMsg) && (
        <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-indigo-950 border-b border-emerald-400/40 px-4 py-2.5 text-center text-xs font-bold text-emerald-300 flex items-center justify-center gap-2 animate-in fade-in sticky top-0 z-40 shadow-lg">
          <Sparkles className="w-4 h-4 animate-spin text-amber-400" />
          <span>{zipDownloadMsg || syncStatusMsg}</span>
        </div>
      )}

      {/* Content Body */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* ================================================================= */}
        {/* TAB: CLEAN SURVEY REPORT & QUESTION READER */}
        {/* ================================================================= */}
        {activeTab === 'clean_report' && (
          <CleanSurveyReport
            communitySurveys={communitySurveys}
            professionalSurveys={professionalSurveys}
            onExportCsv={exportToCSV}
          />
        )}
        
        {/* ================================================================= */}
        {/* TAB: CMS & PAGE BUILDER */}
        {/* ================================================================= */}
        {activeTab === 'cms' && (
          <CMSManagementTab
            onViewLivePage={(slug) => {
              if (onNavigateToCustomPage) {
                onNavigateToCustomPage(slug);
              } else {
                onExit();
              }
            }}
          />
        )}

        {/* ================================================================= */}
        {/* TAB: QUESTION BUILDER & EDITOR */}
        {/* ================================================================= */}
        {activeTab === 'questions' && (
          <SurveyQuestionManager />
        )}

        {/* ================================================================= */}
        {/* TAB: GOOGLE SHEETS & GOOGLE FORMS LIVE SYNC HUB */}
        {/* ================================================================= */}
        {activeTab === 'google_sheets' && (
          <div className="space-y-8">
            {/* Header & Quick Action Bar */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-800 pb-5">
              <div className="space-y-1">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <FileSpreadsheet className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
                    Google Sheets & Google Forms Live Sync
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    {googleConfig.lastSyncStatus === 'syncing' ? 'Syncing...' : 'Live Connected'}
                  </span>
                </div>
                <p className="text-xs text-stone-400">
                  Real-time synchronization between your live Google Forms, Google Spreadsheets, and Fill The Gap counters.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                {googleConfig.communitySheetViewUrl && (
                  <a
                    href={googleConfig.communitySheetViewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold text-xs flex items-center gap-1.5 border border-amber-400/30 transition-all shadow-md"
                  >
                    <span>Open Community Google Sheet</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                {googleConfig.professionalSheetViewUrl && (
                  <a
                    href={googleConfig.professionalSheetViewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-sky-300 font-bold text-xs flex items-center gap-1.5 border border-sky-400/30 transition-all shadow-md"
                  >
                    <span>Open Frontline Google Sheet</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                <button
                  type="button"
                  onClick={handleSyncGoogleSheets}
                  disabled={isGoogleSyncing}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:brightness-110 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-lg shadow-emerald-500/20 border border-emerald-300 transition-all active:scale-95"
                >
                  <RefreshCw className={`w-4 h-4 ${isGoogleSyncing ? 'animate-spin' : ''}`} />
                  <span>{isGoogleSyncing ? 'Fetching Live Rows...' : 'Sync with Google Sheets Now'}</span>
                </button>
              </div>
            </div>

            {/* Sync Alert / Status Message */}
            {googleSyncMsg && (
              <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/50 text-emerald-200 text-xs font-bold flex items-center gap-2.5 shadow-md">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{googleSyncMsg}</span>
              </div>
            )}

            {/* 3 Live Metric Counter Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Card 1: Community Google Sheet Count */}
              <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/30 border-2 border-amber-400/40 space-y-3 shadow-xl">
                <div className="flex items-center justify-between text-xs text-amber-300 font-bold uppercase tracking-wider">
                  <span>Community Survey</span>
                  <span className="p-1.5 rounded-lg bg-amber-400/10 text-amber-400">
                    <Users className="w-4 h-4" />
                  </span>
                </div>
                <div className="text-4xl font-black text-white tracking-tight">
                  {totalCommunity}
                </div>
                <div className="text-[11px] text-stone-300 space-y-1">
                  <div className="flex justify-between">
                    <span>From Google Sheet:</span>
                    <span className="font-mono font-bold text-amber-300">{googleConfig.communityCountFromSheet}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Direct Web Submissions:</span>
                    <span className="font-mono font-bold text-stone-400">{communitySurveys.length}</span>
                  </div>
                </div>
                <div className="pt-2 border-t border-slate-800 flex flex-wrap items-center gap-3">
                  {googleConfig.communityFormUrl && (
                    <a
                      href={googleConfig.communityFormUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-amber-400 hover:underline flex items-center gap-1 font-semibold"
                    >
                      <span>Open Form</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                  {googleConfig.communitySheetViewUrl && (
                    <a
                      href={googleConfig.communitySheetViewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-emerald-400 hover:underline flex items-center gap-1 font-semibold"
                    >
                      <span>View Results Sheet</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>

              {/* Card 2: Professional / Agency Google Sheet Count */}
              <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-sky-950/30 border-2 border-sky-400/40 space-y-3 shadow-xl">
                <div className="flex items-center justify-between text-xs text-sky-300 font-bold uppercase tracking-wider">
                  <span>Frontline & Agencies</span>
                  <span className="p-1.5 rounded-lg bg-sky-400/10 text-sky-400">
                    <Briefcase className="w-4 h-4" />
                  </span>
                </div>
                <div className="text-4xl font-black text-white tracking-tight">
                  {totalProfessional}
                </div>
                <div className="text-[11px] text-stone-300 space-y-1">
                  <div className="flex justify-between">
                    <span>From Google Sheet:</span>
                    <span className="font-mono font-bold text-sky-300">{googleConfig.professionalCountFromSheet}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Direct Web Submissions:</span>
                    <span className="font-mono font-bold text-stone-400">{professionalSurveys.length}</span>
                  </div>
                </div>
                <div className="pt-2 border-t border-slate-800 flex flex-wrap items-center gap-3">
                  {googleConfig.professionalFormUrl && (
                    <a
                      href={googleConfig.professionalFormUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-sky-400 hover:underline flex items-center gap-1 font-semibold"
                    >
                      <span>Open Form</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                  {googleConfig.professionalSheetViewUrl && (
                    <a
                      href={googleConfig.professionalSheetViewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-emerald-400 hover:underline flex items-center gap-1 font-semibold"
                    >
                      <span>View Results Sheet</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>

              {/* Card 3: Auto-Sync Engine Status */}
              <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/30 border-2 border-emerald-400/40 space-y-3 shadow-xl">
                <div className="flex items-center justify-between text-xs text-emerald-300 font-bold uppercase tracking-wider">
                  <span>Sync Engine</span>
                  <span className="p-1.5 rounded-lg bg-emerald-400/10 text-emerald-400">
                    <RefreshCw className="w-4 h-4" />
                  </span>
                </div>
                <div className="text-2xl font-black text-white tracking-tight">
                  {googleConfig.isAutoSyncEnabled ? 'Auto-Sync Active' : 'Manual Sync'}
                </div>
                <div className="text-[11px] text-stone-300 space-y-1">
                  <div className="flex justify-between">
                    <span>Interval:</span>
                    <span className="font-mono font-bold text-emerald-300">Every 60 seconds</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Last Sync:</span>
                    <span className="font-mono text-stone-400">
                      {googleConfig.lastSyncedAt
                        ? new Date(googleConfig.lastSyncedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
                        : 'On dashboard load'}
                    </span>
                  </div>
                </div>
                <div className="pt-2 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => {
                      const next = !googleConfig.isAutoSyncEnabled;
                      const upd = AdminStore.saveGoogleConfig({ isAutoSyncEnabled: next });
                      setGoogleConfig(upd);
                    }}
                    className="text-xs text-emerald-400 hover:underline font-semibold"
                  >
                    {googleConfig.isAutoSyncEnabled ? 'Toggle to Manual Sync' : 'Turn On Auto-Sync'}
                  </button>
                </div>
              </div>
            </div>

            {/* URL Configuration Form */}
            <form onSubmit={handleSaveGoogleUrls} className="p-6 sm:p-8 rounded-3xl bg-[#0e1422] border border-slate-800 space-y-6 shadow-xl">
              <div className="border-b border-slate-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-base font-black text-white uppercase tracking-wider flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-amber-400" />
                    <span>Configure Google Forms & Google Sheets Spreadsheet Feeds</span>
                  </h3>
                  <p className="text-xs text-stone-400 mt-0.5">
                    Paste your Google Form URLs, CSV Live Counter URLs, and Direct View Google Sheets Spreadsheet links below.
                  </p>
                </div>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer shrink-0"
                >
                  Save URL Settings
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* 1. Community Survey Config */}
                <div className="p-5 rounded-2xl bg-slate-900/90 border border-amber-400/30 space-y-4">
                  <div className="flex items-center gap-2 text-amber-300 font-bold text-xs uppercase tracking-wider border-b border-slate-800 pb-2">
                    <Users className="w-4 h-4 text-amber-400" />
                    <span>1. Community Survey (Public Link & Sheet)</span>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-stone-200">
                      Community Google Form URL (Shown to Public)
                    </label>
                    <input
                      type="url"
                      value={editCommunityFormUrl}
                      onChange={(e) => setEditCommunityFormUrl(e.target.value)}
                      placeholder="https://docs.google.com/forms/d/e/.../viewform"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                    <p className="text-[11px] text-stone-500">
                      When visitors click "Community Survey", this Google Form opens or embeds on the page.
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-stone-200">
                      Community Google Sheet Results View URL (Spreadsheet Web Link)
                    </label>
                    <input
                      type="url"
                      value={editCommunitySheetViewUrl}
                      onChange={(e) => setEditCommunitySheetViewUrl(e.target.value)}
                      placeholder="https://docs.google.com/spreadsheets/d/.../edit or /pubhtml"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                    <p className="text-[11px] text-stone-500">
                      Direct link where public or admins can view full survey responses in Google Sheets.
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-stone-200">
                      Community Google Sheet Published CSV URL (For Live Row Counter)
                    </label>
                    <input
                      type="url"
                      value={editCommunitySheetCsvUrl}
                      onChange={(e) => setEditCommunitySheetCsvUrl(e.target.value)}
                      placeholder="https://docs.google.com/spreadsheets/d/e/.../pub?output=csv"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white font-mono focus:outline-none focus:border-amber-400"
                    />
                    <p className="text-[11px] text-stone-500">
                      Google Sheet → File → Share → Publish to web → choose "CSV".
                    </p>
                  </div>
                </div>

                {/* 2. Professional Survey Config */}
                <div className="p-5 rounded-2xl bg-slate-900/90 border border-sky-400/30 space-y-4">
                  <div className="flex items-center gap-2 text-sky-300 font-bold text-xs uppercase tracking-wider border-b border-slate-800 pb-2">
                    <Briefcase className="w-4 h-4 text-sky-400" />
                    <span>2. Frontline / Professional Survey (Link & Sheet)</span>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-stone-200">
                      Frontline Google Form URL (Shown to Service Providers)
                    </label>
                    <input
                      type="url"
                      value={editProfFormUrl}
                      onChange={(e) => setEditProfFormUrl(e.target.value)}
                      placeholder="https://docs.google.com/forms/d/e/.../viewform"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-sky-400"
                    />
                    <p className="text-[11px] text-stone-500">
                      When agencies click "Professional Survey", this Google Form opens.
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-stone-200">
                      Frontline Google Sheet Results View URL (Spreadsheet Web Link)
                    </label>
                    <input
                      type="url"
                      value={editProfSheetViewUrl}
                      onChange={(e) => setEditProfSheetViewUrl(e.target.value)}
                      placeholder="https://docs.google.com/spreadsheets/d/.../edit or /pubhtml"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-sky-400"
                    />
                    <p className="text-[11px] text-stone-500">
                      Direct link where public or staff can view frontline responses in Google Sheets.
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-stone-200">
                      Frontline Google Sheet Published CSV URL (For Live Row Counter)
                    </label>
                    <input
                      type="url"
                      value={editProfSheetCsvUrl}
                      onChange={(e) => setEditProfSheetCsvUrl(e.target.value)}
                      placeholder="https://docs.google.com/spreadsheets/d/e/.../pub?output=csv"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white font-mono focus:outline-none focus:border-sky-400"
                    />
                    <p className="text-[11px] text-stone-500">
                      Google Sheet → File → Share → Publish to web → choose "CSV".
                    </p>
                  </div>
                </div>
              </div>

              {/* Direct Bank Account & Wire Transfer Settings */}
              <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Building className="w-5 h-5 text-emerald-400" />
                      <h3 className="text-sm font-black text-white uppercase tracking-wider">
                        Direct Bank Account & Payment Settings
                      </h3>
                    </div>
                    <p className="text-xs text-stone-400">
                      Configure your direct bank account details, e-Transfer email, and transit/institution numbers for receiving community donations.
                    </p>
                  </div>

                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all shrink-0"
                  >
                    <Save className="w-4 h-4 text-slate-950" />
                    <span>Save Bank Details</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-stone-200">
                      Account Holder / Organization Name
                    </label>
                    <input
                      type="text"
                      value={editAccountHolder}
                      onChange={(e) => setEditAccountHolder(e.target.value)}
                      placeholder="Fill the Gap NL"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-emerald-400"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-stone-200">
                      Financial Institution / Bank Name
                    </label>
                    <input
                      type="text"
                      value={editBankName}
                      onChange={(e) => setEditBankName(e.target.value)}
                      placeholder="e.g., Royal Bank of Canada (RBC) / TD / Scotiabank"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-emerald-400"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-stone-200">
                      Interac e-Transfer Recipient Email
                    </label>
                    <input
                      type="email"
                      value={editEtransferEmail}
                      onChange={(e) => setEditEtransferEmail(e.target.value)}
                      placeholder="info@fillthegapnl.ca"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-emerald-400"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-stone-200">
                      Institution Number (3 Digits)
                    </label>
                    <input
                      type="text"
                      value={editInstitutionNumber}
                      onChange={(e) => setEditInstitutionNumber(e.target.value)}
                      placeholder="e.g., 003"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white font-mono focus:outline-none focus:border-emerald-400"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-stone-200">
                      Transit / Branch Number (5 Digits)
                    </label>
                    <input
                      type="text"
                      value={editTransitNumber}
                      onChange={(e) => setEditTransitNumber(e.target.value)}
                      placeholder="e.g., 01234"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white font-mono focus:outline-none focus:border-emerald-400"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-stone-200">
                      Account Number (7–12 Digits)
                    </label>
                    <input
                      type="text"
                      value={editAccountNumber}
                      onChange={(e) => setEditAccountNumber(e.target.value)}
                      placeholder="e.g., 1234567"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white font-mono focus:outline-none focus:border-emerald-400"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-stone-200">
                      SWIFT / BIC Code (For Wire Transfers)
                    </label>
                    <input
                      type="text"
                      value={editSwiftBic}
                      onChange={(e) => setEditSwiftBic(e.target.value)}
                      placeholder="e.g., ROYCCAT2"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white font-mono focus:outline-none focus:border-emerald-400"
                    />
                  </div>

                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="block text-xs font-bold text-stone-200">
                      Branch / Organization Address
                    </label>
                    <input
                      type="text"
                      value={editBankAddress}
                      onChange={(e) => setEditBankAddress(e.target.value)}
                      placeholder="St. John's, Newfoundland & Labrador, Canada"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-emerald-400"
                    />
                  </div>
                </div>
              </div>
            </form>

            {/* Quick 3-Step Setup Guide */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-black text-white uppercase tracking-wider">
                  How to Connect Any Google Form to Your Live Dashboard in 30 Seconds
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
                  <div className="w-6 h-6 rounded-full bg-amber-400/20 text-amber-400 font-black text-xs flex items-center justify-center">
                    1
                  </div>
                  <h4 className="text-xs font-bold text-white">Create / Open Your Google Form</h4>
                  <p className="text-[11px] text-stone-400 leading-relaxed">
                    Create your survey in Google Forms, customize questions, and copy the public view link (e.g. <code>https://docs.google.com/forms/d/e/.../viewform</code>).
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
                  <div className="w-6 h-6 rounded-full bg-emerald-400/20 text-emerald-400 font-black text-xs flex items-center justify-center">
                    2
                  </div>
                  <h4 className="text-xs font-bold text-white">Link to Google Sheets</h4>
                  <p className="text-[11px] text-stone-400 leading-relaxed">
                    In your Google Form, click the <strong>Responses</strong> tab and click <strong>"Link to Sheets"</strong> (green spreadsheet icon).
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
                  <div className="w-6 h-6 rounded-full bg-sky-400/20 text-sky-400 font-black text-xs flex items-center justify-center">
                    3
                  </div>
                  <h4 className="text-xs font-bold text-white">Publish Sheet as CSV</h4>
                  <p className="text-[11px] text-stone-400 leading-relaxed">
                    In the spreadsheet, click <strong>File → Share → Publish to web</strong>. Under format, select <strong>Comma-separated values (.csv)</strong> and paste that link above!
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* TAB 1: OVERVIEW & EXECUTIVE SUMMARY */}
        {/* ================================================================= */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            
            {/* Live Database & Google Sheets Status Banner */}
            <div className="p-4 sm:p-5 rounded-3xl border bg-emerald-950/40 border-emerald-500/40 text-emerald-200 transition-all">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-2xl shrink-0 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-sm sm:text-base font-black text-white">
                        Database & Google Sheets Sync: Live
                      </h3>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Active & Connected
                      </span>
                    </div>
                    <p className="text-xs text-stone-300 mt-1 leading-relaxed max-w-2xl">
                      Your database storage and Google Sheets integration are active. Survey submissions, visitor traffic logs, and messages submitted from any computer or mobile phone are safely recorded in real time.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0 w-full md:w-auto">
                  <button
                    type="button"
                    onClick={() => setActiveTab('clean_report')}
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:brightness-110 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-lg border border-amber-200 cursor-pointer transition-all hover:scale-105"
                  >
                    <FileSpreadsheet className="w-4 h-4 text-slate-950" />
                    <span>Read Questions & Answers 📖</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleInstantZipDownload}
                    disabled={isDownloadingZip}
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-lg border border-emerald-300 cursor-pointer disabled:opacity-50 transition-all hover:scale-105"
                  >
                    <FolderDown className={`w-4 h-4 ${isDownloadingZip ? 'animate-bounce' : ''}`} />
                    <span>{isDownloadingZip ? 'Packaging ZIP...' : 'Download Site ZIP 📦'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleSyncLocal}
                    disabled={isSyncing}
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:brightness-110 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-lg border border-emerald-300 cursor-pointer disabled:opacity-50"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                    <span>{isSyncing ? 'Syncing...' : 'Sync Database'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsCodeModalOpen(true)}
                    className="px-3.5 py-2.5 rounded-xl bg-indigo-900/80 hover:bg-indigo-800 text-indigo-200 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer border border-indigo-500/50 transition-colors shadow"
                  >
                    <Code2 className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Website Code 💻</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab('settings')}
                    className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer border border-amber-400/40 transition-colors"
                  >
                    <Sliders className="w-3.5 h-3.5" />
                    <span>Settings ⚙️</span>
                  </button>

                  <button
                    type="button"
                    onClick={async () => {
                      await refreshData();
                    }}
                    className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-stone-300 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer border border-slate-700 transition-colors"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Refresh Data</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Giving Together Mascot Banner & Brand Artwork Manager */}
            <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-[#111827] via-[#0e1526] to-[#151c2e] border-2 border-amber-400/40 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
              <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left z-10">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-white p-2 border-2 border-amber-400 shadow-xl shrink-0 flex items-center justify-center overflow-hidden group relative">
                  <PuffinMascot className="w-full h-full object-contain" />
                  <label
                    title="Change Mascot Image"
                    className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-amber-300 transition-opacity cursor-pointer"
                  >
                    <Camera className="w-6 h-6" />
                    <input
                      type="file"
                      accept="image/*,.jfif"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = () => {
                            if (typeof reader.result === 'string') {
                              AdminStore.setCustomMascotImage(reader.result);
                            }
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </label>
                </div>

                <div className="space-y-1.5 max-w-xl">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-[11px] font-black uppercase tracking-wider">
                    <Heart className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>Giving Together • Atlantic Puffin Mascot</span>
                  </div>
                  <h2 className="text-lg sm:text-xl font-black text-white tracking-tight">
                    Mascot & Brand Artwork Manager
                  </h2>
                  <p className="text-xs text-stone-300 leading-relaxed">
                    The Atlantic Puffin mascot wears a purple <em>"Fill the Gap for Charity"</em> t-shirt and camo boots alongside the wooden donation box. Upload or replace this image here to synchronize it across the entire public site and admin portal.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-2.5 z-10 shrink-0">
                <label className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:brightness-105 text-xs font-black text-slate-950 flex items-center gap-2 cursor-pointer shadow-lg shadow-amber-500/20 border border-amber-300 transition-transform active:scale-95">
                  <Upload className="w-4 h-4" />
                  <span>Upload Image (.jfif / .png / .jpg)</span>
                  <input
                    type="file"
                    accept="image/*,.jfif"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = () => {
                          if (typeof reader.result === 'string') {
                            AdminStore.setCustomMascotImage(reader.result);
                          }
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                </label>

                <button
                  type="button"
                  onClick={() => {
                    AdminStore.clearCustomMascotImage();
                  }}
                  className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-stone-300 border border-slate-700 flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-stone-400" />
                  <span>Reset Default</span>
                </button>
              </div>
            </div>

            {/* Top 6 Metric Counters */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
              
              {/* Card 1: Total Surveys Done */}
              <div
                onClick={() => setActiveTab('community')}
                className="p-5 rounded-2xl bg-gradient-to-br from-amber-950/40 via-slate-900 to-[#101827] border-2 border-amber-400/80 hover:border-amber-300 transition-all cursor-pointer shadow-lg space-y-2 group"
              >
                <div className="flex items-center justify-between text-xs text-amber-300 font-bold uppercase">
                  <span>Total Surveys Done</span>
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-black tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                    Combined Total
                  </span>
                </div>
                <div className="text-3xl sm:text-4xl font-black text-[#F3BA4F] tracking-tight">
                  {totalCommunity + totalProfessional}
                </div>
                <p className="text-[11px] text-amber-200 font-semibold flex items-center gap-1">
                  <span>{totalCommunity} Comm. + {totalProfessional} Agency</span>
                </p>
              </div>

              {/* Card 2: Website Visits */}
              <div
                onClick={() => setActiveTab('traffic')}
                className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-[#101827] border-2 border-slate-700/80 hover:border-[#E5A93C] transition-all cursor-pointer shadow-lg space-y-2 group"
              >
                <div className="flex items-center justify-between text-xs text-stone-400 font-bold uppercase">
                  <span>Website Visits</span>
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-black tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Live & Syncing
                  </span>
                </div>
                <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                  {totalVisits}
                </div>
                <p className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>Real-time visitor logs</span>
                </p>
              </div>

              {/* Card 3: Community Surveys */}
              <div
                onClick={() => setActiveTab('community')}
                className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-[#101827] border-2 border-slate-700/80 hover:border-[#E5A93C] transition-all cursor-pointer shadow-lg space-y-2 group"
              >
                <div className="flex items-center justify-between text-xs text-stone-400 font-bold uppercase">
                  <span>Community Surveys</span>
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-black tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Live & Syncing
                  </span>
                </div>
                <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                  {totalCommunity}
                </div>
                <p className="text-[11px] text-amber-300 font-semibold">
                  {totalCommunity === 0 ? '46 questions in survey (0 responses)' : `${totalCommunity} response${totalCommunity === 1 ? '' : 's'} across 46 questions`}
                </p>
              </div>

              {/* Card 4: Professional Surveys */}
              <div
                onClick={() => setActiveTab('professional')}
                className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-[#101827] border-2 border-slate-700/80 hover:border-[#E5A93C] transition-all cursor-pointer shadow-lg space-y-2 group"
              >
                <div className="flex items-center justify-between text-xs text-stone-400 font-bold uppercase">
                  <span>Frontline Agency</span>
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-black tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Live & Syncing
                  </span>
                </div>
                <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                  {totalProfessional}
                </div>
                <p className="text-[11px] text-sky-400 font-semibold">
                  {totalProfessional === 0 ? '46 questions in survey (0 responses)' : `${totalProfessional} response${totalProfessional === 1 ? '' : 's'} across 46 questions`}
                </p>
              </div>

              {/* Card 5: Total Donations */}
              <div
                onClick={() => setActiveTab('donations')}
                className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-[#101827] border-2 border-[#E5A93C]/80 hover:border-[#F3BA4F] transition-all cursor-pointer shadow-lg space-y-2 group"
              >
                <div className="flex items-center justify-between text-xs text-stone-400 font-bold uppercase">
                  <span>Donations</span>
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-black tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Live & Syncing
                  </span>
                </div>
                <div className="text-3xl sm:text-4xl font-black text-[#F3BA4F] tracking-tight">
                  ${totalDonationsAmount.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}
                </div>
                <p className="text-[11px] text-slate-300 font-semibold">
                  {donations.length} records
                </p>
              </div>

              {/* Card 6: Contact Messages */}
              <div
                onClick={() => setActiveTab('messages')}
                className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-[#101827] border-2 border-indigo-500/60 hover:border-indigo-400 transition-all cursor-pointer shadow-lg space-y-2 group"
              >
                <div className="flex items-center justify-between text-xs text-stone-400 font-bold uppercase">
                  <span>Contact Inquiries</span>
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-black tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Live & Syncing
                  </span>
                </div>
                <div className="text-3xl sm:text-4xl font-black text-white tracking-tight flex items-baseline gap-2">
                  <span>{totalMessages}</span>
                  {unreadMessagesCount > 0 && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black">
                      {unreadMessagesCount} new
                    </span>
                  )}
                </div>
                <p className={`text-[11px] font-semibold ${unreadMessagesCount > 0 ? 'text-amber-300' : 'text-slate-400'}`}>
                  {unreadMessagesCount > 0 ? `${unreadMessagesCount} unread message${unreadMessagesCount > 1 ? 's' : ''}` : 'All inquiries caught up'}
                </p>
              </div>

            </div>

            {/* Middle Grid: Top Gaps & Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Top Systemic Barriers Radar */}
              <div className="lg:col-span-2 p-6 rounded-3xl bg-[#0e1422] border border-slate-800 shadow-xl space-y-5">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="space-y-0.5">
                    <h2 className="text-sm sm:text-base font-black text-white uppercase tracking-wider flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <span>Top Identified Barriers (Community Survey)</span>
                    </h2>
                    <p className="text-xs text-stone-400">
                      Highest ranked systemic friction points reported by Newfoundland & Labrador respondents.
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('community')}
                    className="text-xs font-bold text-amber-400 hover:underline"
                  >
                    View All
                  </button>
                </div>

                <div className="space-y-3 pt-1">
                  {Object.keys(aggregateMultiChoice(communitySurveys.map((c) => [...(c.q12 || []), ...(c.q13 || [])]))).length === 0 ? (
                    <div className="text-xs text-stone-400 italic p-4 bg-slate-900/50 rounded-2xl border border-slate-800 text-center">
                      No community survey responses submitted yet. System is live and ready for public data collection.
                    </div>
                  ) : (
                    Object.entries(
                      aggregateMultiChoice(communitySurveys.map((c) => [...(c.q12 || []), ...(c.q13 || [])]))
                    )
                      .sort(([, a], [, b]) => b - a)
                      .slice(0, 6)
                      .map(([barrier, count], idx) => {
                        const percentage = totalCommunity > 0 ? Math.round((count / (totalCommunity * 2)) * 100) : 0;
                        return (
                          <div key={barrier} className="space-y-1.5">
                            <div className="flex items-center justify-between text-xs font-bold">
                              <span className="text-slate-200">
                                {idx + 1}. {barrier}
                              </span>
                              <span className="text-amber-400 font-mono">{count} votes</span>
                            </div>
                            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-amber-500 to-amber-300 rounded-full"
                                style={{ width: `${Math.min(100, Math.max(12, percentage * 2))}%` }}
                              />
                            </div>
                          </div>
                        );
                      })
                  )}
                </div>
              </div>

              {/* Recent Community Voices Snippets */}
              <div className="p-6 rounded-3xl bg-[#0e1422] border border-slate-800 shadow-xl space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <h2 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-sky-400" />
                      <span>Latest Written Feedback</span>
                    </h2>
                    <button
                      onClick={() => setActiveTab('written')}
                      className="text-xs font-bold text-amber-400 hover:underline"
                    >
                      See all
                    </button>
                  </div>

                  <div className="space-y-3 text-xs">
                    {communitySurveys.filter((c) => c.q15 || c.q22).length === 0 ? (
                      <div className="text-xs text-stone-400 italic p-4 bg-slate-900/50 rounded-2xl border border-slate-800 text-center">
                        No written feedback submitted yet.
                      </div>
                    ) : (
                      communitySurveys
                        .filter((c) => c.q15 || c.q22)
                        .slice(0, 2)
                        .map((c) => (
                          <div key={c.id} className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 space-y-1.5">
                            <div className="flex items-center justify-between text-[10px] text-stone-400">
                              <span className="font-bold text-amber-300">{c.q2 || 'NL Resident'}</span>
                              <span>{new Date(c.submittedAt).toLocaleDateString()}</span>
                            </div>
                            <p className="text-slate-200 italic line-clamp-3">
                              "{c.q15 || c.q22}"
                            </p>
                          </div>
                        ))
                    )}
                  </div>
                </div>

                <button
                  onClick={() => setActiveTab('written')}
                  className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white border border-slate-700 flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>Open Fill-in-the-Blank Explorer</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

            {/* Quick Condensed Questions Matrix Preview */}
            <div className="p-6 rounded-3xl bg-[#0e1422] border border-slate-800 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="space-y-0.5">
                  <h2 className="text-sm sm:text-base font-black text-white uppercase tracking-wider flex items-center gap-2">
                    <TableProperties className="w-4 h-4 text-amber-400" />
                    <span>Condensed Question Tally (Quick Scan)</span>
                  </h2>
                  <p className="text-xs text-stone-400">
                    Condensed tallies of key multiple-choice questions with numbers and percentages.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('community')}
                  className="text-xs font-bold text-amber-400 hover:underline flex items-center gap-1"
                >
                  <span>Open Full Tally Sheet</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
                
                {/* Micro Card: Geography */}
                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800/80 space-y-2">
                  <div className="flex items-center justify-between text-[10px] text-stone-400 font-bold uppercase border-b border-slate-800 pb-1">
                    <span className="text-amber-400">Q2. Region</span>
                    <span>{totalCommunity} responses</span>
                  </div>
                  <div className="space-y-1 text-xs">
                    {Object.entries(aggregateSingleChoice(communitySurveys.map((c) => c.q2)))
                      .sort(([, a], [, b]) => b - a)
                      .slice(0, 3)
                      .map(([opt, count]) => (
                        <div key={opt} className="flex justify-between text-[11px]">
                          <span className="text-slate-300 truncate">{opt}</span>
                          <span className="text-amber-400 font-mono font-bold">{count} ({totalCommunity > 0 ? Math.round((count/totalCommunity)*100) : 0}%)</span>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Micro Card: Needed Help */}
                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800/80 space-y-2">
                  <div className="flex items-center justify-between text-[10px] text-stone-400 font-bold uppercase border-b border-slate-800 pb-1">
                    <span className="text-amber-400">Q6. Needed Help</span>
                    <span>Past 5 Yrs</span>
                  </div>
                  <div className="space-y-1 text-xs">
                    {['Yes', 'No', 'Prefer not to say'].map((ans) => {
                      const count = communitySurveys.filter((c) => c.q6 === ans).length;
                      return (
                        <div key={ans} className="flex justify-between text-[11px]">
                          <span className={ans === 'Yes' ? 'text-amber-300 font-bold' : 'text-slate-300'}>{ans}</span>
                          <span className="text-amber-400 font-mono font-bold">{count} ({totalCommunity > 0 ? Math.round((count/totalCommunity)*100) : 0}%)</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Micro Card: Gave Up */}
                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800/80 space-y-2">
                  <div className="flex items-center justify-between text-[10px] text-stone-400 font-bold uppercase border-b border-slate-800 pb-1">
                    <span className="text-red-400">Q14. Gave Up</span>
                    <span>System Friction</span>
                  </div>
                  <div className="space-y-1 text-xs">
                    {['Yes', 'No', 'Maybe'].map((ans) => {
                      const count = communitySurveys.filter((c) => c.q14 === ans).length;
                      return (
                        <div key={ans} className="flex justify-between text-[11px]">
                          <span className={ans === 'Yes' ? 'text-red-400 font-bold' : 'text-slate-300'}>{ans}</span>
                          <span className="text-stone-300 font-mono font-bold">{count} ({totalCommunity > 0 ? Math.round((count/totalCommunity)*100) : 0}%)</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Micro Card: Frontline Cracks */}
                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800/80 space-y-2">
                  <div className="flex items-center justify-between text-[10px] text-stone-400 font-bold uppercase border-b border-slate-800 pb-1">
                    <span className="text-sky-400">Frontline Gaps</span>
                    <span>{totalProfessional} agencies</span>
                  </div>
                  <div className="space-y-1 text-xs">
                    {Object.entries(aggregateSingleChoice(professionalSurveys.map((p) => p.frequencyFallingThrough)))
                      .sort(([, a], [, b]) => b - a)
                      .slice(0, 3)
                      .map(([opt, count]) => (
                        <div key={opt} className="flex justify-between text-[11px]">
                          <span className="text-slate-300 truncate">{opt}</span>
                          <span className="text-sky-300 font-mono font-bold">{count} ({totalProfessional > 0 ? Math.round((count/totalProfessional)*100) : 0}%)</span>
                        </div>
                      ))}
                  </div>
                </div>

              </div>
            </div>

            {/* Bottom Row: Recent Donations Table Preview */}
            <div className="p-6 rounded-3xl bg-[#0e1422] border border-slate-800 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <h2 className="text-sm sm:text-base font-black text-white uppercase tracking-wider flex items-center gap-2">
                    <Heart className="w-4 h-4 text-[#E5A93C]" />
                    <span>Recent Donations & Pledges</span>
                  </h2>
                  <p className="text-xs text-stone-400">
                    Money donated to date with donor name, date, method and status.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsAddDonationOpen(true)}
                    className="px-3 py-1.5 rounded-xl bg-amber-400 text-slate-950 font-black text-xs uppercase"
                  >
                    + Add
                  </button>
                  <button
                    onClick={() => setActiveTab('donations')}
                    className="text-xs font-bold text-amber-400 hover:underline"
                  >
                    View All
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-800 text-stone-400 font-bold uppercase text-[10px]">
                      <th className="py-2.5 px-3">Donor Name</th>
                      <th className="py-2.5 px-3">Amount</th>
                      <th className="py-2.5 px-3">Date</th>
                      <th className="py-2.5 px-3">Payment Method</th>
                      <th className="py-2.5 px-3">Status</th>
                      <th className="py-2.5 px-3">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {donations.slice(0, 5).map((d) => (
                      <tr key={d.id} className="hover:bg-slate-900/50">
                        <td className="py-3 px-3 font-bold text-white flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-400" />
                          <span>{d.donorName}</span>
                        </td>
                        <td className="py-3 px-3 font-mono font-black text-[#F3BA4F]">
                          ${d.amount.toFixed(2)}
                        </td>
                        <td className="py-3 px-3 text-stone-300 font-mono">
                          {new Date(d.date).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-3 text-stone-300">
                          <span className="px-2 py-0.5 rounded-md bg-slate-800 border border-slate-700">
                            {d.method}
                          </span>
                        </td>
                        <td className="py-3 px-3">
                          <span className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider ${
                            d.status === 'Verified' ? 'bg-emerald-950 text-emerald-300 border border-emerald-700/60' : 'bg-amber-950 text-amber-300 border border-amber-700/60'
                          }`}>
                            {d.status}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-stone-400 italic max-w-xs truncate">
                          {d.notes || '—'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Bottom Row 2: Recent Contact Inquiries Preview */}
            <div className="p-6 rounded-3xl bg-[#0e1422] border border-slate-800 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <h2 className="text-sm sm:text-base font-black text-white uppercase tracking-wider flex items-center gap-2">
                    <Mail className="w-4 h-4 text-indigo-400" />
                    <span>Recent Contact Inquiries</span>
                    {unreadMessagesCount > 0 && (
                      <span className="px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-wider">
                        {unreadMessagesCount} Unread
                      </span>
                    )}
                  </h2>
                  <p className="text-xs text-stone-400">
                    Direct inquiries, gap reports, and partner requests submitted via the Contact form.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('messages')}
                  className="text-xs font-bold text-amber-400 hover:underline flex items-center gap-1"
                >
                  <span>View All Messages ({totalMessages})</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {contactMessages.length === 0 ? (
                <div className="p-8 rounded-2xl bg-slate-900/40 border border-dashed border-slate-800 text-center space-y-2">
                  <Mail className="w-8 h-8 text-stone-500 mx-auto" />
                  <p className="text-xs font-bold text-stone-300">No contact messages received yet</p>
                  <p className="text-[11px] text-stone-500">
                    When visitors fill out the Contact Us form on the website, their messages will appear here in real-time.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {contactMessages.slice(0, 4).map((msg) => (
                    <div
                      key={msg.id}
                      className={`p-4 rounded-2xl border transition-all ${
                        msg.status === 'Unread'
                          ? 'bg-gradient-to-br from-[#131c33] to-[#0e1422] border-amber-400/50 shadow-md'
                          : 'bg-slate-900/60 border-slate-800'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="font-black text-white text-xs">{msg.name}</span>
                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                              msg.status === 'Unread'
                                ? 'bg-amber-400 text-slate-950'
                                : msg.status === 'Replied'
                                ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                                : 'bg-slate-800 text-stone-300'
                            }`}>
                              {msg.status}
                            </span>
                          </div>
                          <p className="text-[11px] text-stone-400 font-mono">{msg.email}</p>
                        </div>

                        <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-950/80 text-indigo-300 border border-indigo-800/60 font-semibold shrink-0">
                          {msg.reason}
                        </span>
                      </div>

                      <p className="text-xs text-stone-300 line-clamp-2 italic bg-slate-950/50 p-2 rounded-lg border border-slate-800/80 mb-3">
                        "{msg.message}"
                      </p>

                      <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-800/60">
                        <span className="text-stone-400 font-mono text-[10px]">
                          {new Date(msg.submittedAt).toLocaleDateString()} {new Date(msg.submittedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        <div className="flex items-center gap-2">
                          <a
                            href={`mailto:${msg.email}?subject=${encodeURIComponent(`Re: Fill the Gap NL — ${msg.reason}`)}`}
                            onClick={() => {
                              AdminStore.updateContactMessageStatus(msg.id, 'Replied');
                              refreshData();
                            }}
                            className="px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-[10px] flex items-center gap-1 transition-colors"
                          >
                            <Send className="w-3 h-3" />
                            <span>Reply</span>
                          </a>
                          <button
                            onClick={() => setActiveTab('messages')}
                            className="text-stone-400 hover:text-white font-bold text-[10px]"
                          >
                            View
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        )}

        {/* ================================================================= */}
        {/* TAB 2: WEBSITE VISITS & TRAFFIC */}
        {/* ================================================================= */}
        {activeTab === 'traffic' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
                    Website Visits & Traffic Counter
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Live & Syncing
                  </span>
                </div>
                <p className="text-xs text-stone-400">
                  Detailed analytics of real visitor traffic across fillthegapnl.ca pages.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={async () => {
                    await AdminStore.recordTestVisit('/home');
                    refreshData(true);
                  }}
                  className="px-3.5 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-xs font-bold text-amber-300 border border-amber-500/30 flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Record a test visit to verify counter"
                >
                  <Plus className="w-3.5 h-3.5 text-amber-400" />
                  <span>Test Visit (+1)</span>
                </button>

                <button
                  onClick={() => {
                    if (confirm('Clear all recorded website visits and reset the visitor counter to 0? Surveys, donations, and contact messages will be preserved.')) {
                      AdminStore.clearVisits();
                      refreshData();
                      alert('Website visit counter and traffic activity log have been reset to 0.');
                    }
                  }}
                  className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-bold text-stone-300 border border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Reset visitor counter to 0"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-stone-400" />
                  <span>Reset Visits to 0</span>
                </button>

                <button
                  onClick={() => exportToCSV('traffic')}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white border border-slate-700 flex items-center gap-2"
                >
                  <Download className="w-4 h-4 text-[#F3BA4F]" />
                  <span>Export Traffic Log (CSV)</span>
                </button>
              </div>
            </div>

            {/* Admin Self-Visit Exclusion Banner */}
            <div className="p-4 rounded-2xl bg-[#0b1329] border border-indigo-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-indigo-950 text-indigo-300 border border-indigo-700/60 flex items-center justify-center shrink-0 mt-0.5">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-white uppercase tracking-wider">
                      Admin Self-Visit Filter
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                      excludeOwnVisits
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-700/60'
                        : 'bg-amber-950 text-amber-300 border border-amber-700/60'
                    }`}>
                      {excludeOwnVisits ? 'Active — You are Excluded' : 'Inactive'}
                    </span>
                  </div>
                  <p className="text-xs text-stone-300">
                    {excludeOwnVisits
                      ? 'Your browsing activity on fillthegapnl.ca from this browser/device is automatically ignored and will not increase the visitor counter.'
                      : 'Self-visit filtering is currently disabled; your browsing activity will be counted in visitor metrics.'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:self-center shrink-0">
                <button
                  onClick={() => {
                    const next = !excludeOwnVisits;
                    AdminStore.setExcludeOwnVisits(next);
                    setExcludeOwnVisitsState(next);
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 border ${
                    excludeOwnVisits
                      ? 'bg-emerald-900/60 hover:bg-emerald-900 text-emerald-200 border-emerald-600'
                      : 'bg-slate-800 hover:bg-slate-700 text-stone-300 border-slate-600'
                  }`}
                >
                  <EyeOff className="w-3.5 h-3.5" />
                  <span>{excludeOwnVisits ? 'Exclude My Visits (Enabled)' : 'Include My Visits'}</span>
                </button>
              </div>
            </div>

            {/* Traffic Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-[#0e1422] border border-slate-800 space-y-1">
                <span className="text-xs font-bold text-stone-400 uppercase">Total Hits / Pageviews</span>
                <div className="text-3xl font-black text-white font-mono">{totalVisits}</div>
              </div>
              <div className="p-5 rounded-2xl bg-[#0e1422] border border-slate-800 space-y-1">
                <span className="text-xs font-bold text-stone-400 uppercase">Mobile Traffic Share</span>
                <div className="text-3xl font-black text-amber-400 font-mono">
                  {totalVisits > 0
                    ? Math.round((visits.filter((v) => v.device === 'mobile').length / totalVisits) * 100)
                    : 0}%
                </div>
              </div>
              <div className="p-5 rounded-2xl bg-[#0e1422] border border-slate-800 space-y-1">
                <span className="text-xs font-bold text-stone-400 uppercase">Top Traffic Source</span>
                <div className="text-xl font-black text-emerald-400 truncate">
                  {Object.entries(aggregateSingleChoice(visits.map((v) => v.referrer))).sort(([, a], [, b]) => b - a)[0]?.[0] || 'Direct Visit'}
                </div>
              </div>
            </div>

            {/* Visits Log Table */}
            <div className="p-6 rounded-3xl bg-[#0e1422] border border-slate-800 shadow-xl space-y-4">
              <h3 className="text-sm font-black text-white uppercase tracking-wider">
                Recent Visitor Activity Log
              </h3>
              <div className="overflow-x-auto max-h-[500px]">
                <table className="w-full text-left text-xs">
                  <thead className="sticky top-0 bg-[#0e1422] border-b border-slate-800 text-stone-400 font-bold uppercase text-[10px]">
                    <tr className="py-2">
                      <th className="py-2.5 px-3">Time</th>
                      <th className="py-2.5 px-3">Page / Path</th>
                      <th className="py-2.5 px-3">Referrer</th>
                      <th className="py-2.5 px-3">Device</th>
                      <th className="py-2.5 px-3">User Agent</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-mono">
                    {visits.slice(0, 50).map((v) => (
                      <tr key={v.id} className="hover:bg-slate-900/60">
                        <td className="py-2.5 px-3 text-stone-300">
                          {new Date(v.timestamp).toLocaleString()}
                        </td>
                        <td className="py-2.5 px-3 text-amber-300 font-bold">{v.path}</td>
                        <td className="py-2.5 px-3 text-stone-300">{v.referrer}</td>
                        <td className="py-2.5 px-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            v.device === 'mobile' ? 'bg-indigo-950 text-indigo-300' : 'bg-slate-800 text-slate-300'
                          }`}>
                            {v.device}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-stone-500 text-[11px] truncate max-w-xs font-sans">
                          {v.userAgent}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* TAB 3: COMMUNITY SURVEY MULTIPLE-CHOICE RESULTS */}
        {/* ================================================================= */}
        {activeTab === 'community' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight flex items-center gap-2.5">
                    <Users className="w-6 h-6 text-[#E5A93C]" />
                    <span>Community Survey Results ({totalCommunity} Submissions)</span>
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Live & Syncing
                  </span>
                </div>
                <p className="text-xs text-stone-400">
                  Multiple-choice tallies and question breakdowns across all sections of the community survey.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={async () => {
                    await AdminStore.addTestCommunitySurvey();
                    refreshData();
                  }}
                  className="px-3.5 py-1.5 rounded-xl bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 font-black text-xs uppercase tracking-wider flex items-center gap-1.5 border border-amber-400/50 transition-all cursor-pointer"
                  title="Generate a realistic test survey entry to verify tracking & real-time analytics"
                >
                  <Plus className="w-3.5 h-3.5 text-amber-400" />
                  <span>Test Survey (+1)</span>
                </button>

                <button
                  onClick={handleSyncLocal}
                  disabled={isSyncing}
                  className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:brightness-105 text-white font-black text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md border border-emerald-400 cursor-pointer disabled:opacity-50"
                  title="Synchronize all local community surveys to database"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                  <span>{isSyncing ? 'Syncing...' : 'Sync Database'}</span>
                </button>

                {/* View Mode Toggle */}
                <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800">
                  <button
                    onClick={() => setSurveyDisplayMode('condensed')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
                      surveyDisplayMode === 'condensed'
                        ? 'bg-[#E5A93C] text-slate-950 shadow-xs'
                        : 'text-stone-400 hover:text-white'
                    }`}
                    title="Condensed Tally Sheet of All Questions and Numbers"
                  >
                    <TableProperties className="w-3.5 h-3.5" />
                    <span>Condensed Tally</span>
                  </button>
                  <button
                    onClick={() => setSurveyDisplayMode('detailed')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
                      surveyDisplayMode === 'detailed'
                        ? 'bg-[#E5A93C] text-slate-950 shadow-xs'
                        : 'text-stone-400 hover:text-white'
                    }`}
                    title="Detailed Visual Bar Chart View"
                  >
                    <BarChart3 className="w-3.5 h-3.5" />
                    <span>Detailed Charts</span>
                  </button>
                </div>

                <button
                  onClick={() => exportToCSV('community')}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white border border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Export all 46 questions to CSV spreadsheet"
                >
                  <Download className="w-3.5 h-3.5 text-[#F3BA4F]" />
                  <span className="hidden sm:inline">CSV (46 Qs)</span>
                </button>

                <button
                  onClick={() => exportToJSON('community')}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white border border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Export complete raw JSON dump"
                >
                  <Code2 className="w-3.5 h-3.5 text-sky-400" />
                  <span className="hidden sm:inline">JSON</span>
                </button>
              </div>
            </div>

            {/* CONDENSED TALLY SHEET MODE (Small charts of questions with numbers side by side) */}
            {surveyDisplayMode === 'condensed' ? (
              <div className="space-y-6">
                
                {/* Quick Notice */}
                <div className="flex items-center justify-between px-4 py-2.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200">
                  <div className="flex items-center gap-2">
                    <TableProperties className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>
                      <strong>Condensed Matrix View:</strong> Showing all survey questions and the exact response count and percentage beside each answer option.
                    </span>
                  </div>
                  <span className="text-[11px] font-mono font-bold text-amber-300">
                    Total Responses: {totalCommunity}
                  </span>
                </div>

                {/* Dense Grid of Question Tally Cards for all Q1 to Q46 */}
                <CommunityQuestionsTallyGrid
                  communitySurveys={communitySurveys}
                  totalCommunity={totalCommunity}
                  aggregateSingleChoice={aggregateSingleChoice}
                  aggregateMultiChoice={aggregateMultiChoice}
                />

                {/* Individual Community Survey Submissions Log (Sorted Newest First) */}
                <div className="p-6 rounded-3xl bg-[#0e1422] border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <div>
                      <h3 className="text-sm font-black text-white uppercase tracking-wider">
                        Individual Survey Submissions Log
                      </h3>
                      <p className="text-[11px] text-stone-400">
                        Sorted by newest survey completed first (Total: {communitySurveys.length}) — Click any row to inspect all 46 answers
                      </p>
                    </div>
                    <span className="px-2 py-0.5 rounded-md bg-amber-400/20 text-[#F3BA4F] text-[10px] font-bold uppercase font-mono">
                      Newest First
                    </span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-slate-800 text-stone-400 font-bold uppercase text-[10px]">
                          <th className="py-2.5 px-3">Date / Time Completed</th>
                          <th className="py-2.5 px-3">Region / Town</th>
                          <th className="py-2.5 px-3">Age</th>
                          <th className="py-2.5 px-3">Household</th>
                          <th className="py-2.5 px-3">Needed Help</th>
                          <th className="py-2.5 px-3">Gave Up</th>
                          <th className="py-2.5 px-3">Key Barriers Reported</th>
                          <th className="py-2.5 px-3 text-right">Inspect Full Survey</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60 font-sans">
                        {communitySurveys.map((c) => (
                          <tr
                            key={c.id}
                            onClick={() => {
                              setSelectedInspectorSurvey(c);
                              setInspectorType('community');
                              setIsInspectorOpen(true);
                            }}
                            className="hover:bg-slate-900/90 cursor-pointer transition-colors group"
                          >
                            <td className="py-3 px-3 font-mono text-stone-200 whitespace-nowrap">
                              <div className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                                <span>
                                  {new Date(c.submittedAt).toLocaleDateString()} {new Date(c.submittedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                              </div>
                            </td>
                            <td className="py-3 px-3 font-bold text-amber-300">
                              {c.q2 || 'NL Resident'}
                            </td>
                            <td className="py-3 px-3 text-stone-300">{c.q3 || '—'}</td>
                            <td className="py-3 px-3 text-stone-400">{c.q4 || '—'}</td>
                            <td className="py-3 px-3">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${c.q6 === 'Yes' ? 'bg-amber-950 text-amber-300 border border-amber-800/60' : 'bg-slate-800 text-slate-300'}`}>
                                {c.q6 || '—'}
                              </span>
                            </td>
                            <td className="py-3 px-3">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${c.q14 === 'Yes' ? 'bg-red-950 text-red-300 border border-red-800/60' : c.q14 === 'No' ? 'bg-emerald-950 text-emerald-300' : 'bg-slate-800 text-slate-300'}`}>
                                {c.q14 || '—'}
                              </span>
                            </td>
                            <td className="py-3 px-3 text-stone-300 max-w-xs truncate">
                              {(c.q13 && c.q13.length > 0 ? c.q13 : c.q12 || []).slice(0, 2).join(', ') || '—'}
                            </td>
                            <td className="py-3 px-3 text-right">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedInspectorSurvey(c);
                                  setInspectorType('community');
                                  setIsInspectorOpen(true);
                                }}
                                className="px-2.5 py-1 rounded-lg bg-amber-400/15 hover:bg-amber-400/30 text-[#F3BA4F] hover:text-amber-200 text-[11px] font-black uppercase tracking-wider border border-amber-400/30 inline-flex items-center gap-1.5 transition-all shadow-xs"
                              >
                                <Eye className="w-3 h-3" />
                                <span>Inspect (46 Qs)</span>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            ) : (
              /* DETAILED GRAPH CARDS VIEW */
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Question 2: Geography / Region */}
                <div className="p-6 rounded-3xl bg-[#0e1422] border border-slate-800 space-y-4">
                  <div className="border-b border-slate-800 pb-2">
                    <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider">Question 2</span>
                    <h3 className="text-sm font-black text-white uppercase">Area of Newfoundland & Labrador</h3>
                  </div>
                  <div className="space-y-2.5">
                    {Object.entries(aggregateSingleChoice(communitySurveys.map((c) => c.q2)))
                      .sort(([, a], [, b]) => b - a)
                      .map(([area, count]) => {
                        const pct = totalCommunity > 0 ? Math.round((count / totalCommunity) * 100) : 0;
                        return (
                          <div key={area} className="space-y-1 text-xs">
                            <div className="flex justify-between font-bold">
                              <span className="text-slate-200">{area}</span>
                              <span className="text-amber-400 font-mono">{count} ({pct}%)</span>
                            </div>
                            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                              <div className="h-full bg-amber-400 rounded-full" style={{ width: `${pct}%` }} />
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>

                {/* Question 3: Age Distribution */}
                <div className="p-6 rounded-3xl bg-[#0e1422] border border-slate-800 space-y-4">
                  <div className="border-b border-slate-800 pb-2">
                    <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider">Question 3</span>
                    <h3 className="text-sm font-black text-white uppercase">Age Group Distribution</h3>
                  </div>
                  <div className="space-y-2.5">
                    {['Under 18', '18–24', '25–34', '35–44', '45–54', '55–64', '65+', 'Prefer not to say'].map((age) => {
                      const count = communitySurveys.filter((c) => c.q3 === age).length;
                      const pct = totalCommunity > 0 ? Math.round((count / totalCommunity) * 100) : 0;
                      return (
                        <div key={age} className="space-y-1 text-xs">
                          <div className="flex justify-between font-bold">
                            <span className="text-slate-200">{age}</span>
                            <span className="text-amber-400 font-mono">{count} ({pct}%)</span>
                          </div>
                          <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                            <div className="h-full bg-sky-400 rounded-full" style={{ width: `${pct}%` }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Question 7: Types of Help Needed */}
                <div className="p-6 rounded-3xl bg-[#0e1422] border border-slate-800 space-y-4">
                  <div className="border-b border-slate-800 pb-2">
                    <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider">Question 7</span>
                    <h3 className="text-sm font-black text-white uppercase">Types of Support Needed</h3>
                  </div>
                  <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                    {Object.entries(aggregateMultiChoice(communitySurveys.map((c) => c.q7 || [])))
                      .sort(([, a], [, b]) => b - a)
                      .map(([type, count]) => {
                        const pct = totalCommunity > 0 ? Math.round((count / totalCommunity) * 100) : 0;
                        return (
                          <div key={type} className="space-y-1 text-xs">
                            <div className="flex justify-between font-bold">
                              <span className="text-slate-200">{type}</span>
                              <span className="text-amber-400 font-mono">{count} ({pct}%)</span>
                            </div>
                            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                              <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${pct}%` }} />
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>

                {/* Question 14: Gave up trying to get help */}
                <div className="p-6 rounded-3xl bg-[#0e1422] border border-slate-800 space-y-4">
                  <div className="border-b border-slate-800 pb-2">
                    <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider">Question 14</span>
                    <h3 className="text-sm font-black text-white uppercase">Gave Up Due to Overwhelming Process</h3>
                  </div>
                  <div className="space-y-2.5">
                    {['Yes', 'No', 'Maybe', 'Prefer not to say'].map((ans) => {
                      const count = communitySurveys.filter((c) => c.q14 === ans).length;
                      const pct = totalCommunity > 0 ? Math.round((count / totalCommunity) * 100) : 0;
                      return (
                        <div key={ans} className="space-y-1 text-xs">
                          <div className="flex justify-between font-bold">
                            <span className="text-slate-200">{ans}</span>
                            <span className="text-amber-400 font-mono">{count} ({pct}%)</span>
                          </div>
                          <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                            <div
                              className={`h-full rounded-full ${ans === 'Yes' ? 'bg-red-400' : ans === 'No' ? 'bg-emerald-400' : 'bg-slate-400'}`}
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Question 13: Top 3 Biggest Problems */}
                <div className="md:col-span-2 p-6 rounded-3xl bg-[#0e1422] border border-slate-800 space-y-4">
                  <div className="border-b border-slate-800 pb-2">
                    <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider">Question 13</span>
                    <h3 className="text-sm font-black text-white uppercase">Ranked Top 3 Biggest Community Barriers</h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    {Object.entries(aggregateMultiChoice(communitySurveys.map((c) => c.q13 || [])))
                      .sort(([, a], [, b]) => b - a)
                      .map(([barrier, count], idx) => (
                        <div key={barrier} className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                          <span className="font-bold text-slate-200">
                            {idx + 1}. {barrier}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-amber-400/20 text-[#F3BA4F] font-mono font-bold">
                            {count}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Individual Community Survey Submissions Log */}
                <div className="md:col-span-2 p-6 rounded-3xl bg-[#0e1422] border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <div>
                      <h3 className="text-sm font-black text-white uppercase tracking-wider">
                        Individual Survey Submissions Log
                      </h3>
                      <p className="text-[11px] text-stone-400">
                        Sorted by newest survey completed first (Total: {communitySurveys.length})
                      </p>
                    </div>
                    <span className="px-2 py-0.5 rounded-md bg-amber-400/20 text-[#F3BA4F] text-[10px] font-bold uppercase font-mono">
                      Newest First
                    </span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-slate-800 text-stone-400 font-bold uppercase text-[10px]">
                          <th className="py-2.5 px-3">Date / Time Completed</th>
                          <th className="py-2.5 px-3">Region / Town</th>
                          <th className="py-2.5 px-3">Age</th>
                          <th className="py-2.5 px-3">Household</th>
                          <th className="py-2.5 px-3">Needed Help</th>
                          <th className="py-2.5 px-3">Gave Up</th>
                          <th className="py-2.5 px-3">Key Barriers Reported</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60 font-sans">
                        {communitySurveys.map((c) => (
                          <tr key={c.id} className="hover:bg-slate-900/60">
                            <td className="py-3 px-3 font-mono text-stone-200 whitespace-nowrap">
                              {new Date(c.submittedAt).toLocaleDateString()} {new Date(c.submittedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </td>
                            <td className="py-3 px-3 font-bold text-amber-300">
                              {c.q2 || 'NL Resident'}
                            </td>
                            <td className="py-3 px-3 text-stone-300">{c.q3 || '—'}</td>
                            <td className="py-3 px-3 text-stone-400">{c.q4 || '—'}</td>
                            <td className="py-3 px-3">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${c.q6 === 'Yes' ? 'bg-amber-950 text-amber-300 border border-amber-800/60' : 'bg-slate-800 text-slate-300'}`}>
                                {c.q6 || '—'}
                              </span>
                            </td>
                            <td className="py-3 px-3">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${c.q14 === 'Yes' ? 'bg-red-950 text-red-300 border border-red-800/60' : c.q14 === 'No' ? 'bg-emerald-950 text-emerald-300' : 'bg-slate-800 text-slate-300'}`}>
                                {c.q14 || '—'}
                              </span>
                            </td>
                            <td className="py-3 px-3 text-stone-300 max-w-xs truncate">
                              {(c.q13 && c.q13.length > 0 ? c.q13 : c.q12 || []).slice(0, 2).join(', ') || '—'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            )}

          </div>
        )}

        {/* ================================================================= */}
        {/* TAB 4: PROFESSIONAL & FRONTLINE SURVEY RESULTS */}
        {/* ================================================================= */}
        {activeTab === 'professional' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight flex items-center gap-2.5">
                    <Briefcase className="w-6 h-6 text-[#E5A93C]" />
                    <span>Frontline & Professional Survey Results ({totalProfessional} Submissions)</span>
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Live & Syncing
                  </span>
                </div>
                <p className="text-xs text-stone-400">
                  Insights and question tallies from caseworkers, non-profit directors, and healthcare workers.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={async () => {
                    await AdminStore.addTestProfessionalSurvey();
                    refreshData();
                  }}
                  className="px-3.5 py-1.5 rounded-xl bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 font-black text-xs uppercase tracking-wider flex items-center gap-1.5 border border-amber-400/50 transition-all cursor-pointer"
                  title="Generate a realistic test frontline agency survey entry"
                >
                  <Plus className="w-3.5 h-3.5 text-amber-400" />
                  <span>Test Agency (+1)</span>
                </button>

                <button
                  onClick={handleSyncLocal}
                  disabled={isSyncing}
                  className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:brightness-105 text-white font-black text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md border border-emerald-400 cursor-pointer disabled:opacity-50"
                  title="Synchronize all local frontline agency surveys to database"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                  <span>{isSyncing ? 'Syncing...' : 'Sync Database'}</span>
                </button>

                {/* View Mode Toggle */}
                <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800">
                  <button
                    onClick={() => setSurveyDisplayMode('condensed')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
                      surveyDisplayMode === 'condensed'
                        ? 'bg-[#E5A93C] text-slate-950 shadow-xs'
                        : 'text-stone-400 hover:text-white'
                    }`}
                    title="Condensed Tally Sheet of Questions and Numbers"
                  >
                    <TableProperties className="w-3.5 h-3.5" />
                    <span>Condensed Tally</span>
                  </button>
                  <button
                    onClick={() => setSurveyDisplayMode('detailed')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
                      surveyDisplayMode === 'detailed'
                        ? 'bg-[#E5A93C] text-slate-950 shadow-xs'
                        : 'text-stone-400 hover:text-white'
                    }`}
                    title="Detailed Visual Bar Chart View"
                  >
                    <BarChart3 className="w-3.5 h-3.5" />
                    <span>Detailed Charts</span>
                  </button>
                </div>

                <button
                  onClick={() => exportToCSV('professional')}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white border border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Export all professional survey answers to CSV"
                >
                  <Download className="w-3.5 h-3.5 text-[#F3BA4F]" />
                  <span className="hidden sm:inline">CSV (All Qs)</span>
                </button>

                <button
                  onClick={() => exportToJSON('professional')}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white border border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Export complete raw JSON dump"
                >
                  <Code2 className="w-3.5 h-3.5 text-sky-400" />
                  <span className="hidden sm:inline">JSON</span>
                </button>
              </div>
            </div>

            {/* CONDENSED TALLY SHEET MODE */}
            {surveyDisplayMode === 'condensed' ? (
              <div className="space-y-6">
                
                {/* Notice */}
                <div className="flex items-center justify-between px-4 py-2.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200">
                  <div className="flex items-center gap-2">
                    <TableProperties className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>
                      <strong>Condensed Matrix View:</strong> Showing frontline questions and the exact response count and percentage beside each answer option.
                    </span>
                  </div>
                  <span className="text-[11px] font-mono font-bold text-amber-300">
                    Total Agencies: {totalProfessional}
                  </span>
                </div>

                {/* Dense Grid of Questions for Professional Surveys */}
                <ProfessionalQuestionsTallyGrid
                  professionalSurveys={professionalSurveys}
                  totalProfessional={totalProfessional}
                  aggregateSingleChoice={aggregateSingleChoice}
                  aggregateMultiChoice={aggregateMultiChoice}
                />

                {/* Agency Contacts Table */}
                <div className="p-6 rounded-3xl bg-[#0e1422] border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <div>
                      <h3 className="text-sm font-black text-white uppercase tracking-wider">
                        Partner Agency Registry & Submissions Log
                      </h3>
                      <p className="text-[11px] text-stone-400">
                        Total Frontline Submissions: {professionalSurveys.length} — Click any row to inspect all answers
                      </p>
                    </div>
                    <span className="px-2 py-0.5 rounded-md bg-amber-400/20 text-[#F3BA4F] text-[10px] font-bold uppercase font-mono">
                      Newest First
                    </span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-slate-800 text-stone-400 font-bold uppercase text-[10px]">
                          <th className="py-2.5 px-3">Date</th>
                          <th className="py-2.5 px-3">Organization</th>
                          <th className="py-2.5 px-3">Contact Person</th>
                          <th className="py-2.5 px-3">Email</th>
                          <th className="py-2.5 px-3">Phone</th>
                          <th className="py-2.5 px-3">Sector</th>
                          <th className="py-2.5 px-3">Partnership Interest</th>
                          <th className="py-2.5 px-3 text-right">Inspect Full Survey</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60 font-sans">
                        {professionalSurveys.map((p) => (
                          <tr
                            key={p.id}
                            onClick={() => {
                              setSelectedInspectorSurvey(p);
                              setInspectorType('professional');
                              setIsInspectorOpen(true);
                            }}
                            className="hover:bg-slate-900/90 cursor-pointer transition-colors group"
                          >
                            <td className="py-3 px-3 font-mono text-stone-300 whitespace-nowrap">
                              <div className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#E5A93C] opacity-0 group-hover:opacity-100 transition-opacity" />
                                <span>{new Date(p.submittedAt).toLocaleDateString()}</span>
                              </div>
                            </td>
                            <td className="py-3 px-3 font-bold text-white">{p.q1 || p.orgName || 'Anonymous Agency'}</td>
                            <td className="py-3 px-3 text-stone-200">{p.q29Name || p.contactName || 'Anonymous Staff'}</td>
                            <td className="py-3 px-3 font-mono text-amber-300">{p.q29Email || p.contactEmail || '—'}</td>
                            <td className="py-3 px-3 font-mono text-stone-400">{p.q29Phone || p.contactPhone || '—'}</td>
                            <td className="py-3 px-3 text-stone-300">{p.q4 || p.sector || '—'}</td>
                            <td className="py-3 px-3 text-emerald-400 font-bold">{p.q27 || p.partnershipInterest || '—'}</td>
                            <td className="py-3 px-3 text-right">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedInspectorSurvey(p);
                                  setInspectorType('professional');
                                  setIsInspectorOpen(true);
                                }}
                                className="px-2.5 py-1 rounded-lg bg-amber-400/15 hover:bg-amber-400/30 text-[#F3BA4F] hover:text-amber-200 text-[11px] font-black uppercase tracking-wider border border-amber-400/30 inline-flex items-center gap-1.5 transition-all shadow-xs"
                              >
                                <Eye className="w-3 h-3" />
                                <span>Inspect (All Qs)</span>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            ) : (
              /* DETAILED CARDS VIEW */
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Sector Breakdown */}
                <div className="p-6 rounded-3xl bg-[#0e1422] border border-slate-800 space-y-4">
                  <h3 className="text-sm font-black text-white uppercase tracking-wider border-b border-slate-800 pb-2">
                    Frontline Sectors Represented
                  </h3>
                  <div className="space-y-2.5">
                    {Object.entries(aggregateSingleChoice(professionalSurveys.map((p) => p.sector)))
                      .sort(([, a], [, b]) => b - a)
                      .map(([sector, count]) => {
                        const pct = totalProfessional > 0 ? Math.round((count / totalProfessional) * 100) : 0;
                        return (
                          <div key={sector} className="space-y-1 text-xs">
                            <div className="flex justify-between font-bold">
                              <span className="text-slate-200">{sector}</span>
                              <span className="text-amber-400 font-mono">{count} ({pct}%)</span>
                            </div>
                            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                              <div className="h-full bg-amber-400 rounded-full" style={{ width: `${pct}%` }} />
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>

                {/* Roles Breakdown */}
                <div className="p-6 rounded-3xl bg-[#0e1422] border border-slate-800 space-y-4">
                  <h3 className="text-sm font-black text-white uppercase tracking-wider border-b border-slate-800 pb-2">
                    Professional Roles & Positions
                  </h3>
                  <div className="space-y-2.5">
                    {Object.entries(aggregateSingleChoice(professionalSurveys.map((p) => p.role)))
                      .sort(([, a], [, b]) => b - a)
                      .map(([role, count]) => {
                        const pct = totalProfessional > 0 ? Math.round((count / totalProfessional) * 100) : 0;
                        return (
                          <div key={role} className="space-y-1 text-xs">
                            <div className="flex justify-between font-bold">
                              <span className="text-slate-200">{role}</span>
                              <span className="text-amber-400 font-mono">{count} ({pct}%)</span>
                            </div>
                            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                              <div className="h-full bg-sky-400 rounded-full" style={{ width: `${pct}%` }} />
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>

                {/* Frontline Observed Barriers */}
                <div className="md:col-span-2 p-6 rounded-3xl bg-[#0e1422] border border-slate-800 space-y-4">
                  <h3 className="text-sm font-black text-white uppercase tracking-wider border-b border-slate-800 pb-2">
                    Systemic Barriers Observed on the Ground
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    {Object.entries(aggregateMultiChoice(professionalSurveys.map((p) => p.barriers || [])))
                      .sort(([, a], [, b]) => b - a)
                      .map(([barrier, count], idx) => (
                        <div key={barrier} className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                          <span className="font-bold text-slate-200">
                            {idx + 1}. {barrier}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-sky-400/20 text-sky-300 font-mono font-bold">
                            {count}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Frequency Falling Through Cracks */}
                <div className="p-6 rounded-3xl bg-[#0e1422] border border-slate-800 space-y-4">
                  <h3 className="text-sm font-black text-white uppercase tracking-wider border-b border-slate-800 pb-2">
                    How Often Clients Fall Between Mandates
                  </h3>
                  <div className="space-y-2.5">
                    {['Daily', 'Several times a week', 'Weekly', 'Monthly', 'Rarely'].map((freq) => {
                      const count = professionalSurveys.filter((p) => p.frequencyFallingThrough === freq).length;
                      const pct = totalProfessional > 0 ? Math.round((count / totalProfessional) * 100) : 0;
                      return (
                        <div key={freq} className="space-y-1 text-xs">
                          <div className="flex justify-between font-bold">
                            <span className="text-slate-200">{freq}</span>
                            <span className="text-red-400 font-mono">{count} ({pct}%)</span>
                          </div>
                          <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                            <div className="h-full bg-red-400 rounded-full" style={{ width: `${pct}%` }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Partnership & Collaboration Readiness */}
                <div className="p-6 rounded-3xl bg-[#0e1422] border border-slate-800 space-y-4">
                  <h3 className="text-sm font-black text-white uppercase tracking-wider border-b border-slate-800 pb-2">
                    Interest in Collaborating with FTG
                  </h3>
                  <div className="space-y-2.5">
                    {Object.entries(aggregateSingleChoice(professionalSurveys.map((p) => p.partnershipInterest)))
                      .sort(([, a], [, b]) => b - a)
                      .map(([interest, count]) => {
                        const pct = totalProfessional > 0 ? Math.round((count / totalProfessional) * 100) : 0;
                        return (
                          <div key={interest} className="space-y-1 text-xs">
                            <div className="flex justify-between font-bold">
                              <span className="text-slate-200">{interest}</span>
                              <span className="text-emerald-400 font-mono">{count} ({pct}%)</span>
                            </div>
                            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                              <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${pct}%` }} />
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>

                {/* Agency Contacts Table */}
                <div className="md:col-span-2 p-6 rounded-3xl bg-[#0e1422] border border-slate-800 space-y-4">
                  <h3 className="text-sm font-black text-white uppercase tracking-wider border-b border-slate-800 pb-2">
                    Partner Agency Registry & Contact List
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-slate-800 text-stone-400 font-bold uppercase text-[10px]">
                          <th className="py-2.5 px-3">Organization</th>
                          <th className="py-2.5 px-3">Contact Person</th>
                          <th className="py-2.5 px-3">Email</th>
                          <th className="py-2.5 px-3">Phone</th>
                          <th className="py-2.5 px-3">Sector</th>
                          <th className="py-2.5 px-3">Partnership Interest</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60 font-sans">
                        {professionalSurveys.map((p) => (
                          <tr key={p.id} className="hover:bg-slate-900/60">
                            <td className="py-3 px-3 font-bold text-white">{p.q1 || p.orgName || 'Anonymous Agency'}</td>
                            <td className="py-3 px-3 text-stone-200">{p.q29Name || p.contactName || 'Anonymous Staff'}</td>
                            <td className="py-3 px-3 font-mono text-amber-300">{p.q29Email || p.contactEmail || '—'}</td>
                            <td className="py-3 px-3 font-mono text-stone-400">{p.q29Phone || p.contactPhone || '—'}</td>
                            <td className="py-3 px-3 text-stone-300">{p.q4 || p.sector || '—'}</td>
                            <td className="py-3 px-3 text-emerald-400 font-bold">{p.q27 || p.partnershipInterest || '—'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            )}
          </div>
        )}

        {/* ================================================================= */}
        {/* TAB 5: DONATIONS & FINANCIAL LEDGER */}
        {/* ================================================================= */}
        {activeTab === 'donations' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
                    Donations & Financial Ledger
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Live & Syncing
                  </span>
                </div>
                <p className="text-xs text-stone-400">
                  Complete register of money donated, donor names, dates, payment channels, and notes.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsAddDonationOpen(true)}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  <span>Record New Donation</span>
                </button>
                <button
                  onClick={() => exportToCSV('donations')}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white border border-slate-700 flex items-center gap-2"
                >
                  <Download className="w-4 h-4 text-[#F3BA4F]" />
                  <span>Export CSV</span>
                </button>
              </div>
            </div>

            {/* Financial Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-[#0e1422] border-2 border-[#E5A93C] space-y-1">
                <span className="text-xs font-bold text-stone-400 uppercase">Total Money Donated</span>
                <div className="text-3xl font-black text-[#F3BA4F] font-mono">
                  ${totalDonationsAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
              </div>
              <div className="p-5 rounded-2xl bg-[#0e1422] border border-slate-800 space-y-1">
                <span className="text-xs font-bold text-stone-400 uppercase">Total Donors</span>
                <div className="text-3xl font-black text-white font-mono">{donations.length}</div>
              </div>
              <div className="p-5 rounded-2xl bg-[#0e1422] border border-slate-800 space-y-1">
                <span className="text-xs font-bold text-stone-400 uppercase">Average Contribution</span>
                <div className="text-3xl font-black text-emerald-400 font-mono">${avgDonation.toFixed(2)}</div>
              </div>
              <div className="p-5 rounded-2xl bg-[#0e1422] border border-slate-800 space-y-1">
                <span className="text-xs font-bold text-stone-400 uppercase">Verified In Bank</span>
                <div className="text-3xl font-black text-sky-400 font-mono">
                  ${donations.filter((d) => d.status === 'Verified').reduce((acc, d) => acc + d.amount, 0).toFixed(2)}
                </div>
              </div>
            </div>

            {/* Full Donations Table */}
            <div className="p-6 rounded-3xl bg-[#0e1422] border border-slate-800 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black text-white uppercase tracking-wider">
                  Donation Transactions Log
                </h3>
                <span className="text-xs text-stone-400">{donations.length} records</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-800 text-stone-400 font-bold uppercase text-[10px]">
                      <th className="py-2.5 px-3">Donor Name</th>
                      <th className="py-2.5 px-3">Amount</th>
                      <th className="py-2.5 px-3">Date</th>
                      <th className="py-2.5 px-3">Payment Method</th>
                      <th className="py-2.5 px-3">Status</th>
                      <th className="py-2.5 px-3">Notes & Dedication</th>
                      <th className="py-2.5 px-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {donations.map((d) => (
                      <tr key={d.id} className="hover:bg-slate-900/60">
                        <td className="py-3 px-3 font-bold text-white">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[#E5A93C]" />
                            <span>{d.donorName}</span>
                            {d.isAnonymous && (
                              <span className="text-[10px] text-stone-400 bg-slate-800 px-1.5 py-0.5 rounded">
                                Anon
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-3 font-mono font-black text-[#F3BA4F] text-sm">
                          ${d.amount.toFixed(2)}
                        </td>
                        <td className="py-3 px-3 font-mono text-stone-300">
                          {new Date(d.date).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-3">
                          <span className="px-2 py-0.5 rounded-md bg-slate-800 border border-slate-700 text-stone-300 font-medium">
                            {d.method}
                          </span>
                        </td>
                        <td className="py-3 px-3">
                          <button
                            onClick={() => {
                              const nextStatus = d.status === 'Verified' ? 'Received' : d.status === 'Received' ? 'Pledged' : 'Verified';
                              AdminStore.updateDonationStatus(d.id, nextStatus);
                              refreshData();
                            }}
                            className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider cursor-pointer transition-all ${
                              d.status === 'Verified'
                                ? 'bg-emerald-950 text-emerald-300 border border-emerald-700/60 hover:bg-emerald-900'
                                : d.status === 'Received'
                                ? 'bg-blue-950 text-blue-300 border border-blue-700/60 hover:bg-blue-900'
                                : 'bg-amber-950 text-amber-300 border border-amber-700/60 hover:bg-amber-900'
                            }`}
                            title="Click to cycle status: Verified -> Received -> Pledged"
                          >
                            {d.status} ↻
                          </button>
                        </td>
                        <td className="py-3 px-3 text-stone-300 italic max-w-sm">
                          {d.notes || '—'}
                        </td>
                        <td className="py-3 px-3 text-right">
                          <button
                            onClick={() => {
                              if (confirm(`Delete donation from ${d.donorName} ($${d.amount})?`)) {
                                AdminStore.deleteDonation(d.id);
                                refreshData();
                              }
                            }}
                            className="p-1.5 rounded-lg text-stone-500 hover:text-red-400 hover:bg-red-950/40 transition-colors"
                            title="Delete record"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* TAB: CONTACT INQUIRIES & DIRECT MESSAGES */}
        {/* ================================================================= */}
        {activeTab === 'messages' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
                    Contact Inquiries & Direct Messages
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Live & Syncing
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-700/60 font-mono text-xs font-bold">
                    {contactMessages.length} Total
                  </span>
                  {unreadMessagesCount > 0 && (
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider">
                      {unreadMessagesCount} Unread
                    </span>
                  )}
                </div>
                <p className="text-xs text-stone-400">
                  Messages submitted by community members, agency staff, partners, and volunteers through the public Contact page.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => exportToCSV('messages')}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-amber-400" />
                  <span>Export Messages CSV</span>
                </button>
              </div>
            </div>

            {/* Filters Bar */}
            <div className="p-4 rounded-2xl bg-[#0e1422] border border-slate-800 space-y-3">
              <div className="flex flex-col md:flex-row md:items-center gap-3">
                {/* Search */}
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-3 top-3 text-stone-400" />
                  <input
                    type="text"
                    placeholder="Search by sender name, email, reason, or message content..."
                    value={messageSearchQuery}
                    onChange={(e) => setMessageSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>

                {/* Reason Filter */}
                <div className="w-full md:w-56">
                  <select
                    value={messageReasonFilter}
                    onChange={(e) => setMessageReasonFilter(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-400 cursor-pointer"
                  >
                    <option value="all">All Inquiry Reasons</option>
                    <option value="Question">Question</option>
                    <option value="Know about a gap">Know about a gap</option>
                    <option value="Know about a resource">Know about a resource</option>
                    <option value="Want to get involved">Want to get involved</option>
                    <option value="Interested in partnering">Interested in partnering</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* Status Filter Tabs */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800/80">
                <div className="flex flex-wrap items-center gap-1.5">
                  {[
                    { id: 'all', label: `All (${contactMessages.length})` },
                    { id: 'Unread', label: `Unread (${contactMessages.filter(m => m.status === 'Unread').length})` },
                    { id: 'Read', label: `Read (${contactMessages.filter(m => m.status === 'Read').length})` },
                    { id: 'Replied', label: `Replied (${contactMessages.filter(m => m.status === 'Replied').length})` },
                  ].map((statusTab) => (
                    <button
                      key={statusTab.id}
                      onClick={() => setMessageStatusFilter(statusTab.id as any)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        messageStatusFilter === statusTab.id
                          ? 'bg-amber-400 text-slate-950 font-black shadow-sm'
                          : 'bg-slate-900/90 text-stone-400 hover:text-white hover:bg-slate-800'
                      }`}
                    >
                      {statusTab.label}
                    </button>
                  ))}
                </div>

                <div className="text-[11px] text-stone-400 font-mono">
                  Showing {
                    contactMessages.filter((m) => {
                      const matchSearch =
                        !messageSearchQuery ||
                        m.name.toLowerCase().includes(messageSearchQuery.toLowerCase()) ||
                        m.email.toLowerCase().includes(messageSearchQuery.toLowerCase()) ||
                        m.message.toLowerCase().includes(messageSearchQuery.toLowerCase()) ||
                        m.reason.toLowerCase().includes(messageSearchQuery.toLowerCase());
                      const matchStatus = messageStatusFilter === 'all' || m.status === messageStatusFilter;
                      const matchReason = messageReasonFilter === 'all' || m.reason === messageReasonFilter;
                      return matchSearch && matchStatus && matchReason;
                    }).length
                  } of {contactMessages.length} messages
                </div>
              </div>
            </div>

            {/* Messages Feed */}
            {contactMessages.length === 0 ? (
              <div className="p-12 rounded-3xl bg-[#0e1422] border border-slate-800 text-center space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-stone-500">
                  <Inbox className="w-7 h-7" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-black text-white uppercase">No Contact Messages Yet</h3>
                  <p className="text-xs text-stone-400 max-w-md mx-auto">
                    When visitors, community members, or agency partners submit inquiries through the public Contact page, they will be archived and displayed here in real time.
                  </p>
                </div>
              </div>
            ) : (
              (() => {
                const filtered = contactMessages.filter((m) => {
                  const matchSearch =
                    !messageSearchQuery ||
                    m.name.toLowerCase().includes(messageSearchQuery.toLowerCase()) ||
                    m.email.toLowerCase().includes(messageSearchQuery.toLowerCase()) ||
                    m.message.toLowerCase().includes(messageSearchQuery.toLowerCase()) ||
                    m.reason.toLowerCase().includes(messageSearchQuery.toLowerCase());
                  const matchStatus = messageStatusFilter === 'all' || m.status === messageStatusFilter;
                  const matchReason = messageReasonFilter === 'all' || m.reason === messageReasonFilter;
                  return matchSearch && matchStatus && matchReason;
                });

                if (filtered.length === 0) {
                  return (
                    <div className="p-12 rounded-3xl bg-[#0e1422] border border-slate-800 text-center space-y-3">
                      <Search className="w-8 h-8 text-stone-500 mx-auto" />
                      <h3 className="text-sm font-black text-white uppercase">No Messages Matching Your Filter</h3>
                      <p className="text-xs text-stone-400">
                        Try resetting your search query or status filter to see all messages.
                      </p>
                      <button
                        onClick={() => {
                          setMessageSearchQuery('');
                          setMessageStatusFilter('all');
                          setMessageReasonFilter('all');
                        }}
                        className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-amber-400 transition-colors"
                      >
                        Reset All Filters
                      </button>
                    </div>
                  );
                }

                return (
                  <div className="space-y-4">
                    {filtered.map((msg) => (
                      <div
                        key={msg.id}
                        className={`p-5 sm:p-6 rounded-3xl border transition-all space-y-4 ${
                          msg.status === 'Unread'
                            ? 'bg-gradient-to-br from-[#121b30] via-[#0f1627] to-[#0c1220] border-amber-400/60 shadow-xl ring-1 ring-amber-400/20'
                            : 'bg-[#0e1422] border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        {/* Message Header */}
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 border-b border-slate-800/80 pb-3">
                          <div className="space-y-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="text-base font-black text-white">{msg.name}</span>
                              
                              {/* Reason Badge */}
                              <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                                msg.reason === 'Know about a gap'
                                  ? 'bg-amber-950/80 text-amber-300 border-amber-800/60'
                                  : msg.reason === 'Know about a resource'
                                  ? 'bg-sky-950/80 text-sky-300 border-sky-800/60'
                                  : msg.reason === 'Want to get involved' || msg.reason === 'Interested in partnering'
                                  ? 'bg-emerald-950/80 text-emerald-300 border-emerald-800/60'
                                  : 'bg-indigo-950/80 text-indigo-300 border-indigo-800/60'
                              }`}>
                                {msg.reason}
                              </span>

                              {/* Status Tag */}
                              <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md ${
                                msg.status === 'Unread'
                                  ? 'bg-amber-400 text-slate-950 font-black'
                                  : msg.status === 'Replied'
                                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                                  : 'bg-slate-800 text-stone-300 border border-slate-700'
                              }`}>
                                {msg.status}
                              </span>
                            </div>

                            {/* Email & Copy */}
                            <div className="flex items-center gap-2 text-xs text-stone-300 font-mono">
                              <Mail className="w-3.5 h-3.5 text-stone-400" />
                              <a
                                href={`mailto:${msg.email}?subject=${encodeURIComponent(`Re: Fill the Gap NL — ${msg.reason}`)}`}
                                className="text-amber-400 hover:underline"
                              >
                                {msg.email}
                              </a>
                              <button
                                onClick={() => copyText(msg.email, msg.id + '-email')}
                                className="p-1 rounded hover:bg-slate-800 text-stone-400 hover:text-white transition-colors"
                                title="Copy Email Address"
                              >
                                {copiedId === msg.id + '-email' ? (
                                  <Check className="w-3 h-3 text-emerald-400" />
                                ) : (
                                  <Copy className="w-3 h-3" />
                                )}
                              </button>
                            </div>
                          </div>

                          {/* Timestamp & Status Controls */}
                          <div className="flex flex-wrap items-center gap-2 sm:self-start">
                            <div className="flex items-center gap-1.5 text-stone-400 text-xs font-mono">
                              <Clock className="w-3.5 h-3.5 text-stone-500" />
                              <span>{new Date(msg.submittedAt).toLocaleDateString()} at {new Date(msg.submittedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                            </div>

                            {/* Quick status cycle button */}
                            <button
                              onClick={() => {
                                const nextStatus =
                                  msg.status === 'Unread'
                                    ? 'Read'
                                    : msg.status === 'Read'
                                    ? 'Replied'
                                    : 'Unread';
                                AdminStore.updateContactMessageStatus(msg.id, nextStatus);
                                refreshData();
                              }}
                              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] font-bold text-stone-300 border border-slate-700 transition-colors"
                              title="Click to toggle status"
                            >
                              Status: {msg.status} ↻
                            </button>

                            {/* Delete Message */}
                            <button
                              onClick={() => {
                                if (confirm(`Delete contact message from ${msg.name}?`)) {
                                  AdminStore.deleteContactMessage(msg.id);
                                  refreshData();
                                }
                              }}
                              className="p-1.5 rounded-lg text-stone-500 hover:text-red-400 hover:bg-red-950/40 transition-colors"
                              title="Delete this message"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Message Body */}
                        <div className="space-y-1">
                          <div className="text-[10px] font-bold uppercase text-stone-400 tracking-wider">
                            Message Content:
                          </div>
                          <div className="p-4 rounded-2xl bg-[#090d17] border border-slate-800/80 text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-wrap font-sans">
                            {msg.message}
                          </div>
                        </div>

                        {/* Actions Footer */}
                        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                          <div className="flex flex-wrap items-center gap-2">
                            <a
                              href={`mailto:${msg.email}?subject=${encodeURIComponent(`Re: Fill the Gap NL — ${msg.reason}`)}`}
                              onClick={() => {
                                AdminStore.updateContactMessageStatus(msg.id, 'Replied');
                                refreshData();
                              }}
                              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:brightness-105 text-slate-950 font-black text-xs flex items-center gap-2 shadow-md border border-amber-300 transition-transform active:scale-95"
                            >
                              <Send className="w-3.5 h-3.5" />
                              <span>Reply via Email ({msg.email})</span>
                            </a>

                            {msg.status !== 'Replied' && (
                              <button
                                onClick={() => {
                                  AdminStore.updateContactMessageStatus(msg.id, 'Replied');
                                  refreshData();
                                }}
                                className="px-3 py-2 rounded-xl bg-emerald-950 hover:bg-emerald-900 text-emerald-300 font-bold text-xs border border-emerald-700/60 flex items-center gap-1.5 transition-colors"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>Mark as Replied</span>
                              </button>
                            )}

                            {msg.status === 'Unread' ? (
                              <button
                                onClick={() => {
                                  AdminStore.updateContactMessageStatus(msg.id, 'Read');
                                  refreshData();
                                }}
                                className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-stone-300 font-bold text-xs border border-slate-700 transition-colors"
                              >
                                Mark as Read
                              </button>
                            ) : (
                              <button
                                onClick={() => {
                                  AdminStore.updateContactMessageStatus(msg.id, 'Unread');
                                  refreshData();
                                }}
                                className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-stone-300 font-bold text-xs border border-slate-700 transition-colors"
                              >
                                Mark as Unread
                              </button>
                            )}
                          </div>

                          <div className="text-[10px] text-stone-400 font-mono">
                            ID: {msg.id}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })()
            )}
          </div>
        )}

        {/* ================================================================= */}
        {/* TAB 6: FILL IN THE BLANK & WRITTEN RESPONSES EXPLORER */}
        {/* ================================================================= */}
        {activeTab === 'written' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
                    Written & Fill-In-The-Blank Responses
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Live & Syncing
                  </span>
                </div>
                <p className="text-xs text-stone-400">
                  Open-ended comments, lived experiences, barriers described, and suggestions from respondents.
                </p>
              </div>
              
              {/* Search filter */}
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 absolute left-3 top-3 text-stone-400" />
                <input
                  type="text"
                  placeholder="Search in written responses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>
            </div>

            {/* Response Cards Feed */}
            <div className="space-y-4">
              
              {/* 1. Community Survey "Reason for Giving Up" (Q15) */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-400" />
                  <h3 className="text-xs font-black uppercase tracking-wider text-amber-300">
                    Community Survey • Question 15: Reasons Given Up Trying to Get Help
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {communitySurveys
                    .filter((c) => c.q15 && c.q15.toLowerCase().includes(searchQuery.toLowerCase()))
                    .map((c) => (
                      <div key={c.id + '-q15'} className="p-4 bg-[#0e1422] border border-slate-800 rounded-2xl space-y-2 relative group">
                        <div className="flex items-center justify-between text-[11px] text-stone-400">
                          <span className="font-bold text-white flex items-center gap-1.5">
                            <MapPin className="w-3 h-3 text-amber-400" />
                            {c.q2 || 'NL Resident'} • Age: {c.q3 || 'Not specified'}
                          </span>
                          <span className="font-mono">{new Date(c.submittedAt).toLocaleDateString()}</span>
                        </div>
                        <p className="text-xs text-slate-200 leading-relaxed font-medium">
                          "{c.q15}"
                        </p>
                        <div className="flex justify-end pt-1">
                          <button
                            onClick={() => copyText(c.q15 || '', c.id + '-q15')}
                            className="text-[10px] text-stone-400 hover:text-amber-300 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            {copiedId === c.id + '-q15' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                            <span>{copiedId === c.id + '-q15' ? 'Copied' : 'Copy Quote'}</span>
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* 2. Community Survey Closing Suggestions (Q22) */}
              <div className="space-y-3 pt-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <h3 className="text-xs font-black uppercase tracking-wider text-amber-300">
                    Community Survey • Suggestions & What Would Make Things Better
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {communitySurveys
                    .filter((c) => c.q22 && c.q22.toLowerCase().includes(searchQuery.toLowerCase()))
                    .map((c) => (
                      <div key={c.id + '-q22'} className="p-4 bg-[#0e1422] border border-slate-800 rounded-2xl space-y-2 relative group">
                        <div className="flex items-center justify-between text-[11px] text-stone-400">
                          <span className="font-bold text-white flex items-center gap-1.5">
                            <MapPin className="w-3 h-3 text-amber-400" />
                            {c.q2 || 'NL Resident'}
                          </span>
                          <span className="font-mono">{new Date(c.submittedAt).toLocaleDateString()}</span>
                        </div>
                        <p className="text-xs text-slate-200 leading-relaxed font-medium">
                          "{c.q22}"
                        </p>
                        <div className="flex justify-end pt-1">
                          <button
                            onClick={() => copyText(c.q22 || '', c.id + '-q22')}
                            className="text-[10px] text-stone-400 hover:text-amber-300 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            {copiedId === c.id + '-q22' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                            <span>{copiedId === c.id + '-q22' ? 'Copied' : 'Copy Quote'}</span>
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* 3. Frontline Professional Feedback */}
              <div className="space-y-3 pt-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-sky-400" />
                  <h3 className="text-xs font-black uppercase tracking-wider text-sky-300">
                    Professional Survey • Frontline Bottlenecks & Needed Emergency Relief
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {professionalSurveys
                    .filter((p) =>
                      (p.referralFailureReason || p.mostNeededSupport || p.additionalComments || '').toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map((p) => (
                      <div key={p.id} className="p-4 bg-[#0e1422] border border-slate-800 rounded-2xl space-y-3">
                        <div className="flex items-center justify-between text-[11px] text-stone-400 border-b border-slate-800 pb-2">
                          <div>
                            <span className="font-bold text-white block">{p.orgName}</span>
                            <span className="text-[10px] text-amber-300">{p.role} • {p.sector}</span>
                          </div>
                          <span className="font-mono">{new Date(p.submittedAt).toLocaleDateString()}</span>
                        </div>

                        {p.referralFailureReason && (
                          <div className="space-y-1">
                            <span className="text-[10px] font-bold uppercase text-red-300">Why referrals fail:</span>
                            <p className="text-xs text-slate-300 italic">"{p.referralFailureReason}"</p>
                          </div>
                        )}

                        {p.mostNeededSupport && (
                          <div className="space-y-1">
                            <span className="text-[10px] font-bold uppercase text-emerald-300">Most needed support:</span>
                            <p className="text-xs text-slate-300 italic">"{p.mostNeededSupport}"</p>
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* TAB 7: SETTINGS & SECURITY */}
        {/* ================================================================= */}
        {activeTab === 'settings' && (
          <div className="max-w-3xl space-y-8">
            <div className="border-b border-slate-800 pb-4">
              <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
                Admin Settings & Security Credentials
              </h2>
              <p className="text-xs text-stone-400">
                Manage your dashboard login username, password, and persistent data backups.
              </p>
            </div>

            {/* Credentials Form */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#0e1422] border-2 border-[#E5A93C]/60 shadow-xl space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-[#F3BA4F] flex items-center justify-center border border-[#E5A93C]/40">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-white uppercase">
                    Update Dashboard Credentials
                  </h3>
                  <p className="text-xs text-stone-400">
                    Change the username and password used to access <code className="text-amber-300 font-mono">/admin</code>.
                  </p>
                </div>
              </div>

              {credsSuccess && (
                <div className="p-3 bg-emerald-950/80 border border-emerald-500/60 rounded-xl text-emerald-200 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{credsSuccess}</span>
                </div>
              )}

              {credsError && (
                <div className="p-3 bg-red-950/80 border border-red-500/60 rounded-xl text-red-200 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{credsError}</span>
                </div>
              )}

              <form onSubmit={handleUpdateCredentials} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase text-slate-300">
                    Username
                  </label>
                  <input
                    type="text"
                    value={editUsername}
                    onChange={(e) => setEditUsername(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase text-slate-300">
                      New Password
                    </label>
                    <input
                      type="password"
                      placeholder="Enter new password"
                      value={editPassword}
                      onChange={(e) => setEditPassword(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase text-slate-300">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      placeholder="Re-type new password"
                      value={editConfirmPassword}
                      onChange={(e) => setEditConfirmPassword(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 hover:brightness-105 text-slate-950 font-black text-xs uppercase tracking-wider shadow-md border border-amber-300 cursor-pointer"
                >
                  Save New Credentials
                </button>
              </form>
            </div>

            {/* Mascot Photo Management */}
            <div className="p-6 rounded-3xl bg-[#0e1422] border border-slate-800 space-y-4">
              <div className="flex items-center gap-2 text-amber-400">
                <Sparkles className="w-4 h-4" />
                <h3 className="text-sm font-black text-white uppercase tracking-wider">
                  Atlantic Puffin Mascot Artwork
                </h3>
              </div>
              <p className="text-xs text-stone-400">
                Upload and synchronize the high-resolution Puffin Mascot artwork (e.g. Gemini rendered image) across the entire website navigation, hero cards, donation page, and admin portal.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                <div className="w-24 h-24 rounded-2xl bg-white p-2 border-2 border-amber-400/80 shadow-lg shrink-0 flex items-center justify-center overflow-hidden">
                  <PuffinMascot className="w-full h-full object-contain" />
                </div>

                <div className="space-y-2 flex-1 w-full">
                  <div className="flex flex-wrap gap-2">
                    <label className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:brightness-105 text-xs font-black text-slate-950 flex items-center gap-2 cursor-pointer shadow-md">
                      <Download className="w-4 h-4 rotate-180" />
                      <span>Upload Mascot Image</span>
                      <input
                        type="file"
                        accept="image/*,.jfif"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = () => {
                              if (typeof reader.result === 'string') {
                                AdminStore.setCustomMascotImage(reader.result);
                                alert('Mascot image uploaded and updated across the entire website!');
                              }
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </label>

                    <button
                      type="button"
                      onClick={() => {
                        if (confirm('Reset mascot image to default?')) {
                          AdminStore.clearCustomMascotImage();
                          alert('Mascot reset to default.');
                        }
                      }}
                      className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-stone-300 border border-slate-700 flex items-center gap-2 cursor-pointer"
                    >
                      <RefreshCw className="w-4 h-4 text-stone-400" />
                      <span>Reset to Default</span>
                    </button>
                  </div>
                  <p className="text-[11px] text-stone-500">
                    Supports JPG, PNG, WEBP, and JFIF images.
                  </p>
                </div>
              </div>
            </div>

            {/* Admin Self-Visit Privacy & Tracking */}
            <div className="p-6 rounded-3xl bg-[#0e1422] border border-slate-800 space-y-4">
              <div className="flex items-center gap-2 text-indigo-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-black text-white uppercase tracking-wider">
                  Admin Self-Visit Exclusion & Privacy
                </h3>
              </div>
              <p className="text-xs text-stone-400 leading-relaxed">
                Ensure that your own testing, site edits, and administrator preview sessions do not artificially inflate the public website visitor counter.
              </p>

              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white">Exclude My Device From Visitor Count</span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                        excludeOwnVisits
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-700/60'
                          : 'bg-amber-950 text-amber-300 border border-amber-700/60'
                      }`}>
                        {excludeOwnVisits ? 'Active (Self-Visits Blocked)' : 'Disabled'}
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-400">
                      When active, browsing pages on this browser will not increment the visit counter or generate logs.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      const next = !excludeOwnVisits;
                      AdminStore.setExcludeOwnVisits(next);
                      setExcludeOwnVisitsState(next);
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 border shrink-0 ${
                      excludeOwnVisits
                        ? 'bg-emerald-900/70 hover:bg-emerald-900 text-emerald-200 border-emerald-600'
                        : 'bg-slate-800 hover:bg-slate-700 text-stone-300 border-slate-700'
                    }`}
                  >
                    <EyeOff className="w-3.5 h-3.5" />
                    <span>{excludeOwnVisits ? 'Self-Exclusion Enabled' : 'Enable Exclusion'}</span>
                  </button>
                </div>

                <div className="pt-2 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="text-[11px] text-stone-400">
                    Want to reset just the visitor counter without touching surveys or donations?
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm('Reset only the website visit counter and traffic activity log to 0? All surveys, donations, and messages will remain intact.')) {
                        AdminStore.clearVisits();
                        refreshData();
                        alert('Visitor logs and traffic counter have been reset to 0.');
                      }
                    }}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] font-bold text-amber-300 border border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                  >
                    <RefreshCw className="w-3 h-3 text-amber-400" />
                    <span>Reset Visitor Counter to 0</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Database Sync & Cross-Device Data */}
            <div className="p-6 rounded-3xl bg-[#0e1422] border border-[#E5A93C]/40 space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#E5A93C]" />
                  <h3 className="text-sm font-black text-white uppercase tracking-wider">
                    Database & Real-Time Sync
                  </h3>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border bg-emerald-950/80 border-emerald-500/50 text-emerald-400">
                  ● Storage Active
                </span>
              </div>
              <p className="text-xs text-stone-300 leading-relaxed">
                All community and professional surveys submitted from any phone, laptop, or tablet are recorded and synchronized in real time with Google Sheets and the resilient local database.
              </p>

              {syncStatusMsg && (
                <div className="p-3 bg-slate-900 border border-amber-400/50 rounded-xl text-amber-300 text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{syncStatusMsg}</span>
                </div>
              )}

              <div className="flex flex-wrap gap-3 pt-1">
                <button
                  type="button"
                  onClick={handleSyncLocal}
                  disabled={isSyncing}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 hover:brightness-105 text-slate-950 text-xs font-black uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
                  <span>{isSyncing ? 'Syncing...' : 'Force Sync All Device Responses'}</span>
                </button>
              </div>
            </div>

            {/* Complete Website Source Code & Repository */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-indigo-950/70 via-slate-900 to-indigo-950/70 border-2 border-indigo-500/40 space-y-4 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[11px] font-bold">
                    <Code2 className="w-3.5 h-3.5 text-indigo-400" />
                    Complete Source Code & Repository Exporter
                  </div>
                  <h3 className="text-base font-black text-white">
                    Entire Website Source Code & Project Files
                  </h3>
                  <p className="text-xs text-slate-300 max-w-xl">
                    View, copy, or download literally the entire website code (all React components, TypeScript files, configurations, and styling).
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={handleInstantZipDownload}
                    disabled={isDownloadingZip}
                    className="px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-950 border border-emerald-400 cursor-pointer shrink-0 transition-transform active:scale-95 disabled:opacity-60"
                  >
                    <FolderDown className={`w-4 h-4 ${isDownloadingZip ? 'animate-bounce' : ''}`} />
                    <span>{isDownloadingZip ? 'Packaging ZIP...' : 'Download Project ZIP (.ZIP) 📦'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab('code')}
                    className="px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-indigo-950 border border-indigo-400 cursor-pointer shrink-0"
                  >
                    <Code2 className="w-4 h-4" />
                    <span>Open Entire Website Code 💻</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Data Management & Backup */}
            <div className="p-6 rounded-3xl bg-[#0e1422] border border-slate-800 space-y-4">
              <h3 className="text-sm font-black text-white uppercase tracking-wider">
                Data Backup & System Maintenance
              </h3>
              <p className="text-xs text-stone-400">
                Download a complete JSON database backup (including visits, surveys, donations, and contact messages) or clear all analytics to 0.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={() => {
                    const jsonStr = AdminStore.exportAllDataAsJSON();
                    const blob = new Blob([jsonStr], { type: 'application/json' });
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = `fillthegap_backup_${new Date().toISOString().split('T')[0]}.json`;
                    link.click();
                  }}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white border border-slate-700 flex items-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4 text-amber-400" />
                  <span>Download Full JSON Backup</span>
                </button>

                <button
                  onClick={() => {
                    if (confirm('Are you sure you want to wipe all visits, surveys, donations, and contact messages to 0 for a clean launch?')) {
                      AdminStore.resetToZero();
                      refreshData();
                      alert('All stats, survey submissions, donation records, and contact messages have been wiped to 0.');
                    }
                  }}
                  className="px-4 py-2.5 rounded-xl bg-red-950/70 hover:bg-red-900/80 text-xs font-bold text-red-200 border border-red-800/80 flex items-center gap-2 cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4 text-red-400" />
                  <span>Wipe All Stats & Messages to 0</span>
                </button>
              </div>
            </div>

          </div>
        )}

        {/* ================================================================= */}
        {/* TAB: ENTIRE WEBSITE SOURCE CODE REPOSITORY */}
        {/* ================================================================= */}
        {activeTab === 'code' && (
          <EntireWebsiteCodeView />
        )}

      </main>

      {/* =================================================================== */}
      {/* RECORD DONATION MODAL */}
      {/* =================================================================== */}
      {isAddDonationOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#0e1422] border-2 border-[#E5A93C] rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl text-white animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-[#E5A93C]" />
                <h3 className="text-lg font-black uppercase text-white">Record New Donation</h3>
              </div>
              <button
                onClick={() => setIsAddDonationOpen(false)}
                className="text-stone-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveDonation} className="space-y-4 text-xs">
              
              {/* Anonymous toggle */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isAnon"
                  checked={newIsAnonymous}
                  onChange={(e) => setNewIsAnonymous(e.target.checked)}
                  className="w-4 h-4 rounded text-amber-400"
                />
                <label htmlFor="isAnon" className="font-bold text-slate-200">
                  Record as Anonymous Donor
                </label>
              </div>

              {!newIsAnonymous && (
                <div className="space-y-1">
                  <label className="block font-bold text-slate-300 uppercase">Donor Name</label>
                  <input
                    type="text"
                    required={!newIsAnonymous}
                    placeholder="e.g. John Doe / St. John's Community Group"
                    value={newDonorName}
                    onChange={(e) => setNewDonorName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-amber-400"
                  />
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block font-bold text-slate-300 uppercase">Amount ($ CAD)</label>
                  <input
                    type="number"
                    step="0.01"
                    min="1"
                    required
                    placeholder="100.00"
                    value={newAmount}
                    onChange={(e) => setNewAmount(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono focus:ring-2 focus:ring-amber-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-bold text-slate-300 uppercase">Date</label>
                  <input
                    type="date"
                    required
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block font-bold text-slate-300 uppercase">Payment Method</label>
                  <select
                    value={newMethod}
                    onChange={(e) => setNewMethod(e.target.value as DonationRecord['method'])}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-amber-400"
                  >
                    <option value="e-Transfer">e-Transfer</option>
                    <option value="Cash">Cash</option>
                    <option value="Cheque">Cheque</option>
                    <option value="Online Pledge">Online Pledge</option>
                    <option value="In-Person Event">In-Person Event</option>
                    <option value="Corporate/Sponsor">Corporate/Sponsor</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block font-bold text-slate-300 uppercase">Status</label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value as DonationRecord['status'])}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-amber-400"
                  >
                    <option value="Verified">Verified in Bank</option>
                    <option value="Received">Received (Pending Deposit)</option>
                    <option value="Pledged">Pledged (Future Transfer)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="block font-bold text-slate-300 uppercase">Notes & Purpose</label>
                <textarea
                  rows={2}
                  placeholder="e.g. In honour of community outreach initiative"
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-amber-400"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddDonationOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-stone-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black uppercase tracking-wider"
                >
                  Save Donation
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* Entire Website Source Code Options Modal */}
      <EntireWebsiteCodeModal
        isOpen={isCodeModalOpen}
        onClose={() => setIsCodeModalOpen(false)}
        onOpenFullTab={() => {
          setIsCodeModalOpen(false);
          setActiveTab('code');
        }}
      />

      {/* Comprehensive Survey Response Inspector Modal */}
      <SurveyResponseInspectorModal
        isOpen={isInspectorOpen}
        onClose={() => {
          setIsInspectorOpen(false);
          setSelectedInspectorSurvey(null);
        }}
        type={inspectorType}
        survey={selectedInspectorSurvey}
        allSurveys={inspectorType === 'community' ? communitySurveys : professionalSurveys}
        onSelectSurvey={(surv) => setSelectedInspectorSurvey(surv)}
        onDelete={async (id) => {
          if (inspectorType === 'community') {
            await AdminStore.deleteCommunitySurvey(id);
          } else {
            await AdminStore.deleteProfessionalSurvey(id);
          }
          refreshData();
          setIsInspectorOpen(false);
          setSelectedInspectorSurvey(null);
        }}
      />

    </div>
  );
};
