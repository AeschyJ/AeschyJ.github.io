/**
 * Pavilion 01: Recipe KGAT Lab (EXP) - 國立臺灣大學工學院碩士論文成果展館
 * 題目：應用知識圖注意力網路於食譜推薦之效能評估與可解釋性研究
 * Performance Evaluation and Explainability Study of Knowledge Graph Attention Network for Recipe Recommendation
 * 指導教授：張瑞益 博士 | 作者：廖健合 (Jian-He Liao, R12525066)
 * 視覺風格：Academic Futurism & Knowledge Graph Optics (滿版無框設計)
 */

import { pavilionRegistry } from './registry.js';
import { portalStorage } from '../storage.js';

// 真實研究 Benchmark 數據集 (三次獨立運行平均值)
const BENCHMARK_DATA = {
  baseline: {
    name: 'LightGCN (Strong Baseline)',
    metrics: [
      { id: 'hr20', label: 'Hit Ratio @ 20 (HR@20)', val: 66.7, unit: '%', pct: 66.7 },
      { id: 'ndcg20', label: 'Ranking Quality (NDCG@20)', val: 38.4, unit: '%', pct: 38.4 },
      { id: 'hr10', label: 'Hit Ratio @ 10 (HR@10)', val: 53.2, unit: '%', pct: 53.2 },
      { id: 'coverage', label: 'XAI Path Coverage', val: 0.0, unit: '%', pct: 0 }
    ]
  },
  proposed: {
    name: 'KGAT-3L (Ours / 本研究)',
    metrics: [
      { id: 'hr20', label: 'Hit Ratio @ 20 (HR@20)', val: 87.8, unit: '%', pct: 87.8 }, // 0.8775 (+31.6%)
      { id: 'ndcg20', label: 'Ranking Quality (NDCG@20)', val: 53.1, unit: '%', pct: 53.1 }, // 0.5309 (+38.4%)
      { id: 'hr10', label: 'Hit Ratio @ 10 (HR@10)', val: 73.5, unit: '%', pct: 73.5 }, // 0.7348 (+38.1%)
      { id: 'coverage', label: 'XAI Path Coverage', val: 55.6, unit: '%', pct: 55.6 } // 500 位抽樣覆蓋率 55.6%
    ]
  }
};

const BIBTEX_CODE = `@mastersthesis{liao2026kgat,
  title={應用知識圖注意力網路於食譜推薦之效能評估與可解釋性研究},
  author={廖健合 (Liao, Jian-He)},
  school={國立臺灣大學工學院工程科學及海洋工程學系},
  year={2026},
  type={碩士學位論文},
  address={台北市, 台灣},
  keywords={知識圖, 注意力機制, 食譜推薦, 深度學習, 協同過濾, 可解釋性}
};`;

class ExperimentPavilionComponent {
  constructor() {
    this._slotElement = null;
    this._meta = null;
    this._currentModel = 'proposed'; // 'baseline' | 'proposed'
    this._animFrames = new Map();
    this._modalEl = null;
    this._handleKeyDown = this._handleKeyDown.bind(this);
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
    this._updateBenchmarkBars(false); // Initial render with animation
  }

  /**
   * Unmount & Cleanup
   */
  unmount() {
    // Cancel running animations
    this._animFrames.forEach(frameId => cancelAnimationFrame(frameId));
    this._animFrames.clear();

    // Remove keydown listener
    window.removeEventListener('keydown', this._handleKeyDown);

    // Remove modal from DOM if appended
    if (this._modalEl && this._modalEl.parentNode) {
      this._modalEl.parentNode.removeChild(this._modalEl);
    }
    this._modalEl = null;

    if (this._slotElement) {
      this._slotElement.innerHTML = '';
    }
  }

  /**
   * Viewport trigger: Trigger dynamic entry animations
   */
  onEnterViewport() {
    this._updateBenchmarkBars(true);
  }

