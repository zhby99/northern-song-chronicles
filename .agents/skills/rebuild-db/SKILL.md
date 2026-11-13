---
name: rebuild-db
description: 从 docs/*.md 七大设定专卷重新编译结构化 JSON 游戏数据库（src/data/*.json），校验零悬空引用，并执行 TypeScript 类型检查与 Lint 验证。修改设定集、人物、武学、披挂或地区建筑数据后调用。
---

# 重编并校验《北宋立志传》结构化数据库 (`/rebuild-db`)

当修改了 `docs/` 目录下的任何 Markdown 设定文档（`GAME_MECHANICS.md`、`MARTIAL_ARTS_SECTS.md`、`MARTIAL_ARTS_COMPENDIUM.md`、`MARTIAL_ARTS_STATS.md`、`EQUIPMENT_COMPENDIUM.md`、`REGIONAL_MAPS_AND_BUILDINGS.md`、`CHARACTER_COMPENDIUM.md`）或 `scripts/compile_game_db.py` 时，遵循本技能执行幂等重编与完整性验证。

## 执行步骤

1. **规范化文档引用（若涉及地名或跨表链接修改）**：
   ```bash
   npm run normalize:docs
   ```
2. **编译结构化 JSON 数据库**：
   ```bash
   npm run build:db
   ```
   - 确认输出中 43 地区（`regions.json`）、30 门派 + 11 组织（`idRegistry.json`）、268 座建筑（`buildings.json`：147 特殊 + 121 基础）、216 武学（`martial_arts.json`）、100 百兵（`weapons.json`）、1,000 名 NPC（`npcs.json`）编译成功，且**悬空外键引用数为 0**。
3. **静态检查与生产构建校验**：
   ```bash
   npm run lint && npm run build
   ```
   - 确保生成的 JSON 完全符合 `src/types/game.ts` 与 `src/data/gameDb.ts` 的严格 TypeScript 类型约束。
