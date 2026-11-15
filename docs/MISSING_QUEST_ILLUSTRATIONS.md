# 《北宋立志传》待补绘剧情插画（CG）管理台账

> 本文件专门用于登记与追踪剧情任务链（`StorySceneModal`）中已预埋路径、待生图配额恢复或美术阶段集中补绘的 **16:9 宋风工笔重彩剧情插画（CG）**。
>
> **自动挂载机制说明**：前端剧情舞台组件 [`StorySceneModal.tsx`](../src/components/quest/StorySceneModal.tsx) 已支持 `scene.illustrationUrl` 与 `beat.illustrationUrl`。图片未就绪时自动显示「绘卷留白」古风占位框；一旦将对应原画压缩存放至 `public/assets/quests/` 指定路径，**无需修改任何 TypeScript 代码即可自动加载生效**。

---

## 一、 待补绘插画总览表

| 编号 | 状态 | 目标落盘路径（相对于项目根目录） | 运行时引用 URL | 所属任务链 | 触发幕次（Scene ID） | 画幅比例 |
| :--- | :---: | :--- | :--- | :--- | :--- | :---: |
| `CG-QST-001` | `[x]` 已完成 | `public/assets/quests/kaifeng_execution.jpg` | `/assets/quests/kaifeng_execution.jpg` | `QST-SECT-17-TAIHANG-BANDIT`<br>《太行劫匪 · 华北风云》 | 第十一幕 · 市曹刀落明典刑<br>（`scene_thb_11_kaifeng_execution`） | `16:9` |
| `CG-QST-002` | `[x]` 已完成 | `public/assets/quests/taihang_beheading.jpg` | `/assets/quests/taihang_beheading.jpg` | `QST-SECT-17-TAIHANG-BANDIT`<br>《太行劫匪 · 华北风云》 | 第十七幕 · 粗衣跪寨饮刀终<br>（`scene_thb_17_taihang_beheading`） | `16:9` |
| `CG-QST-003` | `[ ]` 待补绘 | `public/assets/quests/gaibang_temple_fire.jpg` | `/assets/quests/gaibang_temple_fire.jpg` | `QST-SECT-02-ENTRY`<br>《青囊尽空 · 义聚杏林》 | 第四幕 · 古庙篝火分焦饼<br>（`SCENE_GB_04_TEMPLE_HALF_CAKE`） | `16:9` |
| `CG-QST-004` | `[ ]` 待补绘 | `public/assets/quests/gaibang_granary_silver.jpg` | `/assets/quests/gaibang_granary_silver.jpg` | `QST-SECT-02-ENTRY`<br>《青囊尽空 · 义聚杏林》 | 第九幕 · 烛影樟箱试本心<br>（`SCENE_GB_09_ACCOUNT_ROOM_SILVER`） | `16:9` |
| `CG-QST-005` | `[ ]` 待补绘 | `public/assets/quests/gaibang_apricot_oath.jpg` | `/assets/quests/gaibang_apricot_oath.jpg` | `QST-SECT-02-ENTRY`<br>《青囊尽空 · 义聚杏林》 | 第十八幕 · 拍封舀酒立三规<br>（`SCENE_GB_18_BOWL_OF_WINE`） | `16:9` |
| `CG-QST-006` | `[ ]` 待补绘 | `public/assets/quests/gaibang_bamboo_pouch.jpg` | `/assets/quests/gaibang_bamboo_pouch.jpg` | `QST-SECT-02-ENTRY`<br>《青囊尽空 · 义聚杏林》 | 第二十幕 · 一袋挂腰百衲衣<br>（`SCENE_GB_20_FIRST_POUCH`） | `16:9` |
| `CG-QST-007` | `[ ]` 待补绘 | `public/assets/quests/huashan_changan_rain_go.jpg` | `/assets/quests/huashan_changan_rain_go.jpg` | `QST-SECT-05-ENTRY`<br>《云海孤棋 · 问剑西岳》 | 第二幕 · 残枰一问见初心<br>（`SCENE_HS_02_BROKEN_BOARD`） | `16:9` |
| `CG-QST-008` | `[ ]` 待补绘 | `public/assets/quests/huashan_canglong_ridge.jpg` | `/assets/quests/huashan_canglong_ridge.jpg` | `QST-SECT-05-ENTRY`<br>《云海孤棋 · 问剑西岳》 | 第七幕 · 苍龙岭上万丈云<br>（`SCENE_HS_07_CANGLONGLING`） | `16:9` |
| `CG-QST-009` | `[ ]` 待补绘 | `public/assets/quests/huashan_botai_chess.jpg` | `/assets/quests/huashan_botai_chess.jpg` | `QST-SECT-05-ENTRY`<br>《云海孤棋 · 问剑西岳》 | 第十一幕 · 绝顶博台孤峰弈<br>（`SCENE_HS_11_BOTAI_PAVILION`） | `16:9` |
| `CG-QST-010` | `[ ]` 待补绘 | `public/assets/quests/huashan_zixia_dawn_sword.jpg` | `/assets/quests/huashan_zixia_dawn_sword.jpg` | `QST-SECT-05-ENTRY`<br>《云海孤棋 · 问剑西岳》 | 第二十一幕 · 紫气东来授青锋<br>（`SCENE_HS_21_BESTOW_SWORD`） | `16:9` |
| `CG-QST-011` | `[ ]` 待补绘 | `public/assets/quests/renzong_weifu_market.jpg` | `/assets/quests/renzong_weifu_market.jpg` | `QST-SECT-17-RENZONG-ESCORT`<br>《微服汴梁 · 血护龙颜》 | 第五~八幕 · 宣德微服相国寺灯市<br>（`scene_rz_05_market_twilight` 等 4 幕） | `16:9` |
| `CG-QST-012` | `[ ]` 待补绘 | `public/assets/quests/renzong_pagoda_ambush.jpg` | `/assets/quests/renzong_pagoda_ambush.jpg` | `QST-SECT-17-RENZONG-ESCORT`<br>《微服汴梁 · 血护龙颜》 | 第十一~十四幕 · 资圣宝塔飞檐断铃<br>（`scene_rz_12_pagoda_ambush_duel` 等 4 幕） | `16:9` |
| `CG-QST-013` | `[ ]` 待补绘 | `public/assets/quests/renzong_fanlou_assassins.jpg` | `/assets/quests/renzong_fanlou_assassins.jpg` | `QST-SECT-17-RENZONG-ESCORT`<br>《微服汴梁 · 血护龙颜》 | 第十九~二十二幕 · 樊楼飞桥珠帘破屏<br>（`scene_rz_20_red_plaque_ambush` 等 4 幕） | `16:9` |
| `CG-QST-014` | `[ ]` 待补绘 | `public/assets/quests/renzong_hongqiao_blood.jpg` | `/assets/quests/renzong_hongqiao_blood.jpg` | `QST-SECT-17-RENZONG-ESCORT`<br>《微服汴梁 · 血护龙颜》 | 第二十七~三十幕 · 虹桥夜雨血战双狼<br>（`scene_rz_28_hongqiao_final_duel` 等 4 幕） | `16:9` |
| `CG-QST-015` | `[ ]` 待补绘 | `public/assets/quests/renzong_zichen_decree.jpg` | `/assets/quests/renzong_zichen_decree.jpg` | `QST-SECT-17-RENZONG-ESCORT`<br>《微服汴梁 · 血护龙颜》 | 第三十三~三十六幕 · 紫宸晓日御马秘卷<br>（`scene_rz_34_imperial_choice` 等 6 幕） | `16:9` |

