import {
  Box,
  ButtonBase,
  Card,
  CardContent,
  Grid,
  Typography
} from '@mui/material';
import { makeStyles, styled } from '@mui/styles';

import { Button } from '../../common/Elements/Button';

const useStyles = makeStyles({
  card: {
    minWidth: 300,
    paddingBottom: '1.5em',
    paddingTop: '1.5em'
  },
  grid: {
    padding: '1em',
    minWidth: '15em',
    flexGrow: 1,
    justifyContent: 'center'
  },
  buttonBox: {
    display: 'flex',
    justifyContent: 'space-around'
  }
});

export function ItemContainer({ imageURL, brand, model, price, onClick }) {
  const classes = useStyles();

  const Image = styled('img')({
    margin: 'auto',
    maxHeight: '100%',
    maxWidth: '100%',
    display: 'block',
    objectFit: 'contain'
  });
  return (
    <Grid item onClick={onClick} className={classes.grid} xs={4}>
      <Card className={classes.card}>
        <ButtonBase>
          <Image alt='phoneImage' src={imageURL} />
        </ButtonBase>
        <CardContent sx={{ padding: '0.1em' }}>
          <Typography variant='h6' color='CaptionText'>
            {`${brand} - ${model}`}
          </Typography>
          <Typography
            variant='h6'
            color='CaptionText'
            sx={{ textTransform: 'lowercase' }}
          >
            {price !== '' ? `precio: ${price} €` : 'No disponible'}
          </Typography>
        </CardContent>
        <Box component='div' className={classes.buttonBox}>
          <Button buttonType='secondary' variant='button' title='Details' />
          <Button buttonType='primary' variant='button' title='Add to cart' />
        </Box>
      </Card>
    </Grid>
  );
}
