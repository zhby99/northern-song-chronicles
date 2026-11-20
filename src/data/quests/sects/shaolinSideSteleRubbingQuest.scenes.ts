import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, setStep, toast } from '../../../engine/quest/dsl'
import { SHAOLIN_SIDE02_QUEST_ID } from './shaolinSideSteleRubbingQuest'

const SPEAKER_MERCHANT: StorySpeakerSpec = {
  kind: 'custom',
  name: '贾文赝',
  title: '洛阳黑市书商',
  factionName: '黑市牙商',
  portraitUrl: '/assets/characters/templates/tpl_song_scholar_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_song_scholar_av.jpg',
}

const SPEAKER_IRON_BEAR: StorySpeakerSpec = {
  kind: 'custom',
  name: '铁背熊',
  title: '黑市书商贴身护院',
  factionName: '洛阳恶奴',
  portraitUrl: '/assets/characters/templates/tpl_greenwood_hero_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_greenwood_hero_av.jpg',
}

function buildIronBackBear(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLS02_IRON_BEAR',
    name: '铁背熊',
    title: '黑市书商护院 · 铁掌恶奴',
    realm: '三流中品',
    factionName: '洛阳恶奴',
    sectRank: 0,
    sectRankLabel: '恶奴护院',
    avatarUrl: '/assets/characters/templates/tpl_greenwood_hero_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_greenwood_hero_fb.jpg',
    talk: '“秃驴少管闲事！我家东家出大价钱要这幅唐代武僧拓本，识相的乖乖让开，免得吃爷爷一记铁砂掌！”',
    stats: { hp: 660, mp: 320, agi: 31, res: 21 },
    talents: { bone: 58, comprehension: 38, charm: 24 },
    equippedArts: {
      neigong: 'MA-229',
      qinggong: 'MA-218',
      move1: 'MA-186',
      move2: 'MA-209',
      move3: 'MA-204',
    },
    learnedArts: [
      { artId: 'MA-229', level: 4 },
      { artId: 'MA-218', level: 3 },
      { artId: 'MA-186', level: 4 },
      { artId: 'MA-209', level: 3 },
      { artId: 'MA-204', level: 3 },
    ],
  })
}

