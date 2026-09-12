'use client';
import React, { useState, useMemo } from 'react';
import { 
  SlidersHorizontal, 
  ChevronRight, 
  Sparkles, 
  ArrowRight,
  X
} from 'lucide-react';
import { useShop } from '../context/shopcontext';
import { ProductCard } from './productcard';
import { ProductFilters } from './productfilter';
import { FilterState } from '../types';

interface CategoryPageProps {
  gender: 'men' | 'women' | 'kids';
}

export const CategoryPage: React.FC<CategoryPageProps> = ({ gender }) => {
  const { products, navigate } = useShop();
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const heroDetails = {
    men: {
      title: 'Men’s Tailoring & Essentials',
      tagline: 'Modern Masculine Sophistication',
      description: 'Engineered with clean architectural lines, heavyweight 280 GSM cottons, and Japanese selvedge denim designed for refined day-to-evening dressing.',
      bgImage: 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&q=80&w=1600'
    },
    women: {
      title: 'Women’s Atelier Collection',
      tagline: 'Fluid Elegance & Timeless Cuts',
      description: 'Featuring liquid silk-touch bias-cut dresses, pleated wide-leg trousers, and structured Italian wool blazers crafted to transcend seasons.',
      bgImage: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=1600'
    },
    kids: {
      title: 'Kids Edition & Playful Luxury',
      tagline: 'Pure Organic Comfort & Durability',
      description: 'Hypoallergenic organic cotton fleeces, twirl dresses, and durable reinforced denim crafted for young explorers with unmatched softness.',
      bgImage: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&q=80&w=1600'
    }
  }[gender];

  // Category-specific filters
  const [filters, setFilters] = useState<FilterState>({
    gender: [gender],
    category: [],
    sizes: [],
    colors: [],
    priceRange: [0, 250],
    minRating: 0,
    inStockOnly: false,
    onSaleOnly: false,
    searchQuery: '',
    sortBy: 'featured'
  });

  // Extract categories specific to this gender
  const availableCategories = useMemo(() => {
    const cats = Array.from(
      new Set(products.filter((p) => p.gender === gender).map((p) => p.category))
    );
    return cats.sort();
  }, [products, gender]);

  // Filter products for this category
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (product.gender !== gender) return false;

      if (filters.category.length > 0 && !filters.category.includes(product.category)) {
        return false;
      }

      if (filters.sizes.length > 0 && !product.sizes.some((s) => filters.sizes.includes(s))) {
        return false;
      }

      if (product.price > filters.priceRange[1]) {
        return false;
      }

      if (filters.onSaleOnly && (!product.discount || product.discount <= 0)) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
      if (filters.sortBy === 'price-low') return a.price - b.price;
      if (filters.sortBy === 'price-high') return b.price - a.price;
      if (filters.sortBy === 'rating') return b.rating - a.rating;
      if (filters.sortBy === 'discount') return b.discount - a.discount;
      return 0;
    });
  }, [products, gender, filters]);

  return (
    <div id={`category-page-${gender}`} className="space-y-10 pb-20">
      
      {/* Category Hero Banner */}
      <div className="relative w-full h-[360px] sm:h-[420px] bg-[#1A1A1A] text-white flex items-center justify-center overflow-hidden">
        <img
          src={heroDetails.bgImage}
          alt={heroDetails.title}
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover object-center brightness-[0.55]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center justify-center space-x-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#E5D4B8]">
            <span onClick={() => navigate('/')} className="hover:underline cursor-pointer">Home</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span>{gender.toUpperCase()}</span>
          </div>

          <h1 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-white tracking-tight">
            {heroDetails.title}
          </h1>

          <p className="text-xs sm:text-sm text-[#E0DDD5] font-light max-w-xl mx-auto leading-relaxed">
            {heroDetails.description}
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Control Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-[#E8E6DF] bg-white p-4 rounded-xl border">
          <button
            id={`category-mobile-filter-btn-${gender}`}
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden flex items-center space-x-2 px-4 py-2 bg-[#1A1A1A] text-white text-xs font-semibold uppercase tracking-wider rounded-lg"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filter {gender} ({filteredProducts.length})</span>
          </button>

          <div className="text-xs text-[#5A5854] font-medium">
            Showing <strong className="text-[#1A1A1A]">{filteredProducts.length}</strong> styles
          </div>

          <div className="flex items-center space-x-2">
            <label htmlFor="category-sort-select" className="text-xs font-semibold text-[#8C8880] uppercase tracking-wider">
              Sort:
            </label>
            <select
              id="category-sort-select"
              value={filters.sortBy}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  sortBy: e.target.value as FilterState['sortBy']
                }))
              }
              className="px-3 py-1.5 bg-[#FAF9F6] border border-[#DDD9CE] rounded-lg text-xs font-semibold text-[#1A1A1A] cursor-pointer"
            >
              <option value="featured">Featured Selection</option>
              <option value="newest">Newest Arrivals</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
              <option value="discount">Sale & Discount</option>
            </select>
          </div>
        </div>

        {/* Layout with Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className="hidden lg:block lg:col-span-3 sticky top-24 bg-white p-6 rounded-2xl border border-[#E8E6DF] shadow-xs">
            <ProductFilters
              filters={filters}
              setFilters={setFilters}
              totalResults={filteredProducts.length}
              availableCategories={availableCategories}
            />
          </div>

          <div className="lg:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="p-12 text-center bg-white rounded-2xl border border-[#E8E6DF] space-y-3">
                <h3 className="font-serif-luxury text-xl font-bold text-[#1A1A1A]">
                  No products match current criteria
                </h3>
                <p className="text-xs text-[#8C8880]">
                  Try resetting your category filters.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Mobile Filter Drawer Overlay */}
      {mobileFilterOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end lg:hidden animate-in fade-in duration-200"
          onClick={() => setMobileFilterOpen(false)}
        >
          <div 
            className="w-full max-w-sm bg-[#FAF9F6] h-full shadow-2xl overflow-y-auto animate-in slide-in-from-right duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-[#E8E6DF] flex items-center justify-between bg-white">
              <h3 className="font-serif-luxury text-lg font-bold text-[#1A1A1A]">
                Refine {gender.toUpperCase()}
              </h3>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="p-1.5 text-[#8C8880] hover:text-[#1A1A1A]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <ProductFilters
              filters={filters}
              setFilters={setFilters}
              totalResults={filteredProducts.length}
              availableCategories={availableCategories}
              isMobileDrawer
              onCloseMobileDrawer={() => setMobileFilterOpen(false)}
            />
          </div>
        </div>
      )}

    </div>
  );
};
export default CategoryPage;