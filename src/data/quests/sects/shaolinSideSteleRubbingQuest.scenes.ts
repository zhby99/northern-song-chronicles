import type { NodeNpc } from '../../../types/game'
import type { QuestEffect, StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
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

const SPEAKER_THUG: StorySpeakerSpec = {
  kind: 'custom',
  name: '刁蛮家丁',
  title: '黑市书商随从打手',
  factionName: '洛阳恶奴',
  portraitUrl: '/assets/characters/templates/tpl_greenwood_sect_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_greenwood_sect_av.jpg',
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
    talk: '“秃驴少管闲事！我家东家出大价钱要这幅唐代武僧孤拓，识相的乖乖让开，免得吃爷爷一记铁砂掌！”',
    stats: { hp: 660, mp: 320, agi: 31, res: 21 },
    talents: { bone: 58, comprehension: 38, charm: 24 },
    equippedArts: { neigong: 'MA-238', move1: 'MA-186', move2: 'MA-209' },
    learnedArts: [
      { artId: 'MA-238', level: 4 },
      { artId: 'MA-186', level: 4 },
      { artId: 'MA-209', level: 3 },
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
    equippedArts: { neigong: 'MA-199', move1: 'MA-189', move2: 'MA-204' },
    learnedArts: [
      { artId: 'MA-199', level: 3 },
      { artId: 'MA-189', level: 3 },
      { artId: 'MA-204', level: 2 },
    ],
  })
}

