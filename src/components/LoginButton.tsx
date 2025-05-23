import { Button } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

export const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated, logout } = useAuth0();
  const navigate = useNavigate();

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
    <><Button
      color="inherit"
      onClick={() => loginWithRedirect()}
    >
      Connexion
    </Button><Button
      color="inherit"
      onClick={() =>  navigate('/cart')}
    >
        Admin
      </Button></>
  );
};