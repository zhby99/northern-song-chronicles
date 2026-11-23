import { shouldIgnoreOverlayHotkey } from '../../utils/hotkeys'
import type { MoveSlotKey } from '../combat/types'
import type { ArenaInputFrame } from './types'

const OPPOSITE_KEY: Record<string, string> = {
  KeyW: 'KeyS',
  KeyS: 'KeyW',
  KeyA: 'KeyD',
  KeyD: 'KeyA',
  ArrowUp: 'ArrowDown',
  ArrowDown: 'ArrowUp',
  ArrowLeft: 'ArrowRight',
  ArrowRight: 'ArrowLeft',
}

export interface ArenaInputDiagnostics {
  heldKeys: string[]
  recentLog: string[]
  hasTouchInput: boolean
  guardHeld: boolean
}

export class ArenaInputController {
  readonly keys = new Set<string>()
  readonly pressed = new Set<string>()
  readonly mouseNdc = { x: 0, y: 0 }
  private recentLog: string[] = []
  private touchMove = { x: 0, z: 0 }
  private touchGuardHeld = false
  private hasTouch = false
  private prevGuardHeld = false
  private onToggleDebugPanel?: () => void
  private onOpenBag?: () => void
  private cleanupFns: Array<() => void> = []

  // 供外部射线投射写入的世界空间瞄准点
  aimWorldPoint: { x: number; z: number } | null = null

  private note(s: string) {
    this.recentLog.push(s)
    if (this.recentLog.length > 8) {
      this.recentLog = this.recentLog.slice(-8)
    }
  }

  attach(
    targetEl: HTMLElement,
    opts?: {
      onToggleDebugPanel?: () => void
      onOpenBag?: () => void
    },
  ): () => void {
    this.onToggleDebugPanel = opts?.onToggleDebugPanel
    this.onOpenBag = opts?.onOpenBag

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.isComposing || e.keyCode === 229) return
      if (e.code === 'F3') {
        e.preventDefault()
        this.onToggleDebugPanel?.()
        return
      }
      if (/^(Meta|Alt|Control)/.test(e.code)) {
        this.keys.clear()
        return
      }
      if (e.metaKey || e.altKey || e.ctrlKey) return
      if (shouldIgnoreOverlayHotkey(e)) return

      if (e.code === 'KeyB' && !e.repeat) {
        this.onOpenBag?.()
        return
      }

