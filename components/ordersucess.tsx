import React from 'react';
import { 
  CheckCircle2, 
  Package, 
  Truck, 
  ArrowRight, 
  Download, 
  MessageCircle, 
  ShoppingBag,
  Sparkles,
  Printer
} from 'lucide-react';
import { useShop } from '../context/shopcontext';
import { SITE_CONFIG } from '../config/site';

export const OrderSuccessPage: React.FC = () => {
  const { orders, navigate, addToast } = useShop();

  // Get order ID from URL or fallback to the latest order
  const urlParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
  const orderId = urlParams?.get('id');

  const order = orders.find((o) => o.id === orderId) || orders[0];

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadInvoice = () => {
    addToast('Invoice Downloaded', 'Demo PDF Invoice generated for your records.');
  };

  if (!order) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-serif-luxury text-2xl font-bold">No recent order found</h2>
        <button
          onClick={() => navigate('/shop')}
          className="px-6 py-2.5 bg-[#1A1A1A] text-white text-xs uppercase tracking-wider rounded-lg"
        >
          Return to Atelier
        </button>
      </div>
    );
  }

  return (
    <div id="order-success-container" className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-10 animate-in fade-in zoom-in-95 duration-300">
      
      {/* Success Badge Banner */}
      <div className="text-center space-y-3 bg-[#F0F7F1] border border-[#CDE5D3] p-8 sm:p-10 rounded-3xl">
        <div className="w-16 h-16 bg-[#2A6E3F] text-white rounded-full flex items-center justify-center mx-auto shadow-md">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#2A6E3F] block">
          THANK YOU FOR YOUR ORDER
        </span>

        <h1 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#1A1A1A]">
          Your Atelier Order is Confirmed
        </h1>

        <p className="text-xs sm:text-sm text-[#5A5854] max-w-lg mx-auto">
          We've received your order <strong className="text-[#1A1A1A] font-mono font-bold">#{order.id}</strong>. A confirmation and tracking link has been sent to your email.
        </p>

        <div className="pt-2 flex items-center justify-center space-x-6 text-xs text-[#2A6E3F]">
          <span className="flex items-center space-x-1.5 font-semibold">
            <Truck className="w-4 h-4" />
            <span>Estimated Delivery: {order.estimatedDelivery}</span>
          </span>
        </div>
      </div>

      {/* Order Details & Summary Card */}
      <div className="bg-white rounded-3xl border border-[#E8E6DF] p-6 sm:p-10 shadow-xs space-y-8">
        
        {/* Top Info Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#E8E6DF] text-xs">
          <div>
            <span className="text-[#8C8880] block">Order Number</span>
            <strong className="text-sm font-mono text-[#1A1A1A]">#{order.id}</strong>
          </div>
          <div>
            <span className="text-[#8C8880] block">Date Placed</span>
            <strong className="text-sm text-[#1A1A1A]">{order.createdAt}</strong>
          </div>
          <div>
            <span className="text-[#8C8880] block">Payment Method</span>
            <strong className="text-sm text-[#1A1A1A] uppercase">{order.paymentMethod} (Confirmed)</strong>
          </div>
          <div>
            <span className="text-[#8C8880] block">Status</span>
            <span className="px-2.5 py-0.5 bg-[#E8F3EB] text-[#2A6E3F] font-bold uppercase rounded-full text-[10px]">
              {order.status}
            </span>
          </div>
        </div>

        {/* Ordered Items List */}
        <div className="space-y-4">
          <h3 className="font-serif-luxury text-lg font-bold text-[#1A1A1A]">
            Purchased Items ({order.items.length})
          </h3>

          <div className="divide-y divide-[#F0ECE1] border-y border-[#F0ECE1]">
            {order.items.map((item) => (
             <div key={`${item.product?.id ?? 'product'}-${item.selectedSize}`} className="py-4 flex items-center justify-between space-x-4">
                <div className="flex items-center space-x-3">
                <img
  src={item.product?.images?.[0] || ''}
  alt={item.product?.name || ''}
  referrerPolicy="no-referrer"
  className="w-14 h-18 rounded-lg object-cover bg-[#F0ECE1]"
/>
<div>
  <h4 className="font-semibold text-xs text-[#1A1A1A]">
    {item.product?.name || ''}
  </h4>
                    <p className="text-[11px] text-[#8C8880]">
                    Size: {item.selectedSize} · Color: {item.selectedColor?.name || ''} · Qty: {item.quantity}
                    </p>
                  </div>
                </div>

                <div className="text-right text-xs font-bold text-[#1A1A1A]">
               ${((item.product?.price ?? 0) * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Shipping Destination & Price Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
          
          {/* Shipping Address */}
          <div className="p-4 bg-[#FAF9F6] rounded-2xl border border-[#E8E6DF] space-y-2 text-xs">
            <h4 className="font-bold text-[#1A1A1A] uppercase tracking-wider">Delivery Destination</h4>
            <p className="font-semibold text-[#1A1A1A]">{order.shippingAddress.fullName}</p>
            <p className="text-[#5A5854]">{order.shippingAddress.street} {order.shippingAddress.apartment}</p>
            <p className="text-[#5A5854]">
              {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}
            </p>
            <p className="text-[#5A5854]">{order.shippingAddress.country}</p>
            <p className="text-[#8C8880] mt-1">Contact: {order.shippingAddress.phone}</p>
          </div>

          {/* Price Breakdown */}
          <div className="p-4 bg-[#FAF9F6] rounded-2xl border border-[#E8E6DF] space-y-2 text-xs">
            <h4 className="font-bold text-[#1A1A1A] uppercase tracking-wider">Payment Breakdown</h4>
            <div className="flex justify-between text-[#5A5854]">
              <span>Subtotal</span>
              <span>${order.subtotal.toFixed(2)}</span>
            </div>
            {order.discountAmount > 0 && (
              <div className="flex justify-between text-[#2A6E3F]">
                <span>Coupon Discount ({order.appliedCoupon || 'PROMO'})</span>
                <span>-${order.discountAmount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-[#5A5854]">
              <span>Express Courier Shipping</span>
           {(order.shippingCost ?? 0) === 0
  ? 'FREE'
  : `$${(order.shippingCost ?? 0).toFixed(2)}`}
            </div>
            <div className="flex justify-between font-bold text-sm text-[#1A1A1A] border-t border-[#E0DDD5] pt-2">
              <span>Amount Paid</span>
              <span>${order.total.toFixed(2)}</span>
            </div>
          </div>

        </div>

        {/* Action CTAs */}
        <div className="pt-6 border-t border-[#E8E6DF] flex flex-wrap items-center justify-between gap-4">
          <div className="flex space-x-3">
            <button
              onClick={handlePrint}
              className="px-4 py-2.5 bg-white border border-[#DDD9CE] rounded-lg text-xs font-semibold text-[#1A1A1A] hover:bg-[#FAF9F6] flex items-center space-x-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Receipt</span>
            </button>

            <button
              onClick={handleDownloadInvoice}
              className="px-4 py-2.5 bg-white border border-[#DDD9CE] rounded-lg text-xs font-semibold text-[#1A1A1A] hover:bg-[#FAF9F6] flex items-center space-x-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF Invoice</span>
            </button>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={() => navigate('/orders')}
              className="px-5 py-2.5 bg-[#FAF9F6] border border-[#1A1A1A] text-[#1A1A1A] text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-black hover:text-white transition-colors"
            >
              View in My Orders
            </button>

            <button
              onClick={() => navigate('/shop')}
              className="px-6 py-2.5 bg-[#1A1A1A] text-white text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-black transition-colors flex items-center space-x-1.5"
            >
              <span>Continue Shopping</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
export default OrderSuccessPage;