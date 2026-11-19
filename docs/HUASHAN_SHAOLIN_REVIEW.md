# 《北宋立志传》华山派（33 卷）& 嵩山少林寺（61 卷）全任务链深度体检报告

> 审计基线：commit `757184f`（华山派 33 条任务链 + 嵩山少林寺 61 条任务链，全库共 134 条任务链）
> 时空锚点：公元 1050 年（北宋仁宗皇祐二年）

---

## 一、 华山派（`SECT-05` · 33 卷）体检与修复记录

### P0 级（致命 / 高危机制 Bug）

- [x] **P0-1：Q18《思过绝壁 · 独孤求败》无缓冲、无回血强推满配宗师 `duel` 生死战** ✅ 已修复
  - 修复：`huashanJianDuguNineQuest.scenes.ts` 中 `scene_hsq18_20` 补满 `healPlayer(100%, 100%)`；`scene_hsq18_22` 停步 `rescue_zixia` 允许玩家整备后再赴紫霞主殿；`scene_hsq18_31` 对满配宗师 `NPC-1053` 段延庆改为 **`rule: 'survive_rounds', maxRounds: 3`**（撑住三回合寻隙破气即胜），并补充段延庆先前与岳沧溟激战耗损真气的叙事铺垫。
- [x] **P0-2：8 卷华山任务缺失关键 `npcAlive` 守卫 & Q17/Q22 仍用段延庆临时分身** ✅ 已修复
  - 修复：为 Q02（`NPC-0202`）、Q05（`NPC-0202`）、Q15（`NPC-0166`）、Q16（`NPC-0147/0166`）、Q17（`NPC-0202/1053/0233/0183/0182`）、Q18（`NPC-1053/0233/0183/0182`）、Q19（`NPC-0147/0166/0167`）、Q22（`NPC-0147/0166/0167/0202/1053`）全部补齐 `npcAlive`；Q17 与 Q22 的段延庆全面切换为正式 `NPC-1053`，Q17 段延庆战同步改为 **`rule: 'survive_rounds', maxRounds: 3`**。
- [x] **P0-3：支线 SIDE-10《陇山断道》前置过早强塞 5860 HP 宗师中品生死战** ✅ 已修复
  - 修复：`huashanSideLongshanBrokenSwordQuest.scenes.ts` 中 `scene_hss10_14` 对宗师中品 `赫连断岳` 改为 **`rule: 'survive_rounds', maxRounds: 3`**（死撑三合寻隙裂铁破局即胜）。
- [x] **P0-4：白纸入门门禁（`noLearnedArtAtOrAboveTier`）可中途绕过** ✅ 已修复
  - 修复：`huashanEntryQuest.scenes.ts` 在 `scene_hs_14` 宣誓拜师前通过 `branch` 复检 `{ type: 'noLearnedArtAtOrAboveTier', minTier: '良品下品' }`，若中途偷学良阶及以上武学则触发 `scene_hs_14_fail_not_whitepaper` 驳回入门。

### P1 级（重要逻辑断裂 / 时空穿帮）

- [x] **P1-1：支线缺少终局/逆夺状态隔离（SIDE-03/05/06）** ✅ 已修复
  - 修复：SIDE-03、SIDE-05 新增 `flag('hs_ending', 'neq', 'sword_usurp')`；SIDE-06 新增未完结 Lv.5 掌门结局守卫。
- [x] **P1-2：SIDE-06《潼关试铁》提前使出尚未习得的《落雁剑法》** ✅ 已修复
  - 修复：`huashanSideJianTongguanQuest.ts` 前置由 `QST-SECT-05-06` 调整为 `QST-SECT-05-07`（已学《落雁剑法》后方可接取）。
- [x] **P1-3：Q22《华山论剑》与 Q20 逆夺掌门结局撕裂** ✅ 已修复
  - 修复：`huashanMountaintopSummitQuest.scenes.ts` 第一幕与第三幕补齐 `{ifFlag:hs_q22_is_usurp|...|...}`，逆夺线改为岳沧溟感念甲子公事破例出关观礼作证。
