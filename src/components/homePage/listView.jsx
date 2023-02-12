import { Box, Grid } from '@mui/material';

import { ItemContainer } from './itemContainer.jsx';

import useGetAllItems from '../../api/useGetAllItems';

export function ListView() {
  const { data, isSuccess } = useGetAllItems();
  return (
    <Box sx={{ flexGrow: 1, marginTop: 20 }}>
      <Grid container item>
        {isSuccess &&
          data &&
          data.map((item) => (
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
