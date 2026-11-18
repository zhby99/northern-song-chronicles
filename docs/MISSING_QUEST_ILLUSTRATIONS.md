# 《北宋立志传》待补绘剧情插画（CG）管理台账

> 本文件专门用于登记与追踪剧情任务链（`StorySceneModal`）中已预埋路径、待生图配额恢复或美术阶段集中补绘的 **16:9 宋风工笔重彩剧情插画（CG）**。
>
> **自动挂载机制说明**：前端剧情舞台组件 [`StorySceneModal.tsx`](../src/components/quest/StorySceneModal.tsx) 已支持 `scene.illustrationUrl` 与 `beat.illustrationUrl`。图片未就绪时自动显示「绘卷留白」古风占位框；一旦将对应原画压缩存放至 `public/assets/quests/` 指定路径，**无需修改任何 TypeScript 代码即可自动加载生效**。

---

## 一、 待补绘插画总览表

| 编号 | 状态 | 目标落盘路径（相对于项目根目录） | 运行时引用 URL | 所属任务链 | 触发幕次（Scene ID） | 画幅比例 |
| :--- | :---: | :--- | :--- | :--- | :--- | :---: |
| `CG-QST-001` | `[x]` 已完成 | `public/assets/quests/kaifeng_execution.jpg` | `/assets/quests/kaifeng_execution.jpg` | `QST-SECT-17-TAIHANG-BANDIT`<br>《太行劫匪 · 华北风云》 | 第十一幕 · 市曹刀落明典刑<br>（`scene_thb_11_kaifeng_execution`） | `16:9` |
| `CG-QST-002` | `[x]` 已完成 | `public/assets/quests/taihang_beheading.jpg` | `/assets/quests/taihang_beheading.jpg` | `QST-SECT-17-TAIHANG-BANDIT`<br>《太行劫匪 · 华北风云》 | 第十七幕 · 粗衣跪寨饮刀终<br>（`scene_thb_17_taihang_beheading`） | `16:9` |
| `CG-QST-003` | `[x]` 已完成 | `public/assets/quests/gaibang_temple_fire.jpg` | `/assets/quests/gaibang_temple_fire.jpg` | `QST-SECT-02-ENTRY`<br>《青囊尽空 · 义聚杏林》 | 第四幕 · 古庙篝火分焦饼<br>（`SCENE_GB_04_TEMPLE_HALF_CAKE`） | `16:9` |
| `CG-QST-004` | `[x]` 已完成 | `public/assets/quests/gaibang_granary_silver.jpg` | `/assets/quests/gaibang_granary_silver.jpg` | `QST-SECT-02-ENTRY`<br>《青囊尽空 · 义聚杏林》 | 第九幕 · 烛影樟箱试本心<br>（`SCENE_GB_09_ACCOUNT_ROOM_SILVER`） | `16:9` |
| `CG-QST-005` | `[x]` 已完成 | `public/assets/quests/gaibang_apricot_oath.jpg` | `/assets/quests/gaibang_apricot_oath.jpg` | `QST-SECT-02-ENTRY`<br>《青囊尽空 · 义聚杏林》 | 第十八幕 · 拍封舀酒立三规<br>（`SCENE_GB_18_BOWL_OF_WINE`） | `16:9` |
| `CG-QST-006` | `[x]` 已完成 | `public/assets/quests/gaibang_bamboo_pouch.jpg` | `/assets/quests/gaibang_bamboo_pouch.jpg` | `QST-SECT-02-ENTRY`<br>《青囊尽空 · 义聚杏林》 | 第二十幕 · 一袋挂腰百衲衣<br>（`SCENE_GB_20_FIRST_POUCH`） | `16:9` |
| `CG-QST-007` | `[x]` 已完成 | `public/assets/quests/huashan_changan_rain_go.jpg` | `/assets/quests/huashan_changan_rain_go.jpg` | `QST-SECT-05-ENTRY`<br>《云海孤棋 · 问剑西岳》 | 第二幕 · 残枰一问见初心<br>（`SCENE_HS_02_BROKEN_BOARD`） | `16:9` |
| `CG-QST-008` | `[x]` 已完成 | `public/assets/quests/huashan_canglong_ridge.jpg` | `/assets/quests/huashan_canglong_ridge.jpg` | `QST-SECT-05-ENTRY`<br>《云海孤棋 · 问剑西岳》 | 第七幕 · 苍龙岭上万丈云<br>（`SCENE_HS_07_CANGLONGLING`） | `16:9` |
| `CG-QST-009` | `[x]` 已完成 | `public/assets/quests/huashan_botai_chess.jpg` | `/assets/quests/huashan_botai_chess.jpg` | `QST-SECT-05-ENTRY`<br>《云海孤棋 · 问剑西岳》 | 第十一幕 · 绝顶博台孤峰弈<br>（`SCENE_HS_11_BOTAI_PAVILION`） | `16:9` |
| `CG-QST-010` | `[x]` 已完成 | `public/assets/quests/huashan_zixia_dawn_sword.jpg` | `/assets/quests/huashan_zixia_dawn_sword.jpg` | `QST-SECT-05-ENTRY`<br>《云海孤棋 · 问剑西岳》 | 第二十一幕 · 紫气东来授青锋<br>（`SCENE_HS_21_BESTOW_SWORD`） | `16:9` |
| `CG-QST-011` | `[x]` 已完成 | `public/assets/quests/nanshaolin_tripod_training.jpg` | `/assets/quests/nanshaolin_tripod_training.jpg` | `QST-SECT-04-ENTRY`<br>《刺桐风起 · 铁桥问禅》 | 第八幕 · 寒泉浸铁腕，四平扎马桩<br>（`SCENE_NSL_08_COLD_SPRING_CG`） | `16:9` |
| `CG-QST-012` | `[x]` 已完成 | `public/assets/quests/nanshaolin_port_night_battle.jpg` | `/assets/quests/nanshaolin_port_night_battle.jpg` | `QST-SECT-04-ENTRY`<br>《刺桐风起 · 铁桥问禅》 | 第十四幕 · 刺桐夜雨急，铁桥碎倭刀<br>（`SCENE_NSL_14_SHATTER_KATANA_CG`） | `16:9` |
| `CG-QST-013` | `[x]` 已完成 | `public/assets/quests/nanshaolin_wooden_alley.jpg` | `/assets/quests/nanshaolin_wooden_alley.jpg` | `QST-SECT-04-ENTRY`<br>《刺桐风起 · 铁桥问禅》 | 第十八幕 · 百杰木人巷，硬桥闯山门<br>（`SCENE_NSL_18_BREAK_GATE_CG`） | `16:9` |
| `CG-QST-014` | `[x]` 已完成 | `public/assets/quests/zhenwu_cloud_tea.jpg` | `/assets/quests/zhenwu_cloud_tea.jpg` | `QST-SECT-08-ENTRY`<br>《汉水问津 · 太和问道》 | 第七幕 · 观云台上煮雪茶<br>（`SCENE_ZW_07_CLOUD_TERRACE`） | `16:9` |
| `CG-QST-015` | `[x]` 已完成 | `public/assets/quests/zhenwu_turtle_snake.jpg` | `/assets/quests/zhenwu_turtle_snake.jpg` | `QST-SECT-08-ENTRY`<br>《汉水问津 · 太和问道》 | 第十一幕 · 禹迹池畔观龟蛇<br>（`SCENE_ZW_11_TURTLE_SNAKE`） | `16:9` |
| `CG-QST-016` | `[x]` 已完成 | `public/assets/quests/zhenwu_golden_sword.jpg` | `/assets/quests/zhenwu_golden_sword.jpg` | `QST-SECT-08-ENTRY`<br>《汉水问津 · 太和问道》 | 第十九幕 · 太和殿前授松纹<br>（`SCENE_ZW_19_BESTOW_SWORD`） | `16:9` |
| `CG-QST-017` | `[x]` 已完成 | `public/assets/quests/renzong_weifu_market.jpg` | `/assets/quests/renzong_weifu_market.jpg` | `QST-SECT-17-RENZONG-ESCORT`<br>《微服汴梁 · 血护龙颜》 | 第五~八幕 · 宣德微服相国寺灯市<br>（`scene_rz_05_market_twilight` 等 4 幕） | `16:9` |
| `CG-QST-018` | `[x]` 已完成 | `public/assets/quests/renzong_pagoda_ambush.jpg` | `/assets/quests/renzong_pagoda_ambush.jpg` | `QST-SECT-17-RENZONG-ESCORT`<br>《微服汴梁 · 血护龙颜》 | 第十一~十四幕 · 资圣宝塔飞檐断铃<br>（`scene_rz_12_pagoda_ambush_duel` 等 4 幕） | `16:9` |
| `CG-QST-019` | `[x]` 已完成 | `public/assets/quests/renzong_fanlou_assassins.jpg` | `/assets/quests/renzong_fanlou_assassins.jpg` | `QST-SECT-17-RENZONG-ESCORT`<br>《微服汴梁 · 血护龙颜》 | 第十九~二十二幕 · 樊楼飞桥珠帘破屏<br>（`scene_rz_20_red_plaque_ambush` 等 4 幕） | `16:9` |
| `CG-QST-020` | `[x]` 已完成 | `public/assets/quests/renzong_hongqiao_blood.jpg` | `/assets/quests/renzong_hongqiao_blood.jpg` | `QST-SECT-17-RENZONG-ESCORT`<br>《微服汴梁 · 血护龙颜》 | 第二十七~三十幕 · 虹桥夜雨血战双狼<br>（`scene_rz_28_hongqiao_final_duel` 等 4 幕） | `16:9` |
| `CG-QST-021` | `[x]` 已完成 | `public/assets/quests/renzong_zichen_decree.jpg` | `/assets/quests/renzong_zichen_decree.jpg` | `QST-SECT-17-RENZONG-ESCORT`<br>《微服汴梁 · 血护龙颜》 | 第三十三~三十六幕 · 紫宸晓日御马秘卷<br>（`scene_rz_34_imperial_choice` 等 6 幕） | `16:9` |
| `CG-QST-022` | `[x]` 已完成 | `public/assets/quests/xingxiu_poison_furnace.jpg` | `/assets/quests/xingxiu_poison_furnace.jpg` | `QST-SECT-19-ENTRY`<br>《紫烟迷市 · 毒泉求生》 | 第八幕 · 丹炉紫雾冲脉生<br>（`scene_xx_08_furnace_breakthrough`） | `16:9` |
| `CG-QST-023` | `[x]` 已完成 | `public/assets/quests/xingxiu_ice_cave_bandage.jpg` | `/assets/quests/xingxiu_ice_cave_bandage.jpg` | `QST-SECT-19-ENTRY`<br>《紫烟迷市 · 毒泉求生》 | 第十五幕 · 寒窟渡毒共微光<br>（`scene_xx_15_ice_cave_vigil`） | `16:9` |
| `CG-QST-024` | `[x]` 已完成 | `public/assets/quests/xingxiu_ding_chunqiu_audience.jpg` | `/assets/quests/xingxiu_ding_chunqiu_audience.jpg` | `QST-SECT-19-ENTRY`<br>《紫烟迷市 · 毒泉求生》 | 第十九幕 · 丝竹漫天拜老仙<br>（`scene_xx_19_ding_chunqiu_audience`） | `16:9` |
| `CG-QST-025` | `[x]` 已完成 | `public/assets/quests/taishan_18pan_buckets.jpg` | `/assets/quests/taishan_18pan_buckets.jpg` | `QST-SECT-06-ENTRY`<br>《岱宗问数 · 松风破茧》 | 第六幕 · 云梯百丈肩泉血<br>（`scene_ts_06_blood_on_cloud_steps`） | `16:9` |
| `CG-QST-026` | `[x]` 已完成 | `public/assets/quests/taishan_pine_neigong.jpg` | `/assets/quests/taishan_pine_neigong.jpg` | `QST-SECT-06-ENTRY`<br>《岱宗问数 · 松风破茧》 | 第九幕 · 松风引气初破茧<br>（`scene_ts_09_pine_wind_awakening`） | `16:9` |
| `CG-QST-027` | `[x]` 已完成 | `public/assets/quests/taishan_yuhuang_sunrise.jpg` | `/assets/quests/taishan_yuhuang_sunrise.jpg` | `QST-SECT-06-ENTRY`<br>《岱宗问数 · 松风破茧》 | 第十九幕 · 沧海金轮授青锋<br>（`scene_ts_19_sunrise_investiture`） | `16:9` |
| `CG-QST-028` | `[x]` 已完成 | `public/assets/quests/emei_wanli_rain_umbrella.jpg` | `/assets/quests/emei_wanli_rain_umbrella.jpg` | `QST-SECT-07-ENTRY`<br>《锦水清音 · 金顶问心》 | 第二幕 · 锦江烟雨共油伞<br>（`scene_em_02_wanli_bridge_rain`） | `16:9` |
| `CG-QST-029` | `[x]` 已完成 | `public/assets/quests/emei_xixiang_moon_ape.jpg` | `/assets/quests/emei_xixiang_moon_ape.jpg` | `QST-SECT-07-ENTRY`<br>《锦水清音 · 金顶问心》 | 第十五幕 · 洗象澄月白猿影<br>（`scene_em_15_xixiang_moon_ape`） | `16:9` |
| `CG-QST-030` | `[x]` 已完成 | `public/assets/quests/emei_jinding_buddha_light.jpg` | `/assets/quests/emei_jinding_buddha_light.jpg` | `QST-SECT-07-ENTRY`<br>《锦水清音 · 金顶问心》 | 第十九幕 · 万仞云海睹佛光<br>（`scene_em_19_jinding_buddha_light`） | `16:9` |
| `CG-QST-031` | `[x]` 已完成 | `public/assets/quests/qingcheng_qingyang_rain.jpg` | `/assets/quests/qingcheng_qingyang_rain.jpg` | `QST-SECT-14-ENTRY`<br>《青羊偶闻 · 松风问心》 | 第一幕 · 青羊春雨偶闻道<br>（`SCENE_QC_01_QINGYANG_RAIN`） | `16:9` |
| `CG-QST-032` | `[x]` 已完成 | `public/assets/quests/qingcheng_cliff_qin.jpg` | `/assets/quests/qingcheng_cliff_qin.jpg` | `QST-SECT-14-ENTRY`<br>《青羊偶闻 · 松风问心》 | 第七幕 · 孤崖云海听松琴<br>（`SCENE_QC_07_CLIFF_QIN`） | `16:9` |
| `CG-QST-033` | `[x]` 已完成 | `public/assets/quests/qingcheng_shangqing_choice.jpg` | `/assets/quests/qingcheng_shangqing_choice.jpg` | `QST-SECT-14-ENTRY`<br>《青羊偶闻 · 松风问心》 | 第十九幕 · 三清殿前定去留<br>（`SCENE_QC_19_THREE_PURE_CHOICE`） | `16:9` |
| `CG-QST-034` | `[x]` 已完成 | `public/assets/quests/tiezhang_five_fingers_mist.jpg` | `/assets/quests/tiezhang_five_fingers_mist.jpg` | `QST-SECT-15-ENTRY`<br>《烟波五指 · 铁砂问义》 | 第五幕 · 八百烟波五指擎<br>（`SCENE_TZ_05_FIVE_FINGERS_CG`） | `16:9` |
| `CG-QST-035` | `[x]` 已完成 | `public/assets/quests/tiezhang_red_sand_cauldron.jpg` | `/assets/quests/tiezhang_red_sand_cauldron.jpg` | `QST-SECT-15-ENTRY`<br>《烟波五指 · 铁砂问义》 | 第八幕 · 赤砂沸鼎淬凡掌<br>（`SCENE_TZ_08_RED_SAND_CAULDRON_CG`） | `16:9` |
| `CG-QST-036` | `[x]` 已完成 | `public/assets/quests/wutai_yanmen_pass.jpg` | `/assets/quests/wutai_yanmen_pass.jpg` | `QST-SECT-03-ENTRY`<br>《清凉残雪 · 雁门梵钟》 | 第十三幕 · 绝壁风雪护孤雏<br>（`SCENE_WT_13_CLIFF_STAND`） | `16:9` |
| `CG-QST-037` | `[x]` 已完成 | `public/assets/quests/wutai_tonsure_ordination.jpg` | `/assets/quests/wutai_tonsure_ordination.jpg` | `QST-SECT-03-ENTRY`<br>《清凉残雪 · 雁门梵钟》 | 第十九幕 · 金刀落发断尘缘<br>（`SCENE_WT_19_TONSURE_CEREMONY`） | `16:9` |
| `CG-QST-038` | `[x]` 已完成 | `public/assets/quests/shaolin_luoyang_bribe.jpg` | `/assets/quests/shaolin_luoyang_bribe.jpg` | `QST-SECT-01-ENTRY`<br>《嵩门问心 · 佛缘有价》 | 二百五金 · 暗通款曲<br>（`scene_shaolin_pay_broker`） | `16:9` |
| `CG-QST-039` | `[x]` 已完成 | `public/assets/quests/shaolin_chore_induction.jpg` | `/assets/quests/shaolin_chore_induction.jpg` | `QST-SECT-01-ENTRY`<br>《嵩门问心 · 佛缘有价》 | 寒暑一载 · 始入禅林<br>（`scene_shaolin_chore_365_inducted`） | `16:9` |
| `CG-QST-040` | `[x]` 已完成 | `public/assets/quests/tianbo_paifeng_iron_rod.jpg` | `/assets/quests/tianbo_paifeng_iron_rod.jpg` | `QST-TIANBO-BAWANG`<br>《天波忠魂 · 霸王枪出》 | 序章 · 汴京烧火棍<br>（`scene_tb_prologue_paifeng`） | `16:9` |
| `CG-QST-041` | `[x]` 已完成 | `public/assets/quests/tianbo_wutai_staff_terrace.jpg` | `/assets/quests/tianbo_wutai_staff_terrace.jpg` | `QST-TIANBO-BAWANG`<br>《天波忠魂 · 霸王枪出》 | 石台现碑 · 舍身回马意<br>（`scene_tb_wutai_success`） | `16:9` |
| `CG-QST-042` | `[x]` 已完成 | `public/assets/quests/tianbo_yanmen_muguiyun.jpg` | `/assets/quests/tianbo_yanmen_muguiyun.jpg` | `QST-TIANBO-BAWANG`<br>《天波忠魂 · 霸王枪出》 | 高地破骑 / 绝壁血战 · 降龙木令<br>（`scene_tb_yanmen_bloodbattle_win_adv` 等 2 幕） | `16:9` |
| `CG-QST-043` | `[x]` 已完成 | `public/assets/quests/tianbo_yanan_diqing_cavalry.jpg` | `/assets/quests/tianbo_yanan_diqing_cavalry.jpg` | `QST-TIANBO-BAWANG`<br>《天波忠魂 · 霸王枪出》 | 绝境顿悟 · 回马破虏<br>（`scene_tb_yanan_win`） | `16:9` |
| `CG-QST-044` | `[x]` 已完成 | `public/assets/quests/tianbo_ancestral_bawang_spear.jpg` | `/assets/quests/tianbo_ancestral_bawang_spear.jpg` | `QST-TIANBO-BAWANG`<br>《天波忠魂 · 霸王枪出》 | 霸王枪出 · 天波忠魂永传<br>（`scene_tb_epilogue`） | `16:9` |
| `CG-QST-045` | `[x]` 已完成 | `public/assets/quests/changshan_blood_letter.jpg` | `/assets/quests/changshan_blood_letter.jpg` | `QST-SECT-22-LONGLING`<br>《白沟寒星 · 幽州无名卷》 | 第一幕 · 龙胆血书<br>（`scene_cs_longling_opening`） | `16:9` |
| `CG-QST-046` | `[x]` 已完成 | `public/assets/quests/changshan_marshal_smoke_escape.jpg` | `/assets/quests/changshan_marshal_smoke_escape.jpg` | `QST-SECT-22-LONGLING`<br>《白沟寒星 · 幽州无名卷》 | 烟幕脱身 · 奔赴雁门<br>（`scene_cs_marshal_escape`） | `16:9` |
| `CG-QST-047` | `[x]` 已完成 | `public/assets/quests/changshan_yanmen_cliff_stand.jpg` | `/assets/quests/changshan_yanmen_cliff_stand.jpg` | `QST-SECT-22-LONGLING`<br>《白沟寒星 · 幽州无名卷》 | 第三幕 · 绝壁银枪<br>（`scene_cs_cliff_choice`） | `16:9` |
| `CG-QST-048` | `[x]` 已完成 | `public/assets/quests/changshan_ancestral_silver_spear.jpg` | `/assets/quests/changshan_ancestral_silver_spear.jpg` | `QST-SECT-22-LONGLING`<br>《白沟寒星 · 幽州无名卷》 | 第四幕 · 龙胆传薪<br>（`scene_cs_ancestral_confer`） | `16:9` |
| `CG-QST-049` | `[x]` 已完成 | `public/assets/quests/kf_murong1_bao_secret_decree.jpg` | `/assets/quests/kf_murong1_bao_secret_decree.jpg` | `QST-SECT-17-MURONG-1`<br>《燕子坞暗影 · 姑苏密查》 | 第八幕 · 包公密授手谕令<br>（`scene_kf1_08_bao_decree`） | `16:9` |
| `CG-QST-050` | `[x]` 已完成 | `public/assets/quests/kf_murong1_hanshan_bell_intercept.jpg` | `/assets/quests/kf_murong1_hanshan_bell_intercept.jpg` | `QST-SECT-17-MURONG-1`<br>《燕子坞暗影 · 姑苏密查》 | 第十五幕 · 钟楼暗格截残笺<br>（`scene_kf1_15_hanshan_clue`） | `16:9` |
| `CG-QST-051` | `[x]` 已完成 | `public/assets/quests/kf_murong1_tingxiang_lantern.jpg` | `/assets/quests/kf_murong1_tingxiang_lantern.jpg` | `QST-SECT-17-MURONG-1`<br>《燕子坞暗影 · 姑苏密查》 | 第二十一幕 · 琴韵暗香遮耳目<br>（`scene_kf1_21_azhu_abi_cover`） | `16:9` |
| `CG-QST-052` | `[x]` 已完成 | `public/assets/quests/kf_murong1_canhe_window_leap.jpg` | `/assets/quests/kf_murong1_canhe_window_leap.jpg` | `QST-SECT-17-MURONG-1`<br>《燕子坞暗影 · 姑苏密查》 | 第二十九幕 · 破窗跃水趁烟波<br>（`scene_kf1_29_escape_taihu`） | `16:9` |
| `CG-QST-053` | `[x]` 已完成 | `public/assets/quests/kf_murong1_gold_badge_verdict.jpg` | `/assets/quests/kf_murong1_gold_badge_verdict.jpg` | `QST-SECT-17-MURONG-1`<br>《燕子坞暗影 · 姑苏密查》 | 第三十二幕 · 龙图嘉勉授金符<br>（`scene_kf1_32_kaifeng_verdict`） | `16:9` |
| `CG-QST-054` | `[x]` 已完成 | `public/assets/quests/kf_murong2_secret_ledger_audit.jpg` | `/assets/quests/kf_murong2_secret_ledger_audit.jpg` | `QST-SECT-17-MURONG-2`<br>《参合剑气 · 姑苏对质》 | 第五幕 · 密室点验百兵册<br>（`scene_kf2_05_secret_report`） | `16:9` |
| `CG-QST-055` | `[x]` 已完成 | `public/assets/quests/kf_murong2_fanlou_roof_spy.jpg` | `/assets/quests/kf_murong2_fanlou_roof_spy.jpg` | `QST-SECT-17-MURONG-2`<br>《参合剑气 · 姑苏对质》 | 第十五幕 · 樊楼屋脊擒北谍<br>（`scene_kf2_15_fanlou_chase`） | `16:9` |
| `CG-QST-056` | `[x]` 已完成 | `public/assets/quests/kf_murong2_zichen_secret_edict.jpg` | `/assets/quests/kf_murong2_zichen_secret_edict.jpg` | `QST-SECT-17-MURONG-2`<br>《参合剑气 · 姑苏对质》 | 第二十幕 · 龙图授旨命南巡<br>（`scene_kf2_20_bao_edict`） | `16:9` |
| `CG-QST-057` | `[x]` 已完成 | `public/assets/quests/kf_murong2_huqiu_armor_cave.jpg` | `/assets/quests/kf_murong2_huqiu_armor_cave.jpg` | `QST-SECT-17-MURONG-2`<br>《参合剑气 · 姑苏对质》 | 第二十五幕 · 试剑石畔破军藏<br>（`scene_kf2_25_huqiu_arms_cache`） | `16:9` |
| `CG-QST-058` | `[x]` 已完成 | `public/assets/quests/kf_murong2_taihu_boat_gongye.jpg` | `/assets/quests/kf_murong2_taihu_boat_gongye.jpg` | `QST-SECT-17-MURONG-2`<br>《参合剑气 · 姑苏对质》 | 第三十一幕 · 画舫拆招破刚柔<br>（`scene_kf2_31_gongye_defeated`） | `16:9` |
| `CG-QST-059` | `[x]` 已完成 | `public/assets/quests/kf_murong2_canhe_yard_deng.jpg` | `/assets/quests/kf_murong2_canhe_yard_deng.jpg` | `QST-SECT-17-MURONG-2`<br>《参合剑气 · 姑苏对质》 | 第三十八幕 · 破尽刚掌定演武<br>（`scene_kf2_38_deng_defeated`） | `16:9` |
| `CG-QST-060` | `[x]` 已完成 | `public/assets/quests/kf_murong2_huanshi_ten_bouts.jpg` | `/assets/quests/kf_murong2_huanshi_ten_bouts.jpg` | `QST-SECT-17-MURONG-2`<br>《参合剑气 · 姑苏对质》 | 第四十六幕 · 剑掌齐敛震水阁<br>（`scene_kf2_46_mutual_withdrawal`） | `16:9` |
| `CG-QST-061` | `[x]` 已完成 | `public/assets/quests/kf_murong2_royal_guard_seal.jpg` | `/assets/quests/kf_murong2_royal_guard_seal.jpg` | `QST-SECT-17-MURONG-2`<br>《参合剑气 · 姑苏对质》 | 第五十二幕 · 丹墀授印御前卫<br>（`scene_kf2_52_imperial_promotion`） | `16:9` |
| `CG-QST-062` | `[x]` 已完成 | `public/assets/quests/daming_linjin_tavern_standoff.jpg` | `/assets/quests/daming_linjin_tavern_standoff.jpg` | `QST-CITY-DAMING-BAJI`<br>《铁锁镇河朔》 | 第一幕 · 惊涛断索 · 临津剑拔弩张<br>（`scene_dm_tavern_confrontation`） | `16:9` |
| `CG-QST-063` | `[x]` 已完成 | `public/assets/quests/daming_ouyang_chun_ferry.jpg` | `/assets/quests/daming_ouyang_chun_ferry.jpg` | `QST-CITY-DAMING-BAJI`<br>《铁锁镇河朔》 | 临河沽酒 · 紫髯伯识破北庭兵<br>（`scene_dm_ouyang_chun_axe`） | `16:9` |
| `CG-QST-064` | `[x]` 已完成 | `public/assets/quests/daming_leitai_khitan_axes.jpg` | `/assets/quests/daming_leitai_khitan_axes.jpg` | `QST-CITY-DAMING-BAJI`<br>《铁锁镇河朔》 | 第二幕 · 寒斧惊沙 · 铁林露峥嵘<br>（`scene_dm_leitai_bout2`） | `16:9` |
| `CG-QST-065` | `[x]` 已完成 | `public/assets/quests/daming_midnight_sandtable_ambush.jpg` | `/assets/quests/daming_midnight_sandtable_ambush.jpg` | `QST-CITY-DAMING-BAJI`<br>《铁锁镇河朔》 | 第三幕 · 子夜沙盘 · 铁壁合围<br>（`scene_dm_midnight_sandtable_climax`） | `16:9` |
| `CG-QST-066` | `[x]` 已完成 | `public/assets/quests/daming_baji_official_choice.jpg` | `/assets/quests/daming_baji_official_choice.jpg` | `QST-CITY-DAMING-BAJI`<br>《铁锁镇河朔》 | 终幕 · 铁锁镇河朔 · 庙堂与江湖<br>（`scene_dm_sandtable_victory_choice`） | `16:9` |
| `CG-QST-067` | `[x]` 已完成 | `public/assets/quests/babuganchan_fanlou_bridge_duel.jpg` | `/assets/quests/babuganchan_fanlou_bridge_duel.jpg` | `QST-ADV-BABUGANCHAN`<br>《秋蝉八步 · 汴洛遗踪》 | 第三幕 · 飞桥夜影起杀机<br>（`scene_bbgc_03_fanlou_observe`） | `16:9` |
| `CG-QST-068` | `[x]` 已完成 | `public/assets/quests/babuganchan_zisheng_pagoda_wind.jpg` | `/assets/quests/babuganchan_zisheng_pagoda_wind.jpg` | `QST-ADV-BABUGANCHAN`<br>《秋蝉八步 · 汴洛遗踪》 | 第八幕 · 塔风初悟蝉蜕息<br>（`scene_bbgc_08_pagoda_insight`） | `16:9` |
| `CG-QST-069` | `[x]` 已完成 | `public/assets/quests/babuganchan_baimasi_ginkgo_steps.jpg` | `/assets/quests/babuganchan_baimasi_ginkgo_steps.jpg` | `QST-ADV-BABUGANCHAN`<br>《秋蝉八步 · 汴洛遗踪》 | 第十一幕 · 步步生莲试身法<br>（`scene_bbgc_11_qingshuang_trial`） | `16:9` |
| `CG-QST-070` | `[x]` 已完成 | `public/assets/quests/babuganchan_bixi_moon_water.jpg` | `/assets/quests/babuganchan_bixi_moon_water.jpg` | `QST-ADV-BABUGANCHAN`<br>《秋蝉八步 · 汴洛遗踪》 | 第二十幕 · 夜雨碧溪悟八步<br>（`scene_bbgc_20_enlightenment`） | `16:9` |
| `CG-QST-071` | `[x]` 已完成 | `public/assets/quests/yanziwu_map_huqiu_shenkuo.jpg` | `/assets/quests/yanziwu_map_huqiu_shenkuo.jpg` | `QST-ADV-YANZIWU-MAP`<br>《烟波三叠 · 燕子坞水图》 | 第五幕 · 千人石上截黑手<br>（`scene_yzw_map_05_huqiu_shenkuo_ambush`） | `16:9` |
| `CG-QST-072` | `[x]` 已完成 | `public/assets/quests/yanziwu_map_24bridge_cipher.jpg` | `/assets/quests/yanziwu_map_24bridge_cipher.jpg` | `QST-ADV-YANZIWU-MAP`<br>《烟波三叠 · 燕子坞水图》 | 第十一幕 · 二十四桥参词隐<br>（`scene_yzw_map_11_24bridge_cipher`） | `16:9` |
| `CG-QST-073` | `[x]` 已完成 | `public/assets/quests/yanziwu_map_yangzhou_salt_arena.jpg` | `/assets/quests/yanziwu_map_yangzhou_salt_arena.jpg` | `QST-ADV-YANZIWU-MAP`<br>《烟波三叠 · 燕子坞水图》 | 第十三幕 · 演武院中破铁爪<br>（`scene_yzw_map_13_salt_arena_battle`） | `16:9` |
| `CG-QST-074` | `[x]` 已完成 | `public/assets/quests/yanziwu_map_shitou_red_cliff.jpg` | `/assets/quests/yanziwu_map_shitou_red_cliff.jpg` | `QST-ADV-YANZIWU-MAP`<br>《烟波三叠 · 燕子坞水图》 | 第二十幕 · 虎踞赤壁会焦堂<br>（`scene_yzw_map_20_shitou_cliff_showdown`） | `16:9` |
| `CG-QST-075` | `[x]` 已完成 | `public/assets/quests/yanziwu_map_taihu_boat_unite.jpg` | `/assets/quests/yanziwu_map_taihu_boat_unite.jpg` | `QST-ADV-YANZIWU-MAP`<br>《烟波三叠 · 燕子坞水图》 | 第二十五幕 · 烟波浩渺开燕坞<br>（`scene_yzw_map_25_epilogue_unlock`） | `16:9` |
| `CG-QST-076` | `[x]` 已完成 | `public/assets/quests/taohuadao_map_huqiu_compass.jpg` | `/assets/quests/taohuadao_map_huqiu_compass.jpg` | `QST-ADV-TAOHUADAO-MAP`<br>《碧海潮信 · 东海桃源图》 | 第八幕 · 云岩塔下截海鬼<br>（`scene_thd_map_08_huqiu_pagoda_battle`） | `16:9` |
| `CG-QST-077` | `[x]` 已完成 | `public/assets/quests/taohuadao_map_wansong_bisheng.jpg` | `/assets/quests/taohuadao_map_wansong_bisheng.jpg` | `QST-ADV-TAOHUADAO-MAP`<br>《碧海潮信 · 东海桃源图》 | 第十二幕 · 活字胶泥参暗版<br>（`scene_thd_map_12_academy_bisheng_cipher`） | `16:9` |
| `CG-QST-078` | `[x]` 已完成 | `public/assets/quests/taohuadao_map_qiantang_qin_tide.jpg` | `/assets/quests/taohuadao_map_qiantang_qin_tide.jpg` | `QST-ADV-TAOHUADAO-MAP`<br>《碧海潮信 · 东海桃源图》 | 第十八幕 · 观潮琴台听海拍<br>（`scene_thd_map_18_tide_pavilion_qu`） | `16:9` |
| `CG-QST-079` | `[x]` 已完成 | `public/assets/quests/taohuadao_map_dock_shark_boss.jpg` | `/assets/quests/taohuadao_map_dock_shark_boss.jpg` | `QST-ADV-TAOHUADAO-MAP`<br>《碧海潮信 · 东海桃源图》 | 第二十幕 · 演武船坞会狂鲨<br>（`scene_thd_map_20_port_dock_showdown`） | `16:9` |
| `CG-QST-080` | `[x]` 已完成 | `public/assets/quests/taohuadao_map_wanghu_silk_chart.jpg` | `/assets/quests/taohuadao_map_wanghu_silk_chart.jpg` | `QST-ADV-TAOHUADAO-MAP`<br>《碧海潮信 · 东海桃源图》 | 第二十五幕 · 碧海乘潮启桃源<br>（`scene_thd_map_25_epilogue_unlock`） | `16:9` |
| `CG-QST-081` | `[x]` 已完成 | `public/assets/quests/jinjun_spy_kaifeng_horseshoe.jpg` | `/assets/quests/jinjun_spy_kaifeng_horseshoe.jpg` | `QST-SECT-33-HEBEI-SPY`<br>《御前泄密 · 河北暗桩》 | 第六幕 · 红烛算筹破密押<br>（`scene_jj_spy_06_candlelight_cipher_crack`） | `16:9` |
| `CG-QST-082` | `[x]` 已完成 | `public/assets/quests/jinjun_spy_zhending_horsemarket.jpg` | `/assets/quests/jinjun_spy_zhending_horsemarket.jpg` | `QST-SECT-33-HEBEI-SPY`<br>《御前泄密 · 河北暗桩》 | 第十五~十六幕 · 榷场惊马破双谍<br>（`scene_jj_spy_15_horse_market_night_battle` 等 2 幕） | `16:9` |
| `CG-QST-083` | `[x]` 已完成 | `public/assets/quests/jinjun_spy_longxing_guanyin.jpg` | `/assets/quests/jinjun_spy_longxing_guanyin.jpg` | `QST-SECT-33-HEBEI-SPY`<br>《御前泄密 · 河北暗桩》 | 第二十一幕 · 千手慈航照暗影<br>（`scene_jj_spy_21_guanyin_pavilion_secret`） | `16:9` |
| `CG-QST-084` | `[x]` 已完成 | `public/assets/quests/jinjun_spy_daming_sandtable.jpg` | `/assets/quests/jinjun_spy_daming_sandtable.jpg` | `QST-SECT-33-HEBEI-SPY`<br>《御前泄密 · 河北暗桩》 | 第二十八幕 · 行宫沙盘决方略<br>（`scene_jj_spy_28_sandtable_strategy_choice`） | `16:9` |
| `CG-QST-085` | `[x]` 已完成 | `public/assets/quests/jinjun_spy_yellow_river_chains.jpg` | `/assets/quests/jinjun_spy_yellow_river_chains.jpg` | `QST-SECT-33-HEBEI-SPY`<br>《御前泄密 · 河北暗桩》 | 第三十五~三十六幕 · 铁索横江战远风<br>（`scene_jj_spy_35_yellow_river_boss_showdown` 等 2 幕） | `16:9` |
| `CG-QST-086` | `[x]` 已完成 | `public/assets/quests/jinjun_spy_zichen_memorial.jpg` | `/assets/quests/jinjun_spy_zichen_memorial.jpg` | `QST-SECT-33-HEBEI-SPY`<br>《御前泄密 · 河北暗桩》 | 第四十一~四十三幕 · 玉阶一念定乾坤<br>（`scene_jj_spy_41_zichen_verdict_choice` 等 5 幕） | `16:9` |
| `CG-QST-087` | `[x]` 已完成 | `public/assets/quests/taihang_camp1_depart_army.jpg` | `/assets/quests/taihang_camp1_depart_army.jpg` | `QST-SECT-33-TAIHANG-CAMPAIGN-1`<br>《太行剿匪 · 壹 · 骄兵折戟》 | 第八幕 · 帅台点兵五千甲<br>（`scene_jtc1_08_depart_five_thousand`） | `16:9` |
| `CG-QST-088` | `[x]` 已完成 | `public/assets/quests/taihang_camp1_blind_march.jpg` | `/assets/quests/taihang_camp1_blind_march.jpg` | `QST-SECT-33-TAIHANG-CAMPAIGN-1`<br>《太行剿匪 · 壹 · 骄兵折戟》 | 第十九幕 · 不识兵机入绝壑<br>（`scene_jtc1_19_blind_canyon_march`） | `16:9` |
| `CG-QST-089` | `[x]` 已完成 | `public/assets/quests/taihang_camp1_fire_ambush.jpg` | `/assets/quests/taihang_camp1_fire_ambush.jpg` | `QST-SECT-33-TAIHANG-CAMPAIGN-1`<br>《太行剿匪 · 壹 · 骄兵折戟》 | 第二十二幕 · 万火箭雨焚深涧<br>（`scene_jtc1_22_canyon_fire_attack`） | `16:9` |
| `CG-QST-090` | `[x]` 已完成 | `public/assets/quests/taihang_camp1_rearguard_stand.jpg` | `/assets/quests/taihang_camp1_rearguard_stand.jpg` | `QST-SECT-33-TAIHANG-CAMPAIGN-1`<br>《太行剿匪 · 壹 · 骄兵折戟》 | 第二十六幕 · 单枪断后血染谷<br>（`scene_jtc1_26_lone_rearguard_stand`） | `16:9` |
| `CG-QST-091` | `[x]` 已完成 | `public/assets/quests/taihang_camp1_court_reprimand.jpg` | `/assets/quests/taihang_camp1_court_reprimand.jpg` | `QST-SECT-33-TAIHANG-CAMPAIGN-1`<br>《太行剿匪 · 壹 · 骄兵折戟》 | 第三十四幕 · 紫宸殿前摘冠带<br>（`scene_jtc1_34_zichen_court_reprimand`） | `16:9` |
| `CG-QST-092` | `[x]` 已完成 | `public/assets/quests/taihang_camp1_rain_graveyard.jpg` | `/assets/quests/taihang_camp1_rain_graveyard.jpg` | `QST-SECT-33-TAIHANG-CAMPAIGN-1`<br>《太行剿匪 · 壹 · 骄兵折戟》 | 第三十九幕 · 汴郊孤冢哭忠魂<br>（`scene_jtc1_39_rain_graveyard_tears`） | `16:9` |
| `CG-QST-093` | `[x]` 已完成 | `public/assets/quests/taihang_camp2_court_petition.jpg` | `/assets/quests/taihang_camp2_court_petition.jpg` | `QST-SECT-33-TAIHANG-CAMPAIGN-2`<br>《太行剿匪 · 贰 · 刮目相看》 | 第十三幕 · 黑王公金殿保孤臣<br>（`scene_jtc2_13_wang_court_petition`） | `16:9` |
| `CG-QST-094` | `[x]` 已完成 | `public/assets/quests/taihang_camp2_three_forts.jpg` | `/assets/quests/taihang_camp2_three_forts.jpg` | `QST-SECT-33-TAIHANG-CAMPAIGN-2`<br>《太行剿匪 · 贰 · 刮目相看》 | 第二十四幕 · 步步为营连拔三寨<br>（`scene_jtc2_24_three_forts_conquered`） | `16:9` |
| `CG-QST-095` | `[x]` 已完成 | `public/assets/quests/taihang_camp2_captured_loot.jpg` | `/assets/quests/taihang_camp2_captured_loot.jpg` | `QST-SECT-33-TAIHANG-CAMPAIGN-2`<br>《太行剿匪 · 贰 · 刮目相看》 | 第二十九幕 · 瓮中捉鳖起赃银<br>（`scene_jtc2_29_prisoners_and_treasure`） | `16:9` |
| `CG-QST-096` | `[x]` 已完成 | `public/assets/quests/taihang_camp2_feihu_bridge_retreat.jpg` | `/assets/quests/taihang_camp2_feihu_bridge_retreat.jpg` | `QST-SECT-33-TAIHANG-CAMPAIGN-2`<br>《太行剿匪 · 贰 · 刮目相看》 | 第三十三幕 · 残寇三百守断魂<br>（`scene_jtc2_33_wang_retreats_bridge`） | `16:9` |
| `CG-QST-097` | `[x]` 已完成 | `public/assets/quests/taihang_camp2_kaifeng_ten_executions.jpg` | `/assets/quests/taihang_camp2_kaifeng_ten_executions.jpg` | `QST-SECT-33-TAIHANG-CAMPAIGN-2`<br>《太行剿匪 · 贰 · 刮目相看》 | 第三十八幕 · 市曹十斩慰忠魂<br>（`scene_jtc2_38_ten_leaders_executed`） | `16:9` |
| `CG-QST-098` | `[x]` 已完成 | `public/assets/quests/taihang_camp3_army_encircle.jpg` | `/assets/quests/taihang_camp3_army_encircle.jpg` | `QST-SECT-33-TAIHANG-CAMPAIGN-3`<br>《太行剿匪 · 叁 · 犁庭扫穴》 | 第十三幕 · 铁桶合围锁太行<br>（`scene_jtc3_13_encircle_taihang`） | `16:9` |
| `CG-QST-099` | `[x]` 已完成 | `public/assets/quests/taihang_camp3_night_infiltration.jpg` | `/assets/quests/taihang_camp3_night_infiltration.jpg` | `QST-SECT-33-TAIHANG-CAMPAIGN-3`<br>《太行剿匪 · 叁 · 犁庭扫穴》 | 第十七幕 · 子夜玄衣度暗崖<br>（`scene_jtc3_17_midnight_black_suits`） | `16:9` |
| `CG-QST-100` | `[x]` 已完成 | `public/assets/quests/taihang_camp3_bandits_surrender.jpg` | `/assets/quests/taihang_camp3_bandits_surrender.jpg` | `QST-SECT-33-TAIHANG-CAMPAIGN-3`<br>《太行剿匪 · 叁 · 犁庭扫穴》 | 第二十六幕 · 大开寨门降群寇<br>（`scene_jtc3_26_gates_open_surrender`） | `16:9` |
| `CG-QST-101` | `[x]` 已完成 | `public/assets/quests/taihang_camp3_execution_raid.jpg` | `/assets/quests/taihang_camp3_execution_raid.jpg` | `QST-SECT-33-TAIHANG-CAMPAIGN-3`<br>《太行剿匪 · 叁 · 犁庭扫穴》 | 第三十三幕 · 京东双寇劫法场<br>（`scene_jtc3_33_chao_ruan_raid`） | `16:9` |
| `CG-QST-102` | `[x]` 已完成 | `public/assets/quests/taihang_camp3_lv4_investiture.jpg` | `/assets/quests/taihang_camp3_lv4_investiture.jpg` | `QST-SECT-33-TAIHANG-CAMPAIGN-3`<br>《太行剿匪 · 叁 · 犁庭扫穴》 | 第三十九幕 · 紫宸受封都虞候<br>（`scene_jtc3_39_lv4_investiture`） | `16:9` |

---

## 二、 逐张画面考据要求与生图 Prompt 规范

> **全局美术铁律（必遵）**：
> 1. **时代锚点**：公元 1050 年（北宋仁宗皇祐二年），建筑斗拱、禁军甲胄、差役服饰、市井旗幌均须符合北宋画院青绿重彩工笔美学（参考《清明上河图》《瑞鹤图》设色与笔意），严禁出现明清剃发辫子、清式官帽或现代元素。
> 2. **无乱码文字铁律**：画面中的旌旗、木牌、匾额仅保留纯色纹样或留白肌理，**严禁生成可读汉字或 AI 伪汉字乱码**。
> 3. **严禁脚本伪造**：必须逐张调用 `generate_image` 生成高清母版（建议先归档未压缩 PNG 至 `assets_raw_masters/quests/`，再转为高品质 `.jpg` 放入 `public/assets/quests/`），严禁使用 PIL/Canvas/SVG 拼贴伪造。

---

### 1. `CG-QST-001`：东京开封府 · 市曹刑场处斩图

- **关联文件**：[`src/data/quests/sects/kaifengTaihangBanditQuest.ts`](../src/data/quests/sects/kaifengTaihangBanditQuest.ts)
- **目标路径**：`public/assets/quests/kaifeng_execution.jpg`
- **画框题跋**：`东京市曹刑场 · 太行悍匪雷震山明正典刑`
- **剧情语境**：
  - 主角在华北官道击败并生擒太行山二流上品悍匪头目【雷震山】，押交开封府展昭与包拯会审定罪。
  - 五日期满午时三刻，于东京城南繁华十字街口市曹刑场公开处斩。
- **画面核心要素**：
  1. **环境氛围**：北宋东京汴梁城南十字街口市曹刑场，阴云微透天光，远处可见宋式歇山顶城楼飞檐、垂柳与酒旗。
  2. **主体人物**：高筑的木制刑台之上，体格魁梧的悍匪（雷震山）赤膊反绑双臂跪于木墩前；身旁一名蒙面赤膊或短打皂衣的魁梧刽子手双手高举九环厚背鬼头大刀，蓄势待劈。
  3. **前景与中景**：刑台后方设监斩官案与大鼓架，台下宋代铁甲禁军与皂衣捕快持长戟朴刀列阵警戒，绳栏外百姓簇拥围观。
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color painting illustration, wide cinematic 16:9 composition. A solemn Northern Song public execution ground (市曹刑场) at a grand crossroads in Kaifeng capital around 1050 AD under overcast amber-grey clouds. On a raised timber platform, a burly mountain bandit prisoner with hands bound behind his back kneels before a wooden block, while a muscular masked executioner raises a heavy broadsword (鬼头刀) high in the air ready to strike. Behind the platform stands a crimson-draped official supervision desk and war drums; around the platform, Northern Song imperial guards in iron lamellar armor holding halberds keep back a crowd of townsfolk. Song-style tiled roofs, city gate towers, and willow trees in subtle mist. Authentic Song court painting brushwork, rich mineral pigments, dramatic tension, no modern elements, blank banners with no text or characters.
  ```

---

### 2. `CG-QST-002`：太行山寨校场 · 主角粗布囚衣待斩图

- **关联文件**：[`src/data/quests/sects/kaifengTaihangBanditQuest.ts`](../src/data/quests/sects/kaifengTaihangBanditQuest.ts)
- **目标路径**：`public/assets/quests/taihang_beheading.jpg`
- **画框题跋**：`太行山寨校场 · 身着粗布囚衣押跪待斩`
- **剧情语境**：
  - 雷震山被斩三十日后，再行华北官道，遭遇太行天王【王重岳】与九纹狂龙【史万山】1v2 联手围堵。
  - 若主角未能撑满 3 个回合战败，将被剥去六扇门官袍与兵刃，换上一身灰褐粗布衣，押回太行山绿林总寨聚义厅外校场斩首祭旗（触发 Game Over 前的专属终局演出）。
- **画面核心要素**：
  1. **环境氛围**：险峻峥嵘的太行山绝壁环抱之中，木石筑成的绿林总寨聚义厅外大校场，黄昏残阳如血，四周松脂火把熊熊燃烧，黑红战旗猎猎翻飞。
  2. **主体人物（核心视觉要求）**：年轻的北宋武侠主角**身穿破旧灰褐粗布衣（布衣）**，发髻微乱、衣衫带伤，双手被粗麻绳死死反绑于背后，被两名凶悍山匪一左一右死死按住双肩强押跪在冰冷青石坪上；身侧一名壮硕山寨刽子手正高举鬼头大刀准备斩首。
  3. **背景压迫感**：高处石阶虎皮交椅前，紫髯披甲的总瓢把子（王重岳）与赤膊刺青提铜棍的副总瓢把子（史万山）冷眼俯视，四周山匪持刀环伺。
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color painting illustration, wide cinematic 16:9 composition. Dusk inside a rugged mountain bandit stronghold courtyard (太行山寨校场) surrounded by towering misty Taihang cliffs and pine trees, lit by dozens of blazing pine torches. In the center foreground, a young Chinese martial artist protagonist dressed only in plain tattered grey-brown coarse cloth robes (粗布布衣), hands tightly bound behind his back with thick hemp rope, is forced to kneel on rough stone slabs as two burly bandits press down on his shoulders. Beside him, a fierce bandit executioner raises a heavy鬼头刀 broadsword about to behead him. On the raised stone terrace behind, two imposing bandit chieftains (one bearded in dark armor, one muscular with dragon tattoos holding a bronze staff) watch coldly before tiger-skin chairs. Authentic 1050 AD Northern Song wuxia painting style, mineral pigments, dramatic torchlight and crimson dusk, no modern elements, blank banners with no text or characters.
  ```

---

### 3. `CG-QST-003`：城隍破庙残夜 · 篝火瓦罐分焦饼图

- **关联文件**：[`src/data/quests/sects/gaibangEntryQuest.ts`](../src/data/quests/sects/gaibangEntryQuest.ts)
- **目标路径**：`public/assets/quests/gaibang_temple_fire.jpg`
- **画框题跋**：`城隍破庙残夜 · 半块焦饼百家羹`
- **剧情语境**：
  - 主角囊中羞涩（银两不超过 3 两）流落中原街头，还将半块粗麦锅盔分给逃荒小女孩小草。
  - 入夜寒风骤起，五袋老乞【鲁三瓢】引主角至城西荒废城隍破庙避风；庙中十余名老弱乞儿与流民围坐一团篝火，缺耳黑陶瓦罐炖着滚烫的百家杂菜热汤，鲁三瓢掰开粗麦焦饼递予主角，道出“不欺暗室、不弃同道”的化子本分。
- **画面核心要素**：
  1. **环境氛围**：北宋城郊荒废残破的城隍古庙大殿一角，殿顶残瓦漏下清冷寒月微光，斑驳泥塑神像隐于暗影，门外寒风卷起枯叶。
  2. **主体人物**：中央噼啪作响的枯枝篝火旁，身穿百衲补丁衣、腰悬五只粗麻布袋的慈眉老丐（鲁三瓢）含笑将掰开的半块金黄焦香锅盔递向身穿洗白布衣的年轻少侠；旁侧小女孩（小草）捧着粗陶碗依偎在瞎眼老妪身边喝热汤。
  3. **前景与质感**：篝火上架着一口缺耳黑陶瓦罐，白气蒸腾；地上铺着干爽稻草与芦竹竿，暖橘色火光与殿外幽蓝夜色形成极具人间烟火气的冷暖对比。
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color painting illustration, wide cinematic 16:9 composition. Inside a weathered abandoned City God temple at night around 1050 AD, cold moonlight filtering through broken roof tiles while dry autumn leaves swirl outside the open wooden doors. Around a warm crackling campfire in the center, a cheerful elderly beggar martial artist in patched hemp robes with five small cloth pouches tied to his belt breaks a toasted flatbread in half and offers it to a young wandering martial artist in plain worn cloth robes. Over the fire, a chipped black clay pot bubbles with steaming vegetable soup; nearby on dry straw sit several humble refugees, including a little girl holding a clay bowl beside a blind grandmother, and a bamboo staff leaning against a pillar. Warm orange firelight contrasting against cool indigo night shadows, authentic Song court painting brushwork, rich mineral pigments, heartfelt wuxia humanity, no modern elements, blank plaques with no text or characters.
  ```

---

### 4. `CG-QST-004`：米行账房烛影 · 五百雪花官银拒贪图

- **关联文件**：[`src/data/quests/sects/gaibangEntryQuest.ts`](../src/data/quests/sects/gaibangEntryQuest.ts)
- **目标路径**：`public/assets/quests/gaibang_granary_silver.jpg`
- **画框题跋**：`米行账房烛影 · 五百雪花官银一文不取`
- **剧情语境**：
  - 主角与丐帮六袋香主【吴岳彻】、老丐【鲁三瓢】夜袭囤粮掺沙的富泰米行后院，击败看院护院，为百余名流民夺回掺糠陈粟救命粮。
  - 众人搬粮之际，主角独入账房搜寻逼死佃户的阎王印子钱死契，却见樟木大箱敞开，满箱雪白耀眼的五百两官铸纹银唾手可得；门缝外鲁三瓢正暗中窥视考较本心，主角凛然合上银箱、只取一叠罪证死契付之一炬。
- **画面核心要素**：
  1. **环境氛围**：北宋富商米行深宅账房内景，雕花木格窗外透出搬运麻袋的火把微光，室内檀木算盘、账册与铜烛台摇曳出深邃光影。
  2. **主体人物**：身着朴素布衣的年轻主角立于大敞的包铜樟木银箱前，箱内整齐码放着泛着清冷银光的北宋雪花官银铤；主角神色坦荡坚毅，一手决然按下箱盖将其合拢，另一手只抽出一束卷宗契纸凑近烛火引燃。
  3. **叙事暗笔**：后方半掩的雕花木门缝隙间，隐约可见老丐苍老却欣慰的目光静静注视。
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color painting illustration, wide cinematic 16:9 composition. Nighttime inside a wealthy Northern Song grain merchant's wooden accounting room (账房) around 1050 AD, lit by a flickering brass candlestick on a dark rosewood desk with an abacus and scroll ledgers. On the floor sits an open iron-bound camphorwood chest filled with gleaming silver ingots (宋代雪花银铤). A young upright martial artist in humble plain cloth robes stands beside the chest, resolutely pushing the heavy lid shut without touching a single piece of silver, while holding a bundle of debt-deed papers over the candle flame to burn them. Through a narrow gap in the half-open lattice door in the background, the silhouette of an old beggar elder watches quietly in approval. Authentic Song dynasty court painting style, dramatic chiaroscuro candlelight and cool moonlight, mineral pigments, no modern elements, no readable text or characters on scrolls or papers.
  ```

---

### 5. `CG-QST-005`：洛阳城郊杏子林 · 乔峰拍封酹酒立誓图

- **关联文件**：[`src/data/quests/sects/gaibangEntryQuest.ts`](../src/data/quests/sects/gaibangEntryQuest.ts)
- **目标路径**：`public/assets/quests/gaibang_apricot_oath.jpg`
- **画框题跋**：`洛阳城郊杏子林 · 拍封舀酒共立三规`
- **剧情语境**：
  - 主角持青竹片赴洛阳城郊杏子林总舵，先后得副帮主马大元、传功长老宋奚长、太上老帮主汪剑通与徐冲霄点头许准，最终步入聚义大坛。
  - 年方二十余岁、浓眉虎目、豪气干云的丐帮少帮主【乔峰】立于漫天红叶老杏树下，一掌拍碎大泥封酒坛，舀起两粗碗烈酒递与主角，当着百余名席地而坐的各袋丐帮弟子立下“不负家国苍生、不欺弱小孤寡、不卖同门手足”铁血三规，仰首共饮。
- **画面核心要素**：
  1. **环境氛围**：洛阳城郊连绵数里的苍劲老杏子林总舵大坛，秋阳澄澈如金，漫天金黄与绯红杏叶随风飘落，古朴聚义木坛与打狗绿竹阵旗环列。
  2. **主体人物**：画面中央，身材魁伟、浓眉大眼、身穿灰色粗布敞襟短褐的青年豪侠帮主（乔峰）单手托起粗陶大酒碗豪迈仰饮，脚边一只黑陶大酒坛泥封四溅、酒香四溢；对面年轻主角双手举碗慨然对饮。
  3. **群像烘托**：四周林间空地上，白须威严的执法长老（白世镜）、拄竹杖的耄耋前辈与数十名衣衫褴褛却神采飞扬的丐帮各袋弟子举碗呼应，豪气直冲云霄。
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color painting illustration, wide cinematic 16:9 composition. Golden autumn afternoon in the legendary Apricot Forest (洛阳杏子林) outside Luoyang around 1050 AD, ancient gnarled apricot trees shedding vibrant amber and crimson leaves in the wind. In the center clearing before a rustic timber gathering altar, a heroic, broad-shouldered young Beggar Sect chief (Qiao Feng, bold eyebrows, fierce righteous eyes, grey coarse open-collar martial tunic) raises a large rough clay bowl of liquor high toastingly beside a freshly unsealed clay wine jar, facing a young martial artist protagonist who raises a matching clay bowl in solemn oath. Surrounding them in a wide semicircle beneath the apricot trees, dozens of Beggar Sect elders and patched-robe disciples holding green bamboo staffs cheer and raise bowls in brotherhood. Authentic Song dynasty court painting brushwork, rich mineral pigments, sweeping heroic wuxia atmosphere, no modern elements, blank banners with no text or characters.
  ```

---

### 6. `CG-QST-006`：杏林斜阳授袋 · 一袋挂腰百衲衣图

- **关联文件**：[`src/data/quests/sects/gaibangEntryQuest.ts`](../src/data/quests/sects/gaibangEntryQuest.ts)
- **目标路径**：`public/assets/quests/gaibang_bamboo_pouch.jpg`
- **画框题跋**：`杏林斜阳授袋 · 青竹芦竿踏歌行`
- **剧情语境**：
  - 饮罢入门盟誓酒，执法长老【白世镜】高诵帮律入册，帮主【乔峰】亲自取过一只粗麻布缝制的一袋青麻袋系于主角腰间，授下【破旧百衲乞丐衣】、【山民蒲草鞋】与【叫花驱犬芦竹竿】。
  - 夕阳将杏子林染成万顷赤金，主角身披百衲衣、手执青绿芦竹竿，在乔峰与鲁三瓢、吴岳彻等众兄弟送别目光中阔步迈向九州四海。
- **画面核心要素**：
  1. **环境氛围**：黄昏落日熔金的杏子林山道出口，远方可见北宋洛阳城雄伟城郭轮廓与洛水波光，暮鸦归林，落叶铺满青石古道。
  2. **主体人物**：前景中央，年轻主角已换上一身干净整洁的百衲补丁衣、脚踏蒲草鞋，腰间醒目地垂挂着**一只粗麻布袋（一袋弟子信物）**，右手握持一根青翠坚韧的芦竹竿，回首向林中抱拳作别，眼神清亮昂扬。
  3. **中景呼应**：林口古杏树下，魁伟豪迈的乔峰负手含笑颔首，旁侧老丐鲁三瓢挥手送行，尽显“身无分文入杏林，胸怀万壑济苍生”的武侠浪漫。
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color painting illustration, wide cinematic 16:9 composition. Sunset at the stone path exit of the Apricot Forest overlooking distant Northern Song Luoyang city walls and glowing river waters around 1050 AD, bathed in warm golden-crimson twilight. In the foreground, a spirited young martial artist now wearing a neat hundred-patch beggar robe (百衲衣), woven straw sandals, and a single coarse hemp pouch (一袋) tied proudly at the waist, holding a green bamboo staff, turns slightly to clasp hands in farewell with a bright determined gaze. Beneath the golden apricot trees behind him, the tall heroic young Beggar Sect chief Qiao Feng and an elderly smiling five-pouch beggar wave farewell. Falling autumn leaves, poetic Song court painting aesthetics, mineral pigments, uplifting chivalric journey mood, no modern elements, no text or characters.
  ```

---

### 7. `CG-QST-007`：长安秋雨茶棚 · 残枰拾子结松缘图

- **关联文件**：[`src/data/quests/sects/huashanEntryQuest.ts`](../src/data/quests/sects/huashanEntryQuest.ts)
- **目标路径**：`public/assets/quests/huashan_changan_rain_go.jpg`
- **画框题跋**：`长安秋雨茶棚 · 残枰拾子结松缘`
- **剧情语境**：
  - 皇祐二年关中秋雨潇潇，尚未习武的白身主角途经京兆府（长安）明德门外简陋芦席茶棚。
  - 锦衣商贾与挎刀豪客争抢棚内干爽座位，将身穿洗白麻衣的华山隐逸前辈【云台棋叟】挤至滴水檐边；主角冒雨自泥泞车辙中拾起滚落的缺角乌云黑子，细细擦净双手奉还，一念赤诚结下西岳仙缘。
- **画面核心要素**：
  1. **环境氛围**：北宋长安城郊烟雨朦胧的古道芦席茶棚，远处可见雄浑苍古的长安城墙轮廓与萧瑟秋柳，细密雨丝斜织，地面泥辙积水微泛涟漪。
  2. **主体人物**：茶棚滴水竹檐边，须发半湿、身穿朴素灰麻道衣的清癯老道坐于矮凳上，膝前木案摆着一副斑驳柏木围棋残局；年轻布衣主角半身淋在雨幕中，微躬身双手捧着一枚擦拭干净的乌黑围棋子恭敬奉还，神情温厚诚挚。
  3. **对比烘托**：茶棚内侧模糊暖光下，几名披锦缎斗篷、挎钢刀的世俗江湖客背身饮茶喧哗，与檐外一老一少的清雅松风意境形成鲜明对比。
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color painting illustration, wide cinematic 16:9 composition. Misty autumn rain outside Changan city gate around 1050 AD, beside a humble roadside reed-thatched tea shed along a muddy ancient road with distant grand Song city walls in soft rain mist. At the dripping edge of the eaves sits a serene, thin elderly Taoist recluse in plain washed hemp robes before a weathered wooden Go board (围棋盘). Stepping into the slanting rain, a humble young traveler in plain cloth robes with no weapons bows respectfully and offers back a clean black Go stone rescued from a muddy wheel-rut. Inside the dry inner shed behind them, wealthy merchants in brocade cloaks and armed bladesmen drink tea obliviously. Poetic Song court landscape-and-figure brushwork, cool青绿 mist and warm tea-stove glow, mineral pigments, no modern elements, blank tea banners with no text or characters.
  ```

---

### 8. `CG-QST-008`：西岳苍龙岭 · 万丈云海凡躯独行图

- **关联文件**：[`src/data/quests/sects/huashanEntryQuest.ts`](../src/data/quests/sects/huashanEntryQuest.ts)
- **目标路径**：`public/assets/quests/huashan_canglong_ridge.jpg`
- **画框题跋**：`西岳苍龙岭 · 万丈云海凡躯独行`
- **剧情语境**：
  - 主角毫无内力与轻功护身，全凭一双凡人肉足与坚定心志徒步攀越华山千尺幢、百尺峡，踏上鬼见愁的第三险【苍龙岭】。
  - 刀刃般狭窄的苍黑花岗岩山脊悬亘于两峰之间，两侧万丈深渊云海翻涌、罡风呼啸，主角压低身形、紧扶石脊凿痕一步步向玉女峰攀行。
- **画面核心要素**：
  1. **环境氛围**：参考北宋范宽《溪山行旅图》与郭熙《早春图》的大山大水气魄，一条苍黑险峻、宽仅二尺的巨龙脊状花岗岩绝岭斜贯画面对角线，左右两侧皆是深不见底的翻腾白色云海与奇松峭壁。
  2. **主体人物**：绝岭中段，手无寸铁、背负简朴布囊的布衣年轻主角俯低重心，双手紧扣岩脊石窝与寒霜铁链，顶着猎猎狂风坚定向上攀爬；身后不远处，老挑山夫周伯正扶着石柱喘息仰望。
  3. **意境张力**：渺小却无比坚韧的凡人身影与宏伟奇险的太华山势形成强烈视觉震撼，尽显“未习轻功而以诚心叩仙山”的孤勇感。
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi and monumental landscape ink-and-color painting (in the spirit of Fan Kuan and Li Tang), wide cinematic 16:9 composition. The perilous Canglong Ridge (华山苍龙岭) of Mount Hua around 1050 AD: a razor-narrow dark granite dragon-back ridge cutting diagonally upward between sheer vertical cliffs, with fathomless churning seas of white clouds on both sides and gnarled cliff pines clinging to rock crevices. On the narrow stone steps along the ridge, an uninitiated young mortal traveler in wind-whipped plain cloth robes carrying a simple cloth bundle crouches low against fierce mountain gales, gripping frosted iron chains and carved rock holds step by step without martial arts or qinggong, while an old mountain porter rests behind him. Breathtaking scale, mineral azurite and malachite accents, dramatic mountain wind, no modern safety railings or modern gear, no text or characters.
  ```

---

### 9. `CG-QST-009`：华山绝顶博台 · 孤松云海弈残局图

- **关联文件**：[`src/data/quests/sects/huashanEntryQuest.ts`](../src/data/quests/sects/huashanEntryQuest.ts)
- **目标路径**：`public/assets/quests/huashan_botai_chess.jpg`
- **画框题跋**：`华山绝顶博台 · 孤松云海弈残局`
- **剧情语境**：
  - 主角登临华山绝顶【博台孤峰弈棋亭】（陈抟老祖昔年弈赢华山胜迹），接受华山掌门太岳真君【岳沧溟】与潼关剑神【秦烈山】的非战斗第一关考校——推演《希夷三劫》连环三手残局。
  - 主角不贪边角小利、不逞穷寇杀心，以“弃子争先、倒脱靴、藏锋赢半目”三手棋理令秦烈山与岳沧溟双双动容。
- **画面核心要素**：
  1. **环境氛围**：四面绝壁孤耸入云的华山博台石峰之巅，一座古朴宋式六角汉白玉石亭临渊而筑，亭畔一株苍劲千年古松探出悬崖，脚下万顷云海与远方层峦尽收眼底。
  2. **主体人物**：石亭中央古石枰前，年轻布衣主角凝神静气，指尖拈着一枚乌黑棋子正欲落下收官妙手；对面身穿紫霞道袍、面如冠玉的三缕长髯掌门（岳沧溟）抚须含笑注视棋局，亭侧背负古剑、浓眉虬髯的紫膛脸长老（秦烈山）俯身瞪目惊叹。
  3. **道门清气**：仙鹤掠过远处云涛，松针微落石案，充满北宋高士问道论棋的清逸禅道之美。
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color painting illustration, wide cinematic 16:9 composition. Atop the isolated cliff-peak Chess Pavilion (华山博台弈棋亭) surrounded by boundless rolling cloud seas and jagged peaks of Mount Hua around 1050 AD, with an ancient twisted pine tree extending over the abyss and white cranes gliding afar. Inside the open stone pavilion at a carved stone Go table, a calm young traveler in humble mud-hemmed cloth robes holds a black Go stone poised over an intricate endgame. Across the board sits the dignified Huashan Taoist sect master in deep violet-indigo Taoist robes with three long strands of beard watching with serene approval, while beside them a fierce, broad-browed elder swordsman with a greatsword on his back leans in astonished admiration at the move. Crisp Song court painting linework, mineral青绿 pigments, transcendent Taoist atmosphere, no modern elements, blank stone pillars with no text or characters.
  ```

---

### 10. `CG-QST-010`：玉女峰紫霞殿 · 东峰紫气授青锋图

- **关联文件**：[`src/data/quests/sects/huashanEntryQuest.ts`](../src/data/quests/sects/huashanEntryQuest.ts)
- **目标路径**：`public/assets/quests/huashan_zixia_dawn_sword.jpg`
- **画框题跋**：`玉女峰紫霞殿 · 东峰紫气授青锋`
- **剧情语境**：
  - 主角于思过崖蒙目辨出松风真剑意，又在子夜寒崖凭凡人智计借洞口落石回音与顺风铜云板惊退西夏一品堂潜入细作。
  - 破晓卯时，玉女峰紫霞正气主殿外东峰朝阳跃出云海，万道紫气东来；掌门【岳沧溟】与【宁清羽】在殿前亲授【青灰道袍】、【道士云头布履】与【华山入门青钢剑】，正式收录主角入华山门墙。
- **画面核心要素**：
  1. **环境氛围**：破晓时分的华山玉女峰紫霞道观殿前白玉石坪，东方日出将浩瀚云海染成瑰丽的紫金与朝霞之色（“紫气东来”），宋代道观歇山飞檐、铜鹤香炉青烟袅袅。
  2. **主体人物**：画面中央，已换上一袭整洁【青灰道袍】与云头布履的年轻主角单膝或躬身肃立，双手郑重接过掌门岳沧溟递来的一柄寒光清湛的【青钢长剑】；岳沧溟身侧，白衣胜雪、佩剑清雅的玉女剑仙（宁清羽）温婉颔首，后方秦烈山与首徒高沧云等华山同门抱剑观礼。
  3. **色彩意境**：清冷青绿山石与破晓漫天紫金霞光交相辉映，庄严澄澈，定格“白身凡人终入西岳剑门”的高光时刻。
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color painting illustration, wide cinematic 16:9 composition. Breathtaking dawn at the white stone terrace of Zixia Taoist Temple (玉女峰紫霞道观) high on Mount Hua around 1050 AD, as the rising sun dyes the vast sea of clouds in luminous violet and golden morning glow (紫气东来). Before the grand Song-style wooden temple hall with bronze crane incense burners, the noble bearded Taoist sect master in purple-trimmed robes solemnly presents a gleaming green-steel straight sword (青钢剑) in its scabbard to a kneeling young disciple newly dressed in neat grey-blue Taoist robes and cloud-toe cloth shoes. Standing gracefully beside the master is a refined female sword immortal in white-and-cyan Taoist attire (Ning Qingyu), while senior Huashan disciples holding swords witness respectfully along the pine-lined terrace. Authentic Song court painting brushwork, rich mineral pigments, sacred chivalric ceremony, no modern elements, blank plaques with no text or characters.
  ```

---

### 11. `CG-QST-011`：九莲山千斤铁鼎炼体坪 · 寒泉挑水扎马图

- **关联文件**：[`src/data/quests/sects/nanshaolinEntryQuest.ts`](../src/data/quests/sects/nanshaolinEntryQuest.ts)
- **目标路径**：`public/assets/quests/nanshaolin_tripod_training.jpg`
- **画框题跋**：`九莲山千斤铁鼎坪 · 铁腕挑泉稳踏梅花桩`
- **剧情语境**：
  - 主角毫无内家根基初上莆田九莲山，铁罗汉堂主【元通】罚其与十五岁小沙弥【戒藏】于千斤铁鼎炼体坪苦修基本功。
  - 数十日寒暑锤炼，入夜山岚微雨之中，主角双腕扣着沉重熟铁环、双臂平伸挑起两只满溢寒泉的杉木大水桶，稳稳扎下南派“四平大马”立于湿滑青石梅花桩上；神炉赤红火光与寒泉白雾交映，面冷心热的元通禅师手持竹杖与一钵滚烫壮骨药汤静立桩下督训。
- **画面核心要素**：
  1. **环境氛围**：北宋闽中九莲山古刹炼体石坪，苍劲古榕盘根错节，后方矗立千斤青铜巨鼎与微透赤红炉火的铸铁神炉坊，一侧山涧寒泉池腾起丝丝白雾。
  2. **主体人物**：前景一排高低错落的青石梅花桩上，身穿湿透粗布短褐、双腕套着乌黑铁环的年轻主角咬牙平伸双臂，稳稳挑起两只水花微漾的大木桶，下盘四平大马稳如磐石；不远处小沙弥（戒藏）亦挑桶踏桩互相鼓劲。
  3. **师徒张力**：石桩旁，魁梧精悍、双臂古铜如生铁的老武僧（元通禅师）一手执青竹杖、一手托着冒热气的粗陶药钵，目光严厉中隐含赞许，尽显经典港式南拳电影苦练筑基的热血质感。
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color painting illustration, wide cinematic 16:9 composition inspired by classic Southern Shaolin martial arts cinema. Misty twilight at the Thousand-Jin Bronze Tripod training courtyard of Putian Southern Shaolin Temple in Fujian around 1050 AD, framed by ancient banyan trees, a massive bronze tripod cauldron, a glowing forge furnace in the background, and a steaming cold mountain spring pool. On wet stone plum-blossom poles (梅花桩) in the foreground, a determined young martial artist in sweat-soaked coarse cloth training attire, wearing heavy black iron rings on both forearms, holds a deep horse stance (四平大马) with arms extended horizontally supporting two brimming wooden water buckets without spilling. Beside the poles stands a stern, muscular senior Shaolin monk with bronze-like forearms, holding a bamboo cane in one hand and a steaming clay bowl of herbal medicine in the other, watching with quiet approval while a young 15-year-old novice monk trains nearby. Warm forge firelight contrasting with cool mountain mist, authentic Song court painting brushwork, mineral pigments, no modern elements, no text or characters.
  ```

---

### 12. `CG-QST-012`：泉州刺桐港雨夜 · 铁桥硬架碎倭刀图

- **关联文件**：[`src/data/quests/sects/nanshaolinEntryQuest.ts`](../src/data/quests/sects/nanshaolinEntryQuest.ts)
- **目标路径**：`public/assets/quests/nanshaolin_port_night_battle.jpg`
- **画框题跋**：`刺桐港狂潮夜雨 · 南拳铁桥力碎东洋刃`
- **剧情语境**：
  - 秋潮暴雨之夜，受北朝暗桩雇佣的东洋浪人头目【鬼丸甚内】率黑鲨水匪夜袭泉州刺桐港药栈，企图劫夺金创血竭与海道针经。
  - 危急时刻，主角双足钉死湿滑栈桥，以初成的南派铁桥双臂硬生生架住浪人头目劈落的长刀护住身后的小沙弥戒藏与老船工；电光石火间，南少林戒律首座【元觉】踏浪飞身赶到，右手探出《大力金刚指》精准夹住雪亮刀锋，将其寸寸震断！
- **画面核心要素**：
  1. **环境氛围**：公元 1050 年北宋泉州刺桐港番坊木栈桥，狂风暴雨倾盆而下，海浪拍击船坞激起千堆白雪，远处宋代福船桅杆与摇曳的油纸灯笼、火把映照雨幕。
  2. **主体交锋（双焦点高燃构图）**：湿滑木栈桥中央，年轻主角扎稳低沉马步、双臂交叉如铁桥奋力向上格架，护住身后跌坐的年轻沙弥与老船工；对面凶悍的东洋浪人武士双手高举修长弯刀下劈，而半空中披灰麻僧袍的威猛高僧（元觉首座）飞掠而至，两根泛着淡金劲力的铁指如钳子般生生夹断浪人长刀，断刃碎片与雨水四溅！
  3. **视觉张力**：雨丝、火光、浪花与崩碎的钢刃定格于一瞬间，兼具宋画工笔力道与港产功夫片雨夜码头决战的凌厉张力。
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color painting illustration, wide cinematic 16:9 action composition. Torrential rainstorm at night on the wooden harbour piers of Quanzhou Zaytun Port around 1050 AD, crashing ocean waves, moored Song dynasty sea junks, and blazing pine torches swaying in the gale. In the center of the rain-slicked pier, a young martial artist in coarse cloth robes plants a rock-solid Southern Fist horse stance, raising crossed iron-bridge forearms to block and protect a fallen young novice monk and an elderly boatman behind him. Facing them, a fierce rogue sea-raider swordsman slashes down with a long curved blade, while a powerful senior Southern Shaolin monk in grey robes leaps through the rain, clamping the steel blade between two bare fingers with supreme Vajra Finger force and shattering the sword into flying steel shards and water droplets. Dramatic chiaroscuro torchlight against stormy indigo sea and rain, authentic Song dynasty brushwork, rich mineral pigments, intense martial arts impact, no modern elements, blank lanterns with no text or characters.
  ```

---

### 13. `CG-QST-013`：南少林百杰木人巷 · 硬桥破阵出山门图

- **关联文件**：[`src/data/quests/sects/nanshaolinEntryQuest.ts`](../src/data/quests/sects/nanshaolinEntryQuest.ts)
- **目标路径**：`public/assets/quests/nanshaolin_wooden_alley.jpg`
- **画框题跋**：`九莲山百杰木人巷 · 铁线轰关见晨光`
- **剧情语境**：
  - 主角护港立功归山，奉方丈【元苦】法旨踏入【南少林百杰木人巷】接受入门终极考校。
  - 幽深石廊内机括轰鸣，十余尊包铜涂漆的少林机关木人出拳横棍重重夹击；主角双目如电，凝聚浑身劲力一记刚猛南拳轰开最后守关的镇门铜皮木人，尽头沉重石闸应声洞开，万丈闽海晨光与刺桐落花倾泻入巷，巷外元苦方丈与众高僧合十含笑相迎。
- **画面核心要素**：
  1. **环境氛围**：纵深透视极强的北宋古刹青石机关长廊（百杰木人巷），地面嵌有八卦方位石砖与暗槽齿轮，两侧密集排列着精巧古朴的宋代漆木包铜武僧机关人偶。
  2. **主体人物**：前景中轴线上，衣衫微破、汗水淋漓却神采奕奕的年轻主角前弓后箭，右拳挟破空劲风重重轰退当路一尊高大铜胸机关木人，左臂沉桥格开侧翼木人横扫而来的齐眉木棍。
  3. **光影叙事**：长廊尽头厚重石门刚刚向两侧洞开，灿烂金红的日出晨光穿透幽暗石巷照亮尘埃与飞舞的红花瓣，门外演武坪隐约可见披红祖衣的方丈与数名武僧合十伫立见证出关。
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color painting illustration, wide cinematic 16:9 perspective composition. Inside the solemn stone corridor of the Hundred-Heroes Wooden Dummy Alley (百杰木人巷) at Putian Southern Shaolin Temple around 1050 AD. Along both sides of the shadowed stone hall, intricate ancient wooden mechanical martial-monk dummies clad in bronze plates swing wooden arms and staffs via floor gears. In the foreground center, a bruised yet radiant young martial artist in torn training robes roots his stance and delivers a thunderous Southern Fist straight punch into the bronze chest-plate of the final guardian wooden dummy while parrying a wooden staff with his left forearm. At the far end of the corridor, heavy stone gates slide open, flooding the dark hall with brilliant golden morning sunlight and drifting crimson erythrina blossoms, revealing the silhouettes of the elderly Abbot in a kasaya robe and fellow monks standing in approval outside. Dramatic shafts of golden light, authentic Song court painting style, mineral pigments, triumphant martial arts cinema atmosphere, no modern elements, no text or characters.
  ```

---

### 14. `CG-QST-014`：天柱绝顶观云台 · 松枝煮雪论太和

- **关联文件**：[`src/data/quests/sects/zhenwuEntryQuest.ts`](../src/data/quests/sects/zhenwuEntryQuest.ts)
- **目标路径**：`public/assets/quests/zhenwu_cloud_tea.jpg`
- **画框题跋**：`天柱绝顶观云台 · 布衣老道松枝煮茶论太和`
- **剧情语境**：
  - 少侠初登武当山天柱绝顶观云台，晨雾未散、云海翻涌，偶遇隐瞒掌教身份的布衣白发老道（张玄素）于石桌旁以松枝煮雪茶，共论“世人皆求有，唯道守虚静”。
- **画面核心要素**：
  1. **环境氛围**：武当山天柱绝顶石台，云海浩渺如潮，远峰青绿叠翠如画，苍劲古松斜倚悬崖，晨光微金透云而出。
  2. **主体人物**：石桌一侧，白发银须、神色温雅清癯的布衣老道（张玄素）轻摇蒲扇煮着小泥炉上的粗陶茶壶；另一侧身着素净粗布衣衫、尚未佩剑的年轻少侠拱手垂听，神情沉静。
  3. **前景细节**：石桌上置两只宋式青瓷茶盏，旁有一把青竹扫帚倚松而立，呼应老道“扫雪煮茶”的出尘气韵。
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color painting illustration, wide cinematic 16:9 composition. Early dawn atop a high misty stone cliff terrace on Mount Wudang around 1050 AD, overlooking a vast sea of swirling white clouds and blue-green mountain peaks. Beneath an ancient gnarled pine tree, a serene white-bearded Taoist elder in humble plain grey-indigo linen robes (Zhang Xuansu in disguise) sits beside a rough stone table, gently fanning a small clay brazier boiling a ceramic teapot with pine twigs. Across the table sits a young Chinese martial arts novice in simple plain cloth robes with no weapon, listening respectfully over two celadon teacups. A bamboo broom leans quietly against the pine trunk. Authentic Northern Song court landscape painting brushwork, mineral azurite and malachite pigments, tranquil Daoist poetic atmosphere, no modern elements, no text or characters.
  ```

---

### 15. `CG-QST-015`：禹迹池畔太极坪 · 暮雨细观龟蛇峙

- **关联文件**：[`src/data/quests/sects/zhenwuEntryQuest.ts`](../src/data/quests/sects/zhenwuEntryQuest.ts)
- **目标路径**：`public/assets/quests/zhenwu_turtle_snake.jpg`
- **画框题跋**：`禹迹池畔太极坪 · 暮色微雨观龟蛇相峙悟圆融`
- **剧情语境**：
  - 紫霄宫三日观心将满，黄昏细雨中，少侠与首座大弟子宋远乔行至禹迹池畔太极坪，忽见青石池畔一只玄龟与一条青蛇对峙盘旋，龟静如岳、蛇动如风，少侠由此初悟“以静制动、圆转卸力”之理。
- **画面核心要素**：
  1. **环境氛围**：北宋道观紫霄宫外青石太极坪与禹迹池，暮色微雨，池面涟漪圈圈，古柏红墙隐约于山岚之中。
  2. **主体人物**：石栏旁，儒雅端方的武当首座大弟子（宋远乔，青衫道袍、负手含笑）侧身指点池畔；年轻少侠俯身凝望，眼神若有所悟。
  3. **前景焦点**：池畔湿润青石上，一只墨色玄龟缩首稳立，一条翠青小蛇盘旋游走却始终无法伤其分毫，暗合真武龟蛇护法与太极阴阳意象。
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color painting illustration, wide cinematic 16:9 composition. Dusk light rain at a mossy stone courtyard terrace beside a serene lotus-free mountain pond (Yujichi Pool) outside Zixiao Taoist Palace on Mount Wudang around 1050 AD, with Song-style vermilion palace walls and cypress trees veiled in mist. In the foreground on wet flagstones beside the rippling pond, a dark tortoise stands immovable facing a slender green snake coiling gracefully around it without striking. Standing nearby under the eaves or stone balustrade, a refined young Taoist senior disciple in neat indigo Taoist robes (Song Yuanqiao) gestures calmly toward the tortoise and snake, while the young plain-clothed protagonist watches in deep contemplation. Authentic Northern Song gongbi brushwork, soft ink wash rain and mineral pigments, philosophical wuxia atmosphere, no modern elements, no text or characters.
  ```

---

### 16. `CG-QST-016`：太和紫金正殿 · 拜师授受松纹剑

- **关联文件**：[`src/data/quests/sects/zhenwuEntryQuest.ts`](../src/data/quests/sects/zhenwuEntryQuest.ts)
- **目标路径**：`public/assets/quests/zhenwu_golden_sword.jpg`
- **画框题跋**：`太和紫金正殿 · 张玄素天师亲授真武松纹道剑`
- **剧情语境**：
  - 少侠历尽襄阳结缘、紫霄观心与南岩试炼后，登太和紫金正殿，方知观云台老道便是掌教天师张玄素。天师亲赐外门道篆、真武松纹道剑与道门金丹，少侠正式拜入真武道宗。
- **画面核心要素**：
  1. **环境氛围**：庄严肃穆的北宋太和绝顶紫金正殿内景，铜铸殿柱与藻井沉稳古朴，长明烛火与香炉青烟袅袅，殿外天柱峰云霞微透窗棂。
  2. **主体人物**：正殿高台前，白发飘逸、身着玄色镶金云纹法袍的掌教天师张玄素含笑俯身，双手将一柄连鞘古朴青松纹道剑与一只青瓷丹瓶递向单膝跪拜的年轻少侠。
  3. **左右观礼**：宋远乔、俞清虚、莫清谷、殷峰峰与清鹤等武当师长分列左右含笑颔首，庄重中透着师门温情。
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color painting illustration, wide cinematic 16:9 composition. Inside the solemn bronze-and-timber Golden Hall of Taihe Peak on Mount Wudang around 1050 AD, illuminated by tall brass candlesticks and drifting incense smoke, with misty mountain clouds visible through lattice doors. Before the altar, the white-haired Taoist Grandmaster Zhang Xuansu in dignified dark-indigo and gold-trimmed Taoist ceremonial robes smiles warmly as he bestows a plain pine-carved scabbard sword (真武松纹道剑) and a small celadon medicine bottle to the young protagonist kneeling respectfully on one knee. Flanking the hall in quiet approval stand senior Taoist disciples and elders in indigo robes. Authentic Northern Song court painting aesthetics, rich mineral pigments, solemn yet warm master-disciple ceremony, no modern elements, blank plaques with no text or characters.
  ```

---

### 17. `CG-QST-017`：宣德微服 · 相国寺万姓灯市图

- **关联文件**：[`src/data/quests/sects/kaifengRenzongEscortQuest.ts`](../src/data/quests/sects/kaifengRenzongEscortQuest.ts)
- **目标路径**：`public/assets/quests/renzong_weifu_market.jpg`
- **画框题跋**：`宣德微服 · 相国寺万姓灯市`
- **剧情语境**：
  - 开封府御前护卫（Lv.4）陪微服易服的三十九岁大宋天子赵祯（化名“赵官人”）于皇祐二年春暮步出大内、穿行东京大相国寺万姓交易市井。
  - 主仆驻足老禁军伤卒羊汤锅、毕昇泥活字《唐诗百篇》书摊前体察民情之际，钟楼檐角暗影中已悄然潜伏一名手持青铜铁鹰符的党项西夏斥候，山雨欲来风满楼。
- **画面核心要素**：
  1. **环境氛围**：借鉴北宋张择端《清明上河图》汴京市井木构营造与李唐青绿山石设色，灯火辉煌的相国寺木棚夜市、蒸腾热气的羊汤铜釜、摆满线装活字印本的书摊与高耸铜鼎香炉错落排布。
  2. **主体人物**：前景中景处，身着天青圆领襕衫、温润如儒生的宋仁宗赵祯负手缓行，身畔寸步不离的是身穿玄青护卫公服、按刀警觉四顾的主角（御前护卫）。
  3. **暗伏杀机**：右上角暮色钟楼飞檐暗影之中，一名党项西夏斥候半隐身形，指间捏着青铜铁鹰密符冷眼俯瞰下方行踪。
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Northern Song Dynasty (1050 AD) 16:9 cinematic narrative illustration in fine gongbi blue-green and mineral-gold ink-and-color painting on aged silk scroll. Twilight dusk falls over Daxiangguo Temple market in Bianliang (Kaifeng). Lanterns glow warmly along timber market stalls steaming with mutton soup cauldrons, movable-type printed bookstalls, and a tall bronze incense tripod. In the center foreground, thirty-nine-year-old Emperor Song Renzong Zhao Zhen disguised as a gentle scholar in an indigo-blue round-collar scholar robe strolls serenely, accompanied closely by his vigilant Kaifeng Royal Bodyguard protagonist in dark navy leather-reinforced patrol coat with an iron-hilted waist dao. High on a bell-tower roof corner in the upper right shadows lurks a Tangut Western Xia scout holding a small bronze iron-hawk tally, watching them quietly. Authentic Song dynasty robes, wooden brackets (dougong), blank wooden shop banners with zero text or watermarks.
  ```

---

### 18. `CG-QST-018`：资圣宝塔 · 飞檐断铃惊变图

- **关联文件**：[`src/data/quests/sects/kaifengRenzongEscortQuest.ts`](../src/data/quests/sects/kaifengRenzongEscortQuest.ts)
- **目标路径**：`public/assets/quests/renzong_pagoda_ambush.jpg`
- **画框题跋**：`资圣宝塔 · 飞檐断铃惊变`
- **剧情语境**：
  - 赵祯登临大相国寺资圣八角琉璃宝塔高廊凭栏远眺汴梁夜色，暮风忽止、角檐铁马风铃应弦而断。
  - 首轮 1v2 生死战爆发：西夏一品堂死士【拓跋枭】与【野利寒鸦】自琉璃瓦飞檐凌空扑下，弯刀淬毒银针直取赵祯，主角拔刀格针护驾，在塔廊击溃首波死士。
- **画面核心要素**：
  1. **环境氛围**：青黛新月微雾笼罩的八角琉璃宝塔高廊，一只青铜角檐风铃正悬在被利刃割断的麻绳残端晃荡。
  2. **主体人物**：画面中央，御前护卫主角箭步抢前，长刀出鞘劈出金石火星磕飞漫天毒针，死死将布衣书生装束的赵祯护在宋式雕花石栏杆后方；两名缠党项毡巾、披黑斗篷的西夏一品堂刺客分持弯刀与暗器自檐瓦扑落。
  3. **动作张力**：冷月青雾与淬火刀锋迸溅的泥金火花形成强烈冷暖对撞，尽显高空窄廊贴身护主之险绝。
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Northern Song Dynasty (1050 AD) 16:9 cinematic wuxia illustration in Song mineral gongbi painting style on silk. High gallery overlooking the octagonal glazed Zisheng Pagoda of Daxiangguo Temple under a misty crescent moon and teal-indigo night sky. A bronze corner wind-bell swings loose on a freshly severed hemp cord. Two black-cloaked Western Xia Yipintang assassins wearing Tangut felt turbans leap down from the upturned glazed tiles wielding gleaming curved scimitars and flying needles. At center, the Kaifeng Royal Guard protagonist steps decisively forward, drawing a long tempered Song steel blade that strikes bright sparks deflecting darts, shielding plain-robed Emperor Renzong behind a carved stone balustrade. Dramatic moonlight, mineral gold sparks, zero modern text.
  ```

---

### 19. `CG-QST-019`：樊楼飞桥 · 珠帘破屏杀机图

- **关联文件**：[`src/data/quests/sects/kaifengRenzongEscortQuest.ts`](../src/data/quests/sects/kaifengRenzongEscortQuest.ts)
- **目标路径**：`public/assets/quests/renzong_fanlou_assassins.jpg`
- **画框题跋**：`樊楼飞桥 · 珠帘破屏杀机`
- **剧情语境**：
  - 主仆退入京师第一名楼“白矾楼（樊楼）”高阁暂避风头并暗查西夏细作暗桩，席间由羊脂玉扳指与刀油腥气识破杀机。
  - 第二轮 1v2 生死战爆发：两名腰束绛红丝带的西夏一品堂红牌死士撞碎青竹珠帘、劈裂松鹤墨绘大屏风破壁突袭，主角翻身截刃护定天子，随后燃亮碧色号角灯火召援禁卫。
- **画面核心要素**：
  1. **环境氛围**：雕梁画栋的北宋汴梁樊楼三层雅阁之内，窗外隐约可见灯火连绵的飞桥虹廊；堂中一扇大型松鹤水墨折屏被刀气劈成两半，案上青瓷酒壶翻倒倾洒。
  2. **主体人物**：两名系红带、持血铁双匕与弯刀的一品堂红牌死士震断竹珠帘飞身杀入；主角扭身抢步挥剑硬撼双刃，一侧朱漆柱旁的素衣赵祯沉稳扶住青铜高烛台保持镇定。
  3. **宋画设色**：大面积暖红烛火、朱柱与碎裂木屑飞溅其间，兼具工笔细腻器具考据与武侠破局爆裂感。
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Northern Song Dynasty (1050 AD) 16:9 cinematic action illustration in rich red-gold and ink gongbi style. Inside the upper private gallery of Bianliang's three-story Fanlou tavern overlooking lantern-lit flying bridges outside the lattice windows. A large pine-and-ink folding screen shatters cleanly in half alongside an overturned celadon wine ewer. Two fierce Western Xia Yipintang Red-Plaque assassins in crimson waist sashes burst through snapped bamboo-pearl curtains lunging with twin blood-iron daggers and bent sabers. The Kaifeng Royal Guard protagonist twists forward to intercept both blades with a fierce sword slash while plain-robed Emperor Renzong steadies a bronze candelabrum near a vermilion timber pillar. Lantern light, shattered wood splinters, zero text.
  ```

---

### 20. `CG-QST-020`：虹桥夜雨 · 孤身血战双狼图

- **关联文件**：[`src/data/quests/sects/kaifengRenzongEscortQuest.ts`](../src/data/quests/sects/kaifengRenzongEscortQuest.ts)
- **目标路径**：`public/assets/quests/renzong_hongqiao_blood.jpg`
- **画框题跋**：`虹桥夜雨 · 孤身血战双狼`
- **剧情语境**：
  - 子夜骤雨倾盆，汴水暴涨，赵祯一行归宫必经之【汴水虹桥】被西夏一品堂最后两名“银狼”重甲统领合围封锁。
  - 第三轮 1v2 终局血战：主角左臂绑以御前撕下的白绸裹伤，孤身横刀立于湿滑虹桥拱顶，凭死志连续挑落重装银狼双煞；桥头酒肆挑檐下赵祯泰然独立，望向远方迷雾中驰援而来的三衙禁军火把长龙。
- **画面核心要素**：
  1. **环境氛围**：致敬《清明上河图》汴水木拱虹桥，墨云翻滚与斜风骤雨抽打着拱形木桥板，桥畔临水酒肆红灯笼与破损无字酒旗在狂风中猎猎翻卷。
  2. **主体人物**：湿透的桥面中央，衣衫濡湿、左袖缠绕染血白绸的主角以一敌二力抗两名身形魁梧、挥舞重型马弯刀与铁钉战护手的银狼统领，刀戟交击迸出耀眼金芒；酒肆屋檐下，赵祯神色沉凝远眺渐近的禁军火炬长龙。
  3. **情绪顶点**：水墨暴雨的压抑冷灰与拼死护驾的孤勇锋芒把整场汴京长夜之战推向高潮。
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Northern Song Dynasty (1050 AD) 16:9 dramatic storm combat illustration in ink-wash and heavy mineral gongbi style, inspired by Qingming Shanghe Tu's wooden Rainbow Bridge over the surging Bian River. Driving torrential midnight rain lashes the arched timber Hongqiao bridge beside a waterside tavern whose red lantern and torn blank wine pennant whip in the gale. On the slick wet timber planks at the crest of the bridge, the solitary Kaifeng Royal Guard protagonist—left sleeve bound in torn white imperial silk, clothes rain-soaked—fights 1v2 against two towering Western Xia Yipintang Silver-Wolf commanders wielding heavy curved cavalry sabers and studded war gauntlets, steel clashing in brilliant golden sparks against dark slate rain. Beneath the tavern eaves nearby stands Emperor Renzong calmly holding his ground, looking toward distant flickering Imperial Guard torches approaching through the mist. No text.
  ```

---

### 21. `CG-QST-021`：紫宸晓日 · 御马秘卷双恩图

- **关联文件**：[`src/data/quests/sects/kaifengRenzongEscortQuest.ts`](../src/data/quests/sects/kaifengRenzongEscortQuest.ts)
- **目标路径**：`public/assets/quests/renzong_zichen_decree.jpg`
- **画框题跋**：`紫宸晓日 · 御马秘卷双恩`
- **剧情语境**：
  - 血战一夜护驾还朝，晨曦破晓时分，主角随驾入大内正殿【紫宸殿】叙功受赏。
  - 御前双途抉择之高光定格：宋仁宗赵祯手捧明黄敕旨，赐予主角“改授大宋禁军（`SECT-33`）Lv.3 四厢都指挥＋玉津园御赐龙骧骢＋千两白银”，抑或“留任六扇门/开封府（`SECT-17`）＋御赐《葵花残卷》秘匣＋千两白银”两条前程。
- **画面核心要素**：
  1. **环境氛围**：宋代朝殿崇阁气象——清晨金曦穿透朱漆盘龙巨柱倾泻在汉白玉丹墀石阶之上，殿前金屏高矗，包拯、曹皇后、王德用等宋室重臣身着紫绯朝服分列左右（皆按宋制长翅幞头，绝无清式官帽）。
  2. **主体构图（双恩对称呈现）**：丹墀之上，戴平翅展脚黑幞头、着柘黄龙袍的赵祯手持明黄圣旨俯首嘉勉单膝跪领御恩的主角；左右两侧对称陈设两大御赏——左侧为披挂赤绸金镫、骏朗神俊的玉津园五花御马【龙骧骢】，右侧为一具半启的明黄织锦漆木秘匣，匣内红边古武学秘卷泛出幽微晨光。
  3. **礼仪定格**：皇祐朝堂金碧重彩工笔，完成从市井侠警到国家栋梁的双分支宿命升华。
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Northern Song Dynasty (1050 AD) 16:9 majestic court illustration in imperial Song gold-and-vermilion gongbi painting style. Golden dawn sunlight streams cleanly into Zichen Hall between towering vermilion dragon-carved pillars onto carved white marble steps. Seated before the golden screen in dragon-yellow ceremonial Song robes and flat-winged black futou cap, Emperor Song Renzong holds an unfurled imperial yellow silk decree, looking down warmly at the Kaifeng Royal Guard protagonist kneeling respectfully on one knee at the base of the steps. Framing the composition symmetrically: on the left side stands the royal Yujinyuan dapple-white warhorse "Longxiangcong" fitted with crimson silk tassels and gilded stirrups; on the right side sits an imperial yellow-brocade lacquered casket slightly ajar revealing an ancient red-edged martial manual scroll glowing gently in the sunbeams. Regal Song court Officials Bao Zheng, Empress Cao, and Wang Deyong stand in formal purple and scarlet robes flanking the hall. Zero garbled text.
  ```

---

### 22. `CG-QST-022`：昆仑百草炼毒庐 · 丹鼎紫雾冲脉筑基图

- **关联文件**：[`src/data/quests/sects/xingxiuEntryQuest.ts`](../src/data/quests/sects/xingxiuEntryQuest.ts)
- **目标路径**：`public/assets/quests/xingxiu_poison_furnace.jpg`
- **画框题跋**：`昆仑百草炼毒庐丹鼎炸裂 · 紫碧毒雾中苏半夏扶背助引毒气冲脉`
- **剧情语境**：
  - 毫无内功根基的主角身中星宿“三日腐心散”，随押药驼队进入昆仑山【星宿百草炼毒庐】充当试药杂役。
  - 子夜邻炉错投断肠乌头导致青铜毒鼎轰然掀盖炸裂，滚滚紫碧毒烟吞没丹房，引燃主角体内腐心宿毒；危急关头，司药孤女【苏半夏】以湿巾掩口逆着奔逃杂役扑至主角身后，双掌抵住其后心灵台穴，助主角含雪莲须、依残页口诀逆引毒气冲开气海，死中求活修出人生第一缕内功《星宿腐毒行气诀》。
- **画面核心要素**：
  1. **环境氛围**：昆仑雪山岩壁下的北宋木石丹房（百草炼毒庐），竹架悬挂晾晒奇异毒草与蛇蜕，后方一座巨大青铜兽耳丹鼎炉盖掀翻，炉底赤红炭火与翻涌而出的妖异紫碧色毒雾交织弥漫。
  2. **主体人物**：前景蒲团青石上，身穿粗布杂役短衣的年轻主角盘膝紧闭双目、额角青筋微暴、唇角溢出一丝乌黑瘀血，双手结印凝出微弱幽紫气旋；身后十七岁清冷少女药童（苏半夏，身穿淡青灰宋式窄袖襦裙，面覆半透白麻湿巾，竹笠滑落肩后）跪坐紧贴，双掌坚定抵在主角后背心脉处护持。
  3. **光影质感**：毒鼎溢出的诡谲紫翠冷光与炉膛暖橘炭火形成强烈冷暖戏剧张力，彰显“邪窟绝境里一线相护”的宿命感。
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color painting illustration, wide cinematic 16:9 composition. Midnight inside a stone-and-timber poison alchemy pavilion (百草炼毒庐) built against snowy Kunlun cliffs around 1050 AD, wooden racks hung with dried exotic herbs. In the mid-ground, a massive bronze tripod cauldron has burst open, billowing eerie violet and emerald-green poisonous smoke lit from below by glowing red furnace coals. In the foreground, a young Chinese martial artist apprentice in humble coarse grey cloth robes sits cross-legged on stone slabs, brow furrowed in intense pain with a trace of dark blood at his lip, channeling swirling faint purple qi around his hands. Kneeling right behind him, a 17-year-old female herbalist apprentice (Su Banxia, wearing modest pale teal-violet Song-style narrow-sleeve garments, a damp linen veil over her lower face, bamboo hat slung at her back) presses both palms firmly against his upper back to steady his meridians amidst the toxic mist. Authentic Song court painting brushwork, rich mineral pigments, dramatic violet mist and warm ember contrast, no modern elements, no text or characters.
  ```

---

### 23. `CG-QST-023`：昆仑雪山冰蚕寒石窟 · 篝火映冰彻夜渡毒图

- **关联文件**：[`src/data/quests/sects/xingxiuEntryQuest.ts`](../src/data/quests/sects/xingxiuEntryQuest.ts)
- **目标路径**：`public/assets/quests/xingxiu_ice_cave_bandage.jpg`
- **画框题跋**：`昆仑雪山冰蚕寒石窟 · 微火映冰下运功替苏半夏逼出蛇涎毒血`
- **剧情语境**：
  - 主角在紫雾毒泉沼击败外门恶霸乌承山，乌承山败退之际偷发涂满腐骨赤练蛇涎的袖箭射向主角咽喉，苏半夏飞身扑上以左肩替主角挡下毒箭昏迷，星宿同门冷笑劝主角将其弃入毒沼。
  - 主角抱起苏半夏退入幽寂的【雪山冰蚕寒石窟】，在洞口燃起一小簇枯松火，彻夜盘膝运转初成的《星宿腐毒行气诀》替她逼出肩头乌黑毒血，直至眉发结满白霜；黎明苏醒的苏半夏热泪盈眶，解下家传平安药玉相赠，定下生死同命之缘。
- **画面核心要素**：
  1. **环境氛围**：昆仑万仞雪峰高处的天然寒冰石窟内景，洞顶垂挂晶莹冰棱，深处陈列寒玉石槽（隐约可见莹白冰蚕微光），洞口外风雪初霁透入熹微晨光。
  2. **主体人物**：洞内一小堆将熄未熄的枯松枝篝火旁，身穿深色粗衣、眉梢发丝凝着白霜的年轻主角脸色苍白却神情专注坚毅，一手扶住少女右肩、一掌运起微光抵在少女包扎渗血的左肩锁骨伤处逼出几滴乌黑毒血；半倚在石壁干草上的十七岁清丽少女（苏半夏，淡紫滚边素衣，乌发微散）刚刚苏醒，眼眶泛红、目光温柔动容地凝视着主角，手中握着一枚红绳古玉欲递向他掌心。
  3. **冷暖意境**：万年玄冰的澄澈幽蓝与小小松火的橘黄暖光交相辉映，极致烘托“至寒邪派中唯此一点真心滚烫”的武侠浪漫。
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color painting illustration, wide cinematic 16:9 composition. Dawn inside a crystalline high-altitude ice cavern (雪山冰蚕寒石窟) in the Kunlun Mountains around 1050 AD, translucent icicles hanging from rock ceilings, carved frost-covered stone troughs glowing softly in the background, pale morning snow-light at the cave mouth. Beside a small flickering pine-branch campfire in the foreground, a pale, frost-browed young Chinese martial artist in dark coarse robes channels gentle qi with his palm to draw out dark venom from a bandaged left-shoulder wound of a 17-year-old wuxia maiden (Su Banxia, dressed in pale lavender-trimmed Song robes, refined features, eyes glistening with moved emotion). Just awakening against dry straw and fur pelts, she gazes tenderly at him while offering a small antique jade pendant on a red cord into his hand. Poetic contrast between icy glacial blues and intimate warm firelight, authentic Song court painting brushwork, mineral pigments, deeply emotional wuxia romance, no modern elements, no text or characters.
  ```

---

### 24. `CG-QST-024`：延安番坊秘厅 · 丝竹漫天拜星宿老仙图

- **关联文件**：[`src/data/quests/sects/xingxiuEntryQuest.ts`](../src/data/quests/sects/xingxiuEntryQuest.ts)
- **目标路径**：`public/assets/quests/xingxiu_ding_chunqiu_audience.jpg`
- **画框题跋**：`延安番坊秘厅丝竹喧天 · 鹤发童颜星宿老仙高坐受献`
- **剧情语境**：
  - 主角与苏半夏识破大师兄【摘星子】在紫檀锦盒中暗掺臭秽散借刀杀人的毒计，暗换真雪莲冰蚕香饼后重返延安府【塞上番马黑市 · 番坊正市奇货堂】秘厅面圣。
  - 红毯紫烟、二十余名紫衣门徒吹笛敲钹震耳欲聋；鹤发童颜、银髯垂胸、面如重枣手摇白羽扇的星宿老怪【丁春秋】高坐虎皮软榻之上抚须受献，主角从容揭开紫檀锦盒清香满室，榻侧准备看好戏的摘星子顿时脸色铁青。
- **画面核心要素**：
  1. **环境氛围**：北宋延安府番坊地下奇货堂奢华诡异的西域风秘厅，地面铺设波斯高昌大红织金羊毛毯，四隅青铜兽炉吐出袅袅紫烟，梁柱悬垂绛紫帷幔。
  2. **主体人物**：正中高台虎皮软榻上，年近五旬却鹤发童颜、红光满面、长长银白美髯垂至胸口、身披华贵紫金道袍的宗师老者（丁春秋）右手轻摇洁白鹅毛扇，正抚须开怀大笑；榻侧侍立一名瘦高阴鸷、戴乌金护爪的青年大师兄（摘星子），正神色惊愕难堪地死死盯着堂下；前景中央，年轻主角单膝躬身，双手高举一只敞开的雕花紫檀锦盒，盒中升起一缕莹白清冽的雪莲寒香。
  3. **群像烘托**：大堂左右两侧分列十余名身穿紫衣的星宿派门徒，正卖力敲击黄铜铙钹、吹奏竹笛、拍打腰鼓，将星宿派“仙气皮囊下包裹荒诞与杀机”的独特门风刻画得淋漓尽致。
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color painting illustration, wide cinematic 16:9 composition. Inside a lavish, eerie underground Western-Regions merchant hall (延安番坊秘厅) around 1050 AD, draped in deep purple silk curtains and Persian crimson carpets with bronze censers emitting curling violet incense smoke. High on a tiger-skin dais at the center sits Ding Chunqiu (the Old Immortal of Xingxiu: white hair, youthful ruddy crimson complexion, long flowing silver beard over his chest, sumptuous purple Taoist robes, holding a white goose-feather fan with a pleased arrogant laugh). Standing beside the dais, a tall gaunt sinister senior disciple (Zhaixingzi, dark iron claws on his fingers) looks shocked and mortified. In the foreground below, a composed young martial artist protagonist bows respectfully while presenting an open carved sandalwood box releasing a pure wisp of silvery frost-lotus fragrance. Lining both sides of the hall, purple-robed Xingxiu disciples enthusiastically clash brass cymbals, blow flutes, and beat hand drums. Authentic Song dynasty court painting style, rich mineral pigments, theatrical and sinister wuxia sect atmosphere, no modern elements, blank banners with no text or characters.
  ```

---

### 25. `CG-QST-025`：泰山十八盘风雪云梯 · 布衣少年挑泉喋血登阶图

- **关联文件**：[`src/data/quests/sects/taishanEntryQuest.ts`](../src/data/quests/sects/taishanEntryQuest.ts)
- **目标路径**：`public/assets/quests/taishan_18pan_buckets.jpg`
- **画框题跋**：`泰山十八盘风雪千级云梯 · 布衣少年无内功挑泉喋血登升仙坊`
- **剧情语境**：
  - 主角尚无半缕内家真气，携天松道人所赐木牌与俗家同道【鲁苍岳】同至泰山十八盘，传功师叔【单天门】横黑铁重剑考校根骨意志，命二人各挑百斤山泉直登一千六百三十级云梯石阶，水不得漫过桶内朱砂红线。
  - 风雪陡急，石阶几近垂立，主角单薄布衣肩头被桑木扁担磨破渗血，仍咬牙一步一印稳控水桶，并伸手扶助踉跄欲坠的鲁苍岳，高台风口处单天门拄黑铁重剑俯视动容。
- **画面核心要素**：
  1. **环境氛围**：东岳泰山紧十八盘险峻夹峙的万仞峭壁，近乎七十度陡立的千级白石云梯直插迷蒙风雪云海，两侧奇松挂霜。
  2. **主体人物**：前景石阶上，身穿朴素粗布衣衫的年轻主角双肩压着弯曲桑木扁担，肩头布料磨损渗出醒目殷红血迹，却目光如炬、腰马沉稳，扁担两端箍铜柏木水桶内清泉平稳不洒；他腾出一手稳稳托住身旁青衫书生同伴（鲁苍岳）倾斜的桶绳。
  3. **高处呼应**：云梯尽头高耸的宋式石坊（升仙坊）前，浓眉虬髯的魁梧道人（单天门）双手拄着一口宽厚乌黑的无锋黑铁重剑迎风而立，神色由冷厉转为暗自震撼。
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color painting illustration, wide cinematic 16:9 composition. The perilously steep Eighteen Bends (泰山十八盘) stone stairway of Mount Tai around 1050 AD, nearly vertical ancient stone steps cutting between towering jagged cliffs amidst swirling spring snow and mountain mist. In the foreground on the steep steps, a determined young martial artist in plain coarse cloth robes carries a heavy wooden shoulder pole with two full cedar water buckets, crimson bloodstains seeping through the worn cloth on his shoulder from sheer mortal exertion, yet keeping the water steady while extending one hand to steady a stumbling young scholar-disciple in青衫 beside him. High above at a weathered Song-style stone archway (升仙坊), a burly bearded Taoist master leans on a massive black iron heavy greatsword, watching with silent awe. Authentic Song dynasty landscape brushwork (Li Cheng and Fan Kuan style cliffs and pines), mineral pigments, dramatic verticality, no modern elements, blank stone archway with no text or characters.
  ```

---

### 26. `CG-QST-026`：东岳道院苍松石坪 · 晨雾古松引气破茧图

- **关联文件**：[`src/data/quests/sects/taishanEntryQuest.ts`](../src/data/quests/sects/taishanEntryQuest.ts)
- **目标路径**：`public/assets/quests/taishan_pine_neigong.jpg`
- **画框题跋**：`东岳道院苍松石坪 · 晨雾古松下初运《泰山松风养气诀》引气破茧`
- **剧情语境**：
  - 主角于观云亭暗夜机警撞钟护山立功，次日清晨获执法长老【天柏道人】破例传授泰山筑基内功《泰山松风养气诀》与《泰山剑法（筑基篇）》，并赐《武馆三才铁剑》。
  - 千年桧柏与晨雾松涛间，主角盘膝闭目引第一缕东岳松风清气贯入丹田，奇经八脉初次豁然贯通，正式褪去白丁凡躯迈入武林门径。
- **画面核心要素**：
  1. **环境氛围**：北宋泰山半腰古朴庄严的道教庭院（东岳道院苍松石坪），汉代古柏虬枝苍劲，晨曦穿透薄雾洒在青石板与碑廊黛瓦之上，松针随清风微旋。
  2. **主体人物**：石坪中央，年轻主角盘膝端坐、五心朝天，膝前青石上横放一柄朴实端正的三尺生铁长剑（三才铁剑）；主角周身萦绕着淡青与暖白交织的温润松风气旋，松针在气流旁轻盈悬浮。
  3. **配角见证**：后方宋式道殿丹墀石阶上，面容冷峻威严的铁灰道袍执法长老（天柏道人）背手肃立颔首，廊柱旁年轻同门（鲁苍岳）与女道童（建蓉）欣喜注视。
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color painting illustration, wide cinematic 16:9 composition. Peaceful dawn inside an ancient Northern Song Taoist courtyard on Mount Tai (东岳道院苍松石坪) around 1050 AD, framed by millennial gnarled pine and cypress trees, stone steles, and mist-veiled timber halls. In the center of the flagstones, a young martial artist sits cross-legged in meditation with a plain iron straight sword resting horizontally on the stone before his knees; subtle translucent jade-white pine-wind qi currents and floating pine needles gently swirl around him as he awakens his inner energy for the first time. On the stone terrace steps in the background, a stern grey-robed Taoist elder watches approvingly alongside a young male lay disciple and a female Taoist acolyte. Authentic Song court painting aesthetics, serene mineral greens and morning gold light, no modern elements, blank plaques with no text or characters.
  ```

---

### 27. `CG-QST-027`：玉皇顶古封禅台 · 沧海初旭授袍赐剑图

- **关联文件**：[`src/data/quests/sects/taishanEntryQuest.ts`](../src/data/quests/sects/taishanEntryQuest.ts)
- **目标路径**：`public/assets/quests/taishan_yuhuang_sunrise.jpg`
- **画框题跋**：`玉皇顶汉白玉古封禅台 · 沧海初旭下东灵道长褚玄机率三长老授袍赐剑`
- **剧情语境**：
  - 破获黑风寨盗取《东封七宿青铜算筹》大案后，主角寅夜登临泰山极顶，于秦汉石晷前对答掌门东灵道长【褚玄机】日影算理与本心三问。
  - 卯初景阳钟鸣，沧海红日跃出万顷云涛，褚玄机携单天门、天松道人、天柏道人及同门鲁苍岳、建蓉，于汉白玉封禅古坛为主角披上青灰道袍、授剑录册，正式拜入五岳独尊泰山派。
- **画面核心要素**：
  1. **环境氛围**：东岳泰山最高峰玉皇顶汉白玉古封禅台，坛边矗立秦汉无字古碑与青石日晷；脚下是浩瀚无际的翻涌云海，东方天际一轮壮丽赤金朝阳破云而出，万道金霞铺满山巅。
  2. **主体人物**：封禅坛中央，仙风道骨、身披素白鹤氅的白须老掌门（褚玄机）手执竹算筹，正庄重地将一件泰山派青灰道袍与长剑授向单膝恭拜的年轻主角。
  3. **群像仪轨**：左右分立背负黑铁重剑的魁梧道人（单天门）、持拂尘的儒雅道长（天松道人）与冷面执法道长（天柏道人），丹墀下年轻男弟子（鲁苍岳）与捧木盘的女道童（建蓉）含笑观礼，气势恢宏神圣。
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color painting (青绿重彩工笔), wide cinematic 16:9 composition. A magnificent sunrise investiture ceremony atop the White Jade Fengshan Altar at Yuhuang Summit of Mount Tai (泰山玉皇顶封禅台) around 1050 AD, high above a vast boundless sea of churning golden clouds as a radiant crimson-gold sun breaks over the eastern horizon. Beside an ancient wordless stone stele and stone sundial, a venerable white-bearded Taoist grandmaster in crane-white robes (Chu Xuanji) solemnly bestows a slate-blue Taoist robe and straight sword upon a kneeling young martial artist protagonist. Flanking the altar stand three distinct Taoist elders (one burly with a black iron greatsword on his back, one refined holding a horsetail whisk, one stern in iron-grey robes), while a young male disciple and female acolyte holding a lacquer tray watch joyfully below. Grand Wang Ximeng and Song imperial academy mineral blue-green and gold palette, awe-inspiring wuxia majesty, no modern elements, blank stele and banners with no text or characters.
  ```

---

### 28. `CG-QST-028`：成都万里桥头 · 锦江春雨共油伞图

- **关联文件**：[`src/data/quests/sects/emeiEntryQuest.ts`](../src/data/quests/sects/emeiEntryQuest.ts)
- **目标路径**：`public/assets/quests/emei_wanli_rain_umbrella.jpg`
- **画框题跋**：`成都万里桥头 · 锦江春雨油伞护药篓`
- **剧情语境**：
  - 成都府锦江万里桥畔春雨潇潇，巴蜀老药农遭青城派外围恶徒冲撞跌倒，进献峨眉的灵药竹篓倾覆于泥水之中；身无半点内功根基的主角不顾湿冷泥浆，蹲身护住老药农与散落的川芎药草。
  - 恰在恶徒欲加羞辱之际，峨眉俗家首席女侠「蜀道飞燕」【苏梦清】以未出鞘窄剑挑翻恶徒，将一柄桐油竹骨伞斜斜撑在主角头顶，遮去漫天细雨，两人自此结下蜀水前缘。
- **画面核心要素**：
  1. **环境氛围**：公元 1050 年北宋成都府锦江万里桥畔，春雨如丝、薄雾笼江，远处可见红墙竹影、宋式飞桥茶肆红灯笼与锦江乌篷船。
  2. **主体人物（兼顾男女主角代入）**：石桥湿滑青石阶前，束发素色布衣的年轻主角采用微侧背影蹲身视角（眉宇清朗中性，男女少侠代入皆自然），正将倾倒的竹编药篓与白发老药农护在身后；其身侧半步，年方二十八岁、英姿飒爽的峨眉女侠（苏梦清，淡青束袖劲装披素纱雨帔，腰悬窄刃长剑与分水双刺）左手执剑鞘自然垂落，右手举起一把古朴桐油竹骨雨伞倾向主角上方，垂眸含笑相视。
  3. **前景与细节**：伞沿晶莹雨珠串落，桥面青苔湿润映出茶楼微暖灯影，青石上散落数株带露川芎草药。
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color painting illustration, wide cinematic 16:9 composition. Misty spring rain at Wanli Stone Bridge over the Jinjiang River in Chengdu around 1050 AD, with lush green bamboo, Song-style timber teahouses glowing with warm red lanterns, and wooden boats in soft river fog. On the wet flagstone bridge steps in the foreground, a young martial traveler in plain neat cloth robes with tied black hair (seen from a graceful three-quarter back angle, gender-neutral youthful silhouette) kneels to shield an elderly herbalist farmer and a spilled bamboo herb basket from the mud. Standing gracefully beside them, a spirited 28-year-old Emei swordswoman (Su Mengqing, wearing light celadon-cyan martial attire, waist-sheathed narrow sword, calm bright eyes) holds a traditional oiled-paper bamboo umbrella tilted over the young traveler, raindrops glistening along the umbrella rim. Poetic Song court painting brushwork, mineral pigments, tender wuxia encounter atmosphere, no modern elements, blank banners and lanterns with no text or characters.
  ```

---

### 29. `CG-QST-029`：峨眉洗象灵池 · 澄月松涛白猿演剑图

- **关联文件**：[`src/data/quests/sects/emeiEntryQuest.ts`](../src/data/quests/sects/emeiEntryQuest.ts)
- **目标路径**：`public/assets/quests/emei_xixiang_moon_ape.jpg`
- **画框题跋**：`峨眉洗象灵池 · 澄月松涛共观白猿折竹`
- **剧情语境**：
  - 主角在万年寺历经三日担水抄经苦役并初成《峨眉吐纳术》第一缕丹田清气后，随【苏梦清】夜登峨眉山腰洗象池。
  - 皓月当空，山间通灵老白猿跃上临渊古松折竹演剑；苏梦清立于六角澄月池畔，轻引主角执竹枝的手腕，借松风月影传授《分水峨眉刺》旋腕锁穴之妙。
- **画面核心要素**：
  1. **环境氛围**：峨眉山腰洗象池绝壁月夜，一轮皎洁满月高悬苍穹，六角形青石古池倒映冷月清辉，四周修竹幽深、飞瀑如银练垂落云壑。
  2. **主体人物与白猿**：右侧临渊虬曲苍松横枝之上，一只毛色胜雪的通灵老白猿单足轻立，手持一截翠竹灵动刺出；左侧池畔青石坪上，淡青劲装的苏梦清立于素衣年轻主角（侧后方修长背影，男女皆宜）身旁半步，抬手轻托主角手腕引导其手中青竹枝顺应月下风势，衣袂随夜风微扬。
  3. **设色意境**：宋代马远、夏圭山月清旷构图结合青绿石青矿物设色，银白月华与幽翠竹影交相辉映，空灵绝尘。
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color painting illustration, wide cinematic 16:9 composition. A serene moonlit night at Xixiang Pond (洗象池) high on Mount Emei around 1050 AD, featuring a hexagonal stone pool reflecting a luminous full moon, ancient cliffside pine trees, misty bamboo groves, and a silver waterfall cascading into clouds. Perched agilely on an overhanging pine branch above the abyss, a wise snow-white mountain ape wields a green bamboo branch like a sword in graceful motion. On the stone terrace beside the moonlit pool, the poised Emei swordswoman Su Mengqing in celadon-blue martial robes stands half a step beside a youthful disciple in simple robes (seen from a subtle three-quarter back view, gender-inclusive silhouette), gently guiding their wrist as they hold a bamboo twig to trace the ape's sword rhythm. Ethereal silver moonlight, rich mineral blues and greens, authentic Song dynasty landscape-and-figure brushwork, no modern elements, no text or characters.
  ```

---

### 30. `CG-QST-030`：峨眉万仞金顶 · 破晓云海佛光问心图

- **关联文件**：[`src/data/quests/sects/emeiEntryQuest.ts`](../src/data/quests/sects/emeiEntryQuest.ts)
- **目标路径**：`public/assets/quests/emei_jinding_buddha_light.jpg`
- **画框题跋**：`峨眉万仞金顶 · 破晓云海七彩宝光问本心`
- **剧情语境**：
  - 破晓时分，主角冒雪登临峨眉万仞金顶睹光台，破获青城弃徒与西夏一品堂暗桩窥山之谋后，迎着初升朝阳见证千里云海之上浮现庄严绚丽的「金顶佛光（普贤宝光）」。
  - 峨眉派掌门「金顶神尼」【云慧师太】立于云海石栏前慈目三问本心，执法首座【静玄师太】与俗家首席【苏梦清】分侍左右，主角于漫天瑞霭金辉中肃立明志，正式拜入峨眉门墙。
- **画面核心要素**：
  1. **环境氛围**：峨眉山万仞金顶绝壁睹光台，脚下无边无际的雪白云海翻涌如涛，破晓红日初升，云海正中折射出一轮神圣柔和的七彩圆光（峨眉宝光/佛光），后方华藏金顶铜殿飞檐覆着薄雪、沐浴晨曦金辉。
  2. **主体人物**：睹光台石栏前，年近六旬、慈眉善目却气度渊渟岳峙的掌门老尼（云慧师太，披素色袈裟、手持紫檀佛珠）面向年轻主角温和问心；其左立着身材高大威严的灰衣铁尼（静玄师太，背负长剑），其右立着英姿清飒、含笑注视主角的淡青衣女侠（苏梦清）；前景素衣年轻主角（端庄背影视角，男女兼容）恭敬拱手行礼。
  3. **气象格调**：北宋青绿泥金重彩山水人物画卷，云海翻腾、金光万丈，融佛门庄严与剑派清逸于一炉。
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color painting illustration with subtle gold-leaf accents, wide cinematic 16:9 composition. Magnificent dawn atop the Golden Summit (金顶睹光台) of Mount Emei around 1050 AD, overlooking an endless surging sea of white clouds far below. In the glowing morning mist over the cloud sea appears the sacred circular rainbow halo of Emei Buddha's Light (佛光宝光), while snow-dusted Song-style bronze temple eaves gleam warmly behind. On the cliffside stone terrace, the venerable Emei Abbess (Yunhui Shitai, serene elderly Buddhist nun in dignified saffron-grey monastic robes holding prayer beads) stands before the balustrade, flanked by a tall stern senior nun carrying a sword on her back (Jingxuan Shitai) and the graceful celadon-robed swordswoman (Su Mengqing). Facing them in the foreground from a respectful three-quarter back view (gender-neutral youthful martial traveler in neat robes), the protagonist bows with clasped hands in solemn oath. Grand Northern Song court painting aesthetics, mineral pigments, awe-inspiring spiritual wuxia atmosphere, no modern elements, no text or characters.
  ```

---

### 31. `CG-QST-031`：成都青羊道宫 · 春雨铜羊初逢小师姐图

- **关联文件**：[`src/data/quests/sects/qingchengEntryQuest.ts`](../src/data/quests/sects/qingchengEntryQuest.ts)
- **目标路径**：`public/assets/quests/qingcheng_qingyang_rain.jpg`
- **画框题跋**：`成都府青羊道宫 · 春雨铜羊初逢小师姐沈清岚`
- **剧情语境**：
  - 皇祐二年暮春细雨如酥，无门无派的年轻主角步入成都府青羊道宫听道避雨，于古朴神秘的独角青铜羊香炉侧，偶遇下山抄经的青城外院女冠小师姐【沈清岚】。
  - 两名跋扈的川东盐枭撞翻竹篓欲讹诈银两，主角挺身解围，沈清岚怀抱油纸包裹的七弦琴与道经，在烟雨檐廊下敛衽稽首致谢，腰间一枚青城松果挂坠随风轻晃。
- **画面核心要素**：
  1. **环境氛围**：北宋成都府青羊道宫重檐回廊，春雨如丝飘落青石阶，院中一尊古意盎然的宋铸独角青铜羊立于汉白玉须弥座上，三足香炉青烟袅袅，红墙翠竹湿润清幽。
  2. **主体人物**：廊下右侧，年约十九岁、气质温润清丽却眉间微藏心事的青城女道小师姐（沈清岚），身着淡青素白交领宋式道袍、乌发挽木簪道髻、腰悬松果木雕挂坠，怀抱油纸琴囊，正向左侧身穿朴素布衣的年轻少侠主角微微笑着稽首行道家礼。
  3. **细节烘托**：石阶旁散落两卷竹简道经与青竹书篓，檐角铜风铃微斜，尽显蜀中烟雨道观的诗意初遇。
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color painting illustration, wide cinematic 16:9 composition. A misty spring rain afternoon at Qingyang Taoist Palace (成都青羊道宫) in Chengdu around 1050 AD. Under a carved timber temple corridor overlooking wet flagstones and lush green bamboo, an ancient mystical one-horned bronze goat statue (独角铜羊) stands beside a smoking bronze incense burner. A gentle, graceful 19-year-old female Qingcheng Taoist disciple (wearing pale celadon-blue and white Song-style Taoist robes, wooden hairpin topknot, a small carved pine-cone pendant at her waist, holding an oil-paper wrapped guqin zither) bows in a polite Taoist salute toward a young wandering martial artist in plain cloth robes who stepped forward to help her pick up scattered bamboo scrolls. Soft misty drizzle, mineral green and indigo pigments, poetic wuxia romance and tranquility, authentic Song court painting brushwork, no modern elements, blank temple plaques with no text or characters.
  ```

---

### 32. `CG-QST-032`：青城上清孤崖 · 云海苍松抚琴悟气图

- **关联文件**：[`src/data/quests/sects/qingchengEntryQuest.ts`](../src/data/quests/sects/qingchengEntryQuest.ts)
- **目标路径**：`public/assets/quests/qingcheng_cliff_qin.jpg`
- **画框题跋**：`上清宫抚琴孤崖 · 云海松涛听琴悟青冥`
- **剧情语境**：
  - 主角历经十日扫阶磨砺，获召登临青城山上清宫【松涛云海抚琴孤崖】拜谒清修一脉剑师【方正】。
  - 万丈云海翻涌如雪，方正盘坐绝壁青石抚奏《松风引》，沈清岚侍立松下泥炉旁煎煮雪水苦丁茶，尚无内功根基的主角手执桃木剑立于崖畔，在琴音与松涛共鸣中初次感悟道门“藏锋护道、吐故纳新”之理。
- **画面核心要素**：
  1. **环境氛围**：青城山三十六峰绝壁孤崖，千年古松虬枝斜探入浩瀚翻腾的云海，远山黛青如画（致敬北宋山水巨制《千里江山图》与李成、范宽笔意）。
  2. **主体人物**：绝壁扁平巨石上，两鬓微霜、仙风道骨的中年道家剑师（方正）端坐抚弄七弦古琴；古松下，温婉的青城小师姐（沈清岚）跪坐蒲团照看红泥小火炉上的白瓷茶汤，目光温柔地望向崖边。
  3. **主角动态**：年轻主角身穿素布短衫、手持一柄书院桃木剑立于崖前迎风闭目吐纳，衣袂随松风飘举。
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese blue-and-green gongbi landscape and figure painting (青绿重彩山水人物), wide cinematic 16:9 composition. High atop a sheer cliff terrace on Mount Qingcheng (青城山抚琴孤崖) around 1050 AD, overlooking a vast churning sea of white clouds and distant emerald peaks. Beneath a gnarled ancient cliffside pine tree, a dignified middle-aged Taoist swordmaster with greying temples sits cross-legged on a flat boulder playing a seven-stringed guqin zither. Beside a small clay stove boiling tea on a straw mat, a gentle young female Taoist senior sister in pale cyan robes watches warmly. Near the cliff edge, a young martial artist protagonist in simple cloth attire holds a wooden practice sword, eyes serenely closed, breathing in the mountain mist in harmony with the pine wind. Authentic Song dynasty court painting style, mineral malachite green and azurite blue accents, ethereal Taoist serenity, no modern elements, no text or characters.
  ```

---

### 33. `CG-QST-033`：上清松风主殿 · 银杏丹墀去留抉择图

- **关联文件**：[`src/data/quests/sects/qingchengEntryQuest.ts`](../src/data/quests/sects/qingchengEntryQuest.ts)
- **目标路径**：`public/assets/quests/qingcheng_shangqing_choice.jpg`
- **画框题跋**：`上清松风演剑主殿 · 银杏金阶定拜师或逍遥`
- **剧情语境**：
  - 剑门关生死历劫归来、外门演武既毕，上清松风演剑主殿钟鼓齐鸣，举行三清祖师收徒大典。
  - 掌门【余沧澜】立于丹墀高阶之上，道童手捧折叠齐整的青灰道袍与三尺松风快剑；阶下主角站在门墙内外的一线之间——一步向前便是青城快剑门徒，一步回身则是携《青冥引气诀》笑傲江湖的逍遥散人，侧畔小师姐【沈清岚】屏息凝望。
- **画面核心要素**：
  1. **环境氛围**：宏伟古朴的北宋青城山上清宫重檐绿琉璃瓦主殿广场，两株参天千年古银杏洒下漫天金叶，三足青铜大鼎檀烟直上云霄。
  2. **上下构图张力**：高处石阶正中，气度威严凌厉的青城掌门（余沧澜，深青八卦道袍、背负长剑）负手俯视，左侧阴鸷副掌门（侯沧海）与右侧抱琴长者（方正）分立；一名小道童双手高举木托盘，盘中放着青灰道袍与一柄寒光凛冽的三尺青钢剑。
  3. **前景焦点**：丹墀石阶之下，年轻主角昂首而立，衣衫微振，正与侧方队列前排神色温柔关切的小师姐（沈清岚）目光微触，面临入派或归隐江湖的宿命抉择。
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color painting illustration, wide cinematic 16:9 composition. Grand courtyard before the green-tiled double-eave Shangqing Palace Hall on Mount Qingcheng (青城山上清宫松风殿) around 1050 AD, framed by towering ancient ginkgo trees shedding golden leaves and a giant bronze tripod censer. At the top of the stone steps stands an imposing, sharp-eyed Qingcheng Sect patriarch in dark青八卦 Taoist robes, flanked by a stern deputy master on the left and a benevolent琴-carrying elder on the right; a young acolyte holds a lacquer tray bearing folded grey-cyan Taoist robes and a gleaming steel sword. At the base of the steps in the foreground stands the young martial artist protagonist at a crossroads of destiny, while to the side a gentle female Taoist senior sister in celadon robes gazes at him with quiet emotion. Rich mineral pigments, dramatic architectural depth, authentic 1050 AD Song dynasty aesthetics, no modern elements, blank plaques and banners with no text or characters.
  ```

---

### 34. `CG-QST-034`：八百里洞庭烟波 · 五指擎天连环水寨图

- **关联文件**：[`src/data/quests/sects/tiezhangEntryQuest.ts`](../src/data/quests/sects/tiezhangEntryQuest.ts)
- **目标路径**：`public/assets/quests/tiezhang_five_fingers_mist.jpg`
- **画框题跋**：`八百里洞庭烟波 · 五指擎天连环水寨`
- **剧情语境**：
  - 主角于襄阳汉水大码头无武护弱，结识铁掌帮铜桨舵主【焦木】与精锐女香主【屠芳云】，获赐五指黑铁木令南下洞庭。
  - 暮色苍茫之际，屠芳云立于乌篷快船船头执橹破开浩渺烟波，前方云雾豁然洞开——五座奇险陡峭如巨掌擎天的青绿险峰拔湖而起，山脚水面百艘宋代车船楼船铁索连环成寨，黑红旌旗迎风猎猎，尽显荆湘第一霸帮的枭雄气象。
- **画面核心要素**：
  1. **环境氛围**：参考北宋董源、巨然与李唐山水气韵，八百里洞庭湖暮霭烟波浩渺，远景五座如五指并拢擎向苍穹的险峻石峰矗立云涛，峰间飞瀑悬练、黑石总堂隐现。
  2. **水寨奇观**：中景山麓湖湾处，数十艘宋代木构战船与望楼栈桥以粗铁索相连成水陆连环大寨，渔火与松脂火把初燃，纯色黑红战旗迎着湖风翻卷（旗面严禁出现任何文字）。
  3. **前景人物**：近景芦苇水巷冲出一叶轻捷乌篷快舟，船头劲装束袖、腰悬窄剑的飒爽女香主（屠芳云）单手执木橹破浪引航，布衣年轻主角立于船舱前昂首远眺五指奇峰，老舵主（焦木）抱百斤熟铜船桨坐镇船尾。
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi and monumental blue-green landscape ink-and-color painting, wide cinematic 16:9 composition. Vast misty Dongting Lake at dusk around 1050 AD: rising dramatically out of the boundless silver-jade waters and rolling lake mist stands Five-Finger Peak (洞庭铁掌峰), five colossal craggy mountain peaks shaped like a giant open hand reaching into the twilight clouds, with cliffside waterfalls and dark stone fortress halls high on the ridges. At the base of the peaks, dozens of Northern Song wooden warships and watchtowers are linked by iron chains into a formidable water fortress, lit by warm glowing torches and fluttering blank black-and-crimson banners. In the foreground emerging from misty reed marshes, a swift wooden skiff cuts through the waves: a poised female martial artist in dark fitted attire with a sword at her waist steers at the bow, a young traveler in humble cloth robes gazes up in awe from mid-boat, and a burly veteran boatman sits sternly with a massive bronze oar. Authentic Song court painting brushwork, mineral azurite and malachite pigments, majestic wuxia atmosphere, no modern elements, blank flags with no text or characters.
  ```

---

### 35. `CG-QST-035`：铁掌峰百斤铁沙场 · 赤砂沸鼎淬凡掌图

- **关联文件**：[`src/data/quests/sects/tiezhangEntryQuest.ts`](../src/data/quests/sects/tiezhangEntryQuest.ts)
- **目标路径**：`public/assets/quests/tiezhang_red_sand_cauldron.jpg`
- **画框题跋**：`铁掌峰百斤铁沙场 · 赤砂沸鼎血肉淬心`
- **剧情语境**：
  - 主角尚无半分内家真气护体，于夜深人静时登临第一指峰【前坪百斤铁沙场】接受入门筑基最酷烈的考验——赤手翻炒混有辰州朱砂与五溪草药的滚烫铁砂。
  - 三口巨型生铁砂鼎炉火熊熊、赤砂翻滚腾起灼热白烟，主角咬紧牙关将一双血肉凡掌深深插入沸砂之中，额角青筋暴起、汗珠滴入铁砂瞬间化作白雾；旁侧老舵主【焦木】拄百斤熟铜桨凝目督训，女香主【屠芳云】手捧白麻伤药布巾悄然伫立鼎畔关切注视，五溪苗卫【沈平威】在炉侧添入秘草。
- **画面核心要素**：
  1. **环境氛围**：夜色笼罩的洞庭铁掌峰黑石演武前坪，悬崖外夜雾与湖光微茫，坪上松脂火把与炭炉将四周映成炽烈暗金与赤红。
  2. **主体人物（核心张力）**：画面正中一口三足大铁鼎下柴炭通红，鼎内乌黑透红的铁砂与药叶翻滚冒烟；身穿汗湿粗布短褐的年轻主角扎稳马步，双手十指深深插进滚烫赤砂中奋力翻搅，神情剧痛却目光如铁。
  3. **缘分群像**：铁鼎右侧，虬髯魁梧的老舵主（焦木）双手按着立地的百斤熟铜大桨，神色冷峻中带着震动；铁鼎左侧半步后，干练温婉的黑衣女香主（屠芳云）手托药钵与麻布绷带，微蹙蛾眉紧张注视主角双掌；后方戴银环头巾的湘西苗家老药师（沈平威）正持木勺撒入草药。
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color painting illustration, wide cinematic 16:9 composition. Nighttime at the rugged black-stone Iron Sand Training Ground high on Five-Finger Peak overlooking misty Dongting Lake around 1050 AD, illuminated by roaring charcoal fires and pine torches. At the center stands a massive three-legged cast-iron cauldron over glowing red coals, filled with scorching dark-crimson iron sand and medicinal herbs emitting wisps of hot steam. A young uninitiated martial artist in sweat-drenched coarse cloth robes roots his stance and plunges both bare hands deep into the boiling hot iron sand, jaw clenched and brow glistening with sweat in fierce determination. To the right, a grizzled muscular veteran boatman-master leans on an upright heavy bronze boat oar watching with stern respect; to the left, a sharp-featured female martial artist in dark indigo-and-crimson trim attire holds a clay medicine bowl and clean linen wraps, watching his hands with quiet concern; in the background, an older Miao herbalist wearing silver earrings tends a smaller药炉. Intense warm firelight against cool indigo mountain night, authentic Song dynasty brushwork, rich mineral pigments, visceral martial arts tempering mood, no modern elements, no text or characters.
  ```

---

### 36. `CG-QST-036`：雁门关外乱石绝壁 · 少年布衣横木杖护孤图

- **关联文件**：[`src/data/quests/sects/wutaiEntryQuest.ts`](../src/data/quests/sects/wutaiEntryQuest.ts)
- **目标路径**：`public/assets/quests/wutai_yanmen_pass.jpg`
- **画框题跋**：`雁门关外乱石绝壁 · 少年布衣横木杖死守石窟孤雏`
- **剧情语境**：
  - 主角尚未习得内功武学，为一介白身布衣少年，奉五台山清凉寺知客首座之托冒雪驰赴雁门关报信，于乱石绝壁幽谷石室中寻获重伤的河东老铁匠石百炼与偷偷跟来的七岁遗孤小石锁。
  - 暴风雪夜契丹搜山斥候循迹杀至，石室洞口仅容一人通行。毫无真气傍身的主角毅然拾起一根白蜡木杆横身堵死洞口，以血肉凡躯死守三合，为身后孤雏与伤者撑开一线生机。
- **画面核心要素**：
  1. **环境氛围**：公元 1050 年北宋雁门关外险峻乱石绝壁与狭窄山窟入口，漫天鹅毛暴雪随朔风狂卷，远处群峰如铁，高处山脊隐约可见一星驰援武僧的火把微光。
  2. **主体人物**：画面中央偏左的石窟狭口前，身穿单薄朴素灰褐粗布衣、发束布巾、肩头覆满积雪的年轻主角双足死死钉入雪泥，双手紧握一根无刃白蜡木齐眉杆横挡身前，目光决绝无畏；其身后微弱炭火映照的石洞内，七岁男童（小石锁）正紧紧抱住重伤白发老铁匠的肩膀。
  3. **对峙张力**：前景右侧风雪暗影中，两名披狼皮护肩与契丹铁札甲、手持弯刀的辽国精锐斥候踏雪逼近，冷冽刀光与洞口微弱暖火形成强烈冷暖戏剧张力。
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color painting illustration, wide cinematic 16:9 composition. A fierce blizzard night at the rugged rocky cliffs outside Yanmen Pass (雁门关外乱石绝壁) around 1050 AD, swirling heavy snow and jagged dark crags. At the narrow entrance of a shallow mountain rock cave dimly lit by a dying ember inside, a young Chinese protagonist in thin plain worn cloth robes (NOT monk robes yet, tied dark hair, no armor) stands firm in ankle-deep snow, gripping a simple smooth white-wax wooden staff horizontally with both hands in a desperate protective stance. Behind him inside the cave shadow, a terrified seven-year-old boy clutches a wounded elderly blacksmith. Approaching from the snowy foreground shadows on the right, two Khitan scouts in wolf-fur collars and Liao iron lamellar armor draw curved sabers. Distant tiny torchlight flickers on a far mountain ridge. Authentic Song court painting brushwork, mineral pigments, poignant heroic tension, dramatic warm-cave vs icy-blizzard contrast, no modern elements, no text or characters.
  ```

---

### 37. `CG-QST-037`：五台山清凉寺大雄主殿 · 道清方丈执刀剃度赐号图

- **关联文件**：[`src/data/quests/sects/wutaiEntryQuest.ts`](../src/data/quests/sects/wutaiEntryQuest.ts)
- **目标路径**：`public/assets/quests/wutai_tonsure_ordination.jpg`
- **画框题跋**：`五台山清凉寺大雄主殿 · 道清方丈执刀剃度赐法号`
- **剧情语境**：
  - 雁门关护孤归来，慈济院医僧智光、苦行僧明安、扫雪沙弥善松与开口说话的遗孤小石锁齐聚殿前作证，主角连答方丈三问，证得“执杖止戈、以身护生”之禅心。
  - 晨钟三响，于五台山清凉寺大雄主殿释迦与文殊金身之前，方丈【道清】亲执纯银戒刀为主角剃除三千青丝，摩顶授戒赐入护法【明】字辈法号，授灰布僧袍与五郎八卦棍谱。
- **画面核心要素**：
  1. **环境氛围**：北宋五台山清凉寺宏伟庄严的大雄主殿内景，殿门外五峰残雪沐浴金色晨曦，殿内高耸朱漆梭柱、彩绘斗拱、百盏酥油长明铜灯与袅袅檀烟环绕庄严佛陀与文殊菩萨金身塑像。
  2. **主体人物**：大殿中央莲花蒲团上，年轻主角身着洁白素麻内衫、双掌虔诚合十长跪，几缕断落青丝散于青砖之上；面前白眉长垂、宝相慈威的老方丈（道清，披紫褐百衲袈裟，身侧立着一柄厚重古铜降魔杵）左手温和抚于主角头顶摩顶授戒，右手轻执银光戒刀。
  3. **群像呼应**：大殿两厢，白须慈悲医僧（智光）、九尺魁梧持浑铁禅杖的知客首座（智猛）、披风雪护寺武僧（法严）合十肃立；殿侧年少沙弥（善松）双手捧着叠放整齐的灰麻僧衣与齐眉木棍，身旁七岁孩童（小石锁）仰头凝望，庄严温暖、因果圆满。
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color painting illustration, wide cinematic 16:9 composition. Solemn morning tonsure ordination ceremony inside the grand Mahavira Hall of Qingliang Monastery on Mount Wutai (五台山清凉寺大雄主殿) around 1050 AD. Through open timber lattice doors, snow-capped Wutai peaks glow in golden dawn light; inside, towering Song-style brackets, gilded Buddha and Manjusri statues, brass butter lamps, and curling sandalwood incense smoke create sacred warmth. Kneeling devoutly on a lotus cushion in the center with palms pressed together, a young protagonist in pure white inner linen robes has locks of black hair falling onto the stone floor. Standing before him, the white-browed venerable Abbot Daoqing in patched dark-crimson kasaya gently rests one hand on the youth's head in blessing while holding a silver tonsure razor, a massive bronze vajra pestle standing nearby. Flanking them in respectful anjali are an elderly healer monk, a giant burly monk holding an iron staff, a young novice monk holding folded grey monk robes and a wooden staff, and a small seven-year-old boy watching from the threshold. Authentic Song court painting aesthetics, rich mineral pigments, sacred emotional culmination, no modern elements, blank plaques with no text or characters.
  ```

---

### 38. `CG-QST-038`：洛阳天津酒楼 · 二百五金暗通嵩门图

- **关联文件**：[`src/data/quests/sects/shaolinEntryQuest.ts`](../src/data/quests/sects/shaolinEntryQuest.ts)
- **目标路径**：`public/assets/quests/shaolin_luoyang_bribe.jpg`
- **画框题跋**：`洛水天津酒楼 · 二百五十两纹银托牙人暗通嵩门香火`
- **剧情语境**：
  - 少林山门清规森严，俗家子弟若非身负清白出身、抑或肯在少室山门前苦役一载，寻常人根本无缘入室。主角行至洛阳府【洛水天津酒楼】，结识市井包打听牙人【贾通宝】。
  - 雅座临窗，贾通宝捻须伸掌比出“二百五十两”之数（二百两知客院香火孝敬加五十两往返盘缠），主角郑重将沉甸甸的银锭木匣推过酒案，暗通入寺门路。
- **画面核心要素**：
  1. **环境氛围**：公元 1050 年北宋西京洛阳洛水天津酒楼二层临窗雅座，窗外可见石桥横卧碧绿洛水与垂柳青帆，室内陈设宋式矮背木椅、黑漆长案与青瓷酒壶。
  2. **主体人物**：酒案一侧坐着留两撇八字短须、着褐黄布衣腰系算盘袋的精明市井牙人（贾通宝），正眉开眼笑伸出五指、一手悄悄探向案中敞开的银锭木匣；对面微侧背影的年轻主角（布衣劲装，身形中性干练）按案将一匣整整齐齐的五十两雪白官银推上前去。
  3. **氛围隐喻**：晨光透窗照亮银锭冷辉，将江湖“有钱可使鬼推磨”的世俗烟火气与清修禅林形成辛辣又写实的对比。
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color painting illustration, wide cinematic 16:9 composition. Second-floor private alcove of a riverside tavern in Luoyang around 1050 AD, open lattice wooden windows overlooking stone arch bridges, willow trees, and sailing boats on the Luo River. At a dark lacquered table with a celadon wine ewer and bowls sits a shrewd Song urban broker in ochre-brown plain robes with a slim mustache, smiling slyly while holding up five fingers and reaching toward an open wooden chest gleaming with cast silver ingots. Across from him in the foreground from a three-quarter back view sits a resolute young martial traveler in modest traveling attire pushing the chest of silver forward. Authentic Song dynasty Qingming Shanghe Tu style interior details, rich mineral pigments, warm daylight, no Qing attire, blank tavern banners and wine pennants with no text or characters.
  ```

---

### 39. `CG-QST-039`：嵩山少林大雄宝殿 · 寒暑一载拜入禅林图

- **关联文件**：[`src/data/quests/sects/shaolinEntryQuest.ts`](../src/data/quests/sects/shaolinEntryQuest.ts)
- **目标路径**：`public/assets/quests/shaolin_chore_induction.jpg`
- **画框题跋**：`嵩山少林寺大雄宝殿 · 寒暑一载苦役满期拜受僧衣齐眉棍`
- **剧情语境**：
  - 贫寒立志路线的主角拒绝以金银买路，在少室山门外挑水劈柴、扫雪除阶整整熬满三百六十五个日夜，双手磨出厚茧而心志如铁。
  - 知客禅师【玄净】核验功课簿后引其入【大雄宝殿】，伏虎方丈【玄慈】亲立佛前温言嘉许，颁赐灰麻僧衣、芒鞋与白蜡齐眉棍，正式录为少林外门俗家弟子。
- **画面核心要素**：
  1. **环境氛围**：宋代嵩山少林寺大雄宝殿殿宇庄严，朱漆斗拱廊柱高耸，殿外可见松雪初融与石阶水井轮廓，大殿正中金身古佛香烟袅袅，红烛微明。
  2. **主体人物**：丹墀香案前，慈善威仪的少林方丈（玄慈大师，披暗红旧衲袈裟、面相悲悯厚重）双手捧起一套折叠整齐的灰麻僧衣、草编芒鞋与一根通体莹润的七尺白蜡木齐眉棍；旁侧知客禅师（玄净，灰布僧袍合十微笑）肃立；殿前主角以沉稳背影双手合十屈膝恭接，手掌关节隐约可见一年劳作磨出的厚茧痕迹。
  3. **宋画神韵**：佛殿庄严沉静、暖烛与青灰石砖冷暖相衬，凸显“苦行磨心、水到渠成”的武林禅宗气象。
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color painting illustration, wide cinematic 16:9 composition. Inside the solemn Great Hero Hall of Shaolin Monastery on Mount Song around 1050 AD, soaring vermilion timber pillars, carved Song brackets, rising sandalwood incense smoke, and lingering snow visible on stone steps outside the open temple doors. Before a dimly gleaming golden Buddha statue and bronze censers, the venerable Shaolin Abbot (Xuanci, dignified elder monk in layered crimson-ochre monastic patchwork kasaya) warmly presents folded grey coarse hemp robes, straw sandals, and a smooth white waxwood eyebrow-height quarterstaff. Standing nearby is a grey-robed guest-master monk clasping his palms in approval. In the foreground from a respectful three-quarter back view, the hardy young protagonist with calloused hands kneels slightly to receive the robes and staff. Authentic Song court religious painting brushwork, serene mineral tones, blank temple plaques with no text or characters.
  ```

---

### 40. `CG-QST-040`：汴京西坊演武拳馆 · 杨排风铁箸试棍图

- **关联文件**：[`src/data/quests/sects/tianboBawangQuest.ts`](../src/data/quests/sects/tianboBawangQuest.ts)
- **目标路径**：`public/assets/quests/tianbo_paifeng_iron_rod.jpg`
- **画框题跋**：`汴京西坊演武拳馆 · 杨排风横执烧火铁箸考校三十六路棍`
- **剧情语境**：
  - 皇祐二年汴京西坊演武拳馆外，铁砂桩与三百斤青石锁整齐排列。曾随佘太君出征天门阵的老女将【杨排风】（时年花甲仍腰背笔挺）正守望天波旧宅。
  - 闻主角愿习天波枪法为北疆分忧，杨排风目露赞许却不肯轻放过关，当场随手抄起乌黑沉重的【天波烧火铁箸】，在场中演起三十六路少林烧火棍，考校主角枪棍底子。
- **画面核心要素**：
  1. **环境氛围**：公元 1050 年东京汴梁西坊青砖露天演武拳馆，院内列有练力青石锁、铁砂梅花木桩、兵器木架，远景可见汴梁民居灰瓦檐角与槐树新芽。
  2. **主体人物**：校场中央，年逾五旬却双眸犀利、身手矫健的女统制（杨排风，盘发插铁簪、着利落玄青束袖劲装，外罩半旧铁叶护腰）单足踏定，双手斜横一根三尺余长的乌黑沉铁烧火棍，随手一挑竟将地上数百斤青石锁震起半尺尘埃；前方年轻主角抱拳弓步立定（微侧背影），严阵以待接招。
  3. **动态力量**：铁箸破空隐现凛冽风压与扬起的细沙微尘，写出天波杨府“灶下女将亦能扫平北虏”的豪烈家风。
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color painting illustration, wide cinematic 16:9 composition. Courtyard of a martial arts training hall in western Bianliang (Kaifeng) around 1050 AD, lined with heavy carved stone weight-locks, iron-sand training posts, wooden weapon racks, and Song-style grey-tile courtyard roofs under crisp early-spring light. At the center stands a formidable 55-year-old female military veteran (Yang Paifeng, silver-streaked hair tied firmly in a tight bun, wearing practical dark indigo Song narrow-sleeve martial attire with a weathered leather-and-iron waist guard), gripping a heavy black iron stove-poker quarterstaff with which she effortlessly flicks a massive stone weight-lock off the flagstones in a burst of dust. Facing her in the foreground from a three-quarter back view, a steady young martial artist takes a low spear-fighting stance with bare hands ready to receive her test. Crisp realistic Song brushwork, dynamic grit and weight, zero modern objects, blank banners with no text or characters.
  ```

---

### 41. `CG-QST-041`：五台山清凉石台 · 漫雪破双棍悟回马图

- **关联文件**：[`src/data/quests/sects/tianboBawangQuest.ts`](../src/data/quests/sects/tianboBawangQuest.ts)
- **目标路径**：`public/assets/quests/tianbo_wutai_staff_terrace.jpg`
- **画框题跋**：`五台山杨五郎演棍石台 · 漫天飞雪破双棍顿悟舍身回马意`
- **剧情语境**：
  - 主角携天波铁箸远赴晋北五台山清凉寺【杨五郎演棍石台】，正值鹅毛大雪纷飞。明安大师与清凉护法高僧双棍合击当头劈落，封死主角全部退路。
  - 生死一刹，主角扫清石台青苔下所见的五郎残碑刻痕陡然入心——竟不闪不避拧腰反刺，长枪倒拖一寸回刺棍梢三寸之内，气劲将积雪震开一道深沟，当场顿悟杨家“向死而生”的【舍身回马枪意】。
- **画面核心要素**：
  1. **环境氛围**：晋北五台山苍茫群峰与青翠寒松之间的高耸古石台，后方可见清凉寺飞雪覆瓦的宋式山门红墙，石台一角半埋积雪的古石碑上隐约可见被枪锋扫去青苔的浅浅刻痕（不出现可读字形）。
  2. **主体人物**：漫天狂卷的雪幕中心，年轻主角左肩微擦僧棍劲风，腰脊如大弓猛然拧转，长枪顺势由腋下反手倒拖回刺，两点枪尖寒星凌厉点止在前方灰袍执棍老僧（明安大师）降魔铜铁棍梢前数寸，劲风将四周脚下积雪激成扇形深沟；另一名护寺武僧在侧收步震愕。
  3. **禅武意境**：冷青雪色山水与破空银枪锐气形成极强冲击，定格“退无可退、便即回马”的瞬间顿悟。
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color landscape-action illustration, wide cinematic 16:9 composition. High snowy stone training terrace outside Qingliang Monastery on Mount Wutai around 1050 AD, jagged winter cliffs, snow-laden pines, an ancient moss-and-snow covered stone monument nearby, and swirling blizzard flakes. In the center of the stone platform, a young spear-fighter pivots dynamically mid-stride, twisting their torso backward to unleash a sudden reverse backhand spear thrust that halts inches from the iron-ringed staff of a shocked senior grey-robed martial monk (Master Ming'an), while a second temple guard monk steps back in astonishment; the sheer spear-qi carves a clean deep furrow through the thick snow across the flagstones. Dynamic snow swirls, Fan Kuan style monumental mountains behind, authentic Song dynasty mineral blue-white and ink brushwork, blank stone stele with no text or characters.
  ```

---

### 42. `CG-QST-042`：雁门关乱石绝壁 · 联手穆桂云破契丹重骑图

- **关联文件**：[`src/data/quests/sects/tianboBawangQuest.ts`](../src/data/quests/sects/tianboBawangQuest.ts)
- **目标路径**：`public/assets/quests/tianbo_yanmen_muguiyun.jpg`
- **画框题跋**：`雁门关外乱石绝壁 · 联手穆桂云大破契丹重骑受赠降龙木令`
- **剧情语境**：
  - 雁门关外乱石绝壁粮道告急，主角于险坡伏击截杀企图劫粮的大辽先锋统领【萧铁古】与契丹铁林重骑百夫长。
  - 作战之中，穆柯寨出身的女将【穆桂云】（`NPC-0253`）披甲挽雕弓执梨花长枪从旁策应死战，主角正面斩落萧铁古破敌重骑，战罢两人在风雪关前并骑收兵，受赠【穆柯降龙木令】。
- **画面核心要素**：
  1. **环境氛围**：塞北雁门关外乱石峭壁与蜿蜒覆雪古栈道，远处关墙雄峙、代州城楼烽燧微烟与战鼓隐现，山坡上散落倾覆的契丹盾牌与战旗。
  2. **主体人物**：左侧风雪高坡之上，英姿飒爽的宋将女侠（穆桂云，身披银线宋式山文细铠、肩披大红斗篷、马鞍挂满羽雕弓囊，手持梨花长枪正扬手收势，脸上带着血渍与豪爽笑意，并将一块雕有盘龙纹的暗褐沉香木令递来）；前景右侧骑在枣红战马上的主角（微侧背影视角）缓缓收枪，马下不远处正倒伏着坠马重甲契丹将领萧铁古与溃散铁骑背影。
  3. **金戈诗意**：大红斗篷与冷白风雪强烈对比，把北疆儿女并肩破虏的炽热战友情怀跃然纸上。
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color battle illustration, wide cinematic 16:9 composition. Rugged snow-dusted boulder pass outside the fortified mountain ramparts of Yanmen Pass around 1050 AD, distant watchtower signal smoke rising into cold slate skies, scattered iron-studded Khitan shields and broken banners on the snowy trail. On a rocky slope in the center-left, heroic Song female commander Mu Guiyun—clad in gleaming Song lamellar chest armor over crimson cloak, pheasant plumes omitted for realistic Song helmet, bow quiver at her saddle and pearl-flower spear in one hand—reins in her warhorse with sweat and snow on her cheek, handing over a carved dragon-wood command tally to the mounted young protagonist (seen from a heroic three-quarter back view lowering a long steel spear). Below on the snowy pass, fallen heavy-armored Khitan cavalry vanguard commanders lie defeated as enemy riders retreat northward. Authentic Song military armor, dramatic red-on-snow contrast, blank banners with no text or characters.
  ```

---

### 43. `CG-QST-043`：延安鄜延边军营 · 随铜面狄青回马破铁鹞子图

- **关联文件**：[`src/data/quests/sects/tianboBawangQuest.ts`](../src/data/quests/sects/tianboBawangQuest.ts)
- **目标路径**：`public/assets/quests/tianbo_yanan_diqing_cavalry.jpg`
- **画框题跋**：`延安鄜延边军大营 · 随铜面狄青并骑死战绝命回马枪破铁鹞子`
- **剧情语境**：
  - 延安府鄜延边军前线遭西夏精锐重骑“铁鹞子”连环强袭，主角随披发戴青铜面具、执大刀的【狄青】（`NPC-0031`）迎战敌酋【漫咩】与【努儿海】。
  - 座下战马被逼入黄土沟壑之际，主角于生死电光火石间将五台山与雁门关所悟尽数融为一击——骤然伏鞍倒拖长枪反手刺出一记【绝命回马枪】，一枪击碎努儿海护心铁镜，震慑西夏铁骑。
- **画面核心要素**：
  1. **环境氛围**：陕北延安府鄜延黄土沟壑与边军大营木栅壕堑，黄沙大风裹挟着狼烟与飞雪席卷荒原，四周可见黑甲连环的西夏铁鹞子重骑轮廓。
  2. **主体人物**：画面中央烈马狂奔扬蹄溅起黄沙尘浪：年轻主角（背微低俯伏马背）拧腰回眸，反手将一杆长枪由右肋如流星倒刺而出，枪尖爆出璀璨银星，正正贯破背后紧追扑砍而来的西夏一品堂强将（努儿海，戴尖顶毡铁盔、挥血色弯刀）胸前轰然炸裂的青铜护心铁镜；身侧数丈外，披散长发、面戴青铜鬼面狰狞甲冑、身披大宋战甲的狄青正双手挥大刀力劈另一西夏大将漫咩，气势如天神下凡。
  3. **动作爆发**：极致的纵马回身刺击透视张力，堪称北宋边关骑战史诗定格。
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color epic cavalry action painting, wide cinematic 16:9 composition. Wind-swept yellow loess ravines and timber palisades of the Yan'an Fuyan frontier military camp around 1050 AD, dust storms mixing with sparse snow under smoky skies. In dynamic galloping foreground motion, the young martial protagonist leans low along a charging warhorse's neck, twisting back to thrust a long spear in a lightning reverse back-mounted strike (Hui Ma Qiang) whose blazing silver point shatters the bronze chest mirror-plate of a pursuing Western Xia heavy-armored "Iron Hawk" knight swinging a curved saber. Beside them in the mid-ground, legendary Song general Di Qing—unbraided flowing hair beneath a fearsome sculpted bronze battle mask, Song iron-scale armor billowing—slashes back a second heavy Western Xia commander with a broad war dao. Explosive motion, flying sparks and desert dust, authentic 1050 AD Song and Tangut armor, blank war banners with no text or characters.
  ```

---

### 44. `CG-QST-044`：太原天波杨家祠 · 雪霁冬阳亲授霸王枪谱图

- **关联文件**：[`src/data/quests/sects/tianboBawangQuest.ts`](../src/data/quests/sects/tianboBawangQuest.ts)
- **目标路径**：`public/assets/quests/tianbo_ancestral_bawang_spear.jpg`
- **画框题跋**：`太原天波杨家旧祠 · 雪霁冬阳杨文广于令公灵前亲授霸王枪谱`
- **剧情语境**：
  - 经历汴京、五台、雁门、鄜延四重洗礼归来，主角在太原府天波杨家旧祠正院力战【杨文广】五合不败、双枪交错震落梁尘。
  - 雪霁初晴、冬阳照亮太行群峰与宗祠飞檐之际，杨文广于杨令公灵位前郑重捧出金丝锦缎包裹的《杨家霸王枪》秘谱与绣着赤金纹样的【天波忠烈令旗】，杨排风、呼延庆、穆桂云并在廊前微笑见证。
- **画面核心要素**：
  1. **环境氛围**：河东太原天波杨家百年古祠敞亮正堂与雪后初霁的石阶庭院，门外远眺银装素裹如长龙蜿蜒的太行山脉，冬日金阳斜照入祠堂，朱红供案上高烧香烛供奉杨令公与七郎八虎素洁神主牌位（无可读乱码文字）。
  2. **主体人物**：供案前，风度轩昂、身披锦袍罩轻甲的杨家少帅（杨文广，刚收起手中透甲金枪）双手郑重托举着一卷金丝织锦包裹的古老兵书《霸王枪谱》及一面赤金流苏令旗；前景单膝虔诚跪拜的年轻主角（背微挺直如松，男女兼容轮廓）双手高举恭敬接取；祠堂门口左右站着抚掌笑望的老女将杨排风、英姿勃勃的穆桂云与魁梧武将呼延庆，亲兵在一旁抬入几箱闪亮官银赏箱。
  3. **史诗余韵**：雪后初晴的澄澈金光将百年满门忠烈的沧桑悲壮化作薪火永传的温暖明亮。
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color painting illustration, wide cinematic 16:9 composition. Inside the ancestral hall of the Yang Clan in Taiyuan around 1050 AD right after a heavy snowfall has cleared, warm winter sunlight streaming across stone thresholds while snowy Taihang mountain peaks glitter outside the open wooden gates. Before an ancestral altar glowing with tall candles and blank wooden spirit tablets, handsome Song general Yang Wenguang (ceremonial crimson robe beneath light Song scale armor) solemnly presents a golden-brocade wrapped martial manual scroll and a crimson-and-gold command pennant to the kneeling protagonist in the foreground (seen from a respectful three-quarter back view). Watching warmly near the courtyard pillars stand veteran matriarch Yang Paifeng, female general Mu Guiyun, and stalwart general Huyan Qing beside wooden chests of military silver. Reverent imperial Song aesthetics, warm winter gold and crimson mineral tones, zero garbled text on plaques or banners.
  ```

---

### 45. `CG-QST-045`：真定常山宗祠 · 寒夜雨声验龙胆血书图

- **关联文件**：[`src/data/quests/sects/changshanLonglingQuest.ts`](../src/data/quests/sects/changshanLonglingQuest.ts)
- **目标路径**：`public/assets/quests/changshan_blood_letter.jpg`
- **画框题跋**：`真定常山龙胆宗祠 · 冬夜寒雨验悯忠寺铜牌与南牧血书`
- **剧情语境**：
  - 皇祐二年冬末夜雨寒冽，常山演武堂早早落闩，唯宗祠正堂内两盏牛油巨烛照亮汉顺平侯牌位。
  - 掌门【赵括苍】按剑危坐太师椅，真定边军都监【郭逵】玄甲未卸肩头犹带雨珠，演武首座【凌寒】托出紫檀木盘揭开油纸——显露出染着干涸鲜血的幽州悯忠寺莲纹铜牌与半幅血字麻布密报，急遣主角化身无名客北潜析津府销毁辽军《南牧山川策》。
- **画面核心要素**：
  1. **环境氛围**：真定府常山龙胆宗祠青砖古堂冬夜密室，窗外夜雨敲打屋瓦，堂内唯有两支粗如儿臂的牛油红烛摇曳出暖橘冷青交错的光影，后方供桌奉有古代银甲武将画像与顺平侯香案。
  2. **主体人物**：太师椅上按剑危坐的白须瘦劲老掌门（赵括苍，深灰武服面沉如铁）；左侧身披滴水玄黑铁甲、肩甲犹湿的边军武将（郭逵）；右侧演武首座（凌寒，青衫短须）双手捧着紫檀木盘，盘中揭开的油纸上静静放着一枚古铜莲纹圆牌与一截浸透暗红血痕的麻布帛书；前景年轻主角俯首凝视血书，准备领命孤身北行。
  3. **悬疑张力**：幽暗巨烛投射长长壁影，奠定“白沟寒星之下，万事唯无名二字”的暗战基调。
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color painting illustration, wide cinematic 16:9 composition. Midnight council inside an ancient timber ancestral martial hall in Zhending Prefecture around 1050 AD while cold winter rain slashes across dark courtyard eaves visible through lattice doors. Two massive tallow candles flicker before an altar bearing an antique warrior portrait and bronze brazier. Seated solemnly gripping a sheathed sword is white-bearded sect master Zhao Kuocang; standing left in rain-glistening dark iron Song lamellar frontier armor is border commander Guo Kui; standing right is senior instructor Ling Han holding a carved sandalwood tray displaying an oiled-paper parcel with an oxidized bronze lotus token and a bloodstained coarse hemp cloth message. In the foreground from a three-quarter back view, the young protagonist examines the bloodstained relics intently. Chiaroscuro Song candlelight, cold midnight rain tones, zero modern items, zero text or characters on scrolls or plaques.
  ```

---

### 46. `CG-QST-046`：辽南京元帅府 · 焚毁山川策霹雳烟幕突围图

- **关联文件**：[`src/data/quests/sects/changshanLonglingQuest.ts`](../src/data/quests/sects/changshanLonglingQuest.ts)
- **目标路径**：`public/assets/quests/changshan_marshal_smoke_escape.jpg`
- **画框题跋**：`辽南京兵马元帅府 · 焚毁南牧山川策正本借霹雳烟幕突围`
- **剧情语境**：
  - 析津府（辽南京）兵马元帅府签押房暗夜死战，辽南京武林统制【萧远风】的镔铁长枪重如山岳，主角虎口震裂苦苦支撑三合。
  - 千钧一发之际，东侧马厩轰然爆起冲天火柱，三枚裹着硫磺硝石的霹雳烟幕弹撞破窗棂炸开滚滚浓黑烟雾，吞没签押房火盆中化作飞灰的《南牧山川策》正本；郭逵在矮墙外接应两匹乌骓快马，主角且战且退翻墙突围奔向雁门关。
- **画面核心要素**：
  1. **环境氛围**：大辽析津府森严的元帅府高墙院落深夜，远处东侧马厩正腾起赤红烈焰火柱，签押房窗棂木屑四溅破碎，翻卷出遮天蔽日的灰黑浓烟与火星。
  2. **主体人物**：浓烟边缘，虎口渗血、身手矫健的主角一手握紧滴血长枪虚晃一枪，一手甩出霹雳火弹翻跃矮墙；房内破碎窗洞中正映出气急败坏、魁梧披甲举镔铁长枪破烟狂追的契丹强将（萧远风）剪影与化为灰烬飞散的卷轴残片；矮墙外暗巷，身着便衣的郭逵已拉好两匹蓄势待发的乌骓快马急呼策应。
  3. **动作氛围**：火光冲天、黑烟蔽月、飞灰乱舞，将潜行焚图后的生死大逃亡拍出电影级动感。
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color nocturnal action painting, wide cinematic 16:9 composition. Nighttime ambush and escape over the dark brick courtyard wall of the Liao Southern Capital Marshal's Compound in Xijinfu around 1050 AD. In the background, roaring orange flames erupt from the eastern stables while three sulfur thunder-smoke bombs explode through shattered wooden lattice windows, filling the study with thick billowing black smoke and burning scroll ashes. Vaulting backward cleanly over the tiled perimeter wall amidst swirling sparks, the young hero with bloodstained knuckles clutches a long spear while behind the smoke-choked window the furious silhouette of Liao commander Xiao Yuanfeng charges forward with a heavy wrought-iron lance. Below the outer wall in darkness, disguised officer Guo Kui holds two waiting black warhorses ready to gallop west. High-contrast firelight and dark indigo night, authentic Song-Liao architecture, zero modern items, zero text.
  ```

---

### 47. `CG-QST-047`：雁门乱石绝壁 · 孤枪横绝截铁林追骑图

- **关联文件**：[`src/data/quests/sects/changshanLonglingQuest.ts`](../src/data/quests/sects/changshanLonglingQuest.ts)
- **目标路径**：`public/assets/quests/changshan_yanmen_cliff_stand.jpg`
- **画框题跋**：`雁门关外乱石绝壁 · 朔风黄沙横枪死截萧远风铁林追骑`
- **剧情语境**：
  - 经过五百里昼夜狂奔，大宋雁门关烽火台与箭楼火把已近在眼前，然而身后山道黄沙滚滚、雪屑崩飞——萧远风亲率大辽北院铁林重骑在乱石绝壁狭口截断归路。
  - 为了护送身怀《南牧山川策》副本的郭逵与幽州遗老冲入关内，主角独自横枪矗立于窄如羊肠的乱石隘口正中，一人面对如乌云压顶的百战契丹铁林骑兵。
- **画面核心要素**：
  1. **环境氛围**：极度压迫感的狭窄峡谷一线天绝壁，头顶狂风卷起黄沙与残雪，后方高处遥遥可见雁门关灰青城楼垛口与渐次点亮的宋军守军火把，前路则为幽暗陡峭的山道。
  2. **主体人物**：构图采取“一夫当关”的极简孤胆张力——狭口最窄处近景是一个背对关墙、面迎漫天黄沙与数百黑甲敌骑的瘦削孤影（主角双足如钉楔入雪岩、长枪横斜护住咽喉，衣衫破损猎猎飞扬）；正前方十丈开外，左眉一道狰狞长疤直贯耳根、身披乌金双层铁甲的萧远风纵马挺镔铁长枪率黑压压铁林骑军阵如黑浪压顶冲来，双方气势隔空对峙。
  3. **悲壮气魄**：致敬常山先祖“一身是胆”，苍凉塞外山水反衬一人一枪截断千军的气吞山河。
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color heroic standoff painting, wide cinematic 16:9 composition. A perilously narrow rocky gorge pass outside Yanmen Pass around 1050 AD, towering jagged cliffs on both sides while swirling wind whips yellow grit and dry snow through the canyon. Distant behind the hero rise the grey ramparts and lit signal-torches of the Song border fortress. Standing completely alone in the center of the snowy bottleneck trail (seen from behind in dynamic low-angle wide shot), the solitary young spear-fighter plants both feet firmly in the rock, tattered cloak whipping in the gale while bracing a steel spear horizontally. Bearing down just ahead like a dark iron tide is a squadron of heavy-armored Khitan Tielin cavalry led by fierce commander Xiao Yuanfeng—bearing a long scar from left eyebrow to ear—lowering a thick wrought-iron lance. Epic contrast of one defiant upright figure against an overwhelming armored wall, Fan Kuan mountain grandeur, zero text.
  ```

---

### 48. `CG-QST-048`：常山顺平侯祠 · 启紫檀匣授龙胆亮银枪图

- **关联文件**：[`src/data/quests/sects/changshanLonglingQuest.ts`](../src/data/quests/sects/changshanLonglingQuest.ts)
- **目标路径**：`public/assets/quests/changshan_ancestral_silver_spear.jpg`
- **画框题跋**：`常山演武堂顺平侯祠 · 启紫檀枪匣亲授常山龙胆亮银枪`
- **剧情语境**：
  - 焚毁南牧图、绝壁断铁林凯旋归宗，常山演武堂宗祠正堂燃起三牲九礼高香与两列明旺火盆，全堂弟子肃立无声。
  - 掌门【赵括苍】于汉顺平侯赵云神龛前亲启八尺黑漆紫檀长匣，将三棱透骨、寒芒耀眼的镇派神兵【常山龙胆亮银枪】与油布红绸裹封的古本《岳氏沥泉枪前谱》亲授单膝跪受的主角，郭逵、凌寒与神箭白烈山分列见证并佩授举荐官信。
- **画面核心要素**：
  1. **环境氛围**：白昼肃穆清朗的常山演武堂宗祠正殿，高香缭绕，堂中排列十余名整肃观礼的内堂蓝白劲装弟子，正前方供奉着汉将白袍持枪古画神龛与三牲铜鼎。
  2. **主体人物**：神龛青石高阶前，白须掌门赵括苍双手托着刚刚开启的八尺紫檀枪匣与红绸包裹的绢本古谱，匣内【常山龙胆亮银枪】通体如霜雪凝银、三棱枪刃射出一道清冽寒光；主角（单膝虔诚跪拜的挺拔背影）双手平举恭迎；旁侧玄甲边军都监郭逵手捧盖有红蜡大印的举荐信笺、演武首座凌寒与背大弓的老猎户侠客白烈山含笑拱手相贺。
  3. **传承礼仪**：从暗夜血书的压抑到正大光明的宗门传薪，银枪冷芒与火盆红焰共映“白沟寒星，龙胆常山”。
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color ceremony illustration, wide cinematic 16:9 composition. Bright solemn ancestral courtyard hall of Changshan Spear Sect in Zhending around 1050 AD, flanked by rows of disciplined martial disciples in neat indigo-and-white Song training robes beside glowing iron braziers and tall incense burners before a shrine holding a classical painting of an ancient white-robed general. Standing before the shrine steps, elder sect master Zhao Kuocang opens a sleek eight-foot black-lacquered rosewood chest revealing the radiant, frost-bright silver steel blade and shaft of the heirloom Changshan Dragon-Gall Silver Spear alongside a crimson-silk wrapped antique manual scroll. In the foreground, the kneeling protagonist reverently raises both hands to accept the weapon, witnessed proudly by armored officer Guo Kui holding a stamped recommendation letter, instructor Ling Han, and veteran archer Bai Lieshan carrying a recurve horn bow. Crisp ceremonial lighting, lustrous silver and crimson mineral pigments, blank altar plaques with no text.
  ```

---

### 49. `CG-QST-049`：开封府升堂殿 · 包拯夕照亲书密谕遣南查图

- **关联文件**：[`src/data/quests/sects/kaifengMurongQuest1.ts`](../src/data/quests/sects/kaifengMurongQuest1.ts)
- **目标路径**：`public/assets/quests/kf_murong1_bao_secret_decree.jpg`
- **画框题跋**：`开封府衙升堂正殿 · 包拯夕照下亲书十六字素笺密谕遣南查`
- **剧情语境**：
  - 开封府衙升堂正殿夕阳西沉、余晖穿透长廊门扉，将“明镜高悬”高匾映得庄严沉肃。黑脸开封府尹【包拯】屏退闲杂衙役，与师爷【公孙策】及南侠【展昭】密议姑苏慕容氏私通辽夏、盗运军械疑案。
  - 包拯亲提紫毫在无印素笺上写下「暗访姑苏，查实即返；保全其身，切勿打草」十六字密谕，并随同暗银小印亲手交付两年历练沉稳的主角，令其便衣南下姑苏。
- **画面核心要素**：
  1. **环境氛围**：公元 1050 年北宋东京开封府衙升堂正殿，残阳琥珀色余晖斜射入堂内，照亮公案朱漆巨柱、堂侧仪仗肃静木牌（皆留白无字）与后方三口铜铡局部轮廓。
  2. **主体人物**：公案之后，年近五旬、头戴宋制长翅平脚黑幞头、身着紫红绯袍玉带、面色黑沉方正、额微蹙、目光锐利的包拯（包青天）正倾身将刚墨干的折叠素笺与一枚古朴暗银小印递向案前；公案左侧站着青衫儒雅握折扇羽扇的公孙策；右侧站着大红官袍（或四品劲服）、手按巨阙宝剑神色关切的御前带刀护卫展昭；前景主角身穿干练六扇门青玄捕快差服躬身双手敬接。
  3. **庙堂质感**：皇祐法度正气与绝密暗访前的沉郁晚照相融，再现宋代公府严谨仪轨。
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color court drama illustration, wide cinematic 16:9 composition. Late afternoon sunset golden rays slanting into the majestic main tribunal hall of Kaifeng Prefecture around 1050 AD, illuminating towering vermilion columns, official bamboo staves, and the cold bronze glints of courtroom execution guillotines standing silently in the background. Behind the grand lacquered magistrate desk sits righteous Prefect Bao Zheng—stern dark-skinned noble features, wearing authentic Song flat-winged black futou official hat and deep purple-crimson Song court robes—leaning forward to hand a folded plain white secret note and a small matte-silver seal across the desk. Standing left is scholar-advisor Gongsun Ce in serene teal robes; standing right is gallant Red-Robed Guard Zhan Zhao with hand resting on his straight sword hilt. Facing the desk from a respectful three-quarter back view stands the young Six-Doors constable protagonist receiving the secret order with both hands. Authentic Song official attire (no Qing dynasty hats or queues), blank overhead plaques with zero text or characters.
  ```

---

### 50. `CG-QST-050`：姑苏寒山寺钟楼 · 子夜袖石灭烛截竹筒图

- **关联文件**：[`src/data/quests/sects/kaifengMurongQuest1.ts`](../src/data/quests/sects/kaifengMurongQuest1.ts)
- **目标路径**：`public/assets/quests/kf_murong1_hanshan_bell_intercept.jpg`
- **画框题跋**：`姑苏枫桥寒山寺古钟楼 · 子夜袖石灭烛截获参合庄甲械竹筒`
- **剧情语境**：
  - 夜半子时姑苏寒山寺钟声已歇、月影透窗。主角悄然潜入高耸木构的【寒山寺古钟楼】，正见两名黑衣汉子鬼祟蹲在巨大铜钟底座旁撬开松动青砖，自暗格取出蜡封竹筒。
  - 主角毫不犹豫指尖弹出袖石击灭其火折光亮，旋即从古钟横梁上如青烟掠下，一掌一肘三两招按翻二人、截获写着「冬至前十日，太湖烟波渡口……包三、风四亲迎」的参合庄密信。
- **画面核心要素**：
  1. **环境氛围**：江南苏州枫桥寒山寺古色古香的高层全木结构钟楼内景，悬梁中央吊挂着一尊巨大古铜梵钟（表面浮雕莲花云纹与八卦纹路，无汉字铭文），月光从斜坡雕花木格窗漏下洒在青砖地上，地面有一块被撬开的暗格空砖。
  2. **主体人物**：夜色暗影与冷白月光交替之间，身着深青夜行劲装的年轻主角如飞燕般自粗大木梁凌空翻扑而下，指尖弹出的一粒小石子恰好凌空击熄下方黑衣接头人手中火折子的最后一点火星，主角身形紧随掠至，一手如鹰爪般探向对方慌忙捂住的蜡封竹筒；另一名黑衣汉子仓皇抽短刀招架。
  3. **武侠悬念**：古寺铜钟与高空凌厉擒拿的动静反差极强，营造极佳的江南夜探谍战氛围。
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color nocturnal stealth action illustration, wide cinematic 16:9 composition. Midnight interior of the ancient timber bell tower at Hanshan Temple in Gusu (Suzhou) around 1050 AD, silver moonlight slicing through wooden lattice windows across a massive hanging bronze Buddhist bell etched purely with cloud and lotus motifs. On the stone floor near a pried-up loose brick secret compartment crouch two startled black-clad smugglers; a tiny pebble flicked from above cleanly snuffs out the flame of their tinder stick into trailing sparks. Dropping swiftly like a shadow from the dark overhead wooden rafters, the agile young detective in midnight-blue Song martial garb reaches out to snatch a wax-sealed bamboo message cylinder right out of the stunned smuggler's grasp while kicking away his companion's short dagger. Crisp nocturnal blue-silver moonlight, atmospheric shadows, authentic Song temple timber joinery, zero text.
  ```

---

### 51. `CG-QST-051`：燕子坞听香水榭 · 琴韵暗香隔帘递风灯图

- **关联文件**：[`src/data/quests/sects/kaifengMurongQuest1.ts`](../src/data/quests/sects/kaifengMurongQuest1.ts)
- **目标路径**：`public/assets/quests/kf_murong1_tingxiang_lantern.jpg`
- **画框题跋**：`太湖燕子坞听香水榭 · 隔帘听琴阿朱阿碧赠竹笼风灯指幽径`
- **剧情语境**：
  - 小舟悄然泊于太湖烟波深处的【燕子坞听香水榭】后方芦苇石阶，阁内百花微香伴着悠扬古琴音飘出。
  - “听香妙手”【阿朱】一眼识破主角身怀汴梁气息却并未戳破，与“琴韵佳人”【阿碧】隔竹帘婉言周旋；阿朱顺手隔帘递出一盏只够半个时辰灯油的青竹纱笼风灯，悄声点破莫惊巡夜的风波恶，顺曼陀山茶幽径早去早回。
- **画面核心要素**：
  1. **环境氛围**：月夜静谧如画的江南水乡太湖荷塘，雕花木制临水亭榭四面垂柳轻拂、池中红鲤逐月影游动、水边泊着一叶极小乌篷木舟，岸边山茶花树初现花苞。
  2. **主体人物**：水榭半卷起的细竹湘帘之后透出柔暖橘黄烛光——左侧一名穿湖水碧色襦裙、发髻清雅温婉的江南少女（阿碧）十指纤纤正轻轻按在雕案七弦古琴之上含笑回望；帘畔站着身穿俏丽杏红宋式衫裙、机灵娇俏的少女（阿朱），她半挑竹帘探身向外，手中轻轻递出一盏透着温暖蜡光的小巧六角青竹笼风灯；前景芦苇石阶上，微侧背影的主角抱拳拱手向帘内致谢准备接灯。
  3. **江南雅意**：冷月青柳寒水与榭内暖灯琴韵交织，还原《天龙八部》江湖里极温柔微妙的试探与暗护。
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color moonlit Jiangnan illustration, wide cinematic 16:9 composition. Tranquil moonlit water pavilion (Tingxiang Shuixie) built over lotus reeds and weeping willows at Lake Taihu around 1050 AD, a small wooden rowboat moored quietly at the stone steps while red koi ripple the moon's reflection. Inside the warm lantern-lit pavilion behind a raised fine bamboo blind, charming gentlewoman A'bi in pale aqua Song ruqun silk rests delicate fingers on a seven-string guqin looking over with a soft smile, while lively bright-eyed A'zhu in apricot-crimson Song attire parts the bamboo curtain and leans gently forward to hand a small glowing green-bamboo-framed gauze wind lantern outward. Outside on the stone pier in the foreground (seen from a poised three-quarter back view), the traveling detective clasps hands respectfully to accept the lantern. Poetic contrast of silvery Taihu mist and golden inner pavilion light, authentic Song Jiangnan garden aesthetic, zero text.
  ```

---

### 52. `CG-QST-052`：燕子坞参合庄 · 火起接掌破窗跃太湖图

- **关联文件**：[`src/data/quests/sects/kaifengMurongQuest1.ts`](../src/data/quests/sects/kaifengMurongQuest1.ts)
- **目标路径**：`public/assets/quests/kf_murong1_canhe_window_leap.jpg`
- **画框题跋**：`燕子坞参合庄秘档室 · 掌翻油灯火起硬接邓百川五合破窗跃湖`
- **剧情语境**：
  - 秘档室激战五合震倒檀木书架、卷宗漫天飞舞之际，主角趁四大家臣之首“神掌震江南”【邓百川】换气空隙，反手一掌拍翻案上铜油灯，半丈火舌瞬间吞没半间石室！
  - 在邓百川惊呼下令放水闸拦截的吼声与两支钉入窗棂的冷箭擦肩之际，主角足尖一点倒梁，撞碎雕花木窗凌空跃入窗外深邃迷蒙的太湖暗渠夜波。
- **画面核心要素**：
  1. **环境氛围**：临水而建的参合庄秘档石木二层楼阁，左侧屋内檀木书架倾覆、大量竹简空白卷轴如雪飞扬，打翻的铜油灯腾起汹涌炽烈的橘红火浪与黑烟；右侧则是破开木屑飞溅的硕大雕花木窗，窗外直接通向寒气森森的月夜太湖水巷。
  2. **主体人物**：破碎木窗之外半空中，怀中紧紧掩护着密账布包的年轻主角身如青燕纵身凌空跃向深水（背姿舒展矫健），两支寒光冷箭擦着他肩畔钉在溅飞的木窗格上；身后火光滚滚的破窗室内，魁梧威严的中年高手（邓百川，靛青长袍胡须飞扬）挥袖震散眼前浓烟，满脸震怒地指向窗外高呼放闸阻截。
  3. **破局爆裂感**：室内的炽烈火焰、四散竹简与窗外的清冷太湖夜水构成惊心动魄的脱险瞬间。
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color action escape painting, wide cinematic 16:9 composition. Dramatic nighttime breakout from a waterfront archives chamber at Lake Taihu around 1050 AD. Inside the split open lattice frame behind, overthrown rosewood bookcases scatter blank bamboo slips and scrolls everywhere as a kicked-over bronze oil lamp erupts into roaring half-zhang orange flames and dark smoke; a formidable bearded senior martial master (Deng Baichuan in dark indigo Song robes) sweeps back his sleeve in shock amidst the smoke, shouting orders while two iron arrows splinter into the broken wooden window frame. Leaping out in mid-air through shattering cedar latticework toward the cold dark lake canal below, the young detective hugs a waterproof oilskin document pouch tight against their chest in a sleek diving arc. Explosive orange firelight colliding with deep cool indigo lake reflections, dynamic flying splinters, zero text.
  ```

---

### 53. `CG-QST-053`：开封府正堂 · 呈交密账晋升金牌总捕图

- **关联文件**：[`src/data/quests/sects/kaifengMurongQuest1.ts`](../src/data/quests/sects/kaifengMurongQuest1.ts)
- **目标路径**：`public/assets/quests/kf_murong1_gold_badge_verdict.jpg`
- **画框题跋**：`开封府三口铜铡正堂 · 呈交太湖水渍密账获擢六扇门金牌总捕`
- **剧情语境**：
  - 冒死潜泳太湖脱身归京，主角向开封府衙奉上那份仍带着太湖水渍的《参合庄甲械转运密账抄件》。
  - 烛火照亮正堂三口寒光冽冽的铜铡，【包拯】阅罢沉重铁证黑面如铁而心下大慰，与在旁抚剑赞叹的【展昭】一并宣布：奏明圣上正式擢升主角为六扇门【金牌总捕】，专司天下大案。
- **画面核心要素**：
  1. **环境氛围**：秋夜肃穆的开封府衙升堂正殿，堂两侧高擎烛台火影微晃，三口象征王法森严的龙头、虎头、狗头铜铡整齐矗立于高台一隅闪耀冷铜清辉（铡口无文字）。
  2. **主体人物**：红色公案后，正襟危坐的包拯（平翅黑幞头紫袍）双手正缓缓合上一册边角带着明显水渍微皱的素纸密账抄件，神情冷峻中透着沉稳托付；堂旁御前四品带刀护卫展昭按剑微笑向主角颔首致贺，并将一面雕琢龙纹的纯金六扇门金牌令符捧在红漆托盘中；正堂中央青石上，年轻主角挺直脊背抱拳朗声应诺，旁边木盘备有百二十两军功赏银。
  3. **阶段丰碑**：与第八幕（`CG-QST-049`）暮色暗查遥相呼应，彰显“小捕快孤胆入虎穴、凯旋授金牌”的职业升华。
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color court milestone painting, wide cinematic 16:9 composition. Solemn candlelight tribunal hall of Kaifeng Prefecture at night around 1050 AD, with the three gleaming bronze courtroom execution guillotines (dragon, tiger, and dog finials) standing majestically on the side dais under wavering tall-taper flames. At the grand vermilion magistrate desk, Prefect Bao Zheng in official purple Song court robes and flat-winged black futou closes a slightly water-stained ledger manuscript with grave approval. Standing beside him with a warm approving smile, red-clad imperial guard Zhan Zhao holds a lacquered tray bearing a gleaming carved golden Six-Doors Chief Constable medallion badge and stacked silver ingots. In the foreground center, the young hero stands straight in a formal dark Song martial coat (seen from a proud three-quarter back view), saluting with clasped hands. Authentic Song legal ritual atmosphere, rich crimson, bronze, and gold mineral pigments, zero text.
  ```

---

### 54. `CG-QST-054`：开封府后轩密室 · 烛下点验江南百兵册图

- **关联文件**：[`src/data/quests/sects/kaifengMurongQuest2.ts`](../src/data/quests/sects/kaifengMurongQuest2.ts)
- **目标路径**：`public/assets/quests/kf_murong2_secret_ledger_audit.jpg`
- **画框题跋**：`开封府衙升堂后轩 · 烛下公孙策朱笔勾稽江南官铁密册包公拍案`
- **剧情语境**：
  - 入夜后，【包拯】将主角与【公孙策】召入升堂正殿后轩密室，取出兵部武库司核验过的《江南生铁岁出清册》与参合庄秘档抄件逐项钩稽。
  - 公孙策拨动木算盘朱笔细核，赫然对出近三年两浙路报损报废官铁之数竟与参合庄“新入精铁”分毫不差！包拯震怒拍案震响茶盏，决意密奏御前先从市井风声彻查此案。
- **画面核心要素**：
  1. **环境氛围**：开封府衙后轩幽深木构签押房，长案上点亮两盏明烛，铺展数卷厚重黄麻纸簿册、朱砂墨砚、一把宋式紫檀木算盘与青瓷茶盏（书页无可读文字）。
  2. **主体人物**：案后黑面肃威的包拯右掌狠狠拍在红木公案之上，激得白青瓷茶盖微跳茶水微溅，眉峰紧锁双目如电；案左侧长髯儒士公孙策一手压住册页、一手捏朱砂毛笔停在账页红圈处神色凝重；前景主角肃立抱拳凛然听差。
  3. **朝堂肃气**：密室烛光映出浓烈官场查贪的紧迫压迫感，以一册官铁账引出横跨汴梁与太湖的惊天大案。
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color court mystery illustration, wide cinematic 16:9 composition. Late-night private rear study behind Kaifeng Prefecture's main hall around 1050 AD, softly lit by brass candelabra over a wide rosewood desk covered with thick yellow-hemp iron ledgers, a wooden Song abacus, vermilion inkstone, and celadon teacups (pages showing faint abstract columns and red check circles, zero readable text). Prefect Bao Zheng in dignified Song purple official robes slams one palm angrily onto the desk, rattling a porcelain teacup lid as his piercing eyes narrow. Beside him, serene advisor Gongsun Ce in slate-blue scholar robes pauses mid-stroke with a vermilion-dipped brush over matched account lines. In the foreground from a three-quarter back view, the newly promoted Gold-Badge Constable protagonist bows firmly in silent resolve. Intense candlelight, rich warm amber and dark mahogany Song brushwork, zero text.
  ```

---

### 55. `CG-QST-055`：汴梁樊楼屋脊 · 夜风横剑截擒契丹谍图

- **关联文件**：[`src/data/quests/sects/kaifengMurongQuest2.ts`](../src/data/quests/sects/kaifengMurongQuest2.ts)
- **目标路径**：`public/assets/quests/kf_murong2_fanlou_roof_spy.jpg`
- **画框题跋**：`汴梁樊楼三层琉璃飞檐 · 夜风横剑截擒契丹密使搜获燕纹木牌`
- **剧情语境**：
  - 追查汴梁城内暗通江南的北庭眼线，主角一路轻功追至天下第一酒楼【樊楼】三层歇山琉璃瓦飞檐之上，脚下御街夜市灯火如星河铺展。
  - 主角施展一记“燕子三抄水”凌空横剑截住疾奔的【灰衣客】，避开对方袖中暴起袭喉的草原短弯刀，分筋错骨扣腕按倒于屋瓦之上，并自其左靴夹层搜出刻有飞燕纹样的半枚紫檀木牌。
- **画面核心要素**：
  1. **环境氛围**：北宋东京樊楼巍峨高耸的歇山重檐琉璃屋脊与仙人走兽瓦当夜景，俯瞰下方繁华如梦、万点灯火丝竹沸腾的汴梁御街虹桥市井全景（市招灯笼皆无字）。
  2. **主体人物**：高险琉璃瓦脊斜坡上，夜风吹得衣袂翻飞如翼的主角单膝凌厉抵住一名瘦削狡猾的灰衣契丹密使后背，一手扣紧对方反扭的右腕脉门、寒光短弯刀坠落瓦沟，另一手刚自对方踢脱的左靴夹层夹出半枚雕刻精美飞燕暗纹的紫檀腰牌，手中三尺青锋横架敌颈。
  3. **视觉高度**：凌空绝顶屋脊与万家灯火夜市形成的极致纵深落差，尽显宋都武侠夜战的洒脱与冷峻。
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color rooftop action painting, wide cinematic 16:9 composition. High atop the gleaming dark-green glazed-tile roof ridges and mythic ridge-figurines of Bianliang's grand three-story Fanlou tavern on a windy night around 1050 AD, overlooking far below a breathtaking illuminated sea of Song-era Bianliang night-market lanterns and bridges. On the sloped tiled roof ridge, the agile young Song constable pins a fleeing grey-robed Khitan spy down with one knee, twisting back his wrist to knock a short curved steppe dagger rattling onto the tiles, holding a cold straight sword to the spy's throat while extracting half of a carved swallow-motif dark sandalwood token from his left boot cuff. Billowing robes in high night wind, dazzling lantern-lit city depth below, authentic Song roofs, zero text.
  ```

---

### 56. `CG-QST-056`：开封府升堂正殿 · 龙图授紫宸密旨与双龙金牌图

- **关联文件**：[`src/data/quests/sects/kaifengMurongQuest2.ts`](../src/data/quests/sects/kaifengMurongQuest2.ts)
- **目标路径**：`public/assets/quests/kf_murong2_zichen_secret_edict.jpg`
- **画框题跋**：`开封府衙升堂正殿 · 包拯启紫檀匣授紫宸密旨与鎏金双龙金牌`
- **剧情语境**：
  - 案情坐实兼涉辽谍与地方官贪墨，仁宗圣心沉稳，暗降一道不曾明发的【紫宸密旨】交开封府节制施行。
  - 升堂正殿内，【包拯】捧紫檀长匣取出明黄绫绢密旨与一面调动镇江水师的【鎏金双龙金牌】，庄重授予主角；令其以武力慑服为主、同时为江南万民留一线太平余地，切忌逼狗跳墙。
- **画面核心要素**：
  1. **环境氛围**：白昼通透威严的开封府升堂正殿，汉白玉台阶光可鉴人，公案侧旁立有宋代御赐雕龙紫檀仪仗宝匣。
  2. **主体人物**：公案前，庄严凝重的包拯双手郑重将一道折卷的明黄瑞锦绫绢密旨与一枚熠熠生辉、浮雕双龙盘绕的沉金金牌置于朱漆雕案上推向主角；一旁展昭身着绯红四品御前袍肃立护持，目光期许而沉稳；前景主角单膝恭立或俯首双手并举准备承接王命。
  3. **政武气韵**：明黄皇祐帝王绫绸与黑衣紫袍的庄重色调，将“代天巡狩、以武止戈”的家国大义推向高潮。
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color court commissioning scene, wide cinematic 16:9 composition. Crisp daylight streaming across the majestic Kaifeng Prefecture tribunal courtyard hall around 1050 AD. Before an opened ornate rosewood imperial chest at the magistrate desk, Prefect Bao Zheng in formal deep-purple court robes and winged black futou solemnly transfers a rolled imperial-yellow brocade secret decree and a gleaming gilded heavy medallion embossed with coiled twin dragons across the table. Standing in formal crimson Song imperial guard attire at his side, Zhan Zhao watches calmly with one hand over his straight sword hilt. In the foreground, the protagonist (three-quarter back view in refined constable coat) bows deeply with raised palms to accept the imperial warrant. Imperial Song yellow-gold, crimson, and ink contrast, authentic Song architecture, zero text.
  ```

---

### 57. `CG-QST-057`：姑苏虎丘试剑石洞 · 火折微光照见飞燕铁甲武库图

- **关联文件**：[`src/data/quests/sects/kaifengMurongQuest2.ts`](../src/data/quests/sects/kaifengMurongQuest2.ts)
- **目标路径**：`public/assets/quests/kf_murong2_huqiu_armor_cave.jpg`
- **画框题跋**：`姑苏虎丘试剑石后山石窟 · 火折微光查获飞燕暗印数百冷锻铁甲`
- **剧情语境**：
  - 持密旨再临江南姑苏，主角按风波恶名录暗记于三更时分夜登冷月笼罩的【虎丘剑池与试剑石】。
  - 绕过试剑石西侧被藤蔓掩蔽的天然岩隙石门进入十余丈山腹密窟，火折微光骤然照亮骇人景象——成百上千副涂满防锈桐油的冷锻重步甲、长矛与精钢箭簇列架如林，甲角皆烙着一枚飞燕暗印！
- **画面核心要素**：
  1. **环境氛围**：虎丘山腹深处人工开凿扩展的阴冷花岗岩天然大石窟，洞口隐隐透入一线清冷银白山月与垂落枯藤，洞壁渗水反光。
  2. **主体人物与重宝密库**：微侧立于洞窟纵深通道前方的年轻主角，右手高举一支亮着温暖明黄微焰的小巧纸煤火折子，左手持火漆木印正俯身细查面前一具木架铁甲护心处的“飞燕徽记”钢印；火折暖光照耀下，延绵洞窟深处整齐码放着如林一般森然冷冽的成排宋辽形制冷锻鱼鳞铁甲、破甲长矛架与撬开一半露满精铁箭头的新木箱（箱盖无字，唯烙简洁燕羽徽印）。
  3. **视觉冲击**：一豆火折子暖光瞬间照破黑暗揭露数百冷锻铁甲森林，带来极具震撼力的铁证震撼。
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color underground discovery painting, wide cinematic 16:9 composition. Deep inside a hidden hollowed granite cavern tucked behind vine-covered boulders west of Sword-Testing Rock at Huqiu Hill in Suzhou around 1050 AD, a faint sliver of cold silver moonlight slipping past the hidden stone entrance far behind. In the foreground, the young detective crouches slightly (seen from a three-quarter rear profile), holding aloft a warmly glowing tinder-flame torch in one hand while inspecting a stamped flying-swallow emblem embossed onto a cold-forged iron breastplate with the other. The warm amber flicker reveals row after receding row of wooden racks laden with hundreds of glistening oiled iron scale armors, neatly bundled steel-tipped war spears, and open cedar crates overflowing with forged arrow-heads stretching deep into the cavernous gloom. Chilling steel-blue reflections and warm torchlight contrast, zero text.
  ```

---

### 58. `CG-QST-058`：太湖烟波渡口画舫 · 三十合拆招震退公冶乾图

- **关联文件**：[`src/data/quests/sects/kaifengMurongQuest2.ts`](../src/data/quests/sects/kaifengMurongQuest2.ts)
- **目标路径**：`public/assets/quests/kf_murong2_taihu_boat_gongye.jpg`
- **画框题跋**：`太湖烟波渡口雕花画舫 · 碧波荡漾三十合拆招震退江南二绝公冶乾`
- **剧情语境**：
  - 欲渡太湖直闯燕子坞，慕容氏四大家臣之二、素有「江南掌法第二」之称的【公冶乾】亲率一艘雕花大画舫横截烟波渡口。
  - 在不足两丈见方、随太湖碧浪摇晃的画舫甲板之上，两人激斗三十余合水花四溅；主角看破公冶乾右掌杀招，足踩摇晃船板借波反震，一式重肘沉肩硬生生将名震江南的公冶乾震退三步撞在朱漆船柱之上。
- **画面核心要素**：
  1. **环境氛围**：清晨浩渺翠绿的太湖烟波渡口，四周芦苇摇曳白鹭惊飞，湖心一艘双层宋代雕花大画舫甲板与朱漆立柱在水波中被掌风激起尺余高雪白浪花。
  2. **主体人物**：倾侧摇曳的船首两丈方寸甲板上，身着儒雅深青宽袍却双目炯炯的江南中年大豪（公冶乾）刚与主角正面拆开一招，被反震劲力推得连退三步后背撞上一根朱漆画舫立柱，衣袍猎猎、神色惊骇敬服；前方主角稳如盘石单足踏定船板、一手剑指微垂、一手收剑蓄势，衣不沾水，展现宗师级下盘定力。
  3. **水上拆招意境**：青绿烟波山水画卷中镶嵌紧凑激烈的近身寸劲博弈，兼具诗意与力道。
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color riverside duel painting, wide cinematic 16:9 composition. Morning mist over Lake Taihu amidst swaying reeds and soaring white egrets as a carved Song-dynasty painted pleasure barge rocks briskly on splashing emerald-blue lake waves. On the tight two-zhang wooden foredeck between vermilion cabin pillars, the nimble young protagonist plants one foot like a rock against the rolling deck, long straight sword subtly lowered in calm poise while water splashes high around the gunwales from sheer palm-qi impact. Staggering back three paces against a vermilion pillar in stunned respect, dignified middle-aged Jiangnan grandmaster Gongye Qian in deep-teal scholar martial robes catches his balance after a fierce thirty-bout palm clash. Classic Song blue-and-green landscape brushwork paired with dynamic martial arts tension, blank boat pennants, zero text.
  ```

---

### 59. `CG-QST-059`：燕子坞参合庄演武场 · 硬撼邓百川震裂青砖图

- **关联文件**：[`src/data/quests/sects/kaifengMurongQuest2.ts`](../src/data/quests/sects/kaifengMurongQuest2.ts)
- **目标路径**：`public/assets/quests/kf_murong2_canhe_yard_deng.jpg`
- **画框题跋**：`燕子坞参合庄演武西场 · 正面硬撼神掌邓百川震裂青砖打通内院`
- **剧情语境**：
  - 踏入燕子坞【参合庄演武西场】，四大家臣之首「神掌震江南」【邓百川】亲自出阵阻拦，数十名参合庄弟子环场观战，兵器架上长枪受掌风所激嗡嗡作响。
  - 今非昔比的主角不闪不避，待邓百川一记刚猛“排山倒海”劲推至老境之际欺身贴近中宫对掌硬撼，沛然内力将这位大庄主震退五步直至石狮旁，足下青砖裂出蛛网细纹。
- **画面核心要素**：
  1. **环境氛围**：江南世家大院清幽又不失气派的参合庄青砖演武广场，四周竹影摇曳、列置雕石狮子与盛放长枪铜棍的红木兵器架，周围分立震惊失色的数十名素青色庄丁与风波恶、包不同侧影。
  2. **主体人物**：演武场青砖正中一刹交击回气定格——威武厚重的大庄主邓百川被正面内力震得噔噔连退五步方才在白石狮子旁稳住下盘，一截青衫袖口被劲气撕裂飘起，脚底青砖碎裂出清晰蛛网状裂纹；场心处，年轻主角如青松般稳立收剑调息，气度沉凝不可撼动。
  3. **对比呼应**：呼应第一部秘档室仅能“撑五合破窗逃水”的青涩旧事，写出主角成长后正大光明压服江南一线大豪的王者底气。
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color martial arena showdown painting, wide cinematic 16:9 composition. Stone courtyard of the Canhe Manor training grounds at Swallow Dock around 1050 AD, framed by tall weeping bamboos, stone guardian lions, trembling wooden weapon racks, and rings of stunned Canhe retainers in light blue-grey robes watching in silent shock. At the center of the flagstones, the young protagonist stands rock-steady breathing smoothly with straight sword lowered cleanly (seen from a calm three-quarter back view), while five paces away beside a carved stone lion, formidable bearded senior master Deng Baichuan skids to a halt—one indigo sleeve cleanly torn half a foot by palm shockwave, spiderweb cracks radiating across the grey flagstones beneath his boots. Crisp Song architectural details, palpable kinetic shockwaves in dust and fluttering leaves, zero text.
  ```

---

### 60. `CG-QST-060`：燕子坞还施水阁正厅 · 慕容复五合震断紫檀桌图

- **关联文件**：[`src/data/quests/sects/kaifengMurongQuest2.ts`](../src/data/quests/sects/kaifengMurongQuest2.ts)
- **目标路径**：`public/assets/quests/kf_murong2_huanshi_ten_bouts.jpg`
- **画框题跋**：`燕子坞还施水阁正厅 · 参合指气与青锋剑五合对撞震断紫檀供桌`
- **剧情语境**：
  - 历经重重关隘步入武林圣地【还施水阁】正厅，主角终与名满天下的姑苏“南慕容”【慕容复】正面交锋。
  - 第五合至高巅峰对拆，白衣翻卷如雪的慕容复凌空点出无形凛冽的【参合剑气】破空啸鸣，主角催动浑厚真气不退反进以青锋长剑正格抵挡——两股绝顶内气轰然对撞溅起耀眼火星，余波生生将厅中数百年紫檀木供桌震断成两截、泛黄秘卷如雪飘飞，随即两人齐齐敛招收手各定尊严。
- **画面核心要素**：
  1. **环境氛围**：极尽典雅宏阔的太湖水榭阁楼秘库正厅，四壁耸立顶天立地的黑漆楠木藏书巨架，架上层层叠叠摆满各派武学卷轴（全部卷轴封签做旧留白不写汉字），雕花栏楯外透入太湖清辉。
  2. **主体人物**：大厅中央爆发绚烂剧烈的无形气浪对撞——剑尖溅起刺目璀璨的一串金色火星，厅侧那方百年紫檀大供桌“咔嚓”从正中断成两截倾倒、几十卷泛黄线装古谱迎风飞舞宛如漫天梨花；右侧白衣飘然、玉冠束发、面如冠玉却神色冷傲凛然的翩翩贵公子慕容复右指凌空成剑指刚收三分指风，白衣袖口亦微裂一线；左侧主角足踩八卦方步以青锋稳稳点地回势，脊背挺直如松，厅廊门侧隐约可见阿朱与阿碧屏息凝望。
  3. **巅峰神韵**：北乔峰外最具传奇性的“南慕容”宗师交锋画面，雅致白衣书阁碰撞刚猛紫檀断桌火花，视觉美感拉满。
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color climax duel painting, wide cinematic 16:9 composition. Inside the storied multi-tiered Huanshi Water Pavilion library overlooking Lake Taihu around 1050 AD, soaring lacquer bookcases lined floor-to-ceiling with aged blank martial scrolls and bound manuals. In the hall's center, peak internal-qi shockwaves clash invisibly in a burst of dazzling golden sparks where the protagonist's steel straight sword meets the luminous fingertip sword-qi of Murong Fu—a poised, aristocratic young grandmaster in flowing snow-white Song scholar-warrior silk with a jade hair-crown, crisp cold nobility in his gaze even as the backlash splits a centuries-old rosewood altar table cleanly in half between them and scatters dozens of antique yellow scrolls spinning through the air like snow. Glimpsed silently at the side wooden corridor are maids A'zhu and A'bi holding their breath. Ethereal scholarly martial splendor, mineral ink, white silk, and warm amber wood tones, zero text.
  ```

---

### 61. `CG-QST-061`：开封府大堂晨光 · 呈交立约书晋升御前护卫图

- **关联文件**：[`src/data/quests/sects/kaifengMurongQuest2.ts`](../src/data/quests/sects/kaifengMurongQuest2.ts)
- **目标路径**：`public/assets/quests/kf_murong2_royal_guard_seal.jpg`
- **画框题跋**：`开封府升堂正殿晨曦 · 呈交立约盟书单膝拜领御前护卫金印`
- **剧情语境**：
  - 未动江南一兵一卒而以武止戈、令慕容氏封存私甲立下约书凯旋返京，开封府正殿秋日晨光穿过廊柱照亮肃穆三铡。
  - 【包拯】端详过慕容复立约文书与虎丘拓片后黑面罕见展露欣慰笑意，与旁立抚剑祝贺的【展昭】一并宣读天子口谕：特晋主角为开封府顶级武职【御前护卫】，亲授御前行走金印腰牌。
- **画面核心要素**：
  1. **环境氛围**：秋晨清朗金曦洒满开封府衙大堂汉白玉丹墀，三口铜铡映照金辉，公案上整齐呈放着太湖清册卷轴与加盖火漆泥封的素白立约书。
  2. **主体人物**：大堂高案前，紫袍包拯罕见露出舒眉欣慰神色，亲手托着一枚系着赤金流苏穗子的御前四品行走纯金虎龙腰牌与印匣；四品绯袍御前带刀护卫展昭立于左侧抚剑开怀拱手相贺；前景正中，年轻主角身披象征荣誉的整洁深蓝官衫单膝郑重跪地、双手平接御赐金印腰牌，背姿如青松磐石。
  3. **圆梦收束**：皇祐风云第一系列《姑苏密查·参合对质》终章圆满封神，开封府官场武侠线的最高勋赏定格。
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color royal honor illustration, wide cinematic 16:9 composition. Crisp golden autumn morning sunlight flooding the grand marble steps and tribunal hall of Kaifeng Prefecture around 1050 AD, gleaming off three ceremonial bronze execution guillotines at the side while folded sealed treaties rest neatly on the red lacquered magistrate desk. Smiling warmly with rare quiet pride, Prefect Bao Zheng in official purple Song court robes holds out a heavy imperial golden waist-seal medallion strung with crimson-gold silk tassels, while scarlet-robed imperial guard Zhan Zhao clasps hands warmly beside him in genuine admiration. In the center foreground, the young hero in dark indigo Song martial officer attire kneels respectfully on one knee (seen from an upright three-quarter back view), raising both hands solemnly to receive the Royal Guard golden seal. Majestic Song imperial red, gold, and sunlit stone palette, authentic 1050 AD court robes, zero text.
  ```

---

### 62. `CG-QST-062`：大名府黄河北岸 · 临津酒楼断索剑拔弩张图

- **关联文件**：[`src/data/quests/cities/damingBajiQuest.ts`](../src/data/quests/cities/damingBajiQuest.ts)
- **目标路径**：`public/assets/quests/daming_linjin_tavern_standoff.jpg`
- **画框题跋**：`大名府黄河北岸临津酒楼 · 留守司公人与沧州八极门徒拔刃对峙`
- **剧情语境**：
  - 皇祐二年春寒未褪，黄河北岸桃花水涨、浊浪拍岸声震数里，浮桥三根镇河大铁索却于昨夜遭诡秘寒刃暗斩、二十箱生铁与河工银饷落水。
  - 大名府【临津酒楼】内酒客四散墙角，留守司六扇门都头【郭钧海】率公人按刀围逼，沧州八极门女教头【卢婉月】护住门下弟子持棍厉声理论，当垆飒爽女掌柜「红袖双刀」【石红锦】正按住梨花春酒坛叹气劝架。
- **画面核心要素**：
  1. **环境氛围**：黄河北岸临河木构二层酒楼临水大堂，敞开木窗外可见波涛浑黄翻滚的桃花春水黄河与半截垮塌歪斜的木浮桥栈道轮廓，室内榆木方桌歪斜、碎碗与酒坛交错（酒旗空白无字）。
  2. **主体人物**：大堂左右针锋相对的两拨人马——左侧几名穿北宋公差皂服、腰悬铁尺与横刀的留守司捕快在年轻干练都头（郭钧海）带领下按刀逼近；右侧一身利落鹅黄劲装、手提六合齐眉棍、秀眉倒竖义愤填膺的八极女教头（卢婉月）护着两名年轻劲装门人稳扎八极弓步对峙；木柜台后风韵泼辣的女掌柜（石红锦，系红绸腰带，腰隐双短刀）正按着两只泥封梨花春酒坛喊停；主角从门口掀帘步入正欲出声止戈。
  3. **北方气象**：大河奔涌的浑厚苍劲与北方镖局武馆官差对撞，瞬间交代《铁锁镇河朔》开篇强冲突。
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color tavern standoff illustration, wide cinematic 16:9 composition. Inside the bustling ground hall of a timber riverside tavern along the north bank of the surging Yellow River in Daming Prefecture around 1050 AD; through open wooden shutters behind, muddy spring floodwaters crash past a partially severed floating pontoon bridge with snapped anchor chains. Inside the room, nervous customers press against corners as two armed groups lock into a tense standoff across rough elm tables: on the left, black-uniformed Song prefectural constables led by earnest chief officer Guo Junhai grip sabers and iron rulers; on the right, spirited young Baji martial mistress Lu Wanyue in sleek ochre-cream narrow-sleeve attire plants her feet with a long waxwood staff, shielding two fierce sect apprentices. Behind the wooden bar counter, quick-witted tavern hostess Shi Hongjin (wearing a crimson silk sash concealing twin short blades) holds down two clay wine jars calling for calm as the protagonist steps in through the reed door-curtain. Gritty Northern Song frontier energy, authentic Song uniforms, blank tavern pennants, zero text.
  ```

---

### 63. `CG-QST-063`：黄河铁索渡口 · 芦棚紫髯北侠辨寒铁断索图

- **关联文件**：[`src/data/quests/cities/damingBajiQuest.ts`](../src/data/quests/cities/damingBajiQuest.ts)
- **目标路径**：`public/assets/quests/daming_ouyang_chun_ferry.jpg`
- **画框题跋**：`黄河铁索渡口临河芦棚 · 北侠紫髯伯欧阳春横巨刃饮酒辨寒铁断痕`
- **剧情语境**：
  - 追查斩断黄河镇河大铁索的真凶线索，主角赶赴狂风卷苇的【黄河铁索渡口】临河酒肆芦棚。
  - 一名紫髯如戟、古貌魁梧的布衣大豪正独坐木凳自斟梨花春，膝上横放一柄古朴厚背七宝巨刃——正是威震南北绿林的「北侠」【欧阳春】！他一眼识破昨夜金铁崩云之声源于北庭寒铁重斧，以三碗烈酒或数招刀法考校主角。
- **画面核心要素**：
  1. **环境氛围**：暮风呼啸的黄河客渡木栈桥畔简易茅草芦棚酒肆，棚外岸边石桩上正拴着一截腕口粗、断口如镜面斜齐泛着森冷青光的巨型生铁镇河索（极度醒目的核心线索），黄河渡船摇晃系缆，岸苇弯折如弓。
  2. **主体人物**：粗糙长条木桌前，身材异常高大魁梧、留着一把钢针般微泛紫黑光泽浓密长须的老成布衣豪杰（北侠欧阳春，浓眉如戟、布袍袖挽起露出虬结小臂）大马金刀稳坐，一膝横搁着一柄乌沉古朴的厚背七宝大刀，一手举起粗糙大土碗痛饮，双目含笑打量桌对面拱手致敬的年轻主角。
  3. **豪侠风骨**：三侠五义里最沉稳豪迈的“北侠”孤傲出尘形象，黄沙大河与粗陶酒碗写尽燕赵侠风。
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color hero portrait illustration, wide cinematic 16:9 composition. A weathered reed-thatched waterside wine shelter beside a timber ferry pier on the windy Yellow River bank around 1050 AD, wild river reeds bending beside mud-brown waves. Noticeably anchored to a stone bollard in the foreground mud lies a massive severed river-anchor iron chain, its thick links sheared cleanly at an icy beveled angle. Seated boldly at a rough timber bench beneath a fluttering blank wine flag is the legendary "Northern Hero" Ouyang Chun—a towering, ruggedly noble man in plain coarse robes with a striking, bristling purplish-black beard, resting a heavy antique broad-backed war blade across his knee while raising a rough earthenware bowl of Lihuachun wine with warm seasoned amusement toward the young traveler (seen from a respectful three-quarter back view). Robust Yan-Zhao river frontier palette, earthy ochre, slate iron, and reed gold, zero text.
  ```

---

### 64. `CG-QST-064`：河北枪棒大校场 · 八角擂台契丹双斧露峥嵘图

- **关联文件**：[`src/data/quests/cities/damingBajiQuest.ts`](../src/data/quests/cities/damingBajiQuest.ts)
- **目标路径**：`public/assets/quests/daming_leitai_khitan_axes.jpg`
- **画框题跋**：`河北枪棒大校场八角擂台 · 契丹先锋乌古乃负双柄寒铁重斧踏碎青砖`
- **剧情语境**：
  - 大名府【河北枪棒大校场】春寒校阅，四面禁军队列如墙，前宰相兼北京留守贾昌朝在高台之上观阵。
  - 太行匪首焦三斧刚刚滚落台下，西北角忽有一名身披貂鼠皮袄、自称辽东行商的虬髯巨汉【乌古乃】跃上八角青石擂台，足尖竟将台心青砖踏碎，抽下背负双柄北庭寒铁重斧悍然叫阵八极宗师【卢铁山】与主角！
- **画面核心要素**：
  1. **环境氛围**：宏阔肃杀的大名府禁军大校场八角青石比武高台，高台四周插满大宋禁军五色仪仗方旗（纯色云纹不写字），远景高搭朱栏看台隐约可见紫袍高官贾昌朝端坐观礼，四下数百名戴铁盔执长枪的大宋河北禁军与武馆好汉喝彩肃立。
  2. **主体人物**：八角青砖高台中央爆起碎石烟尘——身披厚重辽东黑貂鼠毛坎肩、满脸虬髯、精壮凶蛮的契丹北院猛将（乌古乃）双脚落地生生震裂三块青石，双臂暴张正抡起两柄宽大森冷的北庭乌钢短重斧斜指向前方；擂台另一侧，须发灰白却筋骨如铁、左肩曾留旧伤的沧州八极宗师（卢铁山，一身劲黑短打手握浑铁六合大枪）与并肩立于身侧持兵刃的年轻主角及卢婉月严阵以待。
  3. **军阵质感**：高台冷峻比武与谍战掀牌瞬间合一，把大名府防辽校场的雄壮气象烘托到极致。
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color martial arena painting, wide cinematic 16:9 composition. Vast octagonal grey-stone sparring stage inside the Hebei Imperial Garrison Parade Grounds of Daming Prefecture around 1050 AD, surrounded by walls of Song spear-bearing soldiers and a distant vermilion viewing pavilion where high officials watch beneath blank colorful silk banners. Cracks and stone dust burst outward under the boots of a burly, ferocious bearded Khitan warrior (Wugunai, disguised in a thick sable-fur frontier vest over heavy dark mail) who has just vaulted onto the octagon floor, swinging down twin cold-iron northern battle axes with brutal arrogance. Facing him resolutely across the stage, silver-haired seasoned Baji grandmaster Lu Tieshan grips a thick all-iron long spear beside his daughter Lu Wanyue and the poised protagonist ready to duel. Authentic 1050 AD Song military parade spectacle, stark cold iron vs crimson banners, zero text.
  ```

---

### 65. `CG-QST-065`：北京留守沙盘阁 · 子夜百盏宫灯铁壁合围辽将图

- **关联文件**：[`src/data/quests/cities/damingBajiQuest.ts`](../src/data/quests/cities/damingBajiQuest.ts)
- **目标路径**：`public/assets/quests/daming_midnight_sandtable_ambush.jpg`
- **画框题跋**：`北京留守行宫防辽沙盘阁 · 百盏宫灯齐明贾昌朝卢铁山铁壁合围耶律裂山`
- **剧情语境**：
  - 子夜二更，贪官河北转运司勾当公事【周文焕】私配铜钥潜入北京留守行宫【河北防辽舆图沙盘阁】，引导左眉带狰狞枪疤的契丹铁林千夫长【耶律裂山】与四名玄甲死士妄图盗走《河北塘泺布防绢图》。
  - 就在敌将扑近丈余宽微缩山河水寨沙盘一刹，二层雕花回廊百盏琉璃宫灯骤然齐明！紫袍玉带的前宰相【贾昌朝】负手立于高阶羽扇轻摇，大枪宗师【卢铁山】与主角、【郭钧海】等铁壁堵死四门合围死斗！
- **画面核心要素**：
  1. **环境氛围**：极尽震撼的北宋军机楼阁内景——大厅正中横陈一座长达丈余、以黄土青绿塑成的精密宋辽边界《河北塘泺水寨黄河泥塑大沙盘》（山峦起伏、城寨旗帜微缩模型栩栩如生，无文字标牌）；高挑二层木构回廊一圈百余盏琉璃宫灯骤然齐亮，金黄辉煌光芒照彻原本阴森冷月的暗室。
  2. **主体人物**：二层正中回廊高阶之上，紫袍玉带、气质雍容渊深的大宋名相兼留守大人（贾昌朝）手持洁白羽扇从容俯视下方；下方沙盘四周杀声震天——左眉至耳根横跨一道狰狞长疤的悍将（耶律裂山，身披黑甲狂吼着高举六十四斤寒铁破甲巨斧）与四名玄甲死士陷入绝境，角落里身穿官袍吓得抱紫檀匣缩成一团的周文焕瑟瑟发抖；前景正门方向，卢铁山长枪如龙、郭钧海率禁军铁甲与挺刃冲前的年轻主角如铜墙铁壁压上。
  3. **戏剧最高点**：从死寂暗室盗图瞬间转为“百灯齐明、请君入瓮”的壮阔官场武侠大高潮。
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color dramatic ambush painting, wide cinematic 16:9 composition. Inside the soaring Military Sand-Table Pavilion of the Northern Capital Regent Palace in Daming around 1050 AD. Centered on the stone floor stands a magnificent, massive carved clay-and-wood topographic relief table modeling the Yellow River, marsh fortresses, and frontier passes (with tiny blank colored miniature flags). Suddenly, a hundred suspended ornate glass palace lanterns burst ablaze around the upper carved wooden gallery! Standing poised on the high upper balcony in imperial purple Song robes and jade belt, grand statesman Jia Changchao gently waves a white feather fan while looking down. Trapped around the sand table below, scarred black-armored Khitan commander Yelu Lieshan (a jagged spear-scar slashing from his left brow to ear) roars while swinging a huge heavy iron battle-axe alongside four dark-mailed assassins as corrupt official Zhou Wenhuan cowers clutching a rosewood scroll box. Blocking every doorway below, Baji master Lu Tieshan levels his heavy iron spear alongside Constable Guo's armored troops and the surging young hero. Explosive golden lantern light over dark iron, authentic Song palace woodwork, zero text.
  ```

---

### 66. `CG-QST-066`：沙盘阁破晓 · 贾昌朝荐函与卢铁山铁枪双途邀侠图

- **关联文件**：[`src/data/quests/cities/damingBajiQuest.ts`](../src/data/quests/cities/damingBajiQuest.ts)
- **目标路径**：`public/assets/quests/daming_baji_official_choice.jpg`
- **画框题跋**：`沙盘阁尘埃落定 · 贾昌朝执留守荐函与卢铁山擎六合浑铁枪共邀少侠择路`
- **剧情语境**：
  - 恶战落幕、生擒内奸起获三千贯原封河银救出忠徒崔帆坤后，晨曦透入沙盘阁。
  - 左右双壁各自伸出橄榄枝：前宰相【贾昌朝】拟保举主角持《北京留守幕府举荐信》直入开封府授第 2 阶【捕头都头】入仕为国；沧州八极宗师【卢铁山】则不肯相让，敞开秘传室欲将压箱底《六合大枪》与神兵【大名六合浑铁枪】倾囊相授破格奉入内堂。庙堂与江湖，全凭主角一言而决。
- **画面核心要素**：
  1. **环境氛围**：破晓微熹映入已恢复宁静庄严的沙盘阁，地上被押解下去的残敌兵刃痕迹犹在，后方禁军士卒正搬回完好无损的数箱官银木箱与受冤得雪的崔帆坤拱手站在卢婉月身旁。
  2. **主体对称构图**：画面左翼立着风度温雅的紫袍宰辅贾昌朝，双手捧着一封盖有火红大印的绢帛【北京留守举荐信】温言礼贤；画面右翼立着豪迈如山、须发飞扬的黑衣八极宗师卢铁山，双手横托一杆沉浑漆黑的【大名六合浑铁枪】与线装拳枪秘谱豪气招揽；前景中央青砖上，背向画面的主角站在两者正中静静思索抉择。
  3. **太阁魂魄**：《太阁立志传》式“朝堂青云 vs 江湖武魂”分岔路口的最经典仪式感画面。
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color branching choice painting, wide cinematic 16:9 composition. Cool pale dawn light streaming through tall wooden doors into the quieted Sand-Table Pavilion after battle around 1050 AD, Song guards securing recovered silver chests with rescued Baji apprentice Cui Fankun and Lu Wanyue standing gratefully in the distant background. Creating a balanced twin invitation in the mid-ground: on the left side, dignified statesman Jia Changchao in purple Song court robes warmly extends an officially sealed red-wax silk recommendation scroll inviting a path in imperial justice; on the right side, rugged silver-bearded Baji grandmaster Lu Tieshan proudly holds forth a gleaming solid-iron heavy spear and a bound martial manual inviting a free heroic path in the jianghu. Standing centered in the foreground (seen from a thoughtful upright three-quarter back view), the young hero weighs both destinies at the crossroads. Balanced composition of court purple-gold and iron martial grit, zero text.
  ```

---

### 67. `CG-QST-067`：东京樊楼飞桥 · 夜宴灯火截灰衣刺客图

- **关联文件**：[`src/data/quests/adventures/babuganchanQuest.ts`](../src/data/quests/adventures/babuganchanQuest.ts)
- **目标路径**：`public/assets/quests/babuganchan_fanlou_bridge_duel.jpg`
- **画框题跋**：`东京樊楼朱漆凌空飞桥 · 夜宴灯火中截风门灰鹞陆七破窗扑袭`
- **剧情语境**：
  - 亥时三刻汴梁【樊楼】夜宴鼎沸，五座高楼间以朱漆飞桥凌空相连。主角依【程万里】所指潜登东侧三楼回廊，恰见飞桥尽头雅阁窗纸映出截风门墙上壁虎步态的灰衣身影正借灯笼比对泛黄轻功帛书。
  - 灰衣刺客发觉行藏猛然破窗跃出，脚尖连点飞桥斗拱、短刀寒光直扑雅阁；主角拔刃横截于朱漆飞桥灯影之间救护程万里。
- **画面核心要素**：
  1. **环境氛围**：公元 1050 年东京汴梁标志性的樊楼三层以上建筑集群——五座飞檐高楼之间凌空架起悬空朱漆木栏飞桥，飞桥下是璀璨的丝竹灯市与红灯笼连廊（灯笼旗幡全部留白无字）。
  2. **主体人物**：东侧凌空飞桥窄道上，一名身形瘦削如鹰隼的灰衣黑道刺客（截风门高手）刚一脚踹碎雅阁花格木窗凌空飞扑，足尖诡异轻点雕花斗拱，手中亮出一柄短刃直刺而来、衣襟滑出半幅泛黄古绢残卷；迎面主角护在白发苍苍的落魄老者程万里身前，挺身横刃掠身截击。
  3. **夜色飞檐感**：朱漆飞桥悬空与红灯曳影构筑北宋独一无二的空中武侠夜战舞台。
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color nighttime wuxia action painting, wide cinematic 16:9 composition. High above Bianliang's famous five-tower Fanlou tavern complex during a lively night banquet around 1050 AD, where suspended vermilion wooden sky-bridges link elevated pavilions glowing with warm silk lanterns above shadowy rooftops. Bursting out through shattered lattice window paper onto the curved sky-bridge eaves, a gaunt, hawk-like assassin in dark grey attire kicks effortlessly off carved roof brackets with a gleaming short dagger aimed at the gallery, a half-unrolled antique yellow silk scroll tucking from his chest. Stepping immediately in front of elderly scarred scholar-veteran Cheng Wanli in plain robes, the nimble protagonist draws a weapon mid-stride to intercept the assassin along the narrow vermilion sky-bridge. Dramatic nocturnal red lantern glow against deep night sky, blank lanterns, zero text.
  ```

---

### 68. `CG-QST-068`：大相国寺资圣塔顶 · 秋风铜铃初悟蝉蜕息图

- **关联文件**：[`src/data/quests/adventures/babuganchanQuest.ts`](../src/data/quests/adventures/babuganchanQuest.ts)
- **目标路径**：`public/assets/quests/babuganchan_zisheng_pagoda_wind.jpg`
- **画框题跋**：`大相国寺资圣八角琉璃塔顶 · 秋风铜铃盘膝展绢初悟蝉蜕换气诀`
- **剧情语境**：
  - 夺回上卷残绢后，主角登临汴京【大相国寺 · 资圣八角琉璃宝塔】第八层高空回廊檐角，身旁高僧【智明禅师】静默观护。
  - 秋风自八方穿廊吹拂衣袂而不紊呼吸，檐角青铜风铃叮咚清鸣，主角盘膝静坐展卷默会，悟透步未停而气已换的《蝉蜕息》行气真诀。
- **画面核心要素**：
  1. **环境氛围**：宋代大相国寺八角琉璃宝塔第八层极高回廊，八角飞檐悬垂古朴青铜风铃（在秋风中斜摆），凭木栏外俯瞰金秋清冽天气下的浩大汴梁都城街市、汴河画船与苍茫远郊天际。
  2. **主体人物**：八角高塔木廊迎风一角，年轻主角盘膝五心朝天静坐（采用沉稳舒朗的背斜侧视角），膝前摊开一幅写意空白纹路的泛黄丝绢上卷，丝衣袂随狂风高高翻扬而身形如古柏安然不动，仿佛有清微白气流转肺腑之间；一旁廊柱下，年迈慈祥的灰袍老僧（智明禅师）手持念珠合十微笑注视。
  3. **清空哲思**：高空风声与古塔铜铃意象相融，呈现北宋秋日清空辽远的武道悟境。
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color contemplative landscape painting, wide cinematic 16:9 composition. High eighth-story exterior octagonal timber gallery of the Zisheng Glazed Pagoda at Xiangguo Temple in Kaifeng around 1050 AD, bronze wind-bells swinging under upturned eaves in brisk autumn gusts, revealing a breathtaking birds-eye panorama of golden-leaved Bianliang streets, the Bian River canal, and distant horizon mist far below. Seated cross-legged on the wooden gallery floor with an aged pale-yellow silk scroll unrolled across their lap, the young martial artist breathes calmly despite fierce high winds rippling their tunic robes, serene clarity radiating around their posture. Standing peacefully beside a vermilion pagoda column nearby, aged monk Master Zhiming in simple grey robes holds prayer beads with a gentle knowing smile. Serene high-altitude Song autumn atmosphere, mineral blues and warm autumn golds, zero text.
  ```

---

### 69. `CG-QST-069`：洛阳白马寺齐云塔 · 银杏落叶连踏七步图

- **关联文件**：[`src/data/quests/adventures/babuganchanQuest.ts`](../src/data/quests/adventures/babuganchanQuest.ts)
- **目标路径**：`public/assets/quests/babuganchan_baimasi_ginkgo_steps.jpg`
- **画框题跋**：`洛阳白马寺齐云古塔 · 百年银杏落叶连踏七步纹丝不碎证轻功`
- **剧情语境**：
  - 西行洛阳【白马寺 · 齐云密檐舍利古塔】前，古塔青砖地坪铺满深秋干脆金黄银杏落叶。
  - 白马寺守塔居士【青霜姥姥】设下考校：须以新悟《蝉蜕息》行气踩着满地枯脆银杏叶连踏七步，令叶片不翻卷不碎裂方肯授出中卷《振羽步》。主角身如柳絮顺风掠过，七步落足皆如蜻蜓点水、金叶完好无损。
- **画面核心要素**：
  1. **环境氛围**：洛阳白马寺历史悠久的密檐十三级方形宋代青砖齐云古塔院落，院内两株千年巨型金黄银杏树落叶纷纷如黄金雪片，石板地上铺散着金黄干脆的扇形银杏叶。
  2. **主体人物**：半空与青砖地坪仅差毫厘之间，年轻主角衣袍扬起轻盈如风中白鹤（身形修长舒展），右足尖刚好如蜻蜓点水般轻触一片金黄银杏叶中心而叶片纹丝不碎、叶脉完整，身后地面一路接连数片曾被点过的银杏叶皆宛然如初、未见折断；塔阶石栏旁立着披素青麻披风、发丝银白的清癯老妇人（青霜姥姥），目露惊喜赞叹之色。
  3. **轻功诗意**：金黄满院银杏落叶写实而浪漫，直观视觉化表现“身重如铅，气轻如羽”的东方顶流轻功。
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color wuxia lightness-skill illustration, wide cinematic 16:9 composition. Autumn courtyard before the tall multi-tiered square grey-brick Qiyun Relic Pagoda of White Horse Temple in Luoyang around 1050 AD, flanked by towering ancient ginkgo trees shedding golden fan-shaped leaves across the stone flagstones. Gliding weightlessly like a drifting willow catkin just inches above the ground, the agile young hero touches only one tiptoe lightly onto the exact center of a crisp fallen golden ginkgo leaf without bruising or crumbling a single vein, while six previous golden leaves behind their airy stride remain completely unbroken on the dark flagstones. Watching from the stone pagoda steps, slender silver-haired hermitess Grandma Qingshuang in plain pale-slate linen cloak gazes with astonished delight. Luminescent golden autumn ginkgo palette against ancient temple slate grey, graceful flowing robes, zero text.
  ```

---

### 70. `CG-QST-070`：洛阳牡丹园碧溪 · 雨霁秋月八步点水飞檐图

- **关联文件**：[`src/data/quests/adventures/babuganchanQuest.ts`](../src/data/quests/adventures/babuganchanQuest.ts)
- **目标路径**：`public/assets/quests/babuganchan_bixi_moon_water.jpg`
- **画框题跋**：`洛阳牡丹园碧溪琴画水榭 · 雨霁秋月足点八道水纹掠上二层飞檐`
- **剧情语境**：
  - 合齐上中下三卷于洛阳牡丹园【碧溪虹桥琴画水榭】彻悟演练之际，恰逢夜雨渐歇、乌云缝隙漏下一轮清冷秋月，碧溪水面平如明镜。
  - 主角屏杂念发足狂掠，由蝉蜕换气接振羽借风、至第七第八步猛然发力足尖点水而起，在月下碧溪平镜水面上接连踏出八道清浅同心水纹，衣不沾水一气掠上水榭二层木栏飞檐！榭下少女【小阿蝉】拍手欢呼，地阶轻功《八步赶蝉》大成！
- **画面核心要素**：
  1. **环境氛围**：夜雨初晴的洛阳牡丹园碧溪水上双层木制琴画水榭与曲折小木虹桥，云开见清冷圆月，秋露挂满凋谢后的翠绿牡丹枝叶与水边青苇，墨青如镜的水面上清楚倒映着一轮明月。
  2. **主体动态连贯意境**：水面从左至右依次清晰荡开由远及近八道细小清浅、泛着月华银辉的同心涟漪水波，仿佛仙人凌波留步；紧接第八道涟漪上方半空，衣袂不沾半滴水珠的主角身化一道轻烟弧线舒展腾空，足尖已飘然落在水榭二层朱漆雕花木栏飞檐之上长舒清气；底层木廊火灯光亮中，一个扎双丫髻的小女孩（小阿蝉）正仰起脸拍手欢笑雀跃。
  3. **绝世轻功定格**：一幅画完整定格“八步连点水面不沉、一跃凌空上重檐”的宋画诗意极致。
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color poetic nocturnal painting, wide cinematic 16:9 composition. Rain-washed midnight garden beside an arched wooden bridge and a two-story lacquered music-pavilion over peaceful Bixi Stream in Luoyang around 1050 AD; silver autumn moonlight breaks through parting storm clouds, shining down on dark mirror-calm water dotted with autumn lotus pads. Tracing a graceful rhythmic path across the glassy surface, eight delicate concentric silver ripples glow in clean progression across the water—and rising weightlessly straight from the eighth ripple without a single drop wetting their hem, the young martial master soars in a fluid arc onto the second-floor carved eaves of the water pavilion. Below in the warm lantern-lit lower corridor, little girl Xiao A'chan claps joyfully looking up. Exquisite midnight silver-blue moonlight and warm pavilion amber contrast, authentic Song garden woodcraft, zero text.
  ```

---

### 71. `CG-QST-071`：苏州虎丘千人石 · 生公亭仗剑护青年沈括图

- **关联文件**：[`src/data/quests/adventures/yanziwuMapQuest.ts`](../src/data/quests/adventures/yanziwuMapQuest.ts)
- **目标路径**：`public/assets/quests/yanziwu_map_huqiu_shenkuo.jpg`
- **画框题跋**：`苏州虎丘千人石生公亭 · 横身护青年沈括与菱花铜水符截击铁砂恶客`
- **剧情语境**：
  - 皇祐二年姑苏虎丘山半腰【千人石试剑台与生公亭】，年仅二十岁的吴郡青年才子【沈括】（字存中）正携竹尺、罗盘与刚刚转拓核验的太湖【菱花青铜水符】勘测地理子午。
  - 突遭铁掌帮双掌乌黑的恶客掀翻石凳企图强抢，主角飞身掠入生公亭前震开敌掌、横身挡在护住图纸后退半步的沈括身前激战退敌。
- **画面核心要素**：
  1. **环境氛围**：苏州虎丘山名胜大片斜卧的赤褐花岗岩“千人石”与石畔苍松掩映的宋代六角木石生公亭，远景微雾隐现江南青山竹林。
  2. **主体人物**：倾倒的青石圆凳旁石案上摊放着泛黄勘测图样、一把细竹测量直尺、罗盘与那枚铸有精美八角菱花水纹的【菱花青铜水符】；后方年仅二十岁、面容清隽睿智、着素净浅青文士儒衫的青年沈括（手护怀中竹管图纸卷轴微退半步）神情镇定不屈；正前方主角挺身挡在沈括身前，拔刃或出掌凌厉硬撼对面一身横练肌肉、双掌泛起乌黑毒铁色的铁掌帮暴徒。
  3. **文武相济**：历史上二十岁青年科学巨匠沈括与江湖侠客于姑苏名胜同框护宝，别具文化厚重感。
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color historical adventure illustration, wide cinematic 16:9 composition. Mid-slope of Huqiu Hill in Suzhou around 1050 AD beside a broad flat reddish-grey stone terrace (Qianren Stone) and an open timber-and-stone pavilion shaded by gnarled ancient pines in light mist. Beside a kicked-over stone stool near a stone table strewn with blank survey paper, a bamboo measuring ruler, a small compass, and an ornate antique bronze lotus-caltrop water tally, a bright-eyed 20-year-old Song scholar-prodigy (Shen Kuo, handsome clean robes, hair neatly bound in a Song scholar scarf) steps back calmly while cradling an oiled map tube. Shielding him squarely in the foreground, the young protagonist pivots dynamically to intercept a fierce muscular bandit whose blackened iron-sand stained palms lash toward the table. Classic Song mineral greens and warm ochre rock textures, zero text.
  ```

---

### 72. `CG-QST-072`：扬州二十四桥水阁 · 柳永康广陵抚琴破词隐图

- **关联文件**：[`src/data/quests/adventures/yanziwuMapQuest.ts`](../src/data/quests/adventures/yanziwuMapQuest.ts)
- **目标路径**：`public/assets/quests/yanziwu_map_24bridge_cipher.jpg`
- **画框题跋**：`扬州二十四桥明月坊水阁 · 柳永执酒令笺与康广陵抚琴共破盐船暗码`
- **剧情语境**：
  - 黄昏将尽、二十四桥明月渐生、红药花香顺水飘来，主角登临扬州【二十四桥明月坊平山清韵琴词水阁】。
  - 席间白衣风流词宗【柳永】（柳耆卿）微醺把玩一张水匪改动过的酒令词笺吟笑点破句格不合，逍遥派“琴癫”【康广陵】玉指按上焦尾古琴琴徽冷笑辨出“梅花数”敲桌拍节，与主角合力破译出淮南盐船密藏《广陵漕渠水深卷》之方位密码。
- **画面核心要素**：
  1. **环境氛围**：北宋淮扬盛景“二十四桥明月夜”——阁外雕栏白石桥拱跨波而过，水畔红芍药花影与锦绣画舫点点，暮蓝天际挂起一弯渐明秋月，室内雕窗半敞，陈列花梨琴案、青瓷酒壶与三五果盘。
  2. **主体人物**：水阁中三人对席雅聚——临窗靠栏而坐的放浪白衣名士（柳永，头戴逍遥幅巾、微醺潇洒）修长手指轻捻一张空白纹样红纸酒令笺笑指句读破绽；花梨木矮案旁端坐的清癯孤傲中年琴师（康广陵，青灰窄袖长袍）左手重重按在名贵黑漆焦尾七弦古琴弦徽上、余音似有涟漪震动盏中清酒；对坐的年轻主角倾身展看水纹勘图细细推演梅花拍数。
  3. **风流雅集**：词仙、琴癫与游侠同堂解谜，堪称宋代江湖最具文人风骨的破阵场面。
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color literati-mystery illustration, wide cinematic 16:9 composition. Twilight rising into silver moonlight at an exquisite timber waterside pavilion overlooking arched white-stone Twenty-Four Bridges, blooming crimson herbaceous peonies, and glowing painted riverboats in Yangzhou around 1050 AD. Seated casually by the carved balcony railing, dashing white-robed poet-scholar Liu Yong (Song cloth scholar cap, slightly tipsy serene smile) holds up a narrow crimson tavern song-slip while pointing out a puzzling rhythm flaw. Seated beside a low pearwood table, lean stern qin-master Kang Guangling in slate-grey narrow sleeves presses sharp fingers firmly onto the strings of a charred-tail seven-string guqin, resonating ripples across nearby porcelain wine bowls. Opposite them, the young traveler leans forward intently tracing coordinates over a blank scroll sheet. Romantic Yangzhou twilight blues, peony crimson, and warm lantern amber, zero text.
  ```

---

### 73. `CG-QST-073`：扬州盐帮兵器院 · 雪盐麻栈后破盛黑风铁爪图

- **关联文件**：[`src/data/quests/adventures/yanziwuMapQuest.ts`](../src/data/quests/adventures/yanziwuMapQuest.ts)
- **目标路径**：`public/assets/quests/yanziwu_map_yangzhou_salt_arena.jpg`
- **画框题跋**：`扬州淮南盐帮兵器演武院 · 雪白官盐栈后迎战裂碑铁爪盛黑风夺水深卷`
- **剧情语境**：
  - 查实内鬼藏匿栈房，淮南盐帮总堂主【顾长风】怒引主角穿过堆积如雪山的官盐麻袋长栈，直趋【十八般兵器演武院】。
  - 铁掌帮巡江副舵主“裂碑铁爪”【盛黑风】赤膊披狼皮坎肩、戴乌钢精铁护腕正将熟铜箱塞入行囊，见行迹败露踢翻石凳狂扑而来，旁边心虚的【雷毅洲】惊退兵器架后，主角当场仗义截战夺回中卷《水深卷》。
- **画面核心要素**：
  1. **环境氛围**：扬州漕运帮派大气粗犷的兵器演武大院，后方紧连着屋檐敞开高堆至梁如皑皑雪丘般的百十麻袋洁白官盐（旁散粗麻绳与撬开木盐箱），院侧排列插满戈戟刀叉斧钺的十八般兵器木架与倾倒碎裂的石凳。
  2. **主体人物**：院场石亭前爆发近身硬碰交锋——身高体壮、赤膊露肌肩披野狼毛坎肩、双臂戴着带森冷爪刃精铁护腕的恶汉（盛黑风）面目狰狞踢翻青石圆凳猛扑，身畔滚落一只撬开的熟铜卷宗铁箱（隐露防水牛皮卷筒）；正前方主角欺身抢攻稳压阵脚，身形灵动直取其腕门破其铁爪；院口高大硬朗的老盐帮主顾长风按刃压阵，兵器架暗角处惊惶缩躲着身穿旧盐客服的雷毅洲。
  3. **市井江湖气**：雪白盐山与乌黑兵器铁爪色彩鲜明夺目，写尽两淮盐帮漕运江湖的悍勇血性。
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color gangland courtyard battle painting, wide cinematic 16:9 composition. Sprawling stone training arena of the Huainan Salt Guild in Yangzhou around 1050 AD, flanked in the background by towering mountains of burlap sacks bursting with snow-white sea salt inside open timber warehouses and tall wooden racks bristling with eighteen types of Song iron weapons. Near a fallen stone bench and a pried-open copper document chest in the foreground, ferocious bare-chested enforcer Sheng Heifeng—draped in a ragged wolf-pelt vest with heavy forged-iron spiked wrist-claws clashing together—lunges savagely at the agile young protagonist stepping in cleanly to strike his wrist and reclaim the rolled river-depth chart. Holding the courtyard perimeter stands stern guild leader Gu Changfeng, while treacherous informant Lei Yizhou shrinks guiltily behind a tall halberd rack. Stark snow-white salt vs dark forged iron and ochre stone, dynamic Song martial grit, zero text.
  ```

---

### 74. `CG-QST-074`：江宁石头城赤壁 · 大江暮涛激斗断浪焦沧澜图

- **关联文件**：[`src/data/quests/adventures/yanziwuMapQuest.ts`](../src/data/quests/adventures/yanziwuMapQuest.ts)
- **目标路径**：`public/assets/quests/yanziwu_map_shitou_red_cliff.jpg`
- **画框题跋**：`江宁石头城虎踞赤壁试剑台 · 大江暮涛迎战断浪铁掌焦沧澜夺星度卷`
- **剧情语境**：
  - 暮色苍茫大江东去，主角登临江宁府【石头城遗址虎踞赤壁临江试剑台】。脚下万里长江白浪狠狠拍碎在赭红色千年崖壁之上。
  - 试剑台尽头，双臂粗壮如铁铸、鬓发微霜的黑袍老者——铁掌帮江南分水堂主“断浪铁掌”【焦沧澜】脚下刚刚震碎两具百斤石锁，双掌搓磨出金铁沙响迎风邀战，誓要截杀主角并收苏州、扬州两卷水图。
- **画面核心要素**：
  1. **环境氛围**：六朝古都金陵（江宁）极具历史厚重感的石头城遗址赤红断崖绝壁（赭石斑驳岩层裸露），高踞悬空临江古试剑石台之上，背后苍茫残阳映得滚滚万里长江如一条血金与靛青交错奔流的巨龙，峭壁下方巨浪撞出千堆雪沫。
  2. **主体人物**：风势狂烈吹乱黑衣衣袍的悬崖试剑台尽头，鬓发微霜却双臂粗如黑铁铸就的黑袍老宗师（焦沧澜）微躬身躯双掌并推拍出浑厚刚猛铁砂掌劲，身畔青石台上赫然裂着两块被硬生生震碎炸开的残破石锁；崖台另一端衣袂猎猎的主角无所畏惧迎风抢步进击，背后背负先前所得水图木筒。
  3. **江山战意**：赭红绝壁、惊涛骇浪与宗师硬功铁掌构成极富雄浑悲壮史诗美感的江南大战定格。
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color cliffside duel masterpiece, wide cinematic 16:9 composition. High atop the precarious red-sandstone Sword-Testing Terrace protruding from the ancient Stone Citadel Red Cliff above the surging Yangtze River in Jiangning (Nanjing) around 1050 AD; far below, massive white-crested river waves explode against steep weathered crimson rock faces under a blazing bruised-gold dusk sky. At the windy stone cliff edge, fierce frost-templed elder master Jiao Canglan in billowing black robes—forearms thickened like hammered black iron—slams forward with devastating Iron-Palm force right beside two heavy stone weight-locks shattered cleanly on the ground. Bracing firmly against the gale in the foreground (three-quarter back view), the valiant young protagonist charges forward with weapon drawn to claim the third star-chart scroll. Monumental crimson cliffs, roaring indigo river currents, fierce dusk wind, zero text.
  ```

---

### 75. `CG-QST-075`：太湖烟波锦帆画舫 · 沈括合绘水图蒋平包不同共证图

- **关联文件**：[`src/data/quests/adventures/yanziwuMapQuest.ts`](../src/data/quests/adventures/yanziwuMapQuest.ts)
- **目标路径**：`public/assets/quests/yanziwu_map_taihu_boat_unite.jpg`
- **画框题跋**：`太湖烟波渡口锦帆画舫 · 沈括执铜规罗盘合绘三叠全图蒋平包不同共证`
- **剧情语境**：
  - 历经苏、扬、金陵三府斩将夺卷后，诸贤重聚于苏州【太湖烟波渡口锦帆画舫】。船舱窗外八百里太湖晴空碧波、东西洞庭青螺浮浪。
  - 青年【沈括】手执紫毫与铜圆规罗盘将水深、星度、水符三卷校准合璧于一张澄心堂长卷（朱墨双色绘出百里水路与七十二梅花暗桩）；【蒋平】抚掌大笑敬上一杯洞庭绿蚁酒，连惯爱唱反调的【包不同】也轻轻合拢折扇在旁郑重颔首默认“归你执掌”，湘妃竹图轴交入主角手中。
- **画面核心要素**：
  1. **环境氛围**：宋代水乡极精致奢雅的双层太湖大画舫主舱厅，雕花长窗三面完全推开迎进浩瀚太湖青绿碧波与远方螺黛洞庭群山，舱案焚香袅袅，摆有白鱼羹与洞庭绿蚁碧酒瓷碗（船帆素色无字）。
  2. **主体人物**：舱中黑漆大案四周四人神态各异、栩栩如生——青年才俊沈括正伏案一手执黄铜圆规测校、一手持细毛笔于雪白大幅澄心堂纸绘就朱墨双色太湖繁复迷宫航道图（线条精密如地图工笔而无字）；旁立精瘦睿智、留两撇鼠须的长衫水乡侠客“翻江鼠”蒋平眉开眼笑捧杯相敬；右侧斜倚着着青衫、手拿折扇轻敲掌心撇嘴却流露认可神气的包不同；左侧年轻主角面迎湖风喜接湘妃竹精装舆图画轴。
  3. **宋代科技美学**：致敬《梦溪笔谈》前传里的北宋青年科学家与江湖侠豪跨界共绘舆图的奇幻浪漫。
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color ensemble scene, wide cinematic 16:9 composition. Inside the sunlit, carved-windowed main cabin of a grand embroidered-sail lake barge gliding over vast misty blue-green waters of Lake Taihu dotted with distant emerald peaks around 1050 AD. Across the long black-lacquer table, young Song scientist-prodigy Shen Kuo uses a brass drafting compass and fine wolf-hair brush to unite an intricate vermilion-and-ink waterways sea-chart (delicate contour channels and reef dots, zero readable text) on crisp white Song paper alongside a carved bronze water tally. Laughing heartily while raising a jade wine cup of Taihu brew is wiry sharp-eyed river hero Jiang Ping; beside him, eccentric scholar-retainer Bao Butong taps a folded paper fan against his palm with grudging nod of approval. Facing them joyfully, the protagonist prepares to receive the Xiangfei bamboo scroll tube. Warm sunlight over Lake Taihu teal, bamboo, and cream paper, zero text.
  ```

---

### 76. `CG-QST-076`：苏州虎丘云岩古塔 · 暮霭石阶截黑鲨盗夺罗盘图

- **关联文件**：[`src/data/quests/adventures/taohuadaoMapQuest.ts`](../src/data/quests/adventures/taohuadaoMapQuest.ts)
- **目标路径**：`public/assets/quests/taohuadao_map_huqiu_compass.jpg`
- **画框题跋**：`苏州虎丘七级微倾云岩古塔 · 暮霭石阶仗剑截击海寇鲨七郎夺璇玑潮信盘`
- **剧情语境**：
  - 暮霭沉沉、晚钟余音未歇，主角沿青石长阶登上苏州虎丘山巅已有百年历史、七级八面微微倾斜的宋代【云岩寺古塔】。
  - 塔基东侧阴影石函旁，一名耳坠洁白鲨鱼齿环、身着紧身油浸防水水靠的精瘦海寇正蹲地用匕首撬拭劫来的【东海璇玑潮信盘】；见主角赶到，“海鬼”【鲨七郎】暴起双刀交叉划出两道阴寒水光猛扑而来。
- **画面核心要素**：
  1. **环境氛围**：极高辨识度的苏州地标“宋代云岩寺七级八面微倾青砖古塔”（塔身轻微左倾、逐层出檐灵动），暮霭苍紫映照山巅青松与漫长古朴青石阶梯，塔基旁散落一个撬开半边的小石函。
  2. **主体人物**：古塔基座东侧石阶平台之上，一名身形精瘦矮悍、耳垂挂着显眼森白鲨齿耳环、着漆黑发亮油浸水靠的海寇探子（鲨七郎）双足蹬地暴起跃半空，左右两手交叉反握两口雪亮渔民短双刀凶狠扑刺；其身畔石面上正放着一只雕刻精美八卦潮信刻度与青铜磁针的【东海璇玑青铜潮信盘】（盘面仅刻简约卦爻线条无文字）；台阶下主角昂首挺身、拔剑横格冷然拦截。
  3. **地标历史感**：公元 1050 年即已微倾而立的宋代云岩古塔（前身为北宋初建）成为太湖与东海海图奇遇第一幕的绝佳地理印记。
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color twilight pagoda clash, wide cinematic 16:9 composition. Dusk settling in violet mist atop Huqiu Hill in Suzhou around 1050 AD, dominated by the iconic, subtly tilted seven-story octagonal brick Yunyan Temple Pagoda rising majestically behind twisted mountain pines and long stone stairs. Near a pried-open stone coffer on the eastern pagoda terrace where rests an ornate antique bronze tidal compass embossed only with clean radial notches and bagua lines, a wiry agile pirate scout (Sha Qilang, wearing shiny oil-soaked dark sea-diving garb and a jagged white shark-tooth earring) leaps violently out of the shadows with crossed twin short blades flashing silver. Stepping cleanly up the steps in the foreground (three-quarter back view), the resolute young hero draws a straight sword across the chest to block and seize the bronze tidal compass. Rich violet twilight sky and ancient terracotta brick contrast, zero text.
  ```

---

### 77. `CG-QST-077`：杭州万松书院印书坊 · 毕昇胶泥活字拓海图密版图

- **关联文件**：[`src/data/quests/adventures/taohuadaoMapQuest.ts`](../src/data/quests/adventures/taohuadaoMapQuest.ts)
- **目标路径**：`public/assets/quests/taohuadao_map_wansong_bisheng.jpg`
- **画框题跋**：`杭州万松湖山书院印书坊 · 神匠毕昇竹镊排检胶泥活字与商杏璇参暗礁版`
- **剧情语境**：
  - 皇祐二年（1050）尚在杭州两浙一带隐居专研活字印书的千古发明神匠【毕昇】，正于【万松湖山书院】后厢印书作坊中以松脂药蜡铁板与细竹镊排检火烧胶泥活字。
  - 才女【商杏璇】引主角拜谒毕神匠并呈验【东海璇玑潮信盘】，毕昇即从暗格取出珍藏的三枚刻有奇门暗礁符号的备用活字泥模，讲述按洛书九宫口诀临时排版拓印海图之奇思，三人共商破黑鲨帮窃宝之危。
- **画面核心要素**：
  1. **环境氛围**：书香竹影环抱的南宋风雅之前身北宋杭州万松书院后厢工坊，木架陈列木刻板、成摞宣纸、炭火小泥炉与松脂墨盒，窗外可见万松青翠与西湖一角烟山。
  2. **主体人物**：工坊暖光松木长作台旁，年长慈和、双手沾着些许灰白陶泥与墨渍的布衣老匠师（毕昇，穿素净粗麻灰布工装挽袖）正稳稳拿着一对极精巧的细竹镊子，在一个微微冒热气的黑铁盘松脂药蜡框上摆弄十几枚指节大小的黑褐火烧胶泥活字印模（泥字顶部只雕刻纯几何礁石点划符印而不出现可辨认AI乱码汉字），旁开一个小木暗盒内盛着三枚备用泥字；左侧秀雅聪慧的青年桃花岛女弟子（商杏璇，淡绯水绿宋式衫裙，柳眉微蹙）手托青铜潮信盘倾身端详；前景主角俯身共同参研。
  3. **硬核北宋科学**：北宋庆历皇祐年间毕昇泥活字发明史实与奇门海图暗号深度融合，游戏人文气息独步一时。
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color artisan workshop illustration, wide cinematic 16:9 composition. Sunlit wooden printing studio tucked inside bamboo-and-pine shaded Wansong Academy in Hangzhou around 1050 AD, shelves stocked with blank paper stacks, ink-rollers, and a small glowing clay brazier. Leaning over a warm iron tray coated with melted rosin and beeswax, legendary humble inventor Bi Sheng (kindly weathered elder artisan in rolled coarse-linen work robes with faint clay and soot on his fingers) uses delicate bamboo tweezers to arrange tiny fired black-clay movable-type blocks carved strictly with geometric reef-dots and abstract trigonometric marks (strictly zero readable Chinese characters), beside a small open cedar box holding three spare clay blocks. Standing thoughtfully beside him, graceful young scholar-maiden Shang Xingxuan in pale celadon-jade Song silk holds the bronze tidal compass with furrowed brows while the young protagonist studies the movable-type matrix closely. Warm sunlit wood, ink black, and bamboo greens, authentic 1050 AD craftsmanship, zero text.
  ```

---

### 78. `CG-QST-078`：杭州钱塘江观潮台 · 曲沧浪横抚铁琴听潮破刀律图

- **关联文件**：[`src/data/quests/adventures/taohuadaoMapQuest.ts`](../src/data/quests/adventures/taohuadaoMapQuest.ts)
- **目标路径**：`public/assets/quests/taohuadao_map_qiantang_qin_tide.jpg`
- **画框题跋**：`杭州钱塘江观潮台琴歌台 · 白练怒潮奔涌曲沧浪横抚铁琴授三叠破刀律`
- **剧情语境**：
  - 赶往两浙市舶司决战黑鲨岛主前夕，主角登临钱塘江畔高耸的【观潮台飞桥灯廊琴歌台】。但见江天一色，远方一线雪白巨潮伴着闷雷般咆哮滚滚涌来。
  - 桃花岛前辈“东海琴魔”【曲沧浪】于凌江琴台迎风横膝抚一具奇特玄铁古琴，琴音铮琮竟与江潮三进一退韵律丝丝相扣，借此点破屠海蛟大环叠浪刀三叠后丹田必露破绽之秘。
- **画面核心要素**：
  1. **环境氛围**：临钱塘大江悬挑而建的宋式飞檐凌空琴歌木台，身下万里开阔江水正上演震撼天地的钱塘涌潮奇观——一条丈余高如银河坠地般的雪白卷浪墙横贯远天江心奔腾扑岸、水汽漫天如烟！
  2. **主体人物**：飞桥琴歌台尽头苍老劲健石墩上，须发微乱、身披海青色大袖布袍、气度孤高出尘的“东海琴魔”曲沧浪迎江风盘膝安坐，双膝横着一张隐泛乌黑金属冷光的特殊玄铁古琴，右手指压徽弦、目光如电望向身前肃立静听的年轻主角；强风卷动二人衣摆如旗。
  3. **声律意境**：天地排空雪白怒潮与一具孤傲玄铁古琴交响共振，化无形声律与算学节拍为破敌绝招。
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color scenic-martial painting, wide cinematic 16:9 composition. High timber viewing terrace cantilevered above the wide Qiantang River outside Hangzhou around 1050 AD; across the vast river expanse approaches the awe-inspiring Qiantang tidal bore—a towering rolling silver-white wall of roaring foam stretching horizon to horizon under misty golden-grey clouds. Seated cross-legged on a stone bench at the windy terrace tip, untamed senior master Qu Canglang (wearing billowing sea-blue coarse Song robes, windswept hair and beard) rests a striking dark forged-iron guqin across his knees, pressing the strings in precise cadence with the crashing tide while imparting secret rhythmic combat wisdom to the attentive young hero standing cleanly in the foreground (seen from a three-quarter rear view). Grand scale of surging white tidal waters against weathered Song woodwork and dark iron, zero text.
  ```

---

### 79. `CG-QST-079`：杭州两浙市舶司船坞 · 决战鲨皮独眼巨寇屠海蛟图

- **关联文件**：[`src/data/quests/adventures/taohuadaoMapQuest.ts`](../src/data/quests/adventures/taohuadaoMapQuest.ts)
- **目标路径**：`public/assets/quests/taohuadao_map_dock_shark_boss.jpg`
- **画框题跋**：`杭州两浙市舶司临江演武船坞 · 怒浪浓烟决战鲨皮独眼巨寇屠海蛟夺紫檀印匣`
- **剧情语境**：
  - 晚潮拍岸，杭州两浙市舶司海港西侧【临江演武船坞】停泊三艘虎视眈眈的海盗快船，浓烟与火把在江风中明灭。
  - 身高八尺、满脸横肉披着灰褐鲨鱼皮重甲的独眼东海巨寇——黑鲨岛主【屠海蛟】正持一柄沉重锯齿大环刀立于船坞石坪正中，一脚死死踩住抢来的紫檀活字印匣狂笑；主角依曲沧浪所授潮信三进一退律法，迎风拔刃踏上船坞正面死斗！
- **画面核心要素**：
  1. **环境氛围**：宋代东南第一海贸港口两浙市舶司临江大船坞，船坞石坪旁耸立正在修造的北宋巨型福船巨大弯曲龙骨船肋与高桅索具，晚潮黑蓝江浪高高拍溅湿滑石岸，栈桥停靠三艘深褐快帆海盗船、船头燃着粗焦油火盆。
  2. **主体人物**：船坞石坪正中，身躯如铁塔般高大压迫的东海贼首屠海蛟（左眼覆黑革眼罩、虬髯满面横肉、身披质地粗糙却极厚实的灰暗鲨皮重甲）右足狠狠踏在一只精美雕花紫檀方匣之上，单手扛着一柄串满响环的六合厚背大环砍刀狂笑挥指；前景主角身形矫健却凛然不惧，横刃护胸踩准第三拍反攻步点踏石迎战。
  3. **海港硬仗**：大宋海港船坞巨舰龙骨架构与狰狞海寇重刀对峙，展现东海奇遇线最有压迫感的 Boss 大决战。
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color harbor boss duel painting, wide cinematic 16:9 composition. Timber shipbuilding drydock and stone wharf at the Liangzhe Maritime Trade Bureau port in Hangzhou at stormy dusk around 1050 AD, towering wooden ribs of a giant Song ocean-going junk and three dark swift pirate sailboats with burning pitch-braziers tossing on surging tidal waves beside the wooden pier. Straddling the center of the wet stone wharf stands monstrous eight-foot one-eyed pirate lord Tu Haijiao—wearing jagged grey-brown sharkskin scale heavy armor and a leather eyepatch, planting one heavy boot atop a seized carved sandalwood seal box while leveling a massive ringed heavy chopping broadsword with fierce roaring mockery. Bracing cleanly in the foreground with drawn steel weapon and steady wind-blown cloak, the focused young protagonist advances swiftly in rhythm to strike. Dramatic sea-spray, fiery wharf smoke, Song maritime engineering details, zero text.
  ```

---

### 80. `CG-QST-080`：苏州太湖望湖水榭 · 陆玄机朱毫校定鲛绡海图授玉筒图

- **关联文件**：[`src/data/quests/adventures/taohuadaoMapQuest.ts`](../src/data/quests/adventures/taohuadaoMapQuest.ts)
- **目标路径**：`public/assets/quests/taohuadao_map_wanghu_silk_chart.jpg`
- **画框题跋**：`苏州太湖洞庭奇石望湖水榭 · 陆玄机朱毫校定雪白鲛绡海图亲授青玉图筒`
- **剧情语境**：
  - 斩除黑鲨帮护全两浙海防后，主角重返洞庭奇石环抱的苏州太湖【望湖水榭】。
  - 桃花岛阵主【陆玄机】挥动朱砂狼毫在轻薄半透如云雾的南海鲛绡绢幅上补完最后一道九宫生门潮线，将泥印暗礁、二十四节气晷影与海道合校无误；随后将卷入青玉竹节长筒中的《东海桃花岛奇门海道舆图》双手郑重奉予主角，邀其来日扬帆一睹桃花仙岛真容。
- **画面核心要素**：
  1. **环境氛围**：江南精致绝伦的湖石望湖水榭，窗外太湖秋水清阔、点缀形态奇崛孔洞玲珑的宋代徽宗前太湖洞庭奇石（花石纲风雅原生态景致），案头旁摆一截精致折枝红桃或梅枝清供瓶。
  2. **主体人物**：轩敞靠湖紫檀长画案后，风仪俊雅、白衣清癯如神仙中人的桃花岛算学奇门名家（陆玄机）刚停下手中沾满鲜艳朱砂的细狼毫，低垂的画案上正展开一幅如雪轻透、略带银白海波光泽的稀世南海鲛绡长绢海图（上面以红黑两色细密勾勒岛屿漩涡潮汐星位线而不出现任何汉字文字）；陆玄机一手微笑着将另一副已卷好封入温润青玉竹节长筒中的全图珍重递向主角，商杏璇在旁欣慰微笑观礼；主角拱手欣然接过玉筒。
  3. **仙岛序曲**：清透洁白的鲛绡海图、温润青玉筒与洞庭太湖水天辉映，为下一卷出海前往神秘《东海桃花岛》留下无限浪漫遐想。
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color luminous conclusion painting, wide cinematic 16:9 composition. Inside the serene Lake-View Water Pavilion framed by naturally sculpted, hole-perforated Taihu garden rocks overlooking tranquil blue-green lake waters around 1050 AD, a celadon vase holding blossoming red peach twigs sitting quietly by the sunlit window. Behind a refined long rosewood drafting table, serene graceful Qimen strategist Lu Xuanji in flowing white-and-pale-blue Song scholar attire sets down a fine vermilion-tipped wolf-hair brush; across the table glistens an ethereal, translucent snow-white sea-silk nautical chart traced meticulously in crisp vermilion and black contour lines depicting islands, reef swirls, and tidal paths (strictly geometric and ornamental, zero text). Smiling warmly, Lu Xuanji extends a lustrous green-jade bamboo-joint map cylinder with both hands to the delighted protagonist (three-quarter rear view), as Shang Xingxuan looks on happily beside the lattice screen. Ethereal Song literati mineral white, celadon-jade, and vermilion hues, zero text.
  ```

---

### 81. `CG-QST-081`：开封府刑名架阁卷宗楼 · 红烛夜验燕尾北铁与勾股密押图（已完成 ✅）

- **关联文件**：[`src/data/quests/sects/jinjunHebeiSpyQuest.ts`](../src/data/quests/sects/jinjunHebeiSpyQuest.ts)
- **目标路径**：`public/assets/quests/jinjun_spy_kaifeng_horseshoe.jpg`
- **画框题跋**：`开封府架阁库红烛夜验 · 围案勘破双槽燕尾北马蹄铁与千字文勾股残账`
- **剧情语境**：
  - 卷一第六幕，主角身披大宋禁军四厢都指挥紫金甲袍重返旧衙开封府刑名架阁卷宗楼，与包拯、展昭、公孙策围案夜验暮春虹桥西夏刺客遗留坐骑蹄铁与焦黑残账。
  - 从幽燕苦寒冰河专用的“双槽燕尾防滑马掌”与勾股移位算学暗码，一举勘破西夏刺驾背后实乃辽国北院暗桩渗透京营群牧司。
- **画面核心要素**：
  1. **环境氛围**：北宋开封府刑名架阁卷宗楼内景，两列高耸楠木书卷架隐入暖暗阴影，高脚铜烛台红烛高烧。
  2. **主体人物**：紫檀长案后，黑面紫袍展脚幞头的包拯凝重肃立，红袍带刀的展昭、手持象牙算筹的公孙策与紫金织锦甲袍的年轻禁军四厢统领主角共同端详双槽铁马掌与火漆残卷。
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color candlelight investigation painting, wide cinematic 16:9 composition. Inside the towering timber Judicial Archives Pavilion of Kaifeng Prefecture at night around 1050 AD, rows of tall nanmu scroll shelves receding into warm shadows, tall red wax candles flickering in bronze candlesticks. Around a long rosewood table stand four figures: dignified dark-faced Magistrate Bao Zheng in purple Song futou official robes, crimson-robed royal guard swordsman Zhan Zhao, scholarly advisor Gongsun Ce holding ivory counting rods, and the young Imperial Guard commander protagonist in dark purple-and-gold martial brocade examining a heavy forged iron horseshoe with twin swallowtail ice-grooves beside a half-charred hemp ledger sheet (strictly abstract ink lines and wax seals, zero text or characters). Rich mineral pigments, authentic Northern Song court brushwork, zero modern elements, zero text.
  ```

---

### 82. `CG-QST-082`：真定宋辽边境榷场 · 寒夜惊马截杀北院急递双使图

- **关联文件**：[`src/data/quests/sects/jinjunHebeiSpyQuest.ts`](../src/data/quests/sects/jinjunHebeiSpyQuest.ts)
- **目标路径**：`public/assets/quests/jinjun_spy_zhending_horsemarket.jpg`
- **画框题跋**：`真定宋辽榷场寒夜雪战 · 惊马碎灯间截杀北院急递双煞夺取玄铁半符`
- **剧情语境**：
  - 卷二第十五~十六幕，子夜鹅毛大雪席卷真定府北【宋辽边境榷场 · 塞北契丹良驹互市马栏】。
  - 辽国北院急递掌符使【韩延寿】与乌桓悍骑【述律铁爪】察觉败露，踢翻炭火铜盆引燃草棚、吹响骨哨惊动塞北烈马企图突围；主角踏栏横刃于漫天风雪火光中截杀双煞，夺下半枚幽燕玄铁军符。
- **画面核心要素**：
  1. **环境氛围**：公元 1050 年河北真定宋辽互市马栏雪夜，倾覆燃烧的炭火铜盆火星飞溅入纷飞白雪，后方契丹皮毛大毡帐与受惊人立嘶鸣的乌桓战马形成强烈动势。
  2. **主体人物**：前景积雪地上，披玄色大氅、内着紫金四厢甲衣的主角横剑突进；对面两名契丹高手悍然迎战——一人手握修罗长弯刀、腰悬半块乌黑玄铁虎符腰牌（注意为金属兵符切勿画成真鱼），另一人披狼毛铁甲挥舞重装铁蒺藜狼牙棒。
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color snowy night martial battle painting, wide cinematic 16:9 composition. At the Song-Liao border horse trade market outside Zhending Prefecture on a snowy winter night around 1050 AD: wooden horse corrals, a toppled burning copper brazier sending fiery embers into swirling snowflakes, dark Khitan felt tents with wolf-pelt streamers, startled northern warhorses rearing in the background. In the snowy foreground, the gallant Northern Song Imperial Guard commander protagonist in dark cloak and purple-gold brigandine slashes forward with a gleaming sword to intercept two fierce Khitan secret couriers—one wielding a long curved Xiuluo saber with a split dark-iron bronze military tally hanging at his belt, the other swinging a heavy spiked iron mace in fur-trimmed lamellar armor. Dramatic firelight against blue-silver snow, authentic Song brushwork, blank banners with zero text or characters.
  ```

---

### 83. `CG-QST-083`：真定隆兴大佛寺大悲宝阁 · 七丈铜铸千手观音密议图

- **关联文件**：[`src/data/quests/sects/jinjunHebeiSpyQuest.ts`](../src/data/quests/sects/jinjunHebeiSpyQuest.ts)
- **目标路径**：`public/assets/quests/jinjun_spy_longxing_guanyin.jpg`
- **画框题跋**：`真定隆兴寺大悲阁 · 七丈铜铸千手观音法相前密破萧远风南下接应天机`
- **剧情语境**：
  - 卷二第二十一幕，主角随五台山清凉寺护关武僧【李正鹤】与真定边军都监【郭逵】登临北宋名刹隆兴寺三层重楼【大悲千手观音宝阁】。
  - 在开宝年间敕铸的高达七丈三尺四十二臂千手铜观音法相与数百盏酥油长明灯映照下，李正鹤密告在白沟河亲睹辽南京武林统制萧远风南下督办黄河渡口交接之惊天情报。
- **画面核心要素**：
  1. **环境氛围**：北宋真定隆兴寺大悲阁宏伟木构三层通高内景，殿心耸立顶天立地的七丈青铜鎏金四十二臂大悲观音立像，层叠铜臂如莲舒展，下方供台数百盏酥油铜灯暖光摇曳。
  2. **主体人物**：前景二层木构平坐勾栏旁，魁伟刚毅的五台山灰褐僧袍武僧（李正鹤）双掌合十低语，身披宋代边军黑铁甲的宿将郭逵按剑凝听，年轻禁军四厢统领主角凭栏侧立神情凛然。
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color solemn temple espionage painting, wide cinematic 16:9 composition. Inside the towering three-story timber Pavilion of Great Compassion at Longxing Temple in Zhending around 1050 AD, dominated by the colossal seventy-foot cast-bronze Forty-Two-Armed Thousand-Hand Guanyin bodhisattva statue glowing softly above hundreds of flickering butter lamps. On the upper wooden gallery balustrade in the foreground stand three figures in quiet counsel: a stalwart Wutai Mountain warrior monk in grey-ochre robes with palms pressed together, veteran Song border commander Guo Kui in dark iron-plated Song armor, and the young Imperial Guard commander protagonist in purple-gold martial attire listening intently. Awe-inspiring sacred scale, mineral gold, malachite, and warm lamp-amber hues, authentic Song dougong brackets, zero text or characters.
  ```

---

### 84. `CG-QST-084`：北京大名府留守行宫 · 河北防辽沙盘合符定计图（已完成 ✅）

- **关联文件**：[`src/data/quests/sects/jinjunHebeiSpyQuest.ts`](../src/data/quests/sects/jinjunHebeiSpyQuest.ts)
- **目标路径**：`public/assets/quests/jinjun_spy_daming_sandtable.jpg`
- **画框题跋**：`北京留守行宫沙盘定计 · 持殿前司鎏金虎符抉择铁甲封渡或河朔群侠奇兵`
- **剧情语境**：
  - 卷三第二十八幕，主角于大名校场拿下叛校韩崇矩后，星夜赶入陪都【北京留守行宫 · 河北防辽舆图沙盘阁】会见贝州平叛猛将【王信】。
  - 巨幅黄河九曲与铁索浮桥立体木沙盘前，主角高举半枚鎏金密查虎符与驻防虎符合验，定夺官军铁甲封渡或河朔群侠奇兵之合围大略。
- **画面核心要素**：
  1. **环境氛围**：北宋陪都大名府留守行宫沙盘阁，高大青铜灯树映亮堂中两丈长的黄杨木山川黄河立体沙盘（沙盘微缩浮桥与纯色小令旗纤毫毕现，无任何文字）。
  2. **主体人物**：沙盘左侧河北猛将王信披重甲按腰刀肃立，沙盘右侧禁军四厢统领主角高举合拢的殿前司鎏金蟠螭虎符。
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color military strategy painting, wide cinematic 16:9 composition. Inside the grand Military Sandtable Hall of the Northern Capital Daming Auxiliary Palace around 1050 AD, lit by tall bronze lampstands. Centerpiece is a massive sculpted wooden-and-clay relief sandtable depicting the winding Yellow River, iron-chain pontoon bridge, and Hebei mountain passes marked with miniature colored pennants (purely solid colors, zero text). Standing across the sandtable, battle-hardened Song general Wang Xin in heavy iron lamellar armor rests a hand on his sword hilt while the young Imperial Guard commander protagonist holds up half of a gilded bronze tiger tally to lock together with the garrison tally. Rich Song court mineral pigments, solemn martial atmosphere, zero text or characters.
  ```

---

### 85. `CG-QST-085`：大名府黄河铁索渡口 · 子夜火船狂澜决战萧远风图

- **关联文件**：[`src/data/quests/sects/jinjunHebeiSpyQuest.ts`](../src/data/quests/sects/jinjunHebeiSpyQuest.ts)
- **目标路径**：`public/assets/quests/jinjun_spy_yellow_river_chains.jpg`
- **画框题跋**：`黄河铁索渡口狂澜夜战 · 浊浪火船间迎战辽南京武林统制萧远风`
- **剧情语境**：
  - 卷三第三十五~三十六幕全篇最高潮，子时三刻黄河秋汛怒涛滚滚，岸畔镇河大铁牛锁住八根碗口粗的横江铁索，三艘燃烧的契丹猛火油快船映红半边天际。
  - 背负乌铜秘匣的辽南京武林统制【萧远风】手挺丈二浑铁长枪立于剧烈颠簸的铁索浮桥正中，主角踏浪跃索拔刃正面硬撼强虏！
- **画面核心要素**：
  1. **环境氛围**：北宋黄河铁索渡口子夜决战奇观，近岸可见威猛苍古的铸铁镇河大铁牛与绷紧入水的粗大横江铁链，河心连环木舟浮桥在黄浊巨浪中起伏，远处两艘契丹火油快船烈焰冲天、浓烟滚滚。
  2. **主体人物**：浮桥中央，身披契丹狼裘玄甲、背绑乌铜防水方匣的枭雄统帅萧远风双手挺浑铁大枪猛刺；主角紫金甲袍外玄披风翻卷如翼，脚踏湿滑铁索木板挥剑硬架枪锋，金铁交击火星四溅！
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color epic river-duel painting, wide cinematic 16:9 composition. Midnight showdown at the Yellow River Iron-Chain Ferry outside Daming Prefecture around 1050 AD: colossal cast-iron River-Quelling Ox statues on the stone bank anchoring arm-thick iron chains stretched taut across churning muddy waves, linked timber pontoon boats pitching wildly as burning Khitan fire-boats blaze in crimson flames amid river mist. At the center of the swaying iron-chain pontoon bridge, formidable Liao martial commander Xiao Yuanfeng in dark Khitan wolf-fur iron armor—carrying a sealed black-copper coffer strapped to his back—thrusts a heavy iron lance, clashing fiercely sending sparks flying against the fearless Song Imperial Guard commander protagonist leaping forward blade in hand. Monumental Northern Song martial drama, fiery reflections on dark surging water, zero text or characters.
  ```

---

### 86. `CG-QST-086`：东京大内垂拱紫宸正殿 · 晓日丹墀呈匣决忠奸图

- **关联文件**：[`src/data/quests/sects/jinjunHebeiSpyQuest.ts`](../src/data/quests/sects/jinjunHebeiSpyQuest.ts)
- **目标路径**：`public/assets/quests/jinjun_spy_zichen_memorial.jpg`
- **画框题跋**：`紫宸晓日丹墀对奏 · 手捧《京营泄密名录》定夺朝堂肃贪或玄枢反间`
- **剧情语境**：
  - 卷四第四十一~四十三幕终局抉择，东京皇宫垂拱紫宸正殿早朝晨光穿透铜鹤炉香。
  - 宋仁宗赵祯端坐龙椅，文班包拯执象笏肃立、武班黑王相公王德用按剑侍侧；主角独立白玉丹墀中央呈上《京营泄密名录》乌铜匣，一念决断雷霆肃贪或留线反间。
- **画面核心要素**：
  1. **环境氛围**：北宋皇宫垂拱紫宸正殿早朝恢弘内景，朱漆巨柱、汉白玉丹墀御阶、铜鹤香炉青烟袅袅，金色晨光自殿门斜洒而入。
  2. **主体人物**：高台龙座上头戴通天冠、身着绛纱袍的宋仁宗赵祯俯视殿中；两侧文武班首分别为黑面紫袍执笏的包拯与须发苍苍披朝服金甲的宿将王德用；御道正中主角（四分之三背影）双手高捧开启的乌铜秘匣与火漆卷轴。
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color grand imperial court painting, wide cinematic 16:9 composition. Dawn audience inside the majestic Zichen Hall of the Kaifeng Imperial Palace around 1050 AD, golden morning sunlight slanting past crimson lacquered pillars and curling bronze crane incense smoke onto white marble steps. High upon the dragon dais sits benevolent Emperor Renzong of Song in crimson Tongtian-crown court robes; flanking the foreground below stand upright dark-faced Magistrate Bao Zheng holding an ivory tablet on the civil side and white-bearded Grand Marshal Wang Deyong in ceremonial armor on the martial side. In the center of the marble aisle, the young Imperial Guard commander protagonist in purple-and-gold brocade (seen from a three-quarter rear angle) presents an open black-copper coffer containing a wax-sealed scroll before the throne. Authentic Song court splendor, rich mineral pigments, zero text or characters.
  ```

---

### 87. `CG-QST-087`：八十万禁军大教场 · 奉旨晋阶统五千铁甲出师太行图

- **关联文件**：[`src/data/quests/sects/jinjunTaihangQuest1.ts`](../src/data/quests/sects/jinjunTaihangQuest1.ts)
- **目标路径**：`public/assets/quests/taihang_camp1_depart_army.jpg`
- **画框题跋**：`八十万禁军大教场 · 奉旨晋阶统五千铁甲出师太行`
- **剧情语境**：
  - 主角入大宋禁军满一载，因校场练兵严整有方，获宋仁宗破格拔擢一级至 Lv.4【三衙都虞候】，奉旨统领五千禁军精锐北上太行山剿匪。
  - 秋阳猎猎，擂鼓聚将点兵帅台前旌旗蔽日，主角身披崭新宋制山文冷锻重甲、横按佩刀跨上神骏战马，在枢密使王德用送行与副将高怀亮护翼下率五千铁甲雄师浩荡出征。
- **画面核心要素**：
  1. **环境氛围**：北宋东京八十万禁军大教场与远方雄伟城阙，晴秋高天流云，帅台两侧牛皮巨鼓齐擂，漫天赤色纯纹大宋战旗迎风招展（旗面仅绘云龙火焰纹样，严禁出现任何文字）。
  2. **主体人物**：前景中央，年轻英武的主角身穿擦拭铮亮的宋代铁札甲与红缨兜鍪、披猩红战袍，勒马昂首拔剑指北，意气风发；马侧副将高怀亮执长枪策马相随，后方帅台上黑面威严的枢密使王德用拱手目送。
  3. **军容气势**：中远景五千北宋禁军步骑方阵列阵如林，长枪如雪、神臂弩与铁甲寒光连绵数里，尽显“初掌帅印、锐气冲霄”的盛大军威。
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color military epic painting, wide cinematic 16:9 composition. Crisp autumn morning at the grand Imperial Guard drill ground outside Kaifeng capital around 1050 AD, massive Song city gate towers in the distance and giant war drums thundering atop a timber command platform. In the foreground center, a proud, spirited young Song general newly promoted in gleaming iron lamellar armor, crimson battle cloak, and red-plumed helmet rears a powerful warhorse and points a drawn steel sword northward. Beside him rides deputy general Gao Huailiang holding a long spear, while elderly dark-complexioned Privy Councilor Wang Deyong watches solemnly from the command terrace. Stretching across the plain behind them march five thousand Northern Song Imperial Guards in disciplined phalanxes of glittering spears, shields, and crimson banners bearing only ornamental cloud-flame patterns with strictly zero text or characters. Rich mineral pigments, court painting precision, no modern elements.
  ```

---

### 88. `CG-QST-088`：太行黑风愁猿涧 · 骄兵贪功不审地势孤军深入图

- **关联文件**：[`src/data/quests/sects/jinjunTaihangQuest1.ts`](../src/data/quests/sects/jinjunTaihangQuest1.ts)
- **目标路径**：`public/assets/quests/taihang_camp1_blind_march.jpg`
- **画框题跋**：`太行黑风愁猿涧 · 骄兵贪功不审地势孤军深入绝谷`
- **剧情语境**：
  - 主角初战势如破竹连破外围哨卡，太行山匪徒佯败丢弃辎重逃入两侧峭壁夹峙、枯松荒草遍地的险恶绝谷【黑风愁猿涧】。
  - 因主角未读兵书、不谙“穷寇莫追”古训且疏于审视山川地形，不听副将高怀亮勒马苦谏，挥鞭催动五千大军一字长蛇盲目钻入幽暗葫芦绝壑，崖顶枯木阴影中无数贼寇已悄然张弓推石。
- **画面核心要素**：
  1. **环境氛围**：范宽《溪山行旅图》式险峻压抑的太行深谷“一线天”地貌，两侧百丈赤黑绝壁向内倾压只留一线昏黄天光，谷底干涸乱石滩长满枯黄芦苇与油脂丰厚的落叶枯松，到处散落着匪徒故意遗弃的破木车与粮袋。
  2. **主体人物**：谷口狭窄通道处，年轻主帅（主角）满面骄色、单手扬鞭催马疾进；身侧副将高怀亮神色焦急伸手欲拦马缰劝阻，长长宋军步卒队列拥挤不堪地涌入狭窄深涧。
  3. **危机伏笔**：画面上方高耸入云的幽暗崖顶松林阴影间，隐约可见数十名绿林伏兵正俯身撬动滚木礌石、引燃火折，山雨欲来的窒息感扑面而来。
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi and monumental landscape ink-and-color painting, wide cinematic 16:9 composition. A claustrophobic, ominous narrow gorge in the Taihang Mountains around 1050 AD: towering vertical dark cliffs squeezing inward over a dry boulder-strewn ravine choked with dry autumn reeds, dead pine branches, and abandoned wooden supply carts left as bait. At the head of a crowded, stretched-out column of five thousand Song Imperial Guard soldiers marching blindly into the bottleneck, the overconfident young Song commander spurs his horse forward waving his riding crop, ignoring his anxious deputy general beside him reaching out to warn of the terrain. High above along the shadowy cliff rims, half-hidden mountain bandits crouch silently beside stacked boulders, oil jars, and unlit fire-arrows. Tense ominous atmosphere, dramatic vertical scale, mineral pigments, strictly zero text or characters.
  ```

---

### 89. `CG-QST-089`：黑风涧烈焰遮天 · 太行群匪断道火攻大军受伏图

- **关联文件**：[`src/data/quests/sects/jinjunTaihangQuest1.ts`](../src/data/quests/sects/jinjunTaihangQuest1.ts)
- **目标路径**：`public/assets/quests/taihang_camp1_fire_ambush.jpg`
- **画框题跋**：`黑风涧烈焰遮天 · 太行群匪断道火攻五千禁军陷绝境`
- **剧情语境**：
  - 五千禁军尽入黑风愁猿涧腹地，忽闻梆子齐鸣，巨石滚木轰然砸断前后谷口！
  - 两岸峭壁上太行群匪倾倒猛火油与硫磺松枝，万支火箭如流星火雨倾泻而下，狂风卷起数丈高的赤红火墙瞬间吞没拥挤的宋军队列，战马惊嘶、甲士焚灼，全军陷入灭顶炼狱。
- **画面核心要素**：
  1. **环境氛围**：幽暗峡谷彻底化作烈焰翻腾的人间炼狱，前后出路皆被崩塌巨石与燃烧圆木堵死，黑烟滚滚直冲天际，漫天火箭拖着长长火尾从两侧高崖密集射落。
  2. **主体人物与群像**：画面中央火浪翻涌处，主角战马受惊人立而起，主角挥刃奋力拨打漫天火箭、面色惨白震骇；四周宋军阵型大乱，盾牌焦裂、旗帜燃烧，年轻士卒在烈火浓烟中互相拖拽扑救。
  3. **光影冲击**：浓墨般的峭壁黑烟与耀眼夺目的朱砂、雄黄烈焰形成惨烈悲壮的视觉反差。
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color catastrophic battle illustration, wide cinematic 16:9 composition. Deep inside a narrow steep-walled Taihang Mountain canyon around 1050 AD, giant fallen boulders block the gorge while mountain bandits high atop both cliff edges hurl blazing oil pots and loose thousands of flaming arrows downward. Roaring walls of crimson-and-amber fire engulf the dry brush and trap the crowded column of Song Imperial Guards below; warhorses rear in terror amidst thick billowing black smoke, shattered shields, and burning blank war banners. Near the center, the shocked young Song commander slashes desperately at incoming fire-arrows atop a rearing steed as armored soldiers struggle amidst the inferno. Intense chiaroscuro firelight against dark rock and smoke, authentic Song brushwork and mineral vermilion-ochre pigments, zero text or characters.
  ```

---

### 90. `CG-QST-090`：一线天火海孤影 · 命残军突围独身横刃断后图

- **关联文件**：[`src/data/quests/sects/jinjunTaihangQuest1.ts`](../src/data/quests/sects/jinjunTaihangQuest1.ts)
- **目标路径**：`public/assets/quests/taihang_camp1_rearguard_stand.jpg`
- **画框题跋**：`一线天火海孤影 · 命残军突围独身横刃断后死战`
- **剧情语境**：
  - 眼见两千余名朝夕相处的禁军弟兄惨死火海，痛彻心扉的主角将帅印兵符塞给负伤的高怀亮，严令残存大军立即向谷外撤退突围。
  - 主角孤身一人提刃逆行，横立于烈火熊熊的一线天狭窄隘口中央，以血肉之躯死死挡住王重岳、史万山率领的漫山追兵，为残军杀出一条生路。
- **画面核心要素**：
  1. **环境氛围**：狭窄如咽喉的太行山谷隘口，两侧枯树与断车仍在熊熊燃烧，火星随烈风狂舞，满地折戟残盾与染血甲片。
  2. **主体人物**：画面黄金分割点上，头盔已失、束发散乱、战甲焦黑染血的主角单足踏在焦岩之上，双手紧握滴血兵刃横挡整个谷口（三分之四背侧面视角）；其身后远方谷口微光处，高怀亮正扶持伤兵队列疾步撤离。
  3. **压迫对比**：主角正前方火光浓烟中，手持沉重金刀的魁梧贼首王重岳与赤膊刺青提浑铁棍的史万山率领黑压压数百悍匪汹涌扑来，一夫当关的孤勇与悲怆令人窒息。
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color heroic last-stand illustration, wide cinematic 16:9 composition. At a narrow rocky choke-point of a burning mountain gorge in the Taihang Mountains around 1050 AD, flanked by blazing pine trees, broken war-carts, and fallen spears. Standing completely alone in the center pass (seen from a dramatic three-quarter rear-side angle), ahelmetless, bloodstained young Song general in scorched iron lamellar armor and torn crimson cloak plants a firm stance with a blood-streaked blade leveled forward. Far behind him through a gap in the rocks, surviving wounded Song soldiers retreat to safety; surging directly toward him out of the firelit smoke in front are a towering armored bandit king wielding a heavy broadsword, a tattooed muscular bandit chief with an iron staff, and hundreds of fierce mountain brigands. Tragic heroism, flying embers, Song court painting linework, zero text.
  ```

---

### 91. `CG-QST-091`：大内垂拱紫宸殿 · 丧师两千奉旨斥责削阶罚俸图

- **关联文件**：[`src/data/quests/sects/jinjunTaihangQuest1.ts`](../src/data/quests/sects/jinjunTaihangQuest1.ts)
- **目标路径**：`public/assets/quests/taihang_camp1_court_reprimand.jpg`
- **画框题跋**：`大内垂拱紫宸殿 · 丧师两千奉旨斥责削阶罚俸一年`
- **剧情语境**：
  - 主角率残部逃回东京汴梁，五千精兵折损两千一百余人。早朝之上，垂拱紫宸正殿气氛肃杀如霜。
  - 御史台言官持笏厉声弹劾，宋仁宗面沉似水痛斥主角“恃勇轻敌、不习兵书、丧师辱国”；内侍当殿摘去主角都虞候冠带甲胄，降回 Lv.3【四厢都指挥】并罚没整整一年俸禄。
- **画面核心要素**：
  1. **环境氛围**：庄严肃穆的北宋皇宫【垂拱紫宸正殿】，高耸朱漆金柱、铜鹤香炉冷烟笔直上升，殿外天色阴沉凛冽，百官身着绯紫宋制朝服、头戴长翅幞头分列左右。
  2. **主体人物**：冰冷的金砖御道正中，脱去重甲与官帽、仅着素白染血中衣（内缠绷带透出暗红血迹）的主角深深俯首长跪，身旁托盘里放着刚被褫夺的都虞候武官冠带与腰牌；前侧枢密使王德用亦摘冠跪地自请连坐，黑面包拯手捧阵亡抚恤名册肃立凛然，右侧绯袍御史怒指斥责，高高御阶龙椅上头戴展脚幞头、着赭黄袍的宋仁宗神色痛惜而威严。
  3. **庙堂张力**：金碧辉煌的北宋朝堂礼制与败军孤臣的屈辱自责交织，极具历史正剧厚重感。
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color imperial court drama painting, wide cinematic 16:9 composition. Inside the grand, solemn Zichen Audience Hall of the Northern Song Imperial Palace in Kaifeng around 1050 AD, towering vermilion pillars and bronze crane censers. On the cold polished stone floor in the center kneels the defeated young general stripped of armor and official headgear, wearing only a plain white inner tunic stained faintly with bandaged wounds, beside a lacquer tray holding his confiscated rank belt and helmet. Nearby kneels elderly Privy Councilor Wang Deyong in plea, while dark-faced upright minister Bao Zheng stands holding a casualty roll and a crimson-robed censor points an ivory tablet (笏板) in stern rebuke. High upon the dragon throne sits Emperor Renzong in ochre-yellow imperial robes and long-winged Song official hat (展脚幞头) with a grave, sorrowful expression. Authentic 1050 AD Song court attire, dramatic solemnity, zero text or characters.
  ```

---

### 92. `CG-QST-092`：汴京郊外新冢秋雨 · 跪对两千阵亡忠魂泣血悔悟图

- **关联文件**：[`src/data/quests/sects/jinjunTaihangQuest1.ts`](../src/data/quests/sects/jinjunTaihangQuest1.ts)
- **目标路径**：`public/assets/quests/taihang_camp1_rain_graveyard.jpg`
- **画框题跋**：`汴京郊外新冢秋雨 · 跪对两千阵亡忠魂泣血悔悟`
- **剧情语境**：
  - 退朝削职之后，深秋暴雨倾盆而下。主角独自携两坛浊酒步出汴京城门，来到城西乱岗上新垒起的两千余座禁军阵亡将士新坟前。
  - 望着漫山遍野新插的无字素木灵牌与白麻招魂幡，想起出征前一张张鲜活年轻的笑脸皆因自己不读兵书而化作焦骨，主角双膝重重跪入冰冷泥水之中，任凭暴雨冲刷满面热泪，叩首泣血立誓必洗心革面。
- **画面核心要素**：
  1. **环境氛围**：北宋汴京西郊荒凉苍茫的山坡义冢，铅灰色乌云低垂，豆大秋雨如注斜织，漫山遍野密密麻麻排列着上千座新培黄土坟包与素白麻布幡、朴素木牌（木牌仅留雨水木纹肌理，严禁出现任何文字），几株枯柳在风雨中哀鸣。
  2. **主体人物**：前景泥水横流的坟前空地上，身穿朴素青灰布衣、浑身湿透的年轻主角双膝深陷泥泞，额头微昂或双手撑地痛哭失声，雨水与泪水顺着脸颊滑落；膝前放着一只摔碎半边的粗陶酒坛与几只倒满浊酒的粗碗，纸钱被雨水打湿贴在泥地上。
  3. **情感高潮**：第一部任务终幕灵魂升华之景，极尽苍凉、悔恨与蜕变前的沉痛力量。
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi and atmospheric ink-wash painting, wide cinematic 16:9 composition. Torrential cold autumn rain pouring over a vast hillside military graveyard outside Kaifeng around 1050 AD, where hundreds upon hundreds of fresh earthen burial mounds and plain blank wooden grave markers with wet white hemp streamers stretch into the misty grey distance beneath weeping bare willows. Kneeling deeply in muddy puddles in the foreground, the soaked young protagonist in humble plain cloth robes bows in anguish with tears mingling with rain down his face, hands clenched in the mud before a broken clay wine jar and three bowls of sacrificial liquor. Muted slate-blue, rain-grey, and raw earth tones, deeply moving sorrow and remorse, authentic Song painting brushwork, strictly zero text or characters on any grave markers.
  ```

---

### 93. `CG-QST-093`：大内垂拱紫宸殿 · 枢密使王德用执笏力保请命再征图

- **关联文件**：[`src/data/quests/sects/jinjunTaihangQuest2.ts`](../src/data/quests/sects/jinjunTaihangQuest2.ts)
- **目标路径**：`public/assets/quests/taihang_camp2_court_petition.jpg`
- **画框题跋**：`大内垂拱紫宸殿 · 枢密使王德用执笏力保请命再征太行`
- **剧情语境**：
  - 主角受王德用赠《武经总要》并以吕蒙“士别三日刮目相看”典故劝勉，寒窗苦读终令经义与策论大成，沙盘三策对答精妙绝伦。
  - 王德用携主角重登紫宸殿，面对朝臣质疑，白发苍苍的“黑王相公”王德用双手高举象牙笏板跪于金阶之下，以自身枢密使官爵身家性命担保主角已非“吴下阿蒙”，力请仁宗再授五千兵马讨伐太行！
- **画面核心要素**：
  1. **环境氛围**：晨光初透的大内【垂拱紫宸正殿】，一束澄澈金黄晓日自殿门斜照入内，驱散往昔阴霾，殿中百官神情震动侧目。
  2. **主体人物**：御阶丹墀前，须发皓白、面色微黑而威重如山的枢密使王德用（身着北宋紫袍玉带宰执朝服）毅然跪地，双手高擎洁白象牙朝笏慷慨陈词；其身侧半步，已敛尽昔日浮躁、神情沉毅内敛的主角身着整洁禁军戎装抱拳单膝跪请出战；上方宋仁宗探身颔首，侧列包拯捻须赞同。
  3. **知遇之恩**：老帅托孤保举与青年将领脱胎换骨的气度交相辉映，温暖而振奋。
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color court painting, wide cinematic 16:9 composition. Morning sunlight slanting warmly through the towering doors of Zichen Palace Hall in Kaifeng around 1050 AD. Before the marble steps of the imperial throne, venerable white-bearded dark-complexioned Privy Councilor Wang Deyong in deep purple Song grand-minister robes and jade belt kneels resolutely, raising his white ivory court tablet (象笏) with both hands to vouch with his own honor. Kneeling steadfastly beside him in neat, unadorned Song military tunic and light armor is the matured, composed young general clasping hands in calm determination. Above on the throne, Emperor Renzong leans forward approvingly while Minister Bao Zheng nods nearby amidst attentive courtiers in crimson and green robes. Noble Song court painting brushwork, warm golden shafts of light, zero text or characters.
  ```

---

### 94. `CG-QST-094`：太行东麓三连寨 · 依武经步步为营连拔三城图

- **关联文件**：[`src/data/quests/sects/jinjunTaihangQuest2.ts`](../src/data/quests/sects/jinjunTaihangQuest2.ts)
- **目标路径**：`public/assets/quests/taihang_camp2_three_forts.jpg`
- **画框题跋**：`太行东麓三连寨 · 依武经步步为营旌旗连拔三城`
- **剧情语境**：
  - 再入太行山，熟读《武经总要》的主角判若两人：先遣斥候查明水源风向，掘壕立栅、断水熏烟、围点打援，稳扎稳打绝不贪功冒进。
  - 短短旬日之间，太行东麓互为犄角的苍狼前寨、黑风中寨、藏金大寨三座险要山城相继告破，赤红宋军旌旗在三座山巅寨楼次第升起！
- **画面核心要素**：
  1. **环境氛围**：全景鸟瞰式北宋青绿山水军事长卷构图，层峦叠嶂的太行山脉间由近及远错落分布着三座依险而筑的石木山寨城垒，山道间可见宋军严整修筑的鹿角木栅、壕沟、望楼与神臂弩阵。
  2. **主体人物**：近景高坡指挥台石崖上，主角身披宋制战甲，一手持《武经总要》竹简兵策或令旗、一手沉稳指向远方第三座刚升起大宋赤色无字战旗的寨楼；身旁副将高怀亮与传令斥候欣喜抱拳禀报，井然有序的禁军刀盾长枪方阵正稳步推进接管城防。
  3. **兵家气象**：阵型严整如棋盘，与第一部孤军盲进的混乱形成强烈视觉呼应，彰显兵法制胜之美。
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese blue-and-green landscape (青绿山水) and gongbi military painting, wide cinematic 16:9 panoramic composition. Overlooking three fortified stone-and-timber mountain strongholds stepped across rugged Taihang Mountain ridges around 1050 AD. Disciplined Song Imperial Guard formations advance methodically behind wooden palisades, siege shields, and watchtowers; pure crimson Song banners (strictly ornamental patterns, zero text) fly victoriously atop the conquered first, second, and newly breached third mountain fortresses. On a commanding rocky overlook in the foreground, the calm, strategic young Song general in iron lamellar armor holds a rolled military scroll in one hand and directs troop movements with composed authority alongside deputy general Gao Huailiang and mounted scouts. Crisp Song court brushwork, majestic mountain depth, mineral azurite and vermilion accents, zero text or characters.
  ```

---

### 95. `CG-QST-095`：太行藏金义仓 · 设计生擒数百悍匪缴获满库赃银图

- **关联文件**：[`src/data/quests/sects/jinjunTaihangQuest2.ts`](../src/data/quests/sects/jinjunTaihangQuest2.ts)
- **目标路径**：`public/assets/quests/taihang_camp2_captured_loot.jpg`
- **画框题跋**：`太行藏金义仓 · 设计生擒数百悍匪缴获满库赃银`
- **剧情语境**：
  - 主角巧施“围三阙一、暗伏陷网”之计攻破太行山核心钱粮重地【太行藏金义仓】，不费折损便将妄图从暗道携款潜逃的数百名太行山匪徒悉数活捉。
  - 石窟大仓洞开，一箱箱劫掠自河北河东州县的雪花官银、蜀锦绸缎与堆积如山的粮袋重见天日，军需书吏秉笔清点造册。
- **画面核心要素**：
  1. **环境氛围**：依山崖巨洞凿建的【太行藏金义仓】石坪与敞开的厚重铁箍库门，火把与日光交映，库门内外整齐抬出数十口敞盖樟木大箱，箱内满盛银光灿灿的宋代船形银铤、铜钱贯串与彩绸匹段。
  2. **主体人物与群像**：广场左侧，数百名卸去兵刃的太行山匪徒与头目被麻绳反绑成串、垂头丧气蹲跪成排，由持戟宋军严密看押；右侧主角负手肃立督察，副将高怀亮与军需官捧着算盘账册满面喜色清点封存赃款，秋毫无犯。
  3. **叙事细节**：散落一地的绿林扑刀与贴封条（素色红纸无字）的银箱对比鲜明，展现“大获全胜、人赃并获”的畅快战果。
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color illustration, wide cinematic 16:9 composition. Outside the massive iron-bound stone vault gates of the Taihang Mountain Bandit Treasury Stronghold around 1050 AD. On the stone courtyard right side, Song Imperial Guard soldiers carry out and open dozens of heavy wooden chests brimming with gleaming silver ingots (宋代银铤), strings of copper coins, bolts of colorful silk, and grain sacks while military clerks tally with an abacus. On the left side, hundreds of disarmed mountain bandits sit kneeling in long roped lines under the watch of halberd-bearing Song troops. In the center foreground stands the composed young Song commander overseeing the seizure alongside his smiling deputy general, strictly disciplined and upright. Rich mineral pigments, intricate Song material details, zero text or characters.
  ```

---

### 96. `CG-QST-096`：太行飞狐断魂索桥 · 王重岳率不足三百残匪断板死守图

- **关联文件**：[`src/data/quests/sects/jinjunTaihangQuest2.ts`](../src/data/quests/sects/jinjunTaihangQuest2.ts)
- **目标路径**：`public/assets/quests/taihang_camp2_feihu_bridge_retreat.jpg`
- **画框题跋**：`太行飞狐断魂索桥 · 王重岳仅率不足三百残匪断板死守天险`
- **剧情语境**：
  - 外围三城尽失、精锐十去其八，九纹狂龙史万山断后败退负伤，不可一世的太行天王【王重岳】身边仅剩不到三百名残兵败将，仓皇退过万丈深渊之上的唯一通道【飞狐断魂索桥】。
  - 王重岳挥刀砍断桥头半截木板，仅留数根碗口粗的寒铁锁链悬于云雾深涧之上负隅顽抗；主角立马东岸崖头审势，深明“困兽死地不可强渡”，下令筑垒封山、班师献俘。
- **画面核心要素**：
  1. **环境氛围**：奇险绝伦的太行绝顶大裂谷，脚下万丈寒渊白雾翻涌不见其底，唯有四根乌黑粗铁索横跨两座刀削绝壁之间，前半段桥面木板已被砍断坠落，铁索在山风中铮铮摇晃。
  2. **双岸对峙**：远岸狭窄危崖关楼前，身披虎皮金甲、满脸阴鸷血污的太行天王王重岳拄大刀喘息怒视，身后簇拥着不足三百名衣甲残破、缠满绷带的惊弓残匪；近岸开阔石崖上，主角勒马从容驻立、抬手止住欲请战的将士，身后五千宋军阵列森严、稳如泰山。
  3. **胜败易势**：昔日围猎宋军的霸主沦为孤崖困兽，主角则尽显名将收放自如的大局风范。
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi and monumental cliff landscape painting, wide cinematic 16:9 composition. Across a dizzying, mist-filled bottomless chasm in the high Taihang Mountains stretches the perilous Feihu Iron-Chain Suspension Bridge around 1050 AD, its front wooden planks freshly chopped away leaving bare iron chains swaying in the wind. On the far isolated cliff fortress ledge, the battered bandit king Wang Chongyue in tiger-pelt armor leans on his heavy broadsword surrounded by fewer than three hundred wounded, ragged remnant bandits huddled in desperation. On the near cliff edge in the foreground, the poised young Song commander sits calmly astride his warhorse amidst ranks of gleaming armored Song Imperial Guards, raising one hand to halt a reckless assault and seal the pass instead. Dramatic abyss perspective, swirling mountain mist, mineral pigments, zero text or characters.
  ```

---

### 97. `CG-QST-097`：东京市曹刑场 · 十名太行山中层头目同日伏法处斩图

- **关联文件**：[`src/data/quests/sects/jinjunTaihangQuest2.ts`](../src/data/quests/sects/jinjunTaihangQuest2.ts)
- **目标路径**：`public/assets/quests/taihang_camp2_kaifeng_ten_executions.jpg`
- **画框题跋**：`东京市曹刑场 · 十名太行山中层头目同日伏法明正典刑`
- **剧情语境**：
  - 大军凯旋班师东京汴梁，经开封府包拯、展昭与枢密院王德用会审定谳，将生擒押回的史玄朗、石寒乾、燕刀柏、雷武石等**十名血债累累的太行山中层头目**押赴市曹刑场。
  - 午时三刻令牌掷地，十名刽子手同时挥落鬼头大刀，十颗恶首落地，台下万千汴京百姓与昔日阵亡禁军遗属抚掌痛哭告慰亡魂！
- **画面核心要素**：
  1. **环境氛围**：扩建加长的北宋东京市曹十字街巨型木制刑台，晴空朗朗、正午烈日当空，远处可见汴京繁华楼阁飞檐与猎猎招展的无字素纹旌旗。
  2. **主体人物**：宽阔长刑台上，**整整齐齐一字排开跪着十名反绑双臂的太行山中层悍匪头目**，每名囚犯身后各立一名赤膊扎红巾的魁梧刽子手，十柄雪亮九环鬼头大刀在同一刹那齐齐高举过顶寒光闪烁！监斩席后包拯、王德用与戎装笔挺的主角肃穆端坐/侍立。
  3. **万众欢腾**：刑台下铁甲禁军与开封府衙役持戟护卫，绳栏外人山人海的东京百姓振臂欢呼，更有白发军属老妪合十仰天垂泪，正义昭彰、气势恢宏。
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color grand historical scene, wide cinematic 16:9 composition. Bright noon at the grand public execution square in Kaifeng capital around 1050 AD, framed by Song-style multi-story pavilions and city towers. Across a wide, elongated raised wooden execution platform kneel exactly ten bound mountain bandit chieftains in a single solemn row; behind each prisoner stands a muscular red-headscarved executioner raising a gleaming heavy broadsword in synchronized readiness as the noon signal falls. Behind the crimson-draped supervision dais sit dark-faced Judge Bao Zheng, Privy Councilor Wang Deyong, and the victorious young Song commander in full ceremonial armor. Surrounding the square behind rows of armored Imperial Guard halberdiers, thousands of Kaifeng citizens cheer and weep in relief. Authentic Song urban panorama brushwork (in the spirit of Zhang Zeduan), rich mineral colors, zero text or characters.
  ```

---

### 98. `CG-QST-098`：太行群峰万炬如龙 · 大宋禁军铁桶合围锁死山口图

- **关联文件**：[`src/data/quests/sects/jinjunTaihangQuest3.ts`](../src/data/quests/sects/jinjunTaihangQuest3.ts)
- **目标路径**：`public/assets/quests/taihang_camp3_army_encircle.jpg`
- **画框题跋**：`太行群峰万炬如龙 · 大宋禁军铁桶合围锁死各路山口`
- **剧情语境**：
  - 第二部结束六十日后，展昭安排在太行山的卧底内线送出《太行山绿林防备暗道图》。主角再度统领大宋禁军精锐进抵太行山。
  - 入夜时分，主角命大军将整座太行主峰死死围成铁桶，成千上万支松明火把沿群山各处山口、隘道蜿蜒成首尾相连的赤色火龙，并在飞狐索桥正面擂鼓佯攻，彻底锁死王重岳与史万山的视线与退路。
- **画面核心要素**：
  1. **环境氛围**：宏大壮阔的太行山脉苍蓝夜色全景，一轮冷月半隐云层，陡峭险峻的太行主峰孤耸中央；环绕主峰四周的山麓、谷口与岭脊之上，大宋禁军连营十里、鹿角拒马密布，万千火把汇成璀璨壮丽的金色火环将贼巢团团围困！
  2. **主体人物**：前景高处望台岩石上，身披夜色战袍的主角与一身玄衣背负巨阙剑的南侠展昭并肩伫立，主角手展油布防备暗道图低声指点主峰后侧幽暗绝壁，副将高怀亮在旁领命调动正面佯攻炮石战鼓。
  3. **大战前夕**：明处万炬合围的浩瀚声势与暗处奇兵即将出鞘的冷峻杀机完美交融。
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi night-landscape military painting, wide cinematic 16:9 composition. Moonlit indigo night over the jagged peaks of Mount Taihang around 1050 AD. Completely encircling the central mountain fortress below, thousands upon thousands of Song Imperial Guard campfires and blazing pine torches wind across every valley pass and ridge like a colossal ring of golden fire dragons, with siege shields and war drums massed before the chasm bridge. On a shadowy high rocky outcrop in the foreground stand the young Song commander in dark armor holding an oilskin route map (purely geometric mountain lines, zero text) and heroic swordsman Zhan Zhao with sword on back, pointing quietly toward a dark vertical cliff path behind the fortress. Monumental scale, glowing amber torch-rivers against deep mineral blue cliffs, zero text or characters.
  ```

---

### 99. `CG-QST-099`：太行后山绝壁暗道 · 子夜偕展昭率五十夜行衣精锐潜入图

- **关联文件**：[`src/data/quests/sects/jinjunTaihangQuest3.ts`](../src/data/quests/sects/jinjunTaihangQuest3.ts)
- **目标路径**：`public/assets/quests/taihang_camp3_night_infiltration.jpg`
- **画框题跋**：`太行后山绝壁暗道 · 子夜偕展昭率五十夜行衣精锐潜入敌巢`
- **剧情语境**：
  - 三更子夜，借正面索桥震天鼓声掩护，主角与南侠【展昭】卸去铮鸣重甲，全员换上纯黑紧身【夜行衣】、黑布蒙面、兵刃缠墨布，精选五十名身怀绝技的禁军与六扇门死士。
  - 一行人依靠内线提供的防备线路图，避开明哨暗卡，借助飞爪百丈软索在云雾缭绕的后山万仞绝壁水涵栈道间悄无声息飞渡潜行，直插聚义忠义大堂！
- **画面核心要素**：
  1. **环境氛围**：子夜寒雾弥漫的太行后山险绝峭壁与古老废弃引水石槽暗道，月光清冷如霜，头顶上方山崖隐约透出山寨巡逻灯笼的微弱暖红火光，脚下是深不见底的幽谷夜岚。
  2. **主体人物**：紧贴湿滑绝壁突岩与铁爪绳索的前景处，**身穿利落纯黑宋制夜行劲装、束腕绑腿、黑巾掩面仅露一双寒星锐目**的主角与同样一袭玄黑夜行装束、背负乌鞘宝剑的展昭一前一后猫腰疾行，展昭打出手势示意上方哨卡换岗空隙。
  3. **精锐群像**：沿后方绝壁藤蔓、石缝与绳索之上，数十名同样身穿纯黑夜行衣、背负墨漆短弩与缠布钢刀的精锐死士如夜枭猿猱般鱼贯攀援而上，肃杀静谧、帅气逼人。
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color stealth-action night illustration, wide cinematic 16:9 composition. Midnight mist clinging to a sheer vertical back-cliff and ancient mossy stone water-culvert ledge high on Mount Taihang around 1050 AD under cold silver moonlight, with faint warm patrol lanterns of the bandit stronghold glowing high above on the cliff rim. Clinging agilely to grappling ropes and narrow rock holds in the foreground, the young protagonist and master swordsman Zhan Zhao—both dressed in sleek pitch-black Northern Song night-infiltration attire (夜行衣) with black cloth face-wraps, bound cuffs, and muffled dark-sheathed blades—signal silently upward. Trailing seamlessly along the cliff face and ropes behind them are fifty elite black-clad commandos climbing in utter silence like night hawks. Cool silver-indigo moonlight, crisp gongbi brushwork, high wuxia espionage tension, zero text or characters.
  ```

---

### 100. `CG-QST-100`：太行聚义大寨洞开 · 禁军大军四面合围残匪弃刃跪降图

- **关联文件**：[`src/data/quests/sects/jinjunTaihangQuest3.ts`](../src/data/quests/sects/jinjunTaihangQuest3.ts)
- **目标路径**：`public/assets/quests/taihang_camp3_bandits_surrender.jpg`
- **画框题跋**：`太行聚义大寨洞开 · 禁军大军四面合围残匪弃刃跪地投降`
- **剧情语境**：
  - 主角与展昭突入【聚义忠义大堂】，2v2 联手激战击败并生擒太行天王王重岳与九纹狂龙史万山，随后率五十死士杀至前寨斩断千斤闸铁链，大开山寨正门！
  - 高怀亮率领的大宋禁军主力举火挺枪如潮水般涌入山寨将所有匪徒团团围住；眼见两大魁首俱已阶下受缚，数百太行山残匪心理彻底崩塌，纷纷抛下刀枪跪满整座校场乞降。
- **画面核心要素**：
  1. **环境氛围**：破晓微光与万千火把交映的太行山总寨【聚义忠义大堂】前巨型石砌校场，两侧粗犷寨门已彻底洞开，昔日嚣张的虎皮聚义旗被斩断倒在地上（旗面无字）。
  2. **主体人物**：大堂高阶之上，一身夜行劲装微染血迹的主角与展昭并肩傲立，脚边是被重枷铁链锁住琵琶骨、面如死灰的王重岳与史万山；高怀亮率领重甲禁军长枪手与神臂弩手结成密不透风的钢铁圆阵四面合围。
  3. **群寇伏降**：校场中央，数百名太行绿林匪徒将钢刀长矛丢得满地叮当乱响，成片跪伏在地高举空手投降，盘踞华北多年的匪巢一朝荡平！
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color triumphant battle-conclusion painting, wide cinematic 16:9 composition. Breaking dawn mixing with blazing torchlight inside the grand stone courtyard before the main hall of the Taihang Mountain Bandit Fortress around 1050 AD, its massive timber stronghold gates thrown wide open. Atop the stone steps of the hall stand the victorious young Song commander and swordsman Zhan Zhao in battle-worn black night-ops attire, standing guard over the two captured, heavily chained bandit overlords (Wang Chongyue and Shi Wanshan). Pouring through the open gates and forming an impenetrable ring of leveled spears, shields, and crossbows are thousands of armored Northern Song Imperial Guards, while in the center courtyard hundreds of remaining bandits throw their blades into piles on the ground and kneel in mass surrender. Dramatic dawn gold and torchlight, authentic Song painting details, zero text or characters.
  ```

---

### 101. `CG-QST-101`：东京市曹浓烟惊变 · 晁云飞与阮惊涛飞身暴起强劫法场图

- **关联文件**：[`src/data/quests/sects/jinjunTaihangQuest3.ts`](../src/data/quests/sects/jinjunTaihangQuest3.ts)
- **目标路径**：`public/assets/quests/taihang_camp3_execution_raid.jpg`
- **画框题跋**：`东京市曹浓烟惊变 · 晁云飞与阮惊涛飞身暴起强劫法场`
- **剧情语境**：
  - 主角押解王重岳与史万山回京，于东京市曹公开处斩。正当午时三刻监斩令牌掷下之际，街角伪装草料车轰然炸开漫天硝烟！
  - 京东绿林两大巨擘——京东义虎【晁云飞】与立地太岁【阮惊涛】不忍盟友受戮，竟孤注一掷潜入京师飞身暴起劫法场！主角早有防备，横身跃上刑台以一敌二正面硬撼双雄！
- **画面核心要素**：
  1. **环境氛围**：北宋东京市曹十字街刑场突发惊天巨变，街侧一辆倾覆草车炸起滚滚灰白烟瘴与木屑，围观百姓惊呼四散，外围绿林死士正拼死缠住禁军卫队。
  2. **双寇突袭与主角独挡**：高筑的木制刑台之上，枷锁缠身的王重岳与史万山跪在木墩旁面露狂喜；半空中两名剽悍绝伦的一流绿林豪强凌空扑落——左侧虎背熊腰、紫金面皮留短髯的魁首（晁云飞）双手抡起一柄开山泼风大刀当头劈落，右侧精壮凶悍、赤足水靠披挂的猛汉（阮惊涛）挺分水钢叉斜刺锁喉；刑台正中央，戎装佩甲的主角凛然不退，拔刃旋身带起凛冽寒光以一敌二稳稳格架双雄杀招！
  3. **动作张力**：千钧一发的劫法场高燃瞬间，刀叉寒芒、爆裂烟尘与刑台血色形成极致武侠动作大片定格。
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color high-action wuxia illustration, wide cinematic 16:9 composition. Sudden chaos at the Kaifeng public execution ground around 1050 AD as smoke bombs erupt from a shattered hay-cart in the street and crowds scatter. Leaping fiercely through the swirling smoke onto the raised wooden execution platform—where the two chained bandit kings Wang Chongyue and Shi Wanshan kneel beside startled executioners—are two formidable outlaw champions: bold bearded chief Chao Yunfei slashing downward with a heavy broad-bladed saber and fierce muscular water-chieftain Ruan Jingtao thrusting a steel trident from the flank. Standing immovable directly before the execution block, the armored young Song general draws his weapon in a sweeping arc of steel energy, parrying both outlaw masters simultaneously in a thrilling 1-versus-2 clash. Dynamic motion, flying splinters and smoke, rich Song mineral pigments, zero text or characters.
  ```

---

### 102. `CG-QST-102`：大内垂拱紫宸殿 · 荡平太行圣心大悦敕封禁军三衙都虞候图

- **关联文件**：[`src/data/quests/sects/jinjunTaihangQuest3.ts`](../src/data/quests/sects/jinjunTaihangQuest3.ts)
- **目标路径**：`public/assets/quests/taihang_camp3_lv4_investiture.jpg`
- **画框题跋**：`大内垂拱紫宸殿 · 荡平太行圣心大悦敕封禁军三衙都虞候`
- **剧情语境**：
  - 主角于法场以一敌二击溃逃遁的晁云飞与阮惊涛，监斩王重岳、史万山伏法，盘踞华北多年的太行绿林匪患自此彻底荡平绝迹！
  - 金殿大朝会之上，祥云瑞日映照紫宸正殿，宋仁宗龙颜大悦，当朝降敕正式册封主角晋升大宋禁军 Lv.4【三衙都虞候】，赐金甲虎符，与昔日同一大殿削冠夺职之景构成完美闭环！
- **画面核心要素**：
  1. **环境氛围**：辉煌庄严、瑞气千条的北宋皇宫【垂拱紫宸正殿】，殿门大开迎入灿烂朝阳，铜鹤香烟缭绕，殿外广场仪仗旌旗与金瓜武士肃立如画（旌旗牌匾皆无文字）。
  2. **主体人物**：丹墀红毯正中，历经骄败、苦读、雪耻而终成一代名将的主角身披崭新御赐鎏金兽面山文重甲与猩红锦袍，双手沉稳恭敬接过内侍金盘奉上的【三衙都虞候】金印虎符与紫绶冠带；龙椅上宋仁宗含笑嘉勉，阶下枢密使王德用抚须欣慰大笑，包拯与红袍御猫展昭含笑颔首观礼，文武百官齐齐拱手称贺。
  3. **史诗终章**：与 `CG-QST-091` 同殿同位而境遇天翻地覆，定格“千锤百炼始成帅才”的北宋立志传高光时刻！
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color grand imperial investiture masterpiece, wide cinematic 16:9 composition. Radiant golden morning sunlight flooding the magnificent Zichen Palace Hall of the Northern Song Imperial Palace in Kaifeng around 1050 AD, vermilion pillars gleaming and incense curling from bronze cranes. On the central crimson carpet before the marble dragon steps, the triumphant young general—clad in resplendent newly bestowed gilt-iron Song mountain-pattern armor (山文甲) and crimson brocade cloak—bows with poised dignity to receive a golden tiger-tally seal and official belt presented on a lacquer tray. Above on the throne, Emperor Renzong smiles warmly in praise, while beside the steps elderly Privy Councilor Wang Deyong strokes his white beard in proud joy alongside upright Judge Bao Zheng, crimson-robed royal guard Zhan Zhao, and congratulating Song civil and military officials. Majestic courtly splendor, rich mineral gold, vermilion, and azurite pigments, strictly zero text or characters.
  ```

---

## 三、 后续补绘验收清单

每次补绘完成后，请按以下三步核验并将上方表格状态改为 `[x]`：
1. 检查原画比例是否为 `16:9`，画面内无 AI 伪汉字乱码、无现代器物或清代剃发服饰；
2. 将高清原图归档至 `assets_raw_masters/quests/`，并将压缩后的 `.jpg`（建议分辨率 `1600×900` 或 `1280×720`，质量 `85`）写入 `public/assets/quests/` 对应文件名；
3. 启动游戏或通过剧情舞台预览对应幕次，确认宋风卷轴画框正常加载显示、不再回退至「绘卷留白」占位提示。
