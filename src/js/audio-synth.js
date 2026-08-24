/**
 * AudioSynth.js
 * Real-time additive Fourier audio synthesizer using Web Audio API PeriodicWave.
 * Lets users hear the acoustic timbre evolution of Fourier Series as harmonics N increases.
 */

class AudioSynth {
  constructor(engine) {
    this.engine = engine;
    this.audioCtx = null;
    this.oscillator = null;
    this.gainNode = null;
    this.isPlaying = false;
    this._stopping = false;
    this.baseFrequency = 220; // 220 Hz (A3)
    this.volume = 0.2;
  }

  _initContext() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.audioCtx = new AudioContext();
      this.gainNode = this.audioCtx.createGain();
      this.gainNode.gain.setValueAtTime(0, this.audioCtx.currentTime);
      this.gainNode.connect(this.audioCtx.destination);
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  start() {
    this._initContext();
    if (this.isPlaying || this._stopping) return;

    this.oscillator = this.audioCtx.createOscillator();
    this.oscillator.frequency.setValueAtTime(this.baseFrequency, this.audioCtx.currentTime);

    this.updateWaveform();

    this.oscillator.connect(this.gainNode);
    this.oscillator.start();
    
    // Smooth ramp up
    this.gainNode.gain.cancelScheduledValues(this.audioCtx.currentTime);
    this.gainNode.gain.setValueAtTime(0, this.audioCtx.currentTime);
    this.gainNode.gain.linearRampToValueAtTime(this.volume, this.audioCtx.currentTime + 0.05);

    this.isPlaying = true;
  }

  stop() {
    if (!this.isPlaying || this._stopping || !this.gainNode || !this.oscillator) return;
    
    this._stopping = true;

    // Smooth ramp down
    this.gainNode.gain.cancelScheduledValues(this.audioCtx.currentTime);
    this.gainNode.gain.linearRampToValueAtTime(0, this.audioCtx.currentTime + 0.05);

    setTimeout(() => {
      if (this.oscillator) {
        try {
          this.oscillator.stop();
          this.oscillator.disconnect();
        } catch (e) {}
        this.oscillator = null;
      }
      this.isPlaying = false;
      this._stopping = false;
    }, 60);
  }

  toggle() {
    if (this.isPlaying && !this._stopping) {
      this.stop();
      return false;
    } else if (!this.isPlaying && !this._stopping) {
      this.start();
      return true;
    }
    return this.isPlaying;
  }

  setFrequency(freq) {
    this.baseFrequency = freq;
    if (this.oscillator && this.audioCtx) {
      this.oscillator.frequency.setTargetAtTime(freq, this.audioCtx.currentTime, 0.02);
    }
  }

  setVolume(vol) {
    this.volume = vol;
    if (this.isPlaying && this.gainNode && this.audioCtx) {
      this.gainNode.gain.setTargetAtTime(vol, this.audioCtx.currentTime, 0.02);
    }
  }

  updateWaveform() {
    if (!this.audioCtx || !this.oscillator) return;

    const N = Math.min(this.engine.N, 64);
    const { a, b } = this.engine.coefficients;

    // Web Audio PeriodicWave takes real (cosines) and imag (sines) arrays of length N+1
    const real = new Float32Array(N + 1);
    const imag = new Float32Array(N + 1);

    real[0] = 0; // DC offset removed for audio safety
    imag[0] = 0;

    let maxAmp = 0;
    for (let n = 1; n <= N; n++) {
      real[n] = a[n] || 0;
      imag[n] = b[n] || 0;
      maxAmp = Math.max(maxAmp, Math.hypot(real[n], imag[n]));
    }

    // Manual normalization using disableNormalization: true
    if (maxAmp > 1e-4) {
      for (let n = 1; n <= N; n++) {
        real[n] /= maxAmp;
        imag[n] /= maxAmp;
      }
    }

    try {
      const wave = this.audioCtx.createPeriodicWave(real, imag, { disableNormalization: true });
      this.oscillator.setPeriodicWave(wave);
    } catch (e) {
      console.warn('Audio periodic wave update error:', e);
    }
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = AudioSynth;
}
if (typeof window !== 'undefined') {
  window.AudioSynth = AudioSynth;
}
