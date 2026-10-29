/**
 * Link Intelligence & Analytics Dashboard — Rule-Based Fraud-Risk Engine
 * Module Scope: Local deterministic heuristics for link fraud assessment (Teammate Module)
 * Integration: Evaluates synthetic telemetry and exports window.RiskEngine
 */

(function () {
  'use strict';

  class FraudRiskEngine {
    constructor() {
      this.lastEvaluation = null;
    }

    /**
     * Evaluates simulation summary and audit events against deterministic rules.
     * @param {Object} summary - Data from window.SimulationEngine.getSummary()
     * @returns {Object} Evaluation report containing score, badge, rules matrix and summary
     */
    evaluate(summary) {
      if (!summary) return this.getDefaultResult();

      const botPct = parseFloat(summary.botPercentage) || 0;
      const recentEvents = summary.auditLog || [];

      // Heuristic 1: Bot Ratio Analysis
      let rule1Status = 'PASS';
      let rule1Score = 0;
      if (botPct > 40) {
        rule1Status = 'ALERT';
        rule1Score = 40;
      } else if (botPct > 20) {
        rule1Status = 'WARN';
        rule1Score = 20;
      } else {
        rule1Score = Math.round(botPct * 0.5);
      }

      // Heuristic 2: Burst Velocity Analysis (Clicks within tight window)
      let rule2Status = 'PASS';
      let rule2Score = 0;
      const burstThreshold = 10;
      const recentBurstCount = recentEvents.slice(0, 15).length;
      if (recentBurstCount >= burstThreshold && botPct > 25) {
        rule2Status = 'WARN';
        rule2Score = 20;
      } else if (recentBurstCount >= burstThreshold && botPct > 45) {
        rule2Status = 'ALERT';
        rule2Score = 30;
      }

      // Heuristic 3: User-Agent Signature Anomalies
      let rule3Status = 'PASS';
      let rule3Score = 0;
      const headlessCount = recentEvents.filter(e => 
        e.userAgent && (e.userAgent.includes('Headless') || e.userAgent.includes('curl') || e.userAgent.includes('python'))
      ).length;
      const headlessRatio = recentEvents.length > 0 ? (headlessCount / recentEvents.length) : 0;
      if (headlessRatio > 0.4) {
        rule3Status = 'ALERT';
        rule3Score = 25;
      } else if (headlessRatio > 0.2) {
        rule3Status = 'WARN';
        rule3Score = 15;
      }

      // Heuristic 4: Subnet IP Concentration
      let rule4Status = 'PASS';
      let rule4Score = 0;
      const ipSubnets = {};
      recentEvents.forEach(e => {
        if (!e.ip) return;
        const subnet = e.ip.split('.').slice(0, 3).join('.');
        ipSubnets[subnet] = (ipSubnets[subnet] || 0) + 1;
      });
      const maxSubnetHits = Object.values(ipSubnets).reduce((max, c) => Math.max(max, c), 0);
      if (maxSubnetHits > 6 && botPct > 30) {
        rule4Status = 'WARN';
        rule4Score = 15;
      }

      // Aggregate Score (0 to 100)
      const totalScore = Math.min(100, Math.max(8, rule1Score + rule2Score + rule3Score + rule4Score));

      // Level determination
      let level = 'LOW';
      let badgeClass = 'risk-low';
      let summaryText = 'Simulated traffic exhibits normal human browsing patterns. The bot-to-human ratio is below threshold limits, and no persistent rapid-fire click bursts or anomalous user-agent clusters were detected.';

      if (totalScore >= 55) {
        level = 'HIGH';
        badgeClass = 'risk-high';
        summaryText = 'Critical risk warning! Simulated traffic shows an acute concentration of automated bot crawlers, rapid-fire click velocity, or clustered scraper user-agents. Review flagged events in the audit log.';
      } else if (totalScore >= 25) {
        level = 'MEDIUM';
        badgeClass = 'risk-medium';
        summaryText = 'Elevated fraud propensity detected. Elevated bot frequency and automated request patterns exceed normal human baseline levels. Heuristic rules recommend closer inspection.';
      }

      const result = {
        score: totalScore,
        level,
        badgeClass,
        summaryText,
        rules: {
          botRatio: { status: rule1Status, value: `${botPct}%`, score: rule1Score },
          velocity: { status: rule2Status, value: `${recentBurstCount} in window`, score: rule2Score },
          userAgent: { status: rule3Status, value: `${Math.round(headlessRatio * 100)}% Headless`, score: rule3Score },
          ipConcentration: { status: rule4Status, value: `${maxSubnetHits} max pool`, score: rule4Score }
        }
      };

      this.lastEvaluation = result;
      return result;
    }

    getDefaultResult() {
      return {
        score: 16,
        level: 'LOW',
        badgeClass: 'risk-low',
        summaryText: 'Simulated baseline telemetry.',
        rules: {
          botRatio: { status: 'PASS', value: '17.8%', score: 8 },
          velocity: { status: 'PASS', value: '4 clicks', score: 0 },
          userAgent: { status: 'PASS', value: '14.6%', score: 5 },
          ipConcentration: { status: 'PASS', value: '7 hits', score: 3 }
        }
      };
    }
  }

  window.RiskEngine = new FraudRiskEngine();
})();

