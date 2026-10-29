/**
 * Link Intelligence & Analytics Dashboard — Analytics & Chart Engine
 * Module Scope: Time-series calculation & HTML5 Canvas rendering (Teammate Module)
 * Integration: Exports window.AnalyticsEngine
 */

(function () {
  'use strict';

  class AnalyticsEngine {
    constructor() {
      this.timeRange = '1h';
    }

    /**
     * Renders a time-series line chart comparing human and bot traffic.
     * @param {HTMLCanvasElement} canvas 
     * @param {Array} dataPoints 
     */
    renderTimeSeriesChart(canvas, dataPoints = null) {
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      const width = rect.width > 0 ? rect.width : canvas.width;
      const height = rect.height > 0 ? rect.height : canvas.height;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);

      // Generate synthetic points if none provided
      const points = dataPoints || this.generateSamplePoints(12);

      // Clear Canvas
      ctx.clearRect(0, 0, width, height);

      const paddingLeft = 45;
      const paddingBottom = 35;
      const paddingTop = 20;
      const paddingRight = 20;
      const chartWidth = width - paddingLeft - paddingRight;
      const chartHeight = height - paddingTop - paddingBottom;

      // Draw Grid Lines
      ctx.strokeStyle = '#243247';
      ctx.lineWidth = 1;
      const gridSteps = 4;
      for (let i = 0; i <= gridSteps; i++) {
        const y = paddingTop + (chartHeight / gridSteps) * i;
        ctx.beginPath();
        ctx.moveTo(paddingLeft, y);
        ctx.lineTo(width - paddingRight, y);
        ctx.stroke();

        // Label
        const val = Math.round(100 - (100 / gridSteps) * i);
        ctx.fillStyle = '#64748b';
        ctx.font = '10px -apple-system, sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(`${val}`, paddingLeft - 8, y + 3);
      }

      // Time Labels on X-axis
      ctx.textAlign = 'center';
      const stepX = chartWidth / (points.length - 1);
      points.forEach((pt, idx) => {
        const x = paddingLeft + idx * stepX;
        ctx.fillStyle = '#64748b';
        ctx.fillText(pt.time, x, height - 12);
      });

      // Draw Human Line & Area (Blue)
      this.drawSeries(ctx, points, 'human', '#3b82f6', 'rgba(59, 130, 246, 0.15)', paddingLeft, paddingTop, chartWidth, chartHeight, stepX);

      // Draw Bot Line & Area (Amber)
      this.drawSeries(ctx, points, 'bot', '#f59e0b', 'rgba(245, 158, 11, 0.12)', paddingLeft, paddingTop, chartWidth, chartHeight, stepX);
    }

    drawSeries(ctx, points, key, strokeColor, fillColor, paddingLeft, paddingTop, chartWidth, chartHeight, stepX) {
      if (points.length < 2) return;

      const maxVal = 100;
      ctx.beginPath();
      points.forEach((pt, idx) => {
        const x = paddingLeft + idx * stepX;
        const normalizedY = (pt[key] / maxVal) * chartHeight;
        const y = paddingTop + (chartHeight - normalizedY);

        if (idx === 0) {
          ctx.moveTo(x, y);
        } else {
          // Smooth bezier curve
          const prevX = paddingLeft + (idx - 1) * stepX;
          const prevNormalizedY = (points[idx - 1][key] / maxVal) * chartHeight;
          const prevY = paddingTop + (chartHeight - prevNormalizedY);
          const cpX1 = prevX + (x - prevX) / 2;
          const cpX2 = prevX + (x - prevX) / 2;
          ctx.bezierCurveTo(cpX1, prevY, cpX2, y, x, y);
        }
      });

      // Save path for stroke
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Close path for area fill
      const lastX = paddingLeft + (points.length - 1) * stepX;
      ctx.lineTo(lastX, paddingTop + chartHeight);
      ctx.lineTo(paddingLeft, paddingTop + chartHeight);
      ctx.closePath();
      ctx.fillStyle = fillColor;
      ctx.fill();

      // Draw Points
      points.forEach((pt, idx) => {
        const x = paddingLeft + idx * stepX;
        const normalizedY = (pt[key] / maxVal) * chartHeight;
        const y = paddingTop + (chartHeight - normalizedY);
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fillStyle = strokeColor;
        ctx.fill();
      });
    }

    generateSamplePoints(count = 12) {
      const points = [];
      const now = new Date();
      for (let i = count - 1; i >= 0; i--) {
        const d = new Date(now.getTime() - i * 5 * 60 * 1000);
        const timeStr = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const human = Math.floor(Math.random() * 35) + 45;
        const bot = Math.floor(Math.random() * 20) + 5;
        points.push({ time: timeStr, human, bot });
      }
      return points;
    }
  }

  window.AnalyticsEngine = new AnalyticsEngine();
})();

