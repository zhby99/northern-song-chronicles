import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, flag, openScene, setStep, toast } from '../../../engine/quest/dsl'
import { HUASHAN_Q22_QUEST_ID } from './huashanMountaintopSummitQuest'

const SPEAKER_DUAN_YANQING: StorySpeakerSpec = { kind: 'npc', npcId: 'NPC-1053' }

const SPEAKER_SUMMIT_HERO: StorySpeakerSpec = {
  kind: 'custom',
  name: '中原观礼名宿',
  title: '关中与中原武林耆宿',
  factionName: '中原武林',
  avatarUrl: '/assets/characters/templates/tpl_greenwood_hero_av.jpg',
  portraitUrl: '/assets/characters/templates/tpl_greenwood_hero_fb.jpg',
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_hsq22_01: {
    id: 'scene_hsq22_01',
    title: '第一幕 · 腊月飞雪封太华',
    subtitle: '玉女峰紫霞道观 · 紫霞正气主殿',
    mandatory: true,
    beats: [
      N('{reignYear}腊月十五，连绵三日三夜的鹅毛瑞雪将西岳华山万仞绝壁裹成一片晶莹琼瑶世界。自风陵荒原一战斩灭拓跋雄以来，华山派威震河朔秦川，声势一时无两。'),
      N('你身披《华山紫霞剑客衫》，腰悬《太岳紫霞长剑》，立于丹墀回廊观雪。{ifFlag:hs_q22_is_qi|体内《紫霞神功（先天太岳卷）》渊深似海，呼出一口白气经久不散|腰间长剑与《独孤九剑》无招剑意浑然一体，方圆三丈落雪自动分流}。'),
      S('NPC-0118', '{ifFlag:hs_q22_is_usurp|（自后山幽谷破例出关，踏雪立于廊下，神色沉凝复杂）“老夫虽已退隐后山不过问前山琐务，但今日乃六十年一甲子重开落雁峰白玉论剑坛之公事，四海豪杰齐至西岳，老夫特来观礼作证，免教外人笑我华山失礼！”|（踏雪缓步走来，神色庄重欣慰）“六十年一甲子。自先祖开坛以来，落雁峰‘华山绝顶论剑’已尘封整整一甲子——今日四海应邀名宿皆已冒雪登山，正是重开白玉论剑坛之吉时！”}'),
    ],
    onFinishEffects: [
      {
        type: 'branch',
        condition: flag('hs_branch', 'eq', 'qi'),
        thenEffects: [{ type: 'setFlag', flag: 'hs_q22_is_qi', value: true }],
        elseEffects: [{ type: 'setFlag', flag: 'hs_q22_is_qi', value: false }],
      },
      {
        type: 'branch',
        condition: flag('hs_ending', 'eq', 'sword_usurp'),
        thenEffects: [{ type: 'setFlag', flag: 'hs_q22_is_usurp', value: true }],
        elseEffects: [{ type: 'setFlag', flag: 'hs_q22_is_usurp', value: false }],
      },
      openScene('scene_hsq22_02', HUASHAN_Q22_QUEST_ID),
    ],
  },

  scene_hsq22_02: {
    id: 'scene_hsq22_02',
    title: '第二幕 · 四海龙虎赴仙巅',
    subtitle: '玉女峰紫霞道观 · 紫霞正气主殿',
    mandatory: true,
    beats: [
      S('NPC-0202', '（呈上名帖禀报）“禀{ifFlag:hs_q22_is_usurp|宗主|掌门}：除关中群豪与少林武当观礼使者外，江南姑苏‘南慕容’慕容复已携家将登临南峰！”'),
      S('NPC-0147', '（虎目精光闪动）“不止慕容复！老夫方才在苍龙岭望见一队吐蕃番僧踏雪如飞，为首之人宝相庄严，分明是吐蕃国师‘大轮明王’鸠摩智！”'),
      S('NPC-0166', '“更有山下弟子飞报，见一名背负酒坛的魁梧豪杰孤身自千尺幢拾级而上，一步三丈，极似丐帮帮主‘北乔峰’！”'),
    ],
    onFinishEffects: [openScene('scene_hsq22_03', HUASHAN_Q22_QUEST_ID)],
  },

  scene_hsq22_03: {
    id: 'scene_hsq22_03',
    title: '第三幕 · 诸老随行壮山威',
    subtitle: '西岳南峰 · 登顶冰阶',
    mandatory: true,
    beats: [
      S('NPC-0167', '“南慕容、北乔峰、吐蕃国师鸠摩智齐至西岳！哈哈哈，{ifFlag:hs_q22_is_usurp|今日便教天下群雄见识我西岳霸剑的雷霆威仪|今日正叫四海英雄一睹我华山剑气归元的绝代风采}！”'),
      P('“凡登我落雁峰者，无论中原巨擘抑或番邦国师，皆以武道堂皇论高下！{ifFlag:hs_q22_is_usurp|既蒙岳前辈出关观礼，便请诸位长老随我同登南峰绝顶|请太上掌门与诸位师叔师伯同登南峰绝顶}！”'),
    ],
    onFinishEffects: [openScene('scene_hsq22_04', HUASHAN_Q22_QUEST_ID)],
  },

  scene_hsq22_04: {
    id: 'scene_hsq22_04',
    title: '第四幕 · 太岳钟鸣启白玉',
    subtitle: '落雁峰山径外',
    mandatory: true,
    beats: [
      N('九响悠远雄浑的太岳景钟冲破漫天风雪，传遍华山五峰百里云海！你率华山全派精英拾级登顶，迈向海拔最高、仰天接日的南峰落雁绝顶！'),
    ],
    choices: [
      {
        id: 'hsq22_ch_open_altar',
        label: '登临【华山绝顶论剑台 · 落雁峰白玉论剑坛】，正式开启甲子华山论剑！',
        tone: 'gold',
        effects: [
          { type: 'startQuest', questId: HUASHAN_Q22_QUEST_ID, stepId: 'open_summit' },
          { type: 'teleportPlayer', regionId: 'tongguan', buildingId: 'tg_summit', spotId: 'tg_sm_altar' },
          openScene('scene_hsq22_05', HUASHAN_Q22_QUEST_ID),
        ],
      },
    ],
  },

  scene_hsq22_05: {
    id: 'scene_hsq22_05',
    title: '第五幕 · 绝顶开坛会群雄',
    subtitle: '华山绝顶论剑台 · 落雁峰白玉论剑坛',
    illustrationUrl: '/assets/quests/hs_q22_snow_summit_open.jpg',
    illustrationCaption: '绝顶开坛 · 大雪封山落雁峰白玉论剑坛重开甲子华山论剑，群雄毕至',
    mandatory: true,
    beats: [
      N('万仞落雁绝顶，脚下便是茫茫翻涌的千里冰云！高达三丈的汉白玉论剑坛四面太岳旌旗猎猎招展，来自大江南北的数百名武林名宿顶风冒雪环立坛下。'),
      N('你独自踏上白玉论剑坛正中，将《太岳紫霞长剑》轻轻按在白玉栏前，清朗声音压过呼啸山风——'),
      P('“今日腊月望日，我西岳华山重开甲子绝顶论剑！刀剑无生死之仇，切磋唯求武道极境——四海同道，哪位愿先登坛赐教？！”'),
    ],
    onFinishEffects: [openScene('scene_hsq22_06', HUASHAN_Q22_QUEST_ID)],
  },

  scene_hsq22_06: {
    id: 'scene_hsq22_06',
    title: '第六幕 · 崖松暗影窥剑意',
    subtitle: '落雁峰侧翼 · 悬崖古松林',
    mandatory: true,
    beats: [
      N('就在你话音回荡云海之际，百丈外一株覆满冰凌的悬崖古松阴影里，一双枯瘦手掌握着细铁双拐悄然探出——正是闻讯潜上华山、妄图伺机报复或搅局的「恶贯满盈」段延庆！'),
      N('然而当他的目光触及白玉坛心渊渟岳峙的你，感受到你周身吞吐天地、比前番更胜数筹的磅礴剑意时，段延庆左肩旧伤忽地一阵钻心抽痛，握拐枯手不由自主一颤！'),
    ],
    onFinishEffects: [openScene('scene_hsq22_07', HUASHAN_Q22_QUEST_ID)],
  },

  scene_hsq22_07: {
    id: 'scene_hsq22_07',
    title: '第七幕 · 恶首知难悄下山',
    subtitle: '落雁峰侧翼 · 悬崖古松林',
    mandatory: true,
    beats: [
      S(SPEAKER_DUAN_YANQING, '“（腹语低喃，眼中掠过深深忌惮）此子气机已与整座西岳连成一气……{ifQuestDone:QST-SECT-05-18|那专破内家命门的《独孤九剑》更是炉火纯青|这等圆满先天紫霞罡气已非寻常一阳指可破}，加之台下群雄毕至，老夫今日若现身，必讨不得半点便宜！”'),
      N('你似有所觉地朝崖松方向淡淡瞥了一眼，目光如冷电穿雪；段延庆心头凛然，当即一言不发点动双拐，悄无声息退入风雪山道下山而去！'),
    ],
    onFinishEffects: [openScene('scene_hsq22_08', HUASHAN_Q22_QUEST_ID)],
  },

  scene_hsq22_08: {
    id: 'scene_hsq22_08',
    title: '第八幕 · 白衣折扇南慕容',
    subtitle: '华山绝顶论剑台 · 落雁峰白玉论剑坛',
    mandatory: true,
    beats: [
      S('NPC-0120', '“哈哈，华山新掌门年纪轻轻便荡平西夏风陵大营，如此盛会，姑苏慕容复岂敢错过！”'),
      N('随着一声清朗傲岸的笑语，一名身穿淡黄轻裘、面如冠玉的翩翩公子足尖在观礼席肩头一点，白衣胜雪飘落白玉坛上，手中折扇潇洒一合——正是名动江南的「南慕容」慕容复！'),
      S(SPEAKER_SUMMIT_HERO, '“是‘以彼之道，还施彼身’的姑苏慕容公子！第一场便是龙虎斗啊！”'),
    ],
    onFinishEffects: [openScene('scene_hsq22_09', HUASHAN_Q22_QUEST_ID)],
  },

  scene_hsq22_09: {
    id: 'scene_hsq22_09',
    title: '第九幕 · 欲借太岳扬燕名',
    subtitle: '华山绝顶论剑台 · 落雁峰白玉论剑坛',
    mandatory: true,
    beats: [
      N('慕容复拱手一礼，眼底深处却藏着掩不住的勃勃野心——他近日在关中收拢豪杰，正欲借击败新任华山掌门之威，一举压倒“北乔峰”的名头！'),
      S('NPC-0120', '“久闻华山剑法奇险峻拔，在下不才，略通百家剑理与家传《斗转星移》。不知掌门敢不敢以本门绝学赐教，让慕容某印证一番‘还施彼身’之妙？”'),
      P('“慕容公子远来是客。只是借力反打之巧技，遇上真正至纯至极的剑道，只怕未必转得动——十合之内，你我见分晓！”'),
    ],
    onFinishEffects: [openScene('scene_hsq22_10', HUASHAN_Q22_QUEST_ID)],
  },

  scene_hsq22_10: {
    id: 'scene_hsq22_10',
    title: '第十幕 · 斗转星移起漩流',
    subtitle: '华山绝顶论剑台 · 落雁峰白玉论剑坛',
    mandatory: true,
    beats: [
      S('NPC-0120', '（俊脸微沉，长剑出鞘挽起一团奇异牵引气旋）“十合破我斗转星移？华山掌门未免太狂了些——请出招！”'),
      N('慕容复剑势一引，周身三尺风雪竟顺着剑尖逆旋流转，只待你一剑刺出便将剑力原封不动反折回来！'),
    ],
    onFinishEffects: [openScene('scene_hsq22_11', HUASHAN_Q22_QUEST_ID)],
  },

  scene_hsq22_11: {
    id: 'scene_hsq22_11',
    title: '第十一幕 · 首战姑苏慕容复',
    subtitle: '华山绝顶论剑台 · 落雁峰白玉论剑坛',
    mandatory: true,
    beats: [
      N('白玉坛上寒光乍起，你在群雄屏息注视下拔出《太岳紫霞长剑》，正面迎向姑苏慕容氏绝学！'),
    ],
    choices: [
      {
        id: 'hsq22_ch_fight_murongfu',
        label: '挥动《太岳紫霞长剑》，十合之内破去慕容复《斗转星移》！',
        tone: 'gold',
        effects: [
          {
            type: 'startCombat',
            questId: HUASHAN_Q22_QUEST_ID,
            opponent: {
              kind: 'npc',
              npcId: 'NPC-0120',
              talkOverride: '“以彼之道，还施彼身——看我转回你的华山剑劲！”',
            },
            rule: 'story_trial',
            lethalOnLose: false,
            introText: '【论剑首战】迎战姑苏「南慕容」慕容复（宗师下品），十合破去其斗转星移！',
            onWin: [
              { type: 'giveCombatExp', amount: 160, reason: '白玉论剑坛首战十合击败南慕容慕容复' },
              openScene('scene_hsq22_12', HUASHAN_Q22_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 85, mpPct: 85 },
              toast('斗转星移借力诡奇，凝神洞穿其挪移枢纽再发一剑！', 'warn', '剑意重凝'),
              openScene('scene_hsq22_11', HUASHAN_Q22_QUEST_ID),
            ],
          },
        ],
      },
    ],
  },

  scene_hsq22_12: {
    id: 'scene_hsq22_12',
    title: '第十二幕 · 十合破燕落长剑',
    subtitle: '华山绝顶论剑台 · 落雁峰白玉论剑坛',
    illustrationUrl: '/assets/quests/hs_q22_break_murongfu.jpg',
    illustrationCaption: '十合破燕 · 白玉坛首战十合破去南慕容斗转星移，震落慕容复长剑',
    mandatory: true,
    beats: [
      N('前七合慕容复连使七般名门剑招试图诱你发力，第八、九合催动《斗转星移》牵引你剑锋偏斜；然而第十合骤至——{ifFlag:hs_q22_is_qi|你催动大成《紫霞神功》，一剑重若西岳泰山堂皇压落，至纯先天紫气远超慕容复所能挪移之极限|你施展《独孤九剑》无招无劲之妙，长剑中途连变三次虚实，教他斗转星移根本无力可借、直刺其手腕空门}！'),
      N('“锵啷——！！”刺耳金属颤音中，斗转星移气旋应声崩碎，慕容复虎口迸裂，手中名剑旋转飞出三丈之外，“当”地跌落在白玉台基积雪之中！'),
    ],
    onFinishEffects: [openScene('scene_hsq22_13', HUASHAN_Q22_QUEST_ID)],
  },

  scene_hsq22_13: {
    id: 'scene_hsq22_13',
    title: '第十三幕 · 群雄轰彩燕公子退',
    subtitle: '华山绝顶论剑台 · 落雁峰白玉论剑坛',
    mandatory: true,
    beats: [
      S(SPEAKER_SUMMIT_HERO, '“好剑法！！果真恰恰十合，便破了姑苏慕容氏的斗转星移！！”'),
      N('满山观礼豪杰爆发出雷鸣般的喝彩！你收剑负手，并未乘势追击，平静道：“慕容公子，承让。”'),
      S('NPC-0120', '（脸色一阵青一阵白，强压胸口翻涌气血拾起长剑，咬牙拱手）“……华山绝学名不虚传，慕容复今日领教了！”'),
    ],
    onFinishEffects: [openScene('scene_hsq22_14', HUASHAN_Q22_QUEST_ID)],
  },

  scene_hsq22_14: {
    id: 'scene_hsq22_14',
    title: '第十四幕 · 风雪骤急梵音响',
    subtitle: '华山绝顶论剑台 · 落雁峰白玉论剑坛',
    mandatory: true,
    beats: [
      N('慕容复羞愤跃下白玉坛之际，天色忽然暗沉，狂风裹挟着鹅毛暴雪席卷落雁峰顶！'),
      N('风吼声中，一声宏亮如洪钟大吕的梵音自南峰雪雾深处滚滚传来：“阿弥陀佛！南慕容既非敌手，小僧自雪域吐蕃远来，愿向华山掌门讨教几招中原高招！”'),
    ],
    onFinishEffects: [
      setStep(HUASHAN_Q22_QUEST_ID, 'bout_jiumozhi'),
      openScene('scene_hsq22_15', HUASHAN_Q22_QUEST_ID),
    ],
  },

  scene_hsq22_15: {
    id: 'scene_hsq22_15',
    title: '第十五幕 · 明黄袈裟踏雪来',
    subtitle: '华山绝顶论剑台 · 落雁峰白玉论剑坛',
    mandatory: true,
    beats: [
      N('但见一道明黄身影踏着漫天飞雪缓步走上白玉阶，足底竟不留半个雪印！来僧面如紫玉、双目精光湛然，两耳垂肩，一身大轮寺国师金丝袈裟在暴雪中纤尘不染——正是吐蕃国师「大轮明王」鸠摩智！'),
      S('NPC-0118', '（在观礼主席神色凝重低语）“吐蕃护国法王鸠摩智！此人佛学武学皆臻宗师中品巅峰，传闻其《火焰刀》能虚空凝劲为刀，切不可大意！”'),
    ],
    onFinishEffects: [openScene('scene_hsq22_16', HUASHAN_Q22_QUEST_ID)],
  },

  scene_hsq22_16: {
    id: 'scene_hsq22_16',
    title: '第十六幕 · 明王合十索剑诀',
    subtitle: '华山绝顶论剑台 · 落雁峰白玉论剑坛',
    mandatory: true,
    beats: [
      S('NPC-0113', '（单掌合十，微笑有礼而语带机锋）“小僧久居青藏雪山，常闻中土五岳之中以西岳剑道最为清奇。方才观施主十合破斗转星移，果真神妙；若施主肯将华山至高剑谱借小僧携回吐蕃研读数月，小僧愿以吐蕃秘传内功相易，岂非美事？”'),
      P('“明王说笑了。华山绝学不借外藩，但明王既然远道登峰，本座手中这柄太岳长剑，倒很愿意领教明王的《火焰刀》！”'),
    ],
    onFinishEffects: [openScene('scene_hsq22_17', HUASHAN_Q22_QUEST_ID)],
  },

  scene_hsq22_17: {
    id: 'scene_hsq22_17',
    title: '第十七幕 · 无相催动火焰威',
    subtitle: '华山绝顶论剑台 · 落雁峰白玉论剑坛',
    mandatory: true,
    beats: [
      S('NPC-0113', '（呵呵一笑，宽大僧袍骤然鼓荡）“既如此，小僧便献丑了！施主留神——”'),
      N('鸠摩智暗中催动道家无上秘学《小无相功》，双掌微错虚劈而出！明明手无寸铁，周遭漫天鹅毛大雪却在刹那间“嗤嗤”蒸腾成滚滚白雾，三道赤红炽烈的无形刀气撕裂风雪破空斩至！'),
    ],
    onFinishEffects: [openScene('scene_hsq22_18', HUASHAN_Q22_QUEST_ID)],
  },

  scene_hsq22_18: {
    id: 'scene_hsq22_18',
    title: '第十八幕 · 暴雪战佛撼刀罡',
    subtitle: '华山绝顶论剑台 · 落雁峰白玉论剑坛',
    illustrationUrl: '/assets/quests/hs_q22_clash_jiumozhi.jpg',
    illustrationCaption: '暴雪战佛 · 漫天风雪硬撼吐蕃国师鸠摩智小无相功与炽烈火焰刀',
    mandatory: true,
    beats: [
      N('冰寒暴雪与炽烈《火焰刀》在白玉坛顶轰然对撞！无相真气幻化出十余道纵横交错的虚空火焰刀影，封死整座白玉坛四面八方；你拔剑长啸，剑光如太华寒冰迎向漫天火海！'),
    ],
    onFinishEffects: [openScene('scene_hsq22_19', HUASHAN_Q22_QUEST_ID)],
  },

  scene_hsq22_19: {
    id: 'scene_hsq22_19',
    title: '第十九幕 · 次战大轮鸠摩智',
    subtitle: '华山绝顶论剑台 · 落雁峰白玉论剑坛',
    mandatory: true,
    beats: [
      S('NPC-0113', '“大轮明王法相——八方火焰刀！！”'),
    ],
    choices: [
      {
        id: 'hsq22_ch_fight_jiumozhi',
        label: '于漫天暴雪中催动华山极境剑意，劈碎鸠摩智《火焰刀》！',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: HUASHAN_Q22_QUEST_ID,
            opponent: {
              kind: 'npc',
              npcId: 'NPC-0113',
              talkOverride: '“阿弥陀佛！施主且接小僧这记小无相催动的火焰刀！”',
            },
            rule: 'story_trial',
            lethalOnLose: false,
            introText: '【论剑次战】暴雪之中迎战吐蕃国师「大轮明王」鸠摩智（宗师中品），破其小无相功与火焰刀！',
            onWin: [
              { type: 'giveCombatExp', amount: 200, reason: '白玉论剑坛暴雪击败吐蕃国师鸠摩智' },
              openScene('scene_hsq22_20', HUASHAN_Q22_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 85, mpPct: 85 },
              toast('火焰刀虚空凝刃变幻莫测，辨明小无相气机根源再战！', 'warn', '剑意重凝'),
              openScene('scene_hsq22_19', HUASHAN_Q22_QUEST_ID),
            ],
          },
        ],
      },
    ],
  },

  scene_hsq22_20: {
    id: 'scene_hsq22_20',
    title: '第二十幕 · 看穿佛衣藏道功',
    subtitle: '华山绝顶论剑台 · 落雁峰白玉论剑坛',
    mandatory: true,
    beats: [
      N('酣斗十余合，鸠摩智掌影翻飞，火焰刀气愈发炽盛，更夹杂着少林七十二绝技般诡异多变的指爪劲力！然而激战之中，你敏锐察觉他招式虽呈佛门宝相，丹田催发之根源却清虚无相、纯属道家门径！'),
      P('“明王外现佛门火焰刀，内里却以道家无相真气强行催动诸般绝技——繁花似锦，终有一隙不谐！”'),
      S('NPC-0113', '（心中大凛）“什么？！他竟一眼看穿了小僧的《小无相功》根底？！”'),
    ],
    onFinishEffects: [openScene('scene_hsq22_21', HUASHAN_Q22_QUEST_ID)],
  },

  scene_hsq22_21: {
    id: 'scene_hsq22_21',
    title: '第二十一幕 · 剑贯冰霄聚神芒',
    subtitle: '华山绝顶论剑台 · 落雁峰白玉论剑坛',
    mandatory: true,
    beats: [
      N('鸠摩智一惊之下双掌合推，催出一道丈许长的赤金巨型火焰刀罡；你深吸一口落雁峰绝顶寒气，{ifFlag:hs_q22_is_qi|先天太岳紫霞化作一道横贯天宇的紫晶剑柱|《独孤九剑》破刀式合破气式化作一线极耀白虹}，迎着赤金刀罡一剑中分劈落！'),
    ],
    onFinishEffects: [openScene('scene_hsq22_22', HUASHAN_Q22_QUEST_ID)],
  },

  scene_hsq22_22: {
    id: 'scene_hsq22_22',
    title: '第二十二幕 · 剑碎刀影退明王',
    subtitle: '华山绝顶论剑台 · 落雁峰白玉论剑坛',
    illustrationUrl: '/assets/quests/hs_q22_repel_jiumozhi.jpg',
    illustrationCaption: '剑碎刀影 · 绝顶剑芒劈散漫天火焰刀气，迫使大轮明王合十退坛',
    mandatory: true,
    beats: [
      N('“轰——铮！！”绝顶剑芒如天河倒泻，摧枯拉朽般将漫天炽烈火焰刀气一剑劈散！余威未绝的一缕清冽剑风擦过鸠摩智右腕，“啪”地削断了他腕上一串菩提佛珠的丝绦！'),
      N('十八颗菩提珠滚落白玉雪阶，鸠摩智双掌微麻连退三步，明黄僧袖猎猎作响，稳住身形后满脸震动地双手合十。'),
      S('NPC-0113', '“善哉，善哉！一剑劈散小僧十成火焰刀，分毫不伤小僧皮肉只断佛珠丝绦……华山掌门剑道通神，小僧心服口服，甘拜下风！”'),
    ],
    onFinishEffects: [openScene('scene_hsq22_23', HUASHAN_Q22_QUEST_ID)],
  },

  scene_hsq22_23: {
    id: 'scene_hsq22_23',
    title: '第二十三幕 · 孤松深处起微澜',
    subtitle: '华山绝顶论剑台 · 落雁峰白玉论剑坛',
    mandatory: true,
    beats: [
      N('连横行西域吐蕃的大轮明王鸠摩智亦当众认输退坛，四海观礼群豪激动得欢声雷动！秦烈山与封不弃抚掌大笑，岳沧溟亦频频颔首。'),
      N('然而就在满场喧腾之际，你耳畔忽地捕捉到东侧百丈外【朝阳孤松观海亭】风雪迷雾之中，传来一声极轻微、却苍老深沉得令人毛骨悚然的冷哼！'),
    ],
    onFinishEffects: [openScene('scene_hsq22_24', HUASHAN_Q22_QUEST_ID)],
  },

  scene_hsq22_24: {
    id: 'scene_hsq22_24',
    title: '第二十四幕 · 独提青锋赴孤松',
    subtitle: '落雁峰东侧 · 冰崖窄径',
    mandatory: true,
    beats: [
      N('那股气机远在方才慕容复之上，甚至比鸠摩智还要渊深老辣三分，分明是有一位隐世绝顶大宗师潜藏在观海亭孤松后暗中窥视！'),
      P('“诸位同道稍候片刻——观海亭畔另有高人驾临，本座去去便回！”'),
    ],
    choices: [
      {
        id: 'hsq22_ch_to_pine',
        label: '提剑独步踏入风雪，前往【华山绝顶论剑台 · 朝阳孤松观海亭】一探究竟！',
        tone: 'danger',
        effects: [
          setStep(HUASHAN_Q22_QUEST_ID, 'bout_murongbo'),
          { type: 'teleportPlayer', regionId: 'tongguan', buildingId: 'tg_summit', spotId: 'tg_sm_pine' },
          openScene('scene_hsq22_25', HUASHAN_Q22_QUEST_ID),
        ],
      },
    ],
  },

  scene_hsq22_25: {
    id: 'scene_hsq22_25',
    title: '第二十五幕 · 风雪孤松立老僧',
    subtitle: '华山绝顶论剑台 · 朝阳孤松观海亭',
    mandatory: true,
    beats: [
      N('朝阳孤松观海亭四周白雾茫茫，远离主坛喧嚣。亭外万丈悬崖边，一名身穿寻常灰布僧衣、面容枯槁蜡黄的老僧正背负双手，静静望着云海之下慕容复黯然离席的背影。'),
      P('“大师身披少林灰衣，目光却始终系在姑苏慕容公子身上。既然上了我西岳绝顶，何不登白玉坛堂堂一叙，反在孤松风雪间藏头露尾？”'),
    ],
    onFinishEffects: [openScene('scene_hsq22_26', HUASHAN_Q22_QUEST_ID)],
  },

  scene_hsq22_26: {
    id: 'scene_hsq22_26',
    title: '第二十六幕 · 潜龙隐忍欲试深',
    subtitle: '华山绝顶论剑台 · 朝阳孤松观海亭',
    mandatory: true,
    beats: [
      N('灰衣老僧——假死潜伏数十载的姑苏慕容氏真正家主【慕容博】缓缓转过身来，浑浊老眼中陡然射出两道迫人寒芒！'),
      S('NPC-0104', '“好敏锐的灵觉！老衲不过山野闲僧，见华山新掌门十合折辱姑苏少年、又一剑劈散吐蕃火焰刀，心中好奇：你这身功夫究竟只够欺负后生晚辈，还是当真配坐镇中原武林半壁江山？”'),
      P('“大师想替晚辈找回场子，尽管出手一试便知！”'),
    ],
    onFinishEffects: [openScene('scene_hsq22_27', HUASHAN_Q22_QUEST_ID)],
  },

  scene_hsq22_27: {
    id: 'scene_hsq22_27',
    title: '第二十七幕 · 无形无迹参合指',
    subtitle: '华山绝顶论剑台 · 朝阳孤松观海亭',
    mandatory: true,
    beats: [
      N('慕容博不欲暴露真实身份，一言既毕，枯瘦右手在宽大灰袖中悄然食中二指一曲一弹——姑苏慕容氏压箱底的无上绝学《参合指》混入呼啸风雪，无声无息直透你胸前玉堂大穴！'),
      P('“好精纯的参合指力！原来是燕子坞的老前辈当面——接我一剑！！”'),
    ],
    onFinishEffects: [openScene('scene_hsq22_28', HUASHAN_Q22_QUEST_ID)],
  },

  scene_hsq22_28: {
    id: 'scene_hsq22_28',
    title: '第二十八幕 · 三战灰衣慕容博',
    subtitle: '华山绝顶论剑台 · 朝阳孤松观海亭',
    mandatory: true,
    beats: [
      N('风雪孤松之下，宗师上品的《参合指》与《斗转星移》化境倾力压来，凶险更胜白玉坛前两战！'),
    ],
    choices: [
      {
        id: 'hsq22_ch_fight_murongbo',
        label: '人剑合一催动巅峰剑意，正面击退灰衣老僧慕容博！',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: HUASHAN_Q22_QUEST_ID,
            opponent: {
              kind: 'npc',
              npcId: 'NPC-0104',
              talkOverride: '“能认出老衲指路，算你有几分见识——且看你接得下几记参合劲！”',
            },
            rule: 'story_trial',
            lethalOnLose: false,
            introText: '【孤松暗战】迎击潜藏试探的灰衣老僧慕容博（宗师上品），以绝顶剑意逼退其参合神指！',
            onWin: [
              { type: 'giveCombatExp', amount: 240, reason: '朝阳孤松亭正面一剑逼退宗师上品慕容博' },
              openScene('scene_hsq22_29', HUASHAN_Q22_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 85, mpPct: 85 },
              toast('参合指无形透骨、斗转星移已臻化境，全力凝聚绝顶剑意再破之！', 'warn', '剑心极境'),
              openScene('scene_hsq22_28', HUASHAN_Q22_QUEST_ID),
            ],
          },
        ],
      },
    ],
  },

  scene_hsq22_29: {
    id: 'scene_hsq22_29',
    title: '第二十九幕 · 一剑惊老裂灰袖',
    subtitle: '华山绝顶论剑台 · 朝阳孤松观海亭',
    illustrationUrl: '/assets/quests/hs_q22_murongbo_probe.jpg',
    illustrationCaption: '一剑惊老 · 灰衣老僧慕容博暗施参合指试探，被凌厉剑意一剑逼退',
    mandatory: true,
    beats: [
      N('参合指风凌厉破空，你双目寒星暴涨，《太岳紫霞长剑》化作一道凝练至极的匹练惊虹——{ifFlag:hs_q22_is_qi|先天太岳紫气凝于一线剑尖，正面硬生生切开参合指劲|《独孤九剑》破气式逆溯指风来路，一剑反刺其指力源头少泽穴}！'),
      N('“嗤啦——！！”指剑相交爆出一团刺目气浪，整株百年孤松积雪轰然震落！宗师上品的慕容博竟觉指端如触烧红玄铁，身形剧震向后连退三步，右首灰布僧袖被凌厉剑意划开一道三寸裂口！'),
    ],
    onFinishEffects: [openScene('scene_hsq22_30', HUASHAN_Q22_QUEST_ID)],
  },

  scene_hsq22_30: {
    id: 'scene_hsq22_30',
    title: '第三十幕 · 燕山潜龙敛锋遁',
    subtitle: '华山绝顶论剑台 · 朝阳孤松观海亭',
    mandatory: true,
    beats: [
      N('慕容博低头看了一眼裂开的灰布僧袖，枯槁面皮微微抽动，瞳孔深处掀起惊涛骇浪！'),
      S('NPC-0104', '“（心中凛然暗道）复儿败在此人手下，非战之罪也！想不到如今西岳华山竟出了这等震古烁今的绝世剑主……老夫大燕复国大计未成之前，断不可轻招华山之敌！”'),
      S('NPC-0104', '“后生可畏，西岳果藏真龙！老衲告辞了！”'),
    ],
    onFinishEffects: [openScene('scene_hsq22_31', HUASHAN_Q22_QUEST_ID)],
  },

  scene_hsq22_31: {
    id: 'scene_hsq22_31',
    title: '第三十一幕 · 落雁长笑震寒云',
    subtitle: '朝阳孤松观海亭外',
    mandatory: true,
    beats: [
      N('灰衣老僧身形一晃，如苍鹰般借着漫天暴雪掠下绝壁，瞬息远去。你并未深追，正欲拭去剑上霜雪，忽听落雁峰白玉主坛方向传来一声震得群峰积雪簌簌作响的豪迈长笑——'),
      S('NPC-0110', '“哈哈哈！！好一座奇险冠天下的西岳华山！丐帮乔峰来迟一步，特携关中烈酒两坛，上落雁峰讨华山掌门一杯水酒喝！！”'),
    ],
    onFinishEffects: [openScene('scene_hsq22_32', HUASHAN_Q22_QUEST_ID)],
  },

  scene_hsq22_32: {
    id: 'scene_hsq22_32',
    title: '第三十二幕 · 天下第一豪杰至',
    subtitle: '落雁峰冰阶',
    mandatory: true,
    beats: [
      P('“北乔峰终于到了！今日华山论剑，唯有与这位盖世豪杰痛快一战，方不算虚开白玉坛！”'),
    ],
    choices: [
      {
        id: 'hsq22_ch_return_altar',
        label: '大步重返【华山绝顶论剑台 · 落雁峰白玉论剑坛】，迎会北乔峰！',
        tone: 'gold',
        effects: [
          setStep(HUASHAN_Q22_QUEST_ID, 'bout_qiaofeng'),
          { type: 'teleportPlayer', regionId: 'tongguan', buildingId: 'tg_summit', spotId: 'tg_sm_altar' },
          openScene('scene_hsq22_33', HUASHAN_Q22_QUEST_ID),
        ],
      },
    ],
  },

  scene_hsq22_33: {
    id: 'scene_hsq22_33',
    title: '第三十三幕 · 魁伟英姿北乔峰',
    subtitle: '华山绝顶论剑台 · 落雁峰白玉论剑坛',
    mandatory: true,
    beats: [
      N('你刚踏回白玉论剑坛，只见一名三十来岁、浓眉大眼、高鼻阔口的魁梧大汉身穿灰色旧布袍，冒着漫天大雪大步登坛！他敞着衣襟浑不畏寒，左右双手各提一坛十斤装的关中西凤陈酿，顾盼之间自有一股睥睨天下的英雄气概！'),
      S(SPEAKER_SUMMIT_HERO, '“是丐帮乔帮主！‘北乔峰，南慕容’，乔帮主亲登白玉坛了！！”'),
    ],
    onFinishEffects: [openScene('scene_hsq22_34', HUASHAN_Q22_QUEST_ID)],
  },

  scene_hsq22_34: {
    id: 'scene_hsq22_34',
    title: '第三十四幕 · 家国同心英雄惜',
    subtitle: '华山绝顶论剑台 · 落雁峰白玉论剑坛',
    mandatory: true,
    beats: [
      S('NPC-0110', '（目光如电上下打量你一番，朗声大笑抱拳）“痛快！乔某北抗契丹、西防夏虏，前些日子听说华山新掌门星夜渡河，一举砍了西夏一品堂主帅拓跋雄的脑袋、烧光百车军械，当真替咱们西北边关百姓出了口恶气！”'),
      P('“乔帮主率丐帮儿郎在河北雁门屡挫辽军耳目，侠名早已如雷贯耳。今日大雪封山，乔帮主肯赏光登顶，实乃我西岳蓬荜生辉！”'),
    ],
    onFinishEffects: [openScene('scene_hsq22_35', HUASHAN_Q22_QUEST_ID)],
  },

  scene_hsq22_35: {
    id: 'scene_hsq22_35',
    title: '第三十五幕 · 英雄邀战摔巨碗',
    subtitle: '华山绝顶论剑台 · 落雁峰白玉论剑坛',
    illustrationUrl: '/assets/quests/hs_q22_qiaofeng_toast.jpg',
    illustrationCaption: '英雄邀战 · 北乔峰踏雪登峰摔碗痛饮，豪气干云邀印证武道极境',
    mandatory: true,
    beats: [
      N('乔峰哈哈一笑，一掌拍开两坛烈酒泥封，浓郁酒香瞬间弥漫风雪绝顶！他取出两只粗瓷大碗斟满烈酒，一碗凌空平推飞送到你面前。'),
      S('NPC-0110', '“如此英雄，当浮三大白！乔某平生最好结交天下豪杰，更仰慕至高武学——喝干这三碗烈酒，请华山掌门展尽平生绝技，与乔某在这落雁绝顶痛痛快快印证二十合武道极境，如何？！”'),
      N('你豪兴勃发，接碗仰首连饮三碗烈酒，胸中热血沸腾，与乔峰同时扬手——“啪！！”两只粗瓷大碗在白玉石阶上摔得粉碎！'),
    ],
    onFinishEffects: [openScene('scene_hsq22_36', HUASHAN_Q22_QUEST_ID)],
  },

  scene_hsq22_36: {
    id: 'scene_hsq22_36',
    title: '第三十六幕 · 亢龙起势风云变',
    subtitle: '华山绝顶论剑台 · 落雁峰白玉论剑坛',
    mandatory: true,
    beats: [
      P('“好酒！！乔帮主请——今日我便以华山绝巅之剑，领教天下第一阳刚掌法《降龙十八掌》！”'),
      S('NPC-0110', '“来得好！！看掌——亢龙有悔！！”'),
      N('乔峰右腿微屈、双掌平推而出，刹那间仿佛真有一条苍穹金龙自九天风雪中昂首咆哮，排山倒海的刚猛掌力震得整座落雁峰都在颤抖！'),
    ],
    onFinishEffects: [openScene('scene_hsq22_37', HUASHAN_Q22_QUEST_ID)],
  },

  scene_hsq22_37: {
    id: 'scene_hsq22_37',
    title: '第三十七幕 · 终战北乔峰二十合',
    subtitle: '华山绝顶论剑台 · 落雁峰白玉论剑坛',
    mandatory: true,
    beats: [
      N('四海群豪尽皆退至坛下屏息仰望，当世最刚猛无俦的《降龙十八掌》与你登峰造极的西岳剑道正面轰然相撞！'),
    ],
    choices: [
      {
        id: 'hsq22_ch_fight_qiaofeng',
        label: '倾尽毕生武学修为，与北乔峰《降龙十八掌》巅峰激战二十合！',
        tone: 'gold',
        effects: [
          {
            type: 'startCombat',
            questId: HUASHAN_Q22_QUEST_ID,
            opponent: {
              kind: 'npc',
              npcId: 'NPC-0110',
              talkOverride: '“哈哈哈！好凌厉的剑意，再接乔某一招飞龙在天！！”',
            },
            rule: 'story_trial',
            lethalOnLose: false,
            introText: '【华山论剑终极战】与丐帮帮主「北乔峰」乔峰（宗师中品）于落雁绝顶印证二十合武道极境！',
            onWin: [
              { type: 'giveCombatExp', amount: 300, reason: '落雁峰白玉坛与北乔峰巅峰论剑二十合' },
              openScene('scene_hsq22_38', HUASHAN_Q22_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 90, mpPct: 90 },
              toast('降龙十八掌刚猛绝伦愈战愈勇，提振全部剑心气魄再与乔帮主战满二十合！', 'warn', '极境争锋'),
              openScene('scene_hsq22_37', HUASHAN_Q22_QUEST_ID),
            ],
          },
        ],
      },
    ],
  },

  scene_hsq22_38: {
    id: 'scene_hsq22_38',
    title: '第三十八幕 · 剑啸亢龙裂九霄',
    subtitle: '华山绝顶论剑台 · 落雁峰白玉论剑坛',
    illustrationUrl: '/assets/quests/hs_q22_dragon_vs_sword.jpg',
    illustrationCaption: '剑啸亢龙 · 降龙十八掌金龙虚影与华山至高剑意激荡落雁云霄二十合',
    mandatory: true,
    beats: [
      N('旷古绝伦的二十合巅峰对决！乔峰越战越勇，“亢龙有悔”、“飞龙在天”、“见龙在田”、“神龙摆尾”一掌快似一掌、一掌烈过一掌，金龙虚影伴随震天龙吟席卷白玉高坛！'),
      N('你亦心无旁骛，将毕生剑道推向极境——{ifFlag:hs_q22_is_qi|《紫霞神功（先天太岳卷）》化作浩瀚紫日，太岳长剑重剑无锋与刚猛降龙掌力硬撼硬拼而不落下风|《独孤九剑》无招剑芒化作九天惊电，于十八条咆哮金龙的毫厘空隙间穿梭游走、剑啸冲霄}！'),
    ],
    onFinishEffects: [openScene('scene_hsq22_39', HUASHAN_Q22_QUEST_ID)],
  },

  scene_hsq22_39: {
    id: 'scene_hsq22_39',
    title: '第三十九幕 · 气冲寒雾日破云',
    subtitle: '华山绝顶论剑台 · 落雁峰白玉论剑坛',
    mandatory: true,
    beats: [
      N('“第二十合——接剑 / 看掌！！”两人同时一声长啸，剑罡与掌劲在白玉论剑坛正心轰然交击！'),
      N('“轰隆——！！”一圈肉眼可见的磅礴白色气浪向四面八方横推百丈，竟硬生生将笼罩落雁峰顶三日三夜的漫天铅灰雪云冲开一道千丈裂口！耀眼夺目的冬日金阳自云隙倾泻而下，照亮了整座巍峨西岳！'),
    ],
    onFinishEffects: [openScene('scene_hsq22_40', HUASHAN_Q22_QUEST_ID)],
  },

  scene_hsq22_40: {
    id: 'scene_hsq22_40',
    title: '第四十幕 · 双雄收势仰天笑',
    subtitle: '华山绝顶论剑台 · 落雁峰白玉论剑坛',
    mandatory: true,
    beats: [
      N('金光万道之中，你收剑入鞘，乔峰撤掌卓立。白玉坛面留下一道寸许深的清亮剑痕与一只清晰的雄浑掌印，不多不少，恰在坛心分界之处并列！'),
      N('两人衣衫猎猎，相视一怔，旋即同时抚掌仰天大笑，笑声豪迈畅快，直震得五峰回音不绝！'),
    ],
    onFinishEffects: [openScene('scene_hsq22_41', HUASHAN_Q22_QUEST_ID)],
  },

  scene_hsq22_41: {
    id: 'scene_hsq22_41',
    title: '第四十一幕 · 落雁知己订金兰',
    subtitle: '华山绝顶论剑台 · 落雁峰白玉论剑坛',
    mandatory: true,
    beats: [
      S('NPC-0110', '“痛快，当真痛快之极！！乔某自出道以来，历经大小数百战，从未像今日在落雁峰顶打得这般酣畅淋漓！{ifFlag:hs_q22_is_qi|你的先天紫霞醇厚绵长，竟能正面硬接我二十招降龙掌力|你的无招神剑妙到毫巅，连我的降龙十八掌都奈何不得你半分}！”'),
      S('NPC-0110', '“华山掌门若不嫌乔某是个粗豪叫化，今日苍天白雪为证、西岳五峰为凭，你我结为异姓生死兄弟，日后共护中原山河，如何？！”'),
      P('“能与乔大哥义结金兰，固所愿也，不敢请耳！弟在此拜见乔大哥！”'),
    ],
    onFinishEffects: [openScene('scene_hsq22_42', HUASHAN_Q22_QUEST_ID)],
  },

  scene_hsq22_42: {
    id: 'scene_hsq22_42',
    title: '第四十二幕 · 万剑齐鸣尊绝巅',
    subtitle: '华山绝顶论剑台 · 落雁峰白玉论剑坛',
    illustrationUrl: '/assets/quests/hs_q22_myriad_swords_roar.jpg',
    illustrationCaption: '万剑齐鸣 · 与乔峰抚掌痛饮结义，西岳华山登顶天下第一剑派绝巅',
    mandatory: true,
    beats: [
      N('乔峰大笑着拎起坛畔余下的半坛烈酒与你对坛痛饮！坛下四海观礼群豪与漫山遍野的华山弟子心潮澎湃，不知是谁先拔剑出鞘半寸，刹那间——'),
      N('“铮——铮铮铮——！！”成百上千柄佩剑在阳光雪峰之下同时铮然齐鸣，万剑归宗之音如海啸龙吟响彻八百里秦川！'),
      S(SPEAKER_SUMMIT_HERO, '“十合破南慕容，暴雪退大轮明王，二十合平分秋色战北乔峰——西岳华山，当为今日天下第一剑派！！”'),
    ],
    onFinishEffects: [openScene('scene_hsq22_43', HUASHAN_Q22_QUEST_ID)],
  },

  scene_hsq22_43: {
    id: 'scene_hsq22_43',
    title: '第四十三幕 · 太岳诸老泪满襟',
    subtitle: '华山绝顶论剑台 · 落雁峰白玉论剑坛',
    mandatory: true,
    beats: [
      N('岳沧溟、秦烈山、宁清羽、封不弃、高沧云五人并肩登上白玉坛，望着万剑朝拜的旷世盛景，几位历经半生风雨的华山宿老无不热泪盈眶！'),
      S('NPC-0118', '“天下第一剑派……列祖列宗在上，我西岳华山三百年夙愿，终于在今日落雁峰巅圆满了！”'),
      S('NPC-0167', '“哈哈哈！有咱们掌门坐镇太华，今后百年之内，天下论剑谁敢不仰望西岳鼻息！”'),
    ],
    onFinishEffects: [openScene('scene_hsq22_44', HUASHAN_Q22_QUEST_ID)],
  },

  scene_hsq22_44: {
    id: 'scene_hsq22_44',
    title: '第四十四幕 · 群雄共奉绝顶号',
    subtitle: '华山绝顶论剑台 · 落雁峰白玉论剑坛',
    mandatory: true,
    beats: [
      S('NPC-0110', '（重重一拍你的肩头，朗声向台下群豪道）“诸位武林同道！今日甲子华山论剑，乔某与天下英雄共作见证——依我这位义弟一身惊天动地的武学造诣，当奉上西岳至高尊号，传颂江湖！”'),
      N('万众欢呼声中，四海群雄依你武道正脉齐声共尊——{ifFlag:hs_q22_is_qi|紫气东来、道冠乾坤，尊号「太岳真君」|九剑凌霄、无招破万法，尊号「西岳剑神」}！'),
    ],
    onFinishEffects: [openScene('scene_hsq22_45', HUASHAN_Q22_QUEST_ID)],
  },

  scene_hsq22_45: {
    id: 'scene_hsq22_45',
    title: '第四十五幕 · 云海千秋剑道长',
    subtitle: '华山绝顶论剑台 · 落雁峰白玉论剑坛',
    mandatory: true,
    beats: [
      N('{reignYear}冬雪初霁，万里云海在落雁峰脚下奔涌如银涛，九曲黄河如金带横卧秦晋大地。'),
      N('自长安城外秋雨茶棚接过那枚小小玄铁剑令，至今日白玉坛上群雄俯首、万剑齐鸣——属于你的西岳华山绝代传奇，已镌刻在太华万仞绝壁之巅，与日月同辉，共山河不朽！'),
    ],
    choices: [
      {
        id: 'hsq22_ch_complete_summit',
        label: '按剑立于西岳绝巅，领受天下共尊之无上名号！（华山全线大圆满）',
        tone: 'gold',
        effects: [
          {
            type: 'branch',
            condition: flag('hs_branch', 'eq', 'qi'),
            thenEffects: [{ type: 'setFlag', flag: 'hs_summit_title', value: '太岳真君' }],
            elseEffects: [{ type: 'setFlag', flag: 'hs_summit_title', value: '西岳剑神' }],
          },
          { type: 'giveSilver', amount: 600, reason: '甲子华山绝顶论剑四海贺仪' },
          { type: 'addSectContribution', amount: 500 },
          { type: 'giveCombatExp', amount: 800, reason: '落雁峰连战慕容复、鸠摩智、慕容博、乔峰证道绝巅' },
          { type: 'modifyChivalry', delta: 50, reason: '与北乔峰绝顶结义，共倡护国安民侠道' },
          { type: 'modifyRenown', delta: 150, reason: '华山绝顶论剑魁首，西岳荣登天下第一剑派' },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0110' }, delta: 35 },
          { type: 'modifySkill', key: '诗词', delta: 1 },
          { type: 'completeQuest', questId: HUASHAN_Q22_QUEST_ID, outcome: 'huashan_summit_supreme' },
          toast('圆满完结终章《西岳绝顶 · 华山论剑》！已解锁专属战斗尊号旌旗！', 'success', '华山论剑'),
        ],
      },
    ],
  },
}
