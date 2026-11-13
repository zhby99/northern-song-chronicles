# 北宋群侠传 (Northern Song Chronicles) - 项目完整指南 (PROJECT_GUIDE)

> **版本**：v1.0.0-phase3  
> **更新时间**：2026-11-12  
> **项目根目录**：`/home/antigravity/zhby99/northern-song-chronicles`

---

## 目录
1. [项目定位与架构总览](#一项目定位与架构总览)
2. [工程目录与核心代码结构](#二工程目录与核心代码结构)
3. [核心代码模块职责与关键符号](#三核心代码模块职责与关键符号)
4. [全量游戏素材清单与路径索引](#四全量游戏素材清单与路径索引)
5. [工具链、数据编译与构建命令](#五工具链数据编译与构建命令)

---

## 一、项目定位与架构总览

本项目是一款以北宋熙宁-元丰年间为背景的国风开放世界沙盘武侠游戏。
前端技术栈采用 **Vite + React 18 + TypeScript + Zustand + TailwindCSS / Lucide-React**，所有核心数据采用静态 JSON 数据库及全量离线打包架构。

### 架构分层
```mermaid
graph TD
    A[index.html 入口] --> B[src/main.tsx]
    B --> C[src/App.tsx 根视口]
    C --> D[HUD 交互层 (TopHud, BottomHud, Inspector)]
    C --> E[地图渲染层 (WorldMapCanvas, RegionMapCanvas)]
    C --> F[全局弹窗层 (SystemMenuModal)]
    
    D & E & F --> G[Zustand 状态机: src/store/useGameStore.ts]
    G --> H[综合静态数据库: src/data/gameDb.ts]
    H --> I[各大实体 JSON: regions, buildings, npcs, martial_arts, etc.]
    
    E --> J[资源加载工具: src/utils/assetLoader.ts]
    J --> K[public/assets 游戏生产素材库]
```

---

## 二、工程目录与核心代码结构

```text
northern-song-chronicles/
├── index.html                           # 网页入口单页
├── package.json                         # 项目依赖与运行脚本
├── tsconfig.json / tsconfig.app.json    # TypeScript 配置
├── vite.config.ts                       # Vite 构建与服务配置
├── PROJECT_GUIDE.md                     # 本文档 (项目全局导引与资源索引)
├── README.md                            # 项目简介
│
├── docs/                                # 游戏系统与数值策划设计文案
│   ├── CHARACTER_COMPENDIUM.md          # 1000 人物图鉴与派系
│   ├── GAME_MECHANICS.md                # 养成、战斗、行商、官职核心机制
│   ├── MARTIAL_ARTS_COMPENDIUM.md       # 门派武学大典与招式体系
│   ├── REGIONAL_MAPS_AND_BUILDINGS.md   # 38 州府区域与 58 名胜建筑
│   └── ROADMAP_AND_TODO.md              # 开发里程碑与待办
│
├── src/                                 # 核心业务源码
│   ├── main.tsx                         # 挂载入口
│   ├── App.tsx                          # 主容器组件与视图分发器
│   ├── index.css                        # 全局样式与自定义排版
│   │
│   ├── components/                      # React 视图组件库
│   │   ├── hud/                         # 界面抬头显示与浮动信息
│   │   │   ├── TopHud.tsx               # 顶部年号/时辰/铜钱/阅历栏
│   │   │   ├── BottomHud.tsx            # 底部菜单切换与操作按键
│   │   │   ├── ContextInspectorCard.tsx # 选定实体详细检查卡片 (人物/建筑)
│   │   │   ├── MapTooltip.tsx           # 地图悬浮气泡
│   │   │   └── TravelBanner.tsx         # 大地图旅行过渡动效条
│   │   ├── map/                         # 地图画布与交互组件
│   │   │   ├── WorldMapCanvas.tsx       # 北宋天下大地图 (SVG 矢量沙盘)
│   │   │   ├── RegionMapCanvas.tsx      # 区域州府 2.5D 等轴测全景画布
│   │   │   └── SvgBuildingInteriorFallback.tsx # 室内建筑备用渲染器
│   │   └── menu/                        # 系统弹窗
│   │       └── SystemMenuModal.tsx      # 存档/读档/图鉴/设置弹窗
│   │
│   ├── data/                            # 游戏全量静态结构化数据库
│   │   ├── gameDb.ts                    # 数据库聚合导出模块 (GameDbFacade)
│   │   ├── regions.json                 # 38 个区域州府信息
│   │   ├── buildings.json               # 58 个地标建筑详细设定
│   │   ├── buildingPanoramas.json       # 建筑室内/全景视角绑定
│   │   ├── npcs.json                    # 历史名仕、武林豪杰与江湖角色
│   │   ├── martial_arts.json            # 武功秘籍、内功、招式数据库
│   │   ├── regionalConfigs.json         # 区域经济、势力倾向、特产配置
│   │   ├── worldGraph.json              # 陆路、水路、关隘节点连接拓扑
│   │   ├── worldBaseSvg.ts              # 大宋疆域与四方边境矢量轮廓
│   │   ├── idRegistry.json              # 全局实体 ID 命名空间注册表
│   │   ├── assetManifest.json           # 生产资源哈希与索引表
│   │   └── portraitCatalog.json         # 人物立绘映射匹配表
│   │
│   ├── store/                           # 全局状态管理
│   │   └── useGameStore.ts              # Zustand 状态机 (主角、时间、位置、库存)
│   │
│   ├── types/                           # 全局 TypeScript 接口与类型定义
│   │   └── game.ts                      # Region, Building, NPC, Item, Store 等类型
│   │
│   └── utils/                           # 工具方法库
│       ├── assetLoader.ts               # 图片素材路径解析与加载降级策略
│       ├── mapMath.ts                   # 经纬度投影与等轴测坐标变换
│       └── saveManager.ts               # 本地存档 LocalStorage 序列化/反序列化
│
├── public/                              # 生产运行资源静态目录 (被 Vite 直接托管)
│   ├── icons.svg                        # 界面矢量图标集
│   └── assets/                          # 压缩处理后的生产游戏图片 (共 209 张)
│       ├── buildings/                   # 58 张地标建筑高清插画 (JPG)
│       ├── regions/                     # 38 张区域州府等轴测底图 (JPG)
│       └── characters/                  # 人物立绘资源 (共 113 张)
│           ├── avatars/                 # 51 张角色正方头像 (JPG)
│           ├── fullbody/                # 50 张角色全身立绘 (JPG)
│           └── templates/               # 12 张门派/身份模板全身立绘 (JPG)
│
├── assets_raw_masters/                  # 原始高精度美术素材存档 (未经裁剪/压缩)
│   ├── MANIFEST.json                    # 原始素材元数据清单
│   ├── buildings/                       # 60 张原始建筑概念设计原图
│   ├── regions/                         # 42 张原始区域全景原图 (含未修饰版)
│   └── characters/                      # 102 张原始角色立绘母版
│
├── scripts/                             # 项目构建、数据编译与资源维护自动化脚本
│   ├── compile_game_db.py               # 数据自动聚合编译脚本
│   ├── archive_all_branch_assets.py     # 分支美术资产归档合并工具
│   ├── build_preview_artifact.py        # 离线自包含演示打包脚本
│   └── extract_legacy_assets.py         # 原型素材提取工具
│
└── legacy_prototypes_and_tools/         # 早期生成工具、规格文档与原型
    ├── agent_specs/                     # 美术 Agent 设定与提示词规范
    │   ├── panorama_artist_agent.md     # 全景图生成规范
    │   └── portrait_artist_agent.md     # 角色肖像生成规范
    ├── character_generators/            # 千人批量生成逻辑与测试代码
    ├── map_generators/                  # 地图路径生成、几何运算与修饰工具
    └── early_svg_prototype/             # 第一版 SVG 地图探索原型
```

---

## 三、核心代码模块职责与关键符号

### 1. 状态管理 (`src/store/useGameStore.ts`)
- **`useGameStore`**: 全局单一数据源，管理：
  - `player`: 主角属性（姓名、出身、精力、气血、真气、道德、银两）。
  - `worldTime`: 当前游戏时间（年号、月份、日子、时辰刻度）。
  - `navigation`: 当前视图状态（`'world'` 天下大地图 / `'region'` 州府场景 / `'interior'` 建筑内部），当前选中州府 `currentRegionId` 与建筑 `currentBuildingId`。
  - `travelState`: 旅途状态、耗时以及途经路线。
  - 核心 Actions: `travelToRegion()`, `enterBuilding()`, `exitToRegion()`, `exitToWorld()`, `advanceTime()`, `saveGame()`, `loadGame()`。

### 2. 数据库分发 (`src/data/gameDb.ts`)
- **`gameDb`**: 聚合只读门面对象，提供快速检索 API：
  - `getRegionById(id: string)`: 获取州府属性与附属建筑。
  - `getBuildingById(id: string)`: 获取建筑功能、NPC及背景图。
  - `getNpcById(id: string)`: 获取 NPC 身份、好感、武功与立绘。
  - `getMartialArtById(id: string)`: 获取武学心法秘籍。

### 3. 素材动态加载器 (`src/utils/assetLoader.ts`)
- **`getRegionBackdropUrl(regionId: string)`**: 解析州府全景大图，支持回退到通用默认图。
- **`getBuildingImageUrl(buildingId: string)`**: 获取建筑插画路径。
- **`getCharacterAvatarUrl(avatarKey: string)`**: 根据 NPC 映射表或模版解析正方形头像。
- **`getCharacterFullbodyUrl(fullbodyKey: string)`**: 解析角色全身高精度立绘。

---

## 四、全量游戏素材清单与路径索引

游戏生产素材均存放于 `/home/antigravity/zhby99/northern-song-chronicles/public/assets/`。

### 1. 区域州府全景图 (`public/assets/regions/` - 共 38 张)
绝对路径前缀：`/home/antigravity/zhby99/northern-song-chronicles/public/assets/regions/`

| 序号 | 文件名 | 对应区域 ID / 名称 | 序号 | 文件名 | 对应区域 ID / 名称 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | `bianliang.jpg` | 汴京 (东京开封府) | 20 | `suzhou.jpg` | 苏州府 (平江府) |
| 2 | `changan.jpg` | 长安 (京兆府) | 21 | `taihang.jpg` | 太行山寨 |
| 3 | `chengdu.jpg` | 成都府 | 22 | `taishan.jpg` | 泰山绝顶 |
| 4 | `dading_liao.jpg` | 大定府 (辽中京) | 23 | `taiyuan.jpg` | 太原府 (河东要冲) |
| 5 | `dali_city.jpg` | 大理城 | 24 | `taohuadao.jpg` | 东海桃花岛 |
| 6 | `daming.jpg` | 大名府 (北京) | 25 | `tiezhangfeng.jpg` | 铁掌峰 |
| 7 | `emeishan.jpg` | 峨眉山 | 26 | `tongguan.jpg` | 潼关要塞 |
| 8 | `hangzhou.jpg` | 杭州府 (临安) | 27 | `wudangshan.jpg` | 武当山 |
| 9 | `jiangning.jpg` | 江宁府 (金陵) | 28 | `wuliangshan.jpg` | 无量山剑湖宫 |
| 10 | `jianmenguan.jpg` | 剑门关 | 29 | `wutaishan.jpg` | 五台山清凉寺 |
| 11 | `jinan.jpg` | 济南府 | 30 | `xiangyang.jpg` | 襄阳府 |
| 12 | `kunlun.jpg` | 昆仑山三圣峰 | 31 | `xijin_liao.jpg` | 析津府 (辽南京/燕京) |
| 13 | `linhuang_liao.jpg` | 临潢府 (辽上京) | 32 | `xingqing_xixia.jpg`| 兴庆府 (西夏国都) |
| 14 | `luoxie_tubo.jpg` | 逻些城 (吐蕃都城) | 33 | `yanan.jpg` | 延安府 (西军前线) |
| 15 | `luoyang.jpg` | 洛阳 (西京河南府) | 34 | `yangzhou.jpg` | 扬州府 |
| 16 | `nanshaolin.jpg` | 南少林 (莆田少林) | 35 | `yanmenguan.jpg` | 雁门关绝塞 |
| 17 | `qingcheng.jpg` | 青城山天师洞 | 36 | `yanziwu.jpg` | 燕子坞参合庄 |
| 18 | `quanzhou.jpg` | 泉州府 (市舶重镇) | 37 | `zhending.jpg` | 真定府 |
| 19 | `shaolin.jpg` | 嵩山少林寺 | 38 | `zhongnanshan.jpg` | 终南山活死人墓/全真 |

---

### 2. 名胜建筑场景图 (`public/assets/buildings/` - 共 58 张)
绝对路径前缀：`/home/antigravity/zhby99/northern-song-chronicles/public/assets/buildings/`

| 序号 | 文件名 | 对应地标建筑 | 序号 | 文件名 | 对应地标建筑 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | `bl_fanlou.jpg` | 汴京 · 樊楼七十二家名酒楼 | 30 | `qc_poison.jpg` | 青城山 · 百草炼丹房 |
| 2 | `bl_jinjun.jpg` | 汴京 · 八十万禁军大校场 | 31 | `qc_shangqing.jpg` | 青城山 · 上清宫 |
| 3 | `bl_kaifengfu.jpg` | 汴京 · 开封府衙南衙大堂 | 32 | `qc_tang.jpg` | 青城山 · 青城剑阁堂 |
| 4 | `bl_palace.jpg` | 汴京 · 大内皇城宣德门 | 33 | `sl_cangjing.jpg` | 少林寺 · 藏经阁密室 |
| 5 | `bl_xiangguosi.jpg` | 汴京 · 大相国寺三门万姓交易 | 34 | `sz_hanshan.jpg` | 苏州 · 寒山寺夜钟台 |
| 6 | `dd_envoy.jpg` | 辽中京 · 枢密使节院 | 35 | `sz_huqiu.jpg` | 苏州 · 虎丘剑池 |
| 7 | `dd_hunt.jpg` | 辽中京 · 斡鲁朵行猎大帐 | 36 | `sz_taihu.jpg` | 苏州 · 太湖归云水寨 |
| 8 | `dd_pagoda.jpg` | 辽中京 · 大明镇国舍利塔 | 37 | `tg_fort.jpg` | 潼关 · 关楼敌台烽燧 |
| 9 | `dm_drill.jpg` | 大名府 · 控扼太行阅兵台 | 38 | `tg_siguoya.jpg` | 潼关 · 华山思过崖 |
| 10 | `dm_ferry.jpg` | 大名府 · 御河漕运码头仓储 | 39 | `tg_summit.jpg` | 潼关 · 华山落雁南峰顶 |
| 11 | `dm_palace.jpg` | 大名府 · 北京大名府行宫 | 40 | `tg_zixia.jpg` | 潼关 · 华山玉泉紫霞院 |
| 12 | `em_jinding.jpg` | 峨眉山 · 金顶佛光台 | 41 | `ts_yuhuang.jpg` | 泰山 · 玉皇顶封禅台 |
| 13 | `em_pond.jpg` | 峨眉山 · 洗象池清修静室 | 42 | `ty_iron.jpg` | 太原府 · 晋阳铁冶坊 |
| 14 | `em_wannian.jpg` | 峨眉山 · 万年寺普贤殿 | 43 | `ty_jinci.jpg` | 太原府 · 晋祠圣母殿 |
| 15 | `jn2_qinhuai.jpg` | 江宁府 · 秦淮两岸烟雨楼台 | 44 | `wl_langhuan.jpg` | 无量山 · 琅嬛福地玉像窟 |
| 16 | `jn2_qixia.jpg` | 江宁府 · 栖霞寺古石窟 | 45 | `wl_yubi.jpg` | 无量山 · 无量剑湖碧玉壁 |
| 17 | `jn2_shitou.jpg` | 江宁府 · 石头城古要塞军寨 | 46 | `xj_horse.jpg` | 辽燕京 · 幽燕马市交易场 |
| 18 | `kl_poison.jpg` | 昆仑山 · 极寒炼毒玄冰崖 | 47 | `xj_marshal.jpg` | 辽燕京 · 留守元帅大堂 |
| 19 | `kl_summit.jpg` | 昆仑山 · 凌霄峰万年冰川 | 48 | `xj_minzhong.jpg` | 辽燕京 · 悯忠寺古塔法堂 |
| 20 | `kl_swordvalley.jpg` | 昆仑山 · 昆仑惊虹剑谷 | 49 | `xq_yipin.jpg` | 兴庆府 · 西夏一品堂暗殿 |
| 21 | `kl_yaochi.jpg` | 昆仑山 · 瑶池仙境暖玉池 | 50 | `yz_24bridge.jpg` | 扬州 · 二十四桥明月夜 |
| 22 | `lh_altar.jpg` | 辽上京 · 契丹天神祭天坛 | 51 | `yz_chaoguan.jpg` | 扬州 · 运河钞关税关司 |
| 23 | `lh_goldtent.jpg` | 辽上京 · 捺钵大金帐 | 52 | `yz_salt.jpg` | 扬州 · 两淮盐运使衙门 |
| 24 | `lh_ironcav.jpg` | 辽上京 · 铁林铁鹞大校场 | 53 | `zd_longxing.jpg` | 真定府 · 隆兴寺千手千眼阁 |
| 25 | `ly_baimasi.jpg` | 洛阳 · 白马寺齐云塔 | 54 | `zd_market.jpg` | 真定府 · 常山商市马行街 |
| 26 | `ly_gaibang.jpg` | 洛阳 · 丐帮总舵城隍破庙 | 55 | `zd_spear.jpg` | 真定府 · 赵云故里演武堂 |
| 27 | `ly_jindao.jpg` | 洛阳 · 金刀王府正气大厅 | 56 | `zn_stream.jpg` | 终南山 · 水帘深潭静室 |
| 28 | `ly_peony.jpg` | 洛阳 · 牡丹花会万花雅集 | 57 | `zn_tao.jpg` | 终南山 · 全真祖庭重阳宫 |
| 29 | `ly_shuyuan.jpg` | 洛阳 · 伊川书院讲经堂 | 58 | `zn_tomb.jpg` | 终南山 · 古墓石棺寒玉床 |

---

### 3. 角色立绘与头像 (`public/assets/characters/` - 共 113 张)

#### (1) 人物头像库 (`public/assets/characters/avatars/` - 51 张)
- 历史名人与核心侠客：
  - `NPC-0001.jpg` (赵顼 / 宋神宗)
  - `NPC-0002.jpg` (王安石)
  - `NPC-0003.jpg` (司马光)
  - `NPC-0004.jpg` (苏轼)
  - `NPC-0005.jpg` (章惇)
  - `NPC-0006.jpg` (蔡京)
  - `NPC-0008.jpg` (高太后 / 宣仁皇太后)
  - `NPC-0009.jpg` (向太后)
  - `NPC-0012.jpg` (苏辙)
  - `NPC-0013.jpg` (黄庭坚)
  - `NPC-0021.jpg` (种师道)
  - `NPC-0022.jpg` (折克行)
  - `NPC-0023.jpg` (狄咏)
  - `NPC-0024.jpg` (李宪)
  - `NPC-0025.jpg` (王厚)
  - `NPC-0026.jpg` (苗授)
  - `NPC-0031.jpg` (耶律洪基)
  - `NPC-0041.jpg` (段正明)
  - `NPC-0042.jpg` (段正淳)
  - `NPC-0043.jpg` (高升泰)
  - `NPC-0055.jpg` (李秋水)
  - `NPC-0061.jpg` (乔峰 / 萧峰)
  - `NPC-0062.jpg` (虚竹)
  - `NPC-0063.jpg` (段誉)
  - `NPC-0064.jpg` (慕容复)
  - `NPC-0081.jpg` (扫地僧)
  - `NPC-0082.jpg` (玄慈方丈)
  - `NPC-0083.jpg` (玄难大师)
  - `NPC-0101.jpg` ~ `NPC-0107.jpg` (段延庆、叶二娘、岳老三、云中鹤等四大恶人与西夏豪强)
  - `NPC-0109.jpg` ~ `NPC-0144.jpg` (天山童姥、无崖子、萧远山、包不同、风波恶、鸠摩智、游坦之等宗师与豪杰)

#### (2) 人物全身立绘库 (`public/assets/characters/fullbody/` - 50 张)
- 对应核心角色全身大图，包含：
  - `NPC-0001.jpg` ~ `NPC-0006.jpg` (朝堂诸公与帝王立绘)
  - `NPC-0009.jpg`, `NPC-0012.jpg`, `NPC-0013.jpg` (苏门学士与太后)
  - `NPC-0021.jpg` ~ `NPC-0026.jpg` (西北西军名将威武铠甲立绘)
  - `NPC-0031.jpg` (辽国皇帝御服立绘)
  - `NPC-0041.jpg` ~ `NPC-0044.jpg` (大理皇族长袍立绘)
  - `NPC-0055.jpg` (逍遥派李秋水绝美白衣立绘)
  - `NPC-0061.jpg` ~ `NPC-0065.jpg` (乔峰、虚竹、段誉、慕容复、王语嫣全身立绘)
  - `NPC-0082.jpg` (玄慈方丈袈裟立绘)
  - `NPC-0101.jpg` ~ `NPC-0107.jpg` (四大恶人全身立绘)
  - `NPC-0110.jpg` ~ `NPC-0144.jpg` (逍遥三老、萧远山、鸠摩智等武林至尊全身立绘)
  - `NPC-0236.jpg` (隐士高人立绘)

#### (3) 通用门派与职业全身模板 (`public/assets/characters/templates/` - 12 张)
当 NPC 未分配唯一专属原画时，系统由 `assetLoader.ts` 自动降级映射至对应门派/身份模板：
- `tpl_dali_prince_fb.jpg`: 大理世子 / 滇南贵胄
- `tpl_emei_heroine_fb.jpg`: 峨眉女侠 / 剑派闺秀
- `tpl_greenwood_hero_fb.jpg`: 绿林好汉 / 豪迈草莽
- `tpl_khitan_warrior_fb.jpg`: 契丹勇士 / 北方骑士
- `tpl_shaolin_monk_fb.jpg`: 少林高僧 / 禅武武僧
- `tpl_song_empress_fb.jpg`: 大宋贵妇 / 宫闱后妃
- `tpl_song_physician_fb.jpg`: 儒雅名医 / 悬壶郎中
- `tpl_song_scholar_fb.jpg`: 大宋儒士 / 汴京才子
- `tpl_taohua_master_fb.jpg`: 碧海散人 / 奇门术士
- `tpl_taoist_master_fb.jpg`: 玄门羽士 / 武当真人
- `tpl_unorthodox_master_fb.jpg`: 邪派宗师 / 塞外怪客
- `tpl_woman_general_fb.jpg`: 巾帼名将 / 杨门女将

---

## 五、工具链、数据编译与构建命令

### 1. 开发与构建命令
在项目根目录 `/home/antigravity/zhby99/northern-song-chronicles` 执行：

```bash
# 安装依赖
npm install

# 启动本地开发服务 (支持 HMR 热更新)
npm run dev

# 编译 TypeScript 并打包生产资源至 dist/ 目录
npm run build

# 本地预览构建产物
npm run preview
```

### 2. 数据与素材自动化维护脚本 (`scripts/`)
- **`python3 scripts/compile_game_db.py`**:
  校验 `src/data/` 中的 JSON 数据关联完整性，验证州府、建筑、NPC、武学之间外键 ID 的正确性。
- **`python3 scripts/archive_all_branch_assets.py`**:
  维护 `assets_raw_masters/` 与 `public/assets/` 资源对应关系，自动同步新增素材并生成哈希校验表。
- **`python3 scripts/build_preview_artifact.py`**:
  用于把当前游戏打包为单文件/离线预览沙盒包。

---
*注：本项目所有图片素材与代码版权归《北宋群侠传》开发组所有。*
