import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import api from '../utils/api';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const refreshCart = useCallback(async () => {
    if (!isAuthenticated) { setItems([]); return; }
    setLoading(true);
    try {
      const { data } = await api.get('/cart');
      setItems(data.items || []);
    } catch { /* silent — cart badge just stays empty */ }
    finally { setLoading(false); }
  }, [isAuthenticated]);

  useEffect(() => { refreshCart(); }, [refreshCart]);

  const addToCart = async (courseId) => {
    try {
      const { data } = await api.post('/cart', { courseId });
      setItems(data.items || []);
      toast.success('Added to cart');
      return true;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not add to cart');
      return false;
    }
  };

  const removeFromCart = async (courseId) => {
    try {
      const { data } = await api.delete(`/cart/${courseId}`);
      setItems(data.items || []);
    } catch { toast.error('Could not remove item'); }
  };

  const clearCart = async () => {
    try {
      await api.delete('/cart');
      setItems([]);
    } catch { /* ignore */ }
  };

  const isInCart = (courseId) => items.some(i => i._id === courseId);

  return (
    <CartContext.Provider value={{ items, loading, count: items.length, addToCart, removeFromCart, clearCart, isInCart, refreshCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};
