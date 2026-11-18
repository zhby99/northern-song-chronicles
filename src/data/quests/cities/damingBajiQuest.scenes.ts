import type { NodeNpc } from '../../../types/game'
import type { QuestEffect, StorySceneDef } from '../../../types/quest'
import { N, P, S, atStep, flag, setStep, warn, toast, openScene, makeQuestNpc } from '../../../engine/quest/dsl'
import { QUEST_ID } from './damingBajiQuest'

function buildTaihangScoundrelNpc(): NodeNpc {
  return makeQuestNpc({
    id: 'CUSTOM-DM-JIAO-SANFU',
    name: '焦三斧',
    title: '太行外围叛匪 · 受贿打手',
    realm: '三流中品',
    factionId: 'SECT-18',
    factionName: '太行败类',
    avatarUrl: '/assets/characters/templates/tpl_greenwood_sect_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_greenwood_sect_fb.jpg',
    stats: { hp: 340, mp: 180, agi: 44, res: 16 },
    talents: { bone: 52, comprehension: 36, charm: 30 },
    fullLocationLabel: '大名府 > 河北枪棒大校场 > 六合枪棒八角比武擂台',
    equippedArts: { neigong: 'MA-162', qinggong: 'MA-157', move1: 'MA-151' },
    learnedArts: [{ artId: 'MA-162', level: 2 }, { artId: 'MA-157', level: 2 }, { artId: 'MA-151', level: 2 }],
    equipped: { weapon: 'WPN-076', armor: 'ARM-047', shoes: 'BOT-022', bow: 'BOW-022', accessory1: 'ACC-043', accessory2: 'ACC-041', mount: 'MNT-021' },
    questBadgeLabel: '踢馆刺头',
    talk: '“沧州八极门算甚么东西？连二十箱生铁都看不住的窝囊废，还不快滚下八角擂台！”',
  })
}

function buildKhitanVanguardNpc(): NodeNpc {
  return makeQuestNpc({
    id: 'CUSTOM-DM-WUGUNAI',
    name: '乌古乃',
    title: '伪装辽东皮货商 · 契丹铁林先锋',
    realm: '三流巅峰',
    factionId: 'SECT-31',
    factionName: '契丹铁林暗桩',
    avatarUrl: '/assets/characters/templates/tpl_tubo_tribes_male_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_tubo_tribes_male_fb.jpg',
    stats: { hp: 560, mp: 260, agi: 52, res: 24 },
    talents: { bone: 64, comprehension: 48, charm: 36 },
    fullLocationLabel: '大名府 > 河北枪棒大校场 > 六合枪棒八角比武擂台',
    equippedArts: { neigong: 'MA-232', qinggong: 'MA-157', move1: 'MA-152', move2: 'MA-151' },
    learnedArts: [{ artId: 'MA-232', level: 3 }, { artId: 'MA-157', level: 2 }, { artId: 'MA-152', level: 3 }, { artId: 'MA-151', level: 3 }],
    equipped: { weapon: 'WPN-076', armor: 'ARM-045', shoes: 'BOT-022', bow: 'BOW-023', accessory1: 'ACC-045', accessory2: 'ACC-043', mount: 'MNT-021' },
    questBadgeLabel: '铁林先锋',
    talk: '“俺乃辽东白山脚下讨生活的行商，今日特来领教八极门斤两——接得住俺三合重斧再狂言守河！”',
  })
}

function buildYeluLieshanBossNpc(weakenedByFlaw: boolean): NodeNpc {
  return makeQuestNpc({
    id: weakenedByFlaw ? 'CUSTOM-DM-YELV-WEAK' : 'CUSTOM-DM-YELV-FULL',
    name: weakenedByFlaw ? '耶律裂山（破绽已露）' : '耶律裂山',
    title: '大辽北院铁林骁骑 · 暗桩千夫长',
    realm: weakenedByFlaw ? '三流上品' : '二流好手',
    factionId: 'SECT-31',
    factionName: '契丹铁林骁骑',
    avatarUrl: '/assets/characters/templates/tpl_khitan_warrior_fb.jpg',
    portraitUrl: '/assets/characters/templates/tpl_khitan_warrior_fb.jpg',
    stats: weakenedByFlaw ? { hp: 380, mp: 220, agi: 48, res: 16 } : { hp: 560, mp: 300, agi: 55, res: 22 },
    talents: { bone: 72, comprehension: 56, charm: 42 },
    fullLocationLabel: '大名府 > 北京留守行宫 > 河北防辽舆图沙盘阁',
    equippedArts: weakenedByFlaw
      ? {
          neigong: 'MA-232',
          qinggong: 'MA-246',
          move1: 'MA-152',
          move2: null,
          move3: null,
          move4: null,
        }
      : {
          neigong: 'MA-243',
          qinggong: 'MA-246',
          move1: 'MA-133',
          move2: 'MA-152',
          move3: null,
          move4: null,
        },
    learnedArts: weakenedByFlaw
      ? [
          { artId: 'MA-232', level: 2, exp: 0 },
          { artId: 'MA-246', level: 2, exp: 0 },
          { artId: 'MA-152', level: 2, exp: 0 },
        ]
      : [
          { artId: 'MA-243', level: 3, exp: 0 },
          { artId: 'MA-246', level: 2, exp: 0 },
          { artId: 'MA-133', level: 3, exp: 0 },
          { artId: 'MA-152', level: 2, exp: 0 },
        ],
    equipped: weakenedByFlaw
      ? {
          weapon: 'WPN-081', // 运河漕工铁头篙（凡阶中品·棍棒）
          armor: 'ARM-045', // 辽东鹿皮坎肩（凡阶中品）
          shoes: 'BOT-022', // 塞北羊皮靴（凡阶中品）
          bow: 'BOW-023', // 河东木胎弓（凡阶中品）
          accessory1: 'ACC-045', // 辽东野猪獠牙（凡阶中品）
          accessory2: 'ACC-043', // 粗皮护腕（凡阶中品）
          mount: 'MNT-021', // 太行绿林草上青（凡阶中品）
          curio1: null,
          curio2: null,
        }
      : {
          weapon: 'WPN-043', // 党项冷月弯刀（良阶中品）
          armor: 'ARM-025', // 塞北皮毛战袍（良阶中品）
          shoes: 'BOT-012', // 河东铁掌马靴（良阶中品）
          bow: 'BOW-012', // 辽东女真猎虎弓（良阶中品）
          accessory1: 'ACC-023', // 河东精铁护腕环（良阶中品）
          accessory2: 'ACC-026', // 镇远镖局铁镖令（良阶中品）
          mount: 'MNT-013', // 雁门塞外黄骠战马（良阶中品）
          curio1: null,
          curio2: null,
        },
    questBadgeLabel: '铁林统领',
    talk: weakenedByFlaw
      ? '“可恶！白日校场上竟被尔等看穿本座铁林旋风斧的换气旧创……即便如此，尔等休想留住本座！”'
      : '“五年前黄河渡口卢铁山碎我琵琶骨之仇，今夜便用大宋北京留守的防辽沙盘一并血偿！”',
  })
}

function buildKhitanSandtableGuardNpc(): NodeNpc {
  return makeQuestNpc({
    id: 'CUSTOM-DM-TIELIN-GUARD',
    name: '契丹铁林死士',
    title: '北院潜入重斧精锐',
    realm: '三流上品',
    factionId: 'SECT-31',
    factionName: '契丹铁林骁骑',
    avatarUrl: '/assets/characters/templates/tpl_khitan_warrior_fb.jpg',
    portraitUrl: '/assets/characters/templates/tpl_khitan_warrior_fb.jpg',
    stats: { hp: 420, mp: 220, agi: 46, res: 20 },
    talents: { bone: 62, comprehension: 42, charm: 32 },
    fullLocationLabel: '大名府 > 北京留守行宫 > 河北防辽舆图沙盘阁',
    equippedArts: { neigong: 'MA-232', qinggong: 'MA-246', move1: 'MA-152', move2: 'MA-151' },
    learnedArts: [{ artId: 'MA-232', level: 2 }, { artId: 'MA-246', level: 2 }, { artId: 'MA-152', level: 2 }, { artId: 'MA-151', level: 2 }],
    equipped: { weapon: 'WPN-081', armor: 'ARM-045', shoes: 'BOT-022', bow: 'BOW-023', accessory1: 'ACC-045', accessory2: 'ACC-043', mount: 'MNT-021' },
    questBadgeLabel: '铁林死士',
    talk: '“护住千夫长与《河北防辽舆图》，杀出沙盘阁！”',
  })
}

function buildClueGainEffects(clueFlag: string, clueSummaryToast: string): QuestEffect[] {
  return [
    { type: 'setFlag', flag: clueFlag, value: true },
    { type: 'addFlagNumber', flag: 'dm_clues_count', delta: 1 },
    {
      type: 'branch',
      condition: {
        type: 'all',
        conditions: [
          flag('dm_clues_count', 'gte', 2),
          atStep(QUEST_ID, 'investigate_clues'),
        ],
      },
      thenEffects: [
        setStep(QUEST_ID, 'present_to_jia'),
        toast(`${clueSummaryToast}（已握有两条以上铁证！可即刻赴【北京留守行宫 · 崇政议军正殿】禀报贾留守；若集齐全部三条铁证再呈堂，更有额外厚赏！）`, 'success', '铁锁查案'),
      ],
      elseEffects: [
        {
          type: 'branch',
          condition: flag('dm_clues_count', 'gte', 3),
          thenEffects: [
            toast(`${clueSummaryToast}（断口、黄册、夜哨三线铁证尽数合拢！速赴【崇政议军正殿】面谒贾留守！）`, 'success', '铁锁查案'),
          ],
          elseEffects: [
            toast(`${clueSummaryToast}（已获 1/2 必要线索，再寻得任意一条即可赴留守行宫呈禀！）`, 'talk', '铁锁查案'),
          ],
        },
      ],
    },
  ]
}

