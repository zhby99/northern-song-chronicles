# 《北宋立志传》3D 演武场资产管线（即梦 + Tripo3D + Suno）

本指南遵循 `guizang-game-skill` 实战规范，确保《北宋立志传》的 **Three.js 斜俯视 3D 演武场**在程序化素体跑通的基础上，可随时无缝热插拔 **即梦设定图 / 图标 / 配音**、**Tripo3D 绑骨模型** 与 **Suno 战阵雅乐**。

---

## 一、 即梦（Dreamina CLI）上游素材规范

- **已配置环境**：`C:\Users\zhang\bin\dreamina-canvas.exe`（`v1.4.1`，支持文生图、图生图、智能配音 TTS 与积分报价）。
- **出图铁律**：
  1. **给 Tripo3D 用的设定图**：必须要求「**单个物体、完整入画、T-pose 正面（或三视图）、纯浅灰无缝棚拍背景、均匀漫射光、无投影、零光效粒子**」，否则光效会被建成死板几何体。
  2. **技能图标**：一次出一排黑底同风圆形武学图标，再裁切进 `public/assets/combat3d/icons/`。
  3. **配音后处理**：先将音量峰值拉到 `-2dB`，再裁去首尾静音。

---

## 二、 Tripo3D 模型接入与热插拔（零改动代码替换）

- **API Key 安全存放**：已配置于根目录 `.env.local`（被 `.gitignore` 的 `*.local` 忽略）。
- **模型放置路径**（`glbModelLoader.ts` 自动探测，文件存在即自动加载并按左右大腿骨校正朝向与贴地缩放）：
  - **8 套门派素体**：`public/assets/combat3d/models/sect_{swordsman,shaolin_monk,taoist,beggar,imperial_guard,western_monk,emei_heroine,poison_adept}.glb`
  - **7 类百兵挂件**：`public/assets/combat3d/models/weapon_{sword,blade,spear,staff,fan,gauntlet,hidden}.glb`
- **压缩与打包铁律**：
  - 贴图压至 `1024 WebP`；
  - **带骨骼角色严禁使用 `quantize` 顶点量化**（只用 `EXT_meshopt_compression` 并剥离动画 `.scale` 轨道），防止单文件打包后角色缩小一半；
  - `scripts/build_preview_artifact.mjs` 已原生支持将 `public/assets/**/*.glb` 收入离线单文件分片，运行时经 `getPackedAssetArrayBuffer()` 零网络解析。

---

## 三、 Suno 北宋战阵配乐提示词（可直接复制生成）

将生成好的 `.mp3` 放入 `public/assets/audio/events/`（如 `battle_duel.mp3`、`battle_climax.mp3`），`bgmManager.ts` 会自动扫描并按 `-14 LUFS` 归一化交叉淡入：

1. **常规切磋交锋（`duel`）**
   > `Northern Song Dynasty Chinese martial arts duel theme, traditional pipa rapid tremolo, guzheng plucks, bamboo xiao flute, crisp wooden clappers and war drum groove, tense heroic wuxia atmosphere, D minor pentatonic, 118 BPM, instrumental only, no vocals, seamless loop`
2. **残血死斗（`climax`）**
   > `Intense ancient Chinese wuxia boss battle music, fast-paced erhu, thunderous taiko and jiegu war drums, urgent suona and pipa duel, dramatic climax, 142 BPM, instrumental only, no vocals, seamless loop`
3. **宗师 / 镇派决战（`boss`）**
   > `Epic Northern Song imperial palace duel, bronze chime bells bianzhong, deep guqin harmonics, driving orchestral Chinese percussion and bamboo flute, solemn and overwhelming martial arts mastery, 128 BPM, instrumental only, no vocals, seamless loop`
