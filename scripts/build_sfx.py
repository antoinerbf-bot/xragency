import math
import struct
import wave
import random

SAMPLE_RATE = 48000
DURATION = 101.5  # seconds
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

# Scene transition swooshes aligned with voiceover pauses
TRANSITIONS = [9.7, 15.7, 25.1, 32.0, 41.05, 50.55, 62.05, 75.6, 86.85, 95.2]
for t in TRANSITIONS:
    add_whoosh(max(0.0, t - 0.14), dur=0.28, amp=0.18)

# Crisp UI micro-pops for animations / cards / highlights
POPS = [
    1.1, 3.0, 5.4,              # Scene 1 pills
    10.4, 12.4, 13.8,           # Scene 2 typing & suggestions
    17.3, 21.0,                 # Scene 3 competitor alert & call badge
    26.0, 29.0,                 # Scene 4 speedometer & warning
    34.2, 35.8,                 # Scene 5 slash vitrine -> machine badge
    42.2, 43.4, 44.6, 45.8,     # Scene 6 4 checklist cards
    52.4, 54.0, 56.2, 59.0,     # Scene 7 Maps #1 rise + 99€ + 159€ + result
    63.5, 69.8,                 # Scene 8 Social + Branding cards
    75.9, 80.1, 83.6,           # Scene 9 SEO, WebCare, Robots
    87.4, 88.2, 91.0, 93.0,     # Scene 10 +50, stars, timeline
    96.2, 98.0                  # Scene 11 WhatsApp bubble + blue ticks
]
for t in POPS:
    add_pop(t, amp=0.11)

# Tiny soft keyboard clicks for Google search typing (~10.5s - 12.2s)
for k in range(14):
    add_click(10.6 + k * 0.11, amp=0.045)

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

