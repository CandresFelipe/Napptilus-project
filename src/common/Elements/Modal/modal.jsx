import { Box, Modal as MUIModal, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { Button } from '../Button';
import { Spinner } from '../Spinner';

const useStyles = makeStyles({
  box: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    textAlign: 'center',
    justifyContent: 'center',
    borderRadius: 4
  }
});

export function Modal(props) {
  const { open, onCloseModal, modalType, ...others } = props;
  const classes = useStyles();
  const successMessage = 'Has anadido un nuevo item a tu cesta!';
  const failedMessage = 'Ha ocurrido un error, intenta de nuevo';

  return (
    <MUIModal
      {...others}
      open={open}
      sx={{ overflow: 'hidden', background: 'transparent' }}
    >
      <Box className={classes.box} paddingTop={0}>
        {modalType !== 'loading' ? (
          <Box component='div' sx={{ background: 'white', padding: 3 }}>
            <Typography variant='h4' fontWeight='bold' color='black'>
              {modalType === 'error' && failedMessage}
              {modalType === 'success' && successMessage}
            </Typography>
            <Box sx={{ margin: 3, padding: 2 }}>
              <Button
                sx={{ width: '-webkit-fill-available', padding: 2 }}
                buttonType='primary'
                color={modalType === 'success' ? 'success' : 'error'}
                title='Cerrar'
                onClick={() => onCloseModal()}
              />
            </Box>
          </Box>
        ) : (
          <Box sx={{ justifyContent: 'center' }}>
            <Spinner />
          </Box>
        )}
      </Box>
    </MUIModal>
  );
}
