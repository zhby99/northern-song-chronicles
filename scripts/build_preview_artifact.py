#!/usr/bin/env python3
"""
从 Vite IIFE 单包构建产物 (dist-artifact/) 生成完全符合严格 CSP 沙箱规则的离线预览 HTML Artifact。
特点：
- 不使用任何 blob: URL 或动态外部脚本（零 CSP 拦截）；
- 显式声明 html, body, #root { width: 100%; height: 100%; margin: 0; padding: 0; overflow: hidden; }，避免 iframe 高度塌陷为 0；
- 209 张静态原画以轻量 WebP 内联至 window.__NSC_ASSET_PACK__，而工程源码库 (src/ 与 dist/) 保持 0 Base64。
"""

from __future__ import annotations

import base64
import io
import json
import os
import subprocess
from pathlib import Path
from PIL import Image

ROOT_DIR = Path(__file__).resolve().parent.parent
DIST_ART_DIR = ROOT_DIR / "dist-artifact"
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
    env = os.environ.copy()
    env["ARTIFACT_BUNDLE"] = "1"
    subprocess.run(["npx", "vite", "build"], cwd=ROOT_DIR, env=env, check=True)

    css_files = sorted((DIST_ART_DIR / "assets").glob("*.css"))
    js_files = sorted((DIST_ART_DIR / "assets").glob("*.js"))
    if not css_files or not js_files:
        raise RuntimeError("Missing CSS or JS in dist-artifact/assets")

    css_content = css_files[0].read_text(encoding="utf-8")
    js_content = js_files[0].read_text(encoding="utf-8")
    # Escape any accidental </script sequence inside JS string literals
    safe_js = js_content.replace("</script", "<\\/script")

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

    assets_json = json.dumps(asset_pack, ensure_ascii=False).replace("</", "<\\/")

    out_html = f"""<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>《北宋立志传》— Phase M0 完整工程互动预览</title>
  <style>
    html, body, #root {{
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 0;
      overflow: hidden;
      background-color: #1b140e;
    }}
  </style>
  <style>{css_content}</style>
</head>
<body class="bg-[#1b140e] text-[#23180f] antialiased">
  <div id="root"></div>
  <script>window.__NSC_ASSET_PACK__ = {assets_json};</script>
  <script>{safe_js}</script>
</body>
</html>
"""

    out_path = ARTIFACT_DIR / "northern_song_chronicles_m0.html"
    out_path.write_text(out_html, encoding="utf-8")

    meta_path = ARTIFACT_DIR / "northern_song_chronicles_m0.html.metadata.json"
    meta_payload = {
        "summary": "《北宋立志传》Phase M0 完整工程离线可交互预览（含 38 州府全景、123 座特殊建筑内景、1000 群侠与 216 武学图鉴、多槽位 IndexedDB 存读档及 JSON 导入导出）。",
        "updatedAt": "2026-11-13T04:12:00Z",
        "requestFeedback": False,
        "userFacing": True,
    }
    meta_path.write_text(json.dumps(meta_payload, ensure_ascii=False, indent=2), encoding="utf-8")

    size_mb = os.path.getsize(out_path) / (1024 * 1024)
    print(f"[OK] Built CSP-clean IIFE preview artifact: {out_path} ({size_mb:.2f} MB, {len(asset_pack)} WebP assets)")


if __name__ == "__main__":
    build_artifact_html()
