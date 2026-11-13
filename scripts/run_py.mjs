import { spawnSync } from 'node:child_process'

const args = process.argv.slice(2)
const candidates = process.platform === 'win32' ? ['python', 'py', 'python3'] : ['python3', 'python']

let bin = candidates[0]
for (const candidate of candidates) {
  const probe = spawnSync(candidate, ['--version'], { stdio: 'ignore' })
  if (!probe.error && probe.status === 0) {
    bin = candidate
    break
  }
}

const res = spawnSync(bin, args, { stdio: 'inherit' })
if (res.error) {
  console.error(`[run_py] Failed to execute Python (${bin}):`, res.error.message)
  process.exit(1)
}
process.exit(res.status ?? 0)
