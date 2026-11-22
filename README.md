# 《北宋立志传》（Northern Song Chronicles）

公元 1050 年（北宋仁宗皇祐二年 · 正月初一开局 · 《天龙八部》黄金前传时代）开放世界历史武侠 RPG。致敬《太阁立志传》×《金庸群侠传》，以确定性量化数值骨架与长卷声明式剧情驱动，纯本地断网即可完整游玩。

---

## 核心特性与当前进度

> 详细路线图与门派进度矩阵见 [`docs/ROADMAP_AND_TODO.md`](./docs/ROADMAP_AND_TODO.md)（当前主线：**Phase P1 · 补齐剩余 10 大已开放一流门派 Lv.1→Lv.5 全本剧情**）。

- **工程底座与离线包架构（已完成 ✅）**
  - 技术栈：`Vite 8 + React 19 + TypeScript 7 + Tailwind CSS v4 + Zustand 5 + Vitest 5`。
  - 零 Base64 按需懒加载：运行时静态资源统一收拢于 `public/assets/`，内置防回归护栏（`check_artifact_guardrails.mjs`）与单文件离线 HTML 预览包构建（`npm run build:artifact`）。
  - 单一事实源编译管线：`scripts/compile_game_db.py`（`npm run build:db`）将 `docs/*.md` 七大设定专卷一键编译为严格类型校验的 `src/data/*.json`（外键零悬空引用）。
  - 跨版本存取档：`IndexedDB + localStorage` 提供 1 自动槽 + 6 手动槽及 `.json` 导入导出（当前 `M1.5.5` Schema，兼容历史版本自动迁移）。
  - 皇祐雅乐坊：Web Audio 无缝循环与自动曲目扫描（`public/assets/audio/`，25 首场景/战斗配乐）。

- **世界观数据与 100% 实景美术资产（已完成 ✅）**
  - **43 处疆域重镇名山**（`REG-01..43`）半 3D 青绿等轴全景 100% 齐全；**268 座建筑**（147 座特殊建筑独立内景 + 30 套六域基础建筑模板）100% 实景覆盖；支持按十二时辰骑马行军与旷野扎营。
  - **33 大武林门派 + 11 朝堂四夷组织**：含 21 一流势力（含独立建制 `SECT-33` 大宋禁军）+ 12 二三流世家武馆。
  - **1,059 名历史名臣与江湖群侠**（`NPC-0001..1059`）100% 挂载至最末层建筑，全员配齐独立原画或门派模板（含透明抠图三件套）。
  - **251 门十一大类武学**（1~10 重数值表、强天赋三次方闭关公式、战斗经验破境与 37 门天阶特效）与 **九槽披挂 / 皇祐四库**（含 103 件百兵武器、兵武共鸣与百卷典籍书画）。

- **玩法闭环与剧情内容（持续扩充中）**
  - **养成与经济**：开局创角、1.5× 宽幅十卷枢机菜单、三场所按日闭关、各地商铺分类买卖、州府衙门悬赏缉凶榜、每年六月开封大集、**《天下风云榜》百强武道榜**。
  - **同步盲选回合制战斗**：每轮双方盲选【四式外功 / 守御架势 / 抽身脱战】，身法先后手结算、双轨护体减伤、守御回气与破绽博弈、心理博弈 AI、切磋与生死决斗（`deadNpcIds` 持久化）。
  - **184 条声明式剧情任务链（零断链，641 幅剧情 CG）**：
    - 12 派二三流世家武馆 100% 跑通；
    - **4 套一流大派 Lv.1→Lv.5 全本史诗已完结**：开封府/六扇门 + 大宋禁军（20 卷）、华山派（33 卷）、嵩山少林寺（61 卷）、终南隐宗（50 卷）；
    - 其余 10 个已开放一流门派均已完成入门长卷（除开封府外，所有一流大派均实行任务晋升制，曾入星宿派永禁再入中原正派）；7 大隐世/异族势力归入远期 DLC 锁定池。

---

## 常用开发命令

```bash
npm run dev              # 启动本地开发服务器 (Vite)
npm run build:db         # 从 docs/*.md 重新编译结构化静态 JSON 数据库
npm run normalize:docs   # 幂等规范化 Markdown 设定文档地名与链接并重编数据库
npm run verify:quests    # 校验全部 184 条剧情任务链 ID、CG、门派规则与十艺上限
npm run lint             # 运行 oxlint + 单文件包防回归护栏 + 任务链静态校验
npm test                 # 运行 Vitest 单元测试套件
npm run build            # 运行 tsc -b 严格类型校验与 Vite 生产分包构建
npm run build:artifact   # 编译单文件离线可交互 HTML 预览包
npm run verify:artifact  # 无头浏览器双模式（file:// + 严格沙箱）端到端冒烟验证
npm run archive:masters  # 归档高清母版原画与哈希清单
```

