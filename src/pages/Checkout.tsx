import { useState } from 'react';
import { 
  Container, 
  Paper, 
  Typography, 
  Box, 
  Grid, 
  TextField, 
  Button,
  Stepper,
  Step,
  StepLabel,
  Divider,
  Alert
} from '@mui/material';
import { useCart } from '../context/CartContext';
import { useAuth0 } from '@auth0/auth0-react';

const steps = ['Panier', 'Livraison', 'Paiement', 'Confirmation'];

export const Checkout = () => {
  const { items, totalPrice } = useCart();
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const [activeStep, setActiveStep] = useState(0);
  const [deliveryInfo, setDeliveryInfo] = useState({
    address: '',
    city: '',
    postalCode: '',
    phone: ''
  });

  if (!isAuthenticated) {

    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="warning">
          Vous devez être connecté pour passer une commande.
        </Alert>
        <Button 
          variant="contained" 
          color="primary" 
          sx={{ mt: 2 }}
          onClick={() => loginWithRedirect()}
        >
          Se connecter
        </Button>
      </Container>
    );
  }

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleDeliveryInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDeliveryInfo({
      ...deliveryInfo,
      [e.target.name]: e.target.value
    });
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Récapitulatif de votre commande
            </Typography>
            {items.map((item) => (
              <Box key={item.product.id} sx={{ mb: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={8}>
                    <Typography>{item.product.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Quantité: {item.quantity}
                    </Typography>
                  </Grid>
                  <Grid item xs={4} sx={{ textAlign: 'right' }}>
                    <Typography>
                      {(item.product.price * item.quantity).toFixed(2)} €
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            ))}
            <Divider sx={{ my: 2 }} />
            <Box sx={{ textAlign: 'right' }}>
              <Typography variant="h6">
                Total: {totalPrice.toFixed(2)} €
              </Typography>
            </Box>
          </Box>
        );
      case 1:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Informations de livraison
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Adresse"
                  name="address"
                  value={deliveryInfo.address}
                  onChange={handleDeliveryInfoChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Ville"
                  name="city"
                  value={deliveryInfo.city}
                  onChange={handleDeliveryInfoChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Code postal"
                  name="postalCode"
                  value={deliveryInfo.postalCode}
                  onChange={handleDeliveryInfoChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Téléphone"
                  name="phone"
                  value={deliveryInfo.phone}
                  onChange={handleDeliveryInfoChange}
                />
              </Grid>
            </Grid>
          </Box>
        );
      case 2:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Paiement
            </Typography>
            <Alert severity="info" sx={{ mb: 2 }}>
              Cette fonctionnalité sera bientôt disponible.
            </Alert>
            <Typography>
              Pour le moment, nous acceptons uniquement le paiement à la livraison.
            </Typography>
          </Box>
        );
      case 3:
        return (
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h5" gutterBottom>
              Commande confirmée !
            </Typography>
            <Typography>
              Merci pour votre commande. Vous recevrez un email de confirmation.
            </Typography>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {renderStepContent(activeStep)}

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
          {activeStep !== 0 && (
            <Button onClick={handleBack} sx={{ mr: 1 }}>
              Retour
            </Button>
          )}
          {activeStep !== steps.length - 1 && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleNext}
            >
              {activeStep === steps.length - 2 ? 'Confirmer' : 'Suivant'}
            </Button>
          )}
        </Box>
      </Paper>
    </Container>
  );
};