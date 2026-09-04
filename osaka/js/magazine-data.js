/**
 * 📜《夏之栞・名阪京奈行旅繪卷》專屬雜誌資料庫 (v4.9.0 全量寫真與完整手記典藏版)
 * Editorial Database for Sumi-e Emaki Magazine
 * 發行人：leo | 歲次：2026 丙午之夏 (08/19 - 08/27)
 * 總收錄：九卷全帙、305 幅實訪寫真、7 段職棒影音與手記 47 處完整景點行腳
 */

const MAGAZINE_METADATA = {
  title: "夏之栞・名阪京奈行旅繪卷",
  titleJp: "夏之栞・名阪京奈 行旅絵巻",
  subtitle: "NAGOYA・INUYAMA・OSAKA・KOSHIEN・NARA・KYOTO・SHIGA",
  issue: "VOL. 01 / 盛夏特刊",
  curator: "leo",
  dateRange: "2026.08.19 — 2026.08.27",
  stats: {
    days: 9,
    totalMedia: 312,
    prefectures: ["愛知", "岐阜", "大阪", "兵庫", "奈良", "京都", "滋賀"]
  },
  preface: "步履隨風，穿行於尾張古城、浪花水都、奈良青苔與千本鳥居之間；行腳千里，落款成卷。將盛夏九日之汗水、球場之喧囂、舌尖之炙香與古寺之鐘鳴，研墨化作永恆繪卷。"
};

