/**
 * Local Storage Manager for Companion Personal Data & Persistence
 */

const STORAGE_KEYS = {
  CHECKED_NODES: 'TABISYNC_CHECKED_NODES',
  PACKING_LIST: 'TABISYNC_PACKING_LIST',
  USER_CURRENCY_RATE: 'TABISYNC_CURRENCY_RATE',
  CUSTOM_TRIP_DATA: 'TABISYNC_CUSTOM_TRIP_DATA',
  JOURNAL_DATA: 'TABISYNC_JOURNAL_DATA',
  ROOM_CONFIG: 'TABISYNC_ROOM_CONFIG',
  PEER_JOURNALS: 'TABISYNC_PEER_JOURNALS'
};

const DEFAULT_PACKING = [
  { id: 'p1', text: '護照 (效期 6 個月以上)', done: true },
  { id: 'p2', text: 'Visit Japan Web QR Code 截圖', done: true },
  { id: 'p3', text: '日本網卡 / eSIM 啟用說明', done: true },
  { id: 'p4', text: '日幣現金與雙幣信用卡', done: true },
  { id: 'p5', text: 'ICOCA / Suica 交通卡 (Apple Pay / 實體卡)', done: true },
  { id: 'p6', text: '行動電源與日本規格轉接頭/充電線', done: false },
  { id: 'p7', text: '好走健行鞋 / 替換襪', done: false },
  { id: 'p8', text: '個人常備藥品 (止痛、胃腸藥、過敏藥)', done: false },
  { id: 'p9', text: '輕量摺疊傘 / 雨具', done: false }
];

