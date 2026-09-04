/**
 * Floating Portal Pill (微縮回航膠囊)
 * 極輕量、純原生、零依賴且具備現代毛玻璃質感的子專案非侵入式回航導覽元件
 *
 * 使用方式:
 * <script src="./js/portal-pill.js" data-target="../" data-label="Antigravity Hub" data-position="bottom-right"></script>
 */
(function () {
  'use strict';

  // 避免重複初始化
  if (window.__PORTAL_PILL_LOADED__) return;
  window.__PORTAL_PILL_LOADED__ = true;

  // 取得當前 script 標籤的設定參數
  const currentScript = document.currentScript || (function () {
    const scripts = document.getElementsByTagName('script');
    return scripts[scripts.length - 1];
  })();

  const targetUrl = currentScript?.getAttribute('data-target') || '../';
  const pillLabel = currentScript?.getAttribute('data-label') || 'Antigravity Hub';
  const position = currentScript?.getAttribute('data-position') || 'bottom-right';
  const theme = currentScript?.getAttribute('data-theme') || 'auto';

  // 建立 Shadow DOM 容器避免任何 CSS 樣式衝突
  const host = document.createElement('div');
  host.id = 'portal-pill-host';
  const shadow = host.attachShadow({ mode: 'open' });

  // 注入獨立封裝樣式
  const style = document.createElement('style');
  style.textContent = `
    :host {
      all: initial;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", "PingFang SC", "Noto Sans TC", sans-serif;
      z-index: 999999;
      position: fixed;
      pointer-events: none;
    }

    .portal-pill-container {
      position: fixed;
      pointer-events: auto;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
      user-select: none;
      -webkit-user-select: none;
      -webkit-tap-highlight-color: transparent;
    }

    /* 四角懸浮與移動設備 Safe Area 兼容 */
    .pos-bottom-right {
      bottom: max(16px, env(safe-area-inset-bottom, 16px));
      right: max(16px, env(safe-area-inset-right, 16px));
    }
    .pos-bottom-left {
      bottom: max(16px, env(safe-area-inset-bottom, 16px));
      left: max(16px, env(safe-area-inset-left, 16px));
    }
    .pos-top-left {
      top: max(16px, env(safe-area-inset-top, 16px));
      left: max(16px, env(safe-area-inset-left, 16px));
    }
    .pos-top-right {
      top: max(16px, env(safe-area-inset-top, 16px));
      right: max(16px, env(safe-area-inset-right, 16px));
    }

    /* 膠囊本體 (現代晶體毛玻璃質感) */
    .portal-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 7px 15px 7px 10px;
      border-radius: 9999px;
      cursor: pointer;
      text-decoration: none;
      font-size: 12.5px;
      font-weight: 600;
      letter-spacing: 0.02em;
      outline: none;
      border: 1px solid rgba(255, 255, 255, 0.2);
      background: rgba(15, 18, 28, 0.75);
      color: rgba(255, 255, 255, 0.95);
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3), 0 2px 8px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2);
      backdrop-filter: blur(20px) saturate(190%);
      -webkit-backdrop-filter: blur(20px) saturate(190%);
      transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
      opacity: 0.92;
      max-width: 240px;
      overflow: hidden;
      white-space: nowrap;
    }

    /* 淺色主題相容 */
    @media (prefers-color-scheme: light) {
      .portal-btn.theme-auto {
        background: rgba(255, 255, 255, 0.82);
        color: #1e293b;
        border: 1px solid rgba(0, 0, 0, 0.1);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1), 0 2px 8px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.95);
      }
      .portal-btn.theme-auto .portal-icon-wrapper {
        background: linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(168, 85, 247, 0.2));
        color: #4f46e5;
      }
    }
    .portal-btn.theme-dark {
      background: rgba(15, 18, 28, 0.78);
      color: rgba(255, 255, 255, 0.95);
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
    .portal-btn.theme-light {
      background: rgba(255, 255, 255, 0.85);
      color: #1e293b;
      border: 1px solid rgba(0, 0, 0, 0.1);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1), 0 2px 8px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.95);
    }

    /* 懸停與觸控動態 */
    .portal-btn:hover {
      opacity: 1;
      transform: translateY(-2px) scale(1.02);
      border-color: rgba(129, 140, 248, 0.5);
      box-shadow: 0 12px 32px rgba(0, 0, 0, 0.35), 0 0 20px rgba(99, 102, 241, 0.3);
    }
    .portal-btn:active {
      transform: translateY(0px) scale(0.95);
      box-shadow: 0 3px 12px rgba(0, 0, 0, 0.25);
    }

    /* 圖標外環微光 */
    .portal-icon-wrapper {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: linear-gradient(135deg, rgba(99, 102, 241, 0.35), rgba(168, 85, 247, 0.35));
      color: #c7d2fe;
      flex-shrink: 0;
      transition: transform 0.3s ease;
    }
    .portal-btn:hover .portal-icon-wrapper {
      transform: rotate(-15deg) scale(1.1);
      color: #ffffff;
    }

    .portal-icon-wrapper svg {
      width: 14px;
      height: 14px;
      fill: none;
      stroke: currentColor;
      stroke-width: 2.3;
      stroke-linecap: round;
      stroke-linejoin: round;
    }

    .portal-text {
      display: inline-block;
      font-size: 12px;
      transition: opacity 0.2s ease, transform 0.2s ease;
    }

    /* PWA Standalone 模式專屬指示 */
    .pwa-badge {
      display: none;
      font-size: 9px;
      padding: 2px 6px;
      border-radius: 999px;
      background: rgba(99, 102, 241, 0.25);
      color: #a5b4fc;
      font-weight: 700;
      letter-spacing: 0.05em;
    }
    .is-standalone .pwa-badge {
      display: inline-block;
    }

    /* 閒置自動微縮保護：避免遮擋原本畫面與互動 */
    .portal-pill-container.is-idle .portal-btn {
      opacity: 0.5;
      padding: 7px;
      border-radius: 50%;
      max-width: 40px;
    }
    .portal-pill-container.is-idle .portal-text,
    .portal-pill-container.is-idle .pwa-badge {
      display: none;
    }
    .portal-pill-container.is-idle:hover .portal-btn {
      opacity: 1;
      padding: 7px 15px 7px 10px;
      border-radius: 9999px;
      max-width: 240px;
    }
    .portal-pill-container.is-idle:hover .portal-text {
      display: inline-block;
    }
    .portal-pill-container.is-idle:hover .is-standalone .pwa-badge {
      display: inline-block;
    }
  `;

  // 偵測獨立視窗 PWA
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches || 
                       window.navigator.standalone === true;

  // 建立元素
  const container = document.createElement('div');
  container.className = `portal-pill-container pos-${position} ${isStandalone ? 'is-standalone' : ''}`;

  const link = document.createElement('a');
  link.href = targetUrl;
  link.className = `portal-btn theme-${theme}`;
  link.title = `返回 ${pillLabel} (${targetUrl})`;
  link.setAttribute('aria-label', `返回 ${pillLabel}`);

  link.innerHTML = `
    <span class="portal-icon-wrapper">
      <svg viewBox="0 0 24 24">
        <path d="M19 12H5M12 19l-7-7 7-7"/>
      </svg>
    </span>
    <span class="portal-text">${pillLabel}</span>
    <span class="pwa-badge">HUB</span>
  `;

  // 點擊平滑動畫轉場
  link.addEventListener('click', (e) => {
    e.preventDefault();
    link.style.transform = 'scale(0.92)';
    link.style.opacity = '0.4';
    setTimeout(() => {
      window.location.href = targetUrl;
    }, 150);
  });

  // 閒置 3.5 秒自動微縮為半透明小圓點
  let idleTimer = null;
  const startIdleCountdown = () => {
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => {
      container.classList.add('is-idle');
    }, 3500);
  };

  const wakeUp = () => {
    container.classList.remove('is-idle');
    startIdleCountdown();
  };

  container.addEventListener('mouseenter', wakeUp);
  container.addEventListener('mouseleave', startIdleCountdown);
  container.addEventListener('touchstart', wakeUp, { passive: true });
  window.addEventListener('scroll', wakeUp, { passive: true });

  startIdleCountdown();

  shadow.appendChild(style);
  shadow.appendChild(container);
  container.appendChild(link);

  const mount = () => {
    if (document.body && !document.getElementById('portal-pill-host')) {
      document.body.appendChild(host);
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
