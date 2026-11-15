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
| `CG-QST-011` | `[ ]` 待补绘 | `public/assets/quests/nanshaolin_tripod_training.jpg` | `/assets/quests/nanshaolin_tripod_training.jpg` | `QST-SECT-04-ENTRY`<br>《刺桐风起 · 铁桥问禅》 | 第八幕 · 寒泉浸铁腕，四平扎马桩<br>（`SCENE_NSL_08_COLD_SPRING_CG`） | `16:9` |
| `CG-QST-012` | `[ ]` 待补绘 | `public/assets/quests/nanshaolin_port_night_battle.jpg` | `/assets/quests/nanshaolin_port_night_battle.jpg` | `QST-SECT-04-ENTRY`<br>《刺桐风起 · 铁桥问禅》 | 第十四幕 · 刺桐夜雨急，铁桥碎倭刀<br>（`SCENE_NSL_14_SHATTER_KATANA_CG`） | `16:9` |
| `CG-QST-013` | `[ ]` 待补绘 | `public/assets/quests/nanshaolin_wooden_alley.jpg` | `/assets/quests/nanshaolin_wooden_alley.jpg` | `QST-SECT-04-ENTRY`<br>《刺桐风起 · 铁桥问禅》 | 第十八幕 · 百杰木人巷，硬桥闯山门<br>（`SCENE_NSL_18_BREAK_GATE_CG`） | `16:9` |
| `CG-QST-014` | `[ ]` 待补绘 | `public/assets/quests/zhenwu_cloud_tea.jpg` | `/assets/quests/zhenwu_cloud_tea.jpg` | `QST-SECT-08-ENTRY`<br>《汉水问津 · 太和问道》 | 第七幕 · 观云台上煮雪茶<br>（`SCENE_ZW_07_CLOUD_TERRACE`） | `16:9` |
| `CG-QST-015` | `[ ]` 待补绘 | `public/assets/quests/zhenwu_turtle_snake.jpg` | `/assets/quests/zhenwu_turtle_snake.jpg` | `QST-SECT-08-ENTRY`<br>《汉水问津 · 太和问道》 | 第十一幕 · 禹迹池畔观龟蛇<br>（`SCENE_ZW_11_TURTLE_SNAKE`） | `16:9` |
| `CG-QST-016` | `[ ]` 待补绘 | `public/assets/quests/zhenwu_golden_sword.jpg` | `/assets/quests/zhenwu_golden_sword.jpg` | `QST-SECT-08-ENTRY`<br>《汉水问津 · 太和问道》 | 第十九幕 · 太和殿前授松纹<br>（`SCENE_ZW_19_BESTOW_SWORD`） | `16:9` |
| `CG-QST-017` | `[ ]` 待补绘 | `public/assets/quests/renzong_weifu_market.jpg` | `/assets/quests/renzong_weifu_market.jpg` | `QST-SECT-17-RENZONG-ESCORT`<br>《微服汴梁 · 血护龙颜》 | 第五~八幕 · 宣德微服相国寺灯市<br>（`scene_rz_05_market_twilight` 等 4 幕） | `16:9` |
| `CG-QST-018` | `[ ]` 待补绘 | `public/assets/quests/renzong_pagoda_ambush.jpg` | `/assets/quests/renzong_pagoda_ambush.jpg` | `QST-SECT-17-RENZONG-ESCORT`<br>《微服汴梁 · 血护龙颜》 | 第十一~十四幕 · 资圣宝塔飞檐断铃<br>（`scene_rz_12_pagoda_ambush_duel` 等 4 幕） | `16:9` |
| `CG-QST-019` | `[ ]` 待补绘 | `public/assets/quests/renzong_fanlou_assassins.jpg` | `/assets/quests/renzong_fanlou_assassins.jpg` | `QST-SECT-17-RENZONG-ESCORT`<br>《微服汴梁 · 血护龙颜》 | 第十九~二十二幕 · 樊楼飞桥珠帘破屏<br>（`scene_rz_20_red_plaque_ambush` 等 4 幕） | `16:9` |
| `CG-QST-020` | `[ ]` 待补绘 | `public/assets/quests/renzong_hongqiao_blood.jpg` | `/assets/quests/renzong_hongqiao_blood.jpg` | `QST-SECT-17-RENZONG-ESCORT`<br>《微服汴梁 · 血护龙颜》 | 第二十七~三十幕 · 虹桥夜雨血战双狼<br>（`scene_rz_28_hongqiao_final_duel` 等 4 幕） | `16:9` |
| `CG-QST-021` | `[ ]` 待补绘 | `public/assets/quests/renzong_zichen_decree.jpg` | `/assets/quests/renzong_zichen_decree.jpg` | `QST-SECT-17-RENZONG-ESCORT`<br>《微服汴梁 · 血护龙颜》 | 第三十三~三十六幕 · 紫宸晓日御马秘卷<br>（`scene_rz_34_imperial_choice` 等 6 幕） | `16:9` |
| `CG-QST-022` | `[ ]` 待补绘 | `public/assets/quests/xingxiu_poison_furnace.jpg` | `/assets/quests/xingxiu_poison_furnace.jpg` | `QST-SECT-19-ENTRY`<br>《紫烟迷市 · 毒泉求生》 | 第八幕 · 丹炉紫雾冲脉生<br>（`scene_xx_08_furnace_breakthrough`） | `16:9` |
| `CG-QST-023` | `[ ]` 待补绘 | `public/assets/quests/xingxiu_ice_cave_bandage.jpg` | `/assets/quests/xingxiu_ice_cave_bandage.jpg` | `QST-SECT-19-ENTRY`<br>《紫烟迷市 · 毒泉求生》 | 第十五幕 · 寒窟渡毒共微光<br>（`scene_xx_15_ice_cave_vigil`） | `16:9` |
| `CG-QST-024` | `[ ]` 待补绘 | `public/assets/quests/xingxiu_ding_chunqiu_audience.jpg` | `/assets/quests/xingxiu_ding_chunqiu_audience.jpg` | `QST-SECT-19-ENTRY`<br>《紫烟迷市 · 毒泉求生》 | 第十九幕 · 丝竹漫天拜老仙<br>（`scene_xx_19_ding_chunqiu_audience`） | `16:9` |
| `CG-QST-025` | `[ ]` 待补绘 | `public/assets/quests/taishan_18pan_buckets.jpg` | `/assets/quests/taishan_18pan_buckets.jpg` | `QST-SECT-06-ENTRY`<br>《岱宗问数 · 松风破茧》 | 第六幕 · 云梯百丈肩泉血<br>（`scene_ts_06_blood_on_cloud_steps`） | `16:9` |
| `CG-QST-026` | `[ ]` 待补绘 | `public/assets/quests/taishan_pine_neigong.jpg` | `/assets/quests/taishan_pine_neigong.jpg` | `QST-SECT-06-ENTRY`<br>《岱宗问数 · 松风破茧》 | 第九幕 · 松风引气初破茧<br>（`scene_ts_09_pine_wind_awakening`） | `16:9` |
| `CG-QST-027` | `[ ]` 待补绘 | `public/assets/quests/taishan_yuhuang_sunrise.jpg` | `/assets/quests/taishan_yuhuang_sunrise.jpg` | `QST-SECT-06-ENTRY`<br>《岱宗问数 · 松风破茧》 | 第十九幕 · 沧海金轮授青锋<br>（`scene_ts_19_sunrise_investiture`） | `16:9` |
| `CG-QST-028` | `[ ]` 待补绘 | `public/assets/quests/emei_wanli_rain_umbrella.jpg` | `/assets/quests/emei_wanli_rain_umbrella.jpg` | `QST-SECT-07-ENTRY`<br>《锦水清音 · 金顶问心》 | 第二幕 · 锦江烟雨共油伞<br>（`scene_em_02_wanli_bridge_rain`） | `16:9` |
| `CG-QST-029` | `[ ]` 待补绘 | `public/assets/quests/emei_xixiang_moon_ape.jpg` | `/assets/quests/emei_xixiang_moon_ape.jpg` | `QST-SECT-07-ENTRY`<br>《锦水清音 · 金顶问心》 | 第十五幕 · 洗象澄月白猿影<br>（`scene_em_15_xixiang_moon_ape`） | `16:9` |
| `CG-QST-030` | `[ ]` 待补绘 | `public/assets/quests/emei_jinding_buddha_light.jpg` | `/assets/quests/emei_jinding_buddha_light.jpg` | `QST-SECT-07-ENTRY`<br>《锦水清音 · 金顶问心》 | 第十九幕 · 万仞云海睹佛光<br>（`scene_em_19_jinding_buddha_light`） | `16:9` |

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

