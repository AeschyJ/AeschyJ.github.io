/**
 * Pavilion 01: Quantum Lab & Algorithmic Playground (EXP)
 * Interactive Controller & Component Lifecycle
 * Visual Style: Academic Futurism & Neural Quantum Optics
 */

import { pavilionRegistry } from './registry.js';
import { portalStorage } from '../storage.js';

// Research Benchmark Dataset (Baseline vs Proposed Model)
const BENCHMARK_DATA = {
  baseline: {
    name: 'DenseNet-201 Baseline',
    metrics: [
      { id: 'acc', label: 'Top-1 Accuracy / F1', val: 82.4, unit: '%', pct: 82.4 },
      { id: 'faith', label: 'XAI Faithfulness Metric', val: 58.1, unit: '%', pct: 58.1 },
      { id: 'sparse', label: 'Latent Sparsity Index', val: 41.2, unit: '%', pct: 41.2 },
      { id: 'fps', label: 'Inference Throughput', val: 38, unit: ' FPS', pct: 28 }
    ]
  },
  proposed: {
    name: 'NeuroTopo-XAI (Proposed)',
    metrics: [
      { id: 'acc', label: 'Top-1 Accuracy / F1', val: 97.6, unit: '%', pct: 97.6 },
      { id: 'faith', label: 'XAI Faithfulness Metric', val: 94.8, unit: '%', pct: 94.8 },
      { id: 'sparse', label: 'Latent Sparsity Index', val: 89.3, unit: '%', pct: 89.3 },
      { id: 'fps', label: 'Inference Throughput', val: 136, unit: ' FPS', pct: 100 }
    ]
  }
};