      if (!e.repeat) {
        this.note(`↓${e.code}`)
        const opp = OPPOSITE_KEY[e.code]
        if (opp) this.keys.delete(opp)
      }
      if (!this.keys.has(e.code)) this.pressed.add(e.code)
      this.keys.add(e.code)
      if (e.code === 'Space' || e.code === 'Tab') {
        e.preventDefault()
        if (document.activeElement instanceof HTMLButtonElement) {
          document.activeElement.blur()
        }
      }
    }

    const onKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'Space' && !e.isComposing && !shouldIgnoreOverlayHotkey(e)) {
        e.preventDefault()
      }
      this.note(`↑${e.code}`)
      this.keys.delete(e.code)
      if (/^(Meta|Alt|Control)/.test(e.code)) this.keys.clear()
    }

    const clearAll = (reason: string) => {
      this.note(`[${reason}]`)
      this.keys.clear()
      this.touchGuardHeld = false
      this.touchMove.x = 0
      this.touchMove.z = 0
    }

    const onBlur = () => clearAll('blur')
    const onFocus = () => clearAll('focus')
    const onPageHide = () => clearAll('pagehide')
    const onVisibility = () => clearAll('vis')

    const onMouseMove = (e: MouseEvent) => {
      if (this.hasTouch) return
      if (!(e.buttons & 2)) this.keys.delete('RMB')
      const rect = targetEl.getBoundingClientRect()
      if (rect.width > 0 && rect.height > 0) {
        this.mouseNdc.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
        this.mouseNdc.y = -((e.clientY - rect.top) / rect.height) * 2 + 1
      }
    }

    const onMouseDown = (e: MouseEvent) => {
      if (this.hasTouch) return
      if (e.button === 0) {
        this.pressed.add('LMB')
        this.note('↓LMB')
      } else if (e.button === 2) {
        this.pressed.add('RMB')
        this.keys.add('RMB')
        this.note('↓RMB')
      }
    }

    const onMouseUp = (e: MouseEvent) => {
      if (e.button === 2) {
        this.keys.delete('RMB')
        this.note('↑RMB')
      }
    }

    const onContextMenu = (e: MouseEvent) => {
      e.preventDefault()
    }

    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
    window.addEventListener('blur', onBlur)
    window.addEventListener('focus', onFocus)
    window.addEventListener('pagehide', onPageHide)
    document.addEventListener('visibilitychange', onVisibility)
    targetEl.addEventListener('mousemove', onMouseMove)
    targetEl.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mouseup', onMouseUp)
    targetEl.addEventListener('contextmenu', onContextMenu)

    const cleanup = () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
      window.removeEventListener('blur', onBlur)
      window.removeEventListener('focus', onFocus)
      window.removeEventListener('pagehide', onPageHide)
      document.removeEventListener('visibilitychange', onVisibility)
      targetEl.removeEventListener('mousemove', onMouseMove)
      targetEl.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
      targetEl.removeEventListener('contextmenu', onContextMenu)
    }
    this.cleanupFns.push(cleanup)
    return cleanup
  }

  detachAll(): void {
    for (const fn of this.cleanupFns) fn()
    this.cleanupFns = []
    this.keys.clear()
    this.pressed.clear()
  }

  simulatePress(...codes: string[]): void {
    for (const c of codes) {
      this.pressed.add(c)
      this.note(`~${c}`)
    }
  }

  setTouchMove(x: number, z: number): void {
    this.hasTouch = true
    this.touchMove.x = Math.max(-1, Math.min(1, x))
    this.touchMove.z = Math.max(-1, Math.min(1, z))
  }

  setTouchGuard(held: boolean): void {
    this.hasTouch = true
    if (held && !this.touchGuardHeld) {
      this.pressed.add('TOUCH_GUARD')
    }
    this.touchGuardHeld = held
  }

  triggerTouchAction(code: string): void {
    this.hasTouch = true
    this.pressed.add(code)
  }

  sampleFrame(): ArenaInputFrame {
    let moveX = this.touchMove.x
    let moveZ = this.touchMove.z

    if (this.keys.has('KeyA') || this.keys.has('ArrowLeft')) moveX -= 1
    if (this.keys.has('KeyD') || this.keys.has('ArrowRight')) moveX += 1
    if (this.keys.has('KeyW') || this.keys.has('ArrowUp')) moveZ -= 1
    if (this.keys.has('KeyS') || this.keys.has('ArrowDown')) moveZ += 1

    const len = Math.hypot(moveX, moveZ)
    if (len > 1) {
      moveX /= len
      moveZ /= len
    }

    const attackPressed = this.pressed.has('LMB') || this.pressed.has('KeyJ')
    const dodgePressed =
      this.pressed.has('Space') || this.pressed.has('ShiftLeft') || this.pressed.has('ShiftRight')
    const guardHeld = this.keys.has('RMB') || this.keys.has('KeyK') || this.touchGuardHeld
    const guardJustPressed =
      this.pressed.has('RMB') ||
      this.pressed.has('KeyK') ||
      this.pressed.has('TOUCH_GUARD') ||
      (guardHeld && !this.prevGuardHeld)
    this.prevGuardHeld = guardHeld

    let skillPressed: MoveSlotKey | null = null
    if (this.pressed.has('Digit1')) skillPressed = 'move1'
    else if (this.pressed.has('Digit2')) skillPressed = 'move2'
    else if (this.pressed.has('Digit3')) skillPressed = 'move3'
    else if (this.pressed.has('Digit4')) skillPressed = 'move4'

    const escapeHeld = this.keys.has('KeyE')

    return {
      moveX,
      moveZ,
      aimX: this.aimWorldPoint?.x ?? 0,
      aimZ: this.aimWorldPoint?.z ?? 0,
      hasAimPoint: Boolean(this.aimWorldPoint && !this.hasTouch),
      attackPressed,
      dodgePressed,
      guardHeld,
      guardJustPressed,
      skillPressed,
      escapeHeld,
    }
  }

  endFrame(): void {
    this.pressed.clear()
  }

  getDiagnostics(): ArenaInputDiagnostics {
    return {
      heldKeys: Array.from(this.keys),
      recentLog: [...this.recentLog],
      hasTouchInput: this.hasTouch,
      guardHeld: this.prevGuardHeld,
    }
  }
}
