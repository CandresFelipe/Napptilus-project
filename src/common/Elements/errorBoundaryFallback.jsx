import { Button, Typography } from '@mui/material';

import { isAPIError } from '../../utils/errors/helpers';

export function ErrorBoundaryFallback({ error, resetErrorBoundary }) {
  console.log('ERROR!!!:', error.response.data);
  if (!isAPIError(error)) {
    return (
      <div role='alert'>
        <Typography variant='h5'>
          Something went wrong, please try again later.
        </Typography>
        <Button
          type='reset'
          key='reset'
          variant='contained'
          sx={{ mt: '05em' }}
          onClick={resetErrorBoundary}
        >
          <Typography>Try again</Typography>
        </Button>
      </div>
    );
  }
  return (
    <div role='alert'>
      <Typography>{error.response.data}</Typography>
    </div>
  );
}
