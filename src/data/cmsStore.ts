// CMS Store: Content Management System for Fill the Gap NL
// Allows creating/editing pages, adding links, pictures, graphics, banners, and custom blocks without AI

export type CMSBlockType =
  | 'hero'
  | 'text'
  | 'image'
  | 'gallery'
  | 'callout'
  | 'buttons'
  | 'cards_grid'
  | 'quotes'
  | 'stats'
  | 'accordion'
  | 'links_list'
  | 'divider'
  | 'survey_trigger'
  | 'custom_html';

export interface CMSButton {
  id: string;
  label: string;
  url: string;
  variant: 'gold' | 'primary' | 'secondary' | 'outline' | 'red';
  actionType: 'url' | 'community_survey' | 'professional_survey' | 'donate' | 'contact' | 'tel' | 'mailto';
  openInNewTab?: boolean;
  iconName?: string;
}

export interface CMSCard {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  iconName?: string;
  badge?: string;
  imageUrl?: string;
  linkUrl?: string;
  linkText?: string;
}

export interface CMSAccordionItem {
  id: string;
  question: string;
  answer: string;
}

export interface CMSLinkItem {
  id: string;
  title: string;
  description?: string;
  url: string;
  iconName?: string;
  badge?: string;
  isDownload?: boolean;
}

export interface CMSGalleryImage {
  id: string;
  url: string;
  caption?: string;
  altText?: string;
}

export interface CMSBlock {
  id: string;
  type: CMSBlockType;
  // Common styling
  bgColor?: 'default' | 'white' | 'slate' | 'amber' | 'navy' | 'light_gray';
  paddingY?: 'sm' | 'md' | 'lg';
  textAlign?: 'left' | 'center' | 'right';
  maxWidth?: 'sm' | 'md' | 'lg' | 'full';
  
  // Block-specific fields
  title?: string;
  subtitle?: string;
  badgeText?: string;
  content?: string; // Rich markdown or html text
  
  // Hero / Image
  imageUrl?: string;
  imageAlt?: string;
  imageCaption?: string;
  imageAspectRatio?: '16/9' | '4/3' | '1/1' | 'auto';
  imageRadius?: 'none' | 'md' | 'xl' | '2xl' | 'full';
  imageBorder?: boolean;
  
  // Callout
  calloutType?: 'info' | 'success' | 'warning' | 'urgent' | 'gold' | 'tartan';
  calloutIcon?: string;
  
  // Buttons
  buttons?: CMSButton[];
  
  // Cards Grid
  cardsColumns?: 2 | 3 | 4;
  cards?: CMSCard[];
  
  // Quote / Testimonial
  quoteText?: string;
  quoteAuthor?: string;
  quoteRole?: string;
  quoteLocation?: string;
  quoteAvatarUrl?: string;
  
  // Stats
  statNumber?: string;
  statLabel?: string;
  statNote?: string;
  
  // Accordion
  accordionItems?: CMSAccordionItem[];
  
  // Links List
  linkItems?: CMSLinkItem[];
  
  // Gallery
  galleryImages?: CMSGalleryImage[];
  
  // Divider
  dividerStyle?: 'subtle' | 'gold_line' | 'wave' | 'dots' | 'puffin' | 'tartan';
  
  // Survey Trigger
  surveyType?: 'community' | 'professional' | 'both';
  surveyPrompt?: string;
  
  // Custom HTML
  customHtml?: string;
}

export interface CMSPage {
  id: string;
  slug: string; // e.g. 'housing-guide' or 'events'
  title: string;
  navLabel: string;
  metaDescription?: string;
  isPublished: boolean;
  showInNav: boolean;
  showInFooter: boolean;
  navOrder: number;
  isSystemPage?: boolean;
  createdAt: string;
  updatedAt: string;
  bannerNotice?: string;
  blocks: CMSBlock[];
}

export interface CMSAnnouncement {
  id: string;
  isEnabled: boolean;
  text: string;
  linkText?: string;
  linkUrl?: string;
  variant: 'gold' | 'amber' | 'blue' | 'red' | 'green';
  isDismissible: boolean;
  startDate?: string;
  endDate?: string;
}

