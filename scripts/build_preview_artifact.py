#!/usr/bin/env python3
"""
从 Vite 模块化生产产物 (dist/) 打包生成可在远程聊天侧边栏直接离线预览的单文件 HTML Artifact。
注：工程源码库 (src/ 与 dist/) 保持 100% 静态资源解耦（0 Base64）；
本脚本仅用于向无法直连远端容器 localhost 的浏览器预览窗投递自包含快照，并对立绘/全景做 WebP/JPEG 轻量压缩以加快侧边栏打开速度。
"""

from __future__ import annotations

import base64
import io
import json
import os
import re
from pathlib import Path
from PIL import Image

ROOT_DIR = Path(__file__).resolve().parent.parent
DIST_DIR = ROOT_DIR / "dist"
PUBLIC_DIR = ROOT_DIR / "public"
ARTIFACT_DIR = Path(
    "/home/antigravity/.gemini/jetski/brain/v1/default/jetski_remote_agents_3p/7a9ed227-5322-4f0c-a97a-844dec45ddf7"
)


def compress_to_data_uri(img_path: Path, max_dim: int, quality: int) -> str:
    with Image.open(img_path) as im:
        im = im.convert("RGB")
        w, h = im.size
        if max(w, h) > max_dim:
            scale = max_dim / max(w, h)
            im = im.resize((int(w * scale), int(h * scale)), Image.Resampling.LANCZOS)
        buf = io.BytesIO()
        im.save(buf, format="WEBP", quality=quality, method=4)
        b64 = base64.b64encode(buf.getvalue()).decode("ascii")
        return f"data:image/webp;base64,{b64}"


def build_artifact_html() -> None:
    index_html = (DIST_DIR / "index.html").read_text(encoding="utf-8")

    # 1. Read CSS
    css_match = re.search(r'<link rel="stylesheet"[^>]+href="/assets/([^"]+)"', index_html)
    if not css_match:
        raise RuntimeError("Could not find stylesheet in dist/index.html")
    css_content = (DIST_DIR / "assets" / css_match.group(1)).read_text(encoding="utf-8")

    # 2. Read all JS chunks in dist/assets/
    js_chunks: dict[str, str] = {}
    entry_chunk_name = ""
    entry_match = re.search(r'<script type="module"[^>]+src="/assets/([^"]+)"', index_html)
    if not entry_match:
        raise RuntimeError("Could not find entry script in dist/index.html")
    entry_chunk_name = entry_match.group(1)

    for js_file in sorted((DIST_DIR / "assets").glob("*.js")):
        js_chunks[js_file.name] = js_file.read_text(encoding="utf-8")

    # 3. Compress 209 images into lightweight WebP data URIs for crisp, fast sidebar preview loading
    asset_pack: dict[str, str] = {}
    asset_specs = [
        ("regions", 960, 56),
        ("buildings", 900, 54),
        ("characters/avatars", 128, 68),
        ("characters/fullbody", 420, 58),
        ("characters/templates", 420, 58),
    ]
    for rel_folder, max_dim, quality in asset_specs:
        folder = PUBLIC_DIR / "assets" / rel_folder
        for img_path in sorted(folder.glob("*.jpg")):
            web_url = f"/assets/{rel_folder}/{img_path.name}"
            asset_pack[web_url] = compress_to_data_uri(img_path, max_dim, quality)

    # Escape </script> inside JSON payloads
    chunks_json = json.dumps(js_chunks, ensure_ascii=False).replace("</", "<\\/")
    assets_json = json.dumps(asset_pack, ensure_ascii=False).replace("</", "<\\/")

    out_html = f"""<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>《北宋立志传》— Phase M0 完整工程互动预览</title>
    <style>{css_content}</style>
  </head>
  <body class="m-0 p-0 w-screen h-screen overflow-hidden bg-[#1b140e] text-[#23180f] antialiased">
    <div id="root" class="w-full h-full"></div>
    <script>
      window.__NSC_ASSET_PACK__ = {assets_json};
      (function () {{
        const rawChunks = {chunks_json};
        const blobUrls = {{}};
        const order = Object.keys(rawChunks).sort((a, b) => {{
          if (a === {json.dumps(entry_chunk_name)}) return 1;
          if (b === {json.dumps(entry_chunk_name)}) return -1;
          if (a.startsWith("vendor-")) return 1;
          if (b.startsWith("vendor-")) return -1;
          if (a.startsWith("rolldown-")) return -1;
          if (b.startsWith("rolldown-")) return 1;
          return a.localeCompare(b);
        }});

        for (const name of order) {{
          let code = rawChunks[name];
          code = code.replace(/(from\\s*["'])\\.\\/([^"']+)(["'])/g, (_, p1, dep, p3) => {{
            return blobUrls[dep] ? p1 + blobUrls[dep] + p3 : _;
          }});
          const blob = new Blob([code], {{ type: "text/javascript" }});
          blobUrls[name] = URL.createObjectURL(blob);
        }}

        const s = document.createElement("script");
        s.type = "module";
        s.src = blobUrls[{json.dumps(entry_chunk_name)}];
        document.body.appendChild(s);
      }})();
    </script>
  </body>
</html>
"""

    out_path = ARTIFACT_DIR / "northern_song_chronicles_m0.html"
    out_path.write_text(out_html, encoding="utf-8")

    meta_path = ARTIFACT_DIR / "northern_song_chronicles_m0.html.metadata.json"
    meta_payload = {
        "summary": "《北宋立志传》Phase M0 完整工程离线可交互预览（含 38 州府全景、123 座特殊建筑内景、1000 群侠与 216 武学图鉴、多槽位 IndexedDB 存读档及 JSON 导入导出）。",
        "updatedAt": "2026-11-13T04:09:00Z",
        "requestFeedback": false_val(),
        "userFacing": true_val(),
    }
    meta_path.write_text(json.dumps(meta_payload, ensure_ascii=False, indent=2), encoding="utf-8")

    size_mb = os.path.getsize(out_path) / (1024 * 1024)
    print(f"[OK] Built standalone preview artifact: {out_path} ({size_mb:.2f} MB, {len(asset_pack)} compressed WebP assets)")


def false_val() -> bool:
    return False


def true_val() -> bool:
    return True


if __name__ == "__main__":
    build_artifact_html()
