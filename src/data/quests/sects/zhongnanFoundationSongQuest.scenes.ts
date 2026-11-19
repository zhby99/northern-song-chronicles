import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, setStep, toast, warn } from '../../../engine/quest/dsl'
import { ZHONGNAN_Q01_QUEST_ID } from './zhongnanFoundationSongQuest'

const SPEAKER_RAIDER_BOSS: StorySpeakerSpec = {
  kind: 'custom',
  name: '黑风胡六',
  title: '陇右盗柏马贼头目',
  factionName: '陇右马贼',
  portraitUrl: '/assets/characters/templates/tpl_greenwood_sect_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_greenwood_sect_av.jpg',
}

function buildLongyouRaiderBoss(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_ZN_Q01_RAIDER_BOSS',
    name: '黑风胡六',
    title: '陇右盗柏马贼头目',
    realm: '三流下品',
    factionName: '陇右马贼',
    avatarUrl: '/assets/characters/templates/tpl_greenwood_sect_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_greenwood_sect_fb.jpg',
    talk: '“终南古柏一根能卖五十贯，哪来的小道士敢断老子财路！”',
    stats: { hp: 340, mp: 130, agi: 21, res: 13 },
    talents: { bone: 44, comprehension: 36, charm: 30 },
    equippedArts: { neigong: 'MA-234', move1: 'MA-184' },
    learnedArts: [
      { artId: 'MA-234', level: 2 },
      { artId: 'MA-184', level: 2 },
    ],
  })
}

