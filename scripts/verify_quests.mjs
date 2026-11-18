import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { createServer } from 'vite'

const ROOT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

function resolvePublicAssetPath(url) {
  return path.join(ROOT_DIR, 'public', url.replace(/^\/+/, ''))
}

function collectTransferSources(cond, negated, targetSectId, outSet) {
  if (!cond || typeof cond !== 'object') return
  if (cond.type === 'not') {
    collectTransferSources(cond.condition, !negated, targetSectId, outSet)
    return
  }
  if (!negated && cond.type === 'notInAnySect' && cond.allowTransferFromSectId) {
    outSet.add(cond.allowTransferFromSectId)
  }
  if (!negated && cond.type === 'inSect' && cond.sectId && cond.sectId !== targetSectId) {
    outSet.add(cond.sectId)
  }
  if ((cond.type === 'all' || cond.type === 'any') && Array.isArray(cond.conditions)) {
    for (const sub of cond.conditions) {
      collectTransferSources(sub, negated, targetSectId, outSet)
    }
  }
}

function checkEntryTalentCaps(node, ctxPath, errors) {
  if (Array.isArray(node)) {
    node.forEach((item, idx) => checkEntryTalentCaps(item, `${ctxPath}[${idx}]`, errors))
    return
  }
  if (!node || typeof node !== 'object') return
  if (node.type === 'talentAtLeast' && typeof node.min === 'number' && node.min > 90) {
    errors.push(
      `${ctxPath}: 入门任务禁止出现高于创角上限 90 的 talentAtLeast (${String(node.key)} >= ${node.min})`,
    )
  }
  for (const [k, v] of Object.entries(node)) {
    checkEntryTalentCaps(v, `${ctxPath}.${k}`, errors)
  }
}

const server = await createServer({
  logLevel: 'error',
  server: { middlewareMode: true },
})