export interface CMSSiteSettings {
  siteTitle: string;
  tagline: string;
  contactEmail: string;
  contactPhone: string;
  contactLocation: string;
  etransferEmail: string;
  facebookUrl?: string;
  enableAnnouncement: boolean;
}

// Curated Newfoundland & Atlantic Visual Assets Library
export const NL_PHOTO_LIBRARY = [
  {
    id: 'nl_fillthegap_original_battery',
    title: "Fill The Gap Authentic St. John's & Battery View",
    category: 'Newfoundland Landmarks',
    url: '/scenic_nl.jpg',
    alt: "Authentic St. John's harbor and historic Battery houses from fillthegapnl.ca",
    credit: 'fillthegapnl.ca'
  },
  {
    id: 'nl_stjohns_harbor',
    title: "St. John's Historic Harbor & Battery",
    category: 'Newfoundland Landmarks',
    url: 'https://images.unsplash.com/photo-1574958269340-fa927503f3dd?auto=format&fit=crop&w=1200&q=80',
    alt: "St. John's harbor and vibrant coastal houses in Newfoundland",
    credit: 'Unsplash'
  },
  {
    id: 'nl_jellybean_row',
    title: 'Downtown Jellybean Row Houses',
    category: 'St. John’s Architecture',
    url: 'https://images.unsplash.com/photo-1589802829985-817e51171b92?auto=format&fit=crop&w=1200&q=80',
    alt: 'Colorful Jellybean row houses in downtown St. Johns NL',
    credit: 'Unsplash'
  },
  {
    id: 'nl_cape_spear',
    title: 'Cape Spear Lighthouse & Rugged Coast',
    category: 'Newfoundland Landmarks',
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    alt: 'Rugged Atlantic coastline at Cape Spear Newfoundland',
    credit: 'Unsplash'
  },
  {
    id: 'nl_signal_hill',
    title: 'Signal Hill & Cabot Tower Lookout',
    category: 'Newfoundland Landmarks',
    url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    alt: 'Signal Hill cliff and Atlantic ocean view',
    credit: 'Unsplash'
  },
  {
    id: 'nl_atlantic_puffin',
    title: 'Atlantic Puffin on Coastal Bluff',
    category: 'Wildlife & Nature',
    url: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1200&q=80',
    alt: 'Atlantic puffin with colorful beak overlooking ocean',
    credit: 'Unsplash'
  },
  {
    id: 'nl_community_helping',
    title: 'Community Volunteers & Helping Hands',
    category: 'Community & Care',
    url: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1200&q=80',
    alt: 'Hands holding together representing grassroots community solidarity',
    credit: 'Unsplash'
  },
  {
    id: 'nl_food_support',
    title: 'Food Care & Essentials Distribution',
    category: 'Community & Care',
    url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80',
    alt: 'Volunteers organizing fresh food and grocery relief',
    credit: 'Unsplash'
  },
  {
    id: 'nl_warm_home',
    title: 'Warmth, Comfort & Safe Housing',
    category: 'Housing & Warmth',
    url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    alt: 'Cozy and warm living space representing safe shelter and home',
    credit: 'Unsplash'
  },
  {
    id: 'nl_listening_ear',
    title: 'Supportive Conversation & Frontline Listening',
    category: 'Community & Care',
    url: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=1200&q=80',
    alt: 'Support worker in an empathetic conversation with someone in need',
    credit: 'Unsplash'
  },
  {
    id: 'nl_coastal_dory',
    title: 'Traditional Wooden Dory & Ocean Horizon',
    category: 'Newfoundland Heritage',
    url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
    alt: 'Traditional Newfoundland fishing boat resting on stony beach',
    credit: 'Unsplash'
  }
];

