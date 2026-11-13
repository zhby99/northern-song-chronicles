#!/usr/bin/env python3
"""
《北宋立志传》雅乐工坊 — 《东京梦华》(Dreams of Bianliang, 1050 AD) BGM 合成器
调式：D 宫清乐五声（宫 D / 商 E / 角 F# / 清角 G / 徵 A / 羽 B / 变宫 C#）
编制：
  1. 曲笛 / 洞箫 (Dizi / Xiao) — 汴河春晓与夜市华灯主旋律（带气息颤音与滑音装饰）
  2. 琵琶 / 古筝 (Pipa / Guzheng) — 樊楼勾栏清脆轮拂与分解琶音（Karplus-Strong 拨弦物理建模）
  3. 编钟 / 玉磬 (Bianzhong / Yuqing) — 皇祐宫阙与大相国寺金石泛音钟声
  4. 笙 / 丝竹长音 (Sheng / Silk Strings) — 温润五度和声铺底
  5. 檀板 / 堂鼓 (Tanban / Tanggu) — 勾栏瓦舍轻盈节拍点缀
"""

from __future__ import annotations

import math
import os
import subprocess
import tempfile
import wave
from pathlib import Path

import numpy as np

SR = 44100
BPM = 75.0
BEAT_SEC = 60.0 / BPM  # 0.8s per beat
BAR_SEC = BEAT_SEC * 4  # 3.2s per 4/4 bar
TOTAL_BARS = 32
TOTAL_BEATS = TOTAL_BARS * 4  # 128 beats
DURATION = TOTAL_BARS * BAR_SEC  # 102.4 seconds (~1m42s seamless loop)
TAIL_SEC = 4.0  # Extra render tail wrapped to start for 100% click-free seamless looping

NOTE_OFFSETS = {
    "C": 0,
    "C#": 1,
    "Db": 1,
    "D": 2,
    "D#": 3,
    "Eb": 3,
    "E": 4,
    "F": 5,
    "F#": 6,
    "Gb": 6,
    "G": 7,
    "G#": 8,
    "Ab": 8,
    "A": 9,
    "A#": 10,
    "Bb": 10,
    "B": 11,
}


def note_to_freq(note: str) -> float:
    """Convert scientific pitch notation like 'D4', 'F#5', 'A3' to Hz."""
    if len(note) >= 3 and note[1] in ("#", "b"):
        pitch, octave = note[:2], int(note[2:])
    else:
        pitch, octave = note[:1], int(note[1:])
    midi = (octave + 1) * 12 + NOTE_OFFSETS[pitch]
    return 440.0 * (2.0 ** ((midi - 69) / 12.0))


def add_signal(mix_l: np.ndarray, mix_r: np.ndarray, start_sec: float, sig: np.ndarray, pan: float = 0.0):
    """Add mono signal into stereo buffer with equal-power panning (-1.0 left .. +1.0 right)."""
    idx = int(round(start_sec * SR))
    if idx >= len(mix_l) or len(sig) == 0:
        return
    end = min(len(mix_l), idx + len(sig))
    seg = sig[: end - idx]
    angle = (pan + 1.0) * 0.25 * math.pi
    gain_l = math.cos(angle)
    gain_r = math.sin(angle)
    mix_l[idx:end] += seg * gain_l
    mix_r[idx:end] += seg * gain_r


