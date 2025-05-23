import { Badge, IconButton, Tooltip } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

export const CartIcon = () => {
  const { totalItems } = useCart();
  const navigate = useNavigate();

  return (
    <Tooltip title="Voir le panier">
      <IconButton 
        color="inherit" 
        onClick={() => navigate('/cart')}
        sx={{ ml: 2 }}
      >
        <Badge badgeContent={totalItems} color="secondary">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
    </Tooltip>
  );
};