import { Restaurant, JiraEpic, JiraIssue, SprintInfo, DailyScrumNote, RetrospectiveFeedback } from '../types';

export const INITIAL_RESTAURANTS: Restaurant[] = [
  {
    restaurantId: 10,
    name: "Spice Garden Bistro",
    tagline: "Authentic North & South Indian Curries and Biryanis",
    location: "Downtown Central, 4th Avenue",
    cuisine: "North Indian, Biryani, Mughlai",
    rating: 4.8,
    reviewCount: 420,
    deliveryTimeMins: 25,
    minOrder: 150,
    isOpen: true,
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&auto=format&fit=crop&q=80",
    menu: [
      {
        itemId: 501,
        name: "Paneer Butter Masala",
        category: "Main Course",
        description: "Fresh cottage cheese cubes simmered in a rich tomato, butter, and cashew gravy.",
        price: 260,
        isVeg: true,
        isAvailable: true,
        image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&auto=format&fit=crop&q=80",
        calories: 420
      },
      {
        itemId: 502,
        name: "Hyderabadi Dum Chicken Biryani",
        category: "Main Course",
        description: "Fragrant basmati rice layered with spiced marinated chicken and slow-cooked in sealed clay pot.",
        price: 340,
        isVeg: false,
        isAvailable: true,
        image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&auto=format&fit=crop&q=80",
        calories: 680
      },
      {
        itemId: 503,
        name: "Crispy Corn & Pepper Salt",
        category: "Starters",
        description: "Tender American sweet corn battered, wok-tossed with green chili, spring onions, and pepper.",
        price: 180,
        isVeg: true,
        isAvailable: true,
        image: "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=400&auto=format&fit=crop&q=80",
        calories: 250
      },
      {
        itemId: 504,
        name: "Butter Garlic Naan (2 pcs)",
        category: "Main Course",
        description: "Traditional tandoor-baked leavened flatbread brushed with garlic butter.",
        price: 90,
        isVeg: true,
        isAvailable: true,
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&auto=format&fit=crop&q=80",
        calories: 310
      },
      {
        itemId: 505,
        name: "Gulab Jamun with Rabri",
        category: "Desserts",
        description: "Warm golden milk-solid dumplings soaked in rose cardamom syrup served with thickened sweet milk.",
        price: 120,
        isVeg: true,
        isAvailable: true,
        image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400&auto=format&fit=crop&q=80",
        calories: 350
      },
      {
        itemId: 506,
        name: "Royal Mango Lassi",
        category: "Beverages",
        description: "Creamy yogurt churned with Alphonso mango pulp and saffron strands.",
        price: 110,
        isVeg: true,
        isAvailable: true,
        image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=400&auto=format&fit=crop&q=80",
        calories: 210
      }
    ]
  },
  {
    restaurantId: 20,
    name: "Bella Italia Trattoria",
    tagline: "Wood-fired Artisanal Pizzas & Fresh Handmade Pasta",
    location: "Koregaon Promenade, Sector 8",
    cuisine: "Italian, Pasta, Pizza",
    rating: 4.7,
    reviewCount: 315,
    deliveryTimeMins: 30,
    minOrder: 200,
    isOpen: true,
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=80",
    menu: [
      {
        itemId: 601,
        name: "Margherita di Bufala Pizza",
        category: "Main Course",
        description: "San Marzano tomato base, fresh buffalo mozzarella, fresh basil, and extra virgin olive oil.",
        price: 380,
        isVeg: true,
        isAvailable: true,
        image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400&auto=format&fit=crop&q=80",
        calories: 540
      },
      {
        itemId: 602,
        name: "Truffle Mushroom Fettuccine",
        category: "Main Course",
        description: "Handmade ribbons of fettuccine pasta in a creamy black truffle and wild portobello sauce.",
        price: 420,
        isVeg: true,
        isAvailable: true,
        image: "https://images.unsplash.com/photo-1621996346565-e3d5d6281699?w=400&auto=format&fit=crop&q=80",
        calories: 610
      },
      {
        itemId: 603,
        name: "Garlic Herb Bruschetta",
        category: "Starters",
        description: "Toasted sourdough bread topped with diced heirloom tomatoes, roasted garlic, and balsamic glaze.",
        price: 210,
        isVeg: true,
        isAvailable: true,
        image: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=400&auto=format&fit=crop&q=80",
        calories: 220
      },
      {
        itemId: 604,
        name: "Classic Tiramisu Classico",
        category: "Desserts",
        description: "Espresso-dipped savoiardi ladyfingers layered with whipped mascarpone cream and Valrhona cocoa.",
        price: 240,
        isVeg: true,
        isAvailable: true,
        image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&auto=format&fit=crop&q=80",
        calories: 390
      }
    ]
  },
  {
    restaurantId: 30,
    name: "Tokyo Ramen & Sushi Bar",
    tagline: "Handcrafted Tonkotsu Broths, Nigiri & Crispy Gyoza",
    location: "Cyber City Tech Hub",
    cuisine: "Japanese, Asian, Sushi",
    rating: 4.9,
    reviewCount: 520,
    deliveryTimeMins: 35,
    minOrder: 250,
    isOpen: true,
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=600&auto=format&fit=crop&q=80",
    menu: [
      {
        itemId: 701,
        name: "Signature Tonkotsu Chashu Ramen",
        category: "Main Course",
        description: "Rich 16-hour pork bone broth, springy wheat noodles, tender rolled chashu pork, and seasoned ajitsuke tamago egg.",
        price: 460,
        isVeg: false,
        isAvailable: true,
        image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&auto=format&fit=crop&q=80",
        calories: 720
      },
      {
        itemId: 702,
        name: "Crispy Pan-fried Pork Gyoza (6 pcs)",
        category: "Starters",
        description: "Juicy minced pork and cabbage dumplings pan-seared with a crispy lace skirt, served with rayu dipping sauce.",
        price: 270,
        isVeg: false,
        isAvailable: true,
        image: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=400&auto=format&fit=crop&q=80",
        calories: 320
      },
      {
        itemId: 703,
        name: "Avocado & Salmon Uramaki Roll (8 pcs)",
        category: "Main Course",
        description: "Fresh Norwegian salmon, creamy Hass avocado, seasoned sushi rice, toasted sesame, and wasabi mayo.",
        price: 490,
        isVeg: false,
        isAvailable: true,
        image: "https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=400&auto=format&fit=crop&q=80",
        calories: 450
      },
      {
        itemId: 704,
        name: "Iced Kyoto Matcha Latte",
        category: "Beverages",
        description: "Ceremonial Uji green tea whisked with creamy oat milk and vanilla syrup.",
        price: 190,
        isVeg: true,
        isAvailable: true,
        image: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=400&auto=format&fit=crop&q=80",
        calories: 140
      }
    ]
  },
  {
    restaurantId: 40,
    name: "Burger Craft & Smokehouse",
    tagline: "Gourmet Smashed Angus Burgers & Loaded Hand-cut Fries",
    location: "Metro Boulevard, Block C",
    cuisine: "American, Fast Food, Burgers",
    rating: 4.6,
    reviewCount: 290,
    deliveryTimeMins: 20,
    minOrder: 150,
    isOpen: true,
    image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=600&auto=format&fit=crop&q=80",
    menu: [
      {
        itemId: 801,
        name: "Double Smokehouse Smash Burger",
        category: "Main Course",
        description: "Two 100% prime beef smashed patties, smoked applewood cheddar, crispy bacon rashers, and secret barbecue sauce.",
        price: 360,
        isVeg: false,
        isAvailable: true,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&auto=format&fit=crop&q=80",
        calories: 780
      },
      {
        itemId: 802,
        name: "Crispy Truffle Parmesan Fries",
        category: "Starters",
        description: "Hand-cut Idaho russet potatoes tossed in aromatic white truffle oil, grated parmesan, and fresh rosemary.",
        price: 190,
        isVeg: true,
        isAvailable: true,
        image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&auto=format&fit=crop&q=80",
        calories: 410
      },
      {
        itemId: 803,
        name: "Salted Caramel Thick Milkshake",
        category: "Beverages",
        description: "Vanilla bean gelato blended with slow-cooked sea-salt caramel sauce and topped with whipped cream.",
        price: 180,
        isVeg: true,
        isAvailable: true,
        image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&auto=format&fit=crop&q=80",
        calories: 490
      }
    ]
  }
];

