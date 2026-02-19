import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Minus, Plus, Trash2 } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export const CartDrawer: React.FC = () => {
  const { isCartOpen, setIsCartOpen, cart, removeFromCart, updateQty, cartTotal, darkMode, setCurrentView } = useApp();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={() => setIsCartOpen(false)}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={`fixed right-0 top-0 h-full w-full max-w-md z-50 shadow-2xl ${darkMode ? 'bg-[#0a0a0a]' : 'bg-white'}`}
          >
            <div className="flex flex-col h-full">
              <div className={`flex justify-between items-center p-6 border-b ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
                <h2 className={`text-xl font-serif ${darkMode ? 'text-white' : 'text-[#1A1A1A]'}`}>
                  Shopping Cart ({cart.length})
                </h2>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className={`hover:text-[#D4AF37] ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {cart.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingBag className={`mx-auto mb-4 ${darkMode ? 'text-gray-700' : 'text-gray-300'}`} size={48} />
                    <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Your cart is empty</p>
                    <button 
                      onClick={() => {
                        setIsCartOpen(false);
                        setCurrentView('catalog');
                      }}
                      className="mt-4 text-[#D4AF37] underline text-sm"
                    >
                      Start Shopping
                    </button>
                  </div>
                ) : (
                  cart.map((item, idx) => (
                    <div 
                      key={`${item.id}-${item.size}`} 
                      className={`flex gap-4 pb-6 ${idx !== cart.length - 1 ? (darkMode ? 'border-b border-gray-800' : 'border-b border-gray-200') : ''}`}
                    >
                      <img 
                        src={item.images[0]} 
                        alt={item.name} 
                        className="w-20 h-24 object-cover bg-gray-200 cursor-pointer"
                        onClick={() => {
                          setIsCartOpen(false);
                          setCurrentView('product');
                        }}
                      />
                      <div className="flex-1">
                        <h4 
                          className={`font-serif cursor-pointer hover:text-[#D4AF37] ${darkMode ? 'text-white' : 'text-[#1A1A1A]'}`}
                          onClick={() => {
                            setIsCartOpen(false);
                            setCurrentView('product');
                          }}
                        >
                          {item.name}
                        </h4>
                        <p className={`text-sm mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Size: {item.size}</p>
                        <div className="flex justify-between items-center">
                          <div className={`flex items-center border ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}>
                            <button 
                              onClick={() => updateQty(item.id, item.size, -1)}
                              className={`p-1 hover:text-[#D4AF37] ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}
                            >
                              <Minus size={14} />
                            </button>
                            <span className={`w-8 text-center text-sm ${darkMode ? 'text-white' : 'text-[#1A1A1A]'}`}>{item.qty}</span>
                            <button 
                              onClick={() => updateQty(item.id, item.size, 1)}
                              className={`p-1 hover:text-[#D4AF37] ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <span className={`font-medium ${darkMode ? 'text-[#D4AF37]' : 'text-[#B76E79]'}`}>
                            Rp {(item.price * item.qty).toLocaleString('id-ID')}
                          </span>
                        </div>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id, item.size)}
                        className={`self-start hover:text-red-500 transition-colors ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className={`p-6 border-t ${darkMode ? 'border-gray-800 bg-[#1A1A1A]' : 'border-gray-200 bg-gray-50'}`}>
                  <div className="flex justify-between mb-4 text-lg font-medium">
                    <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Subtotal</span>
                    <span className={darkMode ? 'text-white' : 'text-[#1A1A1A]'}>
                      Rp {cartTotal.toLocaleString('id-ID')}
                    </span>
                  </div>
                  <p className={`text-xs mb-6 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                    Shipping and taxes calculated at checkout
                  </p>
                  <button 
                    onClick={() => {
                      setIsCartOpen(false);
                      setCurrentView('checkout');
                    }}
                    className="w-full bg-[#1A1A1A] text-white py-4 uppercase tracking-widest text-sm hover:bg-[#D4AF37] hover:text-[#1A1A1A] transition-colors"
                  >
                    Checkout
                  </button>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className={`w-full mt-3 py-3 text-sm underline ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-[#1A1A1A]'}`}
                  >
                    Continue Shopping
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