try {
  const { QUEST_REGISTRY } = await server.ssrLoadModule('/src/data/quests/index.ts')
  const { preloadAllQuestScenes, getLoadedQuestScenes } = await server.ssrLoadModule(
    '/src/engine/quest/sceneRegistry.ts',
  )
  const { validateAllRegisteredQuests } = await server.ssrLoadModule('/src/engine/questEngine.ts')
  const { SECT_RULES_BY_ID } = await server.ssrLoadModule('/src/engine/sect/rules.ts')
  const { SECT_ENTRY_TRANSFER_SOURCES } = await server.ssrLoadModule('/src/engine/sect/exclusivity.ts')

  await preloadAllQuestScenes()
  const baseResult = validateAllRegisteredQuests(QUEST_REGISTRY)
  const errors = [...baseResult.errors]

  const missingCgPath = path.join(ROOT_DIR, 'docs', 'MISSING_QUEST_ILLUSTRATIONS.md')
  const missingCgMd = fs.existsSync(missingCgPath) ? fs.readFileSync(missingCgPath, 'utf8') : ''

  let cgCheckedCount = 0
  let portraitCheckedCount = 0

  const checkCgUrl = (ctxPath, url) => {
    if (!url) return
    cgCheckedCount += 1
    if (!fs.existsSync(resolvePublicAssetPath(url)) && !missingCgMd.includes(url)) {
      errors.push(
        `${ctxPath}: 剧情插画 "${url}" 既未落盘到 public/，也未登记于 docs/MISSING_QUEST_ILLUSTRATIONS.md`,
      )
    }
  }

  const checkPortraitUrl = (ctxPath, url) => {
    if (!url) return
    portraitCheckedCount += 1
    if (!fs.existsSync(resolvePublicAssetPath(url))) {
      errors.push(`${ctxPath}: 自定义立绘/头像路径不存在 "${url}"`)
    }
  }

  const walkEffects = (ctxPath, effects) => {
    if (!Array.isArray(effects)) return
    effects.forEach((eff, idx) => {
      if (!eff || typeof eff !== 'object') return
      const ePath = `${ctxPath}[${idx}]`
      if (eff.type === 'openScene' && 'scene' in eff && eff.scene) {
        walkScene(`${ePath}.inlineScene`, eff.scene)
      } else if (eff.type === 'spawnDynamicActor' && eff.actor) {
        checkPortraitUrl(`${ePath}.actor.portraitUrl`, eff.actor.portraitUrl)
        checkPortraitUrl(`${ePath}.actor.avatarUrl`, eff.actor.avatarUrl)
      } else if (eff.type === 'startCombat') {
        const checkCombatSpec = (specPath, spec) => {
          if (spec && spec.kind === 'custom' && spec.npc) {
            checkPortraitUrl(`${specPath}.portraitUrl`, spec.npc.portraitUrl)
            checkPortraitUrl(`${specPath}.avatarUrl`, spec.npc.avatarUrl)
          }
        }
        checkCombatSpec(`${ePath}.opponent`, eff.opponent)
        eff.extraOpponents?.forEach((op, i) => checkCombatSpec(`${ePath}.extraOpponents[${i}]`, op))
        eff.allies?.forEach((al, i) => checkCombatSpec(`${ePath}.allies[${i}]`, al))
        walkEffects(`${ePath}.onWin`, eff.onWin)
        walkEffects(`${ePath}.onLose`, eff.onLose)
        walkEffects(`${ePath}.onEscape`, eff.onEscape)
        walkEffects(`${ePath}.onDraw`, eff.onDraw)
      } else if (eff.type === 'branch') {
        walkEffects(`${ePath}.thenEffects`, eff.thenEffects)
        walkEffects(`${ePath}.elseEffects`, eff.elseEffects)
      }
    })
  }

  const walkScene = (ctxPath, scene) => {
    if (!scene || typeof scene !== 'object') return
    checkCgUrl(`${ctxPath}.illustrationUrl`, scene.illustrationUrl)
    scene.beats?.forEach((beat, bi) => {
      const bPath = `${ctxPath}.beats[${bi}]`
      checkCgUrl(`${bPath}.illustrationUrl`, beat.illustrationUrl)
      if (typeof beat.text === 'string' && beat.text.includes('皇祐二年')) {
        errors.push(`${bPath}: 对白硬编码了“皇祐二年”，请改用 {reignYear} 动态插值`)
      }
      if (beat.speaker?.kind === 'custom') {
        checkPortraitUrl(`${bPath}.speaker.portraitUrl`, beat.speaker.portraitUrl)
        checkPortraitUrl(`${bPath}.speaker.avatarUrl`, beat.speaker.avatarUrl)
      }
    })
    scene.choices?.forEach((ch, ci) => {
      walkEffects(`${ctxPath}.choices[${ci}].effects`, ch.effects)
    })
    walkEffects(`${ctxPath}.onFinishEffects`, scene.onFinishEffects)
  }

  const questById = new Map(QUEST_REGISTRY.map((q) => [q.id, q]))
  const transferSourcesBySect = {}

  for (const q of QUEST_REGISTRY) {
    if (typeof q.summary === 'string' && q.summary.includes('皇祐二年')) {
      errors.push(`[${q.id}].summary: 摘要硬编码了“皇祐二年”，请改用 {reignYear} 动态插值`)
    }

    if (q.category === 'sect_entry') {
      if (!q.factionId) {
        errors.push(`[${q.id}]: category 为 sect_entry 时必须声明 factionId`)
      } else if (SECT_RULES_BY_ID[q.factionId]?.entryQuestId !== q.id) {
        errors.push(
          `[${q.id}]: 门派 "${q.factionId}" 在 src/engine/sect/rules.ts 中的 entryQuestId 未绑定为 "${q.id}"`,
        )
      }
    }

    const entryMatch = /^QST-(SECT-\d+)-ENTRY$/.exec(q.id)
    const loadedScenes = getLoadedQuestScenes(q.id) ?? q.scenes ?? {}
    if (entryMatch) {
      const targetSectId = entryMatch[1]
      const foundSet = new Set()
      collectTransferSources(q.startCondition, false, targetSectId, foundSet)
      q.locationTriggers?.forEach((t) =>
        collectTransferSources(t.condition, false, targetSectId, foundSet),
      )
      q.npcActions?.forEach((a) => {
        collectTransferSources(a.visibleWhen, false, targetSectId, foundSet)
        collectTransferSources(a.enabledWhen, false, targetSectId, foundSet)
      })
      q.spotActions?.forEach((a) => {
        collectTransferSources(a.visibleWhen, false, targetSectId, foundSet)
        collectTransferSources(a.enabledWhen, false, targetSectId, foundSet)
      })
      if (foundSet.size > 0) {
        transferSourcesBySect[targetSectId] = [...foundSet].sort()
      }

      checkEntryTalentCaps(q, `[${q.id}]`, errors)
      checkEntryTalentCaps(loadedScenes, `[${q.id}].scenes`, errors)
    }

    q.locationTriggers?.forEach((t, ti) => walkEffects(`[${q.id}].locationTriggers[${ti}].effects`, t.effects))
    q.npcActions?.forEach((a, ai) => walkEffects(`[${q.id}].npcActions[${ai}].effects`, a.effects))
    q.spotActions?.forEach((a, ai) => walkEffects(`[${q.id}].spotActions[${ai}].effects`, a.effects))
    walkEffects(`[${q.id}].onDeadlineExpired`, q.onDeadlineExpired?.effects)

    for (const [sceneId, scene] of Object.entries(loadedScenes)) {
      walkScene(`[${q.id}].scenes.${sceneId}`, scene)
    }
  }

  for (const [sectId, rule] of Object.entries(SECT_RULES_BY_ID)) {
    if (!rule.entryQuestId) continue
    const refQ = questById.get(rule.entryQuestId)
    if (!refQ) {
      errors.push(`SECT_RULES_BY_ID["${sectId}"].entryQuestId 引用了未注册任务 "${rule.entryQuestId}"`)
    } else if (refQ.category !== 'sect_entry' || refQ.factionId !== sectId) {
      errors.push(
        `SECT_RULES_BY_ID["${sectId}"].entryQuestId="${rule.entryQuestId}" 与任务属性 (category=${refQ.category}, factionId=${refQ.factionId}) 不一致`,
      )
    }
  }

  const expectedTransferKeys = Object.keys(SECT_ENTRY_TRANSFER_SOURCES).sort()
  const actualTransferKeys = Object.keys(transferSourcesBySect).sort()
  if (JSON.stringify(actualTransferKeys) !== JSON.stringify(expectedTransferKeys)) {
    errors.push(
      `SECT_ENTRY_TRANSFER_SOURCES 门派集合 [${expectedTransferKeys.join(', ')}] 与入门任务提取集合 [${actualTransferKeys.join(', ')}] 不一致`,
    )
  } else {
    for (const sectId of expectedTransferKeys) {
      const expectedList = [...(SECT_ENTRY_TRANSFER_SOURCES[sectId] ?? [])].sort()
      const actualList = transferSourcesBySect[sectId] ?? []
      if (JSON.stringify(actualList) !== JSON.stringify(expectedList)) {
        errors.push(
          `SECT_ENTRY_TRANSFER_SOURCES["${sectId}"]=[${expectedList.join(', ')}] 与任务条件允许的转投源 [${actualList.join(', ')}] 不一致`,
        )
      }
    }
  }

  if (errors.length > 0) {
    console.error(`❌ Quest static validation failed with ${errors.length} error(s):`)
    for (const err of errors) {
      console.error(`  - ${err}`)
    }
    process.exitCode = 1
  } else {
    console.log(
      `✅ Validated ${QUEST_REGISTRY.length} quest chain(s) — 0 broken IDs, ${cgCheckedCount} CG path(s) & ${portraitCheckedCount} custom portrait(s) verified, sect rules & {reignYear} checks passed.`,
    )
  }
} finally {
  await server.close()
}
