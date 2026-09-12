'use client';
import React from 'react';
import { ShopProvider, useShop } from '../context/shopcontext';
import { AnnouncementBar } from '../components/announcement';
import { Navbar } from '../components/navbar';
import { MobileDrawer } from '../components/mobiledrawer';
import { SearchModal } from '../components/searchmodel'
import { CartDrawer } from '../components/cardrawer';
import { QuickViewModal } from '../components/quickview';
import { SizeGuideModal } from '../components/size';
import { ToastContainer } from '../components/toast';
import { Footer } from '../components/footer';
import { WhatsAppButton } from '../components/whatsapp';

// Pages
import { HomePage } from '../components/homepage';
import { ShopPage } from '../components/shoppage';
import { CategoryPage } from '../components/category';
import { ProductDetailPage } from '../components/productpage';
import { CheckoutPage } from '../components/checkout';
import { OrderSuccessPage } from '../components/ordersucess';
import { AuthPage } from '../components/authpage';
import { AccountPage } from '../components/accountpage';
import { OrdersPage } from '../components/orderpage';
import { WishlistPage } from '../components/wishlist';
import { AdminPage } from '../components/adminpage';

const AppContent: React.FC = () => {
  const { currentPath } = useShop();

  // Router renderer
  const renderCurrentPage = () => {
    // 1. Home
    if (currentPath === '/' || currentPath === '/home' || currentPath === '') {
      return <HomePage />;
    }

    // 2. Shop all
    if (currentPath.startsWith('/shop')) {
      return <ShopPage />;
    }

    // 3. Departments
    if (currentPath.startsWith('/men')) {
      return <CategoryPage gender="men" />;
    }
    if (currentPath.startsWith('/women')) {
      return <CategoryPage gender="women" />;
    }
    if (currentPath.startsWith('/kids')) {
      return <CategoryPage gender="kids" />;
    }

    // 4. Product Details /product/:slug
    if (currentPath.startsWith('/product/')) {
      const slug = currentPath.replace('/product/', '').split('?')[0];
      return <ProductDetailPage slug={slug} />;
    }

    // 5. Checkout & Order Success
    if (currentPath.startsWith('/checkout')) {
      return <CheckoutPage />;
    }
    if (currentPath.startsWith('/order-success')) {
      return <OrderSuccessPage />;
    }

    // 6. User Auth & Account
    if (currentPath.startsWith('/login')) {
      return <AuthPage initialMode="login" />;
    }
    if (currentPath.startsWith('/signup')) {
      return <AuthPage initialMode="signup" />;
    }
    if (currentPath.startsWith('/account')) {
      return <AccountPage />;
    }
    if (currentPath.startsWith('/orders')) {
      return <OrdersPage />;
    }
    if (currentPath.startsWith('/wishlist')) {
      return <WishlistPage />;
    }

    // 7. Admin Panel
    if (currentPath.startsWith('/admin')) {
      return <AdminPage />;
    }

    // Default Fallback to HomePage
    return <HomePage />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-[#1A1A1A] antialiased selection:bg-[#1A1A1A] selection:text-white">
      {/* Top Banner */}
      <AnnouncementBar />

      {/* Main Sticky Navbar */}
      <Navbar />

      {/* Page Body View */}
      <main className="flex-1 w-full">
        {renderCurrentPage()}
      </main>

      {/* Global Luxury Footer */}
      <Footer />

      {/* Overlays, Drawers & Modals */}
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
  );
};

export default function App() {
  return (
    <ShopProvider>
      <AppContent />
    </ShopProvider>
  );
}