### 11. `CG-QST-011`：九莲山千斤铁鼎炼体坪 · 寒泉挑水扎马图

- **关联文件**：[`src/data/quests/sects/nanshaolinEntryQuest.ts`](../src/data/quests/sects/nanshaolinEntryQuest.ts)
- **目标路径**：`public/assets/quests/nanshaolin_tripod_training.jpg`
- **画框题跋**：`九莲山千斤铁鼎坪 · 铁腕挑泉稳踏梅花桩`
- **剧情语境**：
  - 主角毫无内家根基初上莆田九莲山，铁罗汉堂主【元通】罚其与十五岁小沙弥【戒藏】于千斤铁鼎炼体坪苦修基本功。
  - 数十日寒暑锤炼，入夜山岚微雨之中，主角双腕扣着沉重熟铁环、双臂平伸挑起两只满溢寒泉的杉木大水桶，稳稳扎下南派“四平大马”立于湿滑青石梅花桩上；神炉赤红火光与寒泉白雾交映，面冷心热的元通禅师手持竹杖与一钵滚烫壮骨药汤静立桩下督训。
- **画面核心要素**：
  1. **环境氛围**：北宋闽中九莲山古刹炼体石坪，苍劲古榕盘根错节，后方矗立千斤青铜巨鼎与微透赤红炉火的铸铁神炉坊，一侧山涧寒泉池腾起丝丝白雾。
  2. **主体人物**：前景一排高低错落的青石梅花桩上，身穿湿透粗布短褐、双腕套着乌黑铁环的年轻主角咬牙平伸双臂，稳稳挑起两只水花微漾的大木桶，下盘四平大马稳如磐石；不远处小沙弥（戒藏）亦挑桶踏桩互相鼓劲。
  3. **师徒张力**：石桩旁，魁梧精悍、双臂古铜如生铁的老武僧（元通禅师）一手执青竹杖、一手托着冒热气的粗陶药钵，目光严厉中隐含赞许，尽显经典港式南拳电影苦练筑基的热血质感。
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color painting illustration, wide cinematic 16:9 composition inspired by classic Southern Shaolin martial arts cinema. Misty twilight at the Thousand-Jin Bronze Tripod training courtyard of Putian Southern Shaolin Temple in Fujian around 1050 AD, framed by ancient banyan trees, a massive bronze tripod cauldron, a glowing forge furnace in the background, and a steaming cold mountain spring pool. On wet stone plum-blossom poles (梅花桩) in the foreground, a determined young martial artist in sweat-soaked coarse cloth training attire, wearing heavy black iron rings on both forearms, holds a deep horse stance (四平大马) with arms extended horizontally supporting two brimming wooden water buckets without spilling. Beside the poles stands a stern, muscular senior Shaolin monk with bronze-like forearms, holding a bamboo cane in one hand and a steaming clay bowl of herbal medicine in the other, watching with quiet approval while a young 15-year-old novice monk trains nearby. Warm forge firelight contrasting with cool mountain mist, authentic Song court painting brushwork, mineral pigments, no modern elements, no text or characters.
  ```

---

### 12. `CG-QST-012`：泉州刺桐港雨夜 · 铁桥硬架碎倭刀图

- **关联文件**：[`src/data/quests/sects/nanshaolinEntryQuest.ts`](../src/data/quests/sects/nanshaolinEntryQuest.ts)
- **目标路径**：`public/assets/quests/nanshaolin_port_night_battle.jpg`
- **画框题跋**：`刺桐港狂潮夜雨 · 南拳铁桥力碎东洋刃`
- **剧情语境**：
  - 秋潮暴雨之夜，受北朝暗桩雇佣的东洋浪人头目【鬼丸甚内】率黑鲨水匪夜袭泉州刺桐港药栈，企图劫夺金创血竭与海道针经。
  - 危急时刻，主角双足钉死湿滑栈桥，以初成的南派铁桥双臂硬生生架住浪人头目劈落的长刀护住身后的小沙弥戒藏与老船工；电光石火间，南少林戒律首座【元觉】踏浪飞身赶到，右手探出《大力金刚指》精准夹住雪亮刀锋，将其寸寸震断！
- **画面核心要素**：
  1. **环境氛围**：公元 1050 年北宋泉州刺桐港番坊木栈桥，狂风暴雨倾盆而下，海浪拍击船坞激起千堆白雪，远处宋代福船桅杆与摇曳的油纸灯笼、火把映照雨幕。
  2. **主体交锋（双焦点高燃构图）**：湿滑木栈桥中央，年轻主角扎稳低沉马步、双臂交叉如铁桥奋力向上格架，护住身后跌坐的年轻沙弥与老船工；对面凶悍的东洋浪人武士双手高举修长弯刀下劈，而半空中披灰麻僧袍的威猛高僧（元觉首座）飞掠而至，两根泛着淡金劲力的铁指如钳子般生生夹断浪人长刀，断刃碎片与雨水四溅！
  3. **视觉张力**：雨丝、火光、浪花与崩碎的钢刃定格于一瞬间，兼具宋画工笔力道与港产功夫片雨夜码头决战的凌厉张力。
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color painting illustration, wide cinematic 16:9 action composition. Torrential rainstorm at night on the wooden harbour piers of Quanzhou Zaytun Port around 1050 AD, crashing ocean waves, moored Song dynasty sea junks, and blazing pine torches swaying in the gale. In the center of the rain-slicked pier, a young martial artist in coarse cloth robes plants a rock-solid Southern Fist horse stance, raising crossed iron-bridge forearms to block and protect a fallen young novice monk and an elderly boatman behind him. Facing them, a fierce rogue sea-raider swordsman slashes down with a long curved blade, while a powerful senior Southern Shaolin monk in grey robes leaps through the rain, clamping the steel blade between two bare fingers with supreme Vajra Finger force and shattering the sword into flying steel shards and water droplets. Dramatic chiaroscuro torchlight against stormy indigo sea and rain, authentic Song dynasty brushwork, rich mineral pigments, intense martial arts impact, no modern elements, blank lanterns with no text or characters.
  ```

