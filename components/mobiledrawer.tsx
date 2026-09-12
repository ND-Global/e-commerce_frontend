import React from 'react';
import { 
  X, 
  ChevronRight, 
  Heart, 
  ShoppingBag, 
  User, 
  ShieldCheck, 
  PhoneCall, 
  Search,
  ArrowRight
} from 'lucide-react';
import { useShop } from '../context/shopcontext';
import { SITE_CONFIG } from '../config/site';

export const MobileDrawer: React.FC = () => {
  const { 
    mobileMenuOpen, 
    setMobileMenuOpen, 
    navigate, 
    wishlist, 
    totalCartItems, 
    currentUser, 
    setSearchModalOpen,
    setCartDrawerOpen 
  } = useShop();

  if (!mobileMenuOpen) return null;

  const handleNavigate = (path: string) => {
    setMobileMenuOpen(false);
    navigate(path);
  };

  const navItems = [
    { name: 'Home', path: '/', subtitle: 'Latest collections' },
    { name: 'Men', path: '/men', subtitle: 'Shirts, tailoring, denim & outerwear' },
    { name: 'Women', path: '/women', subtitle: 'Dresses, blazers, knits & trousers' },
    { name: 'Kids', path: '/kids', subtitle: 'Organic fleece, twirl dresses & sets' },
    { name: 'New Arrivals', path: '/shop?filter=new', subtitle: 'Fresh silhouettes' },
    { name: 'Sale Season', path: '/shop?filter=sale', subtitle: 'Up to 40% off limited styles', highlight: true },
    { name: 'Explore All Shop', path: '/shop', subtitle: '24+ Curated luxury garments' },
  ];

  return (
    <div 
      id="mobile-drawer-overlay"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex lg:hidden animate-in fade-in duration-200"
    >
      <div 
        id="mobile-drawer-panel"
        className="w-full max-w-sm bg-[#FAF9F6] h-full shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-left duration-300"
      >
        
        {/* Drawer Header */}
        <div className="p-6 border-b border-[#E8E6DF] flex items-center justify-between">
          <div>
            <span className="font-serif-luxury text-2xl font-bold tracking-[0.2em] text-[#1A1A1A]">
              VELORA
            </span>
            <p className="text-[10px] text-[#8C8880] tracking-widest uppercase mt-0.5">
              Modern Luxury Fashion
            </p>
          </div>
          <button
            id="mobile-drawer-close-btn"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu drawer"
            className="p-2 -mr-2 text-[#1A1A1A] hover:opacity-70 transition-opacity"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Search Bar in Drawer */}
        <div className="px-6 pt-4">
          <button
            id="mobile-drawer-search-trigger"
            onClick={() => {
              setMobileMenuOpen(false);
              setSearchModalOpen(true);
            }}
            className="w-full flex items-center justify-between px-4 py-3 bg-[#EFECE6] rounded-lg text-sm text-[#5A5854] hover:bg-[#E5E1D8] transition-colors"
          >
            <span className="flex items-center space-x-2">
              <Search className="w-4 h-4 text-[#8C8880]" />
              <span>Search products, categories...</span>
            </span>
            <span className="text-xs text-[#8C8880] border border-[#D5D2C9] px-1.5 py-0.5 rounded">⌘K</span>
          </button>
        </div>

        {/* Navigation Categories */}
        <div className="p-6 flex-1 space-y-1">
          <p className="text-[11px] font-semibold text-[#8C8880] uppercase tracking-widest mb-3">
            Collections & Categories
          </p>

          {navItems.map((item) => (
            <button
              key={item.name}
              id={`mobile-nav-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => handleNavigate(item.path)}
              className="w-full flex items-center justify-between py-3 px-3 rounded-lg text-left hover:bg-[#EFECE6] transition-all group"
            >
              <div>
                <div className={`text-base font-medium tracking-wide ${
                  item.highlight ? 'text-[#A3433B] font-semibold' : 'text-[#1A1A1A]'
                }`}>
                  {item.name}
                </div>
                <div className="text-xs text-[#8C8880] mt-0.5">
                  {item.subtitle}
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-[#B5B2AB] group-hover:text-[#1A1A1A] group-hover:translate-x-0.5 transition-all" />
            </button>
          ))}
        </div>

        {/* Quick Links & Account Section */}
        <div className="p-6 border-t border-[#E8E6DF] bg-[#F4F2EC] space-y-3">
          
          <div className="grid grid-cols-2 gap-2">
            <button
              id="mobile-drawer-wishlist-btn"
              onClick={() => handleNavigate('/wishlist')}
              className="flex items-center justify-center space-x-2 py-2.5 px-3 bg-white border border-[#DDD9CE] rounded-lg text-xs font-medium text-[#1A1A1A]"
            >
              <Heart className="w-4 h-4 text-[#A3433B]" />
              <span>Wishlist ({wishlist.length})</span>
            </button>

            <button
              id="mobile-drawer-cart-btn"
              onClick={() => {
                setMobileMenuOpen(false);
                setCartDrawerOpen(true);
              }}
              className="flex items-center justify-center space-x-2 py-2.5 px-3 bg-white border border-[#DDD9CE] rounded-lg text-xs font-medium text-[#1A1A1A]"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Bag ({totalCartItems})</span>
            </button>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              id="mobile-drawer-account-btn"
              onClick={() => handleNavigate(currentUser ? '/account' : '/login')}
              className="flex items-center space-x-2 text-xs font-medium text-[#1A1A1A] hover:underline"
            >
              <User className="w-4 h-4 text-[#8C8880]" />
              <span>{currentUser ? `Account (${currentUser.name})` : 'Sign In / Register'}</span>
            </button>

            <button
              id="mobile-drawer-admin-btn"
              onClick={() => handleNavigate('/admin')}
              className="flex items-center space-x-1 text-xs font-medium text-[#5A5854] bg-[#E5E2D9] px-2.5 py-1 rounded"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Demo</span>
            </button>
          </div>

          {/* WhatsApp Direct Line */}
          <a
            id="mobile-drawer-whatsapp-link"
            href={`https://wa.me/${SITE_CONFIG.whatsapp.phoneNumber}?text=${encodeURIComponent('Hello VELORA Concierge! I have a question regarding your collections.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center space-x-2 py-2.5 text-xs text-[#2A6E3F] font-medium bg-[#E8F3EB] rounded-lg border border-[#CDE5D3] hover:bg-[#DDF0E2] transition-colors"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>VIP WhatsApp Concierge Assistance</span>
          </a>

        </div>

      </div>
    </div>
  );
};
