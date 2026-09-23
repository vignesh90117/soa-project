# Experiment: Implement Agile Practices for an SOA-Based Food Ordering System using Jira

---

## 1. Project Overview & Setup in Jira

### 1.1 SOA System Architecture Overview
The Online Food Ordering System is built following Service-Oriented Architecture (SOA) principles with five decoupled core services:
- **S1: Restaurant Service** – Manages restaurant profiles, operating hours, categories, and menu item catalogs.
- **S2: Order Service** – Handles shopping cart operations, order creation, order state machine, and tracking.
- **S3: Payment Service** – Interacts with payment gateways, processes transactions, verifies funds, and handles refunds.
- **S4: Notification Service** – Dispatches real-time SMS, Email, and Push Notifications on order events.
- **S5: API Gateway** – Single entry point routing external client requests, handling rate limiting, authentication, and load balancing.

`mermaid
graph TD
    Client[Web / Mobile Client] -->|HTTP / JSON| Gateway[S5: API Gateway]
    Gateway -->|Route /restaurants| S1[S1: Restaurant Service]
    Gateway -->|Route /orders| S2[S2: Order Service]
    Gateway -->|Route /payments| S3[S3: Payment Service]
    Gateway -->|Route /notifications| S4[S4: Notification Service]
    
    S2 -->|Query Menu & Availability| S1
    S2 -->|Initiate Payment Transaction| S3
    S2 -->|Publish Order State Events| S4
`

### 1.2 Jira Project Configuration Details
- **Project Template**: Scrum Software Development
- **Project Name**: \Online Food Ordering SOA System\
- **Project Key**: \OFO\
- **Lead / Scrum Master**: Student / Team Lead
- **Estimation Statistic**: Story Points (Fibonacci Scale: 1, 2, 3, 5, 8, 13)
- **Sprint Cadence**: 2-Week Sprints (10 working days)

---

## 2. Epics Definition

In Jira: **Project ? Backlog ? Create Issue ? Issue Type: Epic**

| Epic Key | Epic Name | Description | Target Services |
| :--- | :--- | :--- | :--- |
| **E1** | **Restaurant Management** | Manage restaurant listings, availability, and hierarchical menu item catalogs. | S1 - Restaurant Service |
| **E2** | **Order Management** | Create, validate, calculate, and track lifecycle state of customer food orders. | S2 - Order Service |
| **E3** | **Payment Management** | Securely process, validate, and record online customer payments and refunds. | S3 - Payment Service |
| **E4** | **Notification Service** | Dispatch automated alerts (SMS, Push, Email) to customers upon order status updates. | S4 - Notification Service |
| **E5** | **API Gateway & Routing** | Provide unified reverse proxy, authentication, route management, and rate limiting. | S5 - API Gateway |

---

## 3. User Stories & Acceptance Criteria

Format: *As a [user], I want [functionality], so that [benefit].*

### Epic E1 – Restaurant Management

#### **US-01: View Restaurants**
- **User Story**: *As a customer, I want to view a list of available restaurants with their details and locations so that I can select a suitable restaurant for ordering food.*
- **Acceptance Criteria**:
  1. Customer can query \GET /api/v1/restaurants\ with optional query params (\location\, \cuisine\, \page\, \limit\).
  2. Each restaurant record includes: \id\, \
ame\, \ddress\, \ating\, \cuisineType\, and \isOpen\.
  3. API returns HTTP \200 OK\ on success with valid JSON payload.
  4. Response time is under 200ms for p95 requests.
- **Example Response JSON**:
\\\json
[
  {
    "restaurantId": 10,
    "name": "Spice Garden",
    "location": "Downtown Central",
    "cuisine": "Indian / Continental",
    "rating": 4.6,
    "isOpen": true
  }
]
\\\

#### **US-02: View Menu Items**
- **User Story**: *As a customer, I want to view a specific restaurant's menu categorized by food types so that I can choose items to add to my cart.*
- **Acceptance Criteria**:
  1. Customer can query \GET /api/v1/restaurants/{restaurantId}/menu\.
  2. Returns items categorized into Starters, Main Course, Desserts, and Beverages.
  3. Each item displays \itemId\, \
ame\, \description\, \price\, \isVeg\, and \isAvailable\.
  4. Returns HTTP \404 Not Found\ if the \estaurantId\ does not exist.
  5. Returns HTTP \200 OK\ with full catalog when valid.

---

### Epic E2 – Order Management

