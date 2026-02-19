import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Heart, Search, Menu, X, Sun, Moon } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export const Header: React.FC = () => {
  const { 
    darkMode, 
    toggleDarkMode, 
    cart, 
    setIsCartOpen, 
    wishlist, 
    setCurrentView, 
    handleCategoryClick,
    showSearch, 
    setShowSearch, 
    searchQuery, 
    setSearchQuery 
  } = useApp();
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = ['New Arrivals', 'Men', 'Women', 'Accessories', 'Sale'];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? (darkMode ? 'bg-[#0a0a0a]/95 backdrop-blur-md shadow-lg' : 'bg-white/95 backdrop-blur-md shadow-sm') 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer group"
            onClick={() => setCurrentView('home')}
          >
            <span className={`text-2xl font-serif tracking-widest font-bold ${darkMode ? 'text-white' : 'text-[#1A1A1A]'}`}>
              RSA
            </span>
            <span className={`ml-2 text-sm uppercase tracking-[0.3em] ${darkMode ? 'text-[#D4AF37]' : 'text-[#B76E79]'}`}>
              Fashion
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => handleCategoryClick(item)}
                className={`text-sm uppercase tracking-wider hover:text-[#D4AF37] transition-colors ${darkMode ? 'text-gray-300' : 'text-[#1A1A1A]'}`}
              >
                {item}
              </button>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setShowSearch(!showSearch)}
              className={`p-2 hover:text-[#D4AF37] transition-colors ${darkMode ? 'text-gray-300' : 'text-[#1A1A1A]'}`}
            >
              <Search size={20} />
            </button>
            
            <button 
              onClick={toggleDarkMode}
              className={`p-2 hover:text-[#D4AF37] transition-colors ${darkMode ? 'text-gray-300' : 'text-[#1A1A1A]'}`}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <button 
              onClick={() => setCurrentView('wishlist')}
              className={`p-2 hover:text-[#D4AF37] transition-colors relative ${darkMode ? 'text-gray-300' : 'text-[#1A1A1A]'}`}
            >
              <Heart size={20} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#B76E79] text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            <button 
              onClick={() => setIsCartOpen(true)}
              className={`p-2 hover:text-[#D4AF37] transition-colors relative ${darkMode ? 'text-gray-300' : 'text-[#1A1A1A]'}`}
            >
              <ShoppingBag size={20} />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#D4AF37] text-[#1A1A1A] text-xs w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {cart.length}
                </span>
              )}
            </button>

            <button 
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <AnimatePresence>
        {showSearch && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className={`border-t ${darkMode ? 'border-gray-800 bg-[#0a0a0a]' : 'border-gray-200 bg-white'}`}
          >
            <div className="max-w-3xl mx-auto px-4 py-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-12 pr-4 py-3 rounded-none border-b-2 focus:outline-none focus:border-[#D4AF37] transition-colors ${
                    darkMode ? 'bg-[#0a0a0a] text-white border-gray-800' : 'bg-white text-[#1A1A1A] border-gray-300'
                  }`}
                />
                <Search className="absolute left-0 top-3.5 text-gray-400" size={20} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`md:hidden absolute top-20 left-0 right-0 ${
              darkMode ? 'bg-[#0a0a0a] border-gray-800' : 'bg-white border-gray-200'
            } border-b shadow-xl`}
          >
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    handleCategoryClick(item);
                    setMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left text-lg uppercase tracking-wider py-2 ${darkMode ? 'text-gray-300' : 'text-[#1A1A1A]'}`}
                >
                  {item}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
