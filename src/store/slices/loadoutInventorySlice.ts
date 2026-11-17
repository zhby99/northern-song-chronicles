import type { StoreSlice } from '../storeTypes'
import {
  FACTION_DB_MAP,
  MARTIAL_ART_DB_MAP,
  UNIQUE_ARTIFACT_MAP,
} from '../../data/gameDb'
import {
  BAG_CATEGORY_METAS,
  canItemFitSlot,
  checkGearEquipRequirements,
  checkMountEquipRequirements,
  checkWeaponEquipRequirements,
  getEffectiveTalents,
  ITEM_DB_MAP,
  normalizeItemTier,
} from '../../data/itemsDb'
import {
  canArtFitSlot,
  calcNeigongTransferGain,
  getArtCombatExpRequired,
  getArtExpRequired,
  getArtTierRank,
  isArtNeigong,
} from '../../data/playerMartialArts'
import type {
  EquipmentSlotKey,
  EquippedArtsMap,
  EquippedSlotsMap,
  LearnedArtEntry,
  MartialArtSlotKey,
  TenArtKey,
} from '../../types/game'
import type { ProtagonistGender } from '../../types/game'
import { getProtagonistGender } from '../../data/protagonistPresets'
import {
  computeItemSellPrice,
  computeShopBuyPrice,
  getRegionLodgingInfo,
  getXiangguoAuctionSchedule,
  getXiangguoMonthlyAuctionLots,
  isItemSellable,
} from '../../engine/economy'
import { syncArtLevelsToExpsAndMilestones } from '../../engine/stats/artsProgression'
import {
  cloneHeroBaseStats,
  deriveHeroEffectiveStats,
  HERO_BASE_CAPS,
  isPlayerInFreeLodgingRegion,
  isPlayerInOwnSectRegion,
} from '../../engine/stats/heroStats'
import {
  getSongDateParts,
  NODE_MAP,
} from '../../engine/world/mapMath'
import { scaleMedicineRecovery } from '../../engine/stats/realmUtils'
import { SPOT_SHOPS_BY_SPOT_ID } from '../../data/spotShops'
import {
  commitTimeAdvance,
  createLogEntry,
  addItemToInventory,
  removeItemFromInventory,
} from '../storeHelpers'

export type LoadoutInventoryKeys =
  | 'completeCharacterCreation'
  | 'setMountKey'
  | 'setQinggongBonus'
  | 'setBagCategory'
  | 'replenishSupplies'
  | 'restAndRecuperate'
  | 'equipItemToSlot'
  | 'unequipSlot'
  | 'acquireWeaponToBag'
  | 'acquireItemToBag'
  | 'equipArtToSlot'
  | 'unequipArtSlot'
  | 'breakthroughLearnedArt'
  | 'transferNeigongProficiency'
  | 'consumeInventoryItem'
  | 'buySpotShopItem'
  | 'sellInventoryItem'
  | 'buyXiangguoAuctionLot'

