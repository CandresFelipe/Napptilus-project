import SearchIcon from '@mui/icons-material/Search';
import { Box, InputBase } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useCallback, useState } from 'react';

import { useDataContext } from '../../context/dataContext.jsx';

const useStyles = makeStyles({
  box: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 30,
    position: 'relative',
    width: 'auto'
  },
  searchBarIcon: {
    marginLeft: 5,
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
    marginTop: 90,
    marginBottom: 5,
    justifyContent: 'center'
  }
});

export function SearchBar() {
  const classes = useStyles();
  const [filteredData, setFilteredData] = useDataContext();
  const [val, setVal] = useState('');

  const _onChange = useCallback(
    (event) => {
      const value = event.target.value;
      console.log(value);
      setVal(value);
      if (value !== '') {
        setFilteredData(
          filteredData.filter((item) => item.model.includes(value))
        );
      } else {
        setFilteredData([]);
      }
    },
    [filteredData, setFilteredData]
  );

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
          inputProps={{ 'aria-label': 'search' }}
          onChange={_onChange}
          value={val}
        />
      </Box>
      <ColoredLine />
    </div>
  );
}
