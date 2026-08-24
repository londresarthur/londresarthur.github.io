/**
 * CanvasRenderer.js
 * High-performance, Retina/HiDPI interactive plotter engine for Fourier Visualizations.
 * Supports Desmos/GeoGebra-style Pan & Zoom, Dirichlet jump markers, Gibbs overshoot,
 * Even/Odd decompositions, error shading, and 3Blue1Brown-style Epicycles animation.
 * Optimized with requestAnimationFrame VSync throttling and frame-level sample reuse.
 */

class CanvasRenderer {
  constructor(canvas, engine, options = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.engine = engine;

    // Viewport transform (mathematical coordinate space)
    this.view = {
      centerX: 0,
      centerY: 0,
      scaleX: 70, // pixels per math unit
      scaleY: 70,
      minScale: 10,
      maxScale: 1000
    };

    // Rendering toggles
    this.showOriginal = true;
    this.showFourier = true;
    this.showHarmonic = null; // null or integer n
    this.showEvenOdd = false;
    this.showErrorArea = true;
    this.showDirichletPoints = true;
    this.showGibbs = true;
    this.showGrid = true;
    this.theme = 'dark'; // 'dark' or 'light'
    this.epicyclesMode = false;
    this.epicyclesProgress = 0; // x coordinate for phasor drawing

    // Interactive state
    this.isDragging = false;
    this.dragStart = { x: 0, y: 0 };
    this.mouseMath = { x: 0, y: 0, active: false };

    // VSync Throttle State
    this._renderQueued = false;
    this._frameSamples = [];

    // Setup High DPI
    this.setupHiDPI();
    this.bindEvents();
    this.resetView();
  }

  setupHiDPI() {
    const rect = this.canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2); // Cap at 2x for smooth 60fps on 4K/retina
    this.dpr = dpr;

    this.width = rect.width || this.canvas.width || 800;
    this.height = rect.height || this.canvas.height || 500;

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

  autoFit() {
    const L = this.engine.L || Math.PI;

    // Sample function and Fourier approximation over [-L, L] to find bounding range
    let yMin = Infinity;
    let yMax = -Infinity;
    const samples = 80;
    for (let i = 0; i <= samples; i++) {
      const x = -L + (2 * L * i) / samples;
      const yOrig = this.engine.evalBase(x);
      const yFourier = this.engine.evalFourier(x);

      if (Number.isFinite(yOrig)) {
        yMin = Math.min(yMin, yOrig);
        yMax = Math.max(yMax, yOrig);
      }
      if (Number.isFinite(yFourier)) {
        yMin = Math.min(yMin, yFourier);
        yMax = Math.max(yMax, yFourier);
      }
    }

    // Always include zero axis for geometric context
    yMin = Math.min(yMin, 0);
    yMax = Math.max(yMax, 0);

    if (!Number.isFinite(yMin) || !Number.isFinite(yMax) || yMax <= yMin) {
      yMin = -1;
      yMax = 1;
    }

    // Add 25% margin on top and bottom
    const spanY = Math.max(yMax - yMin, 0.5);
    const paddedYMin = yMin - spanY * 0.22;
    const paddedYMax = yMax + spanY * 0.22;
    const totalSpanY = paddedYMax - paddedYMin;

    // Fit [-1.35 L, 1.35 L] on X
    const targetSpanX = 2.7 * L;

    this.view.centerX = 0;
    this.view.centerY = (paddedYMin + paddedYMax) / 2;

    const scaleX = this.width / targetSpanX;
    const scaleY = this.height / totalSpanY;

    this.view.scaleX = Math.max(this.view.minScale, Math.min(this.view.maxScale, scaleX));
    this.view.scaleY = Math.max(this.view.minScale, Math.min(this.view.maxScale, scaleY));

    this.render();
  }

  resetView() {
    this.autoFit();
  }

  // Coordinate transforms
  mathToScreen(x, y) {
    const sx = this.width / 2 + (x - this.view.centerX) * this.view.scaleX;
    const sy = this.height / 2 - (y - this.view.centerY) * this.view.scaleY;
    return { x: sx, y: sy };
  }

  screenToMath(sx, sy) {
    const mx = this.view.centerX + (sx - this.width / 2) / this.view.scaleX;
    const my = this.view.centerY - (sy - this.height / 2) / this.view.scaleY;
    return { x: mx, y: my };
  }

