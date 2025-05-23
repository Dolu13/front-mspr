import type { Product } from '../types/Product';
import type { Order, OrderItem } from '../services/order.service';

export const mockProducts: Product[] = [
  {
    id: 1,
    name: "Café Arabica",
    description: "Un café doux et aromatique",
    price: 4.50,
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085",
    category: "Café"
  },
  {
    id: 2,
    name: "Café Robusta",
    description: "Un café corsé et intense",
    price: 3.90,
    image: "https://images.unsplash.com/photo-1497936920826-08cb0f0b1f0b",
    category: "Café"
  },
  {
    id: 3,
    name: "Thé Vert",
    description: "Un thé frais et délicat",
    price: 3.20,
    image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9",
    category: "Thé"
  }
];

export const mockOrders: Order[] = [
  {
    id: 1,
    userId: "user123",
    items: [
      { productId: 1, quantity: 2, price: 4.50 },
      { productId: 3, quantity: 1, price: 3.20 }
    ],
    status: "pending",
    total: 12.20,
    createdAt: "2024-03-20T10:00:00Z",
    updatedAt: "2024-03-20T10:00:00Z"
  },
  {
    id: 2,
    userId: "user123",
    items: [
      { productId: 2, quantity: 1, price: 3.90 }
    ],
    status: "delivered",
    total: 3.90,
    createdAt: "2024-03-19T15:30:00Z",
    updatedAt: "2024-03-20T09:00:00Z"
  }
];

export const mockUserInfo = {
  sub: "user123",
  email: "test@example.com",
  name: "Test User",
  roles: ["user"]
};