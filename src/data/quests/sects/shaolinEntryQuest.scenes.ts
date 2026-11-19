import type { QuestEffect, StorySceneDef } from '../../../types/quest'
import { N, P, S, qStatus, setStep, warn, toast, openScene } from '../../../engine/quest/dsl'
import { SHAOLIN_ENTRY_QUEST_ID, SHAOLIN_BROKER_ACTOR_ID, SHAOLIN_LUOYANG_BROKER_ACTOR } from './shaolinEntryQuest'

const EXTRA_SCENES: Record<string, StorySceneDef> = {}
function regScene(sc: StorySceneDef): string {
  EXTRA_SCENES[sc.id] = sc
  return sc.id
}

const AFTER_FIRST_REJECT_EFFECTS: QuestEffect[] = [
  { type: 'setFlag', flag: 'shaolin_first_rejected', value: true },
  {
    type: 'branch',
    condition: qStatus(SHAOLIN_ENTRY_QUEST_ID, 'not_started'),
    thenEffects: [
      {
        type: 'spawnDynamicActor',
        actor: SHAOLIN_LUOYANG_BROKER_ACTOR,
      },
      {
        type: 'startQuest',
        questId: SHAOLIN_ENTRY_QUEST_ID,
        stepId: 'seek_luoyang_rumor',
      },
      warn('知客禅师玄净百般挑剔，拒不收录！不妨下山赴邻近的【洛阳府 · 洛水天津酒楼】歇脚探听，看市井间有无拜入少林的门道。', '嵩门受阻'),
    ],
    elseEffects: [
      warn('未曾打点妥当之前，无论少侠如何作答，知客禅师玄净皆一口咬定「佛缘不足」！', '嵩门问心'),
    ],
  },
]

function buildUnbribedRebuttalScene(
  combo: 'AA' | 'AB' | 'BA' | 'BB',
  playerAnswerSummary: string,
  rebuttalText: string,
): StorySceneDef {
  return {
    id: `scene_shaolin_unbribed_${combo.toLowerCase()}`,
    title: '嵩门问心 · 佛缘不足',
    subtitle: '大雄宝殿方丈院 · 钟鼓禅院',
    beats: [
      P(playerAnswerSummary),
      S('NPC-0193', `（知客禅师玄净捻须垂目，手中菩提念珠倏然一顿，脸色沉了下来）${rebuttalText}`),
      N('言罢，玄净大袖一拂，端起案上冷茶便作送客之态，任凭你再说半句也不肯抬眼。看他那副油盐难进却又隐隐觑向香火功德箱的神色，此事只怕另有市井关窍——洛阳近在少室山脚，城中【洛水天津酒楼】向来鱼龙混杂，或许能探听到其中门道。'),
    ],
    onFinishEffects: AFTER_FIRST_REJECT_EFFECTS,
  }
}

