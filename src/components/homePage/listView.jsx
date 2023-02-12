import { Box, Grid } from '@mui/material';
import { useEffect } from 'react';

import { ItemContainer } from './itemContainer.jsx';

import useGetAllItems from '../../api/useGetAllItems';
import { useDataContext } from '../../context/dataContext.jsx';

export function ListView() {
  const { data, isSuccess } = useGetAllItems();
  const [filteredData, setFilteredData] = useDataContext();

  useEffect(() => {
    if (data && isSuccess && filteredData.length === 0) {
      setFilteredData(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, filteredData, isSuccess]);

  console.log(filteredData);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container item>
        {filteredData &&
          filteredData.map((item) => (
            <ItemContainer
              key={item.id}
              imageURL={item.imgUrl}
              brand={item.brand}
              model={item.model}
              price={item.price}
            />
          ))}
      </Grid>
    </Box>
  );
}
