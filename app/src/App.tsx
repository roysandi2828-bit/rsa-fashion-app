import React from 'react';
import { AppProvider, useApp } from '@/context/AppContext';
import { Header } from '@/components/Header';
import { CartDrawer } from '@/components/CartDrawer';
import { Footer } from '@/components/Footer';
import { Hero } from '@/sections/Hero';
import { Catalog } from '@/sections/Catalog';
import { ProductDetail } from '@/sections/ProductDetail';
import { Checkout } from '@/sections/Checkout';
import { Wishlist } from '@/sections/Wishlist';

const ViewRouter: React.FC = () => {
  const { currentView } = useApp();
  
  switch(currentView) {
    case 'home':
      return <Hero />;
    case 'catalog':
      return <Catalog />;
    case 'product':
      return <ProductDetail />;
    case 'checkout':
      return <Checkout />;
    case 'wishlist':
      return <Wishlist />;
    default:
      return <Hero />;
  }
};

const AppContent: React.FC = () => {
  const { darkMode } = useApp();
  
  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-[#0a0a0a] text-gray-100' : 'bg-[#FAFAFA] text-[#1A1A1A]'}`}>
      <Header />
      
      <main>
        <ViewRouter />
      </main>

      <CartDrawer />
      <Footer />
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
