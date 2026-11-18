import type { TenArtKey } from '../../types/game'
import { TEN_ART_KEYS } from '../shared/constants'
import { clamp } from '../shared/math'

export const TEN_ARTS_KEYS: readonly TenArtKey[] = TEN_ART_KEYS

/**
 * 任何一项十艺从 0 涨到 100 的基准总经验：180,000 点
 * 以标准日修 100 点/日计，恰好需要 1,800 日（北宋 1 年=360 日，即 5 年不间断学习）
 */
export const MAX_ART_EXP = 180_000
export const BASE_DAILY_ART_EXP = 100

/**
 * 四阶分段总经验阈值：
 * - 0 ~ 40 级（初窥门径）：15% = 27,000（675 / 级）
 * - 40 ~ 70 级（登堂入室）：25% = 45,000（1,500 / 级）
 * - 70 ~ 90 级（名家之境）：30% = 54,000（2,700 / 级）
 * - 90 ~ 100 级（一代宗师）：30% = 54,000（5,400 / 级）
 */
export function getExpForArtLevel(level: number): number {
  const lv = clamp(Math.floor(level), 0, 100)
  if (lv <= 40) return Math.round(lv * 675)
  if (lv <= 70) return 27_000 + Math.round((lv - 40) * 1_500)
  if (lv <= 90) return 72_000 + Math.round((lv - 70) * 2_700)
  return 126_000 + Math.round((lv - 90) * 5_400)
}

export function getArtLevelFromExp(exp: number): number {
  const clamped = clamp(Math.floor(exp), 0, MAX_ART_EXP)
  if (clamped < 27_000) return Math.floor(clamped / 675)
  if (clamped < 72_000) return 40 + Math.floor((clamped - 27_000) / 1_500)
  if (clamped < 126_000) return 70 + Math.floor((clamped - 72_000) / 2_700)
  return Math.min(100, 90 + Math.floor((clamped - 126_000) / 5_400))
}

export function getArtStageLabel(level: number): string {
  if (level >= 90) return '一代宗师'
  if (level >= 70) return '名家之境'
  if (level >= 40) return '登堂入室'
  return '初窥门径'
}

export function computeDailyArtExpGain(
  wisdom: number,
  envMultiplier = 1.0,
  itemBonus = 0,
): number {
  const wisdomMod = 1 + (clamp(wisdom, 1, 100) - 50) * 0.004
  return Math.max(10, Math.round(BASE_DAILY_ART_EXP * wisdomMod * envMultiplier * (1 + itemBonus)))
}

export function syncArtLevelsToExpsAndMilestones(params: {
  baseStats: {
    ridingSkill: number
    skills: Record<string, number>
    talents: { 根骨: number; 悟性: number; 颜值: number }
  }
  artExps: Partial<Record<TenArtKey, number>>
  artMilestoneFlags: string[]
  keysToSync?: readonly TenArtKey[]
}): {
  artExps: Partial<Record<TenArtKey, number>>
  artMilestoneFlags: string[]
  milestoneNotes: string[]
} {
  const nextExps: Partial<Record<TenArtKey, number>> = { ...params.artExps }
  const nextFlags = [...params.artMilestoneFlags]
  const milestoneNotes: string[] = []
  const keys = params.keysToSync ?? TEN_ARTS_KEYS

  for (const artKey of keys) {
    const rawLv =
      artKey === '骑术' ? params.baseStats.ridingSkill : (params.baseStats.skills[artKey] ?? 0)
    const clampedLv = clamp(Math.floor(rawLv), 0, 100)
    if (artKey === '骑术') {
      params.baseStats.ridingSkill = clampedLv
    } else {
      params.baseStats.skills[artKey] = clampedLv
    }

    const floorExpForLv = getExpForArtLevel(clampedLv)
    const nextFloorExp = clampedLv >= 100 ? MAX_ART_EXP : getExpForArtLevel(clampedLv + 1) - 1
    const prevExp = nextExps[artKey]
    if (prevExp === undefined) {
      nextExps[artKey] = floorExpForLv
    } else if (prevExp < floorExpForLv) {
      // 读经 / 奇遇直接 +N 级：保留原本在旧等级内已苦修攒下的进度比例，不清零子等级经验
      let prevLv = 0
      while (prevLv < 100 && getExpForArtLevel(prevLv + 1) <= prevExp) prevLv += 1
      const prevSpan = Math.max(1, getExpForArtLevel(prevLv + 1) - getExpForArtLevel(prevLv))
      const fraction = Math.min(0.999, Math.max(0, (prevExp - getExpForArtLevel(prevLv)) / prevSpan))
      const newSpan = Math.max(0, nextFloorExp - floorExpForLv)
      nextExps[artKey] = Math.min(nextFloorExp, floorExpForLv + Math.floor(newSpan * fraction))
    } else if (prevExp > nextFloorExp) {
      nextExps[artKey] = floorExpForLv
    }

    if (
      (artKey === '琴' || artKey === '书' || artKey === '画' || artKey === '诗词') &&
      clampedLv >= 80 &&
      !nextFlags.includes(`art80:${artKey}`)
    ) {
      nextFlags.push(`art80:${artKey}`)
      const prevVal = params.baseStats.talents.颜值
      params.baseStats.talents.颜值 = Math.min(100, prevVal + 2)
      if (params.baseStats.talents.颜值 > prevVal) {
        milestoneNotes.push(
          `【${artKey}】初入 80 级，【颜值 +${params.baseStats.talents.颜值 - prevVal}】`,
        )
      }
    }

    if (clampedLv >= 90 && !nextFlags.includes(`art90:${artKey}`)) {
      nextFlags.push(`art90:${artKey}`)
      if (artKey === '骑术') {
        const prevVal = params.baseStats.talents.根骨
        params.baseStats.talents.根骨 = Math.min(100, prevVal + 2)
        if (params.baseStats.talents.根骨 > prevVal) {
          milestoneNotes.push(
            `【骑术】初入 90 级，【根骨 +${params.baseStats.talents.根骨 - prevVal}】`,
          )
        }
      } else {
        const prevVal = params.baseStats.talents.悟性
        params.baseStats.talents.悟性 = Math.min(100, prevVal + 2)
        if (params.baseStats.talents.悟性 > prevVal) {
          milestoneNotes.push(
            `【${artKey}】初入 90 级，【悟性 +${params.baseStats.talents.悟性 - prevVal}】`,
          )
        }
      }
    }
  }

  return {
    artExps: nextExps,
    artMilestoneFlags: nextFlags,
    milestoneNotes,
  }
}