function buildUnbribedQuestion2Scene(q1Choice: 'A' | 'B'): StorySceneDef {
  const isQ1A = q1Choice === 'A'
  return {
    id: `scene_shaolin_unbribed_q2_${q1Choice.toLowerCase()}`,
    title: '知客二问 · 入寺所求',
    subtitle: '第二题：修武立心',
    beats: [
      P(isQ1A
          ? '“既见生灵涂炭，岂能坐视？晚辈自当持戒刀喝退恶虎，救下那头小鹿！”'
          : '“弱肉强食乃天地造化常理，强动刀兵反添杀孽，晚辈当袖手旁观，顺其自然。”'),
      S('NPC-0193', '（玄净不置可否地挑了挑眉，又徐徐发问）“再问第二题——我少林七十二绝技甲于天下，善信既欲拜入山门，心中所求究竟为何？”'),
    ],
    choices: [
      {
        id: `unbribed_${q1Choice}A`,
        label: '【甲 · 济世】愿习得上乘绝技，日后下山除暴安良、护国佑民。',
        tone: 'primary',
        effects: [
          openScene(regScene(isQ1A
              ? buildUnbribedRebuttalScene(
                  'AA',
                  '“晚辈愿习得少林上乘绝技，日后下山除暴安良、护国佑民！”',
                  '“阿弥陀佛！施主口口声声救鹿除暴，看似仁义，实则心中杀伐之气太盛！救鹿要亮刀，下山要争雄——你把佛门清净地当成江湖武馆了！戾气未消，佛缘不足，请回吧！”',
                )
              : buildUnbribedRebuttalScene(
                  'BA',
                  '“晚辈愿习得少林上乘绝技，日后下山除暴安良、护国佑民！”',
                  '“哼，荒谬！施主见恶虎食鹿尚且袖手旁观，连眼前一头弱鹿都不肯救，却在此奢谈什么日后下山护国佑民？一屋不扫，何以扫天下！此等空谈大话之辈，佛缘不足，请回吧！”',
                )), 'QST-SECT-01-ENTRY'),
        ],
      },
      {
        id: `unbribed_${q1Choice}B`,
        label: '【乙 · 修身】只求青灯古佛、强身健体，斩断红尘妄念。',
        tone: 'jade',
        effects: [
          openScene(regScene(isQ1A
              ? buildUnbribedRebuttalScene(
                  'AB',
                  '“晚辈别无奢求，只愿伴青灯古佛、强身健体，斩断红尘一切妄念。”',
                  '“施主方才还说要拔刀救鹿、强行干涉因果，转眼又说要青灯古佛、斩断妄念——前后相悖，心口不一！心不定则禅不生，如此浮躁不定，如何参得透达摩祖师心印？佛缘不足，下山去吧。”',
                )
              : buildUnbribedRebuttalScene(
                  'BB',
                  '“晚辈别无奢求，只愿伴青灯古佛、强身健体，斩断红尘一切妄念。”',
                  '“施主见死不救，口称‘顺其自然’，求道又只图‘独善其身’——这是躲进深山图清闲安逸，全无半点我佛普度众生的大悲心肠！少林寺不是避世偷懒的所在，佛缘不足，莫要耽误彼此修行！”',
                )), 'QST-SECT-01-ENTRY'),
        ],
      },
    ],
  }
}

const UNBRIBED_INTRO_SCENE: StorySceneDef = {
  id: 'scene_shaolin_unbribed_q1',
  title: '古刹钟声 · 知客考问',
  subtitle: '嵩山少林寺 · 钟鼓禅院',
  beats: [
    N('少室山松柏参天，暮鼓晨钟回荡山谷。钟鼓禅院内，兼管知客迎宾的戒律院高僧玄净正端坐禅榻之上，半眯着眼将你上下打量了一番。'),
    S('NPC-0193', '“阿弥陀佛。近来仰慕我少林威名、欲投山门学艺的俗家子弟多如过江之鲫。本寺虽慈悲为怀，却也讲究个‘佛缘’二字。老衲且考你两道问心题，看你与我佛门有无缘法。”'),
    S('NPC-0193', '“第一题——善信登临嵩山，若见山门外有一头吊睛恶虎正扑咬幼鹿，而你手里恰有一柄戒刀，当如何处置？”'),
  ],
  choices: [
    {
      id: 'unbribed_q1_a',
      label: '【甲 · 护生】持刀喝退恶虎，救下那头小鹿。',
      tone: 'primary',
      effects: [
        openScene(regScene(buildUnbribedQuestion2Scene('A')), 'QST-SECT-01-ENTRY'),
      ],
    },
    {
      id: 'unbribed_q1_b',
      label: '【乙 · 顺缘】弱肉强食乃天地常理，袖手旁观，莫沾杀孽。',
      tone: 'jade',
      effects: [
        openScene(regScene(buildUnbribedQuestion2Scene('B')), 'QST-SECT-01-ENTRY'),
      ],
    },
  ],
}

const AFTER_BRIBE_PASS_EFFECTS: QuestEffect[] = [
  { type: 'activateShaolinNovice' },
  {
    type: 'removeDynamicActor',
    actorId: SHAOLIN_BROKER_ACTOR_ID,
  },
  {
    type: 'setQuestStep',
    questId: SHAOLIN_ENTRY_QUEST_ID,
    stepId: 'mountain_gate_chores',
    deadlineDays: null,
  },
  toast('已获录为【少林寺杂役弟子】（暂未正式入少林门籍）！请返回嵩山少林寺【山门全景】，自选天数承担山门洒扫担水杂役，累计满 365 天即可正式引荐入门！', 'success', '少林杂役'),
]

