import React from 'react';
import { Box, Grid, Typography } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box sx={{ mt: 5, textAlign: "center", py: 3, bgcolor: "oklch(0.21 0.034 264.665)", width: "100%", position: 'relative' }}>
      <Grid container spacing={3} sx={{ justifyContent: "center" }}>
        <Grid item xs={12} sm={4}>
          <Typography variant="body2" color="white">© 2025 Read Mate. All rights reserved.</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
