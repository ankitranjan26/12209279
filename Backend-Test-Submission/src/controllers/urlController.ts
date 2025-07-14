import { Request, Response } from 'express';
import { urlDatabase } from '../models/urlData';
import { Log } from '../utils/logger';

export const shortenUrl = async (req: Request, res: Response) => {
  const { longUrl, shortcode, expiry } = req.body;
  const code = shortcode || Math.random().toString(36).substring(2, 8);
  const expiryMinutes = expiry || 30;

  if (!longUrl || typeof longUrl !== 'string') {
    await Log("backend", "error", "handler", "Missing or invalid longUrl");
    return res.status(400).json({ error: "Invalid URL" });
  }

  if (urlDatabase[code]) {
    await Log("backend", "warn", "service", `Shortcode collision: ${code}`);
    return res.status(400).json({ error: "Shortcode already in use" });
  }

  const now = new Date();
  const expireAt = new Date(now.getTime() + expiryMinutes * 60000);

  urlDatabase[code] = {
    longUrl,
    shortcode: code,
    createdAt: now,
    expiry: expireAt,
    clicks: []
  };

  await Log("backend", "info", "service", `Short URL created: ${code}`);

  return res.json({
    shortcode: code,
    expiry: expireAt.toISOString()
  });
};

export const resolveShortUrl = async (req: Request, res: Response) => {
  const { code } = req.params;
  const entry = urlDatabase[code];

  if (!entry) {
    await Log("backend", "error", "handler", `Shortcode not found: ${code}`);
    return res.status(404).json({ error: "Short URL not found" });
  }

  if (new Date() > entry.expiry) {
    await Log("backend", "warn", "handler", `URL expired: ${code}`);
    return res.status(410).json({ error: "URL expired" });
  }

  const click = {
    timestamp: new Date().toISOString(),
    source: req.headers.referer || 'direct',
    location: req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown'
  };

  entry.clicks.push(click);

  await Log("backend", "info", "service", `Click logged for ${code}`);

  res.json({ longUrl: entry.longUrl });
};

export const getStats = async (req: Request, res: Response) => {
  const allData = Object.values(urlDatabase).map(entry => ({
    shortcode: entry.shortcode,
    longUrl: entry.longUrl,
    createdAt: entry.createdAt,
    expiry: entry.expiry,
    totalClicks: entry.clicks.length,
    clicks: entry.clicks
  }));

  await Log("backend", "info", "service", "Stats requested");
  return res.json(allData);
};