export const JIRA_EPICS: JiraEpic[] = [
  {
    key: "E1",
    name: "Restaurant Management",
    description: "Manage restaurant profiles, availability schedules, categories, and dynamic menu item catalogs.",
    targetService: "S1 - Restaurant Service",
    color: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
  },
  {
    key: "E2",
    name: "Order Management",
    description: "Create, validate, calculate order totals, and manage real-time order lifecycle state transitions.",
    targetService: "S2 - Order Service",
    color: "bg-blue-500/20 text-blue-300 border-blue-500/30"
  },
  {
    key: "E3",
    name: "Payment Management",
    description: "Securely process digital payments, reconcile transaction tokens, and trigger order confirmation events.",
    targetService: "S3 - Payment Service",
    color: "bg-purple-500/20 text-purple-300 border-purple-500/30"
  },
  {
    key: "E4",
    name: "Notification Service",
    description: "Dispatch automated real-time multi-channel alerts (SMS, Push, Email) to customers upon order state changes.",
    targetService: "S4 - Notification Service",
    color: "bg-amber-500/20 text-amber-300 border-amber-500/30"
  },
  {
    key: "E5",
    name: "API Gateway & Security",
    description: "Provide unified reverse proxy routing, JWT token authentication, rate limiting, and CORS handling.",
    targetService: "S5 - API Gateway",
    color: "bg-rose-500/20 text-rose-300 border-rose-500/30"
  }
];

