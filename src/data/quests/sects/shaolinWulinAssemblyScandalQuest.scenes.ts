import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, flag, openScene, setStep, toast } from '../../../engine/quest/dsl'
import { SHAOLIN_Q35_QUEST_ID } from './shaolinWulinAssemblyScandalQuest'

const SPEAKER_XINGXIU_DISCIPLE: StorySpeakerSpec = {
  kind: 'custom',
  name: '星宿锣鼓弟子 · 摘星子',
  title: '星宿派大师兄',
  factionName: '星宿派',
  portraitUrl: '/assets/characters/templates/tpl_xingxiu_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_xingxiu_av.jpg',
}

const SPEAKER_WULIN_ELDER: StorySpeakerSpec = {
  kind: 'custom',
  name: '中原群豪代表 · 铁掌赵三爷',
  title: '河朔名宿',
  factionName: '中原武林',
  portraitUrl: '/assets/characters/templates/tpl_greenwood_hero_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_greenwood_hero_av.jpg',
}

const SPEAKER_JIANGHU_SCHOLAR: StorySpeakerSpec = {
  kind: 'custom',
  name: '江湖清流 · 江南陆秀才',
  title: '武林清议客',
  factionName: '中原武林',
  portraitUrl: '/assets/characters/templates/tpl_song_scholar_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_song_scholar_av.jpg',
}

