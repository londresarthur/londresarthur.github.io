# 🌌 Arthur Londres — Laboratórios Virtuais USP

Portal institucional e educacional da **Universidade de São Paulo (USP)** hospedando aplicações web computacionais interativas, ferramentas científicas e simuladores de Processamento Digital de Sinais (PDS) e Análise Harmônica de Fourier.

- 🌐 **Portal Online**: **[https://londresarthur.github.io/](https://londresarthur.github.io/)**

---

## 🔬 Laboratórios Virtuais Interativos (Aplicações Web)

O ecossistema disponibiliza laboratórios interativos executados diretamente no navegador com tecnologia HTML5 Canvas HiDPI, Web Audio API e KaTeX:

### 1. [Fourier Toolbox (Fourier Studio USP)](https://londresarthur.github.io/fourier-toolbox/)
- **Localização**: [`fourier-toolbox/index.html`](fourier-toolbox/index.html)
- **Recursos**:
  - Plotter interativo estilo Desmos/GeoGebra com Pan & Zoom e rastreamento analítico.
  - Ajuste dinâmico de harmônicos de $N = 0$ a $N = 60$ termos.
  - Conservação de Energia (Teorema de Parseval em $L^2$) e Identidade de Basel ($\pi^2/6$).
  - Teorema de Dirichlet, salto de descontinuidade e medição do overshoot de Gibbs ($8.95\%$).
  - Epiciclos Fasoriais 2D rotativos (decomposição harmônica complexa).
  - Síntese sonora em tempo real via Web Audio API e exportação de áudio PCM WAV (44.1 kHz).
  - 11 presets analíticos canônicos das apostilas da USP e compilador de fórmulas customizadas.

### 2. [Filtragem Digital de Sinais (PDS): Média Móvel, Kalman & Wavelets](https://londresarthur.github.io/media-movel/)
- **Localização**: [`media-movel/index.html`](media-movel/index.html)
- **Recursos**:
  - Comparativo estocástico de eliminação de ruído branco em sinais transitórios e degraus.
  - **Média Móvel Causal**: FIR linear clássico com atraso de grupo $\tau_g = \frac{M-1}{2}$ amostras.
  - **Média Móvel Centralizada**: Filtragem de fase zero ($\tau_g = 0$) para pós-processamento.
  - **Média Móvel Exponencial (EMA)**: IIR recursivo de 1º polo com $\alpha = \frac{2}{M+1}$.
  - **Filtro de Kalman Ótimo (1D)**: Estimação em espaço de estados com minimização de erro quadrático médio (MMSE) e ganho adaptativo $K_k = \frac{P_k^-}{P_k^- + R}$.
  - **Denoising por Wavelets (DWT Haar)**: Decomposição em escalas de Mallat com limiar universal de Donoho-Johnstone (VisuShrink) e *Soft-Thresholding*, preservando bordas de degrau com $t_r \approx 1$ amostra.
  - **Filtro de Mediana**: Rejeição completa ($100\%$) de ruído impulsivo (*Sal e Pimenta*).
  - Duplo domínio: Tempo (amostras, janela deslizante e tooltips) e Frequência (magnitude analítica sinc/Dirichlet e escala em dB).
  - Exportação de dados em CSV e imagem gráfica em alta resolução.

---

## 🪟 Repositório Irmão: Fourier Windows (Desktop & Python)

O ecossistema conta também com a versão dedicada para Windows / Desktop em repositório separado:
- 📦 **[fourier-windows](https://github.com/londresarthur/fourier-windows)**: Suíte nativa para Windows e biblioteca Python científica para computação analítica, quadratura de Gauss-Legendre, gráficos vetoriais Matplotlib, síntese WAV e linha de comando CLI.

---

## 📑 Estrutura do Repositório

O projeto segue uma arquitetura modular, limpa e padronizada com documentação no framework **Diátaxis**:

```
londresarthur.github.io/
├── index.html                     # Portal principal (Homepage https://londresarthur.github.io/)
├── fourier-toolbox/               # Aplicação web Fourier Toolbox (Fourier Studio USP)
│   └── index.html                 # Simulador de Fourier, Parseval, Dirichlet e áudio
├── media-movel/                   # Aplicação web de Filtragem Digital de Sinais (PDS)
│   └── index.html                 # Laboratório de Média Móvel, Kalman e Wavelet
├── src/                           # Código-fonte compartilhado da aplicação web
│   ├── css/
│   │   └── style.css              # Glassmorphism, temas claro/escuro e estilos UI
│   └── js/
│       ├── fourier-engine.js      # Motor matemático de quadratura, Parseval e Gibbs
│       ├── moving-average-engine.js # Motor matemático de DSP, Kalman e Wavelets
│       ├── canvas-renderer.js     # Motor gráfico interativo 2D HiDPI
│       ├── spectrum-chart.js      # Gráfico de espectro e convergência de energia
│       ├── audio-synth.js         # Sintetizador aditivo Web Audio API
│       └── app.js                 # Orquestrador da interface e KaTeX
├── tests/                         # Suíte de testes unitários automatizados
│   └── test_moving_average.py     # Testes matemáticos de invariância, resposta, Kalman e DWT
├── docs/                          # Documentação Técnica (Framework Diátaxis)
│   ├── tutorials/                 # 🚀 Tutoriais práticos (getting started)
│   ├── how-to/                    # 🛠️ Guias "Como Fazer" (custom formulas, export)
│   ├── reference/                 # 📖 Especificações de APIs e catálogos de presets
│   ├── explanation/               # 💡 Teoria, Parseval, Dirichlet, Kalman e Wavelets
│   └── README.md                  # Índice do portal de documentação
├── .github/                       # Workflows de deploy automático
│   └── workflows/
│       └── pages.yml              # GitHub Pages Action (deploy a partir da raiz)
└── .scripts/                      # Scripts utilitários de validação
```

---

## 💻 Executando Localmente

Para rodar o portal e as aplicações web localmente:

```bash
# Com Python 3
python -m http.server 8000

# Ou com qualquer servidor estático (Node.js)
npx serve .
```

Abra o navegador em `http://localhost:8000`.
