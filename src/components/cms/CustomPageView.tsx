import React, { useState } from 'react';
import {
  Heart,
  ArrowRight,
  ExternalLink,
  ChevronDown,
  Phone,
  Mail,
  Download,
  AlertCircle,
  CheckCircle2,
  Info,
  Flame,
  ShieldCheck,
  Zap,
  MapPin,
  Users,
  Briefcase,
  HeartPulse,
  Globe,
  Home,
  MessageSquare,
  Sparkles,
  PhoneCall,
  Lock,
  Calendar,
  Layers,
  FileText
} from 'lucide-react';
import { CMSPage, CMSBlock, CMSButton, CMSCard, CMSLinkItem, CMSGalleryImage } from '../../data/cmsStore';
import { PuffinMascot } from '../PuffinMascot';

interface CustomPageViewProps {
  page: CMSPage;
  onOpenCommunitySurvey: () => void;
  onOpenProfessionalSurvey: () => void;
  onNavigateToDonate?: () => void;
  onNavigateToContact?: () => void;
}

// Icon mapping helper
const getIconComponent = (name?: string) => {
  switch (name?.toLowerCase()) {
    case 'flame': return Flame;
    case 'shieldcheck': return ShieldCheck;
    case 'zap': return Zap;
    case 'mappin': return MapPin;
    case 'users': return Users;
    case 'briefcase': return Briefcase;
    case 'heartpulse': return HeartPulse;
    case 'globe': return Globe;
    case 'home': return Home;
    case 'messagesquare': return MessageSquare;
    case 'sparkles': return Sparkles;
    case 'phonecall':
    case 'phone': return PhoneCall;
    case 'lock': return Lock;
    case 'calendar': return Calendar;
    case 'download': return Download;
    case 'filetext': return FileText;
    case 'heart': return Heart;
    default: return Info;
  }
};

