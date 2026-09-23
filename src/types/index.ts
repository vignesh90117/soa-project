// SOA Service Models
export interface MenuItem {
  itemId: number;
  name: string;
  category: 'Starters' | 'Main Course' | 'Desserts' | 'Beverages';
  description: string;
  price: number;
  isVeg: boolean;
  isAvailable: boolean;
  image: string;
  calories?: number;
}

export interface Restaurant {
  restaurantId: number;
  name: string;
  tagline: string;
  location: string;
  cuisine: string;
  rating: number;
  reviewCount: number;
  deliveryTimeMins: number;
  minOrder: number;
  isOpen: boolean;
  image: string;
  menu: MenuItem[];
}

export interface CartItem {
  restaurantId: number;
  restaurantName: string;
  item: MenuItem;
  quantity: number;
}

export type OrderStatus = 'PENDING_PAYMENT' | 'CONFIRMED' | 'PREPARING' | 'OUT_FOR_DELIVERY' | 'DELIVERED' | 'CANCELLED';

export interface OrderItemRecord {
  itemId: number;
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  orderId: string;
  userId: number;
  restaurantId: number;
  restaurantName: string;
  items: OrderItemRecord[];
  subTotal: number;
  tax: number;
  deliveryFee: number;
  totalAmount: number;
  deliveryAddress: string;
  customerName: string;
  customerPhone: string;
  status: OrderStatus;
  createdAt: string;
  estimatedDelivery: string;
  paymentId?: string;
  paymentMethod?: string;
}

export interface PaymentTransaction {
  transactionId: string;
  orderId: string;
  userId: number;
  amount: number;
  method: 'UPI' | 'CREDIT_CARD' | 'DEBIT_CARD' | 'NET_BANKING' | 'COD';
  upiId?: string;
  cardNumberMasked?: string;
  status: 'SUCCESS' | 'FAILED' | 'PENDING';
  timestamp: string;
  bankRef: string;
}

export interface ServiceNotification {
  notificationId: string;
  orderId: string;
  title: string;
  message: string;
  type: 'ORDER_STATUS' | 'PAYMENT' | 'SYSTEM' | 'PROMO';
  channel: 'PUSH' | 'SMS' | 'EMAIL';
  timestamp: string;
  isRead: boolean;
}

export interface ApiGatewayLog {
  id: string;
  timestamp: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  targetService: 'S1-Restaurant' | 'S2-Order' | 'S3-Payment' | 'S4-Notification' | 'S5-Gateway';
  statusCode: number;
  latencyMs: number;
  requestPayload?: any;
  responsePayload?: any;
  clientIp: string;
  authPassed: boolean;
}

// Jira & Agile Models
export type JiraIssueType = 'Epic' | 'Story' | 'Task' | 'Bug';
export type JiraPriority = 'Highest' | 'High' | 'Medium' | 'Low';
export type JiraStatus = 'BACKLOG' | 'TO_DO' | 'IN_PROGRESS' | 'CODE_REVIEW' | 'TESTING' | 'DONE';

export interface JiraSubTask {
  id: string;
  summary: string;
  assignee: string;
  estimatedHours: number;
  isCompleted: boolean;
}

export interface JiraIssue {
  id: string; // e.g. OFO-1
  type: JiraIssueType;
  epicKey: 'E1' | 'E2' | 'E3' | 'E4' | 'E5';
  summary: string;
  userStoryStatement?: {
    asA: string;
    iWant: string;
    soThat: string;
  };
  acceptanceCriteria: string[];
  subTasks: JiraSubTask[];
  priority: JiraPriority;
  storyPoints: number;
  status: JiraStatus;
  assignee: {
    name: string;
    role: string;
    avatar: string;
  };
  sprint: 'Sprint 1' | 'Sprint 2' | 'Sprint 3' | 'Backlog';
  samplePayload?: string;
}

export interface JiraEpic {
  key: 'E1' | 'E2' | 'E3' | 'E4' | 'E5';
  name: string;
  description: string;
  targetService: string;
  color: string;
}

export interface SprintInfo {
  id: string;
  name: string;
  goal: string;
  duration: string;
  totalStoryPoints: number;
  completedStoryPoints: number;
  status: 'ACTIVE' | 'PLANNED' | 'COMPLETED';
  startDate: string;
  endDate: string;
  dailySchedule: { day: string; activity: string }[];
}

export interface DailyScrumNote {
  developer: string;
  role: string;
  yesterday: string;
  today: string;
  blockers: string;
}

export interface RetrospectiveFeedback {
  category: 'WENT_WELL' | 'PAINS' | 'ACTION_ITEMS';
  content: string;
  author: string;
}