---

### 13. `CG-QST-013`：南少林百杰木人巷 · 硬桥破阵出山门图

- **关联文件**：[`src/data/quests/sects/nanshaolinEntryQuest.ts`](../src/data/quests/sects/nanshaolinEntryQuest.ts)
- **目标路径**：`public/assets/quests/nanshaolin_wooden_alley.jpg`
- **画框题跋**：`九莲山百杰木人巷 · 铁线轰关见晨光`
- **剧情语境**：
  - 主角护港立功归山，奉方丈【元苦】法旨踏入【南少林百杰木人巷】接受入门终极考校。
  - 幽深石廊内机括轰鸣，十余尊包铜涂漆的少林机关木人出拳横棍重重夹击；主角双目如电，凝聚浑身劲力一记刚猛南拳轰开最后守关的镇门铜皮木人，尽头沉重石闸应声洞开，万丈闽海晨光与刺桐落花倾泻入巷，巷外元苦方丈与众高僧合十含笑相迎。
- **画面核心要素**：
  1. **环境氛围**：纵深透视极强的北宋古刹青石机关长廊（百杰木人巷），地面嵌有八卦方位石砖与暗槽齿轮，两侧密集排列着精巧古朴的宋代漆木包铜武僧机关人偶。
  2. **主体人物**：前景中轴线上，衣衫微破、汗水淋漓却神采奕奕的年轻主角前弓后箭，右拳挟破空劲风重重轰退当路一尊高大铜胸机关木人，左臂沉桥格开侧翼木人横扫而来的齐眉木棍。
  3. **光影叙事**：长廊尽头厚重石门刚刚向两侧洞开，灿烂金红的日出晨光穿透幽暗石巷照亮尘埃与飞舞的红花瓣，门外演武坪隐约可见披红祖衣的方丈与数名武僧合十伫立见证出关。
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color painting illustration, wide cinematic 16:9 perspective composition. Inside the solemn stone corridor of the Hundred-Heroes Wooden Dummy Alley (百杰木人巷) at Putian Southern Shaolin Temple around 1050 AD. Along both sides of the shadowed stone hall, intricate ancient wooden mechanical martial-monk dummies clad in bronze plates swing wooden arms and staffs via floor gears. In the foreground center, a bruised yet radiant young martial artist in torn training robes roots his stance and delivers a thunderous Southern Fist straight punch into the bronze chest-plate of the final guardian wooden dummy while parrying a wooden staff with his left forearm. At the far end of the corridor, heavy stone gates slide open, flooding the dark hall with brilliant golden morning sunlight and drifting crimson erythrina blossoms, revealing the silhouettes of the elderly Abbot in a kasaya robe and fellow monks standing in approval outside. Dramatic shafts of golden light, authentic Song court painting style, mineral pigments, triumphant martial arts cinema atmosphere, no modern elements, no text or characters.
  ```

---

### 14. `CG-QST-014`：天柱绝顶观云台 · 松枝煮雪论太和

- **关联文件**：[`src/data/quests/sects/zhenwuEntryQuest.ts`](../src/data/quests/sects/zhenwuEntryQuest.ts)
- **目标路径**：`public/assets/quests/zhenwu_cloud_tea.jpg`
- **画框题跋**：`天柱绝顶观云台 · 布衣老道松枝煮茶论太和`
- **剧情语境**：
  - 少侠初登武当山天柱绝顶观云台，晨雾未散、云海翻涌，偶遇隐瞒掌教身份的布衣白发老道（张玄素）于石桌旁以松枝煮雪茶，共论“世人皆求有，唯道守虚静”。
- **画面核心要素**：
  1. **环境氛围**：武当山天柱绝顶石台，云海浩渺如潮，远峰青绿叠翠如画，苍劲古松斜倚悬崖，晨光微金透云而出。
  2. **主体人物**：石桌一侧，白发银须、神色温雅清癯的布衣老道（张玄素）轻摇蒲扇煮着小泥炉上的粗陶茶壶；另一侧身着素净粗布衣衫、尚未佩剑的年轻少侠拱手垂听，神情沉静。
  3. **前景细节**：石桌上置两只宋式青瓷茶盏，旁有一把青竹扫帚倚松而立，呼应老道“扫雪煮茶”的出尘气韵。
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color painting illustration, wide cinematic 16:9 composition. Early dawn atop a high misty stone cliff terrace on Mount Wudang around 1050 AD, overlooking a vast sea of swirling white clouds and blue-green mountain peaks. Beneath an ancient gnarled pine tree, a serene white-bearded Taoist elder in humble plain grey-indigo linen robes (Zhang Xuansu in disguise) sits beside a rough stone table, gently fanning a small clay brazier boiling a ceramic teapot with pine twigs. Across the table sits a young Chinese martial arts novice in simple plain cloth robes with no weapon, listening respectfully over two celadon teacups. A bamboo broom leans quietly against the pine trunk. Authentic Northern Song court landscape painting brushwork, mineral azurite and malachite pigments, tranquil Daoist poetic atmosphere, no modern elements, no text or characters.
  ```

