'use client';
import React, { useState } from 'react';
import { 
  
ArrowRight, 
  ShieldCheck, 
  Check, 
  Sparkles,
  Truck,
  RotateCcw,
  Headphones,
  Lock
} from 'lucide-react';
import { FaInstagram, FaFacebook } from 'react-icons/fa';
import { useShop } from '../context/shopcontext';

export const Footer: React.FC = () => {
  const { navigate, addToast } = useShop();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      addToast('Invalid Email', 'Please enter a valid email address.', 'error');
      return;
    }
    setSubscribed(true);
    addToast('Subscribed!', 'Welcome to the   AUREVÉ private circle.');
    setEmail('');
  };

  return (
    <footer id="main-footer" className="bg-[#0A0A0A] text-[#FDFCFB] pt-16 pb-10 border-t border-[#0A0A0A]">
      
      {/* Editorial Value Pillars */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 border-b border-white/10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-2 sm:space-y-0 sm:space-x-3.5">
            <div className="p-2.5 bg-white/5 border border-white/10 text-[#C4A484]">
              <Truck className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white">Complimentary Express</h4>
              <p className="text-[10px] text-white/50 mt-0.5 font-light">Global express delivery over $100</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-2 sm:space-y-0 sm:space-x-3.5">
            <div className="p-2.5 bg-white/5 border border-white/10 text-[#C4A484]">
              <RotateCcw className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white">Atelier 30-Day Returns</h4>
              <p className="text-[10px] text-white/50 mt-0.5 font-light">Door-to-door global return pickup</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-2 sm:space-y-0 sm:space-x-3.5">
            <div className="p-2.5 bg-white/5 border border-white/10 text-[#C4A484]">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white">Encrypted Checkout</h4>
              <p className="text-[10px] text-white/50 mt-0.5 font-light">Instant checkout with UPI, Card & COD</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-2 sm:space-y-0 sm:space-x-3.5">
            <div className="p-2.5 bg-white/5 border border-white/10 text-[#C4A484]">
              <Headphones className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white">VIP Concierge 24/7</h4>
              <p className="text-[10px] text-white/50 mt-0.5 font-light">Direct travel styling on WhatsApp</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Newsletter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Intro Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex flex-col">
              <span className="font-serif text-2xl tracking-[0.3em] font-light italic text-white uppercase">
                  AUREVÉ
              </span>
              <span className="text-[8px] tracking-[0.4em] text-white/40 uppercase font-sans">
                Modern Fashion · Everyday Luxury
              </span>
            </div>
            <p className="text-xs text-white/60 leading-relaxed max-w-sm font-light">
              Designed with architectural silhouettes, organic textiles, and sustainable artisan tailoring for voyage and city life.
            </p>

            {/* Newsletter Subscription */}
            <div className="pt-2">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C4A484] mb-2">
                JOIN THE ATELIER CIRCLE
              </h4>
              <p className="text-xs text-white/50 mb-3 font-light">
                First access to seasonal drops, travel capsules, and private invitations.
              </p>

              {subscribed ? (
                <div className="flex items-center space-x-2 text-xs text-[#9ED8A6] bg-white/5 border border-white/20 p-3">
                  <Check className="w-4 h-4" />
                  <span>You are subscribed with priority SS26 access.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex max-w-md">
                  <input
                    id="footer-newsletter-input"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="flex-1 px-3.5 py-2.5 bg-white/5 border border-white/20 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#C4A484] transition-colors"
                  />
                  <button
                    id="footer-newsletter-submit-btn"
                    type="submit"
                    className="px-5 py-2.5 bg-white text-[#0A0A0A] hover:bg-[#F9F8F6] text-[10px] font-bold uppercase tracking-widest transition-colors flex items-center space-x-1"
                  >
                    <span>Subscribe</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* SHOP Column */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.25em] text-white">COLLECTIONS</h4>
            <ul className="space-y-2 text-xs text-white/60 font-light">
              <li>
                <button onClick={() => navigate('/men')} className="hover:text-white transition-colors">
                  Men's Voyage
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/women')} className="hover:text-white transition-colors">
                  Women's Atelier
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/kids')} className="hover:text-white transition-colors">
                  Junior Edition
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/shop?filter=new')} className="hover:text-white transition-colors">
                  New Arrivals
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/shop?filter=sale')} className="text-[#C4A484] hover:underline font-medium">
                  Sale (Up to 40% Off)
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/shop')} className="hover:text-white transition-colors">
                  All Garments
                </button>
              </li>
            </ul>
          </div>

          {/* CLIENT SERVICE Column */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.25em] text-white">CLIENT SERVICE</h4>
            <ul className="space-y-2 text-xs text-white/60 font-light">
              <li>
                <button onClick={() => navigate('/orders')} className="hover:text-white transition-colors">
                  Order Tracking
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/account')} className="hover:text-white transition-colors">
                  Client Profile
                </button>
              </li>
              <li>
                <span className="cursor-pointer hover:text-white transition-colors" onClick={() => addToast('Concierge', 'Contact us 24/7 at concierge@AUREVÉ.com or WhatsApp.')}>
                  Concierge Service
                </span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-white transition-colors" onClick={() => addToast('Shipping', 'Standard 3-5 days delivery worldwide. Free over $100.')}>
                  Shipping & Customs
                </span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-white transition-colors" onClick={() => addToast('Returns', 'Complimentary 30-day returns on unworn items.')}>
                  Returns & Exchanges
                </span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-white transition-colors" onClick={() => addToast('Garment Care', 'Preserve fiber longevity: dry clean or cold delicate wash.')}>
                  Garment Care Guide
                </span>
              </li>
            </ul>
          </div>

          {/* ATELIER & SOCIAL Column */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.25em] text-white">ATELIER</h4>
            <ul className="space-y-2 text-xs text-white/60 font-light">
              <li>
                <span className="hover:text-white transition-colors cursor-pointer" onClick={() => addToast('Story', '  AUREVÉ was established in 2026 for global elegance.')}>
                  The Philosophy
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer" onClick={() => addToast('Materials', '100% GOTS certified cotton, French linen, and Italian wool.')}>
                  Sustainability Commitments
                </span>
              </li>
              <li>
                <button onClick={() => navigate('/admin')} className="text-[#C4A484] hover:underline flex items-center space-x-1 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Admin Portal Demo</span>
                </button>
              </li>
            </ul>

            <div className="pt-2">
              <span className="text-[10px] font-bold text-white/50 uppercase tracking-[0.2em] block mb-2">
                Follow Atelier
              </span>
              <div className="flex space-x-3 text-white/60">
                <a href="#instagram" onClick={(e) => { e.preventDefault(); addToast('Social', '  AUREVÉ Instagram: @  AUREVÉ.atelier'); }} className="p-2 bg-white/5 hover:bg-white/10 hover:text-white border border-white/10 transition-colors">
                  <FaInstagram className="w-4 h-4" />
                </a>
                <a href="#facebook" onClick={(e) => { e.preventDefault(); addToast('Social', '  AUREVÉ Facebook: /  AUREVÉfashion'); }} className="p-2 bg-white/5 hover:bg-white/10 hover:text-white border border-white/10 transition-colors">
                  <FaFacebook className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Copyright Subfooter (Dark Luxury / Travel) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[9px] tracking-widest text-white/40 font-medium uppercase space-y-3 sm:space-y-0">
        <p>© 2026   AUREVÉ MODERN FASHION · ALL RIGHTS RESERVED</p>
        <div className="flex gap-6 sm:gap-8">
          <a href="#privacy" onClick={(e) => { e.preventDefault(); addToast('Legal', 'Privacy policy active.'); }} className="hover:text-white transition-colors">PRIVACY POLICY</a>
          <a href="#shipping" onClick={(e) => { e.preventDefault(); addToast('Legal', 'Shipping policy: 3-5 business days global.'); }} className="hover:text-white transition-colors">SHIPPING & RETURNS</a>
          <a href="#stores" onClick={(e) => { e.preventDefault(); addToast('Flagships', 'Milano · Paris · Tokyo · New York'); }} className="hover:text-white transition-colors">FLAGSHIP STORES</a>
        </div>
      </div>

    </footer>
  );
};
