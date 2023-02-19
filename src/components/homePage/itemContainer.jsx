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
        <Grid item lg={4} xs={12}>
            <Card className={classes.card} role='columnheader'>
                <ClickableImage alt='phoneImage' src={imageURL} />
                <CardContent sx={{ padding: '0.1em' }}>
                    <Typography variant='h6' color='black'>
                        {`${brand} - ${model}`}
                    </Typography>
                    <Typography
                        variant='h6'
                        color='black'
                        sx={{ textTransform: 'lowercase' }}
                    >
                        {price !== '' ? `precio: ${price} €` : 'No disponible'}
                    </Typography>
                </CardContent>
                <Box component='div' className={classes.buttonBox}>
                    <Button
                        data-testid='button-details'
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
