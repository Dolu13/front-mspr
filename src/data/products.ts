import type { Product } from '../types/Product';

export const products: Product[] = [
  {
    id: 1,
    name: "Smartphone XYZ",
    description: "Un smartphone puissant avec un excellent appareil photo",
    price: 699.99,
    image: "https://picsum.photos/300/100",
    category: "Électronique"
  },
  {
    id: 2,
    name: "Laptop Pro",
    description: "Ordinateur portable performant pour les professionnels",
    price: 1299.99,
    image: "https://picsum.photos/300/100",
    category: "Électronique"
  },
  {
    id: 3,
    name: "Casque Audio Premium",
    description: "Casque sans fil avec réduction de bruit",
    price: 249.99,
    image: "https://picsum.photos/300/100",
    category: "Audio"
  }
];