export const CustomPageView: React.FC<CustomPageViewProps> = ({
  page,
  onOpenCommunitySurvey,
  onOpenProfessionalSurvey,
  onNavigateToDonate,
  onNavigateToContact,
}) => {
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({});
  const [activeLightboxImage, setActiveLightboxImage] = useState<CMSGalleryImage | null>(null);

  const toggleAccordion = (id: string) => {
    setOpenAccordions(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleButtonClick = (btn: CMSButton) => {
    switch (btn.actionType) {
      case 'community_survey':
        onOpenCommunitySurvey();
        break;
      case 'professional_survey':
        onOpenProfessionalSurvey();
        break;
      case 'donate':
        if (onNavigateToDonate) onNavigateToDonate();
        else window.location.href = '/#donate';
        break;
      case 'contact':
        if (onNavigateToContact) onNavigateToContact();
        else window.location.href = '/#contact';
        break;
      case 'tel':
        window.location.href = btn.url.startsWith('tel:') ? btn.url : `tel:${btn.url}`;
        break;
      case 'mailto':
        window.location.href = btn.url.startsWith('mailto:') ? btn.url : `mailto:${btn.url}`;
        break;
      default:
        if (btn.url.startsWith('#survey')) {
          onOpenCommunitySurvey();
        } else if (btn.openInNewTab) {
          window.open(btn.url, '_blank', 'noopener,noreferrer');
        } else {
          window.location.href = btn.url;
        }
    }
  };

  const renderButton = (btn: CMSButton) => {
    const IconComp = btn.iconName ? getIconComponent(btn.iconName) : null;
    
    let baseStyles = 'inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-sm ';
    switch (btn.variant) {
      case 'gold':
        baseStyles += 'bg-gradient-to-r from-[#E5A93C] via-[#F3BA4F] to-[#D4972B] hover:brightness-105 text-slate-950 font-black border border-amber-300 shadow-amber-500/20';
        break;
      case 'primary':
        baseStyles += 'bg-slate-900 hover:bg-slate-800 text-white border border-slate-700';
        break;
      case 'secondary':
        baseStyles += 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300';
        break;
      case 'red':
        baseStyles += 'bg-red-600 hover:bg-red-700 text-white font-black border border-red-500';
        break;
      case 'outline':
      default:
        baseStyles += 'bg-transparent hover:bg-white/10 text-white border border-white/40';
        break;
    }

    return (
      <button
        key={btn.id}
        onClick={() => handleButtonClick(btn)}
        className={baseStyles}
      >
        {IconComp && <IconComp className="w-4 h-4" />}
        <span>{btn.label}</span>
        {btn.openInNewTab && <ExternalLink className="w-3.5 h-3.5 opacity-70" />}
      </button>
    );
  };

  const renderBlock = (block: CMSBlock) => {
    // Background style
    let bgClass = 'py-8 px-4 sm:px-6 lg:px-8 ';
    if (block.bgColor === 'white') bgClass += 'bg-white ';
    else if (block.bgColor === 'slate') bgClass += 'bg-[#0f172a] text-white ';
    else if (block.bgColor === 'navy') bgClass += 'bg-[#0a0f1d] text-white ';
    else if (block.bgColor === 'amber') bgClass += 'bg-amber-50/80 border-y border-amber-200/60 ';
    else if (block.bgColor === 'light_gray') bgClass += 'bg-slate-100/80 ';
    else bgClass += 'bg-transparent ';

    const maxWClass =
      block.maxWidth === 'sm'
        ? 'max-w-3xl'
        : block.maxWidth === 'lg'
        ? 'max-w-6xl'
        : block.maxWidth === 'full'
        ? 'max-w-full'
        : 'max-w-5xl';

    return (
      <div key={block.id} className={`${bgClass} transition-colors`}>
        <div className={`${maxWClass} mx-auto`}>
          
          {/* HERO BLOCK */}
          {block.type === 'hero' && (
            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-800 bg-[#0B0F19] text-white p-6 sm:p-10 lg:p-12">
              {block.imageUrl && (
                <div className="absolute inset-0 z-0">
                  <img
                    src={block.imageUrl}
                    alt={block.imageAlt || 'Hero banner'}
                    className="w-full h-full object-cover opacity-25"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-[#0B0F19]/80 to-transparent" />
                </div>
              )}
              
              <div className="relative z-10 space-y-4 max-w-3xl">
                {block.badgeText && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-black uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>{block.badgeText}</span>
                  </div>
                )}
                
                <h1
                  className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  {block.title || page.title}
                </h1>
                
                {block.subtitle && (
                  <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
                    {block.subtitle}
                  </p>
                )}

                {block.buttons && block.buttons.length > 0 && (
                  <div className="pt-2 flex flex-wrap gap-3">
                    {block.buttons.map(renderButton)}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TEXT BLOCK */}
          {block.type === 'text' && (
            <div className={`space-y-4 ${block.textAlign === 'center' ? 'text-center' : block.textAlign === 'right' ? 'text-right' : 'text-left'}`}>
              {block.badgeText && (
                <span className="inline-block px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-black uppercase tracking-wider">
                  {block.badgeText}
                </span>
              )}
              {block.title && (
                <h2
                  className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  {block.title}
                </h2>
              )}
              {block.subtitle && (
                <p className="text-base font-semibold text-slate-600">
                  {block.subtitle}
                </p>
              )}
              {block.content && (
                <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed whitespace-pre-line text-sm sm:text-base">
                  {block.content}
                </div>
              )}
            </div>
          )}

          {/* IMAGE BLOCK */}
          {block.type === 'image' && block.imageUrl && (
            <figure className="space-y-2">
              <div
                className={`overflow-hidden ${
                  block.imageRadius === '2xl'
                    ? 'rounded-2xl'
                    : block.imageRadius === 'full'
                    ? 'rounded-full'
                    : block.imageRadius === 'none'
                    ? 'rounded-none'
                    : 'rounded-xl'
                } ${block.imageBorder ? 'border-4 border-white shadow-xl ring-1 ring-slate-200' : 'shadow-md'}`}
              >
                <img
                  src={block.imageUrl}
                  alt={block.imageAlt || 'Page picture'}
                  className="w-full h-auto max-h-[550px] object-cover hover:scale-[1.01] transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              {block.imageCaption && (
                <figcaption className="text-xs text-center text-slate-500 italic">
                  {block.imageCaption}
                </figcaption>
              )}
            </figure>
          )}

          {/* GALLERY BLOCK */}
          {block.type === 'gallery' && block.galleryImages && block.galleryImages.length > 0 && (
            <div className="space-y-4">
              {block.title && (
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                  {block.title}
                </h3>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {block.galleryImages.map((img) => (
                  <div
                    key={img.id}
                    onClick={() => setActiveLightboxImage(img)}
                    className="group relative rounded-2xl overflow-hidden shadow-md cursor-pointer border border-slate-200 aspect-4/3 bg-slate-900"
                  >
                    <img
                      src={img.url}
                      alt={img.altText || 'Gallery image'}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {img.caption && (
                      <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white text-xs">
                        <p className="truncate font-medium">{img.caption}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CALLOUT / ALERT BLOCK */}
          {block.type === 'callout' && (
            <div
              className={`rounded-2xl p-6 sm:p-8 border shadow-md flex flex-col sm:flex-row items-start gap-4 ${
                block.calloutType === 'gold'
                  ? 'bg-amber-50/90 border-amber-300 text-amber-950'
                  : block.calloutType === 'urgent' || block.calloutType === 'warning'
                  ? 'bg-red-50/90 border-red-300 text-red-950'
                  : block.calloutType === 'success'
                  ? 'bg-emerald-50/90 border-emerald-300 text-emerald-950'
                  : 'bg-slate-50 border-slate-300 text-slate-900'
              }`}
            >
              <div
                className={`p-3 rounded-xl shrink-0 ${
                  block.calloutType === 'gold'
                    ? 'bg-amber-400 text-slate-950'
                    : block.calloutType === 'urgent'
                    ? 'bg-red-600 text-white'
                    : 'bg-slate-800 text-white'
                }`}
              >
                {block.calloutType === 'urgent' ? (
                  <AlertCircle className="w-6 h-6" />
                ) : block.calloutType === 'success' ? (
                  <CheckCircle2 className="w-6 h-6" />
                ) : (
                  <Flame className="w-6 h-6" />
                )}
              </div>

              <div className="space-y-2 flex-1">
                {block.title && (
                  <h4 className="text-lg font-black">{block.title}</h4>
                )}
                {block.content && (
                  <p className="text-sm leading-relaxed opacity-90">{block.content}</p>
                )}
                {block.buttons && block.buttons.length > 0 && (
                  <div className="pt-2 flex flex-wrap gap-2">
                    {block.buttons.map(renderButton)}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* BUTTONS ROW BLOCK */}
          {block.type === 'buttons' && block.buttons && block.buttons.length > 0 && (
            <div
              className={`flex flex-wrap gap-3 ${
                block.textAlign === 'center'
                  ? 'justify-center'
                  : block.textAlign === 'right'
                  ? 'justify-end'
                  : 'justify-start'
              }`}
            >
              {block.buttons.map(renderButton)}
            </div>
          )}

          {/* CARDS GRID BLOCK */}
          {block.type === 'cards_grid' && block.cards && (
            <div className="space-y-6">
              {(block.title || block.subtitle) && (
                <div className="text-center max-w-2xl mx-auto space-y-2">
                  {block.title && (
                    <h3
                      className="text-2xl sm:text-3xl font-black text-slate-900"
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                    >
                      {block.title}
                    </h3>
                  )}
                  {block.subtitle && (
                    <p className="text-sm text-slate-600">{block.subtitle}</p>
                  )}
                </div>
              )}

              <div
                className={`grid grid-cols-1 gap-5 ${
                  block.cardsColumns === 2
                    ? 'sm:grid-cols-2'
                    : block.cardsColumns === 4
                    ? 'sm:grid-cols-2 lg:grid-cols-4'
                    : 'sm:grid-cols-2 lg:grid-cols-3'
                }`}
              >
                {block.cards.map((card) => {
                  const Icon = getIconComponent(card.iconName);
                  return (
                    <div
                      key={card.id}
                      className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md hover:border-[#E5A93C]/60 transition-all flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between gap-2">
                          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold">
                            <Icon className="w-5 h-5" />
                          </div>
                          {card.badge && (
                            <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-800 font-bold text-[11px] uppercase tracking-wider border border-slate-200">
                              {card.badge}
                            </span>
                          )}
                        </div>

                        <div>
                          <h4 className="text-base font-black text-slate-900">{card.title}</h4>
                          {card.subtitle && (
                            <p className="text-xs font-semibold text-amber-700">{card.subtitle}</p>
                          )}
                        </div>

                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                          {card.description}
                        </p>
                      </div>

                      {card.linkUrl && (
                        <div className="pt-4 mt-2 border-t border-slate-100">
                          <a
                            href={card.linkUrl}
                            className="text-xs font-black text-amber-700 hover:text-amber-900 inline-flex items-center gap-1.5"
                          >
                            <span>{card.linkText || 'Learn More'}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* QUOTE / STORY CARD */}
          {block.type === 'quotes' && (
            <div className="bg-gradient-to-br from-[#0B0F19] to-slate-900 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-xl relative overflow-hidden">
              <div className="text-5xl font-serif text-[#F3BA4F]/30 absolute top-4 left-6 pointer-events-none select-none">
                “
              </div>
              <div className="relative z-10 space-y-4 max-w-3xl mx-auto text-center">
                <p className="text-lg sm:text-xl md:text-2xl font-semibold italic text-slate-100 leading-relaxed">
                  "{block.quoteText || 'Empowering our community by bridging the bureaucratic gaps.'}"
                </p>
                
                <div className="pt-2 flex items-center justify-center gap-3">
                  {block.quoteAvatarUrl ? (
                    <img
                      src={block.quoteAvatarUrl}
                      alt={block.quoteAuthor || 'Avatar'}
                      className="w-10 h-10 rounded-full object-cover border-2 border-[#E5A93C]"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-amber-400 text-slate-950 font-black flex items-center justify-center text-sm">
                      {block.quoteAuthor ? block.quoteAuthor[0] : 'NL'}
                    </div>
                  )}
                  <div className="text-left">
                    <p className="text-sm font-bold text-white">{block.quoteAuthor || 'Community Voice'}</p>
                    <p className="text-xs text-amber-300">{block.quoteRole || 'Supporter'} {block.quoteLocation ? `• ${block.quoteLocation}` : ''}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STATS BLOCK */}
          {block.type === 'stats' && (
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm text-center max-w-md mx-auto space-y-1">
              <div
                className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                {block.statNumber || '100%'}
              </div>
              <p className="text-sm font-bold text-slate-800 uppercase tracking-wider">
                {block.statLabel || 'Direct Assistance'}
              </p>
              {block.statNote && (
                <p className="text-xs text-slate-500 pt-1">{block.statNote}</p>
              )}
            </div>
          )}

          {/* ACCORDION / FAQ */}
          {block.type === 'accordion' && block.accordionItems && (
            <div className="space-y-4 max-w-3xl mx-auto">
              {block.title && (
                <h3
                  className="text-2xl font-black text-slate-900 text-center pb-2"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  {block.title}
                </h3>
              )}
              <div className="space-y-3">
                {block.accordionItems.map((item) => {
                  const isOpen = openAccordions[item.id] || false;
                  return (
                    <div
                      key={item.id}
                      className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm transition-all"
                    >
                      <button
                        onClick={() => toggleAccordion(item.id)}
                        className="w-full text-left p-4 sm:p-5 font-bold text-slate-900 flex items-center justify-between gap-4 hover:bg-slate-50 cursor-pointer"
                      >
                        <span className="text-sm sm:text-base">{item.question}</span>
                        <ChevronDown
                          className={`w-5 h-5 text-slate-400 shrink-0 transition-transform ${
                            isOpen ? 'rotate-180 text-amber-600' : ''
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="p-4 sm:p-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                          {item.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* LINKS LIST BLOCK */}
          {block.type === 'links_list' && block.linkItems && (
            <div className="space-y-4 max-w-3xl mx-auto">
              {block.title && (
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 pb-2">
                  {block.title}
                </h3>
              )}
              <div className="space-y-3">
                {block.linkItems.map((item) => {
                  const Icon = getIconComponent(item.iconName);
                  return (
                    <a
                      key={item.id}
                      href={item.url}
                      target={item.url.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      className="group bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 hover:border-[#E5A93C] hover:shadow-md transition-all flex items-center justify-between gap-4 block"
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="w-10 h-10 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center shrink-0">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
                              {item.title}
                            </h4>
                            {item.badge && (
                              <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 text-[10px] font-bold">
                                {item.badge}
                              </span>
                            )}
                          </div>
                          {item.description && (
                            <p className="text-xs text-slate-500">{item.description}</p>
                          )}
                        </div>
                      </div>

                      <div className="text-slate-400 group-hover:text-amber-600 transition-colors shrink-0">
                        {item.isDownload ? (
                          <Download className="w-5 h-5" />
                        ) : (
                          <ExternalLink className="w-5 h-5" />
                        )}
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          )}

          {/* SURVEY TRIGGER BANNER */}
          {block.type === 'survey_trigger' && (
            <div className="bg-[#0e1422] text-white rounded-3xl p-6 sm:p-8 border-2 border-[#E5A93C]/60 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white p-1 shrink-0 border border-amber-400 overflow-hidden shadow-lg hidden sm:block">
                  <PuffinMascot className="w-full h-full object-contain" />
                </div>
                <div className="space-y-1">
                  <span className="text-[11px] font-black uppercase tracking-wider text-[#F3BA4F]">
                    Grassroots Community Research
                  </span>
                  <h4 className="text-lg sm:text-xl font-black text-white">
                    {block.title || 'Make Your Voice Count in Newfoundland'}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
                    {block.surveyPrompt || '100% confidential survey shaping grassroots winter emergency gap programs.'}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 shrink-0">
                {(block.surveyType === 'community' || block.surveyType === 'both' || !block.surveyType) && (
                  <button
                    onClick={onOpenCommunitySurvey}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#E5A93C] via-[#F3BA4F] to-[#D4972B] hover:brightness-105 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg border border-amber-300 cursor-pointer"
                  >
                    Community Survey
                  </button>
                )}
                {(block.surveyType === 'professional' || block.surveyType === 'both') && (
                  <button
                    onClick={onOpenProfessionalSurvey}
                    className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase tracking-wider border border-slate-600 cursor-pointer"
                  >
                    Frontline Survey
                  </button>
                )}
              </div>
            </div>
          )}

          {/* DECORATIVE DIVIDER */}
          {block.type === 'divider' && (
            <div className="py-4 flex items-center justify-center">
              {block.dividerStyle === 'puffin' ? (
                <div className="flex items-center gap-3 w-full">
                  <div className="h-px bg-slate-200 flex-1" />
                  <div className="w-8 h-8 rounded-full bg-amber-100 border border-amber-300 p-0.5 flex items-center justify-center">
                    <PuffinMascot className="w-full h-full object-contain" />
                  </div>
                  <div className="h-px bg-slate-200 flex-1" />
                </div>
              ) : block.dividerStyle === 'gold_line' ? (
                <div className="w-32 h-1 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 rounded-full" />
              ) : block.dividerStyle === 'dots' ? (
                <div className="flex gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#E5A93C]" />
                  <span className="w-2 h-2 rounded-full bg-[#E5A93C]/60" />
                  <span className="w-2 h-2 rounded-full bg-[#E5A93C]/30" />
                </div>
              ) : (
                <div className="w-full h-px bg-slate-200" />
              )}
            </div>
          )}

          {/* CUSTOM HTML EMBED */}
          {block.type === 'custom_html' && block.customHtml && (
            <div
              className="w-full overflow-hidden rounded-2xl"
              dangerouslySetInnerHTML={{ __html: block.customHtml }}
            />
          )}

        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Optional Top Banner Notice */}
      {page.bannerNotice && (
        <div className="bg-amber-400 text-slate-950 px-4 py-2 text-center text-xs sm:text-sm font-bold border-b border-amber-500/40">
          {page.bannerNotice}
        </div>
      )}

      {/* Render All Blocks */}
      <div className="space-y-2">
        {page.blocks && page.blocks.length > 0 ? (
          page.blocks.map(renderBlock)
        ) : (
          <div className="max-w-3xl mx-auto py-20 px-4 text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-900 mx-auto flex items-center justify-center font-black">
              <FileText className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">This page is under construction</h2>
            <p className="text-slate-500 text-sm">
              Use the Admin Dashboard Page Builder to add text, pictures, graphics, links, and banners.
            </p>
          </div>
        )}
      </div>

      {/* Lightbox Modal for Gallery Images */}
      {activeLightboxImage && (
        <div
          onClick={() => setActiveLightboxImage(null)}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-pointer"
        >
          <div className="max-w-4xl max-h-[90vh] space-y-2 text-center" onClick={(e) => e.stopPropagation()}>
            <img
              src={activeLightboxImage.url}
              alt={activeLightboxImage.altText || 'Preview'}
              className="max-h-[80vh] w-auto max-w-full rounded-2xl mx-auto shadow-2xl"
            />
            {activeLightboxImage.caption && (
              <p className="text-white text-sm font-medium">{activeLightboxImage.caption}</p>
            )}
            <button
              onClick={() => setActiveLightboxImage(null)}
              className="px-4 py-1.5 rounded-full bg-white/20 text-white text-xs font-bold hover:bg-white/30"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
