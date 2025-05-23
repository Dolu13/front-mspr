import { useParams } from 'react-router-dom';
import { Container, Grid, Typography, Button, Box, Paper } from '@mui/material';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';

export const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const product = products.find(p => p.id === Number(id));

  if (!product) {
    return (
      <Container>
        <Typography variant="h5">Produit non trouvé</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Paper 
        elevation={0} 
        sx={{ 
          p: 4, 
          borderRadius: 4,
          background: 'linear-gradient(145deg, #ffffff, #f8fafc)',
        }}
      >
        <Grid container spacing={6}>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src={product.image}
              alt={product.name}
              sx={{
                width: '100%',
                height: 'auto',
                borderRadius: 4,
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography 
              variant="h3" 
              component="h1" 
              gutterBottom
              sx={{ 
                fontWeight: 700,
                mb: 2
              }}
            >
              {product.name}
            </Typography>
            <Typography 
              variant="h4" 
              color="primary" 
              gutterBottom
              sx={{ 
                fontWeight: 600,
                mb: 3
              }}
            >
              {product.price.toFixed(2)} €
            </Typography>
            <Typography 
              variant="body1" 
              paragraph
              sx={{ 
                fontSize: '1.1rem',
                lineHeight: 1.7,
                mb: 4,
                color: 'text.secondary'
              }}
            >
              {product.description}
            </Typography>
            <Box sx={{ mt: 4 }}>
              <Button 
                variant="contained" 
                color="primary" 
                size="large"
                onClick={() => addToCart(product)}
                sx={{
                  py: 2,
                  px: 4,
                  fontSize: '1.1rem',
                  borderRadius: 2
                }}
              >
                Ajouter au panier
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};