  // Event handlers for pan, zoom, and mouse inspection
  bindEvents() {
    const canvas = this.canvas;

    canvas.addEventListener('mousedown', (e) => {
      if (e.button === 0) {
        this.isDragging = true;
        this.dragStart = { x: e.clientX, y: e.clientY };
        canvas.style.cursor = 'grabbing';
      }
    });

    window.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      const sx = e.clientX - rect.left;
      const sy = e.clientY - rect.top;

      if (this.isDragging) {
        const dx = e.clientX - this.dragStart.x;
        const dy = e.clientY - this.dragStart.y;
        this.view.centerX -= dx / this.view.scaleX;
        this.view.centerY += dy / this.view.scaleY;
        this.dragStart = { x: e.clientX, y: e.clientY };
        this.render();
      }

      if (sx >= 0 && sx <= this.width && sy >= 0 && sy <= this.height) {
        this.mouseMath = {
          ...this.screenToMath(sx, sy),
          active: true,
          sx,
          sy
        };
        if (!this.isDragging) this.render();
      } else if (this.mouseMath.active) {
        this.mouseMath.active = false;
        if (!this.isDragging) this.render();
      }
    });

    window.addEventListener('mouseup', () => {
      if (this.isDragging) {
        this.isDragging = false;
        canvas.style.cursor = 'crosshair';
        this.render();
      }
    });

    canvas.addEventListener('wheel', (e) => {
      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const before = this.screenToMath(mouseX, mouseY);
      const zoomFactor = e.deltaY < 0 ? 1.15 : 0.87;

      const newScaleX = Math.max(this.view.minScale, Math.min(this.view.maxScale, this.view.scaleX * zoomFactor));
      const newScaleY = Math.max(this.view.minScale, Math.min(this.view.maxScale, this.view.scaleY * zoomFactor));

      this.view.scaleX = newScaleX;
      this.view.scaleY = newScaleY;

      // Keep math point under cursor fixed
      const after = this.screenToMath(mouseX, mouseY);
      this.view.centerX += (before.x - after.x);
      this.view.centerY += (before.y - after.y);

      this.render();
    }, { passive: false });

    // Touch events for mobile/tablets
    let lastTouch = null;
    let initialPinchDist = null;

    canvas.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        lastTouch = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        this.isDragging = true;
      } else if (e.touches.length === 2) {
        this.isDragging = true;
        initialPinchDist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
      }
    }, { passive: true });

    canvas.addEventListener('touchmove', (e) => {
      if (e.touches.length === 1 && lastTouch) {
        const dx = e.touches[0].clientX - lastTouch.x;
        const dy = e.touches[0].clientY - lastTouch.y;
        this.view.centerX -= dx / this.view.scaleX;
        this.view.centerY += dy / this.view.scaleY;
        lastTouch = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        this.render();
      } else if (e.touches.length === 2 && initialPinchDist) {
        const rect = canvas.getBoundingClientRect();
        const pinchCenterX = (e.touches[0].clientX + e.touches[1].clientX) / 2 - rect.left;
        const pinchCenterY = (e.touches[0].clientY + e.touches[1].clientY) / 2 - rect.top;

        const before = this.screenToMath(pinchCenterX, pinchCenterY);

        const dist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        const factor = dist / initialPinchDist;
        this.view.scaleX = Math.max(this.view.minScale, Math.min(this.view.maxScale, this.view.scaleX * factor));
        this.view.scaleY = this.view.scaleX;
        initialPinchDist = dist;

        const after = this.screenToMath(pinchCenterX, pinchCenterY);
        this.view.centerX += (before.x - after.x);
        this.view.centerY += (before.y - after.y);

        this.render();
      }
    }, { passive: true });

    canvas.addEventListener('touchend', () => {
      lastTouch = null;
      initialPinchDist = null;
      this.isDragging = false;
      this.render();
    });
  }

  // Formatting math labels nicely with multiples of pi
  formatTick(val) {
    const isPiL = Math.abs(this.engine.L - Math.PI) < 1e-3;
    if (isPiL) {
      const piMult = val / Math.PI;
      if (Math.abs(piMult) < 1e-4) return '0';
      if (Math.abs(piMult - 1) < 1e-4) return 'π';
      if (Math.abs(piMult + 1) < 1e-4) return '-π';
      if (Math.abs(piMult - 2) < 1e-4) return '2π';
      if (Math.abs(piMult + 2) < 1e-4) return '-2π';
      if (Math.abs(piMult - 0.5) < 1e-4) return 'π/2';
      if (Math.abs(piMult + 0.5) < 1e-4) return '-π/2';
      if (Math.abs(piMult - 1.5) < 1e-4) return '3π/2';
      if (Math.abs(piMult + 1.5) < 1e-4) return '-3π/2';
    }
    if (Math.abs(val) < 1e-4) return '0';
    return Number.isInteger(val) ? val.toString() : val.toFixed(1);
  }

  // Draw coordinate grid with adaptive step
  drawGrid() {
    const ctx = this.ctx;
    const isDark = this.theme === 'dark';
    const L = this.engine.L;
    const isPi = Math.abs(L - Math.PI) < 1e-3;

    // Bounds in math coords
    const min = this.screenToMath(0, this.height);
    const max = this.screenToMath(this.width, 0);

    // Fundamental interval [-L, L] highlight
    const screenNegL = this.mathToScreen(-L, 0).x;
    const screenPosL = this.mathToScreen(L, 0).x;

    ctx.fillStyle = isDark ? 'rgba(14, 165, 233, 0.04)' : 'rgba(14, 165, 233, 0.06)';
    ctx.fillRect(screenNegL, 0, screenPosL - screenNegL, this.height);

    // Grid interval step calculation
    const rawStepX = 80 / this.view.scaleX;
    let stepX = 1;
    if (isPi) {
      if (rawStepX > Math.PI) stepX = Math.PI * Math.ceil(rawStepX / Math.PI);
      else if (rawStepX > Math.PI / 2) stepX = Math.PI;
      else if (rawStepX > Math.PI / 4) stepX = Math.PI / 2;
      else stepX = Math.PI / 4;
    } else {
      const pow10 = Math.pow(10, Math.floor(Math.log10(rawStepX)));
      const mant = rawStepX / pow10;
      if (mant < 1.5) stepX = pow10;
      else if (mant < 3.5) stepX = 2 * pow10;
      else if (mant < 7.5) stepX = 5 * pow10;
      else stepX = 10 * pow10;
    }

    const rawStepY = 60 / this.view.scaleY;
    const pow10Y = Math.pow(10, Math.floor(Math.log10(rawStepY)));
    const mantY = rawStepY / pow10Y;
    let stepY = pow10Y;
    if (mantY >= 1.5 && mantY < 3.5) stepY = 2 * pow10Y;
    else if (mantY >= 3.5 && mantY < 7.5) stepY = 5 * pow10Y;
    else if (mantY >= 7.5) stepY = 10 * pow10Y;

    // Draw Grid Lines
    ctx.lineWidth = 1;
    ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.06)';
    ctx.fillStyle = isDark ? '#64748b' : '#94a3b8';
    ctx.font = '10px JetBrains Mono, monospace';

    // Vertical Lines (X)
    const firstX = Math.floor(min.x / stepX) * stepX;
    for (let x = firstX; x <= max.x; x += stepX) {
      const sp = this.mathToScreen(x, 0);
      ctx.beginPath();
      ctx.moveTo(sp.x, 0);
      ctx.lineTo(sp.x, this.height);
      ctx.stroke();

      // Axis Labels
      if (Math.abs(x) > 1e-4) {
        ctx.textAlign = 'center';
        const labelY = Math.max(15, Math.min(this.height - 5, this.mathToScreen(0, 0).y + 14));
        ctx.fillText(this.formatTick(x), sp.x, labelY);
      }
    }

    // Horizontal Lines (Y)
    const firstY = Math.floor(min.y / stepY) * stepY;
    for (let y = firstY; y <= max.y; y += stepY) {
      const sp = this.mathToScreen(0, y);
      ctx.beginPath();
      ctx.moveTo(0, sp.y);
      ctx.lineTo(this.width, sp.y);
      ctx.stroke();

      // Labels
      if (Math.abs(y) > 1e-4) {
        ctx.textAlign = 'right';
        const labelX = Math.max(25, Math.min(this.width - 5, this.mathToScreen(0, 0).x - 6));
        ctx.fillText(this.formatTick(y), labelX, sp.y + 3);
      }
    }

    // Main Axes (X=0, Y=0)
    const origin = this.mathToScreen(0, 0);
    ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.25)' : 'rgba(0, 0, 0, 0.35)';
    ctx.lineWidth = 1.5;

    // X Axis
    ctx.beginPath();
    ctx.moveTo(0, origin.y);
    ctx.lineTo(this.width, origin.y);
    ctx.stroke();

    // Y Axis
    ctx.beginPath();
    ctx.moveTo(origin.x, 0);
    ctx.lineTo(origin.x, this.height);
    ctx.stroke();

    // Fundamental Interval Boundaries [-L, L]
    ctx.strokeStyle = '#0ea5e9';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 4]);

    ctx.beginPath();
    ctx.moveTo(screenNegL, 0);
    ctx.lineTo(screenNegL, this.height);
    ctx.moveTo(screenPosL, 0);
    ctx.lineTo(screenPosL, this.height);
    ctx.stroke();
    ctx.setLineDash([]);

    // Interval Labels Top
    ctx.fillStyle = '#0ea5e9';
    ctx.textAlign = 'center';
    ctx.fillText('-L = -' + (isPi ? 'π' : L.toFixed(2)), screenNegL, 20);
    ctx.fillText('+L = +' + (isPi ? 'π' : L.toFixed(2)), screenPosL, 20);
  }

  // Precompute samples once per frame for 100% trig reuse
  _computeFrameSamples() {
    const step = this.isDragging ? 3.5 : 2.0;
    const samples = [];
    const width = this.width;

    for (let px = 0; px <= width; px += step) {
      const mx = this.screenToMath(px, 0).x;
      const fVal = this.engine.evalPeriodic(mx);
      const sVal = this.engine.evalFourier(mx);

      const pF = this.mathToScreen(mx, fVal);
      const pS = this.mathToScreen(mx, sVal);
      samples.push({ px, mx, fVal, sVal, pF, pS });
    }

    this._frameSamples = samples;
  }

  // Draw shaded error area between f(x) and S_N(x)
  drawErrorArea() {
    if (!this.showErrorArea || this._frameSamples.length === 0) return;
    const ctx = this.ctx;
    const samples = this._frameSamples;

    ctx.fillStyle = 'rgba(239, 68, 68, 0.12)';
    ctx.beginPath();

    for (let i = 0; i < samples.length; i++) {
      const pF = samples[i].pF;
      if (i === 0) ctx.moveTo(pF.x, pF.y);
      else ctx.lineTo(pF.x, pF.y);
    }

    for (let i = samples.length - 1; i >= 0; i--) {
      const pS = samples[i].pS;
      ctx.lineTo(pS.x, pS.y);
    }

    ctx.closePath();
    ctx.fill();
  }

  // Draw original function f(x) and its periodic extensions
  drawOriginalCurve() {
    if (!this.showOriginal) return;
    const ctx = this.ctx;
    const L = this.engine.L;
    const samples = this._frameSamples;
    if (samples.length === 0) return;

    const threshold = 150;

    // 1. Draw periodic extension outside [-L, L] (dashed)
    ctx.strokeStyle = this.theme === 'dark' ? 'rgba(56, 189, 248, 0.4)' : 'rgba(14, 165, 233, 0.45)';
    ctx.setLineDash([4, 4]);
    ctx.lineWidth = 1.8;
    ctx.beginPath();

    let penDown = false;
    let prevY = 0;

    for (let i = 0; i < samples.length; i++) {
      const sp = samples[i].pF;
      if (!penDown || Math.abs(sp.y - prevY) > threshold) {
        ctx.moveTo(sp.x, sp.y);
        penDown = true;
      } else {
        ctx.lineTo(sp.x, sp.y);
      }
      prevY = sp.y;
    }
    ctx.stroke();
    ctx.setLineDash([]);

    // 2. Draw fundamental interval [-L, L] with bold vibrant stroke
    const screenNegL = this.mathToScreen(-L, 0).x;
    const screenPosL = this.mathToScreen(L, 0).x;

    ctx.strokeStyle = this.theme === 'dark' ? '#38bdf8' : '#0284c7';
    ctx.lineWidth = 3;
    ctx.beginPath();

    penDown = false;
    for (let i = 0; i < samples.length; i++) {
      const s = samples[i];
      if (s.px >= screenNegL - 2 && s.px <= screenPosL + 2) {
        const mx = s.mx;
        const my = this.engine.evalBase(mx);
        const sp = this.mathToScreen(mx, my);

        if (!penDown || Math.abs(sp.y - prevY) > threshold) {
          ctx.moveTo(sp.x, sp.y);
          penDown = true;
        } else {
          ctx.lineTo(sp.x, sp.y);
        }
        prevY = sp.y;
      }
    }
    ctx.stroke();
  }

  // Draw Even and Odd component curves if enabled
  drawEvenOddComponents() {
    if (!this.showEvenOdd || this._frameSamples.length === 0) return;
    const ctx = this.ctx;
    const samples = this._frameSamples;

    // Even part (f_par) in cyan
    ctx.strokeStyle = 'rgba(59, 130, 246, 0.7)';
    ctx.lineWidth = 2;
    ctx.setLineDash([6, 3]);
    ctx.beginPath();
    for (let i = 0; i < samples.length; i++) {
      const sp = this.mathToScreen(samples[i].mx, this.engine.evalEvenPart(samples[i].mx));
      if (i === 0) ctx.moveTo(sp.x, sp.y);
      else ctx.lineTo(sp.x, sp.y);
    }
    ctx.stroke();

    // Odd part (f_impar) in amber
    ctx.strokeStyle = 'rgba(245, 158, 11, 0.7)';
    ctx.beginPath();
    for (let i = 0; i < samples.length; i++) {
      const sp = this.mathToScreen(samples[i].mx, this.engine.evalOddPart(samples[i].mx));
      if (i === 0) ctx.moveTo(sp.x, sp.y);
      else ctx.lineTo(sp.x, sp.y);
    }
    ctx.stroke();
    ctx.setLineDash([]);
  }

  // Draw individual harmonic if hovered/inspected
  drawSingleHarmonic() {
    if (this.showHarmonic === null || this._frameSamples.length === 0) return;
    const n = this.showHarmonic;
    const ctx = this.ctx;
    const samples = this._frameSamples;

    ctx.strokeStyle = '#eab308';
    ctx.lineWidth = 2.5;
    ctx.setLineDash([4, 2]);
    ctx.beginPath();

    for (let i = 0; i < samples.length; i++) {
      const sp = this.mathToScreen(samples[i].mx, this.engine.evalHarmonic(samples[i].mx, n));
      if (i === 0) ctx.moveTo(sp.x, sp.y);
      else ctx.lineTo(sp.x, sp.y);
    }
    ctx.stroke();
    ctx.setLineDash([]);
  }

  // Draw Fourier Approximation S_N(x)
  drawFourierCurve() {
    if (!this.showFourier || this._frameSamples.length === 0) return;
    const ctx = this.ctx;
    const samples = this._frameSamples;

    // Fast Neon underglow (hardware-accelerated, 0 shadowBlur penalty)
    if (this.theme === 'dark') {
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.25)';
      ctx.lineWidth = 6;
      ctx.beginPath();
      for (let i = 0; i < samples.length; i++) {
        const p = samples[i].pS;
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      }
      ctx.stroke();
    }

    // Crisp core stroke
    ctx.strokeStyle = this.theme === 'dark' ? '#10b981' : '#059669';
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();

    for (let i = 0; i < samples.length; i++) {
      const p = samples[i].pS;
      if (i === 0) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    }
    ctx.stroke();
  }

  // Draw Dirichlet Midpoints & Jump Discontinuities
  drawDirichletHighlights() {
    if (!this.showDirichletPoints) return;
    const ctx = this.ctx;
    const discs = this.engine.discontinuities;
    if (!discs || discs.length === 0) return;

    for (const d of discs) {
      const spMid = this.mathToScreen(d.x, d.dirichletMidpoint);
      const spLeft = this.mathToScreen(d.x, d.left);
      const spRight = this.mathToScreen(d.x, d.right);

      // Vertical connecting jump line
      ctx.strokeStyle = 'rgba(239, 68, 68, 0.5)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(spLeft.x, spLeft.y);
      ctx.lineTo(spRight.x, spRight.y);
      ctx.stroke();
      ctx.setLineDash([]);

      // Hollow circle at left limit f(x-)
      ctx.fillStyle = this.theme === 'dark' ? '#0f172a' : '#ffffff';
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(spLeft.x, spLeft.y, 4.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Hollow circle at right limit f(x+)
      ctx.beginPath();
      ctx.arc(spRight.x, spRight.y, 4.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Solid emerald circle at Dirichlet convergence midpoint: (f(x+) + f(x-))/2
      ctx.fillStyle = '#10b981';
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(spMid.x, spMid.y, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Label with midpoint value
      ctx.fillStyle = this.theme === 'dark' ? '#34d399' : '#059669';
      ctx.font = '10px JetBrains Mono, monospace';
      ctx.textAlign = 'left';
      ctx.fillText(`S(${d.x.toFixed(1)})=${d.dirichletMidpoint.toFixed(2)}`, spMid.x + 8, spMid.y - 4);
    }
  }

  // Draw 3Blue1Brown Epicycles animation
  drawEpicycles() {
    if (!this.epicyclesMode) return;
    const ctx = this.ctx;
    const x = this.epicyclesProgress;
    const { circles } = this.engine.getEpicyclesAt(x);

    // Epicycles base anchor on Y axis or at current point
    const anchor = this.mathToScreen(x, 0);

    ctx.save();
    let currSX = anchor.x;
    let currSY = anchor.y;

    for (const c of circles) {
      if (c.radius < 1e-4) continue;
      const screenRadius = c.radius * this.view.scaleY;

      // Circle orbit
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.35)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(currSX, currSY, screenRadius, 0, Math.PI * 2);
      ctx.stroke();

      // Rotating vector arrow
      const nextSX = currSX + (c.endX - c.startX) * this.view.scaleX;
      const nextSY = currSY - (c.endY - c.startY) * this.view.scaleY;

      ctx.strokeStyle = '#c084fc';
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.moveTo(currSX, currSY);
      ctx.lineTo(nextSX, nextSY);
      ctx.stroke();

      // Joint dot
      ctx.fillStyle = '#ec4899';
      ctx.beginPath();
      ctx.arc(nextSX, nextSY, 2.5, 0, Math.PI * 2);
      ctx.fill();

      currSX = nextSX;
      currSY = nextSY;
    }

    // Pen tip drawing the curve
    const tracerY = this.mathToScreen(x, this.engine.evalFourier(x)).y;
    ctx.strokeStyle = 'rgba(236, 72, 153, 0.6)';
    ctx.setLineDash([2, 2]);
    ctx.beginPath();
    ctx.moveTo(currSX, currSY);
    ctx.lineTo(anchor.x, tracerY);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = '#f43f5e';
    ctx.beginPath();
    ctx.arc(anchor.x, tracerY, 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  // Draw mouse hover crosshair & inspection tooltip
  drawHoverInspection() {
    if (!this.mouseMath.active || this.isDragging) return;
    const ctx = this.ctx;
    const mx = this.mouseMath.x;
    const sx = this.mouseMath.sx;

    const fVal = this.engine.evalPeriodic(mx);
    const sVal = this.engine.evalFourier(mx);
    const err = Math.abs(fVal - sVal);

    const spF = this.mathToScreen(mx, fVal);
    const spS = this.mathToScreen(mx, sVal);

    // Vertical indicator line
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
    ctx.setLineDash([4, 4]);
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(sx, 0);
    ctx.lineTo(sx, this.height);
    ctx.stroke();
    ctx.setLineDash([]);

    // Point dots on curves
    ctx.fillStyle = '#38bdf8';
    ctx.beginPath();
    ctx.arc(spF.x, spF.y, 4, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#10b981';
    ctx.beginPath();
    ctx.arc(spS.x, spS.y, 4, 0, Math.PI * 2);
    ctx.fill();

    // Floating Tooltip Badge
    const pad = 10;
    const boxW = 165;
    const boxH = 75;
    let boxX = sx + 15;
    let boxY = Math.min(spS.y - 40, this.height - boxH - 10);
    if (boxX + boxW > this.width) boxX = sx - boxW - 15;
    if (boxY < 10) boxY = 10;

    ctx.fillStyle = 'rgba(15, 23, 42, 0.92)';
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 1;

    // Rounded rectangle tooltip
    ctx.beginPath();
    ctx.roundRect(boxX, boxY, boxW, boxH, 8);
    ctx.fill();
    ctx.stroke();

    // Tooltip text
    ctx.font = '11px system-ui, sans-serif';
    ctx.textAlign = 'left';

    ctx.fillStyle = '#94a3b8';
    ctx.fillText(`x = ${mx.toFixed(3)}`, boxX + pad, boxY + 18);

    ctx.fillStyle = '#38bdf8';
    ctx.fillText(`f(x) = ${fVal.toFixed(4)}`, boxX + pad, boxY + 34);

    ctx.fillStyle = '#10b981';
    ctx.fillText(`S_N(x) = ${sVal.toFixed(4)}`, boxX + pad, boxY + 50);

    ctx.fillStyle = '#f87171';
    ctx.fillText(`Erro |f - S_N| = ${err.toFixed(4)}`, boxX + pad, boxY + 66);
  }

  // VSync Throttled Render Pipeline
  render() {
    if (this._renderQueued) return;
    this._renderQueued = true;
    requestAnimationFrame(() => {
      this._renderQueued = false;
      this._drawFrame();
    });
  }

  // Internal Draw Routine
  _drawFrame() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.width, this.height);

    // 0. Compute samples once per frame
    this._computeFrameSamples();

    // 1. Grid & Axes
    if (this.showGrid) this.drawGrid();

    // 2. Error Area Shading
    this.drawErrorArea();

    // 3. Even/Odd Components
    this.drawEvenOddComponents();

    // 4. Single Harmonic Highlight
    this.drawSingleHarmonic();

    // 5. Original Curve
    this.drawOriginalCurve();

    // 6. Fourier Series Approximation
    this.drawFourierCurve();

    // 7. Dirichlet Convergence Midpoints & Jump Highlights
    this.drawDirichletHighlights();

    // 8. 3Blue1Brown Epicycles animation
    this.drawEpicycles();

    // 9. Interactive Inspection Hover
    this.drawHoverInspection();
  }

  // --- Academic & Professor Export Tools ---

  // 1. Export High Resolution PNG Image
  exportPNG(filename) {
    const name = filename || `fourier_grafico_N${this.engine.N}_${this.engine.presetId || 'custom'}.png`;
    const url = this.canvas.toDataURL('image/png');
    const aTag = document.createElement('a');
    aTag.href = url;
    aTag.download = name;
    aTag.click();
  }

  // 2. Export Scalable Vector Graphics (SVG) for Overleaf / LaTeX & Illustrator
  exportSVG() {
    const L = this.engine.L;
    const w = 960;
    const h = 540;
    const isDark = this.theme === 'dark';
    const bgColor = isDark ? '#090d16' : '#ffffff';
    const textColor = isDark ? '#94a3b8' : '#334155';

    const xMin = -1.8 * L;
    const xMax = 1.8 * L;

    let yMin = -1.5;
    let yMax = 1.5;
    if (this._frameSamples && this._frameSamples.length > 0) {
      yMin = Math.min(...this._frameSamples.map(s => Math.min(s.fVal, s.sVal)));
      yMax = Math.max(...this._frameSamples.map(s => Math.max(s.fVal, s.sVal)));
    }
    const spanY = Math.max(yMax - yMin, 1);
    const pYMin = yMin - spanY * 0.22;
    const pYMax = yMax + spanY * 0.22;

    const toSvgX = (x) => ((x - xMin) / (xMax - xMin)) * w;
    const toSvgY = (y) => h - ((y - pYMin) / (pYMax - pYMin)) * h;

    const samples = 350;
    const dx = (xMax - xMin) / samples;

    let pathOrig = '';
    let pathFourier = '';

    for (let i = 0; i <= samples; i++) {
      const mx = xMin + i * dx;
      const fVal = this.engine.evalPeriodic(mx);
      const sVal = this.engine.evalFourier(mx);

      const sx = toSvgX(mx).toFixed(1);
      const syF = toSvgY(fVal).toFixed(1);
      const syS = toSvgY(sVal).toFixed(1);

      if (i === 0) {
        pathOrig += `M ${sx} ${syF} `;
        pathFourier += `M ${sx} ${syS} `;
      } else {
        pathOrig += `L ${sx} ${syF} `;
        pathFourier += `L ${sx} ${syS} `;
      }
    }

    const svg = `<?xml version="1.0" encoding="utf-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
  <rect width="${w}" height="${h}" fill="${bgColor}"/>
  
  <!-- Fundamental Domain [-L, L] -->
  <rect x="${toSvgX(-L)}" y="0" width="${toSvgX(L) - toSvgX(-L)}" height="${h}" fill="${isDark ? 'rgba(14,165,233,0.06)' : 'rgba(14,165,233,0.08)'}"/>
  <line x1="${toSvgX(-L)}" y1="0" x2="${toSvgX(-L)}" y2="${h}" stroke="#0ea5e9" stroke-width="1.5" stroke-dasharray="4,4"/>
  <line x1="${toSvgX(L)}" y1="0" x2="${toSvgX(L)}" y2="${h}" stroke="#0ea5e9" stroke-width="1.5" stroke-dasharray="4,4"/>
  
  <!-- Axes X and Y -->
  <line x1="0" y1="${toSvgY(0)}" x2="${w}" y2="${toSvgY(0)}" stroke="${isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)'}" stroke-width="1.5"/>
  <line x1="${toSvgX(0)}" y1="0" x2="${toSvgX(0)}" y2="${h}" stroke="${isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)'}" stroke-width="1.5"/>
  
  <!-- Original Function f(x) -->
  <path d="${pathOrig}" fill="none" stroke="#38bdf8" stroke-width="2.5" opacity="0.9"/>
  
  <!-- Fourier S_N(x) -->
  <path d="${pathFourier}" fill="none" stroke="#10b981" stroke-width="3"/>
  
  <!-- Title & Legend -->
  <text x="24" y="32" fill="#38bdf8" font-family="system-ui, sans-serif" font-size="14" font-weight="bold">f(x) Original</text>
  <text x="140" y="32" fill="#10b981" font-family="system-ui, sans-serif" font-size="14" font-weight="bold">S_${this.engine.N}(x) Fourier (N=${this.engine.N})</text>
  <text x="${toSvgX(-L)}" y="${h - 15}" fill="#0ea5e9" font-family="monospace" font-size="11" text-anchor="middle">-L</text>
  <text x="${toSvgX(L)}" y="${h - 15}" fill="#0ea5e9" font-family="monospace" font-size="11" text-anchor="middle">+L</text>
</svg>`;

    const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const aTag = document.createElement('a');
    aTag.href = url;
    aTag.download = `fourier_grafico_N${this.engine.N}.svg`;
    aTag.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  // 3. Generate Native TikZ / PGFPlots Code for LaTeX
  generateTikZ() {
    const L = this.engine.L;
    const N = this.engine.N;
    const lStr = Math.abs(L - Math.PI) < 1e-4 ? '\\pi' : L.toFixed(2);

    return `% ==========================================================
% Código TikZ / PGFPlots para compilar nativamente no LaTeX/Overleaf
% ==========================================================
\\documentclass[tikz,border=10pt]{standalone}
\\usepackage{pgfplots}
\\pgfplotsset{compat=1.18}

\\begin{document}
\\begin{tikzpicture}
\\begin{axis}[
    title={S\\'erie de Fourier $S_{${N}}(x)$ para $L=${lStr}$},
    xlabel={$x$},
    ylabel={$y$},
    xmin=-${(1.4 * L).toFixed(2)}, xmax=${(1.4 * L).toFixed(2)},
    grid=both,
    grid style={line width=.1pt, draw=gray!20},
    major grid style={line width=.2pt, draw=gray!50},
    axis lines=middle,
    legend pos=outer north east,
    width=13cm, height=7.5cm
]

% Linhas do Intervalo Fundamental [-L, L]
\\draw[dashed, color=cyan!80, line width=1pt] (axis cs:-${L.toFixed(2)},-10) -- (axis cs:-${L.toFixed(2)},10);
\\draw[dashed, color=cyan!80, line width=1pt] (axis cs:${L.toFixed(2)},-10) -- (axis cs:${L.toFixed(2)},10);

% Curva da Soma Harmônica S_N(x)
\\addplot[color=teal!90!black, line width=1.5pt, samples=200, domain=-${(1.3 * L).toFixed(2)}:${(1.3 * L).toFixed(2)}]
    { ${this.engine.toPgfplotsFormula(8)} };
\\addlegendentry{$S_{${N}}(x)$}

\\end{axis}
\\end{tikzpicture}
\\end{document}`;
  }

  // 4. Export CSV of Coefficients and Parseval Energy
  exportCSV() {
    const N = this.engine.N;
    const a = this.engine.a;
    const b = this.engine.b;
    const origE = this.engine.energy.original || 1;

    let csv = "Harmonico_n,a_n_Cos,b_n_Sen,Magnitude_cn,Energia_En,Percentual_Energia_Pct\n";
    csv += `0,${a[0].toFixed(6)},0.000000,${(a[0] / 2).toFixed(6)},${(this.engine.energy.harmonicEnergies[0] || 0).toFixed(6)},${(((this.engine.energy.harmonicEnergies[0] || 0) / origE) * 100).toFixed(2)}\n`;

    for (let n = 1; n <= N; n++) {
      const an = a[n] || 0;
      const bn = b[n] || 0;
      const cn = Math.hypot(an, bn);
      const en = an * an + bn * bn;
      const pct = (en / origE) * 100;
      csv += `${n},${an.toFixed(6)},${bn.toFixed(6)},${cn.toFixed(6)},${en.toFixed(6)},${pct.toFixed(2)}\n`;
    }

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const aTag = document.createElement('a');
    aTag.href = url;
    aTag.download = `fourier_coeficientes_N${N}_${this.engine.presetId || 'custom'}.csv`;
    aTag.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  // 5. Generate LaTeX Tabular Code for Exams and Worksheets
  generateLatexTable() {
    const N = this.engine.N;
    const a = this.engine.a;
    const b = this.engine.b;
    const origE = this.engine.energy.original || 1;

    let tex = `% Tabela de Coeficientes de Fourier para Provas / Listas no LaTeX
\\begin{table}[htbp]
\\centering
\\caption{Coeficientes de Euler-Fourier e Decomposição de Energia ($N=${N}$, $L=${this.engine.L.toFixed(2)}$)}
\\begin{tabular}{|c|c|c|c|c|c|}
\\hline
\\textbf{Harmônico ($n$)} & \\textbf{$a_n$ (Cos)} & \\textbf{$b_n$ (Sen)} & \\textbf{Magnitude $c_n$} & \\textbf{Energia $E_n$} & \\textbf{\\% de $E_{\\text{orig}}$} \\\\
\\hline
$0$ (DC) & ${a[0].toFixed(4)} & $0.0000$ & ${(a[0]/2).toFixed(4)} & ${(this.engine.energy.harmonicEnergies[0] || 0).toFixed(4)} & ${(((this.engine.energy.harmonicEnergies[0] || 0)/origE)*100).toFixed(2)}\\% \\\\
\\hline
`;

    const limit = Math.min(N, 20);
    for (let n = 1; n <= limit; n++) {
      const an = a[n] || 0;
      const bn = b[n] || 0;
      const cn = Math.hypot(an, bn);
      const en = an * an + bn * bn;
      const pct = (en / origE) * 100;
      tex += `$${n}$ & $${an.toFixed(4)}$ & $${bn.toFixed(4)}$ & $${cn.toFixed(4)}$ & $${en.toFixed(4)}$ & $${pct.toFixed(2)}\\%$ \\\\\n`;
    }

    tex += `\\hline
\\end{tabular}
\\label{tab:fourier_coeffs_${N}}
\\end{table}`;

    return tex;
  }

  // 6. Generate Python Script for Students and Researchers
  generatePythonScript() {
    const L = this.engine.L;
    const N = this.engine.N;
    const expr = this.engine.expression;

    return `# ==========================================================
# Fourier Studio USP — Script Científico de Análise Harmônica
# Gerado para Uso Didático, Pesquisa e Demonstração em Aula
# ==========================================================

import numpy as np
import matplotlib.pyplot as plt

# 1. Parâmetros
L = ${Math.abs(L - Math.PI) < 1e-4 ? 'np.pi' : L.toFixed(4)}
N = ${N}

# 2. Coeficientes de Fourier Truncados
a0 = ${this.engine.a[0].toFixed(6)}
a = np.array([${this.engine.a.slice(0, Math.min(N + 1, 30)).map(v => v.toFixed(6)).join(', ')}])
b = np.array([${this.engine.b.slice(0, Math.min(N + 1, 30)).map(v => v.toFixed(6)).join(', ')}])

def fourier_series(x, order):
    s = a0 / 2.0
    for n in range(1, order + 1):
        if n < len(a):
            s += a[n] * np.cos(n * np.pi * x / L) + b[n] * np.sin(n * np.pi * x / L)
    return s

# 3. Plotagem Didática
x = np.linspace(-2.5 * L, 2.5 * L, 1000)
fig, (ax1, ax2) = plt.subplots(2, 1, figsize=(10, 8), dpi=300)

ax1.plot(x, fourier_series(x, N), 'g-', lw=2.2, label=f'S_{N}(x) Fourier')
ax1.axvline(-L, color='cyan', linestyle='--', label='-L')
ax1.axvline(L, color='cyan', linestyle='--', label='+L')
ax1.set_title(f'Aproximação Harmônica de Fourier (N={N})')
ax1.grid(True, alpha=0.3)
ax1.legend()

n_arr = np.arange(1, min(N + 1, 25))
energies = [a[n]**2 + b[n]**2 for n in n_arr]
ax2.bar(n_arr, energies, color='purple', alpha=0.7)
ax2.set_xlabel('Harmônico n')
ax2.set_ylabel('Energia E_n')
ax2.set_title('Espectro de Potência e Conservação de Parseval')
ax2.grid(True, alpha=0.3)

plt.tight_layout()
plt.savefig('fourier_plot.png')
plt.show()
`;
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = CanvasRenderer;
}
if (typeof window !== 'undefined') {
  window.CanvasRenderer = CanvasRenderer;
}
