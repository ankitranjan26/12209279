interface Click {
  timestamp: string;
  source: string;
  location: string;
}

interface ShortURL {
  longUrl: string;
  shortcode: string;
  expiry: Date;
  createdAt: Date;
  clicks: Click[];
}

export const urlDatabase: Record<string, ShortURL> = {};
