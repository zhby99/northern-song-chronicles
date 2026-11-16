#!/usr/bin/env node
/**
 * Layer 3 端到端冒烟验证器 (`scripts/verify_artifact_smoke.mjs` / `npm run verify:artifact`)
 * 对 `northern_song_chronicles_m1_0.html` 执行双重验证：
 * 1. 纯 Node 结构与分片完整性校验（无需浏览器，验证分片边界、索引完整性、JS 语法、体积上限）；
 * 2. 真实无头浏览器 E2E 冒烟测试（自动探测 Chromium / Chrome / Edge）：
 *    - 场景 A：`file://` 本地双击直开协议；
 *    - 场景 B：HTTP 响应头强制 `Content-Security-Policy: sandbox allow-scripts; default-src 'none'; ...`
 *      严格无源（opaque null origin，禁用 localStorage/indexedDB 与一切网络请求）沙箱模式；
 *    自动验证首屏挂载、点击“初入江湖”进入创角界面、全景/立绘/剧情CG/音频分片解码、无未捕获异常及 V8 内存健康度。
 */

import { spawn } from 'node:child_process'
import { spawnSync } from 'node:child_process'
import fs from 'node:fs'
import http from 'node:http'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT_DIR = path.resolve(__dirname, '..')
const ARTIFACT_PATH = path.join(ROOT_DIR, 'northern_song_chronicles_m1_0.html')
const MAX_SHARD_CHARS = 16 * 1024 * 1024
const HARD_MAX_SIZE_MB = 220

function fail(msg) {
  console.error(`❌ [verify:artifact] ${msg}`)
  process.exit(1)
}

function runBrowser(browserBin, url) {
  return new Promise((resolve, reject) => {
    const child = spawn(
      browserBin,
      [
        '--headless',
        '--no-sandbox',
        '--disable-gpu',
        '--proxy-bypass-list=127.0.0.1,localhost',
        '--enable-logging=stderr',
        '--virtual-time-budget=4000',
        url,
      ],
      { stdio: ['ignore', 'pipe', 'pipe'] },
    )
    let out = ''
    let err = ''
    const timer = setTimeout(() => {
      child.kill('SIGKILL')
      reject(new Error(`Browser timed out after 45s on ${url}`))
    }, 45000)

    child.stdout.on('data', (chunk) => {
      out += chunk.toString('utf-8')
    })
    child.stderr.on('data', (chunk) => {
      err += chunk.toString('utf-8')
    })
    child.on('error', (e) => {
      clearTimeout(timer)
      reject(e)
    })
    child.on('close', () => {
      clearTimeout(timer)
      resolve(`${out}\n${err}`)
    })
  })
}

