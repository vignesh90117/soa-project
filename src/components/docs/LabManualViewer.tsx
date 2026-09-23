'use client';

import React, { useState } from 'react';
import {
  FileText,
  Copy,
  Check,
  Download,
  ExternalLink,
  Layers,
  Sparkles,
  BookOpen,
  CheckCircle2,
  ListTodo
} from 'lucide-react';

export function LabManualViewer() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(document.getElementById('report-content')?.innerText || '');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/80 p-6 rounded-3xl border border-slate-800">
        <div>
          <div className="flex items-center space-x-2">
            <BookOpen className="w-5 h-5 text-orange-400" />
            <h2 className="text-xl font-extrabold text-white">Agile SOA Practical Lab Manual & Report</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Experiment: Implement Agile Practices for an SOA-Based Food Ordering System using Jira
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleCopy}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied!' : 'Copy Full Markdown'}</span>
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs shadow-md shadow-orange-600/20 transition"
          >
            <Download className="w-4 h-4" />
            <span>Print / PDF Export</span>
          </button>
        </div>
      </div>

      {/* 14 Sections Printable Document */}
      <div
        id="report-content"
        className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-10 space-y-8 text-slate-200 text-sm leading-relaxed shadow-2xl"
      >
        
        {/* Title */}
        <div className="border-b border-slate-800 pb-6 space-y-2">
          <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-orange-500/20 text-orange-400 border border-orange-500/30">
            Jira Agile Lab Record
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Practical Exercise: Implement Agile Practices for an SOA-Based Food Ordering System using Jira
          </h1>
          <p className="text-xs text-slate-400">
            Comprehensive breakdown of 5 SOA microservices, Epics, User Stories, Sprints, Daily Scrum, Review, Retrospective, and Definition of Done.
          </p>
        </div>

        {/* 1. Architecture */}
        <section className="space-y-3">
          <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
            <span className="text-orange-400">1.</span> SOA System Architecture & Services
          </h3>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-300">
            <li><strong>S1 - Restaurant Service:</strong> Manages restaurants, menus, item availability, and categories.</li>
            <li><strong>S2 - Order Service:</strong> Manages cart, creates orders, computes prices, and handles order lifecycle.</li>
            <li><strong>S3 - Payment Service:</strong> Manages payment processing, verifies funds, and records transactions.</li>
            <li><strong>S4 - Notification Service:</strong> Dispatches real-time order alerts across SMS, Push, and Email.</li>
            <li><strong>S5 - API Gateway:</strong> Single entry point providing reverse routing, JWT security, and rate limiting.</li>
          </ul>
        </section>

        {/* 2. 5 Epics */}
        <section className="space-y-3">
          <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
            <span className="text-orange-400">2.</span> Epics in Jira
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono border border-slate-800 rounded-xl overflow-hidden">
              <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="p-3">Epic Key</th>
                  <th className="p-3">Epic Name</th>
                  <th className="p-3">Description</th>
                  <th className="p-3">Target Service</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                <tr><td className="p-3 font-bold text-orange-400">E1</td><td className="p-3">Restaurant Management</td><td className="p-3">Manage restaurant and menu information</td><td className="p-3">S1 - Restaurant Service</td></tr>
                <tr><td className="p-3 font-bold text-orange-400">E2</td><td className="p-3">Order Management</td><td className="p-3">Create and track customer food orders</td><td className="p-3">S2 - Order Service</td></tr>
                <tr><td className="p-3 font-bold text-orange-400">E3</td><td className="p-3">Payment Management</td><td className="p-3">Process and reconcile digital payments</td><td className="p-3">S3 - Payment Service</td></tr>
                <tr><td className="p-3 font-bold text-orange-400">E4</td><td className="p-3">Notification</td><td className="p-3">Notify customers about order status</td><td className="p-3">S4 - Notification Service</td></tr>
                <tr><td className="p-3 font-bold text-orange-400">E5</td><td className="p-3">API Gateway</td><td className="p-3">Provide a common entry point to services</td><td className="p-3">S5 - API Gateway</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 3. User Stories */}
        <section className="space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
            <span className="text-orange-400">3.</span> User Stories with Acceptance Criteria
          </h3>
          
          <div className="space-y-3">
            {[
              {
                id: 'US-01',
                title: 'View Restaurants (Epic E1)',
                story: 'As a customer, I want to view available restaurants so that I can select a restaurant for ordering.',
                criteria: ['Customer can request the list of restaurants.', 'Restaurant name and location are displayed.', 'API returns HTTP 200 for a successful request.']
              },
              {
                id: 'US-02',
                title: 'View Menu (Epic E1)',
                story: 'As a customer, I want to view a restaurant\'s menu so that I can select food items.',
                criteria: ['Items categorized into Starters, Mains, Desserts.', 'Price, Veg indicator, and availability shown.', 'HTTP 404 on missing restaurant ID.']
              },
              {
                id: 'US-03',
                title: 'Create Order (Epic E2)',
                story: 'As a customer, I want to place an order so that I can purchase food from a restaurant.',
                criteria: ['Customer provides userId, restaurantId, and items.', 'Order is stored successfully with initial state.', 'Unique Order ID is returned with HTTP 201 Created.']
              },
              {
                id: 'US-04',
                title: 'Make Payment (Epic E3)',
                story: 'As a customer, I want to make payment for my order so that my order can be confirmed.',
                criteria: ['Payment service receives order ID and amount.', 'Payment is validated via gateway.', 'Successful payment changes order status to CONFIRMED.']
              },
              {
                id: 'US-05',
                title: 'Receive Order Notification (Epic E4)',
                story: 'As a customer, I want to receive a notification when my order is confirmed so that I know it was accepted.',
                criteria: ['Triggered on order state transition event.', 'Dispatches multi-channel notification (Push/SMS).', 'Audit log saved in database.']
              },
              {
                id: 'US-06',
                title: 'Access Services via API Gateway (Epic E5)',
                story: 'As a system user, I want to access SOA services through a common API Gateway so that clients don\'t need individual service URLs.',
                criteria: ['Routes /restaurants, /orders, /payments to respective services.', 'Enforces JWT token validation filter.', 'Unified CORS and Rate Limiting.']
              }
            ].map((u) => (
              <div key={u.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-orange-400">{u.id}: {u.title}</span>
                </div>
                <p className="text-xs italic text-slate-300">"{u.story}"</p>
                <div className="space-y-1 pt-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Acceptance Criteria:</span>
                  <ul className="list-disc pl-4 text-xs text-slate-400 space-y-0.5">
                    {u.criteria.map((c, i) => <li key={i}>{c}</li>)}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Task Breakdown */}
        <section className="space-y-3">
          <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
            <span className="text-orange-400">4.</span> Technical Task Breakdown for US-03 (Create Order)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
            {[
              { id: 'T-01', desc: 'Create Spring Boot Order Service scaffold' },
              { id: 'T-02', desc: 'Create Order & OrderItem JPA entity' },
              { id: 'T-03', desc: 'Create Spring Data OrderRepository' },
              { id: 'T-04', desc: 'Create OrderController REST endpoints' },
              { id: 'T-05', desc: 'Implement POST /orders endpoint logic' },
              { id: 'T-06', desc: 'Connect Order Service with Restaurant Service (Feign)' },
              { id: 'T-07', desc: 'Test APIs using Postman automated suite' },
              { id: 'T-08', desc: 'Update Jira story with test results & logs' }
            ].map((t) => (
              <div key={t.id} className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center space-x-2">
                <span className="text-orange-400 font-bold">{t.id}</span>
                <span className="text-slate-300 font-sans">{t.desc}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Sprint Planning */}
        <section className="space-y-3">
          <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
            <span className="text-orange-400">5.</span> Sprint Plans (3 Sprints x 2 Weeks)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
              <span className="font-bold text-orange-400 block">Sprint 1 (19 SP)</span>
              <p className="text-slate-400">Goal: Restaurant & Order Core Services</p>
              <p className="text-slate-500 font-mono text-[11px]">US-01 (3) + US-02 (5) + US-03 (8) + Testing (3)</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
              <span className="font-bold text-orange-400 block">Sprint 2 (21 SP)</span>
              <p className="text-slate-400">Goal: Payment & Notification Services</p>
              <p className="text-slate-500 font-mono text-[11px]">US-04 (8) + US-05 (5) + Integration (5) + Bugs (3)</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
              <span className="font-bold text-orange-400 block">Sprint 3 (21 SP)</span>
              <p className="text-slate-400">Goal: API Gateway & E2E Integration</p>
              <p className="text-slate-500 font-mono text-[11px]">US-06 (5) + Integration (5) + E2E (5) + Doc (3) + Bugs (3)</p>
            </div>
          </div>
        </section>

        {/* 6. Definition of Done */}
        <section className="space-y-3">
          <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
            <span className="text-orange-400">6.</span> Definition of Done (DoD)
          </h3>
          <p className="text-xs text-slate-300">
            A Jira story is only marked <strong>DONE</strong> when it meets all quality gates:
          </p>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-emerald-400 font-bold text-center">
            Done = Developed + Tested + Reviewed + Acceptance Criteria Satisfied
          </div>
        </section>

      </div>
    </div>
  );
}
