#!/usr/bin/env python3
"""
Batch extract transparent character cutouts (.webp) from all fullbody and template portraits
using an ISNet + U2Net dual-model ensemble so rich painted Song-style backgrounds (screens,
pavilions, rugs, landscapes) are cleanly removed while preserving robes, hats, and weapons.

Outputs:
  public/assets/characters/cutouts/fullbody/<id>.webp
  public/assets/characters/cutouts/templates/<name>.webp
"""

from __future__ import annotations

import os
import sys
import time
from concurrent.futures import ProcessPoolExecutor, as_completed
from pathlib import Path

os.environ.setdefault("OMP_NUM_THREADS", "1")
os.environ.setdefault("OPENBLAS_NUM_THREADS", "1")
os.environ.setdefault("MKL_NUM_THREADS", "1")

import numpy as np
from PIL import Image
from rembg import new_session, remove
from scipy.ndimage import binary_fill_holes, gaussian_filter, label

ROOT = Path(__file__).resolve().parent.parent
CHARS_DIR = ROOT / "public" / "assets" / "characters"
OUT_DIR = CHARS_DIR / "cutouts"

_S_ISNET = None
_S_U2NET = None


def _init_worker() -> None:
    global _S_ISNET, _S_U2NET
    import onnxruntime as ort

    sess_opts = ort.SessionOptions()
    sess_opts.intra_op_num_threads = 1
    sess_opts.inter_op_num_threads = 1
    _S_ISNET = new_session("isnet-general-use", sess_opts=sess_opts)
    _S_U2NET = new_session("u2net", sess_opts=sess_opts)


def _process_one(task: tuple[str, str]) -> tuple[str, bool, str]:
    src_str, dst_str = task
    src = Path(src_str)
    dst = Path(dst_str)
    try:
        inp = Image.open(src).convert("RGBA")
        m_is = np.array(remove(inp, session=_S_ISNET, only_mask=True), dtype=np.float32)
        m_u2 = np.array(remove(inp, session=_S_U2NET, only_mask=True), dtype=np.float32)

        # Preserve ultra-confident ISNet foreground (faces, thin weapon shafts) while
        # letting U2Net zero out floor rugs, screens, and furniture.
        u2_boost = np.where(m_is > 246, np.maximum(m_u2, 160.0), m_u2)
        comb = np.sqrt((m_is / 255.0) * (u2_boost / 255.0)) * 255.0

        solid = binary_fill_holes(comb > 135)
        labeled, ncomp = label(comb > 48)
        if ncomp > 1:
            counts = np.bincount(labeled.ravel())
            counts[0] = 0
            main_lbl = int(counts.argmax())
            keep = labeled == main_lbl
            comb = np.where(keep, comb, 0.0)
            solid = solid & keep

        alpha = np.clip((comb - 82.0) * (255.0 / (162.0 - 82.0)), 0.0, 255.0)
        alpha = np.where(solid, 255.0, alpha)
        alpha = gaussian_filter(alpha, sigma=0.55)
        alpha = np.where(alpha < 8.0, 0.0, alpha).astype(np.uint8)

        rgba = np.array(inp)
        rgba[:, :, 3] = alpha
        out = Image.fromarray(rgba, "RGBA")

        bbox = out.getbbox()
        if bbox:
            l, t, r, b = bbox
            l = max(0, l - 4)
            t = max(0, t - 4)
            r = min(out.width, r + 4)
            b = min(out.height, b + 4)
            out = out.crop((l, t, r, b))

        dst.parent.mkdir(parents=True, exist_ok=True)
        out.save(dst, "WEBP", quality=88, method=4)
        return (src.name, True, "")
    except Exception as exc:  # noqa: BLE001
        return (src.name, False, str(exc))


def main() -> int:
    force = "--force" in sys.argv
    tasks: list[tuple[str, str]] = []
    for sub in ("fullbody", "templates"):
        src_dir = CHARS_DIR / sub
        dst_dir = OUT_DIR / sub
        if not src_dir.exists():
            continue
        for p in sorted(src_dir.glob("*.jpg")):
            dst = dst_dir / f"{p.stem}.webp"
            if force or not dst.exists():
                tasks.append((str(p), str(dst)))

    if not tasks:
        print("All cutouts already up to date.")
        return 0

    workers = min(2, os.cpu_count() or 1)
    print(f"Extracting {len(tasks)} character cutouts with {workers} workers...")
    t0 = time.time()
    done = 0
    failed = 0

    with ProcessPoolExecutor(max_workers=workers, initializer=_init_worker) as pool:
        futures = [pool.submit(_process_one, t) for t in tasks]
        for fut in as_completed(futures):
            name, ok, err = fut.result()
            done += 1
            if not ok:
                failed += 1
                print(f"  [FAIL] {name}: {err}", flush=True)
            elif done % 25 == 0 or done == len(tasks):
                elapsed = time.time() - t0
                rate = done / max(0.1, elapsed)
                eta = (len(tasks) - done) / max(0.01, rate)
                print(
                    f"  [{done}/{len(tasks)}] {elapsed:.1f}s elapsed, ~{eta:.0f}s remaining",
                    flush=True,
                )

    print(
        f"Completed {done - failed}/{len(tasks)} cutouts in {time.time() - t0:.1f}s.",
        flush=True,
    )
    return 1 if failed else 0


if __name__ == "__main__":
    raise SystemExit(main())