---

### 15. `CG-QST-015`：禹迹池畔太极坪 · 暮雨细观龟蛇峙

- **关联文件**：[`src/data/quests/sects/zhenwuEntryQuest.ts`](../src/data/quests/sects/zhenwuEntryQuest.ts)
- **目标路径**：`public/assets/quests/zhenwu_turtle_snake.jpg`
- **画框题跋**：`禹迹池畔太极坪 · 暮色微雨观龟蛇相峙悟圆融`
- **剧情语境**：
  - 紫霄宫三日观心将满，黄昏细雨中，少侠与首座大弟子宋远乔行至禹迹池畔太极坪，忽见青石池畔一只玄龟与一条青蛇对峙盘旋，龟静如岳、蛇动如风，少侠由此初悟“以静制动、圆转卸力”之理。
- **画面核心要素**：
  1. **环境氛围**：北宋道观紫霄宫外青石太极坪与禹迹池，暮色微雨，池面涟漪圈圈，古柏红墙隐约于山岚之中。
  2. **主体人物**：石栏旁，儒雅端方的武当首座大弟子（宋远乔，青衫道袍、负手含笑）侧身指点池畔；年轻少侠俯身凝望，眼神若有所悟。
  3. **前景焦点**：池畔湿润青石上，一只墨色玄龟缩首稳立，一条翠青小蛇盘旋游走却始终无法伤其分毫，暗合真武龟蛇护法与太极阴阳意象。
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color painting illustration, wide cinematic 16:9 composition. Dusk light rain at a mossy stone courtyard terrace beside a serene lotus-free mountain pond (Yujichi Pool) outside Zixiao Taoist Palace on Mount Wudang around 1050 AD, with Song-style vermilion palace walls and cypress trees veiled in mist. In the foreground on wet flagstones beside the rippling pond, a dark tortoise stands immovable facing a slender green snake coiling gracefully around it without striking. Standing nearby under the eaves or stone balustrade, a refined young Taoist senior disciple in neat indigo Taoist robes (Song Yuanqiao) gestures calmly toward the tortoise and snake, while the young plain-clothed protagonist watches in deep contemplation. Authentic Northern Song gongbi brushwork, soft ink wash rain and mineral pigments, philosophical wuxia atmosphere, no modern elements, no text or characters.
  ```

---

### 16. `CG-QST-016`：太和紫金正殿 · 拜师授受松纹剑

- **关联文件**：[`src/data/quests/sects/zhenwuEntryQuest.ts`](../src/data/quests/sects/zhenwuEntryQuest.ts)
- **目标路径**：`public/assets/quests/zhenwu_golden_sword.jpg`
- **画框题跋**：`太和紫金正殿 · 张玄素天师亲授真武松纹道剑`
- **剧情语境**：
  - 少侠历尽襄阳结缘、紫霄观心与南岩试炼后，登太和紫金正殿，方知观云台老道便是掌教天师张玄素。天师亲赐外门道篆、真武松纹道剑与道门金丹，少侠正式拜入真武道宗。
- **画面核心要素**：
  1. **环境氛围**：庄严肃穆的北宋太和绝顶紫金正殿内景，铜铸殿柱与藻井沉稳古朴，长明烛火与香炉青烟袅袅，殿外天柱峰云霞微透窗棂。
  2. **主体人物**：正殿高台前，白发飘逸、身着玄色镶金云纹法袍的掌教天师张玄素含笑俯身，双手将一柄连鞘古朴青松纹道剑与一只青瓷丹瓶递向单膝跪拜的年轻少侠。
  3. **左右观礼**：宋远乔、俞清虚、莫清谷、殷峰峰与清鹤等武当师长分列左右含笑颔首，庄重中透着师门温情。
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color painting illustration, wide cinematic 16:9 composition. Inside the solemn bronze-and-timber Golden Hall of Taihe Peak on Mount Wudang around 1050 AD, illuminated by tall brass candlesticks and drifting incense smoke, with misty mountain clouds visible through lattice doors. Before the altar, the white-haired Taoist Grandmaster Zhang Xuansu in dignified dark-indigo and gold-trimmed Taoist ceremonial robes smiles warmly as he bestows a plain pine-carved scabbard sword (真武松纹道剑) and a small celadon medicine bottle to the young protagonist kneeling respectfully on one knee. Flanking the hall in quiet approval stand senior Taoist disciples and elders in indigo robes. Authentic Northern Song court painting aesthetics, rich mineral pigments, solemn yet warm master-disciple ceremony, no modern elements, blank plaques with no text or characters.
  ```

---

### 17. `CG-QST-017`：宣德微服 · 相国寺万姓灯市图

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

### 18. `CG-QST-018`：资圣宝塔 · 飞檐断铃惊变图

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

### 19. `CG-QST-019`：樊楼飞桥 · 珠帘破屏杀机图

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

### 20. `CG-QST-020`：虹桥夜雨 · 孤身血战双狼图

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

### 21. `CG-QST-021`：紫宸晓日 · 御马秘卷双恩图

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

### 22. `CG-QST-022`：昆仑百草炼毒庐 · 丹鼎紫雾冲脉筑基图

- **关联文件**：[`src/data/quests/sects/xingxiuEntryQuest.ts`](../src/data/quests/sects/xingxiuEntryQuest.ts)
- **目标路径**：`public/assets/quests/xingxiu_poison_furnace.jpg`
- **画框题跋**：`昆仑百草炼毒庐丹鼎炸裂 · 紫碧毒雾中苏半夏扶背助引毒气冲脉`
- **剧情语境**：
  - 毫无内功根基的主角身中星宿“三日腐心散”，随押药驼队进入昆仑山【星宿百草炼毒庐】充当试药杂役。
  - 子夜邻炉错投断肠乌头导致青铜毒鼎轰然掀盖炸裂，滚滚紫碧毒烟吞没丹房，引燃主角体内腐心宿毒；危急关头，司药孤女【苏半夏】以湿巾掩口逆着奔逃杂役扑至主角身后，双掌抵住其后心灵台穴，助主角含雪莲须、依残页口诀逆引毒气冲开气海，死中求活修出人生第一缕内功《星宿腐毒行气诀》。
