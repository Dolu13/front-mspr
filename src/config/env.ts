import dotenv from 'dotenv';

// Charger les variables d'environnement
dotenv.config();

export const env = {
  API_URL: process.env.VITE_API_URL || 'http://localhost:3000/api',
  AUTH0: {
    DOMAIN: process.env.VITE_AUTH0_DOMAIN || 'dev-k64wxrcch0zk54zn.us.auth0.com',
    CLIENT_ID: process.env.VITE_AUTH0_CLIENT_ID || 'obPlAa9GMWdxSt7e91kvY1QUb7eJNzSh',
    AUDIENCE: process.env.VITE_AUTH0_AUDIENCE || 'https://dev-k64wxrcch0zk54zn.us.auth0.com/api/v2/',
    NAMESPACE: process.env.VITE_AUTH0_NAMESPACE || 'https://payetonkawa.com/'
  }
} as const;