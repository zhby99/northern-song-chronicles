#!/usr/bin/env python3
"""
M0-1 Legacy Base64 Asset Extractor & Data Decoupler
Extracts all inline Base64 images from legacy single-file HTML artifacts into
`public/assets/...` and generates clean Base64-free JSON/TS data modules.
"""

import base64
import glob
import json
import os
import re
import shutil
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parent.parent
PUBLIC_ASSETS = PROJECT_ROOT / "public" / "assets"
SRC_DATA = PROJECT_ROOT / "src" / "data"
DOCS_DIR = PROJECT_ROOT / "docs"

BRANCH_MAP = Path("/shared/user/.gemini/jetski/brain/v1/default/jetski_remote_agents_3p/165aeb2d-47c6-4ae8-9373-51acdcc9d87b")
BRANCH_CHAR = Path("/shared/user/.gemini/jetski/brain/v1/default/jetski_remote_agents_3p/222a70e6-fab2-424a-aeea-38a28a2e1fd7")


def decode_data_uri(uri: str, dest_path: Path) -> int:
    m = re.match(r"^data:image/([a-zA-Z0-9+]+);base64,(.+)$", uri)
    if not m:
        raise ValueError(f"Invalid data URI for {dest_path}")
    raw_bytes = base64.b64decode(m.group(2))
    dest_path.parent.mkdir(parents=True, exist_ok=True)
    dest_path.write_bytes(raw_bytes)
    return len(raw_bytes)


