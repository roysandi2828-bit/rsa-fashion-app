import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useApp } from '@/context/AppContext';

interface Slide {
  id: number;
  image: string;
  title: string;
  subtitle: string;
}

const slides: Slide[] = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1920&q=80',
    title: 'Elegance in Every Thread',
    subtitle: 'Spring Collection 2026'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1920&q=80',
    title: 'Timeless Sophistication',
    subtitle: 'Haute Couture Edition'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1920&q=80',
    title: 'Modern Luxury',
    subtitle: 'New Arrivals'
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=1920&q=80',
    title: 'Crafted for You',
    subtitle: 'Exclusive Collection'
  }
];

export const HeroSlideshow: React.FC = () => {
  const { darkMode, handleCategoryClick } = useApp();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  // Auto-play slideshow
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  const slide = slides[currentSlide];

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Images with Transitions */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          className="absolute inset-0 z-0"
        >
          {/* Gradient Overlay */}
          <div className={`absolute inset-0 z-10 ${
            darkMode 
              ? 'bg-gradient-to-b from-[#0a0a0a]/80 via-[#0a0a0a]/40 to-[#0a0a0a]/90' 
              : 'bg-gradient-to-b from-[#FAFAFA]/70 via-transparent to-[#FAFAFA]/80'
          }`} />
          
          {/* Image */}
          <img 
            src={slide.image} 
            alt={slide.title}
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.p
              className={`text-sm uppercase tracking-[0.4em] mb-4 ${darkMode ? 'text-[#D4AF37]' : 'text-[#B76E79]'}`}
            >
              {slide.subtitle}
            </motion.p>
            <motion.h1
              className={`text-5xl md:text-7xl font-serif mb-6 leading-tight ${darkMode ? 'text-white' : 'text-[#1A1A1A]'}`}
            >
              {slide.title.split(' ').map((word, i) => (
                <span key={i}>
                  {word}
                  {i === 1 && <br />}
                  {i !== 1 && ' '}
                </span>
              ))}
            </motion.h1>
            <motion.p
              className={`text-lg mb-10 max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
            >
              Discover our curated collection of premium fashion pieces, crafted for the modern individual who appreciates timeless style.
            </motion.p>
            <motion.button
              onClick={() => handleCategoryClick('New Arrivals')}
              className={`px-10 py-4 text-sm uppercase tracking-widest transition-all duration-300 ${
                darkMode 
                  ? 'bg-white text-[#1A1A1A] hover:bg-[#D4AF37]' 
                  : 'bg-[#1A1A1A] text-white hover:bg-[#B76E79]'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore Collection
            </motion.button>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() => {
          prevSlide();
          setIsAutoPlaying(false);
          setTimeout(() => setIsAutoPlaying(true), 10000);
        }}
        className={`absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full transition-all ${
          darkMode 
            ? 'bg-white/10 hover:bg-white/20 text-white' 
            : 'bg-black/10 hover:bg-black/20 text-[#1A1A1A]'
        }`}
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={() => {
          nextSlide();
          setIsAutoPlaying(false);
          setTimeout(() => setIsAutoPlaying(true), 10000);
        }}
        className={`absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full transition-all ${
          darkMode 
            ? 'bg-white/10 hover:bg-white/20 text-white' 
            : 'bg-black/10 hover:bg-black/20 text-[#1A1A1A]'
        }`}
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`relative h-1 transition-all duration-500 rounded-full overflow-hidden ${
              currentSlide === index 
                ? 'w-12 bg-[#D4AF37]' 
                : 'w-6 bg-gray-400/50 hover:bg-gray-400'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          >
            {currentSlide === index && isAutoPlaying && (
              <motion.div
                className="absolute inset-0 bg-white/30"
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 5, ease: 'linear' }}
                key={`progress-${currentSlide}`}
              />
            )}
          </button>
        ))}
      </div>

      {/* Slide Counter */}
      <div className={`absolute bottom-10 right-8 z-30 text-sm font-medium ${
        darkMode ? 'text-white/60' : 'text-[#1A1A1A]/60'
      }`}>
        <span className="text-[#D4AF37]">{String(currentSlide + 1).padStart(2, '0')}</span>
        <span> / {String(slides.length).padStart(2, '0')}</span>
      </div>
    </section>
  );
};