---

## 二、 逐张画面考据要求与生图 Prompt 规范

> **全局美术铁律（必遵）**：
> 1. **时代锚点**：公元 1050 年（北宋仁宗皇祐二年），建筑斗拱、禁军甲胄、差役服饰、市井旗幌均须符合北宋画院青绿重彩工笔美学（参考《清明上河图》《瑞鹤图》设色与笔意），严禁出现明清剃发辫子、清式官帽或现代元素。
> 2. **无乱码文字铁律**：画面中的旌旗、木牌、匾额仅保留纯色纹样或留白肌理，**严禁生成可读汉字或 AI 伪汉字乱码**。
> 3. **严禁脚本伪造**：必须逐张调用 `generate_image` 生成高清母版（建议先归档未压缩 PNG 至 `assets_raw_masters/quests/`，再转为高品质 `.jpg` 放入 `public/assets/quests/`），严禁使用 PIL/Canvas/SVG 拼贴伪造。

---

### 1. `CG-QST-001`：东京开封府 · 市曹刑场处斩图

- **关联文件**：[`src/data/quests/sects/kaifengTaihangBanditQuest.ts`](../src/data/quests/sects/kaifengTaihangBanditQuest.ts)
- **目标路径**：`public/assets/quests/kaifeng_execution.jpg`
- **画框题跋**：`东京市曹刑场 · 太行悍匪雷震山明正典刑`
- **剧情语境**：
  - 主角在华北官道击败并生擒太行山二流上品悍匪头目【雷震山】，押交开封府展昭与包拯会审定罪。
  - 五日期满午时三刻，于东京城南繁华十字街口市曹刑场公开处斩。
- **画面核心要素**：
  1. **环境氛围**：北宋东京汴梁城南十字街口市曹刑场，阴云微透天光，远处可见宋式歇山顶城楼飞檐、垂柳与酒旗。
  2. **主体人物**：高筑的木制刑台之上，体格魁梧的悍匪（雷震山）赤膊反绑双臂跪于木墩前；身旁一名蒙面赤膊或短打皂衣的魁梧刽子手双手高举九环厚背鬼头大刀，蓄势待劈。
  3. **前景与中景**：刑台后方设监斩官案与大鼓架，台下宋代铁甲禁军与皂衣捕快持长戟朴刀列阵警戒，绳栏外百姓簇拥围观。
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color painting illustration, wide cinematic 16:9 composition. A solemn Northern Song public execution ground (市曹刑场) at a grand crossroads in Kaifeng capital around 1050 AD under overcast amber-grey clouds. On a raised timber platform, a burly mountain bandit prisoner with hands bound behind his back kneels before a wooden block, while a muscular masked executioner raises a heavy broadsword (鬼头刀) high in the air ready to strike. Behind the platform stands a crimson-draped official supervision desk and war drums; around the platform, Northern Song imperial guards in iron lamellar armor holding halberds keep back a crowd of townsfolk. Song-style tiled roofs, city gate towers, and willow trees in subtle mist. Authentic Song court painting brushwork, rich mineral pigments, dramatic tension, no modern elements, blank banners with no text or characters.
  ```

---

### 2. `CG-QST-002`：太行山寨校场 · 主角粗布囚衣待斩图

- **关联文件**：[`src/data/quests/sects/kaifengTaihangBanditQuest.ts`](../src/data/quests/sects/kaifengTaihangBanditQuest.ts)
- **目标路径**：`public/assets/quests/taihang_beheading.jpg`
- **画框题跋**：`太行山寨校场 · 身着粗布囚衣押跪待斩`
- **剧情语境**：
  - 雷震山被斩三十日后，再行华北官道，遭遇太行天王【王重岳】与九纹狂龙【史万山】1v2 联手围堵。
  - 若主角未能撑满 5 个回合战败，将被剥去六扇门官袍与兵刃，换上一身灰褐粗布衣，押回太行山绿林总寨聚义厅外校场斩首祭旗（触发 Game Over 前的专属终局演出）。
- **画面核心要素**：
  1. **环境氛围**：险峻峥嵘的太行山绝壁环抱之中，木石筑成的绿林总寨聚义厅外大校场，黄昏残阳如血，四周松脂火把熊熊燃烧，黑红战旗猎猎翻飞。
  2. **主体人物（核心视觉要求）**：年轻的北宋武侠主角**身穿破旧灰褐粗布衣（布衣）**，发髻微乱、衣衫带伤，双手被粗麻绳死死反绑于背后，被两名凶悍山匪一左一右死死按住双肩强押跪在冰冷青石坪上；身侧一名壮硕山寨刽子手正高举鬼头大刀准备斩首。
  3. **背景压迫感**：高处石阶虎皮交椅前，紫髯披甲的总瓢把子（王重岳）与赤膊刺青提铜棍的副总瓢把子（史万山）冷眼俯视，四周山匪持刀环伺。
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color painting illustration, wide cinematic 16:9 composition. Dusk inside a rugged mountain bandit stronghold courtyard (太行山寨校场) surrounded by towering misty Taihang cliffs and pine trees, lit by dozens of blazing pine torches. In the center foreground, a young Chinese martial artist protagonist dressed only in plain tattered grey-brown coarse cloth robes (粗布布衣), hands tightly bound behind his back with thick hemp rope, is forced to kneel on rough stone slabs as two burly bandits press down on his shoulders. Beside him, a fierce bandit executioner raises a heavy鬼头刀 broadsword about to behead him. On the raised stone terrace behind, two imposing bandit chieftains (one bearded in dark armor, one muscular with dragon tattoos holding a bronze staff) watch coldly before tiger-skin chairs. Authentic 1050 AD Northern Song wuxia painting style, mineral pigments, dramatic torchlight and crimson dusk, no modern elements, blank banners with no text or characters.
  ```

