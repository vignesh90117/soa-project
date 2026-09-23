'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import {
  X,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  ShieldCheck,
  MapPin,
  User,
  Phone,
  Tag,
  Check
} from 'lucide-react';

export function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    clearCart,
    cartSubtotal,
    cartTax,
    cartDeliveryFee,
    discountAmount,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    cartTotal,
    createOrder
  } = useApp();

  const [customerName, setCustomerName] = useState('Vignesh Kumar');
  const [customerPhone, setCustomerPhone] = useState('+91 98765 43210');
  const [deliveryAddress, setDeliveryAddress] = useState('42 West End Blvd, Suite 4B, Silicon Heights');
  const [couponInput, setCouponInput] = useState('');

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponInput.trim()) {
      applyCoupon(couponInput.trim());
      setCouponInput('');
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !deliveryAddress) {
      alert('Please fill out all delivery contact details.');
      return;
    }
    createOrder({
      name: customerName,
      phone: customerPhone,
      address: deliveryAddress
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
      ></div>

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col">
          
          <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
            <div className="flex items-center space-x-2">
              <span className="w-8 h-8 rounded-xl bg-orange-600/20 text-orange-400 flex items-center justify-center font-bold text-sm">
                🛒
              </span>
              <div>
                <h3 className="font-bold text-white text-base">Your Cart</h3>
                {cart.length > 0 && (
                  <p className="text-[11px] text-slate-400">
                    From <span className="text-orange-400 font-semibold">{cart[0].restaurantName}</span>
                  </p>
                )}
              </div>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {cart.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center text-3xl">
                🍽️
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-slate-200">Your cart is empty</h4>
                <p className="text-xs text-slate-400">
                  Add some delicious items from our restaurant catalog (S1) to create an order.
                </p>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-semibold"
              >
                Browse Restaurants
              </button>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto p-5 space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  <span>Selected Items ({cart.length})</span>
                  <button
                    onClick={clearCart}
                    className="text-rose-400 hover:text-rose-300 flex items-center gap-1 font-medium capitalize"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Clear Cart</span>
                  </button>
                </div>

                {cart.map((c) => (
                  <div
                    key={c.item.itemId}
                    className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 gap-3"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-1.5">
                        <span
                          className={'w-2 h-2 rounded-full ' + (c.item.isVeg ? 'bg-emerald-400' : 'bg-rose-400')}
                        ></span>
                        <h5 className="font-bold text-xs text-slate-100 truncate">
                          {c.item.name}
                        </h5>
                      </div>
                      <p className="text-xs text-orange-400 font-semibold mt-0.5">
                        ₹{(c.item.price * c.quantity).toFixed(2)}
                        <span className="text-[10px] text-slate-500 font-normal ml-1">
                          (₹{c.item.price} each)
                        </span>
                      </p>
                    </div>

                    <div className="flex items-center space-x-2 bg-slate-800 border border-slate-700 rounded-xl p-1">
                      <button
                        onClick={() => updateQuantity(c.item.itemId, -1)}
                        className="p-1 rounded-lg hover:bg-slate-700 text-slate-300"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold text-white px-1">
                        {c.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(c.item.itemId, 1)}
                        className="p-1 rounded-lg hover:bg-slate-700 text-white"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Coupon Code Input */}
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span className="flex items-center gap-1.5 font-semibold">
                    <Tag className="w-3.5 h-3.5 text-amber-400" />
                    Have a promo coupon?
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">Use: AGILE50</span>
                </div>

                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-2 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-xs">
                    <span className="text-emerald-300 font-mono font-bold flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" />
                      {appliedCoupon} (₹{discountAmount} OFF)
                    </span>
                    <button
                      onClick={removeCoupon}
                      className="text-rose-400 hover:text-rose-300 text-[11px]"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      placeholder="Enter AGILE50 or SOA100"
                      className="flex-1 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white uppercase font-mono focus:outline-none focus:border-orange-500"
                    />
                    <button
                      type="submit"
                      className="px-3.5 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold transition"
                    >
                      Apply
                    </button>
                  </form>
                )}
              </div>

              {/* Delivery Form */}
              <div className="space-y-3 pt-4 border-t border-slate-800">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-orange-400" />
                  Delivery & Contact Information
                </h4>

                <div className="space-y-2">
                  <div>
                    <label className="text-[11px] text-slate-400 font-medium block mb-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
                      <input
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-orange-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-400 font-medium block mb-1">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
                      <input
                        type="tel"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-orange-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-400 font-medium block mb-1">
                      Delivery Address
                    </label>
                    <textarea
                      rows={2}
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-orange-500 resize-none"
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* Bill Breakdown */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Item Subtotal</span>
                  <span className="font-semibold text-slate-200">₹{cartSubtotal.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>GST & Restaurant Taxes (5%)</span>
                  <span className="font-semibold text-slate-200">₹{cartTax.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Delivery Partner Fee</span>
                  <span className="font-semibold text-emerald-400">
                    {cartDeliveryFee === 0 ? 'FREE' : '₹' + cartDeliveryFee.toFixed(2)}
                  </span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex items-center justify-between text-xs text-emerald-400">
                    <span>Coupon Discount ({appliedCoupon})</span>
                    <span className="font-bold">-₹{discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-sm font-extrabold text-white">
                  <span>To Pay (SOA Calculated)</span>
                  <span className="text-orange-400 font-mono text-base">₹{cartTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}

          {cart.length > 0 && (
            <div className="p-5 border-t border-slate-800 bg-slate-950">
              <button
                onClick={handlePlaceOrder}
                className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold text-sm flex items-center justify-center space-x-2 shadow-lg shadow-orange-600/30 transition"
              >
                <span>Trigger Service S2: Create Order</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <div className="flex items-center justify-center space-x-1 text-[11px] text-slate-500 mt-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Service Oriented Architecture • S2 Order Endpoint</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}