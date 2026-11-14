import process from 'node:process'
import { createServer } from 'vite'

const server = await createServer({
  logLevel: 'error',
  server: { middlewareMode: true },
})

try {
  const { QUEST_REGISTRY } = await server.ssrLoadModule('/src/data/quests/index.ts')
  const { validateAllRegisteredQuests } = await server.ssrLoadModule('/src/engine/questEngine.ts')

  const result = validateAllRegisteredQuests(QUEST_REGISTRY)
  if (!result.valid) {
    console.error(`❌ Quest static validation failed with ${result.errors.length} error(s):`)
    for (const err of result.errors) {
      console.error(`  - [${err.questId}] (${err.path}): ${err.message}`)
    }
    process.exitCode = 1
  } else {
    console.log(
      `✅ Validated ${QUEST_REGISTRY.length} registered quest chain(s) — 0 broken ID/step references.`,
    )
  }
} finally {
  await server.close()
}
