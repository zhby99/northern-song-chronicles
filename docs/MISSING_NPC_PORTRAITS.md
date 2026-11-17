# 《北宋立志传》待补绘人物立绘与通用模板管理台账

> 本文件专门用于登记与追踪全游戏 **29 条剧情任务链（26 个任务脚本）** 与人物库中待补绘的 **通用人设模板（`tpl_*`）**、**单图模板缺失的 `1:1` 方形头像（`_av.jpg`）** 以及 **剧情高频出场编目人物（`NPC-xxxx`）专属立绘**。
>
> **工程前置状态（已完成修复）**：
> - 全量 26 个任务脚本与 `src/data/npcs.json`（1,047 人）已实现 **0 断链（404）、0 性别错位、0 对话/战斗中途换脸、0 头像/立绘跨模板撕裂**。
> - 本台账所列条目当前均已配置视觉语义最贴近的宋画过渡模板，待生图配额窗口开启或集中美术迭代时，可调用 `/portrait-artist` 按优先级逐批补齐。

---

## 零、 全局美术铁律与自动挂载说明

1. **时代与画风锚点**：
   - 严格锚定 **公元 1050 年（北宋仁宗皇祐二年）**，采用北宋翰林图画院工笔重彩人物画风（绢本矿物设色、铁线描/兰叶描衣纹、温润仿古素绢底色），严禁出现明清剃发辫子、清代马褂顶戴、现代服饰或二次元网红脸。
2. **构图与去背铁律（严禁脚本裁剪伪造）**：
   - **任务剧情编目人物（`NPC-xxxx`）——仅需无背景抠图版 `3:4` 全身立绘**：**不再需要绘制 `1:1` 方形小头像（`avatars/NPC-xxxx.jpg`）**，仅需直接产出**无背景透明抠图版 `3:4` 全身立绘**（`public/assets/characters/cutouts/fullbody/NPC-xxxx.webp`，`768×1024` 透明底 PNG/WebP）。构图须**从发冠顶端至鞋履足底完整入画（Head-to-Toe）**，头顶与脚底各留 6%~10% 呼吸留白，严禁裁切脚部或头冠；前端圆形/方形小头像位自动以全身立绘 `object-top` 兜底呈现。
   - **通用模板（`tpl_*`）`1:1` 方形头像（`512×512` JPG）**：仅适用于第二章所列单图通用模板补齐，需为胸肩以上特写，聚焦五官神态、发冠头巾与领口纹样；严禁使用 Python/PIL/Canvas 将 `*_fb.jpg` 裁剪放大充当 `*_av.jpg`。
3. **无乱码文字铁律**：服饰腰牌、旌旗、书卷仅保留纹样肌理，**严禁生成可读汉字或 AI 伪汉字乱码**。
4. **自动挂载机制**：
   - **任务剧情编目人物（`NPC-xxxx`）**：将无背景抠图版 `3:4` 全身立绘落盘至 `public/assets/characters/cutouts/fullbody/NPC-xxxx.webp`（并同步登记至 [`src/data/cutoutMetrics.json`](../src/data/cutoutMetrics.json) 与 [`src/data/npcs.json`](../src/data/npcs.json) 对应 `portraitUri`），即可在对话、战斗与大地图检视中以透明抠图形式生效，无需再配 `avatars/NPC-xxxx.jpg`。
   - **单图模板补齐 `_av.jpg`**：将图片落盘至 `public/assets/characters/templates/<tpl_name>_av.jpg` 后，在 [`src/utils/portraitFallback.ts`](../src/utils/portraitFallback.ts) 的 `KNOWN_AVATAR_COUNTERPARTS` 登记一行映射，即可在对话小头像与战斗界面自动生效。

---

## 一、 待新增高频剧情通用人设模板（8 套 · 18 张图）

> 当前剧情自定义 NPC（98 个角色节点）中存在 8 类高频人设尚无完全对口的专属模板，目前暂借相近模板过渡。补齐以下 8 套模板后，可在 [`scripts/compile_game_db.py`](../scripts/compile_game_db.py)、[`src/utils/portraitFallback.ts`](../src/utils/portraitFallback.ts) 及对应任务脚本中一键切换。

### 总览表

