/**
 * Interactive Map Manager (Leaflet.js + CartoDB Voyager Style)
 * 採用精準數學對齊之 SVG 向量地標 Pin，確保 100% 垂直端正無偏斜、彈窗完整呈現不裁切
 */

class TripMapManager {
  constructor(containerId, options = {}) {
    this.containerId = containerId;
    this.map = null;
    this.markersGroup = null;
    this.markersMap = new Map(); // id -> L.marker
    this.onSpotSelectCallback = options.onSpotSelect || null;
    this.activeSpotId = null;
    this.isMobile = window.innerWidth <= 960;

    if (typeof window !== 'undefined' && window.addEventListener) {
      window.addEventListener('resize', () => {
        this.isMobile = window.innerWidth <= 960;
        if (this.map) {
          setTimeout(() => this.map.invalidateSize(), 200);
        }
      });
    }
  }

  init(center = [35.1709, 136.9085], zoom = 14) {
    if (this.map) return;

    const mapContainer = document.getElementById(this.containerId);
    if (!mapContainer) return;

    // 🛡️ Defense: Guard against missing or failed Leaflet library (e.g. offline/weak mobile signal)
    if (typeof L === 'undefined') {
      console.warn('[TripMapManager] Leaflet library not detected. Showing graceful offline map placeholder.');
      mapContainer.innerHTML = `
        <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:100%; color:var(--text-tertiary); padding:2rem; text-align:center;">
          <span style="font-size:2.8rem; margin-bottom:0.75rem; filter:drop-shadow(0 2px 8px rgba(0,0,0,0.1));">🗺️</span>
          <h4 style="font-size:1.05rem; font-weight:700; color:var(--text-primary); margin-bottom:0.35rem;">互動地圖載入中或離線模式</h4>
          <p style="font-size:0.82rem; max-width:280px; line-height:1.45;">排定行腳、名所指南、情境發音與隨身道具皆可正常使用。</p>
        </div>
      `;
      return;
    }

    try {
      // Leaflet map initialization
      this.map = L.map(this.containerId, {
        center: center,
        zoom: zoom,
        zoomControl: false, // 關閉預設左上角縮放鈕，避免與圖例重疊
        attributionControl: false
      });

      // 將縮放控制項放置於右下角（符合現代地圖操作體驗）
      L.control.zoom({ position: 'bottomright' }).addTo(this.map);

      // CartoDB Voyager tile layer (High-legibility Japanese cartography)
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
        subdomains: 'abcd'
      }).addTo(this.map);

