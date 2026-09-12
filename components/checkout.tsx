'use client';
import React, { useState } from 'react';
import { 
  ShieldCheck, 
  CreditCard, 
  Truck, 
  Smartphone, 
  Check, 
  Tag, 
  ArrowLeft, 
  Lock,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { useShop } from '../context/shopcontext';
import { Address } from '../types';
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

  return `${BACKEND_URL}/${image.replace(/^\/+/, '')}`;
};

export const CheckoutPage: React.FC = () => {
  const { 
    cart, 
    cartSubtotal, 
    discountAmount, 
    appliedCoupon, 
    applyCoupon, 
    removeCoupon, 
    shippingCost, 
    orderTotal, 
    placeOrder, 
    navigate, 
    addToast,
    user
  } = useShop();

  // Customer & Shipping Form State
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [firstName, setFirstName] = useState(user?.name.split(' ')[0] || '');
  const [lastName, setLastName] = useState(user?.name.split(' ').slice(1).join(' ') || '');
//   const [street, setStreet] = useState(user?.address.street || '');
//   const [apartment, setApartment] = useState(user?.address.apartment || '');
//   const [city, setCity] = useState(user?.address.city || '');
//   const [state, setState] = useState(user?.address.state || '');
//   const [postalCode, setPostalCode] = useState(user?.address.postalCode || '');
//   const [country, setCountry] = useState(user?.address.country || 'United States');
const [street, setStreet] = useState(user?.address?.street || '');
const [apartment, setApartment] = useState(user?.address?.apartment || '');
const [city, setCity] = useState(user?.address?.city || '');
const [state, setState] = useState(user?.address?.state || '');
const [postalCode, setPostalCode] = useState(user?.address?.postalCode || '');
const [country, setCountry] = useState(user?.address?.country || 'United States');

  // Coupon state
  const [couponCode, setCouponCode] = useState('');

  // Payment Selection
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cod' | 'upi'>('card');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExp, setCardExp] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('888');
  const [upiId, setUpiId] = useState('client@okaxis');

  // Submission loading simulation
  const [isProcessing, setIsProcessing] = useState(false);
  const [formErrors, setFormErrors] = useState<string[]>([]);

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-serif-luxury text-3xl font-bold text-[#1A1A1A]">
          Your Shopping Bag is Empty
        </h2>
        <p className="text-xs text-[#8C8880]">
          Add items to your cart before proceeding through checkout.
        </p>
        <button
          onClick={() => navigate('/shop')}
          className="px-8 py-3.5 bg-[#1A1A1A] text-white text-xs uppercase tracking-widest font-bold rounded-xl hover:bg-black transition-all"
        >
          Explore Shop
        </button>
      </div>
    );
  }

  const handleApplyCoupon = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!couponCode.trim()) return;

  const ok = await applyCoupon(couponCode);

  if (ok) {
    setCouponCode('');
  }
};

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: string[] = [];

    if (!email.trim() || !email.includes('@')) errors.push('Valid email address');
    if (!phone.trim()) errors.push('Contact phone number');
    if (!firstName.trim() || !lastName.trim()) errors.push('First and Last name');
    if (!street.trim()) errors.push('Street delivery address');
    if (!city.trim()) errors.push('City');
    if (!postalCode.trim()) errors.push('Postal / ZIP code');

    if (errors.length > 0) {
      setFormErrors(errors);
      addToast('Missing Details', `Please provide: ${errors.join(', ')}`, 'error');
      return;
    }

    setFormErrors([]);
    setIsProcessing(true);

    const shippingAddress: Address = {
      fullName: `${firstName} ${lastName}`,
      phone,
      street,
      apartment,
      city,
      state: state || 'NY',
      postalCode,
      country
    };
