import {
  AppBar,
  Box,
  IconButton,
  Breadcrumbs as MUIBreadcrumbs,
  Toolbar,
  Typography
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';

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
  },
  link: {
    color: '#212121',
    opacity: 0.5,
    '&:hover': {
      color: '#212121',
      opacity: 'unset',
      textDecoration: 'underline'
    },
    fontSize: 22
  },
  breadcrumbs: {
    marginRight: 0,
    width: 350,
    justifyContent: 'space-around'
  }
});

export function NavigationBar() {
  const classes = useStyles();
  const navigate = useNavigate();

  const _onNavigateHome = () => {
    navigate('/');
  };
  // TODO: do the links associated to the Breadcrumbs
  const Breadcrumbs = () => {
    const { id } = useParams();
    const location = useLocation();
    if (id) {
      console.log(id);
    }
    const Home = 'Inicio';
    const Details = 'Detalles del Producto';
    const isLocationHome = location.pathname != '/';
    return (
      <div role='presentation' className={[classes.breadcrumbs]}>
        <MUIBreadcrumbs arial-aria-label='breadcrumbs'>
          {isLocationHome ? (
            <Link className={classes.link} to={'/'}>
              {Home}
            </Link>
          ) : (
            <Typography color='#212121' variant='h5'>
              {Home}
            </Typography>
          )}
          {isLocationHome && (
            <Typography color='#212121' variant='h5'>
              {Details}
            </Typography>
          )}
        </MUIBreadcrumbs>
      </div>
    );
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar component='nav' className={classes.appBar}>
        <Toolbar>
          <Box className={classes.navLinks}>
            <Breadcrumbs />
          </Box>
          <Box className={classes.logo}>
            <IconButton size='small' edge='start' onClick={_onNavigateHome}>
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
