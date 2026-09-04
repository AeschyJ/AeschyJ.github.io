/**
 * Main Master Controller - Japan Travel Companion PWA (3-Column Interactive Edition v3.0)
 * 聯動管理：左欄行程表 ↔ 中欄活動地圖 (Leaflet) ↔ 右欄景點全攻略與情境日語
 */

document.addEventListener('DOMContentLoaded', () => {
  // State
  let tripData = (window.appStorage && window.appStorage.getCustomTripData()) || window.DEFAULT_TRIP_DATA || { days: [] };
  if (!tripData.days || !Array.isArray(tripData.days) || tripData.days.length === 0) {
    tripData = window.DEFAULT_TRIP_DATA || { days: [] };
  }
  let currentDayIndex = 1;
  let activeSpotId = null;
  let currentSpeechRate = 0.9;
  let currencyRate = tripData.currencyConfig ? tripData.currencyConfig.exchangeRate : 0.215;

  // DOM Elements
  const daysContainer = document.getElementById('days-pills-list');
  const scrollPrevBtn = document.getElementById('scroll-prev-day-btn');
  const scrollNextBtn = document.getElementById('scroll-next-day-btn');
  const dayThemeBox = document.getElementById('day-theme-box');
  const scheduledListTarget = document.getElementById('scheduled-list-target');
  const optionalListTarget = document.getElementById('optional-list-target');
  const scheduledCountBadge = document.getElementById('scheduled-count-badge');
  const optionalCountBadge = document.getElementById('optional-count-badge');
  const spotDetailTarget = document.getElementById('spot-detail-content-target');
  const toastEl = document.getElementById('app-toast');

  // Mobile Header Dropdown Elements
  const mobileDaySelect = document.getElementById('mobile-day-select');
  const headerToolsDropdown = document.getElementById('header-tools-dropdown');
  const mobileToolsToggleBtn = document.getElementById('mobile-tools-toggle-btn');
  const menuItemToolbox = document.getElementById('menu-item-toolbox');
  const menuItemNlm = document.getElementById('menu-item-nlm');
  const menuItemAdmin = document.getElementById('menu-item-admin');

  // Mobile Elements
  const mobileTabs = document.querySelectorAll('#mobile-view-tabs .mobile-tab-btn');
  const panelItinerary = document.getElementById('panel-itinerary');
  const panelMap = document.getElementById('panel-map');
  const panelDetails = document.getElementById('panel-details');
  const sheetDragHandle = document.getElementById('mobile-sheet-drag-handle');
  const sheetTitlePreview = document.getElementById('sheet-title-preview');

  // Staff Modal Elements
  const staffModal = document.getElementById('staff-modal-backdrop');
  const staffModalJp = document.getElementById('staff-modal-jp-text');
  const staffModalZh = document.getElementById('staff-modal-zh-text');
  const staffModalClose = document.getElementById('staff-modal-close-btn');

  // Toolbox Drawer Elements
  const toolboxDrawer = document.getElementById('toolbox-drawer-backdrop');
  const openToolboxBtn = document.getElementById('open-toolbox-btn');
  const closeToolboxBtn = document.getElementById('close-toolbox-btn');
  const packingListTarget = document.getElementById('packing-list-target');
  const jpyInput = document.getElementById('calc-jpy-input');
  const twdInput = document.getElementById('calc-twd-input');

  // Admin Drawer Elements
  const adminDrawer = document.getElementById('admin-drawer-backdrop');
  const openAdminBtn = document.getElementById('open-admin-drawer-btn');
  const closeAdminBtn = document.getElementById('close-admin-drawer-btn');
  const saveJsonBtn = document.getElementById('admin-save-json-btn');
  const resetJsonBtn = document.getElementById('admin-reset-json-btn');
  const jsonTextarea = document.getElementById('admin-json-textarea');
  const copyPromptBtn = document.getElementById('copy-nlm-prompt-btn');
  const promptPreviewEl = document.getElementById('nlm-prompt-preview');

  // Initialize Interactive Map Manager with Graceful Fallback
  let mapManager = null;
  try {
    if (window.TripMapManager) {
      mapManager = new window.TripMapManager('leaflet-trip-map', {
        onSpotSelect: (spotId) => {
          if (activeSpotId !== spotId) {
            onSpotSelected(spotId, false);
          }
        }
      });
      mapManager.init();
      window.appMap = mapManager;
      window.activeMapManager = mapManager;
    }
  } catch (err) {
    console.warn('[TabiSync] Map manager initialization bypassed:', err);
  }

  // Toast Helper
  function showToast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    setTimeout(() => {
      toastEl.classList.remove('show');
    }, 2500);
  }

  // --- TIME SHIFT ALGORITHM (智慧時間解析與平移) ---
  function shiftTimeString(timeStr, deltaMinutes) {
    if (!timeStr || typeof timeStr !== 'string') return timeStr;
    // 匹配如 09:30, 9:30 等時間格式
    return timeStr.replace(/\b(\d{1,2}):(\d{2})\b/g, (match, hStr, mStr) => {
      let totalMins = parseInt(hStr, 10) * 60 + parseInt(mStr, 10) + deltaMinutes;
      // 限制在 00:00 ~ 23:59 範圍
      if (totalMins < 0) totalMins = (totalMins % 1440 + 1440) % 1440;
      if (totalMins >= 1440) totalMins = totalMins % 1440;
      const newH = String(Math.floor(totalMins / 60)).padStart(2, '0');
      const newM = String(totalMins % 60).padStart(2, '0');
      return `${newH}:${newM}`;
    });
  }

  function shiftActiveDayTimes(deltaMinutes) {
    const day = tripData.days.find(d => d.dayIndex === currentDayIndex);
    if (!day || !day.spots) return;

    day.spots.forEach(s => {
      if (s.time) {
        s.time = shiftTimeString(s.time, deltaMinutes);
      }
    });

    window.appStorage.saveCustomTripData(tripData);
    renderItineraryLists(day);
    const activeSpot = day.spots.find(s => s.id === activeSpotId);
    if (activeSpot) renderRightSpotGuide(activeSpot);

    if (navigator.vibrate) navigator.vibrate(12);
    showToast(`⏰ 今日所有行程已${deltaMinutes > 0 ? '延後 +' + deltaMinutes : '提早 ' + deltaMinutes} 分鐘！`);
  }

  function resetActiveDayTimes() {
    const day = tripData.days.find(d => d.dayIndex === currentDayIndex);
    const originalDay = window.DEFAULT_TRIP_DATA.days.find(d => d.dayIndex === currentDayIndex);
    if (!day || !originalDay) return;

    day.spots.forEach(s => {
      const origSpot = (originalDay.spots || []).find(o => o.id === s.id);
      if (origSpot) {
        s.time = origSpot.time || '';
      }
    });

    window.appStorage.saveCustomTripData(tripData);
    renderItineraryLists(day);
    const activeSpot = day.spots.find(s => s.id === activeSpotId);
    if (activeSpot) renderRightSpotGuide(activeSpot);

    if (navigator.vibrate) navigator.vibrate(15);
    showToast('↺ 今日所有行程時間已還原為預設值！');
  }

  // Centralized Day Switcher (Synchronizes Desktop Pills, Mobile Dropdown, Panels, and Theme)
  function switchActiveDay(dayIndex) {
    if (!dayIndex) return;
    currentDayIndex = dayIndex;
    renderDaysPills();
    renderActiveDay();
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      try { navigator.vibrate(10); } catch {}
    }
  }

  // =========================================================================
  // REGIONAL PALETTE SYSTEM (動態六大地域莫蘭迪和色與跨區混色系統)
  // =========================================================================
  const REGION_PALETTES = {
    nagoya: { primary: '#BA8B32', secondary: '#966B24', light: '#FAF4E6', border: '#DBC594', name: '名古屋' },
    inuyama: { primary: '#1D7A73', secondary: '#13534E', light: '#E8F6F5', border: '#9CD6D0', name: '犬山' },
    osaka: { primary: '#A94452', secondary: '#872E3A', light: '#F9ECEE', border: '#DFABAF', name: '大阪' },
    hyogo: { primary: '#3B5B7E', secondary: '#263E57', light: '#EEF4F9', border: '#A4BFD9', name: '兵庫/甲子園' },
    nara: { primary: '#6E8236', secondary: '#4E5E24', light: '#F4F8EE', border: '#C3D9A4', name: '奈良' },
    kyoto: { primary: '#6D4C7C', secondary: '#4E335B', light: '#F4EEF7', border: '#C8B2D5', name: '京都' }
  };

  function hexToRgba(hex, alpha = 0.85) {
    if (!hex || typeof hex !== 'string') return `rgba(232, 90, 79, ${alpha})`;
    const cleanHex = hex.replace('#', '');
    const num = parseInt(cleanHex, 16);
    if (isNaN(num)) return `rgba(232, 90, 79, ${alpha})`;
    const r = (num >> 16) & 255;
    const g = (num >> 8) & 255;
    const b = num & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  function applyRegionalTheme(day) {
    const pKey = day.primaryRegion || 'osaka';
    const sKey = day.secondaryRegion;
    const pPal = REGION_PALETTES[pKey] || REGION_PALETTES.osaka;
    const root = document.documentElement;

    if (sKey && REGION_PALETTES[sKey]) {
      // 跨區天數：主色為區域1主色，輔色為區域2主色，混色雙色漸變
      const sPal = REGION_PALETTES[sKey];
      root.style.setProperty('--theme-primary', pPal.primary);
      root.style.setProperty('--theme-secondary', sPal.primary);
      root.style.setProperty('--theme-seal-border', pPal.primary);
      root.style.setProperty('--theme-seal-text', sPal.primary);
      root.style.setProperty('--theme-seal-bg', pPal.light);
      root.style.setProperty('--theme-light', pPal.light);
      root.style.setProperty('--theme-border', pPal.border);
      root.style.setProperty('--theme-gradient', `linear-gradient(135deg, ${pPal.primary} 0%, ${sPal.primary} 100%)`);
      root.style.setProperty('--theme-card-overlay', `linear-gradient(135deg, ${hexToRgba(pPal.primary, 0.40)} 0%, ${hexToRgba(sPal.primary, 0.40)} 45%, rgba(15, 23, 42, 0.88) 100%)`);
    } else {
      // 單區天數：套用該城市主色與輔色
      root.style.setProperty('--theme-primary', pPal.primary);
      root.style.setProperty('--theme-secondary', pPal.secondary);
      root.style.setProperty('--theme-seal-border', pPal.primary);
      root.style.setProperty('--theme-seal-text', pPal.primary);
      root.style.setProperty('--theme-seal-bg', pPal.light);
      root.style.setProperty('--theme-light', pPal.light);
      root.style.setProperty('--theme-border', pPal.border);
      root.style.setProperty('--theme-gradient', `linear-gradient(135deg, ${pPal.primary} 0%, ${pPal.secondary} 100%)`);
      root.style.setProperty('--theme-card-overlay', `linear-gradient(180deg, ${hexToRgba(pPal.primary, 0.35)} 0%, rgba(15, 23, 42, 0.45) 45%, rgba(15, 23, 42, 0.88) 100%)`);
    }
  }

  // --- DAYS NAVIGATION (DESKTOP PILLS + MOBILE DROPDOWN) ---
  function renderDaysPills() {
    if (!tripData.days || !Array.isArray(tripData.days)) return;

    const KANJI_DAYS = ['第一日', '第二日', '第三日', '第四日', '第五日', '第六日', '第七日', '第八日', '第九日', '第十日', '第十一日'];

    // A. Desktop Horizontal Carousel Pills (和紙栞籤)
    if (daysContainer) {
      daysContainer.innerHTML = '';
      tripData.days.forEach(day => {
        const pill = document.createElement('div');
        const isActive = day.dayIndex === currentDayIndex;

        const pKey = day.primaryRegion || 'osaka';
        const sKey = day.secondaryRegion;
        let regionClass = `region-pill-${pKey}`;
        if (sKey && REGION_PALETTES[sKey]) {
          regionClass = `region-pill-split-${pKey}-${sKey}`;
        }

        pill.className = `day-pill ${regionClass} ${isActive ? 'active' : ''}`;
        pill.setAttribute('data-day', day.dayIndex);
        
        const dayTitle = KANJI_DAYS[day.dayIndex - 1] || `Day ${day.dayIndex}`;
        const shortDate = day.date ? day.date.slice(5) : `Day ${day.dayIndex}`;

        pill.innerHTML = `
          <div class="shiori-ribbon-tip"></div>
          <span class="day-pill-number">${dayTitle}</span>
          <span class="day-pill-date">${shortDate} ${day.dayOfWeek || ''}</span>
          <span class="day-pill-location">${day.location || ''}</span>
        `;

        pill.addEventListener('click', () => {
          switchActiveDay(day.dayIndex);
          pill.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        });

        daysContainer.appendChild(pill);

        if (isActive) {
          setTimeout(() => {
            pill.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
          }, 50);
        }
      });
    }

    // B. Mobile Custom Day Dropdown (和風木牌手籤 - 閉合僅顯第一日，展開呈現完整日程地域)
    const mapLabel = document.getElementById('mobile-map-day-label');
    if (mapLabel) {
      mapLabel.textContent = KANJI_DAYS[currentDayIndex - 1] || `第${currentDayIndex}日`;
    }

    const mapList = document.getElementById('mobile-map-day-list');
    if (mapList) {
      mapList.innerHTML = '';
      tripData.days.forEach(day => {
        const item = document.createElement('button');
        const isActive = day.dayIndex === currentDayIndex;
        item.className = `mobile-day-menu-item ${isActive ? 'active' : ''}`;
        item.type = 'button';
        const dayTitle = KANJI_DAYS[day.dayIndex - 1] || `第${day.dayIndex}日`;
        const shortDate = day.date ? day.date.slice(5) : '';
        item.innerHTML = `
          <span class="day-item-tag">${dayTitle}</span>
          <span class="day-item-date">${shortDate} (${day.dayOfWeek || ''})</span>
          <span class="day-item-loc">${day.location || '散策'}</span>
        `;
        item.addEventListener('click', (e) => {
          e.stopPropagation();
          switchActiveDay(day.dayIndex);
          const dropdown = document.getElementById('mobile-map-day-dropdown');
          if (dropdown) dropdown.classList.remove('open');
        });
        mapList.appendChild(item);
      });
    }

    const mapTrigger = document.getElementById('mobile-map-day-trigger');
    const mapDropdown = document.getElementById('mobile-map-day-dropdown');
    if (mapTrigger && mapDropdown && !mapTrigger.dataset.bound) {
      mapTrigger.dataset.bound = 'true';
      mapTrigger.addEventListener('click', (e) => {
        e.stopPropagation();
        const willOpen = !mapDropdown.classList.contains('open');
        if (window.closeAllDropdowns) window.closeAllDropdowns();
        if (willOpen) mapDropdown.classList.add('open');
      });
    }
  }

  // Horizontal Scroll Buttons
  if (scrollPrevBtn && daysContainer) {
    scrollPrevBtn.addEventListener('click', () => {
      daysContainer.scrollBy({ left: -220, behavior: 'smooth' });
    });
  }
  if (scrollNextBtn && daysContainer) {
    scrollNextBtn.addEventListener('click', () => {
      daysContainer.scrollBy({ left: 220, behavior: 'smooth' });
    });
  }

  // --- RENDER ACTIVE DAY (LEFT LIST + CENTER MAP + RIGHT GUIDE) ---
  function renderActiveDay() {
    const day = tripData.days.find(d => d.dayIndex === currentDayIndex) || tripData.days[0];
    if (!day) return;

    // Apply Dynamic Regional Theme & Secondary Palette
    applyRegionalTheme(day);

    // 1. Left Panel: High-End Clean Magazine Banner Theme Card
    if (dayThemeBox) {
      const w = day.weather || { desc: '晴天', high: 33, low: 26, icon: '☀️' };
      const coverImg = day.coverImg || 'assets/images/hero.jpg';
      
      let regionBadges = '';
      if (day.secondaryRegion && REGION_PALETTES[day.secondaryRegion]) {
        const pName = (REGION_PALETTES[day.primaryRegion] || {}).name || day.primaryRegion;
        const sName = REGION_PALETTES[day.secondaryRegion].name;
        regionBadges = `
          <span class="region-badge region-badge-${day.primaryRegion}">${pName}</span>
          <span style="font-size:0.72rem; color:rgba(255,255,255,0.85); margin:0 0.1rem;">✕</span>
          <span class="region-badge region-badge-${day.secondaryRegion}">${sName}</span>
        `;
      } else {
        const pName = (REGION_PALETTES[day.primaryRegion] || {}).name || day.location;
        regionBadges = `<span class="region-badge region-badge-${day.primaryRegion || 'osaka'}">${pName}</span>`;
      }

      dayThemeBox.innerHTML = `
        <img src="${coverImg}" class="day-theme-bg-img" alt="${day.location}" onerror="this.src='assets/images/hero.jpg'">
        <div class="day-theme-overlay"></div>
        <div class="day-theme-content">
          <div class="day-theme-meta-row">
            <div style="display:flex; align-items:center; gap:0.35rem;">
              ${regionBadges}
            </div>
            <div class="weather-pill">
              <span>${w.icon || '☀️'}</span>
              <span>${w.desc} ${w.high}° / ${w.low}°</span>
            </div>
          </div>
          <h3 class="day-theme-heading">${day.theme || `${day.location} 精彩巡禮`}</h3>
          <p class="day-theme-summary">${day.summary || ''}</p>
        </div>
      `;
    }

    // 2. Left Panel: Render Itinerary Timeline Lists
    renderItineraryLists(day);

    // 3. Center Panel: Render Map Markers & Popups
    if (mapManager) {
      mapManager.renderDaySpots(day.spots || [], day.mapCenter, day.mapZoom || 13);
    }

    // 4. Right Panel: Select first scheduled spot by default
    const firstSpot = (day.spots || []).find(s => s.isScheduled) || (day.spots || [])[0];
    if (firstSpot) {
      onSpotSelected(firstSpot.id, true);
    } else {
      renderEmptySpotGuide();
    }
  }

  function renderItineraryLists(day) {
    const spots = day.spots || [];
    const scheduled = spots.filter(s => s.isScheduled);
    const optional = spots.filter(s => !s.isScheduled);

    if (scheduledCountBadge) scheduledCountBadge.textContent = `${scheduled.length} 處名所`;
    if (optionalCountBadge) optionalCountBadge.textContent = `${optional.length} 處拾遺`;

    if (scheduledListTarget) {
      scheduledListTarget.innerHTML = '';

      if (scheduled.length > 0) {
        const batchBar = document.createElement('div');
        batchBar.className = 'itinerary-batch-time-bar';
        batchBar.id = 'itinerary-batch-time-bar';
        batchBar.style.display = 'none';
        batchBar.innerHTML = `
          <span style="display:flex; align-items:center; gap:0.25rem;">
            <span>⏱️ 時間微調</span>
          </span>
          <div class="batch-time-btn-group">
            <button class="btn-batch-shift" data-batch-shift="-30" title="今日全部提早30分">⏪ -30分</button>
            <button class="btn-batch-shift" data-batch-shift="-15" title="今日全部提早15分">⏪ -15分</button>
            <button class="btn-batch-shift" data-batch-shift="15" title="今日全部延後15分">⏩ +15分</button>
            <button class="btn-batch-shift" data-batch-shift="30" title="今日全部延後30分">⏩ +30分</button>
            <button class="btn-batch-shift" data-batch-reset="true" title="重設今日所有時間" style="color:var(--color-torii); border-color:var(--color-border);">↺</button>
          </div>
        `;

        batchBar.querySelectorAll('[data-batch-shift]').forEach(btn => {
          btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const delta = parseInt(btn.getAttribute('data-batch-shift'), 10);
            shiftActiveDayTimes(delta);
          });
        });

        const resetBtn = batchBar.querySelector('[data-batch-reset]');
        if (resetBtn) {
          resetBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            resetActiveDayTimes();
          });
        }

        scheduledListTarget.appendChild(batchBar);
      }

      scheduled.forEach((spot, idx) => {
        const card = createItineraryCard(spot, idx + 1, true);
        scheduledListTarget.appendChild(card);
      });
    }

    if (optionalListTarget) {
      optionalListTarget.innerHTML = '';
      if (optional.length === 0) {
        optionalListTarget.innerHTML = `
          <div style="font-size:0.78rem; color:var(--text-tertiary); padding:0.5rem; text-align:center; font-style:italic;">
            今日無額外探索景點
          </div>
        `;
      } else {
        optional.forEach(spot => {
          const card = createItineraryCard(spot, null, false);
          optionalListTarget.appendChild(card);
        });
      }
    }
  }

  function createItineraryCard(spot, orderNumber, isScheduled) {
    const card = document.createElement('div');
    const isHotel = spot.category === 'hotel' || spot.isHotelBase;
    const isGourmet = spot.category === 'dining' || (spot.mustOrder && spot.mustOrder.length > 0);
    const extraClass = isScheduled ? 'scheduled' : (isHotel ? 'hotel' : (isGourmet ? 'gourmet' : 'optional washi-memo'));
    
    const currentDay = tripData.days.find(d => d.dayIndex === currentDayIndex) || {};
    const regionKey = spot.region || currentDay.primaryRegion || 'osaka';
    const regionName = (REGION_PALETTES[regionKey] || {}).name || '';
    const imgUrl = spot.img || spot.image || spot.photo || 'assets/images/hero.jpg';

    // 依據景點類型精確呈現時間/分類標籤 (住宿/美食/景點/預定)
    let typeLabel = '';
    if (spot.time) {
      typeLabel = `⏱️ ${spot.time}`;
    } else if (isScheduled) {
      typeLabel = '⛩️ 排定行腳';
    } else if (isHotel) {
      typeLabel = '🏨 本陣宿點';
    } else if (isGourmet) {
      typeLabel = spot.tag ? `🥢 旬味・${spot.tag}` : '🥢 旬味名店';
    } else {
      typeLabel = spot.tag ? `🍃 私房・${spot.tag}` : '🍃 私房拾遺';
    }

    // 支援跨區日不同地點擁有獨立色彩 (region-card-*)
    card.className = `itinerary-card ${extraClass} region-card-${regionKey} ${spot.id === activeSpotId ? 'active-selected' : ''}`;
    card.setAttribute('data-spot-id', spot.id);

    let badgeHtml = '';
    if (isHotel) {
      badgeHtml = `<div class="itinerary-wood-badge hotel-badge" title="下榻旅宿">🏨</div>`;
    } else if (isGourmet) {
      badgeHtml = `<div class="itinerary-wood-badge gourmet-badge" title="旬味名物">🥢</div>`;
    } else if (!isScheduled) {
      badgeHtml = `<div class="itinerary-wood-badge optional-badge" title="私房拾遺">🍃</div>`;
    } else {
      badgeHtml = `<div class="itinerary-wood-badge" title="第 ${orderNumber} 處名所">${orderNumber}</div>`;
    }

    card.innerHTML = `
      ${badgeHtml}
      <img src="${imgUrl}" class="itinerary-card-thumb" alt="${spot.name}" loading="lazy" onerror="this.src='assets/images/hero.jpg'">
      <div class="itinerary-card-info">
        <div class="itinerary-card-time-row">
          <span class="itinerary-card-time">${typeLabel}</span>
          ${regionName ? `<span class="region-badge region-badge-${regionKey}">${regionName}</span>` : ''}
        </div>
        <div class="itinerary-card-title">${spot.name}</div>
        ${spot.address ? `<div class="itinerary-card-address">📍 ${spot.address}</div>` : ''}
      </div>
    `;

    card.addEventListener('click', () => {
      onSpotSelected(spot.id, true);
      if (window.innerWidth <= 960) {
        setMobileView('map');
      }
    });

    return card;
  }

  function onSpotSelected(spotId, panMap = true) {
    activeSpotId = spotId;
    
    document.querySelectorAll('.itinerary-card').forEach(card => {
      if (card.getAttribute('data-spot-id') === spotId) {
        card.classList.add('active-selected');
        card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } else {
        card.classList.remove('active-selected');
      }
    });

    const day = tripData.days.find(d => d.dayIndex === currentDayIndex) || tripData.days[0];
    const spot = (day.spots || []).find(s => s.id === spotId);
    
    if (spot) {
      renderSpotDetail(spot);
    } else {
      renderEmptySpotGuide();
    }

    if (mapManager && mapManager.selectSpot) {
      mapManager.selectSpot(spotId, panMap);
    } else if (window.appMap && window.appMap.selectSpot) {
      window.appMap.selectSpot(spotId, panMap);
    }

    const sheetTitlePreview = document.getElementById('sheet-title-preview');
    if (sheetTitlePreview && spot) {
      sheetTitlePreview.textContent = `⛩️ ${spot.name}（名所指南 ➔）`;
    }
  }

  function renderSpotDetail(spot) {
    if (!spotDetailTarget) return;

    const currentDay = tripData.days.find(d => d.dayIndex === currentDayIndex) || {};
    const regionKey = spot.region || currentDay.primaryRegion || 'osaka';
    const regionPalette = REGION_PALETTES[regionKey] || REGION_PALETTES.osaka;
    const regionName = regionPalette.name || '';
    const spotColor = regionPalette.primary;
    const spotLight = regionPalette.light;
    const heroPhoto = spot.img || spot.photo || spot.image;

    let html = `
      ${heroPhoto ? `
        <div class="polaroid-frame-wrapper">
          <div class="washi-tape-corner"></div>
          <div class="polaroid-photo-frame">
            <div class="polaroid-img-container">
              <img src="${heroPhoto}" alt="${spot.name}" class="polaroid-hero-img" loading="lazy" onerror="this.closest('.polaroid-frame-wrapper').style.display='none'">
            </div>
            <div class="polaroid-caption-footer">
              <div class="polaroid-title-row">
                <div class="polaroid-spot-title">${spot.name}</div>
                ${regionName ? `<div class="polaroid-hanko-region">${regionName}</div>` : ''}
              </div>
              ${spot.photoLabel ? `<div class="polaroid-photo-desc">📸 ${spot.photoLabel}</div>` : ''}
            </div>
          </div>
        </div>
      ` : ''}

      <div class="spot-detail-section washi-card">
        <div class="spot-title-row">
          <h2 class="spot-name-h2">${spot.name}</h2>
          <span class="badge" style="background:${spotLight}; color:${spotColor}; font-weight:800;">
            ${spot.tag || (spot.isScheduled ? '排定行腳' : '私房拾遺')}
          </span>
        </div>

        ${spot.japanese ? `
          <div class="spot-furigana-box">
            ${spot.furigana ? `
              <ruby class="furigana-ruby">
                ${spot.japanese}<rt class="furigana-rt">${spot.furigana}</rt>
              </ruby>
            ` : `
              <div class="spot-furigana-plain">${spot.japanese} (${spot.romaji || ''})</div>
            `}
          </div>
        ` : ''}

        <div class="spot-time-toggle-header" id="toggle-time-editor-header" style="margin-top:0.75rem; padding-top:0.55rem; border-top:1px dashed var(--color-border);">
          <div style="display:flex; align-items:center; gap:0.4rem; font-size:0.8rem; font-weight:700; color:var(--text-primary);">
            <span>⏱️ 參訪時段：</span>
            <span class="badge badge-torii" id="spot-time-display-badge" style="background:${spotLight}; color:${spotColor};">
              ${spot.time || '未設定時段'}
            </span>
          </div>
          <button class="btn-toggle-time-edit" id="btn-toggle-time-edit" title="調整此景點時間">
            ✏️ 時段設定 ▾
          </button>
        </div>
        <div class="spot-time-editor-box" id="spot-time-editor-box" style="display:none;">
          <div class="spot-time-input-row">
            <input type="text" id="spot-custom-time-input" class="spot-time-input" value="${spot.time || ''}" placeholder="例如：09:30 - 11:00 或 18:00">
            <button id="btn-save-spot-time" class="btn-time-save" style="background:${spotColor} !important;">💾 儲存</button>
          </div>
          <div class="spot-time-quick-shifts">
            <button class="btn-time-shift" data-shift="-30">-30分</button>
            <button class="btn-time-shift" data-shift="-15">-15分</button>
            <button class="btn-time-shift" data-shift="15">+15分</button>
            <button class="btn-time-shift" data-shift="30">+30分</button>
            <button id="btn-reset-spot-time" class="btn-time-reset" style="margin-left:auto;">↺ 還原預設</button>
          </div>
        </div>
      </div>

      <div class="spot-detail-section washi-card">
        <div class="spot-detail-sec-title">📍 景點位置</div>
        <p style="font-size:0.84rem; color:var(--text-secondary); line-height:1.45; margin-bottom:0.75rem;">
          ${spot.address || '地址整理中'}
        </p>
        ${spot.googleMaps ? `
          <a href="${spot.googleMaps}" target="_blank" rel="noopener" class="btn-nav-link btn-nav-primary" style="background:${spotColor} !important; color:#FFFFFF !important; border:none; box-shadow:0 3px 10px rgba(0,0,0,0.15);">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="3 11 22 2 13 21 11 13 3 11"></polygon></svg>
            <span>地圖導航 ↗</span>
          </a>
        ` : ''}
      </div>
    `;

    if (spot.highlights && spot.highlights.length > 0) {
      html += `
        <div class="spot-detail-section washi-card">
          <div class="spot-detail-sec-title">✨ 風土手抄</div>
          <div class="spot-highlights-box">
            ${spot.highlights.map(h => `
              <div class="spot-highlight-item">
                <span style="color:${spotColor}; font-size:0.85rem;">❖</span>
                <span>${h}</span>
              </div>
            `).join('')}
            ${spot.photoTip ? `
              <div class="spot-photo-tip">
                <span>📷 <strong>取景機位：</strong>${spot.photoTip}</span>
              </div>
            ` : ''}
            ${spot.hours ? `
              <div class="spot-photo-tip" style="color:var(--text-secondary);">
                <span>⏰ <strong>開放時間：</strong>${spot.hours}</span>
              </div>
            ` : ''}
          </div>
        </div>
      `;
    }

    if (spot.mustOrder && spot.mustOrder.length > 0) {
      const KANJI_INDEX = ['其の壱', '其の弐', '其の参', '其の四', '其の五', '其の六'];
      html += `
        <div class="spot-detail-section washi-card wood-menu-section">
          <div class="spot-detail-sec-title" style="display:flex; justify-content:space-between; align-items:center;">
            <span>🥢 木札菜單</span>
            <span class="wood-menu-seal">名物</span>
          </div>
          
          <div class="mokufuda-menu-grid">
            ${spot.mustOrder.map((dish, idx) => `
              <div class="mokufuda-plaque-item">
                <div class="mokufuda-content">
                  <span class="mokufuda-order">${KANJI_INDEX[idx] || `其の${idx+1}`}</span>
                  <span class="mokufuda-name">${dish}</span>
                </div>
                <span class="mokufuda-stamp">名物</span>
              </div>
            `).join('')}
          </div>

          ${spot.budget ? `
            <div class="wood-budget-box">
              <span>💰 <strong>預算目安：</strong>${spot.budget}</span>
            </div>
          ` : ''}
          ${spot.notes ? `
            <div class="wood-notes-memo">
              <span>💡 <strong>品味指南：</strong>${spot.notes}</span>
            </div>
          ` : ''}
        </div>
      `;
    }

    if (spot.phrases && spot.phrases.length > 0) {
      html += `
        <div class="spot-detail-section washi-card">
          <div class="spot-detail-sec-title">🗣️ 名所情境</div>
          <div class="phrases-grid">
            ${spot.phrases.map(p => `
              <div class="phrase-card">
                <div>
                  <span class="phrase-scenario-tag" style="color:${spotColor}; background:${spotLight};">${p.scenario}</span>
                  <div class="phrase-japanese" style="margin-top:0.35rem;">${p.japanese}</div>
                  <div class="phrase-romaji">${p.romaji}</div>
                  <div class="phrase-chinese" style="margin-top:0.25rem;">${p.chinese}</div>
                </div>
                <div class="phrase-actions">
                  <button class="btn-speech-play" data-speak="${p.audio || p.japanese}" style="background:${spotColor} !important;">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
                    發音
                  </button>
                  <button class="btn-show-staff" data-jp="${p.japanese}" data-zh="${p.chinese}">
                    出示店員
                  </button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    if (spot.fullStory || spot.deepGuide || spot.detailedIntro) {
      const story = spot.fullStory || spot.deepGuide || spot.detailedIntro;
      const storyParas = Array.isArray(story) ? story : [story];
      html += `
        <div class="spot-detail-section">
          <div class="spot-detail-sec-title">📖 深度解析</div>
          <div class="spot-full-story-box">
            ${storyParas.map(para => `<p class="story-paragraph">${para}</p>`).join('')}
          </div>
        </div>
      `;
    }

    spotDetailTarget.innerHTML = html;

    const timeInput = spotDetailTarget.querySelector('#spot-custom-time-input');
    const saveTimeBtn = spotDetailTarget.querySelector('#btn-save-spot-time');
    const resetTimeBtn = spotDetailTarget.querySelector('#btn-reset-spot-time');
    const toggleTimeBtn = spotDetailTarget.querySelector('#btn-toggle-time-edit');
    const toggleTimeHeader = spotDetailTarget.querySelector('#toggle-time-editor-header');
    const timeEditorBox = spotDetailTarget.querySelector('#spot-time-editor-box');
    const timeDisplayBadge = spotDetailTarget.querySelector('#spot-time-display-badge');

    if (toggleTimeBtn && timeEditorBox) {
      const toggleEditor = (e) => {
        if (e) e.stopPropagation();
        const isHidden = timeEditorBox.style.display === 'none';
        timeEditorBox.style.display = isHidden ? 'flex' : 'none';
        toggleTimeBtn.textContent = isHidden ? '收合 ▴' : '✏️ 時段設定 ▾';
        if (isHidden && timeInput) {
          timeInput.focus();
        }
      };
      toggleTimeBtn.addEventListener('click', toggleEditor);
      if (toggleTimeHeader) {
        toggleTimeHeader.addEventListener('click', (e) => {
          if (e.target !== toggleTimeBtn) {
            toggleEditor(e);
          }
        });
      }
    }

    if (saveTimeBtn && timeInput) {
      saveTimeBtn.addEventListener('click', () => {
        const val = timeInput.value.trim();
        spot.time = val;
        if (timeDisplayBadge) timeDisplayBadge.textContent = val || '未指定';
        window.appStorage.saveCustomTripData(tripData);
        const day = tripData.days.find(d => d.dayIndex === currentDayIndex);
        if (day) renderItineraryLists(day);
        if (navigator.vibrate) navigator.vibrate(10);
        showToast(`⏰ 【${spot.name}】時間已更新為「${val || '未設定'}」！`);
      });

      timeInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          saveTimeBtn.click();
        }
      });
    }

    spotDetailTarget.querySelectorAll('[data-shift]').forEach(btn => {
      btn.addEventListener('click', () => {
        if (!timeInput) return;
        const delta = parseInt(btn.getAttribute('data-shift'), 10);
        const cur = timeInput.value.trim() || spot.time || '09:00 - 10:00';
        const updated = shiftTimeString(cur, delta);
        timeInput.value = updated;
        spot.time = updated;
        if (timeDisplayBadge) timeDisplayBadge.textContent = updated;
        window.appStorage.saveCustomTripData(tripData);
        const day = tripData.days.find(d => d.dayIndex === currentDayIndex);
        if (day) renderItineraryLists(day);
        if (navigator.vibrate) navigator.vibrate(10);
        showToast(`⏰ 【${spot.name}】時間已調整為 ${updated}！`);
      });
    });

    if (resetTimeBtn && timeInput) {
      resetTimeBtn.addEventListener('click', () => {
        const originalDay = window.DEFAULT_TRIP_DATA.days.find(d => d.dayIndex === currentDayIndex);
        const originalSpot = originalDay ? (originalDay.spots || []).find(s => s.id === spot.id) : null;
        const origTime = originalSpot ? (originalSpot.time || '') : '';
        timeInput.value = origTime;
        spot.time = origTime;
        if (timeDisplayBadge) timeDisplayBadge.textContent = origTime || '未指定';
        window.appStorage.saveCustomTripData(tripData);
        const day = tripData.days.find(d => d.dayIndex === currentDayIndex);
        if (day) renderItineraryLists(day);
        if (navigator.vibrate) navigator.vibrate(12);
        showToast(`↺ 【${spot.name}】時間已還原為預設值！`);
      });
    }

    // Attach speech & modal handlers in right panel
    spotDetailTarget.querySelectorAll('[data-speak]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const text = e.currentTarget.getAttribute('data-speak');
        window.appSpeech.speak(text, currentSpeechRate);
      });
    });

    spotDetailTarget.querySelectorAll('.btn-show-staff').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const jp = e.currentTarget.getAttribute('data-jp');
        const zh = e.currentTarget.getAttribute('data-zh');
        openStaffModal(jp, zh);
      });
    });
  }

  function renderEmptySpotGuide() {
    if (!spotDetailTarget) return;
    spotDetailTarget.innerHTML = `
      <div style="text-align:center; padding:3rem 1rem; color:var(--text-tertiary);">
        <span style="font-size:2.5rem; display:block; margin-bottom:0.75rem;">🏮</span>
        <h4 style="font-size:1.05rem; font-weight:700; color:var(--text-primary);">請點選行腳行程或地圖地標</h4>
        <p style="font-size:0.82rem; margin-top:0.35rem;">即時展開名所手抄、取景機位、情境日語與旬味木札</p>
      </div>
    `;
  }

  // --- MOBILE OPTION A VIEW CONTROLLER ---
  function setMobileView(viewName) {
    if (window.innerWidth > 960) return;

    mobileTabs.forEach(tab => {
      if (tab.getAttribute('data-tab') === viewName) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });

    if (panelItinerary) panelItinerary.classList.remove('mobile-active-view');
    if (panelMap) panelMap.classList.remove('mobile-active-view');
    if (panelDetails) panelDetails.classList.remove('mobile-active-view');

    if (viewName === 'itinerary' && panelItinerary) panelItinerary.classList.add('mobile-active-view');
    if (viewName === 'map' && panelMap) {
      panelMap.classList.add('mobile-active-view');
      if (mapManager) mapManager.invalidate();
    }
    if (viewName === 'details' && panelDetails) panelDetails.classList.add('mobile-active-view');
  }

  mobileTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const view = tab.getAttribute('data-tab');
      setMobileView(view);
    });
  });

  if (sheetDragHandle) {
    sheetDragHandle.addEventListener('click', () => {
      setMobileView('details');
    });
  }

  // --- STAFF FULLSCREEN MODAL ---
  function openStaffModal(jp, zh) {
    if (!staffModal) return;
    staffModalJp.textContent = jp;
    staffModalZh.textContent = zh;
    staffModal.classList.add('active');
  }

  function closeStaffModal() {
    if (staffModal) {
      staffModal.classList.remove('active');
    }
  }

  if (staffModalClose) staffModalClose.addEventListener('click', closeStaffModal);
  if (staffModal) {
    staffModal.addEventListener('click', (e) => {
      if (e.target === staffModal) closeStaffModal();
    });
  }

  // Global ESC key to close modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeStaffModal();
      if (toolboxDrawer) toolboxDrawer.classList.remove('active');
      if (adminDrawer) adminDrawer.classList.remove('active');
    }
  });

  // --- TOOLBOX PACKING LIST & CURRENCY ---
  function renderPackingList() {
    if (!packingListTarget) return;
    const list = window.appStorage.getPackingList();
    packingListTarget.innerHTML = '';

    list.forEach(item => {
      const row = document.createElement('div');
      row.style.cssText = 'display:flex; align-items:center; justify-content:space-between; padding:0.5rem 0; border-bottom:1px solid var(--color-border-light);';
      row.innerHTML = `
        <label style="display:flex; align-items:center; gap:0.5rem; cursor:pointer; font-size:0.88rem; ${item.done ? 'text-decoration:line-through; color:var(--text-tertiary);' : 'color:var(--text-primary);'}">
          <input type="checkbox" ${item.done ? 'checked' : ''} data-id="${item.id}" style="width:16px; height:16px; accent-color:var(--color-matcha); cursor:pointer;">
          <span>${item.text}</span>
        </label>
        <button data-delete-id="${item.id}" style="background:none; border:none; color:var(--text-tertiary); cursor:pointer; font-size:0.75rem;">✕</button>
      `;

      row.querySelector('input').addEventListener('change', (e) => {
        const id = e.target.getAttribute('data-id');
        window.appStorage.togglePackingItem(id);
        renderPackingList();
      });

      row.querySelector('button').addEventListener('click', (e) => {
        const id = e.target.getAttribute('data-delete-id');
        window.appStorage.deletePackingItem(id);
        renderPackingList();
      });

      packingListTarget.appendChild(row);
    });
  }

  // Currency Converter
  if (jpyInput && twdInput) {
    jpyInput.addEventListener('input', () => {
      const jpy = parseFloat(jpyInput.value) || 0;
      twdInput.value = Math.round(jpy * currencyRate);
    });
    twdInput.addEventListener('input', () => {
      const twd = parseFloat(twdInput.value) || 0;
      jpyInput.value = Math.round(twd / currencyRate);
    });
  }

  // Add Item Input
  const addPackingBtn = document.getElementById('add-packing-btn');
  const addPackingInput = document.getElementById('add-packing-input');
  if (addPackingBtn && addPackingInput) {
    addPackingBtn.addEventListener('click', () => {
      if (addPackingInput.value) {
        window.appStorage.addPackingItem(addPackingInput.value);
        addPackingInput.value = '';
        renderPackingList();
        showToast('已新增行李項目！');
      }
    });
  }

  // Batch Time Bar Toggle Button (左側批量時間微調展開/收合開關)
  const btnToggleBatch = document.getElementById('btn-toggle-batch-bar');
  if (btnToggleBatch) {
    btnToggleBatch.addEventListener('click', () => {
      const bar = document.getElementById('itinerary-batch-time-bar');
      if (bar) {
        const isHidden = bar.style.display === 'none';
        bar.style.display = isHidden ? 'flex' : 'none';
        btnToggleBatch.textContent = isHidden ? '收合微調 ▴' : '⏱️ 微調時間 ▾';
      }
    });
  }

  // Toolbox Drawer
  if (openToolboxBtn && toolboxDrawer) {
    openToolboxBtn.addEventListener('click', () => {
      toolboxDrawer.classList.add('active');
    });
  }
  if (closeToolboxBtn && toolboxDrawer) {
    closeToolboxBtn.addEventListener('click', () => {
      toolboxDrawer.classList.remove('active');
    });
  }
  if (toolboxDrawer) {
    toolboxDrawer.addEventListener('click', (e) => {
      if (e.target === toolboxDrawer) toolboxDrawer.classList.remove('active');
    });
  }

  // Admin Drawer
  if (openAdminBtn && adminDrawer) {
    openAdminBtn.addEventListener('click', () => {
      if (jsonTextarea) {
        jsonTextarea.value = JSON.stringify(tripData, null, 2);
      }
      adminDrawer.classList.add('active');
    });
  }
  if (closeAdminBtn && adminDrawer) {
    closeAdminBtn.addEventListener('click', () => {
      adminDrawer.classList.remove('active');
    });
  }
  if (adminDrawer) {
    adminDrawer.addEventListener('click', (e) => {
      if (e.target === adminDrawer) adminDrawer.classList.remove('active');
    });
  }

  // Copy Prompt to Clipboard
  if (copyPromptBtn) {
    copyPromptBtn.addEventListener('click', () => {
      const promptText = `請根據本筆記本的所有日本旅行資料，嚴格以繁體中文整理出標準 JSON 格式（不要加上任何多餘解釋文字，僅輸出合法的 JSON 物件）：包含 id, title, days 陣列，每個 day 包含 dayIndex, date, location, theme, weather, spots (包含 id, name, nameJp, isScheduled, category, time, coords:[lat,lng], image, tag, address, description, highlights, photoTip, hours, phrases, mustOrder, score, budget) 等資訊。`;
      navigator.clipboard.writeText(promptText).then(() => {
        showToast('📋 已複製萃取指令！');
      }).catch(() => {
        showToast('📋 已複製指令！');
      });
    });
  }

  // Save JSON
  if (saveJsonBtn && jsonTextarea) {
    saveJsonBtn.addEventListener('click', () => {
      try {
        const parsed = JSON.parse(jsonTextarea.value);
        tripData = parsed;
        window.appStorage.saveCustomTripData(parsed);
        adminDrawer.classList.remove('active');
        initAll();
        showToast('🎉 行程資料已成功更新並儲存！');
      } catch (err) {
        alert('JSON 格式不正確，請檢查語法：' + err.message);
      }
    });
  }

  // 🍃 拂塵歸初：重置手帖與清空本機手記
  const resetConfirmModal = document.getElementById('reset-confirm-modal');
  const closeResetModalBtn = document.getElementById('close-reset-modal-btn');
  const cancelResetModalBtn = document.getElementById('cancel-reset-modal-btn');
  const confirmResetModalBtn = document.getElementById('confirm-reset-modal-btn');

  const openResetModal = () => {
    if (resetConfirmModal) resetConfirmModal.style.display = 'flex';
  };

  const closeResetModal = () => {
    if (resetConfirmModal) resetConfirmModal.style.display = 'none';
  };

  if (resetJsonBtn) {
    resetJsonBtn.addEventListener('click', openResetModal);
  }

  if (closeResetModalBtn) closeResetModalBtn.addEventListener('click', closeResetModal);
  if (cancelResetModalBtn) cancelResetModalBtn.addEventListener('click', closeResetModal);

  if (resetConfirmModal) {
    resetConfirmModal.addEventListener('click', (e) => {
      if (e.target === resetConfirmModal) closeResetModal();
    });
  }

  if (confirmResetModalBtn) {
    confirmResetModalBtn.addEventListener('click', () => {
      closeResetModal();
      window.appStorage.resetToOriginal();
      tripData = window.DEFAULT_TRIP_DATA;
      currentDayIndex = 1;
      if (adminDrawer) adminDrawer.classList.remove('active');
      
      initAll();
      
      const isCurrentlyJournal = document.body.classList.contains('journal-mode-active');
      if (window.journalManager) {
        window.journalManager.currentDayIndex = 1;
        window.journalManager.currentPeer = null;
        window.journalManager.loadData();
        window.journalManager.renderAll();
      }
      if (window.updateHeaderModeUI) {
        window.updateHeaderModeUI(isCurrentlyJournal);
      }
      
      showToast('🍃 筆墨已淨，手帖重歸原初！');
    });
  }

  // --- HEADER MODE UI & DROPDOWN EVENT HANDLERS ---
  const desktopMoreDropdown = document.getElementById('header-desktop-more-dropdown');
  const desktopMoreToggleBtn = document.getElementById('desktop-more-toggle-btn');
  const desktopMenuItemToolbox = document.getElementById('desktop-menu-item-toolbox');
  const desktopMenuItemAdmin = document.getElementById('desktop-menu-item-admin');
  const menuItemViewSwitch = document.getElementById('menu-item-view-switch');

  /**
   * 全域關閉所有下拉選單（互斥機制，確保一次只展開一個）
   */
  window.closeAllDropdowns = function() {
    if (headerToolsDropdown) {
      headerToolsDropdown.classList.remove('open');
      if (mobileToolsToggleBtn) mobileToolsToggleBtn.setAttribute('aria-expanded', 'false');
    }
    if (desktopMoreDropdown) {
      desktopMoreDropdown.classList.remove('open');
      if (desktopMoreToggleBtn) desktopMoreToggleBtn.setAttribute('aria-expanded', 'false');
    }
    const mapDropdown = document.getElementById('mobile-map-day-dropdown');
    if (mapDropdown) {
      mapDropdown.classList.remove('open');
    }
    const journalDropdown = document.getElementById('mobile-journal-day-dropdown');
    if (journalDropdown) {
      journalDropdown.classList.remove('open');
    }
    ['desktop', 'mobile'].forEach(prefix => {
      const peerDd = document.getElementById(`${prefix}-peer-dropdown`);
      if (peerDd) {
        peerDd.classList.remove('open');
      }
    });
  };

  function closeDesktopMoreDropdown() {
    if (desktopMoreDropdown && desktopMoreDropdown.classList.contains('open')) {
      desktopMoreDropdown.classList.remove('open');
      if (desktopMoreToggleBtn) desktopMoreToggleBtn.setAttribute('aria-expanded', 'false');
    }
  }

  function toggleDesktopMoreDropdown(e) {
    if (e) e.stopPropagation();
    if (!desktopMoreDropdown) return;
    const willOpen = !desktopMoreDropdown.classList.contains('open');
    window.closeAllDropdowns();
    if (willOpen) {
      desktopMoreDropdown.classList.add('open');
      if (desktopMoreToggleBtn) desktopMoreToggleBtn.setAttribute('aria-expanded', 'true');
    }
  }

  function closeToolsDropdown() {
    if (headerToolsDropdown && headerToolsDropdown.classList.contains('open')) {
      headerToolsDropdown.classList.remove('open');
      if (mobileToolsToggleBtn) {
        mobileToolsToggleBtn.setAttribute('aria-expanded', 'false');
      }
    }
  }

  function toggleToolsDropdown(e) {
    if (e) e.stopPropagation();
    if (!headerToolsDropdown) return;
    const willOpen = !headerToolsDropdown.classList.contains('open');
    window.closeAllDropdowns();
    if (willOpen) {
      headerToolsDropdown.classList.add('open');
      if (mobileToolsToggleBtn) {
        mobileToolsToggleBtn.setAttribute('aria-expanded', 'true');
      }
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        try { navigator.vibrate(8); } catch {}
      }
    }
  }

  /**
   * 模式切換時動態更新 Header 右側按鈕與手機選單項目狀態
   */
  window.updateHeaderModeUI = function(isJournal) {
    const desktopModeBtnIcon = document.getElementById('desktop-mode-btn-icon');
    const desktopModeBtnText = document.getElementById('desktop-mode-btn-text');
    const btnDesktopJournal = document.getElementById('btn-desktop-switch-journal');
    const menuItemViewIcon = document.getElementById('menu-item-view-icon');
    const menuItemViewTitle = document.getElementById('menu-item-view-title');
    const menuItemViewDesc = document.getElementById('menu-item-view-desc');

    if (isJournal) {
      if (desktopModeBtnIcon) desktopModeBtnIcon.textContent = '🗺️';
      if (desktopModeBtnText) desktopModeBtnText.textContent = '返回地圖';
      if (btnDesktopJournal) btnDesktopJournal.title = '返回隨行地圖模式';

      if (menuItemViewIcon) menuItemViewIcon.textContent = '🗺️';
      if (menuItemViewTitle) menuItemViewTitle.textContent = '🗺️ 返回隨行地圖';
      if (menuItemViewDesc) menuItemViewDesc.textContent = '返回每日行腳地圖與名所手抄';
    } else {
      if (desktopModeBtnIcon) desktopModeBtnIcon.textContent = '📖';
      if (desktopModeBtnText) desktopModeBtnText.textContent = '行旅手記';
      if (btnDesktopJournal) btnDesktopJournal.title = '切換至行旅手記（行程編排・評星・手帳結算）';

      if (menuItemViewIcon) menuItemViewIcon.textContent = '📖';
      if (menuItemViewTitle) menuItemViewTitle.textContent = '📖 行旅手記與結算';
      if (menuItemViewDesc) menuItemViewDesc.textContent = '自訂行程・評星心得・旅伴共筆';
    }
  };

  let toolsDropdownEventsInitialized = false;
  function initToolsDropdownEvents() {
    if (toolsDropdownEventsInitialized) return;
    toolsDropdownEventsInitialized = true;

    // 1. 桌面端「更多 ▾」下拉選單
    if (desktopMoreToggleBtn) {
      desktopMoreToggleBtn.addEventListener('click', toggleDesktopMoreDropdown);
    }
    if (desktopMenuItemToolbox) {
      desktopMenuItemToolbox.addEventListener('click', () => {
        closeDesktopMoreDropdown();
        if (toolboxDrawer) toolboxDrawer.classList.add('active');
      });
    }
    if (desktopMenuItemAdmin) {
      desktopMenuItemAdmin.addEventListener('click', () => {
        closeDesktopMoreDropdown();
        if (jsonTextarea) {
          jsonTextarea.value = JSON.stringify(tripData, null, 2);
        }
        if (adminDrawer) adminDrawer.classList.add('active');
      });
    }

    // 2. 手機端「選單 ▾」下拉選單
    if (mobileToolsToggleBtn) {
      mobileToolsToggleBtn.addEventListener('click', toggleToolsDropdown);
    }

    // 手機選單第 1 項：模式雙向切換 (手記 ↔ 地圖)
    if (menuItemViewSwitch) {
      menuItemViewSwitch.addEventListener('click', () => {
        closeToolsDropdown();
        if (window.journalManager) {
          const isCurrentlyJournal = document.body.classList.contains('journal-mode-active');
          window.journalManager.toggleJournalMode(!isCurrentlyJournal);
        }
      });
    }

    // 手機選單第 2 項：NotebookLM
    if (menuItemNlm) {
      menuItemNlm.addEventListener('click', () => {
        closeToolsDropdown();
      });
    }

    // 手機選單第 3 項：隨身道具
    if (menuItemToolbox) {
      menuItemToolbox.addEventListener('click', () => {
        closeToolsDropdown();
        if (toolboxDrawer) toolboxDrawer.classList.add('active');
      });
    }

    // 手機選單第 4 項：手帖設定與 Prompt
    if (menuItemAdmin) {
      menuItemAdmin.addEventListener('click', () => {
        closeToolsDropdown();
        if (jsonTextarea) {
          jsonTextarea.value = JSON.stringify(tripData, null, 2);
        }
        if (adminDrawer) adminDrawer.classList.add('active');
      });
    }

    // 3. 桌面端模式切換按鈕
    const btnDesktopJournal = document.getElementById('btn-desktop-switch-journal');
    if (btnDesktopJournal) {
      btnDesktopJournal.addEventListener('click', () => {
        if (window.journalManager) {
          const isCurrentlyJournal = document.body.classList.contains('journal-mode-active');
          window.journalManager.toggleJournalMode(!isCurrentlyJournal);
        }
      });
    }

    // 4. 點擊外部自動關閉所有下拉選單
    document.addEventListener('click', (e) => {
      window.closeAllDropdowns();
    });

    // 5. ESC 鍵關閉所有選單與彈窗
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        window.closeAllDropdowns();
        closeStaffModal();
        if (toolboxDrawer) toolboxDrawer.classList.remove('active');
        if (adminDrawer) adminDrawer.classList.remove('active');
      }
    });
  }

  // --- INIT ALL ---
  function initAll() {
    try {
      renderDaysPills();
      renderActiveDay();
      renderPackingList();
      initToolsDropdownEvents();

      // Initialize Travel Journal Manager
      if (window.journalManager) {
        window.journalManager.init();
      }
    } catch (err) {
      console.error('[TabiSync] Init render error:', err);
    }

    // Default mobile active view (ensures visibility even if sub-render had warning)
    if (window.innerWidth <= 960) {
      setMobileView('itinerary');
    }
  }

  initAll();
});
