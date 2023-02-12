import { AppBar, Box, Button, IconButton, Stack, Toolbar } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';

import { PurchaseCart } from './purchaseCart.jsx';

import napptilusLogo from '../../assets/napptilus_icon.png';

const useStyles = makeStyles({
  appBar: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    height: 100
  },
  navLinks: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'center'
  },
  logo: { objectFit: 'contain' },
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
  breadcrumbs: {
    justifyContent: 'space-evenly',
    alignContent: 'space-between',
    display: 'flex',
    flexGrow: '1'
  }
});

export function NavigationBar() {
  const classes = useStyles();
  // TODO: do the links associated to the Breadcrumbs
  const Breadcrumbs = () => (
    <Stack spacing={15} direction='row'>
      <Button>
        <Link to='/' className={classes.linkButton}>
          Home
        </Link>
      </Button>
      <Button>
        <Link to='/about' className={classes.linkButton}>
          About
        </Link>
      </Button>
      <Button>
        <Link to='/contact' className={classes.linkButton}>
          Contact
        </Link>
      </Button>
    </Stack>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar component='nav' className={classes.appBar}>
        <Toolbar>
          <Box className={classes.logo}>
            <IconButton size='small' edge='start'>
              <img src={napptilusLogo} height={100} />
            </IconButton>
          </Box>
          <Box className={classes.navLinks}>
            <Breadcrumbs />
          </Box>
          <PurchaseCart />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
