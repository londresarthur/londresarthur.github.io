# Referência Técnica: Filtro de Média Móvel & Especificações de DSP

Este documento consolida as especificações matemáticas, algoritmos, funções do motor computacional e parâmetros técnicos do módulo interativo de Média Móvel.

---

## 1. Especificações Matemáticas dos Filtros

### 1.1 Média Móvel Causal (FIR LTI Padrão)

A equação a diferenças finitas causal é dada por:

$$
y[n] = \frac{1}{M} \sum_{k=0}^{M-1} x[n-k]
$$

#### Resposta ao Impulso
A resposta a uma excitação impulsiva unitária $\delta[n]$ é finita:

$$
h[n] = \begin{cases} \frac{1}{M}, & 0 \le n \le M-1 \\ 0, & \text{caso contrario} \end{cases}
$$

#### Função de Transferência em $Z$
Aplicando a Transformada $Z$ com região de convergência $|z| \gt 0$:

$$
H(z) = \sum_{n=0}^{M-1} \frac{1}{M} z^{-n} = \frac{1}{M} \frac{1 - z^{-M}}{1 - z^{-1}}
$$

O filtro possui $M-1$ zeros localizados no círculo unitário em $z_k = e^{j 2\pi k / M}$ para $k = 1, 2, \dots, M-1$, com o polo em $z = 1$ cancelado pelo zero correspondente.

### 1.2 Média Móvel Centralizada (Zero-Phase Non-Causal)

Para aplicações de filtragem bidirecional em sinais gravados, a média centralizada elimina qualquer defasagem temporal:

$$
y[n] = \frac{1}{M} \sum_{k=-\lfloor(M-1)/2\rfloor}^{\lfloor M/2\rfloor} x[n+k]
$$

A resposta em frequência é puramente real:

$$
H_{\text{cent}}(e^{j\omega}) = \frac{1}{M} \frac{\sin(\omega M / 2)}{\sin(\omega / 2)}
$$

A fase $\theta(\omega) = 0$ para qualquer frequência na banda passante, resultando em atraso de grupo rigorosamente nulo ($\tau_g = 0$).

### 1.3 Média Móvel Exponencial (EMA — IIR de 1º Polo)

O filtro recursivo com fator de ponderação $\alpha \in (0, 1]$:

$$
y[n] = \alpha x[n] + (1 - \alpha) y[n-1]
$$

Com equivalência à média móvel simples de $M$ amostras dada por:

$$
\alpha = \frac{2}{M + 1}
$$

---

## 2. Parâmetros do Motor Computacional (`MovingAverageEngine`)

O módulo exporta em `src/js/moving-average-engine.js` as seguintes funções principais:

| Função | Assinatura | Descrição | Complexidade |
| :--- | :--- | :--- | :--- |
| `generateSignal` | `(type, N, params)` | Gera sinal ideal (`step`, `square`, `sine`, `impulse`, `ecg`) | $\mathcal{O}(N)$ |
| `generateNoise` | `(type, N, sigma)` | Gera vetor estocástico (`gaussian`, `uniform`, `impulsive`) | $\mathcal{O}(N)$ |
| `filterCausalMovingAverage` | `(x, M, opts)` | Aplica média móvel causal com janela $M$ | $\mathcal{O}(N)$ |
| `filterCentralizedMovingAverage` | `(x, M)` | Aplica média móvel centralizada simétrica | $\mathcal{O}(N)$ |
| `filterExponentialMovingAverage` | `(x, M)` | Aplica filtro recursivo EMA com $\alpha = 2/(M+1)$ | $\mathcal{O}(N)$ |
| `filterMedian` | `(x, M)` | Aplica filtro de mediana móvel 1D | $\mathcal{O}(N \cdot M \log M)$ |
| `computeFrequencyResponse` | `(M, numPts)` | Avalia magnitude analítica linear e em dB | $\mathcal{O}(\text{pts})$ |
| `computeMetrics` | `(ideal, noisy, filt, M, type)` | Computa MSE, SNR, ganho em dB e atraso de grupo | $\mathcal{O}(N)$ |

---

## 3. Resumo de Métricas de Desempenho

| Grandeza | Fórmula Teórica | Interpretação Física |
| :--- | :--- | :--- |
| **Redução de Variância** | $\frac{\sigma_y^2}{\sigma_w^2} = \frac{1}{M}$ | Atenuação da potência de ruído branco |
| **Ganho de SNR** | $\Delta \text{SNR} = 10 \log_{10}(M) \text{ dB}$ | Aumento da relação sinal-ruído na saída |
| **Atraso de Grupo Causal** | $\tau_g = \frac{M-1}{2} \text{ amostras}$ | Retardo constante em todas as frequências |
| **Primeiro Nulo Espectral** | $\omega_0 = \frac{2\pi}{M} \text{ rad/amostra}$ | Frequência de corte com cancelamento completo |
| **Atenuação Lóbulo Secundário** | $\approx -13.3 \text{ dB}$ | Nível máximo de rejeição fora da banda |
