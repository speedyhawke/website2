export interface ScenicHeroPreset {
  id: string;
  name: string;
  location: string;
  url: string;
  alt: string;
}

// Authentic St. John's, Newfoundland & Battery photo from fillthegapnl.ca
export const ORIGINAL_FILLTHEGAP_IMAGE = "/scenic_nl.jpg";

export const SCENIC_ST_JOHNS_PRESETS: ScenicHeroPreset[] = [
  {
    id: "fillthegap_st_johns_battery",
    name: "St. John's & The Battery (Original)",
    location: "St. John's, Newfoundland & Labrador",
    url: "/scenic_nl.jpg",
    alt: "Authentic scenic view of St. John's Newfoundland, the harbour, hills, and historic Battery houses"
  },
  {
    id: "the_battery_houses",
    name: "The Battery Coastal Houses",
    location: "The Battery, St. John's, NL",
    url: "https://images.unsplash.com/photo-1574958269340-fa927503f3dd?auto=format&fit=crop&w=2400&q=90",
    alt: "Scenic St. John's Newfoundland historic Battery colourful wooden houses on coastal cliffs overlooking harbour waters"
  },
  {
    id: "jellybean_row",
    name: "Downtown Jellybean Row Houses",
    location: "Downtown St. John's, NL",
    url: "https://images.unsplash.com/photo-1589802829985-817e51171b92?auto=format&fit=crop&w=2400&q=90",
    alt: "Vibrant multi-coloured Victorian Jellybean row houses in St. John's Newfoundland"
  },
  {
    id: "cape_spear_coastline",
    name: "Cape Spear Rugged Atlantic Coast",
    location: "Cape Spear, NL",
    url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2400&q=90",
    alt: "Atlantic coastal bluffs and ocean waves in Newfoundland"
  }
];

export const HERO_IMAGE_DATA_URI = ORIGINAL_FILLTHEGAP_IMAGE;
export const DEFAULT_BATTERY_HERO_IMAGE = ORIGINAL_FILLTHEGAP_IMAGE;
