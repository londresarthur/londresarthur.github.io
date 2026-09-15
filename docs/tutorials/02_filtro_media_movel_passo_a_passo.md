# Tutorial: Primeiro Contato com o Filtro de Média Móvel

Este tutorial orienta o estudante ou engenheiro através dos primeiros passos práticos na utilização do simulador interativo de **Filtro de Média Móvel (Moving Average)**, explorando a suavização de ruído branco aditivo e a preservação de sinais degrau.

---

## 1. O que é o Filtro de Média Móvel?

O filtro de média móvel é um dos filtros digitais mais intuitivos e amplamente empregados no Processamento Digital de Sinais (PDS). Ele pertence à classe dos filtros **FIR** (*Finite Impulse Response*) lineares e invariantes no tempo (LTI).

Sua operação consiste em deslizar uma janela temporal de tamanho $M$ ao longo da sequência discreta de entrada $x[n]$, calculando em cada instante a média aritmética simples das amostras compreendidas pela janela:

$$
y[n] = \frac{1}{M} \sum_{k=0}^{M-1} x[n-k]
$$

Onde:
- $x[n]$ representa o sinal discreto de entrada (contendo sinal útil somado a ruído estocástico).
- $y[n]$ é o sinal filtrado de saída.
- $M$ é o comprimento da janela (ordem do filtro $N_{\text{ordem}} = M - 1$).
- $k$ é o índice de atraso de cada amostra ponderada.

---

## 2. Acessando o Simulador Interativo

Abra a aplicação web no navegador através do endereço local ou no portal GitHub Pages:

- **Endereço online**: `https://londresarthur.github.io/media-movel/`
- **Ambiente local**: execute `python -m http.server 8000` na raiz e acesse `http://localhost:8000/media-movel/`.

---

## 3. Experimento Guiado: Efeito do Tamanho da Janela ($M$)

### Etapa A: Observação com Janela Pequena ($M = 2$)

No painel esquerdo da aplicação:
1. Mantenha o **Tipo de Sinal** em `Degrau Unitário`.
2. Configure a **Intensidade $\sigma$** para $0.10$.
3. Selecione o botão de ajuste rápido **$M = 2$**.

Observe o gráfico no domínio do tempo:
- A linha azul (sinal filtrado) acompanha com grande rapidez a transição do degrau em $t = 5\text{ s}$.
- Por outro lado, oscilações causadas pelo ruído ainda permanecem visíveis sobre o patamar do sinal.
- A redução teórica de variância é de $1/2 = 0.500$ (atenuação de $-3.01\text{ dB}$).

### Etapa B: Aumento da Janela para $M = 10$

Agora selecione o botão **$M = 10$**:
- Note a notável atenuação das flutuações de ruído branco nos patamares estáveis.
- Observe, contudo, que a transição abrupta do degrau foi suavizada em uma rampa inclinada com duração de $10$ amostras.

A transição do degrau sofreu um retardo de grupo com a seguinte formulação:

$$
\tau_g = \frac{M - 1}{2} = \frac{10 - 1}{2} = 4.5 \text{ amostras}
$$

---

## 4. O Trade-off Fundamental: Suavização vs Atraso

O experimento anterior evidencia o princípio central no projeto de filtros temporais:

#### Redução de Ruído
Janelas maiores ($M \gg 1$) reduzem expressivamente a variância do ruído branco estacionário proporcionalmente a $1/M$.

#### Distorção de Borda
Janelas maiores aumentam o tempo de subida transitório ($t_r = M \cdot T_s$) e introduzem um atraso de fase linear no sinal recuperado.

---

## 5. Próximos Passos

Para aprofundar na resposta em frequência e na prova analítica da atenuação estocástica, consulte os guias complementares:
- [Como Analisar Ruído e Atraso de Grupo](../how-to/como_analisar_ruido_e_atraso_grupo.md)
- [Fundamentos Teóricos e Dedução de SNR](../explanation/filtro_media_movel_teoria_e_snr.md)
