#!/usr/bin/env python3
"""
Calibrate EBU R128 / ITU-R BS.1770 perceptual loudness profiles for all BGM tracks
under `public/assets/audio/` without re-encoding MP3 files (0% generation loss).

Outputs `public/assets/audio/loudness_profiles.json`, automatically consumed by
`vite.config.ts` (`virtual:audio-manifest`) and applied via Web Audio `GainNode`
+ `DynamicsCompressorNode` in `src/utils/bgmManager.ts`.
"""

from __future__ import annotations

import glob
import json
import os
import re
import subprocess
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

ROOT_DIR = Path(__file__).resolve().parent.parent
AUDIO_ROOT = ROOT_DIR / "public" / "assets" / "audio"
OUTPUT_JSON = AUDIO_ROOT / "loudness_profiles.json"

TARGET_LUFS = -14.0
MIN_GAIN_DB = -9.0
MAX_GAIN_DB = 8.0
AUDIO_EXTS = (".mp3", ".m4a", ".ogg", ".wav", ".aac", ".flac")


def analyze_track(abs_path: Path) -> tuple[str, dict[str, float]]:
    web_url = "/assets/audio/" + abs_path.relative_to(AUDIO_ROOT).as_posix()

    # 1. EBU R128 Integrated Loudness (LUFS), True Peak (dBTP), Loudness Range (LU)
    p_loud = subprocess.run(
        [
            "ffmpeg",
            "-hide_banner",
            "-i",
            str(abs_path),
            "-af",
            f"loudnorm=I={TARGET_LUFS}:TP=-1.5:LRA=11:print_format=json",
            "-f",
            "null",
            "-",
        ],
        capture_output=True,
        text=True,
        check=False,
    )
    m_json = re.search(r"\{\s*\"input_i\".*?\}", p_loud.stderr, re.S)
    if not m_json:
        raise RuntimeError(f"Failed to parse loudnorm JSON for {abs_path}")
    info = json.loads(m_json.group(0))
    integrated_lufs = float(info["input_i"])
    true_peak_db = float(info["input_tp"])
    lra_lu = float(info["input_lra"])

    # 2. Short-term (3s window) median loudness (p50) to catch tracks with long quiet bodies
    p_st = subprocess.run(
        [
            "ffmpeg",
            "-hide_banner",
            "-i",
            str(abs_path),
            "-af",
            "ebur128=metadata=1,ametadata=mode=print:key=lavfi.r128.S",
            "-f",
            "null",
            "-",
        ],
        capture_output=True,
        text=True,
        check=False,
    )
    st_vals = sorted(
        float(x)
        for x in re.findall(r"lavfi\.r128\.S=(-?\d+\.\d+)", p_st.stderr)
        if float(x) > -55.0
    )
    median_lufs = st_vals[len(st_vals) // 2] if st_vals else integrated_lufs

    # Blend 65% EBU R128 Integrated + 35% Median Short-Term when body is quieter than climax
    effective_lufs = (
        0.65 * integrated_lufs + 0.35 * median_lufs
        if median_lufs < integrated_lufs
        else integrated_lufs
    )
    raw_gain_db = TARGET_LUFS - effective_lufs
    gain_db = round(max(MIN_GAIN_DB, min(MAX_GAIN_DB, raw_gain_db)), 2)

    return (
        web_url,
        {
            "integratedLufs": round(integrated_lufs, 2),
            "medianLufs": round(median_lufs, 2),
            "truePeakDb": round(true_peak_db, 2),
            "lraLu": round(lra_lu, 2),
            "gainDb": gain_db,
        },
    )


def main() -> None:
    audio_files = sorted(
        Path(p)
        for p in glob.glob(str(AUDIO_ROOT / "**" / "*"), recursive=True)
        if os.path.isfile(p) and p.lower().endswith(AUDIO_EXTS)
    )

    workers = min(8, max(1, os.cpu_count() or 4))
    with ThreadPoolExecutor(max_workers=workers) as pool:
        results = dict(pool.map(analyze_track, audio_files))

    payload = {
        "schemaVersion": 1,
        "targetLufs": TARGET_LUFS,
        "tracks": dict(sorted(results.items())),
    }
    OUTPUT_JSON.write_text(
        json.dumps(payload, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )

    print(f"Calibrated {len(results)} tracks -> {OUTPUT_JSON.relative_to(ROOT_DIR)} (target {TARGET_LUFS} LUFS):")
    for url, meta in payload["tracks"].items():
        print(
            f"  {url:46} | I={meta['integratedLufs']:6.2f} LUFS | p50={meta['medianLufs']:6.2f} LUFS"
            f" | TP={meta['truePeakDb']:+5.2f} dBTP | gain={meta['gainDb']:+6.2f} dB"
        )


if __name__ == "__main__":
    main()
