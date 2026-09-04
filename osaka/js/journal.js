/**
 * 📖 行旅手記 (Travel Journal & Planner) 核心控制器
 * 包含：
 * 1. 統一旅程起訖日曆設定器（下拉日曆選擇抵達/賦歸日，自動生成 Day 1 ~ Day N，命中排定則自動帶入，否則留空）
 * 2. 黑陶金繕當日標題大卡片（Kintsugi Black Ceramic Edition 視覺魄力重心與精緻和風按鈕）
 * 3. 當日精華標題自動綜整（依據當天各景點項目即時串接生成）
 * 4. 地域多選與自由自訂（支援多地域組合與自訂地點）
 * 5. 日日行腳精準時間對調（時間改為前者開始時間、保持逗留時長、局部順延）
 * 6. 一日結語雅緻和紙手帖（親筆心境散記與節奏記錄）
 * 7. 確認匯出機制（Markdown / CSV / 和風手帳卡）
 * 完全融合 Modern Kyoto Wabi-Sabi 侘寂美學與簡雅敘事
 */

class JournalManager {
  constructor() {
    this.currentDayIndex = 1;
    this.currentPeer = null; // null 表示「本帖（自己）」，字串表示同行旅伴視角
    this.journalData = null;
    this.peerData = {};
    this.roomConfig = { nickname: '', roomCode: 'osaka2026' };
    this.customTags = new Set();
    this.activePickerRegion = 'all';
    this.saveTimeout = null;
  }

  init() {
    this.loadData();
    this.bindEvents();
    this.bindModalBackgroundClose();
    console.info('[JournalManager] Initialized with Kyoto Kintsugi & Dynamic Calendar Edition.');
  }

  loadData() {
    if (window.appStorage) {
      this.journalData = window.appStorage.getJournalData();
      this.peerData = window.appStorage.getPeerJournals();
      const storedConfig = window.appStorage.getRoomConfig();
      this.roomConfig = {
        nickname: storedConfig.nickname || '',
        roomCode: storedConfig.roomCode || 'osaka2026'
      };

      // 提取既有手記中的自訂標籤
      if (this.journalData && Array.isArray(this.journalData.days)) {
        this.journalData.days.forEach(d => {
          (d.items || []).forEach(it => {
            (it.tags || []).forEach(t => this.customTags.add(t));
          });
        });
      }
    }
  }

  bindEvents() {
    // 移除重複綁定，統一由 app.js 管理頂部按鈕狀態
  }

  bindModalBackgroundClose() {
    ['spot-picker-modal', 'journal-card-modal', 'room-sync-modal', 'location-picker-modal', 'trip-dates-modal'].forEach(id => {
      const modal = document.getElementById(id);
      if (modal && !modal.dataset.bgCloseBound) {
        modal.dataset.bgCloseBound = 'true';
        modal.addEventListener('click', (e) => {
          if (e.target === modal) {
            modal.style.display = 'none';
          }
        });
      }
    });
  }

