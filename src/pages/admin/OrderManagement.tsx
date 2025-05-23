import { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useAuth0 } from '@auth0/auth0-react';

// Type pour les commandes (à adapter selon votre structure)
interface Order {
  id: number;
  customerName: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  total: number;
  items: {
    productName: string;
    quantity: number;
    price: number;
  }[];
}

// Données de test (à remplacer par vos vraies données)
const mockOrders: Order[] = [
  {
    id: 1,
    customerName: 'John Doe',
    date: '2024-03-20',
    status: 'pending',
    total: 99.99,
    items: [
      { productName: 'Produit 1', quantity: 2, price: 49.99 }
    ]
  },
  // Ajoutez d'autres commandes de test ici
];

const getStatusColor = (status: Order['status']) => {
  switch (status) {
    case 'pending':
      return 'warning';
    case 'processing':
      return 'info';
    case 'shipped':
      return 'primary';
    case 'delivered':
      return 'success';
    default:
      return 'default';
  }
};

const getStatusLabel = (status: Order['status']) => {
  switch (status) {
    case 'pending':
      return 'En attente';
    case 'processing':
      return 'En traitement';
    case 'shipped':
      return 'Expédiée';
    case 'delivered':
      return 'Livrée';
    default:
      return status;
  }
};

export const OrderManagement = () => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [open, setOpen] = useState(false);

  // Vérifier le rôle admin
  const checkAdminRole = async () => {
    try {
      const token = await getAccessTokenSilently();
      const response = await fetch('https://dev-k64wxrcch0zk54zn.us.auth0.com/api/v2/userinfo', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const userInfo = await response.json();
      setIsAdmin(userInfo['https://payetonkawa.com/roles']?.includes('admin'));
    } catch (error) {
      console.error('Erreur lors de la vérification du rôle:', error);
      setIsAdmin(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      checkAdminRole();
    }
  }, [isAuthenticated]);


  const handleOpen = (order: Order) => {
    setSelectedOrder(order);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedOrder(null);
  };

  const handleStatusChange = async (orderId: number, newStatus: Order['status']) => {
    try {
      const token = await getAccessTokenSilently();
      // Ici, vous devrez implémenter l'appel API pour mettre à jour le statut
      console.log('Mise à jour du statut:', orderId, newStatus);
      // Exemple d'appel API :
      // await fetch(`/api/orders/${orderId}/status`, {
      //   method: 'PUT',
      //   headers: {
      //     'Authorization': `Bearer ${token}`,
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify({ status: newStatus })
      // });
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut:', error);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Gestion des commandes
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Client</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Statut</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.customerName}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>
                  <Chip
                    label={getStatusLabel(order.status)}
                    color={getStatusColor(order.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>{order.total.toFixed(2)} €</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleOpen(order)}
                  >
                    <VisibilityIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>
          Détails de la commande #{selectedOrder?.id}
        </DialogTitle>
        <DialogContent>
          {selectedOrder && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                Client: {selectedOrder.customerName}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Date: {selectedOrder.date}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Statut actuel: {getStatusLabel(selectedOrder.status)}
              </Typography>
              
              <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
                Articles
              </Typography>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Produit</TableCell>
                      <TableCell>Quantité</TableCell>
                      <TableCell>Prix unitaire</TableCell>
                      <TableCell>Total</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedOrder.items.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item.productName}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>{item.price.toFixed(2)} €</TableCell>
                        <TableCell>
                          {(item.quantity * item.price).toFixed(2)} €
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <Box sx={{ mt: 3, display: 'flex', gap: 1 }}>
                <Button
                  variant="outlined"
                  color="info"
                  onClick={() => handleStatusChange(selectedOrder.id, 'processing')}
                  disabled={selectedOrder.status === 'processing'}
                >
                  Marquer comme en traitement
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleStatusChange(selectedOrder.id, 'shipped')}
                  disabled={selectedOrder.status === 'shipped'}
                >
                  Marquer comme expédiée
                </Button>
                <Button
                  variant="outlined"
                  color="success"
                  onClick={() => handleStatusChange(selectedOrder.id, 'delivered')}
                  disabled={selectedOrder.status === 'delivered'}
                >
                  Marquer comme livrée
                </Button>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Fermer</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};