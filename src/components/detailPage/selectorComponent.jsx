import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { Box, Card, Checkbox, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { usePostItemToCartQuery } from '../../api/postItemToCart';
import { Button } from '../../common/Elements/Button';
import { Modal } from '../../common/Elements/Modal';
import { useItemInCartContext } from '../../context/itemsInCartContext.jsx';

const backgroundColor = '#FF8E53';
const useStyles = makeStyles({
    colorsTitle: { display: 'flex', paddingTop: 25 },
    storageTitle: { display: 'flex', textAlign: 'left' },
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
    },
    card: {
        paddingTop: 25,
        paddingLeft: 10,
        paddingBottom: 25,
        height: '100%'
    }
});

export function SelectorComponent({ options }) {
    const [disabled, setDisabled] = useState(true);
    const { id } = useParams();
    const [, setItems] = useItemInCartContext();
    const mutate = usePostItemToCartQuery();
    const [isCloseModal, setIsCloseModal] = useState(false);
    const [_options, setOptions] = useState({
        colors: [
            {
                name: undefined,
                code: undefined,
                checked: false
            }
        ],
        storages: [
            {
                name: undefined,
                code: undefined,
                checked: false
            }
        ]
    });
    const classes = useStyles();
    const storage = 'Almacenamiento disponible: ';
    const colors = 'Colores disponibles: ';

    useEffect(() => {
        const initOptions = () => {
            if (options) {
                for (const [key, value] of Object.entries(options)) {
                    let details;
                    if (value.length == 1) {
                        details = value.map((val) => ({
                            ...val,
                            checked: true
                        }));
                    } else {
                        details = value.map((val) => ({
                            ...val,
                            checked: false
                        }));
                    }
                    setOptions((prev) => ({
                        ...prev,
                        [key]: details
                    }));
                }
            }
        };
        initOptions();
    }, [options]);

    useEffect(() => {
        if (_options) {
            let allChecked;
            for (const [key, value] of Object.entries(_options)) {
                allChecked = {
                    ...allChecked,
                    [key]: value.find((val) => val.checked)
                };
            }
            if (
                typeof allChecked.colors != 'undefined' &&
                typeof allChecked.storages != 'undefined'
            ) {
                setDisabled(false);
            } else {
                setDisabled(true);
            }
        }
    }, [_options]);

    const onChangeStorageCheckBox = useCallback((event) => {
        const checked = event.target.checked;
        const code = event.target.value;
        setOptions((prev) => ({
            ...prev,
            storages: prev.storages.map((value) => {
                value.checked =
                    prev.storages.length == 1
                        ? true
                        : value.code == code
                        ? checked
                        : false;
                return {
                    ...value
                };
            })
        }));
    }, []);

    const onChangeColorCheckbox = useCallback((event) => {
        const checked = event.target.checked;
        const code = event.target.value;
        setOptions((prev) => ({
            ...prev,
            colors: prev.colors.map((value) => {
                value.checked =
                    prev.colors.length == 1
                        ? true
                        : value.code == code
                        ? checked
                        : false;
                return {
                    ...value
                };
            })
        }));
    }, []);

    const onSubmit = () => {
        if (_options) {
            const colorSelected = _options.colors.find((val) => val.checked);
            const storageSelected = _options.storages.find(
                (val) => val.checked
            );
            const obj = {
                id,
                colorCode: colorSelected.code,
                storageCode: storageSelected.code
            };
            mutate.mutate(obj, {
                onSuccess(data) {
                    setItems((prev) => prev + data.data.count);
                    setIsCloseModal(true);
                },
                onError() {
                    setIsCloseModal(true);
                }
            });
        }
    };

    return (
        <Box>
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
            <Card className={classes.card}>
                <Typography
                    variant='h5'
                    fontWeight='bold'
                    className={classes.colorsTitle}
                    color='black'
                >
                    {colors}
                </Typography>
                <Grid container spacing={1} padding={2}>
                    {_options.colors.map((color, index) => {
                        return (
                            <Grid item key={index} className={classes.subGrid}>
                                <Checkbox
                                    key={color.code}
                                    className={classes.colorCheckBox}
                                    checked={
                                        _options.colors.length == 1
                                            ? true
                                            : color.checked
                                    }
                                    value={color.code}
                                    role='checkbox'
                                    onChange={onChangeColorCheckbox}
                                    data-testid='color-checkbox'
                                />
                                <Typography color='black' textAlign='left'>
                                    {color.name}
                                </Typography>
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
                    {_options.storages.map((storage, index) => {
                        return (
                            <Grid item key={index} className={classes.subGrid}>
                                <Checkbox
                                    key={storage.code}
                                    role='checkbox'
                                    value={storage.code}
                                    checked={
                                        _options.storages.length == 1
                                            ? true
                                            : storage.checked
                                    }
                                    onChange={onChangeStorageCheckBox}
                                    data-testid='storage-checkbox'
                                />
                                <Typography color='black' textAlign='left'>
                                    {storage.name}
                                </Typography>
                            </Grid>
                        );
                    })}
                </Grid>
                <Button
                    disabled={disabled}
                    buttonType='primary'
                    title='Add to Shopping cart'
                    sx={{
                        display: 'flex',
                        width: '-webkit-fill-available',
                        marginRight: 2,
                        padding: 2,
                        background: backgroundColor,
                        bottom: 10
                    }}
                    onClick={onSubmit}
                    startIcon={<ShoppingCartCheckoutIcon />}
                />
            </Card>
        </Box>
    );
}