---

## 目录结构

```text
northern-song-chronicles/
├── docs/                              # 七大设定专卷、路线图、交接录与美术台账
│   ├── ROADMAP_AND_TODO.md            # 全局研发路线图与主线看板（Single Source of Truth）
│   ├── HANDOFF_CONTEXT.md             # 跨会话历史交接与关键设计决策
│   ├── DESIGN_NOTES_AND_FUTURE_PLAN.md# 中后期系统深化与玩法演进思考录
│   ├── GAME_MECHANICS.md              # 历法时辰、三维/四维/十艺、九槽四库与战斗总纲
│   ├── MARTIAL_ARTS_SECTS.md          # 33 武林门派与 11 朝堂四夷组织专卷
│   ├── MARTIAL_ARTS_COMPENDIUM.md     # 251 门武学名录与前置总纲
│   ├── MARTIAL_ARTS_STATS.md          # 251 门武学 1~10 重数值表与 37 门天阶特效
│   ├── EQUIPMENT_COMPENDIUM.md        # 皇祐披挂总纲（百兵谱 103 武器 + 四库典籍器物）
│   ├── REGIONAL_MAPS_AND_BUILDINGS.md # 43 处疆域名山与 147 特殊建筑（共 268 建筑）
│   ├── CHARACTER_COMPENDIUM.md        # 1,059 名北宋历史名臣与江湖人物全录
│   ├── MISSING_QUEST_ILLUSTRATIONS.md # 待补绘剧情插画（CG）台账
│   └── MISSING_NPC_PORTRAITS.md       # 待补绘人物立绘与三件套台账
├── public/assets/                     # 运行时按需懒加载静态资源（零 Base64）
│   ├── regions/                       # 43 张州府名山半 3D 等轴全景图
│   ├── buildings/                     # 177 张特殊建筑与六域通用基础建筑实景内景图
│   ├── characters/                    # 1,306 张人物头像、全身像、透明抠图与门派模板
│   ├── items/                         # 515 张武器、披挂、典籍、丹药与雅器图标
│   ├── quests/                        # 641 幅 16:9 剧情插画（CG）
│   └── audio/                         # 25 首场景与战斗无损循环配乐
├── assets_raw_masters/                # 未压缩高清母版原画归档与哈希清单
├── legacy_prototypes_and_tools/       # 早期原型脚本与画师提示词规范归档
├── scripts/                           # 数据库编译、任务校验、护栏检查与单文件包构建脚本
└── src/                               # 模块化 React 19 + TypeScript 7 + Zustand 5 源码
    ├── components/                    # 三层地图画布、顶部 HUD、战斗舞台、十卷枢机与剧情弹窗
    ├── data/                          # 编译生成的 JSON 数据库与 184 条懒加载剧情脚本
    ├── engine/                        # 纯函数领域引擎（战斗、任务、门派、经济、风云榜、测试）
    ├── hooks/                         # 状态订阅与图片懒加载 Hooks
    ├── store/                         # Zustand 切片状态机（useGameStore + slices/）
    ├── types/                         # 严格 TypeScript 领域类型定义
    └── utils/                         # 资源加载器、雅乐管理、跨版本存档迁移与校验
```

---

## Antigravity 工程守则与专属技能

- **自动上下文注入**：[`AGENTS.md`](./AGENTS.md) 与 [`.gemini/GEMINI.md`](./.gemini/GEMINI.md) 会在每次新会话自动加载公元 1050 年时空锚点、当前里程碑进度与工程铁律。
- **内置快捷技能（在聊天框输入 `/` 调用）**：
  - `/resume-context`：快速读取交接录与路线图，恢复全局上下文并切入当前主线任务。
  - `/rebuild-db`：修改 `docs/*.md` 后重编 `src/data/*.json` 并执行零悬空引用与类型检查。
  - `/quest-author`：按声明式双文件懒加载规范设计、挂载并校验新剧情任务链。
  - `/panorama-artist`：按北宋青绿工笔 2.5D 规范补绘场景/建筑全景并校准点击热点。
  - `/portrait-artist`：按宋代舆服考据补绘人物立绘三件套与 16:9 剧情插画（CG）。
