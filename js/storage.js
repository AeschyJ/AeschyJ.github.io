/**
 * Portal Storage & State Management Engine
 * Isolated LocalStorage management with strict 'hub_' namespace.
 */

const STORAGE_KEYS = {
  RECENT: 'hub_recent_visited',
  PINNED: 'hub_pinned_pavilions',
  PREFS: 'hub_preferences',
  AUDIO_ENABLED: 'hub_audio_enabled',
  FX_ENABLED: 'hub_fx_enabled'
};

const DEFAULT_PREFS = {
  fxEnabled: true,
  audioEnabled: false
};

class PortalStorage {
  constructor() {
    this._listeners = new Set();
  }

  /**
   * Safe JSON parse with fallback
   */
  _safeParse(val, fallback) {
    if (val === null || val === undefined) return fallback;
    try {
      return JSON.parse(val);
    } catch {
      return fallback;
    }
  }

  /**
   * Emit custom change event across modules
   */
  _notify(changeType, payload) {
    const detail = { changeType, payload };
    window.dispatchEvent(new CustomEvent('hub:storage-updated', { detail }));
    this._listeners.forEach(fn => fn(detail));
  }

  /**
   * Subscribe to state updates
   */
  subscribe(fn) {
    this._listeners.add(fn);
    return () => this._listeners.delete(fn);
  }

  /**
   * Get ID of the most recently visited pavilion
   * @returns {string|null}
   */
  getRecent() {
    try {
      return localStorage.getItem(STORAGE_KEYS.RECENT) || null;
    } catch {
      return null;
    }
  }

  /**
   * Record a visited pavilion ID
   * @param {string} id 
   */
  setRecent(id) {
    if (!id || typeof id !== 'string') return;
    try {
      localStorage.setItem(STORAGE_KEYS.RECENT, id);
      this._notify('recent', { id });
    } catch (e) {
      console.warn('[PortalStorage] Failed to set recent pavilion', e);
    }
  }

  /**
   * Get array of pinned pavilion IDs
   * @returns {string[]}
   */
  getPinned() {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.PINNED);
      const parsed = this._safeParse(raw, []);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  /**
   * Check if a specific pavilion is pinned
   * @param {string} id 
   * @returns {boolean}
   */
  isPinned(id) {
    const list = this.getPinned();
    return list.includes(id);
  }

  /**
   * Toggle pin state for a pavilion
   * @param {string} id 
   * @returns {boolean} New pinned state
   */
  togglePin(id) {
    if (!id) return false;
    try {
      const list = this.getPinned();
      const idx = list.indexOf(id);
      let isNowPinned = false;

      if (idx >= 0) {
        list.splice(idx, 1);
        isNowPinned = false;
      } else {
        list.push(id);
        isNowPinned = true;
      }

      localStorage.setItem(STORAGE_KEYS.PINNED, JSON.stringify(list));
      this._notify('pinned', { id, isPinned: isNowPinned, pinnedList: list });
      return isNowPinned;
    } catch (e) {
      console.warn('[PortalStorage] Failed to toggle pin', e);
      return false;
    }
  }

  /**
   * Get user preferences (FX, Audio, etc.)
   * @returns {Object}
   */
  getPrefs() {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.PREFS);
      const parsed = this._safeParse(raw, DEFAULT_PREFS);
      return { ...DEFAULT_PREFS, ...parsed };
    } catch {
      return { ...DEFAULT_PREFS };
    }
  }

  /**
   * Update a specific preference key
   * @param {string} key 
   * @param {*} val 
   */
  setPrefs(key, val) {
    try {
      const current = this.getPrefs();
      current[key] = val;
      localStorage.setItem(STORAGE_KEYS.PREFS, JSON.stringify(current));

      // Synchronize standalone fast keys
      if (key === 'fxEnabled') {
        localStorage.setItem(STORAGE_KEYS.FX_ENABLED, String(val));
      } else if (key === 'audioEnabled') {
        localStorage.setItem(STORAGE_KEYS.AUDIO_ENABLED, String(val));
      }

      this._notify('prefs', { key, val, prefs: current });
    } catch (e) {
      console.warn('[PortalStorage] Failed to save prefs', e);
    }
  }
}

export const portalStorage = new PortalStorage();
