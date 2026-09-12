import React from 'react';
import { X, RotateCcw, Check, SlidersHorizontal } from 'lucide-react';
import { FilterState } from '../types';

interface ProductFiltersProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  totalResults: number;
  availableCategories: string[];
  isMobileDrawer?: boolean;
  onCloseMobileDrawer?: () => void;
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  filters,
  setFilters,
  totalResults,
  availableCategories,
  isMobileDrawer = false,
  onCloseMobileDrawer
}) => {
  const GENDERS = [
    { label: 'Men', value: 'men' },
    { label: 'Women', value: 'women' },
    { label: 'Kids', value: 'kids' },
  ];

  const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  const COLOR_SWATCHES = [
    { name: 'Black', hex: '#1A1A1A' },
    { name: 'White', hex: '#FFFFFF' },
    { name: 'Beige / Sand', hex: '#D8CAB8' },
    { name: 'Navy / Blue', hex: '#2A4D69' },
    { name: 'Olive / Green', hex: '#4A5543' },
    { name: 'Camel / Brown', hex: '#B58D5C' },
    { name: 'Grey / Charcoal', hex: '#8E929D' },
    { name: 'Gold / Champagne', hex: '#E6D7B9' },
  ];

  const handleGenderToggle = (val: string) => {
    setFilters((prev) => {
      const exists = prev.gender.includes(val);
      return {
        ...prev,
        gender: exists ? prev.gender.filter((g) => g !== val) : [...prev.gender, val]
      };
    });
  };

  const handleCategoryToggle = (val: string) => {
    setFilters((prev) => {
      const exists = prev.category.includes(val);
      return {
        ...prev,
        category: exists ? prev.category.filter((c) => c !== val) : [...prev.category, val]
      };
    });
  };

  const handleSizeToggle = (sz: string) => {
    setFilters((prev) => {
      const exists = prev.sizes.includes(sz);
      return {
        ...prev,
        sizes: exists ? prev.sizes.filter((s) => s !== sz) : [...prev.sizes, sz]
      };
    });
  };

  const handleColorToggle = (colorName: string) => {
    setFilters((prev) => {
      const exists = prev.colors.includes(colorName);
      return {
        ...prev,
        colors: exists ? prev.colors.filter((c) => c !== colorName) : [...prev.colors, colorName]
      };
    });
  };

  const handleResetFilters = () => {
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
    });
  };

  const hasActiveFilters =
    filters.gender.length > 0 ||
    filters.category.length > 0 ||
    filters.sizes.length > 0 ||
    filters.colors.length > 0 ||
    filters.priceRange[1] < 250 ||
    filters.minRating > 0 ||
    filters.inStockOnly ||
    filters.onSaleOnly;

  return (
    <div className={`space-y-6 ${isMobileDrawer ? 'p-6' : 'pr-6'}`}>
      
      {/* Filters Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#E8E6DF]">
        <div className="flex items-center space-x-2">
          <SlidersHorizontal className="w-4 h-4 text-[#1A1A1A]" />
          <h3 className="font-serif-luxury text-lg font-bold text-[#1A1A1A]">
            Refine Selection
          </h3>
        </div>

        {hasActiveFilters && (
          <button
            id="filter-reset-all-btn"
            onClick={handleResetFilters}
            className="flex items-center space-x-1 text-xs text-[#A3433B] hover:text-[#802D26] font-medium transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset All</span>
          </button>
        )}
      </div>

      {/* Gender / Department */}
      <div className="space-y-2.5">
        <h4 className="text-xs font-bold uppercase tracking-widest text-[#1A1A1A]">
          Department
        </h4>
        <div className="space-y-1.5">
          {GENDERS.map((g) => {
            const checked = filters.gender.includes(g.value);
            return (
              <label
                key={g.value}
                id={`filter-gender-${g.value}`}
                className="flex items-center space-x-2.5 text-xs text-[#5A5854] hover:text-[#1A1A1A] cursor-pointer py-1 select-none"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => handleGenderToggle(g.value)}
                  className="rounded border-[#DDD9CE] text-[#1A1A1A] focus:ring-0 focus:ring-offset-0 w-3.5 h-3.5 cursor-pointer"
                />
                <span className={checked ? 'font-semibold text-[#1A1A1A]' : ''}>
                  {g.label}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-2.5">
        <h4 className="text-xs font-bold uppercase tracking-widest text-[#1A1A1A]">
          Garment Category
        </h4>
        <div className="max-h-48 overflow-y-auto space-y-1.5 pr-2">
          {availableCategories.map((cat) => {
            const checked = filters.category.includes(cat);
            return (
              <label
                key={cat}
                id={`filter-category-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                className="flex items-center space-x-2.5 text-xs text-[#5A5854] hover:text-[#1A1A1A] cursor-pointer py-1 select-none"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => handleCategoryToggle(cat)}
                  className="rounded border-[#DDD9CE] text-[#1A1A1A] focus:ring-0 focus:ring-offset-0 w-3.5 h-3.5 cursor-pointer"
                />
                <span className={checked ? 'font-semibold text-[#1A1A1A]' : ''}>
                  {cat}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Sizes */}
      <div className="space-y-2.5">
        <h4 className="text-xs font-bold uppercase tracking-widest text-[#1A1A1A]">
          Size
        </h4>
        <div className="grid grid-cols-3 gap-1.5">
          {SIZES.map((sz) => {
            const active = filters.sizes.includes(sz);
            return (
              <button
                key={sz}
                id={`filter-size-${sz.toLowerCase()}`}
                onClick={() => handleSizeToggle(sz)}
                className={`py-1.5 text-xs font-medium rounded-lg border transition-all ${
                  active
                    ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                    : 'bg-white text-[#5A5854] border-[#DDD9CE] hover:border-[#1A1A1A] hover:text-[#1A1A1A]'
                }`}
              >
                {sz}
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Range Slider */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between text-xs">
          <h4 className="font-bold uppercase tracking-widest text-[#1A1A1A]">
            Price Range
          </h4>
          <span className="font-semibold text-[#1A1A1A]">
            Up to ${filters.priceRange[1]}
          </span>
        </div>
        <input
          id="filter-price-slider"
          type="range"
          min="20"
          max="250"
          step="5"
          value={filters.priceRange[1]}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              priceRange: [prev.priceRange[0], Number(e.target.value)]
            }))
          }
          className="w-full accent-[#1A1A1A] cursor-pointer"
        />
        <div className="flex justify-between text-[11px] text-[#8C8880]">
          <span>$20</span>
          <span>$125</span>
          <span>$250</span>
        </div>
      </div>

      {/* Special Badges (Sale / In Stock) */}
      <div className="space-y-2 pt-2 border-t border-[#E8E6DF]">
        <label 
          id="filter-on-sale-checkbox"
          className="flex items-center space-x-2.5 text-xs text-[#5A5854] hover:text-[#1A1A1A] cursor-pointer py-1 select-none"
        >
          <input
            type="checkbox"
            checked={filters.onSaleOnly}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, onSaleOnly: e.target.checked }))
            }
            className="rounded border-[#DDD9CE] text-[#A3433B] focus:ring-0 focus:ring-offset-0 w-3.5 h-3.5 cursor-pointer"
          />
          <span className={filters.onSaleOnly ? 'font-semibold text-[#A3433B]' : ''}>
            Sale & Special Offers Only
          </span>
        </label>

        <label 
          id="filter-in-stock-checkbox"
          className="flex items-center space-x-2.5 text-xs text-[#5A5854] hover:text-[#1A1A1A] cursor-pointer py-1 select-none"
        >
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, inStockOnly: e.target.checked }))
            }
            className="rounded border-[#DDD9CE] text-[#1A1A1A] focus:ring-0 focus:ring-offset-0 w-3.5 h-3.5 cursor-pointer"
          />
          <span className={filters.inStockOnly ? 'font-semibold text-[#1A1A1A]' : ''}>
            In Stock Only
          </span>
        </label>
      </div>

      {/* Mobile Drawer Done Button */}
      {isMobileDrawer && onCloseMobileDrawer && (
        <div className="pt-4 border-t border-[#E8E6DF]">
          <button
            id="filter-mobile-apply-btn"
            onClick={onCloseMobileDrawer}
            className="w-full py-3 bg-[#1A1A1A] text-white text-xs uppercase tracking-widest font-semibold rounded-lg hover:bg-black transition-all"
          >
            Show {totalResults} Results
          </button>
        </div>
      )}

    </div>
  );
};