class StorageManager {
  // Visited / Checked Timeline Nodes
  getCheckedNodes() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CHECKED_NODES);
      if (!data) return [];
      const parsed = JSON.parse(data);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  toggleCheckedNode(nodeId) {
    const checked = this.getCheckedNodes();
    const index = checked.indexOf(nodeId);
    if (index > -1) {
      checked.splice(index, 1);
    } else {
      checked.push(nodeId);
    }
    try {
      localStorage.setItem(STORAGE_KEYS.CHECKED_NODES, JSON.stringify(checked));
    } catch (e) {
      console.warn('[StorageManager] Failed to save checked nodes:', e);
    }
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      try { navigator.vibrate(12); } catch {}
    }
    return checked.includes(nodeId);
  }

  // Packing List
  getPackingList() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PACKING_LIST);
      if (!data) return DEFAULT_PACKING;
      const parsed = JSON.parse(data);
      return Array.isArray(parsed) ? parsed : DEFAULT_PACKING;
    } catch {
      return DEFAULT_PACKING;
    }
  }

  savePackingList(list) {
    try {
      localStorage.setItem(STORAGE_KEYS.PACKING_LIST, JSON.stringify(list));
    } catch (e) {
      console.warn('[StorageManager] Failed to save packing list:', e);
    }
  }

  togglePackingItem(itemId) {
    const list = this.getPackingList();
    const item = list.find(i => i.id === itemId);
    if (item) {
      item.done = !item.done;
      this.savePackingList(list);
    }
    return list;
  }

  addPackingItem(text) {
    if (!text || !text.trim()) return this.getPackingList();
    const list = this.getPackingList();
    list.push({
      id: 'p_' + Date.now(),
      text: text.trim(),
      done: false
    });
    this.savePackingList(list);
    return list;
  }

  deletePackingItem(itemId) {
    let list = this.getPackingList();
    list = list.filter(i => i.id !== itemId);
    this.savePackingList(list);
    return list;
  }

  // Custom Trip Data Override
  getCustomTripData() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CUSTOM_TRIP_DATA);
      if (!data) return null;
      const parsed = JSON.parse(data);
      
      const latestVersion = (window.DEFAULT_TRIP_DATA && window.DEFAULT_TRIP_DATA.schemaVersion) || '3.8.0-authentic-photos';
      if (!parsed || parsed.schemaVersion !== latestVersion) {
        console.info('[StorageManager] Detected newer trip dataset version (' + latestVersion + '). Clearing stale localStorage cache.');
        localStorage.removeItem(STORAGE_KEYS.CUSTOM_TRIP_DATA);
        return null;
      }

      if (parsed && typeof parsed === 'object' && Array.isArray(parsed.days) && parsed.days.length > 0) {
        return parsed;
      }
      console.warn('[StorageManager] Custom trip data in localStorage is invalid. Falling back to default.');
      localStorage.removeItem(STORAGE_KEYS.CUSTOM_TRIP_DATA);
      return null;
    } catch (e) {
      console.warn('[StorageManager] Failed to read custom trip data:', e);
      return null;
    }
  }

  saveCustomTripData(data) {
    try {
      localStorage.setItem(STORAGE_KEYS.CUSTOM_TRIP_DATA, JSON.stringify(data));
    } catch (e) {
      console.warn('[StorageManager] Failed to save custom trip data:', e);
    }
  }

  clearCustomTripData() {
    try {
      localStorage.removeItem(STORAGE_KEYS.CUSTOM_TRIP_DATA);
    } catch (e) {
      console.warn('[StorageManager] Failed to clear custom trip data:', e);
    }
  }

  /**
   * 🍃 拂塵歸初：徹底清空本機所有自訂行程、時間微調、隨行手記、栞室設定與同行快取，重歸原初 11 日手帖
   */
  resetToOriginal() {
    try {
      localStorage.removeItem(STORAGE_KEYS.CUSTOM_TRIP_DATA);
      localStorage.removeItem(STORAGE_KEYS.JOURNAL_DATA);
      localStorage.removeItem(STORAGE_KEYS.CHECKED_NODES);
      localStorage.removeItem(STORAGE_KEYS.PEER_JOURNALS);
      localStorage.removeItem(STORAGE_KEYS.ROOM_CONFIG);
      // 重新初始化乾淨的預設手記資料
      this.initDefaultJournalData();
      return true;
    } catch (e) {
      console.warn('[StorageManager] Failed to reset data to original:', e);
      return false;
    }
  }

  // =========================================================================
  // 📖 行旅手記 (Travel Journal & Planner) 持久化與管理
  // =========================================================================

  /**
   * 取得手記資料（若無則自動從官方行程 DEFAULT_TRIP_DATA 初始化帶入）
   */
  getJournalData() {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.JOURNAL_DATA);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && Array.isArray(parsed.days) && parsed.days.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('[StorageManager] Failed to read journal data:', e);
    }
    return this.initDefaultJournalData();
  }

  /**
   * 從 DEFAULT_TRIP_DATA 生成 11 天預設行程手記骨架
   */
  initDefaultJournalData() {
    const defaultData = window.DEFAULT_TRIP_DATA || { days: [] };
    const journalDays = (defaultData.days || []).map((day, idx) => {
      const scheduledSpots = (day.spots || []).filter(s => s.isScheduled !== false);
      const items = scheduledSpots.map((spot, sIdx) => ({
        id: spot.id || `d${idx + 1}_spot${sIdx + 1}`,
        name: spot.name || '未命名行程',
        nameJp: spot.nameJp || '',
        time: spot.time || '',
        category: spot.category || 'attraction',
        tag: spot.tag || '',
        img: spot.img || '',
        rating: 0,
        tags: [],
        note: '',
        isCustom: false
      }));

      return {
        dayIndex: day.dayIndex || (idx + 1),
        date: day.date || '',
        dayOfWeek: day.dayOfWeek || '',
        location: day.location || '',
        theme: day.theme || '',
        items: items,
        summary: {
          pace: '剛剛好',
          mvp: '',
          trap: '',
          journal: ''
        },
        updatedAt: Date.now()
      };
    });

    const newJournal = {
      version: '1.0.0',
      createdAt: Date.now(),
      updatedAt: Date.now(),
      days: journalDays
    };

    this.saveJournalData(newJournal);
    return newJournal;
  }

  saveJournalData(data) {
    try {
      data.updatedAt = Date.now();
      localStorage.setItem(STORAGE_KEYS.JOURNAL_DATA, JSON.stringify(data));
    } catch (e) {
      console.warn('[StorageManager] Failed to save journal data:', e);
    }
  }

  saveJournalDay(dayIndex, dayData) {
    const journal = this.getJournalData();
    const targetIdx = journal.days.findIndex(d => d.dayIndex === dayIndex);
    if (targetIdx > -1) {
      journal.days[targetIdx] = { ...journal.days[targetIdx], ...dayData, updatedAt: Date.now() };
    } else {
      journal.days.push({ ...dayData, dayIndex, updatedAt: Date.now() });
    }
    this.saveJournalData(journal);
    return journal;
  }

  // =========================================================================
  // 🗝️ Room Code 私密房間與旅伴共筆同步
  // =========================================================================

  getRoomConfig() {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.ROOM_CONFIG);
      if (raw) return JSON.parse(raw);
    } catch {}
    return { nickname: '', roomCode: 'osaka2026' };
  }

  saveRoomConfig(config) {
    try {
      localStorage.setItem(STORAGE_KEYS.ROOM_CONFIG, JSON.stringify(config));
    } catch (e) {
      console.warn('[StorageManager] Failed to save room config:', e);
    }
  }

  getPeerJournals() {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.PEER_JOURNALS);
      if (raw) return JSON.parse(raw);
    } catch {}
    return {};
  }

  savePeerJournals(peers) {
    try {
      localStorage.setItem(STORAGE_KEYS.PEER_JOURNALS, JSON.stringify(peers));
    } catch (e) {
      console.warn('[StorageManager] Failed to save peer journals:', e);
    }
  }

  /**
   * 智慧同步：雙重備援（優先打 /api/sync，失敗或非 Vercel 環境走 KVDB 公開通道）
   */
  async syncRoomJournals(roomCode, nickname, myJournalData) {
    if (!roomCode || !nickname) {
      throw new Error('請輸入旅伴暱稱與旅程房間暗號！');
    }

    const cleanRoom = roomCode.trim().toLowerCase();
    const cleanNick = nickname.trim();
    const payload = {
      room: cleanRoom,
      user: cleanNick,
      data: myJournalData,
      timestamp: Date.now()
    };

    // 1. 優先嘗試自有 Vercel API
    try {
      const res = await fetch('/api/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        const json = await res.json();
        if (json && json.roomData) {
          this.savePeerJournals(json.roomData);
          return { success: true, source: 'vercel', roomData: json.roomData };
        }
      }
    } catch (err) {
      console.info('[StorageManager] Local/Edge Vercel API fallback to KV channel:', err);
    }

    // 2. 備援：輕量公開 Key-Value 通道 (kvdb.io / free relay)
    try {
      const roomKey = 'tabi_room_' + cleanRoom.replace(/[^a-z0-9_-]/gi, '');
      const relayUrl = `https://kvdb.io/4y9h5G6m8yQz5t5Y9R7B4/${roomKey}`;

      // 先抓取目前所有旅伴資料
      let currentRoomData = {};
      try {
        const getRes = await fetch(relayUrl);
        if (getRes.ok) {
          const text = await getRes.text();
          if (text) currentRoomData = JSON.parse(text);
        }
      } catch {}

      // 合併自己的資料
      currentRoomData[cleanNick] = {
        updatedAt: Date.now(),
        days: myJournalData.days || []
      };

      // 寫入回傳
      await fetch(relayUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentRoomData)
      });

      this.savePeerJournals(currentRoomData);
      return { success: true, source: 'cloud-relay', roomData: currentRoomData };
    } catch (fallbackErr) {
      console.warn('[StorageManager] Sync error:', fallbackErr);
      throw new Error('雲端連線失敗，請檢查網路連線或稍後再試！');
    }
  }

  // =========================================================================
  // 📥 匯出工具 (Markdown & CSV)
  // =========================================================================

  exportJournalsToMarkdown() {
    const journal = this.getJournalData();
    const config = this.getRoomConfig();
    const peers = this.getPeerJournals();

    let md = `# ⛩️ 旅の栞・行旅手記全紀錄 (${config.nickname || '個人旅行手帖'})\n\n`;
    md += `> 📅 巡行日程：2026/08/19 ~ 08/29 (11 天 10 夜)\n`;
    md += `> 🗝️ 旅程房間碼：${config.roomCode || '無'}\n`;
    md += `> 🕒 匯出時間：${new Date().toLocaleString('zh-TW')}\n\n---\n\n`;

    const KANJI_DAYS = ['第一日', '第二日', '第三日', '第四日', '第五日', '第六日', '第七日', '第八日', '第九日', '第十日', '第十一日', '第十二日', '第十三日', '第十四日', '第十五日', '第十六日', '第十七日', '第十八日', '第十九日', '第二十日'];

    (journal.days || []).forEach(day => {
      const dayTitle = KANJI_DAYS[day.dayIndex - 1] || `第${day.dayIndex}日`;
      md += `## 📍 ${dayTitle} (${day.date} ${day.dayOfWeek}) - ${day.location}：${day.theme}\n\n`;
      
      md += `### ⏱️ 今日走訪行程與評鑑：\n`;
      if (!day.items || day.items.length === 0) {
        md += `* （本日尚未排定地點）\n`;
      } else {
        day.items.forEach((item, idx) => {
          const stars = item.rating > 0 ? '⭐'.repeat(item.rating) : '未評分';
          const tags = item.tags && item.tags.length > 0 ? ` [${item.tags.join(' ')}]` : '';
          const note = item.note ? `\n  - 💭 心得筆記：${item.note}` : '';
          md += `${idx + 1}. **${item.name}** (${item.time || '未定時'}) - 評分：${stars}${tags}${note}\n`;
        });
      }

      if (day.summary) {
        md += `\n### 🏆 今日結算：\n`;
        md += `- **今日節奏**：${day.summary.pace || '剛剛好'}\n`;
        if (day.summary.mvp) md += `- **今日 MVP**：${day.summary.mvp}\n`;
        if (day.summary.trap) md += `- **避坑備忘**：${day.summary.trap}\n`;
        if (day.summary.journal) md += `- **心情手札**：${day.summary.journal}\n`;
      }

      md += `\n---\n\n`;
    });

    return md;
  }

  exportJournalsToCSV() {
    const journal = this.getJournalData();
    const config = this.getRoomConfig();
    const author = config.nickname || '旅人';

    let csv = '\uFEFF'; // UTF-8 BOM for Excel Chinese support
    csv += '天數,日期,地點,行程序號,名所名稱,時間,星級評分,標籤,心得筆記,今日節奏,今日MVP,避坑備忘,今日手札,作者\n';

    (journal.days || []).forEach(day => {
      const pace = `"${(day.summary?.pace || '').replace(/"/g, '""')}"`;
      const mvp = `"${(day.summary?.mvp || '').replace(/"/g, '""')}"`;
      const trap = `"${(day.summary?.trap || '').replace(/"/g, '""')}"`;
      const journalNote = `"${(day.summary?.journal || '').replace(/"/g, '""')}"`;

      if (!day.items || day.items.length === 0) {
        csv += `${day.dayIndex},${day.date},${day.location},1,"無行程","",0,"","","${pace}","${mvp}","${trap}","${journalNote}","${author}"\n`;
      } else {
        day.items.forEach((item, idx) => {
          const name = `"${(item.name || '').replace(/"/g, '""')}"`;
          const time = `"${(item.time || '').replace(/"/g, '""')}"`;
          const tags = `"${(item.tags || []).join(';').replace(/"/g, '""')}"`;
          const note = `"${(item.note || '').replace(/"/g, '""')}"`;
          csv += `${day.dayIndex},${day.date},${day.location},${idx + 1},${name},${time},${item.rating || 0},${tags},${note},${pace},${mvp},${trap},${journalNote},"${author}"\n`;
        });
      }
    });

    return csv;
  }
}

window.appStorage = new StorageManager();