function buildBribedPraiseScene(
  combo: 'AA' | 'AB' | 'BA' | 'BB',
  playerAnswerSummary: string,
  praiseText: string,
): StorySceneDef {
  return {
    id: `scene_shaolin_bribed_${combo.toLowerCase()}`,
    title: '拈花一笑 · 佛缘深种',
    subtitle: '大雄宝殿方丈院 · 钟鼓禅院',
    beats: [
      P(playerAnswerSummary),
      S('NPC-0193', `（玄净双眉舒展，抚掌朗笑，满面慈悲宝相与前番判若两人）${praiseText}`),
      S('NPC-0193', '“不过嘛，我少林千年清规不可废。纵有天大佛缘，初上少室山者亦须先做【杂役弟子】，在山门石阶前劈柴担水、洒扫庭除，磨一磨红尘傲气！待你在山门累计当值满一年（365天），老衲自会亲自引你入寺，正式录为外门弟子！”'),
    ],
    onFinishEffects: AFTER_BRIBE_PASS_EFFECTS,
  }
}

function buildBribedQuestion2Scene(q1Choice: 'A' | 'B'): StorySceneDef {
  const isQ1A = q1Choice === 'A'
  return {
    id: `scene_shaolin_bribed_q2_${q1Choice.toLowerCase()}`,
    title: '知客复试 · 妙谛生花',
    subtitle: '第二题：修武立心',
    beats: [
      P(isQ1A
          ? '“既见生灵危难，晚辈当持戒刀喝退恶虎，救下那头小鹿！”'
          : '“天地万物各有定数，晚辈以为当顺应因果，袖手旁观，不妄添杀孽。”'),
      S('NPC-0193', '（玄净连连颔首，笑意盈盈地捻动佛珠）“说得好，颇通禅理！那老衲再问这第二题——我少林武学甲天下，善信欲拜入山门，所求为何？”'),
    ],
    choices: [
      {
        id: `bribed_${q1Choice}A`,
        label: '【甲 · 济世】愿习得上乘绝技，日后下山除暴安良、护国佑民。',
        tone: 'gold',
        effects: [
          openScene(regScene(isQ1A
              ? buildBribedPraiseScene(
                  'AA',
                  '“晚辈愿习得少林上乘绝技，日后下山除暴安良、护国佑民！”',
                  '“善哉！善哉！说得好！施主见幼鹿危难而敢亮刃，乃是不畏强暴的金刚怒目；求武只为除暴安良，正是我少林护法度世的本怀！如此侠骨禅心，当真与我佛祖大有渊源！”',
                )
              : buildBribedPraiseScene(
                  'BA',
                  '“晚辈愿习得少林上乘绝技，日后下山除暴安良、护国佑民！”',
                  '“妙极！说得好！施主见虎鹿相争而不妄动嗔念，深谙‘因果业力不可强逆’之理；立志却在护国佑民，不拘小节而怀苍生大义！大智若愚，当真与我佛祖有缘！”',
                )), 'QST-SECT-01-ENTRY'),
        ],
      },
      {
        id: `bribed_${q1Choice}B`,
        label: '【乙 · 修身】只求青灯古佛、强身健体，斩断红尘妄念。',
        tone: 'gold',
        effects: [
          openScene(regScene(isQ1A
              ? buildBribedPraiseScene(
                  'AB',
                  '“晚辈别无他求，只愿伴青灯古佛、强身健体，斩断红尘妄念。”',
                  '“阿弥陀佛！说得好！施主遇事有菩萨救苦之心，对己却无贪名逐利之念，外具慈悲行、内守清净心——这正是‘入世救人、出世修心’的上乘根器，与我佛祖大有缘法！”',
                )
              : buildBribedPraiseScene(
                  'BB',
                  '“晚辈别无他求，只愿伴青灯古佛、强身健体，斩断红尘妄念。”',
                  '“善哉！说得好！施主不染红尘杀劫，不贪江湖虚名，一颗琉璃净心澄澈无尘，恰合达摩祖师面壁九年之静气！如此恬淡清修的善根，当真与我佛祖有缘！”',
                )), 'QST-SECT-01-ENTRY'),
        ],
      },
    ],
  }
}

