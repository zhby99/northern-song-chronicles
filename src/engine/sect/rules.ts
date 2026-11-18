import { SECT_SYSTEMS_DB } from '../../data/gameDb'
import type { PlayerSectState } from '../../types/game'

export type SectPromotionRuleKind =
  | 'minor_or_second_tier'
  | 'dao_sword_tournament'
  | 'shaolin_zen'
  | 'gaibang_favor'
  | 'kaifeng_cases'
  | 'imperial_guard_merit'
  | 'xingxiu_duel'
  | 'first_tier_pending'

export interface BespokeSectEntryGuide {
  requirementSummary: string
  buildBlockedReason: (ctx: { silver: number; sectState: PlayerSectState }) => string
}

export interface SectRuleConfig {
  sectId: string
  monthlyStipends?: readonly number[]
  stipendTitle?: string
  payInitialStipendOnJoin?: boolean
  starterGearGifts: readonly string[]
  isDlcLocked?: boolean
  isDaoSwordTournamentSect?: boolean
  promotionRuleKind?: SectPromotionRuleKind
  blocksHighTierForLayDisciple?: boolean
  supportsScriptureCopying?: boolean
  defaultDiscipleTypeOnJoin?: 'lay' | 'monk'
  joinIdentitySuffix?: string
  resetsMonasticIdentityOnLeave?: boolean
  canReceiveLeaderTask?: boolean
  entryQuestId?: string
  autoCompleteEntryQuestOnJoin?: boolean
  bespokeEntryGuide?: BespokeSectEntryGuide
  hasExclusiveMartialArts?: boolean
  semiAnnualDutyKind?: 'liao_spy' | 'kaifeng_warrant'
  leaveTriggersLiaoSuspicion?: boolean
  buildLeaveMessage?: (factionName: string, rankLabel?: string) => string
}

const DLC_LOCKED_IDS = [
  'ORG-08',
  'SECT-09',
  'SECT-10',
  'SECT-12',
  'SECT-20',
  'SECT-31',
  'SECT-32',
] as const

export const DAO_SWORD_SECT_ID_LIST = [
  'SECT-03', // 五台山清凉寺
  'SECT-05', // 华山派
  'SECT-06', // 泰山派
  'SECT-07', // 峨眉派
  'SECT-08', // 真武道宗
  'SECT-11', // 终南隐宗
  'SECT-13', // 蜀中唐门
  'SECT-14', // 青城派
  'SECT-15', // 铁掌帮
] as const

