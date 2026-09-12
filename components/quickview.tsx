'use client';
import React, { useState, useEffect } from 'react';
import { 
  X, 
  Star, 
  Heart, 
  ShoppingBag, 
  Check, 
  ArrowRight, 
  Truck, 
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { useShop } from '../context/shopcontext';
import { ProductColor } from '../types';
const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  'http://localhost:7000/api';

const BACKEND_URL = API_URL.replace(/\/api\/?$/, '');

const getImageUrl = (image?: string) => {
  if (!image) return '';

  if (
    image.startsWith('http://') ||
    image.startsWith('https://')
  ) {
    return image;
  }

  return `${BACKEND_URL}/${image.replace(/^\/+/, '')}`;
};

export const QuickViewModal: React.FC = () => {
  const { 
    quickViewProduct, 
    setQuickViewProduct, 
    addToCart, 
    isInWishlist, 
    toggleWishlist,
    navigate,
    setSizeGuideOpen 
  } = useShop();

  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (quickViewProduct) {
      setSelectedImageIdx(0);
      setSelectedSize(quickViewProduct.sizes[0] || 'M');
      setSelectedColor(quickViewProduct.colors[0] || null);
      setQuantity(1);
    }
  }, [quickViewProduct]);

  if (!quickViewProduct) return null;

  const inWish = isInWishlist(quickViewProduct.id);

 const handleAddToCart = async () => {
  if (!selectedColor || !quickViewProduct) return;

  const ok = await addToCart(
    quickViewProduct,
    selectedSize,
    selectedColor,
    quantity
  );

  if (ok) {
    setQuickViewProduct(null);
  }
};

