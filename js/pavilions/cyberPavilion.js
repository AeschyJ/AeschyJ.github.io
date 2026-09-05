/**
 * Pavilion 05: Cyber-Routine Plugin
 * Cyberpunk Geek Dashboard, Habit Matrix, Typewriter, Particle Blast & 8-bit Audio
 * Registered to pavilionRegistry as 'cyb'
 */

import { pavilionRegistry } from './registry.js';
import { portalStorage } from '../storage.js';

export const cyberPavilion = {
  _slot: null,
  _meta: null,
  _canvas: null,
  _ctx: null,
  _particles: [],
  _particleRaf: null,
  _typewriterTimer: null,
  _audioCtx: null,
  _comboCount: 14,

  /**
   * Mount Cyber-Routine Pavilion
   */
  mount(slotElement, meta) {
    this._slot = slotElement;
    this._meta = meta;
    const isPinned = portalStorage.isPinned(meta.id);

    // Read stored streak from localStorage
    const savedCombo = localStorage.getItem('hub_cyber_combo_streak');
    this._comboCount = savedCombo ? parseInt(savedCombo, 10) : 14;

    this._slot.innerHTML = `
      <div class="pavilion-cyb">
        <div class="cyber-hud-card">
          <!-- Canvas for Particle Blast -->
          <canvas class="cyber-particle-canvas" id="cyber-particle-canvas"></canvas>

          <!-- Matrix Dot Grid Overlay -->
          <div class="cyber-dot-matrix-layer" aria-hidden="true"></div>

          <!-- Top Status Bar -->
          <header class="cyber-header-bar">
            <div class="cyber-identity-cluster">
              <span class="cyber-order-tag">NO. 05</span>
              <span class="cyber-badge-pill">${meta.status || 'MATRIX RUNNING'}</span>
            </div>

            <button class="cyber-pin-btn pin-toggle-btn ${isPinned ? 'is-pinned' : ''}" 
                    data-pin-id="${meta.id}" 
                    aria-pressed="${isPinned}"
                    aria-label="${isPinned ? '取消釘選' : '釘選賽博矩陣'}"
                    title="${isPinned ? '取消釘選' : '釘選賽博矩陣'}">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="12" y1="17" x2="12" y2="22"></line>
                <path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6h1a1 1 0 0 0 0-2H8a1 1 0 0 0 0 2h1v4.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24Z"></path>
              </svg>
            </button>
          </header>

          <!-- Content Grid: Overview & Typewriter Screen -->
          <div class="cyber-content-grid">
            <!-- Left Overview Pane -->
            <div class="cyber-overview-pane">
              <span class="cyber-pre-label">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                </svg>
                ${meta.subtitle || 'Cyberpunk Geek Dashboard & Habit Matrix'}
              </span>
              <div class="cyber-title-row">
                <h2 class="cyber-title">${meta.title}</h2>
                <span class="cyber-title-zh">${meta.nameZh}</span>
              </div>
              <p class="cyber-desc">${meta.description}</p>
              
              <div class="cyber-tags-wrap">
                ${(meta.tags || []).map(t => `<span class="cyber-tag">${t}</span>`).join('')}
              </div>

              <!-- Realtime Combo Streak Badge -->
              <div class="cyber-combo-badge-box">
                <span class="combo-label">COMBO STREAK</span>
                <span class="combo-counter-val" id="cyber-combo-display">${this._comboCount}</span>
                <span style="font-size: 0.72rem; color: #94a3b8; font-family: monospace;">DAYS</span>
              </div>
            </div>

            <!-- Right CRT Typewriter Simulation Terminal -->
            <div class="cyber-terminal-screen">
              <div class="terminal-top-bar">
                <span class="terminal-sys-title">> CYBER_MATRIX_DAEMON // V2.6</span>
                <span class="terminal-live-tag">LIVE_STREAM</span>
              </div>
              <div class="terminal-output-body">
                <span id="cyber-typewriter-text"></span><span class="terminal-cursor"></span>
              </div>
            </div>
          </div>

          <!-- Bottom Actions Bar -->
          <footer class="cyber-footer-actions">
            <div class="cyber-action-left">
              <button class="cyber-combo-btn" id="btn-cyber-combo">
                <span>⚡ 連擊充能 (Combo +1)</span>
              </button>
              <a href="${meta.launchUrl || './cyber-routine/'}" class="cyber-launch-btn action-launch-btn" data-action-launch data-pavilion-id="${meta.id}">
                <span>⚡ 啟動賽博儀表板</span>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
            </div>
            <div class="cyber-geek-meta">
              <span>// MATRIX SYNC: PERSISTED LOCALSTORAGE</span>
            </div>
          </footer>
        </div>
      </div>
    `;

    this._canvas = this._slot.querySelector('#cyber-particle-canvas');
    if (this._canvas) {
      this._ctx = this._canvas.getContext('2d');
      this._resizeCanvas();
    }

    this._initTypewriter();
    this._initComboButton();
    this._bindPin();
    this._bindLaunch();
  },

  /**
   * Adjust Canvas dimensions
   */
  _resizeCanvas() {
    if (!this._canvas) return;
    const rect = this._canvas.getBoundingClientRect();
    this._canvas.width = rect.width;
    this._canvas.height = rect.height;
  },

  /**
   * CRT Terminal Typewriter Simulation
   */
  _initTypewriter() {
    const target = this._slot.querySelector('#cyber-typewriter-text');
    if (!target) return;

    const scriptText = 
`> INITIATING CYBER-ROUTINE HABIT MATRIX...
> NEURAL LINK STATUS: CALIBRATED (100%)
> DAILY STREAK PROTOCOLS:
  [1] DEEP FOCUS (2x45m): COMPLETED
  [2] HYDRATION GOAL (2500ml): 85% REACHED
  [3] CODE REFACTORING: VERIFIED OK
> MATRIX SYNC: OPTIMAL
> READY FOR COMBO BOOST CHARGE...`;

    let charIndex = 0;
    target.textContent = '';

    if (this._typewriterTimer) clearInterval(this._typewriterTimer);
    this._typewriterTimer = setInterval(() => {
      if (charIndex < scriptText.length) {
        target.textContent += scriptText[charIndex];
        charIndex++;
      } else {
        clearInterval(this._typewriterTimer);
        this._typewriterTimer = null;
      }
    }, 28);
  },

  /**
   * Combo Boost Button & Particle Blast & 8-Bit Web Audio
   */
  _initComboButton() {
    const comboBtn = this._slot.querySelector('#btn-cyber-combo');
    const displayEl = this._slot.querySelector('#cyber-combo-display');

    if (!comboBtn) return;

    comboBtn.addEventListener('click', (e) => {
      // 1. Increment Combo & Store
      this._comboCount++;
      localStorage.setItem('hub_cyber_combo_streak', String(this._comboCount));
      
      if (displayEl) {
        displayEl.textContent = String(this._comboCount);
        displayEl.classList.remove('pop-animate');
        // Force reflow
        void displayEl.offsetWidth;
        displayEl.classList.add('pop-animate');
        setTimeout(() => displayEl.classList.remove('pop-animate'), 300);
      }

      // 2. Play Retro 8-bit Coin Sound Synthesizer
      this._play8BitCoinSound();

      // 3. Emit Gold & Neon Particles Blast
      const rect = this._canvas ? this._canvas.getBoundingClientRect() : null;
      if (rect) {
        const originX = (e.clientX - rect.left) || (rect.width * 0.25);
        const originY = (e.clientY - rect.top) || (rect.height * 0.85);
        this._spawnParticleBlast(originX, originY);
      }
    });

    this._onResize = () => this._resizeCanvas();
    window.addEventListener('resize', this._onResize, { passive: true });
  },

  /**
   * Pure Web Audio API 8-Bit Arcade Coin Sound (Zero external audio file)
   */
  _play8BitCoinSound() {
    const prefs = portalStorage.getPrefs();
    if (!prefs.audioEnabled) return;

    try {
      if (!this._audioCtx && (window.AudioContext || window.webkitAudioContext)) {
        const AudioClass = window.AudioContext || window.webkitAudioContext;
        this._audioCtx = new AudioClass();
      }
      if (this._audioCtx && this._audioCtx.state === 'suspended') {
        this._audioCtx.resume();
      }
      if (!this._audioCtx) return;

      const now = this._audioCtx.currentTime;

      // Note 1: B5 (987.77 Hz)
      const osc1 = this._audioCtx.createOscillator();
      const gain1 = this._audioCtx.createGain();
      osc1.type = 'square';
      osc1.frequency.setValueAtTime(987.77, now);
      gain1.gain.setValueAtTime(0.08, now);
      gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);
      osc1.connect(gain1);
      gain1.connect(this._audioCtx.destination);
      osc1.start(now);
      osc1.stop(now + 0.08);

      // Note 2: E6 (1318.51 Hz) - High chime
      const osc2 = this._audioCtx.createOscillator();
      const gain2 = this._audioCtx.createGain();
      osc2.type = 'square';
      osc2.frequency.setValueAtTime(1318.51, now + 0.08);
      gain2.gain.setValueAtTime(0.12, now + 0.08);
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);
      osc2.connect(gain2);
      gain2.connect(this._audioCtx.destination);
      osc2.start(now + 0.08);
      osc2.stop(now + 0.35);
    } catch {
      // Audio playback fails gracefully if autoplay restricted
    }
  },

  /**
   * Particle Blast Physics Engine
   */
  _spawnParticleBlast(x, y) {
    if (!this._ctx || !this._canvas) return;
    this._resizeCanvas();

    const colors = ['#ffb700', '#00ff9d', '#ffffff', '#ffe066', '#05f0a0'];
    const count = 38;

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 8 + 3;
      this._particles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2.5, // Slight upward lift
        size: Math.random() * 5 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 1.0,
        decay: Math.random() * 0.025 + 0.015,
        shape: Math.random() > 0.4 ? 'star' : 'square'
      });
    }

    if (!this._particleRaf) {
      this._particleRaf = requestAnimationFrame(this._updateParticles.bind(this));
    }
  },

  _updateParticles() {
    if (!this._ctx || !this._canvas) return;
    this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);

    for (let i = this._particles.length - 1; i >= 0; i--) {
      const p = this._particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.22; // Gravity
      p.vx *= 0.98; // Drag
      p.life -= p.decay;

      if (p.life <= 0) {
        this._particles.splice(i, 1);
        continue;
      }

      this._ctx.save();
      this._ctx.globalAlpha = Math.max(0, p.life);
      this._ctx.fillStyle = p.color;
      this._ctx.shadowBlur = 8;
      this._ctx.shadowColor = p.color;

      if (p.shape === 'star') {
        // Draw 4-point tech star
        this._ctx.beginPath();
        this._ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        this._ctx.fill();
      } else {
        this._ctx.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
      }
      this._ctx.restore();
    }

    if (this._particles.length > 0) {
      this._particleRaf = requestAnimationFrame(this._updateParticles.bind(this));
    } else {
      this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
      this._particleRaf = null;
    }
  },

  /**
   * Pin binding
   */
  _bindPin() {
    const pinBtn = this._slot.querySelector('.cyber-pin-btn');
    if (!pinBtn) return;

    pinBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const id = this._meta?.id || 'cyb';
      const nextState = portalStorage.togglePin(id);
      pinBtn.classList.toggle('is-pinned', nextState);
      pinBtn.setAttribute('aria-pressed', String(nextState));
      const label = nextState ? '取消釘選' : '釘選賽博矩陣';
      pinBtn.setAttribute('aria-label', label);
      pinBtn.setAttribute('title', label);
    });
  },

  /**
   * Launch tracking
   */
  _bindLaunch() {
    const launchBtn = this._slot.querySelector('.cyber-launch-btn');
    if (launchBtn) {
      launchBtn.addEventListener('click', () => {
        const id = this._meta?.id || 'cyb';
        portalStorage.setRecent(id);
      });
    }
  },

  /**
   * Viewport lifecycle
   */
  onEnterViewport() {
    // Restart typewriter if needed or re-calibrate canvas
    this._resizeCanvas();
  },

  onLeaveViewport() {
    if (this._particleRaf) {
      cancelAnimationFrame(this._particleRaf);
      this._particleRaf = null;
      this._particles = [];
      if (this._ctx && this._canvas) {
        this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
      }
    }
  },

  /**
   * Cleanup
   */
  unmount() {
    if (this._typewriterTimer) {
      clearInterval(this._typewriterTimer);
      this._typewriterTimer = null;
    }
    if (this._particleRaf) {
      cancelAnimationFrame(this._particleRaf);
      this._particleRaf = null;
    }
    if (this._onResize) {
      window.removeEventListener('resize', this._onResize);
      this._onResize = null;
    }
    this._particles = [];
    this._slot = null;
    this._meta = null;
  }
};

// Auto-register to registry
pavilionRegistry.registerPavilion('cyb', cyberPavilion);
