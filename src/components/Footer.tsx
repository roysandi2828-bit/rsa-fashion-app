import React, { useState } from 'react';
import { ArrowRight, Instagram, Facebook, Twitter } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export const Footer: React.FC = () => {
  const { darkMode, setCurrentView, handleCategoryClick } = useApp();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const handleSocialClick = (platform: string) => {
    const urls: Record<string, string> = {
      instagram: 'https://instagram.com/rsafashion',
      facebook: 'https://facebook.com/rsafashion',
      twitter: 'https://twitter.com/rsafashion'
    };
    window.open(urls[platform], '_blank');
  };

  return (
    <footer className={`border-t ${darkMode ? 'border-gray-800 bg-[#0a0a0a]' : 'border-gray-200 bg-white'} mt-20`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-1">
            <button 
              onClick={() => setCurrentView('home')}
              className="flex items-center cursor-pointer"
            >
              <span className={`text-2xl font-serif tracking-widest font-bold ${darkMode ? 'text-white' : 'text-[#1A1A1A]'}`}>
                RSA
              </span>
              <span className={`ml-2 text-sm uppercase tracking-[0.3em] ${darkMode ? 'text-[#D4AF37]' : 'text-[#B76E79]'}`}>
                Fashion
              </span>
            </button>
            <p className={`mt-4 text-sm leading-relaxed ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
              Premium fashion destination for the modern individual. Crafting elegance since 2020.
            </p>
          </div>
          
          <div>
            <h4 className={`font-medium mb-4 ${darkMode ? 'text-white' : 'text-[#1A1A1A]'}`}>Shop</h4>
            <ul className={`space-y-2 text-sm ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
              <li>
                <button onClick={() => handleCategoryClick('New Arrivals')} className="hover:text-[#D4AF37] text-left">
                  New Arrivals
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('Men')} className="hover:text-[#D4AF37] text-left">
                  Men
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('Women')} className="hover:text-[#D4AF37] text-left">
                  Women
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('Accessories')} className="hover:text-[#D4AF37] text-left">
                  Accessories
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className={`font-medium mb-4 ${darkMode ? 'text-white' : 'text-[#1A1A1A]'}`}>Customer Care</h4>
            <ul className={`space-y-2 text-sm ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
              <li><button className="hover:text-[#D4AF37] text-left">Contact Us</button></li>
              <li><button className="hover:text-[#D4AF37] text-left">Shipping Info</button></li>
              <li><button className="hover:text-[#D4AF37] text-left">Returns</button></li>
              <li><button className="hover:text-[#D4AF37] text-left">Size Guide</button></li>
            </ul>
          </div>

          <div>
            <h4 className={`font-medium mb-4 ${darkMode ? 'text-white' : 'text-[#1A1A1A]'}`}>Newsletter</h4>
            <p className={`text-sm mb-4 ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
              Subscribe for exclusive offers and updates.
            </p>
            <form onSubmit={handleSubscribe} className="flex">
              <input 
                type="email" 
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`flex-1 p-3 text-sm border ${darkMode ? 'bg-[#1A1A1A] border-gray-800 text-white' : 'bg-white border-gray-300'}`}
              />
              <button 
                type="submit"
                className="px-4 bg-[#1A1A1A] text-white hover:bg-[#D4AF37] hover:text-[#1A1A1A] transition-colors"
              >
                <ArrowRight size={18} />
              </button>
            </form>
            {subscribed && (
              <p className="text-[#D4AF37] text-sm mt-2">Thank you for subscribing!</p>
            )}
          </div>
        </div>

        <div className={`pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
          <p className={`text-sm ${darkMode ? 'text-gray-600' : 'text-gray-500'}`}>
            © 2026 RSA Fashion. All rights reserved.
          </p>
          <div className="flex gap-4">
            <button onClick={() => handleSocialClick('instagram')}>
              <Instagram size={20} className={`cursor-pointer hover:text-[#D4AF37] ${darkMode ? 'text-gray-500' : 'text-gray-600'}`} />
            </button>
            <button onClick={() => handleSocialClick('facebook')}>
              <Facebook size={20} className={`cursor-pointer hover:text-[#D4AF37] ${darkMode ? 'text-gray-500' : 'text-gray-600'}`} />
            </button>
            <button onClick={() => handleSocialClick('twitter')}>
              <Twitter size={20} className={`cursor-pointer hover:text-[#D4AF37] ${darkMode ? 'text-gray-500' : 'text-gray-600'}`} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
