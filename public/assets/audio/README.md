# 《北宋立志传》音频资源四分类目录 (`public/assets/audio/`)

本目录由 Vite 构建插件（`vite.config.ts` 中的 `northernSongAudioManifestPlugin`）与运行时引擎 `src/utils/bgmManager.ts` **自动扫描识别**。

你只需将音频文件按 **`1.mp3`, `2.mp3`, `3.mp3`, `4.mp3`, `5.mp3`...** 命名放入对应目录，无需手改任何代码，游戏就会根据当前所在场景/州府，严格按数字顺序 `1 -> 2 -> 3 -> ... -> 1` 自动循环播放！

| 分类目录 | 触发时机与回退规则 | 序号命名示例 |
| :--- | :--- | :--- |
| `world/` | **大地图背景乐**（处于天下舆图，或当前地区尚未放入专属配乐时自动回退） | `world/1.mp3`, `world/2.mp3`, `world/3.mp3`... |
| `regions/<regionId>/` | **地区配乐**（进入 43 州府/宗门全景或城内建筑时自动切换并从 `1` 开始按序播放） | 开封府：`regions/bianliang/1.mp3`, `2.mp3`... |
| `characters/<npcId>/` | **人物配乐**（触发关键历史名臣/大侠专属交互时高优先级切入） | `characters/NPC-0001/1.mp3` 或 `characters/NPC-0110/1.mp3` |
| `events/<eventId>/` | **事件配乐**（触发奇遇、廷议、三择一武侠回合交锋时最高优先级切入） | `events/battle/1.mp3`, `events/battle/2.mp3`... |
