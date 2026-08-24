#!/usr/bin/env python3
"""
Gerador de gráficos vetoriais SVG de alta precisão matemática para o Teorema de Dirichlet.
Gera ilustrações limpas, responsivas e compatíveis com o GitHub Docs (Dark/Light mode).
100% livre de emojis e fontes proprietárias que causam artefatos visuais.
"""

import math
from pathlib import Path

OUTPUT_DIR = Path("calculo/2008/assets")
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)


def gerar_grafico_salto_dirichlet():
    """Gera o diagrama geométrico da descontinuidade de salto e o ponto médio S(x_i)."""
    svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="100%" height="100%">
  <defs>
    <style>
      .bg { fill: #0d1117; stroke: #30363d; stroke-width: 1; }
      .grid { stroke: #21262d; stroke-width: 1; stroke-dasharray: 4,4; }
      .axis { stroke: #8b949e; stroke-width: 2; marker-end: url(#arrow); }
      .curve { stroke: #58a6ff; stroke-width: 3.5; fill: none; stroke-linecap: round; }
      .midpoint-line { stroke: #f0883e; stroke-width: 2; stroke-dasharray: 6,4; }
      .text-main { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif; font-size: 14px; fill: #c9d1d9; }
      .text-title { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif; font-size: 15px; font-weight: 600; fill: #58a6ff; }
      .text-math { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif; font-style: italic; font-size: 14px; fill: #79c0ff; }
      .text-highlight { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 600; fill: #f0883e; }
      .point-open { fill: #0d1117; stroke: #58a6ff; stroke-width: 2.5; }
      .point-mid { fill: #f0883e; stroke: #ffffff; stroke-width: 2.5; }
    </style>
    <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#8b949e" />
    </marker>
  </defs>

  <!-- Fundo -->
  <rect width="800" height="450" rx="8" class="bg"/>

  <!-- Titulo -->
  <text x="40" y="40" class="text-title">Geometria do Teorema de Dirichlet: Convergencia no Ponto Medio do Salto</text>

  <!-- Grade -->
  <line x1="80" y1="120" x2="740" y2="120" class="grid"/>
  <line x1="80" y1="210" x2="740" y2="210" class="grid"/>
  <line x1="80" y1="300" x2="740" y2="300" class="grid"/>
  <line x1="400" y1="70" x2="400" y2="390" class="grid"/>

  <!-- Eixos -->
  <line x1="80" y1="350" x2="750" y2="350" class="axis"/>
  <text x="755" y="355" class="text-math">x</text>
  
  <line x1="120" y1="380" x2="120" y2="70" class="axis"/>
  <text x="110" y="65" class="text-math">y</text>

  <!-- Curva a esquerda do salto (x &lt; x_i) -->
  <path d="M 140 250 Q 250 280 400 300" class="curve"/>
  <!-- Curva a direita do salto (x &gt; x_i) -->
  <path d="M 400 120 Q 550 100 700 150" class="curve"/>

  <!-- Linha tracejada vertical na descontinuidade x = x_i -->
  <line x1="400" y1="120" x2="400" y2="350" class="midpoint-line"/>
  <text x="390" y="375" class="text-math">x_i</text>

  <!-- Linhas horizontais projetando f(x_i+) e f(x_i-) -->
  <line x1="120" y1="120" x2="400" y2="120" stroke="#58a6ff" stroke-width="1.5" stroke-dasharray="3,3"/>
  <text x="50" y="125" class="text-math">f(x_i+)</text>

  <line x1="120" y1="300" x2="400" y2="300" stroke="#58a6ff" stroke-width="1.5" stroke-dasharray="3,3"/>
  <text x="50" y="305" class="text-math">f(x_i-)</text>

  <!-- Ponto medio S(x_i) = [f(x_i+) + f(x_i-)]/2 -->
  <line x1="120" y1="210" x2="400" y2="210" stroke="#f0883e" stroke-width="1.5" stroke-dasharray="4,4"/>
  <text x="15" y="215" class="text-highlight">S(x_i) = [f+ + f-]/2</text>

  <!-- Circulos de limite -->
  <circle cx="400" cy="120" r="5" class="point-open"/>
  <circle cx="400" cy="300" r="5" class="point-open"/>

  <!-- Circulo preenchido no ponto medio -->
  <circle cx="400" cy="210" r="6" class="point-mid"/>

  <!-- Caixa de Anotacao Explicativa -->
  <rect x="470" y="200" width="280" height="110" rx="6" fill="#161b22" stroke="#30363d" stroke-width="1.5"/>
  <text x="485" y="228" class="text-main" font-weight="bold">Convergencia Pontual:</text>
  <text x="485" y="252" class="text-main">• x != x_i (continuidade): S(x) = f(x)</text>
  <text x="485" y="276" class="text-main">• x = x_i (salto finito):</text>
  <text x="500" y="298" class="text-highlight">S(x_i) = [f(x_i+) + f(x_i-)] / 2</text>
</svg>
"""
    with open(OUTPUT_DIR / "grafico_teorema_dirichlet_salto.svg", "w", encoding="utf-8") as f:
        f.write(svg.strip())


def gerar_grafico_nucleo_dirichlet():
    """Gera a visualização do Núcleo de Dirichlet D_N(u) com concentração do lóbulo central."""
    x_center, y_center = 400, 260
    scale_x = 100
    scale_y = 18

    N = 7
    points = []
    num_steps = 400
    u_min, u_max = -math.pi, math.pi

    for i in range(num_steps + 1):
        u = u_min + (u_max - u_min) * (i / num_steps)
        if abs(u) < 1e-6:
            val = N + 0.5
        else:
            val = math.sin((N + 0.5) * u) / (2 * math.sin(u / 2))
        px = x_center + u * scale_x
        py = y_center - val * scale_y
        points.append(f"{px:.1f},{py:.1f}")

    path_d = "M " + " L ".join(points)

    svg = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 420" width="100%" height="100%">
  <defs>
    <style>
      .bg {{ fill: #0d1117; stroke: #30363d; stroke-width: 1; }}
      .grid {{ stroke: #21262d; stroke-width: 1; stroke-dasharray: 4,4; }}
      .axis {{ stroke: #8b949e; stroke-width: 2; marker-end: url(#arrow2); }}
      .kernel-curve {{ stroke: #bc8cff; stroke-width: 2.5; fill: none; }}
      .text-main {{ font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif; font-size: 13px; fill: #c9d1d9; }}
      .text-title {{ font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif; font-size: 15px; font-weight: 600; fill: #bc8cff; }}
      .text-math {{ font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif; font-style: italic; font-size: 14px; fill: #d2a8ff; }}
      .text-highlight {{ font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif; font-size: 13px; font-weight: 600; fill: #7ee787; }}
    </style>
    <marker id="arrow2" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#8b949e" />
    </marker>
  </defs>

  <rect width="800" height="420" rx="8" class="bg"/>

  <text x="40" y="38" class="text-title">Nucleo de Dirichlet: D_N(u) = sin((N + 1/2)u) / (2 sin(u/2)) [N = {N}]</text>

  <!-- Grade -->
  <line x1="400" y1="60" x2="400" y2="370" class="grid"/>
  <line x1="80" y1="260" x2="720" y2="260" class="grid"/>

  <!-- Eixos -->
  <line x1="70" y1="260" x2="740" y2="260" class="axis"/>
  <text x="745" y="265" class="text-math">u</text>

  <line x1="400" y1="370" x2="400" y2="60" class="axis"/>
  <text x="390" y="55" class="text-math">D_N(u)</text>

  <!-- Curva do Nucleo -->
  <path d="{path_d}" class="kernel-curve"/>

  <!-- Marcacoes nos eixos -->
  <text x="{x_center - math.pi*scale_x - 15:.1f}" y="280" class="text-math">-pi</text>
  <text x="{x_center + math.pi*scale_x - 5:.1f}" y="280" class="text-math">+pi</text>
  <text x="405" y="278" class="text-math">0</text>

  <circle cx="400" cy="{y_center - (N+0.5)*scale_y:.1f}" r="4" fill="#bc8cff"/>
  <text x="415" y="{y_center - (N+0.5)*scale_y + 5:.1f}" class="text-math">D_N(0) = N + 1/2 = {N+0.5}</text>

  <!-- Card explicativo -->
  <rect x="490" y="75" width="270" height="110" rx="6" fill="#161b22" stroke="#30363d" stroke-width="1.5"/>
  <text x="505" y="100" class="text-highlight">Propriedades Fundamentais:</text>
  <text x="505" y="123" class="text-main">1. Paridade: D_N(-u) = D_N(u)</text>
  <text x="505" y="146" class="text-main">2. Area Total: int_0^pi D_N(u) du = pi/2</text>
  <text x="505" y="169" class="text-main">3. Riemann-Lebesgue: Lobulo -&gt; Dirac</text>
</svg>
"""
    with open(OUTPUT_DIR / "grafico_nucleo_dirichlet.svg", "w", encoding="utf-8") as f:
        f.write(svg.strip())


def gerar_grafico_soma_fourier_pulso():
    """Gera o gráfico comparativo da função pulso f(x) = 1 em [0,2], 0 em [-2,0] e as somas parciais S_N(x)."""
    x_origin = 400
    y_origin = 320
    scale_x = 75
    scale_y = 180

    def s_N(x, N_terms):
        val = 0.5
        for k in range(1, N_terms + 1):
            n = 2 * k - 1
            val += (2 / (math.pi * n)) * math.sin(n * math.pi * x / 2)
        return val

    num_pts = 600
    x_min, x_max = -2.5, 2.5

    def get_path(func):
        pts = []
        for i in range(num_pts + 1):
            x = x_min + (x_max - x_min) * (i / num_pts)
            y = func(x)
            px = x_origin + x * scale_x
            py = y_origin - y * scale_y
            pts.append(f"{px:.1f},{py:.1f}")
        return "M " + " L ".join(pts)

    path_s1 = get_path(lambda x: s_N(x, 1))
    path_s5 = get_path(lambda x: s_N(x, 5))
    path_s19 = get_path(lambda x: s_N(x, 19))

    svg = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 460" width="100%" height="100%">
  <defs>
    <style>
      .bg {{ fill: #0d1117; stroke: #30363d; stroke-width: 1; }}
      .grid {{ stroke: #21262d; stroke-width: 1; stroke-dasharray: 4,4; }}
      .axis {{ stroke: #8b949e; stroke-width: 2; marker-end: url(#arrow3); }}
      .s1 {{ stroke: #79c0ff; stroke-width: 1.8; fill: none; stroke-dasharray: 3,3; }}
      .s5 {{ stroke: #e3b341; stroke-width: 2; fill: none; }}
      .s19 {{ stroke: #7ee787; stroke-width: 2.2; fill: none; }}
      .text-main {{ font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif; font-size: 13px; fill: #c9d1d9; }}
      .text-title {{ font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif; font-size: 15px; font-weight: 600; fill: #7ee787; }}
      .text-math {{ font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif; font-style: italic; font-size: 14px; fill: #c9d1d9; }}
      .text-highlight {{ font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif; font-size: 13px; font-weight: 600; fill: #f0883e; }}
      .point-mid {{ fill: #f0883e; stroke: #ffffff; stroke-width: 2; }}
    </style>
    <marker id="arrow3" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#8b949e" />
    </marker>
  </defs>

  <rect width="800" height="460" rx="8" class="bg"/>

  <text x="40" y="38" class="text-title">Convergencia de Dirichlet: Pulso Causal f(x) em [-2, 2] (Periodo 2L = 4)</text>

  <!-- Grade -->
  <line x1="{x_origin - 2*scale_x}" y1="80" x2="{x_origin - 2*scale_x}" y2="380" class="grid"/>
  <line x1="{x_origin}" y1="80" x2="{x_origin}" y2="380" class="grid"/>
  <line x1="{x_origin + 2*scale_x}" y1="80" x2="{x_origin + 2*scale_x}" y2="380" class="grid"/>
  <line x1="80" y1="{y_origin - 1*scale_y}" x2="720" y2="{y_origin - 1*scale_y}" class="grid"/>

  <!-- Eixos -->
  <line x1="80" y1="{y_origin}" x2="740" y2="{y_origin}" class="axis"/>
  <text x="745" y="{y_origin + 5}" class="text-math">x</text>

  <line x1="{x_origin}" y1="390" x2="{x_origin}" y2="70" class="axis"/>
  <text x="{x_origin - 20}" y="65" class="text-math">y</text>

  <!-- Trecho [-2, 0]: y = 0 -->
  <line x1="{x_origin - 2*scale_x}" y1="{y_origin}" x2="{x_origin}" y2="{y_origin}" stroke="#ffffff" stroke-width="4"/>
  <!-- Trecho [0, 2]: y = 1 -->
  <line x1="{x_origin}" y1="{y_origin - scale_y}" x2="{x_origin + 2*scale_x}" y2="{y_origin - scale_y}" stroke="#ffffff" stroke-width="4"/>

  <!-- Curvas de Aproximacao S_N(x) -->
  <path d="{path_s1}" class="s1"/>
  <path d="{path_s5}" class="s5"/>
  <path d="{path_s19}" class="s19"/>

  <!-- Pontos Medios Dirichlet marcados em x = -2, 0, 2 -->
  <circle cx="{x_origin - 2*scale_x}" cy="{y_origin - 0.5*scale_y}" r="5" class="point-mid"/>
  <circle cx="{x_origin}" cy="{y_origin - 0.5*scale_y}" r="5" class="point-mid"/>
  <circle cx="{x_origin + 2*scale_x}" cy="{y_origin - 0.5*scale_y}" r="5" class="point-mid"/>

  <!-- Rotulos nos eixos -->
  <text x="{x_origin - 2*scale_x - 10}" y="{y_origin + 25}" class="text-math">-2 (-L)</text>
  <text x="{x_origin - 8}" y="{y_origin + 25}" class="text-math">0</text>
  <text x="{x_origin + 2*scale_x - 10}" y="{y_origin + 25}" class="text-math">+2 (+L)</text>
  <text x="{x_origin - 35}" y="{y_origin - scale_y + 5}" class="text-math">1.0</text>
  <text x="{x_origin - 35}" y="{y_origin - 0.5*scale_y + 5}" class="text-highlight">0.5</text>

  <!-- Legenda -->
  <rect x="520" y="80" width="240" height="130" rx="6" fill="#161b22" stroke="#30363d" stroke-width="1.5"/>
  <text x="535" y="105" class="text-main" font-weight="bold">Legenda de Convergencia:</text>
  <line x1="535" y1="123" x2="565" y2="123" stroke="#ffffff" stroke-width="3"/>
  <text x="575" y="128" class="text-main">f(x) Real (Degrau)</text>

  <line x1="535" y1="145" x2="565" y2="145" stroke="#79c0ff" stroke-width="2" stroke-dasharray="3,3"/>
  <text x="575" y="150" class="text-main">S_1(x) (1 harmonico)</text>

  <line x1="535" y1="167" x2="565" y2="167" stroke="#e3b341" stroke-width="2"/>
  <text x="575" y="172" class="text-main">S_5(x) (5 harmonicos)</text>

  <line x1="535" y1="189" x2="565" y2="189" stroke="#7ee787" stroke-width="2.5"/>
  <text x="575" y="194" class="text-main">S_19(x) (19 harmonicos)</text>
</svg>
"""
    with open(OUTPUT_DIR / "grafico_soma_fourier_pulso.svg", "w", encoding="utf-8") as f:
        f.write(svg.strip())


def gerar_grafico_erro_parseval():
    """Gera gráfico vetorial de conservação de energia (Parseval) e decaimento do erro quadrático E_N."""
    svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 440" width="100%" height="100%">
  <defs>
    <style>
      .bg { fill: #0d1117; stroke: #30363d; stroke-width: 1; }
      .grid { stroke: #21262d; stroke-width: 1; stroke-dasharray: 4,4; }
      .axis { stroke: #8b949e; stroke-width: 2; marker-end: url(#arrow4); }
      .text-main { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif; font-size: 13px; fill: #c9d1d9; }
      .text-title { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif; font-size: 15px; font-weight: 600; fill: #58a6ff; }
      .text-math { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif; font-style: italic; font-size: 14px; fill: #79c0ff; }
      .text-error { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif; font-size: 13px; font-weight: 600; fill: #f85149; }
      .text-energy { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif; font-size: 13px; font-weight: 600; fill: #58a6ff; }
      .bar-energy { fill: rgba(88, 166, 255, 0.4); stroke: #58a6ff; stroke-width: 1.5; }
      .bar-error { fill: rgba(248, 81, 73, 0.4); stroke: #f85149; stroke-width: 1.5; }
    </style>
    <marker id="arrow4" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#8b949e" />
    </marker>
  </defs>

  <rect width="800" height="440" rx="8" class="bg"/>

  <text x="40" y="38" class="text-title">Identidade de Parseval &amp; Decaimento do Erro Residual E_N = ||f - S_N||^2</text>

  <!-- Eixos -->
  <line x1="80" y1="340" x2="740" y2="340" class="axis"/>
  <text x="745" y="345" class="text-math">N (Harmonicos)</text>

  <line x1="120" y1="360" x2="120" y2="70" class="axis"/>
  <text x="80" y="65" class="text-math">Energia (%)</text>

  <!-- Linha de 100% de Energia -->
  <line x1="120" y1="120" x2="720" y2="120" stroke="#7ee787" stroke-width="2" stroke-dasharray="6,4"/>
  <text x="45" y="125" class="text-main" fill="#7ee787" font-weight="bold">100% Total</text>

  <!-- N=0 -->
  <rect x="150" y="230" width="35" height="110" class="bar-energy"/>
  <rect x="150" y="120" width="35" height="110" class="bar-error"/>
  <text x="158" y="360" class="text-math">N=0</text>
  <text x="153" y="225" class="text-main" font-size="11">50.0%</text>

  <!-- N=1 -->
  <rect x="250" y="141" width="35" height="199" class="bar-energy"/>
  <rect x="250" y="120" width="35" height="21" class="bar-error"/>
  <text x="258" y="360" class="text-math">N=1</text>
  <text x="253" y="137" class="text-main" font-size="11">90.5%</text>

  <!-- N=3 -->
  <rect x="350" y="131" width="35" height="209" class="bar-energy"/>
  <rect x="350" y="120" width="35" height="11" class="bar-error"/>
  <text x="358" y="360" class="text-math">N=3</text>
  <text x="353" y="127" class="text-main" font-size="11">95.0%</text>

  <!-- N=5 -->
  <rect x="450" y="127" width="35" height="213" class="bar-energy"/>
  <rect x="450" y="120" width="35" height="7" class="bar-error"/>
  <text x="458" y="360" class="text-math">N=5</text>
  <text x="453" y="123" class="text-main" font-size="11">96.7%</text>

  <!-- N=19 -->
  <rect x="550" y="122" width="35" height="218" class="bar-energy"/>
  <rect x="550" y="120" width="35" height="2" class="bar-error"/>
  <text x="555" y="360" class="text-math">N=19</text>
  <text x="553" y="118" class="text-main" font-size="11">98.9%</text>

  <!-- Painel de Legenda -->
  <rect x="500" y="170" width="280" height="145" rx="6" fill="#161b22" stroke="#30363d" stroke-width="1.5"/>
  <text x="515" y="195" class="text-main" font-weight="bold">Conservacao de Parseval:</text>
  <text x="515" y="218" class="text-energy">■ Energia Capturada: P_N</text>
  <text x="515" y="240" class="text-error">■ Erro Residual: E_N = ||f - S_N||^2</text>
  <text x="515" y="265" class="text-main">• Teorema da Melhor Aproximacao:</text>
  <text x="515" y="285" class="text-main" fill="#7ee787" font-weight="bold">E_N e o minimo absoluto em L^2</text>
  <text x="515" y="303" class="text-math">E_N -&gt; 0 conforme N -&gt; infinito</text>
</svg>
"""
    with open(OUTPUT_DIR / "grafico_erro_parseval.svg", "w", encoding="utf-8") as f:
        f.write(svg.strip())


if __name__ == "__main__":
    gerar_grafico_salto_dirichlet()
    gerar_grafico_nucleo_dirichlet()
    gerar_grafico_soma_fourier_pulso()
    gerar_grafico_erro_parseval()
    print("Graficos SVG gerados com sucesso em calculo/2008/assets/")
