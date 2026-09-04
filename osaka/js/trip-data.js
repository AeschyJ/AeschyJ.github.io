/**
 * TabiSync Trip Data (旅の栞・名阪京奈 夏日巡行手帖 官方行程資料集)
 * 包含 11 天完整每日排定行程、隨行地圖座標、風土名所指南與旬味名店
 * 每個景點皆配置 100% 真實地標、國寶建築、球場與名物料理直連 CDN 寫真
 */
window.DEFAULT_TRIP_DATA = {
  "id": "japan-trip-2026-aug",
  "schemaVersion": "3.8.0-authentic-photos",
  "title": "2026 名古屋・大阪・奈良・京都盛夏漫遊",
  "subtitle": "11天10夜 國寶雙城・日職三大戰・頂級名物美食・古都寺院與私房探索",
  "notebookUrl": "https://notebooklm.google.com/notebook/08eca98d-dac6-43a7-815e-4a0245b56e35",
  "coverImage": "./assets/images/hero.jpg",
  "hotelInfo": {
    "name": "大阪阪神飯店 (Hotel Hanshin Osaka)",
    "address": "大阪市福島區福島5丁目6-16",
    "dates": "8/21 (五) ~ 8/25 (二) 連續 5 晚住宿基地",
    "coords": [
      34.6975,
      135.4878
    ],
    "googleMaps": "https://maps.app.goo.gl/6jYd7QmqnLscha826",
    "features": "客房引入地下千米天然溫泉水、JR福島站直結"
  },
  "dateRange": {
    "startDate": "2026-08-19",
    "endDate": "2026-08-29",
    "totalDays": 11
  },
  "currencyConfig": {
    "baseCurrency": "TWD",
    "targetCurrency": "JPY",
    "exchangeRate": 0.215
  },
  "emergencyInfo": {
    "police": "110",
    "ambulance": "119",
    "jntoHotline": "050-3816-2788 (JNTO 24小時多語言緊急支援)",
    "taipeiOffice": "台北駐大阪經濟文化辦事處 (+81-90-3563-3566)"
  },
  "days": [
    {
      "dayIndex": 1,
      "date": "2026-08-19",
      "dayOfWeek": "WED",
      "location": "名古屋",
      "coverImg": "assets/images/nagoya.jpg",
      "theme": "抵達名古屋・綠洲21水之宇宙船與電視塔百萬夜景",
      "summary": "抵達名古屋後漫步久屋大通公園，登上「綠洲21水之宇宙船」，晚間品嚐「世界的山將手羽先」，登上中部電力 MIRAI TOWER 欣賞百萬夜景。",
      "weather": {
        "desc": "晴時多雲",
        "high": 33,
        "low": 26,
        "rain": 10,
        "icon": "🌆"
      },
      "mapCenter": [
        35.1709,
        136.9085
      ],
      "mapZoom": 15,
      "spots": [
        {
          "id": "d1_spot1",
          "name": "久屋大通公園 & 綠洲21",
          "nameJp": "久屋大通公園・オアシス21 水の宇宙船",
          "isScheduled": true,
          "category": "attraction",
          "order": 1,
          "time": "15:00 - 17:00",
          "coords": [
            35.1709,
            136.9085
          ],
          "tag": "絕美水景地標",
          "address": "愛知縣名古屋市東區東櫻1丁目11-1",
          "googleMaps": "https://www.google.com/maps/search/?api=1&query=愛知県名古屋市東区東桜1丁目11-1",
          "description": "榮商圈指標地標，巨大橢圓形懸浮玻璃頂「水之宇宙船」，頂層有清涼流動水池倒映天空與電視塔。",
          "highlights": [
            "巨大橢圓形玻璃頂棚與流動水池",
            "日落與夜間點燈時宛如漂浮宇宙船",
            "B1 直通榮町地下街購物與美食"
          ],
          "photoTip": "從水之宇宙船頂端步道以低角度拍向電視塔，能拍出水面與光影倒影。",
          "hours": "10:00 - 21:00 (免費登頂)",
          "phrases": [
            {
              "scenario": "詢問水之宇宙船入口方向",
              "japanese": "水の宇宙船の入り口はどこですか？",
              "romaji": "Mizu no uchuusen no iriguchi wa doko desu ka?",
              "chinese": "請問水之宇宙船的入口在哪裡？",
              "audio": "水の宇宙船の入り口はどこですか？"
            }
          ],
          "fullStory": [
            "【綠洲21與水之宇宙船建築美學】綠洲21於2002年落成，由日本建築名家操刀，以『環保生態與立體空中花園』為核心概念。最吸睛的頂層『水之宇宙船』長 106 公尺、寬 36 公尺，由 14 根傾斜鋼柱支撐懸浮於離地 14 米空中，宛如一艘停泊在榮商圈上空的巨型透明宇宙飛船。",
            "【物理水景與微氣候調節】玻璃屋頂中央蓄積著深約 10 公分的清涼流動水池，水流波紋不僅能散射夏日強烈陽光，更利用水分子蒸發吸熱原理降低地面廣場溫度。夜間配合四季變換 LED 七彩光雕，水面如鏡倒映中部電力電視塔，為名古屋最經典明信片角度。",
            "【參觀動線全攻略】建議傍晚 17:30 登頂漫步外圍木棧道，一次飽覽夕陽染紅天際與入夜後璀璨點燈；參觀完畢可搭乘電梯直通 B1『銀河廣場』，無縫連接榮町地下街享用美食。"
          ],
          "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Oasis_21_and_Nagoya_TV_Tower.JPG/1280px-Oasis_21_and_Nagoya_TV_Tower.JPG?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
          "region": "nagoya",
          "photoLabel": "綠洲21「水之宇宙船」橢圓形玻璃天幕與名古屋電視塔夜景倒影"
        },
        {
          "id": "d1_spot2",
          "name": "世界の山ちゃん",
          "nameJp": "世界の山ちゃん 栄本店",
          "isScheduled": true,
          "category": "dining",
          "order": 2,
          "time": "18:00 - 19:30",
          "coords": [
            35.1682,
            136.9125
          ],
          "tag": "名古屋居酒屋",
          "address": "愛知縣名古屋市中區榮4丁目9-6",
          "googleMaps": "https://www.google.com/maps/search/?api=1&query=愛知県名古屋市中区栄4丁目9-6",
          "score": 3.48,
          "budget": "¥¥ (2,000~3,000円)",
          "description": "名古屋靈魂美食「幻之手羽先」，特製胡椒辛香酥脆雞翅，搭配冰涼生啤酒極品享受！",
          "mustOrder": [
            "幻の手羽先 (胡椒炸雞翅)",
            "味噌炸豬排串",
            "名古屋紅味噌黑輪"
          ],
          "notes": "胡椒味香辣酥脆，吃法是折斷骨頭一拉整塊肉入口！",
          "phrases": [
            {
              "scenario": "在居酒屋點招牌手羽先",
              "japanese": "手羽先二人前と、生ビールをお願いします。",
              "romaji": "Tebasaki ninin-mae to, nama biiru o onegaishimasu.",
              "chinese": "請給我兩份炸雞翅和生啤酒。",
              "audio": "手羽先二人前と生ビールをお願いします"
            }
          ],
          "fullStory": [
            "【世界的山將與幻之手羽先傳奇】昭和56年(1981)由山本重雄先生創立於名古屋新榮一家僅有 4 坪大的小居酒屋『やまちゃん』。因研發出風味獨特、香脆辛辣的手羽先（炸雞翅），迅速在全日本掀起名古屋手羽先狂潮，如今成為名古屋靈魂美食代名詞。",
            "【兩道油炸與秘傳胡椒工藝】嚴選優質雞翅不裹厚重麵衣，以高溫油炸兩次逼出多餘油脂，表皮金黃薄脆，起鍋後迅速刷上傳承數十年的秘傳熟成醬油醬汁，最後大膽撒上特調辛香黑胡椒粉，肉質多汁鮮嫩、鹹香微辣極致開胃。",
            "【名古屋老饕專屬吃法】雙手拿起雞翅，先將關節處輕輕折斷成兩截，將較大的一截肉整支含入口中，用牙齒咬住肉塊後順勢將骨頭抽出，一氣呵成品嚐完整雞肉，搭配冰涼生啤酒堪稱絕品！"
          ],
          "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Sekai_no_Yamachan_tebasaki.JPG/1280px-Sekai_no_Yamachan_tebasaki.JPG?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
          "region": "nagoya",
          "photoLabel": "世界的山將招牌辛香黑胡椒「幻の手羽先」炸雞翅"
        },
        {
          "id": "d1_spot3",
          "name": "中部電力 MIRAI TOWER",
          "nameJp": "中部電力 MIRAI TOWER",
          "isScheduled": true,
          "category": "attraction",
          "order": 3,
          "time": "20:00 - 21:30",
          "coords": [
            35.1724,
            136.9083
          ],
          "tag": "登錄有形文化財",
          "address": "愛知縣名古屋市中區錦3丁目3-15",
          "googleMaps": "https://www.google.com/maps/search/?api=1&query=愛知県名古屋市中区錦3丁目3-15",
          "description": "日本最古老的集約電波塔，90米室內展望台與100米戶外陽台 360 度俯瞰榮商圈繁華夜景。",
          "highlights": [
            "日本第一座集約電波鐵塔",
            "90米展望台與戶外空中陽台",
            "夜間絢爛光雕投影"
          ],
          "photoTip": "在綠洲21頂層回頭拍向電視塔為經典角度。",
          "hours": "10:00 - 21:40 (門票約 1,300 円)",
          "phrases": [
            {
              "scenario": "詢問電視塔最終入場時間",
              "japanese": "最終入場は何時ですか？",
              "romaji": "Saishuu nyuujou wa nanji desu ka?",
              "chinese": "請問最後入場是幾點？",
              "audio": "最終入場は何時ですか？"
            }
          ],
          "fullStory": [
            "【日本第一座集約電波鐵塔】昭和29年(1954)竣工，由設計東京鐵塔與通天閣的『日本鐵塔之父』內藤多仲教授操刀，比東京鐵塔早了整整 4 年，為日本第一座集約電波鐵塔，名列日本國家登錄有形文化財與重要文化財。",
            "【現代化翻新與高空露台】塔高 180 公尺，歷經大規模耐震翻新後，不僅設有 90 米室內景觀台與 100 米戶外空中陽台『Sky Balcony』，更是全球首座塔內進駐頂級設計精品飯店的景觀鐵塔。",
            "【觀景特色】登上戶外陽台迎著微風 360 度俯瞰久屋大通綠軸公園、名古屋城天守閣與遠方鈴鹿山脈，夜間常設數位光影藝術投影，與地面綠洲21相互輝映。"
          ],
          "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Nagoya_TV_Tower_from_Zone_4_of_Hisaya-odori_Park.jpg/1280px-Nagoya_TV_Tower_from_Zone_4_of_Hisaya-odori_Park.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
          "region": "nagoya",
          "photoLabel": "久屋大通公園綠地視角之中部電力 MIRAI TOWER (名古屋電視塔)"
        },
        {
          "id": "d1_opt1",
          "name": "榮町地下街",
          "nameJp": "栄地下街 (サカエチカ)",
          "isScheduled": false,
          "category": "quest",
          "coords": [
            35.1695,
            136.9075
          ],
          "tag": "伴手禮與藥妝",
          "address": "愛知縣名古屋市中區榮3丁目4-6先",
          "googleMaps": "https://www.google.com/maps/search/?api=1&query=Sakaechika+Nagoya",
          "description": "榮站地下廣大購物網絡，聚集大國藥妝、コメダ喫茶店、在地甜點店，雨天漫遊絕佳去處。",
          "highlights": [
            "連接各大百貨公司與地鐵站",
            "豐富的名古屋伴手禮名產專賣店"
          ],
          "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Sakae_Chika_20200112.jpg/1280px-Sakae_Chika_20200112.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
          "region": "nagoya",
          "photoLabel": "名古屋榮町地下街 SakaeChika 繁華拱廊購物街"
        },
        {
          "id": "d1_opt2",
          "name": "風來坊 榮店",
          "nameJp": "風来坊 栄店",
          "isScheduled": false,
          "category": "dining",
          "coords": [
            35.1688,
            136.911
          ],
          "tag": "炸雞翅始祖",
          "address": "愛知縣名古屋市中區榮4丁目5-8",
          "googleMaps": "https://www.google.com/maps/search/?api=1&query=風来坊+栄店",
          "score": 3.52,
          "budget": "¥¥ (2,000~3,500円)",
          "description": "與世界的山將齊名的手羽先元祖！特製鹹甜微辣醬汁撒上香濃白芝麻，肉質更為鮮嫩多汁。",
          "mustOrder": [
            "元祖手羽先唐揚",
            "手羽元唐揚",
            "名古屋地雞串燒"
          ],
          "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Furaibo_Tebasaki.JPG/1280px-Furaibo_Tebasaki.JPG?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
          "region": "nagoya",
          "photoLabel": "風來坊元祖秘傳甜辣醬汁手羽先唐揚炸雞翅"
        },
        {
          "id": "d1_opt3",
          "name": "山本屋總本家 本店",
          "nameJp": "山本屋総本家 本店",
          "isScheduled": false,
          "category": "dining",
          "coords": [
            35.1668,
            136.9095
          ],
          "tag": "百年味噌烏龍",
          "address": "愛知縣名古屋市中區榮3丁目12-19",
          "googleMaps": "https://www.google.com/maps/search/?api=1&query=山本屋総本家+本店",
          "score": 3.58,
          "budget": "¥¥ (1,500~2,500円)",
          "description": "大正14年創業，以剛勁有嚼勁的純手工烏龍麵搭配滾燙砂鍋濃醇愛知八丁味噌，吸飽濃郁湯頭精華。",
          "mustOrder": [
            "味噌煮込うどん (味噌煮烏龍麵)",
            "名古屋コーチン親子烏龍"
          ],
          "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Yamamotoya_Sohonke_Misonikomi_Udon_2020-11_ac.jpg/1280px-Yamamotoya_Sohonke_Misonikomi_Udon_2020-11_ac.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
          "region": "nagoya",
          "photoLabel": "陶土砂鍋現煮滾燙八丁味噌煮烏龍麵 (味噌煮込うどん)"
        },
        {
          "id": "d1_opt4",
          "name": "驛釜棊子麵",
          "nameJp": "驛釜きしめん (えきかまきしめん)",
          "isScheduled": false,
          "category": "dining",
          "coords": [
            35.1706,
            136.8818
          ],
          "tag": "名古屋站寬版烏龍始祖",
          "address": "愛知縣名古屋市中村區名驛1丁目1-4 名古屋站中央通",
          "googleMaps": "https://www.google.com/maps/search/?api=1&query=驛釜きしめん+名古屋駅",
          "score": 3.52,
          "budget": "¥ (800~1,300円)",
          "description": "NotebookLM 重點記錄！位於名古屋車站內，提供扁平寬版、口感滑順富有彈性的傳統棊子麵 (Kishimen)，夏日品嚐冰鎮冷寬烏龍搭配柴魚高湯清爽無比！",
          "mustOrder": [
            "ざるきしめん (竹簍冰鎮寬烏龍)",
            "名古屋コーチンきしめん (名古屋地雞寬烏龍)"
          ],
          "img": "https://upload.wikimedia.org/wikipedia/commons/5/56/Kishimen_%28Nagoya%2C_Japan%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled",
          "region": "nagoya",
          "photoLabel": "名古屋名物平打寬麵柴魚高湯棊子麵 (Kishimen)"
        },
        {
          "id": "d1_opt5",
          "name": "圓頓寺商店街",
          "nameJp": "円頓寺商店街 (えんどうじしょうてんがい)",
          "isScheduled": false,
          "category": "quest",
          "coords": [
            35.1746,
            136.8928
          ],
          "tag": "名古屋最古老下町老街",
          "address": "愛知縣名古屋市西區那古野1丁目",
          "googleMaps": "https://www.google.com/maps/search/?api=1&query=円頓寺商店街",
          "description": "NotebookLM 重點記錄！名古屋三大歷史商店街之一，保留昭和懷舊拱廊、古民家手沖咖啡與老字號洋食屋，每年舉辦熱鬧七夕祭。",
          "highlights": [
            "融合江戶土藏建築與昭和老店",
            "四間道老街文青手作雜貨"
          ],
          "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Endoji_Shopping_Street_2021-10_ac.jpg/1280px-Endoji_Shopping_Street_2021-10_ac.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
          "region": "nagoya",
          "photoLabel": "昭和復古拱廊風情之圓頓寺商店街老街"
        }
      ],
      "primaryRegion": "nagoya",
      "secondaryRegion": null
    },
    {
      "dayIndex": 2,
      "date": "2026-08-20",
      "dayOfWeek": "THU",
      "location": "名古屋 & 犬山",
      "coverImg": "assets/images/inuyama.jpg",
      "theme": "國寶犬山城下町・熱田神宮・蓬萊軒頂級鰻魚飯三吃",
      "summary": "上午前往「國寶犬山城」與城下町品嚐烤串，中午享用「Konparu炸蝦三明治」，下午參拜「熱田神宮」並在「あつた蓬莱軒本店」享用百年鰻魚飯三吃。",
      "weather": {
        "desc": "晴朗炎熱",
        "high": 34,
        "low": 27,
        "rain": 0,
        "icon": "☀️"
      },
      "mapCenter": [
        35.3884,
        136.9392
      ],
      "mapZoom": 13,
      "spots": [
        {
          "id": "d2_spot1",
          "name": "國寶 犬山城 & 城下町老街",
          "nameJp": "国宝 犬山城・犬山城下町",
          "isScheduled": true,
          "category": "attraction",
          "order": 1,
          "time": "09:00 - 12:00",
          "coords": [
            35.3884,
            136.9392
          ],
          "tag": "日本國寶五城",
          "address": "愛知縣犬山市犬山北古券65-2",
          "googleMaps": "https://www.google.com/maps/search/?api=1&query=愛知県犬山市犬山北古券65-2",
          "description": "日本現存最古老木造天守之一（天文6年/1537年築），登頂天守閣可環視木曾川壯麗絕景，城下町保留江戶時代黑瓦町家老街。",
          "highlights": [
            "全日本現存最古老木造天守閣",
            "天守頂層迴廊 360 度俯瞰木曾川與御嶽山",
            "三光稻荷神社千本鳥居與粉紅愛心繪馬"
          ],
          "photoTip": "從木曾川對岸或三光稻荷神社紅色鳥居階梯向上仰拍天守閣最壯麗。",
          "hours": "09:00 - 17:00 (天守門票約 550 円)",
          "phrases": [
            {
              "scenario": "在犬山城購票處買票",
              "japanese": "大人二枚をお願いします。",
              "romaji": "Otona nimai o onegaishimasu.",
              "chinese": "請給我兩張成人票。",
              "audio": "大人二枚をお願いします"
            }
          ],
          "fullStory": [
            "【現存最古木造天守與國寶五城】天文6年(1537)由織田信長之叔父織田信康所建，為日本現存最古老的木造天守之一，名列全日本僅有的『國寶五城』（犬山、姬路、松本、彥根、松江），更是日本歷史上最後一座由個人（成瀨家）代代持有的城堡（直至2004年轉為財團法人）。",
            "【望樓型天守與陡峭木梯】天守外觀三重、內部四層、地下兩層，採用早期戰國『望樓型天守』建築，內部完整保留未經塗漆的厚重原始檜木柱樑與陡峭達 50 度以上的木造樓梯；最上層設有日本現存天守極罕見的『迴緣（高空戶外欄杆走廊）』。",
            "【木曾川絕景與城下町老街】走上最高層迴緣，木曾川如同天然護城河奔流眼底，遠眺御嶽山與岐阜城；下山後漫步江戶時代棋盤狀城下町，在三光稻荷神社洗錢求良緣，品嚐山田五行現烤五平餅與烤醬油糰子。"
          ],
          "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Inuyama_Castle_from_Inuyama_Jokamachi_in_early_Spring.jpg/1280px-Inuyama_Castle_from_Inuyama_Jokamachi_in_early_Spring.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
          "region": "inuyama",
          "photoLabel": "犬山城下町遠眺日本現存最古老國寶木造天守閣"
        },
        {
          "id": "d2_spot2",
          "name": "Konparu",
          "nameJp": "コンパル 栄東店",
          "isScheduled": true,
          "category": "dining",
          "order": 2,
          "time": "12:30 - 13:30",
          "coords": [
            35.169,
            136.909
          ],
          "tag": "昭和喫茶名物",
          "address": "愛知縣名古屋市中區榮3丁目5-12先",
          "googleMaps": "https://www.google.com/maps/search/?api=1&query=コンパル+栄東店",
          "score": 3.49,
          "budget": "¥ (1,000~1,500円)",
          "description": "昭和22年創業的名產喫茶店，以三隻現炸香脆大蝦搭配特調塔塔醬與煎蛋的「エビフライサンド」聞名全日本！",
          "mustOrder": [
            "エビフライサンド (名物炸蝦三明治)",
            "アイスコーヒー (招牌冰咖啡)"
          ],
          "notes": "冰咖啡由客人自己將熱濃縮倒入冰塊杯中，風味濃厚回甘。",
          "phrases": [
            {
              "scenario": "在喫茶店點招牌炸蝦三明治",
              "japanese": "名物のエビフライサンドを一つと、アイスコーヒーをください。",
              "romaji": "Meibutsu no ebi-furai sando o hitotsu to, aisu koohii o kudasai.",
              "chinese": "請給我一份招牌炸蝦三明治和一杯冰咖啡。",
              "audio": "名物のエビフライサンドを一つとアイスコーヒーをください"
            }
          ],
          "fullStory": [
            "【昭和22年創業的喫茶名物】Konparu (コンパル) 創立於戰後昭和22年(1947)，為名古屋喫茶店文化的開山鼻祖之一。店內完整保留復古紅絨布座椅、木質裝潢與暖黃燈光，充滿昭和時代懷舊浪漫氣息。",
            "【名物現炸蝦排三明治】最受歡迎的『エビフライサンド (炸蝦三明治)』現點現炸，將三隻完整鮮甜大蝦裹上薄粉炸至金黃酥脆，夾入微烤土司、現煎軟嫩玉子燒與爽脆高麗菜絲，再淋上特調塔塔醬與濃郁豬排醬，一口咬下層次豐富爆漿多汁！",
            "【獨特冰咖啡沖泡法】招牌冰咖啡附上裝滿冰塊的玻璃杯、一小壺熱濃縮黑咖啡與鮮奶油，由顧客親手將熱咖啡倒入冰塊杯中瞬間冰鎮，香氣濃郁不苦澀。"
          ],
          "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Fried_prawn_sandwich%2C_at_Konparu_%282013.06.22%29.jpg/1280px-Fried_prawn_sandwich%2C_at_Konparu_%282013.06.22%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
          "region": "nagoya",
          "photoLabel": "名物現炸外酥內嫩大蝦排厚蛋三明治 (エビフライサンド)"
        },
        {
          "id": "d2_spot3",
          "name": "熱田神宮",
          "nameJp": "熱田神宮",
          "isScheduled": true,
          "category": "attraction",
          "order": 3,
          "time": "14:30 - 16:30",
          "coords": [
            35.1257,
            136.9091
          ],
          "tag": "兩千年歷史神宮",
          "address": "愛知縣名古屋市熱田區神宮1丁目1-1",
          "googleMaps": "https://www.google.com/maps/search/?api=1&query=愛知県名古屋市熱田区神宮1丁目1-1",
          "description": "日本三大神宮之一，供奉日本皇室三神器之一的「草薙神劍」，佔地廣大古木參天，內有織田信長桶狹間之戰戰勝後奉納之「信長壁」。",
          "highlights": [
            "供奉三神器之草薙神劍",
            "織田信長奉納的日本三大土壁「信長壁」",
            "千年大楠神木與宮九重名刀博物館「劍之寶庫草薙館」"
          ],
          "photoTip": "正殿前的大鳥居與信長壁前樹影光斑最具肅穆靜謐之美。",
          "hours": "境內自由參拜 (寶物館 09:00 - 16:30)",
          "phrases": [
            {
              "scenario": "在神社購買御守",
              "japanese": "このお守りを授かりたいです。",
              "romaji": "Kono omamori o sazukaritai desu.",
              "chinese": "我想要購買這個御守。",
              "audio": "このお守りを授かりたいです"
            }
          ],
          "fullStory": [
            "【兩千年歷史與草薙神劍鎮座】建於景行天皇43年（西元113年），已有超過 1900 年悠久歷史，在神道教中地位極尊，僅次於伊勢神宮。境內供奉日本皇室三神器之一的『草薙神劍（天叢雲劍）』，自古受到織田信長、豐臣秀吉、德川家康等天下霸主極致尊崇。",
            "【信長壁與桶狹間勝利誓約】永祿3年(1560)桶狹間之戰前夕，織田信長親赴熱田神宮祈願必勝，以寡擊眾大破今川義元後，信長特地奉納由油土與瓦片層層交疊築成的堅固『信長壁』，與京都三十間堂太閣壁、西宮神社大綠壁並稱『日本三大土壁』。",
            "【參觀動線】漫步於參天古木遮蔽的碎石參道享受清涼芬多精，參拜莊嚴伊勢神宮同等格式的『神明造』本宮，欣賞樹齡超過千年的『大楠神木』，並參觀收藏大量日本國寶名刀的『劍之寶庫 草薙館』。"
          ],
          "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Atsuta_shrine.jpg/1280px-Atsuta_shrine.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
          "region": "nagoya",
          "photoLabel": "熱田神宮神樂殿正殿莊嚴神道木造建築"
        },
        {
          "id": "d2_spot4",
          "name": "あつた蓬莱軒 本店",
          "nameJp": "あつた蓬莱軒 本店",
          "isScheduled": true,
          "category": "dining",
          "order": 4,
          "time": "17:30 - 19:30",
          "coords": [
            35.1225,
            136.9095
          ],
          "tag": "百年鰻魚創始店",
          "address": "愛知縣名古屋市熱田區神戸町503",
          "googleMaps": "https://www.google.com/maps/search/?api=1&query=愛知県名古屋市熱田区神戸町503",
          "score": 3.78,
          "budget": "¥¥¥ (4,500~6,000円)",
          "description": "明治6年創業，「ひつまぶし (鰻魚飯三吃)」註冊商標創始店！備長炭現烤焦香四溢，一吃原味、二加芥末蔥花、三淋高湯作茶泡飯。",
          "mustOrder": [
            "ひつまぶし (鰻魚飯三吃)",
            "鰻魚玉子燒 (う巻き)",
            "鰻肝吸物"
          ],
          "notes": "熱田神宮旁老店，下午先至現場抽號登記候位。",
          "phrases": [
            {
              "scenario": "點鰻魚飯三吃與店員確認吃法",
              "japanese": "ひつまぶしを一つお願いします。おすすめの食べ方はありますか？",
              "romaji": "Hitsumabushi o hitotsu onegaishimasu. Osusume no tabekata wa arimasu ka?",
              "chinese": "請給我一份鰻魚飯三吃。請問有推薦的吃法嗎？",
              "audio": "ひつまぶしを一つお願いします"
            }
          ],
          "fullStory": [
            "【百年老舖與鰻魚三吃發源】明治6年(1873)創立於熱田神宮宿場町『宮宿』，至今已有超過 150 年歷史。『ひつまぶし (Hitsumabushi)』正是由蓬萊軒第二代店主發明並取得日本註冊商標，為名古屋最具代表性的御殿級美食。",
            "【備長炭現烤與百年秘傳醬汁】嚴選日本國產活鰻，採用關西流『純炭火現剖現烤』古法，以最高級備長炭高溫炙烤，將多餘油脂逼出使外皮香脆，魚肉鬆軟綿密，並反覆浸入自明治時代傳承至今、歷經多次戰火仍捨身守護的百年秘傳熟成蒲燒醬汁。",
            "【老饕經典三吃儀式】將木盆內的鰻魚飯十字劃分成四等份：一吃原汁原味品嚐焦香酥脆；二加入海苔絲、細蔥與現磨山葵辛香提味；三沖入滾燙特製昆布柴魚高湯做成茶泡飯；最後一份自由選擇最愛吃法結尾。"
          ],
          "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Hitsumabushi_1.jpg/1280px-Hitsumabushi_1.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
          "region": "nagoya",
          "photoLabel": "傳統木盆盛裝現烤炭香鰻魚飯三吃 (ひつまぶし)"
        },
        {
          "id": "d2_opt1",
          "name": "三光稻荷神社",
          "nameJp": "三光稲荷神社",
          "isScheduled": false,
          "category": "quest",
          "coords": [
            35.3873,
            136.9396
          ],
          "tag": "戀愛與金運名所",
          "address": "愛知縣犬山市犬山北古券41-1 (犬山城山腳參道入口)",
          "googleMaps": "https://www.google.com/maps/search/?api=1&query=三光稲荷神社+犬山",
          "description": "位於犬山城山腳下，以求良緣的粉紅色心型繪馬牆與「錢洗池」聞名，洗過的錢幣傳說會成倍增長。",
          "highlights": [
            "超人氣粉紅愛心繪馬牆打卡",
            "洗錢祈求財運的錢洗稻荷神水"
          ],
          "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Toriis_of_Sanko_Inari_Shrine_near_Inuyama_Castle.JPG/1280px-Toriis_of_Sanko_Inari_Shrine_near_Inuyama_Castle.JPG?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
          "region": "inuyama",
          "photoLabel": "犬山城下三光稻荷神社紅色千本鳥居與粉紅結緣愛心繪馬"
        },
        {
          "id": "d2_opt2",
          "name": "大須商店街 & 大須觀音寺",
          "nameJp": "大須商店街・大須観音",
          "isScheduled": false,
          "category": "quest",
          "coords": [
            35.1598,
            136.8996
          ],
          "tag": "古寺與動漫庶民街",
          "address": "愛知縣名古屋市中區大須2丁目21-47",
          "googleMaps": "https://www.google.com/maps/search/?api=1&query=大須商店街+名古屋",
          "description": "融合江戶歷史古寺與現代次文化、動漫、古著與街頭小吃的繁華商圈，共有 1200 多家店舖。",
          "highlights": [
            "真福寺大須觀音朱紅本堂",
            "名物李先生台灣炸雞、大須外郎糕與二手相機店"
          ],
          "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Osu_Kannon_10.jpg/1280px-Osu_Kannon_10.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
          "region": "nagoya",
          "photoLabel": "大須觀音寶生院大殿與醒目大紅燈籠"
        },
        {
          "id": "d2_opt3",
          "name": "矢場とん 矢場町本店",
          "nameJp": "矢場とん 矢場町本店",
          "isScheduled": false,
          "category": "dining",
          "coords": [
            35.1601,
            136.9064
          ],
          "tag": "招牌橫綱豬排",
          "address": "愛知縣名古屋市中區大須3丁目6-18",
          "googleMaps": "https://www.google.com/maps/search/?api=1&query=矢場とん+矢場町本店",
          "score": 3.51,
          "budget": "¥¥ (1,800~2,800円)",
          "description": "門口有超大相撲豬公仔！招牌鐵板味噌豬排，在顧客面前淋下滾燙的天然秘傳八丁味噌醬，香氣炸裂！",
          "mustOrder": [
            "極上リブ鉄板とんかつ (鐵板厚切里肌味噌豬排)",
            "わらじとんかつ (雙醬特大草鞋豬排)"
          ],
          "img": "https://upload.wikimedia.org/wikipedia/commons/d/da/Yabaton_headquauters_001.JPG?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled",
          "region": "nagoya",
          "photoLabel": "矢場とん矢場町總店橫綱豬招牌與外觀"
        },
        {
          "id": "d2_opt4",
          "name": "豐田產業技術紀念館",
          "nameJp": "トヨタ産業技術記念館",
          "isScheduled": false,
          "category": "quest",
          "coords": [
            35.1822,
            136.8778
          ],
          "tag": "紅磚紡織與汽車工藝殿堂",
          "address": "愛知縣名古屋市西區則武新町4丁目1-35",
          "googleMaps": "https://www.google.com/maps/search/?api=1&query=トヨタ産業技術記念館",
          "description": "NotebookLM 重點記錄！建於豐田自動織機創始紅磚廠房原址，現場由工程師動態運轉百年紡織機與現代汽車組裝機器人，機械迷與歷史愛好者必訪！",
          "highlights": [
            "實機動態演示豐田初代自動織布機",
            "汽車館展示整條金屬沖壓與引擎鑄造流水線",
            "兒童科技樂園 Technoland"
          ],
          "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Toyota_Commemorative_Museum_of_Industry_and_Technology_-_Textile_Machinery_Pavilion.jpg/1280px-Toyota_Commemorative_Museum_of_Industry_and_Technology_-_Textile_Machinery_Pavilion.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
          "region": "nagoya",
          "photoLabel": "紡織機械館內展示之豐田環狀織機與工業歷史"
        }
      ],
      "primaryRegion": "nagoya",
      "secondaryRegion": "inuyama"
    },
    {
      "dayIndex": 3,
      "date": "2026-08-21",
      "dayOfWeek": "FRI",
      "location": "名古屋",
      "coverImg": "assets/images/nagoya.jpg",
      "theme": "名古屋城金鯱障壁畫・職棒大戰 (中日龍 vs 養樂多)",
      "summary": "上午參觀「名古屋城」與華麗金箔「本丸御殿」，午餐在金鯱橫丁品嚐「矢場とん味噌豬排」，下午前往萬特力巨蛋觀看「中日龍 vs 養樂多」職棒大戰。",
      "weather": {
        "desc": "晴午後局部雨",
        "high": 33,
        "low": 26,
        "rain": 20,
        "icon": "⛅"
      },
      "mapCenter": [
        35.1848,
        136.8997
      ],
      "mapZoom": 14,
      "spots": [
        {
          "id": "d3_spot1",
          "name": "名古屋城・金鯱與本丸御殿",
          "nameJp": "名古屋城・本丸御殿",
          "isScheduled": true,
          "category": "attraction",
          "order": 1,
          "time": "09:30 - 12:00",
          "coords": [
            35.1848,
            136.8997
          ],
          "tag": "日本三大名城",
          "address": "愛知縣名古屋市中區本丸1-1",
          "googleMaps": "https://www.google.com/maps/search/?api=1&query=愛知県名古屋市中区本丸1-1",
          "description": "德川家康於慶長15年(1610)命天下普請所築，屋頂飾有純金鑄造的「金鯱」。完全依古法修復的本丸御殿金碧輝煌，重現狩野派金箔障壁畫。",
          "highlights": [
            "天守頂端象徵名古屋榮耀之黃金金鯱",
            "本丸御殿「上洛殿」與「表書院」華麗狩野派障壁畫",
            "東南隅櫓重要文化財"
          ],
          "photoTip": "從西南隅櫓外圍護城河綠意角度拍攝天守閣倒影最佳。",
          "hours": "09:00 - 16:30 (門票 500 円)",
          "phrases": [
            {
              "scenario": "詢問本丸御殿參觀須知",
              "japanese": "本丸御殿の中は靴を脱いで入りますか？",
              "romaji": "Honmaru goten no naka wa kutsu o nuide hairimasu ka?",
              "chinese": "進入本丸御殿需要脫鞋嗎？",
              "audio": "本丸御殿の中は靴を脱いで入りますか？"
            }
          ],
          "fullStory": [
            "【天下普請與日本三大名城】慶長15年(1610)德川家康命加藤清正、福島正規等20位西國大名合力興建『天下普請』，作為德川幕府防衛關東、震懾西國大名的核心軍事要塞，與大阪城、姬路城並列日本三大名城。",
            "【本丸御殿金碧輝煌復原奇蹟】曾於二次大戰燒毀的本丸御殿，歷經 10 年純手工木造復原工程於 2018 年重現世人眼前。完全依江戶時代狩野派傳統古法，採用珍貴木曾檜木與純金金箔，再現『上洛殿』與『表書院』金碧輝煌的帝王奢華。",
            "【必看重點】仰望天守閣頂部重達數百公斤、象徵防火與權柄的純金『金鯱』；踏入本丸御殿欣賞狩野山樂所繪《竹林群虎圖》金箔障壁畫；尋訪加藤清正親自搬運、城內最大的石垣巨石『清正石』。"
          ],
          "img": "https://upload.wikimedia.org/wikipedia/commons/c/ce/Nagoya_Castle_01.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled",
          "region": "nagoya",
          "photoLabel": "名古屋城綠頂大天守閣與雄偉石垣"
        },
        {
          "id": "d3_spot2",
          "name": "矢場とん 名古屋城金鯱橫丁店",
          "nameJp": "矢場とん 名古屋城金シャチ横丁店",
          "isScheduled": true,
          "category": "dining",
          "order": 2,
          "time": "12:30 - 13:45",
          "coords": [
            35.1832,
            136.8988
          ],
          "tag": "經典味噌豬排",
          "address": "愛知縣名古屋市中區三之丸1丁目2-5",
          "googleMaps": "https://www.google.com/maps/search/?api=1&query=矢場とん+名古屋城金シャチ横丁店",
          "score": 3.46,
          "budget": "¥¥ (1,500~2,500円)",
          "description": "位於名古屋城正門義直區，傳統江戶木造建築風格，享受剛出爐酥脆金黃豬排淋上秘傳味噌醬汁的極致滋味。",
          "mustOrder": [
            "ひれかつ丼 (味噌腰內肉豬排丼)",
            "ロース串かつ (酥炸里肌串)"
          ],
          "notes": "桌上備有七味粉與一味粉，灑在味噌醬上更添層次香氣。",
          "phrases": [
            {
              "scenario": "在餐廳結帳並索取收據",
              "japanese": "お会計をお願いします。レシートをいただけますか？",
              "romaji": "Okaikei o onegaishimasu. Reshiito o itadakemasu ka?",
              "chinese": "麻煩結帳。可以給我收據嗎？",
              "audio": "お会計をお願いします"
            }
          ],
          "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Misokatsu_Teishoku_20200328-02.jpg/1280px-Misokatsu_Teishoku_20200328-02.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
          "region": "nagoya",
          "photoLabel": "熱騰騰淋上特濃八丁味噌醬之炸豬排定食 (味噌カツ)"
        },
        {
          "id": "d3_spot3",
          "name": "萬特力巨蛋名古屋",
          "nameJp": "バンテリンドーム ナゴヤ (中日ドラゴンズ vs 東京ヤクルト)",
          "isScheduled": true,
          "category": "attraction",
          "order": 3,
          "time": "17:00 - 21:30",
          "coords": [
            35.1859,
            136.9474
          ],
          "tag": "日職熱血觀戰",
          "address": "愛知縣名古屋市東區大幸南1丁目1-1",
          "googleMaps": "https://www.google.com/maps/search/?api=1&query=バンテリンドーム+ナゴヤ",
          "description": "日本職棒中日龍隊主場！容納 4 萬多人的現代化全天候巨蛋，體驗震撼的日職應援歌聲、Doala 吉祥物翻跟斗與球場限定美食。",
          "highlights": [
            "全天候冷氣巨蛋，舒適觀看日職中央聯盟激戰",
            "中日龍人氣吉祥物「Doala (ドアラ)」經典翻跟斗秀",
            "巨蛋限定中日龍便當與生啤酒杯"
          ],
          "photoTip": "在內野走道高處俯拍全場綠茵草皮與大螢幕計分板。",
          "hours": "開場 16:00 / 比賽開始 18:00",
          "phrases": [
            {
              "scenario": "在球場向工作人員詢問座位區域",
              "japanese": "このチケットの座席はどのブロックですか？",
              "romaji": "Kono chiketto no zaseki wa dono burokku desu ka?",
              "chinese": "請問這張票的座位是在哪一區？",
              "audio": "このチケットの座席はどのブロックですか？"
            }
          ],
          "fullStory": [
            "【中日龍主場與巨蛋科技】萬特力巨蛋名古屋（名古屋巨蛋）自1997年啟用，為日本職棒中央聯盟『中日龍隊 (Chunichi Dragons)』主場。球場擁有直徑 187 米巨大雙層圓頂與全天候恆溫空調，可容納 4 萬多名熱血球迷。",
            "【應援文化與吉祥物 Doala】現場體驗震撼全場的藍色應援毛巾舞、專屬球員應援曲與第七局熱血氣球秀；中日龍人氣吉祥物無尾熊『Doala (ドアラ)』每場招牌的高難度翻跟斗秀更是全場焦點。",
            "【球場老饕限定】必嚐中日龍球星親自挑選食材的『球弁（選手便當）』，隨盒附贈專屬球員收藏卡，以及巨蛋限定生啤酒與炸雞塊。"
          ],
          "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Nagoya_Dome_-_3.jpg/1280px-Nagoya_Dome_-_3.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
          "region": "nagoya",
          "photoLabel": "中日龍主場萬特力巨蛋室內棒球場與看台壯麗景觀"
        },
        {
          "id": "d3_opt1",
          "name": "金鯱橫丁",
          "nameJp": "金シャチ横丁 (義直ゾーン・宗春ゾーン)",
          "isScheduled": false,
          "category": "quest",
          "coords": [
            35.1835,
            136.8991
          ],
          "tag": "江戶美食街區",
          "address": "愛知縣名古屋市中區三之丸1丁目2",
          "googleMaps": "https://www.google.com/maps/search/?api=1&query=金シャチ横丁",
          "description": "名古屋城下的江戶風情美食街，分為正門「義直區（老字號名店）」與東門「宗春區（新穎時尚餐飲）」。",
          "highlights": [
            "金箔霜淇淋打卡",
            "名古屋全系列名產（十文字烏龍麵、鳥開親子丼）"
          ],
          "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Yoshinao_Zone_20190131-03.jpg/1280px-Yoshinao_Zone_20190131-03.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
          "region": "nagoya",
          "photoLabel": "名古屋城旁金鯱橫丁義直區江戶風木造美食街"
        },
        {
          "id": "d3_opt2",
          "name": "德川園 & 德川美術館",
          "nameJp": "徳川園・徳川美術館",
          "isScheduled": false,
          "category": "quest",
          "coords": [
            35.1842,
            136.9332
          ],
          "tag": "大名庭園與國寶源氏物語",
          "address": "愛知縣名古屋市東區德川町1001",
          "googleMaps": "https://www.google.com/maps/search/?api=1&query=徳川園+名古屋",
          "description": "尾張德川家的大名池泉回遊式庭園，館內收藏尾張德川家世代相傳的武士刀劍、茶道名器與國寶《源氏物語繪卷》。",
          "highlights": [
            "龍仙湖與龍門之瀧幽美水景",
            "日本現存最珍貴之德川家康遺物展示"
          ],
          "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Tokugawa-en_1.jpg/1280px-Tokugawa-en_1.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
          "region": "nagoya",
          "photoLabel": "德川園龍仙湖畔日式池泉回遊式庭園"
        },
        {
          "id": "d3_opt3",
          "name": "鳥開總本家 金鯱橫丁店",
          "nameJp": "鳥開総本家 名古屋城金シャチ横丁店",
          "isScheduled": false,
          "category": "dining",
          "coords": [
            35.1833,
            136.8985
          ],
          "tag": "全國丼金賞名店",
          "address": "愛知縣名古屋市中區三之丸1丁目2-4",
          "googleMaps": "https://www.google.com/maps/search/?api=1&query=鳥開総本家+金シャチ横丁店",
          "score": 3.48,
          "budget": "¥¥ (1,500~2,200円)",
          "description": "榮獲全國丼大賽多屆金賞！採用日本三大名雞「純系名古屋コーチン」的鮮嫩雞肉與濃醇金黃生蛋黃，蛋香濃郁滑順。",
          "mustOrder": [
            "名古屋コーチン親子丼",
            "名物コーチン手羽先唐揚"
          ],
          "img": "https://upload.wikimedia.org/wikipedia/commons/9/99/Oyakodon%2C_tsukemono_and_miso_soup_by_jetalone_in_Tokyo.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled",
          "region": "nagoya",
          "photoLabel": "滑嫩金黃半熟蛋佐名古屋交趾地雞親子丼"
        },
        {
          "id": "d3_opt4",
          "name": "則武之森",
          "nameJp": "ノリタケの森",
          "isScheduled": false,
          "category": "quest",
          "coords": [
            35.1788,
            136.8835
          ],
          "tag": "百年歐風紅磚工坊",
          "address": "愛知縣名古屋市西區則武新町3丁目1-36",
          "googleMaps": "https://www.google.com/maps/search/?api=1&query=ノリタケの森",
          "description": "NotebookLM 重點記錄！日本皇室御用高級洋食器「Noritake」創始工廠，園區林立明治時代紅磚煙囪與綠蔭花園，可參觀手繪骨瓷工藝與選購精美茶具。",
          "highlights": [
            "Noritake 工藝中心現場觀摩大師手繪瓷器",
            "紅磚歷史建築與浪漫歐風林蔭大道"
          ],
          "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Noritake_Garden_kiln_wall_ac_%281%29.jpg/1280px-Noritake_Garden_kiln_wall_ac_%281%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
          "region": "nagoya",
          "photoLabel": "則武之森百年歷史紅磚窯壁與工坊綠意"
        },
        {
          "id": "d3_opt5",
          "name": "名古屋巨蛋「球弁」",
          "nameJp": "バンテリンドーム ナゴヤ 球弁",
          "isScheduled": false,
          "category": "dining",
          "coords": [
            35.1859,
            136.9474
          ],
          "tag": "日職限定球場便當",
          "address": "萬特力巨蛋名古屋 2F/5F 球弁專櫃",
          "googleMaps": "https://www.google.com/maps/search/?api=1&query=バンテリンドーム+ナゴヤ+球弁",
          "score": 3.42,
          "budget": "¥ (1,200~1,800円)",
          "description": "NotebookLM 重點記錄！由中日龍球星（高橋宏斗、細川成也等）親自挑選喜愛食材設計的限定便當，每份隨附專屬球員收藏閃卡，邊看球邊品嚐熱血滿分！",
          "mustOrder": [
            "高橋宏斗の肉づくし弁当 (高橋宏斗全肉便當)",
            "ドアラのお弁当 (Doala造型限定便當)"
          ],
          "region": "nagoya",
          "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Ekiben_%2844548722260%29.jpg/1280px-Ekiben_%2844548722260%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
          "photoLabel": "日職球場與車站精緻主題雙層便當 (Ekiben / 球弁)"
        },
        {
          "id": "hotel_hanshin",
          "name": "大阪阪神飯店",
          "nameJp": "ホテル阪神大阪 (天然温泉・徳次郎の湯)",
          "isScheduled": false,
          "isHotelBase": true,
          "category": "hotel",
          "coords": [
            34.6967,
            135.4868
          ],
          "tag": "🏨 下榻飯店",
          "address": "大阪府大阪市福島區福島5丁目6-16 (JR福島站步行1分)",
          "googleMaps": "https://maps.app.goo.gl/6jYd7QmqnLscha826",
          "description": "8/21~8/25 連續五晚大阪常駐下榻飯店！客房內均引入地下千米天然溫泉「德次郎之湯」，交通極致便利，JR福島站出站即達，距離梅田僅1站。",
          "highlights": [
            "所有客房浴室皆可享用天然溫泉直通泉水",
            "JR福島站出口步行僅 1 分鐘，直通梅田與關西機場快速",
            "周邊為著名福島聖天通居酒屋與米其林拉麵一級戰區"
          ],
          "hours": "Check-in 15:00 / Check-out 11:00",
          "img": "https://upload.wikimedia.org/wikipedia/commons/d/d4/Laxa-Osaka-%28Hotel-Hanshin%29-20090321.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled",
          "region": "osaka",
          "photoLabel": "位於 JR 福島站前之大阪阪神飯店 (Hotel Hanshin Osaka) 外觀，內設天然溫泉「德次郎之湯」"
        }
      ],
      "primaryRegion": "nagoya",
      "secondaryRegion": null
    },
    {
      "dayIndex": 4,
      "date": "2026-08-22",
      "dayOfWeek": "SAT",
      "location": "大阪 & 兵庫",
      "coverImg": "assets/images/koshien.jpg",
      "theme": "夏季甲子園大會・木津市場海鮮・新世界通天閣・力丸和牛燒肉",
      "summary": "上午前往高校野球最高殿堂「阪神甲子園球場」感受熱血甲子園大會，中午在「木津市場」享用澎湃海鮮丼，下午漫遊「新世界老街」與「通天閣」，晚間大啖「焼肉力丸和牛放題」。",
      "weather": {
        "desc": "晴朗晴空",
        "high": 34,
        "low": 27,
        "rain": 0,
        "icon": "☀️"
      },
      "mapCenter": [
        34.6525,
        135.5063
      ],
      "mapZoom": 13,
      "spots": [
        {
          "id": "d4_spot1",
          "name": "阪神甲子園球場 & 甲子園歷史館",
          "nameJp": "阪神甲子園球場・甲子園歴史館",
          "isScheduled": true,
          "category": "attraction",
          "order": 1,
          "time": "10:00 - 13:30",
          "coords": [
            34.7212,
            135.3616
          ],
          "tag": "日本高校野球聖地",
          "address": "兵庫縣西宮市甲子園町1-82",
          "googleMaps": "https://www.google.com/maps/search/?api=1&query=兵庫県西宮市甲子園町1-82",
          "description": "第108回全國高等學校野球選手權大會（夏之甲子園）激戰地！超過百年歷史的黑土天然草皮聖地，滿場銅管樂隊應援與青春淚水交織。",
          "highlights": [
            "親臨熱血夏之甲子園大會現場",
            "歷史館展示王貞治、松井秀喜、大谷翔平簽名球與KANO專區",
            "品嚐名物甲子園咖哩與甲子園炒麵"
          ],
          "photoTip": "在外野記分板下方與滿場爬滿綠色藤蔓的球場外牆合影最具歷史感。",
          "hours": "比賽期間視賽程而定 (歷史館 10:00 - 18:00)",
          "phrases": [
            {
              "scenario": "在甲子園商品部購買高校野球紀念毛巾",
              "japanese": "大会の記念タオルはどこにありますか？",
              "romaji": "Taikai no kinen taoru wa doko ni arimasu ka?",
              "chinese": "請問大會的紀念毛巾放在哪裡？",
              "audio": "大会の記念タオルはどこにありますか？"
            }
          ],
          "fullStory": [
            "【高校野球聖地與百年殿堂】大正13年(1924，歲次甲子)落成，為日本第一座大型多功能球場，更是日本全國高校野球選手權大會（春、夏甲子園）的最高聖殿。『高校野球的夏天』乘載著全日本四千多所高中球員的青春、汗水與淚水。",
            "【球場標誌與黑土傳奇】甲子園獨特的外牆常春藤綠藤、廣闊天然草皮與由鹿兒島黑土與京都砂土以黃金比例混合的『甲子園黑土』，落敗球隊球員跪地抓一把黑土帶回家的傳統聞名全球。",
            "【參觀動線】欣賞球場外圍紀念浮雕與歷代冠軍錦旗，走進『甲子園歷史館』參觀王貞治、松井秀喜、大谷翔平簽名球衣，特別參觀 1931 年勇奪準優勝的台灣嘉義農林『KANO』專區，並登上球場計分板下方觀景台俯瞰全場。"
          ],
          "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Hanshin_Koshien_Stadium_220809o.jpg/1280px-Hanshin_Koshien_Stadium_220809o.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
          "region": "hyogo",
          "photoLabel": "高校野球聖地阪神甲子園球場黑土內野與外野草皮全景"
        },
        {
          "id": "d4_spot2",
          "name": "木津卸賣市場",
          "nameJp": "木津卸売市場 (大阪木津市場)",
          "isScheduled": true,
          "category": "dining",
          "order": 2,
          "time": "14:00 - 15:30",
          "coords": [
            34.6568,
            135.4988
          ],
          "tag": "大阪三大市場",
          "address": "大阪府大阪市浪速區敷津東2丁目2-8",
          "googleMaps": "https://www.google.com/maps/search/?api=1&query=大阪市浪速区敷津東2丁目2-8",
          "score": 3.65,
          "budget": "¥¥ (2,000~3,500円)",
          "description": "擁有300年歷史的大阪市民廚房，新鮮度直逼築地！現剖海膽、鮪魚大腹生魚片與高甜度日本水蜜桃、麝香葡萄。",
          "mustOrder": [
            "極上海鮮丼 (大とろ・うに・いくら)",
            "現烤扇貝與鮑魚",
            "山梨縣產白桃"
          ],
          "notes": "批發市場清晨最熱鬧，下午可至市場食堂街品嚐現做魚料理。",
          "phrases": [
            {
              "scenario": "在海鮮攤位詢問生魚片推薦",
              "japanese": "今日の一番おすすめの魚は何ですか？",
              "romaji": "Kyou no ichiban osusume no sakana wa nan desu ka?",
              "chinese": "請問今天最推薦的魚是什麼？",
              "audio": "今日の一番おすすめの魚は何ですか？"
            }
          ],
          "fullStory": [
            "【300年歷史浪花市民廚房】木津卸賣市場創立於江戶時代正德年間（約1710年），擁有超過 300 年歷史，與黑門市場並列為大阪最具代表性的海鮮批發市場，因直營批發，新鮮度極高且價格比觀光市場更為親民。",
            "【市場美食街與時令鮮味】清晨是關西各大料亭主廚採購漁獲的戰場，午後可在市場食堂街品嚐現剖海膽、黑鮪魚大腹、肥美生蠔與炙燒海鮮丼，還能採買當季日本水蜜桃、麝香葡萄與高級水果。"
          ],
          "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Kaisendon.jpg/1280px-Kaisendon.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
          "region": "osaka",
          "photoLabel": "大阪市場食堂極上海鮮丼，鋪滿肥美黑鮪魚大腹、現剖海膽與甜蝦"
        },
        {
          "id": "d4_spot3",
          "name": "新世界老街 & 通天閣",
          "nameJp": "新世界・通天閣",
          "isScheduled": true,
          "category": "attraction",
          "order": 3,
          "time": "16:00 - 18:00",
          "coords": [
            34.6525,
            135.5063
          ],
          "tag": "浪速懷舊昭和地標",
          "address": "大阪府大阪市浪速區惠美須東1丁目18-6",
          "googleMaps": "https://www.google.com/maps/search/?api=1&query=大阪市浪速区恵美須東1丁目18-6",
          "description": "充滿昭和懷舊昭和霓虹燈與巨大河豚招牌的新世界，登上通天閣摸摸比利肯神像（Billiken）腳底祈求好運，體驗從 22 米高處滑落的「Tower Slider」巨型溜滑梯！",
          "highlights": [
            "觸摸福神比利肯(Billiken)腳底求財運",
            "長達 60 公尺的戶外螺旋巨型溜滑梯 Tower Slider",
            "通天閣頂端懸空透明玻璃展望台 Dive & Walk"
          ],
          "photoTip": "從南陽通商店街入口抬頭以大河豚招牌為前景框住通天閣。",
          "hours": "10:00 - 20:00 (展望台門票 900 円 / Slider 1,000 円)",
          "phrases": [
            {
              "scenario": "在通天閣詢問溜滑梯等待時間",
              "japanese": "タワースライダーの待ち時間はどのくらいですか？",
              "romaji": "Tawaa suraidaa no machijikan wa dono kurai desu ka?",
              "chinese": "請問通天閣溜滑梯要排多久時間？",
              "audio": "タワースライダーの待ち時間はどのくらいですか？"
            }
          ],
          "fullStory": [
            "【新世界昭和風情與比利肯福神】1912年以巴黎艾菲爾鐵塔與紐約康尼島為藍本打造的娛樂商圈，充滿巨大河豚燈籠與昭和懷舊霓虹燈。通天閣頂端供奉著摸腳底就能帶來幸運的『比利肯 (Billiken)』神像，為大阪庶民守護神。",
            "【Tower Slider 巨型溜滑梯】2022年全新增設全長 60 公尺、高低落差 22 米的螺旋巨型溜滑梯『Tower Slider』，從三樓戶外旋轉滑落僅需 10 秒，刺激又富趣味；頂層設有懸空透明地板步道 Dive & Walk。"
          ],
          "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Ts%C5%ABtenkaku_%26_Shinsekai.JPG/1280px-Ts%C5%ABtenkaku_%26_Shinsekai.JPG?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
          "region": "osaka",
          "photoLabel": "大阪新世界巨大河豚燈籠招牌與聳立之後方通天閣"
        },
        {
          "id": "d4_spot4",
          "name": "焼肉力丸",
          "nameJp": "焼肉力丸 なんば道頓堀店",
          "isScheduled": true,
          "category": "dining",
          "order": 4,
          "time": "18:30 - 20:30",
          "coords": [
            34.6685,
            135.5015
          ],
          "tag": "特選黑毛和牛放題",
          "address": "大阪府大阪市中央區道頓堀2丁目2-2",
          "googleMaps": "https://www.google.com/maps/search/?api=1&query=焼肉力丸+なんば道頓堀店",
          "score": 3.52,
          "budget": "¥¥¥ (3,500~5,000円)",
          "description": "產地直送冷藏特選日本黑毛和牛炭火燒肉！厚切牛舌、極上牛小排與橫膈膜肉質多汁，提供多樣化放題套餐。",
          "mustOrder": [
            "名物 4種厚切りステーキ (厚切牛排4選)",
            "上カルビ (特選牛五花)",
            "ねぎ塩タン (蔥鹽牛舌)"
          ],
          "notes": "採用觸控平板點餐支援多語言，建議提前預約。",
          "phrases": [
            {
              "scenario": "在燒肉店請店員更換烤網",
              "japanese": "網を交換していただけますか？",
              "romaji": "Ami o koukan shite itadakemasu ka?",
              "chinese": "可以幫我們換烤網嗎？",
              "audio": "網を交換していただけますか？"
            }
          ],
          "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Matsusaka_Beef_of_Korean_barbecue_using_charcoal_fire.jpg/1280px-Matsusaka_Beef_of_Korean_barbecue_using_charcoal_fire.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
          "region": "osaka",
          "photoLabel": "日式炭火烤爐上滋滋作響之特選黑毛和牛燒肉"
        },
        {
          "id": "d4_opt1",
          "name": "日本橋電電街",
          "nameJp": "でんでんタウン (日本橋電気街)",
          "isScheduled": false,
          "category": "quest",
          "coords": [
            34.6601,
            135.5058
          ],
          "tag": "關西動漫與模型聖地",
          "address": "大阪府大阪市浪速區日本橋4丁目",
          "googleMaps": "https://www.google.com/maps/search/?api=1&query=日本橋でんでんタウン",
          "description": "與東京秋葉原齊名的動漫、模型手辦、復古懷舊遊戲機與電子零件一條街，模型愛好者天堂。",
          "highlights": [
            "Super Potato 懷舊任天堂遊戲",
            "駿河屋、Animate 與大型扭蛋專門店"
          ],
          "img": "https://upload.wikimedia.org/wikipedia/commons/a/a5/Den_den_town_electric_street_osaka_japan.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled",
          "region": "osaka",
          "photoLabel": "大阪日本橋電電街大型動漫模型專賣店與電器商場街景"
        },
        {
          "id": "d4_opt2",
          "name": "元祖串炸達摩 通天閣店",
          "nameJp": "元祖串かつ だるま 通天閣店",
          "isScheduled": false,
          "category": "dining",
          "coords": [
            34.6528,
            135.506
          ],
          "tag": "大阪串炸始祖",
          "address": "大阪府大阪市浪速區惠美須東1丁目6-8",
          "googleMaps": "https://www.google.com/maps/search/?api=1&query=元祖串かつだるま+通天閣店",
          "score": 3.49,
          "budget": "¥¥ (1,500~2,500円)",
          "description": "昭和4年創業，嚴格遵守「禁止二次沾醬」鐵則！特製麵衣外酥內輕盈，沾上酸甜黑醬汁一口入魂。",
          "mustOrder": [
            "元祖串かつ (牛肉串)",
            "どて焼き (味噌燉牛筋)",
            "天然蝦串"
          ],
          "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Kushikatsu_Daruma_%2849252548502%29.jpg/1280px-Kushikatsu_Daruma_%2849252548502%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
          "region": "osaka",
          "photoLabel": "通天閣旁元祖串炸達摩招牌憤怒達摩大叔與金黃香酥串炸"
        },
        {
          "id": "d4_opt3",
          "name": "阿倍野 HARUKAS 300 展望台",
          "nameJp": "あべのハルカス300 展望台",
          "isScheduled": false,
          "category": "quest",
          "coords": [
            34.6458,
            135.5138
          ],
          "tag": "全日本第一高樓百萬夜景",
          "address": "大阪府大阪市阿倍野區阿倍野筋1丁目1-43",
          "googleMaps": "https://www.google.com/maps/search/?api=1&query=あべのハルカス300",
          "description": "高達 300 公尺的日本最高摩天大樓，60樓空中迴廊 360 度玻璃全景遠眺京都、六甲山與關西機場。",
          "highlights": [
            "300米高空懸空玻璃地板",
            "三層通透挑高空中花園廣場"
          ],
          "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Abeno_Harukas_SKY_GARDEN_300.jpg/1280px-Abeno_Harukas_SKY_GARDEN_300.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
          "region": "osaka",
          "photoLabel": "阿倍野 HARUKAS 300 頂層 58-60 樓落地玻璃窗俯瞰大阪萬家燈火"
        },
        {
          "id": "hotel_hanshin",
          "name": "大阪阪神飯店",
          "nameJp": "ホテル阪神大阪 (天然温泉・徳次郎の湯)",
          "isScheduled": false,
          "isHotelBase": true,
          "category": "hotel",
          "coords": [
            34.6967,
            135.4868
          ],
          "tag": "🏨 下榻飯店",
          "address": "大阪府大阪市福島區福島5丁目6-16 (JR福島站步行1分)",
          "googleMaps": "https://maps.app.goo.gl/6jYd7QmqnLscha826",
          "description": "8/21~8/25 連續五晚大阪常駐下榻飯店！客房內均引入地下千米天然溫泉「德次郎之湯」，交通極致便利，JR福島站出站即達，距離梅田僅1站。",
          "highlights": [
            "所有客房浴室皆可享用天然溫泉直通泉水",
            "JR福島站出口步行僅 1 分鐘，直通梅田與關西機場快速",
            "周邊為著名福島聖天通居酒屋與米其林拉麵一級戰區"
          ],
          "hours": "Check-in 15:00 / Check-out 11:00",
          "img": "https://upload.wikimedia.org/wikipedia/commons/d/d4/Laxa-Osaka-%28Hotel-Hanshin%29-20090321.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled",
          "region": "osaka",
          "photoLabel": "位於 JR 福島站前之大阪阪神飯店 (Hotel Hanshin Osaka) 外觀，內設天然溫泉「德次郎之湯」"
        }
      ],
      "primaryRegion": "osaka",
      "secondaryRegion": "hyogo"
    },
    {
      "dayIndex": 5,
      "date": "2026-08-23",
      "dayOfWeek": "SUN",
      "location": "大阪",
      "coverImg": "assets/images/dotonbori.jpg",
      "theme": "丸福昭和厚鬆餅・大阪城天守・道頓堀狂歡・梅田空中庭園",
      "summary": "早晨在「丸福咖啡」享受昭和厚鬆餅與濃粹黑咖啡，上午登「大阪城天守閣」俯瞰天下，中午品嚐「章魚八明石燒」，下午漫步「道頓堀跑跑人」與「法善寺水掛地藏」，晚間逛「天神橋筋商店街」與登上「梅田藍天大廈」欣賞百萬夜景。",
      "weather": {
        "desc": "晴午後雷雨",
        "high": 34,
        "low": 26,
        "rain": 30,
        "icon": "⛅"
      },
      "mapCenter": [
        34.6873,
        135.5262
      ],
      "mapZoom": 14,
      "spots": [
        {
          "id": "d5_spot1",
          "name": "丸福咖啡千日前本店",
          "nameJp": "丸福珈琲店 千日前本店",
          "isScheduled": true,
          "category": "dining",
          "order": 1,
          "time": "08:30 - 09:45",
          "coords": [
            34.6672,
            135.5031
          ],
          "tag": "昭和懷舊喫茶",
          "address": "大阪府大阪市中央區千日前1丁目9-1",
          "googleMaps": "https://www.google.com/maps/search/?api=1&query=大阪市中央区千日前1丁目9-1",
          "score": 3.62,
          "budget": "¥ (1,000~1,500円)",
          "description": "昭和9年創業，保留古典紅磚、復古皮椅與彩繪玻璃。名物銅板現煎厚鬆餅外酥內鬆軟，佐特調蜂蜜與自製濃萃手沖黑咖啡堪稱絕配。",
          "mustOrder": [
            "ホットケーキ (銅板現煎厚鬆餅)",
            "ブレンド珈琲 (丸福經典手沖黑咖啡)"
          ],
          "notes": "厚鬆餅現點現煎需等候約 15 分鐘，可選楓糖漿或蜂蜜。",
          "phrases": [
            {
              "scenario": "在丸福咖啡點厚鬆餅與熱咖啡",
              "japanese": "ホットケーキのハチミツ添えと、ホットコーヒーをお願いします。",
              "romaji": "Hotto keeki no hachimitsu-zoe to, hotto koohii o onegaishimasu.",
              "chinese": "請給我一份附蜂蜜的厚鬆餅和一杯熱咖啡。",
              "audio": "ホットケーキをお願いします"
            }
          ],
          "fullStory": [
            "【昭和9年創業的黑咖啡傳奇】丸福咖啡千日前本店保留了昭和早期的紅磚牆、古董皮沙發與彩繪玻璃窗，充滿大正至昭和時期的浪漫沙龍氣息，被譽為關西深度咖啡文化的象徵。",
            "【名物現煎厚鬆餅】店內招牌銅板現煎厚鬆餅，厚度達 3 公分以上，外層金黃微脆、內層如蛋糕般綿密鬆軟，搭配特製天然蜂蜜與丸福招牌特濃深焙手沖黑咖啡，苦甜交融無比美妙。"
          ],
          "img": "https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=1200&q=80",
          "region": "osaka",
          "photoLabel": "昭和懷舊喫茶店金黃現煎厚鬆餅佐楓糖漿與深焙手沖黑咖啡"
        },
        {
          "id": "d5_spot2",
          "name": "大阪城 天守閣 & 大阪城公園",
          "nameJp": "大阪城 天守閣・大阪城公園",
          "isScheduled": true,
          "category": "attraction",
          "order": 2,
          "time": "10:30 - 13:00",
          "coords": [
            34.6873,
            135.5262
          ],
          "tag": "日本三大名城之首",
          "address": "大阪府大阪市中央區大阪城1-1",
          "googleMaps": "https://www.google.com/maps/search/?api=1&query=大阪市中央区大阪城1-1",
          "description": "豐臣秀吉於1583年統一日本時所建的宏偉名城，護城河擁有全日本最大石垣（蛸石），8樓展望台可360度俯瞰大阪繁華天際線。",
          "highlights": [
            "綠瓦金箔天守閣展望台與黃金茶室模型",
            "重達 108 噸的城內第一大巨石「蛸石」",
            "極樂橋與護城河御御座船巡航"
          ],
          "photoTip": "從極樂橋正中央向南仰望天守閣，能將護城河水面與天守完美收進鏡頭。",
          "hours": "09:00 - 17:00 (天守門票 600 円)",
          "phrases": [
            {
              "scenario": "詢問大阪城天守閣展望台電梯方向",
              "japanese": "展望台へ行くエレベーターはどこですか？",
              "romaji": "Tenboudai e iku erebeetaa wa doko desu ka?",
              "chinese": "請問前往展望台的電梯在哪裡？",
              "audio": "展望台へ行くエレベーターはどこですか？"
            }
          ],
          "fullStory": [
            "【秀吉築城與巨石石垣】天正11年(1583)豐臣秀吉於石山本願寺舊址興建，歷經大阪冬之陣、夏之陣焚毀，德川幕府二度重建，現今天守為昭和6年(1931)由大阪市民募資重建的復興天守，內部為現代化歷史博物館。",
            "【蛸石與護城河】大阪城擁有全日本規模最龐大的護城河石垣，本丸入口櫻門旁的『蛸石』面積達 36 疊榻榻米、重達 108 噸，為城內第一大巨石；8樓展望台可360度俯瞰大阪全景與西之丸庭園。"
          ],
          "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Osaka_Castle_-_Japan.jpg/1280px-Osaka_Castle_-_Japan.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
          "region": "osaka",
          "photoLabel": "巍峨聳立的大阪城天守閣綠瓦金箔飛簷與護城河石垣"
        },
        {
          "id": "d5_spot3",
          "name": "章魚八 道頓堀總本店",
          "nameJp": "たこ八 道頓堀総本店",
          "isScheduled": true,
          "category": "dining",
          "order": 3,
          "time": "13:30 - 14:45",
          "coords": [
            34.6687,
            135.5018
          ],
          "tag": "道頓堀章魚燒名家",
          "address": "大阪府大阪市中央區道頓堀1丁目5-10",
          "googleMaps": "https://www.google.com/maps/search/?api=1&query=大阪市中央区道頓堀1丁目5-10",
          "score": 3.45,
          "budget": "¥ (800~1,500円)",
          "description": "以秘傳柴魚昆布高湯浸泡的「明石燒 (蛋香軟嫩玉子燒)」與外酥內爆漿的大阪章魚燒聞名，現場師傅俐落翻烤香氣四溢。",
          "mustOrder": [
            "明石焼き (高湯明石燒)",
            "秘伝しょうゆたこ焼き (秘傳醬油章魚燒)",
            "お好み焼き (大阪燒)"
          ],
          "notes": "1樓可外帶或立食，2樓與3樓有冷氣座位區。",
          "phrases": [
            {
              "scenario": "在章魚八點一份明石燒內用",
              "japanese": "明石焼きを一人前、店内で食べます。",
              "romaji": "Akashiyaki o ichinin-mae, tennai de tabemasu.",
              "chinese": "請給我一份明石燒，我們在店內用餐。",
              "audio": "明石焼きを一人前店内で食べます"
            }
          ],
          "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Honkeohtako%27s_takoyaki%2C_Osaka%3B_December_2013_%2806%29.jpg/1280px-Honkeohtako%27s_takoyaki%2C_Osaka%3B_December_2013_%2806%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
          "region": "osaka",
          "photoLabel": "道頓堀名物現烤章魚燒，淋上秘傳醬汁與翻滾的柴魚片"
        },
        {
          "id": "d5_spot4",
          "name": "道頓堀 固力果跑跑人 & 法善寺橫丁",
          "nameJp": "道頓堀 グリコサイン・法善寺横丁",
          "isScheduled": true,
          "category": "attraction",
          "order": 4,
          "time": "15:00 - 17:00",
          "coords": [
            34.6687,
            135.5013
          ],
          "tag": "大阪靈魂地標與石板古街",
          "address": "大阪府大阪市中央區道頓堀1丁目",
          "googleMaps": "https://www.google.com/maps/search/?api=1&query=道頓堀グリコサイン",
          "description": "大阪最熱鬧地標！戎橋上與第六代固力果跑跑人合影，隨後轉入綠意苔蘚覆蓋的水掛不動明王「法善寺橫丁」，感受江戶石板古徑的靜謐幽情。",
          "highlights": [
            "戎橋固力果跑跑人經典舉手擺拍",
            "法善寺水掛不動明王祈求願望舀水淋佛像",
            "唐吉訶德黃色惠比壽摩天輪塔"
          ],
          "photoTip": "在戎橋靠道頓堀水岸台階由下往上仰拍固力果招牌，可避開橋面擁擠人潮。",
          "hours": "全日開放自由漫步 (法善寺水掛地藏 24小時開放)",
          "phrases": [
            {
              "scenario": "在戎橋請路人幫忙拍照",
              "japanese": "すみません、グリコの看板をバックに写真を撮っていただけますか？",
              "romaji": "Sumimasen, Guriko no看板 o bakku ni shashin o totte itadakemasu ka?",
              "chinese": "不好意思，可以以固力果招牌為背景幫我們拍張照嗎？",
              "audio": "写真を撮っていただけますか？"
            }
          ],
          "fullStory": [
            "【道頓堀運河與第六代跑跑人】慶長17年(1612)由安井道頓私資開鑿運河，江戶時代成為戲院、歌舞伎與居酒屋聚集的浪花娛樂中心。戎橋上的『固力果跑跑人』看板自 1935 年設置至今已演進至第六代，採用 14 萬顆 LED 依傍背景變換日夜光影。",
            "【法善寺苔蘚水掛不動尊】轉入狹窄幽靜的法善寺橫丁，石板路兩側保留昭和木造老店與割烹居酒屋。寺內供奉的『西向不動明王（水掛不動）』長年承受參拜者祈願舀水澆灌，整座佛像已被茂密厚實的翠綠青苔完整覆蓋，求良緣、生意興隆靈驗無比。"
          ],
          "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Dotonbori%2C_Osaka%2C_at_night%2C_November_2016.jpg/1280px-Dotonbori%2C_Osaka%2C_at_night%2C_November_2016.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
          "region": "osaka",
          "photoLabel": "道頓堀戎橋畔第六代固力果跑跑人 (Glico Man) 霓虹燈看板與璀璨夜色"
        },
        {
          "id": "d5_spot5",
          "name": "天神橋筋商店街",
          "nameJp": "天神橋筋商店街",
          "isScheduled": true,
          "category": "attraction",
          "order": 5,
          "time": "17:30 - 19:30",
          "coords": [
            34.7072,
            135.5115
          ],
          "tag": "日本第一長庶民商店街",
          "address": "大阪府大阪市北區天神橋1丁目～7丁目",
          "googleMaps": "https://www.google.com/maps/search/?api=1&query=天神橋筋商店街",
          "description": "全長2.6公里、擁有600多家店舖的日本最長商店街！從天神橋1丁目一路延伸至7丁目，滿載大阪在地庶民人情味、便宜藥妝、老字號可樂餅與壽司店。",
          "highlights": [
            "橫跨三個地鐵站的超巨型有頂拱廊商店街",
            "中村屋炸牛肉可樂餅（大阪藝人最愛）",
            "春駒壽司排隊名店"
          ],
          "photoTip": "商店街入口懸掛的四神（青龍、白虎、朱雀、玄武）大型和風人形鳥居最富趣味。",
          "hours": "各店營業時間不同 (多數 10:00 - 21:00)",
          "phrases": [
            {
              "scenario": "在商店街熟食店外帶可樂餅",
              "japanese": "コロッケを二つ持ち帰りでお願いします。",
              "romaji": "Korokke o futatsu mochikaeri de onegaishimasu.",
              "chinese": "請給我兩個可樂餅外帶。",
              "audio": "コロッケを二つ持ち帰りでお願いします"
            }
          ],
          "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Tenjinbashi-suji_Syotengai1.jpg/1280px-Tenjinbashi-suji_Syotengai1.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
          "region": "osaka",
          "photoLabel": "日本最長的天神橋筋商店街拱廊天花板鳥居造景與庶民商舖"
        },
        {
          "id": "d5_spot6",
          "name": "梅田藍天大廈",
          "nameJp": "梅田スカイビル 空中庭園展望台",
          "isScheduled": true,
          "category": "attraction",
          "order": 6,
          "time": "20:00 - 21:45",
          "coords": [
            34.7052,
            135.49
          ],
          "tag": "世界TOP 20建築之百萬夜景",
          "address": "大阪府大阪市北區大淀中1丁目1-88",
          "googleMaps": "https://www.google.com/maps/search/?api=1&query=大阪市北区大淀中1丁目1-88",
          "description": "被英國泰晤士報評選為「世界代表性建築TOP 20」！兩棟40層摩天大樓在頂部由懸空圓形平台連接，搭乘離地173米的透明手扶梯登上屋頂 Lumi Deck 露天星空步道，盡攬淀川落日與大阪百萬霓虹夜景。",
          "highlights": [
            "離地 173 米懸空透明圓筒手扶梯",
            "39~40F 露天 360 度無死角頂樓空中漫步 Lumi Sky Walk",
            "星空夜光地板與情人鎖展望台"
          ],
          "photoTip": "從空中庭園西北側可俯瞰淀川夕陽染紅天際，入夜後轉向難波方向拍攝燈海。",
          "hours": "09:30 - 22:30 (門票 1,500 円，最後入場 22:00)",
          "phrases": [
            {
              "scenario": "在梅田藍天大廈購買空中庭園門票",
              "japanese": "空中庭園の大人二枚をお願いします。",
              "romaji": "Kuuchuu teien no otona nimai o onegaishimasu.",
              "chinese": "請給我兩張空中庭園成人票。",
              "audio": "空中庭園の大人二枚をお願いします"
            }
          ],
          "fullStory": [
            "【世界TOP 20代表性建築】1993年由名建築家原廣司操刀設計，被英國《THE TIMES》評選為『世界最具代表性建築 TOP 20』（與羅馬競技場、聖家堂齊名）。兩棟40層摩天大樓在地面組裝完頂部圓形空中庭園後，以大型起重機吊裝升空固定（Lift-up工法）。",
            "【星空步道體驗】搭乘離地 173 米懸空橫跨兩塔的透明手扶梯登上屋頂，踏上露天 360 度環形步道『Lumi Sky Walk』，地面鋪設蓄光石宛如踩在銀河星空中，向下俯瞰淀川夕陽倒影與大阪萬家燈火。"
          ],
          "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Osaka_Umeda_Sky_Building_12.jpg/1280px-Osaka_Umeda_Sky_Building_12.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
          "region": "osaka",
          "photoLabel": "梅田藍天大廈雙子塔頂部懸空之空中庭園圓形連通平台與透空結構"
        },
        {
          "id": "d5_opt1",
          "name": "中之島水岸散策 & I'm Imas Cafe",
          "nameJp": "中之島リバーサイド・I'm Imas Cafe",
          "isScheduled": false,
          "category": "quest",
          "coords": [
            34.6932,
            135.4925
          ],
          "tag": "水岸綠洲與文青咖啡",
          "address": "大阪府大阪市北區中之島",
          "googleMaps": "https://www.google.com/maps/search/?api=1&query=中之島+カフェ",
          "description": "位於堂島川與土佐堀川交會的中之島綠地水岸，充滿洋風歷史建築、中央公會堂與現代露天露台咖啡館，散步極為舒適愜意。",
          "highlights": [
            "中之島中央公會堂紅磚建築",
            "堂島川水岸戶外景觀座位"
          ],
          "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Osaka_City_Central_Public_Hall.jpg/1280px-Osaka_City_Central_Public_Hall.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
          "region": "osaka",
          "photoLabel": "中之島水岸邊紅磚拱頂之大阪市中央公會堂與堂島川倒影"
        },
        {
          "id": "d5_opt2",
          "name": "春駒 壽司 本店",
          "nameJp": "春駒 本店 (天神橋筋)",
          "isScheduled": false,
          "category": "dining",
          "coords": [
            34.7088,
            135.5122
          ],
          "tag": "極高CP值握壽司",
          "address": "大阪府大阪市北區天神橋5丁目5-2",
          "googleMaps": "https://www.google.com/maps/search/?api=1&query=春駒+本店+天神橋",
          "score": 3.65,
          "budget": "¥¥ (2,000~3,500円)",
          "description": "天神橋筋排隊人潮從不間斷的傳奇壽司店！厚度驚人的肥美鰻魚、鮪魚中腹、鮭魚卵與海膽握壽司，價格親民至極。",
          "mustOrder": [
            "上うなぎ (厚切烤鰻魚握壽司)",
            "トロ (鮪魚中腹握壽司)",
            "赤だし (紅味噌蜆湯)"
          ],
          "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Nigiri_Sushi_%2826478725732%29.jpg/1280px-Nigiri_Sushi_%2826478725732%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
          "region": "osaka",
          "photoLabel": "天滿市場春駒吧台現捏厚切鮪魚大腹、海膽與干貝握壽司盛合"
        },
        {
          "id": "hotel_hanshin",
          "name": "大阪阪神飯店",
          "nameJp": "ホテル阪神大阪 (天然温泉・徳次郎の湯)",
          "isScheduled": false,
          "isHotelBase": true,
          "category": "hotel",
          "coords": [
            34.6967,
            135.4868
          ],
          "tag": "🏨 下榻飯店",
          "address": "大阪府大阪市福島區福島5丁目6-16 (JR福島站步行1分)",
          "googleMaps": "https://maps.app.goo.gl/6jYd7QmqnLscha826",
          "description": "8/21~8/25 連續五晚大阪常駐下榻飯店！客房內均引入地下千米天然溫泉「德次郎之湯」，交通極致便利，JR福島站出站即達，距離梅田僅1站。",
          "highlights": [
            "所有客房浴室皆可享用天然溫泉直通泉水",
            "JR福島站出口步行僅 1 分鐘，直通梅田與關西機場快速",
            "周邊為著名福島聖天通居酒屋與米其林拉麵一級戰區"
          ],
          "hours": "Check-in 15:00 / Check-out 11:00",
          "img": "https://upload.wikimedia.org/wikipedia/commons/d/d4/Laxa-Osaka-%28Hotel-Hanshin%29-20090321.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled",
          "region": "osaka",
          "photoLabel": "位於 JR 福島站前之大阪阪神飯店 (Hotel Hanshin Osaka) 外觀，內設天然溫泉「德次郎之湯」"
        }
      ],
      "primaryRegion": "osaka",
      "secondaryRegion": null
    },
    {
      "dayIndex": 6,
      "date": "2026-08-24",
      "dayOfWeek": "MON",
      "location": "大阪 & 奈良",
      "coverImg": "assets/images/nara.jpg",
      "theme": "近鐵觀光特急 AONIYOSHI・奈良千鹿・東大寺大佛・春日大社",
      "summary": "上午09:10搭乘近鐵最新奢華觀光特急「青丹吉 (AONIYOSHI)」前往古都奈良，中午在公園旁享用名物「志津香七種釜飯」，下午漫步「奈良公園」與千隻神鹿互動、參觀「東大寺大佛殿」與「春日大社千座石燈籠」，漫步奈良町品嚐「中谷堂高速搗麻糬」。",
      "weather": {
        "desc": "晴時多雲",
        "high": 33,
        "low": 25,
        "rain": 10,
        "icon": "🦌"
      },
      "mapCenter": [
        34.6851,
        135.8398
      ],
      "mapZoom": 14,
      "spots": [
        {
          "id": "d6_spot1",
          "name": "近鐵觀光特急 AONIYOSHI",
          "nameJp": "近鉄観光特急 あをによし (大阪難波 ➔ 近鉄奈良)",
          "isScheduled": true,
          "category": "transport",
          "order": 1,
          "time": "09:10 難波發車 (35分直達奈良)",
          "coords": [
            34.6668,
            135.5005
          ],
          "tag": "奢華和風觀光列車",
          "address": "近鐵大阪難波站 (大阪市中央區難波4丁目1-17) ➔ 抵達近鐵奈良站",
          "googleMaps": "https://www.google.com/maps/search/?api=1&query=近鉄大阪難波駅",
          "description": "以天平時代紫色與正倉院花鳥寶紋為主題的頂級觀光特急！全車雙人沙發與四人包廂沙龍席，車上販售奈良特產大和茶與限定甜點，僅需 35 分鐘直達近鐵奈良站。",
          "highlights": [
            "天平文化正倉院花紋奢華和風車廂",
            "1.3倍寬敞雙人斜角景觀沙發席",
            "車上專屬銷售吧台限定大和焙茶霜淇淋"
          ],
          "photoTip": "在月台拍攝紫色車頭金屬徽章，車內拍攝沙發座位與復古吊燈。",
          "hours": "09:10 大阪難波發車 ➔ 09:45 抵達近鐵奈良站",
          "phrases": [
            {
              "scenario": "在車上吧台購買大和茶限定甜點",
              "japanese": "あをによし限定の大和茶スイーツを一つください。",
              "romaji": "Aoniyoshi gentei no Yamato-cha suiitsu o hitotsu kudasai.",
              "chinese": "請給我一份青丹吉限定的大和茶甜點。",
              "audio": "あをによし限定スイーツをください"
            }
          ],
          "fullStory": [
            "【奈良古都奢華觀光列車】2022年4月登場，取名自日本古和歌《萬葉集》中讚頌奈良古都之枕詞『あをによし（青丹吉）』。全車外觀塗裝為代表天平時代皇室貴族的『高貴紫（紫紺色）』，車廂金屬徽章取材自正倉院寶物『花鳥背八角鏡』。",
            "【沙發包廂與大和茶吧台】將原本四排座椅大幅縮減為兩排，配置 1.3 倍寬敞的斜向雙人景觀沙發席與四人半開放沙龍包廂；2號車廂設有專屬銷售吧台，販售奈良特產大和茶、限定精釀啤酒與紫薯甜點，僅需 35 分鐘直達近鐵奈良。"
          ],
          "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Kintetsu_Series19200_Aoniyoshi.jpg/1280px-Kintetsu_Series19200_Aoniyoshi.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
          "region": "osaka",
          "photoLabel": "近鐵 19200 系「AONIYOSHI (あをによし)」紫檀色奢華觀光特急列車"
        },
        {
          "id": "d6_spot2",
          "name": "志津香 釜飯",
          "nameJp": "志津香 公園店",
          "isScheduled": true,
          "category": "dining",
          "order": 2,
          "time": "10:30 - 12:00",
          "coords": [
            34.6842,
            135.8365
          ],
          "tag": "奈良50年釜飯代表",
          "address": "奈良縣奈良市登大路町59-11",
          "googleMaps": "https://www.google.com/maps/search/?api=1&query=志津香+公園店+奈良",
          "score": 3.58,
          "budget": "¥¥ (1,800~2,800円)",
          "description": "昭和34年創業，古都奈良釜飯代名詞！嚴選利尻昆布與頂級柴魚高湯，每鍋現點現煮，鍋底焦香微脆金黃鍋巴配上鮮蝦、星鰻、筍乾鮮甜無比。",
          "mustOrder": [
            "奈良七種釜めし (奈良七種釜飯：蝦、鰻魚、雞肉、蟹肉、香菇、筍、牛蒡)",
            "大和肉鶏釜めし (大和土雞釜飯)"
          ],
          "notes": "緊鄰奈良公園與國立博物館，建議 10:30 開門前抵達排隊避免久候。",
          "phrases": [
            {
              "scenario": "在志津香點招牌奈良七種釜飯套餐",
              "japanese": "奈良七種釜めしの定食を二つお願いします。",
              "romaji": "Nara nanakusa kamameshi no teishoku o futatsu onegaishimasu.",
              "chinese": "請給我兩份奈良七種釜飯定食。",
              "audio": "奈良七種釜めしの定食をお願いします"
            }
          ],
          "fullStory": [
            "【奈良50年釜飯代表名店】昭和34年(1959)創立，緊鄰奈良公園與國立博物館。堅持『一鍋一鍋生米現點現炊』，以北海道利尻昆布與頂級柴魚高湯為基底，鍋底微焦香脆的金黃鍋巴令人回味無窮。",
            "【招牌奈良七種釜飯】匯聚鮮蝦、星鰻、土雞、蟹肉、竹筍、香菇與牛蒡等七種山珍海味，米飯吸飽食材精華鮮甜無比，開蓋瞬間香氣四溢。"
          ],
          "img": "https://images.unsplash.com/photo-1539136788836-5699e78bfc75?auto=format&fit=crop&w=1200&q=80",
          "region": "nara",
          "photoLabel": "奈良志津香招牌直火現炊「奈良七種釜飯」鐵鍋定食"
        },
        {
          "id": "d6_spot3",
          "name": "奈良公園神鹿・東大寺大佛殿",
          "nameJp": "奈良公園・東大寺 大仏殿",
          "isScheduled": true,
          "category": "attraction",
          "order": 3,
          "time": "12:30 - 15:30",
          "coords": [
            34.6851,
            135.8398
          ],
          "tag": "世界文化遺產與國寶大佛",
          "address": "奈良縣奈良市雜司町406-1",
          "googleMaps": "https://www.google.com/maps/search/?api=1&query=奈良県奈良市雑司町406-1",
          "description": "漫步於棲息 1200 多隻野生神鹿的奈良公園，購買鹿仙貝體驗神鹿鞠躬禮。參拜西元752年聖武天皇建造的東大寺大佛殿（世界最大木造建築），殿內供奉高達15公尺的盧舍那大佛，並可挑戰鑽過「大佛鼻孔」木柱祈求平安。",
          "highlights": [
            "購買鹿仙貝 (鹿せんべい) 與會鞠躬的野生神鹿親密互動",
            "世界最大木造建築「東大寺大佛殿」與高15米盧舍那大佛",
            "大佛殿右後方穿過柱洞祈福（大仏の鼻の穴くぐり）"
          ],
          "photoTip": "在東大寺南大門前以木造金剛力士立像為背景，或在綠草地上捕捉小鹿向鏡頭探頭的瞬間。",
          "hours": "07:30 - 17:30 (大佛殿門票 600 円)",
          "phrases": [
            {
              "scenario": "在攤位購買鹿仙貝",
              "japanese": "鹿せんべいを一束ください。",
              "romaji": "Shika senbei o hitotaba kudasai.",
              "chinese": "請給我一疊鹿仙貝。",
              "audio": "鹿せんべいを一束ください"
            }
          ],
          "fullStory": [
            "【世界最大木造建築與盧舍那大佛】天平15年(743)聖武天皇為祈求國泰民安、消弭天災瘟疫而頒布《大佛造立之詔》，動員全國 260 萬人興建。大佛殿（金堂）長 57 米、高 48 米，為世界最大級木造建築，殿內供奉高達 15 米的『盧舍那大佛』。",
            "【神鹿使者與大佛鼻孔】傳說春日大社主神武甕槌命騎乘白鹿自鹿島降臨奈良，自此奈良的鹿被尊為『神之使者』。走入大佛殿右後方，可見一根開有方孔的巨大檜木柱，相傳洞口大小等同大佛鼻孔，順利鑽過者能消除災厄、考運昌隆。"
          ],
          "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Daibutsuden_at_the_Todaiji_Temple_-_Nara_%2841441116434%29.jpg/1280px-Daibutsuden_at_the_Todaiji_Temple_-_Nara_%2841441116434%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
          "region": "nara",
          "photoLabel": "奈良公園東大寺大佛殿世界遺產全景與草坪悠閒神鹿"
        },
        {
          "id": "d6_spot4",
          "name": "春日大社",
          "nameJp": "春日大社",
          "isScheduled": true,
          "category": "attraction",
          "order": 4,
          "time": "15:45 - 17:30",
          "coords": [
            34.6814,
            135.8484
          ],
          "tag": "世界遺產・藤原氏宗祠",
          "address": "奈良縣奈良市春日野町160",
          "googleMaps": "https://www.google.com/maps/search/?api=1&query=奈良市春日野町160",
          "description": "創建於西元768年，為全日本約3000座春日神社的總本社。參道兩側立有約 2000 座長滿青苔的石燈籠，迴廊懸掛約 1000 座青銅吊燈籠，朱紅柱樑與原始林翠綠相映生輝。",
          "highlights": [
            "3000座石燈籠與銅燈籠構成的幽玄「萬燈籠」世界",
            "「藤浪之屋」體驗漆黑空間中數百盞燭光燈籠搖曳",
            "可愛立體「鹿神籤 (鹿みくじ)」口含神籤"
          ],
          "photoTip": "在朱紅迴廊下拍攝整排垂吊青銅吊燈籠，景深感極佳。",
          "hours": "06:30 - 17:30 (本殿特別參拜 500 円)",
          "phrases": [
            {
              "scenario": "在春日大社抽取白鹿神籤",
              "japanese": "白鹿みくじを一つ授かりたいです。",
              "romaji": "Shiroshika mikuji o hitotsu sazukaritai desu.",
              "chinese": "我想要抽取一個白鹿神籤。",
              "audio": "白鹿みくじを一つ授かりたいです"
            }
          ],
          "fullStory": [
            "【世界遺產春日大社與三千燈籠】創建於西元768年，由藤原家族所建，為全日本 3000 座春日神社總本社。朱紅色『春日造』社殿依傍御蓋山原始林而建，長年列入世界文化遺產。",
            "【萬燈籠的幽玄世界】參道沿線矗立約 2,000 座長滿青苔的石燈籠，迴廊下方垂掛約 1,000 座青銅吊燈籠，自平安時代由武士貴族及庶民奉納延續至今。走入境內『藤浪之屋』，可在全黑空間中親身體驗數百盞蠟燭點亮燈籠的幽玄和風美學。"
          ],
          "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Stone_Lanterns_lead_to_The_Kasuga_Shrine%2C_Nara%2C_Japan.jpg/1280px-Stone_Lanterns_lead_to_The_Kasuga_Shrine%2C_Nara%2C_Japan.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
          "region": "nara",
          "photoLabel": "春日大社原始林參道旁千座青苔石燈籠群與朱紅神殿"
        },
        {
          "id": "d6_opt1",
          "name": "中谷堂",
          "nameJp": "中谷堂",
          "isScheduled": false,
          "category": "dining",
          "coords": [
            34.6822,
            135.8288
          ],
          "tag": "電視冠軍現搗麻糬",
          "address": "奈良縣奈良市橋本町29",
          "googleMaps": "https://www.google.com/maps/search/?api=1&query=中谷堂+奈良",
          "score": 3.68,
          "budget": "¥ (180~500円)",
          "description": "榮獲日本電視冠軍「高速搗麻糬大賽」冠軍！職人以每秒好幾次的驚人速度持木槌現搗，溫熱剛出爐的艾草麻糬包裹北海道十勝紅豆餡，外層裹滿香濃黃豆粉，入口極致軟糯拉絲！",
          "mustOrder": [
            "よもぎ餅 (現做艾草紅豆麻糬)",
            "盒裝外帶伴手禮"
          ],
          "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Sanjodori_Nakatanido.jpg/1280px-Sanjodori_Nakatanido.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
          "region": "nara",
          "photoLabel": "奈良三條通中谷堂名物高速現搗艾草黃豆粉麻糬門市"
        },
        {
          "id": "d6_opt2",
          "name": "奈良町 老街・元興寺",
          "nameJp": "ならまち・元興寺",
          "isScheduled": false,
          "category": "quest",
          "coords": [
            34.6788,
            135.8315
          ],
          "tag": "江戶格子的町家老街",
          "address": "奈良縣奈良市中院町",
          "googleMaps": "https://www.google.com/maps/search/?api=1&query=ならまち+奈良",
          "description": "保留江戶時代至明治時期的傳統木造町家住宅，屋簷下懸掛紅白色「身代猿 (みがわりざる)」祈求消災，充滿雜貨店、古民家甜點與特色酒造。",
          "highlights": [
            "猿澤池畔倒映興福寺五重塔",
            "奈良町格子之家中庭與土藏空間體驗"
          ],
          "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Naramachii01n3200.jpg/1280px-Naramachii01n3200.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
          "region": "nara",
          "photoLabel": "奈良町古樸江戶木造町家建築與傳統格子窗老街風情"
        },
        {
          "id": "d6_opt3",
          "name": "平宗 奈良店",
          "nameJp": "平宗 奈良店",
          "isScheduled": false,
          "category": "dining",
          "coords": [
            34.6805,
            135.8292
          ],
          "tag": "奈良傳統鄉土料理",
          "address": "奈良縣奈良市今御門町30-1",
          "googleMaps": "https://www.google.com/maps/search/?api=1&query=平宗+奈良店",
          "score": 3.55,
          "budget": "¥¥ (1,500~2,500円)",
          "description": "文久元年(1861)創業，以殺菌防腐的柿葉包裹醋飯與鹽漬鯖魚、鮭魚、星鰻進行壓製熟成，帶有淡淡柿葉幽香。",
          "mustOrder": [
            "柿の葉寿司 3種詰合せ (鯖魚・鮭魚・星鰻柿葉壽司組合)",
            "茶粥定食"
          ],
          "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Kakinoha_%28persimmon_leaf%29_sushi_in_Nara.jpg/1280px-Kakinoha_%28persimmon_leaf%29_sushi_in_Nara.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
          "region": "nara",
          "photoLabel": "奈良百年老舖平宗之傳統鄉土名物柿之葉壽司 (柿の葉すし)"
        },
        {
          "id": "d6_opt4",
          "name": "興福寺 五重塔 & 猿澤池",
          "nameJp": "興福寺 国宝五重塔・猿沢池",
          "isScheduled": false,
          "category": "quest",
          "coords": [
            34.6828,
            135.8322
          ],
          "tag": "古都奈良象徵倒影",
          "address": "奈良縣奈良市登大路町48",
          "googleMaps": "https://www.google.com/maps/search/?api=1&query=興福寺+五重塔",
          "description": "NotebookLM 重點記錄！日本第二高木造五重塔（高50.1米，國寶），與猿澤池畔的垂柳構成古都最經典八景「猿澤池之月」；國寶館藏有日本最具人氣的「阿修羅像」。",
          "highlights": [
            "國寶館內震撼人心的三頭六臂「阿修羅像」",
            "猿澤池畔拍攝五重塔湖面倒影"
          ],
          "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Kofukuji-fromSarusawaike.JPG/1280px-Kofukuji-fromSarusawaike.JPG?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
          "region": "nara",
          "photoLabel": "興福寺國寶五重塔倒映於猿澤池水面的經典絕景"
        },
        {
          "id": "d6_opt5",
          "name": "柿の葉すし本舗たなか",
          "nameJp": "柿の葉すし本舗たなか 奈良本店",
          "isScheduled": false,
          "category": "dining",
          "coords": [
            34.6815,
            135.828
          ],
          "tag": "奈良柿葉壽司三大名門",
          "address": "奈良縣奈良市東向中町5 (近鐵奈良站前)",
          "googleMaps": "https://www.google.com/maps/search/?api=1&query=柿の葉すし本舗たなか+奈良",
          "score": 3.52,
          "budget": "¥ (1,200~2,000円)",
          "description": "NotebookLM 重點記錄！與平宗齊名的柿葉壽司名門，採用吉野山野生柿葉包裹嚴選鯖魚與鮭魚，口感溫潤微酸，極適合搭車時作為野餐享用。",
          "mustOrder": [
            "さば・さけ詰合せ (鯖魚與鮭魚雙拼柿葉壽司)",
            "特選鯛魚柿葉壽司"
          ],
          "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Kakinohazusi.jpg/1280px-Kakinohazusi.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
          "region": "nara",
          "photoLabel": "柿之葉壽司精美木盒裝（醋漬鯖魚與鮭魚柿葉壽司）"
        },
        {
          "id": "hotel_hanshin",
          "name": "大阪阪神飯店",
          "nameJp": "ホテル阪神大阪 (天然温泉・徳次郎の湯)",
          "isScheduled": false,
          "isHotelBase": true,
          "category": "hotel",
          "coords": [
            34.6967,
            135.4868
          ],
          "tag": "🏨 下榻飯店",
          "address": "大阪府大阪市福島區福島5丁目6-16 (JR福島站步行1分)",
          "googleMaps": "https://maps.app.goo.gl/6jYd7QmqnLscha826",
          "description": "8/21~8/25 連續五晚大阪常駐下榻飯店！客房內均引入地下千米天然溫泉「德次郎之湯」，交通極致便利，JR福島站出站即達，距離梅田僅1站。",
          "highlights": [
            "所有客房浴室皆可享用天然溫泉直通泉水",
            "JR福島站出口步行僅 1 分鐘，直通梅田與關西機場快速",
            "周邊為著名福島聖天通居酒屋與米其林拉麵一級戰區"
          ],
          "hours": "Check-in 15:00 / Check-out 11:00",
          "img": "https://upload.wikimedia.org/wikipedia/commons/d/d4/Laxa-Osaka-%28Hotel-Hanshin%29-20090321.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled",
          "region": "osaka",
          "photoLabel": "位於 JR 福島站前之大阪阪神飯店 (Hotel Hanshin Osaka) 外觀，內設天然溫泉「德次郎之湯」"
        }
      ],
      "primaryRegion": "osaka",
      "secondaryRegion": "nara"
    },
    {
      "dayIndex": 7,
      "date": "2026-08-25",
      "dayOfWeek": "TUE",
      "location": "大阪",
      "coverImg": "assets/images/osaka.jpg",
      "theme": "梅田旗艦商圈採買・福島拉麵居酒屋散策",
      "summary": "午後漫遊梅田 Grand Front Osaka 與友都八喜，傍晚品嚐福島超人氣「燃えよ麺助」鴨湯拉麵與聖天通居酒屋巡禮。",
      "weather": {
        "desc": "晴天",
        "high": 34,
        "low": 27,
        "rain": 0,
        "icon": "☀️"
      },
      "mapCenter": [
        34.6967,
        135.4868
      ],
      "mapZoom": 15,
      "spots": [
        {
          "id": "d7_spot2_umeda",
          "name": "梅田 Grand Front Osaka 旗艦商圈",
          "nameJp": "グランフロント大阪 (Grand Front Osaka)",
          "isScheduled": true,
          "category": "transport",
          "order": 1,
          "time": "12:00 - 15:30",
          "coords": [
            34.7038,
            135.4952
          ],
          "tag": "都會旗艦商場",
          "address": "大阪市北區大深町4-1",
          "googleMaps": "https://www.google.com/maps/search/?api=1&query=Grand+Front+Osaka",
          "description": "關西最大級都會複合商城，匯集頂級和風生活品牌、選品店與科技旗艦館，南館與北館以水景天橋相連。",
          "highlights": [
            "無印良品與蔦屋書店大型概念旗艦店",
            "露天水景步道與都會綠洲空中花園"
          ],
          "phrases": [
            {
              "scenario": "在機場櫃台詢問登機門位置",
              "japanese": "搭乗口は何番ゲートですか？",
              "romaji": "Toujouguchi wa nanban geeto desu ka?",
              "chinese": "請問登機門是幾號？",
              "audio": "搭乗口は何番ゲートですか？"
            }
          ],
          "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Grand_Front_Osaka_Sidewalk_water_feature_2014.JPG/1280px-Grand_Front_Osaka_Sidewalk_water_feature_2014.JPG?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
          "region": "osaka",
          "hours": "11:00 - 21:00",
          "photoLabel": "Grand Front Osaka 戶外水景步道與現代化都會綠洲商場建築群"
        },
        {
          "id": "d7_spot3",
          "name": "燃えよ麺助",
          "nameJp": "燃えよ麺助",
          "isScheduled": true,
          "category": "dining",
          "order": 2,
          "time": "17:30 - 19:00",
          "coords": [
            34.6975,
            135.488
          ],
          "tag": "Tabelog 3.78 拉麵神店",
          "address": "大阪府大阪市福島區福島5丁目12-21",
          "googleMaps": "https://www.google.com/maps/search/?api=1&query=燃えよ麺助",
          "score": 3.78,
          "budget": "¥ (1,000~1,500円)",
          "description": "大阪拉麵界頂級天花板！以和歌山產「紀州鴨」與阿波尾雞骨慢火熬煮的清澄高湯，搭配三重縣熟成生醬油與低溫舒肥叉燒、香烤鴨胸肉，甘甜深邃。",
          "mustOrder": [
            "味玉紀州鴨そば (味玉特製紀州鴨醬油拉麵)",
            "味玉金色貝そば (特製金色蛤蜊貝湯拉麵)",
            "鴨チャーシューご飯 (炙燒鴨肉叉燒飯)"
          ],
          "notes": "JR福島站步行2分鐘，建議傍晚 17:15 前抵達排隊第一輪入座。",
          "phrases": [
            {
              "scenario": "在拉麵店使用餐券販賣機購買特製鴨拉麵",
              "japanese": "特製鴨そばの食券はこれですか？",
              "romaji": "Tokusei kamo soba no shokken wa kore desu ka?",
              "chinese": "請問特製鴨拉麵的餐券是這張嗎？",
              "audio": "食券はこれですか？"
            }
          ],
          "fullStory": [
            "【大阪拉麵頂級天花板】由大阪拉麵名門獨立創立，長年穩居 Tabelog 3.78 以上高分，為福島拉麵一級戰區的排隊王者。",
            "【紀州鴨與熟成醬油精萃】招牌『紀州鴨そば』嚴選和歌山頂級『紀州鴨』與阿波尾雞骨慢火熬煮金黃清湯，搭配三重縣百年藏元生醬油與熟成醬油調和；碗內盛放低溫舒肥叉燒、香烤鴨胸肉與烤白蔥段，滋味甘甜清雅、層次無比深邃。"
          ],
          "img": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1200&q=80",
          "region": "osaka",
          "photoLabel": "燃えよ麺助紀州鴨生醬油高湯拉麵佐炙燒嫩鴨胸與味玉"
        },
        {
          "id": "d7_spot4",
          "name": "Grand Front Osaka & 友都八喜 Yodobashi 梅田",
          "nameJp": "グランフロント大阪・ヨドバシカメラ 梅田",
          "isScheduled": true,
          "category": "quest",
          "order": 3,
          "time": "19:30 - 21:30",
          "coords": [
            34.7038,
            135.4952
          ],
          "tag": "梅田旗艦商場與電器城",
          "address": "大阪府大阪市北區大深町4-1",
          "googleMaps": "https://www.google.com/maps/search/?api=1&query=グランフロント大阪",
          "description": "大阪梅田最具代表性的現代時尚購物中心與全日本最大級電器商城「Links Umeda」！集合各大戶外潮流品牌、無印良品旗艦店與免稅電器。",
          "highlights": [
            "Grand Front 北館與南館空中連通道夜景",
            "Yodobashi 友都八喜 8層樓全方位免稅電器與玩具模型"
          ],
          "photoTip": "從 Grand Front 南館 2F 戶外水景露台拍向梅田摩天大樓群。",
          "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Yodobashi_Umeda_Tower_20191104.jpg/1280px-Yodobashi_Umeda_Tower_20191104.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
          "region": "osaka",
          "photoLabel": "梅田站前巨型電器商場 Yodobashi-Umeda Tower 與 Links Umeda 外觀"
        },
        {
          "id": "d7_opt1",
          "name": "花くじら 本店",
          "nameJp": "花くじら 本店 (はなくじら)",
          "isScheduled": false,
          "category": "dining",
          "coords": [
            34.6962,
            135.4855
          ],
          "tag": "Tabelog 3.72 極上關東煮",
          "address": "大阪府大阪市福島區福島2丁目8-2",
          "googleMaps": "https://www.google.com/maps/search/?api=1&query=花くじら+本店",
          "score": 3.72,
          "budget": "¥¥ (2,000~3,000円)",
          "description": "大阪在地人狂推的深夜關東煮老店！吸飽鮮美柴魚湯汁的厚切白蘿蔔 (大根)、起司麻糬袋與名物「春菊 (山茼蒿)」撒上柴魚片，溫暖無比。",
          "mustOrder": [
            "大根 (入味多汁白蘿蔔)",
            "春菊 (現燙山茼蒿)",
            "チーズロールキャベツ (起司高麗菜捲)"
          ],
          "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Daikon_oden_and_Beer_by_shrkflickr_in_kyoto.jpg/1280px-Daikon_oden_and_Beer_by_shrkflickr_in_kyoto.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
          "region": "osaka",
          "photoLabel": "花くじら大鍋慢火煨煮之關東煮透光大根白蘿蔔與吸汁油豆腐"
        },
        {
          "id": "d7_opt2",
          "name": "福島聖天通商店街",
          "nameJp": "福島聖天通商店街",
          "isScheduled": false,
          "category": "quest",
          "coords": [
            34.698,
            135.4845
          ],
          "tag": "關西老饕私房美食街",
          "address": "大阪府大阪市福島區鷺洲2丁目",
          "googleMaps": "https://www.google.com/maps/search/?api=1&query=福島聖天通商店街",
          "description": "鄰近阪神飯店的在地美食街，聚集了大阪最具水準的炭火燒鳥、立吞割烹、義式小酒館與精釀啤酒吧，夜生活氛圍極佳。",
          "highlights": [
            "充滿昭和復古燈籠的居酒屋小巷",
            "遠離觀光客人潮的道地關西飲食體驗"
          ],
          "img": "https://upload.wikimedia.org/wikipedia/commons/3/3b/Fukushima-shotendori.JPG?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled",
          "region": "osaka",
          "photoLabel": "大阪福島聖天通商店街入口與周邊熱鬧居酒屋紅燈籠小巷"
        },
        {
          "id": "hotel_hanshin",
          "name": "大阪阪神飯店",
          "nameJp": "ホテル阪神大阪 (天然温泉・徳次郎の湯)",
          "isScheduled": false,
          "isHotelBase": true,
          "category": "hotel",
          "coords": [
            34.6967,
            135.4868
          ],
          "tag": "🏨 下榻飯店",
          "address": "大阪府大阪市福島區福島5丁目6-16 (JR福島站步行1分)",
          "googleMaps": "https://maps.app.goo.gl/6jYd7QmqnLscha826",
          "description": "8/21~8/25 連續五晚大阪常駐下榻飯店！客房內均引入地下千米天然溫泉「德次郎之湯」，交通極致便利，JR福島站出站即達，距離梅田僅1站。",
          "highlights": [
            "所有客房浴室皆可享用天然溫泉直通泉水",
            "JR福島站出口步行僅 1 分鐘，直通梅田與關西機場快速",
            "周邊為著名福島聖天通居酒屋與米其林拉麵一級戰區"
          ],
          "hours": "Check-in 15:00 / Check-out 11:00",
          "img": "https://upload.wikimedia.org/wikipedia/commons/d/d4/Laxa-Osaka-%28Hotel-Hanshin%29-20090321.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled",
          "region": "osaka",
          "photoLabel": "位於 JR 福島站前之大阪阪神飯店 (Hotel Hanshin Osaka) 外觀，內設天然溫泉「德次郎之湯」"
        }
      ],
      "primaryRegion": "osaka",
      "secondaryRegion": null
    },
    {
      "dayIndex": 8,
      "date": "2026-08-26",
      "dayOfWeek": "WED",
      "location": "京都",
      "coverImg": "assets/images/kyoto.jpg",
      "theme": "錦市場高湯玉子燒・世界遺產清水寺・嵐山竹林・高台寺夜觀",
      "summary": "晨間搭乘特急前往千年古都京都，漫遊「錦市場」品嚐三木雞卵高湯蛋卷與豆乳甜甜圈，上午參拜「清水寺」清水舞台與音羽之瀧，漫步二年坂三年坂，下午前往「嵐山」漫步嵯峨野竹林與渡月橋，晚間品味「高台寺」夜間點燈與石塀小路。",
      "weather": {
        "desc": "晴朗午後局部陣雨",
        "high": 34,
        "low": 26,
        "rain": 20,
        "icon": "⛩️"
      },
      "mapCenter": [
        34.9949,
        135.785
      ],
      "mapZoom": 13,
      "spots": [
        {
          "id": "d8_spot1",
          "name": "錦市場",
          "nameJp": "錦市場 (にしきいちば)",
          "isScheduled": true,
          "category": "dining",
          "order": 1,
          "time": "09:00 - 10:45",
          "coords": [
            35.005,
            135.765
          ],
          "tag": "400年京都廚房",
          "address": "京都府京都市中京區錦小路通",
          "googleMaps": "https://www.google.com/maps/search/?api=1&query=錦市場",
          "score": 3.65,
          "budget": "¥ (1,000~2,000円)",
          "description": "擁有400年歷史的狹長石板市場！三木雞卵現場煎出搖晃多汁的高湯玉子燒、こんなもんじゃ現炸豆乳甜甜圈、鮮烤鰻魚肝串與章魚鵪鶉蛋。",
          "mustOrder": [
            "三木雞卵 だし巻き卵 (高湯玉子燒)",
            "こんなもんじゃ 豆乳ドーナツ (豆乳甜甜圈)",
            "烤帆立貝與海鮮串"
          ],
          "notes": "錦市場內禁止邊走邊吃，請於店家門口指定食用區吃完再逛。",
          "phrases": [
            {
              "scenario": "在三木雞卵購買切片高湯玉子燒",
              "japanese": "だし巻き卵を一つ、ここで食べます。",
              "romaji": "Dashimaki tamago o hitotsu, koko de tabemasu.",
              "chinese": "請給我一份高湯玉子燒，我在這裡吃。",
              "audio": "だし巻き卵を一つここで食べます"
            }
          ],
          "fullStory": [
            "【京都的廚房400年歷史】錦市場興起於平安時代，因地下擁有優質低溫湧水『錦之水』適於保存生鮮魚貨，400年來一直是京都飲食文化的發源地，長約 390 公尺的石板通道聚集了 130 多家老字號食材店。",
            "【三木雞卵高湯蛋卷】老字號『三木雞卵』每日使用新鮮雞蛋與大量柴魚昆布高湯現煎，切開時高湯流淌、滑嫩無比；搭配豆乳甜甜圈與鮮烤海鮮串，為古都早晨最接地氣的美食享受。"
          ],
          "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Nishiki_Market_%287273085706%29.jpg/1280px-Nishiki_Market_%287273085706%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
          "region": "kyoto",
          "photoLabel": "京都「京都的廚房」錦市場色彩鮮明的紅黃綠透光玻璃拱廊美食街"
        },
        {
          "id": "d8_spot2",
          "name": "清水寺・清水舞台・音羽之瀧",
          "nameJp": "清水寺・清水の舞台・音羽の瀧",
          "isScheduled": true,
          "category": "attraction",
          "order": 2,
          "time": "11:15 - 13:30",
          "coords": [
            34.9949,
            135.785
          ],
          "tag": "世界文化遺產之最",
          "address": "京都府京都市東山區清水1丁目294",
          "googleMaps": "https://www.google.com/maps/search/?api=1&query=京都市東山区清水1丁目294",
          "description": "西元778年開創的國寶古剎！懸空建於陡峭崖壁上的「清水舞台」，由 139 根巨大的圓形檜木以無釘榫接工藝搭建而成；下方「音羽之瀧」湧出的清泉分為「學業、戀愛、健康長壽」三道，持長柄杓取水祈福。",
          "highlights": [
            "完全未使用一根釘子的國寶「清水之舞台」",
            "祈求健康、學業、良緣之「音羽之瀧」靈泉",
            "鮮紅巍峨的仁王門與三重塔"
          ],
          "photoTip": "從奧之院（奧之堂）回頭拍攝整座懸空的清水舞台與京都塔市景最具明信片感。",
          "hours": "06:00 - 18:00 (本堂門票 400 円)",
          "phrases": [
            {
              "scenario": "在清水寺購買本堂參拜門票",
              "japanese": "拝観券の大人二枚をお願いします。",
              "romaji": "Haikan-ken no otona nimai o onegaishimasu.",
              "chinese": "請給我兩張成人參拜門票。",
              "audio": "拝観券をお願いします"
            }
          ],
          "fullStory": [
            "【國寶清水舞台懸造工藝】寶龜9年(778)由延鎮上人開創，平安時代坂上田村麻呂重建。本堂依陡峭崖壁懸空搭建，由 139 根巨大圓形檜木柱，完全採用日本傳統『懸造』無釘卡榫工法榫接而成，日本諺語『從清水舞台跳下』即形容破釜沉舟之決心。",
            "【音羽之瀧三道靈泉】下方湧出的清泉名列日本十大名水之首，分為三道水流分別代表『學業成就』、『戀愛良緣』與『延命長壽』，參拜者使用長柄鐵杓接水飲用一小口祈求心願。"
          ],
          "img": "https://upload.wikimedia.org/wikipedia/commons/5/59/Kiyomizu-dera.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled",
          "region": "kyoto",
          "photoLabel": "音羽山清水寺懸空棟樑結構「清水舞台」與綠意環繞本堂全景"
        },
        {
          "id": "d8_spot3",
          "name": "二年坂・三年坂・八坂塔",
          "nameJp": "産寧坂 (三年坂)・二年坂・法観寺八坂の塔",
          "isScheduled": true,
          "category": "attraction",
          "order": 3,
          "time": "13:30 - 14:45",
          "coords": [
            34.9982,
            135.7818
          ],
          "tag": "京都最美石板傳統町家街",
          "address": "京都府京都市東山區清水2丁目",
          "googleMaps": "https://www.google.com/maps/search/?api=1&query=八坂の塔+法観寺",
          "description": "京都最具古都氛圍的石階步道保護區！兩側林立江戶至大正時期的京町家木造店舖、京扇子、宇治抹茶甜品店，抬頭即可望見建於飛鳥時代的五重塔「八坂之塔（法觀寺）」。",
          "highlights": [
            "八坂塔聳立於石板路盡頭的經典古都構圖",
            "二年坂全球唯一「塌塌米星巴克町家概念店」",
            "各式京都百年七味粉、和菓子名店"
          ],
          "photoTip": "在三年坂下行石階處回頭，以兩側木造町家窗櫺框住八坂之塔最經典。",
          "hours": "全日自由漫步",
          "phrases": [
            {
              "scenario": "在京都伴手禮店詢問保存期限",
              "japanese": "このお菓子の賞味期限はどのくらいですか？",
              "romaji": "Kono okashi no shoumi kigen wa dono kurai desu ka?",
              "chinese": "請問這個點心的保存期限大概多久？",
              "audio": "賞味期限はどのくらいですか？"
            }
          ],
          "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Yasaka-dori_early_morning_with_street_lanterns_and_the_Tower_of_Yasaka_%28Hokan-ji_Temple%29%2C_Kyoto%2C_Japan.jpg/1280px-Yasaka-dori_early_morning_with_street_lanterns_and_the_Tower_of_Yasaka_%28Hokan-ji_Temple%29%2C_Kyoto%2C_Japan.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
          "region": "kyoto",
          "photoLabel": "八坂通石板坡道、傳統町家街景與聳立之法觀寺八坂之塔五重塔"
        },
        {
          "id": "d8_spot4",
          "name": "嵐山・渡月橋・嵯峨野竹林小徑・野宮神社",
          "nameJp": "嵐山・渡月橋・嵯峨野 竹林の小径・野宮神社",
          "isScheduled": true,
          "category": "attraction",
          "order": 4,
          "time": "15:30 - 18:00",
          "coords": [
            35.0116,
            135.6778
          ],
          "tag": "京都貴族避暑避世勝地",
          "address": "京都府京都市右京區嵯峨小倉山田淵山町",
          "googleMaps": "https://www.google.com/maps/search/?api=1&query=嵯峨野+竹林の小径",
          "description": "平安時代貴族度假勝地！跨越桂川的木造古橋「渡月橋」、遮天蔽日的幽邃「嵯峨野竹林小徑」，微風拂過竹葉沙沙聲入選日本聲音風景百選；深處隱藏著擁有日本唯一黑木鳥居的「野宮神社」，以締結良緣聞名。",
          "highlights": [
            "漫步長達數百公尺的綠色高聳竹林幽徑",
            "野宮神社黑木鳥居與神石「龜石」祈願良緣",
            "渡月橋眺望保津川遊船與嵐山層巒疊嶂"
          ],
          "photoTip": "在竹林小徑中央以低角度仰拍兩側向中央彎曲的竹林弧度，避開人群。",
          "hours": "全日開放自由漫步 (野宮神社 09:00 - 17:00)",
          "phrases": [
            {
              "scenario": "在嵐山詢問竹林小徑的路線方向",
              "japanese": "竹林の小径へはどう行けばいいですか？",
              "romaji": "Chikurin no komichi e wa dou ikeba ii desu ka?",
              "chinese": "請問前往竹林小徑要怎麼走？",
              "audio": "竹林の小径へはどう行けばいいですか？"
            }
          ],
          "fullStory": [
            "【平安貴族避暑勝地與渡月橋】自平安時代即為日本天皇與貴族泛舟賞月、修建離宮的避世名勝。跨越桂川的木造古橋『渡月橋』因龜山上皇詠嘆『宛如無雲之夜明月過橋』而得名。",
            "【嵯峨野竹林與黑木鳥居】長達數百公尺的嵯峨野竹林小徑，翠綠竹林遮天蔽日，竹葉隨微風搖曳沙沙作響入選『日本聲音風景百選』；深處的『野宮神社』保留日本最古老形式的未去樹皮『黑木鳥居』，祈求良緣極為靈驗。"
          ],
          "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Sagano_Bamboo_forest%2C_Arashiyama%2C_Kyoto.jpg/1280px-Sagano_Bamboo_forest%2C_Arashiyama%2C_Kyoto.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
          "region": "kyoto",
          "photoLabel": "京都嵐山嵯峨野日光灑落的幽靜翠綠竹林石板小徑"
        },
        {
          "id": "d8_spot5",
          "name": "高台寺 夜間特別拜觀 & 石塀小路",
          "nameJp": "高台寺 夜間特別拝観・石塀小路",
          "isScheduled": true,
          "category": "attraction",
          "order": 5,
          "time": "19:00 - 21:00",
          "coords": [
            35.0003,
            135.7815
          ],
          "tag": "豐臣秀吉正室寧寧之寺與光雕",
          "address": "京都府京都市東山區高台寺下河原町526",
          "googleMaps": "https://www.google.com/maps/search/?api=1&query=京都市東山区高台寺下河原町526",
          "description": "豐臣秀吉正室「北政所寧寧」為悼念秀吉於1606年所建的禪宗名剎。盛夏夜間點燈倒映在臥龍池如鏡水面，穿過點燈竹林步道，再漫步至曲徑通幽的石塀小路，體驗京都最精緻夢幻的夏夜。",
          "highlights": [
            "臥龍池宛如鏡面般清晰倒映開山堂與樹影的絕美夜景",
            "夜間點亮夢幻冷光藍綠色燈影的竹林步道",
            "保存完好之石塀小路傳統京町家石板巷弄"
          ],
          "photoTip": "在臥龍池畔屏住呼吸手持穩定拍攝倒影，水面完全無波紋時最為震撼。",
          "hours": "09:00 - 22:00 (夜間點燈最後入場 21:30，門票 600 円)",
          "phrases": [
            {
              "scenario": "詢問高台寺夜間點燈入場時間",
              "japanese": "ライトアップの最終受付は何時ですか？",
              "romaji": "Raitouappu no saishuu uketsuke wa nanji desu ka?",
              "chinese": "請問夜間點燈最後售票時間是幾點？",
              "audio": "ライトアップの最終受付は何時ですか？"
            }
          ],
          "fullStory": [
            "【寧寧夫人與秀吉之愛】慶長11年(1606)由豐臣秀吉正室『北政所寧寧』為悼念亡夫秀吉所建，德川家康亦出資鼎力襄助。開山堂內供奉秀吉與寧寧靈廟，堂內裝飾有日本漆藝巔峰『高台寺蒔繪』。",
            "【臥龍池鏡面倒影夜景】夏秋夜間特別點燈時，水面平靜如黑曜石的『臥龍池』完美倒映四周青楓與堂宇，竹林步道投射神秘藍綠冷光，如夢似幻。"
          ],
          "img": "https://upload.wikimedia.org/wikipedia/commons/8/8c/Ishibei-koji_by_Ilpo%27s_Sojourn_in_Gion%2C_Kyoto.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled",
          "region": "kyoto",
          "photoLabel": "祇園高台寺旁充滿幽靜石疊路與傳統料亭燈火風情的石塀小路"
        },
        {
          "id": "d8_opt1",
          "name": "二年坂 榻榻米星巴克",
          "nameJp": "スターバックス コーヒー 京都二寧坂ヤサカ茶屋店",
          "isScheduled": false,
          "category": "quest",
          "coords": [
            34.999,
            135.7812
          ],
          "tag": "全球唯一榻榻米 Starbucks",
          "address": "京都府京都市東山區高台寺南門通下河原東入桝屋町349",
          "googleMaps": "https://www.google.com/maps/search/?api=1&query=スターバックス+京都二寧坂ヤサカ茶屋店",
          "description": "擁有百年歷史的兩層樓日本傳統町家建築，掛上藍染暖簾，2樓設有需脫鞋盤腿入座的日本榻榻米座位區，完美融入古都街道。",
          "highlights": [
            "脫鞋體驗和風榻榻米咖啡座",
            "保留傳統町家中庭與枯山水造景"
          ],
          "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Starbucks_Coffee_Kyoto_Ninenzaka_Yasaka_Chaya.jpg/1280px-Starbucks_Coffee_Kyoto_Ninenzaka_Yasaka_Chaya.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
          "region": "kyoto",
          "photoLabel": "京都二寧坂百年木造町家星巴克（京都二寧坂ヤサカ茶屋店）傳統暖簾門面"
        },
        {
          "id": "d8_opt2",
          "name": "八坂神社",
          "nameJp": "八坂神社 (祇園さん)",
          "isScheduled": false,
          "category": "quest",
          "coords": [
            35.0037,
            135.7785
          ],
          "tag": "全日本3000八坂神社總本社",
          "address": "京都府京都市東山區祇園町北側625",
          "googleMaps": "https://www.google.com/maps/search/?api=1&query=八坂神社+京都",
          "description": "京都祇園祭的主辦古社！舞殿掛滿數百盞祇園各大商號奉納的燈籠，夜間點燈無比燦爛；境內「美御前社」湧出美容水，據說滴在臉上能讓心靈與容顏皆美麗。",
          "highlights": [
            "四條通盡頭朱紅色壯觀西樓門",
            "美御前社美肌神水祈福"
          ],
          "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Nishiromon_Gate%2C_Yasaka_Shrine%2C_Kyoto%2C_West_view_20190416_1.jpg/1280px-Nishiromon_Gate%2C_Yasaka_Shrine%2C_Kyoto%2C_West_view_20190416_1.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
          "region": "kyoto",
          "photoLabel": "八坂神社面向祇園四條通的標誌性朱紅色西樓門"
        },
        {
          "id": "d8_opt3",
          "name": "先斗町 鴨川納涼床 居酒屋街",
          "nameJp": "先斗町・鴨川納涼床",
          "isScheduled": false,
          "category": "dining",
          "coords": [
            35.0048,
            135.7712
          ],
          "tag": "夏季限定鴨川水上平台",
          "address": "京都府京都市中京區先斗町通",
          "googleMaps": "https://www.google.com/maps/search/?api=1&query=先斗町+鴨川",
          "score": 3.68,
          "budget": "¥¥¥ (4,000~8,000円)",
          "description": "京都夏季獨有的風雅傳統（5月~9月）！沿著鴨川河畔架設高架木質露台「納涼床」，一邊吹著鴨川涼風，一邊享用精緻京懷石料理或清涼生啤酒。",
          "mustOrder": [
            "鱧料理 (京都盛夏名物海鰻三吃)",
            "京鴨小鍋料理",
            "冷酒"
          ],
          "img": "https://upload.wikimedia.org/wikipedia/commons/6/64/Kamo_river_and_Pontocho_by_txkun_in_Kyoto.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled",
          "region": "kyoto",
          "photoLabel": "鴨川河畔先斗町延伸而出之傳統木造納涼床高架露台與居酒屋街"
        },
        {
          "id": "d8_opt4",
          "name": "伏見神聖酒藏 鳥せい本店",
          "nameJp": "鳥せい 本店 (伏見酒蔵・神聖)",
          "isScheduled": false,
          "category": "dining",
          "coords": [
            34.9318,
            135.7592
          ],
          "tag": "百年清酒倉庫直出原酒",
          "address": "京都府京都市伏見區上油掛町186",
          "googleMaps": "https://www.google.com/maps/search/?api=1&query=鳥せい+本店+伏見",
          "score": 3.69,
          "budget": "¥¥ (2,500~4,000円)",
          "description": "NotebookLM 重點記錄！由伏見百年清酒品牌「神聖」舊倉庫改建，挑高宏偉杉木酒桶環繞，提供酒廠管線直通現榨的「Tareguchi (垂れ口)」生原酒與炭火土雞串燒、酒粕燉牛肉！",
          "mustOrder": [
            "蔵出し生原酒 (酒廠直送現榨生原酒)",
            "名物 焼き鳥盛り合わせ (炭火燒鳥拼盤)",
            "酒粕汁 (香濃酒粕湯)"
          ],
          "fullStory": [
            "【三百年酒窖改裝居酒屋】由延寶5年(1677)創業、擁有近 350 年歷史的京都老牌酒造『山本本家』直接營運。本店建築是由明治時代留存至今的巨大木造清酒倉庫改建而成，挑高宏偉的杉木樑柱與巨大釀酒木桶環繞。",
            "【釀酒管線直送生原酒】店內設有專屬低溫管道直接連結隔壁酒造釀酒槽，為顧客提供未經加熱殺菌、現榨帶有微氣泡感的『Tareguchi（垂れ口）』藏出初榨生原酒，搭配伏見名水『伏水』調製的清酒與備長炭現烤土雞串燒，為京都老饕最愛。"
          ],
          "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Torisei.jpg/1280px-Torisei.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
          "region": "kyoto",
          "photoLabel": "京都伏見 150 年清酒酒藏改建的鳥せい本店（神聖酒造直營）門面與杉玉"
        },
        {
          "id": "d8_opt5",
          "name": "洛北 貴船神社",
          "nameJp": "貴船神社・貴船川床",
          "isScheduled": false,
          "category": "quest",
          "coords": [
            35.1215,
            135.7628
          ],
          "tag": "京都避暑第一名所",
          "address": "京都府京都市左京區鞍馬貴船町180",
          "googleMaps": "https://www.google.com/maps/search/?api=1&query=貴船神社",
          "description": "NotebookLM 重點記錄！日本水神與繪馬發源總本社！參道兩側林立朱紅色木燈籠階梯，在御神水中放入「水占みくじ」字跡會浮現；夏季溪水上特設「貴船川床」享用流水素麵，溫度比京都市區涼爽 5~8 度！",
          "highlights": [
            "兩排朱紅燈籠夾道的經典石階參道",
            "放進水裡才會浮現吉凶的「水占卜神籤」",
            "貴船川上的川床料理與ひろ文流水素麵"
          ],
          "fullStory": [
            "【水神與繪馬發源地】座落於京都北部貴船山腳下，供奉掌管降雨與水源的高龗神，亦為全日本『繪馬』起源的神社。兩側排列朱紅木燈籠的石階參道為京都最具代表性的仙氣景觀；將空白神籤放入御神水中字跡緩緩浮現的『水占卜』深受旅人喜愛。",
            "【川床消暑美學】盛夏時期貴船川溪流上架設木造『川床』平台，溪水潺潺流過腳底，利用汽化吸熱原理使氣溫比京都市區驟降 5~8 度，坐在川床上享用香魚料理與『ひろ文』冰涼流水素麵，是京都最風雅的避暑極致。"
          ],
          "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/%E8%B2%B4%E8%88%B9%E7%A5%9E%E7%A4%BE_Kibune_Jinja_%28KYOTO-JAPAN%29_%284951368080%29.jpg/1280px-%E8%B2%B4%E8%88%B9%E7%A5%9E%E7%A4%BE_Kibune_Jinja_%28KYOTO-JAPAN%29_%284951368080%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
          "region": "kyoto",
          "photoLabel": "洛北貴船神社本宮參道兩側朱紅色春日燈籠與青苔石階"
        },
        {
          "id": "d8_opt6",
          "name": "京都鐵道博物館",
          "nameJp": "京都鉄道博物館",
          "isScheduled": false,
          "category": "quest",
          "coords": [
            34.9875,
            135.7425
          ],
          "tag": "日本最大級鐵道博物館",
          "address": "京都府京都市下京區觀喜寺町",
          "googleMaps": "https://www.google.com/maps/search/?api=1&query=京都鉄道博物館",
          "description": "NotebookLM 重點記錄！全日本最大鐵道主題博物館！保存 53 輛實體列車（從 0 系新幹線到義經號蒸汽火車），擁有珍貴的梅小路扇形車庫，還能親自搭乘真正的「SL Steam 蒸汽火車」在軌道上噴煙奔馳！",
          "highlights": [
            "現場搭乘會鳴笛噴白煙的真實蒸汽火車 SL 號",
            "重要文化財「梅小路扇形車庫」與旋轉轉車台",
            "新幹線駕駛模擬器體驗"
          ],
          "fullStory": [
            "【全日本最大鐵道主題博物館】保存 53 輛實體列車（從 0 系新幹線到義經號蒸汽火車），擁有珍貴的梅小路扇形車庫（重要文化財），還能親自搭乘真正的『SL Steam 蒸汽火車』在軌道上噴煙奔馳！",
            "【互動駕駛模擬】設有新幹線駕駛模擬器、巨型鐵道模型動態展演與天空露台，可一覽東海道新幹線、JR 在來線與京都塔同框美景。"
          ],
          "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/UMEKOJI_STEAM_LOCOMOTIVE_MUSEUM_ROUNDHOUSE_KYOTO_JAPAN_JUNE_2012_%287418910726%29.jpg/1280px-UMEKOJI_STEAM_LOCOMOTIVE_MUSEUM_ROUNDHOUSE_KYOTO_JAPAN_JUNE_2012_%287418910726%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
          "region": "kyoto",
          "photoLabel": "京都鐵道博物館梅小路扇形車庫、轉車盤與多列 SL 蒸汽機車壯觀全貌"
        }
      ],
      "primaryRegion": "kyoto",
      "secondaryRegion": null
    },
    {
      "dayIndex": 9,
      "date": "2026-08-27",
      "dayOfWeek": "THU",
      "location": "大阪",
      "coverImg": "assets/images/kaiyukan.jpg",
      "theme": "海遊館巨大鯨鯊・心齋橋美國村・東北樂天 vs 歐力士 職棒之夜",
      "summary": "上午造訪世界級規模「大阪海遊館」觀賞太平洋巨大水槽與鯨鯊漫遊，搭乘「天保山大摩天輪」，下午漫步「心齋橋筋」與「美國村」潮流服飾，傍晚前往京瓷巨蛋觀賞「東北樂天金鷲 vs 歐力士猛牛」日職激戰。",
      "weather": {
        "desc": "晴朗",
        "high": 34,
        "low": 27,
        "rain": 0,
        "icon": "🦈"
      },
      "mapCenter": [
        34.6693,
        135.4761
      ],
      "mapZoom": 13,
      "spots": [
        {
          "id": "d9_spot1",
          "name": "大阪海遊館",
          "nameJp": "海遊館 (Osaka Aquarium Kaiyukan)",
          "isScheduled": true,
          "category": "attraction",
          "order": 1,
          "time": "09:30 - 12:30",
          "coords": [
            34.6545,
            135.429
          ],
          "tag": "全球最大水族館之一",
          "address": "大阪府大阪市港區海岸通1丁目1-10",
          "googleMaps": "https://www.google.com/maps/search/?api=1&query=大阪市港区海岸通1丁目1-10",
          "description": "重現環太平洋火山帶14個生態區域！沿著8層樓螺旋步道由上往下環繞深達9米、蓄水量5400噸的中央「太平洋水槽」，近距離欣賞全長超過6公尺的兩隻巨型鯨鯊、鬼蝠魟與數萬群魚悠游。",
          "highlights": [
            "深達 9 米巨大水槽內震撼的鯨鯊 (ジンベエザメ) 餵食秀",
            "阿留申群島活潑水獺、南極圈國王企鵝跳水",
            "互動觸摸池近距離撫摸小型魟魚與鯊魚皮膚"
          ],
          "photoTip": "在4樓或5樓中央水槽大玻璃前以剪影方式捕捉鯨鯊與巨大鬼蝠魟掠過頭頂的畫面。",
          "hours": "09:30 - 20:00 (門票 2,700 円，建議提早預約時段)",
          "phrases": [
            {
              "scenario": "在海遊館詢問鯨鯊餵食時間",
              "japanese": "ジンベエザメのお食事タイムは何時からですか？",
              "romaji": "Jinbeezame no oshokuji taimu wa nanji kara desu ka?",
              "chinese": "請問鯨鯊的餵食時間是幾點開始？",
              "audio": "お食事タイムは何時ですか？"
            }
          ],
          "fullStory": [
            "【環太平洋火山帶生態再現】大阪海遊館自1990年開館，為世界最大級水族館之一。館內依據環太平洋火山帶地理分佈，設立 14 個大型生態展區，從日本森林、阿留申群島水獺、南極企鵝一路漫步至深海世界。",
            "【中央巨型太平洋水槽】深達 9 米、蓄水量 5,400 噸的中央巨型水槽內，悠游著兩隻長達 6 米以上的巨大鯨鯊（ジンベエザメ）與巨大鬼蝠魟，參觀者沿著螺旋步道由 8 樓盤旋向下，360 度沉浸於深藍浩瀚海洋。"
          ],
          "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Whale_Shark_-_Osaka_Aquarium.jpg/1280px-Whale_Shark_-_Osaka_Aquarium.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
          "region": "osaka",
          "photoLabel": "海遊館中央9米深太平洋水槽中悠游的巨型鯨鯊 (ジンベエザメ)"
        },
        {
          "id": "d9_spot2",
          "name": "天保山大摩天輪",
          "nameJp": "天保山大観覧車",
          "isScheduled": true,
          "category": "attraction",
          "order": 2,
          "time": "12:30 - 13:30",
          "coords": [
            34.656,
            135.4305
          ],
          "tag": "高達 112.5 米海港全景",
          "address": "大阪府大阪市港區海岸通1丁目1-10",
          "googleMaps": "https://www.google.com/maps/search/?api=1&query=天保山大観覧車",
          "description": "曾為世界最大的摩天輪！直徑達 100 米、高 112.5 米，旋轉一圈約 15 分鐘，可選乘全透明車廂，俯瞰大阪灣、生駒山脈、明石海峽大橋與關西機場飛機起降。",
          "highlights": [
            "全透明水晶車廂 (シースルーゴンドラ) 刺激體驗",
            "夜間依明日天氣變換外牆 LED 氣象燈號"
          ],
          "hours": "10:00 - 21:00 (門票 900 円)",
          "phrases": [
            {
              "scenario": "在售票處選擇全透明水晶車廂",
              "japanese": "シースルーゴンドラに乗りたいです。",
              "romaji": "Shiisuruu gondora ni noritai desu.",
              "chinese": "我想乘坐全透明水晶車廂。",
              "audio": "シースルーゴンドラに乗りたいです"
            }
          ],
          "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Osaka_tempozan_giant_ferris_wheel.jpg/1280px-Osaka_tempozan_giant_ferris_wheel.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
          "region": "osaka",
          "photoLabel": "天保山港灣村 112.5 米巨型海灣摩天輪全景"
        },
        {
          "id": "d9_spot3",
          "name": "心齋橋筋商店街 & 美國村潮流街區",
          "nameJp": "心斎橋筋商店街・アメリカ村 (アメ村)",
          "isScheduled": true,
          "category": "attraction",
          "order": 3,
          "time": "14:30 - 17:00",
          "coords": [
            34.671,
            135.5005
          ],
          "tag": "關西潮流與購物心臟",
          "address": "大阪府大阪市中央區心齋橋筋1丁目～2丁目",
          "googleMaps": "https://www.google.com/maps/search/?api=1&query=心斎橋筋商店街",
          "description": "關西最具人氣的購物大道！心齋橋筋匯聚大丸百貨心齋橋本店、各大服飾旗艦店與藥妝店；西側「美國村 (アメ村)」則為關西年輕次文化、街頭滑板、古著與二手黑膠唱片聚集地，三角公園坐滿吃章魚燒的潮流青年。",
          "highlights": [
            "大丸百貨心齋橋本店沃里斯建築與美妝專櫃",
            "美國村三角公園 (御津公園) 品嚐甲賀流章魚燒",
            "自由女神像地標與古著店尋寶"
          ],
          "photoTip": "在美國村巨大人形壁畫「Peace on Earth」前街拍最具潮流街頭感。",
          "hours": "多數店舖 11:00 - 20:30",
          "phrases": [
            {
              "scenario": "在服飾店詢問是否有免稅服務",
              "japanese": "免税手続きはできますか？パスポートを持っています。",
              "romaji": "Menzei tetsuzuki wa dekimasu ka? Pasupooto o motte imasu.",
              "chinese": "請問可以辦理免稅手續嗎？我有帶護照。",
              "audio": "免税手続きはできますか？"
            }
          ],
          "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Shinsaibashi-suji_Shopping_Street_20190201.jpg/1280px-Shinsaibashi-suji_Shopping_Street_20190201.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
          "region": "osaka",
          "photoLabel": "熱鬧繁華的心齋橋筋挑高拱廊商店街實景街景"
        },
        {
          "id": "d9_spot4",
          "name": "京瓷巨蛋大阪",
          "nameJp": "京セラドーム大阪 (オリックス・バファローズ vs 東北楽天)",
          "isScheduled": true,
          "category": "attraction",
          "order": 4,
          "time": "17:30 - 21:30",
          "coords": [
            34.6693,
            135.4761
          ],
          "tag": "洋聯職棒熱血對決",
          "address": "大阪府大阪市西區千代崎3丁目中2-1",
          "googleMaps": "https://www.google.com/maps/search/?api=1&query=京セラドーム大阪",
          "description": "日本職棒歐力士猛牛隊（ORIX Buffaloes）主場！可容納 3.6 萬人的現代巨蛋，欣賞太平洋聯盟頂級投手強烈對決、第七局熱血氣球應援與球場名物「炸雞塊球場便當」。",
          "highlights": [
            "全室內舒適冷氣巨蛋球場",
            "歐力士超人氣吉祥物 Buffalo BULL & BELL 互動",
            "球場限定歐力士猛牛隊球衣與球員應援毛巾"
          ],
          "photoTip": "在內野第7局「Lucky 7」全場球迷揮舞應援毛巾與大螢幕同框。",
          "hours": "開場 16:30 / 比賽開始 18:00",
          "phrases": [
            {
              "scenario": "在球場看台向啤酒妹購買生啤酒",
              "japanese": "生ビールを一杯ください。銘柄は何ですか？",
              "romaji": "Nama biiru o ippai kudasai. Meigara wa nan desu ka?",
              "chinese": "請給我一杯生啤酒。請問是哪一個品牌？",
              "audio": "生ビールを一杯ください"
            }
          ],
          "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Orix_Buffaloes_versus_Tohoku_Rakuten_Golden_Eagles%2C_Kyocera_Dome_Osaka%2C_18_April_2023_09.jpg/1280px-Orix_Buffaloes_versus_Tohoku_Rakuten_Golden_Eagles%2C_Kyocera_Dome_Osaka%2C_18_April_2023_09.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
          "region": "osaka",
          "photoLabel": "京瓷巨蛋室內日職例行賽現場實況（歐力士猛牛主場對決東北樂天）"
        },
        {
          "id": "d9_opt1",
          "name": "北極星 蛋包飯 心齋橋本店",
          "nameJp": "北極星 心斎橋本店",
          "isScheduled": false,
          "category": "dining",
          "coords": [
            34.6698,
            135.4992
          ],
          "tag": "日本蛋包飯創始始祖",
          "address": "大阪府大阪市中央區西心齋橋2丁目7-27",
          "googleMaps": "https://www.google.com/maps/search/?api=1&query=北極星+心斎橋本店",
          "score": 3.55,
          "budget": "¥ (1,000~1,800円)",
          "description": "大正11年(1922)創立，全日本第一家發明「オムライス (蛋包飯)」的百年老店！位於美國村旁的傳統數寄屋造和風古宅內，坐在日式榻榻米上享用薄嫩金黃蛋皮包裹炒飯淋上特製酸甜番茄醬汁。",
          "mustOrder": [
            "チキンオムライス (經典雞肉蛋包飯)",
            "ビーフオムライス (牛肉蛋包飯)",
            "エビフライセット (炸蝦套餐)"
          ],
          "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Chicken_omurice_lunch_set_by_POHAN_in_Osaka.jpg/1280px-Chicken_omurice_lunch_set_by_POHAN_in_Osaka.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
          "region": "osaka",
          "photoLabel": "北極星心齋橋本店招牌經典元祖雞肉番茄醬蛋包飯"
        },
        {
          "id": "d9_opt2",
          "name": "自由軒 難波本店",
          "nameJp": "自由軒 難波本店",
          "isScheduled": false,
          "category": "dining",
          "coords": [
            34.6662,
            135.502
          ],
          "tag": "明治43年大阪第一家洋食",
          "address": "大阪府大阪市中央區難波3丁目1-34",
          "googleMaps": "https://www.google.com/maps/search/?api=1&query=自由軒+難波本店",
          "score": 3.52,
          "budget": "¥ (800~1,300円)",
          "description": "明治43年(1910)創業，大阪最古老洋食餐廳！日本大文豪織田作之助在小說《夫婦善哉》中盛讚的名物咖哩，將熱騰騰咖哩肉醬直接與白飯均勻攪拌，中央打入一顆生雞蛋，淋上伍斯特黑醋醬攪拌入口香滑濃郁！",
          "mustOrder": [
            "名物カレー (名物生蛋拌咖哩飯)",
            "ハイシライス (洋蔥牛肉燴飯)"
          ],
          "img": "https://upload.wikimedia.org/wikipedia/commons/8/85/Jiyuken_curry_rice_by_nozawana_in_Osaka.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled",
          "region": "osaka",
          "photoLabel": "自由軒難波本店名物百年咖哩飯中央打入一顆生雞蛋"
        }
      ],
      "primaryRegion": "osaka",
      "secondaryRegion": null
    },
    {
      "dayIndex": 10,
      "date": "2026-08-28",
      "dayOfWeek": "FRI",
      "location": "大阪 & 箕面",
      "coverImg": "assets/images/katsuoji.jpg",
      "theme": "勝運之寺勝尾寺萬尊達摩・梅田商圈・福岡軟銀 vs 歐力士 頂上決戰",
      "summary": "晨間前往關西著名求勝運名所「勝尾寺」，尋訪遍布山林的萬尊紅色彩繪達摩不倒翁；下午在梅田各大百貨採買，傍晚二度前往京瓷巨蛋觀賞「福岡軟銀鷹 vs 歐力士猛牛」頂上強權決戰。",
      "weather": {
        "desc": "晴朗晴空",
        "high": 34,
        "low": 26,
        "rain": 10,
        "icon": "🎯"
      },
      "mapCenter": [
        34.8659,
        135.4912
      ],
      "mapZoom": 12,
      "spots": [
        {
          "id": "d10_spot1",
          "name": "勝運之寺・勝尾寺",
          "nameJp": "勝運の寺・勝尾寺 (かつおうじ)",
          "isScheduled": true,
          "category": "attraction",
          "order": 1,
          "time": "08:30 - 12:00",
          "coords": [
            34.8659,
            135.4912
          ],
          "tag": "1300年歷史勝運神寺",
          "address": "大阪府箕面市勝尾寺",
          "googleMaps": "https://www.google.com/maps/search/?api=1&query=勝尾寺+箕面市",
          "description": "擁有1300年歷史的勝運名剎，自平安時代為清和天皇祈癒惡疾後賜名「勝王寺」。信眾為求考試、事業、比賽必勝而奉納的數萬尊紅色「勝運達摩（勝ちダルマ）」遍布全山石壁、石燈籠與樹林縫隙，景色極為震撼壯觀！",
          "highlights": [
            "漫山遍野隨處可見信徒擺放的迷你達摩不倒翁",
            "購買專屬達摩點上右眼祈願，願望達成後點上左眼送回奉納",
            "抽可愛的達摩籤 (ダルマみくじ) 帶回家作紀念"
          ],
          "photoTip": "在弁財天池水霧噴泉前拍攝倒影，或尋找石縫間排成一列的可愛迷你達摩特寫。",
          "hours": "08:00 - 17:00 (門票 500 円)",
          "phrases": [
            {
              "scenario": "在勝尾寺購買祈求合格必勝的達摩不倒翁",
              "japanese": "勝ちダルマを一つ授かりたいです。祈願の書き方を教えてください。",
              "romaji": "Kachi-daruma o hitotsu sazukaritai desu. Kigan no kakikata o oshiete kudasai.",
              "chinese": "我想要請一尊勝運達摩。請問可以教我祈願的寫法嗎？",
              "audio": "勝ちダルマを一つ授かりたいです"
            }
          ],
          "fullStory": [
            "【1300年勝運起源】神龜4年(727)開創，平安時代元慶4年(880)因第六代座主行巡為清和天皇祈禱惡疾痊癒，天皇大喜賜名『勝王寺』，後因避諱『王』字而改為同音之『勝尾寺』，自古源氏、德川等天下武將皆親赴祈求戰勝。",
            "【漫山遍野的達摩奇景】寺內崇尚『戰勝自己軟弱的心』之精神。信眾請領紅色『勝運達摩（勝ちダルマ）』，點上右眼立下誓願，待目標達成後點上左眼送回寺內奉納。成千上萬尊紅色迷你達摩不倒翁遍布全山石壁、石燈籠與樹枝縫隙，景色震撼壯觀。"
          ],
          "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Katsuo-ji_Temple_Red_Daruma_dolls_scattered_across_the_rocks_by_Don_Ramey_Logan.jpg/1280px-Katsuo-ji_Temple_Red_Daruma_dolls_scattered_across_the_rocks_by_Don_Ramey_Logan.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
          "region": "osaka",
          "photoLabel": "箕面勝尾寺岩壁與山林石階上佈滿的紅色勝運達摩不倒翁震撼景觀"
        },
        {
          "id": "d10_spot2",
          "name": "阪急百貨梅田本店",
          "nameJp": "阪急うめだ本店 B1 デパ地下",
          "isScheduled": true,
          "category": "dining",
          "order": 2,
          "time": "13:00 - 16:30",
          "coords": [
            34.7025,
            135.4982
          ],
          "tag": "排隊頂級伴手禮戰區",
          "address": "大阪府大阪市北區角田町8-7",
          "googleMaps": "https://www.google.com/maps/search/?api=1&query=阪急うめだ本店",
          "score": 3.75,
          "budget": "¥¥ (1,500~4,000円)",
          "description": "全日本營業額頂尖的百貨甜點街！匯聚頂級奢華版 Pocky「Bâton d'or」、厚切頂級洋芋片「GRAND Calbee」、Échiré 法國頂級奶油專賣店與宇治抹茶甜品。",
          "mustOrder": [
            "Bâton d'or (頂級澄清奶油百奇棒)",
            "Échiré (艾許頂級奶油千層酥)",
            "堂島蛋糕捲 (Mon cher)"
          ],
          "highlights": [
            "關西甜點界一級戰區，必買頂級限定伴手禮",
            "直通梅田地下街與各大地鐵站"
          ],
          "photoTip": "在華麗的甜點櫥窗前拍攝精美包裝禮盒。",
          "hours": "10:00 - 20:00",
          "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Umeda_Hankyu_Department_Store.JPG/1280px-Umeda_Hankyu_Department_Store.JPG?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
          "region": "osaka",
          "photoLabel": "大阪梅田地標・阪急百貨梅田本店與 B1 頂級甜點伴手禮街"
        },
        {
          "id": "d10_spot3",
          "name": "京瓷巨蛋大阪",
          "nameJp": "京セラドーム大阪 (オリックス vs 福岡ソフトバンク)",
          "isScheduled": true,
          "category": "attraction",
          "order": 3,
          "time": "17:30 - 21:30",
          "coords": [
            34.6693,
            135.4761
          ],
          "tag": "洋聯天王山頂上決戰",
          "address": "大阪府大阪市西區千代崎3丁目中2-1",
          "googleMaps": "https://www.google.com/maps/search/?api=1&query=京セラドーム大阪",
          "description": "太平洋聯盟兩大豪強的宿命對決！衛冕軍歐力士猛牛對決宇宙艦隊福岡軟銀鷹，球場內外野氣氛沸騰，體驗日本最頂級的職棒戰術攻防與熱血吶喊。",
          "highlights": [
            "日職頂尖強投強打正面交鋒",
            "週五特別夜間燈光秀與精彩局間表演"
          ],
          "photoTip": "在計分板亮起雙方先發名單時以廣角鏡頭拍攝全景。",
          "hours": "開場 16:30 / 比賽開始 18:00",
          "phrases": [
            {
              "scenario": "在球場內詢問官方周邊商品販售處",
              "japanese": "公式グッズ売り場はどこですか？",
              "romaji": "Koushiki guzzu uriba wa doko desu ka?",
              "chinese": "請問官方周邊商品專賣店在哪裡？",
              "audio": "公式グッズ売り場はどこですか？"
            }
          ],
          "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Orix_Buffaloes_versus_Tohoku_Rakuten_Golden_Eagles%2C_Kyocera_Dome_Osaka%2C_18_April_2023_04.jpg/1280px-Orix_Buffaloes_versus_Tohoku_Rakuten_Golden_Eagles%2C_Kyocera_Dome_Osaka%2C_18_April_2023_04.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
          "region": "osaka",
          "photoLabel": "京瓷巨蛋滿場球迷與日職天王山之戰比賽戰況全景"
        },
        {
          "id": "d10_opt1",
          "name": "日本環球影城",
          "nameJp": "ユニバーサル・スタジオ・ジャパン (USJ)",
          "isScheduled": false,
          "category": "quest",
          "coords": [
            34.6654,
            135.4323
          ],
          "tag": "超級任天堂與魔法世界",
          "address": "大阪府大阪市此花區櫻島2丁目1-33",
          "googleMaps": "https://www.google.com/maps/search/?api=1&query=ユニバーサル・スタジオ・ジャパン",
          "description": "世界頂級主題樂園！親身走進綠色水管進入「超級任天堂世界™」敲問號磚塊玩瑪利歐賽車，在「哈利波特魔法世界™」城堡喝奶油啤酒，體驗極限飛天翼龍過山車。",
          "highlights": [
            "超級任天堂世界 (Super Nintendo World) 能量手環互動",
            "哈利波特禁忌之旅 4D 體感過山車",
            "小小兵樂園瘋狂乘車遊"
          ],
          "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/USJ_Super_Nintendo_World_overview.jpg/1280px-USJ_Super_Nintendo_World_overview.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
          "region": "osaka",
          "photoLabel": "日本環球影城 USJ 超級任天堂世界 Super Nintendo World 碧姬城堡與問號磚塊"
        },
        {
          "id": "d10_opt2",
          "name": "箕面瀑布 & 箕面公園",
          "nameJp": "箕面大滝・箕面公園",
          "isScheduled": false,
          "category": "quest",
          "coords": [
            34.8525,
            135.4725
          ],
          "tag": "日本瀑布百選之森林浴",
          "address": "大阪府箕面市箕面公園",
          "googleMaps": "https://www.google.com/maps/search/?api=1&query=箕面大滝",
          "description": "高低落差達 33 米的壯麗瀑布，被選為日本瀑布百選！沿著清涼溪谷林蔭步道漫步，沿途品嚐傳承千年的名物「現炸楓葉天婦羅 (もみじの天ぷら)」。",
          "highlights": [
            "33米飛瀑直瀉而下的清涼水氣",
            "香脆甜鹹的現炸醃製楓葉天婦羅小吃"
          ],
          "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Minoh_Falls_Minoh_Osaka_pref_Japan04s5.jpg/1280px-Minoh_Falls_Minoh_Osaka_pref_Japan04s5.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
          "region": "osaka",
          "photoLabel": "日本瀑布百選之箕面大滝 33 米落差飛瀑與青翠山谷美景"
        }
      ],
      "primaryRegion": "osaka",
      "secondaryRegion": null
    },
    {
      "dayIndex": 11,
      "date": "2026-08-29",
      "dayOfWeek": "SAT",
      "location": "大阪 ➜ 關西機場",
      "coverImg": "assets/images/hero.jpg",
      "theme": "關西機場全新免稅商場・臨空城 Premium Outlets 掃貨・圓滿賦歸",
      "summary": "辦理退房後前往關西國際機場第一航廈體驗 2024~2026 全新翻新之國際線免稅商業區，隨後順遊臨空城 Rinku Premium Outlets 做最後大採買，滿載戰利品與難忘回憶平安返國。",
      "weather": {
        "desc": "晴朗好天氣",
        "high": 33,
        "low": 26,
        "rain": 0,
        "icon": "🛫"
      },
      "mapCenter": [
        34.4348,
        135.233
      ],
      "mapZoom": 13,
      "spots": [
        {
          "id": "d11_spot1",
          "name": "臨空城 Rinku Premium Outlets",
          "nameJp": "りんくうプレミアム・アウトレット",
          "isScheduled": true,
          "category": "attraction",
          "order": 1,
          "time": "09:30 - 13:30",
          "coords": [
            34.4068,
            135.2952
          ],
          "tag": "海景大型 Outlet 250+ 品牌",
          "address": "大阪府泉佐野市臨空往來南3-28",
          "googleMaps": "https://www.google.com/maps/search/?api=1&query=りんくうプレミアム・アウトレット",
          "description": "離關西機場僅 1 站（JR / 南海電車臨空城站），擁有超過 250 家國際名牌與日系品牌！美式度假村建築風格，面朝大阪灣海景，設有大型行李寄放處與美食街。",
          "highlights": [
            "超過 250 家國際名牌與運動潮牌免稅特惠",
            "臨海摩天輪與大阪灣日落美景",
            "全室內外無障礙連通道與充裕行李寄放櫃"
          ],
          "photoTip": "在臨海棕櫚樹大道以摩天輪與海灣為背景拍攝。",
          "hours": "10:00 - 20:00",
          "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Rinku_premium_outlets04s3200.jpg/1280px-Rinku_premium_outlets04s3200.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
          "region": "osaka",
          "photoLabel": "臨空城 Rinku Premium Outlets 美式度假村風格購物大道與棕櫚樹"
        },
        {
          "id": "d11_spot2",
          "name": "關西國際機場第一航廈",
          "nameJp": "関西国際空港 第1ターミナル 国際線商業エリア",
          "isScheduled": true,
          "category": "transport",
          "order": 2,
          "time": "14:30 - 18:30",
          "coords": [
            34.4348,
            135.233
          ],
          "tag": "關西最大級機場免稅殿堂",
          "address": "大阪府泉佐野市泉州空港北1 (第一航廈出境管制區內)",
          "googleMaps": "https://www.google.com/maps/search/?api=1&query=関西国際空港+第1ターミナル",
          "description": "2024~2026 全面翻新啟用的國際線出境管制區！集結日本全國名產免稅店「KIX DUTY FREE」、高級精品專門店、日本動漫專賣區與多樣化美食廣場，最後一站免稅掃貨極致便利。",
          "highlights": [
            "Royce 生巧克力、白色戀人、東京芭娜娜、文明堂蜂蜜蛋糕全品項免稅",
            "任天堂 Nintendo 專賣專區與日系美妝專櫃",
            "出境後舒適景觀休息區欣賞飛機起降"
          ],
          "photoTip": "在航廈落地玻璃窗前與停機坪上的飛機合影留念。",
          "hours": "各免稅店與航班同步營運",
          "phrases": [
            {
              "scenario": "在機場免稅店購買 Royce 生巧克力並加購保冷袋",
              "japanese": "ロイズの生チョコを三つと、保冷剤を付けていただけますか？",
              "romaji": "Roizu no nama choko o mittsu to, horeizai o tsukete itadakemasu ka?",
              "chinese": "請給我三個 Royce 生巧克力，並幫我加購保冷劑。",
              "audio": "保冷剤を付けていただけますか？"
            }
          ],
          "fullStory": [
            "【2024~2026 全新翻新免稅殿堂】關西國際機場第一航廈國際線出境管制區歷經多年大規模翻新擴建，打造中央步入式免稅大道『KIX DUTY FREE』，集結日本全國各地代表性伴手禮與高級精品。",
            "【免稅掃貨攻略】Royce 生巧克力、白色戀人、東京芭娜娜、文明堂蜂蜜蛋糕與京都宇治抹茶點心一站式免稅買齊；管制區內設有舒適景觀躺椅與美食廣場，登機前輕鬆享受最後日本時光。"
          ],
          "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/KIX_Duty_free_in_Kansai_Airport_Terminal_2025.JPG/1280px-KIX_Duty_free_in_Kansai_Airport_Terminal_2025.JPG?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
          "region": "osaka",
          "photoLabel": "關西國際機場第一航廈國際線全新 KIX Duty Free 免稅商業區大廳"
        },
        {
          "id": "d11_opt1",
          "name": "神座拉麵 關西機場店",
          "nameJp": "どうとんぼり神座 関西国際空港店",
          "isScheduled": false,
          "category": "dining",
          "coords": [
            34.432,
            135.2304
          ],
          "tag": "蔬菜秘傳湯頭名物",
          "address": "關西國際機場第1航廈 3F 餐飲區",
          "googleMaps": "https://www.google.com/maps/search/?api=1&query=どうとんぼり神座+関西国際空港",
          "score": 3.65,
          "budget": "¥ (800~1,300円)",
          "description": "關西代表性清甜蔬菜高湯拉麵！大量新鮮白菜與特製醬汁燉煮，回國前最後一碗暖心熱湯拉麵首選。",
          "mustOrder": [
            "おいしいラーメン (招牌美味白菜拉麵)",
            "小叉燒煮卵拉麵",
            "現炸日式煎餃"
          ],
          "img": "https://upload.wikimedia.org/wikipedia/commons/7/7c/Kamukura-ramen.JPG?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled",
          "region": "osaka",
          "photoLabel": "道頓堀神座拉麵名物白菜秘傳醬油湯頭美味拉麵"
        }
      ],
      "primaryRegion": "osaka",
      "secondaryRegion": null
    }
  ],
  "regionalGems": {
    "title": "NotebookLM 跨區域私房探索寶典 (滋賀・三重・岐阜老饕秘境)",
    "description": "由 NotebookLM 筆記本深度萃取之周邊縣市自駕與延伸探索指南",
    "sections": [
      {
        "region": "滋賀縣 (琵琶湖畔 & 近江名物)",
        "spots": [
          {
            "name": "國寶 彥根城 & 夢京橋城堡大道",
            "nameJp": "国宝 彦根城・夢京橋キャッスルロード",
            "coords": [
              35.2764,
              136.2518
            ],
            "tag": "國寶天守・近江牛老街",
            "description": "現存十二天守之一，吉祥物彥根貓 (Hikonyan) 發源地，城下夢京橋老街聚集千成亭近江牛與白壁和風商家。"
          },
          {
            "name": "La Collina 近江八幡 (童話草屋頂年輪蛋糕森林)",
            "nameJp": "ラ コリーナ近江八幡 (Club Harie)",
            "coords": [
              35.1488,
              136.1082
            ],
            "tag": "建築大師藤森照信・現烤年輪蛋糕",
            "description": "建築大師藤森照信操刀的綠色草屋頂童話建築，Club Harie 旗艦店，現場現烤香軟年輪蛋糕與生態稻田步道。"
          },
          {
            "name": "美秀美術館 (Miho Museum 桃花源記秘境)",
            "nameJp": "MIHO MUSEUM (ミホ ミュージアム)",
            "coords": [
              34.9148,
              136.0225
            ],
            "tag": "建築大師貝聿銘・隱世美術館",
            "description": "世界建築巨擘貝聿銘以《桃花源記》為概念，穿過金屬圓形隧道與懸索吊橋才能抵達的隱世山林藝術殿堂。"
          },
          {
            "name": "千成亭 伽羅 (熟成近江牛壽喜燒老店)",
            "nameJp": "千成亭 伽羅 (せんなりてい きゃら)",
            "coords": [
              35.2735,
              136.2542
            ],
            "tag": "日本三大和牛・Tabelog 3.72",
            "description": "擁有自家牧場的近江牛名門，在傳統町家庭園中品嚐低溫熟成近江牛壽喜燒與炙燒近江牛握壽司。"
          }
        ]
      },
      {
        "region": "三重縣 (桑名蛤蜊・伊賀忍者與幻之和牛)",
        "spots": [
          {
            "name": "日の出 (桑名天然大蛤蜊百年料亭)",
            "nameJp": "日の出 (ひので 桑名)",
            "coords": [
              35.0678,
              136.6922
            ],
            "tag": "Tabelog銅獎名店・手掌大天然蛤蜊",
            "description": "日本美食家狂推的傳奇料亭！提供有專人桌邊和室服務的天然桑名蛤蜊壽喜燒，選用稀缺 10 年生巨大蛤蜊。"
          },
          {
            "name": "元祖伊賀肉 金谷本店 (幻之伊賀牛壽喜燒)",
            "nameJp": "元祖伊賀肉 金谷 本店",
            "coords": [
              34.7672,
              136.1315
            ],
            "tag": "伊賀牛創始・老町家桌邊煎炙",
            "description": "在百年老町家和室由女將使用南部鐵器現場以砂糖與醬油乾煎炙烤頂級霜降伊賀牛，香氣撲鼻入口即化。"
          },
          {
            "name": "三井奧特萊斯購物城 爵士之夢長島",
            "nameJp": "三井アウトレットパーク ジャズドリーム長島",
            "coords": [
              35.0298,
              136.7325
            ],
            "tag": "全日本最大Outlet 300+品牌",
            "description": "全日本店鋪數最多、面積最大的 Outlet 購物城，美式紐奧良風格，緊鄰長島溫泉遊樂園與名花之里。"
          }
        ]
      },
      {
        "region": "高速公路沿線 SA/PA 老饕限定美食",
        "spots": [
          {
            "name": "東名阪高速 御在所 SA (四日市厚切醬煎豬排)",
            "tag": "高速公路美食第一名・多汁醬煎厚豬排",
            "description": "蒜香濃郁特製黑醬汁翻炒厚切多汁豬排，搭配大量高麗菜絲與白飯，跨縣市移動必停！"
          },
          {
            "name": "伊勢名物 伊勢茶霜淇淋 & 伊勢龍蝦可樂餅",
            "tag": "御在所SA限定甜品",
            "description": "濃郁微苦回甘的伊勢綠茶霜淇淋與現炸伊勢龍蝦奶油可樂餅。"
          }
        ]
      }
    ]
  }
};
