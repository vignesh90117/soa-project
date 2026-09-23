'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { NavigationTabs } from '@/components/layout/NavigationTabs';
import { RestaurantList } from '@/components/food/RestaurantList';
import { OrderTracker } from '@/components/food/OrderTracker';
import { ScrumBoard } from '@/components/jira/ScrumBoard';
import { BacklogView } from '@/components/jira/BacklogView';
import { SprintAnalytics } from '@/components/jira/SprintAnalytics';
import { ApiGatewayInspector } from '@/components/gateway/ApiGatewayInspector';
import { LabManualViewer } from '@/components/docs/LabManualViewer';

export default function HomePage() {
  const { activeView, orders } = useApp();

  return (
    <div className="space-y-6">
      {/* Navigation Switcher */}
      <NavigationTabs />

      {/* Main Dynamic View Content */}
      <div className="transition-all duration-300">
        {activeView === 'food-app' && (
          <div className="space-y-8">
            {orders.length > 0 && <OrderTracker />}
            <RestaurantList />
          </div>
        )}

        {activeView === 'jira-board' && <ScrumBoard />}

        {activeView === 'jira-backlog' && <BacklogView />}

        {activeView === 'sprint-analytics' && <SprintAnalytics />}

        {activeView === 'api-gateway' && <ApiGatewayInspector />}

        {activeView === 'lab-docs' && <LabManualViewer />}
      </div>
    </div>
  );
}
