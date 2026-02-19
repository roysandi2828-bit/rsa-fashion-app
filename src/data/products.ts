import type { Product } from '@/types';

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Royal Oxford Shirt",
    brand: "RSA Atelier",
    price: 1250000,
    category: "Men",
    sizes: ["S", "M", "L", "XL"],
    colors: ["White", "Navy", "Black"],
    images: ["https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80"],
    rating: 4.8,
    reviews: 124,
    description: "Premium cotton oxford shirt with mother of pearl buttons. Perfect for formal and semi-formal occasions.",
    tags: ["Bestseller", "Premium"]
  },
  {
    id: 2,
    name: "Silk Evening Dress",
    brand: "RSA Couture",
    price: 3500000,
    category: "Women",
    sizes: ["XS", "S", "M", "L"],
    colors: ["Champagne", "Midnight"],
    images: ["https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80"],
    rating: 4.9,
    reviews: 89,
    description: "Elegant silk evening dress with hand-embroidered details. Flowing silhouette for the modern woman.",
    tags: ["New Arrival", "Limited"]
  },
  {
    id: 3,
    name: "Tailored Wool Blazer",
    brand: "RSA Atelier",
    price: 2800000,
    category: "Men",
    sizes: ["M", "L", "XL", "XXL"],
    colors: ["Charcoal", "Navy"],
    images: ["https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80"],
    rating: 4.7,
    reviews: 56,
    description: "Italian wool blazer with structured shoulders. The epitome of masculine elegance.",
    tags: ["Premium"]
  },
  {
    id: 4,
    name: "Cashmere Turtleneck",
    brand: "RSA Basics",
    price: 1800000,
    category: "Unisex",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Camel", "Grey", "Black"],
    images: ["https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80"],
    rating: 4.9,
    reviews: 203,
    description: "Mongolian cashmere turtleneck. Unparalleled softness and warmth for the discerning individual.",
    tags: ["Bestseller"]
  },
  {
    id: 5,
    name: "Leather Crossbody Bag",
    brand: "RSA Accessories",
    price: 2100000,
    category: "Women",
    sizes: ["One Size"],
    colors: ["Tan", "Black", "Burgundy"],
    images: ["https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80"],
    rating: 4.6,
    reviews: 78,
    description: "Full-grain Italian leather bag with gold-tone hardware. Compact yet spacious.",
    tags: ["Accessory"]
  },
  {
    id: 6,
    name: "Linen Summer Suit",
    brand: "RSA Atelier",
    price: 4200000,
    category: "Men",
    sizes: ["M", "L", "XL"],
    colors: ["Beige", "Light Blue"],
    images: ["https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80"],
    rating: 4.8,
    reviews: 45,
    description: "Breathable Irish linen suit. Perfect for tropical climates and summer weddings.",
    tags: ["Seasonal"]
  }
];