export const INITIAL_JIRA_ISSUES: JiraIssue[] = [
  {
    id: "OFO-1",
    type: "Story",
    epicKey: "E1",
    summary: "US-01: View Available Restaurants",
    userStoryStatement: {
      asA: "customer",
      iWant: "to view a list of available restaurants with location, ratings and cuisine",
      soThat: "I can select a restaurant for ordering food."
    },
    acceptanceCriteria: [
      "Customer can request the list of restaurants via GET /api/v1/restaurants.",
      "Restaurant name, location, cuisine, delivery time, and open status are returned in JSON.",
      "Supports filtering by cuisine type and search query.",
      "API returns HTTP 200 OK for successful requests within 200ms."
    ],
    subTasks: [
      { id: "T-01-A", summary: "Design Restaurant SQL schema & JPA Entities", assignee: "Developer 1", estimatedHours: 3, isCompleted: true },
      { id: "T-01-B", summary: "Implement RestaurantRepository and query filters", assignee: "Developer 1", estimatedHours: 2, isCompleted: true },
      { id: "T-01-C", summary: "Build RestaurantController GET /restaurants endpoint", assignee: "Developer 1", estimatedHours: 3, isCompleted: true },
      { id: "T-01-D", summary: "Automate Postman test assertions for Restaurant API", assignee: "QA Tester", estimatedHours: 2, isCompleted: true }
    ],
    priority: "Highest",
    storyPoints: 3,
    status: "DONE",
    assignee: { name: "Alex Chen", role: "Backend Dev", avatar: "👨‍💻" },
    sprint: "Sprint 1",
    samplePayload: "GET /api/v1/restaurants?cuisine=Indian HTTP/1.1\nHost: api.foodorder.internal"
  },
  {
    id: "OFO-2",
    type: "Story",
    epicKey: "E1",
    summary: "US-02: View Restaurant Menu",
    userStoryStatement: {
      asA: "customer",
      iWant: "to view a restaurant's menu categorized by food courses",
      soThat: "I can choose food items to add to my cart."
    },
    acceptanceCriteria: [
      "Customer can query GET /api/v1/restaurants/{id}/menu.",
      "Menu items are grouped into Starters, Main Course, Desserts, Beverages.",
      "Each item specifies price, isVeg flag, calorie count, and availability.",
      "Returns HTTP 404 Not Found if restaurant ID does not exist."
    ],
    subTasks: [
      { id: "T-02-A", summary: "Create MenuItem JPA Entity with categories enum", assignee: "Developer 1", estimatedHours: 3, isCompleted: true },
      { id: "T-02-B", summary: "Implement MenuController and caching layer", assignee: "Developer 1", estimatedHours: 4, isCompleted: true },
      { id: "T-02-C", summary: "Write MockMvc test cases for invalid restaurant ID", assignee: "Developer 2", estimatedHours: 3, isCompleted: true }
    ],
    priority: "Highest",
    storyPoints: 5,
    status: "DONE",
    assignee: { name: "Alex Chen", role: "Backend Dev", avatar: "👨‍💻" },
    sprint: "Sprint 1",
    samplePayload: "GET /api/v1/restaurants/10/menu HTTP/1.1"
  },
  {
    id: "OFO-3",
    type: "Story",
    epicKey: "E2",
    summary: "US-03: Create and Place Food Order",
    userStoryStatement: {
      asA: "customer",
      iWant: "to place an order with selected menu items and quantities",
      soThat: "I can purchase food from my chosen restaurant."
    },
    acceptanceCriteria: [
      "Customer provides userId, restaurantId, deliveryAddress, and items array.",
      "Order Service validates item availability against Restaurant Service (S1).",
      "Order subtotal, 5% tax, and delivery charges are calculated automatically.",
      "Order record is created in database with initial status 'PENDING_PAYMENT'.",
      "API returns HTTP 201 Created with unique generated orderId and total amount."
    ],
    subTasks: [
      { id: "T-03-A", summary: "Create Spring Boot Order Service scaffold", assignee: "Developer 2", estimatedHours: 3, isCompleted: true },
      { id: "T-03-B", summary: "Design Order and OrderItem entities", assignee: "Developer 2", estimatedHours: 4, isCompleted: true },
      { id: "T-03-C", summary: "Implement Feign Client to verify items with S1 Restaurant Service", assignee: "Developer 2", estimatedHours: 5, isCompleted: true },
      { id: "T-03-D", summary: "Expose POST /api/v1/orders in OrderController", assignee: "Developer 2", estimatedHours: 4, isCompleted: true },
      { id: "T-03-E", summary: "Write JUnit 5 unit tests for price calculation logic", assignee: "Developer 2", estimatedHours: 3, isCompleted: true },
      { id: "T-03-F", summary: "Postman end-to-end order placement test validation", assignee: "QA Tester", estimatedHours: 3, isCompleted: true }
    ],
    priority: "Highest",
    storyPoints: 8,
    status: "DONE",
    assignee: { name: "Sarah Jenkins", role: "Backend Dev", avatar: "👩‍💻" },
    sprint: "Sprint 1",
    samplePayload: "{\n  \"userId\": 101,\n  \"restaurantId\": 10,\n  \"deliveryAddress\": \"42 West End Blvd, Suite 4B\",\n  \"items\": [\n    { \"itemId\": 501, \"quantity\": 2 },\n    { \"itemId\": 504, \"quantity\": 1 }\n  ]\n}"
  },
  {
    id: "OFO-4",
    type: "Story",
    epicKey: "E3",
    summary: "US-04: Process Order Payment",
    userStoryStatement: {
      asA: "customer",
      iWant: "to make secure digital payment for my pending order",
      soThat: "my order can be confirmed and prepared by the restaurant."
    },
    acceptanceCriteria: [
      "Payment Service receives POST /api/v1/payments/charge with orderId and amount.",
      "Validates payment method (UPI, Card, NetBanking).",
      "Returns payment transaction ID and status ('SUCCESS' or 'FAILED').",
      "Successful payment triggers state update on Order Service to 'CONFIRMED'."
    ],
    subTasks: [
      { id: "T-04-A", summary: "Setup Payment Service project and PaymentTransaction entity", assignee: "Developer 1", estimatedHours: 4, isCompleted: true },
      { id: "T-04-B", summary: "Implement mock payment gateway processor (UPI/Card)", assignee: "Developer 1", estimatedHours: 5, isCompleted: true },
      { id: "T-04-C", summary: "Build order status update webhook callback to S2", assignee: "Developer 2", estimatedHours: 4, isCompleted: true },
      { id: "T-04-D", summary: "Integrate Postman payment success/failure simulation", assignee: "QA Tester", estimatedHours: 3, isCompleted: true }
    ],
    priority: "High",
    storyPoints: 8,
    status: "DONE",
    assignee: { name: "Alex Chen", role: "Backend Dev", avatar: "👨‍💻" },
    sprint: "Sprint 2",
    samplePayload: "{\n  \"orderId\": \"ORD-928341\",\n  \"userId\": 101,\n  \"amount\": 502.50,\n  \"paymentMethod\": \"UPI\",\n  \"upiId\": \"vignesh@okhdfcbank\"\n}"
  },
  {
    id: "OFO-5",
    type: "Story",
    epicKey: "E4",
    summary: "US-05: Real-time Order Status Notification",
    userStoryStatement: {
      asA: "customer",
      iWant: "to receive real-time notifications when my order state changes",
      soThat: "I stay informed on preparation and delivery progress."
    },
    acceptanceCriteria: [
      "Notification Service listens for order state events (CONFIRMED, PREPARING, OUT_FOR_DELIVERY).",
      "Dispatches formatted message to user via Push, SMS, or Email channel.",
      "Audit trail of dispatched notifications persisted in database.",
      "Returns HTTP 202 Accepted for asynchronous notification handling."
    ],
    subTasks: [
      { id: "T-05-A", summary: "Implement Spring event listener / message consumer for order events", assignee: "Developer 2", estimatedHours: 4, isCompleted: true },
      { id: "T-05-B", summary: "Build multi-channel template engine (SMS/Push/Email)", assignee: "Developer 2", estimatedHours: 4, isCompleted: true },
      { id: "T-05-C", summary: "Integration testing for notification delivery triggers", assignee: "QA Tester", estimatedHours: 3, isCompleted: true }
    ],
    priority: "Medium",
    storyPoints: 5,
    status: "DONE",
    assignee: { name: "Sarah Jenkins", role: "Backend Dev", avatar: "👩‍💻" },
    sprint: "Sprint 2",
    samplePayload: "{\n  \"orderId\": \"ORD-928341\",\n  \"status\": \"CONFIRMED\",\n  \"message\": \"Your order #ORD-928341 at Spice Garden is confirmed!\"\n}"
  },
  {
    id: "OFO-6",
    type: "Story",
    epicKey: "E5",
    summary: "US-06: Unified Access via API Gateway",
    userStoryStatement: {
      asA: "system user / client app",
      iWant: "to access all SOA services through a single API Gateway entry point",
      soThat: "clients do not need to know individual microservice URLs and ports."
    },
    acceptanceCriteria: [
      "API Gateway reverse-proxies /restaurants/** to S1, /orders/** to S2, /payments/** to S3.",
      "Enforces JWT authentication filter before forwarding requests.",
      "Implements rate limiting (100 req/min) and unified CORS headers.",
      "Logs request metrics (latency, target service, status code) for auditing."
    ],
    subTasks: [
      { id: "T-06-A", summary: "Setup Spring Cloud Gateway / Reverse proxy route definitions", assignee: "DevOps / Lead", estimatedHours: 5, isCompleted: true },
      { id: "T-06-B", summary: "Implement JWT validation filter middleware", assignee: "Developer 1", estimatedHours: 4, isCompleted: true },
      { id: "T-06-C", summary: "Configure RateLimiter and CORS filter", assignee: "DevOps / Lead", estimatedHours: 3, isCompleted: true },
      { id: "T-06-D", summary: "End-to-end security penetration & routing verification", assignee: "QA Tester", estimatedHours: 4, isCompleted: true }
    ],
    priority: "High",
    storyPoints: 5,
    status: "DONE",
    assignee: { name: "David Kim", role: "DevOps / Architect", avatar: "🛠️" },
    sprint: "Sprint 3",
    samplePayload: "GET /api/v1/orders/ORD-928341 HTTP/1.1\nHost: gateway.foodorder.internal\nAuthorization: Bearer eyJhbGciOi..."
  }
];

