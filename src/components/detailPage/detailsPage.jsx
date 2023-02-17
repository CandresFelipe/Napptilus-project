import { Box, Card, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useParams } from 'react-router-dom';

import { DeviceDetails } from './deviceDetails.jsx';
import { SelectorComponent } from './selectorComponent.jsx';

import { useGetItem } from '../../api/useGetItem.js';
import { ClickableImage } from '../../common/Elements/ClickableImage';
import { Spinner } from '../../common/Elements/Spinner';
import { AxiosErrorHandler } from '../../utils/errors/axiosErrorHandler.jsx';

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
  const { data, isSuccess, isError, isLoading, error } = useGetItem(id);
  const classes = useStyles();

  return isError ? (
    <AxiosErrorHandler error={error} />
  ) : isLoading ? (
    <Spinner />
  ) : (
    isSuccess &&
    data && (
      <Box component='div' className={classes.box}>
        <Grid container spacing={3} className={classes.grid}>
          <Grid item xs={12} data-testid='grid-phone-image'>
            <Card className={classes.imageBox}>
              <ClickableImage
                alt='phoneImage'
                src={data.imgUrl}
                height={300}
                color='black'
              />
              <Typography variant='h6' fontWeight='bold' padding={1}>
                {data.model}
              </Typography>
            </Card>
          </Grid>
          <Grid item sm={12} xs={12} data-testid='grid-selector'>
            <SelectorComponent data={data} />
          </Grid>
        </Grid>
        <DeviceDetails data={data} />
      </Box>
    )
  );
}
