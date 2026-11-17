import type { QuestDefinition } from '../../../types/quest'
import { atStep, qStatus, openScene } from '../../../engine/quest/dsl'

export const JINJUN_TAIHANG_QUEST_2_ID = 'QST-SECT-33-TAIHANG-CAMPAIGN-2'

const CAMPAIGN_1_QUEST_ID = 'QST-SECT-33-TAIHANG-CAMPAIGN-1'

export const JINJUN_TAIHANG_CAMPAIGN_2_QUEST: QuestDefinition = {
  id: JINJUN_TAIHANG_QUEST_2_ID,
  title: '刮目相看 · 武经破寨',
  category: 'sect_mission',
  factionId: 'SECT-33',
  regionId: 'bianliang',
  recommendedRealm: '二流中品 ~ 一流下品',
  maxOpponentRealm: '一流下品',
  recommendedNote:
    '大宋禁军太行剿匪三部曲第二卷（全长四十幕）。需完成首卷满 60 日，并在剧情中修满【经义 ≥ 40】且【策论 ≥ 70】方能通过王德用沙盘考校挂帅再征。',
  startHint:
    '完成太行首征惨败任务满 60 日、身居大宋禁军 Lv.3 以上时，前往【开封府 · 八十万禁军大教场 · 擂鼓聚将点兵帅台】拜见枢密使王德用触发。',
  startLocation: {
    regionId: 'bianliang',
    buildingId: 'bl_jinjun',
    spotId: 'bl_jj_platform',
    customLabel: '开封府 · 八十万禁军大教场 · 擂鼓聚将点兵帅台',
  },
  startCondition: {
    type: 'all',
    conditions: [
      { type: 'inSect', sectId: 'SECT-33', minRank: 3 },
      {
        type: 'questCompletedDaysAgoAtLeast',
        questId: CAMPAIGN_1_QUEST_ID,
        minDays: 60,
      },
      qStatus(JINJUN_TAIHANG_QUEST_2_ID, 'not_started'),
      qStatus(JINJUN_TAIHANG_QUEST_2_ID, 'not_completed'),
    ],
  },
  summary:
    '黑风峡折戟六十日后，枢密使“黑王相公”王德用于点兵帅台煮茶相召，以东吴吕蒙“吴下阿蒙、士别三日刮目相待”之典殷切劝勉，亲赐手批《武经总要 · 枢密院行军钞本》。待潜心苦读修成【经义 ≥ 40、策论 ≥ 70】并通过沙盘三策考校，王德用于紫宸殿执笏押印力保、包拯公言佐证，奉官家圣旨统兵五千再征太行：先断水熏烟破苍狼前寨，次于鹰愁岭围点打援拔黑风中寨，复夜袭封渠夺取太行藏金义仓、活捉数百悍匪及十名中层头目，终在飞狐断魂索桥重创史万山，将王重岳不足三百残部困锁绝崖，凯旋东京市曹十斩慰忠魂！',
  initialStepId: 'study_wujing',
  steps: {
    study_wujing: {
      id: 'study_wujing',
      title: '研读武经 · 砥砺经策',
      objective:
        '已获赐枢密使王德用亲批《武经总要 · 枢密院行军钞本》！请于行囊【典籍书画】展卷研读，并修习十艺使【经义 ≥ 40】且【策论 ≥ 70】，达标后返回【开封府 · 八十万禁军大教场 · 擂鼓聚将点兵帅台】向王德用请受沙盘三策考校。',
      nextHint:
        '硬性门槛：需同时满足【经义 ≥ 40 且 策论 ≥ 70】（可在行囊使用《武经总要 · 枢密院行军钞本》直增策论+15、经义+8，辅以书院研习或书卷攻读），达标后与王德用交互点击「呈禀经策心得 · 请受沙盘考校」。',
      targetLocation: {
        regionId: 'bianliang',
        buildingId: 'bl_jinjun',
        spotId: 'bl_jj_platform',
        customLabel: '开封府 · 八十万禁军大教场 · 擂鼓聚将点兵帅台',
      },
      prereqCondition: {
        type: 'all',
        conditions: [
          { type: 'skillAtLeast', key: '经义', min: 40 },
          { type: 'skillAtLeast', key: '策论', min: 70 },
        ],
      },
    },
    campaign_fort_one: {
      id: 'campaign_fort_one',
      title: '再征太行 · 断水拔前寨',
      objective:
        '已通过沙盘三策考校，蒙王德用金殿执笏力保，奉官家圣旨统领五千禁军再征太行！请率军赶赴【太行山绿林总寨 · 聚义忠义大堂 · 古碑烽燧台】，依《武经总要》审水断泉、顺风熏烟，智破【苍狼前寨】并生擒雷武石、焦弘彪。',
      nextHint:
        '前往太行山【聚义忠义大堂 · 古碑烽燧台】（th_hall_west），点击「依武经断水熏烟 · 智破苍狼前寨」。',
      targetLocation: {
        regionId: 'taihang',
        buildingId: 'th_hall',
        spotId: 'th_hall_west',
        customLabel: '太行山绿林总寨 · 聚义忠义大堂 · 古碑烽燧台',
      },
    },
    campaign_ambush_relief: {
      id: 'campaign_ambush_relief',
      title: '黑风雪耻 · 围点打援',
      objective:
        '首战零亡拔下苍狼前寨！请率军推进至旧战场旁的【太行山绿林总寨 · 聚义忠义大堂 · 瓮城屯兵校场】，正面示缓诱敌、暗伏鹰愁岭脊道“围点打援”，截擒总堂援将秦寒岳与燕刀柏，一举瓦解【黑风中寨】！',
      nextHint:
        '前往太行山【聚义忠义大堂 · 瓮城屯兵校场】（th_hall_east），点击「黑风峡反设伏袋 · 围点打援拔中寨」。',
      targetLocation: {
        regionId: 'taihang',
        buildingId: 'th_hall',
        spotId: 'th_hall_east',
        customLabel: '太行山绿林总寨 · 聚义忠义大堂 · 瓮城屯兵校场',
      },
    },
    campaign_seize_vault: {
      id: 'campaign_seize_vault',
      title: '奇袭义仓 · 瓮中起赃',
      objective:
        '外围三连寨尽拔，连擒八名头目！请趁夜衔枚疾趋【太行山绿林总寨 · 太行藏金义仓 · 绝壁石刻·剑痕崖】，先封后山暗渠再赚开外壕吊桥，击败史玄朗与申屠霖，生擒大批悍匪并起获满库赃银粮草！',
      nextHint:
        '前往太行山【太行藏金义仓 · 绝壁石刻·剑痕崖】（th_vault_east），点击「赚壕封道破义仓 · 生擒群匪起赃银」。',
      targetLocation: {
        regionId: 'taihang',
        buildingId: 'th_vault',
        spotId: 'th_vault_east',
        customLabel: '太行山绿林总寨 · 太行藏金义仓 · 绝壁石刻·剑痕崖',
      },
    },
    campaign_feihu_approach: {
      id: 'campaign_feihu_approach',
      title: '兵临断魂 · 重创狂龙',
      objective:
        '藏金义仓既陷，太行群匪土崩瓦解！请挥师西进【太行山绿林总寨 · 飞狐断魂索桥 · 千帆栈桥·装卸埠】，正面击败断后的副总瓢把子“九纹狂龙”史万山，将王重岳不足三百残部彻底逼困绝崖！',
      nextHint:
        '前往太行山【飞狐断魂索桥 · 千帆栈桥·装卸埠】（th_bridge_east），点击「进逼飞狐断魂桥 · 痛击断后史万山」。',
      targetLocation: {
        regionId: 'taihang',
        buildingId: 'th_bridge',
        spotId: 'th_bridge_east',
        customLabel: '太行山绿林总寨 · 飞狐断魂索桥 · 千帆栈桥·装卸埠',
      },
    },
    return_kaifeng_triumph: {
      id: 'return_kaifeng_triumph',
      title: '锁山班师 · 献俘开封',
      objective:
        '已重创史万山，将王重岳不足三百残寇困锁于飞狐断魂索桥西崖，并筑起六座石碉封死山口！请押解十名太行中层头目、六百降卒与满载赃银粮车凯旋【开封府 · 开封府衙（六扇门） · 开封府升堂正殿】，会同包拯与王德用三司会审、市曹十斩慰忠魂！',
      nextHint:
        '返回开封府【开封府衙 · 开封府升堂正殿】（bl_kf_court），点击「献俘开封府正堂 · 会审十匪慰忠魂」。',
      targetLocation: {
        regionId: 'bianliang',
        buildingId: 'bl_kaifengfu',
        spotId: 'bl_kf_court',
        customLabel: '开封府 · 开封府衙（六扇门） · 开封府升堂正殿',
      },
    },
  },
  npcActions: [
    {
      id: 'act_jtc2_start',
      label: '奉召登台 · 聆黑王相公训勉（《刮目相看》）',
      badge: '太行二征',
      tone: 'gold',
      showInBottomBar: true,
      showInSectPanel: true,
      visibleWhen: {
        type: 'all',
        conditions: [
          { type: 'targetNpcMatch', npcIds: ['NPC-0038'] },
          { type: 'inSect', sectId: 'SECT-33', minRank: 3 },
          {
            type: 'questCompletedDaysAgoAtLeast',
            questId: CAMPAIGN_1_QUEST_ID,
            minDays: 60,
          },
          qStatus(JINJUN_TAIHANG_QUEST_2_ID, 'not_started'),
          qStatus(JINJUN_TAIHANG_QUEST_2_ID, 'not_completed'),
        ],
      },
      effects: [openScene('scene_jtc2_01_sixty_days_humility', 'QST-SECT-33-TAIHANG-CAMPAIGN-2')],
    },
    {
      id: 'act_jtc2_report_scholarship',
      label: '呈禀经策心得 · 请受沙盘考校',
      badge: '刮目相看',
      tone: 'gold',
      showInBottomBar: true,
      showInSectPanel: true,
      visibleWhen: {
        type: 'all',
        conditions: [
          { type: 'targetNpcMatch', npcIds: ['NPC-0038'] },
          atStep(JINJUN_TAIHANG_QUEST_2_ID, 'study_wujing'),
          { type: 'skillAtLeast', key: '经义', min: 40 },
          { type: 'skillAtLeast', key: '策论', min: 70 },
        ],
      },
      effects: [openScene('scene_jtc2_08_return_to_platform', 'QST-SECT-33-TAIHANG-CAMPAIGN-2')],
    },
    {
      id: 'act_jtc2_scholarship_progress_hint',
      label: '请受沙盘考校（需经义≥40 且 策论≥70）',
      badge: '苦读未满',
      tone: 'default',
      showInBottomBar: true,
      showInSectPanel: false,
      visibleWhen: {
        type: 'all',
        conditions: [
          { type: 'targetNpcMatch', npcIds: ['NPC-0038'] },
          atStep(JINJUN_TAIHANG_QUEST_2_ID, 'study_wujing'),
          {
            type: 'not',
            condition: {
              type: 'all',
              conditions: [
                { type: 'skillAtLeast', key: '经义', min: 40 },
                { type: 'skillAtLeast', key: '策论', min: 70 },
              ],
            },
          },
        ],
      },
      enabledWhen: {
        type: 'all',
        conditions: [
          { type: 'skillAtLeast', key: '经义', min: 40 },
          { type: 'skillAtLeast', key: '策论', min: 70 },
        ],
      },
      effects: [],
    },
    {
      id: 'act_jtc2_kaifeng_triumph',
      label: '献俘开封府正堂 · 会审十匪慰忠魂',
      badge: '二征凯旋',
      tone: 'gold',
      showInBottomBar: true,
      showInSectPanel: false,
      visibleWhen: {
        type: 'all',
        conditions: [
          { type: 'targetNpcMatch', npcIds: ['NPC-0013', 'NPC-0140', 'NPC-0038'] },
          atStep(JINJUN_TAIHANG_QUEST_2_ID, 'return_kaifeng_triumph'),
        ],
      },
      effects: [openScene('scene_jtc2_35_bianliang_triumphant_entry', 'QST-SECT-33-TAIHANG-CAMPAIGN-2')],
    },
  ],
  spotActions: [
    {
      id: 'spot_jtc2_start',
      label: '奉召登点兵帅台 · 拜见枢密使王德用',
      badge: '太行二征 · 第1-7幕',
      subtitle: '黑风峡败归满六十日 · 聆“吴下阿蒙”劝学典故，获赐《武经总要 · 枢密院行军钞本》',
      tone: 'gold',
      regionId: 'bianliang',
      buildingId: 'bl_jinjun',
      spotId: 'bl_jj_platform',
      visibleWhen: {
        type: 'all',
        conditions: [
          { type: 'inSect', sectId: 'SECT-33', minRank: 3 },
          {
            type: 'questCompletedDaysAgoAtLeast',
            questId: CAMPAIGN_1_QUEST_ID,
            minDays: 60,
          },
          qStatus(JINJUN_TAIHANG_QUEST_2_ID, 'not_started'),
          qStatus(JINJUN_TAIHANG_QUEST_2_ID, 'not_completed'),
        ],
      },
      effects: [openScene('scene_jtc2_01_sixty_days_humility', 'QST-SECT-33-TAIHANG-CAMPAIGN-2')],
    },
    {
      id: 'spot_jtc2_report_scholarship',
      label: '呈禀经策心得 · 请受沙盘三策考校',
      badge: '第8-15幕',
      subtitle: '已达成【经义 ≥ 40 且 策论 ≥ 70】 · 沙盘破三问，随黑王相公赴紫宸殿请命再征太行',
      tone: 'gold',
      regionId: 'bianliang',
      buildingId: 'bl_jinjun',
      spotId: 'bl_jj_platform',
      visibleWhen: {
        type: 'all',
        conditions: [
          atStep(JINJUN_TAIHANG_QUEST_2_ID, 'study_wujing'),
          { type: 'skillAtLeast', key: '经义', min: 40 },
          { type: 'skillAtLeast', key: '策论', min: 70 },
        ],
      },
      effects: [openScene('scene_jtc2_08_return_to_platform', 'QST-SECT-33-TAIHANG-CAMPAIGN-2')],
    },
    {
      id: 'spot_jtc2_scholarship_progress_hint',
      label: '请受沙盘考校（需经义≥40 且 策论≥70）',
      badge: '研读武经中',
      subtitle: '请先于行囊研读《武经总要 · 枢密院行军钞本》并修习经史策论达标后再来应考',
      tone: 'default',
      regionId: 'bianliang',
      buildingId: 'bl_jinjun',
      spotId: 'bl_jj_platform',
      visibleWhen: {
        type: 'all',
        conditions: [
          atStep(JINJUN_TAIHANG_QUEST_2_ID, 'study_wujing'),
          {
            type: 'not',
            condition: {
              type: 'all',
              conditions: [
                { type: 'skillAtLeast', key: '经义', min: 40 },
                { type: 'skillAtLeast', key: '策论', min: 70 },
              ],
            },
          },
        ],
      },
      enabledWhen: {
        type: 'all',
        conditions: [
          { type: 'skillAtLeast', key: '经义', min: 40 },
          { type: 'skillAtLeast', key: '策论', min: 70 },
        ],
      },
      effects: [],
    },
    {
      id: 'spot_jtc2_fort_one',
      label: '依武经断水熏烟 · 智破苍狼前寨',
      badge: '第16-19幕 · 第一战',
      subtitle: '寻北麓暗泉断水熏烟，布鹿角口袋阵生擒落雁枪·雷武石与黑风豹·焦弘彪',
      tone: 'danger',
      regionId: 'taihang',
      buildingId: 'th_hall',
      spotId: 'th_hall_west',
      visibleWhen: atStep(JINJUN_TAIHANG_QUEST_2_ID, 'campaign_fort_one'),
      effects: [openScene('scene_jtc2_16_recon_canglang_fort', 'QST-SECT-33-TAIHANG-CAMPAIGN-2')],
    },
    {
      id: 'spot_jtc2_ambush_relief',
      label: '黑风峡反设伏袋 · 围点打援拔中寨',
      badge: '第20-24幕 · 第二战',
      subtitle: '重临黑风旧谷祭英魂，鹰愁岭反伏击生擒冷月刀·秦寒岳与铁掌汉·燕刀柏，连拔三寨',
      tone: 'danger',
      regionId: 'taihang',
      buildingId: 'th_hall',
      spotId: 'th_hall_east',
      visibleWhen: atStep(JINJUN_TAIHANG_QUEST_2_ID, 'campaign_ambush_relief'),
      effects: [openScene('scene_jtc2_20_return_black_wind', 'QST-SECT-33-TAIHANG-CAMPAIGN-2')],
    },
    {
      id: 'spot_jtc2_seize_vault',
      label: '赚壕封道破义仓 · 生擒群匪起赃银',
      badge: '第25-29幕 · 第三战',
      subtitle: '铁网封锁后山三条暗渠，诈号赚桥击败银枪叟·史玄朗与透骨针·申屠霖，缴获满库粮银',
      tone: 'danger',
      regionId: 'taihang',
      buildingId: 'th_vault',
      spotId: 'th_vault_east',
      visibleWhen: atStep(JINJUN_TAIHANG_QUEST_2_ID, 'campaign_seize_vault'),
      effects: [openScene('scene_jtc2_25_approach_hidden_vault', 'QST-SECT-33-TAIHANG-CAMPAIGN-2')],
    },
    {
      id: 'spot_jtc2_feihu_approach',
      label: '进逼飞狐断魂桥 · 痛击断后史万山',
      badge: '第30-34幕 · 第四战',
      subtitle: '东桥头重创“九纹狂龙”史万山，将王重岳不足三百残部困锁绝崖，筑碉班师',
      tone: 'danger',
      regionId: 'taihang',
      buildingId: 'th_bridge',
      spotId: 'th_bridge_east',
      visibleWhen: atStep(JINJUN_TAIHANG_QUEST_2_ID, 'campaign_feihu_approach'),
      effects: [openScene('scene_jtc2_30_pursuit_to_feihu_bridge', 'QST-SECT-33-TAIHANG-CAMPAIGN-2')],
    },
    {
      id: 'spot_jtc2_kaifeng_triumph',
      label: '献俘开封府正堂 · 会审十匪慰忠魂',
      badge: '第35-40幕 · 终章',
      subtitle: '三口铜铡会审太行十名头目，发还商银优恤遗孤，东京市曹午时十斩明正典刑',
      tone: 'jade',
      regionId: 'bianliang',
      buildingId: 'bl_kaifengfu',
      spotId: 'bl_kf_court',
      visibleWhen: atStep(JINJUN_TAIHANG_QUEST_2_ID, 'return_kaifeng_triumph'),
      effects: [openScene('scene_jtc2_35_bianliang_triumphant_entry', 'QST-SECT-33-TAIHANG-CAMPAIGN-2')],
    },
  ],
  loadScenes: () => import('./jinjunTaihangQuest2.scenes').then((m) => m.SCENES),
}

export const JINJUN_TAIHANG_QUEST_2: QuestDefinition[] = [JINJUN_TAIHANG_CAMPAIGN_2_QUEST]
