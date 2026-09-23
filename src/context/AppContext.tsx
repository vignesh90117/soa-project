'use client';

import React, { createContext, useContext, useState } from 'react';
import {
  Restaurant,
  MenuItem,
  CartItem,
  Order,
  OrderStatus,
  PaymentTransaction,
  ServiceNotification,
  ApiGatewayLog,
  JiraIssue,
  JiraStatus,
  JiraEpic,
  SprintInfo
} from '../types';
import {
  INITIAL_RESTAURANTS,
  JIRA_EPICS,
  INITIAL_JIRA_ISSUES,
  SPRINT_DATA
} from '../data/mockData';
import { useToast } from './ToastContext';

export type ActiveAppView = 'food-app' | 'jira-board' | 'jira-backlog' | 'sprint-analytics' | 'api-gateway' | 'lab-docs';

interface AppContextType {
  activeView: ActiveAppView;
  setActiveView: (view: ActiveAppView) => void;

  restaurants: Restaurant[];
  selectedRestaurant: Restaurant | null;
  setSelectedRestaurant: (r: Restaurant | null) => void;
  selectedCuisine: string;
  setSelectedCuisine: (c: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  vegOnly: boolean;
  setVegOnly: (v: boolean) => void;
  minRatingFilter: number;
  setMinRatingFilter: (r: number) => void;

  cart: CartItem[];
  addToCart: (restaurant: Restaurant, item: MenuItem) => void;
  removeFromCart: (itemId: number) => void;
  updateQuantity: (itemId: number, delta: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartSubtotal: number;
  cartTax: number;
  cartDeliveryFee: number;
  discountAmount: number;
  appliedCoupon: string;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  
  orders: Order[];
  createOrder: (customer: { name: string; phone: string; address: string }) => Order | null;
  advanceOrderStatus: (orderId: string) => void;
  cancelOrder: (orderId: string) => void;
  activeOrderToTrack: Order | null;
  setActiveOrderToTrack: (order: Order | null) => void;

  payments: PaymentTransaction[];
  processPayment: (orderId: string, method: 'UPI' | 'CREDIT_CARD' | 'DEBIT_CARD' | 'NET_BANKING' | 'COD', upiId?: string) => Promise<boolean>;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  pendingPaymentOrder: Order | null;
  setPendingPaymentOrder: (order: Order | null) => void;

  notifications: ServiceNotification[];
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  isNotificationDrawerOpen: boolean;
  setIsNotificationDrawerOpen: (open: boolean) => void;

  apiLogs: ApiGatewayLog[];
  logApiCall: (
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    path: string,
    targetService: 'S1-Restaurant' | 'S2-Order' | 'S3-Payment' | 'S4-Notification' | 'S5-Gateway',
    statusCode: number,
    latencyMs: number,
    requestPayload?: any,
    responsePayload?: any
  ) => void;
  clearApiLogs: () => void;

  issues: JiraIssue[];
  epics: JiraEpic[];
  sprints: SprintInfo[];
  moveIssueStatus: (issueId: string, newStatus: JiraStatus) => void;
  advanceIssueStatus: (issueId: string) => void;
  regressIssueStatus: (issueId: string) => void;
  toggleSubTask: (issueId: string, taskId: string) => void;
  addNewIssue: (issue: Partial<JiraIssue>) => void;
  selectedIssueForModal: JiraIssue | null;
  setSelectedIssueForModal: (issue: JiraIssue | null) => void;

  isNewStoryModalOpen: boolean;
  setIsNewStoryModalOpen: (open: boolean) => void;
  runFullDemoFlow: () => Promise<void>;
  isDemoRunning: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const { showToast } = useToast();
  const [activeView, setActiveView] = useState<ActiveAppView>('food-app');

  const [restaurants] = useState<Restaurant[]>(INITIAL_RESTAURANTS);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [selectedCuisine, setSelectedCuisine] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [vegOnly, setVegOnly] = useState<boolean>(false);
  const [minRatingFilter, setMinRatingFilter] = useState<number>(0);

  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [appliedCoupon, setAppliedCoupon] = useState<string>('');
  const [discountAmount, setDiscountAmount] = useState<number>(0);

  const [orders, setOrders] = useState<Order[]>([
    {
      orderId: 'ORD-928341',
      userId: 101,
      restaurantId: 10,
      restaurantName: 'Spice Garden Bistro',
      items: [
        { itemId: 501, name: 'Paneer Butter Masala', quantity: 2, price: 260 },
        { itemId: 504, name: 'Butter Garlic Naan (2 pcs)', quantity: 2, price: 90 }
      ],
      subTotal: 700,
      tax: 35,
      deliveryFee: 30,
      totalAmount: 765,
      deliveryAddress: '42 West End Blvd, Suite 4B',
      customerName: 'Vignesh Kumar',
      customerPhone: '+91 98765 43210',
      status: 'CONFIRMED',
      createdAt: '2026-08-26T14:15:00Z',
      estimatedDelivery: '30 mins',
      paymentId: 'TXN-77382',
      paymentMethod: 'UPI'
    }
  ]);
  const [activeOrderToTrack, setActiveOrderToTrack] = useState<Order | null>(null);

  const [payments, setPayments] = useState<PaymentTransaction[]>([
    {
      transactionId: 'TXN-77382',
      orderId: 'ORD-928341',
      userId: 101,
      amount: 765,
      method: 'UPI',
      upiId: 'vignesh@okhdfcbank',
      status: 'SUCCESS',
      timestamp: '2026-08-26T14:15:20Z',
      bankRef: 'HDFC9982341'
    }
  ]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [pendingPaymentOrder, setPendingPaymentOrder] = useState<Order | null>(null);

  const [notifications, setNotifications] = useState<ServiceNotification[]>([
    {
      notificationId: 'NOTIF-01',
      orderId: 'ORD-928341',
      title: 'Order Confirmed! 🎉',
      message: 'Your order #ORD-928341 at Spice Garden Bistro is confirmed and sent to kitchen.',
      type: 'ORDER_STATUS',
      channel: 'PUSH',
      timestamp: '14:15 PM',
      isRead: false
    },
    {
      notificationId: 'NOTIF-02',
      orderId: 'ORD-928341',
      title: 'Payment Successful 💳',
      message: 'Payment of ₹765.00 via UPI was successfully processed.',
      type: 'PAYMENT',
      channel: 'SMS',
      timestamp: '14:15 PM',
      isRead: true
    }
  ]);
  const [isNotificationDrawerOpen, setIsNotificationDrawerOpen] = useState<boolean>(false);

  const [apiLogs, setApiLogs] = useState<ApiGatewayLog[]>([
    {
      id: 'LOG-001',
      timestamp: '14:14:58',
      method: 'GET',
      path: '/api/v1/restaurants',
      targetService: 'S1-Restaurant',
      statusCode: 200,
      latencyMs: 42,
      clientIp: '192.168.1.104',
      authPassed: true,
      responsePayload: { total: 4, page: 1, limit: 10 }
    }
  ]);

  const [issues, setIssues] = useState<JiraIssue[]>(INITIAL_JIRA_ISSUES);
  const [epics] = useState<JiraEpic[]>(JIRA_EPICS);
  const [sprints] = useState<SprintInfo[]>(SPRINT_DATA);
  const [selectedIssueForModal, setSelectedIssueForModal] = useState<JiraIssue | null>(null);
  const [isNewStoryModalOpen, setIsNewStoryModalOpen] = useState<boolean>(false);
  const [isDemoRunning, setIsDemoRunning] = useState<boolean>(false);

  const logApiCall = (
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    path: string,
    targetService: 'S1-Restaurant' | 'S2-Order' | 'S3-Payment' | 'S4-Notification' | 'S5-Gateway',
    statusCode: number,
    latencyMs: number,
    requestPayload?: any,
    responsePayload?: any
  ) => {
    const newLog: ApiGatewayLog = {
      id: 'LOG-' + Math.floor(1000 + Math.random() * 9000),
      timestamp: new Date().toLocaleTimeString(),
      method,
      path,
      targetService,
      statusCode,
      latencyMs,
      clientIp: '192.168.1.104',
      authPassed: true,
      requestPayload,
      responsePayload
    };
    setApiLogs((prev) => [newLog, ...prev.slice(0, 49)]);
  };

  const clearApiLogs = () => setApiLogs([]);

  const cartSubtotal = cart.reduce((acc, curr) => acc + curr.item.price * curr.quantity, 0);
  const cartTax = Number((cartSubtotal * 0.05).toFixed(2));
  const cartDeliveryFee = cartSubtotal > 0 ? (cartSubtotal > 400 ? 0 : 35) : 0;
  const cartTotal = Number(Math.max(0, cartSubtotal + cartTax + cartDeliveryFee - discountAmount).toFixed(2));

  const applyCoupon = (code: string): boolean => {
    if (code.toUpperCase() === 'AGILE50') {
      const discount = 50;
      setAppliedCoupon('AGILE50');
      setDiscountAmount(discount);
      showToast('Coupon Applied! 🎉', '₹50 discount applied with code AGILE50', 'success');
      return true;
    } else if (code.toUpperCase() === 'SOA100') {
      const discount = 100;
      setAppliedCoupon('SOA100');
      setDiscountAmount(discount);
      showToast('Coupon Applied! 🎉', '₹100 discount applied with code SOA100', 'success');
      return true;
    } else {
      showToast('Invalid Coupon', 'Try using code AGILE50 or SOA100', 'warning');
      return false;
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon('');
    setDiscountAmount(0);
    showToast('Coupon Removed', 'Standard pricing restored', 'info');
  };

  const addToCart = (restaurant: Restaurant, item: MenuItem) => {
    logApiCall('GET', '/api/v1/restaurants/' + restaurant.restaurantId + '/menu/' + item.itemId, 'S1-Restaurant', 200, 28, undefined, { item: item.name, price: item.price, available: item.isAvailable });

    setCart((prev) => {
      const existingDiffRest = prev.find((i) => i.restaurantId !== restaurant.restaurantId);
      if (existingDiffRest) {
        if (!window.confirm('Your cart contains items from "' + existingDiffRest.restaurantName + '". Reset cart and add items from "' + restaurant.name + '"?')) {
          return prev;
        }
        showToast('Cart Reset', 'Started new cart with ' + restaurant.name, 'info');
        return [{ restaurantId: restaurant.restaurantId, restaurantName: restaurant.name, item, quantity: 1 }];
      }

      const existingIndex = prev.findIndex((i) => i.item.itemId === item.itemId);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += 1;
        showToast('Quantity Updated', item.name + ' quantity: ' + updated[existingIndex].quantity, 'success');
        return updated;
      }
      showToast('Item Added! 😋', item.name + ' added to cart', 'success');
      return [...prev, { restaurantId: restaurant.restaurantId, restaurantName: restaurant.name, item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: number) => {
    setCart((prev) => prev.filter((i) => i.item.itemId !== itemId));
    showToast('Item Removed', 'Item was removed from cart', 'info');
  };

  const updateQuantity = (itemId: number, delta: number) => {
    setCart((prev) => {
      return prev
        .map((i) => {
          if (i.item.itemId === itemId) {
            const newQty = i.quantity + delta;
            return newQty > 0 ? { ...i, quantity: newQty } : null;
          }
          return i;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon('');
    setDiscountAmount(0);
    showToast('Cart Cleared', 'All items removed', 'info');
  };

  const createOrder = (customer: { name: string; phone: string; address: string }): Order | null => {
    if (cart.length === 0) return null;

    const currentRest = cart[0];
    const newOrderId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);

    const newOrder: Order = {
      orderId: newOrderId,
      userId: 101,
      restaurantId: currentRest.restaurantId,
      restaurantName: currentRest.restaurantName,
      items: cart.map((c) => ({
        itemId: c.item.itemId,
        name: c.item.name,
        quantity: c.quantity,
        price: c.item.price
      })),
      subTotal: cartSubtotal,
      tax: cartTax,
      deliveryFee: cartDeliveryFee,
      totalAmount: cartTotal,
      deliveryAddress: customer.address,
      customerName: customer.name,
      customerPhone: customer.phone,
      status: 'PENDING_PAYMENT',
      createdAt: new Date().toISOString(),
      estimatedDelivery: '30-40 mins'
    };

    logApiCall(
      'POST',
      '/api/v1/orders',
      'S2-Order',
      201,
      95,
      {
        userId: 101,
        restaurantId: currentRest.restaurantId,
        items: newOrder.items
      },
      {
        orderId: newOrderId,
        status: 'PENDING_PAYMENT',
        totalAmount: cartTotal
      }
    );

    setOrders((prev) => [newOrder, ...prev]);
    setPendingPaymentOrder(newOrder);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
    clearCart();

    showToast('Order Created! 📋', 'Order #' + newOrderId + ' created via S2 Order Service. Proceeding to Payment.', 'success');

    return newOrder;
  };

  const processPayment = async (
    orderId: string,
    method: 'UPI' | 'CREDIT_CARD' | 'DEBIT_CARD' | 'NET_BANKING' | 'COD',
    upiId?: string
  ): Promise<boolean> => {
    const order = orders.find((o) => o.orderId === orderId);
    if (!order) return false;

    await new Promise((resolve) => setTimeout(resolve, 800));

    const newTxnId = 'TXN-' + Math.floor(10000 + Math.random() * 90000);
    const newTxn: PaymentTransaction = {
      transactionId: newTxnId,
      orderId,
      userId: 101,
      amount: order.totalAmount,
      method,
      upiId,
      status: 'SUCCESS',
      timestamp: new Date().toISOString(),
      bankRef: 'HDFC' + Math.floor(1000000 + Math.random() * 9000000)
    };

    logApiCall(
      'POST',
      '/api/v1/payments/charge',
      'S3-Payment',
      200,
      120,
      { orderId, amount: order.totalAmount, paymentMethod: method, upiId },
      { transactionId: newTxnId, status: 'SUCCESS' }
    );

    setPayments((prev) => [newTxn, ...prev]);

    setOrders((prev) =>
      prev.map((o) =>
        o.orderId === orderId
          ? {
              ...o,
              status: 'CONFIRMED',
              paymentId: newTxnId,
              paymentMethod: method
            }
          : o
      )
    );

    const newNotif: ServiceNotification = {
      notificationId: 'NOTIF-' + Math.floor(100 + Math.random() * 900),
      orderId,
      title: 'Order Confirmed! 🍲',
      message: 'Your payment of ₹' + order.totalAmount + ' for order #' + orderId + ' was confirmed.',
      type: 'ORDER_STATUS',
      channel: 'PUSH',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isRead: false
    };

    setNotifications((prev) => [newNotif, ...prev]);

    logApiCall(
      'POST',
      '/api/v1/notifications/send',
      'S4-Notification',
      202,
      38,
      { orderId, event: 'ORDER_CONFIRMED', channels: ['PUSH', 'SMS'] },
      { delivered: true, recipient: order.customerPhone }
    );

    const updatedOrder = {
      ...order,
      status: 'CONFIRMED' as OrderStatus,
      paymentId: newTxnId,
      paymentMethod: method
    };
    setActiveOrderToTrack(updatedOrder);
    setPendingPaymentOrder(null);
    setIsCheckoutOpen(false);

    showToast('Payment Successful! 💳', 'Transaction ID ' + newTxnId + ' approved via S3 Payment Service.', 'success');

    return true;
  };

  const advanceOrderStatus = (orderId: string) => {
    const order = orders.find((o) => o.orderId === orderId);
    if (!order) return;

    const transitions: Record<OrderStatus, OrderStatus> = {
      PENDING_PAYMENT: 'CONFIRMED',
      CONFIRMED: 'PREPARING',
      PREPARING: 'OUT_FOR_DELIVERY',
      OUT_FOR_DELIVERY: 'DELIVERED',
      DELIVERED: 'DELIVERED',
      CANCELLED: 'CANCELLED'
    };

    const nextStatus = transitions[order.status];
    if (nextStatus === order.status) return;

    setOrders((prev) =>
      prev.map((o) => (o.orderId === orderId ? { ...o, status: nextStatus } : o))
    );

    if (activeOrderToTrack && activeOrderToTrack.orderId === orderId) {
      setActiveOrderToTrack({ ...activeOrderToTrack, status: nextStatus });
    }

    logApiCall(
      'PUT',
      '/api/v1/orders/' + orderId + '/status',
      'S2-Order',
      200,
      45,
      { previousStatus: order.status, nextStatus },
      { orderId, status: nextStatus, updatedAt: new Date().toISOString() }
    );

    const statusMessages: Record<OrderStatus, string> = {
      PENDING_PAYMENT: 'Order pending payment.',
      CONFIRMED: 'Order #' + orderId + ' is confirmed!',
      PREPARING: 'Chef at ' + order.restaurantName + ' is cooking your meal 👨‍🍳',
      OUT_FOR_DELIVERY: 'Delivery partner is on the way 🛵💨',
      DELIVERED: 'Order #' + orderId + ' has been delivered. Enjoy your meal! 🍽️',
      CANCELLED: 'Order #' + orderId + ' was cancelled.'
    };

    const newNotif: ServiceNotification = {
      notificationId: 'NOTIF-' + Math.floor(100 + Math.random() * 900),
      orderId,
      title: 'Status: ' + nextStatus.replace(/_/g, ' '),
      message: statusMessages[nextStatus],
      type: 'ORDER_STATUS',
      channel: 'SMS',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isRead: false
    };

    setNotifications((prev) => [newNotif, ...prev]);

    logApiCall(
      'POST',
      '/api/v1/notifications/send',
      'S4-Notification',
      202,
      30,
      { orderId, status: nextStatus },
      { delivered: true }
    );

    showToast('Event Dispatched (S2 ➔ S4)', statusMessages[nextStatus], 'success');
  };

  const cancelOrder = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.orderId === orderId ? { ...o, status: 'CANCELLED' } : o))
    );
    if (activeOrderToTrack && activeOrderToTrack.orderId === orderId) {
      setActiveOrderToTrack({ ...activeOrderToTrack, status: 'CANCELLED' });
    }
    logApiCall('PUT', '/api/v1/orders/' + orderId + '/cancel', 'S2-Order', 200, 52);
    showToast('Order Cancelled', 'Refund requested through S3 Payment Service', 'warning');
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.notificationId === id ? { ...n, isRead: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    showToast('All Caught Up', 'All notifications marked as read', 'info');
  };

  const statusOrder: JiraStatus[] = ['BACKLOG', 'TO_DO', 'IN_PROGRESS', 'CODE_REVIEW', 'TESTING', 'DONE'];

  const moveIssueStatus = (issueId: string, newStatus: JiraStatus) => {
    setIssues((prev) =>
      prev.map((iss) => (iss.id === issueId ? { ...iss, status: newStatus } : iss))
    );
    showToast('Jira Status Updated', issueId + ' moved to ' + newStatus, 'info');
  };

  const advanceIssueStatus = (issueId: string) => {
    const issue = issues.find((i) => i.id === issueId);
    if (!issue) return;
    const currIdx = statusOrder.indexOf(issue.status);
    if (currIdx < statusOrder.length - 1) {
      const next = statusOrder[currIdx + 1];
      moveIssueStatus(issueId, next);
    }
  };

  const regressIssueStatus = (issueId: string) => {
    const issue = issues.find((i) => i.id === issueId);
    if (!issue) return;
    const currIdx = statusOrder.indexOf(issue.status);
    if (currIdx > 0) {
      const prev = statusOrder[currIdx - 1];
      moveIssueStatus(issueId, prev);
    }
  };

  const toggleSubTask = (issueId: string, taskId: string) => {
    setIssues((prev) =>
      prev.map((iss) => {
        if (iss.id === issueId) {
          const updatedSubTasks = iss.subTasks.map((st) =>
            st.id === taskId ? { ...st, isCompleted: !st.isCompleted } : st
          );
          return { ...iss, subTasks: updatedSubTasks };
        }
        return iss;
      })
    );
  };

  const addNewIssue = (issueData: Partial<JiraIssue>) => {
    const newId = 'OFO-' + (issues.length + 1);
    const newIssue: JiraIssue = {
      id: newId,
      type: issueData.type || 'Story',
      epicKey: issueData.epicKey || 'E1',
      summary: issueData.summary || 'New User Story',
      userStoryStatement: issueData.userStoryStatement || {
        asA: 'user',
        iWant: 'to accomplish a goal',
        soThat: 'I get benefit'
      },
      acceptanceCriteria: issueData.acceptanceCriteria || ['Criteria 1', 'Criteria 2'],
      subTasks: [
        { id: newId + '-T1', summary: 'Implement REST service endpoint', assignee: 'Developer 1', estimatedHours: 3, isCompleted: false },
        { id: newId + '-T2', summary: 'Unit and API test verification', assignee: 'QA Tester', estimatedHours: 2, isCompleted: false }
      ],
      priority: issueData.priority || 'High',
      storyPoints: issueData.storyPoints || 5,
      status: 'TO_DO',
      assignee: { name: 'Alex Chen', role: 'Backend Dev', avatar: '👨‍💻' },
      sprint: 'Sprint 1'
    };
    setIssues((prev) => [newIssue, ...prev]);
    showToast('New Story Created! 🎯', 'Added ' + newId + ' to the Scrum Board', 'success');
  };

  const runFullDemoFlow = async () => {
    if (isDemoRunning) return;
    setIsDemoRunning(true);

    showToast('🚀 Starting Full SOA Demo', 'Adding Paneer Butter Masala & Garlic Naan to cart...', 'info');
    const rest = restaurants[0];
    setCart([
      { restaurantId: rest.restaurantId, restaurantName: rest.name, item: rest.menu[0], quantity: 2 },
      { restaurantId: rest.restaurantId, restaurantName: rest.name, item: rest.menu[3], quantity: 2 }
    ]);

    await new Promise((r) => setTimeout(r, 1200));

    showToast('📦 Creating Order via S2...', 'Calling POST /api/v1/orders', 'info');
    const newOrder = createOrder({
      name: 'Vignesh Kumar',
      phone: '+91 98765 43210',
      address: '42 West End Blvd, Suite 4B'
    });

    if (newOrder) {
      await new Promise((r) => setTimeout(r, 1500));
      showToast('💳 Processing Payment via S3...', 'Paying ₹' + newOrder.totalAmount + ' via UPI', 'info');
      await processPayment(newOrder.orderId, 'UPI', 'vignesh@okhdfcbank');

      await new Promise((r) => setTimeout(r, 2000));
      advanceOrderStatus(newOrder.orderId); // To PREPARING

      await new Promise((r) => setTimeout(r, 2000));
      advanceOrderStatus(newOrder.orderId); // To OUT_FOR_DELIVERY
    }

    setIsDemoRunning(false);
    showToast('✅ Demo Completed!', 'All 5 SOA Microservices executed in harmony.', 'success');
  };

  return (
    <AppContext.Provider
      value={{
        activeView,
        setActiveView,
        restaurants,
        selectedRestaurant,
        setSelectedRestaurant,
        selectedCuisine,
        setSelectedCuisine,
        searchQuery,
        setSearchQuery,
        vegOnly,
        setVegOnly,
        minRatingFilter,
        setMinRatingFilter,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartSubtotal,
        cartTax,
        cartDeliveryFee,
        discountAmount,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        isCartOpen,
        setIsCartOpen,
        orders,
        createOrder,
        advanceOrderStatus,
        cancelOrder,
        activeOrderToTrack,
        setActiveOrderToTrack,
        payments,
        processPayment,
        isCheckoutOpen,
        setIsCheckoutOpen,
        pendingPaymentOrder,
        setPendingPaymentOrder,
        notifications,
        markNotificationRead,
        markAllNotificationsRead,
        isNotificationDrawerOpen,
        setIsNotificationDrawerOpen,
        apiLogs,
        logApiCall,
        clearApiLogs,
        issues,
        epics,
        sprints,
        moveIssueStatus,
        advanceIssueStatus,
        regressIssueStatus,
        toggleSubTask,
        addNewIssue,
        selectedIssueForModal,
        setSelectedIssueForModal,
        isNewStoryModalOpen,
        setIsNewStoryModalOpen,
        runFullDemoFlow,
        isDemoRunning
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}