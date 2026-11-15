import { spawnSync } from 'node:child_process'

const args = process.argv.slice(2)
const candidates = process.platform === 'win32' ? ['python', 'py', 'python3'] : ['python3', 'python']

let bin = null
for (const candidate of candidates) {
  const probe = spawnSync(candidate, ['--version'], { stdio: 'ignore' })
  if (!probe.error && probe.status === 0) {
    bin = candidate
    break
  }
}

if (!bin) {
  const scriptArg = args[0] || ''
  if (scriptArg.endsWith('compile_game_db.py')) {
    console.warn('[run_py] Python runtime not available; falling back to Node DB compiler (scripts/compile_game_db_fallback.mjs).')
    const fb = spawnSync(process.execPath, ['scripts/compile_game_db_fallback.mjs', ...args.slice(1)], {
      stdio: 'inherit',
    })
    process.exit(fb.status ?? 0)
  }
  console.error('[run_py] No working Python runtime found and no Node fallback for:', scriptArg)
  process.exit(1)
}

const res = spawnSync(bin, args, { stdio: 'inherit' })
if (res.error) {
  console.error(`[run_py] Failed to execute Python (${bin}):`, res.error.message)
  process.exit(1)
}
process.exit(res.status ?? 0)
