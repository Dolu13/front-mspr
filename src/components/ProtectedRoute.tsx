import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Navigate } from 'react-router-dom';
import { CircularProgress, Container, Typography } from '@mui/material';
import { useAuthService } from '../services/auth.service';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: string;
}

export const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading } = useAuth0();
  const { hasRole } = useAuthService();
  const [hasRequiredRole, setHasRequiredRole] = useState<boolean | null>(null);

  useEffect(() => {
    const checkRole = async () => {
      if (!isAuthenticated || !requiredRole) {
        setHasRequiredRole(true);
        return;
      }

      try {
        const hasRoleResult = await hasRole(requiredRole);
        setHasRequiredRole(hasRoleResult);
      } catch (error) {
        console.error('Erreur lors de la vérification du rôle:', error);
        setHasRequiredRole(false);
      }
    };

    checkRole();
  }, [isAuthenticated, requiredRole, hasRole]);

  if (isLoading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (hasRequiredRole === null) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!hasRequiredRole) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography variant="h5" color="error">
          Accès non autorisé. Vous n'avez pas les permissions nécessaires.
        </Typography>
      </Container>
    );
  }

  return <>{children}</>;
};