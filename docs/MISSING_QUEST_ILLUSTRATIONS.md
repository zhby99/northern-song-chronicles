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
| `CG-QST-103` | `[x]` 已完成 | `public/assets/quests/jinjun_fanlou_patrol.jpg` | `/assets/quests/jinjun_fanlou_patrol.jpg` | `QST-SECT-33-FANLOU-NIGHT`<br>《樊楼夜 · 禁军巡夜录》 | 第二幕 · 醉汉闹楼<br>（`scene_jj_fn_02_drunk_nobles`） | `16:9` |
| `CG-QST-104` | `[x]` 已完成 | `public/assets/quests/jinjun_xiangguosi_alley_duel.jpg` | `/assets/quests/jinjun_xiangguosi_alley_duel.jpg` | `QST-SECT-33-FANLOU-NIGHT`<br>《樊楼夜 · 禁军巡夜录》 | 第八幕 · 相国寺巷斩枭<br>（`scene_jj_fn_08_xiangguosi_boss`） | `16:9` |
| `CG-QST-105` | `[x]` 已完成 | `public/assets/quests/jinjun_yujinyuan_horsemanship.jpg` | `/assets/quests/jinjun_yujinyuan_horsemanship.jpg` | `QST-SECT-33-YUJINYUAN-HORSE`<br>《玉津园 · 春日校马记》 | 第二幕 · 天驷挑驹<br>（`scene_jj_yj_02_tame_steed`） | `16:9` |
| `CG-QST-106` | `[x]` 已完成 | `public/assets/quests/jinjun_yujinyuan_spear_duel.jpg` | `/assets/quests/jinjun_yujinyuan_spear_duel.jpg` | `QST-SECT-33-YUJINYUAN-HORSE`<br>《玉津园 · 春日校马记》 | 第八幕 · 演武坪折戟<br>（`scene_jj_yj_08_repel_challenger`） | `16:9` |
| `CG-QST-107` | `[x]` 已完成 | `public/assets/quests/jinjun_taiyuan_fen_river_ambush.jpg` | `/assets/quests/jinjun_taiyuan_fen_river_ambush.jpg` | `QST-SECT-33-TAIYUAN-IRON`<br>《铁冶监 · 玄铁失耗案》 | 第五幕 · 汾水截车<br>（`scene_jj_ty_05_fen_river_ambush`） | `16:9` |
| `CG-QST-108` | `[x]` 已完成 | `public/assets/quests/jinjun_taiyuan_grandmaster_duel.jpg` | `/assets/quests/jinjun_taiyuan_grandmaster_duel.jpg` | `QST-SECT-33-TAIYUAN-IRON`<br>《铁冶监 · 玄铁失耗案》 | 第八幕 · 火海斩宗师<br>（`scene_jj_ty_08_grandmaster_duel`） | `16:9` |
| `CG-QST-109` | `[x]` 已完成 | `public/assets/quests/jinjun_qinzhou_maijishan_ambush.jpg` | `/assets/quests/jinjun_qinzhou_maijishan_ambush.jpg` | `QST-SECT-33-QINZHOU-HORSE`<br>《秦州道 · 茶马失纲录》 | 第五幕 · 麦积山伏<br>（`scene_jj_qz_05_maijishan_ambush`） | `16:9` |
| `CG-QST-110` | `[x]` 已完成 | `public/assets/quests/jinjun_qinzhou_beacon_duel.jpg` | `/assets/quests/jinjun_qinzhou_beacon_duel.jpg` | `QST-SECT-33-QINZHOU-HORSE`<br>《秦州道 · 茶马失纲录》 | 第七幕 · 烽燧绝战<br>（`scene_jj_qz_07_beacon_duel`） | `16:9` |
| `CG-QST-111` | `[x]` 已完成 | `public/assets/quests/murong_arc1_armory_crime.jpg` | `/assets/quests/murong_arc1_armory_crime.jpg` | `QST-SECT-33-MURONG-ARC-1`<br>《破燕 · 壹 · 汴梁暗影》 | 第二幕 · 军器监验尸<br>（`scene_jj_mr1_02_corpse_inspection`） | `16:9` |
| `CG-QST-112` | `[x]` 已完成 | `public/assets/quests/murong_arc1_wharf_duel.jpg` | `/assets/quests/murong_arc1_wharf_duel.jpg` | `QST-SECT-33-MURONG-ARC-1`<br>《破燕 · 壹 · 汴梁暗影》 | 第十幕 · 力战一阵风<br>（`scene_jj_mr1_10_feng_boe_duel`） | `16:9` |
| `CG-QST-113` | `[x]` 已完成 | `public/assets/quests/murong_arc2_shaolin_encircle.jpg` | `/assets/quests/murong_arc2_shaolin_encircle.jpg` | `QST-SECT-33-MURONG-ARC-2`<br>《破燕 · 贰 · 少室惊变》 | 第六幕 · 黑云压禅林<br>（`scene_jj_mr2_06_iron_encirclement`） | `16:9` |
| `CG-QST-114` | `[x]` 已完成 | `public/assets/quests/murong_arc2_murongfu_duel.jpg` | `/assets/quests/murong_arc2_murongfu_duel.jpg` | `QST-SECT-33-MURONG-ARC-2`<br>《破燕 · 贰 · 少室惊变》 | 第十四幕 · 寺前败慕容<br>（`scene_jj_mr2_14_murong_fu_duel`） | `16:9` |
| `CG-QST-115` | `[x]` 已完成 | `public/assets/quests/murong_arc2_murongbo_emerge.jpg` | `/assets/quests/murong_arc2_murongbo_emerge.jpg` | `QST-SECT-33-MURONG-ARC-2`<br>《破燕 · 贰 · 少室惊变》 | 第十九幕 · 参合指破空<br>（`scene_jj_mr2_19_murong_bo_emerge`） | `16:9` |
| `CG-QST-116` | `[x]` 已完成 | `public/assets/quests/murong_arc2_three_rounds_blood.jpg` | `/assets/quests/murong_arc2_three_rounds_blood.jpg` | `QST-SECT-33-MURONG-ARC-2`<br>《破燕 · 贰 · 少室惊变》 | 第二十二幕 · 硬接三轮绝杀<br>（`scene_jj_mr2_22_three_rounds_survive`） | `16:9` |
| `CG-QST-117` | `[x]` 已完成 | `public/assets/quests/murong_arc2_renzong_taixuan.jpg` | `/assets/quests/murong_arc2_renzong_taixuan.jpg` | `QST-SECT-33-MURONG-ARC-2`<br>《破燕 · 贰 · 少室惊变》 | 第二十九幕 · 御赐宫中《太玄经》<br>（`scene_jj_mr2_29_bestow_taixuan`） | `16:9` |
| `CG-QST-118` | `[x]` 已完成 | `public/assets/quests/murong_arc3_muster_3000.jpg` | `/assets/quests/murong_arc3_muster_3000.jpg` | `QST-SECT-33-MURONG-ARC-3`<br>《破燕 · 叁 · 血染太湖》 | 第三幕 · 三千铁甲南征<br>（`scene_jj_mr3_03_muster_3000`） | `16:9` |
| `CG-QST-119` | `[x]` 已完成 | `public/assets/quests/murong_arc3_gongye_qian.jpg` | `/assets/quests/murong_arc3_gongye_qian.jpg` | `QST-SECT-33-MURONG-ARC-3`<br>《破燕 · 叁 · 血染太湖》 | 第九幕 · 阵前生擒公冶乾<br>（`scene_jj_mr3_09_capture_gongye`） | `16:9` |
| `CG-QST-120` | `[x]` 已完成 | `public/assets/quests/murong_arc3_taihu_water_ghosts.jpg` | `/assets/quests/murong_arc3_taihu_water_ghosts.jpg` | `QST-SECT-33-MURONG-ARC-3`<br>《破燕 · 叁 · 血染太湖》 | 第十五幕 · 铁甲沉渊惨烈<br>（`scene_jj_mr3_15_red_lake_casualties`） | `16:9` |
| `CG-QST-121` | `[x]` 已完成 | `public/assets/quests/murong_arc3_bao_feng_deck.jpg` | `/assets/quests/murong_arc3_bao_feng_deck.jpg` | `QST-SECT-33-MURONG-ARC-3`<br>《破燕 · 叁 · 血染太湖》 | 第十八幕 · 甲板独斗包风<br>（`scene_jj_mr3_18_deck_1v2_duel`） | `16:9` |
| `CG-QST-122` | `[x]` 已完成 | `public/assets/quests/murong_arc3_deng_baichuan.jpg` | `/assets/quests/murong_arc3_deng_baichuan.jpg` | `QST-SECT-33-MURONG-ARC-3`<br>《破燕 · 叁 · 血染太湖》 | 第二十五幕 · 生擒邓百川<br>（`scene_jj_mr3_25_defeat_deng_baichuan`） | `16:9` |
| `CG-QST-123` | `[x]` 已完成 | `public/assets/quests/murong_arc3_canhe_five_rounds.jpg` | `/assets/quests/murong_arc3_canhe_five_rounds.jpg` | `QST-SECT-33-MURONG-ARC-3`<br>《破燕 · 叁 · 血染太湖》 | 第三十幕 · 参合堂终战五合<br>（`scene_jj_mr3_30_five_rounds_showdown`） | `16:9` |
| `CG-QST-124` | `[x]` 已完成 | `public/assets/quests/murong_arc3_yanziwu_ablaze.jpg` | `/assets/quests/murong_arc3_yanziwu_ablaze.jpg` | `QST-SECT-33-MURONG-ARC-3`<br>《破燕 · 叁 · 血染太湖》 | 第三十六幕 · 接管还施水阁 · 火照太湖<br>（`scene_jj_mr3_36_huanshi_library`） | `16:9` |
| `CG-QST-125` | `[x]` 已完成 | `public/assets/quests/murong_arc3_kaifeng_execution.jpg` | `/assets/quests/murong_arc3_kaifeng_execution.jpg` | `QST-SECT-33-MURONG-ARC-3`<br>《破燕 · 叁 · 血染太湖》 | 第三十九幕 · 市曹斩四将<br>（`scene_jj_mr3_39_public_execution`） | `16:9` |
| `CG-QST-126` | `[x]` 已完成 | `public/assets/quests/jinjun_twg_banquet_debate.jpg` | `/assets/quests/jinjun_twg_banquet_debate.jpg` | `QST-SECT-33-TONGWENGUAN`<br>《同文馆 · 四夷宾服录》 | 第一幕 · 瑞雪迎宾令<br>（`scene_twg_01`） | `16:9` |
| `CG-QST-127` | `[x]` 已完成 | `public/assets/quests/jinjun_twg_night_fire.jpg` | `/assets/quests/jinjun_twg_night_fire.jpg` | `QST-SECT-33-TONGWENGUAN`<br>《同文馆 · 四夷宾服录》 | 第九幕 · 镇南王致敬<br>（`scene_twg_09`） | `16:9` |
| `CG-QST-128` | `[x]` 已完成 | `public/assets/quests/jinjun_twg_duan_flame.jpg` | `/assets/quests/jinjun_twg_duan_flame.jpg` | `QST-SECT-33-TONGWENGUAN`<br>《同文馆 · 四夷宾服录》 | 第十四幕 · 火焰刀逼险<br>（`scene_twg_14`） | `16:9` |
| `CG-QST-129` | `[x]` 已完成 | `public/assets/quests/jinjun_twg_jiumozhi_duel.jpg` | `/assets/quests/jinjun_twg_jiumozhi_duel.jpg` | `QST-SECT-33-TONGWENGUAN`<br>《同文馆 · 四夷宾服录》 | 第十五幕 · 挺枪救危局<br>（`scene_twg_15`） | `16:9` |
| `CG-QST-130` | `[x]` 已完成 | `public/assets/quests/jinjun_twg_dali_treaty.jpg` | `/assets/quests/jinjun_twg_dali_treaty.jpg` | `QST-SECT-33-TONGWENGUAN`<br>《同文馆 · 四夷宾服录》 | 第十八幕 · 枪挑袈裟环<br>（`scene_twg_18`） | `16:9` |
| `CG-QST-131` | `[x]` 已完成 | `public/assets/quests/jinjun_yn_diqing_muster.jpg` | `/assets/quests/jinjun_yn_diqing_muster.jpg` | `QST-SECT-33-YONGZHOU-NANMAN`<br>《邕州道 · 蛮烟瘴雨平》 | 第一幕 · 岭南八百里加急<br>（`scene_yn_01`） | `16:9` |
| `CG-QST-132` | `[x]` 已完成 | `public/assets/quests/jinjun_yn_poison_altar.jpg` | `/assets/quests/jinjun_yn_poison_altar.jpg` | `QST-SECT-33-YONGZHOU-NANMAN`<br>《邕州道 · 蛮烟瘴雨平》 | 第三幕 · 帅旗双雄会<br>（`scene_yn_03`） | `16:9` |
| `CG-QST-133` | `[x]` 已完成 | `public/assets/quests/jinjun_yn_lantern_ruse.jpg` | `/assets/quests/jinjun_yn_lantern_ruse.jpg` | `QST-SECT-33-YONGZHOU-NANMAN`<br>《邕州道 · 蛮烟瘴雨平》 | 第十一幕 · 夺取解瘴药<br>（`scene_yn_11`） | `16:9` |
| `CG-QST-134` | `[x]` 已完成 | `public/assets/quests/jinjun_yn_elephant_charge.jpg` | `/assets/quests/jinjun_yn_elephant_charge.jpg` | `QST-SECT-33-YONGZHOU-NANMAN`<br>《邕州道 · 蛮烟瘴雨平》 | 第十三幕 · 暴雨渡昆仑<br>（`scene_yn_13`） | `16:9` |
| `CG-QST-135` | `[x]` 已完成 | `public/assets/quests/jinjun_yn_zhaixingzi_duel.jpg` | `/assets/quests/jinjun_yn_zhaixingzi_duel.jpg` | `QST-SECT-33-YONGZHOU-NANMAN`<br>《邕州道 · 蛮烟瘴雨平》 | 第十八幕 · 双枪凿敌阵<br>（`scene_yn_18`） | `16:9` |
| `CG-QST-136` | `[x]` 已完成 | `public/assets/quests/jinjun_yn_guirenpu_rout.jpg` | `/assets/quests/jinjun_yn_guirenpu_rout.jpg` | `QST-SECT-33-YONGZHOU-NANMAN`<br>《邕州道 · 蛮烟瘴雨平》 | 第二十一幕 · 妖道伏诛死<br>（`scene_yn_21`） | `16:9` |
| `CG-QST-137` | `[x]` 已完成 | `public/assets/quests/jinjun_yn_lijiang_spear.jpg` | `/assets/quests/jinjun_yn_lijiang_spear.jpg` | `QST-SECT-33-YONGZHOU-NANMAN`<br>《邕州道 · 蛮烟瘴雨平》 | 第二十四幕 · 漓江泛舟饮<br>（`scene_yn_24`） | `16:9` |
| `CG-QST-138` | `[x]` 已完成 | `public/assets/quests/jinjun_yn_xuande_rank5.jpg` | `/assets/quests/jinjun_yn_xuande_rank5.jpg` | `QST-SECT-33-YONGZHOU-NANMAN`<br>《邕州道 · 蛮烟瘴雨平》 | 第二十六幕 · 整军北归途<br>（`scene_yn_26`） | `16:9` |
| `CG-QST-139` | `[x]` 已完成 | `public/assets/quests/jinjun_fn1_cavalry_dispatch.jpg` | `/assets/quests/jinjun_fn1_cavalry_dispatch.jpg` | `QST-SECT-33-FINAL-1`<br>《裂夏 · 壹 · 杏林悲风》 | 第一幕 · 皇城司急报<br>（`scene_fn1_01`） | `16:9` |
| `CG-QST-140` | `[x]` 已完成 | `public/assets/quests/jinjun_fn1_beisu_mist.jpg` | `/assets/quests/jinjun_fn1_beisu_mist.jpg` | `QST-SECT-33-FINAL-1`<br>《裂夏 · 壹 · 杏林悲风》 | 第五幕 · 急行两浙路<br>（`scene_fn1_05`） | `16:9` |
| `CG-QST-141` | `[x]` 已完成 | `public/assets/quests/jinjun_fn1_shield_break.jpg` | `/assets/quests/jinjun_fn1_shield_break.jpg` | `QST-SECT-33-FINAL-1`<br>《裂夏 · 壹 · 杏林悲风》 | 第七幕 · 贼子狂笑声<br>（`scene_fn1_07`） | `16:9` |
| `CG-QST-142` | `[x]` 已完成 | `public/assets/quests/jinjun_fn1_qiaofeng_duo.jpg` | `/assets/quests/jinjun_fn1_qiaofeng_duo.jpg` | `QST-SECT-33-FINAL-1`<br>《裂夏 · 壹 · 杏林悲风》 | 第十幕 · 仇人分外眼红<br>（`scene_fn1_10`） | `16:9` |
| `CG-QST-143` | `[x]` 已完成 | `public/assets/quests/jinjun_fn1_duan_yanqing.jpg` | `/assets/quests/jinjun_fn1_duan_yanqing.jpg` | `QST-SECT-33-FINAL-1`<br>《裂夏 · 壹 · 杏林悲风》 | 第十三幕 · 腹语铁杖袭<br>（`scene_fn1_13`） | `16:9` |
| `CG-QST-144` | `[x]` 已完成 | `public/assets/quests/jinjun_fn1_murongfu_cripple.jpg` | `/assets/quests/jinjun_fn1_murongfu_cripple.jpg` | `QST-SECT-33-FINAL-1`<br>《裂夏 · 壹 · 杏林悲风》 | 第十五幕 · 疯魔剑路乱<br>（`scene_fn1_15`） | `16:9` |
| `CG-QST-145` | `[x]` 已完成 | `public/assets/quests/jinjun_fn1_songhelou_drink.jpg` | `/assets/quests/jinjun_fn1_songhelou_drink.jpg` | `QST-SECT-33-FINAL-1`<br>《裂夏 · 壹 · 杏林悲风》 | 第十七幕 · 毒烟遁残寇<br>（`scene_fn1_17`） | `16:9` |
| `CG-QST-146` | `[x]` 已完成 | `public/assets/quests/jinjun_fn1_prisoner_confess.jpg` | `/assets/quests/jinjun_fn1_prisoner_confess.jpg` | `QST-SECT-33-FINAL-1`<br>《裂夏 · 壹 · 杏林悲风》 | 第二十七幕 · 互诉平生志<br>（`scene_fn1_27`） | `16:9` |
| `CG-QST-147` | `[x]` 已完成 | `public/assets/quests/jinjun_fn2_shangfang_sword.jpg` | `/assets/quests/jinjun_fn2_shangfang_sword.jpg` | `QST-SECT-33-FINAL-2`<br>《裂夏 · 贰 · 横山铁鹞》 | 第一幕 · 泾原烽烟起<br>（`scene_fn2_01`） | `16:9` |
| `CG-QST-148` | `[x]` 已完成 | `public/assets/quests/jinjun_fn2_tongguan_march.jpg` | `/assets/quests/jinjun_fn2_tongguan_march.jpg` | `QST-SECT-33-FINAL-2`<br>《裂夏 · 贰 · 横山铁鹞》 | 第四幕 · 军器监尽出<br>（`scene_fn2_04`） | `16:9` |
| `CG-QST-149` | `[x]` 已完成 | `public/assets/quests/jinjun_fn2_zhong_sandtable.jpg` | `/assets/quests/jinjun_fn2_zhong_sandtable.jpg` | `QST-SECT-33-FINAL-2`<br>《裂夏 · 贰 · 横山铁鹞》 | 第六幕 · 初抵鄜延境<br>（`scene_fn2_06`） | `16:9` |
| `CG-QST-150` | `[x]` 已完成 | `public/assets/quests/jinjun_fn2_tieyaozi_charge.jpg` | `/assets/quests/jinjun_fn2_tieyaozi_charge.jpg` | `QST-SECT-33-FINAL-2`<br>《裂夏 · 贰 · 横山铁鹞》 | 第十二幕 · 老帅请镇中<br>（`scene_fn2_12`） | `16:9` |
| `CG-QST-151` | `[x]` 已完成 | `public/assets/quests/jinjun_fn2_chariot_wall.jpg` | `/assets/quests/jinjun_fn2_chariot_wall.jpg` | `QST-SECT-33-FINAL-2`<br>《裂夏 · 贰 · 横山铁鹞》 | 第二十幕 · 钢铁车城锁<br>（`scene_fn2_20`） | `16:9` |
| `CG-QST-152` | `[x]` 已完成 | `public/assets/quests/jinjun_fn2_shenbi_volley.jpg` | `/assets/quests/jinjun_fn2_shenbi_volley.jpg` | `QST-SECT-33-FINAL-2`<br>《裂夏 · 贰 · 横山铁鹞》 | 第二十一幕 · 万箭穿重甲<br>（`scene_fn2_21`） | `16:9` |
| `CG-QST-153` | `[x]` 已完成 | `public/assets/quests/jinjun_fn2_zhong_martyr.jpg` | `/assets/quests/jinjun_fn2_zhong_martyr.jpg` | `QST-SECT-33-FINAL-2`<br>《裂夏 · 贰 · 横山铁鹞》 | 第二十二幕 · 白虹袭车阵<br>（`scene_fn2_22`） | `16:9` |
| `CG-QST-154` | `[x]` 已完成 | `public/assets/quests/jinjun_fn2_liqiushui_clash.jpg` | `/assets/quests/jinjun_fn2_liqiushui_clash.jpg` | `QST-SECT-33-FINAL-2`<br>《裂夏 · 贰 · 横山铁鹞》 | 第二十四幕 · 金枪战太妃<br>（`scene_fn2_24`） | `16:9` |
| `CG-QST-155` | `[x]` 已完成 | `public/assets/quests/jinjun_fn2_taixuan_break.jpg` | `/assets/quests/jinjun_fn2_taixuan_break.jpg` | `QST-SECT-33-FINAL-2`<br>《裂夏 · 贰 · 横山铁鹞》 | 第二十五幕 · 太玄破白虹<br>（`scene_fn2_25`） | `16:9` |
| `CG-QST-156` | `[x]` 已完成 | `public/assets/quests/jinjun_fn2_cavalry_flank.jpg` | `/assets/quests/jinjun_fn2_cavalry_flank.jpg` | `QST-SECT-33-FINAL-2`<br>《裂夏 · 贰 · 横山铁鹞》 | 第二十六幕 · 两翼捣王帐<br>（`scene_fn2_26`） | `16:9` |
| `CG-QST-157` | `[x]` 已完成 | `public/assets/quests/jinjun_fn2_zhong_bequest.jpg` | `/assets/quests/jinjun_fn2_zhong_bequest.jpg` | `QST-SECT-33-FINAL-2`<br>《裂夏 · 贰 · 横山铁鹞》 | 第二十七幕 · 十万夏军溃<br>（`scene_fn2_27`） | `16:9` |
| `CG-QST-158` | `[x]` 已完成 | `public/assets/quests/jinjun_fn2_hengshan_victory.jpg` | `/assets/quests/jinjun_fn2_hengshan_victory.jpg` | `QST-SECT-33-FINAL-2`<br>《裂夏 · 贰 · 横山铁鹞》 | 第三十幕 · 忠魂归天地<br>（`scene_fn2_30`） | `16:9` |
| `CG-QST-159` | `[x]` 已完成 | `public/assets/quests/jinjun_fn3_black_feather.jpg` | `/assets/quests/jinjun_fn3_black_feather.jpg` | `QST-SECT-33-FINAL-3`<br>《定鼎 · 叁 · 血月雁门》 | 第一幕 · 雪夜黑羽檄<br>（`scene_fn3_01`） | `16:9` |
| `CG-QST-160` | `[x]` 已完成 | `public/assets/quests/jinjun_fn3_court_panic.jpg` | `/assets/quests/jinjun_fn3_court_panic.jpg` | `QST-SECT-33-FINAL-3`<br>《定鼎 · 叁 · 血月雁门》 | 第二幕 · 朝野执笏谏<br>（`scene_fn3_02`） | `16:9` |
| `CG-QST-161` | `[x]` 已完成 | `public/assets/quests/jinjun_fn3_xiaofeng_lonely.jpg` | `/assets/quests/jinjun_fn3_xiaofeng_lonely.jpg` | `QST-SECT-33-FINAL-3`<br>《定鼎 · 叁 · 血月雁门》 | 第三幕 · 不待圣旨行<br>（`scene_fn3_03`） | `16:9` |
| `CG-QST-162` | `[x]` 已完成 | `public/assets/quests/jinjun_fn3_ambush_trap.jpg` | `/assets/quests/jinjun_fn3_ambush_trap.jpg` | `QST-SECT-33-FINAL-3`<br>《定鼎 · 叁 · 血月雁门》 | 第六幕 · 十面伏杀局<br>（`scene_fn3_06`） | `16:9` |
| `CG-QST-163` | `[x]` 已完成 | `public/assets/quests/jinjun_fn3_gate_open.jpg` | `/assets/quests/jinjun_fn3_gate_open.jpg` | `QST-SECT-33-FINAL-3`<br>《定鼎 · 叁 · 血月雁门》 | 第七幕 · 千里终抵关<br>（`scene_fn3_07`） | `16:9` |
| `CG-QST-164` | `[x]` 已完成 | `public/assets/quests/jinjun_fn3_xiaoyuanfeng_duel.jpg` | `/assets/quests/jinjun_fn3_xiaoyuanfeng_duel.jpg` | `QST-SECT-33-FINAL-3`<br>《定鼎 · 叁 · 血月雁门》 | 第十二幕 · 御弩破暗箭<br>（`scene_fn3_12`） | `16:9` |
| `CG-QST-165` | `[x]` 已完成 | `public/assets/quests/jinjun_fn3_xiaoyuanfeng_slain.jpg` | `/assets/quests/jinjun_fn3_xiaoyuanfeng_slain.jpg` | `QST-SECT-33-FINAL-3`<br>《定鼎 · 叁 · 血月雁门》 | 第十四幕 · 了断数年仇<br>（`scene_fn3_14`） | `16:9` |
| `CG-QST-166` | `[x]` 已完成 | `public/assets/quests/jinjun_fn3_murongbo_emerge.jpg` | `/assets/quests/jinjun_fn3_murongbo_emerge.jpg` | `QST-SECT-33-FINAL-3`<br>《定鼎 · 叁 · 血月雁门》 | 第十六幕 · 魔尊踏血出<br>（`scene_fn3_16`） | `16:9` |
| `CG-QST-167` | `[x]` 已完成 | `public/assets/quests/jinjun_fn3_wall_duel.jpg` | `/assets/quests/jinjun_fn3_wall_duel.jpg` | `QST-SECT-33-FINAL-3`<br>《定鼎 · 叁 · 血月雁门》 | 第十七幕 · 风雪为之停<br>（`scene_fn3_17`） | `16:9` |
| `CG-QST-168` | `[x]` 已完成 | `public/assets/quests/jinjun_fn3_armor_shatter.jpg` | `/assets/quests/jinjun_fn3_armor_shatter.jpg` | `QST-SECT-33-FINAL-3`<br>《定鼎 · 叁 · 血月雁门》 | 第十九幕 · 碎甲欺身入<br>（`scene_fn3_19`） | `16:9` |
| `CG-QST-169` | `[x]` 已完成 | `public/assets/quests/jinjun_fn3_murongbo_nailed.jpg` | `/assets/quests/jinjun_fn3_murongbo_nailed.jpg` | `QST-SECT-33-FINAL-3`<br>《定鼎 · 叁 · 血月雁门》 | 第二十幕 · 金枪钉魔尊<br>（`scene_fn3_20`） | `16:9` |
| `CG-QST-170` | `[x]` 已完成 | `public/assets/quests/jinjun_fn3_xiaofeng_capture.jpg` | `/assets/quests/jinjun_fn3_xiaofeng_capture.jpg` | `QST-SECT-33-FINAL-3`<br>《定鼎 · 叁 · 血月雁门》 | 第二十一幕 · 萧峰擒辽帅<br>（`scene_fn3_21`） | `16:9` |
| `CG-QST-171` | `[x]` 已完成 | `public/assets/quests/jinjun_fn3_xiaofeng_farewell.jpg` | `/assets/quests/jinjun_fn3_xiaofeng_farewell.jpg` | `QST-SECT-33-FINAL-3`<br>《定鼎 · 叁 · 血月雁门》 | 第二十二幕 · 铁林退如潮<br>（`scene_fn3_22`） | `16:9` |
| `CG-QST-172` | `[x]` 已完成 | `public/assets/quests/jinjun_fn3_kaifeng_welcome.jpg` | `/assets/quests/jinjun_fn3_kaifeng_welcome.jpg` | `QST-SECT-33-FINAL-3`<br>《定鼎 · 叁 · 血月雁门》 | 第二十四幕 · 纵马隐塞外<br>（`scene_fn3_24`） | `16:9` |
| `CG-QST-173` | `[x]` 已完成 | `public/assets/quests/jinjun_fn3_daqing_hall.jpg` | `/assets/quests/jinjun_fn3_daqing_hall.jpg` | `QST-SECT-33-FINAL-3`<br>《定鼎 · 叁 · 血月雁门》 | 第三十五幕 · 君臣并马行<br>（`scene_fn3_35`） | `16:9` |
| `CG-QST-174` | `[x]` 已完成 | `public/assets/quests/hs_q01_yaowang_depart.jpg` | `/assets/quests/hs_q01_yaowang_depart.jpg` | `QST-SECT-05-01`<br>《药王除恶 · 十二初试》 | 第三幕 · 玉女授命<br>（`scene_hsq01_03`） | `16:9` |
| `CG-QST-175` | `[x]` 已完成 | `public/assets/quests/hs_q01_cypress_duel.jpg` | `/assets/quests/hs_q01_cypress_duel.jpg` | `QST-SECT-05-01`<br>《药王除恶 · 十二初试》 | 第八幕 · 古柏争锋<br>（`scene_hsq01_08`） | `16:9` |
| `CG-QST-176` | `[x]` 已完成 | `public/assets/quests/hs_q02_botai_arena.jpg` | `/assets/quests/hs_q02_botai_arena.jpg` | `QST-SECT-05-02`<br>《博台大比 · 剑气分宗》 | 第三幕 · 四老临坛<br>（`scene_hsq02_03`） | `16:9` |
| `CG-QST-177` | `[x]` 已完成 | `public/assets/quests/hs_q02_defeat_luzhanfeng.jpg` | `/assets/quests/hs_q02_defeat_luzhanfeng.jpg` | `QST-SECT-05-02`<br>《博台大比 · 剑气分宗》 | 第十幕 · 一剑夺魁<br>（`scene_hsq02_10`） | `16:9` |
| `CG-QST-178` | `[x]` 已完成 | `public/assets/quests/hs_q02_zixia_division.jpg` | `/assets/quests/hs_q02_zixia_division.jpg` | `QST-SECT-05-02`<br>《博台大比 · 剑气分宗》 | 第十三幕 · 烛影挑明<br>（`scene_hsq02_13`） | `16:9` |
| `CG-QST-179` | `[x]` 已完成 | `public/assets/quests/hs_q03_dawn_yangwu.jpg` | `/assets/quests/hs_q03_dawn_yangwu.jpg` | `QST-SECT-05-03`<br>《玉女晨钟 · 浩然养吾》 | 第三幕 · 亲授养吾<br>（`scene_hsq03_03`） | `16:9` |
| `CG-QST-180` | `[x]` 已完成 | `public/assets/quests/hs_q03_guard_counter.jpg` | `/assets/quests/hs_q03_guard_counter.jpg` | `QST-SECT-05-03`<br>《玉女晨钟 · 浩然养吾》 | 第十一幕 · 守中破妄<br>（`scene_hsq03_11`） | `16:9` |
| `CG-QST-181` | `[x]` 已完成 | `public/assets/quests/hs_q04_weishui_boat.jpg` | `/assets/quests/hs_q04_weishui_boat.jpg` | `QST-SECT-05-04`<br>《渭水惊澜 · 混元破寨》 | 第七幕 · 渭水传掌<br>（`scene_hsq04_07`） | `16:9` |
| `CG-QST-182` | `[x]` 已完成 | `public/assets/quests/hs_q04_shatter_shields.jpg` | `/assets/quests/hs_q04_shatter_shields.jpg` | `QST-SECT-05-04`<br>《渭水惊澜 · 混元破寨》 | 第十一幕 · 混元裂盾<br>（`scene_hsq04_11`） | `16:9` |
| `CG-QST-183` | `[x]` 已完成 | `public/assets/quests/hs_q04_fort_ablaze.jpg` | `/assets/quests/hs_q04_fort_ablaze.jpg` | `QST-SECT-05-04`<br>《渭水惊澜 · 混元破寨》 | 第十五幕 · 火焚水寨<br>（`scene_hsq04_15`） | `16:9` |
| `CG-QST-184` | `[x]` 已完成 | `public/assets/quests/hs_q05_louguan_homage.jpg` | `/assets/quests/hs_q05_louguan_homage.jpg` | `QST-SECT-05-05`<br>《楼观护道 · 希夷剑韵》 | 第五幕 · 楼观礼祖<br>（`scene_hsq05_05`） | `16:9` |
| `CG-QST-185` | `[x]` 已完成 | `public/assets/quests/hs_q05_pine_ambush.jpg` | `/assets/quests/hs_q05_pine_ambush.jpg` | `QST-SECT-05-05`<br>《楼观护道 · 希夷剑韵》 | 第十三幕 · 松碑授剑<br>（`scene_hsq05_13`） | `16:9` |
| `CG-QST-186` | `[x]` 已完成 | `public/assets/quests/hs_q05_xiyi_triumph.jpg` | `/assets/quests/hs_q05_xiyi_triumph.jpg` | `QST-SECT-05-05`<br>《楼观护道 · 希夷剑韵》 | 第十七幕 · 大象无形<br>（`scene_hsq05_17`） | `16:9` |
| `CG-QST-187` | `[x]` 已完成 | `public/assets/quests/hs_q06_jianlu_throw.jpg` | `/assets/quests/hs_q06_jianlu_throw.jpg` | `QST-SECT-05-06`<br>《潼关血刃 · 以快驭正》 | 第二幕 · 掷剑立诫<br>（`scene_hsq06_02`） | `16:9` |
| `CG-QST-188` | `[x]` 已完成 | `public/assets/quests/hs_q06_tongguan_blitz.jpg` | `/assets/quests/hs_q06_tongguan_blitz.jpg` | `QST-SECT-05-06`<br>《潼关血刃 · 以快驭正》 | 第十一幕 · 以快驭正<br>（`scene_hsq06_11`） | `16:9` |
| `CG-QST-189` | `[x]` 已完成 | `public/assets/quests/hs_q07_fengling_geese.jpg` | `/assets/quests/hs_q07_fengling_geese.jpg` | `QST-SECT-05-07`<br>《风陵夜渡 · 平沙落雁》 | 第三幕 · 秋雁扑波<br>（`scene_hsq07_03`） | `16:9` |
| `CG-QST-190` | `[x]` 已完成 | `public/assets/quests/hs_q07_skiff_raid.jpg` | `/assets/quests/hs_q07_skiff_raid.jpg` | `QST-SECT-05-07`<br>《风陵夜渡 · 平沙落雁》 | 第七幕 · 孤舟破哨<br>（`scene_hsq07_07`） | `16:9` |
| `CG-QST-191` | `[x]` 已完成 | `public/assets/quests/hs_q07_bloodless_blade.jpg` | `/assets/quests/hs_q07_bloodless_blade.jpg` | `QST-SECT-05-07`<br>《风陵夜渡 · 平沙落雁》 | 第十四幕 · 剑不沾衣<br>（`scene_hsq07_14`） | `16:9` |
| `CG-QST-192` | `[x]` 已完成 | `public/assets/quests/hs_q08_qin_three_moves.jpg` | `/assets/quests/hs_q08_qin_three_moves.jpg` | `QST-SECT-05-08`<br>《云台残局 · 希夷求变》 | 第三幕 · 博台折锋<br>（`scene_hsq08_03`） | `16:9` |
| `CG-QST-193` | `[x]` 已完成 | `public/assets/quests/hs_q08_yuntai_chess.jpg` | `/assets/quests/hs_q08_yuntai_chess.jpg` | `QST-SECT-05-08`<br>《云台残局 · 希夷求变》 | 第八幕 · 云台悟变<br>（`scene_hsq08_08`） | `16:9` |
| `CG-QST-194` | `[x]` 已完成 | `public/assets/quests/hs_q08_falls_assassins.jpg` | `/assets/quests/hs_q08_falls_assassins.jpg` | `QST-SECT-05-08`<br>《云台残局 · 希夷求变》 | 第十五幕 · 银瀑封喉<br>（`scene_hsq08_15`） | `16:9` |
| `CG-QST-195` | `[x]` 已完成 | `public/assets/quests/hs_q09_hunyuan_neigong.jpg` | `/assets/quests/hs_q09_hunyuan_neigong.jpg` | `QST-SECT-05-09`<br>《东峰迎曦 · 由外而内》 | 第二幕 · 由外而内<br>（`scene_hsq09_02`） | `16:9` |
| `CG-QST-196` | `[x]` 已完成 | `public/assets/quests/hs_q09_xishi_firetrap.jpg` | `/assets/quests/hs_q09_xishi_firetrap.jpg` | `QST-SECT-05-09`<br>《东峰迎曦 · 由外而内》 | 第十幕 · 西市毒网<br>（`scene_hsq09_10`） | `16:9` |
| `CG-QST-197` | `[x]` 已完成 | `public/assets/quests/hs_q09_rebound_poison.jpg` | `/assets/quests/hs_q09_rebound_poison.jpg` | `QST-SECT-05-09`<br>《东峰迎曦 · 由外而内》 | 第十二幕 · 混元返震<br>（`scene_hsq09_12`） | `16:9` |
| `CG-QST-198` | `[x]` 已完成 | `public/assets/quests/hs_q09_zixia_robe.jpg` | `/assets/quests/hs_q09_zixia_robe.jpg` | `QST-SECT-05-09`<br>《东峰迎曦 · 由外而内》 | 第二十五幕 · 紫衫荣光<br>（`scene_hsq09_25`） | `16:9` |
| `CG-QST-199` | `[x]` 已完成 | `public/assets/quests/hs_q10_ten_strikes.jpg` | `/assets/quests/hs_q10_ten_strikes.jpg` | `QST-SECT-05-10`<br>《落雁借剑 · 太岳三峰》 | 第七幕 · 十剑不退<br>（`scene_hsq10_07`） | `16:9` |
| `CG-QST-200` | `[x]` 已完成 | `public/assets/quests/hs_q10_blood_monk_duel.jpg` | `/assets/quests/hs_q10_blood_monk_duel.jpg` | `QST-SECT-05-10`<br>《落雁借剑 · 太岳三峰》 | 第十五幕 · 出关斩恶<br>（`scene_hsq10_15`） | `16:9` |
| `CG-QST-201` | `[x]` 已完成 | `public/assets/quests/hs_q10_jade_casket.jpg` | `/assets/quests/hs_q10_jade_casket.jpg` | `QST-SECT-05-10`<br>《落雁借剑 · 太岳三峰》 | 第二十一幕 · 白玉启匣<br>（`scene_hsq10_21`） | `16:9` |
| `CG-QST-202` | `[x]` 已完成 | `public/assets/quests/hs_q10_three_peaks_sword.jpg` | `/assets/quests/hs_q10_three_peaks_sword.jpg` | `QST-SECT-05-10`<br>《落雁借剑 · 太岳三峰》 | 第二十四幕 · 三峰插云<br>（`scene_hsq10_24`） | `16:9` |
| `CG-QST-203` | `[x]` 已完成 | `public/assets/quests/hs_q11_ruined_jianlu.jpg` | `/assets/quests/hs_q11_ruined_jianlu.jpg` | `QST-SECT-05-11`<br>《剑庐残烛 · 夺命三仙》 | 第三幕 · 残庐泣血<br>（`scene_hsq11_03`） | `16:9` |
| `CG-QST-204` | `[x]` 已完成 | `public/assets/quests/hs_q11_sanxian_impart.jpg` | `/assets/quests/hs_q11_sanxian_impart.jpg` | `QST-SECT-05-11`<br>《剑庐残烛 · 夺命三仙》 | 第六幕 · 夺命三仙<br>（`scene_hsq11_06`） | `16:9` |
| `CG-QST-205` | `[x]` 已完成 | `public/assets/quests/hs_q11_huayin_slay.jpg` | `/assets/quests/hs_q11_huayin_slay.jpg` | `QST-SECT-05-11`<br>《剑庐残烛 · 夺命三仙》 | 第十三幕 · 三剑无生<br>（`scene_hsq11_13`） | `16:9` |
| `CG-QST-206` | `[x]` 已完成 | `public/assets/quests/hs_q11_qin_interrogate.jpg` | `/assets/quests/hs_q11_qin_interrogate.jpg` | `QST-SECT-05-11`<br>《剑庐残烛 · 夺命三仙》 | 第十七幕 · 寒月盘剑<br>（`scene_hsq11_17`） | `16:9` |
| `CG-QST-207` | `[x]` 已完成 | `public/assets/quests/hs_q12_snow_ascent.jpg` | `/assets/quests/hs_q12_snow_ascent.jpg` | `QST-SECT-05-12`<br>《白玉问剑 · 潼关剑神》 | 第六幕 · 踏雪登落雁<br>（`scene_hsq12_06`） | `16:9` |
| `CG-QST-208` | `[x]` 已完成 | `public/assets/quests/hs_q12_broken_blade.jpg` | `/assets/quests/hs_q12_broken_blade.jpg` | `QST-SECT-05-12`<br>《白玉问剑 · 潼关剑神》 | 第十幕 · 断刃指喉寸步不让<br>（`scene_hsq12_10`） | `16:9` |
| `CG-QST-209` | `[x]` 已完成 | `public/assets/quests/hs_q12_black_inn.jpg` | `/assets/quests/hs_q12_black_inn.jpg` | `QST-SECT-05-12`<br>《白玉问剑 · 潼关剑神》 | 第十六幕 · 掀桌破局救商旅<br>（`scene_hsq12_16`） | `16:9` |
| `CG-QST-210` | `[x]` 已完成 | `public/assets/quests/hs_q12_manual_bestow.jpg` | `/assets/quests/hs_q12_manual_bestow.jpg` | `QST-SECT-05-12`<br>《白玉问剑 · 潼关剑神》 | 第二十二幕 · 剑神托付镇山谱<br>（`scene_hsq12_22`） | `16:9` |
| `CG-QST-211` | `[x]` 已完成 | `public/assets/quests/hs_q12_taiyue_mastery.jpg` | `/assets/quests/hs_q12_taiyue_mastery.jpg` | `QST-SECT-05-12`<br>《白玉问剑 · 潼关剑神》 | 第二十四幕 · 剑意贯通演太岳<br>（`scene_hsq12_24`） | `16:9` |
| `CG-QST-212` | `[x]` 已完成 | `public/assets/quests/hs_q13_iron_lock_broken.jpg` | `/assets/quests/hs_q13_iron_lock_broken.jpg` | `QST-SECT-05-13`<br>《寒风面壁 · 铁锁惊雷》 | 第八幕 · 惊雷断锁黑影遁<br>（`scene_hsq13_08`） | `16:9` |
| `CG-QST-213` | `[x]` 已完成 | `public/assets/quests/hs_q13_bones_and_carvings.jpg` | `/assets/quests/hs_q13_bones_and_carvings.jpg` | `QST-SECT-05-13`<br>《寒风面壁 · 铁锁惊雷》 | 第十二幕 · 枯骨枕藉泣同门<br>（`scene_hsq13_12`） | `16:9` |
| `CG-QST-214` | `[x]` 已完成 | `public/assets/quests/hs_q13_cave_spy_duel.jpg` | `/assets/quests/hs_q13_cave_spy_duel.jpg` | `QST-SECT-05-13`<br>《寒风面壁 · 铁锁惊雷》 | 第十六幕 · 幽窟火影死生决<br>（`scene_hsq13_16`） | `16:9` |
| `CG-QST-215` | `[x]` 已完成 | `public/assets/quests/hs_q13_wall_crossroad.jpg` | `/assets/quests/hs_q13_wall_crossroad.jpg` | `QST-SECT-05-13`<br>《寒风面壁 · 铁锁惊雷》 | 第二十幕 · 泣血石壁一念分途<br>（`scene_hsq13_20`） | `16:9` |
| `CG-QST-216` | `[x]` 已完成 | `public/assets/quests/hs_q14_shave_cliff.jpg` | `/assets/quests/hs_q14_shave_cliff.jpg` | `QST-SECT-05-14`<br>《石室止戈 · 剑气同源》 | 第二幕 · 挥剑如雪削魔刻<br>（`scene_hsq14_02`） | `16:9` |
| `CG-QST-217` | `[x]` 已完成 | `public/assets/quests/hs_q14_four_elders_mourn.jpg` | `/assets/quests/hs_q14_four_elders_mourn.jpg` | `QST-SECT-05-14`<br>《石室止戈 · 剑气同源》 | 第十三幕 · 四老抚冢泣拜先人<br>（`scene_hsq14_13`） | `16:9` |
| `CG-QST-218` | `[x]` 已完成 | `public/assets/quests/hs_q14_cross_lineage_teach.jpg` | `/assets/quests/hs_q14_cross_lineage_teach.jpg` | `QST-SECT-05-14`<br>《石室止戈 · 剑气同源》 | 第十七幕 · 打破门户交叉授艺<br>（`scene_hsq14_17`） | `16:9` |
| `CG-QST-219` | `[x]` 已完成 | `public/assets/quests/hs_q15_midnight_rubbing.jpg` | `/assets/quests/hs_q15_midnight_rubbing.jpg` | `QST-SECT-05-15`<br>《魔刻噬心 · 破尽同门》 | 第二幕 · 烛影摇红私拓魔刻<br>（`scene_hsq15_02`） | `16:9` |
| `CG-QST-220` | `[x]` 已完成 | `public/assets/quests/hs_q15_cruel_spar.jpg` | `/assets/quests/hs_q15_cruel_spar.jpg` | `QST-SECT-05-15`<br>《魔刻噬心 · 破尽同门》 | 第十幕 · 刁钻一刺惊满座<br>（`scene_hsq15_10`） | `16:9` |
| `CG-QST-221` | `[x]` 已完成 | `public/assets/quests/hs_q15_secret_plot.jpg` | `/assets/quests/hs_q15_secret_plot.jpg` | `QST-SECT-05-15`<br>《魔刻噬心 · 破尽同门》 | 第十七幕 · 寒庐密谋夺紫霞<br>（`scene_hsq15_17`） | `16:9` |
| `CG-QST-222` | `[x]` 已完成 | `public/assets/quests/hs_q16_yanta_siege.jpg` | `/assets/quests/hs_q16_yanta_siege.jpg` | `QST-SECT-05-16`<br>《雁塔风雷 · 京兆除魔》 | 第六幕 · 雁塔风雷毒雾笼<br>（`scene_hsq16_06`） | `16:9` |
| `CG-QST-223` | `[x]` 已完成 | `public/assets/quests/hs_q16_seven_floors_blood.jpg` | `/assets/quests/hs_q16_seven_floors_blood.jpg` | `QST-SECT-05-16`<br>《雁塔风雷 · 京兆除魔》 | 第十二幕 · 血战七层破刀阵<br>（`scene_hsq16_12`） | `16:9` |
| `CG-QST-224` | `[x]` 已完成 | `public/assets/quests/hs_q16_pagoda_eaves_duel.jpg` | `/assets/quests/hs_q16_pagoda_eaves_duel.jpg` | `QST-SECT-05-16`<br>《雁塔风雷 · 京兆除魔》 | 第二十幕 · 飞檐凌空战双魔<br>（`scene_hsq16_20`） | `16:9` |
| `CG-QST-225` | `[x]` 已完成 | `public/assets/quests/hs_q16_elder_investiture.jpg` | `/assets/quests/hs_q16_elder_investiture.jpg` | `QST-SECT-05-16`<br>《雁塔风雷 · 京兆除魔》 | 第二十六幕 · 四老联署封长老<br>（`scene_hsq16_26`） | `16:9` |
| `CG-QST-226` | `[x]` 已完成 | `public/assets/quests/hs_q17_four_evils_raid.jpg` | `/assets/quests/hs_q17_four_evils_raid.jpg` | `QST-SECT-05-17`<br>《血染玉女 · 紫霞传薪》 | 第二幕 · 恶客如龙焚山道<br>（`scene_hsq17_02`） | `16:9` |
| `CG-QST-227` | `[x]` 已完成 | `public/assets/quests/hs_q17_yue_hold_gate.jpg` | `/assets/quests/hs_q17_yue_hold_gate.jpg` | `QST-SECT-05-17`<br>《血染玉女 · 紫霞传薪》 | 第十五幕 · 掌门喋血护雏鹰<br>（`scene_hsq17_15`） | `16:9` |
| `CG-QST-228` | `[x]` 已完成 | `public/assets/quests/hs_q17_zixia_impart.jpg` | `/assets/quests/hs_q17_zixia_impart.jpg` | `QST-SECT-05-17`<br>《血染玉女 · 紫霞传薪》 | 第二十一幕 · 灵前倾授先天卷<br>（`scene_hsq17_21`） | `16:9` |
| `CG-QST-229` | `[x]` 已完成 | `public/assets/quests/hs_q17_sword_bestow.jpg` | `/assets/quests/hs_q17_sword_bestow.jpg` | `QST-SECT-05-17`<br>《血染玉女 · 紫霞传薪》 | 第二十四幕 · 神剑托命护西岳<br>（`scene_hsq17_24`） | `16:9` |
| `CG-QST-230` | `[x]` 已完成 | `public/assets/quests/hs_q17_purple_rainbow.jpg` | `/assets/quests/hs_q17_purple_rainbow.jpg` | `QST-SECT-05-17`<br>《血染玉女 · 紫霞传薪》 | 第二十七幕 · 紫虹破门慑群凶<br>（`scene_hsq17_27`） | `16:9` |
| `CG-QST-231` | `[x]` 已完成 | `public/assets/quests/hs_q17_duan_staff_fly.jpg` | `/assets/quests/hs_q17_duan_staff_fly.jpg` | `QST-SECT-05-17`<br>《血染玉女 · 紫霞传薪》 | 第三十二幕 · 二十合震飞精钢杖<br>（`scene_hsq17_32`） | `16:9` |
| `CG-QST-232` | `[x]` 已完成 | `public/assets/quests/hs_q18_cliff_pursuit.jpg` | `/assets/quests/hs_q18_cliff_pursuit.jpg` | `QST-SECT-05-18`<br>《思过绝壁 · 独孤求败》 | 第六幕 · 绝壁追凶入古洞<br>（`scene_hsq18_06`） | `16:9` |
| `CG-QST-233` | `[x]` 已完成 | `public/assets/quests/hs_q18_hidden_grotto.jpg` | `/assets/quests/hs_q18_hidden_grotto.jpg` | `QST-SECT-05-18`<br>《思过绝壁 · 独孤求败》 | 第十一幕 · 暗壁轰塌现古窟<br>（`scene_hsq18_11`） | `16:9` |
| `CG-QST-234` | `[x]` 已完成 | `public/assets/quests/hs_q18_dugu_inscription.jpg` | `/assets/quests/hs_q18_dugu_inscription.jpg` | `QST-SECT-05-18`<br>《思过绝壁 · 独孤求败》 | 第十三幕 · 求败遗刻傲苍穹<br>（`scene_hsq18_13`） | `16:9` |
| `CG-QST-235` | `[x]` 已完成 | `public/assets/quests/hs_q18_thunder_enlighten.jpg` | `/assets/quests/hs_q18_thunder_enlighten.jpg` | `QST-SECT-05-18`<br>《思过绝壁 · 独孤求败》 | 第二十幕 · 风雷惊夜悟九剑<br>（`scene_hsq18_20`） | `16:9` |
| `CG-QST-236` | `[x]` 已完成 | `public/assets/quests/hs_q18_pojian_volley.jpg` | `/assets/quests/hs_q18_pojian_volley.jpg` | `QST-SECT-05-18`<br>《思过绝壁 · 独孤求败》 | 第二十五幕 · 天外飞仙破箭雨<br>（`scene_hsq18_25`） | `16:9` |
| `CG-QST-237` | `[x]` 已完成 | `public/assets/quests/hs_q18_poqi_duan.jpg` | `/assets/quests/hs_q18_poqi_duan.jpg` | `QST-SECT-05-18`<br>《思过绝壁 · 独孤求败》 | 第三十二幕 · 破气惊神十招决<br>（`scene_hsq18_32`） | `16:9` |
| `CG-QST-238` | `[x]` 已完成 | `public/assets/quests/hs_q19_night_march.jpg` | `/assets/quests/hs_q19_night_march.jpg` | `QST-SECT-05-19`<br>《紫霞浩荡 · 太岳正主》 | 第七幕 · 紫衫出关星月寒<br>（`scene_hsq19_07`） | `16:9` |
| `CG-QST-239` | `[x]` 已完成 | `public/assets/quests/hs_q19_fengling_charge.jpg` | `/assets/quests/hs_q19_fengling_charge.jpg` | `QST-SECT-05-19`<br>《紫霞浩荡 · 太岳正主》 | 第十四幕 · 紫气十里卷连营<br>（`scene_hsq19_14`） | `16:9` |
| `CG-QST-240` | `[x]` 已完成 | `public/assets/quests/hs_q19_slay_tuoba.jpg` | `/assets/quests/hs_q19_slay_tuoba.jpg` | `QST-SECT-05-19`<br>《紫霞浩荡 · 太岳正主》 | 第二十幕 · 太岳紫霞斩元凶<br>（`scene_hsq19_20`） | `16:9` |
| `CG-QST-241` | `[x]` 已完成 | `public/assets/quests/hs_q19_burn_camp.jpg` | `/assets/quests/hs_q19_burn_camp.jpg` | `QST-SECT-05-19`<br>《紫霞浩荡 · 太岳正主》 | 第二十一幕 · 烈火焚营靖河山<br>（`scene_hsq19_21`） | `16:9` |
| `CG-QST-242` | `[x]` 已完成 | `public/assets/quests/hs_q19_master_coronation.jpg` | `/assets/quests/hs_q19_master_coronation.jpg` | `QST-SECT-05-19`<br>《紫霞浩荡 · 太岳正主》 | 第二十七幕 · 冠簪授印登正主<br>（`scene_hsq19_27`） | `16:9` |
| `CG-QST-243` | `[x]` 已完成 | `public/assets/quests/hs_q20_snow_march_yunv.jpg` | `/assets/quests/hs_q20_snow_march_yunv.jpg` | `QST-SECT-05-20`<br>《剑压紫霞 · 逆夺太岳》 | 第四幕 · 执剑逼宫上玉女<br>（`scene_hsq20_04`） | `16:9` |
| `CG-QST-244` | `[x]` 已完成 | `public/assets/quests/hs_q20_defeat_gao.jpg` | `/assets/quests/hs_q20_defeat_gao.jpg` | `QST-SECT-05-20`<br>《剑压紫霞 · 逆夺太岳》 | 第九幕 · 首关夺衫挫首徒<br>（`scene_hsq20_09`） | `16:9` |
| `CG-QST-245` | `[x]` 已完成 | `public/assets/quests/hs_q20_break_ning_qin.jpg` | `/assets/quests/hs_q20_break_ning_qin.jpg` | `QST-SECT-05-20`<br>《剑压紫霞 · 逆夺太岳》 | 第二十幕 · 连闯双关挫剑神<br>（`scene_hsq20_20`） | `16:9` |
| `CG-QST-246` | `[x]` 已完成 | `public/assets/quests/hs_q20_clash_yue_zixia.jpg` | `/assets/quests/hs_q20_clash_yue_zixia.jpg` | `QST-SECT-05-20`<br>《剑压紫霞 · 逆夺太岳》 | 第二十六幕 · 剑撼紫霞决巅峰<br>（`scene_hsq20_26`） | `16:9` |
| `CG-QST-247` | `[x]` 已完成 | `public/assets/quests/hs_q20_seize_taiyue_sword.jpg` | `/assets/quests/hs_q20_seize_taiyue_sword.jpg` | `QST-SECT-05-20`<br>《剑压紫霞 · 逆夺太岳》 | 第二十九幕 · 逆夺神锋掌太岳<br>（`scene_hsq20_29`） | `16:9` |
| `CG-QST-248` | `[x]` 已完成 | `public/assets/quests/hs_q20_hegemon_throne.jpg` | `/assets/quests/hs_q20_hegemon_throne.jpg` | `QST-SECT-05-20`<br>《剑压紫霞 · 逆夺太岳》 | 第三十六幕 · 西岳霸主登绝位<br>（`scene_hsq20_36`） | `16:9` |
| `CG-QST-249` | `[x]` 已完成 | `public/assets/quests/hs_q21_twin_lineage_march.jpg` | `/assets/quests/hs_q21_twin_lineage_march.jpg` | `QST-SECT-05-21`<br>《两仪归元 · 西岳共主》 | 第七幕 · 剑气并肩出雄关<br>（`scene_hsq21_07`） | `16:9` |
| `CG-QST-250` | `[x]` 已完成 | `public/assets/quests/hs_q21_dugu_slay_tuoba.jpg` | `/assets/quests/hs_q21_dugu_slay_tuoba.jpg` | `QST-SECT-05-21`<br>《两仪归元 · 西岳共主》 | 第十八幕 · 九剑靖边枭敌酋<br>（`scene_hsq21_18`） | `16:9` |
| `CG-QST-251` | `[x]` 已完成 | `public/assets/quests/hs_q21_present_banner.jpg` | `/assets/quests/hs_q21_present_banner.jpg` | `QST-SECT-05-21`<br>《两仪归元 · 西岳共主》 | 第二十五幕 · 献旗止争陈至理<br>（`scene_hsq21_25`） | `16:9` |
| `CG-QST-252` | `[x]` 已完成 | `public/assets/quests/hs_q21_abdicate_ceremony.jpg` | `/assets/quests/hs_q21_abdicate_ceremony.jpg` | `QST-SECT-05-21`<br>《两仪归元 · 西岳共主》 | 第二十八幕 · 欣然禅位奉双珍<br>（`scene_hsq21_28`） | `16:9` |
| `CG-QST-253` | `[x]` 已完成 | `public/assets/quests/hs_q21_harmony_master.jpg` | `/assets/quests/hs_q21_harmony_master.jpg` | `QST-SECT-05-21`<br>《两仪归元 · 西岳共主》 | 第三十一幕 · 两仪归元开盛世<br>（`scene_hsq21_31`） | `16:9` |
| `CG-QST-254` | `[x]` 已完成 | `public/assets/quests/hs_q22_snow_summit_open.jpg` | `/assets/quests/hs_q22_snow_summit_open.jpg` | `QST-SECT-05-22`<br>《西岳绝顶 · 华山论剑》 | 第五幕 · 绝顶开坛会群雄<br>（`scene_hsq22_05`） | `16:9` |
| `CG-QST-255` | `[x]` 已完成 | `public/assets/quests/hs_q22_break_murongfu.jpg` | `/assets/quests/hs_q22_break_murongfu.jpg` | `QST-SECT-05-22`<br>《西岳绝顶 · 华山论剑》 | 第十二幕 · 十合破燕落长剑<br>（`scene_hsq22_12`） | `16:9` |
| `CG-QST-256` | `[x]` 已完成 | `public/assets/quests/hs_q22_clash_jiumozhi.jpg` | `/assets/quests/hs_q22_clash_jiumozhi.jpg` | `QST-SECT-05-22`<br>《西岳绝顶 · 华山论剑》 | 第十八幕 · 暴雪战佛撼刀罡<br>（`scene_hsq22_18`） | `16:9` |
| `CG-QST-257` | `[x]` 已完成 | `public/assets/quests/hs_q22_repel_jiumozhi.jpg` | `/assets/quests/hs_q22_repel_jiumozhi.jpg` | `QST-SECT-05-22`<br>《西岳绝顶 · 华山论剑》 | 第二十二幕 · 剑碎刀影退明王<br>（`scene_hsq22_22`） | `16:9` |
| `CG-QST-258` | `[x]` 已完成 | `public/assets/quests/hs_q22_murongbo_probe.jpg` | `/assets/quests/hs_q22_murongbo_probe.jpg` | `QST-SECT-05-22`<br>《西岳绝顶 · 华山论剑》 | 第二十九幕 · 一剑惊老裂灰袖<br>（`scene_hsq22_29`） | `16:9` |
| `CG-QST-259` | `[x]` 已完成 | `public/assets/quests/hs_q22_qiaofeng_toast.jpg` | `/assets/quests/hs_q22_qiaofeng_toast.jpg` | `QST-SECT-05-22`<br>《西岳绝顶 · 华山论剑》 | 第三十五幕 · 英雄邀战摔巨碗<br>（`scene_hsq22_35`） | `16:9` |
| `CG-QST-260` | `[x]` 已完成 | `public/assets/quests/hs_q22_dragon_vs_sword.jpg` | `/assets/quests/hs_q22_dragon_vs_sword.jpg` | `QST-SECT-05-22`<br>《西岳绝顶 · 华山论剑》 | 第三十八幕 · 剑啸亢龙裂九霄<br>（`scene_hsq22_38`） | `16:9` |
| `CG-QST-261` | `[x]` 已完成 | `public/assets/quests/hs_q22_myriad_swords_roar.jpg` | `/assets/quests/hs_q22_myriad_swords_roar.jpg` | `QST-SECT-05-22`<br>《西岳绝顶 · 华山论剑》 | 第四十二幕 · 万剑齐鸣尊绝巅<br>（`scene_hsq22_42`） | `16:9` |
| `CG-QST-262` | `[x]` 已完成 | `public/assets/quests/tangmen_baicao_poison_smoke.jpg` | `/assets/quests/tangmen_baicao_poison_smoke.jpg` | `QST-SECT-13-ENTRY`<br>《川药血引 · 万毒试药》 | 第一幕 · 药廊紫烟掉包案<br>（`SCENE_TM_01_BAICAO_SWAP`） | `16:9` |
| `CG-QST-263` | `[x]` 已完成 | `public/assets/quests/tangmen_wandu_miasma_pool.jpg` | `/assets/quests/tangmen_wandu_miasma_pool.jpg` | `QST-SECT-13-ENTRY`<br>《川药血引 · 万毒试药》 | 第四幕 · 五彩瘴泉吞丸试胆<br>（`SCENE_TM_04_WANDU_MIASMA`） | `16:9` |
| `CG-QST-264` | `[x]` 已完成 | `public/assets/quests/tangmen_qianhuang_tower_oath.jpg` | `/assets/quests/tangmen_qianhuang_tower_oath.jpg` | `QST-SECT-13-ENTRY`<br>《川药血引 · 万毒试药》 | 第十一/十二幕 · 千簧总阁立世家契<br>（`SCENE_TM_11_TOWER_BRANCH_CHOICE`） | `16:9` |
| `CG-QST-265` | `[x]` 已完成 | `public/assets/quests/hs_side01_cliff_repair.jpg` | `/assets/quests/hs_side01_cliff_repair.jpg` | `QST-SECT-05-SIDE-01`<br>《苍龙挑夫 · 栈道修缮记》 | 第四幕 · 悬索修栈<br>（`scene_hss01_04`） | `16:9` |
| `CG-QST-266` | `[x]` 已完成 | `public/assets/quests/hs_side01_ridge_ambush.jpg` | `/assets/quests/hs_side01_ridge_ambush.jpg` | `QST-SECT-05-SIDE-01`<br>《苍龙挑夫 · 栈道修缮记》 | 第七幕 · 浓雾断匪<br>（`scene_hss01_07`） | `16:9` |
| `CG-QST-267` | `[x]` 已完成 | `public/assets/quests/hs_side02_qinling_rescue.jpg` | `/assets/quests/hs_side02_qinling_rescue.jpg` | `QST-SECT-05-SIDE-02`<br>《玉泉药香 · 秦岭采参行》 | 第四幕 · 溪涧护医<br>（`scene_hss02_04`） | `16:9` |
| `CG-QST-268` | `[x]` 已完成 | `public/assets/quests/hs_side02_night_tiger.jpg` | `/assets/quests/hs_side02_night_tiger.jpg` | `QST-SECT-05-SIDE-02`<br>《玉泉药香 · 秦岭采参行》 | 第七幕 · 山涧斩虎<br>（`scene_hss02_07`） | `16:9` |
| `CG-QST-269` | `[x]` 已完成 | `public/assets/quests/hs_side03_chen_tuan_go.jpg` | `/assets/quests/hs_side03_chen_tuan_go.jpg` | `QST-SECT-05-SIDE-03`<br>《博台纹枰 · 希夷残局录》 | 第四幕 · 博台解枰<br>（`scene_hss03_04`） | `16:9` |
| `CG-QST-270` | `[x]` 已完成 | `public/assets/quests/hs_side03_chess_sword_duel.jpg` | `/assets/quests/hs_side03_chess_sword_duel.jpg` | `QST-SECT-05-SIDE-03`<br>《博台纹枰 · 希夷残局录》 | 第九幕 · 以棋驭剑<br>（`scene_hss03_09`） | `16:9` |
| `CG-QST-271` | `[x]` 已完成 | `public/assets/quests/hs_side04_mingde_inquiry.jpg` | `/assets/quests/hs_side04_mingde_inquiry.jpg` | `QST-SECT-05-SIDE-04`<br>《明德秋雨 · 长安捉刀客》 | 第二幕 · 明德暗访<br>（`scene_hss04_02`） | `16:9` |
| `CG-QST-272` | `[x]` 已完成 | `public/assets/quests/hs_side04_rooftop_capture.jpg` | `/assets/quests/hs_side04_rooftop_capture.jpg` | `QST-SECT-05-SIDE-04`<br>《明德秋雨 · 长安捉刀客》 | 第八幕 · 雨脊擒凶<br>（`scene_hss04_08`） | `16:9` |
| `CG-QST-273` | `[x]` 已完成 | `public/assets/quests/hs_side05_furnace_qi.jpg` | `/assets/quests/hs_side05_furnace_qi.jpg` | `QST-SECT-05-SIDE-05`<br>《紫气丹炉 · 朝阳守火记》 | 第三幕 · 朝阳温炉<br>（`scene_hss05_03`） | `16:9` |
| `CG-QST-274` | `[x]` 已完成 | `public/assets/quests/hs_side05_poison_raid.jpg` | `/assets/quests/hs_side05_poison_raid.jpg` | `QST-SECT-05-SIDE-05`<br>《紫气丹炉 · 朝阳守火记》 | 第七幕 · 护炉斩毒<br>（`scene_hss05_07`） | `16:9` |
| `CG-QST-275` | `[x]` 已完成 | `public/assets/quests/hs_side06_loess_ambush.jpg` | `/assets/quests/hs_side06_loess_ambush.jpg` | `QST-SECT-05-SIDE-06`<br>《潼关试铁 · 百步断刃行》 | 第三幕 · 黄土伏骑<br>（`scene_hss06_03`） | `16:9` |
| `CG-QST-276` | `[x]` 已完成 | `public/assets/quests/hs_side06_sever_saber.jpg` | `/assets/quests/hs_side06_sever_saber.jpg` | `QST-SECT-05-SIDE-06`<br>《潼关试铁 · 百步断刃行》 | 第六幕 · 百步断刃<br>（`scene_hss06_06`） | `16:9` |
| `CG-QST-277` | `[x]` 已完成 | `public/assets/quests/hs_side07_audit_ledger.jpg` | `/assets/quests/hs_side07_audit_ledger.jpg` | `QST-SECT-05-SIDE-07`<br>《渭北麦浪 · 侠剑护夏收》 | 第四幕 · 麦坪拆契<br>（`scene_hss07_04`） | `16:9` |
| `CG-QST-278` | `[x]` 已完成 | `public/assets/quests/hs_side07_wheat_duel.jpg` | `/assets/quests/hs_side07_wheat_duel.jpg` | `QST-SECT-05-SIDE-07`<br>《渭北麦浪 · 侠剑护夏收》 | 第八幕 · 麦浪斩钩<br>（`scene_hss07_08`） | `16:9` |
| `CG-QST-279` | `[x]` 已完成 | `public/assets/quests/hs_side08_ghost_market.jpg` | `/assets/quests/hs_side08_ghost_market.jpg` | `QST-SECT-05-SIDE-08`<br>《骊山鬼市 · 古剑寻踪录》 | 第四幕 · 鬼市辨剑<br>（`scene_hss08_04`） | `16:9` |
| `CG-QST-280` | `[x]` 已完成 | `public/assets/quests/hs_side08_pine_intercept.jpg` | `/assets/quests/hs_side08_pine_intercept.jpg` | `QST-SECT-05-SIDE-08`<br>《骊山鬼市 · 古剑寻踪录》 | 第十幕 · 松林截剑<br>（`scene_hss08_10`） | `16:9` |
| `CG-QST-281` | `[x]` 已完成 | `public/assets/quests/hs_side08_return_sword.jpg` | `/assets/quests/hs_side08_return_sword.jpg` | `QST-SECT-05-SIDE-08`<br>《骊山鬼市 · 古剑寻踪录》 | 第十三幕 · 白玉还锋<br>（`scene_hss08_13`） | `16:9` |
| `CG-QST-282` | `[x]` 已完成 | `public/assets/quests/hs_side09_dao_debate.jpg` | `/assets/quests/hs_side09_dao_debate.jpg` | `QST-SECT-05-SIDE-09`<br>《终南论道 · 金莲净火劫》 | 第四幕 · 终南论道<br>（`scene_hss09_04`） | `16:9` |
| `CG-QST-283` | `[x]` 已完成 | `public/assets/quests/hs_side09_shihouzi_clash.jpg` | `/assets/quests/hs_side09_shihouzi_clash.jpg` | `QST-SECT-05-SIDE-09`<br>《终南论道 · 金莲净火劫》 | 第十幕 · 净火破邪<br>（`scene_hss09_10`） | `16:9` |
| `CG-QST-284` | `[x]` 已完成 | `public/assets/quests/hs_side10_qin_ride_west.jpg` | `/assets/quests/hs_side10_qin_ride_west.jpg` | `QST-SECT-05-SIDE-10`<br>《陇山断道 · 西夏折剑令》 | 第四幕 · 双剑西出<br>（`scene_hss10_04`） | `16:9` |
| `CG-QST-285` | `[x]` 已完成 | `public/assets/quests/hs_side10_slave_array.jpg` | `/assets/quests/hs_side10_slave_array.jpg` | `QST-SECT-05-SIDE-10`<br>《陇山断道 · 西夏折剑令》 | 第八幕 · 残阳破阵<br>（`scene_hss10_08`） | `16:9` |
| `CG-QST-286` | `[x]` 已完成 | `public/assets/quests/hs_side10_slay_helian.jpg` | `/assets/quests/hs_side10_slay_helian.jpg` | `QST-SECT-05-SIDE-10`<br>《陇山断道 · 西夏折剑令》 | 第十四幕 · 斩落魔陀<br>（`scene_hss10_14`） | `16:9` |
| `CG-QST-287` | `[x]` 已完成 | 《晨钟木鱼 · 罗汉开蒙》（`QST-SECT-01-01`） | `public/assets/quests/sl_01_morning_bell.jpg` | 钟鼓禅院 · 五更晨钟响彻演武坪，虚松虚音开蒙授罗汉拳 |
| `CG-QST-288` | `[x]` 已完成 | 《晨钟木鱼 · 罗汉开蒙》（`QST-SECT-01-01`） | `public/assets/quests/sl_01_luohan_duel.jpg` | 演武青石 · 罗汉拳连挫挂单恶僧与周海，玄痛巡堂嘉许 |
| `CG-QST-289` | `[x]` 已完成 | 《少室庄田 · 拳棍止争》（`QST-SECT-01-02`） | `public/assets/quests/sl_02_estate_clash.jpg` | 少室南麓 · 登封矿霸刘横强占庄田水渠，佃农与矿徒剑拔弩张 |
| `CG-QST-290` | `[x]` 已完成 | 《少室庄田 · 拳棍止争》（`QST-SECT-01-02`） | `public/assets/quests/sl_02_fist_staff_win.jpg` | 拳棍止争 · 伏虎拳近身擒王或齐眉棍横扫窄桥生擒刘横 |
| `CG-QST-291` | `[x]` 已完成 | 《香火黑账 · 知客暗流》（`QST-SECT-01-03`） | `public/assets/quests/sl_03_pine_ambush.jpg` | 古柏寒林 · 救下血污牙人贾通宝，力战黑市断魂刀赵魁 |
| `CG-QST-292` | `[x]` 已完成 | 《香火黑账 · 知客暗流》（`QST-SECT-01-03`） | `public/assets/quests/sl_03_incense_ledger.jpg` | 香火私册 · 钟鼓禅院孤灯验账，空名度牒黑幕水落石出 |
| `CG-QST-293` | `[x]` 已完成 | 《木桩百劫 · 铜人初试》（`QST-SECT-01-04`） | `public/assets/quests/sl_04_wooden_alley.jpg` | 木桩百劫 · 十八铜人木桩廊机关齐发，棍影拳风破阵而出 |
| `CG-QST-294` | `[x]` 已完成 | 《木桩百劫 · 铜人初试》（`QST-SECT-01-04`） | `public/assets/quests/sl_04_huitong_spar.jpg` | 终场较技 · 演武正殿力挫外门劲敌慧通，禅武根基大成 |
| `CG-QST-295` | `[x]` 已完成 | 《木桩百劫 · 铜人初试》（`QST-SECT-01-04`） | `public/assets/quests/sl_04_four_branches.jpg` | 大雄丹墀 · 玄慈授罗汉伏虎功晋内门，罗汉达摩戒律俗家四脉分流 |
| `CG-QST-296` | `[x]` 已完成 | 《灶房残薪 · 烧火奇棍》（`QST-SECT-01-SIDE-01`） | `public/assets/quests/sl_s01_kitchen_stick.jpg` | 少室大斋堂 · 灶膛抽薪，觉尘传授质朴刁钻拨火棍诀 |
| `CG-QST-297` | `[x]` 已完成 | 《灶房残薪 · 烧火奇棍》（`QST-SECT-01-SIDE-01`） | `public/assets/quests/sl_s01_ash_thieves.jpg` | 锅底乌灰 · 烧火奇棍连戳三贼下盘，满院僧众哄堂大笑 |
| `CG-QST-298` | `[x]` 已完成 | 《东庑拓碑 · 拳棍双修》（`QST-SECT-01-SIDE-02`） | `public/assets/quests/sl_s02_stele_rub.jpg` | 东庑碑院 · 净法携墨拓修补唐代武僧演武砖雕 |
| `CG-QST-299` | `[x]` 已完成 | 《东庑拓碑 · 拳棍双修》（`QST-SECT-01-SIDE-02`） | `public/assets/quests/sl_s02_protect_stele.jpg` | 护碑驱恶 · 逐退偷拓古碑恶奴，慧轮补授拳棍双全 |
| `CG-QST-300` | `[x]` 已完成 | 《登封买粮 · 斗秤破奸》（`QST-SECT-01-SIDE-03`） | `public/assets/quests/sl_s03_grain_scale.jpg` | 登封粮行 · 算术当场识破夹层灌水银暗秤，拆穿奸商克扣 |
| `CG-QST-301` | `[x]` 已完成 | 《登封买粮 · 斗秤破奸》（`QST-SECT-01-SIDE-03`） | `public/assets/quests/sl_s03_thug_brawl.jpg` | 追银护斋 · 1v2 痛扁粮行恶护院，追回百两差额纹银 |
| `CG-QST-302` | `[x]` 已完成 | 《塔林寒夜 · 孤魂盗墓》（`QST-SECT-01-SIDE-04`） | `public/assets/quests/sl_s04_pagoda_ghost.jpg` | 塔林幽火 · 寒夜百座高僧砖塔磷火闪烁，识破摸金校尉伪装 |
| `CG-QST-303` | `[x]` 已完成 | 《塔林寒夜 · 孤魂盗墓》（`QST-SECT-01-SIDE-04`） | `public/assets/quests/sl_s04_tomb_raiders.jpg` | 砖塔迷阵 · 齐眉棍影破洛阳铲围攻，护住唐代高僧舍利地宫 |
| `CG-QST-304` | `[x]` 已完成 | 《嵩阳借书 · 儒释之辩》（`QST-SECT-01-SIDE-05`） | `public/assets/quests/sl_s05_songyang_debate.jpg` | 嵩阳杏坛 · 汉柏树下儒释会通，妙语折服排佛迂儒 |
| `CG-QST-305` | `[x]` 已完成 | 《嵩阳借书 · 儒释之辩》（`QST-SECT-01-SIDE-05`） | `public/assets/quests/sl_s05_apricot_spar.jpg` | 以武证礼 · 书院石阶点到为止挫狂生武师，促成两院藏书互通 |
| `CG-QST-306` | `[x]` 已完成 | 《东庑刀鸣 · 慈悲度寇》（`QST-SECT-01-05`） | `public/assets/quests/sl_05_east_corridor_blade.jpg` | 东庑刀鸣 · 玄灭于唐碑青石间传授《慈悲刀法》，刀光如雪而不伤落叶 |
| `CG-QST-307` | `[x]` 已完成 | 《东庑刀鸣 · 慈悲度寇》（`QST-SECT-01-05`） | `public/assets/quests/sl_05_yingyang_mercy.jpg` | 慈悲度寇 · 戒刀背震脱朴刀，流民跪地痛哭，悍匪屠三提鬼头刀怒冲而至 |
| `CG-QST-308` | `[x]` 已完成 | 《释源白马 · 韦陀降魔》（`QST-SECT-01-06`） | `public/assets/quests/sl_06_baima_fire.jpg` | 白马寺夜变 · 西夏一品堂假僧现出弯刀与火折，玄悲与你联手护住大佛宝殿 |
| `CG-QST-309` | `[x]` 已完成 | 《释源白马 · 韦陀降魔》（`QST-SECT-01-06`） | `public/assets/quests/sl_06_qiyun_pagoda_win.jpg` | 韦陀降魔 · 齐云古塔顶层月色如霜，一记大韦陀杵势震毙西夏密宗番僧摩诃巴 |
| `CG-QST-310` | `[x]` 已完成 | 《释源白马 · 韦陀降魔》（`QST-SECT-01-06`） | `public/assets/quests/sl_06_xuanbei_gift.jpg` | 玄悲赠杵 · 银杏金叶纷飞间，大韦陀僧玄悲将少林韦陀伏魔杵郑重托付于你 |
| `CG-QST-311` | `[x]` 已完成 | 《碎碑擒龙 · 少室捉谍》（`QST-SECT-01-07`） | `public/assets/quests/sl_07_stele_mist.jpg` | 碎碑擒龙 · 东庑古碑寒雾缭绕，玄石与玄痛五指成爪示范少林绝技《龙爪手》 |
| `CG-QST-312` | `[x]` 已完成 | 《碎碑擒龙 · 少室捉谍》（`QST-SECT-01-07`） | `public/assets/quests/sl_07_dragon_claw_capture.jpg` | 碎碑擒龙 · 三更寒雾间《龙爪手》撕裂幽州软甲，一爪扣脉生擒辽谍耶律青影 |
| `CG-QST-313` | `[x]` 已完成 | 《碎碑擒龙 · 少室捉谍》（`QST-SECT-01-07`） | `public/assets/quests/sl_07_map_preserved.jpg` | 山河无恙 · 朝阳映照东庑唐碑，西半幅拓片焚毁归尘，玄痛与玄石合授《龙爪手》全本 |
| `CG-QST-314` | `[x]` 已完成 | 《十八铜人 · 罗汉金身》（`QST-SECT-01-08`） | `public/assets/quests/sl_08_arhat_array_1.jpg` | 十八铜人阵 · 金漆罗汉列成三才六合大阵，齐眉长棍交织如林，直压中宫 |
| `CG-QST-315` | `[x]` 已完成 | 《十八铜人 · 罗汉金身》（`QST-SECT-01-08`） | `public/assets/quests/sl_08_arhat_breakthrough.jpg` | 罗汉金身 · 正殿金光震荡，你以融汇贯通的罗汉绝艺震退阵眼慧轮，十八铜人齐齐合十让道 |
| `CG-QST-316` | `[x]` 已完成 | 《十八铜人 · 罗汉金身》（`QST-SECT-01-08`） | `public/assets/quests/sl_08_zhenchuan_bell.jpg` | 钟鸣九响 · 大雄正殿香云缭绕，玄慈方丈亲为你披上少林真传紫金袈裟，群僧同颂佛号 |
| `CG-QST-317` | `[x]` 已完成 | 《剑痕绝壁 · 达摩初剑》（`QST-SECT-01-09`） | `public/assets/quests/sl_09_sword_cliff.jpg` | 绝壁剑痕崖 · 玄难指点青壁剑刻，初传少林《伏魔剑》意 |
| `CG-QST-318` | `[x]` 已完成 | 《剑痕绝壁 · 达摩初剑》（`QST-SECT-01-09`） | `public/assets/quests/sl_09_fumo_sword_duel.jpg` | 剑痕崖决锋 · 玄铁戒剑直破阴风诡刺，禅心不动伏邪剑 |
| `CG-QST-319` | `[x]` 已完成 | 《洛水飞花 · 散花破幻》（`QST-SECT-01-10`） | `public/assets/quests/sl_10_luoshui_boat.jpg` | 洛水夜舫 · 紫灯雾笼瑶华舟，毒香暗浮藏妖踪 |
| `CG-QST-320` | `[x]` 已完成 | 《洛水飞花 · 散花破幻》（`QST-SECT-01-10`） | `public/assets/quests/sl_10_xingxiu_defeat.jpg` | 散花破幻 · 双掌翻飞震晕星宿妖女与护法，洛水波平 |
| `CG-QST-321` | `[x]` 已完成 | 《迦叶微笑 · 灵山拈花》（`QST-SECT-01-11`） | `public/assets/quests/sl_11_silent_debate.jpg` | 无声禅辩 · 碎玉之前拈莲微笑，一言未发压服大轮寺三番僧 |
| `CG-QST-322` | `[x]` 已完成 | 《迦叶微笑 · 灵山拈花》（`QST-SECT-01-11`） | `public/assets/quests/sl_11_nianhua_finger.jpg` | 灵山拈花 · 双指柔劲破铁掌罡风，禅意与烈焰交锋演武坪 |
| `CG-QST-323` | `[x]` 已完成 | 《迦叶微笑 · 灵山拈花》（`QST-SECT-01-11`） | `public/assets/quests/sl_11_tubo_bow.jpg` | 番僧长揖 · 吐蕃大轮寺三护法折服赔礼，恭敬辞别嵩山 |
| `CG-QST-324` | `[x]` 已完成 | 《寒玉问禅 · 七十二障》（`QST-SECT-01-12`） | `public/assets/quests/sl_12_cold_jade_bed.jpg` | 寒玉问禅 · 幽谷石室长明灯下，瘫痪神僧玄澄剖白七十二障秘辛 |
| `CG-QST-325` | `[x]` 已完成 | 《寒玉问禅 · 七十二障》（`QST-SECT-01-12`） | `public/assets/quests/sl_12_cave_assassin.jpg` | 狭洞死战 · 幽暗石室中独挡一流下品慕容暗探首燕影客，寸步不退 |
| `CG-QST-326` | `[x]` 已完成 | 《寒玉问禅 · 七十二障》（`QST-SECT-01-12`） | `public/assets/quests/sl_12_damo_zhenchuan.jpg` | 达摩真传 · 黎明幽谷石室中，玄慈宣谕晋升少林真传弟子，玄澄玄难欣慰颔首 |
| `CG-QST-327` | `[x]` 已完成 | 《钟鼓执杖 · 清规如铁》（`QST-SECT-01-13`） | `public/assets/quests/sl_13_pumen_staff.jpg` | 钟鼓执杖 · 玄寂长老亲演《普门杖法》，杖影如莲，刚柔并济 |
| `CG-QST-328` | `[x]` 已完成 | 《钟鼓执杖 · 清规如铁》（`QST-SECT-01-13`） | `public/assets/quests/sl_13_ruzhou_temple.jpg` | 荒庙夜雨 · 破戒叛僧慧癞横杖守于残烛之前，身畔孤老泣血 |
| `CG-QST-329` | `[x]` 已完成 | 《一拍两散 · 汴京缉凶》（`QST-SECT-01-14`） | `public/assets/quests/sl_14_zisheng_teach.jpg` | 一拍两散 · 资圣宝塔顶层朔风飞雪，玄寂亲演示惊世掌力 |
| `CG-QST-330` | `[x]` 已完成 | 《一拍两散 · 汴京缉凶》（`QST-SECT-01-14`） | `public/assets/quests/sl_14_tianshui_roof.jpg` | 子夜甜水巷 · 飞雪青瓦之上，铁罗汉严横现身周府屋脊 |
| `CG-QST-331` | `[x]` 已完成 | 《一拍两散 · 汴京缉凶》（`QST-SECT-01-14`） | `public/assets/quests/sl_14_yanheng_capture.jpg` | 一拍两散 · 凝练掌劲破尽横练铁臂，生擒铁罗汉严横 |
| `CG-QST-332` | `[x]` 已完成 | 《药王百草 · 拈花截脉》（`QST-SECT-01-15`） | `public/assets/quests/sl_15_finger_heal.jpg` | 拈花截脉 · 郑州药棚之内，以柔绵指劲隔衣点穴救治染瘴流民 |
| `CG-QST-333` | `[x]` 已完成 | 《药王百草 · 拈花截脉》（`QST-SECT-01-15`） | `public/assets/quests/sl_15_bandit_repel.jpg` | 指掌齐施 · 药棚之前刚掌震敌、拈花点穴，生擒太行匪首独眼狼 |
| `CG-QST-334` | `[x]` 已完成 | 《药王百草 · 拈花截脉》（`QST-SECT-01-15`） | `public/assets/quests/sl_15_yaowang_praise.jpg` | 药王嘉许 · 东厢碑廊之下，玄生亲授《拈花指》全卷真传 |
| `CG-QST-335` | `[x]` 已完成 | 《戒台问罪 · 贪嗔痴慢》（`QST-SECT-01-16`） | `public/assets/quests/sl_16_rescue_xuqing.jpg` | 后山截杀 · 绝壁枯松之下，挺身力救怀抱印匣的苦行僧虚清 |
| `CG-QST-336` | `[x]` 已完成 | 《戒台问罪 · 贪嗔痴慢》（`QST-SECT-01-16`） | `public/assets/quests/sl_16_jietai_trial.jpg` | 戒台问罪 · 大雄正殿三堂会审，携虚清与影刃客当堂对质玄净 |
| `CG-QST-337` | `[x]` 已完成 | 《戒台问罪 · 贪嗔痴慢》（`QST-SECT-01-16`） | `public/assets/quests/sl_16_jielv_zhenchuan.jpg` | 戒律真传 · 大雄正殿佛光之下，玄慈方丈亲授戒律院真传法衣与禅杖 |
| `CG-QST-338` | `[x]` 已完成 | 《相国暗影 · 红尘刀杖》（`QST-SECT-01-17`） | `public/assets/quests/sl_17_xiangguo_market.jpg` | 大相国寺万姓雅市 · 慧照、卫弘龙与郑刚共议护持寺院商铺 |
| `CG-QST-339` | `[x]` 已完成 | 《相国暗影 · 红尘刀杖》（`QST-SECT-01-17`） | `public/assets/quests/sl_17_wazi_brawl.jpg` | 瓦子暗巷 · 带发提刀使出普门杖法与慈悲刀法，力战毒蛇钱五 |
| `CG-QST-340` | `[x]` 已完成 | 《洛阳护镖 · 金刀少林》（`QST-SECT-01-18`） | `public/assets/quests/sl_18_longmen_escort.jpg` | 伊阙古道 · 金刀王家镖旗与少林护佛车队并辔南行 |
| `CG-QST-341` | `[x]` 已完成 | 《洛阳护镖 · 金刀少林》（`QST-SECT-01-18`） | `public/assets/quests/sl_18_weituo_bridge.jpg` | 龙门石桥 · 玄悲抛赠少林韦陀伏魔杵，危局破格点拨《韦陀杵》力战拓跋烈 |
| `CG-QST-342` | `[x]` 已完成 | 《洛阳护镖 · 金刀少林》（`QST-SECT-01-18`） | `public/assets/quests/sl_18_golden_buddha.jpg` | 白马大佛宝殿 · 千斤紫金佛像安奉放光，玄悲破格传授《韦陀杵》并赠伏魔宝杵 |
| `CG-QST-343` | `[x]` 已完成 | 《莆田南渡 · 南北少林》（`QST-SECT-01-19`） | `public/assets/quests/sl_19_jiulian_spar.jpg` | 九莲山门演武坪 · 北宗龙爪手对决南宗铁桥硬马，以武会友赢尽敬重 |
| `CG-QST-344` | `[x]` 已完成 | 《莆田南渡 · 南北少林》（`QST-SECT-01-19`） | `public/assets/quests/sl_19_saltfield_pirates.jpg` | 莆田海滨盐场 · 夜战火光冲天，与南少林同门并肩力敌东瀛海寇头目鬼丸浪人 |
| `CG-QST-345` | `[x]` 已完成 | 《莆田南渡 · 南北少林》（`QST-SECT-01-19`） | `public/assets/quests/sl_19_yuanku_scroll.jpg` | 大雄正殿 · 铜身罗汉元苦打破门户之见，亲授《盘山铁布衫（大成）》与《铁线拳》 |
| `CG-QST-346` | `[x]` 已完成 | 《紫衣护寺 · 俗家都统》（`QST-SECT-01-20`） | `public/assets/quests/sl_20_imperial_writ.jpg` | 资圣八角琉璃宝塔 · 手握朝廷朱印护寺勘合文书，破围策马星夜驰援嵩山 |
| `CG-QST-347` | `[x]` 已完成 | 《紫衣护寺 · 俗家都统》（`QST-SECT-01-20`） | `public/assets/quests/sl_20_blacktiger_rain.jpg` | 子夜暴雨 · 单刀孤身镇守嵩山药庄牌坊，雷电交加中力战绿林双煞 |
| `CG-QST-348` | `[x]` 已完成 | 《紫衣护寺 · 俗家都统》（`QST-SECT-01-20`） | `public/assets/quests/sl_20_layman_commander.jpg` | 大雄正殿 · 玄慈方丈亲赐紫衣与玄铁令牌，破格晋升少林 Lv.3 俗家护法都统 |

| `CG-QST-349` | `[x]` 已完成 | `public/assets/quests/sl_21_waterfall_reed.jpg` | `/assets/quests/sl_21_waterfall_reed.jpg` | `QST-SECT-01-21`<br>《飞瀑深潭 · 一苇渡江》 | 第三幕 · 枯芦掷潭<br>（`scene_slq21_03`） | `16:9` |
| `CG-QST-350` | `[x]` 已完成 | `public/assets/quests/sl_21_luoshui_chase.jpg` | `/assets/quests/sl_21_luoshui_chase.jpg` | `QST-SECT-01-21`<br>《飞瀑深潭 · 一苇渡江》 | 第十一幕 · 踏苇十里<br>（`scene_slq21_11`） | `16:9` |
| `CG-QST-351` | `[x]` 已完成 | `public/assets/quests/sl_21_cloud_swallow.jpg` | `/assets/quests/sl_21_cloud_swallow.jpg` | `QST-SECT-01-21`<br>《飞瀑深潭 · 一苇渡江》 | 洛水江心礁石 · 步法压制<br>（`scene_slq21_15`） | `16:9` |
| `CG-QST-352` | `[x]` 已完成 | `public/assets/quests/sl_22_burning_wood.jpg` | `/assets/quests/sl_22_burning_wood.jpg` | `QST-SECT-01-22`<br>《枯木生烟 · 玄苦授刀》 | 罗汉堂演武正殿 · 烈风如潮<br>（`scene_slq22_05`） | `16:9` |
| `CG-QST-353` | `[x]` 已完成 | `public/assets/quests/sl_22_xuanku_entrust.jpg` | `/assets/quests/sl_22_xuanku_entrust.jpg` | `QST-SECT-01-22`<br>《枯木生烟 · 玄苦授刀》 | 第十一幕 · 薪火相传<br>（`scene_slq22_10`） | `16:9` |
| `CG-QST-354` | `[x]` 已完成 | `public/assets/quests/sl_22_night_repel.jpg` | `/assets/quests/sl_22_night_repel.jpg` | `QST-SECT-01-22`<br>《枯木生烟 · 玄苦授刀》 | 第十九幕 · 逼退黑影<br>（`scene_slq22_19`） | `16:9` |
| `CG-QST-355` | `[x]` 已完成 | `public/assets/quests/sl_23_gongxian_grotto.jpg` | `/assets/quests/sl_23_gongxian_grotto.jpg` | `QST-SECT-01-23`<br>《金刚怒目 · 碎石成粉》 | 第九幕 · 疾驰伊洛<br>（`slq23_accept_rescue`） | `16:9` |
| `CG-QST-356` | `[x]` 已完成 | `public/assets/quests/sl_23_shatter_mirror.jpg` | `/assets/quests/sl_23_shatter_mirror.jpg` | `QST-SECT-01-23`<br>《金刚怒目 · 碎石成粉》 | 巩县石窟 · 凝指蓄势<br>（`scene_slq23_15`） | `16:9` |
| `CG-QST-357` | `[x]` 已完成 | `public/assets/quests/sl_23_save_masons.jpg` | `/assets/quests/sl_23_save_masons.jpg` | `QST-SECT-01-23`<br>《金刚怒目 · 碎石成粉》 | 第十八幕 · 满窟生春<br>（`scene_slq23_18`） | `16:9` |
| `CG-QST-358` | `[x]` 已完成 | `public/assets/quests/sl_24_damo_shadow.jpg` | `/assets/quests/sl_24_damo_shadow.jpg` | `QST-SECT-01-24`<br>《面壁九年 · 剑化禅机》 | 达摩石洞 · 笔意通剑<br>（`scene_slq24_03`） | `16:9` |
| `CG-QST-359` | `[x]` 已完成 | `public/assets/quests/sl_24_bao_feng_duel.jpg` | `/assets/quests/sl_24_bao_feng_duel.jpg` | `QST-SECT-01-24`<br>《面壁九年 · 剑化禅机》 | 剑痕崖 · 破局一剑<br>（`scene_slq24_17`） | `16:9` |
| `CG-QST-360` | `[x]` 已完成 | `public/assets/quests/sl_24_cliff_zen.jpg` | `/assets/quests/sl_24_cliff_zen.jpg` | `QST-SECT-01-24`<br>《面壁九年 · 剑化禅机》 | 绝壁石刻 · 剑痕崖<br>（`scene_slq24_20`） | `16:9` |
| `CG-QST-361` | `[x]` 已完成 | `public/assets/quests/sl_25_boruo_palm.jpg` | `/assets/quests/sl_25_boruo_palm.jpg` | `QST-SECT-01-25`<br>《空色无相 · 般若波罗》 | 第四幕 · 掌演空色<br>（`scene_slq25_04`） | `16:9` |
| `CG-QST-362` | `[x]` 已完成 | `public/assets/quests/sl_25_yuelao3_retreat.jpg` | `/assets/quests/sl_25_yuelao3_retreat.jpg` | `QST-SECT-01-25`<br>《空色无相 · 般若波罗》 | 第十六幕 · 震裂虎口<br>（`scene_slq25_16`） | `16:9` |
| `CG-QST-363` | `[x]` 已完成 | `public/assets/quests/sl_25_empty_zen.jpg` | `/assets/quests/sl_25_empty_zen.jpg` | `QST-SECT-01-25`<br>《空色无相 · 般若波罗》 | 达摩院 · 幽谷石室 · 寒玉榻<br>（`scene_slq25_18`） | `16:9` |
| `CG-QST-364` | `[x]` 已完成 | `public/assets/quests/sl_26_tang_stele.jpg` | `/assets/quests/sl_26_tang_stele.jpg` | `QST-SECT-01-26`<br>《东厢古碑 · 掌吐梵音》 | 第三幕 · 碑前示掌<br>（`scene_slq26_03`） | `16:9` |
| `CG-QST-365` | `[x]` 已完成 | `public/assets/quests/sl_26_corridor_night.jpg` | `/assets/quests/sl_26_corridor_night.jpg` | `QST-SECT-01-26`<br>《东厢古碑 · 掌吐梵音》 | 第九幕 · 廊影微动<br>（`slq26_accept_guard`） | `16:9` |
| `CG-QST-366` | `[x]` 已完成 | `public/assets/quests/sl_26_stele_safe.jpg` | `/assets/quests/sl_26_stele_safe.jpg` | `QST-SECT-01-26`<br>《东厢古碑 · 掌吐梵音》 | 第十七幕 · 唐碑无恙<br>（`scene_slq26_17`） | `16:9` |
| `CG-QST-367` | `[x]` 已完成 | `public/assets/quests/sl_27_ruined_crypt.jpg` | `/assets/quests/sl_27_ruined_crypt.jpg` | `QST-SECT-01-27`<br>《铁指断欲 · 降伏其心》 | 第八幕 · 暗访汝许<br>（`slq27_accept_purge`） | `16:9` |
| `CG-QST-368` | `[x]` 已完成 | `public/assets/quests/sl_27_iron_finger.jpg` | `/assets/quests/sl_27_iron_finger.jpg` | `QST-SECT-01-27`<br>《铁指断欲 · 降伏其心》 | 第十五幕 · 气门破绽<br>（`scene_slq27_15`） | `16:9` |
| `CG-QST-369` | `[x]` 已完成 | `public/assets/quests/sl_27_law_plaque.jpg` | `/assets/quests/sl_27_law_plaque.jpg` | `QST-SECT-01-27`<br>《铁指断欲 · 降伏其心》 | 第十九幕 · 演武典刑<br>（`slq27_return_shaolin`） | `16:9` |
| `CG-QST-370` | `[x]` 已完成 | `public/assets/quests/sl_28_rain_pavilion.jpg` | `/assets/quests/sl_28_rain_pavilion.jpg` | `QST-SECT-01-28`<br>《琉璃夜影 · 曝书惊变》 | 第七幕 · 琉璃夜影<br>（`scene_slq28_07`） | `16:9` |
| `CG-QST-371` | `[x]` 已完成 | `public/assets/quests/sl_28_pine_chase.jpg` | `/assets/quests/sl_28_pine_chase.jpg` | `QST-SECT-01-28`<br>《琉璃夜影 · 曝书惊变》 | 藏经阁 · 琉璃飞檐外<br>（`scene_slq28_09`） | `16:9` |
| `CG-QST-372` | `[x]` 已完成 | `public/assets/quests/sl_28_two_notes.jpg` | `/assets/quests/sl_28_two_notes.jpg` | `QST-SECT-01-28`<br>《琉璃夜影 · 曝书惊变》 | 第十五幕 · 案缝双笺<br>（`scene_slq28_15`） | `16:9` |
| `CG-QST-373` | `[x]` 已完成 | `public/assets/quests/sl_29_xingxiu_raid.jpg` | `/assets/quests/sl_29_xingxiu_raid.jpg` | `QST-SECT-01-29`<br>《剑痕浴血 · 少林九阳》 | 达摩院 · 绝壁石刻 · 剑痕崖<br>（`scene_slq29_02`） | `16:9` |
| `CG-QST-374` | `[x]` 已完成 | `public/assets/quests/sl_29_jiuyang_scroll.jpg` | `/assets/quests/sl_29_jiuyang_scroll.jpg` | `QST-SECT-01-29`<br>《剑痕浴血 · 少林九阳》 | 第十三幕 · 九阳密钞<br>（`scene_slq29_13`） | `16:9` |
| `CG-QST-375` | `[x]` 已完成 | `public/assets/quests/sl_29_pure_yang_blast.jpg` | `/assets/quests/sl_29_pure_yang_blast.jpg` | `QST-SECT-01-29`<br>《剑痕浴血 · 少林九阳》 | 第二十二幕 · 纯阳佛掌<br>（`scene_slq29_22`） | `16:9` |
| `CG-QST-376` | `[x]` 已完成 | `public/assets/quests/sl_30_ginkgo_sweep.jpg` | `/assets/quests/sl_30_ginkgo_sweep.jpg` | `QST-SECT-01-30`<br>《慈悲默察 · 扫叶听风》 | 第五幕 · 朝霜暮雪<br>（`scene_slq30_05`） | `16:9` |
| `CG-QST-377` | `[x]` 已完成 | `public/assets/quests/sl_30_copy_sutra.jpg` | `/assets/quests/sl_30_copy_sutra.jpg` | `QST-SECT-01-30`<br>《慈悲默察 · 扫叶听风》 | 第十一幕 · 焚香净手<br>（`scene_slq30_11`） | `16:9` |
| `CG-QST-378` | `[x]` 已完成 | `public/assets/quests/sl_30_empty_broom.jpg` | `/assets/quests/sl_30_empty_broom.jpg` | `QST-SECT-01-30`<br>《慈悲默察 · 扫叶听风》 | 藏经阁 · 古银杏无名老僧扫叶庭<br>（`scene_slq30_15`） | `16:9` |
| `CG-QST-379` | `[x]` 已完成 | `public/assets/quests/sl_31_iron_net.jpg` | `/assets/quests/sl_31_iron_net.jpg` | `QST-SECT-01-31`<br>《铁血伏魔 · 暗布天罗》 | 第三幕 · 伏魔铁网<br>（`scene_slq31_03`） | `16:9` |
| `CG-QST-380` | `[x]` 已完成 | `public/assets/quests/sl_31_slay_blackwater.jpg` | `/assets/quests/sl_31_slay_blackwater.jpg` | `QST-SECT-01-31`<br>《铁血伏魔 · 暗布天罗》 | 第九幕 · 伏魔斩妖<br>（`scene_slq31_09`） | `16:9` |
| `CG-QST-381` | `[x]` 已完成 | `public/assets/quests/sl_31_iron_prestige.jpg` | `/assets/quests/sl_31_iron_prestige.jpg` | `QST-SECT-01-31`<br>《铁血伏魔 · 暗布天罗》 | 第十三幕 · 黎明传捷<br>（`scene_slq31_13`） | `16:9` |
| `CG-QST-382` | `[x]` 已完成 | `public/assets/quests/sl_32_ice_cliff_herb.jpg` | `/assets/quests/sl_32_ice_cliff_herb.jpg` | `QST-SECT-01-32`<br>《药王瘟劫 · 九转回魂》 | 达摩院 · 飞瀑深潭 · 试炼涧<br>（`scene_slq32_06`） | `16:9` |
| `CG-QST-383` | `[x]` 已完成 | `public/assets/quests/sl_32_guard_furnace.jpg` | `/assets/quests/sl_32_guard_furnace.jpg` | `QST-SECT-01-32`<br>《药王瘟劫 · 九转回魂》 | 第十三幕 · 护炉死战<br>（`scene_slq32_13`） | `16:9` |
| `CG-QST-384` | `[x]` 已完成 | `public/assets/quests/sl_32_nine_turn_pill.jpg` | `/assets/quests/sl_32_nine_turn_pill.jpg` | `QST-SECT-01-32`<br>《药王瘟劫 · 九转回魂》 | 第十九幕 · 九转赐丹<br>（`scene_slq32_19`） | `16:9` |
| `CG-QST-385` | `[x]` 已完成 | `public/assets/quests/sl_33_bodhi_council.jpg` | `/assets/quests/sl_33_bodhi_council.jpg` | `QST-SECT-01-33`<br>《菩提院议 · 首座之争》 | 大雄宝殿方丈院 · 大雄正殿 · 佛前蒲团<br>（`scene_slq33_01`） | `16:9` |
| `CG-QST-386` | `[x]` 已完成 | `public/assets/quests/sl_33_elder_spar.jpg` | `/assets/quests/sl_33_elder_spar.jpg` | `QST-SECT-01-33`<br>《菩提院议 · 首座之争》 | 第七幕 · 择师印证<br>（`scene_slq33_07`） | `16:9` |
| `CG-QST-387` | `[x]` 已完成 | `public/assets/quests/sl_33_elder_robe.jpg` | `/assets/quests/sl_33_elder_robe.jpg` | `QST-SECT-01-33`<br>《菩提院议 · 首座之争》 | 第十九幕 · 授衣晋阶<br>（`scene_slq33_18`） | `16:9` |
| `CG-QST-388` | `[x]` 已完成 | `public/assets/quests/sl_34_xuanbei_death.jpg` | `/assets/quests/sl_34_xuanbei_death.jpg` | `QST-SECT-01-34`<br>《大智大悲 · 身死之谜》 | 第五幕 · 白马惨象<br>（`scene_slq34_05`） | `16:9` |
| `CG-QST-389` | `[x]` 已完成 | `public/assets/quests/sl_34_xuanku_farewell.jpg` | `/assets/quests/sl_34_xuanku_farewell.jpg` | `QST-SECT-01-34`<br>《大智大悲 · 身死之谜》 | 第十四幕 · 双僧归寂<br>（`scene_slq34_14`） | `16:9` |
| `CG-QST-390` | `[x]` 已完成 | `public/assets/quests/sl_34_two_palms.jpg` | `/assets/quests/sl_34_two_palms.jpg` | `QST-SECT-01-34`<br>《大智大悲 · 身死之谜》 | 第二十三幕 · 双掌辨影<br>（`scene_slq34_23`） | `16:9` |
| `CG-QST-391` | `[x]` 已完成 | `public/assets/quests/sl_35_wulin_gathering.jpg` | `/assets/quests/sl_35_wulin_gathering.jpg` | `QST-SECT-01-35`<br>《少室群雄 · 方丈丑闻》 | 第四幕 · 群雄沸腾<br>（`scene_slq35_04`） | `16:9` |
| `CG-QST-392` | `[x]` 已完成 | `public/assets/quests/sl_35_ding_poison.jpg` | `/assets/quests/sl_35_ding_poison.jpg` | `QST-SECT-01-35`<br>《少室群雄 · 方丈丑闻》 | 第十二幕 · 毒焰暂敛<br>（`scene_slq35_12`） | `16:9` |
| `CG-QST-393` | `[x]` 已完成 | `public/assets/quests/sl_35_jiumozhi_show.jpg` | `/assets/quests/sl_35_jiumozhi_show.jpg` | `QST-SECT-01-35`<br>《少室群雄 · 方丈丑闻》 | 第二十一幕 · 明王炫技<br>（`scene_slq35_21`） | `16:9` |
| `CG-QST-394` | `[x]` 已完成 | `public/assets/quests/sl_35_scandal_exposed.jpg` | `/assets/quests/sl_35_scandal_exposed.jpg` | `QST-SECT-01-35`<br>《少室群雄 · 方丈丑闻》 | 第三十幕 · 丑闻惊世<br>（`scene_slq35_30`） | `16:9` |
| `CG-QST-395` | `[x]` 已完成 | `public/assets/quests/sl_36_sarira_beads.jpg` | `/assets/quests/sl_36_sarira_beads.jpg` | `QST-SECT-01-36`<br>《寒玉百日 · 洗髓换骨》 | 第五幕 · 舍利伽蓝<br>（`scene_slq36_05`） | `16:9` |
| `CG-QST-396` | `[x]` 已完成 | `public/assets/quests/sl_36_damo_wall.jpg` | `/assets/quests/sl_36_damo_wall.jpg` | `QST-SECT-01-36`<br>《寒玉百日 · 洗髓换骨》 | 第十一幕 · 达摩石壁<br>（`scene_slq36_11`） | `16:9` |
| `CG-QST-397` | `[x]` 已完成 | `public/assets/quests/sl_36_hundred_day_zen.jpg` | `/assets/quests/sl_36_hundred_day_zen.jpg` | `QST-SECT-01-36`<br>《寒玉百日 · 洗髓换骨》 | 第十六幕 · 洗髓换骨<br>（`scene_slq36_15`） | `16:9` |
| `CG-QST-398` | `[x]` 已完成 | `public/assets/quests/sl_36_defeat_jiumozhi.jpg` | `/assets/quests/sl_36_defeat_jiumozhi.jpg` | `QST-SECT-01-36`<br>《寒玉百日 · 洗髓换骨》 | 第二十六幕 · 退败下山<br>（`scene_slq36_25`） | `16:9` |
| `CG-QST-399` | `[x]` 已完成 | `public/assets/quests/sl_38_xuanci_rod.jpg` | `/assets/quests/sl_38_xuanci_rod.jpg` | `QST-SECT-01-38`<br>《杖责还业 · 达摩传衣》 | 第八幕 · 血染青阶<br>（`scene_slq38_08`） | `16:9` |
| `CG-QST-400` | `[x]` 已完成 | `public/assets/quests/sl_38_kasaya_handover.jpg` | `/assets/quests/sl_38_kasaya_handover.jpg` | `QST-SECT-01-38`<br>《杖责还业 · 达摩传衣》 | 第二十一幕 · 达摩传衣<br>（`scene_slq38_21`） | `16:9` |
| `CG-QST-401` | `[x]` 已完成 | `public/assets/quests/sl_38_leaf_bell.jpg` | `/assets/quests/sl_38_leaf_bell.jpg` | `QST-SECT-01-38`<br>《杖责还业 · 达摩传衣》 | 第二十三幕 · 叶落暮钟<br>（`scene_slq38_23`） | `16:9` |
| `CG-QST-402` | `[x]` 已完成 | `public/assets/quests/sl_38_merciful_abbot.jpg` | `/assets/quests/sl_38_merciful_abbot.jpg` | `QST-SECT-01-38`<br>《杖责还业 · 达摩传衣》 | 第二十七幕 · 慈悲升座<br>（`slq38_go_enthrone`） | `16:9` |
| `CG-QST-403` | `[x]` 已完成 | `public/assets/quests/sl_39_iron_verdict.jpg` | `/assets/quests/sl_39_iron_verdict.jpg` | `QST-SECT-01-39`<br>《雷霆涤寺 · 铁腕法王》 | 第五幕 · 高台宣律<br>（`slq39_accept`） | `16:9` |
| `CG-QST-404` | `[x]` 已完成 | `public/assets/quests/sl_39_iron_hall.jpg` | `/assets/quests/sl_39_iron_hall.jpg` | `QST-SECT-01-39`<br>《雷霆涤寺 · 铁腕法王》 | 第十三幕 · 法堂新颜<br>（`scene_slq39_13`） | `16:9` |
| `CG-QST-405` | `[x]` 已完成 | `public/assets/quests/sl_39_break_blades.jpg` | `/assets/quests/sl_39_break_blades.jpg` | `QST-SECT-01-39`<br>《雷霆涤寺 · 铁腕法王》 | 第二十幕 · 金刚断刃<br>（`scene_slq39_20`） | `16:9` |
| `CG-QST-406` | `[x]` 已完成 | `public/assets/quests/sl_39_dharma_king.jpg` | `/assets/quests/sl_39_dharma_king.jpg` | `QST-SECT-01-39`<br>《雷霆涤寺 · 铁腕法王》 | 第二十六幕 · 铁腕法王<br>（`scene_slq39_26`） | `16:9` |
| `CG-QST-407` | `[x]` 已完成 | `public/assets/quests/sl_40_white_robe_zen.jpg` | `/assets/quests/sl_40_white_robe_zen.jpg` | `QST-SECT-01-40`<br>《不着袈裟 · 维摩护法》 | 第五幕 · 心中有佛<br>（`slq40_accept`） | `16:9` |
| `CG-QST-408` | `[x]` 已完成 | `public/assets/quests/sl_40_vimalakirti_duel.jpg` | `/assets/quests/sl_40_vimalakirti_duel.jpg` | `QST-SECT-01-40`<br>《不着袈裟 · 维摩护法》 | 第十三幕 · 白衣伏魔<br>（`scene_slq40_13`） | `16:9` |
| `CG-QST-409` | `[x]` 已完成 | `public/assets/quests/sl_40_alliance_seal.jpg` | `/assets/quests/sl_40_alliance_seal.jpg` | `QST-SECT-01-40`<br>《不着袈裟 · 维摩护法》 | 第二十幕 · 愧赠圣衣<br>（`scene_slq40_20`） | `16:9` |
| `CG-QST-410` | `[x]` 已完成 | `public/assets/quests/sl_40_layman_banner.jpg` | `/assets/quests/sl_40_layman_banner.jpg` | `QST-SECT-01-40`<br>《不着袈裟 · 维摩护法》 | 第二十六幕 · 白衣盟主<br>（`slq40_go_alliance`） | `16:9` |
| `CG-QST-411` | `[x]` 已完成 | `public/assets/quests/sl_s06_fake_meds.jpg` | `/assets/quests/sl_s06_fake_meds.jpg` | `QST-SECT-01-SIDE-06`<br>《万姓雅市 · 假药风波》 | 第二幕 · 银针辨毒<br>（`scene_sls06_02`） | `16:9` |
| `CG-QST-412` | `[x]` 已完成 | `public/assets/quests/sl_s06_black_workshop.jpg` | `/assets/quests/sl_s06_black_workshop.jpg` | `QST-SECT-01-SIDE-06`<br>《万姓雅市 · 假药风波》 | 第六幕 · 揭帽亮明<br>（`scene_sls06_06`） | `16:9` |
| `CG-QST-413` | `[x]` 已完成 | `public/assets/quests/sl_s07_pagoda_rain.jpg` | `/assets/quests/sl_s07_pagoda_rain.jpg` | `QST-SECT-01-SIDE-07`<br>《资圣宝塔 · 夜雨护经》 | 第五幕 · 暴雨惊雷<br>（`scene_sls07_05`） | `16:9` |
| `CG-QST-414` | `[x]` 已完成 | `public/assets/quests/sl_s07_capture_swallow.jpg` | `/assets/quests/sl_s07_capture_swallow.jpg` | `QST-SECT-01-SIDE-07`<br>《资圣宝塔 · 夜雨护经》 | 第九幕 · 折翼就擒<br>（`scene_sls07_09`） | `16:9` |
| `CG-QST-415` | `[x]` 已完成 | `public/assets/quests/sl_s08_jindao_arrows.jpg` | `/assets/quests/sl_s08_jindao_arrows.jpg` | `QST-SECT-01-SIDE-08`<br>《金刀寿宴 · 洛阳暗箭》 | 第七幕 · 掀桌挡箭<br>（`scene_sls08_07`） | `16:9` |
| `CG-QST-416` | `[x]` 已完成 | `public/assets/quests/sl_s08_alliance_toast.jpg` | `/assets/quests/sl_s08_alliance_toast.jpg` | `QST-SECT-01-SIDE-08`<br>《金刀寿宴 · 洛阳暗箭》 | 第十三幕 · 正气举盏<br>（`sls08_to_hall`） | `16:9` |
| `CG-QST-417` | `[x]` 已完成 | `public/assets/quests/sl_s09_qiyun_relic.jpg` | `/assets/quests/sl_s09_qiyun_relic.jpg` | `QST-SECT-01-SIDE-09`<br>《齐云古塔 · 舍利迷踪》 | 第四幕 · 黑教夜袭<br>（`scene_sls09_04`） | `16:9` |
| `CG-QST-418` | `[x]` 已完成 | `public/assets/quests/sl_s09_pagoda_summit.jpg` | `/assets/quests/sl_s09_pagoda_summit.jpg` | `QST-SECT-01-SIDE-09`<br>《齐云古塔 · 舍利迷踪》 | 第十一幕 · 掌定宝函<br>（`scene_sls09_11`） | `16:9` |
| `CG-QST-419` | `[x]` 已完成 | `public/assets/quests/sl_s10_sun_sutras.jpg` | `/assets/quests/sl_s10_sun_sutras.jpg` | `QST-SECT-01-SIDE-10`<br>《西厢晒经 · 芸香防蠹》 | 第四幕 · 轻拂晒经<br>（`scene_sls10_04`） | `16:9` |
| `CG-QST-420` | `[x]` 已完成 | `public/assets/quests/sl_s10_fakuo_nod.jpg` | `/assets/quests/sl_s10_fakuo_nod.jpg` | `QST-SECT-01-SIDE-10`<br>《西厢晒经 · 芸香防蠹》 | 第八幕 · 古杏扫叶<br>（`scene_sls10_08`） | `16:9` |
| `CG-QST-421` | `[x]` 已完成 | `public/assets/quests/sl_s11_mini_arhat.jpg` | `/assets/quests/sl_s11_mini_arhat.jpg` | `QST-SECT-01-SIDE-11`<br>《罗汉涂金 · 顽徒试炼》 | 第四幕 · 奇正相生<br>（`scene_sls11_04`） | `16:9` |
| `CG-QST-422` | `[x]` 已完成 | `public/assets/quests/sl_s11_hammer_defeat.jpg` | `/assets/quests/sl_s11_hammer_defeat.jpg` | `QST-SECT-01-SIDE-11`<br>《罗汉涂金 · 顽徒试炼》 | 第九幕 · 震锤折锋<br>（`scene_sls11_09`） | `16:9` |
| `CG-QST-423` | `[x]` 已完成 | `public/assets/quests/sl_s12_misty_gorge.jpg` | `/assets/quests/sl_s12_misty_gorge.jpg` | `QST-SECT-01-SIDE-12`<br>《寒玉护脉 · 伏虎除魔》 | 寒雾深涧 · 毒瘴漫崖<br>（`scene_sls12_04`） | `16:9` |
| `CG-QST-424` | `[x]` 已完成 | `public/assets/quests/sl_s12_jade_dragon.jpg` | `/assets/quests/sl_s12_jade_dragon.jpg` | `QST-SECT-01-SIDE-12`<br>《寒玉护脉 · 伏虎除魔》 | 玉面露峥嵘 · 寒掌逼人<br>（`scene_sls12_06`） | `16:9` |
| `CG-QST-425` | `[x]` 已完成 | `public/assets/quests/sl_s13_lion_roar.jpg` | `/assets/quests/sl_s13_lion_roar.jpg` | `QST-SECT-01-SIDE-13`<br>《大雄狮吼 · 番僧问难》 | 大雄狮吼 · 梵音撼塔<br>（`debate_q3_lotus`） | `16:9` |
| `CG-QST-426` | `[x]` 已完成 | `public/assets/quests/sl_s13_imperial_bowl.jpg` | `/assets/quests/sl_s13_imperial_bowl.jpg` | `QST-SECT-01-SIDE-13`<br>《大雄狮吼 · 番僧问难》 | 御赐金钵 · 仁宗嘉奖<br>（`scene_sls13_12`） | `16:9` |
| `CG-QST-427` | `[x]` 已完成 | `public/assets/quests/sl_s14_north_south.jpg` | `/assets/quests/sl_s14_north_south.jpg` | `QST-SECT-01-SIDE-14`<br>《铁线争锋 · 闽僧北访》 | 压轴印证 · 铁线神拳<br>（`scene_sls14_08`） | `16:9` |
| `CG-QST-428` | `[x]` 已完成 | `public/assets/quests/sl_s14_iron_wire_gift.jpg` | `/assets/quests/sl_s14_iron_wire_gift.jpg` | `QST-SECT-01-SIDE-14`<br>《铁线争锋 · 闽僧北访》 | 碑廊清茗 · 共论禅武<br>（`scene_sls14_12`） | `16:9` |
| `CG-QST-429` | `[x]` 已完成 | `public/assets/quests/sl_s15_yellow_river.jpg` | `/assets/quests/sl_s15_yellow_river.jpg` | `QST-SECT-01-SIDE-15`<br>《黄河水陆 · 孤忠超度》 | 黄河水陆 · 河灯万盏<br>（`scene_sls15_05`） | `16:9` |
| `CG-QST-430` | `[x]` 已完成 | `public/assets/quests/sl_s15_floating_bridge.jpg` | `/assets/quests/sl_s15_floating_bridge.jpg` | `QST-SECT-01-SIDE-15`<br>《黄河水陆 · 孤忠超度》 | 鬼刃现形 · 浮桥断水<br>（`scene_sls15_07`） | `16:9` |
| `CG-QST-431` | `[x]` 已完成 | `public/assets/quests/sl_s16_kaifeng_ally.jpg` | `/assets/quests/sl_s16_kaifeng_ally.jpg` | `QST-SECT-01-SIDE-16`<br>《清源正本 · 度牒大案》 | 第六幕 · 佛官合谋<br>（`scene_sls16_06`） | `16:9` |
| `CG-QST-432` | `[x]` 已完成 | `public/assets/quests/sl_s16_blood_kasaya.jpg` | `/assets/quests/sl_s16_blood_kasaya.jpg` | `QST-SECT-01-SIDE-16`<br>《清源正本 · 度牒大案》 | 第十一幕 · 伏魔诛邪<br>（`scene_sls16_11`） | `16:9` |
| `CG-QST-433` | `[x]` 已完成 | `public/assets/quests/sl_s17_snow_gate.jpg` | `/assets/quests/sl_s17_snow_gate.jpg` | `QST-SECT-01-SIDE-17`<br>《少室大雪 · 慈航度恶》 | 第七幕 · 雪落降魔<br>（`scene_sls17_07`） | `16:9` |
| `CG-QST-434` | `[x]` 已完成 | `public/assets/quests/sl_s17_snow_redemption.jpg` | `/assets/quests/sl_s17_snow_redemption.jpg` | `QST-SECT-01-SIDE-17`<br>《少室大雪 · 慈航度恶》 | 第十三幕 · 慈航度恶<br>（`scene_sls17_13`） | `16:9` |
| `CG-QST-435` | `[x]` 已完成 | `public/assets/quests/sl_s18_sea_chart.jpg` | `/assets/quests/sl_s18_sea_chart.jpg` | `QST-SECT-01-SIDE-18`<br>《达摩东渡 · 沧海遗图》 | 第四幕 · 沧海遗图<br>（`scene_sls18_04`） | `16:9` |
| `CG-QST-436` | `[x]` 已完成 | `public/assets/quests/sl_s18_cloud_sea_duel.jpg` | `/assets/quests/sl_s18_cloud_sea_duel.jpg` | `QST-SECT-01-SIDE-18`<br>《达摩东渡 · 沧海遗图》 | 第十一幕 · 禅破柔劲<br>（`scene_sls18_11`） | `16:9` |
| `CG-QST-437` | `[x]` 已完成 | `public/assets/quests/sl_37_flame_knife.jpg` | `/assets/quests/sl_37_flame_knife.jpg` | `QST-SECT-01-37`<br>《烈火金身 · 金刚不坏》 | 第六幕 · 火焰连伤<br>（`scene_slq37_06`） | `16:9` |
| `CG-QST-438` | `[x]` 已完成 | `public/assets/quests/sl_37_poison_fog.jpg` | `/assets/quests/sl_37_poison_fog.jpg` | `QST-SECT-01-37`<br>《烈火金身 · 金刚不坏》 | 第十一幕 · 毒雾炼心<br>（`scene_slq37_11`） | `16:9` |
| `CG-QST-439` | `[x]` 已完成 | `public/assets/quests/sl_37_golden_body.jpg` | `/assets/quests/sl_37_golden_body.jpg` | `QST-SECT-01-37`<br>《烈火金身 · 金刚不坏》 | 第十七幕 · 烈火金身<br>（`scene_slq37_17`） | `16:9` |
| `CG-QST-440` | `[x]` 已完成 | `public/assets/quests/sl_37_crush_jiumozhi.jpg` | `/assets/quests/sl_37_crush_jiumozhi.jpg` | `QST-SECT-01-37`<br>《烈火金身 · 金刚不坏》 | 第二十五幕 · 镇压群豪<br>（`scene_slq37_25`） | `16:9` |
| `CG-QST-441` | `[x]` 已完成 | `public/assets/quests/sl_41_ninety_nine_bells.jpg` | `/assets/quests/sl_41_ninety_nine_bells.jpg` | `QST-SECT-01-41`<br>《千僧列阵 · 血护少室》 | 第一幕 · 急钟九十九<br>（`scene_slq41_01`） | `16:9` |
| `CG-QST-442` | `[x]` 已完成 | `public/assets/quests/sl_41_five_hundred_arhats.jpg` | `/assets/quests/sl_41_five_hundred_arhats.jpg` | `QST-SECT-01-41`<br>《千僧列阵 · 血护少室》 | 第七幕 · 五百罗汉<br>（`scene_slq41_07`） | `16:9` |
| `CG-QST-443` | `[x]` 已完成 | `public/assets/quests/sl_41_qiaofeng_ally.jpg` | `/assets/quests/sl_41_qiaofeng_ally.jpg` | `QST-SECT-01-41`<br>《千僧列阵 · 血护少室》 | 第十八幕 · 万里驰援<br>（`scene_slq41_18`） | `16:9` |
| `CG-QST-444` | `[x]` 已完成 | `public/assets/quests/sl_41_shatter_banner.jpg` | `/assets/quests/sl_41_shatter_banner.jpg` | `QST-SECT-01-41`<br>《千僧列阵 · 血护少室》 | 第二十五幕 · 斩碎帅旗<br>（`scene_slq41_25`） | `16:9` |
| `CG-QST-445` | `[x]` 已完成 | `public/assets/quests/sl_42_pavilion_standoff.jpg` | `/assets/quests/sl_42_pavilion_standoff.jpg` | `QST-SECT-01-42`<br>《古杏扫叶 · 易筋真经》 | 第六幕 · 五强对峙<br>（`slq42_accept`） | `16:9` |
| `CG-QST-446` | `[x]` 已完成 | `public/assets/quests/sl_42_murongbo_clash.jpg` | `/assets/quests/sl_42_murongbo_clash.jpg` | `QST-SECT-01-42`<br>《古杏扫叶 · 易筋真经》 | 第十五幕 · 十五合硬撼<br>（`slq42_to_murongbo`） | `16:9` |
| `CG-QST-447` | `[x]` 已完成 | `public/assets/quests/sl_42_three_foot_wall.jpg` | `/assets/quests/sl_42_three_foot_wall.jpg` | `QST-SECT-01-42`<br>《古杏扫叶 · 易筋真经》 | 第二十三幕 · 三尺气墙<br>（`slq42_to_qiwall`） | `16:9` |
| `CG-QST-448` | `[x]` 已完成 | `public/assets/quests/sl_42_convert_rivals.jpg` | `/assets/quests/sl_42_convert_rivals.jpg` | `QST-SECT-01-42`<br>《古杏扫叶 · 易筋真经》 | 第三十三幕 · 度化归佛<br>（`scene_slq42_33`） | `16:9` |
| `CG-QST-449` | `[x]` 已完成 | `public/assets/quests/sl_42_ginkgo_yijin.jpg` | `/assets/quests/sl_42_ginkgo_yijin.jpg` | `QST-SECT-01-42`<br>《古杏扫叶 · 易筋真经》 | 第四十二幕 · 古杏传经<br>（`scene_slq42_42`） | `16:9` |
| `CG-QST-450` | `[x]` 已完成 | `public/assets/quests/zn_entry_caotang_tea.jpg` | `/assets/quests/zn_entry_caotang_tea.jpg` | `QST-SECT-11-ENTRY`<br>《太乙烟霞 · 双脉问心》 | 京兆府 · 终南草堂 · 主阁讲席<br>（`scene_zn_entry_01`） | `16:9` |
| `CG-QST-451` | `[x]` 已完成 | `public/assets/quests/zn_entry_stream_bees.jpg` | `/assets/quests/zn_entry_stream_bees.jpg` | `QST-SECT-11-ENTRY`<br>《太乙烟霞 · 双脉问心》 | 终南后山寒玉涧 · 临水抚琴榭<br>（`scene_zn_entry_07`） | `16:9` |
| `CG-QST-452` | `[x]` 已完成 | `public/assets/quests/zn_entry_chongyang_oath.jpg` | `/assets/quests/zn_entry_chongyang_oath.jpg` | `QST-SECT-11-ENTRY`<br>《太乙烟霞 · 双脉问心》 | 重阳古观前脉道院 · 清修主殿<br>（`scene_zn_entry_14`） | `16:9` |
| `CG-QST-453` | `[x]` 已完成 | `public/assets/quests/zn_q01_morning_chant.jpg` | `/assets/quests/zn_q01_morning_chant.jpg` | `QST-SECT-11-01`<br>《松风鹤影 · 大道筑基》 | 重阳古观 · 清修主殿<br>（`scene_zn_q01_01`） | `16:9` |
| `CG-QST-454` | `[x]` 已完成 | `public/assets/quests/zn_q01_falls_bandits.jpg` | `/assets/quests/zn_q01_falls_bandits.jpg` | `QST-SECT-11-01`<br>《松风鹤影 · 大道筑基》 | 终南后山寒玉涧 · 银练飞瀑<br>（`scene_zn_q01_07`） | `16:9` |
| `CG-QST-455` | `[x]` 已完成 | `public/assets/quests/zn_q02_changan_inn_secret.jpg` | `/assets/quests/zn_q02_changan_inn_secret.jpg` | `QST-SECT-11-02`<br>《子午毒雾 · 长安暗哨》 | 京兆府 · 明德门丝路迎宾栈<br>（`scene_zn_q02_05`） | `16:9` |
| `CG-QST-456` | `[x]` 已完成 | `public/assets/quests/zn_q02_xishi_poison_raid.jpg` | `/assets/quests/zn_q02_xishi_poison_raid.jpg` | `QST-SECT-11-02`<br>《子午毒雾 · 长安暗哨》 | 西市胡商坊 · 斗茶品香轩<br>（`scene_zn_q02_09`） | `16:9` |
| `CG-QST-457` | `[x]` 已完成 | `public/assets/quests/zn_q03_sword_terrace.jpg` | `/assets/quests/zn_q03_sword_terrace.jpg` | `QST-SECT-11-03`<br>《寒涧试剑 · 观墓分途》 | 终南后山寒玉涧 · 双剑合璧坪<br>（`scene_zn_q03_01`） | `16:9` |
| `CG-QST-458` | `[x]` 已完成 | `public/assets/quests/zn_q03_three_duels.jpg` | `/assets/quests/zn_q03_three_duels.jpg` | `QST-SECT-11-03`<br>《寒涧试剑 · 观墓分途》 | 双剑合璧坪 · 对阵沈清扬<br>（`scene_zn_q03_04`） | `16:9` |
| `CG-QST-459` | `[x]` 已完成 | `public/assets/quests/zn_q03_twin_patriarchs.jpg` | `/assets/quests/zn_q03_twin_patriarchs.jpg` | `QST-SECT-11-03`<br>《寒涧试剑 · 观墓分途》 | 双剑合璧坪 · 宗师开示<br>（`scene_zn_q03_14`） | `16:9` |
| `CG-QST-460` | `[x]` 已完成 | `public/assets/quests/zn_q03_branch_oath.jpg` | `/assets/quests/zn_q03_branch_oath.jpg` | `QST-SECT-11-03`<br>《寒涧试剑 · 观墓分途》 | 双剑合璧坪 · 不可逆之抉择<br>（`scene_zn_q03_18`） | `16:9` |
| `CG-QST-461` | `[x]` 已完成 | `public/assets/quests/zn_q04_dipper_formation.jpg` | `/assets/quests/zn_q04_dipper_formation.jpg` | `QST-SECT-11-04`<br>《北斗璇玑 · 三才归元》 | 重阳古观 · 天罡北斗七星演剑坛<br>（`scene_zn_q04_01`） | `16:9` |
| `CG-QST-462` | `[x]` 已完成 | `public/assets/quests/zn_q04_night_bandits.jpg` | `/assets/quests/zn_q04_night_bandits.jpg` | `QST-SECT-11-04`<br>《北斗璇玑 · 三才归元》 | 天罡北斗七星演剑坛 · 贼首现身<br>（`scene_zn_q04_10`） | `16:9` |
| `CG-QST-463` | `[x]` 已完成 | `public/assets/quests/zn_q05_cliff_goose.jpg` | `/assets/quests/zn_q05_cliff_goose.jpg` | `QST-SECT-11-05`<br>《太白金雁 · 绝壁凌虚》 | 终南后山寒玉涧 · 银练飞瀑<br>（`scene_zn_q05_01`） | `16:9` |
| `CG-QST-464` | `[x]` 已完成 | `public/assets/quests/zn_q05_xixia_ambush.jpg` | `/assets/quests/zn_q05_xixia_ambush.jpg` | `QST-SECT-11-05`<br>《太白金雁 · 绝壁凌虚》 | 绝壁谷道 · 生死一线<br>（`scene_zn_q05_09`） | `16:9` |
| `CG-QST-465` | `[x]` 已完成 | `public/assets/quests/zn_q05_scout_rescue.jpg` | `/assets/quests/zn_q05_scout_rescue.jpg` | `QST-SECT-11-05`<br>《太白金雁 · 绝壁凌虚》 | 绝壁谷道 · 救治边军<br>（`scene_zn_q05_12`） | `16:9` |
| `CG-QST-466` | `[x]` 已完成 | `public/assets/quests/zn_q06_yamen_yanshu.jpg` | `/assets/quests/zn_q06_yamen_yanshu.jpg` | `QST-SECT-11-06`<br>《草堂护道 · 正气劈空》 | 京兆府 · 永兴军路京兆府衙<br>（`scene_zn_q06_05`） | `16:9` |
| `CG-QST-467` | `[x]` 已完成 | `public/assets/quests/zn_q06_academy_lecture.jpg` | `/assets/quests/zn_q06_academy_lecture.jpg` | `QST-SECT-11-06`<br>《草堂护道 · 正气劈空》 | 京兆府 · 长安横渠关学书院<br>（`scene_zn_q06_09`） | `16:9` |
| `CG-QST-468` | `[x]` 已完成 | `public/assets/quests/zn_q06_pikong_palm.jpg` | `/assets/quests/zn_q06_pikong_palm.jpg` | `QST-SECT-11-06`<br>《草堂护道 · 正气劈空》 | 横渠书院 · 悟得劈空掌<br>（`scene_zn_q06_12`） | `16:9` |
| `CG-QST-469` | `[x]` 已完成 | `public/assets/quests/zn_q07_chama_horses.jpg` | `/assets/quests/zn_q07_chama_horses.jpg` | `QST-SECT-11-07`<br>《秦州烽火 · 铁骑护马》 | 秦州府 · 吐蕃青唐验马阑<br>（`scene_zn_q07_01`） | `16:9` |
| `CG-QST-470` | `[x]` 已完成 | `public/assets/quests/zn_q07_longyou_beacon.jpg` | `/assets/quests/zn_q07_longyou_beacon.jpg` | `QST-SECT-11-07`<br>《秦州烽火 · 铁骑护马》 | 陇右古战场烽燧 · 金环聚义堂<br>（`scene_zn_q07_07`） | `16:9` |
| `CG-QST-471` | `[x]` 已完成 | `public/assets/quests/zn_q07_qinzhou_choice.jpg` | `/assets/quests/zn_q07_qinzhou_choice.jpg` | `QST-SECT-11-07`<br>《秦州烽火 · 铁骑护马》 | 陇右古塞 · 古观心志之辨<br>（`scene_zn_q07_15`） | `16:9` |
| `CG-QST-472` | `[x]` 已完成 | `public/assets/quests/zn_q08_zixia_meeting.jpg` | `/assets/quests/zn_q08_zixia_meeting.jpg` | `QST-SECT-11-08`<br>《华岳论剑 · 睡仙希夷》 | 玉女峰紫霞道观 · 紫霞正气主殿<br>（`scene_zn_q08_01`） | `16:9` |
| `CG-QST-473` | `[x]` 已完成 | `public/assets/quests/zn_q08_botai_sword_debate.jpg` | `/assets/quests/zn_q08_botai_sword_debate.jpg` | `QST-SECT-11-08`<br>《华岳论剑 · 睡仙希夷》 | 华山绝顶论剑台 · 博台孤峰弈棋亭<br>（`scene_zn_q08_07`） | `16:9` |
| `CG-QST-474` | `[x]` 已完成 | `public/assets/quests/zn_q08_murong_thief.jpg` | `/assets/quests/zn_q08_murong_thief.jpg` | `QST-SECT-11-08`<br>《华岳论剑 · 睡仙希夷》 | 华山绝壁栈道 · 现出原形<br>（`scene_zn_q08_12`） | `16:9` |
| `CG-QST-475` | `[x]` 已完成 | `public/assets/quests/zn_q08_xiyi_promotion.jpg` | `/assets/quests/zn_q08_xiyi_promotion.jpg` | `QST-SECT-11-08`<br>《华岳论剑 · 睡仙希夷》 | 重阳古观前脉道院 · 重阳玄门清修主殿<br>（`scene_zn_q08_20`） | `16:9` |
| `CG-QST-476` | `[x]` 已完成 | `public/assets/quests/zn_q09_alchemy_explosion.jpg` | `/assets/quests/zn_q09_alchemy_explosion.jpg` | `QST-SECT-11-09`<br>《紫金丹劫 · 大雁除妖》 | 重阳古观 · 道藏经阁与紫金丹院<br>（`scene_zn_q09_01`） | `16:9` |
| `CG-QST-477` | `[x]` 已完成 | `public/assets/quests/zn_q09_dayanta_summit.jpg` | `/assets/quests/zn_q09_dayanta_summit.jpg` | `QST-SECT-11-09`<br>《紫金丹劫 · 大雁除妖》 | 慈恩寺大雁塔 · 绝顶佛龛 · 凭栏远眺<br>（`scene_zn_q09_09`） | `16:9` |
| `CG-QST-478` | `[x]` 已完成 | `public/assets/quests/zn_q09_lion_roar_duel.jpg` | `/assets/quests/zn_q09_lion_roar_duel.jpg` | `QST-SECT-11-09`<br>《紫金丹劫 · 大雁除妖》 | 绝顶佛龛 · 屏息凝神<br>（`scene_zn_q09_11`） | `16:9` |
| `CG-QST-479` | `[x]` 已完成 | `public/assets/quests/zn_q10_xiangyang_dock.jpg` | `/assets/quests/zn_q10_xiangyang_dock.jpg` | `QST-SECT-11-10`<br>《太和云海 · 武当问真》 | 襄阳 · 汉水大码头<br>（`scene_znq10_05`） | `16:9` |
| `CG-QST-480` | `[x]` 已完成 | `public/assets/quests/zn_q10_wudang_golden.jpg` | `/assets/quests/zn_q10_wudang_golden.jpg` | `QST-SECT-11-10`<br>《太和云海 · 武当问真》 | 武当山 · 太和绝顶真武金殿<br>（`scene_znq10_11`） | `16:9` |
| `CG-QST-481` | `[x]` 已完成 | `public/assets/quests/zn_q10_zixiao_dao.jpg` | `/assets/quests/zn_q10_zixiao_dao.jpg` | `QST-SECT-11-10`<br>《太和云海 · 武当问真》 | 武当山 · 紫霄道宫丹房<br>（`scene_znq10_16`） | `16:9` |
| `CG-QST-482` | `[x]` 已完成 | `public/assets/quests/zn_q10_alchemy_cure.jpg` | `/assets/quests/zn_q10_alchemy_cure.jpg` | `QST-SECT-11-10`<br>《太和云海 · 武当问真》 | 终南山隐宗 · 道藏经阁与紫金丹院<br>（`scene_znq10_21`） | `16:9` |
| `CG-QST-483` | `[x]` 已完成 | `public/assets/quests/zn_q11_snow_dipper.jpg` | `/assets/quests/zn_q11_snow_dipper.jpg` | `QST-SECT-11-11`<br>《纯阳无极 · 七星聚首》 | 终南山隐宗 · 天罡北斗七星演剑坛<br>（`scene_znq11_01`） | `16:9` |
| `CG-QST-484` | `[x]` 已完成 | `public/assets/quests/zn_q11_seven_masters.jpg` | `/assets/quests/zn_q11_seven_masters.jpg` | `QST-SECT-11-11`<br>《纯阳无极 · 七星聚首》 | 天罡北斗七星演剑坛<br>（`scene_znq11_03`） | `16:9` |
| `CG-QST-485` | `[x]` 已完成 | `public/assets/quests/zn_q11_chunyang_aura.jpg` | `/assets/quests/zn_q11_chunyang_aura.jpg` | `QST-SECT-11-11`<br>《纯阳无极 · 七星聚首》 | 天罡北斗七星演剑坛<br>（`scene_znq11_06`） | `16:9` |
| `CG-QST-486` | `[x]` 已完成 | `public/assets/quests/zn_q11_nuerhai_retreat.jpg` | `/assets/quests/zn_q11_nuerhai_retreat.jpg` | `QST-SECT-11-11`<br>《纯阳无极 · 七星聚首》 | 天罡北斗七星演剑坛<br>（`scene_znq11_16`） | `16:9` |
| `CG-QST-487` | `[x]` 已完成 | `public/assets/quests/zn_q12_sparrow_hall.jpg` | `/assets/quests/zn_q12_sparrow_hall.jpg` | `QST-SECT-11-12`<br>《幽谷百雀 · 金针渡影》 | 终南山隐宗 · 天罗地网捕雀轻功厅<br>（`scene_znq12_01`） | `16:9` |
| `CG-QST-488` | `[x]` 已完成 | `public/assets/quests/zn_q12_golden_swallow.jpg` | `/assets/quests/zn_q12_golden_swallow.jpg` | `QST-SECT-11-12`<br>《幽谷百雀 · 金针渡影》 | 天罗地网捕雀轻功厅<br>（`scene_znq12_05`） | `16:9` |
| `CG-QST-489` | `[x]` 已完成 | `public/assets/quests/zn_q12_falls_poachers.jpg` | `/assets/quests/zn_q12_falls_poachers.jpg` | `QST-SECT-11-12`<br>《幽谷百雀 · 金针渡影》 | 终南后山寒玉涧 · 银练飞瀑清泉石茗案<br>（`scene_znq12_09`） | `16:9` |
| `CG-QST-490` | `[x]` 已完成 | `public/assets/quests/zn_q13_xishi_east.jpg` | `/assets/quests/zn_q13_xishi_east.jpg` | `QST-SECT-11-13`<br>《西市飞霜 · 踏雪无痕》 | 长安府 · 西市胡商坊（东市）<br>（`scene_znq13_04`） | `16:9` |
| `CG-QST-491` | `[x]` 已完成 | `public/assets/quests/zn_q13_snow_step.jpg` | `/assets/quests/zn_q13_snow_step.jpg` | `QST-SECT-11-13`<br>《西市飞霜 · 踏雪无痕》 | 西市东坊小院<br>（`scene_znq13_07`） | `16:9` |
| `CG-QST-492` | `[x]` 已完成 | `public/assets/quests/zn_q13_xishi_raid.jpg` | `/assets/quests/zn_q13_xishi_raid.jpg` | `QST-SECT-11-13`<br>《西市飞霜 · 踏雪无痕》 | 长安府 · 西市胡商坊（西市）<br>（`scene_znq13_11`） | `16:9` |
| `CG-QST-493` | `[x]` 已完成 | `public/assets/quests/zn_q14_jianmen_plank.jpg` | `/assets/quests/zn_q14_jianmen_plank.jpg` | `QST-SECT-11-14`<br>《玉蜂琼浆 · 蜀道求药》 | 剑门关 · 剑阁鸟道悬空栈<br>（`scene_znq14_04`） | `16:9` |
| `CG-QST-494` | `[x]` 已完成 | `public/assets/quests/zn_q14_poison_bridge.jpg` | `/assets/quests/zn_q14_poison_bridge.jpg` | `QST-SECT-11-14`<br>《玉蜂琼浆 · 蜀道求药》 | 青城山 · 飞瀑铁索采药悬栈<br>（`scene_znq14_12`） | `16:9` |
| `CG-QST-495` | `[x]` 已完成 | `public/assets/quests/zn_q14_chengdu_tea.jpg` | `/assets/quests/zn_q14_chengdu_tea.jpg` | `QST-SECT-11-14`<br>《玉蜂琼浆 · 蜀道求药》 | 成都府 · 锦江万里桥茶肆<br>（`scene_znq14_15`） | `16:9` |
| `CG-QST-496` | `[x]` 已完成 | `public/assets/quests/zn_q15_canglang_pavilion.jpg` | `/assets/quests/zn_q15_canglang_pavilion.jpg` | `QST-SECT-11-15`<br>《烟波试剑 · 越女惊鸿》 | 苏州府 · 沧浪亭书院<br>（`scene_znq15_05`） | `16:9` |
| `CG-QST-497` | `[x]` 已完成 | `public/assets/quests/zn_q15_huqiu_pool.jpg` | `/assets/quests/zn_q15_huqiu_pool.jpg` | `QST-SECT-11-15`<br>《烟波试剑 · 越女惊鸿》 | 苏州府 · 裂崖飞梁吴王剑池<br>（`scene_znq15_10`） | `16:9` |
| `CG-QST-498` | `[x]` 已完成 | `public/assets/quests/zn_q15_yuenv_sword.jpg` | `/assets/quests/zn_q15_yuenv_sword.jpg` | `QST-SECT-11-15`<br>《烟波试剑 · 越女惊鸿》 | 裂崖飞梁吴王剑池<br>（`scene_znq15_11`） | `16:9` |
| `CG-QST-499` | `[x]` 已完成 | `public/assets/quests/zn_q15_gumu_promotion.jpg` | `/assets/quests/zn_q15_gumu_promotion.jpg` | `QST-SECT-11-15`<br>《烟波试剑 · 越女惊鸿》 | 终南山隐宗 · 昆仑寒玉床冰魄石室<br>（`scene_znq15_21`） | `16:9` |
| `CG-QST-500` | `[x]` 已完成 | `public/assets/quests/zn_q16_qin_pavilion.jpg` | `/assets/quests/zn_q16_qin_pavilion.jpg` | `QST-SECT-11-16`<br>《寒潭孤影 · 誓词问情》 | 终南山隐宗 · 寒玉涧临水抚琴榭<br>（`scene_znq16_01`） | `16:9` |
| `CG-QST-501` | `[x]` 已完成 | `public/assets/quests/zn_q16_intruder_duel.jpg` | `/assets/quests/zn_q16_intruder_duel.jpg` | `QST-SECT-11-16`<br>《寒潭孤影 · 誓词问情》 | 寒玉涧临水抚琴榭<br>（`scene_znq16_04`） | `16:9` |
| `CG-QST-502` | `[x]` 已完成 | `public/assets/quests/zn_q16_cold_pool_vow.jpg` | `/assets/quests/zn_q16_cold_pool_vow.jpg` | `QST-SECT-11-16`<br>《寒潭孤影 · 誓词问情》 | 终南山隐宗 · 昆仑寒玉床冰魄石室<br>（`scene_znq16_12`） | `16:9` |
| `CG-QST-503` | `[x]` 已完成 | `public/assets/quests/zn_q16_heart_choice.jpg` | `/assets/quests/zn_q16_heart_choice.jpg` | `QST-SECT-11-16`<br>《寒潭孤影 · 誓词问情》 | 昆仑寒玉床冰魄石室<br>（`scene_znq16_14`） | `16:9` |
| `CG-QST-504` | `[x]` 已完成 | `public/assets/quests/zn_q17_frost_palm.jpg` | `/assets/quests/zn_q17_frost_palm.jpg` | `QST-SECT-11-17`<br>《冰魄银针 · 含沙凝霜》 | 昆仑寒玉床冰魄石室<br>（`scene_znq17_03`） | `16:9` |
| `CG-QST-505` | `[x]` 已完成 | `public/assets/quests/zn_q17_shadow_needles.jpg` | `/assets/quests/zn_q17_shadow_needles.jpg` | `QST-SECT-11-17`<br>《冰魄银针 · 含沙凝霜》 | 昆仑寒玉床冰魄石室<br>（`scene_znq17_05`） | `16:9` |
| `CG-QST-506` | `[x]` 已完成 | `public/assets/quests/zn_q17_midnight_falls.jpg` | `/assets/quests/zn_q17_midnight_falls.jpg` | `QST-SECT-11-17`<br>《冰魄银针 · 含沙凝霜》 | 终南后山寒玉涧 · 银练飞瀑清泉石茗案<br>（`scene_znq17_11`） | `16:9` |
| `CG-QST-507` | `[x]` 已完成 | `public/assets/quests/zn_q18_luoyang_pavilion.jpg` | `/assets/quests/zn_q18_luoyang_pavilion.jpg` | `QST-SECT-11-18`<br>《洛水琴棋 · 聪辩雅集》 | 洛阳府 · 白马书院 · 垂柳荷池手谈水亭<br>（`scene_znq18_01`） | `16:9` |
| `CG-QST-508` | `[x]` 已完成 | `public/assets/quests/zn_q18_chess_meeting.jpg` | `/assets/quests/zn_q18_chess_meeting.jpg` | `QST-SECT-11-18`<br>《洛水琴棋 · 聪辩雅集》 | 垂柳荷池手谈水亭<br>（`scene_znq18_03`） | `16:9` |
| `CG-QST-509` | `[x]` 已完成 | `public/assets/quests/zn_q18_peony_waterside.jpg` | `/assets/quests/zn_q18_peony_waterside.jpg` | `QST-SECT-11-18`<br>《洛水琴棋 · 聪辩雅集》 | 洛阳府 · 洛阳牡丹园 · 碧溪虹桥琴画水榭<br>（`scene_znq18_10`） | `16:9` |
| `CG-QST-510` | `[x]` 已完成 | `public/assets/quests/zn_q18_yunzhonghe_chase.jpg` | `/assets/quests/zn_q18_yunzhonghe_chase.jpg` | `QST-SECT-11-18`<br>《洛水琴棋 · 聪辩雅集》 | 碧溪虹桥琴画水榭<br>（`scene_znq18_12`） | `16:9` |
| `CG-QST-511` | `[x]` 已完成 | `public/assets/quests/zn_q19_silk_scroll.jpg` | `/assets/quests/zn_q19_silk_scroll.jpg` | `QST-SECT-11-19`<br>《寒玉蒸霞 · 素绢真经》 | 昆仑寒玉床冰魄石室<br>（`scene_znq19_02`） | `16:9` |
| `CG-QST-512` | `[x]` 已完成 | `public/assets/quests/zn_q19_jadebed_mist.jpg` | `/assets/quests/zn_q19_jadebed_mist.jpg` | `QST-SECT-11-19`<br>《寒玉蒸霞 · 素绢真经》 | 昆仑寒玉床冰魄石室<br>（`scene_znq19_05`） | `16:9` |
| `CG-QST-513` | `[x]` 已完成 | `public/assets/quests/zn_q19_dual_cultivation.jpg` | `/assets/quests/zn_q19_dual_cultivation.jpg` | `QST-SECT-11-19`<br>《寒玉蒸霞 · 素绢真经》 | 昆仑寒玉床冰魄石室<br>（`scene_znq19_06`） | `16:9` |
| `CG-QST-514` | `[x]` 已完成 | `public/assets/quests/zn_q19_stone_gate.jpg` | `/assets/quests/zn_q19_stone_gate.jpg` | `QST-SECT-11-19`<br>《寒玉蒸霞 · 素绢真经》 | 活死人墓石门<br>（`scene_znq19_11`） | `16:9` |
| `CG-QST-515` | `[x]` 已完成 | `public/assets/quests/zn_q19_frost_seal.jpg` | `/assets/quests/zn_q19_frost_seal.jpg` | `QST-SECT-11-19`<br>《寒玉蒸霞 · 素绢真经》 | 繁花幽谷双剑合璧坪<br>（`scene_znq19_17`） | `16:9` |
| `CG-QST-516` | `[x]` 已完成 | `public/assets/quests/zn_q20_rain_patrol.jpg` | `/assets/quests/zn_q20_rain_patrol.jpg` | `QST-SECT-11-20`<br>《寒涧残碑 · 三十载赌约》 | 终南后山寒玉涧 · 繁花幽谷双剑合璧坪<br>（`scene_znq20_01`） | `16:9` |
| `CG-QST-517` | `[x]` 已完成 | `public/assets/quests/zn_q20_li_yanzong_ambush.jpg` | `/assets/quests/zn_q20_li_yanzong_ambush.jpg` | `QST-SECT-11-20`<br>《寒涧残碑 · 三十载赌约》 | 繁花幽谷双剑合璧坪<br>（`scene_znq20_04`） | `16:9` |
| `CG-QST-518` | `[x]` 已完成 | `public/assets/quests/zn_q20_twin_sword_clash.jpg` | `/assets/quests/zn_q20_twin_sword_clash.jpg` | `QST-SECT-11-20`<br>《寒涧残碑 · 三十载赌约》 | 繁花幽谷双剑合璧坪<br>（`scene_znq20_09`） | `16:9` |
| `CG-QST-519` | `[x]` 已完成 | `public/assets/quests/zn_q20_broken_stele.jpg` | `/assets/quests/zn_q20_broken_stele.jpg` | `QST-SECT-11-20`<br>《寒涧残碑 · 三十载赌约》 | 繁花幽谷双剑合璧坪 · 残碑前<br>（`scene_znq20_12`） | `16:9` |
| `CG-QST-520` | `[x]` 已完成 | `public/assets/quests/zn_q20_thirty_year_oath.jpg` | `/assets/quests/zn_q20_thirty_year_oath.jpg` | `QST-SECT-11-20`<br>《寒涧残碑 · 三十载赌约》 | 繁花幽谷双剑合璧坪<br>（`scene_znq20_19`） | `16:9` |
| `CG-QST-521` | `[x]` 已完成 | `public/assets/quests/zn_q21_luoyang_shaoyong.jpg` | `/assets/quests/zn_q21_luoyang_shaoyong.jpg` | `QST-SECT-11-21`<br>《皇极经世 · 洛阳问数》 | 洛阳府 · 白马书院 · 垂柳荷池手谈水亭<br>（`scene_znq21_01`） | `16:9` |
| `CG-QST-522` | `[x]` 已完成 | `public/assets/quests/zn_q21_dipper_astrolabe.jpg` | `/assets/quests/zn_q21_dipper_astrolabe.jpg` | `QST-SECT-11-21`<br>《皇极经世 · 洛阳问数》 | 白马书院 · 垂柳荷池手谈水亭<br>（`scene_znq21_03`） | `16:9` |
| `CG-QST-523` | `[x]` 已完成 | `public/assets/quests/zn_q21_luoshui_tavern_ambush.jpg` | `/assets/quests/zn_q21_luoshui_tavern_ambush.jpg` | `QST-SECT-11-21`<br>《皇极经世 · 洛阳问数》 | 洛阳府 · 洛水天津酒楼<br>（`scene_znq21_11`） | `16:9` |
| `CG-QST-524` | `[x]` 已完成 | `public/assets/quests/zn_q22_yanan_snow_camp.jpg` | `/assets/quests/zn_q22_yanan_snow_camp.jpg` | `QST-SECT-11-22`<br>《延水悲歌 · 青涧铁血》 | 延安府 · 鄜延边军大营 · 中军帅帐 · 沙盘台<br>（`scene_znq22_01`） | `16:9` |
| `CG-QST-525` | `[x]` 已完成 | `public/assets/quests/zn_q22_jialing_pagoda_plan.jpg` | `/assets/quests/zn_q22_jialing_pagoda_plan.jpg` | `QST-SECT-11-22`<br>《延水悲歌 · 青涧铁血》 | 延安府 · 嘉岭山宝塔 · 宝塔底层 · 舍利地宫<br>（`scene_znq22_09`） | `16:9` |
| `CG-QST-526` | `[x]` 已完成 | `public/assets/quests/zn_q22_blizzard_tent_defense.jpg` | `/assets/quests/zn_q22_blizzard_tent_defense.jpg` | `QST-SECT-11-22`<br>《延水悲歌 · 青涧铁血》 | 延安府 · 鄜延边军大营 · 中军帅帐 · 沙盘台<br>（`scene_znq22_15`） | `16:9` |
| `CG-QST-527` | `[x]` 已完成 | `public/assets/quests/zn_q22_qingjian_blood_dawn.jpg` | `/assets/quests/zn_q22_qingjian_blood_dawn.jpg` | `QST-SECT-11-22`<br>《延水悲歌 · 青涧铁血》 | 鄜延边军大营 · 中军帅帐 · 沙盘台<br>（`scene_znq22_20`） | `16:9` |
| `CG-QST-528` | `[x]` 已完成 | `public/assets/quests/zn_q23_kaiyuan_huangshang.jpg` | `/assets/quests/zn_q23_kaiyuan_huangshang.jpg` | `QST-SECT-11-23`<br>《刺桐校经 · 万寿道藏》 | 泉州府 · 泉州开元寺东西双塔 · 中层回廊 · 浮雕壁画<br>（`scene_znq23_01`） | `16:9` |
| `CG-QST-529` | `[x]` 已完成 | `public/assets/quests/zn_q23_manichaean_raid.jpg` | `/assets/quests/zn_q23_manichaean_raid.jpg` | `QST-SECT-11-23`<br>《刺桐校经 · 万寿道藏》 | 泉州开元寺东西双塔<br>（`scene_znq23_08`） | `16:9` |
| `CG-QST-530` | `[x]` 已完成 | `public/assets/quests/zn_q23_west_tower_battle.jpg` | `/assets/quests/zn_q23_west_tower_battle.jpg` | `QST-SECT-11-23`<br>《刺桐校经 · 万寿道藏》 | 泉州府 · 泉州开元寺东西双塔 · 绝顶佛龛 · 凭栏远眺<br>（`scene_znq23_13`） | `16:9` |
| `CG-QST-531` | `[x]` 已完成 | `public/assets/quests/zn_q23_daozang_yinyang_night.jpg` | `/assets/quests/zn_q23_daozang_yinyang_night.jpg` | `QST-SECT-11-23`<br>《刺桐校经 · 万寿道藏》 | 泉州府 · 泉州开元寺东西双塔 · 中层回廊 · 浮雕壁画<br>（`scene_znq23_21`） | `16:9` |
| `CG-QST-532` | `[x]` 已完成 | `public/assets/quests/zn_q24_dipper_formation_rise.jpg` | `/assets/quests/zn_q24_dipper_formation_rise.jpg` | `QST-SECT-11-24`<br>《北斗封山 · 古观长老》 | 终南山隐宗 · 重阳古观前脉道院 · 天罡北斗七星演剑坛<br>（`scene_znq24_01`） | `16:9` |
| `CG-QST-533` | `[x]` 已完成 | `public/assets/quests/zn_q24_nuerhai_assault.jpg` | `/assets/quests/zn_q24_nuerhai_assault.jpg` | `QST-SECT-11-24`<br>《北斗封山 · 古观长老》 | 天罡北斗七星演剑坛<br>（`scene_znq24_04`） | `16:9` |
| `CG-QST-534` | `[x]` 已完成 | `public/assets/quests/zn_q24_seven_stars_break.jpg` | `/assets/quests/zn_q24_seven_stars_break.jpg` | `QST-SECT-11-24`<br>《北斗封山 · 古观长老》 | 天罡北斗七星演剑坛<br>（`scene_znq24_09`） | `16:9` |
| `CG-QST-535` | `[x]` 已完成 | `public/assets/quests/zn_q24_guguan_elder_investiture.jpg` | `/assets/quests/zn_q24_guguan_elder_investiture.jpg` | `QST-SECT-11-24`<br>《北斗封山 · 古观长老》 | 终南山隐宗 · 重阳古观前脉道院 · 重阳玄门清修主殿<br>（`scene_znq24_19`） | `16:9` |
| `CG-QST-536` | `[x]` 已完成 | `public/assets/quests/zn_q25_jianmen_rescue.jpg` | `/assets/quests/zn_q25_jianmen_rescue.jpg` | `QST-SECT-11-25`<br>《剑阁猿啼 · 巴山折剑》 | 剑门关 · 剑门雄关箭楼 · 雄关箭楼 · 望胡台<br>（`scene_znq25_01`） | `16:9` |
| `CG-QST-537` | `[x]` 已完成 | `public/assets/quests/zn_q25_shangqing_challenge.jpg` | `/assets/quests/zn_q25_shangqing_challenge.jpg` | `QST-SECT-11-25`<br>《剑阁猿啼 · 巴山折剑》 | 青城山 / 唐家堡 · 青城山上清宫松风殿 · 上清松风演剑主殿<br>（`scene_znq25_12`） | `16:9` |
| `CG-QST-538` | `[x]` 已完成 | `public/assets/quests/zn_q25_yucanglan_crown_split.jpg` | `/assets/quests/zn_q25_yucanglan_crown_split.jpg` | `QST-SECT-11-25`<br>《剑阁猿啼 · 巴山折剑》 | 青城山上清宫松风殿 · 上清松风演剑主殿<br>（`scene_znq25_15`） | `16:9` |
| `CG-QST-539` | `[x]` 已完成 | `public/assets/quests/zn_q26_chibi_yeguhong_duel.jpg` | `/assets/quests/zn_q26_chibi_yeguhong_duel.jpg` | `QST-SECT-11-26`<br>《赤壁听涛 · 钟山问剑》 | 江宁府 · 石头城遗址（江南剑庐） · 虎踞赤壁临江试剑台<br>（`scene_znq26_01`） | `16:9` |
| `CG-QST-540` | `[x]` 已完成 | `public/assets/quests/zn_q26_soft_overcomes_hard.jpg` | `/assets/quests/zn_q26_soft_overcomes_hard.jpg` | `QST-SECT-11-26`<br>《赤壁听涛 · 钟山问剑》 | 虎踞赤壁临江试剑台<br>（`scene_znq26_04`） | `16:9` |
| `CG-QST-541` | `[x]` 已完成 | `public/assets/quests/zn_q26_qinhuai_boat_meeting.jpg` | `/assets/quests/zn_q26_qinhuai_boat_meeting.jpg` | `QST-SECT-11-26`<br>《赤壁听涛 · 钟山问剑》 | 江宁府 · 十里秦淮画舫 · 十里秦淮双层鎏金画舫<br>（`scene_znq26_12`） | `16:9` |
| `CG-QST-542` | `[x]` 已完成 | `public/assets/quests/zn_q26_murong_spy_purge.jpg` | `/assets/quests/zn_q26_murong_spy_purge.jpg` | `QST-SECT-11-26`<br>《赤壁听涛 · 钟山问剑》 | 十里秦淮双层鎏金画舫<br>（`scene_znq26_14`） | `16:9` |
| `CG-QST-543` | `[x]` 已完成 | `public/assets/quests/zn_q27_changan_kunlun_map.jpg` | `/assets/quests/zn_q27_changan_kunlun_map.jpg` | `QST-SECT-11-27`<br>《瑶池万里 · 昆仑采玉》 | 京兆府 · 西市胡商坊（丝路起点） · 番坊正市 · 奇货堂<br>（`scene_znq27_01`） | `16:9` |
| `CG-QST-544` | `[x]` 已完成 | `public/assets/quests/zn_q27_yaochi_zhonglixue.jpg` | `/assets/quests/zn_q27_yaochi_zhonglixue.jpg` | `QST-SECT-11-27`<br>《瑶池万里 · 昆仑采玉》 | 昆仑山（万山之祖） · 昆仑瑶池万年冰窟 · 西王母翡翠雪莲池<br>（`scene_znq27_07`） | `16:9` |
| `CG-QST-545` | `[x]` 已完成 | `public/assets/quests/zn_q27_wulaoda_clash.jpg` | `/assets/quests/zn_q27_wulaoda_clash.jpg` | `QST-SECT-11-27`<br>《瑶池万里 · 昆仑采玉》 | 西王母翡翠雪莲池<br>（`scene_znq27_10`） | `16:9` |
| `CG-QST-546` | `[x]` 已完成 | `public/assets/quests/zn_q27_wuxingyun_pressure.jpg` | `/assets/quests/zn_q27_wuxingyun_pressure.jpg` | `QST-SECT-11-27`<br>《瑶池万里 · 昆仑采玉》 | 昆仑山（万山之祖） · 昆仑瑶池万年冰窟 · 万年寒玉冰床晶坛<br>（`scene_znq27_16`） | `16:9` |
| `CG-QST-547` | `[x]` 已完成 | `public/assets/quests/zn_q27_jade_marrow_return.jpg` | `/assets/quests/zn_q27_jade_marrow_return.jpg` | `QST-SECT-11-27`<br>《瑶池万里 · 昆仑采玉》 | 终南山隐宗 · 活死人墓幽谷石室 · 昆仑寒玉床冰魄石室<br>（`scene_znq27_25`） | `16:9` |
| `CG-QST-548` | `[x]` 已完成 | `public/assets/quests/zn_q28_duanlong_poison_night.jpg` | `/assets/quests/zn_q28_duanlong_poison_night.jpg` | `QST-SECT-11-28`<br>《断龙血夜 · 毒海孤星》 | 终南山隐宗 · 活死人墓幽谷石室 · 天罗地网捕雀轻功厅<br>（`scene_znq28_01`） | `16:9` |
| `CG-QST-549` | `[x]` 已完成 | `public/assets/quests/zn_q28_zhaixingzi_ambush.jpg` | `/assets/quests/zn_q28_zhaixingzi_ambush.jpg` | `QST-SECT-11-28`<br>《断龙血夜 · 毒海孤星》 | 天罗地网捕雀轻功厅<br>（`scene_znq28_02`） | `16:9` |
| `CG-QST-550` | `[x]` 已完成 | `public/assets/quests/zn_q28_sparrow_hall_counter.jpg` | `/assets/quests/zn_q28_sparrow_hall_counter.jpg` | `QST-SECT-11-28`<br>《断龙血夜 · 毒海孤星》 | 天罗地网捕雀轻功厅<br>（`scene_znq28_05`） | `16:9` |
| `CG-QST-551` | `[x]` 已完成 | `public/assets/quests/zn_q28_gumu_elder_investiture.jpg` | `/assets/quests/zn_q28_gumu_elder_investiture.jpg` | `QST-SECT-11-28`<br>《断龙血夜 · 毒海孤星》 | 终南山隐宗 · 活死人墓幽谷石室 · 昆仑寒玉床冰魄石室<br>（`scene_znq28_19`） | `16:9` |
| `CG-QST-552` | `[x]` 已完成 | `public/assets/quests/zn_q29_helan_black_cloud.jpg` | `/assets/quests/zn_q29_helan_black_cloud.jpg` | `QST-SECT-11-29`<br>《贺兰黑云 · 一品叩关》 | 终南山隐宗 · 重阳古观前脉道院 · 重阳玄门清修主殿<br>（`scene_znq29_01`） | `16:9` |
| `CG-QST-553` | `[x]` 已完成 | `public/assets/quests/zn_q29_beisu_qingfeng_mist.jpg` | `/assets/quests/zn_q29_beisu_qingfeng_mist.jpg` | `QST-SECT-11-29`<br>《贺兰黑云 · 一品叩关》 | 重阳玄门清修主殿前坪<br>（`scene_znq29_07`） | `16:9` |
| `CG-QST-554` | `[x]` 已完成 | `public/assets/quests/zn_q29_duan_helian_siege.jpg` | `/assets/quests/zn_q29_duan_helian_siege.jpg` | `QST-SECT-11-29`<br>《贺兰黑云 · 一品叩关》 | 终南山隐宗 · 重阳古观前脉道院 · 重阳玄门清修主殿<br>（`scene_znq29_11`） | `16:9` |
| `CG-QST-555` | `[x]` 已完成 | `public/assets/quests/zn_q29_twin_masters_retreat.jpg` | `/assets/quests/zn_q29_twin_masters_retreat.jpg` | `QST-SECT-11-29`<br>《贺兰黑云 · 一品叩关》 | 终南后山寒玉涧 · 繁花幽谷双剑合璧坪<br>（`scene_znq29_18`） | `16:9` |
| `CG-QST-556` | `[x]` 已完成 | `public/assets/quests/zn_q29_harmony_or_split.jpg` | `/assets/quests/zn_q29_harmony_or_split.jpg` | `QST-SECT-11-29`<br>《贺兰黑云 · 一品叩关》 | 终南山隐宗 · 终南后山寒玉涧 · 繁花幽谷双剑合璧坪<br>（`scene_znq29_25`） | `16:9` |
| `CG-QST-557` | `[x]` 已完成 | `public/assets/quests/zn_q30_tao_plea.jpg` | `/assets/quests/zn_q30_tao_plea.jpg` | `QST-SECT-11-30`<br>《寒涧同心 · 剑道合流》 | 重阳古观 · 紫阳托笺<br>（`scene_znq30_05`） | `16:9` |
| `CG-QST-558` | `[x]` 已完成 | `public/assets/quests/zn_q30_tomb_jadebed.jpg` | `/assets/quests/zn_q30_tomb_jadebed.jpg` | `QST-SECT-11-30`<br>《寒涧同心 · 剑道合流》 | 活死人墓 · 寒玉出关<br>（`scene_znq30_11`） | `16:9` |
| `CG-QST-559` | `[x]` 已完成 | `public/assets/quests/zn_q30_qin_heal.jpg` | `/assets/quests/zn_q30_qin_heal.jpg` | `QST-SECT-11-30`<br>《寒涧同心 · 剑道合流》 | 寒玉涧临水抚琴榭 · 月下合功<br>（`scene_znq30_17`） | `16:9` |
| `CG-QST-560` | `[x]` 已完成 | `public/assets/quests/zn_q30_dual_arts.jpg` | `/assets/quests/zn_q30_dual_arts.jpg` | `QST-SECT-11-30`<br>《寒涧同心 · 剑道合流》 | 终南后山寒玉涧 · 道墓同心<br>（`scene_znq30_23`） | `16:9` |
| `CG-QST-561` | `[x]` 已完成 | `public/assets/quests/zn_q31_stream_confront.jpg` | `/assets/quests/zn_q31_stream_confront.jpg` | `QST-SECT-11-31`<br>《孤峰执念 · 道墓决裂》 | 繁花幽谷双剑合璧坪 · 道墓对峙<br>（`scene_znq31_06`） | `16:9` |
| `CG-QST-562` | `[x]` 已完成 | `public/assets/quests/zn_q31_bridge_sever.jpg` | `/assets/quests/zn_q31_bridge_sever.jpg` | `QST-SECT-11-31`<br>《孤峰执念 · 道墓决裂》 | 寒玉涧 · 封涧断桥<br>（`scene_znq31_12`） | `16:9` |
| `CG-QST-563` | `[x]` 已完成 | `public/assets/quests/zn_q31_vanguard_duel.jpg` | `/assets/quests/zn_q31_vanguard_duel.jpg` | `QST-SECT-11-31`<br>《孤峰执念 · 道墓决裂》 | 银练飞瀑 · 血战退敌<br>（`scene_znq31_18`） | `16:9` |
| `CG-QST-564` | `[x]` 已完成 | `public/assets/quests/zn_q31_lone_oath.jpg` | `/assets/quests/zn_q31_lone_oath.jpg` | `QST-SECT-11-31`<br>《孤峰执念 · 道墓决裂》 | 终南后山 · 孤峰立誓<br>（`scene_znq31_23`） | `16:9` |
| `CG-QST-565` | `[x]` 已完成 | `public/assets/quests/zn_q32_ziyang_robe.jpg` | `/assets/quests/zn_q32_ziyang_robe.jpg` | `QST-SECT-11-32`<br>《先天一炁 · 紫阳传衣》 | 重阳玄门清修主殿 · 传衣授道<br>（`scene_znq32_06`） | `16:9` |
| `CG-QST-566` | `[x]` 已完成 | `public/assets/quests/zn_q32_xiantian_qi.jpg` | `/assets/quests/zn_q32_xiantian_qi.jpg` | `QST-SECT-11-32`<br>《先天一炁 · 紫阳传衣》 | 道藏经阁与紫金丹院 · 贯通周天<br>（`scene_znq32_12`） | `16:9` |
| `CG-QST-567` | `[x]` 已完成 | `public/assets/quests/zn_q32_dipper_dawn.jpg` | `/assets/quests/zn_q32_dipper_dawn.jpg` | `QST-SECT-11-32`<br>《先天一炁 · 紫阳传衣》 | 天罡北斗七星演剑坛 · 铁鹞临城<br>（`scene_znq32_17`） | `16:9` |
| `CG-QST-568` | `[x]` 已完成 | `public/assets/quests/zn_q32_helian_clash.jpg` | `/assets/quests/zn_q32_helian_clash.jpg` | `QST-SECT-11-32`<br>《先天一炁 · 紫阳传衣》 | 天罡北斗七星演剑坛 · 破晓大捷<br>（`scene_znq32_22`） | `16:9` |
| `CG-QST-569` | `[x]` 已完成 | `public/assets/quests/zn_q32_sunrise_dao.jpg` | `/assets/quests/zn_q32_sunrise_dao.jpg` | `QST-SECT-11-32`<br>《先天一炁 · 紫阳传衣》 | 重阳古观 · 紫阳传衣<br>（`scene_znq32_27`） | `16:9` |
| `CG-QST-570` | `[x]` 已完成 | `public/assets/quests/zn_q33_sevenstar_bestow.jpg` | `/assets/quests/zn_q33_sevenstar_bestow.jpg` | `QST-SECT-11-33`<br>《天罡神剑 · 横绝塞北》 | 重阳古观 · 拜领神剑<br>（`scene_znq33_06`） | `16:9` |
| `CG-QST-571` | `[x]` 已完成 | `public/assets/quests/zn_q33_tongguan_spear.jpg` | `/assets/quests/zn_q33_tongguan_spear.jpg` | `QST-SECT-11-33`<br>《天罡神剑 · 横绝塞北》 | 潼关瓮城 · 大破燕云铁枪<br>（`scene_znq33_13`） | `16:9` |
| `CG-QST-572` | `[x]` 已完成 | `public/assets/quests/zn_q33_yanan_array.jpg` | `/assets/quests/zn_q33_yanan_array.jpg` | `QST-SECT-11-33`<br>《天罡神剑 · 横绝塞北》 | 延安西营 · 天罡北斗大阵<br>（`scene_znq33_19`） | `16:9` |
| `CG-QST-573` | `[x]` 已完成 | `public/assets/quests/zn_q33_duan_duel.jpg` | `/assets/quests/zn_q33_duan_duel.jpg` | `QST-SECT-11-33`<br>《天罡神剑 · 横绝塞北》 | 延安西营 · 大破段延庆<br>（`scene_znq33_24`） | `16:9` |
| `CG-QST-574` | `[x]` 已完成 | `public/assets/quests/zn_q33_north_triumph.jpg` | `/assets/quests/zn_q33_north_triumph.jpg` | `QST-SECT-11-33`<br>《天罡神剑 · 横绝塞北》 | 重阳古观 · 横绝塞北<br>（`scene_znq33_29`） | `16:9` |
| `CG-QST-575` | `[x]` 已完成 | `public/assets/quests/zn_q34_jadebed_entrust.jpg` | `/assets/quests/zn_q34_jadebed_entrust.jpg` | `QST-SECT-11-34`<br>《冰魄凝心 · 寒玉托剑》 | 昆仑寒玉床冰魄石室 · 传宝授剑<br>（`scene_znq34_06`） | `16:9` |
| `CG-QST-576` | `[x]` 已完成 | `public/assets/quests/zn_q34_ice_meditation.jpg` | `/assets/quests/zn_q34_ice_meditation.jpg` | `QST-SECT-11-34`<br>《冰魄凝心 · 寒玉托剑》 | 捕雀轻功厅 · 剑玦共鸣<br>（`scene_znq34_11`） | `16:9` |
| `CG-QST-577` | `[x]` 已完成 | `public/assets/quests/zn_q34_falls_ambush.jpg` | `/assets/quests/zn_q34_falls_ambush.jpg` | `QST-SECT-11-34`<br>《冰魄凝心 · 寒玉托剑》 | 银练飞瀑 · 双凶袭杀<br>（`scene_znq34_16`） | `16:9` |
| `CG-QST-578` | `[x]` 已完成 | `public/assets/quests/zn_q34_dual_villains.jpg` | `/assets/quests/zn_q34_dual_villains.jpg` | `QST-SECT-11-34`<br>《冰魄凝心 · 寒玉托剑》 | 银练飞瀑 · 一战慑双恶<br>（`scene_znq34_21`） | `16:9` |
| `CG-QST-579` | `[x]` 已完成 | `public/assets/quests/zn_q34_tomb_glory.jpg` | `/assets/quests/zn_q34_tomb_glory.jpg` | `QST-SECT-11-34`<br>《冰魄凝心 · 寒玉托剑》 | 活死人墓 · 寒玉承传<br>（`scene_znq34_27`） | `16:9` |
| `CG-QST-580` | `[x]` 已完成 | `public/assets/quests/zn_q35_flower_valley.jpg` | `/assets/quests/zn_q35_flower_valley.jpg` | `QST-SECT-11-35`<br>《繁花似锦 · 玉女素心》 | 繁花幽谷双剑合璧坪 · 梅下论剑<br>（`scene_znq35_05`） | `16:9` |
| `CG-QST-581` | `[x]` 已完成 | `public/assets/quests/zn_q35_duan_arrival.jpg` | `/assets/quests/zn_q35_duan_arrival.jpg` | `QST-SECT-11-35`<br>《繁花似锦 · 玉女素心》 | 双剑合璧坪 · 段延庆显威<br>（`scene_znq35_10`） | `16:9` |
| `CG-QST-582` | `[x]` 已完成 | `public/assets/quests/zn_q35_suxin_epiphany.jpg` | `/assets/quests/zn_q35_suxin_epiphany.jpg` | `QST-SECT-11-35`<br>《繁花似锦 · 玉女素心》 | 繁花幽谷双剑合璧坪 · 剑道觉醒<br>（`scene_znq35_16`） | `16:9` |
| `CG-QST-583` | `[x]` 已完成 | `public/assets/quests/zn_q35_suxin_clash.jpg` | `/assets/quests/zn_q35_suxin_clash.jpg` | `QST-SECT-11-35`<br>《繁花似锦 · 玉女素心》 | 双剑合璧坪 · 重创段延庆<br>（`scene_znq35_21`） | `16:9` |
| `CG-QST-584` | `[x]` 已完成 | `public/assets/quests/zn_q35_duan_retreat.jpg` | `/assets/quests/zn_q35_duan_retreat.jpg` | `QST-SECT-11-35`<br>《繁花似锦 · 玉女素心》 | 终南后山 · 逐敌出山<br>（`scene_znq35_25`） | `16:9` |
| `CG-QST-585` | `[x]` 已完成 | `public/assets/quests/zn_q35_suxin_mastery.jpg` | `/assets/quests/zn_q35_suxin_mastery.jpg` | `QST-SECT-11-35`<br>《繁花似锦 · 玉女素心》 | 繁花幽谷 · 剑道大成<br>（`scene_znq35_29`） | `16:9` |
| `CG-QST-586` | `[x]` 已完成 | `public/assets/quests/zn_q36_ziyang_summon.jpg` | `/assets/quests/zn_q36_ziyang_summon.jpg` | `QST-SECT-11-36`<br>《玄门正统 · 紫阳掌教》 | 重阳玄门主殿 · 传道定计<br>（`scene_znq36_06`） | `16:9` |
| `CG-QST-587` | `[x]` 已完成 | `public/assets/quests/zn_q36_dipper_trial.jpg` | `/assets/quests/zn_q36_dipper_trial.jpg` | `QST-SECT-11-36`<br>《玄门正统 · 紫阳掌教》 | 天罡北斗七星演剑坛 · 宗师演武<br>（`scene_znq36_13`） | `16:9` |
| `CG-QST-588` | `[x]` 已完成 | `public/assets/quests/zn_q36_seal_bestow.jpg` | `/assets/quests/zn_q36_seal_bestow.jpg` | `QST-SECT-11-36`<br>《玄门正统 · 紫阳掌教》 | 重阳玄门清修主殿 · 传印大典<br>（`scene_znq36_19`） | `16:9` |
| `CG-QST-589` | `[x]` 已完成 | `public/assets/quests/zn_q36_wandering_cloud.jpg` | `/assets/quests/zn_q36_wandering_cloud.jpg` | `QST-SECT-11-36`<br>《玄门正统 · 紫阳掌教》 | 终南古道 · 紫阳云游<br>（`scene_znq36_24`） | `16:9` |
| `CG-QST-590` | `[x]` 已完成 | `public/assets/quests/zn_q36_ziyang_master.jpg` | `/assets/quests/zn_q36_ziyang_master.jpg` | `QST-SECT-11-36`<br>《玄门正统 · 紫阳掌教》 | 重阳古观 · 玄门正统终局<br>（`scene_znq36_29`） | `16:9` |
| `CG-QST-591` | `[x]` 已完成 | `public/assets/quests/zn_q37_qin_farewell.jpg` | `/assets/quests/zn_q37_qin_farewell.jpg` | `QST-SECT-11-37`<br>《太乙仙侣 · 双剑共主》 | 寒玉涧临水抚琴榭 · 仙侣偕隐之愿<br>（`scene_znq37_06`） | `16:9` |
| `CG-QST-592` | `[x]` 已完成 | `public/assets/quests/zn_q37_dual_test.jpg` | `/assets/quests/zn_q37_dual_test.jpg` | `QST-SECT-11-37`<br>《太乙仙侣 · 双剑共主》 | 双剑合璧坪 · 二老试剑<br>（`scene_znq37_13`） | `16:9` |
| `CG-QST-593` | `[x]` 已完成 | `public/assets/quests/zn_q37_sword_reunite.jpg` | `/assets/quests/zn_q37_sword_reunite.jpg` | `QST-SECT-11-37`<br>《太乙仙侣 · 双剑共主》 | 繁花幽谷双剑合璧坪 · 补授神兵<br>（`scene_znq37_19`） | `16:9` |
| `CG-QST-594` | `[x]` 已完成 | `public/assets/quests/zn_q37_couple_depart.jpg` | `/assets/quests/zn_q37_couple_depart.jpg` | `QST-SECT-11-37`<br>《太乙仙侣 · 双剑共主》 | 终南云海 · 偕隐江湖<br>（`scene_znq37_25`） | `16:9` |
| `CG-QST-595` | `[x]` 已完成 | `public/assets/quests/zn_q37_two_branches.jpg` | `/assets/quests/zn_q37_two_branches.jpg` | `QST-SECT-11-37`<br>《太乙仙侣 · 双剑共主》 | 终南隐宗 · 盛世新篇<br>（`scene_znq37_29`） | `16:9` |
| `CG-QST-596` | `[x]` 已完成 | `public/assets/quests/zn_q37_twinsword_master.jpg` | `/assets/quests/zn_q37_twinsword_master.jpg` | `QST-SECT-11-37`<br>《太乙仙侣 · 双剑共主》 | 终南山巅 · 大团圆终局<br>（`scene_znq37_33`） | `16:9` |
| `CG-QST-597` | `[x]` 已完成 | `public/assets/quests/zn_q38_thunder_ambush.jpg` | `/assets/quests/zn_q38_thunder_ambush.jpg` | `QST-SECT-11-38`<br>《断龙绝响 · 黯然孤鸿》 | 活死人墓 · 毒焰漫廊<br>（`scene_znq38_06`） | `16:9` |
| `CG-QST-598` | `[x]` 已完成 | `public/assets/quests/zn_q38_dragon_stone.jpg` | `/assets/quests/zn_q38_dragon_stone.jpg` | `QST-SECT-11-38`<br>《断龙绝响 · 黯然孤鸿》 | 活死人墓 · 千斤巨石封门<br>（`scene_znq38_13`） | `16:9` |
| `CG-QST-599` | `[x]` 已完成 | `public/assets/quests/zn_q38_ice_coffin.jpg` | `/assets/quests/zn_q38_ice_coffin.jpg` | `QST-SECT-11-38`<br>《断龙绝响 · 黯然孤鸿》 | 冰魄石室 · 寒玉冰封<br>（`scene_znq38_19`） | `16:9` |
| `CG-QST-600` | `[x]` 已完成 | `public/assets/quests/zn_q38_biefu_grief.jpg` | `/assets/quests/zn_q38_biefu_grief.jpg` | `QST-SECT-11-38`<br>《断龙绝响 · 黯然孤鸿》 | 银练飞瀑 · 吟《别赋》悟掌<br>（`scene_znq38_24`） | `16:9` |
| `CG-QST-601` | `[x]` 已完成 | `public/assets/quests/zn_q38_anran_palm.jpg` | `/assets/quests/zn_q38_anran_palm.jpg` | `QST-SECT-11-38`<br>《断龙绝响 · 黯然孤鸿》 | 银练飞瀑 · 黯然销魂掌威<br>（`scene_znq38_30`） | `16:9` |
| `CG-QST-602` | `[x]` 已完成 | `public/assets/quests/zn_q38_tomb_master.jpg` | `/assets/quests/zn_q38_tomb_master.jpg` | `QST-SECT-11-38`<br>《断龙绝响 · 黯然孤鸿》 | 终南后山 · 黯然孤鸿终局<br>（`scene_znq38_35`） | `16:9` |
| `CG-QST-603` | `[x]` 已完成 | `public/assets/quests/zn_q39_decline_throne.jpg` | `/assets/quests/zn_q39_decline_throne.jpg` | `QST-SECT-11-39`<br>《坐忘太虚 · 道藏真君》 | 重阳玄门主殿 · 举贤让能<br>（`scene_znq39_06`） | `16:9` |
| `CG-QST-604` | `[x]` 已完成 | `public/assets/quests/zn_q39_guests_arrive.jpg` | `/assets/quests/zn_q39_guests_arrive.jpg` | `QST-SECT-11-39`<br>《坐忘太虚 · 道藏真君》 | 银练飞瀑清泉石茗案 · 迎贤设茗<br>（`scene_znq39_12`） | `16:9` |
| `CG-QST-605` | `[x]` 已完成 | `public/assets/quests/zn_q39_dao_debate.jpg` | `/assets/quests/zn_q39_dao_debate.jpg` | `QST-SECT-11-39`<br>《坐忘太虚 · 道藏真君》 | 银练飞瀑 · 三贤坐忘<br>（`scene_znq39_18`） | `16:9` |
| `CG-QST-606` | `[x]` 已完成 | `public/assets/quests/zn_q39_void_epiphany.jpg` | `/assets/quests/zn_q39_void_epiphany.jpg` | `QST-SECT-11-39`<br>《坐忘太虚 · 道藏真君》 | 银练飞瀑 · 坐忘悟道<br>（`scene_znq39_25`） | `16:9` |
| `CG-QST-607` | `[x]` 已完成 | `public/assets/quests/zn_q39_immortal_recluse.jpg` | `/assets/quests/zn_q39_immortal_recluse.jpg` | `QST-SECT-11-39`<br>《坐忘太虚 · 道藏真君》 | 终南山巅 · 道藏真君终局<br>（`scene_znq39_31`） | `16:9` |
| `CG-QST-608` | `[x]` 已完成 | `public/assets/quests/zn_q40_autumn_dispatch.jpg` | `/assets/quests/zn_q40_autumn_dispatch.jpg` | `QST-SECT-11-40`<br>《贺兰破冰 · 寒窖问尊》 | 终南山隐宗 · 重阳玄门清修主殿<br>（`scene_zn40_01`） | `16:9` |
| `CG-QST-609` | `[x]` 已完成 | `public/assets/quests/zn_q40_desert_march.jpg` | `/assets/quests/zn_q40_desert_march.jpg` | `QST-SECT-11-40`<br>《贺兰破冰 · 寒窖问尊》 | 河西沙道 · 贺兰山麓<br>（`scene_zn40_06`） | `16:9` |
| `CG-QST-610` | `[x]` 已完成 | `public/assets/quests/zn_q40_yipin_gate.jpg` | `/assets/quests/zn_q40_yipin_gate.jpg` | `QST-SECT-11-40`<br>《贺兰破冰 · 寒窖问尊》 | 兴庆府 · 一品堂绿琉璃聚贤殿<br>（`scene_zn40_09`） | `16:9` |
| `CG-QST-611` | `[x]` 已完成 | `public/assets/quests/zn_q40_shatter_plaque.jpg` | `/assets/quests/zn_q40_shatter_plaque.jpg` | `QST-SECT-11-40`<br>《贺兰破冰 · 寒窖问尊》 | 兴庆府 · 一品堂绿琉璃聚贤殿<br>（`scene_zn40_14`） | `16:9` |
| `CG-QST-612` | `[x]` 已完成 | `public/assets/quests/zn_q40_ice_cellar_hall.jpg` | `/assets/quests/zn_q40_ice_cellar_hall.jpg` | `QST-SECT-11-40`<br>《贺兰破冰 · 寒窖问尊》 | 兴庆府 · 西夏皇宫寒玉冰窖<br>（`scene_zn40_21`） | `16:9` |
| `CG-QST-613` | `[x]` 已完成 | `public/assets/quests/zn_q40_ice_duel.jpg` | `/assets/quests/zn_q40_ice_duel.jpg` | `QST-SECT-11-40`<br>《贺兰破冰 · 寒窖问尊》 | 兴庆府 · 西夏皇宫寒玉冰窖<br>（`scene_zn40_25`） | `16:9` |
| `CG-QST-614` | `[x]` 已完成 | `public/assets/quests/zn_q40_pillar_cleave.jpg` | `/assets/quests/zn_q40_pillar_cleave.jpg` | `QST-SECT-11-40`<br>《贺兰破冰 · 寒窖问尊》 | 兴庆府 · 西夏皇宫寒玉冰窖<br>（`scene_zn40_27`） | `16:9` |
| `CG-QST-615` | `[x]` 已完成 | `public/assets/quests/zn_q40_return_dawn.jpg` | `/assets/quests/zn_q40_return_dawn.jpg` | `QST-SECT-11-40`<br>《贺兰破冰 · 寒窖问尊》 | 河西古道 · 关中边关<br>（`scene_zn40_33`） | `16:9` |
| `CG-QST-616` | `[x]` 已完成 | `public/assets/quests/zn_q40_zhongnan_peace.jpg` | `/assets/quests/zn_q40_zhongnan_peace.jpg` | `QST-SECT-11-40`<br>《贺兰破冰 · 寒窖问尊》 | 终南山隐宗 · 重阳玄门清修主殿<br>（`scene_zn40_39`） | `16:9` |
| `CG-QST-617` | `[x]` 已完成 | `public/assets/quests/zn_q41_chongyang_clouds.jpg` | `/assets/quests/zn_q41_chongyang_clouds.jpg` | `QST-SECT-11-41`<br>《云深不知 · 太乙论道》 | 终南山隐宗 · 银练飞瀑清泉石茗案<br>（`scene_zn41_01`） | `16:9` |
| `CG-QST-618` | `[x]` 已完成 | `public/assets/quests/zn_q41_masters_gather.jpg` | `/assets/quests/zn_q41_masters_gather.jpg` | `QST-SECT-11-41`<br>《云深不知 · 太乙论道》 | 终南山隐宗 · 银练飞瀑清泉石茗案<br>（`scene_zn41_06`） | `16:9` |
| `CG-QST-619` | `[x]` 已完成 | `public/assets/quests/zn_q41_duel_feng.jpg` | `/assets/quests/zn_q41_duel_feng.jpg` | `QST-SECT-11-41`<br>《云深不知 · 太乙论道》 | 终南山隐宗 · 繁花幽谷双剑合璧坪<br>（`scene_zn41_11`） | `16:9` |
| `CG-QST-620` | `[x]` 已完成 | `public/assets/quests/zn_q41_duel_jiumozhi.jpg` | `/assets/quests/zn_q41_duel_jiumozhi.jpg` | `QST-SECT-11-41`<br>《云深不知 · 太乙论道》 | 终南山隐宗 · 繁花幽谷双剑合璧坪<br>（`scene_zn41_21`） | `16:9` |
| `CG-QST-621` | `[x]` 已完成 | `public/assets/quests/zn_q41_duel_murong.jpg` | `/assets/quests/zn_q41_duel_murong.jpg` | `QST-SECT-11-41`<br>《云深不知 · 太乙论道》 | 终南山隐宗 · 繁花幽谷双剑合璧坪<br>（`scene_zn41_31`） | `16:9` |
| `CG-QST-622` | `[x]` 已完成 | `public/assets/quests/zn_q41_victory_ovation.jpg` | `/assets/quests/zn_q41_victory_ovation.jpg` | `QST-SECT-11-41`<br>《云深不知 · 太乙论道》 | 终南山隐宗 · 繁花幽谷双剑合璧坪<br>（`scene_zn41_34`） | `16:9` |
| `CG-QST-623` | `[x]` 已完成 | `public/assets/quests/zn_q41_waterfall_tea.jpg` | `/assets/quests/zn_q41_waterfall_tea.jpg` | `QST-SECT-11-41`<br>《云深不知 · 太乙论道》 | 终南山隐宗 · 银练飞瀑清泉石茗案<br>（`scene_zn41_39`） | `16:9` |
| `CG-QST-624` | `[x]` 已完成 | `public/assets/quests/zn_q41_taiyi_apotheosis.jpg` | `/assets/quests/zn_q41_taiyi_apotheosis.jpg` | `QST-SECT-11-41`<br>《云深不知 · 太乙论道》 | 终南山隐宗 · 银练飞瀑清泉石茗案<br>（`scene_zn41_43`） | `16:9` |
| `CG-QST-625` | `[x]` 已完成 | `public/assets/quests/zn_q41_eternal_pine.jpg` | `/assets/quests/zn_q41_eternal_pine.jpg` | `QST-SECT-11-41`<br>《云深不知 · 太乙论道》 | 终南山隐宗 · 银练飞瀑清泉石茗案<br>（`scene_zn41_45`） | `16:9` |
| `CG-QST-626` | `[x]` 已完成 | `public/assets/quests/zn_side01_bee_garden.jpg` | `/assets/quests/zn_side01_bee_garden.jpg` | `QST-SECT-11-SIDE-01`<br>《玉蜂百花 · 清芬酿蜜记》 | 终南山隐宗 · 玉蜂百花酿蜜幽轩<br>（`scene_zns01_01`） | `16:9` |
| `CG-QST-627` | `[x]` 已完成 | `public/assets/quests/zn_side01_thief_ambush.jpg` | `/assets/quests/zn_side01_thief_ambush.jpg` | `QST-SECT-11-SIDE-01`<br>《玉蜂百花 · 清芬酿蜜记》 | 终南山隐宗 · 玉蜂百花酿蜜幽轩<br>（`scene_zns01_07`） | `16:9` |
| `CG-QST-628` | `[x]` 已完成 | `public/assets/quests/zn_side02_hengqu_lecture.jpg` | `/assets/quests/zn_side02_hengqu_lecture.jpg` | `QST-SECT-11-SIDE-02`<br>《横渠问剑 · 立心立命录》 | 京兆府 · 长安横渠关学书院<br>（`scene_zns02_01`） | `16:9` |
| `CG-QST-629` | `[x]` 已完成 | `public/assets/quests/zn_side02_roof_chase.jpg` | `/assets/quests/zn_side02_roof_chase.jpg` | `QST-SECT-11-SIDE-02`<br>《横渠问剑 · 立心立命录》 | 京兆府 · 永兴军路京兆府衙<br>（`scene_zns02_08`） | `16:9` |
| `CG-QST-630` | `[x]` 已完成 | `public/assets/quests/zn_side03_alchemy_furnace.jpg` | `/assets/quests/zn_side03_alchemy_furnace.jpg` | `QST-SECT-11-SIDE-03`<br>《紫金丹火 · 耀州博山炉》 | 终南山隐宗 · 道藏经阁与紫金丹院<br>（`scene_zns03_01`） | `16:9` |
| `CG-QST-631` | `[x]` 已完成 | `public/assets/quests/zn_side03_bandit_ambush.jpg` | `/assets/quests/zn_side03_bandit_ambush.jpg` | `QST-SECT-11-SIDE-03`<br>《紫金丹火 · 耀州博山炉》 | 终南山口 · 松林石径<br>（`scene_zns03_06`） | `16:9` |
| `CG-QST-632` | `[x]` 已完成 | `public/assets/quests/zn_side04_dayanta_stele.jpg` | `/assets/quests/zn_side04_dayanta_stele.jpg` | `QST-SECT-11-SIDE-04`<br>《雁塔题名 · 先秦石鼓考》 | 京兆府 · 慈恩寺大雁塔<br>（`scene_zns04_01`） | `16:9` |
| `CG-QST-633` | `[x]` 已完成 | `public/assets/quests/zn_side04_spy_duel.jpg` | `/assets/quests/zn_side04_spy_duel.jpg` | `QST-SECT-11-SIDE-04`<br>《雁塔题名 · 先秦石鼓考》 | 京兆府 · 慈恩寺大雁塔<br>（`scene_zns04_06`） | `16:9` |
| `CG-QST-634` | `[x]` 已完成 | `public/assets/quests/zn_side05_xishi_case.jpg` | `/assets/quests/zn_side05_xishi_case.jpg` | `QST-SECT-11-SIDE-05`<br>《西市迷香 · 波斯胡商案》 | 京兆府 · 西市胡商坊<br>（`scene_zns05_01`） | `16:9` |
| `CG-QST-635` | `[x]` 已完成 | `public/assets/quests/zn_side05_cellar_fight.jpg` | `/assets/quests/zn_side05_cellar_fight.jpg` | `QST-SECT-11-SIDE-05`<br>《西市迷香 · 波斯胡商案》 | 京兆府 · 西市荒废酒窖<br>（`scene_zns05_06`） | `16:9` |
| `CG-QST-636` | `[x]` 已完成 | `public/assets/quests/zn_side06_snow_woodcutter.jpg` | `/assets/quests/zn_side06_snow_woodcutter.jpg` | `QST-SECT-11-SIDE-06`<br>《太白积雪 · 樵夫劈柴意》 | 终南山隐宗 · 银练飞瀑清泉石茗案<br>（`scene_zns06_01`） | `16:9` |
| `CG-QST-637` | `[x]` 已完成 | `public/assets/quests/zn_side06_wolf_pack.jpg` | `/assets/quests/zn_side06_wolf_pack.jpg` | `QST-SECT-11-SIDE-06`<br>《太白积雪 · 樵夫劈柴意》 | 终南山隐宗 · 太白雪崖茅庐<br>（`scene_zns06_06`） | `16:9` |
| `CG-QST-638` | `[x]` 已完成 | `public/assets/quests/zn_side07_caotang_rescue.jpg` | `/assets/quests/zn_side07_caotang_rescue.jpg` | `QST-SECT-11-SIDE-07`<br>《秦晋同盟 · 西岳送剑帖》 | 京兆府 · 终南草堂<br>（`scene_zns07_01`） | `16:9` |
| `CG-QST-639` | `[x]` 已完成 | `public/assets/quests/zn_side07_tongguan_clash.jpg` | `/assets/quests/zn_side07_tongguan_clash.jpg` | `QST-SECT-11-SIDE-07`<br>《秦晋同盟 · 西岳送剑帖》 | 潼关 / 西岳华山 · 潼关天险瓮城<br>（`scene_zns07_06`） | `16:9` |
| `CG-QST-640` | `[x]` 已完成 | `public/assets/quests/zn_side08_winter_tea.jpg` | `/assets/quests/zn_side08_winter_tea.jpg` | `QST-SECT-11-SIDE-08`<br>《寒涧松茗 · 岁寒三友会》 | 终南山隐宗 · 银练飞瀑清泉石茗案<br>（`scene_zns08_01`） | `16:9` |
| `CG-QST-641` | `[x]` 已完成 | `public/assets/quests/zn_side08_qin_sword_spar.jpg` | `/assets/quests/zn_side08_qin_sword_spar.jpg` | `QST-SECT-11-SIDE-08`<br>《寒涧松茗 · 岁寒三友会》 | 终南山隐宗 · 银练飞瀑清泉石茗案<br>（`scene_zns08_06`） | `16:9` |
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

---

### 103. `CG-QST-103`：东京樊楼飞桥雅阁 · 四厢都指挥夜巡拍案弹压醉酒散官图

- **关联文件**：[`src/data/quests/sects/jinjunFanlouNightQuest.ts`](../src/data/quests/sects/jinjunFanlouNightQuest.ts)
- **目标路径**：`public/assets/quests/jinjun_fanlou_patrol.jpg`
- **画框题跋**：`东京樊楼飞桥雅阁 · 四厢都指挥夜巡拍案弹压醉酒散官`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color narrative illustration, wide cinematic 16:9 composition. Nighttime inside an opulent upper-story private pavilion of Fanlou Tavern in Kaifeng around 1050 AD, warm lantern glow illuminating shattered celadon wine cups and overturned screens. A resolute young Song Imperial Guard commander in crimson-and-violet brocade patrol robes slams a gilt tiger-tally onto a rosewood table, sternly rebuking three startled, drunken aristocratic junior officers while a trembling pipa musician and kneeling innkeeper watch in relief. Rich Song interior details, strictly zero text or characters.
  ```

---

### 104. `CG-QST-104`：大相国寺后巷月夜 · 决战血手刀冷无忌图

- **关联文件**：[`src/data/quests/sects/jinjunFanlouNightQuest.ts`](../src/data/quests/sects/jinjunFanlouNightQuest.ts)
- **目标路径**：`public/assets/quests/jinjun_xiangguosi_alley_duel.jpg`
- **画框题跋**：`大相国寺后巷月夜 · 决战血手刀冷无忌`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color wuxia duel illustration, wide cinematic 16:9 composition. Cold moonlight illuminating a secluded ruined courtyard behind Xiangguosi Temple in Kaifeng around 1050 AD, stacked with camphorwood chests of stolen silver. A fierce outlaw blade master in dark blue robes lunges downward with a heavy ghost-head saber, clashing sparks against the drawn blade of the young Song Imperial Guard commander. Dynamic midnight shadows, mineral pigments, strictly zero text or characters.
  ```

---

### 105. `CG-QST-105`：玉津园大教场驰道 · 四厢都指挥飞身驯服河曲烈驹图

- **关联文件**：[`src/data/quests/sects/jinjunYujinyuanHorseQuest.ts`](../src/data/quests/sects/jinjunYujinyuanHorseQuest.ts)
- **目标路径**：`public/assets/quests/jinjun_yujinyuan_horsemanship.jpg`
- **画框题跋**：`玉津园大教场驰道 · 四厢都指挥飞身驯服河曲烈驹`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color equestrian illustration, wide cinematic 16:9 composition. Bright spring morning at the Imperial Guard training ground in Kaifeng around 1050 AD, willow catkins drifting over a packed-earth riding track. The young Song commander vaults gracefully onto the bare back of a rearing jet-black warhorse with four white hooves, steadying the reins with effortless balance as cheering Song officers and armored troops applaud from the wooden viewing gallery. Crisp mineral colors, strictly zero text or characters.
  ```

---

### 106. `CG-QST-106`：大教场长枪演武坪 · 力挫塞外狂徒贺兰铁戟图

- **关联文件**：[`src/data/quests/sects/jinjunYujinyuanHorseQuest.ts`](../src/data/quests/sects/jinjunYujinyuanHorseQuest.ts)
- **目标路径**：`public/assets/quests/jinjun_yujinyuan_spear_duel.jpg`
- **画框题跋**：`大教场长枪演武坪 · 力挫塞外狂徒贺兰铁戟`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color martial arts duel, wide cinematic 16:9 composition. Afternoon sunlight at the spear-drill plaza of the Kaifeng Imperial Guard camp around 1050 AD, surrounded by hundreds of watching armored Song soldiers. In the center, the young Song commander deftly deflects a massive ninety-jin iron halberd wielded by a burly frontier challenger in lamellar armor, sending shockwaves of dust across the flagstones. Dynamic martial energy, strictly zero text or characters.
  ```

---

### 107. `CG-QST-107`：太原汾水夜渡 · 截获河东私铁黑车激战统领图

- **关联文件**：[`src/data/quests/sects/jinjunTaiyuanIronQuest.ts`](../src/data/quests/sects/jinjunTaiyuanIronQuest.ts)
- **目标路径**：`public/assets/quests/jinjun_taiyuan_fen_river_ambush.jpg`
- **画框题跋**：`太原汾水夜渡 · 截获河东私铁黑车激战统领`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color night ambush scene, wide cinematic 16:9 composition. Misty reeds along the Fen River ferry near Taiyuan around 1050 AD under a crescent moon. Heavy coal-dusted wagons loaded with gleaming iron armor scales are halted on a wooden pier as the young Song Imperial Guard commissioner clashes simultaneously against two fierce private-guard captains with sabers and darts. Mist, river reflections, mineral pigments, strictly zero text or characters.
  ```

---

### 108. `CG-QST-108`：河东铁冶监火海 · 决战宗师下品寒铁手拓跋烈图

- **关联文件**：[`src/data/quests/sects/jinjunTaiyuanIronQuest.ts`](../src/data/quests/sects/jinjunTaiyuanIronQuest.ts)
- **目标路径**：`public/assets/quests/jinjun_taiyuan_grandmaster_duel.jpg`
- **画框题跋**：`河东铁冶监火海 · 决战宗师下品寒铁手拓跋烈`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color grandmaster wuxia showdown, wide cinematic 16:9 composition. Blazing blast furnaces and flying sparks inside the Taiyuan Imperial Iron Works armory around 1050 AD. An elderly white-haired frontier grandmaster in an iron-black cloak strikes forward with frost-blue metallic palms that part the roaring flames, colliding with the fierce counterattack of the armored Song Three-Commands commissioner. Dramatic fire-and-ice contrast, strictly zero text or characters.
  ```

---

### 109. `CG-QST-109`：麦积山千佛悬崖暗道 · 截击陇右沙匪盗马驼队图

- **关联文件**：[`src/data/quests/sects/jinjunQinzhouHorseQuest.ts`](../src/data/quests/sects/jinjunQinzhouHorseQuest.ts)
- **目标路径**：`public/assets/quests/jinjun_qinzhou_maijishan_ambush.jpg`
- **画框题跋**：`麦积山千佛悬崖暗道 · 截击陇右沙匪盗马驼队`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color frontier action scene, wide cinematic 16:9 composition. Towering red sandstone cliffside of Maijishan Grottoes near Qinzhou at starlit dawn around 1050 AD, with ancient wooden plank walkways clinging to the cliff above. Along the narrow mountain trail below, the Song Imperial Guard commissioner leaps on horseback to intercept a caravan of camels laden with tea bricks and blindfolded warhorses guarded by two fierce desert bandits. Rich mineral pigments, strictly zero text or characters.
  ```

---

### 110. `CG-QST-110`：陇右古战场烽燧残垣 · 单骑斩杀宗师铁莲尊者察罕图

- **关联文件**：[`src/data/quests/sects/jinjunQinzhouHorseQuest.ts`](../src/data/quests/sects/jinjunQinzhouHorseQuest.ts)
- **目标路径**：`public/assets/quests/jinjun_qinzhou_beacon_duel.jpg`
- **画框题跋**：`陇右古战场烽燧残垣 · 单骑斩杀宗师铁莲尊者察罕`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color epic frontier duel, wide cinematic 16:9 composition. Blood-red sunset over weathered earthen beacon tower ruins on the Longyou steppe around 1050 AD, fifty fine Hequ warhorses tethered nearby in swirling desert dust. A towering dark-crimson-robed frontier grandmaster monk swings a heavy iron vajra pestle against the lunging strike of the Song Three-Commands commissioner. Sweeping desert wind, rich mineral pigments, strictly zero text or characters.
  ```

---

### 111. `CG-QST-111`：秋雨军器监铁库 · 验尸寻获太湖苏绣帕子图

- **关联文件**：[`src/data/quests/sects/jinjunMurongArc1Quest.ts`](../src/data/quests/sects/jinjunMurongArc1Quest.ts)
- **目标路径**：`public/assets/quests/murong_arc1_armory_crime.jpg`
- **画框题跋**：`秋雨军器监铁库 · 验尸寻获太湖苏绣帕子`
- **主角参考图**：`public/assets/characters/protagonists/hero_03_spearman_fb.jpg`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color detective scene, wide cinematic 16:9 composition. Torchlight inside a damp stone imperial armory vault in Kaifeng on a rainy autumn night around 1050 AD, unlocked bronze doors and empty crossbow racks behind. Kneeling beside two fallen armored officers is the young Song Imperial Guard general (Dianqiansi Duyuhou, matching hero_03_spearman_fb.jpg: sharp-eyed young man with high black ponytail tied with a fluttering crimson ribbon, wearing silver scale chest armor with a tiger-head emblem and lion pauldrons over a crimson tunic and flowing red cape, red-tasseled steel spear resting at his side), holding up a delicate white Suzhou-embroidered silk handkerchief found near the damp stone corner. Rich Song mineral pigments, dramatic torch shadows, strictly zero text or characters.
  ```

---

### 112. `CG-QST-112`：秋雨汴河漕运码头 · 栈桥力战“一阵风”风波恶图

- **关联文件**：[`src/data/quests/sects/jinjunMurongArc1Quest.ts`](../src/data/quests/sects/jinjunMurongArc1Quest.ts)
- **目标路径**：`public/assets/quests/murong_arc1_wharf_duel.jpg`
- **画框题跋**：`秋雨汴河漕运码头 · 栈桥力战一阵风风波恶`
- **主角参考图**：`public/assets/characters/protagonists/hero_03_spearman_fb.jpg`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color wuxia duel, wide cinematic 16:9 composition. Heavy autumn rain over a wooden canal wharf in Kaifeng at night around 1050 AD, a black-sailed swift boat gliding into the dark river mist. On the rain-slicked pier, the young Song Imperial Guard general (matching hero_03_spearman_fb.jpg: high black ponytail with crimson ribbon, silver tiger-emblem scale armor and lion pauldrons over crimson martial robes and billowing red cape) thrusts his long red-tasseled steel spear to clash in sparks against the saber of a wild laughing swordsman in dark Jiangnan attire (Feng Bo'e), as armored guards rush forward with lanterns. Splashing rain, dynamic sparks, strictly zero text or characters.
  ```

---

### 113. `CG-QST-113`：少室山巅 · 一千大宋禁军铁甲列阵围禅林图

- **关联文件**：[`src/data/quests/sects/jinjunMurongArc2Quest.ts`](../src/data/quests/sects/jinjunMurongArc2Quest.ts)
- **目标路径**：`public/assets/quests/murong_arc2_shaolin_encircle.jpg`
- **画框题跋**：`少室山巅 · 一千大宋禁军铁甲列阵围禅林`
- **主角参考图**：`public/assets/characters/protagonists/hero_03_spearman_fb.jpg`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color grand military tableau, wide cinematic 16:9 composition. Autumn mist swirling around the ancient stone courtyard of Shaolin Temple on Mount Song around 1050 AD. One thousand armored Song Imperial Guards in gleaming iron mountain-pattern armor form a dense crescent encirclement with forests of long spears, cocked crossbows, and fluttering crimson dragon banners. At the forefront stands the young Song Imperial Guard general (matching hero_03_spearman_fb.jpg: high ponytail with crimson ribbon, silver tiger-emblem scale breastplate and lion pauldrons, crimson tunic and flowing red cape, planted long red-tasseled steel spear in hand), confronting startled martial artists gathered before the temple hall. Epic scale, strictly zero text or characters.
  ```

---

### 114. `CG-QST-114`：少室山大雄殿前 · 破斗转星移斩断慕容复佩剑图

- **关联文件**：[`src/data/quests/sects/jinjunMurongArc2Quest.ts`](../src/data/quests/sects/jinjunMurongArc2Quest.ts)
- **目标路径**：`public/assets/quests/murong_arc2_murongfu_duel.jpg`
- **画框题跋**：`少室山大雄殿前 · 破斗转星移斩断慕容复佩剑`
- **主角参考图**：`public/assets/characters/protagonists/hero_03_spearman_fb.jpg`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color martial arts climax, wide cinematic 16:9 composition. Before the grand hall of Shaolin Temple around 1050 AD, watched by Abbot Xuanci, crimson-armored Song troops, and stunned heroes. The young Song Imperial Guard general (matching hero_03_spearman_fb.jpg: high ponytail with crimson ribbon, silver tiger-emblem scale armor, crimson robe and billowing red cape) sweeps his long red-tasseled steel spear in a fierce battlefield strike that shatters the pale-yellow-robed aristocrat Murong Fu's sword in mid-air, sending Murong Fu reeling backward onto the cracked flagstones. Rich mineral pigments, strictly zero text or characters.
  ```

---

### 115. `CG-QST-115`：少林禅院惊变 · 潜伏三十载的灰衣老僧慕容博掠出图

- **关联文件**：[`src/data/quests/sects/jinjunMurongArc2Quest.ts`](../src/data/quests/sects/jinjunMurongArc2Quest.ts)
- **目标路径**：`public/assets/quests/murong_arc2_murongbo_emerge.jpg`
- **画框题跋**：`少林禅院惊变 · 潜伏三十载的灰衣老僧慕容博掠出`
- **主角参考图**：`public/assets/characters/protagonists/hero_03_spearman_fb.jpg`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color dramatic wuxia scene, wide cinematic 16:9 composition. Shocking ambush in the Shaolin courtyard around 1050 AD: a gaunt elderly monk in a faded grey robe blurs forward like a phantom, sleeves billowing as invisible finger-qi blasts four armored Song executioners backward. In the foreground, the young Song Imperial Guard general (matching hero_03_spearman_fb.jpg: high ponytail with crimson ribbon, silver tiger-emblem scale armor and lion pauldrons, crimson robe and cape) braces his long red-tasseled steel spear across his chest to intercept while Abbot Xuanci watches in horror. High tension, strictly zero text or characters.
  ```

---

### 116. `CG-QST-116`：死战宗师上品慕容博 · 硬接三轮参合指绝杀图

- **关联文件**：[`src/data/quests/sects/jinjunMurongArc2Quest.ts`](../src/data/quests/sects/jinjunMurongArc2Quest.ts)
- **目标路径**：`public/assets/quests/murong_arc2_three_rounds_blood.jpg`
- **画框题跋**：`死战宗师上品慕容博 · 硬接三轮参合指绝杀`
- **主角参考图**：`public/assets/characters/protagonists/hero_03_spearman_fb.jpg`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color tragic heroic battle, wide cinematic 16:9 composition. In the Shaolin plaza around 1050 AD, the grey-robed grandmaster Murong Bo unleashes a devastating invisible finger-energy blast that cracks and shatters the silver tiger-emblem scale breastplate of the young Song Imperial Guard general (matching hero_03_spearman_fb.jpg: high ponytail with crimson ribbon, crimson robes, red cape, clutching his red-tasseled steel spear), sending him flying backward spitting blood while Shaolin elder monks rush to form a protective barrier and Song crossbowmen loose a storm of bolts. Strictly zero text or characters.
  ```

---

### 117. `CG-QST-117`：官家微服亲探 · 御赐大内秘藏天阶心法《太玄经》图

- **关联文件**：[`src/data/quests/sects/jinjunMurongArc2Quest.ts`](../src/data/quests/sects/jinjunMurongArc2Quest.ts)
- **目标路径**：`public/assets/quests/murong_arc2_renzong_taixuan.jpg`
- **画框题跋**：`官家微服亲探 · 御赐大内秘藏天阶心法太玄经`
- **主角参考图**：`public/assets/characters/protagonists/hero_03_spearman_fb.jpg`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color warm courtly interior, wide cinematic 16:9 composition. Afternoon sunlight streaming into a quiet general's residence chamber in Kaifeng around 1050 AD. Emperor Renzong in plain imperial robes sits beside the sickbed of the recovering young Song Imperial Guard general (matching hero_03_spearman_fb.jpg: sharp-featured young man with black hair tied back with a crimson ribbon, dressed in plain crimson-and-white inner robes while his silver tiger-emblem scale armor and red-tasseled steel spear rest on a wooden rack nearby), presenting an ancient stone-rubbing scroll wrapped in imperial yellow silk brocade as Privy Councilor Wang Deyong stands respectfully nearby. Warm, dignified pigments, strictly zero text or characters.
  ```

---

### 118. `CG-QST-118`：东京汴梁校场 · 统领三千精锐禁军祭旗南下太湖图

- **关联文件**：[`src/data/quests/sects/jinjunMurongArc3Quest.ts`](../src/data/quests/sects/jinjunMurongArc3Quest.ts)
- **目标路径**：`public/assets/quests/murong_arc3_muster_3000.jpg`
- **画框题跋**：`东京汴梁校场 · 统领三千精锐禁军祭旗南下太湖`
- **主角参考图**：`public/assets/characters/protagonists/hero_03_spearman_fb.jpg`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color grand expedition scene, wide cinematic 16:9 composition. Three thousand elite Song Imperial Guards in full iron armor and crimson cloaks assembled in vast formations on the Kaifeng parade ground around 1050 AD. On the raised command platform, the fully recovered young Song Imperial Guard general (matching hero_03_spearman_fb.jpg: high ponytail with crimson ribbon, gleaming silver tiger-emblem scale armor and lion pauldrons over crimson robes and red cape, long red-tasseled steel spear held at his side) pours sacrificial wine to the war banners beneath bright autumn skies. Majestic scale, strictly zero text or characters.
  ```

---

### 119. `CG-QST-119`：苏州秘密兵坊 · 铁甲合围生擒赤霞庄主公冶乾图

- **关联文件**：[`src/data/quests/sects/jinjunMurongArc3Quest.ts`](../src/data/quests/sects/jinjunMurongArc3Quest.ts)
- **目标路径**：`public/assets/quests/murong_arc3_gongye_qian.jpg`
- **画框题跋**：`苏州秘密兵坊 · 铁甲合围生擒赤霞庄主公冶乾`
- **主角参考图**：`public/assets/characters/protagonists/hero_03_spearman_fb.jpg`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color night raid illustration, wide cinematic 16:9 composition. Inside a blazing secret forge and granary outside Suzhou around 1050 AD, piles of dismantled crossbow parts and iron bolts illuminated by firelight. The young Song Imperial Guard general (matching hero_03_spearman_fb.jpg: high ponytail with crimson ribbon, silver tiger-emblem scale armor, crimson robes and cape) levels his long red-tasseled steel spear to subdue the red-palmed Jiangnan master Gongye Qian in front of an iron-armored wall of Song soldiers. Dynamic action, strictly zero text or characters.
  ```

---

### 120. `CG-QST-120`：太湖五湖浓雾 · 慕容水鬼凿船拖兵血染碧波图

- **关联文件**：[`src/data/quests/sects/jinjunMurongArc3Quest.ts`](../src/data/quests/sects/jinjunMurongArc3Quest.ts)
- **目标路径**：`public/assets/quests/murong_arc3_taihu_water_ghosts.jpg`
- **画框题跋**：`太湖五湖浓雾 · 慕容水鬼凿船拖兵血染碧波`
- **主角参考图**：`public/assets/characters/protagonists/hero_03_spearman_fb.jpg`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color naval battle illustration, wide cinematic 16:9 composition. Dense white mist over Lake Taihu around 1050 AD. Several large Song war junks are tilting and sinking as oiled Murong underwater frogmen burst from the reddened waves to drag heavy iron-armored Song soldiers off the gunwales. On the flagship bow, the young Song Imperial Guard general (matching hero_03_spearman_fb.jpg: high ponytail with crimson ribbon, silver tiger-emblem scale armor, billowing crimson cape) thrusts his long red-tasseled steel spear downward at surfacing frogmen while Song crossbowmen fire into the water. Chaotic, dramatic, strictly zero text or characters.
  ```

---

### 121. `CG-QST-121`：狂涛摇晃主舰甲板 · 独斗包不同与风波恶联手图

- **关联文件**：[`src/data/quests/sects/jinjunMurongArc3Quest.ts`](../src/data/quests/sects/jinjunMurongArc3Quest.ts)
- **目标路径**：`public/assets/quests/murong_arc3_bao_feng_deck.jpg`
- **画框题跋**：`狂涛摇晃主舰甲板 · 独斗包不同与风波恶联手`
- **主角参考图**：`public/assets/characters/protagonists/hero_03_spearman_fb.jpg`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color naval deck duel, wide cinematic 16:9 composition. On the pitching wooden deck of the Song flagship amidst Lake Taihu mist around 1050 AD, narrow outlaw skiffs ramming the hull. The young Song Imperial Guard general (matching hero_03_spearman_fb.jpg: high ponytail with crimson ribbon, silver tiger-emblem scale armor, crimson robes and cape) stands firmly balanced, sweeping his long red-tasseled steel spear to fight both the mocking green-robed palm master Bao Butong and the fierce saber-wielding Feng Bo'e simultaneously. Splashing waves, strictly zero text or characters.
  ```

---

### 122. `CG-QST-122`：听香水榭曲桥 · 踏血击溃并生擒四大家将之首邓百川图

- **关联文件**：[`src/data/quests/sects/jinjunMurongArc3Quest.ts`](../src/data/quests/sects/jinjunMurongArc3Quest.ts)
- **目标路径**：`public/assets/quests/murong_arc3_deng_baichuan.jpg`
- **画框题跋**：`听香水榭曲桥 · 踏血击溃并生擒四大家将之首邓百川`
- **主角参考图**：`public/assets/characters/protagonists/hero_03_spearman_fb.jpg`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color garden siege, wide cinematic 16:9 composition. A blood-stained zigzag wooden bridge leading to the elegant lakeside Tingxiang Pavilion in Yanziwu around 1050 AD, bamboo groves and lotus ponds damaged by battle. The young Song Imperial Guard general (matching hero_03_spearman_fb.jpg: high ponytail with crimson ribbon, silver tiger-emblem scale armor, crimson robe and tattered red cape) strikes down and captures the resolute elder retainer Deng Baichuan at the point of his red-tasseled steel spear as battle-hardened Song troops surge over the bridge with torches. Strictly zero text or characters.
  ```

---

### 123. `CG-QST-123`：参合堂火光冲天 · 正面硬撼宗师上品慕容博五轮绝杀图

- **关联文件**：[`src/data/quests/sects/jinjunMurongArc3Quest.ts`](../src/data/quests/sects/jinjunMurongArc3Quest.ts)
- **目标路径**：`public/assets/quests/murong_arc3_canhe_five_rounds.jpg`
- **画框题跋**：`参合堂火光冲天 · 正面硬撼宗师上品慕容博五轮绝杀`
- **主角参考图**：`public/assets/characters/protagonists/hero_03_spearman_fb.jpg`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color grandmaster climax, wide cinematic 16:9 composition. Inside the burning Canhe Hall of Yanziwu around 1050 AD, bronze braziers burning secret ledgers. The young Song Imperial Guard general (matching hero_03_spearman_fb.jpg: high ponytail with crimson ribbon, gleaming silver tiger-emblem scale armor, crimson robes and red cape) stands immovable on cracked flagstones, bracing his long red-tasseled steel spear to parry five relentless palm-and-finger strikes from Grandmaster Murong Bo while Murong Fu watches tensely and Song troops smash through the courtyard walls outside. Strictly zero text or characters.
  ```

---

### 124. `CG-QST-124`：太湖夜空火光冲天 · 接管还施水阁起获玉玺印与参合指秘籍图

- **关联文件**：[`src/data/quests/sects/jinjunMurongArc3Quest.ts`](../src/data/quests/sects/jinjunMurongArc3Quest.ts)
- **目标路径**：`public/assets/quests/murong_arc3_yanziwu_ablaze.jpg`
- **画框题跋**：`太湖夜空火光冲天 · 接管还施水阁起获玉玺印与参合指秘籍`
- **主角参考图**：`public/assets/characters/protagonists/hero_03_spearman_fb.jpg`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color dramatic aftermath, wide cinematic 16:9 composition. Night over Lake Taihu around 1050 AD as Yanziwu's pavilions burn bright crimson against the dark sky. Inside the preserved Huanshi Library pavilion, the young Song Imperial Guard general (matching hero_03_spearman_fb.jpg: high ponytail with crimson ribbon, silver tiger-emblem scale armor, crimson cape, red-tasseled steel spear leaning at his shoulder) holds an ancient jade imperial seal and a martial arts manual from an open rosewood chest while guards carry out recovered Song repeating crossbows. Strictly zero text or characters.
  ```

---

### 125. `CG-QST-125`：午时三刻东京市曹 · 以谋反罪公开处斩慕容四大家将图

- **关联文件**：[`src/data/quests/sects/jinjunMurongArc3Quest.ts`](../src/data/quests/sects/jinjunMurongArc3Quest.ts)
- **目标路径**：`public/assets/quests/murong_arc3_kaifeng_execution.jpg`
- **画框题跋**：`午时三刻东京市曹 · 以谋反罪公开处斩慕容四大家将`
- **主角参考图**：`public/assets/characters/protagonists/hero_03_spearman_fb.jpg`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color historical justice scene, wide cinematic 16:9 composition. High noon at the Kaifeng public execution ground around 1050 AD, crowded with cheering Song citizens and ringed by armored Imperial Guards. On the raised wooden platform, Judge Bao Zheng and Privy Councilor Wang Deyong oversee the solemn execution of the four chained Murong retainers for treason, while the victorious young Song Imperial Guard general (matching hero_03_spearman_fb.jpg: high ponytail with crimson ribbon, silver tiger-emblem scale armor and lion pauldrons, crimson robe and cape, holding his long red-tasseled steel spear upright) stands beside the Song banner. Strictly zero text or characters.
  ```

---

### 126. `CG-QST-126`：同文馆冬宴正厅 · 殿前司都虞候以礼乐兵略折服辽夏随使

- **关联文件**：[`src/data/quests/sects/jinjunTongwenguanQuest.ts`](../src/data/quests/sects/jinjunTongwenguanQuest.ts)
- **目标路径**：`public/assets/quests/jinjun_twg_banquet_debate.jpg`
- **画框题跋**：`同文馆冬宴正厅 · 殿前司都虞候以礼乐兵略折服辽夏随使`
- **主角参考图**：`public/assets/characters/protagonists/hero_03_spearman_fb.jpg`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color epic historical wuxia illustration, wide cinematic 16:9 composition around 1050 AD. Depicting scene "同文馆冬宴正厅 · 殿前司都虞候以礼乐兵略折服辽夏随使" from 《同文馆 · 四夷宾服录》. Central protagonist is the young Song Imperial Guard general (matching hero_03_spearman_fb.jpg: sharp-featured young man with high black ponytail tied with a fluttering crimson ribbon, wearing silver tiger-emblem scale chest armor and lion pauldrons over a crimson martial robe and flowing red cape, wielding his long red-tasseled steel spear or Tianbo golden armor-piercing spear). Authentic Northern Song military armor, architecture, and mineral pigments, dramatic atmosphere, strictly zero text or characters.
  ```

---

### 127. `CG-QST-127`：风雪夜同文馆火起 · 吐蕃密宗护法番僧拦路截杀

- **关联文件**：[`src/data/quests/sects/jinjunTongwenguanQuest.ts`](../src/data/quests/sects/jinjunTongwenguanQuest.ts)
- **目标路径**：`public/assets/quests/jinjun_twg_night_fire.jpg`
- **画框题跋**：`风雪夜同文馆火起 · 吐蕃密宗护法番僧拦路截杀`
- **主角参考图**：`public/assets/characters/protagonists/hero_03_spearman_fb.jpg`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color epic historical wuxia illustration, wide cinematic 16:9 composition around 1050 AD. Depicting scene "风雪夜同文馆火起 · 吐蕃密宗护法番僧拦路截杀" from 《同文馆 · 四夷宾服录》. Central protagonist is the young Song Imperial Guard general (matching hero_03_spearman_fb.jpg: sharp-featured young man with high black ponytail tied with a fluttering crimson ribbon, wearing silver tiger-emblem scale chest armor and lion pauldrons over a crimson martial robe and flowing red cape, wielding his long red-tasseled steel spear or Tianbo golden armor-piercing spear). Authentic Northern Song military armor, architecture, and mineral pigments, dramatic atmosphere, strictly zero text or characters.
  ```

---

### 128. `CG-QST-128`：红墙雪夜 · 段正淳护子力战鸠摩智火焰刀逼入绝境

- **关联文件**：[`src/data/quests/sects/jinjunTongwenguanQuest.ts`](../src/data/quests/sects/jinjunTongwenguanQuest.ts)
- **目标路径**：`public/assets/quests/jinjun_twg_duan_flame.jpg`
- **画框题跋**：`红墙雪夜 · 段正淳护子力战鸠摩智火焰刀逼入绝境`
- **主角参考图**：`public/assets/characters/protagonists/hero_03_spearman_fb.jpg`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color epic historical wuxia illustration, wide cinematic 16:9 composition around 1050 AD. Depicting scene "红墙雪夜 · 段正淳护子力战鸠摩智火焰刀逼入绝境" from 《同文馆 · 四夷宾服录》. Central protagonist is the young Song Imperial Guard general (matching hero_03_spearman_fb.jpg: sharp-featured young man with high black ponytail tied with a fluttering crimson ribbon, wearing silver tiger-emblem scale chest armor and lion pauldrons over a crimson martial robe and flowing red cape, wielding his long red-tasseled steel spear or Tianbo golden armor-piercing spear). Authentic Northern Song military armor, architecture, and mineral pigments, dramatic atmosphere, strictly zero text or characters.
  ```

---

### 129. `CG-QST-129`：同文馆飞檐踏雪 · 太玄枪意挑碎大轮明王袈裟金环

- **关联文件**：[`src/data/quests/sects/jinjunTongwenguanQuest.ts`](../src/data/quests/sects/jinjunTongwenguanQuest.ts)
- **目标路径**：`public/assets/quests/jinjun_twg_jiumozhi_duel.jpg`
- **画框题跋**：`同文馆飞檐踏雪 · 太玄枪意挑碎大轮明王袈裟金环`
- **主角参考图**：`public/assets/characters/protagonists/hero_03_spearman_fb.jpg`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color epic historical wuxia illustration, wide cinematic 16:9 composition around 1050 AD. Depicting scene "同文馆飞檐踏雪 · 太玄枪意挑碎大轮明王袈裟金环" from 《同文馆 · 四夷宾服录》. Central protagonist is the young Song Imperial Guard general (matching hero_03_spearman_fb.jpg: sharp-featured young man with high black ponytail tied with a fluttering crimson ribbon, wearing silver tiger-emblem scale chest armor and lion pauldrons over a crimson martial robe and flowing red cape, wielding his long red-tasseled steel spear or Tianbo golden armor-piercing spear). Authentic Northern Song military armor, architecture, and mineral pigments, dramatic atmosphere, strictly zero text or characters.
  ```

---

### 130. `CG-QST-130`：风波平息盟书既定 · 段正淳赠大理雪山骢与段氏纯阳吐纳诀

- **关联文件**：[`src/data/quests/sects/jinjunTongwenguanQuest.ts`](../src/data/quests/sects/jinjunTongwenguanQuest.ts)
- **目标路径**：`public/assets/quests/jinjun_twg_dali_treaty.jpg`
- **画框题跋**：`风波平息盟书既定 · 段正淳赠大理雪山骢与段氏纯阳吐纳诀`
- **主角参考图**：`public/assets/characters/protagonists/hero_03_spearman_fb.jpg`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color epic historical wuxia illustration, wide cinematic 16:9 composition around 1050 AD. Depicting scene "风波平息盟书既定 · 段正淳赠大理雪山骢与段氏纯阳吐纳诀" from 《同文馆 · 四夷宾服录》. Central protagonist is the young Song Imperial Guard general (matching hero_03_spearman_fb.jpg: sharp-featured young man with high black ponytail tied with a fluttering crimson ribbon, wearing silver tiger-emblem scale chest armor and lion pauldrons over a crimson martial robe and flowing red cape, wielding his long red-tasseled steel spear or Tianbo golden armor-piercing spear). Authentic Northern Song military armor, architecture, and mineral pigments, dramatic atmosphere, strictly zero text or characters.
  ```

---

### 131. `CG-QST-131`：垂拱正殿 · 枢密副使狄青慨然请缨，点将调主角与杨文广任正副先锋

- **关联文件**：[`src/data/quests/sects/jinjunYongzhouNanmanQuest.ts`](../src/data/quests/sects/jinjunYongzhouNanmanQuest.ts)
- **目标路径**：`public/assets/quests/jinjun_yn_diqing_muster.jpg`
- **画框题跋**：`垂拱正殿 · 枢密副使狄青慨然请缨，点将调主角与杨文广任正副先锋`
- **主角参考图**：`public/assets/characters/protagonists/hero_03_spearman_fb.jpg`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color epic historical wuxia illustration, wide cinematic 16:9 composition around 1050 AD. Depicting scene "垂拱正殿 · 枢密副使狄青慨然请缨，点将调主角与杨文广任正副先锋" from 《邕州道 · 蛮烟瘴雨平》. Central protagonist is the young Song Imperial Guard general (matching hero_03_spearman_fb.jpg: sharp-featured young man with high black ponytail tied with a fluttering crimson ribbon, wearing silver tiger-emblem scale chest armor and lion pauldrons over a crimson martial robe and flowing red cape, wielding his long red-tasseled steel spear or Tianbo golden armor-piercing spear). Authentic Northern Song military armor, architecture, and mineral pigments, dramatic atmosphere, strictly zero text or characters.
  ```

---

### 132. `CG-QST-132`：十万大山密林夜火 · 禁军死士夜焚星宿派炼毒蛊坛

- **关联文件**：[`src/data/quests/sects/jinjunYongzhouNanmanQuest.ts`](../src/data/quests/sects/jinjunYongzhouNanmanQuest.ts)
- **目标路径**：`public/assets/quests/jinjun_yn_poison_altar.jpg`
- **画框题跋**：`十万大山密林夜火 · 禁军死士夜焚星宿派炼毒蛊坛`
- **主角参考图**：`public/assets/characters/protagonists/hero_03_spearman_fb.jpg`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color epic historical wuxia illustration, wide cinematic 16:9 composition around 1050 AD. Depicting scene "十万大山密林夜火 · 禁军死士夜焚星宿派炼毒蛊坛" from 《邕州道 · 蛮烟瘴雨平》. Central protagonist is the young Song Imperial Guard general (matching hero_03_spearman_fb.jpg: sharp-featured young man with high black ponytail tied with a fluttering crimson ribbon, wearing silver tiger-emblem scale chest armor and lion pauldrons over a crimson martial robe and flowing red cape, wielding his long red-tasseled steel spear or Tianbo golden armor-piercing spear). Authentic Northern Song military armor, architecture, and mineral pigments, dramatic atmosphere, strictly zero text or characters.
  ```

---

### 133. `CG-QST-133`：桂林元宵张灯麻痹敌哨 · 狄青定计子夜暴雨偷渡昆仑关

- **关联文件**：[`src/data/quests/sects/jinjunYongzhouNanmanQuest.ts`](../src/data/quests/sects/jinjunYongzhouNanmanQuest.ts)
- **目标路径**：`public/assets/quests/jinjun_yn_lantern_ruse.jpg`
- **画框题跋**：`桂林元宵张灯麻痹敌哨 · 狄青定计子夜暴雨偷渡昆仑关`
- **主角参考图**：`public/assets/characters/protagonists/hero_03_spearman_fb.jpg`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color epic historical wuxia illustration, wide cinematic 16:9 composition around 1050 AD. Depicting scene "桂林元宵张灯麻痹敌哨 · 狄青定计子夜暴雨偷渡昆仑关" from 《邕州道 · 蛮烟瘴雨平》. Central protagonist is the young Song Imperial Guard general (matching hero_03_spearman_fb.jpg: sharp-featured young man with high black ponytail tied with a fluttering crimson ribbon, wearing silver tiger-emblem scale chest armor and lion pauldrons over a crimson martial robe and flowing red cape, wielding his long red-tasseled steel spear or Tianbo golden armor-piercing spear). Authentic Northern Song military armor, architecture, and mineral pigments, dramatic atmosphere, strictly zero text or characters.
  ```

---

### 134. `CG-QST-134`：归仁铺旷野 · 火药箭雨惊散南蛮披甲巨象阵

- **关联文件**：[`src/data/quests/sects/jinjunYongzhouNanmanQuest.ts`](../src/data/quests/sects/jinjunYongzhouNanmanQuest.ts)
- **目标路径**：`public/assets/quests/jinjun_yn_elephant_charge.jpg`
- **画框题跋**：`归仁铺旷野 · 火药箭雨惊散南蛮披甲巨象阵`
- **主角参考图**：`public/assets/characters/protagonists/hero_03_spearman_fb.jpg`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color epic historical wuxia illustration, wide cinematic 16:9 composition around 1050 AD. Depicting scene "归仁铺旷野 · 火药箭雨惊散南蛮披甲巨象阵" from 《邕州道 · 蛮烟瘴雨平》. Central protagonist is the young Song Imperial Guard general (matching hero_03_spearman_fb.jpg: sharp-featured young man with high black ponytail tied with a fluttering crimson ribbon, wearing silver tiger-emblem scale chest armor and lion pauldrons over a crimson martial robe and flowing red cape, wielding his long red-tasseled steel spear or Tianbo golden armor-piercing spear). Authentic Northern Song military armor, architecture, and mineral pigments, dramatic atmosphere, strictly zero text or characters.
  ```

---

### 135. `CG-QST-135`：归仁铺毒雾阵中 · 一枪刺穿星宿派大师兄摘星子咽喉

- **关联文件**：[`src/data/quests/sects/jinjunYongzhouNanmanQuest.ts`](../src/data/quests/sects/jinjunYongzhouNanmanQuest.ts)
- **目标路径**：`public/assets/quests/jinjun_yn_zhaixingzi_duel.jpg`
- **画框题跋**：`归仁铺毒雾阵中 · 一枪刺穿星宿派大师兄摘星子咽喉`
- **主角参考图**：`public/assets/characters/protagonists/hero_03_spearman_fb.jpg`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color epic historical wuxia illustration, wide cinematic 16:9 composition around 1050 AD. Depicting scene "归仁铺毒雾阵中 · 一枪刺穿星宿派大师兄摘星子咽喉" from 《邕州道 · 蛮烟瘴雨平》. Central protagonist is the young Song Imperial Guard general (matching hero_03_spearman_fb.jpg: sharp-featured young man with high black ponytail tied with a fluttering crimson ribbon, wearing silver tiger-emblem scale chest armor and lion pauldrons over a crimson martial robe and flowing red cape, wielding his long red-tasseled steel spear or Tianbo golden armor-piercing spear). Authentic Northern Song military armor, architecture, and mineral pigments, dramatic atmosphere, strictly zero text or characters.
  ```

---

### 136. `CG-QST-136`：归仁铺大捷 · 狄青主力掩杀破敌，侬智高焚城夜遁

- **关联文件**：[`src/data/quests/sects/jinjunYongzhouNanmanQuest.ts`](../src/data/quests/sects/jinjunYongzhouNanmanQuest.ts)
- **目标路径**：`public/assets/quests/jinjun_yn_guirenpu_rout.jpg`
- **画框题跋**：`归仁铺大捷 · 狄青主力掩杀破敌，侬智高焚城夜遁`
- **主角参考图**：`public/assets/characters/protagonists/hero_03_spearman_fb.jpg`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color epic historical wuxia illustration, wide cinematic 16:9 composition around 1050 AD. Depicting scene "归仁铺大捷 · 狄青主力掩杀破敌，侬智高焚城夜遁" from 《邕州道 · 蛮烟瘴雨平》. Central protagonist is the young Song Imperial Guard general (matching hero_03_spearman_fb.jpg: sharp-featured young man with high black ponytail tied with a fluttering crimson ribbon, wearing silver tiger-emblem scale chest armor and lion pauldrons over a crimson martial robe and flowing red cape, wielding his long red-tasseled steel spear or Tianbo golden armor-piercing spear). Authentic Northern Song military armor, architecture, and mineral pigments, dramatic atmosphere, strictly zero text or characters.
  ```

---

### 137. `CG-QST-137`：桂林漓江庆功夜 · 杨文广解下天波透甲金枪托付英雄

- **关联文件**：[`src/data/quests/sects/jinjunYongzhouNanmanQuest.ts`](../src/data/quests/sects/jinjunYongzhouNanmanQuest.ts)
- **目标路径**：`public/assets/quests/jinjun_yn_lijiang_spear.jpg`
- **画框题跋**：`桂林漓江庆功夜 · 杨文广解下天波透甲金枪托付英雄`
- **主角参考图**：`public/assets/characters/protagonists/hero_03_spearman_fb.jpg`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color epic historical wuxia illustration, wide cinematic 16:9 composition around 1050 AD. Depicting scene "桂林漓江庆功夜 · 杨文广解下天波透甲金枪托付英雄" from 《邕州道 · 蛮烟瘴雨平》. Central protagonist is the young Song Imperial Guard general (matching hero_03_spearman_fb.jpg: sharp-featured young man with high black ponytail tied with a fluttering crimson ribbon, wearing silver tiger-emblem scale chest armor and lion pauldrons over a crimson martial robe and flowing red cape, wielding his long red-tasseled steel spear or Tianbo golden armor-piercing spear). Authentic Northern Song military armor, architecture, and mineral pigments, dramatic atmosphere, strictly zero text or characters.
  ```

---

### 138. `CG-QST-138`：宣德门受俘大典 · 宋仁宗亲授殿前都指挥使虎符

- **关联文件**：[`src/data/quests/sects/jinjunYongzhouNanmanQuest.ts`](../src/data/quests/sects/jinjunYongzhouNanmanQuest.ts)
- **目标路径**：`public/assets/quests/jinjun_yn_xuande_rank5.jpg`
- **画框题跋**：`宣德门受俘大典 · 宋仁宗亲授殿前都指挥使虎符`
- **主角参考图**：`public/assets/characters/protagonists/hero_03_spearman_fb.jpg`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color epic historical wuxia illustration, wide cinematic 16:9 composition around 1050 AD. Depicting scene "宣德门受俘大典 · 宋仁宗亲授殿前都指挥使虎符" from 《邕州道 · 蛮烟瘴雨平》. Central protagonist is the young Song Imperial Guard general (matching hero_03_spearman_fb.jpg: sharp-featured young man with high black ponytail tied with a fluttering crimson ribbon, wearing silver tiger-emblem scale chest armor and lion pauldrons over a crimson martial robe and flowing red cape, wielding his long red-tasseled steel spear or Tianbo golden armor-piercing spear). Authentic Northern Song military armor, architecture, and mineral pigments, dramatic atmosphere, strictly zero text or characters.
  ```

---

### 139. `CG-QST-139`：大教场点兵 · 殿前都指挥使亲率两百玄甲缇骑星夜南下

- **关联文件**：[`src/data/quests/sects/jinjunFinal1Quest.ts`](../src/data/quests/sects/jinjunFinal1Quest.ts)
- **目标路径**：`public/assets/quests/jinjun_fn1_cavalry_dispatch.jpg`
- **画框题跋**：`大教场点兵 · 殿前都指挥使亲率两百玄甲缇骑星夜南下`
- **主角参考图**：`public/assets/characters/protagonists/hero_03_spearman_fb.jpg`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color epic historical wuxia illustration, wide cinematic 16:9 composition around 1050 AD. Depicting scene "大教场点兵 · 殿前都指挥使亲率两百玄甲缇骑星夜南下" from 《裂夏 · 壹 · 杏林悲风》. Central protagonist is the young Song Imperial Guard general (matching hero_03_spearman_fb.jpg: sharp-featured young man with high black ponytail tied with a fluttering crimson ribbon, wearing silver tiger-emblem scale chest armor and lion pauldrons over a crimson martial robe and flowing red cape, wielding his long red-tasseled steel spear or Tianbo golden armor-piercing spear). Authentic Northern Song military armor, architecture, and mineral pigments, dramatic atmosphere, strictly zero text or characters.
  ```

---

### 140. `CG-QST-140`：杏子林毒雾弥漫 · 丐帮群豪瘫软，乔峰孤身血战双凶

- **关联文件**：[`src/data/quests/sects/jinjunFinal1Quest.ts`](../src/data/quests/sects/jinjunFinal1Quest.ts)
- **目标路径**：`public/assets/quests/jinjun_fn1_beisu_mist.jpg`
- **画框题跋**：`杏子林毒雾弥漫 · 丐帮群豪瘫软，乔峰孤身血战双凶`
- **主角参考图**：`public/assets/characters/protagonists/hero_03_spearman_fb.jpg`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color epic historical wuxia illustration, wide cinematic 16:9 composition around 1050 AD. Depicting scene "杏子林毒雾弥漫 · 丐帮群豪瘫软，乔峰孤身血战双凶" from 《裂夏 · 壹 · 杏林悲风》. Central protagonist is the young Song Imperial Guard general (matching hero_03_spearman_fb.jpg: sharp-featured young man with high black ponytail tied with a fluttering crimson ribbon, wearing silver tiger-emblem scale chest armor and lion pauldrons over a crimson martial robe and flowing red cape, wielding his long red-tasseled steel spear or Tianbo golden armor-piercing spear). Authentic Northern Song military armor, architecture, and mineral pigments, dramatic atmosphere, strictly zero text or characters.
  ```

---

### 141. `CG-QST-141`：玄甲破林 · 殿前司缇骑铁盾挡毒箭，主角飞身落马援乔峰

- **关联文件**：[`src/data/quests/sects/jinjunFinal1Quest.ts`](../src/data/quests/sects/jinjunFinal1Quest.ts)
- **目标路径**：`public/assets/quests/jinjun_fn1_shield_break.jpg`
- **画框题跋**：`玄甲破林 · 殿前司缇骑铁盾挡毒箭，主角飞身落马援乔峰`
- **主角参考图**：`public/assets/characters/protagonists/hero_03_spearman_fb.jpg`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color epic historical wuxia illustration, wide cinematic 16:9 composition around 1050 AD. Depicting scene "玄甲破林 · 殿前司缇骑铁盾挡毒箭，主角飞身落马援乔峰" from 《裂夏 · 壹 · 杏林悲风》. Central protagonist is the young Song Imperial Guard general (matching hero_03_spearman_fb.jpg: sharp-featured young man with high black ponytail tied with a fluttering crimson ribbon, wearing silver tiger-emblem scale chest armor and lion pauldrons over a crimson martial robe and flowing red cape, wielding his long red-tasseled steel spear or Tianbo golden armor-piercing spear). Authentic Northern Song military armor, architecture, and mineral pigments, dramatic atmosphere, strictly zero text or characters.
  ```

---

### 142. `CG-QST-142`：杏子林巅峰联手 · 降龙十八掌与天波透甲金枪背靠背死战

- **关联文件**：[`src/data/quests/sects/jinjunFinal1Quest.ts`](../src/data/quests/sects/jinjunFinal1Quest.ts)
- **目标路径**：`public/assets/quests/jinjun_fn1_qiaofeng_duo.jpg`
- **画框题跋**：`杏子林巅峰联手 · 降龙十八掌与天波透甲金枪背靠背死战`
- **主角参考图**：`public/assets/characters/protagonists/hero_03_spearman_fb.jpg`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color epic historical wuxia illustration, wide cinematic 16:9 composition around 1050 AD. Depicting scene "杏子林巅峰联手 · 降龙十八掌与天波透甲金枪背靠背死战" from 《裂夏 · 壹 · 杏林悲风》. Central protagonist is the young Song Imperial Guard general (matching hero_03_spearman_fb.jpg: sharp-featured young man with high black ponytail tied with a fluttering crimson ribbon, wearing silver tiger-emblem scale chest armor and lion pauldrons over a crimson martial robe and flowing red cape, wielding his long red-tasseled steel spear or Tianbo golden armor-piercing spear). Authentic Northern Song military armor, architecture, and mineral pigments, dramatic atmosphere, strictly zero text or characters.
  ```

---

### 143. `CG-QST-143`：亢龙有悔 · 乔峰降龙掌劲震断段延庆一阳指铁杖

- **关联文件**：[`src/data/quests/sects/jinjunFinal1Quest.ts`](../src/data/quests/sects/jinjunFinal1Quest.ts)
- **目标路径**：`public/assets/quests/jinjun_fn1_duan_yanqing.jpg`
- **画框题跋**：`亢龙有悔 · 乔峰降龙掌劲震断段延庆一阳指铁杖`
- **主角参考图**：`public/assets/characters/protagonists/hero_03_spearman_fb.jpg`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color epic historical wuxia illustration, wide cinematic 16:9 composition around 1050 AD. Depicting scene "亢龙有悔 · 乔峰降龙掌劲震断段延庆一阳指铁杖" from 《裂夏 · 壹 · 杏林悲风》. Central protagonist is the young Song Imperial Guard general (matching hero_03_spearman_fb.jpg: sharp-featured young man with high black ponytail tied with a fluttering crimson ribbon, wearing silver tiger-emblem scale chest armor and lion pauldrons over a crimson martial robe and flowing red cape, wielding his long red-tasseled steel spear or Tianbo golden armor-piercing spear). Authentic Northern Song military armor, architecture, and mineral pigments, dramatic atmosphere, strictly zero text or characters.
  ```

---

### 144. `CG-QST-144`：枪破心魔 · 天波透甲金枪横扫重创慕容复右肩经脉

- **关联文件**：[`src/data/quests/sects/jinjunFinal1Quest.ts`](../src/data/quests/sects/jinjunFinal1Quest.ts)
- **目标路径**：`public/assets/quests/jinjun_fn1_murongfu_cripple.jpg`
- **画框题跋**：`枪破心魔 · 天波透甲金枪横扫重创慕容复右肩经脉`
- **主角参考图**：`public/assets/characters/protagonists/hero_03_spearman_fb.jpg`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color epic historical wuxia illustration, wide cinematic 16:9 composition around 1050 AD. Depicting scene "枪破心魔 · 天波透甲金枪横扫重创慕容复右肩经脉" from 《裂夏 · 壹 · 杏林悲风》. Central protagonist is the young Song Imperial Guard general (matching hero_03_spearman_fb.jpg: sharp-featured young man with high black ponytail tied with a fluttering crimson ribbon, wearing silver tiger-emblem scale chest armor and lion pauldrons over a crimson martial robe and flowing red cape, wielding his long red-tasseled steel spear or Tianbo golden armor-piercing spear). Authentic Northern Song military armor, architecture, and mineral pigments, dramatic atmosphere, strictly zero text or characters.
  ```

---

### 145. `CG-QST-145`：松鹤楼夜饮 · 主角与乔峰痛饮三坛烈酒结为生死知己

- **关联文件**：[`src/data/quests/sects/jinjunFinal1Quest.ts`](../src/data/quests/sects/jinjunFinal1Quest.ts)
- **目标路径**：`public/assets/quests/jinjun_fn1_songhelou_drink.jpg`
- **画框题跋**：`松鹤楼夜饮 · 主角与乔峰痛饮三坛烈酒结为生死知己`
- **主角参考图**：`public/assets/characters/protagonists/hero_03_spearman_fb.jpg`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color epic historical wuxia illustration, wide cinematic 16:9 composition around 1050 AD. Depicting scene "松鹤楼夜饮 · 主角与乔峰痛饮三坛烈酒结为生死知己" from 《裂夏 · 壹 · 杏林悲风》. Central protagonist is the young Song Imperial Guard general (matching hero_03_spearman_fb.jpg: sharp-featured young man with high black ponytail tied with a fluttering crimson ribbon, wearing silver tiger-emblem scale chest armor and lion pauldrons over a crimson martial robe and flowing red cape, wielding his long red-tasseled steel spear or Tianbo golden armor-piercing spear). Authentic Northern Song military armor, architecture, and mineral pigments, dramatic atmosphere, strictly zero text or characters.
  ```

---

### 146. `CG-QST-146`：密室审俘 · 惊悉西夏十万铁鹞子叩关泾原与慕容博北引大辽

- **关联文件**：[`src/data/quests/sects/jinjunFinal1Quest.ts`](../src/data/quests/sects/jinjunFinal1Quest.ts)
- **目标路径**：`public/assets/quests/jinjun_fn1_prisoner_confess.jpg`
- **画框题跋**：`密室审俘 · 惊悉西夏十万铁鹞子叩关泾原与慕容博北引大辽`
- **主角参考图**：`public/assets/characters/protagonists/hero_03_spearman_fb.jpg`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color epic historical wuxia illustration, wide cinematic 16:9 composition around 1050 AD. Depicting scene "密室审俘 · 惊悉西夏十万铁鹞子叩关泾原与慕容博北引大辽" from 《裂夏 · 壹 · 杏林悲风》. Central protagonist is the young Song Imperial Guard general (matching hero_03_spearman_fb.jpg: sharp-featured young man with high black ponytail tied with a fluttering crimson ribbon, wearing silver tiger-emblem scale chest armor and lion pauldrons over a crimson martial robe and flowing red cape, wielding his long red-tasseled steel spear or Tianbo golden armor-piercing spear). Authentic Northern Song military armor, architecture, and mineral pigments, dramatic atmosphere, strictly zero text or characters.
  ```

---

### 147. `CG-QST-147`：紫宸殿早朝 · 宋仁宗亲赐尚方宝剑，拜泾原路行营都总管

- **关联文件**：[`src/data/quests/sects/jinjunFinal2Quest.ts`](../src/data/quests/sects/jinjunFinal2Quest.ts)
- **目标路径**：`public/assets/quests/jinjun_fn2_shangfang_sword.jpg`
- **画框题跋**：`紫宸殿早朝 · 宋仁宗亲赐尚方宝剑，拜泾原路行营都总管`
- **主角参考图**：`public/assets/characters/protagonists/hero_03_spearman_fb.jpg`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color epic historical wuxia illustration, wide cinematic 16:9 composition around 1050 AD. Depicting scene "紫宸殿早朝 · 宋仁宗亲赐尚方宝剑，拜泾原路行营都总管" from 《裂夏 · 贰 · 横山铁鹞》. Central protagonist is the young Song Imperial Guard general (matching hero_03_spearman_fb.jpg: sharp-featured young man with high black ponytail tied with a fluttering crimson ribbon, wearing silver tiger-emblem scale chest armor and lion pauldrons over a crimson martial robe and flowing red cape, wielding his long red-tasseled steel spear or Tianbo golden armor-piercing spear). Authentic Northern Song military armor, architecture, and mineral pigments, dramatic atmosphere, strictly zero text or characters.
  ```

---

### 148. `CG-QST-148`：两万殿前司百战禁军浩荡西出潼关，旌旗蔽空

- **关联文件**：[`src/data/quests/sects/jinjunFinal2Quest.ts`](../src/data/quests/sects/jinjunFinal2Quest.ts)
- **目标路径**：`public/assets/quests/jinjun_fn2_tongguan_march.jpg`
- **画框题跋**：`两万殿前司百战禁军浩荡西出潼关，旌旗蔽空`
- **主角参考图**：`public/assets/characters/protagonists/hero_03_spearman_fb.jpg`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color epic historical wuxia illustration, wide cinematic 16:9 composition around 1050 AD. Depicting scene "两万殿前司百战禁军浩荡西出潼关，旌旗蔽空" from 《裂夏 · 贰 · 横山铁鹞》. Central protagonist is the young Song Imperial Guard general (matching hero_03_spearman_fb.jpg: sharp-featured young man with high black ponytail tied with a fluttering crimson ribbon, wearing silver tiger-emblem scale chest armor and lion pauldrons over a crimson martial robe and flowing red cape, wielding his long red-tasseled steel spear or Tianbo golden armor-piercing spear). Authentic Northern Song military armor, architecture, and mineral pigments, dramatic atmosphere, strictly zero text or characters.
  ```

---

### 149. `CG-QST-149`：鄜延帅帐夜灯 · 主角与铁血老帅种世衡沙盘推演破铁鹞之策

- **关联文件**：[`src/data/quests/sects/jinjunFinal2Quest.ts`](../src/data/quests/sects/jinjunFinal2Quest.ts)
- **目标路径**：`public/assets/quests/jinjun_fn2_zhong_sandtable.jpg`
- **画框题跋**：`鄜延帅帐夜灯 · 主角与铁血老帅种世衡沙盘推演破铁鹞之策`
- **主角参考图**：`public/assets/characters/protagonists/hero_03_spearman_fb.jpg`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color epic historical wuxia illustration, wide cinematic 16:9 composition around 1050 AD. Depicting scene "鄜延帅帐夜灯 · 主角与铁血老帅种世衡沙盘推演破铁鹞之策" from 《裂夏 · 贰 · 横山铁鹞》. Central protagonist is the young Song Imperial Guard general (matching hero_03_spearman_fb.jpg: sharp-featured young man with high black ponytail tied with a fluttering crimson ribbon, wearing silver tiger-emblem scale chest armor and lion pauldrons over a crimson martial robe and flowing red cape, wielding his long red-tasseled steel spear or Tianbo golden armor-piercing spear). Authentic Northern Song military armor, architecture, and mineral pigments, dramatic atmosphere, strictly zero text or characters.
  ```

---

### 150. `CG-QST-150`：横山戈壁 · 西夏三千铁鹞子连环重骑如钢铁山岳正面碾压

- **关联文件**：[`src/data/quests/sects/jinjunFinal2Quest.ts`](../src/data/quests/sects/jinjunFinal2Quest.ts)
- **目标路径**：`public/assets/quests/jinjun_fn2_tieyaozi_charge.jpg`
- **画框题跋**：`横山戈壁 · 西夏三千铁鹞子连环重骑如钢铁山岳正面碾压`
- **主角参考图**：`public/assets/characters/protagonists/hero_03_spearman_fb.jpg`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color epic historical wuxia illustration, wide cinematic 16:9 composition around 1050 AD. Depicting scene "横山戈壁 · 西夏三千铁鹞子连环重骑如钢铁山岳正面碾压" from 《裂夏 · 贰 · 横山铁鹞》. Central protagonist is the young Song Imperial Guard general (matching hero_03_spearman_fb.jpg: sharp-featured young man with high black ponytail tied with a fluttering crimson ribbon, wearing silver tiger-emblem scale chest armor and lion pauldrons over a crimson martial robe and flowing red cape, wielding his long red-tasseled steel spear or Tianbo golden armor-piercing spear). Authentic Northern Song military armor, architecture, and mineral pigments, dramatic atmosphere, strictly zero text or characters.
  ```

---

### 151. `CG-QST-151`：偏厢鹿角车城 · 种世衡亲镇车阵中枢硬锁铁鹞子狂暴冲锋

- **关联文件**：[`src/data/quests/sects/jinjunFinal2Quest.ts`](../src/data/quests/sects/jinjunFinal2Quest.ts)
- **目标路径**：`public/assets/quests/jinjun_fn2_chariot_wall.jpg`
- **画框题跋**：`偏厢鹿角车城 · 种世衡亲镇车阵中枢硬锁铁鹞子狂暴冲锋`
- **主角参考图**：`public/assets/characters/protagonists/hero_03_spearman_fb.jpg`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color epic historical wuxia illustration, wide cinematic 16:9 composition around 1050 AD. Depicting scene "偏厢鹿角车城 · 种世衡亲镇车阵中枢硬锁铁鹞子狂暴冲锋" from 《裂夏 · 贰 · 横山铁鹞》. Central protagonist is the young Song Imperial Guard general (matching hero_03_spearman_fb.jpg: sharp-featured young man with high black ponytail tied with a fluttering crimson ribbon, wearing silver tiger-emblem scale chest armor and lion pauldrons over a crimson martial robe and flowing red cape, wielding his long red-tasseled steel spear or Tianbo golden armor-piercing spear). Authentic Northern Song military armor, architecture, and mineral pigments, dramatic atmosphere, strictly zero text or characters.
  ```

---

### 152. `CG-QST-152`：神臂三段轮射 · 三千神臂弓万矢齐发洞穿铁鹞子重甲

- **关联文件**：[`src/data/quests/sects/jinjunFinal2Quest.ts`](../src/data/quests/sects/jinjunFinal2Quest.ts)
- **目标路径**：`public/assets/quests/jinjun_fn2_shenbi_volley.jpg`
- **画框题跋**：`神臂三段轮射 · 三千神臂弓万矢齐发洞穿铁鹞子重甲`
- **主角参考图**：`public/assets/characters/protagonists/hero_03_spearman_fb.jpg`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color epic historical wuxia illustration, wide cinematic 16:9 composition around 1050 AD. Depicting scene "神臂三段轮射 · 三千神臂弓万矢齐发洞穿铁鹞子重甲" from 《裂夏 · 贰 · 横山铁鹞》. Central protagonist is the young Song Imperial Guard general (matching hero_03_spearman_fb.jpg: sharp-featured young man with high black ponytail tied with a fluttering crimson ribbon, wearing silver tiger-emblem scale chest armor and lion pauldrons over a crimson martial robe and flowing red cape, wielding his long red-tasseled steel spear or Tianbo golden armor-piercing spear). Authentic Northern Song military armor, architecture, and mineral pigments, dramatic atmosphere, strictly zero text or characters.
  ```

---

### 153. `CG-QST-153`：忠烈千秋 · 种世衡护翼变阵遭冷箭与白虹掌力震碎心脉，扶旗屹立不倒

- **关联文件**：[`src/data/quests/sects/jinjunFinal2Quest.ts`](../src/data/quests/sects/jinjunFinal2Quest.ts)
- **目标路径**：`public/assets/quests/jinjun_fn2_zhong_martyr.jpg`
- **画框题跋**：`忠烈千秋 · 种世衡护翼变阵遭冷箭与白虹掌力震碎心脉，扶旗屹立不倒`
- **主角参考图**：`public/assets/characters/protagonists/hero_03_spearman_fb.jpg`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color epic historical wuxia illustration, wide cinematic 16:9 composition around 1050 AD. Depicting scene "忠烈千秋 · 种世衡护翼变阵遭冷箭与白虹掌力震碎心脉，扶旗屹立不倒" from 《裂夏 · 贰 · 横山铁鹞》. Central protagonist is the young Song Imperial Guard general (matching hero_03_spearman_fb.jpg: sharp-featured young man with high black ponytail tied with a fluttering crimson ribbon, wearing silver tiger-emblem scale chest armor and lion pauldrons over a crimson martial robe and flowing red cape, wielding his long red-tasseled steel spear or Tianbo golden armor-piercing spear). Authentic Northern Song military armor, architecture, and mineral pigments, dramatic atmosphere, strictly zero text or characters.
  ```

---

### 154. `CG-QST-154`：横山绝战 · 天波透甲金枪与李秋水白虹掌力轰然对撞

- **关联文件**：[`src/data/quests/sects/jinjunFinal2Quest.ts`](../src/data/quests/sects/jinjunFinal2Quest.ts)
- **目标路径**：`public/assets/quests/jinjun_fn2_liqiushui_clash.jpg`
- **画框题跋**：`横山绝战 · 天波透甲金枪与李秋水白虹掌力轰然对撞`
- **主角参考图**：`public/assets/characters/protagonists/hero_03_spearman_fb.jpg`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color epic historical wuxia illustration, wide cinematic 16:9 composition around 1050 AD. Depicting scene "横山绝战 · 天波透甲金枪与李秋水白虹掌力轰然对撞" from 《裂夏 · 贰 · 横山铁鹞》. Central protagonist is the young Song Imperial Guard general (matching hero_03_spearman_fb.jpg: sharp-featured young man with high black ponytail tied with a fluttering crimson ribbon, wearing silver tiger-emblem scale chest armor and lion pauldrons over a crimson martial robe and flowing red cape, wielding his long red-tasseled steel spear or Tianbo golden armor-piercing spear). Authentic Northern Song military armor, architecture, and mineral pigments, dramatic atmosphere, strictly zero text or characters.
  ```

---

### 155. `CG-QST-155`：太玄破气 · 霸道真气震碎护体气墙，一枪刺伤李秋水肩头

- **关联文件**：[`src/data/quests/sects/jinjunFinal2Quest.ts`](../src/data/quests/sects/jinjunFinal2Quest.ts)
- **目标路径**：`public/assets/quests/jinjun_fn2_taixuan_break.jpg`
- **画框题跋**：`太玄破气 · 霸道真气震碎护体气墙，一枪刺伤李秋水肩头`
- **主角参考图**：`public/assets/characters/protagonists/hero_03_spearman_fb.jpg`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color epic historical wuxia illustration, wide cinematic 16:9 composition around 1050 AD. Depicting scene "太玄破气 · 霸道真气震碎护体气墙，一枪刺伤李秋水肩头" from 《裂夏 · 贰 · 横山铁鹞》. Central protagonist is the young Song Imperial Guard general (matching hero_03_spearman_fb.jpg: sharp-featured young man with high black ponytail tied with a fluttering crimson ribbon, wearing silver tiger-emblem scale chest armor and lion pauldrons over a crimson martial robe and flowing red cape, wielding his long red-tasseled steel spear or Tianbo golden armor-piercing spear). Authentic Northern Song military armor, architecture, and mineral pigments, dramatic atmosphere, strictly zero text or characters.
  ```

---

### 156. `CG-QST-156`：重骑扫荡 · 五千禁军重骑直捣夏军王帐生劈亲卫大将

- **关联文件**：[`src/data/quests/sects/jinjunFinal2Quest.ts`](../src/data/quests/sects/jinjunFinal2Quest.ts)
- **目标路径**：`public/assets/quests/jinjun_fn2_cavalry_flank.jpg`
- **画框题跋**：`重骑扫荡 · 五千禁军重骑直捣夏军王帐生劈亲卫大将`
- **主角参考图**：`public/assets/characters/protagonists/hero_03_spearman_fb.jpg`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color epic historical wuxia illustration, wide cinematic 16:9 composition around 1050 AD. Depicting scene "重骑扫荡 · 五千禁军重骑直捣夏军王帐生劈亲卫大将" from 《裂夏 · 贰 · 横山铁鹞》. Central protagonist is the young Song Imperial Guard general (matching hero_03_spearman_fb.jpg: sharp-featured young man with high black ponytail tied with a fluttering crimson ribbon, wearing silver tiger-emblem scale chest armor and lion pauldrons over a crimson martial robe and flowing red cape, wielding his long red-tasseled steel spear or Tianbo golden armor-piercing spear). Authentic Northern Song military armor, architecture, and mineral pigments, dramatic atmosphere, strictly zero text or characters.
  ```

---

### 157. `CG-QST-157`：老帅遗托 · 种世衡临终将皇祐神臂御赐弩交予主角

- **关联文件**：[`src/data/quests/sects/jinjunFinal2Quest.ts`](../src/data/quests/sects/jinjunFinal2Quest.ts)
- **目标路径**：`public/assets/quests/jinjun_fn2_zhong_bequest.jpg`
- **画框题跋**：`老帅遗托 · 种世衡临终将皇祐神臂御赐弩交予主角`
- **主角参考图**：`public/assets/characters/protagonists/hero_03_spearman_fb.jpg`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color epic historical wuxia illustration, wide cinematic 16:9 composition around 1050 AD. Depicting scene "老帅遗托 · 种世衡临终将皇祐神臂御赐弩交予主角" from 《裂夏 · 贰 · 横山铁鹞》. Central protagonist is the young Song Imperial Guard general (matching hero_03_spearman_fb.jpg: sharp-featured young man with high black ponytail tied with a fluttering crimson ribbon, wearing silver tiger-emblem scale chest armor and lion pauldrons over a crimson martial robe and flowing red cape, wielding his long red-tasseled steel spear or Tianbo golden armor-piercing spear). Authentic Northern Song military armor, architecture, and mineral pigments, dramatic atmosphere, strictly zero text or characters.
  ```

---

### 158. `CG-QST-158`：收复横山天险 · 宋军大旗插遍横山绝壁，打断西夏南侵脊梁

- **关联文件**：[`src/data/quests/sects/jinjunFinal2Quest.ts`](../src/data/quests/sects/jinjunFinal2Quest.ts)
- **目标路径**：`public/assets/quests/jinjun_fn2_hengshan_victory.jpg`
- **画框题跋**：`收复横山天险 · 宋军大旗插遍横山绝壁，打断西夏南侵脊梁`
- **主角参考图**：`public/assets/characters/protagonists/hero_03_spearman_fb.jpg`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color epic historical wuxia illustration, wide cinematic 16:9 composition around 1050 AD. Depicting scene "收复横山天险 · 宋军大旗插遍横山绝壁，打断西夏南侵脊梁" from 《裂夏 · 贰 · 横山铁鹞》. Central protagonist is the young Song Imperial Guard general (matching hero_03_spearman_fb.jpg: sharp-featured young man with high black ponytail tied with a fluttering crimson ribbon, wearing silver tiger-emblem scale chest armor and lion pauldrons over a crimson martial robe and flowing red cape, wielding his long red-tasseled steel spear or Tianbo golden armor-piercing spear). Authentic Northern Song military armor, architecture, and mineral pigments, dramatic atmosphere, strictly zero text or characters.
  ```

---

### 159. `CG-QST-159`：雪夜黑羽檄文 · 八百里急报慕容博萧远风引十万辽军压境雁门

- **关联文件**：[`src/data/quests/sects/jinjunFinal3Quest.ts`](../src/data/quests/sects/jinjunFinal3Quest.ts)
- **目标路径**：`public/assets/quests/jinjun_fn3_black_feather.jpg`
- **画框题跋**：`雪夜黑羽檄文 · 八百里急报慕容博萧远风引十万辽军压境雁门`
- **主角参考图**：`public/assets/characters/protagonists/hero_03_spearman_fb.jpg`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color epic historical wuxia illustration, wide cinematic 16:9 composition around 1050 AD. Depicting scene "雪夜黑羽檄文 · 八百里急报慕容博萧远风引十万辽军压境雁门" from 《定鼎 · 叁 · 血月雁门》. Central protagonist is the young Song Imperial Guard general (matching hero_03_spearman_fb.jpg: sharp-featured young man with high black ponytail tied with a fluttering crimson ribbon, wearing silver tiger-emblem scale chest armor and lion pauldrons over a crimson martial robe and flowing red cape, wielding his long red-tasseled steel spear or Tianbo golden armor-piercing spear). Authentic Northern Song military armor, architecture, and mineral pigments, dramatic atmosphere, strictly zero text or characters.
  ```

---

### 160. `CG-QST-160`：紫宸殿朝野震恐 · 包拯王德用韩琦执笏死谏固守雁门

- **关联文件**：[`src/data/quests/sects/jinjunFinal3Quest.ts`](../src/data/quests/sects/jinjunFinal3Quest.ts)
- **目标路径**：`public/assets/quests/jinjun_fn3_court_panic.jpg`
- **画框题跋**：`紫宸殿朝野震恐 · 包拯王德用韩琦执笏死谏固守雁门`
- **主角参考图**：`public/assets/characters/protagonists/hero_03_spearman_fb.jpg`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color epic historical wuxia illustration, wide cinematic 16:9 composition around 1050 AD. Depicting scene "紫宸殿朝野震恐 · 包拯王德用韩琦执笏死谏固守雁门" from 《定鼎 · 叁 · 血月雁门》. Central protagonist is the young Song Imperial Guard general (matching hero_03_spearman_fb.jpg: sharp-featured young man with high black ponytail tied with a fluttering crimson ribbon, wearing silver tiger-emblem scale chest armor and lion pauldrons over a crimson martial robe and flowing red cape, wielding his long red-tasseled steel spear or Tianbo golden armor-piercing spear). Authentic Northern Song military armor, architecture, and mineral pigments, dramatic atmosphere, strictly zero text or characters.
  ```

---

### 161. `CG-QST-161`：血月雁门 · 身世大白的萧峰孤立两军阵前苦劝辽军止戈

- **关联文件**：[`src/data/quests/sects/jinjunFinal3Quest.ts`](../src/data/quests/sects/jinjunFinal3Quest.ts)
- **目标路径**：`public/assets/quests/jinjun_fn3_xiaofeng_lonely.jpg`
- **画框题跋**：`血月雁门 · 身世大白的萧峰孤立两军阵前苦劝辽军止戈`
- **主角参考图**：`public/assets/characters/protagonists/hero_03_spearman_fb.jpg`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color epic historical wuxia illustration, wide cinematic 16:9 composition around 1050 AD. Depicting scene "血月雁门 · 身世大白的萧峰孤立两军阵前苦劝辽军止戈" from 《定鼎 · 叁 · 血月雁门》. Central protagonist is the young Song Imperial Guard general (matching hero_03_spearman_fb.jpg: sharp-featured young man with high black ponytail tied with a fluttering crimson ribbon, wearing silver tiger-emblem scale chest armor and lion pauldrons over a crimson martial robe and flowing red cape, wielding his long red-tasseled steel spear or Tianbo golden armor-piercing spear). Authentic Northern Song military armor, architecture, and mineral pigments, dramatic atmosphere, strictly zero text or characters.
  ```

---

### 162. `CG-QST-162`：暗箭伏杀 · 慕容博与萧远风率契丹重骑设下十面埋伏欲毙萧峰

- **关联文件**：[`src/data/quests/sects/jinjunFinal3Quest.ts`](../src/data/quests/sects/jinjunFinal3Quest.ts)
- **目标路径**：`public/assets/quests/jinjun_fn3_ambush_trap.jpg`
- **画框题跋**：`暗箭伏杀 · 慕容博与萧远风率契丹重骑设下十面埋伏欲毙萧峰`
- **主角参考图**：`public/assets/characters/protagonists/hero_03_spearman_fb.jpg`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color epic historical wuxia illustration, wide cinematic 16:9 composition around 1050 AD. Depicting scene "暗箭伏杀 · 慕容博与萧远风率契丹重骑设下十面埋伏欲毙萧峰" from 《定鼎 · 叁 · 血月雁门》. Central protagonist is the young Song Imperial Guard general (matching hero_03_spearman_fb.jpg: sharp-featured young man with high black ponytail tied with a fluttering crimson ribbon, wearing silver tiger-emblem scale chest armor and lion pauldrons over a crimson martial robe and flowing red cape, wielding his long red-tasseled steel spear or Tianbo golden armor-piercing spear). Authentic Northern Song military armor, architecture, and mineral pigments, dramatic atmosphere, strictly zero text or characters.
  ```

---

### 163. `CG-QST-163`：雄关洞开 · 万支火炬撕裂风雪，主角一马当先杀出雁门

- **关联文件**：[`src/data/quests/sects/jinjunFinal3Quest.ts`](../src/data/quests/sects/jinjunFinal3Quest.ts)
- **目标路径**：`public/assets/quests/jinjun_fn3_gate_open.jpg`
- **画框题跋**：`雄关洞开 · 万支火炬撕裂风雪，主角一马当先杀出雁门`
- **主角参考图**：`public/assets/characters/protagonists/hero_03_spearman_fb.jpg`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color epic historical wuxia illustration, wide cinematic 16:9 composition around 1050 AD. Depicting scene "雄关洞开 · 万支火炬撕裂风雪，主角一马当先杀出雁门" from 《定鼎 · 叁 · 血月雁门》. Central protagonist is the young Song Imperial Guard general (matching hero_03_spearman_fb.jpg: sharp-featured young man with high black ponytail tied with a fluttering crimson ribbon, wearing silver tiger-emblem scale chest armor and lion pauldrons over a crimson martial robe and flowing red cape, wielding his long red-tasseled steel spear or Tianbo golden armor-piercing spear). Authentic Northern Song military armor, architecture, and mineral pigments, dramatic atmosphere, strictly zero text or characters.
  ```

---

### 164. `CG-QST-164`：宿敌狭路 · 辽南京武林统制萧远风挺铁枪迎面杀来

- **关联文件**：[`src/data/quests/sects/jinjunFinal3Quest.ts`](../src/data/quests/sects/jinjunFinal3Quest.ts)
- **目标路径**：`public/assets/quests/jinjun_fn3_xiaoyuanfeng_duel.jpg`
- **画框题跋**：`宿敌狭路 · 辽南京武林统制萧远风挺铁枪迎面杀来`
- **主角参考图**：`public/assets/characters/protagonists/hero_03_spearman_fb.jpg`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color epic historical wuxia illustration, wide cinematic 16:9 composition around 1050 AD. Depicting scene "宿敌狭路 · 辽南京武林统制萧远风挺铁枪迎面杀来" from 《定鼎 · 叁 · 血月雁门》. Central protagonist is the young Song Imperial Guard general (matching hero_03_spearman_fb.jpg: sharp-featured young man with high black ponytail tied with a fluttering crimson ribbon, wearing silver tiger-emblem scale chest armor and lion pauldrons over a crimson martial robe and flowing red cape, wielding his long red-tasseled steel spear or Tianbo golden armor-piercing spear). Authentic Northern Song military armor, architecture, and mineral pigments, dramatic atmosphere, strictly zero text or characters.
  ```

---

### 165. `CG-QST-165`：心魔尽斩 · 天波透甲金枪震断萧远风铁枪将其挑落马下

- **关联文件**：[`src/data/quests/sects/jinjunFinal3Quest.ts`](../src/data/quests/sects/jinjunFinal3Quest.ts)
- **目标路径**：`public/assets/quests/jinjun_fn3_xiaoyuanfeng_slain.jpg`
- **画框题跋**：`心魔尽斩 · 天波透甲金枪震断萧远风铁枪将其挑落马下`
- **主角参考图**：`public/assets/characters/protagonists/hero_03_spearman_fb.jpg`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color epic historical wuxia illustration, wide cinematic 16:9 composition around 1050 AD. Depicting scene "心魔尽斩 · 天波透甲金枪震断萧远风铁枪将其挑落马下" from 《定鼎 · 叁 · 血月雁门》. Central protagonist is the young Song Imperial Guard general (matching hero_03_spearman_fb.jpg: sharp-featured young man with high black ponytail tied with a fluttering crimson ribbon, wearing silver tiger-emblem scale chest armor and lion pauldrons over a crimson martial robe and flowing red cape, wielding his long red-tasseled steel spear or Tianbo golden armor-piercing spear). Authentic Northern Song military armor, architecture, and mineral pigments, dramatic atmosphere, strictly zero text or characters.
  ```

---

### 166. `CG-QST-166`：绝顶现身 · 慕容博踏尸山血海走出，怒喝以大宋柱石祭大燕

- **关联文件**：[`src/data/quests/sects/jinjunFinal3Quest.ts`](../src/data/quests/sects/jinjunFinal3Quest.ts)
- **目标路径**：`public/assets/quests/jinjun_fn3_murongbo_emerge.jpg`
- **画框题跋**：`绝顶现身 · 慕容博踏尸山血海走出，怒喝以大宋柱石祭大燕`
- **主角参考图**：`public/assets/characters/protagonists/hero_03_spearman_fb.jpg`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color epic historical wuxia illustration, wide cinematic 16:9 composition around 1050 AD. Depicting scene "绝顶现身 · 慕容博踏尸山血海走出，怒喝以大宋柱石祭大燕" from 《定鼎 · 叁 · 血月雁门》. Central protagonist is the young Song Imperial Guard general (matching hero_03_spearman_fb.jpg: sharp-featured young man with high black ponytail tied with a fluttering crimson ribbon, wearing silver tiger-emblem scale chest armor and lion pauldrons over a crimson martial robe and flowing red cape, wielding his long red-tasseled steel spear or Tianbo golden armor-piercing spear). Authentic Northern Song military armor, architecture, and mineral pigments, dramatic atmosphere, strictly zero text or characters.
  ```

---

### 167. `CG-QST-167`：巅峰死战 · 雁门绝壁之下主角与慕容博斗转星移对百战枪意

- **关联文件**：[`src/data/quests/sects/jinjunFinal3Quest.ts`](../src/data/quests/sects/jinjunFinal3Quest.ts)
- **目标路径**：`public/assets/quests/jinjun_fn3_wall_duel.jpg`
- **画框题跋**：`巅峰死战 · 雁门绝壁之下主角与慕容博斗转星移对百战枪意`
- **主角参考图**：`public/assets/characters/protagonists/hero_03_spearman_fb.jpg`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color epic historical wuxia illustration, wide cinematic 16:9 composition around 1050 AD. Depicting scene "巅峰死战 · 雁门绝壁之下主角与慕容博斗转星移对百战枪意" from 《定鼎 · 叁 · 血月雁门》. Central protagonist is the young Song Imperial Guard general (matching hero_03_spearman_fb.jpg: sharp-featured young man with high black ponytail tied with a fluttering crimson ribbon, wearing silver tiger-emblem scale chest armor and lion pauldrons over a crimson martial robe and flowing red cape, wielding his long red-tasseled steel spear or Tianbo golden armor-piercing spear). Authentic Northern Song military armor, architecture, and mineral pigments, dramatic atmosphere, strictly zero text or characters.
  ```

---

### 168. `CG-QST-168`：不灭战意 · 胸前重甲尽碎，主角顶着参合神指劲欺身直入

- **关联文件**：[`src/data/quests/sects/jinjunFinal3Quest.ts`](../src/data/quests/sects/jinjunFinal3Quest.ts)
- **目标路径**：`public/assets/quests/jinjun_fn3_armor_shatter.jpg`
- **画框题跋**：`不灭战意 · 胸前重甲尽碎，主角顶着参合神指劲欺身直入`
- **主角参考图**：`public/assets/characters/protagonists/hero_03_spearman_fb.jpg`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color epic historical wuxia illustration, wide cinematic 16:9 composition around 1050 AD. Depicting scene "不灭战意 · 胸前重甲尽碎，主角顶着参合神指劲欺身直入" from 《定鼎 · 叁 · 血月雁门》. Central protagonist is the young Song Imperial Guard general (matching hero_03_spearman_fb.jpg: sharp-featured young man with high black ponytail tied with a fluttering crimson ribbon, wearing silver tiger-emblem scale chest armor and lion pauldrons over a crimson martial robe and flowing red cape, wielding his long red-tasseled steel spear or Tianbo golden armor-piercing spear). Authentic Northern Song military armor, architecture, and mineral pigments, dramatic atmosphere, strictly zero text or characters.
  ```

---

### 169. `CG-QST-169`：大燕梦碎 · 天波透甲金枪正面贯穿慕容博胸膛，钉死于雁门巨石之上

- **关联文件**：[`src/data/quests/sects/jinjunFinal3Quest.ts`](../src/data/quests/sects/jinjunFinal3Quest.ts)
- **目标路径**：`public/assets/quests/jinjun_fn3_murongbo_nailed.jpg`
- **画框题跋**：`大燕梦碎 · 天波透甲金枪正面贯穿慕容博胸膛，钉死于雁门巨石之上`
- **主角参考图**：`public/assets/characters/protagonists/hero_03_spearman_fb.jpg`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color epic historical wuxia illustration, wide cinematic 16:9 composition around 1050 AD. Depicting scene "大燕梦碎 · 天波透甲金枪正面贯穿慕容博胸膛，钉死于雁门巨石之上" from 《定鼎 · 叁 · 血月雁门》. Central protagonist is the young Song Imperial Guard general (matching hero_03_spearman_fb.jpg: sharp-featured young man with high black ponytail tied with a fluttering crimson ribbon, wearing silver tiger-emblem scale chest armor and lion pauldrons over a crimson martial robe and flowing red cape, wielding his long red-tasseled steel spear or Tianbo golden armor-piercing spear). Authentic Northern Song military armor, architecture, and mineral pigments, dramatic atmosphere, strictly zero text or characters.
  ```

---

### 170. `CG-QST-170`：凛然大义 · 萧峰乱军生擒辽军先锋主帅，迫辽廷立誓退兵

- **关联文件**：[`src/data/quests/sects/jinjunFinal3Quest.ts`](../src/data/quests/sects/jinjunFinal3Quest.ts)
- **目标路径**：`public/assets/quests/jinjun_fn3_xiaofeng_capture.jpg`
- **画框题跋**：`凛然大义 · 萧峰乱军生擒辽军先锋主帅，迫辽廷立誓退兵`
- **主角参考图**：`public/assets/characters/protagonists/hero_03_spearman_fb.jpg`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color epic historical wuxia illustration, wide cinematic 16:9 composition around 1050 AD. Depicting scene "凛然大义 · 萧峰乱军生擒辽军先锋主帅，迫辽廷立誓退兵" from 《定鼎 · 叁 · 血月雁门》. Central protagonist is the young Song Imperial Guard general (matching hero_03_spearman_fb.jpg: sharp-featured young man with high black ponytail tied with a fluttering crimson ribbon, wearing silver tiger-emblem scale chest armor and lion pauldrons over a crimson martial robe and flowing red cape, wielding his long red-tasseled steel spear or Tianbo golden armor-piercing spear). Authentic Northern Song military armor, architecture, and mineral pigments, dramatic atmosphere, strictly zero text or characters.
  ```

---

### 171. `CG-QST-171`：雪夜敬别 · 萧峰向城头主角遥遥举碗，纵马隐入塞外风雪

- **关联文件**：[`src/data/quests/sects/jinjunFinal3Quest.ts`](../src/data/quests/sects/jinjunFinal3Quest.ts)
- **目标路径**：`public/assets/quests/jinjun_fn3_xiaofeng_farewell.jpg`
- **画框题跋**：`雪夜敬别 · 萧峰向城头主角遥遥举碗，纵马隐入塞外风雪`
- **主角参考图**：`public/assets/characters/protagonists/hero_03_spearman_fb.jpg`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color epic historical wuxia illustration, wide cinematic 16:9 composition around 1050 AD. Depicting scene "雪夜敬别 · 萧峰向城头主角遥遥举碗，纵马隐入塞外风雪" from 《定鼎 · 叁 · 血月雁门》. Central protagonist is the young Song Imperial Guard general (matching hero_03_spearman_fb.jpg: sharp-featured young man with high black ponytail tied with a fluttering crimson ribbon, wearing silver tiger-emblem scale chest armor and lion pauldrons over a crimson martial robe and flowing red cape, wielding his long red-tasseled steel spear or Tianbo golden armor-piercing spear). Authentic Northern Song military armor, architecture, and mineral pigments, dramatic atmosphere, strictly zero text or characters.
  ```

---

### 172. `CG-QST-172`：凯旋东京 · 十里御街红毯铺地，宋仁宗率百官出城十里郊迎

- **关联文件**：[`src/data/quests/sects/jinjunFinal3Quest.ts`](../src/data/quests/sects/jinjunFinal3Quest.ts)
- **目标路径**：`public/assets/quests/jinjun_fn3_kaifeng_welcome.jpg`
- **画框题跋**：`凯旋东京 · 十里御街红毯铺地，宋仁宗率百官出城十里郊迎`
- **主角参考图**：`public/assets/characters/protagonists/hero_03_spearman_fb.jpg`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color epic historical wuxia illustration, wide cinematic 16:9 composition around 1050 AD. Depicting scene "凯旋东京 · 十里御街红毯铺地，宋仁宗率百官出城十里郊迎" from 《定鼎 · 叁 · 血月雁门》. Central protagonist is the young Song Imperial Guard general (matching hero_03_spearman_fb.jpg: sharp-featured young man with high black ponytail tied with a fluttering crimson ribbon, wearing silver tiger-emblem scale chest armor and lion pauldrons over a crimson martial robe and flowing red cape, wielding his long red-tasseled steel spear or Tianbo golden armor-piercing spear). Authentic Northern Song military armor, architecture, and mineral pigments, dramatic atmosphere, strictly zero text or characters.
  ```

---

### 173. `CG-QST-173`：定鼎山河 · 大庆殿册封检校太尉枢密使，赐丹书铁券、绘像景灵宫

- **关联文件**：[`src/data/quests/sects/jinjunFinal3Quest.ts`](../src/data/quests/sects/jinjunFinal3Quest.ts)
- **目标路径**：`public/assets/quests/jinjun_fn3_daqing_hall.jpg`
- **画框题跋**：`定鼎山河 · 大庆殿册封检校太尉枢密使，赐丹书铁券、绘像景灵宫`
- **主角参考图**：`public/assets/characters/protagonists/hero_03_spearman_fb.jpg`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi ink-and-color epic historical wuxia illustration, wide cinematic 16:9 composition around 1050 AD. Depicting scene "定鼎山河 · 大庆殿册封检校太尉枢密使，赐丹书铁券、绘像景灵宫" from 《定鼎 · 叁 · 血月雁门》. Central protagonist is the young Song Imperial Guard general (matching hero_03_spearman_fb.jpg: sharp-featured young man with high black ponytail tied with a fluttering crimson ribbon, wearing silver tiger-emblem scale chest armor and lion pauldrons over a crimson martial robe and flowing red cape, wielding his long red-tasseled steel spear or Tianbo golden armor-piercing spear). Authentic Northern Song military armor, architecture, and mineral pigments, dramatic atmosphere, strictly zero text or characters.
  ```

---

### 174. `CG-QST-174`：玉女授命 · 高沧云与宁清羽于偏院命外门弟子持剑下山除恶

- **关联文件**：[`src/data/quests/sects/huashanYaowangTrialQuest.ts`](../src/data/quests/sects/huashanYaowangTrialQuest.ts)
- **目标路径**：`public/assets/quests/hs_q01_yaowang_depart.jpg`
- **画框题跋**：`玉女授命 · 高沧云与宁清羽于偏院命外门弟子持剑下山除恶`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD on Mount Huashan / Guanzhong. Depicting scene "玉女授命 · 高沧云与宁清羽于偏院命外门弟子持剑下山除恶" from 《药王除恶 · 十二初试》. Central figure is a Huashan Qi-lineage disciple in clean cyan-white and dawn-purple Northern Song Daoist-scholar sword robe with long steel/purple-glow jian. Steep granite cliffs of Mount Huashan, ancient pines, sea of clouds, Song-era Daoist timber halls, authentic mineral pigments (azurite, malachite, cinnabar,ink wash), dynamic martial choreography, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 175. `CG-QST-175`：药王初锋 · 古柏石阶下入门十二式力挫铁背苍狼周横

- **关联文件**：[`src/data/quests/sects/huashanYaowangTrialQuest.ts`](../src/data/quests/sects/huashanYaowangTrialQuest.ts)
- **目标路径**：`public/assets/quests/hs_q01_cypress_duel.jpg`
- **画框题跋**：`药王初锋 · 古柏石阶下入门十二式力挫铁背苍狼周横`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD on Mount Huashan / Guanzhong. Depicting scene "药王初锋 · 古柏石阶下入门十二式力挫铁背苍狼周横" from 《药王除恶 · 十二初试》. Central figure is a Huashan Qi-lineage disciple in clean cyan-white and dawn-purple Northern Song Daoist-scholar sword robe with long steel/purple-glow jian. Steep granite cliffs of Mount Huashan, ancient pines, sea of clouds, Song-era Daoist timber halls, authentic mineral pigments (azurite, malachite, cinnabar,ink wash), dynamic martial choreography, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 176. `CG-QST-176`：博台试剑 · 四老观礼云海石坪，入门十二式连挫外门群英

- **关联文件**：[`src/data/quests/sects/huashanBotaiDivisionQuest.ts`](../src/data/quests/sects/huashanBotaiDivisionQuest.ts)
- **目标路径**：`public/assets/quests/hs_q02_botai_arena.jpg`
- **画框题跋**：`博台试剑 · 四老观礼云海石坪，入门十二式连挫外门群英`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD on Mount Huashan / Guanzhong. Depicting scene "博台试剑 · 四老观礼云海石坪，入门十二式连挫外门群英" from 《博台大比 · 剑气分宗》. Central figure is a Huashan Qi-lineage disciple in clean cyan-white and dawn-purple Northern Song Daoist-scholar sword robe with long steel/purple-glow jian. Steep granite cliffs of Mount Huashan, ancient pines, sea of clouds, Song-era Daoist timber halls, authentic mineral pigments (azurite, malachite, cinnabar,ink wash), dynamic martial choreography, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 177. `CG-QST-177`：一剑夺魁 · 奇正相生震落外门魁首陆展锋手中长剑

- **关联文件**：[`src/data/quests/sects/huashanBotaiDivisionQuest.ts`](../src/data/quests/sects/huashanBotaiDivisionQuest.ts)
- **目标路径**：`public/assets/quests/hs_q02_defeat_luzhanfeng.jpg`
- **画框题跋**：`一剑夺魁 · 奇正相生震落外门魁首陆展锋手中长剑`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD on Mount Huashan / Guanzhong. Depicting scene "一剑夺魁 · 奇正相生震落外门魁首陆展锋手中长剑" from 《博台大比 · 剑气分宗》. Central figure is a Huashan Qi-lineage disciple in clean cyan-white and dawn-purple Northern Song Daoist-scholar sword robe with long steel/purple-glow jian. Steep granite cliffs of Mount Huashan, ancient pines, sea of clouds, Song-era Daoist timber halls, authentic mineral pigments (azurite, malachite, cinnabar,ink wash), dynamic martial choreography, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 178. `CG-QST-178`：烛影分宗 · 紫霞正气主殿岳沧溟与封不弃当众挑明剑气两脉

- **关联文件**：[`src/data/quests/sects/huashanBotaiDivisionQuest.ts`](../src/data/quests/sects/huashanBotaiDivisionQuest.ts)
- **目标路径**：`public/assets/quests/hs_q02_zixia_division.jpg`
- **画框题跋**：`烛影分宗 · 紫霞正气主殿岳沧溟与封不弃当众挑明剑气两脉`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD on Mount Huashan / Guanzhong. Depicting scene "烛影分宗 · 紫霞正气主殿岳沧溟与封不弃当众挑明剑气两脉" from 《博台大比 · 剑气分宗》. Central figure is a Huashan Qi-lineage disciple in clean cyan-white and dawn-purple Northern Song Daoist-scholar sword robe with long steel/purple-glow jian. Steep granite cliffs of Mount Huashan, ancient pines, sea of clouds, Song-era Daoist timber halls, authentic mineral pigments (azurite, malachite, cinnabar,ink wash), dynamic martial choreography, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 179. `CG-QST-179`：迎曦养吾 · 高沧云于东峰朝阳紫气中亲授养吾剑法

- **关联文件**：[`src/data/quests/sects/huashanQiYangwuQuest.ts`](../src/data/quests/sects/huashanQiYangwuQuest.ts)
- **目标路径**：`public/assets/quests/hs_q03_dawn_yangwu.jpg`
- **画框题跋**：`迎曦养吾 · 高沧云于东峰朝阳紫气中亲授养吾剑法`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD on Mount Huashan / Guanzhong. Depicting scene "迎曦养吾 · 高沧云于东峰朝阳紫气中亲授养吾剑法" from 《玉女晨钟 · 浩然养吾》. Central figure is a Huashan Qi-lineage disciple in clean cyan-white and dawn-purple Northern Song Daoist-scholar sword robe with long steel/purple-glow jian. Steep granite cliffs of Mount Huashan, ancient pines, sea of clouds, Song-era Daoist timber halls, authentic mineral pigments (azurite, malachite, cinnabar,ink wash), dynamic martial choreography, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 180. `CG-QST-180`：守中破妄 · 绵密养吾剑势十合震飞江南挑山快刀客兵刃

- **关联文件**：[`src/data/quests/sects/huashanQiYangwuQuest.ts`](../src/data/quests/sects/huashanQiYangwuQuest.ts)
- **目标路径**：`public/assets/quests/hs_q03_guard_counter.jpg`
- **画框题跋**：`守中破妄 · 绵密养吾剑势十合震飞江南挑山快刀客兵刃`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD on Mount Huashan / Guanzhong. Depicting scene "守中破妄 · 绵密养吾剑势十合震飞江南挑山快刀客兵刃" from 《玉女晨钟 · 浩然养吾》. Central figure is a Huashan Qi-lineage disciple in clean cyan-white and dawn-purple Northern Song Daoist-scholar sword robe with long steel/purple-glow jian. Steep granite cliffs of Mount Huashan, ancient pines, sea of clouds, Song-era Daoist timber halls, authentic mineral pigments (azurite, malachite, cinnabar,ink wash), dynamic martial choreography, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 181. `CG-QST-181`：渭水传掌 · 宁清羽于秋江孤舟之上亲授刚柔并济华山混元掌

- **关联文件**：[`src/data/quests/sects/huashanQiHunyuanPalmQuest.ts`](../src/data/quests/sects/huashanQiHunyuanPalmQuest.ts)
- **目标路径**：`public/assets/quests/hs_q04_weishui_boat.jpg`
- **画框题跋**：`渭水传掌 · 宁清羽于秋江孤舟之上亲授刚柔并济华山混元掌`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD on Mount Huashan / Guanzhong. Depicting scene "渭水传掌 · 宁清羽于秋江孤舟之上亲授刚柔并济华山混元掌" from 《渭水惊澜 · 混元破寨》. Central figure is a Huashan Qi-lineage disciple in clean cyan-white and dawn-purple Northern Song Daoist-scholar sword robe with long steel/purple-glow jian. Steep granite cliffs of Mount Huashan, ancient pines, sea of clouds, Song-era Daoist timber halls, authentic mineral pigments (azurite, malachite, cinnabar,ink wash), dynamic martial choreography, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 182. `CG-QST-182`：混元裂盾 · 子夜栈桥催动掌力震碎赤沙帮铁木重盾

- **关联文件**：[`src/data/quests/sects/huashanQiHunyuanPalmQuest.ts`](../src/data/quests/sects/huashanQiHunyuanPalmQuest.ts)
- **目标路径**：`public/assets/quests/hs_q04_shatter_shields.jpg`
- **画框题跋**：`混元裂盾 · 子夜栈桥催动掌力震碎赤沙帮铁木重盾`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD on Mount Huashan / Guanzhong. Depicting scene "混元裂盾 · 子夜栈桥催动掌力震碎赤沙帮铁木重盾" from 《渭水惊澜 · 混元破寨》. Central figure is a Huashan Qi-lineage disciple in clean cyan-white and dawn-purple Northern Song Daoist-scholar sword robe with long steel/purple-glow jian. Steep granite cliffs of Mount Huashan, ancient pines, sea of clouds, Song-era Daoist timber halls, authentic mineral pigments (azurite, malachite, cinnabar,ink wash), dynamic martial choreography, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 183. `CG-QST-183`：火焚水寨 · 掌毙赤沙帮主沙通海，夺回京兆府赈灾官粮

- **关联文件**：[`src/data/quests/sects/huashanQiHunyuanPalmQuest.ts`](../src/data/quests/sects/huashanQiHunyuanPalmQuest.ts)
- **目标路径**：`public/assets/quests/hs_q04_fort_ablaze.jpg`
- **画框题跋**：`火焚水寨 · 掌毙赤沙帮主沙通海，夺回京兆府赈灾官粮`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD on Mount Huashan / Guanzhong. Depicting scene "火焚水寨 · 掌毙赤沙帮主沙通海，夺回京兆府赈灾官粮" from 《渭水惊澜 · 混元破寨》. Central figure is a Huashan Qi-lineage disciple in clean cyan-white and dawn-purple Northern Song Daoist-scholar sword robe with long steel/purple-glow jian. Steep granite cliffs of Mount Huashan, ancient pines, sea of clouds, Song-era Daoist timber halls, authentic mineral pigments (azurite, malachite, cinnabar,ink wash), dynamic martial choreography, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 184. `CG-QST-184`：楼观礼祖 · 终南古观迎奉睡仙陈抟希夷先生道门遗卷

- **关联文件**：[`src/data/quests/sects/huashanQiXiyiQuest.ts`](../src/data/quests/sects/huashanQiXiyiQuest.ts)
- **目标路径**：`public/assets/quests/hs_q05_louguan_homage.jpg`
- **画框题跋**：`楼观礼祖 · 终南古观迎奉睡仙陈抟希夷先生道门遗卷`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD on Mount Huashan / Guanzhong. Depicting scene "楼观礼祖 · 终南古观迎奉睡仙陈抟希夷先生道门遗卷" from 《楼观护道 · 希夷剑韵》. Central figure is a Huashan Qi-lineage disciple in clean cyan-white and dawn-purple Northern Song Daoist-scholar sword robe with long steel/purple-glow jian. Steep granite cliffs of Mount Huashan, ancient pines, sea of clouds, Song-era Daoist timber halls, authentic mineral pigments (azurite, malachite, cinnabar,ink wash), dynamic martial choreography, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 185. `CG-QST-185`：松碑授剑 · 子午谷遭还施水阁伏击，宁清羽临阵传授希夷剑法

- **关联文件**：[`src/data/quests/sects/huashanQiXiyiQuest.ts`](../src/data/quests/sects/huashanQiXiyiQuest.ts)
- **目标路径**：`public/assets/quests/hs_q05_pine_ambush.jpg`
- **画框题跋**：`松碑授剑 · 子午谷遭还施水阁伏击，宁清羽临阵传授希夷剑法`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD on Mount Huashan / Guanzhong. Depicting scene "松碑授剑 · 子午谷遭还施水阁伏击，宁清羽临阵传授希夷剑法" from 《楼观护道 · 希夷剑韵》. Central figure is a Huashan Qi-lineage disciple in clean cyan-white and dawn-purple Northern Song Daoist-scholar sword robe with long steel/purple-glow jian. Steep granite cliffs of Mount Huashan, ancient pines, sea of clouds, Song-era Daoist timber halls, authentic mineral pigments (azurite, malachite, cinnabar,ink wash), dynamic martial choreography, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 186. `CG-QST-186`：大象无形 · 圆融剑幕后发先至重创慕容搜书客，返山晋位真传

- **关联文件**：[`src/data/quests/sects/huashanQiXiyiQuest.ts`](../src/data/quests/sects/huashanQiXiyiQuest.ts)
- **目标路径**：`public/assets/quests/hs_q05_xiyi_triumph.jpg`
- **画框题跋**：`大象无形 · 圆融剑幕后发先至重创慕容搜书客，返山晋位真传`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD on Mount Huashan / Guanzhong. Depicting scene "大象无形 · 圆融剑幕后发先至重创慕容搜书客，返山晋位真传" from 《楼观护道 · 希夷剑韵》. Central figure is a Huashan Qi-lineage disciple in clean cyan-white and dawn-purple Northern Song Daoist-scholar sword robe with long steel/purple-glow jian. Steep granite cliffs of Mount Huashan, ancient pines, sea of clouds, Song-era Daoist timber halls, authentic mineral pigments (azurite, malachite, cinnabar,ink wash), dynamic martial choreography, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 187. `CG-QST-187`：西峰立诫 · 封不弃于剑庐掷剑冷斥气宗旧架，命赴生死场拆招

- **关联文件**：[`src/data/quests/sects/huashanJianYangwuQuest.ts`](../src/data/quests/sects/huashanJianYangwuQuest.ts)
- **目标路径**：`public/assets/quests/hs_q06_jianlu_throw.jpg`
- **画框题跋**：`西峰立诫 · 封不弃于剑庐掷剑冷斥气宗旧架，命赴生死场拆招`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD on Mount Huashan / Guanzhong. Depicting scene "西峰立诫 · 封不弃于剑庐掷剑冷斥气宗旧架，命赴生死场拆招" from 《潼关血刃 · 以快驭正》. Central figure is a Huashan Qi-lineage disciple in clean cyan-white and dawn-purple Northern Song Daoist-scholar sword robe with long steel/purple-glow jian. Steep granite cliffs of Mount Huashan, ancient pines, sea of clouds, Song-era Daoist timber halls, authentic mineral pigments (azurite, malachite, cinnabar,ink wash), dynamic martial choreography, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 188. `CG-QST-188`：以快驭正 · 潼关乱葬岗化守为刺，疾剑连斩关外悍匪头目

- **关联文件**：[`src/data/quests/sects/huashanJianYangwuQuest.ts`](../src/data/quests/sects/huashanJianYangwuQuest.ts)
- **目标路径**：`public/assets/quests/hs_q06_tongguan_blitz.jpg`
- **画框题跋**：`以快驭正 · 潼关乱葬岗化守为刺，疾剑连斩关外悍匪头目`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD on Mount Huashan / Guanzhong. Depicting scene "以快驭正 · 潼关乱葬岗化守为刺，疾剑连斩关外悍匪头目" from 《潼关血刃 · 以快驭正》. Central figure is a Huashan Qi-lineage disciple in clean cyan-white and dawn-purple Northern Song Daoist-scholar sword robe with long steel/purple-glow jian. Steep granite cliffs of Mount Huashan, ancient pines, sea of clouds, Song-era Daoist timber halls, authentic mineral pigments (azurite, malachite, cinnabar,ink wash), dynamic martial choreography, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 189. `CG-QST-189`：寒渡观雁 · 黄河风陵渡口秋雁扑波，封不弃夜授落雁剑法

- **关联文件**：[`src/data/quests/sects/huashanJianLuoyanQuest.ts`](../src/data/quests/sects/huashanJianLuoyanQuest.ts)
- **目标路径**：`public/assets/quests/hs_q07_fengling_geese.jpg`
- **画框题跋**：`寒渡观雁 · 黄河风陵渡口秋雁扑波，封不弃夜授落雁剑法`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD on Mount Huashan / Guanzhong. Depicting scene "寒渡观雁 · 黄河风陵渡口秋雁扑波，封不弃夜授落雁剑法" from 《风陵夜渡 · 平沙落雁》. Central figure is a Huashan Qi-lineage disciple in clean cyan-white and dawn-purple Northern Song Daoist-scholar sword robe with long steel/purple-glow jian. Steep granite cliffs of Mount Huashan, ancient pines, sea of clouds, Song-era Daoist timber halls, authentic mineral pigments (azurite, malachite, cinnabar,ink wash), dynamic martial choreography, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 190. `CG-QST-190`：孤舟破哨 · 三更怒涛踏扁舟，半柱香连破九曲水匪三道哨卡

- **关联文件**：[`src/data/quests/sects/huashanJianLuoyanQuest.ts`](../src/data/quests/sects/huashanJianLuoyanQuest.ts)
- **目标路径**：`public/assets/quests/hs_q07_skiff_raid.jpg`
- **画框题跋**：`孤舟破哨 · 三更怒涛踏扁舟，半柱香连破九曲水匪三道哨卡`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD on Mount Huashan / Guanzhong. Depicting scene "孤舟破哨 · 三更怒涛踏扁舟，半柱香连破九曲水匪三道哨卡" from 《风陵夜渡 · 平沙落雁》. Central figure is a Huashan Qi-lineage disciple in clean cyan-white and dawn-purple Northern Song Daoist-scholar sword robe with long steel/purple-glow jian. Steep granite cliffs of Mount Huashan, ancient pines, sea of clouds, Song-era Daoist timber halls, authentic mineral pigments (azurite, malachite, cinnabar,ink wash), dynamic martial choreography, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 191. `CG-QST-191`：剑不沾衣 · 回风扑雁一剑双雕斩水寨头领，封不弃槐下抚掌

- **关联文件**：[`src/data/quests/sects/huashanJianLuoyanQuest.ts`](../src/data/quests/sects/huashanJianLuoyanQuest.ts)
- **目标路径**：`public/assets/quests/hs_q07_bloodless_blade.jpg`
- **画框题跋**：`剑不沾衣 · 回风扑雁一剑双雕斩水寨头领，封不弃槐下抚掌`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD on Mount Huashan / Guanzhong. Depicting scene "剑不沾衣 · 回风扑雁一剑双雕斩水寨头领，封不弃槐下抚掌" from 《风陵夜渡 · 平沙落雁》. Central figure is a Huashan Qi-lineage disciple in clean cyan-white and dawn-purple Northern Song Daoist-scholar sword robe with long steel/purple-glow jian. Steep granite cliffs of Mount Huashan, ancient pines, sea of clouds, Song-era Daoist timber halls, authentic mineral pigments (azurite, malachite, cinnabar,ink wash), dynamic martial choreography, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 192. `CG-QST-192`：博台折锋 · 潼关剑神秦烈山三合点破快剑空门，痛斥匹夫之勇

- **关联文件**：[`src/data/quests/sects/huashanJianXiyiQuest.ts`](../src/data/quests/sects/huashanJianXiyiQuest.ts)
- **目标路径**：`public/assets/quests/hs_q08_qin_three_moves.jpg`
- **画框题跋**：`博台折锋 · 潼关剑神秦烈山三合点破快剑空门，痛斥匹夫之勇`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD on Mount Huashan / Guanzhong. Depicting scene "博台折锋 · 潼关剑神秦烈山三合点破快剑空门，痛斥匹夫之勇" from 《云台残局 · 希夷求变》. Central figure is a Huashan Qi-lineage disciple in clean cyan-white and dawn-purple Northern Song Daoist-scholar sword robe with long steel/purple-glow jian. Steep granite cliffs of Mount Huashan, ancient pines, sea of clouds, Song-era Daoist timber halls, authentic mineral pigments (azurite, malachite, cinnabar,ink wash), dynamic martial choreography, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 193. `CG-QST-193`：云台悟变 · 陈抟对弈古亭参悟虚实奇正，获授地阶希夷剑法

- **关联文件**：[`src/data/quests/sects/huashanJianXiyiQuest.ts`](../src/data/quests/sects/huashanJianXiyiQuest.ts)
- **目标路径**：`public/assets/quests/hs_q08_yuntai_chess.jpg`
- **画框题跋**：`云台悟变 · 陈抟对弈古亭参悟虚实奇正，获授地阶希夷剑法`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD on Mount Huashan / Guanzhong. Depicting scene "云台悟变 · 陈抟对弈古亭参悟虚实奇正，获授地阶希夷剑法" from 《云台残局 · 希夷求变》. Central figure is a Huashan Qi-lineage disciple in clean cyan-white and dawn-purple Northern Song Daoist-scholar sword robe with long steel/purple-glow jian. Steep granite cliffs of Mount Huashan, ancient pines, sea of clouds, Song-era Daoist timber halls, authentic mineral pigments (azurite, malachite, cinnabar,ink wash), dynamic martial choreography, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 194. `CG-QST-194`：银瀑封喉 · 飞瀑寒潭下希夷诱敌合落雁快剑独斩西域双刺客

- **关联文件**：[`src/data/quests/sects/huashanJianXiyiQuest.ts`](../src/data/quests/sects/huashanJianXiyiQuest.ts)
- **目标路径**：`public/assets/quests/hs_q08_falls_assassins.jpg`
- **画框题跋**：`银瀑封喉 · 飞瀑寒潭下希夷诱敌合落雁快剑独斩西域双刺客`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD on Mount Huashan / Guanzhong. Depicting scene "银瀑封喉 · 飞瀑寒潭下希夷诱敌合落雁快剑独斩西域双刺客" from 《云台残局 · 希夷求变》. Central figure is a Huashan Qi-lineage disciple in clean cyan-white and dawn-purple Northern Song Daoist-scholar sword robe with long steel/purple-glow jian. Steep granite cliffs of Mount Huashan, ancient pines, sea of clouds, Song-era Daoist timber halls, authentic mineral pigments (azurite, malachite, cinnabar,ink wash), dynamic martial choreography, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 195. `CG-QST-195`：由外而内 · 东峰迎曦石坪宁清羽与高沧云合授地阶混元功

- **关联文件**：[`src/data/quests/sects/huashanQiHunyuanGongQuest.ts`](../src/data/quests/sects/huashanQiHunyuanGongQuest.ts)
- **目标路径**：`public/assets/quests/hs_q09_hunyuan_neigong.jpg`
- **画框题跋**：`由外而内 · 东峰迎曦石坪宁清羽与高沧云合授地阶混元功`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD on Mount Huashan / Guanzhong. Depicting scene "由外而内 · 东峰迎曦石坪宁清羽与高沧云合授地阶混元功" from 《东峰迎曦 · 由外而内》. Central figure is a Huashan Qi-lineage disciple in clean cyan-white and dawn-purple Northern Song Daoist-scholar sword robe with long steel/purple-glow jian. Steep granite cliffs of Mount Huashan, ancient pines, sea of clouds, Song-era Daoist timber halls, authentic mineral pigments (azurite, malachite, cinnabar,ink wash), dynamic martial choreography, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 196. `CG-QST-196`：西市毒网 · 夜探长安鬼市废宅，双剑陷入星宿火油毒阵重围

- **关联文件**：[`src/data/quests/sects/huashanQiHunyuanGongQuest.ts`](../src/data/quests/sects/huashanQiHunyuanGongQuest.ts)
- **目标路径**：`public/assets/quests/hs_q09_xishi_firetrap.jpg`
- **画框题跋**：`西市毒网 · 夜探长安鬼市废宅，双剑陷入星宿火油毒阵重围`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD on Mount Huashan / Guanzhong. Depicting scene "西市毒网 · 夜探长安鬼市废宅，双剑陷入星宿火油毒阵重围" from 《东峰迎曦 · 由外而内》. Central figure is a Huashan Qi-lineage disciple in clean cyan-white and dawn-purple Northern Song Daoist-scholar sword robe with long steel/purple-glow jian. Steep granite cliffs of Mount Huashan, ancient pines, sea of clouds, Song-era Daoist timber halls, authentic mineral pigments (azurite, malachite, cinnabar,ink wash), dynamic martial choreography, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 197. `CG-QST-197`：混元返震 · 催动混元真气引毒反震，正面击毙星宿腐骨道人

- **关联文件**：[`src/data/quests/sects/huashanQiHunyuanGongQuest.ts`](../src/data/quests/sects/huashanQiHunyuanGongQuest.ts)
- **目标路径**：`public/assets/quests/hs_q09_rebound_poison.jpg`
- **画框题跋**：`混元返震 · 催动混元真气引毒反震，正面击毙星宿腐骨道人`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD on Mount Huashan / Guanzhong. Depicting scene "混元返震 · 催动混元真气引毒反震，正面击毙星宿腐骨道人" from 《东峰迎曦 · 由外而内》. Central figure is a Huashan Qi-lineage disciple in clean cyan-white and dawn-purple Northern Song Daoist-scholar sword robe with long steel/purple-glow jian. Steep granite cliffs of Mount Huashan, ancient pines, sea of clouds, Song-era Daoist timber halls, authentic mineral pigments (azurite, malachite, cinnabar,ink wash), dynamic martial choreography, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 198. `CG-QST-198`：紫衫荣光 · 东峰霞光中获授地阶宝衣华山紫霞剑客衫

- **关联文件**：[`src/data/quests/sects/huashanQiHunyuanGongQuest.ts`](../src/data/quests/sects/huashanQiHunyuanGongQuest.ts)
- **目标路径**：`public/assets/quests/hs_q09_zixia_robe.jpg`
- **画框题跋**：`紫衫荣光 · 东峰霞光中获授地阶宝衣华山紫霞剑客衫`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD on Mount Huashan / Guanzhong. Depicting scene "紫衫荣光 · 东峰霞光中获授地阶宝衣华山紫霞剑客衫" from 《东峰迎曦 · 由外而内》. Central figure is a Huashan Qi-lineage disciple in clean cyan-white and dawn-purple Northern Song Daoist-scholar sword robe with long steel/purple-glow jian. Steep granite cliffs of Mount Huashan, ancient pines, sea of clouds, Song-era Daoist timber halls, authentic mineral pigments (azurite, malachite, cinnabar,ink wash), dynamic martial choreography, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 199. `CG-QST-199`：十剑不退 · 落雁峰白玉坛顶混元真气硬接秦烈山十剑考校

- **关联文件**：[`src/data/quests/sects/huashanQiSanqingQuest.ts`](../src/data/quests/sects/huashanQiSanqingQuest.ts)
- **目标路径**：`public/assets/quests/hs_q10_ten_strikes.jpg`
- **画框题跋**：`十剑不退 · 落雁峰白玉坛顶混元真气硬接秦烈山十剑考校`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD on Mount Huashan / Guanzhong. Depicting scene "十剑不退 · 落雁峰白玉坛顶混元真气硬接秦烈山十剑考校" from 《落雁借剑 · 太岳三峰》. Central figure is a Huashan Qi-lineage disciple in clean cyan-white and dawn-purple Northern Song Daoist-scholar sword robe with long steel/purple-glow jian. Steep granite cliffs of Mount Huashan, ancient pines, sea of clouds, Song-era Daoist timber halls, authentic mineral pigments (azurite, malachite, cinnabar,ink wash), dynamic martial choreography, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 200. `CG-QST-200`：出关斩恶 · 风雪潼关单骑截杀塞外凶徒血刀恶僧

- **关联文件**：[`src/data/quests/sects/huashanQiSanqingQuest.ts`](../src/data/quests/sects/huashanQiSanqingQuest.ts)
- **目标路径**：`public/assets/quests/hs_q10_blood_monk_duel.jpg`
- **画框题跋**：`出关斩恶 · 风雪潼关单骑截杀塞外凶徒血刀恶僧`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD on Mount Huashan / Guanzhong. Depicting scene "出关斩恶 · 风雪潼关单骑截杀塞外凶徒血刀恶僧" from 《落雁借剑 · 太岳三峰》. Central figure is a Huashan Qi-lineage disciple in clean cyan-white and dawn-purple Northern Song Daoist-scholar sword robe with long steel/purple-glow jian. Steep granite cliffs of Mount Huashan, ancient pines, sea of clouds, Song-era Daoist timber halls, authentic mineral pigments (azurite, malachite, cinnabar,ink wash), dynamic martial choreography, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 201. `CG-QST-201`：白玉启匣 · 秦烈山动容开启石匣，亲授太岳三青峰剑谱真卷

- **关联文件**：[`src/data/quests/sects/huashanQiSanqingQuest.ts`](../src/data/quests/sects/huashanQiSanqingQuest.ts)
- **目标路径**：`public/assets/quests/hs_q10_jade_casket.jpg`
- **画框题跋**：`白玉启匣 · 秦烈山动容开启石匣，亲授太岳三青峰剑谱真卷`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD on Mount Huashan / Guanzhong. Depicting scene "白玉启匣 · 秦烈山动容开启石匣，亲授太岳三青峰剑谱真卷" from 《落雁借剑 · 太岳三峰》. Central figure is a Huashan Qi-lineage disciple in clean cyan-white and dawn-purple Northern Song Daoist-scholar sword robe with long steel/purple-glow jian. Steep granite cliffs of Mount Huashan, ancient pines, sea of clouds, Song-era Daoist timber halls, authentic mineral pigments (azurite, malachite, cinnabar,ink wash), dynamic martial choreography, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 202. `CG-QST-202`：三峰插云 · 落雁绝顶一式三剑气贯苍穹，修成太岳三青峰

- **关联文件**：[`src/data/quests/sects/huashanQiSanqingQuest.ts`](../src/data/quests/sects/huashanQiSanqingQuest.ts)
- **目标路径**：`public/assets/quests/hs_q10_three_peaks_sword.jpg`
- **画框题跋**：`三峰插云 · 落雁绝顶一式三剑气贯苍穹，修成太岳三青峰`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD on Mount Huashan / Guanzhong. Depicting scene "三峰插云 · 落雁绝顶一式三剑气贯苍穹，修成太岳三青峰" from 《落雁借剑 · 太岳三峰》. Central figure is a Huashan Qi-lineage disciple in clean cyan-white and dawn-purple Northern Song Daoist-scholar sword robe with long steel/purple-glow jian. Steep granite cliffs of Mount Huashan, ancient pines, sea of clouds, Song-era Daoist timber halls, authentic mineral pigments (azurite, malachite, cinnabar,ink wash), dynamic martial choreography, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 203. `CG-QST-203`：残庐泣血 · 秋夜西峰荒庐祭拜先辈牌位，封不弃吐露三十载旧怨

- **关联文件**：[`src/data/quests/sects/huashanJianSanxianQuest.ts`](../src/data/quests/sects/huashanJianSanxianQuest.ts)
- **目标路径**：`public/assets/quests/hs_q11_ruined_jianlu.jpg`
- **画框题跋**：`残庐泣血 · 秋夜西峰荒庐祭拜先辈牌位，封不弃吐露三十载旧怨`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD on Mount Huashan / Guanzhong. Depicting scene "残庐泣血 · 秋夜西峰荒庐祭拜先辈牌位，封不弃吐露三十载旧怨" from 《剑庐残烛 · 夺命三仙》. Central figure is a Huashan Qi-lineage disciple in clean cyan-white and dawn-purple Northern Song Daoist-scholar sword robe with long steel/purple-glow jian. Steep granite cliffs of Mount Huashan, ancient pines, sea of clouds, Song-era Daoist timber halls, authentic mineral pigments (azurite, malachite, cinnabar,ink wash), dynamic martial choreography, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 204. `CG-QST-204`：夺命三仙 · 残烛孤影下倾囊传授地阶杀剑夺命连环三仙剑

- **关联文件**：[`src/data/quests/sects/huashanJianSanxianQuest.ts`](../src/data/quests/sects/huashanJianSanxianQuest.ts)
- **目标路径**：`public/assets/quests/hs_q11_sanxian_impart.jpg`
- **画框题跋**：`夺命三仙 · 残烛孤影下倾囊传授地阶杀剑夺命连环三仙剑`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD on Mount Huashan / Guanzhong. Depicting scene "夺命三仙 · 残烛孤影下倾囊传授地阶杀剑夺命连环三仙剑" from 《剑庐残烛 · 夺命三仙》. Central figure is a Huashan Qi-lineage disciple in clean cyan-white and dawn-purple Northern Song Daoist-scholar sword robe with long steel/purple-glow jian. Steep granite cliffs of Mount Huashan, ancient pines, sea of clouds, Song-era Daoist timber halls, authentic mineral pigments (azurite, malachite, cinnabar,ink wash), dynamic martial choreography, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 205. `CG-QST-205`：三剑无生 · 华阴夜袭连环三剑瞬枭三名辽夏黑市死士

- **关联文件**：[`src/data/quests/sects/huashanJianSanxianQuest.ts`](../src/data/quests/sects/huashanJianSanxianQuest.ts)
- **目标路径**：`public/assets/quests/hs_q11_huayin_slay.jpg`
- **画框题跋**：`三剑无生 · 华阴夜袭连环三剑瞬枭三名辽夏黑市死士`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD on Mount Huashan / Guanzhong. Depicting scene "三剑无生 · 华阴夜袭连环三剑瞬枭三名辽夏黑市死士" from 《剑庐残烛 · 夺命三仙》. Central figure is a Huashan Qi-lineage disciple in clean cyan-white and dawn-purple Northern Song Daoist-scholar sword robe with long steel/purple-glow jian. Steep granite cliffs of Mount Huashan, ancient pines, sea of clouds, Song-era Daoist timber halls, authentic mineral pigments (azurite, malachite, cinnabar,ink wash), dynamic martial choreography, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 206. `CG-QST-206`：寒月盘剑 · 秦烈山巡山撞破夺命剑痕，冷目逼问剑心向背

- **关联文件**：[`src/data/quests/sects/huashanJianSanxianQuest.ts`](../src/data/quests/sects/huashanJianSanxianQuest.ts)
- **目标路径**：`public/assets/quests/hs_q11_qin_interrogate.jpg`
- **画框题跋**：`寒月盘剑 · 秦烈山巡山撞破夺命剑痕，冷目逼问剑心向背`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD on Mount Huashan / Guanzhong. Depicting scene "寒月盘剑 · 秦烈山巡山撞破夺命剑痕，冷目逼问剑心向背" from 《剑庐残烛 · 夺命三仙》. Central figure is a Huashan Qi-lineage disciple in clean cyan-white and dawn-purple Northern Song Daoist-scholar sword robe with long steel/purple-glow jian. Steep granite cliffs of Mount Huashan, ancient pines, sea of clouds, Song-era Daoist timber halls, authentic mineral pigments (azurite, malachite, cinnabar,ink wash), dynamic martial choreography, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 207. `CG-QST-207`：踏雪问剑 · 孤身登临落雁峰白玉论剑坛，秦烈山横剑云海相候

- **关联文件**：[`src/data/quests/sects/huashanJianSanqingQuest.ts`](../src/data/quests/sects/huashanJianSanqingQuest.ts)
- **目标路径**：`public/assets/quests/hs_q12_snow_ascent.jpg`
- **画框题跋**：`踏雪问剑 · 孤身登临落雁峰白玉论剑坛，秦烈山横剑云海相候`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD on Mount Huashan / Guanzhong. Depicting scene "踏雪问剑 · 孤身登临落雁峰白玉论剑坛，秦烈山横剑云海相候" from 《白玉问剑 · 潼关剑神》. Central figure is a Huashan Qi-lineage disciple in clean cyan-white and dawn-purple Northern Song Daoist-scholar sword robe with long steel/purple-glow jian. Steep granite cliffs of Mount Huashan, ancient pines, sea of clouds, Song-era Daoist timber halls, authentic mineral pigments (azurite, malachite, cinnabar,ink wash), dynamic martial choreography, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 208. `CG-QST-208`：断刃指喉 · 狂飙剑压激斗十五合，佩剑崩裂仍寸步不让

- **关联文件**：[`src/data/quests/sects/huashanJianSanqingQuest.ts`](../src/data/quests/sects/huashanJianSanqingQuest.ts)
- **目标路径**：`public/assets/quests/hs_q12_broken_blade.jpg`
- **画框题跋**：`断刃指喉 · 狂飙剑压激斗十五合，佩剑崩裂仍寸步不让`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD on Mount Huashan / Guanzhong. Depicting scene "断刃指喉 · 狂飙剑压激斗十五合，佩剑崩裂仍寸步不让" from 《白玉问剑 · 潼关剑神》. Central figure is a Huashan Qi-lineage disciple in clean cyan-white and dawn-purple Northern Song Daoist-scholar sword robe with long steel/purple-glow jian. Steep granite cliffs of Mount Huashan, ancient pines, sea of clouds, Song-era Daoist timber halls, authentic mineral pigments (azurite, malachite, cinnabar,ink wash), dynamic martial choreography, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 209. `CG-QST-209`：夜闯黑店 · 黄河风陵渡荒店孤剑破局，连斩塞外双煞证道

- **关联文件**：[`src/data/quests/sects/huashanJianSanqingQuest.ts`](../src/data/quests/sects/huashanJianSanqingQuest.ts)
- **目标路径**：`public/assets/quests/hs_q12_black_inn.jpg`
- **画框题跋**：`夜闯黑店 · 黄河风陵渡荒店孤剑破局，连斩塞外双煞证道`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD on Mount Huashan / Guanzhong. Depicting scene "夜闯黑店 · 黄河风陵渡荒店孤剑破局，连斩塞外双煞证道" from 《白玉问剑 · 潼关剑神》. Central figure is a Huashan Qi-lineage disciple in clean cyan-white and dawn-purple Northern Song Daoist-scholar sword robe with long steel/purple-glow jian. Steep granite cliffs of Mount Huashan, ancient pines, sea of clouds, Song-era Daoist timber halls, authentic mineral pigments (azurite, malachite, cinnabar,ink wash), dynamic martial choreography, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 210. `CG-QST-210`：剑神托谱 · 秦烈山欣慰长笑，亲手托付华山太岳三青峰剑谱

- **关联文件**：[`src/data/quests/sects/huashanJianSanqingQuest.ts`](../src/data/quests/sects/huashanJianSanqingQuest.ts)
- **目标路径**：`public/assets/quests/hs_q12_manual_bestow.jpg`
- **画框题跋**：`剑神托谱 · 秦烈山欣慰长笑，亲手托付华山太岳三青峰剑谱`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD on Mount Huashan / Guanzhong. Depicting scene "剑神托谱 · 秦烈山欣慰长笑，亲手托付华山太岳三青峰剑谱" from 《白玉问剑 · 潼关剑神》. Central figure is a Huashan Qi-lineage disciple in clean cyan-white and dawn-purple Northern Song Daoist-scholar sword robe with long steel/purple-glow jian. Steep granite cliffs of Mount Huashan, ancient pines, sea of clouds, Song-era Daoist timber halls, authentic mineral pigments (azurite, malachite, cinnabar,ink wash), dynamic martial choreography, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 211. `CG-QST-211`：西岳重光 · 白玉坛顶三剑齐发惊散流云，剑宗修成太岳三青峰

- **关联文件**：[`src/data/quests/sects/huashanJianSanqingQuest.ts`](../src/data/quests/sects/huashanJianSanqingQuest.ts)
- **目标路径**：`public/assets/quests/hs_q12_taiyue_mastery.jpg`
- **画框题跋**：`西岳重光 · 白玉坛顶三剑齐发惊散流云，剑宗修成太岳三青峰`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD on Mount Huashan / Guanzhong. Depicting scene "西岳重光 · 白玉坛顶三剑齐发惊散流云，剑宗修成太岳三青峰" from 《白玉问剑 · 潼关剑神》. Central figure is a Huashan Qi-lineage disciple in clean cyan-white and dawn-purple Northern Song Daoist-scholar sword robe with long steel/purple-glow jian. Steep granite cliffs of Mount Huashan, ancient pines, sea of clouds, Song-era Daoist timber halls, authentic mineral pigments (azurite, malachite, cinnabar,ink wash), dynamic martial choreography, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 212. `CG-QST-212`：惊雷断锁 · 暴风雨夜思过崖后洞重石铁锁遭西夏密谍斩断

- **关联文件**：[`src/data/quests/sects/huashanSiguoyaSecretQuest.ts`](../src/data/quests/sects/huashanSiguoyaSecretQuest.ts)
- **目标路径**：`public/assets/quests/hs_q13_iron_lock_broken.jpg`
- **画框题跋**：`惊雷断锁 · 暴风雨夜思过崖后洞重石铁锁遭西夏密谍斩断`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD on Mount Huashan / Guanzhong. Depicting scene "惊雷断锁 · 暴风雨夜思过崖后洞重石铁锁遭西夏密谍斩断" from 《寒风面壁 · 铁锁惊雷》. Central figure is a Huashan Qi-lineage disciple in clean cyan-white and dawn-purple Northern Song Daoist-scholar sword robe with long steel/purple-glow jian. Steep granite cliffs of Mount Huashan, ancient pines, sea of clouds, Song-era Daoist timber halls, authentic mineral pigments (azurite, malachite, cinnabar,ink wash), dynamic martial choreography, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 213. `CG-QST-213`：枯骨魔刻 · 火把映照满地先辈骸骨与石壁同室操戈破招剑痕

- **关联文件**：[`src/data/quests/sects/huashanSiguoyaSecretQuest.ts`](../src/data/quests/sects/huashanSiguoyaSecretQuest.ts)
- **目标路径**：`public/assets/quests/hs_q13_bones_and_carvings.jpg`
- **画框题跋**：`枯骨魔刻 · 火把映照满地先辈骸骨与石壁同室操戈破招剑痕`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD on Mount Huashan / Guanzhong. Depicting scene "枯骨魔刻 · 火把映照满地先辈骸骨与石壁同室操戈破招剑痕" from 《寒风面壁 · 铁锁惊雷》. Central figure is a Huashan Qi-lineage disciple in clean cyan-white and dawn-purple Northern Song Daoist-scholar sword robe with long steel/purple-glow jian. Steep granite cliffs of Mount Huashan, ancient pines, sea of clouds, Song-era Daoist timber halls, authentic mineral pigments (azurite, malachite, cinnabar,ink wash), dynamic martial choreography, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 214. `CG-QST-214`：幽窟诛谍 · 秘洞古剑刻石室深处激战斩杀西夏一品堂密谍

- **关联文件**：[`src/data/quests/sects/huashanSiguoyaSecretQuest.ts`](../src/data/quests/sects/huashanSiguoyaSecretQuest.ts)
- **目标路径**：`public/assets/quests/hs_q13_cave_spy_duel.jpg`
- **画框题跋**：`幽窟诛谍 · 秘洞古剑刻石室深处激战斩杀西夏一品堂密谍`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD on Mount Huashan / Guanzhong. Depicting scene "幽窟诛谍 · 秘洞古剑刻石室深处激战斩杀西夏一品堂密谍" from 《寒风面壁 · 铁锁惊雷》. Central figure is a Huashan Qi-lineage disciple in clean cyan-white and dawn-purple Northern Song Daoist-scholar sword robe with long steel/purple-glow jian. Steep granite cliffs of Mount Huashan, ancient pines, sea of clouds, Song-era Daoist timber halls, authentic mineral pigments (azurite, malachite, cinnabar,ink wash), dynamic martial choreography, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 215. `CG-QST-215`：一念正邪 · 独立泣血石壁之前，削壁止戈与私拓秘刻一念分途

- **关联文件**：[`src/data/quests/sects/huashanSiguoyaSecretQuest.ts`](../src/data/quests/sects/huashanSiguoyaSecretQuest.ts)
- **目标路径**：`public/assets/quests/hs_q13_wall_crossroad.jpg`
- **画框题跋**：`一念正邪 · 独立泣血石壁之前，削壁止戈与私拓秘刻一念分途`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD on Mount Huashan / Guanzhong. Depicting scene "一念正邪 · 独立泣血石壁之前，削壁止戈与私拓秘刻一念分途" from 《寒风面壁 · 铁锁惊雷》. Central figure is a Huashan Qi-lineage disciple in clean cyan-white and dawn-purple Northern Song Daoist-scholar sword robe with long steel/purple-glow jian. Steep granite cliffs of Mount Huashan, ancient pines, sea of clouds, Song-era Daoist timber halls, authentic mineral pigments (azurite, malachite, cinnabar,ink wash), dynamic martial choreography, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 216. `CG-QST-216`：挥剑削魔 · 剑光如雪削平石壁阴毒破招图谱，收敛先辈遗骸立冢

- **关联文件**：[`src/data/quests/sects/huashanCaveHarmonyQuest.ts`](../src/data/quests/sects/huashanCaveHarmonyQuest.ts)
- **目标路径**：`public/assets/quests/hs_q14_shave_cliff.jpg`
- **画框题跋**：`挥剑削魔 · 剑光如雪削平石壁阴毒破招图谱，收敛先辈遗骸立冢`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD on Mount Huashan / Guanzhong. Depicting scene "挥剑削魔 · 剑光如雪削平石壁阴毒破招图谱，收敛先辈遗骸立冢" from 《石室止戈 · 剑气同源》. Central figure is a Huashan Qi-lineage disciple in clean cyan-white and dawn-purple Northern Song Daoist-scholar sword robe with long steel/purple-glow jian. Steep granite cliffs of Mount Huashan, ancient pines, sea of clouds, Song-era Daoist timber halls, authentic mineral pigments (azurite, malachite, cinnabar,ink wash), dynamic martial choreography, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 217. `CG-QST-217`：四老泣拜 · 岳沧溟秦烈山宁清羽封不弃共入石室祭奠，三十载坚冰初融

- **关联文件**：[`src/data/quests/sects/huashanCaveHarmonyQuest.ts`](../src/data/quests/sects/huashanCaveHarmonyQuest.ts)
- **目标路径**：`public/assets/quests/hs_q14_four_elders_mourn.jpg`
- **画框题跋**：`四老泣拜 · 岳沧溟秦烈山宁清羽封不弃共入石室祭奠，三十载坚冰初融`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD on Mount Huashan / Guanzhong. Depicting scene "四老泣拜 · 岳沧溟秦烈山宁清羽封不弃共入石室祭奠，三十载坚冰初融" from 《石室止戈 · 剑气同源》. Central figure is a Huashan Qi-lineage disciple in clean cyan-white and dawn-purple Northern Song Daoist-scholar sword robe with long steel/purple-glow jian. Steep granite cliffs of Mount Huashan, ancient pines, sea of clouds, Song-era Daoist timber halls, authentic mineral pigments (azurite, malachite, cinnabar,ink wash), dynamic martial choreography, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 218. `CG-QST-218`：剑气同源 · 宁清羽与秦烈山打破门户藩篱，于思过崖交叉授艺

- **关联文件**：[`src/data/quests/sects/huashanCaveHarmonyQuest.ts`](../src/data/quests/sects/huashanCaveHarmonyQuest.ts)
- **目标路径**：`public/assets/quests/hs_q14_cross_lineage_teach.jpg`
- **画框题跋**：`剑气同源 · 宁清羽与秦烈山打破门户藩篱，于思过崖交叉授艺`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD on Mount Huashan / Guanzhong. Depicting scene "剑气同源 · 宁清羽与秦烈山打破门户藩篱，于思过崖交叉授艺" from 《石室止戈 · 剑气同源》. Central figure is a Huashan Qi-lineage disciple in clean cyan-white and dawn-purple Northern Song Daoist-scholar sword robe with long steel/purple-glow jian. Steep granite cliffs of Mount Huashan, ancient pines, sea of clouds, Song-era Daoist timber halls, authentic mineral pigments (azurite, malachite, cinnabar,ink wash), dynamic martial choreography, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 219. `CG-QST-219`：暗夜私拓 · 烛火摇曳间默记拓印石壁破尽本门诸般武学残招

- **关联文件**：[`src/data/quests/sects/huashanCaveUsurpQuest.ts`](../src/data/quests/sects/huashanCaveUsurpQuest.ts)
- **目标路径**：`public/assets/quests/hs_q15_midnight_rubbing.jpg`
- **画框题跋**：`暗夜私拓 · 烛火摇曳间默记拓印石壁破尽本门诸般武学残招`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD on Mount Huashan / Guanzhong. Depicting scene "暗夜私拓 · 烛火摇曳间默记拓印石壁破尽本门诸般武学残招" from 《魔刻噬心 · 破尽同门》. Central figure is a Huashan Qi-lineage disciple in clean cyan-white and dawn-purple Northern Song Daoist-scholar sword robe with long steel/purple-glow jian. Steep granite cliffs of Mount Huashan, ancient pines, sea of clouds, Song-era Daoist timber halls, authentic mineral pigments (azurite, malachite, cinnabar,ink wash), dynamic martial choreography, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 220. `CG-QST-220`：诡剑伤同 · 门内校剑刁钻一刺洞穿师兄护体剑幕，满场骇然

- **关联文件**：[`src/data/quests/sects/huashanCaveUsurpQuest.ts`](../src/data/quests/sects/huashanCaveUsurpQuest.ts)
- **目标路径**：`public/assets/quests/hs_q15_cruel_spar.jpg`
- **画框题跋**：`诡剑伤同 · 门内校剑刁钻一刺洞穿师兄护体剑幕，满场骇然`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD on Mount Huashan / Guanzhong. Depicting scene "诡剑伤同 · 门内校剑刁钻一刺洞穿师兄护体剑幕，满场骇然" from 《魔刻噬心 · 破尽同门》. Central figure is a Huashan Qi-lineage disciple in clean cyan-white and dawn-purple Northern Song Daoist-scholar sword robe with long steel/purple-glow jian. Steep granite cliffs of Mount Huashan, ancient pines, sea of clouds, Song-era Daoist timber halls, authentic mineral pigments (azurite, malachite, cinnabar,ink wash), dynamic martial choreography, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 221. `CG-QST-221`：寒庐密谋 · 封不弃暗夜狂喜召见，共谋倾覆紫霞夺位大计

- **关联文件**：[`src/data/quests/sects/huashanCaveUsurpQuest.ts`](../src/data/quests/sects/huashanCaveUsurpQuest.ts)
- **目标路径**：`public/assets/quests/hs_q15_secret_plot.jpg`
- **画框题跋**：`寒庐密谋 · 封不弃暗夜狂喜召见，共谋倾覆紫霞夺位大计`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD on Mount Huashan / Guanzhong. Depicting scene "寒庐密谋 · 封不弃暗夜狂喜召见，共谋倾覆紫霞夺位大计" from 《魔刻噬心 · 破尽同门》. Central figure is a Huashan Qi-lineage disciple in clean cyan-white and dawn-purple Northern Song Daoist-scholar sword robe with long steel/purple-glow jian. Steep granite cliffs of Mount Huashan, ancient pines, sea of clouds, Song-era Daoist timber halls, authentic mineral pigments (azurite, malachite, cinnabar,ink wash), dynamic martial choreography, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 222. `CG-QST-222`：雁塔毒烟 · 长安慈恩寺大雁塔风雨飘摇，强弩毒雾重困封高二人

- **关联文件**：[`src/data/quests/sects/huashanYantaCrisisQuest.ts`](../src/data/quests/sects/huashanYantaCrisisQuest.ts)
- **目标路径**：`public/assets/quests/hs_q16_yanta_siege.jpg`
- **画框题跋**：`雁塔毒烟 · 长安慈恩寺大雁塔风雨飘摇，强弩毒雾重困封高二人`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD on Mount Huashan / Guanzhong. Depicting scene "雁塔毒烟 · 长安慈恩寺大雁塔风雨飘摇，强弩毒雾重困封高二人" from 《雁塔风雷 · 京兆除魔》. Central figure is a Huashan Qi-lineage disciple in clean cyan-white and dawn-purple Northern Song Daoist-scholar sword robe with long steel/purple-glow jian. Steep granite cliffs of Mount Huashan, ancient pines, sea of clouds, Song-era Daoist timber halls, authentic mineral pigments (azurite, malachite, cinnabar,ink wash), dynamic martial choreography, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 223. `CG-QST-223`：血战七层 · 提剑自底层杀上浮屠绝顶，太岳三青峰连破番邦刀阵

- **关联文件**：[`src/data/quests/sects/huashanYantaCrisisQuest.ts`](../src/data/quests/sects/huashanYantaCrisisQuest.ts)
- **目标路径**：`public/assets/quests/hs_q16_seven_floors_blood.jpg`
- **画框题跋**：`血战七层 · 提剑自底层杀上浮屠绝顶，太岳三青峰连破番邦刀阵`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD on Mount Huashan / Guanzhong. Depicting scene "血战七层 · 提剑自底层杀上浮屠绝顶，太岳三青峰连破番邦刀阵" from 《雁塔风雷 · 京兆除魔》. Central figure is a Huashan Qi-lineage disciple in clean cyan-white and dawn-purple Northern Song Daoist-scholar sword robe with long steel/purple-glow jian. Steep granite cliffs of Mount Huashan, ancient pines, sea of clouds, Song-era Daoist timber halls, authentic mineral pigments (azurite, malachite, cinnabar,ink wash), dynamic martial choreography, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 224. `CG-QST-224`：飞檐除魔 · 大雁塔顶凌空力挫一品堂副使与星宿毒阵长老

- **关联文件**：[`src/data/quests/sects/huashanYantaCrisisQuest.ts`](../src/data/quests/sects/huashanYantaCrisisQuest.ts)
- **目标路径**：`public/assets/quests/hs_q16_pagoda_eaves_duel.jpg`
- **画框题跋**：`飞檐除魔 · 大雁塔顶凌空力挫一品堂副使与星宿毒阵长老`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD on Mount Huashan / Guanzhong. Depicting scene "飞檐除魔 · 大雁塔顶凌空力挫一品堂副使与星宿毒阵长老" from 《雁塔风雷 · 京兆除魔》. Central figure is a Huashan Qi-lineage disciple in clean cyan-white and dawn-purple Northern Song Daoist-scholar sword robe with long steel/purple-glow jian. Steep granite cliffs of Mount Huashan, ancient pines, sea of clouds, Song-era Daoist timber halls, authentic mineral pigments (azurite, malachite, cinnabar,ink wash), dynamic martial choreography, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 225. `CG-QST-225`：荣膺长老 · 紫霞殿四老联署册封四阶长老，一纸伪造血书暗掀风暴

- **关联文件**：[`src/data/quests/sects/huashanYantaCrisisQuest.ts`](../src/data/quests/sects/huashanYantaCrisisQuest.ts)
- **目标路径**：`public/assets/quests/hs_q16_elder_investiture.jpg`
- **画框题跋**：`荣膺长老 · 紫霞殿四老联署册封四阶长老，一纸伪造血书暗掀风暴`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD on Mount Huashan / Guanzhong. Depicting scene "荣膺长老 · 紫霞殿四老联署册封四阶长老，一纸伪造血书暗掀风暴" from 《雁塔风雷 · 京兆除魔》. Central figure is a Huashan Qi-lineage disciple in clean cyan-white and dawn-purple Northern Song Daoist-scholar sword robe with long steel/purple-glow jian. Steep granite cliffs of Mount Huashan, ancient pines, sea of clouds, Song-era Daoist timber halls, authentic mineral pigments (azurite, malachite, cinnabar,ink wash), dynamic martial choreography, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 226. `CG-QST-226`：恶客夜袭 · 四大恶人率五百西夏一品堂死士火把如龙奇袭西岳

- **关联文件**：[`src/data/quests/sects/huashanQiZixiaAwakenQuest.ts`](../src/data/quests/sects/huashanQiZixiaAwakenQuest.ts)
- **目标路径**：`public/assets/quests/hs_q17_four_evils_raid.jpg`
- **画框题跋**：`恶客夜袭 · 四大恶人率五百西夏一品堂死士火把如龙奇袭西岳`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD on Mount Huashan / Guanzhong. Depicting scene "恶客夜袭 · 四大恶人率五百西夏一品堂死士火把如龙奇袭西岳" from 《血染玉女 · 紫霞传薪》. Central figure is a Huashan Qi-lineage disciple in clean cyan-white and dawn-purple Northern Song Daoist-scholar sword robe with long steel/purple-glow jian. Steep granite cliffs of Mount Huashan, ancient pines, sea of clouds, Song-era Daoist timber halls, authentic mineral pigments (azurite, malachite, cinnabar,ink wash), dynamic martial choreography, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 227. `CG-QST-227`：掌门喋血 · 岳沧溟殿前独抗段延庆一阳指铁杖与岳老三夹击负创

- **关联文件**：[`src/data/quests/sects/huashanQiZixiaAwakenQuest.ts`](../src/data/quests/sects/huashanQiZixiaAwakenQuest.ts)
- **目标路径**：`public/assets/quests/hs_q17_yue_hold_gate.jpg`
- **画框题跋**：`掌门喋血 · 岳沧溟殿前独抗段延庆一阳指铁杖与岳老三夹击负创`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD on Mount Huashan / Guanzhong. Depicting scene "掌门喋血 · 岳沧溟殿前独抗段延庆一阳指铁杖与岳老三夹击负创" from 《血染玉女 · 紫霞传薪》. Central figure is a Huashan Qi-lineage disciple in clean cyan-white and dawn-purple Northern Song Daoist-scholar sword robe with long steel/purple-glow jian. Steep granite cliffs of Mount Huashan, ancient pines, sea of clouds, Song-era Daoist timber halls, authentic mineral pigments (azurite, malachite, cinnabar,ink wash), dynamic martial choreography, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 228. `CG-QST-228`：紫霞传薪 · 祖师灵位前岳沧溟倾囊传授天阶绝学紫霞神功先天太岳卷

- **关联文件**：[`src/data/quests/sects/huashanQiZixiaAwakenQuest.ts`](../src/data/quests/sects/huashanQiZixiaAwakenQuest.ts)
- **目标路径**：`public/assets/quests/hs_q17_zixia_impart.jpg`
- **画框题跋**：`紫霞传薪 · 祖师灵位前岳沧溟倾囊传授天阶绝学紫霞神功先天太岳卷`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD on Mount Huashan / Guanzhong. Depicting scene "紫霞传薪 · 祖师灵位前岳沧溟倾囊传授天阶绝学紫霞神功先天太岳卷" from 《血染玉女 · 紫霞传薪》. Central figure is a Huashan Qi-lineage disciple in clean cyan-white and dawn-purple Northern Song Daoist-scholar sword robe with long steel/purple-glow jian. Steep granite cliffs of Mount Huashan, ancient pines, sea of clouds, Song-era Daoist timber halls, authentic mineral pigments (azurite, malachite, cinnabar,ink wash), dynamic martial choreography, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 229. `CG-QST-229`：神剑托命 · 周天紫气大成，掌门亲授镇派神兵太岳紫霞长剑

- **关联文件**：[`src/data/quests/sects/huashanQiZixiaAwakenQuest.ts`](../src/data/quests/sects/huashanQiZixiaAwakenQuest.ts)
- **目标路径**：`public/assets/quests/hs_q17_sword_bestow.jpg`
- **画框题跋**：`神剑托命 · 周天紫气大成，掌门亲授镇派神兵太岳紫霞长剑`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD on Mount Huashan / Guanzhong. Depicting scene "神剑托命 · 周天紫气大成，掌门亲授镇派神兵太岳紫霞长剑" from 《血染玉女 · 紫霞传薪》. Central figure is a Huashan Qi-lineage disciple in clean cyan-white and dawn-purple Northern Song Daoist-scholar sword robe with long steel/purple-glow jian. Steep granite cliffs of Mount Huashan, ancient pines, sea of clouds, Song-era Daoist timber halls, authentic mineral pigments (azurite, malachite, cinnabar,ink wash), dynamic martial choreography, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 230. `CG-QST-230`：紫虹破门 · 面泛紫霞推殿而出，十丈剑气瞬间斩断云中鹤钢爪

- **关联文件**：[`src/data/quests/sects/huashanQiZixiaAwakenQuest.ts`](../src/data/quests/sects/huashanQiZixiaAwakenQuest.ts)
- **目标路径**：`public/assets/quests/hs_q17_purple_rainbow.jpg`
- **画框题跋**：`紫虹破门 · 面泛紫霞推殿而出，十丈剑气瞬间斩断云中鹤钢爪`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD on Mount Huashan / Guanzhong. Depicting scene "紫虹破门 · 面泛紫霞推殿而出，十丈剑气瞬间斩断云中鹤钢爪" from 《血染玉女 · 紫霞传薪》. Central figure is a Huashan Qi-lineage disciple in clean cyan-white and dawn-purple Northern Song Daoist-scholar sword robe with long steel/purple-glow jian. Steep granite cliffs of Mount Huashan, ancient pines, sea of clouds, Song-era Daoist timber halls, authentic mineral pigments (azurite, malachite, cinnabar,ink wash), dynamic martial choreography, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 231. `CG-QST-231`：硬撼恶首 · 紫霞剑气激斗二十合震飞段延庆铁杖，一品堂溃逃下山

- **关联文件**：[`src/data/quests/sects/huashanQiZixiaAwakenQuest.ts`](../src/data/quests/sects/huashanQiZixiaAwakenQuest.ts)
- **目标路径**：`public/assets/quests/hs_q17_duan_staff_fly.jpg`
- **画框题跋**：`硬撼恶首 · 紫霞剑气激斗二十合震飞段延庆铁杖，一品堂溃逃下山`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD on Mount Huashan / Guanzhong. Depicting scene "硬撼恶首 · 紫霞剑气激斗二十合震飞段延庆铁杖，一品堂溃逃下山" from 《血染玉女 · 紫霞传薪》. Central figure is a Huashan Qi-lineage disciple in clean cyan-white and dawn-purple Northern Song Daoist-scholar sword robe with long steel/purple-glow jian. Steep granite cliffs of Mount Huashan, ancient pines, sea of clouds, Song-era Daoist timber halls, authentic mineral pigments (azurite, malachite, cinnabar,ink wash), dynamic martial choreography, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 232. `CG-QST-232`：绝壁追凶 · 西岳浴血之夜追击西夏绝顶剑客再入思过崖古剑刻石室

- **关联文件**：[`src/data/quests/sects/huashanJianDuguNineQuest.ts`](../src/data/quests/sects/huashanJianDuguNineQuest.ts)
- **目标路径**：`public/assets/quests/hs_q18_cliff_pursuit.jpg`
- **画框题跋**：`绝壁追凶 · 西岳浴血之夜追击西夏绝顶剑客再入思过崖古剑刻石室`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD on Mount Huashan / Guanzhong. Depicting scene "绝壁追凶 · 西岳浴血之夜追击西夏绝顶剑客再入思过崖古剑刻石室" from 《思过绝壁 · 独孤求败》. Central figure is a Huashan Qi-lineage disciple in clean cyan-white and dawn-purple Northern Song Daoist-scholar sword robe with long steel/purple-glow jian. Steep granite cliffs of Mount Huashan, ancient pines, sea of clouds, Song-era Daoist timber halls, authentic mineral pigments (azurite, malachite, cinnabar,ink wash), dynamic martial choreography, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 233. `CG-QST-233`：剑气破壁 · 轰碎石室最深处风化暗壁，惊现百年剑魔隐居石窟

- **关联文件**：[`src/data/quests/sects/huashanJianDuguNineQuest.ts`](../src/data/quests/sects/huashanJianDuguNineQuest.ts)
- **目标路径**：`public/assets/quests/hs_q18_hidden_grotto.jpg`
- **画框题跋**：`剑气破壁 · 轰碎石室最深处风化暗壁，惊现百年剑魔隐居石窟`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD on Mount Huashan / Guanzhong. Depicting scene "剑气破壁 · 轰碎石室最深处风化暗壁，惊现百年剑魔隐居石窟" from 《思过绝壁 · 独孤求败》. Central figure is a Huashan Qi-lineage disciple in clean cyan-white and dawn-purple Northern Song Daoist-scholar sword robe with long steel/purple-glow jian. Steep granite cliffs of Mount Huashan, ancient pines, sea of clouds, Song-era Daoist timber halls, authentic mineral pigments (azurite, malachite, cinnabar,ink wash), dynamic martial choreography, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 234. `CG-QST-234`：求败遗刻 · 仰观“败尽英雄天下更无抗手”孤傲铭文与九剑总纲

- **关联文件**：[`src/data/quests/sects/huashanJianDuguNineQuest.ts`](../src/data/quests/sects/huashanJianDuguNineQuest.ts)
- **目标路径**：`public/assets/quests/hs_q18_dugu_inscription.jpg`
- **画框题跋**：`求败遗刻 · 仰观“败尽英雄天下更无抗手”孤傲铭文与九剑总纲`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD on Mount Huashan / Guanzhong. Depicting scene "求败遗刻 · 仰观“败尽英雄天下更无抗手”孤傲铭文与九剑总纲" from 《思过绝壁 · 独孤求败》. Central figure is a Huashan Qi-lineage disciple in clean cyan-white and dawn-purple Northern Song Daoist-scholar sword robe with long steel/purple-glow jian. Steep granite cliffs of Mount Huashan, ancient pines, sea of clouds, Song-era Daoist timber halls, authentic mineral pigments (azurite, malachite, cinnabar,ink wash), dynamic martial choreography, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 235. `CG-QST-235`：风雷悟剑 · 绝壁惊雷夜剑心通明，一朝顿悟天阶绝学独孤九剑

- **关联文件**：[`src/data/quests/sects/huashanJianDuguNineQuest.ts`](../src/data/quests/sects/huashanJianDuguNineQuest.ts)
- **目标路径**：`public/assets/quests/hs_q18_thunder_enlighten.jpg`
- **画框题跋**：`风雷悟剑 · 绝壁惊雷夜剑心通明，一朝顿悟天阶绝学独孤九剑`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD on Mount Huashan / Guanzhong. Depicting scene "风雷悟剑 · 绝壁惊雷夜剑心通明，一朝顿悟天阶绝学独孤九剑" from 《思过绝壁 · 独孤求败》. Central figure is a Huashan Qi-lineage disciple in clean cyan-white and dawn-purple Northern Song Daoist-scholar sword robe with long steel/purple-glow jian. Steep granite cliffs of Mount Huashan, ancient pines, sea of clouds, Song-era Daoist timber halls, authentic mineral pigments (azurite, malachite, cinnabar,ink wash), dynamic martial choreography, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 236. `CG-QST-236`：天外飞仙 · 一剑掠至紫霞观前，破箭式瞬间尽扫西夏漫天强弩

- **关联文件**：[`src/data/quests/sects/huashanJianDuguNineQuest.ts`](../src/data/quests/sects/huashanJianDuguNineQuest.ts)
- **目标路径**：`public/assets/quests/hs_q18_pojian_volley.jpg`
- **画框题跋**：`天外飞仙 · 一剑掠至紫霞观前，破箭式瞬间尽扫西夏漫天强弩`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD on Mount Huashan / Guanzhong. Depicting scene "天外飞仙 · 一剑掠至紫霞观前，破箭式瞬间尽扫西夏漫天强弩" from 《思过绝壁 · 独孤求败》. Central figure is a Huashan Qi-lineage disciple in clean cyan-white and dawn-purple Northern Song Daoist-scholar sword robe with long steel/purple-glow jian. Steep granite cliffs of Mount Huashan, ancient pines, sea of clouds, Song-era Daoist timber halls, authentic mineral pigments (azurite, malachite, cinnabar,ink wash), dynamic martial choreography, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 237. `CG-QST-237`：破气惊神 · 独孤九剑直指一阳指气机命门，十招刺伤段延庆逼退四恶

- **关联文件**：[`src/data/quests/sects/huashanJianDuguNineQuest.ts`](../src/data/quests/sects/huashanJianDuguNineQuest.ts)
- **目标路径**：`public/assets/quests/hs_q18_poqi_duan.jpg`
- **画框题跋**：`破气惊神 · 独孤九剑直指一阳指气机命门，十招刺伤段延庆逼退四恶`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD on Mount Huashan / Guanzhong. Depicting scene "破气惊神 · 独孤九剑直指一阳指气机命门，十招刺伤段延庆逼退四恶" from 《思过绝壁 · 独孤求败》. Central figure is a Huashan Qi-lineage disciple in clean cyan-white and dawn-purple Northern Song Daoist-scholar sword robe with long steel/purple-glow jian. Steep granite cliffs of Mount Huashan, ancient pines, sea of clouds, Song-era Daoist timber halls, authentic mineral pigments (azurite, malachite, cinnabar,ink wash), dynamic martial choreography, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 238. `CG-QST-238`：紫衫出关 · 身披紫霞衫手持太岳剑，率百名华山剑士星夜下潼关

- **关联文件**：[`src/data/quests/sects/huashanEndingZixiaMasterQuest.ts`](../src/data/quests/sects/huashanEndingZixiaMasterQuest.ts)
- **目标路径**：`public/assets/quests/hs_q19_night_march.jpg`
- **画框题跋**：`紫衫出关 · 身披紫霞衫手持太岳剑，率百名华山剑士星夜下潼关`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD on Mount Huashan / Guanzhong. Depicting scene "紫衫出关 · 身披紫霞衫手持太岳剑，率百名华山剑士星夜下潼关" from 《紫霞浩荡 · 太岳正主》. Central figure is a Huashan Qi-lineage disciple in clean cyan-white and dawn-purple Northern Song Daoist-scholar sword robe with long steel/purple-glow jian. Steep granite cliffs of Mount Huashan, ancient pines, sea of clouds, Song-era Daoist timber halls, authentic mineral pigments (azurite, malachite, cinnabar,ink wash), dynamic martial choreography, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 239. `CG-QST-239`：紫气十里 · 月夜风陵荒原圆满紫霞神功浩荡席卷西夏一品堂大营

- **关联文件**：[`src/data/quests/sects/huashanEndingZixiaMasterQuest.ts`](../src/data/quests/sects/huashanEndingZixiaMasterQuest.ts)
- **目标路径**：`public/assets/quests/hs_q19_fengling_charge.jpg`
- **画框题跋**：`紫气十里 · 月夜风陵荒原圆满紫霞神功浩荡席卷西夏一品堂大营`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD on Mount Huashan / Guanzhong. Depicting scene "紫气十里 · 月夜风陵荒原圆满紫霞神功浩荡席卷西夏一品堂大营" from 《紫霞浩荡 · 太岳正主》. Central figure is a Huashan Qi-lineage disciple in clean cyan-white and dawn-purple Northern Song Daoist-scholar sword robe with long steel/purple-glow jian. Steep granite cliffs of Mount Huashan, ancient pines, sea of clouds, Song-era Daoist timber halls, authentic mineral pigments (azurite, malachite, cinnabar,ink wash), dynamic martial choreography, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 240. `CG-QST-240`：阵斩元凶 · 万军丛中太岳紫霞剑正面斩杀西夏关中主帅拓跋雄

- **关联文件**：[`src/data/quests/sects/huashanEndingZixiaMasterQuest.ts`](../src/data/quests/sects/huashanEndingZixiaMasterQuest.ts)
- **目标路径**：`public/assets/quests/hs_q19_slay_tuoba.jpg`
- **画框题跋**：`阵斩元凶 · 万军丛中太岳紫霞剑正面斩杀西夏关中主帅拓跋雄`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD on Mount Huashan / Guanzhong. Depicting scene "阵斩元凶 · 万军丛中太岳紫霞剑正面斩杀西夏关中主帅拓跋雄" from 《紫霞浩荡 · 太岳正主》. Central figure is a Huashan Qi-lineage disciple in clean cyan-white and dawn-purple Northern Song Daoist-scholar sword robe with long steel/purple-glow jian. Steep granite cliffs of Mount Huashan, ancient pines, sea of clouds, Song-era Daoist timber halls, authentic mineral pigments (azurite, malachite, cinnabar,ink wash), dynamic martial choreography, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 241. `CG-QST-241`：烈火靖关 · 焚尽一品堂粮草军械，彻底粉碎西夏染指关中之谋

- **关联文件**：[`src/data/quests/sects/huashanEndingZixiaMasterQuest.ts`](../src/data/quests/sects/huashanEndingZixiaMasterQuest.ts)
- **目标路径**：`public/assets/quests/hs_q19_burn_camp.jpg`
- **画框题跋**：`烈火靖关 · 焚尽一品堂粮草军械，彻底粉碎西夏染指关中之谋`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD on Mount Huashan / Guanzhong. Depicting scene "烈火靖关 · 焚尽一品堂粮草军械，彻底粉碎西夏染指关中之谋" from 《紫霞浩荡 · 太岳正主》. Central figure is a Huashan Qi-lineage disciple in clean cyan-white and dawn-purple Northern Song Daoist-scholar sword robe with long steel/purple-glow jian. Steep granite cliffs of Mount Huashan, ancient pines, sea of clouds, Song-era Daoist timber halls, authentic mineral pigments (azurite, malachite, cinnabar,ink wash), dynamic martial choreography, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 242. `CG-QST-242`：太岳正主 · 漫天朝阳紫气中岳沧溟四老冠簪授印，登位华山派掌门

- **关联文件**：[`src/data/quests/sects/huashanEndingZixiaMasterQuest.ts`](../src/data/quests/sects/huashanEndingZixiaMasterQuest.ts)
- **目标路径**：`public/assets/quests/hs_q19_master_coronation.jpg`
- **画框题跋**：`太岳正主 · 漫天朝阳紫气中岳沧溟四老冠簪授印，登位华山派掌门`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD on Mount Huashan / Guanzhong. Depicting scene "太岳正主 · 漫天朝阳紫气中岳沧溟四老冠簪授印，登位华山派掌门" from 《紫霞浩荡 · 太岳正主》. Central figure is a Huashan Qi-lineage disciple in clean cyan-white and dawn-purple Northern Song Daoist-scholar sword robe with long steel/purple-glow jian. Steep granite cliffs of Mount Huashan, ancient pines, sea of clouds, Song-era Daoist timber halls, authentic mineral pigments (azurite, malachite, cinnabar,ink wash), dynamic martial choreography, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 243. `CG-QST-243`：执剑逼宫 · 封不弃率剑宗拥戴，踏雪直上玉女峰终结气宗统治

- **关联文件**：[`src/data/quests/sects/huashanEndingSwordUsurpQuest.ts`](../src/data/quests/sects/huashanEndingSwordUsurpQuest.ts)
- **目标路径**：`public/assets/quests/hs_q20_snow_march_yunv.jpg`
- **画框题跋**：`执剑逼宫 · 封不弃率剑宗拥戴，踏雪直上玉女峰终结气宗统治`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD on Mount Huashan / Guanzhong. Depicting scene "执剑逼宫 · 封不弃率剑宗拥戴，踏雪直上玉女峰终结气宗统治" from 《剑压紫霞 · 逆夺太岳》. Central figure is a Huashan Qi-lineage disciple in clean cyan-white and dawn-purple Northern Song Daoist-scholar sword robe with long steel/purple-glow jian. Steep granite cliffs of Mount Huashan, ancient pines, sea of clouds, Song-era Daoist timber halls, authentic mineral pigments (azurite, malachite, cinnabar,ink wash), dynamic martial choreography, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 244. `CG-QST-244`：首关夺衫 · 东峰石坪破剑式挑碎高沧云剑幕，强夺华山紫霞剑客衫

- **关联文件**：[`src/data/quests/sects/huashanEndingSwordUsurpQuest.ts`](../src/data/quests/sects/huashanEndingSwordUsurpQuest.ts)
- **目标路径**：`public/assets/quests/hs_q20_defeat_gao.jpg`
- **画框题跋**：`首关夺衫 · 东峰石坪破剑式挑碎高沧云剑幕，强夺华山紫霞剑客衫`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD on Mount Huashan / Guanzhong. Depicting scene "首关夺衫 · 东峰石坪破剑式挑碎高沧云剑幕，强夺华山紫霞剑客衫" from 《剑压紫霞 · 逆夺太岳》. Central figure is a Huashan Qi-lineage disciple in clean cyan-white and dawn-purple Northern Song Daoist-scholar sword robe with long steel/purple-glow jian. Steep granite cliffs of Mount Huashan, ancient pines, sea of clouds, Song-era Daoist timber halls, authentic mineral pigments (azurite, malachite, cinnabar,ink wash), dynamic martial choreography, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 245. `CG-QST-245`：连闯双关 · 破掌式挫败宁清羽，苍龙岭十五合硬破潼关剑神秦烈山

- **关联文件**：[`src/data/quests/sects/huashanEndingSwordUsurpQuest.ts`](../src/data/quests/sects/huashanEndingSwordUsurpQuest.ts)
- **目标路径**：`public/assets/quests/hs_q20_break_ning_qin.jpg`
- **画框题跋**：`连闯双关 · 破掌式挫败宁清羽，苍龙岭十五合硬破潼关剑神秦烈山`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD on Mount Huashan / Guanzhong. Depicting scene "连闯双关 · 破掌式挫败宁清羽，苍龙岭十五合硬破潼关剑神秦烈山" from 《剑压紫霞 · 逆夺太岳》. Central figure is a Huashan Qi-lineage disciple in clean cyan-white and dawn-purple Northern Song Daoist-scholar sword robe with long steel/purple-glow jian. Steep granite cliffs of Mount Huashan, ancient pines, sea of clouds, Song-era Daoist timber halls, authentic mineral pigments (azurite, malachite, cinnabar,ink wash), dynamic martial choreography, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 246. `CG-QST-246`：剑撼紫霞 · 紫霞正气主殿独孤九剑破气式直刺岳沧溟漫天紫气漩涡

- **关联文件**：[`src/data/quests/sects/huashanEndingSwordUsurpQuest.ts`](../src/data/quests/sects/huashanEndingSwordUsurpQuest.ts)
- **目标路径**：`public/assets/quests/hs_q20_clash_yue_zixia.jpg`
- **画框题跋**：`剑撼紫霞 · 紫霞正气主殿独孤九剑破气式直刺岳沧溟漫天紫气漩涡`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD on Mount Huashan / Guanzhong. Depicting scene "剑撼紫霞 · 紫霞正气主殿独孤九剑破气式直刺岳沧溟漫天紫气漩涡" from 《剑压紫霞 · 逆夺太岳》. Central figure is a Huashan Qi-lineage disciple in clean cyan-white and dawn-purple Northern Song Daoist-scholar sword robe with long steel/purple-glow jian. Steep granite cliffs of Mount Huashan, ancient pines, sea of clouds, Song-era Daoist timber halls, authentic mineral pigments (azurite, malachite, cinnabar,ink wash), dynamic martial choreography, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 247. `CG-QST-247`：逆夺神锋 · 震飞岳沧溟佩剑拾起太岳紫霞长剑，下山屠灭风陵夏营

- **关联文件**：[`src/data/quests/sects/huashanEndingSwordUsurpQuest.ts`](../src/data/quests/sects/huashanEndingSwordUsurpQuest.ts)
- **目标路径**：`public/assets/quests/hs_q20_seize_taiyue_sword.jpg`
- **画框题跋**：`逆夺神锋 · 震飞岳沧溟佩剑拾起太岳紫霞长剑，下山屠灭风陵夏营`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD on Mount Huashan / Guanzhong. Depicting scene "逆夺神锋 · 震飞岳沧溟佩剑拾起太岳紫霞长剑，下山屠灭风陵夏营" from 《剑压紫霞 · 逆夺太岳》. Central figure is a Huashan Qi-lineage disciple in clean cyan-white and dawn-purple Northern Song Daoist-scholar sword robe with long steel/purple-glow jian. Steep granite cliffs of Mount Huashan, ancient pines, sea of clouds, Song-era Daoist timber halls, authentic mineral pigments (azurite, malachite, cinnabar,ink wash), dynamic martial choreography, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 248. `CG-QST-248`：西岳霸主 · 唯快不破登基西岳霸剑宗主，满山剑客俯首号令江湖

- **关联文件**：[`src/data/quests/sects/huashanEndingSwordUsurpQuest.ts`](../src/data/quests/sects/huashanEndingSwordUsurpQuest.ts)
- **目标路径**：`public/assets/quests/hs_q20_hegemon_throne.jpg`
- **画框题跋**：`西岳霸主 · 唯快不破登基西岳霸剑宗主，满山剑客俯首号令江湖`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD on Mount Huashan / Guanzhong. Depicting scene "西岳霸主 · 唯快不破登基西岳霸剑宗主，满山剑客俯首号令江湖" from 《剑压紫霞 · 逆夺太岳》. Central figure is a Huashan Qi-lineage disciple in clean cyan-white and dawn-purple Northern Song Daoist-scholar sword robe with long steel/purple-glow jian. Steep granite cliffs of Mount Huashan, ancient pines, sea of clouds, Song-era Daoist timber halls, authentic mineral pigments (azurite, malachite, cinnabar,ink wash), dynamic martial choreography, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 249. `CG-QST-249`：剑气并肩 · 与高沧云统率剑气两脉弟子同出潼关奇袭西夏大营

- **关联文件**：[`src/data/quests/sects/huashanEndingSwordHarmonyQuest.ts`](../src/data/quests/sects/huashanEndingSwordHarmonyQuest.ts)
- **目标路径**：`public/assets/quests/hs_q21_twin_lineage_march.jpg`
- **画框题跋**：`剑气并肩 · 与高沧云统率剑气两脉弟子同出潼关奇袭西夏大营`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD on Mount Huashan / Guanzhong. Depicting scene "剑气并肩 · 与高沧云统率剑气两脉弟子同出潼关奇袭西夏大营" from 《两仪归元 · 西岳共主》. Central figure is a Huashan Qi-lineage disciple in clean cyan-white and dawn-purple Northern Song Daoist-scholar sword robe with long steel/purple-glow jian. Steep granite cliffs of Mount Huashan, ancient pines, sea of clouds, Song-era Daoist timber halls, authentic mineral pigments (azurite, malachite, cinnabar,ink wash), dynamic martial choreography, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 250. `CG-QST-250`：九剑靖边 · 独孤九剑合紫霞剑阵一举荡平风陵敌营斩杀主帅拓跋雄

- **关联文件**：[`src/data/quests/sects/huashanEndingSwordHarmonyQuest.ts`](../src/data/quests/sects/huashanEndingSwordHarmonyQuest.ts)
- **目标路径**：`public/assets/quests/hs_q21_dugu_slay_tuoba.jpg`
- **画框题跋**：`九剑靖边 · 独孤九剑合紫霞剑阵一举荡平风陵敌营斩杀主帅拓跋雄`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD on Mount Huashan / Guanzhong. Depicting scene "九剑靖边 · 独孤九剑合紫霞剑阵一举荡平风陵敌营斩杀主帅拓跋雄" from 《两仪归元 · 西岳共主》. Central figure is a Huashan Qi-lineage disciple in clean cyan-white and dawn-purple Northern Song Daoist-scholar sword robe with long steel/purple-glow jian. Steep granite cliffs of Mount Huashan, ancient pines, sea of clouds, Song-era Daoist timber halls, authentic mineral pigments (azurite, malachite, cinnabar,ink wash), dynamic martial choreography, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 251. `CG-QST-251`：献旗止争 · 拒封不弃逼宫之议，当殿献上敌酋战旗痛陈剑气互济之理

- **关联文件**：[`src/data/quests/sects/huashanEndingSwordHarmonyQuest.ts`](../src/data/quests/sects/huashanEndingSwordHarmonyQuest.ts)
- **目标路径**：`public/assets/quests/hs_q21_present_banner.jpg`
- **画框题跋**：`献旗止争 · 拒封不弃逼宫之议，当殿献上敌酋战旗痛陈剑气互济之理`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD on Mount Huashan / Guanzhong. Depicting scene "献旗止争 · 拒封不弃逼宫之议，当殿献上敌酋战旗痛陈剑气互济之理" from 《两仪归元 · 西岳共主》. Central figure is a Huashan Qi-lineage disciple in clean cyan-white and dawn-purple Northern Song Daoist-scholar sword robe with long steel/purple-glow jian. Steep granite cliffs of Mount Huashan, ancient pines, sea of clouds, Song-era Daoist timber halls, authentic mineral pigments (azurite, malachite, cinnabar,ink wash), dynamic martial choreography, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 252. `CG-QST-252`：欣然禅位 · 岳沧溟老怀大慰亲传太岳紫霞剑，高沧云奉紫霞剑客衫

- **关联文件**：[`src/data/quests/sects/huashanEndingSwordHarmonyQuest.ts`](../src/data/quests/sects/huashanEndingSwordHarmonyQuest.ts)
- **目标路径**：`public/assets/quests/hs_q21_abdicate_ceremony.jpg`
- **画框题跋**：`欣然禅位 · 岳沧溟老怀大慰亲传太岳紫霞剑，高沧云奉紫霞剑客衫`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD on Mount Huashan / Guanzhong. Depicting scene "欣然禅位 · 岳沧溟老怀大慰亲传太岳紫霞剑，高沧云奉紫霞剑客衫" from 《两仪归元 · 西岳共主》. Central figure is a Huashan Qi-lineage disciple in clean cyan-white and dawn-purple Northern Song Daoist-scholar sword robe with long steel/purple-glow jian. Steep granite cliffs of Mount Huashan, ancient pines, sea of clouds, Song-era Daoist timber halls, authentic mineral pigments (azurite, malachite, cinnabar,ink wash), dynamic martial choreography, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 253. `CG-QST-253`：两仪归元 · 三十载纷争消弭，继任华山掌门开创剑气并尊盛世

- **关联文件**：[`src/data/quests/sects/huashanEndingSwordHarmonyQuest.ts`](../src/data/quests/sects/huashanEndingSwordHarmonyQuest.ts)
- **目标路径**：`public/assets/quests/hs_q21_harmony_master.jpg`
- **画框题跋**：`两仪归元 · 三十载纷争消弭，继任华山掌门开创剑气并尊盛世`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD on Mount Huashan / Guanzhong. Depicting scene "两仪归元 · 三十载纷争消弭，继任华山掌门开创剑气并尊盛世" from 《两仪归元 · 西岳共主》. Central figure is a Huashan Qi-lineage disciple in clean cyan-white and dawn-purple Northern Song Daoist-scholar sword robe with long steel/purple-glow jian. Steep granite cliffs of Mount Huashan, ancient pines, sea of clouds, Song-era Daoist timber halls, authentic mineral pigments (azurite, malachite, cinnabar,ink wash), dynamic martial choreography, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 254. `CG-QST-254`：绝顶开坛 · 大雪封山落雁峰白玉论剑坛重开甲子华山论剑，群雄毕至

- **关联文件**：[`src/data/quests/sects/huashanMountaintopSummitQuest.ts`](../src/data/quests/sects/huashanMountaintopSummitQuest.ts)
- **目标路径**：`public/assets/quests/hs_q22_snow_summit_open.jpg`
- **画框题跋**：`绝顶开坛 · 大雪封山落雁峰白玉论剑坛重开甲子华山论剑，群雄毕至`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD on Mount Huashan / Guanzhong. Depicting scene "绝顶开坛 · 大雪封山落雁峰白玉论剑坛重开甲子华山论剑，群雄毕至" from 《西岳绝顶 · 华山论剑》. Central figure is a Huashan Qi-lineage disciple in clean cyan-white and dawn-purple Northern Song Daoist-scholar sword robe with long steel/purple-glow jian. Steep granite cliffs of Mount Huashan, ancient pines, sea of clouds, Song-era Daoist timber halls, authentic mineral pigments (azurite, malachite, cinnabar,ink wash), dynamic martial choreography, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 255. `CG-QST-255`：十合破燕 · 白玉坛首战十合破去南慕容斗转星移，震落慕容复长剑

- **关联文件**：[`src/data/quests/sects/huashanMountaintopSummitQuest.ts`](../src/data/quests/sects/huashanMountaintopSummitQuest.ts)
- **目标路径**：`public/assets/quests/hs_q22_break_murongfu.jpg`
- **画框题跋**：`十合破燕 · 白玉坛首战十合破去南慕容斗转星移，震落慕容复长剑`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD on Mount Huashan / Guanzhong. Depicting scene "十合破燕 · 白玉坛首战十合破去南慕容斗转星移，震落慕容复长剑" from 《西岳绝顶 · 华山论剑》. Central figure is a Huashan Qi-lineage disciple in clean cyan-white and dawn-purple Northern Song Daoist-scholar sword robe with long steel/purple-glow jian. Steep granite cliffs of Mount Huashan, ancient pines, sea of clouds, Song-era Daoist timber halls, authentic mineral pigments (azurite, malachite, cinnabar,ink wash), dynamic martial choreography, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 256. `CG-QST-256`：暴雪战佛 · 漫天风雪硬撼吐蕃国师鸠摩智小无相功与炽烈火焰刀

- **关联文件**：[`src/data/quests/sects/huashanMountaintopSummitQuest.ts`](../src/data/quests/sects/huashanMountaintopSummitQuest.ts)
- **目标路径**：`public/assets/quests/hs_q22_clash_jiumozhi.jpg`
- **画框题跋**：`暴雪战佛 · 漫天风雪硬撼吐蕃国师鸠摩智小无相功与炽烈火焰刀`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD on Mount Huashan / Guanzhong. Depicting scene "暴雪战佛 · 漫天风雪硬撼吐蕃国师鸠摩智小无相功与炽烈火焰刀" from 《西岳绝顶 · 华山论剑》. Central figure is a Huashan Qi-lineage disciple in clean cyan-white and dawn-purple Northern Song Daoist-scholar sword robe with long steel/purple-glow jian. Steep granite cliffs of Mount Huashan, ancient pines, sea of clouds, Song-era Daoist timber halls, authentic mineral pigments (azurite, malachite, cinnabar,ink wash), dynamic martial choreography, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 257. `CG-QST-257`：剑碎刀影 · 绝顶剑芒劈散漫天火焰刀气，迫使大轮明王合十退坛

- **关联文件**：[`src/data/quests/sects/huashanMountaintopSummitQuest.ts`](../src/data/quests/sects/huashanMountaintopSummitQuest.ts)
- **目标路径**：`public/assets/quests/hs_q22_repel_jiumozhi.jpg`
- **画框题跋**：`剑碎刀影 · 绝顶剑芒劈散漫天火焰刀气，迫使大轮明王合十退坛`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD on Mount Huashan / Guanzhong. Depicting scene "剑碎刀影 · 绝顶剑芒劈散漫天火焰刀气，迫使大轮明王合十退坛" from 《西岳绝顶 · 华山论剑》. Central figure is a Huashan Qi-lineage disciple in clean cyan-white and dawn-purple Northern Song Daoist-scholar sword robe with long steel/purple-glow jian. Steep granite cliffs of Mount Huashan, ancient pines, sea of clouds, Song-era Daoist timber halls, authentic mineral pigments (azurite, malachite, cinnabar,ink wash), dynamic martial choreography, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 258. `CG-QST-258`：一剑惊老 · 灰衣老僧慕容博暗施参合指试探，被凌厉剑意一剑逼退

- **关联文件**：[`src/data/quests/sects/huashanMountaintopSummitQuest.ts`](../src/data/quests/sects/huashanMountaintopSummitQuest.ts)
- **目标路径**：`public/assets/quests/hs_q22_murongbo_probe.jpg`
- **画框题跋**：`一剑惊老 · 灰衣老僧慕容博暗施参合指试探，被凌厉剑意一剑逼退`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD on Mount Huashan / Guanzhong. Depicting scene "一剑惊老 · 灰衣老僧慕容博暗施参合指试探，被凌厉剑意一剑逼退" from 《西岳绝顶 · 华山论剑》. Central figure is a Huashan Qi-lineage disciple in clean cyan-white and dawn-purple Northern Song Daoist-scholar sword robe with long steel/purple-glow jian. Steep granite cliffs of Mount Huashan, ancient pines, sea of clouds, Song-era Daoist timber halls, authentic mineral pigments (azurite, malachite, cinnabar,ink wash), dynamic martial choreography, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 259. `CG-QST-259`：英雄邀战 · 北乔峰踏雪登峰摔碗痛饮，豪气干云邀印证武道极境

- **关联文件**：[`src/data/quests/sects/huashanMountaintopSummitQuest.ts`](../src/data/quests/sects/huashanMountaintopSummitQuest.ts)
- **目标路径**：`public/assets/quests/hs_q22_qiaofeng_toast.jpg`
- **画框题跋**：`英雄邀战 · 北乔峰踏雪登峰摔碗痛饮，豪气干云邀印证武道极境`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD on Mount Huashan / Guanzhong. Depicting scene "英雄邀战 · 北乔峰踏雪登峰摔碗痛饮，豪气干云邀印证武道极境" from 《西岳绝顶 · 华山论剑》. Central figure is a Huashan Qi-lineage disciple in clean cyan-white and dawn-purple Northern Song Daoist-scholar sword robe with long steel/purple-glow jian. Steep granite cliffs of Mount Huashan, ancient pines, sea of clouds, Song-era Daoist timber halls, authentic mineral pigments (azurite, malachite, cinnabar,ink wash), dynamic martial choreography, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 260. `CG-QST-260`：剑啸亢龙 · 降龙十八掌金龙虚影与华山至高剑意激荡落雁云霄二十合

- **关联文件**：[`src/data/quests/sects/huashanMountaintopSummitQuest.ts`](../src/data/quests/sects/huashanMountaintopSummitQuest.ts)
- **目标路径**：`public/assets/quests/hs_q22_dragon_vs_sword.jpg`
- **画框题跋**：`剑啸亢龙 · 降龙十八掌金龙虚影与华山至高剑意激荡落雁云霄二十合`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD on Mount Huashan / Guanzhong. Depicting scene "剑啸亢龙 · 降龙十八掌金龙虚影与华山至高剑意激荡落雁云霄二十合" from 《西岳绝顶 · 华山论剑》. Central figure is a Huashan Qi-lineage disciple in clean cyan-white and dawn-purple Northern Song Daoist-scholar sword robe with long steel/purple-glow jian. Steep granite cliffs of Mount Huashan, ancient pines, sea of clouds, Song-era Daoist timber halls, authentic mineral pigments (azurite, malachite, cinnabar,ink wash), dynamic martial choreography, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 261. `CG-QST-261`：万剑齐鸣 · 与乔峰抚掌痛饮结义，西岳华山登顶天下第一剑派绝巅

- **关联文件**：[`src/data/quests/sects/huashanMountaintopSummitQuest.ts`](../src/data/quests/sects/huashanMountaintopSummitQuest.ts)
- **目标路径**：`public/assets/quests/hs_q22_myriad_swords_roar.jpg`
- **画框题跋**：`万剑齐鸣 · 与乔峰抚掌痛饮结义，西岳华山登顶天下第一剑派绝巅`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD on Mount Huashan / Guanzhong. Depicting scene "万剑齐鸣 · 与乔峰抚掌痛饮结义，西岳华山登顶天下第一剑派绝巅" from 《西岳绝顶 · 华山论剑》. Central figure is a Huashan Qi-lineage disciple in clean cyan-white and dawn-purple Northern Song Daoist-scholar sword robe with long steel/purple-glow jian. Steep granite cliffs of Mount Huashan, ancient pines, sea of clouds, Song-era Daoist timber halls, authentic mineral pigments (azurite, malachite, cinnabar,ink wash), dynamic martial choreography, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 262. `CG-QST-262`：千味药廊突腾腥甜紫烟 · 毒观音唐红袖与唐天镖封院揪奸

- **关联文件**：[`src/data/quests/sects/tangmenEntryQuest.ts`](../src/data/quests/sects/tangmenEntryQuest.ts)
- **目标路径**：`public/assets/quests/tangmen_baicao_poison_smoke.jpg`
- **画框题跋**：`千味药廊突腾腥甜紫烟，毒观音唐红袖冷眼锁院揪内奸`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Chengdu, Sichuan. Inside a bustling Song-era open timber herbal drying corridor stacked with bamboo trays of Sichuan medicinal roots, two overturned woven herb baskets emit eerie wisps of violet-purple poisonous smoke while an elderly Song physician kneels with silver acupuncture needles beside a poisoned clerk. By the carved wooden pillars stand two elite Tangmen clan figures: a poised cold beauty in dark plum-violet Song narrow-sleeved attire holding a sheer purple silk veil, and a stern middle-aged enforcer in obsidian-cyan martial robes holding steel throwing darts, looking toward a calm young traveler in plain linen robes. Authentic Northern Song architectural joinery, mineral pigments (malachite, azurite, cinnabar, deep violet), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 263. `CG-QST-263`：幽涧五彩瘴雾翻涌 · 毒观音捻丸立潭畔试外姓死生胆魄

- **关联文件**：[`src/data/quests/sects/tangmenEntryQuest.ts`](../src/data/quests/sects/tangmenEntryQuest.ts)
- **目标路径**：`public/assets/quests/tangmen_wandu_miasma_pool.jpg`
- **画框题跋**：`幽涧五彩瘴雾翻涌，毒观音捻丸立潭畔试外姓死生胆魄`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color wuxia illustration, wide cinematic 16:9 composition around 1050 AD in a secluded misty bamboo gorge of Mount Qingcheng / Tangjiabao, Sichuan. An emerald-and-indigo mountain spirit pool shimmers with iridescent five-colored poisonous miasma mist, hanging vines, and faint crimson water serpents beneath the surface, with an iron-chain suspension bridge visible across a distant waterfall. Standing on a mossy boulder at the pool's edge, Tang Hongxiu in dark ink-purple Northern Song martial attire holds a gleaming black medicinal test pill between her fingers, facing a resolute young initiate stepping toward the cold glowing waters. Rich mineral pigments, atmospheric Sichuan bamboo sea mist, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 264. `CG-QST-264`：八角千簧铜轮悬顶 · 千手毒王唐无影与天机老祖唐鹤轩俯瞰立契

- **关联文件**：[`src/data/quests/sects/tangmenEntryQuest.ts`](../src/data/quests/sects/tangmenEntryQuest.ts)
- **目标路径**：`public/assets/quests/tangmen_qianhuang_tower_oath.jpg`
- **画框题跋**：`八角千簧铜轮悬顶，千手毒王唐无影与天机老祖唐鹤轩俯瞰立契之人`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD inside the grand octagonal Tianji Mechanism Tower of Tangjiabao, Sichuan. Massive interlocking bronze water-clock gears, tension springs, and Song-era wooden dougong brackets tower overhead in moody lantern light. On the dark ebony master throne sits Tangmen Patriarch Tang Wuying in imposing black-and-purple brocade robes, while white-bearded grand elder Tang Hexuan sits on an elevated bamboo-curtained dais cradling an intricate brass mechanism box; elders flank both sides as a young initiate presses a blood thumbprint onto a dark iron-gold covenant scroll in the center hall. Authentic Northern Song craftsmanship, mineral pigments, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 265. `CG-QST-265`：悬索修栈 · 苍龙岭百丈绝壁之上腰系麻绳与陈伯石匠共换铁索

- **关联文件**：[`src/data/quests/sects/huashanSideCanglongPathQuest.ts`](../src/data/quests/sects/huashanSideCanglongPathQuest.ts)
- **目标路径**：`public/assets/quests/hs_side01_cliff_repair.jpg`
- **画框题跋**：`悬索修栈 · 苍龙岭百丈绝壁之上腰系麻绳与陈伯石匠共换铁索`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Guanzhong / Mount Huashan / Longshan. Depicting scene "悬索修栈 · 苍龙岭百丈绝壁之上腰系麻绳与陈伯石匠共换铁索" from 《苍龙挑夫 · 栈道修缮记》. Central figure is a young Huashan Sect swordsman in authentic Northern Song cyan-and-white martial robes wielding a long jian. Authentic Northern Song architecture, mountains, pines, and mineral pigments (azurite, malachite, cinnabar, ink wash), dynamic wuxia atmosphere, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 266. `CG-QST-266`：浓雾断匪 · 湿滑石脊横剑立桩，入门十二式力擒断索悍匪

- **关联文件**：[`src/data/quests/sects/huashanSideCanglongPathQuest.ts`](../src/data/quests/sects/huashanSideCanglongPathQuest.ts)
- **目标路径**：`public/assets/quests/hs_side01_ridge_ambush.jpg`
- **画框题跋**：`浓雾断匪 · 湿滑石脊横剑立桩，入门十二式力擒断索悍匪`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Guanzhong / Mount Huashan / Longshan. Depicting scene "浓雾断匪 · 湿滑石脊横剑立桩，入门十二式力擒断索悍匪" from 《苍龙挑夫 · 栈道修缮记》. Central figure is a young Huashan Sect swordsman in authentic Northern Song cyan-and-white martial robes wielding a long jian. Authentic Northern Song architecture, mountains, pines, and mineral pigments (azurite, malachite, cinnabar, ink wash), dynamic wuxia atmosphere, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 267. `CG-QST-267`：溪涧护医 · 秦岭古洞外拔剑击退恶猎户，救下游方女医沈青黛

- **关联文件**：[`src/data/quests/sects/huashanSideQinlingHerbQuest.ts`](../src/data/quests/sects/huashanSideQinlingHerbQuest.ts)
- **目标路径**：`public/assets/quests/hs_side02_qinling_rescue.jpg`
- **画框题跋**：`溪涧护医 · 秦岭古洞外拔剑击退恶猎户，救下游方女医沈青黛`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Guanzhong / Mount Huashan / Longshan. Depicting scene "溪涧护医 · 秦岭古洞外拔剑击退恶猎户，救下游方女医沈青黛" from 《玉泉药香 · 秦岭采参行》. Central figure is a young Huashan Sect swordsman in authentic Northern Song cyan-and-white martial robes wielding a long jian. Authentic Northern Song architecture, mountains, pines, and mineral pigments (azurite, malachite, cinnabar, ink wash), dynamic wuxia atmosphere, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 268. `CG-QST-268`：山涧斩虎 · 夜雨篝火旁孤剑力毙秦岭吊睛猛虎，得赠紫阳老参

- **关联文件**：[`src/data/quests/sects/huashanSideQinlingHerbQuest.ts`](../src/data/quests/sects/huashanSideQinlingHerbQuest.ts)
- **目标路径**：`public/assets/quests/hs_side02_night_tiger.jpg`
- **画框题跋**：`山涧斩虎 · 夜雨篝火旁孤剑力毙秦岭吊睛猛虎，得赠紫阳老参`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Guanzhong / Mount Huashan / Longshan. Depicting scene "山涧斩虎 · 夜雨篝火旁孤剑力毙秦岭吊睛猛虎，得赠紫阳老参" from 《玉泉药香 · 秦岭采参行》. Central figure is a young Huashan Sect swordsman in authentic Northern Song cyan-and-white martial robes wielding a long jian. Authentic Northern Song architecture, mountains, pines, and mineral pigments (azurite, malachite, cinnabar, ink wash), dynamic wuxia atmosphere, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 269. `CG-QST-269`：博台解枰 · 绝顶石桌前执黑三子破陈抟希夷古谱残局

- **关联文件**：[`src/data/quests/sects/huashanSideBotaiChessQuest.ts`](../src/data/quests/sects/huashanSideBotaiChessQuest.ts)
- **目标路径**：`public/assets/quests/hs_side03_chen_tuan_go.jpg`
- **画框题跋**：`博台解枰 · 绝顶石桌前执黑三子破陈抟希夷古谱残局`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Guanzhong / Mount Huashan / Longshan. Depicting scene "博台解枰 · 绝顶石桌前执黑三子破陈抟希夷古谱残局" from 《博台纹枰 · 希夷残局录》. Central figure is a young Huashan Sect swordsman in authentic Northern Song cyan-and-white martial robes wielding a long jian. Authentic Northern Song architecture, mountains, pines, and mineral pigments (azurite, malachite, cinnabar, ink wash), dynamic wuxia atmosphere, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 270. `CG-QST-270`：以棋驭剑 · 识破慕容棋待诏袖箭暗算，十合剑势将其震落亭阶

- **关联文件**：[`src/data/quests/sects/huashanSideBotaiChessQuest.ts`](../src/data/quests/sects/huashanSideBotaiChessQuest.ts)
- **目标路径**：`public/assets/quests/hs_side03_chess_sword_duel.jpg`
- **画框题跋**：`以棋驭剑 · 识破慕容棋待诏袖箭暗算，十合剑势将其震落亭阶`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Guanzhong / Mount Huashan / Longshan. Depicting scene "以棋驭剑 · 识破慕容棋待诏袖箭暗算，十合剑势将其震落亭阶" from 《博台纹枰 · 希夷残局录》. Central figure is a young Huashan Sect swordsman in authentic Northern Song cyan-and-white martial robes wielding a long jian. Authentic Northern Song architecture, mountains, pines, and mineral pigments (azurite, malachite, cinnabar, ink wash), dynamic wuxia atmosphere, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 271. `CG-QST-271`：明德暗访 · 重临长安明德门秋雨茶棚，细察假冒华山剑客血案

- **关联文件**：[`src/data/quests/sects/huashanSideChanganImpostorQuest.ts`](../src/data/quests/sects/huashanSideChanganImpostorQuest.ts)
- **目标路径**：`public/assets/quests/hs_side04_mingde_inquiry.jpg`
- **画框题跋**：`明德暗访 · 重临长安明德门秋雨茶棚，细察假冒华山剑客血案`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Guanzhong / Mount Huashan / Longshan. Depicting scene "明德暗访 · 重临长安明德门秋雨茶棚，细察假冒华山剑客血案" from 《明德秋雨 · 长安捉刀客》. Central figure is a young Huashan Sect swordsman in authentic Northern Song cyan-and-white martial robes wielding a long jian. Authentic Northern Song architecture, mountains, pines, and mineral pigments (azurite, malachite, cinnabar, ink wash), dynamic wuxia atmosphere, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 272. `CG-QST-272`：雨脊擒凶 · 长安废园瓦脊正面震碎断魂剑柳残阳兵刃将其生擒

- **关联文件**：[`src/data/quests/sects/huashanSideChanganImpostorQuest.ts`](../src/data/quests/sects/huashanSideChanganImpostorQuest.ts)
- **目标路径**：`public/assets/quests/hs_side04_rooftop_capture.jpg`
- **画框题跋**：`雨脊擒凶 · 长安废园瓦脊正面震碎断魂剑柳残阳兵刃将其生擒`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Guanzhong / Mount Huashan / Longshan. Depicting scene "雨脊擒凶 · 长安废园瓦脊正面震碎断魂剑柳残阳兵刃将其生擒" from 《明德秋雨 · 长安捉刀客》. Central figure is a young Huashan Sect swordsman in authentic Northern Song cyan-and-white martial robes wielding a long jian. Authentic Northern Song architecture, mountains, pines, and mineral pigments (azurite, malachite, cinnabar, ink wash), dynamic wuxia atmosphere, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 273. `CG-QST-273`：朝阳温炉 · 东峰丹房雪夜运功控火，紫气与丹炉纯阳交融

- **关联文件**：[`src/data/quests/sects/huashanSideQiFurnaceQuest.ts`](../src/data/quests/sects/huashanSideQiFurnaceQuest.ts)
- **目标路径**：`public/assets/quests/hs_side05_furnace_qi.jpg`
- **画框题跋**：`朝阳温炉 · 东峰丹房雪夜运功控火，紫气与丹炉纯阳交融`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Guanzhong / Mount Huashan / Longshan. Depicting scene "朝阳温炉 · 东峰丹房雪夜运功控火，紫气与丹炉纯阳交融" from 《紫气丹炉 · 朝阳守火记》. Central figure is a Huashan Qi-lineage disciple in cyan-white and dawn-purple Northern Song Daoist-scholar robe wielding a long jian. Authentic Northern Song architecture, mountains, pines, and mineral pigments (azurite, malachite, cinnabar, ink wash), dynamic wuxia atmosphere, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 274. `CG-QST-274`：护炉斩毒 · 方寸丹室以养吾剑与混元掌力毙星宿盗药二恶徒

- **关联文件**：[`src/data/quests/sects/huashanSideQiFurnaceQuest.ts`](../src/data/quests/sects/huashanSideQiFurnaceQuest.ts)
- **目标路径**：`public/assets/quests/hs_side05_poison_raid.jpg`
- **画框题跋**：`护炉斩毒 · 方寸丹室以养吾剑与混元掌力毙星宿盗药二恶徒`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Guanzhong / Mount Huashan / Longshan. Depicting scene "护炉斩毒 · 方寸丹室以养吾剑与混元掌力毙星宿盗药二恶徒" from 《紫气丹炉 · 朝阳守火记》. Central figure is a Huashan Qi-lineage disciple in cyan-white and dawn-purple Northern Song Daoist-scholar robe wielding a long jian. Authentic Northern Song architecture, mountains, pines, and mineral pigments (azurite, malachite, cinnabar, ink wash), dynamic wuxia atmosphere, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 275. `CG-QST-275`：黄土伏骑 · 严冬黄河冰封，随边军老斥候潜伏十里烽燧断崖

- **关联文件**：[`src/data/quests/sects/huashanSideJianTongguanQuest.ts`](../src/data/quests/sects/huashanSideJianTongguanQuest.ts)
- **目标路径**：`public/assets/quests/hs_side06_loess_ambush.jpg`
- **画框题跋**：`黄土伏骑 · 严冬黄河冰封，随边军老斥候潜伏十里烽燧断崖`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Guanzhong / Mount Huashan / Longshan. Depicting scene "黄土伏骑 · 严冬黄河冰封，随边军老斥候潜伏十里烽燧断崖" from 《潼关试铁 · 百步断刃行》. Central figure is a Huashan Sword-lineage disciple in slate-indigo and white Northern Song swordsman robe wielding a swift cold-gleaming jian. Authentic Northern Song architecture, mountains, pines, and mineral pigments (azurite, malachite, cinnabar, ink wash), dynamic wuxia atmosphere, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 276. `CG-QST-276`：百步断刃 · 落雁快剑掠马交错一瞬斩断党项百夫长冷锻弯刀

- **关联文件**：[`src/data/quests/sects/huashanSideJianTongguanQuest.ts`](../src/data/quests/sects/huashanSideJianTongguanQuest.ts)
- **目标路径**：`public/assets/quests/hs_side06_sever_saber.jpg`
- **画框题跋**：`百步断刃 · 落雁快剑掠马交错一瞬斩断党项百夫长冷锻弯刀`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Guanzhong / Mount Huashan / Longshan. Depicting scene "百步断刃 · 落雁快剑掠马交错一瞬斩断党项百夫长冷锻弯刀" from 《潼关试铁 · 百步断刃行》. Central figure is a Huashan Sword-lineage disciple in slate-indigo and white Northern Song swordsman robe wielding a swift cold-gleaming jian. Authentic Northern Song architecture, mountains, pines, and mineral pigments (azurite, malachite, cinnabar, ink wash), dynamic wuxia atmosphere, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 277. `CG-QST-277`：麦坪拆契 · 渭北金黄麦浪前核账揭穿霸天虎阴阳印子钱毒计

- **关联文件**：[`src/data/quests/sects/huashanSideWeibeiHarvestQuest.ts`](../src/data/quests/sects/huashanSideWeibeiHarvestQuest.ts)
- **目标路径**：`public/assets/quests/hs_side07_audit_ledger.jpg`
- **画框题跋**：`麦坪拆契 · 渭北金黄麦浪前核账揭穿霸天虎阴阳印子钱毒计`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Guanzhong / Mount Huashan / Longshan. Depicting scene "麦坪拆契 · 渭北金黄麦浪前核账揭穿霸天虎阴阳印子钱毒计" from 《渭北麦浪 · 侠剑护夏收》. Central figure is a young Huashan Sect swordsman in authentic Northern Song cyan-and-white martial robes wielding a long jian. Authentic Northern Song architecture, mountains, pines, and mineral pigments (azurite, malachite, cinnabar, ink wash), dynamic wuxia atmosphere, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 278. `CG-QST-278`：麦浪斩钩 · 滚滚麦穗间长剑破双钩鬼哭贺兰狰，焚毁百顷黑契

- **关联文件**：[`src/data/quests/sects/huashanSideWeibeiHarvestQuest.ts`](../src/data/quests/sects/huashanSideWeibeiHarvestQuest.ts)
- **目标路径**：`public/assets/quests/hs_side07_wheat_duel.jpg`
- **画框题跋**：`麦浪斩钩 · 滚滚麦穗间长剑破双钩鬼哭贺兰狰，焚毁百顷黑契`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Guanzhong / Mount Huashan / Longshan. Depicting scene "麦浪斩钩 · 滚滚麦穗间长剑破双钩鬼哭贺兰狰，焚毁百顷黑契" from 《渭北麦浪 · 侠剑护夏收》. Central figure is a young Huashan Sect swordsman in authentic Northern Song cyan-and-white martial robes wielding a long jian. Authentic Northern Song architecture, mountains, pines, and mineral pigments (azurite, malachite, cinnabar, ink wash), dynamic wuxia atmosphere, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 279. `CG-QST-279`：鬼市辨剑 · 佩面夜探骊山地下鬼市，火光幽冥中识得青霜古剑

- **关联文件**：[`src/data/quests/sects/huashanSideLishanGhostMarketQuest.ts`](../src/data/quests/sects/huashanSideLishanGhostMarketQuest.ts)
- **目标路径**：`public/assets/quests/hs_side08_ghost_market.jpg`
- **画框题跋**：`鬼市辨剑 · 佩面夜探骊山地下鬼市，火光幽冥中识得青霜古剑`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Guanzhong / Mount Huashan / Longshan. Depicting scene "鬼市辨剑 · 佩面夜探骊山地下鬼市，火光幽冥中识得青霜古剑" from 《骊山鬼市 · 古剑寻踪录》. Central figure is a young Huashan Sect swordsman in authentic Northern Song cyan-and-white martial robes wielding a long jian. Authentic Northern Song architecture, mountains, pines, and mineral pigments (azurite, malachite, cinnabar, ink wash), dynamic wuxia atmosphere, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 280. `CG-QST-280`：松林截剑 · 华清后山冷月下孤剑力战断金帮副帮主与辽国密使

- **关联文件**：[`src/data/quests/sects/huashanSideLishanGhostMarketQuest.ts`](../src/data/quests/sects/huashanSideLishanGhostMarketQuest.ts)
- **目标路径**：`public/assets/quests/hs_side08_pine_intercept.jpg`
- **画框题跋**：`松林截剑 · 华清后山冷月下孤剑力战断金帮副帮主与辽国密使`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Guanzhong / Mount Huashan / Longshan. Depicting scene "松林截剑 · 华清后山冷月下孤剑力战断金帮副帮主与辽国密使" from 《骊山鬼市 · 古剑寻踪录》. Central figure is a young Huashan Sect swordsman in authentic Northern Song cyan-and-white martial robes wielding a long jian. Authentic Northern Song architecture, mountains, pines, and mineral pigments (azurite, malachite, cinnabar, ink wash), dynamic wuxia atmosphere, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 281. `CG-QST-281`：白玉还锋 · 落雁峰白玉坛双手奉还青霜古剑，秦烈山抚剑动容

- **关联文件**：[`src/data/quests/sects/huashanSideLishanGhostMarketQuest.ts`](../src/data/quests/sects/huashanSideLishanGhostMarketQuest.ts)
- **目标路径**：`public/assets/quests/hs_side08_return_sword.jpg`
- **画框题跋**：`白玉还锋 · 落雁峰白玉坛双手奉还青霜古剑，秦烈山抚剑动容`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Guanzhong / Mount Huashan / Longshan. Depicting scene "白玉还锋 · 落雁峰白玉坛双手奉还青霜古剑，秦烈山抚剑动容" from 《骊山鬼市 · 古剑寻踪录》. Central figure is a young Huashan Sect swordsman in authentic Northern Song cyan-and-white martial robes wielding a long jian. Authentic Northern Song architecture, mountains, pines, and mineral pigments (azurite, malachite, cinnabar, ink wash), dynamic wuxia atmosphere, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 282. `CG-QST-282`：终南论道 · 古观大殿坐而论经，陈抟阴阳剑理折服关中玄门

- **关联文件**：[`src/data/quests/sects/huashanSideZhongnanTaoQuest.ts`](../src/data/quests/sects/huashanSideZhongnanTaoQuest.ts)
- **目标路径**：`public/assets/quests/hs_side09_dao_debate.jpg`
- **画框题跋**：`终南论道 · 古观大殿坐而论经，陈抟阴阳剑理折服关中玄门`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Guanzhong / Mount Huashan / Longshan. Depicting scene "终南论道 · 古观大殿坐而论经，陈抟阴阳剑理折服关中玄门" from 《终南论道 · 金莲净火劫》. Central figure is a young Huashan Sect swordsman in authentic Northern Song cyan-and-white martial robes wielding a long jian. Authentic Northern Song architecture, mountains, pines, and mineral pigments (azurite, malachite, cinnabar, ink wash), dynamic wuxia atmosphere, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 283. `CG-QST-283`：净火破邪 · 丹墀之上浩然太岳剑势斩断狮吼子毒铜钹将其逐山

- **关联文件**：[`src/data/quests/sects/huashanSideZhongnanTaoQuest.ts`](../src/data/quests/sects/huashanSideZhongnanTaoQuest.ts)
- **目标路径**：`public/assets/quests/hs_side09_shihouzi_clash.jpg`
- **画框题跋**：`净火破邪 · 丹墀之上浩然太岳剑势斩断狮吼子毒铜钹将其逐山`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Guanzhong / Mount Huashan / Longshan. Depicting scene "净火破邪 · 丹墀之上浩然太岳剑势斩断狮吼子毒铜钹将其逐山" from 《终南论道 · 金莲净火劫》. Central figure is a young Huashan Sect swordsman in authentic Northern Song cyan-and-white martial robes wielding a long jian. Authentic Northern Song architecture, mountains, pines, and mineral pigments (azurite, malachite, cinnabar, ink wash), dynamic wuxia atmosphere, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 284. `CG-QST-284`：双剑西出 · 秦烈山破例下落雁峰，携主角并骑疾驰赴陇山古道

- **关联文件**：[`src/data/quests/sects/huashanSideLongshanBrokenSwordQuest.ts`](../src/data/quests/sects/huashanSideLongshanBrokenSwordQuest.ts)
- **目标路径**：`public/assets/quests/hs_side10_qin_ride_west.jpg`
- **画框题跋**：`双剑西出 · 秦烈山破例下落雁峰，携主角并骑疾驰赴陇山古道`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Guanzhong / Mount Huashan / Longshan. Depicting scene "双剑西出 · 秦烈山破例下落雁峰，携主角并骑疾驰赴陇山古道" from 《陇山断道 · 西夏折剑令》. Central figure is a young Huashan Sect swordsman in authentic Northern Song cyan-and-white martial robes wielding a long jian. Authentic Northern Song architecture, mountains, pines, and mineral pigments (azurite, malachite, cinnabar, ink wash), dynamic wuxia atmosphere, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 285. `CG-QST-285`：残阳破阵 · 芦苇如雪古烽燧下，与潼关剑神双剑合璧破金牌剑奴阵

- **关联文件**：[`src/data/quests/sects/huashanSideLongshanBrokenSwordQuest.ts`](../src/data/quests/sects/huashanSideLongshanBrokenSwordQuest.ts)
- **目标路径**：`public/assets/quests/hs_side10_slave_array.jpg`
- **画框题跋**：`残阳破阵 · 芦苇如雪古烽燧下，与潼关剑神双剑合璧破金牌剑奴阵`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Guanzhong / Mount Huashan / Longshan. Depicting scene "残阳破阵 · 芦苇如雪古烽燧下，与潼关剑神双剑合璧破金牌剑奴阵" from 《陇山断道 · 西夏折剑令》. Central figure is a young Huashan Sect swordsman in authentic Northern Song cyan-and-white martial robes wielding a long jian. Authentic Northern Song architecture, mountains, pines, and mineral pigments (azurite, malachite, cinnabar, ink wash), dynamic wuxia atmosphere, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 286. `CG-QST-286`：斩落魔陀 · 绝学震裂百斤玄铁重剑，一剑枭首西夏供奉赫连断岳

- **关联文件**：[`src/data/quests/sects/huashanSideLongshanBrokenSwordQuest.ts`](../src/data/quests/sects/huashanSideLongshanBrokenSwordQuest.ts)
- **目标路径**：`public/assets/quests/hs_side10_slay_helian.jpg`
- **画框题跋**：`斩落魔陀 · 绝学震裂百斤玄铁重剑，一剑枭首西夏供奉赫连断岳`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Guanzhong / Mount Huashan / Longshan. Depicting scene "斩落魔陀 · 绝学震裂百斤玄铁重剑，一剑枭首西夏供奉赫连断岳" from 《陇山断道 · 西夏折剑令》. Central figure is a young Huashan Sect swordsman in authentic Northern Song cyan-and-white martial robes wielding a long jian. Authentic Northern Song architecture, mountains, pines, and mineral pigments (azurite, malachite, cinnabar, ink wash), dynamic wuxia atmosphere, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 287. `CG-QST-287`：钟鼓禅院 · 五更晨钟响彻演武坪，虚松虚音开蒙授罗汉拳

- **关联文件**：[`src/data/quests/sects/shaolinLuohanInitQuest.ts`](../src/data/quests/sects/shaolinLuohanInitQuest.ts)
- **目标路径**：`public/assets/quests/sl_01_morning_bell.jpg`
- **画框题跋**：`钟鼓禅院 · 五更晨钟响彻演武坪，虚松虚音开蒙授罗汉拳`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD at Mount Song Shaolin Monastery in Henan. Depicting scene "钟鼓禅院 · 五更晨钟响彻演武坪，虚松虚音开蒙授罗汉拳" from 《晨钟木鱼 · 罗汉开蒙》. Authentic Northern Song Buddhist monastery architecture, ancient cypresses, stone courtyards, and monks in hemp gray-brown Northern Song Buddhist robes, mineral pigments (azurite, malachite, cinnabar, ink wash), atmospheric wuxia lighting, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 288. `CG-QST-288`：演武青石 · 罗汉拳连挫挂单恶僧与周海，玄痛巡堂嘉许

- **关联文件**：[`src/data/quests/sects/shaolinLuohanInitQuest.ts`](../src/data/quests/sects/shaolinLuohanInitQuest.ts)
- **目标路径**：`public/assets/quests/sl_01_luohan_duel.jpg`
- **画框题跋**：`演武青石 · 罗汉拳连挫挂单恶僧与周海，玄痛巡堂嘉许`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD at Mount Song Shaolin Monastery in Henan. Depicting scene "演武青石 · 罗汉拳连挫挂单恶僧与周海，玄痛巡堂嘉许" from 《晨钟木鱼 · 罗汉开蒙》. Authentic Northern Song Buddhist monastery architecture, ancient cypresses, stone courtyards, and monks in hemp gray-brown Northern Song Buddhist robes, mineral pigments (azurite, malachite, cinnabar, ink wash), atmospheric wuxia lighting, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 289. `CG-QST-289`：少室南麓 · 登封矿霸刘横强占庄田水渠，佃农与矿徒剑拔弩张

- **关联文件**：[`src/data/quests/sects/shaolinEstateDisputeQuest.ts`](../src/data/quests/sects/shaolinEstateDisputeQuest.ts)
- **目标路径**：`public/assets/quests/sl_02_estate_clash.jpg`
- **画框题跋**：`少室南麓 · 登封矿霸刘横强占庄田水渠，佃农与矿徒剑拔弩张`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD at Mount Song Shaolin Monastery in Henan. Depicting scene "少室南麓 · 登封矿霸刘横强占庄田水渠，佃农与矿徒剑拔弩张" from 《少室庄田 · 拳棍止争》. Authentic Northern Song Buddhist monastery architecture, ancient cypresses, stone courtyards, and monks in hemp gray-brown Northern Song Buddhist robes, mineral pigments (azurite, malachite, cinnabar, ink wash), atmospheric wuxia lighting, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 290. `CG-QST-290`：拳棍止争 · 伏虎拳近身擒王或齐眉棍横扫窄桥生擒刘横

- **关联文件**：[`src/data/quests/sects/shaolinEstateDisputeQuest.ts`](../src/data/quests/sects/shaolinEstateDisputeQuest.ts)
- **目标路径**：`public/assets/quests/sl_02_fist_staff_win.jpg`
- **画框题跋**：`拳棍止争 · 伏虎拳近身擒王或齐眉棍横扫窄桥生擒刘横`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD at Mount Song Shaolin Monastery in Henan. Depicting scene "拳棍止争 · 伏虎拳近身擒王或齐眉棍横扫窄桥生擒刘横" from 《少室庄田 · 拳棍止争》. Authentic Northern Song Buddhist monastery architecture, ancient cypresses, stone courtyards, and monks in hemp gray-brown Northern Song Buddhist robes, mineral pigments (azurite, malachite, cinnabar, ink wash), atmospheric wuxia lighting, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 291. `CG-QST-291`：古柏寒林 · 救下血污牙人贾通宝，力战黑市断魂刀赵魁

- **关联文件**：[`src/data/quests/sects/shaolinIncenseLedgerQuest.ts`](../src/data/quests/sects/shaolinIncenseLedgerQuest.ts)
- **目标路径**：`public/assets/quests/sl_03_pine_ambush.jpg`
- **画框题跋**：`古柏寒林 · 救下血污牙人贾通宝，力战黑市断魂刀赵魁`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD at Mount Song Shaolin Monastery in Henan. Depicting scene "古柏寒林 · 救下血污牙人贾通宝，力战黑市断魂刀赵魁" from 《香火黑账 · 知客暗流》. Authentic Northern Song Buddhist monastery architecture, ancient cypresses, stone courtyards, and monks in hemp gray-brown Northern Song Buddhist robes, mineral pigments (azurite, malachite, cinnabar, ink wash), atmospheric wuxia lighting, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 292. `CG-QST-292`：香火私册 · 钟鼓禅院孤灯验账，空名度牒黑幕水落石出

- **关联文件**：[`src/data/quests/sects/shaolinIncenseLedgerQuest.ts`](../src/data/quests/sects/shaolinIncenseLedgerQuest.ts)
- **目标路径**：`public/assets/quests/sl_03_incense_ledger.jpg`
- **画框题跋**：`香火私册 · 钟鼓禅院孤灯验账，空名度牒黑幕水落石出`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD at Mount Song Shaolin Monastery in Henan. Depicting scene "香火私册 · 钟鼓禅院孤灯验账，空名度牒黑幕水落石出" from 《香火黑账 · 知客暗流》. Authentic Northern Song Buddhist monastery architecture, ancient cypresses, stone courtyards, and monks in hemp gray-brown Northern Song Buddhist robes, mineral pigments (azurite, malachite, cinnabar, ink wash), atmospheric wuxia lighting, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 293. `CG-QST-293`：木桩百劫 · 十八铜人木桩廊机关齐发，棍影拳风破阵而出

- **关联文件**：[`src/data/quests/sects/shaolinWoodenDummyPromoteQuest.ts`](../src/data/quests/sects/shaolinWoodenDummyPromoteQuest.ts)
- **目标路径**：`public/assets/quests/sl_04_wooden_alley.jpg`
- **画框题跋**：`木桩百劫 · 十八铜人木桩廊机关齐发，棍影拳风破阵而出`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD at Mount Song Shaolin Monastery in Henan. Depicting scene "木桩百劫 · 十八铜人木桩廊机关齐发，棍影拳风破阵而出" from 《木桩百劫 · 铜人初试》. Authentic Northern Song Buddhist monastery architecture, ancient cypresses, stone courtyards, and monks in hemp gray-brown Northern Song Buddhist robes, mineral pigments (azurite, malachite, cinnabar, ink wash), atmospheric wuxia lighting, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 294. `CG-QST-294`：终场较技 · 演武正殿力挫外门劲敌慧通，禅武根基大成

- **关联文件**：[`src/data/quests/sects/shaolinWoodenDummyPromoteQuest.ts`](../src/data/quests/sects/shaolinWoodenDummyPromoteQuest.ts)
- **目标路径**：`public/assets/quests/sl_04_huitong_spar.jpg`
- **画框题跋**：`终场较技 · 演武正殿力挫外门劲敌慧通，禅武根基大成`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD at Mount Song Shaolin Monastery in Henan. Depicting scene "终场较技 · 演武正殿力挫外门劲敌慧通，禅武根基大成" from 《木桩百劫 · 铜人初试》. Authentic Northern Song Buddhist monastery architecture, ancient cypresses, stone courtyards, and monks in hemp gray-brown Northern Song Buddhist robes, mineral pigments (azurite, malachite, cinnabar, ink wash), atmospheric wuxia lighting, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 295. `CG-QST-295`：大雄丹墀 · 玄慈授罗汉伏虎功晋内门，罗汉达摩戒律俗家四脉分流

- **关联文件**：[`src/data/quests/sects/shaolinWoodenDummyPromoteQuest.ts`](../src/data/quests/sects/shaolinWoodenDummyPromoteQuest.ts)
- **目标路径**：`public/assets/quests/sl_04_four_branches.jpg`
- **画框题跋**：`大雄丹墀 · 玄慈授罗汉伏虎功晋内门，罗汉达摩戒律俗家四脉分流`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD at Mount Song Shaolin Monastery in Henan. Depicting scene "大雄丹墀 · 玄慈授罗汉伏虎功晋内门，罗汉达摩戒律俗家四脉分流" from 《木桩百劫 · 铜人初试》. Authentic Northern Song Buddhist monastery architecture, ancient cypresses, stone courtyards, and monks in hemp gray-brown Northern Song Buddhist robes, mineral pigments (azurite, malachite, cinnabar, ink wash), atmospheric wuxia lighting, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 296. `CG-QST-296`：少室大斋堂 · 灶膛抽薪，觉尘传授质朴刁钻拨火棍诀

- **关联文件**：[`src/data/quests/sects/shaolinSideFireStickQuest.ts`](../src/data/quests/sects/shaolinSideFireStickQuest.ts)
- **目标路径**：`public/assets/quests/sl_s01_kitchen_stick.jpg`
- **画框题跋**：`少室大斋堂 · 灶膛抽薪，觉尘传授质朴刁钻拨火棍诀`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD at Mount Song Shaolin Monastery in Henan. Depicting scene "少室大斋堂 · 灶膛抽薪，觉尘传授质朴刁钻拨火棍诀" from 《灶房残薪 · 烧火奇棍》. Authentic Northern Song Buddhist monastery architecture, ancient cypresses, stone courtyards, and monks in hemp gray-brown Northern Song Buddhist robes, mineral pigments (azurite, malachite, cinnabar, ink wash), atmospheric wuxia lighting, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 297. `CG-QST-297`：锅底乌灰 · 烧火奇棍连戳三贼下盘，满院僧众哄堂大笑

- **关联文件**：[`src/data/quests/sects/shaolinSideFireStickQuest.ts`](../src/data/quests/sects/shaolinSideFireStickQuest.ts)
- **目标路径**：`public/assets/quests/sl_s01_ash_thieves.jpg`
- **画框题跋**：`锅底乌灰 · 烧火奇棍连戳三贼下盘，满院僧众哄堂大笑`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD at Mount Song Shaolin Monastery in Henan. Depicting scene "锅底乌灰 · 烧火奇棍连戳三贼下盘，满院僧众哄堂大笑" from 《灶房残薪 · 烧火奇棍》. Authentic Northern Song Buddhist monastery architecture, ancient cypresses, stone courtyards, and monks in hemp gray-brown Northern Song Buddhist robes, mineral pigments (azurite, malachite, cinnabar, ink wash), atmospheric wuxia lighting, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 298. `CG-QST-298`：东庑碑院 · 净法携墨拓修补唐代武僧演武砖雕

- **关联文件**：[`src/data/quests/sects/shaolinSideSteleRubbingQuest.ts`](../src/data/quests/sects/shaolinSideSteleRubbingQuest.ts)
- **目标路径**：`public/assets/quests/sl_s02_stele_rub.jpg`
- **画框题跋**：`东庑碑院 · 净法携墨拓修补唐代武僧演武砖雕`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD at Mount Song Shaolin Monastery in Henan. Depicting scene "东庑碑院 · 净法携墨拓修补唐代武僧演武砖雕" from 《东庑拓碑 · 拳棍双修》. Authentic Northern Song Buddhist monastery architecture, ancient cypresses, stone courtyards, and monks in hemp gray-brown Northern Song Buddhist robes, mineral pigments (azurite, malachite, cinnabar, ink wash), atmospheric wuxia lighting, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 299. `CG-QST-299`：护碑驱恶 · 逐退偷拓古碑恶奴，慧轮补授拳棍双全

- **关联文件**：[`src/data/quests/sects/shaolinSideSteleRubbingQuest.ts`](../src/data/quests/sects/shaolinSideSteleRubbingQuest.ts)
- **目标路径**：`public/assets/quests/sl_s02_protect_stele.jpg`
- **画框题跋**：`护碑驱恶 · 逐退偷拓古碑恶奴，慧轮补授拳棍双全`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD at Mount Song Shaolin Monastery in Henan. Depicting scene "护碑驱恶 · 逐退偷拓古碑恶奴，慧轮补授拳棍双全" from 《东庑拓碑 · 拳棍双修》. Authentic Northern Song Buddhist monastery architecture, ancient cypresses, stone courtyards, and monks in hemp gray-brown Northern Song Buddhist robes, mineral pigments (azurite, malachite, cinnabar, ink wash), atmospheric wuxia lighting, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 300. `CG-QST-300`：登封粮行 · 算术当场识破夹层灌水银暗秤，拆穿奸商克扣

- **关联文件**：[`src/data/quests/sects/shaolinSideGrainScaleQuest.ts`](../src/data/quests/sects/shaolinSideGrainScaleQuest.ts)
- **目标路径**：`public/assets/quests/sl_s03_grain_scale.jpg`
- **画框题跋**：`登封粮行 · 算术当场识破夹层灌水银暗秤，拆穿奸商克扣`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD at Mount Song Shaolin Monastery in Henan. Depicting scene "登封粮行 · 算术当场识破夹层灌水银暗秤，拆穿奸商克扣" from 《登封买粮 · 斗秤破奸》. Authentic Northern Song Buddhist monastery architecture, ancient cypresses, stone courtyards, and monks in hemp gray-brown Northern Song Buddhist robes, mineral pigments (azurite, malachite, cinnabar, ink wash), atmospheric wuxia lighting, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 301. `CG-QST-301`：追银护斋 · 1v2 痛扁粮行恶护院，追回百两差额纹银

- **关联文件**：[`src/data/quests/sects/shaolinSideGrainScaleQuest.ts`](../src/data/quests/sects/shaolinSideGrainScaleQuest.ts)
- **目标路径**：`public/assets/quests/sl_s03_thug_brawl.jpg`
- **画框题跋**：`追银护斋 · 1v2 痛扁粮行恶护院，追回百两差额纹银`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD at Mount Song Shaolin Monastery in Henan. Depicting scene "追银护斋 · 1v2 痛扁粮行恶护院，追回百两差额纹银" from 《登封买粮 · 斗秤破奸》. Authentic Northern Song Buddhist monastery architecture, ancient cypresses, stone courtyards, and monks in hemp gray-brown Northern Song Buddhist robes, mineral pigments (azurite, malachite, cinnabar, ink wash), atmospheric wuxia lighting, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 302. `CG-QST-302`：塔林幽火 · 寒夜百座高僧砖塔磷火闪烁，识破摸金校尉伪装

- **关联文件**：[`src/data/quests/sects/shaolinSidePagodaForestQuest.ts`](../src/data/quests/sects/shaolinSidePagodaForestQuest.ts)
- **目标路径**：`public/assets/quests/sl_s04_pagoda_ghost.jpg`
- **画框题跋**：`塔林幽火 · 寒夜百座高僧砖塔磷火闪烁，识破摸金校尉伪装`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD at Mount Song Shaolin Monastery in Henan. Depicting scene "塔林幽火 · 寒夜百座高僧砖塔磷火闪烁，识破摸金校尉伪装" from 《塔林寒夜 · 孤魂盗墓》. Authentic Northern Song Buddhist monastery architecture, ancient cypresses, stone courtyards, and monks in hemp gray-brown Northern Song Buddhist robes, mineral pigments (azurite, malachite, cinnabar, ink wash), atmospheric wuxia lighting, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 303. `CG-QST-303`：砖塔迷阵 · 齐眉棍影破洛阳铲围攻，护住唐代高僧舍利地宫

- **关联文件**：[`src/data/quests/sects/shaolinSidePagodaForestQuest.ts`](../src/data/quests/sects/shaolinSidePagodaForestQuest.ts)
- **目标路径**：`public/assets/quests/sl_s04_tomb_raiders.jpg`
- **画框题跋**：`砖塔迷阵 · 齐眉棍影破洛阳铲围攻，护住唐代高僧舍利地宫`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD at Mount Song Shaolin Monastery in Henan. Depicting scene "砖塔迷阵 · 齐眉棍影破洛阳铲围攻，护住唐代高僧舍利地宫" from 《塔林寒夜 · 孤魂盗墓》. Authentic Northern Song Buddhist monastery architecture, ancient cypresses, stone courtyards, and monks in hemp gray-brown Northern Song Buddhist robes, mineral pigments (azurite, malachite, cinnabar, ink wash), atmospheric wuxia lighting, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 304. `CG-QST-304`：嵩阳杏坛 · 汉柏树下儒释会通，妙语折服排佛迂儒

- **关联文件**：[`src/data/quests/sects/shaolinSideSongyangDebateQuest.ts`](../src/data/quests/sects/shaolinSideSongyangDebateQuest.ts)
- **目标路径**：`public/assets/quests/sl_s05_songyang_debate.jpg`
- **画框题跋**：`嵩阳杏坛 · 汉柏树下儒释会通，妙语折服排佛迂儒`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD at Mount Song Shaolin Monastery in Henan. Depicting scene "嵩阳杏坛 · 汉柏树下儒释会通，妙语折服排佛迂儒" from 《嵩阳借书 · 儒释之辩》. Authentic Northern Song Buddhist monastery architecture, ancient cypresses, stone courtyards, and monks in hemp gray-brown Northern Song Buddhist robes, mineral pigments (azurite, malachite, cinnabar, ink wash), atmospheric wuxia lighting, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 305. `CG-QST-305`：以武证礼 · 书院石阶点到为止挫狂生武师，促成两院藏书互通

- **关联文件**：[`src/data/quests/sects/shaolinSideSongyangDebateQuest.ts`](../src/data/quests/sects/shaolinSideSongyangDebateQuest.ts)
- **目标路径**：`public/assets/quests/sl_s05_apricot_spar.jpg`
- **画框题跋**：`以武证礼 · 书院石阶点到为止挫狂生武师，促成两院藏书互通`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD at Mount Song Shaolin Monastery in Henan. Depicting scene "以武证礼 · 书院石阶点到为止挫狂生武师，促成两院藏书互通" from 《嵩阳借书 · 儒释之辩》. Authentic Northern Song Buddhist monastery architecture, ancient cypresses, stone courtyards, and monks in hemp gray-brown Northern Song Buddhist robes, mineral pigments (azurite, malachite, cinnabar, ink wash), atmospheric wuxia lighting, strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 306. `CG-QST-306`：东庑刀鸣 · 玄灭于唐碑青石间传授《慈悲刀法》，刀光如雪而不伤落叶

- **关联文件**：[`src/data/quests/sects/shaolinLuohanCibeiBladeQuest.ts`](../src/data/quests/sects/shaolinLuohanCibeiBladeQuest.ts)
- **目标路径**：`public/assets/quests/sl_05_east_corridor_blade.jpg`
- **画框题跋**：`东庑刀鸣 · 玄灭于唐碑青石间传授《慈悲刀法》，刀光如雪而不伤落叶`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "东庑刀鸣 · 玄灭于唐碑青石间传授《慈悲刀法》，刀光如雪而不伤落叶" from 《东庑刀鸣 · 慈悲度寇》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 307. `CG-QST-307`：慈悲度寇 · 戒刀背震脱朴刀，流民跪地痛哭，悍匪屠三提鬼头刀怒冲而至

- **关联文件**：[`src/data/quests/sects/shaolinLuohanCibeiBladeQuest.ts`](../src/data/quests/sects/shaolinLuohanCibeiBladeQuest.ts)
- **目标路径**：`public/assets/quests/sl_05_yingyang_mercy.jpg`
- **画框题跋**：`慈悲度寇 · 戒刀背震脱朴刀，流民跪地痛哭，悍匪屠三提鬼头刀怒冲而至`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "慈悲度寇 · 戒刀背震脱朴刀，流民跪地痛哭，悍匪屠三提鬼头刀怒冲而至" from 《东庑刀鸣 · 慈悲度寇》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 308. `CG-QST-308`：白马寺夜变 · 西夏一品堂假僧现出弯刀与火折，玄悲与你联手护住大佛宝殿

- **关联文件**：[`src/data/quests/sects/shaolinLuohanWeituoQuest.ts`](../src/data/quests/sects/shaolinLuohanWeituoQuest.ts)
- **目标路径**：`public/assets/quests/sl_06_baima_fire.jpg`
- **画框题跋**：`白马寺夜变 · 西夏一品堂假僧现出弯刀与火折，玄悲与你联手护住大佛宝殿`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "白马寺夜变 · 西夏一品堂假僧现出弯刀与火折，玄悲与你联手护住大佛宝殿" from 《释源白马 · 韦陀降魔》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 309. `CG-QST-309`：韦陀降魔 · 齐云古塔顶层月色如霜，一记大韦陀杵势震毙西夏密宗番僧摩诃巴

- **关联文件**：[`src/data/quests/sects/shaolinLuohanWeituoQuest.ts`](../src/data/quests/sects/shaolinLuohanWeituoQuest.ts)
- **目标路径**：`public/assets/quests/sl_06_qiyun_pagoda_win.jpg`
- **画框题跋**：`韦陀降魔 · 齐云古塔顶层月色如霜，一记大韦陀杵势震毙西夏密宗番僧摩诃巴`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "韦陀降魔 · 齐云古塔顶层月色如霜，一记大韦陀杵势震毙西夏密宗番僧摩诃巴" from 《释源白马 · 韦陀降魔》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 310. `CG-QST-310`：玄悲赠杵 · 银杏金叶纷飞间，大韦陀僧玄悲将少林韦陀伏魔杵郑重托付于你

- **关联文件**：[`src/data/quests/sects/shaolinLuohanWeituoQuest.ts`](../src/data/quests/sects/shaolinLuohanWeituoQuest.ts)
- **目标路径**：`public/assets/quests/sl_06_xuanbei_gift.jpg`
- **画框题跋**：`玄悲赠杵 · 银杏金叶纷飞间，大韦陀僧玄悲将少林韦陀伏魔杵郑重托付于你`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "玄悲赠杵 · 银杏金叶纷飞间，大韦陀僧玄悲将少林韦陀伏魔杵郑重托付于你" from 《释源白马 · 韦陀降魔》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 311. `CG-QST-311`：碎碑擒龙 · 东庑古碑寒雾缭绕，玄石与玄痛五指成爪示范少林绝技《龙爪手》

- **关联文件**：[`src/data/quests/sects/shaolinLuohanDragonClawQuest.ts`](../src/data/quests/sects/shaolinLuohanDragonClawQuest.ts)
- **目标路径**：`public/assets/quests/sl_07_stele_mist.jpg`
- **画框题跋**：`碎碑擒龙 · 东庑古碑寒雾缭绕，玄石与玄痛五指成爪示范少林绝技《龙爪手》`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "碎碑擒龙 · 东庑古碑寒雾缭绕，玄石与玄痛五指成爪示范少林绝技《龙爪手》" from 《碎碑擒龙 · 少室捉谍》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 312. `CG-QST-312`：碎碑擒龙 · 三更寒雾间《龙爪手》撕裂幽州软甲，一爪扣脉生擒辽谍耶律青影

- **关联文件**：[`src/data/quests/sects/shaolinLuohanDragonClawQuest.ts`](../src/data/quests/sects/shaolinLuohanDragonClawQuest.ts)
- **目标路径**：`public/assets/quests/sl_07_dragon_claw_capture.jpg`
- **画框题跋**：`碎碑擒龙 · 三更寒雾间《龙爪手》撕裂幽州软甲，一爪扣脉生擒辽谍耶律青影`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "碎碑擒龙 · 三更寒雾间《龙爪手》撕裂幽州软甲，一爪扣脉生擒辽谍耶律青影" from 《碎碑擒龙 · 少室捉谍》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 313. `CG-QST-313`：山河无恙 · 朝阳映照东庑唐碑，西半幅拓片焚毁归尘，玄痛与玄石合授《龙爪手》全本

- **关联文件**：[`src/data/quests/sects/shaolinLuohanDragonClawQuest.ts`](../src/data/quests/sects/shaolinLuohanDragonClawQuest.ts)
- **目标路径**：`public/assets/quests/sl_07_map_preserved.jpg`
- **画框题跋**：`山河无恙 · 朝阳映照东庑唐碑，西半幅拓片焚毁归尘，玄痛与玄石合授《龙爪手》全本`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "山河无恙 · 朝阳映照东庑唐碑，西半幅拓片焚毁归尘，玄痛与玄石合授《龙爪手》全本" from 《碎碑擒龙 · 少室捉谍》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 314. `CG-QST-314`：十八铜人阵 · 金漆罗汉列成三才六合大阵，齐眉长棍交织如林，直压中宫

- **关联文件**：[`src/data/quests/sects/shaolinLuohanArhatArrayQuest.ts`](../src/data/quests/sects/shaolinLuohanArhatArrayQuest.ts)
- **目标路径**：`public/assets/quests/sl_08_arhat_array_1.jpg`
- **画框题跋**：`十八铜人阵 · 金漆罗汉列成三才六合大阵，齐眉长棍交织如林，直压中宫`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "十八铜人阵 · 金漆罗汉列成三才六合大阵，齐眉长棍交织如林，直压中宫" from 《十八铜人 · 罗汉金身》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 315. `CG-QST-315`：罗汉金身 · 正殿金光震荡，你以融汇贯通的罗汉绝艺震退阵眼慧轮，十八铜人齐齐合十让道

- **关联文件**：[`src/data/quests/sects/shaolinLuohanArhatArrayQuest.ts`](../src/data/quests/sects/shaolinLuohanArhatArrayQuest.ts)
- **目标路径**：`public/assets/quests/sl_08_arhat_breakthrough.jpg`
- **画框题跋**：`罗汉金身 · 正殿金光震荡，你以融汇贯通的罗汉绝艺震退阵眼慧轮，十八铜人齐齐合十让道`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "罗汉金身 · 正殿金光震荡，你以融汇贯通的罗汉绝艺震退阵眼慧轮，十八铜人齐齐合十让道" from 《十八铜人 · 罗汉金身》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 316. `CG-QST-316`：钟鸣九响 · 大雄正殿香云缭绕，玄慈方丈亲为你披上少林真传紫金袈裟，群僧同颂佛号

- **关联文件**：[`src/data/quests/sects/shaolinLuohanArhatArrayQuest.ts`](../src/data/quests/sects/shaolinLuohanArhatArrayQuest.ts)
- **目标路径**：`public/assets/quests/sl_08_zhenchuan_bell.jpg`
- **画框题跋**：`钟鸣九响 · 大雄正殿香云缭绕，玄慈方丈亲为你披上少林真传紫金袈裟，群僧同颂佛号`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "钟鸣九响 · 大雄正殿香云缭绕，玄慈方丈亲为你披上少林真传紫金袈裟，群僧同颂佛号" from 《十八铜人 · 罗汉金身》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 317. `CG-QST-317`：绝壁剑痕崖 · 玄难指点青壁剑刻，初传少林《伏魔剑》意

- **关联文件**：[`src/data/quests/sects/shaolinDamoFumoSwordQuest.ts`](../src/data/quests/sects/shaolinDamoFumoSwordQuest.ts)
- **目标路径**：`public/assets/quests/sl_09_sword_cliff.jpg`
- **画框题跋**：`绝壁剑痕崖 · 玄难指点青壁剑刻，初传少林《伏魔剑》意`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "绝壁剑痕崖 · 玄难指点青壁剑刻，初传少林《伏魔剑》意" from 《剑痕绝壁 · 达摩初剑》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 318. `CG-QST-318`：剑痕崖决锋 · 玄铁戒剑直破阴风诡刺，禅心不动伏邪剑

- **关联文件**：[`src/data/quests/sects/shaolinDamoFumoSwordQuest.ts`](../src/data/quests/sects/shaolinDamoFumoSwordQuest.ts)
- **目标路径**：`public/assets/quests/sl_09_fumo_sword_duel.jpg`
- **画框题跋**：`剑痕崖决锋 · 玄铁戒剑直破阴风诡刺，禅心不动伏邪剑`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "剑痕崖决锋 · 玄铁戒剑直破阴风诡刺，禅心不动伏邪剑" from 《剑痕绝壁 · 达摩初剑》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 319. `CG-QST-319`：洛水夜舫 · 紫灯雾笼瑶华舟，毒香暗浮藏妖踪

- **关联文件**：[`src/data/quests/sects/shaolinDamoSanhuaPalmQuest.ts`](../src/data/quests/sects/shaolinDamoSanhuaPalmQuest.ts)
- **目标路径**：`public/assets/quests/sl_10_luoshui_boat.jpg`
- **画框题跋**：`洛水夜舫 · 紫灯雾笼瑶华舟，毒香暗浮藏妖踪`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "洛水夜舫 · 紫灯雾笼瑶华舟，毒香暗浮藏妖踪" from 《洛水飞花 · 散花破幻》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 320. `CG-QST-320`：散花破幻 · 双掌翻飞震晕星宿妖女与护法，洛水波平

- **关联文件**：[`src/data/quests/sects/shaolinDamoSanhuaPalmQuest.ts`](../src/data/quests/sects/shaolinDamoSanhuaPalmQuest.ts)
- **目标路径**：`public/assets/quests/sl_10_xingxiu_defeat.jpg`
- **画框题跋**：`散花破幻 · 双掌翻飞震晕星宿妖女与护法，洛水波平`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "散花破幻 · 双掌翻飞震晕星宿妖女与护法，洛水波平" from 《洛水飞花 · 散花破幻》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 321. `CG-QST-321`：无声禅辩 · 碎玉之前拈莲微笑，一言未发压服大轮寺三番僧

- **关联文件**：[`src/data/quests/sects/shaolinDamoNianhuaFingerQuest.ts`](../src/data/quests/sects/shaolinDamoNianhuaFingerQuest.ts)
- **目标路径**：`public/assets/quests/sl_11_silent_debate.jpg`
- **画框题跋**：`无声禅辩 · 碎玉之前拈莲微笑，一言未发压服大轮寺三番僧`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "无声禅辩 · 碎玉之前拈莲微笑，一言未发压服大轮寺三番僧" from 《迦叶微笑 · 灵山拈花》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 322. `CG-QST-322`：灵山拈花 · 双指柔劲破铁掌罡风，禅意与烈焰交锋演武坪

- **关联文件**：[`src/data/quests/sects/shaolinDamoNianhuaFingerQuest.ts`](../src/data/quests/sects/shaolinDamoNianhuaFingerQuest.ts)
- **目标路径**：`public/assets/quests/sl_11_nianhua_finger.jpg`
- **画框题跋**：`灵山拈花 · 双指柔劲破铁掌罡风，禅意与烈焰交锋演武坪`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "灵山拈花 · 双指柔劲破铁掌罡风，禅意与烈焰交锋演武坪" from 《迦叶微笑 · 灵山拈花》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 323. `CG-QST-323`：番僧长揖 · 吐蕃大轮寺三护法折服赔礼，恭敬辞别嵩山

- **关联文件**：[`src/data/quests/sects/shaolinDamoNianhuaFingerQuest.ts`](../src/data/quests/sects/shaolinDamoNianhuaFingerQuest.ts)
- **目标路径**：`public/assets/quests/sl_11_tubo_bow.jpg`
- **画框题跋**：`番僧长揖 · 吐蕃大轮寺三护法折服赔礼，恭敬辞别嵩山`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "番僧长揖 · 吐蕃大轮寺三护法折服赔礼，恭敬辞别嵩山" from 《迦叶微笑 · 灵山拈花》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 324. `CG-QST-324`：寒玉问禅 · 幽谷石室长明灯下，瘫痪神僧玄澄剖白七十二障秘辛

- **关联文件**：[`src/data/quests/sects/shaolinDamoXuanchengQuest.ts`](../src/data/quests/sects/shaolinDamoXuanchengQuest.ts)
- **目标路径**：`public/assets/quests/sl_12_cold_jade_bed.jpg`
- **画框题跋**：`寒玉问禅 · 幽谷石室长明灯下，瘫痪神僧玄澄剖白七十二障秘辛`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "寒玉问禅 · 幽谷石室长明灯下，瘫痪神僧玄澄剖白七十二障秘辛" from 《寒玉问禅 · 七十二障》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 325. `CG-QST-325`：狭洞死战 · 幽暗石室中独挡一流下品慕容暗探首燕影客，寸步不退

- **关联文件**：[`src/data/quests/sects/shaolinDamoXuanchengQuest.ts`](../src/data/quests/sects/shaolinDamoXuanchengQuest.ts)
- **目标路径**：`public/assets/quests/sl_12_cave_assassin.jpg`
- **画框题跋**：`狭洞死战 · 幽暗石室中独挡一流下品慕容暗探首燕影客，寸步不退`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "狭洞死战 · 幽暗石室中独挡一流下品慕容暗探首燕影客，寸步不退" from 《寒玉问禅 · 七十二障》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 326. `CG-QST-326`：达摩真传 · 黎明幽谷石室中，玄慈宣谕晋升少林真传弟子，玄澄玄难欣慰颔首

- **关联文件**：[`src/data/quests/sects/shaolinDamoXuanchengQuest.ts`](../src/data/quests/sects/shaolinDamoXuanchengQuest.ts)
- **目标路径**：`public/assets/quests/sl_12_damo_zhenchuan.jpg`
- **画框题跋**：`达摩真传 · 黎明幽谷石室中，玄慈宣谕晋升少林真传弟子，玄澄玄难欣慰颔首`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "达摩真传 · 黎明幽谷石室中，玄慈宣谕晋升少林真传弟子，玄澄玄难欣慰颔首" from 《寒玉问禅 · 七十二障》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 327. `CG-QST-327`：钟鼓执杖 · 玄寂长老亲演《普门杖法》，杖影如莲，刚柔并济

- **关联文件**：[`src/data/quests/sects/shaolinJielvPumenStaffQuest.ts`](../src/data/quests/sects/shaolinJielvPumenStaffQuest.ts)
- **目标路径**：`public/assets/quests/sl_13_pumen_staff.jpg`
- **画框题跋**：`钟鼓执杖 · 玄寂长老亲演《普门杖法》，杖影如莲，刚柔并济`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "钟鼓执杖 · 玄寂长老亲演《普门杖法》，杖影如莲，刚柔并济" from 《钟鼓执杖 · 清规如铁》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 328. `CG-QST-328`：荒庙夜雨 · 破戒叛僧慧癞横杖守于残烛之前，身畔孤老泣血

- **关联文件**：[`src/data/quests/sects/shaolinJielvPumenStaffQuest.ts`](../src/data/quests/sects/shaolinJielvPumenStaffQuest.ts)
- **目标路径**：`public/assets/quests/sl_13_ruzhou_temple.jpg`
- **画框题跋**：`荒庙夜雨 · 破戒叛僧慧癞横杖守于残烛之前，身畔孤老泣血`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "荒庙夜雨 · 破戒叛僧慧癞横杖守于残烛之前，身畔孤老泣血" from 《钟鼓执杖 · 清规如铁》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 329. `CG-QST-329`：一拍两散 · 资圣宝塔顶层朔风飞雪，玄寂亲演示惊世掌力

- **关联文件**：[`src/data/quests/sects/shaolinJielvOneSlapQuest.ts`](../src/data/quests/sects/shaolinJielvOneSlapQuest.ts)
- **目标路径**：`public/assets/quests/sl_14_zisheng_teach.jpg`
- **画框题跋**：`一拍两散 · 资圣宝塔顶层朔风飞雪，玄寂亲演示惊世掌力`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "一拍两散 · 资圣宝塔顶层朔风飞雪，玄寂亲演示惊世掌力" from 《一拍两散 · 汴京缉凶》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 330. `CG-QST-330`：子夜甜水巷 · 飞雪青瓦之上，铁罗汉严横现身周府屋脊

- **关联文件**：[`src/data/quests/sects/shaolinJielvOneSlapQuest.ts`](../src/data/quests/sects/shaolinJielvOneSlapQuest.ts)
- **目标路径**：`public/assets/quests/sl_14_tianshui_roof.jpg`
- **画框题跋**：`子夜甜水巷 · 飞雪青瓦之上，铁罗汉严横现身周府屋脊`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "子夜甜水巷 · 飞雪青瓦之上，铁罗汉严横现身周府屋脊" from 《一拍两散 · 汴京缉凶》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 331. `CG-QST-331`：一拍两散 · 凝练掌劲破尽横练铁臂，生擒铁罗汉严横

- **关联文件**：[`src/data/quests/sects/shaolinJielvOneSlapQuest.ts`](../src/data/quests/sects/shaolinJielvOneSlapQuest.ts)
- **目标路径**：`public/assets/quests/sl_14_yanheng_capture.jpg`
- **画框题跋**：`一拍两散 · 凝练掌劲破尽横练铁臂，生擒铁罗汉严横`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "一拍两散 · 凝练掌劲破尽横练铁臂，生擒铁罗汉严横" from 《一拍两散 · 汴京缉凶》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 332. `CG-QST-332`：拈花截脉 · 郑州药棚之内，以柔绵指劲隔衣点穴救治染瘴流民

- **关联文件**：[`src/data/quests/sects/shaolinJielvYaowangFingerQuest.ts`](../src/data/quests/sects/shaolinJielvYaowangFingerQuest.ts)
- **目标路径**：`public/assets/quests/sl_15_finger_heal.jpg`
- **画框题跋**：`拈花截脉 · 郑州药棚之内，以柔绵指劲隔衣点穴救治染瘴流民`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "拈花截脉 · 郑州药棚之内，以柔绵指劲隔衣点穴救治染瘴流民" from 《药王百草 · 拈花截脉》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 333. `CG-QST-333`：指掌齐施 · 药棚之前刚掌震敌、拈花点穴，生擒太行匪首独眼狼

- **关联文件**：[`src/data/quests/sects/shaolinJielvYaowangFingerQuest.ts`](../src/data/quests/sects/shaolinJielvYaowangFingerQuest.ts)
- **目标路径**：`public/assets/quests/sl_15_bandit_repel.jpg`
- **画框题跋**：`指掌齐施 · 药棚之前刚掌震敌、拈花点穴，生擒太行匪首独眼狼`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "指掌齐施 · 药棚之前刚掌震敌、拈花点穴，生擒太行匪首独眼狼" from 《药王百草 · 拈花截脉》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 334. `CG-QST-334`：药王嘉许 · 东厢碑廊之下，玄生亲授《拈花指》全卷真传

- **关联文件**：[`src/data/quests/sects/shaolinJielvYaowangFingerQuest.ts`](../src/data/quests/sects/shaolinJielvYaowangFingerQuest.ts)
- **目标路径**：`public/assets/quests/sl_15_yaowang_praise.jpg`
- **画框题跋**：`药王嘉许 · 东厢碑廊之下，玄生亲授《拈花指》全卷真传`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "药王嘉许 · 东厢碑廊之下，玄生亲授《拈花指》全卷真传" from 《药王百草 · 拈花截脉》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 335. `CG-QST-335`：后山截杀 · 绝壁枯松之下，挺身力救怀抱印匣的苦行僧虚清

- **关联文件**：[`src/data/quests/sects/shaolinJielvTrialPromoteQuest.ts`](../src/data/quests/sects/shaolinJielvTrialPromoteQuest.ts)
- **目标路径**：`public/assets/quests/sl_16_rescue_xuqing.jpg`
- **画框题跋**：`后山截杀 · 绝壁枯松之下，挺身力救怀抱印匣的苦行僧虚清`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "后山截杀 · 绝壁枯松之下，挺身力救怀抱印匣的苦行僧虚清" from 《戒台问罪 · 贪嗔痴慢》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 336. `CG-QST-336`：戒台问罪 · 大雄正殿三堂会审，携虚清与影刃客当堂对质玄净

- **关联文件**：[`src/data/quests/sects/shaolinJielvTrialPromoteQuest.ts`](../src/data/quests/sects/shaolinJielvTrialPromoteQuest.ts)
- **目标路径**：`public/assets/quests/sl_16_jietai_trial.jpg`
- **画框题跋**：`戒台问罪 · 大雄正殿三堂会审，携虚清与影刃客当堂对质玄净`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "戒台问罪 · 大雄正殿三堂会审，携虚清与影刃客当堂对质玄净" from 《戒台问罪 · 贪嗔痴慢》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 337. `CG-QST-337`：戒律真传 · 大雄正殿佛光之下，玄慈方丈亲授戒律院真传法衣与禅杖

- **关联文件**：[`src/data/quests/sects/shaolinJielvTrialPromoteQuest.ts`](../src/data/quests/sects/shaolinJielvTrialPromoteQuest.ts)
- **目标路径**：`public/assets/quests/sl_16_jielv_zhenchuan.jpg`
- **画框题跋**：`戒律真传 · 大雄正殿佛光之下，玄慈方丈亲授戒律院真传法衣与禅杖`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "戒律真传 · 大雄正殿佛光之下，玄慈方丈亲授戒律院真传法衣与禅杖" from 《戒台问罪 · 贪嗔痴慢》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 338. `CG-QST-338`：大相国寺万姓雅市 · 慧照、卫弘龙与郑刚共议护持寺院商铺

- **关联文件**：[`src/data/quests/sects/shaolinLaymanXiangguoQuest.ts`](../src/data/quests/sects/shaolinLaymanXiangguoQuest.ts)
- **目标路径**：`public/assets/quests/sl_17_xiangguo_market.jpg`
- **画框题跋**：`大相国寺万姓雅市 · 慧照、卫弘龙与郑刚共议护持寺院商铺`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "大相国寺万姓雅市 · 慧照、卫弘龙与郑刚共议护持寺院商铺" from 《相国暗影 · 红尘刀杖》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 339. `CG-QST-339`：瓦子暗巷 · 带发提刀使出普门杖法与慈悲刀法，力战毒蛇钱五

- **关联文件**：[`src/data/quests/sects/shaolinLaymanXiangguoQuest.ts`](../src/data/quests/sects/shaolinLaymanXiangguoQuest.ts)
- **目标路径**：`public/assets/quests/sl_17_wazi_brawl.jpg`
- **画框题跋**：`瓦子暗巷 · 带发提刀使出普门杖法与慈悲刀法，力战毒蛇钱五`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "瓦子暗巷 · 带发提刀使出普门杖法与慈悲刀法，力战毒蛇钱五" from 《相国暗影 · 红尘刀杖》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 340. `CG-QST-340`：伊阙古道 · 金刀王家镖旗与少林护佛车队并辔南行

- **关联文件**：[`src/data/quests/sects/shaolinLaymanLuoyangEscortQuest.ts`](../src/data/quests/sects/shaolinLaymanLuoyangEscortQuest.ts)
- **目标路径**：`public/assets/quests/sl_18_longmen_escort.jpg`
- **画框题跋**：`伊阙古道 · 金刀王家镖旗与少林护佛车队并辔南行`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "伊阙古道 · 金刀王家镖旗与少林护佛车队并辔南行" from 《洛阳护镖 · 金刀少林》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 341. `CG-QST-341`：龙门石桥 · 玄悲抛赠少林韦陀伏魔杵，危局破格点拨《韦陀杵》力战拓跋烈

- **关联文件**：[`src/data/quests/sects/shaolinLaymanLuoyangEscortQuest.ts`](../src/data/quests/sects/shaolinLaymanLuoyangEscortQuest.ts)
- **目标路径**：`public/assets/quests/sl_18_weituo_bridge.jpg`
- **画框题跋**：`龙门石桥 · 玄悲抛赠少林韦陀伏魔杵，危局破格点拨《韦陀杵》力战拓跋烈`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "龙门石桥 · 玄悲抛赠少林韦陀伏魔杵，危局破格点拨《韦陀杵》力战拓跋烈" from 《洛阳护镖 · 金刀少林》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 342. `CG-QST-342`：白马大佛宝殿 · 千斤紫金佛像安奉放光，玄悲破格传授《韦陀杵》并赠伏魔宝杵

- **关联文件**：[`src/data/quests/sects/shaolinLaymanLuoyangEscortQuest.ts`](../src/data/quests/sects/shaolinLaymanLuoyangEscortQuest.ts)
- **目标路径**：`public/assets/quests/sl_18_golden_buddha.jpg`
- **画框题跋**：`白马大佛宝殿 · 千斤紫金佛像安奉放光，玄悲破格传授《韦陀杵》并赠伏魔宝杵`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "白马大佛宝殿 · 千斤紫金佛像安奉放光，玄悲破格传授《韦陀杵》并赠伏魔宝杵" from 《洛阳护镖 · 金刀少林》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 343. `CG-QST-343`：九莲山门演武坪 · 北宗龙爪手对决南宗铁桥硬马，以武会友赢尽敬重

- **关联文件**：[`src/data/quests/sects/shaolinLaymanPutianSouthQuest.ts`](../src/data/quests/sects/shaolinLaymanPutianSouthQuest.ts)
- **目标路径**：`public/assets/quests/sl_19_jiulian_spar.jpg`
- **画框题跋**：`九莲山门演武坪 · 北宗龙爪手对决南宗铁桥硬马，以武会友赢尽敬重`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "九莲山门演武坪 · 北宗龙爪手对决南宗铁桥硬马，以武会友赢尽敬重" from 《莆田南渡 · 南北少林》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 344. `CG-QST-344`：莆田海滨盐场 · 夜战火光冲天，与南少林同门并肩力敌东瀛海寇头目鬼丸浪人

- **关联文件**：[`src/data/quests/sects/shaolinLaymanPutianSouthQuest.ts`](../src/data/quests/sects/shaolinLaymanPutianSouthQuest.ts)
- **目标路径**：`public/assets/quests/sl_19_saltfield_pirates.jpg`
- **画框题跋**：`莆田海滨盐场 · 夜战火光冲天，与南少林同门并肩力敌东瀛海寇头目鬼丸浪人`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "莆田海滨盐场 · 夜战火光冲天，与南少林同门并肩力敌东瀛海寇头目鬼丸浪人" from 《莆田南渡 · 南北少林》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 345. `CG-QST-345`：大雄正殿 · 铜身罗汉元苦打破门户之见，亲授《盘山铁布衫（大成）》与《铁线拳》

- **关联文件**：[`src/data/quests/sects/shaolinLaymanPutianSouthQuest.ts`](../src/data/quests/sects/shaolinLaymanPutianSouthQuest.ts)
- **目标路径**：`public/assets/quests/sl_19_yuanku_scroll.jpg`
- **画框题跋**：`大雄正殿 · 铜身罗汉元苦打破门户之见，亲授《盘山铁布衫（大成）》与《铁线拳》`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "大雄正殿 · 铜身罗汉元苦打破门户之见，亲授《盘山铁布衫（大成）》与《铁线拳》" from 《莆田南渡 · 南北少林》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 346. `CG-QST-346`：资圣八角琉璃宝塔 · 手握朝廷朱印护寺勘合文书，破围策马星夜驰援嵩山

- **关联文件**：[`src/data/quests/sects/shaolinLaymanCommanderQuest.ts`](../src/data/quests/sects/shaolinLaymanCommanderQuest.ts)
- **目标路径**：`public/assets/quests/sl_20_imperial_writ.jpg`
- **画框题跋**：`资圣八角琉璃宝塔 · 手握朝廷朱印护寺勘合文书，破围策马星夜驰援嵩山`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "资圣八角琉璃宝塔 · 手握朝廷朱印护寺勘合文书，破围策马星夜驰援嵩山" from 《紫衣护寺 · 俗家都统》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 347. `CG-QST-347`：子夜暴雨 · 单刀孤身镇守嵩山药庄牌坊，雷电交加中力战绿林双煞

- **关联文件**：[`src/data/quests/sects/shaolinLaymanCommanderQuest.ts`](../src/data/quests/sects/shaolinLaymanCommanderQuest.ts)
- **目标路径**：`public/assets/quests/sl_20_blacktiger_rain.jpg`
- **画框题跋**：`子夜暴雨 · 单刀孤身镇守嵩山药庄牌坊，雷电交加中力战绿林双煞`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "子夜暴雨 · 单刀孤身镇守嵩山药庄牌坊，雷电交加中力战绿林双煞" from 《紫衣护寺 · 俗家都统》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 348. `CG-QST-348`：大雄正殿 · 玄慈方丈亲赐紫衣与玄铁令牌，破格晋升少林 Lv.3 俗家护法都统

- **关联文件**：[`src/data/quests/sects/shaolinLaymanCommanderQuest.ts`](../src/data/quests/sects/shaolinLaymanCommanderQuest.ts)
- **目标路径**：`public/assets/quests/sl_20_layman_commander.jpg`
- **画框题跋**：`大雄正殿 · 玄慈方丈亲赐紫衣与玄铁令牌，破格晋升少林 Lv.3 俗家护法都统`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "大雄正殿 · 玄慈方丈亲赐紫衣与玄铁令牌，破格晋升少林 Lv.3 俗家护法都统" from 《紫衣护寺 · 俗家都统》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 349. `CG-QST-349`：飞瀑深潭 · 芦苇尊者玄渡足尖轻点一枝枯芦，于十丈飞瀑水雾中凌波横渡深潭

- **关联文件**：[`src/data/quests/sects/shaolinYiweiLightnessQuest.ts`](../src/data/quests/sects/shaolinYiweiLightnessQuest.ts)
- **目标路径**：`public/assets/quests/sl_21_waterfall_reed.jpg`
- **画框题跋**：`飞瀑深潭 · 芦苇尊者玄渡足尖轻点一枝枯芦，于十丈飞瀑水雾中凌波横渡深潭`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "飞瀑深潭 · 芦苇尊者玄渡足尖轻点一枝枯芦，于十丈飞瀑水雾中凌波横渡深潭" from 《飞瀑深潭 · 一苇渡江》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 350. `CG-QST-350`：洛水急流 · 月色寒江波涛汹涌，你折芦掷水施展《一苇渡江》，踏苇十里直追云中燕

- **关联文件**：[`src/data/quests/sects/shaolinYiweiLightnessQuest.ts`](../src/data/quests/sects/shaolinYiweiLightnessQuest.ts)
- **目标路径**：`public/assets/quests/sl_21_luoshui_chase.jpg`
- **画框题跋**：`洛水急流 · 月色寒江波涛汹涌，你折芦掷水施展《一苇渡江》，踏苇十里直追云中燕`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "洛水急流 · 月色寒江波涛汹涌，你折芦掷水施展《一苇渡江》，踏苇十里直追云中燕" from 《飞瀑深潭 · 一苇渡江》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 351. `CG-QST-351`：洛水生擒 · 浪花飞溅间，你以少林擒拿手法扣住云中燕脉门，完好夺回《豫西关隘防务手札》

- **关联文件**：[`src/data/quests/sects/shaolinYiweiLightnessQuest.ts`](../src/data/quests/sects/shaolinYiweiLightnessQuest.ts)
- **目标路径**：`public/assets/quests/sl_21_cloud_swallow.jpg`
- **画框题跋**：`洛水生擒 · 浪花飞溅间，你以少林擒拿手法扣住云中燕脉门，完好夺回《豫西关隘防务手札》`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "洛水生擒 · 浪花飞溅间，你以少林擒拿手法扣住云中燕脉门，完好夺回《豫西关隘防务手札》" from 《飞瀑深潭 · 一苇渡江》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 352. `CG-QST-352`：枯木生烟 · 玄苦深夜连劈八十一刀，刀锋不触木身，百年枯菩提木却在炽热刀风下轰然生烟自燃

- **关联文件**：[`src/data/quests/sects/shaolinLuohanRanmuBladeQuest.ts`](../src/data/quests/sects/shaolinLuohanRanmuBladeQuest.ts)
- **目标路径**：`public/assets/quests/sl_22_burning_wood.jpg`
- **画框题跋**：`枯木生烟 · 玄苦深夜连劈八十一刀，刀锋不触木身，百年枯菩提木却在炽热刀风下轰然生烟自燃`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "枯木生烟 · 玄苦深夜连劈八十一刀，刀锋不触木身，百年枯菩提木却在炽热刀风下轰然生烟自燃" from 《枯木生烟 · 玄苦授刀》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 353. `CG-QST-353`：玄苦托刀 · 长明灯下，玄苦双手将传世宝刀【少林燃木戒刀】郑重托付于你，薪火相传

- **关联文件**：[`src/data/quests/sects/shaolinLuohanRanmuBladeQuest.ts`](../src/data/quests/sects/shaolinLuohanRanmuBladeQuest.ts)
- **目标路径**：`public/assets/quests/sl_22_xuanku_entrust.jpg`
- **画框题跋**：`玄苦托刀 · 长明灯下，玄苦双手将传世宝刀【少林燃木戒刀】郑重托付于你，薪火相传`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "玄苦托刀 · 长明灯下，玄苦双手将传世宝刀【少林燃木戒刀】郑重托付于你，薪火相传" from 《枯木生烟 · 玄苦授刀》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 354. `CG-QST-354`：烈焰逼影 · 你挥动燃木戒刀劈出漫天炽热刀风，十合硬撼逼得夜袭黑影高手仓皇破窗遁逃

- **关联文件**：[`src/data/quests/sects/shaolinLuohanRanmuBladeQuest.ts`](../src/data/quests/sects/shaolinLuohanRanmuBladeQuest.ts)
- **目标路径**：`public/assets/quests/sl_22_night_repel.jpg`
- **画框题跋**：`烈焰逼影 · 你挥动燃木戒刀劈出漫天炽热刀风，十合硬撼逼得夜袭黑影高手仓皇破窗遁逃`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "烈焰逼影 · 你挥动燃木戒刀劈出漫天炽热刀风，十合硬撼逼得夜袭黑影高手仓皇破窗遁逃" from 《枯木生烟 · 玄苦授刀》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 355. `CG-QST-355`：巩县石窟 · 夕照残窟下，铁尸尊者胸悬乌金护心铜镜，狂笑欲毁北魏千佛石像与满窟石匠

- **关联文件**：[`src/data/quests/sects/shaolinLuohanVajraFingerQuest.ts`](../src/data/quests/sects/shaolinLuohanVajraFingerQuest.ts)
- **目标路径**：`public/assets/quests/sl_23_gongxian_grotto.jpg`
- **画框题跋**：`巩县石窟 · 夕照残窟下，铁尸尊者胸悬乌金护心铜镜，狂笑欲毁北魏千佛石像与满窟石匠`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "巩县石窟 · 夕照残窟下，铁尸尊者胸悬乌金护心铜镜，狂笑欲毁北魏千佛石像与满窟石匠" from 《金刚怒目 · 碎石成粉》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 356. `CG-QST-356`：一指穿镜 · 金光凝于指尖一线，你以《大力金刚指》正面洞穿铁尸尊者胸前两寸厚的乌金护心铜镜

- **关联文件**：[`src/data/quests/sects/shaolinLuohanVajraFingerQuest.ts`](../src/data/quests/sects/shaolinLuohanVajraFingerQuest.ts)
- **目标路径**：`public/assets/quests/sl_23_shatter_mirror.jpg`
- **画框题跋**：`一指穿镜 · 金光凝于指尖一线，你以《大力金刚指》正面洞穿铁尸尊者胸前两寸厚的乌金护心铜镜`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "一指穿镜 · 金光凝于指尖一线，你以《大力金刚指》正面洞穿铁尸尊者胸前两寸厚的乌金护心铜镜" from 《金刚怒目 · 碎石成粉》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 357. `CG-QST-357`：救护石匠 · 夕阳余晖洒满北魏千佛石窟，获救的六十余名石匠与僧众齐齐向你合十跪谢

- **关联文件**：[`src/data/quests/sects/shaolinLuohanVajraFingerQuest.ts`](../src/data/quests/sects/shaolinLuohanVajraFingerQuest.ts)
- **目标路径**：`public/assets/quests/sl_23_save_masons.jpg`
- **画框题跋**：`救护石匠 · 夕阳余晖洒满北魏千佛石窟，获救的六十余名石匠与僧众齐齐向你合十跪谢`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "救护石匠 · 夕阳余晖洒满北魏千佛石窟，获救的六十余名石匠与僧众齐齐向你合十跪谢" from 《金刚怒目 · 碎石成粉》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 358. `CG-QST-358`：面壁悟剑 · 达摩石洞清辉如水，你观初祖石影三昼夜豁然顿悟，青竹剑光如禅影流转

- **关联文件**：[`src/data/quests/sects/shaolinDamoSwordMasterQuest.ts`](../src/data/quests/sects/shaolinDamoSwordMasterQuest.ts)
- **目标路径**：`public/assets/quests/sl_24_damo_shadow.jpg`
- **画框题跋**：`面壁悟剑 · 达摩石洞清辉如水，你观初祖石影三昼夜豁然顿悟，青竹剑光如禅影流转`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "面壁悟剑 · 达摩石洞清辉如水，你观初祖石影三昼夜豁然顿悟，青竹剑光如禅影流转" from 《面壁九年 · 剑化禅机》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 359. `CG-QST-359`：剑化禅机 · 绝壁云海之上，你以一柄青竹剑独斗慕容双将，一剑圆融挑落包不同与风波恶手中佩刀

- **关联文件**：[`src/data/quests/sects/shaolinDamoSwordMasterQuest.ts`](../src/data/quests/sects/shaolinDamoSwordMasterQuest.ts)
- **目标路径**：`public/assets/quests/sl_24_bao_feng_duel.jpg`
- **画框题跋**：`剑化禅机 · 绝壁云海之上，你以一柄青竹剑独斗慕容双将，一剑圆融挑落包不同与风波恶手中佩刀`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "剑化禅机 · 绝壁云海之上，你以一柄青竹剑独斗慕容双将，一剑圆融挑落包不同与风波恶手中佩刀" from 《面壁九年 · 剑化禅机》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 360. `CG-QST-360`：崖畔禅心 · 云海松涛映朝霞，玄难首座于剑痕崖畔为你印证《达摩剑法》真传圆满

- **关联文件**：[`src/data/quests/sects/shaolinDamoSwordMasterQuest.ts`](../src/data/quests/sects/shaolinDamoSwordMasterQuest.ts)
- **目标路径**：`public/assets/quests/sl_24_cliff_zen.jpg`
- **画框题跋**：`崖畔禅心 · 云海松涛映朝霞，玄难首座于剑痕崖畔为你印证《达摩剑法》真传圆满`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "崖畔禅心 · 云海松涛映朝霞，玄难首座于剑痕崖畔为你印证《达摩剑法》真传圆满" from 《面壁九年 · 剑化禅机》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 361. `CG-QST-361`：般若掌意 · 幽谷石室寒雾缭绕，玄难演练《般若掌》叠浪掌势，掌风过处石壁水珠悬空凝而不落

- **关联文件**：[`src/data/quests/sects/shaolinDamoBoruoPalmQuest.ts`](../src/data/quests/sects/shaolinDamoBoruoPalmQuest.ts)
- **目标路径**：`public/assets/quests/sl_25_boruo_palm.jpg`
- **画框题跋**：`般若掌意 · 幽谷石室寒雾缭绕，玄难演练《般若掌》叠浪掌势，掌风过处石壁水珠悬空凝而不落`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "般若掌意 · 幽谷石室寒雾缭绕，玄难演练《般若掌》叠浪掌势，掌风过处石壁水珠悬空凝而不落" from 《空色无相 · 般若波罗》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 362. `CG-QST-362`：般若叠浪 · 第十八掌空色无相轰然拍落鳄嘴剪脊，震裂岳老三虎口，逼得南海鳄神连退七步

- **关联文件**：[`src/data/quests/sects/shaolinDamoBoruoPalmQuest.ts`](../src/data/quests/sects/shaolinDamoBoruoPalmQuest.ts)
- **目标路径**：`public/assets/quests/sl_25_yuelao3_retreat.jpg`
- **画框题跋**：`般若叠浪 · 第十八掌空色无相轰然拍落鳄嘴剪脊，震裂岳老三虎口，逼得南海鳄神连退七步`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "般若叠浪 · 第十八掌空色无相轰然拍落鳄嘴剪脊，震裂岳老三虎口，逼得南海鳄神连退七步" from 《空色无相 · 般若波罗》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 363. `CG-QST-363`：空色无相 · 幽谷石室静谧澄明，玄澄与玄难合掌为你印证《般若掌》真传圆满

- **关联文件**：[`src/data/quests/sects/shaolinDamoBoruoPalmQuest.ts`](../src/data/quests/sects/shaolinDamoBoruoPalmQuest.ts)
- **目标路径**：`public/assets/quests/sl_25_empty_zen.jpg`
- **画框题跋**：`空色无相 · 幽谷石室静谧澄明，玄澄与玄难合掌为你印证《般若掌》真传圆满`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "空色无相 · 幽谷石室静谧澄明，玄澄与玄难合掌为你印证《般若掌》真传圆满" from 《空色无相 · 般若波罗》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 364. `CG-QST-364`：东厢古碑 · 夕阳映照唐代《心经》古碑，玄寂于碑前示范《般若掌》，掌风过处竟如古钟梵音回荡

- **关联文件**：[`src/data/quests/sects/shaolinJielvBoruoQuest.ts`](../src/data/quests/sects/shaolinJielvBoruoQuest.ts)
- **目标路径**：`public/assets/quests/sl_26_tang_stele.jpg`
- **画框题跋**：`东厢古碑 · 夕阳映照唐代《心经》古碑，玄寂于碑前示范《般若掌》，掌风过处竟如古钟梵音回荡`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "东厢古碑 · 夕阳映照唐代《心经》古碑，玄寂于碑前示范《般若掌》，掌风过处竟如古钟梵音回荡" from 《东厢古碑 · 掌吐梵音》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 365. `CG-QST-365`：子夜碑廊 · 月色冷冽，盗拓飞贼首鬼手陈手执拓纸墨包潜近唐代古碑，却被你当场现身喝破

- **关联文件**：[`src/data/quests/sects/shaolinJielvBoruoQuest.ts`](../src/data/quests/sects/shaolinJielvBoruoQuest.ts)
- **目标路径**：`public/assets/quests/sl_26_corridor_night.jpg`
- **画框题跋**：`子夜碑廊 · 月色冷冽，盗拓飞贼首鬼手陈手执拓纸墨包潜近唐代古碑，却被你当场现身喝破`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "子夜碑廊 · 月色冷冽，盗拓飞贼首鬼手陈手执拓纸墨包潜近唐代古碑，却被你当场现身喝破" from 《东厢古碑 · 掌吐梵音》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 366. `CG-QST-366`：古碑无恙 · 灯笼火光映亮东厢碑廊，玄寂率戒律武僧赶至押走贼首，唐代《心经》古碑完好如初

- **关联文件**：[`src/data/quests/sects/shaolinJielvBoruoQuest.ts`](../src/data/quests/sects/shaolinJielvBoruoQuest.ts)
- **目标路径**：`public/assets/quests/sl_26_stele_safe.jpg`
- **画框题跋**：`古碑无恙 · 灯笼火光映亮东厢碑廊，玄寂率戒律武僧赶至押走贼首，唐代《心经》古碑完好如初`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "古碑无恙 · 灯笼火光映亮东厢碑廊，玄寂率戒律武僧赶至押走贼首，唐代《心经》古碑完好如初" from 《东厢古碑 · 掌吐梵音》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 367. `CG-QST-367`：废寺地宫 · 残佛断壁之下幽火摇曳，你手持戒律黑铁法牌踏入欢喜魔僧盘踞的阴森地宫

- **关联文件**：[`src/data/quests/sects/shaolinJielvVajraQuest.ts`](../src/data/quests/sects/shaolinJielvVajraQuest.ts)
- **目标路径**：`public/assets/quests/sl_27_ruined_crypt.jpg`
- **画框题跋**：`废寺地宫 · 残佛断壁之下幽火摇曳，你手持戒律黑铁法牌踏入欢喜魔僧盘踞的阴森地宫`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "废寺地宫 · 残佛断壁之下幽火摇曳，你手持戒律黑铁法牌踏入欢喜魔僧盘踞的阴森地宫" from 《铁指断欲 · 降伏其心》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 368. `CG-QST-368`：铁指断欲 · 你凌空突进避开血刀，以至阳至刚的《大力金刚指》一指戳破欢喜魔僧闭穴气功罩门

- **关联文件**：[`src/data/quests/sects/shaolinJielvVajraQuest.ts`](../src/data/quests/sects/shaolinJielvVajraQuest.ts)
- **目标路径**：`public/assets/quests/sl_27_iron_finger.jpg`
- **画框题跋**：`铁指断欲 · 你凌空突进避开血刀，以至阳至刚的《大力金刚指》一指戳破欢喜魔僧闭穴气功罩门`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "铁指断欲 · 你凌空突进避开血刀，以至阳至刚的《大力金刚指》一指戳破欢喜魔僧闭穴气功罩门" from 《铁指断欲 · 降伏其心》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 369. `CG-QST-369`：法牌典刑 · 钟鼓禅院演武坪群僧肃立，你交还戒律黑铁法牌，玄寂与玄痛宣判将欢喜魔僧依律严惩

- **关联文件**：[`src/data/quests/sects/shaolinJielvVajraQuest.ts`](../src/data/quests/sects/shaolinJielvVajraQuest.ts)
- **目标路径**：`public/assets/quests/sl_27_law_plaque.jpg`
- **画框题跋**：`法牌典刑 · 钟鼓禅院演武坪群僧肃立，你交还戒律黑铁法牌，玄寂与玄痛宣判将欢喜魔僧依律严惩`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "法牌典刑 · 钟鼓禅院演武坪群僧肃立，你交还戒律黑铁法牌，玄寂与玄痛宣判将欢喜魔僧依律严惩" from 《铁指断欲 · 降伏其心》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 370. `CG-QST-370`：琉璃夜影 · 七夕暴雨夜藏经主阁，灰衣老僧与黑衣客无声对掌

- **关联文件**：[`src/data/quests/sects/shaolinPavilionShadowsQuest.ts`](../src/data/quests/sects/shaolinPavilionShadowsQuest.ts)
- **目标路径**：`public/assets/quests/sl_28_rain_pavilion.jpg`
- **画框题跋**：`琉璃夜影 · 七夕暴雨夜藏经主阁，灰衣老僧与黑衣客无声对掌`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "琉璃夜影 · 七夕暴雨夜藏经主阁，灰衣老僧与黑衣客无声对掌" from 《琉璃夜影 · 曝书惊变》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 371. `CG-QST-371`：松林雨幕 · 截击藏经阁黑衣夜影，五合之间惊见宗师绝威

- **关联文件**：[`src/data/quests/sects/shaolinPavilionShadowsQuest.ts`](../src/data/quests/sects/shaolinPavilionShadowsQuest.ts)
- **目标路径**：`public/assets/quests/sl_28_pine_chase.jpg`
- **画框题跋**：`松林雨幕 · 截击藏经阁黑衣夜影，五合之间惊见宗师绝威`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "松林雨幕 · 截击藏经阁黑衣夜影，五合之间惊见宗师绝威" from 《琉璃夜影 · 曝书惊变》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 372. `CG-QST-372`：案缝双笺 · 纸背指印各异，一份飘逸江南行楷，一份刚烈北地劲笔

- **关联文件**：[`src/data/quests/sects/shaolinPavilionShadowsQuest.ts`](../src/data/quests/sects/shaolinPavilionShadowsQuest.ts)
- **目标路径**：`public/assets/quests/sl_28_two_notes.jpg`
- **画框题跋**：`案缝双笺 · 纸背指印各异，一份飘逸江南行楷，一份刚烈北地劲笔`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "案缝双笺 · 纸背指印各异，一份飘逸江南行楷，一份刚烈北地劲笔" from 《琉璃夜影 · 曝书惊变》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 373. `CG-QST-373`：剑痕毒袭 · 星宿派三大毒徒骤发奇袭，玄难护佑小沙弥身中三笑逍遥散

- **关联文件**：[`src/data/quests/sects/shaolinJiuyangCrisisQuest.ts`](../src/data/quests/sects/shaolinJiuyangCrisisQuest.ts)
- **目标路径**：`public/assets/quests/sl_29_xingxiu_raid.jpg`
- **画框题跋**：`剑痕毒袭 · 星宿派三大毒徒骤发奇袭，玄难护佑小沙弥身中三笑逍遥散`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "剑痕毒袭 · 星宿派三大毒徒骤发奇袭，玄难护佑小沙弥身中三笑逍遥散" from 《剑痕浴血 · 少林九阳》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 374. `CG-QST-374`：密钞九阳 · 寒玉榻暗格现世，玄难亲授《少林九阳禅功密钞》

- **关联文件**：[`src/data/quests/sects/shaolinJiuyangCrisisQuest.ts`](../src/data/quests/sects/shaolinJiuyangCrisisQuest.ts)
- **目标路径**：`public/assets/quests/sl_29_jiuyang_scroll.jpg`
- **画框题跋**：`密钞九阳 · 寒玉榻暗格现世，玄难亲授《少林九阳禅功密钞》`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "密钞九阳 · 寒玉榻暗格现世，玄难亲授《少林九阳禅功密钞》" from 《剑痕浴血 · 少林九阳》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 375. `CG-QST-375`：纯阳佛掌 · 少林九阳真气沛然勃发，一掌震散满崖星宿腐毒

- **关联文件**：[`src/data/quests/sects/shaolinJiuyangCrisisQuest.ts`](../src/data/quests/sects/shaolinJiuyangCrisisQuest.ts)
- **目标路径**：`public/assets/quests/sl_29_pure_yang_blast.jpg`
- **画框题跋**：`纯阳佛掌 · 少林九阳真气沛然勃发，一掌震散满崖星宿腐毒`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "纯阳佛掌 · 少林九阳真气沛然勃发，一掌震散满崖星宿腐毒" from 《剑痕浴血 · 少林九阳》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 376. `CG-QST-376`：古杏扫叶 · 朝露暮霜之间，陪法空老僧默扫满庭秋叶

- **关联文件**：[`src/data/quests/sects/shaolinSweepLeafZenQuest.ts`](../src/data/quests/sects/shaolinSweepLeafZenQuest.ts)
- **目标路径**：`public/assets/quests/sl_30_ginkgo_sweep.jpg`
- **画框题跋**：`古杏扫叶 · 朝露暮霜之间，陪法空老僧默扫满庭秋叶`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "古杏扫叶 · 朝露暮霜之间，陪法空老僧默扫满庭秋叶" from 《慈悲默察 · 扫叶听风》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 377. `CG-QST-377`：案头抄经 · 焚香净手亲抄《楞伽经》，以慈悲笔意化解武学戾气

- **关联文件**：[`src/data/quests/sects/shaolinSweepLeafZenQuest.ts`](../src/data/quests/sects/shaolinSweepLeafZenQuest.ts)
- **目标路径**：`public/assets/quests/sl_30_copy_sutra.jpg`
- **画框题跋**：`案头抄经 · 焚香净手亲抄《楞伽经》，以慈悲笔意化解武学戾气`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "案头抄经 · 焚香净手亲抄《楞伽经》，以慈悲笔意化解武学戾气" from 《慈悲默察 · 扫叶听风》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 378. `CG-QST-378`：帚落无尘 · 扫叶听风终得心境圆明，无招无相自成宗师气象

- **关联文件**：[`src/data/quests/sects/shaolinSweepLeafZenQuest.ts`](../src/data/quests/sects/shaolinSweepLeafZenQuest.ts)
- **目标路径**：`public/assets/quests/sl_30_empty_broom.jpg`
- **画框题跋**：`帚落无尘 · 扫叶听风终得心境圆明，无招无相自成宗师气象`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "帚落无尘 · 扫叶听风终得心境圆明，无招无相自成宗师气象" from 《慈悲默察 · 扫叶听风》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 379. `CG-QST-379`：暗布天罗 · 三十六名少林精锐武僧暗伏飞檐古柏，拉起伏魔铁网

- **关联文件**：[`src/data/quests/sects/shaolinIronNetTrapQuest.ts`](../src/data/quests/sects/shaolinIronNetTrapQuest.ts)
- **目标路径**：`public/assets/quests/sl_31_iron_net.jpg`
- **画框题跋**：`暗布天罗 · 三十六名少林精锐武僧暗伏飞檐古柏，拉起伏魔铁网`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "暗布天罗 · 三十六名少林精锐武僧暗伏飞檐古柏，拉起伏魔铁网" from 《铁血伏魔 · 暗布天罗》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 380. `CG-QST-380`：子夜斩魔 · 琉璃阁前火光冲天，一击击毙西夏一品堂黑水魔僧

- **关联文件**：[`src/data/quests/sects/shaolinIronNetTrapQuest.ts`](../src/data/quests/sects/shaolinIronNetTrapQuest.ts)
- **目标路径**：`public/assets/quests/sl_31_slay_blackwater.jpg`
- **画框题跋**：`子夜斩魔 · 琉璃阁前火光冲天，一击击毙西夏一品堂黑水魔僧`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "子夜斩魔 · 琉璃阁前火光冲天，一击击毙西夏一品堂黑水魔僧" from 《铁血伏魔 · 暗布天罗》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 381. `CG-QST-381`：铁血威望 · 晨光下众武僧齐声合十致敬，铁血护寺之名震动全寺

- **关联文件**：[`src/data/quests/sects/shaolinIronNetTrapQuest.ts`](../src/data/quests/sects/shaolinIronNetTrapQuest.ts)
- **目标路径**：`public/assets/quests/sl_31_iron_prestige.jpg`
- **画框题跋**：`铁血威望 · 晨光下众武僧齐声合十致敬，铁血护寺之名震动全寺`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "铁血威望 · 晨光下众武僧齐声合十致敬，铁血护寺之名震动全寺" from 《铁血伏魔 · 暗布天罗》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 382. `CG-QST-382`：冰崖采芝 · 施展一苇渡江绝顶轻功，踏冰跃涧采得千年血灵芝

- **关联文件**：[`src/data/quests/sects/shaolinNineTurnPillQuest.ts`](../src/data/quests/sects/shaolinNineTurnPillQuest.ts)
- **目标路径**：`public/assets/quests/sl_32_ice_cliff_herb.jpg`
- **画框题跋**：`冰崖采芝 · 施展一苇渡江绝顶轻功，踏冰跃涧采得千年血灵芝`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "冰崖采芝 · 施展一苇渡江绝顶轻功，踏冰跃涧采得千年血灵芝" from 《药王瘟劫 · 九转回魂》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 383. `CG-QST-383`：独守丹房 · 风雪夜独战西夏一品堂毁炉死士三煞，寸步不让

- **关联文件**：[`src/data/quests/sects/shaolinNineTurnPillQuest.ts`](../src/data/quests/sects/shaolinNineTurnPillQuest.ts)
- **目标路径**：`public/assets/quests/sl_32_guard_furnace.jpg`
- **画框题跋**：`独守丹房 · 风雪夜独战西夏一品堂毁炉死士三煞，寸步不让`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "独守丹房 · 风雪夜独战西夏一品堂毁炉死士三煞，寸步不让" from 《药王瘟劫 · 九转回魂》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 384. `CG-QST-384`：九转回魂 · 药王院主玄生亲赠少林天阶圣药《少林九转大还丹》

- **关联文件**：[`src/data/quests/sects/shaolinNineTurnPillQuest.ts`](../src/data/quests/sects/shaolinNineTurnPillQuest.ts)
- **目标路径**：`public/assets/quests/sl_32_nine_turn_pill.jpg`
- **画框题跋**：`九转回魂 · 药王院主玄生亲赠少林天阶圣药《少林九转大还丹》`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "九转回魂 · 药王院主玄生亲赠少林天阶圣药《少林九转大还丹》" from 《药王瘟劫 · 九转回魂》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 385. `CG-QST-385`：菩提院议 · 大雄正殿玄字辈高僧齐聚，共议堂院首座与少室山大局

- **关联文件**：[`src/data/quests/sects/shaolinElderPromotionQuest.ts`](../src/data/quests/sects/shaolinElderPromotionQuest.ts)
- **目标路径**：`public/assets/quests/sl_33_bodhi_council.jpg`
- **画框题跋**：`菩提院议 · 大雄正殿玄字辈高僧齐聚，共议堂院首座与少室山大局`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "菩提院议 · 大雄正殿玄字辈高僧齐聚，共议堂院首座与少室山大局" from 《菩提院议 · 首座之争》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 386. `CG-QST-386`：首座印证 · 钟鼓禅院演武坪，与玄痛或玄难首座以武印道

- **关联文件**：[`src/data/quests/sects/shaolinElderPromotionQuest.ts`](../src/data/quests/sects/shaolinElderPromotionQuest.ts)
- **目标路径**：`public/assets/quests/sl_33_elder_spar.jpg`
- **画框题跋**：`首座印证 · 钟鼓禅院演武坪，与玄痛或玄难首座以武印道`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "首座印证 · 钟鼓禅院演武坪，与玄痛或玄难首座以武印道" from 《菩提院议 · 首座之争》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 387. `CG-QST-387`：授衣晋阶 · 玄慈方丈亲授红锦首座袈裟，正式晋升少林长老/堂院首座

- **关联文件**：[`src/data/quests/sects/shaolinElderPromotionQuest.ts`](../src/data/quests/sects/shaolinElderPromotionQuest.ts)
- **目标路径**：`public/assets/quests/sl_33_elder_robe.jpg`
- **画框题跋**：`授衣晋阶 · 玄慈方丈亲授红锦首座袈裟，正式晋升少林长老/堂院首座`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "授衣晋阶 · 玄慈方丈亲授红锦首座袈裟，正式晋升少林长老/堂院首座" from 《菩提院议 · 首座之争》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 388. `CG-QST-388`：洛阳白马寺大佛宝殿 · 玄悲大师惨死于本门「大韦陀杵」反噬之下，殿柱裂纹犹存

- **关联文件**：[`src/data/quests/sects/shaolinTwinMonkMurderQuest.ts`](../src/data/quests/sects/shaolinTwinMonkMurderQuest.ts)
- **目标路径**：`public/assets/quests/sl_34_xuanbei_death.jpg`
- **画框题跋**：`洛阳白马寺大佛宝殿 · 玄悲大师惨死于本门「大韦陀杵」反噬之下，殿柱裂纹犹存`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "洛阳白马寺大佛宝殿 · 玄悲大师惨死于本门「大韦陀杵」反噬之下，殿柱裂纹犹存" from 《大智大悲 · 身死之谜》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 389. `CG-QST-389`：嵩山罗汉堂 · 玄苦大师弥留嘱托后溘然圆寂，乔峰跪榻悲恸，堂外寒鸦惊飞

- **关联文件**：[`src/data/quests/sects/shaolinTwinMonkMurderQuest.ts`](../src/data/quests/sects/shaolinTwinMonkMurderQuest.ts)
- **目标路径**：`public/assets/quests/sl_34_xuanku_farewell.jpg`
- **画框题跋**：`嵩山罗汉堂 · 玄苦大师弥留嘱托后溘然圆寂，乔峰跪榻悲恸，堂外寒鸦惊飞`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "嵩山罗汉堂 · 玄苦大师弥留嘱托后溘然圆寂，乔峰跪榻悲恸，堂外寒鸦惊飞" from 《大智大悲 · 身死之谜》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 390. `CG-QST-390`：大雄正殿孤烛之下 · 与乔峰同辨两股截然不同的三十年暗影掌力：慕容斗转与契丹巨掌

- **关联文件**：[`src/data/quests/sects/shaolinTwinMonkMurderQuest.ts`](../src/data/quests/sects/shaolinTwinMonkMurderQuest.ts)
- **目标路径**：`public/assets/quests/sl_34_two_palms.jpg`
- **画框题跋**：`大雄正殿孤烛之下 · 与乔峰同辨两股截然不同的三十年暗影掌力：慕容斗转与契丹巨掌`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "大雄正殿孤烛之下 · 与乔峰同辨两股截然不同的三十年暗影掌力：慕容斗转与契丹巨掌" from 《大智大悲 · 身死之谜》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 391. `CG-QST-391`：少室山坪数千群雄大会 · 旌旗蔽日、丝竹喧天，中原豪杰与西域魔头对峙山门

- **关联文件**：[`src/data/quests/sects/shaolinWulinAssemblyScandalQuest.ts`](../src/data/quests/sects/shaolinWulinAssemblyScandalQuest.ts)
- **目标路径**：`public/assets/quests/sl_35_wulin_gathering.jpg`
- **画框题跋**：`少室山坪数千群雄大会 · 旌旗蔽日、丝竹喧天，中原豪杰与西域魔头对峙山门`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "少室山坪数千群雄大会 · 旌旗蔽日、丝竹喧天，中原豪杰与西域魔头对峙山门" from 《少室群雄 · 方丈丑闻》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 392. `CG-QST-392`：演武坪阵前 · 纯阳佛门罡气震散碧绿毒雾，硬接丁春秋十合化功毒掌纹丝不动

- **关联文件**：[`src/data/quests/sects/shaolinWulinAssemblyScandalQuest.ts`](../src/data/quests/sects/shaolinWulinAssemblyScandalQuest.ts)
- **目标路径**：`public/assets/quests/sl_35_ding_poison.jpg`
- **画框题跋**：`演武坪阵前 · 纯阳佛门罡气震散碧绿毒雾，硬接丁春秋十合化功毒掌纹丝不动`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "演武坪阵前 · 纯阳佛门罡气震散碧绿毒雾，硬接丁春秋十合化功毒掌纹丝不动" from 《少室群雄 · 方丈丑闻》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 393. `CG-QST-393`：大雄宝殿丹墀 · 吐蕃国师鸠摩智连施少林七十二绝技挑衅全寺，金袈裟猎猎作响

- **关联文件**：[`src/data/quests/sects/shaolinWulinAssemblyScandalQuest.ts`](../src/data/quests/sects/shaolinWulinAssemblyScandalQuest.ts)
- **目标路径**：`public/assets/quests/sl_35_jiumozhi_show.jpg`
- **画框题跋**：`大雄宝殿丹墀 · 吐蕃国师鸠摩智连施少林七十二绝技挑衅全寺，金袈裟猎猎作响`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "大雄宝殿丹墀 · 吐蕃国师鸠摩智连施少林七十二绝技挑衅全寺，金袈裟猎猎作响" from 《少室群雄 · 方丈丑闻》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 394. `CG-QST-394`：大雄宝殿丹墀 · 黑衣萧远山当众揭破玄慈与叶二娘二十四年前私生子丑闻，满山群雄哗然

- **关联文件**：[`src/data/quests/sects/shaolinWulinAssemblyScandalQuest.ts`](../src/data/quests/sects/shaolinWulinAssemblyScandalQuest.ts)
- **目标路径**：`public/assets/quests/sl_35_scandal_exposed.jpg`
- **画框题跋**：`大雄宝殿丹墀 · 黑衣萧远山当众揭破玄慈与叶二娘二十四年前私生子丑闻，满山群雄哗然`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "大雄宝殿丹墀 · 黑衣萧远山当众揭破玄慈与叶二娘二十四年前私生子丑闻，满山群雄哗然" from 《少室群雄 · 方丈丑闻》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 395. `CG-QST-395`：幽谷石室寒玉榻前 · 玄澄老泪纵横，亲手将天阶圣物「少林舍利伽蓝念珠」挂于主角颈间

- **关联文件**：[`src/data/quests/sects/shaolinXisuiAwakenQuest.ts`](../src/data/quests/sects/shaolinXisuiAwakenQuest.ts)
- **目标路径**：`public/assets/quests/sl_36_sarira_beads.jpg`
- **画框题跋**：`幽谷石室寒玉榻前 · 玄澄老泪纵横，亲手将天阶圣物「少林舍利伽蓝念珠」挂于主角颈间`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "幽谷石室寒玉榻前 · 玄澄老泪纵横，亲手将天阶圣物「少林舍利伽蓝念珠」挂于主角颈间" from 《寒玉百日 · 洗髓换骨》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 396. `CG-QST-396`：达摩面壁石洞绝壁石刻 · 孤灯微明下以指摩挲五百年古梵洗髓秘篆

- **关联文件**：[`src/data/quests/sects/shaolinXisuiAwakenQuest.ts`](../src/data/quests/sects/shaolinXisuiAwakenQuest.ts)
- **目标路径**：`public/assets/quests/sl_36_damo_wall.jpg`
- **画框题跋**：`达摩面壁石洞绝壁石刻 · 孤灯微明下以指摩挲五百年古梵洗髓秘篆`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "达摩面壁石洞绝壁石刻 · 孤灯微明下以指摩挲五百年古梵洗髓秘篆" from 《寒玉百日 · 洗髓换骨》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 397. `CG-QST-397`：达摩洞百日心斋禅定功成 · 晨曦透洞，舍利念珠流光映照，洗尽凡髓悟透《洗髓经》

- **关联文件**：[`src/data/quests/sects/shaolinXisuiAwakenQuest.ts`](../src/data/quests/sects/shaolinXisuiAwakenQuest.ts)
- **目标路径**：`public/assets/quests/sl_36_hundred_day_zen.jpg`
- **画框题跋**：`达摩洞百日心斋禅定功成 · 晨曦透洞，舍利念珠流光映照，洗尽凡髓悟透《洗髓经》`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "达摩洞百日心斋禅定功成 · 晨曦透洞，舍利念珠流光映照，洗尽凡髓悟透《洗髓经》" from 《寒玉百日 · 洗髓换骨》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 398. `CG-QST-398`：大雄宝殿山坪 · 《洗髓经》二十合破尽小无相功虚妄，大轮明王鸠摩智吐血退败

- **关联文件**：[`src/data/quests/sects/shaolinXisuiAwakenQuest.ts`](../src/data/quests/sects/shaolinXisuiAwakenQuest.ts)
- **目标路径**：`public/assets/quests/sl_36_defeat_jiumozhi.jpg`
- **画框题跋**：`大雄宝殿山坪 · 《洗髓经》二十合破尽小无相功虚妄，大轮明王鸠摩智吐血退败`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "大雄宝殿山坪 · 《洗髓经》二十合破尽小无相功虚妄，大轮明王鸠摩智吐血退败" from 《寒玉百日 · 洗髓换骨》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 399. `CG-QST-399`：大雄宝殿前 · 玄慈卸去袈裟坦然自领戒律二百刑杖，血染青石以身明法

- **关联文件**：[`src/data/quests/sects/shaolinEndingMercifulAbbotQuest.ts`](../src/data/quests/sects/shaolinEndingMercifulAbbotQuest.ts)
- **目标路径**：`public/assets/quests/sl_38_xuanci_rod.jpg`
- **画框题跋**：`大雄宝殿前 · 玄慈卸去袈裟坦然自领戒律二百刑杖，血染青石以身明法`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "大雄宝殿前 · 玄慈卸去袈裟坦然自领戒律二百刑杖，血染青石以身明法" from 《杖责还业 · 达摩传衣》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 400. `CG-QST-400`：大雄正殿 · 玄慈方丈圆寂前亲手将天阶圣衣《少林达摩袈裟》披于主角肩头，托付禅宗正统

- **关联文件**：[`src/data/quests/sects/shaolinEndingMercifulAbbotQuest.ts`](../src/data/quests/sects/shaolinEndingMercifulAbbotQuest.ts)
- **目标路径**：`public/assets/quests/sl_38_kasaya_handover.jpg`
- **画框题跋**：`大雄正殿 · 玄慈方丈圆寂前亲手将天阶圣衣《少林达摩袈裟》披于主角肩头，托付禅宗正统`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "大雄正殿 · 玄慈方丈圆寂前亲手将天阶圣衣《少林达摩袈裟》披于主角肩头，托付禅宗正统" from 《杖责还业 · 达摩传衣》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 401. `CG-QST-401`：残阳暮钟 · 叶二娘于玄慈遗体旁自尽殉情，二十四载痴缠化作嵩山一缕秋风

- **关联文件**：[`src/data/quests/sects/shaolinEndingMercifulAbbotQuest.ts`](../src/data/quests/sects/shaolinEndingMercifulAbbotQuest.ts)
- **目标路径**：`public/assets/quests/sl_38_leaf_bell.jpg`
- **画框题跋**：`残阳暮钟 · 叶二娘于玄慈遗体旁自尽殉情，二十四载痴缠化作嵩山一缕秋风`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "残阳暮钟 · 叶二娘于玄慈遗体旁自尽殉情，二十四载痴缠化作嵩山一缕秋风" from 《杖责还业 · 达摩传衣》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 402. `CG-QST-402`：大雄宝殿 · 身披天阶达摩袈裟登坛升座，四十八房高僧与千余僧众合十恭迎新任慈悲方丈

- **关联文件**：[`src/data/quests/sects/shaolinEndingMercifulAbbotQuest.ts`](../src/data/quests/sects/shaolinEndingMercifulAbbotQuest.ts)
- **目标路径**：`public/assets/quests/sl_38_merciful_abbot.jpg`
- **画框题跋**：`大雄宝殿 · 身披天阶达摩袈裟登坛升座，四十八房高僧与千余僧众合十恭迎新任慈悲方丈`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "大雄宝殿 · 身披天阶达摩袈裟登坛升座，四十八房高僧与千余僧众合十恭迎新任慈悲方丈" from 《杖责还业 · 达摩传衣》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 403. `CG-QST-403`：大雄宝殿高台 · 主角手执玄铁法杖宣读少林铁律，监刑杖责玄慈并革去其方丈法位

- **关联文件**：[`src/data/quests/sects/shaolinEndingIronDharmaKingQuest.ts`](../src/data/quests/sects/shaolinEndingIronDharmaKingQuest.ts)
- **目标路径**：`public/assets/quests/sl_39_iron_verdict.jpg`
- **画框题跋**：`大雄宝殿高台 · 主角手执玄铁法杖宣读少林铁律，监刑杖责玄慈并革去其方丈法位`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "大雄宝殿高台 · 主角手执玄铁法杖宣读少林铁律，监刑杖责玄慈并革去其方丈法位" from 《雷霆涤寺 · 铁腕法王》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 404. `CG-QST-404`：东厢碑廊 · 主角雷霆查封暗账、手书《少林重修铁律十二条》，森严法堂气象一新

- **关联文件**：[`src/data/quests/sects/shaolinEndingIronDharmaKingQuest.ts`](../src/data/quests/sects/shaolinEndingIronDharmaKingQuest.ts)
- **目标路径**：`public/assets/quests/sl_39_iron_hall.jpg`
- **画框题跋**：`东厢碑廊 · 主角雷霆查封暗账、手书《少林重修铁律十二条》，森严法堂气象一新`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "东厢碑廊 · 主角雷霆查封暗账、手书《少林重修铁律十二条》，森严法堂气象一新" from 《雷霆涤寺 · 铁腕法王》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 405. `CG-QST-405`：钟鼓禅院演武坪 · 金刚不坏金身光芒大作，主角徒手震断三名邪派掌门神兵

- **关联文件**：[`src/data/quests/sects/shaolinEndingIronDharmaKingQuest.ts`](../src/data/quests/sects/shaolinEndingIronDharmaKingQuest.ts)
- **目标路径**：`public/assets/quests/sl_39_break_blades.jpg`
- **画框题跋**：`钟鼓禅院演武坪 · 金刚不坏金身光芒大作，主角徒手震断三名邪派掌门神兵`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "钟鼓禅院演武坪 · 金刚不坏金身光芒大作，主角徒手震断三名邪派掌门神兵" from 《雷霆涤寺 · 铁腕法王》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 406. `CG-QST-406`：大雄宝殿 · 玄痛、玄寂率四十八房拥戴主角披《少林达摩袈裟》登位少林护教铁腕法王

- **关联文件**：[`src/data/quests/sects/shaolinEndingIronDharmaKingQuest.ts`](../src/data/quests/sects/shaolinEndingIronDharmaKingQuest.ts)
- **目标路径**：`public/assets/quests/sl_39_dharma_king.jpg`
- **画框题跋**：`大雄宝殿 · 玄痛、玄寂率四十八房拥戴主角披《少林达摩袈裟》登位少林护教铁腕法王`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "大雄宝殿 · 玄痛、玄寂率四十八房拥戴主角披《少林达摩袈裟》登位少林护教铁腕法王" from 《雷霆涤寺 · 铁腕法王》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 407. `CG-QST-407`：大雄正殿 · 一袭白衣长发立于佛前，朗喝“心中有佛何必剃发”，引《维摩诘经》禅语震醒满寺高僧

- **关联文件**：[`src/data/quests/sects/shaolinEndingVimalakirtiLaymanQuest.ts`](../src/data/quests/sects/shaolinEndingVimalakirtiLaymanQuest.ts)
- **目标路径**：`public/assets/quests/sl_40_white_robe_zen.jpg`
- **画框题跋**：`大雄正殿 · 一袭白衣长发立于佛前，朗喝“心中有佛何必剃发”，引《维摩诘经》禅语震醒满寺高僧`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "大雄正殿 · 一袭白衣长发立于佛前，朗喝“心中有佛何必剃发”，引《维摩诘经》禅语震醒满寺高僧" from 《不着袈裟 · 维摩护法》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 408. `CG-QST-408`：钟鼓禅院演武坪 · 一袭白衣迎风猎猎，主角孤身迎战大辽暗院使与西夏黑莲客

- **关联文件**：[`src/data/quests/sects/shaolinEndingVimalakirtiLaymanQuest.ts`](../src/data/quests/sects/shaolinEndingVimalakirtiLaymanQuest.ts)
- **目标路径**：`public/assets/quests/sl_40_vimalakirti_duel.jpg`
- **画框题跋**：`钟鼓禅院演武坪 · 一袭白衣迎风猎猎，主角孤身迎战大辽暗院使与西夏黑莲客`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "钟鼓禅院演武坪 · 一袭白衣迎风猎猎，主角孤身迎战大辽暗院使与西夏黑莲客" from 《不着袈裟 · 维摩护法》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 409. `CG-QST-409`：大雄正殿 · 玄慈方丈愧赠天阶圣衣《少林达摩袈裟》并托付少林同盟大印，含笑圆寂

- **关联文件**：[`src/data/quests/sects/shaolinEndingVimalakirtiLaymanQuest.ts`](../src/data/quests/sects/shaolinEndingVimalakirtiLaymanQuest.ts)
- **目标路径**：`public/assets/quests/sl_40_alliance_seal.jpg`
- **画框题跋**：`大雄正殿 · 玄慈方丈愧赠天阶圣衣《少林达摩袈裟》并托付少林同盟大印，含笑圆寂`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "大雄正殿 · 玄慈方丈愧赠天阶圣衣《少林达摩袈裟》并托付少林同盟大印，含笑圆寂" from 《不着袈裟 · 维摩护法》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 410. `CG-QST-410`：嵩山大雄宝殿 · 白衣大居士高擎同盟金印，总摄嵩山少林僧兵与大相国寺、白马寺、莆田南少林天下同盟

- **关联文件**：[`src/data/quests/sects/shaolinEndingVimalakirtiLaymanQuest.ts`](../src/data/quests/sects/shaolinEndingVimalakirtiLaymanQuest.ts)
- **目标路径**：`public/assets/quests/sl_40_layman_banner.jpg`
- **画框题跋**：`嵩山大雄宝殿 · 白衣大居士高擎同盟金印，总摄嵩山少林僧兵与大相国寺、白马寺、莆田南少林天下同盟`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "嵩山大雄宝殿 · 白衣大居士高擎同盟金印，总摄嵩山少林僧兵与大相国寺、白马寺、莆田南少林天下同盟" from 《不着袈裟 · 维摩护法》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 411. `CG-QST-411`：万姓雅市 · 剖丸验毒，揭破假冒少林大力丸暗掺砒霜之奸计

- **关联文件**：[`src/data/quests/sects/shaolinSideXiangguoFakeMedQuest.ts`](../src/data/quests/sects/shaolinSideXiangguoFakeMedQuest.ts)
- **目标路径**：`public/assets/quests/sl_s06_fake_meds.jpg`
- **画框题跋**：`万姓雅市 · 剖丸验毒，揭破假冒少林大力丸暗掺砒霜之奸计`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "万姓雅市 · 剖丸验毒，揭破假冒少林大力丸暗掺砒霜之奸计" from 《万姓雅市 · 假药风波》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 412. `CG-QST-412`：城外废窑黑坊 · 掀笠亮明少林身份，正气凛然斥责江淮毒贩

- **关联文件**：[`src/data/quests/sects/shaolinSideXiangguoFakeMedQuest.ts`](../src/data/quests/sects/shaolinSideXiangguoFakeMedQuest.ts)
- **目标路径**：`public/assets/quests/sl_s06_black_workshop.jpg`
- **画框题跋**：`城外废窑黑坊 · 掀笠亮明少林身份，正气凛然斥责江淮毒贩`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "城外废窑黑坊 · 掀笠亮明少林身份，正气凛然斥责江淮毒贩" from 《万姓雅市 · 假药风波》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 413. `CG-QST-413`：资圣宝塔 · 百尺飞檐暴雨倾盆，夜色中一道黑影如雨燕掠至

- **关联文件**：[`src/data/quests/sects/shaolinSideZishengPagodaQuest.ts`](../src/data/quests/sects/shaolinSideZishengPagodaQuest.ts)
- **目标路径**：`public/assets/quests/sl_s07_pagoda_rain.jpg`
- **画框题跋**：`资圣宝塔 · 百尺飞檐暴雨倾盆，夜色中一道黑影如雨燕掠至`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "资圣宝塔 · 百尺飞檐暴雨倾盆，夜色中一道黑影如雨燕掠至" from 《资圣宝塔 · 夜雨护经》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 414. `CG-QST-414`：雨夜生擒 · 少林擒拿手扣住飞贼肩井，踏云燕折翼就擒

- **关联文件**：[`src/data/quests/sects/shaolinSideZishengPagodaQuest.ts`](../src/data/quests/sects/shaolinSideZishengPagodaQuest.ts)
- **目标路径**：`public/assets/quests/sl_s07_capture_swallow.jpg`
- **画框题跋**：`雨夜生擒 · 少林擒拿手扣住飞贼肩井，踏云燕折翼就擒`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "雨夜生擒 · 少林擒拿手扣住飞贼肩井，踏云燕折翼就擒" from 《资圣宝塔 · 夜雨护经》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 415. `CG-QST-415`：洛阳暗箭 · 疾步掀翻紫檀八仙桌，凌空挡下漫天淬毒袖箭

- **关联文件**：[`src/data/quests/sects/shaolinSideGoldenBladeBanquetQuest.ts`](../src/data/quests/sects/shaolinSideGoldenBladeBanquetQuest.ts)
- **目标路径**：`public/assets/quests/sl_s08_jindao_arrows.jpg`
- **画框题跋**：`洛阳暗箭 · 疾步掀翻紫檀八仙桌，凌空挡下漫天淬毒袖箭`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "洛阳暗箭 · 疾步掀翻紫檀八仙桌，凌空挡下漫天淬毒袖箭" from 《金刀寿宴 · 洛阳暗箭》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 416. `CG-QST-416`：铁血盟谊 · 正气大厅以茶代酒，少林与洛阳金刀王家缔结守望之盟

- **关联文件**：[`src/data/quests/sects/shaolinSideGoldenBladeBanquetQuest.ts`](../src/data/quests/sects/shaolinSideGoldenBladeBanquetQuest.ts)
- **目标路径**：`public/assets/quests/sl_s08_alliance_toast.jpg`
- **画框题跋**：`铁血盟谊 · 正气大厅以茶代酒，少林与洛阳金刀王家缔结守望之盟`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "铁血盟谊 · 正气大厅以茶代酒，少林与洛阳金刀王家缔结守望之盟" from 《金刀寿宴 · 洛阳暗箭》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 417. `CG-QST-417`：齐云古塔夜袭 · 吐蕃黑教护法巴桑破门强夺佛骨舍利宝函

- **关联文件**：[`src/data/quests/sects/shaolinSideQiyunRelicQuest.ts`](../src/data/quests/sects/shaolinSideQiyunRelicQuest.ts)
- **目标路径**：`public/assets/quests/sl_s09_qiyun_relic.jpg`
- **画框题跋**：`齐云古塔夜袭 · 吐蕃黑教护法巴桑破门强夺佛骨舍利宝函`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "齐云古塔夜袭 · 吐蕃黑教护法巴桑破门强夺佛骨舍利宝函" from 《齐云古塔 · 舍利迷踪》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 418. `CG-QST-418`：十三层绝顶 · 月下击败吐蕃黑教护法巴桑，完璧夺回舍利宝函

- **关联文件**：[`src/data/quests/sects/shaolinSideQiyunRelicQuest.ts`](../src/data/quests/sects/shaolinSideQiyunRelicQuest.ts)
- **目标路径**：`public/assets/quests/sl_s09_pagoda_summit.jpg`
- **画框题跋**：`十三层绝顶 · 月下击败吐蕃黑教护法巴桑，完璧夺回舍利宝函`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "十三层绝顶 · 月下击败吐蕃黑教护法巴桑，完璧夺回舍利宝函" from 《齐云古塔 · 舍利迷踪》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 419. `CG-QST-419`：西厢晒经 · 清风拂过青石竹簟，芸香护卷抢救宋版佛经孤本

- **关联文件**：[`src/data/quests/sects/shaolinSideSunScriptureQuest.ts`](../src/data/quests/sects/shaolinSideSunScriptureQuest.ts)
- **目标路径**：`public/assets/quests/sl_s10_sun_sutras.jpg`
- **画框题跋**：`西厢晒经 · 清风拂过青石竹簟，芸香护卷抢救宋版佛经孤本`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "西厢晒经 · 清风拂过青石竹簟，芸香护卷抢救宋版佛经孤本" from 《西厢晒经 · 芸香防蠹》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 420. `CG-QST-420`：古杏颔首 · 灰衣扫地僧法空停帚远观，对护经明心之举微微颔首

- **关联文件**：[`src/data/quests/sects/shaolinSideSunScriptureQuest.ts`](../src/data/quests/sects/shaolinSideSunScriptureQuest.ts)
- **目标路径**：`public/assets/quests/sl_s10_fakuo_nod.jpg`
- **画框题跋**：`古杏颔首 · 灰衣扫地僧法空停帚远观，对护经明心之举微微颔首`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "古杏颔首 · 灰衣扫地僧法空停帚远观，对护经明心之举微微颔首" from 《西厢晒经 · 芸香防蠹》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 421. `CG-QST-421`：小罗汉阵 · 督导虚胜、虚觉等六僧踏位合棍，初成金汤阵势

- **关联文件**：[`src/data/quests/sects/shaolinSideArhatDrillQuest.ts`](../src/data/quests/sects/shaolinSideArhatDrillQuest.ts)
- **目标路径**：`public/assets/quests/sl_s11_mini_arhat.jpg`
- **画框题跋**：`小罗汉阵 · 督导虚胜、虚觉等六僧踏位合棍，初成金汤阵势`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "小罗汉阵 · 督导虚胜、虚觉等六僧踏位合棍，初成金汤阵势" from 《罗汉涂金 · 顽徒试炼》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 422. `CG-QST-422`：阵眼破狂徒 · 巧借小罗汉阵合围之势，一举震飞百斤铁锤重创狂徒

- **关联文件**：[`src/data/quests/sects/shaolinSideArhatDrillQuest.ts`](../src/data/quests/sects/shaolinSideArhatDrillQuest.ts)
- **目标路径**：`public/assets/quests/sl_s11_hammer_defeat.jpg`
- **画框题跋**：`阵眼破狂徒 · 巧借小罗汉阵合围之势，一举震飞百斤铁锤重创狂徒`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "阵眼破狂徒 · 巧借小罗汉阵合围之势，一举震飞百斤铁锤重创狂徒" from 《罗汉涂金 · 顽徒试炼》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 423. `CG-QST-423`：寒雾深涧飞瀑如练，碧绿毒烟自潭畔青石间袅袅升腾

- **关联文件**：[`src/data/quests/sects/shaolinSideColdJadeGuardQuest.ts`](../src/data/quests/sects/shaolinSideColdJadeGuardQuest.ts)
- **目标路径**：`public/assets/quests/sl_s12_misty_gorge.jpg`
- **画框题跋**：`寒雾深涧飞瀑如练，碧绿毒烟自潭畔青石间袅袅升腾`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "寒雾深涧飞瀑如练，碧绿毒烟自潭畔青石间袅袅升腾" from 《寒玉护脉 · 伏虎除魔》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 424. `CG-QST-424`：玉面毒龙凌空扑下，十指黑气森然，与少林护法高徒决战寒涧

- **关联文件**：[`src/data/quests/sects/shaolinSideColdJadeGuardQuest.ts`](../src/data/quests/sects/shaolinSideColdJadeGuardQuest.ts)
- **目标路径**：`public/assets/quests/sl_s12_jade_dragon.jpg`
- **画框题跋**：`玉面毒龙凌空扑下，十指黑气森然，与少林护法高徒决战寒涧`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "玉面毒龙凌空扑下，十指黑气森然，与少林护法高徒决战寒涧" from 《寒玉护脉 · 伏虎除魔》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 425. `CG-QST-425`：资圣八角宝塔前金光激荡，少林禅功硬撼西夏密宗狮吼梵音

- **关联文件**：[`src/data/quests/sects/shaolinSideTibetanDebateQuest.ts`](../src/data/quests/sects/shaolinSideTibetanDebateQuest.ts)
- **目标路径**：`public/assets/quests/sl_s13_lion_roar.jpg`
- **画框题跋**：`资圣八角宝塔前金光激荡，少林禅功硬撼西夏密宗狮吼梵音`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "资圣八角宝塔前金光激荡，少林禅功硬撼西夏密宗狮吼梵音" from 《大雄狮吼 · 番僧问难》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 426. `CG-QST-426`：大雄宝殿香云缭绕，宣旨内侍奉仁宗圣谕颁赐赏银与御前嘉奖

- **关联文件**：[`src/data/quests/sects/shaolinSideTibetanDebateQuest.ts`](../src/data/quests/sects/shaolinSideTibetanDebateQuest.ts)
- **目标路径**：`public/assets/quests/sl_s13_imperial_bowl.jpg`
- **画框题跋**：`大雄宝殿香云缭绕，宣旨内侍奉仁宗圣谕颁赐赏银与御前嘉奖`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "大雄宝殿香云缭绕，宣旨内侍奉仁宗圣谕颁赐赏银与御前嘉奖" from 《大雄狮吼 · 番僧问难》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 427. `CG-QST-427`：钟鼓禅院演武坪秋风卷叶，南北少林顶尖高徒硬桥硬马巅峰交锋

- **关联文件**：[`src/data/quests/sects/shaolinSideNorthSouthSparQuest.ts`](../src/data/quests/sects/shaolinSideNorthSouthSparQuest.ts)
- **目标路径**：`public/assets/quests/sl_s14_north_south.jpg`
- **画框题跋**：`钟鼓禅院演武坪秋风卷叶，南北少林顶尖高徒硬桥硬马巅峰交锋`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "钟鼓禅院演武坪秋风卷叶，南北少林顶尖高徒硬桥硬马巅峰交锋" from 《铁线争锋 · 闽僧北访》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 428. `CG-QST-428`：东厢碑廊松烟袅袅，元通首座手书《铁线拳》运劲秘诀相赠北宗同门

- **关联文件**：[`src/data/quests/sects/shaolinSideNorthSouthSparQuest.ts`](../src/data/quests/sects/shaolinSideNorthSouthSparQuest.ts)
- **目标路径**：`public/assets/quests/sl_s14_iron_wire_gift.jpg`
- **画框题跋**：`东厢碑廊松烟袅袅，元通首座手书《铁线拳》运劲秘诀相赠北宗同门`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "东厢碑廊松烟袅袅，元通首座手书《铁线拳》运劲秘诀相赠北宗同门" from 《铁线争锋 · 闽僧北访》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 429. `CG-QST-429`：孟州黄河渡口万盏河灯顺流而下，少林高僧登坛诵经超度抗辽夏忠魂

- **关联文件**：[`src/data/quests/sects/shaolinSideYellowRiverRitualQuest.ts`](../src/data/quests/sects/shaolinSideYellowRiverRitualQuest.ts)
- **目标路径**：`public/assets/quests/sl_s15_yellow_river.jpg`
- **画框题跋**：`孟州黄河渡口万盏河灯顺流而下，少林高僧登坛诵经超度抗辽夏忠魂`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "孟州黄河渡口万盏河灯顺流而下，少林高僧登坛诵经超度抗辽夏忠魂" from 《黄河水陆 · 孤忠超度》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 430. `CG-QST-430`：黄河浮桥狂风怒浪，少林高徒迎战潜渡袭坛的西夏一品堂一流上品双刺客

- **关联文件**：[`src/data/quests/sects/shaolinSideYellowRiverRitualQuest.ts`](../src/data/quests/sects/shaolinSideYellowRiverRitualQuest.ts)
- **目标路径**：`public/assets/quests/sl_s15_floating_bridge.jpg`
- **画框题跋**：`黄河浮桥狂风怒浪，少林高徒迎战潜渡袭坛的西夏一品堂一流上品双刺客`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "黄河浮桥狂风怒浪，少林高徒迎战潜渡袭坛的西夏一品堂一流上品双刺客" from 《黄河水陆 · 孤忠超度》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 431. `CG-QST-431`：佛官合谋 · 开封府正堂灯下勘账，少林首座与包拯、展昭定计除奸

- **关联文件**：[`src/data/quests/sects/shaolinSideOrdinationPurgeQuest.ts`](../src/data/quests/sects/shaolinSideOrdinationPurgeQuest.ts)
- **目标路径**：`public/assets/quests/sl_s16_kaifeng_ally.jpg`
- **画框题跋**：`佛官合谋 · 开封府正堂灯下勘账，少林首座与包拯、展昭定计除奸`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "佛官合谋 · 开封府正堂灯下勘账，少林首座与包拯、展昭定计除奸" from 《清源正本 · 度牒大案》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 432. `CG-QST-432`：伏魔诛邪 · 京西私庄夜火漫天，少林首座破尽血刀诛灭邪僧摩罗

- **关联文件**：[`src/data/quests/sects/shaolinSideOrdinationPurgeQuest.ts`](../src/data/quests/sects/shaolinSideOrdinationPurgeQuest.ts)
- **目标路径**：`public/assets/quests/sl_s16_blood_kasaya.jpg`
- **画框题跋**：`伏魔诛邪 · 京西私庄夜火漫天，少林首座破尽血刀诛灭邪僧摩罗`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "伏魔诛邪 · 京西私庄夜火漫天，少林首座破尽血刀诛灭邪僧摩罗" from 《清源正本 · 度牒大案》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 433. `CG-QST-433`：风雪山门 · 少室大雪漫天，少林首座独战西夏一品堂宗师追魂使

- **关联文件**：[`src/data/quests/sects/shaolinSideSnowRedemptionQuest.ts`](../src/data/quests/sects/shaolinSideSnowRedemptionQuest.ts)
- **目标路径**：`public/assets/quests/sl_s17_snow_gate.jpg`
- **画框题跋**：`风雪山门 · 少室大雪漫天，少林首座独战西夏一品堂宗师追魂使`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "风雪山门 · 少室大雪漫天，少林首座独战西夏一品堂宗师追魂使" from 《少室大雪 · 慈航度恶》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 434. `CG-QST-434`：慈航度恶 · 佛前废去悍匪毒爪恶功，判其披麻扫雪塔林终生赎罪

- **关联文件**：[`src/data/quests/sects/shaolinSideSnowRedemptionQuest.ts`](../src/data/quests/sects/shaolinSideSnowRedemptionQuest.ts)
- **目标路径**：`public/assets/quests/sl_s17_snow_redemption.jpg`
- **画框题跋**：`慈航度恶 · 佛前废去悍匪毒爪恶功，判其披麻扫雪塔林终生赎罪`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "慈航度恶 · 佛前废去悍匪毒爪恶功，判其披麻扫雪塔林终生赎罪" from 《少室大雪 · 慈航度恶》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 435. `CG-QST-435`：沧海遗图 · 达摩院孤灯展卷，初祖泛海东渡羊皮古图与海路禅偈重见天日

- **关联文件**：[`src/data/quests/sects/shaolinSideBodhidharmaChartQuest.ts`](../src/data/quests/sects/shaolinSideBodhidharmaChartQuest.ts)
- **目标路径**：`public/assets/quests/sl_s18_sea_chart.jpg`
- **画框题跋**：`沧海遗图 · 达摩院孤灯展卷，初祖泛海东渡羊皮古图与海路禅偈重见天日`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "沧海遗图 · 达摩院孤灯展卷，初祖泛海东渡羊皮古图与海路禅偈重见天日" from 《达摩东渡 · 沧海遗图》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 436. `CG-QST-436`：云海日出 · 少室绝顶万丈冰崖，以少林绝学连战天竺与波斯异域双尊

- **关联文件**：[`src/data/quests/sects/shaolinSideBodhidharmaChartQuest.ts`](../src/data/quests/sects/shaolinSideBodhidharmaChartQuest.ts)
- **目标路径**：`public/assets/quests/sl_s18_cloud_sea_duel.jpg`
- **画框题跋**：`云海日出 · 少室绝顶万丈冰崖，以少林绝学连战天竺与波斯异域双尊`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "云海日出 · 少室绝顶万丈冰崖，以少林绝学连战天竺与波斯异域双尊" from 《达摩东渡 · 沧海遗图》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 437. `CG-QST-437`：大雄宝殿丹墀 · 鸠摩智火焰刀无形罡气连伤玄痛、玄寂二僧，少室山群豪震骇失色

- **关联文件**：[`src/data/quests/sects/shaolinVajraBodyAwakenQuest.ts`](../src/data/quests/sects/shaolinVajraBodyAwakenQuest.ts)
- **目标路径**：`public/assets/quests/sl_37_flame_knife.jpg`
- **画框题跋**：`大雄宝殿丹墀 · 鸠摩智火焰刀无形罡气连伤玄痛、玄寂二僧，少室山群豪震骇失色`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "大雄宝殿丹墀 · 鸠摩智火焰刀无形罡气连伤玄痛、玄寂二僧，少室山群豪震骇失色" from 《烈火金身 · 金刚不坏》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 438. `CG-QST-438`：大雄宝殿丹墀 · 丁春秋腐尸毒烟与鸠摩智火焰刀合围，主角孤身护住重伤二僧于炼狱之中

- **关联文件**：[`src/data/quests/sects/shaolinVajraBodyAwakenQuest.ts`](../src/data/quests/sects/shaolinVajraBodyAwakenQuest.ts)
- **目标路径**：`public/assets/quests/sl_37_poison_fog.jpg`
- **画框题跋**：`大雄宝殿丹墀 · 丁春秋腐尸毒烟与鸠摩智火焰刀合围，主角孤身护住重伤二僧于炼狱之中`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "大雄宝殿丹墀 · 丁春秋腐尸毒烟与鸠摩智火焰刀合围，主角孤身护住重伤二僧于炼狱之中" from 《烈火金身 · 金刚不坏》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 439. `CG-QST-439`：大雄宝殿丹墀 · 烈火毒雾中骨骼雷鸣、周身泛起淡金宝光，破关悟成《金刚不坏体神功》

- **关联文件**：[`src/data/quests/sects/shaolinVajraBodyAwakenQuest.ts`](../src/data/quests/sects/shaolinVajraBodyAwakenQuest.ts)
- **目标路径**：`public/assets/quests/sl_37_golden_body.jpg`
- **画框题跋**：`大雄宝殿丹墀 · 烈火毒雾中骨骼雷鸣、周身泛起淡金宝光，破关悟成《金刚不坏体神功》`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "大雄宝殿丹墀 · 烈火毒雾中骨骼雷鸣、周身泛起淡金宝光，破关悟成《金刚不坏体神功》" from 《烈火金身 · 金刚不坏》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 440. `CG-QST-440`：少室演武坪 · 主角周身淡金宝光正面硬吃火焰刀罡气，一拳雷霆震飞大轮明王鸠摩智

- **关联文件**：[`src/data/quests/sects/shaolinVajraBodyAwakenQuest.ts`](../src/data/quests/sects/shaolinVajraBodyAwakenQuest.ts)
- **目标路径**：`public/assets/quests/sl_37_crush_jiumozhi.jpg`
- **画框题跋**：`少室演武坪 · 主角周身淡金宝光正面硬吃火焰刀罡气，一拳雷霆震飞大轮明王鸠摩智`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "少室演武坪 · 主角周身淡金宝光正面硬吃火焰刀罡气，一拳雷霆震飞大轮明王鸠摩智" from 《烈火金身 · 金刚不坏》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 441. `CG-QST-441`：嵩山晨钟急撞九十九响 · 北麓三路烽烟冲天，西夏铁骑与星宿毒人直逼少室山

- **关联文件**：[`src/data/quests/sects/shaolinThousandMonkWarQuest.ts`](../src/data/quests/sects/shaolinThousandMonkWarQuest.ts)
- **目标路径**：`public/assets/quests/sl_41_ninety_nine_bells.jpg`
- **画框题跋**：`嵩山晨钟急撞九十九响 · 北麓三路烽烟冲天，西夏铁骑与星宿毒人直逼少室山`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "嵩山晨钟急撞九十九响 · 北麓三路烽烟冲天，西夏铁骑与星宿毒人直逼少室山" from 《千僧列阵 · 血护少室》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 442. `CG-QST-442`：少室山腰 · 主角亲布五百罗汉伏魔大阵，千僧铜棍如林迎战滚滚毒雾与西夏铁骑

- **关联文件**：[`src/data/quests/sects/shaolinThousandMonkWarQuest.ts`](../src/data/quests/sects/shaolinThousandMonkWarQuest.ts)
- **目标路径**：`public/assets/quests/sl_41_five_hundred_arhats.jpg`
- **画框题跋**：`少室山腰 · 主角亲布五百罗汉伏魔大阵，千僧铜棍如林迎战滚滚毒雾与西夏铁骑`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "少室山腰 · 主角亲布五百罗汉伏魔大阵，千僧铜棍如林迎战滚滚毒雾与西夏铁骑" from 《千僧列阵 · 血护少室》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 443. `CG-QST-443`：少室山血战 · 萧峰万里驰援，降龙十八掌撕裂毒阵与西夏左翼，与主角并肩冲锋

- **关联文件**：[`src/data/quests/sects/shaolinThousandMonkWarQuest.ts`](../src/data/quests/sects/shaolinThousandMonkWarQuest.ts)
- **目标路径**：`public/assets/quests/sl_41_qiaofeng_ally.jpg`
- **画框题跋**：`少室山血战 · 萧峰万里驰援，降龙十八掌撕裂毒阵与西夏左翼，与主角并肩冲锋`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "少室山血战 · 萧峰万里驰援，降龙十八掌撕裂毒阵与西夏左翼，与主角并肩冲锋" from 《千僧列阵 · 血护少室》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 444. `CG-QST-444`：少室山大捷 · 主角凌空斩碎赫连铁树西夏黑狼帅旗，萧峰掌创丁春秋，两千敌军望风溃退

- **关联文件**：[`src/data/quests/sects/shaolinThousandMonkWarQuest.ts`](../src/data/quests/sects/shaolinThousandMonkWarQuest.ts)
- **目标路径**：`public/assets/quests/sl_41_shatter_banner.jpg`
- **画框题跋**：`少室山大捷 · 主角凌空斩碎赫连铁树西夏黑狼帅旗，萧峰掌创丁春秋，两千敌军望风溃退`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "少室山大捷 · 主角凌空斩碎赫连铁树西夏黑狼帅旗，萧峰掌创丁春秋，两千敌军望风溃退" from 《千僧列阵 · 血护少室》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 445. `CG-QST-445`：琉璃藏经主阁 · 萧远山、慕容博、萧峰、慕容复、鸠摩智五大绝顶高手齐聚，三十年恩怨总决算

- **关联文件**：[`src/data/quests/sects/shaolinSweepingMonkYijinQuest.ts`](../src/data/quests/sects/shaolinSweepingMonkYijinQuest.ts)
- **目标路径**：`public/assets/quests/sl_42_pavilion_standoff.jpg`
- **画框题跋**：`琉璃藏经主阁 · 萧远山、慕容博、萧峰、慕容复、鸠摩智五大绝顶高手齐聚，三十年恩怨总决算`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "琉璃藏经主阁 · 萧远山、慕容博、萧峰、慕容复、鸠摩智五大绝顶高手齐聚，三十年恩怨总决算" from 《古杏扫叶 · 易筋真经》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 446. `CG-QST-446`：琉璃藏经主阁 · 主角以二十三载禅武修为十五合硬撼慕容博参合指与斗转星移

- **关联文件**：[`src/data/quests/sects/shaolinSweepingMonkYijinQuest.ts`](../src/data/quests/sects/shaolinSweepingMonkYijinQuest.ts)
- **目标路径**：`public/assets/quests/sl_42_murongbo_clash.jpg`
- **画框题跋**：`琉璃藏经主阁 · 主角以二十三载禅武修为十五合硬撼慕容博参合指与斗转星移`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "琉璃藏经主阁 · 主角以二十三载禅武修为十五合硬撼慕容博参合指与斗转星移" from 《古杏扫叶 · 易筋真经》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 447. `CG-QST-447`：琉璃藏经主阁 · 扫地僧法空缓步合十，三尺无形气墙轻描淡写挡下萧峰降龙掌与慕容博参合指

- **关联文件**：[`src/data/quests/sects/shaolinSweepingMonkYijinQuest.ts`](../src/data/quests/sects/shaolinSweepingMonkYijinQuest.ts)
- **目标路径**：`public/assets/quests/sl_42_three_foot_wall.jpg`
- **画框题跋**：`琉璃藏经主阁 · 扫地僧法空缓步合十，三尺无形气墙轻描淡写挡下萧峰降龙掌与慕容博参合指`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "琉璃藏经主阁 · 扫地僧法空缓步合十，三尺无形气墙轻描淡写挡下萧峰降龙掌与慕容博参合指" from 《古杏扫叶 · 易筋真经》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 448. `CG-QST-448`：西厢晒经石台 · 法空假死救活度化萧远山与慕容博皈依佛门，一袖轻拂震退狂傲的鸠摩智

- **关联文件**：[`src/data/quests/sects/shaolinSweepingMonkYijinQuest.ts`](../src/data/quests/sects/shaolinSweepingMonkYijinQuest.ts)
- **目标路径**：`public/assets/quests/sl_42_convert_rivals.jpg`
- **画框题跋**：`西厢晒经石台 · 法空假死救活度化萧远山与慕容博皈依佛门，一袖轻拂震退狂傲的鸠摩智`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "西厢晒经石台 · 法空假死救活度化萧远山与慕容博皈依佛门，一袖轻拂震退狂傲的鸠摩智" from 《古杏扫叶 · 易筋真经》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 449. `CG-QST-449`：古银杏扫叶庭 · 漫天黄叶纷飞中，扫地僧法空点化主角二十三载禅武苦修，亲传创派神功《易筋经》与天阶双圣物

- **关联文件**：[`src/data/quests/sects/shaolinSweepingMonkYijinQuest.ts`](../src/data/quests/sects/shaolinSweepingMonkYijinQuest.ts)
- **目标路径**：`public/assets/quests/sl_42_ginkgo_yijin.jpg`
- **画框题跋**：`古银杏扫叶庭 · 漫天黄叶纷飞中，扫地僧法空点化主角二十三载禅武苦修，亲传创派神功《易筋经》与天阶双圣物`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Song Shaolin / Luoyang / Bianliang / Putian). Depicting scene "古银杏扫叶庭 · 漫天黄叶纷飞中，扫地僧法空点化主角二十三载禅武苦修，亲传创派神功《易筋经》与天阶双圣物" from 《古杏扫叶 · 易筋真经》. Authentic Northern Song Buddhist architecture, martial monks and wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 450. `CG-QST-450`：太乙烟霞 · 终南草堂内郝大玄与冷薇蓉对席煮茗，双脉气象初现

- **关联文件**：[`src/data/quests/sects/zhongnanEntryQuest.ts`](../src/data/quests/sects/zhongnanEntryQuest.ts)
- **目标路径**：`public/assets/quests/zn_entry_caotang_tea.jpg`
- **画框题跋**：`太乙烟霞 · 终南草堂内郝大玄与冷薇蓉对席煮茗，双脉气象初现`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "太乙烟霞 · 终南草堂内郝大玄与冷薇蓉对席煮茗，双脉气象初现" from 《太乙烟霞 · 双脉问心》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 451. `CG-QST-451`：寒玉驱匪 · 涧畔花林玉蜂纷飞，丘芷霜护坛斥山贼

- **关联文件**：[`src/data/quests/sects/zhongnanEntryQuest.ts`](../src/data/quests/sects/zhongnanEntryQuest.ts)
- **目标路径**：`public/assets/quests/zn_entry_stream_bees.jpg`
- **画框题跋**：`寒玉驱匪 · 涧畔花林玉蜂纷飞，丘芷霜护坛斥山贼`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "寒玉驱匪 · 涧畔花林玉蜂纷飞，丘芷霜护坛斥山贼" from 《太乙烟霞 · 双脉问心》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 452. `CG-QST-452`：太乙传薪 · 重阳玄门主殿松香缭绕，马钰玄验身授剑

- **关联文件**：[`src/data/quests/sects/zhongnanEntryQuest.ts`](../src/data/quests/sects/zhongnanEntryQuest.ts)
- **目标路径**：`public/assets/quests/zn_entry_chongyang_oath.jpg`
- **画框题跋**：`太乙传薪 · 重阳玄门主殿松香缭绕，马钰玄验身授剑`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "太乙传薪 · 重阳玄门主殿松香缭绕，马钰玄验身授剑" from 《太乙烟霞 · 双脉问心》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 453. `CG-QST-453`：大道筑基 · 重阳主殿晨光透窗，马钰玄与刘处静开坛授歌

- **关联文件**：[`src/data/quests/sects/zhongnanFoundationSongQuest.ts`](../src/data/quests/sects/zhongnanFoundationSongQuest.ts)
- **目标路径**：`public/assets/quests/zn_q01_morning_chant.jpg`
- **画框题跋**：`大道筑基 · 重阳主殿晨光透窗，马钰玄与刘处静开坛授歌`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "大道筑基 · 重阳主殿晨光透窗，马钰玄与刘处静开坛授歌" from 《松风鹤影 · 大道筑基》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 454. `CG-QST-454`：飞瀑护柏 · 银练飞瀑旁水雾漫天，双贼挥斧截路

- **关联文件**：[`src/data/quests/sects/zhongnanFoundationSongQuest.ts`](../src/data/quests/sects/zhongnanFoundationSongQuest.ts)
- **目标路径**：`public/assets/quests/zn_q01_falls_bandits.jpg`
- **画框题跋**：`飞瀑护柏 · 银练飞瀑旁水雾漫天，双贼挥斧截路`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "飞瀑护柏 · 银练飞瀑旁水雾漫天，双贼挥斧截路" from 《松风鹤影 · 大道筑基》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 455. `CG-QST-455`：迎宾密会 · 丝路客栈灯影摇曳，冷玄远低声指点西市毒哨

- **关联文件**：[`src/data/quests/sects/zhongnanZiwuScoutQuest.ts`](../src/data/quests/sects/zhongnanZiwuScoutQuest.ts)
- **目标路径**：`public/assets/quests/zn_q02_changan_inn_secret.jpg`
- **画框题跋**：`迎宾密会 · 丝路客栈灯影摇曳，冷玄远低声指点西市毒哨`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "迎宾密会 · 丝路客栈灯影摇曳，冷玄远低声指点西市毒哨" from 《子午毒雾 · 长安暗哨》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 456. `CG-QST-456`：西市除毒 · 品香轩后院绿焰升腾，星宿双凶现身截杀

- **关联文件**：[`src/data/quests/sects/zhongnanZiwuScoutQuest.ts`](../src/data/quests/sects/zhongnanZiwuScoutQuest.ts)
- **目标路径**：`public/assets/quests/zn_q02_xishi_poison_raid.jpg`
- **画框题跋**：`西市除毒 · 品香轩后院绿焰升腾，星宿双凶现身截杀`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "西市除毒 · 品香轩后院绿焰升腾，星宿双凶现身截杀" from 《子午毒雾 · 长安暗哨》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 457. `CG-QST-457`：寒涧试剑 · 繁花幽谷青石坪上玉磬清鸣，双脉长老齐聚

- **关联文件**：[`src/data/quests/sects/zhongnanStreamDivisionQuest.ts`](../src/data/quests/sects/zhongnanStreamDivisionQuest.ts)
- **目标路径**：`public/assets/quests/zn_q03_sword_terrace.jpg`
- **画框题跋**：`寒涧试剑 · 繁花幽谷青石坪上玉磬清鸣，双脉长老齐聚`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "寒涧试剑 · 繁花幽谷青石坪上玉磬清鸣，双脉长老齐聚" from 《寒涧试剑 · 观墓分途》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 458. `CG-QST-458`：连战三杰 · 繁花落雨间长剑交鸣，玄门剑意纵横

- **关联文件**：[`src/data/quests/sects/zhongnanStreamDivisionQuest.ts`](../src/data/quests/sects/zhongnanStreamDivisionQuest.ts)
- **目标路径**：`public/assets/quests/zn_q03_three_duels.jpg`
- **画框题跋**：`连战三杰 · 繁花落雨间长剑交鸣，玄门剑意纵横`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "连战三杰 · 繁花落雨间长剑交鸣，玄门剑意纵横" from 《寒涧试剑 · 观墓分途》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 459. `CG-QST-459`：双尊并立 · 明月下王重楼与林朝瑶娓娓道来终南双脉渊源

- **关联文件**：[`src/data/quests/sects/zhongnanStreamDivisionQuest.ts`](../src/data/quests/sects/zhongnanStreamDivisionQuest.ts)
- **目标路径**：`public/assets/quests/zn_q03_twin_patriarchs.jpg`
- **画框题跋**：`双尊并立 · 明月下王重楼与林朝瑶娓娓道来终南双脉渊源`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "双尊并立 · 明月下王重楼与林朝瑶娓娓道来终南双脉渊源" from 《寒涧试剑 · 观墓分途》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 460. `CG-QST-460`：观墓分途 · 剑指明月立下终生无悔之誓，前山古观与后山幽谷自此分流

- **关联文件**：[`src/data/quests/sects/zhongnanStreamDivisionQuest.ts`](../src/data/quests/sects/zhongnanStreamDivisionQuest.ts)
- **目标路径**：`public/assets/quests/zn_q03_branch_oath.jpg`
- **画框题跋**：`观墓分途 · 剑指明月立下终生无悔之誓，前山古观与后山幽谷自此分流`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "观墓分途 · 剑指明月立下终生无悔之誓，前山古观与后山幽谷自此分流" from 《寒涧试剑 · 观墓分途》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 461. `CG-QST-461`：北斗璇玑 · 七星青石坛上剑影如星，谭处真与林弘毅指点阵法

- **关联文件**：[`src/data/quests/sects/zhongnanGuanBigDipperQuest.ts`](../src/data/quests/sects/zhongnanGuanBigDipperQuest.ts)
- **目标路径**：`public/assets/quests/zn_q04_dipper_formation.jpg`
- **画框题跋**：`北斗璇玑 · 七星青石坛上剑影如星，谭处真与林弘毅指点阵法`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "北斗璇玑 · 七星青石坛上剑影如星，谭处真与林弘毅指点阵法" from 《北斗璇玑 · 三才归元》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 462. `CG-QST-462`：星夜护观 · 火把映红七星石坛，太行悍匪挥刀强攻重阳山门

- **关联文件**：[`src/data/quests/sects/zhongnanGuanBigDipperQuest.ts`](../src/data/quests/sects/zhongnanGuanBigDipperQuest.ts)
- **目标路径**：`public/assets/quests/zn_q04_night_bandits.jpg`
- **画框题跋**：`星夜护观 · 火把映红七星石坛，太行悍匪挥刀强攻重阳山门`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "星夜护观 · 火把映红七星石坛，太行悍匪挥刀强攻重阳山门" from 《北斗璇玑 · 三才归元》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 463. `CG-QST-463`：太白金雁 · 玉阳子王处阳踏松凌虚，白雁掠过银练飞瀑

- **关联文件**：[`src/data/quests/sects/zhongnanGuanGoldenGooseQuest.ts`](../src/data/quests/sects/zhongnanGuanGoldenGooseQuest.ts)
- **目标路径**：`public/assets/quests/zn_q05_cliff_goose.jpg`
- **画框题跋**：`太白金雁 · 玉阳子王处阳踏松凌虚，白雁掠过银练飞瀑`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "太白金雁 · 玉阳子王处阳踏松凌虚，白雁掠过银练飞瀑" from 《太白金雁 · 绝壁凌虚》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 464. `CG-QST-464`：绝壁救险 · 寒泉道剑凌空斩落，替负伤大宋斥候格开西夏弯刀

- **关联文件**：[`src/data/quests/sects/zhongnanGuanGoldenGooseQuest.ts`](../src/data/quests/sects/zhongnanGuanGoldenGooseQuest.ts)
- **目标路径**：`public/assets/quests/zn_q05_xixia_ambush.jpg`
- **画框题跋**：`绝壁救险 · 寒泉道剑凌空斩落，替负伤大宋斥候格开西夏弯刀`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "绝壁救险 · 寒泉道剑凌空斩落，替负伤大宋斥候格开西夏弯刀" from 《太白金雁 · 绝壁凌虚》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 465. `CG-QST-465`：山道救孤 · 王处阳以金创药救治宋军斥候，染血竹筒揭露西夏密谋

- **关联文件**：[`src/data/quests/sects/zhongnanGuanGoldenGooseQuest.ts`](../src/data/quests/sects/zhongnanGuanGoldenGooseQuest.ts)
- **目标路径**：`public/assets/quests/zn_q05_scout_rescue.jpg`
- **画框题跋**：`山道救孤 · 王处阳以金创药救治宋军斥候，染血竹筒揭露西夏密谋`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "山道救孤 · 王处阳以金创药救治宋军斥候，染血竹筒揭露西夏密谋" from 《太白金雁 · 绝壁凌虚》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 466. `CG-QST-466`：府衙呈情 · 晏殊从容披阅军报，丘处玄与主角共议长安布防

- **关联文件**：[`src/data/quests/sects/zhongnanGuanZhangZaiQuest.ts`](../src/data/quests/sects/zhongnanGuanZhangZaiQuest.ts)
- **目标路径**：`public/assets/quests/zn_q06_yamen_yanshu.jpg`
- **画框题跋**：`府衙呈情 · 晏殊从容披阅军报，丘处玄与主角共议长安布防`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "府衙呈情 · 晏殊从容披阅军报，丘处玄与主角共议长安布防" from 《草堂护道 · 正气劈空》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 467. `CG-QST-467`：横渠薪火 · 书院灯火通明，张载与尹源侃侃讲学，浩然气贯青衿

- **关联文件**：[`src/data/quests/sects/zhongnanGuanZhangZaiQuest.ts`](../src/data/quests/sects/zhongnanGuanZhangZaiQuest.ts)
- **目标路径**：`public/assets/quests/zn_q06_academy_lecture.jpg`
- **画框题跋**：`横渠薪火 · 书院灯火通明，张载与尹源侃侃讲学，浩然气贯青衿`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "横渠薪火 · 书院灯火通明，张载与尹源侃侃讲学，浩然气贯青衿" from 《草堂护道 · 正气劈空》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 468. `CG-QST-468`：正气劈空 · 丘处玄隔空震散毒烟，亲传全真刚猛绝学《劈空掌》

- **关联文件**：[`src/data/quests/sects/zhongnanGuanZhangZaiQuest.ts`](../src/data/quests/sects/zhongnanGuanZhangZaiQuest.ts)
- **目标路径**：`public/assets/quests/zn_q06_pikong_palm.jpg`
- **画框题跋**：`正气劈空 · 丘处玄隔空震散毒烟，亲传全真刚猛绝学《劈空掌》`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "正气劈空 · 丘处玄隔空震散毒烟，亲传全真刚猛绝学《劈空掌》" from 《草堂护道 · 正气劈空》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 469. `CG-QST-469`：茶马边塞 · 秋风卷过秦州验马阑，吐蕃河曲骏马嘶鸣如雷

- **关联文件**：[`src/data/quests/sects/zhongnanGuanQinzhouHorseQuest.ts`](../src/data/quests/sects/zhongnanGuanQinzhouHorseQuest.ts)
- **目标路径**：`public/assets/quests/zn_q07_chama_horses.jpg`
- **画框题跋**：`茶马边塞 · 秋风卷过秦州验马阑，吐蕃河曲骏马嘶鸣如雷`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "茶马边塞 · 秋风卷过秦州验马阑，吐蕃河曲骏马嘶鸣如雷" from 《秦州烽火 · 铁骑护马》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 470. `CG-QST-470`：陇右烽火 · 古塞石堡狼烟冲天，刘沪与雷万里列阵迎击西夏铁骑

- **关联文件**：[`src/data/quests/sects/zhongnanGuanQinzhouHorseQuest.ts`](../src/data/quests/sects/zhongnanGuanQinzhouHorseQuest.ts)
- **目标路径**：`public/assets/quests/zn_q07_longyou_beacon.jpg`
- **画框题跋**：`陇右烽火 · 古塞石堡狼烟冲天，刘沪与雷万里列阵迎击西夏铁骑`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "陇右烽火 · 古塞石堡狼烟冲天，刘沪与雷万里列阵迎击西夏铁骑" from 《秦州烽火 · 铁骑护马》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 471. `CG-QST-471`：道风分途 · 丘处玄按剑望北欲追歼夏骑，马钰玄提药箱赴村抚民

- **关联文件**：[`src/data/quests/sects/zhongnanGuanQinzhouHorseQuest.ts`](../src/data/quests/sects/zhongnanGuanQinzhouHorseQuest.ts)
- **目标路径**：`public/assets/quests/zn_q07_qinzhou_choice.jpg`
- **画框题跋**：`道风分途 · 丘处玄按剑望北欲追歼夏骑，马钰玄提药箱赴村抚民`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "道风分途 · 丘处玄按剑望北欲追歼夏骑，马钰玄提药箱赴村抚民" from 《秦州烽火 · 铁骑护马》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 472. `CG-QST-472`：道剑同盟 · 紫霞正气主殿内岳沧溟设茗迎客，终南华山两派高人齐聚

- **关联文件**：[`src/data/quests/sects/zhongnanGuanHuashanXiyiQuest.ts`](../src/data/quests/sects/zhongnanGuanHuashanXiyiQuest.ts)
- **目标路径**：`public/assets/quests/zn_q08_zixia_meeting.jpg`
- **画框题跋**：`道剑同盟 · 紫霞正气主殿内岳沧溟设茗迎客，终南华山两派高人齐聚`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "道剑同盟 · 紫霞正气主殿内岳沧溟设茗迎客，终南华山两派高人齐聚" from 《华岳论剑 · 睡仙希夷》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 473. `CG-QST-473`：博台论剑 · 云海翻涌孤峰亭畔，与紫霞首徒高沧云切磋剑意

- **关联文件**：[`src/data/quests/sects/zhongnanGuanHuashanXiyiQuest.ts`](../src/data/quests/sects/zhongnanGuanHuashanXiyiQuest.ts)
- **目标路径**：`public/assets/quests/zn_q08_botai_sword_debate.jpg`
- **画框题跋**：`博台论剑 · 云海翻涌孤峰亭畔，与紫霞首徒高沧云切磋剑意`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "博台论剑 · 云海翻涌孤峰亭畔，与紫霞首徒高沧云切磋剑意" from 《华岳论剑 · 睡仙希夷》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 474. `CG-QST-474`：绝壁擒奸 · 寒泉道剑截住云海栈道，慕容暗探怀抱紫檀剑匣现形

- **关联文件**：[`src/data/quests/sects/zhongnanGuanHuashanXiyiQuest.ts`](../src/data/quests/sects/zhongnanGuanHuashanXiyiQuest.ts)
- **目标路径**：`public/assets/quests/zn_q08_murong_thief.jpg`
- **画框题跋**：`绝壁擒奸 · 寒泉道剑截住云海栈道，慕容暗探怀抱紫檀剑匣现形`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "绝壁擒奸 · 寒泉道剑截住云海栈道，慕容暗探怀抱紫檀剑匣现形" from 《华岳论剑 · 睡仙希夷》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 475. `CG-QST-475`：古观真传 · 重阳主殿香烟缭绕，马钰玄与刘处静亲颁真传玉符

- **关联文件**：[`src/data/quests/sects/zhongnanGuanHuashanXiyiQuest.ts`](../src/data/quests/sects/zhongnanGuanHuashanXiyiQuest.ts)
- **目标路径**：`public/assets/quests/zn_q08_xiyi_promotion.jpg`
- **画框题跋**：`古观真传 · 重阳主殿香烟缭绕，马钰玄与刘处静亲颁真传玉符`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "古观真传 · 重阳主殿香烟缭绕，马钰玄与刘处静亲颁真传玉符" from 《华岳论剑 · 睡仙希夷》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 476. `CG-QST-476`：紫金丹劫 · 紫金丹院炉火轰然炸裂，黑烟毒火冲天而起

- **关联文件**：[`src/data/quests/sects/zhongnanGuanDayantaQuest.ts`](../src/data/quests/sects/zhongnanGuanDayantaQuest.ts)
- **目标路径**：`public/assets/quests/zn_q09_alchemy_explosion.jpg`
- **画框题跋**：`紫金丹劫 · 紫金丹院炉火轰然炸裂，黑烟毒火冲天而起`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "紫金丹劫 · 紫金丹院炉火轰然炸裂，黑烟毒火冲天而起" from 《紫金丹劫 · 大雁除妖》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 477. `CG-QST-477`：大雁塔顶 · 拂晓云雾缭绕七层高塔，白星焱与宋河麟已封锁塔阶

- **关联文件**：[`src/data/quests/sects/zhongnanGuanDayantaQuest.ts`](../src/data/quests/sects/zhongnanGuanDayantaQuest.ts)
- **目标路径**：`public/assets/quests/zn_q09_dayanta_summit.jpg`
- **画框题跋**：`大雁塔顶 · 拂晓云雾缭绕七层高塔，白星焱与宋河麟已封锁塔阶`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "大雁塔顶 · 拂晓云雾缭绕七层高塔，白星焱与宋河麟已封锁塔阶" from 《紫金丹劫 · 大雁除妖》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 478. `CG-QST-478`：塔顶决战 · 寒泉道剑划破晓雾，迎战星宿狂狮护法狮吼子

- **关联文件**：[`src/data/quests/sects/zhongnanGuanDayantaQuest.ts`](../src/data/quests/sects/zhongnanGuanDayantaQuest.ts)
- **目标路径**：`public/assets/quests/zn_q09_lion_roar_duel.jpg`
- **画框题跋**：`塔顶决战 · 寒泉道剑划破晓雾，迎战星宿狂狮护法狮吼子`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "塔顶决战 · 寒泉道剑划破晓雾，迎战星宿狂狮护法狮吼子" from 《紫金丹劫 · 大雁除妖》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 479. `CG-QST-479`：汉水风波 · 襄阳渡口铁掌少主截击武当道长

- **关联文件**：[`src/data/quests/sects/zhongnanGuanWudangVisitQuest.ts`](../src/data/quests/sects/zhongnanGuanWudangVisitQuest.ts)
- **目标路径**：`public/assets/quests/zn_q10_xiangyang_dock.jpg`
- **画框题跋**：`汉水风波 · 襄阳渡口铁掌少主截击武当道长`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "汉水风波 · 襄阳渡口铁掌少主截击武当道长" from 《太和云海 · 武当问真》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 480. `CG-QST-480`：太和云海 · 绝顶金殿拜谒太和真人张玄素

- **关联文件**：[`src/data/quests/sects/zhongnanGuanWudangVisitQuest.ts`](../src/data/quests/sects/zhongnanGuanWudangVisitQuest.ts)
- **目标路径**：`public/assets/quests/zn_q10_wudang_golden.jpg`
- **画框题跋**：`太和云海 · 绝顶金殿拜谒太和真人张玄素`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "太和云海 · 绝顶金殿拜谒太和真人张玄素" from 《太和云海 · 武当问真》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 481. `CG-QST-481`：紫霄论道 · 丹炉松烟间南北道脉印证三日

- **关联文件**：[`src/data/quests/sects/zhongnanGuanWudangVisitQuest.ts`](../src/data/quests/sects/zhongnanGuanWudangVisitQuest.ts)
- **目标路径**：`public/assets/quests/zn_q10_zixiao_dao.jpg`
- **画框题跋**：`紫霄论道 · 丹炉松烟间南北道脉印证三日`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "紫霄论道 · 丹炉松烟间南北道脉印证三日" from 《太和云海 · 武当问真》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 482. `CG-QST-482`：丹成除疴 · 紫霄玄丹化去长生子多年寒毒

- **关联文件**：[`src/data/quests/sects/zhongnanGuanWudangVisitQuest.ts`](../src/data/quests/sects/zhongnanGuanWudangVisitQuest.ts)
- **目标路径**：`public/assets/quests/zn_q10_alchemy_cure.jpg`
- **画框题跋**：`丹成除疴 · 紫霄玄丹化去长生子多年寒毒`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "丹成除疴 · 紫霄玄丹化去长生子多年寒毒" from 《太和云海 · 武当问真》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 483. `CG-QST-483`：朔风雪夜 · 七星演剑坛剑气冲霄

- **关联文件**：[`src/data/quests/sects/zhongnanGuanChunyangQuest.ts`](../src/data/quests/sects/zhongnanGuanChunyangQuest.ts)
- **目标路径**：`public/assets/quests/zn_q11_snow_dipper.jpg`
- **画框题跋**：`朔风雪夜 · 七星演剑坛剑气冲霄`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "朔风雪夜 · 七星演剑坛剑气冲霄" from 《纯阳无极 · 七星聚首》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 484. `CG-QST-484`：七星聚首 · 终南七子齐传纯阳无极真诀

- **关联文件**：[`src/data/quests/sects/zhongnanGuanChunyangQuest.ts`](../src/data/quests/sects/zhongnanGuanChunyangQuest.ts)
- **目标路径**：`public/assets/quests/zn_q11_seven_masters.jpg`
- **画框题跋**：`七星聚首 · 终南七子齐传纯阳无极真诀`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "七星聚首 · 终南七子齐传纯阳无极真诀" from 《纯阳无极 · 七星聚首》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 485. `CG-QST-485`：纯阳无极 · 漫天鹅毛大雪未近身便化作轻烟

- **关联文件**：[`src/data/quests/sects/zhongnanGuanChunyangQuest.ts`](../src/data/quests/sects/zhongnanGuanChunyangQuest.ts)
- **目标路径**：`public/assets/quests/zn_q11_chunyang_aura.jpg`
- **画框题跋**：`纯阳无极 · 漫天鹅毛大雪未近身便化作轻烟`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "纯阳无极 · 漫天鹅毛大雪未近身便化作轻烟" from 《纯阳无极 · 七星聚首》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 486. `CG-QST-486`：力退血鹰 · 努儿海慑于纯阳剑威与道钟之势遁入风雪

- **关联文件**：[`src/data/quests/sects/zhongnanGuanChunyangQuest.ts`](../src/data/quests/sects/zhongnanGuanChunyangQuest.ts)
- **目标路径**：`public/assets/quests/zn_q11_nuerhai_retreat.jpg`
- **画框题跋**：`力退血鹰 · 努儿海慑于纯阳剑威与道钟之势遁入风雪`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "力退血鹰 · 努儿海慑于纯阳剑威与道钟之势遁入风雪" from 《纯阳无极 · 七星聚首》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 487. `CG-QST-487`：幽谷百雀 · 天罗地网石室中八十一雀振翅齐飞

- **关联文件**：[`src/data/quests/sects/zhongnanMuSparrowNetQuest.ts`](../src/data/quests/sects/zhongnanMuSparrowNetQuest.ts)
- **目标路径**：`public/assets/quests/zn_q12_sparrow_hall.jpg`
- **画框题跋**：`幽谷百雀 · 天罗地网石室中八十一雀振翅齐飞`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "幽谷百雀 · 天罗地网石室中八十一雀振翅齐飞" from 《幽谷百雀 · 金针渡影》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 488. `CG-QST-488`：金雁渡影 · 轻功身法如飞燕穿花，八十一雀尽入掌势

- **关联文件**：[`src/data/quests/sects/zhongnanMuSparrowNetQuest.ts`](../src/data/quests/sects/zhongnanMuSparrowNetQuest.ts)
- **目标路径**：`public/assets/quests/zn_q12_golden_swallow.jpg`
- **画框题跋**：`金雁渡影 · 轻功身法如飞燕穿花，八十一雀尽入掌势`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "金雁渡影 · 轻功身法如飞燕穿花，八十一雀尽入掌势" from 《幽谷百雀 · 金针渡影》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 489. `CG-QST-489`：飞瀑护蜂 · 银练飞瀑下截击湘西五溪偷蜂恶客

- **关联文件**：[`src/data/quests/sects/zhongnanMuSparrowNetQuest.ts`](../src/data/quests/sects/zhongnanMuSparrowNetQuest.ts)
- **目标路径**：`public/assets/quests/zn_q12_falls_poachers.jpg`
- **画框题跋**：`飞瀑护蜂 · 银练飞瀑下截击湘西五溪偷蜂恶客`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "飞瀑护蜂 · 银练飞瀑下截击湘西五溪偷蜂恶客" from 《幽谷百雀 · 金针渡影》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 490. `CG-QST-490`：西市飞霜 · 胡商驼铃声中与白清霜暗室接头

- **关联文件**：[`src/data/quests/sects/zhongnanMuWestMarketQuest.ts`](../src/data/quests/sects/zhongnanMuWestMarketQuest.ts)
- **目标路径**：`public/assets/quests/zn_q13_xishi_east.jpg`
- **画框题跋**：`西市飞霜 · 胡商驼铃声中与白清霜暗室接头`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "西市飞霜 · 胡商驼铃声中与白清霜暗室接头" from 《西市飞霜 · 踏雪无痕》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 491. `CG-QST-491`：踏雪无痕 · 白清霜于暮色细沙庭院亲授古墓绝顶轻功

- **关联文件**：[`src/data/quests/sects/zhongnanMuWestMarketQuest.ts`](../src/data/quests/sects/zhongnanMuWestMarketQuest.ts)
- **目标路径**：`public/assets/quests/zn_q13_snow_step.jpg`
- **画框题跋**：`踏雪无痕 · 白清霜于暮色细沙庭院亲授古墓绝顶轻功`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "踏雪无痕 · 白清霜于暮色细沙庭院亲授古墓绝顶轻功" from 《西市飞霜 · 踏雪无痕》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 492. `CG-QST-492`：夜潜西市 · 踏雪无痕飞掠皮货暗栈斩杀一品堂头目

- **关联文件**：[`src/data/quests/sects/zhongnanMuWestMarketQuest.ts`](../src/data/quests/sects/zhongnanMuWestMarketQuest.ts)
- **目标路径**：`public/assets/quests/zn_q13_xishi_raid.jpg`
- **画框题跋**：`夜潜西市 · 踏雪无痕飞掠皮货暗栈斩杀一品堂头目`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "夜潜西市 · 踏雪无痕飞掠皮货暗栈斩杀一品堂头目" from 《西市飞霜 · 踏雪无痕》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 493. `CG-QST-493`：蜀道求药 · 踏雪无痕飞渡剑门关绝壁悬空栈道

- **关联文件**：[`src/data/quests/sects/zhongnanMuSichuanBeeQuest.ts`](../src/data/quests/sects/zhongnanMuSichuanBeeQuest.ts)
- **目标路径**：`public/assets/quests/zn_q14_jianmen_plank.jpg`
- **画框题跋**：`蜀道求药 · 踏雪无痕飞渡剑门关绝壁悬空栈道`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "蜀道求药 · 踏雪无痕飞渡剑门关绝壁悬空栈道" from 《玉蜂琼浆 · 蜀道求药》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 494. `CG-QST-494`：万毒悬栈 · 铁索飞瀑间凌空采摘紫雪断肠花

- **关联文件**：[`src/data/quests/sects/zhongnanMuSichuanBeeQuest.ts`](../src/data/quests/sects/zhongnanMuSichuanBeeQuest.ts)
- **目标路径**：`public/assets/quests/zn_q14_poison_bridge.jpg`
- **画框题跋**：`万毒悬栈 · 铁索飞瀑间凌空采摘紫雪断肠花`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "万毒悬栈 · 铁索飞瀑间凌空采摘紫雪断肠花" from 《玉蜂琼浆 · 蜀道求药》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 495. `CG-QST-495`：万里桥茶肆 · 与蜀中唐门毒观音切磋换药并退青城恶徒

- **关联文件**：[`src/data/quests/sects/zhongnanMuSichuanBeeQuest.ts`](../src/data/quests/sects/zhongnanMuSichuanBeeQuest.ts)
- **目标路径**：`public/assets/quests/zn_q14_chengdu_tea.jpg`
- **画框题跋**：`万里桥茶肆 · 与蜀中唐门毒观音切磋换药并退青城恶徒`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "万里桥茶肆 · 与蜀中唐门毒观音切磋换药并退青城恶徒" from 《玉蜂琼浆 · 蜀道求药》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 496. `CG-QST-496`：沧浪问古 · 姑苏沧浪亭畔拜访大宋诗豪苏舜钦

- **关联文件**：[`src/data/quests/sects/zhongnanMuSuzhouSwordQuest.ts`](../src/data/quests/sects/zhongnanMuSuzhouSwordQuest.ts)
- **目标路径**：`public/assets/quests/zn_q15_canglang_pavilion.jpg`
- **画框题跋**：`沧浪问古 · 姑苏沧浪亭畔拜访大宋诗豪苏舜钦`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "沧浪问古 · 姑苏沧浪亭畔拜访大宋诗豪苏舜钦" from 《烟波试剑 · 越女惊鸿》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 497. `CG-QST-497`：吴王剑池 · 裂崖飞梁秋水映照春秋越女古剑石刻

- **关联文件**：[`src/data/quests/sects/zhongnanMuSuzhouSwordQuest.ts`](../src/data/quests/sects/zhongnanMuSuzhouSwordQuest.ts)
- **目标路径**：`public/assets/quests/zn_q15_huqiu_pool.jpg`
- **画框题跋**：`吴王剑池 · 裂崖飞梁秋水映照春秋越女古剑石刻`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "吴王剑池 · 裂崖飞梁秋水映照春秋越女古剑石刻" from 《烟波试剑 · 越女惊鸿》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 498. `CG-QST-498`：越女惊鸿 · 悟得越女古剑术，剑光如秋水飞燕

- **关联文件**：[`src/data/quests/sects/zhongnanMuSuzhouSwordQuest.ts`](../src/data/quests/sects/zhongnanMuSuzhouSwordQuest.ts)
- **目标路径**：`public/assets/quests/zn_q15_yuenv_sword.jpg`
- **画框题跋**：`越女惊鸿 · 悟得越女古剑术，剑光如秋水飞燕`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "越女惊鸿 · 悟得越女古剑术，剑光如秋水飞燕" from 《烟波试剑 · 越女惊鸿》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 499. `CG-QST-499`：古墓真传 · 昆仑寒玉床前寒玉仙子亲授真传玉印

- **关联文件**：[`src/data/quests/sects/zhongnanMuSuzhouSwordQuest.ts`](../src/data/quests/sects/zhongnanMuSuzhouSwordQuest.ts)
- **目标路径**：`public/assets/quests/zn_q15_gumu_promotion.jpg`
- **画框题跋**：`古墓真传 · 昆仑寒玉床前寒玉仙子亲授真传玉印`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "古墓真传 · 昆仑寒玉床前寒玉仙子亲授真传玉印" from 《烟波试剑 · 越女惊鸿》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 500. `CG-QST-500`：寒潭孤影 · 临水抚琴榭秋月映寒波

- **关联文件**：[`src/data/quests/sects/zhongnanMuColdPoolVowQuest.ts`](../src/data/quests/sects/zhongnanMuColdPoolVowQuest.ts)
- **目标路径**：`public/assets/quests/zn_q16_qin_pavilion.jpg`
- **画框题跋**：`寒潭孤影 · 临水抚琴榭秋月映寒波`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "寒潭孤影 · 临水抚琴榭秋月映寒波" from 《寒潭孤影 · 誓词问情》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 501. `CG-QST-501`：临水退敌 · 剑挑痴狂世家剑客，力抗五溪迷心蛊师

- **关联文件**：[`src/data/quests/sects/zhongnanMuColdPoolVowQuest.ts`](../src/data/quests/sects/zhongnanMuColdPoolVowQuest.ts)
- **目标路径**：`public/assets/quests/zn_q16_intruder_duel.jpg`
- **画框题跋**：`临水退敌 · 剑挑痴狂世家剑客，力抗五溪迷心蛊师`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "临水退敌 · 剑挑痴狂世家剑客，力抗五溪迷心蛊师" from 《寒潭孤影 · 誓词问情》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 502. `CG-QST-502`：誓词问情 · 冰魄石室孤灯下寒玉仙子叩问古墓本心

- **关联文件**：[`src/data/quests/sects/zhongnanMuColdPoolVowQuest.ts`](../src/data/quests/sects/zhongnanMuColdPoolVowQuest.ts)
- **目标路径**：`public/assets/quests/zn_q16_cold_pool_vow.jpg`
- **画框题跋**：`誓词问情 · 冰魄石室孤灯下寒玉仙子叩问古墓本心`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "誓词问情 · 冰魄石室孤灯下寒玉仙子叩问古墓本心" from 《寒潭孤影 · 誓词问情》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 503. `CG-QST-503`：一念问心 · 冰心止水或情深不悔，皆由己心定夺

- **关联文件**：[`src/data/quests/sects/zhongnanMuColdPoolVowQuest.ts`](../src/data/quests/sects/zhongnanMuColdPoolVowQuest.ts)
- **目标路径**：`public/assets/quests/zn_q16_heart_choice.jpg`
- **画框题跋**：`一念问心 · 冰心止水或情深不悔，皆由己心定夺`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "一念问心 · 冰心止水或情深不悔，皆由己心定夺" from 《寒潭孤影 · 誓词问情》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 504. `CG-QST-504`：寒冰绵掌 · 轻柔掌影过处，石室水钵瞬结莲花冰霜

- **关联文件**：[`src/data/quests/sects/zhongnanMuFrostNeedleQuest.ts`](../src/data/quests/sects/zhongnanMuFrostNeedleQuest.ts)
- **目标路径**：`public/assets/quests/zn_q17_frost_palm.jpg`
- **画框题跋**：`寒冰绵掌 · 轻柔掌影过处，石室水钵瞬结莲花冰霜`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "寒冰绵掌 · 轻柔掌影过处，石室水钵瞬结莲花冰霜" from 《冰魄银针 · 含沙凝霜》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 505. `CG-QST-505`：含沙射影 · 冰魄银针裹挟霜雾破空，洞穿十丈石灯

- **关联文件**：[`src/data/quests/sects/zhongnanMuFrostNeedleQuest.ts`](../src/data/quests/sects/zhongnanMuFrostNeedleQuest.ts)
- **目标路径**：`public/assets/quests/zn_q17_shadow_needles.jpg`
- **画框题跋**：`含沙射影 · 冰魄银针裹挟霜雾破空，洞穿十丈石灯`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "含沙射影 · 冰魄银针裹挟霜雾破空，洞穿十丈石灯" from 《冰魄银针 · 含沙凝霜》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 506. `CG-QST-506`：子夜歼敌 · 银练飞瀑寒霜与星宿鬼火激烈交锋

- **关联文件**：[`src/data/quests/sects/zhongnanMuFrostNeedleQuest.ts`](../src/data/quests/sects/zhongnanMuFrostNeedleQuest.ts)
- **目标路径**：`public/assets/quests/zn_q17_midnight_falls.jpg`
- **画框题跋**：`子夜歼敌 · 银练飞瀑寒霜与星宿鬼火激烈交锋`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "子夜歼敌 · 银练飞瀑寒霜与星宿鬼火激烈交锋" from 《冰魄银针 · 含沙凝霜》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 507. `CG-QST-507`：聪辩雅集 · 白马书院荷池水亭手谈论易

- **关联文件**：[`src/data/quests/sects/zhongnanMuLuoyangChessQuest.ts`](../src/data/quests/sects/zhongnanMuLuoyangChessQuest.ts)
- **目标路径**：`public/assets/quests/zn_q18_luoyang_pavilion.jpg`
- **画框题跋**：`聪辩雅集 · 白马书院荷池水亭手谈论易`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "聪辩雅集 · 白马书院荷池水亭手谈论易" from 《洛水琴棋 · 聪辩雅集》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 508. `CG-QST-508`：手谈破局 · 苏星河以珍珑之意点化古墓真传

- **关联文件**：[`src/data/quests/sects/zhongnanMuLuoyangChessQuest.ts`](../src/data/quests/sects/zhongnanMuLuoyangChessQuest.ts)
- **目标路径**：`public/assets/quests/zn_q18_chess_meeting.jpg`
- **画框题跋**：`手谈破局 · 苏星河以珍珑之意点化古墓真传`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "手谈破局 · 苏星河以珍珑之意点化古墓真传" from 《洛水琴棋 · 聪辩雅集》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 509. `CG-QST-509`：虹桥危局 · 云中鹤钢爪逼近手捧古卷的书呆苟读

- **关联文件**：[`src/data/quests/sects/zhongnanMuLuoyangChessQuest.ts`](../src/data/quests/sects/zhongnanMuLuoyangChessQuest.ts)
- **目标路径**：`public/assets/quests/zn_q18_peony_waterside.jpg`
- **画框题跋**：`虹桥危局 · 云中鹤钢爪逼近手捧古卷的书呆苟读`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "虹桥危局 · 云中鹤钢爪逼近手捧古卷的书呆苟读" from 《洛水琴棋 · 聪辩雅集》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 510. `CG-QST-510`：踏雪压鹤 · 碧溪虹桥上古墓踏雪无痕力压云中鹤

- **关联文件**：[`src/data/quests/sects/zhongnanMuLuoyangChessQuest.ts`](../src/data/quests/sects/zhongnanMuLuoyangChessQuest.ts)
- **目标路径**：`public/assets/quests/zn_q18_yunzhonghe_chase.jpg`
- **画框题跋**：`踏雪压鹤 · 碧溪虹桥上古墓踏雪无痕力压云中鹤`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "踏雪压鹤 · 碧溪虹桥上古墓踏雪无痕力压云中鹤" from 《洛水琴棋 · 聪辩雅集》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 511. `CG-QST-511`：素绢真经 · 林朝瑶启开祖师暗匣亲赐《终南玉女心经素绢谱》

- **关联文件**：[`src/data/quests/sects/zhongnanMuYunvSutraQuest.ts`](../src/data/quests/sects/zhongnanMuYunvSutraQuest.ts)
- **目标路径**：`public/assets/quests/zn_q19_silk_scroll.jpg`
- **画框题跋**：`素绢真经 · 林朝瑶启开祖师暗匣亲赐《终南玉女心经素绢谱》`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "素绢真经 · 林朝瑶启开祖师暗匣亲赐《终南玉女心经素绢谱》" from 《寒玉蒸霞 · 素绢真经》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 512. `CG-QST-512`：寒玉蒸霞 · 昆仑寒玉床上白雾漫室，真气奔腾如潮

- **关联文件**：[`src/data/quests/sects/zhongnanMuYunvSutraQuest.ts`](../src/data/quests/sects/zhongnanMuYunvSutraQuest.ts)
- **目标路径**：`public/assets/quests/zn_q19_jadebed_mist.jpg`
- **画框题跋**：`寒玉蒸霞 · 昆仑寒玉床上白雾漫室，真气奔腾如潮`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "寒玉蒸霞 · 昆仑寒玉床上白雾漫室，真气奔腾如潮" from 《寒玉蒸霞 · 素绢真经》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 513. `CG-QST-513`：双心印脉 · 与冷清秋抵掌共运玉女心经冲破玄关

- **关联文件**：[`src/data/quests/sects/zhongnanMuYunvSutraQuest.ts`](../src/data/quests/sects/zhongnanMuYunvSutraQuest.ts)
- **目标路径**：`public/assets/quests/zn_q19_dual_cultivation.jpg`
- **画框题跋**：`双心印脉 · 与冷清秋抵掌共运玉女心经冲破玄关`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "双心印脉 · 与冷清秋抵掌共运玉女心经冲破玄关" from 《寒玉蒸霞 · 素绢真经》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 514. `CG-QST-514`：掠出石门 · 身法如玉龙惊鸿冲破漫天风雪

- **关联文件**：[`src/data/quests/sects/zhongnanMuYunvSutraQuest.ts`](../src/data/quests/sects/zhongnanMuYunvSutraQuest.ts)
- **目标路径**：`public/assets/quests/zn_q19_stone_gate.jpg`
- **画框题跋**：`掠出石门 · 身法如玉龙惊鸿冲破漫天风雪`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "掠出石门 · 身法如玉龙惊鸿冲破漫天风雪" from 《寒玉蒸霞 · 素绢真经》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 515. `CG-QST-515`：三招冰封 · 玉女心经配寒冰绵掌，三招之内将叛徒莫寒烟冻成冰雕

- **关联文件**：[`src/data/quests/sects/zhongnanMuYunvSutraQuest.ts`](../src/data/quests/sects/zhongnanMuYunvSutraQuest.ts)
- **目标路径**：`public/assets/quests/zn_q19_frost_seal.jpg`
- **画框题跋**：`三招冰封 · 玉女心经配寒冰绵掌，三招之内将叛徒莫寒烟冻成冰雕`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "三招冰封 · 玉女心经配寒冰绵掌，三招之内将叛徒莫寒烟冻成冰雕" from 《寒玉蒸霞 · 素绢真经》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 516. `CG-QST-516`：秋夜雷雨倾盆，寒玉涧水雾迷蒙，两道终南剑影自幽谷两端踏雨而至

- **关联文件**：[`src/data/quests/sects/zhongnanThirtyYearWagerQuest.ts`](../src/data/quests/sects/zhongnanThirtyYearWagerQuest.ts)
- **目标路径**：`public/assets/quests/zn_q20_rain_patrol.jpg`
- **画框题跋**：`秋夜雷雨倾盆，寒玉涧水雾迷蒙，两道终南剑影自幽谷两端踏雨而至`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "秋夜雷雨倾盆，寒玉涧水雾迷蒙，两道终南剑影自幽谷两端踏雨而至" from 《寒涧残碑 · 三十载赌约》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 517. `CG-QST-517`：电闪雷鸣间，西夏银枪客卿李延宗率黑衣死士自竹林扑出，寒芒直指残碑

- **关联文件**：[`src/data/quests/sects/zhongnanThirtyYearWagerQuest.ts`](../src/data/quests/sects/zhongnanThirtyYearWagerQuest.ts)
- **目标路径**：`public/assets/quests/zn_q20_li_yanzong_ambush.jpg`
- **画框题跋**：`电闪雷鸣间，西夏银枪客卿李延宗率黑衣死士自竹林扑出，寒芒直指残碑`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "电闪雷鸣间，西夏银枪客卿李延宗率黑衣死士自竹林扑出，寒芒直指残碑" from 《寒涧残碑 · 三十载赌约》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 518. `CG-QST-518`：古观长剑与古墓素剑于雷雨中交错映辉，硬撼西夏银枪李延宗的暴雨梨花枪势

- **关联文件**：[`src/data/quests/sects/zhongnanThirtyYearWagerQuest.ts`](../src/data/quests/sects/zhongnanThirtyYearWagerQuest.ts)
- **目标路径**：`public/assets/quests/zn_q20_twin_sword_clash.jpg`
- **画框题跋**：`古观长剑与古墓素剑于雷雨中交错映辉，硬撼西夏银枪李延宗的暴雨梨花枪势`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "古观长剑与古墓素剑于雷雨中交错映辉，硬撼西夏银枪李延宗的暴雨梨花枪势" from 《寒涧残碑 · 三十载赌约》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 519. `CG-QST-519`：一道紫电劈落古碑覆苔，露出一阴一阳交缠而刻的剑诀残文与三十载前旧题

- **关联文件**：[`src/data/quests/sects/zhongnanThirtyYearWagerQuest.ts`](../src/data/quests/sects/zhongnanThirtyYearWagerQuest.ts)
- **目标路径**：`public/assets/quests/zn_q20_broken_stele.jpg`
- **画框题跋**：`一道紫电劈落古碑覆苔，露出一阴一阳交缠而刻的剑诀残文与三十载前旧题`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "一道紫电劈落古碑覆苔，露出一阴一阳交缠而刻的剑诀残文与三十载前旧题" from 《寒涧残碑 · 三十载赌约》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 520. `CG-QST-520`：王重楼与林朝瑶三十载后再度并立寒玉涧残碑前，雨雾朦胧，往事如烟

- **关联文件**：[`src/data/quests/sects/zhongnanThirtyYearWagerQuest.ts`](../src/data/quests/sects/zhongnanThirtyYearWagerQuest.ts)
- **目标路径**：`public/assets/quests/zn_q20_thirty_year_oath.jpg`
- **画框题跋**：`王重楼与林朝瑶三十载后再度并立寒玉涧残碑前，雨雾朦胧，往事如烟`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "王重楼与林朝瑶三十载后再度并立寒玉涧残碑前，雨雾朦胧，往事如烟" from 《寒涧残碑 · 三十载赌约》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 521. `CG-QST-521`：秋柳疏荷掩映水亭，邵雍素袍临池手谈，郝大玄携徒恭敬拜谒

- **关联文件**：[`src/data/quests/sects/zhongnanGuanLuoyangYijingQuest.ts`](../src/data/quests/sects/zhongnanGuanLuoyangYijingQuest.ts)
- **目标路径**：`public/assets/quests/zn_q21_luoyang_shaoyong.jpg`
- **画框题跋**：`秋柳疏荷掩映水亭，邵雍素袍临池手谈，郝大玄携徒恭敬拜谒`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "秋柳疏荷掩映水亭，邵雍素袍临池手谈，郝大玄携徒恭敬拜谒" from 《皇极经世 · 洛阳问数》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 522. `CG-QST-522`：黑白棋子化作天罡北斗七星，邵雍以先天易数点破阵眼生克流转之妙

- **关联文件**：[`src/data/quests/sects/zhongnanGuanLuoyangYijingQuest.ts`](../src/data/quests/sects/zhongnanGuanLuoyangYijingQuest.ts)
- **目标路径**：`public/assets/quests/zn_q21_dipper_astrolabe.jpg`
- **画框题跋**：`黑白棋子化作天罡北斗七星，邵雍以先天易数点破阵眼生克流转之妙`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "黑白棋子化作天罡北斗七星，邵雍以先天易数点破阵眼生克流转之妙" from 《皇极经世 · 洛阳问数》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 523. `CG-QST-523`：洛水天津酒楼灯火摇曳，辽国南院密探拔刀掀桌，剑光瞬间照亮夜江

- **关联文件**：[`src/data/quests/sects/zhongnanGuanLuoyangYijingQuest.ts`](../src/data/quests/sects/zhongnanGuanLuoyangYijingQuest.ts)
- **目标路径**：`public/assets/quests/zn_q21_luoshui_tavern_ambush.jpg`
- **画框题跋**：`洛水天津酒楼灯火摇曳，辽国南院密探拔刀掀桌，剑光瞬间照亮夜江`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "洛水天津酒楼灯火摇曳，辽国南院密探拔刀掀桌，剑光瞬间照亮夜江" from 《皇极经世 · 洛阳问数》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 524. `CG-QST-524`：塞外大雪纷飞，鄜延大营旌旗猎猎，中军帅帐内炭火熊熊、沙盘陈列

- **关联文件**：[`src/data/quests/sects/zhongnanGuanYananWarQuest.ts`](../src/data/quests/sects/zhongnanGuanYananWarQuest.ts)
- **目标路径**：`public/assets/quests/zn_q22_yanan_snow_camp.jpg`
- **画框题跋**：`塞外大雪纷飞，鄜延大营旌旗猎猎，中军帅帐内炭火熊熊、沙盘陈列`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "塞外大雪纷飞，鄜延大营旌旗猎猎，中军帅帐内炭火熊熊、沙盘陈列" from 《延水悲歌 · 青涧铁血》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 525. `CG-QST-525`：嘉岭宝塔地宫灯火摇曳，少将种谔指点边关舆图，与丘处玄共定风雪伏击之策

- **关联文件**：[`src/data/quests/sects/zhongnanGuanYananWarQuest.ts`](../src/data/quests/sects/zhongnanGuanYananWarQuest.ts)
- **目标路径**：`public/assets/quests/zn_q22_jialing_pagoda_plan.jpg`
- **画框题跋**：`嘉岭宝塔地宫灯火摇曳，少将种谔指点边关舆图，与丘处玄共定风雪伏击之策`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "嘉岭宝塔地宫灯火摇曳，少将种谔指点边关舆图，与丘处玄共定风雪伏击之策" from 《延水悲歌 · 青涧铁血》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 526. `CG-QST-526`：暴雪漫天，西夏一品堂死士挥舞弯刀扑向帅帐，终南双剑寒光如练死守辕门

- **关联文件**：[`src/data/quests/sects/zhongnanGuanYananWarQuest.ts`](../src/data/quests/sects/zhongnanGuanYananWarQuest.ts)
- **目标路径**：`public/assets/quests/zn_q22_blizzard_tent_defense.jpg`
- **画框题跋**：`暴雪漫天，西夏一品堂死士挥舞弯刀扑向帅帐，终南双剑寒光如练死守辕门`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "暴雪漫天，西夏一品堂死士挥舞弯刀扑向帅帐，终南双剑寒光如练死守辕门" from 《延水悲歌 · 青涧铁血》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 527. `CG-QST-527`：雪霁天明，延水东岸朝霞映红残雪，狄青与种氏父子向终南双剑举酒致敬

- **关联文件**：[`src/data/quests/sects/zhongnanGuanYananWarQuest.ts`](../src/data/quests/sects/zhongnanGuanYananWarQuest.ts)
- **目标路径**：`public/assets/quests/zn_q22_qingjian_blood_dawn.jpg`
- **画框题跋**：`雪霁天明，延水东岸朝霞映红残雪，狄青与种氏父子向终南双剑举酒致敬`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "雪霁天明，延水东岸朝霞映红残雪，狄青与种氏父子向终南双剑举酒致敬" from 《延水悲歌 · 青涧铁血》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 528. `CG-QST-528`：开元寺石塔回廊墨香袅袅，道藏真君黄裳端坐万卷竹简帛书之间，神光内敛

- **关联文件**：[`src/data/quests/sects/zhongnanGuanHuangShangQuest.ts`](../src/data/quests/sects/zhongnanGuanHuangShangQuest.ts)
- **目标路径**：`public/assets/quests/zn_q23_kaiyuan_huangshang.jpg`
- **画框题跋**：`开元寺石塔回廊墨香袅袅，道藏真君黄裳端坐万卷竹简帛书之间，神光内敛`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "开元寺石塔回廊墨香袅袅，道藏真君黄裳端坐万卷竹简帛书之间，神光内敛" from 《刺桐校经 · 万寿道藏》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 529. `CG-QST-529`：夜色浓重，数道黑袍身影携幽蓝火油攀上西塔石檐，黑道海寇刀光映月

- **关联文件**：[`src/data/quests/sects/zhongnanGuanHuangShangQuest.ts`](../src/data/quests/sects/zhongnanGuanHuangShangQuest.ts)
- **目标路径**：`public/assets/quests/zn_q23_manichaean_raid.jpg`
- **画框题跋**：`夜色浓重，数道黑袍身影携幽蓝火油攀上西塔石檐，黑道海寇刀光映月`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "夜色浓重，数道黑袍身影携幽蓝火油攀上西塔石檐，黑道海寇刀光映月" from 《刺桐校经 · 万寿道藏》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 530. `CG-QST-530`：西塔绝顶海风狂卷，终南长剑清光破开赤焰掌风，硬撼波斯圣火使者与江南巨寇

- **关联文件**：[`src/data/quests/sects/zhongnanGuanHuangShangQuest.ts`](../src/data/quests/sects/zhongnanGuanHuangShangQuest.ts)
- **目标路径**：`public/assets/quests/zn_q23_west_tower_battle.jpg`
- **画框题跋**：`西塔绝顶海风狂卷，终南长剑清光破开赤焰掌风，硬撼波斯圣火使者与江南巨寇`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "西塔绝顶海风狂卷，终南长剑清光破开赤焰掌风，硬撼波斯圣火使者与江南巨寇" from 《刺桐校经 · 万寿道藏》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 531. `CG-QST-531`：古塔残夜孤灯明，黄裳与你对坐万卷道藏之前，纵论阴阳互济、刚柔并生之无上天道

- **关联文件**：[`src/data/quests/sects/zhongnanGuanHuangShangQuest.ts`](../src/data/quests/sects/zhongnanGuanHuangShangQuest.ts)
- **目标路径**：`public/assets/quests/zn_q23_daozang_yinyang_night.jpg`
- **画框题跋**：`古塔残夜孤灯明，黄裳与你对坐万卷道藏之前，纵论阴阳互济、刚柔并生之无上天道`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "古塔残夜孤灯明，黄裳与你对坐万卷道藏之前，纵论阴阳互济、刚柔并生之无上天道" from 《刺桐校经 · 万寿道藏》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 532. `CG-QST-532`：重阳古观警钟长鸣，七星演剑坛青袍林立，北斗剑阵迎风而起

- **关联文件**：[`src/data/quests/sects/zhongnanGuanElderPromoteQuest.ts`](../src/data/quests/sects/zhongnanGuanElderPromoteQuest.ts)
- **目标路径**：`public/assets/quests/zn_q24_dipper_formation_rise.jpg`
- **画框题跋**：`重阳古观警钟长鸣，七星演剑坛青袍林立，北斗剑阵迎风而起`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "重阳古观警钟长鸣，七星演剑坛青袍林立，北斗剑阵迎风而起" from 《北斗封山 · 古观长老》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 533. `CG-QST-533`：西夏大将努儿海披挂血色鹰甲，率吐蕃密宗番僧踏雪杀上七星演剑坛

- **关联文件**：[`src/data/quests/sects/zhongnanGuanElderPromoteQuest.ts`](../src/data/quests/sects/zhongnanGuanElderPromoteQuest.ts)
- **目标路径**：`public/assets/quests/zn_q24_nuerhai_assault.jpg`
- **画框题跋**：`西夏大将努儿海披挂血色鹰甲，率吐蕃密宗番僧踏雪杀上七星演剑坛`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "西夏大将努儿海披挂血色鹰甲，率吐蕃密宗番僧踏雪杀上七星演剑坛" from 《北斗封山 · 古观长老》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 534. `CG-QST-534`：七星剑气汇于天枢，你迎着贺兰血鹰努儿海的狂猛爪刀，一剑划破漫天风雪

- **关联文件**：[`src/data/quests/sects/zhongnanGuanElderPromoteQuest.ts`](../src/data/quests/sects/zhongnanGuanElderPromoteQuest.ts)
- **目标路径**：`public/assets/quests/zn_q24_seven_stars_break.jpg`
- **画框题跋**：`七星剑气汇于天枢，你迎着贺兰血鹰努儿海的狂猛爪刀，一剑划破漫天风雪`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "七星剑气汇于天枢，你迎着贺兰血鹰努儿海的狂猛爪刀，一剑划破漫天风雪" from 《北斗封山 · 古观长老》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 535. `CG-QST-535`：重阳主殿香烟缭绕，紫阳真人王重楼亲授青玉长老冠，册封你为古观长老

- **关联文件**：[`src/data/quests/sects/zhongnanGuanElderPromoteQuest.ts`](../src/data/quests/sects/zhongnanGuanElderPromoteQuest.ts)
- **目标路径**：`public/assets/quests/zn_q24_guguan_elder_investiture.jpg`
- **画框题跋**：`重阳主殿香烟缭绕，紫阳真人王重楼亲授青玉长老冠，册封你为古观长老`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "重阳主殿香烟缭绕，紫阳真人王重楼亲授青玉长老冠，册封你为古观长老" from 《北斗封山 · 古观长老》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 536. `CG-QST-536`：剑门雄关云雾缭绕，冷清秋与你素衣按剑踏上望胡台，与青城鹤道人贾天鹤隔风对峙

- **关联文件**：[`src/data/quests/sects/zhongnanMuQingchengDuelQuest.ts`](../src/data/quests/sects/zhongnanMuQingchengDuelQuest.ts)
- **目标路径**：`public/assets/quests/zn_q25_jianmen_rescue.jpg`
- **画框题跋**：`剑门雄关云雾缭绕，冷清秋与你素衣按剑踏上望胡台，与青城鹤道人贾天鹤隔风对峙`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "剑门雄关云雾缭绕，冷清秋与你素衣按剑踏上望胡台，与青城鹤道人贾天鹤隔风对峙" from 《剑阁猿啼 · 巴山折剑》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 537. `CG-QST-537`：上清宫松风主殿青石坪上，青城众弟子列剑相迎，你与冷清秋素衣孤剑昂然登阶

- **关联文件**：[`src/data/quests/sects/zhongnanMuQingchengDuelQuest.ts`](../src/data/quests/sects/zhongnanMuQingchengDuelQuest.ts)
- **目标路径**：`public/assets/quests/zn_q25_shangqing_challenge.jpg`
- **画框题跋**：`上清宫松风主殿青石坪上，青城众弟子列剑相迎，你与冷清秋素衣孤剑昂然登阶`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "上清宫松风主殿青石坪上，青城众弟子列剑相迎，你与冷清秋素衣孤剑昂然登阶" from 《剑阁猿啼 · 巴山折剑》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 538. `CG-QST-538`：第十合剑光一闪，玉女素剑轻挑余沧澜头顶玉冠，道冠应声裂作两半坠地

- **关联文件**：[`src/data/quests/sects/zhongnanMuQingchengDuelQuest.ts`](../src/data/quests/sects/zhongnanMuQingchengDuelQuest.ts)
- **目标路径**：`public/assets/quests/zn_q25_yucanglan_crown_split.jpg`
- **画框题跋**：`第十合剑光一闪，玉女素剑轻挑余沧澜头顶玉冠，道冠应声裂作两半坠地`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "第十合剑光一闪，玉女素剑轻挑余沧澜头顶玉冠，道冠应声裂作两半坠地" from 《剑阁猿啼 · 巴山折剑》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 539. `CG-QST-539`：石头城赤壁悬崖临江而立，孤峰剑客叶孤鸿白衣抱剑观涛，剑气凌云

- **关联文件**：[`src/data/quests/sects/zhongnanMuJiangningSwordQuest.ts`](../src/data/quests/sects/zhongnanMuJiangningSwordQuest.ts)
- **目标路径**：`public/assets/quests/zn_q26_chibi_yeguhong_duel.jpg`
- **画框题跋**：`石头城赤壁悬崖临江而立，孤峰剑客叶孤鸿白衣抱剑观涛，剑气凌云`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "石头城赤壁悬崖临江而立，孤峰剑客叶孤鸿白衣抱剑观涛，剑气凌云" from 《赤壁听涛 · 钟山问剑》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 540. `CG-QST-540`：重剑如山倾下，素剑如寒泉绕石轻滑而过，四两拨千斤震散漫天江雾

- **关联文件**：[`src/data/quests/sects/zhongnanMuJiangningSwordQuest.ts`](../src/data/quests/sects/zhongnanMuJiangningSwordQuest.ts)
- **目标路径**：`public/assets/quests/zn_q26_soft_overcomes_hard.jpg`
- **画框题跋**：`重剑如山倾下，素剑如寒泉绕石轻滑而过，四两拨千斤震散漫天江雾`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "重剑如山倾下，素剑如寒泉绕石轻滑而过，四两拨千斤震散漫天江雾" from 《赤壁听涛 · 钟山问剑》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 541. `CG-QST-541`：秦淮河心画舫灯火通明，王安石临窗执卷论政，暗处慕容与辽国水鬼悄然逼近

- **关联文件**：[`src/data/quests/sects/zhongnanMuJiangningSwordQuest.ts`](../src/data/quests/sects/zhongnanMuJiangningSwordQuest.ts)
- **目标路径**：`public/assets/quests/zn_q26_qinhuai_boat_meeting.jpg`
- **画框题跋**：`秦淮河心画舫灯火通明，王安石临窗执卷论政，暗处慕容与辽国水鬼悄然逼近`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "秦淮河心画舫灯火通明，王安石临窗执卷论政，暗处慕容与辽国水鬼悄然逼近" from 《赤壁听涛 · 钟山问剑》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 542. `CG-QST-542`：秦淮河面灯火碎成万点金鳞，你与叶孤鸿一柔一刚联手合击姑苏慕容暗探头目

- **关联文件**：[`src/data/quests/sects/zhongnanMuJiangningSwordQuest.ts`](../src/data/quests/sects/zhongnanMuJiangningSwordQuest.ts)
- **目标路径**：`public/assets/quests/zn_q26_murong_spy_purge.jpg`
- **画框题跋**：`秦淮河面灯火碎成万点金鳞，你与叶孤鸿一柔一刚联手合击姑苏慕容暗探头目`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "秦淮河面灯火碎成万点金鳞，你与叶孤鸿一柔一刚联手合击姑苏慕容暗探头目" from 《赤壁听涛 · 钟山问剑》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 543. `CG-QST-543`：长安西市驼铃叮当，奇货堂内胡商展开一卷羊皮绘制的昆仑雪域古图

- **关联文件**：[`src/data/quests/sects/zhongnanMuKunlunJadeQuest.ts`](../src/data/quests/sects/zhongnanMuKunlunJadeQuest.ts)
- **目标路径**：`public/assets/quests/zn_q27_changan_kunlun_map.jpg`
- **画框题跋**：`长安西市驼铃叮当，奇货堂内胡商展开一卷羊皮绘制的昆仑雪域古图`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "长安西市驼铃叮当，奇货堂内胡商展开一卷羊皮绘制的昆仑雪域古图" from 《瑶池万里 · 昆仑采玉》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 544. `CG-QST-544`：翡翠雪莲池畔寒雾氤氲，雪山隐士钟离雪白衣如雪，正以寒玉剑护住冰池雪莲

- **关联文件**：[`src/data/quests/sects/zhongnanMuKunlunJadeQuest.ts`](../src/data/quests/sects/zhongnanMuKunlunJadeQuest.ts)
- **目标路径**：`public/assets/quests/zn_q27_yaochi_zhonglixue.jpg`
- **画框题跋**：`翡翠雪莲池畔寒雾氤氲，雪山隐士钟离雪白衣如雪，正以寒玉剑护住冰池雪莲`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "翡翠雪莲池畔寒雾氤氲，雪山隐士钟离雪白衣如雪，正以寒玉剑护住冰池雪莲" from 《瑶池万里 · 昆仑采玉》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 545. `CG-QST-545`：翡翠冰池之上寒气四溢，你以古墓轻灵剑法硬撼万仙盟魁乌老大的绿波香露刀

- **关联文件**：[`src/data/quests/sects/zhongnanMuKunlunJadeQuest.ts`](../src/data/quests/sects/zhongnanMuKunlunJadeQuest.ts)
- **目标路径**：`public/assets/quests/zn_q27_wulaoda_clash.jpg`
- **画框题跋**：`翡翠冰池之上寒气四溢，你以古墓轻灵剑法硬撼万仙盟魁乌老大的绿波香露刀`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "翡翠冰池之上寒气四溢，你以古墓轻灵剑法硬撼万仙盟魁乌老大的绿波香露刀" from 《瑶池万里 · 昆仑采玉》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 546. `CG-QST-546`：万年寒玉冰床晶坛蓝光流转，天山童姥巫行云虽形如女童却威压如天崩海啸，你傲立冰阶寸步不跪

- **关联文件**：[`src/data/quests/sects/zhongnanMuKunlunJadeQuest.ts`](../src/data/quests/sects/zhongnanMuKunlunJadeQuest.ts)
- **目标路径**：`public/assets/quests/zn_q27_wuxingyun_pressure.jpg`
- **画框题跋**：`万年寒玉冰床晶坛蓝光流转，天山童姥巫行云虽形如女童却威压如天崩海啸，你傲立冰阶寸步不跪`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "万年寒玉冰床晶坛蓝光流转，天山童姥巫行云虽形如女童却威压如天崩海啸，你傲立冰阶寸步不跪" from 《瑶池万里 · 昆仑采玉》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 547. `CG-QST-547`：寒玉床裂痕在万年寒玉髓碧光中缓缓愈合，林朝瑶神色欣慰，暗赞弟子万里奇功

- **关联文件**：[`src/data/quests/sects/zhongnanMuKunlunJadeQuest.ts`](../src/data/quests/sects/zhongnanMuKunlunJadeQuest.ts)
- **目标路径**：`public/assets/quests/zn_q27_jade_marrow_return.jpg`
- **画框题跋**：`寒玉床裂痕在万年寒玉髓碧光中缓缓愈合，林朝瑶神色欣慰，暗赞弟子万里奇功`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "寒玉床裂痕在万年寒玉髓碧光中缓缓愈合，林朝瑶神色欣慰，暗赞弟子万里奇功" from 《瑶池万里 · 昆仑采玉》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 548. `CG-QST-548`：幽蓝磷火与腥甜毒烟涌入活死人墓石廊，冷清秋与白清霜持剑苦撑捕雀大厅

- **关联文件**：[`src/data/quests/sects/zhongnanMuElderPromoteQuest.ts`](../src/data/quests/sects/zhongnanMuElderPromoteQuest.ts)
- **目标路径**：`public/assets/quests/zn_q28_duanlong_poison_night.jpg`
- **画框题跋**：`幽蓝磷火与腥甜毒烟涌入活死人墓石廊，冷清秋与白清霜持剑苦撑捕雀大厅`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "幽蓝磷火与腥甜毒烟涌入活死人墓石廊，冷清秋与白清霜持剑苦撑捕雀大厅" from 《断龙血夜 · 毒海孤星》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 549. `CG-QST-549`：幽绿毒雾散开，星宿大弟子摘星子率碧磷毒师狞笑步入捕雀厅，双掌紫黑泛毒

- **关联文件**：[`src/data/quests/sects/zhongnanMuElderPromoteQuest.ts`](../src/data/quests/sects/zhongnanMuElderPromoteQuest.ts)
- **目标路径**：`public/assets/quests/zn_q28_zhaixingzi_ambush.jpg`
- **画框题跋**：`幽绿毒雾散开，星宿大弟子摘星子率碧磷毒师狞笑步入捕雀厅，双掌紫黑泛毒`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "幽绿毒雾散开，星宿大弟子摘星子率碧磷毒师狞笑步入捕雀厅，双掌紫黑泛毒" from 《断龙血夜 · 毒海孤星》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 550. `CG-QST-550`：天罗地网捕雀厅内寒芒四射，你孤身游走毒雾之间，以一敌二反攻摘星子与碧磷毒师

- **关联文件**：[`src/data/quests/sects/zhongnanMuElderPromoteQuest.ts`](../src/data/quests/sects/zhongnanMuElderPromoteQuest.ts)
- **目标路径**：`public/assets/quests/zn_q28_sparrow_hall_counter.jpg`
- **画框题跋**：`天罗地网捕雀厅内寒芒四射，你孤身游走毒雾之间，以一敌二反攻摘星子与碧磷毒师`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "天罗地网捕雀厅内寒芒四射，你孤身游走毒雾之间，以一敌二反攻摘星子与碧磷毒师" from 《断龙血夜 · 毒海孤星》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 551. `CG-QST-551`：冰魄石室碧光如月，林朝瑶亲授寒玉护法尊印，册封你为活死人墓护法尊使

- **关联文件**：[`src/data/quests/sects/zhongnanMuElderPromoteQuest.ts`](../src/data/quests/sects/zhongnanMuElderPromoteQuest.ts)
- **目标路径**：`public/assets/quests/zn_q28_gumu_elder_investiture.jpg`
- **画框题跋**：`冰魄石室碧光如月，林朝瑶亲授寒玉护法尊印，册封你为活死人墓护法尊使`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "冰魄石室碧光如月，林朝瑶亲授寒玉护法尊印，册封你为活死人墓护法尊使" from 《断龙血夜 · 毒海孤星》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 552. `CG-QST-552`：腊月黑云压顶，千百支西夏火把如黑龙盘旋终南山道，重阳古观警钟震彻寒夜

- **关联文件**：[`src/data/quests/sects/zhongnanXixiaInvasionQuest.ts`](../src/data/quests/sects/zhongnanXixiaInvasionQuest.ts)
- **目标路径**：`public/assets/quests/zn_q29_helan_black_cloud.jpg`
- **画框题跋**：`腊月黑云压顶，千百支西夏火把如黑龙盘旋终南山道，重阳古观警钟震彻寒夜`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "腊月黑云压顶，千百支西夏火把如黑龙盘旋终南山道，重阳古观警钟震彻寒夜" from 《贺兰黑云 · 一品叩关》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 553. `CG-QST-553`：无色无味的悲酥清风露随西北寒风席卷广场，终南弟子纷纷泪流满面、内力顿失

- **关联文件**：[`src/data/quests/sects/zhongnanXixiaInvasionQuest.ts`](../src/data/quests/sects/zhongnanXixiaInvasionQuest.ts)
- **目标路径**：`public/assets/quests/zn_q29_beisu_qingfeng_mist.jpg`
- **画框题跋**：`无色无味的悲酥清风露随西北寒风席卷广场，终南弟子纷纷泪流满面、内力顿失`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "无色无味的悲酥清风露随西北寒风席卷广场，终南弟子纷纷泪流满面、内力顿失" from 《贺兰黑云 · 一品叩关》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 554. `CG-QST-554`：火光冲天毒雾弥漫，你孤剑死守丹墀石阶，迎着赫连霸先铁刀与段延庆双拐苦撑破围

- **关联文件**：[`src/data/quests/sects/zhongnanXixiaInvasionQuest.ts`](../src/data/quests/sects/zhongnanXixiaInvasionQuest.ts)
- **目标路径**：`public/assets/quests/zn_q29_duan_helian_siege.jpg`
- **画框题跋**：`火光冲天毒雾弥漫，你孤剑死守丹墀石阶，迎着赫连霸先铁刀与段延庆双拐苦撑破围`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "火光冲天毒雾弥漫，你孤剑死守丹墀石阶，迎着赫连霸先铁刀与段延庆双拐苦撑破围" from 《贺兰黑云 · 一品叩关》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 555. `CG-QST-555`：寒玉涧残碑雾气迷蒙，王重楼与林朝瑶虽俱负重伤，仍各自静坐溪水两侧调息护阵

- **关联文件**：[`src/data/quests/sects/zhongnanXixiaInvasionQuest.ts`](../src/data/quests/sects/zhongnanXixiaInvasionQuest.ts)
- **目标路径**：`public/assets/quests/zn_q29_twin_masters_retreat.jpg`
- **画框题跋**：`寒玉涧残碑雾气迷蒙，王重楼与林朝瑶虽俱负重伤，仍各自静坐溪水两侧调息护阵`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "寒玉涧残碑雾气迷蒙，王重楼与林朝瑶虽俱负重伤，仍各自静坐溪水两侧调息护阵" from 《贺兰黑云 · 一品叩关》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 556. `CG-QST-556`：残碑矗立寒雾之中，你的抉择将决定终南双脉是「双剑合璧 · 阴阳归元」，还是「独守本脉 · 孤峰血战」

- **关联文件**：[`src/data/quests/sects/zhongnanXixiaInvasionQuest.ts`](../src/data/quests/sects/zhongnanXixiaInvasionQuest.ts)
- **目标路径**：`public/assets/quests/zn_q29_harmony_or_split.jpg`
- **画框题跋**：`残碑矗立寒雾之中，你的抉择将决定终南双脉是「双剑合璧 · 阴阳归元」，还是「独守本脉 · 孤峰血战」`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "残碑矗立寒雾之中，你的抉择将决定终南双脉是「双剑合璧 · 阴阳归元」，还是「独守本脉 · 孤峰血战」" from 《贺兰黑云 · 一品叩关》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 557. `CG-QST-557`：重阳玄门清修主殿 · 王重楼亲书八字旧笺托付使者，放下二十载执念求道墓同心

- **关联文件**：[`src/data/quests/sects/zhongnanHarmonyUniteQuest.ts`](../src/data/quests/sects/zhongnanHarmonyUniteQuest.ts)
- **目标路径**：`public/assets/quests/zn_q30_tao_plea.jpg`
- **画框题跋**：`重阳玄门清修主殿 · 王重楼亲书八字旧笺托付使者，放下二十载执念求道墓同心`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "重阳玄门清修主殿 · 王重楼亲书八字旧笺托付使者，放下二十载执念求道墓同心" from 《寒涧同心 · 剑道合流》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 558. `CG-QST-558`：昆仑寒玉床冰魄石室 · 林朝瑶展读紫阳旧笺，冰封二十载的眉宇终见春融

- **关联文件**：[`src/data/quests/sects/zhongnanHarmonyUniteQuest.ts`](../src/data/quests/sects/zhongnanHarmonyUniteQuest.ts)
- **目标路径**：`public/assets/quests/zn_q30_tomb_jadebed.jpg`
- **画框题跋**：`昆仑寒玉床冰魄石室 · 林朝瑶展读紫阳旧笺，冰封二十载的眉宇终见春融`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "昆仑寒玉床冰魄石室 · 林朝瑶展读紫阳旧笺，冰封二十载的眉宇终见春融" from 《寒涧同心 · 剑道合流》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 559. `CG-QST-559`：寒玉涧临水抚琴榭 · 王重楼与林朝瑶阴阳调和共愈沉疴，剑气冲霄震散残敌

- **关联文件**：[`src/data/quests/sects/zhongnanHarmonyUniteQuest.ts`](../src/data/quests/sects/zhongnanHarmonyUniteQuest.ts)
- **目标路径**：`public/assets/quests/zn_q30_qin_heal.jpg`
- **画框题跋**：`寒玉涧临水抚琴榭 · 王重楼与林朝瑶阴阳调和共愈沉疴，剑气冲霄震散残敌`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "寒玉涧临水抚琴榭 · 王重楼与林朝瑶阴阳调和共愈沉疴，剑气冲霄震散残敌" from 《寒涧同心 · 剑道合流》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 560. `CG-QST-560`：寒玉涧晨曦 · 王重楼与林朝瑶联手传功，重阳纯阳气与古墓寒玉意合流太极

- **关联文件**：[`src/data/quests/sects/zhongnanHarmonyUniteQuest.ts`](../src/data/quests/sects/zhongnanHarmonyUniteQuest.ts)
- **目标路径**：`public/assets/quests/zn_q30_dual_arts.jpg`
- **画框题跋**：`寒玉涧晨曦 · 王重楼与林朝瑶联手传功，重阳纯阳气与古墓寒玉意合流太极`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "寒玉涧晨曦 · 王重楼与林朝瑶联手传功，重阳纯阳气与古墓寒玉意合流太极" from 《寒涧同心 · 剑道合流》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 561. `CG-QST-561`：繁花幽谷双剑合璧坪 · 王重楼与林朝瑶剑气裂石，终南两脉二十载情缘彻底割席

- **关联文件**：[`src/data/quests/sects/zhongnanBitterSplitQuest.ts`](../src/data/quests/sects/zhongnanBitterSplitQuest.ts)
- **目标路径**：`public/assets/quests/zn_q31_stream_confront.jpg`
- **画框题跋**：`繁花幽谷双剑合璧坪 · 王重楼与林朝瑶剑气裂石，终南两脉二十载情缘彻底割席`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "繁花幽谷双剑合璧坪 · 王重楼与林朝瑶剑气裂石，终南两脉二十载情缘彻底割席" from 《孤峰执念 · 道墓决裂》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 562. `CG-QST-562`：寒玉涧断桥 · 铁索既断、界石既立，你提剑孤身奔赴银练飞瀑迎击西夏先锋

- **关联文件**：[`src/data/quests/sects/zhongnanBitterSplitQuest.ts`](../src/data/quests/sects/zhongnanBitterSplitQuest.ts)
- **目标路径**：`public/assets/quests/zn_q31_bridge_sever.jpg`
- **画框题跋**：`寒玉涧断桥 · 铁索既断、界石既立，你提剑孤身奔赴银练飞瀑迎击西夏先锋`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "寒玉涧断桥 · 铁索既断、界石既立，你提剑孤身奔赴银练飞瀑迎击西夏先锋" from 《孤峰执念 · 道墓决裂》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 563. `CG-QST-563`：银练飞瀑之下 · 你孤身一剑斩退西夏铁骑先锋，水雾染血而本脉脊梁不弯

- **关联文件**：[`src/data/quests/sects/zhongnanBitterSplitQuest.ts`](../src/data/quests/sects/zhongnanBitterSplitQuest.ts)
- **目标路径**：`public/assets/quests/zn_q31_vanguard_duel.jpg`
- **画框题跋**：`银练飞瀑之下 · 你孤身一剑斩退西夏铁骑先锋，水雾染血而本脉脊梁不弯`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "银练飞瀑之下 · 你孤身一剑斩退西夏铁骑先锋，水雾染血而本脉脊梁不弯" from 《孤峰执念 · 道墓决裂》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 564. `CG-QST-564`：繁花幽谷界碑前 · 残雨初歇，孤峰剑客横剑立誓，自此道墓割席各行其道

- **关联文件**：[`src/data/quests/sects/zhongnanBitterSplitQuest.ts`](../src/data/quests/sects/zhongnanBitterSplitQuest.ts)
- **目标路径**：`public/assets/quests/zn_q31_lone_oath.jpg`
- **画框题跋**：`繁花幽谷界碑前 · 残雨初歇，孤峰剑客横剑立誓，自此道墓割席各行其道`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "繁花幽谷界碑前 · 残雨初歇，孤峰剑客横剑立誓，自此道墓割席各行其道" from 《孤峰执念 · 道墓决裂》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 565. `CG-QST-565`：重阳玄门主殿 · 王重楼亲手将紫阳先天八卦鹤氅披于弟子肩头，口授天阶先天功总纲

- **关联文件**：[`src/data/quests/sects/zhongnanGuanXiantianAwakenQuest.ts`](../src/data/quests/sects/zhongnanGuanXiantianAwakenQuest.ts)
- **目标路径**：`public/assets/quests/zn_q32_ziyang_robe.jpg`
- **画框题跋**：`重阳玄门主殿 · 王重楼亲手将紫阳先天八卦鹤氅披于弟子肩头，口授天阶先天功总纲`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "重阳玄门主殿 · 王重楼亲手将紫阳先天八卦鹤氅披于弟子肩头，口授天阶先天功总纲" from 《先天一炁 · 紫阳传衣》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 566. `CG-QST-566`：紫金丹院 · 先天一炁破关而出，紫阳鹤氅星纹大亮，道藏经阁紫气盈室

- **关联文件**：[`src/data/quests/sects/zhongnanGuanXiantianAwakenQuest.ts`](../src/data/quests/sects/zhongnanGuanXiantianAwakenQuest.ts)
- **目标路径**：`public/assets/quests/zn_q32_xiantian_qi.jpg`
- **画框题跋**：`紫金丹院 · 先天一炁破关而出，紫阳鹤氅星纹大亮，道藏经阁紫气盈室`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "紫金丹院 · 先天一炁破关而出，紫阳鹤氅星纹大亮，道藏经阁紫气盈室" from 《先天一炁 · 紫阳传衣》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 567. `CG-QST-567`：破晓演剑坛 · 赫连霸先率西夏铁鹞重甲压境，你身披紫阳鹤氅孤身立于北斗阵眼

- **关联文件**：[`src/data/quests/sects/zhongnanGuanXiantianAwakenQuest.ts`](../src/data/quests/sects/zhongnanGuanXiantianAwakenQuest.ts)
- **目标路径**：`public/assets/quests/zn_q32_dipper_dawn.jpg`
- **画框题跋**：`破晓演剑坛 · 赫连霸先率西夏铁鹞重甲压境，你身披紫阳鹤氅孤身立于北斗阵眼`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "破晓演剑坛 · 赫连霸先率西夏铁鹞重甲压境，你身披紫阳鹤氅孤身立于北斗阵眼" from 《先天一炁 · 紫阳传衣》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 568. `CG-QST-568`：天罡演剑坛 · 先天一炁紫光冲霄，一掌震裂铁鹞重甲正面击退赫连霸先

- **关联文件**：[`src/data/quests/sects/zhongnanGuanXiantianAwakenQuest.ts`](../src/data/quests/sects/zhongnanGuanXiantianAwakenQuest.ts)
- **目标路径**：`public/assets/quests/zn_q32_helian_clash.jpg`
- **画框题跋**：`天罡演剑坛 · 先天一炁紫光冲霄，一掌震裂铁鹞重甲正面击退赫连霸先`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "天罡演剑坛 · 先天一炁紫光冲霄，一掌震裂铁鹞重甲正面击退赫连霸先" from 《先天一炁 · 紫阳传衣》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 569. `CG-QST-569`：重阳古观雪霁 · 朝阳满坛，紫阳鹤氅迎风舒展，先天一炁薪火相传

- **关联文件**：[`src/data/quests/sects/zhongnanGuanXiantianAwakenQuest.ts`](../src/data/quests/sects/zhongnanGuanXiantianAwakenQuest.ts)
- **目标路径**：`public/assets/quests/zn_q32_sunrise_dao.jpg`
- **画框题跋**：`重阳古观雪霁 · 朝阳满坛，紫阳鹤氅迎风舒展，先天一炁薪火相传`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "重阳古观雪霁 · 朝阳满坛，紫阳鹤氅迎风舒展，先天一炁薪火相传" from 《先天一炁 · 紫阳传衣》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 570. `CG-QST-570`：重阳玄门清修主殿 · 王重楼亲授重阳天罡七星剑，全真七子佩剑列阵誓师出关

- **关联文件**：[`src/data/quests/sects/zhongnanGuanSevenStarSwordQuest.ts`](../src/data/quests/sects/zhongnanGuanSevenStarSwordQuest.ts)
- **目标路径**：`public/assets/quests/zn_q33_sevenstar_bestow.jpg`
- **画框题跋**：`重阳玄门清修主殿 · 王重楼亲授重阳天罡七星剑，全真七子佩剑列阵誓师出关`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "重阳玄门清修主殿 · 王重楼亲授重阳天罡七星剑，全真七子佩剑列阵誓师出关" from 《天罡神剑 · 横绝塞北》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 571. `CG-QST-571`：潼关镇河城楼 · 七星神剑斩落燕云铁枪红缨，黄河冰涛间力挽关中门户

- **关联文件**：[`src/data/quests/sects/zhongnanGuanSevenStarSwordQuest.ts`](../src/data/quests/sects/zhongnanGuanSevenStarSwordQuest.ts)
- **目标路径**：`public/assets/quests/zn_q33_tongguan_spear.jpg`
- **画框题跋**：`潼关镇河城楼 · 七星神剑斩落燕云铁枪红缨，黄河冰涛间力挽关中门户`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "潼关镇河城楼 · 七星神剑斩落燕云铁枪红缨，黄河冰涛间力挽关中门户" from 《天罡神剑 · 横绝塞北》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 572. `CG-QST-572`：鄜延边军西营 · 风雪夜火光冲天，你执七星神剑率全真七子列天罡北斗大阵围锁段延庆

- **关联文件**：[`src/data/quests/sects/zhongnanGuanSevenStarSwordQuest.ts`](../src/data/quests/sects/zhongnanGuanSevenStarSwordQuest.ts)
- **目标路径**：`public/assets/quests/zn_q33_yanan_array.jpg`
- **画框题跋**：`鄜延边军西营 · 风雪夜火光冲天，你执七星神剑率全真七子列天罡北斗大阵围锁段延庆`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "鄜延边军西营 · 风雪夜火光冲天，你执七星神剑率全真七子列天罡北斗大阵围锁段延庆" from 《天罡神剑 · 横绝塞北》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 573. `CG-QST-573`：延安风雪夜 · 七星神剑紫芒破去一阳指铁杖，段延庆负伤遁走，十万军粮安然无恙

- **关联文件**：[`src/data/quests/sects/zhongnanGuanSevenStarSwordQuest.ts`](../src/data/quests/sects/zhongnanGuanSevenStarSwordQuest.ts)
- **目标路径**：`public/assets/quests/zn_q33_duan_duel.jpg`
- **画框题跋**：`延安风雪夜 · 七星神剑紫芒破去一阳指铁杖，段延庆负伤遁走，十万军粮安然无恙`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "延安风雪夜 · 七星神剑紫芒破去一阳指铁杖，段延庆负伤遁走，十万军粮安然无恙" from 《天罡神剑 · 横绝塞北》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 574. `CG-QST-574`：重阳山巅 · 塞北风雪初霁，你佩带重阳天罡七星剑远眺关陕万里河山

- **关联文件**：[`src/data/quests/sects/zhongnanGuanSevenStarSwordQuest.ts`](../src/data/quests/sects/zhongnanGuanSevenStarSwordQuest.ts)
- **目标路径**：`public/assets/quests/zn_q33_north_triumph.jpg`
- **画框题跋**：`重阳山巅 · 塞北风雪初霁，你佩带重阳天罡七星剑远眺关陕万里河山`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "重阳山巅 · 塞北风雪初霁，你佩带重阳天罡七星剑远眺关陕万里河山" from 《天罡神剑 · 横绝塞北》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 575. `CG-QST-575`：冰魄石室 · 林朝瑶于寒玉床前亲授寒玉素心冰魄剑与昆仑寒玉冰心玦，霜华满室

- **关联文件**：[`src/data/quests/sects/zhongnanMuIceSoulSwordQuest.ts`](../src/data/quests/sects/zhongnanMuIceSoulSwordQuest.ts)
- **目标路径**：`public/assets/quests/zn_q34_jadebed_entrust.jpg`
- **画框题跋**：`冰魄石室 · 林朝瑶于寒玉床前亲授寒玉素心冰魄剑与昆仑寒玉冰心玦，霜华满室`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "冰魄石室 · 林朝瑶于寒玉床前亲授寒玉素心冰魄剑与昆仑寒玉冰心玦，霜华满室" from 《冰魄凝心 · 寒玉托剑》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 576. `CG-QST-576`：天罗地网捕雀厅 · 霜白剑光与寒玉冰心玦交相辉映，满室灵雀安然栖止

- **关联文件**：[`src/data/quests/sects/zhongnanMuIceSoulSwordQuest.ts`](../src/data/quests/sects/zhongnanMuIceSoulSwordQuest.ts)
- **目标路径**：`public/assets/quests/zn_q34_ice_meditation.jpg`
- **画框题跋**：`天罗地网捕雀厅 · 霜白剑光与寒玉冰心玦交相辉映，满室灵雀安然栖止`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "天罗地网捕雀厅 · 霜白剑光与寒玉冰心玦交相辉映，满室灵雀安然栖止" from 《冰魄凝心 · 寒玉托剑》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 577. `CG-QST-577`：银练飞瀑 · 叶二娘柳叶双刀与岳老三鳄嘴剪左右夹击，寒玉冰魄剑气骤然凝霜

- **关联文件**：[`src/data/quests/sects/zhongnanMuIceSoulSwordQuest.ts`](../src/data/quests/sects/zhongnanMuIceSoulSwordQuest.ts)
- **目标路径**：`public/assets/quests/zn_q34_falls_ambush.jpg`
- **画框题跋**：`银练飞瀑 · 叶二娘柳叶双刀与岳老三鳄嘴剪左右夹击，寒玉冰魄剑气骤然凝霜`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "银练飞瀑 · 叶二娘柳叶双刀与岳老三鳄嘴剪左右夹击，寒玉冰魄剑气骤然凝霜" from 《冰魄凝心 · 寒玉托剑》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 578. `CG-QST-578`：银练飞瀑之下 · 霜白剑光如冰莲绽放，一剑冻裂鳄剪震退叶二娘与岳老三

- **关联文件**：[`src/data/quests/sects/zhongnanMuIceSoulSwordQuest.ts`](../src/data/quests/sects/zhongnanMuIceSoulSwordQuest.ts)
- **目标路径**：`public/assets/quests/zn_q34_dual_villains.jpg`
- **画框题跋**：`银练飞瀑之下 · 霜白剑光如冰莲绽放，一剑冻裂鳄剪震退叶二娘与岳老三`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "银练飞瀑之下 · 霜白剑光如冰莲绽放，一剑冻裂鳄剪震退叶二娘与岳老三" from 《冰魄凝心 · 寒玉托剑》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 579. `CG-QST-579`：活死人墓幽谷 · 佩冰心玦执冰魄剑立于石门之前，寒雾凝华，古墓新锋威震终南

- **关联文件**：[`src/data/quests/sects/zhongnanMuIceSoulSwordQuest.ts`](../src/data/quests/sects/zhongnanMuIceSoulSwordQuest.ts)
- **目标路径**：`public/assets/quests/zn_q34_tomb_glory.jpg`
- **画框题跋**：`活死人墓幽谷 · 佩冰心玦执冰魄剑立于石门之前，寒雾凝华，古墓新锋威震终南`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "活死人墓幽谷 · 佩冰心玦执冰魄剑立于石门之前，寒雾凝华，古墓新锋威震终南" from 《冰魄凝心 · 寒玉托剑》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 580. `CG-QST-580`：繁花幽谷双剑合璧坪 · 漫天梅瓣随剑风飞舞，林朝瑶以梅枝点破玉女素心剑法极意

- **关联文件**：[`src/data/quests/sects/zhongnanMuSuxinAwakenQuest.ts`](../src/data/quests/sects/zhongnanMuSuxinAwakenQuest.ts)
- **目标路径**：`public/assets/quests/zn_q35_flower_valley.jpg`
- **画框题跋**：`繁花幽谷双剑合璧坪 · 漫天梅瓣随剑风飞舞，林朝瑶以梅枝点破玉女素心剑法极意`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "繁花幽谷双剑合璧坪 · 漫天梅瓣随剑风飞舞，林朝瑶以梅枝点破玉女素心剑法极意" from 《繁花似锦 · 玉女素心》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 581. `CG-QST-581`：繁花幽谷双剑合璧坪 · 段延庆双杖挟一阳指劲破空点来，落花尽碎

- **关联文件**：[`src/data/quests/sects/zhongnanMuSuxinAwakenQuest.ts`](../src/data/quests/sects/zhongnanMuSuxinAwakenQuest.ts)
- **目标路径**：`public/assets/quests/zn_q35_duan_arrival.jpg`
- **画框题跋**：`繁花幽谷双剑合璧坪 · 段延庆双杖挟一阳指劲破空点来，落花尽碎`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "繁花幽谷双剑合璧坪 · 段延庆双杖挟一阳指劲破空点来，落花尽碎" from 《繁花似锦 · 玉女素心》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 582. `CG-QST-582`：繁花幽谷 · 落梅漫天化剑雨，玉女素心剑法彻悟大成，两仪剑光照耀山谷

- **关联文件**：[`src/data/quests/sects/zhongnanMuSuxinAwakenQuest.ts`](../src/data/quests/sects/zhongnanMuSuxinAwakenQuest.ts)
- **目标路径**：`public/assets/quests/zn_q35_suxin_epiphany.jpg`
- **画框题跋**：`繁花幽谷 · 落梅漫天化剑雨，玉女素心剑法彻悟大成，两仪剑光照耀山谷`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "繁花幽谷 · 落梅漫天化剑雨，玉女素心剑法彻悟大成，两仪剑光照耀山谷" from 《繁花似锦 · 玉女素心》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 583. `CG-QST-583`：繁花幽谷 · 素心剑雨连点七处要穴，重创恶贯满盈段延庆并将其逐出终南山

- **关联文件**：[`src/data/quests/sects/zhongnanMuSuxinAwakenQuest.ts`](../src/data/quests/sects/zhongnanMuSuxinAwakenQuest.ts)
- **目标路径**：`public/assets/quests/zn_q35_suxin_clash.jpg`
- **画框题跋**：`繁花幽谷 · 素心剑雨连点七处要穴，重创恶贯满盈段延庆并将其逐出终南山`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "繁花幽谷 · 素心剑雨连点七处要穴，重创恶贯满盈段延庆并将其逐出终南山" from 《繁花似锦 · 玉女素心》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 584. `CG-QST-584`：终南山道 · 段延庆折杖遁走，山梅落英纷飞，终南幽谷重归清宁

- **关联文件**：[`src/data/quests/sects/zhongnanMuSuxinAwakenQuest.ts`](../src/data/quests/sects/zhongnanMuSuxinAwakenQuest.ts)
- **目标路径**：`public/assets/quests/zn_q35_duan_retreat.jpg`
- **画框题跋**：`终南山道 · 段延庆折杖遁走，山梅落英纷飞，终南幽谷重归清宁`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "终南山道 · 段延庆折杖遁走，山梅落英纷飞，终南幽谷重归清宁" from 《繁花似锦 · 玉女素心》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 585. `CG-QST-585`：繁花幽谷双剑合璧坪 · 玉女素心剑道大成，漫天梅影随剑心流转，威震天下剑林

- **关联文件**：[`src/data/quests/sects/zhongnanMuSuxinAwakenQuest.ts`](../src/data/quests/sects/zhongnanMuSuxinAwakenQuest.ts)
- **目标路径**：`public/assets/quests/zn_q35_suxin_mastery.jpg`
- **画框题跋**：`繁花幽谷双剑合璧坪 · 玉女素心剑道大成，漫天梅影随剑心流转，威震天下剑林`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "繁花幽谷双剑合璧坪 · 玉女素心剑道大成，漫天梅影随剑心流转，威震天下剑林" from 《繁花似锦 · 玉女素心》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 586. `CG-QST-586`：重阳玄门清修主殿 · 王重楼换上云游青袍，于三清像前宣布传印托付玄门正统

- **关联文件**：[`src/data/quests/sects/zhongnanEndingZiyangMasterQuest.ts`](../src/data/quests/sects/zhongnanEndingZiyangMasterQuest.ts)
- **目标路径**：`public/assets/quests/zn_q36_ziyang_summon.jpg`
- **画框题跋**：`重阳玄门清修主殿 · 王重楼换上云游青袍，于三清像前宣布传印托付玄门正统`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "重阳玄门清修主殿 · 王重楼换上云游青袍，于三清像前宣布传印托付玄门正统" from 《玄门正统 · 紫阳掌教》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 587. `CG-QST-587`：天罡演剑坛 · 紫阳真人以青竹杖印证七星神剑，两代先天紫气冲霄映彻终南

- **关联文件**：[`src/data/quests/sects/zhongnanEndingZiyangMasterQuest.ts`](../src/data/quests/sects/zhongnanEndingZiyangMasterQuest.ts)
- **目标路径**：`public/assets/quests/zn_q36_dipper_trial.jpg`
- **画框题跋**：`天罡演剑坛 · 紫阳真人以青竹杖印证七星神剑，两代先天紫气冲霄映彻终南`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "天罡演剑坛 · 紫阳真人以青竹杖印证七星神剑，两代先天紫气冲霄映彻终南" from 《玄门正统 · 紫阳掌教》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 588. `CG-QST-588`：重阳主殿 · 全真七子与百余道众稽首见证，王重楼亲授紫阳掌教玉印

- **关联文件**：[`src/data/quests/sects/zhongnanEndingZiyangMasterQuest.ts`](../src/data/quests/sects/zhongnanEndingZiyangMasterQuest.ts)
- **目标路径**：`public/assets/quests/zn_q36_seal_bestow.jpg`
- **画框题跋**：`重阳主殿 · 全真七子与百余道众稽首见证，王重楼亲授紫阳掌教玉印`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "重阳主殿 · 全真七子与百余道众稽首见证，王重楼亲授紫阳掌教玉印" from 《玄门正统 · 紫阳掌教》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 589. `CG-QST-589`：终南山门外 · 王重楼芒鞋竹杖踏云远游，背影融入苍翠松海云雾之间

- **关联文件**：[`src/data/quests/sects/zhongnanEndingZiyangMasterQuest.ts`](../src/data/quests/sects/zhongnanEndingZiyangMasterQuest.ts)
- **目标路径**：`public/assets/quests/zn_q36_wandering_cloud.jpg`
- **画框题跋**：`终南山门外 · 王重楼芒鞋竹杖踏云远游，背影融入苍翠松海云雾之间`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "终南山门外 · 王重楼芒鞋竹杖踏云远游，背影融入苍翠松海云雾之间" from 《玄门正统 · 紫阳掌教》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 590. `CG-QST-590`：终南重阳古观 · 紫阳掌教真人立于七星高台，万松朝宗，紫气浩荡护佑关中

- **关联文件**：[`src/data/quests/sects/zhongnanEndingZiyangMasterQuest.ts`](../src/data/quests/sects/zhongnanEndingZiyangMasterQuest.ts)
- **目标路径**：`public/assets/quests/zn_q36_ziyang_master.jpg`
- **画框题跋**：`终南重阳古观 · 紫阳掌教真人立于七星高台，万松朝宗，紫气浩荡护佑关中`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "终南重阳古观 · 紫阳掌教真人立于七星高台，万松朝宗，紫气浩荡护佑关中" from 《玄门正统 · 紫阳掌教》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 591. `CG-QST-591`：寒玉涧临水抚琴榭 · 王重楼与林朝瑶琴箫合鸣，相视含笑吐露携手偕隐天涯之志

- **关联文件**：[`src/data/quests/sects/zhongnanEndingTwinSwordMasterQuest.ts`](../src/data/quests/sects/zhongnanEndingTwinSwordMasterQuest.ts)
- **目标路径**：`public/assets/quests/zn_q37_qin_farewell.jpg`
- **画框题跋**：`寒玉涧临水抚琴榭 · 王重楼与林朝瑶琴箫合鸣，相视含笑吐露携手偕隐天涯之志`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "寒玉涧临水抚琴榭 · 王重楼与林朝瑶琴箫合鸣，相视含笑吐露携手偕隐天涯之志" from 《太乙仙侣 · 双剑共主》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 592. `CG-QST-592`：繁花幽谷双剑合璧坪 · 王重楼与林朝瑶联手试剑，三道剑光卷起漫天花雨化作太极星图

- **关联文件**：[`src/data/quests/sects/zhongnanEndingTwinSwordMasterQuest.ts`](../src/data/quests/sects/zhongnanEndingTwinSwordMasterQuest.ts)
- **目标路径**：`public/assets/quests/zn_q37_dual_test.jpg`
- **画框题跋**：`繁花幽谷双剑合璧坪 · 王重楼与林朝瑶联手试剑，三道剑光卷起漫天花雨化作太极星图`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "繁花幽谷双剑合璧坪 · 王重楼与林朝瑶联手试剑，三道剑光卷起漫天花雨化作太极星图" from 《太乙仙侣 · 双剑共主》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 593. `CG-QST-593`：繁花幽谷双剑合璧坪 · 重阳天罡七星剑与寒玉素心冰魄剑双剑齐鸣，星光霜华交融冲霄

- **关联文件**：[`src/data/quests/sects/zhongnanEndingTwinSwordMasterQuest.ts`](../src/data/quests/sects/zhongnanEndingTwinSwordMasterQuest.ts)
- **目标路径**：`public/assets/quests/zn_q37_sword_reunite.jpg`
- **画框题跋**：`繁花幽谷双剑合璧坪 · 重阳天罡七星剑与寒玉素心冰魄剑双剑齐鸣，星光霜华交融冲霄`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "繁花幽谷双剑合璧坪 · 重阳天罡七星剑与寒玉素心冰魄剑双剑齐鸣，星光霜华交融冲霄" from 《太乙仙侣 · 双剑共主》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 594. `CG-QST-594`：终南云海之间 · 王重楼背琴、林朝瑶执剑，二人携手踏云偕隐，终成太乙仙侣佳话

- **关联文件**：[`src/data/quests/sects/zhongnanEndingTwinSwordMasterQuest.ts`](../src/data/quests/sects/zhongnanEndingTwinSwordMasterQuest.ts)
- **目标路径**：`public/assets/quests/zn_q37_couple_depart.jpg`
- **画框题跋**：`终南云海之间 · 王重楼背琴、林朝瑶执剑，二人携手踏云偕隐，终成太乙仙侣佳话`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "终南云海之间 · 王重楼背琴、林朝瑶执剑，二人携手踏云偕隐，终成太乙仙侣佳话" from 《太乙仙侣 · 双剑共主》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 595. `CG-QST-595`：终南玉虹桥 · 青袍道众与白衣女侠往来论剑，重阳古观与活死人墓永结同心

- **关联文件**：[`src/data/quests/sects/zhongnanEndingTwinSwordMasterQuest.ts`](../src/data/quests/sects/zhongnanEndingTwinSwordMasterQuest.ts)
- **目标路径**：`public/assets/quests/zn_q37_two_branches.jpg`
- **画框题跋**：`终南玉虹桥 · 青袍道众与白衣女侠往来论剑，重阳古观与活死人墓永结同心`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "终南玉虹桥 · 青袍道众与白衣女侠往来论剑，重阳古观与活死人墓永结同心" from 《太乙仙侣 · 双剑共主》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 596. `CG-QST-596`：终南绝顶 · 双剑共主身负七星与冰魄双剑俯瞰云海，终南两仪总宗威震天下

- **关联文件**：[`src/data/quests/sects/zhongnanEndingTwinSwordMasterQuest.ts`](../src/data/quests/sects/zhongnanEndingTwinSwordMasterQuest.ts)
- **目标路径**：`public/assets/quests/zn_q37_twinsword_master.jpg`
- **画框题跋**：`终南绝顶 · 双剑共主身负七星与冰魄双剑俯瞰云海，终南两仪总宗威震天下`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "终南绝顶 · 双剑共主身负七星与冰魄双剑俯瞰云海，终南两仪总宗威震天下" from 《太乙仙侣 · 双剑共主》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 597. `CG-QST-597`：活死人墓前厅 · 西夏一品堂死士引爆九幽雷火剧毒，紫黑毒焰吞噬青石甬道

- **关联文件**：[`src/data/quests/sects/zhongnanEndingAnranTombMasterQuest.ts`](../src/data/quests/sects/zhongnanEndingAnranTombMasterQuest.ts)
- **目标路径**：`public/assets/quests/zn_q38_thunder_ambush.jpg`
- **画框题跋**：`活死人墓前厅 · 西夏一品堂死士引爆九幽雷火剧毒，紫黑毒焰吞噬青石甬道`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "活死人墓前厅 · 西夏一品堂死士引爆九幽雷火剧毒，紫黑毒焰吞噬青石甬道" from 《断龙绝响 · 黯然孤鸿》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 598. `CG-QST-598`：活死人墓石门 · 万斤断龙石轰然坠地，隔绝漫天九幽毒焰，震彻终南幽谷

- **关联文件**：[`src/data/quests/sects/zhongnanEndingAnranTombMasterQuest.ts`](../src/data/quests/sects/zhongnanEndingAnranTombMasterQuest.ts)
- **目标路径**：`public/assets/quests/zn_q38_dragon_stone.jpg`
- **画框题跋**：`活死人墓石门 · 万斤断龙石轰然坠地，隔绝漫天九幽毒焰，震彻终南幽谷`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "活死人墓石门 · 万斤断龙石轰然坠地，隔绝漫天九幽毒焰，震彻终南幽谷" from 《断龙绝响 · 黯然孤鸿》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 599. `CG-QST-599`：昆仑寒玉石室 · 冷清秋冰封玄冰石棺沉眠待醒，林朝瑶负伤远引，独留孤影守墓

- **关联文件**：[`src/data/quests/sects/zhongnanEndingAnranTombMasterQuest.ts`](../src/data/quests/sects/zhongnanEndingAnranTombMasterQuest.ts)
- **目标路径**：`public/assets/quests/zn_q38_ice_coffin.jpg`
- **画框题跋**：`昆仑寒玉石室 · 冷清秋冰封玄冰石棺沉眠待醒，林朝瑶负伤远引，独留孤影守墓`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "昆仑寒玉石室 · 冷清秋冰封玄冰石棺沉眠待醒，林朝瑶负伤远引，独留孤影守墓" from 《断龙绝响 · 黯然孤鸿》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 600. `CG-QST-600`：银练飞瀑雨夜 · 弃剑仰天长吟江淹《别赋》，至悲至痛间周身掌气令飞瀑倒流

- **关联文件**：[`src/data/quests/sects/zhongnanEndingAnranTombMasterQuest.ts`](../src/data/quests/sects/zhongnanEndingAnranTombMasterQuest.ts)
- **目标路径**：`public/assets/quests/zn_q38_biefu_grief.jpg`
- **画框题跋**：`银练飞瀑雨夜 · 弃剑仰天长吟江淹《别赋》，至悲至痛间周身掌气令飞瀑倒流`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "银练飞瀑雨夜 · 弃剑仰天长吟江淹《别赋》，至悲至痛间周身掌气令飞瀑倒流" from 《断龙绝响 · 黯然孤鸿》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 601. `CG-QST-601`：银练飞瀑 · 天阶《黯然销魂掌》一掌崩崖震退暴雨，一品堂毒火死士尽数伏诛

- **关联文件**：[`src/data/quests/sects/zhongnanEndingAnranTombMasterQuest.ts`](../src/data/quests/sects/zhongnanEndingAnranTombMasterQuest.ts)
- **目标路径**：`public/assets/quests/zn_q38_anran_palm.jpg`
- **画框题跋**：`银练飞瀑 · 天阶《黯然销魂掌》一掌崩崖震退暴雨，一品堂毒火死士尽数伏诛`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "银练飞瀑 · 天阶《黯然销魂掌》一掌崩崖震退暴雨，一品堂毒火死士尽数伏诛" from 《断龙绝响 · 黯然孤鸿》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 602. `CG-QST-602`：终南银练飞瀑 · 黯然孤鸿白衣临渊而立，天阶黯然销魂掌威慑江湖，独守幽谷待故人归

- **关联文件**：[`src/data/quests/sects/zhongnanEndingAnranTombMasterQuest.ts`](../src/data/quests/sects/zhongnanEndingAnranTombMasterQuest.ts)
- **目标路径**：`public/assets/quests/zn_q38_tomb_master.jpg`
- **画框题跋**：`终南银练飞瀑 · 黯然孤鸿白衣临渊而立，天阶黯然销魂掌威慑江湖，独守幽谷待故人归`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "终南银练飞瀑 · 黯然孤鸿白衣临渊而立，天阶黯然销魂掌威慑江湖，独守幽谷待故人归" from 《断龙绝响 · 黯然孤鸿》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 603. `CG-QST-603`：重阳玄门清修主殿 · 婉辞俗务掌门位，举荐马钰玄掌观、冷清秋理墓，超然求道

- **关联文件**：[`src/data/quests/sects/zhongnanEndingTaoistImmortalQuest.ts`](../src/data/quests/sects/zhongnanEndingTaoistImmortalQuest.ts)
- **目标路径**：`public/assets/quests/zn_q39_decline_throne.jpg`
- **画框题跋**：`重阳玄门清修主殿 · 婉辞俗务掌门位，举荐马钰玄掌观、冷清秋理墓，超然求道`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "重阳玄门清修主殿 · 婉辞俗务掌门位，举荐马钰玄掌观、冷清秋理墓，超然求道" from 《坐忘太虚 · 道藏真君》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 604. `CG-QST-604`：银练飞瀑清泉石茗案 · 黄裳与张玄素联袂登临终南，三贤烹茶论道气度超凡

- **关联文件**：[`src/data/quests/sects/zhongnanEndingTaoistImmortalQuest.ts`](../src/data/quests/sects/zhongnanEndingTaoistImmortalQuest.ts)
- **目标路径**：`public/assets/quests/zn_q39_guests_arrive.jpg`
- **画框题跋**：`银练飞瀑清泉石茗案 · 黄裳与张玄素联袂登临终南，三贤烹茶论道气度超凡`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "银练飞瀑清泉石茗案 · 黄裳与张玄素联袂登临终南，三贤烹茶论道气度超凡" from 《坐忘太虚 · 道藏真君》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 605. `CG-QST-605`：清泉石茗案 · 星河倒映飞瀑，你与黄裳、张玄素坐忘论道七昼夜，青石茶痕暗合天道

- **关联文件**：[`src/data/quests/sects/zhongnanEndingTaoistImmortalQuest.ts`](../src/data/quests/sects/zhongnanEndingTaoistImmortalQuest.ts)
- **目标路径**：`public/assets/quests/zn_q39_dao_debate.jpg`
- **画框题跋**：`清泉石茗案 · 星河倒映飞瀑，你与黄裳、张玄素坐忘论道七昼夜，青石茶痕暗合天道`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "清泉石茗案 · 星河倒映飞瀑，你与黄裳、张玄素坐忘论道七昼夜，青石茶痕暗合天道" from 《坐忘太虚 · 道藏真君》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 606. `CG-QST-606`：银练飞瀑晨曦 · 坐忘太虚终悟天人合一，云霞绕身，松鹤自来相伴

- **关联文件**：[`src/data/quests/sects/zhongnanEndingTaoistImmortalQuest.ts`](../src/data/quests/sects/zhongnanEndingTaoistImmortalQuest.ts)
- **目标路径**：`public/assets/quests/zn_q39_void_epiphany.jpg`
- **画框题跋**：`银练飞瀑晨曦 · 坐忘太虚终悟天人合一，云霞绕身，松鹤自来相伴`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "银练飞瀑晨曦 · 坐忘太虚终悟天人合一，云霞绕身，松鹤自来相伴" from 《坐忘太虚 · 道藏真君》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 607. `CG-QST-607`：终南绝顶云海 · 终南太上隐尊独坐松下烹茶，仙鹤绕云，坐忘太虚与天地同游

- **关联文件**：[`src/data/quests/sects/zhongnanEndingTaoistImmortalQuest.ts`](../src/data/quests/sects/zhongnanEndingTaoistImmortalQuest.ts)
- **目标路径**：`public/assets/quests/zn_q39_immortal_recluse.jpg`
- **画框题跋**：`终南绝顶云海 · 终南太上隐尊独坐松下烹茶，仙鹤绕云，坐忘太虚与天地同游`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "终南绝顶云海 · 终南太上隐尊独坐松下烹茶，仙鹤绕云，坐忘太虚与天地同游" from 《坐忘太虚 · 道藏真君》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 608. `CG-QST-608`：秋风卷叶入重阳大殿，西夏密探玄铁令牌陈于案前

- **关联文件**：[`src/data/quests/sects/zhongnanXixiaIceCellarQuest.ts`](../src/data/quests/sects/zhongnanXixiaIceCellarQuest.ts)
- **目标路径**：`public/assets/quests/zn_q40_autumn_dispatch.jpg`
- **画框题跋**：`秋风卷叶入重阳大殿，西夏密探玄铁令牌陈于案前`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "秋风卷叶入重阳大殿，西夏密探玄铁令牌陈于案前" from 《贺兰破冰 · 寒窖问尊》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 609. `CG-QST-609`：长河落日之下，白衣剑客踏沙孤行，遥指贺兰山阙

- **关联文件**：[`src/data/quests/sects/zhongnanXixiaIceCellarQuest.ts`](../src/data/quests/sects/zhongnanXixiaIceCellarQuest.ts)
- **目标路径**：`public/assets/quests/zn_q40_desert_march.jpg`
- **画框题跋**：`长河落日之下，白衣剑客踏沙孤行，遥指贺兰山阙`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "长河落日之下，白衣剑客踏沙孤行，遥指贺兰山阙" from 《贺兰破冰 · 寒窖问尊》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 610. `CG-QST-610`：正午烈日下白衣剑客只身立于一品堂绿琉璃阶前，气贯长虹

- **关联文件**：[`src/data/quests/sects/zhongnanXixiaIceCellarQuest.ts`](../src/data/quests/sects/zhongnanXixiaIceCellarQuest.ts)
- **目标路径**：`public/assets/quests/zn_q40_yipin_gate.jpg`
- **画框题跋**：`正午烈日下白衣剑客只身立于一品堂绿琉璃阶前，气贯长虹`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "正午烈日下白衣剑客只身立于一品堂绿琉璃阶前，气贯长虹" from 《贺兰破冰 · 寒窖问尊》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 611. `CG-QST-611`：一道璀璨青虹冲天而起，西夏一品堂鎏金巨匾应声中分坠落

- **关联文件**：[`src/data/quests/sects/zhongnanXixiaIceCellarQuest.ts`](../src/data/quests/sects/zhongnanXixiaIceCellarQuest.ts)
- **目标路径**：`public/assets/quests/zn_q40_shatter_plaque.jpg`
- **画框题跋**：`一道璀璨青虹冲天而起，西夏一品堂鎏金巨匾应声中分坠落`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "一道璀璨青虹冲天而起，西夏一品堂鎏金巨匾应声中分坠落" from 《贺兰破冰 · 寒窖问尊》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 612. `CG-QST-612`：百丈玄冰铸就地底玉宫，白纱太妃端坐冰莲御座之上

- **关联文件**：[`src/data/quests/sects/zhongnanXixiaIceCellarQuest.ts`](../src/data/quests/sects/zhongnanXixiaIceCellarQuest.ts)
- **目标路径**：`public/assets/quests/zn_q40_ice_cellar_hall.jpg`
- **画框题跋**：`百丈玄冰铸就地底玉宫，白纱太妃端坐冰莲御座之上`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "百丈玄冰铸就地底玉宫，白纱太妃端坐冰莲御座之上" from 《贺兰破冰 · 寒窖问尊》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 613. `CG-QST-613`：白虹掌劲折转如蛇，青锋剑气化圆破极，玄冰碎屑漫天飞舞

- **关联文件**：[`src/data/quests/sects/zhongnanXixiaIceCellarQuest.ts`](../src/data/quests/sects/zhongnanXixiaIceCellarQuest.ts)
- **目标路径**：`public/assets/quests/zn_q40_ice_duel.jpg`
- **画框题跋**：`白虹掌劲折转如蛇，青锋剑气化圆破极，玄冰碎屑漫天飞舞`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "白虹掌劲折转如蛇，青锋剑气化圆破极，玄冰碎屑漫天飞舞" from 《贺兰破冰 · 寒窖问尊》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 614. `CG-QST-614`：至纯剑芒洞穿漫天冰刃，轰然劈裂镇窖万年寒玉柱

- **关联文件**：[`src/data/quests/sects/zhongnanXixiaIceCellarQuest.ts`](../src/data/quests/sects/zhongnanXixiaIceCellarQuest.ts)
- **目标路径**：`public/assets/quests/zn_q40_pillar_cleave.jpg`
- **画框题跋**：`至纯剑芒洞穿漫天冰刃，轰然劈裂镇窖万年寒玉柱`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "至纯剑芒洞穿漫天冰刃，轰然劈裂镇窖万年寒玉柱" from 《贺兰破冰 · 寒窖问尊》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 615. `CG-QST-615`：晨曦铺满秦川古道，孤剑破冰威名已先传遍关洛江湖

- **关联文件**：[`src/data/quests/sects/zhongnanXixiaIceCellarQuest.ts`](../src/data/quests/sects/zhongnanXixiaIceCellarQuest.ts)
- **目标路径**：`public/assets/quests/zn_q40_return_dawn.jpg`
- **画框题跋**：`晨曦铺满秦川古道，孤剑破冰威名已先传遍关洛江湖`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "晨曦铺满秦川古道，孤剑破冰威名已先传遍关洛江湖" from 《贺兰破冰 · 寒窖问尊》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 616. `CG-QST-616`：云海翻涌太乙峰，终南群道共贺贺兰破冰凯旋

- **关联文件**：[`src/data/quests/sects/zhongnanXixiaIceCellarQuest.ts`](../src/data/quests/sects/zhongnanXixiaIceCellarQuest.ts)
- **目标路径**：`public/assets/quests/zn_q40_zhongnan_peace.jpg`
- **画框题跋**：`云海翻涌太乙峰，终南群道共贺贺兰破冰凯旋`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "云海翻涌太乙峰，终南群道共贺贺兰破冰凯旋" from 《贺兰破冰 · 寒窖问尊》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 617. `CG-QST-617`：重阳佳节云海漫卷太乙峰，银练飞瀑旁松风煮茗迎四海高人

- **关联文件**：[`src/data/quests/sects/zhongnanTaiyiSummitQuest.ts`](../src/data/quests/sects/zhongnanTaiyiSummitQuest.ts)
- **目标路径**：`public/assets/quests/zn_q41_chongyang_clouds.jpg`
- **画框题跋**：`重阳佳节云海漫卷太乙峰，银练飞瀑旁松风煮茗迎四海高人`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "重阳佳节云海漫卷太乙峰，银练飞瀑旁松风煮茗迎四海高人" from 《云深不知 · 太乙论道》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 618. `CG-QST-618`：黄裳执盏作证，冯默岚、鸠摩智、慕容博三大绝顶宗师齐聚寒玉涧

- **关联文件**：[`src/data/quests/sects/zhongnanTaiyiSummitQuest.ts`](../src/data/quests/sects/zhongnanTaiyiSummitQuest.ts)
- **目标路径**：`public/assets/quests/zn_q41_masters_gather.jpg`
- **画框题跋**：`黄裳执盏作证，冯默岚、鸠摩智、慕容博三大绝顶宗师齐聚寒玉涧`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "黄裳执盏作证，冯默岚、鸠摩智、慕容博三大绝顶宗师齐聚寒玉涧" from 《云深不知 · 太乙论道》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 619. `CG-QST-619`：碧玉箫影与终南青锋交错繁花之间，桂雨纷飞如画

- **关联文件**：[`src/data/quests/sects/zhongnanTaiyiSummitQuest.ts`](../src/data/quests/sects/zhongnanTaiyiSummitQuest.ts)
- **目标路径**：`public/assets/quests/zn_q41_duel_feng.jpg`
- **画框题跋**：`碧玉箫影与终南青锋交错繁花之间，桂雨纷飞如画`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "碧玉箫影与终南青锋交错繁花之间，桂雨纷飞如画" from 《云深不知 · 太乙论道》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 620. `CG-QST-620`：赤金火焰刀罡漫卷剑坪，青霜剑芒如银练断火，水火激荡轰鸣

- **关联文件**：[`src/data/quests/sects/zhongnanTaiyiSummitQuest.ts`](../src/data/quests/sects/zhongnanTaiyiSummitQuest.ts)
- **目标路径**：`public/assets/quests/zn_q41_duel_jiumozhi.jpg`
- **画框题跋**：`赤金火焰刀罡漫卷剑坪，青霜剑芒如银练断火，水火激荡轰鸣`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "赤金火焰刀罡漫卷剑坪，青霜剑芒如银练断火，水火激荡轰鸣" from 《云深不知 · 太乙论道》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 621. `CG-QST-621`：斗转星移气旋撕裂云雾，太乙剑意空灵无迹，直透潜龙中宫

- **关联文件**：[`src/data/quests/sects/zhongnanTaiyiSummitQuest.ts`](../src/data/quests/sects/zhongnanTaiyiSummitQuest.ts)
- **目标路径**：`public/assets/quests/zn_q41_duel_murong.jpg`
- **画框题跋**：`斗转星移气旋撕裂云雾，太乙剑意空灵无迹，直透潜龙中宫`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "斗转星移气旋撕裂云雾，太乙剑意空灵无迹，直透潜龙中宫" from 《云深不知 · 太乙论道》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 622. `CG-QST-622`：三战连胜四海宗师，终南群道欢呼震谷，漫山红叶随风起舞

- **关联文件**：[`src/data/quests/sects/zhongnanTaiyiSummitQuest.ts`](../src/data/quests/sects/zhongnanTaiyiSummitQuest.ts)
- **目标路径**：`public/assets/quests/zn_q41_victory_ovation.jpg`
- **画框题跋**：`三战连胜四海宗师，终南群道欢呼震谷，漫山红叶随风起舞`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "三战连胜四海宗师，终南群道欢呼震谷，漫山红叶随风起舞" from 《云深不知 · 太乙论道》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 623. `CG-QST-623`：银练飞瀑之下，黄裳与四海宗师举盏共饮重阳松茗

- **关联文件**：[`src/data/quests/sects/zhongnanTaiyiSummitQuest.ts`](../src/data/quests/sects/zhongnanTaiyiSummitQuest.ts)
- **目标路径**：`public/assets/quests/zn_q41_waterfall_tea.jpg`
- **画框题跋**：`银练飞瀑之下，黄裳与四海宗师举盏共饮重阳松茗`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "银练飞瀑之下，黄裳与四海宗师举盏共饮重阳松茗" from 《云深不知 · 太乙论道》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 624. `CG-QST-624`：明月悬照终南太乙峰，白衣剑尊独立飞瀑绝顶，俯瞰千里秦川

- **关联文件**：[`src/data/quests/sects/zhongnanTaiyiSummitQuest.ts`](../src/data/quests/sects/zhongnanTaiyiSummitQuest.ts)
- **目标路径**：`public/assets/quests/zn_q41_taiyi_apotheosis.jpg`
- **画框题跋**：`明月悬照终南太乙峰，白衣剑尊独立飞瀑绝顶，俯瞰千里秦川`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "明月悬照终南太乙峰，白衣剑尊独立飞瀑绝顶，俯瞰千里秦川" from 《云深不知 · 太乙论道》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 625. `CG-QST-625`：太乙云深松风万里，终南隐宗超然封神，传奇永载史册

- **关联文件**：[`src/data/quests/sects/zhongnanTaiyiSummitQuest.ts`](../src/data/quests/sects/zhongnanTaiyiSummitQuest.ts)
- **目标路径**：`public/assets/quests/zn_q41_eternal_pine.jpg`
- **画框题跋**：`太乙云深松风万里，终南隐宗超然封神，传奇永载史册`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "太乙云深松风万里，终南隐宗超然封神，传奇永载史册" from 《云深不知 · 太乙论道》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 626. `CG-QST-626`：山谷百花盛放，玉蜂嗡嗡绕木箱飞舞，清甜花蜜香气四溢

- **关联文件**：[`src/data/quests/sects/zhongnanSideJadeBeeHoneyQuest.ts`](../src/data/quests/sects/zhongnanSideJadeBeeHoneyQuest.ts)
- **目标路径**：`public/assets/quests/zn_side01_bee_garden.jpg`
- **画框题跋**：`山谷百花盛放，玉蜂嗡嗡绕木箱飞舞，清甜花蜜香气四溢`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "山谷百花盛放，玉蜂嗡嗡绕木箱飞舞，清甜花蜜香气四溢" from 《玉蜂百花 · 清芬酿蜜记》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 627. `CG-QST-627`：暮色幽谷中烟雾弥漫，白衣弟子飞身截住手持熏烟竹筒的偷蜂药贩

- **关联文件**：[`src/data/quests/sects/zhongnanSideJadeBeeHoneyQuest.ts`](../src/data/quests/sects/zhongnanSideJadeBeeHoneyQuest.ts)
- **目标路径**：`public/assets/quests/zn_side01_thief_ambush.jpg`
- **画框题跋**：`暮色幽谷中烟雾弥漫，白衣弟子飞身截住手持熏烟竹筒的偷蜂药贩`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "暮色幽谷中烟雾弥漫，白衣弟子飞身截住手持熏烟竹筒的偷蜂药贩" from 《玉蜂百花 · 清芬酿蜜记》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 628. `CG-QST-628`：古槐之下青衿环坐，张载坐拥虎皮高座论易讲学，气象轩昂

- **关联文件**：[`src/data/quests/sects/zhongnanSideHengquScholarQuest.ts`](../src/data/quests/sects/zhongnanSideHengquScholarQuest.ts)
- **目标路径**：`public/assets/quests/zn_side02_hengqu_lecture.jpg`
- **画框题跋**：`古槐之下青衿环坐，张载坐拥虎皮高座论易讲学，气象轩昂`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "古槐之下青衿环坐，张载坐拥虎皮高座论易讲学，气象轩昂" from 《横渠问剑 · 立心立命录》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 629. `CG-QST-629`：长安府衙飞檐之上，白衣终南剑客与徐弘毅夹击怀揣古籍的盗书贼

- **关联文件**：[`src/data/quests/sects/zhongnanSideHengquScholarQuest.ts`](../src/data/quests/sects/zhongnanSideHengquScholarQuest.ts)
- **目标路径**：`public/assets/quests/zn_side02_roof_chase.jpg`
- **画框题跋**：`长安府衙飞檐之上，白衣终南剑客与徐弘毅夹击怀揣古籍的盗书贼`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "长安府衙飞檐之上，白衣终南剑客与徐弘毅夹击怀揣古籍的盗书贼" from 《横渠问剑 · 立心立命录》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 630. `CG-QST-630`：紫金丹院青烟缭绕，林勇虎与谭涛俯身查验生出暗纹的旧香炉

- **关联文件**：[`src/data/quests/sects/zhongnanSideYaowareFurnaceQuest.ts`](../src/data/quests/sects/zhongnanSideYaowareFurnaceQuest.ts)
- **目标路径**：`public/assets/quests/zn_side03_alchemy_furnace.jpg`
- **画框题跋**：`紫金丹院青烟缭绕，林勇虎与谭涛俯身查验生出暗纹的旧香炉`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "紫金丹院青烟缭绕，林勇虎与谭涛俯身查验生出暗纹的旧香炉" from 《紫金丹火 · 耀州博山炉》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 631. `CG-QST-631`：终南山口松影森森，渭北悍匪挥刀拦道，白衣弟子背匣拔剑护珍炉

- **关联文件**：[`src/data/quests/sects/zhongnanSideYaowareFurnaceQuest.ts`](../src/data/quests/sects/zhongnanSideYaowareFurnaceQuest.ts)
- **目标路径**：`public/assets/quests/zn_side03_bandit_ambush.jpg`
- **画框题跋**：`终南山口松影森森，渭北悍匪挥刀拦道，白衣弟子背匣拔剑护珍炉`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "终南山口松影森森，渭北悍匪挥刀拦道，白衣弟子背匣拔剑护珍炉" from 《紫金丹火 · 耀州博山炉》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 632. `CG-QST-632`：大雁塔青砖碑廊之下，刘敞俯首辨识先秦石鼓拓本，古意盎然

- **关联文件**：[`src/data/quests/sects/zhongnanSideDayantaSteleQuest.ts`](../src/data/quests/sects/zhongnanSideDayantaSteleQuest.ts)
- **目标路径**：`public/assets/quests/zn_side04_dayanta_stele.jpg`
- **画框题跋**：`大雁塔青砖碑廊之下，刘敞俯首辨识先秦石鼓拓本，古意盎然`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "大雁塔青砖碑廊之下，刘敞俯首辨识先秦石鼓拓本，古意盎然" from 《雁塔题名 · 先秦石鼓考》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 633. `CG-QST-633`：大雁塔回廊墨砚飞溅，终南弟子与谭婉翠联手截杀现形的大辽细作

- **关联文件**：[`src/data/quests/sects/zhongnanSideDayantaSteleQuest.ts`](../src/data/quests/sects/zhongnanSideDayantaSteleQuest.ts)
- **目标路径**：`public/assets/quests/zn_side04_spy_duel.jpg`
- **画框题跋**：`大雁塔回廊墨砚飞溅，终南弟子与谭婉翠联手截杀现形的大辽细作`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "大雁塔回廊墨砚飞溅，终南弟子与谭婉翠联手截杀现形的大辽细作" from 《雁塔题名 · 先秦石鼓考》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 634. `CG-QST-634`：西市胡栈外围满商旅，波斯商队首领焦急指着残留诡异紫烟的窗棂

- **关联文件**：[`src/data/quests/sects/zhongnanSidePersianMerchantQuest.ts`](../src/data/quests/sects/zhongnanSidePersianMerchantQuest.ts)
- **目标路径**：`public/assets/quests/zn_side05_xishi_case.jpg`
- **画框题跋**：`西市胡栈外围满商旅，波斯商队首领焦急指着残留诡异紫烟的窗棂`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "西市胡栈外围满商旅，波斯商队首领焦急指着残留诡异紫烟的窗棂" from 《西市迷香 · 波斯胡商案》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 635. `CG-QST-635`：阴暗酒窖磷火幽幽，终南白衣剑客一脚踹开木门，独战星宿二贼

- **关联文件**：[`src/data/quests/sects/zhongnanSidePersianMerchantQuest.ts`](../src/data/quests/sects/zhongnanSidePersianMerchantQuest.ts)
- **目标路径**：`public/assets/quests/zn_side05_cellar_fight.jpg`
- **画框题跋**：`阴暗酒窖磷火幽幽，终南白衣剑客一脚踹开木门，独战星宿二贼`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "阴暗酒窖磷火幽幽，终南白衣剑客一脚踹开木门，独战星宿二贼" from 《西市迷香 · 波斯胡商案》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 636. `CG-QST-636`：太白积雪素裹银装，老樵夫雪松下挥刀劈柴，木屑纷飞暗合自然大道

- **关联文件**：[`src/data/quests/sects/zhongnanSideWoodcutterDaoQuest.ts`](../src/data/quests/sects/zhongnanSideWoodcutterDaoQuest.ts)
- **目标路径**：`public/assets/quests/zn_side06_snow_woodcutter.jpg`
- **画框题跋**：`太白积雪素裹银装，老樵夫雪松下挥刀劈柴，木屑纷飞暗合自然大道`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "太白积雪素裹银装，老樵夫雪松下挥刀劈柴，木屑纷飞暗合自然大道" from 《太白积雪 · 樵夫劈柴意》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 637. `CG-QST-637`：风雪寒夜茅庐前，终南弟子迎战双目泛绿的太白雪狼王与狼群

- **关联文件**：[`src/data/quests/sects/zhongnanSideWoodcutterDaoQuest.ts`](../src/data/quests/sects/zhongnanSideWoodcutterDaoQuest.ts)
- **目标路径**：`public/assets/quests/zn_side06_wolf_pack.jpg`
- **画框题跋**：`风雪寒夜茅庐前，终南弟子迎战双目泛绿的太白雪狼王与狼群`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "风雪寒夜茅庐前，终南弟子迎战双目泛绿的太白雪狼王与狼群" from 《太白积雪 · 樵夫劈柴意》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 638. `CG-QST-638`：秋林草堂竹篱之前，负伤的华山女侠紧捂鎏金剑帖，终南弟子挺身扶救

- **关联文件**：[`src/data/quests/sects/zhongnanSideHuashanEnvoyQuest.ts`](../src/data/quests/sects/zhongnanSideHuashanEnvoyQuest.ts)
- **目标路径**：`public/assets/quests/zn_side07_caotang_rescue.jpg`
- **画框题跋**：`秋林草堂竹篱之前，负伤的华山女侠紧捂鎏金剑帖，终南弟子挺身扶救`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "秋林草堂竹篱之前，负伤的华山女侠紧捂鎏金剑帖，终南弟子挺身扶救" from 《秦晋同盟 · 西岳送剑帖》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 639. `CG-QST-639`：潼关雄城烽火之下，终南弟子与梁惊风并肩迎战挥舞双斧的绿林悍匪

- **关联文件**：[`src/data/quests/sects/zhongnanSideHuashanEnvoyQuest.ts`](../src/data/quests/sects/zhongnanSideHuashanEnvoyQuest.ts)
- **目标路径**：`public/assets/quests/zn_side07_tongguan_clash.jpg`
- **画框题跋**：`潼关雄城烽火之下，终南弟子与梁惊风并肩迎战挥舞双斧的绿林悍匪`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "潼关雄城烽火之下，终南弟子与梁惊风并肩迎战挥舞双斧的绿林悍匪" from 《秦晋同盟 · 西岳送剑帖》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 640. `CG-QST-640`：腊月雪霁松梅映瀑，终南诸老围坐石案煮雪烹茗，抚琴清歌

- **关联文件**：[`src/data/quests/sects/zhongnanSideColdStreamTeaQuest.ts`](../src/data/quests/sects/zhongnanSideColdStreamTeaQuest.ts)
- **目标路径**：`public/assets/quests/zn_side08_winter_tea.jpg`
- **画框题跋**：`腊月雪霁松梅映瀑，终南诸老围坐石案煮雪烹茗，抚琴清歌`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "腊月雪霁松梅映瀑，终南诸老围坐石案煮雪烹茗，抚琴清歌" from 《寒涧松茗 · 岁寒三友会》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```

---

### 641. `CG-QST-641`：飞瀑白雪之间，终南弟子与桃花岛曲松璋以剑印琴，招式清雅飘逸

- **关联文件**：[`src/data/quests/sects/zhongnanSideColdStreamTeaQuest.ts`](../src/data/quests/sects/zhongnanSideColdStreamTeaQuest.ts)
- **目标路径**：`public/assets/quests/zn_side08_qin_sword_spar.jpg`
- **画框题跋**：`飞瀑白雪之间，终南弟子与桃花岛曲松璋以剑印琴，招式清雅飘逸`
- **推荐 `generate_image` Prompt（16:9）**：
  ```text
  Traditional Northern Song dynasty Chinese gongbi blue-and-green ink-and-color epic wuxia illustration, wide cinematic 16:9 composition around 1050 AD in Northern Song China (Mount Zhongnan Chongyang Taoist Temple / Ancient Tomb Jade Valley / Chang'an / Qinling / Northwest Frontier). Depicting scene "飞瀑白雪之间，终南弟子与桃花岛曲松璋以剑印琴，招式清雅飘逸" from 《寒涧松茗 · 岁寒三友会》. Authentic Northern Song Taoist architecture, misty Qinling peaks, jade stream or snowbound frontier wuxia atmosphere, mineral pigments (azurite, malachite, cinnabar, ink wash), strictly zero text, calligraphy, or pseudo-Chinese characters anywhere in the image.
  ```