#### **US-03: Create Order**
- **User Story**: *As a customer, I want to place an order with selected menu items and quantities so that I can purchase food from a chosen restaurant.*
- **Acceptance Criteria**:
  1. Customer sends \POST /api/v1/orders\ containing \userId\, \estaurantId\, delivery address, and an array of \items\ (\itemId\, \quantity\).
  2. Order Service validates item availability against Restaurant Service.
  3. Total order amount is calculated automatically with taxes and delivery fee.
  4. New order is persisted with initial state \CREATED\ / \PENDING_PAYMENT\.
  5. API responds with HTTP \201 Created\ returning generated \orderId\, \	otalAmount\, and timestamp.
- **Request Payload JSON**:
\\\json
{
  "userId": 101,
  "restaurantId": 10,
  "deliveryAddress": "42 West End Blvd, Suite 4B",
  "items": [
    {
      "itemId": 501,
      "quantity": 2
    },
    {
      "itemId": 504,
      "quantity": 1
    }
  ]
}
\\\
- **Response Payload JSON**:
\\\json
{
  "orderId": "ORD-928341",
  "userId": 101,
  "restaurantId": 10,
  "status": "PENDING_PAYMENT",
  "subTotal": 450.00,
  "tax": 22.50,
  "deliveryFee": 30.00,
  "totalAmount": 502.50,
  "createdAt": "2026-08-26T14:30:00Z"
}
\\\

---

### Epic E3 – Payment Management

#### **US-04: Process Order Payment**
- **User Story**: *As a customer, I want to make a secure digital payment for my order so that my food order is confirmed and sent to the kitchen.*
- **Acceptance Criteria**:
  1. Payment Service exposes \POST /api/v1/payments/charge\.
  2. Validates \orderId\, \mount\, and payment credentials (Card/UPI/Wallet).
  3. Returns transaction ID and status (\SUCCESS\ / \FAILED\).
  4. On \SUCCESS\, triggers an internal event/callback updating Order status to \CONFIRMED\.
  5. Returns HTTP \200 OK\ for success or HTTP \402 Payment Required\ for failures.
- **Request Payload JSON**:
\\\json
{
  "orderId": "ORD-928341",
  "userId": 101,
  "amount": 502.50,
  "paymentMethod": "UPI",
  "upiId": "vignesh@okhdfcbank"
}
\\\

---

### Epic E4 – Notification Service

#### **US-05: Receive Order Status Notification**
- **User Story**: *As a customer, I want to receive real-time notification alerts (Push/SMS/Email) upon order status changes so that I stay updated on delivery progress.*
- **Acceptance Criteria**:
  1. Service consumes \OrderConfirmedEvent\ or receives \POST /api/v1/notifications/send\.
  2. Generates formatted notification: *"Your order #ORD-928341 at Spice Garden is CONFIRMED and being prepared!"*.
  3. Dispatches message to user's registered communication channel.
  4. Logs delivery status and retry history in audit database.
  5. Returns HTTP \202 Accepted\ for async dispatch.

---

### Epic E5 – API Gateway