function buildLongyouRaiderAxe(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_ZN_Q01_RAIDER_AXE',
    name: '锯木麻子',
    title: '陇右盗柏贼党',
    realm: '不入流',
    factionName: '陇右马贼',
    avatarUrl: '/assets/characters/templates/tpl_greenwood_sect_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_greenwood_sect_fb.jpg',
    talk: '“老大别废话，大斧子招呼，砍翻这小道士！”',
    stats: { hp: 260, mp: 90, agi: 18, res: 11 },
    talents: { bone: 38, comprehension: 32, charm: 26 },
    equippedArts: { neigong: 'MA-234', move1: 'MA-184' },
    learnedArts: [
      { artId: 'MA-234', level: 1 },
      { artId: 'MA-184', level: 1 },
    ],
  })
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_zn_q01_01: {
    id: 'scene_zn_q01_01',
    title: '第一幕 · 松风晨钟',
    subtitle: '重阳古观 · 清修主殿',
    illustrationUrl: '/assets/quests/zn_q01_morning_chant.jpg',
    illustrationCaption: '大道筑基 · 重阳主殿晨光透窗，马钰玄与刘处静开坛授歌',
    mandatory: true,
    beats: [
      N('{reignYear}仲春卯时，终南山岚未散，重阳古观的铜钟已悠悠敲响三通。殿外苍松如盖，白鹤掠过青瓦。'),
      N('你盘膝坐于蒲团之上，前方高台端坐着大师兄「丹阳子」马钰玄与二师兄「长生子」刘处静。'),
      S('NPC-1054', '（声如清磬）“{gender:师弟|师妹}入门数日，入门十三剑已具雏形。然有招无气，终是花拳绣腿。今日贫道与刘师弟便传你本门筑基根蒂——《全真大道筑基歌》。”'),
    ],
    onFinishEffects: [openScene('scene_zn_q01_02', ZHONGNAN_Q01_QUEST_ID)],
  },

  scene_zn_q01_02: {
    id: 'scene_zn_q01_02',
    title: '第二幕 · 吐纳玄机',
    subtitle: '重阳主殿 · 传功解义',
    mandatory: true,
    beats: [
      S('NPC-1056', '（执拂尘在空中虚画太极）“听好了——‘大道初修在呼吸，气沉丹田意莫急；尾闾中正神贯顶，松风鹤影自相依。’全真内功讲究先慢后快，切忌如外道般急躁催逼。”'),
      S('NPC-1054', '“你且闭目凝神，随贫道引气过关，走一遍小周天！”'),
    ],
    onFinishEffects: [openScene('scene_zn_q01_03', ZHONGNAN_Q01_QUEST_ID)],
  },

  scene_zn_q01_03: {
    id: 'scene_zn_q01_03',
    title: '第三幕 · 气行周天',
    subtitle: '重阳主殿 · 初得内息',
    mandatory: true,
    beats: [
      N('你依歌诀调整呼吸，只觉一丝温润如春泉的真气自丹田缓缓升起，沿脊柱尾闾直上玉枕，复归下丹田，四肢百骸顿觉轻健无比！'),
      P('（睁眼吐出一口浊气，欣喜稽首）“多谢两位师兄传功！方才那一缕真气游走全身，浑身说不出的舒泰！”'),
    ],
    choices: [
      {
        id: 'zn_q01_learn_song',
        label: '铭记歌诀 · 习得《全真大道筑基歌》',
        tone: 'gold',
        effects: [
          { type: 'teachMartialArt', artId: 'MA-142', level: 1, autoEquip: true },
          { type: 'modifySkill', key: '经义', delta: 1 },
          openScene('scene_zn_q01_04', ZHONGNAN_Q01_QUEST_ID),
        ],
      },
    ],
  },

  scene_zn_q01_04: {
    id: 'scene_zn_q01_04',
    title: '第四幕 · 急报入殿',
    subtitle: '重阳主殿 · 丘慧霜惊呼',
    mandatory: true,
    beats: [
      N('晨课方毕，殿门外忽传来一阵急促脚步声。身材矫健的师姐丘慧霜提着一柄断斧奔入殿中，额角满是汗珠。'),
      S('NPC-0514', '“大师兄、二师兄！不好了！后山银练飞瀑东坡窜来一伙陇右马贼，正带着大锯利斧盗伐祖师当年手植的百年青柏！”'),
      S('NPC-1056', '（剑眉一竖）“好大胆的贼子！竟敢把主意打到终南灵木头上！”'),
    ],
    onFinishEffects: [openScene('scene_zn_q01_05', ZHONGNAN_Q01_QUEST_ID)],
  },

  scene_zn_q01_05: {
    id: 'scene_zn_q01_05',
    title: '第五幕 · 谭师兄请缨',
    subtitle: '重阳主殿 · 遣将护林',
    mandatory: true,
    beats: [
      N('话音未落，殿角大步走出一名臂膀粗壮的师兄——正是以铁臂闻名外门的谭坤朗。'),
      S('NPC-0649', '“大师兄，这等毛贼何劳二位尊长亲动？我带新入门的{gender:师弟|师妹}走一趟银练飞瀑，顺便让{gender:他|她}拿新学的道歌与剑法练练手！”'),
      S('NPC-1054', '（略一沉吟，温言嘱托）“甚好。只是贼众凶悍，切记以护柏驱贼为先，莫要逞匹夫之勇。”'),
    ],
    onFinishEffects: [openScene('scene_zn_q01_06', ZHONGNAN_Q01_QUEST_ID)],
  },

  scene_zn_q01_06: {
    id: 'scene_zn_q01_06',
    title: '第六幕 · 提剑赴涧',
    subtitle: '山道疾行 · 驰援银练飞瀑',
    mandatory: true,
    beats: [
      S('NPC-0649', '“走吧，{gender:师弟|师妹}！趁他们还没把那株老柏锯倒，咱们抄近道赶去银练飞瀑！”'),
      P('“师兄先行，弟子紧随其后！”'),
    ],
    choices: [
      {
        id: 'zn_q01_go_falls',
        label: '提剑下坡 · 随谭坤朗赶赴银练飞瀑',
        tone: 'gold',
        effects: [
          { type: 'startQuest', questId: ZHONGNAN_Q01_QUEST_ID, stepId: 'falls_bandit_intercept' },
          setStep(ZHONGNAN_Q01_QUEST_ID, 'falls_bandit_intercept'),
          toast('已习得《全真大道筑基歌》！请速赴【终南后山寒玉涧 · 银练飞瀑清泉石茗案】截击马贼！', 'talk', '飞瀑护柏'),
        ],
      },
    ],
  },

  scene_zn_q01_07: {
    id: 'scene_zn_q01_07',
    title: '第七幕 · 斧锯惊林',
    subtitle: '终南后山寒玉涧 · 银练飞瀑',
    illustrationUrl: '/assets/quests/zn_q01_falls_bandits.jpg',
    illustrationCaption: '飞瀑护柏 · 银练飞瀑旁水雾漫天，双贼挥斧截路',
    mandatory: true,
    beats: [
      N('甫近银练飞瀑，震耳水声中夹杂着刺耳的拉锯声与吆喝声。五六名蒙面马贼正围着一株需三人合抱的百年青柏疯狂砍锯，木屑纷飞！'),
      S('NPC-0649', '（大喝一声，阔步冲入外围）“贼子住手！外围小喽啰归我缠住，{gender:师弟|师妹}，那两个挥斧的头目交给你了！”'),
      S(SPEAKER_RAIDER_BOSS, '（吐掉草根，狞笑提刀）“哟呵，就凭个毛头小道士也敢一挑二？麻子，并肩子上，别耽误装车！”'),
    ],
    onFinishEffects: [openScene('scene_zn_q01_08', ZHONGNAN_Q01_QUEST_ID)],
  },

  scene_zn_q01_08: {
    id: 'scene_zn_q01_08',
    title: '第八幕 · 孤剑独挡',
    subtitle: '银练飞瀑 · 一对二迎战马贼',
    mandatory: true,
    beats: [
      N('你深吸一口气，暗运《全真大道筑基歌》，只觉丹田暖流奔涌至剑尖，原本略显生涩的入门十三剑顿时轻灵了三分！'),
      P('“终南灵柏岂容尔等染指！看剑！”'),
    ],
    choices: [
      {
        id: 'zn_q01_fight_raiders',
        label: '运使道歌 · 一对二击退陇右马贼',
        tone: 'danger',
        effects: [
          { type: 'healPlayer', hpPct: 100, mpPct: 100 },
          {
            type: 'startCombat',
            questId: ZHONGNAN_Q01_QUEST_ID,
            opponent: { kind: 'custom', npc: buildLongyouRaiderBoss() },
            extraOpponents: [{ kind: 'custom', npc: buildLongyouRaiderAxe() }],
            rule: 'story_trial',
            forbidEscapeReason: '古柏就在身后，岂容马贼得逞！',
            introText: '黑风胡六与锯木麻子左右夹击，刀斧并举扑来！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              openScene('scene_zn_q01_09', ZHONGNAN_Q01_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 60, mpPct: 60 },
              warn('双拳难敌四手，谭坤朗及时挥刀替你解围。请整顿内息再战！', '飞瀑护柏'),
            ],
          },
        ],
      },
    ],
  },

  scene_zn_q01_09: {
    id: 'scene_zn_q01_09',
    title: '第九幕 · 贼众溃逃',
    subtitle: '银练飞瀑 · 护住灵木',
    mandatory: true,
    beats: [
      N('你剑走中宫，借道歌内息连绵不绝之势，先挑飞锯木麻子的大斧，再一剑拍在黑风胡六肩头！胡六吃痛惨叫，见外围同伙也已被谭坤朗打得东倒西歪，只得吹响口哨，丢下绳索锯齿仓皇逃入深谷。'),
      S('NPC-0649', '（收刀大笑，重重拍了拍你肩膀）“痛快！真没想到{gender:师弟|师妹}刚得大道筑基歌，便能在水雾滑石上稳稳以一敌二！”'),
    ],
    onFinishEffects: [openScene('scene_zn_q01_10', ZHONGNAN_Q01_QUEST_ID)],
  },

  scene_zn_q01_10: {
    id: 'scene_zn_q01_10',
    title: '第十幕 · 异香残牌',
    subtitle: '银练飞瀑 · 拾获线索',
    mandatory: true,
    beats: [
      N('你上前查看古柏伤处，幸好只锯入寸许，以泥封护尚可复生。忽然，你在贼人丢下的工具筐里摸出一块沾着怪异腥香的木牌。'),
      S('NPC-0514', '（赶来接应，接过木牌细嗅片刻，面色微变）“这股腥甜味……怎的像西域星宿海配制的迷烟？寻常陇右马贼哪来这等门道，莫非有人暗中指使他们骚扰终南？”'),
    ],
    onFinishEffects: [openScene('scene_zn_q01_11', ZHONGNAN_Q01_QUEST_ID)],
  },

  scene_zn_q01_11: {
    id: 'scene_zn_q01_11',
    title: '第十一幕 · 携证回观',
    subtitle: '山道返程 · 禀报师长',
    mandatory: true,
    beats: [
      S('NPC-0649', '“事不宜迟，咱们把这块腥香木牌带回重阳主殿，请大师兄与二师兄定夺！”'),
      P('“好，这就回殿复命！”'),
    ],
    choices: [
      {
        id: 'zn_q01_return_hall',
        label: '收好木牌 · 返回重阳玄门清修主殿复命',
        tone: 'gold',
        effects: [
          setStep(ZHONGNAN_Q01_QUEST_ID, 'hall_report_back'),
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0649' }, delta: 8 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0514' }, delta: 8 },
          toast('请返回【重阳玄门清修主殿】向马钰玄、刘处静复命。', 'talk', '飞瀑护柏'),
        ],
      },
    ],
  },

  scene_zn_q01_12: {
    id: 'scene_zn_q01_12',
    title: '第十二幕 · 呈牌议事',
    subtitle: '重阳玄门清修主殿 · 复命',
    mandatory: true,
    beats: [
      N('回到主殿，你将银练飞瀑击退盗柏马贼的经过与那块腥香木牌一并呈上。马钰玄与刘处静对视一眼，神色俱是一凛。'),
      S('NPC-1054', '“前日星宿童子刚在长安草堂滋事，今日便有马贼携腥香木牌来犯后山……看来西域宵小正在长安与秦岭间暗设眼线，窥伺我终南虚实。”'),
    ],
    onFinishEffects: [openScene('scene_zn_q01_13', ZHONGNAN_Q01_QUEST_ID)],
  },

  scene_zn_q01_13: {
    id: 'scene_zn_q01_13',
    title: '第十三幕 · 嘉奖勤修',
    subtitle: '重阳主殿 · 道气初成',
    mandatory: true,
    beats: [
      S('NPC-1056', '（缓和神色，含笑颔首）“贼人之谋，师兄们自会飞书通知长安草堂留意。至于你今日临危不乱、护柏有功，且将新授的《全真大道筑基歌》用得颇为纯熟，理当嘉奖！”'),
      S('NPC-1054', '“赐你门派贡献与盘缠银两，回去好生温习内息。若长安草堂传来异讯，少不得还要劳你下山走一遭。”'),
    ],
    onFinishEffects: [openScene('scene_zn_q01_14', ZHONGNAN_Q01_QUEST_ID)],
  },

  scene_zn_q01_14: {
    id: 'scene_zn_q01_14',
    title: '第十四幕 · 鹤鸣云外',
    subtitle: '重阳古观 · 筑基圆满',
    mandatory: true,
    beats: [
      N('日影渐高，殿前古柏青翠欲滴。你轻按剑柄，丹田内《全真大道筑基歌》的温润真气绵绵流转，已真正踏入终南玄门堂奥的第一步。'),
      P('“弟子谨遵师兄教诲，定当勤修不辍！”'),
    ],
    choices: [
      {
        id: 'zn_q01_complete',
        label: '稽首谢恩 · 完成大道筑基试炼',
        tone: 'gold',
        effects: [
          { type: 'addSectContribution', amount: 45 },
          { type: 'giveSilver', amount: 30, reason: '终南护柏嘉奖' },
          { type: 'giveCombatExp', amount: 240, reason: '完成《松风鹤影 · 大道筑基》' },
          { type: 'modifyRenown', delta: 8, reason: '终南飞瀑护柏驱贼' },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-1054' }, delta: 8 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-1056' }, delta: 8 },
          { type: 'completeQuest', questId: ZHONGNAN_Q01_QUEST_ID, outcome: 'protected_cypress' },
          toast('完成《松风鹤影 · 大道筑基》，收获历练与银两！', 'success', '大道筑基'),
        ],
      },
    ],
  },
}
