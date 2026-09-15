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
      freq: 2.0,
      totalDuration: 10.0
    }, params || {});

    const signal = new Array(N);

    switch (type) {
      case 'step': {
        const sIdx = Math.max(1, Math.min(N - 1, p.stepIndex));
        for (let i = 0; i < N; i++) {
          signal[i] = i < sIdx ? p.highVal : p.lowVal;
        }
        break;
      }

      case 'square': {
        const cycles = Math.max(1, p.freq || 2);
        const period = Math.max(4, Math.floor(N / cycles));
        for (let i = 0; i < N; i++) {
          const phase = (i % period) / period;
          signal[i] = phase < 0.5 ? p.highVal : p.lowVal;
        }
        break;
      }

      case 'sine': {
        const mid = (p.highVal + p.lowVal) / 2;
        const amp = (p.highVal - p.lowVal) / 2;
        const cycles = p.freq || 2.0;
        for (let i = 0; i < N; i++) {
          signal[i] = mid + amp * Math.sin((2 * Math.PI * cycles * i) / (N - 1));
        }
        break;
      }

      case 'impulse': {
        const pulseIdx = Math.max(1, Math.min(N - 2, p.stepIndex !== undefined ? p.stepIndex : Math.floor(N / 3)));
        for (let i = 0; i < N; i++) {
          signal[i] = (i === pulseIdx) ? p.highVal : p.lowVal;
        }
        break;
      }

      case 'ecg': {
        // Sinal biomédico sintético tipo ECG normalizado para qualquer N
        const base = p.lowVal;
        const span = p.highVal - p.lowVal;
        const period = Math.max(8, Math.floor(N / 2));
        for (let i = 0; i < N; i++) {
          const mod = i % period;
          const pNorm = mod / period;
          let val = base;
          if (pNorm >= 0.08 && pNorm < 0.14) val += 0.15 * span; // Onda P
          else if (pNorm >= 0.18 && pNorm < 0.22) val -= 0.15 * span; // Onda Q
          else if (pNorm >= 0.22 && pNorm < 0.28) val += 1.0 * span; // Pico R
          else if (pNorm >= 0.28 && pNorm < 0.32) val -= 0.25 * span; // Onda S
          else if (pNorm >= 0.38 && pNorm < 0.48) val += 0.25 * span; // Onda T
          signal[i] = val;
        }
        break;
      }

      default: {
        const sIdx = Math.max(1, Math.min(N - 1, p.stepIndex));
        for (let i = 0; i < N; i++) {
          signal[i] = i < sIdx ? p.highVal : p.lowVal;
        }
      }
    }

    return signal;
  }

  /**
   * Calcula grandezas físicas de amostragem temporal
   * @param {number} N Quantidade de amostras discretas
   * @param {number} totalDuration Duração temporal contínua total (s)
   */
  function computeSamplingParameters(N, totalDuration) {
    const nSamples = Math.max(2, Math.round(N) || 61);
    const duration = Math.max(1e-4, Number(totalDuration) || 10.0);
    const dt = duration / (nSamples - 1);
    const fs = (nSamples - 1) / duration;
    const nyquistFreq = fs / 2.0;
    return {
      nSamples: nSamples,
      totalDuration: duration,
      samplingPeriod: dt,
      samplingRate: fs,
      nyquistFrequency: nyquistFreq
    };
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

  /**
   * Filtro de Kalman 1D Estocástico Ótimo
   * Modelo de espaço de estados:
   * x_k = x_{k-1} + w_k,  w_k ~ N(0, Q)  (ruído de processo)
   * z_k = x_k + v_k,      v_k ~ N(0, R)  (ruído de medição)
   * @param {number[]} z Sinal ruidoso medido
   * @param {number} Q Variância do processo
   * @param {number} R Variância da medição
   * @param {number} [x0] Estado inicial
   * @param {number} [P0] Covariância inicial
   */
  function filterKalman(z, Q, R, x0, P0) {
    const N = z.length;
    const y = new Array(N);
    const gains = new Array(N);
    const covs = new Array(N);

    let xHat = (x0 !== undefined && x0 !== null) ? x0 : (z[0] || 0);
    let P = (P0 !== undefined && P0 !== null) ? P0 : 1.0;
    const qVal = Math.max(1e-7, Number(Q) || 0.005);
    const rVal = Math.max(1e-7, Number(R) || 0.04);

    for (let k = 0; k < N; k++) {
      // 1. Predição a priori
      const xHatMinus = xHat;
      const PMinus = P + qVal;

      // 2. Atualização a posteriori (Ganho de Kalman)
      const K = PMinus / (PMinus + rVal);
      xHat = xHatMinus + K * (z[k] - xHatMinus);
      P = (1 - K) * PMinus;

      y[k] = xHat;
      gains[k] = K;
      covs[k] = P;
    }

    return {
      filtered: y,
      gains: gains,
      covariances: covs
    };
  }

  /**
   * Transformada Wavelet Discreta 1D (DWT Haar) — Decomposição 1 nível
   */
  function dwtHaar1D(signal) {
    const n = signal.length;
    const half = Math.floor(n / 2);
    const approx = new Float64Array(half);
    const detail = new Float64Array(half);
    const sqrt2 = Math.SQRT2;

    for (let i = 0; i < half; i++) {
      const s0 = signal[2 * i];
      const s1 = (2 * i + 1 < n) ? signal[2 * i + 1] : signal[2 * i];
      approx[i] = (s0 + s1) / sqrt2;
      detail[i] = (s1 - s0) / sqrt2;
    }
    return { approx: approx, detail: detail };
  }

  /**
   * Transformada Wavelet Inversa 1D (IDWT Haar) — Reconstrução 1 nível
   */
  function idwtHaar1D(approx, detail, targetLen) {
    const half = approx.length;
    const n = targetLen || half * 2;
    const rec = new Float64Array(n);
    const sqrt2 = Math.SQRT2;

    for (let i = 0; i < half; i++) {
      const a = approx[i];
      const d = detail[i];
      if (2 * i < n) rec[2 * i] = (a - d) / sqrt2;
      if (2 * i + 1 < n) rec[2 * i + 1] = (a + d) / sqrt2;
    }
    return rec;
  }

  /**
   * Denoising por Wavelet (DWT Multi-nível + Limiarização VisuShrink de Donoho-Johnstone)
   * Preserva transições abruptas (degraus) eliminando ruído branco de alta frequência.
   * @param {number[]} signal Sinal discreto ruidoso
   * @param {object} [options] Configurações (levels, thresholdMultiplier, mode)
   */
  function filterWaveletDenoise(signal, options) {
    const opts = Object.assign({
      levels: 3,
      thresholdMultiplier: 1.0,
      mode: 'soft' // 'soft' ou 'hard'
    }, options || {});

    const N = signal.length;
    if (N < 4) return signal.slice();

    const maxLevels = Math.min(opts.levels, Math.floor(Math.log2(N)) - 1);
    const approxPyramid = [];
    const detailPyramid = [];

    let currentApprox = Float64Array.from(signal);

    // Decomposição piramidal de Mallat
    for (let lvl = 0; lvl < maxLevels; lvl++) {
      const { approx, detail } = dwtHaar1D(currentApprox);
      detailPyramid.push(detail);
      approxPyramid.push(approx);
      currentApprox = approx;
    }

    // Estimativa de ruído estocástico pelo MAD dos coeficientes de detalhe do nível 1 (Donoho & Johnstone, 1994)
    const d1 = detailPyramid[0];
    const absD1 = Array.from(d1, Math.abs).sort((a, b) => a - b);
    const medianAbs = absD1.length % 2 === 0
      ? (absD1[absD1.length / 2 - 1] + absD1[absD1.length / 2]) / 2
      : absD1[Math.floor(absD1.length / 2)];

    const sigmaHat = (medianAbs / 0.6745) || 0.05;
    // Limiar universal VisuShrink: lambda = sigma * sqrt(2 * ln(N))
    const universalThreshold = sigmaHat * Math.sqrt(2 * Math.log(N)) * opts.thresholdMultiplier;

    // Limiarização dos detalhes em todas as escalas
    for (let lvl = 0; lvl < maxLevels; lvl++) {
      const det = detailPyramid[lvl];
      for (let i = 0; i < det.length; i++) {
        const val = det[i];
        if (opts.mode === 'soft') {
          // Soft-thresholding: sign(d) * max(0, |d| - lambda)
          det[i] = Math.sign(val) * Math.max(0, Math.abs(val) - universalThreshold);
        } else {
          // Hard-thresholding: d * (|d| >= lambda)
          det[i] = Math.abs(val) >= universalThreshold ? val : 0;
        }
      }
    }

    // Reconstrução inversa IDWT de baixo para cima
    let reconstructed = currentApprox;
    for (let lvl = maxLevels - 1; lvl >= 0; lvl--) {
      const det = detailPyramid[lvl];
      const targetLen = (lvl === 0) ? N : approxPyramid[lvl - 1].length;
      reconstructed = idwtHaar1D(reconstructed, det, targetLen);
    }

    return Array.from(reconstructed);
  }

  return {
    gaussianRandom: gaussianRandom,
    generateSignal: generateSignal,
    generateNoise: generateNoise,
    filterCausalMovingAverage: filterCausalMovingAverage,
    filterCentralizedMovingAverage: filterCentralizedMovingAverage,
    filterExponentialMovingAverage: filterExponentialMovingAverage,
    filterMedian: filterMedian,
    filterKalman: filterKalman,
    filterWaveletDenoise: filterWaveletDenoise,
    dwtHaar1D: dwtHaar1D,
    idwtHaar1D: idwtHaar1D,
    computeFrequencyResponse: computeFrequencyResponse,
    computeMetrics: computeMetrics,
    computeSamplingParameters: computeSamplingParameters
  };
}));