// Curated Graphic & Badge Stickers
export const GRAPHIC_STICKERS = [
  { id: 'badge_nl_roots', label: '100% Grassroots NL', icon: 'ShieldCheck', color: 'amber' },
  { id: 'badge_no_wait', label: 'No Bureaucracy / Direct Help', icon: 'Zap', color: 'emerald' },
  { id: 'badge_confidential', label: '100% Confidential & Safe', icon: 'Lock', color: 'blue' },
  { id: 'badge_heart_nl', label: 'Rooted in Care', icon: 'Heart', color: 'rose' },
  { id: 'badge_community_built', label: 'Built with Community Voice', icon: 'Users', color: 'amber' },
  { id: 'badge_emergency_urgent', label: 'Urgent Gap Coverage', icon: 'AlertTriangle', color: 'red' },
  { id: 'badge_stjohns_metro', label: 'St. John’s & Across NL', icon: 'MapPin', color: 'indigo' },
];

const LOCAL_STORAGE_CMS_PAGES_KEY = 'ftg_cms_pages_v1';
const LOCAL_STORAGE_CMS_ANNOUNCEMENT_KEY = 'ftg_cms_announcement_v1';
const LOCAL_STORAGE_CMS_SETTINGS_KEY = 'ftg_cms_settings_v1';

// Seed default initial custom pages for demonstration
const DEFAULT_SEED_PAGES: CMSPage[] = [
  {
    id: 'page_resources_guide',
    slug: 'resources-guide',
    title: 'Newfoundland Essential Resources Directory',
    navLabel: 'RESOURCES',
    metaDescription: 'A direct directory of community emergency supports, food pantries, and navigation resources across NL.',
    isPublished: true,
    showInNav: false,
    showInFooter: true,
    navOrder: 11,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    blocks: [
      {
        id: 'res_hero',
        type: 'hero',
        title: 'Emergency & Community Resources Guide',
        subtitle: 'Direct contacts and helpline numbers for immediate food, warm shelter, crisis support, and emergency help across Newfoundland and Labrador.',
        badgeText: 'Quick Reference Guide',
        bgColor: 'slate',
        buttons: [
          {
            id: 'btn_call_211',
            label: 'Call 211 (Community Directory)',
            url: 'tel:211',
            variant: 'gold',
            actionType: 'tel'
          },
          {
            id: 'btn_call_811',
            label: 'Call 811 (HealthLine)',
            url: 'tel:811',
            variant: 'secondary',
            actionType: 'tel'
          }
        ]
      },
      {
        id: 'res_links_1',
        type: 'links_list',
        title: '24/7 Crisis & Immediate Support Lines',
        linkItems: [
          {
            id: 'l1',
            title: 'NL Mental Health Crisis Line & Mobile Crisis Team',
            description: 'Available 24/7 across Newfoundland & Labrador. Confidential, free phone and mobile response.',
            url: 'tel:811',
            iconName: 'PhoneCall',
            badge: '24/7 Toll Free'
          },
          {
            id: 'l2',
            title: '211 Newfoundland & Labrador',
            description: 'Comprehensive directory of community, social, and government services.',
            url: 'https://nl.211.ca',
            iconName: 'Globe',
            badge: 'Online & Phone'
          },
          {
            id: 'l3',
            title: 'St. John’s Emergency Shelter Navigation Line',
            description: 'Emergency temporary housing intake and shelter beds in metro St. John’s.',
            url: 'tel:18337242444',
            iconName: 'Home',
            badge: 'Shelter Support'
          }
        ]
      },
      {
        id: 'res_faq',
        type: 'accordion',
        title: 'Frequently Asked Questions About Gap Assistance',
        accordionItems: [
          {
            id: 'faq_1',
            question: 'What qualifies as a "Gap" under Fill the Gap NL?',
            answer: 'A gap is an essential, urgent need where existing government programs or non-profits either do not cover the expense, have an exclusionary rule, or involve a processing delay that would cause serious hardship (e.g. freezing, job loss, missed medication).'
          },
          {
            id: 'faq_2',
            question: 'Is my survey submission confidential?',
            answer: 'Yes, 100%. All survey submissions are completely anonymous unless you choose to provide your contact information for voluntary research follow-up. We never share or sell personal information.'
          },
          {
            id: 'faq_3',
            question: 'How are funds raised and accounted for?',
            answer: 'Every dollar contributed through e-Transfer or direct community donations goes directly to funding documented gaps. We maintain complete financial transparency on our Admin Portal and public reporting.'
          }
        ]
      }
    ]
  }
];

