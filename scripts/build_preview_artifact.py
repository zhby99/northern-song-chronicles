#!/usr/bin/env python3
"""
从 Vite IIFE 单包构建产物 (dist-artifact/) 生成完全符合严格 CSP 沙箱规则的离线预览 HTML Artifact。
特点：
- 不使用任何 blob: URL 或动态外部脚本（零 CSP 拦截）；
- 显式声明 html, body, #root { width: 100%; height: 100%; margin: 0; padding: 0; overflow: hidden; }，避免 iframe 高度塌陷为 0；
- 209 张静态原画以轻量 WebP 内联至 window.__NSC_ASSET_PACK__，而工程源码库 (src/ 与 dist/) 保持 0 Base64。
"""

from __future__ import annotations

import argparse
import base64
import io
import json
import os
import subprocess
from datetime import datetime, timezone
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    Image = None  # type: ignore[assignment]

ROOT_DIR = Path(__file__).resolve().parent.parent
DIST_ART_DIR = ROOT_DIR / "dist-artifact"
PUBLIC_DIR = ROOT_DIR / "public"
DEFAULT_OUT_PATH = DIST_ART_DIR / "northern_song_chronicles_m1_0.html"


def compress_to_data_uri(img_path: Path, max_dim: int, quality: int) -> str:
    if Image is None:
        b64 = base64.b64encode(img_path.read_bytes()).decode("ascii")
        return f"data:image/jpeg;base64,{b64}"
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


def build_artifact_html(out_path: Path, skip_meta: bool = False) -> None:
    env = os.environ.copy()
    env["ARTIFACT_BUNDLE"] = "1"
    npx_bin = "npx.cmd" if os.name == "nt" else "npx"
    subprocess.run([npx_bin, "vite", "build"], cwd=ROOT_DIR, env=env, check=True)

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
  <title>《北宋立志传》— M1-0 在线可交互单文件版</title>
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

    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_text(out_html, encoding="utf-8")

    if not skip_meta:
        meta_path = Path(f"{out_path}.metadata.json")
        meta_payload = {
            "summary": "《北宋立志传》Phase M1-0 单文件自包含可交互 HTML 版本（含常驻顶部年月日十二时辰/气血体能/资金粮草状态栏、主角面板可视化七槽位披挂区、行囊四库分类体系、38 州府名山全景、123 座建筑室内及 1000 群侠图鉴）。",
            "updatedAt": datetime.now(timezone.utc).isoformat().replace("+00:00", "Z"),
            "requestFeedback": False,
            "userFacing": True,
        }
        meta_path.write_text(json.dumps(meta_payload, ensure_ascii=False, indent=2), encoding="utf-8")

    size_mb = os.path.getsize(out_path) / (1024 * 1024)
    print(f"[OK] Built CSP-clean IIFE preview artifact: {out_path} ({size_mb:.2f} MB, {len(asset_pack)} WebP assets)")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Build standalone CSP-clean HTML artifact")
    parser.add_argument("--out", type=Path, default=DEFAULT_OUT_PATH, help="Output HTML file path")
    parser.add_argument("--skip-meta", action="store_true", help="Do not write .metadata.json")
    args = parser.parse_args()
    build_artifact_html(args.out, skip_meta=args.skip_meta)
