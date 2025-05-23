import { Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';
import type { Product } from '../types/Product';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const navigate = useNavigate();

  return (
    <Card className="fade-in" sx={{ 
      maxWidth: 345, 
      m: 2,
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    }}>
      <CardMedia
        component="img"
        height="240"
        image={product.image}
        alt={product.name}
        sx={{
          objectFit: 'cover',
          borderBottom: '1px solid',
          borderColor: 'divider'
        }}
      />
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 600 }}>
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flexGrow: 1 }}>
          {product.description}
        </Typography>
        <Box sx={{ mt: 'auto' }}>
          <Typography variant="h6" color="primary" sx={{ mb: 2, fontWeight: 600 }}>
            {product.price.toFixed(2)} €
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            fullWidth 
            onClick={() => navigate(`/product/${product.id}`)}
            sx={{
              py: 1.5,
              fontSize: '1rem'
            }}
          >
            Voir le produit
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;