'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { JiraStatus } from '@/types';
import {
  X,
  CheckSquare,
  Square,
  Sparkles,
  Code2,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export function StoryDetailModal() {
  const {
    selectedIssueForModal,
    setSelectedIssueForModal,
    moveIssueStatus,
    toggleSubTask,
    epics
  } = useApp();

  if (!selectedIssueForModal) return null;

  const epic = epics.find((e) => e.key === selectedIssueForModal.epicKey);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col animate-in fade-in zoom-in-95 duration-200">
        
        <div className="p-6 border-b border-slate-800 bg-slate-950/70 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-orange-600/20 text-orange-400 border border-orange-500/30 flex items-center justify-center font-mono font-extrabold text-sm">
              {selectedIssueForModal.id}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  {selectedIssueForModal.type}
                </span>
                <span className={'px-2 py-0.5 rounded text-[10px] font-semibold border ' + (epic ? epic.color : '')}>
                  {epic ? epic.key + ': ' + epic.name : ''}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {selectedIssueForModal.sprint}
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white mt-1">
                {selectedIssueForModal.summary}
              </h2>
            </div>
          </div>

          <button
            onClick={() => setSelectedIssueForModal(null)}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {selectedIssueForModal.userStoryStatement && (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-orange-950/40 via-amber-950/30 to-slate-900 border border-orange-500/20 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-orange-400 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Agile User Story Format
              </span>
              <p className="text-sm text-slate-200 leading-relaxed font-sans">
                <strong className="text-orange-400 font-bold">As a</strong> {selectedIssueForModal.userStoryStatement.asA},{' '}
                <strong className="text-orange-400 font-bold">I want</strong> {selectedIssueForModal.userStoryStatement.iWant},{' '}
                <strong className="text-orange-400 font-bold">so that</strong> {selectedIssueForModal.userStoryStatement.soThat}.
              </p>
            </div>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-[10px] text-slate-400 font-medium block">Priority</span>
              <span className="text-xs font-bold text-rose-400">{selectedIssueForModal.priority}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-[10px] text-slate-400 font-medium block">Story Points</span>
              <span className="text-xs font-mono font-bold text-amber-400">{selectedIssueForModal.storyPoints} SP</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-[10px] text-slate-400 font-medium block">Status</span>
              <select
                value={selectedIssueForModal.status}
                onChange={(e) => moveIssueStatus(selectedIssueForModal.id, e.target.value as JiraStatus)}
                className="bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded px-1.5 py-0.5 mt-0.5 w-full focus:outline-none focus:border-orange-500 font-semibold"
              >
                <option value="BACKLOG">Backlog</option>
                <option value="TO_DO">To Do</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="CODE_REVIEW">Code Review</option>
                <option value="TESTING">Testing / QA</option>
                <option value="DONE">Done</option>
              </select>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-[10px] text-slate-400 font-medium block">Assignee</span>
              <span className="text-xs font-bold text-slate-200 flex items-center gap-1 mt-0.5">
                <span>{selectedIssueForModal.assignee.avatar}</span>
                <span className="truncate">{selectedIssueForModal.assignee.name}</span>
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Acceptance Criteria (Definition of Done)
            </h4>
            <div className="space-y-2">
              {selectedIssueForModal.acceptanceCriteria.map((crit, idx) => (
                <div
                  key={idx}
                  className="flex items-start space-x-3 p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 text-xs text-slate-300"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span className="leading-relaxed">{crit}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Code2 className="w-4 h-4 text-blue-400" />
                Technical Engineering Subtasks ({selectedIssueForModal.subTasks.length})
              </span>
              <span className="text-[11px] font-mono text-slate-400 font-normal">
                {selectedIssueForModal.subTasks.filter((t) => t.isCompleted).length} of {selectedIssueForModal.subTasks.length} Done
              </span>
            </h4>

            <div className="space-y-2">
              {selectedIssueForModal.subTasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => toggleSubTask(selectedIssueForModal.id, task.id)}
                  className={'flex items-center justify-between p-3 rounded-xl border transition cursor-pointer ' +
                    (task.isCompleted
                      ? 'bg-emerald-950/20 border-emerald-500/30 text-slate-300'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700')}
                >
                  <div className="flex items-center space-x-3">
                    {task.isCompleted ? (
                      <CheckSquare className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-600 flex-shrink-0" />
                    )}
                    <div>
                      <span className="font-mono text-[11px] font-bold text-orange-400 mr-2">
                        {task.id}
                      </span>
                      <span className={'text-xs font-medium ' + (task.isCompleted ? 'line-through text-slate-400' : 'text-slate-200')}>
                        {task.summary}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 text-[10px] font-mono text-slate-400">
                    <span>{task.assignee}</span>
                    <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">{task.estimatedHours}h</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {selectedIssueForModal.samplePayload && (
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Code2 className="w-4 h-4 text-purple-400" />
                Sample API Request / Contract
              </h4>
              <pre className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-emerald-400 overflow-x-auto">
                {selectedIssueForModal.samplePayload}
              </pre>
            </div>
          )}

        </div>

        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-mono">
            Key: {selectedIssueForModal.id} • Target: {epic ? epic.targetService : ''}
          </span>
          <button
            onClick={() => setSelectedIssueForModal(null)}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition"
          >
            Close Story
          </button>
        </div>

      </div>
    </div>
  );
}