- **画面核心要素**：
  1. **环境氛围**：昆仑雪山岩壁下的北宋木石丹房（百草炼毒庐），竹架悬挂晾晒奇异毒草与蛇蜕，后方一座巨大青铜兽耳丹鼎炉盖掀翻，炉底赤红炭火与翻涌而出的妖异紫碧色毒雾交织弥漫。
  2. **主体人物**：前景蒲团青石上，身穿粗布杂役短衣的年轻主角盘膝紧闭双目、额角青筋微暴、唇角溢出一丝乌黑瘀血，双手结印凝出微弱幽紫气旋；身后十七岁清冷少女药童（苏半夏，身穿淡青灰宋式窄袖襦裙，面覆半透白麻湿巾，竹笠滑落肩后）跪坐紧贴，双掌坚定抵在主角后背心脉处护持。
  3. **光影质感**：毒鼎溢出的诡谲紫翠冷光与炉膛暖橘炭火形成强烈冷暖戏剧张力，彰显“邪窟绝境里一线相护”的宿命感。
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color painting illustration, wide cinematic 16:9 composition. Midnight inside a stone-and-timber poison alchemy pavilion (百草炼毒庐) built against snowy Kunlun cliffs around 1050 AD, wooden racks hung with dried exotic herbs. In the mid-ground, a massive bronze tripod cauldron has burst open, billowing eerie violet and emerald-green poisonous smoke lit from below by glowing red furnace coals. In the foreground, a young Chinese martial artist apprentice in humble coarse grey cloth robes sits cross-legged on stone slabs, brow furrowed in intense pain with a trace of dark blood at his lip, channeling swirling faint purple qi around his hands. Kneeling right behind him, a 17-year-old female herbalist apprentice (Su Banxia, wearing modest pale teal-violet Song-style narrow-sleeve garments, a damp linen veil over her lower face, bamboo hat slung at her back) presses both palms firmly against his upper back to steady his meridians amidst the toxic mist. Authentic Song court painting brushwork, rich mineral pigments, dramatic violet mist and warm ember contrast, no modern elements, no text or characters.
  ```

---

### 23. `CG-QST-023`：昆仑雪山冰蚕寒石窟 · 篝火映冰彻夜渡毒图

- **关联文件**：[`src/data/quests/sects/xingxiuEntryQuest.ts`](../src/data/quests/sects/xingxiuEntryQuest.ts)
- **目标路径**：`public/assets/quests/xingxiu_ice_cave_bandage.jpg`
- **画框题跋**：`昆仑雪山冰蚕寒石窟 · 微火映冰下运功替苏半夏逼出蛇涎毒血`
- **剧情语境**：
  - 主角在紫雾毒泉沼击败外门恶霸乌承山，乌承山败退之际偷发涂满腐骨赤练蛇涎的袖箭射向主角咽喉，苏半夏飞身扑上以左肩替主角挡下毒箭昏迷，星宿同门冷笑劝主角将其弃入毒沼。
  - 主角抱起苏半夏退入幽寂的【雪山冰蚕寒石窟】，在洞口燃起一小簇枯松火，彻夜盘膝运转初成的《星宿腐毒行气诀》替她逼出肩头乌黑毒血，直至眉发结满白霜；黎明苏醒的苏半夏热泪盈眶，解下家传平安药玉相赠，定下生死同命之缘。
- **画面核心要素**：
  1. **环境氛围**：昆仑万仞雪峰高处的天然寒冰石窟内景，洞顶垂挂晶莹冰棱，深处陈列寒玉石槽（隐约可见莹白冰蚕微光），洞口外风雪初霁透入熹微晨光。
  2. **主体人物**：洞内一小堆将熄未熄的枯松枝篝火旁，身穿深色粗衣、眉梢发丝凝着白霜的年轻主角脸色苍白却神情专注坚毅，一手扶住少女右肩、一掌运起微光抵在少女包扎渗血的左肩锁骨伤处逼出几滴乌黑毒血；半倚在石壁干草上的十七岁清丽少女（苏半夏，淡紫滚边素衣，乌发微散）刚刚苏醒，眼眶泛红、目光温柔动容地凝视着主角，手中握着一枚红绳古玉欲递向他掌心。
  3. **冷暖意境**：万年玄冰的澄澈幽蓝与小小松火的橘黄暖光交相辉映，极致烘托“至寒邪派中唯此一点真心滚烫”的武侠浪漫。
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color painting illustration, wide cinematic 16:9 composition. Dawn inside a crystalline high-altitude ice cavern (雪山冰蚕寒石窟) in the Kunlun Mountains around 1050 AD, translucent icicles hanging from rock ceilings, carved frost-covered stone troughs glowing softly in the background, pale morning snow-light at the cave mouth. Beside a small flickering pine-branch campfire in the foreground, a pale, frost-browed young Chinese martial artist in dark coarse robes channels gentle qi with his palm to draw out dark venom from a bandaged left-shoulder wound of a 17-year-old wuxia maiden (Su Banxia, dressed in pale lavender-trimmed Song robes, refined features, eyes glistening with moved emotion). Just awakening against dry straw and fur pelts, she gazes tenderly at him while offering a small antique jade pendant on a red cord into his hand. Poetic contrast between icy glacial blues and intimate warm firelight, authentic Song court painting brushwork, mineral pigments, deeply emotional wuxia romance, no modern elements, no text or characters.
  ```

---

### 24. `CG-QST-024`：延安番坊秘厅 · 丝竹漫天拜星宿老仙图

- **关联文件**：[`src/data/quests/sects/xingxiuEntryQuest.ts`](../src/data/quests/sects/xingxiuEntryQuest.ts)
- **目标路径**：`public/assets/quests/xingxiu_ding_chunqiu_audience.jpg`
- **画框题跋**：`延安番坊秘厅丝竹喧天 · 鹤发童颜星宿老仙高坐受献`
- **剧情语境**：
  - 主角与苏半夏识破大师兄【摘星子】在紫檀锦盒中暗掺臭秽散借刀杀人的毒计，暗换真雪莲冰蚕香饼后重返延安府【塞上番马黑市 · 番坊正市奇货堂】秘厅面圣。
  - 红毯紫烟、二十余名紫衣门徒吹笛敲钹震耳欲聋；鹤发童颜、银髯垂胸、面如重枣手摇白羽扇的星宿老怪【丁春秋】高坐虎皮软榻之上抚须受献，主角从容揭开紫檀锦盒清香满室，榻侧准备看好戏的摘星子顿时脸色铁青。