  /**
   * Render HTML Template
   */
  _render() {
    const isPinned = portalStorage.isPinned('exp');
    const orderFormatted = '01';

    this._slotElement.innerHTML = `
      <div class="pavilion-exp full-bleed-surface" data-pavilion-id="exp">
        <!-- Ambient Quantum Optics Background -->
        <div class="exp-ambient-mesh" aria-hidden="true"></div>

        <div class="exp-container">
          <!-- 1. Meta Status Bar -->
          <div class="exp-header-bar">
            <div class="exp-identity-group">
              <span class="exp-order-pill">NO. ${orderFormatted}</span>
              <span class="exp-status-chip">
                <span class="pulse-dot" style="background:#a855f7; box-shadow:0 0 8px #a855f7;"></span>
                AI RESEARCH & BENCHMARK
              </span>
              <span class="exp-arxiv-pill" title="研究主題">
                Knowledge Graph Attention Network
              </span>
            </div>
            <button class="exp-pin-btn ${isPinned ? 'is-pinned' : ''}" data-exp-pin title="${isPinned ? '取消釘選' : '釘選實驗館'}">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="12" y1="17" x2="12" y2="22"></line>
                <path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6h1a1 1 0 0 0 0-2H8a1 1 0 0 0 0 2h1v4.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24Z"></path>
              </svg>
            </button>
          </div>

          <!-- 2. Main Content Grid (Full Bleed Web Presentation) -->
          <div class="exp-main-body">
            <!-- Left Column: Concise & Impactful Highlights -->
            <div class="exp-research-summary">
              <span class="exp-sub-kicker">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 18h12"/><path d="M10 2v7.5L4.5 18A2 2 0 0 0 6.2 21h11.6a2 2 0 0 0 1.7-3L14 9.5V2"/><path d="M8.5 2h7"/></svg>
                Graph Neural Networks • Recipe Recommendation • XAI
              </span>
              
              <h2 class="exp-title">
                Experiment
                <span class="exp-title-zh">KGAT 知識圖注意力網路 · 食譜推薦實驗</span>
              </h2>

              <div class="exp-badges-row">
                <span class="exp-badge exp-badge-highlight">HR@20: 0.8775 (+31.6%)</span>
                <span class="exp-badge">Food.com 7.2M Edges</span>
                <span class="exp-badge">PyTorch Native</span>
                <span class="exp-badge">Fidelity 忠實度檢驗</span>
              </div>

              <div class="exp-abstract-card">
                <p class="exp-pitch-text">
                  基於 Food.com 720 萬條邊之協同知識圖（CKG），透過系統性消融實證多跳知識傳播之顯著增益，並首度量化檢驗注意力路徑之「部分忠實性」。
                </p>
                <div class="exp-findings-grid">
                  <div class="exp-finding-item">
                    <span class="exp-finding-tag">+31.6% 顯著增益</span>
                    <p>三層架構 HR@20 達 0.8775，較單層提升逾 29%，相對最強基準模型 LightGCN 顯著提升 31.6%。</p>
                  </div>
                  <div class="exp-finding-item">
                    <span class="exp-finding-tag">資訊污染揭密</span>
                    <p>證實單層 (L=1) 加圖反而因雜訊稀釋訊號下降 4.7%，破除「加圖必增益」迷思。</p>
                  </div>
                  <div class="exp-finding-item">
                    <span class="exp-finding-tag">部分忠實度剖析</span>
                    <p>500 人抽樣驗證顯示 94.2% 路徑具正向必要性 (F⁺>0)，但 KG 語意路徑充分性偏低，打破注意力即因果之假說。</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Right Column: Interactive Benchmark Widget -->
            <div class="exp-benchmark-widget">
              <div class="exp-benchmark-header">
                <div class="exp-benchmark-title-wrap">
                  <span class="exp-benchmark-title">
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
                    實驗效能量化對比
                  </span>
                  <span class="exp-benchmark-sub">Food.com Dataset (3 Runs Avg)</span>
                </div>
                <div class="exp-benchmark-toggle-group">
                  <button class="exp-toggle-btn" data-model="baseline">LightGCN</button>
                  <button class="exp-toggle-btn is-active" data-model="proposed">KGAT-3L (Ours)</button>
                </div>
              </div>

              <div class="exp-metrics-list">
                ${BENCHMARK_DATA.proposed.metrics.map(m => `
                  <div class="exp-metric-item" data-metric-id="${m.id}">
                    <div class="exp-metric-meta">
                      <span class="exp-metric-label">${m.label}</span>
                      <span class="exp-metric-val is-proposed" id="exp-val-${m.id}">0${m.unit}</span>
                    </div>
                    <div class="exp-bar-track">
                      <div class="exp-bar-fill is-proposed" id="exp-bar-${m.id}" style="width: 0%;"></div>
                    </div>
                  </div>
                `).join('')}
              </div>

              <!-- Depth Progress Insight Bar -->
              <div class="exp-depth-insight">
                <span class="exp-depth-label">傳播深度消融進程：</span>
                <div class="exp-depth-steps">
                  <span class="exp-depth-pill">L=1 (0.6761)</span>
                  <span class="exp-depth-arrow">→</span>
                  <span class="exp-depth-pill">L=2 (0.7711)</span>
                  <span class="exp-depth-arrow">→</span>
                  <span class="exp-depth-pill is-highlight">L=3 (0.8775 ★)</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 3. Actions Group (No 404 links) -->
          <div class="exp-actions-group">
            <button type="button" class="exp-btn-primary" id="btn-open-research-modal">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
              <span>檢視論文架構與 Fidelity 案例 (Research Brief)</span>
            </button>

            <a href="https://github.com/AeschyJ/Recipe-Recommendation-KGAT" target="_blank" rel="noopener noreferrer" class="exp-btn-secondary" data-exp-action="launch">
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
              <span>GitHub 演算法源碼倉庫</span>
            </a>
          </div>
        </div>
      </div>
    `;

    this._createModal();
  }

