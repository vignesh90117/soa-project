'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import {
  Network,
  Send,
  Trash2,
  Shield,
  Server,
  Zap,
  Clock
} from 'lucide-react';

export function ApiGatewayInspector() {
  const { apiLogs, logApiCall, clearApiLogs, restaurants } = useApp();

  const [selectedMethod, setSelectedMethod] = useState<'GET' | 'POST' | 'PUT' | 'DELETE'>('GET');
  const [requestUrl, setRequestUrl] = useState<string>('/api/v1/restaurants');
  const [targetService, setTargetService] = useState<'S1-Restaurant' | 'S2-Order' | 'S3-Payment' | 'S4-Notification' | 'S5-Gateway'>('S1-Restaurant');
  const [requestBody, setRequestBody] = useState<string>('');
  const [lastResponse, setLastResponse] = useState<any>({
    status: 200,
    statusText: 'OK',
    latencyMs: 38,
    timestamp: '2026-08-26T14:30:00Z',
    data: {
      total: 4,
      restaurants: [
        { id: 10, name: 'Spice Garden Bistro', rating: 4.8, location: 'Downtown Central' },
        { id: 20, name: 'Bella Italia Trattoria', rating: 4.7, location: 'Koregaon' }
      ]
    }
  });

  const samplePresets = [
    {
      label: 'S1: Get Restaurants',
      method: 'GET' as const,
      url: '/api/v1/restaurants',
      service: 'S1-Restaurant' as const,
      body: ''
    },
    {
      label: 'S1: Get Menu (ID 10)',
      method: 'GET' as const,
      url: '/api/v1/restaurants/10/menu',
      service: 'S1-Restaurant' as const,
      body: ''
    },
    {
      label: 'S2: Create Order',
      method: 'POST' as const,
      url: '/api/v1/orders',
      service: 'S2-Order' as const,
      body: JSON.stringify(
        {
          userId: 101,
          restaurantId: 10,
          items: [
            { itemId: 501, quantity: 2 },
            { itemId: 504, quantity: 1 }
          ]
        },
        null,
        2
      )
    },
    {
      label: 'S3: Charge Payment',
      method: 'POST' as const,
      url: '/api/v1/payments/charge',
      service: 'S3-Payment' as const,
      body: JSON.stringify(
        {
          orderId: 'ORD-928341',
          amount: 502.50,
          paymentMethod: 'UPI',
          upiId: 'vignesh@okhdfcbank'
        },
        null,
        2
      )
    },
    {
      label: 'S4: Dispatch Alert',
      method: 'POST' as const,
      url: '/api/v1/notifications/send',
      service: 'S4-Notification' as const,
      body: JSON.stringify(
        {
          orderId: 'ORD-928341',
          event: 'ORDER_CONFIRMED',
          recipient: '+919876543210'
        },
        null,
        2
      )
    }
  ];

  const handleApplyPreset = (p: typeof samplePresets[0]) => {
    setSelectedMethod(p.method);
    setRequestUrl(p.url);
    setTargetService(p.service);
    setRequestBody(p.body);
  };

  const handleExecuteRequest = () => {
    const latency = Math.floor(25 + Math.random() * 85);
    let parsedBody = undefined;
    if (requestBody.trim()) {
      try {
        parsedBody = JSON.parse(requestBody);
      } catch (e) {
        parsedBody = { raw: requestBody };
      }
    }

    let responseData: any = {};
    let status = 200;

    if (requestUrl.includes('/restaurants') && requestUrl.includes('/menu')) {
      responseData = {
        restaurantId: 10,
        itemsCount: 6,
        categories: ['Starters', 'Main Course', 'Desserts', 'Beverages']
      };
    } else if (requestUrl.includes('/restaurants')) {
      responseData = {
        total: 4,
        restaurants: restaurants.map((r) => ({ id: r.restaurantId, name: r.name, cuisine: r.cuisine }))
      };
    } else if (requestUrl.includes('/orders')) {
      status = 201;
      responseData = {
        orderId: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
        status: 'PENDING_PAYMENT',
        createdAt: new Date().toISOString()
      };
    } else if (requestUrl.includes('/payments')) {
      responseData = {
        transactionId: 'TXN-' + Math.floor(10000 + Math.random() * 90000),
        status: 'SUCCESS',
        bankRef: 'HDFC-PAY-OK'
      };
    } else {
      status = 202;
      responseData = {
        notificationId: 'NOTIF-' + Math.floor(100 + Math.random() * 900),
        dispatched: true,
        channel: 'PUSH_AND_SMS'
      };
    }

    setLastResponse({
      status,
      statusText: status === 201 ? 'Created' : status === 202 ? 'Accepted' : 'OK',
      latencyMs: latency,
      timestamp: new Date().toISOString(),
      data: responseData
    });

    logApiCall(selectedMethod, requestUrl, targetService, status, latency, parsedBody, responseData);
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-3xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <Network className="w-5 h-5 text-rose-400" />
              <h2 className="text-xl font-extrabold text-white">Service S5: API Gateway & REST Tester</h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                Live Reverse Proxy
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Unified reverse proxy providing route dispatching, authentication token verification, rate limiting, and centralized latency tracking.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-emerald-400 font-bold flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5" />
              JWT Auth Active
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-xs text-slate-400 font-medium whitespace-nowrap mr-1">Presets:</span>
          {samplePresets.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleApplyPreset(p)}
              className="px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-300 whitespace-nowrap transition"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="font-bold text-white text-sm flex items-center gap-2">
              <Server className="w-4 h-4 text-orange-400" />
              Compose Gateway Request
            </h3>

            <div className="flex items-center gap-2">
              <select
                value={selectedMethod}
                onChange={(e) => setSelectedMethod(e.target.value as any)}
                className="bg-slate-950 border border-slate-700 text-orange-400 font-bold font-mono text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:border-orange-500"
              >
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="PUT">PUT</option>
                <option value="DELETE">DELETE</option>
              </select>

              <input
                type="text"
                value={requestUrl}
                onChange={(e) => setRequestUrl(e.target.value)}
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs font-mono text-white focus:outline-none focus:border-orange-500"
                placeholder="/api/v1/..."
              />
            </div>

            <div className="flex items-center justify-between text-xs bg-slate-950 p-3 rounded-2xl border border-slate-800">
              <span className="text-slate-400 font-medium">Routed Upstream Service:</span>
              <select
                value={targetService}
                onChange={(e) => setTargetService(e.target.value as any)}
                className="bg-slate-900 text-white font-mono font-bold px-2 py-1 rounded border border-slate-700 text-xs focus:outline-none"
              >
                <option value="S1-Restaurant">S1 - Restaurant Service (:8081)</option>
                <option value="S2-Order">S2 - Order Service (:8082)</option>
                <option value="S3-Payment">S3 - Payment Service (:8083)</option>
                <option value="S4-Notification">S4 - Notification Service (:8084)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-semibold">JSON Request Body (Raw Payload)</span>
                {requestBody && (
                  <button onClick={() => setRequestBody('')} className="text-slate-500 hover:text-slate-300">
                    Clear
                  </button>
                )}
              </div>
              <textarea
                rows={6}
                value={requestBody}
                onChange={(e) => setRequestBody(e.target.value)}
                placeholder='{\n  "key": "value"\n}'
                className="w-full p-3 bg-slate-950 border border-slate-800 rounded-2xl text-xs font-mono text-emerald-400 focus:outline-none focus:border-orange-500 resize-none leading-relaxed"
              ></textarea>
            </div>
          </div>

          <button
            onClick={handleExecuteRequest}
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-rose-600 to-orange-600 hover:from-rose-500 hover:to-orange-500 text-white font-bold text-sm flex items-center justify-center space-x-2 shadow-lg shadow-rose-600/30 transition mt-4"
          >
            <Send className="w-4 h-4" />
            <span>Send Request through API Gateway (S5)</span>
          </button>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                Response Payload Inspector
              </h3>
              {lastResponse && (
                <div className="flex items-center space-x-2 text-xs font-mono">
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
                    HTTP {lastResponse.status} {lastResponse.statusText}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    {lastResponse.latencyMs} ms
                  </span>
                </div>
              )}
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-200 overflow-x-auto min-h-[220px] max-h-[300px]">
              <pre>{JSON.stringify(lastResponse?.data || {}, null, 2)}</pre>
            </div>
          </div>

          <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800/80 text-[11px] font-mono text-slate-400 flex items-center justify-between">
            <span>Gateway Timestamp: {lastResponse?.timestamp}</span>
            <span className="text-emerald-400 font-bold">Proxy: OK</span>
          </div>
        </div>
      </div>

      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-orange-400" />
            <h3 className="font-bold text-white text-sm">Live Service Mesh Traffic Log ({apiLogs.length})</h3>
          </div>
          <button
            onClick={clearApiLogs}
            className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Logs</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
              <tr>
                <th className="p-3.5">Time</th>
                <th className="p-3.5">Method</th>
                <th className="p-3.5">Route Path</th>
                <th className="p-3.5">Upstream Target</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5">Latency</th>
                <th className="p-3.5">Auth</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {apiLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-850/40 transition">
                  <td className="p-3.5 text-slate-500">{log.timestamp}</td>
                  <td className="p-3.5 font-bold text-orange-400">{log.method}</td>
                  <td className="p-3.5 text-white font-medium">{log.path}</td>
                  <td className="p-3.5 text-slate-400">{log.targetService}</td>
                  <td className="p-3.5">
                    <span
                      className={'px-2 py-0.5 rounded text-[10px] font-bold ' +
                        (log.statusCode < 300
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                          : 'bg-rose-950 text-rose-300 border border-rose-800')}
                    >
                      {log.statusCode}
                    </span>
                  </td>
                  <td className="p-3.5 text-slate-400">{log.latencyMs} ms</td>
                  <td className="p-3.5 text-emerald-400">PASSED</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}