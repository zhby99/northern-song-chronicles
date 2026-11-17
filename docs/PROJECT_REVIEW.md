# 《北宋立志传》全项目审查报告

> 审查范围：`src/`（约 9.8 万行 TS，其中任务数据约 4.56 万行，占 47%）、`docs/` 七大设定卷、`scripts/`。
> 已验证的基线状态：`npm run lint` 0 警告 0 错误 ✅；`npm run build` 通过 ✅；全库只有 2 处 `any`；**单元测试 0 个** ⚠️。

---

## 〇、已确认的 Bug（✅ 已全部修复完成）

| # | 状态 | 问题 | 位置 / 处理结果 |
|---|---|---|---|
| 1 | ✅ 已完成 | `verify_quests.mjs` 按 `err.questId/path/message` 打印报错，但校验器返回的是 `string[]`，所以失败时只会输出 `undefined`。另外 `npm run lint` 没有包含 `verify:quests` | [verify_quests.mjs](file:///home/antigravity/zhby99/northern-song-chronicles/scripts/verify_quests.mjs) 改为直接输出字符串错误，并接入 [package.json](file:///home/antigravity/zhby99/northern-song-chronicles/package.json) 的 `npm run lint` |
| 2 | ✅ 已完成 | 在渲染中调用 `useGameStore.getState()`，状态变化时立绘和姓名不会刷新 | [LoadoutTab.tsx](file:///home/antigravity/zhby99/northern-song-chronicles/src/components/menu/tabs/LoadoutTab.tsx) 改为响应式 `useGameStore((s) => ...)` 订阅 |
| 3 | ✅ 已完成（已取消该功能） | **十艺「唱和」可以无限刷**：每次只耗 1 时辰，主艺 +2，没有冷却，也不比较 NPC 技艺，一天能涨约 24 级 | 已从 [ContextInspectorCard.tsx](file:///home/antigravity/zhby99/northern-song-chronicles/src/components/hud/ContextInspectorCard.tsx)、[storeTypes.ts](file:///home/antigravity/zhby99/northern-song-chronicles/src/store/storeTypes.ts)、[combatSocialSlice.ts](file:///home/antigravity/zhby99/northern-song-chronicles/src/store/slices/combatSocialSlice.ts) 彻底移除「唱和」功能 |
| 4 | ✅ 已完成 | **十艺 exp 与等级不同步**：唱和和任务效果直接改 `skills`，不更新 `artExps`，下次正规修习时等级会倒退 | 新增 `syncArtLevelsToExpsAndMilestones`，在 [questSlice.ts](file:///home/antigravity/zhby99/northern-song-chronicles/src/store/slices/questSlice.ts)、[cultivationSlice.ts](file:///home/antigravity/zhby99/northern-song-chronicles/src/store/slices/cultivationSlice.ts)、[loadoutInventorySlice.ts](file:///home/antigravity/zhby99/northern-song-chronicles/src/store/slices/loadoutInventorySlice.ts)、[navigationTravelSlice.ts](file:///home/antigravity/zhby99/northern-song-chronicles/src/store/slices/navigationTravelSlice.ts) 全链路同步 `artExps` 与 `80/90` 里程碑天赋 |
| 5 | ✅ 已完成 | `doBuildingAction` 已经没有任何 UI 调用，但地图 Tooltip 仍然显示「衙门 +16 两 / 演武 +35 战经」 | 移除废弃的 `doBuildingAction` 死代码，同步更新 [mapMath.ts](file:///home/antigravity/zhby99/northern-song-chronicles/src/utils/mapMath.ts) 基础建筑说明与 [BagTab.tsx](file:///home/antigravity/zhby99/northern-song-chronicles/src/components/menu/tabs/BagTab.tsx) 文案 |
| 6 | ✅ 已完成 | 年号表只写到至和二年，第 6 年以后永远停在至和二年，可天阶内功要练 8~15 年 | [mapMath.ts](file:///home/antigravity/zhby99/northern-song-chronicles/src/utils/mapMath.ts) `getSongDateParts` 补全北宋历代年号表（皇祐→至和→嘉祐→治平→熙宁→元丰→元祐等）及动态纪年兜底 |
| 7 | ✅ 已完成（交叉审查顺带修复） | 其它已确认底层状态 Bug：① 太行重伤 `taihang_heavy_injury` 在多处属性重算与开战时漏传导致折半失效；② 佩饰增益先天禀赋未参与天阶兵甲穿戴检定；③ 抄经不足一日（3 时辰未跨日）误触发跨日/月度钩子；④ 闭关结束/提前出关重复双倍结算回血回内；⑤ 读档时空数组 `learnedArts: []` 被覆盖回初始武学 | 已于 `store/slices/*`、`saveManager.ts`、`combatEngine.ts` 一并修复 |

---

## 一、代码重构与优化

### P0：先建安全网，再拆巨型函数

1. **引入 Vitest**（与 Vite 零配置集成）。按以下顺序补测试：
   - `evaluateQuestCondition` / `collectUnmetQuestReasons`
   - 战斗公式（`computeEffectiveAgility`、`canFighterEscape` 等）
   - `evaluateSectEntry` / `evaluateSectPromotion`
   - 存档的往返序列化
   - 把 `validateAllRegisteredQuests` 改写成测试用例
2. **战斗引擎注入 RNG**：`combatEngine.ts` 里有 14 处直接调用 `Math.random`，统一改成传入 `rng: () => number` 参数。这样才能做固定种子的快照测试，日后实现回放和存档读回也会用到。
3. **拆分 `resolveCombatRound`**（[combatEngine.ts:925-2282](file:///home/antigravity/zhby99/northern-song-chronicles/src/utils/combatEngine.ts#L925-L2282)，单个函数约 1360 行）：
   ```
   engine/combat/{types, rng, formulas, combatants, ai}.ts
   engine/combat/round/{context, initiative, resolveStep, endOfRound, outcome}.ts
   engine/combat/effects/registry.ts   // Record<FxKey, {onBeforeHit, onAfterHit, onRoundEnd...}>
   ```
   约 50 个天阶特效键（如 `xisui_ward`、`beiming_drain`）目前散落在主循环里，应收敛成 `FxKey` 联合类型加一张注册表。
4. **抽出入派逻辑**：同一套「入派 + 海捕 + 赠礼」流程在三处复制粘贴（`sectSlice.ts:82-298`、`questSlice.ts:580-686`、`cultivationSlice.ts:840-856`）。建议抽成纯函数 `buildJoinSectPatch()`。
5. **统一推进时间的副作用**：`advanceShichenClock → 日钩子 → 过期检查 → 伏击 → 自动存档` 这串逻辑散落在至少 9 处（`startNpcCombat` 被调用 20 次，`checkExpiredQuestDeadlines` 18 次）。建议统一成 `commitTimeAdvance()`。同时 `stepCultivationTick`（约 930 行）按 session 类型拆成 4 个纯函数 `tick()`。
6. **改造 `runQuestEffects`**（`questSlice.ts:89-1024`，37 个 case 的巨型 switch）：改成按效果类型分发的处理器注册表，并把多个效果合并到一次 `set` 里提交，减少重复渲染。

### P1：任务 DSL 瘦身与数据归位

- **任务文件可缩减 30~35%（约 1.5 万行），文字一字不改**：

  | 模式 | 数量 | 处理方式 |
  |---|---|---|
  | 对白 beat，每条约 4 行 | 2,785 处 | `N('…')` / `P('…')` / `S(spk,'…')` 写成 1 行 |
  | 任务专用 NPC 构造函数，平均 50 行 | 89 个 | `makeQuestNpc({...})` 自动补全默认字段，约 12 行 |
  | `questStatus` 条件，每处 5~7 行 | 318 处 | `atStep(Q,'x')` 写成 1 行 |
  | toast 提示 | 299 处 | `warn('…')` |

- **场景改为按 ID 引用**：现在 `openScene:{scene: OBJ}` 把场景对象直接内联，导致任务数据既不能 JSON 化，也不能懒加载。改成 `openScene:{sceneId}` 加一张 `scenes` 表后，就能按任务 `import()`。目前首屏预加载约 6 MB JS，其中任务数据 1.8 MB。
- **硬编码数据回到 Markdown→Python→JSON 管线**：
  - `itemsDb.ts` 的 `NON_EQUIPMENT_ITEMS`（约 1400 行）和 `scrollsDb.ts`（1423 行），与 `EQUIPMENT_COMPENDIUM.md` 形成**两个数据源，容易漂移**；
  - `sectMechanics.ts` 里的俸禄表、赠礼表、辽谍名录、大比规格等；
  - `QuestTreeTab.tsx:144-713` 手写的节点和连线，应改为从 `startCondition` 自动推导。
- **大文件拆分**：
  - `sectMechanics.ts`（2347 行）拆为 `engine/sect/{ranks, referral, stipends, liaoSpy, tournament, kaifengWarrant, promotion, minorTasks, entry}.ts`，再把 14 处 `if (sectId === 'SECT-33')` 式的特判改成按门派查表的规则对象；
  - `CombatOverlay` 拆成 8 个子组件，加一个 `useCombatChoreography` hook，并在 App 里改为 `lazy()` 加载；
  - `NpcInteractionOverlay` 拆成 `SectAffairsPanel` + 各门派小组件；
  - `ContextInspectorCard` 抽出 `useInspectorContext()`。
- **目录约定**：`engine/` 只放纯规则（战斗、门派、任务、时间），`utils/` 只放平台 IO（asset、bgm、save）。NPC 构造逻辑现在散在三处，统一到 `engine/npcFactory.ts`。`TEN_ART_KEYS`、时辰标签、`clamp` 各有重复定义，一并去重。

### P2

- **减少重渲染**：18 个组件整体订阅 `s.inventory`，其中常驻的地图组件实际只用到区域解锁信息。改用派生 selector `getUnlockedLockedRegionKey(s.inventory)`，它返回字符串，便于比较。
- **ID 类型化**：由 `compile_game_db.py` 生成 `ids.generated.ts`：`SectId` 用字面量联合，`NpcId`、`ArtId` 用品牌类型。任务 ID 现有三种命名风格（`QST-SECT-01-ENTRY` / `QST_SECT22_…` / `QST_TIANBO_…`），统一一种。
- **延迟加载**：`bgmManager`（1190 行）和 `combatSfx` 首屏用不到，改为延迟加载。`registerExtraQuests` 会修改模块级数组，改成不可变注册表。

---

## 二、游戏玩法机制设计

### 核心诊断
设定和资产做得很厚，但系统层面有三个结构性问题：
1. ~~战斗中「守御」严格劣于「出招」，盲选没有形成博弈~~（✅ 已通过下方 P0 战斗重做解决）；
2. 武学同质化：246 门里只有 37 门有特效，172 门的第 10 重数值与同类别其他武学完全相同（✅ 已先通过大类「本能」效果缓解）；
3. 颜值和十艺中的 9 艺离开剧情检定就没有用处；经济只有收入没有支出（**没有卖出功能**）；禁军俸禄 60~300 两/月，而且闭关挂机也照领。

### P0：让战斗变成真正的博弈（✅ 已全部完成）

原收益矩阵（D = 我方伤害，T = 对方伤害）：

| 我 \ 敌 | 出招 | 守御 |
|---|---|---|
| 出招 | +D−T | +0.5D |
| 守御 | −0.5T | 0 |

无论对方怎么选，出招都更优。修改方案（已于 [combatEngine.ts](file:///home/antigravity/zhby99/northern-song-chronicles/src/utils/combatEngine.ts) 与 [CombatOverlay.tsx](file:///home/antigravity/zhby99/northern-song-chronicles/src/components/combat/CombatOverlay.tsx) 实装）：
- [x] **守御重做（✅ 已完成）**：守御时回复 10% 内力上限；如果对方本回合出招强攻守御目标，对方进入「破绽」状态，下回合受到的伤害 +25%、闪避 −50%；双方都守御时各回复 15% 内力。
- [x] **按武学大类加「本能」效果（✅ 已完成）**（同时缓解同质化，并在招式卡上透出本能词条）：
  - [x] 刀、棍破守 +30%；
  - [x] 剑、指先手 +10；
  - [x] 暗器无视 30% 闪避；
  - [x] 毒造成持续伤害（2 回合持续蚀血，可被解毒丹药或六阳掌涤清）；
  - [x] 音功削减内力；
  - [x] 枪后手反击 +20%。
- [x] **AI 改成按玩家频率预测（✅ 已完成）**：玩家连续 2 回合出招时，AI 守御率升到 32~35%；玩家内力不足时，AI 必定出招；玩家陷入「破绽」时，AI 积极抢攻。
- [x] **身法降权（✅ 已完成）**：去掉物理护体中的 `defAgi×1.5`，常规身法闪避封顶 35%。

### P0：经济闭环
- **补卖出功能**：按价值 40% 回收，任务物品锁定不可卖。
- **俸禄改为当值制**：每月在驻地当值满 5 天才发全俸；禁军补上派案和番戍义务。
- **增加支出**：
  - 宿费按城市分级（京城 6 两、州府 3 两、边镇 2 两）；
  - 坐骑草料；
  - 拜师束脩 = 20×品阶²；
  - 设宴结交；
  - 相国寺月度拍卖。
- **职业化打工**（太阁式的商、文、武路线，直接复用十艺）。日薪：
  - 账房 3+0.08×算术
  - 塾师 2+0.08×经义
  - 卖字画 0.1×max(书,画)
  - 讼师 0.08×辩才
  - 镖师：按里程×险度计酬，途中有劫镖战

### P1：让禀赋和十艺在系统中生效

| 属性 | 被动公式建议 |
|---|---|
| 颜值 | 初见好感 = (颜值−50)/5；赠礼倍率 ×(1+(颜值−50)/250) |
| 辩才 | 交谈好感 = rand(−1,3) + 辩才/30；拦路劝退率 = 辩才/150 |
| 算术 | 买价折扣 min(20%, 算术/5 %)；卖价 +算术/10 % |
| 经义 | 内功闭关速度 ×(1+经义/400) |
| 策论 | 俸禄、悬赏 ×(1+策论/200) |
| 诗词 | 名楼名山题壁，每处 1 次，声望 +诗词/10 |
| 琴 / 书 / 画 | 音功伤害 +琴/4 %；指法、笔法伤害 +书/5 %；秘籍初读额外获得画×50 熟练度 |

- **创角预算**：现在 270 点、单项上限 100，100/100/70 是显然最优，所有人都能当奇才。建议改为 210 点、单项上限 90。
- **圆满馈赠**：任意武学练到第 10 重，永久获得少量根基加成，给「博学」一个积累理由。
- **好感阈值**：60 可以请教，80 可以结义或成为知己，95 会传授非镇派绝学。

### P1：时间压力与月度节拍（对应 M3-2/3/4）
- **月度节拍**：月初发布 3 条可追踪的风闻事件；月末结算俸禄、门派贡献和榜单变动。
- **年号补全**：皇祐 → 至和 → 嘉祐 → 治平。以**嘉祐八年（1063）仁宗驾崩**作为「一代终章」。
- **年龄曲线**（目前年龄对数值没有任何影响）：
  - 12~15 岁：内功 ×0.8、外功 ×1.1
  - 41~55 岁：外功 ×0.85、内功 ×1.1
  - 56 岁以上：全部 ×0.7
- **确定性历史事件日程**：每个事件设「窗口期 + 参与条件 + 错过后果」（详见第三章的时间轴）。
- **路途抉择卡**：现在路途事件只有 16% 概率出现，而且是纯文本。改成轻量抉择卡，分别用骑术、辩才、腰牌或战斗检定。
- **武道榜**：战力 = 有效四维 + 招式伤害期望，直接复用 combatEngine 的公式。

---

## 三、游戏剧情发展

### P0：先决定天龙时间线（这是设计矛盾）
- **矛盾**：AGENTS.md 写的是「天龙黄金前传 · 少年乔峰」，但数据实际是**把天龙正篇开场时的状态整体搬到了 1050 年**（乔峰 30 岁、现任帮主；慕容复 27 岁；阿朱 18 岁；丁春秋已是掌门……）。按原著推算，1050 年时乔峰还没出生。文件内部也不一致：乔峰的年龄有 30 岁、「二十出头」、「十七八」三种说法。
- **推荐方案 B：明确定位为「把天龙正篇前移约 40 年到仁宗朝的架空」**。
  - 现有数据和任务几乎不用改；
  - 有一个意外收获：原著里萧峰平定的耶律重元之乱，**历史上正好发生在 1063 年**，耶律洪基 1055 年即位也对得上。
  - 需要配套写一张「原著校准表」：雁门关之变定在约 1020 年（天圣年间），并调整段正淳、童姥、李秋水的年龄，以及萧峰与洪基的兄弟长幼。

### P0：历法硬伤
- 任务正文写死「皇祐二年」约 51 处。但开封线需要「任满 730 天」，再升到 Lv3、Lv4，玩家实际接到《微服汴梁》时已是 1052~1053 年，正好撞上侬智高之乱，而世界没有任何反应。
- 修法：正文改用 `{reignYear}` 动态年号插值，并实装「天下大事时间轴」。

### P1：史实修正
- **1050 年已去世的 NPC**：苏舜钦（卒 1048）、种世衡（1045）、折继闵（1048，家主应为折继祖）、石介（1045）、尹源；唐慎微当时尚未出生；高怀亮是宋初将领。
- **职衔或驻地不对**：
  - **包拯 1050 年是知谏院，权知开封府要到 1056 年**，而整条开封线都以此为前提；
  - 余靖的差遣、赵曙（当时应叫赵宗实）、唃厮啰驻地（应为青唐城）都有误；
  - 王德用与庞籍的枢密使身份在两处数据里互相矛盾。
- **用语问题**：
  - 台词里称「仁宗官家」（共 44 处「仁宗」），活人不会被叫庙号，应改为「官家 / 今上」；
  - 「户部」应为三司；
  - 角色台词里说「北宋」（共 11 处）。
- **剧情动机要补一句**：1049-50 年辽兴宗正亲征西夏，所以「辽借西夏之刀刺宋帝」应写成辽方嫁祸西夏、挑起宋夏开战，反而更合理。没藏讹庞当时主和，刺驾可改为主战派假借他的印信。

### 四幕主线建议：「皇祐—嘉祐十四年」（1050-1064）

| 幕 | 年份 | 真实历史 | 天龙暗线 | 玩法 |
|---|---|---|---|---|
| 一·明堂 | 1050-51 | 两浙大饥、范仲淹杭州赈灾；明堂大礼；灯笼锦案 | 慕容复购甲、康敏筹划揭发乔峰身世 | 入门长卷，京城安保，赈灾 |
| 二·南天 | 1052-53 | 侬智高围广州；**范仲淹卒**；上元夜狄青袭昆仑关 | 杏子林之变、聚贤庄 | 昆仑关与聚贤庄**二选一**，制造分身乏术 |
| 三·北望 | 1054-57 | 洪基即位；包拯权知开封府；**嘉祐二年苏轼同榜** | 萧峰结义、阿朱之死、珍珑棋局、少室山大战 | 科举（十艺检定）；少林高潮 |
| 四·风雷 | 1058-64 | 王安石《万言书》；没藏讹庞被诛；**仁宗崩**、重元之乱 | 西夏招驸马、童姥与李秋水决战、雁门关终局 | 双终局：英雄大会 / 绝顶论剑 |

**按出身分支**：
- 庙堂：结局为枢密，或效仿狄青功高被猜外放；
- 侠义：核心抉择是护乔峰，还是护名门正派的体面；
- 文士：跟随范公 → 应举 → 在新党、旧党间选立场；
- 草莽：招安或举旗；
- 塞外：重元之乱中选边。

**现成伏笔可直接回收**：
- 慕容复的「立约」；
- 萧远风写成萧远山的族弟；
- 智光听到「雁门」二字色变；
- 八步赶蝉里的「三十年前」正好指向雁门关之变。

**结局**：生成「史传体列传」，记录玩家亲历的真实大事。

### P2：文风
- **模板化**：每条入门长卷几乎都是「护弱 → 结缘 → 苦役 → 退暗探 → 授袍」。「黑风」出现 215 次、「零内功」44 次。建议每个门派换一种核心冲突（道统之争、天灾、私情、伦理两难）。
- **summary 写成了广告**，堆满奖励数值。剧情介绍和奖励说明应分开。
- **机制用语出戏**：「Lv.4」「气血 −12%」等混进旁白和 NPC 台词，只应出现在系统提示里。
- **人物口吻**：给关键 NPC 写「口吻卡」，例如乔峰话少好酒，汪剑通对乔峰身世一直多疑（原著好戏，现在完全没写）。慕容复被一个 Lv3 捕头逼着立约、乔峰见到一袋弟子就八拜同门，都损害了人物格调和后续剧情的分量。
- **值得保留和宣传的亮点**：
  - 大名府黄河铁索案呼应 1048 年商胡决口；
  - 范仲淹 1050 年知杭州是对的；
  - 禁军《太行》三部曲「骄兵折戟 → 苦读武经 → 奇袭」，是全库写得最好的叙事结构，建议作为主线写法范本。

---

## 四、推荐执行顺序

```mermaid
flowchart LR
  A["修 6 个已确认 Bug"] --> B["Vitest + RNG 注入"]
  B --> C["战斗守御重做 / 经济卖出与当值制"]
  C --> D["定天龙时间线方案 + 动态年号"]
  D --> E["天下大事时间轴 + 月度节拍 (M3-3)"]
  E --> F["十艺/颜值被动公式 + 社交阈值 (M3-2)"]
  F --> G["任务 DSL 瘦身 + 场景懒加载"]
```