def extract_map_assets_and_data(manifest: dict):
    map_html_path = BRANCH_MAP / "northern_song_map.html"
    html_text = map_html_path.read_text(encoding="utf-8")
    manifest["legacySizes"]["northern_song_map_html_bytes"] = len(html_text.encode("utf-8"))

    # 1. Extract REGIONAL_CONFIG (38 regions)
    m_reg = re.search(r"const REGIONAL_CONFIG\s*=\s*(\{.*\});", html_text)
    if not m_reg:
        raise RuntimeError("Could not locate REGIONAL_CONFIG")
    regional_config = json.loads(m_reg.group(1))

    region_count = 0
    region_bytes = 0
    for reg_id, cfg in regional_config.items():
        uri = cfg.get("panoramaUri")
        if uri and uri.startswith("data:image/"):
            rel_url = f"/assets/regions/{reg_id}.jpg"
            dest = PROJECT_ROOT / "public" / rel_url.lstrip("/")
            written = decode_data_uri(uri, dest)
            cfg["panoramaUri"] = rel_url
            region_count += 1
            region_bytes += written
            manifest["regions"].append({"id": reg_id, "url": rel_url, "bytes": written})

    # 2. Extract BUILDING_PANORAMAS (58 buildings)
    m_bldg = re.search(r"const BUILDING_PANORAMAS\s*=\s*(\{.*\});", html_text)
    if not m_bldg:
        raise RuntimeError("Could not locate BUILDING_PANORAMAS")
    building_panoramas = json.loads(m_bldg.group(1))

    bldg_count = 0
    bldg_bytes = 0
    for bldg_id, bcfg in building_panoramas.items():
        uri = bcfg.get("panoramaUri")
        if uri and uri.startswith("data:image/"):
            rel_url = f"/assets/buildings/{bldg_id}.jpg"
            dest = PROJECT_ROOT / "public" / rel_url.lstrip("/")
            written = decode_data_uri(uri, dest)
            bcfg["panoramaUri"] = rel_url
            bldg_count += 1
            bldg_bytes += written
            manifest["buildings"].append(
                {"id": bldg_id, "regionId": bcfg.get("regionId"), "url": rel_url, "bytes": written}
            )

    SRC_DATA.mkdir(parents=True, exist_ok=True)
    (SRC_DATA / "regionalConfigs.json").write_text(
        json.dumps(regional_config, ensure_ascii=False, indent=2), encoding="utf-8"
    )
    (SRC_DATA / "buildingPanoramas.json").write_text(
        json.dumps(building_panoramas, ensure_ascii=False, indent=2), encoding="utf-8"
    )

    # 3. Extract NODES, EDGES, TERRAIN_META, MOUNTS, REGIME_BADGE, ROAMING_MASTERS via Node.js evaluation of the clean block
    lines = html_text.splitlines()
    # Lines 709..1247 (1-indexed) contain NODES..ROAMING_MASTERS
    js_chunk = "\n".join(lines[708:1248])
    js_eval_script = (
        js_chunk
        + "\nconsole.log(JSON.stringify({ nodes: NODES, edges: EDGES, terrainMeta: TERRAIN_META, mounts: MOUNTS, regimeBadge: REGIME_BADGE, roamingMasters: ROAMING_MASTERS }));"
    )
    tmp_js = PROJECT_ROOT / "scripts" / "_tmp_extract_graph.cjs"
    tmp_js.write_text(js_eval_script, encoding="utf-8")
    import subprocess

    out = subprocess.check_output(["node", str(tmp_js)], text=True)
    tmp_js.unlink()
    world_graph = json.loads(out)
    (SRC_DATA / "worldGraph.json").write_text(
        json.dumps(world_graph, ensure_ascii=False, indent=2), encoding="utf-8"
    )

    # 4. Extract SVG static cartography (<defs> + static layers inside #map-pan-zoom-root before dynamic layers)
    svg_defs_match = re.search(r"(<defs>.*?</defs>)", html_text, re.S)
    pan_root_static_match = re.search(
        r'<g id="map-pan-zoom-root">\s*(.*?)\s*<!-- 动态交互渲染层 -->', html_text, re.S
    )
    if not svg_defs_match or not pan_root_static_match:
        raise RuntimeError("Could not extract static world SVG cartography")

    world_base_ts = f"""// Auto-extracted Song-dynasty cartography static SVG defs & geography layers
export const WORLD_SVG_DEFS_MARKUP = {json.dumps(svg_defs_match.group(1), ensure_ascii=False)};

export const WORLD_SVG_STATIC_GEO_MARKUP = {json.dumps(pan_root_static_match.group(1), ensure_ascii=False)};
"""
    (SRC_DATA / "worldBaseSvg.ts").write_text(world_base_ts, encoding="utf-8")

    manifest["summary"]["regionPanoramasCount"] = region_count
    manifest["summary"]["regionPanoramasBytes"] = region_bytes
    manifest["summary"]["buildingPanoramasCount"] = bldg_count
    manifest["summary"]["buildingPanoramasBytes"] = bldg_bytes


