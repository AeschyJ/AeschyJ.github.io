/**
 * 📜《夏之栞・名阪京奈行旅繪卷》水墨電子雜誌核心控制器
 * Sumi-e Emaki Magazine Interactive Controller
 */

class EmakiMagazineApp {
  constructor() {
    this.metadata = window.MAGAZINE_METADATA || {};
    this.chapters = window.MAGAZINE_CHAPTERS || [];
    
    // DOM Elements
    this.viewport = document.getElementById('emaki-viewport');
    this.track = document.getElementById('emaki-track');
    this.coverSection = document.getElementById('emaki-cover');
    this.spindleProgress = document.getElementById('spindle-progress-fill');
    this.viewButtons = document.querySelectorAll('.view-toggle-btn');
    this.soundToggleBtn = document.getElementById('btn-sound-toggle');
    this.stampDrawerBtn = document.getElementById('btn-stamp-drawer');
    this.stampDrawerPanel = document.getElementById('stamp-drawer-panel');
    this.stampDrawerCloseBtn = document.getElementById('btn-close-stamp-drawer');
    this.stampCountBadge = document.getElementById('stamp-count-badge');
    this.stampDrawerBody = document.getElementById('stamp-drawer-body');
    
    // Lightbox Elements
    this.lightbox = document.getElementById('sumi-lightbox');
    this.lightboxImg = document.getElementById('lightbox-img');
    this.lightboxVideo = document.getElementById('lightbox-video');
    this.lightboxCaption = document.getElementById('lightbox-caption');
    this.lightboxMeta = document.getElementById('lightbox-meta');
    this.lightboxCloseBtn = document.getElementById('btn-close-lightbox');
    this.lightboxPrevBtn = document.getElementById('btn-prev-lightbox');
    this.lightboxNextBtn = document.getElementById('btn-next-lightbox');

    // State
    this.currentMode = localStorage.getItem('emaki_view_mode') || 'horizontal';
    this.stampedPhotos = new Set(JSON.parse(localStorage.getItem('shiori_emaki_stamps') || '[]'));
    this.currentLightboxList = [];
    this.currentLightboxIndex = 0;
    this.soundActive = false;
    this.audioCtx = null;
    this.ambientInterval = null;
    this.activeSpotState = {};

    this.init();
  }

  init() {
    this.renderChapters();
    this.applyViewMode(this.currentMode);
    this.bindEvents();
    this.bindWheelToHorizontal();
    this.updateStampDisplay();
    this.initSpindleProgress();
    this.restoreReadingProgress();
    console.info('[EmakiMagazineApp] Initialized with 9 volumes & 313 media archives.');
  }

