import type { NodeNpc } from '../../../types/game'
import type { QuestEffect, StorySceneDef } from '../../../types/quest'
import { N, P, S, flag, setStep, toast, openScene, makeQuestNpc } from '../../../engine/quest/dsl'
import { QUEST_ID } from './changshanLonglingQuest'

function buildHorseMarketSpyGuardNpc(): NodeNpc {
  return makeQuestNpc({
    id: 'CUSTOM-CS-HORSE-SPY',
    name: '燕京马市暗桩护卫',
    title: '北院巡栏刀手',
    realm: '三流下品',
    factionId: 'SECT-31',
    factionName: '辽国暗桩',
    avatarUrl: '/assets/characters/templates/tpl_khitan_warrior_fb.jpg',
    portraitUrl: '/assets/characters/templates/tpl_khitan_warrior_fb.jpg',
    stats: { hp: 260, mp: 120, agi: 38, res: 12 },
    talents: { bone: 45, comprehension: 32, charm: 28 },
    fullLocationLabel: '析津府 > 燕京榷马大市 > 塞北千驷相马围栏',
    equippedArts: { neigong: 'MA-232', qinggong: 'MA-197', move1: 'MA-189' },
    learnedArts: [{ artId: 'MA-232', level: 1 }, { artId: 'MA-197', level: 1 }, { artId: 'MA-189', level: 2 }],
    equipped: { weapon: 'WPN-076', armor: 'ARM-045', shoes: 'BOT-022', bow: 'BOW-023', accessory1: 'ACC-045', accessory2: 'ACC-043', mount: 'MNT-021' },
    questBadgeLabel: '巡栏暗桩',
    talk: '“休叫南朝奸细跑出千驷围栏！”',
  })
}

function buildIronForestCenturionNpc(): NodeNpc {
  return makeQuestNpc({
    id: 'CUSTOM-CS-CENTURION',
    name: '辽军铁林百夫长',
    title: '大辽北院精锐铁骑',
    realm: '二流下品',
    factionId: 'ORG-06',
    factionName: '契丹铁林军',
    avatarUrl: '/assets/characters/templates/tpl_khitan_warrior_fb.jpg',
    portraitUrl: '/assets/characters/templates/tpl_khitan_warrior_fb.jpg',
    stats: { hp: 1050, mp: 620, agi: 58, res: 32 },
    talents: { bone: 68, comprehension: 48, charm: 35 },
    fullLocationLabel: '雁门关 > 雁门关外乱石绝壁',
    equippedArts: { neigong: 'MA-243', qinggong: 'MA-246', move1: 'MA-152', move2: 'MA-151' },
    learnedArts: [{ artId: 'MA-243', level: 4 }, { artId: 'MA-246', level: 3 }, { artId: 'MA-152', level: 4 }, { artId: 'MA-151', level: 4 }],
    equipped: { weapon: 'WPN-047', armor: 'ARM-025', shoes: 'BOT-012', bow: 'BOW-012', accessory1: 'ACC-023', accessory2: 'ACC-026', mount: 'MNT-013' },
    questBadgeLabel: '铁林截杀',
    talk: '“绝壁在前，尔等南蛮插翅难飞！留下性命来！”',
  })
}

const MINZHONG_AFTER_EFFECTS: QuestEffect[] = [
  setStep(QUEST_ID, 'marshal_burn_map'),
  toast('已取得《南牧山川策》副本！下一步潜入【辽南京兵马元帅府】焚毁正本。', 'success', '白沟寒星'),
]

