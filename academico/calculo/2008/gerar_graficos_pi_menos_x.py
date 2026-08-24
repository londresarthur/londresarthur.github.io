#!/usr/bin/env python3
"""
Gerador de gráficos vetoriais SVG de alta precisão para a apostila f(x) = pi - x.
100% livre de emojis e fontes proprietárias que causam artefatos visuais.
"""

import math
from pathlib import Path

OUTPUT_DIR = Path("calculo/2008/assets")
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)


def gerar_grafico_extensao_impar():
    """Gera gráfico da Extensão Ímpar de f(x) = pi - x e aproximações de Fourier em Senos."""
    x_origin = 400
    y_origin = 230
    scale_x = 90
    scale_y = 50

    def s_sen(x, n_max):
        val = 0.0
        for n in range(1, n_max + 1):
            val += (2.0 / n) * math.sin(n * x)
        return val

    num_pts = 600
    x_min, x_max = -math.pi, math.pi

    def get_path(func):
        pts = []
        for i in range(num_pts + 1):
            x = x_min + (x_max - x_min) * (i / num_pts)
            y = func(x)
            px = x_origin + x * scale_x
            py = y_origin - y * scale_y
            pts.append(f"{px:.1f},{py:.1f}")
        return "M " + " L ".join(pts)

    path_s1 = get_path(lambda x: s_sen(x, 1))
    path_s3 = get_path(lambda x: s_sen(x, 3))
    path_s15 = get_path(lambda x: s_sen(x, 15))

    pi_px = math.pi * scale_x
    pi_py = math.pi * scale_y

    svg = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 460" width="100%" height="100%">
  <defs>
    <style>
      .bg {{ fill: #0d1117; stroke: #30363d; stroke-width: 1; }}
      .grid {{ stroke: #21262d; stroke-width: 1; stroke-dasharray: 4,4; }}
      .axis {{ stroke: #8b949e; stroke-width: 2; marker-end: url(#arrow-imp); }}
      .s1 {{ stroke: #79c0ff; stroke-width: 1.8; fill: none; stroke-dasharray: 4,4; }}
      .s3 {{ stroke: #e3b341; stroke-width: 2; fill: none; }}
      .s15 {{ stroke: #7ee787; stroke-width: 2.2; fill: none; }}
      .f-real {{ stroke: #ffffff; stroke-width: 3.5; fill: none; }}
      .text-main {{ font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif; font-size: 13px; fill: #c9d1d9; }}
      .text-title {{ font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif; font-size: 15px; font-weight: 600; fill: #79c0ff; }}
      .text-math {{ font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif; font-style: italic; font-size: 14px; fill: #c9d1d9; }}
      .point-open {{ fill: #0d1117; stroke: #ffffff; stroke-width: 2.5; }}
      .point-mid {{ fill: #f0883e; stroke: #ffffff; stroke-width: 2.5; }}
    </style>
    <marker id="arrow-imp" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#8b949e" />
    </marker>
  </defs>

  <rect width="800" height="460" rx="8" class="bg"/>

  <text x="40" y="38" class="text-title">Extensao Impar de f(x) = pi - x em [-pi, pi] e Serie em Senos S(x) = 2 sum (sin(nx)/n)</text>

  <!-- Grade -->
  <line x1="{x_origin - pi_px:.1f}" y1="60" x2="{x_origin - pi_px:.1f}" y2="400" class="grid"/>
  <line x1="{x_origin}" y1="60" x2="{x_origin}" y2="400" class="grid"/>
  <line x1="{x_origin + pi_px:.1f}" y1="60" x2="{x_origin + pi_px:.1f}" y2="400" class="grid"/>
  <line x1="80" y1="{y_origin - pi_py:.1f}" x2="720" y2="{y_origin - pi_py:.1f}" class="grid"/>
  <line x1="80" y1="{y_origin + pi_py:.1f}" x2="720" y2="{y_origin + pi_py:.1f}" class="grid"/>

  <!-- Eixos -->
  <line x1="70" y1="{y_origin}" x2="740" y2="{y_origin}" class="axis"/>
  <text x="745" y="{y_origin + 5}" class="text-math">x</text>

  <line x1="{x_origin}" y1="410" x2="{x_origin}" y2="55" class="axis"/>
  <text x="{x_origin - 20}" y="50" class="text-math">y</text>

  <!-- Linhas da Funcao Real f_imp(x) -->
  <line x1="{x_origin - pi_px:.1f}" y1="{y_origin}" x2="{x_origin}" y2="{y_origin + pi_py:.1f}" class="f-real"/>
  <line x1="{x_origin}" y1="{y_origin - pi_py:.1f}" x2="{x_origin + pi_px:.1f}" y2="{y_origin}" class="f-real"/>

  <!-- Curvas de Fourier -->
  <path d="{path_s1}" class="s1"/>
  <path d="{path_s3}" class="s3"/>
  <path d="{path_s15}" class="s15"/>

  <!-- Pontos Abertos nos Limites -->
  <circle cx="{x_origin}" cy="{y_origin - pi_py:.1f}" r="4.5" class="point-open"/>
  <circle cx="{x_origin}" cy="{y_origin + pi_py:.1f}" r="4.5" class="point-open"/>
  <circle cx="{x_origin - pi_px:.1f}" cy="{y_origin}" r="4.5" class="point-open"/>
  <circle cx="{x_origin + pi_px:.1f}" cy="{y_origin}" r="4.5" class="point-open"/>

  <!-- Pontos Medios de Dirichlet no Salto (S(0) = 0, S(+-pi) = 0) -->
  <circle cx="{x_origin}" cy="{y_origin}" r="5.5" class="point-mid"/>
  <circle cx="{x_origin - pi_px:.1f}" cy="{y_origin}" r="5.5" class="point-mid"/>
  <circle cx="{x_origin + pi_px:.1f}" cy="{y_origin}" r="5.5" class="point-mid"/>

  <!-- Rotulos -->
  <text x="{x_origin - pi_px - 15:.1f}" y="{y_origin + 22}" class="text-math">-pi</text>
  <text x="{x_origin - 12}" y="{y_origin + 22}" class="text-math">0</text>
  <text x="{x_origin + pi_px - 5:.1f}" y="{y_origin + 22}" class="text-math">+pi</text>
  <text x="{x_origin + 10}" y="{y_origin - pi_py + 5:.1f}" class="text-math">+pi</text>
  <text x="{x_origin + 10}" y="{y_origin + pi_py + 5:.1f}" class="text-math">-pi</text>

  <!-- Legenda -->
  <rect x="525" y="65" width="240" height="135" rx="6" fill="#161b22" stroke="#30363d" stroke-width="1.5"/>
  <text x="540" y="90" class="text-main" font-weight="bold">Legenda de Convergencia:</text>
  <line x1="540" y1="108" x2="570" y2="108" stroke="#ffffff" stroke-width="3"/>
  <text x="580" y="113" class="text-main">f_imp(x) (Onda Dente-Serra)</text>

  <line x1="540" y1="130" x2="570" y2="130" stroke="#79c0ff" stroke-width="2" stroke-dasharray="4,4"/>
  <text x="580" y="135" class="text-main">S_1(x) = 2 sin(x)</text>

  <line x1="540" y1="152" x2="570" y2="152" stroke="#e3b341" stroke-width="2"/>
  <text x="580" y="157" class="text-main">S_3(x) (3 harmonicos)</text>

  <line x1="540" y1="174" x2="570" y2="174" stroke="#7ee787" stroke-width="2.5"/>
  <text x="580" y="179" class="text-main">S_15(x) (15 harmonicos)</text>
</svg>
"""
    with open(OUTPUT_DIR / "grafico_fourier_extensao_impar_senos.svg", "w", encoding="utf-8") as f:
        f.write(svg.strip())


def gerar_grafico_extensao_par():
    """Gera gráfico da Extensão Par f_par(x) = pi - |x| e aproximações de Fourier em Cossenos."""
    x_origin = 400
    y_origin = 350
    scale_x = 90
    scale_y = 75

    def s_cos(x, k_max):
        val = math.pi / 2.0
        for k in range(1, k_max + 1):
            n = 2 * k - 1
            val += (4.0 / (math.pi * n * n)) * math.cos(n * x)
        return val

    num_pts = 600
    x_min, x_max = -math.pi, math.pi

    def get_path(func):
        pts = []
        for i in range(num_pts + 1):
            x = x_min + (x_max - x_min) * (i / num_pts)
            y = func(x)
            px = x_origin + x * scale_x
            py = y_origin - y * scale_y
            pts.append(f"{px:.1f},{py:.1f}")
        return "M " + " L ".join(pts)

    path_s1 = get_path(lambda x: s_cos(x, 1))
    path_s2 = get_path(lambda x: s_cos(x, 2))
    path_s5 = get_path(lambda x: s_cos(x, 5))

    pi_px = math.pi * scale_x
    pi_py = math.pi * scale_y

    svg = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 460" width="100%" height="100%">
  <defs>
    <style>
      .bg {{ fill: #0d1117; stroke: #30363d; stroke-width: 1; }}
      .grid {{ stroke: #21262d; stroke-width: 1; stroke-dasharray: 4,4; }}
      .axis {{ stroke: #8b949e; stroke-width: 2; marker-end: url(#arrow-par); }}
      .s1 {{ stroke: #79c0ff; stroke-width: 1.8; fill: none; stroke-dasharray: 4,4; }}
      .s2 {{ stroke: #e3b341; stroke-width: 2; fill: none; }}
      .s5 {{ stroke: #7ee787; stroke-width: 2.2; fill: none; }}
      .f-real {{ stroke: #ffffff; stroke-width: 3.5; fill: none; }}
      .text-main {{ font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif; font-size: 13px; fill: #c9d1d9; }}
      .text-title {{ font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif; font-size: 15px; font-weight: 600; fill: #e3b341; }}
      .text-math {{ font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif; font-style: italic; font-size: 14px; fill: #c9d1d9; }}
    </style>
    <marker id="arrow-par" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#8b949e" />
    </marker>
  </defs>

  <rect width="800" height="460" rx="8" class="bg"/>

  <text x="40" y="38" class="text-title">Extensao Par f(x) = pi - |x| e Serie em Cossenos (Onda Triangular Continua)</text>

  <!-- Grade -->
  <line x1="{x_origin - pi_px:.1f}" y1="80" x2="{x_origin - pi_px:.1f}" y2="370" class="grid"/>
  <line x1="{x_origin}" y1="80" x2="{x_origin}" y2="370" class="grid"/>
  <line x1="{x_origin + pi_px:.1f}" y1="80" x2="{x_origin + pi_px:.1f}" y2="370" class="grid"/>
  <line x1="80" y1="{y_origin - pi_py:.1f}" x2="720" y2="{y_origin - pi_py:.1f}" class="grid"/>
  <line x1="80" y1="{y_origin - 0.5*pi_py:.1f}" x2="720" y2="{y_origin - 0.5*pi_py:.1f}" class="grid"/>

  <!-- Eixos -->
  <line x1="70" y1="{y_origin}" x2="740" y2="{y_origin}" class="axis"/>
  <text x="745" y="{y_origin + 5}" class="text-math">x</text>

  <line x1="{x_origin}" y1="380" x2="{x_origin}" y2="60" class="axis"/>
  <text x="{x_origin - 20}" y="55" class="text-math">y</text>

  <!-- Funcao Real Triangular -->
  <polyline points="{x_origin - pi_px:.1f},{y_origin} {x_origin},{y_origin - pi_py:.1f} {x_origin + pi_px:.1f},{y_origin}" class="f-real"/>

  <!-- Curvas de Fourier -->
  <path d="{path_s1}" class="s1"/>
  <path d="{path_s2}" class="s2"/>
  <path d="{path_s5}" class="s5"/>

  <!-- Rotulos -->
  <text x="{x_origin - pi_px - 15:.1f}" y="{y_origin + 22}" class="text-math">-pi</text>
  <text x="{x_origin - 8}" y="{y_origin + 22}" class="text-math">0</text>
  <text x="{x_origin + pi_px - 5:.1f}" y="{y_origin + 22}" class="text-math">+pi</text>
  <text x="{x_origin - 35}" y="{y_origin - pi_py + 5:.1f}" class="text-math">pi</text>
  <text x="{x_origin - 45}" y="{y_origin - 0.5*pi_py + 5:.1f}" class="text-math">pi/2 (a_0/2)</text>

  <!-- Legenda -->
  <rect x="525" y="80" width="240" height="135" rx="6" fill="#161b22" stroke="#30363d" stroke-width="1.5"/>
  <text x="540" y="105" class="text-main" font-weight="bold">Legenda (Decaimento 1/n^2):</text>
  <line x1="540" y1="123" x2="570" y2="123" stroke="#ffffff" stroke-width="3"/>
  <text x="580" y="128" class="text-main">f_par(x) = pi - |x|</text>

  <line x1="540" y1="145" x2="570" y2="145" stroke="#79c0ff" stroke-width="2" stroke-dasharray="4,4"/>
  <text x="580" y="150" class="text-main">S_1(x) (1 harmonico)</text>

  <line x1="540" y1="167" x2="570" y2="167" stroke="#e3b341" stroke-width="2"/>
  <text x="580" y="172" class="text-main">S_3(x) (2 harmonicos)</text>

  <line x1="540" y1="189" x2="570" y2="189" stroke="#7ee787" stroke-width="2.5"/>
  <text x="580" y="194" class="text-main">S_9(x) (5 harmonicos)</text>
</svg>
"""
    with open(OUTPUT_DIR / "grafico_fourier_extensao_par_cossenos.svg", "w", encoding="utf-8") as f:
        f.write(svg.strip())


def gerar_grafico_espectro_transformada():
    """Gera o gráfico do Espectro Contínuo da Transformada de Fourier |f^(omega)| vs Harmônicos Discretos."""
    x_origin = 400
    y_origin = 340
    scale_w = 45
    scale_mag = 40

    def f_hat_mag(w):
        if abs(w) < 1e-5:
            return math.pi * math.pi / 2.0
        re = (math.cos(math.pi * w) - 1.0) / (w * w)
        im = (-math.pi * w - math.sin(math.pi * w)) / (w * w)
        return math.sqrt(re * re + im * im)

    num_pts = 600
    w_min, w_max = -7.0, 7.0

    points = []
    for i in range(num_pts + 1):
        w = w_min + (w_max - w_min) * (i / num_pts)
        mag = f_hat_mag(w)
        px = x_origin + w * scale_w
        py = y_origin - mag * scale_mag
        points.append(f"{px:.1f},{py:.1f}")

    path_spec = "M " + " L ".join(points)

    stem_lines = []
    for n in range(-6, 7):
        if n == 0:
            continue
        mag = f_hat_mag(n)
        px = x_origin + n * scale_w
        py = y_origin - mag * scale_mag
        stem_lines.append(f'<line x1="{px:.1f}" y1="{y_origin}" x2="{px:.1f}" y2="{py:.1f}" stroke="#e3b341" stroke-width="2.5"/>')
        stem_lines.append(f'<circle cx="{px:.1f}" cy="{py:.1f}" r="4.5" fill="#e3b341" stroke="#ffffff" stroke-width="1.5"/>')

    stems_svg = "\n  ".join(stem_lines)

    svg = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 440" width="100%" height="100%">
  <defs>
    <style>
      .bg {{ fill: #0d1117; stroke: #30363d; stroke-width: 1; }}
      .grid {{ stroke: #21262d; stroke-width: 1; stroke-dasharray: 4,4; }}
      .axis {{ stroke: #8b949e; stroke-width: 2; marker-end: url(#arrow-spec); }}
      .spec-curve {{ stroke: #bc8cff; stroke-width: 2.8; fill: none; }}
      .text-main {{ font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif; font-size: 13px; fill: #c9d1d9; }}
      .text-title {{ font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif; font-size: 15px; font-weight: 600; fill: #bc8cff; }}
      .text-math {{ font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif; font-style: italic; font-size: 14px; fill: #d2a8ff; }}
      .text-highlight {{ font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif; font-size: 13px; font-weight: 600; fill: #e3b341; }}
    </style>
    <marker id="arrow-spec" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#8b949e" />
    </marker>
  </defs>

  <rect width="800" height="440" rx="8" class="bg"/>

  <text x="40" y="38" class="text-title">Espectro da Transformada Continua |f^(w)| vs Coeficientes Discretos de Fourier</text>

  <!-- Grade -->
  <line x1="80" y1="340" x2="740" y2="340" class="grid"/>
  <line x1="400" y1="60" x2="400" y2="380" class="grid"/>

  <!-- Eixos -->
  <line x1="70" y1="{y_origin}" x2="740" y2="{y_origin}" class="axis"/>
  <text x="745" y="{y_origin + 5}" class="text-math">w</text>

  <line x1="{x_origin}" y1="380" x2="{x_origin}" y2="60" class="axis"/>
  <text x="{x_origin - 25}" y="55" class="text-math">|f^(w)|</text>

  <!-- Curva Continua da Transformada -->
  <path d="{path_spec}" class="spec-curve"/>

  <!-- Amostras Discretas -->
  {stems_svg}

  <!-- Rotulos no Eixo w -->
  <text x="{x_origin - 4*scale_w - 8}" y="{y_origin + 22}" class="text-math">-4</text>
  <text x="{x_origin - 2*scale_w - 8}" y="{y_origin + 22}" class="text-math">-2</text>
  <text x="{x_origin - 8}" y="{y_origin + 22}" class="text-math">0</text>
  <text x="{x_origin + 2*scale_w - 8}" y="{y_origin + 22}" class="text-math">+2</text>
  <text x="{x_origin + 4*scale_w - 8}" y="{y_origin + 22}" class="text-math">+4</text>

  <!-- Card Explicativo -->
  <rect x="490" y="70" width="280" height="135" rx="6" fill="#161b22" stroke="#30363d" stroke-width="1.5"/>
  <text x="505" y="95" class="text-main" font-weight="bold">Ponte Espectral Continuo/Discreto:</text>
  <line x1="505" y1="113" x2="535" y2="113" stroke="#bc8cff" stroke-width="2.5"/>
  <text x="545" y="118" class="text-main">Transformada Continua |f^(w)|</text>
  <circle cx="520" cy="138" r="4.5" fill="#e3b341"/>
  <text x="545" y="143" class="text-highlight">Harmonicos Discretos (w = n)</text>
  <text x="505" y="170" class="text-main" font-size="12">• Coeficientes discretos amostram a</text>
  <text x="515" y="188" class="text-main" font-size="12">Transformada na frequencia w = n</text>
</svg>
"""
    with open(OUTPUT_DIR / "grafico_transformada_espectro_continuo.svg", "w", encoding="utf-8") as f:
        f.write(svg.strip())


if __name__ == "__main__":
    gerar_grafico_extensao_impar()
    gerar_grafico_extensao_par()
    gerar_grafico_espectro_transformada()
    print("Graficos SVG gerados com sucesso para f(x) = pi - x em calculo/2008/assets/")
