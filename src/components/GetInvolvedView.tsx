import React, { useState } from 'react';
import {
  ClipboardList,
  Share2,
  Users2,
  Handshake,
  HeartHandshake,
  Check,
  Copy,
  Mail,
  Briefcase,
  Sparkles,
  ArrowRight,
  Clock,
  Wrench,
  Users,
  Send,
  CheckSquare,
  Square,
  Phone,
  User,
  MessageSquare,
  HelpCircle,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Lightbulb
} from 'lucide-react';
import { AdminStore } from '../data/adminStore';

interface GetInvolvedViewProps {
  onOpenSurvey: () => void;
  onOpenProfessionalSurvey?: () => void;
  onNavigateToDonate: () => void;
}

export const GetInvolvedView: React.FC<GetInvolvedViewProps> = ({
  onOpenSurvey,
  onOpenProfessionalSurvey,
  onNavigateToDonate,
}) => {
  const [copied, setCopied] = useState(false);

  // Volunteer Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedRoles, setSelectedRoles] = useState<string[]>(['Community Helper']);
  const [otherRoleText, setOtherRoleText] = useState('');
  const [comments, setComments] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const toggleRole = (role: string) => {
    if (selectedRoles.includes(role)) {
      setSelectedRoles(selectedRoles.filter((r) => r !== role));
    } else {
      setSelectedRoles([...selectedRoles, role]);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.origin);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleSubmitVolunteer = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!fullName.trim()) {
      setErrorMessage('Please enter your name.');
      return;
    }

    if (!email.trim() && !phone.trim()) {
      setErrorMessage('Please enter an email or phone number so we can reach you.');
      return;
    }

    if (selectedRoles.length === 0) {
      setErrorMessage('Please select at least one way you would like to get involved.');
      return;
    }

    setIsSubmitting(true);

    try {
      const rolesSummary = selectedRoles
        .map((r) => (r === 'Other' && otherRoleText.trim() ? `Other: ${otherRoleText.trim()}` : r))
        .join(', ');

      const fullDetails = `Volunteer Roles Selected: ${rolesSummary}\n\n` +
        `Comments / Background & Ideas:\n${comments.trim() || 'None provided'}`;

      // 1. Save to Admin / Firestore
      await AdminStore.addContactMessage({
        name: fullName.trim(),
        email: email.trim() || (phone.trim() ? `Phone: ${phone.trim()}` : 'Not provided'),
        phone: phone.trim() || undefined,
        reason: `Volunteer Application (${rolesSummary})`,
        message: fullDetails,
        status: 'Unread',
      });

      // 2. Prepare mailto action to info@fillthegapnl.ca
      const mailSubject = encodeURIComponent(`Volunteer / Helper Application - ${fullName.trim()}`);
      const mailBody = encodeURIComponent(
        `Name: ${fullName.trim()}\n` +
        `Email: ${email.trim() || 'N/A'}\n` +
        `Phone: ${phone.trim() || 'N/A'}\n` +
        `Areas of Interest: ${rolesSummary}\n\n` +
        `Comments / Notes / Experience:\n${comments.trim() || 'N/A'}\n\n` +
        `---\nSubmitted via fillthegapnl.ca (Get Involved / Volunteer Page)`
      );

      try {
        const mailtoUrl = `mailto:info@fillthegapnl.ca?subject=${mailSubject}&body=${mailBody}`;
        const mailtoLink = document.createElement('a');
        mailtoLink.href = mailtoUrl;
        mailtoLink.target = '_blank';
        mailtoLink.rel = 'noopener noreferrer';
        document.body.appendChild(mailtoLink);
        mailtoLink.click();
        document.body.removeChild(mailtoLink);
      } catch (err) {
        console.warn('Mailto launch handled:', err);
      }

      setIsSubmitted(true);
    } catch (err: any) {
      console.error('Error submitting volunteer application:', err);
      setErrorMessage('There was an issue submitting your application. Please email info@fillthegapnl.ca directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setFullName('');
    setEmail('');
    setPhone('');
    setSelectedRoles(['Community Helper']);
    setOtherRoleText('');
    setComments('');
    setIsSubmitted(false);
    setErrorMessage('');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
      
      {/* Page Header */}
      <div className="border-b border-slate-200 pb-8 space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 text-[#F3BA4F] text-xs font-black uppercase tracking-wider border border-[#E5A93C]/40 shadow-xs">
          <Users2 className="w-3.5 h-3.5 text-[#F3BA4F]" />
          <span>How You Can Help • Community Participation</span>
        </div>

        <h1
          className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#0f172a] tracking-tight uppercase"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          GET INVOLVED
        </h1>

        <div className="text-base sm:text-lg text-stone-700 max-w-3xl leading-relaxed space-y-1.5">
          <p className="font-bold text-[#0f172a]">
            Fill the Gap isn't something one person can build alone.
          </p>
          <p className="text-stone-600">
            Whether you want to become a rapid-response Community Helper, assist with fundraising projects, share your ideas, or complete our surveys, your involvement makes a tangible difference across Newfoundland & Labrador.
          </p>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 1. VOLUNTEER & COMMUNITY HELPER SECTION (BROCHURE HIGHLIGHT) */}
      {/* ============================================================ */}
      <section className="civic-card rounded-3xl p-6 sm:p-10 border-2 border-[#E5A93C] shadow-xl space-y-8 relative overflow-hidden bg-gradient-to-b from-white to-amber-50/30">
        
        {/* Section Title */}
        <div className="space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-900 bg-amber-100/80 px-3 py-1 rounded-full border border-amber-300">
            <Sparkles className="w-3.5 h-3.5 text-[#B47610]" />
            <span>Volunteer With Us</span>
          </div>

          <h2
            className="text-2xl sm:text-4xl font-black text-[#0f172a] uppercase tracking-tight"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            BECOME A COMMUNITY HELPER OR VOLUNTEER
          </h2>

          <p className="text-stone-700 text-base sm:text-lg leading-relaxed">
            We focus on the individual, find the resources that are right for them, and connect them to the help they need in the way they need it.
          </p>
        </div>

        {/* What is a Community Helper? Explainer Card */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 space-y-5 border-2 border-slate-800 shadow-lg">
          <div className="space-y-2">
            <span className="text-[11px] font-black uppercase tracking-wider text-[#F3BA4F] block">
              Direct Community Action
            </span>
            <h3
              className="text-xl sm:text-2xl font-black text-white uppercase tracking-wide"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              What is a Community Helper?
            </h3>
          </div>

          <div className="text-sm sm:text-base text-slate-200 leading-relaxed space-y-3">
            <p>
              A <strong>Helper</strong> is part of our rapid-response volunteer network. When a request for help doesn't fit into a neat box, we share details (while strictly maintaining complete anonymity) to our helpers.
            </p>
            <p className="text-slate-300">
              Whether it's finding resources, odd jobs, practical advice, or emergency problem-solving, Helpers brainstorm the best solutions, coordinate support, and step in where they can.
            </p>
          </div>

          {/* Why Join? 3 Key Pillars from Brochure */}
          <div className="pt-2 border-t border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Pillar 1: Total Flexibility */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
                <Clock className="w-4 h-4 shrink-0" />
                <span>Total Flexibility</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                No set hours or mandatory shifts. Respond only to requests that match your schedule, availability, and capacity.
              </p>
            </div>

            {/* Pillar 2: Use What You Know */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
                <Wrench className="w-4 h-4 shrink-0" />
                <span>Use What You Know</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Whether your strength is handy work, navigating community systems, creative ideas, or offering a ride, your perspective matters.
              </p>
            </div>

            {/* Pillar 3: Collective Impact */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase tracking-wider">
                <Users className="w-4 h-4 shrink-0" />
                <span>Collective Impact</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                You never have to solve a problem alone. You are part of a supportive group collaborating to make a tangible difference for real people.
              </p>
            </div>

          </div>
        </div>

        {/* Volunteer Application & Intake Form */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-amber-200/80 shadow-md space-y-6">
          
          <div className="border-b border-slate-200 pb-4 flex items-center justify-between flex-wrap gap-2">
            <div>
              <h3
                className="text-xl sm:text-2xl font-black text-[#0f172a] uppercase"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Sign Up to Help & Share Your Information
              </h3>
              <p className="text-xs sm:text-sm text-stone-600">
                Pick all the ways you'd like to get involved, leave comments, and email our team directly.
              </p>
            </div>
            <div className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Direct to info@fillthegapnl.ca</span>
            </div>
          </div>

          {isSubmitted ? (
            <div className="bg-emerald-50 border-2 border-emerald-400 rounded-2xl p-8 text-center space-y-4 animate-fadeIn">
              <div className="w-14 h-14 rounded-full bg-emerald-100 border border-emerald-400 flex items-center justify-center mx-auto text-emerald-700">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-1.5 max-w-lg mx-auto">
                <h4 className="text-2xl font-black text-slate-900 uppercase">
                  Thank You, {fullName}!
                </h4>
                <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
                  Your volunteer details and comments have been received and routed to <strong>info@fillthegapnl.ca</strong>. We will reach out when matching helper requests or project initiatives arise.
                </p>
              </div>
              <button
                type="button"
                onClick={handleResetForm}
                className="px-5 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs uppercase tracking-wider hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Submit Another Application
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmitVolunteer} className="space-y-6">
              {errorMessage && (
                <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-center gap-2 font-medium">
                  <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* 1. SELECT ROLES (CHECKBOXES - CAN PICK MORE THAN ONE) */}
              <div className="space-y-3">
                <label className="block text-xs font-black uppercase tracking-wider text-slate-800">
                  How Would You Like to Help? (Select all that apply) *
                </label>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  
                  {/* Role 1: Community Helper */}
                  <div
                    onClick={() => toggleRole('Community Helper')}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer select-none space-y-2 flex flex-col justify-between ${
                      selectedRoles.includes('Community Helper')
                        ? 'border-[#E5A93C] bg-amber-50/70 shadow-sm'
                        : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-1">
                        <span className="text-sm font-black text-slate-900 uppercase block">
                          Community Helper
                        </span>
                        <p className="text-xs text-stone-600 leading-relaxed">
                          Join our rapid-response network. Brainstorm solutions, share advice, emergency problem-solving, odd jobs, or practical support when individuals need help.
                        </p>
                      </div>
                      <div className="shrink-0 pt-0.5 text-[#B47610]">
                        {selectedRoles.includes('Community Helper') ? (
                          <CheckSquare className="w-5 h-5 fill-current text-[#E5A93C] text-slate-950" />
                        ) : (
                          <Square className="w-5 h-5 text-slate-400" />
                        )}
                      </div>
                    </div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-900 bg-amber-100/70 px-2 py-0.5 rounded-md inline-block self-start">
                      Flexible On-Call
                    </span>
                  </div>

                  {/* Role 2: Fundraising */}
                  <div
                    onClick={() => toggleRole('Fundraising & Projects')}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer select-none space-y-2 flex flex-col justify-between ${
                      selectedRoles.includes('Fundraising & Projects')
                        ? 'border-[#E5A93C] bg-amber-50/70 shadow-sm'
                        : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-1">
                        <span className="text-sm font-black text-slate-900 uppercase block">
                          Fundraising & Projects
                        </span>
                        <p className="text-xs text-stone-600 leading-relaxed">
                          Help us raise funds for our projects, coordinate donation drives, organize community events, and connect with business sponsors.
                        </p>
                      </div>
                      <div className="shrink-0 pt-0.5 text-[#B47610]">
                        {selectedRoles.includes('Fundraising & Projects') ? (
                          <CheckSquare className="w-5 h-5 fill-current text-[#E5A93C] text-slate-950" />
                        ) : (
                          <Square className="w-5 h-5 text-slate-400" />
                        )}
                      </div>
                    </div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-900 bg-amber-100/70 px-2 py-0.5 rounded-md inline-block self-start">
                      Project Outreach
                    </span>
                  </div>

                  {/* Role 3: Other / Skills & Ideas */}
                  <div
                    onClick={() => toggleRole('Other')}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer select-none space-y-2 flex flex-col justify-between ${
                      selectedRoles.includes('Other')
                        ? 'border-[#E5A93C] bg-amber-50/70 shadow-sm'
                        : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-1">
                        <span className="text-sm font-black text-slate-900 uppercase block">
                          Other / Ideas & Skills
                        </span>
                        <p className="text-xs text-stone-600 leading-relaxed">
                          Have an idea that should get done? Want to offer specific trade skills, transportation, technical expertise, or a custom way to help?
                        </p>
                      </div>
                      <div className="shrink-0 pt-0.5 text-[#B47610]">
                        {selectedRoles.includes('Other') ? (
                          <CheckSquare className="w-5 h-5 fill-current text-[#E5A93C] text-slate-950" />
                        ) : (
                          <Square className="w-5 h-5 text-slate-400" />
                        )}
                      </div>
                    </div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-900 bg-amber-100/70 px-2 py-0.5 rounded-md inline-block self-start">
                      Custom Support
                    </span>
                  </div>

                </div>

                {selectedRoles.includes('Other') && (
                  <div className="pt-1">
                    <input
                      type="text"
                      value={otherRoleText}
                      onChange={(e) => setOtherRoleText(e.target.value)}
                      placeholder="Please specify your skills, idea, or how you'd like to help..."
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 focus:border-[#E5A93C] focus:ring-2 focus:ring-[#E5A93C]/30 outline-none text-xs sm:text-sm text-slate-900 font-medium transition-all"
                    />
                  </div>
                )}
              </div>

              {/* 2. CONTACT DETAILS */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                
                <div className="space-y-1.5">
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#B47610]" />
                    <span>Your Full Name *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Alex Morgan"
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 focus:border-[#E5A93C] focus:ring-2 focus:ring-[#E5A93C]/30 outline-none text-slate-900 text-sm font-medium transition-all shadow-2xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#B47610]" />
                    <span>Email Address *</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. alex@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 focus:border-[#E5A93C] focus:ring-2 focus:ring-[#E5A93C]/30 outline-none text-slate-900 text-sm font-medium transition-all shadow-2xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#B47610]" />
                    <span>Phone Number</span>
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. (709) 555-0199"
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 focus:border-[#E5A93C] focus:ring-2 focus:ring-[#E5A93C]/30 outline-none text-slate-900 text-sm font-medium transition-all shadow-2xs"
                  />
                </div>

              </div>

              {/* 3. COMMENTS & MORE INFO BOX */}
              <div className="space-y-1.5">
                <label className="block text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-[#B47610]" />
                  <span>Comments & Additional Information (Tell us more about your background, ideas, or availability)</span>
                </label>
                <textarea
                  rows={4}
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  placeholder="Share any details: your community/location in NL, specific skills (handy work, system navigation, tech, transport), project ideas, or questions you have for us..."
                  className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 focus:border-[#E5A93C] focus:ring-2 focus:ring-[#E5A93C]/30 outline-none text-slate-900 text-sm font-medium transition-all resize-y shadow-2xs"
                />
              </div>

              {/* Submit Button & Direct Mail Route */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100">
                <p className="text-xs text-stone-600">
                  Submissions are sent directly to <strong className="text-slate-900">info@fillthegapnl.ca</strong> and securely recorded for volunteer coordinators.
                </p>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto gold-gradient-btn px-8 py-4 rounded-2xl text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 border border-amber-200 cursor-pointer shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-50 shrink-0"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                      <span>SUBMITTING...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-slate-950" />
                      <span>SUBMIT VOLUNTEER INFO TO INFO@FILLTHEGAPNL.CA</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          )}

        </div>

      </section>

      {/* ============================================================ */}
      {/* OTHER WAYS TO GET INVOLVED */}
      {/* ============================================================ */}
      <div className="space-y-6">

        {/* 2. TAKE THE SURVEYS */}
        <section className="civic-card rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="w-11 h-11 rounded-2xl bg-slate-800 text-[#F3BA4F] border border-[#E5A93C]/40 flex items-center justify-center shadow-xs">
              <ClipboardList className="w-5 h-5" />
            </div>
            <h2
              className="text-2xl font-black text-[#0f172a] uppercase"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              TAKE A SURVEY
            </h2>
            <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-bold">
              Tell us about gaps you've experienced or noticed in our community.
            </p>
            <p className="text-xs text-stone-500 font-medium">
              Choose the survey tailored for residents or frontline professionals & agencies. Completely confidential.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2.5 shrink-0 w-full md:w-auto">
            <button
              onClick={onOpenSurvey}
              className="gold-gradient-btn px-6 py-3.5 rounded-2xl text-[#0f172a] font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 border border-amber-200 cursor-pointer"
            >
              <ClipboardList className="w-4 h-4 text-[#0f172a]" />
              <span>Community Survey</span>
            </button>
            {onOpenProfessionalSurvey && (
              <button
                onClick={onOpenProfessionalSurvey}
                className="px-6 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-[#F3BA4F] font-black text-xs uppercase tracking-wider transition-all shadow-sm border border-[#E5A93C]/60 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Briefcase className="w-4 h-4 text-[#F3BA4F]" />
                <span>Professional Surveys</span>
              </button>
            )}
          </div>
        </section>

        {/* 3. SHARE */}
        <section className="civic-card rounded-3xl p-8 sm:p-10 space-y-5">
          <div className="space-y-2 max-w-2xl">
            <div className="w-11 h-11 rounded-2xl bg-slate-800 text-slate-300 border border-slate-600 flex items-center justify-center shadow-xs">
              <Share2 className="w-5 h-5" />
            </div>
            <h2
              className="text-2xl font-black text-[#0f172a] uppercase"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              SHARE & SPREAD THE WORD
            </h2>
            <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-medium">
              Like the idea of an individual-first, avoid-the-red-tape approach? Share Fill the Gap with your network to help us reach more residents across Newfoundland & Labrador.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={handleCopyLink}
              className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#0f172a] border border-slate-200 font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer shadow-2xs"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-800">Website Link Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-800" />
                  <span>Copy Website Link (fillthegapnl.ca)</span>
                </>
              )}
            </button>

            <a
              href="mailto:?subject=Fill%20the%20Gap%20%E2%80%94%20St.%20John's%2C%20NL&body=Check%20out%20Fill%20the%20Gap%20in%20St.%20John's%2C%20NL%20helping%20bridge%20gaps%20between%20people%20and%20community%20support%3A%20https%3A%2F%2Ffillthegapnl.ca"
              className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#0f172a] border border-slate-200 font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer shadow-2xs"
            >
              <Mail className="w-4 h-4 text-slate-800" />
              <span>Share by Email</span>
            </a>
          </div>
        </section>

        {/* 4. PARTNERSHIPS */}
        <section className="civic-card rounded-3xl p-8 sm:p-10 space-y-6">
          <div className="space-y-3 max-w-3xl">
            <div className="w-11 h-11 rounded-2xl bg-slate-800 text-[#F3BA4F] border border-[#E5A93C]/40 flex items-center justify-center shadow-xs">
              <Handshake className="w-5 h-5" />
            </div>
            <h2
              className="text-2xl font-black text-[#0f172a] uppercase"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              PARTNERSHIPS
            </h2>
            <p className="text-lg sm:text-xl font-bold text-[#0f172a]">
              We want to work with the people already doing the work.
            </p>
            <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-medium">
              Fill the Gap isn't here to replace existing organizations — it's here to work alongside them. We're interested in partnering with:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-3xl">
            {[
              'Existing charities & nonprofits',
              'Community organizations',
              'Businesses & employers',
              'Government & community services',
              'Volunteers & Community Helpers',
              'People with lived experience',
            ].map((partnerType, idx) => (
              <div
                key={idx}
                className="p-3.5 bg-slate-100/60 rounded-2xl border border-slate-200 flex items-center gap-3 text-xs sm:text-sm font-bold text-[#0f172a]"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-[#E5A93C] shrink-0" />
                <span>{partnerType}</span>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <a
              href="mailto:info@fillthegapnl.ca?subject=Partnership%20Inquiry%20%E2%80%94%20Fill%20the%20Gap"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#0f172a] hover:text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-200 px-5 py-3 rounded-xl transition-colors cursor-pointer shadow-2xs"
            >
              <Mail className="w-4 h-4 text-slate-800" />
              <span>Reach out to info@fillthegapnl.ca</span>
            </a>
          </div>
        </section>

        {/* 5. DONATE */}
        <section className="bg-[#0f172a] text-white rounded-3xl p-8 sm:p-10 shadow-2xl border-2 border-[#E5A93C] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="w-11 h-11 rounded-2xl bg-slate-800 text-[#F3BA4F] border border-[#E5A93C]/50 flex items-center justify-center shadow-xs">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h2
              className="text-2xl font-black text-white uppercase"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              DONATE
            </h2>
            <p className="text-sm sm:text-base text-slate-100 leading-relaxed font-medium">
              Financial support helps us conduct community research and develop future frontline support initiatives.
            </p>
          </div>
          <button
            onClick={onNavigateToDonate}
            className="gold-gradient-btn px-8 py-4 rounded-2xl text-[#0f172a] font-black text-xs uppercase tracking-wider border border-amber-200 shrink-0 cursor-pointer shadow-lg"
          >
            DONATE
          </button>
        </section>

      </div>

    </div>
  );
};
