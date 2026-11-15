/**
 * Node.js deterministic DB compiler fallback for scripts/compile_game_db.py
 * Used by scripts/run_py.mjs when no local Python runtime is installed.
 * Reads docs/MARTIAL_ARTS_SECTS.md + docs/CHARACTER_COMPENDIUM.md along with existing
 * compiled JSON datasets in src/data/ and performs full re-compilation & validation of:
 *   - weapons.json / mounts.json / gear.json (parsed live from docs/EQUIPMENT_COMPENDIUM.md)
 *   - npcs.json (faction sync, templates, sect ranks, 6 martial art slots, 7 gear slots)
 *   - uniqueArtifacts.json (ownerFactionName sync)
 *   - idRegistry.json (44 canonical factions incl. SECT-33, counts, indexes)
 *   - portraitCatalog.json (synced character factions + templates)
 */

import fs from 'node:fs'
import path from 'node:path'

const TEN_SKILLS_SET = new Set(['算术', '经义', '策论', '诗词', '琴', '棋', '书', '画', '辩才'])

const MOUNT_TERRAIN_TRAIT_MAP = {
  踏平川: 'official',
  驰大漠: 'steppe',
  逾险峰: 'mountain',
  渡烟波: 'water',
  全地形: 'all',
}

function parseEquipBonusTokens(rawBonus) {
  const bonus = {}
  const skills = {}
  for (const m of rawBonus.matchAll(/`([^`+]+)\+(\d+)`/g)) {
    const k = m[1].trim()
    const v = Number.parseInt(m[2], 10)
    if (k === '攻') bonus.attack = v
    else if (k === '防') bonus.defense = v
    else if (k === '气血') bonus.maxHp = v
    else if (k === '内力') bonus.maxMp = v
    else if (k === '身法') bonus.agility = v
    else if (k === '抗性') bonus.res = v
    else if (k === '骑术') bonus.riding = v
    else if (TEN_SKILLS_SET.has(k) || k === '颜值') skills[k] = v
    else throw new Error(`Unknown equipBonus token: ${k} in ${rawBonus}`)
  }
  if (Object.keys(skills).length > 0) bonus.skills = skills
  return bonus
}

function resolveSectForOrigin(originText) {
  if (originText.includes('唐门') || originText.includes('唐家堡')) return 'SECT-13'
  const minorRules = [
    [['闽海镇远镖局'], 'SECT-24'],
    [['洛阳金刀门'], 'SECT-21'],
    [['常山枪派'], 'SECT-22'],
    [['沧州八极门'], 'SECT-23'],
    [['齐鲁查拳馆'], 'SECT-25'],
    [['钱塘怒潮帮'], 'SECT-26'],
    [['岭南洪门武馆'], 'SECT-27'],
    [['陇右金环刀堂'], 'SECT-28'],
    [['巴蜀百草药王门'], 'SECT-29'],
    [['湘西五溪蛊寨'], 'SECT-30'],
  ]
  for (const [keywords, sid] of minorRules) {
    if (keywords.some((kw) => originText.includes(kw))) return sid
  }
  if (originText.includes('南少林') && !originText.includes('北少林') && !originText.includes('嵩山')) {
    return 'SECT-04'
  }
  const rules = [
    [['嵩山少林', '北少林', '少林七十二', '少林达摩', '少林'], 'SECT-01'],
    [['莆田南少林', '南少林'], 'SECT-04'],
    [['丐帮'], 'SECT-02'],
    [['五台山', '清凉寺', '杨家'], 'SECT-03'],
    [['华山'], 'SECT-05'],
    [['泰山'], 'SECT-06'],
    [['峨眉'], 'SECT-07'],
    [['真武', '武当'], 'SECT-08'],
    [['逍遥', '灵鹫', '天山', '无量玉洞'], 'SECT-09'],
    [['慕容', '燕子坞', '参合'], 'SECT-10'],
    [['终南', '古墓', '活死人墓', '全真'], 'SECT-11'],
    [['桃花岛'], 'SECT-12'],
    [['青城'], 'SECT-14'],
    [['铁掌'], 'SECT-15'],
    [['漕帮', '淮南盐帮', '水路'], 'SECT-16'],
    [['六扇门', '开封府', '禁军', '大内'], 'SECT-17'],
    [['太行', '绿林'], 'SECT-18'],
    [['星宿'], 'SECT-19'],
    [['西夏一品堂', '一品堂', '西夏'], 'SECT-20'],
    [['辽国武林暗桩', '辽国暗桩', '北辽', '辽廷', '契丹'], 'SECT-31'],
    [['吐蕃密宗', '雪域密宗'], 'SECT-32'],
    [['大理', '段氏', '天龙寺'], 'ORG-08'],
    [['吐蕃', '密宗', '雪域'], 'ORG-09'],
  ]
  for (const [keywords, sid] of rules) {
    if (keywords.some((kw) => originText.includes(kw))) return sid
  }
  return null
}

function parseStatRequirements(prereqRaw) {
  if (!prereqRaw) return []
  const reqs = []
  for (const m of prereqRaw.matchAll(/`([^`≥]+?)≥(\d+)`/g)) {
    reqs.push({ stat: m[1].trim(), min: Number.parseInt(m[2], 10) })
  }
  return reqs
}

function assertFourSlotStatChannel(slot, id, equipBonus) {
  const keys = Object.keys(equipBonus)
  if (slot === 'weapon' || slot === 'bow') {
    if (keys.length !== 1 || keys[0] !== 'attack') {
      throw new Error(`[${id}] ${slot} equipBonus must contain ONLY 'attack', got ${JSON.stringify(equipBonus)}`)
    }
  } else if (slot === 'shoes') {
    if (keys.length !== 1 || keys[0] !== 'agility') {
      throw new Error(`[${id}] shoes equipBonus must contain ONLY 'agility', got ${JSON.stringify(equipBonus)}`)
    }
  } else if (slot === 'armor') {
    const allowed = new Set(['defense', 'res', 'maxHp'])
    if (keys.length === 0 || keys.some((k) => !allowed.has(k))) {
      throw new Error(
        `[${id}] armor equipBonus keys must be non-empty subset of defense/res/maxHp, got ${JSON.stringify(equipBonus)}`,
      )
    }
  }
}