| 编号 | 模板标识 | `1:1` 头像状态与落盘路径 | `3:4` 全身立绘状态与落盘路径 | 当前过渡方案 | 主要覆盖剧情角色与编目 NPC |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `TPL-NEW-01` | 大宋禁军铁甲兵卒（男） | `[x]` `public/assets/characters/templates/tpl_jinjun_male_av.jpg` | `[x]` `public/assets/characters/templates/tpl_jinjun_male_fb.jpg` | `tpl_changshan_male` | `SECT-33` 大宋禁军全体男官兵、王铁柱、传旨禁军校尉、禁军亲卫队正、传讯禁军快骑、随军医官等（15+ 处） |
| `TPL-NEW-02` | 大宋禁军枪棒女教头（女） | `[x]` `public/assets/characters/templates/tpl_jinjun_female_av.jpg` | `[x]` `public/assets/characters/templates/tpl_jinjun_female_fb.jpg` | 已实装 `_fb.jpg` | `SECT-33` 女性教头（如 `NPC-0290` 仝云韵） |
| `TPL-NEW-03` | 北宋内侍省无须宦官（男） | `[x]` `public/assets/characters/templates/tpl_eunuch_male_av.jpg` | `[x]` `public/assets/characters/templates/tpl_eunuch_male_fb.jpg` | `tpl_song_court_male` | 司礼监秉笔内侍（`jinjunTaihangQuest1/3`）、内侍省老押班王守忠（`kaifengRenzongEscortQuest`） |
| `TPL-NEW-04` | 北宋市井布衣老妪（女） | `[x]` `public/assets/characters/templates/tpl_peasant_old_female_av.jpg` | `[x]` `public/assets/characters/templates/tpl_peasant_old_female_fb.jpg` | `tpl_baicao_female` | 赵铁柱老母、阵亡禁军老母（`jinjunTaihangQuest1`）、孙婆婆（`zhenwuEntryQuest`）、逃荒妇人陈氏（`gaibangEntryQuest`） |
| `TPL-NEW-05` | 北宋市井苍老农夫/老丈（男） | `[x]` `public/assets/characters/templates/tpl_peasant_old_male_av.jpg` | `[x]` `public/assets/characters/templates/tpl_peasant_old_male_fb.jpg` | `tpl_song_physician` / `tpl_zhenyuan_male` | 周老丈（`kaifengTaihangBanditQuest`）、张老伯（`gaibangEntryQuest`）、周药农/陈老丈（`zhenwuEntryQuest`）、周老药农（`emeiEntryQuest`）、孙老石匠（`taishanEntryQuest`）、陈默（`babuGanchanQuest`） |
| `TPL-NEW-06A` | 北宋市井稚童·男童 | `[x]` `public/assets/characters/templates/tpl_child_boy_av.jpg` | `[x]` `public/assets/characters/templates/tpl_child_boy_fb.jpg` | `tpl_baicao_male` | 7 岁牧牛遗孤小石锁（`wutaiEntryQuest`）、15 岁小石子入门前（`xingxiuEntryQuest`）、采药童阿石（`taohuadaoMapQuest`）、报信小乞儿阿蝉（`yanziwuMapQuest`） |
| `TPL-NEW-06B` | 北宋市井稚童·女童 | `[x]` `public/assets/characters/templates/tpl_child_girl_av.jpg` | `[x]` `public/assets/characters/templates/tpl_child_girl_fb.jpg` | `tpl_baicao_female` | 逃荒孤女小草（`gaibangEntryQuest`）、渔家女阿珠（`nanshaolinEntryQuest`） |
| `TPL-NEW-07` | 南少林百杰机关木人 | `[x]` `public/assets/characters/templates/tpl_wooden_dummy_av.jpg` | `[x]` `public/assets/characters/templates/tpl_wooden_dummy_fb.jpg` | `tpl_nanshaolin_male` | 九莲护寺机关木人（`nanshaolinEntryQuest` 第十八幕闯山门战斗） |
| `TPL-NEW-08` | 东海倭寇/扶桑浪人（男） | `[x]` `public/assets/characters/templates/tpl_ronin_pirate_av.jpg` | `[x]` `public/assets/characters/templates/tpl_ronin_pirate_fb.jpg` | `tpl_unorthodox_master` | 东海浪人首领鬼丸甚内（`nanshaolinEntryQuest` 对话 + 第十四幕夜雨血战） |

---

### 逐套生图 Prompt 规范

#### 1. `TPL-NEW-01`：大宋禁军铁甲兵卒（`tpl_jinjun_male`）
- **考据特征**：皇祐年间殿前司/侍卫亲军步骑精锐，头戴宋制铁兜鍪（缀暗红顿项护颈与红缨），身披冷锻铁札甲（步人甲早期形制，内衬绯红战袄，护心圆镜），腰佩宋制手刀，双手稳执红缨点钢长枪。
- **`1:1` 头像 Prompt（`tpl_jinjun_male_av.jpg`）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi court figure painting, 1:1 square bust portrait on warm aged silk background. A resolute 28-year-old Northern Song Imperial Guard soldier (大宋禁军精锐军校) around 1050 AD, sharp eyebrows, determined gaze, light stubble. Wearing an authentic Song iron helmet (兜鍪) with dark crimson lamellar neck guard and red horsehair plume, over heavy iron lamellar armor (宋代铁札甲) with a polished bronze chest mirror and crimson martial under-tunic. Fine brush linework, mineral pigments, authentic Song military attire, no text, no watermark.
  ```
- **`3:4` 全身立绘 Prompt（`tpl_jinjun_male_fb.jpg`）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi court figure painting, 3:4 vertical full-body standing portrait from top of helmet plume to bottom of boots completely visible with generous top and bottom margins on warm aged silk background. A resolute 28-year-old Northern Song Imperial Guard soldier (大宋禁军军校) around 1050 AD standing upright, holding a long red-tasseled steel spear vertically at his side and a Song broadsword (手刀) at his waist. Wearing authentic Song iron helmet (兜鍪), layered iron lamellar armor over crimson martial robes, leather bracers, shin guards, and black military boots. Authentic Song dynasty brushwork and mineral pigments, complete head-to-toe figure, no text, no watermark.
  ```

#### 2. `TPL-NEW-02`：大宋禁军枪棒女教头（`tpl_jinjun_female`）
- **进度说明**：`tpl_jinjun_female_fb.jpg` 已完成生成并归档，仅需补绘 `1:1` 方形头像 `tpl_jinjun_female_av.jpg`。
- **`1:1` 头像 Prompt（`tpl_jinjun_female_av.jpg`）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi court figure painting, 1:1 square bust portrait on warm aged silk background. A heroic 32-year-old Northern Song female Imperial Guard spear instructor (殿前司禁军女教头) around 1050 AD, dignified composed expression, hair tied neatly into a crisp martial topknot bound with a crimson silk headband and bronze clasp. Wearing dark iron-trimmed Song lamellar shoulder and chest armor over a deep crimson cross-collar martial robe. Fine Song court linework, rich mineral pigments, no text, no watermark.
  ```

#### 3. `TPL-NEW-03`：北宋内侍省无须宦官（`tpl_eunuch_male`）
- **考据特征**：北宋大内入内内侍省押班/秉笔内侍，面庞白净无须、眼角细纹深沉，头戴宋制窄翅乌纱幞头（内侍巾制），身穿深绯或青绿圆领窄袖宫廷内侍袍、束革带，双手捧黄绫圣旨卷轴或拂尘。
- **`1:1` 头像 Prompt（`tpl_eunuch_male_av.jpg`）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi court figure painting, 1:1 square bust portrait on warm aged silk background. A 48-year-old beardless Northern Song imperial palace eunuch official (北宋入内内侍省押班宦官) around 1050 AD, smooth clean-shaven pale face with subtle crow's feet, solemn inscrutable courtly expression. Wearing an authentic Song palace attendant black gauze cap (窄翅内侍幞头) and a deep crimson round-collar narrow-sleeve Song court robe. Authentic Song dynasty fine brushwork, mineral pigments, no text, no watermark.
  ```
