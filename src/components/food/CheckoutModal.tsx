'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import {
  X,
  CreditCard,
  QrCode,
  Smartphone,
  Banknote,
  CheckCircle2,
  Lock,
  Loader2,
  ShieldCheck
} from 'lucide-react';

export function CheckoutModal() {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    pendingPaymentOrder,
    processPayment
  } = useApp();

  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'CREDIT_CARD' | 'DEBIT_CARD' | 'NET_BANKING' | 'COD'>('UPI');
  const [upiId, setUpiId] = useState('vignesh@okhdfcbank');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8821');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isCheckoutOpen || !pendingPaymentOrder) return null;

  const handlePay = async () => {
    setIsProcessing(true);
    try {
      await processPayment(pendingPaymentOrder.orderId, paymentMethod, upiId);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        
        <div className="p-5 border-b border-slate-800 bg-slate-950/70 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-sm">
              💳
            </span>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-bold text-white text-base">Payment Gateway</h3>
                <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  Service S3
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Order ID: <span className="font-mono text-orange-400 font-semibold">{pendingPaymentOrder.orderId}</span>
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-950 border border-slate-800">
            <div>
              <p className="text-xs text-slate-400">Payable Amount</p>
              <p className="text-2xl font-extrabold text-white font-mono mt-0.5">
                ₹{pendingPaymentOrder.totalAmount.toFixed(2)}
              </p>
            </div>
            <div className="text-right text-xs text-slate-400">
              <p className="font-medium text-slate-300">{pendingPaymentOrder.restaurantName}</p>
              <p className="text-[11px] text-slate-500">{pendingPaymentOrder.items.length} items</p>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
              Choose Payment Method
            </label>

            <div className="grid grid-cols-2 gap-2.5">
              {[
                { id: 'UPI', label: 'UPI / QR', icon: QrCode, desc: 'GPay, PhonePe, Paytm' },
                { id: 'CREDIT_CARD', label: 'Credit Card', icon: CreditCard, desc: 'Visa, Master, RuPay' },
                { id: 'NET_BANKING', label: 'Net Banking', icon: Smartphone, desc: 'HDFC, SBI, ICICI' },
                { id: 'COD', label: 'Pay on Delivery', icon: Banknote, desc: 'Cash / UPI at doorstep' }
              ].map((m) => {
                const Icon = m.icon;
                const isSelected = paymentMethod === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => setPaymentMethod(m.id as any)}
                    className={'flex flex-col text-left p-3 rounded-2xl border transition ' +
                      (isSelected
                        ? 'bg-purple-950/40 border-purple-500 text-white shadow-md shadow-purple-500/10'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200')}
                  >
                    <div className="flex items-center justify-between w-full mb-1">
                      <Icon className={'w-4 h-4 ' + (isSelected ? 'text-purple-400' : 'text-slate-400')} />
                      {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />}
                    </div>
                    <span className="text-xs font-bold text-slate-100">{m.label}</span>
                    <span className="text-[10px] text-slate-500 truncate">{m.desc}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {paymentMethod === 'UPI' && (
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <label className="text-[11px] font-medium text-slate-300 block">
                Enter UPI Virtual Payment Address (VPA)
              </label>
              <input
                type="text"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                placeholder="e.g. mobile@upi"
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-purple-500 font-mono"
              />
              <p className="text-[10px] text-emerald-400 flex items-center gap-1 mt-1">
                <CheckCircle2 className="w-3 h-3" />
                Verified VPA Handler
              </p>
            </div>
          )}

          {paymentMethod === 'CREDIT_CARD' && (
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div>
                <label className="text-[11px] font-medium text-slate-300 block mb-1">
                  Card Number
                </label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white font-mono"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-medium text-slate-400 block mb-1">Expiry</label>
                  <input
                    type="text"
                    defaultValue="08/29"
                    className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white text-center font-mono"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-medium text-slate-400 block mb-1">CVV</label>
                  <input
                    type="password"
                    defaultValue="•••"
                    className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white text-center font-mono"
                  />
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center space-x-2 text-[11px] text-slate-400">
            <Lock className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
            <span>256-Bit SSL Encrypted • Direct Hook to S3 Microservice Event Bus</span>
          </div>
        </div>

        <div className="p-5 border-t border-slate-800 bg-slate-950">
          <button
            onClick={handlePay}
            disabled={isProcessing}
            className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-50 text-white font-bold text-sm flex items-center justify-center space-x-2 shadow-lg shadow-purple-600/30 transition"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Processing S3 Payment Transaction...</span>
              </>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" />
                <span>Authorize & Pay ₹{pendingPaymentOrder.totalAmount.toFixed(2)}</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}