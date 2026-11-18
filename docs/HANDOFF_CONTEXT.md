# 《北宋立志传》— 跨会话上下文交接全录 (HANDOFF_CONTEXT)

> **用途**：本文档浓缩了《北宋立志传》在多个研发会话（地图空间分支、千人群像分支、工程合流与数值深化阶段）中的全部演进脉络、核心设计决策与踩坑经验。开启新对话时，Agent 读取本文档即可 100% 还原所有前情提要。

---

## 一、 项目来龙去脉：我们之前经历了什么？

### 1. 第一阶段：世界观奠基与双线并行探索
- **世界观与数值总纲确立**（见 [GAME_MECHANICS.md](./GAME_MECHANICS.md)）：
  - 确定以 **公元 1050 年（宋仁宗皇祐二年）** 为唯一历史切面，融合《太阁立志传》的沙盘养成与《金庸群侠传 / 天龙八部》的武侠江湖。
  - 确定 **“确定性数值量化骨架 + LLM 动态叙事血肉”** 双层架构：将角色属性严格切分为**不进战中公式的天赋三维（根骨/悟性/颜值）**、**直接驱动武侠回合对决结算的实战四维（气血/身法/内力/抗性）**、以及**十艺百工（骑术/算术/经义/策论/诗词/琴/棋/书/画/辩才）**。
  - 编纂 **216 门十一大类武学全典**（[MARTIAL_ARTS_COMPENDIUM.md](./MARTIAL_ARTS_COMPENDIUM.md) + [MARTIAL_ARTS_STATS.md](./MARTIAL_ARTS_STATS.md)）、**30 门派三级金字塔专卷**（[MARTIAL_ARTS_SECTS.md](./MARTIAL_ARTS_SECTS.md)）、**百兵谱**（[EQUIPMENT_COMPENDIUM.md](./EQUIPMENT_COMPENDIUM.md)）与 **43 处疆域重镇及 138 座特殊建筑设定**（[REGIONAL_MAPS_AND_BUILDINGS.md](./REGIONAL_MAPS_AND_BUILDINGS.md)）。
- **宏观舆图与空间全景主线**：
  - 绘制涵盖北宋、大辽、西夏、吐蕃、大理及流求、琼州、高丽、交趾、日本真实海岸线的《华夏山海全景舆图》（`src/data/worldBaseSvg.ts` + `worldGraph.json`），支持按里程 $D$、地形系数 $T$、坐骑速度与轻功/骑术修正计算真实行军时辰（`0.25s/时辰`，支持旷野随时原地扎营与拔营续行）。
  - 逐张生成 **38 处州府/名山/雄关的北宋青绿工笔 2.5D 等轴全景图**（另 5 座新辟州府采用宋辽营造青绿 SVG 矢量兜底）与 **58 座核心特殊建筑的半 3D 内景图**（另 80 座采用宋式营造 SVG 矢量内院兜底）。
- **1,000 名历史与武林人物主线**：
  - 编纂 **1,000 名独立人物全录**（[CHARACTER_COMPENDIUM.md](./CHARACTER_COMPENDIUM.md)，含 `NPC-0001..0100` 共 100 位考据级公元 1050 年在世历史名臣巨匠，以及 `NPC-0101..1000` 共 900 位武林群像，全员具备四维、三维禀赋与十艺百工数值，并 100% 精确挂载至 43 地区最末层建筑/子建筑）。
  - 按故宫南薰殿帝后名臣像、《宋史》记载与宋代服制考据，逐张独立生成了 **129 位核心角色（含 100/100 全员历史名人 + 29 位绝世大宗师与名侠）的 `1:1` 头像与 `3:4` 全身立绘（共 258 张）**，以及 12 套门派/行当通用全身模板。

### 2. 第二阶段：防跑偏铁律与战斗机制锚定
- **铁律一（暂停散装生图，主支线解耦）**：5 座新城全景（`SvgRegionPanoramaFallback.tsx`）、剩余 80 座建筑内景（`SvgBuildingInteriorFallback.tsx`）和未绘独立原画的 NPC（12 套门派模板 + 宋风古籍名牌）均已有完善矢量兜底，把补图放入非阻塞 Backlog，全力攻克代码可玩性。
- **铁律二（先骨骼跑通，后上 LLM）**：M0（工程合流）→ M1（创角·武学披挂·建筑拜师与商贸）→ M2（**同步盲选三择一［出招/防御/逃跑］+ 身法先后手回合战斗**）→ M3（千人社交与风云榜）先做成不依赖大模型也能从头玩到尾的扎实单机 RPG，M4 再接入 LLM 三大引擎，M5 做双终局收官。

