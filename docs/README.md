# 📚 Documentação Técnica — Fourier Studio (Diátaxis Framework)

Esta documentação está estruturada rigorosamente de acordo com os quatro quadrantes canônicos do [Framework Diátaxis](https://diataxis.fr/).

---

## 🧭 Mapa da Documentação

```
docs/
├── tutorials/       # 🚀 Tutoriais práticos para iniciantes
│   └── 01_primeiros_passos_fourier_studio.md
├── how-to/          # 🛠️ Guias "Como Fazer" orientados a tarefas
│   ├── como_adicionar_funcoes_customizadas.md
│   └── como_exportar_latex_e_audio.md
├── reference/       # 📖 Especificações de APIs, classes e parâmetros
│   ├── fourier_engine_api.md
│   └── catalogo_presets_usp.md
└── explanation/     # 💡 Explicações teóricas, arquitetura e matemática
    ├── arquitetura_do_sistema.md
    └── teorema_parseval_e_energia.md
```

---

### 1. [🚀 Tutoriais (`tutorials/`)](tutorials/)
- **[Primeiros Passos com o Fourier Studio](tutorials/01_primeiros_passos_fourier_studio.md)**: Lição passo a passo orientada a conduzir o estudante pela primeira simulação, variação de harmônicos e síntese de áudio.

### 2. [🛠️ Guias Práticos (`how-to/`)](how-to/)
- **[Como Adicionar Funções Customizadas](how-to/como_adicionar_funcoes_customizadas.md)**: Sintaxe aceita pelo compilador de expressões, funções especiais e extensões de meia onda.
- **[Como Exportar LaTeX, Imagens e Áudio](how-to/como_exportar_latex_e_audio.md)**: Extração de equações formatadas, capturas gráficas HiDPI e controle do sintetizador de áudio.

### 3. [📖 Referência Técnica (`reference/`)](reference/)
- **[API da Classe FourierEngine](reference/fourier_engine_api.md)**: Parâmetros do construtor, propriedades de estado, arrays de coeficientes e métodos numéricos.
- **[Catálogo de Presets USP](reference/catalogo_presets_usp.md)**: Fórmulas analíticas canônicas dos 11 presets das apostilas da USP.

### 4. [💡 Explicação & Teoria (`explanation/`)](explanation/)
- **[Arquitetura do Sistema & Pipeline Gráfico](explanation/arquitetura_do_sistema.md)**: Diagramas de fluxo de dados, separação de responsabilidades e ordem de renderização em camadas.
- **[Teorema de Parseval & Conservação de Energia](explanation/teorema_parseval_e_energia.md)**: Fundamentação em espaços $L^2$, desigualdade de Bessel e dedução de $\sum 1/n^4 = \pi^4/90$.
