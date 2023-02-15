import { Box, Card, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useParams } from 'react-router-dom';

import { DeviceDetails } from './deviceDetails.jsx';
import { SelectorComponent } from './selectorComponent.jsx';

import useGetItem from '../../api/useGetItem.js';
import { ClickableImage } from '../../common/Elements/ClickableImage';

const useStyles = makeStyles({
  grid: {
    padding: '1em',
    minWidth: '15em',
    justifyContent: 'center',
    marginTop: 200
  },
  box: {
    flexGrow: 1,
    marginTop: 90,
    display: 'flex',
    flexDirection: 'row'
  }
});

export function DetailsPage() {
  const { id } = useParams();
  const { data, isSuccess } = useGetItem(id);
  const classes = useStyles();

  return (
    isSuccess &&
    data && (
      <Box component='div' className={classes.box}>
        <Grid container spacing={3} sx={{ marginRight: 5, marginTop: '2.2em' }}>
          <Grid item xs={12}>
            <Card sx={{ padding: 2, height: 'auto' }}>
              <ClickableImage alt='phoneImage' src={data.imgUrl} height={300} />
              <Typography variant='h6' fontWeight='bold' padding={1}>
                {data.model}
              </Typography>
            </Card>
          </Grid>
          <Grid item sm={12} xs={12}>
            <SelectorComponent data={data} />
          </Grid>
        </Grid>
        <DeviceDetails data={data} />
      </Box>
    )
  );
}
