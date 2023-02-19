import { AppBar, Grid, IconButton, Toolbar } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';

import { Breadcrumbs } from './breadcrumbs.jsx';
import { PurchaseCart } from './purchaseCart.jsx';

import napptilusLogo from '../../assets/napptilus_icon.png';

const useStyles = makeStyles({
    appBar: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
    },
    image: {
        borderRadius: 60,
        maxHeight: 100,
        minHeight: 50
    }
});

export function NavigationBar() {
    const classes = useStyles();
    const navigate = useNavigate();

    const _onNavigateHome = () => {
        navigate('/');
    };

    return (
        <AppBar component='nav' className={classes.appBar}>
            <Toolbar>
                <Grid container item lg={12} xs={12} alignItems='center'>
                    <Grid item lg={3} xs={4}>
                        <Breadcrumbs />
                    </Grid>
                    <Grid item lg={6} xs={4}>
                        <IconButton
                            sx={{ flexGrow: 1 }}
                            size='small'
                            edge='start'
                            onClick={_onNavigateHome}
                        >
                            <img
                                src={napptilusLogo}
                                className={classes.image}
                            />
                        </IconButton>
                    </Grid>
                    <Grid item lg={3} xs={4} textAlign='right'>
                        <PurchaseCart />
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
}
