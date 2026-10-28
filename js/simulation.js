/**
 * Link Intelligence & Analytics Dashboard — Traffic Simulation Engine
 * Module Scope: Synthetic Clickstream & Bot Traffic Generation (Teammate Module)
 * Integration: Communicates with Abhinav Gautam's HTML & UI Module via window.SimulationEngine
 */

(function () {
  'use strict';

  // Realistic Synthetic Datasets for In-Browser Modeling
  const USER_AGENTS = {
    humanDesktop: [
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Safari/605.1.15',
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:129.0) Gecko/20100101 Firefox/129.0',
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36'
    ],
    humanMobile: [
      'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148',
      'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Mobile Safari/537.36',
      'Mozilla/5.0 (Linux; Android 13; SM-S918B) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/25.0 Chrome/121.0.0.0'
    ],
    automatedBot: [
      'HeadlessChrome/128.0.6613.119 (Puppeteer-Scraper/1.0)',
      'python-requests/2.32.3 (Automated Link Checker)',
      'curl/8.7.1 (CentOS-Subnet-Scanner)',
      'Scrapy/2.11.2 (+https://scrapy.org)',
      'Go-http-client/2.0 (Fast-Poller-Engine)'
    ],
    searchCrawler: [
      'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
      'Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)'
    ]
  };

  const REFERRERS = {
    academic: ['https://glauniversity.in/research-portal', 'https://ieee.org/abstract/8912', 'https://arxiv.org/abs/2604.1082'],
    social: ['https://twitter.com/t.co/xyz89', 'https://linkedin.com/feed/update', 'https://news.ycombinator.com'],
    search: ['https://www.google.com/search?q=gla+research', 'https://www.bing.com/search?q=cea+dashboard'],
    direct: ['Direct / Bookmark (No Referrer Header)'],
    spoofed: ['about:blank', 'http://127.0.0.1:8080/flood']
  };

  const REGIONS = [
    { name: 'India (North / Mathura & NCR)', ipPrefix: '103.21.', isCloud: false },
    { name: 'North America (East / Virginia)', ipPrefix: '198.51.', isCloud: false },
    { name: 'Western Europe (Frankfurt)', ipPrefix: '185.19.', isCloud: false },
    { name: 'Cloud Proxy Subnet (AWS us-east-1)', ipPrefix: '3.80.', isCloud: true },
    { name: 'Anonymous Tor Exit Relay', ipPrefix: '185.220.', isCloud: true }
  ];

  class TrafficSimulator {
    constructor() {
      this.listeners = [];
      this.auditLog = [];
      this.links = [
        {
          id: 'link_gla_01',
          destinationUrl: 'https://glauniversity.in/academics/computer-engineering',
          shortCode: 'gla-cea1',
          shortUrl: 'https://demo.link/gla-cea1',
          category: 'research',
          tag: 'GLA-CEA-Portal',
          created: '2026-10-28 09:15',
          clicksTotal: 580,
          clicksHuman: 532,
          clicksBot: 48,
          recentClicks: []
        },
        {
          id: 'link_github_02',
          destinationUrl: 'https://github.com/abhinav/link-intelligence-dashboard',
          shortCode: 'git-repo2',
          shortUrl: 'https://demo.link/git-repo2',
          category: 'direct',
          tag: 'GitHub-Repo',
          created: '2026-10-28 10:30',
          clicksTotal: 412,
          clicksHuman: 368,
          clicksBot: 44,
          recentClicks: []
        },
        {
          id: 'link_forum_03',
          destinationUrl: 'https://news.ycombinator.com/item?id=381920',
          shortCode: 'soc-hn9',
          shortUrl: 'https://demo.link/soc-hn9',
          category: 'social',
          tag: 'TechForum-Post',
          created: '2026-10-28 11:45',
          clicksTotal: 340,
          clicksHuman: 246,
          clicksBot: 94,
          recentClicks: []
        },
        {
          id: 'link_mktg_04',
          destinationUrl: 'https://example.com/ad-campaign-affiliate',
          shortCode: 'mkt-aff4',
          shortUrl: 'https://demo.link/mkt-aff4',
          category: 'marketing',
          tag: 'Ad-Campaign',
          created: '2026-10-28 13:00',
          clicksTotal: 150,
          clicksHuman: 72,
          clicksBot: 78,
          recentClicks: []
        }
      ];

      // Pre-seed some recent events for the audit log
      this.seedInitialEvents();
    }

    seedInitialEvents() {
      for (let i = 0; i < 6; i++) {
        const link = this.links[Math.floor(Math.random() * this.links.length)];
        this.generateSingleClick(link.id, i % 2 === 0, false);
      }
    }

    subscribe(callback) {
      if (typeof callback === 'function') {
        this.listeners.push(callback);
      }
    }

    notify() {
      this.listeners.forEach(fn => fn(this.getSummary()));
    }

    getSummary() {
      const totalClicks = this.links.reduce((acc, l) => acc + l.clicksTotal, 0);
      const humanTraffic = this.links.reduce((acc, l) => acc + l.clicksHuman, 0);
      const botTraffic = this.links.reduce((acc, l) => acc + l.clicksBot, 0);
      const botPercentage = totalClicks > 0 ? ((botTraffic / totalClicks) * 100).toFixed(1) : '0.0';

      return {
        totalClicks,
        humanTraffic,
        botTraffic,
        botPercentage,
        activeLinksCount: this.links.length,
        links: [...this.links],
        auditLog: [...this.auditLog]
      };
    }

    createDemoLink(destinationUrl, category = 'research', tag = '') {
      const randomSuffix = Math.random().toString(36).substring(2, 6);
      const shortCode = `glx-${randomSuffix}`;
      const shortUrl = `https://demo.link/${shortCode}`;

      const newLink = {
        id: `link_${Date.now()}`,
        destinationUrl,
        shortCode,
        shortUrl,
        category,
        tag: tag || 'User-Created',
        created: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        clicksTotal: 0,
        clicksHuman: 0,
        clicksBot: 0,
        recentClicks: []
      };

      this.links.unshift(newLink);
      this.notify();
      return newLink;
    }

    generateSingleClick(linkId, isBot = false, shouldNotify = true) {
      const link = this.links.find(l => l.id === linkId) || this.links[0];
      if (!link) return null;

      // Select agent
      let userAgent;
      let referrer;
      const region = REGIONS[Math.floor(Math.random() * REGIONS.length)];
      const ip = `${region.ipPrefix}${Math.floor(Math.random() * 254) + 1}.${Math.floor(Math.random() * 254) + 1}`;

      if (isBot) {
        userAgent = USER_AGENTS.automatedBot[Math.floor(Math.random() * USER_AGENTS.automatedBot.length)];
        referrer = REFERRERS.spoofed[Math.floor(Math.random() * REFERRERS.spoofed.length)];
        link.clicksBot++;
      } else {
        const isMobile = Math.random() > 0.6;
        userAgent = isMobile 
          ? USER_AGENTS.humanMobile[Math.floor(Math.random() * USER_AGENTS.humanMobile.length)]
          : USER_AGENTS.humanDesktop[Math.floor(Math.random() * USER_AGENTS.humanDesktop.length)];
        
        const refPool = link.category === 'research' ? REFERRERS.academic 
          : (link.category === 'social' ? REFERRERS.social : REFERRERS.direct);
        referrer = refPool[Math.floor(Math.random() * refPool.length)];
        link.clicksHuman++;
      }

      link.clicksTotal++;

      const event = {
        id: `evt_${Date.now()}_${Math.random().toString(36).substring(2, 5)}`,
        timestamp: new Date().toLocaleTimeString(),
        linkId: link.id,
        shortCode: link.shortCode,
        ip,
        userAgent,
        referrer,
        region: region.name,
        isBot
      };

      link.recentClicks.unshift(event);
      if (link.recentClicks.length > 50) link.recentClicks.pop();

      this.auditLog.unshift(event);
      if (this.auditLog.length > 50) this.auditLog.pop();

      if (shouldNotify) {
        this.notify();
      }

      return event;
    }

    simulateBurst(linkId, totalCount = 20, botRatio = 0.4) {
      const targetId = linkId || (this.links[0] ? this.links[0].id : null);
      if (!targetId) return;

      for (let i = 0; i < totalCount; i++) {
        const isBot = Math.random() < botRatio;
        this.generateSingleClick(targetId, isBot, false);
      }
      this.notify();
    }

    simulateBotSpike(count = 15) {
      if (this.links.length === 0) return;
      for (let i = 0; i < count; i++) {
        const randomLink = this.links[Math.floor(Math.random() * this.links.length)];
        this.generateSingleClick(randomLink.id, true, false);
      }
      this.notify();
    }

    reset() {
      this.links.forEach(l => {
        l.clicksTotal = Math.floor(Math.random() * 50) + 10;
        l.clicksHuman = Math.floor(l.clicksTotal * 0.85);
        l.clicksBot = l.clicksTotal - l.clicksHuman;
        l.recentClicks = [];
      });
      this.auditLog = [];
      this.seedInitialEvents();
      this.notify();
    }
  }

  // Export globally for UI and teammates' integration
  window.SimulationEngine = new TrafficSimulator();
})();