const DEFAULT_ANNOUNCEMENT: CMSAnnouncement = {
  id: 'announcement_main',
  isEnabled: false,
  text: '📢 Live Community Survey Open: Help us map Newfoundland & Labrador’s biggest systemic gaps and emergency needs.',
  linkText: 'Take Survey Now',
  linkUrl: '#survey',
  variant: 'gold',
  isDismissible: true
};

const DEFAULT_SETTINGS: CMSSiteSettings = {
  siteTitle: 'Fill the Gap NL',
  tagline: 'Grassroots Emergency Assistance & Systems Advocacy for Newfoundland and Labrador',
  contactEmail: 'info@fillthegapnl.ca',
  contactPhone: '(709) 700-4427',
  contactLocation: "St. John's, NL",
  etransferEmail: 'donate@fillthegapnl.ca',
  facebookUrl: 'https://facebook.com/fillthegapnl',
  enableAnnouncement: false
};

export class CMSStore {
  private static pages: CMSPage[] = [];
  private static announcement: CMSAnnouncement = DEFAULT_ANNOUNCEMENT;
  private static siteSettings: CMSSiteSettings = DEFAULT_SETTINGS;
  private static isInitialized = false;

  public static initialize(): void {
    if (this.isInitialized) return;
    this.loadFromStorage();
    this.isInitialized = true;
    this.syncFromCloud().catch(() => {});
  }

  private static loadFromStorage(): void {
    try {
      const storedPages = localStorage.getItem(LOCAL_STORAGE_CMS_PAGES_KEY);
      if (storedPages) {
        const parsed = JSON.parse(storedPages);
        // Filter out any legacy updates seed page
        this.pages = Array.isArray(parsed) ? parsed.filter((p: CMSPage) => p.slug !== 'updates' && p.id !== 'page_community_updates') : [];
      } else {
        this.pages = [...DEFAULT_SEED_PAGES];
        this.savePagesToStorage();
      }

      const storedAnnouncement = localStorage.getItem(LOCAL_STORAGE_CMS_ANNOUNCEMENT_KEY);
      if (storedAnnouncement) {
        this.announcement = JSON.parse(storedAnnouncement);
      }

      const storedSettings = localStorage.getItem(LOCAL_STORAGE_CMS_SETTINGS_KEY);
      if (storedSettings) {
        this.siteSettings = { ...DEFAULT_SETTINGS, ...JSON.parse(storedSettings) };
      }
    } catch (e) {
      console.warn('CMSStore: Failed to load from local storage', e);
      this.pages = [...DEFAULT_SEED_PAGES];
    }
  }

  private static savePagesToStorage(): void {
    try {
      localStorage.setItem(LOCAL_STORAGE_CMS_PAGES_KEY, JSON.stringify(this.pages));
    } catch (e) {
      console.warn('CMSStore: Failed to save pages to local storage', e);
    }
  }

  private static saveAnnouncementToStorage(): void {
    try {
      localStorage.setItem(LOCAL_STORAGE_CMS_ANNOUNCEMENT_KEY, JSON.stringify(this.announcement));
    } catch (e) {}
  }

  private static saveSettingsToStorage(): void {
    try {
      localStorage.setItem(LOCAL_STORAGE_CMS_SETTINGS_KEY, JSON.stringify(this.siteSettings));
    } catch (e) {}
  }

  public static async syncFromCloud(): Promise<void> {
    // CMS state is saved and maintained directly in browser local storage & site configuration
  }

  public static async syncToCloud(): Promise<boolean> {
    // CMS state is saved and maintained directly in browser local storage & site configuration
    return true;
  }

  // --- Page Operations ---

  public static getPages(): CMSPage[] {
    this.initialize();
    return [...this.pages];
  }

  public static getPublishedPages(): CMSPage[] {
    this.initialize();
    return this.pages.filter(p => p.isPublished).sort((a, b) => a.navOrder - b.navOrder);
  }

  public static getNavPages(): CMSPage[] {
    this.initialize();
    return this.pages.filter(p => p.isPublished && p.showInNav).sort((a, b) => a.navOrder - b.navOrder);
  }