const CLIFF_WIN_A_EFFECTS: QuestEffect[] = [
  { type: 'addArtExp', amount: 1800 },
  { type: 'giveCombatExp', amount: 80, reason: '雁门绝壁斩百夫长断后' },
  { type: 'modifyRenown', delta: 20, reason: '雁门关外退敌保图' },
  { type: 'modifyChivalry', delta: 50, reason: '孤身断后护送密图' },
  { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0036' }, delta: 15 },
  { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0635' }, delta: 20 },
  setStep(QUEST_ID, 'guanyin_burn_names'),
  openScene('scene_cs_cliff_win_a', 'QST-SECT-22-LONGLING'),
]

const CLIFF_WIN_B_EFFECTS: QuestEffect[] = [
  { type: 'addArtExp', amount: 2600 },
  { type: 'giveCombatExp', amount: 120, reason: '雁门绝壁死守萧远风四合' },
  { type: 'modifyRenown', delta: 20, reason: '绝壁力撼辽将萧远风' },
  { type: 'modifyChivalry', delta: 100, reason: '背水死战全员护送燕云遗老' },
  { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0185' }, delta: 25 },
  { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0036' }, delta: 20 },
  { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0635' }, delta: 25 },
  setStep(QUEST_ID, 'guanyin_burn_names'),
  openScene('scene_cs_cliff_win_b', 'QST-SECT-22-LONGLING'),
]

const INLINE_SCENE_01_scene_cs_longling_opening: StorySceneDef = {
      id: 'scene_cs_longling_opening',
      title: '第一幕 · 龙胆血书',
      subtitle: '真定府 · 常山演武堂 > 常山龙胆枪脉宗祠正堂',
      illustrationUrl: '/assets/quests/changshan_blood_letter.jpg',
      illustrationCaption: '真定常山龙胆宗祠 · 冬夜寒雨验悯忠寺铜牌与南牧血书',
      beats: [
        N('皇祐二年的冬末，真定府夜雨寒冽，砸在常山演武堂的青瓦上发出密匝匝的冷响。山门早早落了双闩，唯有宗祠正堂内两盏牛油巨烛摇曳着昏黄的光影，将赵顺平侯牌位照得肃穆森严。'),
        N('掌门赵括苍按剑端坐太师椅，面色沉凝如铁；左侧立着真定路边军都监郭逵，玄甲未卸，肩头还沾着未干的雨珠；右侧则是演武首座凌寒，手中托着一块紫檀木盘。'),
        S('NPC-0345', '“师弟且看。今日午后，我在宋辽边境榷场扣下一匹走私契丹骏马。马贩子嘴硬，我却从他那副双层驼革马鞍的夹层里，拆出这枚幽州悯忠寺铜牌——还有这半张浸透干血的麻布。”'),
        N('凌寒揭开油纸，铜牌背面刻着唐代悯忠寺的莲花暗纹，麻布上八个字铁画银钩，却因写字之人指力衰竭而末尾拖出一道长长的血痕：「南牧图成，速毁于燕。」'),
        S('NPC-0036', '“不瞒你与赵掌门，定州与真定府的细作营早有耳目报称：辽南京武林统制萧远风近两年遍访燕云山川、暗中测绘我河北塘泺水网与真定府城防虚实，已绘成一卷《南牧山川策》。”'),
        S('NPC-0036', '“秋高马肥之日，辽骑若按此图南下直扑白沟河，真定与河朔数州危矣！只是朝廷尚守澶渊旧盟，官军一卒不可北渡拒马河。此事须得由江湖人乔装潜入析津府，赶在秋前将正本焚毁！”'),
        S('NPC-0185', '“你入我常山内堂以来，昼夜苦练龙胆枪意，筋骨已堪大任。今夜便由你接下这枚【悯忠寺血迹铜牌】，随郭都监先赴真定府都部署衙密见韩琦韩安抚使。”'),
        S('NPC-0185', '“切记！出得真定北门，你我再无师徒名分。此行不得暴露大宋官身，亦不可亮常山枪派旗号——白沟寒星之下，万事唯『无名』二字！”'),
      ],
      onFinishEffects: [
        {
          type: 'startQuest',
          questId: QUEST_ID,
          stepId: 'meet_hanqi',
        },
        { type: 'giveItem', itemId: 'ITM-MSC-010', qty: 1 },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0185' }, delta: 5 },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0345' }, delta: 5 },
        toast('已接取常山枪派内堂传承《白沟寒星·幽州无名卷》，获【悯忠寺血迹铜牌】×1！', 'success', '常山传承'),
      ],
    }

const INLINE_SCENE_02_scene_cs_marshal_escape: StorySceneDef = {
          id: 'scene_cs_marshal_escape',
          title: '烟幕脱身 · 奔赴雁门',
          subtitle: '辽南京兵马元帅府外',
          illustrationUrl: '/assets/quests/changshan_marshal_smoke_escape.jpg',
          illustrationCaption: '辽南京兵马元帅府 · 焚毁南牧山川策正本借霹雳烟幕突围',
          beats: [
            N('四合硬撼，你的虎口已被震裂，鲜血顺着枪杆滴落青砖，而萧远风的镔铁长枪却愈发沉重如山。正值危殆之际，元帅府东侧马厩轰然炸起冲天火柱！'),
            N('窗棂破响，三枚裹着硫磺硝石的霹雳烟幕弹凌空飞入签押房！浓黑刺鼻的烟雾瞬间吞没了烛火与萧远风凌厉的眼神。'),
            S('NPC-0184', '“南蛮鼠辈，竟敢烧我《南牧山川策》正本！传令铁林骑封锁四门——就算追到桑干河、雁门关，本统制也要把你们碎尸万段！”'),
            S('NPC-0036', '（郭逵一把扯住你的臂膀翻出矮墙，牵过两匹早已备好的乌骓快马）“正本已化飞灰，副本在我贴身夹袄里！幽州东门已被封死，随我西折直奔雁门关！”'),
            P('“萧远风枪法如狂澜，绝非寻常辽将……郭都监先走，若他率铁骑追至雁门关外，我们便在乱石绝壁间再分生死！”'),
          ],
          onFinishEffects: [
            setStep(QUEST_ID, 'yanmen_cliff'),
            {
              type: 'teleportPlayer',
              regionId: 'yanmenguan',
              buildingId: 'ym_cliff',
            },
          ],
        }

const INLINE_SCENE_03_scene_cs_cliff_win_a: StorySceneDef = {
      id: 'scene_cs_cliff_win_a',
      title: '绝壁破围 · 银枪映雪',
      subtitle: '雁门关外乱石绝壁',
      beats: [
        N('你孤身立于两块丈余高的风化巨石之间，手中长枪舞成一团银雾，将辽军铁林百夫长与游骑精锐死死挡在狭口之外。寒风卷着雪沫割面如刀，甲衣早已结满冰霜。'),
        N('激战正酣之际，雁门雄关内忽然响起一阵龙吟般的马嘶！关门洞开，一队玄甲银枪骑如怒涛般奔涌而出——正是掌门赵括苍亲率副掌门白烈山与常山精锐杀出关外接应！'),
        S('NPC-0635', '“师侄莫慌，常山弟子在此！契丹狗贼，且尝尝我常山龙胆连环枪！”'),
        N('内外夹击之下，辽军铁林骑阵脚大乱，丢下十余具尸首仓皇北遁。萧远风见大势已去，只得勒马驻足于十里外雪坡，遥遥朝你抱拳冷哼一声，调转马头消失在风雪之中。'),
        S('NPC-0185', '“干得好！郭都监已携《南牧山川策》副本与南院暗桩名录安全入关。此地不宜久留，我等立刻拔营南返真定府，赴隆兴大佛寺向韩安抚使复命！”'),
      ],
    }

const INLINE_SCENE_04_scene_cs_cliff_win_b: StorySceneDef = {
      id: 'scene_cs_cliff_win_b',
      title: '义字当头 · 独撑四合',
      subtitle: '雁门关外乱石绝壁 > 镇边李牧武安君祠',
      beats: [
        N('百余名须发皆白的幽州遗老相互搀扶着，深一脚浅一脚地在齐膝积雪中向李牧祠挪动。盲眼老僧将那卷《南牧山川策》副本死死抱在怀里，一步三回头。'),
        N('而你独自一人横枪立在绝壁窄口，面对盛怒追至的萧远风与辽军铁林百夫长！每一次铁枪相交都似炸响惊雷，虎口鲜血顺着冻僵的腕骨凝成冰柱，你却如生根磐石般一步不退！'),
        S('NPC-0184', '“好一个狂徒！为了这群百年遗老，竟敢以残躯硬撼我辽南京铁枪四合而不倒——你究竟是赵氏哪一脉的传人？”'),
        P('“无名小卒，大宋常山一枪客罢了！背后是百年不改汉家衣冠的父老，今日便是死，也不教胡骑跨过这半步！”'),
        N('就在第四合枪尖将将抵住你咽喉的刹那，最后一名白发老者终于踉跄跨入镇边李牧武安君祠门槛！关内杀声震天，赵括苍与白烈山率常山精锐怒马冲出，生生将萧远风逼退三丈！'),
        S('NPC-0185', '（赵括苍勒马扶住摇摇欲坠的你，眼眶微红）“好一个常山义士！今日你不仅保住了燕云密报，更保住了百余名不肯剃发易服的汉家遗老！这等骨气，足令天下英雄汗颜！”'),
      ],
    }

const INLINE_SCENE_05_scene_cs_hanqi_bold_reply: StorySceneDef = {
                        id: 'scene_cs_hanqi_bold_reply',
                        title: '无名赴义 · 韩琦赠银',
                        subtitle: '真定府都部署衙',
                        beats: [
                          S('NPC-0011', '“好一个『常山弟子岂惜此身』！昔年赵子龙单骑救主，今日你孤身入燕——取我私库五十两散碎纹银作盘缠，切记不可用官银锭！”'),
                          S('NPC-0036', '“安抚使放心，末将已备好定州马贩的文书与两匹塞外骒马。明日五更出北门，直奔析津府燕京榷马大市！”'),
                        ],
                      }

const INLINE_SCENE_06_scene_cs_hanqi_pragmatic_reply: StorySceneDef = {
                        id: 'scene_cs_hanqi_pragmatic_reply',
                        title: '沉稳受命 · 密议北行',
                        subtitle: '真定府都部署衙',
                        beats: [
                          S('NPC-0011', '“不骄不躁，深明朝堂权衡之道。有你在郭都监身侧谋划，本帅亦能少悬半颗心。这五十两私库散银你且收下。”'),
                          S('NPC-0036', '“好！临机应变最重冷静，我等乔装马商北上析津府，第一步便是闯过燕京榷马大市的辽人盘查！”'),
                        ],
                      }

const INLINE_SCENE_07_scene_cs_hanqi_briefing: StorySceneDef = {
              id: 'scene_cs_hanqi_briefing',
              title: '节点 1-3 · 密见韩琦',
              subtitle: '真定府都部署衙',
              beats: [
                N('真定府都部署衙后堂屏退了所有亲随与书吏，唯余案头一卷摊开的《河北塘泺舆图》与半盏冷茶。韩琦身着青衫常服，眉宇间却透着经略西北、镇抚河朔的铁血威仪。'),
                N('他接过你呈上的【悯忠寺血迹铜牌】，指腹在「南牧图成，速毁于燕」八字上缓缓摩挲良久，方才抬眼望向你与郭逵。'),
                S('NPC-0011', '“景德元年澶渊定盟，至今四十六载，朝野方得休养生息。此盟不可轻破——纵使明知萧远风在幽州磨刀霍霍，大宋官军亦绝不可先越白沟河半步。”'),
                S('NPC-0011', '“故而本帅有言在先：此去析津府焚毁《南牧山川策》，若能成功，功劳簿上不会有你的名字；若不幸事败被擒，朝廷与真定府皆不会认账，只会依律以『私越边关流寇』论处！你可还敢往？”'),
              ],
              choices: [
                {
                  id: 'choice_hanqi_bold',
                  label: '【忠胆表态】顺平侯当年一身是胆，常山弟子岂惜此身？晚辈愿往！',
                  subLabel: '韩琦好感 +10、郭逵好感 +5、纹银 +50 两、江湖侠义 +20',
                  tone: 'primary',
                  effects: [
                    { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0011' }, delta: 10 },
                    { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0036' }, delta: 5 },
                    { type: 'giveSilver', amount: 50, reason: '韩琦私库盘缠' },
                    { type: 'modifyChivalry', delta: 20, reason: '常山忠胆赴燕云' },
                    setStep(QUEST_ID, 'yanjing_horse_market'),
                    openScene('scene_cs_hanqi_bold_reply', 'QST-SECT-22-LONGLING'),
                  ],
                },
                {
                  id: 'choice_hanqi_pragmatic',
                  label: '【沉稳务实】既为守土安民，功名何足挂齿。请安抚使示下。',
                  subLabel: '韩琦好感 +5、郭逵好感 +10、纹银 +50 两、策论 +3、江湖声望 +15',
                  tone: 'jade',
                  effects: [
                    { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0011' }, delta: 5 },
                    { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0036' }, delta: 10 },
                    { type: 'giveSilver', amount: 50, reason: '韩琦私库盘缠' },
                    { type: 'modifySkill', key: '策论', delta: 3 },
                    { type: 'modifyRenown', delta: 15, reason: '沉稳受命定州幕府' },
                    setStep(QUEST_ID, 'yanjing_horse_market'),
                    openScene('scene_cs_hanqi_pragmatic_reply', 'QST-SECT-22-LONGLING'),
                  ],
                },
              ],
            }

const INLINE_SCENE_08_scene_cs_qinqian_secret: StorySceneDef = {
              id: 'scene_cs_qinqian_secret',
              title: '节点 2-2 · 义勇拳馆暗桩',
              subtitle: '析津府 · 燕云遗民义勇拳馆',
              beats: [
                N('拳馆后院木桩林立，几个汉家少年正在寒风中默默扎马练拳。你扣响门环三长两短，低声吐出沧州八极门暗语：「铁锁横江，白沟饮马。」'),
                S('NPC-0642', '（秦乾手腕一抖，将手中齐眉短棍收于身后，眼神瞬间锐利如鹰，旋即化作久别重逢的激昂）“真是从真定来的同道！我在这幽州城潜伏八年，还以为关内早已忘了咱们！”'),
                S('NPC-0642', '“萧远风的兵马元帅府戒备森严，三步一暗哨。这是我这半年冒死摸清的【幽州夜禁换防图】，子时三刻东侧角门换防有一炷香的空档——拿着它，务必把那张害人的南牧图烧成灰！”'),
              ],
            }

const INLINE_SCENE_09_scene_cs_market_audit_win: StorySceneDef = {
                  id: 'scene_cs_market_audit_win',
                  title: '节点 1-2 · 榷场查账',
                  subtitle: '真定府 · 宋辽边境榷场 > 榷场平准司衡算官署',
                  beats: [
                    N('衡算官署内堆满了厚如砖块的契丹马市流水账册。凌寒将扣下的那批私马票据摊在案上，与你逐行对核草料损耗与税银折算。'),
                    P('“凌师兄且看这七笔『北庭青骡』的税脚——骡价不过八贯，这账上的回扣却按战马二十贯折算！这行暗码正是幽燕马市暗桩的接洽印记！”'),
                    S('NPC-0345', '“好眼力！果然从那马贩子暗格里搜出这枚【幽燕马市通行暗记】。带去析津府，过辽人马市盘查时能省去好大一番口舌！”'),
                  ],
                }

const INLINE_SCENE_10_scene_cs_market_audit_fail: StorySceneDef = {
                  id: 'scene_cs_market_audit_fail',
                  title: '节点 1-2 · 账海难寻',
                  subtitle: '真定府 · 宋辽边境榷场 > 榷场平准司衡算官署',
                  beats: [
                    N('案上契丹文与汉文夹杂的流水账册密密麻麻，虚实难辨。你与凌寒翻检半个时辰，终因算术火候尚浅未能理出暗账头绪。'),
                    S('NPC-0345', '“罢了，既然查不出暗记，北上燕京马市时便只能靠你的口才、相马真本事或是手中长枪硬闯了！万事小心。”'),
                  ],
                }

const INLINE_SCENE_11_scene_cs_horse_bluff_win: StorySceneDef = {
                            id: 'scene_cs_horse_bluff_win',
                            title: '机变周旋 · 混入幽州',
                            subtitle: '析津府 · 燕京榷马大市',
                            beats: [
                              P('“官爷好眼力，却看岔了行当！这叫『白沟剪耳青』，专给南院贵人拉车用的。您瞧这马蹄铁的七星钉——不信您去问东角牙行的老胡！”'),
                              S('NPC-0767', '（完颜鹏豪半信半疑地打量你一番，见你行话纯熟、神色丝毫不乱，终究摆了摆手）“滚进去吧！安分卖完马就走，别在燕京城里乱晃！”'),
                              S('NPC-0036', '（待辽卒走远，郭逵低声赞道）“好险，若非你镇定周旋，咱们此刻已在围栏里动刀了。趁夜色前往幽州悯忠寺！”'),
                            ],
                          }

const INLINE_SCENE_12_scene_cs_horse_combat_win: StorySceneDef = {
                                id: 'scene_cs_horse_combat_win',
                                title: '雷霆灭口 · 隐入夜色',
                                subtitle: '析津府 · 燕京榷马大市',
                                beats: [
                                  N('行话露了破绽，完颜鹏豪眼神骤寒，伸手便往怀里掏骨哨！千钧一发之际，你肩头一抖震散草料捆，长枪短柄如毒龙出洞，与郭逵刀枪合击，抢在他吹哨前将完颜鹏豪与护卫劈翻在草料垛后，连半声惊呼都未曾漏出围栏！'),
                                  S('NPC-0036', '“手脚利落！把尸首拖进马槽盖上干草，这三十五两契丹碎银权作盘缠。趁巡城游骑未至，速赴幽州悯忠寺！”'),
                                ],
                              }

const INLINE_SCENE_13_scene_cs_horse_force_win: StorySceneDef = {
                            id: 'scene_cs_horse_force_win',
                            title: '围栏血战 · 夺路而去',
                            subtitle: '析津府 · 燕京榷马大市',
                            beats: [
                              N('不等完颜鹏豪拔刀，你已暴喝一声挑飞草料担，长枪连刺三朵寒星！郭逵亦同时掣出腰间短刀横截退路，两人左右合击，转瞬便将完颜鹏豪与暗桩护卫格杀于千驷围栏的阴影之中，马群受惊嘶鸣恰好掩盖了兵刃交击之声！'),
                              S('NPC-0036', '“将腰牌与碎银搜走！此地血腥气很快会引来辽军巡骑，不可久留，走西角小巷直赴悯忠寺！”'),
                            ],
                          }

const INLINE_SCENE_14_scene_cs_horse_market: StorySceneDef = {
              id: 'scene_cs_horse_market',
              title: '节点 2-1 · 燕京马市盘查',
              subtitle: '析津府 · 燕京榷马大市 > 塞北千驷相马围栏',
              beats: [
                N('幽州城西的燕京榷马大市人声鼎沸，千余匹来自阴山、松漠的战马在木栅栏内嘶鸣刨蹄，驼铃声与契丹牧人的呼喝混杂在凛冽的北风里。大市四周箭楼高耸，辽南京留守司的游骑每隔半刻便纵马巡行一遭。郭逵压低毡帽、披着一件油渍斑斑的羊皮袄牵着两匹骒马在前，你扮作伙计挑着马料担紧随其后，长枪早已拆成三段暗藏在草料捆中。'),
                N('刚入千驷相马围栏，一队佩刀辽卒忽然横矛拦住去路。为首的辽国暗桩完颜鹏豪身着半旧皮甲，鹰目如电地扫过马群，手中牛皮马鞭直指你牵着的枣红骒马，冷笑一声逼近半步。'),
                S('NPC-0767', '“慢着！这批骒马的牙口与烙印不对劲——河北官马才会剪去左耳一寸！你们两个定州口音的马贩到底从哪条道摸进燕京的？把路引、牙行票据和马籍勘合统统拿出来！”'),
                S('NPC-0036', '（郭逵不动声色地将手按在腰间马刀柄上，压低嗓音向你递了个眼色）“看你了：若能凭行话与马市暗记骗过这厮最好；若露了马脚，便趁巡骑未至，就在草料垛后干脆利落做了他们！”'),
              ],
              choices: [
                {
                  id: 'choice_horse_bluff',
                  label: '【智取伪装】按北庭马市行话对答周旋',
                  subLabel: '需 骑术 ≥ 50 或 辩才 ≥ 50（持【幽燕马市通行暗记】降至 ≥ 35）',
                  tone: 'jade',
                  effects: [
                    {
                      type: 'branch',
                      condition: {
                        type: 'any',
                        conditions: [
                          {
                            type: 'all',
                            conditions: [
                              { type: 'hasItem', itemId: 'ITM-MSC-011' },
                              {
                                type: 'any',
                                conditions: [
                                  { type: 'skillAtLeast', key: '骑术', min: 35 },
                                  { type: 'skillAtLeast', key: '辩才', min: 35 },
                                ],
                              },
                            ],
                          },
                          { type: 'skillAtLeast', key: '骑术', min: 50 },
                          { type: 'skillAtLeast', key: '辩才', min: 50 },
                        ],
                      },
                      thenEffects: [
                        {
                          type: 'branch',
                          condition: { type: 'skillAtLeast', key: '骑术', min: 35 },
                          thenEffects: [{ type: 'modifySkill', key: '骑术', delta: 3 }],
                          elseEffects: [{ type: 'modifySkill', key: '辩才', delta: 3 }],
                        },
                        { type: 'addArtExp', amount: 350 },
                        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0036' }, delta: 5 },
                        setStep(QUEST_ID, 'minzhong_temple'),
                        openScene('scene_cs_horse_bluff_win', 'QST-SECT-22-LONGLING'),
                      ],
                      elseEffects: [
                        {
                          type: 'startCombat',
                          questId: QUEST_ID,
                          allies: [
  {
    kind: 'npc',
    npcId: 'NPC-0036',
    talkOverride: '“速战速决，莫教他吹响骨哨惊动巡城铁骑！”',
  },
],
opponent: {
  kind: 'npc',
  npcId: 'NPC-0767',
  talkOverride: '“这两个马贩口音透着定州味儿，身上倒还藏着铁器！拿下问个明白！”',
},
                          extraOpponents: [{ kind: 'custom', npc: buildHorseMarketSpyGuardNpc() }],
                          rule: 'duel',
                          deathTitle: '血染燕京马市',
                          deathDetail: '应对盘查失露破绽，与郭逵在燕京马市死战辽国暗桩力竭阵亡。',
                          introText:
                            '【2v2 马市雷霆灭口】行话露了破绽！完颜鹏豪与马市巡栏护卫同时拔刀，郭逵掣刀跃至你身侧并肩迎敌！',
                          onWin: [
                            { type: 'addArtExp', amount: 600 },
                            { type: 'giveCombatExp', amount: 40, reason: '格杀燕京马市暗桩' },
                            { type: 'giveSilver', amount: 35, reason: '缴获辽暗桩银两' },
                            setStep(QUEST_ID, 'minzhong_temple'),
                            openScene('scene_cs_horse_combat_win', 'QST-SECT-22-LONGLING'),
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  id: 'choice_horse_force',
                  label: '【2v2 强闯灭口】趁夜色未合，与郭都监联手先下手劈翻暗桩！',
                  subLabel: '2v2 生死战（战败身死）：联手郭逵迎战完颜鹏豪 + 暗桩护卫 · 胜得熟练度 +600、战斗经验 +40、纹银 +35 两',
                  tone: 'danger',
                  effects: [
                    {
                      type: 'startCombat',
                      questId: QUEST_ID,
                      allies: [
  {
    kind: 'npc',
    npcId: 'NPC-0036',
    talkOverride: '“速战速决，莫教他吹响骨哨惊动巡城铁骑！”',
  },
],
opponent: {
  kind: 'npc',
  npcId: 'NPC-0767',
  talkOverride: '“这两个马贩口音透着定州味儿，身上倒还藏着铁器！拿下问个明白！”',
},
                      extraOpponents: [{ kind: 'custom', npc: buildHorseMarketSpyGuardNpc() }],
                      rule: 'duel',
                      deathTitle: '血染燕京马市',
                      deathDetail: '强闯燕京马市暗桩失手，喋血塞北围栏。',
                      introText:
                        '【2v2 马市强闯灭口】不等完颜鹏豪拔刀，你挑飞草料担暴起发难，郭逵同时掣刀封死围栏退路，与完颜鹏豪及暗桩护卫展开生死搏杀！',
                      onWin: [
                        { type: 'addArtExp', amount: 600 },
                        { type: 'giveCombatExp', amount: 40, reason: '格杀燕京马市暗桩' },
                        { type: 'giveSilver', amount: 35, reason: '缴获辽暗桩银两' },
                        setStep(QUEST_ID, 'minzhong_temple'),
                        openScene('scene_cs_horse_force_win', 'QST-SECT-22-LONGLING'),
                      ],
                    },
                  ],
                },
              ],
            }

const INLINE_SCENE_15_scene_cs_minzhong_vow_reply: StorySceneDef = {
                        id: 'scene_cs_minzhong_vow_reply',
                        title: '古刹授佩 · 龙胆不绝',
                        subtitle: '析津府 · 幽州悯忠寺',
                        beats: [
                          S({ name: '悯忠寺盲眼老僧', title: '燕云遗老' }, '“好一句『只要常山枪不断，燕云终有归日』！这枚【燕云遗老护身玉佩】随老朽半生，今夜赠予少侠挡灾避邪——去吧，把元帅府那张《南牧山川策》烧成飞灰！”'),
                          S('NPC-0036', '“诸位老丈暂且隐蔽佛龛之后。子时已近，我先赴元帅府东侧马厩备好火油与霹雳烟幕弹，你趁乱潜入签押房！”'),
                        ],
                      }

const INLINE_SCENE_16_scene_cs_minzhong_escort_reply: StorySceneDef = {
                        id: 'scene_cs_minzhong_escort_reply',
                        title: '义诺千金 · 暗约西行',
                        subtitle: '析津府 · 幽州悯忠寺',
                        beats: [
                          S({ name: '悯忠寺盲眼老僧', title: '燕云遗老' }, '（盲眼老僧长叹一声，却挺直了脊梁）“少侠肯以实言相告，老朽便知你不是虚言欺世之辈！既如此，我等百余名遗老今晚便收拾行装，若幽州事泄，定于西门外白沟古道候你！”'),
                          S('NPC-0036', '“带百余老弱突围绝非易事，但既已应承，我郭逵也绝不皱眉！走，先去辽南京兵马元帅府烧了正本！”'),
                        ],
                      }

const INLINE_SCENE_17_scene_cs_minzhong_elders: StorySceneDef = {
              id: 'scene_cs_minzhong_elders',
              title: '节点 2-3 · 幽州悯忠寺',
              subtitle: '析津府 · 幽州悯忠寺',
              beats: [
                N('千年古刹幽州悯忠寺静卧于寒月之下，唐碑残碣在风中肃立。偏殿掩门之内，十余位须发皆白、却依然身着宽袍大袖汉家旧服的燕云遗老正围炉低语。'),
                N('见你怀中亮出【悯忠寺血迹铜牌】，稳稳行出一记「常山持枪礼」，殿中诸老齐齐起身回礼。为首一位双目失明的老僧颤巍巍走近，伸出布满老茧的手轻轻抚过你的枪杆。'),
                S({ name: '悯忠寺盲眼老僧', title: '燕云遗老' }, '“百余年了……自石晋割让燕云十六州，这幽州城里便再未见过真定常山的正统枪礼！那日送出铜牌的义士已遭萧远风毒手，临终前托我将这卷冒死誊抄的《南牧山川策》副本与南院暗桩名录交予你们。”'),
                S({ name: '悯忠寺盲眼老僧', title: '燕云遗老' }, '“只是正本仍锁在辽南京兵马元帅府签押房内！若不将正本焚毁，秋后辽军照样南下。但在你们动身之前……老朽代幽州十万不肯忘本的汉家父老问少侠一句：”'),
                S({ name: '悯忠寺盲眼老僧', title: '燕云遗老' }, '“大宋官家的王师铁骑……究竟何时，才能再过桑干河啊？”'),
              ],
              choices: [
                {
                  id: 'choice_minzhong_vow',
                  label: '【立誓承志】只要常山枪不断，燕云终有归日！',
                  subLabel: '侠义 +30、武学熟练度 +300、获【燕云遗老护身玉佩】（抗性 +5）',
                  tone: 'gold',
                  effects: [
                    { type: 'modifyChivalry', delta: 30, reason: '悯忠寺立誓承志' },
                    { type: 'addArtExp', amount: 300 },
                    { type: 'giveItem', itemId: 'ITM-ACC-001', qty: 1 },
                    ...MINZHONG_AFTER_EFFECTS,
                    openScene('scene_cs_minzhong_vow_reply', 'QST-SECT-22-LONGLING'),
                  ],
                },
                {
                  id: 'choice_minzhong_escort',
                  label: '【实言相告 · 护送义士】朝廷暂守盟约，若事泄晚辈必护诸位老丈杀出幽州！',
                  subLabel: '侠义 +50、郭逵好感 +5（解锁第三幕【路线 B：全员死保】）',
                  tone: 'primary',
                  effects: [
                    { type: 'modifyChivalry', delta: 50, reason: '悯忠寺许诺死保燕云遗老' },
                    { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0036' }, delta: 5 },
                    { type: 'setFlag', flag: 'cs_longling_route_b', value: true },
                    ...MINZHONG_AFTER_EFFECTS,
                    openScene('scene_cs_minzhong_escort_reply', 'QST-SECT-22-LONGLING'),
                  ],
                },
              ],
            }

const INLINE_SCENE_18_scene_cs_cliff_epiphany: StorySceneDef = {
                  id: 'scene_cs_cliff_epiphany',
                  title: '绝壁刻痕 · 枪意通玄',
                  subtitle: '雁门关外乱石绝壁',
                  beats: [
                    N('逃至雁门关外乱石绝壁之下，你偶然抬头，只见十余丈高的青黑石壁上布满了前代边军枪客留下的深深枪痕——横扫如铁画、直刺如悬针，竟与常山龙胆枪脉暗合！'),
                    P('“原来『回马断后』并非死守一隅，而是借石壁回震之力步步换位……我悟了！”'),
                  ],
                }

const INLINE_SCENE_19_scene_cs_cliff_choice: StorySceneDef = {
              id: 'scene_cs_cliff_choice',
              title: '第三幕 · 绝壁银枪',
              subtitle: '雁门关外乱石绝壁',
              illustrationUrl: '/assets/quests/changshan_yanmen_cliff_stand.jpg',
              illustrationCaption: '雁门关外乱石绝壁 · 朔风黄沙横枪死截萧远风铁林追骑',
              beats: [
                N('雁门雄关的烽火台与灰青色关墙已遥遥在望，天际却忽然卷起一阵黄沙！身后山道传出地动山摇般的铁骑轰鸣——辽南京武林统制萧远风亲率辽军铁林精锐连夜狂追五百里，竟在乱石绝壁前的狭口彻底截断了退路！马蹄踏碎积雪，黑压压的铁甲如乌云压顶般涌来。'),
                S('NPC-0184', '“宋狗休走！白沟夜袭之仇，悯忠寺焚书之恨，今日在这雁门乱石坡一并清算！把《南牧山川策》副本交出来，本统制尚可留你们全尸！”'),
                S('NPC-0036', '“前面便是雁门关狭口，关上宋军箭楼已亮起火把！若被铁林骑缠住，密图副本就送不进关内——你快做决断：是斩将夺路护我先行，还是背水死守保住所有幽州遗老！”'),
              ],
              choices: [
                {
                  id: 'choice_cliff_route_a',
                  label: '【路线 A · 速战退敌】护送郭逵带密图入关，我自断后！',
                  subLabel: '生死战（战败殉国）迎战辽军铁林百夫长（二流下品）：胜得熟练度 +1800、战斗经验 +80、侠义 +50',
                  tone: 'primary',
                  effects: [
                    {
                      type: 'startCombat',
                      questId: QUEST_ID,
                      opponent: { kind: 'custom', npc: buildIronForestCenturionNpc() },
                      rule: 'duel',
                      deathTitle: '血战雁门绝壁',
                      deathDetail: '于雁门关外断后力战辽军铁林百夫长，壮烈殉国。',
                      onWin: CLIFF_WIN_A_EFFECTS,
                    },
                  ],
                },
                {
                  id: 'choice_cliff_route_b',
                  label: '【路线 B · 全员死保】背水死战，护送所有幽州遗老撤入李牧祠！',
                  subLabel: '生死断后（战败殉国）：死守半血萧远风 4 回合 · 胜得熟练度 +2600、战斗经验 +120、侠义 +100',
                  tone: 'danger',
                  condition: flag('cs_longling_route_b', 'truthy'),
                  effects: [
                    {
                      type: 'startCombat',
                      questId: QUEST_ID,
                      opponent: {
                        kind: 'npc',
                        npcId: 'NPC-0184',
                        talkOverride:
                          '“好个不肯舍弃幽州流民的常山小子！本帅今日倒要看看，你的枪能不能挡住铁林三百骑！”',
                      },
                      rule: 'survive_rounds',
                      maxRounds: 4,
                      lethalOnLose: true,
                      deathTitle: '血沃李牧祠前',
                      deathDetail:
                        '少侠为护送百余名幽州汉家遗老撤入雁门关，于乱石绝壁孤身死挡辽南京武林统制萧远风，力战殉国。',
                      forbidEscapeReason: '身后百余名幽州遗老尚未入祠，一步不可退！',
                      introText:
                        '【生死断后 · 战败必死】萧远风长途奔袭气息虽疲，铁枪凶威犹在！死守 4 回合护送百余名幽州遗老撤入关内！',
                      onWin: CLIFF_WIN_B_EFFECTS,
                    },
                  ],
                },
              ],
            }

const INLINE_SCENE_20_scene_cs_guanyin_burn: StorySceneDef = {
              id: 'scene_cs_guanyin_burn',
              title: '节点 4-1 · 观音阁焚名',
              subtitle: '真定府 · 隆兴大佛寺 > 大悲千手观音三层宝阁',
              beats: [
                N('真定隆兴寺大悲阁高逾七丈，四十二臂千手铜像垂目俯瞰着暮色中的滹沱河。木梯幽暗，香烟缭绕在宋初营造的斗拱梁枋之间。韩琦独自立在三层回廊的雕花木窗前，手中捧着那份早已泛黄的秘密行动名录，郭逵则按刀守在梯口。'),
                S('NPC-0011', '“自你与郭都监自白沟雪夜动身，至今月余。幽州南牧图已入真定枢密密档，萧远风折损了半数铁林精锐，连辽南京留守司也不得不连夜易防——可这上面的名字，却一个也不能留。”'),
                P('“安抚使的意思是……”'),
                S('NPC-0011', '“皇祐二年的今天，朝廷尚需与契丹维系檀渊旧约，北边万不可因一道密谍折子再起全面刀兵。若这份名录落入主和或政敌手中，便是‘私越边关、挑衅邻邦’的死罪。唯有今日在大悲菩萨面前付之一炬，才能保住你、保住常山枪派，也保住那些幽州遗老的后半生。”'),
                N('韩琦从香案取来铜炉炭火，将那张写满潜入者姓名、代号与接应暗桩的澄心堂纸一角凑近炉口。火舌倏忽舔舐纸缘，墨字在橙红火光中卷曲化灰，随高阁穿堂风散作漫天轻尘。郭逵沉声取出一个沉甸甸的牛皮银囊，推到你面前。'),
                S('NPC-0036', '“二百两定州军府私库纹银，权作修缮兵甲之资。名录虽毁，可白沟寒星之下谁曾流血，我郭逵记在心里，韩公亦已在递呈官家的绝密御批折子上，为你记下头等无名首功！”'),
                S('NPC-0011', '“白沟寒星照无名。去吧，回常山演武堂去——来日无论五台佛门还是殿前禁军，本帅定为你作保！真定城头的风雪，记着你的名字。”'),
              ],
            }

const INLINE_SCENE_21_scene_cs_ancestral_confer: StorySceneDef = {
              id: 'scene_cs_ancestral_confer',
              title: '第四幕 · 龙胆传薪',
              subtitle: '真定府 · 常山演武堂 > 常山龙胆枪脉宗祠正堂',
              illustrationUrl: '/assets/quests/changshan_ancestral_silver_spear.jpg',
              illustrationCaption: '常山演武堂顺平侯祠 · 启紫檀枪匣亲授常山龙胆亮银枪',
              beats: [
                N('再回常山演武堂时，宗祠正堂已燃起三牲九礼的高香。汉顺平侯赵云的檀木牌位前，两列火盆将青砖照得通明。掌门赵括苍、演武首座凌寒、边军都监郭逵以及先行赶回真定的雁门神箭白烈山分列左右，整座常山内堂弟子鸦雀无声。'),
                S('NPC-0345', '“白沟风雪夜，幽州古寺钟；雁门绝壁前，孤枪断铁林！此番北上，我常山弟子未辱先祖‘一身是胆’四字，更未曾牵连宗门与大宋边防半毫！”'),
                N('赵括苍走上神龛前，双手捧下一具长逾八尺的黑漆紫檀枪匣，又从怀中取出一卷用油布与红绸重重包裹的古旧绢本。启匣瞬间，一杆通体寒光凛冽的亮银长枪跃入眼帘——枪锋三棱透骨，枪颈镌着两行蝇头篆文：“白沟寒星，龙胆常山。”'),
                S('NPC-0185', '“这杆【常山龙胆亮银枪】，乃是历代内堂首席持之护国的镇派神兵；这卷《岳氏沥泉枪前谱（常山龙胆枪）》，更是先祖自三国乱世传下、经五代兵火仅存的孤本绝学！你于雁门绝壁生死一线间所悟出的‘绝壁寒星枪意’，正与谱中第七势‘孤胆破围’暗合！”'),
                P('“弟子拜受先祖遗泽！此枪在手，必不使幽燕胡马越雷池一步！”'),
                N('你单膝跪地，双手接过亮银长枪与秘谱。枪身入手冰寒沉凝，内息顺着枪杆涌入经脉，丹田与百会间顿时如星河倾泻，对常山枪脉的领悟齐齐攀上一层新境！郭逵亦上前一步，将一封盖有真定府安抚使大印与常山掌门印信的【常山·定州联合举荐信】系于你腰间。'),
                S('NPC-0185', '“自今日起，这杆【常山龙胆亮银枪】与《常山龙胆枪》便托付予你！望你持此神兵与【常山·定州联合举荐信】，护我大宋北疆山河无恙——天下虽大，常山永远是你的后盾！”'),
              ],
            }

export const SCENES: Record<string, StorySceneDef> = {
  [INLINE_SCENE_01_scene_cs_longling_opening.id]: INLINE_SCENE_01_scene_cs_longling_opening,
  [INLINE_SCENE_02_scene_cs_marshal_escape.id]: INLINE_SCENE_02_scene_cs_marshal_escape,
  [INLINE_SCENE_03_scene_cs_cliff_win_a.id]: INLINE_SCENE_03_scene_cs_cliff_win_a,
  [INLINE_SCENE_04_scene_cs_cliff_win_b.id]: INLINE_SCENE_04_scene_cs_cliff_win_b,
  [INLINE_SCENE_05_scene_cs_hanqi_bold_reply.id]: INLINE_SCENE_05_scene_cs_hanqi_bold_reply,
  [INLINE_SCENE_06_scene_cs_hanqi_pragmatic_reply.id]: INLINE_SCENE_06_scene_cs_hanqi_pragmatic_reply,
  [INLINE_SCENE_07_scene_cs_hanqi_briefing.id]: INLINE_SCENE_07_scene_cs_hanqi_briefing,
  [INLINE_SCENE_08_scene_cs_qinqian_secret.id]: INLINE_SCENE_08_scene_cs_qinqian_secret,
  [INLINE_SCENE_09_scene_cs_market_audit_win.id]: INLINE_SCENE_09_scene_cs_market_audit_win,
  [INLINE_SCENE_10_scene_cs_market_audit_fail.id]: INLINE_SCENE_10_scene_cs_market_audit_fail,
  [INLINE_SCENE_11_scene_cs_horse_bluff_win.id]: INLINE_SCENE_11_scene_cs_horse_bluff_win,
  [INLINE_SCENE_12_scene_cs_horse_combat_win.id]: INLINE_SCENE_12_scene_cs_horse_combat_win,
  [INLINE_SCENE_13_scene_cs_horse_force_win.id]: INLINE_SCENE_13_scene_cs_horse_force_win,
  [INLINE_SCENE_14_scene_cs_horse_market.id]: INLINE_SCENE_14_scene_cs_horse_market,
  [INLINE_SCENE_15_scene_cs_minzhong_vow_reply.id]: INLINE_SCENE_15_scene_cs_minzhong_vow_reply,
  [INLINE_SCENE_16_scene_cs_minzhong_escort_reply.id]: INLINE_SCENE_16_scene_cs_minzhong_escort_reply,
  [INLINE_SCENE_17_scene_cs_minzhong_elders.id]: INLINE_SCENE_17_scene_cs_minzhong_elders,
  [INLINE_SCENE_18_scene_cs_cliff_epiphany.id]: INLINE_SCENE_18_scene_cs_cliff_epiphany,
  [INLINE_SCENE_19_scene_cs_cliff_choice.id]: INLINE_SCENE_19_scene_cs_cliff_choice,
  [INLINE_SCENE_20_scene_cs_guanyin_burn.id]: INLINE_SCENE_20_scene_cs_guanyin_burn,
  [INLINE_SCENE_21_scene_cs_ancestral_confer.id]: INLINE_SCENE_21_scene_cs_ancestral_confer,
}