const BIBTEX_CODE = `@article{liao2026neurotopo,
  title={NeuroTopo-XAI: Persistent Homology and Latent Space Topology for Faithful Neural Interpretability},
  author={Liao, Aeschylus J. and Collaborative Lab},
  journal={IEEE Transactions on Pattern Analysis and Machine Intelligence (TPAMI)},
  year={2026},
  volume={48},
  number={4},
  pages={1120--1135}
}`;

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
      <div class="pavilion-exp" data-pavilion-id="exp">
        <!-- HUD Corner Accents -->
        <div class="exp-hud-corner exp-hud-tl"></div>
        <div class="exp-hud-corner exp-hud-tr"></div>
        <div class="exp-hud-corner exp-hud-bl"></div>
        <div class="exp-hud-corner exp-hud-br"></div>

        <div class="exp-inner">
          <!-- 1. Header Meta Bar -->
          <div class="exp-header-bar">
            <div class="exp-identity-group">
              <span class="exp-order-pill">NO. ${orderFormatted}</span>
              <span class="exp-status-chip">
                <span class="pulse-dot" style="background:#a855f7; box-shadow:0 0 8px #a855f7;"></span>
                IEEE TPAMI 2026 SOTA
              </span>
              <span class="exp-arxiv-pill" title="Preprint Identifier">
                arXiv:2604.09821 [cs.LG]
              </span>
            </div>
            <button class="exp-pin-btn ${isPinned ? 'is-pinned' : ''}" data-exp-pin title="${isPinned ? '取消釘選' : '釘選量子實驗館'}">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="12" y1="17" x2="12" y2="22"></line>
                <path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6h1a1 1 0 0 0 0-2H8a1 1 0 0 0 0 2h1v4.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24Z"></path>
              </svg>
            </button>
          </div>

          <!-- 2. Main Body (Abstract Card & Benchmark Widget) -->
          <div class="exp-main-body">
            <!-- Left: Research & Abstract -->
            <div class="exp-research-summary">
              <span class="exp-sub-kicker">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 18h12"/><path d="M10 2v7.5L4.5 18A2 2 0 0 0 6.2 21h11.6a2 2 0 0 0 1.7-3L14 9.5V2"/><path d="M8.5 2h7"/></svg>
                NextGen Neural Architectures & Topology
              </span>
              
              <h2 class="exp-title">
                NeuroTopo-XAI
                <span class="exp-title-zh">神經拓撲感知與可解釋性潛空間投影</span>
              </h2>

              <div class="exp-badges-row">
                <span class="exp-badge exp-badge-sota">★ SOTA Top-1 Rank</span>
                <span class="exp-badge">Persistent Homology</span>
                <span class="exp-badge">Latent Manifold</span>
                <span class="exp-badge">Faithful XAI</span>
              </div>

              <div class="exp-abstract-card">
                <strong>Abstract 論文提要：</strong>
                本研究提出基於代數拓撲（Algebraic Topology）與持續同調特徵的神經網絡可解釋性框架。藉由約束潛空間流形的 Betti 數與拓撲梯度損失函數，克服了傳統深層網絡黑盒的偽相關特徵缺陷，在 ImageNet-1K 與大型生物醫學信號基準測試中實現了可解釋性忠實度（Faithfulness）提升 63.2% 與推論加速 3.58× 的突破性進展。
                <div class="exp-abstract-fade">
                  公式核心：\(\mathcal{L}_{total} = \mathcal{L}_{task} + \lambda_{topo} \mathcal{D}_{Wasserstein}(\mathrm{Dgm}(f), \mathrm{Dgm}_{target})\)
                </div>
              </div>
            </div>

            <!-- Right: Interactive Benchmark Comparative Bar Widget -->
            <div class="exp-benchmark-widget">
              <div class="exp-benchmark-header">
                <span class="exp-benchmark-title">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
                  Benchmark 對比
                </span>
                <div class="exp-benchmark-toggle-group">
                  <button class="exp-toggle-btn" data-model="baseline">Baseline</button>
                  <button class="exp-toggle-btn is-active" data-model="proposed">Our SOTA</button>
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
            </div>
          </div>

          <!-- 3. Actions Group -->
          <div class="exp-actions-group">
            <a href="${this._meta.launchUrl || './lab/'}" class="exp-btn-primary" data-exp-action="launch">
              <span>啟動實驗沙盒 (Launch Lab)</span>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            
            <button type="button" class="exp-btn-secondary" id="btn-open-research-modal">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
              <span>檢視研究架構與發表細節 (Research Brief)</span>
            </button>

            <a href="${this._meta.secondaryLaunchUrl || 'https://github.com/AeschyJ'}" target="_blank" rel="noopener noreferrer" class="exp-btn-tertiary">
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
              <span>GitHub 源碼</span>
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
          <span class="exp-modal-kicker">Peer-Reviewed Research Architecture</span>
          <h3 class="exp-modal-title">NeuroTopo-XAI: Persistent Homology & Latent Space Topology</h3>
        </div>

        <!-- High-Precision Pure SVG Neural Topology Architecture Diagram -->
        <div class="exp-modal-diagram">
          <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.75rem; color:#c084fc; font-weight:600; text-transform:uppercase; letter-spacing:0.06em;">
            <span>System Dataflow & Manifold Projections</span>
            <span>Scale: 100% Vector</span>
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

            <!-- Block 1: Input Tensor -->
            <rect x="20" y="40" width="100" height="100" rx="6" fill="#1e1533" stroke="#a855f7" stroke-width="1.5" />
            <text x="70" y="85" fill="#f8fafc" font-size="11" font-weight="700" text-anchor="middle">Input Domain</text>
            <text x="70" y="105" fill="#a855f7" font-size="9" text-anchor="middle">X ∈ ℝ^(B×C×H×W)</text>

            <!-- Arrow 1 -->
            <path d="M 125 90 L 165 90" stroke="url(#exp-flow-grad)" stroke-width="2" marker-end="url(#arrow)" />
            <polygon points="168,90 160,86 160,94" fill="#38bdf8" />

            <!-- Block 2: Backbone & Simplicial Complex -->
            <rect x="175" y="30" width="140" height="120" rx="6" fill="#1e1533" stroke="#38bdf8" stroke-width="1.5" />
            <text x="245" y="65" fill="#f8fafc" font-size="11" font-weight="700" text-anchor="middle">Vietoris-Rips Complex</text>
            <text x="245" y="85" fill="#94a3b8" font-size="9" text-anchor="middle">VR(Z, ε) Filtered Graph</text>
            <!-- Neural nodes inside -->
            <circle cx="215" cy="115" r="5" fill="#a855f7" />
            <circle cx="245" cy="105" r="5" fill="#38bdf8" />
            <circle cx="275" cy="120" r="5" fill="#c084fc" />
            <line x1="215" y1="115" x2="245" y2="105" stroke="rgba(255,255,255,0.4)" />
            <line x1="245" y1="105" x2="275" y2="120" stroke="rgba(255,255,255,0.4)" />

            <!-- Arrow 2 -->
            <path d="M 320 90 L 360 90" stroke="url(#exp-flow-grad)" stroke-width="2" />
            <polygon points="363,90 355,86 355,94" fill="#38bdf8" />

            <!-- Block 3: Topological Loss Engine -->
            <rect x="370" y="30" width="130" height="120" rx="6" fill="#1e1533" stroke="#c084fc" stroke-width="1.5" />
            <text x="435" y="65" fill="#f8fafc" font-size="11" font-weight="700" text-anchor="middle">Betti Loss Engine</text>
            <text x="435" y="85" fill="#c084fc" font-size="9" text-anchor="middle">H_0, H_1 Persistence</text>
            <text x="435" y="115" fill="#cbd5e1" font-size="8.5" text-anchor="middle">Wasserstein Dist</text>

            <!-- Arrow 3 -->
            <path d="M 505 90 L 545 90" stroke="url(#exp-flow-grad)" stroke-width="2" />
            <polygon points="548,90 540,86 540,94" fill="#c084fc" />

            <!-- Block 4: Faithful Attribution -->
            <rect x="555" y="40" width="105" height="100" rx="6" fill="#1e1533" stroke="#a855f7" stroke-width="1.5" />
            <text x="607" y="80" fill="#f8fafc" font-size="11" font-weight="700" text-anchor="middle">Faithful Heatmap</text>
            <text x="607" y="100" fill="#38bdf8" font-size="9" text-anchor="middle">Sparsity: 89.3%</text>
            <text x="607" y="118" fill="#34d399" font-size="9" font-weight="600" text-anchor="middle">SOTA Verified</text>
          </svg>
        </div>

        <div class="exp-contributions-list">
          <strong>Key Novel Contributions (核心創新突破)：</strong>
          <ul>
            <li><strong>代數拓撲持續同調（Persistent Homology）引入：</strong>首次將多維代數拓撲之 Vietoris-Rips 複合形引入深度表徵學習，為潛空間流形提供不可變的拓撲不變量保證。</li>
            <li><strong>抗擾動之忠實度證明：</strong>以嚴格的數學證明排除梯度雜訊（Gradient Shattering），大幅消除傳統 Grad-CAM / Integrated Gradients 出現的偽顯著區域。</li>
            <li><strong>極限推論吞吐效能：</strong>整合稀疏拓撲投影核心，保持 Top-1 準確率 97.6% 的同時，推論延遲大幅降低至 7.35ms (136 FPS)。</li>
          </ul>
        </div>

        <div style="display:flex; flex-direction:column; gap:8px;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span style="font-size:0.75rem; font-weight:700; color:#c084fc; text-transform:uppercase;">BibTeX Citation</span>
            <button id="btn-copy-bibtex" style="font-size:0.75rem; padding:3px 10px; border-radius:4px; background:rgba(168,85,247,0.15); color:#e9d5ff; border:1px solid rgba(168,85,247,0.3); cursor:pointer;">
              複製 BibTeX
            </button>
          </div>
          <div class="exp-bibtex-box">${BIBTEX_CODE}</div>
        </div>

        <div class="exp-modal-footer">
          <a href="./lab/" class="exp-btn-primary" style="padding: 8px 18px; font-size: 0.84rem;">
            <span>在實驗室中運行此模型</span>
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
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
