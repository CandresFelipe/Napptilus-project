import { Box, CircularProgress } from '@mui/material';

export function Spinner() {
  return (
    <Box sx={{ marginTop: 30 }} data-testid='spinner-loading'>
      <CircularProgress color='success' size={500} />
    </Box>
  );
}
