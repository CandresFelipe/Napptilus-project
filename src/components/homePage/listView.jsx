import { Grid } from '@mui/material';

import { ItemContainer } from './itemContainer.jsx';

export function ListView({ filteredData }) {
    return (
        <Grid container item lg={12} spacing={6}>
            {filteredData &&
                filteredData.map((item, index) => (
                    <ItemContainer
                        role={index}
                        key={item.id}
                        imageURL={item.imgUrl}
                        brand={item.brand}
                        model={item.model}
                        price={item.price}
                        id={item.id}
                    />
                ))}
        </Grid>
    );
}
