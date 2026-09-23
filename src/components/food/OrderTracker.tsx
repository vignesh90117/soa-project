'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { OrderStatus } from '@/types';
import {
  CheckCircle2,
  ChefHat,
  Bike,
  PackageCheck,
  XCircle,
  RefreshCw
} from 'lucide-react';

export function OrderTracker() {
  const {
    orders,
    advanceOrderStatus,
    cancelOrder,
    activeOrderToTrack
  } = useApp();

  const statuses: { key: OrderStatus; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { key: 'CONFIRMED', label: 'Order Confirmed', icon: CheckCircle2 },
    { key: 'PREPARING', label: 'Cooking in Kitchen', icon: ChefHat },
    { key: 'OUT_FOR_DELIVERY', label: 'Rider on the Way', icon: Bike },
    { key: 'DELIVERED', label: 'Delivered', icon: PackageCheck }
  ];

  const getStatusStepIndex = (status: OrderStatus) => {
    switch (status) {
      case 'PENDING_PAYMENT':
        return 0;
      case 'CONFIRMED':
        return 1;
      case 'PREPARING':
        return 2;
      case 'OUT_FOR_DELIVERY':
        return 3;
      case 'DELIVERED':
        return 4;
      default:
        return -1;
    }
  };

  const currentOrder = activeOrderToTrack || (orders.length > 0 ? orders[0] : null);

  if (!currentOrder) return null;

  const currentStep = getStatusStepIndex(currentOrder.status);

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
              Service S2 Order State Machine
            </span>
            <span className="text-xs text-slate-400">
              Placed: {new Date(currentOrder.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
            Tracking Order #{currentOrder.orderId}
          </h2>
          <p className="text-xs text-slate-400">
            Restaurant: <span className="text-orange-400 font-semibold">{currentOrder.restaurantName}</span> • Address: {currentOrder.deliveryAddress}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {currentOrder.status !== 'DELIVERED' && currentOrder.status !== 'CANCELLED' && (
            <button
              onClick={() => advanceOrderStatus(currentOrder.orderId)}
              className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-md shadow-blue-600/20 transition"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Simulate Next Event (S2 ➔ S4)</span>
            </button>
          )}

          {currentOrder.status !== 'DELIVERED' && currentOrder.status !== 'CANCELLED' && (
            <button
              onClick={() => cancelOrder(currentOrder.orderId)}
              className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-rose-950/60 hover:text-rose-300 text-slate-400 text-xs font-semibold border border-slate-700 transition"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {currentOrder.status === 'CANCELLED' ? (
        <div className="p-4 rounded-2xl bg-rose-950/30 border border-rose-500/30 text-center space-y-1">
          <XCircle className="w-8 h-8 text-rose-400 mx-auto" />
          <p className="font-bold text-rose-300 text-sm">This order was cancelled</p>
          <p className="text-xs text-slate-400">Refund has been routed back via S3 Payment Service.</p>
        </div>
      ) : (
        <div className="relative py-4">
          <div className="absolute top-1/2 left-6 right-6 -translate-y-1/2 h-1 bg-slate-800 -z-0">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 via-blue-500 to-indigo-500 transition-all duration-500"
              style={{ width: `${Math.min(100, Math.max(0, (currentStep / 4) * 100))}%` }}
            ></div>
          </div>

          <div className="relative z-10 grid grid-cols-4 gap-2 text-center">
            {statuses.map((s, idx) => {
              const Icon = s.icon;
              const stepNumber = idx + 1;
              const isCompleted = currentStep >= stepNumber;
              const isCurrent = currentStep === stepNumber;

              return (
                <div key={s.key} className="flex flex-col items-center space-y-2">
                  <div
                    className={'w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ' +
                      (isCompleted
                        ? 'bg-emerald-500 border-emerald-400 text-white shadow-lg shadow-emerald-500/25'
                        : isCurrent
                        ? 'bg-blue-600 border-blue-400 text-white animate-pulse shadow-lg shadow-blue-500/30'
                        : 'bg-slate-900 border-slate-700 text-slate-500')}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p
                      className={'text-xs font-bold ' +
                        (isCompleted || isCurrent ? 'text-white' : 'text-slate-500')}
                    >
                      {s.label}
                    </p>
                    <p className="text-[10px] text-slate-400 hidden sm:block">
                      {isCompleted ? 'Completed' : isCurrent ? 'In Progress' : 'Pending'}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-800">
        <div className="space-y-2">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Ordered Items</h4>
          <div className="space-y-1.5">
            {currentOrder.items.map((it) => (
              <div key={it.itemId} className="flex items-center justify-between text-xs text-slate-300 py-1">
                <span>{it.name} x {it.quantity}</span>
                <span className="font-mono text-slate-100 font-semibold">₹{(it.price * it.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2 bg-slate-950 p-4 rounded-2xl border border-slate-800">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Payment & Service Meta</h4>
          <div className="space-y-1 text-xs text-slate-400">
            <div className="flex justify-between">
              <span>Status:</span>
              <span className="font-bold text-emerald-400">{currentOrder.status}</span>
            </div>
            <div className="flex justify-between">
              <span>Payment Ref:</span>
              <span className="font-mono text-slate-200">{currentOrder.paymentId || 'Pending'}</span>
            </div>
            <div className="flex justify-between">
              <span>Total Paid:</span>
              <span className="font-mono text-orange-400 font-bold">₹{currentOrder.totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}