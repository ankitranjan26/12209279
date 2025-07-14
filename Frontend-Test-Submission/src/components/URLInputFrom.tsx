import React from 'react';
import { Grid, TextField } from '@mui/material';

interface Props {
  index: number;
  value: {
    longUrl: string;
    shortcode: string;
    expiry: string;
  };
  onChange: (index: number, field: string, value: string) => void;
}

const URLInputForm: React.FC<Props> = ({ index, value, onChange }) => {
  return (
    <Grid container spacing={2} key={index} sx={{ marginBottom: 2 }}>
      <Grid item xs={12} md={5}>
        <TextField
          fullWidth
          label="Long URL"
          value={value.longUrl}
          onChange={(e) => onChange(index, 'longUrl', e.target.value)}
          required
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <TextField
          fullWidth
          label="Custom Shortcode (optional)"
          value={value.shortcode}
          onChange={(e) => onChange(index, 'shortcode', e.target.value)}
        />
      </Grid>
      <Grid item xs={12} md={2}>
        <TextField
          fullWidth
          label="Validity (min)"
          type="number"
          value={value.expiry}
          onChange={(e) => onChange(index, 'expiry', e.target.value)}
        />
      </Grid>
    </Grid>
  );
};

export default URLInputForm;
