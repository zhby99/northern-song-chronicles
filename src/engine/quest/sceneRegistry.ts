import { QUEST_MAP, QUEST_REGISTRY } from '../../data/quests'
import type { StorySceneDef } from '../../types/quest'

const GLOBAL_SCENE_CACHE = new Map<string, StorySceneDef>()
const QUEST_LOADED_SCENES = new Map<string, Record<string, StorySceneDef>>()
const QUEST_SCENE_LOAD_PROMISES = new Map<string, Promise<Record<string, StorySceneDef>>>()

export function getLoadedQuestScenes(questId: string): Record<string, StorySceneDef> | undefined {
  return QUEST_LOADED_SCENES.get(questId) ?? QUEST_MAP[questId]?.scenes
}

export function cacheQuestScenes(
  questId: string,
  scenes: Record<string, StorySceneDef>,
): Record<string, StorySceneDef> {
  QUEST_LOADED_SCENES.set(questId, scenes)
  for (const [key, scene] of Object.entries(scenes)) {
    GLOBAL_SCENE_CACHE.set(`${questId}::${key}`, scene)
    if (!GLOBAL_SCENE_CACHE.has(key)) {
      GLOBAL_SCENE_CACHE.set(key, scene)
    }
    if (scene.id && !GLOBAL_SCENE_CACHE.has(scene.id)) {
      GLOBAL_SCENE_CACHE.set(scene.id, scene)
    }
  }
  return scenes
}

export function resolveQuestSceneSync(
  sceneId: string,
  questId?: string,
): StorySceneDef | null {
  if (questId) {
    const scoped = GLOBAL_SCENE_CACHE.get(`${questId}::${sceneId}`)
    if (scoped) return scoped
    const fromDef = QUEST_MAP[questId]?.scenes?.[sceneId]
    if (fromDef) {
      cacheQuestScenes(questId, QUEST_MAP[questId]!.scenes!)
      return fromDef
    }
  }
  const cached = GLOBAL_SCENE_CACHE.get(sceneId)
  if (cached) return cached

  for (const q of QUEST_REGISTRY) {
    const scenes = QUEST_LOADED_SCENES.get(q.id) ?? q.scenes
    if (scenes && scenes[sceneId]) {
      cacheQuestScenes(q.id, scenes)
      return scenes[sceneId]!
    }
  }
  return null
}

export async function loadQuestScenesById(
  questId: string,
): Promise<Record<string, StorySceneDef>> {
  const already = QUEST_LOADED_SCENES.get(questId)
  if (already) return already
  const qDef = QUEST_MAP[questId]
  if (!qDef) return {}
  if (qDef.scenes) {
    return cacheQuestScenes(questId, qDef.scenes)
  }
  if (!qDef.loadScenes) return {}

  let pending = QUEST_SCENE_LOAD_PROMISES.get(questId)
  if (!pending) {
    pending = qDef.loadScenes().then((loaded) => cacheQuestScenes(questId, loaded))
    QUEST_SCENE_LOAD_PROMISES.set(questId, pending)
  }
  return pending
}

export async function resolveQuestSceneAsync(
  sceneId: string,
  questId?: string,
): Promise<StorySceneDef | null> {
  const syncHit = resolveQuestSceneSync(sceneId, questId)
  if (syncHit) return syncHit

  if (questId) {
    const loaded = await loadQuestScenesById(questId)
    if (loaded[sceneId]) return loaded[sceneId]!
  }

  for (const q of QUEST_REGISTRY) {
    if (!QUEST_LOADED_SCENES.has(q.id) && !q.scenes && q.loadScenes) {
      const loaded = await loadQuestScenesById(q.id)
      if (loaded[sceneId]) return loaded[sceneId]!
    }
  }
  return null
}

export async function preloadAllQuestScenes(): Promise<void> {
  await Promise.all(
    QUEST_REGISTRY.map(async (q) => {
      if (q.scenes) {
        cacheQuestScenes(q.id, q.scenes)
      } else if (q.loadScenes) {
        await loadQuestScenesById(q.id)
      }
    }),
  )
}
