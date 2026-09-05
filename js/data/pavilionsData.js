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
    title: 'Recipe KGAT Lab',
    nameZh: '知識圖推薦研究室',
    subtitle: 'NTU Master Thesis • KGAT & Explainable AI',
    themeClass: 'theme-exp',
    themeColor: '#a855f7',
    secondaryColor: '#c084fc',
    ambientGlow: 'rgba(168, 85, 247, 0.42)',
    badge: '臺大碩士論文成果',
    status: 'RESEARCH PUBLISHED',
    tags: ['KGAT (GNN)', 'Food.com CKG', 'Faithful XAI', 'PyTorch Native', 'Ablation Study'],
    description: '應用知識圖注意力網路於 Food.com 食譜推薦之效能評估與可解釋性研究：實證多跳傳播相對基準模型 LightGCN 顯著增益 +31.6%，揭示淺層資訊污染與注意力路徑之部分忠實性。',
    actionType: 'modal',
    launchUrl: '#modal-exp-architecture',
    launchLabel: '論文核心架構',
    secondaryLaunchUrl: 'https://github.com/AeschyJ/Recipe-Recommendation-KGAT',
    secondaryLaunchLabel: 'GitHub 開源',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 18h12"/><path d="M10 2v7.5L4.5 18A2 2 0 0 0 6.2 21h11.6a2 2 0 0 0 1.7-3L14 9.5V2"/><path d="M8.5 2h7"/><path d="M7 16h10"/></svg>`
  },
  {
    id: 'osk',
    title: 'TabiSync & Emaki',
    nameZh: '夏之栞・行旅手帖',
    subtitle: 'Washi Paper & Sakura • Kansai Emaki Magazine',
    themeClass: 'theme-osaka',
    themeColor: '#F4A7B9',
    secondaryColor: '#FAF8F2',
    ambientGlow: 'rgba(244, 167, 185, 0.38)',
    badge: '和紙 100% 離線 PWA',
    status: 'SUMI-E JOURNAL',
    tags: ['Washi Paper', 'Sakura Pink', 'TabiSync', 'Emaki Magazine', 'Offline PWA'],
    description: '越前和紙生成色與薄櫻粉和風電子畫報。收錄名阪京奈盛夏漫遊手帖、305 幀高畫質實訪寫真、即時離線地圖與音效御朱印鈐印儀式。',
    actionType: 'internal',
    launchUrl: './osaka/',
    launchLabel: '啟程手帖',
    secondaryLaunchUrl: './osaka/magazine.html',
    secondaryLaunchLabel: '翻閱繪卷',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16v16H4z"/><path d="M9 4v16"/><path d="M15 4v16"/><path d="M4 9h16"/><path d="M4 15h16"/><circle cx="12" cy="12" r="3"/></svg>`
  },
  {
    id: 'show',
    title: 'MUSEUM',
    nameZh: '當代典藏藝廊',
    subtitle: 'Contemporary Wardrobe & Fragrance • Flowing Gold',
    themeClass: 'theme-showcase',
    themeColor: '#C5A059',
    secondaryColor: '#DFC48B',
    ambientGlow: 'rgba(197, 160, 89, 0.42)',
    badge: 'React 19 流金殿堂',
    status: 'FLOWING GOLD GALLERY',
    tags: ['Flowing Gold', 'Curated Museum', 'Blueprint Grid', 'Google Sheets Sync', 'PWA'],
    description: '黑曜晶石與香檳流金交織的當代私人典藏館。支援 Google 試算表雲端同步、雙層建築網格、三維流體光斑與香氛鞋履全方位鑑賞。',
    actionType: 'internal',
    launchUrl: './showcase/',
    launchLabel: '鑑賞藏品',
    secondaryLaunchUrl: './showcase/',
    secondaryLaunchLabel: '進入館區',
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
