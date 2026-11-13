# 《北宋立志传》（Northern Song Chronicles）

公元 1050 年（宋仁宗皇祐二年）开放世界历史武侠 RPG 模块化前端工程。

## 当前工程里程碑进度（Phase M0 全部完成 · Phase M1 进行中）
- **[x] M0-1：初始化标准前端工程与静态资源解耦**
  - 技术栈：`Vite 8 + React 19 + TypeScript 7 + Tailwind CSS v4 + Zustand 5`
  - 静态原画抽离：从旧版 24.8 MB 单文件 HTML 原型无损抽离 **209 张独立 JPG 静态原画（30.64 MB）** 至 `public/assets/`，代码与 JSON 数据层内嵌 Base64 为 **0 Bytes**，按需懒加载。
- **[x] M0-2：统一跨分支标准 ID 字典与文档归一**
  - 建立全局唯一标准字典（`src/data/idRegistry.json`）：**38 地区 ID**（`REG-01`..`REG-38` / `bianliang`..`nanshaolin`）、**20 大门派 + 11 朝堂四夷势力 ID**（`SECT-01`..`SECT-20` / `ORG-01`..`ORG-11`）、**216 门武学 ID**（`MA-001`..`MA-216`）。
  - 批量修正 `docs/CHARACTER_COMPENDIUM.md` 中 658 处旧地名写法，1,000 名 NPC 100% 映射至标准地区与驻留建筑，悬空引用为 0。
- **[x] M0-3：编译结构化游戏数据库**
  - `scripts/compile_game_db.py`（绑定 `npm run build:db`）一键解析四大 Markdown 设定集，生成带严格 TypeScript 接口校验的 `regions.json`（38）、`buildings.json`（123 特殊 + 105 基础）、`martial_arts.json`（216）、`npcs.json`（1,000）与快速索引模块 `src/data/gameDb.ts`。
- **[x] M0-4：完整三层空间视图与多槽位存读档**
  - 全部 **123 座特殊建筑** 100% 支持步入第三层内景（58 座手绘 JPG 半3D全景 + 65 座宋式《营造法式》矢量内院 `SvgBuildingInteriorFallback.tsx` 兜底）。
  - `src/utils/saveManager.ts` 实装 `IndexedDB`（含 `localStorage` 双写兜底）多槽位存取档（1 自动卷宗 + 6 手动卷宗），支持自定义手札备注、三层空间现场无损还原及 `.json` 存档文件导出/导入校验。
- **[x] M1-0：全局顶部状态栏（HUD）与主角七槽位披挂 / 行囊四库重构**
  - **常驻顶部状态栏（`TopHud.tsx`）**：全场景常驻显示【年月日 + 十二时辰（子~亥昼夜流转）】、主角【气血（当前/上限）】、【体能（当前/上限）】、【资金（纹银）】与【粮草（干粮）】。
  - **可视化七槽位披挂区（`SystemMenuModal.tsx`）**：在主角面板下方实装 **武器、服饰、鞋履、弓箭、配饰壹、配饰贰、坐骑** 七槽位纸娃娃布局，动态重算属性上限并直接联动大地图坐骑行军速度。
  - **行囊四库与 `M1.0.0` 存档兼容（`itemsDb.ts` / `saveManager.ts`）**：建立 **典籍书画、丹药毒物、雅器百工、行囊杂物** 四分类背包及首批宋风器物库，支持穿卸、研读与服用，并无缝向后兼容 `M0.4.0` 旧存档。

## 常用开发命令

```bash
npm run dev              # 启动本地开发服务器 (0.0.0.0:5173)
npm run build:db         # 从 docs/*.md 重新编译结构化静态 JSON 数据库
npm run normalize:docs   # 幂等规范化 Markdown 设定文档地名与链接并重编数据库
npm run archive:masters  # 归档全部跨分支原始 ~1MB 高清母版原画与设定文档
npm run build:artifact   # 编译单文件离线可交互预览包 (northern_song_chronicles_m0.html)
npm run lint             # 运行 oxlint 静态检查
npm run build            # 运行 tsc -b 严格类型校验与 Vite 生产分包构建
```

## 完整目录与素材清单

