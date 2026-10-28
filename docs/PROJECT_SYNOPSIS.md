# Project Synopsis & Academic Documentation

## Project Details
- **Project Title:** Link Intelligence and Analytics Dashboard
- **Academic Institution:** GLA University, Mathura
- **Department:** Computer Engineering & Applications
- **Student Name:** Abhinav Gautam
- **University Roll Number:** 2415000031
- **Assigned Module:** HTML + Dashboard UI Foundation
- **Faculty Mentor:** Mr. Gagan Vishwakarma

---

## 1. Project Overview & Objectives
The **Link Intelligence and Analytics Dashboard** is a web-based demonstration platform designed to illustrate the operational mechanics of link telemetry, simulated visitor analytics, and deterministic rule-based fraud-risk assessment.

The application operates **entirely on the client side**:
- It demonstrates link creation and tracking concepts without executing real URL redirection or requiring external DNS/proxy servers.
- It models synthetic clickstream behavior—distinguishing legitimate human browsing patterns from automated scrapers, crawlers, and click-burst bots.
- It computes transparent risk scores using an in-browser heuristics engine rather than black-box models or server-side surveillance.

### Key Tenet: Simulation Transparency
All traffic metrics, user-agent profiles, referrers, and risk classifications shown in this dashboard are generated synthetically for academic demonstration. The system does not collect actual user tracking data or contact external analytics endpoints.

---

## 2. Division of Responsibilities & Modular Architecture

| Module | Assigned Student / Role | Scope & Deliverables | Integration Surface |
| :--- | :--- | :--- | :--- |
| **HTML + Dashboard UI** | **Abhinav Gautam (2415000031)** | Semantic HTML5 application shell, navigation drawer, metric cards, URL creation interface, data tables, analytics containers, fraud-risk panels, accessibility (ARIA), and academic attributions. | DOM Elements, standard IDs, semantic class names, data-target attributes. |
| **CSS & Responsive Styling** | Teammate (CSS Lead) | Modern design system, responsive flexbox/grid layouts, color tokens, typography, dark/light theme accents, and mobile breakpoints. | `css/style.css`, CSS variables, BEM-compatible selectors. |
| **Traffic Simulation Engine** | Teammate (Simulation Lead) | Client-side synthetic click and bot traffic generator, randomized user-agent profiles, referrer sources, and burst event generators. | `js/simulation.js`, `TrafficSimulator` class API. |
| **Analytics & Rule Engine** | Teammate (Analytics & Security Lead) | SVG/Canvas visual rendering, click activity over time, ratio charts, and local deterministic fraud-risk rules engine. | `js/analytics.js`, `js/risk-engine.js`, `AnalyticsEngine` & `RiskEngine` APIs. |

---

## 3. Module Specification: Abhinav Gautam (HTML + Dashboard UI)
As assigned, Abhinav Gautam's responsibility encompasses the foundational user interface and markup architecture:

1. **Application Shell & Navigation:**
   - Semantic header with identity, live status pulse, and simulated mode indicator.
   - Accessible sidebar navigation with section switching (`#overview`, `#analytics`, `#traffic-insights`, `#fraud-risk`, `#about-project`).
   - Sticky header actions for simulation controls (Traffic Burst, Bot Spike, Reset).
   - Informative footer with GLA University academic attribution.

2. **Dashboard Overview:**
   - Prominent Demo Notice banner explicitly declaring simulated telemetry.
   - Six core summary cards: Total Clicks, Human Traffic, Bot Traffic, Bot Traffic Percentage, Active Links, and Overall Fraud-Risk Level.

3. **Link Creation & Management:**
   - Form for destination URL input with HTML5 validation, campaign category selector, and tag field.
   - Visual result card for generated demo link with one-click copy and test click simulation.
   - Interactive link management table displaying destination, demo ID, campaign, click volume, bot ratio, and risk status.

4. **Analytics & Traffic Insights Structures:**
   - Dedicated visualization containers for click activity over time, human-to-bot ratio donut, device distribution, referrer origins, and regional telemetry.
   - Filter dropdowns enabling aggregate or link-specific inspection.

5. **Fraud-Risk Section:**
   - Risk score badge (Low, Medium, High).
   - Transparent rule breakdown matrix displaying heuristic triggers.
   - Live audit stream of flagged suspicious click events.

6. **Academic & Project Metadata:**
   - Dedicated "About Project" section detailing GLA University credentials, faculty mentorship, student roll number, and module documentation.
