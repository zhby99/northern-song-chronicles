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
  - 按故宫南薰殿帝后名臣像、《宋史》记载与宋代服制考据，逐张独立生成了 **128 位核心角色（含 100/100 全员历史名人 + 28 位绝世大宗师与名侠）的 `1:1` 头像与 `3:4` 全身立绘（共 256 张）**，以及 12 套门派/行当通用全身模板。

### 2. 第二阶段：防跑偏铁律与战斗机制锚定
- **铁律一（暂停散装生图，主支线解耦）**：5 座新城全景（`SvgRegionPanoramaFallback.tsx`）、剩余 80 座建筑内景（`SvgBuildingInteriorFallback.tsx`）和未绘独立原画的 NPC（12 套门派模板 + 宋风古籍名牌）均已有完善矢量兜底，把补图放入非阻塞 Backlog，全力攻克代码可玩性。
- **铁律二（先骨骼跑通，后上 LLM）**：M0（工程合流）→ M1（创角·武学披挂·建筑拜师与商贸）→ M2（**同步盲选三择一［出招/防御/逃跑］+ 身法先后手回合战斗**）→ M3（千人社交与风云榜）先做成不依赖大模型也能从头玩到尾的扎实单机 RPG，M4 再接入 LLM 三大引擎，M5 做双终局收官。

### 3. 第三阶段：当前已落地工程底座（最新状态）
- 模块化工程：`Vite 8 + React 19 + TypeScript 7 + Tailwind CSS v4 + Zustand 5`；
- 生产素材解耦：全部 **364 张运行时 JPG（65.4 MB）** 与 **Web Audio 无缝循环 BGM（大地图与开封府《东京梦华》）** 存放于 `public/assets/`，并将 **362 张高清母版原画（373.9 MB）** 归档于 `assets_raw_masters/`；
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

---

## 三、 下一步行动建议

推荐按以下顺序推进主线可玩闭环：
1. **`[M1-1]` 开局创角与出身系统**：将主角姓名、性别、立绘、出身（寒门游侠 / 将门遗孤 / 书院学子 / 塞外孤儿）、先天三维 `根骨/悟性/颜值` 与初始门派/落脚城池写入 `useGameStore`，制作开局古籍创角卷轴。
2. **`[M1-4]` 基础五建筑功能与 30 门派三级拜师出师体系**：实装客栈投宿回血回体、衙门缉凶护镖悬赏、武馆/书院修习，以及三流武馆 → 二流世家 → 一流宗派逐级引荐拜师传功。
3. **`[M2]` 同步盲选指令 + 身法先后手回合战斗系统**：实装【出招 / 防御 / 逃跑】三择一同步亮牌博弈 UI、实战四维与 37 门天阶特效结算引擎、NPC 对决 AI 与切磋/死斗结算。
4. **`[M1-3c]` 其余六槽披挂与城市商贸买卖**：补齐服饰、鞋履、弓箭、双配饰、坐骑并实装铁匠铺/马市/药铺/书肆交易。