const handlePlaceOrder = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!shippingAddress || !paymentMethod) return;

  setIsProcessing(true);

  try {
    const order = await placeOrder(
      shippingAddress,
      paymentMethod
    );

    if (!order) return;

    navigate(`/order-success?id=${order.id}`);
  } finally {
    setIsProcessing(false);
  }
};

  return (
    <div id="checkout-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Header */}
      <div className="mb-8 flex items-center justify-between pb-4 border-b border-[#E8E6DF]">
        <button
          onClick={() => navigate('/shop')}
          className="flex items-center space-x-1.5 text-xs text-[#8C8880] hover:text-[#1A1A1A] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Continue Shopping</span>
        </button>

        <div className="flex items-center space-x-2 text-xs font-semibold text-[#2A6E3F]">
          <Lock className="w-3.5 h-3.5" />
          <span>SSL 256-Bit Encrypted Client Demo</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        
        {/* ================= LEFT: Shipping & Payment Form (7 Cols) ================= */}
        <div className="lg:col-span-7 space-y-8">
          
          <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-8">
            
            {/* Step 1: Contact Details */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E8E6DF] shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif-luxury text-xl font-bold text-[#1A1A1A]">
                  1. Contact Information
                </h3>
                <span className="text-[11px] text-[#8C8880]">Order updates will be sent here</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="font-bold text-[#1A1A1A] block mb-1">Email Address *</label>
                  <input
                    id="checkout-email-input"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@velora-demo.com"
                    className="w-full p-3 bg-[#FAF9F6] border border-[#DDD9CE] rounded-lg text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
                  />
                </div>
                <div>
                  <label className="font-bold text-[#1A1A1A] block mb-1">Phone Number (Courier) *</label>
                  <input
                    id="checkout-phone-input"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 019-2834"
                    className="w-full p-3 bg-[#FAF9F6] border border-[#DDD9CE] rounded-lg text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Shipping Address */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E8E6DF] shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif-luxury text-xl font-bold text-[#1A1A1A]">
                  2. Shipping Destination
                </h3>
                <span className="text-[11px] text-[#2A6E3F] font-semibold">Free Express on $100+</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="font-bold text-[#1A1A1A] block mb-1">First Name *</label>
                  <input
                    id="checkout-firstname-input"
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Alex"
                    className="w-full p-3 bg-[#FAF9F6] border border-[#DDD9CE] rounded-lg text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
                  />
                </div>
                <div>
                  <label className="font-bold text-[#1A1A1A] block mb-1">Last Name *</label>
                  <input
                    id="checkout-lastname-input"
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Vanderbilt"
                    className="w-full p-3 bg-[#FAF9F6] border border-[#DDD9CE] rounded-lg text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="font-bold text-[#1A1A1A] block mb-1">Street Address *</label>
                  <input
                    id="checkout-street-input"
                    type="text"
                    required
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    placeholder="742 Evergreen Terrace"
                    className="w-full p-3 bg-[#FAF9F6] border border-[#DDD9CE] rounded-lg text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#1A1A1A] block mb-1">Apartment, Suite, Unit</label>
                  <input
                    type="text"
                    value={apartment}
                    onChange={(e) => setApartment(e.target.value)}
                    placeholder="Apt 4B (Optional)"
                    className="w-full p-3 bg-[#FAF9F6] border border-[#DDD9CE] rounded-lg text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
                  />
                </div>
                <div>
                  <label className="font-bold text-[#1A1A1A] block mb-1">City *</label>
                  <input
                    id="checkout-city-input"
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="New York"
                    className="w-full p-3 bg-[#FAF9F6] border border-[#DDD9CE] rounded-lg text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#1A1A1A] block mb-1">State / Province *</label>
                  <input
                    type="text"
                    required
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    placeholder="NY"
                    className="w-full p-3 bg-[#FAF9F6] border border-[#DDD9CE] rounded-lg text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
                  />
                </div>
                <div>
                  <label className="font-bold text-[#1A1A1A] block mb-1">Postal / ZIP Code *</label>
                  <input
                    id="checkout-zip-input"
                    type="text"
                    required
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    placeholder="10001"
                    className="w-full p-3 bg-[#FAF9F6] border border-[#DDD9CE] rounded-lg text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
                  />
                </div>
              </div>
            </div>

            {/* Step 3: Payment Method Selection */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E8E6DF] shadow-xs space-y-5">
              <h3 className="font-serif-luxury text-xl font-bold text-[#1A1A1A]">
                3. Payment Method (Demo Simulation)
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                
                {/* Option 1: Card */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 rounded-xl border text-left flex flex-col justify-between space-y-2 transition-all ${
                    paymentMethod === 'card'
                      ? 'border-[#1A1A1A] bg-[#FAF9F6] ring-1 ring-[#1A1A1A]'
                      : 'border-[#DDD9CE] hover:border-[#8C8880]'
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-[#1A1A1A]" />
                  <div>
                    <span className="font-bold text-xs text-[#1A1A1A] block">Credit / Debit Card</span>
                    <span className="text-[10px] text-[#8C8880]">Visa, Mastercard, Amex</span>
                  </div>
                </button>

                {/* Option 2: COD */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-4 rounded-xl border text-left flex flex-col justify-between space-y-2 transition-all ${
                    paymentMethod === 'cod'
                      ? 'border-[#1A1A1A] bg-[#FAF9F6] ring-1 ring-[#1A1A1A]'
                      : 'border-[#DDD9CE] hover:border-[#8C8880]'
                  }`}
                >
                  <Truck className="w-5 h-5 text-[#1A1A1A]" />
                  <div>
                    <span className="font-bold text-xs text-[#1A1A1A] block">Cash on Delivery</span>
                    <span className="text-[10px] text-[#8C8880]">Pay upon courier arrival</span>
                  </div>
                </button>

                {/* Option 3: UPI / Instant */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-4 rounded-xl border text-left flex flex-col justify-between space-y-2 transition-all ${
                    paymentMethod === 'upi'
                      ? 'border-[#1A1A1A] bg-[#FAF9F6] ring-1 ring-[#1A1A1A]'
                      : 'border-[#DDD9CE] hover:border-[#8C8880]'
                  }`}
                >
                  <Smartphone className="w-5 h-5 text-[#1A1A1A]" />
                  <div>
                    <span className="font-bold text-xs text-[#1A1A1A] block">Demo Instant UPI</span>
                    <span className="text-[10px] text-[#8C8880]">Google Pay, PhonePe, QR</span>
                  </div>
                </button>

              </div>

              {/* Payment Details Form */}
              {paymentMethod === 'card' && (
                <div className="p-4 bg-[#FAF9F6] rounded-xl border border-[#DDD9CE] space-y-3 text-xs animate-in fade-in duration-200">
                  <div>
                    <label className="font-semibold text-[#1A1A1A] block mb-1">Card Number (Simulated)</label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full p-2.5 bg-white border border-[#DDD9CE] rounded-lg font-mono text-xs"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-semibold text-[#1A1A1A] block mb-1">Expiry</label>
                      <input
                        type="text"
                        value={cardExp}
                        onChange={(e) => setCardExp(e.target.value)}
                        className="w-full p-2.5 bg-white border border-[#DDD9CE] rounded-lg font-mono text-xs"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-[#1A1A1A] block mb-1">CVC</label>
                      <input
                        type="text"
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        className="w-full p-2.5 bg-white border border-[#DDD9CE] rounded-lg font-mono text-xs"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'upi' && (
                <div className="p-4 bg-[#FAF9F6] rounded-xl border border-[#DDD9CE] space-y-2 text-xs animate-in fade-in duration-200">
                  <label className="font-semibold text-[#1A1A1A] block">Virtual Payment Address (VPA / UPI ID)</label>
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    className="w-full p-2.5 bg-white border border-[#DDD9CE] rounded-lg text-xs"
                  />
                  <p className="text-[11px] text-[#8C8880]">Simulated instant approval for demo.</p>
                </div>
              )}

              {paymentMethod === 'cod' && (
                <div className="p-4 bg-[#FAF9F6] rounded-xl border border-[#DDD9CE] text-xs text-[#5A5854] space-y-1 animate-in fade-in duration-200">
                  <p className="font-semibold text-[#1A1A1A]">No advance online payment required.</p>
                  <p>Our concierge courier will collect the exact amount (${orderTotal.toFixed(2)}) upon signature at your doorstep.</p>
                </div>
              )}

            </div>

            {/* Error notifications */}
            {formErrors.length > 0 && (
              <div className="p-4 bg-[#F9ECEB] border border-[#E5A8A3] rounded-xl text-xs text-[#A3433B] flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>Please complete the required fields: {formErrors.join(', ')}</span>
              </div>
            )}

            {/* Place Order CTA Button */}
            <button
              id="place-order-submit-btn"
              type="submit"
              disabled={isProcessing}
              className="w-full py-4 bg-[#1A1A1A] hover:bg-black text-white text-xs uppercase tracking-[0.25em] font-bold rounded-xl transition-all shadow-lg hover:scale-[1.01] flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
            >
              {isProcessing ? (
                <span>Generating Order Invoice...</span>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Place Order • ${orderTotal.toFixed(2)}</span>
                </>
              )}
            </button>

          </form>

        </div>

        {/* ================= RIGHT: Order Summary (5 Cols) ================= */}
        <div className="lg:col-span-5 sticky top-24 space-y-6">
          
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E8E6DF] shadow-xs space-y-6">
            <h3 className="font-serif-luxury text-xl font-bold text-[#1A1A1A] pb-3 border-b border-[#E8E6DF]">
              Order Summary ({cart.reduce((s, i) => s + i.quantity, 0)} Items)
            </h3>

            {/* Cart Items List */}
            <div className="space-y-4 max-h-80 overflow-y-auto pr-1 divide-y divide-[#F0ECE1]">
              {cart.map((item) => (
               <div key={`${item.product.id}-${item.selectedSize}-${item.selectedColor?.name || 'default'}`} className="pt-3 flex space-x-3 text-xs">
                <div className="w-16 h-20 rounded-lg bg-[#F9F8F6] border border-[#E8E6DF] overflow-hidden flex-shrink-0">
  <img
    src={getImageUrl(item.product.images[0])}
    alt={item.product.name}
    referrerPolicy="no-referrer"
    className="w-full h-full object-contain"
  />
</div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-[#1A1A1A] line-clamp-1">{item.product.name}</h4>
                    <p className="text-[11px] text-[#8C8880] mt-0.5">
                     Size: {item.selectedSize} | Color: {item.selectedColor?.name || 'Default'}
                    </p>
                    <p className="text-[11px] text-[#8C8880]">Qty: {item.quantity}</p>
                  </div>
                  <div className="text-right font-bold text-[#1A1A1A]">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            {/* Coupon Code Entry */}
            <div className="pt-4 border-t border-[#E8E6DF]">
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-3 bg-[#F0F7F1] border border-[#CDE5D3] rounded-xl text-xs">
                  <div className="flex items-center space-x-2 text-[#2A6E3F]">
                    <Tag className="w-4 h-4" />
                    <span className="font-bold">{appliedCoupon.code}</span>
                    <span>({appliedCoupon.discountPercentage}% OFF)</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-xs text-[#A3433B] font-semibold hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex space-x-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter Coupon (VELORA10)"
                    className="flex-1 p-2.5 bg-[#FAF9F6] border border-[#DDD9CE] rounded-lg text-xs uppercase text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-[#1A1A1A] text-white text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-black"
                  >
                    Apply
                  </button>
                </form>
              )}
            </div>

            {/* Price Calculations Breakdown */}
            <div className="space-y-2.5 text-xs border-t border-[#E8E6DF] pt-4">
              <div className="flex justify-between text-[#5A5854]">
                <span>Bag Subtotal</span>
                <span className="font-semibold text-[#1A1A1A]">${cartSubtotal.toFixed(2)}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-[#2A6E3F] font-semibold">
                  <span>Coupon Discount ({appliedCoupon?.code})</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between text-[#5A5854]">
                <span>Express Courier Shipping</span>
                <span className="font-semibold text-[#1A1A1A]">
                  {shippingCost === 0 ? <span className="text-[#2A6E3F]">FREE</span> : `$${shippingCost.toFixed(2)}`}
                </span>
              </div>

              <div className="flex justify-between text-[#5A5854]">
                <span>Estimated Sales Tax</span>
                <span className="font-semibold text-[#1A1A1A]">$0.00</span>
              </div>

              <div className="flex justify-between text-base font-bold text-[#1A1A1A] border-t border-[#E8E6DF] pt-3">
                <span>Grand Total</span>
                <span>${orderTotal.toFixed(2)}</span>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};}
export default CheckoutPage;
