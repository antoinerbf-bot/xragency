/**
 * Generative Web Audio Experience for XR Agency.
 * Inspired by high-end award-winning digital studios (Awwwards / Lusion).
 * Pure client-side Web Audio API synthesizer with no external assets needed.
 */

type SoundListener = (active: boolean) => void;

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private listeners: Set<SoundListener> = new Set();

  // Audio Nodes for generative ambient drone
  private masterGain: GainNode | null = null;
  private droneOsc1: OscillatorNode | null = null;
  private droneOsc2: OscillatorNode | null = null;
  private lfo: OscillatorNode | null = null;
  private filter: BiquadFilterNode | null = null;
  private intervalId: number | null = null;

  public subscribe(fn: SoundListener) {
    this.listeners.add(fn);
    return () => {
      this.listeners.delete(fn);
    };
  }

  public get active(): boolean {
    return this.isPlaying;
  }

  private notify() {
    this.listeners.forEach((fn) => fn(this.isPlaying));
  }

  private initContext() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public start() {
    this.initContext();
    if (!this.ctx) return;
    if (this.isPlaying) return;

    try {
      const now = this.ctx.currentTime;

      // Master Gain
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.001, now);
      this.masterGain.gain.exponentialRampToValueAtTime(0.075, now + 1.2);
      this.masterGain.connect(this.ctx.destination);

      // Low Pass Warm Filter
      this.filter = this.ctx.createBiquadFilter();
      this.filter.type = "lowpass";
      this.filter.frequency.setValueAtTime(180, now);
      this.filter.Q.setValueAtTime(3.2, now);
      this.filter.connect(this.masterGain);

      // Sub Bass Drone 1 (Deep Champagne Tone - 55 Hz A1)
      this.droneOsc1 = this.ctx.createOscillator();
      this.droneOsc1.type = "sine";
      this.droneOsc1.frequency.setValueAtTime(55, now);
      this.droneOsc1.connect(this.filter);
      this.droneOsc1.start();

      // Drone 2 (Fifth Harmonic - 82.5 Hz E2 with slight detune)
      this.droneOsc2 = this.ctx.createOscillator();
      this.droneOsc2.type = "triangle";
      this.droneOsc2.frequency.setValueAtTime(82.4, now);
      this.droneOsc2.connect(this.filter);
      this.droneOsc2.start();

      // LFO for organic breath
      this.lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      this.lfo.frequency.setValueAtTime(0.18, now); // slow 5-second cycle
      lfoGain.gain.setValueAtTime(45, now);
      this.lfo.connect(lfoGain);
      lfoGain.connect(this.filter.frequency);
      this.lfo.start();

      // Occasional ethereal arpeggios
      const pentatonic = [220, 261.63, 329.63, 392, 440, 523.25, 659.25];
      this.intervalId = window.setInterval(() => {
        if (!this.isPlaying || !this.ctx) return;
        if (Math.random() > 0.4) {
          const freq = pentatonic[Math.floor(Math.random() * pentatonic.length)];
          this.playCrystalNote(freq, 0.02, 1.8);
        }
      }, 3500);

      this.isPlaying = true;
      this.notify();
    } catch (e) {
      console.warn("XR Audio Engine start error:", e);
    }
  }

  public stop() {
    if (!this.ctx || !this.isPlaying) return;

    try {
      const now = this.ctx.currentTime;
      if (this.masterGain) {
        this.masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);
        setTimeout(() => {
          this.droneOsc1?.stop();
          this.droneOsc1?.disconnect();
          this.droneOsc2?.stop();
          this.droneOsc2?.disconnect();
          this.lfo?.stop();
          this.lfo?.disconnect();
          this.droneOsc1 = null;
          this.droneOsc2 = null;
          this.lfo = null;
        }, 700);
      }
      if (this.intervalId) {
        clearInterval(this.intervalId);
        this.intervalId = null;
      }
    } catch (e) {
      console.warn("XR Audio Engine stop error:", e);
    }

    this.isPlaying = false;
    this.notify();
  }

  /**
   * Resonant crystal chime triggered on user interaction (hover, click, 3D shockwave).
   */
  public playChime(freq = 528, volume = 0.045, duration = 0.8) {
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.02, now + duration);

      gain.gain.setValueAtTime(volume, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + duration);
    } catch {}
  }

  /**
   * Low visceral pulse for 3D liquid shockwave ripples.
   */
  public playShockwave() {
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(120, now);
      osc.frequency.exponentialRampToValueAtTime(38, now + 0.45);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.5);

      // Add a sparkling shimmer
      setTimeout(() => this.playChime(880, 0.03, 0.9), 60);
    } catch {}
  }

  private playCrystalNote(freq: number, volume: number, duration: number) {
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(volume, now + 0.15);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + duration);
    } catch {}
  }
}

export const audioEngine = new SoundEngine();
