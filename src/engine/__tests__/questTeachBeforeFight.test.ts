import { describe, expect, it } from 'vitest'
import { QUEST_REGISTRY } from '../../data/quests'
import { MARTIAL_ART_DB_MAP } from '../../data/gameDb'
import type { QuestEffect, StorySceneDef } from '../../types/quest'
import { getLoadedQuestScenes, preloadAllQuestScenes } from '../quest/sceneRegistry'

/**
 * 「临阵传功」护栏：剧情里师长在战前点名传授的武学，必须在那场战斗之前就真正习得，
 * 不能等打完、任务了结才到手。
 *
 * 判定：按幕序展开每条任务的对白与效果，若某门武学在首场战斗之前已被对白提及，
 * 却直到这场战斗之后才首次 teachMartialArt，即视为违规。
 * 下列白名单为已核对的误报：敌方所用武学、仅作传说提及、或剧情明确「过关后方传」。
 */
const REVIEWED_EXCEPTIONS = new Set([
  'QST-SECT-01-04|MA-100', // 慧通所用《罗汉伏虎功》，晋升后按分脉授予
  'QST-SECT-01-19|MA-106', // 南少林戒铁所用《铁线拳》，切磋后方得
  'QST-SECT-01-SIDE-14|MA-106', // 元通所用《铁线拳》
  'QST-SECT-03-ENTRY|MA-224', // 入门剃度时授予
  'QST-SECT-03-ENTRY|MA-134',
  'QST-SECT-05-10|MA-049', // 秦岳「先过两道铁关」方传
  'QST-SECT-05-12|MA-049', // 同上：剑骨考校通过后方传
  'QST-SECT-05-14|MA-058', // 按剑气两宗分支于结算时择一传授
  'QST-SECT-11-08|MA-089', // 陈抟遗篇仅作传说提及
  'QST-SECT-11-30|MA-039', // 林朝英往事提及
  'QST-TIANBO-BAWANG|MA-037', // 终章献枪
  'QST-CITY-DAMING-BAJI|MA-116', // 结局分支传枪
  'QST-ADV-BABUGANCHAN|MA-097', // 结局顿悟
  'QST-SECT-33-MURONG-ARC-3|MA-025', // 慕容氏所用《参合指》
])

type Ev = { k: 'text' | 'combat' | 'teach'; s: string; art?: string }

function walkEffects(effs: QuestEffect[] | undefined, out: Ev[]) {
  for (const e of effs ?? []) {
    if (e.type === 'startCombat') {
      if (e.introText) out.push({ k: 'text', s: e.introText })
      out.push({ k: 'combat', s: '' })
      walkEffects(e.onWin, out)
    } else if (e.type === 'teachMartialArt') {
      out.push({ k: 'teach', s: e.artId, art: e.artId })
    } else if (e.type === 'toast') {
      out.push({ k: 'text', s: e.text })
    } else if (e.type === 'branch') {
      walkEffects(e.thenEffects, out)
      walkEffects(e.elseEffects, out)
    } else if (e.type === 'openScene' && 'scene' in e) {
      walkScene(e.scene, out)
    }
  }
}

function walkScene(sc: StorySceneDef, out: Ev[]) {
  for (const b of sc.beats ?? []) out.push({ k: 'text', s: b.text })
  for (const c of sc.choices ?? []) {
    out.push({ k: 'text', s: `${c.label} ${c.subLabel ?? ''}` })
    walkEffects(c.effects, out)
  }
  walkEffects(sc.onFinishEffects, out)
}

describe('临阵传功：战前所授武学须当场习得', () => {
  it('不存在「对白先传、打完才给」的武学', async () => {
    await preloadAllQuestScenes()
    const late: string[] = []
    for (const q of QUEST_REGISTRY) {
      const scenes = getLoadedQuestScenes(q.id) ?? {}
      const ev: Ev[] = []
      for (const k of Object.keys(scenes).sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))) {
        walkScene(scenes[k]!, ev)
      }
      ev.forEach((t, ti) => {
        if (t.k !== 'teach') return
        const name = MARTIAL_ART_DB_MAP[t.art!]?.name?.replace(/[《》]/g, '')
        if (!name) return
        if (ev.slice(0, ti).some((x) => x.k === 'teach' && x.art === t.art)) return
        const mi = ev.findIndex((x) => x.k === 'text' && x.s.includes(name))
        if (mi < 0 || mi >= ti) return
        if (!ev.slice(mi, ti).some((x) => x.k === 'combat')) return
        const key = `${q.id}|${t.art}`
        if (!REVIEWED_EXCEPTIONS.has(key)) late.push(`${key}（${name}）`)
      })
    }
    expect(late).toEqual([])
  })
})
