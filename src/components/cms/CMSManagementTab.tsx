import React, { useState, useEffect } from 'react';
import {
  FileText,
  Plus,
  Edit3,
  Trash2,
  Copy,
  ExternalLink,
  Eye,
  EyeOff,
  Image as ImageIcon,
  Sparkles,
  Megaphone,
  CheckCircle2,
  FolderOpen,
  Upload,
  Globe,
  Layers,
  ArrowRight,
  ShieldCheck,
  Zap,
  Flame,
  Save,
  Link as LinkIcon
} from 'lucide-react';
import {
  CMSStore,
  CMSPage,
  CMSAnnouncement,
  NL_PHOTO_LIBRARY,
  GRAPHIC_STICKERS
} from '../../data/cmsStore';
import { CMSPageEditor } from './CMSPageEditor';

interface CMSManagementTabProps {
  onViewLivePage: (slug: string) => void;
}

export const CMSManagementTab: React.FC<CMSManagementTabProps> = ({ onViewLivePage }) => {
  const [pages, setPages] = useState<CMSPage[]>([]);
  const [editingPageId, setEditingPageId] = useState<string | null>(null);
  const [isCreatingPage, setIsCreatingPage] = useState(false);
  const [newPageTitle, setNewPageTitle] = useState('');
  const [newPageSlug, setNewPageSlug] = useState('');
  
  // Announcement banner state
  const [announcement, setAnnouncement] = useState<CMSAnnouncement>(CMSStore.getAnnouncement());
  const [announcementSaved, setAnnouncementSaved] = useState(false);

  // Active sub-tab
  const [activeSubTab, setActiveSubTab] = useState<'pages' | 'announcements' | 'media' | 'graphics'>('pages');

  // Copy URL notification
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  const refreshPages = () => {
    setPages(CMSStore.getPages());
    setAnnouncement(CMSStore.getAnnouncement());
  };

  useEffect(() => {
    refreshPages();
  }, []);

  const handleCreatePage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPageTitle.trim()) return;

    const newPage = CMSStore.createNewPage(newPageTitle, newPageSlug);
    setNewPageTitle('');
    setNewPageSlug('');
    setIsCreatingPage(false);
    refreshPages();
    // Open editor immediately
    setEditingPageId(newPage.id);
  };

  const handleDeletePage = (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete the page "${title}"?`)) {
      CMSStore.deletePage(id);
      refreshPages();
    }
  };

  const handleDuplicatePage = (id: string) => {
    CMSStore.duplicatePage(id);
    refreshPages();
  };

  const handleTogglePublish = (page: CMSPage) => {
    CMSStore.savePage({
      ...page,
      isPublished: !page.isPublished
    });
    refreshPages();
  };

  const handleToggleNav = (page: CMSPage) => {
    CMSStore.savePage({
      ...page,
      showInNav: !page.showInNav
    });
    refreshPages();
  };

  const handleSaveAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    CMSStore.saveAnnouncement(announcement);
    setAnnouncementSaved(true);
    setTimeout(() => setAnnouncementSaved(false), 3000);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedUrl(text);
    setTimeout(() => setCopiedUrl(null), 2500);
  };

  // If user is actively editing a page, show the Visual Page Editor fullscreen
  if (editingPageId) {
    const pageToEdit = CMSStore.getPageById(editingPageId);
    if (pageToEdit) {
      return (
        <CMSPageEditor
          page={pageToEdit}
          onSave={() => {
            refreshPages();
          }}
          onBack={() => {
            setEditingPageId(null);
            refreshPages();
          }}
          onViewLive={(slug) => {
            onViewLivePage(slug);
          }}
        />
      );
    }
  }

  return (
    <div className="space-y-6">
      
      {/* Sub navigation bar for CMS */}
      <div className="bg-[#0e1422] border border-slate-800 rounded-2xl p-2 flex flex-wrap items-center justify-between gap-3 shadow-lg">
        <div className="flex items-center gap-1 sm:gap-2">
          {[
            { id: 'pages', label: `Custom Pages (${pages.length})`, icon: FileText },
            { id: 'announcements', label: 'Site Announcement Banner', icon: Megaphone },
            { id: 'media', label: 'NL Photo Library', icon: ImageIcon },
            { id: 'graphics', label: 'Graphic Badges & Stickers', icon: Sparkles },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id as any)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#E5A93C] text-slate-950 font-black shadow-md border border-amber-300'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-slate-950' : 'text-stone-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {activeSubTab === 'pages' && (
          <button
            onClick={() => setIsCreatingPage(true)}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:brightness-105 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md border border-amber-300 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Page</span>
          </button>
        )}
      </div>

      {/* SUB-TAB 1: PAGES MANAGER */}
      {activeSubTab === 'pages' && (
        <div className="space-y-4">
          
          {/* Create Page Modal/Form */}
          {isCreatingPage && (
            <div className="bg-[#0e1422] border-2 border-amber-400/80 rounded-3xl p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-black text-white flex items-center gap-2">
                  <Plus className="w-5 h-5 text-amber-400" />
                  <span>Create a New Custom Page</span>
                </h3>
                <button
                  onClick={() => setIsCreatingPage(false)}
                  className="text-slate-400 hover:text-white text-xs font-bold"
                >
                  Cancel
                </button>
              </div>

              <form onSubmit={handleCreatePage} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    Page Title
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Volunteer Spotlight or Winter Housing Guide"
                    value={newPageTitle}
                    onChange={(e) => {
                      setNewPageTitle(e.target.value);
                      if (!newPageSlug) {
                        setNewPageSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
                      }
                    }}
                    className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                    autoFocus
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    URL Slug
                  </label>
                  <div className="flex items-center">
                    <span className="px-3 py-2.5 bg-slate-800 border border-r-0 border-slate-700 rounded-l-xl text-slate-400 text-sm font-mono">
                      /
                    </span>
                    <input
                      type="text"
                      placeholder="e.g. volunteer-spotlight"
                      value={newPageSlug}
                      onChange={(e) => setNewPageSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-_]/g, ''))}
                      className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-r-xl text-amber-300 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2 flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsCreatingPage(false)}
                    className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg border border-amber-300"
                  >
                    Create & Open Editor
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Pages Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pages.map((p) => (
              <div
                key={p.id}
                className="bg-[#0e1422] rounded-3xl border border-slate-800 p-5 shadow-xl hover:border-slate-700 transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-2.5 h-2.5 rounded-full ${
                          p.isPublished ? 'bg-emerald-400 shadow-sm shadow-emerald-500/50' : 'bg-slate-500'
                        }`}
                      />
                      <span className="text-xs font-mono text-amber-400 font-bold">
                        /{p.slug}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleTogglePublish(p)}
                        className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider border cursor-pointer ${
                          p.isPublished
                            ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/50'
                            : 'bg-slate-900 text-slate-400 border-slate-700'
                        }`}
                      >
                        {p.isPublished ? 'Live' : 'Draft'}
                      </button>

                      <button
                        onClick={() => handleToggleNav(p)}
                        className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border cursor-pointer ${
                          p.showInNav
                            ? 'bg-amber-950/60 text-amber-300 border-amber-500/50'
                            : 'bg-slate-900 text-slate-500 border-slate-800'
                        }`}
                        title="Show/hide in top website navigation menu"
                      >
                        {p.showInNav ? 'In Nav Menu' : 'Hidden from Nav'}
                      </button>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-base font-black text-white">{p.title}</h4>
                    <p className="text-xs text-slate-400 line-clamp-2 pt-1">
                      {p.metaDescription || `${p.blocks?.length || 0} custom visual blocks configured.`}
                    </p>
                  </div>
                </div>

                {/* Card Actions Footer */}
                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleDuplicatePage(p.id)}
                      className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
                      title="Duplicate this page"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeletePage(p.id, p.title)}
                      className="p-2 rounded-xl bg-red-950/60 hover:bg-red-900 text-red-300 transition-colors cursor-pointer"
                      title="Delete page"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onViewLivePage(p.slug)}
                      className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
                      title="View live in public website"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    onClick={() => setEditingPageId(p.id)}
                    className="px-4 py-2 rounded-xl bg-[#E5A93C] hover:brightness-105 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-slate-950" />
                    <span>Edit Page Content</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* SUB-TAB 2: SITE ANNOUNCEMENT BANNER */}
      {activeSubTab === 'announcements' && (
        <div className="bg-[#0e1422] rounded-3xl border border-slate-800 p-6 sm:p-8 shadow-xl space-y-6 max-w-3xl mx-auto">
          <div className="space-y-1">
            <h3 className="text-lg font-black text-white flex items-center gap-2">
              <Megaphone className="w-5 h-5 text-amber-400" />
              <span>Global Website Announcement Banner</span>
            </h3>
            <p className="text-xs text-slate-400">
              Displays a prominent alert banner at the very top of all pages across your website.
            </p>
          </div>

          <form onSubmit={handleSaveAnnouncement} className="space-y-4">
            
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-white">Enable Announcement Banner</p>
                <p className="text-xs text-slate-400">Make visible to all public website visitors</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={announcement.isEnabled}
                  onChange={(e) => setAnnouncement({ ...announcement, isEnabled: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-400"></div>
              </label>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Banner Message Text
              </label>
              <textarea
                rows={2}
                required
                value={announcement.text}
                onChange={(e) => setAnnouncement({ ...announcement, text: e.target.value })}
                placeholder="e.g. 📢 Winter Heating & Essential Gap Applications are now open."
                className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Button Action Text (Optional)
                </label>
                <input
                  type="text"
                  value={announcement.linkText || ''}
                  onChange={(e) => setAnnouncement({ ...announcement, linkText: e.target.value })}
                  placeholder="e.g. Take Survey or Read Notice"
                  className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Button Link Target (URL or #survey)
                </label>
                <input
                  type="text"
                  value={announcement.linkUrl || ''}
                  onChange={(e) => setAnnouncement({ ...announcement, linkUrl: e.target.value })}
                  placeholder="e.g. #survey or /updates"
                  className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Banner Color Theme
              </label>
              <select
                value={announcement.variant}
                onChange={(e) => setAnnouncement({ ...announcement, variant: e.target.value as any })}
                className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs font-bold"
              >
                <option value="gold">Golden Amber (Warm & Friendly)</option>
                <option value="blue">Deep Blue (Informational Notice)</option>
                <option value="red">Red Alert (Urgent Emergency Need)</option>
                <option value="green">Green (Success / Funding Grant Announcement)</option>
              </select>
            </div>

            {/* Live Preview of the Banner */}
            <div className="pt-2">
              <p className="text-[11px] font-bold uppercase text-slate-400 mb-2">Live Banner Preview:</p>
              <div
                className={`p-3 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-between gap-3 shadow-md ${
                  announcement.variant === 'gold'
                    ? 'bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-slate-950'
                    : announcement.variant === 'red'
                    ? 'bg-red-600 text-white'
                    : announcement.variant === 'green'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-blue-600 text-white'
                }`}
              >
                <span>{announcement.text || 'Announcement text preview'}</span>
                {announcement.linkText && (
                  <span className="px-3 py-1 rounded-lg bg-black/20 text-xs font-black uppercase tracking-wider shrink-0">
                    {announcement.linkText} →
                  </span>
                )}
              </div>
            </div>

            <div className="pt-2 text-right">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg border border-amber-300 cursor-pointer"
              >
                {announcementSaved ? 'Banner Saved & Live!' : 'Save Announcement'}
              </button>
            </div>

          </form>
        </div>
      )}

      {/* SUB-TAB 3: CURATED NL PHOTO LIBRARY */}
      {activeSubTab === 'media' && (
        <div className="space-y-4">
          <div className="bg-[#0e1422] p-5 rounded-3xl border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-black text-white">
                Newfoundland & Atlantic Photo Library
              </h3>
              <p className="text-xs text-slate-400">
                High-resolution images ready to use on any custom page or hero banner.
              </p>
            </div>
            {copiedUrl && (
              <span className="px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500 text-xs font-bold">
                ✓ Image URL Copied to Clipboard!
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {NL_PHOTO_LIBRARY.map((photo) => (
              <div
                key={photo.id}
                className="bg-[#0e1422] rounded-3xl border border-slate-800 overflow-hidden shadow-xl hover:border-amber-400/60 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-16/10 overflow-hidden bg-slate-900">
                    <img
                      src={photo.url}
                      alt={photo.alt}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                      {photo.category}
                    </span>
                    <h4 className="text-sm font-bold text-white">{photo.title}</h4>
                    <p className="text-xs text-slate-400">{photo.alt}</p>
                  </div>
                </div>

                <div className="p-4 pt-0">
                  <button
                    onClick={() => handleCopy(photo.url)}
                    className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <LinkIcon className="w-3.5 h-3.5 text-amber-400" />
                    <span>Copy Image URL</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 4: GRAPHIC BADGES & STICKERS */}
      {activeSubTab === 'graphics' && (
        <div className="space-y-4">
          <div className="bg-[#0e1422] p-5 rounded-3xl border border-slate-800">
            <h3 className="text-base font-black text-white">
              Visual Badges, Icons & Decorative Accents
            </h3>
            <p className="text-xs text-slate-400">
              Pre-styled graphical stamps and badges you can use in cards, heroes, and announcements.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {GRAPHIC_STICKERS.map((badge) => (
              <div
                key={badge.id}
                className="bg-[#0e1422] p-5 rounded-3xl border border-slate-800 flex items-center gap-3.5 shadow-lg"
              >
                <div className="w-12 h-12 rounded-2xl bg-amber-400/20 text-amber-400 border border-amber-400/40 flex items-center justify-center font-black">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-white">{badge.label}</h4>
                  <p className="text-xs text-slate-400">Available in Card Grids</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