- **画面核心要素**：
  1. **环境氛围**：北宋延安府番坊地下奇货堂奢华诡异的西域风秘厅，地面铺设波斯高昌大红织金羊毛毯，四隅青铜兽炉吐出袅袅紫烟，梁柱悬垂绛紫帷幔。
  2. **主体人物**：正中高台虎皮软榻上，年近五旬却鹤发童颜、红光满面、长长银白美髯垂至胸口、身披华贵紫金道袍的宗师老者（丁春秋）右手轻摇洁白鹅毛扇，正抚须开怀大笑；榻侧侍立一名瘦高阴鸷、戴乌金护爪的青年大师兄（摘星子），正神色惊愕难堪地死死盯着堂下；前景中央，年轻主角单膝躬身，双手高举一只敞开的雕花紫檀锦盒，盒中升起一缕莹白清冽的雪莲寒香。
  3. **群像烘托**：大堂左右两侧分列十余名身穿紫衣的星宿派门徒，正卖力敲击黄铜铙钹、吹奏竹笛、拍打腰鼓，将星宿派“仙气皮囊下包裹荒诞与杀机”的独特门风刻画得淋漓尽致。
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color painting illustration, wide cinematic 16:9 composition. Inside a lavish, eerie underground Western-Regions merchant hall (延安番坊秘厅) around 1050 AD, draped in deep purple silk curtains and Persian crimson carpets with bronze censers emitting curling violet incense smoke. High on a tiger-skin dais at the center sits Ding Chunqiu (the Old Immortal of Xingxiu: white hair, youthful ruddy crimson complexion, long flowing silver beard over his chest, sumptuous purple Taoist robes, holding a white goose-feather fan with a pleased arrogant laugh). Standing beside the dais, a tall gaunt sinister senior disciple (Zhaixingzi, dark iron claws on his fingers) looks shocked and mortified. In the foreground below, a composed young martial artist protagonist bows respectfully while presenting an open carved sandalwood box releasing a pure wisp of silvery frost-lotus fragrance. Lining both sides of the hall, purple-robed Xingxiu disciples enthusiastically clash brass cymbals, blow flutes, and beat hand drums. Authentic Song dynasty court painting style, rich mineral pigments, theatrical and sinister wuxia sect atmosphere, no modern elements, blank banners with no text or characters.
  ```

---

### 25. `CG-QST-025`：泰山十八盘风雪云梯 · 布衣少年挑泉喋血登阶图

- **关联文件**：[`src/data/quests/sects/taishanEntryQuest.ts`](../src/data/quests/sects/taishanEntryQuest.ts)
- **目标路径**：`public/assets/quests/taishan_18pan_buckets.jpg`
- **画框题跋**：`泰山十八盘风雪千级云梯 · 布衣少年无内功挑泉喋血登升仙坊`
- **剧情语境**：
  - 主角尚无半缕内家真气，携天松道人所赐木牌与俗家同道【鲁苍岳】同至泰山十八盘，传功师叔【单天门】横黑铁重剑考校根骨意志，命二人各挑百斤山泉直登一千六百三十级云梯石阶，水不得漫过桶内朱砂红线。
  - 风雪陡急，石阶几近垂立，主角单薄布衣肩头被桑木扁担磨破渗血，仍咬牙一步一印稳控水桶，并伸手扶助踉跄欲坠的鲁苍岳，高台风口处单天门拄黑铁重剑俯视动容。
- **画面核心要素**：
  1. **环境氛围**：东岳泰山紧十八盘险峻夹峙的万仞峭壁，近乎七十度陡立的千级白石云梯直插迷蒙风雪云海，两侧奇松挂霜。
  2. **主体人物**：前景石阶上，身穿朴素粗布衣衫的年轻主角双肩压着弯曲桑木扁担，肩头布料磨损渗出醒目殷红血迹，却目光如炬、腰马沉稳，扁担两端箍铜柏木水桶内清泉平稳不洒；他腾出一手稳稳托住身旁青衫书生同伴（鲁苍岳）倾斜的桶绳。
  3. **高处呼应**：云梯尽头高耸的宋式石坊（升仙坊）前，浓眉虬髯的魁梧道人（单天门）双手拄着一口宽厚乌黑的无锋黑铁重剑迎风而立，神色由冷厉转为暗自震撼。
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color painting illustration, wide cinematic 16:9 composition. The perilously steep Eighteen Bends (泰山十八盘) stone stairway of Mount Tai around 1050 AD, nearly vertical ancient stone steps cutting between towering jagged cliffs amidst swirling spring snow and mountain mist. In the foreground on the steep steps, a determined young martial artist in plain coarse cloth robes carries a heavy wooden shoulder pole with two full cedar water buckets, crimson bloodstains seeping through the worn cloth on his shoulder from sheer mortal exertion, yet keeping the water steady while extending one hand to steady a stumbling young scholar-disciple in青衫 beside him. High above at a weathered Song-style stone archway (升仙坊), a burly bearded Taoist master leans on a massive black iron heavy greatsword, watching with silent awe. Authentic Song dynasty landscape brushwork (Li Cheng and Fan Kuan style cliffs and pines), mineral pigments, dramatic verticality, no modern elements, blank stone archway with no text or characters.
  ```

---

### 26. `CG-QST-026`：东岳道院苍松石坪 · 晨雾古松引气破茧图

- **关联文件**：[`src/data/quests/sects/taishanEntryQuest.ts`](../src/data/quests/sects/taishanEntryQuest.ts)
- **目标路径**：`public/assets/quests/taishan_pine_neigong.jpg`
- **画框题跋**：`东岳道院苍松石坪 · 晨雾古松下初运《泰山松风养气诀》引气破茧`
- **剧情语境**：
  - 主角于观云亭暗夜机警撞钟护山立功，次日清晨获执法长老【天柏道人】破例传授泰山筑基内功《泰山松风养气诀》与《泰山剑法（筑基篇）》，并赐《武馆三才铁剑》。
  - 千年桧柏与晨雾松涛间，主角盘膝闭目引第一缕东岳松风清气贯入丹田，奇经八脉初次豁然贯通，正式褪去白丁凡躯迈入武林门径。
