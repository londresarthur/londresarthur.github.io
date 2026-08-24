/**
 * App.js
 * Main Controller for the Interactive Fourier Transform & Series Platform.
 * Disciplina: Análise de Fourier / Cálculo Avançado — USP
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Core Engine
  const engine = new FourierEngine({
    L: Math.PI,
    N: 10,
    presetId: 'abs_x'
  });

  // 2. Initialize Canvas Plotters
  const mainCanvas = document.getElementById('mainCanvas');
  const spectrumCanvas = document.getElementById('spectrumCanvas');

  const renderer = new CanvasRenderer(mainCanvas, engine);
  const spectrum = new SpectrumChart(spectrumCanvas, engine, {
    mode: 'coefficients',
    onHarmonicHover: (n) => {
      renderer.showHarmonic = n;
      renderer.render();
    }
  });

  // 3. Initialize Audio Synthesizer
  const audio = new AudioSynth(engine);

  // 4. Animation State
  let nAnimationInterval = null;
  let epicyclesAnimFrame = null;
  let isEpicyclesPlaying = false;

  // 5. DOM Element References
  const presetSelect = document.getElementById('presetSelect');
  const customFormulaInput = document.getElementById('customFormulaInput');
  const compileBtn = document.getElementById('compileBtn');
  const nSlider = document.getElementById('nSlider');
  const nValueBadge = document.getElementById('nValueBadge');
  const animateNBtn = document.getElementById('animateNBtn');
  const modeSelect = document.getElementById('modeSelect');
  const lInput = document.getElementById('lInput');
  const lQuickPi = document.getElementById('lQuickPi');
  const lQuick1 = document.getElementById('lQuick1');
  const lQuick2 = document.getElementById('lQuick2');

  // Display badges & Energy Ledgers
  const origEnergyVal = document.getElementById('origEnergyVal');
  const fourierEnergyVal = document.getElementById('fourierEnergyVal');
  const errorEnergyVal = document.getElementById('errorEnergyVal');
  const energyPercentVal = document.getElementById('energyPercentVal');
  const energyProgressBar = document.getElementById('energyProgressBar');
  const energyProgressRing = document.getElementById('energyProgressRing');
  const latexFormulaBox = document.getElementById('latexFormulaBox');
  const coeffsTableBody = document.getElementById('coeffsTableBody');
  const presetDescBox = document.getElementById('presetDescBox');
  const dirichletNoteBox = document.getElementById('dirichletNoteBox');

  // Control Toggles
  const toggleFourier = document.getElementById('toggleFourier');
  const toggleOriginal = document.getElementById('toggleOriginal');
  const toggleErrorArea = document.getElementById('toggleErrorArea');
  const toggleEvenOdd = document.getElementById('toggleEvenOdd');
  const toggleDirichlet = document.getElementById('toggleDirichlet');
  const toggleEpicycles = document.getElementById('toggleEpicycles');
  const playEpicyclesBtn = document.getElementById('playEpicyclesBtn');
  const resetViewBtn = document.getElementById('resetViewBtn');

  // Audio Controls
  const playAudioBtn = document.getElementById('playAudioBtn');
  const audioFreqSlider = document.getElementById('audioFreqSlider');
  const audioFreqBadge = document.getElementById('audioFreqBadge');
  const audioVolSlider = document.getElementById('audioVolSlider');

  // Spectrum Mode Tabs
  const tabCoeffs = document.getElementById('tabCoeffs');
  const tabEnergyDist = document.getElementById('tabEnergyDist');
  const tabConvergence = document.getElementById('tabConvergence');

  // Export Buttons
  const exportPngBtn = document.getElementById('exportPngBtn');
  const copyLatexBtn = document.getElementById('copyLatexBtn');
  const themeToggleBtn = document.getElementById('themeToggleBtn');

  // Populate Presets in Dropdown
  function populatePresets() {
    const presets = FourierEngine.getPresets();
    presetSelect.innerHTML = '';

    const uspGroup = document.createElement('optgroup');
    uspGroup.label = '📘 Apostilas USP (17/08 & 20/08)';
    const classicGroup = document.createElement('optgroup');
    classicGroup.label = '⚡ Sinais Clássicos & Ondas';
    const appGroup = document.createElement('optgroup');
    appGroup.label = '🔬 Aplicações Físicas & Elétricas';

    presets.forEach(p => {
      const opt = document.createElement('option');
      opt.value = p.id;
      opt.textContent = p.name;
      if (p.category === 'usp_notes') uspGroup.appendChild(opt);
      else if (p.category === 'applications') appGroup.appendChild(opt);
      else classicGroup.appendChild(opt);
    });

    const customGroup = document.createElement('optgroup');
    customGroup.label = '✏️ Customização';
    const customOpt = document.createElement('option');
    customOpt.value = 'custom';
    customOpt.textContent = 'Expressão Customizada...';
    customGroup.appendChild(customOpt);

    presetSelect.appendChild(uspGroup);
    presetSelect.appendChild(classicGroup);
    presetSelect.appendChild(appGroup);
    presetSelect.appendChild(customGroup);
    presetSelect.value = engine.presetId;
  }

  // KaTeX auto-render configuration with inline $ and display $$ delimiters
  const KATEX_OPTIONS = {
    delimiters: [
      { left: '$$', right: '$$', display: true },
      { left: '$', right: '$', display: false },
      { left: '\\(', right: '\\)', display: false },
      { left: '\\[', right: '\\]', display: true }
    ],
    ignoredTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code', 'option', 'input'],
    throwOnError: false
  };

  function autoRenderMath(element = document.body) {
    if (!element) return;
    if (typeof renderMathInElement === 'function') {
      try {
        renderMathInElement(element, KATEX_OPTIONS);
      } catch (err) {
        console.warn('KaTeX auto-render warning:', err);
      }
    }
  }

  // Safe KaTeX renderer helper for single elements
  function renderLatex(element, texStr) {
    if (!element) return;
    if (typeof katex !== 'undefined') {
      try {
        katex.render(texStr, element, {
          throwOnError: false,
          displayMode: true
        });
      } catch (err) {
        element.textContent = texStr;
      }
    } else {
      element.textContent = texStr;
    }
  }

  // Update UI & Calculations
  function updateUI(skipTable = false) {
    engine.computeAll();

    // 1. Update Energy Metrics (Parseval Theorem)
    const { original, fourier, error, percentage } = engine.energy;
    if (origEnergyVal) origEnergyVal.textContent = original.toFixed(5);
    if (fourierEnergyVal) fourierEnergyVal.textContent = fourier.toFixed(5);
    if (errorEnergyVal) errorEnergyVal.textContent = error.toFixed(5);
    if (energyPercentVal) energyPercentVal.textContent = `${percentage.toFixed(2)}%`;

    if (energyProgressBar) {
      energyProgressBar.style.width = `${Math.min(100, Math.max(0, percentage))}%`;
      if (percentage > 99) {
        energyProgressBar.className = 'h-full rounded-full transition-all duration-300 bg-emerald-500 shadow-lg shadow-emerald-500/50';
      } else if (percentage > 90) {
        energyProgressBar.className = 'h-full rounded-full transition-all duration-300 bg-blue-500 shadow-lg shadow-blue-500/50';
      } else {
        energyProgressBar.className = 'h-full rounded-full transition-all duration-300 bg-amber-500 shadow-lg shadow-amber-500/50';
      }
    }

    if (energyProgressRing) {
      const circ = 2 * Math.PI * 36; // r = 36
      const offset = circ - (percentage / 100) * circ;
      energyProgressRing.style.strokeDashoffset = offset;
    }

    // 2. Render LaTeX formula preview for S_N(x)
    if (latexFormulaBox) {
      const latex = engine.toLatex(6);
      renderLatex(latexFormulaBox, latex);
    }

    // 3. Update Preset Notes & Dirichlet Description
    const currentPreset = FourierEngine.getPresets().find(p => p.id === engine.presetId);
    if (presetSelect) {
      presetSelect.value = currentPreset ? engine.presetId : 'custom';
    }

    if (presetDescBox) {
      if (currentPreset) {
        presetDescBox.innerHTML = `
          <div class="font-medium text-cyan-400 mb-1">${currentPreset.name}</div>
          <p class="text-slate-300 text-xs leading-relaxed">${currentPreset.desc}</p>
          <div class="mt-2 text-xs font-mono text-emerald-400 bg-slate-800/80 p-2 rounded border border-slate-700/60">${currentPreset.notes}</div>
        `;
      } else {
        const lStr = Math.abs(engine.L - Math.PI) < 1e-4 ? '\\pi' : engine.L.toFixed(2);
        presetDescBox.innerHTML = `
          <div class="font-medium text-cyan-400 mb-1">Expressão Customizada: $f(x) = ${engine.expression}$</div>
          <p class="text-slate-300 text-xs leading-relaxed">Função compilada dinamicamente e integrada numericamente via Quadratura de Gauss-Legendre.</p>
          <div class="mt-2 text-xs font-mono text-emerald-400 bg-slate-800/80 p-2 rounded border border-slate-700/60">Modo: ${engine.mode} | Intervalo: $[- ${lStr}, ${lStr}]$</div>
        `;
      }
      autoRenderMath(presetDescBox);
    }

    if (dirichletNoteBox) {
      const discs = engine.discontinuities;
      let gibbsHtml = '';
      if (engine.gibbsAnalysis && engine.gibbsAnalysis.length > 0) {
        const overshoot = engine.gibbsAnalysis[0].overshootPercent || 8.95;
        gibbsHtml = `<span class="ml-2 inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30">Gibbs: ~${overshoot.toFixed(1)}%</span>`;
      }

      if (discs.length > 0) {
        dirichletNoteBox.innerHTML = `
          <div class="flex items-center gap-1.5 text-amber-400 font-semibold mb-1 flex-wrap">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <span>Teorema de Dirichlet (Pontos de Salto)</span>
            ${gibbsHtml}
          </div>
          <p class="text-xs text-slate-300 leading-relaxed">
            Detectado(s) <span class="font-bold text-amber-300">${discs.length}</span> ponto(s) de descontinuidade em $[-L, L]$. A Série converge para o ponto médio:
            <span class="block mt-1 font-mono text-emerald-400">$S(x_i) = \\frac{f(x_i^+) + f(x_i^-)}{2}$</span>
          </p>
        `;
      } else {
        dirichletNoteBox.innerHTML = `
          <div class="flex items-center gap-1.5 text-emerald-400 font-semibold mb-1">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <span>Função Contínua</span>
          </div>
          <p class="text-xs text-slate-300 leading-relaxed">
            $f(x)$ é contínua em todo o período. A Série de Fourier converge uniformemente para $f(x)$ sem oscilações de Gibbs.
          </p>
        `;
      }
      autoRenderMath(dirichletNoteBox);
    }

    // 4. Update Harmonic Ledger Table
    if (coeffsTableBody && !skipTable) {
      const { a0, a, b, magnitudes, harmonicEnergies } = engine.coefficients;
      const N = engine.N;
      const origE = engine.energy.original || 1;

      let html = `
        <tr class="border-b border-slate-700/50 hover:bg-slate-800/40 text-xs">
          <td class="py-2 px-2.5 font-bold text-indigo-400">n = 0 (DC)</td>
          <td class="py-2 px-2.5 font-mono text-cyan-300">${a0.toFixed(4)}</td>
          <td class="py-2 px-2.5 font-mono text-slate-400">—</td>
          <td class="py-2 px-2.5 font-mono text-emerald-400">${(Math.abs(a0)/2).toFixed(4)}</td>
          <td class="py-2 px-2.5 font-mono text-amber-300">${((a0*a0)/2).toFixed(4)}</td>
          <td class="py-2 px-2.5 font-mono text-purple-300">${(((a0*a0)/2 / origE) * 100).toFixed(1)}%</td>
        </tr>
      `;

      const limit = Math.min(N, 20);
      for (let n = 1; n <= limit; n++) {
        const e_n = harmonicEnergies[n];
        const pct = (e_n / origE) * 100;
        html += `
          <tr class="border-b border-slate-800/60 hover:bg-slate-800/40 text-xs transition-colors cursor-pointer" data-harmonic="${n}">
            <td class="py-1.5 px-2.5 font-bold text-slate-300">n = ${n}</td>
            <td class="py-1.5 px-2.5 font-mono ${Math.abs(a[n]) > 1e-4 ? 'text-cyan-300' : 'text-slate-500'}">${a[n].toFixed(4)}</td>
            <td class="py-1.5 px-2.5 font-mono ${Math.abs(b[n]) > 1e-4 ? 'text-pink-300' : 'text-slate-500'}">${b[n].toFixed(4)}</td>
            <td class="py-1.5 px-2.5 font-mono text-emerald-400">${magnitudes[n].toFixed(4)}</td>
            <td class="py-1.5 px-2.5 font-mono text-amber-300">${e_n.toFixed(4)}</td>
            <td class="py-1.5 px-2.5 font-mono text-purple-300">${pct.toFixed(2)}%</td>
          </tr>
        `;
      }

      if (N > 20) {
        html += `<tr><td colspan="6" class="text-center py-2 text-slate-500 text-xs italic">+ ${N - 20} harmônicos adicionais computados...</td></tr>`;
      }

      coeffsTableBody.innerHTML = html;

      // Table row hover listeners
      coeffsTableBody.querySelectorAll('tr[data-harmonic]').forEach(tr => {
        const hN = parseInt(tr.getAttribute('data-harmonic'), 10);
        tr.addEventListener('mouseenter', () => {
          renderer.showHarmonic = hN;
          renderer.render();
          spectrum.hoveredHarmonic = hN;
          spectrum.render();
        });
        tr.addEventListener('mouseleave', () => {
          renderer.showHarmonic = null;
          renderer.render();
          spectrum.hoveredHarmonic = null;
          spectrum.render();
        });
      });
    }

    // 5. Audio waveform update
    audio.updateWaveform();

    // 6. Redraw Visualizers
    renderer.render();
    spectrum.render();
  }

  // --- Event Listeners & Controls ---

  // Preset Selection
  populatePresets();
  presetSelect.addEventListener('change', (e) => {
    if (e.target.value === 'custom') {
      customFormulaInput.focus();
      return;
    }
    engine.setPreset(e.target.value);
    customFormulaInput.value = engine.expression;
    if (modeSelect) modeSelect.value = engine.mode;
    if (lInput) lInput.value = Math.abs(engine.L - Math.PI) < 1e-4 ? 'π' : engine.L.toString();
    updateUI();
    renderer.autoFit();
  });

  // Custom Formula Compilation
  function applyCustomFormula() {
    const expr = customFormulaInput.value.trim();
    if (expr) {
      engine.compileExpression(expr);
      updateUI();
      renderer.autoFit();
    }
  }

  compileBtn.addEventListener('click', applyCustomFormula);
  customFormulaInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      applyCustomFormula();
    }
  });

  // Quick Formula Buttons
  document.querySelectorAll('.quick-formula-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const formula = btn.getAttribute('data-formula');
      customFormulaInput.value = formula;
      engine.compileExpression(formula);
      updateUI();
      renderer.autoFit();
    });
  });

  // N Harmonics Slider & Range Bounds
  const nMinInput = document.getElementById('nMinInput');
  const nMaxInput = document.getElementById('nMaxInput');
  const autoFitBtn = document.getElementById('autoFitBtn');

  function syncSliderBounds() {
    const minVal = Math.max(0, parseInt(nMinInput?.value || '0', 10));
    const maxVal = Math.max(minVal + 1, parseInt(nMaxInput?.value || '10', 10));
    nSlider.min = minVal;
    nSlider.max = maxVal;

    // Update dynamic tick markers
    const tickMin = document.getElementById('sliderTickMin');
    const tickMid1 = document.getElementById('sliderTickMid1');
    const tickMid2 = document.getElementById('sliderTickMid2');
    const tickMid3 = document.getElementById('sliderTickMid3');
    const tickMax = document.getElementById('sliderTickMax');

    const span = maxVal - minVal;
    if (tickMin) tickMin.textContent = `N = ${minVal}`;
    if (tickMid1) tickMid1.textContent = `N = ${Math.round(minVal + span * 0.25)}`;
    if (tickMid2) tickMid2.textContent = `N = ${Math.round(minVal + span * 0.50)}`;
    if (tickMid3) tickMid3.textContent = `N = ${Math.round(minVal + span * 0.75)}`;
    if (tickMax) tickMax.textContent = `N = ${maxVal}`;
  }

  if (nMinInput) nMinInput.addEventListener('input', syncSliderBounds);
  if (nMaxInput) nMaxInput.addEventListener('input', syncSliderBounds);
  syncSliderBounds();

  nSlider.addEventListener('input', (e) => {
    const val = parseInt(e.target.value, 10);
    engine.N = val;
    nValueBadge.textContent = val;
    updateUI();
  });

  // AutoFit Button
  if (autoFitBtn) {
    autoFitBtn.addEventListener('click', () => {
      renderer.autoFit();
    });
  }

  // Animate N Button with Dynamic Bounds
  animateNBtn.addEventListener('click', () => {
    if (nAnimationInterval) {
      clearInterval(nAnimationInterval);
      nAnimationInterval = null;
      animateNBtn.innerHTML = `
        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        <span>Animar N</span>
      `;
      animateNBtn.classList.remove('bg-rose-600', 'hover:bg-rose-500');
      animateNBtn.classList.add('bg-indigo-600', 'hover:bg-indigo-500');
      updateUI(false);
    } else {
      const minVal = Math.max(0, parseInt(nMinInput?.value || '0', 10));
      const maxVal = Math.max(minVal + 1, parseInt(nMaxInput?.value || '10', 10));

      let currentN = Math.max(minVal, engine.N);
      if (currentN >= maxVal) currentN = minVal;

      engine.N = currentN;
      nSlider.value = currentN;
      nValueBadge.textContent = currentN;
      updateUI();

      animateNBtn.innerHTML = `
        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        <span>Pausar</span>
      `;
      animateNBtn.classList.remove('bg-indigo-600', 'hover:bg-indigo-500');
      animateNBtn.classList.add('bg-rose-600', 'hover:bg-rose-500');

      nAnimationInterval = setInterval(() => {
        const curMin = Math.max(0, parseInt(nMinInput?.value || '0', 10));
        const curMax = Math.max(curMin + 1, parseInt(nMaxInput?.value || '10', 10));

        currentN++;
        if (currentN > curMax) currentN = curMin;
        engine.N = currentN;
        nSlider.value = currentN;
        nValueBadge.textContent = currentN;
        updateUI(true);
      }, 120);
    }
  });

  // Half-Range Extension / Mode Selector
  modeSelect.addEventListener('change', (e) => {
    engine.mode = e.target.value;
    updateUI();
    renderer.autoFit();
  });

  // Interval L Controls
  function setL(val) {
    if (val === 'pi' || val === 'π') {
      engine.L = Math.PI;
      lInput.value = 'π';
    } else {
      const num = parseFloat(val);
      if (!isNaN(num) && num > 0) {
        engine.L = num;
        lInput.value = num.toString();
      }
    }
    updateUI();
    renderer.autoFit();
  }

  lInput.addEventListener('change', (e) => setL(e.target.value));
  if (lQuickPi) lQuickPi.addEventListener('click', () => setL('pi'));
  if (lQuick1) lQuick1.addEventListener('click', () => setL(1));
  if (lQuick2) lQuick2.addEventListener('click', () => setL(2));

  // Toggles
  toggleFourier.addEventListener('change', (e) => {
    renderer.showFourier = e.target.checked;
    renderer.render();
  });
  toggleOriginal.addEventListener('change', (e) => {
    renderer.showOriginal = e.target.checked;
    renderer.render();
  });
  toggleErrorArea.addEventListener('change', (e) => {
    renderer.showErrorArea = e.target.checked;
    renderer.render();
  });
  toggleEvenOdd.addEventListener('change', (e) => {
    renderer.showEvenOdd = e.target.checked;
    renderer.render();
  });
  toggleDirichlet.addEventListener('change', (e) => {
    renderer.showDirichletPoints = e.target.checked;
    renderer.render();
  });

  // 3Blue1Brown Epicycles Phasor Mode
  function stepEpicycles() {
    if (!isEpicyclesPlaying) return;
    renderer.epicyclesProgress += (2 * engine.L) / 360;
    if (renderer.epicyclesProgress > engine.L) {
      renderer.epicyclesProgress = -engine.L;
    }
    renderer.render();
    epicyclesAnimFrame = requestAnimationFrame(stepEpicycles);
  }

  toggleEpicycles.addEventListener('change', (e) => {
    renderer.epicyclesMode = e.target.checked;
    if (renderer.epicyclesMode && !isEpicyclesPlaying) {
      isEpicyclesPlaying = true;
      stepEpicycles();
    } else if (!renderer.epicyclesMode && isEpicyclesPlaying) {
      isEpicyclesPlaying = false;
      cancelAnimationFrame(epicyclesAnimFrame);
    }
    renderer.render();
  });

  if (playEpicyclesBtn) {
    playEpicyclesBtn.addEventListener('click', () => {
      toggleEpicycles.checked = !toggleEpicycles.checked;
      toggleEpicycles.dispatchEvent(new Event('change'));
    });
  }

  resetViewBtn.addEventListener('click', () => renderer.resetView());

  // Audio Synthesizer Controls
  playAudioBtn.addEventListener('click', () => {
    const isPlaying = audio.toggle();
    if (isPlaying) {
      playAudioBtn.innerHTML = `
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path></svg>
        <span>Silenciar Som</span>
      `;
      playAudioBtn.classList.remove('bg-slate-700', 'hover:bg-slate-600');
      playAudioBtn.classList.add('bg-emerald-600', 'hover:bg-emerald-500', 'animate-pulse');
    } else {
      playAudioBtn.innerHTML = `
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        <span>Ouvir Fourier (Áudio)</span>
      `;
      playAudioBtn.classList.remove('bg-emerald-600', 'hover:bg-emerald-500', 'animate-pulse');
      playAudioBtn.classList.add('bg-slate-700', 'hover:bg-slate-600');
    }
  });

  audioFreqSlider.addEventListener('input', (e) => {
    const freq = parseInt(e.target.value, 10);
    audio.setFrequency(freq);
    audioFreqBadge.textContent = `${freq} Hz`;
  });

  audioVolSlider.addEventListener('input', (e) => {
    const vol = parseFloat(e.target.value);
    audio.setVolume(vol);
  });

  // Spectrum Tabs
  function setSpectrumTab(activeTab, mode) {
    [tabCoeffs, tabEnergyDist, tabConvergence].forEach(t => {
      t.className = 'px-3 py-1.5 text-xs font-semibold rounded-lg text-slate-400 hover:text-slate-200 transition-colors';
    });
    activeTab.className = 'px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-600 text-white shadow';
    spectrum.setMode(mode);
  }

  tabCoeffs.addEventListener('click', () => setSpectrumTab(tabCoeffs, 'coefficients'));
  tabEnergyDist.addEventListener('click', () => setSpectrumTab(tabEnergyDist, 'energy_dist'));
  tabConvergence.addEventListener('click', () => setSpectrumTab(tabConvergence, 'convergence'));

  // Export High-Res PNG
  if (exportPngBtn) {
    exportPngBtn.addEventListener('click', () => {
      renderer.exportPNG();
    });
  }

  // --- Central de Exportação Acadêmica & Kit Didático (.zip) ---
  const exportModal = document.getElementById('exportModal');
  const openExportModalBtn = document.getElementById('openExportModalBtn');
  const modalExportSvgBtn = document.getElementById('modalExportSvgBtn');
  const modalExportPngBtn = document.getElementById('modalExportPngBtn');
  const modalCopyTikzBtn = document.getElementById('modalCopyTikzBtn');
  const modalExportCsvBtn = document.getElementById('modalExportCsvBtn');
  const modalCopyLatexTableBtn = document.getElementById('modalCopyLatexTableBtn');
  const modalExportPythonBtn = document.getElementById('modalExportPythonBtn');
  const modalExportWavBtn = document.getElementById('modalExportWavBtn');
  const modalDownloadKitZipBtn = document.getElementById('modalDownloadKitZipBtn');

  // Quick Action Buttons on main panel
  const quickDownloadKitZipBtn = document.getElementById('quickDownloadKitZipBtn');
  const quickExportSvgBtn = document.getElementById('quickExportSvgBtn');
  const quickExportPngBtn = document.getElementById('quickExportPngBtn');
  const quickCopyTikzBtn = document.getElementById('quickCopyTikzBtn');
  const quickExportCsvBtn = document.getElementById('quickExportCsvBtn');
  const quickCopyLatexBtn = document.getElementById('quickCopyLatexBtn');
  const quickExportPythonBtn = document.getElementById('quickExportPythonBtn');
  const quickExportWavBtn = document.getElementById('quickExportWavBtn');

  if (openExportModalBtn && exportModal) {
    openExportModalBtn.addEventListener('click', () => {
      exportModal.classList.remove('hidden');
    });
  }

  // 0. Master ZIP Kit Downloader (With ABRA-ME.txt)
  function handleDownloadKitZip(btn) {
    if (!btn) return;
    const orig = btn.innerHTML;
    btn.innerHTML = `<span class="animate-pulse">⏳ Gerando Pacote ZIP...</span>`;
    renderer.downloadFullKitZip(audio).finally(() => {
      setTimeout(() => btn.innerHTML = orig, 1500);
    });
  }

  if (quickDownloadKitZipBtn) {
    quickDownloadKitZipBtn.addEventListener('click', () => handleDownloadKitZip(quickDownloadKitZipBtn));
  }
  if (modalDownloadKitZipBtn) {
    modalDownloadKitZipBtn.addEventListener('click', () => handleDownloadKitZip(modalDownloadKitZipBtn));
  }

  // 1. Export SVG
  if (modalExportSvgBtn) modalExportSvgBtn.addEventListener('click', () => renderer.exportSVG());
  if (quickExportSvgBtn) quickExportSvgBtn.addEventListener('click', () => renderer.exportSVG());

  // 2. Export PNG
  if (modalExportPngBtn) modalExportPngBtn.addEventListener('click', () => renderer.exportPNG());
  if (quickExportPngBtn) quickExportPngBtn.addEventListener('click', () => renderer.exportPNG());

  // 3. Copy TikZ / PGFPlots Code
  function handleCopyTikz(btn) {
    if (!btn) return;
    const code = renderer.generateTikZ();
    navigator.clipboard.writeText(code).then(() => {
      const orig = btn.innerHTML;
      btn.innerHTML = `<span>✓ Copiado!</span>`;
      setTimeout(() => btn.innerHTML = orig, 2000);
    });
  }

  if (modalCopyTikzBtn) modalCopyTikzBtn.addEventListener('click', () => handleCopyTikz(modalCopyTikzBtn));
  if (quickCopyTikzBtn) quickCopyTikzBtn.addEventListener('click', () => handleCopyTikz(quickCopyTikzBtn));

  // 4. Export CSV Spreadsheet
  if (modalExportCsvBtn) modalExportCsvBtn.addEventListener('click', () => renderer.exportCSV());
  if (quickExportCsvBtn) quickExportCsvBtn.addEventListener('click', () => renderer.exportCSV());

  // 5. Copy LaTeX Table Code
  function handleCopyLatexTable(btn) {
    if (!btn) return;
    const code = renderer.generateLatexTable();
    navigator.clipboard.writeText(code).then(() => {
      const orig = btn.innerHTML;
      btn.innerHTML = `<span>✓ Copiado!</span>`;
      setTimeout(() => btn.innerHTML = orig, 2000);
    });
  }

  if (modalCopyLatexTableBtn) modalCopyLatexTableBtn.addEventListener('click', () => handleCopyLatexTable(modalCopyLatexTableBtn));
  if (quickCopyLatexBtn) quickCopyLatexBtn.addEventListener('click', () => handleCopyLatexTable(quickCopyLatexBtn));

  // 6. Export Python Standalone Script
  function handleExportPython() {
    const code = renderer.generatePythonScript();
    const blob = new Blob([code], { type: 'text/x-python;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fourier_script_N${engine.N}_${engine.presetId || 'custom'}.py`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  if (modalExportPythonBtn) modalExportPythonBtn.addEventListener('click', handleExportPython);
  if (quickExportPythonBtn) quickExportPythonBtn.addEventListener('click', handleExportPython);

  // 7. Export WAV Audio Synthesizer
  if (modalExportWavBtn) modalExportWavBtn.addEventListener('click', () => audio.exportWav(2.5, 220));
  if (quickExportWavBtn) quickExportWavBtn.addEventListener('click', () => audio.exportWav(2.5, 220));

  // Copy LaTeX code
  const copyLatexOriginalHTML = copyLatexBtn.innerHTML; // store ONCE
  let copyLatexTimeout = null;
  copyLatexBtn.addEventListener('click', () => {
    const latex = engine.toLatex(12);
    navigator.clipboard.writeText(latex).then(() => {
      copyLatexBtn.innerHTML = `<span>Copiado! ✓</span>`;
      if (copyLatexTimeout) clearTimeout(copyLatexTimeout);
      copyLatexTimeout = setTimeout(() => {
        copyLatexBtn.innerHTML = copyLatexOriginalHTML;
      }, 2000);
    });
  });

  // Theme Toggle
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const isDark = renderer.theme === 'dark';
      renderer.theme = isDark ? 'light' : 'dark';
      spectrum.theme = renderer.theme;
      document.documentElement.classList.toggle('light-theme', !isDark);
      renderer.render();
      spectrum.render();
    });
  }

  // Handle Window Resize
  window.addEventListener('resize', () => {
    renderer.resize();
    spectrum.resize();
  });

  // Initial Render Trigger
  customFormulaInput.value = engine.expression;
  nSlider.value = engine.N;
  nValueBadge.textContent = engine.N;
  updateUI();

  // Full page initial KaTeX render (with retry until KaTeX script is ready)
  function initFullPageMath() {
    if (typeof renderMathInElement === 'function') {
      autoRenderMath(document.body);
    } else {
      setTimeout(initFullPageMath, 50);
    }
  }
  initFullPageMath();
});
