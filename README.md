# 《北宋立志传》（Northern Song Chronicles）

公元 1050 年（北宋仁宗皇祐二年 · 《天龙八部》黄金前传时代）开放世界历史武侠 RPG 模块化前端工程。

## 当前工程里程碑进度（Phase M0 全部完成 · Phase M1 & M3-1 稳步推进中）
- **[x] M0-1：模块化前端工程、静态原画懒加载与无缝雅乐引擎**
  - 技术栈：`Vite 8 + React 19 + TypeScript 7 + Tailwind CSS v4 + Zustand 5`
  - 静态原画抽离：**364 张独立 JPG 生产原画（65.4 MB）** 存放于 `public/assets/` 按需懒加载，代码与 JSON 数据层内嵌 Base64 为 **0 Bytes**。
  - 皇祐雅乐坊：内置 Web Audio 无缝循环与 Vite 自动曲目扫描插件（`public/assets/audio/`），支持天下舆图与 43 地区场景配乐自动切换。
- **[x] M0-2 & M0-3：全局唯一标准 ID 字典与七大设定集结构化编译**
  - 建立全局唯一标准字典（`src/data/idRegistry.json`）：**43 地区 ID**（`REG-01..43`：大宋 19 府 + 四夷 7 城 + 17 名山雄关）、**30 武林门派**（`SECT-01..30`：20 一流大派 + 10 二三流世家武馆）+ **11 朝堂四夷组织**（`ORG-01..11`）、**216 门武学**（`MA-001..216`）、**100 种百兵武器**（`WPN-001..100`）、**1,000 名历史与江湖人物**（`NPC-0001..1000`）。
  - `scripts/compile_game_db.py`（`npm run build:db`）一键解析七大 Markdown 设定专卷，生成严格类型校验的静态 JSON 数据库，外键悬空引用为 **0**。
- **[x] M0-4 & M3-1：三层空间无缝漫游、千人最末层入驻与多槽位存取档**
  - 打通 `天下舆图 (world) -> 43 地区全景 (region: 38 手绘 JPG + 5 青绿营造 SVG) -> 138 座特殊建筑内景 (building: 58 手绘 JPG + 80 宋式营造 SVG)`，支持按时辰行军与旷野原地扎营。
  - 1,000 名 NPC 全部具备实战四维、先天三维与十艺百工属性，并精确挂载至 43 地区最末层建筑与 414 处室内子点位；100 位历史名臣全员与 28 位武林宗师已实装独立头像与全身立绘（共 256 张人物原画）。
  - `src/utils/saveManager.ts` 基于 `IndexedDB + localStorage` 提供 1 自动槽 + 6 手动槽存取档与 `.json` 导入导出（`M1.2.0` Schema）。
- **[x] M1-0 & M1-2 & M1-3a/b：1.5× 十卷枢机菜单、216 武学重数特效与百兵四库**
  - **常驻顶部状态栏（`TopHud.tsx`）**：实时显示年月日十二时辰、气血/体能双进度条、纹银与行军干粮。
  - **独立三大核心面板（`SystemMenuModal.tsx`）**：【壹·主角面板】、【贰·披挂与武学（7 槽可视化披挂 + 6 槽武学运使 + 1~10 重火候演练）】、【叁·行囊四库】。
  - **全量武学与器物入库**：216 门十一大类武学 1~10 重数值与 37 门天阶战斗特效、百兵谱 100 种武器（含兵武共鸣）、100 卷典籍书画、30 种丹药毒物、50 件雅器百工全部定稿入库。

## 常用开发命令

```bash
npm run dev              # 启动本地开发服务器 (0.0.0.0:5173)
npm run build:db         # 从 docs/*.md 重新编译结构化静态 JSON 数据库
npm run normalize:docs   # 幂等规范化 Markdown 设定文档地名与链接并重编数据库
npm run archive:masters  # 归档全部跨分支原始高清母版原画与哈希清单
npm run build:artifact   # 编译单文件离线可交互预览包 (Node.js 零 Python 依赖)
npm run lint             # 运行 oxlint 静态检查
npm run build            # 运行 tsc -b 严格类型校验与 Vite 生产分包构建
```