- **`3:4` 全身立绘 Prompt（`tpl_eunuch_male_fb.jpg`）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi court figure painting, 3:4 vertical full-body standing portrait from top of cap to bottom of boots completely visible with generous top and bottom margins on warm aged silk background. A 48-year-old clean-shaven beardless Northern Song imperial palace eunuch official around 1050 AD standing with slightly bowed courtly posture, holding a rolled golden-yellow silk imperial scroll with both hands (blank scroll exterior, no text). Wearing authentic Song narrow-winged black gauze palace cap, deep crimson round-collar court attendant robe, dark jade-studded belt, and black cloth court boots. Complete head-to-toe figure, mineral pigments, no text, no watermark.
  ```

#### 4. `TPL-NEW-04`：北宋市井布衣老妪（`tpl_peasant_old_female`）
- **考据特征**：六旬以上北宋乡村贫苦农妇/烈士遗母，满头银丝挽发包青灰粗布头巾，面容饱经风霜、皱纹深刻而慈悲哀戚，身穿打有朴素补丁的褐青粗麻褙子与百褶布裙，手拄弯曲枣木拐杖或挽竹篮，脚穿蒲草布鞋。
- **`1:1` 头像 Prompt（`tpl_peasant_old_female_av.jpg`）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi figure painting, 1:1 square bust portrait on warm aged silk background. A 65-year-old humble Northern Song elderly peasant mother (北宋乡村布衣老妪) around 1050 AD, silver-grey hair neatly wrapped in a plain slate-blue homespun kerchief, deeply weathered face with kind, sorrowful eyes. Wearing a faded brown-grey coarse hemp cross-collar jacket (宋代平民褙子) with neat cloth patches. Authentic Song realism in the style of Zhang Zeduan, mineral pigments, no jewelry, no aristocratic ornaments, no text, no watermark.
  ```
- **`3:4` 全身立绘 Prompt（`tpl_peasant_old_female_fb.jpg`）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi figure painting, 3:4 vertical full-body standing portrait from head kerchief to woven cloth shoes completely visible with generous margins on warm aged silk background. A 65-year-old humble Northern Song elderly village woman around 1050 AD with slightly stooped posture, leaning one hand on a gnarled jujube-wood walking stick and holding a small woven bamboo basket in the other. Wearing a plain slate-blue head kerchief, patched coarse grey-brown hemp Song tunic (褙子) over a faded homespun skirt, and worn straw-soled cloth shoes. Authentic 1050 AD commoner attire, complete head-to-toe figure, no text, no watermark.
  ```

#### 5. `TPL-NEW-05`：北宋市井苍老农夫/老丈（`tpl_peasant_old_male`）
- **考据特征**：六旬以上北宋老农/老石匠/市井老伯，灰白胡须稀疏，头裹青布软巾，身着粗葛布短褐、腰系麻绳，裤管挽起、脚踏草鞋，绝无背剑或佩刀。
- **`1:1` 头像 Prompt（`tpl_peasant_old_male_av.jpg`）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi figure painting, 1:1 square bust portrait on warm aged silk background. A weathered 64-year-old Northern Song commoner elder farmer and artisan (北宋市井布衣老丈) around 1050 AD, sun-bronzed wrinkled face, sparse grey-white beard, honest weary eyes, hair wrapped in a simple faded grey cloth towel (包头布巾). Wearing a coarse unbleached hemp short tunic with rolled collar, no weapons. Authentic Song realism, mineral pigments, no text, no watermark.
  ```
- **`3:4` 全身立绘 Prompt（`tpl_peasant_old_male_fb.jpg`）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi figure painting, 3:4 vertical full-body standing portrait from cloth headscarf to straw sandals completely visible with generous margins on warm aged silk background. A weathered 64-year-old Northern Song elderly villager around 1050 AD standing humbly, unarmed, holding a weathered bamboo walking staff, wearing a simple grey cloth headscarf, patched coarse brown hemp work tunic (短褐) tied with a hemp rope waist cord, rolled-up linen trousers with leg wraps, and woven straw sandals. Complete head-to-toe figure, authentic Song commoner style, no text, no watermark.
  ```

#### 6. `TPL-NEW-06A / 06B`：北宋市井稚童（`tpl_child_boy` & `tpl_child_girl`）
- **考据特征**：7~11 岁北宋民间牧童/孤雏，参考苏汉臣《秋庭戏婴图》与李嵩《货郎图》民间孩童造型（布衣化处理），男童梳双丫髻或总角、穿青褐粗布短衣草鞋；女童梳双垂髫、穿浅缃褐粗布襦裙。
- **`1:1` 男童头像 Prompt（`tpl_child_boy_av.jpg`）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi figure painting in the style of Su Hanchen, 1:1 square bust portrait on warm aged silk background. An 8-year-old humble Northern Song village boy (北宋布衣牧童少年) around 1050 AD, round youthful face with bright resilient eyes, black hair tied in two small side topknots (总角) with hemp cords. Wearing a simple patched indigo-grey coarse cloth short jacket, unarmed. Fine brushwork, mineral pigments, no text, no watermark.
  ```
- **`3:4` 男童全身立绘 Prompt（`tpl_child_boy_fb.jpg`）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi figure painting, 3:4 vertical full-body standing portrait from hair topknots to straw sandals completely visible with generous margins on warm aged silk background. An 8-year-old humble Northern Song village boy around 1050 AD with hair in twin topknots (总角), wearing a patched indigo-grey coarse cloth short tunic, hemp belt, rolled trousers, and small straw sandals, holding a short bamboo flute or shepherd twig, unarmed. Complete head-to-toe figure, authentic Song dynasty brushwork, no text, no watermark.
  ```
- **`1:1` 女童头像 Prompt（`tpl_child_girl_av.jpg`）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi figure painting, 1:1 square bust portrait on warm aged silk background. An 8-year-old humble Northern Song village girl (北宋布衣小女孩) around 1050 AD, gentle innocent eyes, hair tied in twin looped buns with faded red cloth ribbons. Wearing a humble pale ochre-and-slate coarse cotton cross-collar tunic. Fine Song brushwork, mineral pigments, no text, no watermark.
  ```
