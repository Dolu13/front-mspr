import { Button, Menu, MenuItem, Avatar } from '@mui/material';
import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

export const ProfileButton = () => {
  const { user, isAuthenticated } = useAuth0();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  if (!isAuthenticated || !user) {
    return null;
  }

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    handleClose();
    navigate('/profile');
  };

  return (
    <>
      <Button
        onClick={handleMenu}
        sx={{ color: 'white', ml: 2 }}
      >
        <Avatar 
          src={user.picture} 
          alt={user.name}
          sx={{ width: 32, height: 32, mr: 1 }}
        />
        {user.name}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleProfile}>Mon Profil</MenuItem>
        <MenuItem onClick={handleClose}>Mes Commandes</MenuItem>
      </Menu>
    </>
  );
};