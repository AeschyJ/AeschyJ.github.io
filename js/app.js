/**
 * Central Portal Hub - Core Application Controller
 * Orchestrates PWA Service Worker, Dynamic Ambient Light Engine,
 * State Storage synchronization, Audio Synthesizer, and Pavilion Registry.
 */

import { PAVILIONS_DATA, getPavilionById } from './data/pavilionsData.js';
import { portalStorage } from './storage.js';
import { pavilionRegistry } from './pavilions/registry.js';

// Import specialized pavilions to register them with the registry
import './pavilions/experimentPavilion.js';
import './pavilions/osakaPavilion.js';
import './pavilions/showcasePavilion.js';
import './pavilions/ticketPavilion.js';
import './pavilions/cyberPavilion.js';

class PortalApp {
  constructor() {
    this._audioCtx = null;
    this._currentActivePavilionId = null;
    this._isAudioUnlocked = false;
  }

  /**
   * Initialize Core Hub Application
   */
  async init() {
    console.log('[PortalApp] Initializing Central Exhibition Hub Core (Deck Edition)...');
    this._initServiceWorker();
    this._applyPreferences();
    this._mountDeckPavilions();
    this._initHeaderControls();
    this._initDeckNavigation();
    this._initKeyboardNavigation();
    this._initBackToTop();
    this._initVisitorCounter();
    this._syncRecentBadge();
    this._syncPinnedPopover();

    // Listen for global storage updates
    window.addEventListener('hub:storage-updated', (event) => {
      const { changeType } = event.detail;
      if (changeType === 'recent') {
        this._syncRecentBadge();
      } else if (changeType === 'pinned') {
        this._syncPinnedPopover();
      }
    });

    console.log('[PortalApp] Central Exhibition Hub Deck initialized successfully.');
  }