const BRIBED_INTRO_SCENE: StorySceneDef = {
  id: 'scene_shaolin_bribed_q1',
  title: '香火通神 · 再叩禅关',
  subtitle: '嵩山少林寺 · 钟鼓禅院',
  beats: [
    N('重返少室山钟鼓禅院，案炉中檀香袅袅。知客禅师玄净一听通传你的姓名，原本微阖的双目倏地睁开，脸上堆起如沐春风的笑意，亲自抬手虚引。'),
    S('NPC-0193', '“阿弥陀佛！原来是洛阳故人举荐的善信到了，快请近前说话！老衲前夜诵经，忽觉嵩山紫气东来，便知近日必有具足慧根的良才登门。依例还是那两道问心题——少侠尽管畅所欲言！”'),
    S('NPC-0193', '“第一题：善信登临嵩山，若见山门外恶虎扑鹿，手里恰有一柄戒刀，当如何处置？”'),
  ],
  choices: [
    {
      id: 'bribed_q1_a',
      label: '【甲 · 护生】持刀喝退恶虎，救下那头小鹿。',
      tone: 'gold',
      effects: [
        openScene(regScene(buildBribedQuestion2Scene('A')), 'QST-SECT-01-ENTRY'),
      ],
    },
    {
      id: 'bribed_q1_b',
      label: '【乙 · 顺缘】弱肉强食乃天地常理，袖手旁观，莫沾杀孽。',
      tone: 'gold',
      effects: [
        openScene(regScene(buildBribedQuestion2Scene('B')), 'QST-SECT-01-ENTRY'),
      ],
    },
  ],
}

const BROKER_DELIVERED_SCENE: StorySceneDef = {
  id: 'scene_shaolin_broker_done',
  title: '白银铺路 · 嵩门路通',
  subtitle: '洛阳府 · 洛水天津酒楼',
  beats: [
    S({ name: '贾通宝', title: '洛阳牙人 · 市井包打听', factionName: '江湖散人', portraitUrl: '/assets/characters/templates/tpl_sanren_male_fb.jpg', avatarUrl: '/assets/characters/templates/tpl_sanren_male_av.jpg' }, '（贾通宝一见你进门，忙笑眯眯地迎上前拉你到角落雅座，压低嗓音拍了拍胸脯）“少侠来得正好！搞定了！那二百两雪花官银已借长明灯油的名目，稳稳当当送进了少林知客院！”'),
    S({ name: '贾通宝', title: '洛阳牙人 · 市井包打听', factionName: '江湖散人', portraitUrl: '/assets/characters/templates/tpl_sanren_male_fb.jpg', avatarUrl: '/assets/characters/templates/tpl_sanren_male_av.jpg' }, '“知客禅师玄净已经记下了少侠的名号。你这便再去嵩山少林寺【钟鼓禅院】找他复试——嘿嘿，这一回不管那两道题你怎么答，在大师眼里那都是字字珠玑、与佛祖有缘！”'),
  ],
  onFinishEffects: [
    { type: 'setFlag', flag: 'shaolin_broker_reported', value: true },
    { type: 'setFlag', flag: 'shaolin_bribe_ready', value: true },
    {
      type: 'setQuestStep',
      questId: SHAOLIN_ENTRY_QUEST_ID,
      stepId: 'revisit_xuanjing',
      deadlineDays: null,
    },
    toast('贾通宝已打点妥当！速赴【嵩山少林寺 · 大雄宝殿方丈院 · 钟鼓禅院】找知客禅师玄净复试！', 'success', '少林门路'),
  ],
}

const SHAOLIN_CHORE_COMPLETE_JOIN_SCENE: StorySceneDef = {
  id: 'scene_shaolin_chore_365_inducted',
  title: '寒暑一载 · 始入禅林',
  subtitle: '嵩山少林寺 · 大雄宝殿方丈院',
  illustrationUrl: '/assets/quests/shaolin_chore_induction.jpg',
  illustrationCaption: '嵩山少林寺大雄宝殿 · 寒暑一载苦役满期拜受僧衣齐眉棍',
  mandatory: true,
  beats: [
    N('春去秋来，寒暑易节。你在少室山门外挑水劈柴、扫雪除阶，足足熬满了三百六十五个日夜，双手磨出厚茧，步履却愈发沉凝稳健。'),
    S('NPC-0193', '（知客禅师玄净核验过功课簿，满意颔首，引你步入大雄宝殿）“善哉！三百六十五日山门苦役一日不缺，心性已磨去浮躁。今日便依寺规，正式录你入我嵩山少林寺门墙！”'),
    S('NPC-0112', '（伏虎方丈玄慈端立佛前，温言勉励）“阿弥陀佛。少侠今日初入外门，按例先授【俗家弟子】身份，赐灰麻僧衣、芒鞋与白蜡齐眉棍。俗家弟子亦可凭修为与佛法经义逐阶晋升本寺职司。”'),
    S('NPC-0112', '“唯我少林【地阶】与【天阶】不传之秘，非落发受戒之佛门弟子不可轻授。日后你若勘破红尘，随时可来大雄正殿寻老衲剃度，正式转为【出家弟子】。”'),
  ],
}