export interface TenArtGuideEntry {
  key: TenArtKey
  realm: string
  summary: string
  ways: string[]
  placesAndNpcs: string
  milestoneText: string
}

export const TEN_ARTS_GUIDE_DATA: TenArtGuideEntry[] = [
  {
    key: '骑术',
    realm: '御骏之道',
    summary: '决定良驹驾驭上限与人马合一程度，直接加快大地图移动脚力及马战冲锋表现。',
    ways: [
      '装备良驹在天下舆图长途奔波，按日自动累积骑术经验',
      '于秦州、大名府等武堂/马监参与驯马操练与茶马护队',
      '研读《相马经》或佩带天阶名驹鞍辔提升驾驭感悟',
    ],
    placesAndNpcs: '秦州府（陇右金环刀堂）、大名府军寨、御马监',
    milestoneText: '骑术首次达到 90 级：筋骨强健，永久【根骨 +2】',
  },
  {
    key: '算术',
    realm: '九章度支',
    summary: '关系商道套利、三司查账、奇门机关拆解及部分高阶阵法推演。',
    ways: [
      '在州府书院/学馆系统研习算学',
      '于开封三司、广州/泉州市舶司承接查账平准差事',
      '向贾宪、沈括、苏颂等北宋算学巨匠请教，把玩算筹雅器',
    ],
    placesAndNpcs: '开封府（三司）、广州府（市舶司）、杭州府',
    milestoneText: '算术首次达到 90 级：格物致知，永久【悟性 +2】',
  },
  {
    key: '经义',
    realm: '儒释道典',
    summary: '决定科举试帖、佛道高僧论法契合度，亦是少林/全真/终南等名门高阶心法门槛。',
    ways: [
      '在应天府、岳麓、白鹿洞、嵩阳四大书院研习经筵',
      '于少林藏经阁、大相国寺抄经，或与玄慈、法空等高僧论法',
      '展卷研读四书五经、佛道真经典籍',
    ],
    placesAndNpcs: '应天府书院、洛阳府（少林寺）、开封府（大相国寺）',
    milestoneText: '经义首次达到 90 级：明心见性，永久【悟性 +2】',
  },
  {
    key: '策论',
    realm: '经世致用',
    summary: '决定朝堂官场交涉、边防军幕推演与招揽豪杰时的说服权重。',
    ways: [
      '在州府书院研习历代奏议与边防策论',
      '于延州、定州等边陲军幕参与沙盘推演，或收集民情撰写《平边策》',
      '向范仲淹、欧阳修、包拯、王安石、司马光等名臣讨教',
    ],
    placesAndNpcs: '开封府（政事堂/翰林院）、延州府、定州军幕',
    milestoneText: '策论首次达到 90 级：洞察世事，永久【悟性 +2】',
  },
  {
    key: '诗词',
    realm: '风雅宋词',
    summary: '酒楼题壁、文会雅集、结交名士才女的核心艺业，关系部分音律/剑法意境领悟。',
    ways: [
      '在各地书院修习诗赋格律，或在汴京樊楼、西湖画舫饮酒题壁',
      '参加重阳登高、元宵灯谜诗会',
      '展读宋词名家法帖或结交文坛名宿',
    ],
    placesAndNpcs: '开封府（樊楼）、杭州府（西湖）、扬州府',
    milestoneText: '80 级永久【颜值 +2】 · 90 级永久【悟性 +2】',
  },
  {
    key: '琴',
    realm: '高山流水',
    summary: '音功类武学共鸣基础，亦是逍遥派、终南隐宗等风雅门派极为看重的修养。',
    ways: [
      '在书院雅乐堂或客栈静室抚琴修习',
      '集齐《广陵散》《幽兰》等古琴谱研读，佩带名琴雅器把玩',
      '于西湖画舫、松风园林间抚琴自修',
    ],
    placesAndNpcs: '姑苏（曼陀山庄/听香水榭）、杭州西湖、终南山',
    milestoneText: '80 级永久【颜值 +2】 · 90 级永久【悟性 +2】',
  },
  {
    key: '棋',
    realm: '黑白手谈',
    summary: '破译珍珑棋局、推演兵法奇阵之本，对逍遥派传承尤为关键。',
    ways: [
      '在茶肆棋馆或书院打谱复盘',
      '挑战各地名山残局（如擂鼓山珍珑棋局）',
      '与寺庙棋僧、隐世名宿手谈对弈',
    ],
    placesAndNpcs: '擂鼓山、洛阳府、开封府茶肆、少林寺',
    milestoneText: '棋艺首次达到 90 级：算无遗策，永久【悟性 +2】',
  },
  {
    key: '书',
    realm: '铁画银钩',
    summary: '临帖拓碑、辨识前人石壁剑意刻字的前置根基，联动笔法/剑法招式领悟。',
    ways: [
      '在书院消耗笔墨纸砚临摹名碑法帖',
      '游历洛阳龙门碑林等名胜拓印古碑',
      '研读王羲之、颜真卿、柳公权传世法帖',
    ],
    placesAndNpcs: '洛阳府（龙门石窟碑林）、江南四大书院、杭州府',
    milestoneText: '80 级永久【颜值 +2】 · 90 级永久【悟性 +2】',
  },
  {
    key: '画',
    realm: '青绿丹青',
    summary: '名山写生、鉴宝辨伪、为侠客名姝绘像传神（大幅增进好感）之艺。',
    ways: [
      '在书院画室临摹宋代山水花鸟画谱',
      '抵达奇绝名山大川时驻足写生',
      '在古玩行鉴宝辨伪，或为结交人物绘制丹青',
    ],
    placesAndNpcs: '开封府（翰林图画院）、杭州府、大理府',
    milestoneText: '80 级永久【颜值 +2】 · 90 级永久【悟性 +2】',
  },
  {
    key: '辩才',
    realm: '舌战群儒',
    summary: '决定公堂状词、门派使节调停、市井砍价及高阶自由交谈的说服成功率。',
    ways: [
      '在书院参与“王霸之辨”“儒释之争”辩论',
      '于开封府及各地衙门担任状师申冤，或出使各方势力调停',
      '在黑市/行商大额交易中讨价还价',
    ],
    placesAndNpcs: '开封府（府衙/鸿胪寺）、各地酒楼茶肆',
    milestoneText: '辩才首次达到 90 级：机锋敏锐，永久【悟性 +2】',
  },
]

