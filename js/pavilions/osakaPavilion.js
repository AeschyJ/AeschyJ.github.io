/**
 * Pavilion 02: Osaka Odyssey & Kansai Travelogue (OSK)
 * Interactive Controller & Component Lifecycle
 * Visual Style: Japanese Travel Magazine & Modern Wabi-Sabi Aesthetics
 */

import { pavilionRegistry } from './registry.js';
import { portalStorage } from '../storage.js';

const STORAGE_KEY_GOSHUIN = 'hub_osaka_goshuin_stamped';

// Curated 3 Kansai Highlights for the Mini Emaki Folding Scroll
const EMAKI_ITEMS = [
  {
    id: 'aoniyoshi',
    title: '近鐵特急・青丹吉',
    subtitle: '古都紫調・移動茶室',
    tag: '鐵道旅美學',
    thumb: './osaka/Photos_web/AONIYOSHI/IMG_20260824_090312_thumb.jpg',
    lead: '穿越千年的近鐵觀光特急「青丹吉」，在深紫天鵝絨座椅與和風花窗間，緩緩駛向斑鳩之里與奈良古都。'
  },
  {
    id: 'club_harie',
    title: '近江八幡・草屋根',
    subtitle: '藤森建築・童話綠丘',
    tag: '風土甜點美學',
    thumb: './osaka/Photos_web/Club%20Harie/IMG_20260826_104239_thumb.jpg',
    lead: '坐落於近江八幡的 La Collina，綠意昂然的草屋根與現烤年輪蛋糕香氣，交織出自然與烘焙的和諧樂章。'
  },
  {
    id: 'harbs',
    title: '心齋橋・法式千層',
    subtitle: '夏日果實・薄餅雲朵',
    tag: '旬味名店',
    thumb: './osaka/Photos_web/Harbs%20%E5%A4%A7%E4%B8%B8/IMG_20260824_162354_thumb.jpg',
    lead: '嚴選六種當令旬果與六層如雲朵般輕盈的鮮奶油千層薄餅，在繁華的心齋橋漫步午後綻放極致甘甜。'
  }
];

class OsakaPavilionComponent {
  constructor() {
    this._slotElement = null;
    this._meta = null;
    this._activeEmakiIndex = 0;
    this._audioCtx = null;
  }

  /**
   * Mount Pavilion into slot
   * @param {HTMLElement} slotElement 
   * @param {Object} meta 
   */
  mount(slotElement, meta) {
    this._slotElement = slotElement;
    this._meta = meta;
    this._render();
    this._bindEvents();
    this._syncInitialGoshuinState();
  }

  /**
   * Unmount & Cleanup
   */
  unmount() {
    if (this._slotElement) {
      this._slotElement.innerHTML = '';
    }
  }

  /**
   * Viewport trigger
   */
  onEnterViewport() {
    // Optional ambient trigger
  }

