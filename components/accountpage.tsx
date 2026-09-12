'use client';

import React, { useState } from 'react';
import {
  User,
  MapPin,
  ShoppingBag,
  Heart,
  LogOut,
  Crown,
  Check,
  ArrowRight,
  ShieldCheck,
  Edit2,
} from 'lucide-react';
import { useShop } from '../context/shopcontext';
import { Address } from '../types';
export const AccountPage: React.FC = () => {
  const {
    user,
    updateUserProfile,
    logout,
    orders,
    wishlist,
    navigate,
    addToast,
  } = useShop();

  const [isEditingAddress, setIsEditingAddress] = useState(false);

  const [street, setStreet] = useState(user?.address?.street || '');
  const [apartment, setApartment] = useState(user?.address?.apartment || '');
  const [city, setCity] = useState(user?.address?.city || '');
  const [state, setState] = useState(user?.address?.state || '');
  const [postalCode, setPostalCode] = useState(
    user?.address?.postalCode || ''
  );
  const [phone, setPhone] = useState(user?.phone || '');


  if (!user) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-serif-luxury text-2xl font-bold text-[#1A1A1A]">
          Please sign in to view your account
        </h2>
        <button
          onClick={() => navigate('/login')}
          className="px-6 py-3 bg-[#1A1A1A] text-white text-xs uppercase tracking-widest font-bold rounded-xl hover:bg-black"
        >
          Sign In
        </button>
      </div>
    );
  }

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
  phone,
  address: {
    ...user.address,
    street,
    apartment,
    city,
    state,
    postalCode,
  } as Address,
});
    setIsEditingAddress(false);
  };

  return (
    <div id="account-page-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Account Header Card */}
      <div className="bg-white rounded-3xl border border-[#E8E6DF] p-6 sm:p-10 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-full bg-[#1A1A1A] text-[#FAF9F6] flex items-center justify-center font-serif-luxury text-2xl font-bold">
            {user.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
                {user.name}
              </h1>
              <span className="px-2.5 py-0.5 bg-[#FAF3E0] text-[#B58D5C] text-[10px] font-bold uppercase rounded-full border border-[#E5D4B8] flex items-center space-x-1">
                <Crown className="w-3 h-3" />
                <span>{user.membershipTier} Tier</span>
              </span>
            </div>
            <p className="text-xs text-[#8C8880] mt-0.5">{user.email} · Member since {user.memberSince}</p>
          </div>
        </div>

        <button
          onClick={logout}
          className="px-4 py-2 bg-[#FAF9F6] border border-[#DDD9CE] hover:border-[#A3433B] hover:text-[#A3433B] text-xs font-semibold text-[#5A5854] rounded-lg transition-colors flex items-center space-x-1.5"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Orders summary */}
        <div
          onClick={() => navigate('/orders')}
          className="bg-white p-6 rounded-2xl border border-[#E8E6DF] shadow-xs hover:border-[#1A1A1A] transition-all cursor-pointer flex items-center justify-between group"
        >
          <div className="space-y-1">
            <div className="p-2.5 bg-[#F0ECE1] rounded-xl w-fit text-[#1A1A1A]">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <h3 className="font-serif-luxury text-lg font-bold text-[#1A1A1A] pt-2">
              Order History
            </h3>
            <p className="text-xs text-[#8C8880]">
              {orders.length} order(s) placed
            </p>
          </div>
          <ArrowRight className="w-5 h-5 text-[#8C8880] group-hover:translate-x-1 group-hover:text-[#1A1A1A] transition-all" />
        </div>

        {/* Wishlist summary */}
        <div
          onClick={() => navigate('/wishlist')}
          className="bg-white p-6 rounded-2xl border border-[#E8E6DF] shadow-xs hover:border-[#1A1A1A] transition-all cursor-pointer flex items-center justify-between group"
        >
          <div className="space-y-1">
            <div className="p-2.5 bg-[#F9ECEB] rounded-xl w-fit text-[#A3433B]">
              <Heart className="w-5 h-5 fill-current" />
            </div>
            <h3 className="font-serif-luxury text-lg font-bold text-[#1A1A1A] pt-2">
              Saved Wishlist
            </h3>
            <p className="text-xs text-[#8C8880]">
              {wishlist.length} curated item(s)
            </p>
          </div>
          <ArrowRight className="w-5 h-5 text-[#8C8880] group-hover:translate-x-1 group-hover:text-[#1A1A1A] transition-all" />
        </div>

        {/* VIP Concierge Perk */}
        <div className="bg-[#FAF8F5] p-6 rounded-2xl border border-[#E8E0D0] shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <div className="p-2.5 bg-[#F5EBD9] rounded-xl w-fit text-[#B58D5C]">
              <Crown className="w-5 h-5" />
            </div>
            <h3 className="font-serif-luxury text-lg font-bold text-[#1A1A1A] pt-2">
              VIP Atelier Club
            </h3>
            <p className="text-xs text-[#8C8880]">
              Complimentary seasonal gifts & tailoring
            </p>
          </div>
        </div>

      </div>

      {/* Address & Profile Details */}
      <div className="bg-white rounded-3xl border border-[#E8E6DF] p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#E8E6DF]">
          <div className="flex items-center space-x-2">
            <MapPin className="w-5 h-5 text-[#1A1A1A]" />
            <h3 className="font-serif-luxury text-xl font-bold text-[#1A1A1A]">
              Default Shipping Address
            </h3>
          </div>
          {!isEditingAddress && (
            <button
              onClick={() => setIsEditingAddress(true)}
              className="text-xs font-semibold text-[#1A1A1A] hover:underline flex items-center space-x-1"
            >
              <Edit2 className="w-3.5 h-3.5" />
              <span>Edit Address</span>
            </button>
          )}
        </div>

        {isEditingAddress ? (
          <form onSubmit={handleSaveAddress} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="sm:col-span-2">
              <label className="font-bold text-[#1A1A1A] block mb-1">Street Address</label>
              <input
                type="text"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                className="w-full p-3 bg-[#FAF9F6] border border-[#DDD9CE] rounded-lg"
              />
            </div>
            <div>
              <label className="font-bold text-[#1A1A1A] block mb-1">Apartment / Suite</label>
              <input
                type="text"
                value={apartment}
                onChange={(e) => setApartment(e.target.value)}
                className="w-full p-3 bg-[#FAF9F6] border border-[#DDD9CE] rounded-lg"
              />
            </div>
            <div>
              <label className="font-bold text-[#1A1A1A] block mb-1">City</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full p-3 bg-[#FAF9F6] border border-[#DDD9CE] rounded-lg"
              />
            </div>
            <div>
              <label className="font-bold text-[#1A1A1A] block mb-1">State / Province</label>
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full p-3 bg-[#FAF9F6] border border-[#DDD9CE] rounded-lg"
              />
            </div>
            <div>
              <label className="font-bold text-[#1A1A1A] block mb-1">Postal / ZIP Code</label>
              <input
                type="text"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                className="w-full p-3 bg-[#FAF9F6] border border-[#DDD9CE] rounded-lg"
              />
            </div>
            <div>
              <label className="font-bold text-[#1A1A1A] block mb-1">Phone</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-3 bg-[#FAF9F6] border border-[#DDD9CE] rounded-lg"
              />
            </div>

            <div className="sm:col-span-2 pt-2 flex space-x-3">
              <button
                type="button"
                onClick={() => setIsEditingAddress(false)}
                className="px-6 py-2.5 border border-[#DDD9CE] rounded-lg font-semibold text-[#5A5854]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#1A1A1A] text-white rounded-lg font-bold uppercase tracking-wider hover:bg-black"
              >
                Save Changes
              </button>
            </div>
          </form>
        ) : (
          <div className="text-xs text-[#5A5854] space-y-1">
           <p className="font-bold text-[#1A1A1A] text-sm">
  {user.address?.fullName || user.name}
</p>

<p>
  {user.address?.street || ''} {user.address?.apartment || ''}
</p>

<p>
  {user.address?.city || ''}, {user.address?.state || ''}{' '}
  {user.address?.postalCode || ''}
</p>

<p>{user.address?.country || 'United States'}</p>
          </div>
        )}
      </div>

    </div>
  );
};
export default AccountPage;