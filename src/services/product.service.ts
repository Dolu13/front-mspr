import type { Product } from '../types/Product';
import { useAuth0 } from '@auth0/auth0-react';
import { mockProducts } from '../data/mockData';

export const useProductService = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getProducts = async (): Promise<Product[]> => {
    // Simuler un délai réseau
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockProducts;
  };

  const getProduct = async (id: number): Promise<Product> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const product = mockProducts.find(p => p.id === id);
    if (!product) {
      throw new Error('Produit non trouvé');
    }
    return product;
  };

  const createProduct = async (product: Omit<Product, 'id'>): Promise<Product> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newProduct = {
      ...product,
      id: Math.max(...mockProducts.map(p => p.id)) + 1
    };
    mockProducts.push(newProduct);
    return newProduct;
  };

  const updateProduct = async (id: number, product: Partial<Product>): Promise<Product> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = mockProducts.findIndex(p => p.id === id);
    if (index === -1) {
      throw new Error('Produit non trouvé');
    }
    mockProducts[index] = { ...mockProducts[index], ...product };
    return mockProducts[index];
  };

  const deleteProduct = async (id: number): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = mockProducts.findIndex(p => p.id === id);
    if (index === -1) {
      throw new Error('Produit non trouvé');
    }
    mockProducts.splice(index, 1);
  };

  return {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
  };
};