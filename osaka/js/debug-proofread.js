/**
 * 🛠️ 旅の栞・名阪京奈行旅繪卷 開發輔助快速註釋與 MD 輸出工具 (Debug Helper)
 * 獨立解耦模組：日後如需移除，只需刪除此檔案並從 HTML 移除引入即可，零代碼污染。
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'emaki_quick_review_notes';
  let isDebugActive = false;
  let notes = {};

  // 1. 讀取本地儲存
  function loadNotes() {
    try {
      notes = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    } catch (e) {
      notes = {};
    }
  }

  function saveNotes() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    } catch (e) {
      console.warn('[DebugHelper] Failed to save notes to localStorage:', e);
    }
    updateFabCounter();
    refreshElementMarkers();
  }

  // 2. 自帶獨立 CSS 注入 (完全不改動原有 css 檔案)
  const styles = `
    /* Debug 工具懸浮控制列 (右下角) */
    .dev-helper-bar {
      position: fixed;
      bottom: 42px;
      right: 20px;
      z-index: 99999;
      display: flex;
      align-items: center;
      gap: 8px;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans TC", sans-serif;
    }

    .dev-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 8px 14px;
      font-size: 0.82rem;
      font-weight: 600;
      border-radius: 20px;
      border: 1px solid rgba(0,0,0,0.18);
      background: #FFFFFF;
      color: #2D3436;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(0,0,0,0.12);
      transition: all 0.2s ease;
      user-select: none;
    }

    .dev-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(0,0,0,0.18);
    }

    .dev-btn-toggle.active {
      background: #2D3436;
      color: #FFFFFF;
      border-color: #2D3436;
      box-shadow: 0 4px 14px rgba(45, 52, 54, 0.4);
    }

    .dev-btn-export {
      background: #0984E3;
      color: #FFFFFF;
      border-color: #0984E3;
    }

    .dev-btn-export:hover {
      background: #076CB8;
    }

    .dev-badge-num {
      background: #D63031;
      color: #FFF;
      font-size: 0.7rem;
      padding: 1px 6px;
      border-radius: 10px;
      font-weight: bold;
    }

    /* Debug 模式開啟時的元素可點擊提示 */
    body.dev-mode-on .emaki-chapter-panel [data-dev-target] {
      cursor: cell !important;
      position: relative;
      transition: outline 0.15s ease;
    }

    body.dev-mode-on .emaki-chapter-panel [data-dev-target]:hover {
      outline: 2px dashed #0984E3 !important;
      outline-offset: 2px;
    }

    /* 已留評項目之簡潔標記 (小巧實用，絕無繁複印章) */
    .dev-has-note {
      outline: 2px solid #E17055 !important;
      outline-offset: 2px;
    }

    .dev-note-pin {
      position: absolute;
      top: 4px;
      right: 4px;
      background: #E17055;
      color: #FFFFFF;
      font-size: 0.68rem;
      font-weight: 700;
      padding: 2px 6px;
      border-radius: 4px;
      z-index: 20;
      box-shadow: 0 2px 6px rgba(0,0,0,0.25);
      pointer-events: none;
      display: flex;
      align-items: center;
      gap: 3px;
    }

    /* 速評編輯彈窗 */
    .dev-modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(0, 0, 0, 0.55);
      backdrop-filter: blur(3px);
      z-index: 100000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      box-sizing: border-box;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.2s ease;
    }

    .dev-modal-overlay.open {
      opacity: 1;
      pointer-events: auto;
    }

    .dev-modal-box {
      background: #FFFFFF;
      width: 100%;
      max-width: 540px;
      border-radius: 8px;
      box-shadow: 0 12px 36px rgba(0,0,0,0.25);
      padding: 22px 24px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      gap: 14px;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans TC", sans-serif;
    }

    .dev-modal-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #DFE6E9;
      padding-bottom: 10px;
    }

    .dev-modal-title {
      font-size: 1.05rem;
      font-weight: 700;
      color: #2D3436;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .dev-modal-close {
      background: none;
      border: none;
      font-size: 1.2rem;
      cursor: pointer;
      color: #636E72;
      padding: 0 4px;
    }

    .dev-target-info {
      background: #F8F9FA;
      border-left: 3px solid #0984E3;
      padding: 8px 12px;
      border-radius: 0 4px 4px 0;
      font-size: 0.82rem;
      color: #636E72;
    }

    .dev-target-name {
      font-weight: 700;
      color: #2D3436;
      font-size: 0.9rem;
      margin-bottom: 3px;
    }

    .dev-orig-preview {
      font-size: 0.78rem;
      color: #74B9FF;
      word-break: break-word;
      max-height: 70px;
      overflow-y: auto;
    }

    .dev-textarea {
      width: 100%;
      min-height: 110px;
      padding: 10px 12px;
      box-sizing: border-box;
      border: 1px solid #CED6E0;
      border-radius: 6px;
      font-size: 0.9rem;
      line-height: 1.5;
      font-family: inherit;
      resize: vertical;
    }

    .dev-textarea:focus {
      outline: none;
      border-color: #0984E3;
      box-shadow: 0 0 0 3px rgba(9, 132, 227, 0.15);
    }

    .dev-modal-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 6px;
    }

    .dev-btn-group {
      display: flex;
      gap: 8px;
    }

    .dev-action-btn {
      padding: 7px 16px;
      border-radius: 5px;
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;
      border: 1px solid transparent;
      transition: all 0.15s ease;
    }

    .dev-action-btn.save {
      background: #0984E3;
      color: #FFF;
    }
    .dev-action-btn.save:hover {
      background: #076CB8;
    }

    .dev-action-btn.cancel {
      background: #F1F2F6;
      color: #2D3436;
      border-color: #DFE4EA;
    }

    .dev-action-btn.delete {
      background: #FF7675;
      color: #FFF;
    }
    .dev-action-btn.delete:hover {
      background: #D63031;
    }

    /* 匯出 MD 預覽視窗 */
    .dev-export-modal {
      max-width: 680px;
    }

    .dev-markdown-preview {
      width: 100%;
      min-height: 280px;
      max-height: 420px;
      background: #F8F9FA;
      border: 1px solid #CED6E0;
      border-radius: 6px;
      padding: 12px;
      font-family: Consolas, Monaco, "Courier New", monospace;
      font-size: 0.82rem;
      line-height: 1.5;
      overflow: auto;
      white-space: pre-wrap;
      word-break: break-all;
      box-sizing: border-box;
    }

    .dev-toast {
      position: fixed;
      bottom: 85px;
      right: 20px;
      background: #2D3436;
      color: #FFF;
      padding: 8px 16px;
      border-radius: 6px;
      font-size: 0.82rem;
      z-index: 100001;
      opacity: 0;
      transform: translateY(8px);
      transition: all 0.2s ease;
      pointer-events: none;
    }

    .dev-toast.show {
      opacity: 1;
      transform: translateY(0);
    }
  `;

  // 3. 注入 DOM 結構
  function initDOM() {
    const styleEl = document.createElement('style');
    styleEl.id = 'dev-proofread-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);

    // 懸浮控制條
    const helperBar = document.createElement('div');
    helperBar.className = 'dev-helper-bar';
    helperBar.innerHTML = `
      <button class="dev-btn dev-btn-toggle" id="dev-toggle-btn" title="切換速評與註釋編輯模式">
        <span>🛠️ Debug 快速註釋</span>
      </button>
      <button class="dev-btn dev-btn-export" id="dev-export-btn" title="查看所有註釋並輸出 Markdown">
        <span>📝 輸出成 MD</span>
        <span class="dev-badge-num" id="dev-notes-count">0</span>
      </button>
    `;
    document.body.appendChild(helperBar);

    // 快速編輯彈窗
    const modal = document.createElement('div');
    modal.className = 'dev-modal-overlay';
    modal.id = 'dev-note-modal';
    modal.innerHTML = `
      <div class="dev-modal-box">
        <div class="dev-modal-header">
          <div class="dev-modal-title"><span>✏️ 快速速評 / 修正註釋</span></div>
          <button class="dev-modal-close" id="dev-modal-close-btn">&times;</button>
        </div>
        <div class="dev-target-info">
          <div class="dev-target-name" id="dev-target-name">目標元素</div>
          <div class="dev-orig-preview" id="dev-orig-preview">原文預覽...</div>
        </div>
        <div>
          <label style="font-size:0.8rem; font-weight:600; color:#2D3436; margin-bottom:5px; display:block;">
            我的速評或修正意見：
          </label>
          <textarea class="dev-textarea" id="dev-note-input" placeholder="例如：文字圖說微調、時間修正、心得感想、或者替換相片建議..."></textarea>
        </div>
        <div class="dev-modal-footer">
          <button class="dev-action-btn delete" id="dev-btn-delete" style="display:none;">刪除此註釋</button>
          <div style="flex:1;"></div>
          <div class="dev-btn-group">
            <button class="dev-action-btn cancel" id="dev-btn-cancel">取消</button>
            <button class="dev-action-btn save" id="dev-btn-save">儲存註釋</button>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    // 匯出 MD 視窗
    const exportModal = document.createElement('div');
    exportModal.className = 'dev-modal-overlay';
    exportModal.id = 'dev-export-modal';
    exportModal.innerHTML = `
      <div class="dev-modal-box dev-export-modal">
        <div class="dev-modal-header">
          <div class="dev-modal-title"><span>📜 輸出修訂速評手記 (.md)</span></div>
          <button class="dev-modal-close" id="dev-export-close-btn">&times;</button>
        </div>
        <div style="font-size:0.82rem; color:#636E72;">
          以下為您在繪卷中標記的所有速評與修正內容，可一鍵複製貼給 AI 批次更新，或直接下載為 .md 檔案保存：
        </div>
        <textarea class="dev-markdown-preview" id="dev-markdown-textarea" readonly></textarea>
        <div class="dev-modal-footer">
          <button class="dev-action-btn delete" id="dev-btn-clear-all" title="清空全部已儲存的註釋">清空全部</button>
          <div style="flex:1;"></div>
          <div class="dev-btn-group">
            <button class="dev-action-btn cancel" id="dev-btn-copy-md">📋 複製 Markdown</button>
            <button class="dev-action-btn save" id="dev-btn-download-md">📥 下載 .md 檔案</button>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(exportModal);

    // Toast 提示
    const toast = document.createElement('div');
    toast.className = 'dev-toast';
    toast.id = 'dev-toast';
    document.body.appendChild(toast);
  }

  function showToast(msg) {
    const t = document.getElementById('dev-toast');
    if (!t) return;
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2200);
  }

  // 4. 自動掃描並標記可註釋元素
  function markAnnotatableElements() {
    // 卷題頭、引言、摘要
    document.querySelectorAll('.emaki-chapter-panel').forEach(panel => {
      const chId = panel.id;
      const volPill = panel.querySelector('.chapter-vol-pill')?.innerText.trim() || '';
      const mainTitle = panel.querySelector('.chapter-kanji-title')?.innerText.trim() || '';
      const chTitle = (volPill && mainTitle) ? `${volPill} ${mainTitle}` : (mainTitle || chId);

      // 標題與引言
      const titleEl = panel.querySelector('.chapter-kanji-title');
      if (titleEl && !titleEl.dataset.devTarget) {
        titleEl.dataset.devTarget = `${chId}:title`;
        titleEl.dataset.devCategory = '章節標題';
        titleEl.dataset.devChapter = chTitle;
      }

      const quoteEl = panel.querySelector('.chapter-quote-block');
      if (quoteEl && !quoteEl.dataset.devTarget) {
        quoteEl.dataset.devTarget = `${chId}:quote`;
        quoteEl.dataset.devCategory = '卷頭引言';
        quoteEl.dataset.devChapter = chTitle;
      }

      const summaryEl = panel.querySelector('.chapter-summary-desc') || panel.querySelector('.chapter-summary-prose');
      if (summaryEl && !summaryEl.dataset.devTarget) {
        summaryEl.dataset.devTarget = `${chId}:summary`;
        summaryEl.dataset.devCategory = '一日摘要';
        summaryEl.dataset.devChapter = chTitle;
      }

      // Hero 大圖
      const heroEl = panel.querySelector('.hero-spread-card');
      if (heroEl && !heroEl.dataset.devTarget) {
        heroEl.dataset.devTarget = `${chId}:hero`;
        heroEl.dataset.devCategory = 'Hero 大圖';
        heroEl.dataset.devChapter = chTitle;
      }

      // 拍立得照片
      panel.querySelectorAll('.polaroid-item-wrap').forEach((card, pIdx) => {
        const pId = card.dataset.photoId || `photo_${pIdx}`;
        if (!card.dataset.devTarget) {
          card.dataset.devTarget = `${chId}:photo:${pId}`;
          card.dataset.devCategory = '拍立得寫真';
          card.dataset.devChapter = chTitle;
        }
      });

      // 日日行腳景點
      panel.querySelectorAll('.timeline-mini-item').forEach((spot, sIdx) => {
        if (!spot.dataset.devTarget) {
          spot.dataset.devTarget = `${chId}:spot:${sIdx}`;
          spot.dataset.devCategory = '日日行腳景點';
          spot.dataset.devChapter = chTitle;
        }
      });
    });

    refreshElementMarkers();
  }

  // 更新元素外框與 ✏️ 標記
  function refreshElementMarkers() {
    document.querySelectorAll('[data-dev-target]').forEach(el => {
      const key = el.dataset.devTarget;
      const hasNote = !!notes[key];
      el.classList.toggle('dev-has-note', hasNote);

      let pin = el.querySelector('.dev-note-pin');
      if (hasNote) {
        if (!pin) {
          pin = document.createElement('span');
          pin.className = 'dev-note-pin';
          pin.innerHTML = `✏️ 評`;
          el.appendChild(pin);
        }
      } else if (pin) {
        pin.remove();
      }
    });
  }

  function updateFabCounter() {
    const countEl = document.getElementById('dev-notes-count');
    if (countEl) {
      countEl.textContent = Object.keys(notes).length;
    }
  }

  // 5. 點擊編輯邏輯
  let currentTargetKey = null;
  let currentTargetInfo = null;

  function openEditModal(el) {
    currentTargetKey = el.dataset.devTarget;
    if (!currentTargetKey) return;

    const modal = document.getElementById('dev-note-modal');
    const nameEl = document.getElementById('dev-target-name');
    const prevEl = document.getElementById('dev-orig-preview');
    const inputEl = document.getElementById('dev-note-input');
    const deleteBtn = document.getElementById('dev-btn-delete');

    const chapter = el.dataset.devChapter || '當前章節';
    const category = el.dataset.devCategory || '元素';
    let rawText = '';

    // 擷取原始文字預覽
    if (category === '拍立得寫真') {
      rawText = el.dataset.caption || el.querySelector('.polaroid-caption')?.innerText || el.dataset.full || '';
    } else if (category === 'Hero 大圖') {
      rawText = el.dataset.caption || el.querySelector('.hero-caption-text')?.innerText || '';
    } else {
      rawText = el.innerText.replace(/\\s+/g, ' ').trim();
    }

    currentTargetInfo = {
      key: currentTargetKey,
      chapter: chapter,
      category: category,
      originalText: rawText.slice(0, 160)
    };

    nameEl.textContent = `[${chapter}] ${category}`;
    prevEl.textContent = `原文：${rawText.slice(0, 120)}${rawText.length > 120 ? '...' : ''}`;

    const existing = notes[currentTargetKey];
    if (existing) {
      inputEl.value = existing.note || '';
      deleteBtn.style.display = 'inline-block';
    } else {
      inputEl.value = '';
      deleteBtn.style.display = 'none';
    }

    modal.classList.add('open');
    inputEl.focus();
  }

  function closeEditModal() {
    const modal = document.getElementById('dev-note-modal');
    if (modal) modal.classList.remove('open');
    currentTargetKey = null;
    currentTargetInfo = null;
  }

  // 6. 產生 Markdown
  function generateMarkdown() {
    const keys = Object.keys(notes);
    if (keys.length === 0) {
      return `# 📜《夏之栞・名阪京奈行旅繪卷》修訂速評手記\n\n> 目前暫無任何已儲存的速評註釋。\n> 開啟「🛠️ Debug 快速註釋」模式後，在任何文字或相片上點擊即可留下註釋！\n`;
    }

    // 依章節分組
    const groups = {};
    keys.forEach(k => {
      const item = notes[k];
      const ch = item.chapter || '未分類章節';
      if (!groups[ch]) groups[ch] = [];
      groups[ch].push(item);
    });

    const now = new Date();
    const timeStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    let md = `# 📜《夏之栞・名阪京奈行旅繪卷》修訂速評手記\n`;
    md += `> 匯出時間：${timeStr} | 總計修訂/速評：${keys.length} 處\n\n`;

    for (const ch of Object.keys(groups)) {
      md += `## ${ch}\n\n`;
      groups[ch].forEach(n => {
        md += `- **【${n.category}】**\n`;
        if (n.originalText) {
          md += `  - **原文**：${n.originalText}\n`;
        }
        md += `  - **修訂速評**：${n.note}\n`;
      });
      md += `\n`;
    }

    md += `---\n*本文件由《夏之栞・行旅繪卷》Debug 輔助工具自動生成*\n`;
    return md;
  }

  function openExportModal() {
    const modal = document.getElementById('dev-export-modal');
    const textarea = document.getElementById('dev-markdown-textarea');
    if (!modal || !textarea) return;

    textarea.value = generateMarkdown();
    modal.classList.add('open');
  }

  function closeExportModal() {
    const modal = document.getElementById('dev-export-modal');
    if (modal) modal.classList.remove('open');
  }

  function downloadMarkdown() {
    const md = generateMarkdown();
    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `夏之栞_修訂速評手記_${new Date().toISOString().slice(0, 10)}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('✅ 已成功下載 Markdown 檔案！');
  }

  function copyMarkdown() {
    const textarea = document.getElementById('dev-markdown-textarea');
    if (!textarea) return;
    navigator.clipboard.writeText(textarea.value).then(() => {
      showToast('📋 Markdown 已成功複製到剪貼簿！');
    }).catch(() => {
      textarea.select();
      document.execCommand('copy');
      showToast('📋 Markdown 已複製到剪貼簿！');
    });
  }

  // 7. 事件監聽綁定
  function bindEvents() {
    // 切換 Debug 模式
    const toggleBtn = document.getElementById('dev-toggle-btn');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        isDebugActive = !isDebugActive;
        document.body.classList.toggle('dev-mode-on', isDebugActive);
        toggleBtn.classList.toggle('active', isDebugActive);
        toggleBtn.querySelector('span').textContent = isDebugActive ? '🛠️ 註釋中 (點元素留評)' : '🛠️ Debug 快速註釋';
        showToast(isDebugActive ? '🛠️ 已開啟快速註釋模式，點擊畫面任意元素即可留評' : '已關閉註釋模式');
        if (isDebugActive) markAnnotatableElements();
      });
    }

    // 匯出按鈕
    const exportBtn = document.getElementById('dev-export-btn');
    if (exportBtn) exportBtn.addEventListener('click', openExportModal);

    // 關閉按鈕
    document.getElementById('dev-modal-close-btn')?.addEventListener('click', closeEditModal);
    document.getElementById('dev-btn-cancel')?.addEventListener('click', closeEditModal);
    document.getElementById('dev-export-close-btn')?.addEventListener('click', closeExportModal);

    // 儲存註釋
    document.getElementById('dev-btn-save')?.addEventListener('click', () => {
      if (!currentTargetKey || !currentTargetInfo) return;
      const inputEl = document.getElementById('dev-note-input');
      const val = inputEl?.value.trim();
      if (!val) {
        showToast('請輸入速評或修正內容');
        return;
      }

      notes[currentTargetKey] = {
        key: currentTargetKey,
        chapter: currentTargetInfo.chapter,
        category: currentTargetInfo.category,
        originalText: currentTargetInfo.originalText,
        note: val,
        updatedAt: new Date().toISOString()
      };

      saveNotes();
      closeEditModal();
      showToast('💾 註釋已儲存！');
    });

    // 刪除單個註釋
    document.getElementById('dev-btn-delete')?.addEventListener('click', () => {
      if (!currentTargetKey) return;
      delete notes[currentTargetKey];
      saveNotes();
      closeEditModal();
      showToast('🗑️ 註釋已刪除');
    });

    // 清空全部註釋
    document.getElementById('dev-btn-clear-all')?.addEventListener('click', () => {
      if (confirm('確定要清空所有已儲存的速評註釋嗎？此動作無法復原。')) {
        notes = {};
        saveNotes();
        document.getElementById('dev-markdown-textarea').value = generateMarkdown();
        showToast('已清空全部註釋');
      }
    });

    // 下載與複製
    document.getElementById('dev-btn-download-md')?.addEventListener('click', downloadMarkdown);
    document.getElementById('dev-btn-copy-md')?.addEventListener('click', copyMarkdown);

    // 點擊元素觸發編輯 (使用捕獲模式，在 Debug 開啟時優先攔截)
    document.addEventListener('click', (e) => {
      if (!isDebugActive) return;
      if (e.target.closest('.dev-helper-bar, .dev-modal-overlay, #dev-note-modal, #dev-export-modal')) {
        return; // 點擊工具本身不攔截
      }

      const targetEl = e.target.closest('[data-dev-target]');
      if (targetEl) {
        e.preventDefault();
        e.stopPropagation(); // 阻止打開燈箱或切換景點
        openEditModal(targetEl);
      }
    }, true); // 捕獲模式確保優先於普通點擊

    // 動態 DOM 變更時自動掃描
    const observer = new MutationObserver(() => {
      if (isDebugActive) markAnnotatableElements();
    });
    const track = document.getElementById('emaki-track');
    if (track) {
      observer.observe(track, { childList: true, subtree: true });
    }
  }

  // 8. 初始化
  function init() {
    loadNotes();
    initDOM();
    bindEvents();
    markAnnotatableElements();
    updateFabCounter();
    console.info('[DebugHelper] Quick proofreading dev tool initialized.');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
