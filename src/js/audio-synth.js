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

  // Generate raw 16-bit PCM RIFF WAV ArrayBuffer
  getWavArrayBuffer(duration = 2.5, baseFreq = 220) {
    const sampleRate = 44100;
    const numSamples = Math.floor(duration * sampleRate);
    const N = Math.min(this.engine.N, 64);
    const a = this.engine.a;
    const b = this.engine.b;

    const samples = new Float32Array(numSamples);
    let maxAmp = 0.001;

    for (let i = 0; i < numSamples; i++) {
      const t = i / sampleRate;
      let s = 0;
      for (let n = 1; n <= N; n++) {
        const omega = 2 * Math.PI * (n * baseFreq);
        s += (a[n] || 0) * Math.cos(omega * t) + (b[n] || 0) * Math.sin(omega * t);
      }
      samples[i] = s;
      if (Math.abs(s) > maxAmp) maxAmp = Math.abs(s);
    }

    // Apply anti-click attack and decay envelope
    const fadeSamples = Math.floor(sampleRate * 0.03);
    for (let i = 0; i < fadeSamples; i++) {
      const env = i / fadeSamples;
      samples[i] *= env;
      samples[numSamples - 1 - i] *= env;
    }

    // Encode 16-bit PCM RIFF WAV
    const buffer = new ArrayBuffer(44 + numSamples * 2);
    const view = new DataView(buffer);

    const writeString = (offset, string) => {
      for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
      }
    };

    writeString(0, 'RIFF');
    view.setUint32(4, 36 + numSamples * 2, true);
    writeString(8, 'WAVE');
    writeString(12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true); // PCM
    view.setUint16(22, 1, true); // Mono
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * 2, true);
    view.setUint16(32, 2, true);
    view.setUint16(34, 16, true);
    writeString(36, 'data');
    view.setUint32(40, numSamples * 2, true);

    const scale = 0.85 / maxAmp;
    let offset = 44;
    for (let i = 0; i < numSamples; i++) {
      const s = Math.max(-1, Math.min(1, samples[i] * scale));
      const val = s < 0 ? s * 0x8000 : s * 0x7FFF;
      view.setInt16(offset, val, true);
      offset += 2;
    }

    return buffer;
  }

  // Synthesize and export WAV audio file for classroom acoustic demonstration
  exportWav(duration = 2.5, baseFreq = 220) {
    const buffer = this.getWavArrayBuffer(duration, baseFreq);
    const N = Math.min(this.engine.N, 64);
    const blob = new Blob([buffer], { type: 'audio/wav' });
    const url = URL.createObjectURL(blob);
    const aTag = document.createElement('a');
    aTag.href = url;
    aTag.download = `fourier_timbre_N${N}_${this.engine.presetId || 'custom'}.wav`;
    aTag.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = AudioSynth;
}
if (typeof window !== 'undefined') {
  window.AudioSynth = AudioSynth;
}