  toggleJournalMode(showJournal) {
    const mapWorkspace = document.getElementById('app-workspace-3col');
    const mobileTabs = document.getElementById('mobile-view-tabs');
    const journalWorkspace = document.getElementById('journal-workspace');

    if (showJournal) {
      if (mapWorkspace) {
        mapWorkspace.style.setProperty('display', 'none', 'important');
      }
      if (mobileTabs) {
        mobileTabs.style.setProperty('display', 'none', 'important');
      }

      document.body.classList.add('journal-mode-active');
      document.documentElement.classList.add('journal-mode-active');

      if (window.updateHeaderModeUI) {
        window.updateHeaderModeUI(true);
      }

      if (journalWorkspace) {
        journalWorkspace.style.removeProperty('display');
        journalWorkspace.classList.add('active');
        this.loadData();
        this.renderAll();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      document.body.classList.remove('journal-mode-active');
      document.documentElement.classList.remove('journal-mode-active');

      if (window.updateHeaderModeUI) {
        window.updateHeaderModeUI(false);
      }

      if (journalWorkspace) {
        journalWorkspace.classList.remove('active');
        journalWorkspace.style.setProperty('display', 'none', 'important');
      }

      if (mapWorkspace) {
        mapWorkspace.style.removeProperty('display');
        mapWorkspace.style.removeProperty('flex-direction');
        mapWorkspace.classList.remove('map-entering-animation');
        void mapWorkspace.offsetWidth; // 重新觸發動畫
        mapWorkspace.classList.add('map-entering-animation');
        setTimeout(() => mapWorkspace.classList.remove('map-entering-animation'), 400);
      }
      if (mobileTabs) {
        mobileTabs.style.removeProperty('display');
        mobileTabs.classList.remove('map-entering-animation');
        void mobileTabs.offsetWidth;
        mobileTabs.classList.add('map-entering-animation');
        setTimeout(() => mobileTabs.classList.remove('map-entering-animation'), 400);
      }
      
      if (window.activeMapManager && window.activeMapManager.map) {
        setTimeout(() => {
          try {
            window.activeMapManager.map.invalidateSize();
          } catch (e) {
            console.warn('[JournalManager] Leaflet resize error:', e);
          }
        }, 100);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  renderAll() {
    this.renderTopBar();
    this.renderDaysNav();
    this.renderDayHero();
    this.renderTimelineItems();
    this.renderDailySummary();
    this.renderBottomActions();
    this.bindModalBackgroundClose();
  }

  /**
   * 1. 頂部狀態列 (電腦端 Header 中央 + 手機端手記頂部控制條)
   */
  renderTopBar() {
    const topBar = document.getElementById('journal-top-bar');
    const mobileBar = document.getElementById('journal-mobile-control-bar');

    const myName = this.roomConfig.nickname || '我';
    const peerNames = Object.keys(this.peerData || {}).filter(n => n !== myName);
    const days = (this.journalData && this.journalData.days) || [];
    const firstDate = days[0] ? days[0].date : '2026-08-19';
    const lastDate = days[days.length - 1] ? days[days.length - 1].date : '2026-08-29';

    // 當前顯示標籤
    const currentLabel = this.currentPeer === null ? `本帖 (${myName})` : `同行・${this.currentPeer}`;
    const currentIcon = this.currentPeer === null ? '👤' : '👥';

    let peerItemsHtml = '';
    peerNames.forEach(name => {
      const isSelected = this.currentPeer === name;
      peerItemsHtml += `
        <button class="peer-menu-item ${isSelected ? 'active' : ''}" data-peer="${name}">
          <span class="peer-item-icon">👥</span>
          <div class="peer-item-info">
            <span class="peer-item-name">同行・${name}</span>
            <span class="peer-item-desc">旅伴的隨行手帖與評鑑</span>
          </div>
          ${isSelected ? '<span class="peer-item-check">✓</span>' : ''}
        </button>
      `;
    });

    const buildPeerDropdownHtml = (idPrefix) => `
      <div class="journal-peer-custom-dropdown" id="${idPrefix}-peer-dropdown">
        <button class="journal-peer-trigger" id="${idPrefix}-btn-toggle-peer" type="button" title="切換本帖或同行旅伴視角">
          <span class="peer-trigger-icon">${currentIcon}</span>
          <span class="peer-trigger-prefix">視角：</span>
          <span class="peer-trigger-current">${currentLabel}</span>
          <span class="peer-trigger-arrow">▾</span>
        </button>
        <div class="journal-peer-menu" id="${idPrefix}-peer-menu-panel">
          <div class="peer-menu-header">⛩️ 選擇隨行手帖視角</div>
          <div class="peer-menu-list">
            <button class="peer-menu-item ${this.currentPeer === null ? 'active' : ''}" data-peer="__ME__">
              <span class="peer-item-icon">👤</span>
              <div class="peer-item-info">
                <span class="peer-item-name">本帖 (${myName})</span>
                <span class="peer-item-desc">我的私房行腳與隨行評鑑</span>
              </div>
              ${this.currentPeer === null ? '<span class="peer-item-check">✓</span>' : ''}
            </button>
            ${peerItemsHtml}
          </div>
        </div>
      </div>
    `;

    // 1. 電腦端 Header 頂部膠囊列 (精簡文字，防橫向擠壓重疊)
    if (topBar) {
      topBar.innerHTML = `
        ${buildPeerDropdownHtml('desktop')}
        <div class="journal-top-actions">
          <button class="btn-journal-top" id="btn-open-dates-modal" title="設定旅程抵達與賦歸日期（目前：${firstDate}～${lastDate} 共 ${days.length} 天）">
            <span>🗓️</span>
            <span>旅期</span>
          </button>
          <button class="btn-journal-top" id="btn-open-room-modal" title="設定旅程房間暗號與同步（目前栞室：${this.roomConfig.roomCode || 'osaka2026'}）">
            <span>🗝️</span>
            <span>栞室</span>
          </button>
          <button class="btn-journal-top primary" id="btn-quick-sync" title="一鍵同步同行心得（房間碼：${this.roomConfig.roomCode || 'osaka2026'}）">
            <span>☁️</span>
            <span>同步</span>
          </button>
        </div>
      `;
    }

    // 2. 手機端工作區頂部控制條 (視角切換、旅期、栞室、共筆同步 - 100% 防溢出 Grid)
    if (mobileBar) {
      mobileBar.innerHTML = `
        <div class="journal-mobile-control-row">
          ${buildPeerDropdownHtml('mobile')}
          <button class="btn-journal-top primary" id="btn-quick-sync-mobile" title="一鍵同步同行心得">
            <span>☁️</span>
            <span>共筆同步</span>
          </button>
        </div>
        <div class="journal-mobile-control-row">
          <button class="btn-journal-top" id="btn-open-dates-modal-mobile" title="設定旅程抵達與賦歸日期（${firstDate}～${lastDate}）">
            <span>🗓️</span>
            <span>旅期設定</span>
          </button>
          <button class="btn-journal-top" id="btn-open-room-modal-mobile" title="設定旅程房間暗號與同步（${this.roomConfig.roomCode || 'osaka2026'}）">
            <span>🗝️</span>
            <span>栞室暗號</span>
          </button>
        </div>
      `;
    }

    // 綁定兩處視角下拉與按鈕點擊
    ['desktop', 'mobile'].forEach(prefix => {
      const dropdownWrap = document.getElementById(`${prefix}-peer-dropdown`);
      const triggerBtn = document.getElementById(`${prefix}-btn-toggle-peer`);

      if (triggerBtn && dropdownWrap) {
        triggerBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          const willOpen = !dropdownWrap.classList.contains('open');
          if (window.closeAllDropdowns) window.closeAllDropdowns();
          if (willOpen) dropdownWrap.classList.add('open');
        });

        dropdownWrap.querySelectorAll('.peer-menu-item').forEach(item => {
          item.addEventListener('click', (e) => {
            e.stopPropagation();
            const val = item.getAttribute('data-peer');
            this.currentPeer = val === '__ME__' ? null : val;
            dropdownWrap.classList.remove('open');
            this.renderAll();
          });
        });
      }
    });

    if (!window.__peerDropdownGlobalCloseBound) {
      window.__peerDropdownGlobalCloseBound = true;
      document.addEventListener('click', (e) => {
        ['desktop', 'mobile'].forEach(prefix => {
          const dd = document.getElementById(`${prefix}-peer-dropdown`);
          if (dd && !dd.contains(e.target)) {
            dd.classList.remove('open');
          }
        });
      });
    }

    // 綁定 Dates, Room, Sync 按鈕（支援 desktop 與 mobile）
    const bindBtn = (id, handler) => {
      const btn = document.getElementById(id);
      if (btn) btn.addEventListener('click', handler);
    };

    const onDatesClick = () => {
      if (this.currentPeer !== null) {
        alert('正在瀏覽同行旅伴的手記。若需調整您自己的旅程起訖日，請先切回「👤 本帖」！');
        return;
      }
      this.openTripDatesModal();
    };

    bindBtn('btn-open-dates-modal', onDatesClick);
    bindBtn('btn-open-dates-modal-mobile', onDatesClick);

    bindBtn('btn-open-room-modal', () => this.openRoomModal());
    bindBtn('btn-open-room-modal-mobile', () => this.openRoomModal());

    bindBtn('btn-quick-sync', () => this.triggerSync());
    bindBtn('btn-quick-sync-mobile', () => this.triggerSync());
  }

  getKanjiDay(dayIndex) {
    const KANJI_DAYS = ['第一日', '第二日', '第三日', '第四日', '第五日', '第六日', '第七日', '第八日', '第九日', '第十日', '第十一日', '第十二日', '第十三日', '第十四日', '第十五日', '第十六日', '第十七日', '第十八日', '第十九日', '第二十日'];
    return KANJI_DAYS[dayIndex - 1] || `第${dayIndex}日`;
  }

  /**
   * 2. 日期導航膠囊 (桌面端橫向栞籤 + 手機端頂部自訂下拉選單)
   */
  renderDaysNav() {
    const days = (this.journalData && this.journalData.days) || [];

    // A. 桌面端手記橫向栞籤 (中文 第一日 ～ 第十一日)
    const nav = document.getElementById('journal-days-nav');
    if (nav) {
      let html = '';
      days.forEach(day => {
        const isActive = day.dayIndex === this.currentDayIndex;
        const regionClass = this.getRegionPillClass(day.location);
        const dayTitle = this.getKanjiDay(day.dayIndex);

        html += `
          <button class="journal-day-pill ${regionClass} ${isActive ? 'active' : ''}" data-day="${day.dayIndex}">
            <span class="journal-day-pill-title">${dayTitle}</span>
            <span class="journal-day-pill-sub">${day.location || '自由散策'}</span>
          </button>
        `;
      });

      nav.innerHTML = html;

      nav.querySelectorAll('.journal-day-pill').forEach(btn => {
        btn.addEventListener('click', () => {
          this.currentDayIndex = parseInt(btn.getAttribute('data-day'), 10);
          this.renderAll();
        });
      });
    }

    // B. 手機端頂部手記天數下拉選單 (和風木牌手籤 - 閉合僅顯第一日，展開呈現完整日程地域)
    const journalLabel = document.getElementById('mobile-journal-day-label');
    if (journalLabel) {
      journalLabel.textContent = this.getKanjiDay(this.currentDayIndex);
    }

    const journalList = document.getElementById('mobile-journal-day-list');
    if (journalList) {
      journalList.innerHTML = '';
      days.forEach(day => {
        const item = document.createElement('button');
        const isActive = day.dayIndex === this.currentDayIndex;
        item.className = `mobile-day-menu-item ${isActive ? 'active' : ''}`;
        item.type = 'button';
        const dayTitle = this.getKanjiDay(day.dayIndex);
        const shortDate = day.date ? day.date.slice(5) : '';
        item.innerHTML = `
          <span class="day-item-tag">${dayTitle}</span>
          <span class="day-item-date">${shortDate} (${day.dayOfWeek || ''})</span>
          <span class="day-item-loc">${day.location || '自由散策'}</span>
        `;
        item.addEventListener('click', (e) => {
          e.stopPropagation();
          this.currentDayIndex = day.dayIndex;
          this.renderAll();
          const dropdown = document.getElementById('mobile-journal-day-dropdown');
          if (dropdown) dropdown.classList.remove('open');
        });
        journalList.appendChild(item);
      });
    }

    const journalTrigger = document.getElementById('mobile-journal-day-trigger');
    const journalDropdown = document.getElementById('mobile-journal-day-dropdown');
    if (journalTrigger && journalDropdown && !journalTrigger.dataset.bound) {
      journalTrigger.dataset.bound = 'true';
      journalTrigger.addEventListener('click', (e) => {
        e.stopPropagation();
        const willOpen = !journalDropdown.classList.contains('open');
        if (window.closeAllDropdowns) window.closeAllDropdowns();
        if (willOpen) journalDropdown.classList.add('open');
      });
    }
  }

  /**
   * 根據地域名稱回傳地域頂線色彩
   */
  getRegionPillClass(location) {
    if (!location) return '';
    if (location.includes('名古屋') && location.includes('犬山')) return 'region-pill-split-nagoya-inuyama';
    if (location.includes('名古屋') && location.includes('大阪')) return 'region-pill-split-nagoya-osaka';
    if (location.includes('大阪') && location.includes('兵庫')) return 'region-pill-split-osaka-hyogo';
    if (location.includes('大阪') && location.includes('奈良')) return 'region-pill-split-osaka-nara';
    if (location.includes('名古屋')) return 'region-pill-nagoya';
    if (location.includes('犬山')) return 'region-pill-inuyama';
    if (location.includes('大阪')) return 'region-pill-osaka';
    if (location.includes('兵庫') || location.includes('甲子園')) return 'region-pill-hyogo';
    if (location.includes('奈良')) return 'region-pill-nara';
    if (location.includes('京都')) return 'region-pill-kyoto';
    return '';
  }

  getCurrentDayData() {
    if (this.currentPeer && this.peerData[this.currentPeer]) {
      const peerDays = this.peerData[this.currentPeer].days || [];
      return peerDays.find(d => d.dayIndex === this.currentDayIndex) || null;
    }
    const myDays = (this.journalData && this.journalData.days) || [];
    return myDays.find(d => d.dayIndex === this.currentDayIndex) || null;
  }

  /**
   * 智慧自動綜整當日標題 (從當日行程名稱自動串接)
   */
  autoGenerateDayTheme(day) {
    if (!day || !day.items || day.items.length === 0) return `${day.location || '自由'}漫行散策`;
    const names = day.items.map(it => it.name).filter(Boolean);
    if (names.length === 0) return `${day.location || '自由'}漫行散策`;
    return names.slice(0, 4).join('・');
  }

  /**
   * 3. 當日標題手帖大卡片 (Kintsugi Black Ceramic Hero Edition 視覺魄力重心)
   */
  renderDayHero() {
    const hero = document.getElementById('journal-day-hero');
    if (!hero) return;

    const day = this.getCurrentDayData();
    if (!day) return;

    const isPeerView = this.currentPeer !== null;

    // 當日標題自動化
    if (!day.theme || day.theme.includes('漫行散策') || day.isThemeAuto) {
      day.theme = this.autoGenerateDayTheme(day);
      day.isThemeAuto = true;
    }

    let peerBanner = '';
    if (isPeerView) {
      peerBanner = `
        <div class="journal-hero-peer-banner">
          <span>👀 正在瀏覽同行 <strong>${this.currentPeer}</strong> 之隨行手帖</span>
        </div>
      `;
    }

    // 構造防斷字結構化標題 (確保景點名稱完整保持在同一行)
    const spotNames = (day.theme || '').split('・').map(s => s.trim()).filter(Boolean);
    let titleHtml = `<span class="hero-day-tag">${this.getKanjiDay(day.dayIndex)}</span>`;
    spotNames.forEach(name => {
      titleHtml += `<span class="hero-sep" style="white-space:nowrap;">・</span><span class="hero-spot-name" style="white-space:nowrap;">${name}</span>`;
    });

    hero.innerHTML = `
      <div class="journal-hero-inner">
        <div class="journal-hero-header">
          <div class="journal-hero-header-left">
            <span class="journal-hero-date-badge">📅 ${day.date} (${day.dayOfWeek})</span>
            <span class="journal-hero-location-badge ${isPeerView ? '' : 'clickable'}" id="badge-hero-location" title="${isPeerView ? '' : '點擊設定或自訂地域'}">📍 ${day.location || '自由散策'}</span>
          </div>
          <div class="journal-hero-header-right">
            ${!isPeerView ? `
              <button class="btn-hero-action" id="btn-refresh-theme" title="重新依當日行程自動綜整標題">
                <span>✨</span>
                <span>刷新標題</span>
              </button>
            ` : ''}
          </div>
        </div>
        <h2 class="journal-hero-title" style="display:flex; flex-wrap:wrap;">${titleHtml}</h2>
        ${peerBanner}
      </div>
    `;

    if (!isPeerView) {
      const badgeLoc = document.getElementById('badge-hero-location');
      if (badgeLoc) badgeLoc.addEventListener('click', () => this.openLocationPickerModal(day));

      const btnRefresh = document.getElementById('btn-refresh-theme');
      if (btnRefresh) {
        btnRefresh.addEventListener('click', () => {
          day.theme = this.autoGenerateDayTheme(day);
          day.isThemeAuto = true;
          this.saveCurrentDay(day);
          this.renderAll();
        });
      }
    }
  }

  // =========================================================================
  // 🗓️ 統一旅程起訖日曆設定器 (Date Range Trip Generator)
  // =========================================================================

  openTripDatesModal() {
    const existing = document.getElementById('trip-dates-modal');
    if (existing) existing.remove();

    const days = (this.journalData && this.journalData.days) || [];
    const defaultStart = days[0] ? days[0].date : '2026-08-19';
    const defaultEnd = days[days.length - 1] ? days[days.length - 1].date : '2026-08-29';

    const modalHtml = `
      <div class="modal-overlay" id="trip-dates-modal" style="display:flex; position:fixed; inset:0; background:rgba(0,0,0,0.5); z-index:9999; align-items:center; justify-content:center; backdrop-filter:blur(4px);">
        <div class="modal-card" style="background:#FAF9F5; border-radius:6px; max-width:480px; width:92%; padding:1.5rem; border:1.5px solid var(--ink-border, #CFC5B2); position:relative; box-shadow:0 12px 40px rgba(0,0,0,0.2);">
          <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:0.85rem; border-bottom:1.2px dashed var(--ink-border-dashed, #B5A893); padding-bottom:0.6rem;">
            <h3 style="margin:0; font-family:var(--font-mincho); font-size:1.18rem; font-weight:800; color:var(--ink-sumi);">🗓️ 設定專屬旅程起訖日期</h3>
            <button class="modal-close-btn" style="background:none; border:none; font-size:1.2rem; cursor:pointer; color:var(--ink-muted);">✕</button>
          </div>

          <p style="font-size:0.82rem; color:var(--ink-muted); margin-bottom:1.15rem; line-height:1.5;">
            透過下拉日曆選擇您的<strong>抵達日</strong>與<strong>賦歸日</strong>。系統將自動為您生成 <strong>Day 1 ～ Day XX</strong>；若日期落在排定行程內將自動帶入景點，其餘天數自動留空供自由規劃！
          </p>

          <div style="display:flex; gap:0.85rem; align-items:center; margin-bottom:1.35rem;">
            <div style="flex:1;">
              <label style="display:block; font-size:0.82rem; font-weight:700; color:var(--ink-sumi); margin-bottom:0.35rem;">🛫 抵達出發日：</label>
              <input type="date" id="input-trip-start" value="${defaultStart}" style="width:100%; padding:0.5rem; border:1.2px solid var(--ink-border); border-radius:2px; font-family:var(--font-sans); font-weight:600; box-sizing:border-box;" />
            </div>
            <span style="font-size:1.2rem; color:var(--ink-muted); margin-top:1.2rem;">➔</span>
            <div style="flex:1;">
              <label style="display:block; font-size:0.82rem; font-weight:700; color:var(--ink-sumi); margin-bottom:0.35rem;">🛬 賦歸返程日：</label>
              <input type="date" id="input-trip-end" value="${defaultEnd}" style="width:100%; padding:0.5rem; border:1.2px solid var(--ink-border); border-radius:2px; font-family:var(--font-sans); font-weight:600; box-sizing:border-box;" />
            </div>
          </div>

          <div style="display:flex; justify-content:flex-end; gap:0.6rem;">
            <button class="btn-journal-action secondary modal-close-btn" style="padding:0.45rem 1rem;">取消</button>
            <button class="btn-journal-action share" id="btn-generate-trip-days" style="padding:0.45rem 1.25rem;">✨ 生成我的旅程</button>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);
    const modal = document.getElementById('trip-dates-modal');

    modal.querySelectorAll('.modal-close-btn').forEach(btn => {
      btn.onclick = () => modal.remove();
    });

    const btnGenerate = document.getElementById('btn-generate-trip-days');
    if (btnGenerate) {
      btnGenerate.onclick = () => {
        const startVal = document.getElementById('input-trip-start').value;
        const endVal = document.getElementById('input-trip-end').value;

        if (!startVal || !endVal) {
          alert('請選擇有效的抵達與賦歸日期！');
          return;
        }

        const startDate = new Date(startVal);
        const endDate = new Date(endVal);

        if (startDate > endDate) {
          alert('抵達日不可晚於賦歸日！');
          return;
        }

        this.generateTripFromDateRange(startVal, endVal);
        modal.remove();
      };
    }
  }

  /**
   * 依據抵達/賦歸日期智慧生成 Day 1 ~ Day N（排定內自動帶入，排定外留空）
   */
  generateTripFromDateRange(startStr, endStr) {
    const defaultDays = (window.DEFAULT_TRIP_DATA && window.DEFAULT_TRIP_DATA.days) || [];
    const existingDays = (this.journalData && this.journalData.days) || [];
    const daysWk = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

    const newDays = [];
    let cur = new Date(startStr);
    const end = new Date(endStr);
    let dayIdx = 1;

    while (cur <= end) {
      const y = cur.getFullYear();
      const m = String(cur.getMonth() + 1).padStart(2, '0');
      const d = String(cur.getDate()).padStart(2, '0');
      const dateStr = `${y}-${m}-${d}`;
      const dayOfWeek = daysWk[cur.getDay()];

      // 1. 優先檢查是否在旅人現有手記中已有該日期的紀錄
      const existingMatch = existingDays.find(dObj => dObj.date === dateStr);
      // 2. 其次檢查官方預設排程是否有該日期的紀錄
      const defaultMatch = defaultDays.find(dObj => dObj.date === dateStr);

      if (existingMatch) {
        newDays.push({
          ...existingMatch,
          dayIndex: dayIdx,
          date: dateStr,
          dayOfWeek: dayOfWeek
        });
      } else if (defaultMatch) {
        // 自動帶入官方排定行程
        newDays.push({
          dayIndex: dayIdx,
          date: dateStr,
          dayOfWeek: dayOfWeek,
          location: defaultMatch.location || '大阪',
          theme: defaultMatch.theme || '名所巡禮',
          isThemeAuto: true,
          items: (defaultMatch.items || []).map(it => ({
            ...it,
            rating: 0,
            tags: [],
            note: ''
          })),
          summary: { pace: '🌿 恬適得宜', mvp: '', trap: '', journal: '' }
        });
      } else {
        // 排定外的自由行程天數（乾淨留空）
        newDays.push({
          dayIndex: dayIdx,
          date: dateStr,
          dayOfWeek: dayOfWeek,
          location: '自由散策',
          theme: '私房漫步',
          isThemeAuto: true,
          items: [],
          summary: { pace: '🌿 恬適得宜', mvp: '', trap: '', journal: '' }
        });
      }

      cur.setDate(cur.getDate() + 1);
      dayIdx++;
    }

    this.journalData.days = newDays;
    this.currentDayIndex = 1;
    if (window.appStorage) {
      window.appStorage.saveJournalData(this.journalData);
    }
    alert(`✅ 已為您生成共 ${newDays.length} 天的專屬手記 (Day 1 ～ Day ${newDays.length})！`);
    this.renderAll();
  }

  /**
   * 地域多選與自訂彈窗
   */
  openLocationPickerModal(day) {
    const existingModal = document.getElementById('location-picker-modal');
    if (existingModal) existingModal.remove();

    const modalHtml = `
      <div class="modal-overlay" id="location-picker-modal" style="display:flex; position:fixed; inset:0; background:rgba(0,0,0,0.5); z-index:9999; align-items:center; justify-content:center; backdrop-filter:blur(4px);">
        <div class="modal-card" style="background:#FAF9F5; border-radius:4px; max-width:440px; width:90%; padding:1.5rem; border:1.5px solid var(--ink-border, #CFC5B2); position:relative; box-shadow:0 12px 40px rgba(0,0,0,0.2);">
          <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:0.85rem; border-bottom:1.2px dashed var(--ink-border-dashed, #B5A893); padding-bottom:0.5rem;">
            <h3 style="font-size:1.1rem; font-weight:800; color:var(--ink-sumi); margin:0; font-family:var(--font-mincho);">📍 設定 ${this.getKanjiDay(day.dayIndex)} 地域</h3>
            <button class="modal-close-btn" style="background:none; border:none; font-size:1.2rem; cursor:pointer; color:var(--ink-muted);">✕</button>
          </div>
          
          <p style="font-size:0.82rem; color:var(--ink-muted); margin-bottom:0.85rem;">
            可多選下方地域快速組合（例如同時勾選「大阪」與「兵庫」），亦可直接輸入自訂地域：
          </p>

          <div style="display:flex; gap:0.4rem; flex-wrap:wrap; margin-bottom:1rem;" id="location-chips-group">
            ${['名古屋', '犬山', '大阪', '兵庫', '奈良', '京都'].map(loc => `
              <button class="journal-tag-chip loc-chip ${day.location && day.location.includes(loc) ? 'active' : ''}" data-loc="${loc}">${loc}</button>
            `).join('')}
          </div>

          <div style="margin-bottom:1.25rem;">
            <label style="display:block; font-size:0.8rem; font-weight:700; color:var(--ink-sumi); margin-bottom:0.35rem;">自訂地域名稱：</label>
            <input type="text" id="custom-location-input" value="${day.location || ''}" placeholder="例如：大阪 & 兵庫 或 神戶" style="width:100%; padding:0.5rem; border:1.2px solid var(--ink-border); border-radius:2px; font-family:var(--font-handwriting); box-sizing:border-box;" />
          </div>

          <div style="display:flex; justify-content:flex-end; gap:0.5rem;">
            <button class="btn-journal-action secondary modal-close-btn" style="padding:0.45rem 0.95rem;">取消</button>
            <button class="btn-journal-action share" id="btn-save-location" style="padding:0.45rem 1.15rem;">儲存地域</button>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);
    const modal = document.getElementById('location-picker-modal');
    const input = document.getElementById('custom-location-input');

    modal.querySelectorAll('.loc-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        chip.classList.toggle('active');
        const selected = Array.from(modal.querySelectorAll('.loc-chip.active')).map(c => c.getAttribute('data-loc'));
        input.value = selected.join(' & ');
      });
    });

