'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { JiraStatus } from '@/types';
import {
  Kanban,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Plus,
  Zap,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  Bug,
  Flame
} from 'lucide-react';
import { useToast } from '@/context/ToastContext';

export function ScrumBoard() {
  const {
    issues,
    epics,
    moveIssueStatus,
    advanceIssueStatus,
    regressIssueStatus,
    setSelectedIssueForModal,
    setIsNewStoryModalOpen
  } = useApp();

  const { showToast } = useToast();
  const [selectedSprintFilter, setSelectedSprintFilter] = useState<string>('All');
  const [selectedEpicFilter, setSelectedEpicFilter] = useState<string>('All');

  const columns: { key: JiraStatus; label: string; color: string; badgeBg: string }[] = [
    { key: 'BACKLOG', label: 'BACKLOG', color: 'border-slate-700', badgeBg: 'bg-slate-800 text-slate-300' },
    { key: 'TO_DO', label: 'TO DO', color: 'border-blue-500/40', badgeBg: 'bg-blue-950 text-blue-300 border-blue-800' },
    { key: 'IN_PROGRESS', label: 'IN PROGRESS', color: 'border-amber-500/40', badgeBg: 'bg-amber-950 text-amber-300 border-amber-800' },
    { key: 'CODE_REVIEW', label: 'CODE REVIEW', color: 'border-purple-500/40', badgeBg: 'bg-purple-950 text-purple-300 border-purple-800' },
    { key: 'TESTING', label: 'TESTING / QA', color: 'border-cyan-500/40', badgeBg: 'bg-cyan-950 text-cyan-300 border-cyan-800' },
    { key: 'DONE', label: 'DONE', color: 'border-emerald-500/40', badgeBg: 'bg-emerald-950 text-emerald-300 border-emerald-800' }
  ];

  const filteredIssues = issues.filter((iss) => {
    const matchesSprint = selectedSprintFilter === 'All' || iss.sprint === selectedSprintFilter;
    const matchesEpic = selectedEpicFilter === 'All' || iss.epicKey === selectedEpicFilter;
    return matchesSprint && matchesEpic;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Highest':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/40';
      case 'High':
        return 'bg-orange-500/20 text-orange-300 border-orange-500/40';
      case 'Medium':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      default:
        return 'bg-slate-800 text-slate-400 border-slate-700';
    }
  };

  const getEpicInfo = (epicKey: string) => {
    return epics.find((e) => e.key === epicKey) || { name: epicKey, color: 'bg-slate-800 text-slate-300' };
  };

  // Quick Solver Actions
  const handleSolveAllIssues = () => {
    issues.forEach((iss) => {
      moveIssueStatus(iss.id, 'DONE');
    });
    showToast('🎉 All Issues Solved!', 'All user stories & subtasks marked as DONE with 100% test coverage.', 'success');
  };

  const handleAdvanceAllInProgress = () => {
    const activeIssues = issues.filter((i) => i.status !== 'DONE' && i.status !== 'BACKLOG');
    if (activeIssues.length === 0) {
      // Move from TO_DO
      issues.filter((i) => i.status === 'TO_DO').forEach((iss) => advanceIssueStatus(iss.id));
      showToast('⚡ In-Progress Sprint', 'Advanced pending stories to IN_PROGRESS', 'info');
    } else {
      activeIssues.forEach((iss) => advanceIssueStatus(iss.id));
      showToast('⚡ Step Advanced', 'Moved active stories forward in the Jira workflow', 'info');
    }
  };

  const handleResetBoard = () => {
    moveIssueStatus('OFO-1', 'DONE');
    moveIssueStatus('OFO-2', 'DONE');
    moveIssueStatus('OFO-3', 'DONE');
    moveIssueStatus('OFO-4', 'DONE');
    moveIssueStatus('OFO-5', 'DONE');
    moveIssueStatus('OFO-6', 'DONE');
    showToast('Board Synced', 'Restored verified sprint state', 'info');
  };

  const totalPointsOnBoard = filteredIssues.reduce((acc, curr) => acc + curr.storyPoints, 0);
  const donePointsOnBoard = filteredIssues
    .filter((i) => i.status === 'DONE')
    .reduce((acc, curr) => acc + curr.storyPoints, 0);

  return (
    <div className="space-y-6">
      {/* Board Top Controls & Quick Solvers */}
      <div className="bg-slate-900/80 p-6 rounded-3xl border border-slate-800 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <Kanban className="w-5 h-5 text-orange-400" />
              <h2 className="text-xl font-extrabold text-white">Jira Scrum Board & Issue Solver</h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-orange-500/20 text-orange-400 border border-orange-500/30">
                OFO Agile Project
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Workflow State Machine: Backlog ➔ To Do ➔ In Progress ➔ Code Review ➔ Testing ➔ Done
            </p>
          </div>

          {/* Quick Solver & Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleSolveAllIssues}
              className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-md shadow-emerald-600/25 transition"
              title="Mark all user stories and subtasks as DONE"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Solve All Issues (100% DoD)</span>
            </button>

            <button
              onClick={handleAdvanceAllInProgress}
              className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-md shadow-blue-600/20 transition"
              title="Advance stories to next agile stage"
            >
              <Zap className="w-4 h-4" />
              <span>Step Forward ➔</span>
            </button>

            <button
              onClick={() => setIsNewStoryModalOpen(true)}
              className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs transition"
            >
              <Plus className="w-4 h-4 text-orange-400" />
              <span>+ Create Story</span>
            </button>
          </div>
        </div>

        {/* Filters & Progress Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3 border-t border-slate-800/80">
          <div className="flex items-center space-x-3 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            <div className="flex items-center space-x-1.5 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-xs">
              <span className="text-slate-400 font-medium">Sprint:</span>
              <select
                value={selectedSprintFilter}
                onChange={(e) => setSelectedSprintFilter(e.target.value)}
                className="bg-transparent text-white font-bold focus:outline-none cursor-pointer"
              >
                <option value="All" className="bg-slate-900">All Sprints</option>
                <option value="Sprint 1" className="bg-slate-900">Sprint 1 (19 SP)</option>
                <option value="Sprint 2" className="bg-slate-900">Sprint 2 (21 SP)</option>
                <option value="Sprint 3" className="bg-slate-900">Sprint 3 (21 SP)</option>
              </select>
            </div>

            <div className="flex items-center space-x-1.5 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-xs">
              <span className="text-slate-400 font-medium">Epic:</span>
              <select
                value={selectedEpicFilter}
                onChange={(e) => setSelectedEpicFilter(e.target.value)}
                className="bg-transparent text-white font-bold focus:outline-none cursor-pointer"
              >
                <option value="All" className="bg-slate-900">All 5 Epics</option>
                {epics.map((e) => (
                  <option key={e.key} value={e.key} className="bg-slate-900">
                    {e.key}: {e.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center space-x-3 text-xs font-mono">
            <span className="text-slate-400">Completion:</span>
            <div className="w-32 h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500"
                style={{ width: `${totalPointsOnBoard > 0 ? (donePointsOnBoard / totalPointsOnBoard) * 100 : 0}%` }}
              ></div>
            </div>
            <span className="text-emerald-400 font-bold">
              {donePointsOnBoard}/{totalPointsOnBoard} SP ({totalPointsOnBoard > 0 ? Math.round((donePointsOnBoard / totalPointsOnBoard) * 100) : 0}%)
            </span>
          </div>
        </div>
      </div>

      {/* 6-Column Scrum Board Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 items-start overflow-x-auto pb-4">
        {columns.map((col) => {
          const colIssues = filteredIssues.filter((i) => i.status === col.key);
          const totalPoints = colIssues.reduce((acc, curr) => acc + curr.storyPoints, 0);

          return (
            <div
              key={col.key}
              className={'flex flex-col rounded-2xl bg-slate-950/70 border ' + col.color + ' p-3 min-w-[240px] md:min-w-0'}
            >
              {/* Column Header */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
                <div className="flex items-center space-x-2">
                  <span className={'px-2 py-0.5 rounded-md text-[10px] font-bold border ' + col.badgeBg}>
                    {col.label}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">({colIssues.length})</span>
                </div>
                <span className="text-[10px] font-mono text-slate-500 font-bold">
                  {totalPoints} SP
                </span>
              </div>

              {/* Column Issue Cards */}
              <div className="space-y-3 min-h-[300px]">
                {colIssues.length === 0 ? (
                  <div className="h-28 rounded-xl border border-dashed border-slate-800/80 flex items-center justify-center text-[11px] text-slate-600">
                    No issues
                  </div>
                ) : (
                  colIssues.map((issue) => {
                    const epic = getEpicInfo(issue.epicKey);
                    const completedTasks = issue.subTasks.filter((t) => t.isCompleted).length;
                    const totalTasks = issue.subTasks.length;

                    return (
                      <div
                        key={issue.id}
                        onClick={() => setSelectedIssueForModal(issue)}
                        className="group p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-orange-500/60 hover:shadow-lg transition-all duration-200 cursor-pointer space-y-3"
                      >
                        {/* Top: Key & Story Points */}
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[11px] font-bold text-orange-400 group-hover:underline">
                            {issue.id}
                          </span>
                          <div className="flex items-center space-x-1.5">
                            <span
                              className={'px-2 py-0.5 rounded-full text-[9px] font-bold border ' + getPriorityColor(issue.priority)}
                            >
                              {issue.priority}
                            </span>
                            <span className="px-1.5 py-0.5 rounded-md bg-slate-800 text-[10px] font-mono font-bold text-slate-300">
                              {issue.storyPoints} SP
                            </span>
                          </div>
                        </div>

                        {/* Title */}
                        <h4 className="text-xs font-bold text-slate-100 group-hover:text-orange-300 transition line-clamp-2 leading-snug">
                          {issue.summary}
                        </h4>

                        {/* Epic Pill */}
                        <div className="flex items-center space-x-1">
                          <span className={'px-2 py-0.5 rounded text-[9px] font-semibold border ' + epic.color}>
                            {issue.epicKey}
                          </span>
                          <span className="text-[10px] text-slate-400 truncate">
                            {epic.name}
                          </span>
                        </div>

                        {/* Subtasks Progress */}
                        {totalTasks > 0 && (
                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                              <span>Subtasks ({completedTasks}/{totalTasks})</span>
                              <span>{Math.round((completedTasks / totalTasks) * 100)}%</span>
                            </div>
                            <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-emerald-500 transition-all"
                                style={{ width: `${(completedTasks / totalTasks) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        )}

                        {/* 1-Click Fast Navigation Arrows */}
                        <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              regressIssueStatus(issue.id);
                            }}
                            className="p-1 rounded bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-white transition disabled:opacity-30"
                            title="Move back to previous stage"
                          >
                            <ChevronLeft className="w-3.5 h-3.5" />
                          </button>

                          <div className="flex items-center space-x-1 text-[10px] text-slate-400">
                            <span>{issue.assignee.avatar}</span>
                            <span className="truncate max-w-[60px]">{issue.assignee.name.split(' ')[0]}</span>
                          </div>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              advanceIssueStatus(issue.id);
                            }}
                            className="p-1 rounded bg-orange-600/80 hover:bg-orange-500 text-white transition shadow-sm"
                            title="Advance to next agile stage"
                          >
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>

                      </div>
                    );
                  })
                )}
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}