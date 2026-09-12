'use client';

import React from 'react';
import { ShopProvider } from '../context/shopcontext';
import { AnnouncementBar } from '../components/announcement';
//import { Navbar } from '../components/navbar';
import { Footer } from '../components/footer';
import { MobileDrawer } from '../components/mobiledrawer';
import { SearchModal } from '../components/searchmodel';
import { CartDrawer } from '../components/cardrawer';
import { QuickViewModal } from '../components/quickview';
import { SizeGuideModal } from '../components/size';
import { ToastContainer } from '../components/toast';
import { WhatsAppButton } from '../components/whatsapp';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ShopProvider>
      <div className="min-h-screen flex flex-col bg-[#FDFCFB] text-[#0A0A0A] antialiased selection:bg-[#0A0A0A] selection:text-[#FDFCFB]">
       

       
        {/* Main Route Content */}
        <main className="flex-1 w-full">{children}</main>

     

        {/* Global Overlays & Modals */}
        <MobileDrawer />
        <SearchModal />
        <CartDrawer />
        <QuickViewModal />
        <SizeGuideModal />
        <ToastContainer />

        {/* Floating Concierge WhatsApp Button */}
        <WhatsAppButton
          productName="General Concierge Assistance"
          price={0}
          variant="floating"
        />
      </div>
    </ShopProvider>
  );
}