## 完整目录与素材清单

```text
northern-song-chronicles/
├── docs/                              # 七大核心设定专卷、路线图与交接文档
│   ├── ROADMAP_AND_TODO.md            # 全局研发路线图与主线任务看板 (M0 ~ M5)
│   ├── HANDOFF_CONTEXT.md             # 跨会话演进历史与工程避坑备忘
│   ├── GAME_MECHANICS.md              # 历法时辰、三维/四维/十艺、七槽四库与同步盲选战斗总纲
│   ├── MARTIAL_ARTS_SECTS.md          # 30 武林门派（20 一流 + 10 二三流）与 11 庙堂四夷组织专卷
│   ├── MARTIAL_ARTS_COMPENDIUM.md     # 216 门十一大类武学全典与天阶修习前置条件
│   ├── MARTIAL_ARTS_STATS.md          # 216 门武学 1~10 重数值表、四系伤害公式与 37 天阶特效
│   ├── EQUIPMENT_COMPENDIUM.md        # 皇祐披挂总纲（第一卷：百兵谱 100 种武器全录）
│   ├── REGIONAL_MAPS_AND_BUILDINGS.md # 43 处疆域重镇名山与 138 座特殊建筑设定（共 268 座建筑）
│   └── CHARACTER_COMPENDIUM.md        # 1,000 名北宋历史名臣与江湖人物全录
├── public/assets/                     # 运行时按需懒加载生产资源
│   ├── regions/                       # 38 张州府名山半3D等轴全景图 (JPG)
│   ├── buildings/                     # 58 张特殊建筑半3D内景图 (JPG)
│   ├── characters/                    # 268 张人物立绘资源 (128 头像 + 128 全身 + 12 门派模板)
│   └── audio/                         # 四分类场景配乐目录 (world / regions / characters / events)
├── assets_raw_masters/                # 未压缩高清母版原画归档（共 362 张，373.9 MB + MANIFEST.json）
├── legacy_prototypes_and_tools/       # 早期原型脚本与画师 Agent 提示词规范归档
├── scripts/                           # 数据编译 (compile_game_db.py) 与单文件构建脚本
└── src/                               # 模块化 React 19 + TypeScript 7 + Zustand 5 源码
    ├── components/                    # 三层地图画布 (含青绿营造 SVG 兜底)、顶部 HUD、十卷枢机弹窗
    ├── data/                          # 编译生成的静态 JSON 数据库与 scrollsDb / itemsDb / playerMartialArts
    ├── store/                         # Zustand 全局状态机 (useGameStore.ts)
    ├── types/                         # 严格 TypeScript 领域接口定义 (game.ts)
    └── utils/                         # 懒加载器、历法寻路数学库、Web Audio 雅乐管理与存取档管理
```

## Antigravity 无缝接手与专属技能

- **自动加载规则**：[`AGENTS.md`](./AGENTS.md) 与 [`.gemini/GEMINI.md`](./.gemini/GEMINI.md) 会在每次开启新会话时自动注入公元 1050 年时空锚点、同步盲选回合战斗规范与工程铁律。
- **内置快捷技能（在聊天框直接输入 `/` 调用）**：
  - `/resume-context`：一键读取 [`docs/HANDOFF_CONTEXT.md`](./docs/HANDOFF_CONTEXT.md) 与 [`docs/ROADMAP_AND_TODO.md`](./docs/ROADMAP_AND_TODO.md)，汇报当前进度并切入下一里程碑（当前推荐从 `M1-1` 开局创角开始）。
  - `/rebuild-db`：修改 `docs/*.md` 设定文档后一键重编 `src/data/*.json` 并执行零悬空引用与类型检查。
  - `/panorama-artist`：按北宋青绿工笔 2.5D 规范补绘场景/建筑全景图并校准点击热点。
  - `/portrait-artist`：按宋代舆服考据与零复用铁律补绘人物 `1:1` 头像与 `3:4` 全身立绘。
