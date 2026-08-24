/**
 * FourierEngine.js
 * High-performance mathematical & numerical engine for Fourier Series, 
 * Parseval Energy Conservation, Half-range Extensions, and Dirichlet Convergence.
 * Disciplina: Análise de Fourier / Cálculo Avançado — USP
 */

class FourierEngine {
  constructor(options = {}) {
    this.L = options.L !== undefined ? options.L : Math.PI;
    this.N = options.N !== undefined ? options.N : 10;
    this.mode = options.mode || 'full'; // 'full', 'even_cosine', 'odd_sine'
    this.expression = options.expression || 'abs(x)';
    this.customFunc = null;
    this.presetId = options.presetId || 'abs_x';
    
    // Cached calculation results
    this.coefficients = {
      a0: 0,
      a: [], // [a1, a2, ..., aN]
      b: [], // [b1, b2, ..., bN]
      magnitudes: [], // [|c1|, |c2|, ...]
      phases: [],
      harmonicEnergies: [] // [a_n^2 + b_n^2]
    };
    
    this.energy = {
      original: 0,
      fourier: 0,
      error: 0,
      percentage: 0,
      besselHistory: [] // Cumulative energy up to each k in 1..N
    };

    this.discontinuities = [];
    this.gibbsAnalysis = null;

    // Initialize Gauss-Legendre quadrature tables (16-point rule)
    this._initGaussLegendre();
    
    // Initial compilation
    this.setPreset(this.presetId);
  }

  // Pre-computed 16-point Gauss-Legendre Quadrature nodes and weights for [-1, 1]
  _initGaussLegendre() {
    this.glNodes = [
      -0.0950125098376374,  0.0950125098376374,
      -0.2816035507792589,  0.2816035507792589,
      -0.4580167776572274,  0.4580167776572274,
      -0.6178762444026438,  0.6178762444026438,
      -0.7554044083550030,  0.7554044083550030,
      -0.8656312023878318,  0.8656312023878318,
      -0.9445750230732326,  0.9445750230732326,
      -0.9894009349916499,  0.9894009349916499
    ];
    this.glWeights = [
      0.1894506104550685, 0.1894506104550685,
      0.1826034150449236, 0.1826034150449236,
      0.1691565193950025, 0.1691565193950025,
      0.1495959888165767, 0.1495959888165767,
      0.1246289712555339, 0.1246289712555339,
      0.0951585116824928, 0.0951585116824928,
      0.0622535239386479, 0.0622535239386479,
      0.0271524594117541, 0.0271524594117541
    ];
  }

  // Numerical Integration using composite Gauss-Legendre Quadrature
  integrate(fn, a, b, intervals = 32) {
    let total = 0;
    const h = (b - a) / intervals;
    const halfH = h / 2;

    for (let i = 0; i < intervals; i++) {
      const mid = a + (i + 0.5) * h;
      let subSum = 0;
      for (let j = 0; j < 16; j++) {
        const x = mid + halfH * this.glNodes[j];
        const val = fn(x);
        if (Number.isFinite(val)) {
          subSum += this.glWeights[j] * val;
        }
      }
      total += subSum * halfH;
    }
    return total;
  }