export interface BuildingArtTrainingOption {
  artKey: TenArtKey
  actionTitle: string
  envMultiplier: number
  dailySilverCost: number
  desc: string
}

export function getBuildingArtTrainingOptions(building: {
  id: string
  name: string
  kind: string
  regionId: string
  regionName: string
  isSpecial: boolean
}): BuildingArtTrainingOption[] {
  const { id, name, kind, isSpecial } = building
  const opts: BuildingArtTrainingOption[] = []
  const add = (
    artKey: TenArtKey,
    actionTitle: string,
    envMultiplier: number,
    dailySilverCost: number,
    desc: string,
  ) => {
    if (!opts.some((o) => o.artKey === artKey)) {
      opts.push({ artKey, actionTitle, envMultiplier, dailySilverCost, desc })
    }
  }

  const isTopLandmark =
    id === 'bl_fanlou' ||
    id === 'ly_shuyuan' ||
    id === 'bl_kaifengfu' ||
    id === 'bl_xiangguosi' ||
    id === 'hz_port' ||
    id === 'zd_market' ||
    id === 'ya_blackmkt' ||
    id === 'sl_cangjing' ||
    /白鹿|岳麓|应天|嵩阳|翰林|国子监|太学|珍珑|无量玉|龙门/.test(name)

  const mult = isTopLandmark ? 1.4 : isSpecial ? 1.2 : 1.0

  if (/书院|学馆|讲席|太学|国子监|草堂|明道|崇儒|崇文/.test(name) || kind === 'pavilion') {
    if (/书院|学馆|讲席|太学|国子监|明道|崇儒|崇文/.test(name)) {
      add('经义', '书院研习经义', mult, 1, '诵读四书五经、儒释道典籍')
      add('策论', '书院推演策论', mult, 1, '研习历代奏议与经世方略')
      add('算术', '书院研习算学', mult, 1, '演练九章算术与历法度支')
      add('诗词', '书院吟咏诗赋', mult, 1, '推敲格律对仗，涵养诗心')
      add('书', '书院临摹碑帖', mult, 1, '铺纸研墨，临习名家法帖')
      add('画', '书院丹青描摹', mult, 1, '摹写宋代山水花鸟画谱')
      add('琴', '书院雅乐抚琴', mult, 1, '静室抚琴，参悟宫商角徵羽')
      add('棋', '书院打谱手谈', mult, 1, '推演黑白棋局，锻炼全局观')
      add('辩才', '书院论道辩难', mult, 1, '参与王霸儒释之辨，磨砺口锋')
    } else {
      add('画', '临景丹青写生', mult, 0, '观山水风物，挥毫写生传神')
      add('诗词', '亭台雅集赋诗', mult, 0, '触景生情，吟咏宋词小令')
      add('琴', '清风抚琴自修', mult, 0, '松风泉韵间抚琴养性')
      add('棋', '亭间对坐手谈', mult, 0, '石桌布子，复盘古谱残局')
    }
  }

  if (kind === 'yamen' || kind === 'palace' || /府衙|司衙|巡检司|留守|安抚|皇宫/.test(name)) {
    add('策论', '公堂研判政略', mult, 0, '阅览州府案牍边报，推演治国安邦之策')
    add('辩才', '公堂习练状词', mult, 0, '旁听断案申辩，磨砺言辞机锋')
    add('算术', '核查钱粮度支', mult, 0, '协助核算税赋账簿，精进算学')
  }

  if (
    kind === 'camp' ||
    kind === 'fort' ||
    /演武|校场|拳馆|军|镖|马|刀堂|枪派/.test(name)
  ) {
    add('骑术', '校场驯马演骑', mult, 1, '纵马驰骋演武，磨砺人马合一之术')
  }

  if (kind === 'tower' || kind === 'boat' || /酒楼|酒肆|樊楼|画舫|明月坊|茶/.test(name)) {
    add('诗词', '酒楼饮宴题壁', mult, 1, '把酒临风题壁赋词，与文客论诗')
    add('辩才', '市井茶肆论辩', mult, 1, '与三教九流纵论天下大势，锤炼辩才')
    if (kind === 'boat' || /画舫|明月|樊楼/.test(name)) {
      add('琴', '画舫月下抚琴', mult, 1, '临水抚琴奏曲，精进音律造诣')
    }
    add('棋', '酒肆雅间手谈', mult, 1, '雅间对弈复盘，消磨时辰长棋艺')
  }

  if (kind === 'temple' || kind === 'pagoda' || /寺|塔|观|祠|庙|藏经/.test(name)) {
    add('经义', '禅院抄经论法', mult, 0, '焚香抄写佛道真经，明心见性')
    add('书', '古刹拓碑临帖', mult, 0, '观摩寺庙历代名碑，磨砺书法笔意')
    add('棋', '禅房静坐手谈', mult, 0, '与寺中棋僧手谈复盘，参悟禅机')
  }

  if (kind === 'market' || kind === 'dock' || /市舶|榷场|黑市|胡商|码头|钞关/.test(name)) {
    add('算术', '商栈核算账目', mult, 0, '核算往来货殖银钱，精研商算之道')
    add('辩才', '市集议价交涉', mult, 0, '与南北行商周旋议价，磨砺口才')
    if (/马|榷场|黑市/.test(name)) {
      add('骑术', '榷场相马试骑', mult, 1, '于塞外马市相马试骑，提升驾驭之术')
    }
  }

  if (kind === 'garden' || /园|苑|洞|峰|崖|壁/.test(name)) {
    add('画', '名胜丹青写生', mult, 0, '对景写生勾勒山水芳华')
    add('诗词', '游园赏景赋诗', mult, 0, '吟诗作对，寄情山水')
  }

  return opts
}
