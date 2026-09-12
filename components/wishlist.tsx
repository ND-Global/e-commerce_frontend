import React from 'react';
import { Heart, ShoppingBag, ArrowRight, Trash2 } from 'lucide-react';
import { useShop } from '../context/shopcontext';
import { ProductCard } from './productcard';

export const WishlistPage: React.FC = () => {
  const { wishlist, products, addToCart, removeFromWishlist, navigate, addToast } = useShop();

  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  const handleMoveAllToBag = () => {
    wishlistProducts.forEach((p) => {
      const defaultSize = p.sizes[0] || 'M';
      const defaultColor = p.colors[0] || { name: 'Default', hex: '#000' };
      addToCart(p, defaultSize, defaultColor, 1);
    });
    addToast('Wishlist Moved', 'All available items added to your shopping bag.');
  };

  if (wishlistProducts.length === 0) {
    return (
      <div id="wishlist-empty-container" className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-[#F9ECEB] flex items-center justify-center mx-auto text-[#A3433B]">
          <Heart className="w-8 h-8 fill-current" />
        </div>
        <h2 className="font-serif-luxury text-3xl font-bold text-[#1A1A1A]">
          Your Wishlist is Empty
        </h2>
        <p className="text-xs text-[#8C8880] max-w-sm mx-auto">
          Save your favorite luxury garments to keep track of seasonal arrivals and private sales.
        </p>
        <button
          onClick={() => navigate('/shop')}
          className="px-8 py-3.5 bg-[#1A1A1A] text-white text-xs uppercase tracking-widest font-bold rounded-xl hover:bg-black transition-all"
        >
          Explore Catalog
        </button>
      </div>
    );
  }

  return (
    <div id="wishlist-page-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E8E6DF]">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#8C8880]">
            Saved Collections
          </span>
          <h1 className="font-serif-luxury text-3xl font-bold text-[#1A1A1A] mt-1">
            My Wishlist ({wishlistProducts.length})
          </h1>
        </div>

        <button
          id="wishlist-move-all-btn"
          onClick={handleMoveAllToBag}
          className="px-6 py-3 bg-[#1A1A1A] text-white text-xs uppercase tracking-widest font-bold rounded-xl hover:bg-black transition-all flex items-center justify-center space-x-2"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Move All to Shopping Bag</span>
        </button>
      </div>

      {/* Wishlist Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {wishlistProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

    </div>
  );
};
export default WishlistPage;