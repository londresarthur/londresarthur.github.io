# 📚 Documentação Técnica — Fourier Studio (Diátaxis Framework)

Esta documentação está estruturada rigorosamente de acordo com os quatro quadrantes canônicos do [Framework Diátaxis](https://diataxis.fr/).

---

## 🧭 Mapa da Documentação

```
docs/
├── tutorials/       # 🚀 Tutoriais práticos para iniciantes
│   ├── 01_primeiros_passos_fourier_studio.md
│   └── 02_filtro_media_movel_passo_a_passo.md
├── how-to/          # 🛠️ Guias "Como Fazer" orientados a tarefas
│   ├── como_adicionar_funcoes_customizadas.md
│   ├── como_exportar_latex_e_audio.md
│   └── como_analisar_ruido_e_atraso_grupo.md
├── reference/       # 📖 Especificações de APIs, classes e parâmetros
│   ├── fourier_engine_api.md
│   ├── catalogo_presets_usp.md
│   └── media_movel_api_e_especificacoes.md
└── explanation/     # 💡 Explicações teóricas, arquitetura e matemática
    ├── arquitetura_do_sistema.md
    ├── teorema_parseval_e_energia.md
    └── filtro_media_movel_teoria_e_snr.md
```

---

### 1. [🚀 Tutoriais (`tutorials/`)](tutorials/)
- **[Primeiros Passos com o Fourier Studio](tutorials/01_primeiros_passos_fourier_studio.md)**: Lição passo a passo orientada a conduzir o estudante pela primeira simulação, variação de harmônicos e síntese de áudio.
- **[Primeiro Contato com o Filtro de Média Móvel](tutorials/02_filtro_media_movel_passo_a_passo.md)**: Guia passo a passo sobre janelas temporais $M$, suavização de degraus e trade-off com tempo de subida.

### 2. [🛠️ Guias Práticos (`how-to/`)](how-to/)
- **[Como Adicionar Funções Customizadas](how-to/como_adicionar_funcoes_customizadas.md)**: Sintaxe aceita pelo compilador de expressões, funções especiais e extensões de meia onda.
- **[Como Exportar LaTeX, Imagens e Áudio](how-to/como_exportar_latex_e_audio.md)**: Extração de equações formatadas, capturas gráficas HiDPI e controle do sintetizador de áudio.
- **[Como Analisar Ruído e Atraso de Grupo](how-to/como_analisar_ruido_e_atraso_grupo.md)**: Medição quantitativa de ganho de SNR em dB, eliminação de atraso via filtro centralizado e rejeição de outliers com mediana.

### 3. [📖 Referência Técnica (`reference/`)](reference/)
- **[API da Classe FourierEngine](reference/fourier_engine_api.md)**: Parâmetros do construtor, propriedades de estado, arrays de coeficientes e métodos numéricos.
- **[Catálogo de Presets USP](reference/catalogo_presets_usp.md)**: Fórmulas analíticas canônicas dos 11 presets das apostilas da USP.
- **[Especificações de DSP & MovingAverageEngine](reference/media_movel_api_e_especificacoes.md)**: Parâmetros, funções matemáticas, equações a diferenças e resposta em frequência do motor de média móvel.

### 4. [💡 Explicação & Teoria (`explanation/`)](explanation/)
- **[Arquitetura do Sistema & Pipeline Gráfico](explanation/arquitetura_do_sistema.md)**: Diagramas de fluxo de dados, separação de responsabilidades e ordem de renderização em camadas.
- **[Teorema de Parseval & Conservação de Energia](explanation/teorema_parseval_e_energia.md)**: Fundamentação em espaços $L^2$, desigualdade de Bessel e dedução de $\sum 1/n^4 = \pi^4/90$.
- **[Análise Estocástica e Espectral da Média Móvel](explanation/filtro_media_movel_teoria_e_snr.md)**: Dedução analítica da redução de variância $\sigma_w^2/M$, resposta DTFT e transitório de degraus.