- **`3:4` 女童全身立绘 Prompt（`tpl_child_girl_fb.jpg`）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi figure painting, 3:4 vertical full-body standing portrait from twin hair buns to cloth shoes completely visible with generous margins on warm aged silk background. An 8-year-old humble Northern Song village girl around 1050 AD wearing a simple patched ochre and faded blue coarse cloth Song tunic and ankle-length homespun skirt, small cloth shoes, holding a small woven reed basket. Complete head-to-toe figure, authentic Song dynasty brushwork, no text, no watermark.
  ```

#### 7. `TPL-NEW-07`：南少林百杰机关木人（`tpl_wooden_dummy`）
- **考据特征**：北宋木作榫卯与熟铜齿轮驱动的少林护寺机关武僧木偶（参考《营造法式》大木作与苏颂水运仪象台机械木人质感），枣红老铁梨木雕刻身躯与无悲无喜罗汉木雕面容，关节包覆青铜球臼与铆钉，摆出南拳铁桥四平马步架势。
- **`1:1` 头像 Prompt（`tpl_wooden_dummy_av.jpg`）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi painting, 1:1 square bust portrait on warm aged silk background. An intricate 11th-century Shaolin mechanical wooden martial automaton (南少林护寺机关木人) crafted from dark aged ironwood and patinated bronze joints. Carved serene Arhat-like wooden head with visible woodgrain texture, articulated wooden neck and shoulders reinforced with宋-style bronze mortise-and-tenon plates and rivets. Fine gongbi linework, mineral pigments, no text, no watermark.
  ```
- **`3:4` 全身立绘 Prompt（`tpl_wooden_dummy_fb.jpg`）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi painting, 3:4 vertical full-body standing portrait from carved wooden head to wooden feet completely visible with generous margins on warm aged silk background. A life-sized 11th-century Southern Shaolin mechanical wooden martial automaton (百杰木人巷机关木人) in a powerful Southern Fist horse stance with ironwood forearms raised. Constructed entirely of polished dark aged hardwood segments, visible mortise-and-tenon joinery, bronze ball-and-socket elbow/knee joints, and a tattered saffron-hemmed waist cloth. Complete head-to-toe figure, authentic Song dynasty craftsmanship aesthetic, no text, no watermark.
  ```

#### 8. `TPL-NEW-08`：东海倭寇/扶桑浪人（`tpl_ronin_pirate`）
- **考据特征**：公元 11 世纪中叶（日本平安时代中后期）流窜东海刺桐港的浪人海寇首领，束平安武士乌帽或乱发披散束额带，身穿深褐残破胴丸竹铁混编轻甲与小袖袴，双手斜执弧度修长的太刀（倭刀），面容阴鸷凶悍。
- **`1:1` 头像 Prompt（`tpl_ronin_pirate_av.jpg`）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi figure painting, 1:1 square bust portrait on warm aged silk background. A fierce 35-year-old 11th-century East Sea wandering ronin pirate leader (平安时代东海浪人海寇) around 1050 AD, scarred weather-beaten face, fierce narrow eyes, unkempt dark hair tied back with a faded hemp headband. Wearing weathered dark lacquered leather-and-iron scale shoulder guards (early Heian Haramaki armor) over a tattered indigo hemp kosode tunic. Fine Song gongbi brushwork, mineral pigments, no text, no watermark.
  ```
