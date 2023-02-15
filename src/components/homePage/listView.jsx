import { Box, Grid } from '@mui/material';

import { ItemContainer } from './itemContainer.jsx';

export function ListView({ filteredData }) {
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
              id={item.id}
            />
          ))}
      </Grid>
    </Box>
  );
}