export const SHAOLIN_Q35_SCENES: Record<string, StorySceneDef> = {
  scene_slq35_01: {
    id: 'scene_slq35_01',
    title: '第一幕 · 英雄帖至',
    subtitle: '嵩山少林寺 · 钟鼓禅院 · 演武坪',
    mandatory: true,
    beats: [
      N('{reignYear}孟秋，自玄悲、玄苦两位高僧相继遇害以来，江湖暗流彻底沸腾。不知何方势力广发铁函金帖，约请天下群雄七月十五齐聚嵩山少室峰，公推武林盟主、清算三十年旧账！'),
      N('卯时未过，少室山坪已旌旗蔽日、车马如龙。中原五岳剑派、丐帮长老与姑苏慕容车驾列于东侧；西南角黑幡翻卷，赫然是臭名昭著的西域【星宿派】与【四大恶人】；东南石阶下，吐蕃护国法王【鸠摩智】亦悄然卓立！'),
      S('NPC-0127', '（低声提醒）“{ifFlag:sl_q34_truth_deduced|正如你前番孤烛验案所料，暗影早已布下毒局！|今日这阵仗，怕是有人蓄谋要毁我少林千年清誉！}瞧那星宿老怪与大轮明王皆虎视眈眈，千万小心！”'),
      S('NPC-0112', '（立于演武高台，眉宇沧桑而决然）“阿弥陀佛。来者不善，善者不来。既聚天下群雄，我少林千年祖庭自当敞开山门，坦然相迎。”'),
    ],
    onFinishEffects: [openScene('scene_slq35_02', SHAOLIN_Q35_QUEST_ID)],
  },

  scene_slq35_02: {
    id: 'scene_slq35_02',
    title: '第二幕 · 丝竹邪音',
    subtitle: '少室山坪 · 群雄大会',
    illustrationUrl: '/assets/quests/sl_35_wulin_gathering.jpg',
    illustrationCaption: '少室山坪数千群雄大会 · 旌旗蔽日、丝竹喧天，中原豪杰与西域魔头对峙山门',
    mandatory: true,
    beats: [
      N('正在群豪喧沸之际，西南山道忽起一阵刺耳铜钹羌笛！数十名紫青怪袍星宿弟子抬着星斗软舆招摇闯坪，大师兄【摘星子】敲着铜钹尖声喝道——'),
      S(SPEAKER_XINGXIU_DISCIPLE, '“星宿老仙，法驾中原！神通广大，法力无边！中原武林盟主之位非我家老仙莫属，少林秃驴还不速速下跪迎接？！”'),
      N('软舆帘幕轻挑，白须飘飘、童颜鹤发却眼藏毒蛇冷光的【星宿老怪 · 丁春秋】摇扇步出，皮笑肉不笑地望向高台上的玄慈。'),
      S('NPC-0122', '“玄慈方丈别来无恙？贵寺接连折损玄悲、玄苦两位高僧，连自家门户都护不住，何谈执中原武林牛耳？不如交出藏经阁钥匙，由老夫代掌中原武林如何？”'),
      S(SPEAKER_WULIN_ELDER, '（拍案怒喝）“丁老怪！你这星宿海下毒作祟的魔头，也敢在少林山门狂吠？！”'),
      N('丁春秋羽扇轻拂，一缕无色阴风掠过，河朔名宿铁掌赵三爷顿时面皮发青、踉跄倒退三步！全场群豪大骇噤声，你抢先一步横臂拦住欲出的玄难，缓步踏下青石阶！'),
    ],
    onFinishEffects: [openScene('scene_slq35_03', SHAOLIN_Q35_QUEST_ID)],
  },

  scene_slq35_03: {
    id: 'scene_slq35_03',
    title: '第三幕 · 辩折星宿',
    subtitle: '钟鼓禅院 · 演武坪',
    mandatory: true,
    beats: [
      N('你立于石阶前衣袂不动，朗声压过星宿派聒噪锣鼓。丁春秋羽扇微顿，阴笑睨你：“少林寺竟还有个敢顶嘴的后辈？报上名来，老夫掌下不死无名之鬼！”'),
      N('数千群雄目光齐齐聚拢于你一身。面对老奸巨猾、擅以毒术震慑群豪的星宿老怪，你决意如何先折其嚣焰？'),
    ],
    choices: [
      {
        id: 'slq35_debate_dharma',
        label: '【禅辩诛心】当众揭其欺师灭祖、暗算无崖子之旧恶，斥其声厉内荏！',
        subLabel: '以深厚经义与辩才剥其画皮，激得群豪哄笑（禅心慈悲 +1）',
        tone: 'jade',
        effects: [
          { type: 'setFlag', flag: 'sl_q35_debate_mode', value: 'dharma' },
          { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 1 },
          { type: 'startQuest', questId: SHAOLIN_Q35_QUEST_ID, stepId: 'ding_poison_duel' },
          setStep(SHAOLIN_Q35_QUEST_ID, 'ding_poison_duel'),
          toast('你三言两语剥得丁春秋老脸涨紫！老怪恼羞成怒约战十合化功毒掌！', 'talk', '少室群雄'),
        ],
      },
      {
        id: 'slq35_debate_blade',
        label: '【傲然约掌】直斥星宿暗器毒粉见不得光，当场喝请丁春秋明刀明枪出掌！',
        subLabel: '以少林护法锋芒迎头痛击，震慑星宿妖人（怒目杀业 +1）',
        tone: 'danger',
        effects: [
          { type: 'setFlag', flag: 'sl_q35_debate_mode', value: 'blade' },
          { type: 'addFlagNumber', flag: 'sl_karma_wrath', delta: 1 },
          { type: 'startQuest', questId: SHAOLIN_Q35_QUEST_ID, stepId: 'ding_poison_duel' },
          setStep(SHAOLIN_Q35_QUEST_ID, 'ding_poison_duel'),
          toast('你当场喝战星宿老怪！丁春秋杀机毕露，约你在演武坪硬接十合化功毒掌！', 'talk', '少室群雄'),
        ],
      },
    ],
  },

  scene_slq35_04: {
    id: 'scene_slq35_04',
    title: '第四幕 · 化功毒掌',
    subtitle: '演武坪阵前（宗师中品 · 战前策略抉择）',
    mandatory: true,
    beats: [
      N('{ifFlagEq:sl_q35_debate_mode=dharma|江南陆秀才抚掌大笑“骂得痛快”，数千群雄哄然嘲弄！丁春秋那张童颜老脸涨成猪肝色，眼中杀机毕露；|你凛然喝战之声震彻山坪，中原正派群豪纷纷振臂叫好！丁春秋阴恻恻冷笑一声，收拢羽扇踏入场心；}数千群雄齐齐后退十丈，让出宽阔演武坪！'),
      N('丁春秋双掌泛起幽森碧芒，所过之处青石缝里的秋草瞬间枯黑蜷缩，更有几缕化功毒雾随秋风飘向身侧几名尚未退远的少林小僧！'),
      S('NPC-0112', '（高声提点）“切记！丁春秋『化功大法』以剧毒化人内力，交手万不可久粘其掌，须以纯阳佛门内劲护住心脉、刚猛震荡破之！”'),
      S('NPC-0122', '（阴笑逼近，腰间紫金毒囊微鼓）“少林后辈既敢狂言，今日便在天下群雄眼前，接老仙十合【化功毒掌】罢！”'),
    ],
    choices: [
      {
        id: 'slq35_ding_protect_monks',
        label: '【纯阳护僧】先运《少林九阳功》纯阳内力荡开毒风护住小僧，再硬接十合毒掌！',
        subLabel: '慈悲护持同门，稳守中宫撑过十合（胜后 禅心慈悲 +2）',
        tone: 'jade',
        effects: [
          {
            type: 'startCombat',
            questId: SHAOLIN_Q35_QUEST_ID,
            opponent: {
              kind: 'npc',
              npcId: 'NPC-0122',
              talkOverride:
                '“嘿嘿！自身难保还顾着护这群小秃驴？且尝尝老仙十合化功毒掌的厉害！”',
            },
            rule: 'survive_rounds',
            maxRounds: 10,
            forbidEscapeReason: '数千群雄环伺演武坪，退避一步则少林千年颜面扫地！',
            introText: '【毒掌十合 · 纯阳护僧】护住身旁小僧，于少室山坪阵前硬接【丁春秋】十合化功毒掌！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              { type: 'setFlag', flag: 'sl_q35_ding_tactic', value: 'protect_monks' },
              {
                type: 'branch',
                condition: flag('sl_q35_ding_scored', 'truthy'),
                thenEffects: [],
                elseEffects: [
                  { type: 'setFlag', flag: 'sl_q35_ding_scored', value: true },
                  { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 2 },
                ],
              },
              openScene('scene_slq35_05', SHAOLIN_Q35_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('丁春秋化功毒掌阴狠刁钻，暂运佛门纯阳真气逼出余毒，重整架势再战！', 'warn', '毒掌十合'),
            ],
          },
        ],
      },
      {
        id: 'slq35_ding_strike_pouch',
        label: '【抢攻毒囊】先发制人抢攻其腰间毒囊断其化功毒雾，再正面狠拼十合！',
        subLabel: '以攻代守先破毒源，雷霆硬撼星宿老怪（胜后 怒目杀业 +1）',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: SHAOLIN_Q35_QUEST_ID,
            opponent: {
              kind: 'npc',
              npcId: 'NPC-0122',
              talkOverride:
                '“好胆！竟敢直扑老仙随身毒囊！且叫你十合之内化尽毕生修为！”',
            },
            rule: 'survive_rounds',
            maxRounds: 10,
            forbidEscapeReason: '数千群雄环伺演武坪，退避一步则少林千年颜面扫地！',
            introText: '【毒掌十合 · 抢攻毒囊】先发制人截断毒雾，于少室山坪阵前硬拼【丁春秋】十合化功毒掌！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              { type: 'setFlag', flag: 'sl_q35_ding_tactic', value: 'strike_pouch' },
              {
                type: 'branch',
                condition: flag('sl_q35_ding_scored', 'truthy'),
                thenEffects: [],
                elseEffects: [
                  { type: 'setFlag', flag: 'sl_q35_ding_scored', value: true },
                  { type: 'addFlagNumber', flag: 'sl_karma_wrath', delta: 1 },
                ],
              },
              openScene('scene_slq35_05', SHAOLIN_Q35_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('丁春秋借毒雾闪身反扑，暂运纯阳内劲调息稳住气血后再战！', 'warn', '毒掌十合'),
            ],
          },
        ],
      },
    ],
  },

  scene_slq35_05: {
    id: 'scene_slq35_05',
    title: '第五幕 · 纯阳破毒',
    subtitle: '少室山坪 · 毒焰暂敛',
    illustrationUrl: '/assets/quests/sl_35_ding_poison.jpg',
    illustrationCaption: '演武坪阵前 · 纯阳佛门罡气震散碧绿毒雾，硬接丁春秋十合化功毒掌纹丝不动',
    mandatory: true,
    beats: [
      N('第十合轰然相撞！{ifFlagEq:sl_q35_ding_tactic=protect_monks|你身周纯阳罡气如金钟覆地，既护得几名少林小僧毫发无伤，更将丁春秋倾力拍出的腐尸抽髓掌硬生生震散倒卷！|你一记刚猛指风先点裂其袖中毒囊，复以浑厚佛门纯阳罡气轰碎弥漫碧雾，硬生生逼得丁春秋白袍猎猎连滑七步！}你双足纹丝未动，满山群雄顿时爆发出山呼海啸般的喝彩！'),
      S('NPC-0122', '（暗中藏起发麻的右掌，阴恻恻收扇退回软舆旁）“好浑厚的纯阳内力！十合之约既满，老夫便暂卖少林一个薄面——且看接下来，你们还挡不挡得住下一位贵客！”'),
      N('话音未落，东南石阶忽传一声如黄钟大吕般的宏亮佛号！一道身披明黄织金吐蕃袈裟的高大身影掠过人群头顶，足尖轻点汉白玉栏杆，稳稳落于大雄正殿丹墀铜鼎之前——正是吐蕃护国法王、大轮明王【鸠摩智】！'),
      S('NPC-0113', '（单掌合十，笑意温雅却字字如针）“小僧鸠摩智久仰少林正宗。然观方才交手，招式未免呆板。小僧偶得少林七十二绝技，愿在大雄殿丹墀演练几手，请玄慈方丈与天下群雄品鉴！”'),
    ],
    choices: [
      {
        id: 'slq35_go_jiumozhi',
        label: '随玄慈与诸院师伯登上【大雄正殿 · 佛前蒲团】丹墀，直面大轮明王鸠摩智',
        tone: 'danger',
        effects: [
          setStep(SHAOLIN_Q35_QUEST_ID, 'jiumozhi_provocation'),
          toast('吐蕃国师鸠摩智登坛炫技逼宫！请速赴【大雄正殿 · 佛前蒲团】应对！', 'warn', '少室群雄'),
        ],
      },
    ],
  },

  scene_slq35_06: {
    id: 'scene_slq35_06',
    title: '第六幕 · 明王炫技',
    subtitle: '嵩山少林寺 · 大雄正殿 · 佛前蒲团',
    mandatory: true,
    beats: [
      N('数千群雄仰望丹墀屏息凝神。鸠摩智明黄袈裟无风自动，右手拇食二指轻捻虚弹——“嗤”的一声轻响，三丈外青铜香炉耳环光滑断落，赫然是少林达摩院绝学「拈花指」！'),
      N('未待众僧惊呼，他双掌陡化沉雄刚猛劈出「般若掌」震裂千斤青碑，复反手一记灼热凌厉的「燃木刀」虚空劈燃丹墀侧畔枯松！三门互不相容的少林绝技竟如行云流水连环施出！'),
      S('NPC-0134', '（骇然失声，连退半步）“拈花指柔、般若掌雄、燃木刀烈……寻常高僧单练一门便须三十年苦功，他怎能随手拈来？！”'),
      S('NPC-0113', '（负手环视数千群雄，傲然轻笑）“看来少林武功不过如此！贵寺百余高僧竟无一人通晓如小僧者，不如今日便并入我吐蕃大轮寺门下，由小僧代为整顿寺规如何？！”'),
    ],
    onFinishEffects: [openScene('scene_slq35_07', SHAOLIN_Q35_QUEST_ID)],
  },

  scene_slq35_07: {
    id: 'scene_slq35_07',
    title: '第七幕 · 丹墀鉴伪',
    subtitle: '大雄宝殿丹墀 · 无提示武学鉴伪',
    illustrationUrl: '/assets/quests/sl_35_jiumozhi_show.jpg',
    illustrationCaption: '大雄宝殿丹墀 · 吐蕃国师鸠摩智连施少林七十二绝技挑衅全寺，金袈裟猎猎作响',
    mandatory: true,
    beats: [
      N('台下群豪一片大哗，玄痛怒发冲冠欲拼老命，玄慈却面色沉重未语。唯有你凝神细观鸠摩智每一次变招换气之际的微末破绽——'),
      N('他指掌之间形貌酷似少林绝技八九分，可招意里却全无佛门慈悲化戾之禅定，反倒隐隐透出一股滑溜无形、虚火浮根的异派真气在强行托举变招！'),
      N('满山数千双眼眸皆望向你。此时此刻，你当众踏前一步，决意以何言辞拆穿大轮明王的逼宫气焰？'),
    ],
    choices: [
      {
        id: 'slq35_jmz_accuse_steal',
        label: '“鸠摩智！你暗中偷学我少林秘籍，盗名欺世还不自知羞耻么？！”',
        subLabel: '当众斥责其窃技行径，号召中原群豪同声讨伐',
        tone: 'primary',
        effects: [
          { type: 'setFlag', flag: 'sl_q35_jmz_pick', value: 'steal' },
          openScene('scene_slq35_08', SHAOLIN_Q35_QUEST_ID),
        ],
      },
      {
        id: 'slq35_jmz_expose_xiaowuxiang',
        label: '“招形虽似少林，内息却尽出逍遥派《小无相功》虚火浮根！强催七十二绝技，不出三载必致内息反噬！”',
        subLabel: '直指其变招换气之真气根底，道破功法破绽',
        tone: 'primary',
        effects: [
          { type: 'setFlag', flag: 'sl_q35_jiumozhi_exposed', value: true },
          { type: 'setFlag', flag: 'sl_q35_jmz_pick', value: 'xiaowuxiang' },
          {
            type: 'branch',
            condition: flag('sl_q35_jmz_scored', 'truthy'),
            thenEffects: [],
            elseEffects: [
              { type: 'setFlag', flag: 'sl_q35_jmz_scored', value: true },
              { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 2 },
            ],
          },
          openScene('scene_slq35_08', SHAOLIN_Q35_QUEST_ID),
        ],
      },
      {
        id: 'slq35_jmz_duel_bet',
        label: '“休逞口舌之利！我愿当场与你以命相搏，赌上这少林千年牌匾！”',
        subLabel: '不辩真伪，以生死搏杀捍卫少林山门颜面',
        tone: 'primary',
        effects: [
          { type: 'setFlag', flag: 'sl_q35_jmz_pick', value: 'duel_bet' },
          {
            type: 'branch',
            condition: flag('sl_q35_jmz_scored', 'truthy'),
            thenEffects: [],
            elseEffects: [
              { type: 'setFlag', flag: 'sl_q35_jmz_scored', value: true },
              { type: 'addFlagNumber', flag: 'sl_karma_wrath', delta: 1 },
            ],
          },
          openScene('scene_slq35_08', SHAOLIN_Q35_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq35_08: {
    id: 'scene_slq35_08',
    title: '第八幕 · 飞檐孤影',
    subtitle: '大雄正殿 · 佛前蒲团',
    mandatory: true,
    beats: [
      N(
        '{ifFlagEq:sl_q35_jmz_pick=xiaowuxiang|“逍遥派《小无相功》”六字一出，满场数千群雄顿时一片哗然！鸠摩智一向温雅从容的面容骤然微变，眼底掠过一丝难以掩饰的骇意，强笑道：“好毒的眼力！可单凭空口白话，岂能折服小僧？”|}{ifFlagEq:sl_q35_jmz_pick=steal|鸠摩智听罢微微哂笑：“少林高徒技不如人，便只会污蔑小僧偷学秘籍么？真是叫天下英雄见笑了！”满山哄声顿起，玄难气得胡须直抖。|}{ifFlagEq:sl_q35_jmz_pick=duel_bet|鸠摩智听罢眸中寒光大盛，朗笑一声：“哈哈，好大的胆气！既愿以命相搏赌上少林牌匾，小僧正欲领教！”丹墀刹那剑拔弩张、杀气冲霄！|}',
      ),
      N('正当鸠摩智双袖鼓荡欲要出手之际，大雄宝殿三十丈高的琉璃飞檐之上，忽如九幽崩裂般倾泻下一股令人窒息的恐怖杀气！连鸠摩智都陡然止步抬头失声惊呼：“好恐怖的宗师上品威压！”'),
      N('铅灰云幕下，一道身披玄黑大氅的魁梧老者发出一声苍凉如孤狼啸月的长笑，自三十丈飞檐笔直掠下！双足落地，汉白玉丹墀竟无声无息塌陷出两道寸深脚印！'),
      S('NPC-0105', '（缓缓扯下面巾，露出一张与乔峰有着七分神似的威严沧桑面容，声如洪钟震彻少室）“鸠摩智，收起你那点雕虫小技罢！今日少室山真正的大戏，是请天下群雄瞧一瞧这位道貌岸然的【玄慈方丈】，究竟是个什么人物！”'),
      S('NPC-0112', '（望着那张噩梦纠缠三十载的面容，仿佛刹那苍老二十岁，缓缓合十低念）“阿弥陀佛……萧施主，三十年了，你终究还是站到老衲面前来了。”'),
    ],
    choices: [
      {
        id: 'slq35_face_scandal',
        label: '守于【大雄正殿 · 佛前蒲团】丹墀，直面黑衣【萧远山】揭破惊天旧案',
        tone: 'danger',
        effects: [
          setStep(SHAOLIN_Q35_QUEST_ID, 'scandal_storm'),
          toast('黑衣萧远山自殿顶掠下！请守在大雄正殿直面这场席卷少林的惊天风暴！', 'warn', '方丈丑闻'),
        ],
      },
    ],
  },

  scene_slq35_09: {
    id: 'scene_slq35_09',
    title: '第九幕 · 掷出襁褓',
    subtitle: '嵩山少林寺 · 大雄正殿 · 佛前蒲团',
    mandatory: true,
    beats: [
      N('秋风骤歇，数千人的少室山坪鸦雀无声，唯余檐角铜铃在寒风中孤鸣。黑衣【萧远山】冷笑连连，反手自怀中抽出一件泛黄发旧、绣着莲纹与戒疤香印的婴儿襁褓，重重掷在玄慈脚下！'),
      S('NPC-0105', '（字字如雷响彻山谷）“天下群雄睁大眼睛看清楚！世人皆称少林玄慈方丈戒律精严、乃佛门表率！可谁又知道，二十四年前，这位德高望重的老和尚竟与一个江湖女子私通破戒、生下了一个私生子？！”'),
      S('NPC-0127', '（脸色惨白，厉声怒喝）“一派胡言！何方魔头竟敢在此血口喷人，污蔑我少林方丈清白？！”'),
      S('NPC-0105', '（森然抬手直指西南人群）“血口喷人？那便请当事人上来对质！四大恶人排行第二、『无恶不作』的【叶二娘】，你躲着偷看了二十四年，今日还不滚上来认认你的老相好？！”'),
      S('NPC-0233', '（颊带三道狰狞爪疤的青衣妇人浑身剧颤扑上丹墀，捧起旧襁褓泪如雨下，凄厉泣喊）“玄慈……玄慈哥……这真是咱们孩儿当年的襁褓啊！二十四年前孩儿被人抢走，我日夜找得发了疯，你高居方丈之位却连一句也不敢相认……”'),
    ],
    onFinishEffects: [openScene('scene_slq35_10', SHAOLIN_Q35_QUEST_ID)],
  },

  scene_slq35_10: {
    id: 'scene_slq35_10',
    title: '第十幕 · 方丈认罪',
    subtitle: '大雄正殿 · 千年震荡',
    mandatory: true,
    beats: [
      N('叶二娘泣血之声击碎全寺最后侥幸！满山群雄彻底炸开了锅——少林方丈竟与天下人人得而诛之的四大恶人叶二娘私通生子？！'),
      S('NPC-0156', '（浑身发抖，近乎哀求地望向玄慈）“方丈师兄……你快说一句话啊！告诉天下英雄，这都是魔头栽赃陷害！”'),
      S('NPC-0112', '（长长一叹，神色惨淡而平静，合十望向叶二娘与满山群雄）“阿弥陀佛。出家人不打诳语。萧施主与叶施主所言……句句属实。二十四年前，老衲确曾破色戒，与叶二娘生有一子。”'),
      S('NPC-0122', '（在台下放声怪笑，趁火煽风）“哈哈哈哈！好一个清净百年佛门！原来满口仁义道德，背地里竟与四大恶人苟合！少林寺还有何颜面自称泰山北斗？！”'),
      S('NPC-0113', '（合十佯叹，眼中满是得意）“阿弥陀佛，罪过罪过！看来少林寺戒律废弛已久，小僧代为整顿少林之议，倒真是佛祖慈悲安排啊！”'),
    ],
    onFinishEffects: [openScene('scene_slq35_11', SHAOLIN_Q35_QUEST_ID)],
  },

  scene_slq35_11: {
    id: 'scene_slq35_11',
    title: '第十一幕 · 丑闻惊世',
    subtitle: '大雄宝殿丹墀 · 三难立场抉择',
    illustrationUrl: '/assets/quests/sl_35_scandal_exposed.jpg',
    illustrationCaption: '大雄宝殿丹墀 · 黑衣萧远山当众揭破玄慈与叶二娘二十四年前私生子丑闻，满山群雄哗然',
    mandatory: true,
    beats: [
      N('狂风卷起满地枯黄银杏叶。叶二娘掩面痛哭，萧远山眼神凄厉，玄慈方丈默然闭目合十静立风中，承受着天下数千群雄的指点与嘲弄。'),
      N('少林诸院高僧心神大乱，星宿派、吐蕃僧众与各路看客宵小喧嚣起哄、蠢蠢欲动，千年古刹清誉摇摇欲坠！此时此刻，你作为少林新晋长老一步跨上丹墀最前，在天下英雄面前郑重表态——'),
    ],
    choices: [
      {
        id: 'slq35_stance_defend',
        label: '【护师明大义 · 恳请方丈公断还业】以慈悲大度稳住群雄，绝不许宵小趁火打劫！',
        subLabel: '护持方丈坦然认罪之担当，分清一人之过与千年功德（禅心慈悲 +3）',
        tone: 'jade',
        effects: [
          { type: 'setFlag', flag: 'sl_q35_stance', value: 'defend_abbot' },
          {
            type: 'branch',
            condition: flag('sl_q35_stance_scored', 'truthy'),
            thenEffects: [],
            elseEffects: [
              { type: 'setFlag', flag: 'sl_q35_stance_scored', value: true },
              { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 3 },
            ],
          },
          openScene('scene_slq35_12', SHAOLIN_Q35_QUEST_ID),
        ],
      },
      {
        id: 'slq35_stance_iron_law',
        label: '【大公无私 · 宣布依少林清规公审绝不护短】铁腕弹压喧哗，震慑心怀不轨之徒！',
        subLabel: '当众宣示方丈犯戒与庶僧同罪，令满山宵小不敢轻视寺规（怒目杀业 +3）',
        tone: 'danger',
        effects: [
          { type: 'setFlag', flag: 'sl_q35_stance', value: 'iron_law' },
          {
            type: 'branch',
            condition: flag('sl_q35_stance_scored', 'truthy'),
            thenEffects: [],
            elseEffects: [
              { type: 'setFlag', flag: 'sl_q35_stance_scored', value: true },
              { type: 'addFlagNumber', flag: 'sl_karma_wrath', delta: 3 },
            ],
          },
          openScene('scene_slq35_12', SHAOLIN_Q35_QUEST_ID),
        ],
      },
      {
        id: 'slq35_stance_zen_rebuke',
        label: '【引《维摩诘经》破世俗皮相 · 喝退看客群雄】反诘满山豪客“尔等皆无一念私心乎”！',
        subLabel: '需辩才 ≥ 65 或 经义 ≥ 85 · 绝顶佛辩令满山鸦雀无声（禅心慈悲 +2 · 结算额外声望 +80）',
        tone: 'gold',
        condition: {
          type: 'any',
          hint: '需辩才 ≥ 65 或 经义 ≥ 85',
          conditions: [
            { type: 'skillAtLeast', key: '辩才', min: 65 },
            { type: 'skillAtLeast', key: '经义', min: 85 },
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'sl_q35_stance', value: 'zen_rebuke' },
          {
            type: 'branch',
            condition: flag('sl_q35_stance_scored', 'truthy'),
            thenEffects: [],
            elseEffects: [
              { type: 'setFlag', flag: 'sl_q35_stance_scored', value: true },
              { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 2 },
            ],
          },
          openScene('scene_slq35_12', SHAOLIN_Q35_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq35_12: {
    id: 'scene_slq35_12',
    title: '第十二幕 · 群豪暂慑',
    subtitle: '大雄正殿 · 佛前蒲团',
    mandatory: true,
    beats: [
      N(
        '{ifFlagEq:sl_q35_stance=zen_rebuke|你引《维摩诘经》朗声反诘：“佛门重在知过能改、当众承担！尔等台下数千看客自问平生，难道皆无一念私心、皆可借他人前愆来踩踏五百年护国古刹么？！”声如狮吼晨钟，喧嚣震天的少室山坪竟刹那鸦雀无声！|}{ifFlagEq:sl_q35_stance=defend_abbot|你护在玄慈身侧声震丹墀，言明方丈敢当众认罪还业乃佛门大勇，一人之过岂可抹杀五百年护国功德，更岂容星宿吐蕃外魔趁我家变染指祖庭！满山躁动之气竟被你当场压下！|}{ifFlagEq:sl_q35_stance=iron_law|你大步上前声如金石，凛然宣示少林清规铁面无私，方丈破戒自当依律公审惩处绝不徇私，然谁敢趁乱踏破山门半步必血溅丹墀！凛冽威势竟压得漫山宵小不敢妄动！|}',
      ),
      S(SPEAKER_JIANGHU_SCHOLAR, '（肃然拱手，高声叹服）“好气度！方丈破戒自有少林戒律处置，却绝轮不到丁春秋这等毒魔与吐蕃番僧来欺辱中原佛门！”'),
      S('NPC-0105', '（深深看了你一眼，冷哼道）“少林寺倒还剩个有骨气的后辈。玄慈，今日先揭你伪善面皮，明日藏经阁里再算三十年总账！”'),
      N('话音未落，萧远山抓起泣不成声的叶二娘掠下丹墀，化作黑电遁入后山松林！鸠摩智与丁春秋见大势暂不可夺，冷笑拂袖率众退守演武坪外围虎视眈眈，扬言再候数日看少林还有谁敢接火焰刀！'),
    ],
    onFinishEffects: [openScene('scene_slq35_13', SHAOLIN_Q35_QUEST_ID)],
  },

  scene_slq35_13: {
    id: 'scene_slq35_13',
    title: '第十三幕 · 暗夜托付',
    subtitle: '大雄正殿 · 暮色四合',
    mandatory: true,
    beats: [
      N('暮色笼罩少室山，演武坪外星宿与吐蕃火把如鬼火摇曳。大雄正殿内，玄慈自褪紫金袈裟静候戒律院发落，玄难、玄寂、玄痛诸位长老皆神色沉重。'),
      S('NPC-0112', '（望向你，满目愧疚与欣慰交织）“阿弥陀佛……今日若非你先折丁春秋十合毒掌、复于危难间力挽狂澜稳住群雄，千年少林基业便真要毁于老衲一人之手了。”'),
      S('NPC-0112', '“鸠摩智与丁春秋仍踞山外虎视眈眈，非悟透我少林至高天阶绝学，不足以彻底挫败大轮明王。{ifFlagEq:sl_branch=layman|你乃俗家护法都统，铁血护寺之志可贯日月，务必时刻警惕丹墀强敌突袭！|慈悲禅院与金刚降魔两脉皆有祖师遗泽，快去寻求破境克敌之机罢！}”'),
      N('烛影摇红，大劫将至。你在佛前与诸院师伯面前郑重明志——'),
    ],
    choices: [
      {
        id: 'slq35_vow_enlighten',
        label: '【问道破境】请命潜修祖师遗泽，以佛门无上真禅彻底折服大轮明王！',
        subLabel: '静心破障，以正宗法统重振祖庭清誉（禅心慈悲 +1）',
        tone: 'jade',
        effects: [
          { type: 'setFlag', flag: 'sl_q35_vow', value: 'enlighten' },
          {
            type: 'branch',
            condition: flag('sl_q35_vow_scored', 'truthy'),
            thenEffects: [],
            elseEffects: [
              { type: 'setFlag', flag: 'sl_q35_vow_scored', value: true },
              { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 1 },
            ],
          },
          openScene('scene_slq35_14', SHAOLIN_Q35_QUEST_ID),
        ],
      },
      {
        id: 'slq35_vow_guardian',
        label: '【铁血护山】请命死守大雄丹墀，若外魔敢再进犯必以雷霆击碎之！',
        subLabel: '怒目卫道，以血肉铁骨筑就山门防线（怒目杀业 +1）',
        tone: 'danger',
        effects: [
          { type: 'setFlag', flag: 'sl_q35_vow', value: 'guardian' },
          {
            type: 'branch',
            condition: flag('sl_q35_vow_scored', 'truthy'),
            thenEffects: [],
            elseEffects: [
              { type: 'setFlag', flag: 'sl_q35_vow_scored', value: true },
              { type: 'addFlagNumber', flag: 'sl_karma_wrath', delta: 1 },
            ],
          },
          openScene('scene_slq35_14', SHAOLIN_Q35_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq35_14: {
    id: 'scene_slq35_14',
    title: '第十四幕 · 风云未歇',
    subtitle: '嵩山少林寺 · 破境前夜',
    mandatory: true,
    beats: [
      N('走出大雄正殿，秋夜山风刺骨。经过今日硬接丁春秋十合化功毒掌、丹墀直面鸠摩智七十二绝技与萧远山惊天揭秘，你已彻底看清天下绝顶宗师的壁垒所在。'),
      P('（遥望坪外明灭不定的外魔火把，眸光坚定如磐）“千年古刹岂能折于我辈之手！鸠摩智的虚妄绝技与火焰刀，丁春秋的阴毒诡计，还有潜伏藏经阁三十年的暗影——我必破境而出，亲手挽回少林清誉！”'),
      N('少室山群雄大会首日风波暂歇，而真正的天阶神功觉醒与生死总决战，已在黎明前的至暗时刻悄然酝酿！'),
    ],
    choices: [
      {
        id: 'slq35_finish_reward',
        label: '稳住少林危局，静待天阶破境克敌之机（完成）',
        tone: 'gold',
        effects: [
          {
            type: 'giveCombatExp',
            amount: 1200,
            reason: '少室山群雄大会阵前硬接丁春秋毒掌、周旋鸠摩智与稳住千年古刹危局',
          },
          {
            type: 'branch',
            condition: flag('sl_q35_jiumozhi_exposed', 'truthy'),
            thenEffects: [
              {
                type: 'giveCombatExp',
                amount: 150,
                reason: '丹墀当众识破鸠摩智小无相功虚妄根底之武学洞见',
              },
            ],
            elseEffects: [],
          },
          {
            type: 'modifyRenown',
            delta: 150,
            reason: '少室山数千群雄前硬接星宿老怪十合毒掌，大义稳住少林危局',
          },
          {
            type: 'branch',
            condition: flag('sl_q35_stance', 'eq', 'zen_rebuke'),
            thenEffects: [
              {
                type: 'modifyRenown',
                delta: 80,
                reason: '引《维摩诘经》雄辩折服少室山数千看客群雄，声动天下',
              },
            ],
            elseEffects: [],
          },
          { type: 'modifySkill', key: '辩才', delta: 2 },
          { type: 'modifySkill', key: '经义', delta: 1 },
          { type: 'completeQuest', questId: SHAOLIN_Q35_QUEST_ID, outcome: 'completed' },
          toast(
            '已完成《少室群雄 · 方丈丑闻》！武学经验 +1200、威望 +150、辩才 +2、经义 +1（若识破明王或禅辩喝退群雄另获嘉奖）！',
            'success',
            '少室群雄',
          ),
        ],
      },
    ],
  },
}