---

### 3. `CG-QST-003`：城隍破庙残夜 · 篝火瓦罐分焦饼图

- **关联文件**：[`src/data/quests/sects/gaibangEntryQuest.ts`](../src/data/quests/sects/gaibangEntryQuest.ts)
- **目标路径**：`public/assets/quests/gaibang_temple_fire.jpg`
- **画框题跋**：`城隍破庙残夜 · 半块焦饼百家羹`
- **剧情语境**：
  - 主角囊中羞涩（银两不超过 3 两）流落中原街头，还将半块粗麦锅盔分给逃荒小女孩小草。
  - 入夜寒风骤起，五袋老乞【鲁三瓢】引主角至城西荒废城隍破庙避风；庙中十余名老弱乞儿与流民围坐一团篝火，缺耳黑陶瓦罐炖着滚烫的百家杂菜热汤，鲁三瓢掰开粗麦焦饼递予主角，道出“不欺暗室、不弃同道”的化子本分。
- **画面核心要素**：
  1. **环境氛围**：北宋城郊荒废残破的城隍古庙大殿一角，殿顶残瓦漏下清冷寒月微光，斑驳泥塑神像隐于暗影，门外寒风卷起枯叶。
  2. **主体人物**：中央噼啪作响的枯枝篝火旁，身穿百衲补丁衣、腰悬五只粗麻布袋的慈眉老丐（鲁三瓢）含笑将掰开的半块金黄焦香锅盔递向身穿洗白布衣的年轻少侠；旁侧小女孩（小草）捧着粗陶碗依偎在瞎眼老妪身边喝热汤。
  3. **前景与质感**：篝火上架着一口缺耳黑陶瓦罐，白气蒸腾；地上铺着干爽稻草与芦竹竿，暖橘色火光与殿外幽蓝夜色形成极具人间烟火气的冷暖对比。
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color painting illustration, wide cinematic 16:9 composition. Inside a weathered abandoned City God temple at night around 1050 AD, cold moonlight filtering through broken roof tiles while dry autumn leaves swirl outside the open wooden doors. Around a warm crackling campfire in the center, a cheerful elderly beggar martial artist in patched hemp robes with five small cloth pouches tied to his belt breaks a toasted flatbread in half and offers it to a young wandering martial artist in plain worn cloth robes. Over the fire, a chipped black clay pot bubbles with steaming vegetable soup; nearby on dry straw sit several humble refugees, including a little girl holding a clay bowl beside a blind grandmother, and a bamboo staff leaning against a pillar. Warm orange firelight contrasting against cool indigo night shadows, authentic Song court painting brushwork, rich mineral pigments, heartfelt wuxia humanity, no modern elements, blank plaques with no text or characters.
  ```

---

### 4. `CG-QST-004`：米行账房烛影 · 五百雪花官银拒贪图

- **关联文件**：[`src/data/quests/sects/gaibangEntryQuest.ts`](../src/data/quests/sects/gaibangEntryQuest.ts)
- **目标路径**：`public/assets/quests/gaibang_granary_silver.jpg`
- **画框题跋**：`米行账房烛影 · 五百雪花官银一文不取`
- **剧情语境**：
  - 主角与丐帮六袋香主【吴岳彻】、老丐【鲁三瓢】夜袭囤粮掺沙的富泰米行后院，击败看院护院，为百余名流民夺回掺糠陈粟救命粮。
  - 众人搬粮之际，主角独入账房搜寻逼死佃户的阎王印子钱死契，却见樟木大箱敞开，满箱雪白耀眼的五百两官铸纹银唾手可得；门缝外鲁三瓢正暗中窥视考较本心，主角凛然合上银箱、只取一叠罪证死契付之一炬。
- **画面核心要素**：
  1. **环境氛围**：北宋富商米行深宅账房内景，雕花木格窗外透出搬运麻袋的火把微光，室内檀木算盘、账册与铜烛台摇曳出深邃光影。
  2. **主体人物**：身着朴素布衣的年轻主角立于大敞的包铜樟木银箱前，箱内整齐码放着泛着清冷银光的北宋雪花官银铤；主角神色坦荡坚毅，一手决然按下箱盖将其合拢，另一手只抽出一束卷宗契纸凑近烛火引燃。
  3. **叙事暗笔**：后方半掩的雕花木门缝隙间，隐约可见老丐苍老却欣慰的目光静静注视。
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color painting illustration, wide cinematic 16:9 composition. Nighttime inside a wealthy Northern Song grain merchant's wooden accounting room (账房) around 1050 AD, lit by a flickering brass candlestick on a dark rosewood desk with an abacus and scroll ledgers. On the floor sits an open iron-bound camphorwood chest filled with gleaming silver ingots (宋代雪花银铤). A young upright martial artist in humble plain cloth robes stands beside the chest, resolutely pushing the heavy lid shut without touching a single piece of silver, while holding a bundle of debt-deed papers over the candle flame to burn them. Through a narrow gap in the half-open lattice door in the background, the silhouette of an old beggar elder watches quietly in approval. Authentic Song dynasty court painting style, dramatic chiaroscuro candlelight and cool moonlight, mineral pigments, no modern elements, no readable text or characters on scrolls or papers.
  ```

