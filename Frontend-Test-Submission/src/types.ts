export interface ShortURL {
  original: string;
  shortened: string;
  expiry: string;
  shortcode: string;
  clicks: ClickLog[];
}

export interface ClickLog {
  timestamp: string;
  source: string;
  location: string;
}