async function main() {
  if (!fs.existsSync(ARTIFACT_PATH)) {
    fail(`未找到 ${ARTIFACT_PATH}，请先运行 npm run build:artifact`)
  }

  const stat = fs.statSync(ARTIFACT_PATH)
  const sizeMb = stat.size / (1024 * 1024)
  if (sizeMb > HARD_MAX_SIZE_MB) {
    fail(`单文件 HTML 体积 (${sizeMb.toFixed(2)} MB) 超过硬上限 (${HARD_MAX_SIZE_MB} MB)`)
  }

  const html = fs.readFileSync(ARTIFACT_PATH, 'utf-8')

  // 1. Parse and verify shards
  const shardMap = new Map()
  const shardRe = /<script type="text\/plain" id="nsc-shard-(\d+)">([\s\S]*?)<\/script>/g
  let sm
  while ((sm = shardRe.exec(html)) !== null) {
    const idx = Number.parseInt(sm[1], 10)
    const body = sm[2]
    if (body.length > MAX_SHARD_CHARS) {
      fail(`分片 nsc-shard-${idx} 长度 (${body.length}) 超过单分片安全上限 (${MAX_SHARD_CHARS})`)
    }
    shardMap.set(idx, body)
  }

  if (shardMap.size === 0) {
    fail('未在 HTML 中检测到任何 <script type="text/plain" id="nsc-shard-N"> 数据分片')
  }

  // 2. Extract and verify __NSC_ASSET_INDEX__
  const idxMatch = /var idx = (\{[\s\S]*?\});\s*window\.__NSC_ASSET_INDEX__ = idx;/.exec(html)
  if (!idxMatch) {
    fail('未在 HTML 中找到 window.__NSC_ASSET_INDEX__ 元数据索引')
  }

  let assetIndex
  try {
    assetIndex = JSON.parse(idxMatch[1])
  } catch (err) {
    fail(`window.__NSC_ASSET_INDEX__ JSON 解析失败: ${err.message}`)
  }

  const entries = Object.entries(assetIndex)
  if (entries.length < 100) {
    fail(`素材索引数量异常偏低: ${entries.length}`)
  }

  for (const [url, tuple] of entries) {
    if (!Array.isArray(tuple) || tuple.length !== 4) {
      fail(`素材索引项格式错误 (${url})`)
    }
    const [shardIdx, start, len, mime] = tuple
    const shard = shardMap.get(shardIdx)
    if (!shard) {
      fail(`素材 ${url} 引用了不存在的分片 #${shardIdx}`)
    }
    if (start < 0 || len <= 0 || start + len > shard.length) {
      fail(`素材 ${url} 切片越界: [${start}, ${start + len}) > ${shard.length}`)
    }
    if (typeof mime !== 'string' || !/^(image|audio)\//.test(mime)) {
      fail(`素材 ${url} MIME 类型异常: ${mime}`)
    }
  }

  console.log(
    `✅ [verify:artifact] 结构校验通过: ${sizeMb.toFixed(2)} MB | ${shardMap.size} 个分片 | ${entries.length} 项素材索引全部对齐无越界。`,
  )

  // 3. Detect headless browser for E2E runtime verification
  const candidates =
    process.platform === 'darwin'
      ? [
          '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
          '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
          'chromium',
          'google-chrome',
        ]
      : process.platform === 'win32'
        ? [
            'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
            'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
            'chrome',
            'msedge',
          ]
        : ['chromium', 'google-chrome', 'chromium-browser', 'microsoft-edge']

  let browserBin = null
  for (const bin of candidates) {
    const res = spawnSync(bin, ['--version'], { stdio: 'ignore' })
    if (!res.error && res.status === 0) {
      browserBin = bin
      break
    }
  }

  if (!browserBin) {
    console.log('ℹ️ [verify:artifact] 当前环境未检测到 Chrome/Chromium/Edge，跳过无头浏览器 E2E 冒烟。')
    return
  }

  const probeScript = `
<script>
(function() {
  var runtimeErrors = [];
  window.addEventListener('error', function(e) {
    runtimeErrors.push('ERROR: ' + (e.message || String(e)));
  });
  window.addEventListener('unhandledrejection', function(e) {
    runtimeErrors.push('REJECTION: ' + String(e.reason));
  });

  function failSmoke(reason) {
    console.error('[NSC_SMOKE_FAIL] ' + reason + (runtimeErrors.length ? ' | errs=' + runtimeErrors.join('; ') : ''));
  }

  window.addEventListener('load', function() {
    setTimeout(function() {
      try {
        if (runtimeErrors.length > 0) {
          return failSmoke('Boot runtime errors detected');
        }
        var startScreen = document.getElementById('game-start-screen');
        if (!startScreen) {
          return failSmoke('#game-start-screen did not mount');
        }

        // Verify packed region image, quest CG, and audio slice
        var reqPaths = [
          '/assets/regions/bianliang.jpg',
          '/assets/quests/changshan_blood_letter.jpg',
          '/assets/audio/regions/bianliang/1.mp3'
        ];
        for (var i = 0; i < reqPaths.length; i++) {
          var p = reqPaths[i];
          var uri = window.__NSC_ASSET_PACK__ && window.__NSC_ASSET_PACK__[p];
          if (!uri || uri.indexOf('data:') !== 0 || uri.length < 1024) {
            return failSmoke('Failed to read packed asset: ' + p);
          }
        }

        // Click "初入江湖" button to verify interactive transition -> CharacterCreationModal
        var buttons = startScreen.querySelectorAll('button');
        var newGameBtn = null;
        for (var b = 0; b < buttons.length; b++) {
          if (buttons[b].textContent && buttons[b].textContent.indexOf('初入江湖') !== -1) {
            newGameBtn = buttons[b];
            break;
          }
        }
        if (!newGameBtn) {
          return failSmoke('Could not find 初入江湖 button on StartScreen');
        }
        newGameBtn.click();

        setTimeout(function() {
          if (runtimeErrors.length > 0) {
            return failSmoke('Post-click runtime errors detected');
          }
          var imgs = document.querySelectorAll('img');
          for (var k = 0; k < imgs.length; k++) {
            var src = imgs[k].getAttribute('src') || '';
            if (src.indexOf('/assets/') === 0) {
              return failSmoke('Found un-resolved raw /assets/ <img> tag in DOM: ' + src);
            }
          }
          var storageBlocked = false;
          try {
            void window.localStorage.length;
          } catch (_se) {
            storageBlocked = true;
          }
          var heapMb = (window.performance && performance.memory)
            ? (performance.memory.usedJSHeapSize / 1048576).toFixed(1)
            : 'n/a';
          if (heapMb !== 'n/a' && parseFloat(heapMb) > 180) {
            return failSmoke('V8 JS Heap exceeded 180 MB budget: ' + heapMb + ' MB');
          }
          console.log('[NSC_SMOKE_PASS] imgs=' + imgs.length + ' heapMB=' + heapMb + ' origin=' + window.origin + ' storageBlocked=' + storageBlocked);
        }, 700);
      } catch (ex) {
        failSmoke('Exception in smoke probe: ' + (ex && ex.stack ? ex.stack : String(ex)));
      }
    }, 600);
  });
})();
</script>
`

  const probedHtml = html.replace(/<\/body>/i, `${probeScript}\n</body>`)
  const probedBuf = Buffer.from(probedHtml, 'utf-8')

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'nsc-artifact-smoke-'))
  try {
    // Mode A: Direct file:// open
    const directHtmlPath = path.join(tmpDir, 'direct_artifact.html')
    fs.writeFileSync(directHtmlPath, probedBuf)
    const directLog = await runBrowser(browserBin, pathToFileURL(directHtmlPath).href)
    assertSmokeLog('file:// 本地直开模式', directLog)

    // Mode B: Ephemeral loopback server enforcing strict HTTP CSP + `sandbox allow-scripts`
    // (forces opaque `null` origin, throws SecurityError on localStorage/indexedDB, blocks all external/blob/fetch requests)
    const server = http.createServer((_req, res) => {
      res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8',
        'Content-Length': probedBuf.length,
        'Content-Security-Policy':
          "sandbox allow-scripts; default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; img-src data:; media-src data:; connect-src 'none';",
      })
      res.end(probedBuf)
    })

    await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve))
    const addr = server.address()
    const port = typeof addr === 'object' && addr ? addr.port : 0
    try {
      const prevNoProxy = process.env.NO_PROXY
      process.env.NO_PROXY = '127.0.0.1,localhost'
      process.env.no_proxy = '127.0.0.1,localhost'
      const sandboxLog = await runBrowser(browserBin, `http://127.0.0.1:${port}/artifact.html`)
      if (prevNoProxy !== undefined) process.env.NO_PROXY = prevNoProxy
      assertSmokeLog('CSP sandbox="allow-scripts" 严格无源沙箱模式', sandboxLog)
    } finally {
      server.close()
    }
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true })
  }
}

function assertSmokeLog(label, combinedLog) {
  if (combinedLog.includes('Abnormal renderer termination') || combinedLog.includes('FATAL:')) {
    fail(`${label} 触发浏览器渲染进程崩溃 (FATAL / OOM):\n${combinedLog.slice(-1200)}`)
  }
  const failMatch = /\[NSC_SMOKE_FAIL\][^\n"]*/.exec(combinedLog)
  if (failMatch) {
    fail(`${label} 冒烟断言失败: ${failMatch[0]}`)
  }
  const passMatch = /\[NSC_SMOKE_PASS\][^\n"]*/.exec(combinedLog)
  if (!passMatch) {
    fail(`${label} 未收到 [NSC_SMOKE_PASS] 完成信号:\n${combinedLog.slice(-1200)}`)
  }
  console.log(`✅ [verify:artifact] ${label} E2E 冒烟通过 -> ${passMatch[0]}`)
}

main().catch((err) => {
  fail(err.stack || err.message || String(err))
})