---

### 5. `CG-QST-005`：洛阳城郊杏子林 · 乔峰拍封酹酒立誓图

- **关联文件**：[`src/data/quests/sects/gaibangEntryQuest.ts`](../src/data/quests/sects/gaibangEntryQuest.ts)
- **目标路径**：`public/assets/quests/gaibang_apricot_oath.jpg`
- **画框题跋**：`洛阳城郊杏子林 · 拍封舀酒共立三规`
- **剧情语境**：
  - 主角持青竹片赴洛阳城郊杏子林总舵，先后得副帮主马大元、传功长老宋奚长、太上老帮主汪剑通与徐冲霄点头许准，最终步入聚义大坛。
  - 年方二十余岁、浓眉虎目、豪气干云的丐帮少帮主【乔峰】立于漫天红叶老杏树下，一掌拍碎大泥封酒坛，舀起两粗碗烈酒递与主角，当着百余名席地而坐的各袋丐帮弟子立下“不负家国苍生、不欺弱小孤寡、不卖同门手足”铁血三规，仰首共饮。
- **画面核心要素**：
  1. **环境氛围**：洛阳城郊连绵数里的苍劲老杏子林总舵大坛，秋阳澄澈如金，漫天金黄与绯红杏叶随风飘落，古朴聚义木坛与打狗绿竹阵旗环列。
  2. **主体人物**：画面中央，身材魁伟、浓眉大眼、身穿灰色粗布敞襟短褐的青年豪侠帮主（乔峰）单手托起粗陶大酒碗豪迈仰饮，脚边一只黑陶大酒坛泥封四溅、酒香四溢；对面年轻主角双手举碗慨然对饮。
  3. **群像烘托**：四周林间空地上，白须威严的执法长老（白世镜）、拄竹杖的耄耋前辈与数十名衣衫褴褛却神采飞扬的丐帮各袋弟子举碗呼应，豪气直冲云霄。
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color painting illustration, wide cinematic 16:9 composition. Golden autumn afternoon in the legendary Apricot Forest (洛阳杏子林) outside Luoyang around 1050 AD, ancient gnarled apricot trees shedding vibrant amber and crimson leaves in the wind. In the center clearing before a rustic timber gathering altar, a heroic, broad-shouldered young Beggar Sect chief (Qiao Feng, bold eyebrows, fierce righteous eyes, grey coarse open-collar martial tunic) raises a large rough clay bowl of liquor high toastingly beside a freshly unsealed clay wine jar, facing a young martial artist protagonist who raises a matching clay bowl in solemn oath. Surrounding them in a wide semicircle beneath the apricot trees, dozens of Beggar Sect elders and patched-robe disciples holding green bamboo staffs cheer and raise bowls in brotherhood. Authentic Song dynasty court painting brushwork, rich mineral pigments, sweeping heroic wuxia atmosphere, no modern elements, blank banners with no text or characters.
  ```

---

### 6. `CG-QST-006`：杏林斜阳授袋 · 一袋挂腰百衲衣图

- **关联文件**：[`src/data/quests/sects/gaibangEntryQuest.ts`](../src/data/quests/sects/gaibangEntryQuest.ts)
- **目标路径**：`public/assets/quests/gaibang_bamboo_pouch.jpg`
- **画框题跋**：`杏林斜阳授袋 · 青竹芦竿踏歌行`
- **剧情语境**：
  - 饮罢入门盟誓酒，执法长老【白世镜】高诵帮律入册，帮主【乔峰】亲自取过一只粗麻布缝制的一袋青麻袋系于主角腰间，授下【破旧百衲乞丐衣】、【山民蒲草鞋】与【叫花驱犬芦竹竿】。
  - 夕阳将杏子林染成万顷赤金，主角身披百衲衣、手执青绿芦竹竿，在乔峰与鲁三瓢、吴岳彻等众兄弟送别目光中阔步迈向九州四海。
- **画面核心要素**：
  1. **环境氛围**：黄昏落日熔金的杏子林山道出口，远方可见北宋洛阳城雄伟城郭轮廓与洛水波光，暮鸦归林，落叶铺满青石古道。
  2. **主体人物**：前景中央，年轻主角已换上一身干净整洁的百衲补丁衣、脚踏蒲草鞋，腰间醒目地垂挂着**一只粗麻布袋（一袋弟子信物）**，右手握持一根青翠坚韧的芦竹竿，回首向林中抱拳作别，眼神清亮昂扬。
  3. **中景呼应**：林口古杏树下，魁伟豪迈的乔峰负手含笑颔首，旁侧老丐鲁三瓢挥手送行，尽显“身无分文入杏林，胸怀万壑济苍生”的武侠浪漫。
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color painting illustration, wide cinematic 16:9 composition. Sunset at the stone path exit of the Apricot Forest overlooking distant Northern Song Luoyang city walls and glowing river waters around 1050 AD, bathed in warm golden-crimson twilight. In the foreground, a spirited young martial artist now wearing a neat hundred-patch beggar robe (百衲衣), woven straw sandals, and a single coarse hemp pouch (一袋) tied proudly at the waist, holding a green bamboo staff, turns slightly to clasp hands in farewell with a bright determined gaze. Beneath the golden apricot trees behind him, the tall heroic young Beggar Sect chief Qiao Feng and an elderly smiling five-pouch beggar wave farewell. Falling autumn leaves, poetic Song court painting aesthetics, mineral pigments, uplifting chivalric journey mood, no modern elements, no text or characters.
  ```

---

### 7. `CG-QST-007`：长安秋雨茶棚 · 残枰拾子结松缘图