const SCENE_LEITAI_BOUT_TWO: StorySceneDef = {
  id: 'scene_dm_leitai_bout2',
  title: '第二幕 · 寒斧惊沙 · 铁林露峥嵘',
  subtitle: '河北枪棒大校场 · 六合枪棒八角比武擂台',
  illustrationUrl: '/assets/quests/daming_leitai_khitan_axes.jpg',
  illustrationCaption: '河北枪棒大校场八角擂台 · 契丹先锋乌古乃负双柄寒铁重斧踏碎青砖',
  mandatory: true,
  beats: [
    N('焦三斧狼狈滚落擂台，校场四面河北禁军轰然叫好。孰料喝彩未落，人群西北角忽有一名身披貂鼠皮袄、背负双柄寒铁短斧的虬髯大汉拔地跃起，足尖踏碎青砖，轰然落于八角台心！'),
    S({ name: '乌古乃', title: '辽东皮货行商（契丹铁林先锋）', factionName: '来历可疑', portraitUrl: '/assets/characters/templates/tpl_tubo_tribes_male_fb.jpg', avatarUrl: '/assets/characters/templates/tpl_tubo_tribes_male_av.jpg' }, '“好个沧州八极门，打几个太行毛贼算甚本事！俺乃辽东白山脚下行商乌古乃，久闻卢铁山五年前在黄河渡口威风八面，不知那只曾受过寒铁重创的右肩，今日还端得起六合大枪否？”'),
    S('NPC-0366', '“爹爹小心！五年前黄河渡口暗算爹爹右肩琵琶骨之事，唯有当年逃脱的契丹北院铁林骁骑知晓——这厮绝非寻常皮货商，定是来试探八极门虚实的辽狗先锋！”'),
    S('NPC-0275', '“哈哈哈哈！来得好！老夫这把老骨头，正愁春寒筋骨不开！少侠，高台之上贾相公双目如炬，这一阵，你欲亲自登台挫其凶焰，还是在台下为老夫掠阵观变？”'),
  ],
  choices: [
    {
      id: 'choice_bout2_fight_survive',
      label: '【登台硬撼】踏步抢入中宫，正面硬接这契丹先锋三合寒铁重斧！',
      subLabel: '开启 5 合生死擂（撑满 5 合或将其击倒即胜 · ⚠️ 战败将直接丧命！）',
      tone: 'primary',
      effects: [
        {
          type: 'startCombat',
          questId: QUEST_ID,
          opponent: { kind: 'custom', npc: buildKhitanVanguardNpc() },
          rule: 'survive_rounds',
          lethalOnLose: true,
          maxRounds: 3,
          forbidEscapeReason: '万军校场擂台之上，河北豪杰齐聚，岂可临阵退缩！',
          deathTitle: '血洒八角生死擂',
          deathDetail:
            '少侠于大名府河北枪棒大校场登八角生死擂迎战契丹铁林先锋乌古乃，未能撑满三合寒铁重斧猛劈，重创喋血擂台。',
          introText:
            '乌古乃双目凶光暴涨，两柄辽东寒铁重斧挟风雷之势劈面砸落——正是契丹铁林军破甲绝技！撑过三合逼出其北庭步法（生死擂台，败则丧命）！',
          onWin: [
            { type: 'healPlayer', hpPct: 60, mpPct: 60 },
            { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0275' }, delta: 25 },
            { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0028' }, delta: 15 },
            {
              type: 'setQuestStep',
              questId: QUEST_ID,
              stepId: 'midnight_sandtable',
              deadlineDays: null,
            },
            openScene('scene_dm_leitai_after_fight_win', 'QST-CITY-DAMING-BAJI'),
          ],
        },
      ],
    },
    {
      id: 'choice_bout2_spot_flaw',
      label: '【台下点破】慧眼看穿其「铁林旋风斩」旧创换气破绽，传音指点卢总馆主！',
      subLabel: '需先天悟性 ≥ 70 或 策论 ≥ 60 · 免战大破先锋并削弱终幕首领战力',
      tone: 'gold',
      condition: {
        type: 'any',
        hint: '需 先天悟性 ≥ 70 或 策论 ≥ 60',
        conditions: [
          { type: 'talentAtLeast', key: '悟性', min: 70 },
          { type: 'skillAtLeast', key: '策论', min: 60 },
        ],
      },
      effects: [
        { type: 'setFlag', flag: 'dm_axe_flaw_spotted', value: true },
        { type: 'giveCombatExp', amount: 40, reason: '点破契丹铁林旋风斩破绽' },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0275' }, delta: 25 },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0028' }, delta: 25 },
        {
          type: 'setQuestStep',
          questId: QUEST_ID,
          stepId: 'midnight_sandtable',
          deadlineDays: null,
        },
        openScene('scene_dm_leitai_flaw_broken', 'QST-CITY-DAMING-BAJI'),
      ],
    },
  ],
}

const SCENE_DAMING_VICTORY_CHOICE: StorySceneDef = {
  id: 'scene_dm_sandtable_victory_choice',
  title: '终幕 · 铁锁镇河朔 · 庙堂与江湖',
  subtitle: '北京留守行宫 · 河北防辽舆图沙盘阁',
  illustrationUrl: '/assets/quests/daming_baji_official_choice.jpg',
  illustrationCaption: '沙盘阁尘埃落定 · 贾昌朝执留守荐函与卢铁山擎六合浑铁枪共邀少侠择路',
  mandatory: true,
  beats: [
    N('一战功成，尘埃落定！契丹铁林千夫长耶律裂山重伤伏诛，其余死士尽数被亲军铁甲生擒；那吃里扒外的转运司蠹虫周文焕瘫软如泥，当场招认了半月前私卖二十箱磁州修埽生铁、截留三千贯省陌河银，并勾结辽谍断索毁迹、妄图盗献《河北防辽舆图》的滔天罪行！'),
    S('NPC-0727', '“禀留守相公、卢总馆主！卑职已自周贼私宅地窖起出三千贯原封河工官银，并亲自打开羁押室迎出崔帆坤教习！郭某先前迫于上峰钧令错押忠良，特向八极门诸位好汉赔罪！”'),
    S('NPC-0586', '“师父、师姐，还有这位仗义奔走的少侠……崔某在牢中听闻诸位在八角擂台与沙盘阁大破辽贼，纵死无憾！”'),
    S('NPC-0028', '“好一场『铁锁镇河朔』！老夫坐镇北京大名府，最患河防有蛀虫、边关藏豺狼。少侠既通文墨算略，又有雷霆胆魄，实乃国士之苗。老夫欲亲修《北京留守幕府举荐信》一封，保举少侠直入东京【开封府 / 六扇门】授第2阶【捕头都头】要职，为天子牧守四方！”'),
    S('NPC-0275', '“相公惜才，老夫亦不肯相让！少侠对沧州八极门有洗冤救徒之大恩——若少侠不慕朱紫官身、愿快意江湖，老夫今夜便开启分馆【千斤铁锁秘传室】，将压箱底的《六合大枪》与《大名六合浑铁枪》倾囊相授，破格奉少侠入我八极内堂！庙堂与江湖，全凭少侠一言而决！”'),
  ],
  choices: [
    {
      id: 'choice_ending_a_official_patronage',
      label: '【忠义入幕 · 河朔干城】拜领贾留守亲签举荐信，志在公门靖平天下！',
      subLabel:
        '获《北京留守幕府举荐信》（可直入或奉调【开封府/六扇门】第2阶捕头都头）+ 纹银 100 两 + 策论 +1',
      tone: 'gold',
      effects: [
        { type: 'giveItem', itemId: 'ITM-MSC-007', qty: 1 },
        { type: 'giveSilver', amount: 100, reason: '大名府破案赏银' },
        { type: 'modifySkill', key: '策论', delta: 1 },
        { type: 'modifyRenown', delta: 80, reason: '忠义入幕扬名河朔' },
        { type: 'modifyChivalry', delta: 80, reason: '护国安民大义' },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0028' }, delta: 35 },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0039' }, delta: 25 },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0727' }, delta: 25 },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0275' }, delta: 20 },
        {
          type: 'branch',
          condition: { type: 'inSect', sectId: 'SECT-23' },
          thenEffects: [{ type: 'addSectContribution', amount: 150 }],
        },
        { type: 'removeDynamicActor', questId: QUEST_ID },
        {
          type: 'completeQuest',
          questId: QUEST_ID,
          outcome: 'ending_official_patronage',
        },
        openScene('scene_dm_epilogue_official', 'QST-CITY-DAMING-BAJI'),
      ],
    },
    {
      id: 'choice_ending_b_baji_inheritance',
      label: '【铁锁横江 · 八极真传】婉谢官身入秘传室，受卢铁山亲授《六合大枪》！',
      subLabel:
        '习得《六合大枪》（第2重）+ 获良阶上品《大名六合浑铁枪》+ 战斗经验 +120 + 纹银 50 两 + 破格直入八极门内堂（或获《八极铁锁令》/200功绩）',
      tone: 'jade',
      effects: [
        { type: 'giveSilver', amount: 50, reason: '贾留守嘉勉赏银' },
        { type: 'teachMartialArt', artId: 'MA-116', level: 2 },
        { type: 'giveItem', itemId: 'WPN-035', qty: 1 },
        { type: 'giveCombatExp', amount: 120, reason: '千斤铁锁秘传室演武印证' },
        { type: 'modifyRenown', delta: 80, reason: '八极传薪名动河北' },
        { type: 'modifyChivalry', delta: 80, reason: '重义轻利守河朔' },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0028' }, delta: 20 },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0275' }, delta: 45 },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0366' }, delta: 35 },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0586' }, delta: 30 },
        {
          type: 'teleportPlayer',
          regionId: 'daming',
          buildingId: 'dm_baji',
          spotId: 'dm_baji_east',
        },
        {
          type: 'branch',
          condition: { type: 'inSect', sectId: 'SECT-23' },
          thenEffects: [{ type: 'addSectContribution', amount: 200 }],
          elseEffects: [
            {
              type: 'branch',
              condition: { type: 'notInAnySect' },
              thenEffects: [
                { type: 'joinSect', sectId: 'SECT-23', rank: 2 },
                {
                  type: 'branch',
                  condition: atStep('QST-SECT-23-REFERRAL'),
                  thenEffects: [
                    {
                      type: 'completeQuest',
                      questId: 'QST-SECT-23-REFERRAL',
                      outcome: 'joined_via_daming_heroics',
                      silent: true,
                    },
                  ],
                },
              ],
              elseEffects: [{ type: 'giveItem', itemId: 'ITM-MSC-008', qty: 1 }],
            },
          ],
        },
        { type: 'removeDynamicActor', questId: QUEST_ID },
        {
          type: 'completeQuest',
          questId: QUEST_ID,
          outcome: 'ending_baji_inheritance',
        },
        openScene('scene_dm_epilogue_baji', 'QST-CITY-DAMING-BAJI'),
      ],
    },
  ],
}

