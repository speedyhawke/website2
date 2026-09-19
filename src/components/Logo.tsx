import React, { useState } from 'react';
import { PuffinMascot } from './PuffinMascot';

interface LogoProps {
  variant?: 'full' | 'compact' | 'mascot-only';
  className?: string;
  isDark?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'full',
  className = '',
  isDark = false
}) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Puffin Mascot Badge in Top Left Corner */}
      <div className="relative shrink-0 flex items-center justify-center bg-white rounded-2xl p-1 sm:p-1.5 border-2 border-[#E5A93C] shadow-lg shadow-black/40 overflow-hidden group">
        {!imgError ? (
          <img
            src="puffin.jpg"
            alt="Fill the Gap Puffin Mascot"
            className="h-10 sm:h-12 w-auto max-w-[70px] sm:max-w-[85px] object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-sm"
            onError={(e) => {
              const target = e.currentTarget;
              if (!target.dataset.fallbackStep) {
                target.dataset.fallbackStep = '1';
                target.src = './puffin.jpg';
              } else if (target.dataset.fallbackStep === '1') {
                target.dataset.fallbackStep = '2';
                target.src = '/puffin.jpg';
              } else if (target.dataset.fallbackStep === '2') {
                target.dataset.fallbackStep = '3';
                target.src = 'docs/puffin.jpg';
              } else {
                setImgError(true);
              }
            }}
          />
        ) : (
          <PuffinMascot className="h-10 sm:h-12 w-auto max-w-[70px] sm:max-w-[85px] group-hover:scale-105 transition-transform duration-300 drop-shadow-sm" />
        )}
      </div>

      {/* Wordmark */}
      {variant !== 'mascot-only' && (
        <div className="flex flex-col text-left">
          <span
            className={`font-black tracking-tight text-lg sm:text-xl uppercase leading-tight ${
              isDark ? 'text-white' : 'text-[#0f172a]'
            }`}
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            FILL THE GAP
          </span>
          {variant === 'full' && (
            <span
              className={`text-[10px] sm:text-[11px] font-bold tracking-wider uppercase leading-tight ${
                isDark ? 'text-[#F3BA4F]' : 'text-amber-700'
              }`}
            >
              St. John's, NL • Community Initiative
            </span>
          )}
        </div>
      )}
    </div>
  );
};