- **关联文件**：[`src/data/quests/sects/huashanEntryQuest.ts`](../src/data/quests/sects/huashanEntryQuest.ts)
- **目标路径**：`public/assets/quests/huashan_changan_rain_go.jpg`
- **画框题跋**：`长安秋雨茶棚 · 残枰拾子结松缘`
- **剧情语境**：
  - 皇祐二年关中秋雨潇潇，尚未习武的白身主角途经京兆府（长安）明德门外简陋芦席茶棚。
  - 锦衣商贾与挎刀豪客争抢棚内干爽座位，将身穿洗白麻衣的华山隐逸前辈【云台棋叟】挤至滴水檐边；主角冒雨自泥泞车辙中拾起滚落的缺角乌云黑子，细细擦净双手奉还，一念赤诚结下西岳仙缘。
- **画面核心要素**：
  1. **环境氛围**：北宋长安城郊烟雨朦胧的古道芦席茶棚，远处可见雄浑苍古的长安城墙轮廓与萧瑟秋柳，细密雨丝斜织，地面泥辙积水微泛涟漪。
  2. **主体人物**：茶棚滴水竹檐边，须发半湿、身穿朴素灰麻道衣的清癯老道坐于矮凳上，膝前木案摆着一副斑驳柏木围棋残局；年轻布衣主角半身淋在雨幕中，微躬身双手捧着一枚擦拭干净的乌黑围棋子恭敬奉还，神情温厚诚挚。
  3. **对比烘托**：茶棚内侧模糊暖光下，几名披锦缎斗篷、挎钢刀的世俗江湖客背身饮茶喧哗，与檐外一老一少的清雅松风意境形成鲜明对比。
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color painting illustration, wide cinematic 16:9 composition. Misty autumn rain outside Changan city gate around 1050 AD, beside a humble roadside reed-thatched tea shed along a muddy ancient road with distant grand Song city walls in soft rain mist. At the dripping edge of the eaves sits a serene, thin elderly Taoist recluse in plain washed hemp robes before a weathered wooden Go board (围棋盘). Stepping into the slanting rain, a humble young traveler in plain cloth robes with no weapons bows respectfully and offers back a clean black Go stone rescued from a muddy wheel-rut. Inside the dry inner shed behind them, wealthy merchants in brocade cloaks and armed bladesmen drink tea obliviously. Poetic Song court landscape-and-figure brushwork, cool青绿 mist and warm tea-stove glow, mineral pigments, no modern elements, blank tea banners with no text or characters.
  ```

---

### 8. `CG-QST-008`：西岳苍龙岭 · 万丈云海凡躯独行图

- **关联文件**：[`src/data/quests/sects/huashanEntryQuest.ts`](../src/data/quests/sects/huashanEntryQuest.ts)
- **目标路径**：`public/assets/quests/huashan_canglong_ridge.jpg`
- **画框题跋**：`西岳苍龙岭 · 万丈云海凡躯独行`
- **剧情语境**：
  - 主角毫无内力与轻功护身，全凭一双凡人肉足与坚定心志徒步攀越华山千尺幢、百尺峡，踏上鬼见愁的第三险【苍龙岭】。
  - 刀刃般狭窄的苍黑花岗岩山脊悬亘于两峰之间，两侧万丈深渊云海翻涌、罡风呼啸，主角压低身形、紧扶石脊凿痕一步步向玉女峰攀行。
- **画面核心要素**：
  1. **环境氛围**：参考北宋范宽《溪山行旅图》与郭熙《早春图》的大山大水气魄，一条苍黑险峻、宽仅二尺的巨龙脊状花岗岩绝岭斜贯画面对角线，左右两侧皆是深不见底的翻腾白色云海与奇松峭壁。
  2. **主体人物**：绝岭中段，手无寸铁、背负简朴布囊的布衣年轻主角俯低重心，双手紧扣岩脊石窝与寒霜铁链，顶着猎猎狂风坚定向上攀爬；身后不远处，老挑山夫周伯正扶着石柱喘息仰望。
  3. **意境张力**：渺小却无比坚韧的凡人身影与宏伟奇险的太华山势形成强烈视觉震撼，尽显“未习轻功而以诚心叩仙山”的孤勇感。
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi and monumental landscape ink-and-color painting (in the spirit of Fan Kuan and Li Tang), wide cinematic 16:9 composition. The perilous Canglong Ridge (华山苍龙岭) of Mount Hua around 1050 AD: a razor-narrow dark granite dragon-back ridge cutting diagonally upward between sheer vertical cliffs, with fathomless churning seas of white clouds on both sides and gnarled cliff pines clinging to rock crevices. On the narrow stone steps along the ridge, an uninitiated young mortal traveler in wind-whipped plain cloth robes carrying a simple cloth bundle crouches low against fierce mountain gales, gripping frosted iron chains and carved rock holds step by step without martial arts or qinggong, while an old mountain porter rests behind him. Breathtaking scale, mineral azurite and malachite accents, dramatic mountain wind, no modern safety railings or modern gear, no text or characters.
  ```

---

### 9. `CG-QST-009`：华山绝顶博台 · 孤松云海弈残局图

- **关联文件**：[`src/data/quests/sects/huashanEntryQuest.ts`](../src/data/quests/sects/huashanEntryQuest.ts)
- **目标路径**：`public/assets/quests/huashan_botai_chess.jpg`
- **画框题跋**：`华山绝顶博台 · 孤松云海弈残局`
- **剧情语境**：
  - 主角登临华山绝顶【博台孤峰弈棋亭】（陈抟老祖昔年弈赢华山胜迹），接受华山掌门太岳真君【岳沧溟】与潼关剑神【秦烈山】的非战斗第一关考校——推演《希夷三劫》连环三手残局。
  - 主角不贪边角小利、不逞穷寇杀心，以“弃子争先、倒脱靴、藏锋赢半目”三手棋理令秦烈山与岳沧溟双双动容。
