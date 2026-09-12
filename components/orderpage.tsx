'use client';
import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Truck, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  Package,
  RotateCcw,
  ExternalLink
} from 'lucide-react';
import { useShop } from '../context/shopcontext';
import { Order, OrderStatus } from '../types';

export const OrdersPage: React.FC = () => {
  const { orders, products, navigate, addToCart, addToast } = useShop();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(orders[0] || null);

  if (orders.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-[#EFECE6] flex items-center justify-center mx-auto text-[#8C8880]">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="font-serif-luxury text-3xl font-bold text-[#1A1A1A]">
          No orders placed yet
        </h2>
        <p className="text-xs text-[#8C8880]">
          When you purchase garments from VELORA, your tracking and receipt details will appear here.
        </p>
        <button
          onClick={() => navigate('/shop')}
          className="px-8 py-3.5 bg-[#1A1A1A] text-white text-xs uppercase tracking-widest font-bold rounded-xl hover:bg-black"
        >
          Discover Atelier
        </button>
      </div>
    );
  }

  const handleReorder = (order: Order) => {
    order.items.forEach((item) => {
      const prod = item.product || products.find((p) => p.id === item.productId) || products[0];
      if (prod) {
        const size = item.selectedSize || item.size || prod.sizes[0] || 'M';
        const color = item.selectedColor || prod.colors[0] || { name: 'Default', hex: '#000' };
        addToCart(prod, size, color, item.quantity || 1);
      }
    });
    addToast('Items Added', 'All items from this order were added to your shopping bag.');
    navigate('/checkout');
  };

  const getStatusBadge = (status: OrderStatus) => {
    const s = String(status).toUpperCase();
    if (s.includes('DELIVERED')) {
      return <span className="px-2.5 py-0.5 bg-[#E8F3EB] text-[#2A6E3F] rounded-full text-[10px] font-bold uppercase">Delivered</span>;
    }
    if (s.includes('SHIP') || s.includes('TRANSIT') || s.includes('OUT FOR')) {
      return <span className="px-2.5 py-0.5 bg-[#EBF3FB] text-[#2C6ECB] rounded-full text-[10px] font-bold uppercase">In Transit</span>;
    }
    if (s.includes('PROCESS') || s.includes('CONFIRM') || s.includes('PLACED')) {
      return <span className="px-2.5 py-0.5 bg-[#FAF3E0] text-[#B58D5C] rounded-full text-[10px] font-bold uppercase">Confirmed</span>;
    }
    return <span className="px-2.5 py-0.5 bg-[#F0ECE1] text-[#5A5854] rounded-full text-[10px] font-bold uppercase">{status}</span>;
  };

  return (
    <div id="orders-page-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="pb-4 border-b border-[#E8E6DF] space-y-1">
        <h1 className="font-serif-luxury text-3xl font-bold text-[#1A1A1A]">
          My Order History
        </h1>
        <p className="text-xs text-[#8C8880]">
          Track delivery progress, review invoices, and manage past acquisitions.
        </p>
      </div>

      {/* Orders List & Tracking Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Orders List (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          {orders.map((order) => {
            const isSelected = selectedOrder?.id === order.id;
            return (
              <div
                key={order.id}
                id={`order-item-${order.id}`}
                onClick={() => setSelectedOrder(order)}
                className={`bg-white p-6 rounded-2xl border transition-all cursor-pointer shadow-xs ${
                  isSelected ? 'border-[#1A1A1A] ring-1 ring-[#1A1A1A]' : 'border-[#E8E6DF] hover:border-[#8C8880]'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#F0ECE1] text-xs">
                  <div>
                    <span className="text-[#8C8880] text-[10px] uppercase tracking-wider block">Order ID</span>
                    <strong className="font-mono font-bold text-[#1A1A1A]">#{order.id}</strong>
                  </div>
                  <div>
                    <span className="text-[#8C8880] text-[10px] uppercase tracking-wider block">Placed On</span>
                    <span className="text-[#5A5854]">{order.createdAt || order.date}</span>
                  </div>
                  <div>
                    <span className="text-[#8C8880] text-[10px] uppercase tracking-wider block">Total</span>
                    <strong className="text-[#1A1A1A]">${order.total.toFixed(2)}</strong>
                  </div>
                  <div>
                    {getStatusBadge(order.status)}
                  </div>
                </div>

                {/* Items preview */}
                <div className="py-3 flex items-center space-x-3 overflow-x-auto">
                  {order.items.map((it, idx) => {
                    const imgSrc = it.image || it.product?.images[0] || 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=300';
                    return (
                      <div key={idx} className="flex items-center space-x-2 flex-shrink-0 bg-[#FAF9F6] p-1.5 rounded-lg border border-[#E8E6DF]">
                        <img
                          src={imgSrc}
                          alt={it.productName}
                          referrerPolicy="no-referrer"
                          className="w-10 h-12 rounded object-cover"
                        />
                        <div className="text-[11px] pr-2">
                          <span className="font-medium text-[#1A1A1A] line-clamp-1 max-w-[120px]">{it.productName}</span>
                          <span className="text-[#8C8880]">Qty: {it.quantity}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-3 border-t border-[#F0ECE1] flex items-center justify-between text-xs">
                  <span className="text-[#8C8880] text-[11px]">
                    Est. Delivery: <strong className="text-[#1A1A1A]">{order.estimatedDelivery}</strong>
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleReorder(order);
                    }}
                    className="text-xs font-semibold text-[#1A1A1A] hover:underline"
                  >
                    Reorder Items →
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Selected Order Detail Tracker (5 Cols) */}
        {selectedOrder && (
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-[#E8E6DF] shadow-xs sticky top-24 space-y-6">
            
            <div className="flex items-center justify-between pb-4 border-b border-[#E8E6DF]">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#8C8880]">
                  Live Tracking
                </span>
                <h3 className="font-serif-luxury text-xl font-bold text-[#1A1A1A]">
                  Order #{selectedOrder.id}
                </h3>
              </div>
              {getStatusBadge(selectedOrder.status)}
            </div>

            {/* Tracking Progress Steps */}
            <div className="space-y-4 text-xs">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-[#2A6E3F] text-white flex items-center justify-center flex-shrink-0 text-[10px]">
                  ✓
                </div>
                <div>
                  <h4 className="font-bold text-[#1A1A1A]">Order Confirmed</h4>
                  <p className="text-[11px] text-[#8C8880]">{selectedOrder.createdAt || selectedOrder.date}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-[#2A6E3F] text-white flex items-center justify-center flex-shrink-0 text-[10px]">
                  ✓
                </div>
                <div>
                  <h4 className="font-bold text-[#1A1A1A]">Quality Inspection & Packaging</h4>
                  <p className="text-[11px] text-[#8C8880]">Plastic-free luxury atelier box ready</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-[#1A1A1A] text-white flex items-center justify-center flex-shrink-0 text-[10px]">
                  <Truck className="w-3 h-3" />
                </div>
                <div>
                  <h4 className="font-bold text-[#1A1A1A]">Dispatched with Express Courier</h4>
                  <p className="text-[11px] text-[#8C8880]">Tracking: VEL-EXP-9928139</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 opacity-60">
                <div className="w-6 h-6 rounded-full bg-[#DDD9CE] text-[#5A5854] flex items-center justify-center flex-shrink-0 text-[10px]">
                  4
                </div>
                <div>
                  <h4 className="font-bold text-[#1A1A1A]">Estimated Delivery</h4>
                  <p className="text-[11px] text-[#8C8880]">{selectedOrder.estimatedDelivery}</p>
                </div>
              </div>
            </div>

            {/* Delivery Destination */}
            <div className="p-4 bg-[#FAF9F6] rounded-xl border border-[#E8E6DF] text-xs space-y-1">
              <span className="font-bold text-[#1A1A1A] uppercase tracking-wider block text-[10px]">
                Delivering To:
              </span>
              <p className="font-semibold text-[#1A1A1A]">{selectedOrder.shippingAddress.fullName}</p>
              <p className="text-[#5A5854]">{selectedOrder.shippingAddress.street || selectedOrder.shippingAddress.addressLine}</p>
              <p className="text-[#5A5854]">
                {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} {selectedOrder.shippingAddress.postalCode || selectedOrder.shippingAddress.pincode}
              </p>
            </div>

            {/* Actions */}
            <div className="pt-2 flex space-x-3">
              <button
                onClick={() => handleReorder(selectedOrder)}
                className="flex-1 py-3 bg-[#1A1A1A] text-white text-xs uppercase tracking-widest font-bold rounded-xl hover:bg-black transition-all"
              >
                Reorder Items
              </button>
            </div>

          </div>
        )}

      </div>

    </div>
  );
};
export default OrdersPage;