#### **US-06: Unified Entry Point via API Gateway**
- **User Story**: *As a system client (Web/Mobile App), I want to route all API calls through a centralized API Gateway so that I don't need to track individual microservice hostnames or ports.*
- **Acceptance Criteria**:
  1. Gateway routes \/api/v1/restaurants/**\ ? Restaurant Service.
  2. Gateway routes \/api/v1/orders/**\ ? Order Service.
  3. Gateway routes \/api/v1/payments/**\ ? Payment Service.
  4. Implements JWT validation middleware before forwarding requests.
  5. Provides unified CORS headers and rate limiting (100 req/min per IP).

---

## 4. Technical Task Breakdown (Subtasks in Jira)

Each User Story is broken down into granular engineering tasks:

### Task Breakdown for **US-03 (Create Order)**
| Task ID | Task Summary | Assignee | Est. Hours |
| :--- | :--- | :--- | :--- |
| **T-01** | Setup Spring Boot Order Service project scaffold and dependencies | Developer 1 | 3h |
| **T-02** | Design JPA Entities (\Order\, \OrderItem\, \OrderStatus\ enum) & migrations | Developer 1 | 4h |
| **T-03** | Create Spring Data \OrderRepository\ interface with custom queries | Developer 1 | 2h |
| **T-04** | Build \OrderService\ business logic (price calculation, status transition) | Developer 2 | 6h |
| **T-05** | Integrate REST Client (Feign / WebClient) to verify items with Restaurant Service | Developer 2 | 5h |
| **T-06** | Develop \OrderController\ exposing \POST /api/v1/orders\ and validation | Developer 1 | 4h |
| **T-07** | Write Unit Tests (JUnit 5 + Mockito) & Integration Tests (MockMvc) | Developer 2 | 5h |
| **T-08** | Execute API testing suite in Postman and attach collections to Jira | Tester | 3h |

---

## 5. Product Backlog & Story Point Estimations

| Issue ID | Issue Type | Epic | Summary | Priority | Story Points |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **OFO-1** | Story | E1 | US-01: View Restaurants list with filters | Highest | **3** |
| **OFO-2** | Story | E1 | US-02: View categorized Restaurant Menu | Highest | **5** |
| **OFO-3** | Story | E2 | US-03: Create and place new food order | Highest | **8** |
| **OFO-4** | Story | E3 | US-04: Process online order payment | High | **8** |
| **OFO-5** | Story | E4 | US-05: Send real-time order status notifications | Medium | **5** |
| **OFO-6** | Story | E5 | US-06: Unified routing & security via API Gateway | High | **5** |
| **OFO-7** | Task | S1/S2 | Service-to-Service Integration & Contract Testing | High | **5** |
| **OFO-8** | Task | S1-S5 | End-to-End System Integration Testing | High | **5** |
| **OFO-9** | Task | S1-S5 | Postman API Automation Test Suite Setup | Medium | **3** |
| **OFO-10**| Task | Doc | Swagger / OpenAPI Documentation & Lab Report | Medium | **3** |
| **OFO-11**| Bug | S3/S2 | Bug Fix: Payment timeout order reconciliation | High | **3** |
| **Total Story Points** | | | | | **50 SP** |

---

## 6. Sprint Planning (3 Sprints x 2 Weeks)

### Sprint 1: Restaurant & Order Core Services
- **Duration**: 2 Weeks (10 Working Days)
- **Sprint Goal**: *Deliver functional Restaurant Catalog and Order Placement services with validated REST endpoints.*
- **Committed Scope**:
  - \OFO-1\ (US-01: View Restaurants) – 3 SP
  - \OFO-2\ (US-02: View Menu) – 5 SP
  - \OFO-3\ (US-03: Create Order) – 8 SP
  - \OFO-9\ (API Testing in Postman) – 3 SP
- **Total Velocity / Capacity**: **19 Story Points**

**Sprint 1 Schedule**:
- **Day 1**: Sprint Planning, Backlog Refinement & Task breakdown.
- **Day 2–4**: S1 Restaurant Service development (Entity, Repository, Controller).
- **Day 5–7**: S2 Order Service implementation & Feign client integration with S1.
- **Day 8–9**: Contract testing, Postman API test collection execution.
- **Day 10**: Sprint 1 Demo, Review & Retrospective.

---

### Sprint 2: Payment & Notification Services
- **Duration**: 2 Weeks (10 Working Days)
- **Sprint Goal**: *Integrate secure payment processing and automated multi-channel order status notifications.*
- **Committed Scope**:
  - \OFO-4\ (US-04: Make Payment) – 8 SP
  - \OFO-5\ (US-05: Order Notification) – 5 SP
  - \OFO-7\ (Payment ? Order Integration Testing) – 5 SP
  - \OFO-11\ (Payment status error handling & bug fixing) – 3 SP
- **Total Velocity / Capacity**: **21 Story Points**

**Sprint 2 Schedule**:
- **Day 1**: Sprint Planning & Payment Gateway mock setup.
- **Day 2–5**: S3 Payment Service implementation & idempotent transaction handlers.
- **Day 6–7**: S4 Notification Service event consumer development.
- **Day 8–9**: Integrated Order-to-Payment-to-Notification end-to-end workflow verification.
- **Day 10**: Sprint 2 Review & Retrospective.

---

### Sprint 3: API Gateway, Integration & Delivery
- **Duration**: 2 Weeks (10 Working Days)
- **Sprint Goal**: *Expose all SOA microservices through a secure API Gateway, conduct end-to-end load testing, and finalize documentation.*
- **Committed Scope**:
  - \OFO-6\ (US-06: API Gateway & Routing) – 5 SP
  - \OFO-8\ (End-to-End System Testing across S1–S5) – 5 SP
  - \OFO-10\ (OpenAPI Swagger Documentation & Final Report) – 3 SP
  - Postman Automated Regression & Bug Fixing – 5 SP
  - Deployment & Release Packaging – 3 SP
- **Total Velocity / Capacity**: **21 Story Points**

---

## 7. Jira Workflow & Scrum Board

### 7.1 State Machine Transition
\\\
[ BACKLOG ] --? [ TO DO ] --? [ IN PROGRESS ] --? [ CODE REVIEW ] --? [ TESTING / QA ] --? [ DONE ]
\\\

### 7.2 Scrum Board Snapshot (Active Sprint Mid-Point)

| TO DO (4) | IN PROGRESS (2) | CODE REVIEW (1) | TESTING / QA (1) | DONE (3) |
| :--- | :--- | :--- | :--- | :--- |
| **OFO-4**: Payment Processing | **OFO-3**: Create Order Logic (\T-04\) | **T-03**: OrderRepository PR | **OFO-1**: View Restaurants API | **OFO-2**: Menu Service (\US-02\) |
| **OFO-5**: Notification Trigger | **T-05**: Feign Client linking S1-S2 | | **T-06**: Order Controller Testing | **T-01**: Service Scaffolding |
| | | | | **T-02**: Database Entities |

---

## 8. Daily Scrum (Stand-Up) Log Examples

### Developer 1 (Backend - Restaurant & Order Services)
1. **What did I complete yesterday?**
   - Implemented JPA Entities and Repository methods for \Order\ and \OrderItem\.
   - Wrote unit tests for order total calculation logic.
2. **What will I work on today?**
   - Implement \OrderController\ REST endpoints (\POST /api/v1/orders\).
   - Configure Feign Client connection to Restaurant Service.
3. **Are there any blockers?**
   - *No blockers. Restaurant Service contracts are frozen.*

### Developer 2 (Backend - Payment & Notifications)
1. **What did I complete yesterday?**
   - Created the mock payment gateway connector in \PaymentService\.
2. **What will I work on today?**
   - Implement asynchronous callback to update order status upon payment confirmation.
3. **Are there any blockers?**
   - *Waiting for the updated Order State event schema definition from Developer 1.*

### QA / Tester
1. **What did I complete yesterday?**
   - Executed Postman collections for Restaurant Service (\US-01\, \US-02\). Verified 200 OK and 404 error responses.
2. **What will I work on today?**
   - Automate test assertions for order placement with invalid item quantities.
3. **Are there any blockers?**
   - *Need local deployment of Order Service instance for regression runs.*

---

## 9. Definition of Done (DoD)

Before any Jira Story transitions to **DONE**, the following criteria must be satisfied:

\text{DONE} = \text{Code Complete} + \text{Peer Reviewed} + \text{Unit Tested} + \text{Postman Tested} + \text{Acceptance Criteria Satisfied}

- [x] **Code Quality**: Clean code complying with Java/Spring style guides; static analysis passes without critical warnings.
- [x] **Peer Review**: At least 1 approved Pull Request in Git with review comments resolved.
- [x] **Unit Testing**: Line coverage >= 80% with all unit test assertions passing.
- [x] **API Testing**: Tested via Postman collection; positive, negative, and edge test cases documented.
- [x] **Integration**: Service successfully communicates with upstream and downstream dependencies.
- [x] **Acceptance Criteria**: All business rules specified in the User Story verified.
- [x] **Documentation**: Swagger/OpenAPI documentation updated.
- [x] **Jira Hygiene**: All child subtasks closed, work logged, and test evidence attached.

---

## 10. Sprint Review & Sprint Retrospective

### 10.1 Sprint 1 Review (Demo to Stakeholders)
- **Completed Work**: Delivered \US-01\ (View Restaurants), \US-02\ (View Menu), and \US-03\ (Create Order). 19 Story Points achieved.
- **Demonstration**:
  1. Demonstrated calling \GET /api/v1/restaurants\ in Postman returning active restaurants.
  2. Demonstrated querying restaurant menu with categorized items.
  3. Placed an order with multiple items via \POST /api/v1/orders\; verified \201 Created\ with accurate price and tax calculations.
- **Feedback**: Stakeholders requested adding delivery address validation in Sprint 2.

### 10.2 Sprint 1 Retrospective (Team Continuous Improvement)

| What Went Well (Keep doing) | What Didn't Go Well (Pains) | Action Items (Next Sprint) |
| :--- | :--- | :--- |
| Early API contract agreement between S1 and S2 avoided integration friction. | S2 depended on S1 entity updates which delayed Order testing by 1 day. | Use Mockito / WireMock to simulate dependent services earlier. |
| Jira subtask tracking kept work transparent. | Branch merge conflicts on \OrderRepository\. | Enforce smaller, feature-scoped branches and daily merges. |

---

## 11. Final Jira Practical Report Summary

| Metric | Planned | Actual Achieved | Status |
| :--- | :--- | :--- | :--- |
| **Total Epics** | 5 | 5 | Complete |
| **User Stories** | 6 | 6 | Complete |
| **Total Sprints** | 3 | 3 | Complete |
| **Total Story Points** | 50 SP | 50 SP | 100% Velocity |
| **Defects Closed** | 4 | 4 | Zero Open Bugs |
| **Postman API Test Coverage** | 24 Scenarios | 24 Scenarios Passing | Verified |

### Conclusion
By utilizing Jira's Agile Scrum framework for this SOA-based Online Food Ordering System, requirements were systematically broken down from high-level business **Epics** into testable **User Stories** and technical **Tasks**. Iterative development across three 2-week sprints ensured decoupled microservice delivery, automated quality gates via a robust **Definition of Done**, and transparent team communication through **Daily Scrums** and **Retrospectives**.
