import React, { useState } from 'react';
import {
  ArrowLeft,
  Save,
  Plus,
  Trash2,
  Copy,
  ChevronUp,
  ChevronDown,
  Eye,
  Edit3,
  Image as ImageIcon,
  Link,
  Layers,
  Sparkles,
  Smartphone,
  Tablet,
  Monitor,
  CheckCircle2,
  AlertTriangle,
  Upload,
  Globe,
  FileText,
  HelpCircle,
  FolderOpen,
  X,
  ExternalLink,
  Flame,
  ShieldCheck,
  Zap,
  MapPin,
  Users,
  Briefcase,
  HeartPulse,
  Heart
} from 'lucide-react';
import {
  CMSPage,
  CMSBlock,
  CMSBlockType,
  CMSButton,
  CMSCard,
  CMSAccordionItem,
  CMSLinkItem,
  NL_PHOTO_LIBRARY,
  GRAPHIC_STICKERS,
  CMSStore
} from '../../data/cmsStore';
import { CustomPageView } from './CustomPageView';

interface CMSPageEditorProps {
  page: CMSPage;
  onSave: (updatedPage: CMSPage) => void;
  onBack: () => void;
  onViewLive: (slug: string) => void;
}

export const CMSPageEditor: React.FC<CMSPageEditorProps> = ({
  page: initialPage,
  onSave,
  onBack,
  onViewLive
}) => {
  const [page, setPage] = useState<CMSPage>({ ...initialPage });
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isSavedSuccess, setIsSavedSuccess] = useState(false);
  const [activeImagePickerBlockId, setActiveImagePickerBlockId] = useState<string | null>(null);
  const [isPhotoLibraryOpen, setIsPhotoLibraryOpen] = useState(false);

  const handleSave = () => {
    CMSStore.savePage(page);
    onSave(page);
    setIsSavedSuccess(true);
    setTimeout(() => setIsSavedSuccess(false), 3000);
  };

  // Add block
  const handleAddBlock = (type: CMSBlockType) => {
    const newBlockId = `block_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
    let newBlock: CMSBlock = {
      id: newBlockId,
      type,
      bgColor: 'default',
      maxWidth: 'md'
    };

    switch (type) {
      case 'hero':
        newBlock = {
          ...newBlock,
          title: 'Hero Heading Title',
          subtitle: 'Write an engaging subtitle describing this initiative or announcement.',
          badgeText: 'Featured Program',
          bgColor: 'navy',
          imageUrl: NL_PHOTO_LIBRARY[0].url,
          buttons: [
            {
              id: `btn_${Date.now()}_1`,
              label: 'Get Started',
              url: '#',
              variant: 'gold',
              actionType: 'community_survey'
            }
          ]
        };
        break;
      case 'text':
        newBlock = {
          ...newBlock,
          title: 'Section Heading',
          subtitle: 'Optional section subtitle',
          content: 'Add your paragraph text here. You can explain your programs, share community stories, provide detailed instructions, or list key details.',
          textAlign: 'left'
        };
        break;
      case 'image':
        newBlock = {
          ...newBlock,
          imageUrl: NL_PHOTO_LIBRARY[1].url,
          imageAlt: 'Newfoundland community photo',
          imageCaption: 'Downtown St. John’s colorful Jellybean row houses',
          imageRadius: '2xl',
          imageBorder: true
        };
        break;
      case 'callout':
        newBlock = {
          ...newBlock,
          title: 'Important Community Notice',
          content: 'Highlight urgent information, funding deadlines, emergency warming centers, or critical contact details.',
          calloutType: 'gold',
          buttons: [
            {
              id: `btn_call_${Date.now()}`,
              label: 'Learn More',
              url: '#',
              variant: 'primary',
              actionType: 'url'
            }
          ]
        };
        break;
      case 'cards_grid':
        newBlock = {
          ...newBlock,
          title: 'Key Focus Areas',
          subtitle: 'Direct support pathways available across Newfoundland & Labrador',
          cardsColumns: 3,
          cards: [
            {
              id: `c_${Date.now()}_1`,
              title: 'Emergency Fuel & Warmth',
              description: 'Urgent assistance bridging provincial fuel subsidy lag times.',
              iconName: 'Flame',
              badge: 'Essential'
            },
            {
              id: `c_${Date.now()}_2`,
              title: 'Work Gear & PPE',
              description: 'Funding CSA boots so folks can accept employment immediately.',
              iconName: 'Briefcase',
              badge: 'Job Ready'
            },
            {
              id: `c_${Date.now()}_3`,
              title: 'Medical Co-pays',
              description: 'Covering essential prescription costs during coverage gaps.',
              iconName: 'HeartPulse',
              badge: 'Health'
            }
          ]
        };
        break;
      case 'quotes':
        newBlock = {
          ...newBlock,
          quoteText: 'Having someone in your corner who listens without judgment makes all the difference when you hit a roadblock.',
          quoteAuthor: 'Community Member',
          quoteRole: 'Avalon Peninsula',
          quoteLocation: "St. John's"
        };
        break;
      case 'stats':
        newBlock = {
          ...newBlock,
          statNumber: '100%',
          statLabel: 'Of Contributions Go Directly to Community Gaps',
          statNote: 'Zero administrative bloat. Complete financial transparency.'
        };
        break;
      case 'accordion':
        newBlock = {
          ...newBlock,
          title: 'Frequently Asked Questions',
          accordionItems: [
            {
              id: `faq_${Date.now()}_1`,
              question: 'Who can apply for gap assistance?',
              answer: 'Any individual, family, or frontline worker in Newfoundland & Labrador facing an urgent barrier not covered by existing programs.'
            },
            {
              id: `faq_${Date.now()}_2`,
              question: 'How quickly is support processed?',
              answer: 'We prioritize same-day and 24-hour turnaround for emergency heating, emergency food, and critical job-start gear.'
            }
          ]
        };
        break;
      case 'links_list':
        newBlock = {
          ...newBlock,
          title: 'Useful Helplines & Resources',
          linkItems: [
            {
              id: `l_${Date.now()}_1`,
              title: 'NL HealthLine (811)',
              description: 'Free, confidential 24/7 health and mental health advice from registered nurses.',
              url: 'tel:811',
              badge: '24/7 Helpline',
              iconName: 'PhoneCall'
            },
            {
              id: `l_${Date.now()}_2`,
              title: '211 Newfoundland & Labrador',
              description: 'Find local community, social, and government services across the province.',
              url: 'https://nl.211.ca',
              badge: 'Directory',
              iconName: 'Globe'
            }
          ]
        };
        break;
      case 'survey_trigger':
        newBlock = {
          ...newBlock,
          title: 'Have Your Say: Shape NL Gap Programs',
          surveyPrompt: 'Share your lived experience or frontline observations in our confidential survey.',
          surveyType: 'both'
        };
        break;
      case 'divider':
        newBlock = {
          ...newBlock,
          dividerStyle: 'gold_line'
        };
        break;
      case 'buttons':
        newBlock = {
          ...newBlock,
          textAlign: 'center',
          buttons: [
            {
              id: `btn_r_${Date.now()}_1`,
              label: 'Take Community Survey',
              url: '#',
              variant: 'gold',
              actionType: 'community_survey'
            },
            {
              id: `btn_r_${Date.now()}_2`,
              label: 'Make a Donation',
              url: '/#donate',
              variant: 'secondary',
              actionType: 'donate'
            }
          ]
        };
        break;
      case 'gallery':
        newBlock = {
          ...newBlock,
          title: 'Photo Gallery',
          galleryImages: [
            { id: 'g1', url: NL_PHOTO_LIBRARY[0].url, caption: "St. John's Coastline" },
            { id: 'g2', url: NL_PHOTO_LIBRARY[1].url, caption: 'Downtown Architecture' },
            { id: 'g3', url: NL_PHOTO_LIBRARY[4].url, caption: 'Atlantic Puffin' }
          ]
        };
        break;
      default:
        break;
    }

    setPage(prev => ({
      ...prev,
      blocks: [...prev.blocks, newBlock]
    }));
  };

  // Reorder blocks
  const moveBlock = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= page.blocks.length) return;
    const newBlocks = [...page.blocks];
    const temp = newBlocks[index];
    newBlocks[index] = newBlocks[targetIndex];
    newBlocks[targetIndex] = temp;
    setPage(prev => ({ ...prev, blocks: newBlocks }));
  };

  // Delete block
  const deleteBlock = (id: string) => {
    if (confirm('Delete this content block?')) {
      setPage(prev => ({ ...prev, blocks: prev.blocks.filter(b => b.id !== id) }));
    }
  };

  // Duplicate block
  const duplicateBlock = (block: CMSBlock) => {
    const cloned: CMSBlock = {
      ...JSON.parse(JSON.stringify(block)),
      id: `block_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`
    };
    const index = page.blocks.findIndex(b => b.id === block.id);
    const newBlocks = [...page.blocks];
    newBlocks.splice(index + 1, 0, cloned);
    setPage(prev => ({ ...prev, blocks: newBlocks }));
  };

  // Update block field
  const updateBlock = (id: string, updates: Partial<CMSBlock>) => {
    setPage(prev => ({
      ...prev,
      blocks: prev.blocks.map(b => (b.id === id ? { ...b, ...updates } : b))
    }));
  };

  // Image uploader helper (file to base64)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, blockId: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size limit (under 4MB)
    if (file.size > 4 * 1024 * 1024) {
      alert('Please upload an image smaller than 4MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      updateBlock(blockId, { imageUrl: dataUrl });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen bg-[#070a11] text-slate-100 flex flex-col selection:bg-amber-400 selection:text-slate-950">
      
      {/* Top Header Bar */}
      <header className="sticky top-0 z-40 bg-[#0B0F19] border-b border-slate-800 px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3 shadow-lg">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
            title="Back to Pages list"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/40">
                Visual Page Editor
              </span>
              <span className="text-xs text-slate-400 font-mono">/{page.slug}</span>
            </div>
            <h2 className="text-base sm:text-lg font-black text-white">{page.title}</h2>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Mode Switcher */}
          <div className="bg-slate-900 border border-slate-700 rounded-xl p-1 flex items-center gap-1">
            <button
              onClick={() => setActiveTab('editor')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'editor' ? 'bg-[#E5A93C] text-slate-950 font-black shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit</span>
            </button>
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'preview' ? 'bg-[#E5A93C] text-slate-950 font-black shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Preview</span>
            </button>
          </div>

          {/* View live link */}
          <button
            onClick={() => onViewLive(page.slug)}
            className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Open page in public site"
          >
            <ExternalLink className="w-3.5 h-3.5 text-stone-400" />
            <span className="hidden sm:inline">View Live</span>
          </button>

          {/* Save Button */}
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#E5A93C] via-[#F3BA4F] to-[#D4972B] hover:brightness-105 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg border border-amber-300 cursor-pointer flex items-center gap-1.5"
          >
            <Save className="w-3.5 h-3.5 text-slate-950" />
            <span>{isSavedSuccess ? 'Saved!' : 'Save Page'}</span>
          </button>
        </div>
      </header>

      {/* Page Configuration Bar (Settings) */}
      <div className="bg-[#0e1422] border-b border-slate-800/80 px-4 sm:px-6 py-3">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          
          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              Page Title
            </label>
            <input
              type="text"
              value={page.title}
              onChange={(e) => setPage({ ...page, title: e.target.value })}
              className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-white font-bold focus:outline-none focus:ring-1 focus:ring-amber-400"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              URL Slug (path)
            </label>
            <div className="flex items-center">
              <span className="px-2 py-1.5 bg-slate-800 border border-r-0 border-slate-700 rounded-l-lg text-slate-400 font-mono">
                /
              </span>
              <input
                type="text"
                value={page.slug}
                onChange={(e) =>
                  setPage({
                    ...page,
                    slug: e.target.value.toLowerCase().replace(/[^a-z0-9-_]/g, '')
                  })
                }
                className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-r-lg text-amber-300 font-mono font-bold focus:outline-none focus:ring-1 focus:ring-amber-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              Nav Bar Menu Label
            </label>
            <input
              type="text"
              value={page.navLabel}
              onChange={(e) => setPage({ ...page, navLabel: e.target.value.toUpperCase() })}
              placeholder="e.g. UPDATES"
              className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-white font-bold focus:outline-none focus:ring-1 focus:ring-amber-400"
            />
          </div>

          <div className="flex items-center gap-4 pt-4 sm:pt-0">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={page.isPublished}
                onChange={(e) => setPage({ ...page, isPublished: e.target.checked })}
                className="w-4 h-4 rounded text-amber-400 focus:ring-amber-400"
              />
              <span className={`font-bold ${page.isPublished ? 'text-emerald-400' : 'text-slate-400'}`}>
                {page.isPublished ? '● Published' : '○ Draft'}
              </span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={page.showInNav}
                onChange={(e) => setPage({ ...page, showInNav: e.target.checked })}
                className="w-4 h-4 rounded text-amber-400 focus:ring-amber-400"
              />
              <span className="text-slate-300 font-medium">Show in Top Nav</span>
            </label>
          </div>

        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {activeTab === 'preview' ? (
          /* PREVIEW MODE */
          <div className="flex-1 bg-slate-900 p-4 sm:p-8 flex flex-col items-center">
            {/* Device Switcher */}
            <div className="bg-[#0B0F19] border border-slate-800 rounded-2xl p-1.5 mb-6 flex items-center gap-2 shadow-lg">
              <button
                onClick={() => setPreviewDevice('desktop')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                  previewDevice === 'desktop' ? 'bg-[#E5A93C] text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Monitor className="w-4 h-4" />
                <span>Desktop (100%)</span>
              </button>
              <button
                onClick={() => setPreviewDevice('tablet')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                  previewDevice === 'tablet' ? 'bg-[#E5A93C] text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Tablet className="w-4 h-4" />
                <span>Tablet (768px)</span>
              </button>
              <button
                onClick={() => setPreviewDevice('mobile')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                  previewDevice === 'mobile' ? 'bg-[#E5A93C] text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Smartphone className="w-4 h-4" />
                <span>Mobile (390px)</span>
              </button>
            </div>

            {/* Simulated Frame */}
            <div
              className={`w-full bg-white rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-800 transition-all ${
                previewDevice === 'mobile'
                  ? 'max-w-[390px]'
                  : previewDevice === 'tablet'
                  ? 'max-w-[768px]'
                  : 'max-w-6xl'
              }`}
            >
              <CustomPageView
                page={page}
                onOpenCommunitySurvey={() => alert('Community Survey Modal will open on public site.')}
                onOpenProfessionalSurvey={() => alert('Professional Survey Modal will open on public site.')}
              />
            </div>
          </div>
        ) : (
          /* VISUAL BLOCK EDITOR MODE */
          <div className="max-w-5xl w-full mx-auto p-4 sm:p-6 space-y-6">
            
            {/* Add Block Palette */}
            <div className="bg-[#0e1422] rounded-3xl border border-slate-800 p-5 shadow-xl space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Plus className="w-4 h-4 text-amber-400" />
                  <h3 className="text-xs font-black uppercase tracking-wider text-white">
                    Add Content Block
                  </h3>
                </div>
                <span className="text-[11px] text-slate-400">Click any block to insert at bottom</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
                {[
                  { type: 'hero', label: 'Hero Banner', icon: Sparkles },
                  { type: 'text', label: 'Rich Text', icon: FileText },
                  { type: 'image', label: 'Picture / Photo', icon: ImageIcon },
                  { type: 'callout', label: 'Alert / Callout', icon: Flame },
                  { type: 'cards_grid', label: 'Feature Cards', icon: Layers },
                  { type: 'quotes', label: 'Quote / Story', icon: Heart },
                  { type: 'stats', label: 'Big Stat', icon: CheckCircle2 },
                  { type: 'accordion', label: 'FAQ Accordion', icon: HelpCircle },
                  { type: 'links_list', label: 'Resource Links', icon: Link },
                  { type: 'buttons', label: 'Action Buttons', icon: Globe },
                  { type: 'gallery', label: 'Photo Grid', icon: FolderOpen },
                  { type: 'survey_trigger', label: 'Survey Card', icon: Users },
                  { type: 'divider', label: 'Divider', icon: Sparkles }
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.type}
                      onClick={() => handleAddBlock(item.type as CMSBlockType)}
                      className="p-3 rounded-2xl bg-slate-900/90 border border-slate-700/80 hover:border-amber-400 hover:bg-slate-800 transition-all text-center flex flex-col items-center gap-1.5 cursor-pointer group shadow-sm"
                    >
                      <div className="w-8 h-8 rounded-xl bg-slate-800 text-amber-400 group-hover:bg-amber-400 group-hover:text-slate-950 transition-colors flex items-center justify-center">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-[11px] font-bold text-slate-300 group-hover:text-white">
                        {item.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* List of Existing Blocks */}
            <div className="space-y-4">
              {page.blocks.length === 0 ? (
                <div className="text-center py-16 bg-[#0e1422] rounded-3xl border border-dashed border-slate-800 text-slate-500 space-y-3">
                  <FolderOpen className="w-10 h-10 mx-auto text-slate-600" />
                  <p className="text-sm font-bold">No blocks on this page yet.</p>
                  <p className="text-xs">Click one of the buttons above to add your first content section.</p>
                </div>
              ) : (
                page.blocks.map((block, index) => (
                  <div
                    key={block.id}
                    className="bg-[#0e1422] rounded-3xl border border-slate-800 shadow-xl overflow-hidden transition-all"
                  >
                    {/* Block Toolbar Header */}
                    <div className="bg-slate-900/90 border-b border-slate-800 px-4 py-2.5 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <span className="w-6 h-6 rounded-lg bg-amber-400/20 text-amber-400 font-bold text-xs flex items-center justify-center">
                          {index + 1}
                        </span>
                        <span className="text-xs font-black uppercase tracking-wider text-slate-200">
                          {block.type.replace('_', ' ')}
                        </span>
                      </div>

                      {/* Controls: Up, Down, Duplicate, Delete, Background */}
                      <div className="flex items-center gap-1">
                        {/* Background Color Picker */}
                        <select
                          value={block.bgColor || 'default'}
                          onChange={(e) => updateBlock(block.id, { bgColor: e.target.value as any })}
                          className="px-2 py-1 bg-slate-800 border border-slate-700 rounded-lg text-[11px] font-bold text-slate-300 focus:outline-none"
                        >
                          <option value="default">Bg: Default</option>
                          <option value="white">Bg: White</option>
                          <option value="slate">Bg: Dark Slate</option>
                          <option value="navy">Bg: Deep Navy</option>
                          <option value="amber">Bg: Soft Amber</option>
                          <option value="light_gray">Bg: Light Gray</option>
                        </select>

                        <button
                          onClick={() => moveBlock(index, 'up')}
                          disabled={index === 0}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-slate-300 transition-colors"
                          title="Move Up"
                        >
                          <ChevronUp className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => moveBlock(index, 'down')}
                          disabled={index === page.blocks.length - 1}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-slate-300 transition-colors"
                          title="Move Down"
                        >
                          <ChevronDown className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => duplicateBlock(block)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                          title="Duplicate Block"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => deleteBlock(block.id)}
                          className="p-1.5 rounded-lg bg-red-950/60 hover:bg-red-900 text-red-300 transition-colors"
                          title="Delete Block"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Block Fields Form */}
                    <div className="p-4 sm:p-6 space-y-4 text-xs">
                      
                      {/* HERO BLOCK FORM */}
                      {block.type === 'hero' && (
                        <div className="space-y-3">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[11px] font-bold text-slate-400 mb-1">
                                Main Title
                              </label>
                              <input
                                type="text"
                                value={block.title || ''}
                                onChange={(e) => updateBlock(block.id, { title: e.target.value })}
                                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white font-bold"
                              />
                            </div>
                            <div>
                              <label className="block text-[11px] font-bold text-slate-400 mb-1">
                                Badge / Tagline
                              </label>
                              <input
                                type="text"
                                value={block.badgeText || ''}
                                onChange={(e) => updateBlock(block.id, { badgeText: e.target.value })}
                                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-amber-300 font-bold"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-slate-400 mb-1">
                              Subtitle / Summary
                            </label>
                            <textarea
                              rows={2}
                              value={block.subtitle || ''}
                              onChange={(e) => updateBlock(block.id, { subtitle: e.target.value })}
                              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white"
                            />
                          </div>

                          {/* Hero Background Image */}
                          <div>
                            <label className="block text-[11px] font-bold text-slate-400 mb-1">
                              Background Picture
                            </label>
                            <div className="flex gap-2">
                              <input
                                type="text"
                                value={block.imageUrl || ''}
                                onChange={(e) => updateBlock(block.id, { imageUrl: e.target.value })}
                                placeholder="Paste image URL..."
                                className="flex-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs font-mono"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  setActiveImagePickerBlockId(block.id);
                                  setIsPhotoLibraryOpen(true);
                                }}
                                className="px-3 py-2 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1 shrink-0"
                              >
                                <FolderOpen className="w-3.5 h-3.5" />
                                <span>Choose Photo</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* TEXT BLOCK FORM */}
                      {block.type === 'text' && (
                        <div className="space-y-3">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[11px] font-bold text-slate-400 mb-1">
                                Section Heading
                              </label>
                              <input
                                type="text"
                                value={block.title || ''}
                                onChange={(e) => updateBlock(block.id, { title: e.target.value })}
                                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white font-bold"
                              />
                            </div>
                            <div>
                              <label className="block text-[11px] font-bold text-slate-400 mb-1">
                                Subtitle
                              </label>
                              <input
                                type="text"
                                value={block.subtitle || ''}
                                onChange={(e) => updateBlock(block.id, { subtitle: e.target.value })}
                                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-slate-300"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-slate-400 mb-1">
                              Body Text Content
                            </label>
                            <textarea
                              rows={5}
                              value={block.content || ''}
                              onChange={(e) => updateBlock(block.id, { content: e.target.value })}
                              placeholder="Write your text here..."
                              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white font-sans text-xs leading-relaxed"
                            />
                          </div>
                        </div>
                      )}

                      {/* IMAGE BLOCK FORM */}
                      {block.type === 'image' && (
                        <div className="space-y-3">
                          <div>
                            <label className="block text-[11px] font-bold text-slate-400 mb-1">
                              Picture Image URL or Upload
                            </label>
                            <div className="flex flex-wrap gap-2">
                              <input
                                type="text"
                                value={block.imageUrl || ''}
                                onChange={(e) => updateBlock(block.id, { imageUrl: e.target.value })}
                                placeholder="https://..."
                                className="flex-1 min-w-[200px] px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs font-mono"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  setActiveImagePickerBlockId(block.id);
                                  setIsPhotoLibraryOpen(true);
                                }}
                                className="px-3 py-2 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1 shrink-0"
                              >
                                <FolderOpen className="w-3.5 h-3.5" />
                                <span>NL Library</span>
                              </button>
                              <label className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-bold text-xs flex items-center gap-1 cursor-pointer shrink-0">
                                <Upload className="w-3.5 h-3.5 text-amber-400" />
                                <span>Upload File</span>
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={(e) => handleFileUpload(e, block.id)}
                                />
                              </label>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[11px] font-bold text-slate-400 mb-1">
                                Caption text
                              </label>
                              <input
                                type="text"
                                value={block.imageCaption || ''}
                                onChange={(e) => updateBlock(block.id, { imageCaption: e.target.value })}
                                placeholder="Caption shown below picture..."
                                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white"
                              />
                            </div>
                            <div>
                              <label className="block text-[11px] font-bold text-slate-400 mb-1">
                                Alt description
                              </label>
                              <input
                                type="text"
                                value={block.imageAlt || ''}
                                onChange={(e) => updateBlock(block.id, { imageAlt: e.target.value })}
                                placeholder="Image description..."
                                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white"
                              />
                            </div>
                          </div>

                          {block.imageUrl && (
                            <div className="pt-2">
                              <p className="text-[10px] text-slate-400 mb-1 font-bold">Image Preview:</p>
                              <img
                                src={block.imageUrl}
                                alt="Preview"
                                className="max-h-40 rounded-xl object-cover border border-slate-700"
                              />
                            </div>
                          )}
                        </div>
                      )}

                      {/* CALLOUT / ALERT BLOCK FORM */}
                      {block.type === 'callout' && (
                        <div className="space-y-3">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[11px] font-bold text-slate-400 mb-1">
                                Callout Title
                              </label>
                              <input
                                type="text"
                                value={block.title || ''}
                                onChange={(e) => updateBlock(block.id, { title: e.target.value })}
                                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white font-bold"
                              />
                            </div>
                            <div>
                              <label className="block text-[11px] font-bold text-slate-400 mb-1">
                                Style / Severity
                              </label>
                              <select
                                value={block.calloutType || 'gold'}
                                onChange={(e) => updateBlock(block.id, { calloutType: e.target.value as any })}
                                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white font-bold"
                              >
                                <option value="gold">Golden Highlight</option>
                                <option value="urgent">Urgent / Red Alert</option>
                                <option value="success">Success / Green</option>
                                <option value="info">Info / Slate</option>
                              </select>
                            </div>
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-slate-400 mb-1">
                              Notice Message
                            </label>
                            <textarea
                              rows={3}
                              value={block.content || ''}
                              onChange={(e) => updateBlock(block.id, { content: e.target.value })}
                              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white"
                            />
                          </div>
                        </div>
                      )}

                      {/* CARDS GRID FORM */}
                      {block.type === 'cards_grid' && (
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div>
                              <label className="block text-[11px] font-bold text-slate-400 mb-1">
                                Section Title
                              </label>
                              <input
                                type="text"
                                value={block.title || ''}
                                onChange={(e) => updateBlock(block.id, { title: e.target.value })}
                                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white font-bold"
                              />
                            </div>
                            <div>
                              <label className="block text-[11px] font-bold text-slate-400 mb-1">
                                Section Subtitle
                              </label>
                              <input
                                type="text"
                                value={block.subtitle || ''}
                                onChange={(e) => updateBlock(block.id, { subtitle: e.target.value })}
                                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white"
                              />
                            </div>
                            <div>
                              <label className="block text-[11px] font-bold text-slate-400 mb-1">
                                Column Layout
                              </label>
                              <select
                                value={block.cardsColumns || 3}
                                onChange={(e) => updateBlock(block.id, { cardsColumns: parseInt(e.target.value) as any })}
                                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white font-bold"
                              >
                                <option value={2}>2 Columns</option>
                                <option value={3}>3 Columns</option>
                                <option value={4}>4 Columns</option>
                              </select>
                            </div>
                          </div>

                          {/* Individual Cards */}
                          <div className="space-y-3 pt-2">
                            <div className="flex items-center justify-between">
                              <p className="text-[11px] font-black uppercase text-amber-400">Cards List</p>
                              <button
                                type="button"
                                onClick={() => {
                                  const newCard: CMSCard = {
                                    id: `c_${Date.now()}`,
                                    title: 'New Card',
                                    description: 'Description of this card...',
                                    iconName: 'Flame',
                                    badge: 'New'
                                  };
                                  updateBlock(block.id, { cards: [...(block.cards || []), newCard] });
                                }}
                                className="px-2.5 py-1 rounded-lg bg-amber-400 text-slate-950 font-black text-xs flex items-center gap-1"
                              >
                                <Plus className="w-3 h-3" />
                                <span>Add Card</span>
                              </button>
                            </div>

                            {block.cards?.map((card, cIndex) => (
                              <div
                                key={card.id}
                                className="bg-slate-900 p-3 rounded-2xl border border-slate-700 space-y-2"
                              >
                                <div className="flex items-center justify-between gap-2">
                                  <span className="text-[11px] font-bold text-slate-400">Card #{cIndex + 1}</span>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      updateBlock(block.id, {
                                        cards: block.cards?.filter(c => c.id !== card.id)
                                      });
                                    }}
                                    className="text-red-400 hover:text-red-300 p-1"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                                  <input
                                    type="text"
                                    placeholder="Card title"
                                    value={card.title}
                                    onChange={(e) => {
                                      const updatedCards = block.cards?.map(c =>
                                        c.id === card.id ? { ...c, title: e.target.value } : c
                                      );
                                      updateBlock(block.id, { cards: updatedCards });
                                    }}
                                    className="px-2.5 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-white font-bold"
                                  />
                                  <input
                                    type="text"
                                    placeholder="Badge text"
                                    value={card.badge || ''}
                                    onChange={(e) => {
                                      const updatedCards = block.cards?.map(c =>
                                        c.id === card.id ? { ...c, badge: e.target.value } : c
                                      );
                                      updateBlock(block.id, { cards: updatedCards });
                                    }}
                                    className="px-2.5 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-amber-300"
                                  />
                                  <select
                                    value={card.iconName || 'Flame'}
                                    onChange={(e) => {
                                      const updatedCards = block.cards?.map(c =>
                                        c.id === card.id ? { ...c, iconName: e.target.value } : c
                                      );
                                      updateBlock(block.id, { cards: updatedCards });
                                    }}
                                    className="px-2.5 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-white"
                                  >
                                    <option value="Flame">Icon: Flame (Heat/Fuel)</option>
                                    <option value="Briefcase">Icon: Briefcase (Work)</option>
                                    <option value="HeartPulse">Icon: HeartPulse (Health)</option>
                                    <option value="Home">Icon: Home (Shelter)</option>
                                    <option value="Users">Icon: Users (Community)</option>
                                    <option value="ShieldCheck">Icon: Shield (Protection)</option>
                                    <option value="PhoneCall">Icon: Phone (Call)</option>
                                  </select>
                                </div>

                                <textarea
                                  rows={2}
                                  placeholder="Card description..."
                                  value={card.description}
                                  onChange={(e) => {
                                    const updatedCards = block.cards?.map(c =>
                                      c.id === card.id ? { ...c, description: e.target.value } : c
                                    );
                                    updateBlock(block.id, { cards: updatedCards });
                                  }}
                                  className="w-full px-2.5 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-white text-xs"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* FAQ ACCORDION FORM */}
                      {block.type === 'accordion' && (
                        <div className="space-y-3">
                          <div>
                            <label className="block text-[11px] font-bold text-slate-400 mb-1">
                              Section Title
                            </label>
                            <input
                              type="text"
                              value={block.title || ''}
                              onChange={(e) => updateBlock(block.id, { title: e.target.value })}
                              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white font-bold"
                            />
                          </div>

                          <div className="space-y-2 pt-2">
                            <div className="flex items-center justify-between">
                              <p className="text-[11px] font-black uppercase text-amber-400">Questions & Answers</p>
                              <button
                                type="button"
                                onClick={() => {
                                  const newItem: CMSAccordionItem = {
                                    id: `faq_${Date.now()}`,
                                    question: 'New Question?',
                                    answer: 'Answer to the question goes here.'
                                  };
                                  updateBlock(block.id, { accordionItems: [...(block.accordionItems || []), newItem] });
                                }}
                                className="px-2.5 py-1 rounded-lg bg-amber-400 text-slate-950 font-black text-xs flex items-center gap-1"
                              >
                                <Plus className="w-3 h-3" />
                                <span>Add Q&A</span>
                              </button>
                            </div>

                            {block.accordionItems?.map((item) => (
                              <div key={item.id} className="bg-slate-900 p-3 rounded-2xl border border-slate-700 space-y-2">
                                <div className="flex items-center justify-between gap-2">
                                  <input
                                    type="text"
                                    placeholder="Question..."
                                    value={item.question}
                                    onChange={(e) => {
                                      const updated = block.accordionItems?.map(q =>
                                        q.id === item.id ? { ...q, question: e.target.value } : q
                                      );
                                      updateBlock(block.id, { accordionItems: updated });
                                    }}
                                    className="flex-1 px-2.5 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-white font-bold"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => {
                                      updateBlock(block.id, {
                                        accordionItems: block.accordionItems?.filter(q => q.id !== item.id)
                                      });
                                    }}
                                    className="text-red-400 hover:text-red-300 p-1"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                                <textarea
                                  rows={2}
                                  placeholder="Answer..."
                                  value={item.answer}
                                  onChange={(e) => {
                                    const updated = block.accordionItems?.map(q =>
                                      q.id === item.id ? { ...q, answer: e.target.value } : q
                                    );
                                    updateBlock(block.id, { accordionItems: updated });
                                  }}
                                  className="w-full px-2.5 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-white text-xs"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* QUOTE / STORY FORM */}
                      {block.type === 'quotes' && (
                        <div className="space-y-3">
                          <div>
                            <label className="block text-[11px] font-bold text-slate-400 mb-1">
                              Quote Text
                            </label>
                            <textarea
                              rows={3}
                              value={block.quoteText || ''}
                              onChange={(e) => updateBlock(block.id, { quoteText: e.target.value })}
                              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white font-serif italic text-sm"
                            />
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div>
                              <label className="block text-[11px] font-bold text-slate-400 mb-1">
                                Author Name
                              </label>
                              <input
                                type="text"
                                value={block.quoteAuthor || ''}
                                onChange={(e) => updateBlock(block.id, { quoteAuthor: e.target.value })}
                                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white font-bold"
                              />
                            </div>
                            <div>
                              <label className="block text-[11px] font-bold text-slate-400 mb-1">
                                Role / Title
                              </label>
                              <input
                                type="text"
                                value={block.quoteRole || ''}
                                onChange={(e) => updateBlock(block.id, { quoteRole: e.target.value })}
                                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-amber-300"
                              />
                            </div>
                            <div>
                              <label className="block text-[11px] font-bold text-slate-400 mb-1">
                                Town / Location
                              </label>
                              <input
                                type="text"
                                value={block.quoteLocation || ''}
                                onChange={(e) => updateBlock(block.id, { quoteLocation: e.target.value })}
                                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-slate-300"
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* STAT COUNTER FORM */}
                      {block.type === 'stats' && (
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div>
                            <label className="block text-[11px] font-bold text-slate-400 mb-1">
                              Big Number / Stat
                            </label>
                            <input
                              type="text"
                              value={block.statNumber || ''}
                              onChange={(e) => updateBlock(block.id, { statNumber: e.target.value })}
                              placeholder="e.g. 100% or $12,450"
                              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-amber-400 font-black text-base"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-bold text-slate-400 mb-1">
                              Stat Label
                            </label>
                            <input
                              type="text"
                              value={block.statLabel || ''}
                              onChange={(e) => updateBlock(block.id, { statLabel: e.target.value })}
                              placeholder="e.g. Direct Support"
                              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white font-bold"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-bold text-slate-400 mb-1">
                              Footnote / Detail
                            </label>
                            <input
                              type="text"
                              value={block.statNote || ''}
                              onChange={(e) => updateBlock(block.id, { statNote: e.target.value })}
                              placeholder="e.g. Complete transparency"
                              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-slate-400"
                            />
                          </div>
                        </div>
                      )}

                    </div>
                  </div>
                ))
              )}
            </div>

          </div>
        )}
      </div>

      {/* Newfoundland Curated Photo Library Modal */}
      {isPhotoLibraryOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0e1422] border-2 border-amber-400/60 rounded-3xl max-w-4xl w-full max-h-[85vh] flex flex-col overflow-hidden shadow-2xl">
            
            <div className="p-4 sm:p-6 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-black text-white">
                  Curated Newfoundland & Atlantic Photo Library
                </h3>
                <p className="text-xs text-slate-400">
                  Click any photo to insert it directly into your page.
                </p>
              </div>
              <button
                onClick={() => setIsPhotoLibraryOpen(false)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 sm:p-6 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {NL_PHOTO_LIBRARY.map((photo) => (
                <div
                  key={photo.id}
                  onClick={() => {
                    if (activeImagePickerBlockId) {
                      updateBlock(activeImagePickerBlockId, {
                        imageUrl: photo.url,
                        imageAlt: photo.alt,
                        imageCaption: photo.title
                      });
                    }
                    setIsPhotoLibraryOpen(false);
                  }}
                  className="group rounded-2xl overflow-hidden border border-slate-700 hover:border-amber-400 bg-slate-900 cursor-pointer shadow-md transition-all flex flex-col"
                >
                  <div className="aspect-16/10 overflow-hidden">
                    <img
                      src={photo.url}
                      alt={photo.alt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-3 space-y-1 bg-slate-900 flex-1">
                    <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                      {photo.category}
                    </span>
                    <h4 className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors">
                      {photo.title}
                    </h4>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-slate-800 bg-[#0B0F19] text-right">
              <button
                onClick={() => setIsPhotoLibraryOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-white text-xs font-bold"
              >
                Cancel
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