  /**
   * Bind DOM Events
   */
  _bindEvents() {
    // 1. Model Benchmark Toggle
    const toggleBtns = this._slotElement.querySelectorAll('.exp-toggle-btn');
    toggleBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetModel = btn.getAttribute('data-model');
        if (targetModel === this._currentModel) return;

        toggleBtns.forEach(b => b.classList.toggle('is-active', b === btn));
        this._currentModel = targetModel;
        this._updateBenchmarkBars(true);
      });
    });

    // 2. Open Research Brief Modal
    const openModalBtn = this._slotElement.querySelector('#btn-open-research-modal');
    if (openModalBtn) {
      openModalBtn.addEventListener('click', () => this._openModal());
    }

    // 3. Pin Toggle Button
    const pinBtn = this._slotElement.querySelector('[data-exp-pin]');
    if (pinBtn) {
      pinBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const nextState = portalStorage.togglePin('exp');
        pinBtn.classList.toggle('is-pinned', nextState);
        pinBtn.setAttribute('title', nextState ? '取消釘選' : '釘選量子實驗館');
      });
    }

    // 4. Record Recent Visited on launch
    const launchLink = this._slotElement.querySelector('[data-exp-action="launch"]');
    if (launchLink) {
      launchLink.addEventListener('click', () => {
        portalStorage.setRecent('exp');
      });
    }
  }

  /**
   * Dynamic Counter & Smooth Bar Transition
   */
  _updateBenchmarkBars(shouldAnimate = true) {
    const dataset = BENCHMARK_DATA[this._currentModel];
    const isProposed = this._currentModel === 'proposed';

    dataset.metrics.forEach(m => {
      const barEl = this._slotElement.querySelector(`#exp-bar-${m.id}`);
      const valEl = this._slotElement.querySelector(`#exp-val-${m.id}`);
      if (!barEl || !valEl) return;

      // Class toggles for styling
      barEl.classList.toggle('is-proposed', isProposed);
      valEl.classList.toggle('is-proposed', isProposed);

      // Bar Width Fill
      barEl.style.width = `${m.pct}%`;

      // Smooth count-up animation
      if (shouldAnimate) {
        this._animateCounter(m.id, valEl, m.val, m.unit);
      } else {
        valEl.textContent = `${m.val}${m.unit}`;
      }
    });
  }

  /**
   * Linear interpolation counter animation
   */
  _animateCounter(id, element, targetVal, unit) {
    if (this._animFrames.has(id)) {
      cancelAnimationFrame(this._animFrames.get(id));
    }

    const startTime = performance.now();
    const duration = 650; // ms
    const initialText = element.textContent.replace(/[^0-9.]/g, '');
    const startVal = parseFloat(initialText) || 0;
    const diff = targetVal - startVal;

    const step = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = startVal + diff * ease;

      const isFloat = targetVal % 1 !== 0;
      element.textContent = `${isFloat ? current.toFixed(1) : Math.round(current)}${unit}`;

      if (progress < 1) {
        const frameId = requestAnimationFrame(step);
        this._animFrames.set(id, frameId);
      } else {
        element.textContent = `${targetVal}${unit}`;
        this._animFrames.delete(id);
      }
    };

    const frameId = requestAnimationFrame(step);
    this._animFrames.set(id, frameId);
  }

  /**
   * Create Research Brief Modal DOM
   */
  _createModal() {
    this._modalEl = document.createElement('div');
    this._modalEl.className = 'pavilion-exp-modal';
    this._modalEl.id = 'modal-exp-research';
    this._modalEl.setAttribute('role', 'dialog');
    this._modalEl.setAttribute('aria-modal', 'true');

    this._modalEl.innerHTML = `
      <div class="exp-modal-backdrop" data-close-modal></div>
      <div class="exp-modal-window">
        <button class="exp-modal-close-btn" data-close-modal title="關閉視窗 (ESC)">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
        </button>

        <div class="exp-modal-title-group">
          <span class="exp-modal-kicker">演算法核心架構與反事實評估</span>
          <h3 class="exp-modal-title">KGAT 食譜推薦四階段傳播架構與反事實 Fidelity 量化</h3>
        </div>

        <!-- High-Precision Pure SVG KGAT 4-Stage Architecture Diagram -->
        <div class="exp-modal-diagram">
          <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.75rem; color:#a855f7; font-weight:600; text-transform:uppercase; letter-spacing:0.06em;">
            <span>KGAT 四階段傳播流程 (CKG Embedding → Attentive Propagation → Aggregation → Prediction)</span>
            <span>7.2M Edges · Vector Schema</span>
          </div>
          <svg class="exp-diagram-svg" viewBox="0 0 680 180" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="exp-flow-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#a855f7" />
                <stop offset="50%" stop-color="#38bdf8" />
                <stop offset="100%" stop-color="#c084fc" />
              </linearGradient>
            </defs>

            <!-- Grid backdrop -->
            <rect width="680" height="180" rx="8" fill="#120c1f" />
            <path d="M 0 45 L 680 45 M 0 90 L 680 90 M 0 135 L 680 135" stroke="rgba(168,85,247,0.08)" stroke-dasharray="4 4" />

            <!-- Block 1: CKG Embedding (TransR) -->
            <rect x="20" y="30" width="135" height="120" rx="6" fill="#1e1533" stroke="#a855f7" stroke-width="1.5" />
            <text x="87" y="55" fill="#f8fafc" font-size="11" font-weight="700" text-anchor="middle">Stage 1: 嵌入表示</text>
            <text x="87" y="75" fill="#c084fc" font-size="9.5" text-anchor="middle">TransR (e_h + W_r ≈ e_t)</text>
            <text x="87" y="98" fill="#94a3b8" font-size="8.5" text-anchor="middle">用戶 · 食譜 · 食材</text>
            <text x="87" y="115" fill="#94a3b8" font-size="8.5" text-anchor="middle">標籤 · 技法 · 設備</text>
            <text x="87" y="133" fill="#a855f7" font-size="8.5" font-weight="600" text-anchor="middle">231K 實體 · 7.2M 邊</text>

            <!-- Arrow 1 -->
            <path d="M 155 90 L 185 90" stroke="url(#exp-flow-grad)" stroke-width="2" />
            <polygon points="188,90 180,86 180,94" fill="#38bdf8" />

            <!-- Block 2: Attentive Propagation -->
            <rect x="190" y="30" width="145" height="120" rx="6" fill="#1e1533" stroke="#38bdf8" stroke-width="1.5" />
            <text x="262" y="55" fill="#f8fafc" font-size="11" font-weight="700" text-anchor="middle">Stage 2: 注意力傳播</text>
            <text x="262" y="75" fill="#38bdf8" font-size="9.5" text-anchor="middle">π(h, r, t) 注意力權重</text>
            <text x="262" y="98" fill="#cbd5e1" font-size="8.5" text-anchor="middle">一階關係投影評分</text>
            <text x="262" y="115" fill="#94a3b8" font-size="8.5" text-anchor="middle">鄰域資訊加權聚集</text>
            <text x="262" y="133" fill="#38bdf8" font-size="8.5" font-weight="600" text-anchor="middle">e_{N_h} = ∑ π·e_t</text>

            <!-- Arrow 2 -->
            <path d="M 335 90 L 365 90" stroke="url(#exp-flow-grad)" stroke-width="2" />
            <polygon points="368,90 360,86 360,94" fill="#38bdf8" />

            <!-- Block 3: Aggregation (L-Layers) -->
            <rect x="370" y="30" width="140" height="120" rx="6" fill="#1e1533" stroke="#c084fc" stroke-width="1.5" />
            <text x="440" y="55" fill="#f8fafc" font-size="11" font-weight="700" text-anchor="middle">Stage 3: 階層聚集</text>
            <text x="440" y="75" fill="#c084fc" font-size="9.5" text-anchor="middle">Bi-Interaction 聚合</text>
            <text x="440" y="98" fill="#94a3b8" font-size="8.5" text-anchor="middle">L=1: 0.6761 (雜訊污染)</text>
            <text x="440" y="115" fill="#94a3b8" font-size="8.5" text-anchor="middle">L=2: 0.7711 (跨域傳播)</text>
            <text x="440" y="133" fill="#34d399" font-size="8.5" font-weight="700" text-anchor="middle">L=3: 0.8775 (高階突破)</text>

            <!-- Arrow 3 -->
            <path d="M 510 90 L 540 90" stroke="url(#exp-flow-grad)" stroke-width="2" />
            <polygon points="543,90 535,86 535,94" fill="#c084fc" />

            <!-- Block 4: Counterfactual Fidelity -->
            <rect x="545" y="30" width="120" height="120" rx="6" fill="#1e1533" stroke="#a855f7" stroke-width="1.5" />
            <text x="605" y="55" fill="#f8fafc" font-size="11" font-weight="700" text-anchor="middle">Stage 4: 忠實度檢驗</text>
            <text x="605" y="75" fill="#34d399" font-size="9.5" text-anchor="middle">Fidelity (必要/充分性)</text>
            <text x="605" y="98" fill="#cbd5e1" font-size="8.5" text-anchor="middle">500 人均勻抽樣</text>
            <text x="605" y="115" fill="#38bdf8" font-size="8.5" text-anchor="middle">94.2% F+ > 0 正向必要</text>
            <text x="605" y="133" fill="#a855f7" font-size="8.5" font-weight="600" text-anchor="middle">揭示部分忠實性</text>
          </svg>
        </div>

        <div class="exp-contributions-list">
          <strong>Key Research Findings & Contributions (論文核心成果與發現)：</strong>
          <ul>
            <li><strong>真實巨量知識圖驗證：</strong>基於 Food.com 22.6 萬用戶與 23.1 萬食譜，修剪並建構出包含 7,206,786 條關係邊之協同知識圖（CKG），涵蓋食材、標籤、技法與器具等多維實體。</li>
            <li><strong>揭示單層知識圖「資訊污染（Information Pollution）」效應：</strong>消融實驗發現，引入 1 層 KG 的表現（0.6761）反而比純協同過濾基準衰退 4.7%，證實淺層知識圖引入的噪音會稀釋用戶行為訊號；唯有堆疊至 3 層（HR@20: 0.8775）才能完全發揮高階語意傳播優勢（相對最強基準模型 LightGCN +31.6%）。</li>
            <li><strong>反事實注意力忠實度檢驗（Fidelity Evaluation）：</strong>對 500 位抽樣用戶進行反事實邊遮蔽（Fidelity+ / Fidelity-），實證揭露注意力解釋僅具「部分忠實性」：94.2% 的萃取路徑雖展現正向必要性（F+ > 0），但 KG 語意路徑充分性偏低（F- = 0.2449），打破了注意力權重等同於完整決策因果的既定假設。</li>
          </ul>
        </div>

        <div style="display:flex; flex-direction:column; gap:8px;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span style="font-size:0.75rem; font-weight:700; color:#c084fc; text-transform:uppercase;">BibTeX Citation (論文引用格式)</span>
            <button id="btn-copy-bibtex" style="font-size:0.75rem; padding:3px 10px; border-radius:4px; background:rgba(168,85,247,0.15); color:#e9d5ff; border:1px solid rgba(168,85,247,0.3); cursor:pointer;">
              複製 BibTeX
            </button>
          </div>
          <div class="exp-bibtex-box">${BIBTEX_CODE}</div>
        </div>

        <div class="exp-modal-footer">
          <a href="https://github.com/AeschyJ/Recipe-Recommendation-KGAT" target="_blank" rel="noopener noreferrer" class="exp-btn-primary" style="padding: 8px 18px; font-size: 0.84rem;">
            <span>在 GitHub 上檢視演算法實作</span>
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
          </a>
          <button class="exp-btn-secondary" data-close-modal style="padding: 8px 16px; font-size: 0.84rem;">
            <span>返回展廳</span>
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(this._modalEl);

    // Bind modal close events
    this._modalEl.querySelectorAll('[data-close-modal]').forEach(el => {
      el.addEventListener('click', () => this._closeModal());
    });

    // Copy BibTeX button
    const copyBtn = this._modalEl.querySelector('#btn-copy-bibtex');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(BIBTEX_CODE).then(() => {
          const originalText = copyBtn.textContent;
          copyBtn.textContent = '✓ 已複製！';
          copyBtn.style.color = '#38bdf8';
          setTimeout(() => {
            copyBtn.textContent = originalText;
            copyBtn.style.color = '';
          }, 1800);
        });
      });
    }
  }

  _openModal() {
    if (this._modalEl) {
      this._modalEl.classList.add('is-open');
      window.addEventListener('keydown', this._handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
  }

  _closeModal() {
    if (this._modalEl) {
      this._modalEl.classList.remove('is-open');
      window.removeEventListener('keydown', this._handleKeyDown);
      document.body.style.overflow = '';
    }
  }

  _handleKeyDown(e) {
    if (e.key === 'Escape') {
      this._closeModal();
    }
  }
}

// Export singleton instance
export const experimentPavilion = new ExperimentPavilionComponent();

// Auto-register to Central Pavilion Registry
pavilionRegistry.registerPavilion('exp', experimentPavilion);