def synth_plucked_string(
    freq: float,
    dur_sec: float,
    amp: float = 0.25,
    brightness: float = 0.55,
    damping: float = 0.9965,
    pick_pos: float = 0.22,
    rng: np.random.Generator | None = None,
) -> np.ndarray:
    """
    Extended Karplus-Strong physical model for Guzheng (warm, long sustain)
    and Pipa (crisp attack, brighter upper partials).
    """
    if rng is None:
        rng = np.random.default_rng(42)
    n_samples = int(dur_sec * SR)
    period = max(4, int(round(SR / freq)))

    # Excitation burst: filtered noise + gentle half-sine body impulse
    burst = rng.uniform(-1.0, 1.0, period).astype(np.float64)
    # Pick-position comb filter gives realistic hollow wood resonance
    comb_delay = max(1, int(round(period * pick_pos)))
    if comb_delay < period:
        burst[comb_delay:] -= 0.65 * burst[:-comb_delay]

    # Smooth initial burst according to brightness (lower = softer finger, higher = pipa plectrum)
    alpha = 0.18 + 0.68 * brightness
    filt = np.empty_like(burst)
    filt[0] = burst[0]
    for i in range(1, period):
        filt[i] = alpha * burst[i] + (1.0 - alpha) * filt[i - 1]

    # Karplus-Strong feedback loop
    out = np.zeros(n_samples, dtype=np.float64)
    buf = filt.copy()
    # Frequency-dependent damping so high notes don't vanish instantly nor ring forever
    note_damp = min(0.9991, damping + 0.0016 * min(1.0, freq / 700.0))
    lp_blend = 0.35 + 0.35 * (1.0 - brightness)

    ptr = 0
    prev = buf[-1]
    for i in range(n_samples):
        cur = buf[ptr]
        out[i] = cur
        avg = (1.0 - lp_blend) * cur + lp_blend * prev
        buf[ptr] = avg * note_damp
        prev = cur
        ptr += 1
        if ptr >= period:
            ptr = 0

    # Subtle body resonance formant (Guzheng/Pipa soundboard ~240Hz & ~520Hz)
    t = np.arange(n_samples, dtype=np.float64) / SR
    body = 0.14 * np.sin(2.0 * math.pi * freq * t) * np.exp(-t * (2.6 if brightness < 0.6 else 4.2))
    sig = out + body

    # Normalize peak & apply natural fade-out envelope
    peak = np.max(np.abs(sig))
    if peak > 1e-6:
        sig = sig / peak
    fade_len = min(n_samples // 5, int(0.08 * SR))
    if fade_len > 0:
        sig[-fade_len:] *= np.linspace(1.0, 0.0, fade_len)
    return sig * amp


def synth_flute_note(
    freq: float,
    dur_sec: float,
    amp: float = 0.22,
    timbre: str = "dizi",
    grace_from_freq: float | None = None,
    rng: np.random.Generator | None = None,
) -> np.ndarray:
    """
    Expressive Bamboo Flute:
    - 'dizi' (曲笛): bright membrane buzz (笛膜泛音), agile grace slide, warm delayed vibrato.
    - 'xiao' (洞箫): airy, mellow, deeper breathiness, gentle pitch bend.
    """
    if rng is None:
        rng = np.random.default_rng(1050)
    release_tail = 0.16
    total_sec = dur_sec + release_tail
    n = int(total_sec * SR)
    t = np.arange(n, dtype=np.float64) / SR

    # Pitch contour: optional grace-note slide (滑音/倚音) + delayed vibrato (气震音)
    freq_curve = np.full(n, freq, dtype=np.float64)
    if grace_from_freq is not None:
        slide_dur = min(0.085, dur_sec * 0.28)
        slide_n = max(1, int(slide_dur * SR))
        s_curve = 0.5 * (1.0 - np.cos(np.linspace(0.0, math.pi, slide_n)))
        freq_curve[:slide_n] = grace_from_freq + (freq - grace_from_freq) * s_curve

    vib_delay = min(0.22, dur_sec * 0.35)
    vib_depth = 0.0085 if timbre == "dizi" else 0.006
    vib_rate = 5.4 if timbre == "dizi" else 4.6
    vib_env = np.clip((t - vib_delay) / 0.22, 0.0, 1.0)
    freq_curve *= 1.0 + vib_depth * vib_env * np.sin(2.0 * math.pi * vib_rate * t)

    phase = 2.0 * math.pi * np.cumsum(freq_curve) / SR

    if timbre == "dizi":
        # Dizi harmonics (strong 1st, 2nd, 3rd + subtle dimo membrane shimmer on 4th-6th)
        harmonics = (
            1.00 * np.sin(phase)
            + 0.48 * np.sin(2.0 * phase + 0.2)
            + 0.28 * np.sin(3.0 * phase + 0.5)
            + 0.13 * np.sin(4.0 * phase + 1.1)
            + 0.07 * np.sin(5.0 * phase)
            + 0.035 * np.sin(6.0 * phase)
        )
        atk_sec = 0.048
    else:
        # Dongxiao harmonics (fundamental + odd harmonic warmth)
        harmonics = (
            1.00 * np.sin(phase)
            + 0.22 * np.sin(2.0 * phase + 0.3)
            + 0.34 * np.sin(3.0 * phase + 0.7)
            + 0.06 * np.sin(4.0 * phase)
        )
        atk_sec = 0.085

    # Amplitude envelope (breath swell + smooth release)
    env = np.ones(n, dtype=np.float64)
    atk_n = max(1, int(atk_sec * SR))
    rel_n = max(1, int(release_tail * SR))
    env[:atk_n] = 0.5 * (1.0 - np.cos(np.linspace(0.0, math.pi, atk_n)))
    # Gentle natural breath phrasing arch
    hold_end = max(atk_n + 1, n - rel_n)
    env[atk_n:hold_end] = 0.94 + 0.06 * np.sin(np.linspace(0.0, math.pi, hold_end - atk_n))
    env[hold_end:] = env[hold_end - 1] * (0.5 * (1.0 + np.cos(np.linspace(0.0, math.pi, n - hold_end))))

    # Chiff / breath air noise at note onset + subtle air stream
    noise = rng.normal(0.0, 1.0, n)
    # Simple 1-pole bandpass-like smoothing around flute airband
    air = np.zeros(n, dtype=np.float64)
    for i in range(2, n):
        air[i] = 0.45 * (noise[i] - noise[i - 2]) + 0.52 * air[i - 1]
    chiff_env = np.exp(-t * 28.0) * 0.09 + env * (0.018 if timbre == "dizi" else 0.032)

    sig = (harmonics / 1.65) * env + air * chiff_env
    return sig * amp


def synth_bianzhong_bell(freq: float, dur_sec: float = 4.2, amp: float = 0.14) -> np.ndarray:
    """
    Ancient Chinese Bronze Bianzhong / Jade Qing chime:
    Inharmonic bronze overtones (1.0, 2.0, 2.76, 4.07, 5.42) with warm slow decay.
    """
    n = int(dur_sec * SR)
    t = np.arange(n, dtype=np.float64) / SR
    partials = [
        (1.000, 1.00, 0.85),
        (2.000, 0.45, 1.35),
        (2.756, 0.32, 2.10),
        (4.070, 0.18, 3.40),
        (5.420, 0.09, 5.20),
    ]
    sig = np.zeros(n, dtype=np.float64)
    for ratio, weight, decay in partials:
        f = freq * ratio
        if f < SR * 0.45:
            sig += weight * np.sin(2.0 * math.pi * f * t) * np.exp(-t * decay)

    # Soft wooden mallet strike transient
    atk_n = max(1, int(0.006 * SR))
    sig[:atk_n] *= np.linspace(0.0, 1.0, atk_n)
    fade_n = min(n // 5, int(0.25 * SR))
    sig[-fade_n:] *= np.linspace(1.0, 0.0, fade_n)
    peak = np.max(np.abs(sig))
    if peak > 1e-6:
        sig /= peak
    return sig * amp


def synth_sheng_pad(notes: list[str], dur_sec: float, amp: float = 0.085) -> np.ndarray:
    """
    Warm Sheng (笙) + Silk Strings fifth/fourth harmonic bed.
    """
    n = int(dur_sec * SR)
    t = np.arange(n, dtype=np.float64) / SR
    sig = np.zeros(n, dtype=np.float64)
    for idx, note in enumerate(notes):
        f = note_to_freq(note)
        detune = 1.0 + (idx - 0.5 * (len(notes) - 1)) * 0.0014
        f1 = f * detune
        # Soft reed-pipe harmonics
        voice = (
            1.0 * np.sin(2.0 * math.pi * f1 * t)
            + 0.32 * np.sin(2.0 * math.pi * 2.0 * f1 * t + 0.4)
            + 0.14 * np.sin(2.0 * math.pi * 3.0 * f1 * t + 0.9)
        )
        # Slow organic breathing LFO
        voice *= 0.90 + 0.10 * np.sin(2.0 * math.pi * (0.35 + 0.08 * idx) * t + idx)
        sig += voice

    sig /= max(1, len(notes)) * 1.35
    atk = min(n // 3, int(0.45 * SR))
    rel = min(n // 3, int(0.55 * SR))
    env = np.ones(n, dtype=np.float64)
    env[:atk] = 0.5 * (1.0 - np.cos(np.linspace(0.0, math.pi, atk)))
    env[-rel:] = 0.5 * (1.0 + np.cos(np.linspace(0.0, math.pi, rel)))
    return sig * env * amp


def synth_tanban_woodblock(amp: float = 0.09) -> np.ndarray:
    """Crisp Song-dynasty Tanban (檀板) clapper accent."""
    dur = 0.11
    n = int(dur * SR)
    t = np.arange(n, dtype=np.float64) / SR
    sig = (
        np.sin(2.0 * math.pi * 935.0 * t) * np.exp(-t * 58.0)
        + 0.55 * np.sin(2.0 * math.pi * 1490.0 * t) * np.exp(-t * 85.0)
        + 0.25 * np.sin(2.0 * math.pi * 2280.0 * t) * np.exp(-t * 130.0)
    )
    atk = max(1, int(0.0015 * SR))
    sig[:atk] *= np.linspace(0.0, 1.0, atk)
    return sig * amp


def synth_tanggu_drum(amp: float = 0.13) -> np.ndarray:
    """Warm, deep ceremonial Tanggu (堂鼓) pulse."""
    dur = 0.55
    n = int(dur * SR)
    t = np.arange(n, dtype=np.float64) / SR
    # Pitch drops subtly from 108Hz to 73.4Hz (D2) on strike
    f_inst = 73.42 + 36.0 * np.exp(-t * 32.0)
    phase = 2.0 * math.pi * np.cumsum(f_inst) / SR
    body = np.sin(phase) * np.exp(-t * 7.5) + 0.35 * np.sin(1.58 * phase) * np.exp(-t * 14.0)
    atk = max(1, int(0.004 * SR))
    body[:atk] *= np.linspace(0.0, 1.0, atk)
    return body * amp


def apply_courtyard_reverb(mix_l: np.ndarray, mix_r: np.ndarray) -> tuple[np.ndarray, np.ndarray]:
    """
    Lush stereo Schroeder/FDN-inspired courtyard & pavilion reverb
    evoking water reflections along the Bian River.
    """
    n = len(mix_l)
    wet_l = np.zeros(n, dtype=np.float64)
    wet_r = np.zeros(n, dtype=np.float64)

    # Prime-spaced comb delays (in seconds) for smooth, non-metallic tail
    taps = [
        (0.0297, 0.24, -0.4),
        (0.0371, 0.22, 0.45),
        (0.0439, 0.20, -0.25),
        (0.0531, 0.18, 0.35),
        (0.0673, 0.15, -0.5),
        (0.0839, 0.13, 0.5),
        (0.1093, 0.11, -0.35),
        (0.1399, 0.09, 0.4),
        (0.1811, 0.075, -0.3),
        (0.2333, 0.06, 0.3),
        (0.3079, 0.045, -0.25),
        (0.3989, 0.032, 0.25),
    ]
    mono_mid = 0.5 * (mix_l + mix_r)
    # Gentle low-pass on reverb send so highs stay silky
    rev_src = np.zeros(n, dtype=np.float64)
    prev = 0.0
    for i in range(n):
        prev = 0.28 * mono_mid[i] + 0.72 * prev
        rev_src[i] = prev

    for delay_sec, gain, pan in taps:
        d = int(round(delay_sec * SR))
        if d < n:
            gl = gain * (0.65 - 0.35 * pan)
            gr = gain * (0.65 + 0.35 * pan)
            wet_l[d:] += rev_src[:-d] * gl
            wet_r[d:] += rev_src[:-d] * gr

    out_l = mix_l * 0.84 + wet_l * 0.46
    out_r = mix_r * 0.84 + wet_r * 0.46
    return out_l, out_r


def compose_dongjing_menghua() -> tuple[np.ndarray, np.ndarray]:
    """
    Compose 32 bars (102.4s) of 《东京梦华》 in D Gong Pentatonic:
      - Bars 0..3   (引子 · 汴水晨钟): Bianzhong bells, Sheng fifths, Guzheng water ripples
      - Bars 4..11  (呈示 · 御街春晓): Expressive Dizi main theme over Guzheng arpeggios
      - Bars 12..19 (展开 · 州桥夜市): Lively Pipa & Guzheng interplay, Tanban/Tanggu market pulse, Dizi soaring
      - Bars 20..27 (梦幻 · 樊楼月影): Mellow Dongxiao nocturnal reflection & high Jade chimes
      - Bars 28..31 (归韵 · 梦回皇祐): Gentle recapitulation resolving cleanly for seamless loop into Bar 0
    """
    rng = np.random.default_rng(10500101)
    buf_len = int((DURATION + TAIL_SEC) * SR)
    mix_l = np.zeros(buf_len, dtype=np.float64)
    mix_r = np.zeros(buf_len, dtype=np.float64)

    # Harmonic progression per bar (32 bars): (root_bass, chord_tones_for_guzheng, sheng_voicing)
    # D Gong: D (宫), E (商), F# (角), A (徵), B (羽)
    PROG_8_A = [
        ("D3", ["D3", "A3", "D4", "E4", "F#4", "A4"], ["D4", "A4"]),
        ("B2", ["B2", "F#3", "B3", "D4", "F#4", "A4"], ["B3", "F#4"]),
        ("G2", ["G2", "D3", "G3", "B3", "D4", "F#4"], ["G3", "D4"]),
        ("A2", ["A2", "E3", "A3", "B3", "E4", "F#4"], ["A3", "E4"]),
        ("D3", ["D3", "A3", "D4", "F#4", "A4", "B4"], ["D4", "A4"]),
        ("F#2", ["F#2", "C#3", "F#3", "A3", "C#4", "F#4"], ["F#3", "C#4"]),
        ("G2", ["G2", "D3", "A3", "B3", "D4", "G4"], ["G3", "D4"]),
        ("A2", ["A2", "E3", "A3", "D4", "E4", "A4"], ["A3", "E4"]),
    ]

    PROG_8_B = [
        ("B2", ["B2", "F#3", "B3", "D4", "F#4", "B4"], ["B3", "F#4"]),
        ("F#2", ["F#2", "C#3", "F#3", "A3", "D4", "F#4"], ["F#3", "D4"]),
        ("G2", ["G2", "D3", "G3", "B3", "D4", "G4"], ["G3", "D4"]),
        ("D3", ["D3", "A3", "D4", "F#4", "A4", "D5"], ["D4", "A4"]),
        ("E2", ["E2", "B2", "E3", "G3", "B3", "E4"], ["E3", "B3"]),
        ("B2", ["B2", "F#3", "B3", "D4", "F#4", "A4"], ["B3", "F#4"]),
        ("G2", ["G2", "D3", "A3", "B3", "E4", "G4"], ["G3", "E4"]),
        ("A2", ["A2", "E3", "A3", "B3", "E4", "A4"], ["A3", "E4"]),
    ]

    bar_harmony = (
        [
            ("D3", ["D3", "A3", "D4", "E4", "F#4", "A4"], ["D4", "A4"]),
            ("A2", ["A2", "E3", "A3", "B3", "E4", "A4"], ["A3", "E4"]),
            ("G2", ["G2", "D3", "G3", "B3", "D4", "F#4"], ["G3", "D4"]),
            ("A2", ["A2", "E3", "A3", "D4", "E4", "A4"], ["A3", "E4"]),
        ]
        + PROG_8_A
        + PROG_8_B
        + PROG_8_A
        + [
            ("G2", ["G2", "D3", "G3", "B3", "D4", "F#4"], ["G3", "D4"]),
            ("E2", ["E2", "B2", "E3", "A3", "B3", "E4"], ["E3", "B3"]),
            ("A2", ["A2", "E3", "A3", "B3", "E4", "F#4"], ["A3", "E4"]),
            ("D3", ["D3", "A3", "D4", "E4", "F#4", "A4"], ["D4", "A4"]),
        ]
    )
    assert len(bar_harmony) == TOTAL_BARS

    # 1. Sheng & Silk Strings Harmonic Pad
    for bar in range(TOTAL_BARS):
        t0 = bar * BAR_SEC
        _, _, sheng_notes = bar_harmony[bar]
        amp = 0.068 if bar < 4 or bar >= 28 else (0.088 if 12 <= bar < 20 else 0.078)
        pad = synth_sheng_pad(sheng_notes, BAR_SEC + 0.45, amp=amp)
        add_signal(mix_l, mix_r, t0, pad, pan=-0.08)

    # 2. Guzheng Flowing Arpeggios & Glissandi (古筝流水拂弦)
    arp_idx_pattern_calm = [0, 1, 2, 3, 4, 3, 2, 1]  # 8 eighth-notes per bar
    arp_idx_pattern_lively = [0, 2, 1, 3, 2, 4, 5, 3]
    for bar in range(TOTAL_BARS):
        t0 = bar * BAR_SEC
        bass_note, tones, _ = bar_harmony[bar]

        # Deep bass Guzheng string pluck on beat 1
        bass_sig = synth_plucked_string(
            note_to_freq(bass_note),
            dur_sec=3.2,
            amp=0.22,
            brightness=0.38,
            damping=0.9978,
            rng=rng,
        )
        add_signal(mix_l, mix_r, t0, bass_sig, pan=-0.22)

        pattern = arp_idx_pattern_lively if 12 <= bar < 20 else arp_idx_pattern_calm
        for step, tone_i in enumerate(pattern):
            # Leave breathing space on bar 31 last 2 steps for seamless cadence
            if bar == 31 and step >= 6:
                continue
            note = tones[tone_i % len(tones)]
            note_time = t0 + step * (BEAT_SEC * 0.5)
            vel = 0.165 if step % 2 == 0 else 0.125
            if 20 <= bar < 28 and step in (3, 7):
                # More spacious moonlit phrasing in Section C
                continue
            gz = synth_plucked_string(
                note_to_freq(note),
                dur_sec=2.2,
                amp=vel,
                brightness=0.46,
                damping=0.9972,
                rng=rng,
            )
            add_signal(mix_l, mix_r, note_time, gz, pan=-0.28 + 0.05 * (step % 4))

        # Signature pentatonic Guzheng glissando (古筝刮奏) at key structural transitions
        if bar in (3, 11, 19, 27):
            gliss_scale = ["D4", "E4", "F#4", "A4", "B4", "D5", "E5", "F#5", "A5"]
            gliss_start = t0 + 2.5 * BEAT_SEC
            for g_i, g_note in enumerate(gliss_scale):
                gz_g = synth_plucked_string(
                    note_to_freq(g_note),
                    dur_sec=1.9,
                    amp=0.095 + 0.008 * g_i,
                    brightness=0.52,
                    damping=0.9968,
                    rng=rng,
                )
                add_signal(mix_l, mix_r, gliss_start + g_i * 0.085, gz_g, pan=-0.35 + 0.08 * g_i)

    # 3. Pipa Crisp Counter-melody & Tremolo Accents (樊楼琵琶珠落玉盘, active in Bars 8..27)
    pipa_phrases: list[tuple[float, str, float]] = [
        # Bars 12..19 (州桥夜市 - Crisp upbeat Pipa ornaments)
        (12 * 4 + 0.0, "F#5", 0.20),
        (12 * 4 + 0.5, "E5", 0.15),
        (12 * 4 + 1.0, "D5", 0.18),
        (12 * 4 + 2.0, "A4", 0.17),
        (12 * 4 + 3.0, "B4", 0.16),
        (13 * 4 + 0.0, "D5", 0.19),
        (13 * 4 + 1.5, "E5", 0.16),
        (13 * 4 + 2.0, "F#5", 0.20),
        (13 * 4 + 3.5, "A5", 0.17),
        (14 * 4 + 0.0, "G5", 0.18),
        (14 * 4 + 0.5, "F#5", 0.15),
        (14 * 4 + 1.0, "E5", 0.17),
        (14 * 4 + 2.0, "D5", 0.19),
        (15 * 4 + 0.0, "A4", 0.18),
        (15 * 4 + 0.25, "A4", 0.13),
        (15 * 4 + 0.5, "A4", 0.14),
        (15 * 4 + 0.75, "A4", 0.15),
        (15 * 4 + 1.0, "D5", 0.20),
        (15 * 4 + 2.0, "E5", 0.18),
        (16 * 4 + 0.0, "B4", 0.19),
        (16 * 4 + 1.0, "E5", 0.17),
        (16 * 4 + 2.0, "G5", 0.18),
        (16 * 4 + 3.0, "F#5", 0.16),
        (17 * 4 + 0.0, "D5", 0.19),
        (17 * 4 + 1.5, "B4", 0.15),
        (17 * 4 + 2.0, "A4", 0.18),
        (18 * 4 + 0.0, "B4", 0.18),
        (18 * 4 + 0.5, "D5", 0.16),
        (18 * 4 + 1.0, "E5", 0.19),
        (18 * 4 + 2.0, "F#5", 0.20),
        (19 * 4 + 0.0, "E5", 0.19),
        (19 * 4 + 0.25, "E5", 0.13),
        (19 * 4 + 0.5, "E5", 0.14),
        (19 * 4 + 0.75, "E5", 0.15),
        (19 * 4 + 1.0, "A5", 0.21),
    ]
    for beat_pos, note, vel in pipa_phrases:
        sig = synth_plucked_string(
            note_to_freq(note),
            dur_sec=1.35,
            amp=vel,
            brightness=0.84,
            damping=0.9945,
            pick_pos=0.13,
            rng=rng,
        )
        add_signal(mix_l, mix_r, beat_pos * BEAT_SEC, sig, pan=0.36)

    # 4. Bianzhong & Jade Qing Bells (皇祐宫阙与相国寺清磬)
    bell_events: list[tuple[float, str, float]] = [
        (0 * 4 + 0.0, "D5", 0.15),
        (2 * 4 + 0.0, "A4", 0.13),
        (4 * 4 + 0.0, "D5", 0.13),
        (8 * 4 + 0.0, "A5", 0.12),
        (12 * 4 + 0.0, "F#5", 0.13),
        (16 * 4 + 0.0, "E5", 0.12),
        (20 * 4 + 0.0, "D5", 0.14),
        (22 * 4 + 0.0, "B4", 0.11),
        (24 * 4 + 0.0, "A5", 0.13),
        (28 * 4 + 0.0, "D5", 0.13),
        (31 * 4 + 0.0, "A4", 0.12),
    ]
    for beat_pos, note, vel in bell_events:
        bell = synth_bianzhong_bell(note_to_freq(note), dur_sec=4.0, amp=vel)
        add_signal(mix_l, mix_r, beat_pos * BEAT_SEC, bell, pan=0.22)

    # 5. Subtle Song Market & Ceremonial Percussion (檀板与堂鼓)
    tanban_hit = synth_tanban_woodblock(amp=0.075)
    tanggu_hit = synth_tanggu_drum(amp=0.115)
    tanggu_soft = synth_tanggu_drum(amp=0.075)

    for bar in range(4, 28):
        t0 = bar * BAR_SEC
        if 12 <= bar < 20:
            # Lively night-market pulse
            add_signal(mix_l, mix_r, t0 + 0.0 * BEAT_SEC, tanggu_hit, pan=0.0)
            add_signal(mix_l, mix_r, t0 + 2.5 * BEAT_SEC, tanggu_soft, pan=0.0)
            add_signal(mix_l, mix_r, t0 + 1.0 * BEAT_SEC, tanban_hit, pan=-0.18)
            add_signal(mix_l, mix_r, t0 + 3.0 * BEAT_SEC, tanban_hit, pan=-0.18)
        elif bar % 2 == 0:
            # Gentle stately pulse in Sections A & C
            add_signal(mix_l, mix_r, t0 + 0.0 * BEAT_SEC, tanggu_soft, pan=0.0)
            add_signal(mix_l, mix_r, t0 + 2.0 * BEAT_SEC, tanban_hit * 0.65, pan=-0.18)

    # 6. Lead Melody: Expressive Qudi (曲笛) & Dongxiao (洞箫)
    # Format: (start_beat, duration_beats, note, grace_from_note_or_None, timbre, amp)
    melody: list[tuple[float, float, str, str | None, str, float]] = [
        # Intro whisper on Dongxiao (Bars 1..3)
        (1 * 4 + 2.0, 2.0, "A4", "F#4", "xiao", 0.16),
        (2 * 4 + 0.0, 2.5, "B4", "A4", "xiao", 0.17),
        (2 * 4 + 2.5, 1.5, "A4", None, "xiao", 0.15),
        (3 * 4 + 0.0, 3.0, "E4", "F#4", "xiao", 0.16),

        # === Section A (Bars 4..11): 御街春晓 · 东京梦华主旋律 (Dizi) ===
        # Bar 4: 宫-商-角-徵 昂扬起兴
        (4 * 4 + 0.0, 1.5, "A4", "F#4", "dizi", 0.22),
        (4 * 4 + 1.5, 0.5, "B4", None, "dizi", 0.19),
        (4 * 4 + 2.0, 1.0, "D5", "B4", "dizi", 0.24),
        (4 * 4 + 3.0, 1.0, "E5", None, "dizi", 0.22),
        # Bar 5: 婉转回落羽音
        (5 * 4 + 0.0, 1.5, "F#5", "E5", "dizi", 0.25),
        (5 * 4 + 1.5, 0.5, "E5", None, "dizi", 0.20),
        (5 * 4 + 2.0, 2.0, "D5", "E5", "dizi", 0.23),
        # Bar 6: 汴水清波
        (6 * 4 + 0.0, 1.0, "B4", "A4", "dizi", 0.21),
        (6 * 4 + 1.0, 1.0, "D5", None, "dizi", 0.22),
        (6 * 4 + 2.0, 1.5, "A4", "B4", "dizi", 0.21),
        (6 * 4 + 3.5, 0.5, "F#4", None, "dizi", 0.18),
        # Bar 7: 停驻微吟
        (7 * 4 + 0.0, 3.2, "E4", "F#4", "dizi", 0.21),

        # Bar 8: 再起高叠，登高望汴京万家烟火
        (8 * 4 + 0.0, 1.0, "F#4", "E4", "dizi", 0.21),
        (8 * 4 + 1.0, 1.0, "A4", None, "dizi", 0.22),
        (8 * 4 + 2.0, 1.5, "D5", "B4", "dizi", 0.24),
        (8 * 4 + 3.5, 0.5, "E5", None, "dizi", 0.21),
        # Bar 9: 登临高处
        (9 * 4 + 0.0, 1.5, "F#5", "E5", "dizi", 0.25),
        (9 * 4 + 1.5, 0.5, "A5", "F#5", "dizi", 0.24),
        (9 * 4 + 2.0, 2.0, "F#5", None, "dizi", 0.23),
        # Bar 10: 行云流水收束
        (10 * 4 + 0.0, 1.0, "E5", "F#5", "dizi", 0.22),
        (10 * 4 + 1.0, 1.0, "D5", None, "dizi", 0.22),
        (10 * 4 + 2.0, 1.0, "B4", "D5", "dizi", 0.21),
        (10 * 4 + 3.0, 1.0, "A4", None, "dizi", 0.20),
        # Bar 11: 归于徵音呼应
        (11 * 4 + 0.0, 3.2, "A4", "B4", "dizi", 0.22),

        # === Section B (Bars 12..19): 州桥夜市 · 宝马雕车香满路 (Agile Dizi) ===
        # Bar 12
        (12 * 4 + 0.0, 1.0, "B4", "A4", "dizi", 0.23),
        (12 * 4 + 1.0, 0.5, "D5", None, "dizi", 0.21),
        (12 * 4 + 1.5, 0.5, "E5", None, "dizi", 0.22),
        (12 * 4 + 2.0, 1.5, "F#5", "E5", "dizi", 0.25),
        (12 * 4 + 3.5, 0.5, "E5", None, "dizi", 0.20),
        # Bar 13
        (13 * 4 + 0.0, 1.0, "F#5", None, "dizi", 0.24),
        (13 * 4 + 1.0, 1.0, "A5", "F#5", "dizi", 0.26),
        (13 * 4 + 2.0, 2.0, "F#5", "A5", "dizi", 0.24),
        # Bar 14 (含清角 G5 雅乐点染，尽显宋韵)
        (14 * 4 + 0.0, 1.0, "G5", "F#5", "dizi", 0.24),
        (14 * 4 + 1.0, 1.0, "F#5", None, "dizi", 0.23),
        (14 * 4 + 2.0, 1.0, "E5", None, "dizi", 0.22),
        (14 * 4 + 3.0, 1.0, "D5", "E5", "dizi", 0.22),
        # Bar 15
        (15 * 4 + 0.0, 2.5, "F#5", "D5", "dizi", 0.24),
        (15 * 4 + 2.5, 1.2, "D5", None, "dizi", 0.21),

        # Bar 16
        (16 * 4 + 0.0, 1.0, "E5", "D5", "dizi", 0.23),
        (16 * 4 + 1.0, 1.0, "B4", None, "dizi", 0.21),
        (16 * 4 + 2.0, 1.5, "D5", "B4", "dizi", 0.23),
        (16 * 4 + 3.5, 0.5, "E5", None, "dizi", 0.21),
        # Bar 17
        (17 * 4 + 0.0, 1.5, "F#5", "E5", "dizi", 0.24),
        (17 * 4 + 1.5, 0.5, "E5", None, "dizi", 0.20),
        (17 * 4 + 2.0, 1.5, "D5", None, "dizi", 0.22),
        (17 * 4 + 3.5, 0.5, "B4", None, "dizi", 0.19),
        # Bar 18
        (18 * 4 + 0.0, 1.0, "A4", "B4", "dizi", 0.21),
        (18 * 4 + 1.0, 1.0, "B4", None, "dizi", 0.22),
        (18 * 4 + 2.0, 1.0, "D5", "B4", "dizi", 0.24),
        (18 * 4 + 3.0, 1.0, "F#5", "D5", "dizi", 0.25),
        # Bar 19
        (19 * 4 + 0.0, 3.2, "E5", "F#5", "dizi", 0.24),

        # === Section C (Bars 20..27): 樊楼月影 · 灯火阑珊处 (Warm Dongxiao Solo) ===
        # Bar 20
        (20 * 4 + 0.0, 2.0, "A4", "F#4", "xiao", 0.23),
        (20 * 4 + 2.0, 1.5, "F#4", "A4", "xiao", 0.21),
        (20 * 4 + 3.5, 0.5, "E4", None, "xiao", 0.19),
        # Bar 21
        (21 * 4 + 0.0, 2.5, "F#4", "D4", "xiao", 0.22),
        (21 * 4 + 2.5, 1.5, "A4", None, "xiao", 0.21),
        # Bar 22
        (22 * 4 + 0.0, 1.5, "B4", "A4", "xiao", 0.23),
        (22 * 4 + 1.5, 0.5, "D5", None, "xiao", 0.22),
        (22 * 4 + 2.0, 2.0, "A4", "B4", "xiao", 0.22),
        # Bar 23
        (23 * 4 + 0.0, 3.2, "E4", "F#4", "xiao", 0.21),

        # Bar 24 (Dizi joins an octave/fifth above in gentle dialogue)
        (24 * 4 + 0.0, 1.5, "D5", "A4", "dizi", 0.21),
        (24 * 4 + 1.5, 0.5, "E5", None, "dizi", 0.19),
        (24 * 4 + 2.0, 2.0, "F#5", "E5", "dizi", 0.23),
        # Bar 25
        (25 * 4 + 0.0, 1.5, "C#5", "D5", "dizi", 0.20),
        (25 * 4 + 1.5, 0.5, "B4", None, "dizi", 0.19),
        (25 * 4 + 2.0, 2.0, "A4", "B4", "dizi", 0.21),
        # Bar 26
        (26 * 4 + 0.0, 1.0, "B4", "A4", "dizi", 0.21),
        (26 * 4 + 1.0, 1.0, "D5", None, "dizi", 0.22),
        (26 * 4 + 2.0, 2.0, "E5", "D5", "dizi", 0.23),
        # Bar 27
        (27 * 4 + 0.0, 3.2, "D5", "E5", "dizi", 0.23),

        # === Outro / Seamless Bridge (Bars 28..31): 梦回皇祐 · 余音绕梁 ===
        (28 * 4 + 0.0, 1.5, "B4", "A4", "xiao", 0.21),
        (28 * 4 + 1.5, 0.5, "A4", None, "xiao", 0.19),
        (28 * 4 + 2.0, 2.0, "F#4", "A4", "xiao", 0.21),
        (29 * 4 + 0.0, 2.0, "E4", "F#4", "xiao", 0.20),
        (29 * 4 + 2.0, 2.0, "F#4", None, "xiao", 0.20),
        (30 * 4 + 0.0, 2.0, "A4", "F#4", "xiao", 0.21),
        (30 * 4 + 2.0, 2.0, "E4", "F#4", "xiao", 0.19),
        (31 * 4 + 0.0, 3.0, "D4", "E4", "xiao", 0.21),
    ]

    for beat_pos, dur_beats, note, grace_note, timbre, amp in melody:
        sig = synth_flute_note(
            freq=note_to_freq(note),
            dur_sec=dur_beats * BEAT_SEC,
            amp=amp,
            timbre=timbre,
            grace_from_freq=note_to_freq(grace_note) if grace_note else None,
            rng=rng,
        )
        pan = 0.12 if timbre == "dizi" else -0.10
        add_signal(mix_l, mix_r, beat_pos * BEAT_SEC, sig, pan=pan)

    # Apply courtyard stereo reverb
    rev_l, rev_r = apply_courtyard_reverb(mix_l, mix_r)

    # Seamless Loop Tail Wrapping: wrap samples past DURATION onto the beginning!
    loop_samples = int(round(DURATION * SR))
    tail_samples = len(rev_l) - loop_samples
    if tail_samples > 0:
        rev_l[:tail_samples] += rev_l[loop_samples:]
        rev_r[:tail_samples] += rev_r[loop_samples:]

    final_l = rev_l[:loop_samples]
    final_r = rev_r[:loop_samples]

    # Gentle soft-knee mastering limiter & peak normalization (-1.5 dBFS)
    final_l = np.tanh(final_l * 1.15)
    final_r = np.tanh(final_r * 1.15)
    peak = max(float(np.max(np.abs(final_l))), float(np.max(np.abs(final_r))), 1e-6)
    target_peak = 10.0 ** (-1.5 / 20.0)  # ~0.841
    final_l *= target_peak / peak
    final_r *= target_peak / peak

    # Micro zero-crossing crossfade (8ms) at exact loop boundary to guarantee 0-click looping
    xf = int(0.008 * SR)
    ramp = np.linspace(0.0, 1.0, xf)
    final_l[:xf] = final_l[:xf] * ramp + final_l[-xf:] * (1.0 - ramp)
    final_r[:xf] = final_r[:xf] * ramp + final_r[-xf:] * (1.0 - ramp)

    return final_l, final_r


def export_mp3(left: np.ndarray, right: np.ndarray, out_mp3_path: Path):
    out_mp3_path.parent.mkdir(parents=True, exist_ok=True)
    pcm_l = np.clip(np.round(left * 32767.0), -32768, 32767).astype(np.int16)
    pcm_r = np.clip(np.round(right * 32767.0), -32768, 32767).astype(np.int16)
    interleaved = np.empty(pcm_l.size * 2, dtype=np.int16)
    interleaved[0::2] = pcm_l
    interleaved[1::2] = pcm_r

    with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as tmp:
        tmp_wav = Path(tmp.name)

    try:
        with wave.open(str(tmp_wav), "wb") as wf:
            wf.setnchannels(2)
            wf.setsampwidth(2)
            wf.setframerate(SR)
            wf.writeframes(interleaved.tobytes())

        cmd = [
            "ffmpeg",
            "-y",
            "-loglevel",
            "error",
            "-i",
            str(tmp_wav),
            "-codec:a",
            "libmp3lame",
            "-b:a",
            "160k",
            "-metadata",
            "title=东京梦华 (Dreams of Bianliang)",
            "-metadata",
            "artist=北宋立志传 · 皇祐雅乐坊",
            "-metadata",
            "album=Northern Song Chronicles OST",
            str(out_mp3_path),
        ]
        subprocess.run(cmd, check=True)
    finally:
        if tmp_wav.exists():
            os.remove(tmp_wav)


def main():
    repo_root = Path(__file__).resolve().parent.parent
    out_mp3 = repo_root / "public" / "assets" / "audio" / "dongjing_menghua.mp3"
    print("[compose_bgm] 正在谱写并渲染北宋雅乐《东京梦华》(D宫清乐五声 · 32小节无缝循环)...")
    left, right = compose_dongjing_menghua()
    export_mp3(left, right, out_mp3)
    size_kb = out_mp3.stat().st_size / 1024.0
    print(f"[OK] 已生成 BGM：{out_mp3} ({DURATION:.1f}s, {size_kb:.1f} KB)")


if __name__ == "__main__":
    main()