    modal.querySelectorAll('.modal-close-btn').forEach(btn => {
      btn.onclick = () => modal.remove();
    });

    const btnSave = document.getElementById('btn-save-location');
    if (btnSave) {
      btnSave.onclick = () => {
        const val = input.value.trim() || '自由散策';
        day.location = val;
        this.saveCurrentDay(day);
        modal.remove();
        this.renderAll();
      };
    }
  }

  /**
   * 4. 渲染日日行腳清單
   */
  renderTimelineItems() {
    const list = document.getElementById('journal-items-list');
    if (!list) return;

    const day = this.getCurrentDayData();
    const isPeerView = this.currentPeer !== null;

    if (!day || !day.items || day.items.length === 0) {
      list.innerHTML = `
        <div class="journal-empty-state">
          <div class="journal-empty-icon">⛩️</div>
          <p>本日尚未排定行腳，點選下方添入名所或自訂地點。</p>
        </div>
        ${!isPeerView ? `
          <button class="btn-add-spot-bar" id="btn-open-spot-picker-bar">
            <span>＋</span>
            <span>添入名所或私房行腳</span>
          </button>
        ` : ''}
      `;
      if (!isPeerView) {
        const btnAdd = document.getElementById('btn-open-spot-picker-bar');
        if (btnAdd) btnAdd.addEventListener('click', () => this.openSpotPickerModal());
      }
      return;
    }

    const defaultTags = [
      '#值得專程造訪',
      '#風味深邃',
      '#極具風雅',
      '#鏡頭難盡其美',
      '#價格頗有勇氣',
      '#風味相當獨特',
      '#步調極為悠緩',
      '#令人印象深刻的待客',
      '#造訪一次已然足矣'
    ];

    const allAvailableTags = Array.from(new Set([...defaultTags, ...this.customTags]));

    let html = '';
    day.items.forEach((item, idx) => {
      const starsHtml = [1, 2, 3, 4, 5].map(star => {
        const isFilled = (item.rating || 0) >= star;
        if (isPeerView) {
          return `<span class="star-btn ${isFilled ? 'filled' : ''}" style="cursor:default;">★</span>`;
        }
        return `<button class="star-btn ${isFilled ? 'filled' : ''}" data-idx="${idx}" data-star="${star}" title="${star} 星">★</button>`;
      }).join('');

      const itemTags = item.tags || [];
      const tagsHtml = allAvailableTags.map(tag => {
        const isActive = itemTags.includes(tag);
        if (isPeerView) {
          return isActive ? `<span class="journal-tag-chip active" style="cursor:default;">${tag}</span>` : '';
        }
        return `<button class="journal-tag-chip ${isActive ? 'active' : ''}" data-idx="${idx}" data-tag="${tag}">${tag}</button>`;
      }).join('');

      const customTagBtnHtml = isPeerView ? '' : `
        <button class="journal-tag-chip btn-add-custom-tag" data-idx="${idx}" title="添加自訂手帳標籤">＋ 自訂標籤</button>
      `;

      const ctrlButtons = isPeerView ? '' : `
        <div class="journal-item-actions">
          <button class="btn-item-ctrl" data-action="up" data-idx="${idx}" title="上移並對調時間" ${idx === 0 ? 'disabled' : ''}>▲</button>
          <button class="btn-item-ctrl" data-action="down" data-idx="${idx}" title="下移並對調時間" ${idx === day.items.length - 1 ? 'disabled' : ''}>▼</button>
          <button class="btn-item-ctrl danger" data-action="delete" data-idx="${idx}" title="移出本日">✕</button>
        </div>
      `;

      const timeInputHtml = isPeerView ? `
        <span style="font-weight:600; color:var(--ink-sumi);">${item.time || '時段未定'}</span>
      ` : `
        <input type="text" class="journal-item-time-input" data-idx="${idx}" value="${item.time || ''}" placeholder="例如 14:00 - 15:30" />
      `;

      const noteHtml = isPeerView ? `
        <div class="journal-item-note-row" style="margin-top:0.4rem;">
          <p style="font-size:0.84rem; color:var(--ink-sumi); background:var(--washi-warm); padding:0.5rem 0.75rem; border-radius:2px; margin:0; border:1px dashed var(--ink-border-dashed);">
            ${item.note ? `💭 ${item.note}` : '（同行尚未留下記述）'}
          </p>
        </div>
      ` : `
        <div class="journal-item-note-row">
          <textarea class="journal-item-note-input" data-idx="${idx}" placeholder="記下當下所見或微小細節...">${item.note || ''}</textarea>
        </div>
      `;

      html += `
        <div class="journal-item-card" data-idx="${idx}">
          <div class="washi-tape-sticker" aria-hidden="true"></div>
          <div class="journal-item-header">
            <div class="journal-item-info">
              <div class="journal-polaroid-frame">
                ${item.img ? `<img src="${item.img}" class="journal-item-thumb" alt="${item.name}" loading="lazy" />` : `<span class="journal-polaroid-icon">📍</span>`}
              </div>
              <div class="journal-item-meta">
                <div class="journal-item-name-row">
                  <span class="journal-item-name">${idx + 1}. ${item.name}</span>
                  ${item.tag ? `<span class="journal-item-tag-pill">${item.tag}</span>` : ''}
                </div>
                <div class="journal-item-time-row">
                  <span>⏱️</span>
                  ${timeInputHtml}
                </div>
              </div>
            </div>
            ${ctrlButtons}
          </div>

          <div class="journal-item-rating-row">
            <span class="journal-rating-label">⭐ 印象：</span>
            <div class="journal-stars-box">${starsHtml}</div>
          </div>

          <div class="journal-item-tags-row">
            ${tagsHtml}
            ${customTagBtnHtml}
          </div>
          ${noteHtml}
        </div>
      `;
    });

    if (!isPeerView) {
      html += `
        <button class="btn-add-spot-bar" id="btn-open-spot-picker-bar">
          <span>＋</span>
          <span>添入名所或私房行腳</span>
        </button>
      `;
    }

    list.innerHTML = html;

    if (!isPeerView) {
      this.bindItemActions();
      const btnAdd = document.getElementById('btn-open-spot-picker-bar');
      if (btnAdd) {
        btnAdd.addEventListener('click', () => this.openSpotPickerModal());
      }
    }
  }

  parseTimeRange(timeStr) {
    if (!timeStr || typeof timeStr !== 'string') {
      return { start: 14 * 60, end: 15 * 60 + 30, duration: 90 };
    }
    const clean = timeStr.trim();
    const match = clean.match(/(\d{1,2}):(\d{2})\s*(?:-|~|–|to)?\s*(\d{1,2})?:?(\d{2})?/);
    if (!match) {
      return { start: 14 * 60, end: 15 * 60 + 30, duration: 90 };
    }

    const startH = parseInt(match[1], 10);
    const startM = parseInt(match[2], 10);
    const startMins = startH * 60 + startM;

    let endMins;
    if (match[3] && match[4]) {
      const endH = parseInt(match[3], 10);
      const endM = parseInt(match[4], 10);
      endMins = endH * 60 + endM;
    } else {
      endMins = startMins + 90;
    }

    if (endMins <= startMins) {
      endMins = startMins + 60;
    }

    return {
      start: startMins,
      end: endMins,
      duration: endMins - startMins
    };
  }

  formatMinutes(mins) {
    const totalMins = ((mins % (24 * 60)) + (24 * 60)) % (24 * 60);
    const h = Math.floor(totalMins / 60);
    const m = totalMins % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
  }

  /**
   * 智慧行程對調演算法
   */
  swapItemsAndAdjustTime(items, idxA, idxB) {
    if (!items || idxA < 0 || idxB < 0 || idxA >= items.length || idxB >= items.length || idxA === idxB) return;

    const firstIdx = Math.min(idxA, idxB);
    const secondIdx = Math.max(idxA, idxB);

    const itemFormer = items[firstIdx];
    const itemLatter = items[secondIdx];

    const timeFormer = this.parseTimeRange(itemFormer.time);
    const timeLatter = this.parseTimeRange(itemLatter.time);

    items[firstIdx] = itemLatter;
    items[secondIdx] = itemFormer;

    const newStartFormer = timeFormer.start;
    const newEndFormer = newStartFormer + timeLatter.duration;
    items[firstIdx].time = `${this.formatMinutes(newStartFormer)} - ${this.formatMinutes(newEndFormer)}`;

    let newStartLatter = timeLatter.start;
    if (newStartLatter < newEndFormer) {
      newStartLatter = newEndFormer;
    }
    const newEndLatter = newStartLatter + timeFormer.duration;
    items[secondIdx].time = `${this.formatMinutes(newStartLatter)} - ${this.formatMinutes(newEndLatter)}`;

    let curEnd = newEndLatter;
    for (let k = secondIdx + 1; k < items.length; k++) {
      const parsedK = this.parseTimeRange(items[k].time);
      if (parsedK.start < curEnd) {
        const nextStart = curEnd;
        const nextEnd = nextStart + parsedK.duration;
        items[k].time = `${this.formatMinutes(nextStart)} - ${this.formatMinutes(nextEnd)}`;
        curEnd = nextEnd;
      } else {
        break;
      }
    }
  }

  bindItemActions() {
    const list = document.getElementById('journal-items-list');
    if (!list) return;

    list.querySelectorAll('.star-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-idx'), 10);
        const star = parseInt(btn.getAttribute('data-star'), 10);
        const day = this.getCurrentDayData();
        if (day && day.items[idx]) {
          day.items[idx].rating = day.items[idx].rating === star ? 0 : star;
          this.saveCurrentDay(day);
          this.renderTimelineItems();
        }
      });
    });

    list.querySelectorAll('.journal-tag-chip:not(.btn-add-custom-tag)').forEach(chip => {
      chip.addEventListener('click', () => {
        const idx = parseInt(chip.getAttribute('data-idx'), 10);
        const tag = chip.getAttribute('data-tag');
        const day = this.getCurrentDayData();
        if (day && day.items[idx]) {
          day.items[idx].tags = day.items[idx].tags || [];
          const tagIdx = day.items[idx].tags.indexOf(tag);
          if (tagIdx > -1) {
            day.items[idx].tags.splice(tagIdx, 1);
          } else {
            day.items[idx].tags.push(tag);
          }
          this.saveCurrentDay(day);
          this.renderTimelineItems();
        }
      });
    });

    list.querySelectorAll('.btn-add-custom-tag').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-idx'), 10);
        const inputTag = prompt('請輸入自訂手帳標籤（例如：有貓必推、抹茶極濃）：');
        if (!inputTag || !inputTag.trim()) return;

        let cleanTag = inputTag.trim();
        if (!cleanTag.startsWith('#')) cleanTag = '#' + cleanTag;

        this.customTags.add(cleanTag);
        const day = this.getCurrentDayData();
        if (day && day.items[idx]) {
          day.items[idx].tags = day.items[idx].tags || [];
          if (!day.items[idx].tags.includes(cleanTag)) {
            day.items[idx].tags.push(cleanTag);
          }
          this.saveCurrentDay(day);
          this.renderTimelineItems();
        }
      });
    });

    list.querySelectorAll('.journal-item-time-input').forEach(input => {
      input.addEventListener('change', (e) => {
        const idx = parseInt(input.getAttribute('data-idx'), 10);
        const day = this.getCurrentDayData();
        if (day && day.items[idx]) {
          day.items[idx].time = e.target.value.trim();
          this.saveCurrentDay(day);
        }
      });
    });

    list.querySelectorAll('.journal-item-note-input').forEach(textarea => {
      textarea.addEventListener('input', (e) => {
        const idx = parseInt(textarea.getAttribute('data-idx'), 10);
        const day = this.getCurrentDayData();
        if (day && day.items[idx]) {
          day.items[idx].note = e.target.value;
          this.saveCurrentDayDebounced(day);
        }
      });
    });

    list.querySelectorAll('.btn-item-ctrl').forEach(btn => {
      btn.addEventListener('click', () => {
        const action = btn.getAttribute('data-action');
        const idx = parseInt(btn.getAttribute('data-idx'), 10);
        const day = this.getCurrentDayData();
        if (!day || !day.items) return;

        if (action === 'up' && idx > 0) {
          this.swapItemsAndAdjustTime(day.items, idx, idx - 1);
          if (day.isThemeAuto) day.theme = this.autoGenerateDayTheme(day);
          this.saveCurrentDay(day);
          this.renderAll();
        } else if (action === 'down' && idx < day.items.length - 1) {
          this.swapItemsAndAdjustTime(day.items, idx, idx + 1);
          if (day.isThemeAuto) day.theme = this.autoGenerateDayTheme(day);
          this.saveCurrentDay(day);
          this.renderAll();
        } else if (action === 'delete') {
          if (confirm(`確定要從本日行腳中移除「${day.items[idx].name}」嗎？`)) {
            day.items.splice(idx, 1);
            if (day.isThemeAuto) day.theme = this.autoGenerateDayTheme(day);
            this.saveCurrentDay(day);
            this.renderAll();
          }
        }
      });
    });
  }

  /**
   * 5. 渲染一日結語 (和紙手帖雅緻風)
   */
  renderDailySummary() {
    const container = document.getElementById('journal-summary-card-wrap');
    if (!container) return;

    const day = this.getCurrentDayData();
    if (!day) return;

    const summary = day.summary || { pace: '🌿 恬適得宜', mvp: '', trap: '', journal: '' };
    const isPeerView = this.currentPeer !== null;

    const paceOptions = ['🏃 步履緊湊', '🌿 恬適得宜', '☕ 悠緩漫行'];
    const paceChipsHtml = paceOptions.map(p => {
      const isActive = summary.pace === p || (p.includes('恬適') && !summary.pace);
      if (isPeerView) {
        return isActive ? `<span class="pace-chip active" style="cursor:default;">${p}</span>` : '';
      }
      return `<button class="pace-chip ${isActive ? 'active' : ''}" data-pace="${p}">${p}</button>`;
    }).join('');

    // 🈴 當日若已完結封存，渲染御旅印朱印章於一日結語右上角
    let hankoStampHtml = '';
    if (day.isCompleted) {
      hankoStampHtml = `
        <div class="hanko-completed-stamp ${day._justStamped ? 'stamping-active' : ''}" id="summary-hanko-stamp" title="此日手記已鈐印完結（${new Date(day.completedAt || Date.now()).toLocaleDateString('zh-TW')}）">
          <div class="hanko-stamp-inner">
            <span class="hanko-stamp-top">令和八年・名阪</span>
            <span class="hanko-stamp-main">巡行済</span>
            <span class="hanko-stamp-bottom">旅の栞・${this.getKanjiDay(day.dayIndex)}</span>
          </div>
        </div>
      `;
    }

    container.innerHTML = `
      <div class="journal-summary-card" id="journal-summary-card">
        <div class="washi-tape-sticker" aria-hidden="true"></div>
        ${hankoStampHtml}
        <h3 class="journal-summary-title">
          <span>📜</span>
          <span>一日結語</span>
        </h3>

        <div class="summary-field-grid">
          <div class="summary-field-group">
            <label class="summary-label">⚡ 行旅節奏：</label>
            <div class="summary-pace-group">${paceChipsHtml}</div>
          </div>

          <div class="summary-field-group">
            <label class="summary-label">🌟 今日之最（名所或旬味）：</label>
            ${isPeerView ? `
              <div class="summary-input">${summary.mvp || '（未留下記述）'}</div>
            ` : `
              <input type="text" class="summary-input" id="summary-mvp-input" value="${summary.mvp || ''}" placeholder="最難忘的一景或一道料理..." />
            `}
          </div>
        </div>

        <div class="summary-field-grid">
          <div class="summary-field-group">
            <label class="summary-label">💡 隨行留心與備忘：</label>
            ${isPeerView ? `
              <div class="summary-input">${summary.trap || '（未留下記述）'}</div>
            ` : `
              <input type="text" class="summary-input" id="summary-trap-input" value="${summary.trap || ''}" placeholder="交通轉乘、時段或細微留心處..." />
            `}
          </div>

          <div class="summary-field-group">
            <label class="summary-label">📖 暮時心境散記：</label>
            ${isPeerView ? `
              <div class="summary-input summary-textarea">${summary.journal || '（未留下記述）'}</div>
            ` : `
              <textarea class="summary-input summary-textarea" id="summary-journal-input" placeholder="記下今日微風拂過時的心情與光影...">${summary.journal || ''}</textarea>
            `}
          </div>
        </div>
      </div>
    `;

    if (!isPeerView) {
      container.querySelectorAll('.pace-chip').forEach(btn => {
        btn.addEventListener('click', () => {
          day.summary = day.summary || {};
          day.summary.pace = btn.getAttribute('data-pace');
          this.saveCurrentDay(day);
          this.renderDailySummary();
        });
      });

      const mvpInput = document.getElementById('summary-mvp-input');
      if (mvpInput) {
        mvpInput.addEventListener('input', (e) => {
          day.summary = day.summary || {};
          day.summary.mvp = e.target.value;
          this.saveCurrentDayDebounced(day);
        });
      }

      const trapInput = document.getElementById('summary-trap-input');
      if (trapInput) {
        trapInput.addEventListener('input', (e) => {
          day.summary = day.summary || {};
          day.summary.trap = e.target.value;
          this.saveCurrentDayDebounced(day);
        });
      }

      const journalInput = document.getElementById('summary-journal-input');
      if (journalInput) {
        journalInput.addEventListener('input', (e) => {
          day.summary = day.summary || {};
          day.summary.journal = e.target.value;
          this.saveCurrentDayDebounced(day);
        });
      }
    }
  }

  /**
   * 6. 渲染底部操作按鈕 (支援「完結今日手記・鈐蓋御旅印」儀式感雙態)
   */
  renderBottomActions() {
    const wrap = document.getElementById('journal-bottom-actions');
    if (!wrap) return;

    const day = this.getCurrentDayData();
    if (!day) return;

    const isPeerView = this.currentPeer !== null;
    const isCompleted = !!day.isCompleted;

    if (isPeerView) {
      wrap.innerHTML = `
        <div class="journal-bottom-completed-bar">
          <div class="completed-badge-pill">
            <span class="badge-icon">👥</span>
            <span class="badge-text">${this.currentPeer} 之行腳手帖</span>
          </div>
          <div class="journal-completed-actions-grid">
            <button class="btn-journal-action share" id="btn-export-journal-card">
              <span>📸</span>
              <span>製成手帳卡</span>
            </button>
            <button class="btn-journal-action secondary" id="btn-copy-line-format">
              <span>📋</span>
              <span>複製隨行摘記</span>
            </button>
          </div>
        </div>
      `;
    } else if (!isCompleted) {
      // ⛩️ 未完結狀態：簡雅的御旅印按鈕
      wrap.innerHTML = `
        <div class="journal-bottom-ceremony-wrap">
          <button class="btn-ceremony-complete" id="btn-complete-journal-ceremony" title="鈐蓋御旅印">
            <span class="ceremony-btn-icon">⛩️</span>
            <span class="ceremony-btn-text">完稿・鈐御旅印</span>
          </button>
        </div>
      `;

      const btnCeremony = document.getElementById('btn-complete-journal-ceremony');
      if (btnCeremony) {
        btnCeremony.addEventListener('click', () => this.triggerStampCeremony());
      }
      return;
    } else {
      // 💮 已完結狀態：解鎖完整製卡、匯出與重新鈐印操作
      wrap.innerHTML = `
        <div class="journal-bottom-completed-bar">
          <div class="completed-badge-pill">
            <span class="badge-icon">💮</span>
            <span class="badge-text">${this.getKanjiDay(day.dayIndex)}・巡行結算済</span>
          </div>
          <div class="journal-completed-actions-grid">
            <button class="btn-journal-action share" id="btn-export-journal-card" title="生成排版精美之和風手帳卡圖片">
              <span>📸</span>
              <span>製成手帳卡</span>
            </button>
            <button class="btn-journal-action secondary" id="btn-copy-line-format" title="複製純文字行腳摘要至剪貼簿">
              <span>📋</span>
              <span>複製隨行摘記</span>
            </button>
            <button class="btn-journal-action secondary" id="btn-export-markdown" title="下載 Markdown 格式手記檔">
              <span>📥</span>
              <span>匯出 Markdown</span>
            </button>
            <button class="btn-journal-action secondary" id="btn-export-csv" title="下載 CSV 試算表">
              <span>📊</span>
              <span>匯出 CSV</span>
            </button>
            <button class="btn-journal-action re-stamp" id="btn-re-stamp" title="重新播放鈐印御旅印儀式感">
              <span>🈴</span>
              <span>重新鈐印</span>
            </button>
          </div>
        </div>
      `;

      const btnReStamp = document.getElementById('btn-re-stamp');
      if (btnReStamp) {
        btnReStamp.addEventListener('click', () => this.triggerStampCeremony());
      }
    }

    const btnCard = document.getElementById('btn-export-journal-card');
    if (btnCard) btnCard.addEventListener('click', () => this.generateJournalCard());

    const btnLine = document.getElementById('btn-copy-line-format');
    if (btnLine) btnLine.addEventListener('click', () => this.copyLineFormat());

    const btnMd = document.getElementById('btn-export-markdown');
    if (btnMd) btnMd.addEventListener('click', () => this.exportMarkdown());

    const btnCsv = document.getElementById('btn-export-csv');
    if (btnCsv) btnCsv.addEventListener('click', () => this.exportCSV());
  }

  /**
   * 🈴 觸發「完結手記・鈐蓋御旅印」儀式感動畫
   */
  triggerStampCeremony() {
    const day = this.getCurrentDayData();
    if (!day) return;

    day.isCompleted = true;
    day.completedAt = Date.now();
    day._justStamped = true;
    this.saveCurrentDay(day);

    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      try {
        navigator.vibrate([35, 50, 75]);
      } catch {}
    }

    // 重新渲染 一日結語（即刻在眼下播放鈐印砸印動畫）與底部功能區
    this.renderDailySummary();
    this.renderBottomActions();

    const kanjiDay = this.getKanjiDay(day.dayIndex);
    this.showToast(`💮 ${kanjiDay}・巡行結算済`);

    setTimeout(() => {
      if (day) delete day._justStamped;
    }, 800);
  }

  showToast(msg) {
    const toast = document.getElementById('app-toast');
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }

  // =========================================================================
  // 💾 儲存與同步機制
  // =========================================================================

  saveCurrentDay(day) {
    if (this.currentPeer !== null) return;
    if (this.journalData && this.journalData.days) {
      const idx = this.journalData.days.findIndex(d => d.dayIndex === day.dayIndex);
      if (idx > -1) {
        this.journalData.days[idx] = day;
        if (window.appStorage) {
          window.appStorage.saveJournalData(this.journalData);
        }
      }
    }
  }

  saveCurrentDayDebounced(day) {
    if (this.saveTimeout) clearTimeout(this.saveTimeout);
    this.saveTimeout = setTimeout(() => {
      this.saveCurrentDay(day);
    }, 400);
  }

  // =========================================================================
  // ⛩️ 名所庫抽屜 (Spot Picker Modal)
  // =========================================================================

  openSpotPickerModal() {
    const modal = document.getElementById('spot-picker-modal');
    const content = document.getElementById('spot-picker-content');
    if (!modal || !content) return;

    const allSpots = (window.DEFAULT_TRIP_DATA && window.DEFAULT_TRIP_DATA.allSpots) || [];
    
    content.innerHTML = `
      <div style="margin-bottom:0.85rem;">
        <input type="text" id="spot-picker-search" placeholder="🔍 搜尋名所、旬味名物或關鍵字..." style="width:100%; padding:0.55rem 0.85rem; border-radius:2px; border:1.2px solid var(--ink-border, #CFC5B2); font-family:var(--font-handwriting); box-sizing:border-box;" />
      </div>

      <div class="spot-picker-tabs">
        <button class="spot-picker-tab-btn active" data-region="all">全地域</button>
        <button class="spot-picker-tab-btn" data-region="nagoya">名古屋</button>
        <button class="spot-picker-tab-btn" data-region="inuyama">犬山</button>
        <button class="spot-picker-tab-btn" data-region="osaka">大阪</button>
        <button class="spot-picker-tab-btn" data-region="hyogo">兵庫/甲子園</button>
        <button class="spot-picker-tab-btn" data-region="nara">奈良</button>
        <button class="spot-picker-tab-btn" data-region="kyoto">京都</button>
      </div>

      <div class="spot-picker-grid" id="spot-picker-grid-target">
        ${allSpots.map(spot => `
          <div class="spot-picker-card" data-id="${spot.id}">
            ${spot.img ? `<img src="${spot.img}" class="spot-picker-img" alt="${spot.name}" loading="lazy" />` : ''}
            <div class="spot-picker-info">
              <div class="spot-picker-name">${spot.name}</div>
              <div class="spot-picker-tag">${spot.tag || spot.regionName || '名所景點'}</div>
            </div>
            <span style="font-size:1.1rem; color:var(--theme-primary); font-weight:bold;">＋</span>
          </div>
        `).join('')}
      </div>

      <div style="margin-top:1rem; border-top:1.2px dashed var(--ink-border-dashed, #B5A893); padding-top:0.85rem;">
        <h4 style="font-family:var(--font-mincho); font-size:0.92rem; margin:0 0 0.45rem 0; color:var(--ink-sumi);">✍️ 自訂私房行腳：</h4>
        <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
          <input type="text" id="custom-spot-name" placeholder="地點名稱（如：某某茶房）" style="flex:2; min-width:140px; padding:0.45rem 0.65rem; border:1.2px solid var(--ink-border, #CFC5B2); border-radius:2px; font-family:var(--font-handwriting);" />
          <input type="text" id="custom-spot-time" placeholder="時段（如：14:00 - 15:30）" style="flex:1; min-width:110px; padding:0.45rem 0.65rem; border:1.2px solid var(--ink-border, #CFC5B2); border-radius:2px; font-family:var(--font-handwriting);" />
          <button class="btn-journal-top primary" id="btn-add-custom-spot" style="flex-shrink:0;">添入</button>
        </div>
      </div>
    `;

    modal.style.display = 'flex';

    modal.querySelectorAll('.modal-close-btn').forEach(btn => {
      btn.onclick = () => { modal.style.display = 'none'; };
    });

    modal.querySelectorAll('.spot-picker-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        modal.querySelectorAll('.spot-picker-tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const region = btn.getAttribute('data-region');
        const gridTarget = document.getElementById('spot-picker-grid-target');
        if (!gridTarget) return;

        const filtered = region === 'all' ? allSpots : allSpots.filter(s => s.region === region);
        gridTarget.innerHTML = filtered.map(spot => `
          <div class="spot-picker-card" data-id="${spot.id}">
            ${spot.img ? `<img src="${spot.img}" class="spot-picker-img" alt="${spot.name}" loading="lazy" />` : ''}
            <div class="spot-picker-info">
              <div class="spot-picker-name">${spot.name}</div>
              <div class="spot-picker-tag">${spot.tag || spot.regionName || '名所景點'}</div>
            </div>
            <span style="font-size:1.1rem; color:var(--theme-primary); font-weight:bold;">＋</span>
          </div>
        `).join('');

        this.bindSpotCardClick(allSpots);
      });
    });

    const searchInput = document.getElementById('spot-picker-search');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        const gridTarget = document.getElementById('spot-picker-grid-target');
        if (!gridTarget) return;

        const results = allSpots.filter(s => s.name.toLowerCase().includes(query) || (s.tag && s.tag.toLowerCase().includes(query)));
        gridTarget.innerHTML = results.map(spot => `
          <div class="spot-picker-card" data-id="${spot.id}">
            ${spot.img ? `<img src="${spot.img}" class="spot-picker-img" alt="${spot.name}" loading="lazy" />` : ''}
            <div class="spot-picker-info">
              <div class="spot-picker-name">${spot.name}</div>
              <div class="spot-picker-tag">${spot.tag || spot.regionName || '名所景點'}</div>
            </div>
            <span style="font-size:1.1rem; color:var(--theme-primary); font-weight:bold;">＋</span>
          </div>
        `).join('');

        this.bindSpotCardClick(allSpots);
      });
    }

    this.bindSpotCardClick(allSpots);

    const btnAddCustom = document.getElementById('btn-add-custom-spot');
    if (btnAddCustom) {
      btnAddCustom.addEventListener('click', () => {
        const nameInput = document.getElementById('custom-spot-name');
        const timeInput = document.getElementById('custom-spot-time');
        const name = nameInput ? nameInput.value.trim() : '';
        const time = timeInput ? timeInput.value.trim() : '';

        if (!name) {
          alert('請輸入地點名稱！');
          return;
        }

        const day = this.getCurrentDayData();
        if (day) {
          day.items = day.items || [];
          day.items.push({
            id: 'custom_' + Date.now(),
            name: name,
            time: time || '14:00 - 15:30',
            category: 'custom',
            tag: '私房推薦',
            img: '',
            rating: 0,
            tags: [],
            note: '',
            isCustom: true
          });
          if (day.isThemeAuto) day.theme = this.autoGenerateDayTheme(day);
          this.saveCurrentDay(day);
          this.renderAll();
          document.getElementById('spot-picker-modal').style.display = 'none';
        }
      });
    }
  }

  bindSpotCardClick(allSpots) {
    const modal = document.getElementById('spot-picker-modal');
    document.querySelectorAll('.spot-picker-card').forEach(card => {
      card.addEventListener('click', () => {
        const spotId = card.getAttribute('data-id');
        const targetSpot = allSpots.find(s => s.id === spotId);
        if (!targetSpot) return;

        const day = this.getCurrentDayData();
        if (day) {
          day.items = day.items || [];
          day.items.push({
            id: targetSpot.id || `spot_${Date.now()}`,
            name: targetSpot.name,
            nameJp: targetSpot.nameJp || '',
            time: targetSpot.time || '14:00 - 15:30',
            category: targetSpot.category || 'spot',
            tag: targetSpot.tag || '',
            img: targetSpot.img || '',
            rating: 0,
            tags: [],
            note: '',
            isCustom: false
          });
          if (day.isThemeAuto) day.theme = this.autoGenerateDayTheme(day);
          this.saveCurrentDay(day);
          this.renderAll();
          if (modal) modal.style.display = 'none';
        }
      });
    });
  }

  // =========================================================================
  // 📸 和風手帳卡片產生器 (Journal Share Card)
  // =========================================================================

  generateJournalCard() {
    const day = this.getCurrentDayData();
    if (!day) return;

    const modal = document.getElementById('journal-card-modal');
    const content = document.getElementById('journal-card-content');
    if (!modal || !content) return;

    const author = this.currentPeer || this.roomConfig.nickname || '我';
    const summary = day.summary || {};

    // 提煉具節奏感的標題（取精華名所，避免過度堆疊）
    const rawTheme = (day.theme || '').replace(new RegExp(`^${this.getKanjiDay(day.dayIndex)}[・\\s]*`), '');
    const spots = rawTheme.split('・').map(s => s.trim()).filter(Boolean);
    const curatedTitle = spots.length > 0 
      ? (spots.length <= 3 ? spots.join(' ✕ ') : `${spots.slice(0, 3).join(' ✕ ')} 等`)
      : `${day.location || '隨行'} 巡行散策`;

    const itemsSummaryHtml = (day.items || []).map((item, idx) => `
      <div style="display:flex; justify-content:space-between; align-items:baseline; padding:0.4rem 0; border-bottom:1px dashed #E2D9CE;">
        <span style="font-weight:700; color:#1F2429; font-size:0.86rem;">${idx + 1}. ${item.name} <span style="font-size:0.75rem; color:#8C96A0; font-weight:normal;">(${item.time || '時段彈性'})</span></span>
        <span style="color:#C69234; font-size:0.82rem; letter-spacing:1px;">${'★'.repeat(item.rating || 0)}</span>
      </div>
      ${item.note ? `<p style="margin:0.2rem 0 0.35rem 1rem; font-size:0.78rem; color:#5A646E; font-family:var(--font-handwriting); font-style:italic;">💭 "${item.note}"</p>` : ''}
    `).join('');

    content.innerHTML = `
      <div id="capture-card-target" style="background:#FAF8F5; border:1.8px solid #CFC5B2; border-radius:4px; padding:1.4rem 1.6rem; color:#1F2429; font-family:var(--font-sans); position:relative; box-shadow:0 8px 24px rgba(0,0,0,0.06);">
        <!-- 頂部標題與隨筆落款印章 -->
        <div style="display:flex; justify-content:space-between; align-items:flex-start; border-bottom:2px solid #B83B3B; padding-bottom:0.75rem; margin-bottom:1rem; gap:0.75rem;">
          <div style="flex:1; min-width:0;">
            <div style="display:flex; align-items:center; gap:0.45rem; flex-wrap:wrap; margin-bottom:0.25rem;">
              <span style="font-family:var(--font-mincho); font-weight:800; font-size:0.82rem; color:#B83B3B; background:rgba(184,59,59,0.08); padding:0.12rem 0.55rem; border-radius:2px; border:1px solid rgba(184,59,59,0.25);">${this.getKanjiDay(day.dayIndex)}</span>
              <span style="font-size:0.78rem; color:#73695C; font-family:var(--font-handwriting);">📅 ${day.date} (${day.dayOfWeek})</span>
              <span style="font-size:0.78rem; color:#73695C; font-family:var(--font-handwriting);">📍 ${day.location || '自由散策'}</span>
            </div>
            <h2 style="font-size:1.2rem; font-weight:800; line-height:1.4; margin:0.35rem 0 0 0; color:#1F2429; font-family:var(--font-mincho);">${curatedTitle}</h2>
          </div>

          <!-- 寬裕優雅的日式隨筆落款朱印 -->
          <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; border:1.8px solid #B83B3B; border-radius:3px; padding:0.45rem 0.75rem; background:radial-gradient(circle, #FFF4F2 0%, #FDF0EE 100%); box-shadow:0 1px 4px rgba(184,59,59,0.12); flex-shrink:0;">
            <span style="font-size:0.65rem; color:#B83B3B; font-weight:800; font-family:var(--font-mincho); letter-spacing:0.18em; border-bottom:1px dashed rgba(184,59,59,0.35); padding-bottom:2px; margin-bottom:2px; white-space:nowrap;">隨筆手帖</span>
            <span style="font-size:0.78rem; color:#781515; font-weight:900; font-family:var(--font-mincho); letter-spacing:0.1em; white-space:nowrap;">${author}</span>
          </div>
        </div>

        <!-- 日日行腳 -->
        <div style="margin-bottom:1rem;">
          <h4 style="font-size:0.88rem; font-weight:800; color:#1F2429; margin:0 0 0.45rem 0; font-family:var(--font-mincho);">⛩️ 日日行腳</h4>
          ${itemsSummaryHtml || '<p style="font-size:0.8rem; color:#8C96A0;">今日無排定項目</p>'}
        </div>

        <!-- 一日結語 -->
        <div style="background:#F4EFE6; border:1.2px solid #DCD3C3; border-radius:3px; padding:0.85rem 1rem; font-size:0.82rem; margin-bottom:0.85rem;">
          <div style="font-weight:700; color:#1F2429; margin-bottom:0.25rem;">⚡ 行旅節奏：${summary.pace || '🌿 恬適得宜'}</div>
          ${summary.mvp ? `<div style="margin-bottom:0.25rem; color:#1F2429;">🌟 今日之最：<strong>${summary.mvp}</strong></div>` : ''}
          ${summary.trap ? `<div style="margin-bottom:0.25rem; color:#1F2429;">💡 隨行留心：${summary.trap}</div>` : ''}
          ${summary.journal ? `<div style="margin-top:0.35rem; color:#4A4036; font-family:var(--font-handwriting); border-top:1px dashed #CFC5B2; padding-top:0.35rem;">📖 "${summary.journal}"</div>` : ''}
        </div>

        <!-- 頁尾 -->
        <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.7rem; color:#8C96A0; border-top:1px dashed #E2D9CE; padding-top:0.45rem;">
          <span>名阪京奈・行腳手帖</span>
          <span>令和八年 巡行錄</span>
        </div>
      </div>

      <div style="display:flex; justify-content:center; gap:0.75rem; margin-top:1.15rem;">
        <button class="btn-journal-action share" id="btn-copy-card-text">
          <span>📋</span>
          <span>複製摘記文字</span>
        </button>
      </div>
    `;

    modal.style.display = 'flex';

    modal.querySelectorAll('.modal-close-btn').forEach(btn => {
      btn.onclick = () => { modal.style.display = 'none'; };
    });

    const btnCopyText = document.getElementById('btn-copy-card-text');
    if (btnCopyText) {
      btnCopyText.addEventListener('click', () => {
        this.copyLineFormat();
        alert('✅ 已複製今日隨行摘記！可直接貼至 LINE 與同行旅伴分享！');
      });
    }
  }

  // =========================================================================
  // 📋 LINE 格式純文字複製
  // =========================================================================

  copyLineFormat() {
    const day = this.getCurrentDayData();
    if (!day) return;

    const author = this.currentPeer || this.roomConfig.nickname || '旅人';
    const summary = day.summary || {};

    let text = `🏮【旅の栞・${this.getKanjiDay(day.dayIndex)} 隨行手記】\n`;
    text += `📅 日期：${day.date} (${day.dayOfWeek}) 📍 ${day.location}\n`;
    text += `✍️ 筆者：${author}\n`;
    text += `✨ 主題：${day.theme || '巡行探索'}\n\n`;

    text += `⛩️ 日日行腳：\n`;
    (day.items || []).forEach((item, idx) => {
      const stars = '★'.repeat(item.rating || 0);
      text += `${idx + 1}. ${item.name} (${item.time || '時段未定'}) ${stars}\n`;
      if (item.tags && item.tags.length > 0) {
        text += `   印象：${item.tags.join(' ')}\n`;
      }
      if (item.note) {
        text += `   隨筆：${item.note}\n`;
      }
    });

    text += `\n📜 一日結語：\n`;
    text += `⚡ 節奏：${summary.pace || '🌿 恬適得宜'}\n`;
    if (summary.mvp) text += `🌟 今日之最：${summary.mvp}\n`;
    if (summary.trap) text += `💡 隨行留心：${summary.trap}\n`;
    if (summary.journal) text += `📖 暮時散記：${summary.journal}\n`;

    text += `\n--- 來自 TabiSync 旅の栞 隨行手帖 ---`;

    navigator.clipboard.writeText(text).then(() => {
      alert('✅ 隨行摘記已複製到剪貼簿！');
    }).catch(() => {
      alert('複製失敗，請手動選取文字。');
    });
  }

  // =========================================================================
  // 🗝️ 房間暗號與雲端同步
  // =========================================================================

  openRoomModal() {
    const modal = document.getElementById('room-sync-modal');
    if (!modal) return;

    const nickInput = document.getElementById('room-nickname-input') || document.getElementById('room-user-nickname');
    const codeInput = document.getElementById('room-code-input');

    if (nickInput) nickInput.value = this.roomConfig.nickname || '';
    if (codeInput) codeInput.value = this.roomConfig.roomCode || 'osaka2026';

    modal.style.display = 'flex';

    modal.querySelectorAll('.modal-close-btn').forEach(btn => {
      btn.onclick = () => { modal.style.display = 'none'; };
    });

    const btnSave = document.getElementById('btn-save-room-sync');
    if (btnSave) {
      btnSave.onclick = async () => {
        const nickname = nickInput ? nickInput.value.trim() : '';
        const roomCode = codeInput ? codeInput.value.trim().toLowerCase() : '';

        if (!nickname) {
          alert('請輸入您的旅人暱稱（例如：小明、阿 Liao）！');
          return;
        }

        if (!roomCode) {
          alert('請輸入栞室暗號（例如：osaka2026）！');
          return;
        }

        this.roomConfig.nickname = nickname;
        this.roomConfig.roomCode = roomCode;
        if (window.appStorage) {
          window.appStorage.saveRoomConfig(this.roomConfig);
        }

        modal.style.display = 'none';
        this.renderTopBar();
        await this.triggerSync();
      };
    }
  }

  async triggerSync() {
    if (!this.roomConfig.nickname) {
      this.openRoomModal();
      return;
    }

    const btnSync = document.getElementById('btn-quick-sync');
    if (btnSync) {
      btnSync.disabled = true;
      btnSync.innerHTML = '<span>⏳</span><span>同步中...</span>';
    }

    try {
      if (window.appStorage) {
        const payloadData = {
          ...this.journalData,
          profile: {
            nickname: this.roomConfig.nickname
          }
        };

        const res = await window.appStorage.syncRoomJournals(
          this.roomConfig.roomCode,
          this.roomConfig.nickname,
          payloadData
        );
        this.peerData = res.roomData || {};
        alert(`✅ 雲端同步完成！已合卷栞室 [${this.roomConfig.roomCode}] 同行手記。`);
        this.renderAll();
      }
    } catch (err) {
      alert(`⚠️ 同步提示：${err.message}`);
    } finally {
      if (btnSync) {
        btnSync.disabled = false;
        btnSync.innerHTML = '<span>☁️</span><span>共筆同步</span>';
      }
    }
  }

  // =========================================================================
  // 📥 匯出工具
  // =========================================================================

  exportMarkdown() {
    if (!confirm('確定要將您的隨行手記匯出為 Markdown 檔案嗎？')) return;

    if (window.appStorage) {
      const md = window.appStorage.exportJournalsToMarkdown(this.journalData);
      const blob = new Blob([md], { type: 'text/markdown;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `旅の栞_隨行手記_${this.roomConfig.nickname || '個人手帖'}.md`;
      a.click();
      URL.revokeObjectURL(url);
    }
  }

  exportCSV() {
    if (!confirm('確定要將您的隨行手記匯出為 CSV 試算表檔案嗎？')) return;

    if (window.appStorage) {
      const csv = window.appStorage.exportJournalsToCSV(this.journalData);
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `旅の栞_隨行手記_${this.roomConfig.nickname || '個人手帖'}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    }
  }
}

window.journalManager = new JournalManager();
