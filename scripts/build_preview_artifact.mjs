import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { build } from 'vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT_DIR = path.resolve(__dirname, '..')
const DIST_ART_DIR = path.join(ROOT_DIR, 'dist-artifact')
const PUBLIC_DIR = path.join(ROOT_DIR, 'public')

async function main() {
  process.env.ARTIFACT_BUNDLE = '1'
  await build({ root: ROOT_DIR })

  const assetsDir = path.join(DIST_ART_DIR, 'assets')
  const entries = fs.readdirSync(assetsDir)
  const cssFile = entries.find((f) => f.endsWith('.css'))
  const jsFile = entries.find((f) => f.endsWith('.js'))
  if (!cssFile || !jsFile) {
    throw new Error('Missing CSS or JS bundle in dist-artifact/assets')
  }

  const cssContent = fs.readFileSync(path.join(assetsDir, cssFile), 'utf-8')
  const jsContent = fs.readFileSync(path.join(assetsDir, jsFile), 'utf-8')
  const safeJs = jsContent.replace(/<\/script/gi, '<\\/script')

  const folders = [
    'regions',
    'buildings',
    'characters/avatars',
    'characters/fullbody',
    'characters/templates',
  ]

  /** @type {Record<string, string>} */
  const assetPack = {}
  let assetCount = 0

  for (const relFolder of folders) {
    const absFolder = path.join(PUBLIC_DIR, 'assets', ...relFolder.split('/'))
    if (!fs.existsSync(absFolder)) continue
    const files = fs
      .readdirSync(absFolder)
      .filter((f) => f.toLowerCase().endsWith('.jpg'))
      .sort()
    for (const fileName of files) {
      const buf = fs.readFileSync(path.join(absFolder, fileName))
      const webUrl = `/assets/${relFolder}/${fileName}`
      assetPack[webUrl] = `data:image/jpeg;base64,${buf.toString('base64')}`
      assetCount += 1
    }
  }

  const assetsJson = JSON.stringify(assetPack).replace(/<\//g, '<\\/')

  const outHtml = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>《北宋立志传》— M1-0 单文件可交互版</title>
  <style>
    html, body, #root {
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 0;
      overflow: hidden;
      background-color: #1b140e;
    }
  </style>
  <style>${cssContent}</style>
</head>
<body class="bg-[#1b140e] text-[#23180f] antialiased">
  <div id="root"></div>
  <script>window.__NSC_ASSET_PACK__ = ${assetsJson};</script>
  <script>${safeJs}</script>
</body>
</html>
`

  const distOutPath = path.join(DIST_ART_DIR, 'northern_song_chronicles_m1_0.html')
  const rootOutPath = path.join(ROOT_DIR, 'northern_song_chronicles_m1_0.html')

  fs.mkdirSync(DIST_ART_DIR, { recursive: true })
  fs.writeFileSync(distOutPath, outHtml, 'utf-8')
  fs.writeFileSync(rootOutPath, outHtml, 'utf-8')

  const sizeMb = (fs.statSync(rootOutPath).size / (1024 * 1024)).toFixed(2)
  console.log(`[OK] 已生成单文件 HTML (${sizeMb} MB, 内嵌 ${assetCount} 张原画):`)
  console.log(`  -> ${rootOutPath}`)
  console.log(`  -> ${distOutPath}`)
}

main().catch((err) => {
  console.error('[build:artifact] 构建失败:', err)
  process.exit(1)
})
