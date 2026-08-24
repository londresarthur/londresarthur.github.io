/**
 * CanvasRenderer.js
 * High-performance, Retina/HiDPI interactive plotter engine for Fourier Visualizations.
 * Supports Desmos/GeoGebra-style Pan & Zoom, Dirichlet jump markers, Gibbs overshoot,
 * Even/Odd decompositions, error shading, and 3Blue1Brown-style Epicycles animation.
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

    // Setup High DPI
    this.setupHiDPI();
    this.bindEvents();
    this.resetView();
  }

  setupHiDPI() {
    const rect = this.canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
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

  resetView() {
    const L = this.engine.L || Math.PI;
    this.view.centerX = 0;
    this.view.centerY = 0;
    // Scale so that [-1.5L, 1.5L] fits nicely in width
    const targetSpanX = 3.2 * L;
    this.view.scaleX = this.width / targetSpanX;
    this.view.scaleY = this.view.scaleX;
    this.render();
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
      } else if (e.touches.length === 2) {
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

    ctx.fillStyle = isDark ? 'rgba(59, 130, 246, 0.05)' : 'rgba(59, 130, 246, 0.08)';
    ctx.fillRect(screenNegL, 0, screenPosL - screenNegL, this.height);

    // Interval boundary dashed lines
    ctx.strokeStyle = isDark ? 'rgba(59, 130, 246, 0.35)' : 'rgba(59, 130, 246, 0.45)';
    ctx.setLineDash([6, 6]);
    ctx.lineWidth = 1.5;

    ctx.beginPath();
    ctx.moveTo(screenNegL, 0);
    ctx.lineTo(screenNegL, this.height);
    ctx.moveTo(screenPosL, 0);
    ctx.lineTo(screenPosL, this.height);
    ctx.stroke();
    ctx.setLineDash([]);

    // Determine grid step
    let stepX = isPi ? (Math.PI / 2) : (L / 2);
    if (this.view.scaleX > 150) stepX /= 2;
    if (this.view.scaleX < 40) stepX *= 2;

    let stepY = 1;
    if (this.view.scaleY > 150) stepY = 0.5;
    if (this.view.scaleY < 40) stepY = 2;

    const startX = Math.floor(min.x / stepX) * stepX;
    const startY = Math.floor(min.y / stepY) * stepY;

    // Grid lines
    ctx.lineWidth = 1;
    ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.07)' : 'rgba(0, 0, 0, 0.06)';
    ctx.font = '11px system-ui, -apple-system, sans-serif';
    ctx.fillStyle = isDark ? 'rgba(148, 163, 184, 0.8)' : 'rgba(100, 116, 139, 0.9)';

    // Vertical grid & X labels
    const origin = this.mathToScreen(0, 0);

    for (let x = startX; x <= max.x + stepX; x += stepX) {
      const pos = this.mathToScreen(x, 0);
      ctx.beginPath();
      ctx.moveTo(pos.x, 0);
      ctx.lineTo(pos.x, this.height);
      ctx.stroke();

      // X Label
      const label = this.formatTick(x);
      const textY = Math.min(Math.max(origin.y + 15, 18), this.height - 8);
      ctx.textAlign = 'center';
      ctx.fillText(label, pos.x, textY);
    }

    // Horizontal grid & Y labels
    for (let y = startY; y <= max.y + stepY; y += stepY) {
      const pos = this.mathToScreen(0, y);
      ctx.beginPath();
      ctx.moveTo(0, pos.y);
      ctx.lineTo(this.width, pos.y);
      ctx.stroke();

      // Y Label
      if (Math.abs(y) > 1e-5) {
        const textX = Math.min(Math.max(origin.x + 8, 8), this.width - 25);
        ctx.textAlign = 'left';
        ctx.fillText(y.toString(), textX, pos.y - 4);
      }
    }

    // Main Axes (X and Y = 0)
    ctx.lineWidth = 2;
    ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.35)';

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

    // Origin 0 mark
    ctx.textAlign = 'right';
    ctx.fillText('0', origin.x - 6, origin.y + 14);

    // Interval label [-L, L] tag
    ctx.fillStyle = isDark ? 'rgba(96, 165, 250, 0.9)' : 'rgba(37, 99, 235, 0.9)';
    ctx.textAlign = 'center';
    ctx.fillText('-L = -' + (isPi ? 'π' : L.toFixed(2)), screenNegL, 20);
    ctx.fillText('+L = +' + (isPi ? 'π' : L.toFixed(2)), screenPosL, 20);
  }

  // Draw shaded error area between f(x) and S_N(x)
  drawErrorArea() {
    if (!this.showErrorArea) return;
    const ctx = this.ctx;
    const min = this.screenToMath(0, 0);
    const max = this.screenToMath(this.width, 0);

    const step = 2; // pixel step
    ctx.fillStyle = 'rgba(239, 68, 68, 0.12)';
    ctx.beginPath();

    let started = false;
    const pathS = [];

    for (let px = 0; px <= this.width; px += step) {
      const mx = this.screenToMath(px, 0).x;
      const fVal = this.engine.evalPeriodic(mx);
      const sVal = this.engine.evalFourier(mx);

      const pF = this.mathToScreen(mx, fVal);
      const pS = this.mathToScreen(mx, sVal);
      pathS.push(pS);

      if (!started) {
        ctx.moveTo(pF.x, pF.y);
        started = true;
      } else {
        ctx.lineTo(pF.x, pF.y);
      }
    }

    for (let i = pathS.length - 1; i >= 0; i--) {
      ctx.lineTo(pathS[i].x, pathS[i].y);
    }

    ctx.closePath();
    ctx.fill();
  }

  // Draw original function f(x) and its periodic extensions
  drawOriginalCurve() {
    if (!this.showOriginal) return;
    const ctx = this.ctx;
    const L = this.engine.L;
    const step = 2; // pixel precision
    const mathStep = (step / this.view.scaleX);
    const maxExpectedDy = 10 * mathStep * this.view.scaleY; // generous multiple
    const threshold = Math.max(100, Math.min(400, maxExpectedDy));

    // 1. Draw periodic extension outside [-L, L] (dashed)
    ctx.strokeStyle = this.theme === 'dark' ? 'rgba(56, 189, 248, 0.4)' : 'rgba(14, 165, 233, 0.45)';
    ctx.setLineDash([4, 4]);
    ctx.lineWidth = 1.8;
    ctx.beginPath();

    let penDown = false;
    let prevY = 0;

    for (let px = 0; px <= this.width; px += step) {
      const mx = this.screenToMath(px, 0).x;
      const my = this.engine.evalPeriodic(mx);
      const sp = this.mathToScreen(mx, my);

      // Jump discontinuity handling
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
    for (let px = Math.max(0, screenNegL); px <= Math.min(this.width, screenPosL); px += step) {
      const mx = this.screenToMath(px, 0).x;
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
    ctx.stroke();
  }

  // Draw Even and Odd component curves if enabled
  drawEvenOddComponents() {
    if (!this.showEvenOdd) return;
    const ctx = this.ctx;
    const step = 2;

    // Even part (f_par) in cyan
    ctx.strokeStyle = 'rgba(59, 130, 246, 0.7)';
    ctx.lineWidth = 2;
    ctx.setLineDash([6, 3]);
    ctx.beginPath();
    for (let px = 0; px <= this.width; px += step) {
      const mx = this.screenToMath(px, 0).x;
      const my = this.engine.evalEvenPart(mx);
      const sp = this.mathToScreen(mx, my);
      if (px === 0) ctx.moveTo(sp.x, sp.y);
      else ctx.lineTo(sp.x, sp.y);
    }
    ctx.stroke();

    // Odd part (f_impar) in amber
    ctx.strokeStyle = 'rgba(245, 158, 11, 0.7)';
    ctx.beginPath();
    for (let px = 0; px <= this.width; px += step) {
      const mx = this.screenToMath(px, 0).x;
      const my = this.engine.evalOddPart(mx);
      const sp = this.mathToScreen(mx, my);
      if (px === 0) ctx.moveTo(sp.x, sp.y);
      else ctx.lineTo(sp.x, sp.y);
    }
    ctx.stroke();
    ctx.setLineDash([]);
  }

  // Draw individual harmonic if hovered/inspected
  drawSingleHarmonic() {
    if (this.showHarmonic === null) return;
    const n = this.showHarmonic;
    const ctx = this.ctx;
    const step = 2;

    ctx.strokeStyle = '#eab308';
    ctx.lineWidth = 2.5;
    ctx.setLineDash([4, 2]);
    ctx.beginPath();

    for (let px = 0; px <= this.width; px += step) {
      const mx = this.screenToMath(px, 0).x;
      const my = this.engine.evalHarmonic(mx, n);
      const sp = this.mathToScreen(mx, my);
      if (px === 0) ctx.moveTo(sp.x, sp.y);
      else ctx.lineTo(sp.x, sp.y);
    }
    ctx.stroke();
    ctx.setLineDash([]);
  }

  // Draw Fourier Approximation S_N(x)
  drawFourierCurve() {
    if (!this.showFourier) return;
    const ctx = this.ctx;
    const step = 1.5;

    ctx.save();
    ctx.strokeStyle = this.theme === 'dark' ? '#10b981' : '#059669';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // Glowing effect in dark mode
    if (this.theme === 'dark') {
      ctx.shadowColor = 'rgba(16, 185, 129, 0.4)';
      ctx.shadowBlur = 8;
    }

    ctx.beginPath();
    let started = false;

    for (let px = 0; px <= this.width; px += step) {
      const mx = this.screenToMath(px, 0).x;
      const my = this.engine.evalFourier(mx);
      const sp = this.mathToScreen(mx, my);

      if (!started) {
        ctx.moveTo(sp.x, sp.y);
        started = true;
      } else {
        ctx.lineTo(sp.x, sp.y);
      }
    }
    ctx.stroke();
    ctx.restore();
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

      // Solid Glowing Dirichlet Point S(x) = (f(x+) + f(x-))/2
      ctx.fillStyle = '#10b981';
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(spMid.x, spMid.y, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Dirichlet Tag
      ctx.fillStyle = '#10b981';
      ctx.font = 'bold 11px system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`S(${d.x.toFixed(1)}) = ${d.dirichletMidpoint.toFixed(2)}`, spMid.x, spMid.y - 12);
    }
  }

  // Draw 3Blue1Brown Epicycles animation
  drawEpicycles() {
    if (!this.epicyclesMode) return;
    const ctx = this.ctx;
    const x = this.epicyclesProgress;
    const { circles, finalVal } = this.engine.getEpicyclesAt(x);

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

  // Main Render Frame
  render() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.width, this.height);

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
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = CanvasRenderer;
}
if (typeof window !== 'undefined') {
  window.CanvasRenderer = CanvasRenderer;
}
