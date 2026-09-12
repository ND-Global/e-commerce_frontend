'use client';
import React, { useState } from 'react';
import { Heart, Star, ShoppingBag, Eye, Check } from 'lucide-react';
import { Product } from '../types';
import { useShop } from '../context/shopcontext';

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  'http://localhost:7000/api';

const BACKEND_URL = API_URL.replace(/\/api\/?$/, '');

interface ProductCardProps {
  product: Product;
  aspectRatio?: 'portrait' | 'square';
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  aspectRatio = 'portrait'
}) => {
  const {
    isInWishlist,
    toggleWishlist,
    addToCart,
    setQuickViewProduct,
    navigate
  } = useShop();

  const [isHovered, setIsHovered] = useState(false);
  const inWish = isInWishlist(product.id);

  const primaryImage = product.images[0];
  const secondaryImage = product.images[1] || product.images[0];

  // Normalize product image path
  const getImageUrl = (image?: string) => {
  if (!image) return '';

  if (image.startsWith('http://') || image.startsWith('https://')) {
    console.log('FINAL IMAGE URL:', image);
    return image;
  }

  const cleanImage = image.replace(/^\/+/, '');
  const finalUrl = `${BACKEND_URL}/${cleanImage}`;

  console.log('FINAL IMAGE URL:', finalUrl);

  return finalUrl;
};

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    const defaultSize = product.sizes[0] || 'M';
    const defaultColor = product.colors[0] || {
      name: 'Default',
      hex: '#000'
    };
    addToCart(product, defaultSize, defaultColor, 1);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    setQuickViewProduct(product);
  };

  const handleCardClick = () => {
    navigate(`/product/${product.slug}`);
  };

  return (
    <div
      id={`product-card-${product.id}`}
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col bg-white overflow-hidden border border-[#0A0A0A]/10 hover:border-[#0A0A0A]/30 transition-all duration-500 cursor-pointer"
    >

      {/* Product Image Stage */}
      <div
        className={`relative w-full overflow-hidden bg-[#F9F8F6] ${
          aspectRatio === 'portrait'
            ? 'aspect-[3/4]'
            : 'aspect-square'
        }`}
      >

        {/* Main Image */}
        <img
          src={getImageUrl(primaryImage)}
          alt={product.name}
          referrerPolicy="no-referrer"
          className={`w-full h-full object-cover object-center group-hover:grayscale-0 transition-all duration-700 ease-out ${
            isHovered && product.images.length > 1
              ? 'opacity-0 scale-105'
              : 'opacity-100 scale-100'
          }`}
        />

        {/* Secondary Hover Image */}
        {product.images.length > 1 && (
          <img
            src={getImageUrl(secondaryImage)}
            alt={product.name}
            referrerPolicy="no-referrer"
            className={`absolute inset-0 w-full h-full object-cover object-center group-hover:grayscale-0 transition-all duration-700 ease-out ${
              isHovered
                ? 'opacity-100 scale-105'
                : 'opacity-0 scale-100'
            }`}
          />
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col space-y-1.5 z-10">
          {product.discount > 0 && (
            <span className="bg-[#0A0A0A] text-[#FDFCFB] text-[8px] font-bold px-2 py-0.5 uppercase tracking-[0.2em] shadow-xs">
              {product.discount}% OFF
            </span>
          )}

          {product.isNewArrival && !product.discount && (
            <span className="bg-white text-[#0A0A0A] border border-[#0A0A0A]/10 text-[8px] font-bold px-2 py-0.5 uppercase tracking-[0.2em] shadow-xs">
              NEW
            </span>
          )}

          {product.isTrending && (
            <span className="bg-[#C4A484] text-white text-[8px] font-bold px-2 py-0.5 uppercase tracking-[0.2em] shadow-xs">
              TRENDING
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          id={`wishlist-btn-${product.id}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          aria-label={
            inWish
              ? 'Remove from wishlist'
              : 'Add to wishlist'
          }
          className={`absolute top-3 right-3 z-10 p-2 backdrop-blur-xs transition-all duration-200 ${
            inWish
              ? 'bg-[#0A0A0A] text-white'
              : 'bg-white/80 hover:bg-white text-[#0A0A0A] opacity-70 hover:opacity-100'
          }`}
        >
          <Heart
            className={`w-3.5 h-3.5 ${
              inWish ? 'fill-current' : ''
            }`}
          />
        </button>

        {/* Hover Floating Action Buttons */}
        <div className="absolute inset-x-3 bottom-3 z-10 flex space-x-2 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <button
            id={`quick-view-btn-${product.id}`}
            onClick={handleQuickView}
            className="flex-1 py-2 px-2 bg-white/95 hover:bg-white text-[#0A0A0A] text-[9px] tracking-widest font-bold uppercase shadow-sm backdrop-blur-xs flex items-center justify-center space-x-1.5 transition-all"
          >
            <Eye className="w-3 h-3" />
            <span className="hidden sm:inline">
              QUICK VIEW
            </span>
          </button>

          <button
            id={`quick-add-btn-${product.id}`}
            onClick={handleQuickAdd}
            className="py-2 px-3 bg-[#0A0A0A] hover:bg-black text-white text-[9px] tracking-widest font-bold uppercase shadow-sm flex items-center justify-center space-x-1 transition-all"
            title="Quick add default size"
          >
            <ShoppingBag className="w-3 h-3" />
            <span className="hidden sm:inline">
              + BAG
            </span>
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-3.5 flex flex-col flex-1 justify-between bg-white">
        <div>

          {/* Category & Color Swatches */}
          <div className="flex items-center justify-between text-[9px] text-[#0A0A0A]/50 uppercase tracking-[0.2em] mb-1 font-medium">
            <span>
              {product.gender} · {product.category}
            </span>

            <div className="flex space-x-1">
              {product.colors.slice(0, 3).map((c) => (
                <span
                  key={c.name}
                  className="w-2 h-2 rounded-full border border-black/20"
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                />
              ))}

              {product.colors.length > 3 && (
                <span className="text-[8px] text-[#0A0A0A]/40">
                  +{product.colors.length - 3}
                </span>
              )}
            </div>
          </div>

          {/* Name */}
          <h3 className="text-[13px] font-medium text-[#0A0A0A] line-clamp-1 group-hover:opacity-60 transition-opacity">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center space-x-1.5 mt-1">
            <div className="flex text-[#C4A484]">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-2.5 h-2.5 ${
                    i < Math.floor(product.rating)
                      ? 'fill-current'
                      : 'opacity-20'
                  }`}
                />
              ))}
            </div>

            <span className="text-[10px] font-semibold text-[#0A0A0A]">
              {product.rating}
            </span>

            <span className="text-[9px] text-[#0A0A0A]/40">
              ({product.reviewsCount})
            </span>
          </div>
        </div>

        {/* Pricing */}
        <div className="flex items-baseline justify-between mt-2.5 pt-2 border-t border-[#0A0A0A]/5">
          <div className="flex items-baseline space-x-1.5">
            <span className="text-[13px] font-serif italic text-[#0A0A0A]">
              ${product.price}.00
            </span>

            {product.originalPrice > product.price && (
              <span className="text-[11px] text-[#0A0A0A]/40 line-through">
                ${product.originalPrice}.00
              </span>
            )}
          </div>

          <button
            id={`card-add-cart-btn-${product.id}`}
            onClick={handleQuickAdd}
            className="text-[9px] font-bold uppercase tracking-widest text-[#0A0A0A] hover:text-[#C4A484] transition-colors py-1 flex items-center space-x-1"
          >
            <span>+ ADD</span>
          </button>
        </div>
      </div>
    </div>
  );
};