import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, flag, openScene, setStep, toast } from '../../../engine/quest/dsl'
import { SHAOLIN_Q37_QUEST_ID } from './shaolinVajraBodyAwakenQuest'

const SPEAKER_WULIN_HERO: StorySpeakerSpec = {
  kind: 'custom',
  name: '河朔豪客 · 铁枪王五',
  title: '观战群雄',
  factionName: '中原武林',
  portraitUrl: '/assets/characters/templates/tpl_greenwood_hero_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_greenwood_hero_av.jpg',
}

const SPEAKER_SHAOLIN_GUARD: StorySpeakerSpec = {
  kind: 'custom',
  name: '戒律院武僧 · 慧刚',
  title: '丹墀护法武僧',
  factionName: '嵩山少林寺',
  portraitUrl: '/assets/characters/templates/tpl_shaolin_songshan_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_shaolin_songshan_male_av.jpg',
}

export const SHAOLIN_Q37_SCENES: Record<string, StorySceneDef> = {
  scene_slq37_01: {
    id: 'scene_slq37_01',
    title: '第一幕 · 拂晓杀机',
    subtitle: '嵩山少林寺 · 钟鼓禅院 · 演武坪',
    mandatory: true,
    beats: [
      N('{reignYear}秋，少室山丑闻震荡之后的次日拂晓，晨雾未散，大雄宝殿丹墀前忽传数声震耳欲聋的爆裂巨响与惊怒佛号！数座千斤铜炉竟被一股无形炽烈刀气劈得焦红开裂！'),
      S(SPEAKER_SHAOLIN_GUARD, '（浑身焦黑，踉跄奔至演武坪急呼）“师兄不好了！大轮明王鸠摩智趁玄慈方丈闭门思过悍然发难，竟施展吐蕃密宗绝学『火焰刀』强闯藏经阁，玄痛、玄寂两位师伯已挺身上前阻拦！”'),
      N('你身形电射而出掠至演武坪前端。只见数千尚未离山的群豪再度沸腾围观，明黄袈裟猎猎飞舞的【鸠摩智】傲立丹墀正中，双掌虚劈间空气如被点燃般「嗤嗤」作响！'),
      S('NPC-0113', '（朗声冷笑，声传山谷）“玄慈既已自褪袈裟待罪，少林群龙无首！{ifFlagEq:sl_q35_stance=iron_law|纵然你们自诩清规如铁，单凭口舌也挡不住小僧的密宗【火焰刀】！|今日谁敢挡小僧入藏经阁，便休怪无形刀气无眼！}”'),
    ],
    onFinishEffects: [openScene('scene_slq37_02', SHAOLIN_Q37_QUEST_ID)],
  },

  scene_slq37_02: {
    id: 'scene_slq37_02',
    title: '第二幕 · 火焰连伤',
    subtitle: '大雄宝殿丹墀 · 火毒危局',
    illustrationUrl: '/assets/quests/sl_37_flame_knife.jpg',
    illustrationCaption: '大雄宝殿丹墀 · 鸠摩智火焰刀无形罡气连伤玄痛、玄寂二僧，少室山群豪震骇失色',
    mandatory: true,
    beats: [
      N('铁掌禅师【玄痛】怒喝迎上，然而鸠摩智右掌凌空一划，一道无形炽烈【火焰刀】罡气在三尺外劈碎玄痛铁掌，狠狠斩在其左肩！玄痛僧袍焦燃、口喷鲜血倒飞石阶！'),
      N('一拍神僧【玄寂】大惊驰援，倾尽毕生修为拍出至刚绝学「一拍两散」；鸠摩智双掌十字猛劈，两道交叉炽烈火网轰然爆开，竟将玄寂胸襟焦裂、鲜血狂涌震跌在玄痛身旁！'),
      S('NPC-0122', '（潜伏西南角的星宿老怪阴森怪笑，反手甩出三团幽绿火球直扑丹墀）“哈哈哈哈！好一个火焰刀！少林既要办白事，老夫再奉上一份秘制【腐尸毒烟】！”'),
      N('“轰！轰！轰！”滚滚墨绿恶臭的腐尸毒烟瞬间与火焰刀灼浪合流，化作焚心蚀骨的炼狱火海将重伤二僧彻底吞没！'),
      S(SPEAKER_WULIN_HERO, '（连退数丈骇然大呼）“快退！腐尸毒烟见血封喉，加上火焰刀热浪，谁冲进去谁就是死路一条！”外围数十武僧欲冲上救人，刚近边缘便被熏得口鼻渗血难进半步！'),
    ],
    onFinishEffects: [openScene('scene_slq37_03', SHAOLIN_Q37_QUEST_ID)],
  },

  scene_slq37_03: {
    id: 'scene_slq37_03',
    title: '第三幕 · 孤身赴火',
    subtitle: '钟鼓禅院 · 演武坪',
    mandatory: true,
    beats: [
      N('眼见玄痛、玄寂两位师叔在火毒交织的丹墀上气息渐弱，鸠摩智又再度提聚火焰刀准备补下杀手，丁春秋在旁摇扇冷笑连连：“嘿嘿，看少林还有哪个不怕死的蠢货敢闯进来送死！”'),
      N('你不退反进，周身多年苦修的至阳护体神功轰然运转！迎着漫天炽热刀气与墨绿腐尸毒烟纵身跃向丹墀之际，你声如洪钟震彻少室山巅——'),
    ],
    choices: [
      {
        id: 'slq37_entry_vow',
        label: '【舍身护师】高宣佛号立护师大愿，不顾生死纵身踏入烈火毒雾救人！',
        subLabel: '以身饲虎护持重伤长老（禅心慈悲 +1）',
        tone: 'jade',
        effects: [
          { type: 'setFlag', flag: 'sl_q37_entry_mood', value: 'vow' },
          { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 1 },
          { type: 'startQuest', questId: SHAOLIN_Q37_QUEST_ID, stepId: 'fire_and_poison_crucible' },
          setStep(SHAOLIN_Q37_QUEST_ID, 'fire_and_poison_crucible'),
          toast('已开启《烈火金身 · 金刚不坏》！速赴【大雄正殿 · 佛前蒲团】护住玄痛、玄寂！', 'warn', '烈火金身'),
        ],
      },
      {
        id: 'slq37_entry_fury',
        label: '【怒目降魔】暴喝鸠摩智丁春秋外道无耻，誓以铁骨踏平火毒炼狱！',
        subLabel: '怒目金刚威压群魔（怒目杀业 +1）',
        tone: 'danger',
        effects: [
          { type: 'setFlag', flag: 'sl_q37_entry_mood', value: 'fury' },
          { type: 'addFlagNumber', flag: 'sl_karma_wrath', delta: 1 },
          { type: 'startQuest', questId: SHAOLIN_Q37_QUEST_ID, stepId: 'fire_and_poison_crucible' },
          setStep(SHAOLIN_Q37_QUEST_ID, 'fire_and_poison_crucible'),
          toast('已开启《烈火金身 · 金刚不坏》！速赴【大雄正殿 · 佛前蒲团】护住玄痛、玄寂！', 'warn', '烈火金身'),
        ],
      },
    ],
  },

  scene_slq37_04: {
    id: 'scene_slq37_04',
    title: '第四幕 · 丹墀炼狱',
    subtitle: '嵩山少林寺 · 大雄正殿 · 佛前蒲团',
    mandatory: true,
    beats: [
      N('甫一踏入丹墀正中，灼烧肺腑的炽热火浪与刺鼻蚀骨的墨绿毒雾瞬间如万千钢针扎向全身毛孔！你一把将昏迷边缘的【玄痛】、【玄寂】两位师叔护在身后，孤身迎向最猛烈的火毒锋芒！'),
      S('NPC-0156', '（强撑神智嘶声急呼）“快走！这腐尸毒烟与火焰刀太毒辣……不要管我们两个老骨头……”'),
      P('（双足如铁柱钉死青石，声音嘶哑却如金石交击）“弟子岂能弃师叔于不顾！{ifFlagEq:sl_branch=layman|既为少林紫衣护法，护寺救师便是我死志所在！|既入少林金刚降魔脉，便当如明王怒目、以身护法！}”'),
      N('“嗤啦——！”一道无形火焰刀罡气呼啸劈裂你半片外袍，丁春秋更挥扇催风将整片腐尸毒烟死死压向你周身三尺！外有烈焰焚肤腐毒蚀骨，内有经脉剧震欲裂，已是九死一生绝境！'),
    ],
    onFinishEffects: [openScene('scene_slq37_05', SHAOLIN_Q37_QUEST_ID)],
  },

  scene_slq37_05: {
    id: 'scene_slq37_05',
    title: '第五幕 · 熔炉受劫',
    subtitle: '大雄正殿丹墀 · 火毒绝境（第一关硬功抉择）',
    illustrationUrl: '/assets/quests/sl_37_poison_fog.jpg',
    illustrationCaption: '大雄宝殿丹墀 · 丁春秋腐尸毒烟与鸠摩智火焰刀合围，主角孤身护住重伤二僧于炼狱之中',
    mandatory: true,
    beats: [
      N('生死一发之际，《金刚经》「若见诸相非相，即见如来」在灵台字字生莲——火是妄相，毒是妄相，血肉畏惧亦是妄相！'),
      N('鸠摩智的烈焰灼浪与丁春秋的蚀骨毒雾同时碾压而至。退无可退，唯有拿这火毒炼狱作铸身洪炉！电光石火间，你决意如何催动护体真气硬渡此劫？'),
    ],
    choices: [
      {
        id: 'slq37_crucible_bone',
        label: '【先天铁胎】以过人金刚筋骨生扛火毒，逆转奇经八脉引火锻骨！',
        subLabel: '需先天根骨 ≥ 75 · 以烈焰为锤淬炼金刚不坏之躯（怒目杀业 +1）',
        tone: 'gold',
        condition: { type: 'talentAtLeast', key: '根骨', min: 75 },
        effects: [
          { type: 'setFlag', flag: 'sl_q37_crucible_mode', value: 'bone_forge' },
          { type: 'setFlag', flag: 'sl_q37_crucible_perfect', value: true },
          {
            type: 'branch',
            condition: flag('sl_q37_crucible_scored', 'truthy'),
            thenEffects: [],
            elseEffects: [
              { type: 'setFlag', flag: 'sl_q37_crucible_scored', value: true },
              { type: 'addFlagNumber', flag: 'sl_karma_wrath', delta: 1 },
            ],
          },
          openScene('scene_slq37_06', SHAOLIN_Q37_QUEST_ID),
        ],
      },
      {
        id: 'slq37_crucible_pill',
        label: '【药王调和】借药王院避毒法门调和火毒护脉，化漫天烈焰为纯阳洪炉！',
        subLabel: '需经义 ≥ 82 或曾于药王瘟劫炼成上品神丹 · 以柔克毒淬炼金身（禅心慈悲 +1）',
        tone: 'jade',
        condition: {
          type: 'any',
          hint: '需经义 ≥ 82 或曾于《药王瘟劫》炼成绝品解药',
          conditions: [
            { type: 'skillAtLeast', key: '经义', min: 82 },
            flag('sl_q32_pill_perfect', 'truthy'),
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'sl_q37_crucible_mode', value: 'pill_harmony' },
          { type: 'setFlag', flag: 'sl_q37_crucible_perfect', value: true },
          {
            type: 'branch',
            condition: flag('sl_q37_crucible_scored', 'truthy'),
            thenEffects: [],
            elseEffects: [
              { type: 'setFlag', flag: 'sl_q37_crucible_scored', value: true },
              { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 1 },
            ],
          },
          openScene('scene_slq37_06', SHAOLIN_Q37_QUEST_ID),
        ],
      },
      {
        id: 'slq37_crucible_grit',
        label: '【死志硬挺】咬牙硬抗火毒，以九阳铁布金刚禅定逆冲奇经绝不退步！',
        subLabel: '零门槛硬功破关 · 拼死死守丹墀于绝境破壁（怒目杀业 +1）',
        tone: 'danger',
        effects: [
          { type: 'setFlag', flag: 'sl_q37_crucible_mode', value: 'grit_hold' },
          {
            type: 'branch',
            condition: flag('sl_q37_crucible_scored', 'truthy'),
            thenEffects: [],
            elseEffects: [
              { type: 'setFlag', flag: 'sl_q37_crucible_scored', value: true },
              { type: 'addFlagNumber', flag: 'sl_karma_wrath', delta: 1 },
            ],
          },
          openScene('scene_slq37_06', SHAOLIN_Q37_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq37_06: {
    id: 'scene_slq37_06',
    title: '第六幕 · 骨骼雷鸣',
    subtitle: '大雄正殿 · 破茧成身（第二关爆发抉择）',
    mandatory: true,
    beats: [
      N('{ifFlagEq:sl_q37_crucible_mode=bone_forge|你凭天生奇骨生生吞下烈火刀浪，反将狂暴火劲化作锻铁淬钢之烈火，疯狂冲刷周身筋骨皮膜！|}{ifFlagEq:sl_q37_crucible_mode=pill_harmony|你暗运药王院避毒导引法门，竟将蚀骨腐尸毒烟与炽热火浪一阴一阳纳入丹田炼化，周身百脉瞬间化作纯阳洪炉！|}{ifFlagEq:sl_q37_crucible_mode=grit_hold|你咬破舌尖强提死志，将苦修多年的九阳铁布真气不顾一切地催至生死极限，硬生生在火毒洪流中顶住坍塌之势！|}'),
      N('“咯吱——！咔嚓——！轰隆——！！”一声震动整座大雄宝殿的沉雷巨响自你胸腔脊椎深处炸开！方圆十丈青石齐颤，滚滚墨绿毒烟之中骤然绽放出庄严璀璨的淡金宝光！'),
      S('NPC-0134', '（挣扎抬首，望着你背影上流转不熄、令毒雾遇之即化青烟的淡金宝光，老泪纵横惊呼）“金身宝光！百毒不侵，刀火难伤！{ifFlagEq:sl_branch=layman|铁布衫竟淬炼至近乎金刚不坏之化境！|这是少林数百年唯有达摩祖师与寥寥神僧修成的天阶至高护体绝学——【金刚不坏体神功】啊！！}”'),
      N('淡金护体罡风在丹田澎湃欲爆，台下丁春秋脸色惨白如鬼、羽扇险些脱手！这一记破雾狮吼，你决意如何倾泻而出？'),
    ],
    choices: [
      {
        id: 'slq37_breakout_rebound',
        label: '【一啸反毒】金刚狮吼震散毒雾，将漫天毒烟倒卷轰向星宿派阵营！',
        subLabel: '以其人之道还治其人之身，逼得丁春秋抱头鼠窜（怒目杀业 +1）',
        tone: 'danger',
        effects: [
          { type: 'setFlag', flag: 'sl_q37_breakout', value: 'rebound_poison' },
          {
            type: 'branch',
            condition: flag('sl_q37_breakout_scored', 'truthy'),
            thenEffects: [],
            elseEffects: [
              { type: 'setFlag', flag: 'sl_q37_breakout_scored', value: true },
              { type: 'addFlagNumber', flag: 'sl_karma_wrath', delta: 1 },
            ],
          },
          openScene('scene_slq37_07', SHAOLIN_Q37_QUEST_ID),
        ],
      },
      {
        id: 'slq37_breakout_shield',
        label: '【金风护僧】引淡金罡风先护住玄痛玄寂，将剧毒尽数蒸散高空不伤台下无辜！',
        subLabel: '佛门刚柔并济，净空丹墀毒雾护全寺周全（禅心慈悲 +1）',
        tone: 'jade',
        effects: [
          { type: 'setFlag', flag: 'sl_q37_breakout', value: 'shield_elders' },
          {
            type: 'branch',
            condition: flag('sl_q37_breakout_scored', 'truthy'),
            thenEffects: [],
            elseEffects: [
              { type: 'setFlag', flag: 'sl_q37_breakout_scored', value: true },
              { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 1 },
            ],
          },
          openScene('scene_slq37_07', SHAOLIN_Q37_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq37_07: {
    id: 'scene_slq37_07',
    title: '第七幕 · 烈火金身',
    subtitle: '大雄宝殿丹墀 · 金刚不坏现世',
    illustrationUrl: '/assets/quests/sl_37_golden_body.jpg',
    illustrationCaption: '大雄宝殿丹墀 · 烈火毒雾中骨骼雷鸣、周身泛起淡金宝光，破关悟成《金刚不坏体神功》',
    mandatory: true,
    beats: [
      N('{ifFlagEq:sl_q37_breakout=rebound_poison|“外道毒烟，给我散——！”淡金狂飙轰然席卷，腐尸毒烟竟尽数倒卷扑向星宿阵营！丁春秋尖叫一声连翻三个跟头狼狈逃出十丈外，嘶喊着“快撤”！|“外道毒烟，给我散——！”淡金罡风温柔卷起玄痛、玄寂退向殿门，同时冲天直上将漫天腐尸毒烟尽数蒸散为青烟！丁春秋望见那层刀毒不侵的宝光，早已吓得脸色惨白、连滚带爬缩回人群后方！}'),
      N('朝阳洒满丹墀，你周身淡金宝光熠熠生辉，宛如一尊自大雄宝殿走出的镇寺怒目金刚！药王院僧趁机疾奔上阶将玄痛、玄寂抬入殿内救治，玄痛紧握你手腕低声托付：“好孩子……替少林震住这番僧！”'),
      P('（缓步踏下丹墀石阶，每步青石皆陷半寸，淡金双眸死死锁定演武坪上的鸠摩智）“丁春秋的毒烟已散。大轮明王，现在轮到你的【火焰刀】了！”'),
    ],
    choices: [
      {
        id: 'slq37_awaken_and_descend',
        label: '破茧凝就烈火金身，踏下【钟鼓禅院 · 演武坪】正面迎战鸠摩智全力火焰刀！',
        subLabel: '出家僧众当场习得并自动运使天阶外功《金刚不坏体神功》（可先整备后再赴演武坪决战）',
        tone: 'gold',
        effects: [
          {
            type: 'branch',
            condition: flag('sl_branch', 'neq', 'layman'),
            thenEffects: [
              {
                type: 'branch',
                condition: { type: 'learnedArtAtLeast', artId: 'MA-018', minLevel: 1 },
                thenEffects: [],
                elseEffects: [{ type: 'teachMartialArt', artId: 'MA-018', autoEquip: true }],
              },
              toast(
                '烈火毒雾中破茧成身！已当场习得天阶外功《金刚不坏体神功》！请踏下【钟鼓禅院 · 演武坪】震飞鸠摩智！',
                'success',
                '烈火金身',
              ),
            ],
            elseEffects: [
              toast(
                '俗家铁骨经火毒淬炼大成！（依清规不授僧门《金刚不坏体神功》）请踏下【钟鼓禅院 · 演武坪】正面震飞鸠摩智！',
                'success',
                '烈火金身',
              ),
            ],
          },
          setStep(SHAOLIN_Q37_QUEST_ID, 'vajra_body_crush'),
        ],
      },
    ],
  },

  scene_slq37_08: {
    id: 'scene_slq37_08',
    title: '第八幕 · 明王色变',
    subtitle: '嵩山少林寺 · 钟鼓禅院 · 演武坪',
    mandatory: true,
    beats: [
      N('你大步踏入演武坪，周身淡金罡气澎湃如潮。一向从容傲慢的【鸠摩智】此刻脸色凝重到了极点，双掌骤然合十，将吐蕃密宗毕生修为催至巅峰！'),
      S('NPC-0113', '（沉声喝道，明黄袈裟猎猎作响）“好个护体金身！小僧素闻少林硬功天下无双，今日倒要看看，究竟是你的金刚不坏金身硬，还是小僧的吐蕃密宗【火焰刀】更利！”'),
      N('话音未落，鸠摩智双掌齐出，三道炽烈无比、肉眼可见滚烫波纹的无形火焰刀罡气如三条火龙呼啸斩至，所过之处青石地砖焦黑龟裂！'),
    ],
    onFinishEffects: [openScene('scene_slq37_09', SHAOLIN_Q37_QUEST_ID)],
  },

  scene_slq37_09: {
    id: 'scene_slq37_09',
    title: '第九幕 · 金刚决战',
    subtitle: '钟鼓禅院 · 演武坪（宗师中品 · 战前策略抉择）',
    mandatory: true,
    beats: [
      N('三道足以重创一流上品高僧的火焰刀罡气刹那及体！数千群豪无不屏息瞪目，身后大雄宝殿朱漆飞檐亦在炽烈刀风波及之内！'),
      N('面对吐蕃国师全力绝杀，你淡金双眸寒光一闪，决意以何战法硬撼大轮明王？'),
    ],
    choices: [
      {
        id: 'slq37_jmz_tank_three',
        label: '【不动如山】不招不架硬接三道火焰刀再雷霆反杀，震慑全寺武僧与满山群豪！（撑过 5 回合）',
        subLabel: '以至刚金身硬吃火焰刀立无上威名（胜后 怒目杀业 +2）',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: SHAOLIN_Q37_QUEST_ID,
            opponent: {
              kind: 'npc',
              npcId: 'NPC-0113',
              talkOverride:
                '“狂妄！竟敢不招不架硬接小僧三道全力火焰刀？！今日必叫你血溅演武坪！”',
            },
            rule: 'survive_rounds',
            maxRounds: 5,
            forbidEscapeReason: '大敌当前，岂有在天下数千群雄前退避番僧之理！',
            introText: '【不动如山】正面硬吃三道火焰刀罡气，在【鸠摩智】狂攻下撑住五回合雷霆反杀！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              { type: 'setFlag', flag: 'sl_q37_jmz_tactic', value: 'tank_three' },
              {
                type: 'branch',
                condition: flag('sl_q37_jmz_scored', 'truthy'),
                thenEffects: [],
                elseEffects: [
                  { type: 'setFlag', flag: 'sl_q37_jmz_scored', value: true },
                  { type: 'addFlagNumber', flag: 'sl_karma_wrath', delta: 2 },
                ],
              },
              openScene('scene_slq37_10', SHAOLIN_Q37_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('鸠摩智火焰刀连绵霸道，暂稳气血重整金刚架势后再战！', 'warn', '金刚镇世'),
            ],
          },
        ],
      },
      {
        id: 'slq37_jmz_close_break',
        label: '【步步紧逼】顶着刀浪疾步贴身破其刀势，护住大雄殿宇不损一砖一瓦！（撑过 5 回合）',
        subLabel: '近身拆势护寺周全，以稳健刚猛破敌（胜后 禅心慈悲 +1）',
        tone: 'jade',
        effects: [
          {
            type: 'startCombat',
            questId: SHAOLIN_Q37_QUEST_ID,
            opponent: {
              kind: 'npc',
              npcId: 'NPC-0113',
              talkOverride:
                '“想近身破我火焰刀势？休想！看小僧无形刀网如何将你碎尸万段！”',
            },
            rule: 'survive_rounds',
            maxRounds: 5,
            forbidEscapeReason: '大敌当前，岂有在天下数千群雄前退避番僧之理！',
            introText: '【贴身破刀】顶着烈焰疾进近身，在【鸠摩智】火焰刀攻势下撑住五回合护殿退敌！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              { type: 'setFlag', flag: 'sl_q37_jmz_tactic', value: 'close_break' },
              {
                type: 'branch',
                condition: flag('sl_q37_jmz_scored', 'truthy'),
                thenEffects: [],
                elseEffects: [
                  { type: 'setFlag', flag: 'sl_q37_jmz_scored', value: true },
                  { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 1 },
                ],
              },
              openScene('scene_slq37_10', SHAOLIN_Q37_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('鸠摩智刀气凌厉逼人，暂调匀气息后再近身破其火焰刀！', 'warn', '金刚镇世'),
            ],
          },
        ],
      },
    ],
  },

  scene_slq37_10: {
    id: 'scene_slq37_10',
    title: '第十幕 · 雷霆震飞',
    subtitle: '钟鼓禅院 · 演武坪',
    mandatory: true,
    beats: [
      N('{ifFlagEq:sl_q37_jmz_tactic=tank_three|“当——！当——！当——！”三声宛如重锤敲击万年紫金洪钟的巨响炸彻天地！你以淡金胸膛硬吃三道火焰刀罡气，溅起漫天金色火花，竟未退半步、未破半分皮膜，震得全寺武僧与满山群豪齐声骇叹！|你顶着烈焰疾步欺入三尺之内，双臂如紫金铁柱横格连消，硬生生将漫天无形火焰刀悉数截在身前，竟未令身后大雄殿宇损毁一砖一瓦！}'),
      S(SPEAKER_WULIN_HERO, '（手中长枪「咣当」落地，目瞪口呆）“天爷啊！正面硬撼大轮明王全力火焰刀丝毫无损，这才是少林金刚不坏之威啊！”'),
      S('NPC-0113', '（虎口震裂、惊骇失色）“不可能！我的火焰刀连金铁皆可熔断，怎会劈不开你的护体金光？！”'),
      N('趁鸠摩智心神剧震、双掌回撤换气的刹那，你周身淡金宝光轰然凝于右拳，宛如降魔金刚杵雷霆捣出！“轰——！！”鸠摩智护体真气应声崩碎，整个人被正面轰飞十余丈，重重撞塌青石矮墙，烟尘冲天而起！'),
    ],
    onFinishEffects: [openScene('scene_slq37_11', SHAOLIN_Q37_QUEST_ID)],
  },

  scene_slq37_11: {
    id: 'scene_slq37_11',
    title: '第十一幕 · 镇压群豪',
    subtitle: '钟鼓禅院演武坪 · 金刚震飞明王',
    illustrationUrl: '/assets/quests/sl_37_crush_jiumozhi.jpg',
    illustrationCaption: '少室演武坪 · 主角周身淡金宝光正面硬吃火焰刀罡气，一拳雷霆震飞大轮明王鸠摩智',
    mandatory: true,
    beats: [
      N('烟尘散去，鸠摩智明黄袈裟撕裂、发冠歪斜，在随从搀扶下勉强起身，嘴角鲜血直流，望向你的目光中再无半点昔日傲慢，唯余深沉敬畏！'),
      S('NPC-0113', '（捂胸喘息，涩声合十）“少林护体神功……果真天下无双……小僧火焰刀败得心服口服！告辞！”'),
      N('大轮明王狼狈退去，星宿老怪丁春秋更是早已趁乱逃得无影无踪！你收拳而立，淡金宝光缓缓敛入体肤，环视数千群雄——漫山豪客一时竟无一人敢直视你的目光，旋即山呼海啸般的赞声震彻少室云海！'),
    ],
    onFinishEffects: [openScene('scene_slq37_12', SHAOLIN_Q37_QUEST_ID)],
  },

  scene_slq37_12: {
    id: 'scene_slq37_12',
    title: '第十二幕 · 佛前立威',
    subtitle: '大雄宝殿偏殿 · 护教之道抉择',
    mandatory: true,
    beats: [
      N('群豪渐散后，你步入偏殿探望经药王院主玄生救治脱险的【玄痛】与【玄寂】二僧。玄痛激动得几欲起身行礼，赞你绝境救师、一拳震飞鸠摩智乃生平最痛快之战！'),
      S('NPC-0134', '（合十微笑，眼中满是敬重与托付）“金刚怒目，所以降服四魔；菩萨低眉，所以慈悲六道。然鸠摩智虽退，潜伏藏经阁三十年的暗影未除，未来少林护教重担已在你肩。今日大胜之后，你意欲以何等威望立身佛前、统摄四方？”'),
    ],
    choices: [
      {
        id: 'slq37_prestige_iron',
        label: '【铁腕护教 · 威震四方】乱世当用重典，唯以铁腕金刚威名震慑群宵，方保祖庭千秋不坠！',
        subLabel: '确立铁血法王护教之威（怒目杀业 +2）',
        tone: 'danger',
        effects: [
          { type: 'setFlag', flag: 'sl_q37_prestige', value: 'iron_dharma' },
          {
            type: 'branch',
            condition: flag('sl_q37_prestige_scored', 'truthy'),
            thenEffects: [],
            elseEffects: [
              { type: 'setFlag', flag: 'sl_q37_prestige_scored', value: true },
              { type: 'addFlagNumber', flag: 'sl_karma_wrath', delta: 2 },
            ],
          },
          openScene('scene_slq37_13', SHAOLIN_Q37_QUEST_ID),
        ],
      },
      {
        id: 'slq37_prestige_compassion',
        label: '【红尘护生 · 怒目慈悲】金刚神威非为好勇斗狠，誓以此不坏之躯挡尽劫火、护持天下苍生！',
        subLabel: '确立红尘护生济世之望（禅心慈悲 +2）',
        tone: 'jade',
        effects: [
          { type: 'setFlag', flag: 'sl_q37_prestige', value: 'compassion_vajra' },
          {
            type: 'branch',
            condition: flag('sl_q37_prestige_scored', 'truthy'),
            thenEffects: [],
            elseEffects: [
              { type: 'setFlag', flag: 'sl_q37_prestige_scored', value: true },
              { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 2 },
            ],
          },
          openScene('scene_slq37_13', SHAOLIN_Q37_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq37_13: {
    id: 'scene_slq37_13',
    title: '第十三幕 · 金刚不坏',
    subtitle: '嵩山少林寺 · 威震天下',
    mandatory: true,
    beats: [
      N('{ifFlagEq:sl_q37_prestige=iron_dharma|玄痛抚掌大笑连赞有魄力，铁腕护法之声自此响彻嵩山四十八房；|玄寂合十含笑点头，赞你于雷霆霸道之中犹存慈悲本心，实乃少林之大幸；}你走出偏殿遥望藏经阁飞檐，双拳微握隐有沉雷低鸣。'),
      N('{ifFlagEq:sl_branch=layman|烈火淬铁骨，一战镇群豪！虽依少林清规天阶神功《金刚不坏体神功》唯授出家僧众，然你凭《盘山铁布衫》与《大力金刚指》硬撼火焰刀、力退鸠摩智，俗家护法威名亦随之传遍大江南北！|烈火淬金身，一战镇群豪！少林天阶护体神功《金刚不坏体神功》已彻悟于身，你的威名随之传遍大江南北！}'),
    ],
    choices: [
      {
        id: 'slq37_finish_reward',
        label: '稳固《金刚不坏体神功》境界，威镇少室群豪（完成）',
        tone: 'gold',
        condition: { type: 'flag', flag: 'sl_branch', op: 'neq', value: 'layman' },
        hideWhenUnavailable: true,
        effects: [
          {
            type: 'branch',
            condition: { type: 'learnedArtAtLeast', artId: 'MA-018', minLevel: 1 },
            thenEffects: [],
            elseEffects: [{ type: 'teachMartialArt', artId: 'MA-018', level: 1, autoEquip: true }],
          },
          {
            type: 'giveCombatExp',
            amount: 1400,
            reason: '丹墀烈火毒雾中破关悟成《金刚不坏体神功》，正面震飞鸠摩智镇压群豪',
          },
          {
            type: 'branch',
            condition: flag('sl_q37_crucible_perfect', 'truthy'),
            thenEffects: [
              {
                type: 'giveCombatExp',
                amount: 200,
                reason: '火毒熔炉绝境淬炼圆满之武道嘉奖',
              },
            ],
            elseEffects: [],
          },
          {
            type: 'modifyRenown',
            delta: 150,
            reason: '少室丹墀以金刚不坏金身硬吃火焰刀震飞大轮明王，威镇群豪',
          },
          { type: 'modifySkill', key: '经义', delta: 1 },
          {
            type: 'modifyNpcFavor',
            target: { kind: 'npc', npcId: 'NPC-0156' },
            delta: 20,
          },
          {
            type: 'modifyNpcFavor',
            target: { kind: 'npc', npcId: 'NPC-0134' },
            delta: 20,
          },
          { type: 'completeQuest', questId: SHAOLIN_Q37_QUEST_ID, outcome: 'completed' },
          toast(
            '已完成《烈火金身 · 金刚不坏》！习得天阶外功《金刚不坏体神功》，武学经验 +1400、威望 +150、经义 +1、玄痛/玄寂好感 +20！',
            'success',
            '金刚不坏',
          ),
        ],
      },
      {
        id: 'slq37_finish_reward_layman',
        label: '以《盘山铁布衫》与《大力金刚指》立威丹墀，威镇群豪（完成）',
        subLabel: '俗家弟子依少林清规不授《金刚不坏体神功》，改获额外实战历练',
        tone: 'gold',
        condition: { type: 'flag', flag: 'sl_branch', op: 'eq', value: 'layman' },
        hideWhenUnavailable: true,
        effects: [
          {
            type: 'giveCombatExp',
            amount: 1800,
            reason: '丹墀烈火毒雾中凭盘山铁布衫与大力金刚指正面震退鸠摩智',
          },
          {
            type: 'branch',
            condition: flag('sl_q37_crucible_perfect', 'truthy'),
            thenEffects: [
              {
                type: 'giveCombatExp',
                amount: 200,
                reason: '火毒熔炉绝境淬炼圆满之武道嘉奖',
              },
            ],
            elseEffects: [],
          },
          {
            type: 'modifyRenown',
            delta: 150,
            reason: '少室丹墀以俗家护法之身硬撼火焰刀震退大轮明王，威镇群豪',
          },
          { type: 'modifySkill', key: '经义', delta: 1 },
          {
            type: 'modifyNpcFavor',
            target: { kind: 'npc', npcId: 'NPC-0156' },
            delta: 20,
          },
          {
            type: 'modifyNpcFavor',
            target: { kind: 'npc', npcId: 'NPC-0134' },
            delta: 20,
          },
          { type: 'completeQuest', questId: SHAOLIN_Q37_QUEST_ID, outcome: 'completed' },
          toast(
            '已完成《烈火金身 · 金刚不坏》！（俗家不授《金刚不坏体神功》）武学经验 +1800、威望 +150、经义 +1、玄痛/玄寂好感 +20！',
            'success',
            '丹墀镇魔',
          ),
        ],
      },
    ],
  },
}
