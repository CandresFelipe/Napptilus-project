import { Card, List, ListItem, ListItemText, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useCallback, useEffect, useState } from 'react';

import {
    convertStringToUpperCase,
    isValidUrl
} from '../../utils/errors/helpers';

const useStyles = makeStyles({
    list: {
        maxWidth: 400,
        maxHeight: 700,
        width: '100%',
        background: 'white',
        overflowY: 'auto',
        '&::-webkit-scrollbar': {
            width: '0.2em'
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0,0,0,.1)',
            outline: '0.5px 0.5px solid slategrey'
        },
        overflowX: 'hidden'
    },
    key: {
        fontWeight: 'bold',
        color: 'red'
    },
    card: {
        padding: 20
    },
    container: {}
});

export function DeviceDetails({ data }) {
    const classes = useStyles();
    const [detailsList, setDetailsList] = useState();
    const title = 'Detalles del producto';

    const listedDetails = useCallback(() => {
        if (data) {
            for (const [key, value] of Object.entries(data)) {
                if (Array.isArray(value)) {
                    data[key] = value.toString();
                }
                if (
                    isValidUrl(value) ||
                    key === 'id' ||
                    typeof value === 'object'
                ) {
                    continue;
                } else {
                    setDetailsList((prev) => ({ ...prev, [key]: value }));
                }
            }
        }
    }, [data]);

    useEffect(() => {
        listedDetails();
    }, [listedDetails]);

    return (
        <Card
            component='div'
            data-testid='grid-details'
            className={classes.card}
        >
            <Typography
                variant='h5'
                fontWeight='bold'
                padding={1}
                color='black'
            >
                {title}
            </Typography>
            <Card className={classes.card}>
                <List className={classes.list} data-listid='list-details'>
                    {detailsList !== undefined &&
                        Object.entries(detailsList).map(
                            ([key, value], index) => {
                                return (
                                    <ListItem key={index} sx={{ padding: 0 }}>
                                        <ListItemText
                                            primary={
                                                <React.Fragment>
                                                    <Typography
                                                        styles={classes.key}
                                                        fontWeight='bold'
                                                        component='span'
                                                        color='black'
                                                    >
                                                        {convertStringToUpperCase(
                                                            key
                                                        )}
                                                    </Typography>
                                                </React.Fragment>
                                            }
                                            secondary={
                                                <React.Fragment>
                                                    <Typography
                                                        component='span'
                                                        variant='body2'
                                                        color='color'
                                                    >
                                                        {value === ''
                                                            ? 'No se define'
                                                            : value}
                                                    </Typography>
                                                </React.Fragment>
                                            }
                                        />
                                    </ListItem>
                                );
                            }
                        )}
                </List>
            </Card>
        </Card>
    );
}