function buildMerchantThug(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLS02_THUG',
    name: '刁蛮家丁',
    title: '黑市书商随从打手',
    realm: '三流下品',
    factionName: '洛阳恶奴',
    sectRank: 0,
    sectRankLabel: '随从打手',
    avatarUrl: '/assets/characters/templates/tpl_greenwood_sect_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_greenwood_sect_fb.jpg',
    talk: '“熊爷，小的帮您按住这小和尚，东家那边已经把拓纸卷起来了！”',
    stats: { hp: 410, mp: 160, agi: 23, res: 13 },
    talents: { bone: 45, comprehension: 32, charm: 24 },
    equippedArts: { neigong: 'MA-199', qinggong: 'MA-218', move1: 'MA-189', move2: 'MA-204' },
    learnedArts: [
      { artId: 'MA-199', level: 3 },
      { artId: 'MA-218', level: 2 },
      { artId: 'MA-189', level: 3 },
      { artId: 'MA-204', level: 2 },
    ],
  })
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_sls02_01: {
    id: 'scene_sls02_01',
    title: '第一幕 · 残碑墨香',
    subtitle: '十八铜人罗汉堂 · 东庑碑帖武库院',
    mandatory: true,
    beats: [
      N('{reignYear}秋风穿廊，东庑碑帖武库院内古柏森然。云游僧净法正捧着一叠白芨水浸润过的宣纸与松烟拓包，立在一堵斑驳的唐代青砖壁画前轻声叹息。'),
      S('NPC-0918', '（见你走近，合十施礼）“阿弥陀佛。贫僧游历天下名刹，最惜古碑残刻。东庑这几方唐初少林武僧演武砖雕历时四百载，风化剥落甚重，再不细心墨拓存档，拳棍招式线条便要永远湮没了。”'),
      S('NPC-0918', '“闻听师弟平日勤习书画、手腕沉稳有度，不知可愿助贫僧一臂之力，将这唐代武僧演武砖雕完整拓印修补？”'),
    ],
    onFinishEffects: [openScene('scene_sls02_02', SHAOLIN_SIDE02_QUEST_ID)],
  },

  scene_sls02_02: {
    id: 'scene_sls02_02',
    title: '第二幕 · 欣然应托',
    subtitle: '东庑碑帖武库院',
    mandatory: true,
    beats: [
      P('（细察青砖上刚劲古朴的拳影与棍势，心中顿生敬意）“此乃本寺先贤留下的珍贵武学遗迹！弟子虽才疏学浅，愿竭力协助净法师兄完成墨拓！”'),
      S('NPC-0918', '（喜上眉梢）“善哉！拓碑讲究『轻捶入纹、匀墨显骨』，与运劲控力实有异曲同工之妙。咱们趁着天色尚明，这就动手吧！”'),
    ],
    choices: [
      {
        id: 'sls02_accept',
        label: '挽袖研墨，助净法修拓唐代少林武僧演武砖雕',
        tone: 'gold',
        effects: [
          { type: 'startQuest', questId: SHAOLIN_SIDE02_QUEST_ID, stepId: 'stele_rubbing_guard' },
          setStep(SHAOLIN_SIDE02_QUEST_ID, 'stele_rubbing_guard'),
          toast(
            '已接下东庑拓碑之托！请于【东庑碑帖武库院（sl_luohan_west）】助净法完成墨拓。',
            'talk',
            '东庑拓碑',
          ),
        ],
      },
    ],
  },

  scene_sls02_03: {
    id: 'scene_sls02_03',
    title: '第三幕 · 墨拓唐雕',
    subtitle: '东庑碑帖武库院 · 砖雕长廊',
    illustrationUrl: '/assets/quests/sl_s02_stele_rub.jpg',
    illustrationCaption: '东庑碑院 · 净法携墨拓修补唐代武僧演武砖雕',
    mandatory: true,
    beats: [
      N('你与净法默契配合：先以棕刷轻拂砖缝青苔，敷上湿润宣纸轻敲入凹，再以拓包蘸匀松烟淡墨，层层扑打。你凭借扎实书画功底，手腕沉稳如悬针，竟将剥落半寸的衣袂与棍影纹理一一还原如初！'),
      N('随着乌黑墨色渐次分明，纸面上赫然现出两幅气韵生动的古图：左幅武僧沉腰坐马、拳势如伏虎降魔；右幅武僧持棍斜劈、棍影如齐眉横扫——拳棍相生、浑然一体！'),
      S('NPC-0918', '（抚纸惊叹）“妙极！师弟下墨匀净、笔意通灵，比贫僧独拓精细何止一筹！待这最后半幅晾干，便大功告成了！”'),
    ],
    onFinishEffects: [openScene('scene_sls02_04', SHAOLIN_SIDE02_QUEST_ID)],
  },

  scene_sls02_04: {
    id: 'scene_sls02_04',
    title: '第四幕 · 碑影窥贼',
    subtitle: '东庑碑帖武库院 · 暮色暗涌',
    mandatory: true,
    beats: [
      N('正值夕阳西沉、众僧赴斋堂用晚膳之际，东庑院门忽被轻轻推开。一名身着绸衫、贼眉鼠眼的中年书商带着一名铁塔般的壮汉与家丁闪身而入，直奔晾架上的新拓古卷！'),
      S(SPEAKER_MERCHANT, '（搓手窃笑，伸手便去揭架上未干的唐碑拓本）“嘿嘿，老子在洛阳黑市打听半年了！这唐初少林武僧砖雕原拓转手卖给汴梁贵人，少说值三百贯！顺手再拿铁凿抠两块残砖带走……”'),
      S('NPC-0918', '（大惊失色，急忙上前阻拦）“施主住手！此乃少林千年古物，怎可私盗凿毁！”'),
    ],
    onFinishEffects: [openScene('scene_sls02_05', SHAOLIN_SIDE02_QUEST_ID)],
  },

  scene_sls02_05: {
    id: 'scene_sls02_05',
    title: '第五幕 · 恶奴逞凶',
    subtitle: '东庑碑帖武库院',
    mandatory: true,
    beats: [
      N('黑市书商贾文赝一把推开手无缚鸡之力的净法，反手将拓本卷入怀中，冲身旁那名肩宽背厚、双掌黝黑如铁的壮汉尖声喝道：'),
      S(SPEAKER_MERCHANT, '“铁背熊！把这两个多管闲事的小和尚打趴下，莫叫他们喊来罗汉堂武僧！”'),
      S(SPEAKER_IRON_BEAR, '（狞笑一声，双掌一错发出沉闷骨鸣，拦在你身前）“小秃驴，识相的滚一边去！爷爷这对铁砂掌可不认什么佛门清规！”'),
      P('（扶住净法，横身挡在古碑之前，目光如电）“光天化日闯入少林盗拓毁碑，还敢行凶伤人！今日休想带走半片残纸！”'),
    ],
    onFinishEffects: [
      { type: 'setFlag', flag: 'sl_side02_bear_ready', value: true },
      openScene('scene_sls02_06', SHAOLIN_SIDE02_QUEST_ID),
    ],
  },

  scene_sls02_06: {
    id: 'scene_sls02_06',
    title: '第六幕 · 护碑迎敌',
    subtitle: '东庑碑帖武库院 · 逐恶之战',
    mandatory: true,
    beats: [
      N('铁背熊大吼一声踏步猛扑，铁砂掌劲裹挟恶风直击你胸口，随行刁蛮家丁亦持短刀自侧翼夹攻！你沉心静气，脑海中闪过方才唐代砖雕上的拳棍架势，慨然迎战！'),
    ],
    choices: [
      {
        id: 'sls02_fight_bear',
        label: '护碑迎敌，击退黑市书商护院铁背熊与随从打手（三流中品）',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            format: 'gauntlet',
            questId: SHAOLIN_SIDE02_QUEST_ID,
            opponent: { kind: 'custom', npc: buildIronBackBear() },
            extraOpponents: [{ kind: 'custom', npc: buildMerchantThug() }],
            rule: 'story_trial',
            forbidEscapeReason: '唐代古碑与净法师兄就在身后，绝不可退让一步！',
            introText:
              '【东庑护碑】迎战黑市书商贴身护院【铁背熊（三流中品）】与刁蛮家丁，夺回唐代武僧古拓！',
            onWin: [openScene('scene_sls02_07', SHAOLIN_SIDE02_QUEST_ID)],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast(
                '被铁背熊凶猛掌力震退半步！凝神调息后可在【东庑碑帖武库院】再战恶奴夺回拓本！',
                'warn',
                '东庑拓碑',
              ),
            ],
          },
        ],
      },
    ],
  },

  scene_sls02_07: {
    id: 'scene_sls02_07',
    title: '第七幕 · 护碑驱恶',
    subtitle: '东庑碑帖武库院',
    illustrationUrl: '/assets/quests/sl_s02_protect_stele.jpg',
    illustrationCaption: '护碑驱恶 · 逐退偷拓古碑恶奴，慧轮补授拳棍双全',
    mandatory: true,
    beats: [
      N('你步法稳如磐石，借碑廊石柱卸去铁背熊蛮横掌势，反手一击震开他护腕中门，将其重重掼倒在青砖地上！刁蛮家丁见势不妙转身欲逃，被你顺手点中麻穴动弹不得。'),
      N('黑市书商贾文赝吓得面无人色，怀中唐碑拓本滚落于地。此时一阵沉浑钟磬般的脚步声响起，大金刚僧慧轮率两名罗汉堂武僧大步赶到，将贼人尽数拿住！'),
      S('NPC-0254', '（目光如炬扫过全场，合十赞许）“好！方才听闻东庑异响便急步赶来，不想师弟孤身便已制伏恶奴、保住古碑与拓本丝毫无损！”'),
    ],
    onFinishEffects: [openScene('scene_sls02_08', SHAOLIN_SIDE02_QUEST_ID)],
  },

  scene_sls02_08: {
    id: 'scene_sls02_08',
    title: '第八幕 · 砖雕印证',
    subtitle: '东庑碑帖武库院',
    mandatory: true,
    beats: [
      N('净法连忙拾起完好无损的新拓古卷展开检查，喜极而泣地向慧轮细述你方才细心墨拓与舍身护碑之举。'),
      S('NPC-0918', '“慧轮师兄，若非师弟书画精细、武艺扎实，这四百载唐代武僧演武砖雕今日怕是要毁于奸商凿斧之下了！”'),
      S('NPC-0254', '（端详拓本上左拳右棍的古僧身姿，微微颔首）“唐代先贤遗刻最见本门『拳为棍母，棍为拳延』之真意。难得你既修笔墨丹青以养心性，又勤习外门功夫不堕根基。”'),
    ],
    onFinishEffects: [openScene('scene_sls02_09', SHAOLIN_SIDE02_QUEST_ID)],
  },

  scene_sls02_09: {
    id: 'scene_sls02_09',
    title: '第九幕 · 拳棍互补',
    subtitle: '东庑碑帖武库院',
    mandatory: true,
    beats: [
      S('NPC-0254', '“依外门旧例，弟子初入罗汉堂时须在《伏虎拳》与《少林齐眉棍》之间择一专修，免得贪多嚼不烂。然今日见你护碑有功、好学不倦，且已从唐雕之中窥得拳棍相通之理——”'),
      S('NPC-0254', '“贫僧便破例补授你当年未选的那一门少林良阶外门武学！拳棍相济、长短互补，他日闯木桩廊与行走江湖，必能如虎添翼！”'),
      P('（大喜过望，恭敬向慧轮与净法合十叩谢）“多谢慧轮师兄慈悲补授！多谢净法师兄提携！弟子定当勤加印证，不负唐碑先贤遗志！”'),
    ],
    onFinishEffects: [openScene('scene_sls02_10', SHAOLIN_SIDE02_QUEST_ID)],
  },

  scene_sls02_10: {
    id: 'scene_sls02_10',
    title: '第十幕 · 艺武双全',
    subtitle: '东庑碑帖武库院 · 满院墨香',
    mandatory: true,
    beats: [
      N('慧轮就着廊下清冷月色，指着唐代砖雕上的起承转合，将另一门少林良阶外门功法的步法、发劲与变招逐一拆解演练。你一边观摩砖雕拓本、一边随势演练，只觉平日滞涩之处豁然贯通！'),
      N('此役不仅令你书画造诣更进一层，更补全了少林外门拳棍双修之基！'),
    ],
    choices: [
      {
        id: 'sls02_complete',
        label: '合十领受慧轮补授武学，圆满完成东庑拓碑护院之功！',
        tone: 'gold',
        effects: [
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q02_choice', op: 'eq', value: 'fist' },
            thenEffects: [
              { type: 'teachMartialArt', artId: 'MA-153' },
              toast(
                '慧轮破例补授少林良阶棍法《少林齐眉棍》，达成外门拳棍双修！',
                'success',
                '拳棍双修',
              ),
            ],
            elseEffects: [
              { type: 'teachMartialArt', artId: 'MA-143' },
              toast(
                '慧轮破例补授少林良阶拳法《伏虎拳》，达成外门拳棍双修！',
                'success',
                '拳棍双修',
              ),
            ],
          },
          { type: 'modifySkill', key: '书', delta: 1 },
          { type: 'modifySkill', key: '画', delta: 1 },
          { type: 'giveCombatExp', amount: 100, reason: '东庑护碑逐退恶奴实战历练' },
          { type: 'addSectContribution', amount: 40 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0918' }, delta: 12 },
          { type: 'modifyRenown', delta: 20, reason: '完成门派差事《东庑拓碑 · 拳棍双修》' },
          { type: 'completeQuest', questId: SHAOLIN_SIDE02_QUEST_ID, outcome: 'completed' },
          toast('东庑拓碑护院圆满成功！书、画造诣精进，获净法与慧轮盛赞！', 'success', '东庑拓碑'),
        ],
      },
    ],
  },
}
