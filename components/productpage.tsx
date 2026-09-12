'use client';
import React, { useState, useEffect } from 'react';
import { 
  Star, 
  Heart, 
  ShoppingBag, 
  Check, 
  ChevronDown, 
  ChevronUp, 
  Truck, 
  RotateCcw, 
  ShieldCheck, 
  Sparkles, 
  Ruler, 
  MessageSquare,
  Plus,
  Minus,
  ArrowRight,
  Share2
} from 'lucide-react';
import { useShop } from '../context/shopcontext';
import { Product, ProductColor } from '../types';
import { ProductCard } from './productcard';
import { WhatsAppButton } from './whatsapp';
import { image } from 'motion/react-m';
const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  'http://localhost:7000/api';

const BACKEND_URL = API_URL.replace(/\/api\/?$/, '');

interface ProductDetailPageProps {
  slug: string;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ slug }) => {
  const { 
    products, 
    getProductBySlug, 
    addToCart, 
    isInWishlist, 
    toggleWishlist, 
    setSizeGuideOpen, 
    addReviewToProduct,
    navigate,
    addToast 
  } = useShop();

  const product = getProductBySlug(slug) || products[0];

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(null);
  const [quantity, setQuantity] = useState(1);

  // Accordion state
  const [openAccordion, setOpenAccordion] = useState<string | null>('details');

  // Review Form State
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewName, setReviewName] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewLocation, setReviewLocation] = useState('');

  useEffect(() => {
    if (product) {
      setActiveImageIdx(0);
      setSelectedSize(product.sizes[0] || 'M');
      setSelectedColor(product.colors[0] || null);
      setQuantity(1);
      window.scrollTo(0, 0);
    }
  }, [product?.id, slug]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-serif-luxury text-2xl font-bold">Product not found</h2>
        <button
          onClick={() => navigate('/shop')}
          className="px-6 py-2 bg-[#1A1A1A] text-white rounded-lg text-xs uppercase tracking-wider"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  const inWish = isInWishlist(product.id);

  // Related products from same category or gender
  const relatedProducts = products
    .filter((p) => p.id !== product.id && (p.category === product.category || p.gender === product.gender))
    .slice(0, 4);

 const handleAddToCart = async () => {
  if (!selectedColor) return;

  await addToCart(
    product,
    selectedSize,
    selectedColor,
    quantity
  );
};

 const handleBuyNow = async () => {
  if (!selectedColor) return;

  const ok = await addToCart(
    product,
    selectedSize,
    selectedColor,
    quantity
  );

  if (ok) {
    navigate('/checkout');
  }
};

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    addToast('Link Copied', 'Product link copied to clipboard.');
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName.trim() || !reviewComment.trim()) {
      addToast('Incomplete Review', 'Please provide your name and review comments.', 'error');
      return;
    }

    addReviewToProduct(product.id, {
      userName: reviewName,
      rating: reviewRating,
      comment: reviewComment,
      verifiedPurchase: true,
      userLocation: reviewLocation || 'Verified Client'
    });

    setReviewName('');
    setReviewComment('');
    setShowReviewModal(false);
  };

  return (
    <div id="product-detail-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16">
      
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center space-x-2 text-xs text-[#8C8880] uppercase tracking-wider">
        <button onClick={() => navigate('/')} className="hover:text-[#1A1A1A]">Home</button>
        <span>/</span>
        <button onClick={() => navigate(`/${product.gender}`)} className="hover:text-[#1A1A1A]">{product.gender}</button>
        <span>/</span>
        <button onClick={() => navigate('/shop')} className="hover:text-[#1A1A1A]">{product.category}</button>
        <span>/</span>
        <span className="text-[#1A1A1A] font-semibold truncate max-w-[200px]">{product.name}</span>
      </nav>

      {/* Main Product Layout: Gallery (Left) & Configurator (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        
        {/* ================= LEFT: Large Product Image Gallery ================= */}
        <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4 sticky top-24">
          
          {/* Thumbnails list */}
          <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-y-auto sm:w-24 flex-shrink-0">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                id={`product-thumb-${idx}`}
                onClick={() => setActiveImageIdx(idx)}
                className={`w-20 sm:w-full aspect-[3/4] rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 bg-[#F0ECE1] ${
                  activeImageIdx === idx 
                    ? 'border-[#1A1A1A] ring-1 ring-[#1A1A1A]' 
                    : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img
  src={`${BACKEND_URL}${product.images[activeImageIdx] || product.images[0]}`}
  alt={product.name}
  referrerPolicy="no-referrer"
  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
/>
                
              </button>
            ))}
          </div>

          {/* Featured Large View */}
          <div className="flex-1 aspect-[3/4] rounded-2xl overflow-hidden bg-[#F0ECE1] shadow-sm relative group">
            <img
              src={`${BACKEND_URL}${product.images[activeImageIdx] || product.images[0]}`}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />
            {product.discount > 0 && (
              <span className="absolute top-4 left-4 bg-[#A3433B] text-white text-xs font-bold px-3 py-1 rounded-md uppercase tracking-wider shadow-sm">
                {product.discount}% OFF
              </span>
            )}
            <button
              onClick={handleShare}
              aria-label="Share product"
              className="absolute top-4 right-4 p-2.5 bg-white/80 hover:bg-white text-[#1A1A1A] rounded-full shadow-md backdrop-blur-xs transition-all"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* ================= RIGHT: Purchase Configurator ================= */}
        <div className="lg:col-span-5 space-y-6">
          
          <div>
            <div className="flex items-center space-x-2 text-xs font-semibold text-[#8C8880] uppercase tracking-widest">
              <span>{product.gender}</span>
              <span>•</span>
              <span>{product.category}</span>
              <span>•</span>
              <span className="text-[#A3433B]">SKU: {product.sku}</span>
            </div>

            <h1 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#1A1A1A] mt-1.5 leading-tight">
              {product.name}
            </h1>

            {/* Ratings Bar */}
            <div className="flex items-center space-x-3 mt-3">
              <div className="flex text-[#C29B38]">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating) ? 'fill-current' : 'opacity-25'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs font-bold text-[#1A1A1A]">{product.rating} / 5.0</span>
              <span className="text-xs text-[#8C8880]">({product.reviewsCount} verified reviews)</span>
            </div>
          </div>

          {/* Pricing */}
          <div className="flex items-baseline space-x-3 pb-4 border-b border-[#E8E6DF]">
            <span className="text-3xl font-bold text-[#1A1A1A]">
              ${product.price}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-lg text-[#8C8880] line-through">
                ${product.originalPrice}
              </span>
            )}
            {product.discount > 0 && (
              <span className="text-xs font-bold text-[#A3433B] bg-[#F9ECEB] px-2 py-0.5 rounded">
                Save ${(product.originalPrice - product.price).toFixed(2)}
              </span>
            )}
          </div>

          {/* Brief Description */}
          <p className="text-xs sm:text-sm text-[#5A5854] leading-relaxed">
            {product.description}
          </p>

          {/* Color Selector */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold uppercase tracking-wider text-[#1A1A1A]">
                Color: <strong className="font-medium text-[#5A5854]">{selectedColor?.name}</strong>
              </span>
            </div>
            <div className="flex space-x-3">
              {product.colors.map((color) => (
                <button
                  key={color.name}
                  id={`color-select-${color.name.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={() => setSelectedColor(color)}
                  className={`relative w-9 h-9 rounded-full border-2 transition-all p-0.5 ${
                    selectedColor?.name === color.name
                      ? 'border-[#1A1A1A] scale-110 shadow-xs'
                      : 'border-transparent hover:scale-105'
                  }`}
                  title={color.name}
                >
                  <span
                    className="block w-full h-full rounded-full border border-black/20"
                    style={{ backgroundColor: color.hex }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Size Selector */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold uppercase tracking-wider text-[#1A1A1A]">
                Select Size: <strong className="font-medium text-[#5A5854]">{selectedSize}</strong>
              </span>
              <button
                id="product-open-size-guide-btn"
                onClick={() => setSizeGuideOpen(true)}
                className="flex items-center space-x-1 text-xs text-[#8C8880] hover:text-[#1A1A1A] underline cursor-pointer"
              >
                <Ruler className="w-3.5 h-3.5" />
                <span>Size Guide & Fit</span>
              </button>
            </div>

            <div className="grid grid-cols-6 gap-2">
              {product.sizes.map((sz) => (
                <button
                  key={sz}
                  id={`size-btn-${sz.toLowerCase()}`}
                  onClick={() => setSelectedSize(sz)}
                  className={`py-3 text-xs font-bold rounded-xl border transition-all ${
                    selectedSize === sz
                      ? 'bg-[#1A1A1A] text-white border-[#1A1A1A] shadow-xs'
                      : 'bg-white text-[#1A1A1A] border-[#DDD9CE] hover:border-[#1A1A1A]'
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity & Stock Check */}
          <div className="flex items-center space-x-4 pt-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">Quantity:</span>
            <div className="flex items-center border border-[#DDD9CE] rounded-xl bg-white overflow-hidden shadow-2xs">
              <button
                id="product-qty-minus"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                aria-label="Decrease quantity"
                className="p-2 text-[#5A5854] hover:bg-[#EFECE6]"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="px-4 text-xs font-bold text-[#1A1A1A]">{quantity}</span>
              <button
                id="product-qty-plus"
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                aria-label="Increase quantity"
                className="p-2 text-[#5A5854] hover:bg-[#EFECE6]"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
            <span className="text-xs text-[#2A6E3F] font-semibold flex items-center space-x-1">
              <Check className="w-3.5 h-3.5" />
              <span>In Stock ({product.stock} available)</span>
            </span>
          </div>

          {/* CTAs: Add to Cart, Buy Now, Wishlist */}
          <div className="space-y-3 pt-4 border-t border-[#E8E6DF]">
            <div className="flex space-x-3">
              <button
                id="pdp-add-to-cart-btn"
                onClick={handleAddToCart}
                className="flex-1 py-4 bg-[#1A1A1A] text-white hover:bg-black text-xs uppercase tracking-[0.2em] font-bold rounded-xl transition-all shadow-md hover:scale-[1.01] flex items-center justify-center space-x-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Shopping Bag</span>
              </button>

              <button
                id="pdp-wishlist-toggle-btn"
                onClick={() => toggleWishlist(product.id)}
                aria-label="Save product to wishlist"
                className={`p-4 border rounded-xl transition-all ${
                  inWish
                    ? 'border-[#A3433B] bg-[#F9ECEB] text-[#A3433B]'
                    : 'border-[#DDD9CE] bg-white text-[#1A1A1A] hover:border-[#1A1A1A]'
                }`}
              >
                <Heart className={`w-5 h-5 ${inWish ? 'fill-current' : ''}`} />
              </button>
            </div>

            <button
              id="pdp-buy-now-btn"
              onClick={handleBuyNow}
              className="w-full py-3.5 bg-[#F0ECE1] hover:bg-[#E5DFD1] text-[#1A1A1A] text-xs uppercase tracking-[0.2em] font-bold rounded-xl transition-all border border-[#DDD8CC]"
            >
              Instant Buy Now
            </button>

            {/* Centralized WhatsApp Ordering Button */}
            <WhatsAppButton
              productName={product.name}
              price={product.price}
              quantity={quantity}
              size={selectedSize}
              color={selectedColor?.name}
            />
          </div>

          {/* Value Perks */}
          <div className="grid grid-cols-2 gap-3 pt-4 text-xs text-[#5A5854] border-t border-[#E8E6DF]">
            <div className="flex items-center space-x-2">
              <Truck className="w-4 h-4 text-[#2A6E3F]" />
              <span>Complimentary shipping over $100</span>
            </div>
            <div className="flex items-center space-x-2">
              <RotateCcw className="w-4 h-4 text-[#2A6E3F]" />
              <span>30-Day home try-on returns</span>
            </div>
          </div>

          {/* Accordions (Product Details, Size & Fit, Shipping, Returns) */}
          <div className="border-t border-[#E8E6DF] divide-y divide-[#E8E6DF] pt-2">
            
            {/* Accordion 1: Details */}
            <div className="py-3.5">
              <button
                id="accordion-details-btn"
                onClick={() => setOpenAccordion(openAccordion === 'details' ? null : 'details')}
                className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#1A1A1A]"
              >
                <span>Product Details & Composition</span>
                {openAccordion === 'details' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {openAccordion === 'details' && (
                <div className="pt-3 text-xs text-[#5A5854] space-y-2 leading-relaxed animate-in fade-in duration-200">
                  <p><strong>Material:</strong> {product.material || 'Organic cotton and sustainable European flax blend'}</p>
                  <p><strong>Fit Archetype:</strong> {product.fit || 'Tailored contemporary modern silhouette'}</p>
                  <ul className="list-disc pl-4 space-y-1">
                    {product.details?.map((d, i) => (
                      <li key={i}>{d}</li>
                    ))}
                  </ul>
                  <p className="text-[11px] text-[#8C8880] mt-2">
                    <strong>Care:</strong> {product.careInstructions || 'Dry clean or delicate gentle machine wash cold. Do not tumble dry.'}
                  </p>
                </div>
              )}
            </div>

            {/* Accordion 2: Size & Fit */}
            <div className="py-3.5">
              <button
                id="accordion-fit-btn"
                onClick={() => setOpenAccordion(openAccordion === 'fit' ? null : 'fit')}
                className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#1A1A1A]"
              >
                <span>Size & Fit Guidance</span>
                {openAccordion === 'fit' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {openAccordion === 'fit' && (
                <div className="pt-3 text-xs text-[#5A5854] space-y-2 leading-relaxed animate-in fade-in duration-200">
                  <p>• Model is 185 cm / 6'1" wearing size <strong>Medium</strong> for an oversized drape.</p>
                  <p>• True to size for a structured fit. Take one size up for a relaxed streetwear aesthetic.</p>
                  <button
                    onClick={() => setSizeGuideOpen(true)}
                    className="text-xs text-[#1A1A1A] font-semibold underline mt-1 block"
                  >
                    Open Complete Size Chart & Measurement Guide →
                  </button>
                </div>
              )}
            </div>

            {/* Accordion 3: Shipping */}
            <div className="py-3.5">
              <button
                id="accordion-shipping-btn"
                onClick={() => setOpenAccordion(openAccordion === 'shipping' ? null : 'shipping')}
                className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#1A1A1A]"
              >
                <span>Shipping & Express Delivery</span>
                {openAccordion === 'shipping' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {openAccordion === 'shipping' && (
                <div className="pt-3 text-xs text-[#5A5854] space-y-1.5 leading-relaxed animate-in fade-in duration-200">
                  <p>• Standard Express Delivery: <strong>3–5 Business Days</strong>.</p>
                  <p>• Complimentary express shipping on all orders over $100.</p>
                  <p>• Orders are dispatched directly from our regional fulfillment ateliers in plastic-free eco-luxe packaging.</p>
                </div>
              )}
            </div>

            {/* Accordion 4: Returns */}
            <div className="py-3.5">
              <button
                id="accordion-returns-btn"
                onClick={() => setOpenAccordion(openAccordion === 'returns' ? null : 'returns')}
                className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#1A1A1A]"
              >
                <span>Complimentary 30-Day Returns</span>
                {openAccordion === 'returns' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {openAccordion === 'returns' && (
                <div className="pt-3 text-xs text-[#5A5854] space-y-1.5 leading-relaxed animate-in fade-in duration-200">
                  <p>• We offer full refunds or exchanges within 30 days of parcel arrival.</p>
                  <p>• Items must remain unworn, unwashed with original atelier security tags attached.</p>
                  <p>• Doorstep pickup is scheduled at your convenience with zero return courier fees.</p>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>

      {/* ================= CUSTOMER REVIEWS SECTION ================= */}
      <section id="product-reviews-section" className="border-t border-[#E8E6DF] pt-14 space-y-8">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#8C8880]">
              Client Feedback
            </span>
            <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#1A1A1A] mt-1">
              Verified Atelier Reviews ({product.reviews?.length || 0})
            </h2>
          </div>

          <button
            id="write-review-open-btn"
            onClick={() => setShowReviewModal(true)}
            className="px-6 py-3 bg-[#1A1A1A] text-white text-xs uppercase tracking-widest font-semibold rounded-xl hover:bg-black transition-all"
          >
            Write a Review
          </button>
        </div>

        {/* Reviews List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {product.reviews && product.reviews.length > 0 ? (
            product.reviews.map((rev) => (
              <div key={rev.id} className="p-6 bg-white rounded-2xl border border-[#E8E6DF] space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="flex text-[#C29B38]">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${i < rev.rating ? 'fill-current' : 'opacity-20'}`}
                      />
                    ))}
                  </div>
                  <span className="text-[11px] text-[#8C8880]">{rev.date}</span>
                </div>

                <p className="text-xs text-[#333] leading-relaxed italic">
                  "{rev.comment}"
                </p>

                <div className="pt-2 flex items-center justify-between text-xs border-t border-[#F0ECE1]">
                  <span className="font-bold text-[#1A1A1A]">{rev.userName}</span>
                  {rev.verifiedPurchase && (
                    <span className="text-[10px] text-[#2A6E3F] font-semibold flex items-center space-x-1">
                      <Check className="w-3 h-3" />
                      <span>Verified Client · {rev.userLocation || 'USA'}</span>
                    </span>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-2 p-8 text-center bg-white rounded-2xl border border-[#E8E6DF] text-xs text-[#8C8880]">
              Be the first to share your thoughts on this crafted garment.
            </div>
          )}
        </div>

      </section>

      {/* ================= RELATED PRODUCTS SECTION ================= */}
      {relatedProducts.length > 0 && (
        <section id="related-products-section" className="border-t border-[#E8E6DF] pt-14 space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#8C8880]">
                Curated Suggestions
              </span>
              <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#1A1A1A] mt-1">
                You May Also Admire
              </h2>
            </div>
            <button
              onClick={() => navigate('/shop')}
              className="text-xs uppercase tracking-widest font-semibold text-[#1A1A1A] hover:text-[#A3433B] flex items-center space-x-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Review Submission Modal */}
      {showReviewModal && (
        <div
          id="write-review-modal-overlay"
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setShowReviewModal(false)}
        >
          <div
            id="write-review-panel"
            className="w-full max-w-md bg-[#FAF9F6] rounded-2xl shadow-2xl p-6 sm:p-8 space-y-5 border border-[#E0DDD5] animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#E8E6DF] pb-3">
              <h3 className="font-serif-luxury text-xl font-bold text-[#1A1A1A]">
                Share Your Experience
              </h3>
              <button
                onClick={() => setShowReviewModal(false)}
                className="text-[#8C8880] hover:text-[#1A1A1A]"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleReviewSubmit} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-[#1A1A1A] block mb-1">Your Rating:</label>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewRating(star)}
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= reviewRating ? 'fill-[#C29B38] text-[#C29B38]' : 'text-[#DDD9CE]'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-bold text-[#1A1A1A] block mb-1">Full Name:</label>
                <input
                  type="text"
                  required
                  value={reviewName}
                  onChange={(e) => setReviewName(e.target.value)}
                  placeholder="e.g. Charlotte Bennett"
                  className="w-full p-3 bg-white border border-[#DDD9CE] rounded-lg text-xs text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
                />
              </div>

              <div>
                <label className="font-bold text-[#1A1A1A] block mb-1">Location (Optional):</label>
                <input
                  type="text"
                  value={reviewLocation}
                  onChange={(e) => setReviewLocation(e.target.value)}
                  placeholder="e.g. London, UK"
                  className="w-full p-3 bg-white border border-[#DDD9CE] rounded-lg text-xs text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
                />
              </div>

              <div>
                <label className="font-bold text-[#1A1A1A] block mb-1">Your Review:</label>
                <textarea
                  required
                  rows={4}
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="How did the fit, fabric, and silhouette feel?"
                  className="w-full p-3 bg-white border border-[#DDD9CE] rounded-lg text-xs text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
                />
              </div>

              <div className="pt-2 flex space-x-3">
                <button
                  type="button"
                  onClick={() => setShowReviewModal(false)}
                  className="flex-1 py-3 border border-[#DDD9CE] rounded-lg font-semibold text-[#5A5854]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-[#1A1A1A] text-white rounded-lg font-bold uppercase tracking-wider hover:bg-black"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
export default ProductDetailPage