- **画面核心要素**：
  1. **环境氛围**：北宋泰山半腰古朴庄严的道教庭院（东岳道院苍松石坪），汉代古柏虬枝苍劲，晨曦穿透薄雾洒在青石板与碑廊黛瓦之上，松针随清风微旋。
  2. **主体人物**：石坪中央，年轻主角盘膝端坐、五心朝天，膝前青石上横放一柄朴实端正的三尺生铁长剑（三才铁剑）；主角周身萦绕着淡青与暖白交织的温润松风气旋，松针在气流旁轻盈悬浮。
  3. **配角见证**：后方宋式道殿丹墀石阶上，面容冷峻威严的铁灰道袍执法长老（天柏道人）背手肃立颔首，廊柱旁年轻同门（鲁苍岳）与女道童（建蓉）欣喜注视。
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color painting illustration, wide cinematic 16:9 composition. Peaceful dawn inside an ancient Northern Song Taoist courtyard on Mount Tai (东岳道院苍松石坪) around 1050 AD, framed by millennial gnarled pine and cypress trees, stone steles, and mist-veiled timber halls. In the center of the flagstones, a young martial artist sits cross-legged in meditation with a plain iron straight sword resting horizontally on the stone before his knees; subtle translucent jade-white pine-wind qi currents and floating pine needles gently swirl around him as he awakens his inner energy for the first time. On the stone terrace steps in the background, a stern grey-robed Taoist elder watches approvingly alongside a young male lay disciple and a female Taoist acolyte. Authentic Song court painting aesthetics, serene mineral greens and morning gold light, no modern elements, blank plaques with no text or characters.
  ```

---

### 27. `CG-QST-027`：玉皇顶古封禅台 · 沧海初旭授袍赐剑图

- **关联文件**：[`src/data/quests/sects/taishanEntryQuest.ts`](../src/data/quests/sects/taishanEntryQuest.ts)
- **目标路径**：`public/assets/quests/taishan_yuhuang_sunrise.jpg`
- **画框题跋**：`玉皇顶汉白玉古封禅台 · 沧海初旭下东灵道长褚玄机率三长老授袍赐剑`
- **剧情语境**：
  - 破获黑风寨盗取《东封七宿青铜算筹》大案后，主角寅夜登临泰山极顶，于秦汉石晷前对答掌门东灵道长【褚玄机】日影算理与本心三问。
  - 卯初景阳钟鸣，沧海红日跃出万顷云涛，褚玄机携单天门、天松道人、天柏道人及同门鲁苍岳、建蓉，于汉白玉封禅古坛为主角披上青灰道袍、授剑录册，正式拜入五岳独尊泰山派。
- **画面核心要素**：
  1. **环境氛围**：东岳泰山最高峰玉皇顶汉白玉古封禅台，坛边矗立秦汉无字古碑与青石日晷；脚下是浩瀚无际的翻涌云海，东方天际一轮壮丽赤金朝阳破云而出，万道金霞铺满山巅。
  2. **主体人物**：封禅坛中央，仙风道骨、身披素白鹤氅的白须老掌门（褚玄机）手执竹算筹，正庄重地将一件泰山派青灰道袍与长剑授向单膝恭拜的年轻主角。
  3. **群像仪轨**：左右分立背负黑铁重剑的魁梧道人（单天门）、持拂尘的儒雅道长（天松道人）与冷面执法道长（天柏道人），丹墀下年轻男弟子（鲁苍岳）与捧木盘的女道童（建蓉）含笑观礼，气势恢宏神圣。
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color painting (青绿重彩工笔), wide cinematic 16:9 composition. A magnificent sunrise investiture ceremony atop the White Jade Fengshan Altar at Yuhuang Summit of Mount Tai (泰山玉皇顶封禅台) around 1050 AD, high above a vast boundless sea of churning golden clouds as a radiant crimson-gold sun breaks over the eastern horizon. Beside an ancient wordless stone stele and stone sundial, a venerable white-bearded Taoist grandmaster in crane-white robes (Chu Xuanji) solemnly bestows a slate-blue Taoist robe and straight sword upon a kneeling young martial artist protagonist. Flanking the altar stand three distinct Taoist elders (one burly with a black iron greatsword on his back, one refined holding a horsetail whisk, one stern in iron-grey robes), while a young male disciple and female acolyte holding a lacquer tray watch joyfully below. Grand Wang Ximeng and Song imperial academy mineral blue-green and gold palette, awe-inspiring wuxia majesty, no modern elements, blank stele and banners with no text or characters.
  ```

---

### 28. `CG-QST-028`：成都万里桥头 · 锦江春雨共油伞图

- **关联文件**：[`src/data/quests/sects/emeiEntryQuest.ts`](../src/data/quests/sects/emeiEntryQuest.ts)
- **目标路径**：`public/assets/quests/emei_wanli_rain_umbrella.jpg`
- **画框题跋**：`成都万里桥头 · 锦江春雨油伞护药篓`
- **剧情语境**：
  - 成都府锦江万里桥畔春雨潇潇，巴蜀老药农遭青城派外围恶徒冲撞跌倒，进献峨眉的灵药竹篓倾覆于泥水之中；身无半点内功根基的主角不顾湿冷泥浆，蹲身护住老药农与散落的川芎药草。
  - 恰在恶徒欲加羞辱之际，峨眉俗家首席女侠「蜀道飞燕」【苏梦清】以未出鞘窄剑挑翻恶徒，将一柄桐油竹骨伞斜斜撑在主角头顶，遮去漫天细雨，两人自此结下蜀水前缘。