  // Presets from USP Notes and Classics
  static getPresets() {
    return [
      {
        id: 'abs_x',
        name: 'f(x) = |x| (Apostila 17/08 - Basel & Parseval)',
        formula: 'abs(x)',
        category: 'usp_notes',
        L: Math.PI,
        mode: 'full',
        desc: 'Função par contínua canônica da USP. Gera a Série de Basel (π²/6) e soma Parseval π⁴/90.',
        notes: 'a₀ = π, a_{2k-1} = -4 / (π(2k-1)²), b_n = 0.',
        dirichlet: 'Contínua em todo R. Convergência uniforme.',
        analytical: (n, L) => {
          if (n === 0) return { a0: Math.PI };
          const a = (n % 2 !== 0) ? -4 / (Math.PI * n * n) : 0;
          return { a, b: 0 };
        }
      },
      {
        id: 'pi_minus_x_odd',
        name: 'f(x) = π - x [Extensão Ímpar de Senos] (Apostila 20/08)',
        formula: 'pi - x',
        category: 'usp_notes',
        L: Math.PI,
        mode: 'odd_sine',
        desc: 'Extensão ímpar periódica da função f(x) = π - x em [0, π]. Apresenta saltos em múltiplos de 2π.',
        notes: 'a₀ = 0, a_n = 0, b_n = 2/n. S(x) = 2 ∑ (sin(nx)/n).',
        dirichlet: 'Salto em x=0, ±2π: converge para (π + (-π))/2 = 0.',
        analytical: (n, L) => {
          if (n === 0) return { a0: 0 };
          return { a: 0, b: 2 / n };
        }
      },
      {
        id: 'pi_minus_x_even',
        name: 'f(x) = π - x [Extensão Par de Cossenos] (Apostila 20/08)',
        formula: 'pi - x',
        category: 'usp_notes',
        L: Math.PI,
        mode: 'even_cosine',
        desc: 'Extensão par f_par(x) = π - |x| em [-π, π]. Função triangular contínua.',
        notes: 'a₀ = π, a_n = 4/(π n²) para n ímpar, b_n = 0.',
        dirichlet: 'Contínua em todo R. Convergência pontual e uniforme.',
        analytical: (n, L) => {
          if (n === 0) return { a0: Math.PI };
          const a = (n % 2 !== 0) ? 4 / (Math.PI * n * n) : 0;
          return { a, b: 0 };
        }
      },
      {
        id: 'pi_minus_x_direct',
        name: 'f(x) = π - x [Extensão Periódica Direta] (Apostila 20/08)',
        formula: 'pi - x',
        category: 'usp_notes',
        L: Math.PI,
        mode: 'full',
        desc: 'Extensão periódica direta de f(x) = π - x em [-π, π]. Contém tanto senos quanto cossenos (termo constante a₀/2 = π).',
        notes: 'a₀ = 2π, a_n = 0, b_n = 2(-1)^n / n.',
        dirichlet: 'Descontinuidade nas bordas x = ±π.',
        analytical: (n, L) => {
          if (n === 0) return { a0: 2 * Math.PI };
          return { a: 0, b: (2 * Math.pow(-1, n)) / n };
        }
      },
      {
        id: 'square_wave',
        name: 'Onda Quadrada: f(x) = sgn(x)',
        formula: 'sign(x)',
        category: 'classic',
        L: Math.PI,
        mode: 'full',
        desc: 'Sinal de chaveamento com descontinuidade de salto em x = 0 e bordas. Exibe fenômeno de Gibbs com sobreelevação de 8,95%.',
        notes: 'a_n = 0, b_{2k-1} = 4 / (π(2k-1)).',
        dirichlet: 'S(0) = (1 + (-1))/2 = 0.',
        analytical: (n, L) => {
          if (n === 0) return { a0: 0 };
          const b = (n % 2 !== 0) ? 4 / (Math.PI * n) : 0;
          return { a: 0, b };
        }
      },
      {
        id: 'sawtooth_wave',
        name: 'Onda Dente de Serra: f(x) = x',
        formula: 'x',
        category: 'classic',
        L: Math.PI,
        mode: 'full',
        desc: 'Função ímpar f(x) = x em [-π, π]. Rampa linear contínua por partes com salto nas extremidades.',
        notes: 'a_n = 0, b_n = 2(-1)^{n+1} / n.',
        dirichlet: 'S(±π) = (π + (-π))/2 = 0.',
        analytical: (n, L) => {
          if (n === 0) return { a0: 0 };
          return { a: 0, b: (2 * Math.pow(-1, n + 1)) / n };
        }
      },
      {
        id: 'causal_pulse',
        name: 'Pulso Retangular Causal em [-2, 2] (Apostila Dirichlet)',
        formula: 'x > 0 && x < 1 ? 1 : 0',
        category: 'usp_notes',
        L: 2,
        mode: 'full',
        desc: 'Pulso unitário de duração 1 em período 2L = 4. Exemplo canônico do Teorema de Dirichlet da USP.',
        notes: 'a₀ = 1/2, a_n = sin(nπ/2)/(nπ), b_n = (1 - cos(nπ/2))/(nπ).',
        dirichlet: 'Saltos em x = 0 e x = 1. S(0) = 0.5, S(1) = 0.5.',
        analytical: (n, L) => {
          if (n === 0) return { a0: 0.5 };
          const omega = (n * Math.PI) / 2;
          const a = Math.sin(omega) / (n * Math.PI);
          const b = (1 - Math.cos(omega)) / (n * Math.PI);
          return { a, b };
        }
      },
      {
        id: 'triangle_wave',
        name: 'Onda Triangular: f(x) = π/2 - |x|',
        formula: 'pi/2 - abs(x)',
        category: 'classic',
        L: Math.PI,
        mode: 'full',
        desc: 'Sinal triangular simétrico contínuo com convergência rápida proporcional a 1/n².',
        notes: 'a₀ = 0, a_{2k-1} = 4 / (π (2k-1)²), b_n = 0.',
        dirichlet: 'Contínua em todo R.',
        analytical: (n, L) => {
          if (n === 0) return { a0: 0 };
          const a = (n % 2 !== 0) ? 4 / (Math.PI * n * n) : 0;
          return { a, b: 0 };
        }
      },
      {
        id: 'exp_decay',
        name: 'Exponencial Amortecida: f(x) = exp(-|x|)',
        formula: 'exp(-abs(x))',
        category: 'classic',
        L: Math.PI,
        mode: 'full',
        desc: 'Função par contínua com bico em x=0. Representa resposta ao impulso bilateral.',
        notes: 'a₀ = 2(1 - e^{-π})/π, a_n = 2[1 - (-1)^n e^{-π}] / [π(1 + n²)].',
        analytical: (n, L) => {
          if (n === 0) return { a0: 2 * (1 - Math.exp(-Math.PI)) / Math.PI };
          const a = (2 * Math.pow(-1, n) * Math.sinh(Math.PI)) / (Math.PI * (1 + n * n));
          return { a, b: 0 };
        }
      },
      {
        id: 'rectified_sine',
        name: 'Seno Retificado: f(x) = |sin(x)|',
        formula: 'abs(sin(x))',
        category: 'applications',
        L: Math.PI,
        mode: 'full',
        desc: 'Saída de retificador de onda completa em circuitos elétricos da Poli-USP.',
        notes: 'a₀ = 4/π, a_{2k} = -4 / [π(4k² - 1)], b_n = 0.',
        analytical: (n, L) => {
          if (n === 0) return { a0: 4 / Math.PI };
          if (n === 1) return { a: 0, b: 0 };
          const a = (n % 2 === 0) ? -4 / (Math.PI * (n * n - 1)) : 0;
          return { a, b: 0 };
        }
      },
      {
        id: 'quadratic',
        name: 'Parábola: f(x) = x²',
        formula: 'x^2',
        category: 'classic',
        L: Math.PI,
        mode: 'full',
        desc: 'Função contínua e periódica de classe C¹ no período, convergência rápida ~ 1/n².',
        notes: 'a₀ = 2π²/3, a_n = 4(-1)^n / n², b_n = 0.',
        analytical: (n, L) => {
          if (n === 0) return { a0: 2 * Math.PI * Math.PI / 3 };
          const a = 4 * Math.pow(-1, n) / (n * n);
          return { a, b: 0 };
        }
      }
    ];
  }