const INLINE_SCENE_01_scene_luoyang_tavern_shaolin_rumor: StorySceneDef = {
              id: 'scene_luoyang_tavern_shaolin_rumor',
              title: '洛水酒旗 · 佛门秘闻',
              subtitle: '洛阳府 · 洛水天津酒楼',
              beats: [
                N('洛水桥畔酒旗招展，天津酒楼内座无虚席。你刚寻了处靠窗木桌坐下，邻桌一名精明圆滑的洛阳牙人正端着酒碗，眉飞色舞地与同席茶客闲谈少室山的近况。'),
                S({ name: '贾通宝', title: '洛阳牙人 · 市井包打听', factionName: '江湖散人', portraitUrl: '/assets/characters/templates/tpl_sanren_male_fb.jpg', avatarUrl: '/assets/characters/templates/tpl_sanren_male_av.jpg' }, '“……嗨，你们还当少林寺真是光凭嘴皮子谈禅就能进的？那知客禅师玄净嘴皮子翻一翻，正理歪理全在他舌头上，没见着真金白银，天王老子去了也是‘佛缘不足’！”'),
                S({ name: '贾通宝', title: '洛阳牙人 · 市井包打听', factionName: '江湖散人', portraitUrl: '/assets/characters/templates/tpl_sanren_male_fb.jpg', avatarUrl: '/assets/characters/templates/tpl_sanren_male_av.jpg' }, '“不瞒各位说，我家隔壁那位王员外，上月刚托门路往知客院悄悄孝敬了整整【二百两纹银】，知客禅师当场夸他家那憨小子天生佛骨，顺顺当当送上了少林寺！”'),
                N('说者无心，听者有意！这位唤作【贾通宝】的洛阳牙人显然深谙少林知客院的门道，不过市井牙人向来无利不起早，须先与他攀谈或赠礼套近乎（好感度 ≥ 10），再备足银两请他代为牵线。'),
              ],
              onFinishEffects: [
                {
                  type: 'branch',
                  condition: qStatus(SHAOLIN_ENTRY_QUEST_ID, 'not_started'),
                  thenEffects: [
                    {
                      type: 'startQuest',
                      questId: SHAOLIN_ENTRY_QUEST_ID,
                      stepId: 'bribe_broker',
                    },
                  ],
                  elseEffects: [
                    setStep(SHAOLIN_ENTRY_QUEST_ID, 'bribe_broker'),
                  ],
                },
              ],
            }

const INLINE_SCENE_02_scene_shaolin_pay_broker: StorySceneDef = {
              id: 'scene_shaolin_pay_broker',
              title: '二百五金 · 暗通款曲',
              subtitle: '洛阳府 · 洛水天津酒楼',
              illustrationUrl: '/assets/quests/shaolin_luoyang_bribe.jpg',
              illustrationCaption: '洛水天津酒楼 · 二百五十两纹银托牙人暗通嵩门香火',
              beats: [
                P('“贾兄留步！在下诚心想上少室山学艺，奈何知客禅师口风甚紧。素闻贾兄路子广，不知能否烦请贾兄替在下往知客院递一份香火孝敬？”'),
                S('interactedNpc', '（贾通宝捻着胡须左右一瞄，嘿嘿一笑伸出巴掌）“好说，好说！看在咱们投缘的份上，这桩差事小人替少侠跑一趟！知客禅师那边雷打不动要【二百两】香火银，至于小人上下打点知客僧与十日往返盘缠嘛……只收少侠【五十两】辛苦茶水钱，统共【二百五十两】纹银！”'),
                S('interactedNpc', '“银子交给我，少侠只管在洛阳城里游历歇息。十天之后你再来这【洛水天津酒楼】寻我，保准给你办得妥妥帖帖！”'),
              ],
              choices: [
                {
                  id: 'choice_confirm_pay_250',
                  label: '【点交二百五十两纹银】有劳贾兄跑这一趟！',
                  subLabel: '支付 250 两纹银，等待 10 天后回洛水天津酒楼听信',
                  tone: 'gold',
                  condition: { type: 'silverAtLeast', min: 250 },
                  effects: [
                    {
                      type: 'giveSilver',
                      amount: -250,
                      reason: '托贾通宝代递少林知客院香火银',
                    },
                    {
                      type: 'setQuestStep',
                      questId: SHAOLIN_ENTRY_QUEST_ID,
                      stepId: 'wait_ten_days',
                      deadlineDays: 9,
                    },
                    toast('已交付贾通宝 250 两纹银！请等待 10 天后再来【洛水天津酒楼】向他打听结果。', 'success', '香火打点'),
                  ],
                },
                {
                  id: 'choice_cancel_pay_250',
                  label: '【容后再议】手头尚紧，改日再来奉银',
                  tone: 'default',
                  effects: [],
                },
              ],
            }