function syncEquipmentFromDoc(weapons, mounts, gear, locationAliasMap, regionIdSet, factionIdSet, artIdSet) {
  const rawDoc = fs.readFileSync(path.join(DOCS_DIR, 'EQUIPMENT_COMPENDIUM.md'), 'utf8')
  const body = rawDoc.split('## 十、 天地阶孤品归属总录', 1)[0]
  const lines = body.split(/\r?\n/)

  const oldWpnById = Object.fromEntries(weapons.map((w) => [w.id, w]))
  const oldMntById = Object.fromEntries(mounts.map((m) => [m.id, m]))
  const oldGearById = Object.fromEntries(gear.map((g) => [g.id, g]))

  const nextWeapons = []
  const nextMounts = []
  const nextGear = []
  const seenGearIds = new Set()

  let currentTier = ''
  let currentSubTier = ''
  const subHeadingRe = /^###\s+\d+\.\d+\s+(天阶|地阶|良阶|凡阶)(上品|中品|下品)/
  const gearSlotMap = { ARM: 'armor', BOT: 'shoes', BOW: 'bow', ACC: 'accessory' }

  for (const rawLine of lines) {
    const ln = rawLine.trim()
    const mSub = ln.match(subHeadingRe)
    if (mSub) {
      currentTier = mSub[1]
      currentSubTier = mSub[2]
      continue
    }

    if (/^\|\s*`WPN-\d{3}`\s*\|/.test(ln)) {
      const cols = ln.slice(1, -1).split('|').map((c) => c.trim())
      if (cols.length !== 9 && cols.length !== 10) {
        throw new Error(`Unexpected column count (${cols.length}) in weapon row: ${ln}`)
      }
      const wpnId = cols[0].replace(/`/g, '').trim()
      const code = wpnId.split('-')[1]
      const name = cols[1].replace(/\*\*/g, '').trim()
      const wtype = cols[2].trim()
      const originFull = cols[3].trim()
      const forceRng = cols[4].trim()
      const val = Number.parseInt(cols[5].trim(), 10)
      const bonusRaw = cols[6].trim()
      const synRaw = cols[7].trim()
      const descRaw = cols[8].trim()
      const prereqRaw = cols.length === 10 ? cols[9].trim() : null

      let locPart = originFull
      let originDetail = originFull
      if (originFull.includes('·')) {
        const idx = originFull.indexOf('·')
        locPart = originFull.slice(0, idx).trim()
        originDetail = originFull.slice(idx + 1).trim()
      }
      const locInfo = locationAliasMap?.[locPart]
      const prev = oldWpnById[wpnId]
      const regionId = locInfo ? locInfo.regionId : prev?.regionId
      const canonicalLocLabel = locInfo ? locInfo.canonicalLabel : prev?.locationLabel || locPart
      if (!regionId || !regionIdSet.has(regionId)) {
        throw new Error(`[${wpnId}] Unknown weapon origin location: ${locPart}`)
      }
      const sectId = resolveSectForOrigin(originFull)
      if (sectId !== null && !factionIdSet.has(sectId)) {
        throw new Error(`[${wpnId}] Unknown sectId ${sectId}`)
      }

      const mFr = forceRng.match(/^([^·]+)·(\d+)格$/)
      if (!mFr) throw new Error(`[${wpnId}] Invalid force/range cell: ${forceRng}`)
      const forceTrait = mFr[1].trim()
      const attackRange = Number.parseInt(mFr[2], 10)

      const equipBonus = parseEquipBonusTokens(bonusRaw)
      assertFourSlotStatChannel('weapon', wpnId, equipBonus)

      const synergies = Array.from(synRaw.matchAll(/([\u4e00-\u9fa5]+)\+(\d+)%/g)).map((sm) => ({
        category: sm[1],
        bonusPct: Number.parseInt(sm[2], 10),
      }))
      const sigArtIds = Array.from(synRaw.matchAll(/`(MA-\d{3})`/g)).map((am) => am[1])
      for (const sid of sigArtIds) {
        if (!artIdSet.has(sid)) throw new Error(`[${wpnId}] Invalid signatureArtId ${sid}`)
      }

      const mEff = descRaw.match(/^(【[^】]+】)/)
      const specialTag = mEff ? mEff[1] : null
      const statReqs = parseStatRequirements(prereqRaw)
      const wpnIconRel = `assets/items/weapons/wpn_${code}.jpg`
      const wpnIconUrl = fs.existsSync(path.join(PUBLIC_DIR, wpnIconRel)) ? `/${wpnIconRel}` : null

      nextWeapons.push({
        id: wpnId,
        code,
        name,
        slot: 'weapon',
        weaponType: wtype,
        tier: currentTier,
        subTier: currentSubTier,
        fullTier: `${currentTier}${currentSubTier}`,
        regionId,
        locationLabel: canonicalLocLabel,
        origin: originDetail,
        originFull,
        sectId,
        forceTrait,
        attackRange,
        value: val,
        equipBonus,
        synergies,
        signatureArtIds: sigArtIds,
        specialTag,
        description: descRaw,
        prerequisitesText: prereqRaw,
        statRequirements: statReqs,
        iconUrl: wpnIconUrl,
      })
      continue
    }

    if (/^\|\s*`MNT-\d{3}`\s*\|/.test(ln)) {
      const cols = ln.slice(1, -1).split('|').map((c) => c.trim())
      if (cols.length !== 8 && cols.length !== 9) {
        throw new Error(`Unexpected column count (${cols.length}) in mount row: ${ln}`)
      }
      const mntId = cols[0].replace(/`/g, '').trim()
      const code = mntId.split('-')[1]
      const name = cols[1].replace(/\*\*/g, '').trim()
      const breedCategory = cols[2].trim()
      const originFull = cols[3].trim()
      const speedTraitRaw = cols[4].trim()
      const val = Number.parseInt(cols[5].trim(), 10)
      const bonusRaw = cols[6].trim()
      const descRaw = cols[7].trim()
      const prereqRaw = cols.length === 9 ? cols[8].trim() : null

      let locPart = originFull
      let originDetail = originFull
      if (originFull.includes('·')) {
        const idx = originFull.indexOf('·')
        locPart = originFull.slice(0, idx).trim()
        originDetail = originFull.slice(idx + 1).trim()
      }
      const locInfo = locationAliasMap?.[locPart]
      const prev = oldMntById[mntId]
      const regionId = locInfo ? locInfo.regionId : prev?.regionId
      const canonicalLocLabel = locInfo ? locInfo.canonicalLabel : prev?.locationLabel || locPart
      if (!regionId || !regionIdSet.has(regionId)) {
        throw new Error(`[${mntId}] Unknown mount origin location: ${locPart}`)
      }
      const sectId = resolveSectForOrigin(originFull)
      if (sectId !== null && !factionIdSet.has(sectId)) {
        throw new Error(`[${mntId}] Unknown sectId ${sectId}`)
      }

      const mSt = speedTraitRaw.match(/^(\d+)里·([^+]+)\+(\d+)%$/)
      if (!mSt) throw new Error(`[${mntId}] Invalid speed/terrain trait cell: ${speedTraitRaw}`)
      const baseSpeed = Number.parseInt(mSt[1], 10)
      const terrainTrait = mSt[2].trim()
      const terrainBonusPct = Number.parseInt(mSt[3], 10)
      const favoredTerrain = MOUNT_TERRAIN_TRAIT_MAP[terrainTrait]
      if (!favoredTerrain) throw new Error(`[${mntId}] Unknown terrain trait: ${terrainTrait}`)

      const equipBonus = parseEquipBonusTokens(bonusRaw)
      const mEff = descRaw.match(/^【([^】]+)】/)
      const specialTag = mEff ? mEff[1] : null
      const statReqs = parseStatRequirements(prereqRaw)
      const mntIconRel = `assets/items/mounts/mnt_${code}.jpg`
      const mntIconUrl = fs.existsSync(path.join(PUBLIC_DIR, mntIconRel)) ? `/${mntIconRel}` : null

      nextMounts.push({
        id: mntId,
        code,
        name,
        slot: 'mount',
        breedCategory,
        tier: currentTier,
        subTier: currentSubTier,
        fullTier: `${currentTier}${currentSubTier}`,
        regionId,
        locationLabel: canonicalLocLabel,
        origin: originDetail,
        originFull,
        sectId,
        baseSpeed,
        terrainTrait,
        favoredTerrain,
        terrainBonusPct,
        value: val,
        equipBonus,
        specialTag,
        description: descRaw,
        prerequisitesText: prereqRaw,
        statRequirements: statReqs,
        iconUrl: mntIconUrl,
      })
      continue
    }

    if (/^\|\s*`((?:ARM|BOT|BOW|ACC)-\d{3})`\s*\|/.test(ln)) {
      const cells = ln.slice(1, -1).split('|').map((c) => c.trim())
      if (cells.length < 10) continue
      const itemId = cells[0].replace(/`/g, '').trim()
      if (seenGearIds.has(itemId)) throw new Error(`Duplicate gear ID: ${itemId}`)
      seenGearIds.add(itemId)

      const prefix = itemId.split('-')[0]
      const slot = gearSlotMap[prefix]
      const name = cells[1].replace(/\*\*/g, '').trim()
      const tier = cells[2]
      const grade = cells[3]
      const subType = cells[4]
      const origin = cells[5]
      const valM = cells[6].match(/(\d+)/)
      const value = valM ? Number.parseInt(valM[1], 10) : 100
      const bonusCell = cells[7]
      const descCell = cells[8]
      const reqCell = cells[9]

      const locPart = origin.includes('·') ? origin.split('·', 1)[0].trim() : origin.trim()
      const locInfo = locationAliasMap?.[locPart]
      const prev = oldGearById[itemId]
      const regionId = locInfo ? locInfo.regionId : prev?.regionId
      if (!regionId || !regionIdSet.has(regionId)) {
        throw new Error(`[${itemId}] Unknown gear origin location: ${locPart}`)
      }
      const sectId = resolveSectForOrigin(origin)
      if (sectId !== null && !factionIdSet.has(sectId)) {
        throw new Error(`[${itemId}] Unknown sectId ${sectId}`)
      }

      const equipBonus = parseEquipBonusTokens(bonusCell)
      assertFourSlotStatChannel(slot, itemId, equipBonus)

      const tagM = descCell.match(/^【([^】]+)】(.*)$/)
      const specialTag = tagM ? tagM[1].trim() : null
      const description = tagM ? tagM[2].trim() : descCell
      const prereqText = reqCell === '无' || reqCell === '-' || reqCell === '' ? null : reqCell
      const statReqs = parseStatRequirements(prereqText)
      const gearIconRel = `assets/items/gear/${itemId.toLowerCase().replace('-', '_')}.jpg`
      const gearIconUrl = fs.existsSync(path.join(PUBLIC_DIR, gearIconRel)) ? `/${gearIconRel}` : null

      nextGear.push({
        id: itemId,
        name,
        slot,
        tier,
        grade,
        subType,
        origin,
        regionId,
        sectId,
        value,
        equipBonus,
        specialTag,
        description,
        prerequisitesText: prereqText,
        statRequirements: statReqs,
        iconUrl: gearIconUrl,
      })
    }
  }

  nextWeapons.sort((a, b) => Number.parseInt(a.code, 10) - Number.parseInt(b.code, 10))
  nextMounts.sort((a, b) => Number.parseInt(a.code, 10) - Number.parseInt(b.code, 10))
  if (nextWeapons.length !== 100) throw new Error(`Expected 100 weapons in doc, got ${nextWeapons.length}`)
  if (nextMounts.length !== 28) throw new Error(`Expected 28 mounts in doc, got ${nextMounts.length}`)
  if (nextGear.length !== 168) throw new Error(`Expected 168 gear items in doc, got ${nextGear.length}`)

  weapons.splice(0, weapons.length, ...nextWeapons)
  mounts.splice(0, mounts.length, ...nextMounts)
  gear.splice(0, gear.length, ...nextGear)
}

const ROOT_DIR = process.cwd()
const DOCS_DIR = path.join(ROOT_DIR, 'docs')
const DATA_DIR = path.join(ROOT_DIR, 'src', 'data')
const PUBLIC_DIR = path.join(ROOT_DIR, 'public')

const SECT_33_DEF = {
  id: 'SECT-33',
  name: '大宋禁军',
  shortName: '禁军',
  isMajorSect: true,
  isMinorSect: false,
  sectTier: '一流大派',
  group: '朝廷鹰犬·草莽与外邦渗透势力',
  stance: '拱卫神京',
  hqRegionId: 'bianliang',
  aliases: ['大内禁军', '八十万禁军', '三衙禁军'],
}

const SECT_GENDERED_TEMPLATES = {
  'SECT-02|男': ['/assets/characters/templates/tpl_gaibang_fb.jpg', '/assets/characters/templates/tpl_gaibang_av.jpg'],
  'SECT-02|女': ['/assets/characters/templates/tpl_gaibang_female_fb.jpg', '/assets/characters/templates/tpl_gaibang_female_av.jpg'],
  'SECT-05|男': ['/assets/characters/templates/tpl_huashan_fb.jpg', '/assets/characters/templates/tpl_huashan_av.jpg'],
  'SECT-05|女': ['/assets/characters/templates/tpl_huashan_female_fb.jpg', '/assets/characters/templates/tpl_huashan_female_av.jpg'],
  'SECT-06|男': ['/assets/characters/templates/tpl_taishan_fb.jpg', '/assets/characters/templates/tpl_taishan_av.jpg'],
  'SECT-06|女': ['/assets/characters/templates/tpl_taishan_female_fb.jpg', '/assets/characters/templates/tpl_taishan_female_av.jpg'],
  'SECT-07|男': ['/assets/characters/templates/tpl_emei_male_fb.jpg', '/assets/characters/templates/tpl_emei_male_av.jpg'],
  'SECT-07|女': ['/assets/characters/templates/tpl_emei_female_fb.jpg', '/assets/characters/templates/tpl_emei_female_av.jpg'],
  'SECT-08|男': ['/assets/characters/templates/tpl_wudang_fb.jpg', '/assets/characters/templates/tpl_wudang_av.jpg'],
  'SECT-08|女': ['/assets/characters/templates/tpl_wudang_female_fb.jpg', '/assets/characters/templates/tpl_wudang_female_av.jpg'],
  'SECT-11|男': ['/assets/characters/templates/tpl_zhongnan_fb.jpg', '/assets/characters/templates/tpl_zhongnan_av.jpg'],
  'SECT-11|女': ['/assets/characters/templates/tpl_zhongnan_female_fb.jpg', '/assets/characters/templates/tpl_zhongnan_female_av.jpg'],
  'SECT-13|男': ['/assets/characters/templates/tpl_tangmen_male_fb.jpg', '/assets/characters/templates/tpl_tangmen_male_av.jpg'],
  'SECT-13|女': ['/assets/characters/templates/tpl_tangmen_fb.jpg', '/assets/characters/templates/tpl_tangmen_av.jpg'],
  'SECT-14|男': ['/assets/characters/templates/tpl_qingcheng_fb.jpg', '/assets/characters/templates/tpl_qingcheng_av.jpg'],
  'SECT-14|女': ['/assets/characters/templates/tpl_qingcheng_female_fb.jpg', '/assets/characters/templates/tpl_qingcheng_female_av.jpg'],
  'SECT-15|男': ['/assets/characters/templates/tpl_tiezhang_fb.jpg', '/assets/characters/templates/tpl_tiezhang_av.jpg'],
  'SECT-15|女': ['/assets/characters/templates/tpl_tiezhang_female_fb.jpg', '/assets/characters/templates/tpl_tiezhang_female_av.jpg'],
  'SECT-16|男': ['/assets/characters/templates/tpl_caobang_fb.jpg', '/assets/characters/templates/tpl_caobang_av.jpg'],
  'SECT-16|女': ['/assets/characters/templates/tpl_caobang_female_fb.jpg', '/assets/characters/templates/tpl_caobang_female_av.jpg'],
  'SECT-18|男': ['/assets/characters/templates/tpl_greenwood_sect_fb.jpg', '/assets/characters/templates/tpl_greenwood_sect_av.jpg'],
  'SECT-18|女': ['/assets/characters/templates/tpl_greenwood_sect_female_fb.jpg', '/assets/characters/templates/tpl_greenwood_sect_female_av.jpg'],
  'SECT-19|男': ['/assets/characters/templates/tpl_xingxiu_fb.jpg', '/assets/characters/templates/tpl_xingxiu_av.jpg'],
  'SECT-19|女': ['/assets/characters/templates/tpl_xingxiu_female_fb.jpg', '/assets/characters/templates/tpl_xingxiu_female_av.jpg'],
  'SECT-20|男': ['/assets/characters/templates/tpl_yipintang_fb.jpg', '/assets/characters/templates/tpl_yipintang_av.jpg'],
  'SECT-20|女': ['/assets/characters/templates/tpl_yipintang_female_fb.jpg', '/assets/characters/templates/tpl_yipintang_female_av.jpg'],
  'SECT-30|男': ['/assets/characters/templates/tpl_wuxiguzhai_male_fb.jpg', '/assets/characters/templates/tpl_wuxiguzhai_male_av.jpg'],
  'SECT-30|女': ['/assets/characters/templates/tpl_wuxiguzhai_fb.jpg', '/assets/characters/templates/tpl_wuxiguzhai_av.jpg'],
  'SECT-01|男': ['/assets/characters/templates/tpl_shaolin_songshan_male_fb.jpg', '/assets/characters/templates/tpl_shaolin_songshan_male_av.jpg'],
  'SECT-03|男': ['/assets/characters/templates/tpl_wutai_monk_male_fb.jpg', '/assets/characters/templates/tpl_wutai_monk_male_av.jpg'],
  'SECT-04|男': ['/assets/characters/templates/tpl_nanshaolin_male_fb.jpg', '/assets/characters/templates/tpl_nanshaolin_male_av.jpg'],
  'SECT-09|男': ['/assets/characters/templates/tpl_xiaoyao_male_fb.jpg', '/assets/characters/templates/tpl_xiaoyao_male_av.jpg'],
  'SECT-09|女': ['/assets/characters/templates/tpl_xiaoyao_female_fb.jpg', '/assets/characters/templates/tpl_xiaoyao_female_av.jpg'],
  'SECT-10|男': ['/assets/characters/templates/tpl_murong_male_fb.jpg', '/assets/characters/templates/tpl_murong_male_av.jpg'],
  'SECT-10|女': ['/assets/characters/templates/tpl_murong_female_fb.jpg', '/assets/characters/templates/tpl_murong_female_av.jpg'],
  'SECT-12|男': ['/assets/characters/templates/tpl_taohuadao_male_fb.jpg', '/assets/characters/templates/tpl_taohuadao_male_av.jpg'],
  'SECT-12|女': ['/assets/characters/templates/tpl_taohuadao_female_fb.jpg', '/assets/characters/templates/tpl_taohuadao_female_av.jpg'],
  'SECT-17|男': ['/assets/characters/templates/tpl_liushenmen_male_fb.jpg', '/assets/characters/templates/tpl_liushenmen_male_av.jpg'],
  'SECT-17|女': ['/assets/characters/templates/tpl_liushenmen_female_fb.jpg', '/assets/characters/templates/tpl_liushenmen_female_av.jpg'],
  'SECT-21|男': ['/assets/characters/templates/tpl_jindaomen_male_fb.jpg', '/assets/characters/templates/tpl_jindaomen_male_av.jpg'],
  'SECT-22|男': ['/assets/characters/templates/tpl_changshan_male_fb.jpg', '/assets/characters/templates/tpl_changshan_male_av.jpg'],
  'SECT-22|女': ['/assets/characters/templates/tpl_changshan_female_fb.jpg', '/assets/characters/templates/tpl_changshan_female_av.jpg'],
  'SECT-23|男': ['/assets/characters/templates/tpl_baji_male_fb.jpg', '/assets/characters/templates/tpl_baji_male_av.jpg'],
  'SECT-23|女': ['/assets/characters/templates/tpl_baji_female_fb.jpg', '/assets/characters/templates/tpl_baji_female_av.jpg'],
  'SECT-24|男': ['/assets/characters/templates/tpl_zhenyuan_male_fb.jpg', '/assets/characters/templates/tpl_zhenyuan_male_av.jpg'],
  'SECT-25|男': ['/assets/characters/templates/tpl_chaquan_male_fb.jpg', '/assets/characters/templates/tpl_chaquan_male_av.jpg'],
  'SECT-25|女': ['/assets/characters/templates/tpl_chaquan_female_fb.jpg', '/assets/characters/templates/tpl_chaquan_female_av.jpg'],
  'SECT-26|男': ['/assets/characters/templates/tpl_qiantang_male_fb.jpg', '/assets/characters/templates/tpl_qiantang_male_av.jpg'],
  'SECT-27|男': ['/assets/characters/templates/tpl_hongmen_male_fb.jpg', '/assets/characters/templates/tpl_hongmen_male_av.jpg'],
  'SECT-27|女': ['/assets/characters/templates/tpl_hongmen_female_fb.jpg', '/assets/characters/templates/tpl_hongmen_female_av.jpg'],
  'SECT-28|男': ['/assets/characters/templates/tpl_jinhuan_male_fb.jpg', '/assets/characters/templates/tpl_jinhuan_male_av.jpg'],
  'SECT-29|男': ['/assets/characters/templates/tpl_baicao_male_fb.jpg', '/assets/characters/templates/tpl_baicao_male_av.jpg'],
  'SECT-29|女': ['/assets/characters/templates/tpl_baicao_female_fb.jpg', '/assets/characters/templates/tpl_baicao_female_av.jpg'],
  'ORG-01|男': ['/assets/characters/templates/tpl_sanren_male_fb.jpg', '/assets/characters/templates/tpl_sanren_male_av.jpg'],
  'ORG-01|女': ['/assets/characters/templates/tpl_sanren_female_fb.jpg', '/assets/characters/templates/tpl_sanren_female_av.jpg'],
  'ORG-02|女': ['/assets/characters/templates/tpl_song_court_female_fb.jpg', '/assets/characters/templates/tpl_song_court_female_av.jpg'],
  'ORG-08|男': ['/assets/characters/templates/tpl_dali_royal_male_fb.jpg', '/assets/characters/templates/tpl_dali_royal_male_av.jpg'],
  'SECT-31|男': ['/assets/characters/templates/tpl_liao_spy_male_fb.jpg', '/assets/characters/templates/tpl_liao_spy_male_av.jpg'],
  'SECT-31|女': ['/assets/characters/templates/tpl_liao_spy_female_fb.jpg', '/assets/characters/templates/tpl_liao_spy_female_av.jpg'],
  'SECT-32|男': ['/assets/characters/templates/tpl_tubo_esoteric_male_fb.jpg', '/assets/characters/templates/tpl_tubo_esoteric_male_av.jpg'],
  'SECT-32|女': ['/assets/characters/templates/tpl_tubo_esoteric_female_fb.jpg', '/assets/characters/templates/tpl_tubo_esoteric_female_av.jpg'],
  'ORG-06|男': ['/assets/characters/templates/tpl_liao_court_male_fb.jpg', '/assets/characters/templates/tpl_liao_court_male_av.jpg'],
  'ORG-07|男': ['/assets/characters/templates/tpl_xixia_court_male_fb.jpg', '/assets/characters/templates/tpl_xixia_court_male_av.jpg'],
  'ORG-09|男': ['/assets/characters/templates/tpl_tubo_tribes_male_fb.jpg', '/assets/characters/templates/tpl_tubo_tribes_male_av.jpg'],
  'SECT-33|男': ['/assets/characters/templates/tpl_liushenmen_male_fb.jpg', '/assets/characters/templates/tpl_liushenmen_male_av.jpg'],
  'SECT-33|女': ['/assets/characters/templates/tpl_liushenmen_female_fb.jpg', '/assets/characters/templates/tpl_liushenmen_female_av.jpg'],
}

function readJson(filename) {
  return JSON.parse(fs.readFileSync(path.join(DATA_DIR, filename), 'utf8'))
}

function writeJson(filename, payload) {
  const serialized = JSON.stringify(payload, null, 2) + '\n'
  if (serialized.includes('data:image/')) {
    throw new Error(`Base64 data URI detected in ${filename}!`)
  }
  const outPath = path.join(DATA_DIR, filename)
  fs.writeFileSync(outPath, serialized, 'utf8')
  const kb = (fs.statSync(outPath).size / 1024).toFixed(1)
  console.log(`[M0-3 fallback] Wrote src/data/${filename.padEnd(18)} (${kb.padStart(7)} KB)`)
}

function existingPair(fbUrl, avUrl) {
  const fbPath = path.join(PUBLIC_DIR, fbUrl.replace(/^\/+/, ''))
  const avPath = path.join(PUBLIC_DIR, avUrl.replace(/^\/+/, ''))
  if (fs.existsSync(fbPath) && fs.existsSync(avPath)) {
    return [fbUrl, avUrl]
  }
  return null
}

function pickTemplateForNpc(factionId, gender, role, category) {
  const tplPair = SECT_GENDERED_TEMPLATES[`${factionId}|${gender}`]
  if (tplPair) {
    const ok = existingPair(tplPair[0], tplPair[1])
    if (ok) return ok
  }
  if (['SECT-01', 'SECT-03', 'SECT-04', 'SECT-32'].includes(factionId) || /僧|禅|喇嘛/.test(role)) {
    return ['/assets/characters/templates/tpl_shaolin_monk_fb.jpg', null]
  }
  if (['ORG-05', 'SECT-29'].includes(factionId) || /医|药/.test(role)) {
    return ['/assets/characters/templates/tpl_song_physician_fb.jpg', null]
  }
  if (factionId === 'ORG-08') {
    return ['/assets/characters/templates/tpl_dali_prince_fb.jpg', null]
  }
  if (['ORG-06', 'ORG-07', 'ORG-09', 'ORG-11', 'SECT-20', 'SECT-31'].includes(factionId) && gender === '男') {
    return ['/assets/characters/templates/tpl_khitan_warrior_fb.jpg', null]
  }
  if (gender === '女') {
    if (['ORG-02', 'ORG-06', 'ORG-07', 'ORG-08'].includes(factionId) && /后|妃|主|贵女/.test(role)) {
      return ['/assets/characters/templates/tpl_song_empress_fb.jpg', null]
    }
    if (/将|帅|捕/.test(role) || ['SECT-17', 'SECT-18', 'SECT-22', 'SECT-24', 'SECT-33'].includes(factionId)) {
      return ['/assets/characters/templates/tpl_woman_general_fb.jpg', null]
    }
    return ['/assets/characters/templates/tpl_emei_heroine_fb.jpg', null]
  }
  if (category === '历史名人' || ['ORG-02', 'ORG-03', 'ORG-04'].includes(factionId)) {
    if (/将|帅|军|指挥/.test(role)) {
      return ['/assets/characters/templates/tpl_greenwood_hero_fb.jpg', null]
    }
    return ['/assets/characters/templates/tpl_song_scholar_fb.jpg', null]
  }
  if (['SECT-06', 'SECT-08', 'SECT-11', 'SECT-14'].includes(factionId)) {
    return ['/assets/characters/templates/tpl_taoist_master_fb.jpg', null]
  }
  if (['SECT-09', 'SECT-10', 'SECT-12'].includes(factionId)) {
    return ['/assets/characters/templates/tpl_taohua_master_fb.jpg', null]
  }
  if (['SECT-13', 'SECT-19', 'SECT-20', 'SECT-30'].includes(factionId)) {
    return ['/assets/characters/templates/tpl_unorthodox_master_fb.jpg', null]
  }
  return ['/assets/characters/templates/tpl_greenwood_hero_fb.jpg', null]
}

function populateNpcLoadouts(npcs, martialArts, weapons, gear, mounts) {
  const artById = Object.fromEntries(martialArts.map((a) => [a.id, a]))
  if (artById['MA-102']) {
    artById['MA-102'].tier = '地阶'
    artById['MA-102'].subTier = '下品'
    artById['MA-102'].fullTier = '地阶下品'
  }
  if (artById['MA-060']) {
    artById['MA-060'].tier = '地阶'
    artById['MA-060'].subTier = '上品'
    artById['MA-060'].fullTier = '地阶上品'
  }
  const tierRank = { 天阶: 4, 地阶: 3, 良品: 2, 凡品: 1 }

  const allowedArtTiers = (realmRank) => {
    if (realmRank <= 3) return ['天阶', '地阶', '良品', '凡品']
    if (realmRank <= 6) return ['地阶', '天阶', '良品', '凡品']
    if (realmRank <= 9) return ['良品', '地阶', '凡品']
    if (realmRank <= 12) return ['良品', '凡品']
    return ['凡品', '良品']
  }

  const defaultArtLevel = (realmRank, artTier) => {
    if (realmRank === 1) return 10
    if (realmRank === 2) return artTier === '天阶' ? 9 : 10
    if (realmRank === 3) return artTier === '天阶' || artTier === '地阶' ? 9 : 10
    if (realmRank === 4) {
      if (artTier === '天阶') return 8
      if (artTier === '地阶') return 9
      return 10
    }
    if (realmRank === 5) return artTier === '天阶' || artTier === '地阶' ? 8 : 10
    if (realmRank === 6) {
      if (artTier === '天阶') return 7
      if (artTier === '地阶') return 8
      if (artTier === '良品') return 9
      return 10
    }
    if (realmRank === 7) return artTier === '天阶' || artTier === '地阶' ? 7 : 9
    if (realmRank === 8) {
      if (artTier === '天阶') return 6
      if (artTier === '地阶') return 7
      if (artTier === '良品') return 8
      return 9
    }
    if (realmRank === 9) {
      if (artTier === '天阶') return 5
      if (artTier === '地阶') return 7
      return 8
    }
    if (realmRank === 10) {
      if (artTier === '天阶') return 3
      if (artTier === '地阶') return 6
      if (artTier === '良品') return 7
      return 8
    }
    if (realmRank === 11) {
      if (artTier === '天阶') return 1
      if (artTier === '地阶') return 5
      if (artTier === '良品') return 6
      return 7
    }
    if (realmRank === 12) {
      if (artTier === '天阶') return 1
      if (artTier === '地阶' || artTier === '良品') return 5
      return 6
    }
    if (realmRank === 13) {
      if (artTier === '天阶' || artTier === '地阶') return 1
      if (artTier === '良品') return 4
      return 5
    }
    if (realmRank === 14) {
      if (artTier === '天阶' || artTier === '地阶') return 1
      if (artTier === '良品') return 3
      return 4
    }
    if (realmRank === 15) {
      if (artTier === '天阶' || artTier === '地阶') return 1
      if (artTier === '良品') return 2
      return 3
    }
    return artTier === '凡品' ? 2 : 1
  }

  const pickFromPool = (pool, preferredTiers, excludeIds, seed) => {
    const avail = pool.filter((x) => !excludeIds.has(x.id))
    if (avail.length === 0) return null
    for (const t of preferredTiers) {
      const tList = avail.filter((x) => x.tier === t)
      if (tList.length > 0) return tList[seed % tList.length]
    }
    return avail[seed % avail.length]
  }

  const pickGearForSlot = (pool, targetTier, factionId, regionId, seed, excludeIds = null, preferredWeaponType = null) => {
    const excl = excludeIds || new Set()
    let tiered = pool.filter((x) => x.tier === targetTier && !excl.has(x.id))
    if (tiered.length === 0) {
      const nonExcl = pool.filter((x) => !excl.has(x.id))
      tiered = nonExcl.length > 0 ? nonExcl : pool
    }
    if (preferredWeaponType) {
      const typed = tiered.filter((x) => x.weaponType === preferredWeaponType)
      if (typed.length > 0) tiered = typed
    }
    const sectMatch = tiered.filter((x) => x.sectId === factionId)
    if (sectMatch.length > 0) return sectMatch[seed % sectMatch.length].id
    const regMatch = tiered.filter((x) => x.regionId === regionId)
    if (regMatch.length > 0) return regMatch[seed % regMatch.length].id
    return tiered[seed % tiered.length].id
  }

  const catToWeaponType = {
    剑法: '剑',
    刀法: '刀',
    枪法: '枪',
    棍棒: '棍棒',
    拳掌: '拳掌护手',
    指法: '拳掌护手',
    暗器: '暗器',
    音功: '奇门音兵',
  }

  const gearBySlot = {
    armor: gear.filter((g) => g.slot === 'armor'),
    shoes: gear.filter((g) => g.slot === 'shoes'),
    bow: gear.filter((g) => g.slot === 'bow'),
    accessory: gear.filter((g) => g.slot === 'accessory'),
  }

  const itemBonusMap = {
    ...Object.fromEntries(weapons.map((w) => [w.id, w.equipBonus || {}])),
    ...Object.fromEntries(gear.map((g) => [g.id, g.equipBonus || {}])),
    ...Object.fromEntries(mounts.map((m) => [m.id, m.equipBonus || {}])),
  }

  const firstClassNgUpgrades = {
    'NPC-0141': 'MA-058',
    'NPC-0186': 'MA-058',
    'NPC-0185': 'MA-102',
    'NPC-0031': 'MA-102',
    'NPC-0145': 'MA-058',
    'NPC-0172': 'MA-058',
    'NPC-0179': 'MA-102',
    'NPC-0072': 'MA-058',
    'NPC-0193': 'MA-041',
    'NPC-0094': 'MA-058',
    'NPC-0178': 'MA-102',
    'NPC-0081': 'MA-058',
    'NPC-0190': 'MA-058',
    'NPC-0275': 'MA-102',
    'NPC-0296': 'MA-058',
    'NPC-0252': 'MA-102',
    'NPC-0833': 'MA-199', 'NPC-0822': 'MA-199', 'NPC-0790': 'MA-199',
    'NPC-0829': 'MA-199', 'NPC-0001': 'MA-199', 'NPC-0847': 'MA-199',
    'NPC-0778': 'MA-199', 'NPC-0748': 'MA-199', 'NPC-0824': 'MA-199',
    'NPC-0799': 'MA-199', 'NPC-0741': 'MA-199', 'NPC-0796': 'MA-199',
    'NPC-0898': 'MA-199', 'NPC-0018': 'MA-199', 'NPC-0894': 'MA-199',
    'NPC-0662': 'MA-199', 'NPC-0936': 'MA-199', 'NPC-0690': 'MA-199',
    'NPC-0958': 'MA-199', 'NPC-0906': 'MA-199',
  }

  for (const npc of npcs) {
    const npcNum = Number.parseInt(npc.id.split('-')[1], 10)
    const realmRank = Number(npc.realmRank ?? 16)
    const factionId = npc.factionId || ''
    const regionId = npc.regionId || ''
    const prefTiers = allowedArtTiers(realmRank)

    const knownArts = (npc.knownArtIds || []).map((aid) => artById[aid]).filter(Boolean)
    knownArts.sort((a, b) => (tierRank[b.tier] ?? 1) - (tierRank[a.tier] ?? 1))

    let neigongId = null
    let qinggongId = null
    const moveIds = []

    for (const a of knownArts) {
      if (a.category === '内功' && neigongId === null) neigongId = a.id
      else if (a.category === '轻功' && qinggongId === null) qinggongId = a.id
      else if (a.category !== '内功' && a.category !== '轻功' && moveIds.length < 4) moveIds.push(a.id)
    }

    const sectArts = martialArts.filter((a) => a.sectId === factionId)
    const genericArts = martialArts.filter((a) => !a.sectId)

    const usedIds = new Set()
    if (neigongId) usedIds.add(neigongId)
    if (qinggongId) usedIds.add(qinggongId)
    for (const mid of moveIds) usedIds.add(mid)

    if (neigongId === null) {
      const ngAllowed = (a) => {
        if (realmRank >= 13) return a.tier === '凡品' || (a.tier === '良品' && a.subTier === '下品')
        if (realmRank >= 10) return a.tier === '凡品' || a.tier === '良品' || (a.tier === '地阶' && a.subTier === '下品')
        return true
      }
      const picked =
        pickFromPool(sectArts.filter((a) => a.category === '内功' && ngAllowed(a)), prefTiers, usedIds, npcNum) ||
        pickFromPool(genericArts.filter((a) => a.category === '内功' && ngAllowed(a)), prefTiers, usedIds, npcNum)
      if (picked) {
        neigongId = picked.id
        usedIds.add(neigongId)
      }
    }

    if (qinggongId === null) {
      const picked =
        pickFromPool(sectArts.filter((a) => a.category === '轻功'), prefTiers, usedIds, npcNum + 1) ||
        pickFromPool(genericArts.filter((a) => a.category === '轻功'), prefTiers, usedIds, npcNum + 1)
      if (picked) {
        qinggongId = picked.id
        usedIds.add(qinggongId)
      }
    }

    const sectMoves = sectArts.filter((a) => a.category !== '内功' && a.category !== '轻功')
    const genericMoves = genericArts.filter((a) => a.category !== '内功' && a.category !== '轻功')
    while (moveIds.length < 4) {
      const seed = npcNum + moveIds.length * 7
      const picked =
        pickFromPool(sectMoves, prefTiers, usedIds, seed) ||
        pickFromPool(genericMoves, prefTiers, usedIds, seed)
      if (!picked) break
      moveIds.push(picked.id)
      usedIds.add(picked.id)
    }

    const equippedArts = {
      neigong: neigongId,
      qinggong: qinggongId,
      move1: moveIds[0] ?? null,
      move2: moveIds[1] ?? null,
      move3: moveIds[2] ?? null,
      move4: moveIds[3] ?? null,
    }
    const allNpcArtIds = Array.from(new Set([...(npc.knownArtIds || []), ...Array.from(usedIds).sort()]))
    const learnedArts = allNpcArtIds
      .filter((aid) => Boolean(artById[aid]))
      .map((aid) => ({
        artId: aid,
        level: Math.min(10, Math.max(1, defaultArtLevel(realmRank, artById[aid].tier))),
        exp: 0,
      }))

    npc.equippedArts = equippedArts
    npc.learnedArts = learnedArts

    const equipped = {
      weapon: null,
      armor: null,
      shoes: null,
      bow: null,
      accessory1: null,
      accessory2: null,
      mount: null,
    }
    for (const oid of npc.ownedArtifactIds || []) {
      if (oid.startsWith('WPN-') && !equipped.weapon) equipped.weapon = oid
      else if (oid.startsWith('ARM-') && !equipped.armor) equipped.armor = oid
      else if (oid.startsWith('BOT-') && !equipped.shoes) equipped.shoes = oid
      else if (oid.startsWith('BOW-') && !equipped.bow) equipped.bow = oid
      else if (oid.startsWith('ACC-')) {
        if (!equipped.accessory1) equipped.accessory1 = oid
        else if (!equipped.accessory2) equipped.accessory2 = oid
      } else if (oid.startsWith('MNT-') && !equipped.mount) equipped.mount = oid
    }

    const fillTier = realmRank <= 9 ? '良阶' : '凡阶'
    const move1Cat = moveIds[0] && artById[moveIds[0]] ? artById[moveIds[0]].category : ''
    const prefWpnType = catToWeaponType[move1Cat] || null

    if (!equipped.weapon) {
      equipped.weapon = pickGearForSlot(weapons, fillTier, factionId, regionId, npcNum, null, prefWpnType)
    }
    if (!equipped.armor) {
      equipped.armor = pickGearForSlot(gearBySlot.armor, fillTier, factionId, regionId, npcNum + 2)
    }
    if (!equipped.shoes) {
      equipped.shoes = pickGearForSlot(gearBySlot.shoes, fillTier, factionId, regionId, npcNum + 3)
    }
    if (!equipped.bow) {
      equipped.bow = pickGearForSlot(gearBySlot.bow, fillTier, factionId, regionId, npcNum + 4)
    }
    if (!equipped.accessory1) {
      equipped.accessory1 = pickGearForSlot(gearBySlot.accessory, fillTier, factionId, regionId, npcNum + 5)
    }
    if (!equipped.accessory2) {
      const excl = equipped.accessory1 ? new Set([equipped.accessory1]) : new Set()
      equipped.accessory2 = pickGearForSlot(gearBySlot.accessory, fillTier, factionId, regionId, npcNum + 6, excl)
    }
    if (!equipped.mount) {
      equipped.mount = pickGearForSlot(mounts, fillTier, factionId, regionId, npcNum + 7)
    }
    npc.equipped = equipped

    const lvMap = Object.fromEntries(learnedArts.map((e) => [e.artId, e.level]))
    let calcHp = 250
    let calcMp = 50
    for (const slotK of ['neigong', 'qinggong']) {
      const aid = equippedArts[slotK]
      if (aid && artById[aid]) {
        const lvVal = lvMap[aid] ?? 1
        const st = artById[aid].levels[lvVal - 1]
        calcHp += st.maxHp || 0
        calcMp += st.maxMp || 0
      }
    }
    for (const iid of Object.values(equipped)) {
      if (iid && itemBonusMap[iid]) {
        calcHp += itemBonusMap[iid].maxHp || 0
        calcMp += itemBonusMap[iid].maxMp || 0
      }
    }

    if (firstClassNgUpgrades[npc.id]) {
      const newNg = firstClassNgUpgrades[npc.id]
      const oldNg = neigongId
      neigongId = newNg
      equippedArts.neigong = newNg
      if (lvMap[newNg] === undefined) {
        learnedArts.push({ artId: newNg, level: 1, exp: 0 })
        lvMap[newNg] = 1
      }
      if (oldNg && artById[oldNg] && artById[newNg]) {
        const oldSt = artById[oldNg].levels[(lvMap[oldNg] ?? 1) - 1]
        const newSt = artById[newNg].levels[(lvMap[newNg] ?? 1) - 1]
        calcHp = calcHp - (oldSt.maxHp || 0) + (newSt.maxHp || 0)
        calcMp = calcMp - (oldSt.maxMp || 0) + (newSt.maxMp || 0)
      }
    }

    const presetHp = npc.stats?.hp || 0
    const presetMp = npc.stats?.mp || 0
    if (realmRank >= 7 && neigongId && artById[neigongId]) {
      const ngLvCur = lvMap[neigongId] ?? 1
      const ngStCur = artById[neigongId].levels[ngLvCur - 1]
      const baseHpNoNg = calcHp - (ngStCur.maxHp || 0)
      const baseMpNoNg = calcMp - (ngStCur.maxMp || 0)
      let bestLv = ngLvCur
      let bestDiff = Number.POSITIVE_INFINITY
      for (let candLv = 1; candLv <= 10; candLv++) {
        const candSt = artById[neigongId].levels[candLv - 1]
        const d =
          Math.abs(baseHpNoNg + (candSt.maxHp || 0) - presetHp + (baseMpNoNg + (candSt.maxMp || 0) - presetMp)) /
          2.0
        if (d < bestDiff) {
          bestDiff = d
          bestLv = candLv
        }
      }
      for (const e of learnedArts) {
        if (e.artId === neigongId) {
          e.level = bestLv
          break
        }
      }
    } else {
      const avgExcess = (calcHp - presetHp + (calcMp - presetMp)) / 2.0
      const dropLv = avgExcess >= 2000 ? 2 : avgExcess >= 1000 ? 1 : 0
      if (dropLv > 0 && neigongId) {
        for (const e of learnedArts) {
          if (e.artId === neigongId) {
            e.level = Math.max(1, e.level - dropLv)
            break
          }
        }
      }
    }

    if (npc.id === 'NPC-0105') {
      equippedArts.neigong = 'MA-018'
      const found = learnedArts.find((e) => e.artId === 'MA-018')
      if (found) found.level = 8
      else learnedArts.push({ artId: 'MA-018', level: 8, exp: 0 })
    } else if (['NPC-0108', 'NPC-0119', 'NPC-0117', 'NPC-0125', 'NPC-0132', 'NPC-0128'].includes(npc.id) && neigongId) {
      const cur = learnedArts.find((e) => e.artId === neigongId)
      if (cur) cur.level = Math.min(10, cur.level + 1)
    } else if (['NPC-0124', 'NPC-0121', 'NPC-0127', 'NPC-0126', 'NPC-0112', 'NPC-0123'].includes(npc.id) && neigongId) {
      const cur = learnedArts.find((e) => e.artId === neigongId)
      if (cur) cur.level = Math.max(1, cur.level - 1)
    }
  }
}

function main() {
  const regions = readJson('regions.json')
  const buildings = readJson('buildings.json')
  const martialArts = readJson('martial_arts.json')
  const weapons = readJson('weapons.json')
  const mounts = readJson('mounts.json')
  const gear = readJson('gear.json')
  const uniqueArtifacts = readJson('uniqueArtifacts.json')
  const npcs = readJson('npcs.json')
  const oldRegistry = readJson('idRegistry.json')

  const bldgById = Object.fromEntries(buildings.map((b) => [b.id, b]))
  const spotById = {}
  for (const b of buildings) {
    if (b.interior?.spots) {
      for (const sp of b.interior.spots) spotById[sp.id] = sp
    }
  }

  // Assemble canonical 44-faction list from existing registry + SECT-33 insert + alias cleanups
  const baseFactions = []
  let hasSect33 = false
  for (const oldFac of oldRegistry.factions) {
    const cleanFac = {
      id: oldFac.id,
      name: oldFac.name,
      shortName: oldFac.shortName,
      isMajorSect: oldFac.isMajorSect,
      isMinorSect: oldFac.isMinorSect,
      sectTier: oldFac.sectTier,
      group: oldFac.group,
      stance: oldFac.stance,
      hqRegionId: oldFac.hqRegionId,
      aliases: [...(oldFac.aliases || [])],
    }
    if (cleanFac.id === 'SECT-17') {
      cleanFac.aliases = ['开封府 / 六扇门（含大内皇城司）', '开封府 / 六扇门（含大内禁军武学）', '六扇门']
    } else if (cleanFac.id === 'ORG-02') {
      cleanFac.aliases = ['北宋朝廷']
    } else if (cleanFac.id === 'SECT-33') {
      hasSect33 = true
    }
    baseFactions.push(cleanFac)
    if (cleanFac.id === 'SECT-32' && !hasSect33 && !oldRegistry.factions.some((f) => f.id === 'SECT-33')) {
      baseFactions.push(SECT_33_DEF)
      hasSect33 = true
    }
  }
  if (!hasSect33) baseFactions.push(SECT_33_DEF)

  const factionByName = {}
  for (const fac of baseFactions) {
    factionByName[fac.name] = fac
    for (const a of fac.aliases) factionByName[a] = fac
  }

  // Sync faction / role from live docs/CHARACTER_COMPENDIUM.md
  const ccLines = fs.readFileSync(path.join(DOCS_DIR, 'CHARACTER_COMPENDIUM.md'), 'utf8').split(/\r?\n/)
  const mdRowByNpcId = {}
  for (const rawLine of ccLines) {
    const s = rawLine.trim()
    const m = s.match(/^\|\s*`(NPC-\d{4})`\s*\|/)
    if (!m) continue
    const cells = s.slice(1, -1).split('|').map((c) => c.trim())
    if (cells.length >= 13) {
      mdRowByNpcId[m[1]] = {
        factionName: cells[5],
        role: cells[6],
      }
    }
  }

  if (Object.keys(mdRowByNpcId).length !== 1047) {
    throw new Error(`Expected 1047 NPCs in docs/CHARACTER_COMPENDIUM.md, got ${Object.keys(mdRowByNpcId).length}`)
  }

  for (const npc of npcs) {
    const row = mdRowByNpcId[npc.id]
    if (!row) throw new Error(`Missing NPC ${npc.id} in docs/CHARACTER_COMPENDIUM.md`)
    const matchedFac = factionByName[row.factionName]
    if (!matchedFac) {
      throw new Error(`Unknown faction ${row.factionName} on ${npc.id}`)
    }
    npc.factionId = matchedFac.id
    npc.factionName = matchedFac.name
    npc.role = row.role
    const [tplUrl, tplAvUrl] = pickTemplateForNpc(npc.factionId, npc.gender, npc.role, npc.category)
    npc.templateUrl = tplUrl
    npc.templateAvatarUrl = tplAvUrl
  }

  // Sync weapons, mounts & gear live from docs/EQUIPMENT_COMPENDIUM.md before NPC loadout calibration
  const initRegionIdSet = new Set(regions.map((r) => r.id))
  const initFactionIdSet = new Set(baseFactions.map((f) => f.id))
  const initArtIdSet = new Set(martialArts.map((m) => m.id))
  syncEquipmentFromDoc(
    weapons,
    mounts,
    gear,
    oldRegistry.locationAliasMap,
    initRegionIdSet,
    initFactionIdSet,
    initArtIdSet,
  )

  // Re-run deterministic NPC loadouts (6 arts + 7 gear slots)
  populateNpcLoadouts(npcs, martialArts, weapons, gear, mounts)

  // Parse docs/MARTIAL_ARTS_SECTS.md
  const sectsMdText = fs.readFileSync(path.join(DOCS_DIR, 'MARTIAL_ARTS_SECTS.md'), 'utf8')
  const sectTableMeta = {}
  const orgTableMeta = {}
  for (const line of sectsMdText.split(/\r?\n/)) {
    const rawLine = line.trim()
    if (rawLine.startsWith('| `SECT-')) {
      const cols = rawLine.slice(1, -1).split('|').map((c) => c.trim())
      if (cols.length >= 10) {
        const m = cols[0].match(/SECT-\d+/)
        if (m) {
          sectTableMeta[m[0]] = {
            tableStance: cols[4],
            hqDisplay: cols[5].replace(/`/g, ''),
            buildingsRaw: cols[6],
            leadersRaw: cols[7],
            highestArtTier: cols[9],
          }
        }
      }
    } else if (rawLine.startsWith('| `ORG-')) {
      const cols = rawLine.slice(1, -1).split('|').map((c) => c.trim())
      if (cols.length >= 6) {
        const m = cols[0].match(/ORG-\d+/)
        if (m) {
          orgTableMeta[m[0]] = {
            hqDisplay: cols[3].replace(/`/g, ''),
            summaryRaw: cols[5],
          }
        }
      }
    }
  }

  const sectSectionMeta = {}
  const secHeadingRe = /^#{3,4}\s+\d+[a-z]?\.\s+`(SECT-\d+)`\s+(.+)$/gm
  const secMatches = Array.from(sectsMdText.matchAll(secHeadingRe))
  for (let i = 0; i < secMatches.length; i++) {
    const mObj = secMatches[i]
    const sid = mObj[1]
    const startPos = mObj.index + mObj[0].length
    const endPos = i + 1 < secMatches.length ? secMatches[i + 1].index : sectsMdText.indexOf('## 五、', startPos)
    const block = sectsMdText.slice(startPos, endPos !== -1 ? endPos : sectsMdText.length)

    let positioning = ''
    let hqDetail = ''
    const featureLines = []
    let inFeatures = false
    const bldgIdsInSec = []

    for (const bline of block.split(/\r?\n/)) {
      const sline = bline.trim()
      if (!sline || sline === '---') continue
      const isSubBullet = bline.startsWith('  ')
      if (!isSubBullet && sline.startsWith('* **门派品级与立场**：')) {
        positioning = sline.split('：', 2)[1].trim()
        inFeatures = false
      } else if (!isSubBullet && sline.startsWith('* **总舵驻地**：')) {
        hqDetail = sline.split('：', 2)[1].replace(/[`*]/g, '').trim()
        inFeatures = false
      } else if (!isSubBullet && sline.startsWith('* **专属') && sline.includes('建筑')) {
        inFeatures = false
        for (const bm of sline.matchAll(/`([a-z0-9_]+)`/g)) {
          if (bldgById[bm[1]] && !bldgIdsInSec.includes(bm[1])) bldgIdsInSec.push(bm[1])
        }
      } else if (!isSubBullet && sline.includes('入门条件') && sline.startsWith('* **')) {
        inFeatures = true
        const afterColon = sline.includes('：') ? sline.split('：', 2)[1].trim() : ''
        if (afterColon) featureLines.push(afterColon.replace(/[`*]/g, ''))
      } else if (!isSubBullet && sline.startsWith('* **')) {
        inFeatures = false
      } else if (isSubBullet) {
        for (const bm of sline.matchAll(/`([a-z0-9_]+)`/g)) {
          if (bldgById[bm[1]] && !bldgIdsInSec.includes(bm[1])) bldgIdsInSec.push(bm[1])
        }
        if (inFeatures) {
          const cleanedSub = sline.replace(/^\*\s*/, '').replace(/[`*]/g, '').trim()
          if (cleanedSub) featureLines.push(cleanedSub)
        }
      }
    }

    sectSectionMeta[sid] = {
      positioning: positioning.replace(/[`*]/g, '').trim(),
      hqDetail,
      buildingIds: bldgIdsInSec,
      entryAndFeatures: featureLines.join(' ').trim(),
    }
  }

  const npcCountByFaction = {}
  const npcsByFaction = {}
  for (const n of npcs) {
    npcCountByFaction[n.factionId] = (npcCountByFaction[n.factionId] || 0) + 1
    if (!npcsByFaction[n.factionId]) npcsByFaction[n.factionId] = []
    npcsByFaction[n.factionId].push(n)
  }

  const artsBySect = {}
  for (const ma of martialArts) {
    if (ma.sectId) {
      if (!artsBySect[ma.sectId]) artsBySect[ma.sectId] = []
      artsBySect[ma.sectId].push(ma.id)
    }
  }

  const weaponsBySect = {}
  for (const wpn of weapons) {
    if (wpn.sectId) {
      if (!weaponsBySect[wpn.sectId]) weaponsBySect[wpn.sectId] = []
      weaponsBySect[wpn.sectId].push(wpn.id)
    }
  }

  const regById = Object.fromEntries(regions.map((r) => [r.id, r]))
  const npcIdSet = new Set(npcs.map((n) => n.id))
  const maById = Object.fromEntries(martialArts.map((m) => [m.id, m]))

  const impGuardRanks = {
    'NPC-0038': 5, 'NPC-0031': 5,
    'NPC-0043': 4, 'NPC-0007': 4, 'NPC-0032': 4, 'NPC-0035': 4, 'NPC-0037': 4,
    'NPC-0154': 3, 'NPC-0033': 3, 'NPC-0042': 3, 'NPC-0252': 3,
    'NPC-0034': 2, 'NPC-0036': 2, 'NPC-0039': 2, 'NPC-0044': 2, 'NPC-0045': 2, 'NPC-0070': 2,
  }

  const rankTitlesMap = {
    'SECT-17': ['役卒巡捕', '捕头都头', '金牌总捕', '御前护卫', '大内总供奉'],
    'SECT-33': ['禁军都头', '禁军指挥使', '四厢都指挥', '三衙都虞候', '殿前都指挥使'],
    'SECT-20': ['外围细作', '红牌武士', '客卿供奉', '征东副总管', '一品堂大总管'],
    'SECT-31': ['外围暗探', '铁林细作', '北院死士', '南院密使', '北院大总管'],
    'SECT-32': ['密宗沙弥', '护法僧', '红衣金刚', '护国法王', '大轮明王'],
    'SECT-02': ['外门帮众', '内门香主', '分舵堂主', '长老副帮主', '帮主总舵主'],
    'SECT-15': ['外门帮众', '内门香主', '分舵堂主', '长老副帮主', '帮主总舵主'],
    'SECT-16': ['外门帮众', '内门香主', '分舵堂主', '长老副帮主', '帮主总舵主'],
    'SECT-26': ['外门帮众', '内门香主', '分舵堂主', '长老副帮主', '帮主总舵主'],
    'SECT-18': ['外围喽啰', '山寨头目', '分寨当家', '护法副首领', '总瓢把子'],
    'SECT-30': ['外围喽啰', '山寨头目', '分寨当家', '护法副首领', '总瓢把子'],
    'SECT-10': ['外宅门客', '内院执事', '房堂主事', '家将大长老', '当代家主'],
    'SECT-13': ['外宅门客', '内院执事', '房堂主事', '家将大长老', '当代家主'],
    'SECT-24': ['随船镖师', '趟子头领', '红旗镖头', '副总镖头', '总镖头'],
    'SECT-22': ['枪堂外门', '内堂枪士', '演武教习', '演武首座', '掌门'],
    'SECT-23': ['外院学徒', '内堂武师', '护院教习', '金牌总教头', '总馆主'],
    'SECT-25': ['外院学徒', '内堂武师', '护院教习', '金牌总教头', '总馆主'],
    'SECT-27': ['外院学徒', '内堂武师', '护院教习', '金牌总教头', '总馆主'],
    'SECT-28': ['外院学徒', '内堂武师', '护院教习', '金牌总教头', '总馆主'],
    'ORG-08': ['皇城侍卫', '王府护卫', '护卫首领', '国相高僧', '大理宗主'],
  }

  const factionsEnriched = []
  for (const fac of baseFactions) {
    const fid = fac.id
    const hqReg = fac.hqRegionId ? regById[fac.hqRegionId] : null
    const members = npcsByFaction[fid] || []

    let leaderIds = []
    let bIds = []
    let summaryTxt = ''
    let featuresTxt = ''
    let hqDisp = ''
    let highestTier = ''
    let stanceMotto = ''

    if (sectTableMeta[fid]) {
      const tmeta = sectTableMeta[fid]
      const smeta = sectSectionMeta[fid] || {}
      leaderIds = (tmeta.leadersRaw.match(/NPC-\d{4}/g) || []).filter((nid) => npcIdSet.has(nid))
      bIds = [...(smeta.buildingIds || [])]
      for (const bm of tmeta.buildingsRaw.matchAll(/`([a-z0-9_]+)`/g)) {
        if (bldgById[bm[1]] && !bIds.includes(bm[1])) bIds.push(bm[1])
      }
      summaryTxt = smeta.positioning || `${fac.sectTier} · ${fac.group}（${tmeta.tableStance}）`
      featuresTxt =
        smeta.entryAndFeatures ||
        (fid === 'SECT-20' ? '常规不可拜入，仅限特殊卧底线或历史奇遇交互。' : summaryTxt)
      hqDisp = smeta.hqDetail || tmeta.hqDisplay
      highestTier = tmeta.highestArtTier
      stanceMotto = tmeta.tableStance
    } else {
      const ometa = orgTableMeta[fid] || {}
      const rawSum = ometa.summaryRaw || ''
      leaderIds = (rawSum.match(/NPC-\d{4}/g) || []).filter((nid) => npcIdSet.has(nid))
      if (leaderIds.length === 0) {
        const sorted = [...members].sort((a, b) => a.realmRank - b.realmRank || a.id.localeCompare(b.id))
        leaderIds = sorted.slice(0, 3).map((x) => x.id)
      }
      if (hqReg) bIds = (hqReg.specialBuildingIds || []).slice(0, 2)
      const cleanOrgSum = rawSum.replace(/[`*]/g, '').trim()
      summaryTxt = `${fac.group} · ${fac.stance}`
      featuresTxt = cleanOrgSum || summaryTxt
      hqDisp = ometa.hqDisplay || (hqReg ? `${hqReg.standardCode} ${hqReg.name}` : '散居天下四十三地')
      const tierOrder = [
        '天阶上品', '天阶中品', '天阶下品',
        '地阶上品', '地阶中品', '地阶下品',
        '良品上品', '良品中品', '良品下品',
        '凡品上品', '凡品中品', '凡品下品',
      ]
      const knownTiers = new Set()
      for (const mNpc of members) {
        for (const aid of mNpc.knownArtIds || []) {
          if (maById[aid]) knownTiers.add(maById[aid].fullTier)
        }
      }
      highestTier = tierOrder.find((tr) => knownTiers.has(tr)) || '庙堂雅艺'
      stanceMotto = fac.stance
    }

    const rankTitles = rankTitlesMap[fid] || ['外门弟子', '内门弟子', '真传弟子', '长老', '掌门']
    const isSectHierarchy = fid.startsWith('SECT-') || fid === 'ORG-08'
    const acceptsOuter = isSectHierarchy
      ? !['SECT-09', 'SECT-10', 'SECT-12', 'SECT-33', 'ORG-08'].includes(fid)
      : false
    const sharedRule = fid === 'SECT-04' ? { sourceSectId: 'SECT-01', maxRank: 2 } : null

    if (isSectHierarchy) {
      for (const member of members) {
        const r = member.role
        let sRank = 1
        if (fid === 'SECT-33') {
          sRank = impGuardRanks[member.id] ?? 1
        } else if (
          leaderIds.includes(member.id) ||
          (/(掌门|方丈|帮主|岛主|总舵主|当代家主|当代堡主|总馆主|大寨主|总镖头|总瓢把子|掌教天师|大总管|大内总供奉|大理国皇帝)/.test(r) &&
            !/(副|夫人|太上|前)/.test(r))
        ) {
          sRank = 5
        } else if (
          /(长老|副掌门|副帮主|副总舵主|副总瓢把子|副总管|师叔|老太爷|太上|扫地老僧|大长老|护国|尊主|前家主|御前|八十万禁军总教头|大总堂主|武林统制|护院总教头|金牌教习|铁桥教头|金牌教头|红旗镖头|国相|洞庭总堂主|天龙寺掌院|退位宗王)/.test(
            r,
          ) ||
          (r.includes('首座') && !r.includes('弟子') && !r.includes('首徒'))
        ) {
          sRank = 4
        } else if (
          /(真传|首席|大师兄|二师兄|三师兄|四师兄|四秀|函谷八友|四大恶人|金牌总捕|金牌捕头|暗器总捕|密侦校尉|密侦统领|青云庄主|金凤庄主|玄霜庄主|庄主|主事|舵主|总管|护法|掌门夫人|少帮主|无崖子首徒|首徒|护卫首领|北境节度|入室弟子|亲传弟子|内堂弟子|内馆武师|走海趟子头领|演武首座|先锋将|分寨大当家|引蛊头领|水寨香主|护马执事|堂主)/.test(
            r,
          )
        ) {
          sRank = 3
        } else if (
          /(内门|执事|香主|捕头|都头|校尉|教头|剑客|剑师|武僧|高士|高僧|红牌武士|勇士|骑射好手|百战|精锐|善堂|匠师|炼蛊师|毒药|二当家|掌柜|神射手|王府护卫|修真弟子|内院道人|内丹弟子|游方道人|行道高士|头领|头目|弄潮好手|边塞刀客|悬壶弟子|驭虫苗卫)/.test(
            r,
          )
        ) {
          sRank = 2
        }
        if (!acceptsOuter && fid !== 'SECT-33' && sRank < 2) {
          sRank = 2
        }
        member.sectRank = sRank
        member.sectRankLabel = rankTitles[sRank - 1]
      }
    } else {
      for (const member of members) {
        member.sectRank = null
        member.sectRankLabel = null
      }
    }

    factionsEnriched.push({
      ...fac,
      stanceMotto,
      hqDisplay: hqDisp,
      leaderNpcIds: leaderIds,
      coreBuildingIds: bIds,
      highestArtTier: highestTier,
      summary: summaryTxt,
      entryAndFeatures: featuresTxt,
      memberCount: npcCountByFaction[fid] || 0,
      martialArtIds: artsBySect[fid] || [],
      weaponIds: weaponsBySect[fid] || [],
      acceptsOuterDisciple: isSectHierarchy ? acceptsOuter : null,
      sharedMartialArtRule: sharedRule,
      rankTitles: isSectHierarchy ? rankTitles : null,
    })
  }

  // Zero-dangling integrity assertions
  const regionIdSet = new Set(regions.map((r) => r.id))
  const factionIdSet = new Set(factionsEnriched.map((f) => f.id))
  const bldgIdSet = new Set(buildings.map((b) => b.id))
  const artIdSet = new Set(martialArts.map((m) => m.id))
  const npcsById = Object.fromEntries(npcs.map((n) => [n.id, n]))

  for (const npc of npcs) {
    if (!regionIdSet.has(npc.regionId)) throw new Error(`Invalid regionId on ${npc.id}`)
    if (!factionIdSet.has(npc.factionId)) throw new Error(`Invalid factionId on ${npc.id}`)
    if (!bldgIdSet.has(npc.assignedBuildingId)) throw new Error(`Invalid assignedBuildingId on ${npc.id}`)
    const bInter = bldgById[npc.assignedBuildingId].interior
    if (bInter && Array.isArray(bInter.spots) && bInter.spots.length > 0) {
      if (!spotById[npc.assignedSpotId]) throw new Error(`Invalid assignedSpotId on ${npc.id}`)
    } else if (npc.assignedSpotId !== null) {
      throw new Error(`Unexpected assignedSpotId on ${npc.id}`)
    }
    for (const aid of npc.knownArtIds || []) {
      if (!artIdSet.has(aid)) throw new Error(`Invalid knownArtId ${aid} on ${npc.id}`)
    }
  }

  // Sync uniqueArtifacts ownerFactionName
  for (const ua of uniqueArtifacts) {
    if (ua.ownerType === 'npc' && ua.ownerNpcId) {
      const owner = npcsById[ua.ownerNpcId]
      if (!owner) throw new Error(`Unknown ownerNpcId ${ua.ownerNpcId} on ${ua.itemId}`)
      ua.ownerFactionName = owner.factionName
    }
  }

  const specialCount = buildings.filter((b) => b.isSpecial).length
  const panoImgCount = buildings.filter((b) => b.isSpecial && b.hasPanoramaImage).length
  const svgFallbackCount = buildings.filter((b) => b.isSpecial && !b.hasPanoramaImage).length

  const idRegistry = {
    ...oldRegistry,
    counts: {
      regions: regions.length,
      majorSects: factionsEnriched.filter((f) => f.isMajorSect).length,
      minorSects: factionsEnriched.filter((f) => f.isMinorSect).length,
      totalSects: factionsEnriched.filter((f) => f.isMajorSect || f.isMinorSect).length,
      otherOrganizations: factionsEnriched.filter((f) => !f.isMajorSect && !f.isMinorSect).length,
      totalFactions: factionsEnriched.length,
      specialBuildings: specialCount,
      specialBuildingsWithImage: panoImgCount,
      specialBuildingsWithSvgFallback: svgFallbackCount,
      cityBaseBuildings: buildings.length - specialCount,
      totalBuildings: buildings.length,
      interiorSubBuildings: Object.keys(spotById).length,
      martialArts: martialArts.length,
      weapons: weapons.length,
      mounts: mounts.length,
      npcs: npcs.length,
      npcsWithAvatar: npcs.filter((n) => n.avatarUrl).length,
      npcsWithFullbody: npcs.filter((n) => n.fullbodyUrl).length,
    },
    factions: factionsEnriched,
    weaponIndex: weapons.map((w) => ({
      id: w.id,
      code: w.code,
      name: w.name,
      fullTier: w.fullTier,
      weaponType: w.weaponType,
      regionId: w.regionId,
      sectId: w.sectId,
    })),
    mountIndex: mounts.map((m) => ({
      id: m.id,
      code: m.code,
      name: m.name,
      fullTier: m.fullTier,
      breedCategory: m.breedCategory,
      baseSpeed: m.baseSpeed,
      regionId: m.regionId,
      sectId: m.sectId,
    })),
  }

  writeJson('idRegistry.json', idRegistry)
  writeJson('martial_arts.json', martialArts)
  writeJson('weapons.json', weapons)
  writeJson('mounts.json', mounts)
  writeJson('gear.json', gear)
  writeJson('uniqueArtifacts.json', uniqueArtifacts)
  writeJson('npcs.json', npcs)

  const pcPath = path.join(DATA_DIR, 'portraitCatalog.json')
  if (fs.existsSync(pcPath)) {
    const pcData = JSON.parse(fs.readFileSync(pcPath, 'utf8'))
    const extraPcIds = new Set([
      'NPC-0264', 'NPC-0275', 'NPC-0286', 'NPC-0305',
      'NPC-0306', 'NPC-0307', 'NPC-0313', 'NPC-0316', 'NPC-0337',
    ])
    pcData.characters = npcs
      .filter((npc) => Number.parseInt(npc.id.split('-')[1], 10) <= 240 || extraPcIds.has(npc.id))
      .map((npc) => {
        const entry = {
          id: npc.id,
          name: npc.name,
          title: npc.title,
          cat: npc.category,
          gender: npc.gender,
          age: npc.age,
          faction: npc.factionName,
          role: npc.role,
          loc: npc.locationLabel,
          realm: npc.realm,
          arts: npc.artsText,
          bio: npc.bio,
        }
        if (npc.avatarUrl) entry.avatarUrl = npc.avatarUrl
        if (npc.fullbodyUrl) entry.fullbodyUrl = npc.fullbodyUrl
        return entry
      })
    const tplDir = path.join(PUBLIC_DIR, 'assets', 'characters', 'templates')
    if (fs.existsSync(tplDir)) {
      pcData.templates = fs
        .readdirSync(tplDir)
        .filter((f) => f.endsWith('.jpg'))
        .sort()
        .map((name) => ({
          id: name.replace(/\.jpg$/, ''),
          url: `/assets/characters/templates/${name}`,
          bytes: fs.statSync(path.join(tplDir, name)).size,
        }))
    }
    writeJson('portraitCatalog.json', pcData)
  }

  const majorCnt = idRegistry.counts.majorSects
  const minorCnt = idRegistry.counts.minorSects
  const orgCnt = idRegistry.counts.otherOrganizations
  console.log(
    `[OK fallback] Summary: ${regions.length} regions | ${majorCnt + minorCnt} sects (${majorCnt} major + ${minorCnt} minor) + ${orgCnt} orgs | ${npcs.length} NPCs`,
  )
}

main()
