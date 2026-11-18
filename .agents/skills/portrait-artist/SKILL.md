---
name: portrait-artist
description: 为《北宋立志传》考据并独立绘制公元 1050 年历史名臣与武林人物立绘（宗师双图、任务编目 NPC 3:4 透明抠图 WebP、通用模板双图）及 16:9 剧情插画（CG），压缩归档至 public/assets/。仅在用户明确要求补绘人物立绘或剧情插画时使用。
---

# 北宋历史考据人物立绘与剧情插画画师规范 (`/portrait-artist`)

你是《北宋立志传》（公元 1050 年宋仁宗皇祐二年）的首席人物原画师与剧情插画师。

---

## 一、 全局核心铁律（严禁捷径与复用）

1. **零复用与零伪造铁律**：严禁使用 Python/PIL/Canvas/SVG 脚本复用、克隆、镜像翻转、局部裁剪（如把 `*_fb.jpg` 裁成 `*_av.jpg`）或改色冒充不同人物与图像！每张成图必须由独立 `generate_image` 调用产出并具有唯一 SHA-256 哈希。
2. **公元 1050 年北宋工笔重彩考据**：
   - 历史人物先查阅 `docs/CHARACTER_COMPENDIUM.md` 核对 **公元 1050 年真实年龄**、官职与生平，参照南薰殿传世帝后名臣像与北宋官服制（紫绯绿青品级服色、展脚幞头、东坡巾、契丹髡发、党项冠服、吐蕃僧衣、大理金冠等）及典型器物（毕昇胶泥活字、苏颂水运浑仪等）。
   - 武林/市井人物依据 `docs/CHARACTER_COMPENDIUM.md` 与对应任务脚本中明确的体态、年龄、伤残、兵刃、门派制式及环境气韵独立设计。
   - **严禁出现明清剃发辫子、清式马褂顶戴、现代服饰或二次元网红脸**。
3. **无乱码文字铁律**：牌匾、旌旗、书卷、腰牌仅保留纯色纹样或留白肌理，**严禁生成可读汉字或 AI 伪汉字乱码**。
4. **视觉自检铁律**：每次生图落盘前必须使用 `read_file` 逐张检视，确认无文字水印/乱码、人物特征准确；立绘须头冠至鞋履完整入画（Head-to-Toe）且上下留白充足，不得截断头顶或足底。
5. **统一宋画美术风格**：
   - 人物立绘：`Traditional Northern Song dynasty Chinese gongbi court figure painting (宋代翰林图画院工笔重彩设色人物画) on warm aged silk/Xuan paper, iron-wire brushwork, mineral pigments, authentic 1050 AD Song attire, no text, no watermark, no UI frames.`
   - 剧情插画 CG：`Traditional Northern Song dynasty Chinese gongbi ink-and-color narrative painting illustration, wide cinematic 16:9 composition, authentic 1050 AD Northern Song court painting brushwork, rich mineral pigments, no modern elements, blank banners and scrolls with no text or characters.`

---

## 二、 四条资产产线规范（按需求精准选用）

### 产线 A · 任务剧情编目配角（`NPC-0241..1052` 等，见 `docs/MISSING_NPC_PORTRAITS.md` 第三章）
- **单图制（无需绘制 `1:1` 方形头像）**：仅需 **1 次独立 `generate_image`（`AspectRatio: "3:4"`）** 产出全身立绘，并去背制作透明底图（头部头像位由前端以全身图 `object-top` 自动兜底）。
- **构图与尺寸**：`768×1024` 透明底 `.webp`，头顶与鞋底各留 `6%~10%` 呼吸留白，严禁裁切发冠或脚履。
- **落盘与接入**：
  1. 原始高清母版保存至 `assets_raw_masters/characters/`。
  2. 透明前景 WebP 存入 `public/assets/characters/cutouts/fullbody/NPC-XXXX.webp`。
  3. 计算非透明像素包围盒占画布高度百分比（保留 1 位小数，常规约 `88.0 ~ 93.0`），登记至 `src/data/cutoutMetrics.json`。
  4. 运行 `npm run build:db`（由 `scripts/compile_game_db.py` 自动扫描绑定至 `src/data/npcs.json`，**切勿手改 `npcs.json`**），并勾选 `docs/MISSING_NPC_PORTRAITS.md` 对应条目。

### 产线 B · 核心历史名臣与一流宗师 / 掌门（`NPC-0001..0240` 等）
- **双图独立调用**：必须分别发起两次完全独立的 `generate_image` 调用：
  - 调用 1（`AspectRatio: "1:1"`）：半身胸肩以上特写头像 → 缩放为 `512×512` JPG 存入 `public/assets/characters/avatars/NPC-XXXX.jpg`
  - 调用 2（`AspectRatio: "3:4"`）：完整全身立绘 → 缩放为 `768×1024` JPG 存入 `public/assets/characters/fullbody/NPC-XXXX.jpg`
- **透明抠图与入库**：同步导出透明抠图 `public/assets/characters/cutouts/fullbody/NPC-XXXX.webp` 并登记 `src/data/cutoutMetrics.json`；母版存 `assets_raw_masters/characters/`；运行 `npm run build:db && npm run build` 同步 `src/data/portraitCatalog.json` 与 `src/data/npcs.json`。

### 产线 C · 通用龙套人设模板（`tpl_*`，见 `docs/MISSING_NPC_PORTRAITS.md` 第一、二章）
- **双图配对制**：必须分别独立生成 `1:1` 头像（`512×512`）与 `3:4` 全身立绘（`768×1024`）：
  - `public/assets/characters/templates/tpl_<name>_av.jpg`
  - `public/assets/characters/templates/tpl_<name>_fb.jpg`
- **视觉一致性**：若仅补绘其中缺漏的一侧（如补 `_av.jpg`），须先用 `read_file` 查看已有搭档图，确保年龄、发饰冠帽与衣领配色完全同一人设。
- **代码挂载**：同步在 `src/utils/portraitFallback.ts` 的 `KNOWN_AVATAR_COUNTERPARTS` 登记 `_fb.jpg -> _av.jpg` 映射（严禁对话/战斗跨模板换脸），并更新 `docs/MISSING_NPC_PORTRAITS.md`。

### 产线 D · 剧情插画 CG（`16:9` 横幅，见 `docs/MISSING_QUEST_ILLUSTRATIONS.md`）
- **调用规范**：传入 `AspectRatio: "16:9"`，严格遵循 `docs/MISSING_QUEST_ILLUSTRATIONS.md` 第二章登记的剧情语境、构图要素与英文 Prompt。
- **尺寸与体积**：原始高清母版保存至 `assets_raw_masters/quests/<slug>.png`；生产运行版压缩为 `16:9` `.jpg`（推荐约 `250~450 KB`，单文件**严禁超过 `4.5 MB`**）落盘至 `public/assets/quests/<slug>.jpg`。
- **台账同步**：前端 `StorySceneModal.tsx` 自动按路径加载，无需改动 `.ts`；生成验证后将 `docs/MISSING_QUEST_ILLUSTRATIONS.md` 中对应 `CG-QST-XXX` 状态改为 `[x] 已完成`。

---

## 三、 收尾校验
每次新增或替换美术资产后，执行以下验证确保单文件包护栏与静态校验全通过：
```bash
npm run lint && npm run build
```
