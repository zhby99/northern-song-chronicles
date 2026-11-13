# 《北宋立志传》（Northern Song Chronicles）

公元 1050 年（宋仁宗皇祐二年）开放世界历史武侠 RPG 模块化前端工程。

## 当前工程里程碑进度（Phase M0 全部完成）
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

## 常用开发命令

```bash
npm run dev            # 启动本地开发服务器 (0.0.0.0:5173)
npm run build:db       # 从 docs/*.md 重新编译结构化静态 JSON 数据库
npm run normalize:docs # 幂等规范化 Markdown 设定文档地名与链接并重编数据库
npm run lint           # 运行 oxlint 静态检查
npm run build          # 运行 tsc -b 严格类型校验与 Vite 生产分包构建
```
