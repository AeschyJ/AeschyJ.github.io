/**
 * Central Portal Hub - Pavilion Plugin Registry
 * Responsible for modular pavilion lifecycle management and slot mounting.
 * Individual pavilion aesthetics and components are delegated to specialized pavilion plugins.
 */

import { portalStorage } from '../storage.js';

class PavilionRegistry {
  constructor() {
    /** @type {Map<string, Object>} */
    this._plugins = new Map();
    /** @type {Map<string, HTMLElement>} */
    this._mountedSlots = new Map();
    /** @type {Array<Object>} */
    this._pavilionsData = [];
  }

  /**
   * Register a specialized pavilion implementation
   * @param {string} id - e.g. 'exp', 'osk', 'show', 'tic', 'cyb'
   * @param {Object} pluginInstance - Pavilion lifecycle hooks: { mount, unmount, onEnterViewport, onLeaveViewport }
   */
  registerPavilion(id, pluginInstance) {
    if (!id || !pluginInstance) {
      console.warn(`[PavilionRegistry] Invalid registration for id: ${id}`);
      return;
    }

    console.log(`[PavilionRegistry] Registered plugin for [${id}]`);
    this._plugins.set(id, pluginInstance);

    // If container slot already exists in DOM, mount immediately
    const slot = this._mountedSlots.get(id);
    const meta = this._pavilionsData.find(p => p.id === id);
    if (slot && meta && typeof pluginInstance.mount === 'function') {
      slot.innerHTML = '';
      pluginInstance.mount(slot, meta);
    }
  }

  /**
   * Retrieve registered plugin instance
   * @param {string} id 
   */
  getPavilion(id) {
    return this._plugins.get(id) || null;
  }

  /**
   * Mount pavilion slots inside pre-defined Deck Slides (100dvh Full-Bleed layout)
   * @param {Array<Object>} pavilionsData
   */
  mountDeckSlots(pavilionsData) {
    if (!Array.isArray(pavilionsData)) return;
    this._pavilionsData = pavilionsData;

    pavilionsData.forEach((data, index) => {
      const slot = document.getElementById(`slot-${data.id}`);
      if (!slot) return;

      this._mountedSlots.set(data.id, slot);

      const plugin = this._plugins.get(data.id);
      if (plugin && typeof plugin.mount === 'function') {
        slot.innerHTML = '';
        plugin.mount(slot, data);
      } else {
        this._renderDefaultSkeleton(slot, data, index + 1);
      }
    });
  }

  /**
   * Render pavilion container sections and mount slots (Legacy Fallback)
   * @param {HTMLElement} container - The wrapper element (#pavilions-container)
   * @param {Array<Object>} pavilionsData - Array of pavilion configurations
   */
  renderPavilions(container, pavilionsData) {
    if (!container || !Array.isArray(pavilionsData)) return;
    this._pavilionsData = pavilionsData;
    container.innerHTML = '';

    pavilionsData.forEach((data, index) => {
      // Create section shell strictly matching sequence & ids
      const section = document.createElement('section');
      section.id = `pavilion-${data.id}`;
      section.className = `pavilion-section ${data.themeClass}`;
      section.setAttribute('data-pavilion-id', data.id);
      section.setAttribute('data-theme-color', data.themeColor);
      section.setAttribute('data-secondary-color', data.secondaryColor);
      section.setAttribute('data-ambient-glow', data.ambientGlow);

      // Dedicated slot element for specialized plugins or default fallback
      const slot = document.createElement('div');
      slot.id = `slot-${data.id}`;
      slot.className = 'pavilion-slot';

      section.appendChild(slot);
      container.appendChild(section);

      this._mountedSlots.set(data.id, slot);

      // Check if specialized plugin was pre-registered
      const plugin = this._plugins.get(data.id);
      if (plugin && typeof plugin.mount === 'function') {
        plugin.mount(slot, data);
      } else {
        // Render universal fallback skeleton card until specialized agent mounts
        this._renderDefaultSkeleton(slot, data, index + 1);
      }
    });
  }

