import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, setStep, toast } from '../../../engine/quest/dsl'
import { SHAOLIN_SIDE09_QUEST_ID } from './shaolinSideQiyunRelicQuest'

const SPEAKER_BASANG: StorySpeakerSpec = {
  kind: 'custom',
  name: '巴桑',
  title: '吐蕃黑教盗宝护法',
  factionName: '吐蕃黑教',
  portraitUrl: '/assets/characters/templates/tpl_tubo_esoteric_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_tubo_esoteric_male_av.jpg',
}

const SPEAKER_RAIDER: StorySpeakerSpec = {
  kind: 'custom',
  name: '黑教密探',
  title: '吐蕃盗宝死士',
  factionName: '吐蕃黑教',
  portraitUrl: '/assets/characters/templates/tpl_tubo_tribes_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_tubo_tribes_male_av.jpg',
}

function buildBasang(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLS09_BASANG',
    name: '巴桑',
    title: '吐蕃黑教盗宝护法 · 巴桑',
    realm: '二流上品',
    factionName: '吐蕃黑教',
    sectRank: 0,
    sectRankLabel: '密教护法',
    avatarUrl: '/assets/characters/templates/tpl_tubo_esoteric_male_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_tubo_esoteric_male_fb.jpg',
    talk: '“中原小僧倒有几分脚力，竟能追上齐云塔十三层绝顶！可这佛骨舍利合该归我雪域密教供奉，今日便送你坠落古塔！”',
    stats: { hp: 1740, mp: 1480, agi: 55, res: 42 },
    talents: { bone: 70, comprehension: 56, charm: 32 },
    equippedArts: { neigong: 'MA-140', move1: 'MA-124', move2: 'MA-133' },
    learnedArts: [{ artId: 'MA-140', level: 6 }, { artId: 'MA-124', level: 6 }, { artId: 'MA-133', level: 6 }],
  })
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_sls09_01: {
    id: 'scene_sls09_01',
    title: '第一幕 · 地宫渗水',
    subtitle: '洛阳府 · 白马寺 · 齐云密檐舍利古塔',
    mandatory: true,
    beats: [
      N('{reignYear}洛阳秋雨绵绵，释源祖庭白马寺东侧的十三层齐云密檐古塔矗立烟雨之中。你前来礼佛访友，见达摩院护经僧慧博正神色凝重地率虚智、虚空与净云在塔基石门前忙碌。'),
      S('NPC-0377', '（见你到来，合十迎上）“阿弥陀佛！师弟精通佛典经义，来得恰是时候！连日阴雨致使齐云塔地宫暗渠返潮渗水，石匣受湿，我们须得依古仪暂启地宫，将汉唐高僧留下的七宝舍利函移往高处烘干修缮。”'),
      S('NPC-0503', '（忧心忡忡地望向塔外林荫）“只是昨夜洒扫时，净云说在白马寺外墙脚下捡到半截涂着酥油的藏香残灰，我总觉得有西域生人在窥探古塔动静……”'),
    ],
    onFinishEffects: [openScene('scene_sls09_02', SHAOLIN_SIDE09_QUEST_ID)],
  },

  scene_sls09_02: {
    id: 'scene_sls09_02',
    title: '第二幕 · 辨认古仪',
    subtitle: '齐云密檐舍利古塔 · 地宫石室',
    mandatory: true,
    beats: [
      N('你随众人步入阴凉微潮的塔基地宫，借油灯光芒细读石壁上斑驳的唐代《舍利安置铭》，逐一核对石函、铜匣、银椁、金棺四重封印的开启仪轨，丝毫不敢亵渎。'),
      P('（轻触石壁梵汉双碑，沉声道）“碑文记述，此舍利函乃是东汉摄摩腾、竺法兰东来传法一脉所传，不仅为中原释门至宝，亦是雪域诸部垂涎之圣物。虚智师弟所见酥油藏香绝非偶然——今夜宝函离宫，必有外道趁隙来夺！”'),
      S('NPC-0551', '（按住腰间戒刀，沉稳颔首）“师兄思虑极是！我与慧博师兄分守塔门与一层回廊，净云留在大佛宝殿随时敲钟报警，今夜咱们便在齐云塔轮值护宝！”'),
    ],
    onFinishEffects: [openScene('scene_sls09_03', SHAOLIN_SIDE09_QUEST_ID)],
  },

  scene_sls09_03: {
    id: 'scene_sls09_03',
    title: '第三幕 · 塔前盟守',
    subtitle: '齐云密檐舍利古塔 · 塔院',
    mandatory: true,
    beats: [
      S('NPC-0377', '“事不宜迟，地宫修缮需至明晨方能合龙。今夜劳烦师弟坐镇塔心三层，居中策应上下。但凡有贼人敢闯释源祖庭，咱们便叫他有来无回！”'),
      S('NPC-0999', '（紧握木鱼槌，神色坚毅）“弟子定守好钟楼，绝不疏漏！”'),
    ],
    choices: [
      {
        id: 'sls09_accept',
        label: '应下护塔重任，夜守【齐云密檐舍利古塔】护卫舍利宝函',
        tone: 'gold',
        effects: [
          { type: 'startQuest', questId: SHAOLIN_SIDE09_QUEST_ID, stepId: 'defend_pagoda_night' },
          setStep(SHAOLIN_SIDE09_QUEST_ID, 'defend_pagoda_night'),
          toast(
            '已布下齐云塔夜防！请守候于【白马寺 · 齐云密檐舍利古塔（ly_bm_pagoda）】，静待夜袭。',
            'talk',
            '舍利迷踪',
          ),
        ],
      },
    ],
  },

  scene_sls09_04: {
    id: 'scene_sls09_04',
    title: '第四幕 · 黑教夜袭',
    subtitle: '齐云密檐舍利古塔 · 子夜寒风',
    illustrationUrl: '/assets/quests/sl_s09_qiyun_relic.jpg',
    illustrationCaption: '齐云古塔夜袭 · 吐蕃黑教护法巴桑破门强夺佛骨舍利宝函',
    mandatory: true,
    beats: [
      N('子夜时分，塔外骤起一阵刺耳的骨笛凄鸣，紧接着塔门轰然震裂！七八名身披绛黑僧袍、面绘赭红密纹的吐蕃黑教武士如鬼魅般破窗而入，手中弯刀与铜杵寒光四射！'),
      N('为首一名身材魁梧、双目精光逼人的黑教护法【巴桑】一掌震退迎战的虚智与虚空，反手夺过供案上的七宝舍利金函，狂笑一声便朝盘旋木梯疾掠而上！'),
      S('NPC-0377', '（挥刀逼退两名黑教密探，急声大呼）“师弟！那红衣护法抢走了舍利宝函！他必是想登上塔顶借飞抓长索越墙遁逃，快追上去截住他，楼下杂兵交由我们抵挡！”'),
    ],
    onFinishEffects: [openScene('scene_sls09_05', SHAOLIN_SIDE09_QUEST_ID)],
  },

  scene_sls09_05: {
    id: 'scene_sls09_05',
    title: '第五幕 · 拾级破伏',
    subtitle: '齐云密檐舍利古塔 · 五层木梯',
    mandatory: true,
    beats: [
      N('你身形如电，沿狭窄陡峭的盘旋木梯紧追不舍。行至五层转角，两名留后断尾的黑教密探挥舞藏刀猛扑而下，企图以窄梯地形将你死死拖住！'),
      S(SPEAKER_RAIDER, '“护法大人已携圣物登顶！中原和尚休想再前进一步！”'),
      P('（脚踏梅花错步贴壁掠起，左右连发两记刚猛掌风）“佛门圣地岂容外道猖狂——滚开！”'),
      N('双掌齐震，两名黑教密探只觉胸口如遭重锤撞击，惨叫着滚落木梯，正好被赶上来的虚空顺手点倒捆牢。'),
    ],
    onFinishEffects: [openScene('scene_sls09_06', SHAOLIN_SIDE09_QUEST_ID)],
  },

  scene_sls09_06: {
    id: 'scene_sls09_06',
    title: '第六幕 · 密烟暗算',
    subtitle: '齐云密檐舍利古塔 · 九层檐廊',
    mandatory: true,
    beats: [
      N('追至九层，塔内忽被一阵浓烈刺鼻的暗紫酥油迷烟吞没，视线瞬间一片漆黑。楼上隐隐传来巴桑低沉得意的笑声，夹杂着铁钩甩出扣住飞檐的铿锵脆响！'),
      P('（立刻闭气凝神，一掌击碎西侧木格花窗）“区区迷烟也想阻我！”'),
      N('呼啸的洛阳夜风顿时倒灌入塔，将暗紫毒烟吹散大半。你纵身跃出九层窗棂，借外墙密檐砖楞纵跃如飞，竟抄近道直扑十三层塔顶！'),
    ],
    onFinishEffects: [openScene('scene_sls09_07', SHAOLIN_SIDE09_QUEST_ID)],
  },

  scene_sls09_07: {
    id: 'scene_sls09_07',
    title: '第七幕 · 十三绝顶',
    subtitle: '齐云密檐舍利古塔 · 十三层塔顶',
    mandatory: true,
    beats: [
      N('十三层绝顶之上寒风猎猎，月轮高悬。巴桑左手挟着金光隐隐的舍利宝函，右手刚将一根浸油牛皮长索甩向寺外古柏，忽听身后风声大作——你已抢先一步跃上塔顶，一掌斩断牛皮飞索！'),
      S(SPEAKER_BASANG, '（霍然转身，眼中闪过一抹惊异）“好俊的轻功！楼下那几个少林武僧被我手下缠住，没想到竟还有你这等年轻高手一路杀上十三层绝顶！”'),
      P('（合十肃立，衣袂翻飞）“阿弥陀佛！此舍利宝函乃东汉释源祖庭镇寺圣物，绝非吐蕃黑教可染指。施主若肯放下宝函，小僧尚可饶你一命！”'),
    ],
    onFinishEffects: [openScene('scene_sls09_08', SHAOLIN_SIDE09_QUEST_ID)],
  },

  scene_sls09_08: {
    id: 'scene_sls09_08',
    title: '第八幕 · 辩法破妄',
    subtitle: '齐云密檐舍利古塔 · 塔顶月色',
    mandatory: true,
    beats: [
      S(SPEAKER_BASANG, '（冷哼一声，将舍利宝函负于背心布囊）“少说大话！佛门讲究缘法，强者居之！我吐蕃密教纵横雪域，岂会怕你们中原这些只知枯坐念经的迂腐和尚？”'),
      P('（朗声喝破）“佛经有云：『若以色见我，以音声求我，是人行邪道，不能见如来。』尔等不修慈悲正觉，反行偷盗劫掠之事，纵夺得百匣舍利，亦不过增长贪嗔痴毒，何谈佛法缘法！”'),
      N('巴桑听得心头一震，旋即恼羞成怒，周身罡气暴涨，手中弯刀嗡鸣作响！'),
    ],
    onFinishEffects: [openScene('scene_sls09_09', SHAOLIN_SIDE09_QUEST_ID)],
  },

  scene_sls09_09: {
    id: 'scene_sls09_09',
    title: '第九幕 · 塔刹风雷',
    subtitle: '齐云密檐舍利古塔 · 绝顶决战前夕',
    mandatory: true,
    beats: [
      S(SPEAKER_BASANG, '“牙尖嘴利的小秃驴！且看你手中拳脚，是不是也像嘴皮子这般利索！吃我一记雪域劈空掌！”'),
      N('十三层塔顶方圆不过两丈，四周皆是临空绝壁，退无可退。你深吸一口清冽夜气，沉肩迎战这位二流上品的吐蕃黑教护法！'),
    ],
    onFinishEffects: [
      { type: 'setFlag', flag: 'sl_side09_basang_ready', value: true },
      openScene('scene_sls09_10', SHAOLIN_SIDE09_QUEST_ID),
    ],
  },

  scene_sls09_10: {
    id: 'scene_sls09_10',
    title: '第十幕 · 绝顶独斗',
    subtitle: '齐云塔十三层绝顶 · 1v1 生死激战巴桑',
    mandatory: true,
    beats: [
      S(SPEAKER_BASANG, '“今日这齐云古塔绝顶，便是你的葬身之地！”'),
      N('弯刀卷寒风，劈空掌震古砖，你与巴桑在月下古塔绝顶展开针锋相对的巅峰交锋！'),
    ],
    choices: [
      {
        id: 'sls09_fight_basang',
        label: '稳立塔顶绝壁，1v1 迎战吐蕃黑教盗宝护法【巴桑（二流上品）】',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: SHAOLIN_SIDE09_QUEST_ID,
            opponent: { kind: 'custom', npc: buildBasang() },
            rule: 'story_trial',
            forbidEscapeReason: '佛骨舍利宝函就在巴桑背上，岂可退缩半步！',
            introText:
              '【绝顶夺函】在白马寺齐云塔十三层绝顶，1v1 迎战吐蕃黑教盗宝护法【巴桑（二流上品）】！',
            onWin: [openScene('scene_sls09_11', SHAOLIN_SIDE09_QUEST_ID)],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast(
                '塔顶风急一时被巴桑刚猛掌风震退半步！稳住心神后可于【齐云密檐舍利古塔】再登绝顶截杀此獠。',
                'warn',
                '舍利迷踪',
              ),
            ],
          },
        ],
      },
    ],
  },

  scene_sls09_11: {
    id: 'scene_sls09_11',
    title: '第十一幕 · 掌定宝函',
    subtitle: '齐云密檐舍利古塔 · 十三层绝顶',
    illustrationUrl: '/assets/quests/sl_s09_pagoda_summit.jpg',
    illustrationCaption: '十三层绝顶 · 月下击败吐蕃黑教护法巴桑，完璧夺回舍利宝函',
    mandatory: true,
    beats: [
      N('数十合鏖战过后，你察觉巴桑连发刚猛劈空掌后气息微浮，当下以虚招诱开其弯刀护门，旋即步走正宫、双掌齐推，一股沛然莫御的佛门纯阳内劲将其震得连退七步，重重撞在塔刹铁柱之上！'),
      N('巴桑口吐鲜血、弯刀脱手坠落塔外，背上布囊应声裂开，七宝舍利金函凌空滑出——你纵身一探，稳稳将宝函揽入怀中，封印丝毫无损！'),
      S(SPEAKER_BASANG, '（靠着塔刹喘息不止，眼神晦暗）“好浑厚的少林正宗内功……我巴桑今日技不如人，栽在释源祖庭，无话可说……”'),
    ],
    onFinishEffects: [openScene('scene_sls09_12', SHAOLIN_SIDE09_QUEST_ID)],
  },

  scene_sls09_12: {
    id: 'scene_sls09_12',
    title: '第十二幕 · 众僧合围',
    subtitle: '齐云密檐舍利古塔 · 塔顶',
    mandatory: true,
    beats: [
      N('此时白马寺警钟响彻洛阳东郊，慧博与虚空率十余名武僧手持火把登上十三层，见你怀抱完好无损的舍利宝函傲立月下，皆不由得长舒一口气。'),
      S('NPC-0377', '（快步上前合十礼赞）“阿弥陀佛！师弟孤身追上十三层绝顶、力挫吐蕃黑教护法，护得千年舍利完璧无瑕，实乃大功一件！虚空，快将巴桑点穴押下，交与洛阳留守司严加看管！”'),
      P('“幸不辱命！地宫此刻尚在修缮，咱们先将宝函恭请至白马大佛宝殿妥善安奉吧。”'),
    ],
    choices: [
      {
        id: 'sls09_to_main',
        label: '护送舍利宝函下塔，前往【白马大佛宝殿】安奉复命',
        tone: 'gold',
        effects: [
          setStep(SHAOLIN_SIDE09_QUEST_ID, 'return_main_hall'),
          toast(
            '已夺回佛骨舍利宝函！请前往【白马寺 · 白马大佛宝殿（ly_bm_main）】安奉复命。',
            'success',
            '舍利迷踪',
          ),
        ],
      },
    ],
  },

  scene_sls09_13: {
    id: 'scene_sls09_13',
    title: '第十三幕 · 宝函归位',
    subtitle: '白马寺 · 白马大佛宝殿',
    mandatory: true,
    beats: [
      N('白马大佛宝殿内梵呗低回，晨钟悠扬。在慧博、虚智、虚空与净云的共同护持下，你双手捧着七宝舍利金函缓步登坛，将其恭敬安奉于大佛莲座之前的紫檀宝龛之内。'),
      S('NPC-0551', '（伤处已敷上金创药，含笑赞道）“经此一役，西域诸派必知我嵩山少林与白马祖庭同气连枝、绝非可欺之辈！”'),
      S('NPC-0377', '“师弟方才于塔顶破斥邪见那番经义之论，连我这达摩院护经僧听了亦觉茅塞顿开。待齐云塔地宫排水石渠修缮完工，我必亲撰碑记，录下师弟护宝之功！”'),
    ],
    onFinishEffects: [openScene('scene_sls09_14', SHAOLIN_SIDE09_QUEST_ID)],
  },

  scene_sls09_14: {
    id: 'scene_sls09_14',
    title: '第十四幕 · 祖庭赞誉',
    subtitle: '白马大佛宝殿',
    mandatory: true,
    beats: [
      S('NPC-0377', '“此战你以纯正佛门武学胜强敌、以深厚经义破邪妄，兼得武道与禅理双重印证。这番宗门嘉奖与护经心得，师弟受之无愧！”'),
      P('（合十稽首）“多谢慧博师兄与诸位同门并肩护法！愿释源祖庭香火长明，河洛永安！”'),
    ],
    choices: [
      {
        id: 'sls09_complete',
        label: '礼拜白马大佛，收下宗门重赏与经义体悟！',
        tone: 'gold',
        effects: [
          { type: 'giveCombatExp', amount: 400, reason: '齐云塔十三层绝顶 1v1 击败吐蕃黑教护法巴桑' },
          { type: 'addSectContribution', amount: 160 },
          { type: 'addArtExp', amount: 120 },
          { type: 'modifySkill', key: '经义', delta: 2 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0377' }, delta: 15 },
          { type: 'modifyRenown', delta: 40, reason: '完成门派差事《齐云古塔 · 舍利迷踪》' },
          { type: 'completeQuest', questId: SHAOLIN_SIDE09_QUEST_ID, outcome: 'completed' },
          toast(
            '【齐云古塔 · 舍利迷踪】圆满完结！经义大进，获宗门贡献 160、武学阅历 120 与实战经验 400！',
            'success',
            '舍利迷踪',
          ),
        ],
      },
    ],
  },
}