- **画面核心要素**：
  1. **环境氛围**：四面绝壁孤耸入云的华山博台石峰之巅，一座古朴宋式六角汉白玉石亭临渊而筑，亭畔一株苍劲千年古松探出悬崖，脚下万顷云海与远方层峦尽收眼底。
  2. **主体人物**：石亭中央古石枰前，年轻布衣主角凝神静气，指尖拈着一枚乌黑棋子正欲落下收官妙手；对面身穿紫霞道袍、面如冠玉的三缕长髯掌门（岳沧溟）抚须含笑注视棋局，亭侧背负古剑、浓眉虬髯的紫膛脸长老（秦烈山）俯身瞪目惊叹。
  3. **道门清气**：仙鹤掠过远处云涛，松针微落石案，充满北宋高士问道论棋的清逸禅道之美。
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color painting illustration, wide cinematic 16:9 composition. Atop the isolated cliff-peak Chess Pavilion (华山博台弈棋亭) surrounded by boundless rolling cloud seas and jagged peaks of Mount Hua around 1050 AD, with an ancient twisted pine tree extending over the abyss and white cranes gliding afar. Inside the open stone pavilion at a carved stone Go table, a calm young traveler in humble mud-hemmed cloth robes holds a black Go stone poised over an intricate endgame. Across the board sits the dignified Huashan Taoist sect master in deep violet-indigo Taoist robes with three long strands of beard watching with serene approval, while beside them a fierce, broad-browed elder swordsman with a greatsword on his back leans in astonished admiration at the move. Crisp Song court painting linework, mineral青绿 pigments, transcendent Taoist atmosphere, no modern elements, blank stone pillars with no text or characters.
  ```

---

### 10. `CG-QST-010`：玉女峰紫霞殿 · 东峰紫气授青锋图

- **关联文件**：[`src/data/quests/sects/huashanEntryQuest.ts`](../src/data/quests/sects/huashanEntryQuest.ts)
- **目标路径**：`public/assets/quests/huashan_zixia_dawn_sword.jpg`
- **画框题跋**：`玉女峰紫霞殿 · 东峰紫气授青锋`
- **剧情语境**：
  - 主角于思过崖蒙目辨出松风真剑意，又在子夜寒崖凭凡人智计借洞口落石回音与顺风铜云板惊退西夏一品堂潜入细作。
  - 破晓卯时，玉女峰紫霞正气主殿外东峰朝阳跃出云海，万道紫气东来；掌门【岳沧溟】与【宁清羽】在殿前亲授【青灰道袍】、【道士云头布履】与【华山入门青钢剑】，正式收录主角入华山门墙。
- **画面核心要素**：
  1. **环境氛围**：破晓时分的华山玉女峰紫霞道观殿前白玉石坪，东方日出将浩瀚云海染成瑰丽的紫金与朝霞之色（“紫气东来”），宋代道观歇山飞檐、铜鹤香炉青烟袅袅。
  2. **主体人物**：画面中央，已换上一袭整洁【青灰道袍】与云头布履的年轻主角单膝或躬身肃立，双手郑重接过掌门岳沧溟递来的一柄寒光清湛的【青钢长剑】；岳沧溟身侧，白衣胜雪、佩剑清雅的玉女剑仙（宁清羽）温婉颔首，后方秦烈山与首徒高沧云等华山同门抱剑观礼。
  3. **色彩意境**：清冷青绿山石与破晓漫天紫金霞光交相辉映，庄严澄澈，定格“白身凡人终入西岳剑门”的高光时刻。
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color painting illustration, wide cinematic 16:9 composition. Breathtaking dawn at the white stone terrace of Zixia Taoist Temple (玉女峰紫霞道观) high on Mount Hua around 1050 AD, as the rising sun dyes the vast sea of clouds in luminous violet and golden morning glow (紫气东来). Before the grand Song-style wooden temple hall with bronze crane incense burners, the noble bearded Taoist sect master in purple-trimmed robes solemnly presents a gleaming green-steel straight sword (青钢剑) in its scabbard to a kneeling young disciple newly dressed in neat grey-blue Taoist robes and cloud-toe cloth shoes. Standing gracefully beside the master is a refined female sword immortal in white-and-cyan Taoist attire (Ning Qingyu), while senior Huashan disciples holding swords witness respectfully along the pine-lined terrace. Authentic Song court painting brushwork, rich mineral pigments, sacred chivalric ceremony, no modern elements, blank plaques with no text or characters.
  ```

---

### 11. `CG-QST-011`：宣德微服 · 相国寺万姓灯市图

- **关联文件**：[`src/data/quests/sects/kaifengRenzongEscortQuest.ts`](../src/data/quests/sects/kaifengRenzongEscortQuest.ts)
- **目标路径**：`public/assets/quests/renzong_weifu_market.jpg`
- **画框题跋**：`宣德微服 · 相国寺万姓灯市`
- **剧情语境**：
  - 开封府御前护卫（Lv.4）陪微服易服的三十九岁大宋天子赵祯（化名“赵官人”）于皇祐二年春暮步出大内、穿行东京大相国寺万姓交易市井。
  - 主仆驻足老禁军伤卒羊汤锅、毕昇泥活字《唐诗百篇》书摊前体察民情之际，钟楼檐角暗影中已悄然潜伏一名手持青铜铁鹰符的党项西夏斥候，山雨欲来风满楼。
