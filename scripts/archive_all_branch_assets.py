#!/usr/bin/env python3
"""
Consolidate 100% of generated raw master artworks, roadmap documents, agent specs,
and legacy data-generation scripts from all conversation & subagent brain directories
into the repository (/home/antigravity/northern-song-chronicles).
"""

from __future__ import annotations

import hashlib
import json
import os
import re
import shutil
from pathlib import Path

REPO_ROOT = Path("/home/antigravity/northern-song-chronicles")
BRAIN_ROOT = Path("/home/antigravity/.gemini/jetski/brain")

MASTERS_DIR = REPO_ROOT / "assets_raw_masters"
LEGACY_DIR = REPO_ROOT / "legacy_prototypes_and_tools"


def sha256_of(path: Path) -> str:
    h = hashlib.sha256()
    with path.open("rb") as f:
        for chunk in iter(lambda: f.read(65536), b""):
            h.update(chunk)
    return h.hexdigest()


def classify_master_image(filename: str) -> str:
    lower = filename.lower()
    if lower.startswith("reg_") or lower.startswith("kaifeng_"):
        return "regions"
    if (
        lower.startswith("npc_")
        or lower.startswith("tpl_")
        or "_avatar_" in lower
        or "_fullbody_" in lower
    ):
        return "characters"
    return "buildings"


def strip_timestamp(filename: str) -> str:
    stem, ext = os.path.splitext(filename)
    clean_stem = re.sub(r"_\d{10,16}$", "", stem)
    return f"{clean_stem}{ext.lower()}"


def archive_master_images() -> list[dict]:
    if MASTERS_DIR.exists():
        shutil.rmtree(MASTERS_DIR)
    for sub in ("regions", "buildings", "characters"):
        (MASTERS_DIR / sub).mkdir(parents=True, exist_ok=True)

    discovered: list[tuple[str, Path, str]] = []
    for root, dirs, files in os.walk(BRAIN_ROOT):
        dirs[:] = [
            d
            for d in dirs
            if d not in (".tempmediaStorage", ".system_generated", "__pycache__")
        ]
        for fname in sorted(files):
            if not fname.lower().endswith((".jpg", ".jpeg", ".png", ".webp")):
                continue
            full_path = Path(root) / fname
            rel_to_brain = full_path.relative_to(BRAIN_ROOT).as_posix()
            if "/scratch/" in f"/{rel_to_brain}":
                continue
            discovered.append((fname, full_path, rel_to_brain))

    manifest_entries: list[dict] = []
    seen_targets: dict[str, str] = {}

    for fname, full_path, rel_to_brain in sorted(discovered, key=lambda x: x[0]):
        category = classify_master_image(fname)
        clean_name = strip_timestamp(fname)
        digest = sha256_of(full_path)

        target_rel = f"{category}/{clean_name}"
        if target_rel in seen_targets and seen_targets[target_rel] != digest:
            # Preserve timestamp if two distinct revisions share the same base stem
            target_rel = f"{category}/{fname}"

        target_path = MASTERS_DIR / target_rel
        shutil.copy2(full_path, target_path)
        seen_targets[target_rel] = digest

        manifest_entries.append(
            {
                "category": category,
                "archivePath": f"assets_raw_masters/{target_rel}",
                "originalFilename": fname,
                "sourceBrainRelativePath": rel_to_brain,
                "bytes": target_path.stat().st_size,
                "sha256": digest,
            }
        )

    manifest = {
        "totalMasterFiles": len(manifest_entries),
        "totalBytes": sum(item["bytes"] for item in manifest_entries),
        "countsByCategory": {
            cat: sum(1 for item in manifest_entries if item["category"] == cat)
            for cat in ("regions", "buildings", "characters")
        },
        "files": manifest_entries,
    }
    (MASTERS_DIR / "MANIFEST.json").write_text(
        json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )
    return manifest_entries