### 3. 第三阶段：当前已落地工程底座（最新状态）
- 模块化工程：`Vite 8 + React 19 + TypeScript 7 + Tailwind CSS v4 + Zustand 5`；
- 生产素材解耦：全部 **366 张运行时 JPG（65.8 MB）** 与 **Web Audio 无缝循环 BGM（大地图与开封府《东京梦华》）** 存放于 `public/assets/`，并将 **364 张高清母版原画（373.9 MB）** 归档于 `assets_raw_masters/`；
- 结构化数据库管线：`scripts/compile_game_db.py`（`npm run build:db`）从七大 Markdown 设定集幂等编译出 `idRegistry.json`、`regions.json`（43）、`buildings.json`（268）、`martial_arts.json`（216）、`weapons.json`（100）、`npcs.json`（1,000）；
- 角色面板与四库系统：实装全局常驻顶部状态栏、1.5× 宽幅十卷枢机菜单（独立【壹·主角面板】【贰·披挂与武学：7 槽披挂 + 6 槽武学运使】【叁·行囊四库】），以及 **100 种百兵谱武器、100 卷典籍书画、30 种丹药毒物、50 件雅器百工** 与 **216 门武学 1~10 重数值及 37 门天阶特效**。

---

## 二、 关键技术细节与工程备忘（避坑指南）

1. **Zustand Store 与轻装存档策略**：
   - 全局状态集中在 `src/store/useGameStore.ts`，持久化结构定义在 `src/types/game.ts` 的 `SerializableGameState`，读写逻辑在 `src/utils/saveManager.ts`。
   - **开发期不背旧存档历史包袱**：早期旧测试存档库已通过 `purgeLegacySaveDatabases()` 自动清理；后续修改核心状态时无需编写复杂的旧版存档兼容迁移逻辑，直接同步更新 `SerializableGameState` 与 `CURRENT_SAVE_SCHEMA_VERSION` 即可。
2. **三层地图坐标与最末层人物交互机制**：
   - 第一层 `WorldMapCanvas.tsx`（`viewMode === 'world'`）：基于 `worldBaseSvg.ts` 与 `worldGraph.json`，支持平移缩放、Dijkstra 最短耗时寻路、按时辰骑马推进与旷野原地露营（`campPos`）。
   - 第二层 `RegionMapCanvas.tsx`（`viewMode === 'region'`）：加载 38 张手绘全景或 `SvgRegionPanoramaFallback.tsx` 青绿矢量全景，叠加建筑多边形热点与牌匾；无子院的 130 座基础建筑在此层即为最末层，可交互驻留 NPC。
   - 第三层建筑内景（`viewMode === 'building'`）：在 `RegionMapCanvas.tsx` 内渲染 58 张手绘内景或 `SvgBuildingInteriorFallback.tsx` 宋式庭院，点击具体子建筑（414 处 `spots`）方展示并交互驻留该最末层点位的 NPC。
3. **音频自动发现机制（`bgmManager.ts`）**：
   - `vite.config.ts` 中的 `northernSongAudioManifestPlugin` 会在构建/开发时自动扫描 `public/assets/audio/{world,regions,characters,events}/` 下的编号曲目（`1.mp3`, `2.mp3`...），无需硬编码曲目表。
4. **美术严禁造假原则（用户明确要求）**：
   - 绝不允许用 Python PIL / Canvas 几何绘图脚本伪造地图或人物画作，也不允许把同一张人物立绘复制改名冒充两个不同 NPC ID。若启动 Backlog 补图，必须严格按 `.agents/skills/panorama-artist` 和 `.agents/skills/portrait-artist` 逐张独立生图并视觉核验。
5. **玩法引擎分层与可测试性（2026-11 重构）**：
   - 玩法逻辑统一位于 `src/engine/`，`src/utils/` 只保留素材、音频、存档等运行时工具；旧的 `utils/*` 转发文件已删除，新代码请直接从 `engine/*` 导入。
   - 战后结算拆为 `engine/combat/settlement.ts`：`buildCombatDeathPayload()`（按 `duelStakes` 查表）与有序规则表 `COMBAT_SETTLEMENT_RULES`；门派离派 / 开除统一走 `engine/sect/ranks.ts` 的 `resetSectMembership()`，切勿再手写字段重置。
   - 一次性受控标记（震慑 / 封穴 / 震腕）在**盲选决策之后**才清除（`round/initiative.ts`），否则 NPC 受控无效。
   - 全局玩法随机源 `gameRng` + `setGameRng()`；测试可整局播种。战阵毒药数值由 `EQUIPMENT_COMPENDIUM.md` 的 `poisonCombat` 规格编译生成。
