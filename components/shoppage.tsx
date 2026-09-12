'use client';

import React, { useState, useMemo, useEffect } from 'react';
import {
  SlidersHorizontal,
  X,
} from 'lucide-react';
import { useShop } from '../context/shopcontext';
import { ProductCard } from './productcard';
import { ProductFilters } from './productfilter';
import { FilterState, Product } from '../types';

export const ShopPage: React.FC = () => {
  const { products, currentPath, navigate } = useShop();

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(12);

  // Initialize filters with URL params if any
  const [filters, setFilters] = useState<FilterState>(() => {
    const isNew = typeof window !== 'undefined' && window.location.search.includes('filter=new');
    const isSale = typeof window !== 'undefined' && window.location.search.includes('filter=sale');
    const isTrending = typeof window !== 'undefined' && window.location.search.includes('filter=trending');

    return {
      gender: [],
      category: [],
      sizes: [],
      colors: [],
      priceRange: [0, 250],
      minRating: 0,
      inStockOnly: false,
      onSaleOnly: isSale,
      searchQuery: '',
      sortBy: isNew ? 'newest' : 'featured'
    };
  });

  // Re-sync if URL search param changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const search = window.location.search;
      if (search.includes('filter=new')) {
        setFilters((prev) => ({ ...prev, sortBy: 'newest' }));
      } else if (search.includes('filter=sale')) {
        setFilters((prev) => ({ ...prev, onSaleOnly: true }));
      }
    }
  }, [currentPath]);

  // Extract unique categories across all products
  const availableCategories = useMemo(() => {
    const cats = Array.from(new Set(products.map((p) => p.category)));
    return cats.sort();
  }, [products]);

  // Filter and Sort logic
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Gender filter
      if (filters.gender.length > 0 && !filters.gender.includes(product.gender)) {
        return false;
      }

      // Category filter
      if (filters.category.length > 0 && !filters.category.includes(product.category)) {
        return false;
      }

      // Sizes filter (any match)
      if (filters.sizes.length > 0 && !product.sizes.some((s) => filters.sizes.includes(s))) {
        return false;
      }

      // Colors filter (any match)
      if (filters.colors.length > 0) {
        const hasColor = product.colors.some((c) =>
          filters.colors.some((fc) => c.name.toLowerCase().includes(fc.toLowerCase()))
        );
        if (!hasColor) return false;
      }

      // Price filter
      if (product.price > filters.priceRange[1]) {
        return false;
      }

      // Rating filter
      if (filters.minRating > 0 && product.rating < filters.minRating) {
        return false;
      }

      // In Stock filter
      if (filters.inStockOnly && product.stock <= 0) {
        return false;
      }

      // On Sale filter
      if (filters.onSaleOnly && (!product.discount || product.discount <= 0)) {
        return false;
      }

      // Search Query
      if (filters.searchQuery.trim() !== '') {
        const q = filters.searchQuery.toLowerCase();
        const match =
          product.name.toLowerCase().includes(q) ||
          product.category.toLowerCase().includes(q) ||
          product.description.toLowerCase().includes(q);
        if (!match) return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'newest') {
        return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
      }
      if (filters.sortBy === 'price-low') {
        return a.price - b.price;
      }
      if (filters.sortBy === 'price-high') {
        return b.price - a.price;
      }
      if (filters.sortBy === 'rating') {
        return b.rating - a.rating;
      }
      if (filters.sortBy === 'discount') {
        return b.discount - a.discount;
      }
      return 0; // featured
    });
  }, [products, filters]);

  const displayedProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 8);
  };

  return (
    <div id="shop-page-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Header Banner */}
      <div className="mb-8 pb-6 border-b border-[#E8E6DF] space-y-2">
        <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-[0.25em] text-[#8C8880]">
          <span>VELORA CATALOG</span>
          <span>·</span>
          <span>SS26 ATELIER</span>
        </div>
        <h1 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-[#1A1A1A]">
          Complete Garment Collection
        </h1>
        <p className="text-xs sm:text-sm text-[#8C8880] max-w-2xl font-light">
          Discover all 24+ signature silhouettes engineered with organic cotton, French flax, and Italian tailoring.
        </p>
      </div>

      {/* Control Bar: Mobile Filter Button & Desktop Sorting */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-[#E8E6DF] bg-white p-4 rounded-xl border">
        
        {/* Mobile Filter Toggle */}
        <button
          id="mobile-filter-open-btn"
          onClick={() => setMobileFilterOpen(true)}
          className="lg:hidden flex items-center space-x-2 px-4 py-2 bg-[#1A1A1A] text-white text-xs font-semibold uppercase tracking-wider rounded-lg"
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span>Filters ({filteredProducts.length})</span>
        </button>

        {/* Results Counter */}
        <div className="text-xs text-[#5A5854] font-medium">
          Showing <strong className="text-[#1A1A1A]">{displayedProducts.length}</strong> of{' '}
          <strong className="text-[#1A1A1A]">{filteredProducts.length}</strong> styles
        </div>

        {/* Sort Selector */}
        <div className="flex items-center space-x-2">
          <label htmlFor="shop-sort-select" className="text-xs font-semibold text-[#8C8880] uppercase tracking-wider">
            Sort by:
          </label>
          <select
            id="shop-sort-select"
            value={filters.sortBy}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                sortBy: e.target.value as FilterState['sortBy']
              }))
            }
            className="px-3 py-1.5 bg-[#FAF9F6] border border-[#DDD9CE] rounded-lg text-xs font-semibold text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A] cursor-pointer"
          >
            <option value="featured">Featured / Curated</option>
            <option value="newest">New Arrivals</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="discount">Biggest Discount</option>
          </select>
        </div>

      </div>

      {/* Main Grid & Desktop Sidebar Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Desktop Filters Sidebar (3 Cols) */}
        <div className="hidden lg:block lg:col-span-3 sticky top-24 bg-white p-6 rounded-2xl border border-[#E8E6DF] shadow-xs">
          <ProductFilters
            filters={filters}
            setFilters={setFilters}
            totalResults={filteredProducts.length}
            availableCategories={availableCategories}
          />
        </div>

        {/* Product Grid Area (9 Cols) */}
        <div className="lg:col-span-9">
          {displayedProducts.length === 0 ? (
            /* Empty State */
            <div id="shop-empty-state" className="p-12 text-center bg-white rounded-2xl border border-[#E8E6DF] space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#EFECE6] flex items-center justify-center mx-auto text-[#8C8880]">
                <SlidersHorizontal className="w-8 h-8" />
              </div>
              <h3 className="font-serif-luxury text-2xl font-bold text-[#1A1A1A]">
                No matching garments found
              </h3>
              <p className="text-xs text-[#8C8880] max-w-sm mx-auto">
                No styles match your currently selected filters. Try broadening your price range or clearing active tags.
              </p>
              <button
                id="shop-clear-all-filters-btn"
                onClick={() =>
                  setFilters({
                    gender: [],
                    category: [],
                    sizes: [],
                    colors: [],
                    priceRange: [0, 250],
                    minRating: 0,
                    inStockOnly: false,
                    onSaleOnly: false,
                    searchQuery: '',
                    sortBy: 'featured'
                  })
                }
                className="px-6 py-2.5 bg-[#1A1A1A] text-white text-xs uppercase tracking-widest font-semibold rounded-lg hover:bg-black transition-all"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="space-y-10">
              {/* Product Cards Grid: 4 Desktop, 3 Tablet, 2 Mobile */}
              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {displayedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Load More Interaction */}
              {hasMore && (
                <div className="text-center pt-6">
                  <button
                    id="shop-load-more-btn"
                    onClick={handleLoadMore}
                    className="px-8 py-3.5 bg-white border border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white text-xs uppercase tracking-[0.2em] font-bold rounded-xl transition-all shadow-xs hover:shadow-md"
                  >
                    Load More Styles ({filteredProducts.length - displayedProducts.length} remaining)
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

      </div>

      {/* Mobile Filter Drawer Overlay */}
      {mobileFilterOpen && (
        <div 
          id="mobile-filter-modal-overlay"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end lg:hidden animate-in fade-in duration-200"
          onClick={() => setMobileFilterOpen(false)}
        >
          <div 
            id="mobile-filter-panel"
            className="w-full max-w-sm bg-[#FAF9F6] h-full shadow-2xl overflow-y-auto animate-in slide-in-from-right duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-[#E8E6DF] flex items-center justify-between bg-white">
              <h3 className="font-serif-luxury text-lg font-bold text-[#1A1A1A]">
                Filters & Refinements
              </h3>
              <button
                id="mobile-filter-close-btn"
                onClick={() => setMobileFilterOpen(false)}
                aria-label="Close filters drawer"
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
export default ShopPage;