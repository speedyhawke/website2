import React, { useState } from 'react';
import { 
  HelpCircle, 
  MapPin, 
  Phone, 
  Mail, 
  Heart, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Clock, 
  Compass, 
  CheckCircle2,
  Users,
  Send,
  User,
  MessageSquare,
  AlertCircle
} from 'lucide-react';
import { PuffinMascot } from './PuffinMascot';
import { AdminStore } from '../data/adminStore';

interface NeedHelpViewProps {
  onNavigateToContact?: () => void;
  onNavigateToWhatWeHelpWith?: () => void;
  onNavigateToGetInvolved?: () => void;
  onOpenSurvey?: () => void;
}

export const NeedHelpView: React.FC<NeedHelpViewProps> = ({
  onNavigateToContact,
  onNavigateToWhatWeHelpWith,
  onNavigateToGetInvolved,
  onOpenSurvey,
}) => {
  // Intake Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!name.trim()) {
      setErrorMessage('Please provide your name.');
      return;
    }

    if (!email.trim() && !phone.trim()) {
      setErrorMessage('Please provide either a contact email or phone number so we can get back to you.');
      return;
    }

    if (!message.trim()) {
      setErrorMessage('Please type a message or let us know what you need help with.');
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Store in admin store & firestore
      await AdminStore.addContactMessage({
        name: name.trim(),
        email: email.trim() || (phone.trim() ? `Phone: ${phone.trim()}` : 'Not provided'),
        phone: phone.trim() || undefined,
        reason: 'Need Help Request',
        message: message.trim(),
        status: 'Unread',
      });

      // 2. Prepare mailto link as fallback/direct email route
      const mailSubject = encodeURIComponent(`Need Help Request - ${name.trim()}`);
      const mailBody = encodeURIComponent(
        `Name: ${name.trim()}\n` +
        `Email: ${email.trim() || 'N/A'}\n` +
        `Phone: ${phone.trim() || 'N/A'}\n\n` +
        `Message / Details:\n${message.trim()}\n\n` +
        `---\nSent via Fill the Gap NL (Need Help Intake Form)`
      );

      // Attempt to launch mailto client seamlessly
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
        console.warn('Mailto link launch handled:', err);
      }

      setIsSubmitted(true);
    } catch (err: any) {
      console.error('Error submitting help request:', err);
      setErrorMessage('There was an issue submitting your request. Please try again or email info@fillthegapnl.ca directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
    setIsSubmitted(false);
    setErrorMessage('');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      
      {/* Header Banner */}
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 text-[#F3BA4F] text-xs font-black uppercase tracking-wider border border-[#E5A93C]/40 shadow-sm">
          <Heart className="w-3.5 h-3.5 fill-current text-[#F3BA4F]" />
          <span>Support & Guidance • St. John's & NL</span>
        </div>

        <h1
          className="text-3xl sm:text-5xl font-black text-[#0f172a] uppercase tracking-tight"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          NEED HELP?
        </h1>

        <p className="text-stone-700 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
          If you or someone you care about is having trouble finding the right resources, services, or support in Newfoundland & Labrador, you are not alone.
        </p>
      </div>

      {/* Direct Intake / Contact Form Section (Placed right after intro paragraph) */}
      <section className="bg-gradient-to-b from-white to-amber-50/40 rounded-3xl p-6 sm:p-10 border-2 border-[#E5A93C] shadow-2xl space-y-6 relative overflow-hidden">
        
        {/* Subtle Decorative Badge */}
        <div className="flex items-center justify-between flex-wrap gap-4 pb-2 border-b border-amber-200/70">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-[#E5A93C] flex items-center justify-center text-[#B47610]">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h2
                className="text-xl sm:text-2xl font-black text-[#0f172a] uppercase tracking-tight"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                TELL US WHAT YOU NEED
              </h2>
              <p className="text-xs sm:text-sm text-stone-600">
                Your message goes directly to our team at <strong className="text-slate-900">info@fillthegapnl.ca</strong>.
              </p>
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Confidential & Free</span>
          </div>
        </div>

        {isSubmitted ? (
          <div className="bg-white rounded-2xl p-8 border-2 border-emerald-400 shadow-md text-center space-y-5 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-emerald-100 border-2 border-emerald-500 flex items-center justify-center mx-auto text-emerald-700 shadow-inner">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div className="space-y-2 max-w-lg mx-auto">
              <h3 className="text-2xl font-black text-slate-900 uppercase">
                Thank You, {name}!
              </h3>
              <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
                Your message has been submitted and routed to <strong>info@fillthegapnl.ca</strong>. Our team will review what you shared and follow up with you as soon as possible.
              </p>
            </div>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={handleReset}
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
              >
                Send Another Message
              </button>
              <a
                href="mailto:info@fillthegapnl.ca"
                className="px-5 py-2.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-900 font-bold text-xs uppercase tracking-wider transition-all"
              >
                Email Direct: info@fillthegapnl.ca
              </a>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {errorMessage && (
              <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-center gap-2 font-medium">
                <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="block text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#B47610]" />
                  <span>Your Name *</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Sarah Power"
                  className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 focus:border-[#E5A93C] focus:ring-2 focus:ring-[#E5A93C]/30 outline-none text-slate-900 text-sm font-medium transition-all shadow-2xs"
                />
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="block text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#B47610]" />
                  <span>Contact Email</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g., name@example.com"
                  className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 focus:border-[#E5A93C] focus:ring-2 focus:ring-[#E5A93C]/30 outline-none text-slate-900 text-sm font-medium transition-all shadow-2xs"
                />
              </div>

              {/* Phone */}
              <div className="space-y-1.5">
                <label className="block text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#B47610]" />
                  <span>Phone Number</span>
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g., (709) 555-0123"
                  className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 focus:border-[#E5A93C] focus:ring-2 focus:ring-[#E5A93C]/30 outline-none text-slate-900 text-sm font-medium transition-all shadow-2xs"
                />
              </div>

            </div>

            {/* Custom Message Box */}
            <div className="space-y-1.5">
              <label className="block text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-[#B47610]" />
                <span>How can we help? Type whatever you'd like to share *</span>
              </label>
              <textarea
                required
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us what you or your family are going through, what services you've tried to find, or what questions you have..."
                className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 focus:border-[#E5A93C] focus:ring-2 focus:ring-[#E5A93C]/30 outline-none text-slate-900 text-sm font-medium transition-all resize-y shadow-2xs"
              />
            </div>

            {/* Submit Action Bar */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-stone-600">
                All submissions are delivered directly to <strong className="text-slate-900">info@fillthegapnl.ca</strong> and saved securely for our coordinators.
              </p>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto gold-gradient-btn px-8 py-4 rounded-2xl text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 border border-amber-200 cursor-pointer shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-50 shrink-0"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                    <span>SENDING...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-slate-950" />
                    <span>SUBMIT TO INFO@FILLTHEGAPNL.CA</span>
                  </>
                )}
              </button>
            </div>

          </form>
        )}
      </section>

      {/* Main Focus Card */}
      <section className="civic-card rounded-3xl p-8 sm:p-12 space-y-8 relative overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          <div className="md:col-span-8 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-black uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>We're Here to Listen & Connect</span>
            </div>

            <h2
              className="text-2xl sm:text-3xl font-black text-[#0f172a] uppercase tracking-tight"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              NAVIGATING COMMUNITY SUPPORT TOGETHER
            </h2>

            <div className="space-y-3 text-stone-700 text-base leading-relaxed">
              <p>
                Navigating complex systems, waitlists, and community services can be overwhelming. Fill the Gap is committed to helping individuals and families understand what resources exist, where systemic gaps are occurring, and how to reach the right people.
              </p>
              <p className="font-bold text-[#0f172a]">
                This page is currently being expanded with direct resource navigators, local directory guides, and emergency contacts.
              </p>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              {onNavigateToContact && (
                <button
                  onClick={onNavigateToContact}
                  className="gold-gradient-btn px-6 py-3.5 rounded-2xl text-[#0f172a] font-black text-xs uppercase tracking-wider flex items-center gap-2 border border-amber-200 cursor-pointer shadow-sm"
                >
                  <Mail className="w-4 h-4 text-[#0f172a]" />
                  <span>Contact Our Team</span>
                </button>
              )}

              {onNavigateToWhatWeHelpWith && (
                <button
                  onClick={onNavigateToWhatWeHelpWith}
                  className="px-6 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-2"
                >
                  <span>Explore What We Help With</span>
                  <ArrowRight className="w-4 h-4 text-[#F3BA4F]" />
                </button>
              )}
            </div>
          </div>

          <div className="md:col-span-4 flex justify-center">
            <div className="p-4 rounded-3xl bg-white border-2 border-[#E5A93C]/50 shadow-md text-center max-w-xs space-y-3">
              <PuffinMascot
                className="w-full max-h-52 object-contain drop-shadow-md mx-auto"
                alt="Fill the Gap Puffin Mascot"
              />
              <span className="text-[11px] font-black uppercase tracking-wider text-slate-800 block">
                Fill the Gap • Compassionate Community Support
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* Emergency & Key Community Numbers (Quick Reference) */}
      <section className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 border-2 border-slate-800 space-y-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Phone className="w-5 h-5 text-amber-400" />
            <h3
              className="text-xl font-black text-white uppercase tracking-wider"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Immediate & 24/7 Crisis Support Numbers (NL)
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-300">
            If you are in immediate danger, please call <strong>911</strong>. For 24/7 confidential community lines in Newfoundland & Labrador:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
            <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 block">24/7 Suicide & Crisis Helpline</span>
            <span className="text-lg font-black text-white block">Call or Text 988</span>
            <p className="text-xs text-slate-400">Toll-free across Canada for mental health crises.</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 block">Community & Social Services</span>
            <span className="text-lg font-black text-white block">Call 211</span>
            <p className="text-xs text-slate-400">Free, confidential referral to community programs in NL.</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
            <span className="text-[10px] font-black uppercase tracking-wider text-cyan-400 block">NL HealthLine (Nurse Advice)</span>
            <span className="text-lg font-black text-white block">Call 811</span>
            <p className="text-xs text-slate-400">24/7 non-emergency health and medical advice.</p>
          </div>
        </div>
      </section>

      {/* Share Your Voice */}
      <section className="bg-slate-50 border border-slate-200 rounded-3xl p-8 sm:p-10 space-y-6">
        <div className="space-y-2">
          <h3
            className="text-xl font-black text-[#0f172a] uppercase tracking-wider"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Have You Experienced Gaps in Support?
          </h3>
          <p className="text-sm text-stone-600">
            Your lived experiences help us identify where services are broken or hard to access across our communities.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {onOpenSurvey && (
            <button
              onClick={onOpenSurvey}
              className="gold-gradient-btn px-6 py-3 rounded-xl text-[#0f172a] font-black text-xs uppercase tracking-wider shadow-sm border border-amber-200 cursor-pointer"
            >
              Take Community Survey
            </button>
          )}

          <a
            href="mailto:info@fillthegapnl.ca"
            className="px-6 py-3 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-[#0f172a] font-bold text-xs uppercase tracking-wider transition-colors"
          >
            Email: info@fillthegapnl.ca
          </a>
        </div>
      </section>

    </div>
  );
};
