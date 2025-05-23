import { useAuth0 } from '@auth0/auth0-react';
import { mockOrders } from '../data/mockData';

export interface OrderItem {
  productId: number;
  quantity: number;
  price: number;
}

export interface Order {
  id: number;
  userId: string;
  items: OrderItem[];
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  total: number;
  createdAt: string;
  updatedAt: string;
}

export const useOrderService = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getOrders = async (): Promise<Order[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockOrders;
  };

  const getOrder = async (id: number): Promise<Order> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const order = mockOrders.find(o => o.id === id);
    if (!order) {
      throw new Error('Commande non trouvée');
    }
    return order;
  };

  const createOrder = async (items: OrderItem[]): Promise<Order> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newOrder: Order = {
      id: Math.max(...mockOrders.map(o => o.id)) + 1,
      userId: "user123", // Simulé
      items,
      status: "pending",
      total: items.reduce((sum, item) => sum + (item.price * item.quantity), 0),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    mockOrders.push(newOrder);
    return newOrder;
  };

  const updateOrderStatus = async (id: number, status: Order['status']): Promise<Order> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const order = mockOrders.find(o => o.id === id);
    if (!order) {
      throw new Error('Commande non trouvée');
    }
    order.status = status;
    order.updatedAt = new Date().toISOString();
    return order;
  };

  return {
    getOrders,
    getOrder,
    createOrder,
    updateOrderStatus
  };
};