# 《北宋立志传》(Northern Song Chronicles) — Agent 工程守则与全局上下文

> 本文件（`AGENTS.md` / `.gemini/GEMINI.md`）供本地或云端 Antigravity Agent 自动读取，确保跨对话窗口无缝继承《北宋立志传》的全部历史演进、设计铁律、数据架构与待办进度。

---

## 一、 项目核心定位与时空锚点（严禁偏离）

1. **游戏名称**：《北宋立志传》（`Northern Song Chronicles`，致敬《太阁立志传》×《金庸群侠传》的开放世界历史武侠 RPG）。
2. **唯一时空锚点**：**公元 1050 年（北宋仁宗皇祐二年 · 正月初一开局）**。
   - **朝堂人物锚点**：宋仁宗赵祯（`NPC-0001`）、慈圣皇后曹丹姝（`NPC-0002`）、范仲淹（`NPC-0009`）、欧阳修（`NPC-0012`）、包拯（`NPC-0013`）、狄青（`NPC-0031`）、年轻的苏轼/王安石/司马光、以及毕昇/苏颂/沈括/贾宪等北宋科技巨匠在世。**严禁混淆为宋神宗熙宁/元丰或靖康时代！**
   - **武林格局锚点**：《天龙八部》黄金前传时代——少林（玄慈/玄澄/扫地僧法空）与丐帮（汪剑通/少年乔峰）同气连枝抗辽；逍遥三老（无崖子/天山童姥巫行云/李秋水）健在；慕容博、萧远山潜伏；大辽三府、西夏一品堂、吐蕃鸠摩智、大理天龙寺段氏并立。
3. **双层架构哲学**：
   - **确定性量化骨架（M0~M3 优先跑通）**：三维先天禀赋（`根骨/悟性/颜值`，**仅影响修炼速度/瓶颈/奇遇/社交，严禁代入战中伤害公式**） + 四维实战属性（`气血/身法/内力/抗性`，直接驱动 8×8 战棋结算） + 十艺百工（`骑术/医术/毒术/琴艺/棋艺/书道/丹青/经义/策论/诗词`）。
   - **LLM 动态模拟血肉（M4 接入）**：在确定性数值与 JSON Schema 护栏之上接入自由交谈、DM 自由行动裁判与月度《江湖风闻录》，杜绝数值崩坏。

---

## 二、 当前里程碑进度（Single Source of Truth）

- **已完成阶段**：**Phase M0 全部完成 ✅ · Phase M1-0 已完成 ✅**
  - `[M0-1]` 模块化前端工程：`Vite 8 + React 19 + TypeScript 7 + Tailwind CSS v4 + Zustand 5`，209 张运行原画抽离至 `public/assets/` 按需懒加载，代码包内嵌 Base64 为 `0 Bytes`。
  - `[M0-2]` 全局唯一标准 ID 字典：`src/data/idRegistry.json`（38 地区 `REG-01..38`、20 门派 `SECT-01..20`、11 朝堂四夷组织 `ORG-01..11`、216 武学 `MA-001..216`），1,000 名 NPC（`NPC-0001..1000`）零悬空引用。
  - `[M0-3]` 结构化数据库编译管线：`scripts/compile_game_db.py`（`npm run build:db`）将 `docs/*.md` 四大设定集一键编译为 `src/data/*.json` 与快速索引门面 `src/data/gameDb.ts`。
  - `[M0-4]` 三层空间导航与多槽位存取档：`天下舆图 (world) -> 38 地区等轴全景 (region) -> 123 座特殊建筑内景 (building: 58 手绘 JPG + 65 宋式营造 SVG 矢量内院兜底)`；基于 `IndexedDB + localStorage` 实装 1 自动槽 + 6 手动槽存取档与 `.json` 存档导入导出。
  - `[M1-0]` 全局顶部常驻状态栏（年月日十二时辰 + 气血/体能 + 资金/粮草）、主角面板可视化七槽位披挂区（`武器/服饰/鞋履/弓箭/配饰壹/配饰贰/坐骑`，第七槽坐骑直接驱动大地图行军速度）、行囊四库分类体系（`典籍书画/丹药毒物/雅器百工/行囊杂物`）与 `M1.0.0` 向后兼容存档 Schema。
  - `[资产归档]` 跨分支 204 张未压缩 ~1MB 高清母版原画归档于 `assets_raw_masters/`，早期原型脚本与画师 Agent 规范归档于 `legacy_prototypes_and_tools/`。