def archive_docs_and_legacy_tools() -> dict:
    # 1. Copy ROADMAP_AND_TODO.md into docs/ with repo-relative markdown links
    roadmap_src = (
        BRAIN_ROOT
        / "v1/default/jetski_remote_agents_3p/7a9ed227-5322-4f0c-a97a-844dec45ddf7/ROADMAP_AND_TODO.md"
    )
    roadmap_dst = REPO_ROOT / "docs/ROADMAP_AND_TODO.md"
    if roadmap_src.exists():
        text = roadmap_src.read_text(encoding="utf-8")
        # Normalize cross-branch brain file:/// links to repo-relative links where applicable
        text = re.sub(
            r"file:///home/antigravity/\.gemini/jetski/brain/[^)\s]+/(GAME_MECHANICS\.md|MARTIAL_ARTS_COMPENDIUM\.md|REGIONAL_MAPS_AND_BUILDINGS\.md|CHARACTER_COMPENDIUM\.md)",
            r"./\1",
            text,
        )
        roadmap_dst.write_text(text, encoding="utf-8")

    # 2. Archive subagent prompt specs & early lightweight generator scripts/prototypes
    if LEGACY_DIR.exists():
        shutil.rmtree(LEGACY_DIR)
    (LEGACY_DIR / "agent_specs").mkdir(parents=True, exist_ok=True)
    (LEGACY_DIR / "map_generators").mkdir(parents=True, exist_ok=True)
    (LEGACY_DIR / "character_generators").mkdir(parents=True, exist_ok=True)
    (LEGACY_DIR / "early_svg_prototype").mkdir(parents=True, exist_ok=True)

    copies = [
        (
            "v1/default/jetski_remote_agents_3p/165aeb2d-47c6-4ae8-9373-51acdcc9d87b/.agents/agents/panorama_artist/agent.md",
            "agent_specs/panorama_artist_agent.md",
        ),
        (
            "v1/default/jetski_remote_agents_3p/222a70e6-fab2-424a-aeea-38a28a2e1fd7/.agents/agents/portrait_artist/agent.md",
            "agent_specs/portrait_artist_agent.md",
        ),
        (
            "v1/default/jetski_remote_agents_3p/165aeb2d-47c6-4ae8-9373-51acdcc9d87b/scratch/build_northern_song_map.py",
            "map_generators/build_northern_song_map.py",
        ),
        (
            "v1/default/jetski_remote_agents_3p/165aeb2d-47c6-4ae8-9373-51acdcc9d87b/scratch/gen_geo.py",
            "map_generators/gen_geo.py",
        ),
        (
            "v1/default/jetski_remote_agents_3p/165aeb2d-47c6-4ae8-9373-51acdcc9d87b/scratch/geo_paths.json",
            "map_generators/geo_paths.json",
        ),
        (
            "v1/default/jetski_remote_agents_3p/165aeb2d-47c6-4ae8-9373-51acdcc9d87b/scratch/polish_backdrops.py",
            "map_generators/polish_backdrops.py",
        ),
        (
            "v1/default/jetski_remote_agents_3p/165aeb2d-47c6-4ae8-9373-51acdcc9d87b/scratch/upgrade_regional_maps.py",
            "map_generators/upgrade_regional_maps.py",
        ),
        (
            "af628ab615979de06aa203425f02e908/scratch/build_manifest.py",
            "map_generators/build_manifest.py",
        ),
        (
            "v1/default/jetski_remote_agents_3p/222a70e6-fab2-424a-aeea-38a28a2e1fd7/scratch/build_1000_characters.py",
            "character_generators/build_1000_characters.py",
        ),
        (
            "v1/default/jetski_remote_agents_3p/222a70e6-fab2-424a-aeea-38a28a2e1fd7/scratch/part1_hist_and_top.py",
            "character_generators/part1_hist_and_top.py",
        ),
        (
            "v1/default/jetski_remote_agents_3p/222a70e6-fab2-424a-aeea-38a28a2e1fd7/scratch/part2_first_rate.py",
            "character_generators/part2_first_rate.py",
        ),
        (
            "v1/default/jetski_remote_agents_3p/222a70e6-fab2-424a-aeea-38a28a2e1fd7/scratch/part3_mid_and_lower.py",
            "character_generators/part3_mid_and_lower.py",
        ),
        (
            "v1/default/jetski_remote_agents_3p/222a70e6-fab2-424a-aeea-38a28a2e1fd7/scratch/sync_gallery.py",
            "character_generators/sync_gallery.py",
        ),
        (
            "v1/default/jetski_remote_agents_3p/64363463-79d5-4733-b8d8-8992c6793c31/northern_song_map.html",
            "early_svg_prototype/northern_song_world_svg_v1.html",
        ),
    ]

    copied_count = 0
    for src_rel, dst_rel in copies:
        src_path = BRAIN_ROOT / src_rel
        dst_path = LEGACY_DIR / dst_rel
        if src_path.exists():
            shutil.copy2(src_path, dst_path)
            copied_count += 1

    return {"copiedLegacyFiles": copied_count, "roadmapCopied": roadmap_dst.exists()}


def main() -> None:
    masters = archive_master_images()
    extras = archive_docs_and_legacy_tools()
    print(
        f"Archived {len(masters)} high-res master images "
        f"({sum(m['bytes'] for m in masters) / 1024 / 1024:.2f} MB) into {MASTERS_DIR}"
    )
    print(f"Archived docs & legacy generator scripts: {extras}")


if __name__ == "__main__":
    main()
