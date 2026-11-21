---
name: quest-author
description: 为《北宋立志传》设计并实装声明式门派入门、师门要务、州府风波或江湖奇遇剧情任务链（双文件懒加载脚本、门派规则与任务树挂载、待补绘插画/立绘台账登记、文档同步与零断链校验）。新增或重构剧情任务时调用。
---

# 《北宋立志传》剧情任务编纂与规范化实装指南 (`/quest-author`)

当需要新增或重构门派入门（`sect_entry`）、师门要务（`sect_mission`）、州府风波（`city_story`）、主线（`main_story`）或江湖奇遇（`adventure`）任务链时，严格遵循本五步标准流程与七条工程红线。

---

## 一、 五步标准实装流程

### 第 1 步：前置物品、披挂与人物入库（按需）
1. **任务信物 / 秘境舆图 / 专属装备**：
   - 凡需新增 `ITM-MSC-*` 信物、舆图或专属兵甲/丹药，**必须先写入 `docs/EQUIPMENT_COMPENDIUM.md`**，再运行 `npm run build:db`（由 `scripts/compile_game_db.py` 生成 `src/data/nonEquipmentItems.json` / `gear.json` / `weapons.json`）；**严禁手改 `src/data/*.json` 或仅写在 `src/data/itemsDb.ts`**。
   - 不可赠予 NPC 的关键任务信物同步加入 `src/data/itemsDb.ts` 的 `NON_GIFTABLE_KEY_ITEM_IDS`；用于解锁秘境区域的舆图同步在 `REGION_UNLOCK_MAP_REQUIREMENTS` 登记。
2. **任务出场人物**：
   - 临时龙套、敌对死士或一次性过场角色，优先使用任务内 `DynamicQuestNpc`（`ACT-*`）或对白 `{ kind: 'custom' }` 发言人，避免改动千人静态库。
   - 仅确需新增常驻沙盘编目人物时，才修改 `docs/CHARACTER_COMPENDIUM.md` 与 `src/data/idRegistry.json` 并运行 `npm run build:db`。

### 第 2 步：编写双文件声明式任务脚本
在 `src/data/quests/{sects,cities,adventures}/` 下成对新建 `<name>Quest.ts` 与 `<name>Quest.scenes.ts`：
1. **`<name>Quest.ts`（轻量元数据与入口）**：
   - 定义 `QuestDefinition`（`id`、`title`、`category`、`factionId`、`regionId`、`startCondition`、`summary`、`initialStepId`、`steps`、`locationTriggers`、`npcActions`、`spotActions` 等）。
   - 末尾使用动态导入懒加载剧本，避免首屏打包膨胀：
     ```ts
     loadScenes: () => import('./<name>Quest.scenes').then((m) => m.SCENES),
     ```
2. **`<name>Quest.scenes.ts`（对白、分支与结算）**：
   - 导出 `export const SCENES: Record<string, StorySceneDef>`。
   - 在高潮幕 `scene` 或 `beat` 中预埋 `illustrationUrl: '/assets/quests/<slug>.jpg'` 与 `illustrationCaption`（`StorySceneModal.tsx` 在原画未落盘前会自动渲染「绘卷留白」古风占位框，后期补图即自动加载）。
3. **注册导出**：
   - 将任务数组加入 `src/data/quests/index.ts` 的 `QUEST_REGISTRY`。
   - 运行时进度统一存储在 `QuestRuntimeState` 通用容器中，**无需改动存档结构或递增存档版本号**。

### 第 3 步：门派规则与生涯任务树挂载
1. **门派入门线绑定（`category: 'sect_entry'`）**：
   - 必须在 `src/engine/sect/rules.ts` 的 `BASE_SECT_RULES[sectId]` 配置 `entryQuestId`、`autoCompleteEntryQuestOnJoin: true` 与 `bespokeEntryGuide`。
2. **带艺投师白名单同步**：
   - 若该门派入门线允许他派弟子带艺投师（无论条件中使用 `notInAnySect.allowTransferFromSectId`，还是在 `any` 分支中显式写 `{ type: 'inSect', sectId }`），**必须同步登记到 `src/engine/sect/exclusivity.ts` 的 `SECT_ENTRY_TRANSFER_SOURCES`**，否则会被门派排他外闸（`getSectEntryQuestBlockReason`）拦截。