- **下一阶段切入点**：**Phase M1-1 ~ M1-5（开局创角、216 武学数值化与养成经济闭环）**
  - 详见 `docs/ROADMAP_AND_TODO.md` 中 `[M1-1]` ~ `[M1-5]` 任务拆解（开局创角 → 216 武学战斗数值补全 → 侠客面板 1内功+1轻功+4外功装配 → 商贸经济扩充 → 五大基础建筑功能与 20 门派拜师晋升）。

---

## 三、 研发与工程铁律（必读约束）

1. **两条防跑偏铁律**：
   - **主支线彻底解耦（暂停散装生图）**：剩余 65 座建筑内景已有 `SvgBuildingInteriorFallback.tsx` 矢量兜底，未绘制独立原画的 NPC 已有 12 套门派模板与古籍名牌兜底。在 **M1 ~ M3 核心可玩闭环** 跑通前，不要把主线精力耗在批量补图上（除非用户明确输入 `/panorama-artist` 或 `/portrait-artist` 指令要求补图）。
   - **先骨骼跑通，后上 LLM**：M1（养成经济）→ M2（8×8 战棋）→ M3（千人社交与风云榜）必须做到纯本地断网也完整好玩；M4 再接入大模型接口。
2. **数据单一事实源（Markdown -> Python -> JSON）**：
   - 世界观基础设定位于 `docs/GAME_MECHANICS.md`、`docs/MARTIAL_ARTS_COMPENDIUM.md`、`docs/REGIONAL_MAPS_AND_BUILDINGS.md`、`docs/CHARACTER_COMPENDIUM.md`。
   - 批量调整设定或新增字段时，优先更新对应 Markdown 与 `scripts/compile_game_db.py`，运行 `npm run build:db` 重新生成 `src/data/*.json`，**切勿手改大型生成产物 JSON 导致下次编译被覆盖**。
   - 新增任何地区、门派、建筑、武学或人物引用时，必须严格对齐 `src/data/idRegistry.json` 中的标准 ID（如宋辽夏 19 城统一使用三字府名：`开封府`、`洛阳府`、`析津府`、`兴庆府` 等）。
3. **美术与静态资源规范**：
   - **严禁在 `.ts/.tsx/.json` 代码中内嵌 Base64 图片字符串**；所有运行时图片统一放入 `public/assets/{regions,buildings,characters}/`，通过 `src/utils/assetLoader.ts` 按需懒加载。
   - 若用户要求新生成全景图或角色立绘，**严禁使用 PIL/Canvas/SVG 脚本程序化伪造、镜像复用或裁剪拼贴原画**，必须遵循 `.agents/skills/panorama-artist/SKILL.md` 与 `.agents/skills/portrait-artist/SKILL.md` 规范逐张调用 `generate_image`。
4. **存档兼容性**：
   - 修改 `src/store/useGameStore.ts` 中的核心状态字段时，同步更新 `src/types/game.ts` 中的 `SerializableGameState` 与 `src/utils/saveManager.ts` 的版本迁移/默认值兜底逻辑，避免旧存档反序列化报错。
5. **代码质量校验**：
   - 每次完成功能修改后，运行 `npm run lint`（`oxlint`）与 `npm run build`（`tsc -b && vite build`）确保零类型错误、零 Lint 警告。

---

## 四、 关键文档与专属技能导航

| 用途 | 路径 / 命令 |
| :--- | :--- |
| **全局路线图与待办看板** | `docs/ROADMAP_AND_TODO.md`（每完成一个子里程碑请同步勾选 `[x]`） |
| **跨会话历史背景交接录** | `docs/HANDOFF_CONTEXT.md`（记录多分支合流脉络与关键设计决策） |
| **代码模块与素材全索引** | `PROJECT_GUIDE.md` |
| **核心机制与公式总纲** | `docs/GAME_MECHANICS.md` |
| **216 门武学全典** | `docs/MARTIAL_ARTS_COMPENDIUM.md` |
| **38 地区与 123 特殊建筑** | `docs/REGIONAL_MAPS_AND_BUILDINGS.md` |
| **1,000 名北宋历史与江湖人物** | `docs/CHARACTER_COMPENDIUM.md` |
| **本地接手/恢复上下文技能** | 在聊天框输入 `/resume-context`（对应 `.agents/skills/resume-context/SKILL.md`） |
| **数据库重编与校验技能** | 在聊天框输入 `/rebuild-db`（对应 `.agents/skills/rebuild-db/SKILL.md`） |
| **宋风全景/建筑画师技能** | 在聊天框输入 `/panorama-artist`（对应 `.agents/skills/panorama-artist/SKILL.md`） |
| **北宋人物考据立绘画师技能** | 在聊天框输入 `/portrait-artist`（对应 `.agents/skills/portrait-artist/SKILL.md`） |
