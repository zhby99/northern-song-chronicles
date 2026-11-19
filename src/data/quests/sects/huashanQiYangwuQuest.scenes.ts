import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, setStep, toast } from '../../../engine/quest/dsl'
import { HUASHAN_Q03_QUEST_ID } from './huashanQiYangwuQuest'

const SPEAKER_QIAN_TONG: StorySpeakerSpec = {
  kind: 'custom',
  name: '钱通',
  title: '飞燕快刀 · 江南刀客',
  factionName: '江南快刀门',
  portraitUrl: '/assets/characters/templates/tpl_jindaomen_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_jindaomen_male_av.jpg',
}

const SPEAKER_LIU_QIANREN: StorySpeakerSpec = {
  kind: 'custom',
  name: '柳千刃',
  title: '追风断水 · 挑山刀首',
  factionName: '江南快刀门',
  portraitUrl: '/assets/characters/templates/tpl_jindaomen_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_jindaomen_male_av.jpg',
}

function buildJiangnanVanguardNpc(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_HSQ03_QIAN_TONG',
    name: '钱通',
    title: '江南快刀客 · 专削下盘急先锋',
    realm: '三流上品',
    factionName: '江南快刀门',
    sectRank: 2,
    sectRankLabel: '快刀好手',
    avatarUrl: '/assets/characters/templates/tpl_jindaomen_male_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_jindaomen_male_fb.jpg',
    talk: '“听说华山气宗出剑前还要先念两句圣贤书？看爷这专削脚踝的飞燕矮身刀！”',
    stats: { hp: 820, mp: 520, agi: 41, res: 21 },
    talents: { bone: 56, comprehension: 52, charm: 40 },
    equippedArts: {
      neigong: 'MA-233',
      qinggong: 'MA-218',
      move1: 'MA-170',
      move2: 'MA-189',
    },
    learnedArts: [
      { artId: 'MA-233', level: 4 },
      { artId: 'MA-218', level: 5 },
      { artId: 'MA-170', level: 5 },
      { artId: 'MA-189', level: 5 },
    ],
  })
}