  // Set preset function
  setPreset(presetId) {
    const presets = FourierEngine.getPresets();
    const target = presets.find(p => p.id === presetId);
    if (target) {
      this.presetId = presetId;
      this.expression = target.formula;
      if (target.L !== undefined) this.L = target.L;
      if (target.mode !== undefined) this.mode = target.mode;
      this.compileExpression(this.expression, true);
      this.computeAll();
      return true;
    }
    return false;
  }

  // Safely compile user math expression
  compileExpression(exprStr, isPreset = false) {
    this.expression = exprStr;
    if (!isPreset) {
      this.presetId = 'custom';
    }
    try {
      // Normalize common math notations
      let clean = exprStr
        .replace(/\bpi\b/gi, 'Math.PI')
        .replace(/\be\b/g, 'Math.E')
        .replace(/\bsin\b/gi, 'Math.sin')
        .replace(/\bcos\b/gi, 'Math.cos')
        .replace(/\btan\b/gi, 'Math.tan')
        .replace(/\babs\b/gi, 'Math.abs')
        .replace(/\bsign\b/gi, 'Math.sign')
        .replace(/\bsqrt\b/gi, 'Math.sqrt')
        .replace(/\bexp\b/gi, 'Math.exp')
        .replace(/\bmin\b/gi, 'Math.min')
        .replace(/\bmax\b/gi, 'Math.max')
        .replace(/\bfloor\b/gi, 'Math.floor')
        .replace(/\bceil\b/gi, 'Math.ceil')
        .replace(/\bround\b/gi, 'Math.round')
        .replace(/\bheaviside\b/gi, '((x)>=0?1:0)')
        .replace(/\bstep\b/gi, '((x)>=0?1:0)')
        .replace(/\band\b/gi, '&&')
        .replace(/\bor\b/gi, '||')
        .replace(/\^/g, '**');

      // Create JS function evaluator
      // eslint-disable-next-line no-new-func
      const fn = new Function('x', 'Math', `
        try {
          const res = ${clean};
          return Number.isFinite(res) ? res : 0;
        } catch(e) {
          return 0;
        }
      `);

      // Test evaluation at x = 0.5
      fn(0.5, Math);
      this.customFunc = (x) => fn(x, Math);
      return { success: true };
    } catch (err) {
      console.warn('Expression compilation error:', err);
      this.customFunc = (x) => 0;
      return { success: false, error: err.message };
    }
  }