export const createLoadoutInventorySlice: StoreSlice<LoadoutInventoryKeys> = (set, get) => ({
  completeCharacterCreation: ({ name, portraitId, gender, silver, baseStats, startNodeId }) => {
    const s = get()
    const finalName = name.trim() || '无名少侠'
    const finalGender: ProtagonistGender = gender ?? getProtagonistGender(portraitId)
    const finalSilver = Math.max(0, Math.floor(silver))
    const validStartNode =
      startNodeId && NODE_MAP[startNodeId]?.type === 'city'
        ? NODE_MAP[startNodeId]!
        : NODE_MAP.bianliang
    const cleanBase = cloneHeroBaseStats(baseStats)
    const starterEquipped: EquippedSlotsMap = {
      weapon: null,
      armor: 'ARM-044', // 市井茶博士围裙衫
      shoes: 'BOT-025', // 市井粗布鞋
      bow: null,
      accessory1: 'ACC-052', // 旧铜钱挂坠
      accessory2: 'ACC-049', // 粗麻平安绳
      curio1: null,
      curio2: null,
      mount: null,
    }
    const starterLearnedArts: LearnedArtEntry[] = [
      { artId: 'MA-199', level: 1, exp: 0 }, // 粗浅呼吸法
      { artId: 'MA-217', level: 1, exp: 0 }, // 疾跑赶路步
      { artId: 'MA-201', level: 1, exp: 0 }, // 市井王八拳
    ]
    const starterEquippedArts: EquippedArtsMap = {
      neigong: 'MA-199',
      qinggong: 'MA-217',
      move1: 'MA-201',
      move2: null,
      move3: null,
      move4: null,
    }
    const derived = deriveHeroEffectiveStats(
      cleanBase,
      starterEquipped,
      starterEquippedArts,
      starterLearnedArts,
    )
    set({
      characterCreated: true,
      playerName: finalName,
      playerPortraitId: portraitId,
      playerGender: finalGender,
      playerAge: 12,
      silver: finalSilver,
      baseStats: cleanBase,
      equipped: starterEquipped,
      learnedArts: starterLearnedArts,
      equippedArts: starterEquippedArts,
      inventory: [],
      mountKey: derived.mountKey,
      qinggongBonus: derived.qinggongBonus,
      ridingSkill: derived.ridingSkill,
      agility: derived.agility,
      maxHp: derived.maxHp,
      hp: derived.maxHp,
      maxMp: derived.maxMp,
      mp: derived.maxMp,
      res: derived.res,
      skills: derived.skills,
      artExps: {},
      artMilestoneFlags: [],
      viewMode: 'region',
      activeRegionId: validStartNode.id,
      currentNodeId: validStartNode.id,
      birthplaceId: validStartNode.id,
      cityStayShichens: 0,
      selectedNodeId: null,
      selectedBuildingId: null,
      selectedSpotId: null,
      activeBuildingInteriorId: null,
      logs: [
        createLogEntry(
          1,
          `皇祐二年 · 初入${validStartNode.name}`,
          `年方十二的「${finalName}」身着市井茶博士围裙衫、足踏市井粗布鞋，怀揣旧铜钱挂坠、粗麻平安绳与 ${finalSilver} 两银钱，初通《粗浅呼吸法》《疾跑赶路步》《市井王八拳》，自【${validStartNode.name}】踏入江湖。`,
          true,
          4,
        ),
        ...s.logs,
      ],
    })
  },

  setMountKey: (mountKey) => set({ mountKey }),
  setQinggongBonus: (qinggongBonus) => set({ qinggongBonus }),
  setBagCategory: (activeBagCategory) => set({ activeBagCategory }),

  replenishSupplies: () => {
    const s = get()
    const supplyCost = computeShopBuyPrice(5, s.skills['算术'] ?? 0)
    if (s.silver < supplyCost) {
      set({
        actionFeedback: {
          text: `纹银不足 ${supplyCost} 两，无法采买粮草补给！`,
          tone: 'warn',
        },
        logs: [
          createLogEntry(
            s.dayCount,
            '市集',
            `纹银不足 ${supplyCost} 两，无法补给干粮草料！`,
            true,
            s.shichenIdx,
          ),
          ...s.logs,
        ].slice(0, 60),
      })
      return
    }
    const saved = 5 - supplyCost
    const msg = `花费 ${supplyCost} 两纹银${saved > 0 ? `（算术精算省 ${saved} 两）` : ''}购入行军干粮与草料 +20 份。`
    set({
      silver: s.silver - supplyCost,
      food: s.food + 20,
      actionFeedback: { text: msg, tone: 'success' },
      logs: [createLogEntry(s.dayCount, '补给', msg, false, s.shichenIdx), ...s.logs].slice(
        0,
        60,
      ),
    })
  },

  restAndRecuperate: (days) => {
    const s = get()
    const inOwnSectCity = isPlayerInOwnSectRegion(s.currentNodeId, s.campPos, s.sectState.sectId)
    const isFreeLodging = isPlayerInFreeLodgingRegion(
      s.currentNodeId,
      s.campPos,
      s.sectState.sectId,
      s.birthplaceId,
    )
    const lodgingInfo = getRegionLodgingInfo(s.currentNodeId)
    const dailyRate = isFreeLodging ? 0 : lodgingInfo.dailyCost
    const lodgingCost = dailyRate * days
    if (lodgingCost > 0 && s.silver < lodgingCost) {
      set({
        actionFeedback: {
          text: `${lodgingInfo.tierLabel}调息休养 ${days} 日需纹银 ${lodgingCost} 两（房资 ${lodgingInfo.dailyCost} 两/日），当前银两不足！`,
          tone: 'warn',
        },
      })
      return
    }
    const logTitle = inOwnSectCity
      ? '师门调息休养'
      : isFreeLodging
        ? '故里调息休养'
        : `${lodgingInfo.tierLabel}休养`
    const adv = commitTimeAdvance(set, get, {
      deltaShichen: days * 12,
      silverOverride: s.silver - lodgingCost,
      vitalityFactor: 2,
      buildExtraPatch: (res) => {
        const freeDesc = inOwnSectCity ? '师门免宿费' : '故里免宿费'
        const logMsg = isFreeLodging
          ? `于【${NODE_MAP[s.currentNodeId]?.name ?? s.currentNodeId}】静室调息休养 ${days} 日（${freeDesc} · 恢复系数 2.0×）：气血 +${res.hpGain}（${res.hp}/${s.maxHp}）、内力 +${res.mpGain}（${res.mp}/${s.maxMp}）！`
          : `花费 ${lodgingCost} 两纹银于【${lodgingInfo.tierLabel}】调息休养 ${days} 日（宿费 ${lodgingInfo.dailyCost} 两/日 · 恢复系数 2.0×）：气血 +${res.hpGain}（${res.hp}/${s.maxHp}）、内力 +${res.mpGain}（${res.mp}/${s.maxMp}）！`
        return {
          actionFeedback: {
            text: logMsg,
            tone: 'success',
          },
          logs: [
            createLogEntry(res.dayCount, logTitle, logMsg, false, res.shichenIdx),
            ...res.logs,
          ].slice(0, 60),
        }
      },
    })
    if (adv.overdueSpyAmbush) {
      return
    }
    const after = get()
    if (
      after.viewMode === 'region' &&
      after.currentNodeId === after.activeRegionId &&
      !after.campPos &&
      !after.traveling &&
      !after.activeStoryScene
    ) {
      get().fireLocationTriggersForCurrentSpot({
        regionId: after.activeRegionId,
        buildingId: null,
        spotId: null,
      })
    }
  },

  equipItemToSlot: (itemId, preferredSlot) => {
    const s = get()
    const def = ITEM_DB_MAP[itemId]
    if (!def || !def.equipSlot) return

    const effTalentsForCheck = getEffectiveTalents(s.baseStats.talents, s.equipped)

    if (def.weaponMeta) {
      const reqCheck = checkWeaponEquipRequirements(def.weaponMeta, {
        maxHp: s.maxHp,
        maxMp: s.maxMp,
        agility: s.agility,
        res: s.res,
        ridingSkill: s.ridingSkill,
        skills: s.skills,
        talents: effTalentsForCheck,
      })
      if (!reqCheck.ok) {
        const unmetStr = reqCheck.details
          .filter((d) => !d.met)
          .map((d) => `${d.stat} ${d.current}/${d.min}`)
          .join('、')
        const warnMsg = `难以驾驭${def.weaponMeta.fullTier}神兵【${def.name}】！未达佩备门槛：${unmetStr}`
        set({
          actionFeedback: {
            text: warnMsg,
            tone: 'warn',
          },
          logs: [
            createLogEntry(s.dayCount, '神兵反噬', warnMsg, true, s.shichenIdx),
            ...s.logs,
          ].slice(0, 60),
        })
        return
      }
    }

    if (def.gearMeta) {
      const reqCheck = checkGearEquipRequirements(def.gearMeta, {
        maxHp: s.maxHp,
        maxMp: s.maxMp,
        agility: s.agility,
        res: s.res,
        ridingSkill: s.ridingSkill,
        skills: s.skills,
        talents: effTalentsForCheck,
      })
      if (!reqCheck.ok) {
        const unmetStr = reqCheck.details
          .filter((d) => !d.met)
          .map((d) => `${d.stat} ${d.current}/${d.min}`)
          .join('、')
        const warnMsg = `难以穿佩${def.gearMeta.tier}${def.gearMeta.grade}重宝【${def.name}】！未达披挂门槛：${unmetStr}`
        set({
          actionFeedback: {
            text: warnMsg,
            tone: 'warn',
          },
          logs: [
            createLogEntry(s.dayCount, '宝甲奇珍受限', warnMsg, true, s.shichenIdx),
            ...s.logs,
          ].slice(0, 60),
        })
        return
      }
    }

    if (def.mountMeta) {
      const reqCheck = checkMountEquipRequirements(def.mountMeta, {
        maxHp: s.maxHp,
        maxMp: s.maxMp,
        agility: s.agility,
        res: s.res,
        ridingSkill: s.ridingSkill,
        skills: s.skills,
        talents: effTalentsForCheck,
      })
      if (!reqCheck.ok) {
        const unmetStr = reqCheck.details
          .filter((d) => !d.met)
          .map((d) => `${d.stat} ${d.current}/${d.min}`)
          .join('、')
        const warnMsg = `难以驯服${def.mountMeta.fullTier}烈马【${def.name}】！未达乘骑门槛：${unmetStr}`
        set({
          actionFeedback: {
            text: warnMsg,
            tone: 'warn',
          },
          logs: [
            createLogEntry(s.dayCount, '神驹不受羁勒', warnMsg, true, s.shichenIdx),
            ...s.logs,
          ].slice(0, 60),
        })
        return
      }
    }

    let slot: EquipmentSlotKey = def.equipSlot
    if (preferredSlot && canItemFitSlot(def, preferredSlot)) {
      slot = preferredSlot
    } else if (def.equipSlot === 'accessory1' || def.equipSlot === 'accessory2') {
      if (!s.equipped.accessory1) slot = 'accessory1'
      else if (!s.equipped.accessory2) slot = 'accessory2'
      else slot = preferredSlot ?? 'accessory1'
    } else if (def.equipSlot === 'curio1' || def.equipSlot === 'curio2') {
      if (!s.equipped.curio1) slot = 'curio1'
      else if (!s.equipped.curio2) slot = 'curio2'
      else slot = preferredSlot ?? 'curio1'
    }

    const afterRemove = removeItemFromInventory(s.inventory, itemId, 1)
    if (!afterRemove) return

    const oldEquipId = s.equipped[slot]
    const nextInv = oldEquipId ? addItemToInventory(afterRemove, oldEquipId, 1) : afterRemove

    const nextEquipped: EquippedSlotsMap = {
      ...s.equipped,
      [slot]: itemId,
    }
    const derived = deriveHeroEffectiveStats(
      s.baseStats,
      nextEquipped,
      s.equippedArts,
      s.learnedArts,
      { heavyInjury: Boolean(s.questState.flags.taihang_heavy_injury) },
    )

    set({
      equipped: nextEquipped,
      inventory: nextInv,
      mountKey: derived.mountKey,
      qinggongBonus: derived.qinggongBonus,
      maxHp: derived.maxHp,
      hp: Math.min(derived.maxHp, s.hp),
      maxMp: derived.maxMp,
      mp: Math.min(derived.maxMp, s.mp),
      agility: derived.agility,
      res: derived.res,
      ridingSkill: derived.ridingSkill,
      skills: derived.skills,
      actionFeedback: {
        text: `已佩备【${def.name}】！`,
        tone: 'success',
      },
      logs: [
        createLogEntry(
          s.dayCount,
          '披挂换装',
          `已装备【${def.name}】${oldEquipId && ITEM_DB_MAP[oldEquipId] ? `（替换下 ${ITEM_DB_MAP[oldEquipId].name}）` : ''}。`,
          false,
          s.shichenIdx,
        ),
        ...s.logs,
      ].slice(0, 60),
    })
  },

  unequipSlot: (slot) => {
    const s = get()
    const oldItemId = s.equipped[slot]
    if (!oldItemId) return
    const oldDef = ITEM_DB_MAP[oldItemId]

    const nextEquipped: EquippedSlotsMap = {
      ...s.equipped,
      [slot]: null,
    }
    const nextInv = addItemToInventory(s.inventory, oldItemId, 1)
    const derived = deriveHeroEffectiveStats(
      s.baseStats,
      nextEquipped,
      s.equippedArts,
      s.learnedArts,
      { heavyInjury: Boolean(s.questState.flags.taihang_heavy_injury) },
    )

    set({
      equipped: nextEquipped,
      inventory: nextInv,
      mountKey: derived.mountKey,
      qinggongBonus: derived.qinggongBonus,
      maxHp: derived.maxHp,
      hp: Math.min(derived.maxHp, s.hp),
      maxMp: derived.maxMp,
      mp: Math.min(derived.maxMp, s.mp),
      agility: derived.agility,
      res: derived.res,
      ridingSkill: derived.ridingSkill,
      skills: derived.skills,
      actionFeedback: {
        text: `已卸下【${oldDef?.name ?? oldItemId}】，实战属性已按当前运使武学与其余披挂重算。`,
        tone: 'talk',
      },
      logs: [
        createLogEntry(
          s.dayCount,
          '卸除佩备',
          `已将【${oldDef?.name ?? oldItemId}】收入${oldDef?.category === 'tools' ? '雅器百工' : '行囊杂物'}栏。`,
          false,
          s.shichenIdx,
        ),
        ...s.logs,
      ].slice(0, 60),
    })
  },

  acquireWeaponToBag: (weaponId) => {
    const s = get()
    const def = ITEM_DB_MAP[weaponId]
    if (!def || !def.weaponMeta) return
    if (s.equipped.weapon === weaponId || s.inventory.some((x) => x.itemId === weaponId)) {
      set({
        actionFeedback: {
          text: `【${def.name}】已在少侠随身佩备或行囊之中！`,
          tone: 'talk',
        },
      })
      return
    }
    const nextInv = addItemToInventory(s.inventory, weaponId, 1)
    set({
      inventory: nextInv,
      actionFeedback: {
        text: `已将${def.weaponMeta.fullTier}兵刃【${def.name}】收入【行囊四库 → 行囊杂物】！`,
        tone: 'success',
      },
      logs: [
        createLogEntry(
          s.dayCount,
          '百兵品鉴',
          `自《百兵谱》调取【${def.name}（${def.weaponMeta.fullTier}·${def.weaponMeta.weaponType}）】入囊备用。`,
          true,
          s.shichenIdx,
        ),
        ...s.logs,
      ].slice(0, 60),
    })
  },

  acquireItemToBag: (itemId) => {
    const s = get()
    const def = ITEM_DB_MAP[itemId]
    if (!def) return
    const isEquipped = Object.values(s.equipped).includes(itemId)
    const existingQty = s.inventory.find((x) => x.itemId === itemId)?.qty ?? 0

    if (s.consumedUniqueIds.includes(itemId)) {
      set({
        actionFeedback: {
          text: `【${def.name}】乃天地孤品（举世仅此一件），已由少侠服食炼化，世间再无复本！`,
          tone: 'warn',
        },
      })
      return
    }
    if (!def.stackable && (isEquipped || existingQty > 0)) {
      set({
        actionFeedback: {
          text: `【${def.name}】已在少侠随身佩备或行囊之中！`,
          tone: 'talk',
        },
      })
      return
    }
    if (def.stackable && existingQty >= 99) {
      set({
        actionFeedback: {
          text: `【${def.name}】随身携带数量已达上限（99件）！`,
          tone: 'talk',
        },
      })
      return
    }

    const catLabel =
      BAG_CATEGORY_METAS.find((c) => c.key === def.category)?.label ?? '行囊四库'
    const tierLabel = normalizeItemTier(def.rarity)
    const nextInv = addItemToInventory(s.inventory, itemId, 1)

    set({
      inventory: nextInv,
      actionFeedback: {
        text: `已自《博物图鉴》调取${tierLabel}【${def.name}】收入【行囊四库 → ${catLabel}】！`,
        tone: 'success',
      },
      logs: [
        createLogEntry(
          s.dayCount,
          '博物品鉴',
          `自《皇祐博物图鉴》调取【${def.name}（${tierLabel}·${def.subType}）】×1 收入${catLabel}栏。`,
          true,
          s.shichenIdx,
        ),
        ...s.logs,
      ].slice(0, 60),
    })
  },

  equipArtToSlot: (artId, slot) => {
    const s = get()
    const art = MARTIAL_ART_DB_MAP[artId]
    if (!art || !canArtFitSlot(art, slot)) return
    if (!s.learnedArts.some((x) => x.artId === artId)) return

    const nextEquippedArts: EquippedArtsMap = { ...s.equippedArts }

    // Ensure the same martial art is not duplicated in two slots
    for (const k of Object.keys(nextEquippedArts) as MartialArtSlotKey[]) {
      if (nextEquippedArts[k] === artId) {
        nextEquippedArts[k] = null
      }
    }
    const prevInSlot = s.equippedArts[slot]
    nextEquippedArts[slot] = artId

    const derived = deriveHeroEffectiveStats(
      s.baseStats,
      s.equipped,
      nextEquippedArts,
      s.learnedArts,
      { heavyInjury: Boolean(s.questState.flags.taihang_heavy_injury) },
    )

    set({
      equippedArts: nextEquippedArts,
      qinggongBonus: derived.qinggongBonus,
      maxHp: derived.maxHp,
      hp: Math.min(derived.maxHp, s.hp),
      maxMp: derived.maxMp,
      mp: Math.min(derived.maxMp, s.mp),
      agility: derived.agility,
      res: derived.res,
      actionFeedback: {
        text: `已将【${art.name}】运使入槽！`,
        tone: 'success',
      },
      logs: [
        createLogEntry(
          s.dayCount,
          '武学配招',
          `已将【${art.name}】运使至武学槽位${prevInSlot && prevInSlot !== artId && MARTIAL_ART_DB_MAP[prevInSlot] ? `（替换下 ${MARTIAL_ART_DB_MAP[prevInSlot].name}）` : ''}。`,
          false,
          s.shichenIdx,
        ),
        ...s.logs,
      ].slice(0, 60),
    })
  },

  unequipArtSlot: (slot) => {
    const s = get()
    const oldArtId = s.equippedArts[slot]
    if (!oldArtId) return
    const oldArt = MARTIAL_ART_DB_MAP[oldArtId]

    const nextEquippedArts: EquippedArtsMap = {
      ...s.equippedArts,
      [slot]: null,
    }
    const derived = deriveHeroEffectiveStats(
      s.baseStats,
      s.equipped,
      nextEquippedArts,
      s.learnedArts,
      { heavyInjury: Boolean(s.questState.flags.taihang_heavy_injury) },
    )

    set({
      equippedArts: nextEquippedArts,
      qinggongBonus: derived.qinggongBonus,
      maxHp: derived.maxHp,
      hp: Math.min(derived.maxHp, s.hp),
      maxMp: derived.maxMp,
      mp: Math.min(derived.maxMp, s.mp),
      agility: derived.agility,
      res: derived.res,
      actionFeedback: {
        text: `已散去槽位上的【${oldArt?.name ?? oldArtId}】。`,
        tone: 'talk',
      },
      logs: [
        createLogEntry(
          s.dayCount,
          '收功卸招',
          `已散去槽位上的【${oldArt?.name ?? oldArtId}】。`,
          false,
          s.shichenIdx,
        ),
        ...s.logs,
      ].slice(0, 60),
    })
  },

  breakthroughLearnedArt: (artId) => {
    const s = get()
    const art = MARTIAL_ART_DB_MAP[artId]
    const idx = s.learnedArts.findIndex((x) => x.artId === artId)
    if (!art || idx === -1) return

    const cur = s.learnedArts[idx]!
    if (cur.level >= 10) {
      set({
        actionFeedback: {
          text: `【${art.name}】已臻十重返璞归真之境！`,
          tone: 'success',
        },
      })
      return
    }

    const reqExp = getArtExpRequired(art, cur.level)
    if (cur.exp < reqExp) {
      set({
        actionFeedback: {
          text: `【${art.name}】当前熟练度 ${cur.exp.toLocaleString()}/${reqExp.toLocaleString()}，尚未修满第 ${cur.level} 重火候，请先闭关修炼！`,
          tone: 'warn',
        },
      })
      return
    }

    const reqCombatExp = getArtCombatExpRequired(art, cur.level)
    if (s.combatExp < reqCombatExp) {
      set({
        actionFeedback: {
          text: `战斗经验不足！《${art.cleanName}》突破至第 ${cur.level + 1} 重需消耗 ${reqCombatExp} 点战斗经验（当前 ${s.combatExp} 点），请通过切磋、决战或衙门缉凶积攒！`,
          tone: 'warn',
        },
      })
      return
    }

    const nextLv = cur.level + 1
    const nextExp = nextLv >= 10 ? 0 : Math.max(0, cur.exp - reqExp)
    const nextCombatExp = s.combatExp - reqCombatExp
    const nextLearned = s.learnedArts.map((x) => ({ ...x }))
    nextLearned[idx] = { artId, level: nextLv, exp: nextExp }

    const derived = deriveHeroEffectiveStats(
      s.baseStats,
      s.equipped,
      s.equippedArts,
      nextLearned,
      { heavyInjury: Boolean(s.questState.flags.taihang_heavy_injury) },
    )
    const deltaMaxHp = Math.max(0, derived.maxHp - s.maxHp)
    const deltaMaxMp = Math.max(0, derived.maxMp - s.maxMp)
    const msgText =
      reqCombatExp > 0
        ? `以实战武道印证心法（消耗战斗经验 ${reqCombatExp} 点，余 ${nextCombatExp}），【${art.name}】豁然贯通，破境升至第 ${nextLv} 重！`
        : `水到渠成！【${art.name}】顺利突破至第 ${nextLv} 重！`

    set({
      combatExp: nextCombatExp,
      learnedArts: nextLearned,
      qinggongBonus: derived.qinggongBonus,
      maxHp: derived.maxHp,
      hp: Math.min(derived.maxHp, s.hp + deltaMaxHp),
      maxMp: derived.maxMp,
      mp: Math.min(derived.maxMp, s.mp + deltaMaxMp),
      agility: derived.agility,
      res: derived.res,
      actionFeedback: {
        text: msgText,
        tone: 'success',
      },
      logs: [
        createLogEntry(s.dayCount, '武学破境', msgText, true, s.shichenIdx),
        ...s.logs,
      ].slice(0, 60),
    })
  },

  transferNeigongProficiency: (fromArtId, toArtId) => {
    const s = get()
    if (s.cultivationSession) return
    if (!fromArtId || !toArtId || fromArtId === toArtId) return

    const fromArt = MARTIAL_ART_DB_MAP[fromArtId]
    const toArt = MARTIAL_ART_DB_MAP[toArtId]
    const fromIdx = s.learnedArts.findIndex((x) => x.artId === fromArtId)
    const toIdx = s.learnedArts.findIndex((x) => x.artId === toArtId)
    if (!fromArt || !toArt || fromIdx === -1 || toIdx === -1) return

    if (!isArtNeigong(fromArt) || !isArtNeigong(toArt)) {
      set({
        actionFeedback: { text: '仅限【内功】心法之间进行转修承继！', tone: 'warn' },
      })
      return
    }

    if (getArtTierRank(toArt) <= getArtTierRank(fromArt)) {
      set({
        actionFeedback: {
          text: `仅可向更高阶内功转修：《${toArt.cleanName}》（${toArt.fullTier}）未高于《${fromArt.cleanName}》（${fromArt.fullTier}）。`,
          tone: 'warn',
        },
      })
      return
    }

    const fromEntry = s.learnedArts[fromIdx]!
    const toEntry = s.learnedArts[toIdx]!
    if (toEntry.level >= 10) {
      set({
        actionFeedback: {
          text: `《${toArt.cleanName}》已臻十重圆满之境，无需再行转修。`,
          tone: 'warn',
        },
      })
      return
    }

    const { sourceTotalExp, transferExp } = calcNeigongTransferGain(fromArt, fromEntry)
    if (transferExp <= 0) {
      set({
        actionFeedback: {
          text: `《${fromArt.cleanName}》当前总熟练度不足 2 点（${sourceTotalExp}），无法转修。`,
          tone: 'warn',
        },
      })
      return
    }

    let nextLv = toEntry.level
    let nextExp = toEntry.exp + transferExp
    while (nextLv < 10) {
      const reqExp = getArtExpRequired(toArt, nextLv)
      if (reqExp <= 0 || nextExp < reqExp) break
      const reqCombatExp = getArtCombatExpRequired(toArt, nextLv)
      if (reqCombatExp > 0) {
        // 遇到需战经破境的重数时保留全部溢出熟练度，待后续破境顺延结转
        break
      }
      nextExp -= reqExp
      nextLv += 1
    }
    if (nextLv >= 10) nextExp = 0

    const nextLearned = s.learnedArts.map((x) => ({ ...x }))
    nextLearned[fromIdx] = { artId: fromArtId, level: 1, exp: 0 }
    nextLearned[toIdx] = { artId: toArtId, level: nextLv, exp: nextExp }

    const nextEquippedArts: EquippedArtsMap =
      s.equippedArts.neigong === fromArtId
        ? { ...s.equippedArts, neigong: toArtId }
        : { ...s.equippedArts }

    const derived = deriveHeroEffectiveStats(
      s.baseStats,
      s.equipped,
      nextEquippedArts,
      nextLearned,
      { heavyInjury: Boolean(s.questState.flags.taihang_heavy_injury) },
    )
    const msg = `散功转修！将《${fromArt.cleanName}》总熟练度 ${sourceTotalExp.toLocaleString()} 折半承继 +${transferExp.toLocaleString()} 注入《${toArt.cleanName}》（当前第 ${nextLv} 重），原《${fromArt.cleanName}》总熟练度已清零。`

    set({
      learnedArts: nextLearned,
      equippedArts: nextEquippedArts,
      qinggongBonus: derived.qinggongBonus,
      maxHp: derived.maxHp,
      hp: Math.min(derived.maxHp, Math.max(1, s.hp)),
      maxMp: derived.maxMp,
      mp: Math.min(derived.maxMp, Math.max(0, s.mp)),
      agility: derived.agility,
      res: derived.res,
      actionFeedback: { text: msg, tone: 'success' },
      logs: [
        createLogEntry(s.dayCount, '内功转修', msg, true, s.shichenIdx),
        ...s.logs,
      ].slice(0, 60),
    })
  },

  consumeInventoryItem: (itemId, forceUseEffect = false) => {
    const s = get()
    const def = ITEM_DB_MAP[itemId]
    if (!def) return
    if (def.equipSlot && !forceUseEffect) {
      get().equipItemToSlot(itemId)
      return
    }
    const eff = def.useEffect
    if (!eff) return

    if (eff.onceOnly && s.consumedOnceItemIds.includes(itemId)) {
      set({
        actionFeedback: {
          text:
            def.category === 'scrolls'
              ? `【${def.name}】已然读过，义理通透，无需重复研读。`
              : `【${def.name}】初品已尽得其效，再食已无裨益。`,
          tone: 'warn',
        },
      })
      return
    }

    // 铁律：武学秘籍只能用于初次学会入门（第 1 重），不可靠继续翻阅刷熟练度或重复领属性
    if (eff.learnArtId && MARTIAL_ART_DB_MAP[eff.learnArtId]) {
      const targetArt = MARTIAL_ART_DB_MAP[eff.learnArtId]
      const alreadyLearned = s.learnedArts.some((x) => x.artId === eff.learnArtId)
      if (alreadyLearned) {
        set({
          actionFeedback: {
            text: `少侠已通晓【${targetArt.name}】入门心法！秘籍仅作初窥门径之用，无法靠重复翻阅提升熟练度，请赴【披挂与武学】按日闭关精修。`,
            tone: 'warn',
          },
        })
        return
      }
    }

    // Consume stackable medicine/food/consumable tools; keep non-stackable books/scrolls & durable curio tools
    const shouldConsume = def.category === 'medicine' || def.stackable
    const nextInv = shouldConsume
      ? (removeItemFromInventory(s.inventory, itemId, 1) ?? s.inventory)
      : s.inventory

    const nextBaseStats = cloneHeroBaseStats(s.baseStats)
    const nextLearnedArts = s.learnedArts.map((x) => ({ ...x }))
    let nextFood = s.food
    const notes: string[] = []

    const deltaShichen =
      def.category === 'tools' || def.category === 'scrolls' ? 1 : 0

    if (eff.learnArtId && MARTIAL_ART_DB_MAP[eff.learnArtId]) {
      const targetArt = MARTIAL_ART_DB_MAP[eff.learnArtId]
      nextLearnedArts.push({ artId: eff.learnArtId, level: 1, exp: 0 })
      notes.push(`初窥门径，习得武学【${targetArt.name}（第1重）】`)
    }
    const isPermanentElixir =
      def.category === 'medicine' && (def.rarity === '天阶' || def.rarity === '地阶')
    if (isPermanentElixir) {
      if (eff.maxHp) {
        nextBaseStats.maxHp = (nextBaseStats.maxHp ?? 0) + eff.maxHp
        notes.push(`气血上限永久 +${eff.maxHp}`)
      }
      if (eff.maxMp) {
        nextBaseStats.maxMp = (nextBaseStats.maxMp ?? 0) + eff.maxMp
        notes.push(`内力上限永久 +${eff.maxMp}`)
      }
      if (eff.agi) {
        nextBaseStats.agility = (nextBaseStats.agility ?? 0) + eff.agi
        notes.push(`身法永久 +${eff.agi}`)
      }
      if (eff.res) {
        nextBaseStats.res = (nextBaseStats.res ?? 0) + eff.res
        notes.push(`抗性永久 +${eff.res}`)
      }
    }
    const touchedArtKeys: TenArtKey[] = []
    if (eff.riding) {
      const prev = nextBaseStats.ridingSkill
      nextBaseStats.ridingSkill = Math.min(HERO_BASE_CAPS.ridingSkill, prev + eff.riding)
      touchedArtKeys.push('骑术')
      notes.push(
        nextBaseStats.ridingSkill > prev
          ? `【骑术】+${nextBaseStats.ridingSkill - prev}`
          : `【骑术】根基已满 (${HERO_BASE_CAPS.ridingSkill})`,
      )
    }
    if (eff.skillGain) {
      const [sk, gain] = eff.skillGain
      const prev = nextBaseStats.skills[sk] ?? 40
      nextBaseStats.skills[sk] = Math.min(HERO_BASE_CAPS.civilSkill, prev + gain)
      touchedArtKeys.push(sk as TenArtKey)
      notes.push(
        nextBaseStats.skills[sk] > prev
          ? `【${sk}】+${nextBaseStats.skills[sk] - prev}`
          : `【${sk}】根基已满 (${HERO_BASE_CAPS.civilSkill})`,
      )
    }
    if (eff.skillsGain) {
      for (const [sk, gain] of Object.entries(eff.skillsGain)) {
        const prev = nextBaseStats.skills[sk] ?? 40
        nextBaseStats.skills[sk] = Math.min(HERO_BASE_CAPS.civilSkill, prev + gain)
        touchedArtKeys.push(sk as TenArtKey)
        notes.push(
          nextBaseStats.skills[sk] > prev
            ? `【${sk}】+${nextBaseStats.skills[sk] - prev}`
            : `【${sk}】根基已满 (${HERO_BASE_CAPS.civilSkill})`,
        )
      }
    }
    if (eff.wuxing) {
      const prev = nextBaseStats.talents.悟性
      nextBaseStats.talents.悟性 = Math.min(HERO_BASE_CAPS.talent, prev + eff.wuxing)
      notes.push(
        nextBaseStats.talents.悟性 > prev
          ? `【悟性】永久 +${nextBaseStats.talents.悟性 - prev}`
          : `【悟性】天赋已满 (${HERO_BASE_CAPS.talent})`,
      )
    }
    const syncedArts =
      touchedArtKeys.length > 0
        ? syncArtLevelsToExpsAndMilestones({
            baseStats: nextBaseStats,
            artExps: s.artExps,
            artMilestoneFlags: s.artMilestoneFlags,
            keysToSync: touchedArtKeys,
          })
        : {
            artExps: s.artExps,
            artMilestoneFlags: s.artMilestoneFlags,
            milestoneNotes: [],
          }
    if (syncedArts.milestoneNotes.length > 0) {
      notes.push(...syncedArts.milestoneNotes)
    }
    if (eff.food) {
      nextFood += eff.food
      notes.push(`粮草 +${eff.food}日份`)
    }

    const derived = deriveHeroEffectiveStats(
      nextBaseStats,
      s.equipped,
      s.equippedArts,
      nextLearnedArts,
      { heavyInjury: Boolean(s.questState.flags.taihang_heavy_injury) },
    )

    const bonusMaxHpNow = isPermanentElixir ? (eff.maxHp ?? 0) : 0
    const bonusMaxMpNow = isPermanentElixir ? (eff.maxMp ?? 0) : 0
    let nextHp = Math.min(derived.maxHp, s.hp + bonusMaxHpNow)
    let nextMp = Math.min(derived.maxMp, s.mp + bonusMaxMpNow)

    if (eff.hp) {
      const healHp =
        def.category === 'medicine'
          ? scaleMedicineRecovery(eff.hp, derived.maxHp, derived.maxMp)
          : eff.hp
      nextHp = Math.min(derived.maxHp, nextHp + healHp)
      notes.push(`气血恢复 +${healHp}`)
    }
    if (eff.mp) {
      const healMp =
        def.category === 'medicine'
          ? scaleMedicineRecovery(eff.mp, derived.maxHp, derived.maxMp)
          : eff.mp
      nextMp = Math.min(derived.maxMp, nextMp + healMp)
      notes.push(`内力回复 +${healMp}`)
    }
    if (eff.curePoison) {
      notes.push('涤清奇毒滞气')
    }
    if (eff.learnArtHint && !eff.learnArtId) {
      notes.push(eff.learnArtHint)
    }

    const logTag =
      def.category === 'scrolls'
        ? '展卷研读'
        : def.category === 'tools'
          ? '雅器修习'
          : '服食丹膳'

    const nextConsumedUnique =
      shouldConsume && UNIQUE_ARTIFACT_MAP[itemId] && !s.consumedUniqueIds.includes(itemId)
        ? [...s.consumedUniqueIds, itemId]
        : s.consumedUniqueIds

    const nextConsumedOnce =
      eff.onceOnly && !s.consumedOnceItemIds.includes(itemId)
        ? [...s.consumedOnceItemIds, itemId]
        : s.consumedOnceItemIds

    commitTimeAdvance(set, get, {
      deltaShichen,
      chargeForeignLodging: true,
      vitalityFactor: 0,
      hpOverride: nextHp,
      maxHpOverride: derived.maxHp,
      mpOverride: nextMp,
      maxMpOverride: derived.maxMp,
      buildExtraPatch: (adv) => {
        const finalNotes =
          adv.lodgingFee > 0 ? [...notes, `异乡宿费 -${adv.lodgingFee}两`] : notes
        return {
          inventory: nextInv,
          baseStats: nextBaseStats,
          artExps: syncedArts.artExps,
          artMilestoneFlags: syncedArts.artMilestoneFlags,
          consumedUniqueIds: nextConsumedUnique,
          consumedOnceItemIds: nextConsumedOnce,
          learnedArts: nextLearnedArts,
          mountKey: derived.mountKey,
          qinggongBonus: derived.qinggongBonus,
          hp: nextHp,
          maxHp: derived.maxHp,
          mp: nextMp,
          maxMp: derived.maxMp,
          agility: derived.agility,
          res: derived.res,
          ridingSkill: derived.ridingSkill,
          food: nextFood,
          skills: derived.skills,
          actionFeedback: {
            text: `${logTag}【${def.name}】：${finalNotes.join('，')}。`,
            tone: 'success',
          },
          logs: [
            createLogEntry(
              adv.dayCount,
              logTag,
              `使用【${def.name}】：${finalNotes.join('，')}。`,
              true,
              adv.shichenIdx,
            ),
            ...adv.logs,
          ].slice(0, 60),
        }
      },
    })
  },

  buySpotShopItem: (spotId, itemId, qty = 1) => {
    const s = get()
    const shop = SPOT_SHOPS_BY_SPOT_ID[spotId]
    if (!shop) return

    if (s.campPos || s.currentNodeId !== shop.regionId) {
      const regName = NODE_MAP[shop.regionId]?.name ?? shop.regionId
      set({
        actionFeedback: {
          text: `须亲临【${regName}】方可在【${shop.title}】采办交易！`,
          tone: 'warn',
        },
      })
      return
    }

    if (shop.requiredSectId && s.sectState.sectId !== shop.requiredSectId) {
      const reqSectName = FACTION_DB_MAP[shop.requiredSectId]?.name ?? shop.requiredSectId
      set({
        actionFeedback: {
          text: `【${shop.title}】乃内部甲仗重地，仅限【${reqSectName}】弟子/成员采办！`,
          tone: 'warn',
        },
      })
      return
    }

    const entry = shop.items.find((x) => x.itemId === itemId)
    const itemDef = ITEM_DB_MAP[itemId]
    if (!entry || !itemDef) return

    const safeQty = Math.max(1, Math.floor(Number.isFinite(qty) ? qty : 1))
    const arithSkill = s.skills['算术'] ?? 0
    const unitPrice = computeShopBuyPrice(entry.price, arithSkill)
    const totalCost = unitPrice * safeQty
    const totalSaved = Math.max(0, entry.price * safeQty - totalCost)

    if (s.silver < totalCost) {
      set({
        actionFeedback: {
          text: `纹银不足！购置 ${safeQty} 份【${itemDef.name}】需 ${totalCost.toLocaleString()} 两银子（当前仅余 ${s.silver.toLocaleString()} 两）。`,
          tone: 'warn',
        },
      })
      return
    }

    const nextSilver = s.silver - totalCost
    const nextInv = addItemToInventory(s.inventory, itemId, safeQty)
    const savedNote = totalSaved > 0 ? `（算术议价省 ${totalSaved.toLocaleString()} 两）` : ''
    const msg = `在【${shop.title}】花费 ${totalCost.toLocaleString()} 两银子${savedNote}购得【${itemDef.name}】×${safeQty}，已收入行囊。`

    set({
      silver: nextSilver,
      inventory: nextInv,
      actionFeedback: { text: msg, tone: 'success' },
      logs: [
        createLogEntry(s.dayCount, '商贸采办', msg, false, s.shichenIdx),
        ...s.logs,
      ].slice(0, 60),
    })
  },

  sellInventoryItem: (itemId, qty = 1) => {
    const s = get()
    if (s.campPos || s.traveling) {
      set({
        actionFeedback: {
          text: '荒郊旷野并无商贾牙行，请先抵达城池市集再行变卖折银！',
          tone: 'warn',
        },
      })
      return
    }

    const itemDef = ITEM_DB_MAP[itemId]
    if (!itemDef || !isItemSellable(itemId, itemDef)) {
      set({
        actionFeedback: {
          text: `【${itemDef?.name ?? itemId}】乃关键信物或不可售奇物，严禁向商铺变卖！`,
          tone: 'warn',
        },
      })
      return
    }

    const ownedQty = s.inventory.find((x) => x.itemId === itemId)?.qty ?? 0
    if (ownedQty <= 0) {
      set({
        actionFeedback: {
          text: `行囊中并无【${itemDef.name}】可供变卖！`,
          tone: 'warn',
        },
      })
      return
    }

    const safeQty = Math.max(1, Math.min(ownedQty, Math.floor(Number.isFinite(qty) ? qty : 1)))
    const removed = removeItemFromInventory(s.inventory, itemId, safeQty)
    if (!removed) return

    const arithSkill = s.skills['算术'] ?? 0
    const unitSell = computeItemSellPrice(itemDef, arithSkill)
    const baseUnitSell = computeItemSellPrice(itemDef, 0)
    const totalGain = unitSell * safeQty
    const arithExtra = Math.max(0, totalGain - baseUnitSell * safeQty)
    const extraNote = arithExtra > 0 ? `（含算术估价溢价 +${arithExtra} 两）` : ''
    const regionName = NODE_MAP[s.currentNodeId]?.name ?? s.currentNodeId
    const msg = `于【${regionName}】商肆折卖【${itemDef.name}】×${safeQty}，实收纹银 +${totalGain.toLocaleString()} 两${extraNote}（现银 ${(s.silver + totalGain).toLocaleString()} 两）。`

    set({
      silver: s.silver + totalGain,
      inventory: removed,
      actionFeedback: { text: msg, tone: 'success' },
      logs: [
        createLogEntry(s.dayCount, '典卖折银', msg, false, s.shichenIdx),
        ...s.logs,
      ].slice(0, 60),
    })
  },

  buyXiangguoAuctionLot: (itemId) => {
    const s = get()
    if (s.campPos || s.currentNodeId !== 'bianliang') {
      set({
        actionFeedback: {
          text: '须亲临东京开封府【大相国寺 · 万姓交易雅市】方可举牌竞拍年度奇珍！',
          tone: 'warn',
        },
      })
      return
    }

    const schedule = getXiangguoAuctionSchedule(s.dayCount)
    if (!schedule.isOpen) {
      const dateParts = getSongDateParts(s.dayCount, s.shichenIdx)
      set({
        actionFeedback: {
          text: `大相国寺万姓雅市奇珍拍场每年仅于【六月】开市一整个月（当前为${dateParts.monthName}，距下次开拍尚余 ${schedule.monthsUntilOpen} 个月）。`,
          tone: 'warn',
        },
      })
      return
    }

    const yearKey = `Y${schedule.yearIdx}`
    const boughtThisYear = s.auctionBoughtByMonth[yearKey] ?? []
    if (boughtThisYear.includes(itemId)) {
      set({
        actionFeedback: {
          text: '该件拍品本年已被少侠竞得落槌，请静候来年六月相国寺雅集开市！',
          tone: 'talk',
        },
      })
      return
    }

    const arithSkill = s.skills['算术'] ?? 0
    const lots = getXiangguoMonthlyAuctionLots(
      schedule.yearIdx,
      arithSkill,
      new Set(s.consumedUniqueIds),
    )
    const lot = lots.find((l) => l.itemId === itemId)
    if (!lot) {
      set({
        actionFeedback: {
          text: '本年六月拍品单中未见此物，或已随年度轮换下架。',
          tone: 'warn',
        },
      })
      return
    }

    const isEquipped = Object.values(s.equipped).includes(itemId)
    const existingQty = s.inventory.find((x) => x.itemId === itemId)?.qty ?? 0
    if (!lot.item.stackable && (isEquipped || existingQty > 0)) {
      set({
        actionFeedback: {
          text: `【${lot.item.name}】已在少侠随身佩备或行囊之中，无需重复竞买！`,
          tone: 'talk',
        },
      })
      return
    }

    if (s.silver < lot.finalPrice) {
      set({
        actionFeedback: {
          text: `纹银不足！竞得【${lot.item.name}】需落槌价 ${lot.finalPrice.toLocaleString()} 两纹银（当前 ${s.silver.toLocaleString()} 两）。`,
          tone: 'warn',
        },
      })
      return
    }

    const nextInv = addItemToInventory(s.inventory, itemId, 1)
    const savedNote =
      lot.discountSaved > 0 ? `（算术压价省 ${lot.discountSaved.toLocaleString()} 两）` : ''
    const msg = `于【大相国寺万姓雅市 · 六月年度拍场】豪掷 ${lot.finalPrice.toLocaleString()} 两纹银${savedNote}一槌竞得${lot.lotCategoryLabel}【${lot.item.name}】！`

    set({
      silver: s.silver - lot.finalPrice,
      inventory: nextInv,
      auctionBoughtByMonth: {
        ...s.auctionBoughtByMonth,
        [yearKey]: [...boughtThisYear, itemId],
      },
      actionFeedback: { text: msg, tone: 'success' },
      logs: [
        createLogEntry(s.dayCount, '相国寺竞拍', msg, true, s.shichenIdx),
        ...s.logs,
      ].slice(0, 60),
    })
  },
})
