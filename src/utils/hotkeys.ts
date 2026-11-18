import { useGameStore } from '../store/useGameStore'

/** 焦点位于输入框 / 下拉框 / 可编辑区域时，按键应交给表单而非游戏快捷键 */
export function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false
  return (
    target instanceof HTMLInputElement ||
    target instanceof HTMLTextAreaElement ||
    target instanceof HTMLSelectElement ||
    target.isContentEditable
  )
}

/**
 * 战斗盲选 / 剧情对白等捕获阶段快捷键的统一守门：
 * 系统菜单或万象图鉴叠在上层、或正在输入文字时一律放行，避免搜图鉴时误触出招 / 翻页。
 */
export function shouldIgnoreOverlayHotkey(e: KeyboardEvent): boolean {
  if (isTypingTarget(e.target)) return true
  const s = useGameStore.getState()
  return s.menuOpen || s.compendiumOpen
}