- **画面核心要素**：
  1. **环境氛围**：公元 1050 年北宋成都府锦江万里桥畔，春雨如丝、薄雾笼江，远处可见红墙竹影、宋式飞桥茶肆红灯笼与锦江乌篷船。
  2. **主体人物（兼顾男女主角代入）**：石桥湿滑青石阶前，束发素色布衣的年轻主角采用微侧背影蹲身视角（眉宇清朗中性，男女少侠代入皆自然），正将倾倒的竹编药篓与白发老药农护在身后；其身侧半步，年方二十八岁、英姿飒爽的峨眉女侠（苏梦清，淡青束袖劲装披素纱雨帔，腰悬窄刃长剑与分水双刺）左手执剑鞘自然垂落，右手举起一把古朴桐油竹骨雨伞倾向主角上方，垂眸含笑相视。
  3. **前景与细节**：伞沿晶莹雨珠串落，桥面青苔湿润映出茶楼微暖灯影，青石上散落数株带露川芎草药。
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color painting illustration, wide cinematic 16:9 composition. Misty spring rain at Wanli Stone Bridge over the Jinjiang River in Chengdu around 1050 AD, with lush green bamboo, Song-style timber teahouses glowing with warm red lanterns, and wooden boats in soft river fog. On the wet flagstone bridge steps in the foreground, a young martial traveler in plain neat cloth robes with tied black hair (seen from a graceful three-quarter back angle, gender-neutral youthful silhouette) kneels to shield an elderly herbalist farmer and a spilled bamboo herb basket from the mud. Standing gracefully beside them, a spirited 28-year-old Emei swordswoman (Su Mengqing, wearing light celadon-cyan martial attire, waist-sheathed narrow sword, calm bright eyes) holds a traditional oiled-paper bamboo umbrella tilted over the young traveler, raindrops glistening along the umbrella rim. Poetic Song court painting brushwork, mineral pigments, tender wuxia encounter atmosphere, no modern elements, blank banners and lanterns with no text or characters.
  ```

---

### 29. `CG-QST-029`：峨眉洗象灵池 · 澄月松涛白猿演剑图

- **关联文件**：[`src/data/quests/sects/emeiEntryQuest.ts`](../src/data/quests/sects/emeiEntryQuest.ts)
- **目标路径**：`public/assets/quests/emei_xixiang_moon_ape.jpg`
- **画框题跋**：`峨眉洗象灵池 · 澄月松涛共观白猿折竹`
- **剧情语境**：
  - 主角在万年寺历经三日担水抄经苦役并初成《峨眉吐纳术》第一缕丹田清气后，随【苏梦清】夜登峨眉山腰洗象池。
  - 皓月当空，山间通灵老白猿跃上临渊古松折竹演剑；苏梦清立于六角澄月池畔，轻引主角执竹枝的手腕，借松风月影传授《分水峨眉刺》旋腕锁穴之妙。
- **画面核心要素**：
  1. **环境氛围**：峨眉山腰洗象池绝壁月夜，一轮皎洁满月高悬苍穹，六角形青石古池倒映冷月清辉，四周修竹幽深、飞瀑如银练垂落云壑。
  2. **主体人物与白猿**：右侧临渊虬曲苍松横枝之上，一只毛色胜雪的通灵老白猿单足轻立，手持一截翠竹灵动刺出；左侧池畔青石坪上，淡青劲装的苏梦清立于素衣年轻主角（侧后方修长背影，男女皆宜）身旁半步，抬手轻托主角手腕引导其手中青竹枝顺应月下风势，衣袂随夜风微扬。
  3. **设色意境**：宋代马远、夏圭山月清旷构图结合青绿石青矿物设色，银白月华与幽翠竹影交相辉映，空灵绝尘。
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color painting illustration, wide cinematic 16:9 composition. A serene moonlit night at Xixiang Pond (洗象池) high on Mount Emei around 1050 AD, featuring a hexagonal stone pool reflecting a luminous full moon, ancient cliffside pine trees, misty bamboo groves, and a silver waterfall cascading into clouds. Perched agilely on an overhanging pine branch above the abyss, a wise snow-white mountain ape wields a green bamboo branch like a sword in graceful motion. On the stone terrace beside the moonlit pool, the poised Emei swordswoman Su Mengqing in celadon-blue martial robes stands half a step beside a youthful disciple in simple robes (seen from a subtle three-quarter back view, gender-inclusive silhouette), gently guiding their wrist as they hold a bamboo twig to trace the ape's sword rhythm. Ethereal silver moonlight, rich mineral blues and greens, authentic Song dynasty landscape-and-figure brushwork, no modern elements, no text or characters.
  ```

---

### 30. `CG-QST-030`：峨眉万仞金顶 · 破晓云海佛光问心图

- **关联文件**：[`src/data/quests/sects/emeiEntryQuest.ts`](../src/data/quests/sects/emeiEntryQuest.ts)
- **目标路径**：`public/assets/quests/emei_jinding_buddha_light.jpg`
- **画框题跋**：`峨眉万仞金顶 · 破晓云海七彩宝光问本心`
- **剧情语境**：
  - 破晓时分，主角冒雪登临峨眉万仞金顶睹光台，破获青城弃徒与西夏一品堂暗桩窥山之谋后，迎着初升朝阳见证千里云海之上浮现庄严绚丽的「金顶佛光（普贤宝光）」。
  - 峨眉派掌门「金顶神尼」【云慧师太】立于云海石栏前慈目三问本心，执法首座【静玄师太】与俗家首席【苏梦清】分侍左右，主角于漫天瑞霭金辉中肃立明志，正式拜入峨眉门墙。
- **画面核心要素**：
  1. **环境氛围**：峨眉山万仞金顶绝壁睹光台，脚下无边无际的雪白云海翻涌如涛，破晓红日初升，云海正中折射出一轮神圣柔和的七彩圆光（峨眉宝光/佛光），后方华藏金顶铜殿飞檐覆着薄雪、沐浴晨曦金辉。
  2. **主体人物**：睹光台石栏前，年近六旬、慈眉善目却气度渊渟岳峙的掌门老尼（云慧师太，披素色袈裟、手持紫檀佛珠）面向年轻主角温和问心；其左立着身材高大威严的灰衣铁尼（静玄师太，背负长剑），其右立着英姿清飒、含笑注视主角的淡青衣女侠（苏梦清）；前景素衣年轻主角（端庄背影视角，男女兼容）恭敬拱手行礼。
  3. **气象格调**：北宋青绿泥金重彩山水人物画卷，云海翻腾、金光万丈，融佛门庄严与剑派清逸于一炉。
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color painting illustration with subtle gold-leaf accents, wide cinematic 16:9 composition. Magnificent dawn atop the Golden Summit (金顶睹光台) of Mount Emei around 1050 AD, overlooking an endless surging sea of white clouds far below. In the glowing morning mist over the cloud sea appears the sacred circular rainbow halo of Emei Buddha's Light (佛光宝光), while snow-dusted Song-style bronze temple eaves gleam warmly behind. On the cliffside stone terrace, the venerable Emei Abbess (Yunhui Shitai, serene elderly Buddhist nun in dignified saffron-grey monastic robes holding prayer beads) stands before the balustrade, flanked by a tall stern senior nun carrying a sword on her back (Jingxuan Shitai) and the graceful celadon-robed swordswoman (Su Mengqing). Facing them in the foreground from a respectful three-quarter back view (gender-neutral youthful martial traveler in neat robes), the protagonist bows with clasped hands in solemn oath. Grand Northern Song court painting aesthetics, mineral pigments, awe-inspiring spiritual wuxia atmosphere, no modern elements, no text or characters.
  ```

---

## 三、 后续补绘验收清单

每次补绘完成后，请按以下三步核验并将上方表格状态改为 `[x]`：
1. 检查原画比例是否为 `16:9`，画面内无 AI 伪汉字乱码、无现代器物或清代剃发服饰；
2. 将高清原图归档至 `assets_raw_masters/quests/`，并将压缩后的 `.jpg`（建议分辨率 `1600×900` 或 `1280×720`，质量 `85`）写入 `public/assets/quests/` 对应文件名；
3. 启动游戏或通过剧情舞台预览对应幕次，确认宋风卷轴画框正常加载显示、不再回退至「绘卷留白」占位提示。
