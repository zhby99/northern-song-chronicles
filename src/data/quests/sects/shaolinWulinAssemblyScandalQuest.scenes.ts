import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, openScene, setStep, toast } from '../../../engine/quest/dsl'
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
      N('{reignYear}孟秋，自玄悲、玄苦两位高僧相继遇害以来，江湖上暗流沸腾。不知何方势力竟以少林与武林公议之名，向天下英雄广发铁函金帖，约定七月十五齐聚嵩山少室峰，公推武林盟主、清算三十年旧账！'),
      N('清晨卯时刚过，嵩山脚下早已旌旗蔽日、车马如龙。数千名来自大江南北、关内塞外的武林豪客涌上少室山坪，声浪直冲云霄。'),
      S('NPC-0112', '（立于演武坪高台之上，眉宇间凝着化不开的沧桑与决然）“阿弥陀佛。来者不善，善者不来。今日少室山坪既聚天下群雄，我少林千年祖庭自当敞开山门，坦然相迎。”'),
    ],
    onFinishEffects: [openScene('scene_slq35_02', SHAOLIN_Q35_QUEST_ID)],
  },

  scene_slq35_02: {
    id: 'scene_slq35_02',
    title: '第二幕 · 各路云集',
    subtitle: '钟鼓禅院 · 演武坪',
    mandatory: true,
    beats: [
      N('你放眼望去，演武坪东西两侧已密密麻麻排开数十股大势力：中原五岳剑派、丐帮长老、姑苏慕容世家车驾皆在列中；而西南角却黑幡翻卷，赫然是臭名昭著的西域【星宿派】与凶名震天下的【四大恶人】！'),
      S('NPC-0127', '（低声向你与玄寂道）“瞧那东南石阶下，竟连吐蕃护国法王大轮明王【鸠摩智】也悄然到了！今日这一场大会，怕是有人早便布下了要毁我少林千年清誉的毒局！”'),
      P('（目光沉静地扫过全场，暗中提聚丹田真气）“兵来将挡，水来土掩。诸位师伯放心，弟子既列少林四阶，今日纵是刀山火海，亦绝不容宵小在少室山撒野！”'),
    ],
    onFinishEffects: [openScene('scene_slq35_03', SHAOLIN_Q35_QUEST_ID)],
  },

  scene_slq35_03: {
    id: 'scene_slq35_03',
    title: '第三幕 · 丝竹邪音',
    subtitle: '钟鼓禅院 · 演武坪',
    mandatory: true,
    beats: [
      N('正在群豪议论纷纷之际，西南山道上骤然响起一阵刺耳的铜钹、号角与羌笛之声！数十名身着紫青怪袍的星宿弟子抬着一顶绣满星斗的软舆大摇大摆闯入山坪，齐声高呼拍马屁的肉麻颂词！'),
      S(SPEAKER_XINGXIU_DISCIPLE, '（敲着铜钹扯嗓子尖叫）“星宿老仙，法驾中原！神通广大，法力无边！中原武林盟主之位，非我家老仙莫属！少林秃驴还不速速下跪迎接？！”'),
      N('软舆帘幕轻挑，一名白须飘飘、童颜鹤发、手持羽扇的老者缓缓步出——看似仙风道骨，眼底却闪烁着剧毒蛇蝎般的阴冷幽光，正是威震西域的【星宿老怪 · 丁春秋】！'),
    ],
    onFinishEffects: [openScene('scene_slq35_04', SHAOLIN_Q35_QUEST_ID)],
  },

  scene_slq35_04: {
    id: 'scene_slq35_04',
    title: '第四幕 · 群雄沸腾',
    subtitle: '少室山坪 · 群雄大会',
    illustrationUrl: '/assets/quests/sl_35_wulin_gathering.jpg',
    illustrationCaption: '少室山坪数千群雄大会 · 旌旗蔽日、丝竹喧天，中原豪杰与西域魔头对峙山门',
    mandatory: true,
    beats: [
      S('NPC-0122', '（轻摇羽扇，皮笑肉不笑地扫视玄慈与诸院高僧）“玄慈方丈别来无恙啊？老夫听闻贵寺近来接连折损玄悲、玄苦两位高僧，连自家门户都护不住，何谈执中原武林牛耳？不如今日便把少林藏经阁的钥匙交出来，由老夫代为执掌中原武林如何？”'),
      S(SPEAKER_WULIN_ELDER, '（怒喝出声）“丁老怪！你这星宿海使毒下作的魔头，也敢在少林山门前大放厥词？！”'),
      N('丁春秋袖袍一拂，一缕无色毒风掠过，那名河朔名宿顿时闷哼一声踉跄倒退三步，面皮发青！全场群豪见状大骇，竟一时无人敢轻易上前。'),
    ],
    onFinishEffects: [openScene('scene_slq35_05', SHAOLIN_Q35_QUEST_ID)],
  },

  scene_slq35_05: {
    id: 'scene_slq35_05',
    title: '第五幕 · 挺身出列',
    subtitle: '钟鼓禅院 · 演武坪',
    mandatory: true,
    beats: [
      N('玄难、玄痛二僧大怒欲出，却被你抢先一步横臂拦住。你缓步走下石阶，衣袂在秋风中纹丝不动，清朗沉雄的声音瞬间压过星宿派的聒噪锣鼓！'),
      P('（朗声冷笑，目光如剑直刺丁春秋）“星宿老怪，你仗着几手见不得光的暗器毒粉，偷袭寻常江湖豪客便自诩神通广大，岂不叫天下英雄笑掉大牙？！”'),
      S('NPC-0122', '（眼中寒光一闪，羽扇微顿）“哦？少林寺竟还有个敢跟老夫顶嘴的{gender:小辈|女流}？报上名来，老夫掌下不死无名之鬼！”'),
    ],
    onFinishEffects: [openScene('scene_slq35_06', SHAOLIN_Q35_QUEST_ID)],
  },

  scene_slq35_06: {
    id: 'scene_slq35_06',
    title: '第六幕 · 辩折星宿',
    subtitle: '钟鼓禅院 · 演武坪',
    mandatory: true,
    beats: [
      P('（负手而立，以多年所修经义与辩才滔滔不绝、句句诛心）“你既自夸逍遥派嫡传，为何当年欺师灭祖、暗算师父无崖子前辈？既自称『神通广大』，为何不敢光明正大比拼内功招式，偏要靠弟子吹捧与腐尸毒粉壮胆？佛经有云：『外道邪魔，声厉而内荏。』丁春秋，你今日闯我少室山，究竟是来争武林盟主，还是怕西域待不下去、想来中原借少林名头狐假虎威？！”'),
      S(SPEAKER_JIANGHU_SCHOLAR, '（抚掌大笑，声震山坪）“痛快！骂得太痛快了！丁老怪欺师灭祖、下毒暗算，被这位少林大师三言两语剥得体无完肤！”'),
      N('数千群雄顿时轰然大笑！丁春秋那张保养得红润如童颜的老脸瞬间涨成猪肝色，眼中杀机毕露！'),
    ],
    onFinishEffects: [openScene('scene_slq35_07', SHAOLIN_Q35_QUEST_ID)],
  },

  scene_slq35_07: {
    id: 'scene_slq35_07',
    title: '第七幕 · 毒掌约战',
    subtitle: '钟鼓禅院 · 演武坪',
    mandatory: true,
    beats: [
      S('NPC-0122', '（怒极反笑，周身衣袍无风鼓荡，一股腥甜阴寒的碧绿毒气自掌心弥漫而出）“好一张利嘴！少林寺果然出能言善辩之辈！既然你如此看轻老夫的武功，可敢在天下群雄面前，正面接老夫十合【化功毒掌】？！”'),
      P('（大步踏入场心，双足如铁铸扎根青石）“有何不敢！今日我便在少室山坪，正面接你丁春秋十合化功毒掌——若退半步，便算我少林输了这一阵！”'),
    ],
    choices: [
      {
        id: 'slq35_accept_quest',
        label: '踏入演武坪场心，迎战星宿老怪【丁春秋】十合化功毒掌',
        tone: 'danger',
        effects: [
          { type: 'startQuest', questId: SHAOLIN_Q35_QUEST_ID, stepId: 'ding_poison_duel' },
          setStep(SHAOLIN_Q35_QUEST_ID, 'ding_poison_duel'),
          toast('已开启《少室群雄 · 方丈丑闻》！请于演武坪阵前硬接丁春秋十合化功毒掌！', 'talk', '少室群雄'),
        ],
      },
    ],
  },

  scene_slq35_08: {
    id: 'scene_slq35_08',
    title: '第八幕 · 绿雾弥坪',
    subtitle: '钟鼓禅院 · 演武坪',
    mandatory: true,
    beats: [
      N('数千群雄齐齐后退十丈，让出宽阔的演武坪。丁春秋羽扇一收，双掌泛起幽森碧芒，脚踏星宿诡步飘忽逼近，所过之处青石缝里的秋草竟瞬间枯黑蜷缩！'),
      S('NPC-0112', '（高声提点）“{gender:师侄|女施主}切记！丁春秋『化功大法』阴毒异常，以剧毒化人内力，交手之际万不可与他掌心久粘，须以纯阳佛门内劲护住心脉、刚猛震荡破之！”'),
      P('（合十领命，随后双掌平推，纯阳内息如洪钟大吕轰然护体）“弟子谨记！丁老怪，出掌罢！”'),
    ],
    onFinishEffects: [openScene('scene_slq35_09', SHAOLIN_Q35_QUEST_ID)],
  },

  scene_slq35_09: {
    id: 'scene_slq35_09',
    title: '第九幕 · 化功毒掌',
    subtitle: '演武坪阵前（宗师中品 · 十合硬撼）',
    mandatory: true,
    beats: [
      N('“看掌——！”丁春秋身形化作一道青灰鬼影，三阴蜈蚣爪与抽髓掌连环暴袭，掌风夹杂剧毒碧烟铺天盖地压来！你稳守中宫，在天下数千群雄注视下，硬撼星宿老怪十合化功毒掌！'),
    ],
    choices: [
      {
        id: 'slq35_fight_ding',
        label: '阵前硬接【丁春秋】十合化功毒掌！（宗师中品 · 撑过十合或击退即胜）',
        subLabel: '以佛门纯阳内劲破其毒掌，震慑星宿邪派',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: SHAOLIN_Q35_QUEST_ID,
            opponent: {
              kind: 'npc',
              npcId: 'NPC-0122',
              talkOverride:
                '“哈哈哈！少林寺果然无人，竟派个后辈来送死！且尝尝老仙十合化功毒掌的滋味！”',
            },
            rule: 'survive_rounds',
            maxRounds: 10,
            forbidEscapeReason: '数千群雄环伺演武坪，退避一步则少林千年颜面扫地！',
            introText: '【毒掌十合】于少室山坪阵前硬接星宿老怪【丁春秋】十合化功毒掌！',
            onWin: [openScene('scene_slq35_10', SHAOLIN_Q35_QUEST_ID)],
            onLose: [
              { type: 'healPlayer', hpPct: 90, mpPct: 90 },
              toast('丁春秋化功毒掌阴狠刁钻，暂运佛门纯阳真气逼出余毒，重整架势再战！', 'warn', '毒掌十合'),
            ],
          },
        ],
      },
    ],
  },

  scene_slq35_10: {
    id: 'scene_slq35_10',
    title: '第十幕 · 纯阳破毒',
    subtitle: '钟鼓禅院 · 演武坪',
    mandatory: true,
    beats: [
      N('第十合轰然相撞！丁春秋倾尽宗师中品修为的一记「腐尸抽髓掌」毒雾翻腾，竟被你双掌贯注的浑厚佛门纯阳罡气硬生生震散！气浪倒卷三丈，逼得丁春秋白袍猎猎后滑七步，方才稳住身形！'),
      S('NPC-0122', '（暗中收回微微发麻的右掌，眼中惊疑不定）“好浑厚的佛门纯阳内力！竟能震散老夫的化功毒劲……少林寺什么时候出了你这等后起之秀？！”'),
      N('反观你屹立原地，双足未曾挪动半寸，衣襟虽微沾毒烟却被护体罡气悉数蒸散！'),
    ],
    onFinishEffects: [openScene('scene_slq35_11', SHAOLIN_Q35_QUEST_ID)],
  },

  scene_slq35_11: {
    id: 'scene_slq35_11',
    title: '第十一幕 · 满山喝彩',
    subtitle: '钟鼓禅院 · 演武坪',
    mandatory: true,
    beats: [
      N('沉寂一瞬，少室山坪骤然爆发出山呼海啸般的喝彩声！中原各派豪客无不扬眉吐气，星宿派那些敲锣打鼓的门徒则一个个噤若寒蝉，连鼓槌都险些掉在地上。'),
      S(SPEAKER_WULIN_ELDER, '（抚须大赞）“好！不愧是泰山北斗少林寺的高徒！十合硬接星宿老怪化功毒掌纹丝不动，端的是中原武林之光！”'),
      S('NPC-0122', '（脸上青白交加，阴恻恻冷笑一声收扇退回软舆旁）“哼，十合之约既满，老夫便暂且卖少林一个薄面！且看接下来，你们少林还挡不挡得住下一位贵客！”'),
    ],
    onFinishEffects: [openScene('scene_slq35_12', SHAOLIN_Q35_QUEST_ID)],
  },

  scene_slq35_12: {
    id: 'scene_slq35_12',
    title: '第十二幕 · 毒焰暂敛',
    subtitle: '少室山坪 · 阵前余波',
    illustrationUrl: '/assets/quests/sl_35_ding_poison.jpg',
    illustrationCaption: '演武坪阵前 · 纯阳佛门罡气震散碧绿毒雾，硬接丁春秋十合化功毒掌纹丝不动',
    mandatory: true,
    beats: [
      N('你收掌吐纳，缓缓将侵入指尖的一丝残余阴寒毒气逼出体外。丁春秋退回阵中时那一抹诡谲冷笑，却令你心头警铃大作——今日少室山真正的风暴，才刚刚开始。'),
    ],
    onFinishEffects: [openScene('scene_slq35_13', SHAOLIN_Q35_QUEST_ID)],
  },

  scene_slq35_13: {
    id: 'scene_slq35_13',
    title: '第十三幕 · 梵唱惊空',
    subtitle: '钟鼓禅院 · 演武坪',
    mandatory: true,
    beats: [
      N('果然！丁春秋刚一退下，东南石阶方向便传来一声清越宏亮、如黄钟大吕般的佛号：“阿弥陀佛——！中原武林果真卧虎藏龙，小僧特来领教少林寺七十二绝技！”'),
      N('话音未落，一道身披明黄织金吐蕃袈裟的高大僧影飘然掠过人群头顶，足尖轻点丹墀汉白玉栏杆，稳稳落在大雄正殿前的香炉之畔！来人面容俊朗、宝相庄严，双目却藏着无尽傲慢与锋芒——正是吐蕃护国法王、大轮明王【鸠摩智】！'),
    ],
    onFinishEffects: [openScene('scene_slq35_14', SHAOLIN_Q35_QUEST_ID)],
  },

  scene_slq35_14: {
    id: 'scene_slq35_14',
    title: '第十四幕 · 明王登坛',
    subtitle: '大雄宝殿丹墀下',
    mandatory: true,
    beats: [
      S('NPC-0113', '（单掌合十，笑意温雅却字字如针）“小僧鸠摩智，久仰嵩山少林寺乃天下武学正宗。然方才观贵寺高徒与丁先生交手，虽内力尚可，招式却颇显呆板。小僧不才，偶得少林七十二绝技全本，今日愿在天下群雄面前演练数门，请玄慈方丈与诸位高僧品鉴！”'),
      S('NPC-0127', '（脸色骤变，脱口喝道）“胡说八道！我少林七十二绝技乃历代祖师心血，从未外传，便是本寺高僧一生亦难兼修三四门，你这番僧岂敢妄言尽得全本？！”'),
      S('NPC-0113', '（微微一笑，袖袍一振）“眼见为实，玄难首座请看好了！”'),
    ],
    onFinishEffects: [openScene('scene_slq35_15', SHAOLIN_Q35_QUEST_ID)],
  },

  scene_slq35_15: {
    id: 'scene_slq35_15',
    title: '第十五幕 · 移步丹墀',
    subtitle: '钟鼓禅院 · 演武坪',
    mandatory: true,
    beats: [
      N('鸠摩智已跃上大雄宝殿正前丹墀，摆出逼宫全寺之势！玄慈方丈神色凝重地向你颔首示意。你当即提气迈步，随玄难、玄寂、玄痛诸位师伯一同登上大雄正殿丹墀，近身察看这吐蕃国师究竟耍何玄虚！'),
    ],
    choices: [
      {
        id: 'slq35_go_jiumozhi',
        label: '登上【大雄宝殿方丈院 · 大雄正殿 · 佛前蒲团】直面大轮明王鸠摩智',
        tone: 'danger',
        effects: [
          setStep(SHAOLIN_Q35_QUEST_ID, 'jiumozhi_provocation'),
          toast('吐蕃国师鸠摩智登坛炫技逼宫！请速赴【大雄正殿 · 佛前蒲团】应对！', 'warn', '少室群雄'),
        ],
      },
    ],
  },

  scene_slq35_16: {
    id: 'scene_slq35_16',
    title: '第十六幕 · 群雄屏息',
    subtitle: '大雄宝殿丹墀',
    mandatory: true,
    beats: [
      N('数千群雄齐齐仰望丹墀，呼吸几乎凝滞。大轮明王鸠摩智独立铜鼎之前，周身明黄袈裟无风自动，竟隐隐散发出与少林正宗无异的宏大佛门威压。'),
    ],
    onFinishEffects: [openScene('scene_slq35_17', SHAOLIN_Q35_QUEST_ID)],
  },

  scene_slq35_17: {
    id: 'scene_slq35_17',
    title: '第十七幕 · 拈花无相',
    subtitle: '嵩山少林寺 · 大雄正殿 · 佛前蒲团',
    mandatory: true,
    beats: [
      S('NPC-0113', '（右手拇指与食指轻轻一捻，虚空轻弹）“第一招，便请达摩院诸位大师品鉴——【拈花指】！”'),
      N('“嗤”的一声轻响！三丈之外一尊青铜香炉耳环竟无声无息断成两截，切口光滑如镜，正是少林达摩院绝学「拈花指」的柔韧指劲！'),
      S('NPC-0113', '（不等众人惊呼，左手屈指再弹，指风凌厉如刀）“第二招，【多罗叶指】！第三招，【无相劫指】！”'),
      N('只见两道截然不同的无形指劲破空而出，将丹墀侧畔两块千斤青石碑生生洞穿！全寺僧众无不大惊失色！'),
    ],
    onFinishEffects: [openScene('scene_slq35_18', SHAOLIN_Q35_QUEST_ID)],
  },

  scene_slq35_18: {
    id: 'scene_slq35_18',
    title: '第十八幕 · 般若摩诃',
    subtitle: '大雄正殿 · 佛前蒲团',
    mandatory: true,
    beats: [
      S('NPC-0134', '（骇然失声，连退半步）“这……这怎可能？！『拈花指』柔中带刚，『多罗叶指』劲力外放，『无相劫指』虚实难测，寻常高僧单练一门便须三十年苦功，他竟能随手拈来、连环施展？！”'),
      S('NPC-0113', '（长笑一声，双掌忽化沉雄刚猛之势，掌风雷鸣）“还有这【般若掌】与【摩诃指】！玄慈方丈，小僧一人便通晓贵寺数门绝技，而贵寺数百高僧竟无人能敌，岂不证明少林武学在嵩山已然式微、后继无人？！”'),
      N('台下群豪一片大哗！有人惊叹吐蕃国师天纵奇才，更有人交头接耳，质疑少林寺是否真已徒有虚名。'),
    ],
    onFinishEffects: [openScene('scene_slq35_19', SHAOLIN_Q35_QUEST_ID)],
  },

  scene_slq35_19: {
    id: 'scene_slq35_19',
    title: '第十九幕 · 慧眼疑端',
    subtitle: '大雄正殿 · 佛前蒲团',
    mandatory: true,
    beats: [
      N('唯有你凝神细观鸠摩智每一次变招换气之际的微末细节，凭着八十六重以上深厚经义与少林二十载苦修根基，心头忽生一丝极深的违和感！'),
      P('（低声向身旁玄难与玄慈道）“方丈、玄难师伯，不对劲！鸠摩智施展这些少林绝技，形貌虽酷似八九分，可招意之间却毫无佛门慈悲化解戾气的禅意，反倒透着一股诡异流畅的道家虚无真气在背后强行催动！”'),
      S('NPC-0112', '（眼中闪过一丝赞许，却仍面色沉重）“你眼力极毒。只是此刻口说无凭，鸠摩智武功已臻宗师中品化境，若不能当场以更高深之禅功破其虚妄，少林声望必受重创。”'),
    ],
    onFinishEffects: [openScene('scene_slq35_20', SHAOLIN_Q35_QUEST_ID)],
  },

  scene_slq35_20: {
    id: 'scene_slq35_20',
    title: '第二十幕 · 逼宫祖庭',
    subtitle: '大雄正殿 · 佛前蒲团',
    mandatory: true,
    beats: [
      S('NPC-0113', '（双手负后，傲然环视数千群雄）“玄慈方丈，少林既已无人能承达摩祖师衣钵，不如今日便由天下群雄做个见证——从此少林寺并入我吐蕃大轮寺门下，由小僧代为整顿寺规、重振佛法，如何？！”'),
      S('NPC-0156', '（气得须发倒竖，怒吼道）“狂妄番僧！休想辱我千年祖庭！便是拼了老命，老衲也要与你同归于尽！”'),
      P('（一步踏前挡在玄痛师叔身前，声音冷冽如冰）“鸠摩智，你以邪门内功盗仿我少林绝技皮毛，也敢妄言并吞祖庭？少林虽历经劫难，却还轮不到吐蕃番僧在此指手画脚！”'),
    ],
    onFinishEffects: [openScene('scene_slq35_21', SHAOLIN_Q35_QUEST_ID)],
  },

  scene_slq35_21: {
    id: 'scene_slq35_21',
    title: '第二十一幕 · 明王炫技',
    subtitle: '大雄宝殿丹墀 · 七十二绝技逼宫',
    illustrationUrl: '/assets/quests/sl_35_jiumozhi_show.jpg',
    illustrationCaption: '大雄宝殿丹墀 · 吐蕃国师鸠摩智连施少林七十二绝技挑衅全寺，金袈裟猎猎作响',
    mandatory: true,
    beats: [
      S('NPC-0113', '（饶有兴致地上下打量着你，眼中闪过一丝忌惮与战意）“哦？方才硬接丁春秋十合毒掌的便是你。你倒是有些眼力，可惜单凭口舌，可挡不住小僧的七十二绝技！来吧，让我看看少林寺最出众的传人，究竟能接小僧几招！”'),
      N('剑拔弩张之际，丹墀上空骤然刮起一阵刺骨阴风！一股沉重得令人几乎窒息的恐怖杀气，竟毫无征兆地从大雄宝殿三十丈高的琉璃飞檐之上倾泻而下！'),
    ],
    onFinishEffects: [openScene('scene_slq35_22', SHAOLIN_Q35_QUEST_ID)],
  },

  scene_slq35_22: {
    id: 'scene_slq35_22',
    title: '第二十二幕 · 檐顶寒威',
    subtitle: '大雄正殿 · 佛前蒲团',
    mandatory: true,
    beats: [
      N('连正欲出手的鸠摩智都陡然停步，脸色微变地抬头望向大雄宝殿檐顶！只见铅灰云层之下，一名身披玄黑大氅、面罩黑巾的魁梧老者宛如幽冥魔神般静立于鸱吻之上，一双饱含三十年血仇的冷目，死死锁在【玄慈】方丈身上！'),
      S('NPC-0113', '（失声惊道）“好恐怖的内力威压！中原武林竟还藏着这等宗师上品绝世人物？！”'),
      P('（心头轰然巨震，瞬间想起罗汉堂玄苦师叔胸前那记宽大刚猛的巨掌印）“这股如草原狂风铁骑般的霸烈死气……是他！潜伏在少林暗处三十年的契丹绝世高手！”'),
    ],
    onFinishEffects: [openScene('scene_slq35_23', SHAOLIN_Q35_QUEST_ID)],
  },

  scene_slq35_23: {
    id: 'scene_slq35_23',
    title: '第二十三幕 · 黑衣降世',
    subtitle: '大雄正殿 · 佛前蒲团',
    mandatory: true,
    beats: [
      N('那黑衣老者发出一声苍凉如孤狼啸月的长笑，身形自三十丈高的飞檐之上笔直掠下！双足落地之际，汉白玉丹墀竟无声无息塌陷出两道寸许深的脚印！'),
      S('NPC-0105', '（缓缓扯下面巾，露出一张饱经风霜、却与乔峰有着七分神似的威严面容，声如洪钟震彻少室山）“鸠摩智，收起你那点雕虫小技罢！今日少室山真正的大戏，可不是什么少林七十二绝技——而是请天下数千群雄，好好瞧一瞧这位道貌岸然的【玄慈方丈】，究竟是个什么人物！”'),
    ],
    onFinishEffects: [openScene('scene_slq35_24', SHAOLIN_Q35_QUEST_ID)],
  },

  scene_slq35_24: {
    id: 'scene_slq35_24',
    title: '第二十四幕 · 劫数难逃',
    subtitle: '大雄正殿 · 佛前蒲团',
    mandatory: true,
    beats: [
      N('玄慈方丈望着眼前这张三十年来无数次出现在梦魇中的脸庞，整个人仿佛一瞬间苍老了二十岁。他没有后退，也没有辩解，只是缓缓合上双掌，低声念了一句佛号。'),
      S('NPC-0112', '“阿弥陀佛……萧施主，三十年了，你终究还是站到老衲面前来了。”'),
      N('全寺高僧与数千群雄面面相觑，隐约感到一桩足以颠覆整个北宋武林的惊天秘辛即将当众炸裂！'),
    ],
    choices: [
      {
        id: 'slq35_face_scandal',
        label: '守在【大雄正殿 · 佛前蒲团】，直面黑衣【萧远山】揭破惊天秘辛',
        tone: 'danger',
        effects: [
          setStep(SHAOLIN_Q35_QUEST_ID, 'scandal_storm'),
          toast('黑衣萧远山自殿顶掠下！请守在大雄正殿直面这场席卷少林的惊天风暴！', 'warn', '方丈丑闻'),
        ],
      },
    ],
  },

  scene_slq35_25: {
    id: 'scene_slq35_25',
    title: '第二十五幕 · 屏息待变',
    subtitle: '大雄正殿 · 佛前蒲团',
    mandatory: true,
    beats: [
      N('秋风骤歇，数千人的少室山坪此刻竟鸦雀无声，唯有檐角铜铃在寒风中孤零零地轻响。所有人的目光，都死死聚焦在黑衣萧远山与合十默立的玄慈方丈之间。'),
    ],
    onFinishEffects: [openScene('scene_slq35_26', SHAOLIN_Q35_QUEST_ID)],
  },

  scene_slq35_26: {
    id: 'scene_slq35_26',
    title: '第二十六幕 · 掷出襁褓',
    subtitle: '大雄正殿 · 佛前蒲团',
    mandatory: true,
    beats: [
      S('NPC-0105', '（冷笑连连，反手自怀中抽出一件泛黄发旧、绣着莲纹与戒疤香印的婴儿襁褓，掷在玄慈脚下）“天下群雄都睁大眼睛看看！世人皆称嵩山少林寺玄慈方丈德高望重、戒律精严，乃中原佛门表率！可你们可曾知道，二十四年前，这位德高望重的少林高僧，竟与一个江湖女子私通破戒、生下了一个私生子？！”'),
      N('此言一出，犹如晴天霹雳炸响在少室山顶！数千群雄顿时一片哗然，惊呼质疑之声四起！'),
      S('NPC-0127', '（脸色惨白，厉声喝斥）“一派胡言！何方魔头竟敢在此血口喷人、污蔑我少林方丈清白？！”'),
    ],
    onFinishEffects: [openScene('scene_slq35_27', SHAOLIN_Q35_QUEST_ID)],
  },

  scene_slq35_27: {
    id: 'scene_slq35_27',
    title: '第二十七幕 · 无恶不作',
    subtitle: '大雄正殿 · 佛前蒲团',
    mandatory: true,
    beats: [
      S('NPC-0105', '（森然冷笑，猛地抬手指向人群西南角）“血口喷人？那便请当事人自己出来对质！——四大恶人排行第二、『无恶不作』的【叶二娘】，你躲在人群里偷看了二十四年，今日还不滚上来认一认你当年的老相好么？！”'),
      N('人群骤然分开！只见一名面颊留着三道狰狞血爪伤疤、怀中空抱的青衣妇人浑身剧烈颤抖着走上丹墀。她望见地上那件泛黄旧襁褓，又抬头望向白眉低垂的玄慈方丈，积压了二十四年的悲苦与癫狂瞬间溃堤！'),
      S('NPC-0233', '（泪如雨下，声音凄厉沙哑）“玄慈……玄慈哥……那件襁褓……真是咱们孩儿当年的襁褓啊！二十四年前我孩儿被人抢走，我日日夜夜找得发了疯，你身居少林方丈高位，却连一句不敢相认……”'),
    ],
    onFinishEffects: [openScene('scene_slq35_28', SHAOLIN_Q35_QUEST_ID)],
  },

  scene_slq35_28: {
    id: 'scene_slq35_28',
    title: '第二十八幕 · 方丈默然',
    subtitle: '大雄正殿 · 佛前蒲团',
    mandatory: true,
    beats: [
      N('叶二娘这一声泣血呼喊，彻底击碎了全寺最后的侥幸！数千群雄彻底炸开了锅——少林寺方丈，竟与天下人人得而诛之的四大恶人「无恶不作」叶二娘私通生子？！'),
      S('NPC-0156', '（浑身发抖，难以置信地望向玄慈）“方丈师兄……你快说一句话啊！告诉天下英雄，这都是魔头栽赃陷害！”'),
      S('NPC-0112', '（长长一叹，缓缓抬首，目光平静而悲悯地掠过叶二娘、萧远山与满山群雄）“阿弥陀佛。出家人不打诳语。萧施主与叶施主所言……句句属实。二十四年前，老衲确曾破色戒，与叶二娘生有一子。”'),
    ],
    onFinishEffects: [openScene('scene_slq35_29', SHAOLIN_Q35_QUEST_ID)],
  },

  scene_slq35_29: {
    id: 'scene_slq35_29',
    title: '第二十九幕 · 千年震荡',
    subtitle: '大雄正殿 · 佛前蒲团',
    mandatory: true,
    beats: [
      N('“轰——！”玄慈方丈亲口认罪，如同一座巍峨千年的须弥山在众人眼前轰然崩裂！'),
      S('NPC-0122', '（在台下放声怪笑，煽风点火）“哈哈哈哈！好一个百年清净佛门！好一个德高望重的玄慈方丈！原来少林寺满口仁义道德，背地里竟与四大恶人苟合生子！今日之后，少林寺还有何颜面自称天下武林泰山北斗？！”'),
      S('NPC-0113', '（合十佯叹，眼中却满是得意）“阿弥陀佛，罪过罪过！看来少林寺戒律废弛已久，小僧方才提议代为整顿少林，倒真是佛祖慈悲之安排啊！”'),
    ],
    onFinishEffects: [openScene('scene_slq35_30', SHAOLIN_Q35_QUEST_ID)],
  },

  scene_slq35_30: {
    id: 'scene_slq35_30',
    title: '第三十幕 · 丑闻惊世',
    subtitle: '大雄宝殿丹墀 · 方丈丑闻爆发',
    illustrationUrl: '/assets/quests/sl_35_scandal_exposed.jpg',
    illustrationCaption: '大雄宝殿丹墀 · 黑衣萧远山当众揭破玄慈与叶二娘二十四年前私生子丑闻，满山群雄哗然',
    mandatory: true,
    beats: [
      N('狂风卷起满地枯黄银杏叶，叶二娘跪在地上掩面痛哭，萧远山仰天狂笑复又眼神凄厉，玄慈方丈闭目合十静立风中，承受着来自天下数千群雄的指点、鄙夷与嘲笑。'),
      N('千年古刹嵩山少林寺的清誉，在这一刻摇摇欲坠，仿佛随时便要在群魔环伺之下分崩离析！'),
    ],
    onFinishEffects: [openScene('scene_slq35_31', SHAOLIN_Q35_QUEST_ID)],
  },

  scene_slq35_31: {
    id: 'scene_slq35_31',
    title: '第三十一幕 · 独撑危局',
    subtitle: '大雄正殿 · 佛前蒲团',
    mandatory: true,
    beats: [
      N('眼见星宿派、吐蕃僧众与各路趁火打劫的宵小蠢蠢欲动，少林众僧群龙无首、士气跌至谷底。你深吸一口气，一步踏上丹墀最前端，洪亮清越的声音如晨钟破雾，响彻少室山谷！'),
      P('（目光凛然环视数千群雄，字字铿锵）“诸位英雄且静听一言！玄慈方丈二十四年前破戒乃其一人之过，方丈既敢当着天下群雄之面坦然认罪、不讳前愆，依少林千年寺规，自当由戒律院依律惩处，绝无半分徇私！”'),
      P('“然一人之过，岂可抹杀达摩祖师东渡以来五百年少林护国佑民、济世救人之功德？！丁春秋、鸠摩智，尔等趁我寺家变之际煽风点火、妄图染指祖庭——只要我少林尚有一人在，便绝不容外魔踏破山门半步！”'),
    ],
    onFinishEffects: [openScene('scene_slq35_32', SHAOLIN_Q35_QUEST_ID)],
  },

  scene_slq35_32: {
    id: 'scene_slq35_32',
    title: '第三十二幕 · 群豪暂慑',
    subtitle: '大雄正殿 · 佛前蒲团',
    mandatory: true,
    beats: [
      N('你这一番大义凛然、公私分明的陈词，竟如一盆冷水浇醒了躁动的群豪！中原正派名宿纷纷颔首，就连满脸嘲讽的丁春秋也不禁眯起双眼。'),
      S(SPEAKER_JIANGHU_SCHOLAR, '（拱手赞叹）“这位少林高徒说得在理！方丈破戒自当依戒律处置，却绝不该由丁春秋这等西域毒魔与吐蕃番僧来欺辱中原佛门！”'),
      S('NPC-0105', '（深深看了你一眼，冷哼道）“少林寺倒还剩个有骨气的后辈。玄慈，你欠我萧远山的血海深仇，今日先揭你伪善面皮，明日藏经阁里再算总账！”'),
    ],
    onFinishEffects: [openScene('scene_slq35_33', SHAOLIN_Q35_QUEST_ID)],
  },

  scene_slq35_33: {
    id: 'scene_slq35_33',
    title: '第三十三幕 · 萧影遁去',
    subtitle: '大雄正殿 · 佛前蒲团',
    mandatory: true,
    beats: [
      N('黑衣萧远山话音一落，抓起泣不成声的叶二娘掠下丹墀，如一道黑电般消失在后山松林深处。'),
      S('NPC-0113', '（见群豪情绪暂平，却仍不肯罢休，冷笑拂袖）“好个伶牙俐齿的少林传人！既然你们不服，小僧便在少室山再候几日——待你少林清理完门户，小僧倒要看看，还有谁能挡住我这七十二绝技与火焰刀！”'),
      N('说罢，鸠摩智与丁春秋各自率众暂退至演武坪外围虎视眈眈，整个少林寺虽暂免立刻倾覆，却已陷入四面楚歌的至暗时刻！'),
    ],
    onFinishEffects: [openScene('scene_slq35_34', SHAOLIN_Q35_QUEST_ID)],
  },

  scene_slq35_34: {
    id: 'scene_slq35_34',
    title: '第三十四幕 · 暗夜托付',
    subtitle: '大雄正殿 · 暮色四合',
    mandatory: true,
    beats: [
      N('暮色笼罩少室山，殿外篝火点点，数千群雄尚未散去。大雄正殿内，玄慈方丈自褪紫金袈裟，静候戒律院发落；玄难、玄寂、玄痛诸位长老皆神色沉痛。'),
      S('NPC-0112', '（望向你，眼中流露出前所未有的欣慰与愧疚）“阿弥陀佛……今日若非你先折丁春秋毒掌、复于危难间以大义稳住天下群雄，少林千年基业便真要毁于老衲之手了。”'),
      S('NPC-0112', '“鸠摩智与丁春秋虎视眈眈，非练成我少林至高天阶绝学，不足以彻底挫败大轮明王、重振山门。{ifFlag:sl_branch==layman|你乃俗家护法都统，铁血护寺之志可贯日月，务必时刻警惕丹墀强敌突袭！|你潜修佛门多年，慈悲禅院与金刚降魔两脉皆有祖师遗泽，快去寻求破境之机罢！}”'),
    ],
    onFinishEffects: [openScene('scene_slq35_35', SHAOLIN_Q35_QUEST_ID)],
  },

  scene_slq35_35: {
    id: 'scene_slq35_35',
    title: '第三十五幕 · 破境前夜',
    subtitle: '大雄正殿 · 佛前蒲团',
    mandatory: true,
    beats: [
      N('走出大雄正殿，山风刺骨。你遥望演武坪外吐蕃与星宿派摇曳的火把，心中无比澄明：今日硬接丁春秋十合毒掌、直面鸠摩智七十二绝技逼宫与萧远山惊天揭秘，已让你彻底看清了天下绝顶宗师的壁垒所在。'),
      P('（缓缓握紧双拳，目光坚定如磐石）“千年古刹岂能折于我辈之手！鸠摩智的虚妄绝技与火焰刀，丁春秋的阴毒手段，还有潜伏藏经阁三十年的暗影——我必破境而出，亲手挽回少林清誉！”'),
    ],
    onFinishEffects: [openScene('scene_slq35_36', SHAOLIN_Q35_QUEST_ID)],
  },

  scene_slq35_36: {
    id: 'scene_slq35_36',
    title: '第三十六幕 · 风云未歇',
    subtitle: '嵩山少林寺 · 夜色苍茫',
    mandatory: true,
    beats: [
      N('少室山群雄大会第一日风波暂歇，然真正的生死决战与佛门神功觉醒，已在黎明前的至暗时刻悄然酝酿！'),
    ],
    choices: [
      {
        id: 'slq35_finish_reward',
        label: '稳住少林危局，静待破境克敌之机（完成）',
        tone: 'gold',
        effects: [
          {
            type: 'giveCombatExp',
            amount: 1200,
            reason: '少室山群雄大会阵前硬接丁春秋毒掌、周旋鸠摩智与稳住千年古刹危局',
          },
          {
            type: 'modifyRenown',
            delta: 150,
            reason: '少室山数千群雄前硬接星宿老怪十合毒掌，大义稳住少林危局',
          },
          { type: 'modifySkill', key: '辩才', delta: 2 },
          { type: 'modifySkill', key: '经义', delta: 1 },
          { type: 'completeQuest', questId: SHAOLIN_Q35_QUEST_ID, outcome: 'completed' },
          toast(
            '已完成《少室群雄 · 方丈丑闻》！武学经验 +1200、威望 +150、辩才 +2、经义 +1！',
            'success',
            '少室群雄',
          ),
        ],
      },
    ],
  },
}