  // Evaluation of original function in base interval [-L, L] with mode extension
  evalBase(x) {
    if (!this.customFunc) return 0;
    
    // Half-range handling
    if (this.mode === 'even_cosine') {
      // Even extension: f_par(x) = f(|x|)
      const absX = Math.abs(x);
      return this.customFunc(absX);
    } else if (this.mode === 'odd_sine') {
      // Odd extension: f_impar(x) = sgn(x)*f(|x|)
      if (Math.abs(x) < 1e-12) return 0;
      const absX = Math.abs(x);
      return Math.sign(x) * this.customFunc(absX);
    }

    // Default full interval [-L, L]
    return this.customFunc(x);
  }

  // Periodic evaluation of original function across all real numbers x
  evalPeriodic(x) {
    const period = 2 * this.L;
    // Map x to [-L, L]
    let shifted = (x + this.L) % period;
    if (shifted < 0) shifted += period;
    shifted -= this.L;
    return this.evalBase(shifted);
  }

  // Even part of function: f_even(x) = (f(x) + f(-x)) / 2
  evalEvenPart(x) {
    return (this.evalPeriodic(x) + this.evalPeriodic(-x)) / 2;
  }

  // Odd part of function: f_odd(x) = (f(x) - f(-x)) / 2
  evalOddPart(x) {
    return (this.evalPeriodic(x) - this.evalPeriodic(-x)) / 2;
  }