- [x] **P1-4 & P1-5：Q15 气宗魔刻动机割裂 & 思过崖后洞“巨岩彻底封死”前后矛盾** ✅ 已修复
  - 修复：`huashanCaveUsurpQuest.scenes.ts` 调整为暗机重锁伪作崩石与各取所需的权谋同盟；`huashanJianDuguNineQuest.scenes.ts` 补齐 `{ifFlag:hs_q18_cave_usurp}` 崩岩侧隙说明。
- [x] **P1-6：Q16 一品堂副使「拓跋雄」与终局宗师大都督同名战力跳变** ✅ 已修复
  - 修复：将 Q16 一品堂副使更名为「拓跋烈」（`huashanYantaCrisisQuest.ts` & `.scenes.ts`）。
- [x] **P1-7：岳沧溟（59）与秦烈山（52）辈分打架** ✅ 已修复
  - 修复：`huashanQiSanqingQuest.scenes.ts` 与 `huashanYantaCrisisQuest.scenes.ts` 中岳沧溟对秦烈山统一称「秦师弟」。
- [x] **P1-8：1050 年时空与《笑傲江湖》穿帮** ✅ 已修复
  - 修复：「绍兴黄酒」→「越州黄酒」，「五岳剑派」→「中原名门大派」（Q03/Q22）；「君子剑」岳沧溟 →「太岳真君」岳沧溟（SIDE-03/SIDE-05）；「方为君子剑」→「方为太岳正道」（ENTRY）。
- [x] **P1-9：假分支 Flag `hs_gao_estranged` 补齐呼应** ✅ 已修复
  - 修复：在 SIDE-05 与 Q19 中为高沧云补齐 `{ifFlag:hs_gao_estranged|...|...}` 冰释前嫌台词。
- [x] **P1-10：SIDE-04 / SIDE-05 / SIDE-08 `shichenIn` 索引偏移（含白昼酉时 `idx 9`）** ✅ 已修复
  - 修复：统一更正为 `indices: [10, 11, 0, 1]`（戌亥子丑四时辰，夜间）。
- [x] **P2-2：Q17 第 33 幕段延庆漏标「腹语」细节** ✅ 已修复

---

## 二、 嵩山少林寺（`SECT-01` · 61 卷）待修复清单

### P0 级（致命死锁 / 身份错乱 / 漏发圣物）

- [x] **P0-1：俗家与出家身份「双向错位」漏洞** ✅ 已修复
  - 修复：`shaolinEntryQuest.ts`（`act_shaolin_xuanci_tonsure`）新增 `player_gender == '男'`、`not(Q04 completed)`、`sl_branch != 'layman'`、`not(sl_xuanci_deposed)`、`npcAlive('NPC-0112')` 守卫，Q04 暂退剃度项限男号；全部 16 卷出家专属任务（Q06–Q08、Q10–Q12、Q14–Q16、Q22–Q25、Q36、Q38、Q39）补齐 `shaolin_disciple_type == 'monk'` 守卫。
- [x] **P0-2：俗家少林武学权限与剧情线统一** ✅ 已修复
  - 修复：取消「俗家永禁一切地/天阶」一刀切限制，在 `ranks.ts`（`SHAOLIN_LAY_ALLOWED_HIGH_TIER_ARTS`）、`sectSlice.ts`、`SectTeachArtsWidget.tsx` 及 Q21/Q26/Q29/Q37/Q42 剧情中统一规则——嵩山少林俗家弟子可修习《韦陀杵》《龙爪手》《盘山铁布衫》《大力金刚指》四门地阶护寺外功，其余地/天阶禅武与秘籍（《一苇渡江》《般若掌》《少林九阳功》《金刚不坏体神功》《易筋经》）仅授出家僧众。
- [x] **P0-3：星宿派弑杀丁春秋（`NPC-0122`）导致少林主线 Q35–Q42 永久死锁** ✅ 已修复
  - 修复：在 `exclusivity.ts`、`entry.ts`、`joinSect.ts`、`questEngine.ts`、`effectHandlers.ts`、`SectAffairsPanel.tsx` 与 `sectSlice.ts` 实装「凡曾拜入星宿派（`SECT-19`，记录 `ever_joined_xingxiu`），此生永拒拜入一切中原正派（`CENTRAL_PLAINS_ORTHODOX_SECT_IDS`，含少林/丐帮/华山/开封府/禁军等 19 派）」铁律，从根源杜绝星宿弑师后转投少林的死锁。
