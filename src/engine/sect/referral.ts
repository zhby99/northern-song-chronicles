import { SECT_SYSTEMS_DB } from '../../data/gameDb'

/**
 * Referral bribe mapping compiled from docs/MARTIAL_ARTS_SECTS.md -> sectSystems.json:
 * - SECT-26 钱塘怒潮帮 -> ITM-MSC-003 -> SECT-16 江淮漕帮
 * - SECT-25 齐鲁查拳馆 -> ITM-MSC-004 -> SECT-23 沧州八极门
 * - SECT-27 岭南洪门武馆 -> ITM-MSC-005 -> SECT-24 闽海镇远镖局
 */
export interface ReferralBribeConfig {
  sourceSectId: string
  targetSectId: string
  targetSectName: string
  itemId: string
  itemName: string
  costSilver: number
  elderTitleHint: string
}

export const REFERRAL_BRIBE_BY_SOURCE_SECT: Record<string, ReferralBribeConfig> = Object.fromEntries(
  SECT_SYSTEMS_DB.referralBribes.map((row) => [
    row.fromSectId,
    {
      sourceSectId: row.fromSectId,
      targetSectId: row.targetSectId,
      targetSectName: row.targetSectName,
      itemId: row.itemId,
      itemName: row.itemName,
      costSilver: row.costSilver,
      elderTitleHint: row.elderRoleHint,
    },
  ]),
)

export const REFERRAL_REQ_BY_TARGET_SECT: Record<string, ReferralBribeConfig> = Object.fromEntries(
  Object.values(REFERRAL_BRIBE_BY_SOURCE_SECT).map((cfg) => [cfg.targetSectId, cfg]),
)

export const KAIFENG_RECOMMENDATION_ITEM_ID = 'ITM-MSC-006'
export const DAMING_RECOMMENDATION_ITEM_ID = 'ITM-MSC-007'
export const BAJI_IRON_TOKEN_ITEM_ID = 'ITM-MSC-008'
export const CHANGSHAN_JOINT_RECOMMENDATION_ITEM_ID = 'ITM-MSC-013'
