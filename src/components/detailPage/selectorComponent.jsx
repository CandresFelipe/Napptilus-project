import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import {
  Box,
  Card,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Typography
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useState } from 'react';

import { Button } from '../../common/Elements/Button';

const backgroundColor = '#FF8E53';

const useStyles = makeStyles({
  colorsTitle: { display: 'flex', paddingLeft: 3, paddingTop: 3 },
  storageTitle: { display: 'flex', paddingLeft: 3 },
  colorCheckBox: {
    color: backgroundColor,
    '&.Mui-checked': {
      color: backgroundColor
    }
  }
});

export function SelectorComponent({ data }) {
  const [colorChecked, setColorChecked] = useState(true);
  const classes = useStyles();
  const storage = 'Almacenamiento disponible: ';
  const colors = 'Colores disponibles: ';

  const handleColorChange = (event) => {
    setColorChecked(event.target.checked);
  };

  return (
    <Card>
      <FormGroup sx={{ margin: 3 }}>
        <Typography
          variant='h5'
          fontWeight='bold'
          className={classes.colorsTitle}
        >
          {colors}
        </Typography>
        <Grid container spacing={1} padding={2}>
          {data.options.colors.map((color, index) => {
            return (
              <Grid item key={index}>
                <FormControlLabel
                  label={color.name}
                  control={
                    <Checkbox
                      key={color.code}
                      className={classes.colorCheckBox}
                      checked={colorChecked}
                      onChange={handleColorChange}
                      inputProps={{ 'arial-label': 'color-check' }}
                    />
                  }
                />
              </Grid>
            );
          })}
        </Grid>
        <Typography
          variant='h5'
          fontWeight='bold'
          className={classes.storageTitle}
        >
          {storage}
        </Typography>
        <Grid container spacing={1} padding={2}>
          {data.options.storages.map((storage, index) => {
            return (
              <Grid item key={index}>
                <FormControlLabel
                  label={storage.name}
                  control={
                    <Checkbox
                      title={storage.name}
                      key={storage.code}
                      checked
                      inputProps={{ 'arial-label': 'storage-check' }}
                    />
                  }
                />
              </Grid>
            );
          })}
        </Grid>
      </FormGroup>
      <Box>
        <Button
          buttonType='primary'
          title='Add to Shopping cart'
          sx={{
            display: 'flex',
            width: '-webkit-fill-available',
            marginLeft: 3,
            marginRight: 3,
            marginBottom: 3,
            padding: 2,
            background: backgroundColor
          }}
          startIcon={<ShoppingCartCheckoutIcon />}
        />
      </Box>
    </Card>
  );
}
