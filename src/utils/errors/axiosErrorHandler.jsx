import NoCellIcon from '@mui/icons-material/NoCell';
import { Box, Typography } from '@mui/material';

export function AxiosErrorHandler({ error }) {
  const title = 'Oh!, ha ocurrido un error, intentalo mas tarde.';
  return (
    <Box
      component='div'
      sx={{
        marginTop: 20
      }}
      role='axios-error'
    >
      <Typography variant='h4' padding={5}>
        {title}
      </Typography>
      <NoCellIcon sx={{ fontSize: 300, paddingBottom: 5 }} />
      <Typography variant='h6'>{`Message: - ${error.message}`}</Typography>
    </Box>
  );
}
