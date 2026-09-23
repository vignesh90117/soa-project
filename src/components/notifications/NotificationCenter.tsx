'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import {
  X,
  Bell,
  CheckCheck
} from 'lucide-react';

export function NotificationCenter() {
  const {
    notifications,
    isNotificationDrawerOpen,
    setIsNotificationDrawerOpen,
    markNotificationRead,
    markAllNotificationsRead
  } = useApp();

  if (!isNotificationDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        onClick={() => setIsNotificationDrawerOpen(false)}
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
      ></div>

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-sm bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col">
          
          <div className="p-5 border-b border-slate-800 bg-slate-950/60 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-sm">
                🔔
              </span>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-white text-base">Notifications</h3>
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    Service S4
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">Real-time Order Event Dispatcher</p>
              </div>
            </div>

            <button
              onClick={() => setIsNotificationDrawerOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="px-5 py-2.5 bg-slate-950 border-b border-slate-800/80 flex items-center justify-between text-xs">
            <span className="text-slate-400 font-mono">
              {notifications.filter((n) => !n.isRead).length} Unread
            </span>
            <button
              onClick={markAllNotificationsRead}
              className="text-orange-400 hover:text-orange-300 font-medium flex items-center gap-1"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span>Mark all as read</span>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {notifications.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-2 text-slate-500">
                <Bell className="w-8 h-8 opacity-40" />
                <p className="text-xs">No notifications yet.</p>
              </div>
            ) : (
              notifications.map((notif) => (
                <div
                  key={notif.notificationId}
                  onClick={() => markNotificationRead(notif.notificationId)}
                  className={'p-4 rounded-2xl border transition cursor-pointer space-y-1.5 ' +
                    (notif.isRead
                      ? 'bg-slate-950/60 border-slate-800/80 text-slate-400'
                      : 'bg-slate-950 border-orange-500/40 text-slate-100 shadow-md ring-1 ring-orange-500/20')}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                      {!notif.isRead && (
                        <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse"></span>
                      )}
                      {notif.title}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">{notif.timestamp}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{notif.message}</p>
                  <div className="flex items-center justify-between pt-1 text-[10px] font-mono text-slate-500">
                    <span>Order: #{notif.orderId}</span>
                    <span className="px-1.5 py-0.2 rounded bg-slate-800 text-slate-300">{notif.channel}</span>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      </div>
    </div>
  );
}