# 《北宋立志传》(Northern Song Chronicles) — Agent 工程守则与全局上下文

> 本文件（`AGENTS.md` / `.gemini/GEMINI.md`）供本地或云端 Antigravity Agent 自动读取，确保跨对话窗口无缝继承《北宋立志传》的全部历史演进、设计铁律、数据架构与待办进度。

---

## 一、 项目核心定位与时空锚点（严禁偏离）

1. **游戏名称**：《北宋立志传》（`Northern Song Chronicles`，致敬《太阁立志传》×《金庸群侠传》的开放世界历史武侠 RPG）。
2. **唯一时空锚点**：**公元 1050 年（北宋仁宗皇祐二年 · 正月初一开局）**。
   - **朝堂人物锚点**：宋仁宗赵祯（`NPC-0001`）、慈圣皇后曹丹姝（`NPC-0002`）、范仲淹（`NPC-0009`）、欧阳修（`NPC-0012`）、包拯（`NPC-0013`）、狄青（`NPC-0031`）、年轻的苏轼/王安石/司马光、以及毕昇/苏颂/沈括/贾宪等北宋科技巨匠在世。**严禁混淆为宋神宗熙宁/元丰或靖康时代！**
   - **武林格局锚点**：《天龙八部》黄金前传时代——少林（玄慈/玄澄/扫地僧法空）与丐帮（汪剑通/少年乔峰）同气连枝抗辽；逍遥三老（无崖子/天山童姥巫行云/李秋水）健在；慕容博、萧远山潜伏；大辽四京、西夏一品堂、吐蕃鸠摩智、大理天龙寺段氏并立；另有独立建制的大宋禁军（王德用/狄青领衔）拱卫皇城；辅以 12 个二三流世家镖盟与市井武馆，构成 33 派三级格局。
3. **双层架构哲学**：
   - **确定性量化骨架（M0~M3 优先跑通）**：三维先天禀赋（`根骨/悟性/颜值`，**仅影响修炼速度/瓶颈/奇遇/社交，严禁代入战中伤害公式**） + 四维实战属性（`气血/身法/内力/抗性`，直接驱动**同步盲选指令［出招/防御/逃跑］+ 身法先后手回合制**战斗结算） + 十艺百工（`骑术/算术/经义/策论/诗词/琴/棋/书/画/辩才`）。
   - **LLM 动态模拟血肉（M4 接入）**：在确定性数值与 JSON Schema 护栏之上接入自由交谈、DM 自由行动裁判与月度《江湖风闻录》，杜绝数值崩坏。

---

## 二、 当前里程碑进度（Single Source of Truth）

- **已完成底座**：**M0 工程 / M1 养成经济 / M2 同步盲选战斗 / M3-1 千人入城 / M3-3a《天下风云榜》/ 全部基础美术 / 4 套一流大派全本史诗 ✅**
  - `[工程与数据]` `Vite 8 + React 19 + TypeScript 7 + Tailwind CSS v4 + Zustand 5`，`public/assets/` 零 Base64 懒加载；`src/data/idRegistry.json` 收录 43 地区、33 武林门派 + 11 朝堂四夷组织、**251 门武学**、**103 件武器**与 **1,059 名 NPC**（100% 挂载最末层建筑，43/43 地区全景与 268/268 建筑内景全覆盖）；`IndexedDB + localStorage` 跨版本存取档（当前 `M1.5.5` Schema）。
  - `[玩法与剧情]` 创角、九槽披挂与六槽武学、三场所按日闭关与战斗经验破境、商贸经济、同步盲选六择一回合战斗与 37 门天阶特效、《天下风云榜》百强武道榜、**184 条声明式剧情任务链**（12 派二三流全通；开封府/大宋禁军、华山派、嵩山少林寺、终南隐宗 4 套一流全本完结；其余 10 派已开放一流大派入门线完结；除 `SECT-17` 外所有一流大派均实行任务晋升制，星宿派永禁再入中原正派）。
  - `[资产归档]` 未压缩高清母版原画归档于 `assets_raw_masters/`，早期原型与画师规范归档于 `legacy_prototypes_and_tools/`。
