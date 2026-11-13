# 《北宋立志传》音频资源四分类目录 (`public/assets/audio/`)

本目录存放游戏运行时按需加载的全部配乐资产（`.mp3` / `.ogg`），严格对齐 `src/data/idRegistry.json` 标准 ID，分为四大目录：

| 分类目录 | 用途说明 | 命名 / 子目录规范 |
| :--- | :--- | :--- |
| `world/` | **大地图背景乐**（天下舆图 / 四夷山海宏观行军配乐） | 例：`world/huayi_shanhai.mp3` |
| `regions/<regionId>/` | **地区配乐**（38 州府、名山宗门与战略雄关专属背景乐） | 已按 38 地区标准 ID 建好子目录；如开封府（`REG-01 · bianliang`）：`regions/bianliang/dongjing_menghua.mp3` |
| `characters/` | **人物配乐**（关键历史名臣与武林宗师登场/专属主题曲） | 推荐使用标准人物 ID 前缀，例：`characters/NPC-0001_zhaozhen.mp3` 或 `characters/qiaofeng.mp3` |
| `events/` | **事件配乐**（奇遇、朝堂廷议、科举、8×8 战棋交锋、胜负结算等） | 例：`events/battle_skirmish.mp3`、`events/imperial_court.mp3` |
