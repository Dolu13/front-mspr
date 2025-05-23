import { Container, Typography, Box, Button, IconButton, Divider } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

export const Cart = () => {
  const { items, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Votre panier est vide
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          href="/"
          sx={{ mt: 2 }}
        >
          Continuer vos achats
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h4" gutterBottom>
        Votre panier
      </Typography>
      
      {items.map((item) => (
        <Box key={item.product.id} sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <img
              src={item.product.image}
              alt={item.product.name}
              style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 8 }}
            />
            <Box sx={{ ml: 2, flexGrow: 1 }}>
              <Typography variant="h6">{item.product.name}</Typography>
              <Typography color="text.secondary">
                {item.product.price.toFixed(2)} €
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton 
                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                size="small"
              >
                <RemoveIcon />
              </IconButton>
              <Typography sx={{ mx: 2 }}>{item.quantity}</Typography>
              <IconButton 
                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                size="small"
              >
                <AddIcon />
              </IconButton>
              <IconButton 
                onClick={() => removeFromCart(item.product.id)}
                color="error"
                sx={{ ml: 2 }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          </Box>
          <Divider />
        </Box>
      ))}

      <Box sx={{ mt: 4, textAlign: 'right' }}>
        <Typography variant="h5" gutterBottom>
          Total: {totalPrice.toFixed(2)} €
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Button 
            variant="outlined" 
            color="error" 
            onClick={clearCart}
            sx={{ mr: 2 }}
          >
            Vider le panier
          </Button>
          <Button 
            variant="contained" 
            color="primary"
            size="large"
            onClick={() => navigate('/checkout')}
          >
            Passer la commande
          </Button>
        </Box>
      </Box>
    </Container>
  );
};