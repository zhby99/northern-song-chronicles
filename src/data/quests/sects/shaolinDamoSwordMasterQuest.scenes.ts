import type { StorySceneDef } from '../../../types/quest'
import { N, P, S, openScene, setStep, toast, teachArtNow } from '../../../engine/quest/dsl'
import { SHAOLIN_Q24_QUEST_ID } from './shaolinDamoSwordMasterQuest'

export const SCENES: Record<string, StorySceneDef> = {
  scene_slq24_01: {
    id: 'scene_slq24_01',
    title: '第一幕 · 绝壁剑痕 · 不立文字',
    subtitle: '达摩院 · 绝壁石刻 · 剑痕崖',
    mandatory: true,
    beats: [
      N('{reignYear}深冬，嵩山云海翻涌。你奉达摩院伏魔首座玄难之命，仅携一柄寻常青竹剑登上后山绝巅的【绝壁石刻 · 剑痕崖】。石洞深处青岩之上，一道淡墨盘坐石影历数百年风雨不灭，四周纵横三十六道深浅剑痕。'),
      S('NPC-0127', '（负手立于崖畔，僧袍猎猎）“阿弥陀佛！师侄昔年于寒玉榻前守卫玄澄师兄，已见禅定之功。今日老衲带你登剑痕崖，正是为传你达摩院剑道绝学——《达摩剑法》！”'),
      S('NPC-0127', '“常人练剑总记刺挑抹撩的死招，可禅宗讲『不立文字，直指人心』。这《达摩剑法》全在这面壁石影与三十六道剑痕之中——老衲给你三昼夜时间静坐观壁，若能以手中青竹剑刺破云海而不惊寒雀，便算初得达摩剑意！”'),
      P('（凝望幽寂石洞与初祖石影，横竹于膝肃然稽首）“弟子谨遵玄难师伯法旨，这便入洞面壁参剑！”'),
    ],
    onFinishEffects: [openScene('scene_slq24_02', SHAOLIN_Q24_QUEST_ID)],
  },

  scene_slq24_02: {
    id: 'scene_slq24_02',
    title: '第二幕 · 三昼观壁 · 笔意通剑',
    subtitle: '达摩石洞 · 静坐顿悟',
    mandatory: true,
    beats: [
      N('玄难下崖而去，石洞重归万籁俱寂。第一昼夜寒风透骨，石影只是一团斑驳淡墨，三十六道剑痕杂乱无章，你心头几度浮躁，只得默诵《楞伽经》与《金刚经》镇定灵台。'),
      N('第二昼夜月升东峰，清冷月华斜射入洞，恰好将青岩上的三十六道残剑痕与初祖石影同时照亮！刹那间，你忽觉满壁剑痕不再死寂——起笔藏锋、收笔回环，竟与自己多年所习书法行草与佛门经义隐隐共鸣！'),
      N('月影渐移，灵台顿悟只差临门一脚，你决意循哪一路径贯通满壁剑意？'),
    ],
    choices: [
      {
        id: 'slq24_meditate_brush',
        label: '【以行草笔势串连三十六痕】循王右军连绵回环笔意，将满壁剑痕化作一篇《心经》狂草！',
        subLabel: '以书通剑，悟出攻守生克连绵之变',
        tone: 'jade',
        effects: [
          { type: 'setFlag', flag: 'sl_q24_meditate_way', value: 'brush' },
          openScene('scene_slq24_03', SHAOLIN_Q24_QUEST_ID),
        ],
      },
      {
        id: 'slq24_meditate_shadow',
        label: '【直参初祖面壁空静石影】放下招式起落执念，先悟「无剑之剑、一念化千锋」之禅境！',
        subLabel: '以禅化剑，悟出圆融无迹之势',
        tone: 'gold',
        effects: [
          { type: 'setFlag', flag: 'sl_q24_meditate_way', value: 'shadow' },
          openScene('scene_slq24_03', SHAOLIN_Q24_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq24_03: {
    id: 'scene_slq24_03',
    title: '第三幕 · 剑化禅机 · 竹剑试云',
    subtitle: '达摩石洞 → 绝壁石刻 · 剑痕崖',
    illustrationUrl: '/assets/quests/sl_24_damo_shadow.jpg',
    illustrationCaption: '面壁悟剑 · 达摩石洞清辉如水，你观初祖石影三昼夜豁然顿悟，青竹剑光如禅影流转',
    mandatory: true,
    beats: [
      N('第三昼夜黎明将至，朝霞微露。{ifFlagEq:sl_q24_meditate_way=brush|满壁三十六道剑痕如龙蛇走壁连成一气，与淡墨石影合而为一！|石洞中淡墨石影仿佛活了过来，四周三十六道剑痕尽数归于一点澄明！}你手中青竹剑不知不觉随心而动，在洞中缓缓划出一道圆融无瑕的弧光！'),
      N('剑尖所过之处洞尘纹丝不动，剑气却凝练如实质！『一花开五叶，结果自然成』——少林七十二绝技之《达摩剑法》，终在这一刻于你灵台豁然贯通！'),
      N('你长身出洞立于剑痕崖畔，面对翻滚云海随手刺出一招「初祖西来」——青竹剑尖青芒吞吐，悄无声息将三尺外一团流云切作两半，崖边松枝上的两只寒雀竟毫无所觉！'),
      P('（收剑合十，感怀初祖遗泽）“无剑之剑，心定则锋凝——原来《达摩剑法》真意竟在于此！”'),
    ],
    onFinishEffects: [teachArtNow('MA-048'), openScene('scene_slq24_04', SHAOLIN_Q24_QUEST_ID)],
  },

  scene_slq24_04: {
    id: 'scene_slq24_04',
    title: '第四幕 · 怪声破静 · 姑苏双将',
    subtitle: '绝壁石刻 · 不速之客',
    mandatory: true,
    beats: [
      N('话音未落，绝壁下方松林中骤然传来一声阴阳怪气的朗笑！两道矫健身影如大鸟攀援跃上剑痕崖——左首青衫瘦削、唇薄倨傲者乃姑苏慕容氏「非也先生」【包不同】；右首虬髯满面、腰佩厚背长刀、神色狂热好战者乃「一阵风」【风波恶】！'),
      S('NPC-0213', '“非也，非也！世人都说少林《达摩剑法》凌厉无双，今日一见，原来不过是拿根破竹竿儿切切云雾、哄哄麻雀罢了！”'),
      S('NPC-0214', '（早已按捺不住，抚摸刀柄哈哈大笑）“包三哥说得太损啦！这小和尚方才那一剑连鸟都没惊动，内劲藏得够深！风某手痒得很，正好上来跟他痛快打上一架！”'),
      P('（眉头一皱，横青竹剑于胸前）“阿弥陀佛！此乃少林达摩院禁地剑痕崖，姑苏慕容两位施主不告而入窥伺绝学，未免有失江南名门体统！”'),
    ],
    choices: [
      {
        id: 'slq24_accept_debate',
        label: '【横竹论理 · 先挫其锋】且听「非也先生」如何诡辩，以禅机机锋会一会包不同！',
        subLabel: '开启【面壁九年 · 剑化禅机】剑痕截客阶段',
        tone: 'jade',
        effects: [
          { type: 'startQuest', questId: SHAOLIN_Q24_QUEST_ID, stepId: 'cliff_duel_murong' },
          setStep(SHAOLIN_Q24_QUEST_ID, 'cliff_duel_murong'),
          openScene('scene_slq24_05', SHAOLIN_Q24_QUEST_ID),
        ],
      },
      {
        id: 'slq24_accept_guard',
        label: '【剑指云海 · 守卫初祖洞】踏前一步护住达摩石洞，斥责慕容双将擅闯禁地！',
        subLabel: '开启【面壁九年 · 剑化禅机】剑痕截客阶段',
        tone: 'gold',
        effects: [
          { type: 'startQuest', questId: SHAOLIN_Q24_QUEST_ID, stepId: 'cliff_duel_murong' },
          setStep(SHAOLIN_Q24_QUEST_ID, 'cliff_duel_murong'),
          openScene('scene_slq24_05', SHAOLIN_Q24_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq24_05: {
    id: 'scene_slq24_05',
    title: '第五幕 · 舌战「非也非也」',
    subtitle: '剑痕崖 · 禅锋机辩',
    mandatory: true,
    beats: [
      S('NPC-0213', '（摇头晃脑，连珠炮般抛出一串诡辩）“非也，非也！天下名山天下人登得，怎的嵩山少室便只许和尚看、不许江南客看？再说我姑苏慕容氏『以彼之道，还施彼身』，来看两眼《达摩剑法》叫切磋印证，算不得偷窥！小和尚说我无礼，更是非也非也！”'),
      S('NPC-0214', '（“锵”地拔出厚背长刀跃跃欲试）“包三哥你先别跟他嚼舌根了，快亮刀咱俩一齐试他一试！”'),
      N('包不同却素来最爱逞口舌之快、见人必抬杠，此刻正得意洋洋地捻须斜睨着你，等着你与他争辩规矩好再连抛十句「非也」！面对这位天下第一抬杠名家，你从容吐出一言——'),
    ],
    choices: [
      {
        id: 'slq24_debate_rule',
        label: '“施主擅闯少林禁地偷窥绝学，按江湖规矩理当受戒律院惩处，岂容巧言诡辩！”',
        tone: 'default',
        effects: [
          { type: 'setFlag', flag: 'sl_q24_bao_beaten', value: false },
          openScene('scene_slq24_06b_recover', SHAOLIN_Q24_QUEST_ID),
        ],
      },
      {
        id: 'slq24_debate_zen',
        label: '“施主既言『非也』，连『非也』二字本身亦非；既皆为非，施主又何须多舌自陷执妄？”',
        tone: 'default',
        effects: [
          { type: 'setFlag', flag: 'sl_q24_bao_beaten', value: true },
          { type: 'setFlag', flag: 'sl_q24_debate_done', value: true },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q24_debate_scored', op: 'falsy' },
            thenEffects: [
              { type: 'setFlag', flag: 'sl_q24_debate_scored', value: true },
              { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 2 },
            ],
          },
          openScene('scene_slq24_06a_speechless', SHAOLIN_Q24_QUEST_ID),
        ],
      },
      {
        id: 'slq24_debate_pride',
        label: '“达摩初祖面壁九年所留禅剑博大精深，凭姑苏慕容外道眼光，看上十年也未必悟得皮毛！”',
        tone: 'default',
        effects: [
          { type: 'setFlag', flag: 'sl_q24_bao_beaten', value: false },
          openScene('scene_slq24_06b_recover', SHAOLIN_Q24_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq24_06a_speechless: {
    id: 'scene_slq24_06a_speechless',
    title: '第六幕 · 语塞服输 · 退坐观战',
    subtitle: '剑痕崖 · 包不同折服',
    mandatory: true,
    beats: [
      N('此言一出，崖上朔风仿佛都为之一静！包不同张口便要习惯性反驳一句“非也”，话到舌尖却猛然噎住——若再说“非也”，岂不正好坐实了“连非也亦非”？若不说“非也”，他包三爷半世抬杠威名又往哪搁！'),
      S('NPC-0213', '（憋得面皮涨红，连张两次嘴竟吐不出半个字，旋即猛地拍掌仰天大笑）“哈哈哈哈！好！好个伶牙俐齿的禅门机锋！包某走南闯北二十年，头一回被人用自己的『非也』二字堵得哑口无言！”'),
      S('NPC-0213', '（倒也颇有江南名士傲骨，“唰”地还刀入鞘，大剌剌盘坐于崖畔青石上）“斗嘴既输了你一筹，包某便不以多欺少、今日袖手旁观绝不插手！风四弟，这小和尚禅机厉害得很，你一人放手跟他切磋罢！”'),
      S('NPC-0214', '（眼睛大亮，拍腿狂喜）“正合风某心意！一打一才够痛快！小师父，接我姑苏慕容狂风快刀！”'),
    ],
    onFinishEffects: [
      { type: 'setFlag', flag: 'sl_q24_murong_arrived', value: true },
      openScene('scene_slq24_07', SHAOLIN_Q24_QUEST_ID),
    ],
  },

  scene_slq24_06b_recover: {
    id: 'scene_slq24_06b_recover',
    title: '第六幕 · 诡辩难休 · 机锋补救',
    subtitle: '剑痕崖 · 双将合围',
    mandatory: true,
    beats: [
      S('NPC-0213', '（闻言大乐，立刻抓住话柄得意洋洋摇头晃脑）“非也，非也！少林既是佛门慈悲地，动辄拿戒律院压人、又瞧不起江南客眼光，岂非自己先破了嗔戒与慢戒？包某这番道理，小和尚可答不上来了罢！”'),
      S('NPC-0214', '（“锵”地横刀抢步，包不同亦冷笑抽出短刀一左一右合围而来）“包三哥赢了嘴仗，轮到咱们刀剑上见高低了！”'),
      N('包不同眼看便要与风波恶联手车轮围攻！电光火石间，你心念急转——还可凭深厚辩才反诘其悖论，亦或干脆以青竹剑独斗慕容双将！'),
    ],
    choices: [
      {
        id: 'slq24_recover_eloquence',
        label: '【雄辩反诘破其诡圈】三言点破「以无礼责人守礼」的自相矛盾，叫包不同当场语塞！',
        subLabel: '需辩才 ≥ 60 · 折服包不同令其退下观战，仅 1v1 切磋风波恶（禅心慈悲 +1）',
        tone: 'jade',
        condition: { type: 'skillAtLeast', key: '辩才', min: 60 },
        effects: [
          { type: 'setFlag', flag: 'sl_q24_bao_beaten', value: true },
          { type: 'setFlag', flag: 'sl_q24_debate_done', value: true },
          { type: 'setFlag', flag: 'sl_q24_murong_arrived', value: true },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q24_debate_scored', op: 'falsy' },
            thenEffects: [
              { type: 'setFlag', flag: 'sl_q24_debate_scored', value: true },
              { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 1 },
            ],
          },
          toast('你三言反诘直戳包不同诡辩死穴！包不同哑然大笑还刀退坐石上：“嘴仗算包某输你半筹，今番让风四弟一人与你切磋！”', 'success', '舌辩退包'),
          openScene('scene_slq24_07', SHAOLIN_Q24_QUEST_ID),
        ],
      },
      {
        id: 'slq24_recover_fight_both',
        label: '【不与多舌 · 以剑见真章】既说不通，便请包、风二位一并亮刀，看我青竹达摩剑！',
        subLabel: '零门槛正攻 · 车轮连战包不同与风波恶（胜后怒目杀业 +1）',
        tone: 'danger',
        effects: [
          { type: 'setFlag', flag: 'sl_q24_bao_beaten', value: false },
          { type: 'setFlag', flag: 'sl_q24_debate_done', value: true },
          { type: 'setFlag', flag: 'sl_q24_murong_arrived', value: true },
          openScene('scene_slq24_07', SHAOLIN_Q24_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq24_07: {
    id: 'scene_slq24_07',
    title: '第七幕 · 崖巅剑战',
    subtitle: '绝壁石刻 · 剑痕崖（实战）',
    mandatory: true,
    beats: [
      N('剑痕崖上云海翻腾，罡风呼啸！你稳持青竹剑立于达摩石洞之前，禅心古井无波，将三昼夜观壁悟得的《达摩剑法》徐徐展开。'),
      N('{ifFlag:sl_q24_bao_beaten|包不同信守诺言盘坐青石旁观不语，眼中隐含期待；武痴风波恶则长啸一声挥刀抢攻，狂风快刀如疾风暴雨般朝你劈面卷来！|包不同与风波恶一左一右散开身形，一诡一猛、一快一奇，刀剑寒芒封死你周身退路！}'),
      P('（青竹剑微振发出清越竹鸣）“二位施主既执意在达摩初祖崖前试剑，贫僧便以这柄青竹剑领教姑苏慕容高招！”'),
    ],
    choices: [
      {
        id: 'slq24_fight_feng_solo',
        label: '剑化禅机，1v1 切磋武痴【一阵风 · 风波恶】！（包不同已服输观战）',
        subLabel: '舌辩大胜跳过包不同，专注 1v1 破风波恶狂风快刀',
        tone: 'jade',
        condition: { type: 'flag', flag: 'sl_q24_bao_beaten', op: 'truthy' },
        hideWhenUnavailable: true,
        effects: [
          {
            type: 'startCombat',
            questId: SHAOLIN_Q24_QUEST_ID,
            opponent: {
              kind: 'npc',
              npcId: 'NPC-0214',
              talkOverride:
                '“哈哈哈哈！包三哥嘴仗输给了你，风某倒要看看你的竹剑功夫是不是跟禅机一样妙！接刀！”',
            },
            rule: 'story_trial',
            duelStakesTag: 'spar',
            forbidEscapeReason: '达摩石洞就在身后，须以竹剑挑落来客佩刀以扬少林威仪！',
            introText: '【剑痕崖 · 1v1 论剑】包不同袖手旁观，以《达摩剑法》独战武痴【风波恶】！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              openScene('scene_slq24_08', SHAOLIN_Q24_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('风波恶狂风快刀极为迅猛！调息后可再于【绝壁石刻 · 剑痕崖】续战风波恶。', 'warn', '剑痕截客'),
            ],
          },
        ],
      },
      {
        id: 'slq24_fight_bao_feng',
        label: '剑化禅机，车轮连战慕容家将【包不同】与【风波恶】！',
        subLabel: '车轮连战迎击慕容双将（胜后怒目杀业 +1）',
        tone: 'danger',
        condition: { type: 'flag', flag: 'sl_q24_bao_beaten', op: 'falsy' },
        hideWhenUnavailable: true,
        effects: [
          {
            type: 'startCombat',
            format: 'gauntlet',
            questId: SHAOLIN_Q24_QUEST_ID,
            opponent: {
              kind: 'npc',
              npcId: 'NPC-0213',
              talkOverride:
                '“非也，非也！少林《达摩剑法》虽妙，却也未必胜过我姑苏慕容家刀剑合璧！风四弟，咱俩车轮上阵，瞧瞧这小和尚有几分火候！”',
            },
            extraOpponents: [
              {
                kind: 'npc',
                npcId: 'NPC-0214',
                talkOverride:
                  '“好哇好哇！风某平生最爱跟绝顶高手打架！这剑痕崖风大地方宽，正是放手一战的好去处！看刀！”',
              },
            ],
            rule: 'story_trial',
            duelStakesTag: 'spar',
            forbidEscapeReason: '达摩石洞就在身后，岂可任慕容双将轻视少林绝学！',
            introText: '【剑痕崖 · 车轮连战】独斗姑苏慕容【包不同】与【风波恶】！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              {
                type: 'branch',
                condition: { type: 'flag', flag: 'sl_q24_combat_scored', op: 'falsy' },
                thenEffects: [
                  { type: 'setFlag', flag: 'sl_q24_combat_scored', value: true },
                  { type: 'addFlagNumber', flag: 'sl_karma_wrath', delta: 1 },
                ],
              },
              openScene('scene_slq24_08', SHAOLIN_Q24_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('包不同与风波恶联手极为凌厉！调息后可再于【绝壁石刻 · 剑痕崖】续战二人。', 'warn', '剑痕截客'),
            ],
          },
        ],
      },
    ],
  },

  scene_slq24_08: {
    id: 'scene_slq24_08',
    title: '第八幕 · 一剑挑锋 · 送客抉择',
    subtitle: '剑痕崖 · 佩刀落地',
    illustrationUrl: '/assets/quests/sl_24_bao_feng_duel.jpg',
    illustrationCaption: '剑化禅机 · 绝壁云海之上，你以一柄青竹剑演尽达摩禅意，圆融一剑挑落慕容家将手中钢刀',
    mandatory: true,
    beats: [
      N('激斗三十余合，你眼眸一亮，青竹剑缓缓划出一记圆弧，将《达摩剑法》「一苇渡江」「面壁九年」「只履西归」三式连环贯通！剑光看似舒缓，却封死了对方所有变招空隙，剑尖在刀锷与虎口轻轻一挑一震——'),
      N('“当啷！”一声脆响，厚背钢刀竟被一根寻常青竹剑震脱掌心，斜插在三步外的青石缝中嗡嗡作响！风波恶虎口发麻愣在原地，旋即拍腿畅快大笑！'),
      S('NPC-0214', '“好剑法！好禅机！拿一根青竹竿挑飞风某的厚背钢刀，风某输得心服口服！小师父，改日到了江南燕子坞，风某一定请你喝最好的太湖碧螺春！”'),
      S('NPC-0213', '（也老老实实抱拳一礼，虽仍嘴硬却满眼佩服）“非也，非也……今日算你少林《达摩剑法》略胜半筹！风四弟，咱们走罢，免得玄难老和尚上来了唠叨！”'),
    ],
    choices: [
      {
        id: 'slq24_farewell_tea',
        label: '【以茶礼送痴武客】佩服风波恶赤子侠气，取洞中山泉清茶相敬送二人下崖！',
        subLabel: '结一份江南武林善缘，风波恶好感大增（禅心慈悲 +1）',
        tone: 'jade',
        effects: [
          { type: 'setFlag', flag: 'sl_q24_farewell', value: 'tea' },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q24_farewell_scored', op: 'falsy' },
            thenEffects: [
              { type: 'setFlag', flag: 'sl_q24_farewell_scored', value: true },
              { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 1 },
            ],
          },
          openScene('scene_slq24_09', SHAOLIN_Q24_QUEST_ID),
        ],
      },
      {
        id: 'slq24_farewell_warn',
        label: '【凛然警诫姑苏慕容】收剑肃容，告诫二人转告慕容氏切莫再觊觎少林千年武藏！',
        subLabel: '凛然立威，震慑慕容氏暗潮野心（怒目杀业 +1）',
        tone: 'danger',
        effects: [
          { type: 'setFlag', flag: 'sl_q24_farewell', value: 'warn' },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q24_farewell_scored', op: 'falsy' },
            thenEffects: [
              { type: 'setFlag', flag: 'sl_q24_farewell_scored', value: true },
              { type: 'addFlagNumber', flag: 'sl_karma_wrath', delta: 1 },
            ],
          },
          openScene('scene_slq24_09', SHAOLIN_Q24_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq24_09: {
    id: 'scene_slq24_09',
    title: '第九幕 · 玄难登崖 · 暗流警醒',
    subtitle: '绝壁石刻 · 剑痕崖',
    mandatory: true,
    beats: [
      N('{ifFlagEq:sl_q24_farewell=tea|你捧出洞中清泉山茶相送，风波恶一饮而尽大呼痛快，连包不同都破例没说一句「非也」，二人拱手纵跃入云海而去。|你凛然一言声震云崖，包不同眼中闪过一丝忌惮，拉着意犹未尽的风波恶拾刀抱拳，双双施展轻功纵跃下崖消没于松涛之中。}'),
      N('双将方去，一阵朗笑自崖畔松林响起，伏魔首座玄难缓步踏云而来，显然早已将崖上舌辩与竹剑之战尽收眼底！'),
      S('NPC-0127', '（抚掌大赞）“阿弥陀佛！{ifFlag:sl_q24_bao_beaten|先以禅门机锋折服包不同令其无词以对，复以一根青竹剑挑落风波恶钢刀，文武兼备、不伤人命而扬少林威仪，善哉！善哉！|以一根青竹剑车轮独挫慕容双将、挑落二人佩刀，不伤人命而扬少林威仪，善哉！善哉！}”'),
      S('NPC-0127', '（神色微肃，远望江南方向）“只是姑苏慕容氏家将竟敢公然登我剑痕崖窥剑，足见江湖暗流日益汹涌。你既成达摩院剑道真传，日后仍须精进不懈，以备大变！”'),
    ],
    onFinishEffects: [openScene('scene_slq24_10', SHAOLIN_Q24_QUEST_ID)],
  },

  scene_slq24_10: {
    id: 'scene_slq24_10',
    title: '第十幕 · 崖畔印禅 · 剑心通明',
    subtitle: '嵩山少林寺 · 绝壁石刻 · 剑痕崖',
    illustrationUrl: '/assets/quests/sl_24_cliff_zen.jpg',
    illustrationCaption: '崖畔禅心 · 云海松涛映朝霞，玄难首座于剑痕崖畔为你印证《达摩剑法》真传圆满',
    mandatory: true,
    beats: [
      N('朝阳彻底跃出云海，万道金光洒满剑痕崖与初祖石洞。玄难取出一卷封存已久的达摩院剑道总纲，亲手交予你。'),
      S('NPC-0127', '“三昼夜观石影顿悟，复以实战挫败慕容家将，你已真正承继了达摩院《达摩剑法》之衣钵！日后无论手中执竹枝还是宝剑，只要心中有禅，万物皆可为剑！”'),
      P('（接过剑道总纲，向初祖石洞与玄难首座深深一揖）“多谢师伯引路点化！弟子经此三日悟剑，非但习得《达摩剑法》，连书法笔意与经义禅理亦豁然贯通！”'),
      N('山风清越，青竹剑微鸣。你立于剑痕崖畔俯瞰云海，心中剑意如初祖石影般沉静浩瀚，正式踏上达摩院真传绝顶之路！'),
    ],
    choices: [
      {
        id: 'slq24_complete',
        label: '习得《达摩剑法》，圆满完成【面壁九年 · 剑化禅机】',
        tone: 'gold',
        effects: [
          {
            type: 'branch',
            condition: { type: 'learnedArtAtLeast', artId: 'MA-048', minLevel: 1 },
            thenEffects: [],
            elseEffects: [{ type: 'teachMartialArt', artId: 'MA-048', level: 1 }],
          },
          {
            type: 'giveCombatExp',
            amount: 650,
            reason: '于剑痕崖观初祖石影三昼夜悟得《达摩剑法》，舌辩挑刀力挫慕容家将包不同与风波恶',
          },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q24_bao_beaten', op: 'truthy' },
            thenEffects: [
              { type: 'giveCombatExp', amount: 100, reason: '以禅锋机辩折服「非也先生」包不同' },
              { type: 'modifyRenown', delta: 30, reason: '剑痕崖禅辩折服包不同、竹剑胜风波恶，佳话传扬江湖' },
            ],
            elseEffects: [],
          },
          { type: 'addSectContribution', amount: 220 },
          { type: 'modifySkill', key: '书', delta: 2 },
          { type: 'modifySkill', key: '经义', delta: 1 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0127' }, delta: 20 },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q24_farewell', op: 'eq', value: 'tea' },
            thenEffects: [{ type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0214' }, delta: 12 }],
            elseEffects: [],
          },
          { type: 'completeQuest', questId: SHAOLIN_Q24_QUEST_ID, outcome: 'completed' },
          toast(
            '【面壁九年 · 剑化禅机】圆满完成！习得《达摩剑法》，实战经验 +650、贡献 +220、书 +2、经义 +1、玄难好感 +20！',
            'success',
            '剑化禅机',
          ),
        ],
      },
    ],
  },
}
