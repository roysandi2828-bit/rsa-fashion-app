export interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  category: string;
  sizes: string[];
  colors: string[];
  images: string[];
  rating: number;
  reviews: number;
  description: string;
  tags: string[];
}

export interface CartItem extends Product {
  size: string;
  qty: number;
}

export type ViewType = 'home' | 'catalog' | 'product' | 'cart' | 'checkout' | 'wishlist';

export interface AppContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
  cart: CartItem[];
  addToCart: (product: Product, size: string, qty?: number) => void;
  removeFromCart: (id: number, size: string) => void;
  updateQty: (id: number, size: string, delta: number) => void;
  cartTotal: number;
  clearCart: () => void;
  wishlist: Product[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (id: number) => boolean;
  currentView: ViewType;
  setCurrentView: (view: ViewType) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  showSearch: boolean;
  setShowSearch: (show: boolean) => void;
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  handleCategoryClick: (category: string) => void;
  paymentSuccess: boolean;
  setPaymentSuccess: (success: boolean) => void;
}
