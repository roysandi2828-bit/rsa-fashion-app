import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import type { Product, CartItem, ViewType, AppContextType } from '@/types';

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const toggleDarkMode = useCallback(() => {
    setDarkMode(prev => !prev);
  }, []);

  const addToCart = useCallback((product: Product, size: string, qty = 1) => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item.id === product.id && item.size === size);
      if (existing) {
        return prevCart.map(item => 
          item.id === product.id && item.size === size 
            ? { ...item, qty: item.qty + qty }
            : item
        );
      } else {
        return [...prevCart, { ...product, size, qty }];
      }
    });
    setIsCartOpen(true);
  }, []);

  const removeFromCart = useCallback((id: number, size: string) => {
    setCart(prevCart => prevCart.filter(item => !(item.id === id && item.size === size)));
  }, []);

  const updateQty = useCallback((id: number, size: string, delta: number) => {
    setCart(prevCart => prevCart.map(item => {
      if (item.id === id && item.size === size) {
        const newQty = Math.max(1, item.qty + delta);
        return { ...item, qty: newQty };
      }
      return item;
    }));
  }, []);

  const toggleWishlist = useCallback((product: Product) => {
    setWishlist(prevWishlist => {
      const exists = prevWishlist.find(item => item.id === product.id);
      if (exists) {
        return prevWishlist.filter(item => item.id !== product.id);
      } else {
        return [...prevWishlist, product];
      }
    });
  }, []);

  const isInWishlist = useCallback((id: number) => {
    return wishlist.some(item => item.id === id);
  }, [wishlist]);

  const cartTotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  }, [cart]);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const handleCategoryClick = useCallback((category: string) => {
    if (category === 'New Arrivals') {
      setActiveCategory('All');
    } else if (category === 'Sale') {
      setActiveCategory('All');
    } else {
      setActiveCategory(category);
    }
    setCurrentView('catalog');
  }, []);

  const value = useMemo(() => ({
    darkMode,
    toggleDarkMode,
    cart,
    addToCart,
    removeFromCart,
    updateQty,
    cartTotal,
    clearCart,
    wishlist,
    toggleWishlist,
    isInWishlist,
    currentView,
    setCurrentView,
    selectedProduct,
    setSelectedProduct,
    isCartOpen,
    setIsCartOpen,
    searchQuery,
    setSearchQuery,
    showSearch,
    setShowSearch,
    activeCategory,
    setActiveCategory,
    handleCategoryClick,
    paymentSuccess,
    setPaymentSuccess
  }), [
    darkMode,
    toggleDarkMode,
    cart,
    addToCart,
    removeFromCart,
    updateQty,
    cartTotal,
    clearCart,
    wishlist,
    toggleWishlist,
    isInWishlist,
    currentView,
    selectedProduct,
    isCartOpen,
    searchQuery,
    showSearch,
    activeCategory,
    handleCategoryClick,
    paymentSuccess
  ]);

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