      this.markersGroup = L.featureGroup().addTo(this.map);
    } catch (err) {
      console.warn('[TripMapManager] Error during Leaflet map initialization:', err);
    }
  }

  renderDaySpots(spots = [], defaultCenter = null, defaultZoom = 13) {
    if (!this.map) {
      // Try init if Leaflet loaded late
      if (typeof L !== 'undefined') {
        this.init(defaultCenter || [35.1709, 136.9085], defaultZoom);
      }
      if (!this.map) return;
    }

    try {
      this.markersGroup.clearLayers();
      this.markersMap.clear();

    const bounds = [];

    spots.forEach((spot, idx) => {
      if (!spot.coords || spot.coords.length < 2) return;

      const [lat, lng] = spot.coords;
      bounds.push([lat, lng]);

      // Create Perfectly Aligned SVG Pin Icon
      const icon = this.createSvgPinIcon(spot, idx + 1);

      const marker = L.marker([lat, lng], {
        icon: icon,
        title: spot.name,
        riseOnHover: true
      });

      // Bind Google Maps style popup card with proper offset to prevent truncation
      const popupHtml = this.createPopupHtml(spot);
      let popupOffset = [0, -36];
      if (spot.isScheduled) {
        popupOffset = [0, -46];
      } else if (spot.category === 'hotel' || spot.isHotelBase) {
        popupOffset = [0, -44];
      } else if (spot.category === 'dining') {
        popupOffset = [0, -40];
      }
      
      marker.bindPopup(popupHtml, {
        className: 'custom-map-infowindow',
        offset: popupOffset,
        closeButton: true,
        autoPan: true,
        autoPanPadding: [45, 45],
        maxWidth: 275,
        minWidth: 260
      });

      // Marker click handler
      marker.on('click', () => {
        this.selectSpot(spot.id, false);
      });

      marker.addTo(this.markersGroup);
      this.markersMap.set(spot.id, marker);
    });

    // Auto-fit bounds or center
    if (bounds.length > 0) {
      this.map.fitBounds(bounds, {
        padding: [50, 50],
        maxZoom: 16,
        animate: true
      });
    } else if (defaultCenter) {
      this.map.setView(defaultCenter, defaultZoom);
    }
  } catch (err) {
    console.warn('[TripMapManager] Error rendering day spots on map:', err);
  }
}

  createSvgPinIcon(spot, fallbackOrder) {
    const isScheduled = spot.isScheduled;
    const orderNum = spot.order || fallbackOrder;

    // 六大地域淡雅莫蘭迪和色體系
    const REGION_PINS = {
      nagoya: '#BA8B32',   // 山吹茶金
      inuyama: '#40705B',  // 青磁竹翠
      osaka: '#A94452',    // 浪花茜紅
      hyogo: '#3B5B7E',    // 勝色紺青
      nara: '#5E6F40',     // 青丹若草
      kyoto: '#6D4C7C'     // 京紫藤
    };

    const regionalPrimaryColor = REGION_PINS[spot.region] || '#A94452';

    if (isScheduled) {
      // 🔴 朱印落款方章（排定景點 Scheduled）
      const svgHtml = `
        <div class="svg-pin-wrapper scheduled-shuin-wrapper">
          <svg width="36" height="46" viewBox="0 0 36 46" fill="none" xmlns="http://www.w3.org/2000/svg" class="map-svg-pin shuin-hanko-pin">
            <path d="M4 2 H32 C33.1 2 34 2.9 34 4 V30 C34 31.1 33.1 32 32 32 H22 L18 44 L14 32 H4 C2.9 32 2 31.1 2 30 V4 C2 2.9 2.9 2 4 2 Z" 
                  fill="${regionalPrimaryColor}" 
                  stroke="#FFFFFF" 
                  stroke-width="2.5" 
                  stroke-linejoin="round" />
            <rect x="5.5" y="5.5" width="25" height="23" rx="2" fill="none" stroke="#FFFFFF" stroke-width="1.2" stroke-opacity="0.85" />
            <text x="18" y="19" 
                  font-size="13" 
                  font-weight="900" 
                  text-anchor="middle" 
                  dominant-baseline="central" 
                  fill="#FFFFFF" 
                  font-family="'Shippori Mincho', 'Noto Serif TC', serif">${orderNum}</text>
          </svg>
          <div class="pin-base-pulse" style="background:${regionalPrimaryColor};"></div>
        </div>
      `;
      return L.divIcon({
        className: 'map-pin-marker-container map-shuin-container',
        html: svgHtml,
        iconSize: [36, 46],
        iconAnchor: [18, 46]
      });
    } else if (spot.category === 'hotel' || spot.isHotelBase) {
      // 🏨 深紺宿印（住宿基地 Hotel Base）
      const hotelNavy = '#1E3A8A';
      const svgHtml = `
        <div class="svg-pin-wrapper hotel-shinkan-wrapper">
          <svg width="34" height="44" viewBox="0 0 34 44" fill="none" xmlns="http://www.w3.org/2000/svg" class="map-svg-pin shinkan-hotel-pin">
            <path d="M17 2 L32 12 V30 C32 31.1 31.1 32 30 32 H21 L17 42 L13 32 H4 C2.9 32 2 31.1 2 30 V12 L17 2 Z" 
                  fill="${hotelNavy}" 
                  stroke="#FFFFFF" 
                  stroke-width="2.5" 
                  stroke-linejoin="round" />
            <path d="M17 6 L28 13.5 V28 H6 V13.5 L17 6 Z" 
                  fill="none" 
                  stroke="#FCD34D" 
                  stroke-width="1.2" />
            <text x="17" y="21" font-size="12" text-anchor="middle" dominant-baseline="central">🏨</text>
          </svg>
        </div>
      `;
      return L.divIcon({
        className: 'map-pin-marker-container map-hotel-container',
        html: svgHtml,
        iconSize: [34, 44],
        iconAnchor: [17, 44]
      });
    } else if (spot.category === 'dining') {
      // 🥢 金茶木札（美食名店 Dining）
      const gourmetGold = '#D97706';
      const svgHtml = `
        <div class="svg-pin-wrapper gourmet-mokufuda-wrapper">
          <svg width="30" height="40" viewBox="0 0 30 40" fill="none" xmlns="http://www.w3.org/2000/svg" class="map-svg-pin mokufuda-pin">
            <path d="M6 2 H24 L28 6 V26 C28 27.1 27.1 28 26 28 H19 L15 38 L11 28 H4 C2.9 28 2 27.1 2 26 V6 L6 2 Z" 
                  fill="${gourmetGold}" 
                  stroke="#FFFFFF" 
                  stroke-width="2.5" 
                  stroke-linejoin="round" />
            <circle cx="15" cy="7" r="1.8" fill="#FFFFFF" />
            <circle cx="15" cy="18" r="7.5" fill="#FFFFFF" fill-opacity="0.92" />
            <text x="15" y="19" font-size="10.5" text-anchor="middle" dominant-baseline="central">🥢</text>
          </svg>
        </div>
      `;
      return L.divIcon({
        className: 'map-pin-marker-container map-gourmet-container',
        html: svgHtml,
        iconSize: [30, 40],
        iconAnchor: [15, 40]
      });
    } else {
      // 🌿 青丹草箋（備選私房探索 Optional）
      const optionalTone = '#5E6F40';
      const svgHtml = `
        <div class="svg-pin-wrapper optional-washi-wrapper">
          <svg width="28" height="36" viewBox="0 0 28 36" fill="none" xmlns="http://www.w3.org/2000/svg" class="map-svg-pin washi-tag-pin">
            <path d="M4 2 H24 C25.1 2 26 2.9 26 4 V22 C26 23.1 25.1 24 24 24 H18 L14 34 L10 24 H4 C2.9 24 2 23.1 2 22 V4 C2 2.9 2.9 2 4 2 Z" 
                  fill="${optionalTone}" 
                  stroke="#FFFFFF" 
                  stroke-width="2.5" 
                  stroke-linejoin="round" 
                  fill-opacity="0.92" />
            <circle cx="14" cy="13" r="6.5" fill="#FFFFFF" />
            <text x="14" y="14" font-size="9" text-anchor="middle" dominant-baseline="central">🌿</text>
          </svg>
        </div>
      `;
      return L.divIcon({
        className: 'map-pin-marker-container map-optional-container',
        html: svgHtml,
        iconSize: [28, 36],
        iconAnchor: [14, 36]
      });
    }
  }

  createPopupHtml(spot) {
    const REGION_PINS = {
      nagoya: '#BA8B32',
      inuyama: '#40705B',
      osaka: '#A94452',
      hyogo: '#3B5B7E',
      nara: '#5E6F40',
      kyoto: '#6D4C7C'
    };
    const regionalColor = REGION_PINS[spot.region] || '#A94452';
    const tagColor = spot.isScheduled ? regionalColor : (spot.category === 'hotel' ? '#1E3A8A' : (spot.category === 'dining' ? '#D97706' : '#64748B'));
    const imgUrl = spot.img || spot.image || 'assets/images/hero.jpg';

    return `
      <div class="map-popup-card">
        <img src="${imgUrl}" class="map-popup-img" alt="${spot.name}" onerror="this.src='assets/images/hero.jpg'">
        <div class="map-popup-body">
          <div class="map-popup-tag-row">
            <span class="badge" style="font-size:0.7rem; background:${tagColor}; color:#fff; border-radius:0px;">
              ${spot.tag || (spot.isScheduled ? '排定行腳' : (spot.category === 'dining' ? '旬味名店' : '私房拾遺'))}
            </span>
            ${spot.score ? `<span style="font-size:0.72rem; font-weight:700; color:#B45309;">★ ${spot.score}</span>` : ''}
          </div>
          <h4 class="map-popup-title">${spot.name}</h4>
          ${spot.address ? `<p class="map-popup-address">📍 ${spot.address}</p>` : ''}
          <div class="map-popup-actions">
            <button class="btn-popup-guide" data-popup-spot-id="${spot.id}" style="background:${tagColor}; color:#fff; border:none; padding:0.4rem 0.8rem; border-radius:0px; font-size:0.75rem; font-weight:700; cursor:pointer;">
              名所指南 ➔
            </button>
          </div>
        </div>
      </div>
    `;
  }

  selectSpot(spotId, panMap = true) {
    this.activeSpotId = spotId;
    
    try {
      const marker = this.markersMap.get(spotId);

      // Remove active styling from all markers
      document.querySelectorAll('.map-pin-marker-container').forEach(el => el.classList.remove('active-spot-pin'));

      if (marker) {
        const el = marker.getElement();
        if (el) el.classList.add('active-spot-pin');

        marker.openPopup();

        if (panMap && this.map) {
          this.map.flyTo(marker.getLatLng(), Math.max(this.map.getZoom(), 15), {
            animate: true,
            duration: 0.8
          });
        }
      }
    } catch (err) {
      console.warn('[TripMapManager] Error selecting spot on map:', err);
    }
  }

  invalidate() {
    try {
      if (this.map && typeof this.map.invalidateSize === 'function') {
        this.map.invalidateSize();
      }
    } catch (err) {
      console.warn('[TripMapManager] Error invalidating map size:', err);
    }
  }
}

window.TripMapManager = TripMapManager;
