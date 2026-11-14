# 《北宋立志传》音频资源目录 (`public/assets/audio/`)

本目录由 Vite 构建插件（`vite.config.ts` 中的 `northernSongAudioManifestPlugin`）与运行时引擎 `src/utils/bgmManager.ts` **自动扫描识别**。

## 一、 目录优先级与自动识别规则

你只需将音频文件按 **`1.mp3`, `2.mp3`, `3.mp3`...** 命名放入对应目录，无需手改任何代码，游戏就会根据当前所在场景/州府自动按数字顺序循环播放；若跨州府切换前后解析到同一首曲目（例如同属河朔雄州或江南繁华弦歌），Web Audio 引擎会自动保持**无缝不断曲续播**！

| 分类目录 | 触发时机与优先级规则 | 命名与覆盖示例 |
| :--- | :--- | :--- |
| `events/<eventId>/`（兼容 `others/`） | **事件与战阵配乐（最高优先级）**：触发武侠回合交锋时自动切入战曲（记忆州府原曲秒数、重击侧链闪避、残血决死疾奏、终局余韵帷幕，收剑后无缝续播原曲） | `events/battle/1.mp3` 或直接放入 `others/` 任意音频文件 |
| `characters/<npcId>/` | **人物配乐（次高优先级）**：触发关键历史名臣/大侠专属交互时切入 | `characters/NPC-0001/1.mp3`, `characters/NPC-0110/1.mp3` |
| `regions/<regionId>/` | **地区独立专属配乐（已预建全部 43 个地区目录）**：只要目录内放入音频文件，即自动优先覆盖共享曲目 | 开封府：`regions/bianliang/1.mp3`；京兆府自定义覆盖：`regions/changan/1.mp3` |
| `shared/` + `shared/region_themes.json` | **跨州同曲共享池（去重省空间 63.5 MB）**：当 `regions/<regionId>/` 下暂无独立音频时，按 `region_themes.json` 自动挂载对应地域雅乐 | 河朔京畿 `shared/northern_prefectures.mp3`、大辽四京 `shared/liao_capitals.mp3` 等 8 首共享曲 |
| `world/` | **大地图背景乐（全局兜底）**：处于天下舆图，或某地区既无独立曲目也未配置共享曲目（如雁门关、剑门关）时自动回退 | `world/1.mp3`, `world/2.mp3`... |

## 二、 43 地区目录对照速查（如欲单独替换某地音乐，直接放入 `1.mp3` 即可）

- **京畿与北方诸府**：`bianliang`（开封府）、`luoyang`（洛阳府）、`changan`（京兆府）、`daming`（大名府）、`jinan`（济南府）、`zhending`（真定府）、`taiyuan`（太原府）、`yanan`（延安府）、`qinzhou`（秦州府）
- **江南淮南与东南**：`jiangning`（江宁府）、`yangzhou`（扬州府）、`suzhou`（苏州府）、`hangzhou`（杭州府）、`quanzhou`（泉州府）、`guangzhou`（广州府）
- **荆湖江西与川陕**：`xiangyang`（襄阳府）、`jiangling`（江陵府）、`hongzhou`（洪州府）、`tanzhou`（潭州府）、`chengdu`（成都府）
- **四夷重镇**：`xijin_liao`（析津府）、`dading_liao`（大定府）、`linhuang_liao`（临潢府）、`liaoyang_liao`（辽阳府）、`xingqing_xixia`（兴庆府）、`luosuo_tubo`（逻些城）、`dali`（大理城）
- **名山宗门与雄关**：`shaolin`（少室山·少林寺）、`songshan`（嵩山·五岳盟）、`zhongnanshan`（终南山）、`huashan`（华山）、`wutaishan`（五台山）、`hengshan`（恒山）、`yanmenguan`（雁门关）、`jianmenguan`（剑门关）、`qingcheng`（青城山）、`emeishan`（峨眉山）、`yanziwu`（姑苏·燕子坞）、`taohuadao`（东海·桃花岛）、`nanshaolin`（莆田·南少林）、`wuliangshan`（滇南·无量山）、`tianshan`（西域·天山缥缈峰）、`xingxiuhai`（西域·星宿海）

## 三、 全场景无损响度自动对齐（EBU R128 `-14.0 LUFS`）

- **零重编码无损增益**：`loudness_profiles.json` 记录了全部曲目的 `ffmpeg` EBU R128 积分响度与中位响度补偿值（统一对齐至 **`-14.0 LUFS`**），由 `bgmManager.ts` 通过 Web Audio `GainNode -> DynamicsCompressorNode -> MasterGain` 无损施加，并自动裁剪首尾静音空白，绝不二次压缩损伤 MP3 音质。
- **新曲即插即对齐**：日后往任意目录新增 `.mp3` 时，即使不运行 `python3 scripts/calibrate_audio_loudness.py`，前端解码 `AudioBuffer` 时也会在 `< 2ms` 内自动执行 BS.1770 K 加权门限响度测算并实时对齐音量！