- **当前主线切入点（Phase P1）**：**补齐其余 10 大已开放一流门派 Lv.1→Lv.5 全本剧情闭环**（首批优先道剑四派：**真武道宗 `SECT-08` / 峨眉派 `SECT-07` / 泰山派 `SECT-06` / 青城派 `SECT-14`** → 次批丐帮/清凉寺/南少林 → 第三批唐门/铁掌/星宿），随后进入 **Phase P2（沙盘社交与奇遇）→ P3（7 大 DLC 势力）→ P4（LLM 引擎）→ P5（双终局与发布）**。
  - 完整进度矩阵见 `docs/ROADMAP_AND_TODO.md`。

---

## 三、 研发与工程铁律（必读约束）

1. **两条防跑偏铁律**：
   - **主支线彻底解耦（暂停散装生图）**：5 座新辟州府全景已有 `SvgRegionPanoramaFallback.tsx` 青绿营造矢量兜底，剩余 89 座建筑内景已有 `SvgBuildingInteriorFallback.tsx` 矢量兜底，未绘制独立原画的 NPC 已有 12 套门派模板与古籍名牌兜底。在 **M1 ~ M3 核心可玩闭环** 跑通前，不要把主线精力耗在批量补图上（除非用户明确输入 `/panorama-artist` 或 `/portrait-artist` 指令要求补图）。
   - **先骨骼跑通，后上 LLM**：M1（创角与养成经济）→ M2（同步盲选三择一武侠回合战斗）→ M3（千人社交与风云榜）必须做到纯本地断网也完整好玩；M4 再接入大模型接口。
2. **数据单一事实源（Markdown -> Python -> JSON）**：
   - 世界观与数值设定位于 `docs/GAME_MECHANICS.md`、`docs/MARTIAL_ARTS_SECTS.md`、`docs/MARTIAL_ARTS_COMPENDIUM.md`、`docs/MARTIAL_ARTS_STATS.md`、`docs/EQUIPMENT_COMPENDIUM.md`、`docs/REGIONAL_MAPS_AND_BUILDINGS.md`、`docs/CHARACTER_COMPENDIUM.md`。
   - 批量调整设定或新增字段时，优先更新对应 Markdown 与 `scripts/compile_game_db.py`，运行 `npm run build:db` 重新生成 `src/data/*.json`，**切勿手改大型生成产物 JSON 导致下次编译被覆盖**。
   - 新增任何地区、门派、建筑、武学或人物引用时，必须严格对齐 `src/data/idRegistry.json` 中的标准 ID（如宋辽夏 24 城统一使用三字府名：`开封府`、`洛阳府`、`广州府`、`秦州府`、`析津府`、`辽阳府`、`兴庆府` 等）。
3. **美术与静态资源规范（含单文件离线包兼容铁律）**：
   - **严禁在 `.ts/.tsx/.json` 代码中内嵌 Base64 图片字符串**；所有运行时图片与音频统一放入 `public/assets/{regions,buildings,characters,items,quests,audio}/`（未压缩母版统一归档于 `assets_raw_masters/`），按需懒加载。
   - **静态路径严禁裸绑**：组件渲染任何 `/assets/...` 图片时必须走 `<ManagedAssetImg>`、`<CutoutPortraitImg>`、`useLazyImage()` 或 `resolveAssetUrl()`（切勿直接写 `<img src={rawUrl} />` 或在 CSS 中写 `url(/assets/...)`）；访问 `localStorage` / `indexedDB` 必须包裹 `try/catch`，确保 `npm run build:artifact` 生成的单文件 HTML 在 `file://` 与严格沙箱预览下 100% 正常可玩。
   - 若用户要求新生成全景图、角色立绘或剧情插画，**严禁使用 PIL/Canvas/SVG 脚本程序化伪造、镜像复用或裁剪拼贴原画**，必须遵循 `.agents/skills/panorama-artist/SKILL.md` 与 `.agents/skills/portrait-artist/SKILL.md` 规范逐张调用 `generate_image`。
