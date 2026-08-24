# 🚀 Tutorial: Primeiros Passos com o Fourier Studio

> **Quadrante Diátaxis:** Tutorial (Orientado ao Aprendizado)  
> **Objetivo:** Guiar o estudante pela primeira experiência prática de visualização, síntese e análise de Séries de Fourier.

---

## 1. Visão Geral

O **Fourier Studio** é um laboratório interativo desenvolvido para o aprendizado visual e auditivo de Séries de Fourier, Conservação de Energia (Teorema de Parseval) e Convergência de Dirichlet.

Acesse o simulador online em: [https://londresarthur.github.io/usp/](https://londresarthur.github.io/usp/)

---

## 2. Passo a Passo da Primeira Simulação

### Passo 1: Selecionar uma Função Predefinida (Preset)
1. No painel lateral esquerdo, localize a seção **Função Alvo $f(x)$**.
2. Clique no menu dropdown de presets e selecione:
   `f(x) = |x| (Apostila 17/08 - Basel & Parseval)`.
3. Observe que o gráfico traça a função original contínua (em azul ciano) e a sua aproximação de Fourier $S_N(x)$ (em verde esmeralda).

### Passo 2: Variar o Número de Harmônicos ($N$)
1. Arraste o controle deslizante **Ordem Harmônica $N$** de $0$ até $30$.
2. Para $N = 0$, apenas o nível médio constante $\frac{a_0}{2} = \frac{\pi}{2} \approx 1{,}57$ é plotado.
3. Conforme $N$ aumenta para $1, 3, 5, \dots$, os termos de cosseno adicionam curvatura ao sinal, moldando gradualmente o formato em "V" da função $|x|$.
4. Clique no botão **Animar N** para ver a evolução harmônica automática.

### Passo 3: Analisar o Painel de Energia de Parseval
No topo da tela, observe os 4 cartões de métricas:
- **Energia Original ($E_{\text{orig}}$):** Energia total da função $\frac{1}{\pi}\int_{-\pi}^\pi |x|^2\,dx = \frac{2\pi^2}{3} \approx 6{,}5797$.
- **Energia de Fourier ($E_N$):** Soma de energias capturadas pelos primeiros $N$ termos.
- **Erro Residual ($L^2$ MSE):** Diferença $E_{\text{orig}} - E_N \ge 0$ (Desigualdade de Bessel).
- **Conservação ($\eta\%$):** Percentual de energia capturado. Para $N = 10$, a captura já ultrapassa $99{,}9\%$.

### Passo 4: Ouvir a Síntese Acústica
1. Clique no botão **Ouvir Fourier (Áudio)** no topo da página.
2. Ajuste o controle deslizante de harmônicos $N$.
3. Perceba a mudança no timbre sonoro: poucos harmônicos produzem um som suave e aveludado; o acréscimo de harmônicos superiores adiciona brilho acústico.

---

## 3. Próximos Passos

Após completar este tutorial, explore:
- [Como Adicionar Funções Customizadas](../how-to/como_adicionar_funcoes_customizadas.md)
- [Como Exportar LaTeX e Áudio](../how-to/como_exportar_latex_e_audio.md)
- [Explicação Teórica de Parseval e Bessel](../explanation/teorema_parseval_e_energia.md)
