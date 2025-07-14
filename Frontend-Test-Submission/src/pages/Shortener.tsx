import React, { useState } from 'react';
import { TextField, Button, Grid, Paper, Typography } from '@mui/material';
import { Log } from '../services/logger';

export default function Shortener() {
  const [urls, setUrls] = useState([{ longUrl: '', shortcode: '', expiry: '' }]);
  const [results, setResults] = useState<any[]>([]);

  const handleChange = (index: number, field: string, value: string) => {
    const updated = [...urls];
    updated[index][field] = value;
    setUrls(updated);
  };

  const addInput = () => {
    if (urls.length < 5) {
      setUrls([...urls, { longUrl: '', shortcode: '', expiry: '' }]);
    }
  };

  const validateUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleShorten = async () => {
    for (let i = 0; i < urls.length; i++) {
      const { longUrl, shortcode, expiry } = urls[i];

      if (!validateUrl(longUrl)) {
        alert(`Invalid URL at row ${i + 1}`);
        await Log('frontend', 'warn', 'component', `Malformed URL: ${longUrl}`);
        return;
      }

      const payload = {
        longUrl,
        shortcode,
        expiry: expiry ? parseInt(expiry) : 30
      };

      try {
        const res = await fetch('http://localhost:5000/api/shorten', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        const data = await res.json();

        setResults(prev => [...prev, data]);
        await Log('frontend', 'info', 'component', `Shortened URL created for ${longUrl}`);
      } catch (err) {
        await Log('frontend', 'error', 'component', `Error shortening: ${longUrl}`);
        alert('Server error');
      }
    }
  };

  return (
    <Paper sx={{ padding: 4 }}>
      <Typography variant="h4">URL Shortener</Typography>
      {urls.map((u, i) => (
        <Grid container spacing={2} key={i} sx={{ marginY: 1 }}>
          <Grid item xs={4}>
            <TextField fullWidth label="Long URL" value={u.longUrl} onChange={e => handleChange(i, 'longUrl', e.target.value)} />
          </Grid>
          <Grid item xs={3}>
            <TextField fullWidth label="Custom Shortcode (optional)" value={u.shortcode} onChange={e => handleChange(i, 'shortcode', e.target.value)} />
          </Grid>
          <Grid item xs={3}>
            <TextField fullWidth label="Validity (min)" type="number" value={u.expiry} onChange={e => handleChange(i, 'expiry', e.target.value)} />
          </Grid>
        </Grid>
      ))}
      <Button onClick={addInput}>Add Another</Button>
      <Button variant="contained" color="primary" onClick={handleShorten}>Shorten</Button>

      <div style={{ marginTop: '20px' }}>
        {results.map((r, idx) => (
          <div key={idx}>
            <strong>Short URL:</strong> <a href={`http://localhost:3000/${r.shortcode}`} target="_blank">{r.shortcode}</a>
            <p>Expires at: {r.expiry}</p>
          </div>
        ))}
      </div>
    </Paper>
  );
}