  /**
   * Default universal skeleton card (ensures beautiful fallback before specialized agents mount)
   * @private
   */
  _renderDefaultSkeleton(slot, data, orderNumber) {
    const isPinned = portalStorage.isPinned(data.id);
    const orderFormatted = String(orderNumber).padStart(2, '0');

    slot.innerHTML = `
      <div class="pavilion-default-card" style="--pavilion-accent: ${data.themeColor}; --pavilion-secondary: ${data.secondaryColor};">
        <div class="card-ambient-aura"></div>
        <div class="card-header-bar">
          <div class="card-identity">
            <span class="card-order-badge">NO. ${orderFormatted}</span>
            <span class="card-status-indicator"><span class="pulse-dot"></span>${data.status || 'ONLINE'}</span>
          </div>
          <div class="card-actions-top">
            <button class="pin-toggle-btn ${isPinned ? 'is-pinned' : ''}" data-pin-id="${data.id}" title="${isPinned ? '取消釘選' : '釘選至頂部'}">
              <svg class="pin-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="12" y1="17" x2="12" y2="22"></line>
                <path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6h1a1 1 0 0 0 0-2H8a1 1 0 0 0 0 2h1v4.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24Z"></path>
              </svg>
            </button>
          </div>
        </div>

        <div class="card-body">
          <div class="card-icon-halo">
            <div class="card-icon-svg">${data.icon || ''}</div>
          </div>
          <div class="card-title-group">
            <span class="card-sub-label">${data.subtitle}</span>
            <h2 class="card-main-title">${data.title} <span class="card-title-zh">${data.nameZh}</span></h2>
          </div>
          <p class="card-description">${data.description}</p>
          
          <div class="card-tags-list">
            ${(data.tags || []).map(tag => `<span class="tag-chip">${tag}</span>`).join('')}
          </div>
        </div>

        <div class="card-footer-actions">
          <a href="${data.launchUrl}" class="action-launch-btn primary-action" data-pavilion-id="${data.id}">
            <span>${data.launchLabel}</span>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
          ${data.secondaryLaunchUrl ? `
            <a href="${data.secondaryLaunchUrl}" class="action-launch-btn secondary-action" data-pavilion-id="${data.id}" target="_blank" rel="noopener noreferrer">
              <span>${data.secondaryLaunchLabel}</span>
            </a>
          ` : ''}
        </div>
      </div>
    `;

    // Bind card pin toggle
    const pinBtn = slot.querySelector('.pin-toggle-btn');
    if (pinBtn) {
      pinBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const nextState = portalStorage.togglePin(data.id);
        pinBtn.classList.toggle('is-pinned', nextState);
        pinBtn.setAttribute('title', nextState ? '取消釘選' : '釘選至頂部');
      });
    }

    // Bind launch clicks to record recent visits
    const launchBtns = slot.querySelectorAll('.action-launch-btn');
    launchBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        portalStorage.setRecent(data.id);
      });
    });
  }

  /**
   * Forward viewport lifecycle notifications to registered plugins
   */
  notifyEnter(id) {
    const plugin = this._plugins.get(id);
    const slot = this._mountedSlots.get(id);
    const meta = this._pavilionsData.find(p => p.id === id);
    if (plugin && typeof plugin.onEnterViewport === 'function' && slot && meta) {
      plugin.onEnterViewport(slot, meta);
    }
  }

  notifyLeave(id) {
    const plugin = this._plugins.get(id);
    const slot = this._mountedSlots.get(id);
    const meta = this._pavilionsData.find(p => p.id === id);
    if (plugin && typeof plugin.onLeaveViewport === 'function' && slot && meta) {
      plugin.onLeaveViewport(slot, meta);
    }
  }
}

export const pavilionRegistry = new PavilionRegistry();