const BASE_SECT_RULES: Record<string, Omit<SectRuleConfig, 'sectId' | 'starterGearGifts'>> = {
  'SECT-01': {
    promotionRuleKind: 'shaolin_zen',
    blocksHighTierForLayDisciple: true,
    supportsScriptureCopying: true,
    defaultDiscipleTypeOnJoin: 'lay',
    joinIdentitySuffix: '（俗家弟子）',
    resetsMonasticIdentityOnLeave: true,
    entryQuestId: 'QST-SECT-01-ENTRY',
    autoCompleteEntryQuestOnJoin: true,
  },
  'SECT-02': {
    promotionRuleKind: 'gaibang_favor',
    entryQuestId: 'QST-SECT-02-ENTRY',
    autoCompleteEntryQuestOnJoin: true,
    bespokeEntryGuide: {
      requirementSummary:
        '随身纹银 ≤ 3 两时步入任一中原州府（或直接前往洛阳【杏子林总舵】寻接引长老）触发《青囊乞骨 · 杏林受袋》八幕长卷：于长街领悟丐帮传信耳目门道后持青竹暗牌赴洛阳杏子林，经马大元沙场试骨、汪剑通飞鸽问心，在白世镜执刀立誓与帮主乔峰严守家法下依规受袋入门',
      buildBlockedReason: ({ silver }) =>
        silver <= 3
          ? '少侠当前纹银 ≤ 3 两，步入中原州府长街（或直接前往洛阳杏子林寻乔峰/马大元/宋奚长）即可开启《青囊乞骨 · 杏林受袋》！'
          : `丐帮入门需经历市井讨饭与杏林试骨之礼——可前往洛阳【杏子林总舵】寻马大元/宋奚长/乔峰叩问门路，或在随身纹银 ≤ 3 两（当前 ${silver} 两）时步入中原州府自动触发《青囊乞骨 · 杏林受袋》！`,
    },
  },
  'SECT-03': {
    isDaoSwordTournamentSect: true,
    promotionRuleKind: 'dao_sword_tournament',
    defaultDiscipleTypeOnJoin: 'monk',
    joinIdentitySuffix: '（出家僧众）',
    resetsMonasticIdentityOnLeave: true,
    entryQuestId: 'QST-SECT-03-ENTRY',
    autoCompleteEntryQuestOnJoin: true,
    bespokeEntryGuide: {
      requirementSummary:
        '无须武功根基：前往【五台山清凉寺 · 清凉寺大雄主殿】向知客首座智猛投山门开启《清凉残雪 · 雁门梵钟》二十幕长卷，历慈济院护孤、演武试木杆及驰援雁门关破辽探后，由方丈道清亲执金刀剃度赐明字辈法号（明觉/明岳/明悲）并传授《五郎八卦棍》与《清凉禅定吐纳法》（常山枪派持《常山·定州联合举荐信》亦可削发投寺）',
      buildBlockedReason: () =>
        '请前往【五台山清凉寺 · 清凉寺大雄主殿】向知客首座【智猛】投山门（点击金色【叩门投寺】选项），完成《清凉残雪 · 雁门梵钟》试心与雁门护关历练后，由道清方丈亲主持剃度受戒！',
    },
  },
  'SECT-04': {
    promotionRuleKind: 'shaolin_zen',
    blocksHighTierForLayDisciple: true,
    supportsScriptureCopying: true,
    defaultDiscipleTypeOnJoin: 'lay',
    joinIdentitySuffix: '（护寺俗家）',
    resetsMonasticIdentityOnLeave: true,
    entryQuestId: 'QST-SECT-04-ENTRY',
    autoCompleteEntryQuestOnJoin: true,
    bespokeEntryGuide: {
      requirementSummary:
        '前往泉州府【刺桐港万国番坊】或【开元寺东西双塔】结识小沙弥戒藏与戒律首座元觉（或向南少林僧众求赐试缘），历经《刺桐风起 · 铁桥问禅》二十幕挑水筑基、雨夜护港与百杰木人巷大考后，于九莲大雄宝殿向元苦方丈奉茶择定僧俗衣钵（择清修武僧落发赐法号「弘毅」并换少林佛子立绘、解锁地阶功法；择护寺俗家则地阶功法永不开放）',
      buildBlockedReason: () =>
        '请点击与本寺僧众交互中的金色【铁桥问禅 / 叩拜九莲山门】剧情选项（或赴泉州府 · 刺桐港万国番坊），经历《刺桐风起 · 铁桥问禅》木人巷考校后向元苦方丈奉茶入门！',
    },
  },
  'SECT-05': {
    isDaoSwordTournamentSect: true,
    promotionRuleKind: 'dao_sword_tournament',
    entryQuestId: 'QST-SECT-05-ENTRY',
    autoCompleteEntryQuestOnJoin: true,
    bespokeEntryGuide: {
      requirementSummary:
        '须从未加入过任何门派，且未学过任何良品及良品以上武学！前往【京兆府（长安）】秋雨茶棚遇华山宿老【封不弃】验明身家开启十五幕《西岳问道 · 剑气淬锋》：历潼关退匪、攀三险救坠崖挑山工、玉女峰授《华山基础心法》与《华山剑法（入门十二式）》、绝顶博台实战试锋、思过外坪朔风苦练（后洞古剑刻石室封锁未启）及潼关斩寇护粮，终登紫霞正气主殿答过【岳沧溟】四选一零提示问剑（答错永绝山门）赐剑拜入华山',
      buildBlockedReason: () =>
        '西岳华山只收白纸弟子（须从未入过他派且未修习良品及以上武学）——请先前往【京兆府（长安）】结识华山宿老【封不弃】（或向华山长老请益），开启《西岳问道 · 剑气淬锋》十五幕试炼，历潼关退匪与紫霞问剑后由岳掌门收录！',
    },
  },
  'SECT-06': {
    isDaoSwordTournamentSect: true,
    promotionRuleKind: 'dao_sword_tournament',
    entryQuestId: 'QST-SECT-06-ENTRY',
    autoCompleteEntryQuestOnJoin: true,
    bespokeEntryGuide: {
      requirementSummary:
        '须从未加入过任何门派，且未学过任何良品及良品以上武学！前往【济南府 · 泰山岱庙行祠】开启十五幕《东岳砺剑 · 封禅问心》长卷：历趵突泉托十斤铁木牌、凡躯退黑风匪、十八盘挑水登梯（作弊永拒）、东岳道院授剑试锋与押匪破劫囚，终登玉皇顶答褚玄机零提示问剑（答错永绝山门）拜入东岳',
      buildBlockedReason: () =>
        '五岳独尊泰山派只收白纸弟子（须从未入过他派且未修习良品及以上武学）——请前往【济南府 · 泰山岱庙行祠】（或点击泰山长老对话中的【呈验白纸身家叩问东岳】）开启《东岳砺剑 · 封禅问心》入门试炼！',
    },
  },
  'SECT-07': {
    isDaoSwordTournamentSect: true,
    promotionRuleKind: 'dao_sword_tournament',
    entryQuestId: 'QST-SECT-07-ENTRY',
    autoCompleteEntryQuestOnJoin: true,
    bespokeEntryGuide: {
      requirementSummary:
        '无门无派（或隶属【巴蜀百草药王门】）时，前往【成都府 · 锦江万里桥茶肆】偶遇俗家首席女侠【苏梦清】开启《锦水清音 · 金顶问心》二十幕长卷，历经万年寺吐纳筑基、洗象池月夜观猿与金顶佛光问心后择脉拜入（男女皆宜）',
      buildBlockedReason: () =>
        '峨眉择徒重红尘善缘与澄明本心——请先前往邻近【成都府 · 锦江万里桥茶肆】结识俗家首席【苏梦清】（或拜谒成都大慈寺【静虚师太】），完成《锦水清音 · 金顶问心》长卷后于华藏金顶正式入门！',
    },
  },
  'SECT-08': {
    isDaoSwordTournamentSect: true,
    promotionRuleKind: 'dao_sword_tournament',
    entryQuestId: 'QST-SECT-08-ENTRY',
    autoCompleteEntryQuestOnJoin: true,
    bespokeEntryGuide: {
      requirementSummary:
        '须从未加入过任何门派，且未学过任何良品及良品以上武学！前往【襄阳府 · 汉水大码头】开启十四幕《汉水止戈 · 龟蛇问剑》：助张清溪与莫清谷化解船帮泊位血斗、古隆中取药信、观云台饮茶解剑、紫霄禹迹池受传《武当长剑》并以慢剑接下殷峰峰试手、南岩剑痕崖拆招化解莫清谷三峡旧怨（若嗜杀邀功则当场永绝山门），终登太和紫金正殿甘守慢功拜入真武',
      buildBlockedReason: () =>
        '真武道宗只收白纸弟子（须从未入过他派且未修习良品及以上武学）——请前往【襄阳府 · 汉水大码头】（或与莫清谷 / 张清溪交谈）开启《汉水止戈 · 龟蛇问剑》十四幕试炼，历汉水止戈与南岩化怨后由张玄素真人授剑收录！',
    },
  },
  'SECT-11': {
    isDaoSwordTournamentSect: true,
    promotionRuleKind: 'dao_sword_tournament',
  },
  'SECT-13': {
    isDaoSwordTournamentSect: true,
    promotionRuleKind: 'dao_sword_tournament',
  },
  'SECT-14': {
    isDaoSwordTournamentSect: true,
    promotionRuleKind: 'dao_sword_tournament',
    entryQuestId: 'QST-SECT-14-ENTRY',
    autoCompleteEntryQuestOnJoin: true,
    bespokeEntryGuide: {
      requirementSummary:
        '须从未加入过任何门派，且未学过任何良品及良品以上武学！前往【成都府 · 锦江万里桥茶肆】开启十二幕《蜀道暗棋 · 松风试锋》：助侯沧海与吉元截回川东盐帮盗走的暗哨图、赴青城山孤崖受传凡品《三才剑》并截回唐门偷采的乌头灵芝、北上剑门关果决清理叛徒吴六（若心软私放则永绝山门），终登松风殿共承川西争雄之志、受传《青城松风剑》入门',
      buildBlockedReason: () =>
        '青城派只收白纸弟子（须从未入过他派且未修习良品及以上武学）——请先前往【成都府 · 锦江万里桥茶肆】（或与吉元 / 侯沧海交谈）开启《蜀道暗棋 · 松风试锋》十二幕试炼，历剑门清理门户后于松风殿拜入青城！',
    },
  },
  'SECT-15': {
    isDaoSwordTournamentSect: true,
    promotionRuleKind: 'dao_sword_tournament',
    entryQuestId: 'QST-SECT-15-ENTRY',
    autoCompleteEntryQuestOnJoin: true,
    bespokeEntryGuide: {
      requirementSummary:
        '无须内功根基：前往【襄阳府 · 汉水大码头】替铁掌帮抢船立威并见识钞关三七分账规矩（或赴洞庭铁掌峰向帮众叩问拜山），开启十六幕《铁砂立威 · 五指拜山》长卷：历连环寨扛百斤铜桨、赤砂沸鼎淬掌破零习武、雾夜袭破飞鱼水寨夺旗、五指中峰接少帮主【上官云豹】三招，最终登聚义正堂答帮主【上官天鹏】问心（四选一零提示，答错永绝山门）并拍青石试掌碑验劲、共饮雄黄烈酒入帮（支持江淮漕帮、钱塘怒潮帮、湘西五溪蛊寨同脉转投）',
      buildBlockedReason: () =>
        '请点击与本帮人物交互中的金色【铁砂立威 / 叩访五指峰】剧情选项（或赴襄阳府 · 汉水大码头），经历《铁砂立威 · 五指拜山》赤砂淬掌、夜袭飞鱼寨与聚义正堂问心验掌后饮雄黄烈酒入帮！',
    },
  },
  'SECT-16': {
    promotionRuleKind: 'minor_or_second_tier',
    entryQuestId: 'QST-SECT-16-REFERRAL',
  },
  'SECT-17': {
    monthlyStipends: SECT_SYSTEMS_DB.stipends['SECT-17'],
    stipendTitle: '开封府官俸',
    promotionRuleKind: 'kaifeng_cases',
    canReceiveLeaderTask: false,
    semiAnnualDutyKind: 'kaifeng_warrant',
  },
  'SECT-18': {
    promotionRuleKind: 'minor_or_second_tier',
    entryQuestId: 'QST-SECT-18-TOUMINGZHUANG',
    autoCompleteEntryQuestOnJoin: true,
  },
  'SECT-19': {
    promotionRuleKind: 'xingxiu_duel',
    entryQuestId: 'QST-SECT-19-ENTRY',
    autoCompleteEntryQuestOnJoin: true,
    bespokeEntryGuide: {
      requirementSummary:
        '无门无派时踏入【延安府 · 塞上番马黑市】触发十六幕邪宗长卷《星宿紫烟 · 投名血契》（若第一幕不愿落井下石即永久无缘星宿）：历昆仑活人丹炉试药、寒窟借刀杀人、毒沼踩死恶师兄，再接血令返延安下药格杀关中正道侠士【赵清风】割首为投名状，最终面见丁春秋答过零提示问心（答错永绝山门）方得紫衣入籍',
      buildBlockedReason: () =>
        '星宿老仙法驾关外，唯纳狠辣绝情之徒——请以无门无派之身踏入【延安府 · 塞上番马黑市】（或寻四师兄【出尘子】），经历《星宿紫烟 · 投名血契》格杀正道献首、答过丁春秋问心后方准披上星宿紫衣！',
    },
  },
  'SECT-22': {
    monthlyStipends: SECT_SYSTEMS_DB.stipends['SECT-22'],
    stipendTitle: '常山枪派军饷',
    payInitialStipendOnJoin: true,
    promotionRuleKind: 'minor_or_second_tier',
    semiAnnualDutyKind: 'liao_spy',
    leaveTriggersLiaoSuspicion: true,
  },
  'SECT-23': {
    promotionRuleKind: 'minor_or_second_tier',
    entryQuestId: 'QST-SECT-23-REFERRAL',
  },
  'SECT-24': {
    promotionRuleKind: 'minor_or_second_tier',
    entryQuestId: 'QST-SECT-24-REFERRAL',
  },
  'SECT-33': {
    monthlyStipends: SECT_SYSTEMS_DB.stipends['SECT-33'],
    stipendTitle: '大宋禁军月俸',
    hasExclusiveMartialArts: false,
    promotionRuleKind: 'imperial_guard_merit',
    buildLeaveMessage: (factionName, rankLabel) =>
      `少侠已向枢密院与三衙缴回虎符腰牌，正式辞去【${factionName}${rankLabel ? ` · ${rankLabel}` : ''}】军职，恢复自由游侠之身。`,
  },
}