export const SPRINT_DATA: SprintInfo[] = [
  {
    id: "SPRINT-1",
    name: "Sprint 1: Restaurant & Order Core Services",
    goal: "Develop, validate, and integrate the baseline Restaurant Catalog (S1) and Order Placement (S2) services with full REST APIs.",
    duration: "2 Weeks (10 Working Days)",
    totalStoryPoints: 19,
    completedStoryPoints: 19,
    status: "COMPLETED",
    startDate: "2026-08-01",
    endDate: "2026-08-14",
    dailySchedule: [
      { day: "Day 1", activity: "Sprint Planning, Backlog Refinement, and technical subtask breakdowns." },
      { day: "Day 2-4", activity: "Restaurant Service development (Entities, Repositories, REST Controllers)." },
      { day: "Day 5-7", activity: "Order Service development and Feign Client linkage to Restaurant Service." },
      { day: "Day 8-9", activity: "Contract Testing, Postman API test collection execution and verification." },
      { day: "Day 10", activity: "Sprint 1 Review demo to stakeholders and team Retrospective." }
    ]
  },
  {
    id: "SPRINT-2",
    name: "Sprint 2: Payment & Notification Services",
    goal: "Integrate secure payment processing gateway (S3) and automated multi-channel event notifications (S4).",
    duration: "2 Weeks (10 Working Days)",
    totalStoryPoints: 21,
    completedStoryPoints: 21,
    status: "COMPLETED",
    startDate: "2026-08-15",
    endDate: "2026-08-28",
    dailySchedule: [
      { day: "Day 1", activity: "Sprint Planning & Payment Gateway mock interface definition." },
      { day: "Day 2-5", activity: "Payment Service implementation & idempotent transaction handlers." },
      { day: "Day 6-7", activity: "Notification Service event consumer and messaging dispatchers." },
      { day: "Day 8-9", activity: "Order -> Payment -> Notification end-to-end integration testing." },
      { day: "Day 10", activity: "Sprint 2 Review demo & team Retrospective." }
    ]
  },
  {
    id: "SPRINT-3",
    name: "Sprint 3: API Gateway & E2E Integration",
    goal: "Expose all SOA microservices through a unified API Gateway (S5), perform end-to-end system testing, and finalize documentation.",
    duration: "2 Weeks (10 Working Days)",
    totalStoryPoints: 21,
    completedStoryPoints: 21,
    status: "ACTIVE",
    startDate: "2026-08-29",
    endDate: "2026-09-11",
    dailySchedule: [
      { day: "Day 1-3", activity: "API Gateway routing setup, reverse proxying and JWT authentication filter." },
      { day: "Day 4-6", activity: "Rate limiting, CORS policies, and centralized error logging." },
      { day: "Day 7-8", activity: "End-to-End system integration testing across all 5 SOA microservices." },
      { day: "Day 9", activity: "Swagger/OpenAPI documentation generation and lab report finalization." },
      { day: "Day 10", activity: "Final Sprint Review, Project Retrospective, and Release sign-off." }
    ]
  }
];

