import React, { useEffect, useState } from 'react';
import { Typography, Paper, Divider, List, ListItem, ListItemText } from '@mui/material';

interface Click {
  timestamp: string;
  source: string;
  location: string;
}

interface Stat {
  shortcode: string;
  longUrl: string;
  createdAt: string;
  expiry: string;
  totalClicks: number;
  clicks: Click[];
}

export default function Statistics() {
  const [stats, setStats] = useState<Stat[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/stats')
      .then(res => res.json())
      .then(data => setStats(data));
  }, []);

  return (
    <Paper sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>Shortened URL Statistics</Typography>
      {stats.map((item, index) => (
        <div key={index} style={{ marginBottom: 20 }}>
          <Typography variant="h6">
            Short: <a href={`http://localhost:3000/${item.shortcode}`} target="_blank">{item.shortcode}</a>
          </Typography>
          <Typography variant="body2">Long URL: {item.longUrl}</Typography>
          <Typography variant="body2">Created: {new Date(item.createdAt).toLocaleString()}</Typography>
          <Typography variant="body2">Expires: {new Date(item.expiry).toLocaleString()}</Typography>
          <Typography variant="body2">Total Clicks: {item.totalClicks}</Typography>
          <Divider sx={{ marginY: 1 }} />
          <List dense>
            {item.clicks.map((click, i) => (
              <ListItem key={i}>
                <ListItemText
                  primary={`Click ${i + 1}`}
                  secondary={`Time: ${click.timestamp}, Source: ${click.source}, Location: ${click.location}`}
                />
              </ListItem>
            ))}
          </List>
        </div>
      ))}
    </Paper>
  );
}
