import { Card, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useParams } from 'react-router-dom';

import { DeviceDetails } from './deviceDetails.jsx';
import { SelectorComponent } from './selectorComponent.jsx';

import { useGetItem } from '../../api/useGetItem.js';
import { ClickableImage } from '../../common/Elements/ClickableImage';
import { Spinner } from '../../common/Elements/Spinner';
import { AxiosErrorHandler } from '../../utils/errors/axiosErrorHandler.jsx';

const useStyles = makeStyles({
    box: {
        flexGrow: 1,
        marginTop: 90,
        display: 'flex',
        flexDirection: 'row'
    },
    imageBox: {
        padding: 10
    }
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
            <Grid container item lg={12} spacing={4} marginTop={10}>
                <Grid container item lg={6} xs={12} spacing={4}>
                    <Grid item lg={12} xs={12} data-testid='grid-phone-image'>
                        <Card className={classes.imageBox}>
                            <ClickableImage
                                alt='phoneImage'
                                src={data.imgUrl}
                                height={300}
                                color='black'
                            />
                            <Typography
                                variant='h6'
                                fontWeight='bold'
                                padding={1}
                            >
                                {data.model}
                            </Typography>
                        </Card>
                    </Grid>
                    <Grid
                        item
                        lg={12}
                        xs={12}
                        data-testid='grid-selector'
                        width={1}
                    >
                        <SelectorComponent options={data.options} />
                    </Grid>
                </Grid>
                <Grid item lg={6} xs={12}>
                    <DeviceDetails data={data} />
                </Grid>
            </Grid>
        )
    );
}
