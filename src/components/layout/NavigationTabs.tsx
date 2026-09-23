'use client';

import React from 'react';
import { useApp, ActiveAppView } from '@/context/AppContext';
import {
  UtensilsCrossed,
  Kanban,
  ListTodo,
  TrendingUp,
  Network,
  FileCode2
} from 'lucide-react';

interface TabItem {
  id: ActiveAppView;
  label: string;
  badge?: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

export function NavigationTabs() {
  const { activeView, setActiveView } = useApp();

  const tabs: TabItem[] = [
    {
      id: 'food-app',
      label: 'Food Ordering App',
      badge: 'SOA Demo',
      icon: UtensilsCrossed,
      description: 'S1-S4 Live Services Demo'
    },
    {
      id: 'jira-board',
      label: 'Jira Scrum Board',
      badge: 'Active Sprint',
      icon: Kanban,
      description: 'Interactive Kanban & Subtasks'
    },
    {
      id: 'jira-backlog',
      label: 'Backlog & 5 Epics',
      badge: '50 SP',
      icon: ListTodo,
      description: 'Epics E1-E5 & User Stories'
    },
    {
      id: 'sprint-analytics',
      label: 'Sprint Metrics & Standups',
      badge: '3 Sprints',
      icon: TrendingUp,
      description: 'Burndown, Daily Scrum & Retro'
    },
    {
      id: 'api-gateway',
      label: 'API Gateway & REST Tester',
      badge: 'S5 Gateway',
      icon: Network,
      description: 'Live Postman-Style Console'
    },
    {
      id: 'lab-docs',
      label: 'Agile Lab Report',
      badge: '14 Items',
      icon: FileCode2,
      description: 'Complete Experiment Record'
    }
  ];

  return (
    <div className="w-full mb-6">
      <div className="flex space-x-1.5 overflow-x-auto p-1.5 bg-slate-900/90 border border-slate-800 rounded-2xl scrollbar-none">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeView === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveView(tab.id)}
              className={'flex items-center space-x-2 px-3.5 py-2.5 rounded-xl font-medium text-xs whitespace-nowrap transition-all duration-200 ' +
                (isActive
                  ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-md shadow-orange-600/25 ring-1 ring-orange-400/40 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60')}
            >
              <Icon className={'w-4 h-4 ' + (isActive ? 'text-white' : 'text-slate-400')} />
              <span>{tab.label}</span>
              {tab.badge && (
                <span
                  className={'px-1.5 py-0.5 text-[10px] font-mono rounded-full ' +
                    (isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-800 text-slate-400 border border-slate-700')}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}