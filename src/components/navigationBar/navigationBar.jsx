import { AppBar, Box, IconButton, Toolbar } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';

import { Breadcrumbs } from './breadcrumbs.jsx';
import { PurchaseCart } from './purchaseCart.jsx';

import napptilusLogo from '../../assets/napptilus_icon.png';

const useStyles = makeStyles({
    appBar: {
        display: 'flex',
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        height: 120
    },
    navLinks: {
        justifyContent: 'center'
    },
    logo: { objectFit: 'contain', flexGrow: 1, marginLeft: -305 },
    linkButton: {
        textAlign: 'center',
        color: 'white',
        textTransform: 'uppercase',
        fontSize: 18,
        '&:hover': {
            backgroundColor: 'none',
            color: 'white'
        }
    }
});

export function NavigationBar() {
    const classes = useStyles();
    const navigate = useNavigate();

    const _onNavigateHome = () => {
        navigate('/');
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar component='nav' className={classes.appBar}>
                <Toolbar>
                    <Box className={classes.navLinks}>
                        <Breadcrumbs />
                    </Box>
                    <Box className={classes.logo}>
                        <IconButton
                            size='small'
                            edge='start'
                            onClick={_onNavigateHome}
                        >
                            <img
                                src={napptilusLogo}
                                height={100}
                                style={{ borderRadius: 60 }}
                            />
                        </IconButton>
                    </Box>
                    <PurchaseCart />
                </Toolbar>
            </AppBar>
        </Box>
    );
}
