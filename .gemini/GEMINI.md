# 《北宋立志传》(Northern Song Chronicles) — Antigravity 本地工作区记忆

请始终遵循项目根目录 [AGENTS.md](../AGENTS.md) 中的完整工程守则与全局上下文：

1. **时空背景铁律**：公元 1050 年（北宋仁宗皇祐二年 · 《天龙八部》前传黄金时代），宋辽夏 19 城统一三字府名规制，全部实体 ID 对齐 `src/data/idRegistry.json`。
2. **当前进度锚点**：Phase M0（模块化 Vite 8 + React 19 + TS 7 + Tailwind v4 + Zustand 5 工程、209 张运行原画解耦、1000 人 / 216 武学 / 38 地区 / 123 特殊建筑编译数据库、三层空间视图、IndexedDB 多槽位存取档）已 100% 收官；当前准备推进 **Phase M1（开局创角 · 216 武学数值化 · 养成经济与门派拜师闭环）**。
3. **开发约束**：
   - 先跑通 M1~M3 纯本地确定性可玩闭环，M4 再接入 LLM，期间不主动发散批量生图任务（已有 `SvgBuildingInteriorFallback.tsx` 与门派模板兜底）。
   - 先读 `docs/ROADMAP_AND_TODO.md`、`docs/HANDOFF_CONTEXT.md` 与 `PROJECT_GUIDE.md` 了解上下文。
   - 修改 `docs/*.md` 后通过 `npm run build:db` 重新编译生成 `src/data/*.json`，严禁内嵌 Base64 图片。
   - 交付变更前执行 `npm run lint && npm run build` 校验通过。