export const DAILY_SCRUM_LOGS: DailyScrumNote[] = [
  {
    developer: "Developer 1 (Alex Chen)",
    role: "Backend Engineer (S1 & S3 Services)",
    yesterday: "Implemented JPA Entities and Repository methods for Restaurant Service (US-01, US-02) and wrote unit tests.",
    today: "Implement PaymentController REST endpoint and mock UPI payment verification handler.",
    blockers: "None. Restaurant Service contracts are frozen and passing all tests."
  },
  {
    developer: "Developer 2 (Sarah Jenkins)",
    role: "Backend Engineer (S2 & S4 Services)",
    yesterday: "Created Order JPA entity and price calculation logic with 5% tax and delivery surcharge.",
    today: "Connect Order Service with S1 Restaurant Service via Spring Cloud Feign client to validate item availability.",
    blockers: "Waiting on final mock JSON response schema for unavailable items from Dev 1."
  },
  {
    developer: "DevOps / Architect (David Kim)",
    role: "API Gateway & Infrastructure (S5)",
    yesterday: "Configured API Gateway routing rules to forward /restaurants and /orders paths to microservice instances.",
    today: "Implement JWT validation middleware filter and test rate limiter (100 req/min).",
    blockers: "Need SSL cert configuration for local HTTPS test suite."
  },
  {
    developer: "QA Tester (Maya Patel)",
    role: "Quality Assurance & Automation",
    yesterday: "Executed Postman test collection for US-01 and US-02. Verified 200 OK and 404 Not Found error codes.",
    today: "Automate test assertions for order placement (US-03) and payment failure edge cases (US-04).",
    blockers: "Need stable mock payment gateway endpoint running on local port 8083."
  }
];

export const RETROSPECTIVE_NOTES: RetrospectiveFeedback[] = [
  {
    category: "WENT_WELL",
    content: "Clear REST contract specifications agreed upon during Day 1 avoided integration friction between S1 and S2.",
    author: "Alex Chen (Dev 1)"
  },
  {
    category: "WENT_WELL",
    content: "Automated Postman test collections enabled rapid regression testing whenever entity schemas evolved.",
    author: "Maya Patel (QA)"
  },
  {
    category: "PAINS",
    content: "Order Service development was blocked for 1 day waiting for Restaurant entity migrations to complete.",
    author: "Sarah Jenkins (Dev 2)"
  },
  {
    category: "PAINS",
    content: "Branch merge conflicts in Git during OrderRepository implementation due to long-lived feature branch.",
    author: "Alex Chen (Dev 1)"
  },
  {
    category: "ACTION_ITEMS",
    content: "Use Mockito and WireMock in early sprint days so downstream services are never blocked on upstream development.",
    author: "David Kim (Scrum Master)"
  },
  {
    category: "ACTION_ITEMS",
    content: "Enforce smaller, daily pull requests with at least one peer approval before merging to main branch.",
    author: "David Kim (Scrum Master)"
  }
];