4. **存档状态同步与跨版本兼容（必须保留玩家旧档）**：
   - 修改 `src/store/useGameStore.ts` 中的核心状态字段时，同步更新 `src/types/game.ts` 中的 `SerializableGameState`、`src/store/storeHelpers.ts` 的序列化与初始值，以及 `src/utils/saveManager.ts` 的读档净化（缺失字段一律回填默认值）。
   - 存档结构变化时递增 `CURRENT_SAVE_SCHEMA_VERSION`（`src/utils/saveStorageProbe.ts`），**同时**把新版本号追加到 `SAVE_SCHEMA_HISTORY` 末尾，并在 `src/utils/saveMigrations.ts` 的 `SAVE_MIGRATIONS` 追加一条迁移步骤（改名 / 删除 / 语义变化的字段在此处理）；`saveMigration.test.ts` 会校验两者一一对应。
   - 严禁自动删除读不了的存档（损坏或出自更新版本者原样保留）；严禁再引入「仅支持最新版本」的版本硬校验。
5. **代码质量与单文件包防回归校验**：
   - 每次完成功能修改后，运行 `npm run lint`（含 `oxlint` + `check_artifact_guardrails.mjs` 静态防回归护栏）与 `npm run build`（`tsc -b && vite build`）确保零类型错误、零 Lint 警告、零裸资源路径违规。
   - 若修改了构建配置、资源加载器（`assetLoader.ts` / `bgmManager.ts` / `saveManager.ts`）或大批量新增素材，同步运行 `npm run build:artifact && npm run verify:artifact` 执行无头浏览器双模式（`file://` + 严格 CSP 沙箱）端到端冒烟验证。

---

## 四、 关键文档与专属技能导航

| 用途 | 路径 / 命令 |
| :--- | :--- |
| **全局路线图与待办看板** | `docs/ROADMAP_AND_TODO.md`（每完成一个子里程碑请同步勾选 `[x]`） |
| **跨会话历史背景交接录** | `docs/HANDOFF_CONTEXT.md`（记录多分支合流脉络与关键设计决策） |
| **中后期规划与系统思考录** | `docs/DESIGN_NOTES_AND_FUTURE_PLAN.md`（非 Todo 的系统深化构想、经济社交循环与演进参考） |
| **代码模块与素材全索引** | `PROJECT_GUIDE.md` |
| **核心机制与公式总纲** | `docs/GAME_MECHANICS.md` |
| **33 武林门派与 11 组织全典** | `docs/MARTIAL_ARTS_SECTS.md` |
| **246 门武学名录与前置全典** | `docs/MARTIAL_ARTS_COMPENDIUM.md` |
| **246 门武学 1~10 重战斗数值表** | `docs/MARTIAL_ARTS_STATS.md` |
| **皇祐披挂总纲（百兵谱）** | `docs/EQUIPMENT_COMPENDIUM.md` |
| **43 地区与 147 特殊建筑** | `docs/REGIONAL_MAPS_AND_BUILDINGS.md` |
| **1,052 名北宋历史与江湖人物** | `docs/CHARACTER_COMPENDIUM.md` |
| **待补绘剧情插画（CG）台账** | `docs/MISSING_QUEST_ILLUSTRATIONS.md` |
| **待补绘人物立绘与模板台账** | `docs/MISSING_NPC_PORTRAITS.md` |
| **本地接手/恢复上下文技能** | 在聊天框输入 `/resume-context`（对应 `.agents/skills/resume-context/SKILL.md`） |
| **数据库重编与校验技能** | 在聊天框输入 `/rebuild-db`（对应 `.agents/skills/rebuild-db/SKILL.md`） |
| **剧情任务编纂与挂载技能** | 在聊天框输入 `/quest-author`（对应 `.agents/skills/quest-author/SKILL.md`） |
| **宋风全景/建筑画师技能** | 在聊天框输入 `/panorama-artist`（对应 `.agents/skills/panorama-artist/SKILL.md`） |
| **北宋人物立绘与剧情插画技能** | 在聊天框输入 `/portrait-artist`（对应 `.agents/skills/portrait-artist/SKILL.md`） |
