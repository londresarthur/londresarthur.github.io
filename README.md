# 🌌 Fourier Studio USP & Acervo Acadêmico

Laboratório interativo avançado de **Transformada e Séries de Fourier**, Conservação de Energia (Teorema de Parseval), Convergência de Dirichlet e decomposição harmônica, integrado ao acervo de disciplinas da **Universidade de São Paulo (USP)**.

---

## 🚀 Fourier Studio (Aplicação Web)

Acesse o simulador online em produção:  
👉 **[https://londresarthur.github.io/usp/](https://londresarthur.github.io/usp/)**

### 🎨 Principais Recursos:
- 📈 **Plotter Estilo Desmos/GeoGebra**: Navegação fluida com Pan & Zoom (mouse e touch pinch com ponto focal), inspeção de coordenadas $(x, f(x), S_N(x))$, e destaque dinâmico de descontinuidades.
- 🎚️ **Controle Dinâmico de Termos ($N$)**: Ajuste em tempo real de $0$ a $60$ harmônicos com animação com throttling otimizado.
- ⚡ **Conservação de Energia & Identidade de Parseval**:
  - Energia da Função Original: $E_{\text{orig}} = \frac{1}{L}\int_{-L}^L [f(x)]^2 dx$
  - Energia da Série de Fourier: $E_N = \frac{a_0^2}{2} + \sum_{n=1}^N (a_n^2 + b_n^2)$
  - Erro Médio Quadrático Residual ($L^2$ MSE) e Desigualdade de Bessel.
  - Gráfico assintótico com distribuição harmônica e tracking de convergência.
- 🎯 **Teorema de Dirichlet & Análise de Gibbs**: Destaque visual dos limites laterais $f(x^+), f(x^-)$, convergência pontual no ponto médio do salto $\frac{f(x^+) + f(x^-)}{2}$ e medição do percentual de overshoot de Gibbs.
- 🌀 **Epiciclos Fasoriais (3Blue1Brown)**: Visualização dos vetores complexos rotativos com correção de fase desenhando a onda no tempo.
- 🔊 **Sintetizador de Áudio Harmônico (Web Audio API)**: Timbre acústico em tempo real com `PeriodicWave` sintetizando a expansão em série de Fourier.
- 📐 **Presets Canônicos da USP**:
  - $f(x) = |x|$ (Apostila 17/08 — Dedução da Série de Basel $\pi^2/6$ e Parseval $\pi^4/90$)
  - $f(x) = \pi - x$ (Apostila 20/08 — Extensão Ímpar de Senos, Par de Cossenos e Direta)
  - Pulso Causal em $[-2, 2]$ (Teorema de Dirichlet)
  - Onda Quadrada, Dente de Serra, Triangular, Exponencial amortecida e Seno Retificado.
- 🧪 **Compilador de Expressões Customizadas**: Suporte para expressões matemáticas arbitrárias como `abs(x)`, `pi - x`, `sign(x)`, `x^2`, `exp(-abs(x)) * cos(2*x)`, etc.

---

## 🪟 Repositório Irmão: Fourier Windows (Desktop & Python)

O ecossistema conta também com a versão dedicada para Windows / Desktop em repositório separado:
- 📦 **[fourier-windows](https://github.com/londresarthur/fourier-windows)**: Suíte nativa para Windows e biblioteca Python científica para computação analítica, quadratura de Gauss-Legendre, gráficos vetoriais Matplotlib, síntese WAV e linha de comando CLI.

---

## 📑 Estrutura do Repositório

O projeto segue uma arquitetura modular, limpa e padronizada com documentação no framework **Diátaxis**:

```
usp/
├── index.html                     # Ponto de entrada web (publicado no GitHub Pages)
├── src/                           # Código-fonte da aplicação web
│   ├── css/
│   │   └── style.css              # Glassmorphism, temas claro/escuro e estilos UI
│   └── js/
│       ├── fourier-engine.js      # Motor matemático de quadratura, Parseval e Gibbs
│       ├── canvas-renderer.js     # Motor gráfico interativo 2D HiDPI
│       ├── spectrum-chart.js      # Gráfico de espectro e convergência de energia
│       ├── audio-synth.js         # Sintetizador aditivo Web Audio API
│       └── app.js                 # Orquestrador da interface e KaTeX
├── docs/                          # Documentação Técnica (Framework Diátaxis)
│   ├── tutorials/                 # 🚀 Tutoriais práticos (getting started)
│   ├── how-to/                    # 🛠️ Guias "Como Fazer" (custom formulas, export)
│   ├── reference/                 # 📖 Especificações de APIs e catálogos de presets
│   ├── explanation/               # 💡 Teoria, Parseval, Dirichlet e arquitetura
│   └── README.md                  # Índice do portal de documentação
├── academico/                     # Acervo acadêmico e material de estudo USP
│   ├── calculo/                   # Apostilas e notas de aula de Cálculo Avançado
│   │   ├── 1708/                  # Fundamentos, Ortogonalidade, Basel & Parseval
│   │   └── 2008/                  # Extensões par/ímpar, f(x) = pi - x e Dirichlet
│   ├── numericos/                 # Métodos Numéricos (Método de Euler para EDOs)
│   ├── prova/                     # Resumos, roteiros e listas para P1 e P2
│   └── quimica/                   # Apostilas de Físico-Química e Termodinâmica
├── .github/                       # Workflows de deploy automático
│   └── workflows/
│       └── pages.yml              # GitHub Pages Action (deploy a partir da raiz)
└── .scripts/                      # Scripts utilitários de validação
```

---

## 💻 Executando Localmente

Para rodar a aplicação web localmente:

```bash
# Com Python 3
python -m http.server 8000

# Ou com qualquer servidor estático (Node.js)
npx serve .
```

Abra o navegador em `http://localhost:8000`.