```text
northern-song-chronicles/
├── docs/                           # 五大核心设定集与开发路线图
│   ├── ROADMAP_AND_TODO.md         # 完整里程碑路线图与任务跟踪清单 (M0 ~ M5)
│   ├── GAME_MECHANICS.md           # 核心机制、时辰体能、七槽披挂、四库行囊与世界观总纲
│   ├── MARTIAL_ARTS_COMPENDIUM.md  # 216 门武学全典（天/地/良/凡四阶十二品）
│   ├── REGIONAL_MAPS_AND_BUILDINGS.md # 38 处疆域重镇与 123 座特殊建筑设定
│   └── CHARACTER_COMPENDIUM.md     # 1,000 名北宋历史与江湖人物全录
├── public/assets/                  # 运行时按需懒加载美术资源（共 209 张 JPG，30.6 MB）
│   ├── regions/                    # 38 张州府名山俯视全景图
│   ├── buildings/                  # 58 张核心建筑半3D内景图
│   └── characters/                 # 113 张人物头像、全身立绘与门派群像模板
├── assets_raw_masters/             # AI 生成未压缩 ~1MB 高清母版原画归档（共 204 张，208.7 MB）
│   ├── MANIFEST.json               # 母版原画 SHA-256 校验、分类与来源分支索引清单
│   ├── regions/                    # 州府与汴京多版本高清母版原图
│   ├── buildings/                  # 特殊建筑高清母版原图
│   └── characters/                 # 历史名臣、绝世高手与群像模板高清母版原图
├── legacy_prototypes_and_tools/    # 早期各分支原型构建脚本与画师 Agent 提示词归档
│   ├── agent_specs/                # 全景地图画师 & 宋画人物立绘画师 Agent 规范
│   ├── map_generators/             # 疆域投影、地理路径与早期地图构建脚本
│   ├── character_generators/       # 千人名录与立绘画廊构建脚本
│   └── early_svg_prototype/        # 初版纯矢量北宋天下舆图原型
├── scripts/                        # 现代工程构建与数据编译管线
│   ├── compile_game_db.py          # Markdown -> JSON 零悬空引用数据库编译器
│   ├── build_preview_artifact.py   # IIFE 内联单文件预览包打包器
│   └── archive_all_branch_assets.py # 跨分支母版素材与设定集归档工具
└── src/                            # 模块化 React 19 + TypeScript 7 + Zustand 5 源码
    ├── components/                 # 三层地图画布、常驻顶部状态 HUD、七槽披挂与四库行囊枢机弹窗
    ├── data/                       # 编译产出的 regions / buildings / martial_arts / npcs JSON 及 itemsDb.ts
    ├── store/                      # Zustand 全局状态管理（历法时辰、生存属性、装备行囊、导航栈）
    ├── types/                      # 严格 TypeScript 领域数据接口（含 M1.0.0 存档契约）
    └── utils/                      # IndexedDB 多槽位存档管理器、十二时辰历法与静态图片懒加载器
```

## Antigravity 本地版无缝接手说明

本仓库已内置完整的 **Antigravity 本地版上下文记忆与专属技能包**，在本地 `git clone` 打开工作区后无需重新解释背景：

- **自动加载规则**：[`AGENTS.md`](./AGENTS.md) 与 [`.gemini/GEMINI.md`](./.gemini/GEMINI.md) 会在每次开启新会话时自动注入公元 1050 年时空锚点、架构铁律与 M0→M5 进度。
- **跨分支历史交接录**：[`docs/HANDOFF_CONTEXT.md`](./docs/HANDOFF_CONTEXT.md) 完整记录了前期多分支演进脉络、核心技术细节与避坑指南。
- **内置快捷技能（在本地聊天框直接输入 `/` 调用）**：
  - `/resume-context`：一键读取交接录与 [`docs/ROADMAP_AND_TODO.md`](./docs/ROADMAP_AND_TODO.md)，汇报当前进度并切入下一里程碑（当前推荐从 `M1-1` 开始）。
  - `/rebuild-db`：修改 `docs/*.md` 设定文档后一键重编 `src/data/*.json` 并执行零悬空引用与类型检查。
  - `/panorama-artist`：按北宋青绿工笔 2.5D 规范补绘场景/建筑全景图并校准点击热点。
  - `/portrait-artist`：按宋代舆服考据与零复用铁律补绘人物 `1:1` 头像与 `3:4` 全身立绘。
