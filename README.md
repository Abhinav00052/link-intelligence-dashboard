# Link Intelligence and Analytics Dashboard

An academic web demonstration platform showcasing simulated link telemetry, real-time client-side traffic modeling, and deterministic rule-based fraud-risk assessment.

---

## 🏛️ Academic Credentials

- **Institution:** GLA University, Mathura
- **Department:** Computer Engineering & Applications (CEA)
- **Student Name:** Abhinav Gautam
- **University Roll Number:** `2415000031`
- **Assigned Module:** HTML Structure & Dashboard UI Foundation
- **Faculty Mentor:** Mr. Gagan Vishwakarma
- **Academic Term:** 2026

---

## 📋 Project Synopsis

> *"I am developing a web-based dashboard that demonstrates link intelligence, simulated link analytics, and rule-based fraud-risk assessment. The system generates simulated click and bot-traffic data entirely on the client side. It does not perform real URL shortening or redirection, collect real user traffic, or require a backend server.*
> 
> *My responsibility is to implement the HTML structure and dashboard UI foundation. Other team members are responsible for CSS and responsive styling, JavaScript-based click/bot traffic simulation, and charts/analytics plus the fraud-risk rules engine."*

---

## 🎯 Abhinav's Module: HTML & Dashboard UI

This module establishes the foundational markup, semantic hierarchy, and user interface surfaces for the entire Link Intelligence product suite:

### 1. Application Shell & Navigation
- **Semantic Structure:** Accessible HTML5 landmark elements (`<header role="banner">`, `<aside role="navigation">`, `<main role="main">`, `<footer role="contentinfo">`, `<section>`, `<article>`).
- **Interactive Navigation Menu:**
  - `Overview` (`#overview`): High-level executive telemetry summaries.
  - `Link Management` (`#link-management`): Creation and inspection of tracked demo links.
  - `Link Analytics` (`#link-analytics`): Time-series click metrics, velocity, and user-agent fingerprints.
  - `Traffic Insights` (`#traffic-insights`): Referrer channels and geographic origin hubs.
  - `Fraud & Risk` (`#fraud-risk`): Transparent rule evaluation matrix and suspicious event audit log.
  - `About Project` (`#about-project`): Academic credentials and division of responsibilities.
- **Top Bar Controls:**
  - Animated live simulation status badge.
  - Academic attribution pill (GLA University • Roll: 2415000031).
  - Quick simulation triggers: `+25 Mixed Clicks`, `+15 Bot Spike`, and `Reset Data`.

### 2. Executive Overview & Metric Cards
- **Simulation Notice Banner:** Prominently clarifies that all telemetry is client-side synthetic modeling.
- **Six Core Telemetry Cards:**
  1. **Total Clicks:** Cumulative interactions modeled across tracked links.
  2. **Human Traffic:** Organic visitor sessions with standard dwell intervals.
  3. **Bot Traffic:** Automated scrapers, headless agents, and synthetic click generators.
  4. **Bot Traffic Percentage & Progress Meter:** Visual indicator with dynamic threshold coloring (Green <20%, Amber 20–40%, Red >40%).
  5. **Active Tracked Links:** Count of simulated demo links currently resident in memory.
  6. **Overall Fraud-Risk Level:** Dynamic badge (`LOW`, `MEDIUM`, `HIGH`) driven by heuristic scoring.

### 3. Demo Link Creation & Management
- **URL Creation Form:** Accessible form inputs with HTML5 validation, campaign category selector (`Research`, `Social`, `Marketing`, `Direct`), reference tags, and pre-fill presets.
- **Result Showcase:** Generated short-link display (`demo.link/glx-xxxx`) with one-click clipboard copying and instant single-click/burst simulation triggers.
- **Tracked Links Catalog Table:** Searchable and filterable data table displaying original URLs, demo links, click counts, human/bot splits, bot rates, and inline simulation triggers.

### 4. Deep-Dive Analytics & Traffic Insights
- **Link Filtering:** Selector allowing aggregate views or per-link deep-dive metrics.
- **HTML5 Canvas Time-Series Visualizer:** Dual-curve rendering comparing human vs. bot volume across simulated intervals.
- **Traffic Fingerprints:** Breakdown of desktop browsers, mobile agents, headless scrapers (Puppeteer/Curl/Python), and search crawlers.
- **Referrer Sources & Regional Telemetry:** Distribution across direct, research portals, social media, and flagged data center/Tor proxies.

### 5. Rule-Based Fraud-Risk Engine
- **Hero Risk Scorecard:** Visual circular risk gauge (0–100) and qualitative risk diagnosis.
- **Heuristic Evaluation Matrix:**
  - **Rule #1:** Bot Ratio Threshold (>25% Warn, >45% Alert).
  - **Rule #2:** High-Frequency Click Burst Velocity (>12 clicks in short intervals).
  - **Rule #3:** Anomalous Headless User-Agent Signatures (>15% scraper presence).
  - **Rule #4:** Subnet IP Concentration (repetitive hits from identical `/24` subnets).
- **Suspicious Event Audit Log:** Real-time chronological table tracking flagged events with timestamps, shortcodes, synthetic IPs, user-agents, and severity tags.

---

## 👥 Team Collaboration & Module Boundaries

| Team Module | Assigned Owner | Scope & Implementation | Integration Hook |
| :--- | :--- | :--- | :--- |
| **HTML + Dashboard UI** | **Abhinav Gautam (2415000031)** | Semantic markup, component boundaries, accessible forms, tables, metric containers, and academic attribution. | `index.html`, `about.html`, DOM IDs |
| **CSS & Responsive Styling** | Teammate (CSS Lead) | Enterprise design system, responsive layouts, color tokens, typography, dark theme accents, and animations. | `css/style.css` |
| **Traffic Simulation Engine** | Teammate (Simulation Lead) | In-browser synthetic click generation, randomized user agents, referrers, and burst events. | `js/simulation.js`, `window.SimulationEngine` |
| **Analytics & Risk Engine** | Teammate (Analytics Lead) | Canvas timeline rendering, ratio calculations, and deterministic heuristic risk rules. | `js/analytics.js`, `js/risk-engine.js` |

---

## 🚀 Running & Testing the Project

The application requires **zero external build steps or dependencies** and runs directly in any modern web browser.

### Option 1: Direct File Launch
Double-click `index.html` in your file explorer to open it in Chrome, Edge, Firefox, or Safari.

### Option 2: Local HTTP Server (Python)
To serve the files over local HTTP:
```bash
# Navigate to the project directory
cd link-intelligence-dashboard

# Start Python's built-in HTTP server
python -m http.server 8000
```
Then visit `http://localhost:8000` in your web browser.

---

## 🌳 Git Feature Branch Workflow

In accordance with strict team development practices:
- **Base Branch:** `main`
- **Active Feature Branch:** `feature/abhinav-dashboard-ui`
- **Commit Message:** `feat: implement link analytics dashboard HTML UI`
- **Policy:** No direct commits to `main`; clean feature branch isolation.

