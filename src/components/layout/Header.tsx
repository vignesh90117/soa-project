'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import {
  ShoppingBag,
  Bell,
  Server
} from 'lucide-react';

export function Header() {
  const {
    cart,
    setIsCartOpen,
    notifications,
    setIsNotificationDrawerOpen,
    setActiveView
  } = useApp();

  const totalCartCount = cart.reduce((acc, curr) => acc + curr.quantity, 0);
  const unreadNotifsCount = notifications.filter((n) => !n.isRead).length;

  const services = [
    { code: 'S1', name: 'Restaurant' },
    { code: 'S2', name: 'Order' },
    { code: 'S3', name: 'Payment' },
    { code: 'S4', name: 'Notify' },
    { code: 'S5', name: 'Gateway' }
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/85 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveView('food-app')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 via-orange-600 to-red-600 flex items-center justify-center shadow-lg shadow-orange-500/20 text-white font-bold text-xl">
              🍜
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-lg font-bold bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-200 bg-clip-text text-transparent">
                  QuickBite SOA
                </span>
                <span className="px-2 py-0.5 text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full">
                  Agile + Jira
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono hidden sm:block">
                Service-Oriented Food Ordering System
              </p>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-2 bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-full text-xs">
            <span className="text-slate-400 text-[11px] font-medium mr-1 flex items-center gap-1">
              <Server className="w-3.5 h-3.5 text-indigo-400" />
              Services:
            </span>
            {services.map((svc) => (
              <span
                key={svc.code}
                className="flex items-center space-x-1 px-2 py-0.5 rounded-md bg-slate-800/80 text-[11px] text-slate-300 hover:bg-slate-700/60 transition cursor-help"
                title={svc.code + ': ' + svc.name + ' Service is Healthy'}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="font-mono font-medium">{svc.code}</span>
              </span>
            ))}
          </div>

          <div className="flex items-center space-x-2 sm:space-x-3">
            <button
              onClick={() => setIsNotificationDrawerOpen(true)}
              className="relative p-2 rounded-xl text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-800 transition"
              title="Notification Service (S4)"
            >
              <Bell className="w-5 h-5" />
              {unreadNotifsCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white font-bold text-[10px] rounded-full flex items-center justify-center ring-2 ring-slate-950 animate-bounce">
                  {unreadNotifsCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center space-x-2 px-3.5 py-2 rounded-xl text-slate-100 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 shadow-md shadow-orange-600/20 font-medium text-sm transition"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Cart</span>
              {totalCartCount > 0 && (
                <span className="px-1.5 py-0.2 bg-white text-orange-600 font-bold text-xs rounded-full ml-1">
                  {totalCartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}