6. **NPC 生死状态（存档 `M1.5.4`）**：
   - `deadNpcIds` 记录已身故的名录人物：生死决斗击杀（结算规则 `lifeDeathDuelKill`）或剧情效果 `markNpcsDead`。身故者从建筑名册、地图任务标记、驻留人数、游历宗师、江湖风闻与宗门大比对手池中移除，store 层 `openNpcInteraction` / `startNpcCombat` 也会拒绝；群侠图鉴标注【已故】。
   - 掌门身故后门派事务由 `getSectContactNpcId()` 交给在世最高阶门人代掌（如星宿派弑师后由大师兄代办）；`killedDingChunqiu` 作为既成史实在离派 / 重入时保留。
   - 《太行剿匪 · 叁》第三十六幕「鬼头刀落绝匪踪」以 `markNpcsDead` 将绿林盟（`SECT-18`）中**太行山一支** 35 人判定身故（名单 `TAIHANG_WING_NPC_IDS` 写在 `jinjunTaihangQuest3.scenes.ts`：身份写明「太行」者，及驻河北太行山 / 真定 / 大名与潼关、身份未写明「京东」者）；**京东水寨一支** 10 人（晁云飞、阮惊涛等）存活，并由其在世最高阶者代掌绿林盟门派事务。旧的 `taihang_bandits_eradicated` 旗标不再用于过滤人物（仅保留剧情判定与清退太行游历宗师），图鉴中身故者标注【已故】。
   - 《太行剿匪 · 贰》第三十八幕「市曹十斩」以 `markNpcsDead` 处决十名太行山中层头目（名单 `TAIHANG_EXECUTED_TEN_NPC_IDS`，写在 `jinjunTaihangQuest2.scenes.ts`）。**问斩名单不得含京东水寨一支或驻济南人物**：原剧本中的裴弘璋、晁霖浪、鲁豪朗（京东）、裴烟音（驻济南）与石寒乾（驻济南）已在壹、贰两部中替换为新增的太行头目 `NPC-1048..1052`（秦寒岳、申屠霖、焦弘彪、邬烟娘、牛豪山，二流，沿用原角色战斗数值，使用门派模板立绘）。被替换的五人仍按原设定驻守各地。
   - 尚未覆盖：剧情任务若以已故人物为必经对象（`targetNpcMatch`）会无法推进，新写任务需自行避开或提供替代分支。

7. **P0 阻断修复约定（2026-11）**：
   - `targetNpcMatch` 同时配置 `npcIds` 与 `dynamicActorIds` 时为「命中任一」。
   - 三流升二流举荐帖：本门第 4 阶长老对话底栏直接提供「奉银求取举荐帖」按钮（不再要求经由掌门的门派事务面板）。
   - 宗门大比会期为二月初一至初十（`SECT_TOURNAMENT_WINDOW_DAYS`），不再设二流境界上限；闭关快进跨入会期时，未参赛的道剑门派弟子会自动收功并收到提示。
   - 入门赠装每派一生只发一次（`questState.flags['sect_starter_gear_granted_<sectId>']`）。
   - 官道行军以子时为界跨日（`stepTravelTick`），扎营再出发无法绕开日历与粮草消耗。
   - 身死（`gameOver`）后系统菜单仅保留【读取存档】【设置】，`saveToSlot` 一律拒绝写入。
   - 剧情幕次的可见抉择统一由 `getVisibleStoryChoices()` 计算；全部被隐藏时按无抉择直接续行。