  // Compute all Euler-Fourier coefficients and Parseval energies
  computeAll() {
    const L = this.L;
    const N = this.N;
    const pi = Math.PI;

    const isMatchingPreset = this.presetId && this.presetId !== 'custom';
    const preset = isMatchingPreset ? FourierEngine.getPresets().find(p => p.id === this.presetId) : null;
    const hasAnalytical = preset && typeof preset.analytical === 'function' &&
      this.expression === preset.formula &&
      Math.abs(this.L - (preset.L !== undefined ? preset.L : pi)) < 1e-4 &&
      this.mode === (preset.mode || 'full');

    // 1. Calculate a0
    let a0 = 0;
    if (hasAnalytical) {
      a0 = preset.analytical(0, L).a0 || 0;
    } else {
      if (this.mode === 'odd_sine') {
        a0 = 0;
      } else if (this.mode === 'even_cosine') {
        // a0 = (2/L) * int_0^L f(x) dx
        a0 = (2 / L) * this.integrate(x => this.evalBase(x), 0, L, 32);
      } else {
        // a0 = (1/L) * int_{-L}^L f(x) dx
        a0 = (1 / L) * this.integrate(x => this.evalBase(x), -L, L, 48);
      }
    }

    const a = new Float64Array(N + 1);
    const b = new Float64Array(N + 1);
    const magnitudes = new Float64Array(N + 1);
    const phases = new Float64Array(N + 1);
    const harmonicEnergies = new Float64Array(N + 1);

    // 2. Compute a_n and b_n
    for (let n = 1; n <= N; n++) {
      const omega_n = (n * pi) / L;
      let an = 0;
      let bn = 0;

      if (hasAnalytical) {
        const coeffs = preset.analytical(n, L);
        an = coeffs.a || 0;
        bn = coeffs.b || 0;
      } else {
        if (this.mode === 'odd_sine') {
          an = 0;
          bn = (2 / L) * this.integrate(x => this.evalBase(x) * Math.sin(omega_n * x), 0, L, 32);
        } else if (this.mode === 'even_cosine') {
          an = (2 / L) * this.integrate(x => this.evalBase(x) * Math.cos(omega_n * x), 0, L, 32);
          bn = 0;
        } else {
          an = (1 / L) * this.integrate(x => this.evalBase(x) * Math.cos(omega_n * x), -L, L, 32);
          bn = (1 / L) * this.integrate(x => this.evalBase(x) * Math.sin(omega_n * x), -L, L, 32);
        }
      }

      // Clean tiny floating noise (< 1e-12)
      if (Math.abs(an) < 1e-12) an = 0;
      if (Math.abs(bn) < 1e-12) bn = 0;

      a[n] = an;
      b[n] = bn;

      // Complex amplitude cn and phase
      magnitudes[n] = 0.5 * Math.hypot(an, bn);
      phases[n] = -Math.atan2(bn, an);
      harmonicEnergies[n] = an * an + bn * bn;
    }

    this.coefficients = { a0, a, b, magnitudes, phases, harmonicEnergies };

    // 3. Compute Parseval Energies
    // Original energy: E_orig = (1/L) * int_{-L}^L [f(x)]^2 dx
    let E_orig = 0;
    if (this.mode === 'even_cosine' || this.mode === 'odd_sine') {
      E_orig = (2 / L) * this.integrate(x => {
        const val = this.evalBase(x);
        return val * val;
      }, 0, L, 48);
    } else {
      E_orig = (1 / L) * this.integrate(x => {
        const val = this.evalBase(x);
        return val * val;
      }, -L, L, 64);
    }

    // Fourier energy up to N: E_N = a0^2/2 + sum_{n=1}^N (a_n^2 + b_n^2)
    let fourierEnergy = (a0 * a0) / 2;
    const besselHistory = new Float64Array(N + 1);
    besselHistory[0] = fourierEnergy;

    for (let n = 1; n <= N; n++) {
      fourierEnergy += harmonicEnergies[n];
      besselHistory[n] = fourierEnergy;
    }

    const errorEnergy = Math.max(0, E_orig - fourierEnergy);
    const percentage = E_orig > 1e-9 ? Math.min(100, (fourierEnergy / E_orig) * 100) : 100;

    this.energy = {
      original: E_orig,
      fourier: fourierEnergy,
      error: errorEnergy,
      percentage: percentage,
      besselHistory: besselHistory
    };

    // 4. Detect discontinuities and Dirichlet convergence
    this._detectDiscontinuities();

    // 5. Compute Gibbs Analysis
    this._computeGibbsAnalysis();
  }

