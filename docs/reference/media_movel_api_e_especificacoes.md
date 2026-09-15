# Referência Técnica: Filtragem Digital de Sinais & Especificações de DSP

Este documento consolida as especificações matemáticas, algoritmos, funções do motor computacional e parâmetros técnicos dos métodos de filtragem disponíveis: Média Móvel, Filtro de Kalman e Denoising por Wavelets.

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

### 1.4 Filtro de Kalman (Estimação Ótima em Espaço de Estados)

O filtro de Kalman formula o rastreamento do sinal através do modelo linear estocástico discreto:

$$
x_k = x_{k-1} + w_k, \quad w_k \sim \mathcal{N}(0, Q)
$$

$$
z_k = x_k + v_k, \quad v_k \sim \mathcal{N}(0, R)
$$

As equações recursivas de atualização dividem-se em predição e correção:

#### Predição a Priori
$$
\hat{x}_k^- = \hat{x}_{k-1}
$$

$$
P_k^- = P_{k-1} + Q
$$

#### Correção a Posteriori
$$
K_k = \frac{P_k^-}{P_k^- + R}
$$

$$
\hat{x}_k = \hat{x}_k^- + K_k (z_k - \hat{x}_k^-)
$$

$$
P_k = (1 - K_k) P_k^-
$$

Onde $K_k$ é o Ganho de Kalman ótimo que minimiza o erro quadrático médio da estimativa em cada instante de amostragem.

### 1.5 Denoising por Wavelet (DWT Multi-escala & VisuShrink)

A Transformada Wavelet Discreta projeta o sinal sobre uma base ortonormal de funções escala $\phi(t)$ e wavelets $\psi(t)$ geradas por dilatação e translação.

Os coeficientes de detalhe da escala mais fina $d_1$ fornecem o desvio padrão estimado do ruído via estimador robusto MAD:

$$
\hat{\sigma} = \frac{\text{mediana}(|d_1|)}{0.6745}
$$

O limiar universal de Donoho-Johnstone (VisuShrink) é dado por:

$$
\lambda = \hat{\sigma} \sqrt{2 \ln(N)}
$$

A operação não-linear de limiarização suave (*Soft-Thresholding*) preserva bordas acentuadas atenuando ruído:

$$
\eta_{\text{soft}}(d, \lambda) = \text{sgn}(d) \cdot \max(0, |d| - \lambda)
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
| `filterKalman` | `(z, Q, R, x0, P0)` | Executa estimação ótima recursiva de Kalman | $\mathcal{O}(N)$ |
| `filterWaveletDenoise` | `(signal, options)` | Decomposição DWT Haar, VisuShrink e IDWT | $\mathcal{O}(N)$ |
| `filterMedian` | `(x, M)` | Aplica filtro de mediana móvel 1D | $\mathcal{O}(N \cdot M \log M)$ |
| `computeFrequencyResponse` | `(M, numPts)` | Avalia magnitude analítica linear e em dB | $\mathcal{O}(\text{pts})$ |
| `computeMetrics` | `(ideal, noisy, filt, M, type)` | Computa MSE, SNR, ganho em dB e atraso de grupo | $\mathcal{O}(N)$ |

---

## 3. Resumo Comparativo de Métricas de Desempenho

| Método | Atraso de Grupo ($\tau_g$) | Tempo de Subida ($t_r$) | Supressão de Ruído Branco | Rejeição a Outliers |
| :--- | :--- | :--- | :--- | :--- |
| **Média Móvel Causal** | $\frac{M-1}{2}$ amostras | $M \cdot T_s$ | Redução por fator $M$ | Baixa (espalha o pulso) |
| **Média Centralizada** | $0$ (Fase zero) | Simétrico ($M \cdot T_s$) | Redução por fator $M$ | Baixa |
| **Filtro de Kalman** | Mínimo adaptativo | Rápido ($Q/R$ dependente) | Ótima no sentido MMSE | Moderada |
| **Wavelet (DWT)** | $0$ (Sem defasagem) | $t_r \approx 1$ amostra | Excelente em multi-escala | Muito boa |
| **Filtro de Mediana** | $\approx 0$ amostras | Preserva degraus ideais | Subótima p/ Gaussiano | Imbatível ($100\%$ rejeição) |