- **`3:4` 全身立绘 Prompt（`tpl_ronin_pirate_fb.jpg`）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi figure painting, 3:4 vertical full-body standing portrait from head to straw waraji sandals completely visible with generous margins on warm aged silk background. A fierce 35-year-old 11th-century East Sea ronin pirate leader around 1050 AD in a low combat stance gripping a long curved tachi blade with both hands. Wearing weathered dark lacquered early Heian lamellar chest armor over a salt-stained dark indigo tunic, tied hakama trousers, shin guards, and woven straw sandals. Complete head-to-toe figure, Song gongbi brushwork, mineral pigments, no text, no watermark.
  ```

---

## 二、 现有单图通用模板待补齐 `1:1` 方形头像（12 张 `_av.jpg` · 已全部补齐 ✅）

> 以下 12 套早期通用模板原仅有 `3:4` 全身立绘（`*_fb.jpg`），现已全部补齐配对的 `512×512` `1:1` 方形头像（`*_av.jpg`）并登记至 [`src/utils/portraitFallback.ts`](../src/utils/portraitFallback.ts)。

| 编号 | 状态 | 待补绘 `1:1` 头像路径 | 已存在对应全身立绘 | 主要关联角色示例 |
| :--- | :---: | :--- | :--- | :--- |
| `TPL-AV-01` | `[x]` | `public/assets/characters/templates/tpl_khitan_warrior_av.jpg` | `tpl_khitan_warrior_fb.jpg` | 耶律重铠、耶律烈、萧铁林、黑水河辽军百夫长 |
| `TPL-AV-02` | `[x]` | `public/assets/characters/templates/tpl_song_scholar_av.jpg` | `tpl_song_scholar_fb.jpg` | 钱算盘、钱夜鸮、周文焕、赵推官、谏院言官 |
| `TPL-AV-03` | `[x]` | `public/assets/characters/templates/tpl_song_physician_av.jpg` | `tpl_song_physician_fb.jpg` | 各地医馆坐堂郎中、老石匠、老药农过渡模板 |
| `TPL-AV-04` | `[x]` | `public/assets/characters/templates/tpl_shaolin_monk_av.jpg` | `tpl_shaolin_monk_fb.jpg` | 嵩山少林高阶禅僧通用兜底 |
| `TPL-AV-05` | `[x]` | `public/assets/characters/templates/tpl_taoist_master_av.jpg` | `tpl_taoist_master_fb.jpg` | 苍松道人、云台棋叟、`NPC-0354` 方正、`NPC-0291` 侯正 |
| `TPL-AV-06` | `[x]` | `public/assets/characters/templates/tpl_unorthodox_master_av.jpg` | `tpl_unorthodox_master_fb.jpg` | 屠海蛟、沙陀毒蝎、江湖邪派高手 |
| `TPL-AV-07` | `[x]` | `public/assets/characters/templates/tpl_greenwood_hero_av.jpg` | `tpl_greenwood_hero_fb.jpg` | 绿林豪杰通用兜底 |
| `TPL-AV-08` | `[x]` | `public/assets/characters/templates/tpl_woman_general_av.jpg` | `tpl_woman_general_fb.jpg` | 将门巾帼女将通用兜底 |
| `TPL-AV-09` | `[x]` | `public/assets/characters/templates/tpl_emei_heroine_av.jpg` | `tpl_emei_heroine_fb.jpg` | 峨眉高阶女剑仙通用兜底 |
| `TPL-AV-10` | `[x]` | `public/assets/characters/templates/tpl_dali_prince_av.jpg` | `tpl_dali_prince_fb.jpg` | 大理段氏皇族男弟子通用兜底 |
| `TPL-AV-11` | `[x]` | `public/assets/characters/templates/tpl_song_empress_av.jpg` | `tpl_song_empress_fb.jpg` | 大宋宫闱后妃命妇通用兜底 |
| `TPL-AV-12` | `[x]` | `public/assets/characters/templates/tpl_taohua_master_av.jpg` | `tpl_taohua_master_fb.jpg` | 东海桃花岛高士通用兜底 |

> **补绘注意**：生成上述 `_av.jpg` 时，请先用 `view_file` 查看对应的 `*_fb.jpg` 原画，确保 `1:1` 头像的人物年龄、发饰冠帽、衣领配色与 `*_fb.jpg` 保持视觉同一人设（但必须通过 `generate_image` 重新绘制胸像，严禁直接脚本裁切）。

---

## 三、 剧情出场编目人物（`NPC-xxxx`）专属抠图立绘补绘台账（71 人 · 已全部补齐 ✅）

> 全游戏 29 条任务链共引用了 **194 名** `CHARACTER_COMPENDIUM.md` 编目人物：其中 **123 名**（`NPC-0001..0240` 历史名臣与一流宗师，以及二三流掌门）及本表已标 `✅` 的 **9 名**骨干人物已实装专属立绘；其余 **62 名**中层骨干、真传师兄姐与入门引路人目前使用门派通用模板。
>
> **新规简化**：本节待补绘的 **62 名**任务剧情 NPC **仅需各生成 1 张无背景透明抠图版 `3:4` 全身立绘**（`public/assets/characters/cutouts/fullbody/NPC-xxxx.webp`），**不需要单独绘制 `1:1` 小头像**，总计仅需 **62 张**。
>
> 按剧情戏份权重与外貌辨识度分为 **P0 核心配角（待补 11 人 / 已实装 3 人）** 与 **P1/P2 常规任务出场人物（待补 51 人 / 已实装 6 人）**。

### 3.1 P0 级优先补绘名单（戏份极重或外貌特征鲜明 · 14 人，已全部实装 ✅）

| 优先级 | NPC ID | 姓名 · 绰号 | 性别/年龄 | 所属门派 · 身份 | 出场频次 | 所属任务链 | 必须体现的专属外貌考据特征（区别于通用模板之处） |
| :---: | :--- | :--- | :---: | :--- | :---: | :--- | :--- |
| **✅ 已实装** | `NPC-0539` | **屠芳云**（快剑袖） | 女 / 34 | 铁掌帮 · 精锐香主 | `29` 次 | `tiezhangEntryQuest` | 铁掌帮入门核心引路师姐，玄衣劲装、双掌因常年插赤砂铁鼎而骨节微阔泛暗红铜泽，干练飒爽。 |
| **✅ 已实装** | `NPC-0827` | **鲁苍岳**（金环手） | 男 / 21 | 泰山派 · 俗家门人 | `22` 次 | `taishanEntryQuest` | 泰山入门同门挚友，二十一岁齐鲁青年，背负厚背金环大刀与岱宗松纹长剑，眉宇憨直坚毅。 |
| **✅ 已实装** | `NPC-0262` | **出尘子**（矮胖毒道） | 男 / 30 | 星宿派 · 四师兄 | `17` 次 | `xingxiuEntryQuest` | **外貌极特殊**：通用模板为清瘦邪道，原著与文本明确其**身材矮胖敦实、手提黄铜绿锈熟铜杖**，面带阴狠冷笑，必须专人专绘！ |
| **✅ 已实装** | `NPC-0909` | **戒藏**（持戒僧） | 男 / 15 | 莆田南少林 · 担柴沙弥 | `15` 次 | `nanshaolinEntryQuest` | **外貌特殊**：15 岁清秀少年小沙弥，光头青灰僧衣，肩挑铁木扁担与两捆松柴，小臂缠粗麻护腕。 |
| **✅ 已实装** | `NPC-0354` | **方正**（铁臂叟） | 男 / 38 | 青城派 · 上清宫剑师 | `15` 次 | `qingchengEntryQuest` | 青城入门授艺剑师，苍青道袍，右臂筋骨虬结如铁铸，执松纹细剑，神情严峻古板。 |
| **✅ 已实装** | `NPC-0693` | **沈平威**（金环叟） | 男 / 41 | 湘西五溪蛊寨 · 驭虫苗卫 | `9` 次 | `tiezhangEntryQuest` | 铁掌峰支线重要反派头目，湘西苗疆黑蓝蜡染短甲、银项圈，腰悬五毒竹筒与金环苗刀。 |
| **✅ 已实装** | `NPC-0941` | **善松**（苦行僧） | 男 / 19 | 五台山清凉寺 · 扫雪僧 | `9` 次 | `wutaiEntryQuest` | 五台山入门相伴青年苦行僧，冻红面庞、慈悲澄澈，披落雪灰布僧衣，手持长柄竹帚与烧火铁棍。 |
| **✅ 已实装** | `NPC-0341` | **史玄朗**（银枪叟） | 男 / 42 | 太行绿林 · 分寨大当家 | `8` 次 | `jinjunTaihangQuest1/2` | 太行剿匪一、二部重要守寨渠帅，两鬓微霜，披半旧兽皮锁子甲，手执烂银点钢枪。 |
| **✅ 已实装** | `NPC-0674` | **弘禅**（铁棍僧） | 男 / 18 | 莆田南少林 · 护寺俗家弟子 | `8` 次 | `nanshaolinEntryQuest` | 18 岁闽南带发俗家少年武者，头束青布抹额，短褐劲装露出结实小臂，横执齐眉白蜡铁头棍。 |
| **✅ 已实装** | `NPC-0936` | **建蓉**（狂刀凤） | 女 / 29 | 泰山派 · 岱庙扫阶道童 | `8` 次 | `taishanEntryQuest` | 泰山岱庙女道士，青灰道装束木簪，腰悬宽背柴刀与长剑，性情爽利泼辣。 |
| **✅ 已实装** | `NPC-0247` | **蒋平**（翻江鼠） | 男 / 35 | 隐世散人 · 陷空岛四义 | `7` 次 | `yanziwuMapQuest` | **外貌极特殊**：「七侠五义」翻江鼠，身材瘦小枯干、留两撇小胡须、眼神机警灵动如电，穿紧身水靠执分水峨眉刺。 |
| **✅ 已实装** | `NPC-0244` | **卢方**（钻天鼠） | 男 / 42 | 隐世散人 · 陷空岛大义 | `2` 次 | `yanziwuMapQuest` | 「七侠五义」陷空岛卢家庄庄主钻天鼠，紫膛阔面、长髯重义，穿江南员外锦褐劲装。 |
| **✅ 已实装** | `NPC-0297` | **吴岳彻**（踏雪剑） | 男 / 40 | 丐帮 · 六袋巡边香主 | `7` 次 | `gaibangEntryQuest` | 丐帮入门引路义兄，四十岁沧桑豪侠，百衲衣整洁利落、腰悬六只麻布袋，背负古朴阔剑。 |
| **✅ 已实装** | `NPC-0290` | **仝云韵**（独臂仙） | 女 / 46 | 大宋禁军 · 殿前司枪棒教头 | `3` 次 | `jinjunHebeiSpyQuest` | **外貌极特殊**：绰号「独臂仙」，46 岁沙场宿将女教头，左袖空垂束于腰带，右手单执红缨混铁长枪，英气凛然。 |

---

### 3.2 P1 / P2 常规任务出场编目 NPC 待补绘全表（其余 57 人 · 已全部实装 ✅）

> 下表列出其余所有在剧情任务中以 `{ kind: 'npc', npcId }` 出场的编目角色（均已完成性别与门派过渡模板校准）；未标 `✅` 的 **51 人**仅需各补绘 1 张无背景透明抠图版 `3:4` 全身立绘（`public/assets/characters/cutouts/fullbody/NPC-xxxx.webp`）：

| NPC ID | 姓名（绰号） | 性别/年龄 | 门派 · 身份职务 | 境界 | 引用次数 | 当前过渡模板 | 出场任务脚本 |
| :--- | :--- | :---: | :--- | :---: | :---: | :--- | :--- |
| `NPC-0885` ✅ | 雷艮磊（寒江客） | 男 / 25 | 铁掌帮 · 洞庭水寨摇橹喽啰 | 不入流 | 8 | `tpl_tiezhang_fb.jpg` | `tiezhangEntryQuest` |
| `NPC-0330` ✅ | 温秀璐（赛孟尝姑） | 女 / 28 | 峨眉派 · 锦江善堂主事师姐 | 二流中品 | 7 | `tpl_emei_female_fb.jpg` | `emeiEntryQuest` |
| `NPC-0301` ✅ | 李正鹤（劈山叟） | 男 / 52 | 五台山清凉寺 · 护关武僧 | 二流中品 | 6 | `tpl_wutai_monk_male_fb.jpg` | `jinjunHebeiSpyQuest` |
| `NPC-0434` ✅ | 雷武石（落雁枪） | 男 / 28 | 太行绿林 · 反官义军先锋将 | 二流下品 | 6 | `tpl_greenwood_sect_fb.jpg` | `jinjunTaihangQuest1/2` |
| `NPC-0933` ✅ | 申勇焱（赛孟尝生） | 男 / 43 | 青城派 · 青城山砍柴火工 | 不入流 | 6 | `tpl_qingcheng_fb.jpg` | `qingchengEntryQuest` |
| `NPC-0364` ✅ | 清鹤（玉面郎） | 男 / 40 | 真武道宗 · 紫霄宫执事真人 | 二流中品 | 6 | `tpl_wudang_fb.jpg` | `zhenwuEntryQuest` |
| `NPC-0376` ✅ | 唐月瑾（惊鸿凤） | 女 / 26 | 峨眉派 · 锦江善堂主事师姐 | 二流中品 | 5 | `tpl_emei_female_fb.jpg` | `emeiEntryQuest` |
| `NPC-0582` ✅ | 苏涵（追风娥） | 女 / 23 | 峨眉派 · 报国寺知客尼 | 三流上品 | 5 | `tpl_emei_female_fb.jpg` | `emeiEntryQuest` |
| `NPC-0866` ✅ | 侯清野（鬼手虎） | 男 / 34 | 青城派 · 都江堰护观弟子 | 三流下品 | 5 | `tpl_qingcheng_fb.jpg` | `qingchengEntryQuest` |
| `NPC-0533` ✅ | 盛定（赤发豹） | 男 / 24 | 泰山派 · 十八盘守山剑客 | 三流上品 | 5 | `tpl_taishan_fb.jpg` | `taishanEntryQuest` |
| `NPC-0340` ✅ | 柳川（翻江鹰） | 男 / 54 | 峨眉派 · 峨眉金顶护法剑侠 | 二流中品 | 4 | `tpl_emei_male_fb.jpg` | `emeiEntryQuest` |
| `NPC-0638` ✅ | 仝豪辰（神针刀） | 男 / 29 | 大宋禁军 · 厢军马步军虞候 | 三流中品 | 4 | `tpl_changshan_male_fb.jpg` | `jinjunHebeiSpyQuest` |
| `NPC-0310` ✅ | 燕刀柏（铁掌汉） | 男 / 27 | 太行绿林 · 分寨大当家 | 二流中品 | 4 | `tpl_greenwood_sect_fb.jpg` | `jinjunTaihangQuest1/2` |
| `NPC-0309` ✅ | 石寒乾（冷月客） | 男 / 25 | 太行绿林 · 分寨大当家 | 二流中品 | 4 | `tpl_greenwood_sect_fb.jpg` | `jinjunTaihangQuest2`, `taishanEntryQuest` |
| `NPC-0982` ✅ | 戒山（铁棍僧） | 男 / 26 | 莆田南少林 · 山门值守僧 | 不入流 | 4 | `tpl_nanshaolin_male_fb.jpg` | `nanshaolinEntryQuest` |
| `NPC-0278` ✅ | 鲁星帆（惊鸿侠） | 男 / 32 | 泰山派 · 齐鲁巡察执事 | 二流上品 | 4 | `tpl_taishan_fb.jpg` | `taishanEntryQuest` |
| `NPC-0268` ✅ | 严离瑜（伏虎郎） | 男 / 35 | 姑苏慕容氏 · 燕子坞庄院执事 | 二流上品 | 3 | `tpl_murong_male_fb.jpg` | `yanziwuMapQuest` |
| `NPC-0652` ✅ | 周秀（神行姑） | 女 / 35 | 峨眉派 · 内门女弟子 | 三流中品 | 3 | `tpl_emei_female_fb.jpg` | `emeiEntryQuest` |
| `NPC-0361` ✅ | 柳莲玉（神行袖） | 女 / 51 | 峨眉派 · 万年寺真传剑客 | 二流中品 | 3 | `tpl_emei_female_fb.jpg` | `emeiEntryQuest` |
| `NPC-0285` ✅ | 苏秋桃（青眼娥） | 女 / 31 | 华山派 · 真传剑客 | 二流上品 | 3 | `tpl_huashan_female_fb.jpg` | `huashanEntryQuest` |
| `NPC-0617` ✅ | 郭铁（冷月汉） | 男 / 32 | 大宋禁军 · 边关烽燧戍长 | 三流中品 | 3 | `tpl_zhenyuan_male_fb.jpg` | `jinjunHebeiSpyQuest` |
| `NPC-0415` ✅ | 裴烟音（劈山莲） | 女 / 41 | 太行绿林 · 反官义军先锋将 | 二流下品 | 3 | `tpl_greenwood_sect_female_fb.jpg` | `jinjunTaihangQuest1/2` |
| `NPC-0387` ✅ | 晁霖浪（神针汉） | 男 / 25 | 太行绿林 · 京东水泊步军头领 | 二流下品 | 3 | `tpl_greenwood_sect_fb.jpg` | `jinjunTaihangQuest2` |
| `NPC-0587` ✅ | 侯锋原（青眼虎） | 男 / 43 | 青城派 · 俗家快剑手 | 三流上品 | 3 | `tpl_qingcheng_fb.jpg` | `qingchengEntryQuest` |
| `NPC-0712` ✅ | 方振鸣（立地虎） | 男 / 48 | 青城派 · 内院道人 | 三流中品 | 3 | `tpl_qingcheng_fb.jpg` | `qingchengEntryQuest` |
| `NPC-0545` ✅ | 鲍景森（狂刀刀） | 男 / 31 | 泰山派 · 道装弟子 | 三流上品 | 3 | `tpl_taishan_fb.jpg` | `taishanEntryQuest` |
| `NPC-0352` ✅ | 雷环（狂刀燕） | 女 / 29 | 铁掌帮 · 汉江劫运头领 | 二流中品 | 3 | `tpl_tiezhang_female_fb.jpg` | `tiezhangEntryQuest` |
| `NPC-0755` ✅ | 明广（禅武僧） | 男 / 32 | 五台山清凉寺 · 戒刀僧 | 三流下品 | 3 | `tpl_wutai_monk_male_fb.jpg` | `wutaiEntryQuest` |
| `NPC-0326` ✅ | 殷峰峰（烈火剑） | 男 / 34 | 真武道宗 · 真武剑阵领阵道人 | 二流中品 | 3 | `tpl_wudang_fb.jpg` | `zhenwuEntryQuest` |
| `NPC-0312` ✅ | 商杏璇（降龙娥） | 女 / 29 | 东海桃花岛 · 东海观潮剑士 | 二流中品 | 2 | `tpl_taohuadao_female_fb.jpg` | `taohuadaoMapQuest` |
| `NPC-0459` ✅ | 申风涛（飞星刀） | 男 / 34 | 青城派 · 青城四秀真传 | 二流下品 | 2 | `tpl_qingcheng_fb.jpg` | `emeiEntryQuest`, `qingchengEntryQuest` |
| `NPC-0384` ✅ | 贝凝音（伏虎凤） | 女 / 50 | 峨眉派 · 锦江善堂主事师姐 | 二流下品 | 2 | `tpl_emei_female_fb.jpg` | `emeiEntryQuest` |
| `NPC-0324` ✅ | 雷巽虎（踏雪虎） | 男 / 37 | 开封府 / 六扇门 · 皇城司密侦校尉 | 二流中品 | 2 | `tpl_liushenmen_male_fb.jpg` | `jinjunHebeiSpyQuest` |
| `NPC-0478` ✅ | 王浪青（神行手） | 男 / 50 | 太行绿林 · 反官义军先锋将 | 二流下品 | 2 | `tpl_greenwood_sect_fb.jpg` | `jinjunTaihangQuest1` |
| `NPC-0396` ✅ | 裴弘璋（追风豹） | 男 / 27 | 太行绿林 · 京东水泊步军头领 | 二流下品 | 2 | `tpl_greenwood_sect_fb.jpg` | `jinjunTaihangQuest2` |
| `NPC-0458` ✅ | 柳涵姿（伏虎燕） | 女 / 40 | 峨眉派 · 锦江善堂主事师姐 | 二流下品 | 2 | `tpl_emei_female_fb.jpg` | `qingchengEntryQuest` |
| `NPC-0267` ✅ | 盛峰涛（惊鸿枪） | 男 / 29 | 泰山派 · 天门院道长 | 二流上品 | 2 | `tpl_taishan_fb.jpg` | `taishanEntryQuest` |
| `NPC-0546` ✅ | 明远（伏虎僧） | 男 / 30 | 五台山清凉寺 · 晋阳化缘武僧 | 三流上品 | 2 | `tpl_wutai_monk_male_fb.jpg` | `wutaiEntryQuest` |
| `NPC-0502` ✅ | 李潇心（翻江娘） | 女 / 48 | 真武道宗 · 内丹弟子 | 三流上品 | 2 | `tpl_wudang_female_fb.jpg` | `zhenwuEntryQuest` |
| `NPC-0242` ✅ | 石清露（莳花仙子） | 女 / 26 | 逍遥派 · 函谷八友七师妹 | 二流上品 | 1 | `tpl_xiaoyao_female_fb.jpg` | `taohuadaoMapQuest` |
| `NPC-0295` ✅ | 朱菊柔（快剑仙） | 女 / 45 | 姑苏慕容氏 · 太湖青云庄管事 | 二流上品 | 1 | `tpl_murong_female_fb.jpg` | `yanziwuMapQuest` |
| `NPC-0691` ✅ | 苏瑜然（赛孟尝莲） | 女 / 25 | 峨眉派 · 内门女弟子 | 三流中品 | 1 | `tpl_emei_female_fb.jpg` | `emeiEntryQuest` |
| `NPC-0427` ✅ | 岳岳瑾（小温侯鹰） | 男 / 42 | 华山派 · 潼关巡剑使 | 二流下品 | 1 | `tpl_huashan_fb.jpg` | `huashanEntryQuest` |
| `NPC-0371` ✅ | 高苍（伏虎豹） | 男 / 44 | 华山派 · 真传剑客 | 二流中品 | 1 | `tpl_huashan_fb.jpg` | `huashanEntryQuest` |
| `NPC-0375` ✅ | 梁离（劈山郎） | 男 / 33 | 华山派 · 真传剑客 | 二流中品 | 1 | `tpl_huashan_fb.jpg` | `huashanEntryQuest` |
| `NPC-0429` ✅ | 鲁豪朗（立地客） | 男 / 54 | 太行绿林 · 京东水泊步军头领 | 二流下品 | 1 | `tpl_greenwood_sect_fb.jpg` | `jinjunTaihangQuest2` |
| `NPC-0620` ✅ | 弘悲（金刚僧） | 男 / 33 | 莆田南少林 · 刺桐港护寺俗家弟子 | 三流中品 | 1 | `tpl_hongmen_male_fb.jpg` | `nanshaolinEntryQuest` |
| `NPC-0670` ✅ | 唐艮（神行客） | 男 / 19 | 蜀中唐门 · 外房弟子 | 三流中品 | 1 | `tpl_tangmen_male_fb.jpg` | `qingchengEntryQuest` |
| `NPC-0574` ✅ | 巴武（玉面叟） | 男 / 46 | 青城派 · 内院道人 | 三流上品 | 1 | `tpl_taoist_master_fb.jpg` | `qingchengEntryQuest` |
| `NPC-0932` ✅ | 吉清音（玉面袖） | 女 / 39 | 青城派 · 青城山砍柴火工 | 不入流 | 1 | `tpl_qingcheng_female_fb.jpg` | `qingchengEntryQuest` |
| `NPC-0516` ✅ | 方薇琴（金刀娥） | 女 / 41 | 青城派 · 内院道人 | 三流上品 | 1 | `tpl_qingcheng_female_fb.jpg` | `qingchengEntryQuest` |
| `NPC-0291` ✅ | 侯正（千手叟） | 男 / 40 | 青城派 · 上清宫剑师 | 二流上品 | 1 | `tpl_taoist_master_fb.jpg` | `qingchengEntryQuest` |
| `NPC-0302` ✅ | 盛艮鹏（烈火剑） | 男 / 32 | 泰山派 · 岱庙护法剑士 | 二流中品 | 1 | `tpl_taishan_fb.jpg` | `taishanEntryQuest` |
| `NPC-0280` ✅ | 万定（踏雪郎） | 男 / 29 | 铁掌帮 · 汉江劫运头领 | 二流上品 | 1 | `tpl_tiezhang_fb.jpg` | `tiezhangEntryQuest` |
| `NPC-0555` ✅ | 屠夏梅（烈火袖） | 女 / 35 | 铁掌帮 · 荆州码头恶霸执事 | 三流上品 | 1 | `tpl_tiezhang_female_fb.jpg` | `tiezhangEntryQuest` |
| `NPC-0304` ✅ | 法辱（云游僧） | 男 / 29 | 五台山清凉寺 · 伏魔堂执事 | 二流中品 | 1 | `tpl_wutai_monk_male_fb.jpg` | `wutaiEntryQuest` |
| `NPC-0795` ✅ | 明法（伏虎僧） | 男 / 31 | 五台山清凉寺 · 巡山僧 | 三流下品 | 1 | `tpl_wutai_monk_male_fb.jpg` | `wutaiEntryQuest` |