function addKarmaOnce(
  guardFlag: string,
  karmaFlag: 'sl_zen_merit' | 'sl_karma_wrath',
  delta: number,
): QuestEffect {
  return {
    type: 'branch',
    condition: { type: 'flag', flag: guardFlag, op: 'truthy' },
    thenEffects: [],
    elseEffects: [
      { type: 'setFlag', flag: guardFlag, value: true },
      { type: 'addFlagNumber', flag: karmaFlag, delta },
    ],
  }
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_sls02_01: {
    id: 'scene_sls02_01',
    title: '第一幕 · 残碑墨香 · 南麓回响',
    subtitle: '十八铜人罗汉堂 · 东庑碑帖武库院',
    mandatory: true,
    beats: [
      N('{reignYear}秋风穿廊，东庑碑帖武库院内古柏森然。云游僧净法正捧着一叠白芨水浸润过的宣纸与松烟拓包，立在一堵斑驳的唐代青砖演武壁画前轻声叹息。'),
      S('NPC-0918', '（见你走近，合十含笑施礼）“阿弥陀佛。贫僧久闻{ifFlagEq:sl_q02_choice=fist|你当日南麓赤手入人群擒霸|你当日南麓挥白蜡长棍封桥止争}，不但外门功夫扎实，平日亦勤习书画笔墨。”'),
      S('NPC-0918', '“东庑这几方唐初武僧演武砖雕历时四百载，风化剥落甚重，再不细心墨拓存档，先贤拳棍线条便要永远湮没。不知{gender:师弟|师妹}可愿搭把手，与贫僧同修此碑拓本？”'),
      P('（凝目望向青砖上古朴遒劲的左拳右棍雕影，心神一动）“此乃本寺先贤留下的珍贵武学遗迹，弟子义不容辞！”'),
    ],
    choices: [
      {
        id: 'sls02_accept_calligraphy',
        label: '【悬腕笔意 · 细拓唐碑】请以书画控腕之法匀墨修补，护存古碑原貌',
        subLabel: '接下东庑拓碑之托，准备墨拓唐代武僧演武砖雕',
        tone: 'jade',
        effects: [
          { type: 'setFlag', flag: 'sl_s02_rub_focus', value: 'brush' },
          { type: 'startQuest', questId: SHAOLIN_SIDE02_QUEST_ID, stepId: 'stele_rubbing_guard' },
          setStep(SHAOLIN_SIDE02_QUEST_ID, 'stele_rubbing_guard'),
          toast(
            '已接下东庑拓碑之托！请于【东庑碑帖武库院（sl_luohan_west）】助净法完成墨拓。',
            'talk',
            '东庑拓碑',
          ),
        ],
      },
      {
        id: 'sls02_accept_martial',
        label: '【以武观雕 · 参悟拳棍】欣然应托，更盼借墨拓细参古雕拳棍相通之理',
        subLabel: '接下东庑拓碑之托，准备墨拓唐代武僧演武砖雕',
        tone: 'gold',
        effects: [
          { type: 'setFlag', flag: 'sl_s02_rub_focus', value: 'martial' },
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

  scene_sls02_02: {
    id: 'scene_sls02_02',
    title: '第二幕 · 墨拓唐雕 · 拳棍相生',
    subtitle: '东庑碑帖武库院 · 砖雕长廊',
    illustrationUrl: '/assets/quests/sl_s02_stele_rub.jpg',
    illustrationCaption: '东庑碑院 · 净法携墨拓修补唐代武僧演武砖雕',
    mandatory: true,
    beats: [
      N('你与净法默契配合：先以棕刷轻拂砖缝青苔，敷上白芨水润透的宣纸轻捶入凹，再以拓包蘸匀松烟墨，层层扑打。拓碑讲究「轻捶入纹、匀墨显骨」，倒与运劲吐纳异曲同工。'),
      N('随着墨色渐次分明，纸面上赫然现出两幅气韵生动的古图：左幅武僧沉腰坐马、拳势如猛虎降魔；右幅武僧持棍斜劈、棍影如白虹横扫——{ifFlagEq:sl_q02_choice=fist|你凝视右幅凌厉棍势，竟觉与平日所练外门拳架腰马转折隐隐相通！|你凝视左幅雄浑拳架，竟觉与平日所练外门长棍步法沉桩暗合为一！}'),
      S('NPC-0918', '（抚纸惊叹）“妙极！{gender:师弟|师妹}手腕沉稳如悬针，这最后一遍上墨收锋，是取薄墨留白存其古韵，还是浓墨重拓以彰招式筋骨？”'),
    ],
    choices: [
      {
        id: 'sls02_rub_fine',
        label: '【蝉翼薄墨 · 留白存神】层层淡扑，将唐砖刀凿斑驳与衣袂气韵纤毫毕现',
        subLabel: '精工传神，深契净法护古之心（禅心慈悲 +1）',
        tone: 'jade',
        effects: [
          { type: 'setFlag', flag: 'sl_s02_rub_style', value: 'fine' },
          addKarmaOnce('sl_s02_rub_karma_done', 'sl_zen_merit', 1),
          openScene('scene_sls02_03', SHAOLIN_SIDE02_QUEST_ID),
        ],
      },
      {
        id: 'sls02_rub_bold',
        label: '【乌金重墨 · 凸显招脉】着重勾勒武僧发力轴线与步位，留供后辈习武印证',
        subLabel: '刚健鲜明，武学脉络一目了然',
        tone: 'gold',
        effects: [
          { type: 'setFlag', flag: 'sl_s02_rub_style', value: 'bold' },
          openScene('scene_sls02_03', SHAOLIN_SIDE02_QUEST_ID),
        ],
      },
    ],
  },

  scene_sls02_03: {
    id: 'scene_sls02_03',
    title: '第三幕 · 黑商闯院 · 假拓暗手',
    subtitle: '东庑碑帖武库院 · 暮色暗涌',
    mandatory: true,
    beats: [
      N('夕阳西沉、众僧赴斋堂用晚膳之际，东庑院门忽被粗暴推开！一名身着绸衫、贼眉鼠眼的中年书商大摇大摆步入，身后跟着铁塔般的壮汉「铁背熊」与提着油纸包袱的刁蛮家丁。'),
      S(SPEAKER_MERCHANT, '（亮出一纸墨迹浮躁的伪造「官府拓碑公凭」，伸手便去揭晾架上未干的唐碑新拓）“两位小师傅辛苦啦！鄙人洛阳贾文赝，奉洛京贵人雅意来取这幅唐初武僧拓本——识相的让开，免得自讨苦吃！”'),
      S('NPC-0918', '（大惊失色上前阻拦，却被贾文赝一把推开）“施主休得胡言！本寺从未收过洛阳官府拓碑文书，此乃千年古物，怎容强夺！”'),
      N('你眼尖扫过那家丁怀里半敞的油纸包——除了粗劣拓纸与假朱印，竟赫然夹着一只蜡封瓷瓶，瓶口缝隙隐隐渗出刺鼻的绿矾硫酸酸雾！你瞬间省悟：这黑心书商不仅要强拓古碑，更图谋得手后泼洒硫酸腐液毁掉唐砖原刻，好叫他手里那张拓本变成天价「海内孤本」！'),
    ],
    onFinishEffects: [
      { type: 'setFlag', flag: 'sl_side02_bear_ready', value: true },
      openScene('scene_sls02_04', SHAOLIN_SIDE02_QUEST_ID),
    ],
  },

  scene_sls02_04: {
    id: 'scene_sls02_04',
    title: '第四幕 · 碑廊对峙 · 鉴伪抑硬撼',
    subtitle: '东庑碑帖武库院（破局二策）',
    mandatory: true,
    beats: [
      S(SPEAKER_MERCHANT, '（见你横身拦在古碑与晾架之间，眼神阴鸷，冲护院尖喝）“铁背熊！把这两个多管闲事的小和尚打趴下，莫叫他们喊来罗汉堂武僧！”'),
      S(SPEAKER_IRON_BEAR, '（双掌一错发出沉闷骨鸣，铁砂掌劲裹挟恶风逼近）“小秃驴，爷爷这对铁砂掌可不认什么佛门清规！”'),
      N('你扶稳净法，眼见铁背熊与家丁一左一右合围而来，心中转念已定应对之法——'),
    ],
    choices: [
      {
        id: 'sls02_tactic_expose',
        label: '【书画鉴伪 · 识破假拓毁碑手脚】当众点破伪印笔锋与暗夹硫酸腐液毁碑图谋！',
        subLabel: '惊退畏罪家丁，1v1 擒铁背熊（禅心慈悲 +2）',
        tone: 'jade',
        condition: {
          type: 'any',
          hint: '需十艺【书】≥ 30 或【画】≥ 25',
          conditions: [
            { type: 'skillAtLeast', key: '书', min: 30 },
            { type: 'skillAtLeast', key: '画', min: 25 },
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'sl_s02_tactic', value: 'expose' },
          addKarmaOnce('sl_s02_tactic_karma_done', 'sl_zen_merit', 2),
          openScene('scene_sls02_05_expose', SHAOLIN_SIDE02_QUEST_ID),
        ],
      },
      {
        id: 'sls02_tactic_brawl',
        label: '【护碑硬撼 · 拳棍逐恶】莫与毁碑奸商废话，横身挡在唐雕前连战恶奴！',
        subLabel: '零门槛车轮连战刁蛮家丁与铁背熊（怒目杀业 +1）',
        tone: 'danger',
        effects: [
          { type: 'setFlag', flag: 'sl_s02_tactic', value: 'brawl' },
          addKarmaOnce('sl_s02_tactic_karma_done', 'sl_karma_wrath', 1),
          openScene('scene_sls02_05_brawl', SHAOLIN_SIDE02_QUEST_ID),
        ],
      },
    ],
  },

  scene_sls02_05_expose: {
    id: 'scene_sls02_05_expose',
    title: '第五幕 · 揭破腐液 · 独擒铁熊',
    subtitle: '东庑碑帖武库院 · 1v1 逐恶之战',
    mandatory: true,
    beats: [
      P('（冷笑一声，抬手指点贾文赝手中假公凭与家丁怀中瓷瓶，朗声喝道）“好个赝品牙商！官府朱印素以九叠篆阴刻，你这假印起笔浮滑、朱砂掺铅已露马脚；更歹毒的是你家丁袖中暗藏绿矾硫酸腐液，分明想强拓之后浇毁唐碑原刻，好把偷来的拓本炒成孤本！”'),
      N('你脚尖挑起一块碎砖啪地击飞家丁油纸包，那只绿釉瓷瓶滚落青砖，渗出的半滴腐液竟把石缝青苔滋滋蚀得焦黑冒烟！'),
      S(SPEAKER_THUG, '（吓得面无人色，扑通跪倒又连滚带爬往门外逃窜）“天爷啊！毁皇家敕封古刹唐碑可是要刺配沙门岛的死罪！东家你坑死小的了，这差事小的不干了！”'),
      S(SPEAKER_IRON_BEAR, '（见帮凶吓跑、丑事彻底败露，凶性大发独自扑上）“跑了个脓包算什么！只要把你们灭口，老子照样带走拓本！纳命来！”'),
    ],
    choices: [
      {
        id: 'sls02_fight_bear_solo',
        label: '稳守唐碑，1v1 击退黑市护院【铁背熊】（三流中品）',
        subLabel: '刁蛮家丁已被惊退，专心正面制伏铁背熊',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: SHAOLIN_SIDE02_QUEST_ID,
            opponent: { kind: 'custom', npc: buildIronBackBear() },
            rule: 'story_trial',
            forbidEscapeReason: '唐代古碑与净法师兄就在身后，绝不可退让一步！',
            introText: '【东庑护碑 · 1v1 擒恶】独战黑市书商贴身护院【铁背熊（三流中品）】，夺回唐代武僧古拓！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              openScene('scene_sls02_06', SHAOLIN_SIDE02_QUEST_ID),
            ],
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

  scene_sls02_05_brawl: {
    id: 'scene_sls02_05_brawl',
    title: '第五幕 · 护碑迎敌 · 车轮逐恶',
    subtitle: '东庑碑帖武库院 · 车轮连战',
    mandatory: true,
    beats: [
      P('（横身挡在唐代砖雕之前，目光如电）“光天化日闯入少林盗拓毁碑，还敢夹带腐液伤古！今日休想带走半片残纸！”'),
      S(SPEAKER_THUG, '（狞笑拔出短刀自侧翼抢上）“熊爷压阵，小的先放倒这多管闲事的小和尚！”'),
      N('刁蛮家丁与铁背熊先后自碑廊石柱间扑杀而来！你脑海中闪过方才唐代砖雕上的拳棍架势，慨然迎敌！'),
    ],
    choices: [
      {
        id: 'sls02_fight_bear_gauntlet',
        label: '护碑迎敌，车轮连战刁蛮家丁与【铁背熊】（三流中品）',
        subLabel: '先后迎战刁蛮家丁（三流下品）与铁背熊（三流中品）',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            format: 'gauntlet',
            questId: SHAOLIN_SIDE02_QUEST_ID,
            opponent: { kind: 'custom', npc: buildMerchantThug() },
            extraOpponents: [{ kind: 'custom', npc: buildIronBackBear() }],
            rule: 'story_trial',
            forbidEscapeReason: '唐代古碑与净法师兄就在身后，绝不可退让一步！',
            introText:
              '【东庑护碑 · 车轮连战】迎战刁蛮家丁与黑市书商贴身护院【铁背熊（三流中品）】，夺回唐代武僧古拓！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              openScene('scene_sls02_06', SHAOLIN_SIDE02_QUEST_ID),
            ],
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

  scene_sls02_06: {
    id: 'scene_sls02_06',
    title: '第六幕 · 护碑驱恶 · 慧轮莅临',
    subtitle: '东庑碑帖武库院',
    illustrationUrl: '/assets/quests/sl_s02_protect_stele.jpg',
    illustrationCaption: '护碑驱恶 · 逐退偷拓古碑恶奴，慧轮补授拳棍双全',
    mandatory: true,
    beats: [
      N('你步法稳如磐石，借碑廊石柱卸去铁背熊蛮横铁砂掌势，反手切入中门震开其护腕，将其重重掼倒在青砖地上！贾文赝吓得面无人色，怀中唐碑拓本滚落于地，浑身筛糠般跪地求饶。'),
      N('恰在此时，一阵沉浑钟磬般的脚步声响起，大金刚僧慧轮率两名罗汉堂武僧疾步赶至，将瘫软的奸商与恶奴尽数拿住，并将那瓶险些毁碑的绿矾硫酸腐液妥善收缴作证。'),
      S('NPC-0918', '（连忙拾起完好无损的新拓古卷展开检查，喜极而泣）“慧轮师兄！{ifFlagEq:sl_s02_tactic=expose|若非师弟一眼识破奸商伪印与腐液毒计惊退帮凶，又孤身制伏恶奴|若非师弟舍身力退恶奴}，这四百载唐代武僧砖雕今日险些毁于一旦！”'),
      S('NPC-0254', '（目光如炬扫过全场，合十赞许）“好！既有护法之勇，又有惜古之明！净法师弟，这幅方才修拓成的唐碑珍本，却该归置何处？”'),
    ],
    onFinishEffects: [openScene('scene_sls02_07', SHAOLIN_SIDE02_QUEST_ID)],
  },

  scene_sls02_07: {
    id: 'scene_sls02_07',
    title: '第七幕 · 拓本归属 · 文脉流芳',
    subtitle: '东庑碑帖武库院（拓本抉择）',
    mandatory: true,
    beats: [
      N('廊下清风拂动宣纸，纸上唐代武僧的拳势棍影与题跋楷书如生。净法轻声道，原碑尚存东庑，日后随时可再复拓，只是眼前这幅倾注你二人心血的首拓精品，却有两处去向可选——'),
      S('NPC-0918', '“嵩山脚下乡学昨日托人来问，寒门子弟买不起名家字帖，苦无唐楷范本临摹；若将这幅首拓赠予乡学，足可惠及百余寒窗幼童。而本寺藏经院碑库亦盼将首拓装裱入匣，留待后世僧众研习。”'),
      S('NPC-0254', '（颔首微笑，将决断权交予你）“此幅首拓多半出自你笔墨手眼，又由你亲手自恶商爪下夺回——你且说，该当送往何处？”'),
    ],
    choices: [
      {
        id: 'sls02_dest_school',
        label: '【赠予嵩山乡学】赠与山下寒门子弟临摹唐楷习字，广结文脉善缘',
        subLabel: '泽被寒门，侠义与江湖声望更高（禅心慈悲 +1 · 侠义 +15）',
        tone: 'jade',
        effects: [
          { type: 'setFlag', flag: 'sl_s02_rubbing_dest', value: 'school' },
          addKarmaOnce('sl_s02_dest_karma_done', 'sl_zen_merit', 1),
          { type: 'modifyChivalry', delta: 15, reason: '将唐碑首拓赠予嵩山乡学供寒门子弟习字' },
          openScene('scene_sls02_08', SHAOLIN_SIDE02_QUEST_ID),
        ],
      },
      {
        id: 'sls02_dest_pavilion',
        label: '【收入藏经院碑库】妥帖装裱归藏本寺碑库，永保唐代先贤拳棍真迹',
        subLabel: '护持寺藏，获更高师门贡献嘉奖',
        tone: 'gold',
        effects: [
          { type: 'setFlag', flag: 'sl_s02_rubbing_dest', value: 'pavilion' },
          openScene('scene_sls02_08', SHAOLIN_SIDE02_QUEST_ID),
        ],
      },
    ],
  },

  scene_sls02_08: {
    id: 'scene_sls02_08',
    title: '第八幕 · 拳棍互补 · 艺武双全',
    subtitle: '东庑碑帖武库院 · 月下传功',
    mandatory: true,
    beats: [
      S('NPC-0254', '（朗声赞许）“善哉！{ifFlagEq:sl_s02_rubbing_dest=school|古碑真迹不藏密室而化育乡里寒门，正合佛门『法布施』大愿！|首拓归藏碑库，使唐代先贤武韵得以永续少林，护寺功莫大焉！}”'),
      S('NPC-0254', '“依外门旧例，弟子初入罗汉堂须在《伏虎拳》与《少林齐眉棍》之间择一专修。然你今日护碑有功、书画通灵，更已从唐雕中窥见『拳为棍母，棍为拳延』之理——贫僧便破例补授你当年未选的那一门少林良阶外门绝学！”'),
      N('慧轮就着廊下清冷月色，指着唐代砖雕上的起承转合，将{ifFlagEq:sl_q02_choice=fist|《少林齐眉棍》的扫、劈、挑、拨步法与劲道|《伏虎拳》的沉桩、伏按、崩捶与吐纳}逐一拆解演练。你随势印证，只觉平日滞涩之处豁然贯通，拳棍长短互补之境油然而生！'),
      P('（大喜过望，恭敬向慧轮与净法合十叩谢）“多谢慧轮师兄破例补授！多谢净法师兄提携！弟子定当勤修印证，不负先贤遗志！”'),
    ],
    choices: [
      {
        id: 'sls02_complete',
        label: '合十领受慧轮补授武学，圆满达成外门拳棍双修！',
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
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_s02_rubbing_dest', op: 'eq', value: 'pavilion' },
            thenEffects: [{ type: 'addSectContribution', amount: 65 }],
            elseEffects: [{ type: 'addSectContribution', amount: 40 }],
          },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0918' }, delta: 12 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0254' }, delta: 8 },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_s02_rubbing_dest', op: 'eq', value: 'school' },
            thenEffects: [
              {
                type: 'modifyRenown',
                delta: 30,
                reason: '完成门派差事《东庑拓碑 · 拳棍双修》并赠拓乡学',
              },
            ],
            elseEffects: [
              { type: 'modifyRenown', delta: 20, reason: '完成门派差事《东庑拓碑 · 拳棍双修》' },
            ],
          },
          { type: 'completeQuest', questId: SHAOLIN_SIDE02_QUEST_ID, outcome: 'completed' },
          toast('东庑拓碑护院圆满成功！书、画造诣精进，达成外门拳棍双修！', 'success', '东庑拓碑'),
        ],
      },
    ],
  },
}