8. **P1 / P2 修复约定（2026-11）**：
   - 战中丹药毒物只在真正轮到出手时才扣减（`lastRoundSummary.playerItemUsedId`）；天 / 地阶永久灵丹战中服用同步回复当前气血内力。
   - 出招者被反震致死后，连击、吸血、点穴等出招方命中后特效不再发动；被破招打断不占用禁连发同招锁；迟缓 / 滞气到期清零幅度。
   - `getEffectiveTalents(talents, equipped, equippedArts?, learnedArts?)`：计入配饰 +颜值 与运使武学 +根骨 / +颜值；配饰的 +颜值 不再混入十艺字典。
   - 武学属性门槛（`statRequirements`）在门派传功、秘籍展卷与装配武学时统一由 `checkPlayerArtRequirements()` 校验；剧情强制传授不受限。
   - 大相国寺拍场排除全部有主孤品（`UNIQUE_ARTIFACT_MAP`），兵甲 / 灵丹两栏以良阶上品补位；不可叠放物品行囊中至多一件。
   - 重开新局以 `createInitialStoreData()` 整体重置，只保留存档槽与界面偏好；行军途中存档记为原地扎营。
   - 战斗 / 剧情的捕获阶段快捷键经 `shouldIgnoreOverlayHotkey()` 守门（菜单、图鉴打开或正在输入时放行）；战斗拟音与背景雅乐共用一个 AudioContext。

9. **数值调优与新玩法约定（2026-11 · 存档 `M1.5.5`）**：
   - 创角三维共 `240` 点、单项 `70~90`；十艺共 `100` 点、单项至多 `40`。闭关曲线改为 `0.35 + 3.65·(T/100)^3`。
   - 骑乘时【骑术】抵消塞外 / 蜀道地形减速（`getRidingTerrainCoeff`，满级抵消 60%）；【拳掌】大类本能「绵劲透甲」无视目标 20% 护体防御（`PALM_INSTINCT_PIERCE_PCT`）。
   - 战中服丹施毒每场至多 `COMBAT_ITEM_USE_LIMIT = 3` 次（`CombatantState.itemUses`），不再解除禁连发同招锁；毒粉须过敌方闪避检定。
   - 20 卷凡品武学秘籍（`ITM-SCR-061..080`）由 `spotShops.ts` 投放至 6 座州府书院书肆与 6 家三流武馆对外谱架。
   - 州府衙门【悬赏缉凶榜】：`engine/world/yamenBounty.ts`（每城每月丙 / 乙 / 甲三张确定性榜文），状态 `activeYamenBounty` / `yamenBountyDoneIds`，战斗 `duelStakes: 'yamen_bounty'`（擒拿切磋，失手不致命），结算规则 `yamenBounty`。
   - 门派排他：`engine/sect/exclusivity.ts`——已身属别派或少林杂役期时，他派入门线（`rules.entryQuestId`，`*-REFERRAL` 除外）的触发器、驻地行动与 `startQuest` 一律不生效；任务 `joinSect` 拒绝覆盖现有门派（官面转任 `allowOfficialTransfer` 与 `SECT_ENTRY_TRANSFER_SOURCES` 所列带艺投师除外），拜师成功后自动作罢其余门派入门线。门派事务面板路径已经 `evaluateSectEntry` 校验，传 `skipExclusivityCheck`。
   - 同地多条弹窗类 `locationTriggers`（`effectsOpenModal`）每次到访只放行第一条，其余不消耗 `onceFlag`、留待下次到访。
   - 剧情切磋战未设 `onEscape` 时默认禁止脱战；平局未设 `onDraw` 时走 `onLose`。《太行剿匪·第三部》三场关键战改为 `story_trial`（败阵不致命，保留整备重试分支）。

---

## 三、 下一步行动建议

推荐按以下顺序推进主线可玩闭环：
1. **`[M1-1]` 开局创角与出身系统**：将主角姓名、性别、立绘、出身（寒门游侠 / 将门遗孤 / 书院学子 / 塞外孤儿）、先天三维 `根骨/悟性/颜值` 与初始门派/落脚城池写入 `useGameStore`，制作开局古籍创角卷轴。
2. **`[M1-4]` 基础五建筑功能与 30 门派三级拜师出师体系**：实装客栈投宿回血回体、衙门缉凶护镖悬赏、武馆/书院修习，以及三流武馆 → 二流世家 → 一流宗派逐级引荐拜师传功。
3. **`[M2]` 同步盲选指令 + 身法先后手回合战斗系统**：实装【出招 / 防御 / 逃跑】三择一同步亮牌博弈 UI、实战四维与 37 门天阶特效结算引擎、NPC 对决 AI 与切磋/死斗结算。
4. **`[M1-3c]` 其余六槽披挂与城市商贸买卖**：补齐服饰、鞋履、弓箭、双配饰、坐骑并实装铁匠铺/马市/药铺/书肆交易。
