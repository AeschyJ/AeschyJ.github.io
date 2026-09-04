/**
 * Pavilion 04: Ticket Radar Bot Plugin
 * Air-Traffic Radar Intelligence & Automated Concurrency Engine
 * Registered to pavilionRegistry as 'tic'
 */

import { pavilionRegistry } from './registry.js';
import { portalStorage } from '../storage.js';

export const ticketPavilion = {
  _slot: null,
  _meta: null,
  _logStream: null,
  _webhookToast: null,
  _modalBackdrop: null,
  _heartbeatTimer: null,
  _isSniping: false,
  _webhookTimeout: null,

  /**
   * Mount Ticket Bot pavilion
   */
  mount(slotElement, meta) {
    this._slot = slotElement;
    this._meta = meta;
    const isPinned = portalStorage.isPinned(meta.id);

    this._slot.innerHTML = `
      <div class="pavilion-tic">
        <div class="ticket-console-shell">
          <!-- CRT Scanline Filter -->
          <div class="ticket-crt-overlay" aria-hidden="true"></div>

          <!-- Top Status Bar & Blinking LEDs -->
          <header class="ticket-header-bar">
            <div class="ticket-radar-status-cluster">
              <span class="ticket-order-tag">NO. 04</span>
              <div class="ticket-server-leds">
                <span class="server-led led-green" title="Worker Pool: Active"></span>
                <span class="server-led led-amber" title="Radar Sweep: 3000ms"></span>
                <span class="server-led led-blue" title="Webhook Gateway: Online"></span>
              </div>
              <span class="ticket-status-label">${meta.status || 'RADAR SURVEILLANCE'}</span>
            </div>

            <button class="ticket-pin-btn pin-toggle-btn ${isPinned ? 'is-pinned' : ''}" 
                    data-pin-id="${meta.id}" 
                    aria-pressed="${isPinned}"
                    aria-label="${isPinned ? '取消釘選' : '釘選雷達票務'}"
                    title="${isPinned ? '取消釘選' : '釘選雷達票務'}">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="12" y1="17" x2="12" y2="22"></line>
                <path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6h1a1 1 0 0 0 0-2H8a1 1 0 0 0 0 2h1v4.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24Z"></path>
              </svg>
            </button>
          </header>

          <!-- Main Grid: Intel & Live Console Terminal -->
          <div class="ticket-main-grid">
            <!-- Left Info Pane -->
            <div class="ticket-intel-pane">
              <span class="ticket-pre-badge">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="m4.93 4.93 4.24 4.24M14.83 9.17l4.24-4.24M14.83 14.83l4.24 4.24M9.17 14.83l-4.24 4.24"/>
                </svg>
                ${meta.subtitle || 'Air-Traffic Radar Intelligence & Automation'}
              </span>
              <div class="ticket-title-row">
                <h2 class="ticket-title">${meta.title}</h2>
                <span class="ticket-title-zh">${meta.nameZh}</span>
              </div>
              <p class="ticket-desc">${meta.description}</p>
              <div class="ticket-tags-wrap">
                ${(meta.tags || []).map(t => `<span class="ticket-tag">${t}</span>`).join('')}
              </div>
            </div>

            <!-- Right Live Radar & Terminal Screen -->
            <div class="ticket-radar-terminal-box">
              <div class="radar-mini-dish" aria-hidden="true">
                <div class="radar-cross-v"></div>
              </div>
              <div class="terminal-header">
                <span class="terminal-title">TERMINAL // SURVEILLANCE FEED</span>
                <span class="terminal-meta-ping">PING: 38ms</span>
              </div>
              <div class="ticket-log-stream" id="ticket-log-terminal">
                <div class="log-entry">
                  <span class="log-time">[00:00:01]</span>
                  <span class="log-msg-normal">[STATUS: STANDBY] Monitoring target queue... Ping: 38ms</span>
                </div>
                <div class="log-entry">
                  <span class="log-time">[00:00:02]</span>
                  <span class="log-msg-blue">[SYS] 8 Concurrency workers calibrated & active.</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Interactive Action Buttons -->
          <footer class="ticket-actions-bar">
            <div class="ticket-btns-left">
              <button class="ticket-drop-btn" id="btn-simulate-drop">
                <span>⚡ 觸發模擬搶票 (Simulate Drop)</span>
              </button>
              <button class="ticket-arch-btn" id="btn-open-arch-modal">
                <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2">
                  <polygon points="12 2 2 7 12 12 22 7 12 2"/>
                  <polyline points="2 17 12 22 22 17"/>
                  <polyline points="2 12 12 17 22 12"/>
                </svg>
                <span>📐 架構深度剖析</span>
              </button>
            </div>
            <a href="${meta.launchUrl || './ticket-bot/'}" class="ticket-launch-link action-launch-btn" data-action-launch data-pavilion-id="${meta.id}">
              <span>航管儀表全景</span>
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </footer>

          <!-- Webhook Push Notification Simulation Card -->
          <div class="ticket-webhook-toast" id="ticket-webhook-toast" role="alert">
            <div class="webhook-header">
              <div class="webhook-bot-name">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                  <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                </svg>
                <span>WEBHOOK DISPATCH BOT</span>
              </div>
              <button class="webhook-close-btn" id="webhook-close-btn" aria-label="關閉通知">&times;</button>
            </div>
            <div class="webhook-body">
              <strong>🎉 席位鎖定通知！</strong><br>
              目標：<span class="webhook-highlight-tag">STAGE-A VIP 搖滾第 1 排</span><br>
              全流程耗時：<strong style="color: #10b981;">88ms</strong> | 狀態：<span style="color: #38bdf8;">HTTP 200 OK</span>
            </div>
          </div>
        </div>

        <!-- Architecture Deep-Dive Modal -->
        <div class="pavilion-tic-modal-backdrop" id="ticket-arch-modal" aria-hidden="true">
          <div class="pavilion-tic-modal" role="dialog" aria-labelledby="modal-arch-title">
            <div class="modal-header">
              <div class="modal-title-group">
                <div class="modal-icon-badge">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="9"/>
                    <path d="M12 3a9 9 0 0 1 9 9"/><path d="m12 12 5-3"/><circle cx="12" cy="12" r="1"/>
                  </svg>
                </div>
                <div>
                  <h3 class="modal-heading" id="modal-arch-title">Ticket Radar 系統核心架構剖析</h3>
                  <span class="modal-subheading">// HIGH CONCURRENCY SNIPING & RESILIENCE SPEC</span>
                </div>
              </div>
              <button class="modal-close-btn" id="modal-close-btn" aria-label="關閉架構剖析彈窗">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
              </button>
            </div>

            <div class="modal-grid">
              <!-- Section 1: Anti-Scraping Evasion -->
              <div class="arch-block">
                <div class="arch-title">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  <span>1. 反爬蟲防封策略 (Anti-Bot & WAF Evasion)</span>
                </div>
                <p class="arch-desc">
                  採用多維度指紋偽裝技術，包括 TLS Client Hello 指紋動態隨機化、HTTP/2 偽標頭重排與動態住宅代理 IP 輪詢池。針對高難度人機驗證模組，實作非同步 AI 破譯管道，在 50ms 內完成 Token 授權簽發。
                </p>
              </div>

              <!-- Section 2: Finite State Machine -->
              <div class="arch-block">
                <div class="arch-title">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
                  <span>2. 有限狀態機躍遷 (Finite State Machine Transition)</span>
                </div>
                <p class="arch-desc">
                  嚴格狀態機管理，防止狀態重入與多執行緒重複扣款：
                </p>
                <div class="fsm-flow">
                  <span class="fsm-node">STANDBY 待命</span>
                  <span class="fsm-arrow">&rarr;</span>
                  <span class="fsm-node">POLLING 巡檢</span>
                  <span class="fsm-arrow">&rarr;</span>
                  <span class="fsm-node">DROP DETECTED 捕獲釋出</span>
                  <span class="fsm-arrow">&rarr;</span>
                  <span class="fsm-node">SNIPING 毫秒搶單</span>
                  <span class="fsm-arrow">&rarr;</span>
                  <span class="fsm-node active-node">LOCKED 鎖定成功</span>
                  <span class="fsm-arrow">&rarr;</span>
                  <span class="fsm-node">WEBHOOK 派發</span>
                </div>
              </div>

              <!-- Section 3: High Concurrency Multi-Threading -->
              <div class="arch-block">
                <div class="arch-title">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                  <span>3. 多執行緒高並發架構 (Multi-threaded Concurrency)</span>
                </div>
                <p class="arch-desc">
                  基於輕量化 Worker 叢集與無鎖環形佇列（Lock-Free Ring Buffer），每個 Worker 獨立維持與票務伺服器的長連接池。單機每秒處理高達數萬次檢索探針，延遲壓低至 10~25ms 以內。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    this._logStream = this._slot.querySelector('#ticket-log-terminal');
    this._webhookToast = this._slot.querySelector('#ticket-webhook-toast');
    this._modalBackdrop = this._slot.querySelector('#ticket-arch-modal');

    this._initLogStream();
    this._initInteractiveButtons();
    this._bindPin();
    this._bindLaunch();
  },

  /**
   * Start lightweight heartbeat timer
   */
  _initLogStream() {
    this._startHeartbeat();
  },

  _startHeartbeat() {
    if (this._heartbeatTimer) clearInterval(this._heartbeatTimer);
    let counter = 3;
    this._heartbeatTimer = setInterval(() => {
      if (this._isSniping || !this._logStream) return;
      const timeStr = new Date().toTimeString().split(' ')[0];
      const pings = [32, 36, 40, 38, 42];
      const ping = pings[Math.floor(Math.random() * pings.length)];
      
      const logEntry = document.createElement('div');
      logEntry.className = 'log-entry';
      logEntry.innerHTML = `
        <span class="log-time">[${timeStr}]</span>
        <span class="log-msg-normal">[RADAR PING] Queue healthy, RTT: ${ping}ms. Active Workers: 8</span>
      `;
      this._appendLog(logEntry);
    }, 4000);
  },

  _appendLog(entryEl) {
    if (!this._logStream) return;
    this._logStream.appendChild(entryEl);
    // Keep max 15 lines in DOM to ensure zero memory creep
    while (this._logStream.children.length > 15) {
      this._logStream.removeChild(this._logStream.firstChild);
    }
    this._logStream.scrollTop = this._logStream.scrollHeight;
  },

  /**
   * Interactive Buttons: Simulate Drop & Architecture Modal
   */
  _initInteractiveButtons() {
    const dropBtn = this._slot.querySelector('#btn-simulate-drop');
    if (dropBtn) {
      dropBtn.addEventListener('click', () => this._runSimulateSniping());
    }

    const archBtn = this._slot.querySelector('#btn-open-arch-modal');
    const modalCloseBtn = this._slot.querySelector('#modal-close-btn');
    if (archBtn && this._modalBackdrop) {
      archBtn.addEventListener('click', () => {
        this._modalBackdrop.classList.add('is-open');
        this._modalBackdrop.setAttribute('aria-hidden', 'false');
        modalCloseBtn?.focus();
      });
    }

    if (modalCloseBtn && this._modalBackdrop) {
      modalCloseBtn.addEventListener('click', () => {
        this._modalBackdrop.classList.remove('is-open');
        this._modalBackdrop.setAttribute('aria-hidden', 'true');
        archBtn?.focus();
      });
    }

    if (this._modalBackdrop) {
      this._modalBackdrop.addEventListener('click', (e) => {
        if (e.target === this._modalBackdrop) {
          this._modalBackdrop.classList.remove('is-open');
          this._modalBackdrop.setAttribute('aria-hidden', 'true');
          archBtn?.focus();
        }
      });
    }

    // Webhook Toast close button
    const webhookCloseBtn = this._slot.querySelector('#webhook-close-btn');
    if (webhookCloseBtn && this._webhookToast) {
      webhookCloseBtn.addEventListener('click', () => {
        this._webhookToast.classList.remove('is-active');
      });
    }

    // Keyboard ESC to close modal
    this._onKeyDown = (e) => {
      if (e.key === 'Escape' && this._modalBackdrop?.classList.contains('is-open')) {
        this._modalBackdrop.classList.remove('is-open');
        this._modalBackdrop.setAttribute('aria-hidden', 'true');
        archBtn?.focus();
      }
    };
    window.addEventListener('keydown', this._onKeyDown);
  },

  /**
   * Run full simulated drop log cascade
   */
  _runSimulateSniping() {
    if (this._isSniping) return;
    this._isSniping = true;
    if (!this._snipeTimers) this._snipeTimers = [];

    const logs = [
      { msg: '🚨 [ALERT] TARGET SEATS RELEASED: STAGE-A VIP ROW-01!', type: 'log-msg-amber', delay: 100 },
      { msg: '⚡ [DISPATCH] Spawning 8 sniper workers across Tokyo & Osaka nodes...', type: 'log-msg-normal', delay: 350 },
      { msg: '🛡️ [BYPASS] Randomizing TLS/JA3 Client Hello cipher suites... (18ms)', type: 'log-msg-normal', delay: 650 },
      { msg: '🧩 [AI SOLVER] Captcha token verified & signed successfully. (42ms)', type: 'log-msg-amber', delay: 950 },
      { msg: '📦 [PAYLOAD] Dispatching atomic checkout request token...', type: 'log-msg-normal', delay: 1250 },
      { msg: '🎉 [SUCCESS] Seat locked! HTTP 200 OK (0.088s) Order #TK-98821', type: 'log-msg-green', delay: 1550 },
      { msg: '📡 [WEBHOOK] Pushing notification to Discord/Telegram Webhook Gateway...', type: 'log-msg-blue', delay: 1800 }
    ];

    logs.forEach(({ msg, type, delay }) => {
      const tid = setTimeout(() => {
        if (!this._logStream) return;
        const timeStr = new Date().toTimeString().split(' ')[0];
        const entry = document.createElement('div');
        entry.className = 'log-entry';
        entry.innerHTML = `<span class="log-time">[${timeStr}]</span> <span class="${type}">${msg}</span>`;
        this._appendLog(entry);
      }, delay);
      this._snipeTimers.push(tid);
    });

    // Show Webhook Push Notification Toast
    const toastTid = setTimeout(() => {
      if (this._webhookToast) {
        this._webhookToast.classList.add('is-active');
        if (this._webhookTimeout) clearTimeout(this._webhookTimeout);
        this._webhookTimeout = setTimeout(() => {
          this._webhookToast?.classList.remove('is-active');
        }, 5000);
      }
      this._isSniping = false;
    }, 2000);
    this._snipeTimers.push(toastTid);
  },

  /**
   * Pin binding
   */
  _bindPin() {
    const pinBtn = this._slot.querySelector('.ticket-pin-btn');
    if (!pinBtn) return;

    pinBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const id = this._meta?.id || 'tic';
      const nextState = portalStorage.togglePin(id);
      pinBtn.classList.toggle('is-pinned', nextState);
      pinBtn.setAttribute('aria-pressed', String(nextState));
      const label = nextState ? '取消釘選' : '釘選雷達票務';
      pinBtn.setAttribute('aria-label', label);
      pinBtn.setAttribute('title', label);
    });
  },

  /**
   * Launch tracking
   */
  _bindLaunch() {
    const launchBtn = this._slot.querySelector('.ticket-launch-link');
    if (launchBtn) {
      launchBtn.addEventListener('click', () => {
        const id = this._meta?.id || 'tic';
        portalStorage.setRecent(id);
      });
    }
  },

  /**
   * Viewport management
   */
  onEnterViewport() {
    if (!this._heartbeatTimer) {
      this._startHeartbeat();
    }
  },

  onLeaveViewport() {
    if (this._heartbeatTimer) {
      clearInterval(this._heartbeatTimer);
      this._heartbeatTimer = null;
    }
  },

  /**
   * Cleanup
   */
  unmount() {
    if (this._heartbeatTimer) {
      clearInterval(this._heartbeatTimer);
      this._heartbeatTimer = null;
    }
    if (this._webhookTimeout) {
      clearTimeout(this._webhookTimeout);
      this._webhookTimeout = null;
    }
    if (Array.isArray(this._snipeTimers)) {
      this._snipeTimers.forEach(t => clearTimeout(t));
      this._snipeTimers = [];
    }
    if (this._onKeyDown) {
      window.removeEventListener('keydown', this._onKeyDown);
    }
    this._slot = null;
    this._meta = null;
  }
};

// Auto-register to registry
pavilionRegistry.registerPavilion('tic', ticketPavilion);
