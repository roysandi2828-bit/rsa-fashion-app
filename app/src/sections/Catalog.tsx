import React, { useState, useMemo } from 'react';
import { Filter, Grid, List as ListIcon, ChevronRight } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { ProductCard } from '@/components/ProductCard';
import { PRODUCTS } from '@/data/products';

export const Catalog: React.FC = () => {
  const { darkMode, setCurrentView, activeCategory, setActiveCategory, searchQuery } = useApp();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterOpen, setFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState(5000000);

  const categories = ['All', 'Men', 'Women', 'Unisex', 'Accessories'];
  
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      if (activeCategory !== 'All' && p.category !== activeCategory) return false;
      if (p.price > priceRange) return false;
      if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    });
  }, [activeCategory, priceRange, searchQuery]);

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Breadcrumb */}
      <div className={`flex items-center gap-2 text-sm mb-8 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
        <button onClick={() => setCurrentView('home')} className="hover:text-[#D4AF37]">Home</button>
        <ChevronRight size={14} />
        <span className={darkMode ? 'text-white' : 'text-[#1A1A1A]'}>Collection</span>
        {activeCategory !== 'All' && (
          <>
            <ChevronRight size={14} />
            <span className={darkMode ? 'text-[#D4AF37]' : 'text-[#B76E79]'}>{activeCategory}</span>
          </>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className={`lg:w-64 space-y-8 ${filterOpen ? 'block' : 'hidden lg:block'}`}>
          <div>
            <h3 className={`text-sm uppercase tracking-wider font-bold mb-4 ${darkMode ? 'text-white' : 'text-[#1A1A1A]'}`}>
              Categories
            </h3>
            <div className="space-y-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`block w-full text-left py-2 text-sm transition-colors ${
                    activeCategory === cat 
                      ? (darkMode ? 'text-[#D4AF37]' : 'text-[#B76E79]') 
                      : (darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-[#1A1A1A]')
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className={`text-sm uppercase tracking-wider font-bold mb-4 ${darkMode ? 'text-white' : 'text-[#1A1A1A]'}`}>
              Price Range
            </h3>
            <input 
              type="range" 
              min="0" 
              max="5000000" 
              step="100000"
              value={priceRange}
              onChange={(e) => setPriceRange(parseInt(e.target.value))}
              className="w-full accent-[#D4AF37]"
            />
            <div className={`flex justify-between text-sm mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              <span>Rp 0</span>
              <span>Rp {priceRange.toLocaleString('id-ID')}</span>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Showing {filteredProducts.length} products
            </p>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setFilterOpen(!filterOpen)}
                className={`lg:hidden p-2 ${darkMode ? 'text-white' : 'text-[#1A1A1A]'}`}
              >
                <Filter size={20} />
              </button>
              <div className={`flex border ${darkMode ? 'border-gray-800' : 'border-gray-300'}`}>
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${
                    viewMode === 'grid' 
                      ? (darkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-[#1A1A1A]') 
                      : (darkMode ? 'text-gray-400' : 'text-gray-400')
                  }`}
                >
                  <Grid size={18} />
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${
                    viewMode === 'list' 
                      ? (darkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-[#1A1A1A]') 
                      : (darkMode ? 'text-gray-400' : 'text-gray-400')
                  }`}
                >
                  <ListIcon size={18} />
                </button>
              </div>
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <p className={`text-lg mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                No products found
              </p>
              <button 
                onClick={() => {
                  setActiveCategory('All');
                  setPriceRange(5000000);
                }}
                className="text-[#D4AF37] underline"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-1'
            }`}>
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} viewMode={viewMode} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
