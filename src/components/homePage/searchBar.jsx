import SearchIcon from '@mui/icons-material/Search';
import { Box, InputBase } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useEffect, useState } from 'react';

import { useGetAllItems } from '../../api/useGetAllItems.js';
import { useDataContext } from '../../context/dataContext.jsx';

const useStyles = makeStyles({
    box: {
        display: 'flex',
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 30,
        position: 'relative',
        width: 'auto'
    },
    searchBarIcon: {
        marginLeft: -195,
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        color: 'rgb(0,0,0,0.6)'
    },
    input: {
        background: 'rgb(0,0,0,0.1)',
        opacity: 0.7,
        borderRadius: 5,
        padding: 5,
        paddingLeft: 35
    },
    coloredLine: {
        borderTop: '0.1em solid  rgb(0,0,0,0.1)'
    },
    container: {
        flexDirection: 'column',
        marginTop: 10,
        marginBottom: 5,
        justifyContent: 'center'
    }
});

export function SearchBar() {
    const classes = useStyles();
    const { data } = useGetAllItems();
    const [, setFilteredData] = useDataContext();
    const [query, setQuery] = useState('');

    useEffect(() => {
        if (data) {
            setFilteredData(() =>
                data.filter((item) =>
                    query === ''
                        ? item
                        : item.model
                            .toLowerCase()
                            .includes(query.toLowerCase()) && item
                )
            );
        }
    }, [data, query, setFilteredData]);

    const ColoredLine = () => <div className={classes.coloredLine}></div>;
    return (
        <div className={classes.container}>
            <ColoredLine />
            <Box component='div' className={classes.box}>
                <div className={classes.searchBarIcon}>
                    <SearchIcon />
                </div>
                <InputBase
                    type='text'
                    className={classes.input}
                    placeholder='Search...'
                    data-testid='search-input'
                    onChange={(event) => setQuery(event.target.value)}
                    value={query}
                />
            </Box>
            <ColoredLine />
        </div>
    );
}