  // Detect jump points in [-L, L]
  _detectDiscontinuities() {
    this.discontinuities = [];
    const L = this.L;
    const samples = 200;
    const dx = (2 * L) / samples;
    const eps = 1e-4;

    const rawPoints = [];

    for (let i = 0; i <= samples; i++) {
      const x = -L + i * dx;
      const leftVal = this.evalPeriodic(x - eps);
      const rightVal = this.evalPeriodic(x + eps);
      const jump = Math.abs(rightVal - leftVal);

      if (jump > 0.05) {
        // Refine point
        const midpoint = (leftVal + rightVal) / 2;
        rawPoints.push({
          x: x,
          left: leftVal,
          right: rightVal,
          jump: jump,
          dirichletMidpoint: midpoint
        });
      }
    }

    if (rawPoints.length > 0) {
      let currentCluster = [rawPoints[0]];
      for (let i = 1; i < rawPoints.length; i++) {
        if (Math.abs(rawPoints[i].x - currentCluster[currentCluster.length - 1].x) <= 0.1) {
          currentCluster.push(rawPoints[i]);
        } else {
          // Find max jump in cluster
          const maxJumpPoint = currentCluster.reduce((prev, curr) => (curr.jump > prev.jump ? curr : prev));
          this.discontinuities.push(maxJumpPoint);
          currentCluster = [rawPoints[i]];
        }
      }
      const maxJumpPoint = currentCluster.reduce((prev, curr) => (curr.jump > prev.jump ? curr : prev));
      this.discontinuities.push(maxJumpPoint);
    }
  }

  // Compute Gibbs phenomenon overshoot percentage near discontinuities
  _computeGibbsAnalysis() {
    this.gibbsAnalysis = this.discontinuities.map(d => {
      let maxOvershoot = 0;
      const searchRadius = (2 * this.L) / this.N; 
      const points = 100;
      
      for (let i = 1; i <= points; i++) {
        const dx = (i / points) * searchRadius;
        
        // Right side
        const xRight = d.x + dx;
        const valRight = this.evalFourier(xRight);
        const overRight = Math.abs(valRight - d.right);
        if (overRight > maxOvershoot) maxOvershoot = overRight;

        // Left side
        const xLeft = d.x - dx;
        const valLeft = this.evalFourier(xLeft);
        const overLeft = Math.abs(valLeft - d.left);
        if (overLeft > maxOvershoot) maxOvershoot = overLeft;
      }
      
      return {
        x: d.x,
        jump: d.jump,
        overshootPercent: maxOvershoot / d.jump,
        theoreticalGibbs: 0.08949
      };
    });
  }

  // Evaluate Fourier Series approximation S_N(x)
  evalFourier(x, terms = this.N) {
    const L = this.L;
    const pi = Math.PI;
    const { a0, a, b } = this.coefficients;

    let sum = a0 / 2;
    const maxN = Math.min(terms, this.N);

    for (let n = 1; n <= maxN; n++) {
      const omega_n = (n * pi) / L;
      const an = a[n];
      const bn = b[n];
      if (an !== 0 || bn !== 0) {
        sum += an * Math.cos(omega_n * x) + bn * Math.sin(omega_n * x);
      }
    }
    return sum;
  }

  // Evaluate single harmonic n: h_n(x) = a_n cos(n pi x / L) + b_n sin(n pi x / L)
  evalHarmonic(x, n) {
    if (n === 0) return this.coefficients.a0 / 2;
    if (n > this.N) return 0;
    const omega_n = (n * Math.PI) / this.L;
    return this.coefficients.a[n] * Math.cos(omega_n * x) + this.coefficients.b[n] * Math.sin(omega_n * x);
  }