- [x] **P0-4：终章 Q42《古杏扫叶 · 易筋真经》漏发承诺的天阶圣物 `ITM-SCR-001`** ✅ 已修复
  - 修复：`EQUIPMENT_COMPENDIUM.md` 将 `ITM-SCR-001`《达摩易筋真经》梵夹本研读增幅调整为 `经义 +3` 并重编数据库，`shaolinSweepingMonkYijinQuest.scenes.ts` 出家线补发 `{ type: 'giveItem', itemId: 'ITM-SCR-001', qty: 1 }`，与任务文案承诺一致且满足单任务十艺增幅上限。

### P1 级（世界状态 / 晋升规则 / 临时分身 / 宗师战点）

- [x] **P1-1：南宋末年《倚天》觉远禅师写进 1050 年北宋** ⏭️ 按策划裁定忽略（架空历史）
- [x] **P1-2：20–23 年超长 `sectDaysAtLeast` 历史时间线** ⏭️ 按策划裁定忽略（架空历史）
- [x] **P1-3：Q39《铁腕法王》罢黜玄慈后，玄慈仍在 SIDE-16 / SIDE-17 端坐法座** ✅ 已修复
  - 修复：Q39 结案写入 `sl_xuanci_deposed = true`；SIDE-16 与 SIDE-17 `startCondition` 增补 `not(sl_xuanci_deposed)` 守卫。
- [x] **P1-4 & P1-5：与禁军《破燕三部曲》跨线冲突 + Q24/Q23 `npcAlive`** ⏭️ 按策划裁定忽略
- [x] **P1-6：取消少林及除开封府/六扇门（`SECT-17`）外所有一流大派的面板直晋** ✅ 已修复
  - 修复：`promotion.ts` 取消少林及其他所有非 `SECT-17` 一流大派的面板直晋，一律改为本门专属任务册封；同步更新 `sectEvaluation.test.ts`。
- [x] **P1-7：8 处少林任务用 `makeQuestNpc` 重捏正式编目 NPC 的临时分身** ✅ 已修复
  - 修复：岳老三（`NPC-0183`）、包不同（`NPC-0213`）、风波恶（`NPC-0214`）、努儿海（`NPC-0152`）、丁春秋（`NPC-0122`）、慧通（`NPC-0315`）、元通（`NPC-0164`）、周海（`NPC-0673`）全部替换为正式编目 NPC。
- [x] **P1-8：少林过早单挑宗师战点改为撑住 3~5 回合** ✅ 已修复
  - 修复：Q33 玄难改为 `survive_rounds` 3 回合；Q36 / Q37 鸠摩智改为 `survive_rounds` 5 回合。

### P2 级（称谓错位与细节）

- [x] **P2-1：Q42 / Q41 / Q38 将「出家掌门 vs 俗家大居士」误写为 `{gender:...}`** ✅ 已修复
  - 修复：Q42 / Q41 改为 `{ifFlag:sl_branch==layman|大居士|掌门}` / `{ifFlag:sl_branch==layman|大居士|大师}`，Q38（出家专属）统一为「师侄」。
- [x] **P2-2：18 条少林支线及 Q29 俗家称谓适配** ⏭️ 按策划裁定忽略
- [x] **P2-3：Q38 玄慈 24 岁成年之子被称作「稚子/孤寡」** ✅ 已修复
  - 修复：Q38 全部相关对白修正为「吾儿虚竹自幼出家修行、全然无辜 / 方丈骨肉与叶二娘」。
- [x] **P2-4：Q22 + Q39 重复发放唯一武器 `WPN-013`；Q04 俗家分支发灰布僧袍** ✅ 已修复
  - 修复：Q39 补齐 `not(QST-SECT-01-22 completed)` 守卫避免穿戴状态重复发刀；Q04 俗家分支改发 `ARM-018`（杭绸青衫儒士袍）。
