/**
 * Moving Average DSP Engine — Computação Matemática e Filtragem Digital
 * USP — Processamento Digital de Sinais
 */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.MovingAverageEngine = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  // Gerador Gaussiano padrão (Box-Muller)
  function gaussianRandom() {
    let u = 0, v = 0;
    while (u === 0) u = Math.random();
    while (v === 0) v = Math.random();
    return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  }

  /**
   * Gera o sinal ideal baseado no preset selecionado
   * @param {string} type Tipo do sinal ('step', 'square', 'sine', 'impulse', 'ecg')
   * @param {number} N Número total de amostras
   * @param {object} params Parâmetros adicionais (stepIndex, highVal, lowVal, freq)
   * @returns {number[]} Array com as amostras ideais
   */
  function generateSignal(type, N, params) {
    const p = Object.assign({
      stepIndex: Math.floor(N / 2),
      highVal: 2.0,
      lowVal: 1.0,
      freq: 2.0
    }, params || {});

    const signal = new Array(N);

    switch (type) {
      case 'step':
        for (let i = 0; i < N; i++) {
          signal[i] = i < p.stepIndex ? p.highVal : p.lowVal;
        }
        break;

      case 'square': {
        const period = Math.max(8, Math.floor(N / 3));
        for (let i = 0; i < N; i++) {
          const phase = (i % period) / period;
          signal[i] = phase < 0.5 ? p.highVal : p.lowVal;
        }
        break;
      }

      case 'sine': {
        const mid = (p.highVal + p.lowVal) / 2;
        const amp = (p.highVal - p.lowVal) / 2;
        for (let i = 0; i < N; i++) {
          signal[i] = mid + amp * Math.sin((2 * Math.PI * p.freq * i) / (N - 1));
        }
        break;
      }

      case 'impulse': {
        const pulseIdx = Math.floor(N / 3);
        for (let i = 0; i < N; i++) {
          signal[i] = (i === pulseIdx) ? p.highVal : p.lowVal;
        }
        break;
      }

      case 'ecg': {
        // Sinal biomédico sintético tipo ECG simplificado
        const base = p.lowVal;
        const span = p.highVal - p.lowVal;
        const period = Math.floor(N / 2);
        for (let i = 0; i < N; i++) {
          const mod = i % period;
          let val = base;
          if (mod === 5) val += 0.15 * span; // Onda P
          else if (mod === 10) val -= 0.15 * span; // Onda Q
          else if (mod === 12) val += 1.0 * span; // Pico R
          else if (mod === 14) val -= 0.25 * span; // Onda S
          else if (mod === 19) val += 0.25 * span; // Onda T
          signal[i] = val;
        }
        break;
      }

      default:
        for (let i = 0; i < N; i++) {
          signal[i] = i < p.stepIndex ? p.highVal : p.lowVal;
        }
    }

    return signal;
  }

  /**
   * Gera ruído aditivo segundo a distribuição especificada
   * @param {string} type Tipo de ruído ('gaussian', 'uniform', 'impulsive')
   * @param {number} N Quantidade de amostras
   * @param {number} sigma Desvio padrão do ruído
   * @returns {number[]} Array de ruído
   */
  function generateNoise(type, N, sigma) {
    const noise = new Array(N);
    const s = Math.max(0, Number(sigma) || 0);

    if (s === 0) {
      noise.fill(0);
      return noise;
    }

    switch (type) {
      case 'gaussian':
        for (let i = 0; i < N; i++) {
          noise[i] = s * gaussianRandom();
        }
        break;

      case 'uniform': {
        // Variância de U[-a, a] é a^2 / 3 -> a = sigma * sqrt(3)
        const a = s * Math.sqrt(3);
        for (let i = 0; i < N; i++) {
          noise[i] = (Math.random() * 2 - 1) * a;
        }
        break;
      }

      case 'impulsive': {
        // Ruído Gaussiano de fundo baixo + impulsos esparsos de alta intensidade
        for (let i = 0; i < N; i++) {
          const r = Math.random();
          if (r < 0.08) {
            // Outlier positivo
            noise[i] = s * 4.5;
          } else if (r < 0.16) {
            // Outlier negativo
            noise[i] = -s * 4.5;
          } else {
            noise[i] = (s * 0.3) * gaussianRandom();
          }
        }
        break;
      }

      default:
        for (let i = 0; i < N; i++) {
          noise[i] = s * gaussianRandom();
        }
    }

    return noise;
  }

  /**
   * Filtro de Média Móvel Causal padrão (FIR de coeficientes 1/M)
   * y[n] = 1/M * sum_{k=0}^{M-1} x[n-k]
   * Para n < M-1, retorna null ou calcula média com amostras disponíveis
   */
  function filterCausalMovingAverage(x, M, options) {
    const N = x.length;
    const y = new Array(N).fill(null);
    const opts = Object.assign({ strictWindow: true }, options);

    if (M <= 0) return y;

    if (opts.strictWindow) {
      for (let i = M - 1; i < N; i++) {
        let sum = 0;
        for (let k = 0; k < M; k++) {
          sum += x[i - k];
        }
        y[i] = sum / M;
      }
    } else {
      for (let i = 0; i < N; i++) {
        const count = Math.min(i + 1, M);
        let sum = 0;
        for (let k = 0; k < count; k++) {
          sum += x[i - k];
        }
        y[i] = sum / count;
      }
    }

    return y;
  }

  /**
   * Filtro de Média Móvel Centralizada (Zero-Phase Smoothing)
   * y[n] = 1/M * sum_{k = -floor((M-1)/2)}^{floor(M/2)} x[n+k]
   */
  function filterCentralizedMovingAverage(x, M) {
    const N = x.length;
    const y = new Array(N).fill(null);
    const halfLeft = Math.floor((M - 1) / 2);
    const halfRight = Math.floor(M / 2);

    for (let i = halfLeft; i < N - halfRight; i++) {
      let sum = 0;
      for (let k = -halfLeft; k <= halfRight; k++) {
        sum += x[i + k];
      }
      y[i] = sum / M;
    }

    return y;
  }

  /**
   * Filtro de Média Móvel Exponencial (EMA — IIR 1º Polo)
   * y[n] = alpha * x[n] + (1 - alpha) * y[n-1]
   */
  function filterExponentialMovingAverage(x, M) {
    const N = x.length;
    const y = new Array(N).fill(null);
    if (N === 0) return y;

    const alpha = 2 / (M + 1);
    let prev = x[0];
    y[0] = prev;

    for (let i = 1; i < N; i++) {
      prev = alpha * x[i] + (1 - alpha) * prev;
      y[i] = prev;
    }

    return y;
  }

  /**
   * Filtro de Mediana 1D (excelente para ruídos impulsivos / sal e pimenta)
   */
  function filterMedian(x, M) {
    const N = x.length;
    const y = new Array(N).fill(null);
    const half = Math.floor(M / 2);

    for (let i = half; i < N - half; i++) {
      const window = [];
      for (let k = -half; k <= half; k++) {
        window.push(x[i + k]);
      }
      window.sort((a, b) => a - b);
      const mid = Math.floor(window.length / 2);
      y[i] = window.length % 2 !== 0 ? window[mid] : (window[mid - 1] + window[mid]) / 2;
    }

    return y;
  }

  /**
   * Calcula a resposta em frequência analítica de magnitude |H(e^{j\omega})|
   * H(e^{j\omega}) = (1/M) * (sin(omega * M / 2) / sin(omega / 2)) * e^{-j omega (M-1)/2}
   */
  function computeFrequencyResponse(M, numPoints) {
    const pts = Math.max(64, numPoints || 256);
    const frequencies = new Float64Array(pts); // omega normalizado [0, pi]
    const magnitudeLinear = new Float64Array(pts);
    const magnitudeDb = new Float64Array(pts);

    for (let i = 0; i < pts; i++) {
      const omega = (Math.PI * i) / (pts - 1);
      frequencies[i] = omega;

      let mag = 1.0;
      if (omega > 1e-6) {
        const num = Math.sin((omega * M) / 2);
        const den = M * Math.sin(omega / 2);
        mag = Math.abs(num / den);
      }
      magnitudeLinear[i] = mag;
      magnitudeDb[i] = 20 * Math.log10(Math.max(mag, 1e-4));
    }

    // Frequência do primeiro nulo (omega = 2*pi / M)
    const firstNullOmega = (2 * Math.PI) / M;

    // Frequência de corte estimada de -3dB:
    // Para sinc discreta, omega_c approx (0.886 * 2 * pi) / M approx 5.567 / M
    const cutoff3DbOmega = Math.min(Math.PI, 2.783 / Math.sqrt(M * M - 1 || 1));

    return {
      frequencies: frequencies,
      magnitudeLinear: magnitudeLinear,
      magnitudeDb: magnitudeDb,
      firstNullOmega: firstNullOmega,
      cutoff3DbOmega: cutoff3DbOmega
    };
  }

  /**
   * Calcula métricas de desempenho estatístico do filtro
   */
  function computeMetrics(ideal, noisy, filtered, M, filterType) {
    const N = ideal.length;
    let validCount = 0;
    let sumSqrErrorFiltered = 0;
    let sumSqrErrorNoisy = 0;
    let sumSqrSignal = 0;

    for (let i = 0; i < N; i++) {
      sumSqrSignal += ideal[i] * ideal[i];
      const errNoisy = noisy[i] - ideal[i];
      sumSqrErrorNoisy += errNoisy * errNoisy;

      if (filtered[i] !== null && !isNaN(filtered[i])) {
        const errFilt = filtered[i] - ideal[i];
        sumSqrErrorFiltered += errFilt * errFilt;
        validCount++;
      }
    }

    const mseFiltered = validCount > 0 ? sumSqrErrorFiltered / validCount : 0;
    const mseNoisy = N > 0 ? sumSqrErrorNoisy / N : 0;

    // SNR em decibéis
    const snrInDb = sumSqrErrorNoisy > 1e-12 ? 10 * Math.log10(sumSqrSignal / sumSqrErrorNoisy) : 99;
    const snrOutDb = sumSqrErrorFiltered > 1e-12 && validCount > 0
      ? 10 * Math.log10((sumSqrSignal * (validCount / N)) / sumSqrErrorFiltered)
      : 99;

    // Métricas teóricas
    const theoreticalVarReduction = 1 / M;
    const theoreticalSnrGainDb = 10 * Math.log10(M);

    // Atraso de grupo
    let groupDelaySamples = 0;
    if (filterType === 'causal') {
      groupDelaySamples = (M - 1) / 2;
    } else if (filterType === 'centralized') {
      groupDelaySamples = 0;
    } else if (filterType === 'ema') {
      const alpha = 2 / (M + 1);
      groupDelaySamples = (1 - alpha) / alpha; // (M - 1) / 2
    } else {
      groupDelaySamples = 0;
    }

    return {
      mseFiltered: mseFiltered,
      mseNoisy: mseNoisy,
      snrInDb: snrInDb,
      snrOutDb: snrOutDb,
      snrImprovementDb: snrOutDb - snrInDb,
      theoreticalVarReduction: theoreticalVarReduction,
      theoreticalSnrGainDb: theoreticalSnrGainDb,
      groupDelaySamples: groupDelaySamples,
      validSamplesCount: validCount
    };
  }

  return {
    gaussianRandom: gaussianRandom,
    generateSignal: generateSignal,
    generateNoise: generateNoise,
    filterCausalMovingAverage: filterCausalMovingAverage,
    filterCentralizedMovingAverage: filterCentralizedMovingAverage,
    filterExponentialMovingAverage: filterExponentialMovingAverage,
    filterMedian: filterMedian,
    computeFrequencyResponse: computeFrequencyResponse,
    computeMetrics: computeMetrics
  };
}));