const MAGAZINE_CHAPTERS = [
  {
    "chapterId": "vol-1",
    "volumeRoman": "VOLUME I",
    "volumeKanji": "卷之一",
    "themeTitle": "尾張初度・名物濃香與電視塔之夜",
    "themeTitleJp": "尾張初度・名古屋の熱気と塔の夜",
    "date": "2026-08-19",
    "dayOfWeek": "WED",
    "location": "愛知名古屋 (Nagoya)",
    "regionColor": "#A63D40",
    "pace": "🌿 恬適得宜",
    "quote": "夏風甫至尾張，熱氣蒸騰如炙。味仙那一匙紅油與肉燥是開卷的序曲，而當暮色四合，MIRAI TOWER 在綠洲21的水鏡上倒映出燦爛銀河。",
    "summaryText": "首日抵達名古屋，隨即投入榮町的熱鬧脈動。清晨自名古屋車站周遭散步展開，隨後於地下街漫步並在 EXCELSIOR 享用朝食咖啡；午前造訪 JR Gate，午間迎戰味仙辛辣濃郁的台灣拉麵；漫步大須觀音老街感受江戶遺風，向晚在矢場町品味滾燙味噌豬排。夜宿久屋大通公園，於電視塔與水之宇宙船交織的璀璨光影中，以世界之山將的胡椒手羽先為首日落款。",
    "heroPhoto": {
      "path": "Photos/久屋大通 電力塔 綠洲21/IMG_20260819_193013.jpg",
      "caption": "中部電力 MIRAI TOWER 暮色光雕與水之宇宙船",
      "tag": "尾張地標"
    },
    "gallery": [
      {
        "id": "v1_01",
        "path": "Photos/excelsior cafe/IMG_20260819_095257.jpg",
        "caption": "地下街 EXCELSIOR 晨光朝食咖啡",
        "tag": "朝食朝露"
      },
      {
        "id": "v1_02",
        "path": "Photos/味仙/IMG_20260819_132202.jpg",
        "caption": "味仙 台灣拉麵・生蛋黃與辛香肉燥香氣撲鼻",
        "tag": "名物元祖"
      },
      {
        "id": "v1_03",
        "path": "Photos/大須商店街/IMG_20260819_172146.jpg",
        "caption": "大須觀音 仁王門巨大紅燈籠與護法神尊",
        "tag": "寺院山門"
      },
      {
        "id": "v1_04",
        "path": "Photos/矢場ton/IMG_20260819_182624.jpg",
        "caption": "矢場とん 厚切炸豬排淋上秘傳味噌濃醬",
        "tag": "名物濃香"
      },
      {
        "id": "v1_05",
        "path": "Photos/久屋大通 電力塔 綠洲21/IMG_20260819_195738.jpg",
        "caption": "綠洲21 水之宇宙船水波倒映電視塔絕景",
        "tag": "幻彩地標"
      },
      {
        "id": "v1_06",
        "path": "Photos/世界的山將/IMG_20260819_214744.jpg",
        "caption": "幻の手羽先 剛起鍋酥脆胡椒炸雞翅盛盤",
        "tag": "宵夜微醺"
      }
    ],
    "spots": [
      {
        "name": "名古屋車站周遭散步",
        "time": "08:00 - 09:30",
        "rating": 4,
        "note": "清晨抵達名古屋，漫步於車站周遭街區與太閤通，感受尾張初度的晨光與清涼晨風",
        "photos": []
      },
      {
        "name": "地下街逛街及 EXCELSIOR",
        "time": "09:30 - 11:00",
        "rating": 4,
        "note": "名古屋車站地下街散策漫遊，於 EXCELSIOR CAFFÉ 享用晨光冰滴黑咖啡與酥烤三明治朝食",
        "heroPhoto": {
          "path": "Photos/excelsior cafe/IMG_20260819_095257.jpg",
          "caption": "地下街 EXCELSIOR 晨光朝食咖啡",
          "tag": "晨光朝食"
        },
        "photos": [
          {
            "id": "v1_spot2_01",
            "path": "Photos/excelsior cafe/IMG_20260819_095257.jpg",
            "caption": "冰滴黑咖啡佐酥烤三明治",
            "tag": "晨光朝食"
          },
          {
            "id": "v1_spot2_02",
            "path": "Photos/excelsior cafe/IMG_20260819_100056.jpg",
            "caption": "BLT三明治 芥末籽醬增添清香層次",
            "tag": "晨光朝食"
          }
        ]
      },
      {
        "name": "JR Gate Mall",
        "time": "11:00 - 12:30",
        "rating": 5,
        "note": "高聳連通車站之大型商城，落地玻璃窗望向名古屋市景，感受現代都市脈動，探訪日系生活雜貨與伴手禮",
        "photos": []
      },
      {
        "name": "台湾ラーメン 味仙",
        "time": "13:00 - 14:30",
        "rating": 5,
        "note": "名古屋靈魂辛香名物！紅油肉燥搭配韭菜蒜頭，爆汗過癮",
        "heroPhoto": {
          "path": "Photos/味仙/IMG_20260819_132202.jpg",
          "caption": "味仙 台灣拉麵・生蛋黃與辛香肉燥香氣撲鼻",
          "tag": "名物元祖"
        },
        "photos": [
          {
            "id": "v1_spot2_01",
            "path": "Photos/味仙/IMG_20260819_132202.jpg",
            "caption": "味仙 台灣拉麵・生蛋黃與辛香肉燥香氣撲鼻",
            "tag": "招牌拉麵"
          },
          {
            "id": "v1_spot2_02",
            "path": "Photos/味仙/IMG_20260819_132600.jpg",
            "caption": "台灣炒飯，口味相當道地",
            "tag": "老牌人氣"
          }
        ]
      },
      {
        "name": "大須観音＆商店街",
        "time": "15:50 - 17:00",
        "rating": 3,
        "note": "大須觀音仁王門參拜，長達數公里的萬象商店街散策",
        "heroPhoto": {
          "path": "Photos/大須商店街/IMG_20260819_172146.jpg",
          "caption": "大須觀音 仁王門巨大紅燈籠",
          "tag": "寺院山門"
        },
        "photos": [
          {
            "id": "v1_spot3_01",
            "path": "Photos/大須商店街/IMG_20260819_161006.jpg",
            "caption": "大須觀音通り 拱廊老街散策",
            "tag": "老街散步"
          },
          {
            "id": "v1_spot3_02",
            "path": "Photos/大須商店街/IMG_20260819_170328.jpg",
            "caption": "鳴門鯛魚燒",
            "tag": "街頭小吃"
          },
          {
            "id": "v1_spot3_03",
            "path": "Photos/大須商店街/IMG_20260819_170527.jpg",
            "caption": "現做鯛魚燒 流心卡士達內餡，燙口美味",
            "tag": "現做小點"
          },
          {
            "id": "v1_spot3_04",
            "path": "Photos/大須商店街/IMG_20260819_172146.jpg",
            "caption": "大須觀音 仁王門巨大紅燈籠",
            "tag": "寺院山門"
          }
        ]
      },
      {
        "name": "矢場とん (矢場町本店)",
        "time": "18:00 - 19:00",
        "rating": 2,
        "note": "相撲豬地標！桌邊淋上滾燙赤味噌醬汁，香濃酥脆",
        "heroPhoto": {
          "path": "Photos/矢場ton/IMG_20260819_182624.jpg",
          "caption": "矢場とん 厚切炸豬排淋上秘傳味噌濃醬",
          "tag": "名物濃香"
        },
        "photos": [
          {
            "id": "v1_spot4_01",
            "path": "Photos/矢場ton/IMG_20260819_181817.jpg",
            "caption": "矢場町本店 紫蘇漬與冰鎮綠茶",
            "tag": "佐餐品味"
          },
          {
            "id": "v1_spot4_02",
            "path": "Photos/矢場ton/IMG_20260819_182624.jpg",
            "caption": "矢場とん 厚切炸豬排淋上秘傳味噌濃醬",
            "tag": "經典名物"
          },
          {
            "id": "v1_spot4_03",
            "path": "Photos/矢場ton/IMG_20260819_185321.jpg",
            "caption": "矢場町街區若宮大通鐘樓暮色",
            "tag": "街景時光"
          }
        ]
      },
      {
        "name": "久屋大通公園 & 中部電力 MIRAI TOWER",
        "time": "19:30 - 20:00",
        "rating": 4,
        "note": "電視塔金黃光柱聳立夜空，久屋大通公園繁華核心",
        "heroPhoto": {
          "path": "Photos/久屋大通 電力塔 綠洲21/IMG_20260819_193013.jpg",
          "caption": "中部電力 MIRAI TOWER 暮色光雕全貌",
          "tag": "地標雄姿"
        },
        "photos": [
          {
            "id": "v1_oasis_01",
            "path": "Photos/久屋大通 電力塔 綠洲21/IMG_20260819_192528.jpg",
            "caption": "久屋大通公園噴水池 遠方的 MIRAI TOWER",
            "tag": "地標剪影"
          },{
            "id": "v1_oasis_04",
            "path": "Photos/久屋大通 電力塔 綠洲21/IMG_20260819_193013.jpg",
            "caption": "中部電力 MIRAI TOWER 暮色光雕全貌",
            "tag": "地標雄姿"
          },
          {
            "id": "v1_oasis_03",
            "path": "Photos/久屋大通 電力塔 綠洲21/IMG_20260819_192812.jpg",
            "caption": "MIRAI TOWER 前方的久屋大通商店街",
            "tag": "都會夜景"
          }
        ]
      },
      {
        "name": "綠洲21",
        "time": "20:00 - 20:30",
        "rating": 4,
        "note": "水之宇宙船玻璃頂棚波光倒映，清涼愜意的盛夏夜風",
        "heroPhoto": {
          "path": "Photos/久屋大通 電力塔 綠洲21/IMG_20260819_195738.jpg",
          "caption": "綠洲21 水之宇宙船水波倒映電視塔絕景",
          "tag": "幻彩地標"
        },
        "photos": [
          {
            "id": "v1_oasis_02",
            "path": "Photos/久屋大通 電力塔 綠洲21/IMG_20260819_192638.jpg",
            "caption": "綠洲21 水之宇宙船夜景",
            "tag": "都會璀璨"
          },
          {
            "id": "v1_oasis_06",
            "path": "Photos/久屋大通 電力塔 綠洲21/IMG_20260819_195738.jpg",
            "caption": "綠洲21 水波倒映電力塔",
            "tag": "幻彩地標"
          },
          {
            "id": "v1_oasis_07",
            "path": "Photos/久屋大通 電力塔 綠洲21/IMG_20260819_200243.jpg",
            "caption": "水之宇宙船 晚風輕拂水面",
            "tag": "波光粼粼"
          },
          {
            "id": "v1_oasis_05",
            "path": "Photos/久屋大通 電力塔 綠洲21/IMG_20260819_194409.jpg",
            "caption": "地下廣場街頭偶像熱力表演",
            "tag": "都會活力"
          }
        ]
      },
      {
        "name": "世界の山ちゃん",
        "time": "21:30 - 22:00",
        "rating": 4,
        "note": "胡椒香氣直衝腦門！酥炸手羽先配冰鎮生啤，名古屋第一下酒菜",
        "heroPhoto": {
          "path": "Photos/世界的山將/IMG_20260819_214744.jpg",
          "caption": "幻の手羽先 剛起鍋酥脆胡椒炸雞翅盛盤",
          "tag": "宵夜微醺"
        },
        "photos": [
          {
            "id": "v1_spot7_01",
            "path": "Photos/世界的山將/IMG_20260819_213056.jpg",
            "caption": "世界的山將 本店招牌鳥人燈箱夜景",
            "tag": "經典店面"
          },
          {
            "id": "v1_spot7_02",
            "path": "Photos/世界的山將/IMG_20260819_214128.jpg",
            "caption": "名古屋名物 土手煮 (味噌牛筋燉大腸)",
            "tag": "鄉土居酒"
          },
          {
            "id": "v1_spot7_03",
            "path": "Photos/世界的山將/IMG_20260819_214240.jpg",
            "caption": "冰涼的烏龍茶",
            "tag": "冰涼飲品"
          },
          {
            "id": "v1_spot7_04",
            "path": "Photos/世界的山將/IMG_20260819_214744.jpg",
            "caption": "幻の手羽先 剛起鍋酥脆胡椒炸雞翅盛盤",
            "tag": "夢幻手羽"
          },
          {
            "id": "v1_spot7_05",
            "path": "Photos/世界的山將/IMG_20260819_214915.jpg",
            "caption": "粒粒分明的鐵鍋黑胡椒炒飯",
            "tag": "主食美味"
          },
          {
            "id": "v1_spot7_06",
            "path": "Photos/世界的山將/IMG_20260819_215207.jpg",
            "caption": "熔岩起司玉子燒",
            "tag": "起司控最愛"
          }
        ]
      }
    ]
  },
  {
    "chapterId": "vol-2",
    "volumeRoman": "VOLUME II",
    "volumeKanji": "卷之二",
    "themeTitle": "神域林蔭・老牌喫茶與熱田鰻香",
    "themeTitleJp": "神域林蔭・熱田の森とひつまぶしの極み",
    "date": "2026-08-20",
    "dayOfWeek": "THU",
    "location": "愛知名古屋・熱田 (Nagoya & Atsuta)",
    "regionColor": "#3B604B",
    "pace": "🌿 恬適得宜",
    "quote": "穿過熱田神宮森嚴的千年楠木參道，盛夏的蟬鳴被綠蔭過濾成靜謐；而蓬萊軒那一口炭香四溢的鰻魚三吃，讓味蕾徹底沉淪在江戶古法之中。",
    "summaryText": "清晨自 Konparu 復古咖啡店的小倉紅豆吐司啟程，踏入供奉三大神器「草薙劍」的熱田神宮。觸摸神宮千年御神木，心隨林風入定。午後於蓬萊軒本部，品味鰻魚飯三吃——原味焦香、佐芥末蔥花、再注煎茶作茶漬泡飯，層次豐盈絕倫。傍晚漫步名城公園眺望天守，夜入鳥貴族以熱騰串燒落款。",
    "heroPhoto": {
      "path": "Photos/蓬萊軒/IMG_20260820_134124.jpg",
      "caption": "あつた蓬莱軒 百年炭香鰻魚三吃 ひつまぶし",
      "tag": "江戶極味"
    },
    "gallery": [
      {
        "id": "v2_01",
        "path": "Photos/konparu/IMG_20260820_093314.jpg",
        "caption": "Konparu 昭和名物・三尾現炸大蝦切面三明治",
        "tag": "老牌喫茶"
      },
      {
        "id": "v2_02",
        "path": "Photos/熱田神宮/IMG_20260820_105815.jpg",
        "caption": "熱田神宮 千年楠木林蔭大鳥居",
        "tag": "神域清幽"
      },
      {
        "id": "v2_03",
        "path": "Photos/熱田神宮/IMG_20260820_125007.jpg",
        "caption": "劍之寶庫草薙館・親手持握朝倉猛將太郎太刀",
        "tag": "名刀體驗"
      },
      {
        "id": "v2_05",
        "path": "Photos/名城公園/IMG_20260820_185329.jpg",
        "caption": "名城公園 荷花池畔水車運轉",
        "tag": "古都城畔"
      },
      {
        "id": "v2_06",
        "path": "Photos/鳥貴族/IMG_20260820_195529.jpg",
        "caption": "鳥貴族 炭火醬燒雞肉串佐生啤",
        "tag": "庶民居酒"
      }
    ],
    "spots": [
      {
        "name": "Konparu",
        "time": "9:00 - 10:00",
        "rating": 4,
        "note": "昭和昭和復古氛圍，經典炸蝦三明治與小倉紅豆吐司",
        "heroPhoto": {
          "path": "Photos/konparu/IMG_20260820_093314.jpg",
          "caption": "Konparu 昭和名物・現炸整隻大蝦厚切三明治",
          "tag": "老牌喫茶"
        },
        "photos": [
          {
            "id": "v2_spot1_01",
            "path": "Photos/konparu/IMG_20260820_093143.jpg",
            "caption": "早餐套餐 火腿蛋吐司",
            "tag": "喫茶時光"
          },
          {
            "id": "v2_spot1_02",
            "path": "Photos/konparu/IMG_20260820_093314.jpg",
            "caption": "Konparu 昭和名物・三尾現炸大蝦切面三明治",
            "tag": "名物炸蝦"
          }
        ]
      },
      {
        "name": "熱田神宮",
        "time": "10:50 - 13:00",
        "rating": 4,
        "note": "尾張總鎮守，藏日本皇室草薙神劍，漫步參道神清氣爽",
        "heroPhoto": {
          "path": "Photos/熱田神宮/IMG_20260820_105815.jpg",
          "caption": "熱田神宮 千年楠木林蔭大鳥居",
          "tag": "神域清幽"
        },
        "photos": [
          {
            "id": "v2_spot2_01",
            "path": "Photos/熱田神宮/IMG_20260820_105815.jpg",
            "caption": "熱田神宮 千年楠木林蔭大鳥居",
            "tag": "神宮參道"
          },
          {
            "id": "v2_spot2_02",
            "path": "Photos/熱田神宮/IMG_20260820_110209.jpg",
            "caption": "南參道林蔭 古雅木造鳥居與常夜燈",
            "tag": "神宮森境"
          },
          {
            "id": "v2_spot2_07",
            "path": "Photos/熱田神宮/IMG_20260820_112708.jpg",
            "caption": "本宮正殿・白砂與銅瓦屋脊之威儀",
            "tag": "皇室古靈"
          },
          {
            "id": "v2_spot2_05",
            "path": "Photos/熱田神宮/IMG_20260820_111342.jpg",
            "caption": "熱田神宮 千年御神木・弘法大師手植大楠",
            "tag": "神木信仰"
          },
          {
            "id": "v2_spot2_08",
            "path": "Photos/熱田神宮/IMG_20260820_113646.jpg",
            "caption": "神宮境內古雅賽錢箱與巨楠",
            "tag": "古寺祈福"
          },
          {
            "id": "v2_spot2_11",
            "path": "Photos/熱田神宮/IMG_20260820_125007.jpg",
            "caption": "劍之寶庫草薙館・親手持握朝倉猛將太郎太刀",
            "tag": "名刀體驗"
          },
          {
            "id": "v2_spot2_03",
            "path": "Photos/熱田神宮/IMG_20260820_110238.jpg",
            "caption": "",
            "tag": "古社風範"
          },
          {
            "id": "v2_spot2_04",
            "path": "Photos/熱田神宮/IMG_20260820_110722.jpg",
            "caption": "",
            "tag": "古社風範"
          },
          {
            "id": "v2_spot2_06",
            "path": "Photos/熱田神宮/IMG_20260820_111403.jpg",
            "caption": "",
            "tag": "古社風範"
          },
          {
            "id": "v2_spot2_09",
            "path": "Photos/熱田神宮/IMG_20260820_113742.jpg",
            "caption": "",
            "tag": "古社風範"
          },
          {
            "id": "v2_spot2_10",
            "path": "Photos/熱田神宮/IMG_20260820_124916.jpg",
            "caption": "",
            "tag": "名刀體驗"
          },
          {
            "id": "v2_spot2_12",
            "path": "Photos/熱田神宮/IMG_20260820_125011_1.jpg",
            "caption": "",
            "tag": "名刀體驗"
          }
        ]
      },
      {
        "name": "あつた蓬莱軒 本店",
        "time": "13:20 - 14:30",
        "rating": 5,
        "note": "明治六年創業！登録商標「ひつまぶし」鰻魚三吃發祥地",
        "heroPhoto": {
          "path": "Photos/蓬萊軒/IMG_20260820_134124.jpg",
          "caption": "あつた蓬莱軒 百年炭香鰻魚三吃 ひつまぶし",
          "tag": "江戶極味"
        },
        "photos": [
          {
            "id": "v2_spot3_01",
            "path": "Photos/蓬萊軒/IMG_20260820_134124.jpg",
            "caption": "あつた蓬莱軒 百年炭香鰻魚三吃 ひつまぶし",
            "tag": "江戶極味"
          },
          {
            "id": "v2_spot3_02",
            "path": "Photos/蓬萊軒/IMG_20260820_134131.jpg",
            "caption": "炭火炙燒外焦內嫩，秘製甘醇醬汁",
            "tag": "職人手藝"
          },
          {
            "id": "v2_spot3_03",
            "path": "Photos/蓬萊軒/IMG_20260820_135202.jpg",
            "caption": "茶漬鰻魚泡飯・柴魚高湯溫潤滑順",
            "tag": "三吃妙境"
          }
        ]
      },
      {
        "name": "ナゴヤドーム (巨蛋商品與踩點)",
        "time": "15:15 - 16:30",
        "rating": 4,
        "note": "探訪中日龍主場商品部，選購吉祥物 Doala 與球隊限定周邊",
        "heroPhoto": {
          "path": "Photos/名古屋巨蛋 中日龍/IMG_20260820_153415.jpg",
          "caption": "名古屋巨蛋 中日龍 實訪寫真 (1)",
          "tag": "熱血巨蛋"
        },
        "photos": [
          {
            "id": "v3_spot3_01",
            "path": "Photos/名古屋巨蛋 中日龍/IMG_20260820_153415.jpg",
            "caption": "名古屋巨蛋 中日龍 實訪寫真 (1)",
            "tag": "熱血巨蛋"
          },]
      },
      {
        "name": "つばめパン (天然酵母食パン)",
        "time": "17:20 - 18:00",
        "rating": 4,
        "note": "名物燕子吐司，北海道小麥天然發酵，香氣濃郁口感鬆軟",
        "heroPhoto": {
          "path": "Photos/小倉紅豆吐司.jpg",
          "caption": "小倉紅豆厚片黃金奶油特寫",
          "tag": "名古屋名物"
        },
        "photos": [
          {
            "id": "v2_spot5_01",
            "path": "Photos/小倉紅豆吐司.jpg",
            "caption": "小倉紅豆厚片黃金奶油特寫",
            "tag": "名古屋名物"
          }
        ]
      },
      {
        "name": "名古屋城 & 名城公園",
        "time": "18:20 - 19:50",
        "rating": 2,
        "note": "夕暮散策於城北綠地，護城河水車與綠意相映成趣",
        "heroPhoto": 
          {
            "path": "Photos/名城公園/IMG_20260820_185700.jpg",
            "caption": "綠蔭深處遠望名古屋城天守角樓",
            "tag": "城池夕照"
          },
        "photos": [
          {
            "id": "v2_spot6_01",
            "path": "Photos/名城公園/IMG_20260820_185329.jpg",
            "caption": "名城公園荷花池畔孤鷺",
            "tag": "水木明瑟"
          },
          {
            "id": "v2_spot6_02",
            "path": "Photos/名城公園/IMG_20260820_185700.jpg",
            "caption": "綠蔭深處遠望名古屋城天守角樓",
            "tag": "城池夕照"
          },
          {
            "id": "v2_spot6_03",
            "path": "Photos/名城公園/IMG_20260820_191723.jpg",
            "caption": "夕陽西沉後的寧靜公園林道",
            "tag": "晚風步道"
          }
        ]
      },
      {
        "name": "鳥貴族 浄心",
        "time": "20:00 - 20:45",
        "rating": 3,
        "note": "均一價燒鳥名店，醬燒貴族燒與金黃炸雞肉串",
        "heroPhoto": {
          "path": "Photos/鳥貴族/IMG_20260820_201906.jpg",
          "caption": "鳥貴族 炭火醬燒雞肉串佐HighBall",
          "tag": "庶民居酒"
        },
        "photos": [
          {
            "id": "v2_spot7_01",
            "path": "Photos/鳥貴族/IMG_20260820_201906.jpg",
            "caption": "酥脆雞皮與經典烤串",
            "tag": "下酒佐食"
          },
          {
            "id": "v2_spot7_02",
            "path": "Photos/鳥貴族/IMG_20260820_195529.jpg",
            "caption": "知多HighBall 清爽解疲勞",
            "tag": "清爽嗨棒"
          },
          {
            "id": "v2_spot7_03",
            "path": "Photos/鳥貴族/IMG_20260820_195619.jpg",
            "caption": "胡麻油高麗菜可無限續點",
            "tag": "無限暢點"
          }
        ]
      }
    ]
  },
  {
    "chapterId": "vol-3",
    "volumeRoman": "VOLUME III",
    "volumeKanji": "卷之三",
    "themeTitle": "國寶天守・木曾川波與巨蛋旗海",
    "themeTitleJp": "国宝天守・木曽川の風とドームの歓声",
    "date": "2026-08-21",
    "dayOfWeek": "FRI",
    "location": "愛知名古屋 & 岐阜犬山 (Nagoya & Inuyama)",
    "regionColor": "#1E3888",
    "pace": "剛剛好",
    "quote": "登上犬山城天守頂層，迴廊外木曾川千層碧水浩蕩東流；夜晚走進萬特力巨蛋，中日龍三萬球迷同聲唱響應援歌，盛夏的沸點在此定格。",
    "summaryText": "晨光驅車前往岐阜犬山，造訪現存最古老木構天守「犬山城」。赤腳踏在戰國木板上，憑欄俯瞰木曾川千頃波濤；城下町品嚐烤五平餅。午後返回名古屋，晚間迎來重頭戲——萬特力巨蛋「中日龍 vs 養樂多」職棒大戰！藍白旗海翻湧、應援歌聲響徹穹頂。深夜慶功新時代居酒屋，金字塔炸雞皮串酥脆銷魂。",
    "heroPhoto": {
      "path": "Photos/犬山 犬山城/IMG_20260821_103848.jpg",
      "caption": "國寶犬山城天守閣 聳立木曾川懸崖之上",
      "tag": "國寶名城"
    },
    "gallery": [
      {
        "id": "v3_01",
        "path": "Photos/犬山 犬山城/IMG_20260821_101236.jpg",
        "caption": "犬山橋木曾川",
        "tag": "犬山景點"
      },
      {
        "id": "v3_02",
        "path": "Photos/犬山 犬山城/IMG_20260821_105251.jpg",
        "caption": "天守迴廊俯瞰犬山城",
        "tag": "登閣一覽"
      },
      {
        "id": "v3_03",
        "path": "Photos/名古屋巨蛋 中日龍/VID_20260821_174335.mp4",
        "poster": "Photos/名古屋巨蛋 中日龍/IMG_20260821_165114.jpg",
        "caption": "中日啦啦隊開場舞蹈",
        "tag": "現場影音",
        "isVideo": true
      },
      {
        "id": "v3_04",
        "path": "Photos/名古屋巨蛋 中日龍/IMG_20260821_181449.jpg",
        "caption": "全壘打瞬間 全場歡聲雷動",
        "tag": "賽事直擊"
      },
      {
        "id": "v3_05",
        "path": "Photos/新時代居酒屋/IMG_20260822_005840.jpg",
        "caption": "深夜居酒屋 伝串金字塔酥脆炸雞皮",
        "tag": "宵夜微醺"
      },
      {
        "id": "v3_06",
        "path": "Photos/阪神 梅田夜景.jpg",
        "caption": "入住阪神飯店 高樓俯瞰梅田百萬璀璨夜景",
        "tag": "天際夜色"
      }
    ],
    "spots": [
      {
        "name": "犬山城&城下町",
        "time": "9:30 - 12:50",
        "rating": 5,
        "note": "日本現存最古老木造天守，望樓型天守閣俯瞰木曾川與濃尾平原",
        "heroPhoto": {
          "path": "Photos/犬山 犬山城/IMG_20260821_103848.jpg",
          "caption": "國寶犬山城天守閣 聳立木曾川懸崖之上",
          "tag": "國寶名城"
        },
        "photos": [
          {
            "id": "v3_spot1_07",
            "path": "Photos/犬山 犬山城/IMG_20260821_103848.jpg",
            "caption": "國寶犬山城天守閣 聳立木曾川懸崖之上",
            "tag": "國寶名城"
          },
          {
            "id": "v3_spot1_01",
            "path": "Photos/犬山 犬山城/IMG_20260821_101236.jpg",
            "caption": "犬山 犬山城 實訪寫真 (1)",
            "tag": "國寶犬山"
          },
          {
            "id": "v3_spot1_02",
            "path": "Photos/犬山 犬山城/IMG_20260821_101504.jpg",
            "caption": "犬山 犬山城 實訪寫真 (2)",
            "tag": "國寶犬山"
          },
          {
            "id": "v3_spot1_03",
            "path": "Photos/犬山 犬山城/IMG_20260821_101751.jpg",
            "caption": "犬山 犬山城 實訪寫真 (3)",
            "tag": "國寶犬山"
          },
          {
            "id": "v3_spot1_04",
            "path": "Photos/犬山 犬山城/IMG_20260821_102824.jpg",
            "caption": "犬山 犬山城 實訪寫真 (4)",
            "tag": "國寶犬山"
          },
          {
            "id": "v3_spot1_05",
            "path": "Photos/犬山 犬山城/IMG_20260821_102844.jpg",
            "caption": "犬山 犬山城 實訪寫真 (5)",
            "tag": "國寶犬山"
          },
          {
            "id": "v3_spot1_06",
            "path": "Photos/犬山 犬山城/IMG_20260821_103302.jpg",
            "caption": "犬山 犬山城 實訪寫真 (6)",
            "tag": "國寶犬山"
          },
          {
            "id": "v3_spot1_08",
            "path": "Photos/犬山 犬山城/IMG_20260821_103958.jpg",
            "caption": "犬山 犬山城 實訪寫真 (8)",
            "tag": "國寶犬山"
          },
          {
            "id": "v3_spot1_09",
            "path": "Photos/犬山 犬山城/IMG_20260821_104934.jpg",
            "caption": "犬山 犬山城 實訪寫真 (9)",
            "tag": "國寶犬山"
          },
          {
            "id": "v3_spot1_10",
            "path": "Photos/犬山 犬山城/IMG_20260821_105251.jpg",
            "caption": "犬山 犬山城 實訪寫真 (10)",
            "tag": "國寶犬山"
          },
          {
            "id": "v3_spot1_11",
            "path": "Photos/犬山 犬山城/IMG_20260821_105645.jpg",
            "caption": "犬山 犬山城 實訪寫真 (11)",
            "tag": "國寶犬山"
          },
          {
            "id": "v3_spot1_12",
            "path": "Photos/犬山 犬山城/IMG_20260821_113401.jpg",
            "caption": "犬山 犬山城 實訪寫真 (12)",
            "tag": "國寶犬山"
          },
          {
            "id": "v3_spot1_13",
            "path": "Photos/犬山 犬山城/IMG_20260821_113634.jpg",
            "caption": "犬山 犬山城 實訪寫真 (13)",
            "tag": "國寶犬山"
          },
          {
            "id": "v3_spot1_14",
            "path": "Photos/犬山 犬山城/IMG_20260821_115017.jpg",
            "caption": "犬山 犬山城 實訪寫真 (14)",
            "tag": "國寶犬山"
          }
        ]
      },
      {
        "name": "AEON MALL",
        "time": "14:00 - 16:00",
        "rating": 4,
        "note": "大型購物中心悠閒補給，享受夏日冷氣吹拂以度過漫長的球隊聯名商店候號人潮",
        "photos": []
      },
      {
        "name": "萬特力巨蛋名古屋 中日龍球賽",
        "time": "17:00 - 21:00",
        "rating": 5,
        "note": "職棒現場震撼人心！三萬球迷藍白毛巾應援，九局攻防心跳加速",
        "heroPhoto": {
          "path": "Photos/名古屋巨蛋 中日龍/IMG_20260821_181449.jpg",
          "caption": "全壘打瞬間・全場爆燃",
          "tag": "賽事直擊"
        },
        "photos": [
          {
            "id": "v3_spot3_02",
            "path": "Photos/名古屋巨蛋 中日龍/IMG_20260821_133318.jpg",
            "caption": "中日龍球賽 實訪寫真 (1)",
            "tag": "熱血巨蛋"
          },
          {
            "id": "v3_spot3_03",
            "path": "Photos/名古屋巨蛋 中日龍/IMG_20260821_165114.jpg",
            "caption": "中日龍球賽 實訪寫真 (2)",
            "tag": "熱血巨蛋"
          },
          {
            "id": "v3_spot3_04",
            "path": "Photos/名古屋巨蛋 中日龍/IMG_20260821_181449.jpg",
            "caption": "中日龍球賽 實訪寫真 (3)",
            "tag": "熱血巨蛋"
          },
          {
            "id": "v3_spot3_05",
            "path": "Photos/名古屋巨蛋 中日龍/IMG_20260821_210759.jpg",
            "caption": "中日龍球賽 實訪寫真 (4)",
            "tag": "熱血巨蛋"
          },
          {
            "id": "v3_spot3_vid01",
            "path": "Photos/名古屋巨蛋 中日龍/VID_20260821_174335.mp4",
            "poster": "Photos/名古屋巨蛋 中日龍/IMG_20260821_165114.jpg",
            "caption": "中日啦啦隊開場舞蹈",
            "tag": "現場影音",
            "isVideo": true
          },
          {
            "id": "v3_spot3_vid02",
            "path": "Photos/名古屋巨蛋 中日龍/VID_20260821_180320.mp4",
            "poster": "Photos/名古屋巨蛋 中日龍/IMG_20260821_181449.jpg",
            "caption": "中日龍球賽 現場影音 (1)",
            "tag": "現場影音",
            "isVideo": true
          },
          {
            "id": "v3_spot3_vid03",
            "path": "Photos/名古屋巨蛋 中日龍/VID_20260821_194240.mp4",
            "poster": "Photos/名古屋巨蛋 中日龍/IMG_20260821_181449.jpg",
            "caption": "中場休息 皮卡丘們可愛應援",
            "tag": "現場影音",
            "isVideo": true
          },
          {
            "id": "v3_spot3_vid04",
            "path": "Photos/名古屋巨蛋 中日龍/VID_20260821_205428.mp4",
            "poster": "Photos/名古屋巨蛋 中日龍/IMG_20260821_210759.jpg",
            "caption": "九局賽末・全場沸騰關鍵決戰時刻",
            "tag": "現場影音",
            "isVideo": true
          },
          {
            "id": "v3_spot3_vid05",
            "path": "Photos/名古屋巨蛋 中日龍/VID_20260821_205653.mp4",
            "poster": "Photos/名古屋巨蛋 中日龍/IMG_20260821_210759.jpg",
            "caption": "中日龍球賽 現場影音 (2)",
            "tag": "現場影音",
            "isVideo": true
          },
          {
            "id": "v3_spot3_vid06",
            "path": "Photos/名古屋巨蛋 中日龍/VID_20260821_210147.mp4",
            "poster": "Photos/名古屋巨蛋 中日龍/IMG_20260821_210759.jpg",
            "caption": "賽後謝幕・球場燈光秀與勝利歡呼",
            "tag": "現場影音",
            "isVideo": true
          }
        ]
      },
      {
        "name": "新時代居酒屋 (伝串金字塔)",
        "time": "00:58 - 01:24",
        "rating": 5,
        "note": "新幹線火速出發大阪！金字塔般堆疊的獨門醬香炸雞皮串",
        "heroPhoto": {
          "path": "Photos/新時代居酒屋/IMG_20260822_005840.jpg",
          "caption": "深夜居酒屋 伝串金字塔酥脆炸雞皮",
          "tag": "專利名物"
        },
        "photos": [
          {
            "id": "v3_spot4_01",
            "path": "Photos/新時代居酒屋/IMG_20260822_005840.jpg",
            "caption": "深夜居酒屋 伝串金字塔酥脆炸雞皮",
            "tag": "專利名物"
          },
          {
            "id": "v3_spot4_02",
            "path": "Photos/新時代居酒屋/IMG_20260822_010820.jpg",
            "caption": "大口沙瓦佐甜鹹串燒和關西燒物",
            "tag": "深夜微醺"
          }
        ]
      },
      {
        "name": "阪神飯店 (梅田高樓景色)",
        "time": "01:30~",
        "rating": 4,
        "note": "下榻梅田高樓飯店，窗前俯瞰大阪百萬燈火星河",
        "heroPhoto": {
          "path": "Photos/阪神 梅田夜景.jpg",
          "caption": "入住阪神飯店 高樓俯瞰梅田百萬璀璨夜景",
          "tag": "天際夜色"
        },
        "photos": [
          {
            "id": "v4_spot7_01",
            "path": "Photos/阪神 梅田夜景.jpg",
            "caption": "入住阪神飯店 高樓俯瞰梅田百萬璀璨夜景",
            "tag": "百萬夜景"
          },
          {
            "id": "v4_spot7_02",
            "path": "Photos/阪神飯店 梅田日景.jpg",
            "caption": "白天百萬城市景觀",
            "tag": "城市景觀"
          }
        ]
      }
    ]
  },
  {
    "chapterId": "vol-4",
    "volumeRoman": "VOLUME IV",
    "volumeKanji": "卷之四",
    "themeTitle": "甲子之風・浪花煙火與黑土傳奇",
    "themeTitleJp": "甲子の風・聖地阪神甲子園と道頓堀の夜",
    "date": "2026-08-22",
    "dayOfWeek": "SAT",
    "location": "兵庫西宮 & 大阪南區 (Hyogo & Osaka)",
    "regionColor": "#D97724",
    "pace": "🌿 恬適得宜",
    "quote": "百年綠蔓攀附著聖地紅磚，甲子園的黑土埋藏著幾代青春的淚水；當列車駛入道頓堀，運河兩岸的霓虹如浪潮湧來，大阪的煙火人間就此展開。",
    "summaryText": "告別愛知，西行踏入棒球聖地「阪神甲子園球場」。常春藤爬滿百年外牆，步入歷史館凝望高校棒球熱血錦旗與黑土球場。午後進駐難波，於鶴屋細品高湯和牛壽喜燒；傍晚投身道頓堀人潮，外酥內燙章魚燒配運河夜景，深夜於拉麵人生JET大啖雞白湯，夜宿梅田高樓。",
    "heroPhoto": {
      "path": "Photos/甲子園/IMG_20260822_095349.jpg",
      "caption": "阪神甲子園球場外野計分板與廣闊天然草皮",
      "tag": "野球聖地"
    },
    "gallery": [
      {
        "id": "v4_01",
        "path": "Photos/甲子園/IMG_20260822_093642.jpg",
        "caption": "甲子園外牆 百年常春藤綠意",
        "tag": "百年磚牆"
      },
      {
        "id": "v4_02",
        "path": "Photos/鶴屋.jpg",
        "caption": "鶴屋 特撰和牛壽喜燒盛盤",
        "tag": "浪花滋味"
      },
      {
        "id": "v4_03",
        "path": "Photos/道頓堀 章魚燒/IMG_20260822_143417.jpg",
        "caption": "新世界商店街 金黃外酥內嫩章魚燒",
        "tag": "街頭小吃"
      },
      {
        "id": "v4_04",
        "path": "Photos/道頓堀 章魚燒/IMG_20260822_180619.jpg",
        "caption": "道頓堀固力果跑跑人廣告",
        "tag": "知名地標"
      },
      {
        "id": "v4_05",
        "path": "Photos/道頓堀 章魚燒/IMG_20260822_190309.jpg",
        "caption": "運河兩岸繁華招牌夜景",
        "tag": "水都繁花"
      },
      {
        "id": "v4_06",
        "path": "Photos/ramenjinsei JET.jpg",
        "caption": "ラーメン人生JET 招牌香濃豚そば拌麵",
        "tag": "人氣麵屋"
      }
    ],
    "spots": [
      {
        "name": "阪神甲子園球場 & 甲子園歷史館",
        "time": "10:00 - 13:30",
        "rating": 4,
        "note": "高校野球殿堂，外牆綠藤爬梳百年記憶，記分板下凝視黑土神聖",
        "heroPhoto": {
          "path": "Photos/甲子園/IMG_20260822_095349.jpg",
          "caption": "阪神甲子園球場外野計分板與廣闊天然草皮",
          "tag": "野球聖地"
        },
        "photos": [
          {
            "id": "v4_spot1_01",
            "path": "Photos/甲子園/IMG_20260822_095349.jpg",
            "caption": "阪神甲子園球場外野計分板與廣闊天然草皮",
            "tag": "野球聖地"
          },
          {
            "id": "v4_spot1_02",
            "path": "Photos/甲子園/IMG_20260822_093642.jpg",
            "caption": "甲子園外牆 百年常春藤綠意",
            "tag": "百年磚牆"
          },
          {
            "id": "v4_spot1_03",
            "path": "Photos/甲子園/IMG_20260822_095852.jpg",
            "caption": "甲子園 實訪寫真 (3)",
            "tag": "野球殿堂"
          },
          {
            "id": "v4_spot1_04",
            "path": "Photos/甲子園/IMG_20260822_124301.jpg",
            "caption": "甲子園 實訪寫真 (4)",
            "tag": "野球殿堂"
          },
          {
            "id": "v4_spot1_05",
            "path": "Photos/甲子園/IMG_20260822_124308.jpg",
            "caption": "甲子園 實訪寫真 (5)",
            "tag": "野球殿堂"
          }
        ]
      },
      {
        "name": "鶴屋 すき焼き",
        "time": "14:00 - 15:00",
        "rating": 4,
        "note": "大阪老牌壽喜燒名所，頂級和牛油脂在鐵鍋中翻滾如雲",
        "heroPhoto": {
          "path": "Photos/鶴屋.jpg",
          "caption": "鶴屋 午間特撰和牛壽喜燒",
          "tag": "浪花滋味"
        },
        "photos": [
          {
            "id": "v4_spot2_01",
            "path": "Photos/鶴屋.jpg",
            "caption": "鶴屋 午間特撰和牛壽喜燒",
            "tag": "頂級和牛"
          }
        ]
      },
      {
        "name": "ナンバCITY",
        "time": "15:00 - 17:45",
        "rating": 5,
        "note": "難波地下萬象商城，時尚潮牌與雜貨雲集的大阪購物中心",
        "photos": []
      },
      {
        "name": "道頓堀",
        "time": "18:00 - 20:00",
        "rating": 4,
        "note": "固力果跑者霓虹璀璨，熱燙柴魚片在章魚燒上飛舞",
        "heroPhoto": {
          "path": "Photos/道頓堀 章魚燒/IMG_20260822_184421.jpg",
          "caption": "道頓堀特色突出招牌林立",
          "tag": "街頭奇景"
        },
        "photos": [
          {
            "id": "v4_spot4_01",
            "path": "Photos/道頓堀 章魚燒/IMG_20260822_143300.jpg",
            "caption": "道頓堀 章魚燒 實訪寫真 (1)",
            "tag": "水都繁華"
          },
          {
            "id": "v4_spot4_02",
            "path": "Photos/道頓堀 章魚燒/IMG_20260822_143417.jpg",
            "caption": "道頓堀 章魚燒 實訪寫真 (2)",
            "tag": "水都繁華"
          },
          {
            "id": "v4_spot4_03",
            "path": "Photos/道頓堀 章魚燒/IMG_20260822_175446.jpg",
            "caption": "道頓堀 章魚燒 實訪寫真 (3)",
            "tag": "水都繁華"
          },
          {
            "id": "v4_spot4_04",
            "path": "Photos/道頓堀 章魚燒/IMG_20260822_180619.jpg",
            "caption": "道頓堀 章魚燒 實訪寫真 (4)",
            "tag": "水都繁華"
          },
          {
            "id": "v4_spot4_05",
            "path": "Photos/道頓堀 章魚燒/IMG_20260822_181929.jpg",
            "caption": "道頓堀 章魚燒 實訪寫真 (5)",
            "tag": "水都繁華"
          },
          {
            "id": "v4_spot4_06",
            "path": "Photos/道頓堀 章魚燒/IMG_20260822_183636.jpg",
            "caption": "道頓堀 章魚燒 實訪寫真 (6)",
            "tag": "水都繁華"
          },
          {
            "id": "v4_spot4_07",
            "path": "Photos/道頓堀 章魚燒/IMG_20260822_183852.jpg",
            "caption": "道頓堀 章魚燒 實訪寫真 (7)",
            "tag": "水都繁華"
          },
          {
            "id": "v4_spot4_08",
            "path": "Photos/道頓堀 章魚燒/IMG_20260822_184421.jpg",
            "caption": "道頓堀 章魚燒 實訪寫真 (8)",
            "tag": "水都繁華"
          },
          {
            "id": "v4_spot4_09",
            "path": "Photos/道頓堀 章魚燒/IMG_20260822_184427.jpg",
            "caption": "道頓堀 章魚燒 實訪寫真 (9)",
            "tag": "水都繁華"
          },
          {
            "id": "v4_spot4_10",
            "path": "Photos/道頓堀 章魚燒/IMG_20260822_184446.jpg",
            "caption": "道頓堀 章魚燒 實訪寫真 (10)",
            "tag": "水都繁華"
          },
          {
            "id": "v4_spot4_11",
            "path": "Photos/道頓堀 章魚燒/IMG_20260822_184718.jpg",
            "caption": "道頓堀 章魚燒 實訪寫真 (11)",
            "tag": "水都繁華"
          },
          {
            "id": "v4_spot4_12",
            "path": "Photos/道頓堀 章魚燒/IMG_20260822_190309.jpg",
            "caption": "道頓堀 章魚燒 實訪寫真 (12)",
            "tag": "水都繁華"
          },
          {
            "id": "v4_spot4_13",
            "path": "Photos/道頓堀 章魚燒/IMG_20260822_190557.jpg",
            "caption": "道頓堀 章魚燒 實訪寫真 (13)",
            "tag": "水都繁華"
          },
          {
            "id": "v4_spot4_14",
            "path": "Photos/道頓堀 章魚燒/IMG_20260822_190705.jpg",
            "caption": "道頓堀 章魚燒 實訪寫真 (14)",
            "tag": "水都繁華"
          }
        ]
      },
      {
        "name": "MaxvaluEX",
        "time": "21:10 - 21:30",
        "rating": 3,
        "note": "大型連鎖超市，採買零食飲料與泡麵宵夜",
        "heroPhoto": {
          "path": "Photos/麵職人泡麵.jpg",
          "caption": "MaxvaluEX 戰利品 麵職人泡麵",
          "tag": "超市採購"
        },
        "photos": [
          {
            "id": "v4_spot5_01",
            "path": "Photos/麵職人泡麵.jpg",
            "caption": "麵職人泡麵",
            "tag": "超市採購"
          },
          {
            "id": "v4_spot5_02",
            "path": "Photos/泡麵本體.jpg",
            "caption": "泡麵口味偏日式但餘味清爽",
            "tag": "泡麵宵夜"
          }
        ]
      },
      {
        "name": "ラーメン人生JET",
        "time": "21:45 - 22:30",
        "rating": 5,
        "note": "深夜拉麵人氣名店，特製香濃豚そば拌麵滋味濃烈",
        "heroPhoto": {
          "path": "Photos/ramenjinsei JET.jpg",
          "caption": "ラーメン人生JET 招牌香濃豚そば拌麵",
          "tag": "人氣麵屋"
        },
        "photos": [
          {
            "id": "v4_spot6_01",
            "path": "Photos/ramenjinsei JET.jpg",
            "caption": "ラーメン人生JET 招牌香濃豚そば拌麵",
            "tag": "名物拌麵"
          }
        ]
      }
    ]
  },
  {
    "chapterId": "vol-5",
    "volumeRoman": "VOLUME V",
    "volumeKanji": "卷之五",
    "themeTitle": "浪花天際・大阪城天守與通天閣",
    "themeTitleJp": "浪花天際・太閤の城と通天閣の哀愁",
    "date": "2026-08-23",
    "dayOfWeek": "SUN",
    "location": "大阪市內 (Osaka)",
    "regionColor": "#A63D40",
    "pace": "🌿 恬適得宜",
    "quote": "豐臣秀吉的巨石城郭倒映在平靜的護城河水面，幾百年前的霸業已成青苔；轉身步入新世界，通天閣下的串炸香與元祖果汁，才是浪花兒女最真切的溫柔。",
    "summaryText": "清晨梅田高樓遠眺天際線，隨後前往「大阪城天守閣」。仰望金鯱閃爍、摸撫重達百噸之蛸石巨壘。午後登上梅田藍天大廈空中庭園，懸空手扶梯透視地表令人屏息。傍晚轉進新世界商店街，於千成屋小啜創始綜合果汁，仰望通天閣日立霓虹；晚間以燒肉力丸鮮嫩和牛放題飽足收尾。",
    "heroPhoto": {
      "path": "Photos/大阪城/IMG_20260823_112021.jpg",
      "caption": "大阪城天守閣 晴空下的金鯱裝飾與厚重石垣",
      "tag": "太閤名城"
    },
    "gallery": [
      {
        "id": "v5_01",
        "path": "Photos/大阪警視廳.jpg",
        "caption": "護城河對岸柯南劇場版舞台・大阪警視廳",
        "tag": "動漫聖地"
      },
      {
        "id": "v5_02",
        "path": "Photos/藍天大廈/IMG_20260823_143843.jpg",
        "caption": "晨曦中的梅田天際線全貌",
        "tag": "天際晨光"
      },
      {
        "id": "v5_03",
        "path": "Photos/藍天大廈/IMG_20260823_141611.jpg",
        "caption": "梅田藍天大廈 懸空手扶梯與極致幾何",
        "tag": "未來建築"
      },
      {
        "id": "v5_04",
        "path": "Photos/通天閣/IMG_20260823_174648.jpg",
        "caption": "新世界下町 通天閣矗立街底",
        "tag": "下町風情"
      },
      {
        "id": "v5_05",
        "path": "Photos/通天閣/IMG_20260823_190252.jpg",
        "caption": "通天閣眺望大阪夜景",
        "tag": "下町地標"
      },
      {
        "id": "v5_06",
        "path": "Photos/燒肉力丸/IMG_20260823_204648.jpg",
        "caption": "焼肉力丸 炙烤頂級牛五花與牛舌",
        "tag": "炭火盛宴"
      }
    ],
    "spots": [
      {
        "name": "大阪城 天守閣 & 大阪城公園",
        "time": "10:00 - 13:30",
        "rating": 4,
        "note": "太閤秀吉之千秋霸業，極樂橋、護城河與翠綠金箔八層天守",
        "heroPhoto": {
          "path": "Photos/大阪城/IMG_20260823_112021.jpg",
          "caption": "大阪城天守閣 晴空下的金鯱裝飾與厚重石垣",
          "tag": "太閤名城"
        },
        "photos": [
          {
            "id": "v5_spot1_01",
            "path": "Photos/大阪城/IMG_20260823_111132.jpg",
            "caption": "大阪城 實訪寫真 (1)",
            "tag": "太閤名城"
          },
          {
            "id": "v5_spot1_02",
            "path": "Photos/大阪城/IMG_20260823_111303.jpg",
            "caption": "極樂橋橫跨碧綠護城河與高聳天守之名信片全景",
            "tag": "名城全景"
          },
          {
            "id": "v5_spot1_03",
            "path": "Photos/大阪城/IMG_20260823_111343.jpg",
            "caption": "大阪城 實訪寫真 (3)",
            "tag": "太閤名城"
          },
          {
            "id": "v5_spot1_04",
            "path": "Photos/大阪城/IMG_20260823_111836.jpg",
            "caption": "大阪城 實訪寫真 (4)",
            "tag": "太閤名城"
          },
          {
            "id": "v5_spot1_05",
            "path": "Photos/大阪城/IMG_20260823_112021.jpg",
            "caption": "大阪城天守閣 晴空下的金鯱裝飾與厚重石垣",
            "tag": "太閤名城"
          },
          {
            "id": "v5_spot1_06",
            "path": "Photos/大阪城/IMG_20260823_112047.jpg",
            "caption": "大阪城 實訪寫真 (6)",
            "tag": "太閤名城"
          },
          {
            "id": "v5_spot1_07",
            "path": "Photos/大阪城/IMG_20260823_112725.jpg",
            "caption": "大阪城 實訪寫真 (7)",
            "tag": "太閤名城"
          },
          {
            "id": "v5_spot1_08",
            "path": "Photos/大阪城/IMG_20260823_114434.jpg",
            "caption": "大阪城 實訪寫真 (8)",
            "tag": "太閤名城"
          },
          {
            "id": "v5_spot1_09",
            "path": "Photos/大阪城/IMG_20260823_114611.jpg",
            "caption": "大阪城 實訪寫真 (9)",
            "tag": "太閤名城"
          },
          {
            "id": "v5_spot1_10",
            "path": "Photos/大阪城/IMG_20260823_120925.jpg",
            "caption": "天守內部近距離原寸黃金金鯱與黃金伏虎模型",
            "tag": "黃金天守"
          },
          {
            "id": "v5_spot1_11",
            "path": "Photos/大阪城/IMG_20260823_123208.jpg",
            "caption": "大阪城 實訪寫真 (11)",
            "tag": "太閤名城"
          },
          {
            "id": "v5_spot1_police",
            "path": "Photos/大阪警視廳.jpg",
            "caption": "護城河對岸柯南劇場版舞台・大阪警視廳",
            "tag": "動漫地標"
          }
        ]
      },
      {
        "name": "梅田Blue Sky (空中庭園)",
        "time": "14:00 - 15:00",
        "rating": 3,
        "note": "雙塔懸空手扶梯橫跨半空，360度俯瞰大阪水都平原",
        "heroPhoto": {
          "path": "Photos/藍天大廈/IMG_20260823_142649.jpg",
          "caption": "梅田藍天大廈 懸空手扶梯與極致幾何",
          "tag": "未來建築"
        },
        "photos": [
          {
            "id": "v5_spot2_01",
            "path": "Photos/藍天大廈/IMG_20260823_141611.jpg",
            "caption": "梅田藍天大廈 懸空手扶梯與極致幾何",
            "tag": "空中庭園"
          },
          {
            "id": "v5_spot2_02",
            "path": "Photos/藍天大廈/IMG_20260823_142649.jpg",
            "caption": "藍天大廈 實訪寫真 (2)",
            "tag": "未來建築"
          },
          {
            "id": "v5_spot2_03",
            "path": "Photos/藍天大廈/IMG_20260823_142801.jpg",
            "caption": "藍天大廈 實訪寫真 (3)",
            "tag": "空中庭園"
          },
          {
            "id": "v5_spot2_04",
            "path": "Photos/藍天大廈/IMG_20260823_143116.jpg",
            "caption": "藍天大廈 實訪寫真 (4)",
            "tag": "空中庭園"
          },
          {
            "id": "v5_spot2_05",
            "path": "Photos/藍天大廈/IMG_20260823_143715.jpg",
            "caption": "藍天大廈 實訪寫真 (5)",
            "tag": "空中庭園"
          },
          {
            "id": "v5_spot2_06",
            "path": "Photos/藍天大廈/IMG_20260823_143811.jpg",
            "caption": "藍天大廈 實訪寫真 (6)",
            "tag": "空中庭園"
          },
          {
            "id": "v5_spot2_07",
            "path": "Photos/藍天大廈/IMG_20260823_143843.jpg",
            "caption": "藍天大廈 實訪寫真 (7)",
            "tag": "空中庭園"
          },
          {
            "id": "v5_spot2_08",
            "path": "Photos/藍天大廈/IMG_20260823_143953.jpg",
            "caption": "藍天大廈 實訪寫真 (8)",
            "tag": "空中庭園"
          },
          {
            "id": "v5_spot2_09",
            "path": "Photos/藍天大廈/IMG_20260823_144350.jpg",
            "caption": "藍天大廈 實訪寫真 (9)",
            "tag": "空中庭園"
          }
        ]
      },
      {
        "name": "新世界商店街 & 千成屋",
        "time": "17:00 - 17:45",
        "rating": 3,
        "note": "昭和下町風情，千成屋1948年創業元祖混合果汁香濃沁涼",
        "heroPhoto": {
          "path": "Photos/綜合果汁.jpg",
          "caption": "千成屋 元祖冰涼綜合果汁",
          "tag": "浪花名物"
        },
        "photos": [
          {
            "id": "v5_spot3_01",
            "path": "Photos/綜合果汁.jpg",
            "caption": "千成屋 元祖冰涼綜合果汁",
            "tag": "元祖名物"
          }
        ]
      },
      {
        "name": "通天閣",
        "time": "18:30 - 19:30",
        "rating": 2,
        "note": "登通天閣俯瞰大阪南區，觸摸比利肯神像腳底祈福",
        "heroPhoto": {
          "path": "Photos/通天閣/IMG_20260823_174648.jpg",
          "caption": "新世界下町 通天閣矗立街底",
          "tag": "下町風情"
        },
        "photos": [
          {
            "id": "v5_spot4_01",
            "path": "Photos/通天閣/IMG_20260823_174648.jpg",
            "caption": "新世界下町 通天閣矗立街底",
            "tag": "下町風情"
          },
          {
            "id": "v5_spot4_02",
            "path": "Photos/通天閣/IMG_20260823_182744.jpg",
            "caption": "通天閣 實訪寫真 (2)",
            "tag": "下町地標"
          },
          {
            "id": "v5_spot4_03",
            "path": "Photos/通天閣/IMG_20260823_183124.jpg",
            "caption": "通天閣 實訪寫真 (3)",
            "tag": "下町地標"
          },
          {
            "id": "v5_spot4_04",
            "path": "Photos/通天閣/IMG_20260823_185438.jpg",
            "caption": "通天閣 實訪寫真 (4)",
            "tag": "下町地標"
          },
          {
            "id": "v5_spot4_05",
            "path": "Photos/通天閣/IMG_20260823_185725.jpg",
            "caption": "通天閣 實訪寫真 (5)",
            "tag": "下町地標"
          },
          {
            "id": "v5_spot4_06",
            "path": "Photos/通天閣/IMG_20260823_185941.jpg",
            "caption": "通天閣 實訪寫真 (6)",
            "tag": "下町地標"
          },
          {
            "id": "v5_spot4_07",
            "path": "Photos/通天閣/IMG_20260823_190126.jpg",
            "caption": "通天閣 實訪寫真 (7)",
            "tag": "下町地標"
          },
          {
            "id": "v5_spot4_08",
            "path": "Photos/通天閣/IMG_20260823_190252.jpg",
            "caption": "通天閣 實訪寫真 (8)",
            "tag": "下町地標"
          },
          {
            "id": "v5_spot4_09",
            "path": "Photos/通天閣/IMG_20260823_190716.jpg",
            "caption": "通天閣 實訪寫真 (9)",
            "tag": "下町地標"
          }
        ]
      },
      {
        "name": "道頓堀 松本清",
        "time": "20:00 - 20:40",
        "rating": 4,
        "note": "熱鬧非凡的藥妝補給聖地，滿載各色日本熱門商品",
        "photos": []
      },
      {
        "name": "燒肉力丸",
        "time": "20:45 - 22:45",
        "rating": 4,
        "note": "高品質日本國產牛燒肉，厚切牛舌與和牛握壽司炙烤香濃",
        "heroPhoto": {
          "path": "Photos/燒肉力丸/IMG_20260823_204648.jpg",
          "caption": "燒肉力丸 厚切牛舌與油花五花肉",
          "tag": "炭火盛宴"
        },
        "photos": [
          {
            "id": "v5_spot6_01",
            "path": "Photos/燒肉力丸/IMG_20260823_204648.jpg",
            "caption": "燒肉力丸 炙烤頂級牛五花與牛舌",
            "tag": "炭火盛宴"
          },
          {
            "id": "v5_spot6_02",
            "path": "Photos/燒肉力丸/IMG_20260823_204739.jpg",
            "caption": "燒肉力丸 生牛肉",
            "tag": "炭火燒肉"
          },
          {
            "id": "v5_spot6_03",
            "path": "Photos/燒肉力丸/IMG_20260823_204823.jpg",
            "caption": "燒肉力丸 桌邊炭烤和牛握壽司",
            "tag": "炭火燒肉"
          },
          {
            "id": "v5_spot6_04",
            "path": "Photos/燒肉力丸/IMG_20260823_204832.jpg",
            "caption": "燒肉力丸 實訪寫真 (4)",
            "tag": "炭火燒肉"
          }
        ]
      }
    ]
  },
  {
    "chapterId": "vol-6",
    "volumeRoman": "VOLUME VI",
    "volumeKanji": "卷之六",
    "themeTitle": "古都佛光・青丹吉特急與鹿鳴春日",
    "themeTitleJp": "古都仏光・あをによしと奈良の鹿",
    "date": "2026-08-24",
    "dayOfWeek": "MON",
    "location": "奈良 (Nara) & 大阪",
    "regionColor": "#8D5B4C",
    "pace": "☕ 悠緩漫行",
    "quote": "搭乘紫金外裝的『あをによし』穿越平城京舊跡，千年時光悠然倒流；東大寺大佛法相莊嚴，奈良鹿在若草山林蔭下俯首鞠躬，心隨檀香靜篤。",
    "summaryText": "晨間自大阪搭乘近鐵最新觀光特急「AONIYOSHI」，紫紺色尊貴車廂如移動的奈良博物館。抵達南都，漫步奈良公園，遇群鹿悠然討食鹿仙貝；於志津香品味砂鍋細火燜煮的「七幸釜飯」。午後步入世界最大木造建築「東大寺大佛殿」，瞻仰盧舍那佛金色光芒，品嚐大佛布丁；返阪後於心齋橋大丸吃 Harbs 水果千層，夜享 Yukari 大阪燒。",
    "heroPhoto": {
      "path": "Photos/東大寺/IMG_20260824_125156.jpg",
      "caption": "東大寺大佛殿 壯闊木構與金銅鴟尾",
      "tag": "世界遺產"
    },
    "gallery": [
      {
        "id": "v6_01",
        "path": "Photos/AONIYOSHI/IMG_20260824_090336.jpg",
        "caption": "近鐵特急 AONIYOSHI 尊貴車頭銘板",
        "tag": "觀光特急"
      },
      {
        "id": "v6_02",
        "path": "Photos/奈良公園/IMG_20260824_100224.jpg",
        "caption": "青青草地上的優雅奈良神鹿",
        "tag": "神鹿之友"
      },
      {
        "id": "v6_03",
        "path": "Photos/志津香/IMG_20260824_112322.jpg",
        "caption": "志津香 砂鍋細火燜煮招牌奈良七幸釜飯",
        "tag": "古法炊飯"
      },
      {
        "id": "v6_04",
        "path": "Photos/東大寺/IMG_20260824_125156.jpg",
        "caption": "東大寺大佛殿 壯闊木構與金銅鴟尾",
        "tag": "古寺佛光"
      },
      {
        "id": "v6_05",
        "path": "Photos/Harbs 大丸/IMG_20260824_162354.jpg",
        "caption": "HARBS 鮮切多汁水果千層特寫",
        "tag": "旬果甜點"
      },
      {
        "id": "v6_06",
        "path": "Photos/Yukari/IMG_20260824_192549.jpg",
        "caption": "Yukari 鐵板名物・特製大阪燒與太陽蛋炒麵",
        "tag": "鐵板料理"
      }
    ],
    "spots": [
      {
        "name": "近鐵觀光特急 AONIYOSHI",
        "time": "09:10 - 09:50",
        "rating": 3,
        "note": "紫檀色車身、正倉院花紋豪華軟座，穿越千年前古都平城京",
        "heroPhoto": {
          "path": "Photos/AONIYOSHI/IMG_20260824_090336.jpg",
          "caption": "近鐵特急 AONIYOSHI 尊貴車頭銘板",
          "tag": "觀光特急"
        },
        "photos": [
          {
            "id": "v6_spot1_01",
            "path": "Photos/AONIYOSHI/IMG_20260824_090312.jpg",
            "caption": "AONIYOSHI 實訪寫真 (1)",
            "tag": "觀光特急"
          },
          {
            "id": "v6_spot1_02",
            "path": "Photos/AONIYOSHI/IMG_20260824_090336.jpg",
            "caption": "近鐵特急 AONIYOSHI 尊貴車頭銘板",
            "tag": "觀光特急"
          },
          {
            "id": "v6_spot1_03",
            "path": "Photos/AONIYOSHI/IMG_20260824_090515.jpg",
            "caption": "AONIYOSHI 實訪寫真 (3)",
            "tag": "觀光特急"
          },
          {
            "id": "v6_spot1_04",
            "path": "Photos/AONIYOSHI/IMG_20260824_092146.jpg",
            "caption": "AONIYOSHI 實訪寫真 (4)",
            "tag": "觀光特急"
          },
          {
            "id": "v6_spot1_05",
            "path": "Photos/AONIYOSHI/IMG_20260824_092309.jpg",
            "caption": "AONIYOSHI 實訪寫真 (5)",
            "tag": "觀光特急"
          },
          {
            "id": "v6_spot1_06",
            "path": "Photos/AONIYOSHI/IMG_20260824_092632.jpg",
            "caption": "AONIYOSHI 實訪寫真 (6)",
            "tag": "觀光特急"
          },
          {
            "id": "v6_spot1_07",
            "path": "Photos/AONIYOSHI/IMG_20260824_094245.jpg",
            "caption": "AONIYOSHI 實訪寫真 (7)",
            "tag": "觀光特急"
          }
        ]
      },
      {
        "name": "奈良公園",
        "time": "10:00 - 10:45",
        "rating": 4,
        "note": "春日大社神之使者，綠草如茵、溫馴小鹿點頭鞠躬討仙貝",
        "heroPhoto": {
          "path": "Photos/奈良公園/IMG_20260824_100224.jpg",
          "caption": "青青草地上的優雅奈良神鹿",
          "tag": "神鹿之友"
        },
        "photos": [
          {
            "id": "v6_spot2_01",
            "path": "Photos/奈良公園/IMG_20260824_095720.jpg",
            "caption": "奈良公園 實訪寫真 (1)",
            "tag": "神鹿相伴"
          },
          {
            "id": "v6_spot2_02",
            "path": "Photos/奈良公園/IMG_20260824_095826.jpg",
            "caption": "奈良公園 實訪寫真 (2)",
            "tag": "神鹿相伴"
          },
          {
            "id": "v6_spot2_03",
            "path": "Photos/奈良公園/IMG_20260824_095916.jpg",
            "caption": "奈良公園 實訪寫真 (3)",
            "tag": "神鹿相伴"
          },
          {
            "id": "v6_spot2_04",
            "path": "Photos/奈良公園/IMG_20260824_095938.jpg",
            "caption": "奈良公園 實訪寫真 (4)",
            "tag": "神鹿相伴"
          },
          {
            "id": "v6_spot2_05",
            "path": "Photos/奈良公園/IMG_20260824_100224.jpg",
            "caption": "青青草地上的優雅奈良神鹿",
            "tag": "神鹿之友"
          },
          {
            "id": "v6_spot2_06",
            "path": "Photos/奈良公園/IMG_20260824_100252.jpg",
            "caption": "奈良公園 實訪寫真 (6)",
            "tag": "神鹿相伴"
          },
          {
            "id": "v6_spot2_07",
            "path": "Photos/奈良公園/IMG_20260824_100323.jpg",
            "caption": "奈良公園 實訪寫真 (7)",
            "tag": "神鹿相伴"
          },
          {
            "id": "v6_spot2_08",
            "path": "Photos/奈良公園/IMG_20260824_100357.jpg",
            "caption": "奈良公園 實訪寫真 (8)",
            "tag": "神鹿相伴"
          },
          {
            "id": "v6_spot2_09",
            "path": "Photos/奈良公園/IMG_20260824_102041.jpg",
            "caption": "奈良公園 實訪寫真 (9)",
            "tag": "神鹿相伴"
          },
          {
            "id": "v6_spot2_10",
            "path": "Photos/奈良公園/IMG_20260824_103010.jpg",
            "caption": "奈良公園 實訪寫真 (10)",
            "tag": "神鹿相伴"
          },
          {
            "id": "v6_spot2_11",
            "path": "Photos/奈良公園/IMG_20260824_103216.jpg",
            "caption": "奈良公園 實訪寫真 (11)",
            "tag": "神鹿相伴"
          },
          {
            "id": "v6_spot2_12",
            "path": "Photos/奈良公園/IMG_20260824_104227.jpg",
            "caption": "奈良公園 實訪寫真 (12)",
            "tag": "神鹿相伴"
          }
        ]
      },
      {
        "name": "志津香 釜飯",
        "time": "11:00 - 12:00",
        "rating": 2,
        "note": "現點現煮的古法砂鍋飯，鍋底微焦鍋巴香氣撲鼻",
        "heroPhoto": {
          "path": "Photos/志津香/IMG_20260824_112322.jpg",
          "caption": "志津香 傳統石釜燜煮鮮味釜飯",
          "tag": "古法炊飯"
        },
        "photos": [
          {
            "id": "v6_spot3_01",
            "path": "Photos/志津香/IMG_20260824_112322.jpg",
            "caption": "志津香 砂鍋細火燜煮招牌奈良七幸釜飯",
            "tag": "古法炊飯"
          },
          {
            "id": "v6_spot3_02",
            "path": "Photos/志津香/IMG_20260824_112327.jpg",
            "caption": "志津香 實訪寫真 (2)",
            "tag": "古法釜飯"
          },
          {
            "id": "v6_spot3_03",
            "path": "Photos/志津香/IMG_20260824_112820.jpg",
            "caption": "志津香 實訪寫真 (3)",
            "tag": "古法釜飯"
          },
          {
            "id": "v6_spot3_04",
            "path": "Photos/志津香/IMG_20260824_114009.jpg",
            "caption": "志津香 實訪寫真 (4)",
            "tag": "古法釜飯"
          }
        ]
      },
      {
        "name": "東大寺大佛殿",
        "time": "12:10 - 14:30",
        "rating": 4,
        "note": "世界遺產南都七大寺之一，十五米盧舍那大佛莊嚴肅穆",
        "heroPhoto": {
          "path": "Photos/東大寺/IMG_20260824_125156.jpg",
          "caption": "東大寺大佛殿 壯闊木構與金銅鴟尾",
          "tag": "世界遺產"
        },
        "photos": [
          {
            "id": "v6_spot4_01",
            "path": "Photos/東大寺/IMG_20260824_124635.jpg",
            "caption": "東大寺 實訪寫真 (1)",
            "tag": "天平佛殿"
          },
          {
            "id": "v6_spot4_02",
            "path": "Photos/東大寺/IMG_20260824_125156.jpg",
            "caption": "東大寺大佛殿 壯闊木構與金銅鴟尾",
            "tag": "世界遺產"
          },
          {
            "id": "v6_spot4_03",
            "path": "Photos/東大寺/IMG_20260824_125212.jpg",
            "caption": "東大寺 實訪寫真 (3)",
            "tag": "天平佛殿"
          },
          {
            "id": "v6_spot4_04",
            "path": "Photos/東大寺/IMG_20260824_125546.jpg",
            "caption": "東大寺 實訪寫真 (4)",
            "tag": "天平佛殿"
          },
          {
            "id": "v6_spot4_05",
            "path": "Photos/東大寺/IMG_20260824_125901.jpg",
            "caption": "東大寺 實訪寫真 (5)",
            "tag": "天平佛殿"
          },
          {
            "id": "v6_spot4_06",
            "path": "Photos/東大寺/IMG_20260824_130333~2.jpg",
            "caption": "東大寺 實訪寫真 (6)",
            "tag": "天平佛殿"
          },
          {
            "id": "v6_spot4_07",
            "path": "Photos/東大寺/IMG_20260824_130355.jpg",
            "caption": "東大寺 實訪寫真 (7)",
            "tag": "天平佛殿"
          },
          {
            "id": "v6_spot4_08",
            "path": "Photos/東大寺/IMG_20260824_130457.jpg",
            "caption": "東大寺 實訪寫真 (8)",
            "tag": "天平佛殿"
          },
          {
            "id": "v6_spot4_09",
            "path": "Photos/東大寺/IMG_20260824_130540.jpg",
            "caption": "東大寺 實訪寫真 (9)",
            "tag": "天平佛殿"
          },
          {
            "id": "v6_spot4_10",
            "path": "Photos/東大寺/IMG_20260824_130710~2.jpg",
            "caption": "東大寺 實訪寫真 (10)",
            "tag": "天平佛殿"
          },
          {
            "id": "v6_spot4_11",
            "path": "Photos/東大寺/IMG_20260824_130744.jpg",
            "caption": "東大寺 實訪寫真 (11)",
            "tag": "天平佛殿"
          },
          {
            "id": "v6_spot4_12",
            "path": "Photos/東大寺/IMG_20260824_130842.jpg",
            "caption": "東大寺 實訪寫真 (12)",
            "tag": "天平佛殿"
          },
          {
            "id": "v6_spot4_13",
            "path": "Photos/東大寺/IMG_20260824_131937.jpg",
            "caption": "東大寺 實訪寫真 (13)",
            "tag": "天平佛殿"
          },
          {
            "id": "v6_spot4_14",
            "path": "Photos/東大寺/IMG_20260824_131953.jpg",
            "caption": "東大寺 實訪寫真 (14)",
            "tag": "天平佛殿"
          },
          {
            "id": "v6_pudding_01",
            "path": "Photos/大佛布丁/IMG_20260824_121157.jpg",
            "caption": "東大寺參道 排隊名物大佛布丁",
            "tag": "奈良甜味"
          },
          {
            "id": "v6_pudding_02",
            "path": "Photos/大佛布丁/IMG_20260824_121341.jpg",
            "caption": "大佛布丁 實訪寫真 (2)",
            "tag": "名物甜點"
          }
        ]
      },
      {
        "name": "Harbs & Parco",
        "time": "15:00 - 16:45",
        "rating": 3,
        "note": "心齋橋大丸名店，招牌六層鮮切水果千層蛋糕甜潤爽口",
        "heroPhoto": {
          "path": "Photos/Harbs 大丸/IMG_20260824_162354.jpg",
          "caption": "HARBS 鮮切多汁水果千層特寫",
          "tag": "旬果甜點"
        },
        "photos": [
          {
            "id": "v6_spot5_01",
            "path": "Photos/Harbs 大丸/IMG_20260824_161944~2.jpg",
            "caption": "Harbs 大丸 實訪寫真 (1)",
            "tag": "名物蛋糕"
          },
          {
            "id": "v6_spot5_02",
            "path": "Photos/Harbs 大丸/IMG_20260824_162312.jpg",
            "caption": "Harbs 大丸 實訪寫真 (2)",
            "tag": "名物蛋糕"
          },
          {
            "id": "v6_spot5_03",
            "path": "Photos/Harbs 大丸/IMG_20260824_162354.jpg",
            "caption": "HARBS 鮮切多汁水果千層特寫",
            "tag": "旬果甜點"
          },
          {
            "id": "v6_spot5_04",
            "path": "Photos/Harbs 大丸/IMG_20260824_162817.jpg",
            "caption": "Harbs 大丸 實訪寫真 (4)",
            "tag": "名物蛋糕"
          },
          {
            "id": "v6_spot5_05",
            "path": "Photos/Harbs 大丸/IMG_20260824_163818.jpg",
            "caption": "Harbs 大丸 實訪寫真 (5)",
            "tag": "名物蛋糕"
          }
        ]
      },
      {
        "name": "ヨドバシ (Yodobashi)",
        "time": "17:00 - 18:20",
        "rating": 3,
        "note": "大型電器旗艦店巡禮，探索日系最新科技酷品與相機周邊",
        "photos": []
      },
      {
        "name": "ゆかり お好み焼き (Yukari)",
        "time": "19:00 - 20:00",
        "rating": 4,
        "note": "鐵板前現煎大阪燒，蓬鬆厚實佐以太陽蛋炒麵熱氣騰騰",
        "heroPhoto": {
          "path": "Photos/Yukari/IMG_20260824_192549.jpg",
          "caption": "Yukari 鐵板名物・特製大阪燒與太陽蛋炒麵",
          "tag": "鐵板料理"
        },
        "photos": [
          {
            "id": "v6_spot7_01",
            "path": "Photos/Yukari/IMG_20260824_191619.jpg",
            "caption": "Yukari 實訪寫真 (1)",
            "tag": "鐵板燒香"
          },
          {
            "id": "v6_spot7_02",
            "path": "Photos/Yukari/IMG_20260824_191758.jpg",
            "caption": "Yukari 實訪寫真 (2)",
            "tag": "鐵板燒香"
          },
          {
            "id": "v6_spot7_03",
            "path": "Photos/Yukari/IMG_20260824_191846.jpg",
            "caption": "Yukari 實訪寫真 (3)",
            "tag": "鐵板燒香"
          },
          {
            "id": "v6_spot7_04",
            "path": "Photos/Yukari/IMG_20260824_192549.jpg",
            "caption": "Yukari 鐵板名物・特製大阪燒與太陽蛋炒麵",
            "tag": "鐵板料理"
          },
          {
            "id": "v6_spot7_05",
            "path": "Photos/Yukari/IMG_20260824_192657.jpg",
            "caption": "Yukari 實訪寫真 (5)",
            "tag": "鐵板燒香"
          },
          {
            "id": "v6_spot7_06",
            "path": "Photos/Yukari/IMG_20260824_193338.jpg",
            "caption": "Yukari 實訪寫真 (6)",
            "tag": "鐵板燒香"
          },
          {
            "id": "v6_spot7_07",
            "path": "Photos/Yukari/IMG_20260824_193514.jpg",
            "caption": "Yukari 實訪寫真 (7)",
            "tag": "鐵板燒香"
          },
          {
            "id": "v6_spot7_08",
            "path": "Photos/Yukari/IMG_20260824_194534.jpg",
            "caption": "Yukari 實訪寫真 (8)",
            "tag": "鐵板燒香"
          }
        ]
      }
    ]
  },
  {
    "chapterId": "vol-7",
    "volumeRoman": "VOLUME VII",
    "volumeKanji": "卷之七",
    "themeTitle": "京洛幽玄・三嶋和牛與清水落照",
    "themeTitleJp": "京洛幽玄・三嶋亭のすき焼きと清水の夕暮れ",
    "date": "2026-08-25",
    "dayOfWeek": "TUE",
    "location": "京都 (Kyoto)",
    "regionColor": "#6B4C72",
    "pace": "☕ 悠緩漫行",
    "quote": "百年壽喜燒的白糖在鑄鐵八角鍋中融化出甘香，這是京都最老派的奢華；斜陽抹上清水寺懸空舞台的千百根巨木櫸柱，整座京都在晚鐘裡漸染紫霞。",
    "summaryText": "進駐千載古都京都。午間入座寺町三條「三嶋亭」老舖，在塌塌米包廂由女將以江戶古法乾煎特撰黑毛和牛壽喜燒，油脂與白糖甘甜交融。隨後步入祇園八坂神社穿過花見小路，沿二年坂、三年坂拾級而上抵達「清水寺」。立於清水舞台迎著夕風，俯瞰京都盆地萬家燈火初上。夜入先斗町居酒屋「綴」，以炸章魚足與西京烤魚落款。",
    "heroPhoto": {
      "path": "Photos/清水寺 坂道/IMG_20260825_171105_1.jpg",
      "caption": "清水寺 本堂大舞台與夕陽下的京洛全景",
      "tag": "古都絕景"
    },
    "gallery": [
      {
        "id": "v7_01",
        "path": "Photos/三嶋亭/IMG_20260825_112541.jpg",
        "caption": "三嶋亭 極上霜降黑毛和牛盛盤",
        "tag": "百年名宿"
      },
      {
        "id": "v7_02",
        "path": "Photos/三嶋亭/IMG_20260825_113011.jpg",
        "caption": "八角鐵鍋古法煎炙・牛肉焦化甘醇甜香",
        "tag": "職人堂造"
      },
      {
        "id": "v7_03",
        "path": "Photos/八坂神社/IMG_20260825_142359.jpg",
        "caption": "八坂神社 舞殿白燈籠連綿",
        "tag": "祇園信仰"
      },
      {
        "id": "v7_04",
        "path": "Photos/花見小路/IMG_20260825_145711.jpg",
        "caption": "花見小路 千人格子茶屋深巷",
        "tag": "花街風華"
      },
      {
        "id": "v7_05",
        "path": "Photos/清水寺 坂道/IMG_20260825_171105_1.jpg",
        "caption": "清水寺 本堂大舞台與夕陽下的京洛全景",
        "tag": "國寶名剎"
      },
      {
        "id": "v7_06",
        "path": "Photos/Tuzuri/IMG_20260825_201401.jpg",
        "caption": "町家居酒屋「綴」 金黃酥炸海味佐青檸",
        "tag": "町家深夜"
      }
    ],
    "spots": [
      {
        "name": "三嶋屋 (三嶋亭 本店)",
        "time": "11:00 - 13:30",
        "rating": 4,
        "note": "明治六年創業壽喜燒元祖！八角鑄鐵鍋、赤砂糖乾煎頂級黑毛和牛",
        "heroPhoto": {
          "path": "Photos/三嶋亭/IMG_20260825_112541.jpg",
          "caption": "三嶋亭 極上霜降黑毛和牛盛盤",
          "tag": "百年名宿"
        },
        "photos": [
          {
            "id": "v7_mishima_01",
            "path": "Photos/三嶋亭/IMG_20260825_111312.jpg",
            "caption": "三嶋亭 實訪寫真 (1)",
            "tag": "極上和牛"
          },
          {
            "id": "v7_mishima_02",
            "path": "Photos/三嶋亭/IMG_20260825_112101.jpg",
            "caption": "三嶋亭 實訪寫真 (2)",
            "tag": "極上和牛"
          },
          {
            "id": "v7_mishima_03",
            "path": "Photos/三嶋亭/IMG_20260825_112541.jpg",
            "caption": "三嶋亭 極上霜降黑毛和牛盛盤",
            "tag": "百年名宿"
          },
          {
            "id": "v7_mishima_04",
            "path": "Photos/三嶋亭/IMG_20260825_112545.jpg",
            "caption": "三嶋亭 實訪寫真 (4)",
            "tag": "極上和牛"
          },
          {
            "id": "v7_mishima_05",
            "path": "Photos/三嶋亭/IMG_20260825_112729.jpg",
            "caption": "三嶋亭 實訪寫真 (5)",
            "tag": "極上和牛"
          },
          {
            "id": "v7_mishima_06",
            "path": "Photos/三嶋亭/IMG_20260825_112743.jpg",
            "caption": "三嶋亭 實訪寫真 (6)",
            "tag": "極上和牛"
          },
          {
            "id": "v7_mishima_07",
            "path": "Photos/三嶋亭/IMG_20260825_112826.jpg",
            "caption": "三嶋亭 實訪寫真 (7)",
            "tag": "極上和牛"
          },
          {
            "id": "v7_mishima_08",
            "path": "Photos/三嶋亭/IMG_20260825_112914.jpg",
            "caption": "三嶋亭 實訪寫真 (8)",
            "tag": "極上和牛"
          },
          {
            "id": "v7_mishima_09",
            "path": "Photos/三嶋亭/IMG_20260825_113011.jpg",
            "caption": "八角鐵鍋古法煎炙・牛肉焦化甘醇甜香",
            "tag": "職人堂造"
          },
          {
            "id": "v7_mishima_10",
            "path": "Photos/三嶋亭/IMG_20260825_113108.jpg",
            "caption": "三嶋亭 實訪寫真 (10)",
            "tag": "極上和牛"
          },
          {
            "id": "v7_mishima_11",
            "path": "Photos/三嶋亭/IMG_20260825_113340.jpg",
            "caption": "三嶋亭 實訪寫真 (11)",
            "tag": "極上和牛"
          },
          {
            "id": "v7_mishima_12",
            "path": "Photos/三嶋亭/IMG_20260825_113550.jpg",
            "caption": "三嶋亭 實訪寫真 (12)",
            "tag": "極上和牛"
          },
          {
            "id": "v7_mishima_13",
            "path": "Photos/三嶋亭/IMG_20260825_113834.jpg",
            "caption": "三嶋亭 實訪寫真 (13)",
            "tag": "極上和牛"
          },
          {
            "id": "v7_mishima_14",
            "path": "Photos/三嶋亭/IMG_20260825_115507.jpg",
            "caption": "三嶋亭 實訪寫真 (14)",
            "tag": "極上和牛"
          },
          {
            "id": "v7_mishima_15",
            "path": "Photos/三嶋亭/IMG_20260825_121033.jpg",
            "caption": "三嶋亭 實訪寫真 (15)",
            "tag": "極上和牛"
          },
          {
            "id": "v7_mishima_16",
            "path": "Photos/三嶋亭/IMG_20260825_123424.jpg",
            "caption": "三嶋亭 實訪寫真 (16)",
            "tag": "極上和牛"
          },
          {
            "id": "v7_mishima_17",
            "path": "Photos/三嶋亭/IMG_20260825_130729.jpg",
            "caption": "三嶋亭 實訪寫真 (17)",
            "tag": "極上和牛"
          },
          {
            "id": "v7_mishima_18",
            "path": "Photos/三嶋亭/IMG_20260825_131033.jpg",
            "caption": "三嶋亭 實訪寫真 (18)",
            "tag": "極上和牛"
          }
        ]
      },
      {
        "name": "八坂神社",
        "time": "14:00 - 14:30",
        "rating": 4,
        "note": "祇園信仰總本社，舞殿提燈百盞，祈願消災除厄",
        "heroPhoto": {
          "path": "Photos/八坂神社/IMG_20260825_142359.jpg",
          "caption": "八坂神社 舞殿白燈籠連綿",
          "tag": "祇園信仰"
        },
        "photos": [
          {
            "id": "v7_yasaka_01",
            "path": "Photos/八坂神社/IMG_20260825_142359.jpg",
            "caption": "八坂神社 舞殿白燈籠連綿",
            "tag": "祇園信仰"
          },
          {
            "id": "v7_yasaka_02",
            "path": "Photos/八坂神社/IMG_20260825_142546.jpg",
            "caption": "八坂神社 實訪寫真 (2)",
            "tag": "祇園總社"
          },
          {
            "id": "v7_yasaka_03",
            "path": "Photos/八坂神社/IMG_20260825_142610.jpg",
            "caption": "八坂神社 實訪寫真 (3)",
            "tag": "祇園總社"
          }
        ]
      },
      {
        "name": "祇園商店街 よーじや & 花見小路",
        "time": "14:30 - 14:50",
        "rating": 4,
        "note": "走入花見小路木格窗茶屋，造訪名物吸油面紙 よーじや",
        "heroPhoto": {
          "path": "Photos/花見小路/IMG_20260825_145711.jpg",
          "caption": "花見小路 千人格子茶屋深巷",
          "tag": "花街風華"
        },
        "photos": [
          {
            "id": "v7_hanamikoji_01",
            "path": "Photos/花見小路/IMG_20260825_145711.jpg",
            "caption": "花見小路 千人格子茶屋深巷",
            "tag": "花街風華"
          },
          {
            "id": "v7_hanamikoji_02",
            "path": "Photos/花見小路/IMG_20260825_150131.jpg",
            "caption": "花見小路 實訪寫真 (2)",
            "tag": "花街幽境"
          }
        ]
      },
      {
        "name": "清水坂道 ＆ 茶とココア",
        "time": "15:00 - 16:10",
        "rating": 3,
        "note": "沿著產寧坂石板拾級而上，品嚐抹茶與可可香濃飲品",
        "photos": [
          {
            "id": "v7_kiyomizu_01",
            "path": "Photos/清水寺 坂道/IMG_20260825_154307.jpg",
            "caption": "清水寺 坂道 實訪寫真 (1)",
            "tag": "名剎風華"
          },
          {
            "id": "v7_kiyomizu_02",
            "path": "Photos/清水寺 坂道/IMG_20260825_161530.jpg",
            "caption": "清水寺 坂道 實訪寫真 (2)",
            "tag": "名剎風華"
          }
        ]
      },
      {
        "name": "清水寺",
        "time": "16:30 - 18:30",
        "rating": 4,
        "note": "音羽山清水舞台，本堂懸造櫸木立柱，遠眺京洛夕暮落日",
        "heroPhoto": {
          "path": "Photos/清水寺 坂道/IMG_20260825_171105_1.jpg",
          "caption": "清水寺 本堂大舞台與夕陽下的京洛全景",
          "tag": "古都絕景"
        },
        "photos": [
          {
            "id": "v7_kiyomizu_03",
            "path": "Photos/清水寺 坂道/IMG_20260825_161635.jpg",
            "caption": "清水寺 坂道 實訪寫真 (3)",
            "tag": "名剎風華"
          },
          {
            "id": "v7_kiyomizu_04",
            "path": "Photos/清水寺 坂道/IMG_20260825_161738.jpg",
            "caption": "清水寺 坂道 實訪寫真 (4)",
            "tag": "名剎風華"
          },
          {
            "id": "v7_kiyomizu_05",
            "path": "Photos/清水寺 坂道/IMG_20260825_161817.jpg",
            "caption": "清水寺 坂道 實訪寫真 (5)",
            "tag": "名剎風華"
          },
          {
            "id": "v7_kiyomizu_06",
            "path": "Photos/清水寺 坂道/IMG_20260825_162404.jpg",
            "caption": "清水寺 坂道 實訪寫真 (6)",
            "tag": "名剎風華"
          },
          {
            "id": "v7_kiyomizu_07",
            "path": "Photos/清水寺 坂道/IMG_20260825_162516.jpg",
            "caption": "清水寺 坂道 實訪寫真 (7)",
            "tag": "名剎風華"
          },
          {
            "id": "v7_kiyomizu_08",
            "path": "Photos/清水寺 坂道/IMG_20260825_165647.jpg",
            "caption": "清水寺 坂道 實訪寫真 (8)",
            "tag": "名剎風華"
          },
          {
            "id": "v7_kiyomizu_09",
            "path": "Photos/清水寺 坂道/IMG_20260825_170201.jpg",
            "caption": "清水寺 坂道 實訪寫真 (9)",
            "tag": "名剎風華"
          },
          {
            "id": "v7_kiyomizu_10",
            "path": "Photos/清水寺 坂道/IMG_20260825_170752.jpg",
            "caption": "清水寺 坂道 實訪寫真 (10)",
            "tag": "名剎風華"
          },
          {
            "id": "v7_kiyomizu_11",
            "path": "Photos/清水寺 坂道/IMG_20260825_170948.jpg",
            "caption": "清水寺 坂道 實訪寫真 (11)",
            "tag": "名剎風華"
          },
          {
            "id": "v7_kiyomizu_12",
            "path": "Photos/清水寺 坂道/IMG_20260825_171105_1.jpg",
            "caption": "清水寺 本堂大舞台與夕陽下的京洛全景",
            "tag": "古都絕景"
          },
          {
            "id": "v7_kiyomizu_13",
            "path": "Photos/清水寺 坂道/IMG_20260825_174406.jpg",
            "caption": "清水寺 坂道 實訪寫真 (13)",
            "tag": "名剎風華"
          },
          {
            "id": "v7_kiyomizu_14",
            "path": "Photos/清水寺 坂道/IMG_20260825_180455.jpg",
            "caption": "清水寺 坂道 實訪寫真 (14)",
            "tag": "名剎風華"
          },
          {
            "id": "v7_kiyomizu_15",
            "path": "Photos/清水寺 坂道/IMG_20260825_180923.jpg",
            "caption": "清水寺 坂道 實訪寫真 (15)",
            "tag": "名剎風華"
          },
          {
            "id": "v7_kiyomizu_16",
            "path": "Photos/清水寺 坂道/IMG_20260825_180925.jpg",
            "caption": "清水寺 坂道 實訪寫真 (16)",
            "tag": "名剎風華"
          },
          {
            "id": "v7_kiyomizu_17",
            "path": "Photos/清水寺 坂道/IMG_20260825_182401.jpg",
            "caption": "清水寺 坂道 實訪寫真 (17)",
            "tag": "名剎風華"
          },
          {
            "id": "v7_kiyomizu_18",
            "path": "Photos/清水寺 坂道/IMG_20260825_182753.jpg",
            "caption": "清水寺 坂道 實訪寫真 (18)",
            "tag": "名剎風華"
          },
          {
            "id": "v7_kiyomizu_19",
            "path": "Photos/清水寺 坂道/IMG_20260825_182935.jpg",
            "caption": "二年坂暮色漸深・古町燈火與金黃夕陽天際線",
            "tag": "暮色老街"
          },
          {
            "id": "v7_kiyomizu_20",
            "path": "Photos/清水寺 坂道/IMG_20260825_183258.jpg",
            "caption": "清水寺 坂道 實訪寫真 (20)",
            "tag": "名剎風華"
          }
        ]
      },
      {
        "name": "綴 (Tuzuri 町家居酒屋)",
        "time": "20:00 - 20:45",
        "rating": 4,
        "note": "京都隱密京料理居酒屋，酥炸鮮魷唐揚與銀鱈西京燒",
        "heroPhoto": {
          "path": "Photos/Tuzuri/IMG_20260825_201401.jpg",
          "caption": "町家居酒屋「綴」 金黃酥炸海味佐青檸",
          "tag": "町家深夜"
        },
        "photos": [
          {
            "id": "v7_tuzuri_01",
            "path": "Photos/Tuzuri/IMG_20260825_201401.jpg",
            "caption": "町家居酒屋「綴」 金黃酥炸海味佐青檸",
            "tag": "町家深夜"
          },
          {
            "id": "v7_tuzuri_02",
            "path": "Photos/Tuzuri/IMG_20260825_201406.jpg",
            "caption": "Tuzuri 實訪寫真 (2)",
            "tag": "町家美食"
          },
          {
            "id": "v7_tuzuri_03",
            "path": "Photos/Tuzuri/IMG_20260825_201506.jpg",
            "caption": "Tuzuri 實訪寫真 (3)",
            "tag": "町家美食"
          },
          {
            "id": "v7_tuzuri_04",
            "path": "Photos/Tuzuri/IMG_20260825_202004.jpg",
            "caption": "Tuzuri 實訪寫真 (4)",
            "tag": "町家美食"
          },
          {
            "id": "v7_tuzuri_05",
            "path": "Photos/Tuzuri/IMG_20260825_202307.jpg",
            "caption": "Tuzuri 實訪寫真 (5)",
            "tag": "町家美食"
          }
        ]
      }
    ]
  },
  {
    "chapterId": "vol-8",
    "volumeRoman": "VOLUME VIII",
    "volumeKanji": "卷之八",
    "themeTitle": "湖山水色・近江童話與水中鳥居",
    "themeTitleJp": "湖山水色・近江ラコリーナと白髭の夕陽",
    "date": "2026-08-26",
    "dayOfWeek": "WED",
    "location": "滋賀近江八幡・彥根・琵琶湖 (Shiga)",
    "regionColor": "#1D7A73",
    "pace": "剛剛好",
    "quote": "藤森照信的草屋根如同吉卜力童話走入現實；當我們駕車沿著琵琶湖岸奔馳，白鬚神社的水中鳥居正沐浴在橙紅的落日熔金之中。",
    "summaryText": "展開滋賀深度自駕巡行。造訪近江八幡「La Collina」，在草木綠意間品嚐剛出爐的 Club Harie 年輪蛋糕；於千成亭品嚐油脂芬芳的近江牛，登臨國寶彥根城俯瞰城壕；傍晚沿琵琶湖公路疾馳至白鬚神社，捕捉湖中朱紅鳥居最壯麗的日落餘暉，返京後在第一旭拉麵大口吃肉！",
    "heroPhoto": {
      "path": "Photos/白鬚神社 水中鳥居/IMG_20260826_175039.jpg",
      "caption": "白鬚神社 琵琶湖中大鳥居 波光粼粼與水天一色",
      "tag": "湖中神蹟"
    },
    "gallery": [
      {
        "id": "v8_01",
        "path": "Photos/Club Harie/IMG_20260826_104239.jpg",
        "caption": "La Collina 藤森照信設計綠意草屋根",
        "tag": "童話建築"
      },
      {
        "id": "v8_02",
        "path": "Photos/千成亭/IMG_20260826_121220.jpg",
        "caption": "千成亭 頂級近江和牛料理盛席",
        "tag": "名產和牛"
      },
      {
        "id": "v8_03",
        "path": "Photos/彥根城/IMG_20260826_153818.jpg",
        "caption": "彥根城名勝庭院造景寫意",
        "tag": "國寶古城"
      },
      {
        "id": "v8_04",
        "path": "Photos/琵琶湖/IMG_20260826_155607.jpg",
        "caption": "開車奔馳於琵琶湖畔之無垠水天",
        "tag": "湖畔公路"
      },
      {
        "id": "v8_05",
        "path": "Photos/白鬚神社 水中鳥居/IMG_20260826_175039.jpg",
        "caption": "白鬚神社 琵琶湖中大鳥居 波光粼粼與水天一色",
        "tag": "湖中神蹟"
      },
      {
        "id": "v8_06",
        "path": "Photos/第一旭/IMG_20260826_210751.jpg",
        "caption": "京都本家第一旭 鋪滿厚切叉燒的熱騰拉麵",
        "tag": "老舖拉麵"
      }
    ],
    "spots": [
      {
        "name": "ラーコリナ (La Collina 近江八幡)",
        "time": "11:00 - 11:45",
        "rating": 5,
        "note": "建築名師藤森照信草屋根吉卜力建築，Club Harie 剛出爐年輪蛋糕",
        "heroPhoto": {
          "path": "Photos/Club Harie/IMG_20260826_104239.jpg",
          "caption": "La Collina 藤森照信設計綠意草屋根",
          "tag": "童話建築"
        },
        "photos": [
          {
            "id": "v8_spot1_01",
            "path": "Photos/Club Harie/IMG_20260826_104239.jpg",
            "caption": "La Collina 藤森照信設計綠意草屋根",
            "tag": "童話建築"
          },
          {
            "id": "v8_spot1_02",
            "path": "Photos/Club Harie/IMG_20260826_104243.jpg",
            "caption": "Club Harie 實訪寫真 (2)",
            "tag": "草屋童話"
          },
          {
            "id": "v8_spot1_03",
            "path": "Photos/Club Harie/IMG_20260826_105512.jpg",
            "caption": "Club Harie 實訪寫真 (3)",
            "tag": "草屋童話"
          },
          {
            "id": "v8_spot1_04",
            "path": "Photos/Club Harie/IMG_20260826_110149.jpg",
            "caption": "Club Harie 實訪寫真 (4)",
            "tag": "草屋童話"
          },
          {
            "id": "v8_spot1_05",
            "path": "Photos/Club Harie/IMG_20260826_110156.jpg",
            "caption": "Club Harie 實訪寫真 (5)",
            "tag": "草屋童話"
          },
          {
            "id": "v8_spot1_06",
            "path": "Photos/Club Harie/IMG_20260826_110217.jpg",
            "caption": "Club Harie 實訪寫真 (6)",
            "tag": "草屋童話"
          }
        ]
      },
      {
        "name": "千成屋 (千成亭 近江牛)",
        "time": "12:00 - 13:00",
        "rating": 3,
        "note": "日本三大和牛近江牛專門店，油脂融點極低、入口即化",
        "heroPhoto": {
          "path": "Photos/千成亭/IMG_20260826_121220.jpg",
          "caption": "千成亭 頂級近江和牛料理盛席",
          "tag": "名產和牛"
        },
        "photos": [
          {
            "id": "v8_spot2_01",
            "path": "Photos/千成亭/IMG_20260826_121220.jpg",
            "caption": "千成亭 頂級近江和牛料理盛席",
            "tag": "名產和牛"
          },
          {
            "id": "v8_spot2_02",
            "path": "Photos/千成亭/IMG_20260826_121227.jpg",
            "caption": "千成亭 實訪寫真 (2)",
            "tag": "近江和牛"
          },
          {
            "id": "v8_spot2_03",
            "path": "Photos/千成亭/IMG_20260826_121307.jpg",
            "caption": "千成亭 實訪寫真 (3)",
            "tag": "近江和牛"
          },
          {
            "id": "v8_spot2_04",
            "path": "Photos/千成亭/IMG_20260826_121521.jpg",
            "caption": "千成亭 實訪寫真 (4)",
            "tag": "近江和牛"
          },
          {
            "id": "v8_spot2_05",
            "path": "Photos/千成亭/IMG_20260826_121536.jpg",
            "caption": "千成亭 實訪寫真 (5)",
            "tag": "近江和牛"
          },
          {
            "id": "v8_spot2_06",
            "path": "Photos/千成亭/IMG_20260826_121601.jpg",
            "caption": "千成亭 實訪寫真 (6)",
            "tag": "近江和牛"
          },
          {
            "id": "v8_spot2_mart",
            "path": "Photos/超市近江牛.jpg",
            "caption": "滋賀在地 Friend Mart 超市 A5 近江牛鮮肉盒裝",
            "tag": "在地生活"
          }
        ]
      },
      {
        "name": "日牟禮八幡宮",
        "time": "13:00 - 13:20",
        "rating": 3,
        "note": "近江商人信仰中心，古木參天，八幡山纜車下寧靜神社",
        "heroPhoto": {
          "path": "Photos/八幡宮/IMG_20260826_130649.jpg",
          "caption": "日牟禮八幡宮 近江商人守護神與朱紅本殿樓門",
          "tag": "古社風範"
        },
        "photos": [
          {
            "id": "v8_spot3_01",
            "path": "Photos/八幡宮/IMG_20260826_120154.jpg",
            "caption": "八幡宮 實訪寫真 (1)",
            "tag": "古社幽徑"
          },
          {
            "id": "v8_spot3_02",
            "path": "Photos/八幡宮/IMG_20260826_130649.jpg",
            "caption": "日牟禮八幡宮 近江商人守護神與朱紅本殿樓門",
            "tag": "古社神韻"
          },
          {
            "id": "v8_spot3_03",
            "path": "Photos/八幡宮/IMG_20260826_130818.jpg",
            "caption": "八幡宮 實訪寫真 (3)",
            "tag": "古社幽徑"
          }
        ]
      },
      {
        "name": "彥根城",
        "time": "14:30 - 15:30",
        "rating": 3,
        "note": "江戶時代井伊直政所築，現存十二天守之一，三重牛蒡積石垣",
        "heroPhoto": {
          "path": "Photos/彥根城/IMG_20260826_145347.jpg",
          "caption": "國寶彥根城三重天守閣之雄姿",
          "tag": "國寶古城"
        },
        "photos": [
          {
            "id": "v8_spot4_01",
            "path": "Photos/彥根城/IMG_20260826_145347.jpg",
            "caption": "國寶彥根城三重天守閣之雄姿",
            "tag": "國寶古城"
          },
          {
            "id": "v8_spot4_02",
            "path": "Photos/彥根城/IMG_20260826_145521.jpg",
            "caption": "彥根城 實訪寫真 (2)",
            "tag": "國寶名城"
          },
          {
            "id": "v8_spot4_03",
            "path": "Photos/彥根城/IMG_20260826_151144.jpg",
            "caption": "彥根城 實訪寫真 (3)",
            "tag": "國寶名城"
          },
          {
            "id": "v8_spot4_04",
            "path": "Photos/彥根城/IMG_20260826_151301.jpg",
            "caption": "彥根城 實訪寫真 (4)",
            "tag": "國寶名城"
          },
          {
            "id": "v8_spot4_05",
            "path": "Photos/彥根城/IMG_20260826_151532.jpg",
            "caption": "彥根城 實訪寫真 (5)",
            "tag": "國寶名城"
          },
          {
            "id": "v8_spot4_06",
            "path": "Photos/彥根城/IMG_20260826_152632.jpg",
            "caption": "彥根城 實訪寫真 (6)",
            "tag": "國寶名城"
          },
          {
            "id": "v8_spot4_07",
            "path": "Photos/彥根城/IMG_20260826_153229.jpg",
            "caption": "彥根城 實訪寫真 (7)",
            "tag": "國寶名城"
          },
          {
            "id": "v8_spot4_08",
            "path": "Photos/彥根城/IMG_20260826_153422.jpg",
            "caption": "彥根城 實訪寫真 (8)",
            "tag": "國寶名城"
          },
          {
            "id": "v8_spot4_09",
            "path": "Photos/彥根城/IMG_20260826_153433.jpg",
            "caption": "彥根城 實訪寫真 (9)",
            "tag": "國寶名城"
          },
          {
            "id": "v8_spot4_10",
            "path": "Photos/彥根城/IMG_20260826_153434.jpg",
            "caption": "彥根城 實訪寫真 (10)",
            "tag": "國寶名城"
          },
          {
            "id": "v8_spot4_11",
            "path": "Photos/彥根城/IMG_20260826_153501.jpg",
            "caption": "彥根城 實訪寫真 (11)",
            "tag": "國寶名城"
          },
          {
            "id": "v8_spot4_12",
            "path": "Photos/彥根城/IMG_20260826_153559.jpg",
            "caption": "彥根城 實訪寫真 (12)",
            "tag": "國寶名城"
          },
          {
            "id": "v8_spot4_13",
            "path": "Photos/彥根城/IMG_20260826_153818.jpg",
            "caption": "彥根城 實訪寫真 (13)",
            "tag": "國寶名城"
          }
        ]
      },
      {
        "name": "琵琶湖 (沿湖自駕)",
        "time": "16:00 - 17:20",
        "rating": 4,
        "note": "日本第一大湖，沿湖畔公路疾馳，浩渺湖面如海無垠",
        "heroPhoto": {
          "path": "Photos/琵琶湖/IMG_20260826_155607.jpg",
          "caption": "開車奔馳於琵琶湖畔之無垠水天",
          "tag": "湖畔公路"
        },
        "photos": [
          {
            "id": "v8_spot5_01",
            "path": "Photos/琵琶湖/IMG_20260826_155607.jpg",
            "caption": "開車奔馳於琵琶湖畔之無垠水天",
            "tag": "湖畔公路"
          },
          {
            "id": "v8_spot5_02",
            "path": "Photos/琵琶湖/IMG_20260826_155612.jpg",
            "caption": "琵琶湖 實訪寫真 (2)",
            "tag": "近江水天"
          },
          {
            "id": "v8_spot5_03",
            "path": "Photos/琵琶湖/IMG_20260826_155628.jpg",
            "caption": "琵琶湖 實訪寫真 (3)",
            "tag": "近江水天"
          },
          {
            "id": "v8_spot5_04",
            "path": "Photos/琵琶湖/IMG_20260826_161713.jpg",
            "caption": "琵琶湖 實訪寫真 (4)",
            "tag": "近江水天"
          },
          {
            "id": "v8_spot5_05",
            "path": "Photos/琵琶湖/IMG_20260826_163134.jpg",
            "caption": "琵琶湖 實訪寫真 (5)",
            "tag": "近江水天"
          },
          {
            "id": "v8_spot5_06",
            "path": "Photos/琵琶湖/IMG_20260826_165800.jpg",
            "caption": "琵琶湖 實訪寫真 (6)",
            "tag": "近江水天"
          },
          {
            "id": "v8_spot5_07",
            "path": "Photos/琵琶湖/IMG_20260826_170015.jpg",
            "caption": "琵琶湖 實訪寫真 (7)",
            "tag": "近江水天"
          },
          {
            "id": "v8_spot5_08",
            "path": "Photos/琵琶湖/IMG_20260826_170023.jpg",
            "caption": "琵琶湖 實訪寫真 (8)",
            "tag": "近江水天"
          },
          {
            "id": "v8_spot5_09",
            "path": "Photos/琵琶湖/IMG_20260826_170023_1.jpg",
            "caption": "琵琶湖 實訪寫真 (9)",
            "tag": "近江水天"
          }
        ]
      },
      {
        "name": "白鬚神社 (水中鳥居)",
        "time": "17:30 - 18:00",
        "rating": 2,
        "note": "近江之嚴島！矗立於琵琶湖面之朱紅大鳥居，落日金霞絕景",
        "heroPhoto": {
          "path": "Photos/白鬚神社 水中鳥居/IMG_20260826_175039.jpg",
          "caption": "白鬚神社 琵琶湖中大鳥居 波光粼粼與水天一色",
          "tag": "湖中神蹟"
        },
        "photos": [
          {
            "id": "v8_spot6_01",
            "path": "Photos/白鬚神社 水中鳥居/IMG_20260826_174636.jpg",
            "caption": "白鬚神社 水中鳥居 實訪寫真 (1)",
            "tag": "湖中神蹟"
          },
          {
            "id": "v8_spot6_02",
            "path": "Photos/白鬚神社 水中鳥居/IMG_20260826_174657.jpg",
            "caption": "白鬚神社 水中鳥居 實訪寫真 (2)",
            "tag": "湖中神蹟"
          },
          {
            "id": "v8_spot6_03",
            "path": "Photos/白鬚神社 水中鳥居/IMG_20260826_174748.jpg",
            "caption": "白鬚神社 水中鳥居 實訪寫真 (3)",
            "tag": "湖中神蹟"
          },
          {
            "id": "v8_spot6_04",
            "path": "Photos/白鬚神社 水中鳥居/IMG_20260826_174944.jpg",
            "caption": "白鬚神社 水中鳥居 實訪寫真 (4)",
            "tag": "湖中神蹟"
          },
          {
            "id": "v8_spot6_05",
            "path": "Photos/白鬚神社 水中鳥居/IMG_20260826_175039.jpg",
            "caption": "白鬚神社 琵琶湖中大鳥居 波光粼粼與水天一色",
            "tag": "湖中神蹟"
          },
          {
            "id": "v8_spot6_06",
            "path": "Photos/白鬚神社 水中鳥居/IMG_20260826_175128.jpg",
            "caption": "白鬚神社 水中鳥居 實訪寫真 (6)",
            "tag": "湖中神蹟"
          },
          {
            "id": "v8_spot6_07",
            "path": "Photos/白鬚神社 水中鳥居/IMG_20260826_175237.jpg",
            "caption": "白鬚神社 水中鳥居 實訪寫真 (7)",
            "tag": "湖中神蹟"
          },
          {
            "id": "v8_spot6_08",
            "path": "Photos/白鬚神社 水中鳥居/IMG_20260826_175449.jpg",
            "caption": "白鬚神社 手水舍 靈龍吐水與木勺水波",
            "tag": "靈泉手水"
          },
          {
            "id": "v8_spot6_09",
            "path": "Photos/白鬚神社 水中鳥居/IMG_20260826_175606.jpg",
            "caption": "白鬚神社 水中鳥居 實訪寫真 (9)",
            "tag": "湖中神蹟"
          },
          {
            "id": "v8_spot6_10",
            "path": "Photos/白鬚神社 水中鳥居/IMG_20260826_175724.jpg",
            "caption": "白鬚神社 水中鳥居 實訪寫真 (10)",
            "tag": "湖中神蹟"
          },
          {
            "id": "v8_spot6_11",
            "path": "Photos/白鬚神社 水中鳥居/IMG_20260826_175850.jpg",
            "caption": "白鬚神社 水中鳥居 實訪寫真 (11)",
            "tag": "湖中神蹟"
          },
          {
            "id": "v8_spot6_12",
            "path": "Photos/白鬚神社 水中鳥居/IMG_20260826_175922.jpg",
            "caption": "白鬚神社 水中鳥居 實訪寫真 (12)",
            "tag": "湖中神蹟"
          }
        ]
      },
      {
        "name": "フレンドマート (Friend Mart)",
        "time": "18:40 - 18:50",
        "rating": 4,
        "note": "滋賀在地超市採買，近江牛便宜大份",
        "heroPhoto": {
          "path": "Photos/超市近江牛.jpg",
          "caption": "超市特價近江牛 在地感十足",
          "tag": "在地超市"
        },
        "photos": [
          {
            "id": "v8_spot7_01",
            "path": "Photos/超市近江牛.jpg",
            "caption": "戰利品近江牛",
            "tag": "近江牛"
          }
        ]
      },
      {
        "name": "本家 第一旭 烏丸",
        "time": "21:00 - 21:30",
        "rating": 4,
        "note": "京都車站人氣排隊豚骨醬油拉麵，厚切叉燒與九條蔥鋪滿海量",
        "heroPhoto": {
          "path": "Photos/第一旭/IMG_20260826_210751.jpg",
          "caption": "京都本家第一旭 鋪滿厚切叉燒的熱騰拉麵",
          "tag": "老舖拉麵"
        },
        "photos": [
          {
            "id": "v8_spot8_01",
            "path": "Photos/第一旭/IMG_20260826_210751.jpg",
            "caption": "京都本家第一旭 鋪滿厚切叉燒的熱騰拉麵",
            "tag": "老舖拉麵"
          },
          {
            "id": "v8_spot8_02",
            "path": "Photos/第一旭/IMG_20260826_210816.jpg",
            "caption": "第一旭 實訪寫真 (2)",
            "tag": "老舖拉麵"
          }
        ]
      }
    ]
  },
  {
    "chapterId": "vol-9",
    "volumeRoman": "VOLUME IX",
    "volumeKanji": "卷之九",
    "themeTitle": "金碧殘陽・盛夏收官與元祖之味",
    "themeTitleJp": "金碧残陽・金閣寺の輝きと北極星のオムライス",
    "date": "2026-08-27",
    "dayOfWeek": "THU",
    "location": "京都 & 大阪 (Kyoto & Osaka)",
    "regionColor": "#C69A45",
    "pace": "☕ 悠緩漫行",
    "quote": "舍利殿的金箔在盛夏的正午灼灼燃燒，倒映在鏡湖池中如同不滅的禪心；最後一口元祖蛋包飯的滑嫩溫柔，滿載九日回憶完美結卷。",
    "summaryText": "行旅終章。晨抵鹿苑寺，仰望金閣三層舍利殿在晴空下爍爍生輝，池畔松柏相襯，頂端金青銅鳳凰傲視蒼穹。午後漫步平安神宮千坪白砂與朱紅應天門。傍晚返回大阪心齋橋，入座百年老宅「北極星」，品嚐大正十一年元祖薄皮蛋包飯；夜眺京都塔純白燈柱，九日繪卷圓滿落款。",
    "heroPhoto": {
      "path": "Photos/平安神宮/IMG_20260827_125010.jpg",
      "caption": "平安神宮 應天門與千坪白砂庭院",
      "tag": "神宮雄姿"
    },
    "gallery": [
      {
        "id": "v9_01",
        "path": "Photos/金閣寺/IMG_20260827_112902.jpg",
        "caption": "近觀金閣 頂端振翅欲飛之鍍金青銅鳳凰",
        "tag": "國寶工藝"
      },
      {
        "id": "v9_02",
        "path": "Photos/平安神宮/IMG_20260827_131201.jpg",
        "caption": "大極殿蒼松與朱紅殿廊交織",
        "tag": "古都名勝"
      },
      {
        "id": "v9_03",
        "path": "Photos/平安神宮/IMG_20260827_131815.jpg",
        "caption": "平安神宮 大鳥居",
        "tag": "神社建築"
      },
      {
        "id": "v9_04",
        "path": "Photos/北極星/IMG_20260827_185200.jpg",
        "caption": "北極星本店 元祖滑嫩蛋包飯佐金黃炸蝦",
        "tag": "元祖洋食"
      },
      {
        "id": "v9_05",
        "path": "Photos/北極星/IMG_20260827_183326.jpg",
        "caption": "北極星 和風榻榻米老宅庭院內廊光影",
        "tag": "百年老舖"
      },
      {
        "id": "v9_06",
        "path": "Photos/京都塔.jpg",
        "caption": "夜色中綻放無瑕白光的京都塔",
        "tag": "古都夜色"
      }
    ],
    "spots": [
      {
        "name": "金閣寺",
        "time": "11:00 - 12:00",
        "rating": 3,
        "note": "足利義滿將軍所建，金箔三層舍利殿、鏡湖池倒影與金青銅鳳凰",
        "heroPhoto": {
          "path": "Photos/金閣寺/IMG_20260827_111809.jpg",
          "caption": "金閣寺 金箔舍利殿倒映鏡湖池",
          "tag": "天下名剎"
        },
        "photos": [
          {
            "id": "v9_spot1_01",
            "path": "Photos/金閣寺/IMG_20260827_111809.jpg",
            "caption": "金閣寺 金箔舍利殿倒映鏡湖池",
            "tag": "天下名剎"
          },
          {
            "id": "v9_spot1_02",
            "path": "Photos/金閣寺/IMG_20260827_111847.jpg",
            "caption": "金閣寺 實訪寫真 (2)",
            "tag": "天下名剎"
          },
          {
            "id": "v9_spot1_03",
            "path": "Photos/金閣寺/IMG_20260827_111908.jpg",
            "caption": "金閣寺 實訪寫真 (3)",
            "tag": "天下名剎"
          },
          {
            "id": "v9_spot1_04",
            "path": "Photos/金閣寺/IMG_20260827_112207.jpg",
            "caption": "金閣寺 實訪寫真 (4)",
            "tag": "天下名剎"
          },
          {
            "id": "v9_spot1_05",
            "path": "Photos/金閣寺/IMG_20260827_112218.jpg",
            "caption": "金閣寺 實訪寫真 (5)",
            "tag": "天下名剎"
          },
          {
            "id": "v9_spot1_06",
            "path": "Photos/金閣寺/IMG_20260827_112902.jpg",
            "caption": "近觀金閣 頂端振翅欲飛之鍍金青銅鳳凰",
            "tag": "國寶工藝"
          },
          {
            "id": "v9_spot1_07",
            "path": "Photos/金閣寺/IMG_20260827_113947.jpg",
            "caption": "金閣寺 實訪寫真 (7)",
            "tag": "天下名剎"
          },
          {
            "id": "v9_spot1_08",
            "path": "Photos/金閣寺/IMG_20260827_114156.jpg",
            "caption": "金閣寺境內 數寄屋造名茶室「夕佳亭」",
            "tag": "名茶室"
          }
        ]
      },
      {
        "name": "平安神宮",
        "time": "13:00 - 13:30",
        "rating": 4,
        "note": "平安遷都1100年紀念，巨型朱紅大鳥居、大極殿與白砂中庭",
        "heroPhoto": {
          "path": "Photos/平安神宮/IMG_20260827_125010.jpg",
          "caption": "平安神宮 應天門與千坪白砂庭院",
          "tag": "神宮雄姿"
        },
        "photos": [
          {
            "id": "v9_spot2_01",
            "path": "Photos/平安神宮/IMG_20260827_125010.jpg",
            "caption": "平安神宮 應天門與千坪白砂庭院",
            "tag": "神宮雄姿"
          },
          {
            "id": "v9_spot2_02",
            "path": "Photos/平安神宮/IMG_20260827_125017.jpg",
            "caption": "平安神宮 實訪寫真 (2)",
            "tag": "神宮雄姿"
          },
          {
            "id": "v9_spot2_03",
            "path": "Photos/平安神宮/IMG_20260827_130156.jpg",
            "caption": "平安神宮 實訪寫真 (3)",
            "tag": "神宮雄姿"
          },
          {
            "id": "v9_spot2_04",
            "path": "Photos/平安神宮/IMG_20260827_130200.jpg",
            "caption": "平安神宮 實訪寫真 (4)",
            "tag": "神宮雄姿"
          },
          {
            "id": "v9_spot2_05",
            "path": "Photos/平安神宮/IMG_20260827_130636.jpg",
            "caption": "平安神宮 實訪寫真 (5)",
            "tag": "神宮雄姿"
          },
          {
            "id": "v9_spot2_06",
            "path": "Photos/平安神宮/IMG_20260827_131151.jpg",
            "caption": "平安神宮 實訪寫真 (6)",
            "tag": "神宮雄姿"
          },
          {
            "id": "v9_spot2_07",
            "path": "Photos/平安神宮/IMG_20260827_131201.jpg",
            "caption": "大極殿蒼松與朱紅殿廊交織",
            "tag": "古都名勝"
          },
          {
            "id": "v9_spot2_08",
            "path": "Photos/平安神宮/IMG_20260827_131216.jpg",
            "caption": "平安神宮 實訪寫真 (8)",
            "tag": "神宮雄姿"
          },
          {
            "id": "v9_spot2_09",
            "path": "Photos/平安神宮/IMG_20260827_131815.jpg",
            "caption": "平安神宮 實訪寫真 (9)",
            "tag": "神宮雄姿"
          }
        ]
      },
      {
        "name": "北極星",
        "time": "18:00 - 19:00",
        "rating": 3,
        "note": "大正十一年創業！日本洋食元祖蛋包飯，純日式庭院榻榻米名店",
        "heroPhoto": {
          "path": "Photos/北極星/IMG_20260827_185200.jpg",
          "caption": "北極星本店 元祖滑嫩蛋包飯佐金黃炸蝦",
          "tag": "元祖洋食"
        },
        "photos": [
          {
            "id": "v9_spot3_01",
            "path": "Photos/北極星/IMG_20260827_183326.jpg",
            "caption": "北極星 和風榻榻米老宅庭院內廊光影",
            "tag": "百年老舖"
          },
          {
            "id": "v9_spot3_02",
            "path": "Photos/北極星/IMG_20260827_183330.jpg",
            "caption": "北極星 實訪寫真 (2)",
            "tag": "元祖洋食"
          },
          {
            "id": "v9_spot3_03",
            "path": "Photos/北極星/IMG_20260827_185111.jpg",
            "caption": "北極星 實訪寫真 (3)",
            "tag": "元祖洋食"
          },
          {
            "id": "v9_spot3_04",
            "path": "Photos/北極星/IMG_20260827_185154.jpg",
            "caption": "北極星 實訪寫真 (4)",
            "tag": "元祖洋食"
          },
          {
            "id": "v9_spot3_05",
            "path": "Photos/北極星/IMG_20260827_185200.jpg",
            "caption": "北極星本店 元祖滑嫩蛋包飯佐金黃炸蝦",
            "tag": "元祖洋食"
          },
          {
            "id": "v9_spot3_06",
            "path": "Photos/北極星/IMG_20260827_185445.jpg",
            "caption": "北極星 實訪寫真 (6)",
            "tag": "元祖洋食"
          }
        ]
      },
      {
        "name": "京都塔",
        "time": "20:00~",
        "rating": 4,
        "note": "京都站前純白無瑕燈塔，照亮古都九日巡行歸途",
        "heroPhoto": {
          "path": "Photos/京都塔.jpg",
          "caption": "夜色中綻放無瑕白光的京都塔",
          "tag": "古都夜色"
        },
        "photos": [
          {
            "id": "v9_spot4_01",
            "path": "Photos/京都塔.jpg",
            "caption": "夜色中綻放無瑕白光的京都塔",
            "tag": "古都夜色"
          }
        ]
      }
    ]
  }
];

if (typeof window !== 'undefined') {
  window.MAGAZINE_METADATA = MAGAZINE_METADATA;
  window.MAGAZINE_CHAPTERS = MAGAZINE_CHAPTERS;
}
