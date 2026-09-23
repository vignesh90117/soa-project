'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import {
  ListTodo,
  Layers,
  ChevronRight
} from 'lucide-react';

export function BacklogView() {
  const { epics, issues, setSelectedIssueForModal } = useApp();
  const [selectedEpic, setSelectedEpic] = useState<string>('All');

  const totalPoints = issues.reduce((acc, curr) => acc + curr.storyPoints, 0);
  const donePoints = issues
    .filter((i) => i.status === 'DONE')
    .reduce((acc, curr) => acc + curr.storyPoints, 0);

  const filteredIssues = issues.filter(
    (i) => selectedEpic === 'All' || i.epicKey === selectedEpic
  );

  return (
    <div className="space-y-6">
      <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-3xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <Layers className="w-5 h-5 text-orange-400" />
              <h2 className="text-xl font-extrabold text-white">Epics & Product Backlog</h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-orange-500/20 text-orange-400 border border-orange-500/30">
                5 Epics Defined
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              High-level strategic initiatives mapping business capabilities to SOA decoupled microservices.
            </p>
          </div>

          <div className="flex items-center space-x-4 bg-slate-950 px-4 py-3 rounded-2xl border border-slate-800">
            <div>
              <p className="text-[10px] text-slate-400 font-mono">Total Points</p>
              <p className="text-lg font-bold text-white font-mono">{totalPoints} SP</p>
            </div>
            <div className="h-8 w-px bg-slate-800"></div>
            <div>
              <p className="text-[10px] text-slate-400 font-mono">Completed</p>
              <p className="text-lg font-bold text-emerald-400 font-mono">{donePoints} SP ({Math.round((donePoints / totalPoints) * 100)}%)</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 pt-2">
          {epics.map((epic) => {
            const epicIssues = issues.filter((i) => i.epicKey === epic.key);
            const epicPoints = epicIssues.reduce((acc, curr) => acc + curr.storyPoints, 0);
            const isSelected = selectedEpic === epic.key;

            return (
              <div
                key={epic.key}
                onClick={() => setSelectedEpic(isSelected ? 'All' : epic.key)}
                className={'p-4 rounded-2xl border transition cursor-pointer flex flex-col justify-between ' +
                  (isSelected
                    ? 'bg-slate-850 border-orange-500 ring-2 ring-orange-500/20 shadow-lg'
                    : 'bg-slate-950/80 border-slate-800 hover:border-slate-700')}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={'px-2 py-0.5 rounded text-[10px] font-bold border ' + epic.color}>
                      {epic.key}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">{epicPoints} SP</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-100">{epic.name}</h4>
                  <p className="text-[10px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {epic.description}
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-800/80 text-[10px] font-mono text-slate-500 truncate">
                  {epic.targetService}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center space-x-2">
            <ListTodo className="w-4 h-4 text-orange-400" />
            <h3 className="font-bold text-white text-sm">Product Backlog Items ({filteredIssues.length})</h3>
          </div>
          {selectedEpic !== 'All' && (
            <button
              onClick={() => setSelectedEpic('All')}
              className="text-xs text-orange-400 hover:underline"
            >
              Clear Filter ({selectedEpic})
            </button>
          )}
        </div>

        <div className="divide-y divide-slate-800/80">
          {filteredIssues.map((issue) => {
            const epic = epics.find((e) => e.key === issue.epicKey);
            return (
              <div
                key={issue.id}
                onClick={() => setSelectedIssueForModal(issue)}
                className="p-4 sm:px-6 hover:bg-slate-850/50 transition cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex items-start sm:items-center space-x-3">
                  <span className="font-mono text-xs font-bold text-orange-400 w-16">
                    {issue.id}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={'px-2 py-0.5 rounded text-[9px] font-bold border ' + (epic ? epic.color : '')}>
                        {epic ? epic.key : ''}
                      </span>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-100 hover:text-orange-300 transition">
                        {issue.summary}
                      </h4>
                    </div>
                    {issue.userStoryStatement && (
                      <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">
                        As a {issue.userStoryStatement.asA}, I want {issue.userStoryStatement.iWant}...
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-3 self-end sm:self-center">
                  <span className="text-[11px] font-mono font-bold text-slate-400 bg-slate-950 px-2 py-1 rounded-lg border border-slate-800">
                    {issue.sprint}
                  </span>
                  <span className="text-xs font-mono font-bold text-amber-400 bg-amber-950/40 border border-amber-800 px-2 py-1 rounded-lg">
                    {issue.storyPoints} SP
                  </span>
                  <span className="text-xs px-2.5 py-1 rounded-lg font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                    {issue.status}
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}