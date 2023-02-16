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
    marginRight: 15,
    paddingTop: '3em'
  },
  box: {
    flexGrow: 1,
    marginTop: 90,
    display: 'flex',
    flexDirection: 'row'
  },
  imageBox: { padding: 2, height: 'auto' }
});

export function DetailsPage() {
  const { id } = useParams();
  const { data, isSuccess } = useGetItem(id);
  const classes = useStyles();

  return (
    isSuccess &&
    data && (
      <Box component='div' className={classes.box}>
        <Grid container spacing={3} className={classes.grid}>
          <Grid item xs={12}>
            <Card className={classes.imageBox}>
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