  // =========================================================================
  // 0.5 拍立得卡片統一渲染器 (支援照片與現場影音，含 Poster 縮圖與安全回退)
  // =========================================================================
  renderPolaroidCard(item, pIdx = 0, { extraClass = '', showHanko = true } = {}) {
    const isStamped = this.stampedPhotos.has(item.id);
    const isVideo = Boolean((item.path && item.path.toLowerCase().endsWith('.mp4')) || item.isVideo);
    const fullWebPath = isVideo
      ? encodeURI(item.path)
      : encodeURI(item.path.replace(/^Photos\//, 'Photos_web/'));

    const posterPath = isVideo
      ? (item.poster || 'Photos/名古屋巨蛋 中日龍/IMG_20260821_181449.jpg')
      : item.path;

    const thumbWebPath = encodeURI(
      posterPath.replace(/^Photos\//, 'Photos_web/').replace(/\.jpg$/i, '_thumb.jpg')
    );
    const fallbackWebPath = encodeURI(
      posterPath.replace(/^Photos\//, 'Photos_web/')
    );

    const rot = pIdx === null ? 0 : (pIdx % 2 === 0 ? -0.8 : 1.0);
    const transformStyle = pIdx === null ? 'transform:none;' : `transform: rotate(${rot}deg);`;
    const classList = ['polaroid-item-wrap', extraClass, isVideo ? 'is-video-polaroid' : '']
      .filter(Boolean)
      .join(' ');

    return `
      <div class="${classList}" style="${transformStyle}" data-photo-id="${item.id}" data-full="${fullWebPath}" data-caption="${item.caption}" data-tag="${item.tag || ''}" data-is-video="${isVideo ? 'true' : 'false'}">
        <div class="washi-tape-accent"></div>
        ${isVideo ? `
          <span class="polaroid-video-badge">▶ 現場影音</span>
          <span class="polaroid-play-icon">▶</span>
        ` : (item.tag ? `<span class="polaroid-tag-badge">${item.tag}</span>` : '')}
        <img class="polaroid-thumb-img" src="${thumbWebPath}" alt="${item.caption}" loading="eager" onerror="this.onerror=null; this.src='${fallbackWebPath}';" />
        <div class="polaroid-caption">${item.caption}</div>
        ${showHanko ? `
          <button class="stamp-hanko-btn ${isStamped ? 'stamped' : ''}" data-photo-id="${item.id}" title="鈐印珍藏">
            ${isStamped ? '印' : '栞'}
          </button>
        ` : ''}
      </div>
    `;
  }

  // =========================================================================
  // 1. 動態渲染九卷章節
  // =========================================================================
  renderChapters() {
    if (!this.track || !this.chapters.length) return;
    
    // 清除舊章節，但保留靜態卷首面板 (vol-0)
    const oldPanels = this.track.querySelectorAll('.emaki-chapter-panel:not(.emaki-cover-panel)');
    oldPanels.forEach(p => p.remove());

    this.chapters.forEach((ch, idx) => {
      const panel = document.createElement('article');
      panel.className = 'emaki-chapter-panel';
      panel.id = ch.chapterId;
      panel.dataset.index = idx;
      panel.style.setProperty('--chapter-accent', ch.regionColor || '#B58836');

      // 使用 Photos_web 高速優化路徑
      const heroUrl = encodeURI(ch.heroPhoto.path.replace(/^Photos\//, 'Photos_web/'));

      // 拍立得照片群 HTML (縮圖用 _thumb.jpg，點擊展開用 1400px 大圖，影音自動載入 poster 縮圖)
      const scrapbookHtml = ch.gallery.map((item, pIdx) => this.renderPolaroidCard(item, pIdx)).join('');

      // 計算此卷所有獨特照片總數 (含各景點私房照片)
      const allChapterPhotosMap = new Map();
      if (ch.heroPhoto) allChapterPhotosMap.set(ch.heroPhoto.path, ch.heroPhoto);
      ch.gallery.forEach(g => allChapterPhotosMap.set(g.path, g));
      ch.spots.forEach(s => {
        if (s.photos) s.photos.forEach(p => allChapterPhotosMap.set(p.path, p));
      });
      const totalChapterPhotosCount = allChapterPhotosMap.size;

      // 日日行腳時間軸短評 HTML (完全按照手記完整行程)
      const timelineHtml = ch.spots.map((s, sIdx) => {
        const photoCount = s.photos ? s.photos.length : 0;
        return `
          <div class="timeline-mini-item clickable-spot ${photoCount === 0 ? 'no-photo-spot' : ''}" data-chapter-id="${ch.chapterId}" data-spot-idx="${sIdx}" title="${photoCount > 0 ? '點擊切換檢視專屬寫真 (' + photoCount + '幅)' : '隨行手記漫步行程'}">
            <div style="min-width:0; flex:1;">
              <span class="timeline-mini-name">${s.name}</span>
              <span style="font-size:0.68rem; color:var(--sumi-faint); margin-left:0.35rem;">${s.time}</span>
            </div>
            <div style="display:flex; align-items:center; gap:5px;">
              ${photoCount > 0 ? `<span class="spot-photo-count-pill">${photoCount}幅</span>` : '<span class="spot-text-pill">手記</span>'}
              <span class="timeline-mini-stars">${'★'.repeat(s.rating || 0)}</span>
            </div>
          </div>
        `;
      }).join('');

      // 影片專區 (若有) - 嚴格設置 preload="none"，杜絕背景預載霸佔線程
      let videoHtml = '';
      const hasVideoClass = ch.videoSpot ? 'has-video' : '';
      if (ch.videoSpot) {
        const encodedVideo = encodeURI(ch.videoSpot.videoPath);
        videoHtml = `
          <div class="video-filmstrip-card">
            <div class="video-filmstrip-header">
              <span>🎞️ ${ch.videoSpot.caption}</span>
              <span style="color:var(--kirikane-gold);">現場影音</span>
            </div>
            <video class="video-player-element" controls preload="none" playsinline>
              <source src="${encodedVideo}" type="video/mp4">
              您的瀏覽器不支援影片播放。
            </video>
          </div>
        `;
      }

      panel.innerHTML = `
        <div class="chapter-inner-wrapper ${hasVideoClass}">
          <!-- 1. 左欄：標題、日文題字與引言 -->
          <div class="chapter-col-header">
            <div class="chapter-badge-group">
              <span class="chapter-vol-pill" style="background:${ch.regionColor};">${ch.volumeKanji}</span>
              <span class="chapter-date-tag">${ch.date} (${ch.dayOfWeek})</span>
              <span class="chapter-date-tag">📍 ${ch.location}</span>
            </div>
            
            <div class="chapter-kanji-title-wrap">
              <div class="chapter-kanji-vol">${ch.volumeKanji}</div>
              <div>
                <h2 class="chapter-kanji-title">${ch.themeTitle}</h2>
                <div style="font-size:0.8rem; color:var(--sumi-faint); margin-top:0.25rem;">${ch.themeTitleJp}</div>
              </div>
            </div>

            <div class="chapter-quote-block">
              “${ch.quote}”
            </div>

            <p class="chapter-summary-desc">
              ${ch.summaryText}
            </p>


            <div class="chapter-pace-indicator">
              <span>今日節奏：</span>
              <strong>${ch.pace}</strong>
            </div>

            <!-- 展開此卷全量寫真按鈕 -->
            <button class="btn-nav-action btn-open-full-album" data-chapter-idx="${idx}" style="align-self:flex-start; margin-top:0.5rem;">
              <span>📜 展開全卷相簿</span>
              <span style="color:var(--shuin-red); font-weight:700;">(${totalChapterPhotosCount}幅全帙)</span>
            </button>
          </div>

          <!-- 2. 中欄：大圖跨頁焦點 -->
          <div class="chapter-col-visual">
            <div class="hero-spread-card" data-full="${heroUrl}" data-caption="${ch.heroPhoto.caption}">
              <img class="hero-spread-img" src="${heroUrl}" alt="${ch.heroPhoto.caption}" loading="eager" />
              <div class="hero-caption-overlay">
                <span class="hero-caption-text">${ch.heroPhoto.caption}</span>
                <span class="hero-badge-tag">${ch.heroPhoto.tag || '名所特寫'}</span>
              </div>
            </div>
            ${videoHtml}
          </div>

          <!-- 3. 拍立得手記群 -->
          <div class="chapter-col-scrapbook" id="scrapbook-col-${ch.chapterId}">
            <div class="scrapbook-header-bar" id="scrapbook-header-${ch.chapterId}" style="display:none;">
              <div class="scrapbook-spot-title" id="spot-title-${ch.chapterId}"></div>
              <div class="scrapbook-spot-badge" id="spot-count-${ch.chapterId}"></div>
            </div>
            <div class="scrapbook-spot-note" id="spot-note-${ch.chapterId}" style="display:none;"></div>
            <div class="scrapbook-grid" id="scrapbook-grid-${ch.chapterId}">
              ${scrapbookHtml}
            </div>
            <!-- 底部前後頁箭頭導航列 (超過兩欄/一頁時切換) -->
            <div class="scrapbook-bottom-nav" id="scrapbook-bottom-nav-${ch.chapterId}" style="display:none;">
              <button class="scrapbook-nav-arrow btn-prev-page" data-chapter-id="${ch.chapterId}" data-dir="-1" title="前一頁">
                ‹ 前一頁
              </button>
              <div class="scrapbook-nav-pages-indicator" id="scrapbook-nav-indicator-${ch.chapterId}">
                第 1 / 1 頁
              </div>
              <button class="scrapbook-nav-arrow btn-next-page" data-chapter-id="${ch.chapterId}" data-dir="1" title="後一頁">
                後一頁 ›
              </button>
            </div>
          </div>

          <!-- 4. 獨立日日行腳時間軸欄位 (不用下滑看完整) -->
          <div class="chapter-col-timeline">
            <div class="chapter-timeline-card">
              <div class="timeline-card-header-bar">
                <div class="timeline-card-title">
                  <span>⛩️ 日日行腳摘記</span>
                  <span style="font-size:0.7rem; color:var(--sumi-faint);">(${ch.spots.length}處)</span>
                </div>
                <button class="btn-timeline-reset" data-chapter-id="${ch.chapterId}" style="display:none;" title="返回今日全景精選">
                  <span>‹ 返回全日</span>
                </button>
              </div>
              <div class="timeline-items-list">
                ${timelineHtml}
              </div>
            </div>
          </div>
        </div>
      `;


      this.track.appendChild(panel);
    });

    // 綁定各卡片點擊事件
    this.bindCardClicks();
  }

  // =========================================================================
  // 2. 視角切換器 (橫向漫遊繪卷 vs 縱向折本雜誌)
  // =========================================================================
  applyViewMode(mode) {
    this.currentMode = mode;
    this.viewport.setAttribute('data-mode', mode);
    localStorage.setItem('emaki_view_mode', mode);

    this.viewButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.view === mode);
    });

    // 重置滾動至合適起點
    if (mode === 'horizontal') {
      this.track.scrollLeft = 0;
    } else {
      this.track.scrollTop = 0;
    }
  }

  // 橫向模式下支援：滾輪正規化平移、觸控板雙向滑動、滑鼠按住拖曳漫遊與鍵盤左右巡航
  bindWheelToHorizontal() {
    // 1. 滾輪與觸控板事件處理 (正規化 deltaMode，徹底解決行模式下每步僅 1~3px 的視覺假死)
    window.addEventListener('wheel', (e) => {
      if (this.currentMode !== 'horizontal') return;
      if (this.lightbox && this.lightbox.classList.contains('active')) return;

      // 檢查是否游標在可滾動子元件內 (例如時間軸卡片)
      const scrollableChild = e.target.closest('.chapter-timeline-card, .stamp-drawer-body');
      if (scrollableChild) {
        const isAtTop = scrollableChild.scrollTop <= 0 && e.deltaY < 0;
        const isAtBottom = (scrollableChild.scrollTop + scrollableChild.clientHeight >= scrollableChild.scrollHeight - 1) && e.deltaY > 0;
        // 若在內部且尚未滾到底/頂，且是以垂直滾動為主，則允許內部時間軸捲動
        if (!isAtTop && !isAtBottom && Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
          return;
        }
      }

      e.preventDefault();

      // 取得最大位移向量 (支援垂直滾輪轉水平，也支援觸控板直接水平雙指滑動)
      let delta = Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX;

      // 關鍵修復：正規化 deltaMode (0: 像素, 1: 行, 2: 頁面)
      if (e.deltaMode === 1) {
        delta *= 36; // Windows 行模式滾輪自動放大為標準像素步長
      } else if (e.deltaMode === 2) {
        delta *= (this.track.clientWidth || window.innerWidth);
      }

      // 順滑推進行進
      this.track.scrollLeft += delta * 1.25;
    }, { passive: false });

    // 2. 桌機端支援滑鼠按住左鍵抓取拖曳漫遊 (Mouse Drag-to-Scroll)
    let isDown = false;
    let startX = 0;
    let scrollStart = 0;
    this._isDraggingHappened = false;

    this.track.addEventListener('mousedown', (e) => {
      if (this.currentMode !== 'horizontal') return;
      // 點擊任何按鈕、時間軸項目、卡片、分頁箭頭時，絕對不啟動畫卷拖曳判定
      if (e.target.closest('button, a, video, .stamp-hanko-btn, input, .timeline-mini-item, .polaroid-item-wrap, .hero-spread-card, .scrapbook-nav-arrow, .chapter-col-timeline, .chapter-col-scrapbook')) {
        return;
      }
      isDown = true;
      this._isDraggingHappened = false;
      this.track.classList.add('is-grabbing');
      startX = e.pageX - this.track.offsetLeft;
      scrollStart = this.track.scrollLeft;
    });

    window.addEventListener('mouseup', () => {
      if (!isDown) return;
      isDown = false;
      this.track.classList.remove('is-grabbing');
      this._isDraggingHappened = false;
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const currentX = e.pageX - this.track.offsetLeft;
      const walk = (currentX - startX) * 1.35;
      if (Math.abs(walk) > 15) {
        this._isDraggingHappened = true;
      }
      this.track.scrollLeft = scrollStart - walk;
    });

    // 3. 支援鍵盤左右箭頭 (ArrowLeft / ArrowRight) 與翻頁鍵快速巡航
    window.addEventListener('keydown', (e) => {
      if (this.currentMode !== 'horizontal') return;
      if (this.lightbox && this.lightbox.classList.contains('active')) return;
      if (e.target.closest('input, textarea')) return;

      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        e.preventDefault();
        this.track.scrollBy({ left: 450, behavior: 'smooth' });
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        this.track.scrollBy({ left: -450, behavior: 'smooth' });
      }
    });
  }


  // =========================================================================
  // 3. 卷軸底端軸棒進度與章節里程碑
  // =========================================================================
  initSpindleProgress() {
    if (!this.track || !this.spindleProgress) return;

    const handleScroll = () => {
      let progress = 0;
      if (this.currentMode === 'horizontal') {
        const maxScroll = this.track.scrollWidth - this.track.clientWidth;
        progress = maxScroll > 0 ? (this.track.scrollLeft / maxScroll) : 0;
      } else {
        const maxScroll = this.track.scrollHeight - this.track.clientHeight;
        progress = maxScroll > 0 ? (this.track.scrollTop / maxScroll) : 0;
      }

      this.spindleProgress.style.width = `${(progress * 100).toFixed(1)}%`;
      this.saveProgressDebounced(progress);
    };

    this.track.addEventListener('scroll', handleScroll, { passive: true });
  }

  saveProgressDebounced(progress) {
    clearTimeout(this._progressDebounce);
    this._progressDebounce = setTimeout(() => {
      localStorage.setItem('emaki_reading_progress', progress.toString());
    }, 500);
  }

  restoreReadingProgress() {
    // 保持進度條寬度展示，但預設讓長卷平穩展軸於卷首，讓使用者能欣賞封面並點擊「開卷」或軸棒圓點自由巡覽
    const saved = localStorage.getItem('emaki_reading_progress');
    if (saved && this.spindleProgress) {
      const p = parseFloat(saved);
      this.spindleProgress.style.width = `${(p * 100).toFixed(1)}%`;
    }
  }


  // =========================================================================
  // 4. 全局單一事件委託架構 (Event Delegation - 徹底杜絕多重監聽與卡死)
  // =========================================================================
  bindCardClicks() {
    if (this._cardClicksBound) return;
    this._cardClicksBound = true;

    this.track.addEventListener('click', (e) => {
      // 1. 拍立得朱印鈐印按鈕點擊
      const stampBtn = e.target.closest('.stamp-hanko-btn');
      if (stampBtn) {
        e.stopPropagation();
        this.handleStampClick(stampBtn);
        return;
      }

      // 2. 日日行腳時間軸景點點擊 (切換該景點所有相片)
      const spotItem = e.target.closest('.timeline-mini-item.clickable-spot');
      if (spotItem) {
        const chapterId = spotItem.dataset.chapterId;
        const spotIdx = parseInt(spotItem.dataset.spotIdx, 10);
        this.switchSpotGallery(chapterId, spotIdx, 0);
        return;
      }

      // 3. 返回全日精選按鈕
      const resetBtn = e.target.closest('.btn-timeline-reset');
      if (resetBtn) {
        const chapterId = resetBtn.dataset.chapterId;
        this.resetToChapterOverview(chapterId);
        return;
      }

      // 4. 展開全卷相簿按鈕
      const albumBtn = e.target.closest('.btn-open-full-album');
      if (albumBtn) {
        const chapterIdx = parseInt(albumBtn.dataset.chapterIdx, 10);
        this.openChapterFullAlbum(chapterIdx);
        return;
      }

      // 5. 拍立得底部前後頁箭頭導航按鈕
      const pageNavBtn = e.target.closest('.scrapbook-nav-arrow');
      if (pageNavBtn && !pageNavBtn.disabled) {
        const chapterId = pageNavBtn.dataset.chapterId;
        const dir = parseInt(pageNavBtn.dataset.dir, 10);
        const state = this.activeSpotState[chapterId];
        if (state) {
          this.switchSpotGallery(chapterId, state.spotIdx, state.page + dir);
        }
        return;
      }

      // 6. 拍立得或 Hero 大圖點擊打開燈箱 (支援該區塊所有相片前後切換瀏覽)
      const photoCard = e.target.closest('.hero-spread-card, .polaroid-item-wrap');
      if (photoCard) {
        if (this._isDraggingHappened) return;

        // 若在朱印抽屜內點擊
        if (photoCard.closest('.stamp-drawer-panel')) {
          const photoId = photoCard.dataset.photoId;
          const stampedItems = this.getStampedPhotosList();
          const sIdx = stampedItems.findIndex(it => it.id === photoId);
          this.openLightboxGallery(stampedItems, Math.max(0, sIdx));
          return;
        }

        const panel = photoCard.closest('.emaki-chapter-panel');
        if (!panel) {
          const fullUrl = photoCard.dataset.full;
          const caption = photoCard.dataset.caption;
          if (fullUrl) this.openLightboxSingle(fullUrl, caption);
          return;
        }

        const chapterId = panel.id;
        const ch = this.chapters.find(c => c.chapterId === chapterId);
        if (!ch) return;

        const isHero = photoCard.classList.contains('hero-spread-card');
        const photoId = photoCard.dataset.photoId;
        const fullUrl = photoCard.dataset.full;
        const isSpotActive = this.activeSpotState[chapterId] !== undefined;

        let galleryList = [];
        if (isSpotActive) {
          const spot = ch.spots[this.activeSpotState[chapterId].spotIdx];
          if (spot && spot.photos && spot.photos.length > 0) {
            galleryList = spot.photos.map(p => {
              const isVid = Boolean((p.path && p.path.toLowerCase().endsWith('.mp4')) || p.isVideo);
              return {
                id: p.id,
                path: isVid ? encodeURI(p.path) : encodeURI(p.path.replace(/^Photos\//, 'Photos_web/')),
                caption: p.caption,
                tag: p.tag || spot.name,
                note: spot.note || '',
                isVideo: isVid
              };
            });
            // 若 spot 有 heroPhoto 且未包含於 photos 中，加入首位
            if (spot.heroPhoto && !spot.photos.some(p => p.path === spot.heroPhoto.path)) {
              galleryList.unshift({
                id: 'spot_hero_' + spot.name,
                path: encodeURI(spot.heroPhoto.path.replace(/^Photos\//, 'Photos_web/')),
                caption: spot.heroPhoto.caption,
                tag: spot.heroPhoto.tag || spot.name,
                note: spot.note || '',
                isVideo: false
              });
            }
          }
        }

        // 若無景點相片清單 (全日精選模式)
        if (galleryList.length === 0) {
          const photoMap = new Map();
          if (ch.heroPhoto) {
            photoMap.set(ch.heroPhoto.path, {
              id: 'hero_' + ch.chapterId,
              path: encodeURI(ch.heroPhoto.path.replace(/^Photos\//, 'Photos_web/')),
              caption: ch.heroPhoto.caption,
              tag: ch.heroPhoto.tag || '名所特寫',
              note: ch.quote || '',
              isVideo: false
            });
          }
          ch.gallery.forEach(g => {
            if (!photoMap.has(g.path)) {
              const isVid = Boolean((g.path && g.path.toLowerCase().endsWith('.mp4')) || g.isVideo);
              photoMap.set(g.path, {
                id: g.id,
                path: isVid ? encodeURI(g.path) : encodeURI(g.path.replace(/^Photos\//, 'Photos_web/')),
                caption: g.caption,
                tag: g.tag || '',
                note: '',
                isVideo: isVid
              });
            }
          });
          galleryList = [...photoMap.values()];
        }

        // 計算點擊目標在清單中的索引
        let targetIndex = 0;
        if (isHero) {
          targetIndex = 0;
        } else if (photoId) {
          const foundIdx = galleryList.findIndex(it => it.id === photoId);
          if (foundIdx >= 0) {
            targetIndex = foundIdx;
          } else {
            const foundByPath = galleryList.findIndex(it => it.path === fullUrl || encodeURI(it.path) === fullUrl);
            if (foundByPath >= 0) targetIndex = foundByPath;
          }
        }

        this.openLightboxGallery(galleryList, targetIndex);
        return;
      }
    });
  }

  handleStampClick(btn) {
    const photoId = btn.dataset.photoId;
    const isStamped = this.stampedPhotos.has(photoId);

    if (isStamped) {
      this.stampedPhotos.delete(photoId);
      btn.classList.remove('stamped');
      btn.textContent = '栞';
    } else {
      this.stampedPhotos.add(photoId);
      btn.classList.add('stamped');
      btn.textContent = '印';
      this.triggerHapticFeedback();
      this.playStampChime();
    }

    localStorage.setItem('shiori_emaki_stamps', JSON.stringify([...this.stampedPhotos]));
    this.updateStampDisplay();
  }

  openChapterFullAlbum(chapterIdx) {
    const ch = this.chapters[chapterIdx];
    if (!ch) return;

    const photoMap = new Map();
    if (ch.heroPhoto) {
      photoMap.set(ch.heroPhoto.path, {
        path: encodeURI(ch.heroPhoto.path.replace(/^Photos\//, 'Photos_web/')),
        caption: ch.heroPhoto.caption,
        tag: ch.heroPhoto.tag || '名所特寫',
        note: ch.quote || '',
        isVideo: false
      });
    }
    ch.gallery.forEach(g => {
      if (!photoMap.has(g.path)) {
        const isVid = Boolean((g.path && g.path.toLowerCase().endsWith('.mp4')) || g.isVideo);
        photoMap.set(g.path, {
          path: isVid ? encodeURI(g.path) : encodeURI(g.path.replace(/^Photos\//, 'Photos_web/')),
          caption: g.caption,
          tag: g.tag || '',
          note: '',
          isVideo: isVid
        });
      }
    });
    ch.spots.forEach(s => {
      if (s.photos) {
        s.photos.forEach(p => {
          if (!photoMap.has(p.path)) {
            const isVid = Boolean((p.path && p.path.toLowerCase().endsWith('.mp4')) || p.isVideo);
            photoMap.set(p.path, {
              path: isVid ? encodeURI(p.path) : encodeURI(p.path.replace(/^Photos\//, 'Photos_web/')),
              caption: p.caption,
              tag: p.tag || s.name,
              note: s.note || '',
              isVideo: isVid
            });
          }
        });
      }
    });

    this.openLightboxGallery([...photoMap.values()], 0);
  }

  triggerHapticFeedback() {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      try { navigator.vibrate([20, 30, 15]); } catch {}
    }
  }

  updateStampDisplay() {
    if (this.stampCountBadge) {
      this.stampCountBadge.textContent = this.stampedPhotos.size;
    }
    this.renderStampDrawer();
  }

  getStampedPhotosList() {
    const list = [];
    this.chapters.forEach(ch => {
      ch.gallery.forEach(g => {
        if (this.stampedPhotos.has(g.id) && !list.some(it => it.id === g.id)) {
          const isVid = Boolean((g.path && g.path.toLowerCase().endsWith('.mp4')) || g.isVideo);
          list.push({
            id: g.id,
            path: isVid ? encodeURI(g.path) : encodeURI(g.path.replace(/^Photos\//, 'Photos_web/')),
            caption: g.caption,
            tag: g.tag || '',
            note: '',
            isVideo: isVid
          });
        }
      });
      ch.spots.forEach(s => {
        if (s.photos) {
          s.photos.forEach(p => {
            if (this.stampedPhotos.has(p.id) && !list.some(it => it.id === p.id)) {
              const isVid = Boolean((p.path && p.path.toLowerCase().endsWith('.mp4')) || p.isVideo);
              list.push({
                id: p.id,
                path: isVid ? encodeURI(p.path) : encodeURI(p.path.replace(/^Photos\//, 'Photos_web/')),
                caption: p.caption,
                tag: p.tag || s.name,
                note: s.note || '',
                isVideo: isVid
              });
            }
          });
        }
      });
    });
    return list;
  }

  renderStampDrawer() {
    if (!this.stampDrawerBody) return;
    if (this.stampedPhotos.size === 0) {
      this.stampDrawerBody.innerHTML = `
        <div style="grid-column: span 2; text-align:center; padding:3rem 1rem; color:var(--sumi-faint);">
          <div style="font-size:2.4rem; margin-bottom:0.75rem;">💮</div>
          <div style="font-family:var(--font-mincho); font-size:1rem; color:var(--sumi-deep);">暫無鈐印珍藏</div>
          <p style="font-size:0.78rem; margin-top:0.4rem;">在任何相片右下角點擊「栞」字印章，即可珍藏光影於此冊中。</p>
        </div>
      `;
      return;
    }

    const stampedItems = [];
    this.chapters.forEach(ch => {
      ch.gallery.forEach(g => {
        if (this.stampedPhotos.has(g.id)) stampedItems.push(g);
      });
      ch.spots.forEach(s => {
        if (s.photos) {
          s.photos.forEach(p => {
            if (this.stampedPhotos.has(p.id) && !stampedItems.some(it => it.id === p.id)) {
              stampedItems.push(p);
            }
          });
        }
      });
    });

    this.stampDrawerBody.innerHTML = stampedItems.map(item => 
      this.renderPolaroidCard(item, null, { showHanko: false })
    ).join('');

    this.stampDrawerBody.querySelectorAll('.polaroid-item-wrap').forEach((card, cIdx) => {
      card.addEventListener('click', () => {
        const fullList = this.getStampedPhotosList();
        this.openLightboxGallery(fullList, cIdx);
      });
    });
  }

  // =========================================================================
  // 4.5 景點深度聯動相冊 (同步即時渲染・徹底杜絕卡死)
  // =========================================================================
  switchSpotGallery(chapterId, spotIdx, page = 0) {
    const ch = this.chapters.find(c => c.chapterId === chapterId);
    if (!ch) return;
    const spot = ch.spots[spotIdx];
    if (!spot) return;

    const panel = document.getElementById(chapterId);
    if (!panel) return;

    // 1. 高亮時間軸項目
    panel.querySelectorAll('.timeline-mini-item').forEach((it, idx) => {
      it.classList.toggle('active-spot', idx === spotIdx);
    });
    const resetBtn = panel.querySelector('.btn-timeline-reset');
    if (resetBtn) resetBtn.style.display = 'inline-flex';

    // 2. 切換 Hero 大圖 (若景點有專屬 heroPhoto)
    if (spot.heroPhoto) {
      const heroCard = panel.querySelector('.hero-spread-card');
      const heroImg = panel.querySelector('.hero-spread-img');
      const heroCap = panel.querySelector('.hero-caption-text');
      const heroTag = panel.querySelector('.hero-badge-tag');
      if (heroCard && heroImg) {
        const heroUrl = encodeURI(spot.heroPhoto.path.replace(/^Photos\//, 'Photos_web/'));
        heroImg.src = heroUrl;
        heroCard.dataset.full = heroUrl;
        heroCard.dataset.caption = spot.heroPhoto.caption;
        if (heroCap) heroCap.textContent = spot.heroPhoto.caption;
        if (heroTag) heroTag.textContent = spot.heroPhoto.tag || spot.name;
      }
    }

    const headerBar = panel.querySelector(`#scrapbook-header-${chapterId}`);
    const spotTitle = panel.querySelector(`#spot-title-${chapterId}`);
    const spotCount = panel.querySelector(`#spot-count-${chapterId}`);
    const spotNote = panel.querySelector(`#spot-note-${chapterId}`);
    const grid = panel.querySelector(`#scrapbook-grid-${chapterId}`);
    const bottomNav = panel.querySelector(`#scrapbook-bottom-nav-${chapterId}`);
    const navIndicator = panel.querySelector(`#scrapbook-nav-indicator-${chapterId}`);
    const btnPrev = bottomNav ? bottomNav.querySelector('.btn-prev-page') : null;
    const btnNext = bottomNav ? bottomNav.querySelector('.btn-next-page') : null;

    if (!headerBar || !grid) return;

    // 隨行手記和紙便籤展示
    if (spotNote) {
      if (spot.note) {
        spotNote.style.display = 'block';
        spotNote.innerHTML = `<span class="spot-note-icon">✍️</span><span style="font-weight:600; color:var(--sumi-deep); margin-right:4px;">手記：</span>${spot.note}`;
      } else {
        spotNote.style.display = 'none';
        spotNote.innerHTML = '';
      }
    }

    // 處理無照片景點 (手記漫步)
    if (!spot.photos || spot.photos.length === 0) {
      headerBar.style.display = 'flex';
      if (spotTitle) spotTitle.innerHTML = `<span style="color:var(--shuin-red); margin-right:4px;">📍</span>${spot.name}`;
      if (spotCount) spotCount.innerHTML = `<span class="spot-text-pill">隨行漫步</span>`;
      if (bottomNav) bottomNav.style.display = 'none';

      grid.innerHTML = `
        <div class="empty-spot-card">
          <div style="font-size:2rem; margin-bottom:0.5rem;">🌸</div>
          <div style="font-family:var(--font-mincho); font-weight:700; font-size:0.95rem; color:var(--sumi-deep);">${spot.name}</div>
          <p style="font-size:0.75rem; color:var(--sumi-faint); margin-top:0.4rem; line-height:1.6;">${spot.note || '此處為隨行手記漫步行程，未留相片，以心記下此時風情。'}</p>
        </div>
      `;
      this.activeSpotState[chapterId] = { spotIdx, page: 0, totalPages: 1 };
      this.triggerHapticFeedback();
      return;
    }

    // 3. 有照片景點分頁處理 (每頁 6 張，2欄x3列)
    const pageSize = 6;
    const totalPages = Math.ceil(spot.photos.length / pageSize);
    page = Math.max(0, Math.min(page, totalPages - 1));
    this.activeSpotState[chapterId] = { spotIdx, page, totalPages };

    headerBar.style.display = 'flex';
    if (spotTitle) spotTitle.innerHTML = `<span style="color:var(--shuin-red); margin-right:4px;">📍</span>${spot.name}`;
    if (spotCount) spotCount.innerHTML = `<span class="spot-photo-count-pill">${spot.photos.length}幅全收錄</span>`;

    // 底部前後頁箭頭導航列更新
    if (bottomNav) {
      if (totalPages > 1) {
        bottomNav.style.display = 'flex';
        if (navIndicator) {
          navIndicator.textContent = `第 ${page + 1} / ${totalPages} 頁 (共 ${spot.photos.length} 幅)`;
        }
        if (btnPrev) btnPrev.disabled = (page === 0);
        if (btnNext) btnNext.disabled = (page === totalPages - 1);
      } else {
        bottomNav.style.display = 'none';
      }
    }

    // 即時同步渲染照片 (絕不用異步 setTimeout 延遲，杜絕競態衝突與卡在舊景點)
    const start = page * pageSize;
    const pagePhotos = spot.photos.slice(start, start + pageSize);

    grid.innerHTML = pagePhotos.map((item, pIdx) => 
      this.renderPolaroidCard(item, pIdx, { extraClass: 'ink-fade-in' })
    ).join('');

    this.triggerHapticFeedback();
  }

  resetToChapterOverview(chapterId) {
    const ch = this.chapters.find(c => c.chapterId === chapterId);
    if (!ch) return;
    const panel = document.getElementById(chapterId);
    if (!panel) return;

    // 1. 取消時間軸選取
    panel.querySelectorAll('.timeline-mini-item').forEach(it => it.classList.remove('active-spot'));
    const resetBtn = panel.querySelector('.btn-timeline-reset');
    if (resetBtn) resetBtn.style.display = 'none';

    // 2. 還原 Hero 大圖
    const heroCard = panel.querySelector('.hero-spread-card');
    const heroImg = panel.querySelector('.hero-spread-img');
    const heroCap = panel.querySelector('.hero-caption-text');
    const heroTag = panel.querySelector('.hero-badge-tag');
    if (heroCard && heroImg) {
      const heroUrl = encodeURI(ch.heroPhoto.path.replace(/^Photos\//, 'Photos_web/'));
      heroImg.src = heroUrl;
      heroCard.dataset.full = heroUrl;
      heroCard.dataset.caption = ch.heroPhoto.caption;
      if (heroCap) heroCap.textContent = ch.heroPhoto.caption;
      if (heroTag) heroTag.textContent = ch.heroPhoto.tag || '名所特寫';
    }

    // 3. 還原拍立得至全日精選
    const headerBar = panel.querySelector(`#scrapbook-header-${chapterId}`);
    const spotNote = panel.querySelector(`#spot-note-${chapterId}`);
    const bottomNav = panel.querySelector(`#scrapbook-bottom-nav-${chapterId}`);
    const grid = panel.querySelector(`#scrapbook-grid-${chapterId}`);
    if (headerBar) headerBar.style.display = 'none';
    if (spotNote) {
      spotNote.style.display = 'none';
      spotNote.innerHTML = '';
    }
    if (bottomNav) bottomNav.style.display = 'none';

    if (grid) {
      grid.innerHTML = ch.gallery.map((item, pIdx) => 
        this.renderPolaroidCard(item, pIdx, { extraClass: 'ink-fade-in' })
      ).join('');
    }

    delete this.activeSpotState[chapterId];
  }

  // =========================================================================
  // 5. 全螢幕宣紙水墨燈箱 (Sumi Lightbox)
  // =========================================================================
  openLightboxSingle(imgUrl, caption) {
    this.currentLightboxList = [{ path: imgUrl, caption: caption }];
    this.currentLightboxIndex = 0;
    this.showLightboxCurrent();
  }

  openLightboxGallery(list, startIndex) {
    this.currentLightboxList = list;
    this.currentLightboxIndex = startIndex || 0;
    this.showLightboxCurrent();
  }

  showLightboxCurrent() {
    if (!this.lightbox || !this.currentLightboxList.length) return;
    const item = this.currentLightboxList[this.currentLightboxIndex];
    const isVideo = item.path.toLowerCase().endsWith('.mp4') || item.isVideo;

    if (isVideo) {
      if (this.lightboxImg) this.lightboxImg.style.display = 'none';
      if (this.lightboxVideo) {
        this.lightboxVideo.style.display = 'block';
        // 確保視訊來源指向實際存放之 Photos/ 目錄而非 Photos_web/
        const videoSrc = item.path.replace(/^Photos_web\//, 'Photos/');
        this.lightboxVideo.src = videoSrc;
      }
    } else {
      if (this.lightboxVideo) {
        this.lightboxVideo.pause();
        this.lightboxVideo.style.display = 'none';
        this.lightboxVideo.src = '';
      }
      if (this.lightboxImg) {
        this.lightboxImg.style.display = 'block';
        this.lightboxImg.src = item.path;
      }
    }

    this.lightboxCaption.textContent = item.caption || '寫真漫覽';
    this.lightboxMeta.textContent = `${this.currentLightboxIndex + 1} / ${this.currentLightboxList.length}`;
    
    // Tag 角標展示
    const tagEl = document.getElementById('lightbox-tag');
    if (tagEl) {
      if (item.tag) {
        tagEl.style.display = 'inline-block';
        tagEl.textContent = item.tag;
      } else {
        tagEl.style.display = 'none';
        tagEl.textContent = '';
      }
    }

    // 地點/隨行手記 Note 展示
    const noteEl = document.getElementById('lightbox-note');
    if (noteEl) {
      if (item.note) {
        noteEl.style.display = 'block';
        noteEl.innerHTML = `<span style="color:var(--shuin-red); margin-right:4px;">✍️ 隨行手記：</span>${item.note}`;
      } else {
        noteEl.style.display = 'none';
        noteEl.innerHTML = '';
      }
    }

    // 隱藏/顯示上一張/下一張按鈕
    const hasNav = this.currentLightboxList.length > 1;
    this.lightboxPrevBtn.style.display = hasNav ? 'flex' : 'none';
    this.lightboxNextBtn.style.display = hasNav ? 'flex' : 'none';

    this.lightbox.classList.add('active');
  }

  closeLightbox() {
    if (this.lightbox) {
      this.lightbox.classList.remove('active');
    }
    if (this.lightboxVideo) {
      this.lightboxVideo.pause();
      this.lightboxVideo.src = '';
    }
  }

  prevLightbox() {
    if (this.currentLightboxList.length <= 1) return;
    if (this.lightboxVideo) {
      this.lightboxVideo.pause();
      this.lightboxVideo.src = '';
    }
    this.currentLightboxIndex = (this.currentLightboxIndex - 1 + this.currentLightboxList.length) % this.currentLightboxList.length;
    this.showLightboxCurrent();
  }

  nextLightbox() {
    if (this.currentLightboxList.length <= 1) return;
    if (this.lightboxVideo) {
      this.lightboxVideo.pause();
      this.lightboxVideo.src = '';
    }
    this.currentLightboxIndex = (this.currentLightboxIndex + 1) % this.currentLightboxList.length;
    this.showLightboxCurrent();
  }

  // =========================================================================
  // 6. 禪境風鈴/雅樂微音效 (Web Audio API 零依賴環境音)
  // =========================================================================
  toggleAmbientSound() {
    this.soundActive = !this.soundActive;
    if (this.soundToggleBtn) {
      this.soundToggleBtn.classList.toggle('active', this.soundActive);
      this.soundToggleBtn.innerHTML = this.soundActive ? '<span>🎐 靜音</span>' : '<span>🎐 雅樂</span>';
    }

    if (this.soundActive) {
      this.startAmbientChimes();
    } else {
      this.stopAmbientChimes();
    }
  }

  startAmbientChimes() {
    if (!this.audioCtx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.audioCtx = new AudioCtx();
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }

    // 日本傳統平調子音階 (Hirajoshi Scale: A3, B3, C4, E4, F4, A4)
    const scale = [220.0, 246.94, 261.63, 329.63, 349.23, 440.0, 523.25];

    this.ambientInterval = setInterval(() => {
      if (!this.soundActive || !this.audioCtx) return;
      const freq = scale[Math.floor(Math.random() * scale.length)];
      this.playZenTone(freq, 1.8);
    }, 3800);

    // 立即響起一聲微風清音
    this.playZenTone(440.0, 2.2);
  }

  stopAmbientChimes() {
    if (this.ambientInterval) {
      clearInterval(this.ambientInterval);
      this.ambientInterval = null;
    }
  }

  playZenTone(freq, duration) {
    if (!this.audioCtx) return;
    try {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);

      gain.gain.setValueAtTime(0.001, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.04, this.audioCtx.currentTime + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + duration);
    } catch {}
  }

  playStampChime() {
    if (!this.audioCtx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.audioCtx = new AudioCtx();
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    // 模擬印章落款清脆竹石之響 (E5 -> A5)
    this.playZenTone(659.25, 0.4);
    setTimeout(() => this.playZenTone(880.0, 0.6), 60);
  }

  // =========================================================================
  // 7. 事件監聽綁定
  // =========================================================================
  bindEvents() {
    // 視角切換按鈕
    this.viewButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        this.applyViewMode(btn.dataset.view);
      });
    });

    // 卷首「開卷覽勝」按鈕
    const enterBtn = document.getElementById('btn-cover-enter');
    if (enterBtn) {
      enterBtn.addEventListener('click', () => {
        const firstChapter = document.getElementById('vol-1');
        if (firstChapter) {
          firstChapter.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
        }
      });
    }

    // 軸棒里程碑圓點點擊快速巡航
    const milestoneDots = document.querySelectorAll('.milestone-dot');
    milestoneDots.forEach((dot, mIdx) => {
      dot.style.cursor = 'pointer';
      dot.addEventListener('click', () => {
        const targetId = mIdx === 0 ? 'vol-0' : `vol-${mIdx}`;
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
        }
      });
    });


    // 音效開關按鈕
    if (this.soundToggleBtn) {
      this.soundToggleBtn.addEventListener('click', () => this.toggleAmbientSound());
    }

    // 朱印抽屜開關
    if (this.stampDrawerBtn) {
      this.stampDrawerBtn.addEventListener('click', () => {
        this.stampDrawerPanel.classList.add('active');
      });
    }
    if (this.stampDrawerCloseBtn) {
      this.stampDrawerCloseBtn.addEventListener('click', () => {
        this.stampDrawerPanel.classList.remove('active');
      });
    }

    // 燈箱關閉與前後切換
    if (this.lightboxCloseBtn) {
      this.lightboxCloseBtn.addEventListener('click', () => this.closeLightbox());
    }
    if (this.lightboxPrevBtn) {
      this.lightboxPrevBtn.addEventListener('click', () => this.prevLightbox());
    }
    if (this.lightboxNextBtn) {
      this.lightboxNextBtn.addEventListener('click', () => this.nextLightbox());
    }

    // 鍵盤導航 (ESC 關閉、左/右鍵翻頁)
    window.addEventListener('keydown', (e) => {
      if (this.lightbox && this.lightbox.classList.contains('active')) {
        if (e.key === 'Escape') this.closeLightbox();
        if (e.key === 'ArrowLeft') this.prevLightbox();
        if (e.key === 'ArrowRight') this.nextLightbox();
      }
    });

    // 點擊燈箱背景關閉
    if (this.lightbox) {
      this.lightbox.addEventListener('click', (e) => {
        if (e.target === this.lightbox) {
          this.closeLightbox();
        }
      });
    }
  }
}

// 啟動應用
document.addEventListener('DOMContentLoaded', () => {
  window.emakiApp = new EmakiMagazineApp();
});
