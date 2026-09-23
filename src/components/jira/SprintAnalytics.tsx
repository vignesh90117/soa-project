'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import {
  TrendingUp,
  Calendar,
  Users,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  ShieldCheck
} from 'lucide-react';
import { DAILY_SCRUM_LOGS, RETROSPECTIVE_NOTES } from '@/data/mockData';

export function SprintAnalytics() {
  const { sprints } = useApp();
  const [selectedSprintId, setSelectedSprintId] = useState<string>('SPRINT-1');
  const [activeTab, setActiveTab] = useState<'BURNDOWN' | 'STANDUP' | 'RETRO' | 'DOD'>('BURNDOWN');

  const currentSprint = sprints.find((s) => s.id === selectedSprintId) || sprints[0];

  const [dodItems, setDodItems] = useState([
    { id: 1, text: 'Spring Boot REST service code implemented and formatted', checked: true },
    { id: 2, text: 'Git Pull Request reviewed and approved by peer engineer', checked: true },
    { id: 3, text: 'Unit testing completed with JUnit 5 & Mockito (>80% coverage)', checked: true },
    { id: 4, text: 'API endpoints tested in Postman for 200 OK, 400 Bad Request, 404 Not Found', checked: true },
    { id: 5, text: 'Microservice integration verified with upstream/downstream services', checked: true },
    { id: 6, text: 'Zero critical or blocker bugs remaining open in Jira', checked: true },
    { id: 7, text: 'Jira issue description, story points, and subtasks updated with evidence', checked: true },
    { id: 8, text: 'Acceptance Criteria explicitly validated against user story requirements', checked: true }
  ]);

  const toggleDod = (id: number) => {
    setDodItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, checked: !it.checked } : it))
    );
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-3xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-orange-400" />
              <h2 className="text-xl font-extrabold text-white">Sprint Metrics & Agile Ceremonies</h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                2-Week Sprints
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Sprint Planning, Burndown tracking, Daily Scrum standups, Retrospectives and Definition of Done.
            </p>
          </div>

          <div className="flex items-center space-x-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            {sprints.map((s) => (
              <button
                key={s.id}
                onClick={() => setSelectedSprintId(s.id)}
                className={'px-3.5 py-1.5 rounded-xl text-xs font-bold transition ' +
                  (selectedSprintId === s.id
                    ? 'bg-orange-600 text-white shadow-md shadow-orange-600/25'
                    : 'text-slate-400 hover:text-slate-200')}
              >
                {s.name.split(':')[0]}
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-gradient-to-r from-orange-950/30 via-amber-950/20 to-slate-950 border border-orange-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-[10px] font-mono font-bold text-orange-400 uppercase tracking-wider block">
              Sprint Goal
            </span>
            <p className="text-xs sm:text-sm font-semibold text-slate-200 mt-0.5">
              {currentSprint.goal}
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs font-mono">
            <div className="bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800">
              <span className="text-slate-400">Duration: </span>
              <span className="text-white font-bold">{currentSprint.duration}</span>
            </div>
            <div className="bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800">
              <span className="text-slate-400">Target: </span>
              <span className="text-amber-400 font-bold">{currentSprint.totalStoryPoints} SP</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex space-x-2 border-b border-slate-800 pb-2 overflow-x-auto scrollbar-none">
        {[
          { id: 'BURNDOWN', label: 'Burndown & Schedule', icon: TrendingUp },
          { id: 'STANDUP', label: 'Daily Scrum Logs (3 Questions)', icon: Users },
          { id: 'RETRO', label: 'Review & Retrospective', icon: RotateCcw },
          { id: 'DOD', label: 'Definition of Done (DoD)', icon: ShieldCheck }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={'flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition ' +
                (isActive
                  ? 'bg-slate-800 text-orange-400 border border-orange-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900')}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {activeTab === 'BURNDOWN' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-3xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                Sprint Burndown Trajectory
              </h3>
              <span className="text-xs font-mono text-emerald-400 font-bold">100% Velocity</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
              <div className="h-48 flex items-end justify-between gap-2 pt-4 px-2">
                {[
                  { day: 'D1', remaining: 19 },
                  { day: 'D2', remaining: 19 },
                  { day: 'D4', remaining: 16 },
                  { day: 'D6', remaining: 11 },
                  { day: 'D8', remaining: 6 },
                  { day: 'D9', remaining: 3 },
                  { day: 'D10', remaining: 0 }
                ].map((pt, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                    <span className="text-[10px] font-mono text-orange-400 font-bold">{pt.remaining}</span>
                    <div
                      className="w-full max-w-[28px] bg-gradient-to-t from-orange-600 to-amber-500 rounded-t-md transition-all duration-500"
                      style={{ height: `${(pt.remaining / 19) * 100}%` }}
                    ></div>
                    <span className="text-[10px] font-mono text-slate-500">{pt.day}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-center space-x-6 text-[11px] font-mono text-slate-400 pt-2 border-t border-slate-800">
                <div className="flex items-center space-x-1.5">
                  <span className="w-2.5 h-2.5 rounded bg-orange-500"></span>
                  <span>Actual Burndown</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-3xl space-y-4">
            <h3 className="font-bold text-white text-sm flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-400" />
              10-Day Activity Schedule
            </h3>
            <div className="space-y-2.5">
              {currentSprint.dailySchedule.map((act, idx) => (
                <div
                  key={idx}
                  className="flex items-start space-x-3 p-3 rounded-2xl bg-slate-950 border border-slate-800 text-xs"
                >
                  <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-mono font-bold text-[10px]">
                    {act.day}
                  </span>
                  <span className="text-slate-300 leading-relaxed font-medium">{act.activity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'STANDUP' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-blue-950/20 border border-blue-500/30 text-xs text-slate-300 leading-relaxed">
            <strong className="text-blue-300">Daily Scrum Standard:</strong> Each team member answers 3 core questions every morning (15 minutes timeboxed):
            (1) What did I complete yesterday? (2) What will I work on today? (3) Are there any blockers?
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {DAILY_SCRUM_LOGS.map((log, idx) => (
              <div
                key={idx}
                className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 space-y-3"
              >
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <h4 className="font-bold text-white text-sm">{log.developer}</h4>
                  <span className="text-[10px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                    {log.role}
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block">
                      1. What I completed yesterday:
                    </span>
                    <p className="text-slate-300 mt-0.5">{log.yesterday}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 block">
                      2. What I will work on today:
                    </span>
                    <p className="text-slate-300 mt-0.5">{log.today}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block">
                      3. Blockers / Impediments:
                    </span>
                    <p className="text-slate-300 mt-0.5">{log.blockers}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'RETRO' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-900/80 border border-emerald-500/30 rounded-3xl p-5 space-y-3">
              <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4" />
                <span>What Went Well</span>
              </div>
              <div className="space-y-2">
                {RETROSPECTIVE_NOTES.filter((n) => n.category === 'WENT_WELL').map((item, idx) => (
                  <div key={idx} className="p-3 rounded-2xl bg-emerald-950/20 border border-emerald-500/20 text-xs text-slate-300">
                    <p className="leading-relaxed">{item.content}</p>
                    <span className="text-[10px] font-mono text-emerald-400 mt-2 block">— {item.author}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-900/80 border border-rose-500/30 rounded-3xl p-5 space-y-3">
              <div className="flex items-center space-x-2 text-rose-400 font-bold text-xs uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4" />
                <span>What Didn't Go Well</span>
              </div>
              <div className="space-y-2">
                {RETROSPECTIVE_NOTES.filter((n) => n.category === 'PAINS').map((item, idx) => (
                  <div key={idx} className="p-3 rounded-2xl bg-rose-950/20 border border-rose-500/20 text-xs text-slate-300">
                    <p className="leading-relaxed">{item.content}</p>
                    <span className="text-[10px] font-mono text-rose-400 mt-2 block">— {item.author}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-900/80 border border-blue-500/30 rounded-3xl p-5 space-y-3">
              <div className="flex items-center space-x-2 text-blue-400 font-bold text-xs uppercase tracking-wider">
                <RotateCcw className="w-4 h-4" />
                <span>Action Items for Next Sprint</span>
              </div>
              <div className="space-y-2">
                {RETROSPECTIVE_NOTES.filter((n) => n.category === 'ACTION_ITEMS').map((item, idx) => (
                  <div key={idx} className="p-3 rounded-2xl bg-blue-950/20 border border-blue-500/20 text-xs text-slate-300">
                    <p className="leading-relaxed">{item.content}</p>
                    <span className="text-[10px] font-mono text-blue-400 mt-2 block">— {item.author}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'DOD' && (
        <div className="bg-slate-900/80 border border-slate-800 p-6 sm:p-8 rounded-3xl space-y-6">
          <div className="space-y-2">
            <h3 className="font-extrabold text-white text-lg flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              Definition of Done (DoD) Quality Gate
            </h3>
            <p className="text-xs text-slate-400">
              In Agile Scrum, <strong>Done ≠ Code Written</strong>. A story is only Done when all quality gates and acceptance criteria pass.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center font-mono text-xs text-emerald-400 font-bold">
            Done = Developed + Tested + Peer Reviewed + Acceptance Criteria Satisfied
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {dodItems.map((item) => (
              <div
                key={item.id}
                onClick={() => toggleDod(item.id)}
                className={'p-4 rounded-2xl border transition cursor-pointer flex items-center space-x-3 ' +
                  (item.checked
                    ? 'bg-emerald-950/20 border-emerald-500/40 text-slate-200'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700')}
              >
                <div
                  className={'w-5 h-5 rounded-md flex items-center justify-center border flex-shrink-0 ' +
                    (item.checked ? 'bg-emerald-500 border-emerald-400 text-white' : 'border-slate-700')}
                >
                  {item.checked && <CheckCircle2 className="w-3.5 h-3.5" />}
                </div>
                <span className="text-xs font-medium leading-relaxed">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}