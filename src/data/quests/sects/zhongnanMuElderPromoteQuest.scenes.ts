import type { StorySceneDef } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, setStep, toast } from '../../../engine/quest/dsl'
import { ZHONGNAN_Q28_QUEST_ID } from './zhongnanMuElderPromoteQuest'

const XINGXIU_ELITE_NPC = makeQuestNpc({
  id: 'znq28_xingxiu_elite',
  name: '星宿碧磷毒师',
  title: '星宿派毒功精锐',
  realm: '二流上品',
  factionName: '星宿派',
  avatarUrl: '/assets/characters/templates/tpl_xingxiu_av.jpg',
  portraitUrl: '/assets/characters/templates/tpl_xingxiu_fb.jpg',
  talk: '“摘星大师兄有令！把这群古墓女娃通通炼成毒人！”',
  stats: { hp: 2650, mp: 1450, agi: 76, res: 64 },
  equippedArts: { neigong: 'MA-231', move1: 'MA-127', move2: 'MA-150' },
  learnedArts: [{ artId: 'MA-231', level: 7 }, { artId: 'MA-127', level: 6 }, { artId: 'MA-150', level: 6 }],
})

export const SCENES: Record<string, StorySceneDef> = {
  scene_znq28_01: {
    id: 'scene_znq28_01',
    title: '第一幕 · 碧磷毒雾侵幽谷',
    subtitle: '终南山隐宗 · 活死人墓幽谷石室 · 天罗地网捕雀轻功厅',
    illustrationUrl: '/assets/quests/zn_q28_duanlong_poison_night.jpg',
    illustrationCaption: '幽蓝磷火与腥甜毒烟涌入活死人墓石廊，冷清秋与白清霜持剑苦撑捕雀大厅',
    mandatory: true,
    beats: [
      N('{reignYear}腊月朔夜，浓黑如墨。刺耳的玉蜂示警嗡鸣骤然惊破活死人墓的千年静谧！一团团泛着幽绿鬼火的腥臭毒烟，正沿着断龙石外通风孔疯狂灌入【天罗地网捕雀轻功厅】！'),
      N('你提剑疾驰赶至大厅，只见幽谷素女【冷清秋】与寒谷飞霜【白清霜】背靠石柱，衣袖均被毒烟灼出焦痕，正咬牙以剑气苦苦护住通往冰魄石室的最后一道石门！'),
      S('NPC-0215', '（以帕掩口，声音急促）“{gender:师弟|师妹}小心！来的是星宿派妖人，毒烟里混着腐尸毒与化功散，我和冷师姐猝不及防吸了半口，真气运转滞涩！”'),
    ],
    onFinishEffects: [
      { type: 'startQuest', questId: ZHONGNAN_Q28_QUEST_ID, stepId: 'defend_sparrow_hall' },
      { type: 'teleportPlayer', regionId: 'zhongnanshan', buildingId: 'zn_tomb', spotId: 'zn_tb_sparrow' },
      openScene('scene_znq28_02', ZHONGNAN_Q28_QUEST_ID),
    ],
  },

  scene_znq28_02: {
    id: 'scene_znq28_02',
    title: '第二幕 · 摘星魔影现石厅',
    subtitle: '天罗地网捕雀轻功厅',
    illustrationUrl: '/assets/quests/zn_q28_zhaixingzi_ambush.jpg',
    illustrationCaption: '幽绿毒雾散开，星宿大弟子摘星子率碧磷毒师狞笑步入捕雀厅，双掌紫黑泛毒',
    mandatory: true,
    beats: [
      N('“桀桀桀桀——！”一阵尖利刺耳的怪笑在石厅穹顶回荡！幽绿毒雾裂开，一名面色青白、眉眼阴毒、身着紫黑星宿道袍的瘦长男子大步踏入，身旁紧跟着一名手持碧磷毒幡的星宿毒师——正是星宿老怪丁春秋座下首徒「西域毒仙」【摘星子】！'),
      S('NPC-0181', '（阴恻恻地舔了舔嘴唇，目光贪婪扫向后方冰魄石室）“林朝瑶那老尼姑果然正在闭死关修补寒玉床！家师星宿老仙神机妙算，特命本座今夜来取万年寒玉髓与《玉女心经》——谁敢挡路，便尝尝我抽髓掌的滋味！”'),
    ],
    onFinishEffects: [openScene('scene_znq28_03', ZHONGNAN_Q28_QUEST_ID)],
  },

  scene_znq28_03: {
    id: 'scene_znq28_03',
    title: '第三幕 · 隔山犹闻老怪声',
    subtitle: '天罗地网捕雀轻功厅',
    mandatory: true,
    beats: [
      S('NPC-0122', '（遥遥自谷外悬崖传来一阵阴柔得意的传音）“好徒儿，速战速决！趁重阳古观那帮牛鼻子尚未察觉，把活死人墓的宝贝搜刮干净，老夫在山外替你掠阵！”'),
      S('NPC-0173', '（脸色微白，强撑剑锋挡在你身前）“丁春秋竟然亲自在谷外压阵……{gender:师弟|师妹}，你快退入内室护住师父，我与白师妹拼死拖住摘星子！”'),
    ],
    onFinishEffects: [openScene('scene_znq28_04', ZHONGNAN_Q28_QUEST_ID)],
  },

  scene_znq28_04: {
    id: 'scene_znq28_04',
    title: '第四幕 · 寒玉护脉拒毒烟',
    subtitle: '天罗地网捕雀轻功厅',
    mandatory: true,
    beats: [
      P('（反手按住冷清秋剑背，步履沉稳踏出一步，将两枚江宁所得《大理段氏犀角解毒丸》弹入二女手中）“两位师姐中毒已深，速速服药运功护住心脉！我方才在昆仑冰窟以万年寒玉淬炼经脉，百毒难侵——这群星宿妖人，交给我一人足矣！”'),
      S('NPC-0181', '（狂笑出声）“好狂妄的小辈！凭你一人也敢同时接我与碧磷师弟的联手抽髓毒掌？给我上，撕碎他！”'),
    ],
    onFinishEffects: [openScene('scene_znq28_05', ZHONGNAN_Q28_QUEST_ID)],
  },

  scene_znq28_05: {
    id: 'scene_znq28_05',
    title: '第五幕 · 毒海孤星一敌二',
    subtitle: '天罗地网捕雀轻功厅',
    illustrationUrl: '/assets/quests/zn_q28_sparrow_hall_counter.jpg',
    illustrationCaption: '天罗地网捕雀厅内寒芒四射，你孤身游走毒雾之间，车轮连战反攻摘星子与碧磷毒师',
    mandatory: true,
    beats: [
      N('摘星子双掌紫黑如墨，携腐骨腥风从正面扑来；碧磷毒师同时抖动毒幡自侧翼偷袭，漫天毒针封死你左右退路！'),
      N('生死一瞬，你足尖点在石厅暗藏的天罗地网麻雀飞檐步点上，身形如九天孤星般飘忽穿梭，素剑挽出万点寒花，悍然车轮连战反扑而上！'),
    ],
    choices: [
      {
        id: 'znq28_ch_battle_1v2',
        label: '孤剑凌空，车轮连战力战摘星子与星宿碧磷毒师！',
        tone: 'danger',
        effects: [
          { type: 'healPlayer', hpPct: 100, mpPct: 100 },
          {
            type: 'startCombat',
            format: 'gauntlet',
            questId: ZHONGNAN_Q28_QUEST_ID,
            opponent: { kind: 'npc', npcId: 'NPC-0181' },
            extraOpponents: [{ kind: 'custom', npc: XINGXIU_ELITE_NPC }],
            rule: 'duel',
            lethalOnLose: false,
            introText: '毒雾弥漫捕雀厅！你孤剑挺身，车轮连战迎战西域毒仙摘星子与星宿碧磷毒师！',
            onWin: [openScene('scene_znq28_06', ZHONGNAN_Q28_QUEST_ID)],
            onLose: [
              { type: 'healPlayer', hpPct: 65, mpPct: 65 },
              toast('摘星子与毒师合击阴毒凶猛，稳住心神、先破毒师再战摘星子！', 'warn', '断龙血夜'),
            ],
          },
        ],
      },
    ],
  },

  scene_znq28_06: {
    id: 'scene_znq28_06',
    title: '第六幕 · 天罗剑网碎毒幡',
    subtitle: '天罗地网捕雀轻功厅',
    mandatory: true,
    beats: [
      N('“嗤啦——！”你剑势如冰瀑倾泻，一剑斩碎碧磷毒师手中毒幡，顺势剑柄重击其肋下，将其震飞撞昏在石壁之下！'),
      N('摘星子见帮手瞬间落败，惊怒交加，孤注一掷运起全身毒功拍出一记“碧磷抽髓掌”！你迎着毒风不闪不避，运起至柔藏刚极境剑意，剑尖点破毒劲气眼，硬生生透入摘星子右肩！'),
    ],
    onFinishEffects: [openScene('scene_znq28_07', ZHONGNAN_Q28_QUEST_ID)],
  },

  scene_znq28_07: {
    id: 'scene_znq28_07',
    title: '第七幕 · 毒仙重创骇断魂',
    subtitle: '天罗地网捕雀轻功厅',
    mandatory: true,
    beats: [
      S('NPC-0181', '（惨嚎一声，右肩鲜血喷涌，连退十步撞在石阶上，面如死灰）“啊——！我的右臂！你的寒玉内力怎会克制我星宿毒功至此？！”'),
      P('（长剑直指摘星子咽喉，寒声如冰）“星宿毒功不过旁门左道！滚出去告诉丁春秋，今日留你一命带话，若敢再犯终南活死人墓，便叫你们师徒尽数葬身寒玉涧！”'),
    ],
    onFinishEffects: [openScene('scene_znq28_08', ZHONGNAN_Q28_QUEST_ID)],
  },

  scene_znq28_08: {
    id: 'scene_znq28_08',
    title: '第八幕 · 寒玉破关慑老怪',
    subtitle: '天罗地网捕雀轻功厅',
    mandatory: true,
    beats: [
      N('就在此时，后方冰魄石室厚重的千斤石门轰然开启！一股清冽如天山雪崩的磅礴宗师剑意透门而出，瞬间将大厅内残留的腥臭毒烟吹散得一干二净！'),
      S('NPC-0114', '（白衣胜雪飘然而出，清冷声音直透谷外百丈）“丁春秋，你一把年纪躲在谷外教唆徒弟夜袭小辈，也不怕天下英雄耻笑么？既然来了，便现身接林某一剑如何？”'),
    ],
    onFinishEffects: [openScene('scene_znq28_09', ZHONGNAN_Q28_QUEST_ID)],
  },

  scene_znq28_09: {
    id: 'scene_znq28_09',
    title: '第九幕 · 丁春秋惊闻遁走',
    subtitle: '活死人墓幽谷外',
    mandatory: true,
    beats: [
      S('NPC-0122', '（谷外传来一声惊怒交加的冷哼）“哼！林朝瑶竟然提前破关功成，而且前山重阳观的钟声也动了！摘星子，还不快滚出来，留得青山在！”'),
      N('摘星子如蒙大赦，连滚带爬拖起昏迷的毒师逃出断龙石门。星宿老怪师徒狼狈遁入夜色，活死人墓一场大劫就此烟消云散！'),
    ],
    onFinishEffects: [openScene('scene_znq28_10', ZHONGNAN_Q28_QUEST_ID)],
  },

  scene_znq28_10: {
    id: 'scene_znq28_10',
    title: '第十幕 · 师姐扶伤赞孤勇',
    subtitle: '天罗地网捕雀轻功厅',
    mandatory: true,
    beats: [
      N('冷清秋与白清霜服过解毒丸，又得林朝瑶寒玉内力相助逼出余毒，脸色已恢复红润。'),
      S('NPC-0173', '（收剑上前，清冷眼眸中满是真挚敬意）“{gender:师弟|师妹}，今夜若非你万里采玉归来、又在生死之际以一敌二力挫摘星子，活死人墓险些酿成大祸。”'),
      S('NPC-0215', '（亦微笑颔首）“经此巴山、江宁、昆仑与断龙血夜四战，你的剑境与胆魄，早已超越了我等师姐！”'),
    ],
    onFinishEffects: [openScene('scene_znq28_11', ZHONGNAN_Q28_QUEST_ID)],
  },

  scene_znq28_11: {
    id: 'scene_znq28_11',
    title: '第十一幕 · 前山灯火隐相护',
    subtitle: '活死人墓谷口',
    mandatory: true,
    beats: [
      N('此时一名守谷女弟子轻步来报：“禀祖师：方才星宿毒众逃出幽谷时，重阳古观前山似乎有人影暗中出手截杀了几个断后妖人，随后便悄然退回前山去了。”'),
      S('NPC-0114', '（神色微顿，望向重阳古观方向沉默片刻，轻声道）“他倒是还记得三十年前那句‘外敌犯山，同仇敌忾’……”'),
    ],
    onFinishEffects: [openScene('scene_znq28_12', ZHONGNAN_Q28_QUEST_ID)],
  },

  scene_znq28_12: {
    id: 'scene_znq28_12',
    title: '第十二幕 · 祖师传召冰魄室',
    subtitle: '天罗地网捕雀轻功厅',
    mandatory: true,
    beats: [
      S('NPC-0114', '（转目望向你，语气庄重而温润）“徒儿，随我与你两位师姐步入【昆仑寒玉床冰魄石室】。活死人墓百年未立护法尊使之位，今夜，也该为你行册封之礼了。”'),
    ],
    onFinishEffects: [openScene('scene_znq28_13', ZHONGNAN_Q28_QUEST_ID)],
  },

  scene_znq28_13: {
    id: 'scene_znq28_13',
    title: '第十三幕 · 清理毒痕净石厅',
    subtitle: '天罗地网捕雀轻功厅',
    mandatory: true,
    beats: [
      N('古墓众女弟子点燃玉蜂清香，彻底净化了捕雀厅内的残余毒气。白清霜为你递来一件洁净如雪的冰蚕丝披风。'),
    ],
    onFinishEffects: [openScene('scene_znq28_14', ZHONGNAN_Q28_QUEST_ID)],
  },

  scene_znq28_14: {
    id: 'scene_znq28_14',
    title: '第十四幕 · 诸女齐贺立奇功',
    subtitle: '活死人墓石廊',
    mandatory: true,
    beats: [
      S('NPC-0173', '“古墓护法尊使乃活死人墓除祖师之外的最高尊位，代掌玉蜂秘令与古墓防务。今日由{gender:师弟|师妹}受封，我与白师妹俱都心悦诚服！”'),
    ],
    onFinishEffects: [openScene('scene_znq28_15', ZHONGNAN_Q28_QUEST_ID)],
  },

  scene_znq28_15: {
    id: 'scene_znq28_15',
    title: '第十五幕 · 移步冰魄石室前',
    subtitle: '活死人墓幽谷石室',
    mandatory: true,
    beats: [
      N('冰魄石室石门大开，柔和温润的寒玉碧光照亮整条幽深石廊，恩师林朝瑶正立于寒玉床前静候大典开启。'),
    ],
    choices: [
      {
        id: 'znq28_ch_go_jadebed',
        label: '步入【昆仑寒玉床冰魄石室】，接受林朝瑶册封 Lv.4 古墓护法尊使！',
        tone: 'gold',
        effects: [
          setStep(ZHONGNAN_Q28_QUEST_ID, 'tomb_investiture'),
          { type: 'teleportPlayer', regionId: 'zhongnanshan', buildingId: 'zn_tomb', spotId: 'zn_tb_jadebed' },
          { type: 'setFlag', flag: 'znq28_jadebed_triggered', value: true },
          openScene('scene_znq28_19', ZHONGNAN_Q28_QUEST_ID),
        ],
      },
      {
        id: 'znq28_ch_later_jadebed',
        label: '先略作调息拭剑，稍后自行步入昆仑寒玉床冰魄石室',
        tone: 'default',
        effects: [
          setStep(ZHONGNAN_Q28_QUEST_ID, 'tomb_investiture'),
          openScene('scene_znq28_16', ZHONGNAN_Q28_QUEST_ID),
        ],
      },
    ],
  },

  scene_znq28_16: {
    id: 'scene_znq28_16',
    title: '第十六幕 · 幽廊拭剑静心神',
    subtitle: '活死人墓石廊',
    mandatory: true,
    beats: [
      N('你轻拭长剑血渍，平复激战后的真气，随后缓步迈向【昆仑寒玉床冰魄石室】。'),
    ],
  },

  scene_znq28_17: {
    id: 'scene_znq28_17',
    title: '第十七幕 · 碧光映雪照石室',
    subtitle: '昆仑寒玉床冰魄石室',
    mandatory: true,
    beats: [
      N('修复如新的昆仑寒玉床散发着氤氲寒雾，石室四角长明冰灯静静摇曳，冷清秋、白清霜与古墓诸弟子分列左右。'),
    ],
    onFinishEffects: [openScene('scene_znq28_18', ZHONGNAN_Q28_QUEST_ID)],
  },

  scene_znq28_18: {
    id: 'scene_znq28_18',
    title: '第十八幕 · 肃立寒玉拜恩师',
    subtitle: '昆仑寒玉床冰魄石室',
    mandatory: true,
    beats: [
      N('你迈步上前，在寒玉床前三步之外端正行礼，神色沉静如水。'),
    ],
    onFinishEffects: [openScene('scene_znq28_19', ZHONGNAN_Q28_QUEST_ID)],
  },

  scene_znq28_19: {
    id: 'scene_znq28_19',
    title: '第十九幕 · 寒玉仙子授尊印',
    subtitle: '终南山隐宗 · 活死人墓幽谷石室 · 昆仑寒玉床冰魄石室',
    illustrationUrl: '/assets/quests/zn_q28_gumu_elder_investiture.jpg',
    illustrationCaption: '冰魄石室碧光如月，林朝瑶亲授寒玉护法尊印，册封你为活死人墓护法尊使',
    mandatory: true,
    beats: [
      S('NPC-0114', '（手捧一枚晶莹剔透的冰魄寒玉令牌，面向全墓弟子清声宣谕）“活死人墓门下听令：此子入蜀救同门、十合折青城掌门道冠；东下江宁赤壁证至柔剑心、夜护名士；万里赴昆仑瑶池傲骨不跪、采回万年寒玉髓；今夜更于捕雀厅以一敌二力挫星宿摘星子，保我古墓周全！”'),
      S('NPC-0114', '“功勋卓著，剑心通明！自今日起，特册封你为终南活死人墓——**古墓护法尊使**，赐寒玉尊印，见印如见祖师！”'),
      N('你双手接过冰凉温润的寒玉尊印，冷清秋与白清霜率全墓弟子齐声见礼：“参见护法尊使！”'),
    ],
    onFinishEffects: [openScene('scene_znq28_20', ZHONGNAN_Q28_QUEST_ID)],
  },

  scene_znq28_20: {
    id: 'scene_znq28_20',
    title: '第二十幕 · 寒玉床前立誓言',
    subtitle: '昆仑寒玉床冰魄石室',
    mandatory: true,
    beats: [
      S('NPC-0114', '“既掌护法尊印，他日大劫临山之时，你欲以何心持剑？”'),
    ],
    choices: [
      {
        id: 'znq28_ch_vow_guard',
        label: '“护持古墓幽谷不失，若大敌当前，亦愿携两脉同仇敌忾！”',
        tone: 'jade',
        effects: [
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0114' }, delta: 10 },
          openScene('scene_znq28_21', ZHONGNAN_Q28_QUEST_ID),
        ],
      },
      {
        id: 'znq28_ch_vow_pure',
        label: '“谨守冰心素剑，凡敢犯我活死人墓者，虽远必诛！”',
        tone: 'gold',
        effects: [
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0173' }, delta: 10 },
          openScene('scene_znq28_21', ZHONGNAN_Q28_QUEST_ID),
        ],
      },
    ],
  },

  scene_znq28_21: {
    id: 'scene_znq28_21',
    title: '第二十一幕 · 师尊密告一品堂',
    subtitle: '昆仑寒玉床冰魄石室',
    mandatory: true,
    beats: [
      N('大典散后，林朝瑶独留你于寒玉床畔，神色微凝。'),
      S('NPC-0114', '“丁春秋不过是闻风而来的豺狗。真正令终南山面临灭顶之灾的，是西夏国相没藏讹庞麾下一品堂的绝顶宗师——四大恶人之首段延庆，以及统领西夏铁鹞军的赫连霸先。”'),
    ],
    onFinishEffects: [openScene('scene_znq28_22', ZHONGNAN_Q28_QUEST_ID)],
  },

  scene_znq28_22: {
    id: 'scene_znq28_22',
    title: '第二十二幕 · 忧虑悲酥清风毒',
    subtitle: '昆仑寒玉床冰魄石室',
    mandatory: true,
    beats: [
      S('NPC-0114', '“据我暗中查探，西夏一品堂已暗中配制出奇毒‘悲酥清风露’，不日便会倾巢夜袭终南山，欲将重阳古观与活死人墓一网打尽！”'),
      P('“悲酥清风露……段延庆与赫连霸先亲临？弟子这便加强谷口玉蜂警戒，并备妥解毒灵药！”'),
    ],
    onFinishEffects: [openScene('scene_znq28_23', ZHONGNAN_Q28_QUEST_ID)],
  },

  scene_znq28_23: {
    id: 'scene_znq28_23',
    title: '第二十三幕 · 赐药护脉备大劫',
    subtitle: '昆仑寒玉床冰魄石室',
    mandatory: true,
    beats: [
      N('林朝瑶取出古墓珍藏的解毒与回气灵丹赠予于你，叮嘱你这几日务必将真气调至巅峰，随时准备应对西夏一品堂的雷霆叩关！'),
    ],
    onFinishEffects: [openScene('scene_znq28_24', ZHONGNAN_Q28_QUEST_ID)],
  },

  scene_znq28_24: {
    id: 'scene_znq28_24',
    title: '第二十四幕 · 幽谷月明听松涛',
    subtitle: '活死人墓幽谷石室',
    mandatory: true,
    beats: [
      N('走出幽深石室，残月冷冷照在终南雪岭之上。你手握冰魄寒玉尊印，感受到前所未有的责任与沉稳。'),
    ],
    onFinishEffects: [openScene('scene_znq28_25', ZHONGNAN_Q28_QUEST_ID)],
  },

  scene_znq28_25: {
    id: 'scene_znq28_25',
    title: '第二十五幕 · 贺兰黑云暗压城',
    subtitle: '终南后山寒玉涧',
    mandatory: true,
    beats: [
      N('远眺西北天际，阴云低垂如墨。重阳古观与活死人墓三十年来的终极考验，已然迫在眉睫！'),
    ],
    onFinishEffects: [openScene('scene_znq28_26', ZHONGNAN_Q28_QUEST_ID)],
  },

  scene_znq28_26: {
    id: 'scene_znq28_26',
    title: '第二十六幕 · 古墓尊使威名扬',
    subtitle: '终南山隐宗 · 活死人墓幽谷石室',
    mandatory: true,
    beats: [
      N('你已正式晋升终南隐宗 **Lv.4 古墓护法尊使**！请整顿锋芒，静候西夏一品堂大劫主线《贺兰黑云 · 一品叩关》的到来！'),
    ],
    onFinishEffects: [
      { type: 'setSectRank', sectId: 'SECT-11', rank: 4, promoteOnly: true },
      { type: 'giveItem', itemId: 'ITM-MED-102', qty: 1 },
      { type: 'giveItem', itemId: 'ITM-MED-116', qty: 2 },
      { type: 'giveSilver', amount: 420, reason: '受封活死人墓护法尊使赏赐' },
      { type: 'giveCombatExp', amount: 1850, reason: '断龙血夜以一敌二力挫摘星子与碧磷毒师' },
      { type: 'addSectContribution', amount: 480 },
      { type: 'modifyRenown', delta: 90, reason: '断龙血夜破星宿毒众、荣膺古墓护法尊使' },
      { type: 'modifyChivalry', delta: 50, reason: '孤剑驰援同门、荡除星宿毒患' },
      { type: 'modifySkill', key: '诗词', delta: 1 },
      { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0114' }, delta: 12 },
      { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0173' }, delta: 10 },
      { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0215' }, delta: 10 },
      { type: 'setFlag', flag: 'zn_q28_gumu_elder', value: true },
      {
        type: 'completeQuest',
        questId: ZHONGNAN_Q28_QUEST_ID,
        outcome: 'gumu_elder_promoted',
        combatExp: 800,
      },
      toast(
        '【断龙血夜 · 毒海孤星】完结！你已荣膺终南隐宗 Lv.4 古墓护法尊使，请静候西夏大劫主线！',
        'success',
        '晋升古墓尊使',
      ),
    ],
  },
}
