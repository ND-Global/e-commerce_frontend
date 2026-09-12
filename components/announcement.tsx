'use client';
import React, { useState } from 'react';
import { Sparkles, X, ChevronRight } from 'lucide-react';
import { useShop } from '../context/shopcontext';

export const AnnouncementBar: React.FC = () => {
  const [visible, setVisible] = useState(true);
  const { navigate } = useShop();

  if (!visible) return null;

  return (
    <div 
      id="announcement-bar"
      className="bg-[#0A0A0A] text-[#FDFCFB] text-[10px] py-2.5 px-4 tracking-[0.25em] uppercase border-b border-white/10 transition-all font-medium"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="hidden md:flex items-center space-x-2 text-white/60">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#C4A484] animate-pulse" />
          <span className="tracking-[0.25em]">SS26 TRAVEL & LUXURY CAPSULE</span>
        </div>

        <div className="flex-1 text-center flex items-center justify-center space-x-2">
          <span className="opacity-90">Complimentary Express Global Shipping Over $100 · Code <strong className="text-[#C4A484] font-bold">VELORA10</strong></span>
          <button 
            id="announcement-shop-sale-btn"
            onClick={() => navigate('/shop?filter=sale')}
            aria-label="Shop sale promotion"
            className="hidden sm:inline-flex items-center text-[#C4A484] hover:text-white transition-colors ml-2 font-bold underline"
          >
            <span>Shop Sale</span>
            <ChevronRight className="w-3 h-3 ml-0.5" />
          </button>
        </div>

        <div className="flex items-center space-x-4">
          <button 
            id="announcement-admin-shortcut-btn"
            onClick={() => navigate('/admin')}
            aria-label="Admin Dashboard demo link"
            className="text-[9px] text-[#C4A484] hover:text-white border border-[#C4A484]/40 px-2 py-0.5 tracking-widest transition-colors uppercase"
          >
            Admin Quickview ↗
          </button>
          <button 
            id="announcement-close-btn"
            onClick={() => setVisible(false)}
            aria-label="Dismiss announcement"
            className="text-white/40 hover:text-white transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
