import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';
import { Badge, IconButton } from '@mui/material';

import { useItemInCartContext } from '../../context/itemsInCartContext.jsx';

export function PurchaseCart() {
    const [items] = useItemInCartContext();
    return (
        <IconButton size='large' arial-label='purchase-cart' color='inherit'>
            <Badge badgeContent={items} color='error'>
                <ShoppingCartTwoToneIcon />
            </Badge>
        </IconButton>
    );
}
