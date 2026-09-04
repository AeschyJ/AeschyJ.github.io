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
  _rafId: null,
  _targetRotateX: 0,
  _targetRotateY: 0,
  _currentRotateX: 0,
  _currentRotateY: 0,
  _isHovered: false,
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
          <div class="showcase-ruler-top">
            <span>[AXIS: 00-384]</span>
            <span>SCALE: 1:1 BAUHAUS-GRID</span>
            <span>[GEO: 135.502°E]</span>
          </div>
        </div>

        <!-- 3D Card Interactive Shell -->
        <div class="showcase-card-wrapper" id="showcase-card-3d">
          <!-- Aurora Tracing Flowing Edge -->
          <div class="showcase-aurora-stream" aria-hidden="true"></div>
          <div class="showcase-glow-halo" aria-hidden="true"></div>

          <!-- Glassmorphic Interior -->
          <div class="showcase-card">
            <!-- Dynamic Specular Reflection Layer -->
            <div class="showcase-specular-sheen" id="showcase-specular-layer" aria-hidden="true"></div>

            <!-- Card Header -->
            <header class="showcase-header">
              <div class="showcase-identity">
                <span class="showcase-order-tag">NO. 03</span>
                <span class="showcase-badge-pill">
                  <span class="pulse-dot-ice"></span>
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

    this._cardWrapper = this._slot.querySelector('#showcase-card-3d');
    this._specularLayer = this._slot.querySelector('#showcase-specular-layer');
    this._initInteractions();
    this._bindPin();
    this._bindLaunch();
  },

  /**
   * Setup 3D Tilt & Specular Physics
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

      // Update Specular Sheen center
      this._cardWrapper.style.setProperty('--sheen-x', `${percentX.toFixed(2)}%`);
      this._cardWrapper.style.setProperty('--sheen-y', `${percentY.toFixed(2)}%`);

      // 3D Tilt calculation (max 9 deg)
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      this._targetRotateY = ((x - centerX) / centerX) * 8;
      this._targetRotateX = -((y - centerY) / centerY) * 8;
      this._isHovered = true;

      if (!this._rafId) {
        this._rafId = requestAnimationFrame(this._tickPhysics.bind(this));
      }
    };

    const onMouseLeave = () => {
      this._isHovered = false;
      this._targetRotateX = 0;
      this._targetRotateY = 0;
      if (!this._rafId) {
        this._rafId = requestAnimationFrame(this._tickPhysics.bind(this));
      }
    };

    this._cardWrapper.addEventListener('mousemove', onMouseMove, { passive: true });
    this._cardWrapper.addEventListener('mouseleave', onMouseLeave, { passive: true });

    // Store handlers for unmount
    this._handlers = { onMouseMove, onMouseLeave };
  },

  /**
   * Physics interpolation loop for 60-120 FPS buttery smooth tilt
   */
  _tickPhysics() {
    if (!this._cardWrapper) return;

    // Smooth Lerp (0.12 factor)
    const factor = 0.12;
    this._currentRotateX += (this._targetRotateX - this._currentRotateX) * factor;
    this._currentRotateY += (this._targetRotateY - this._currentRotateY) * factor;

    const scale = this._isHovered ? 1.015 : 1.0;
    this._cardWrapper.style.transform = `perspective(1000px) rotateX(${this._currentRotateX.toFixed(3)}deg) rotateY(${this._currentRotateY.toFixed(3)}deg) scale3d(${scale}, ${scale}, 1)`;

    // Continue loop if not settled
    const diff = Math.abs(this._targetRotateX - this._currentRotateX) + Math.abs(this._targetRotateY - this._currentRotateY);
    if (this._isHovered || diff > 0.02) {
      this._rafId = requestAnimationFrame(this._tickPhysics.bind(this));
    } else {
      this._cardWrapper.style.transform = '';
      this._rafId = null;
    }
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
   * Viewport lifecycle: resume or throttle effects
   */
  onEnterViewport() {
    // Re-enable smooth transitions when entering
    if (this._cardWrapper) {
      this._cardWrapper.style.willChange = 'transform';
    }
  },

  onLeaveViewport() {
    // Release GPU memory when outside viewport
    if (this._rafId) {
      cancelAnimationFrame(this._rafId);
      this._rafId = null;
    }
    if (this._cardWrapper) {
      this._cardWrapper.style.transform = '';
      this._cardWrapper.style.willChange = 'auto';
    }
  },

  /**
   * Clean up all event listeners and animation frames
   */
  unmount() {
    if (this._rafId) {
      cancelAnimationFrame(this._rafId);
      this._rafId = null;
    }
    if (this._cardWrapper && this._handlers) {
      this._cardWrapper.removeEventListener('mousemove', this._handlers.onMouseMove);
      this._cardWrapper.removeEventListener('mouseleave', this._handlers.onMouseLeave);
    }
    this._slot = null;
    this._meta = null;
    this._cardWrapper = null;
  }
};

// Auto-register to registry
pavilionRegistry.registerPavilion('show', showcasePavilion);