for (const dlcId of DLC_LOCKED_IDS) {
  BASE_SECT_RULES[dlcId] = {
    ...(BASE_SECT_RULES[dlcId] ?? {}),
    isDlcLocked: true,
  }
}

const ALL_RULE_IDS = new Set<string>([
  ...Object.keys(BASE_SECT_RULES),
  ...Object.keys(SECT_SYSTEMS_DB.starterGearGifts),
  ...Object.keys(SECT_SYSTEMS_DB.stipends),
])

export const SECT_RULES_BY_ID: Readonly<Record<string, SectRuleConfig>> = Object.freeze(
  Object.fromEntries(
    Array.from(ALL_RULE_IDS).map((sectId) => {
      const base = BASE_SECT_RULES[sectId] ?? {}
      const cfg: SectRuleConfig = {
        sectId,
        ...base,
        monthlyStipends: base.monthlyStipends ?? SECT_SYSTEMS_DB.stipends[sectId],
        starterGearGifts: SECT_SYSTEMS_DB.starterGearGifts[sectId] ?? [],
      }
      return [sectId, cfg]
    }),
  ),
)

export function getSectRule(sectId?: string | null): SectRuleConfig | null {
  if (!sectId) return null
  return (
    SECT_RULES_BY_ID[sectId] ?? {
      sectId,
      starterGearGifts: SECT_SYSTEMS_DB.starterGearGifts[sectId] ?? [],
    }
  )
}