const SCENE_MIDNIGHT_SANDTABLE_CLIMAX: StorySceneDef = {
  id: 'scene_dm_midnight_sandtable_climax',
  title: '第三幕 · 子夜沙盘 · 铁壁合围',
  subtitle: '北京留守行宫 · 河北防辽舆图沙盘阁',
  illustrationUrl: '/assets/quests/daming_midnight_sandtable_ambush.jpg',
  illustrationCaption: '北京留守行宫防辽沙盘阁 · 百盏宫灯齐明贾昌朝卢铁山铁壁合围耶律裂山',
  mandatory: true,
  beats: [
    N('二更梆声穿过行宫森严飞檐，沙盘阁内烛火尽熄，唯有一轮冷月斜照在纵横丈余的《河北塘泺水寨防辽沙盘》之上——大名府、真定府、瀛州、雄州界河千百处水门暗桩纤毫毕现。'),
    N('子时初刻，“咔哒”一声轻响，阁门铜锁被人以私配黄铜钥悄悄旋开！河北转运司勾当公事周文焕怀揣一包散碎赃银猫腰潜入，紧随其后的竟是四名身披玄色重甲、手持寒铁重斧的契丹死士！为首一人左眉一道狰狞枪疤直贯耳根，正是北院铁林千夫长——耶律裂山！'),
    S({ name: '周文焕', title: '河北都转运司勾当公事（内鬼贪吏）', factionName: '河防蠹虫', portraitUrl: '/assets/characters/templates/tpl_song_scholar_fb.jpg' }, '“耶律将军快取暗格里的《河朔塘泺布防绢图》！白日校场上卢铁山那老匹夫一枪震断乌古乃的寒铁斧，贾昌朝定已起疑——小官已备好快船，取了图咱们今夜便渡黄河北逃析津府！”'),
    S({ name: '耶律裂山', title: '大辽北院铁林骁骑 · 千夫长', factionName: '契丹铁林骁骑', portraitUrl: '/assets/characters/templates/tpl_khitan_warrior_fb.jpg' }, '“哼，慌甚么！有了这卷塘泺水门密图，待桃汛一涨，我大辽铁林铁骑便可绕开雄州水寨、饮马黄河！至于卢铁山……五年前渡口碎我琵琶骨之辱，本座迟早拿他的人头祭旗！”'),
    S('NPC-0028', '（阁楼雕花回廊之上忽地百盏琉璃宫灯齐明！前宰相贾昌朝一袭紫袍玉带，负手立于高阶之上，羽扇轻摇）“周文焕，朝廷岁赐修埽铁料与三千贯省陌官银，养的便是你这等开门揖盗的国贼么？本府这卷《河北防辽舆图》，可还入得耶律将军法眼？”'),
    S('NPC-0275', '（阁门轰然洞开，卢铁山横枪立马，卢婉月、王信、郭钧海率亲军铁壁堵死四门）“耶律裂山！五年前饶你半条狗命，今夜黄河铁索的账、我徒儿受冤的账，咱们新仇旧恨一并清算！”'),
    N('刀枪出鞘，杀气盈阁！耶律裂山困兽犹斗，咆哮着挥舞六十四斤寒铁破甲重斧直扑中门，而惊骇欲绝的周文焕正死死抱着装有河银与《防辽舆图残卷》的紫檀暗匣缩向窗根——电光石火之间，少侠意下如何？'),
  ],
  choices: [
    {
      id: 'choice_sandtable_righteous_battle',
      label: '【2v2 忠义破虏 · 并肩迎击耶律裂山】与卢铁山总馆主联手合围，全歼契丹铁林死士！',
      subLabel: '2v2 正道生死决战（战败殉国；若此前点破斧法破绽，耶律裂山战力大幅削弱）· 胜后可选公门或八极真传结局',
      tone: 'primary',
      effects: [
        {
          type: 'branch',
          condition: flag('dm_axe_flaw_spotted', 'truthy'),
          thenEffects: [
            {
              type: 'startCombat',
              questId: QUEST_ID,
              allies: [
                {
                  kind: 'npc',
                  npcId: 'NPC-0275',
                  talkOverride: '“少侠尽管放手攻敌，老夫一杆六合大枪替你压住铁林死士！”',
                },
              ],
              opponent: { kind: 'custom', npc: buildYeluLieshanBossNpc(true) },
              extraOpponents: [{ kind: 'custom', npc: buildKhitanSandtableGuardNpc() }],
              rule: 'duel',
              deathTitle: '血染沙盘阁',
              deathDetail:
                '少侠与沧州八极门卢铁山于北京留守行宫沙盘阁夜剿契丹铁林死士，力战不支，命丧耶律裂山寒铁重斧之下。',
              forbidEscapeReason: '沙盘阁四门合围，正值擒贼护国之际，岂能退避！',
              introText:
                '【2v2 沙盘阁生死夜战】耶律裂山率铁林死士挥动寒铁重斧狂劈而来，然而其左肋换气死角早已被你在校场看破！卢铁山横枪跃至你身侧，可点击敌手立绘择一集火，一举拿下此獠！',
              onWin: [
                { type: 'healPlayer', hpPct: 100, mpPct: 100 },
                openScene('scene_dm_sandtable_victory_choice', 'QST-CITY-DAMING-BAJI'),
              ],
            },
          ],
          elseEffects: [
            {
              type: 'startCombat',
              questId: QUEST_ID,
              allies: [
                {
                  kind: 'npc',
                  npcId: 'NPC-0275',
                  talkOverride: '“少侠尽管放手攻敌，老夫一杆六合大枪替你压住铁林死士！”',
                },
              ],
              opponent: { kind: 'custom', npc: buildYeluLieshanBossNpc(false) },
              extraOpponents: [{ kind: 'custom', npc: buildKhitanSandtableGuardNpc() }],
              rule: 'duel',
              deathTitle: '血染沙盘阁',
              deathDetail:
                '少侠与沧州八极门卢铁山于北京留守行宫沙盘阁夜剿契丹铁林死士，力战不支，命丧耶律裂山寒铁重斧之下。',
              forbidEscapeReason: '沙盘阁四门合围，正值擒贼护国之际，岂能退避！',
              introText:
                '【2v2 沙盘阁生死夜战】契丹北院铁林千夫长耶律裂山与铁林死士双斧齐出，卷起刺骨罡风！卢铁山横枪助阵，此战关乎河朔安危，有死无退！',
              onWin: [
                { type: 'healPlayer', hpPct: 100, mpPct: 100 },
                openScene('scene_dm_sandtable_victory_choice', 'QST-CITY-DAMING-BAJI'),
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'choice_sandtable_outlaw_heist',
      label: '【浑水摸鱼 · 夺银盗图】趁宋辽高手死斗，暴起重创机要参谋、劫走赃银与防辽残图！',
      subLabel:
        '枭雄邪道生死战（战败必死）· 劫获 180 两赃银 +《河北防辽舆图残卷》，但列入大宋朝廷海捕黑名单并逐出正派！',
      tone: 'danger',
      effects: [
        {
          type: 'startCombat',
          questId: QUEST_ID,
          opponent: {
            kind: 'npc',
            npcId: 'NPC-0681',
            talkOverride:
              '“大胆狂徒！原来你竟是藏在暗处觊觎《河北防辽舆图》的悍匪！来人，格杀勿论！”',
          },
          rule: 'duel',
          forbidEscapeReason: '已在留守行宫沙盘阁悍然亮刃夺图，唯有杀出重围，否则必死无疑！',
          deathTitle: '夜盗沙盘 · 伏诛行宫',
          deathDetail:
            '少侠妄图趁乱劫夺北京留守行宫《河北防辽舆图》与河工赃银，失手被沙盘机要参谋樊威渊与宿卫亲军乱刃分尸于崇政殿阶下。',
          onWin: [
            { type: 'giveSilver', amount: 180, reason: '劫掠河工赃银' },
            { type: 'giveItem', itemId: 'ITM-MSC-009', qty: 1 },
            { type: 'setFlag', flag: 'dm_stole_hebei_defense_map', value: true },
            { type: 'setFlag', flag: 'song_court_blacklisted', value: true },
            {
              type: 'branch',
              condition: {
                type: 'any',
                conditions: [
                  { type: 'inSect', sectId: 'SECT-23' },
                  { type: 'inSect', sectId: 'SECT-22' },
                  { type: 'inSect', sectId: 'SECT-17' },
                  { type: 'inSect', sectId: 'SECT-33' },
                ],
              },
              thenEffects: [{ type: 'leaveSect', skipPenalty: true }],
            },
            { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0028' }, delta: -60 },
            { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0275' }, delta: -60 },
            { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0366' }, delta: -60 },
            { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0727' }, delta: -60 },
            { type: 'modifyNpcFavor', target: { kind: 'all_song_aligned' }, delta: -20 },
            { type: 'modifyRenown', delta: 80, reason: '夜劫行宫震动朝野' },
            { type: 'modifyChivalry', delta: -50, reason: '劫银盗图背弃忠义' },
            {
              type: 'teleportPlayer',
              regionId: 'daming',
              buildingId: 'dm_ferry',
              spotId: 'dm_fr_wharf',
            },
            { type: 'removeDynamicActor', questId: QUEST_ID },
            {
              type: 'completeQuest',
              questId: QUEST_ID,
              outcome: 'ending_outlaw_heist',
            },
            openScene('scene_dm_epilogue_outlaw', 'QST-CITY-DAMING-BAJI'),
          ],
        },
      ],
    },
  ],
}

const SCENE_JIA_COURT_TRAP: StorySceneDef = {
  id: 'scene_dm_jia_court_trap',
  title: '第二幕 · 崇政殿前 · 老相公明贬暗钓',
  subtitle: '北京留守行宫 · 驻跸崇政议军正殿',
  mandatory: true,
  beats: [
    N('崇政议军正殿檐宇巍峨，阶前甲士如林。你携查获的铁证刚踏入殿门，便见一名魁梧如铁塔、满身塞北风霜的紫膛脸老者大步赶至——正是连夜自拒马河接应密探【秦乾】归来的沧州八极门总馆主【卢铁山】！'),
    S('NPC-0275', '“草民卢铁山，叩见留守贾相公！小徒崔帆坤断索受冤一案，全赖这位少侠奔走查明真凶眉目，恳请相公明鉴！”'),
    N('高堂之上，五十三岁的前朝宰辅、判大名府兼北京留守【贾昌朝】端坐紫檀交椅。他接过你呈上的证物细览片刻，眸底精芒一闪即逝；瞥见殿侧几名转运司书吏伸长脖子偷觑，贾昌朝脸色骤沉，猛地将惊堂檀木一拍！'),
    S('NPC-0028', '“荒谬！大名府乃天子北门、河朔陪都！尔等江湖武夫丢了二十箱修埽官铁，张口便攀咬转运司官吏监守自盗，闭口便妄言城中有契丹铁林骁骑潜伏——凭这几页死无对证的揣测，便叫本府拿问朝廷命官、自乱河北军心么？”'),
    S('NPC-0028', '“本府丑话说在前头——明日【河北枪棒大校场】春检点兵，八角擂台之上，沧州八极门若连本府亲卫和河朔各路豪杰都压不住，拿甚么替朝廷守黄河？王都总管，送客！”'),
    S('NPC-0366', '（步出偏廊铜鹤香炉之后，卢婉月气得柳眉倒竖）“好个官官相护的前朝宰相！铁证摆在眼前竟一字不听……”'),
    S('NPC-0039', '（留守司马步军副都总管【王信】反手掩上侧门，压低声音一笑）“卢姑娘慎言！方才正殿两侧书办之中，便有转运司内鬼周文焕的耳目！贾相公若当堂下令拿人，潜伏城中的契丹铁林千夫长【耶律裂山】定会闻风远遁，三千贯河银与北门谍网便再难连根拔起！”'),
    S('NPC-0039', '“相公已暗命本将把令师弟崔帆坤移入内卫静室好生敷药。明日【河北枪棒大校场 · 八角比武擂台】，相公特将全城兵马耳目尽数吸引过去——请卢总馆主与少侠在擂台上狠狠打出八极门的威风，敲山震虎！届时行宫外松内紧，幕后黑手必趁明夜潜入【沙盘阁】盗图毁迹，咱们一网成擒！”'),
  ],
  onFinishEffects: [
    {
      type: 'setQuestStep',
      questId: QUEST_ID,
      stepId: 'leitai_trial',
      deadlineDays: null,
    },
    {
      type: 'branch',
      condition: flag('dm_clues_count', 'gte', 3),
      thenEffects: [
        { type: 'giveSilver', amount: 30, reason: '贾昌朝密赏三线全满查案之功' },
        { type: 'modifySkill', key: '策论', delta: 1 },
        {
          type: 'modifyNpcFavor',
          target: { kind: 'npc', npcId: 'NPC-0028' },
          delta: 25,
        },
        {
          type: 'modifyNpcFavor',
          target: { kind: 'npc', npcId: 'NPC-0275' },
          delta: 20,
        },
        toast('【三线铁证俱全密赏】贾相公暗赞少侠算无遗策，私赐纹银 30 两、策论 +1！速赴【河北枪棒大校场 · 八角比武擂台】助阵！', 'success', '铁锁镇河朔'),
      ],
      elseEffects: [
        {
          type: 'modifyNpcFavor',
          target: { kind: 'npc', npcId: 'NPC-0028' },
          delta: 10,
        },
        {
          type: 'modifyNpcFavor',
          target: { kind: 'npc', npcId: 'NPC-0275' },
          delta: 15,
        },
        toast('已领会贾留守「敲山震虎」暗计！请前往【河北枪棒大校场 · 八角比武擂台】助八极门打擂立威！', 'success', '铁锁镇河朔'),
      ],
    },
  ],
}

const INLINE_SCENE_01_scene_dm_leitai_after_fight_win: StorySceneDef = {
                id: 'scene_dm_leitai_after_fight_win',
                title: '八极崩云 · 敲山震虎成',
                subtitle: '河北枪棒大校场',
                beats: [
                  N('三合硬撼，火星四溅！少侠生生架住乌古乃狂风暴雨般的寒铁双斧，逼得他下盘不由自主踏出契丹骑兵特有的「孤狼盘马步」！'),
                  S('NPC-0275', '“露馅了！看老夫这记——八极铁山靠！”'),
                  N('但见卢铁山须发皆张，脚下一记震脚踏裂擂台条石，右肩如万钧崩山撞入乌古乃怀中！乌古乃口喷鲜血倒飞三丈，连滚带爬混入乱哄哄的人群遁逃而去。校场万军齐声暴喝：“文有太极安天下，武有八极定乾坤！”'),
                  S('NPC-0039', '（王信自崇政看台疾步走下，压低嗓音向你与卢铁山抱拳）“干得漂亮！刚刚在看台角落观战的转运司勾当公事周文焕面无人色，已借故提前溜出校场——鱼儿急了！今夜戌亥之交，【北京留守行宫 · 河北防辽舆图沙盘阁】收网捉鳖！”'),
                ],
                onFinishEffects: [
                  toast('校场扬威！请于夜间（戌/亥/子/丑时）前往【北京留守行宫 · 河北防辽舆图沙盘阁】收网（白昼抵达亦可在阁外静候至戌夜）！', 'success', '铁锁镇河朔'),
                ],
              }

const INLINE_SCENE_02_scene_dm_leitai_flaw_broken: StorySceneDef = {
            id: 'scene_dm_leitai_flaw_broken',
            title: '一眼破军 · 六合碎寒铁',
            subtitle: '文有太极安天下 · 武有八极定乾坤',
            beats: [
              P('“卢总馆主且看！此人每劈出第三斧，左足必虚浮半寸、右手腕向内暗缩——那是北地骑兵拉硬弓落下的肩井旧疾！待其双斧交叉回护胸膛之际，直扎其左肋期门穴半尺空当！”'),
              S('NPC-0275', '“好俊的眼力！看老夫这记《六合大枪》——青龙献爪，破！”'),
              N('但听“咔嚓”一声金铁崩裂巨响！卢铁山掌中浑铁大枪如神龙吐信，分毫不差贯入乌古乃双斧交叠的死角，竟将那柄辽东寒铁短斧生生震断为两截！乌古乃骇极吐血，弃斧翻落高台仓皇逃窜！'),
              S('NPC-0028', '（高台彩棚之上，前相贾昌朝抚须微笑，遥遥向少侠颔首）“胸有兵机，目无全牛。王都总管，传令下去——鱼已惊钩，今夜沙盘阁张网待客！”'),
              N('【破绽看破加成】你不仅助卢铁山一枪立威，更彻底摸清了契丹铁林旋风斧法的命门——今夜终幕首领【耶律裂山】的实战威胁将大幅削弱！（且获战斗经验 +40）'),
            ],
            onFinishEffects: [
              toast('一眼勘破契丹铁林斧法命门（终幕首领战力已削弱）！请于夜间前往【北京留守行宫 · 河北防辽舆图沙盘阁】收网！', 'success', '铁锁镇河朔'),
            ],
          }

const INLINE_SCENE_03_scene_dm_epilogue_official: StorySceneDef = {
            id: 'scene_dm_epilogue_official',
            title: '尾声 · 北门锁钥寄麒麟',
            subtitle: '《铁锁镇河朔》· 忠义入幕结局',
            beats: [
              S('NPC-0028', '“善！此函盖有北京留守司紫泥官印，少侠日后携往东京开封府衙或寻包希仁、展熊飞，无需从末等白役熬起，便可直授【捕头都头】之职！便是八极门高足，亦可堂堂正正奉调入京！”'),
              S('NPC-0275', '“哈哈，好志气！日后少侠在东京公门执掌法度，大名府黄河渡口便有我沧州八极门替你守着北大门！咱们后会有期！”'),
            ],
            onFinishEffects: [
              toast('【忠义入幕结局】获颁《北京留守幕府举荐信》、纹银 100 两、策论 +1！凭信可赴开封府直授第2阶【捕头都头】！', 'success', '铁锁镇河朔'),
            ],
          }

const INLINE_SCENE_04_scene_dm_epilogue_baji: StorySceneDef = {
            id: 'scene_dm_epilogue_baji',
            title: '尾声 · 千斤铁锁授真传',
            subtitle: '沧州八极分馆 · 千斤铁锁秘传室',
            beats: [
              N('夜深灯暖，千斤铁锁秘传室内悬挂着历代河朔武师淬炼筋骨的玄铁重锁。卢铁山亲自捧过一杆重逾三十八斤、枪缨如血的《大名六合浑铁枪》，手把手将八极门镇馆枪术《六合大枪》精要拆解传授，并以独门药酒为你舒活周身筋络、印证河朔枪道！'),
              S('NPC-0275', '“好孩子！不贪朱紫、重义轻利，这才是我河朔硬派武夫的脊梁！这杆浑铁大枪随你征战四方——记住，枪扎一线，拳打八方，只要心里守住忠义二字，天下何处去不得！”'),
              S('NPC-0366', '“日后大名府讲武堂永远有你一碗热酒、一席之地！若有空，常回铁山靠校场与我切磋枪棒！”'),
            ],
            onFinishEffects: [
              toast('【八极真传结局】习得《六合大枪》（第2重），获授良阶上品《大名六合浑铁枪》、战斗经验 +120、纹银 50 两，并破格获八极门内堂殊荣！', 'success', '铁锁镇河朔'),
            ],
          }

const INLINE_SCENE_05_scene_dm_epilogue_outlaw: StorySceneDef = {
                id: 'scene_dm_epilogue_outlaw',
                title: '尾声 · 夜遁黄河风浪恶',
                subtitle: '《铁锁镇河朔》· 夺银盗图结局',
                beats: [
                  N('趁着卢铁山与耶律裂山拳斧硬撼、气浪掀翻屏风的刹那，你一招重创沙盘阁机要参谋樊威渊，一把扯过周文焕怀中沉甸甸的百八十两赃银与半卷《河北防辽舆图残卷》，撞碎雕花木窗遁入茫茫黄河夜雾之中！'),
                  N('身后留守行宫号角凄厉、全城海捕文书连夜飞传东京——自今日起，你虽怀揣重金与北门机密军图（日后或可作投靠北辽之奇货），却已名列【大宋朝廷黑名单】，若敢踏足开封府半步，必遭南侠展昭生死缉拿！'),
                ],
                onFinishEffects: [
                  warn('【夺银盗图结局】劫获纹银 180 两与《河北防辽舆图残卷》！注意：已列入大宋朝廷黑名单（入东京开封府将遭展昭缉捕）！', '海捕通缉'),
                ],
              }

const INLINE_SCENE_06_scene_dm_tavern_confrontation: StorySceneDef = {
              id: 'scene_dm_tavern_confrontation',
              title: '第一幕 · 惊涛断索 · 临津剑拔弩张',
              subtitle: '大名府 · 黄河北岸临津酒楼',
              illustrationUrl: '/assets/quests/daming_linjin_tavern_standoff.jpg',
              illustrationCaption: '大名府黄河北岸临津酒楼 · 留守司公人与沧州八极门徒拔刃对峙',
              beats: [
                N('{reignYear}春寒未褪，黄河北岸桃花水初涨，浊浪拍岸声震数里。你刚掀开【临津酒楼】挡风芦帘，便见堂中酒客纷纷避退墙角——几名身挎腰刀的留守司公人正与一队劲装持棍的【沧州八极门】弟子按兵对峙，空气中火药味一触即发！'),
                S('NPC-0431', '（当垆掌柜「红袖双刀」石红锦按住酒坛轻叹）“诸位爷台行行好，小店几张榆木桌子可经不起六扇门的铁尺与八极门的崩拳！有话坐下吃碗梨花春慢慢分说不成么？”'),
                S('NPC-0366', '“郭都头！昨夜黄河浮桥三根镇河铁索遭贼人暗斩，二十箱商胡埽修堤生铁与三千贯河工银饷落水无踪——我崔帆坤师弟为护浮桥身受寒刃重创，你们留守司非但不追拿真凶，反将崔师弟锁进大牢、查封我讲武堂，天下哪有这般道理！”'),
                S('NPC-0727', '“卢教头息怒！郭某在六扇门当差十载，素仰令尊卢总馆主徒手硬撼契丹铁骑的威名。奈何昨夜渡口当值的确系贵派门人，河北都转运司严令【七日之内】若无真凭实据洗清干系，便要将崔教习按监守自盗刺配沙门岛！郭某也是奉命行事啊！”'),
                S('NPC-0366', '“好个七日之限！家父远赴北疆接应同门未归，我卢婉月便是拼却性命，也绝不教人往沧州八极门头上泼一星脏水！咱们走！”'),
              ],
              choices: [
                {
                  id: 'choice_tavern_step_up',
                  label: '【抱拳执言】朗声拦下双方，愿赴八极分馆听卢教头细述冤情！',
                  subLabel: '开启大名府长篇剧情《铁锁镇河朔》· 卢婉月与郭钧海好感提升',
                  tone: 'primary',
                  effects: [
                    {
                      type: 'startQuest',
                      questId: QUEST_ID,
                      stepId: 'meet_lu_wanyue',
                    },
                    {
                      type: 'modifyNpcFavor',
                      target: { kind: 'npc', npcId: 'NPC-0366' },
                      delta: 10,
                    },
                    {
                      type: 'modifyNpcFavor',
                      target: { kind: 'npc', npcId: 'NPC-0727' },
                      delta: 5,
                    },
                    toast('已开启河朔风云卷宗《铁锁镇河朔》！请前往【沧州八极分馆 · 八极忠义讲武正堂】寻卢婉月详谈。', 'success', '铁锁镇河朔'),
                  ],
                },
                {
                  id: 'choice_tavern_observe_quietly',
                  label: '【静观其变】先记下八极分馆风波，待饮罢此杯再决行止',
                  subLabel: '记录卷宗线索，稍后可随时赴讲武堂寻卢婉月介入',
                  tone: 'default',
                  effects: [
                    {
                      type: 'startQuest',
                      questId: QUEST_ID,
                      stepId: 'meet_lu_wanyue',
                      silent: true,
                    },
                    toast('已记下大名府黄河断索奇案，若有意相助，可赴【沧州八极分馆 · 讲武堂】寻卢婉月。', 'talk', '江湖风闻'),
                  ],
                },
              ],
            }

const INLINE_SCENE_07_scene_dm_lu_wanyue_fellow_disciple: StorySceneDef = {
                  id: 'scene_dm_lu_wanyue_fellow_disciple',
                  title: '第一幕 · 师门蒙冤 · 七日洗雪',
                  subtitle: '沧州八极分馆 · 八极忠义讲武正堂',
                  beats: [
                    S('NPC-0366', '“你回来得正好！自家门墙遭此奇冤，师姐正愁分身乏术——三日前，本门潜伏北辽析津府的演武教习【秦乾】师叔冒死飞鸽传书，言契丹北院『铁林骁骑』有一支精锐死士偷渡拒马河南下，爹爹当夜便单骑北上接应秦师叔。”'),
                    S('NPC-0366', '“谁料爹爹前脚刚走，昨夜三更【黄河铁索渡口】的三根镇河铁索便被人齐根斩断！随船二十箱商胡埽修堤生铁与三千贯河工银饷尽数失踪，崔帆坤师弟拼死护桥反遭留守司锁拿，限咱们七日之内查出真凶，否则便要拿八极门顶罪！”'),
                    S('NPC-0366', '“师姐须守住讲武堂以防宵小栽赃，查案之事便托付于你！你可分三路勘查：① 去【黄河铁索渡口 · 镇河铁牛浮桥】验看断索刀痕（渡口酒肆常有『北侠』欧阳春前辈饮酒，亦可请他掌眼）；② 去【大名府留守司衙】查验河防生铁账册；③ 去渡口【巡河水寨烽旗望楼】拜访丐帮陈孤雁长老。集齐至少两桩铁证，待爹爹一归便直闯留守行宫！”'),
                  ],
                  choices: [
                    {
                      id: 'choice_accept_baji_disciple',
                      label: '【同门义不容辞】师姐放心，七日之内必为崔师弟与八极门讨回清白！',
                      subLabel: '开启 7 日限时查案（集齐任意 2 条线索即可推进，3 条全满另有嘉赏）',
                      tone: 'primary',
                      effects: [
                        {
                          type: 'startQuest',
                          questId: QUEST_ID,
                          stepId: 'investigate_clues',
                          deadlineDays: 7,
                        },
                        {
                          type: 'setQuestStep',
                          questId: QUEST_ID,
                          stepId: 'investigate_clues',
                          deadlineDays: 7,
                          silent: true,
                        },
                        {
                          type: 'modifyNpcFavor',
                          target: { kind: 'npc', npcId: 'NPC-0366' },
                          delta: 15,
                        },
                        toast('已领七日查案之约！请前往【黄河铁索渡口】与【大名府留守司衙】搜集至少两条断索铁证！', 'success', '铁锁镇河朔'),
                      ],
                    },
                  ],
                }

const INLINE_SCENE_08_scene_dm_lu_wanyue_outsider: StorySceneDef = {
                  id: 'scene_dm_lu_wanyue_outsider',
                  title: '第一幕 · 铁骨蒙尘 · 拔刀相助',
                  subtitle: '沧州八极分馆 · 八极忠义讲武正堂',
                  beats: [
                    N('讲武正堂外贴着留守司封条，堂内数十杆白蜡大枪森然林立。金牌教头【卢婉月】正手按枪杆来回疾步，见你登门，紧锁的蛾眉方舒展几分，抱拳敛衽一礼。'),
                    S('NPC-0366', '“少侠高义！实不相瞒，三日前本门驻辽境析津府暗探【秦乾】师叔传回急讯，称契丹北院『铁林骁骑』精锐潜入河北，家父卢铁山连夜北上接应。偏偏就在家父离城当夜，黄河浮桥三根镇河铁索遭利刃暗斩，二十箱修埽生铁与三千贯河银石沉大海！”'),
                    S('NPC-0366', '“我门下弟子行得正坐得端，断不会贪墨朝廷一文河饷！可秀才遇到兵，有理说不清——留守司限【七日之内】交出真凭实据，否则便要将崔帆坤师弟刺配沙门岛！”'),
                    S('NPC-0366', '“婉月现遭官差监视不得擅离分馆，敢请少侠替我走一遭：① 赴【黄河铁索渡口 · 镇河铁牛浮桥】查验断口（若难辨认，栈桥酒肆『北侠』欧阳春前辈见多识广）；② 赴【大名府留守司衙】核查转运司河防生铁账册；③ 赴渡口【烽旗望楼】询问丐帮陈孤雁长老。但得两条铁证，家父一归便去留守行宫击鼓鸣冤！事成之后，沧州八极门必有厚报！”'),
                  ],
                  choices: [
                    {
                      id: 'choice_accept_baji_outsider',
                      label: '【慨然应诺】卢教头莫急，在下这便去渡口与司衙勘破迷局！',
                      subLabel: '开启 7 日限时查案（集齐任意 2 条线索即可推进，3 条全满另有嘉赏）',
                      tone: 'primary',
                      effects: [
                        {
                          type: 'startQuest',
                          questId: QUEST_ID,
                          stepId: 'investigate_clues',
                          deadlineDays: 7,
                        },
                        {
                          type: 'setQuestStep',
                          questId: QUEST_ID,
                          stepId: 'investigate_clues',
                          deadlineDays: 7,
                          silent: true,
                        },
                        {
                          type: 'modifyNpcFavor',
                          target: { kind: 'npc', npcId: 'NPC-0366' },
                          delta: 15,
                        },
                        toast('已受卢婉月重托（限期 7 日）！请赴【黄河铁索渡口】与【大名府留守司衙】搜集至少两条铁证。', 'success', '铁锁镇河朔'),
                      ],
                    },
                    {
                      id: 'choice_defer_baji_outsider',
                      label: '【容后再议】眼下尚有俗务缠身，稍后再来相助',
                      tone: 'default',
                      effects: [],
                    },
                  ],
                }

const INLINE_SCENE_09_scene_dm_ouyang_reveal_wine: StorySceneDef = {
                        id: 'scene_dm_ouyang_reveal_wine',
                        title: '北侠断刃 · 辽东寒铁破甲斧',
                        subtitle: '客渡木栈桥与临河酒肆',
                        beats: [
                          S('NPC-0248', '“痛快！好酒！小友且听好——大宋官铸镇河熟铁索粗如儿臂，寻常江湖刀剑莫说三招斩断，便是锯上一宿也休想弄断一根！”'),
                          S('NPC-0248', '“老夫今晨去看过了，那断口呈半月霜纹、内凹而外翻，唯有大辽北院【契丹铁林骁骑】制式的『六十四斤辽东寒铁破甲重斧』，借战马冲势连劈三记方能致之！八极门用枪使拳，绝无此等北庭军中重器！”'),
                        ],
                        onFinishEffects: buildClueGainEffects(
                          'dm_clue_chain',
                          '【线索一·铁索断口】经北侠欧阳春指点，确证镇河铁索乃契丹铁林骁骑「六十四斤辽东寒铁重斧」所斩！',
                        ),
                      }

const INLINE_SCENE_10_scene_dm_ouyang_reveal_spar_win: StorySceneDef = {
                            id: 'scene_dm_ouyang_reveal_spar_win',
                            title: '英雄惜英雄 · 寒铁重斧现真章',
                            beats: [
                              S('NPC-0248', '“哈哈哈哈，后生可畏！连老夫这身老筋骨都被你逼出三分热汗！听好了——斩断铁索之兵刃，乃是大辽北院【契丹铁林骁骑】独有的『六十四斤辽东寒铁破甲重斧』！替老夫向卢铁山问好，就说欧阳春信得过八极门的脊梁！”'),
                            ],
                            onFinishEffects: buildClueGainEffects(
                              'dm_clue_chain',
                              '【线索一·铁索断口】以武会友博得北侠赞许，确证铁索乃契丹铁林骁骑寒铁重斧所斩！',
                            ),
                          }

const INLINE_SCENE_11_scene_dm_ouyang_reveal_spar_lose: StorySceneDef = {
                            id: 'scene_dm_ouyang_reveal_spar_lose',
                            title: '紫髯指迷 · 寒铁重斧现真章',
                            beats: [
                              S('NPC-0248', '“呵呵，胆气可嘉，下盘再稳三分便更好了！老夫言出必践——那断索切口呈半月霜纹，分明是大辽【契丹铁林骁骑】『六十四斤辽东寒铁破甲重斧』借马力劈砍所致，绝非八极门手笔！快去救人罢！”'),
                            ],
                            onFinishEffects: buildClueGainEffects(
                              'dm_clue_chain',
                              '【线索一·铁索断口】得北侠欧阳春点破，确证铁索乃契丹铁林骁骑寒铁重斧所斩！',
                            ),
                          }

const INLINE_SCENE_12_scene_dm_ouyang_chun_axe: StorySceneDef = {
              id: 'scene_dm_ouyang_chun_axe',
              title: '临河沽酒 · 紫髯伯识破北庭兵',
              subtitle: '黄河铁索渡口 · 客渡木栈桥与临河酒肆',
              illustrationUrl: '/assets/quests/daming_ouyang_chun_ferry.jpg',
              illustrationCaption: '黄河铁索渡口临河芦棚 · 北侠紫髯伯欧阳春横巨刃饮酒辨寒铁断痕',
              beats: [
                N('临河芦棚酒旗猎猎，一名紫髯如戟、古貌魁梧的布衣豪杰正自斟自饮，膝横一柄古朴厚背巨刃——正是威震南北绿林的「北侠」紫髯伯【欧阳春】！'),
                S('NPC-0248', '“呵呵，小友可是为那三根断江铁索而来？老夫昨夜路过南岸，恰闻金铁崩云之声。想听老夫说破那斩索兵刃的来历不难——要么沽十两银子的梨花春陪老夫痛饮三碗，要么亮出兵刃陪老夫过上几招松松筋骨！”'),
              ],
              choices: [
                {
                  id: 'choice_ouyang_wine',
                  label: '【沽酒相敬】奉十两纹银买一坛陈年梨花春，向北侠请教！（需 10 两银子）',
                  tone: 'gold',
                  condition: { type: 'silverAtLeast', min: 10 },
                  effects: [
                    { type: 'giveSilver', amount: -10, reason: '请北侠欧阳春饮梨花春' },
                    {
                      type: 'modifyNpcFavor',
                      target: { kind: 'npc', npcId: 'NPC-0248' },
                      delta: 15,
                    },
                    openScene('scene_dm_ouyang_reveal_wine', 'QST-CITY-DAMING-BAJI'),
                  ],
                },
                {
                  id: 'choice_ouyang_spar',
                  label: '【以武会友】亮招请紫髯伯赐教几手！',
                  subLabel: '与北侠欧阳春以武会友（切磋点到为止 · 胜负皆获指点，战胜好感更高）',
                  tone: 'primary',
                  effects: [
                    {
                      type: 'startCombat',
                      questId: QUEST_ID,
                      opponent: { kind: 'npc', npcId: 'NPC-0248' },
                      rule: 'spar',
                      introText: '北侠欧阳春抚髯朗笑，随手折下一截芦苇代刀，气势如黄河奔雷般压来（以武会友 · 点到为止）！',
                      onWin: [
                        { type: 'healPlayer', hpPct: 50, mpPct: 50 },
                        {
                          type: 'modifyNpcFavor',
                          target: { kind: 'npc', npcId: 'NPC-0248' },
                          delta: 25,
                        },
                        openScene('scene_dm_ouyang_reveal_spar_win', 'QST-CITY-DAMING-BAJI'),
                      ],
                      onLose: [
                        { type: 'healPlayer', hpPct: 50, mpPct: 50 },
                        {
                          type: 'modifyNpcFavor',
                          target: { kind: 'npc', npcId: 'NPC-0248' },
                          delta: 15,
                        },
                        openScene('scene_dm_ouyang_reveal_spar_lose', 'QST-CITY-DAMING-BAJI'),
                      ],
                    },
                  ],
                },
              ],
            }

const INLINE_SCENE_13_scene_dm_ledger_math_solved: StorySceneDef = {
                        id: 'scene_dm_ledger_math_solved',
                        title: '偷梁换柱 · 半月前早空之铁箱',
                        beats: [
                          P('“郭都头请看！按《宋会要·河渠》定制，二十箱磁州官炉生铁净重一万二千斤，外加三千贯省陌银饷，平底纲船吃水当在三尺一寸以上！可昨夜渡口水尺签注吃水仅一尺四寸——箱中装的根本不是生铁，而是轻飘飘的黄河滩涂多孔浮石！”'),
                          P('“再核对磁州铁冶务半月前的出库火票印色——勾当公事【周文焕】早在腊月廿五便将二十箱真生铁私卖走私，昨夜斩断铁索沉船，分明是要借黄河桃汛毁尸灭迹，顺带拿八极门当替死鬼！”'),
                          S('NPC-0727', '（郭钧海倒吸一口凉气，一拳砸在案几上）“好毒的蛀虫！险些叫郭某成了贪官害忠良的帮凶！少侠快收好这份抄件，郭某暗中替你盯着周文焕！”'),
                        ],
                        onFinishEffects: buildClueGainEffects(
                          'dm_clue_ledger',
                          '【线索二·河防黄册】借珠算吃水尺码勘破：转运司周文焕半月前早已盗卖生铁，断索只为沉箱灭迹！',
                        ),
                      }

const INLINE_SCENE_14_scene_dm_ledger_rhetoric_solved: StorySceneDef = {
                        id: 'scene_dm_ledger_rhetoric_solved',
                        title: '书办吐实 · 以石充铁之谋',
                        beats: [
                          N('你负手冷笑，将三司磨勘与沙门岛连坐律例背得字字诛心。看库书办吓得魂飞魄散，双膝一软自袖中掏出私藏的半张副页——上面赫然记着勾当公事【周文焕】半月前私卖二十箱生铁、命人以河滩怪石封箱沉江的铁证！'),
                        ],
                        onFinishEffects: buildClueGainEffects(
                          'dm_clue_ledger',
                          '【线索二·河防黄册】施辩才诈破书办心防，取得周文焕半月前私卖生铁、以石充铁沉江之副页铁证！',
                        ),
                      }

const INLINE_SCENE_15_scene_dm_ledger_bribe_solved: StorySceneDef = {
                        id: 'scene_dm_ledger_bribe_solved',
                        title: '银开暗格 · 铁料早空',
                        beats: [
                          N('二十两雪花纹银入袖，架阁库书办四下张望无人，悄悄递出一纸加盖骑缝私印的草账——原来转运司勾当公事【周文焕】早在半月前便将二十箱官铁倒卖塞北，昨夜沉江的只是二十箱烂石头！'),
                        ],
                        onFinishEffects: buildClueGainEffects(
                          'dm_clue_ledger',
                          '【线索二·河防黄册】重金购得架阁库暗账，查实周文焕半月前早已盗卖生铁、昨夜断索纯属毁尸灭迹！',
                        ),
                      }

const INLINE_SCENE_16_scene_dm_yamen_ledger_check: StorySceneDef = {
              id: 'scene_dm_yamen_ledger_check',
              title: '留守司衙 · 黄册珠算揭亏空',
              subtitle: '大名府留守司衙 · 河防架阁库',
              beats: [
                S('NPC-0727', '“少侠果真来了。转运司勾当公事【周文焕】一口咬定二十箱磁州官炉生铁与三千贯省陌银饷俱在昨夜沉入黄河，正催着结案。架阁库这摞《春汛商胡埽物料纲运黄册》便在此处，只是书办守得紧，少侠有何良策？”'),
              ],
              choices: [
                {
                  id: 'choice_ledger_math_classics',
                  label: '【珠算核吃水】按纲船吃水尺码与官炉炭耗核算实重！（需算术 ≥ 55 或 经义 ≥ 55）',
                  subLabel: '文人百工破案 · 算术 +1，郭钧海大为折服',
                  tone: 'gold',
                  condition: {
                    type: 'any',
                    hint: '需 算术 ≥ 55 或 经义 ≥ 55',
                    conditions: [
                      { type: 'skillAtLeast', key: '算术', min: 55 },
                      { type: 'skillAtLeast', key: '经义', min: 55 },
                    ],
                  },
                  effects: [
                    { type: 'modifySkill', key: '算术', delta: 1 },
                    {
                      type: 'modifyNpcFavor',
                      target: { kind: 'npc', npcId: 'NPC-0727' },
                      delta: 20,
                    },
                    openScene('scene_dm_ledger_math_solved', 'QST-CITY-DAMING-BAJI'),
                  ],
                },
                {
                  id: 'choice_ledger_rhetoric_bluff',
                  label: '【危言诈书办】厉喝留守贾相公已调三司度支御史亲审！（需辩才 ≥ 60）',
                  subLabel: '唇枪舌剑诈出底账 · 辩才 +1',
                  tone: 'jade',
                  condition: { type: 'skillAtLeast', key: '辩才', min: 60 },
                  effects: [
                    { type: 'modifySkill', key: '辩才', delta: 1 },
                    {
                      type: 'modifyNpcFavor',
                      target: { kind: 'npc', npcId: 'NPC-0727' },
                      delta: 15,
                    },
                    openScene('scene_dm_ledger_rhetoric_solved', 'QST-CITY-DAMING-BAJI'),
                  ],
                },
                {
                  id: 'choice_ledger_bribe_clerk',
                  label: '【塞银买底账】暗递二十两纹银买通架阁库书办钞录暗账（需 20 两银子）',
                  tone: 'default',
                  condition: { type: 'silverAtLeast', min: 20 },
                  effects: [
                    { type: 'giveSilver', amount: -20, reason: '打点留守司架阁库书办' },
                    openScene('scene_dm_ledger_bribe_solved', 'QST-CITY-DAMING-BAJI'),
                  ],
                },
              ],
            }

const INLINE_SCENE_17_scene_dm_chen_intel_basic: StorySceneDef = {
                        id: 'scene_dm_chen_intel_basic',
                        title: '丐帮密报 · 意在沙盘防辽图',
                        beats: [
                          S('NPC-0137', '“第一拨是太行山外围不守规矩的败类『焦三斧』一伙，收了官面黑银在上游芦苇荡放火喧哗，故意引开巡河水军哨船；紧接着第二拨只有五骑，脚蹬鹿皮毡靴、一言不发，三斧斩断铁索后用契丹语低语了一句——『铁已到手，只待大校场喧嚣起，便取留守行宫沙盘阁的《河北防辽舆图》』！”'),
                          S('NPC-0137', '“少侠切记！断索沉箱只是掩人耳目，这伙契丹铁林死士与城中内鬼真正的杀招，乃是大名府留守行宫的《河北防辽舆图》！”'),
                        ],
                        onFinishEffects: buildClueGainEffects(
                          'dm_clue_beggar',
                          '【线索三·丐帮夜哨】陈孤雁揭破两路贼踪：太行败类纵火调虎离山，契丹铁林死士真正目标是留守行宫《河北防辽舆图》！',
                        ),
                      }

const INLINE_SCENE_18_scene_dm_chen_intel_generous: StorySceneDef = {
                        id: 'scene_dm_chen_intel_generous',
                        title: '烧刀暖寒夜 · 尽吐铁林虚实',
                        beats: [
                          S('NPC-0137', '“哈哈，老叫化替芦苇荡里吹了一宿冷风的弟兄们谢过少侠！听仔细了——昨夜太行败类『焦三斧』在西滩纵火调走水军，真正的斩索黑手乃是五名脚穿鹿皮毡靴的【契丹铁林骁骑】，而他们真正的目标，乃是【留守行宫沙盘阁】里的《河北防辽舆图》！”'),
                          S('NPC-0137', '“再送少侠一句保命口诀：铁林军双斧虽猛，却因常年披重甲控烈马，每逢第三记旋劈必在左肋期门穴滞气半息！记下这一节，日后对阵必有奇效！”'),
                        ],
                        onFinishEffects: buildClueGainEffects(
                          'dm_clue_beggar',
                          '【线索三·丐帮夜哨】获陈孤雁倾囊相告：贼人真正目标为行宫《河北防辽舆图》，且习得看破铁林重斧换气之法（战斗经验 +30）！',
                        ),
                      }

const INLINE_SCENE_19_scene_dm_chen_guyan_watchtower: StorySceneDef = {
              id: 'scene_dm_chen_guyan_watchtower',
              title: '烽楼听雁 · 芦荡夜影分两路',
              subtitle: '黄河铁索渡口 · 巡河水寨烽旗望楼',
              beats: [
                N('百尺烽旗望楼迎风矗立，脚下黄河浊浪滚滚东去。丐帮驻大名府长老【陈孤雁】斜倚木栏，肩头停着一只苍羽孤雁，听闻你为八极门断索案奔走，苍老眸中闪过一抹赞色。'),
                S('NPC-0137', '“卢铁山与老叫化共饮过黄河水，他是顶天立地的河北汉子，绝干不出盗卖河铁的勾当。昨夜三更，我丐帮几名睡在浮桥栈板下的污衣弟兄，恰在浓雾里瞧见两拨鬼祟人影……”'),
              ],
              choices: [
                {
                  id: 'choice_chen_righteous_ask',
                  label: '【义气请教】请陈长老赐告昨夜两拨贼人底细！（无门槛）',
                  tone: 'primary',
                  effects: [
                    {
                      type: 'modifyNpcFavor',
                      target: { kind: 'npc', npcId: 'NPC-0137' },
                      delta: 15,
                    },
                    openScene('scene_dm_chen_intel_basic', 'QST-CITY-DAMING-BAJI'),
                  ],
                },
                {
                  id: 'choice_chen_wine_gift',
                  label: '【赠银劳军】奉十两纹银为夜哨丐帮弟兄添置御寒烧刀子！（需 10 两银子）',
                  subLabel: '陈孤雁好感 +30，并额外指点北庭武夫换气关窍（战斗经验 +30）',
                  tone: 'gold',
                  condition: { type: 'silverAtLeast', min: 10 },
                  effects: [
                    { type: 'giveSilver', amount: -10, reason: '劳军大名府丐帮污衣弟子' },
                    { type: 'giveCombatExp', amount: 30, reason: '习得看破铁林重斧换气关窍' },
                    {
                      type: 'modifyNpcFavor',
                      target: { kind: 'npc', npcId: 'NPC-0137' },
                      delta: 30,
                    },
                    openScene('scene_dm_chen_intel_generous', 'QST-CITY-DAMING-BAJI'),
                  ],
                },
              ],
            }

const INLINE_SCENE_20_scene_dm_bout1_shi_wanshan_slap: StorySceneDef = {
                        id: 'scene_dm_bout1_shi_wanshan_slap',
                        title: '狂龙震怒 · 清理绿林败类',
                        beats: [
                          S('NPC-0229', '（台下观礼的太行绿林盟副总瓢把子「九纹狂龙」史万山闻言暴怒，飞身跃上八角台，一巴掌将焦三斧扇得满嘴碎牙滚下台去）“混账东西！我绿林盟劫的是贪官污吏，何时轮到你收赃官黑钱、替契丹狗打掩护？来人，捆回太行山挑断脚筋！”'),
                        ],
                        onFinishEffects: [openScene('scene_dm_leitai_bout2', 'QST-CITY-DAMING-BAJI')],
                      }

const INLINE_SCENE_21_scene_dm_leitai_bout1: StorySceneDef = {
              id: 'scene_dm_leitai_bout1',
              title: '第二幕 · 校场试金 · 八角擂台鼓如雷',
              subtitle: '河北枪棒大校场 · 六合枪棒八角比武擂台',
              mandatory: true,
              beats: [
                N('春阳猎猎，旌旗蔽空！【河北枪棒大校场】四围站满披坚执锐的大名府禁军与河北各路武林豪客。看台朱漆彩棚之内，留守贾昌朝端茶不语，角落里的转运司勾当公事周文焕却频频拭汗。'),
                S('NPC-0275', '“诸位河北父老、军中同袍！昨夜黄河断索一案流言四起，今日我沧州八极门奉留守相公钧令，立这八角生死擂——凡疑我八极门武艺不济、德不配位者，尽管登台赐教！”'),
                S({ name: '焦三斧', title: '太行外围叛匪 · 受贿刺头', factionName: '太行败类', portraitUrl: '/assets/characters/templates/tpl_greenwood_sect_fb.jpg', avatarUrl: '/assets/characters/templates/tpl_greenwood_sect_av.jpg' }, '（话音未落，一名满脸横肉的汉子拎着宣花板斧跳上擂台怪笑）“嘿嘿，二十箱官铁都能看丢的软脚虾，还敢霸着大名府讲武堂？识相的趁早摘牌滚回沧州种地去罢！”'),
                S('NPC-0366', '“这厮便是收了贪官黑银在渡口上游纵火闹事的太行败类焦三斧！少侠，头一阵便拿这狗贼开刀祭旗！”'),
              ],
              choices: [
                {
                  id: 'choice_bout1_greenwood_purge',
                  label: '【亮出绿林盟字号】请台下副总瓢把子「九纹狂龙」史万山清理门户！',
                  subLabel: '太行/京东绿林盟弟子专属捷径 · 免战震退叛匪并获史万山好感 +25',
                  tone: 'gold',
                  condition: { type: 'inSect', sectId: 'SECT-18' },
                  hideWhenUnavailable: true,
                  effects: [
                    {
                      type: 'modifyNpcFavor',
                      target: { kind: 'npc', npcId: 'NPC-0229' },
                      delta: 25,
                    },
                    {
                      type: 'modifyNpcFavor',
                      target: { kind: 'npc', npcId: 'NPC-0275' },
                      delta: 15,
                    },
                    openScene('scene_dm_bout1_shi_wanshan_slap', 'QST-CITY-DAMING-BAJI'),
                  ],
                },
                {
                  id: 'choice_bout1_fight_bandit',
                  label: '【跃上八角台】十步之内见真章，先替八极门打服这跳梁小丑！',
                  subLabel: '开启头阵生死擂（⚠️ 战败将直接丧命！）',
                  tone: 'danger',
                  effects: [
                    {
                      type: 'startCombat',
                      questId: QUEST_ID,
                      opponent: { kind: 'custom', npc: buildTaihangScoundrelNpc() },
                      rule: 'duel',
                      forbidEscapeReason: '八角生死擂万众瞩目，头阵岂能怯战！',
                      deathTitle: '折戟八角生死擂',
                      deathDetail:
                        '少侠于大名府八角生死擂头阵迎战太行叛匪焦三斧，不慎失手死于宣花板斧之下。',
                      introText:
                        '焦三斧抡起板斧恶狠狠劈来，刀口泛着阴毒寒芒——八角生死擂既开，既分高下，亦决生死！',
                      onWin: [
                        { type: 'healPlayer', hpPct: 45, mpPct: 45 },
                        {
                          type: 'modifyNpcFavor',
                          target: { kind: 'npc', npcId: 'NPC-0275' },
                          delta: 15,
                        },
                        {
                          type: 'modifyNpcFavor',
                          target: { kind: 'npc', npcId: 'NPC-0366' },
                          delta: 15,
                        },
                        openScene('scene_dm_leitai_bout2', 'QST-CITY-DAMING-BAJI'),
                      ],
                    },
                  ],
                },
              ],
            }

const INLINE_SCENE_22_scene_dm_ferry_chain_martial_solved: StorySceneDef = {
                        id: 'scene_dm_ferry_chain_martial_solved',
                        title: '半月霜痕 · 契丹铁林破甲斧',
                        beats: [
                          P('“好霸道的寒铁器！这三处断口绝非钢锯慢磨、亦非寻常江湖刀剑所能劈开——切面呈半月弧形霜纹，两侧铁环俱被巨力崩扁，滩涂芦苇丛下还留有钉着北地梅花铁掌的战马蹄印！”'),
                          N('你拓下切口霜纹与马蹄铁印：普天之下，唯有大辽北院【契丹铁林骁骑】制式的『六十四斤辽东寒铁破甲重斧』借重骑冲势连斩三记，方能造就此等断痕！'),
                        ],
                        onFinishEffects: buildClueGainEffects(
                          'dm_clue_chain',
                          '【线索一·铁索断口】亲手勘明断口霜纹与北地马掌印，确证乃契丹铁林骁骑「辽东寒铁破甲重斧」所斩！',
                        ),
                      }

const INLINE_SCENE_23_scene_dm_ferry_chain_spot: StorySceneDef = {
              id: 'scene_dm_ferry_chain_spot',
              title: '铁牛横江 · 寒霜断口辨重兵',
              subtitle: '黄河铁索渡口 · 镇河铁牛与横江铁索浮桥',
              beats: [
                N('黄河桃汛翻涌如沸，岸畔四尊丈许高的开元镇河铁牛脊背上，三根碗口粗的横江熟铁巨索齐齐自中断裂，残端垂入浑黄浪花之中，断口处犹泛着森森青白寒光。'),
              ],
              choices: [
                {
                  id: 'choice_spot_chain_martial_check',
                  label: '【攀索辨刃】踏浪攀上铁牛残索，以武学根底勘验劈斫劲力！（需根骨 ≥ 50 或 身法 ≥ 55）',
                  subLabel: '武林查法 · 直接锁定北庭重兵铁证',
                  tone: 'primary',
                  condition: {
                    type: 'any',
                    hint: '需 先天根骨 ≥ 50 或 身法 ≥ 55',
                    conditions: [
                      { type: 'talentAtLeast', key: '根骨', min: 50 },
                      { type: 'combatStatAtLeast', key: 'agility', min: 55 },
                    ],
                  },
                  effects: [
                    openScene('scene_dm_ferry_chain_martial_solved', 'QST-CITY-DAMING-BAJI'),
                  ],
                },
                {
                  id: 'choice_spot_chain_take_rubbing',
                  label: '【拓印断痕】以麻纸墨锭拓下缺口形制，携往隔壁【临河酒肆】请高人掌眼',
                  subLabel: '无属性门槛 · 可请栈桥酒肆「北侠」欧阳春辨认',
                  tone: 'default',
                  effects: [
                    { type: 'setFlag', flag: 'dm_chain_rubbing', value: true },
                    toast('已拓下铁索断口霜纹！可移步本渡口【客渡木栈桥与临河酒肆】请「北侠」欧阳春掌眼辨认。', 'talk', '铁锁查案'),
                  ],
                },
              ],
            }

const INLINE_SCENE_24_scene_dm_yamen_spot_ledger: StorySceneDef = {
              id: 'scene_dm_yamen_spot_ledger',
              title: '架阁黄册 · 河工生铁迷踪',
              subtitle: '大名府留守司衙',
              beats: [
                S('NPC-0727', '“少侠来得正好！转运司勾当公事【周文焕】催着把崔教习定罪结案，这摞《春汛商胡埽物料纲运黄册》就在架阁库案头，少侠且看能否揪出狐狸尾巴！”'),
              ],
              choices: [
                {
                  id: 'choice_spot_ledger_math',
                  label: '【珠算核吃水】按纲船吃水尺码核算一万二千斤生铁真伪！（需算术 ≥ 55 或 经义 ≥ 55）',
                  tone: 'gold',
                  condition: {
                    type: 'any',
                    hint: '需 算术 ≥ 55 或 经义 ≥ 55',
                    conditions: [
                      { type: 'skillAtLeast', key: '算术', min: 55 },
                      { type: 'skillAtLeast', key: '经义', min: 55 },
                    ],
                  },
                  effects: [
                    { type: 'modifySkill', key: '算术', delta: 1 },
                    {
                      type: 'modifyNpcFavor',
                      target: { kind: 'npc', npcId: 'NPC-0727' },
                      delta: 20,
                    },
                    ...buildClueGainEffects(
                      'dm_clue_ledger',
                      '【线索二·河防黄册】借纲船吃水一尺四寸之破绽，勘破周文焕早在半月前盗卖生铁、以河石封箱沉江灭迹！',
                    ),
                  ],
                },
                {
                  id: 'choice_spot_ledger_rhetoric',
                  label: '【危言诈书办】以三司磨勘重律震慑书办交出私改底单！（需辩才 ≥ 60）',
                  tone: 'jade',
                  condition: { type: 'skillAtLeast', key: '辩才', min: 60 },
                  effects: [
                    { type: 'modifySkill', key: '辩才', delta: 1 },
                    {
                      type: 'modifyNpcFavor',
                      target: { kind: 'npc', npcId: 'NPC-0727' },
                      delta: 15,
                    },
                    ...buildClueGainEffects(
                      'dm_clue_ledger',
                      '【线索二·河防黄册】喝破书办心防，夺得周文焕半月前私卖官铁之原始底单！',
                    ),
                  ],
                },
                {
                  id: 'choice_spot_ledger_bribe',
                  label: '【重金买底账】暗塞二十两纹银换取书办袖中副页（需 20 两银子）',
                  tone: 'default',
                  condition: { type: 'silverAtLeast', min: 20 },
                  effects: [
                    { type: 'giveSilver', amount: -20, reason: '打点留守司架阁库书办' },
                    ...buildClueGainEffects(
                      'dm_clue_ledger',
                      '【线索二·河防黄册】以二十两纹银购得暗账副页，查实生铁半月前早被周文焕盗卖！',
                    ),
                  ],
                },
              ],
            }

const INLINE_SCENE_25_scene_dm_leitai_spot_entry: StorySceneDef = {
              id: 'scene_dm_leitai_spot_entry',
              title: '八角擂台 · 旌旗蔽日待开战',
              subtitle: '河北枪棒大校场 · 六合枪棒八角比武擂台',
              beats: [
                S('NPC-0275', '“少侠来得正好！太行败类焦三斧已跳上八角台叫嚣骂阵，暗处更有契丹铁林军的高手窥伺我八极门深浅——咱们这便开擂？”'),
              ],
              choices: [
                {
                  id: 'choice_spot_leitai_greenwood',
                  label: '【亮出绿林盟字号】请副总瓢把子「九纹狂龙」史万山清理门户！',
                  tone: 'gold',
                  condition: { type: 'inSect', sectId: 'SECT-18' },
                  hideWhenUnavailable: true,
                  effects: [
                    {
                      type: 'modifyNpcFavor',
                      target: { kind: 'npc', npcId: 'NPC-0229' },
                      delta: 25,
                    },
                    openScene('scene_dm_leitai_bout2', 'QST-CITY-DAMING-BAJI'),
                  ],
                },
                {
                  id: 'choice_spot_leitai_fight',
                  label: '【跃上八角台】擂鼓开战，先挫焦三斧锐气！',
                  subLabel: '开启头阵生死擂（⚠️ 战败将直接丧命！）',
                  tone: 'danger',
                  effects: [
                    {
                      type: 'startCombat',
                      questId: QUEST_ID,
                      opponent: { kind: 'custom', npc: buildTaihangScoundrelNpc() },
                      rule: 'duel',
                      forbidEscapeReason: '八角生死擂万众瞩目，头阵岂能怯战！',
                      deathTitle: '折戟八角生死擂',
                      deathDetail:
                        '少侠于大名府八角生死擂头阵迎战太行叛匪焦三斧，不慎失手死于宣花板斧之下。',
                      onWin: [
                        { type: 'healPlayer', hpPct: 45, mpPct: 45 },
                        {
                          type: 'modifyNpcFavor',
                          target: { kind: 'npc', npcId: 'NPC-0275' },
                          delta: 15,
                        },
                        openScene('scene_dm_leitai_bout2', 'QST-CITY-DAMING-BAJI'),
                      ],
                    },
                  ],
                },
              ],
            }

const INLINE_SCENE_26_scene_dm_deadline_failed: StorySceneDef = {
            id: 'scene_dm_deadline_failed',
            title: '七日逾限 · 铁锁沉冤难雪',
            subtitle: '大名府 · 沧州八极分馆',
            beats: [
              N('七日之限转瞬即逝。因迟迟未能呈上足以扳倒转运司的铁证，勾当公事周文焕抢先一步签下发配文书，将沧州八极门真传教习崔帆坤枷锁押往登州沙门岛；而潜伏城中的契丹铁林死士亦在春雨夜色中销声匿迹……'),
              S('NPC-0366', '“罢了……终究是我八极门命里该有此劫，怨不得旁人。多谢少侠曾来问津，婉月这便北上登州设法营救师弟！”'),
            ],
            onFinishEffects: [
              warn('《铁锁镇河朔》七日查案逾限，崔帆坤含冤刺配登州，契丹谍影隐遁无踪。', '纪事抱憾'),
            ],
          }

export const SCENES: Record<string, StorySceneDef> = {
  [SCENE_LEITAI_BOUT_TWO.id]: SCENE_LEITAI_BOUT_TWO,
  [SCENE_DAMING_VICTORY_CHOICE.id]: SCENE_DAMING_VICTORY_CHOICE,
  [SCENE_MIDNIGHT_SANDTABLE_CLIMAX.id]: SCENE_MIDNIGHT_SANDTABLE_CLIMAX,
  [SCENE_JIA_COURT_TRAP.id]: SCENE_JIA_COURT_TRAP,
  [INLINE_SCENE_01_scene_dm_leitai_after_fight_win.id]: INLINE_SCENE_01_scene_dm_leitai_after_fight_win,
  [INLINE_SCENE_02_scene_dm_leitai_flaw_broken.id]: INLINE_SCENE_02_scene_dm_leitai_flaw_broken,
  [INLINE_SCENE_03_scene_dm_epilogue_official.id]: INLINE_SCENE_03_scene_dm_epilogue_official,
  [INLINE_SCENE_04_scene_dm_epilogue_baji.id]: INLINE_SCENE_04_scene_dm_epilogue_baji,
  [INLINE_SCENE_05_scene_dm_epilogue_outlaw.id]: INLINE_SCENE_05_scene_dm_epilogue_outlaw,
  [INLINE_SCENE_06_scene_dm_tavern_confrontation.id]: INLINE_SCENE_06_scene_dm_tavern_confrontation,
  [INLINE_SCENE_07_scene_dm_lu_wanyue_fellow_disciple.id]: INLINE_SCENE_07_scene_dm_lu_wanyue_fellow_disciple,
  [INLINE_SCENE_08_scene_dm_lu_wanyue_outsider.id]: INLINE_SCENE_08_scene_dm_lu_wanyue_outsider,
  [INLINE_SCENE_09_scene_dm_ouyang_reveal_wine.id]: INLINE_SCENE_09_scene_dm_ouyang_reveal_wine,
  [INLINE_SCENE_10_scene_dm_ouyang_reveal_spar_win.id]: INLINE_SCENE_10_scene_dm_ouyang_reveal_spar_win,
  [INLINE_SCENE_11_scene_dm_ouyang_reveal_spar_lose.id]: INLINE_SCENE_11_scene_dm_ouyang_reveal_spar_lose,
  [INLINE_SCENE_12_scene_dm_ouyang_chun_axe.id]: INLINE_SCENE_12_scene_dm_ouyang_chun_axe,
  [INLINE_SCENE_13_scene_dm_ledger_math_solved.id]: INLINE_SCENE_13_scene_dm_ledger_math_solved,
  [INLINE_SCENE_14_scene_dm_ledger_rhetoric_solved.id]: INLINE_SCENE_14_scene_dm_ledger_rhetoric_solved,
  [INLINE_SCENE_15_scene_dm_ledger_bribe_solved.id]: INLINE_SCENE_15_scene_dm_ledger_bribe_solved,
  [INLINE_SCENE_16_scene_dm_yamen_ledger_check.id]: INLINE_SCENE_16_scene_dm_yamen_ledger_check,
  [INLINE_SCENE_17_scene_dm_chen_intel_basic.id]: INLINE_SCENE_17_scene_dm_chen_intel_basic,
  [INLINE_SCENE_18_scene_dm_chen_intel_generous.id]: INLINE_SCENE_18_scene_dm_chen_intel_generous,
  [INLINE_SCENE_19_scene_dm_chen_guyan_watchtower.id]: INLINE_SCENE_19_scene_dm_chen_guyan_watchtower,
  [INLINE_SCENE_20_scene_dm_bout1_shi_wanshan_slap.id]: INLINE_SCENE_20_scene_dm_bout1_shi_wanshan_slap,
  [INLINE_SCENE_21_scene_dm_leitai_bout1.id]: INLINE_SCENE_21_scene_dm_leitai_bout1,
  [INLINE_SCENE_22_scene_dm_ferry_chain_martial_solved.id]: INLINE_SCENE_22_scene_dm_ferry_chain_martial_solved,
  [INLINE_SCENE_23_scene_dm_ferry_chain_spot.id]: INLINE_SCENE_23_scene_dm_ferry_chain_spot,
  [INLINE_SCENE_24_scene_dm_yamen_spot_ledger.id]: INLINE_SCENE_24_scene_dm_yamen_spot_ledger,
  [INLINE_SCENE_25_scene_dm_leitai_spot_entry.id]: INLINE_SCENE_25_scene_dm_leitai_spot_entry,
  [INLINE_SCENE_26_scene_dm_deadline_failed.id]: INLINE_SCENE_26_scene_dm_deadline_failed,
}
