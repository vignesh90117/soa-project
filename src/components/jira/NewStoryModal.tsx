'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { X, Plus, Sparkles, ShieldCheck } from 'lucide-react';

export function NewStoryModal() {
  const { isNewStoryModalOpen, setIsNewStoryModalOpen, addNewIssue, epics } = useApp();

  const [summary, setSummary] = useState('');
  const [epicKey, setEpicKey] = useState<'E1' | 'E2' | 'E3' | 'E4' | 'E5'>('E1');
  const [asA, setAsA] = useState('customer');
  const [iWant, setIWant] = useState('to filter dishes by spice level');
  const [soThat, setSoThat] = useState('I can choose food matching my taste preferences');
  const [storyPoints, setStoryPoints] = useState<number>(3);
  const [priority, setPriority] = useState<'Highest' | 'High' | 'Medium' | 'Low'>('High');

  if (!isNewStoryModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!summary.trim()) {
      alert('Please enter a user story summary.');
      return;
    }

    addNewIssue({
      summary,
      epicKey,
      userStoryStatement: { asA, iWant, soThat },
      storyPoints,
      priority,
      acceptanceCriteria: [
        'User can select desired filter options on frontend UI.',
        'API returns filtered results with HTTP 200 OK within 200ms.',
        'Edge cases (zero results found) display friendly empty state.'
      ]
    });

    setSummary('');
    setIsNewStoryModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        
        <div className="p-5 border-b border-slate-800 bg-slate-950/70 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="w-8 h-8 rounded-xl bg-orange-600/20 text-orange-400 flex items-center justify-center font-bold text-sm">
              ✨
            </span>
            <div>
              <h3 className="font-bold text-white text-base">Create Jira User Story</h3>
              <p className="text-[11px] text-slate-400">Add requirement to Product Backlog & Scrum Board</p>
            </div>
          </div>

          <button
            onClick={() => setIsNewStoryModalOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">
              Story Summary / Title *
            </label>
            <input
              type="text"
              required
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="e.g. US-07: Filter Menu by Dietary Restrictions"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-orange-500 font-medium"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Target Epic</label>
              <select
                value={epicKey}
                onChange={(e) => setEpicKey(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-orange-500 font-medium cursor-pointer"
              >
                {epics.map((e) => (
                  <option key={e.key} value={e.key}>
                    {e.key}: {e.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Story Points (Fibonacci)</label>
              <select
                value={storyPoints}
                onChange={(e) => setStoryPoints(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-amber-400 font-mono font-bold focus:outline-none focus:border-orange-500 cursor-pointer"
              >
                {[1, 2, 3, 5, 8, 13].map((pt) => (
                  <option key={pt} value={pt}>
                    {pt} Story Points
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5">
            <span className="text-[10px] font-bold text-orange-400 uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Standard Agile Formula
            </span>

            <div>
              <label className="text-[11px] text-slate-400 block mb-0.5">As a [User Persona]</label>
              <input
                type="text"
                value={asA}
                onChange={(e) => setAsA(e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white"
              />
            </div>

            <div>
              <label className="text-[11px] text-slate-400 block mb-0.5">I want [Functionality]</label>
              <input
                type="text"
                value={iWant}
                onChange={(e) => setIWant(e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white"
              />
            </div>

            <div>
              <label className="text-[11px] text-slate-400 block mb-0.5">So that [Business Benefit]</label>
              <input
                type="text"
                value={soThat}
                onChange={(e) => setSoThat(e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white"
              />
            </div>
          </div>

          <div className="pt-2 flex items-center justify-end space-x-2">
            <button
              type="button"
              onClick={() => setIsNewStoryModalOpen(false)}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center space-x-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold text-xs shadow-md shadow-orange-600/25"
            >
              <Plus className="w-4 h-4" />
              <span>Create Issue</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}