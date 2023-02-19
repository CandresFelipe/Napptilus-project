import { Grid, Breadcrumbs as MUIBreadcrumbs, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link, useLocation } from 'react-router-dom';

const useStyles = makeStyles({
    breadcrumbs: {
        marginRight: 0,
        width: 350,
        justifyContent: 'space-around'
    },
    link: {
        color: '#212121',
        opacity: 0.5,
        '&:hover': {
            color: '#212121',
            opacity: 'unset',
            textDecoration: 'underline'
        }
    }
});

export function Breadcrumbs() {
    const classes = useStyles();
    const location = useLocation();
    const Home = 'Inicio';
    const Details = 'Detalles del Producto';
    const isLocationHome = location.pathname != '/';
    return (
        <div role='presentation' className={classes.breadcrumbs}>
            <Grid container item lg={12} xs={12} spacing={2}>
                <MUIBreadcrumbs arial-aria-label='breadcrumbs'>
                    <Grid item lg={12} xs={6}>
                        {isLocationHome ? (
                            <Link
                                className={classes.link}
                                to={'/'}
                                data-testid='home-link'
                            >
                                {Home}
                            </Link>
                        ) : (
                            <Typography
                                color='#212121'
                                sx={{ typography: { xs: 'body1' } }}
                                data-testid='home-link-text'
                            >
                                {Home}
                            </Typography>
                        )}
                    </Grid>
                    <Grid item lg={12} xs={6}>
                        {isLocationHome && (
                            <Typography
                                color='#212121'
                                sx={{
                                    typography: {
                                        xs: 'body1'
                                    }
                                }}
                                data-testid='product-details-link'
                            >
                                {Details}
                            </Typography>
                        )}
                    </Grid>
                </MUIBreadcrumbs>
            </Grid>
        </div>
    );
}
