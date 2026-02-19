import React from 'react';
import { Heart, Trash2, ShoppingBag } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export const Wishlist: React.FC = () => {
  const { darkMode, wishlist, toggleWishlist, setSelectedProduct, setCurrentView } = useApp();

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <h1 className={`text-3xl font-serif mb-8 ${darkMode ? 'text-white' : 'text-[#1A1A1A]'}`}>
        My Wishlist
      </h1>

      {wishlist.length === 0 ? (
        <div className="text-center py-20">
          <Heart className={`mx-auto mb-4 ${darkMode ? 'text-gray-700' : 'text-gray-300'}`} size={64} />
          <p className={`mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Your wishlist is empty</p>
          <button 
            onClick={() => setCurrentView('catalog')}
            className="px-8 py-3 bg-[#1A1A1A] text-white uppercase tracking-widest text-sm hover:bg-[#D4AF37] hover:text-[#1A1A1A] transition-colors"
          >
            Explore Collection
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlist.map(product => (
            <div key={product.id} className="group">
              <div className="relative aspect-[3/4] bg-gray-200 overflow-hidden mb-4">
                <img 
                  src={product.images[0]} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 cursor-pointer"
                  onClick={() => {
                    setSelectedProduct(product);
                    setCurrentView('product');
                  }}
                />
                <button 
                  onClick={() => toggleWishlist(product)}
                  className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg text-[#B76E79] hover:bg-[#B76E79] hover:text-white transition-colors"
                  title="Remove from wishlist"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <h3 
                className={`font-serif mb-1 cursor-pointer hover:text-[#D4AF37] transition-colors ${darkMode ? 'text-white' : 'text-[#1A1A1A]'}`}
                onClick={() => {
                  setSelectedProduct(product);
                  setCurrentView('product');
                }}
              >
                {product.name}
              </h3>
              <p className="text-[#D4AF37] mb-3">Rp {product.price.toLocaleString('id-ID')}</p>
              <button 
                onClick={() => {
                  setSelectedProduct(product);
                  setCurrentView('product');
                }}
                className={`w-full py-2 text-sm uppercase tracking-wider border transition-colors flex items-center justify-center gap-2 ${
                  darkMode 
                    ? 'border-gray-700 hover:border-[#D4AF37] hover:text-[#D4AF37]' 
                    : 'border-gray-300 hover:border-[#1A1A1A]'
                }`}
              >
                <ShoppingBag size={16} />
                View Product
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
