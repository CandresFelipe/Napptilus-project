import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';
import { Badge, IconButton } from '@mui/material';

export function PurchaseCart() {
  return (
    <IconButton size='large' arial-label='purchase-cart' color='inherit'>
      <Badge badgeContent={4} color='error'>
        <ShoppingCartTwoToneIcon />
      </Badge>
    </IconButton>
  );
}
