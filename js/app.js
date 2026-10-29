/**
 * Link Intelligence & Analytics Dashboard — Master Application Coordinator
 * Student Module: HTML + Dashboard UI Integration (Abhinav Gautam, Roll: 2415000031)
 * Department: Computer Engineering & Applications, GLA University
 */

(function () {
  'use strict';

  // DOM Elements Cache
  const DOM = {
    // Navigation & Shell
    sidebar: document.getElementById('appSidebar'),
    sidebarToggleBtn: document.getElementById('sidebarToggleBtn'),
    navLinks: document.querySelectorAll('.nav-link, .nav-shortcut-btn'),
    sections: document.querySelectorAll('.dashboard-section'),
    sidebarRiskBadge: document.getElementById('sidebarRiskBadge'),
    dismissBannerBtn: document.getElementById('dismissBannerBtn'),
    demoNoticeBanner: document.querySelector('.demo-notice-banner'),

    // Top Controls
    quickTrafficBurstBtn: document.getElementById('quickTrafficBurstBtn'),
    quickBotSpikeBtn: document.getElementById('quickBotSpikeBtn'),
    resetSimulationBtn: document.getElementById('resetSimulationBtn'),

    // Overview Metric Elements
    metricTotalClicks: document.getElementById('metricTotalClicks'),
    metricHumanTraffic: document.getElementById('metricHumanTraffic'),
    metricHumanShare: document.getElementById('metricHumanShare'),
    metricBotTraffic: document.getElementById('metricBotTraffic'),
    metricBotShare: document.getElementById('metricBotShare'),
    metricBotPercentage: document.getElementById('metricBotPercentage'),
    botRatioProgressBar: document.getElementById('botRatioProgressBar'),
    botRatioProgressFill: document.getElementById('botRatioProgressFill'),
    metricBotStatusTag: document.getElementById('metricBotStatusTag'),
    metricActiveLinks: document.getElementById('metricActiveLinks'),
    metricRiskBadge: document.getElementById('metricRiskBadge'),
    metricRiskScore: document.getElementById('metricRiskScore'),
    refreshOverviewBtn: document.getElementById('refreshOverviewBtn'),

    // Donut & Overview Breakdown
    donutSegmentHuman: document.getElementById('donutSegmentHuman'),
    donutSegmentBot: document.getElementById('donutSegmentBot'),
    donutCenterPct: document.getElementById('donutCenterPct'),
    compHumanCount: document.getElementById('compHumanCount'),
    compHumanBar: document.getElementById('compHumanBar'),
    compBotCount: document.getElementById('compBotCount'),
    compBotBar: document.getElementById('compBotBar'),
    compFlaggedCount: document.getElementById('compFlaggedCount'),
    compFlaggedBar: document.getElementById('compFlaggedBar'),

    // Charts
    overviewTimelineCanvas: document.getElementById('overviewTimelineCanvas'),
    analyticsTimeSeriesCanvas: document.getElementById('analyticsTimeSeriesCanvas'),

    // Link Creation Form
    linkCreationForm: document.getElementById('linkCreationForm'),
    destinationUrlInput: document.getElementById('destinationUrlInput'),
    linkCategorySelect: document.getElementById('linkCategorySelect'),
    linkTagInput: document.getElementById('linkTagInput'),
    generateDemoLinkBtn: document.getElementById('generateDemoLinkBtn'),
    resetFormBtn: document.getElementById('resetFormBtn'),
    urlValidationFeedback: document.getElementById('urlValidationFeedback'),
    generatedLinkResultCard: document.getElementById('generatedLinkResultCard'),
    resultShortUrl: document.getElementById('resultShortUrl'),
    resultDestinationUrl: document.getElementById('resultDestinationUrl'),
    copyShortUrlBtn: document.getElementById('copyShortUrlBtn'),
    simulateSingleClickBtn: document.getElementById('simulateSingleClickBtn'),
    simulateSingleBotBtn: document.getElementById('simulateSingleBotBtn'),
    simulateBurstBtn: document.getElementById('simulateBurstBtn'),

    // Link Table & Filter
    demoLinksTable: document.getElementById('demoLinksTable'),
    linkTableBody: document.getElementById('linkTableBody'),
    emptyLinkState: document.getElementById('emptyLinkState'),
    loadSampleLinksBtn: document.getElementById('loadSampleLinksBtn'),
    linkTableSearch: document.getElementById('linkTableSearch'),
    linkTableFilter: document.getElementById('linkTableFilter'),

    // Analytics Deep-Dive
    analyticsLinkSelector: document.getElementById('analyticsLinkSelector'),
    analyticsVelocity: document.getElementById('analyticsVelocity'),
    analyticsDwell: document.getElementById('analyticsDwell'),
    analyticsBounce: document.getElementById('analyticsBounce'),
    analyticsPeak: document.getElementById('analyticsPeak'),

    // Fraud & Risk Elements
    riskHeroScoreNumber: document.getElementById('riskHeroScoreNumber'),
    riskHeroBadge: document.getElementById('riskHeroBadge'),
    riskSummaryText: document.getElementById('riskSummaryText'),
    riskScoreCircle: document.getElementById('riskScoreCircle'),
    triggerBotSpikeActionBtn: document.getElementById('triggerBotSpikeActionBtn'),
    ruleStatusBotRatio: document.getElementById('ruleStatusBotRatio'),
    ruleValBotRatio: document.getElementById('ruleValBotRatio'),
    ruleStatusVelocity: document.getElementById('ruleStatusVelocity'),
    ruleValVelocity: document.getElementById('ruleValVelocity'),
    ruleStatusUserAgent: document.getElementById('ruleStatusUserAgent'),
    ruleValUserAgent: document.getElementById('ruleValUserAgent'),
    ruleStatusIpConcentration: document.getElementById('ruleStatusIpConcentration'),
    ruleValIpConcentration: document.getElementById('ruleValIpConcentration'),
    suspiciousEventsTableBody: document.getElementById('suspiciousEventsTableBody'),
    clearAuditLogBtn: document.getElementById('clearAuditLogBtn')
  };

  /**
   * Initializes the Application and Sets up Event Handlers
   */
  function init() {
    setupNavigation();
    setupSidebarToggle();
    setupSimulationToolbar();
    setupLinkCreationForm();
    setupLinkTableEvents();
    setupDeepDiveAnalytics();
    setupFraudRiskActions();

    // Subscribe to simulation telemetry updates
    if (window.SimulationEngine) {
      window.SimulationEngine.subscribe(handleTelemetryUpdate);
      // Initial render with current state
      handleTelemetryUpdate(window.SimulationEngine.getSummary());
    }

    // Handle Window Resize for responsive charts
    window.addEventListener('resize', debounce(() => {
      renderCharts();
    }, 200));
  }

  /* ------------------------------------------------------------------------
     1. Navigation & Shell Handling
     ------------------------------------------------------------------------ */
  function setupNavigation() {
    DOM.navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('data-target');
        if (!targetId) return;

        e.preventDefault();
        navigateToSection(targetId);

        // Update URL hash without jumping
        const hash = link.getAttribute('href');
        if (hash) history.replaceState(null, '', hash);

        // Close sidebar on mobile
        if (window.innerWidth <= 768 && DOM.sidebar) {
          DOM.sidebar.classList.remove('mobile-open');
        }
      });
    });

    // Check initial hash on page load
    const currentHash = window.location.hash;
    if (currentHash) {
      const matchingLink = Array.from(DOM.navLinks).find(l => l.getAttribute('href') === currentHash);
      if (matchingLink) {
        const targetId = matchingLink.getAttribute('data-target');
        if (targetId) navigateToSection(targetId);
      }
    }

    // Dismiss banner
    if (DOM.dismissBannerBtn && DOM.demoNoticeBanner) {
      DOM.dismissBannerBtn.addEventListener('click', () => {
        DOM.demoNoticeBanner.style.display = 'none';
      });
    }
  }

  function navigateToSection(sectionId) {
    DOM.sections.forEach(sec => {
      if (sec.id === sectionId) {
        sec.classList.add('active');
      } else {
        sec.classList.remove('active');
      }
    });

    DOM.navLinks.forEach(link => {
      if (link.getAttribute('data-target') === sectionId) {
        link.classList.add('active');
      } else if (link.classList.contains('nav-link')) {
        link.classList.remove('active');
      }
    });

    // Redraw charts if entering overview or analytics
    if (sectionId === 'section-overview' || sectionId === 'section-analytics') {
      setTimeout(() => renderCharts(), 50);
    }
  }

  function setupSidebarToggle() {
    if (!DOM.sidebarToggleBtn || !DOM.sidebar) return;
    DOM.sidebarToggleBtn.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        DOM.sidebar.classList.toggle('mobile-open');
      } else {
        DOM.sidebar.classList.toggle('collapsed');
      }
      setTimeout(() => renderCharts(), 260);
    });
  }

  /* ------------------------------------------------------------------------
     2. Simulation Toolbar Controls
     ------------------------------------------------------------------------ */
  function setupSimulationToolbar() {
    if (DOM.quickTrafficBurstBtn) {
      DOM.quickTrafficBurstBtn.addEventListener('click', () => {
        if (window.SimulationEngine) {
          window.SimulationEngine.simulateBurst(null, 25, 0.2);
          showTransientNotification('Generated +25 mixed simulated clicks');
        }
      });
    }

    if (DOM.quickBotSpikeBtn) {
      DOM.quickBotSpikeBtn.addEventListener('click', () => {
        if (window.SimulationEngine) {
          window.SimulationEngine.simulateBotSpike(15);
          showTransientNotification('Simulated automated bot traffic surge (+15 events)');
        }
      });
    }

    if (DOM.resetSimulationBtn) {
      DOM.resetSimulationBtn.addEventListener('click', () => {
        if (window.SimulationEngine) {
          window.SimulationEngine.reset();
          showTransientNotification('Telemetry reset to baseline demo state');
        }
      });
    }

    if (DOM.refreshOverviewBtn) {
      DOM.refreshOverviewBtn.addEventListener('click', () => {
        if (window.SimulationEngine) {
          handleTelemetryUpdate(window.SimulationEngine.getSummary());
          showTransientNotification('Metrics refreshed');
        }
      });
    }
  }

  /* ------------------------------------------------------------------------
     3. Link Creation & Preset Fill Handling
     ------------------------------------------------------------------------ */
  function setupLinkCreationForm() {
    if (!DOM.linkCreationForm) return;

    // Preset button handlers
    document.querySelectorAll('.btn-preset').forEach(btn => {
      btn.addEventListener('click', () => {
        const url = btn.getAttribute('data-url');
        const cat = btn.getAttribute('data-category');
        const tag = btn.getAttribute('data-tag');
        if (DOM.destinationUrlInput) DOM.destinationUrlInput.value = url;
        if (DOM.linkCategorySelect && cat) DOM.linkCategorySelect.value = cat;
        if (DOM.linkTagInput && tag) DOM.linkTagInput.value = tag;
        clearValidationAlert();
      });
    });

    // Form submission
    DOM.linkCreationForm.addEventListener('submit', (e) => {
      e.preventDefault();
      clearValidationAlert();

      const rawUrl = DOM.destinationUrlInput.value.trim();
      if (!rawUrl) {
        showValidationAlert('Please enter a destination URL.', 'error');
        return;
      }

      // Basic URL format validation
      try {
        const parsed = new URL(rawUrl);
        if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
          showValidationAlert('URL must start with http:// or https://', 'error');
          return;
        }
      } catch (err) {
        showValidationAlert('Invalid destination URL format. Please include http:// or https://', 'error');
        return;
      }

      const category = DOM.linkCategorySelect ? DOM.linkCategorySelect.value : 'research';
      const tag = DOM.linkTagInput ? DOM.linkTagInput.value.trim() : '';

      if (window.SimulationEngine) {
        const createdLink = window.SimulationEngine.createDemoLink(rawUrl, category, tag);
        displayGeneratedLinkResult(createdLink);
        showValidationAlert('Demo link created successfully! Ready for synthetic click modeling.', 'success');
      }
    });

    // Copy button
    if (DOM.copyShortUrlBtn && DOM.resultShortUrl) {
      DOM.copyShortUrlBtn.addEventListener('click', () => {
        const text = DOM.resultShortUrl.textContent;
        navigator.clipboard.writeText(text).then(() => {
          const originalText = DOM.copyShortUrlBtn.innerHTML;
          DOM.copyShortUrlBtn.innerHTML = '<span>✓ Copied</span>';
          setTimeout(() => {
            DOM.copyShortUrlBtn.innerHTML = originalText;
          }, 1800);
        }).catch(() => {
          showTransientNotification('Copied demo URL to clipboard');
        });
      });
    }

    // Action buttons inside generated result card
    if (DOM.simulateSingleClickBtn) {
      DOM.simulateSingleClickBtn.addEventListener('click', () => {
        const linkId = DOM.simulateSingleClickBtn.getAttribute('data-link-id');
        if (window.SimulationEngine) {
          window.SimulationEngine.generateSingleClick(linkId, false);
          showTransientNotification('Simulated 1 human click event');
        }
      });
    }

    if (DOM.simulateSingleBotBtn) {
      DOM.simulateSingleBotBtn.addEventListener('click', () => {
        const linkId = DOM.simulateSingleBotBtn.getAttribute('data-link-id');
        if (window.SimulationEngine) {
          window.SimulationEngine.generateSingleClick(linkId, true);
          showTransientNotification('Simulated 1 bot request event');
        }
      });
    }

    if (DOM.simulateBurstBtn) {
      DOM.simulateBurstBtn.addEventListener('click', () => {
        const linkId = DOM.simulateBurstBtn.getAttribute('data-link-id');
        if (window.SimulationEngine) {
          window.SimulationEngine.simulateBurst(linkId, 10, 0.4);
          showTransientNotification('Simulated 10x mixed traffic burst');
        }
      });
    }
  }

  function displayGeneratedLinkResult(link) {
    if (!DOM.generatedLinkResultCard) return;
    DOM.generatedLinkResultCard.style.display = 'block';
    if (DOM.resultShortUrl) DOM.resultShortUrl.textContent = link.shortUrl;
    if (DOM.resultDestinationUrl) DOM.resultDestinationUrl.textContent = link.destinationUrl;

    if (DOM.simulateSingleClickBtn) DOM.simulateSingleClickBtn.setAttribute('data-link-id', link.id);
    if (DOM.simulateSingleBotBtn) DOM.simulateSingleBotBtn.setAttribute('data-link-id', link.id);
    if (DOM.simulateBurstBtn) DOM.simulateBurstBtn.setAttribute('data-link-id', link.id);
  }

  function showValidationAlert(message, type) {
    if (!DOM.urlValidationFeedback) return;
    DOM.urlValidationFeedback.textContent = message;
    DOM.urlValidationFeedback.className = `feedback-alert ${type}`;
    DOM.urlValidationFeedback.style.display = 'block';
  }

  function clearValidationAlert() {
    if (!DOM.urlValidationFeedback) return;
    DOM.urlValidationFeedback.textContent = '';
    DOM.urlValidationFeedback.style.display = 'none';
  }

  /* ------------------------------------------------------------------------
     4. Link Table & Filtering
     ------------------------------------------------------------------------ */
  function setupLinkTableEvents() {
    if (DOM.linkTableSearch) {
      DOM.linkTableSearch.addEventListener('input', () => filterAndRenderTable());
    }
    if (DOM.linkTableFilter) {
      DOM.linkTableFilter.addEventListener('change', () => filterAndRenderTable());
    }
    if (DOM.loadSampleLinksBtn) {
      DOM.loadSampleLinksBtn.addEventListener('click', () => {
        if (window.SimulationEngine) window.SimulationEngine.reset();
      });
    }
  }

  function filterAndRenderTable() {
    if (!window.SimulationEngine) return;
    const summary = window.SimulationEngine.getSummary();
    renderLinksTable(summary.links);
  }

  function renderLinksTable(links) {
    if (!DOM.linkTableBody) return;

    const searchTerm = DOM.linkTableSearch ? DOM.linkTableSearch.value.toLowerCase().trim() : '';
    const riskFilter = DOM.linkTableFilter ? DOM.linkTableFilter.value : 'all';

    const filtered = links.filter(l => {
      const matchesSearch = !searchTerm || 
        l.destinationUrl.toLowerCase().includes(searchTerm) || 
        l.shortCode.toLowerCase().includes(searchTerm) || 
        l.tag.toLowerCase().includes(searchTerm);

      const botRatio = l.clicksTotal > 0 ? (l.clicksBot / l.clicksTotal) : 0;
      let riskLevel = 'low';
      if (botRatio > 0.4) riskLevel = 'high';
      else if (botRatio > 0.2) riskLevel = 'medium';

      const matchesRisk = riskFilter === 'all' || riskFilter === riskLevel;
      return matchesSearch && matchesRisk;
    });

    if (filtered.length === 0) {
      DOM.linkTableBody.innerHTML = '';
      if (DOM.emptyLinkState) DOM.emptyLinkState.style.display = 'flex';
      return;
    }

    if (DOM.emptyLinkState) DOM.emptyLinkState.style.display = 'none';

    DOM.linkTableBody.innerHTML = filtered.map(l => {
      const botPct = l.clicksTotal > 0 ? ((l.clicksBot / l.clicksTotal) * 100).toFixed(1) : '0.0';
      let riskClass = 'status-normal';
      let riskLabel = 'Low';
      if (parseFloat(botPct) > 40) {
        riskClass = 'status-danger';
        riskLabel = 'High';
      } else if (parseFloat(botPct) > 20) {
        riskClass = 'status-warning';
        riskLabel = 'Medium';
      }

      return `
        <tr data-link-id="${l.id}">
          <td>
            <div style="font-weight: 500; max-width: 260px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${escapeHtml(l.destinationUrl)}">
              ${escapeHtml(l.destinationUrl)}
            </div>
          </td>
          <td>
            <code style="color: #38bdf8; font-family: monospace; font-size: 0.85rem;">${escapeHtml(l.shortUrl)}</code>
          </td>
          <td>
            <span class="metric-chip">${escapeHtml(l.tag || l.category)}</span>
          </td>
          <td class="text-right"><strong>${l.clicksTotal.toLocaleString()}</strong></td>
          <td class="text-right" style="color: #60a5fa;">${l.clicksHuman.toLocaleString()}</td>
          <td class="text-right" style="color: #fbbf24;">${l.clicksBot.toLocaleString()}</td>
          <td class="text-center">${botPct}%</td>
          <td class="text-center">
            <span class="status-tag ${riskClass}">${riskLabel}</span>
          </td>
          <td class="text-center">
            <div style="display: inline-flex; gap: 0.35rem;">
              <button type="button" class="btn btn-sm btn-action-sm btn-table-click" data-action="human" data-id="${l.id}" title="Simulate 1 Human Click">🖱️</button>
              <button type="button" class="btn btn-sm btn-action-sm btn-table-click" data-action="bot" data-id="${l.id}" title="Simulate 1 Bot Request">🤖</button>
              <button type="button" class="btn btn-sm btn-action-sm btn-table-click" data-action="burst" data-id="${l.id}" title="Simulate 10x Mixed Burst">⚡</button>
            </div>
          </td>
        </tr>
      `;
    }).join('');

    // Attach inline table button listeners
    DOM.linkTableBody.querySelectorAll('.btn-table-click').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const action = btn.getAttribute('data-action');
        if (!window.SimulationEngine || !id) return;

        if (action === 'human') {
          window.SimulationEngine.generateSingleClick(id, false);
          showTransientNotification('Simulated human click on link');
        } else if (action === 'bot') {
          window.SimulationEngine.generateSingleClick(id, true);
          showTransientNotification('Simulated bot hit on link');
        } else if (action === 'burst') {
          window.SimulationEngine.simulateBurst(id, 10, 0.4);
          showTransientNotification('Simulated mixed burst on link');
        }
      });
    });
  }

  /* ------------------------------------------------------------------------
     5. Deep-Dive Analytics & Timeframes
     ------------------------------------------------------------------------ */
  function setupDeepDiveAnalytics() {
    if (DOM.analyticsLinkSelector) {
      DOM.analyticsLinkSelector.addEventListener('change', () => {
        updateAnalyticsDeepDiveMetrics();
        renderCharts();
      });
    }

    document.querySelectorAll('.btn-time').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.btn-time').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        if (window.AnalyticsEngine) {
          window.AnalyticsEngine.timeRange = btn.getAttribute('data-range');
          renderCharts();
        }
      });
    });
  }

  function updateAnalyticsDeepDiveMetrics() {
    if (!window.SimulationEngine) return;
    const summary = window.SimulationEngine.getSummary();
    const selectedId = DOM.analyticsLinkSelector ? DOM.analyticsLinkSelector.value : 'all';

    let totalClicks = summary.totalClicks;
    if (selectedId !== 'all') {
      const link = summary.links.find(l => l.id === selectedId);
      if (link) totalClicks = link.clicksTotal;
    }

    const calculatedVelocity = (totalClicks > 0 ? (totalClicks / 45).toFixed(1) : '0.0');
    if (DOM.analyticsVelocity) DOM.analyticsVelocity.textContent = `${calculatedVelocity} clicks/min`;
  }

  /* ------------------------------------------------------------------------
     6. Fraud-Risk Section Actions
     ------------------------------------------------------------------------ */
  function setupFraudRiskActions() {
    if (DOM.triggerBotSpikeActionBtn) {
      DOM.triggerBotSpikeActionBtn.addEventListener('click', () => {
        if (window.SimulationEngine) {
          window.SimulationEngine.simulateBotSpike(20);
          showTransientNotification('Triggered intensive bot wave (+20 events)');
        }
      });
    }

    if (DOM.clearAuditLogBtn) {
      DOM.clearAuditLogBtn.addEventListener('click', () => {
        if (DOM.suspiciousEventsTableBody) {
          DOM.suspiciousEventsTableBody.innerHTML = `
            <tr>
              <td colspan="6" class="text-center" style="padding: 1.5rem; color: #64748b;">
                Audit log cleared. New suspicious events will appear as evaluated.
              </td>
            </tr>
          `;
        }
      });
    }
  }

  /* ------------------------------------------------------------------------
     7. Primary Telemetry Subscriber Handler
     ------------------------------------------------------------------------ */
  function handleTelemetryUpdate(summary) {
    if (!summary) return;

    // 1. Update Executive Metrics Cards
    if (DOM.metricTotalClicks) DOM.metricTotalClicks.textContent = summary.totalClicks.toLocaleString();
    if (DOM.metricHumanTraffic) DOM.metricHumanTraffic.textContent = summary.humanTraffic.toLocaleString();
    if (DOM.metricBotTraffic) DOM.metricBotTraffic.textContent = summary.botTraffic.toLocaleString();

    const humanShare = summary.totalClicks > 0 
      ? ((summary.humanTraffic / summary.totalClicks) * 100).toFixed(1) : '100.0';
    if (DOM.metricHumanShare) DOM.metricHumanShare.textContent = `${humanShare}%`;
    if (DOM.metricBotShare) DOM.metricBotShare.textContent = `${summary.botPercentage}%`;
    if (DOM.metricBotPercentage) DOM.metricBotPercentage.textContent = `${summary.botPercentage}%`;

    // 2. Update Bot Progress Meter
    const botNum = parseFloat(summary.botPercentage) || 0;
    if (DOM.botRatioProgressFill) {
      DOM.botRatioProgressFill.style.width = `${Math.min(100, botNum)}%`;
      if (botNum > 40) {
        DOM.botRatioProgressFill.className = 'meter-bar-fill fill-danger';
        if (DOM.metricBotStatusTag) {
          DOM.metricBotStatusTag.className = 'status-tag status-danger';
          DOM.metricBotStatusTag.textContent = 'Critical Risk';
        }
      } else if (botNum > 20) {
        DOM.botRatioProgressFill.className = 'meter-bar-fill fill-warning';
        if (DOM.metricBotStatusTag) {
          DOM.metricBotStatusTag.className = 'status-tag status-warning';
          DOM.metricBotStatusTag.textContent = 'Warning Range';
        }
      } else {
        DOM.botRatioProgressFill.className = 'meter-bar-fill fill-normal';
        if (DOM.metricBotStatusTag) {
          DOM.metricBotStatusTag.className = 'status-tag status-normal';
          DOM.metricBotStatusTag.textContent = 'Normal Range';
        }
      }
    }

    if (DOM.metricActiveLinks) DOM.metricActiveLinks.textContent = summary.activeLinksCount;

    // 3. Update Donut Visualizer and Breakdown Bars
    if (DOM.donutCenterPct) DOM.donutCenterPct.textContent = `${Math.round(parseFloat(humanShare))}%`;
    const circumference = 377; // 2 * pi * 60
    const humanOffset = (parseFloat(humanShare) / 100) * circumference;
    const botOffset = (botNum / 100) * circumference;
    if (DOM.donutSegmentHuman) DOM.donutSegmentHuman.setAttribute('stroke-dasharray', `${humanOffset} ${circumference}`);
    if (DOM.donutSegmentBot) {
      DOM.donutSegmentBot.setAttribute('stroke-dasharray', `${botOffset} ${circumference}`);
      DOM.donutSegmentBot.setAttribute('stroke-dashoffset', `-${humanOffset}`);
    }

    if (DOM.compHumanCount) DOM.compHumanCount.textContent = summary.humanTraffic.toLocaleString();
    if (DOM.compHumanBar) DOM.compHumanBar.style.width = `${humanShare}%`;
    if (DOM.compBotCount) DOM.compBotCount.textContent = summary.botTraffic.toLocaleString();
    if (DOM.compBotBar) DOM.compBotBar.style.width = `${botNum}%`;

    // 4. Evaluate Fraud Risk via RiskEngine
    let riskReport = null;
    if (window.RiskEngine) {
      riskReport = window.RiskEngine.evaluate(summary);
      applyRiskEvaluation(riskReport);
    }

    // 5. Update Link Catalog Table
    renderLinksTable(summary.links);

    // 6. Update Link Selector Dropdown in Analytics
    updateLinkSelectorOptions(summary.links);

    // 7. Update Suspicious Audit Log
    renderAuditLog(summary.auditLog);

    // 8. Re-draw Canvas Charts
    renderCharts();
  }

  function applyRiskEvaluation(report) {
    if (!report) return;

    if (DOM.metricRiskBadge) {
      DOM.metricRiskBadge.className = `metric-badge-risk ${report.badgeClass}`;
      DOM.metricRiskBadge.textContent = `${report.level} RISK`;
    }
    if (DOM.metricRiskScore) {
      DOM.metricRiskScore.textContent = `Score: ${report.score}/100`;
    }

    // Sidebar Pill
    if (DOM.sidebarRiskBadge) {
      DOM.sidebarRiskBadge.className = `nav-badge risk-indicator-pill ${report.level.toLowerCase()}`;
      DOM.sidebarRiskBadge.textContent = report.level;
    }

    // Fraud Section Hero Card
    if (DOM.riskHeroScoreNumber) DOM.riskHeroScoreNumber.textContent = report.score;
    if (DOM.riskHeroBadge) {
      DOM.riskHeroBadge.className = `risk-badge-lg ${report.badgeClass}`;
      DOM.riskHeroBadge.textContent = `${report.level} RISK STATUS`;
    }
    if (DOM.riskSummaryText) DOM.riskSummaryText.textContent = report.summaryText;

    if (DOM.riskScoreCircle) {
      if (report.level === 'HIGH') {
        DOM.riskScoreCircle.style.borderColor = 'var(--color-danger)';
        DOM.riskScoreCircle.style.boxShadow = '0 0 20px rgba(239, 68, 68, 0.4)';
      } else if (report.level === 'MEDIUM') {
        DOM.riskScoreCircle.style.borderColor = 'var(--color-warning)';
        DOM.riskScoreCircle.style.boxShadow = '0 0 20px rgba(245, 158, 11, 0.4)';
      } else {
        DOM.riskScoreCircle.style.borderColor = 'var(--color-success)';
        DOM.riskScoreCircle.style.boxShadow = '0 0 15px rgba(16, 185, 129, 0.25)';
      }
    }

    // Heuristics Rules Matrix Update
    if (report.rules) {
      updateRuleCard(DOM.ruleStatusBotRatio, DOM.ruleValBotRatio, report.rules.botRatio);
      updateRuleCard(DOM.ruleStatusVelocity, DOM.ruleValVelocity, report.rules.velocity);
      updateRuleCard(DOM.ruleStatusUserAgent, DOM.ruleValUserAgent, report.rules.userAgent);
      updateRuleCard(DOM.ruleStatusIpConcentration, DOM.ruleValIpConcentration, report.rules.ipConcentration);
    }
  }

  function updateRuleCard(badgeEl, valEl, ruleData) {
    if (!ruleData) return;
    if (badgeEl) {
      badgeEl.textContent = ruleData.status;
      badgeEl.className = `rule-status-badge ${
        ruleData.status === 'ALERT' ? 'status-alert' : (ruleData.status === 'WARN' ? 'status-warn' : 'status-pass')
      }`;
    }
    if (valEl) {
      valEl.textContent = ruleData.value;
    }
  }

  function updateLinkSelectorOptions(links) {
    if (!DOM.analyticsLinkSelector) return;
    const currentVal = DOM.analyticsLinkSelector.value;
    const optionsHtml = ['<option value="all">All Tracked Links (Aggregate Telemetry)</option>']
      .concat(links.map(l => `<option value="${l.id}">${escapeHtml(l.tag || l.shortCode)} (${escapeHtml(l.shortUrl)})</option>`));

    DOM.analyticsLinkSelector.innerHTML = optionsHtml.join('');
    if (currentVal && links.some(l => l.id === currentVal)) {
      DOM.analyticsLinkSelector.value = currentVal;
    }
  }

  function renderAuditLog(events) {
    if (!DOM.suspiciousEventsTableBody) return;
    if (!events || events.length === 0) {
      DOM.suspiciousEventsTableBody.innerHTML = `
        <tr>
          <td colspan="6" class="text-center" style="padding: 1.5rem; color: #64748b;">
            No suspicious events flagged yet. The simulation is running in safe mode.
          </td>
        </tr>
      `;
      return;
    }

    DOM.suspiciousEventsTableBody.innerHTML = events.slice(0, 10).map(evt => {
      const isBot = evt.isBot;
      const severity = isBot ? 'High' : 'Info';
      const badgeClass = isBot ? 'status-danger' : 'status-normal';
      const ruleText = isBot ? 'Rule #3: Headless/Scraper Signature' : 'Rule Check: Organic Browser';

      return `
        <tr>
          <td><span style="font-family: monospace; font-size: 0.78rem; color: #94a3b8;">${escapeHtml(evt.timestamp)}</span></td>
          <td><code style="color: #38bdf8;">${escapeHtml(evt.shortCode)}</code></td>
          <td><span style="font-family: monospace; font-size: 0.8rem;">${escapeHtml(evt.ip)}</span></td>
          <td style="max-width: 200px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${escapeHtml(evt.userAgent)}">
            ${escapeHtml(evt.userAgent)}
          </td>
          <td><span style="font-size: 0.8rem; color: #cbd5e1;">${ruleText}</span></td>
          <td class="text-center"><span class="status-tag ${badgeClass}">${severity}</span></td>
        </tr>
      `;
    }).join('');
  }

  function renderCharts() {
    if (!window.AnalyticsEngine) return;
    if (DOM.overviewTimelineCanvas && DOM.overviewTimelineCanvas.offsetParent !== null) {
      window.AnalyticsEngine.renderTimeSeriesChart(DOM.overviewTimelineCanvas);
    }
    if (DOM.analyticsTimeSeriesCanvas && DOM.analyticsTimeSeriesCanvas.offsetParent !== null) {
      window.AnalyticsEngine.renderTimeSeriesChart(DOM.analyticsTimeSeriesCanvas);
    }
  }

  /* ------------------------------------------------------------------------
     8. Utility Functions
     ------------------------------------------------------------------------ */
  function showTransientNotification(msg) {
    const existing = document.getElementById('transientToast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.id = 'transientToast';
    toast.textContent = msg;
    toast.style.cssText = `
      position: fixed;
      bottom: 24px;
      right: 24px;
      background-color: #1e293b;
      color: #38bdf8;
      border: 1px solid #3b82f6;
      border-radius: 8px;
      padding: 10px 18px;
      font-size: 0.85rem;
      font-weight: 600;
      box-shadow: 0 4px 14px rgba(0,0,0,0.4);
      z-index: 1000;
      animation: fadeIn 0.2s ease-in-out;
    `;
    document.body.appendChild(toast);
    setTimeout(() => {
      if (toast.parentNode) toast.remove();
    }, 2500);
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function debounce(fn, delay) {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), delay);
    };
  }

  // Initialize on DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