  /**
   * Register Dedicated Portal Service Worker
   */
  _initServiceWorker() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
          .then((registration) => {
            console.log('[Portal SW] Registered successfully with scope:', registration.scope);
          })
          .catch((err) => {
            console.warn('[Portal SW] Registration failed:', err);
          });
      });
    }
  }

  /**
   * Apply stored user preferences on startup
   */
  _applyPreferences() {
    const prefs = portalStorage.getPrefs();
    if (!prefs.fxEnabled) {
      document.body.classList.add('fx-disabled');
    }
  }

  /**
   * Minimalist Web Audio Synthesizer (Zero external assets needed)
   */
  _getAudioContext() {
    if (!this._audioCtx && (window.AudioContext || window.webkitAudioContext)) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      this._audioCtx = new AudioContextClass();
    }
    if (this._audioCtx && this._audioCtx.state === 'suspended') {
      this._audioCtx.resume();
    }
    return this._audioCtx;
  }

  _playChime(frequency = 520, type = 'sine', duration = 0.18, gainVal = 0.05) {
    const prefs = portalStorage.getPrefs();
    if (!prefs.audioEnabled) return;

    try {
      const ctx = this._getAudioContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(frequency * 1.5, ctx.currentTime + duration);

      gain.gain.setValueAtTime(gainVal, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Ignore audio synthesis errors on strict autoplay environments
    }
  }

  /**
   * Mount pavilion slots inside 100dvh Deck slides
   */
  _mountDeckPavilions() {
    pavilionRegistry.mountDeckSlots(PAVILIONS_DATA);
  }

  /**
   * Setup Header buttons: Recent Jump, Pinned Popover, FX Toggle, Audio Toggle
   */
  _initHeaderControls() {
    // 1. Audio Toggle Button
    const audioBtn = document.getElementById('btn-audio-toggle');
    if (audioBtn) {
      const prefs = portalStorage.getPrefs();
      audioBtn.classList.toggle('active', !!prefs.audioEnabled);
      audioBtn.addEventListener('click', () => {
        const nextVal = !portalStorage.getPrefs().audioEnabled;
        portalStorage.setPrefs('audioEnabled', nextVal);
        audioBtn.classList.toggle('active', nextVal);
        if (nextVal) {
          this._playChime(660, 'sine', 0.2, 0.08);
        }
      });
    }

    // 2. FX Toggle Button (Low power / Full visual effects)
    const fxBtn = document.getElementById('btn-fx-toggle');
    if (fxBtn) {
      const prefs = portalStorage.getPrefs();
      fxBtn.classList.toggle('active', !!prefs.fxEnabled);
      fxBtn.addEventListener('click', () => {
        const nextVal = !portalStorage.getPrefs().fxEnabled;
        portalStorage.setPrefs('fxEnabled', nextVal);
        fxBtn.classList.toggle('active', nextVal);
        document.body.classList.toggle('fx-disabled', !nextVal);
        this._playChime(nextVal ? 580 : 340, 'triangle', 0.12, 0.04);
      });
    }

    // 3. Pinned Drawer Toggle Button
    const pinnedBtn = document.getElementById('btn-pinned-toggle');
    const pinnedPopover = document.getElementById('pinned-popover');
    if (pinnedBtn && pinnedPopover) {
      pinnedBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = pinnedPopover.classList.toggle('is-open');
        pinnedBtn.classList.toggle('active', isOpen);
        if (isOpen) {
          this._syncPinnedPopover();
          this._playChime(480, 'sine', 0.12, 0.04);
        }
      });

      // Close popover when clicking outside
      document.addEventListener('click', (e) => {
        if (!pinnedPopover.contains(e.target) && !pinnedBtn.contains(e.target)) {
          pinnedPopover.classList.remove('is-open');
          pinnedBtn.classList.remove('active');
        }
      });
    }

    // 4. Recent Visited Jump Button
    const recentBtn = document.getElementById('btn-recent-jump');
    if (recentBtn) {
      recentBtn.addEventListener('click', () => {
        const recentId = portalStorage.getRecent();
        if (recentId) {
          this._scrollToPavilion(recentId);
          this._playChime(700, 'sine', 0.15, 0.05);
        }
      });
    }

    // 5. Mobile Pavilion Quick Nav Popover
    const mobileNavBtn = document.getElementById('btn-mobile-nav');
    const mobileNavPopover = document.getElementById('mobile-nav-popover');
    const mobileNavClose = document.getElementById('btn-mobile-nav-close');

    if (mobileNavBtn && mobileNavPopover) {
      mobileNavBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = mobileNavPopover.classList.toggle('is-open');
        mobileNavBtn.classList.toggle('active', isOpen);
        if (isOpen) {
          this._playChime(520, 'sine', 0.12, 0.04);
        }
      });

      mobileNavClose?.addEventListener('click', () => {
        mobileNavPopover.classList.remove('is-open');
        mobileNavBtn.classList.remove('active');
      });

      document.addEventListener('click', (e) => {
        if (!mobileNavPopover.contains(e.target) && !mobileNavBtn.contains(e.target)) {
          mobileNavPopover.classList.remove('is-open');
          mobileNavBtn.classList.remove('active');
        }
      });

      mobileNavPopover.querySelectorAll('.mobile-nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
          e.preventDefault();
          const targetId = item.getAttribute('data-slide-id');
          if (targetId) {
            this._scrollToSlide(targetId);
            mobileNavPopover.classList.remove('is-open');
            mobileNavBtn.classList.remove('active');
            this._playChime(620, 'sine', 0.12, 0.04);
          }
        });
      });
    }
  }

  /**
   * Update Recent Visited indicator on Header
   */
  _syncRecentBadge() {
    const recentBtn = document.getElementById('btn-recent-jump');
    const recentNameSpan = document.getElementById('recent-pavilion-name');
    const recentId = portalStorage.getRecent();

    if (!recentBtn) return;

    if (recentId) {
      const meta = getPavilionById(recentId);
      if (meta) {
        recentBtn.style.display = 'inline-flex';
        if (recentNameSpan) {
          recentNameSpan.textContent = meta.title;
        }
        return;
      }
    }
    recentBtn.style.display = 'none';
  }

  /**
   * Update Pinned items dropdown popover & count
   */
  _syncPinnedPopover() {
    const pinnedListEl = document.getElementById('pinned-items-list');
    const counterBadge = document.getElementById('pinned-counter-badge');
    const pinnedIds = portalStorage.getPinned();

    if (counterBadge) {
      counterBadge.textContent = String(pinnedIds.length);
      counterBadge.style.display = pinnedIds.length > 0 ? 'inline-flex' : 'none';
    }

    if (!pinnedListEl) return;

    if (pinnedIds.length === 0) {
      pinnedListEl.innerHTML = `<div class="pinned-empty">尚無釘選展館，可點擊卡片右上角釘選</div>`;
      return;
    }

    pinnedListEl.innerHTML = pinnedIds.map(id => {
      const meta = getPavilionById(id);
      if (!meta) return '';
      return `
        <div class="pinned-item">
          <a href="#pavilion-${meta.id}" class="pinned-link" data-target-id="${meta.id}">
            <span class="pinned-dot" style="background: ${meta.themeColor}; box-shadow: 0 0 8px ${meta.themeColor};"></span>
            <span>${meta.title} (${meta.nameZh})</span>
          </a>
          <button class="pin-remove-btn" data-unpin-id="${meta.id}" title="取消釘選">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
          </button>
        </div>
      `;
    }).join('');

    // Bind navigation click inside popover
    pinnedListEl.querySelectorAll('.pinned-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('data-target-id');
        this._scrollToPavilion(targetId);
        document.getElementById('pinned-popover')?.classList.remove('is-open');
        document.getElementById('btn-pinned-toggle')?.classList.remove('active');
      });
    });

    // Bind unpin button inside popover
    pinnedListEl.querySelectorAll('.pin-remove-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const unpinId = btn.getAttribute('data-unpin-id');
        portalStorage.togglePin(unpinId);
        // Also update the pin button inside the card if present
        const cardPinBtn = document.querySelector(`.pin-toggle-btn[data-pin-id="${unpinId}"]`);
        if (cardPinBtn) {
          cardPinBtn.classList.remove('is-pinned');
        }
      });
    });
  }

  /**
   * Smoothly scroll to a target slide/pavilion
   */
  _scrollToSlide(slideId) {
    const el = document.getElementById(slideId) || document.getElementById(`slot-${slideId}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  _scrollToPavilion(id) {
    this._scrollToSlide(id);
  }

  /**
   * Deck Slide Snap Observer & Dynamic Global Atmosphere Linkage Engine
   * Shifts body[data-active-theme] across: hero -> exp -> osk -> show -> tic -> cyb
   */
  _initDeckNavigation() {
    const slides = document.querySelectorAll('.deck-slide');
    const indicatorDots = document.querySelectorAll('.indicator-dot');
    const navLinks = document.querySelectorAll('.nav-link');

    // 1. IntersectionObserver to detect currently active 100dvh slide (threshold: 0.55)
    const observerOptions = {
      root: null,
      threshold: 0.55
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          const slideId = entry.target.id;
          pavilionRegistry.notifyLeave(slideId);
          return;
        }

        const slideId = entry.target.id;
        const theme = entry.target.getAttribute('data-slide-theme') || slideId;
        this._handleSlideEnter(slideId, theme);
      });
    }, observerOptions);

    slides.forEach(slide => observer.observe(slide));

    // 2. Right Floating Indicator Dock Dot clicks
    indicatorDots.forEach(dot => {
      dot.addEventListener('click', (e) => {
        e.preventDefault();
        const targetSlide = dot.getAttribute('data-target-slide');
        if (targetSlide) {
          this._scrollToSlide(targetSlide);
          this._playChime(620, 'sine', 0.12, 0.04);
        }
      });
    });

    // 3. Top Header Nav link clicks
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetSlide = link.getAttribute('data-slide-id') || link.getAttribute('href')?.replace('#', '');
        if (targetSlide) {
          this._scrollToSlide(targetSlide);
          this._playChime(620, 'sine', 0.12, 0.04);
        }
      });
    });
  }

  /**
   * Handle slide enter: update body[data-active-theme], indicators, colors, and notify plugins
   */
  _handleSlideEnter(slideId, theme) {
    if (this._currentActivePavilionId === slideId) return;
    this._currentActivePavilionId = slideId;

    // 1. Dynamic Central Theme Switch on Body (Links Header, Dock, and Pavilion atmosphere)
    document.body.dataset.activeTheme = theme;

    // 2. Update Right Indicator Dock active state
    document.querySelectorAll('.indicator-dot').forEach(dot => {
      const target = dot.getAttribute('data-target-slide');
      dot.classList.toggle('is-active', target === slideId);
    });

    // 3. Update Header Nav links & Mobile Nav items active state
    document.querySelectorAll('.nav-link').forEach(link => {
      const target = link.getAttribute('data-slide-id') || link.getAttribute('href')?.replace('#', '');
      link.classList.toggle('is-active', target === slideId);
    });
    document.querySelectorAll('.mobile-nav-item').forEach(item => {
      const target = item.getAttribute('data-slide-id');
      item.classList.toggle('is-active', target === slideId);
    });

    // 4. Update browser URL hash cleanly without page jump
    if (window.location.hash !== `#${slideId}`) {
      history.replaceState(null, '', `#${slideId}`);
    }

    // 5. Update Ambient CSS variables & Trigger specialized notifications
    const meta = getPavilionById(slideId);
    if (meta) {
      const root = document.documentElement;
      root.style.setProperty('--current-accent', meta.themeColor);
      root.style.setProperty('--current-accent-secondary', meta.secondaryColor);
      root.style.setProperty('--current-glow-1', meta.ambientGlow);
      root.style.setProperty('--current-glow-2', `rgba(${this._hexToRgb(meta.secondaryColor)}, 0.25)`);
      this._playChime(540, 'sine', 0.15, 0.03);
      pavilionRegistry.notifyEnter(slideId);
    } else if (slideId === 'hero') {
      this._resetAmbientHero();
    }
  }

  /**
   * Reset ambient light to default Hero state
   */
  _resetAmbientHero() {
    const root = document.documentElement;
    root.style.setProperty('--current-accent', '#a855f7');
    root.style.setProperty('--current-accent-secondary', '#60a5fa');
    root.style.setProperty('--current-glow-1', 'rgba(168, 85, 247, 0.35)');
    root.style.setProperty('--current-glow-2', 'rgba(96, 165, 250, 0.25)');
  }

  /**
   * Keyboard Arrow and Page Navigation for Deck Slides
   */
  _initKeyboardNavigation() {
    const slideIds = ['hero', 'exp', 'osk', 'show', 'tic', 'cyb'];

    window.addEventListener('keydown', (e) => {
      // Don't intercept if user is inside an input, textarea or modal
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) return;
      if (document.querySelector('.pavilion-exp-modal.is-open') || document.querySelector('.pavilion-tic-modal-backdrop.is-open')) return;

      const currentIndex = slideIds.indexOf(this._currentActivePavilionId || 'hero');
      if (currentIndex === -1) return;

      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        if (currentIndex < slideIds.length - 1) {
          e.preventDefault();
          this._scrollToSlide(slideIds[currentIndex + 1]);
        }
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        if (currentIndex > 0) {
          e.preventDefault();
          this._scrollToSlide(slideIds[currentIndex - 1]);
        }
      } else if (e.key === 'Home') {
        e.preventDefault();
        this._scrollToSlide(slideIds[0]);
      } else if (e.key === 'End') {
        e.preventDefault();
        this._scrollToSlide(slideIds[slideIds.length - 1]);
      }
    });
  }

  /**
   * Setup Back to Top Floating Button
   */
  _initBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        btn.classList.add('is-visible');
      } else {
        btn.classList.remove('is-visible');
      }
    }, { passive: true });

    btn.addEventListener('click', () => {
      this._scrollToSlide('hero');
      this._playChime(600, 'sine', 0.12, 0.04);
    });
  }

  /**
   * Setup Footer Visitor Counter (Non-blocking, Offline-safe & Hits.sh live beacon)
   */
  _initVisitorCounter() {
    const countEl = document.getElementById('visitor-count');
    if (!countEl) return;

    const STORAGE_KEY = 'aeschy_visitor_count';
    const SESSION_KEY = 'aeschy_session_counted';
    const BASE_OFFSET = 2418;

    let currentCount = parseInt(localStorage.getItem(STORAGE_KEY), 10);
    if (isNaN(currentCount) || currentCount < BASE_OFFSET) {
      currentCount = BASE_OFFSET;
    }

    if (!sessionStorage.getItem(SESSION_KEY)) {
      currentCount += 1;
      localStorage.setItem(STORAGE_KEY, currentCount.toString());
      sessionStorage.setItem(SESSION_KEY, '1');
    }

    countEl.textContent = currentCount.toLocaleString('en-US');

    // Trigger Hits.sh live count beacon for GitHub Pages asynchronously
    try {
      const beacon = new Image();
      beacon.src = `https://hits.sh/aeschyj.github.io.svg?view=today-total&ts=${Date.now()}`;
    } catch {
      // Graceful offline fallback
    }
  }

  /**
   * Utility: Convert Hex to R,G,B string
   */
  _hexToRgb(hex) {
    const cleaned = hex.replace('#', '');
    const bigint = parseInt(cleaned, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `${r}, ${g}, ${b}`;
  }
}

// Instantiate and Boot App on DOM ready
const app = new PortalApp();
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => app.init());
} else {
  app.init();
}

export { app };
