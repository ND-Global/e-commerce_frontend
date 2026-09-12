'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, Tag, Sparkles } from 'lucide-react';
import { useShop } from '../context/shopcontext';
import { Product } from '../types';

export const SearchModal: React.FC = () => {
  const { searchModalOpen, setSearchModalOpen, products, navigate } = useShop();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchModalOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      setQuery('');
    }
  }, [searchModalOpen]);

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && searchModalOpen) {
        setSearchModalOpen(false);
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchModalOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [searchModalOpen, setSearchModalOpen]);

  if (!searchModalOpen) return null;

  const filteredProducts = query.trim() === '' 
    ? [] 
    : products.filter((p) => {
        const q = query.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.gender.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q)
        );
      });

  const popularSearches = [
    'Oversized Blazer',
    'Heavyweight T-Shirt',
    'French Linen',
    'Satin Dress',
    'Kids Fleece',
    'Denim Jeans',
    'Wool Bomber'
  ];

  const handleProductSelect = (product: Product) => {
    setSearchModalOpen(false);
    navigate(`/product/${product.slug}`);
  };

  return (
    <div 
      id="search-modal-overlay"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center pt-16 sm:pt-24 px-4 animate-in fade-in duration-200"
      onClick={() => setSearchModalOpen(false)}
    >
      <div 
        id="search-modal-panel"
        className="w-full max-w-3xl bg-[#FAF9F6] rounded-2xl shadow-2xl overflow-hidden border border-[#E0DDD5] animate-in zoom-in-95 duration-200 flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Search Input Bar */}
        <div className="p-4 sm:p-6 border-b border-[#E8E6DF] flex items-center space-x-3 bg-white">
          <Search className="w-5 h-5 text-[#8C8880] flex-shrink-0" />
          <input
            ref={inputRef}
            id="search-input-field"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by garment name, category, fabric, or style..."
            className="flex-1 bg-transparent border-none text-base sm:text-lg text-[#1A1A1A] placeholder-[#9E9B95] focus:outline-none font-medium"
          />
          {query && (
            <button
              id="search-clear-query-btn"
              onClick={() => setQuery('')}
              className="text-xs text-[#8C8880] hover:text-[#1A1A1A] bg-[#EFECE6] px-2 py-1 rounded-md"
            >
              Clear
            </button>
          )}
          <button
            id="search-modal-close-btn"
            onClick={() => setSearchModalOpen(false)}
            aria-label="Close search dialog"
            className="p-1 text-[#8C8880] hover:text-[#1A1A1A] hover:bg-[#EFECE6] rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results / Suggestions Container */}
        <div className="p-6 overflow-y-auto flex-1">
          {query.trim() === '' ? (
            <div className="space-y-6">
              
              {/* Popular Searches */}
              <div>
                <div className="flex items-center space-x-2 text-xs font-semibold text-[#8C8880] uppercase tracking-widest mb-3">
                  <Sparkles className="w-3.5 h-3.5 text-[#B58D5C]" />
                  <span>Popular Trending Searches</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map((tag) => (
                    <button
                      key={tag}
                      id={`search-popular-${tag.toLowerCase().replace(/\s+/g, '-')}`}
                      onClick={() => setQuery(tag)}
                      className="px-3.5 py-1.5 bg-white border border-[#DDD9CE] hover:border-[#1A1A1A] rounded-full text-xs font-medium text-[#1A1A1A] transition-all hover:bg-[#1A1A1A] hover:text-white"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Categories Navigation */}
              <div>
                <div className="text-xs font-semibold text-[#8C8880] uppercase tracking-widest mb-3">
                  Browse by Department
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    id="search-dept-men"
                    onClick={() => {
                      setSearchModalOpen(false);
                      navigate('/men');
                    }}
                    className="p-3 bg-white border border-[#DDD9CE] hover:border-[#1A1A1A] rounded-xl text-left transition-all group"
                  >
                    <div className="font-serif-luxury font-bold text-sm text-[#1A1A1A] group-hover:underline">
                      Men's Collection
                    </div>
                    <div className="text-xs text-[#8C8880] mt-0.5">8 Essential Styles</div>
                  </button>

                  <button
                    id="search-dept-women"
                    onClick={() => {
                      setSearchModalOpen(false);
                      navigate('/women');
                    }}
                    className="p-3 bg-white border border-[#DDD9CE] hover:border-[#1A1A1A] rounded-xl text-left transition-all group"
                  >
                    <div className="font-serif-luxury font-bold text-sm text-[#1A1A1A] group-hover:underline">
                      Women's Collection
                    </div>
                    <div className="text-xs text-[#8C8880] mt-0.5">8 Timeless Pieces</div>
                  </button>

                  <button
                    id="search-dept-kids"
                    onClick={() => {
                      setSearchModalOpen(false);
                      navigate('/kids');
                    }}
                    className="p-3 bg-white border border-[#DDD9CE] hover:border-[#1A1A1A] rounded-xl text-left transition-all group"
                  >
                    <div className="font-serif-luxury font-bold text-sm text-[#1A1A1A] group-hover:underline">
                      Kids Collection
                    </div>
                    <div className="text-xs text-[#8C8880] mt-0.5">8 Playful Essentials</div>
                  </button>
                </div>
              </div>

            </div>
          ) : (
            <div>
              {/* Results Count Header */}
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#E8E6DF]">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#8C8880]">
                  {filteredProducts.length} {filteredProducts.length === 1 ? 'Product' : 'Products'} Found
                </span>
                <span className="text-xs text-[#8C8880]">
                  Matching "<strong className="text-[#1A1A1A]">{query}</strong>"
                </span>
              </div>

              {filteredProducts.length === 0 ? (
                /* Empty State */
                <div id="search-empty-state" className="text-center py-12 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-[#EFECE6] flex items-center justify-center mx-auto text-[#8C8880]">
                    <Search className="w-6 h-6" />
                  </div>
                  <h4 className="font-serif-luxury text-lg font-bold text-[#1A1A1A]">
                    No products found
                  </h4>
                  <p className="text-xs text-[#8C8880] max-w-sm mx-auto">
                    We couldn't find any results matching "{query}". Try checking your spelling or browsing our category collections.
                  </p>
                  <button
                    id="search-view-all-shop-btn"
                    onClick={() => {
                      setSearchModalOpen(false);
                      navigate('/shop');
                    }}
                    className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-[#1A1A1A] border-b border-[#1A1A1A] pb-0.5 hover:opacity-75 pt-2"
                  >
                    <span>View All Collections</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                /* Products List */
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {filteredProducts.map((prod) => (
                    <div
                      key={prod.id}
                      id={`search-result-${prod.id}`}
                      onClick={() => handleProductSelect(prod)}
                      className="flex items-center p-3 bg-white border border-[#DDD9CE] hover:border-[#1A1A1A] rounded-xl cursor-pointer transition-all hover:shadow-md group"
                    >
                      <div className="w-16 h-20 bg-[#F0ECE1] rounded-lg overflow-hidden flex-shrink-0 mr-3.5">
                        <img
                          src={prod.images[0]}
                          alt={prod.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-1.5 text-[10px] text-[#8C8880] uppercase tracking-wider">
                          <span className="font-semibold">{prod.gender}</span>
                          <span>·</span>
                          <span>{prod.category}</span>
                        </div>
                        <h4 className="text-sm font-medium text-[#1A1A1A] truncate group-hover:underline mt-0.5">
                          {prod.name}
                        </h4>
                        <div className="flex items-center space-x-2 mt-1.5">
                          <span className="text-sm font-semibold text-[#1A1A1A]">
                            ${prod.price}
                          </span>
                          {prod.originalPrice > prod.price && (
                            <span className="text-xs text-[#9E9B95] line-through">
                              ${prod.originalPrice}
                            </span>
                          )}
                          {prod.discount > 0 && (
                            <span className="text-[10px] font-bold text-[#A3433B] bg-[#F9ECEB] px-1.5 py-0.5 rounded">
                              {prod.discount}% OFF
                            </span>
                          )}
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#8C8880] group-hover:text-[#1A1A1A] group-hover:translate-x-1 transition-all ml-2" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer / Shortcut notice */}
        <div className="p-3.5 bg-[#EFECE6] border-t border-[#E8E6DF] flex items-center justify-between text-xs text-[#8C8880] px-6">
          <span>Press <kbd className="bg-white border border-[#D5D2C9] px-1.5 py-0.5 rounded text-[10px] text-[#1A1A1A]">ESC</kbd> to close</span>
          <button 
            id="search-footer-browse-all-btn"
            onClick={() => {
              setSearchModalOpen(false);
              navigate('/shop');
            }}
            className="font-medium text-[#1A1A1A] hover:underline"
          >
            Explore Complete Catalog →
          </button>
        </div>

      </div>
    </div>
  );
};
