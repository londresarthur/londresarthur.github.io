/**
 * SpectrumChart.js
 * Visualizes Fourier Harmonics Bar Chart, Parseval Energy Convergence Curve, 
 * Power Spectrum distribution, and interactive harmonic hover inspection.
 */

class SpectrumChart {
  constructor(canvas, engine, options = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.engine = engine;
    this.mode = options.mode || 'coefficients'; // 'coefficients', 'energy_dist', 'convergence'
    this.theme = options.theme || 'dark';
    this.onHarmonicHover = options.onHarmonicHover || null;
    this.hoveredHarmonic = null;

    this.setupHiDPI();
    this.bindEvents();
    this.render();
  }

  setupHiDPI() {
    const rect = this.canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    this.dpr = dpr;

    this.width = rect.width || this.canvas.width || 400;
    this.height = rect.height || this.canvas.height || 200;

    this.canvas.width = Math.round(this.width * dpr);
    this.canvas.height = Math.round(this.height * dpr);
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;

    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.scale(dpr, dpr);
  }

  resize() {
    this.setupHiDPI();
    this.render();
  }

  bindEvents() {
    const canvas = this.canvas;

    canvas.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      const sx = e.clientX - rect.left;
      const sy = e.clientY - rect.top;

      const N = this.engine.N;
      if (N <= 0) return;

      const padL = 35; // wait, in modes it's 40 and 45. We'll use approx. 
      const padR = 15; // wait, in convergence it's 20. Let's just adjust based on mode.
      const actualPadL = this.mode === 'convergence' ? 45 : 40;
      const actualPadR = this.mode === 'convergence' ? 20 : 15;
      const chartW = this.width - actualPadL - actualPadR;

      if (sx >= actualPadL && sx <= this.width - actualPadR) {
        let idx;
        if (this.mode === 'convergence') {
          idx = Math.round((sx - actualPadL) / (chartW / N));
        } else {
          const barW = chartW / (N + 1);
          idx = Math.floor((sx - actualPadL) / barW);
        }
        
        if (idx >= 0 && idx <= N) {
          if (this.hoveredHarmonic !== idx) {
            this.hoveredHarmonic = idx;
            this.render();
            if (this.onHarmonicHover) this.onHarmonicHover(idx);
          }
          return;
        }
      }

      if (this.hoveredHarmonic !== null) {
        this.hoveredHarmonic = null;
        this.render();
        if (this.onHarmonicHover) this.onHarmonicHover(null);
      }
    });

    canvas.addEventListener('mouseleave', () => {
      if (this.hoveredHarmonic !== null) {
        this.hoveredHarmonic = null;
        this.render();
        if (this.onHarmonicHover) this.onHarmonicHover(null);
      }
    });
  }

  setMode(mode) {
    this.mode = mode;
    this.render();
  }

  render() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.width, this.height);

    if (this.mode === 'convergence') {
      this.renderConvergence();
    } else if (this.mode === 'energy_dist') {
      this.renderEnergyDist();
    } else {
      this.renderCoefficients();
    }
  }

  // Render Coeffs a_n, b_n and |c_n|
  renderCoefficients() {
    const ctx = this.ctx;
    const isDark = this.theme === 'dark';
    const { a0, a, b, magnitudes } = this.engine.coefficients;
    const N = this.engine.N;

    const padL = 40;
    const padR = 15;
    const padT = 20;
    const padB = 25;
    const chartW = this.width - padL - padR;
    const chartH = this.height - padT - padB;

    // Find max amplitude
    let maxVal = Math.abs(a0 / 2);
    for (let n = 1; n <= N; n++) {
      maxVal = Math.max(maxVal, Math.abs(a[n]), Math.abs(b[n]), magnitudes[n]);
    }
    maxVal = maxVal > 1e-4 ? maxVal * 1.15 : 1;

    // Y Axis zero
    const zeroY = padT + chartH;
    const halfY = padT + chartH / 2;

    // Grid lines
    ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)';
    ctx.lineWidth = 1;
    ctx.font = '10px system-ui, sans-serif';
    ctx.fillStyle = isDark ? '#94a3b8' : '#64748b';

    // Top and half horizontal grid
    ctx.beginPath();
    ctx.moveTo(padL, padT);
    ctx.lineTo(this.width - padR, padT);
    ctx.moveTo(padL, halfY);
    ctx.lineTo(this.width - padR, halfY);
    ctx.moveTo(padL, zeroY);
    ctx.lineTo(this.width - padR, zeroY);
    ctx.stroke();

    ctx.textAlign = 'right';
    ctx.fillText(maxVal.toFixed(2), padL - 6, padT + 4);
    ctx.fillText((maxVal / 2).toFixed(2), padL - 6, halfY + 4);
    ctx.fillText('0', padL - 6, zeroY + 4);

    // Bars
    const totalBars = N + 1;
    const slotW = chartW / totalBars;
    const barW = Math.max(3, slotW * 0.7);

    for (let n = 0; n <= N; n++) {
      const centerX = padL + n * slotW + slotW / 2;
      const isHovered = this.hoveredHarmonic === n;

      let val = n === 0 ? Math.abs(a0 / 2) : magnitudes[n];
      let barH = (val / maxVal) * chartH;
      let barY = zeroY - barH;

      // a_n / b_n breakdown or magnitude
      if (isHovered) {
        ctx.fillStyle = '#f59e0b'; // Highlight amber
      } else if (n === 0) {
        ctx.fillStyle = '#6366f1'; // Indigo DC
      } else {
        ctx.fillStyle = isDark ? '#38bdf8' : '#0284c7'; // Cyan
      }

      ctx.beginPath();
      ctx.roundRect(centerX - barW / 2, barY, barW, barH, [3, 3, 0, 0]);
      ctx.fill();

      // X tick label
      if (N <= 25 || n % 5 === 0 || n === N || n === 0) {
        ctx.fillStyle = isDark ? '#94a3b8' : '#64748b';
        ctx.textAlign = 'center';
        ctx.fillText(n === 0 ? 'DC' : n.toString(), centerX, this.height - 8);
      }
    }
  }

  // Render Energy Distribution per harmonic e_n = a_n^2 + b_n^2
  renderEnergyDist() {
    const ctx = this.ctx;
    const isDark = this.theme === 'dark';
    const { a0, harmonicEnergies } = this.engine.coefficients;
    const N = this.engine.N;

    const padL = 40;
    const padR = 15;
    const padT = 20;
    const padB = 25;
    const chartW = this.width - padL - padR;
    const chartH = this.height - padT - padB;
    const zeroY = padT + chartH;
    const halfY = padT + chartH / 2;

    let maxE = (a0 * a0) / 2;
    for (let n = 1; n <= N; n++) {
      maxE = Math.max(maxE, harmonicEnergies[n]);
    }
    maxE = maxE > 1e-4 ? maxE * 1.15 : 1;

    ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padL, padT);
    ctx.lineTo(this.width - padR, padT);
    ctx.moveTo(padL, halfY);
    ctx.lineTo(this.width - padR, halfY);
    ctx.moveTo(padL, zeroY);
    ctx.lineTo(this.width - padR, zeroY);
    ctx.stroke();

    ctx.font = '10px system-ui, sans-serif';
    ctx.fillStyle = isDark ? '#94a3b8' : '#64748b';
    ctx.textAlign = 'right';
    ctx.fillText(maxE.toFixed(2), padL - 6, padT + 4);
    ctx.fillText((maxE / 2).toFixed(2), padL - 6, halfY + 4);
    ctx.fillText('0', padL - 6, zeroY + 4);

    const slotW = chartW / (N + 1);
    const barW = Math.max(3, slotW * 0.7);

    for (let n = 0; n <= N; n++) {
      const centerX = padL + n * slotW + slotW / 2;
      const isHovered = this.hoveredHarmonic === n;

      let val = n === 0 ? (a0 * a0) / 2 : harmonicEnergies[n];
      let barH = (val / maxE) * chartH;
      let barY = zeroY - barH;

      ctx.fillStyle = isHovered ? '#f59e0b' : '#10b981';
      ctx.beginPath();
      ctx.roundRect(centerX - barW / 2, barY, barW, barH, [3, 3, 0, 0]);
      ctx.fill();

      if (N <= 25 || n % 5 === 0 || n === N || n === 0) {
        ctx.fillStyle = isDark ? '#94a3b8' : '#64748b';
        ctx.textAlign = 'center';
        ctx.fillText(n === 0 ? 'DC' : n.toString(), centerX, this.height - 8);
      }
    }
  }

  // Render Parseval Bessel Asymptotic Convergence Curve E_k -> E_orig
  renderConvergence() {
    const ctx = this.ctx;
    const isDark = this.theme === 'dark';
    const { original: E_orig, besselHistory } = this.engine.energy;
    const N = this.engine.N;

    const padL = 45;
    const padR = 20;
    const padT = 25;
    const padB = 25;
    const chartW = this.width - padL - padR;
    const chartH = this.height - padT - padB;
    const zeroY = padT + chartH;
    const halfY = padT + chartH / 2;

    let maxBH = E_orig;
    for (let i = 0; i < besselHistory.length; i++) {
      if (besselHistory[i] > maxBH) maxBH = besselHistory[i];
    }
    const maxVal = maxBH * 1.12 || 1;

    // Asymptote line at E_original (Parseval target)
    const origY = zeroY - (E_orig / maxVal) * chartH;

    ctx.strokeStyle = '#ef4444';
    ctx.setLineDash([4, 4]);
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(padL, origY);
    ctx.lineTo(this.width - padR, origY);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.font = 'bold 10px system-ui, sans-serif';
    ctx.fillStyle = '#ef4444';
    ctx.textAlign = 'right';
    ctx.fillText(`E_orig = ${E_orig.toFixed(3)}`, this.width - padR, origY - 6);

    // Grid baseline and intermediate
    ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)';
    ctx.beginPath();
    ctx.moveTo(padL, padT);
    ctx.lineTo(this.width - padR, padT);
    ctx.moveTo(padL, halfY);
    ctx.lineTo(this.width - padR, halfY);
    ctx.moveTo(padL, zeroY);
    ctx.lineTo(this.width - padR, zeroY);
    ctx.stroke();

    ctx.fillStyle = isDark ? '#94a3b8' : '#64748b';
    ctx.fillText(maxVal.toFixed(2), padL - 6, padT + 4);
    ctx.fillText((maxVal / 2).toFixed(2), padL - 6, halfY + 4);
    ctx.fillText('0', padL - 6, zeroY + 4);

    if (N <= 0) { 
      return; 
    }

    // Plot Bessel Energy step curve
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2.5;
    ctx.beginPath();

    const pts = [];
    for (let k = 0; k <= N; k++) {
      const px = padL + (k / N) * chartW;
      const py = zeroY - (besselHistory[k] / maxVal) * chartH;
      pts.push({ x: px, y: py });
      if (k === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();

    // Fill under curve
    ctx.fillStyle = 'rgba(16, 185, 129, 0.12)';
    ctx.beginPath();
    ctx.moveTo(pts[0].x, zeroY);
    for (const p of pts) ctx.lineTo(p.x, p.y);
    ctx.lineTo(pts[pts.length - 1].x, zeroY);
    ctx.closePath();
    ctx.fill();

    // Data points
    for (let k = 0; k <= N; k++) {
      if (N <= 20 || k === 0 || k === N || k % 5 === 0) {
        ctx.fillStyle = '#10b981';
        ctx.beginPath();
        ctx.arc(pts[k].x, pts[k].y, 3.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = SpectrumChart;
}
if (typeof window !== 'undefined') {
  window.SpectrumChart = SpectrumChart;
}
