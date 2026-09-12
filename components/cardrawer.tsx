'use client';
import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Sparkles, 
  Check, 
  Heart,
  Truck
} from 'lucide-react';
import { useShop } from '../context/shopcontext';
import { SITE_CONFIG } from '../config/site'
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

  const cleanImage = image.replace(/^\/+/, '');

  return `${BACKEND_URL}/${cleanImage}`;
};
export const CartDrawer: React.FC = () => {
  const { 
    cartDrawerOpen, 
    setCartDrawerOpen, 
    cart, 
    updateCartQuantity, 
    removeFromCart, 
    subtotal, 
    discountAmount, 
    shippingFee, 
    total, 
    appliedCoupon, 
    applyCoupon, 
    removeCoupon, 
    navigate,
    toggleWishlist,
    isInWishlist
  } = useShop();

  const [couponCode, setCouponCode] = useState('');
  const [couponMsg, setCouponMsg] = useState<{ text: string; isError: boolean } | null>(null);

  if (!cartDrawerOpen) return null;

  const threshold = SITE_CONFIG.shipping.freeShippingThreshold;
  const progressPercent = Math.min(100, (subtotal / threshold) * 100);
  const remainingForFreeShipping = Math.max(0, threshold - subtotal);

 const handleApplyCoupon = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!couponCode.trim()) return;

  const res = await applyCoupon(couponCode);

  if (res && typeof res === 'object') {
    setCouponMsg({
      text: res.message,
      isError: !res.success,
    });

    if (res.success) {
      setCouponCode('');
    }
  } else {
    setCouponMsg({
      text: 'Invalid coupon code',
      isError: true,
    });
  }
};

  const handleCheckout = () => {
    setCartDrawerOpen(false);
    navigate('/checkout');
  };

  const handleViewCart = () => {
    setCartDrawerOpen(false);
    navigate('/cart');
  };

  return (
    <div 
      id="cart-drawer-overlay"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200"
      onClick={() => setCartDrawerOpen(false)}
    >
      <div 
        id="cart-drawer-panel"
        className="w-full max-w-md bg-[#FAF9F6] h-full shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#E8E6DF] flex items-center justify-between bg-white">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="w-5 h-5 text-[#1A1A1A]" />
            <h3 className="font-serif-luxury text-xl font-bold tracking-wide text-[#1A1A1A]">
              Shopping Bag
            </h3>
            <span className="text-xs font-semibold text-[#8C8880] bg-[#EFECE6] px-2 py-0.5 rounded-full">
              {cart.reduce((s, i) => s + i.quantity, 0)}
            </span>
          </div>

          <button
            id="cart-drawer-close-btn"
            onClick={() => setCartDrawerOpen(false)}
            aria-label="Close cart drawer"
            className="p-1.5 text-[#8C8880] hover:text-[#1A1A1A] hover:bg-[#EFECE6] rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="bg-[#F0ECE1] px-5 py-3 border-b border-[#E8E6DF]">
          <div className="flex items-center justify-between text-xs font-medium text-[#1A1A1A] mb-1.5">
            <span className="flex items-center space-x-1.5">
              <Truck className="w-3.5 h-3.5 text-[#2A6E3F]" />
              {remainingForFreeShipping === 0 ? (
                <strong className="text-[#2A6E3F]">You unlocked Free Express Shipping!</strong>
              ) : (
                <span>
                  Add <strong className="text-[#1A1A1A]">${remainingForFreeShipping.toFixed(2)}</strong> more for <strong>Free Express Shipping</strong>
                </span>
              )}
            </span>
            <span className="text-[11px] text-[#8C8880] font-semibold">{Math.round(progressPercent)}%</span>
          </div>
          <div className="w-full h-1.5 bg-[#DDD8CC] rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#1A1A1A] transition-all duration-500 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-5 divide-y divide-[#E8E6DF]">
          {cart.length === 0 ? (
            <div id="cart-drawer-empty" className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#EFECE6] flex items-center justify-center text-[#8C8880]">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <div>
                <h4 className="font-serif-luxury text-lg font-bold text-[#1A1A1A]">
                  Your bag is empty
                </h4>
                <p className="text-xs text-[#8C8880] max-w-xs mt-1">
                  Explore our curated seasonal tailoring, organic knits, and everyday luxury essentials.
                </p>
              </div>
              <button
                id="cart-empty-shop-btn"
                onClick={() => {
                  setCartDrawerOpen(false);
                  navigate('/shop');
                }}
                className="mt-2 px-6 py-2.5 bg-[#1A1A1A] text-white text-xs uppercase tracking-widest font-semibold rounded-lg hover:bg-black transition-all shadow-sm"
              >
                Explore Collections
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} id={`cart-item-${item.id}`} className="py-4 first:pt-0 last:pb-0 flex space-x-3.5">
                {/* Product Thumbnail */}
                <div 
                  className="w-20 h-24 bg-[#EFECE6] rounded-lg overflow-hidden flex-shrink-0 cursor-pointer"
                  onClick={() => {
                    setCartDrawerOpen(false);
                    navigate(`/product/${item.product.slug}`);
                  }}
                >
                  <img
                    src={getImageUrl(item.product.images?.[0])}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center hover:scale-105 transition-transform"
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div>
                    <div className="flex items-start justify-between">
                      <h4 
                        onClick={() => {
                          setCartDrawerOpen(false);
                          navigate(`/product/${item.product.slug}`);
                        }}
                        className="text-sm font-medium text-[#1A1A1A] hover:underline cursor-pointer truncate pr-2"
                      >
                        {item.product.name}
                      </h4>
                      <button
                        id={`cart-remove-${item.id}`}
                        onClick={() => removeFromCart(item.id)}
                        aria-label="Remove item"
                        className="text-[#8C8880] hover:text-[#A3433B] transition-colors p-0.5"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center space-x-2 text-xs text-[#8C8880] mt-1">
                      <span className="bg-[#EFECE6] px-1.5 py-0.5 rounded text-[11px] font-medium text-[#1A1A1A]">
                        Size: {item.size}
                      </span>
                      <span className="flex items-center space-x-1 bg-[#EFECE6] px-1.5 py-0.5 rounded text-[11px] font-medium text-[#1A1A1A]">
                        <span
  className="w-2 h-2 rounded-full border border-black/20"
  style={{ backgroundColor: item.color?.hex ?? '' }}
/>
<span>{item.color?.name ?? ''}</span>
                      </span>
                    </div>
                  </div>

                  {/* Quantity and Price */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center border border-[#DDD9CE] rounded-lg bg-white overflow-hidden">
                      <button
                        id={`cart-minus-${item.id}`}
                        onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                        aria-label="Decrease quantity"
                        className="p-1.5 text-[#5A5854] hover:bg-[#EFECE6] transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2.5 text-xs font-semibold text-[#1A1A1A]">
                        {item.quantity}
                      </span>
                      <button
                        id={`cart-plus-${item.id}`}
                        onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                        aria-label="Increase quantity"
                        className="p-1.5 text-[#5A5854] hover:bg-[#EFECE6] transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="text-right">
                      <div className="text-sm font-semibold text-[#1A1A1A]">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </div>
                      {item.product.originalPrice > item.product.price && (
                        <div className="text-[11px] text-[#8C8880] line-through">
                          ${(item.product.originalPrice * item.quantity).toFixed(2)}
                        </div>
                      )}
                    </div>
                  </div>

                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer / Totals & Checkout */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-[#E8E6DF] bg-white space-y-4">
            
            {/* Promo Code Apply */}
            {appliedCoupon ? (
              <div className="flex items-center justify-between p-2.5 bg-[#E8F3EB] border border-[#CDE5D3] rounded-lg text-xs">
                <span className="flex items-center space-x-1.5 text-[#2A6E3F] font-semibold">
                  <Check className="w-4 h-4" />
                  <span>Promo {appliedCoupon.code} applied ({appliedCoupon.discountPercent}% OFF)</span>
                </span>
                <button
                  id="cart-drawer-remove-coupon-btn"
                  onClick={removeCoupon}
                  className="text-xs text-[#A3433B] underline font-medium hover:text-[#802D26]"
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className="space-y-1.5">
                <div className="flex space-x-2">
                  <input
                    id="cart-drawer-coupon-input"
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Promo code (e.g. VELORA10)"
                    className="flex-1 px-3 py-2 bg-[#FAF9F6] border border-[#DDD9CE] rounded-lg text-xs uppercase focus:outline-none focus:border-[#1A1A1A]"
                  />
                  <button
                    id="cart-drawer-apply-coupon-btn"
                    type="submit"
                    className="px-3.5 py-2 bg-[#1A1A1A] text-white text-xs font-semibold rounded-lg hover:bg-black transition-colors uppercase tracking-wider"
                  >
                    Apply
                  </button>
                </div>
                {couponMsg && (
                  <p className={`text-[11px] ${couponMsg.isError ? 'text-[#A3433B]' : 'text-[#2A6E3F]'}`}>
                    {couponMsg.text}
                  </p>
                )}
              </form>
            )}

            {/* Price Calculations */}
            <div className="space-y-1.5 text-xs text-[#5A5854]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium text-[#1A1A1A]">${subtotal.toFixed(2)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-[#2A6E3F]">
                  <span>Discount ({appliedCoupon?.discountPercent}%)</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shippingFee === 0 ? <strong className="text-[#2A6E3F]">FREE</strong> : `$${shippingFee.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#1A1A1A] pt-2 border-t border-[#E8E6DF]">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              <button
                id="cart-drawer-checkout-btn"
                onClick={handleCheckout}
                className="w-full py-3.5 bg-[#1A1A1A] text-white text-xs uppercase tracking-[0.2em] font-semibold rounded-lg hover:bg-black transition-all flex items-center justify-center space-x-2 shadow-sm"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="cart-drawer-view-cart-btn"
                onClick={handleViewCart}
                className="w-full py-2.5 bg-transparent border border-[#DDD9CE] text-[#1A1A1A] text-xs uppercase tracking-widest font-medium rounded-lg hover:bg-[#FAF9F6] transition-colors"
              >
                View Full Bag & Estimate
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