function buildLiuQianrenBossNpc(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_HSQ03_LIU_QIANREN',
    name: '柳千刃',
    title: '追风断水刀 · 江南挑山刀首',
    realm: '二流下品',
    factionName: '江南快刀门',
    sectRank: 2,
    sectRankLabel: '挑山刀首',
    avatarUrl: '/assets/characters/templates/tpl_jindaomen_male_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_jindaomen_male_fb.jpg',
    talk: '“十合？狂妄！柳某这双柳叶追风刀一息六斩，专破你们名门正派的呆板守势！”',
    stats: { hp: 1020, mp: 780, agi: 46, res: 29 },
    talents: { bone: 64, comprehension: 62, charm: 46 },
    equippedArts: {
      neigong: 'MA-233',
      qinggong: 'MA-158',
      move1: 'MA-131',
      move2: 'MA-170',
      move3: 'MA-132',
    },
    learnedArts: [
      { artId: 'MA-233', level: 5 },
      { artId: 'MA-158', level: 5 },
      { artId: 'MA-131', level: 5 },
      { artId: 'MA-170', level: 6 },
      { artId: 'MA-132', level: 5 },
    ],
  })
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_hsq03_01: {
    id: 'scene_hsq03_01',
    title: '第一幕 · 东峰迎曦',
    subtitle: '玉女峰紫霞道观 · 东峰紫气迎曦石坪',
    mandatory: true,
    beats: [
      N('{reignYear}破晓时分，玉女峰晨钟悠扬回荡于万丈深谷。作为新晋气宗内门剑士，你依约换上内门青云剑袍，早早登临东峰紫气迎曦石坪。'),
      N('东方天际浮起一线金紫朝霞，大师兄「紫霞首徒」高沧云正负剑立于迎客古松之下，衣袂随山巅晨风猎猎生姿。'),
      S('NPC-0202', '“{gender:师弟|师妹}来得正好。昨夜紫霞正气主殿之中，你未贪西峰速成奇险之径，毅然择我气宗正脉，掌门师尊与宁师叔皆甚是欣慰。”'),
    ],
    onFinishEffects: [openScene('scene_hsq03_02', HUASHAN_Q03_QUEST_ID)],
  },

  scene_hsq03_02: {
    id: 'scene_hsq03_02',
    title: '第二幕 · 孟子浩然',
    subtitle: '东峰紫气迎曦石坪',
    mandatory: true,
    beats: [
      S('NPC-0202', '（望向翻涌红日，温声问道）“昔年孟子答公孙丑问不动心之道，曾言：『我善养吾浩然之气……其为气也，至大至刚，以直养而无害，则塞于天地之间。』你可知本门先贤为何取此二字，名我气宗内门第一路剑法为《养吾剑法》？”'),
      P('“弟子愚见：寻常剑客临敌，心随敌招而乱，不是贪功冒进便是畏缩失守；若胸中自有浩然正气充塞百骸，则任他千变万化，我自岿然不动。”'),
      S('NPC-0202', '（抚掌朗笑）“善哉斯言！封师叔常讥我气宗剑法失之于缓，殊不知至刚生于至正，守得住滴水不漏的中宫，反击之时方如泰岳崩云、无坚不摧！”'),
    ],
    onFinishEffects: [openScene('scene_hsq03_03', HUASHAN_Q03_QUEST_ID)],
  },

  scene_hsq03_03: {
    id: 'scene_hsq03_03',
    title: '第三幕 · 亲授养吾',
    subtitle: '东峰紫气迎曦石坪 · 朝阳紫气',
    illustrationUrl: '/assets/quests/hs_q03_dawn_yangwu.jpg',
    illustrationCaption: '迎曦养吾 · 高沧云于东峰朝阳紫气中亲授养吾剑法',
    mandatory: true,
    beats: [
      N('朝阳跃出云海万丈金光，高沧云锵然拔剑！不见他纵跃腾挪，只以方寸石坪为根，一剑缓起如钟鼎镇岳，剑圈吞吐间隐隐带动周遭紫雾回旋，凝成一道泼水难入的浑圆剑幕！'),
      S('NPC-0202', '“看清了——这一式『浩气长存』重在沉肩坠肘、气沉涌泉；这一式『抱元守中』看似不攻一招，实已封死对手上中下三路七十二处进击角度！今日愚兄便将整套《养吾剑法》传授于你！”'),
      N('你将十八路养吾剑诀与吐纳行气法门逐字铭刻于心，依式演练一遍，只觉丹田内息与手中长剑浑然相连，气象顿然一新！'),
    ],
    onFinishEffects: [
      { type: 'teachMartialArt', artId: 'MA-147', level: 1, autoEquip: true },
      toast('获高沧云亲授华山气宗良品剑学《养吾剑法》！', 'success', '迎曦养吾'),
      openScene('scene_hsq03_04', HUASHAN_Q03_QUEST_ID),
    ],
  },

  scene_hsq03_04: {
    id: 'scene_hsq03_04',
    title: '第四幕 · 松风习剑',
    subtitle: '东峰紫气迎曦石坪',
    mandatory: true,
    beats: [
      N('此后数日，你每日清晨皆在东峰松崖演练《养吾剑法》。宁清羽偶来观视，亦为你细细矫正剑脊受力分寸。'),
      S('NPC-0166', '“养吾剑意最忌心浮气躁。倘遇专走偏锋、以怪招诱你抢攻的敌人，越要收束剑圈，待其气浮力衰之刹那以剑脊浩然内劲震夺其兵刃。”'),
      P('“弟子谨记师叔指点！”'),
    ],
    onFinishEffects: [openScene('scene_hsq03_05', HUASHAN_Q03_QUEST_ID)],
  },

  scene_hsq03_05: {
    id: 'scene_hsq03_05',
    title: '第五幕 · 刀客叩山',
    subtitle: '东峰石阶外',
    mandatory: true,
    beats: [
      N('话音未落，一名值守山门的外门执事弟子面色涨红、气喘吁吁地奔上石坪禀报！'),
      S(
        {
          name: '知客剑童',
          title: '玉女峰知客弟子',
          factionName: '华山派',
          portraitUrl: '/assets/characters/templates/tpl_huashan_fb.jpg',
          avatarUrl: '/assets/characters/templates/tpl_huashan_av.jpg',
        },
        '“禀宁师叔、高师兄！三名来自江南快刀门的刀客打着『以武会友』旗号闯进洗头盆清泉演剑院，连削断两名外门师弟木剑，还出言讥讽咱们华山气宗只会像泥塑木偶般挨打！”',
      ),
      S('NPC-0202', '（剑眉微轩，转头望向你）“来得倒巧！走，随我与宁师叔去清泉演剑院会一会这几位江南快刀客！”'),
    ],
    choices: [
      {
        id: 'hsq03_go_spring',
        label: '手按青锋，随宁清羽与高沧云赶赴洗头盆清泉演剑院',
        tone: 'gold',
        effects: [
          { type: 'startQuest', questId: HUASHAN_Q03_QUEST_ID, stepId: 'repel_sabremen_spring' },
          setStep(HUASHAN_Q03_QUEST_ID, 'repel_sabremen_spring'),
          toast('江南快刀客登门挑衅！请前往【洗头盆清泉演剑院】迎敌！', 'talk', '刀客叩山'),
        ],
      },
    ],
  },

  scene_hsq03_06: {
    id: 'scene_hsq03_06',
    title: '第六幕 · 清泉嚣尘',
    subtitle: '玉女峰紫霞道观 · 洗头盆清泉演剑院',
    mandatory: true,
    beats: [
      N('踏入洗头盆清泉演剑院，只见院心青砖地上横着四截断折的练功木剑，两名年轻外门弟子捂着裤管血痕退在一旁。'),
      N('三名头扎英雄巾、腰悬窄刃金环柳叶刀的江南汉子抱臂傲立，为首一人约莫三十许岁，指间双刀转成两团银花，满脸轻狂之色。'),
      S(SPEAKER_LIU_QIANREN, '“哈哈哈！原以为中原名门大派之中的西岳华山有何了不得的高招，闹了半天除了长安城里那位封不弃还算是个痛快人物，山上这群气宗弟子出剑慢得够柳某喝完半壶越州黄酒！”'),
    ],
    onFinishEffects: [openScene('scene_hsq03_07', HUASHAN_Q03_QUEST_ID)],
  },

  scene_hsq03_07: {
    id: 'scene_hsq03_07',
    title: '第七幕 · 诡刀挑衅',
    subtitle: '洗头盆清泉演剑院',
    mandatory: true,
    beats: [
      S('NPC-0166', '（缓步踏入院中，声音清冷如玉磬）“三位远道自江南登临西岳，不在正厅奉拜名帖，却在演剑院以利刃欺我外门初学晚辈，莫非江南武林便是这般讲规矩的？”'),
      S(SPEAKER_LIU_QIANREN, '（见宁清羽气度非凡，收起几分轻佻，拱手傲然道）“原来是玉女剑仙宁女侠当面！在下江南快刀门柳千刃。实不相瞒，今日登门不为结怨，只欲求证一事——天下快刀专破慢剑，尤其专攻下三路的矮身诡刀！宁女侠若亲自出手胜之不武，敢不敢派一名贵派新晋内门弟子下场试试？”'),
    ],
    onFinishEffects: [openScene('scene_hsq03_08', HUASHAN_Q03_QUEST_ID)],
  },

  scene_hsq03_08: {
    id: 'scene_hsq03_08',
    title: '第八幕 · 师兄遣将',
    subtitle: '洗头盆清泉演剑院',
    mandatory: true,
    beats: [
      N('院旁众华山弟子义愤填膺，纷纷请战。高沧云抬手止住众人，目光温和而坚定地落在你身上。'),
      S('NPC-0202', '“{gender:师弟|师妹}，你初入气宗内门，方习《养吾剑法》数日。今日便由你代师门出战——不必伤他性命，十合之内，堂堂正正震落他们手中快刀，让江南同道见识何谓浩然守中！”'),
      P('（越众而出，拔剑横礼）“弟子领命！两位请赐招！”'),
    ],
    onFinishEffects: [openScene('scene_hsq03_09', HUASHAN_Q03_QUEST_ID)],
  },

  scene_hsq03_09: {
    id: 'scene_hsq03_09',
    title: '第九幕 · 刀影攻下',
    subtitle: '洗头盆清泉演剑院 · 前哨战',
    mandatory: true,
    beats: [
      S(SPEAKER_QIAN_TONG, '（抢步跳出，掣出窄刃柳叶快刀怪笑一声）“杀鸡焉用柳师兄牛刀！先吃我『飞燕刀』钱通三记削踝滚堂刀！”'),
      N('钱通矮身一滚，整个人几乎贴着青石地面滑进，寒光闪闪的快刀专往你双膝与脚踝要害毒辣削来！'),
    ],
    choices: [
      {
        id: 'hsq03_fight_qiantong',
        label: '沉桩守中，以《养吾剑法》迎战飞燕刀钱通（三流上品）',
        tone: 'primary',
        effects: [
          {
            type: 'startCombat',
            questId: HUASHAN_Q03_QUEST_ID,
            opponent: { kind: 'custom', npc: buildJiangnanVanguardNpc() },
            rule: 'spar',
            forbidEscapeReason: '当着全院同门护持华山声威，断不可退！',
            introText: '【清泉护誉 · 前哨】以《养吾剑法》沉稳剑圈封挡江南快刀客【钱通（三流上品）】下盘诡刀！',
            onWin: [openScene('scene_hsq03_10', HUASHAN_Q03_QUEST_ID)],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('一时被矮身滚堂刀扰乱步法，谨记沉肩守中再战！', 'warn', '养吾试锋'),
            ],
          },
        ],
      },
    ],
  },

  scene_hsq03_10: {
    id: 'scene_hsq03_10',
    title: '第十幕 · 不动如山',
    subtitle: '洗头盆清泉演剑院',
    mandatory: true,
    beats: [
      N('任凭钱通贴地翻滚连削七刀，你双足如生根于太岳顽石，一招「古柏森森」垂剑下护，剑尖每次皆先他半寸封在刀背之上！第七刀刚过，你剑脊一抖顺势下压，震得钱通虎口剧痛、屁股向后跌坐在清泉水渠边！'),
      S(SPEAKER_LIU_QIANREN, '（脸色骤沉，一把拉起钱通，双腕一抖掣出两柄寒光森然的追风柳叶刀）“退下！难怪敢接梁子，原来练过专克下盘的守剑桩功！好，柳某亲自领教，若十合之内破不开你的龟壳剑圈，柳某当场折刀下山！”'),
    ],
    onFinishEffects: [openScene('scene_hsq03_11', HUASHAN_Q03_QUEST_ID)],
  },

  scene_hsq03_11: {
    id: 'scene_hsq03_11',
    title: '第十一幕 · 守中破妄',
    subtitle: '洗头盆清泉演剑院 · 十合之约',
    illustrationUrl: '/assets/quests/hs_q03_guard_counter.jpg',
    illustrationCaption: '守中破妄 · 绵密养吾剑势十合震飞江南挑山快刀客兵刃',
    mandatory: true,
    beats: [
      N('柳千刃身形疾旋如陀螺，双刀化作漫天雪亮刀网，上虚下实、左诱右劈，狂风快刀之声尖啸刺耳！'),
      N('你屏息凝神，胸中诵念浩然真诀，《养吾剑法》一圈套着一圈绵密铺开，任他疾风暴雨，自守方寸乾坤，静候十合之内彼气力断续之一瞬！'),
    ],
    choices: [
      {
        id: 'hsq03_fight_liuqianren',
        label: '浩然贯剑，十合之内击败挑山刀首柳千刃！（二流下品）',
        subLabel: '十合之约：以《养吾剑法》守中反震夺其双刀',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: HUASHAN_Q03_QUEST_ID,
            opponent: { kind: 'custom', npc: buildLiuQianrenBossNpc() },
            rule: 'story_trial',
            maxRounds: 10,
            forbidEscapeReason: '十合赌约已立，华山气宗威名全系此剑！',
            introText: '【十合夺刃 · 守中破妄】迎战二流下品江南挑山刀首【柳千刃】，于十合之内挫其双刀锋芒！',
            onWin: [openScene('scene_hsq03_12', HUASHAN_Q03_QUEST_ID)],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('未能于十合之内压制柳千刃快刀，凝定浩然内息重新出剑！', 'warn', '十合之约'),
            ],
          },
        ],
      },
    ],
  },

  scene_hsq03_12: {
    id: 'scene_hsq03_12',
    title: '第十二幕 · 震刃夺锋',
    subtitle: '洗头盆清泉演剑院',
    mandatory: true,
    beats: [
      N('战至第九合！柳千刃久攻不入，额汗如雨，铤而走险使出一招两败俱伤的「双燕剪水」，双刀交叉斜削你膝弯，胸腹中宫却在换气间露出一线空当！'),
      N('“着！”你吐气开声，丹田浩然真气如长江大河贯注剑身，不闪不避，一式《养吾剑法》精髓「中流砥柱」竖剑直劈双刀交叠之十字锁口！'),
      N('“锵——嚓！”火星四溅，两柄精钢柳叶刀竟同时脱手飞出，夺夺两声深深钉入演剑院东墙青砖之内，刀柄犹自嗡嗡颤鸣！'),
    ],
    onFinishEffects: [openScene('scene_hsq03_13', HUASHAN_Q03_QUEST_ID)],
  },

  scene_hsq03_13: {
    id: 'scene_hsq03_13',
    title: '第十三幕 · 羞惭下山',
    subtitle: '洗头盆清泉演剑院',
    mandatory: true,
    beats: [
      N('满院华山弟子彩声雷动！柳千刃呆呆望着自己酸麻红肿的双手，面色由青转红，终究长叹一声，向宁清羽、高沧云与你深深一揖。'),
      S(SPEAKER_LIU_QIANREN, '“江南柳某井底观天，今日方知西岳华山气宗并非出剑迟缓，而是浩然如山、无隙可寻！连一位新晋内门{gender:少侠|女侠}尚且九合夺我双刀，柳某甘拜下风，这便下山，绝不敢再妄议华山半字！”'),
      N('三名江南刀客拔下墙上双刀，灰溜溜快步离山而去。高沧云含笑走上前来，邀你重返东峰迎曦石坪复盘此战得失。'),
    ],
    choices: [
      {
        id: 'hsq03_back_terrace',
        label: '随高沧云与宁清羽返回东峰紫气迎曦石坪印证剑理',
        tone: 'gold',
        effects: [
          setStep(HUASHAN_Q03_QUEST_ID, 'return_terrace_insight'),
          toast('九合震飞江南挑山双刀！请返回【东峰紫气迎曦石坪】印证浩然剑理！', 'success', '守中破妄'),
        ],
      },
    ],
  },

  scene_hsq03_14: {
    id: 'scene_hsq03_14',
    title: '第十四幕 · 剑气相生',
    subtitle: '玉女峰紫霞道观 · 东峰紫气迎曦石坪',
    mandatory: true,
    beats: [
      N('重登东峰迎曦石坪，午后松涛阵阵。宁清羽亲自取过石案清茗递予你，目光满含期许。'),
      S('NPC-0166', '“今日清泉院一战，你最难得之处并非第九合震飞双刀的那一击，而是前八合面对诡奇下盘刀路时，心神丝毫不为其所夺。”'),
      S('NPC-0202', '“正是此理！《养吾剑法》乃我气宗立身之基——先以儒道经义涵养胸中正气，使敌无可乘；待日后修习本门掌法与地阶剑学时，方知今日这『不动心』三字受用无穷。”'),
    ],
    onFinishEffects: [openScene('scene_hsq03_15', HUASHAN_Q03_QUEST_ID)],
  },

  scene_hsq03_15: {
    id: 'scene_hsq03_15',
    title: '第十五幕 · 浩然日新',
    subtitle: '东峰紫气迎曦石坪',
    mandatory: true,
    beats: [
      N('暮钟再起，你立于东峰崖畔独立演剑。经此实战印证，孟子浩然经义与《养吾剑法》十八路招式在胸中融会贯通，剑光流转间隐隐已有大家风范。'),
    ],
    choices: [
      {
        id: 'hsq03_complete',
        label: '收剑谢师，精研《养吾剑法》（完成气宗首篇）',
        tone: 'gold',
        effects: [
          { type: 'addArtExp', artId: 'MA-147', amount: 240 },
          { type: 'giveSilver', amount: 70, reason: '清泉演剑院挫退江南挑山刀客赏银' },
          { type: 'addSectContribution', amount: 55 },
          { type: 'giveCombatExp', amount: 100, reason: '十合之内以养吾剑法破江南快刀' },
          { type: 'modifyRenown', delta: 15, reason: '玉女峰以养吾剑法九合夺刃扬威' },
          { type: 'modifySkill', key: '经义', delta: 2 },
          { type: 'completeQuest', questId: HUASHAN_Q03_QUEST_ID },
          toast('已完成《玉女晨钟 · 浩然养吾》！《养吾剑法》与经义修为大进！', 'success', '浩然养吾'),
        ],
      },
    ],
  },
}
