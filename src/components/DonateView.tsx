import React, { useState } from 'react';
import { 
  ShieldAlert, Clock, Sparkles, Check, Copy, ExternalLink, 
  CreditCard, DollarSign, ShieldCheck, Mail, Lock, Heart, CheckCircle2,
  Building, Landmark, ArrowRight
} from 'lucide-react';
import { PuffinMascot } from './PuffinMascot';
import { AdminStore } from '../data/adminStore';

interface DonateViewProps {
  onOpenSurvey: () => void;
  onNavigateToGetInvolved?: () => void;
}

export const DonateView: React.FC<DonateViewProps> = ({
  onOpenSurvey,
  onNavigateToGetInvolved,
}) => {
  const [frequency, setFrequency] = useState<'once' | 'monthly'>('once');
  const [selectedAmount, setSelectedAmount] = useState<number | null>(50);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);
  const [copiedAccount, setCopiedAccount] = useState<boolean>(false);
  const [paymentMethod, setPaymentMethod] = useState<'etransfer' | 'bank' | 'cheque'>('etransfer');

  const amounts = [15, 25, 50, 100, 250];
  const finalAmount = customAmount ? parseFloat(customAmount) || 0 : selectedAmount || 0;

  // Retrieve configured Direct Bank & e-Transfer details
  const googleConfig = AdminStore.getGoogleConfig();
  const eTransferEmail = googleConfig.eTransferEmail?.trim() || 'info@fillthegapnl.ca';
  const bankName = googleConfig.bankName?.trim() || '';
  const accountHolder = googleConfig.accountHolderName?.trim() || 'Fill the Gap NL';
  const institutionNumber = googleConfig.institutionNumber?.trim() || '';
  const transitNumber = googleConfig.transitNumber?.trim() || '';
  const accountNumber = googleConfig.accountNumber?.trim() || '';
  const swiftBic = googleConfig.swiftBic?.trim() || '';
  const bankAddress = googleConfig.bankAddress?.trim() || 'St. John\'s, NL, Canada';

  const copyEtransfer = () => {
    navigator.clipboard.writeText(eTransferEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const copyBankSummary = () => {
    const summary = [
      `Account Holder: ${accountHolder}`,
      bankName ? `Bank: ${bankName}` : '',
      institutionNumber ? `Institution Number: ${institutionNumber}` : '',
      transitNumber ? `Transit Number: ${transitNumber}` : '',
      accountNumber ? `Account Number: ${accountNumber}` : '',
      swiftBic ? `SWIFT / BIC: ${swiftBic}` : '',
    ].filter(Boolean).join('\n');

    navigator.clipboard.writeText(summary || `Fill the Gap NL Bank Donation: ${eTransferEmail}`);
    setCopiedAccount(true);
    setTimeout(() => setCopiedAccount(false), 2500);
  };

  const supportAreas = [
    'Community outreach',
    'Research & Listening',
    'Surveys & Data Analysis',
    'Resource development',
    'Technology & Directory Tools',
    'Supplies & Information Packets',
    'Outreach materials',
    'Future frontline programs',
    'Employment initiatives',
    'Practical barrier relief',
    'Community projects',
    'Organizational development',
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* 1. AT THE VERY TOP: PROMINENT MANDATORY NOTICE (DEEP PURPLE & GOLD) */}
      <section className="bg-[#0b0f19] border-2 border-[#E5A93C] rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl text-white">
        <div className="flex items-center gap-2.5">
          <ShieldAlert className="w-6 h-6 text-[#F3BA4F] shrink-0" />
          <h2
            className="text-lg sm:text-xl font-black uppercase tracking-wide text-[#F3BA4F]"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            IMPORTANT INFORMATION ABOUT DONATIONS
          </h2>
        </div>

        <div className="space-y-3 text-xs sm:text-sm text-slate-100 leading-relaxed">
          <p className="text-base font-bold text-white">
            Fill the Gap is not yet a registered charity.
          </p>
          <p>
            We are currently building the organization with the goal of pursuing charitable status in the future.
          </p>
          <p className="font-bold text-slate-300">
            Because we are not currently a registered charity:
          </p>
          <div className="font-black text-[#0f172a] text-sm sm:text-base bg-gradient-to-r from-[#E5A93C] via-[#F3BA4F] to-[#D4972B] p-3.5 rounded-xl inline-block shadow-md">
            We cannot issue official charitable tax receipts for donations received at this time.
          </div>
        </div>
      </section>

      {/* Page Title */}
      <div className="border-b border-slate-200 pb-6 space-y-2">
        <span className="text-[11px] font-black uppercase tracking-wider text-slate-800 bg-slate-100 px-3.5 py-1.5 rounded-full border border-slate-200">
          Support Our Mission
        </span>
        <h1
          className="text-3xl sm:text-5xl font-black text-[#0f172a] tracking-tight uppercase"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          DONATE
        </h1>
      </div>

      {/* 2. DIRECT BANK & PAYMENT PROCESSING SYSTEM */}
      <section className="bg-[#0b0f19] text-white rounded-3xl p-6 sm:p-10 shadow-2xl border-2 border-[#E5A93C] space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Landmark className="w-6 h-6 text-[#F3BA4F]" />
              <h2
                className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                DIRECT DONATIONS & BANKING
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-300">
              100% of your gift directly supports Fill The Gap in our efforts to help across Newfoundland & Labrador
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-900 border border-[#E5A93C]/40 px-3.5 py-1.5 rounded-full">
            <Lock className="w-3.5 h-3.5 text-[#F3BA4F]" />
            <span className="text-[11px] font-bold text-[#F3BA4F] uppercase tracking-wider">
              Zero Processing Fees
            </span>
          </div>
        </div>

        {/* Frequency & Amount Selection */}
        <div className="space-y-6">
          
          {/* Frequency Selector */}
          <div className="grid grid-cols-2 gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <button
              type="button"
              onClick={() => setFrequency('once')}
              className={`py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer ${
                frequency === 'once'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              One-Time Contribution
            </button>
            <button
              type="button"
              onClick={() => setFrequency('monthly')}
              className={`py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer ${
                frequency === 'monthly'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Monthly Supporter
            </button>
          </div>

          {/* Amount Selection */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
              Suggested Contribution Amount (CAD)
            </label>
            
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5">
              {amounts.map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => {
                    setSelectedAmount(amt);
                    setCustomAmount('');
                  }}
                  className={`py-3.5 px-2 rounded-xl text-center font-black text-sm sm:text-base transition-all border cursor-pointer ${
                    selectedAmount === amt && !customAmount
                      ? 'bg-amber-500 border-amber-400 text-slate-950 shadow-lg shadow-amber-500/20'
                      : 'bg-slate-950 border-slate-800 text-slate-200 hover:border-slate-700'
                  }`}
                >
                  ${amt}
                </button>
              ))}
            </div>

            {/* Custom Amount Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 font-bold">
                $
              </div>
              <input
                type="number"
                min="1"
                step="any"
                placeholder="Or enter a custom donation amount (CAD)..."
                value={customAmount}
                onChange={(e) => {
                  setCustomAmount(e.target.value);
                  setSelectedAmount(null);
                }}
                className="w-full pl-8 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 font-medium text-sm"
              />
            </div>
          </div>

        </div>

        {/* Payment Method Selector Tabs */}
        <div className="grid grid-cols-3 gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
          <button
            type="button"
            onClick={() => setPaymentMethod('etransfer')}
            className={`py-3 px-2 sm:px-4 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
              paymentMethod === 'etransfer'
                ? 'bg-gradient-to-r from-[#E5A93C] via-[#F3BA4F] to-[#D4972B] text-[#0f172a] shadow-lg'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>Interac e-Transfer</span>
          </button>

          <button
            type="button"
            onClick={() => setPaymentMethod('bank')}
            className={`py-3 px-2 sm:px-4 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
              paymentMethod === 'bank'
                ? 'bg-emerald-600 text-white shadow-lg'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Landmark className="w-4 h-4" />
            <span>Direct Bank Deposit</span>
          </button>

          <button
            type="button"
            onClick={() => setPaymentMethod('cheque')}
            className={`py-3 px-2 sm:px-4 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
              paymentMethod === 'cheque'
                ? 'bg-slate-800 text-white shadow-lg'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Building className="w-4 h-4" />
            <span>Cheque / Mail</span>
          </button>
        </div>

        {/* TAB 1: INTERAC E-TRANSFER */}
        {paymentMethod === 'etransfer' && (
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-5">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-bold text-white">Direct Interac e-Transfer (Canada)</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Send directly from your online banking app (RBC, TD, Scotiabank, BMO, CIBC, Credit Unions, etc.) with zero fees.
                </p>
              </div>
            </div>

            <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between gap-3 flex-wrap">
              <div className="min-w-0">
                <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 block">
                  Send e-Transfer To Recipient Email
                </span>
                <span className="text-base sm:text-lg font-mono font-bold text-amber-300 break-all block">
                  {eTransferEmail}
                </span>
              </div>
              <button
                type="button"
                onClick={copyEtransfer}
                className="px-4 py-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-bold flex items-center gap-2 cursor-pointer transition-colors"
              >
                {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copiedEmail ? 'Copied to Clipboard!' : 'Copy Email Address'}</span>
              </button>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 space-y-2">
              <p>• <strong>Recipient Name:</strong> {accountHolder}</p>
              <p>• <strong>Suggested Memo:</strong> "Donation ${finalAmount || 50} - [Your Name]"</p>
              <p>• <strong>Security Question:</strong> Auto-Deposit is enabled, no security question or answer required.</p>
            </div>
          </div>
        )}

        {/* TAB 2: DIRECT BANK TRANSFER */}
        {paymentMethod === 'bank' && (
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-5">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                <Landmark className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-bold text-white">Direct Bank Deposit / Wire Transfer</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Direct transfer from your Canadian or international financial institution.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-xl">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Account Name</span>
                <span className="text-sm font-bold text-white">{accountHolder}</span>
              </div>

              {bankName && (
                <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-xl">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Financial Institution</span>
                  <span className="text-sm font-bold text-emerald-300">{bankName}</span>
                </div>
              )}

              {institutionNumber && (
                <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-xl">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Institution Number</span>
                  <span className="text-sm font-mono font-bold text-white">{institutionNumber}</span>
                </div>
              )}

              {transitNumber && (
                <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-xl">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Transit / Branch #</span>
                  <span className="text-sm font-mono font-bold text-white">{transitNumber}</span>
                </div>
              )}

              {accountNumber && (
                <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-xl">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Account Number</span>
                  <span className="text-sm font-mono font-bold text-emerald-300">{accountNumber}</span>
                </div>
              )}

              {swiftBic && (
                <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-xl">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">SWIFT / BIC Code</span>
                  <span className="text-sm font-mono font-bold text-white">{swiftBic}</span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between gap-3 pt-2">
              <span className="text-xs text-slate-400">
                Location: {bankAddress}
              </span>
              <button
                type="button"
                onClick={copyBankSummary}
                className="px-4 py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-bold flex items-center gap-2 cursor-pointer transition-colors"
              >
                {copiedAccount ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copiedAccount ? 'Details Copied!' : 'Copy Bank Details'}</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 3: CHEQUE & INSTITUTIONAL */}
        {paymentMethod === 'cheque' && (
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4 text-xs text-slate-300">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Building className="w-4 h-4 text-amber-400" />
              <span>Cheques, Institutional Grants & Community Pledges</span>
            </h4>
            <p>
              For organizational contributions, corporate sponsorships, or donor-advised gifts, please make cheques payable to:
            </p>
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl font-mono text-slate-200 space-y-1">
              <strong className="text-amber-300 text-sm">{accountHolder}</strong><br />
              Attn: Community Initiatives & Resource Expansion<br />
              St. John's, Newfoundland & Labrador, Canada
            </div>
            <p className="text-slate-400">
              To coordinate hand delivery or arrange direct invoicing, please email us at{' '}
              <a href={`mailto:${eTransferEmail}`} className="text-amber-400 underline font-bold">{eTransferEmail}</a>.
            </p>
          </div>
        )}

        <div className="pt-2 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-medium">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Direct Banking
          </span>
          <span>•</span>
          <span>Canadian Dollars (CAD)</span>
          <span>•</span>
          <span>Community Acknowledgment</span>
        </div>

      </section>

      {/* 3. HELP US FILL THE GAP */}
      <section className="civic-card rounded-3xl p-8 sm:p-12 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-8 space-y-4">
            <h2
              className="text-2xl sm:text-3xl font-black text-[#0f172a] uppercase"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              HELP US FILL THE GAP
            </h2>

            <div className="space-y-3 text-stone-700 text-base sm:text-lg leading-relaxed">
              <p>There are people across our Newfoundland & Labrador communities who need support.</p>
              <p>There are organizations already working hard to provide that support.</p>
              <p className="font-bold text-[#0f172a]">
                And there are gaps between people and the resources they urgently need.
              </p>
              <p>
                Fill the Gap wants to understand those gaps and find responsible, collaborative ways to help address them.
              </p>
              <p className="font-black text-[#0f172a] pt-2">
                Your support helps us build the foundation for that work.
              </p>
            </div>
          </div>

          <div className="md:col-span-4 flex justify-center">
            <div className="p-4 rounded-3xl bg-amber-50/80 border-2 border-[#E5A93C]/50 shadow-md text-center max-w-xs space-y-2 bg-white">
              <PuffinMascot
                className="w-full max-h-56 object-contain drop-shadow-md mx-auto"
                alt="Fill the Gap Puffin Mascot with Donation Box"
              />
              <span className="text-[11px] font-black uppercase tracking-wider text-slate-800 block">
                Fill the Gap donations • Giving Together
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. WHAT YOUR SUPPORT CAN HELP US BUILD */}
      <section className="civic-card rounded-3xl p-8 sm:p-12 space-y-6">
        <div className="space-y-2">
          <h2
            className="text-2xl sm:text-3xl font-black text-[#0f172a] uppercase"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            WHAT YOUR SUPPORT CAN HELP US BUILD
          </h2>
          <p className="text-sm sm:text-base text-stone-600 font-medium">
            Every contribution directly supports our community research and grassroots service initiatives:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {supportAreas.map((area, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200/80 flex items-center gap-3 text-stone-800 text-xs sm:text-sm font-bold shadow-xs hover:border-amber-400 transition-colors"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{area}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 5. OTHER WAYS TO HELP (CAN'T DONATE?) */}
      <section className="bg-slate-50 border-slate-200 border border-slate-200 rounded-3xl p-8 sm:p-12 space-y-6">
        <div className="space-y-2">
          <h2
            className="text-2xl sm:text-3xl font-black text-[#0f172a] uppercase"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            CAN'T DONATE RIGHT NOW?
          </h2>
          <p className="text-sm sm:text-base text-stone-600 font-medium">
            Financial support is only one of many meaningful ways you can help strengthen our community.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={onOpenSurvey}
            className="p-5 rounded-2xl bg-white border-2 border-stone-200 hover:border-amber-400 text-left space-y-2 group transition-all cursor-pointer shadow-xs hover:shadow-md"
          >
            <div className="flex items-center justify-between text-[#0f172a] font-black text-sm uppercase">
              <span>Take the Community Survey</span>
              <Sparkles className="w-4 h-4 text-amber-500 group-hover:scale-110 transition-transform" />
            </div>
            <p className="text-xs text-stone-600 font-medium leading-relaxed">
              Share your lived experience, highlight service bottlenecks, and help inform decision makers.
            </p>
          </button>

          <button
            onClick={onNavigateToGetInvolved}
            className="p-5 rounded-2xl bg-white border-2 border-stone-200 hover:border-amber-400 text-left space-y-2 group transition-all cursor-pointer shadow-xs hover:shadow-md"
          >
            <div className="flex items-center justify-between text-[#0f172a] font-black text-sm uppercase">
              <span>Spread the Word & Volunteer</span>
              <Heart className="w-4 h-4 text-rose-500 group-hover:scale-110 transition-transform" />
            </div>
            <p className="text-xs text-stone-600 font-medium leading-relaxed">
              Share our initiatives with your network, join community rounds, or contribute your skills.
            </p>
          </button>
        </div>
      </section>

    </div>
  );
};

