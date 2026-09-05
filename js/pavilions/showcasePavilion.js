/**
 * Pavilion 03: Modern Showcase Plugin
 * Bauhaus Contemporary Gallery & Blueprint Grid
 * Registered to pavilionRegistry as 'show'
 */

import { pavilionRegistry } from './registry.js';
import { portalStorage } from '../storage.js';

export const showcasePavilion = {
  _slot: null,
  _meta: null,
  _cardWrapper: null,
  _canvas: null,
  _ctx: null,
  _pulses: [],
  _rafId: null,
  _lastTime: 0,
  _timeSinceLastSpawn: 0,
  _nextSpawnInterval: 600,
  _canvasWidth: 0,
  _canvasHeight: 0,
  _dpr: 1,
  _resizeObserver: null,
  _onResize: null,
  _handleResize: null,
  _isActive: false,
  _lastHorizontalRow: -1,
  _lastVerticalCol: -1,
  _handlers: null,
  _isMobile: false,

  /**
   * Mount showcase pavilion into slot element
   * @param {HTMLElement} slotElement 
   * @param {Object} meta 
   */
  mount(slotElement, meta) {
    this._slot = slotElement;
    this._meta = meta;
    const isPinned = portalStorage.isPinned(meta.id);

    this._slot.innerHTML = `
      <div class="pavilion-show">
        <!-- Blueprint Dual-Layer Background -->
        <div class="showcase-blueprint-layer" aria-hidden="true">
          <div class="showcase-grid-mesh"></div>
          <canvas class="showcase-grid-canvas" id="showcase-grid-canvas"></canvas>
          <div class="showcase-ruler-top">
            <span>[AXIS: 00-384]</span>
            <span>SCALE: 1:1 BAUHAUS-GRID</span>
            <span>[GEO: 135.502°E]</span>
          </div>
        </div>

        <!-- Showcase Borderless Stage -->
        <div class="showcase-card-wrapper" id="showcase-stage">
          <div class="showcase-glow-halo" aria-hidden="true"></div>

          <!-- Exhibition Stage with Grid Pulse Canvas -->
          <div class="showcase-card">

            <!-- Card Header -->
            <header class="showcase-header">
              <div class="showcase-identity">
                <span class="showcase-order-tag">NO. 03</span>
                <span class="showcase-badge-pill">
                  <span class="pulse-dot-gold"></span>
                  ${meta.status || 'DESIGN GALLERY'}
                </span>
              </div>
              <button class="showcase-pin-btn pin-toggle-btn ${isPinned ? 'is-pinned' : ''}" 
                      data-pin-id="${meta.id}" 
                      aria-pressed="${isPinned}"
                      aria-label="${isPinned ? '取消釘選' : '釘選當代藝廊'}"
                      title="${isPinned ? '取消釘選' : '釘選當代藝廊'}">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="12" y1="17" x2="12" y2="22"></line>
                  <path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6h1a1 1 0 0 0 0-2H8a1 1 0 0 0 0 2h1v4.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24Z"></path>
                </svg>
              </button>
            </header>

            <!-- Card Main Content -->
            <div class="showcase-content-grid">
              <!-- Left Info Pane -->
              <div class="showcase-info-pane">
                <span class="showcase-pre-label">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="3" width="18" height="18" rx="2"/>
                    <path d="M3 9h18M9 21V9"/>
                  </svg>
                  ${meta.subtitle || 'Contemporary Digital Gallery & Blueprint Grid'}
                </span>
                <div class="showcase-title-row">
                  <h2 class="showcase-title">${meta.title}</h2>
                  <span class="showcase-title-zh">${meta.nameZh}</span>
                </div>
                <p class="showcase-desc">${meta.description}</p>
                <div class="showcase-tags-wrap">
                  ${(meta.tags || []).map(t => `<span class="showcase-tag">${t}</span>`).join('')}
                </div>
              </div>

              <!-- Right Bauhaus Isometric Pedestal -->
              <div class="showcase-pedestal-card">
                <svg class="pedestal-wireframe-svg" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="1.5">
                  <polygon points="50 10 90 32 90 76 50 98 10 76 10 32" />
                  <line x1="50" y1="10" x2="50" y2="98" />
                  <line x1="10" y1="32" x2="90" y2="76" />
                  <line x1="90" y1="32" x2="10" y2="76" />
                  <circle cx="50" cy="54" r="20" stroke-dasharray="3 3" />
                </svg>
                <div class="pedestal-metric-row">
                  <span class="metric-key">FRAMEWORK</span>
                  <span class="metric-val"><span class="val-highlight">React 19</span> + Vite 6</span>
                </div>
                <div class="pedestal-metric-row">
                  <span class="metric-key">CANVAS RENDER</span>
                  <span class="metric-val">120 FPS Sub-pixel</span>
                </div>
                <div class="pedestal-metric-row">
                  <span class="metric-key">ARCH. SYSTEM</span>
                  <span class="metric-val">Bauhaus Precision</span>
                </div>
                <div class="pedestal-metric-row">
                  <span class="metric-key">CURATION ARCHIVE</span>
                  <span class="metric-val"><span class="val-highlight">24</span> Artifacts Pinned</span>
                </div>
              </div>
            </div>

            <!-- Card Footer & Actions -->
            <footer class="showcase-footer">
              <div class="showcase-action-group">
                <a href="${meta.launchUrl || './showcase/'}" class="showcase-launch-btn action-launch-btn" data-action-launch data-pavilion-id="${meta.id}">
                  <span>🏛️ 進入收藏品藝廊</span>
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </a>
                <a href="${meta.secondaryLaunchUrl || './showcase/#archive'}" class="showcase-secondary-btn" target="_blank" rel="noopener noreferrer">
                  <span>📐 典藏工程名錄</span>
                </a>
              </div>
              <div class="showcase-curator-signature">
                <span>// BLUEPRINT ID: SC-2026-X</span>
              </div>
            </footer>
          </div>
        </div>
      </div>
    `;

    this._cardWrapper = this._slot.querySelector('#showcase-stage');
    this._initInteractions();
    this._bindPin();
    this._bindLaunch();
    this._initCanvas();
    this._startAnimation();
  },

  /**
   * Setup Elegant Hover Sheen (No 3D tilt, pure liquid gold light)
   */
  _initInteractions() {
    if (!this._cardWrapper) return;

    this._isMobile = window.matchMedia('(max-width: 860px)').matches || ('ontouchstart' in window);

    const onMouseMove = (e) => {
      if (this._isMobile) return;
      const rect = this._cardWrapper.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const percentX = (x / rect.width) * 100;
      const percentY = (y / rect.height) * 100;

      // Soft ambient light focus without any 3D tilt distortion
      this._cardWrapper.style.setProperty('--light-x', `${percentX.toFixed(2)}%`);
      this._cardWrapper.style.setProperty('--light-y', `${percentY.toFixed(2)}%`);
    };

    const onMouseLeave = () => {
      this._cardWrapper.style.setProperty('--light-x', '50%');
      this._cardWrapper.style.setProperty('--light-y', '30%');
    };

    this._cardWrapper.addEventListener('mousemove', onMouseMove, { passive: true });
    this._cardWrapper.addEventListener('mouseleave', onMouseLeave, { passive: true });

    this._handlers = { onMouseMove, onMouseLeave };
  },

  /**
   * Bind pin toggle to portalStorage
   */
  _bindPin() {
    const pinBtn = this._slot.querySelector('.showcase-pin-btn');
    if (!pinBtn) return;

    pinBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const id = this._meta?.id || 'show';
      const nextState = portalStorage.togglePin(id);
      pinBtn.classList.toggle('is-pinned', nextState);
      pinBtn.setAttribute('aria-pressed', String(nextState));
      const label = nextState ? '取消釘選' : '釘選當代藝廊';
      pinBtn.setAttribute('aria-label', label);
      pinBtn.setAttribute('title', label);
    });
  },

  /**
   * Record recent visit on launch
   */
  _bindLaunch() {
    const launchBtn = this._slot.querySelector('.showcase-launch-btn');
    if (launchBtn) {
      launchBtn.addEventListener('click', () => {
        const id = this._meta?.id || 'show';
        portalStorage.setRecent(id);
      });
    }
  },

  /**
   * Initialize HTML5 Canvas Grid Stream Pulse Layer
   */
  _initCanvas() {
    this._canvas = this._slot.querySelector('#showcase-grid-canvas');
    if (!this._canvas) return;
    this._ctx = this._canvas.getContext('2d');
    if (!this._ctx) return;

    this._handleResize = () => {
      if (!this._canvas || !this._ctx) return;
      const rect = this._canvas.getBoundingClientRect();
      const width = Math.floor(rect.width);
      const height = Math.floor(rect.height);
      if (width === 0 || height === 0) return;

      this._dpr = Math.min(window.devicePixelRatio || 1, 2);
      this._canvasWidth = width;
      this._canvasHeight = height;

      this._canvas.width = Math.round(width * this._dpr);
      this._canvas.height = Math.round(height * this._dpr);
      this._ctx.setTransform(this._dpr, 0, 0, this._dpr, 0, 0);
    };

    if (window.ResizeObserver) {
      this._resizeObserver = new ResizeObserver(() => {
        this._handleResize();
      });
      this._resizeObserver.observe(this._canvas.parentElement || this._canvas);
    } else {
      this._onResize = () => this._handleResize();
      window.addEventListener('resize', this._onResize, { passive: true });
    }

    this._handleResize();
    this._pulses = [];
    this._timeSinceLastSpawn = 0;
    this._nextSpawnInterval = this._getRandomInterval();
    this._lastHorizontalRow = -1;
    this._lastVerticalCol = -1;

    // Spawn initial prewarm pulse so canvas is lively on first view
    this._spawnPulse(true);
  },

  /**
   * Random spawn interval between 400ms and 900ms
   */
  _getRandomInterval() {
    return 400 + Math.random() * 500;
  },

  /**
   * Spawn a high-speed champagne gold light pulse on an 80px blueprint grid line
   * @param {boolean} isPrewarm
   */
  _spawnPulse(isPrewarm = false) {
    if (!this._canvasWidth || !this._canvasHeight) return;

    const GRID_SIZE = 80;
    const isHorizontal = Math.random() < 0.6; // 60% horizontal, 40% vertical
    const length = 160 + Math.random() * 80; // 160 ~ 240px
    const speed = 650 + Math.random() * 300; // 650 ~ 950px/s
    const lineWidth = 1.5 + Math.random() * 0.5; // 1.5 ~ 2px

    if (isHorizontal) {
      const maxRows = Math.floor(this._canvasHeight / GRID_SIZE);
      if (maxRows <= 0) return;
      let row = Math.floor(Math.random() * maxRows) + 1;
      if (row === this._lastHorizontalRow && maxRows > 1) {
        row = (row % maxRows) + 1;
      }
      this._lastHorizontalRow = row;

      const y = row * GRID_SIZE;
      const direction = Math.random() > 0.5 ? 1 : -1; // Left-to-right or right-to-left
      let head;
      if (isPrewarm) {
        head = direction === 1 
          ? this._canvasWidth * (0.2 + Math.random() * 0.5)
          : this._canvasWidth * (0.8 - Math.random() * 0.5);
      } else {
        head = direction === 1 ? -10 : this._canvasWidth + 10;
      }

      this._pulses.push({
        type: 'horizontal',
        direction,
        y,
        head,
        length,
        speed,
        lineWidth
      });
    } else {
      // Vertical grid line (top to bottom)
      const maxCols = Math.floor(this._canvasWidth / GRID_SIZE);
      if (maxCols <= 0) return;
      let col = Math.floor(Math.random() * maxCols) + 1;
      if (col === this._lastVerticalCol && maxCols > 1) {
        col = (col % maxCols) + 1;
      }
      this._lastVerticalCol = col;

      const x = col * GRID_SIZE;
      const direction = 1; // Top to bottom
      let head;
      if (isPrewarm) {
        head = this._canvasHeight * (0.2 + Math.random() * 0.4);
      } else {
        head = -10;
      }

      this._pulses.push({
        type: 'vertical',
        direction,
        x,
        head,
        length,
        speed,
        lineWidth
      });
    }
  },

  /**
   * Render frame: update physics and draw seamless champagne gold light pulses
   * @param {number} timestamp
   */
  _renderFrame(timestamp) {
    if (!this._ctx || !this._canvasWidth || !this._canvasHeight) return;

    if (!this._lastTime) this._lastTime = timestamp;
    const dt = Math.min((timestamp - this._lastTime) / 1000, 0.1);
    this._lastTime = timestamp;

    this._timeSinceLastSpawn += dt * 1000;
    if (this._timeSinceLastSpawn >= this._nextSpawnInterval) {
      this._spawnPulse(false);
      this._timeSinceLastSpawn = 0;
      this._nextSpawnInterval = this._getRandomInterval();
    }

    const ctx = this._ctx;
    ctx.clearRect(0, 0, this._canvasWidth, this._canvasHeight);

    for (let i = this._pulses.length - 1; i >= 0; i--) {
      const p = this._pulses[i];
      p.head += p.direction * p.speed * dt;

      let x1, y1, x2, y2;
      let isDead = false;

      if (p.type === 'horizontal') {
        const tail = p.head - p.direction * p.length;
        if (p.direction === 1 && tail > this._canvasWidth + 20) {
          isDead = true;
        } else if (p.direction === -1 && tail < -20) {
          isDead = true;
        }

        if (isDead) {
          this._pulses.splice(i, 1);
          continue;
        }

        x1 = tail;
        y1 = p.y;
        x2 = p.head;
        y2 = p.y;
      } else {
        const tail = p.head - p.length;
        if (tail > this._canvasHeight + 20) {
          this._pulses.splice(i, 1);
          continue;
        }

        x1 = p.x;
        y1 = tail;
        x2 = p.x;
        y2 = p.head;
      }

      // Linear gradient along pulse vector (from tail to head)
      ctx.save();
      const grad = ctx.createLinearGradient(x1, y1, x2, y2);
      // Smooth tail fade out to 0% opacity (no hard clipping)
      grad.addColorStop(0.0, 'rgba(197, 160, 89, 0)');
      grad.addColorStop(0.2, 'rgba(197, 160, 89, 0.4)');
      grad.addColorStop(0.55, 'rgba(223, 186, 115, 0.85)');
      // High-intensity white core near front head (85%)
      grad.addColorStop(0.85, '#FFFFFF');
      grad.addColorStop(0.93, 'rgba(223, 186, 115, 0.7)');
      // Smooth head fade out to 0% opacity (no hard clipping)
      grad.addColorStop(1.0, 'rgba(223, 186, 115, 0)');

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = grad;
      ctx.lineWidth = p.lineWidth;
      ctx.lineCap = 'round';
      ctx.shadowColor = 'rgba(223, 186, 115, 0.75)';
      ctx.shadowBlur = 6;
      ctx.stroke();
      ctx.restore();
    }
  },

  /**
   * Start requestAnimationFrame loop
   */
  _startAnimation() {
    if (this._rafId) return;
    this._isActive = true;
    this._lastTime = performance.now();
    const loop = (timestamp) => {
      if (!this._isActive) return;
      this._renderFrame(timestamp);
      this._rafId = requestAnimationFrame(loop);
    };
    this._rafId = requestAnimationFrame(loop);
  },

  /**
   * Stop requestAnimationFrame loop
   */
  _stopAnimation() {
    this._isActive = false;
    if (this._rafId) {
      cancelAnimationFrame(this._rafId);
      this._rafId = null;
    }
  },

  /**
   * Viewport lifecycle: resume or throttle effects
   */
  onEnterViewport() {
    if (this._cardWrapper) {
      this._cardWrapper.style.willChange = 'transform';
    }
    if (this._handleResize) {
      this._handleResize();
    }
    this._startAnimation();
  },

  onLeaveViewport() {
    this._stopAnimation();
    if (this._ctx && this._canvasWidth && this._canvasHeight) {
      this._ctx.clearRect(0, 0, this._canvasWidth, this._canvasHeight);
    }
    if (this._cardWrapper) {
      this._cardWrapper.style.transform = '';
      this._cardWrapper.style.willChange = 'auto';
    }
  },

  /**
   * Clean up all event listeners, animation frames and observers
   */
  unmount() {
    this._stopAnimation();
    if (this._resizeObserver) {
      this._resizeObserver.disconnect();
      this._resizeObserver = null;
    }
    if (this._onResize) {
      window.removeEventListener('resize', this._onResize);
      this._onResize = null;
    }
    if (this._cardWrapper && this._handlers) {
      this._cardWrapper.removeEventListener('mousemove', this._handlers.onMouseMove);
      this._cardWrapper.removeEventListener('mouseleave', this._handlers.onMouseLeave);
      this._handlers = null;
    }
    this._pulses = [];
    this._canvas = null;
    this._ctx = null;
    this._handleResize = null;
    this._slot = null;
    this._meta = null;
    this._cardWrapper = null;
  }
};

// Auto-register to registry
pavilionRegistry.registerPavilion('show', showcasePavilion);