const INLINE_SCENE_03_scene_shaolin_xuanci_tonsure_done: StorySceneDef = {
                        id: 'scene_shaolin_xuanci_tonsure_done',
                        title: '青丝落尽 · 法号慧见',
                        subtitle: '嵩山少林寺 · 出家受戒礼成',
                        beats: [
                          N('晨钟三响，梵呗齐鸣。随着玄慈方丈手中戒刀轻落，三千青丝飘散蒲团之上。你换上一袭素净僧衣，合十立于佛前，宝相清朗。'),
                          S('NPC-0112', '“阿弥陀佛！自今日起，世间少一俗客，嵩山多一禅僧——【慧见】，望你严守清规，精进禅武，护持正法！”'),
                        ],
                      }

const INLINE_SCENE_04_scene_shaolin_xuanci_tonsure_confirm: StorySceneDef = {
              id: 'scene_shaolin_xuanci_tonsure_confirm',
              title: '大雄宝殿 · 落发受戒',
              subtitle: '嵩山少林寺 · 佛前剃度大典',
              beats: [
                P('“弟子入寺习武参禅以来，深感佛法浩瀚，今愿斩断三千烦恼丝，恳请方丈慈悲为弟子剃度受戒，转为少林出家僧众！”'),
                S('NPC-0112', '（玄慈方丈手执戒刀立于释迦牟尼金身之前，目光澄澈庄严）“善哉，善哉！一朝落发披缁，便入佛门慧字辈僧籍，赐你法号【慧见】，换穿本寺佛子僧衣。自此除俗家可修之《韦陀杵》《龙爪手》《盘山铁布衫》《大力金刚指》外，本寺藏经与罗汉、达摩、戒律诸院其余【地阶】【天阶】无上禅武绝学，皆向你敞开法门。你可心意已决？”'),
              ],
              choices: [
                {
                  id: 'choice_confirm_tonsure_huijian',
                  label: '【稽首受戒】弟子心意已决，愿受法号「慧见」！',
                  subLabel: '转为少林出家弟子，姓名改为「慧见」，立绘切换为「少林佛子」，解锁全套地阶/天阶禅武与三堂传承',
                  tone: 'gold',
                  effects: [
                    {
                      type: 'ordainShaolinMonk',
                      dharmaName: '慧见',
                      portraitId: 'hero_02_shaolin',
                    },
                    openScene('scene_shaolin_xuanci_tonsure_done', 'QST-SECT-01-ENTRY'),
                  ],
                },
                {
                  id: 'choice_cancel_tonsure',
                  label: '【暂留俗发】尘缘未了，容弟子再参悟些时日',
                  tone: 'default',
                  effects: [],
                },
              ],
            }

export const SCENES: Record<string, StorySceneDef> = {
  ...EXTRA_SCENES,
  [UNBRIBED_INTRO_SCENE.id]: UNBRIBED_INTRO_SCENE,
  [BRIBED_INTRO_SCENE.id]: BRIBED_INTRO_SCENE,
  [BROKER_DELIVERED_SCENE.id]: BROKER_DELIVERED_SCENE,
  [SHAOLIN_CHORE_COMPLETE_JOIN_SCENE.id]: SHAOLIN_CHORE_COMPLETE_JOIN_SCENE,
  [INLINE_SCENE_01_scene_luoyang_tavern_shaolin_rumor.id]: INLINE_SCENE_01_scene_luoyang_tavern_shaolin_rumor,
  [INLINE_SCENE_02_scene_shaolin_pay_broker.id]: INLINE_SCENE_02_scene_shaolin_pay_broker,
  [INLINE_SCENE_03_scene_shaolin_xuanci_tonsure_done.id]: INLINE_SCENE_03_scene_shaolin_xuanci_tonsure_done,
  [INLINE_SCENE_04_scene_shaolin_xuanci_tonsure_confirm.id]: INLINE_SCENE_04_scene_shaolin_xuanci_tonsure_confirm,
}