const handleFullDetails = () => {
  if (!quickViewProduct) return;

  setQuickViewProduct(null);
  navigate(`/product/${quickViewProduct.slug}`);
};

  return (
    <div 
      id="quickview-modal-overlay"
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
      onClick={() => setQuickViewProduct(null)}
    >
      <div 
        id="quickview-modal-panel"
        className="w-full max-w-4xl bg-[#FAF9F6] rounded-2xl shadow-2xl overflow-hidden border border-[#E0DDD5] animate-in zoom-in-95 duration-200 relative max-h-[92vh] flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Close Button */}
        <button
          id="quickview-close-btn"
          onClick={() => setQuickViewProduct(null)}
          aria-label="Close quick view"
          className="absolute top-4 right-4 z-20 p-2 bg-white/90 hover:bg-white text-[#1A1A1A] rounded-full shadow-md transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Images Gallery Column */}
        <div className="w-full md:w-1/2 p-6 bg-[#F4F1EA] flex flex-col justify-between overflow-y-auto">
          {/* Main Large Image */}
          <div className="w-full aspect-[3/4] bg-[#EAE6DF] rounded-xl overflow-hidden shadow-sm relative">
            <img
  src={getImageUrl(
    quickViewProduct.images[selectedImageIdx] ||
      quickViewProduct.images[0]
  )}
  alt={quickViewProduct.name}
  referrerPolicy="no-referrer"
  className="w-full h-full object-cover object-center"
/>
            {quickViewProduct.discount > 0 && (
              <span className="absolute top-3 left-3 bg-[#A3433B] text-white text-[11px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                {quickViewProduct.discount}% OFF
              </span>
            )}
          </div>

          {/* Thumbnail Selector */}
          {quickViewProduct.images.length > 1 && (
            <div className="flex space-x-2 mt-3 overflow-x-auto pb-1">
              {quickViewProduct.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIdx(idx)}
                  className={`w-16 h-20 rounded-lg overflow-hidden border-2 flex-shrink-0 transition-all ${
                    selectedImageIdx === idx ? 'border-[#1A1A1A] ring-1 ring-[#1A1A1A]' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
  src={getImageUrl(img)}
  alt=""
  referrerPolicy="no-referrer"
  className="w-full h-full object-cover"
/>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details & Actions Column */}
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto max-h-[85vh] md:max-h-[90vh]">
          
          <div className="space-y-4">
            
            {/* Header info */}
            <div>
              <div className="flex items-center space-x-2 text-[11px] uppercase tracking-widest text-[#8C8880] font-semibold">
                <span>{quickViewProduct.gender}</span>
                <span>•</span>
                <span>{quickViewProduct.category}</span>
                <span>•</span>
                <span className="text-[#A3433B]">SKU: {quickViewProduct.sku}</span>
              </div>

              <h2 className="font-serif-luxury text-2xl font-bold text-[#1A1A1A] mt-1">
                {quickViewProduct.name}
              </h2>

              {/* Rating */}
              <div className="flex items-center space-x-2 mt-2">
                <div className="flex text-[#C29B38]">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < Math.floor(quickViewProduct.rating) ? 'fill-current' : 'opacity-30'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs font-semibold text-[#1A1A1A]">{quickViewProduct.rating}</span>
                <span className="text-xs text-[#8C8880]">({quickViewProduct.reviewsCount} reviews)</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline space-x-3">
              <span className="text-2xl font-bold text-[#1A1A1A]">
                ${quickViewProduct.price}
              </span>
              {quickViewProduct.originalPrice > quickViewProduct.price && (
                <span className="text-base text-[#8C8880] line-through">
                  ${quickViewProduct.originalPrice}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-xs text-[#5A5854] leading-relaxed line-clamp-3">
              {quickViewProduct.description}
            </p>

            {/* Color Selection */}
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-semibold text-[#1A1A1A]">
                  Color: <span className="font-normal text-[#5A5854]">{selectedColor?.name}</span>
                </span>
              </div>
              <div className="flex space-x-2.5">
                {quickViewProduct.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c)}
                    className={`relative w-8 h-8 rounded-full border-2 transition-all p-0.5 ${
                      selectedColor?.name === c.name ? 'border-[#1A1A1A] scale-110' : 'border-transparent hover:scale-105'
                    }`}
                    title={c.name}
                  >
                    <span 
                      className="block w-full h-full rounded-full border border-black/15"
                      style={{ backgroundColor: c.hex }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-semibold text-[#1A1A1A]">
                  Select Size: <span className="font-normal text-[#5A5854]">{selectedSize}</span>
                </span>
                <button
                  id="quickview-size-guide-btn"
                  onClick={() => setSizeGuideOpen(true)}
                  className="text-xs text-[#8C8880] underline hover:text-[#1A1A1A]"
                >
                  Size Guide
                </button>
              </div>
              <div className="grid grid-cols-6 gap-1.5">
                {quickViewProduct.sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`py-2 text-xs font-semibold rounded-lg border transition-all ${
                      selectedSize === sz
                        ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                        : 'bg-white text-[#1A1A1A] border-[#DDD9CE] hover:border-[#1A1A1A]'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="flex items-center space-x-3 pt-1">
              <span className="text-xs font-semibold text-[#1A1A1A]">Quantity:</span>
              <div className="flex items-center border border-[#DDD9CE] rounded-lg bg-white overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-2.5 py-1.5 text-xs text-[#5A5854] hover:bg-[#EFECE6]"
                >
                  -
                </button>
                <span className="px-3 text-xs font-bold text-[#1A1A1A]">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(quickViewProduct.stock, quantity + 1))}
                  className="px-2.5 py-1.5 text-xs text-[#5A5854] hover:bg-[#EFECE6]"
                >
                  +
                </button>
              </div>
              <span className="text-[11px] text-[#8C8880]">
                ({quickViewProduct.stock} items in stock)
              </span>
            </div>

          </div>

          {/* Action Buttons */}
          <div className="pt-6 space-y-3 border-t border-[#E8E6DF] mt-4">
            <div className="flex space-x-2">
              <button
                id="quickview-add-to-cart-btn"
                onClick={handleAddToCart}
                className="flex-1 py-3.5 bg-[#1A1A1A] text-white text-xs uppercase tracking-[0.2em] font-semibold rounded-lg hover:bg-black transition-all flex items-center justify-center space-x-2 shadow-sm"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Shopping Bag</span>
              </button>

              <button
                id="quickview-wishlist-btn"
                onClick={() => toggleWishlist(quickViewProduct.id)}
                aria-label="Save to wishlist"
                className={`p-3.5 border rounded-lg transition-all ${
                  inWish 
                    ? 'border-[#A3433B] bg-[#F9ECEB] text-[#A3433B]' 
                    : 'border-[#DDD9CE] bg-white text-[#1A1A1A] hover:border-[#1A1A1A]'
                }`}
              >
                <Heart className={`w-4 h-4 ${inWish ? 'fill-current' : ''}`} />
              </button>
            </div>

            <button
              id="quickview-full-details-btn"
              onClick={handleFullDetails}
              className="w-full py-2 text-xs text-[#5A5854] hover:text-[#1A1A1A] flex items-center justify-center space-x-1.5 transition-colors"
            >
              <span>View complete product page & reviews</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
