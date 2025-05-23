import { Button } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';

export const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated, logout } = useAuth0();

  if (isAuthenticated) {
    return (
      <Button 
        color="inherit" 
        onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
      >
        Déconnexion
      </Button>
    );
  }

  return (
    <Button 
      color="inherit" 
      onClick={() => loginWithRedirect()}
    >
      Connexion
    </Button>
  );
};