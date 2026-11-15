import math
import struct
import wave
import random

SAMPLE_RATE = 48000
DURATION = 88.5  # seconds
NUM_SAMPLES = int(SAMPLE_RATE * DURATION)

buf = [0.0] * NUM_SAMPLES

def add_pop(t_sec, freq_start=900.0, freq_end=1450.0, dur=0.055, amp=0.14):
    start = int(t_sec * SAMPLE_RATE)
    length = int(dur * SAMPLE_RATE)
    for i in range(length):
        idx = start + i
        if idx >= NUM_SAMPLES:
            break
        u = i / length
        env = math.sin(math.pi * u) ** 1.4
        freq = freq_start + (freq_end - freq_start) * u
        val = math.sin(2.0 * math.pi * freq * (i / SAMPLE_RATE)) * env * amp
        buf[idx] += val

def add_click(t_sec, amp=0.10):
    add_pop(t_sec, freq_start=1800.0, freq_end=700.0, dur=0.025, amp=amp)

def add_whoosh(t_sec, dur=0.28, amp=0.16):
    start = int(t_sec * SAMPLE_RATE)
    length = int(dur * SAMPLE_RATE)
    # Soft filtered noise + warm sub sweep
    lp = 0.0
    for i in range(length):
        idx = start + i
        if idx >= NUM_SAMPLES:
            break
        u = i / length
        env = math.sin(math.pi * u) ** 1.8
        noise = random.uniform(-1.0, 1.0)
        # dynamic lowpass coefficient sweeps up then down
        cutoff = 0.03 + 0.14 * math.sin(math.pi * u)
        lp = lp + cutoff * (noise - lp)
        sub = math.sin(2.0 * math.pi * (80.0 + 70.0 * math.sin(math.pi * u)) * (i / SAMPLE_RATE)) * 0.25
        buf[idx] += (lp * 1.6 + sub) * env * amp

# Scene transition swooshes aligned with voiceover pauses (V4 88.08s)
TRANSITIONS = [10.36, 20.63, 29.31, 38.35, 58.36, 66.49, 77.79]
for t in TRANSITIONS:
    add_whoosh(max(0.0, t - 0.14), dur=0.28, amp=0.16)

# Crisp UI micro-pops for animations / cards / highlights
POPS = [
    1.1, 2.2,
    13.5,
    22.4, 24.4,
    30.2, 33.5,
    39.0, 47.0,
    59.2, 62.5,
    67.0, 69.5, 72.0,
    79.0
]
for t in POPS:
    add_pop(t, amp=0.10)

# Tiny soft keyboard clicks for Google search typing (~10.8s - 12.6s)
for k in range(14):
    add_click(10.8 + k * 0.11, amp=0.04)

# Soft clamp and export 16-bit 48kHz PCM WAV
out_path = "/tmp/xr_vsl_sfx.wav"
with wave.open(out_path, "wb") as wf:
    wf.setnchannels(1)
    wf.setsampwidth(2)
    wf.setframerate(SAMPLE_RATE)
    pcm = bytearray()
    for s in buf:
        clamped = max(-0.95, min(0.95, s))
        pcm.extend(struct.pack("<h", int(clamped * 32767)))
    wf.writeframes(bytes(pcm))

print(f"SFX track written to {out_path} ({DURATION}s)")