3. **佛门剃度还俗兼容**：
   - 佛教门派落发受戒统一使用 `{ type: 'ordainShaolinMonk', dharmaName, portraitId: 'hero_02_shaolin', sectId }`（引擎会自动记录俗家姓名与原立绘、保护女性主角立绘不被男僧覆盖，并在 `leaveSect` 时自动还原）。
4. **生涯任务树视图（`src/engine/quest/questGraphBuilder.ts`）**：
   - 检查 `deriveSealChar()` 是否已有对应门派/卷宗印章单字；若有新信物/舆图前置关联，按需补充虚线/实线推导边。

### 第 4 步：分级必更文档矩阵与三类美术台账登记

#### 1. 文档更新矩阵
| 级别 | 文档路径 | 更新要求 |
| :---: | :--- | :--- |
| **每次必更** | `docs/ROADMAP_AND_TODO.md` | 在对应阶段（如 `[M1-4]` / `[M3-4]` / `[M5-1]`）补充任务名、ID、幕数、核心分支与奖励摘要；若完成整个子里程碑则勾选 `[x]`。 |
| **每次必更** | `docs/MISSING_QUEST_ILLUSTRATIONS.md` | 只要脚本中预埋了 `illustrationUrl`，必须在第一章总表登记 `CG-QST-XXX` 行（未落盘标 `[ ]`，已落盘标 `[x]`），并在第二章补齐剧情语境、北宋考据要素与 `16:9` 英文 Prompt。<br>*遵循主支线解耦铁律：除非用户明确要求当场生图，否则仅预埋路径与登记台账。* |
| **按需必更**<br>（门派相关） | `docs/MARTIAL_ARTS_SECTS.md` | 新增或调整门派入门、晋升、门规排他或带艺投师条件时同步更新，并执行 `npm run build:db`。 |
| **按需必更**<br>（含新物品/披挂） | `docs/EQUIPMENT_COMPENDIUM.md` | 新增信物、舆图、丹药或专属神兵披挂时先行写入本卷，并执行 `npm run build:db`。 |
| **按需必更**<br>（配角/模板） | `docs/MISSING_NPC_PORTRAITS.md` | 若重度使用尚无专属立绘的编目 `NPC-xxxx`（单任务出场 ≥5 次，或外貌如矮胖/独臂/老幼等与门派模板不符），或需新增通用模板 `tpl_*`，写入本台账追踪。 |
| **里程碑级更新** | `docs/HANDOFF_CONTEXT.md` / `PROJECT_GUIDE.md` | 仅在新增通用 `QuestCondition` / `QuestEffect` 机制或完成整批任务合流时更新，单条常规任务无需修改。 |

#### 2. 三类任务美术规格速查（如需生成图片，调用 `/portrait-artist`）
| 美术类别 | 触发标准 | 尺寸、格式与落盘路径 | 工程接入动作 |
| :--- | :--- | :--- | :--- |
| **① 剧情插画 CG**（`16:9` 横幅） | **每个任务至少 `1` 张配图，且每有 `10` 幕剧情至少多配 `1` 张**（公式：`≥ 1 + ⌊幕数 / 10⌋`，即 1~9 幕 ≥ 1 张、10~19 幕 ≥ 2 张、20~29 幕 ≥ 3 张、30~39 幕 ≥ 4 张，以此类推） | 母版 `assets_raw_masters/quests/<slug>.png`；压缩图 `public/assets/quests/<slug>.jpg`（250~450 KB，严禁 `> 4.5 MB`） | 预埋 `illustrationUrl` 即可，图片落盘自动挂载 |
| **② 编目任务 NPC 专属立绘**（`3:4` 透明抠图） | 单任务出场 ≥7 次核心配角，或外貌与门派默认模板明显不符者 | **无需绘制 `1:1` 头像！** 仅产出 1 张透明抠图 `public/assets/characters/cutouts/fullbody/NPC-XXXX.webp`（`768×1024`，头脚留白 6%~10%） | 登记 `src/data/cutoutMetrics.json`（前景高度占比），执行 `npm run build:db` |
| **③ 通用模板 `tpl_*`**（双图） | 极少新增；仅当现有模板无法覆盖全新高频人群时 | 必须成对独立生图：`templates/tpl_<name>_av.jpg`（`512×512`）+ `templates/tpl_<name>_fb.jpg`（`768×1024`） | 登记 `src/utils/portraitFallback.ts` 的 `KNOWN_AVATAR_COUNTERPARTS` |