  public static getFooterPages(): CMSPage[] {
    this.initialize();
    return this.pages.filter(p => p.isPublished && p.showInFooter).sort((a, b) => a.navOrder - b.navOrder);
  }

  public static getPageBySlug(slug: string): CMSPage | undefined {
    this.initialize();
    const cleanSlug = slug.replace(/^\/+/, '').toLowerCase();
    return this.pages.find(p => p.slug.toLowerCase() === cleanSlug);
  }

  public static getPageById(id: string): CMSPage | undefined {
    this.initialize();
    return this.pages.find(p => p.id === id);
  }

  public static savePage(page: CMSPage): void {
    this.initialize();
    const index = this.pages.findIndex(p => p.id === page.id);
    const updatedPage: CMSPage = {
      ...page,
      updatedAt: new Date().toISOString()
    };

    if (index >= 0) {
      this.pages[index] = updatedPage;
    } else {
      this.pages.push(updatedPage);
    }

    this.savePagesToStorage();
    this.syncToCloud().catch(() => {});
  }

  public static deletePage(id: string): boolean {
    this.initialize();
    const initialLen = this.pages.length;
    this.pages = this.pages.filter(p => p.id !== id);
    if (this.pages.length !== initialLen) {
      this.savePagesToStorage();
      this.syncToCloud().catch(() => {});
      return true;
    }
    return false;
  }

  public static createNewPage(title: string, slug?: string): CMSPage {
    this.initialize();
    const cleanSlug = (slug || title)
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '') || `page-${Date.now()}`;

    const newPage: CMSPage = {
      id: `page_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      slug: cleanSlug,
      title: title.trim() || 'Untitled Page',
      navLabel: (title.trim() || 'NEW PAGE').toUpperCase().slice(0, 20),
      isPublished: true,
      showInNav: false,
      showInFooter: true,
      navOrder: this.pages.length + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      blocks: [
        {
          id: `block_${Date.now()}_hero`,
          type: 'hero',
          title: title.trim() || 'Welcome to this Page',
          subtitle: 'Add an inspiring subtitle or summary here.',
          badgeText: 'Fill The Gap NL',
          bgColor: 'navy',
          imageUrl: NL_PHOTO_LIBRARY[0].url,
          buttons: [
            {
              id: `btn_${Date.now()}_1`,
              label: 'Learn More',
              url: '#',
              variant: 'gold',
              actionType: 'url'
            }
          ]
        },
        {
          id: `block_${Date.now()}_text`,
          type: 'text',
          title: 'About This Initiative',
          content: 'You can write and edit this text freely without any AI! Click on this block to change headings, add bold text, include links, or attach pictures.',
          bgColor: 'default',
          textAlign: 'left'
        }
      ]
    };

    this.savePage(newPage);
    return newPage;
  }

  public static duplicatePage(id: string): CMSPage | null {
    const original = this.getPageById(id);
    if (!original) return null;

    const cloned: CMSPage = {
      ...JSON.parse(JSON.stringify(original)),
      id: `page_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      slug: `${original.slug}-copy-${Date.now().toString().slice(-4)}`,
      title: `${original.title} (Copy)`,
      navLabel: `${original.navLabel} (COPY)`,
      isPublished: false,
      showInNav: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.savePage(cloned);
    return cloned;
  }

  // --- Announcement Banner ---

  public static getAnnouncement(): CMSAnnouncement {
    this.initialize();
    return { ...this.announcement };
  }

  public static saveAnnouncement(announcement: CMSAnnouncement): void {
    this.initialize();
    this.announcement = { ...announcement };
    this.saveAnnouncementToStorage();
    this.syncToCloud().catch(() => {});
  }

  // --- Site Settings ---

  public static getSiteSettings(): CMSSiteSettings {
    this.initialize();
    return { ...this.siteSettings };
  }

  public static saveSiteSettings(settings: CMSSiteSettings): void {
    this.initialize();
    this.siteSettings = { ...settings };
    this.saveSettingsToStorage();
    this.syncToCloud().catch(() => {});
  }
}
