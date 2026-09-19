import React from 'react';
import { X, Shield, FileText, Eye, AlertCircle } from 'lucide-react';

export type LegalModalType = 'privacy' | 'terms' | 'accessibility' | null;

interface LegalModalProps {
  type: LegalModalType;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#0f172a]/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-10 shadow-2xl border border-slate-200 my-8 space-y-6 animate-in fade-in zoom-in-95">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div className="flex items-center gap-3">
            {type === 'privacy' && (
              <div className="w-10 h-10 rounded-xl bg-[#1e293b] text-amber-400 border border-amber-400/40 flex items-center justify-center">
                <Shield className="w-5 h-5" />
              </div>
            )}
            {type === 'terms' && (
              <div className="w-10 h-10 rounded-xl bg-[#1e293b] text-slate-800 border border-slate-200 flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
            )}
            {type === 'accessibility' && (
              <div className="w-10 h-10 rounded-xl bg-[#1e293b] text-amber-400 border border-amber-400/40 flex items-center justify-center">
                <Eye className="w-5 h-5" />
              </div>
            )}
            <div>
              <h3
                className="text-xl sm:text-2xl font-black text-[#0f172a] uppercase"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                {type === 'privacy' && 'Privacy Information'}
                {type === 'terms' && 'Website Information & Terms'}
                {type === 'accessibility' && 'Accessibility Statement'}
              </h3>
              <p className="text-xs text-stone-500 font-bold">
                Fill the Gap • St. John's, Newfoundland & Labrador
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-[#0f172a] hover:bg-slate-100 rounded-xl transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content based on type */}
        <div className="space-y-4 text-xs sm:text-sm text-stone-700 leading-relaxed max-h-[60vh] overflow-y-auto pr-2">
          
          {/* Privacy */}
          {type === 'privacy' && (
            <div className="space-y-4">
              <p className="font-black text-[#0f172a] text-sm">
                How we handle your information:
              </p>
              <p>
                Information submitted through our website forms or community survey may be used to:
              </p>
              <ul className="space-y-1.5 pl-5 list-disc text-stone-800 font-bold">
                <li>Understand community needs and experiences in Newfoundland & Labrador</li>
                <li>Respond to inquiries and messages</li>
                <li>Improve the website and directory resources</li>
                <li>Identify potential gaps in support and services</li>
                <li>Help guide future community initiatives</li>
              </ul>
              
              <div className="p-4 bg-slate-100 border border-slate-200 rounded-2xl space-y-1.5">
                <div className="flex items-center gap-1.5 font-black text-[#0f172a] text-xs uppercase">
                  <AlertCircle className="w-4 h-4 text-slate-800 shrink-0" />
                  <span>Important Notice</span>
                </div>
                <p className="text-xs text-slate-800 font-bold leading-relaxed">
                  Please do not submit highly sensitive personal information through general website forms.
                </p>
              </div>

              <p className="text-xs text-stone-500">
                We do not sell personal information or publish individual survey responses publicly.
              </p>
            </div>
          )}

          {/* Terms & Disclaimers */}
          {type === 'terms' && (
            <div className="space-y-4">
              <div className="p-3.5 bg-[#0f172a] border border-amber-400 text-xs text-amber-300 font-black rounded-xl shadow-xs">
                Fill the Gap is not currently a registered charity.
              </div>

              <div className="space-y-3">
                <p>
                  <strong className="text-[#0f172a]">General Information:</strong> Website information is provided for general informational purposes only.
                </p>
                <p>
                  <strong className="text-[#0f172a]">External Services & Verification:</strong> External resources, contact details, operating hours, and program rules may change. Users should confirm current information directly with the organization providing the service.
                </p>
                <p>
                  <strong className="text-[#0f172a]">No Guarantee:</strong> Fill the Gap does not guarantee eligibility, availability, or results from external services or third-party organizations listed on this site.
                </p>
                <p>
                  <strong className="text-[#0f172a]">Not an Emergency Service:</strong> Fill the Gap is not an emergency service or crisis responder. In immediate danger or medical emergencies, call 911 or provincial support lines (811 / 211 / 988).
                </p>
                <p>
                  <strong className="text-[#0f172a]">No Professional Advice:</strong> Nothing on this website should be presented as or construed as medical, legal, financial, or professional advice.
                </p>
              </div>
            </div>
          )}

          {/* Accessibility */}
          {type === 'accessibility' && (
            <div className="space-y-4">
              <p className="font-black text-[#0f172a] text-sm">
                Commitment to Digital Accessibility
              </p>
              <p>
                Fill the Gap is designed to be accessible to as many people as possible in our community. We aim to conform to WCAG guidelines.
              </p>
              
              <ul className="space-y-2 pl-5 list-disc text-stone-800 font-bold">
                <li><strong className="text-[#0f172a]">Clear contrast:</strong> High contrast color pairings for optimal legibility.</li>
                <li><strong className="text-[#0f172a]">Readable typography:</strong> Clean type hierarchy and comfortable line spacing.</li>
                <li><strong className="text-[#0f172a]">Keyboard navigation:</strong> Full tab navigation with visible focus indicators.</li>
                <li><strong className="text-[#0f172a]">Touch friendly:</strong> Large touch targets (≥44px) on mobile viewports.</li>
                <li><strong className="text-[#0f172a]">Descriptive buttons:</strong> Clear labels and context for screen readers.</li>
                <li><strong className="text-[#0f172a]">No sensory traps:</strong> Respect for reduced motion preferences.</li>
              </ul>

              <p className="pt-2 text-xs text-stone-600">
                If you encounter any difficulty navigating our website, please let us know so we can improve access for everyone.
              </p>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-200 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-[#0f172a] hover:bg-[#0f172a] text-white font-bold text-xs uppercase tracking-wider transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
