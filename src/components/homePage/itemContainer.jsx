import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';

import { Button } from '../../common/Elements/Button';
import { ClickableImage } from '../../common/Elements/ClickableImage';

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
    justifyContent: 'space-around',
    marginTop: 5
  }
});

export function ItemContainer({ imageURL, brand, model, price, id }) {
  const classes = useStyles();
  const navigate = useNavigate();

  const _onClickDetails = (event) => {
    event.preventDefault();
    navigate(`/details/${id}`);
  };

  return (
    <Grid item className={classes.grid} xs={4}>
      <Card className={classes.card}>
        <ClickableImage alt='phoneImage' src={imageURL} />
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
          <Button
            buttonType='primary'
            variant='button'
            title='Ver detalles'
            onClick={(event) => _onClickDetails(event)}
          />
        </Box>
      </Card>
    </Grid>
  );
}
