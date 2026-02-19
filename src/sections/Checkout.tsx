import React, { useState } from 'react';
import { ShoppingBag, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useApp } from '@/context/AppContext';

export const Checkout: React.FC = () => {
  const { darkMode, cart, cartTotal, setCurrentView, clearCart } = useApp();
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('transfer');
  const [showSuccess, setShowSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccess(true);
      clearCart();
    }, 2000);
  };

  if (showSuccess) {
    return (
      <div className="pt-24 pb-20 px-4 text-center min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-md"
        >
          <div className="w-20 h-20 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-[#1A1A1A]" />
          </div>
          <h2 className={`text-3xl font-serif mb-4 ${darkMode ? 'text-white' : 'text-[#1A1A1A]'}`}>
            Payment Successful!
          </h2>
          <p className={`mb-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Thank you for your purchase. Your order has been confirmed and will be shipped soon.
          </p>
          <button 
            onClick={() => {
              setShowSuccess(false);
              setCurrentView('catalog');
            }}
            className="px-8 py-3 bg-[#1A1A1A] text-white uppercase tracking-widest text-sm hover:bg-[#D4AF37] hover:text-[#1A1A1A] transition-colors"
          >
            Continue Shopping
          </button>
        </motion.div>
      </div>
    );
  }

  if (cart.length === 0 && !showSuccess) {
    return (
      <div className="pt-24 pb-20 px-4 text-center">
        <ShoppingBag className={`mx-auto mb-4 ${darkMode ? 'text-gray-700' : 'text-gray-300'}`} size={64} />
        <h2 className={`text-2xl font-serif mb-4 ${darkMode ? 'text-white' : 'text-[#1A1A1A]'}`}>Your cart is empty</h2>
        <button 
          onClick={() => setCurrentView('catalog')}
          className="text-[#D4AF37] underline"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <h1 className={`text-3xl font-serif mb-8 text-center ${darkMode ? 'text-white' : 'text-[#1A1A1A]'}`}>
        Checkout
      </h1>

      {/* Progress */}
      <div className="flex justify-center mb-12">
        {[1, 2, 3].map((s, i) => (
          <div key={s} className="flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
              step >= s 
                ? 'bg-[#D4AF37] text-[#1A1A1A]' 
                : (darkMode ? 'bg-gray-800 text-gray-500' : 'bg-gray-200 text-gray-500')
            }`}>
              {s}
            </div>
            {i < 2 && (
              <div className={`w-20 h-0.5 ${step > s ? 'bg-[#D4AF37]' : (darkMode ? 'bg-gray-800' : 'bg-gray-200')}`} />
            )}
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          {step === 1 && (
            <div className={`p-6 ${darkMode ? 'bg-[#1A1A1A]' : 'bg-white'} shadow-sm`}>
              <h3 className={`text-lg font-medium mb-6 ${darkMode ? 'text-white' : 'text-[#1A1A1A]'}`}>
                Shipping Information
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <input 
                  type="text" 
                  placeholder="First Name" 
                  className={`w-full p-3 border ${darkMode ? 'bg-[#0a0a0a] border-gray-800 text-white' : 'bg-white border-gray-300'}`} 
                />
                <input 
                  type="text" 
                  placeholder="Last Name" 
                  className={`w-full p-3 border ${darkMode ? 'bg-[#0a0a0a] border-gray-800 text-white' : 'bg-white border-gray-300'}`} 
                />
                <input 
                  type="email" 
                  placeholder="Email" 
                  className={`w-full p-3 border col-span-2 ${darkMode ? 'bg-[#0a0a0a] border-gray-800 text-white' : 'bg-white border-gray-300'}`} 
                />
                <input 
                  type="tel" 
                  placeholder="Phone" 
                  className={`w-full p-3 border col-span-2 ${darkMode ? 'bg-[#0a0a0a] border-gray-800 text-white' : 'bg-white border-gray-300'}`} 
                />
                <textarea 
                  placeholder="Address" 
                  rows={3} 
                  className={`w-full p-3 border col-span-2 ${darkMode ? 'bg-[#0a0a0a] border-gray-800 text-white' : 'bg-white border-gray-300'}`} 
                />
              </div>
              <button 
                onClick={() => setStep(2)}
                className="mt-6 w-full bg-[#1A1A1A] text-white py-3 uppercase tracking-widest text-sm hover:bg-[#D4AF37] hover:text-[#1A1A1A] transition-colors"
              >
                Continue to Shipping
              </button>
            </div>
          )}

          {step === 2 && (
            <div className={`p-6 ${darkMode ? 'bg-[#1A1A1A]' : 'bg-white'} shadow-sm`}>
              <h3 className={`text-lg font-medium mb-6 ${darkMode ? 'text-white' : 'text-[#1A1A1A]'}`}>
                Shipping Method
              </h3>
              <div className="space-y-3">
                {[
                  { id: 'jne', label: 'JNE Reguler (2-3 days)', price: 'Rp 25.000' },
                  { id: 'jnt', label: 'J&T Express (1-2 days)', price: 'Rp 30.000' },
                  { id: 'sicepat', label: 'SiCepat Best (Next Day)', price: 'Rp 45.000' }
                ].map((method, i) => (
                  <label 
                    key={method.id} 
                    className={`flex items-center justify-between p-4 border cursor-pointer transition-colors ${
                      darkMode ? 'border-gray-800 hover:border-[#D4AF37]' : 'border-gray-200 hover:border-[#B76E79]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input type="radio" name="shipping" className="accent-[#D4AF37]" defaultChecked={i === 0} />
                      <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>{method.label}</span>
                    </div>
                    <span className="font-medium">{method.price}</span>
                  </label>
                ))}
              </div>
              <div className="flex gap-4 mt-6">
                <button 
                  onClick={() => setStep(1)}
                  className={`flex-1 py-3 border uppercase tracking-widest text-sm ${
                    darkMode ? 'border-gray-700 text-gray-300 hover:border-white' : 'border-gray-300 text-gray-600 hover:border-[#1A1A1A]'
                  }`}
                >
                  Back
                </button>
                <button 
                  onClick={() => setStep(3)}
                  className="flex-1 bg-[#1A1A1A] text-white py-3 uppercase tracking-widest text-sm hover:bg-[#D4AF37] hover:text-[#1A1A1A] transition-colors"
                >
                  Continue to Payment
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className={`p-6 ${darkMode ? 'bg-[#1A1A1A]' : 'bg-white'} shadow-sm`}>
              <h3 className={`text-lg font-medium mb-6 ${darkMode ? 'text-white' : 'text-[#1A1A1A]'}`}>
                Payment Method
              </h3>
              <div className="space-y-3 mb-6">
                {[
                  { id: 'transfer', label: 'Bank Transfer (Virtual Account)', icons: 'BCA, Mandiri, BNI, BRI' },
                  { id: 'ewallet', label: 'E-Wallet', icons: 'GoPay, OVO, DANA, ShopeePay' },
                  { id: 'card', label: 'Credit Card', icons: 'Visa, Mastercard' }
                ].map((method) => (
                  <label 
                    key={method.id}
                    className={`flex items-center justify-between p-4 border cursor-pointer transition-colors ${
                      paymentMethod === method.id 
                        ? (darkMode ? 'border-[#D4AF37] bg-[#D4AF37]/10' : 'border-[#B76E79] bg-[#B76E79]/10') 
                        : (darkMode ? 'border-gray-800' : 'border-gray-200')
                    }`}
                    onClick={() => setPaymentMethod(method.id)}
                  >
                    <div className="flex items-center gap-3">
                      <input 
                        type="radio" 
                        name="payment" 
                        checked={paymentMethod === method.id} 
                        className="accent-[#D4AF37]" 
                        onChange={() => setPaymentMethod(method.id)}
                      />
                      <div>
                        <span className={`block ${darkMode ? 'text-white' : 'text-[#1A1A1A]'}`}>{method.label}</span>
                        <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>{method.icons}</span>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
              <div className="flex gap-4">
                <button 
                  onClick={() => setStep(2)}
                  className={`flex-1 py-3 border uppercase tracking-widest text-sm ${
                    darkMode ? 'border-gray-700 text-gray-300 hover:border-white' : 'border-gray-300 text-gray-600 hover:border-[#1A1A1A]'
                  }`}
                >
                  Back
                </button>
                <button 
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="flex-1 bg-[#1A1A1A] text-white py-3 uppercase tracking-widest text-sm hover:bg-[#D4AF37] hover:text-[#1A1A1A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                      Processing...
                    </>
                  ) : (
                    `Pay Rp ${(cartTotal + 25000).toLocaleString('id-ID')}`
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className={`p-6 h-fit ${darkMode ? 'bg-[#1A1A1A]' : 'bg-gray-50'}`}>
          <h3 className={`text-lg font-medium mb-6 ${darkMode ? 'text-white' : 'text-[#1A1A1A]'}`}>
            Order Summary
          </h3>
          <div className="space-y-4 mb-6">
            {cart.map(item => (
              <div key={`${item.id}-${item.size}`} className="flex gap-3">
                <img src={item.images[0]} alt={item.name} className="w-12 h-16 object-cover bg-gray-200" />
                <div className="flex-1">
                  <p className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{item.name}</p>
                  <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                    Qty: {item.qty} | Size: {item.size}
                  </p>
                </div>
                <p className="text-sm">Rp {(item.price * item.qty).toLocaleString('id-ID')}</p>
              </div>
            ))}
          </div>
          <div className={`space-y-2 pt-4 border-t ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
            <div className="flex justify-between text-sm">
              <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Subtotal</span>
              <span>Rp {cartTotal.toLocaleString('id-ID')}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Shipping</span>
              <span>Rp 25.000</span>
            </div>
            <div className={`flex justify-between pt-2 border-t font-medium ${darkMode ? 'border-gray-800 text-white' : 'border-gray-200 text-[#1A1A1A]'}`}>
              <span>Total</span>
              <span className="text-[#D4AF37]">Rp {(cartTotal + 25000).toLocaleString('id-ID')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
