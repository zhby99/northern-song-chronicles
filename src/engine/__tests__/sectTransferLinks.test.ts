import { describe, expect, it } from 'vitest'
import { FACTION_DB_MAP } from '../../data/gameDb'
import { QUEST_MAP } from '../../data/quests'
import { OFFICIAL_TRANSFER_SOURCE_SECT_IDS, SECT_ENTRY_TRANSFER_SOURCES } from '../sect/exclusivity'
import { SECT_TRANSFER_LINKS } from '../sect/transferLinks'

describe('SECT_TRANSFER_LINKS (门派任务树可转投提示)', () => {
  it('references existing sects and a via-quest that belongs to the source sect tree', () => {
    for (const link of SECT_TRANSFER_LINKS) {
      expect(FACTION_DB_MAP[link.fromSectId], link.fromSectId).toBeDefined()
      expect(FACTION_DB_MAP[link.toSectId], link.toSectId).toBeDefined()
      expect(link.fromSectId).not.toBe(link.toSectId)
      const via = QUEST_MAP[link.viaQuestId]
      expect(via, link.viaQuestId).toBeDefined()
      expect(via!.factionId).toBe(link.fromSectId)
    }
  })

  it('only advertises transfers the exclusivity rules actually allow', () => {
    for (const link of SECT_TRANSFER_LINKS) {
      const allowed =
        OFFICIAL_TRANSFER_SOURCE_SECT_IDS.has(link.fromSectId) ||
        (SECT_ENTRY_TRANSFER_SOURCES[link.toSectId] ?? []).includes(link.fromSectId)
      expect(allowed, `${link.fromSectId} -> ${link.toSectId}`).toBe(true)
    }
  })
})