def extract_character_portraits(manifest: dict):
    gallery_path = BRANCH_CHAR / "character_portrait_gallery.html"
    gallery_text = gallery_path.read_text(encoding="utf-8")
    manifest["legacySizes"]["character_portrait_gallery_html_bytes"] = len(gallery_text.encode("utf-8"))

    m_chars = re.search(r"const CHARACTERS\s*=\s*(\[.*?\]);\s*\n", gallery_text, re.S)
    if not m_chars:
        raise RuntimeError("Could not locate CHARACTERS array in character_portrait_gallery.html")

    chars = json.loads(m_chars.group(1))
    av_count = 0
    fb_count = 0
    char_bytes = 0

    clean_chars = []
    for c in chars:
        cid = c["id"]
        av_url = None
        fb_url = None
        if c.get("av") and c["av"].startswith("data:image/"):
            av_url = f"/assets/characters/avatars/{cid}.jpg"
            written = decode_data_uri(c["av"], PROJECT_ROOT / "public" / av_url.lstrip("/"))
            av_count += 1
            char_bytes += written
        if c.get("fb") and c["fb"].startswith("data:image/"):
            fb_url = f"/assets/characters/fullbody/{cid}.jpg"
            written = decode_data_uri(c["fb"], PROJECT_ROOT / "public" / fb_url.lstrip("/"))
            fb_count += 1
            char_bytes += written

        clean_chars.append(
            {
                "id": cid,
                "name": c["name"],
                "title": c["title"],
                "cat": c["cat"],
                "gender": c["gender"],
                "age": c["age"],
                "faction": c["faction"],
                "role": c["role"],
                "loc": c["loc"],
                "realm": c["realm"],
                "arts": c["arts"],
                "bio": c["bio"],
                "avatarUrl": av_url,
                "fullbodyUrl": fb_url,
            }
        )

    # Also copy the 12 archetype templates (tpl_*.jpg) from BRANCH_CHAR
    tpl_dir = PUBLIC_ASSETS / "characters" / "templates"
    tpl_dir.mkdir(parents=True, exist_ok=True)
    tpl_list = []
    tpl_bytes = 0
    for src_tpl in sorted(BRANCH_CHAR.glob("tpl_*.jpg")):
        # Strip timestamp suffix: tpl_shaolin_monk_fb_1794505421244.jpg -> tpl_shaolin_monk_fb.jpg
        clean_name = re.sub(r"_\d+\.jpg$", ".jpg", src_tpl.name)
        dest_tpl = tpl_dir / clean_name
        shutil.copy2(src_tpl, dest_tpl)
        sz = dest_tpl.stat().st_size
        tpl_bytes += sz
        tpl_list.append({"id": clean_name.replace(".jpg", ""), "url": f"/assets/characters/templates/{clean_name}", "bytes": sz})

    (SRC_DATA / "portraitCatalog.json").write_text(
        json.dumps({"characters": clean_chars, "templates": tpl_list}, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )

    manifest["summary"]["characterAvatarsCount"] = av_count
    manifest["summary"]["characterFullbodiesCount"] = fb_count
    manifest["summary"]["characterTemplatesCount"] = len(tpl_list)
    manifest["summary"]["characterAssetsBytes"] = char_bytes + tpl_bytes
    manifest["templates"] = tpl_list


def copy_design_docs():
    DOCS_DIR.mkdir(parents=True, exist_ok=True)
    shutil.copy2(BRANCH_MAP / "GAME_MECHANICS.md", DOCS_DIR / "GAME_MECHANICS.md")
    shutil.copy2(BRANCH_MAP / "MARTIAL_ARTS_COMPENDIUM.md", DOCS_DIR / "MARTIAL_ARTS_COMPENDIUM.md")
    shutil.copy2(BRANCH_MAP / "REGIONAL_MAPS_AND_BUILDINGS.md", DOCS_DIR / "REGIONAL_MAPS_AND_BUILDINGS.md")
    shutil.copy2(BRANCH_CHAR / "CHARACTER_COMPENDIUM.md", DOCS_DIR / "CHARACTER_COMPENDIUM.md")


def main():
    manifest = {
        "generatedBy": "scripts/extract_legacy_assets.py",
        "legacySizes": {},
        "summary": {},
        "regions": [],
        "buildings": [],
        "templates": [],
    }
    extract_map_assets_and_data(manifest)
    extract_character_portraits(manifest)
    copy_design_docs()

    total_files = (
        manifest["summary"]["regionPanoramasCount"]
        + manifest["summary"]["buildingPanoramasCount"]
        + manifest["summary"]["characterAvatarsCount"]
        + manifest["summary"]["characterFullbodiesCount"]
        + manifest["summary"]["characterTemplatesCount"]
    )
    total_bytes = (
        manifest["summary"]["regionPanoramasBytes"]
        + manifest["summary"]["buildingPanoramasBytes"]
        + manifest["summary"]["characterAssetsBytes"]
    )
    manifest["summary"]["totalExtractedImageFiles"] = total_files
    manifest["summary"]["totalExtractedImageBytes"] = total_bytes

    (SRC_DATA / "assetManifest.json").write_text(
        json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8"
    )
    print(json.dumps(manifest["summary"], ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
