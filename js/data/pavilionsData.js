/**
 * Central Portal Hub - Pavilions Metadata Definition
 * Strict Exhibition Sequence:
 * 1. exp  (Quantum Lab / Experiment)     - #a855f7 (Quantum Violet)
 * 2. osk  (Osaka Trip / Travelogue)      - #e11d48 (Torii Vermilion) / #f43f5e (Sakura Pink)
 * 3. show (Showcase / Bauhaus Gallery)   - #60a5fa (Architectural Ice Blue)
 * 4. tic  (Ticket Bot / Radar Intel)     - #f59e0b (Radar Amber / Orange)
 * 5. cyb  (Cyber-Routine / Habit Matrix) - #00ff9d (Cyber Neon Green)
 */

export const PAVILIONS_DATA = [
  {
    id: 'exp',
    title: 'Quantum Lab',
    nameZh: '量子實驗前哨',
    subtitle: 'Experimental AI & Algorithmic Playground',
    themeClass: 'theme-exp',
    themeColor: '#a855f7',
    secondaryColor: '#c084fc',
    ambientGlow: 'rgba(168, 85, 247, 0.42)',
    badge: '實驗性原型',
    status: 'ACTIVE EXPERIMENT',
    tags: ['NextGen AI', 'Canvas FX', 'WebGL', 'Algorithms'],
    description: '前瞻演算法探索與前沿互動體驗實驗室。收納次世代生成式原型、物理粒子系統以及極致的前端技術沙盒。',
    actionType: 'internal',
    launchUrl: './lab/',
    launchLabel: '探索實驗室',
    secondaryLaunchUrl: 'https://github.com/AeschyJ',
    secondaryLaunchLabel: '源碼倉庫',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 18h12"/><path d="M10 2v7.5L4.5 18A2 2 0 0 0 6.2 21h11.6a2 2 0 0 0 1.7-3L14 9.5V2"/><path d="M8.5 2h7"/><path d="M7 16h10"/></svg>`
  },
  {
    id: 'osk',
    title: 'Osaka Odyssey',
    nameZh: '關西極致旅誌',
    subtitle: 'Interactive Travel Magazine & Offline Guide',
    themeClass: 'theme-osaka',
    themeColor: '#e11d48',
    secondaryColor: '#f43f5e',
    ambientGlow: 'rgba(225, 29, 72, 0.42)',
    badge: '100% 離線 PWA',
    status: 'TRAVEL MAGAZINE',
    tags: ['Offline PWA', 'Travel Mag', 'Leaflet Map', 'Kyoto & Osaka'],
    description: '日系旅行雜誌風格離線導覽。融合沉浸式和風微光排版、即時離線地圖路線規劃與私房美食景點隨身筆記。',
    actionType: 'internal',
    launchUrl: './osaka/',
    launchLabel: '啟程大阪',
    secondaryLaunchUrl: './osaka/#map',
    secondaryLaunchLabel: '離線地圖',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16v16H4z"/><path d="M9 4v16"/><path d="M15 4v16"/><path d="M4 9h16"/><path d="M4 15h16"/><circle cx="12" cy="12" r="3"/></svg>`
  },
  {
    id: 'show',
    title: 'Modern Showcase',
    nameZh: '當代藏品藝廊',
    subtitle: 'Contemporary Digital Gallery & Blueprint Grid',
    themeClass: 'theme-showcase',
    themeColor: '#60a5fa',
    secondaryColor: '#38bdf8',
    ambientGlow: 'rgba(96, 165, 250, 0.42)',
    badge: 'React 19 + Vite',
    status: 'DESIGN GALLERY',
    tags: ['React 19', 'Bauhaus Grid', 'Glassmorphism', 'Curated Archive'],
    description: '融會包浩斯建築結構美學的當代數位藏品展館。具備雙層藍圖網格、3D 浮空晶透琉璃卡片與精密工藝細節。',
    actionType: 'internal',
    launchUrl: './showcase/',
    launchLabel: '鑑賞藏品',
    secondaryLaunchUrl: './showcase/#archive',
    secondaryLaunchLabel: '典藏名錄',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21 16-9 5-9-5V8l9-5 9 5v8Z"/><path d="m3.27 6.96 8.73 4.84 8.73-4.84"/><path d="M12 22.08V12"/></svg>`
  },
  {
    id: 'tic',
    title: 'Ticket Radar Bot',
    nameZh: '航管雷達票務獵手',
    subtitle: 'Air-Traffic Radar Intelligence & Automation',
    themeClass: 'theme-ticket',
    themeColor: '#f59e0b',
    secondaryColor: '#fbbf24',
    ambientGlow: 'rgba(245, 158, 11, 0.42)',
    badge: '智能巡航系統',
    status: 'RADAR SURVEILLANCE',
    tags: ['Realtime Radar', 'Automation Bot', 'High Concurrency', 'Alert Dispatcher'],
    description: '航管儀表等級全天候票務動態雷達。搭載即時行情掃描、席位空缺狙擊與智慧多管道警報推送機制。',
    actionType: 'internal',
    launchUrl: './ticket-bot/',
    launchLabel: '啟動雷達',
    secondaryLaunchUrl: './ticket-bot/#logs',
    secondaryLaunchLabel: '巡檢日誌',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 3a9 9 0 0 1 9 9"/><path d="m12 12 5-3"/><circle cx="12" cy="12" r="1"/></svg>`
  },
  {
    id: 'cyb',
    title: 'Cyber-Routine',
    nameZh: '賽博習慣矩陣',
    subtitle: 'Cyberpunk Geek Dashboard & Habit Matrix',
    themeClass: 'theme-cyber',
    themeColor: '#00ff9d',
    secondaryColor: '#05f0a0',
    ambientGlow: 'rgba(0, 255, 157, 0.42)',
    badge: '極客 HUD 矩陣',
    status: 'MATRIX RUNNING',
    tags: ['Cyberpunk', 'Habit Matrix', 'Geek Terminal', 'Confetti Engine'],
    description: '賽博龐克極客風個人維度儀表板。具備終端指令式習慣流、螢光微光掃描線與全沉浸聲光回饋。',
    actionType: 'internal',
    launchUrl: './cyber-routine/',
    launchLabel: '登入矩陣',
    secondaryLaunchUrl: './cyber-routine/#matrix',
    secondaryLaunchLabel: '習慣數據',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>`
  }
];

export function getPavilionById(id) {
  return PAVILIONS_DATA.find(p => p.id === id) || null;
}