  /**
   * Synthesize Japanese Goshuin Wooden Stamp Impact Sound (Zero external audio file needed)
   */
  _playStampSound() {
    const prefs = portalStorage.getPrefs();
    if (!prefs.audioEnabled) return;

    try {
      if (!this._audioCtx && (window.AudioContext || window.webkitAudioContext)) {
        const AudioClass = window.AudioContext || window.webkitAudioContext;
        this._audioCtx = new AudioClass();
      }
      if (!this._audioCtx) return;
      if (this._audioCtx.state === 'suspended') {
        this._audioCtx.resume();
      }

      const ctx = this._audioCtx;
      const now = ctx.currentTime;

      // 1. Heavy Wooden Thud (Low frequency impulse)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(140, now);
      osc1.frequency.exponentialRampToValueAtTime(45, now + 0.12);
      gain1.gain.setValueAtTime(0.3, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.12);

      // 2. Crisp Temple Bell / Chime Overtone (High frequency resonant bell)
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(880, now + 0.02);
      osc2.frequency.exponentialRampToValueAtTime(520, now + 0.45);
      gain2.gain.setValueAtTime(0.08, now + 0.02);
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.45);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now + 0.02);
      osc2.stop(now + 0.45);
    } catch {
      // Ignore audio synthesis errors on strict autoplay environments
    }
  }

  /**
   * Render HTML Template
   */
  _render() {
    const isPinned = portalStorage.isPinned('osk');
    const orderFormatted = '02';

    this._slotElement.innerHTML = `
      <div class="pavilion-osk" data-pavilion-id="osk">
        <!-- Floating Gold Particles -->
        <div class="osk-gold-particle osk-p1"></div>
        <div class="osk-gold-particle osk-p2"></div>
        <div class="osk-gold-particle osk-p3"></div>
        <div class="osk-gold-particle osk-p4"></div>

        <div class="osk-inner">
          <!-- 1. Header Meta Bar -->
          <div class="osk-header-bar">
            <div class="osk-identity-group">
              <span class="osk-order-pill">NO. ${orderFormatted}</span>
              <span class="osk-status-chip">
                <span class="pulse-dot" style="background:#e11d48; box-shadow:0 0 8px #e11d48;"></span>
                TRAVEL MAGAZINE & GUIDE
              </span>
              <span class="osk-pwa-badge">
                <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                100% 離線 PWA
              </span>
            </div>
            <button class="osk-pin-btn ${isPinned ? 'is-pinned' : ''}" data-osk-pin title="${isPinned ? '取消釘選' : '釘選大阪旅誌'}">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="12" y1="17" x2="12" y2="22"></line>
                <path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6h1a1 1 0 0 0 0-2H8a1 1 0 0 0 0 2h1v4.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24Z"></path>
              </svg>
            </button>
          </div>

          <!-- 2. Main Body: Japanese Magazine Column + Goshuin Washi Stamp -->
          <div class="osk-main-body">
            <!-- Left: Editorial + Mini Emaki Scroll -->
            <div class="osk-editorial-col">
              <!-- Vertical Japanese Pillar -->
              <div class="osk-vertical-script" aria-hidden="true">
                <span class="osk-script-stamp">夏之栞</span>
                <span>關西行旅・一期一會</span>
              </div>

              <!-- Main Narrative -->
              <div class="osk-narrative-group">
                <span class="osk-kicker">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polygon points="12 8 8 12 12 16 12 8"/></svg>
                  Kansai Odyssey & Travelogue
                </span>

                <h2 class="osk-title">
                  Osaka Odyssey
                  <span class="osk-title-zh">關西極致旅誌・夏之栞</span>
                </h2>

                <div class="osk-tags-row">
                  <span class="osk-tag">日系行旅雜誌</span>
                  <span class="osk-tag">Leaflet 離線地圖</span>
                  <span class="osk-tag">名阪美食典藏</span>
                  <span class="osk-tag">TabiSync 助手</span>
                </div>

                <p class="osk-description-lead" id="osk-lead-text">
                  日系行旅雜誌風離線隨身導覽。將京都古雅幽香與大阪都會熱鬧收攏於指尖，支援離線路線繪製、高解析度精選相冊繪卷與御朱印刻印體驗。
                </p>

                <!-- Mini Emaki Folding Scroll Showcase -->
                <div class="osk-emaki-preview">
                  <div class="osk-emaki-header">
                    <span class="osk-emaki-label">
                      <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                      夏之栞・精選折本繪卷 (點擊切換)
                    </span>
                  </div>

                  <div class="osk-emaki-cards">
                    ${EMAKI_ITEMS.map((item, idx) => `
                      <div class="osk-emaki-card ${idx === 0 ? 'is-active' : ''}" data-emaki-index="${idx}" title="${item.title}">
                        <img src="${item.thumb}" alt="${item.title}" class="osk-emaki-img" loading="lazy" />
                        <div class="osk-emaki-overlay">
                          <span class="osk-emaki-caption">${item.title}</span>
                        </div>
                      </div>
                    `).join('')}
                  </div>
                </div>
              </div>
            </div>

            <!-- Right: Interactive Goshuin Stamp Paper -->
            <div class="osk-goshuin-col">
              <div class="osk-goshuin-paper">
                <div class="osk-goshuin-head">
                  <div class="osk-goshuin-kanji-title">
                    奉拜・極致行旅
                  </div>
                  <div class="osk-goshuin-date" id="osk-goshuin-date-label">
                    令和八年・盛夏
                  </div>
                </div>

                <!-- Stamp Slot Target -->
                <div class="osk-stamp-slot">
                  <div class="osk-stamp-placeholder" id="osk-stamp-placeholder">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="12" cy="12" r="4"/></svg>
                    <span>待刻印</span>
                  </div>

                  <!-- The Vermilion Stamp Seal Mark -->
                  <div class="osk-stamp-mark" id="osk-stamp-mark">
                    <span class="osk-stamp-char">關西</span>
                    <span class="osk-stamp-char">巡禮</span>
                    <span class="osk-stamp-sub">満願成就</span>
                  </div>
                  <div class="osk-ink-ripple"></div>
                </div>

                <div class="osk-goshuin-footer">
                  <span>難波・洛東・近江</span>
                  <span id="osk-stamp-status-text" style="color:#e11d48; font-weight:700;">未捺印</span>
                </div>
              </div>

              <!-- Stamp Action Trigger Button -->
              <button type="button" class="osk-stamp-trigger-btn" id="btn-osk-stamp">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                <span id="osk-stamp-btn-label">⛩️ 奉拜・落款刻印</span>
              </button>
            </div>
          </div>

          <!-- 3. Dual Launchers Group -->
          <div class="osk-actions-group">
            <a href="./osaka/" class="osk-btn-primary" data-osk-action="launch-app">
              <span>⛩️ 啟動 TabiSync 行程助手</span>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>

            <a href="./osaka/magazine.html" class="osk-btn-secondary" data-osk-action="launch-mag">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
              <span>📜 翻閱 夏之栞・行旅繪卷</span>
            </a>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Bind DOM Events
   */
  _bindEvents() {
    // 1. Mini Emaki Scroll Switching
    const emakiCards = this._slotElement.querySelectorAll('.osk-emaki-card');
    const leadText = this._slotElement.querySelector('#osk-lead-text');

    emakiCards.forEach(card => {
      card.addEventListener('click', () => {
        const index = parseInt(card.getAttribute('data-emaki-index'), 10);
        if (isNaN(index)) return;

        emakiCards.forEach(c => c.classList.toggle('is-active', c === card));
        this._activeEmakiIndex = index;
        const currentItem = EMAKI_ITEMS[index];
        if (currentItem && leadText) {
          leadText.textContent = `${currentItem.lead} 【${currentItem.subtitle}】`;
        }
      });
    });

    // 2. Interactive Goshuin Stamp Experience
    const stampBtn = this._slotElement.querySelector('#btn-osk-stamp');
    if (stampBtn) {
      stampBtn.addEventListener('click', () => this._handleStampClick());
    }

    // 3. Pin Toggle Button
    const pinBtn = this._slotElement.querySelector('[data-osk-pin]');
    if (pinBtn) {
      pinBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const nextState = portalStorage.togglePin('osk');
        pinBtn.classList.toggle('is-pinned', nextState);
        pinBtn.setAttribute('title', nextState ? '取消釘選' : '釘選大阪旅誌');
      });
    }

    // 4. Record Recent Visited on launch clicks
    const launchApp = this._slotElement.querySelector('[data-osk-action="launch-app"]');
    if (launchApp) {
      launchApp.addEventListener('click', () => portalStorage.setRecent('osk'));
    }

    const launchMag = this._slotElement.querySelector('[data-osk-action="launch-mag"]');
    if (launchMag) {
      launchMag.addEventListener('click', () => portalStorage.setRecent('osk'));
    }
  }

  /**
   * Check LocalStorage for existing Goshuin Stamp
   */
  _syncInitialGoshuinState() {
    try {
      const isStamped = localStorage.getItem(STORAGE_KEY_GOSHUIN) === 'true';
      if (isStamped) {
        this._applyStampedUI(false);
      }
    } catch {
      // LocalStorage access fallback
    }
  }

  /**
   * Handle user clicking "奉拜・刻印"
   */
  _handleStampClick() {
    const isCurrentlyStamped = localStorage.getItem(STORAGE_KEY_GOSHUIN) === 'true';

    if (isCurrentlyStamped) {
      // Allow re-stamping / toggling for guest joy
      try {
        localStorage.removeItem(STORAGE_KEY_GOSHUIN);
      } catch {}
      this._resetStampUI();
      return;
    }

    // Execute Stamping
    try {
      localStorage.setItem(STORAGE_KEY_GOSHUIN, 'true');
    } catch {}

    this._playStampSound();
    this._applyStampedUI(true);
  }

  /**
   * Apply Visual Stamped State
   * @param {boolean} triggerAnimation 
   */
  _applyStampedUI(triggerAnimation = true) {
    const stampMark = this._slotElement.querySelector('#osk-stamp-mark');
    const placeholder = this._slotElement.querySelector('#osk-stamp-placeholder');
    const statusText = this._slotElement.querySelector('#osk-stamp-status-text');
    const btnLabel = this._slotElement.querySelector('#osk-stamp-btn-label');
    const stampBtn = this._slotElement.querySelector('#btn-osk-stamp');

    if (placeholder) placeholder.style.display = 'none';

    if (stampMark) {
      stampMark.classList.remove('is-stamped');
      if (triggerAnimation) {
        // Trigger CSS animation reflow
        void stampMark.offsetWidth;
      }
      stampMark.classList.add('is-stamped');
    }

    if (statusText) {
      statusText.textContent = '已奉拜達成';
      statusText.style.color = '#dc2626';
    }

    if (btnLabel) {
      btnLabel.textContent = '✓ 御朱印已授與（點擊重新刻印）';
    }

    if (stampBtn) {
      stampBtn.classList.add('is-completed');
    }
  }

  /**
   * Reset Stamp UI back to unpressed state
   */
  _resetStampUI() {
    const stampMark = this._slotElement.querySelector('#osk-stamp-mark');
    const placeholder = this._slotElement.querySelector('#osk-stamp-placeholder');
    const statusText = this._slotElement.querySelector('#osk-stamp-status-text');
    const btnLabel = this._slotElement.querySelector('#osk-stamp-btn-label');
    const stampBtn = this._slotElement.querySelector('#btn-osk-stamp');

    if (placeholder) placeholder.style.display = 'flex';
    if (stampMark) stampMark.classList.remove('is-stamped');
    if (statusText) {
      statusText.textContent = '未捺印';
      statusText.style.color = '#78716c';
    }
    if (btnLabel) {
      btnLabel.textContent = '⛩️ 奉拜・落款刻印';
    }
    if (stampBtn) {
      stampBtn.classList.remove('is-completed');
    }
  }
}

// Export singleton instance
export const osakaPavilion = new OsakaPavilionComponent();

// Auto-register to Central Pavilion Registry
pavilionRegistry.registerPavilion('osk', osakaPavilion);
