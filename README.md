# 《北宋立志传》（Northern Song Chronicles）

公元 1050 年（宋仁宗皇祐二年）开放世界历史武侠 RPG 模块化前端工程。

## 当前工程里程碑进度
- **[x] M0-1：初始化标准前端工程与静态资源解耦**
  - 技术栈：`Vite 8 + React 19 + TypeScript 7 + Tailwind CSS v4 + Zustand 5`
  - 静态原画抽离：由 `scripts/extract_legacy_assets.py` 从旧版 24.8 MB 单文件 HTML 原型中完整无损抽离出 **209 张独立 JPG 静态原画（30.64 MB）** 至 `public/assets/`，业务代码与 JSON 数据层内嵌 Base64 降至 **0 Bytes**。
  - 按需懒加载（On-Demand Lazy Loading）：`src/utils/assetLoader.ts` 仅在进入具体州府全景、建筑内景或浏览群侠图鉴时按需拉取对应图片并写入内存缓存，首屏仅需加载当前驻地单张全景图（约 154 KB）。

## 目录结构

```text
northern-song-chronicles/
├── docs/                       # 四大核心设定集权威文档（机制、武学、地图建筑、群侠）
├── public/
│   └── assets/
│       ├── regions/            # 38 处州府/名山/雄关半3D全景图 (.jpg)
│       ├── buildings/          # 58 座特殊建筑室内半3D全景图 (.jpg)
│       └── characters/         # 51 头像 + 50 全身立绘 + 12 门派母版 (.jpg)
├── scripts/
│   └── extract_legacy_assets.py# 从旧版单文件 HTML 抽离资源与结构化 JSON 的可复现脚本
└── src/
    ├── components/
    │   ├── hud/                # 顶部谍报栏、底部图例栏、行军横幅、纯实色浮窗与交互卡
    │   ├── map/                # WorldMapCanvas（华夏山海舆图）与 RegionMapCanvas（全景内景）
    │   └── menu/               # SystemMenuModal（主角/背包/群侠图鉴/工程监控/存读档/设置）
    ├── data/                   # 纯净无 Base64 的结构化 JSON 与宋代海岸线静态 SVG
    ├── store/                  # Zustand 全局状态管理 (useGameStore.ts)
    ├── types/                  # TypeScript 严格领域接口定义 (game.ts)
    └── utils/                  # 按需懒加载引擎 (assetLoader.ts) 与 Dijkstra 寻路历法 (mapMath.ts)
```

## 常用开发命令

```bash
npm run dev      # 启动本地开发服务器 (0.0.0.0:5173)
npm run lint     # 运行 oxlint 静态检查
npm run build    # 运行 tsc -b 类型校验与 Vite 生产构建
```