- **画面核心要素**：
  1. **环境氛围**：借鉴北宋张择端《清明上河图》汴京市井木构营造与李唐青绿山石设色，灯火辉煌的相国寺木棚夜市、蒸腾热气的羊汤铜釜、摆满线装活字印本的书摊与高耸铜鼎香炉错落排布。
  2. **主体人物**：前景中景处，身着天青圆领襕衫、温润如儒生的宋仁宗赵祯负手缓行，身畔寸步不离的是身穿玄青护卫公服、按刀警觉四顾的主角（御前护卫）。
  3. **暗伏杀机**：右上角暮色钟楼飞檐暗影之中，一名党项西夏斥候半隐身形，指间捏着青铜铁鹰密符冷眼俯瞰下方行踪。
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Northern Song Dynasty (1050 AD) 16:9 cinematic narrative illustration in fine gongbi blue-green and mineral-gold ink-and-color painting on aged silk scroll. Twilight dusk falls over Daxiangguo Temple market in Bianliang (Kaifeng). Lanterns glow warmly along timber market stalls steaming with mutton soup cauldrons, movable-type printed bookstalls, and a tall bronze incense tripod. In the center foreground, thirty-nine-year-old Emperor Song Renzong Zhao Zhen disguised as a gentle scholar in an indigo-blue round-collar scholar robe strolls serenely, accompanied closely by his vigilant Kaifeng Royal Bodyguard protagonist in dark navy leather-reinforced patrol coat with an iron-hilted waist dao. High on a bell-tower roof corner in the upper right shadows lurks a Tangut Western Xia scout holding a small bronze iron-hawk tally, watching them quietly. Authentic Song dynasty robes, wooden brackets (dougong), blank wooden shop banners with zero text or watermarks.
  ```

---

### 12. `CG-QST-012`：资圣宝塔 · 飞檐断铃惊变图

- **关联文件**：[`src/data/quests/sects/kaifengRenzongEscortQuest.ts`](../src/data/quests/sects/kaifengRenzongEscortQuest.ts)
- **目标路径**：`public/assets/quests/renzong_pagoda_ambush.jpg`
- **画框题跋**：`资圣宝塔 · 飞檐断铃惊变`
- **剧情语境**：
  - 赵祯登临大相国寺资圣八角琉璃宝塔高廊凭栏远眺汴梁夜色，暮风忽止、角檐铁马风铃应弦而断。
  - 首轮 1v2 生死战爆发：西夏一品堂死士【拓跋枭】与【野利寒鸦】自琉璃瓦飞檐凌空扑下，弯刀淬毒银针直取赵祯，主角拔刀格针护驾，在塔廊击溃首波死士。
- **画面核心要素**：
  1. **环境氛围**：青黛新月微雾笼罩的八角琉璃宝塔高廊，一只青铜角檐风铃正悬在被利刃割断的麻绳残端晃荡。
  2. **主体人物**：画面中央，御前护卫主角箭步抢前，长刀出鞘劈出金石火星磕飞漫天毒针，死死将布衣书生装束的赵祯护在宋式雕花石栏杆后方；两名缠党项毡巾、披黑斗篷的西夏一品堂刺客分持弯刀与暗器自檐瓦扑落。
  3. **动作张力**：冷月青雾与淬火刀锋迸溅的泥金火花形成强烈冷暖对撞，尽显高空窄廊贴身护主之险绝。
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Northern Song Dynasty (1050 AD) 16:9 cinematic wuxia illustration in Song mineral gongbi painting style on silk. High gallery overlooking the octagonal glazed Zisheng Pagoda of Daxiangguo Temple under a misty crescent moon and teal-indigo night sky. A bronze corner wind-bell swings loose on a freshly severed hemp cord. Two black-cloaked Western Xia Yipintang assassins wearing Tangut felt turbans leap down from the upturned glazed tiles wielding gleaming curved scimitars and flying needles. At center, the Kaifeng Royal Guard protagonist steps decisively forward, drawing a long tempered Song steel blade that strikes bright sparks deflecting darts, shielding plain-robed Emperor Renzong behind a carved stone balustrade. Dramatic moonlight, mineral gold sparks, zero modern text.
  ```

---

### 13. `CG-QST-013`：樊楼飞桥 · 珠帘破屏杀机图

- **关联文件**：[`src/data/quests/sects/kaifengRenzongEscortQuest.ts`](../src/data/quests/sects/kaifengRenzongEscortQuest.ts)
- **目标路径**：`public/assets/quests/renzong_fanlou_assassins.jpg`
- **画框题跋**：`樊楼飞桥 · 珠帘破屏杀机`
- **剧情语境**：
  - 主仆退入京师第一名楼“白矾楼（樊楼）”高阁暂避风头并暗查西夏细作暗桩，席间由羊脂玉扳指与刀油腥气识破杀机。
  - 第二轮 1v2 生死战爆发：两名腰束绛红丝带的西夏一品堂红牌死士撞碎青竹珠帘、劈裂松鹤墨绘大屏风破壁突袭，主角翻身截刃护定天子，随后燃亮碧色号角灯火召援禁卫。
