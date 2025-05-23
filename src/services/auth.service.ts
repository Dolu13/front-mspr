import { useAuth0 } from '@auth0/auth0-react';

const AUTH0_DOMAIN = process.env.VITE_AUTH0_DOMAIN;
const NAMESPACE = process.env.VITE_AUTH0_NAMESPACE;
export interface UserInfo {
  sub: string;
  email: string;
  name: string;
  roles?: string[];
  [key: string]: any;
}

export const useAuthService = () => {
  const { getAccessTokenSilently, user } = useAuth0();

  const getUserInfo = async (): Promise<UserInfo> => {
    try {
      const token = await getAccessTokenSilently();
      const response = await fetch(`https://${AUTH0_DOMAIN}/userinfo`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des informations utilisateur');
      }

      const userInfo = await response.json();
      console.log(userInfo[`${NAMESPACE}roles`]);
      return {
        ...userInfo,
        roles: userInfo[`${NAMESPACE}roles`] || []
      };
    } catch (error) {
      console.error('Erreur AuthService:', error);
      throw error;
    }
  };

  const hasRole = async (role: string): Promise<boolean> => {
    try {
      const userInfo = await getUserInfo();
      return userInfo.roles?.includes(role) || false;
    } catch (error) {
      console.error('Erreur lors de la vérification du rôle:', error);
      return false;
    }
  };

  return {
    getUserInfo,
    hasRole,
    user
  };
};