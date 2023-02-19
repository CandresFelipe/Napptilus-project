import { Box, Button, Typography } from '@mui/material';

import { isAPIError } from './helpers';

export function ErrorBoundaryFallback({ error, resetErrorBoundary }) {
    const title = 'Ha surgido un problema, intentalo mas tarde.';
    const tryMessage = 'Intentar de nuevo';

    if (!isAPIError(error)) {
        return (
            <Box
                component='alert'
                sx={{ justifyContent: 'center', alignSelf: 'center' }}
            >
                <Typography variant='h5'>{title}</Typography>
                <Button
                    type='reset'
                    key='reset'
                    variant='contained'
                    sx={{ mt: '05em' }}
                    onClick={resetErrorBoundary}
                >
                    <Typography>{tryMessage}</Typography>
                </Button>
            </Box>
        );
    }
}
