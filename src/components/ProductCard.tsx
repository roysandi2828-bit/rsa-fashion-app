import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ZoomIn, Star } from 'lucide-react';
import type { Product } from '@/types';
import { useApp } from '@/context/AppContext';

interface ProductCardProps {
  product: Product;
  viewMode: 'grid' | 'list';
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, viewMode }) => {
  const { darkMode, toggleWishlist, isInWishlist, setSelectedProduct, setCurrentView } = useApp();
  const isGrid = viewMode === 'grid';

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedProduct(product);
    setCurrentView('product');
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleProductClick = () => {
    setSelectedProduct(product);
    setCurrentView('product');
  };

  return (
    <motion.div
      layout
      className={`group relative ${isGrid ? '' : 'flex gap-6'}`}
    >
      <div 
        className={`relative overflow-hidden ${isGrid ? 'aspect-[3/4]' : 'w-48 h-64'} bg-gray-200 cursor-pointer`}
        onClick={handleProductClick}
      >
        <img 
          src={product.images[0]} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        
        {/* Quick Actions */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button 
            onClick={handleWishlist}
            className={`p-2 rounded-full shadow-lg transition-colors ${
              isInWishlist(product.id) 
                ? 'bg-[#B76E79] text-white' 
                : 'bg-white text-[#1A1A1A] hover:bg-[#D4AF37]'
            }`}
            title={isInWishlist(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart size={16} fill={isInWishlist(product.id) ? "currentColor" : "none"} />
          </button>
          <button 
            onClick={handleQuickView}
            className="p-2 bg-white text-[#1A1A1A] rounded-full shadow-lg hover:bg-[#D4AF37] transition-colors"
            title="Quick view"
          >
            <ZoomIn size={16} />
          </button>
        </div>

        {product.tags.includes('New Arrival') && (
          <span className="absolute top-4 left-4 bg-[#D4AF37] text-[#1A1A1A] text-xs px-3 py-1 uppercase tracking-wider font-bold">
            New
          </span>
        )}
        {product.tags.includes('Bestseller') && (
          <span className="absolute top-4 left-4 bg-[#B76E79] text-white text-xs px-3 py-1 uppercase tracking-wider font-bold">
            Bestseller
          </span>
        )}
      </div>

      <div className={`mt-4 ${isGrid ? 'text-center' : 'flex-1'}`}>
        <p className={`text-xs uppercase tracking-wider mb-1 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
          {product.brand}
        </p>
        <h3 
          className={`text-lg font-serif mb-2 cursor-pointer hover:text-[#D4AF37] transition-colors ${darkMode ? 'text-white' : 'text-[#1A1A1A]'}`}
          onClick={handleProductClick}
        >
          {product.name}
        </h3>
        <div className={`flex items-center ${isGrid ? 'justify-center' : ''} gap-2 mb-2`}>
          <div className="flex text-[#D4AF37]">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={12} 
                fill={i < Math.floor(product.rating) ? "currentColor" : "none"} 
              />
            ))}
          </div>
          <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
            ({product.reviews})
          </span>
        </div>
        <p className={`text-lg font-medium ${darkMode ? 'text-[#D4AF37]' : 'text-[#B76E79]'}`}>
          Rp {product.price.toLocaleString('id-ID')}
        </p>
        
        {!isGrid && (
          <button 
            onClick={handleProductClick}
            className={`mt-4 px-6 py-2 text-sm uppercase tracking-wider border transition-colors ${
              darkMode 
                ? 'border-gray-700 hover:border-[#D4AF37] hover:text-[#D4AF37]' 
                : 'border-gray-300 hover:border-[#B76E79] hover:text-[#B76E79]'
            }`}
          >
            View Details
          </button>
        )}
      </div>
    </motion.div>
  );
};