### 第 5 步：全链路校验验收
依次执行以下命令并确认零报错：
```bash
npm run lint && npm test && npm run build
```

---

## 二、 九条代码与叙事红线（自检清单）

1. **动态时空与性别插值**：正文中纪年一律使用 `{reignYear}`（**严禁硬编码「皇祐二年」**）；称呼分支使用 `{gender:少侠|女侠}` / `{gender:师弟|师妹}`；跨任务记忆使用 `{ifQuestDone:QST-ID|曾历文案|初见文案}`、`{ifFlag:...}`、`{ifSect:...}`；对白中严禁出现“根骨≥85 / 气血+100”等现代数值术语。
2. **禀赋门槛上限**：入门任务链（`QST-SECT-*-ENTRY`）中的 `talentAtLeast.min` **严禁超过 `90`**（创角单项上限），高阶分支应保留零门槛赤诚兜底路径。
3. **银钱与属性禁区**：银两奖励严格锚定 `docs/GAME_MECHANICS.md` 5.2 节门派月俸基准；**严禁使用 `modifyTalent` 或 `modifyBaseStat`** 直接增减先天三维或裸四维；**单条任务任意单一通关路径累计永久十艺增幅（含 `modifySkill` 及经 `giveItem` 发放的永久十艺道具 `useEffect`）总和严禁超过 `3` 点**（`scripts/verify_quests.mjs` 与 `questValidation.test.ts` 强制校验）。
4. **NPC 生死闭环**：凡可在大地图/沙盘被挑战击杀的关键接引人，任务 `startCondition` 必须加 `{ type: 'npcAlive', npcId, npcName }`；剧情明确击毙或处斩名录 NPC 时，必须配合 `{ type: 'markNpcsDead', npcIds: [...] }`。
5. **子景点精确挂载**：凡目标建筑存在室内子景点（`bldg.interior.spots.length > 0`），`spotActions` 与 `targetLocation` 必须明确指定 `spotId`，否则玩家在游戏内无法交互触发。
6. **自定义立绘真实存在**：`{ kind: 'custom' }` 对白发言人、`spawnDynamicActor` 动态角色及自定义战斗对手所填 `portraitUrl` / `avatarUrl` 必须在 `public/` 下真实存在，且模板 `_av` 与 `_fb` 保持一致。
7. **战后结算标签注册**：若剧情战斗使用了新的 `duelStakes` / `duelStakesTag`，须同步于 `src/engine/combat/settlement.ts` 注册终局文案与结算规则。
8. **任务配图数量下限**：每条任务链至少预埋 `1` 张 `illustrationUrl`（`16:9` 剧情 CG），且每有 `10` 幕剧情至少增加 `1` 张（`≥ 1 + Math.floor(幕数 / 10)`）；所有预埋路径须同步登记至 `docs/MISSING_QUEST_ILLUSTRATIONS.md`。
9. **五派白纸入门铁律**：**青城（`SECT-14`）、华山（`SECT-05`）、泰山（`SECT-06`）、真武（`SECT-08`）、峨眉（`SECT-07`）** 入门 `startCondition` 必须同时包含 `{ type: 'neverJoinedAnySect' }`（从未加入过任何门派）与 `{ type: 'noLearnedArtAtOrAboveTier', tier: '良品下品' }`（未修习任何良品及良品以上武学）。
10. **主线内功实力覆盖铁律（严禁强逼肝满淘汰心法）**：校验主线任意必胜战（非 `survive_rounds` 且非败北推进战）对手境界时，按玩家当前已授最高内功的合理养成等级计算可达境界——**凡品 / 良品内功按 Lv.6、地阶内功按 Lv.8、天阶内功按 Lv.9**；对手境界**严禁超过**该可达境界（若本卷才授新内功，须在传功后通过 `setStep` 停步留出闭关窗口，或在更早卷数提前传授并用 `replaceArtIds` 替换旧心法；由 `src/engine/__tests__/sectQuestDifficulty.test.ts` 自动巡检）。
