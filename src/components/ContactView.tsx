import React, { useState } from 'react';
import { Mail, MapPin, Globe, AlertTriangle, Send, CheckCircle2, ShieldAlert } from 'lucide-react';
import { ContactMessage } from '../types';
import { AdminStore } from '../data/adminStore';

export const ContactView: React.FC = () => {
  const [formData, setFormData] = useState<ContactMessage>({
    name: '',
    email: '',
    reason: 'Question',
    message: ''
  });

  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      return;
    }

    setIsSubmitting(true);
    try {
      AdminStore.addContactMessage({
        name: formData.name.trim(),
        email: formData.email.trim(),
        reason: formData.reason,
        message: formData.message.trim(),
        status: 'Unread'
      });
    } catch (err) {
      console.error('Failed to store contact message:', err);
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Page Title */}
      <div className="border-b border-slate-200 pb-8 space-y-3">
        <span className="text-[11px] font-black uppercase tracking-wider text-slate-800 bg-slate-100 px-3.5 py-1 rounded-full border border-slate-200">
          Get in Touch
        </span>
        <h1
          className="text-3xl sm:text-5xl font-black text-[#0f172a] tracking-tight uppercase"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          CONTACT FILL THE GAP
        </h1>
      </div>

      {/* Emergency Notice */}
      <div className="bg-[#0f172a] border-2 border-[#E5A93C] rounded-3xl p-6 sm:p-7 flex items-start gap-4 shadow-2xl text-white">
        <ShieldAlert className="w-6 h-6 text-[#F3BA4F] shrink-0 mt-0.5" />
        <div className="space-y-2 text-slate-100 text-xs sm:text-sm leading-relaxed">
          <p className="font-black uppercase tracking-wide text-[#F3BA4F] text-sm">
            Emergency Notice
          </p>
          <p className="font-semibold">
            Fill the Gap is not an emergency response service. If someone is in immediate danger or needs urgent medical assistance, contact the appropriate emergency service.
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-1 text-xs">
            <span className="bg-slate-800 border border-[#E5A93C]/50 px-3 py-1 rounded-lg font-black text-[#F3BA4F] shadow-2xs">
              Immediate Danger: 911
            </span>
            <span className="bg-slate-800 border border-slate-200 px-3 py-1 rounded-lg font-black text-slate-300 shadow-2xs">
              Suicide Helpline: 988
            </span>
            <span className="bg-slate-800 border border-slate-200 px-3 py-1 rounded-lg font-black text-slate-300 shadow-2xs">
              Health & Crisis: 811
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Heading, Text & Contact Information */}
        <div className="lg:col-span-5 space-y-8">
          
          <div className="space-y-4">
            <h2
              className="text-2xl sm:text-3xl font-black text-[#0f172a] uppercase"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              WE WANT TO HEAR FROM YOU
            </h2>

            <div className="space-y-2 text-stone-700 text-sm sm:text-base font-bold">
              <p>Have a question?</p>
              <p>Know about a gap?</p>
              <p>Know about a resource?</p>
              <p>Want to get involved?</p>
              <p>Interested in partnering?</p>
              <p className="font-black text-[#0f172a] pt-2 text-base sm:text-lg">
                We want to hear from you.
              </p>
            </div>
          </div>

          {/* Contact Details Card */}
          <div className="civic-card rounded-3xl p-7 space-y-5">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-800">
              Direct Contact Details
            </h3>

            <div className="space-y-4 text-xs sm:text-sm text-slate-900">
              <div>
                <p className="font-black text-base text-[#0f172a]">Fill the Gap</p>
                <div className="flex items-center gap-2 text-stone-600 mt-1 font-medium">
                  <MapPin className="w-4 h-4 text-slate-800 shrink-0" />
                  <span>St. John's, Newfoundland & Labrador, Canada</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-slate-800 shrink-0" />
                  <a
                    href="mailto:info@fillthegapnl.ca"
                    className="font-bold text-[#0f172a] hover:text-slate-800 transition-colors"
                  >
                    info@fillthegapnl.ca
                  </a>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-slate-800 shrink-0" />
                  <a
                    href="https://www.fillthegapnl.ca"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-stone-700 hover:text-slate-800 transition-colors"
                  >
                    www.fillthegapnl.ca
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-7">
          <div className="civic-card rounded-3xl p-8 sm:p-10 space-y-6">
            
            <div className="space-y-1">
              <h3
                className="text-xl font-black text-[#0f172a] uppercase"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Send a Message
              </h3>
              <p className="text-xs text-stone-500 font-medium">
                Reach out directly to our team in St. John's
              </p>
            </div>

            {/* Warning Note */}
            <div className="p-3.5 bg-slate-50 border-slate-200 rounded-2xl border border-slate-200 flex items-start gap-2.5 text-xs text-[#0f172a]">
              <AlertTriangle className="w-4 h-4 text-slate-800 shrink-0 mt-0.5" />
              <p className="font-medium">
                Please do not submit emergency information or highly sensitive personal medical information through this contact form.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 bg-slate-100 rounded-2xl border border-slate-200 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-slate-800 mx-auto" />
                <h4 className="text-lg font-black text-[#0f172a] uppercase">
                  Message Received
                </h4>
                <p className="text-xs sm:text-sm text-stone-700 max-w-md mx-auto leading-relaxed font-medium">
                  Thank you for reaching out to Fill the Gap. We appreciate your feedback and input as we continue building this initiative in St. John's and across NL.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', reason: 'Question', message: '' });
                  }}
                  className="mt-4 px-5 py-2.5 bg-white border border-slate-200 hover:bg-slate-100 text-[#0f172a] rounded-xl text-xs font-bold uppercase transition-colors cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
                <div>
                  <label className="block font-bold text-[#0f172a] mb-1.5">
                    Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your name"
                    className="w-full px-4 py-3 bg-slate-50 border-slate-200 border border-slate-200 rounded-xl text-[#0f172a] focus:ring-2 focus:ring-[#1e293b] focus:border-[#1e293b] outline-none font-medium"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#0f172a] mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 bg-slate-50 border-slate-200 border border-slate-200 rounded-xl text-[#0f172a] focus:ring-2 focus:ring-[#1e293b] focus:border-[#1e293b] outline-none font-medium"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#0f172a] mb-1.5">
                    Reason for Contacting *
                  </label>
                  <select
                    value={formData.reason}
                    onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border-slate-200 border border-slate-200 rounded-xl text-[#0f172a] focus:ring-2 focus:ring-[#1e293b] focus:border-[#1e293b] font-bold outline-none"
                  >
                    <option value="Question">I have a question</option>
                    <option value="Know about a gap">Know about a gap in services</option>
                    <option value="Know about a resource">Know about a community resource</option>
                    <option value="Want to get involved">Want to get involved</option>
                    <option value="Interested in partnering">Interested in partnering</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[#0f172a] mb-1.5">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Type your message here..."
                    className="w-full p-4 bg-slate-50 border-slate-200 border border-slate-200 rounded-xl text-[#0f172a] focus:ring-2 focus:ring-[#1e293b] focus:border-[#1e293b] outline-none font-medium"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="gold-gradient-btn w-full py-4 rounded-2xl text-[#0f172a] font-black text-xs sm:text-sm uppercase tracking-wider border border-amber-200 flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                </button>
              </form>
            )}

          </div>
        </div>

      </div>

    </div>
  );
};