- **画面核心要素**：
  1. **环境氛围**：雕梁画栋的北宋汴梁樊楼三层雅阁之内，窗外隐约可见灯火连绵的飞桥虹廊；堂中一扇大型松鹤水墨折屏被刀气劈成两半，案上青瓷酒壶翻倒倾洒。
  2. **主体人物**：两名系红带、持血铁双匕与弯刀的一品堂红牌死士震断竹珠帘飞身杀入；主角扭身抢步挥剑硬撼双刃，一侧朱漆柱旁的素衣赵祯沉稳扶住青铜高烛台保持镇定。
  3. **宋画设色**：大面积暖红烛火、朱柱与碎裂木屑飞溅其间，兼具工笔细腻器具考据与武侠破局爆裂感。
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Northern Song Dynasty (1050 AD) 16:9 cinematic action illustration in rich red-gold and ink gongbi style. Inside the upper private gallery of Bianliang's three-story Fanlou tavern overlooking lantern-lit flying bridges outside the lattice windows. A large pine-and-ink folding screen shatters cleanly in half alongside an overturned celadon wine ewer. Two fierce Western Xia Yipintang Red-Plaque assassins in crimson waist sashes burst through snapped bamboo-pearl curtains lunging with twin blood-iron daggers and bent sabers. The Kaifeng Royal Guard protagonist twists forward to intercept both blades with a fierce sword slash while plain-robed Emperor Renzong steadies a bronze candelabrum near a vermilion timber pillar. Lantern light, shattered wood splinters, zero text.
  ```

---

### 14. `CG-QST-014`：虹桥夜雨 · 孤身血战双狼图

- **关联文件**：[`src/data/quests/sects/kaifengRenzongEscortQuest.ts`](../src/data/quests/sects/kaifengRenzongEscortQuest.ts)
- **目标路径**：`public/assets/quests/renzong_hongqiao_blood.jpg`
- **画框题跋**：`虹桥夜雨 · 孤身血战双狼`
- **剧情语境**：
  - 子夜骤雨倾盆，汴水暴涨，赵祯一行归宫必经之【汴水虹桥】被西夏一品堂最后两名“银狼”重甲统领合围封锁。
  - 第三轮 1v2 终局血战：主角左臂绑以御前撕下的白绸裹伤，孤身横刀立于湿滑虹桥拱顶，凭死志连续挑落重装银狼双煞；桥头酒肆挑檐下赵祯泰然独立，望向远方迷雾中驰援而来的三衙禁军火把长龙。
- **画面核心要素**：
  1. **环境氛围**：致敬《清明上河图》汴水木拱虹桥，墨云翻滚与斜风骤雨抽打着拱形木桥板，桥畔临水酒肆红灯笼与破损无字酒旗在狂风中猎猎翻卷。
  2. **主体人物**：湿透的桥面中央，衣衫濡湿、左袖缠绕染血白绸的主角以一敌二力抗两名身形魁梧、挥舞重型马弯刀与铁钉战护手的银狼统领，刀戟交击迸出耀眼金芒；酒肆屋檐下，赵祯神色沉凝远眺渐近的禁军火炬长龙。
  3. **情绪顶点**：水墨暴雨的压抑冷灰与拼死护驾的孤勇锋芒把整场汴京长夜之战推向高潮。
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Northern Song Dynasty (1050 AD) 16:9 dramatic storm combat illustration in ink-wash and heavy mineral gongbi style, inspired by Qingming Shanghe Tu's wooden Rainbow Bridge over the surging Bian River. Driving torrential midnight rain lashes the arched timber Hongqiao bridge beside a waterside tavern whose red lantern and torn blank wine pennant whip in the gale. On the slick wet timber planks at the crest of the bridge, the solitary Kaifeng Royal Guard protagonist—left sleeve bound in torn white imperial silk, clothes rain-soaked—fights 1v2 against two towering Western Xia Yipintang Silver-Wolf commanders wielding heavy curved cavalry sabers and studded war gauntlets, steel clashing in brilliant golden sparks against dark slate rain. Beneath the tavern eaves nearby stands Emperor Renzong calmly holding his ground, looking toward distant flickering Imperial Guard torches approaching through the mist. No text.
  ```

---

### 15. `CG-QST-015`：紫宸晓日 · 御马秘卷双恩图

- **关联文件**：[`src/data/quests/sects/kaifengRenzongEscortQuest.ts`](../src/data/quests/sects/kaifengRenzongEscortQuest.ts)
- **目标路径**：`public/assets/quests/renzong_zichen_decree.jpg`
- **画框题跋**：`紫宸晓日 · 御马秘卷双恩`
- **剧情语境**：
  - 血战一夜护驾还朝，晨曦破晓时分，主角随驾入大内正殿【紫宸殿】叙功受赏。
  - 御前双途抉择之高光定格：宋仁宗赵祯手捧明黄敕旨，赐予主角“改授大宋禁军（`SECT-33`）Lv.3 四厢都指挥＋玉津园御赐龙骧骢＋千两白银”，抑或“留任六扇门/开封府（`SECT-17`）＋御赐《葵花残卷》秘匣＋千两白银”两条前程。
- **画面核心要素**：
  1. **环境氛围**：宋代朝殿崇阁气象——清晨金曦穿透朱漆盘龙巨柱倾泻在汉白玉丹墀石阶之上，殿前金屏高矗，包拯、曹皇后、王德用等宋室重臣身着紫绯朝服分列左右（皆按宋制长翅幞头，绝无清式官帽）。
  2. **主体构图（双恩对称呈现）**：丹墀之上，戴平翅展脚黑幞头、着柘黄龙袍的赵祯手持明黄圣旨俯首嘉勉单膝跪领御恩的主角；左右两侧对称陈设两大御赏——左侧为披挂赤绸金镫、骏朗神俊的玉津园五花御马【龙骧骢】，右侧为一具半启的明黄织锦漆木秘匣，匣内红边古武学秘卷泛出幽微晨光。
  3. **礼仪定格**：皇祐朝堂金碧重彩工笔，完成从市井侠警到国家栋梁的双分支宿命升华。
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Northern Song Dynasty (1050 AD) 16:9 majestic court illustration in imperial Song gold-and-vermilion gongbi painting style. Golden dawn sunlight streams cleanly into Zichen Hall between towering vermilion dragon-carved pillars onto carved white marble steps. Seated before the golden screen in dragon-yellow ceremonial Song robes and flat-winged black futou cap, Emperor Song Renzong holds an unfurled imperial yellow silk decree, looking down warmly at the Kaifeng Royal Guard protagonist kneeling respectfully on one knee at the base of the steps. Framing the composition symmetrically: on the left side stands the royal Yujinyuan dapple-white warhorse "Longxiangcong" fitted with crimson silk tassels and gilded stirrups; on the right side sits an imperial yellow-brocade lacquered casket slightly ajar revealing an ancient red-edged martial manual scroll glowing gently in the sunbeams. Regal Song court Officials Bao Zheng, Empress Cao, and Wang Deyong stand in formal purple and scarlet robes flanking the hall. Zero garbled text.
  ```

---

## 三、 后续补绘验收清单

每次补绘完成后，请按以下三步核验并将上方表格状态改为 `[x]`：
1. 检查原画比例是否为 `16:9`，画面内无 AI 伪汉字乱码、无现代器物或清代剃发服饰；
2. 将高清原图归档至 `assets_raw_masters/quests/`，并将压缩后的 `.jpg`（建议分辨率 `1600×900` 或 `1280×720`，质量 `85`）写入 `public/assets/quests/` 对应文件名；
3. 启动游戏或通过剧情舞台预览对应幕次，确认宋风卷轴画框正常加载显示、不再回退至「绘卷留白」占位提示。
