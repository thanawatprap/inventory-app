// src/hooks/useInventory.ts
import { useState } from 'react';
import type { Product } from '../types';

export const useInventory = () => {
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: 'MacBook Pro 14"', price: 59900, quantity: 5 },
    { id: 2, name: 'iPhone 16 Pro', price: 42900, quantity: 12 },
    { id: 3, name: 'AirPods Pro', price: 9990, quantity: 0 },
    { id: 4, name: 'iPad Air', price: 21900, quantity: 3 },
  ]);

  const addProduct = (name: string, price: number, quantity: number) => {
    setProducts(prev => [
      ...prev,
      { id: Date.now(), name, price, quantity },
    ]);
  };

  const updateQuantity = (id: number, delta: number) => {
    setProducts(prev =>
      prev.map(p =>
        p.id === id
          ? { ...p, quantity: Math.max(0, p.quantity + delta) }
          : p
      )
    );
  };

  const deleteProduct = (id: number) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  return { products, addProduct, updateQuantity, deleteProduct };
};
