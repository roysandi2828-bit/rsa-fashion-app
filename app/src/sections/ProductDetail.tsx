import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Star, Minus, Plus, Heart, X, Truck, Shield, CheckCircle } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export const ProductDetail: React.FC = () => {
  const { darkMode, selectedProduct, addToCart, toggleWishlist, isInWishlist, setCurrentView } = useApp();
  const [selectedSize, setSelectedSize] = useState('');
  const [qty, setQty] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [showAddedNotification, setShowAddedNotification] = useState(false);
  const [sizeError, setSizeError] = useState(false);

  if (!selectedProduct) return null;

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError(true);
      setTimeout(() => setSizeError(false), 2000);
      return;
    }
    addToCart(selectedProduct, selectedSize, qty);
    setShowAddedNotification(true);
    setTimeout(() => setShowAddedNotification(false), 2000);
  };

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Added to Cart Notification */}
      <AnimatePresence>
        {showAddedNotification && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 bg-[#D4AF37] text-[#1A1A1A] px-6 py-3 rounded shadow-lg flex items-center gap-2"
          >
            <CheckCircle size={20} />
            <span className="font-medium">Added to cart successfully!</span>
          </motion.div>
        )}
      </AnimatePresence>

      <button 
        onClick={() => setCurrentView('catalog')}
        className={`flex items-center gap-2 mb-6 text-sm hover:text-[#D4AF37] transition-colors ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}
      >
        <ChevronRight className="rotate-180" size={16} /> Back to Collection
      </button>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Images */}
        <div className="space-y-4">
          <div className="aspect-[3/4] bg-gray-200 overflow-hidden relative group">
            <img 
              src={selectedProduct.images[activeImage]} 
              alt={selectedProduct.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex gap-2">
            {selectedProduct.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={`w-20 h-20 border-2 overflow-hidden ${activeImage === idx ? 'border-[#D4AF37]' : 'border-transparent'}`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Details */}
        <div className="space-y-6">
          <div>
            <p className={`text-sm uppercase tracking-wider mb-2 ${darkMode ? 'text-[#D4AF37]' : 'text-[#B76E79]'}`}>
              {selectedProduct.brand}
            </p>
            <h1 className={`text-3xl md:text-4xl font-serif mb-4 ${darkMode ? 'text-white' : 'text-[#1A1A1A]'}`}>
              {selectedProduct.name}
            </h1>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex text-[#D4AF37]">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={16} 
                    fill={i < Math.floor(selectedProduct.rating) ? "currentColor" : "none"} 
                  />
                ))}
              </div>
              <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {selectedProduct.reviews} Reviews
              </span>
            </div>
            <p className={`text-3xl font-medium ${darkMode ? 'text-white' : 'text-[#1A1A1A]'}`}>
              Rp {selectedProduct.price.toLocaleString('id-ID')}
            </p>
          </div>

          <p className={`leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {selectedProduct.description}
          </p>

          {/* Size Selection */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <span className={`text-sm uppercase tracking-wider ${darkMode ? 'text-white' : 'text-[#1A1A1A]'}`}>
                Select Size
              </span>
              <button 
                onClick={() => setShowSizeGuide(true)}
                className={`text-sm underline hover:text-[#D4AF37] ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}
              >
                Size Guide
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedProduct.sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-12 h-12 border text-sm transition-all ${
                    selectedSize === size 
                      ? (darkMode ? 'bg-white text-[#1A1A1A] border-white' : 'bg-[#1A1A1A] text-white border-[#1A1A1A]') 
                      : (darkMode ? 'border-gray-700 text-gray-300 hover:border-white' : 'border-gray-300 text-[#1A1A1A] hover:border-[#1A1A1A]')
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
            {sizeError && (
              <p className="text-red-500 text-sm mt-2">Please select a size first</p>
            )}
          </div>

          {/* Quantity & Actions */}
          <div className="flex gap-4 pt-4">
            <div className={`flex items-center border ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}>
              <button 
                onClick={() => setQty(Math.max(1, qty - 1))}
                className={`p-3 hover:text-[#D4AF37] ${darkMode ? 'text-white' : 'text-[#1A1A1A]'}`}
              >
                <Minus size={16} />
              </button>
              <span className={`w-12 text-center ${darkMode ? 'text-white' : 'text-[#1A1A1A]'}`}>{qty}</span>
              <button 
                onClick={() => setQty(qty + 1)}
                className={`p-3 hover:text-[#D4AF37] ${darkMode ? 'text-white' : 'text-[#1A1A1A]'}`}
              >
                <Plus size={16} />
              </button>
            </div>
            
            <button 
              onClick={handleAddToCart}
              className="flex-1 bg-[#1A1A1A] text-white py-3 uppercase tracking-widest text-sm hover:bg-[#D4AF37] hover:text-[#1A1A1A] transition-colors"
            >
              Add to Cart
            </button>
            
            <button 
              onClick={() => toggleWishlist(selectedProduct)}
              className={`p-3 border ${
                isInWishlist(selectedProduct.id) 
                  ? 'bg-[#B76E79] border-[#B76E79] text-white' 
                  : (darkMode ? 'border-gray-700 text-white' : 'border-gray-300 text-[#1A1A1A]')
              }`}
            >
              <Heart size={20} fill={isInWishlist(selectedProduct.id) ? "currentColor" : "none"} />
            </button>
          </div>

          {/* Features */}
          <div className={`grid grid-cols-3 gap-4 pt-6 border-t ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
            <div className="text-center">
              <Truck className="mx-auto mb-2 text-[#D4AF37]" size={24} />
              <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Free Shipping</p>
            </div>
            <div className="text-center">
              <Shield className="mx-auto mb-2 text-[#D4AF37]" size={24} />
              <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Secure Payment</p>
            </div>
            <div className="text-center">
              <CheckCircle className="mx-auto mb-2 text-[#D4AF37]" size={24} />
              <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Authentic Product</p>
            </div>
          </div>
        </div>
      </div>

      {/* Size Guide Modal */}
      <AnimatePresence>
        {showSizeGuide && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={() => setShowSizeGuide(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`p-8 max-w-md w-full ${darkMode ? 'bg-[#1A1A1A] text-white' : 'bg-white text-[#1A1A1A]'}`}
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-serif">Size Guide</h3>
                <button onClick={() => setShowSizeGuide(false)}>
                  <X size={24} />
                </button>
              </div>
              <table className="w-full text-sm">
                <thead className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                  <tr>
                    <th className="py-2 text-left">Size</th>
                    <th className="py-2 text-left">Chest (cm)</th>
                    <th className="py-2 text-left">Length (cm)</th>
                  </tr>
                </thead>
                <tbody>
                  {['XS', 'S', 'M', 'L', 'XL'].map((size, idx) => (
                    <tr key={size} className={`border-b ${darkMode ? 'border-gray-800' : 'border-gray-100'}`}>
                      <td className="py-3 font-medium">{size}</td>
                      <td className="py-3">{86 + idx * 6}</td>
                      <td className="py-3">{64 + idx * 2}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
