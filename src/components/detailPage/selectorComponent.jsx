import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { Box, Card, Checkbox, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import usePostItemToCartQuery from '../../api/postItemToCart';
import { Button } from '../../common/Elements/Button';
import { Modal } from '../../common/Elements/Modal';
import { useItemInCartContext } from '../../context/itemsInCartContext.jsx';

const backgroundColor = '#FF8E53';

const useStyles = makeStyles({
  colorsTitle: { display: 'flex', paddingLeft: 3, paddingTop: 3 },
  storageTitle: { display: 'flex', paddingLeft: 3 },
  colorCheckBox: {
    color: backgroundColor,
    '&.Mui-checked': {
      color: backgroundColor
    }
  },
  subGrid: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  }
});

export function SelectorComponent({ data }) {
  const [disabled, setDisabled] = useState(true);
  const { id } = useParams();
  const [, setItems] = useItemInCartContext();
  const mutate = usePostItemToCartQuery();
  const [isCloseModal, setIsCloseModal] = useState(false);
  const [storageChecked, setStorageChecked] = useState([
    {
      key: undefined,
      name: undefined,
      state: false,
      storageCode: undefined
    }
  ]);
  const [colorChecked, setColorChecked] = useState([
    {
      key: undefined,
      name: undefined,
      state: false,
      colorCode: undefined
    }
  ]);
  const classes = useStyles();
  const storage = 'Almacenamiento disponible: ';
  const colors = 'Colores disponibles: ';

  useEffect(() => {
    let countColor = 0;
    let countStorage = 0;
    const colorTemArr = [];
    const storageTemArr = [];
    if (data.options.colors.length === 1) {
      colorTemArr.push({
        key: 0,
        name: data.options.colors[0].name,
        state: true,
        colorCode: data.options.colors[0].code
      });
      setColorChecked(colorTemArr);
    } else {
      for (const [, value] of Object.entries(data.options.colors)) {
        colorTemArr.push({
          key: countColor,
          name: value.name,
          state: false,
          colorCode: value.code
        });
        setColorChecked(colorTemArr);
        countColor++;
      }
    }
    if (data.options.storages.length === 1) {
      storageTemArr.push({
        key: 0,
        name: data.options.storages[0].name,
        state: true,
        storageCode: data.options.storages[0].code
      });
      setStorageChecked(storageTemArr);
    } else {
      for (const [, value] of Object.entries(data.options.storages)) {
        storageTemArr.push({
          key: countStorage,
          name: value.name,
          state: false,
          storageCode: value.code
        });
        setStorageChecked(storageTemArr);
        countStorage++;
      }
    }
    if (
      data.options.storages.length === 1 &&
      data.options.colors.length === 1
    ) {
      setDisabled(false);
    }
    return () => {
      countColor = 0;
      countStorage = 0;
      setColorChecked([]);
      setStorageChecked([]);
      setDisabled(true);
    };
  }, [
    data.options.colors,
    data.options.storages,
    data.options.storages.length,
    data.options.colors.length
  ]);

  const handleColorChange = useCallback((event) => {
    const checked = event.target.checked;
    const value = event.target.value;
    setColorChecked((prev) =>
      prev.map((val) =>
        val.key == value ? { ...val, state: checked } : { ...val, state: false }
      )
    );
    setDisabled(!checked);
  }, []);

  const handleStorageChange = useCallback((event) => {
    const checked = event.target.checked;
    const value = event.target.value;
    setStorageChecked((prev) =>
      prev.map((val) =>
        val.key == value ? { ...val, state: checked } : { ...val, state: false }
      )
    );
    setDisabled(!checked);
  }, []);

  const onSubmit = () => {
    const colorSelected = colorChecked.filter((val) => val.state === true);
    const storageSelected = storageChecked.filter((val) => val.state === true);
    const obj = {
      id,
      colorCode: colorSelected[0].colorCode,
      storageCode: storageSelected[0].storageCode
    };
    console.log(obj);
    mutate.mutate(obj, {
      onSuccess(data) {
        setItems((prev) => prev + data.data.count);
        setIsCloseModal(true);
      },
      onError() {
        setIsCloseModal(true);
      }
    });
  };

  useEffect(() => {
    if (colorChecked.length > 1 && storageChecked.length > 1) {
      const colorState = colorChecked.some((val) => val.state == true);
      const storageState = storageChecked.some((val) => val.state == true);
      setDisabled(!(colorState && storageState));
    }
  }, [disabled, colorChecked, storageChecked]);

  return (
    <React.Fragment>
      {mutate.isLoading ? (
        <Modal
          modalType='loading'
          open={mutate.isLoading}
          onCloseModal={() => setIsCloseModal(false)}
        />
      ) : mutate.isError ? (
        <Modal
          modalType='error'
          open={isCloseModal}
          onCloseModal={() => setIsCloseModal(false)}
        />
      ) : mutate.isSuccess ? (
        <Modal
          modalType='success'
          open={isCloseModal}
          onCloseModal={() => setIsCloseModal(false)}
        />
      ) : null}
      <Card sx={{ paddingLeft: 2, paddingTop: 2, height: '100%' }}>
        <Typography
          variant='h5'
          fontWeight='bold'
          className={classes.colorsTitle}
          color='black'
        >
          {colors}
        </Typography>
        <Grid container spacing={1} padding={2}>
          {colorChecked.map((color, index) => {
            return (
              <Grid item key={index} className={classes.subGrid}>
                <Checkbox
                  className={classes.colorCheckBox}
                  checked={color.state}
                  value={index}
                  role='checkbox'
                  onChange={handleColorChange}
                  data-testid='color-checkbox'
                />
                <Typography color='black'>{color.name}</Typography>
              </Grid>
            );
          })}
        </Grid>
        <Typography
          variant='h5'
          fontWeight='bold'
          className={classes.storageTitle}
          color='black'
        >
          {storage}
        </Typography>
        <Grid container spacing={1} padding={2}>
          {storageChecked.map((storage, index) => {
            return (
              <Grid item key={index} className={classes.subGrid}>
                <Checkbox
                  role='checkbox'
                  value={index}
                  checked={storage.state}
                  onChange={handleStorageChange}
                  data-testid='storage-checkbox'
                />
                <Typography color='black'>{storage.name}</Typography>
              </Grid>
            );
          })}
        </Grid>
        <Box>
          <Button
            disabled={disabled}
            buttonType='primary'
            title='Add to Shopping cart'
            sx={{
              display: 'flex',
              width: '-webkit-fill-available',
              marginRight: 2,
              marginBottom: 3,
              padding: 2,
              background: backgroundColor,
              marginTop: 2
            }}
            onClick={onSubmit}
            startIcon={<ShoppingCartCheckoutIcon />}
          />
        </Box>
      </Card>
    </React.Fragment>
  );
}
