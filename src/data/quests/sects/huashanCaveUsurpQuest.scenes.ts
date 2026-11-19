import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, flag, makeQuestNpc, openScene, setStep, toast } from '../../../engine/quest/dsl'
import { HUASHAN_Q15_QUEST_ID } from './huashanCaveUsurpQuest'

const SPEAKER_SENIOR_DISCIPLE: StorySpeakerSpec = {
  kind: 'custom',
  name: '梁正明 · 同门校剑师兄',
  title: '玉女峰三阶执事师兄',
  factionName: '华山派',
  portraitUrl: '/assets/characters/templates/tpl_huashan_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_huashan_av.jpg',
}

function buildSeniorSparDiscipleNpc(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_HSQ15_SENIOR_DISCIPLE',
    name: '梁正明 · 同门校剑师兄',
    title: '玉女峰 · 朔望校剑主考师兄',
    realm: '一流下品',
    factionId: 'SECT-05',
    factionName: '华山派',
    sectRank: 3,
    sectRankLabel: '真传师兄',
    avatarUrl: '/assets/characters/templates/tpl_huashan_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_huashan_fb.jpg',
    talk: '“请{gender:师弟|师妹}赐教！为兄这便以养吾、希夷守御剑幕会一会你！”',
    stats: { hp: 2260, mp: 1850, agi: 58, res: 48 },
    equipped: {
      weapon: 'WPN-051',
      armor: 'ARM-015',
      shoes: 'BOT-011',
      accessory1: 'ACC-030',
    },
    equippedArts: {
      neigong: 'MA-058',
      qinggong: 'MA-139',
      move1: 'MA-089',
      move2: 'MA-147',
    },
    learnedArts: [
      { artId: 'MA-058', level: 5 },
      { artId: 'MA-139', level: 5 },
      { artId: 'MA-089', level: 5 },
      { artId: 'MA-147', level: 6 },
    ],
  })
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_hsq15_01: {
    id: 'scene_hsq15_01',
    title: '第一幕 · 成王败寇何拘礼',
    subtitle: '思过崖古山洞 · 秘洞古剑刻石室',
    mandatory: true,
    beats: [
      N('{reignYear}子夜寒雨未歇，秘洞古剑刻石室内石门紧掩。你踏过冰冷刺骨的先辈白骨，立于镌满阴狠破招的青苍岩壁之前，眸中幽光闪烁。'),
      P('（冷然低语）“成王败寇，自古皆然，何拘同门外敌？岳沧溟高踞掌门宝座口称仁义，可若无压服全派的雷霆手段，谁又肯真正俯首听命？”'),
    ],
    onFinishEffects: [openScene('scene_hsq15_02', HUASHAN_Q15_QUEST_ID)],
  },

  scene_hsq15_02: {
    id: 'scene_hsq15_02',
    title: '第二幕 · 烛影摇红私拓魔刻',
    subtitle: '思过崖古山洞 · 秘洞古剑刻石室',
    illustrationUrl: '/assets/quests/hs_q15_midnight_rubbing.jpg',
    illustrationCaption: '暗夜私拓 · 烛火摇曳间默记拓印石壁破尽本门诸般武学残招',
    mandatory: true,
    beats: [
      N('你点燃西夏密谍遗落的半截白蜡烛，展开细密绢帛，顺着岩壁上一道道毒辣刻痕逐幅摹画、逐字默背！'),
      N('紫霞真气换气时膻中半息微滞、混元掌收势时曲池空门、落雁希夷变招时腕底死角、乃至太岳三青峰第三剑旧力将竭之隙……全派上下的命门死穴，尽数烙入你脑海深处！'),
    ],
    onFinishEffects: [openScene('scene_hsq15_03', HUASHAN_Q15_QUEST_ID)],
  },

  scene_hsq15_03: {
    id: 'scene_hsq15_03',
    title: '第三幕 · 枯骨怀中搜残卷',
    subtitle: '思过崖古山洞 · 秘洞古剑刻石室',
    mandatory: true,
    beats: [
      N('拓完最后一幅破招图，你踢开墙角一具紧攥断剑的剑宗长老骸骨，忽见其肋骨下压着一只密封铜筒。拧开铜盖，里面竟藏着一卷染血的《夺命连环三仙剑》凶煞手札！'),
      P('“连老天都在帮我！有了这卷剑宗搏命真解与满壁破招相辅相成，便是气剑合流也休想挡我一剑！”'),
    ],
    onFinishEffects: [openScene('scene_hsq15_04', HUASHAN_Q15_QUEST_ID)],
  },

  scene_hsq15_04: {
    id: 'scene_hsq15_04',
    title: '第四幕 · 对骨演剑悟诡锋',
    subtitle: '思过崖古山洞 · 秘洞古剑刻石室',
    mandatory: true,
    beats: [
      N('借着幽幽烛火，你在十四具先辈枯骨之间拔剑疾刺！剑走偏锋、专攻同门气脉逆行之穴，剑风呼啸如鬼哭神嚎，一门阴鸷狠辣的「破岳诡剑」心诀已然大成！'),
    ],
    onFinishEffects: [openScene('scene_hsq15_05', HUASHAN_Q15_QUEST_ID)],
  },

  scene_hsq15_05: {
    id: 'scene_hsq15_05',
    title: '第五幕 · 伪造雷劈重锁洞',
    subtitle: '思过崖古山洞 · 后洞石门外',
    mandatory: true,
    beats: [
      N('天将破晓前，你将私拓绢帛贴身藏妥，退出石室推合万斤石门，更运起内劲震落崖顶一块焦黑巨岩死死堵住洞门，伪造出昨夜天雷劈山震碎铁锁、塌石封洞的假象！'),
      P('“如此一来，这石室秘密普天之下便只剩我一人知晓！”'),
    ],
    onFinishEffects: [openScene('scene_hsq15_06', HUASHAN_Q15_QUEST_ID)],
  },

  scene_hsq15_06: {
    id: 'scene_hsq15_06',
    title: '第六幕 · 诡剑入髓待试锋',
    subtitle: '思过崖古山洞 · 面壁思过寒风剑坪',
    mandatory: true,
    beats: [
      N('十日期满，玉女峰钟声遥遥传来——正是每月朔望同门齐聚东峰紫气迎曦石坪校剑较技的日子。'),
    ],
    choices: [
      {
        id: 'hsq15_c06_learn_and_go',
        label: '暗藏破岳诡剑与残卷，下崖赴东峰石坪参加校剑',
        tone: 'danger',
        effects: [
          { type: 'startQuest', questId: HUASHAN_Q15_QUEST_ID, stepId: 'q15_terrace_spar' },
          { type: 'setFlag', flag: 'hs_poyue_guijian', value: true },
          {
            type: 'branch',
            condition: flag('hs_branch', 'eq', 'qi'),
            thenEffects: [
              { type: 'teachMartialArt', artId: 'MA-068', level: 1 },
              { type: 'addArtExp', artId: 'MA-068', amount: 280 },
              toast('已领悟【破岳诡剑】（克制华山增伤25%），并从枯骨遗卷偷学《夺命连环三仙剑》！', 'warn', '魔刻入心'),
            ],
            elseEffects: [
              { type: 'addArtExp', artId: 'MA-068', amount: 360 },
              toast('已领悟【破岳诡剑】（克制华山增伤25%），《夺命连环三仙剑》造诣暴涨！', 'warn', '魔刻入心'),
            ],
          },
        ],
      },
    ],
  },

  scene_hsq15_07: {
    id: 'scene_hsq15_07',
    title: '第七幕 · 朔望钟鸣聚东峰',
    subtitle: '玉女峰紫霞道观 · 东峰紫气迎曦石坪',
    mandatory: true,
    beats: [
      N('东峰紫气迎曦石坪旌旗猎猎，数十名华山内外门弟子列阵观礼。掌门岳沧溟、宁清羽端坐主席，自长安秘密返山观礼的封不弃则抱剑斜倚在石栏阴影处。'),
    ],
    onFinishEffects: [openScene('scene_hsq15_08', HUASHAN_Q15_QUEST_ID)],
  },

  scene_hsq15_08: {
    id: 'scene_hsq15_08',
    title: '第八幕 · 执事师兄登坪邀战',
    subtitle: '玉女峰紫霞道观 · 东峰紫气迎曦石坪',
    mandatory: true,
    beats: [
      N('你刚步入东峰演武石坪，以稳健守御著称的三阶真传师兄梁正明便含笑越众而出，抱拳向你行礼。'),
      S(SPEAKER_SENIOR_DISCIPLE, '“久闻{gender:师弟|师妹}新近在思过崖迎风磨剑，修为大进！愚兄浸淫《养吾剑法》与《希夷剑法》十载，今日愿借朔望校剑与{gender:师弟|师妹}切磋印证，点到为止！”'),
      P('（眼底掠过一丝不易察觉的寒芒）“梁师兄盛情相邀，小弟恭敬不如从命，请！”'),
    ],
    onFinishEffects: [openScene('scene_hsq15_09', HUASHAN_Q15_QUEST_ID)],
  },

  scene_hsq15_09: {
    id: 'scene_hsq15_09',
    title: '第九幕 · 护体剑幕寻死隙',
    subtitle: '玉女峰紫霞道观 · 东峰紫气迎曦石坪',
    mandatory: true,
    beats: [
      N('梁正明起手一式「希夷抱朴」，长剑画圆织成一道绵密严谨的护体剑幕，在旁人看来滴水不漏；然而在你眼中，他右肋章门穴与手腕神门穴之间，正亮着石壁魔刻所指的三处致命空门！'),
    ],
    choices: [
      {
        id: 'hsq15_c09_spar_senior',
        label: '暗运「破岳诡剑」，一举洞穿梁正明的护体剑幕！',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: HUASHAN_Q15_QUEST_ID,
            opponent: { kind: 'custom', npc: buildSeniorSparDiscipleNpc() },
            rule: 'spar',
            forbidEscapeReason: '满场同门瞩目之下，岂可临阵退场！',
            introText: '【东峰校剑】运使石室私拓的「破岳诡剑」，击溃三阶执事师兄梁正明（一流下品）的护体剑幕！',
            onWin: [openScene('scene_hsq15_10', HUASHAN_Q15_QUEST_ID)],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              openScene('scene_hsq15_09', HUASHAN_Q15_QUEST_ID),
            ],
          },
        ],
      },
    ],
  },

  scene_hsq15_10: {
    id: 'scene_hsq15_10',
    title: '第十幕 · 刁钻一刺惊满座',
    subtitle: '玉女峰紫霞道观 · 东峰紫气迎曦石坪',
    illustrationUrl: '/assets/quests/hs_q15_cruel_spar.jpg',
    illustrationCaption: '诡剑伤同 · 门内校剑刁钻一刺洞穿师兄护体剑幕，满场骇然',
    mandatory: true,
    beats: [
      N('不过寥寥五合，你剑锋忽作诡异折转，不按任何华山堂皇剑理，如毒蛇吐信般斜穿梁正明换气刹那的腕底死角！'),
      N('“噗嗤”一声闷响！梁正明护体剑幕应声崩碎，精钢佩剑脱手飞出，右肩锁骨下已被你剑尖挑开一道深可见骨的血口，整个人仰天狂喷一口鲜血重重摔下石台，全场同门顿时哗然失色！'),
    ],
    onFinishEffects: [openScene('scene_hsq15_11', HUASHAN_Q15_QUEST_ID)],
  },

  scene_hsq15_11: {
    id: 'scene_hsq15_11',
    title: '第十一幕 · 掌门震怒诘来历',
    subtitle: '玉女峰紫霞道观 · 东峰紫气迎曦石坪',
    mandatory: true,
    beats: [
      N('宁清羽飞身掠下石台扶住梁正明封穴止血，岳沧溟则霍然起身，目光如炬盯住你收剑的手势，脸色阴沉如水！'),
      S('NPC-0118', '“住手！方才那一刺专断本门希夷行气死穴，阴鸷霸道、毫无同门留情之意！你在思过崖上到底练了什么邪门路数？！”'),
      S('NPC-0166', '（蹙眉凝视梁正明伤口）“掌门师兄，这一剑的折转角度，怎地如此像三十年前后洞里……”'),
    ],
    onFinishEffects: [openScene('scene_hsq15_12', HUASHAN_Q15_QUEST_ID)],
  },

  scene_hsq15_12: {
    id: 'scene_hsq15_12',
    title: '第十二幕 · 巧言推托天雷塌洞',
    subtitle: '玉女峰紫霞道观 · 东峰紫气迎曦石坪',
    mandatory: true,
    beats: [
      P('（面不改色，躬身拱手）“弟子惶恐！只因前夜思过崖天雷轰塌后崖巨岩，弟子在寒风中观雷电折裂之势偶有所悟，一时收手不及误伤梁师兄，愿奉上伤药赔罪！”'),
      N('岳沧溟狐疑未消，正欲再问，石栏旁的封不弃却冷笑一声开口解围。'),
      S('NPC-0167', '“刀剑无眼，校场争锋本就各凭本事！梁正明自己学艺不精守不住门户，倒怪师弟出剑太快？岳师兄未免太护短了吧！”'),
    ],
    onFinishEffects: [openScene('scene_hsq15_13', HUASHAN_Q15_QUEST_ID)],
  },

  scene_hsq15_13: {
    id: 'scene_hsq15_13',
    title: '第十三幕 · 擦肩暗递密蜡丸',
    subtitle: '玉女峰紫霞道观 · 东峰石阶',
    mandatory: true,
    beats: [
      N('岳沧溟碍于满场弟子不好当众发作，只得拂袖命人抬梁正明下去疗伤，校剑不欢而散。'),
      N('散场下阶之时，封不弃与你擦肩而过，屈指一弹，一枚捏碎外皮的蜡丸悄无声息滑入你袖袋之中！'),
    ],
    onFinishEffects: [openScene('scene_hsq15_14', HUASHAN_Q15_QUEST_ID)],
  },

  scene_hsq15_14: {
    id: 'scene_hsq15_14',
    title: '第十四幕 · 密柬相召长安行',
    subtitle: '玉女峰紫霞道观 · 山门僻静处',
    mandatory: true,
    beats: [
      N('行至无人松林，你捻开袖中字条，上书一行凌厉小字：「石室破招重现人间，速来长安西市行栈后庐，共图大事。阅后即焚。」'),
      P('（指尖内力一吐震碎字条，冷笑一声）“封不弃果然认出了后洞剑路！正好借他之势，铺平我执掌西岳之路！”'),
    ],
    choices: [
      {
        id: 'hsq15_c14_go_changan',
        label: '趁夜下山，赶赴京兆府西市车马行栈密见封不弃',
        tone: 'danger',
        effects: [
          setStep(HUASHAN_Q15_QUEST_ID, 'q15_changan_plot'),
          toast('已获封不弃暗夜密柬！请前往【京兆府 · 西市胡商坊 · 车马行栈】！', 'warn', '寒庐密召'),
        ],
      },
    ],
  },

  scene_hsq15_15: {
    id: 'scene_hsq15_15',
    title: '第十五幕 · 西市寒庐掩重门',
    subtitle: '京兆府 · 西市胡商坊 · 车马行栈后庐',
    mandatory: true,
    beats: [
      N('三更梆响，长安西市车马行栈后院寒庐门窗紧闭。你轻叩三长两短暗记，房门立开，封不弃一把将你拽入屋内，反手插死门闩。'),
      S('NPC-0167', '（双目灼灼发亮，压低嗓音难掩狂喜）“不必瞒我！东峰上你刺穿梁正明那一剑，分明是三十年前思过崖后洞石壁上的『破希夷逆脉式』！你进过那间石室了？！”'),
    ],
    onFinishEffects: [openScene('scene_hsq15_16', HUASHAN_Q15_QUEST_ID)],
  },

  scene_hsq15_16: {
    id: 'scene_hsq15_16',
    title: '第十六幕 · 出示半角震狂风',
    subtitle: '京兆府 · 西市胡商坊 · 车马行栈后庐',
    mandatory: true,
    beats: [
      N('你微微一笑，只将怀中私拓绢帛掀开一角，露出「破紫霞行气七穴」的起手剑图，旋即便即收回怀中。'),
      P('“封师叔慧眼如炬。那夜西夏密谍劈开铁锁，已被弟子一剑灭口，后洞入口亦被弟子以暗机重锁、伪作崩石掩人耳目。如今这世上知晓全套破招之人，唯我一人而已。”'),
      S('NPC-0167', '（倒吸一口凉气，随即仰头低笑出声）“好心计！好手段！连西夏密谍都替你背了黑锅，当真是天赐麟儿！”'),
    ],
    onFinishEffects: [openScene('scene_hsq15_17', HUASHAN_Q15_QUEST_ID)],
  },

  scene_hsq15_17: {
    id: 'scene_hsq15_17',
    title: '第十七幕 · 寒庐密谋执太岳',
    subtitle: '京兆府 · 西市胡商坊 · 车马行栈后庐',
    illustrationUrl: '/assets/quests/hs_q15_secret_plot.jpg',
    illustrationCaption: '寒庐密谋 · 封不弃暗夜召见，彼此各怀野心共谋执掌西岳',
    mandatory: true,
    beats: [
      N('孤灯如豆，将你与封不弃的身影投在斑驳土墙上，宛如两头各怀城府的猛虎。'),
      S('NPC-0167', '“岳沧溟守成三十载，把华山守成了一潭死水！只要将石壁破招参透，待时机成熟执掌西岳权柄，便是岳沧溟的紫霞功与秦烈山的剑也压不住你！”'),
      P('“封师叔莫急。眼下我尚是三阶真传，名分未足；若贸然发难，门下众弟子必不肯服。无论日后以铁腕整肃两脉抑或另立新局，眼下都须先立一件压服全山的大功，名正言顺晋位四阶长老！”'),
    ],
    onFinishEffects: [openScene('scene_hsq15_18', HUASHAN_Q15_QUEST_ID)],
  },

  scene_hsq15_18: {
    id: 'scene_hsq15_18',
    title: '第十八幕 · 欲借外虏立奇功',
    subtitle: '京兆府 · 西市胡商坊 · 车马行栈后庐',
    mandatory: true,
    beats: [
      S('NPC-0167', '（击节称善）“不错！名不正则言不顺！恰好老夫这两日在长安查到，西夏一品堂关中分舵似乎在慈恩寺大雁塔一带秘设据点，正与高沧云那小子顺藤摸瓜。”'),
      S('NPC-0167', '“待老夫摸清西夏番狗老巢，便传讯引你率众来剿！届时你立下护派头功晋升长老，紫霞殿半壁江山便已入你囊中！”'),
    ],
    onFinishEffects: [openScene('scene_hsq15_19', HUASHAN_Q15_QUEST_ID)],
  },

  scene_hsq15_19: {
    id: 'scene_hsq15_19',
    title: '第十九幕 · 击掌暂约隐锋芒',
    subtitle: '京兆府 · 西市胡商坊 · 车马行栈后庐',
    mandatory: true,
    beats: [
      P('“一言为定！在此之前，弟子回山自当韬光养晦，绝不叫旁人察觉秘刻之事。”'),
      N('你与封不弃在昏黄灯火下击掌为约，彼此心中却都清楚：这不过是一场各取所需的权谋同盟。'),
    ],
    onFinishEffects: [openScene('scene_hsq15_20', HUASHAN_Q15_QUEST_ID)],
  },

  scene_hsq15_20: {
    id: 'scene_hsq15_20',
    title: '第二十幕 · 暗流潜涌待惊雷',
    subtitle: '京兆府 · 西市胡商坊 · 夜街',
    mandatory: true,
    beats: [
      N('推开寒庐后门步入长安凄迷夜色，你按了按怀中冰冷的私拓秘卷，抬头望向东方西岳群峰——一场席卷外虏与本门权柄的风暴，已在暗夜中悄然成形。'),
    ],
    choices: [
      {
        id: 'hsq15_c20_complete',
        label: '收拢全身锋芒，秘密返山静候良机',
        tone: 'danger',
        effects: [
          { type: 'setFlag', flag: 'hs_cave', value: 'usurp' },
          { type: 'setFlag', flag: 'hs_poyue_guijian', value: true },
          { type: 'giveSilver', amount: 180, reason: '封不弃密助活动经费与校剑赏银' },
          { type: 'addSectContribution', amount: 110 },
          { type: 'giveCombatExp', amount: 260, reason: '思过崖私拓参悟与东峰校剑破敌' },
          { type: 'modifyRenown', delta: 25, reason: '玉女峰朔望校剑五合败敌威震同门' },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0167' }, delta: 25 },
          { type: 'completeQuest', questId: HUASHAN_Q15_QUEST_ID, outcome: 'usurp' },
          toast(
            '已与封不弃结下夺位密盟！请返回华山静候关中风雷变局！',
            'warn',
            '寒庐定计',
          ),
        ],
      },
    ],
  },
}