  // Dirichlet Kernel D_N(t) = sin((N + 0.5) * t) / (2 sin(t / 2))
  evalDirichletKernel(t, N = this.N) {
    const normT = ((t + Math.PI) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI) - Math.PI;
    if (Math.abs(normT) < 1e-7) {
      return N + 0.5;
    }
    return Math.sin((N + 0.5) * normT) / (2 * Math.sin(normT / 2));
  }

  // Get epicycles data at position x for complex phasor animation
  getEpicyclesAt(x) {
    const L = this.L;
    const pi = Math.PI;
    const { a0, a, b } = this.coefficients;

    const circles = [];
    let currentX = a0 / 2;
    let currentY = 0;

    circles.push({
      n: 0,
      radius: Math.abs(a0 / 2),
      startX: 0,
      startY: 0,
      endX: currentX,
      endY: currentY,
      freq: 0,
      angle: 0
    });

    for (let n = 1; n <= this.N; n++) {
      const an = a[n];
      const bn = b[n];
      const mag = Math.hypot(an, bn);
      if (mag < 1e-6) continue;

      const omega = (n * pi) / L;
      const angle = omega * x;
      const dx = an * Math.cos(angle) + bn * Math.sin(angle);
      const dy = -an * Math.sin(angle) + bn * Math.cos(angle);

      const startX = currentX;
      const startY = currentY;
      currentX += dx;
      currentY += dy;

      circles.push({
        n: n,
        radius: mag,
        startX: startX,
        startY: startY,
        endX: currentX,
        endY: currentY,
        freq: n,
        angle: angle
      });
    }

    return { circles, finalVal: currentX };
  }

  // Generate LaTeX string representation of S_N(x)
  toLatex(maxTerms = 6) {
    const { a0, a, b } = this.coefficients;
    const L = this.L;
    const isPi = Math.abs(L - Math.PI) < 1e-4;

    let str = 'S_' + this.N + '(x) = ';
    const prefix = str;
    
    // a0/2 term
    const halfA0 = a0 / 2;
    if (Math.abs(halfA0) > 1e-4) {
      str += halfA0.toFixed(3).replace(/\.?0+$/, '');
    }

    let termsCount = 0;
    for (let n = 1; n <= this.N && termsCount < maxTerms; n++) {
      const an = a[n];
      const bn = b[n];
      if (Math.abs(an) < 1e-4 && Math.abs(bn) < 1e-4) continue;

      const arg = isPi ? (n === 1 ? 'x' : `${n}x`) : `\\frac{${n}\\pi x}{${L.toFixed(2)}}`;

      if (Math.abs(an) > 1e-4) {
        const isFirst = (str === prefix);
        const sign = an >= 0 ? (isFirst ? '' : ' + ') : (isFirst ? '-' : ' - ');
        const val = Math.abs(an).toFixed(3).replace(/\.?0+$/, '');
        str += `${sign}${val !== '1' ? val : ''}\\cos(${arg})`;
        termsCount++;
      }

      if (Math.abs(bn) > 1e-4 && termsCount < maxTerms) {
        const isFirst = (str === prefix);
        const sign = bn >= 0 ? (isFirst ? '' : ' + ') : (isFirst ? '-' : ' - ');
        const val = Math.abs(bn).toFixed(3).replace(/\.?0+$/, '');
        str += `${sign}${val !== '1' ? val : ''}\\sin(${arg})`;
        termsCount++;
      }
    }

    if (this.N > maxTerms) {
      str += ' + \\cdots';
    }

    if (str === prefix) {
      str += '0';
    }

    return str;
  }
}

// Export for ES modules and global window usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = FourierEngine;
}
if (typeof window !== 'undefined') {
  window.FourierEngine = FourierEngine;
}
