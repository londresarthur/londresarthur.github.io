# Fundamentos Teóricos: Análise Estocástica e Espectral da Média Móvel

Este documento apresenta a fundamentação matemática rigorosa do filtro de média móvel, demonstrando analiticamente a redução da potência de ruído branco, a resposta em frequência e o comportamento transitório na filtragem de degraus.

---

## 1. Modelo de Sinal e Ruído Aditivo

Considere um sinal discreto observado $x[n]$ modelado como a superposição de uma componente determinística de interesse $s[n]$ e um processo estocástico de ruído aditivo $w[n]$:

$$
x[n] = s[n] + w[n]
$$

### Hipóteses Estatísticas do Ruído Branco
O ruído $w[n]$ satisfaz as seguintes propriedades de ruído branco de banda larga (*White Noise*):

#### Média Nula
O processo tem esperança matemática zero em todos os instantes:

$$
\mathbb{E}[w[n]] = 0, \quad \forall n
$$

#### Variância Constante
A potência média do ruído é estacionária:

$$
\text{Var}(w[n]) = \sigma_w^2
$$

#### Descorrelação Temporal
A autocovariância é proporcional ao delta de Kronecker $\delta[k]$:

$$
\gamma_{ww}[k] = \mathbb{E}[w[n] w[n-k]] = \sigma_w^2 \delta[k]
$$

---

## 2. Dedução Analítica da Redução de Variância

Seja a operação da média móvel causal de $M$ pontos aplicada sobre o sinal:

$$
y[n] = \frac{1}{M} \sum_{k=0}^{M-1} x[n-k] = \frac{1}{M} \sum_{k=0}^{M-1} s[n-k] + \frac{1}{M} \sum_{k=0}^{M-1} w[n-k]
$$

Definindo o componente de ruído na saída como $w_{\text{out}}[n] = \frac{1}{M} \sum_{k=0}^{M-1} w[n-k]$, calculamos seu valor esperado:

$$
\mathbb{E}[w_{\text{out}}[n]] = \frac{1}{M} \sum_{k=0}^{M-1} \mathbb{E}[w[n-k]] = 0
$$

A variância do ruído filtrado é obtida por:

$$
\sigma_{\text{out}}^2 = \mathbb{E}\left[\left(\frac{1}{M} \sum_{k=0}^{M-1} w[n-k]\right)^2\right] = \frac{1}{M^2} \sum_{j=0}^{M-1} \sum_{k=0}^{M-1} \mathbb{E}[w[n-j] w[n-k]]
$$

Pela propriedade de descorrelação temporal, $\mathbb{E}[w[n-j] w[n-k]] = \sigma_w^2 \delta[j - k]$. Portanto, apenas os $M$ termos da diagonal principal ($j = k$) são não nulos:

$$
\sigma_{\text{out}}^2 = \frac{1}{M^2} \sum_{k=0}^{M-1} \sigma_w^2 = \frac{M \sigma_w^2}{M^2} = \frac{\sigma_w^2}{M}
$$

Este resultado prova rigorosamente que a potência de ruído branco é reduzida exatamente por um fator $M$. O desvio padrão do ruído residual cai proporcionalmente a $1/\sqrt{M}$:

$$
\sigma_{\text{out}} = \frac{\sigma_w}{\sqrt{M}}
$$

O ganho na Relação Sinal-Ruído (SNR) é expresso em decibéis como:

$$
\Delta \text{SNR} = 10 \log_{10}\left(\frac{\sigma_w^2}{\sigma_{\text{out}}^2}\right) = 10 \log_{10}(M) \text{ dB}
$$

---

## 3. Resposta em Frequência (DTFT) e o Núcleo Sinc

A resposta ao impulso discreta do filtro FIR de média móvel é dada por:

$$
h[n] = \frac{1}{M} \sum_{k=0}^{M-1} \delta[n - k]
$$

Calculando a Transformada de Fourier de Tempo Discreto (DTFT):

$$
H(e^{j\omega}) = \sum_{n=-\infty}^{\infty} h[n] e^{-j\omega n} = \frac{1}{M} \sum_{n=0}^{M-1} e^{-j\omega n}
$$

Utilizando a soma da progressão geométrica finita com razão $q = e^{-j\omega}$:

$$
H(e^{j\omega}) = \frac{1}{M} \frac{1 - e^{-j\omega M}}{1 - e^{-j\omega}}
$$

Fatorando os termos de meia fase no numerador e denominador:

$$
1 - e^{-j\omega M} = e^{-j\omega M / 2} \left(e^{j\omega M / 2} - e^{-j\omega M / 2}\right) = 2j e^{-j\omega M / 2} \sin\left(\frac{\omega M}{2}\right)
$$

$$
1 - e^{-j\omega} = e^{-j\omega / 2} \left(e^{j\omega / 2} - e^{-j\omega / 2}\right) = 2j e^{-j\omega / 2} \sin\left(\frac{\omega}{2}\right)
$$

Substituindo de volta na equação de transferência:

$$
H(e^{j\omega}) = \frac{1}{M} \frac{\sin(\omega M / 2)}{\sin(\omega / 2)} e^{-j\omega \frac{M-1}{2}}
$$

### Propriedades da Resposta em Frequência

#### Ganho em Baixas Frequências
Pela regra de L'Hôpital para $\omega \to 0$:

$$
\lim_{\omega \to 0} |H(e^{j\omega})| = 1 \quad (0 \text{ dB})
$$

#### Primeiro Nulo Espectral
Ocorre quando o argumento do seno no numerador atinge $\pi$:

$$
\frac{\omega_0 M}{2} = \pi \implies \omega_0 = \frac{2\pi}{M}
$$

#### Rejeição em Altas Frequências
O filtro atua como passa-baixas (*low-pass*), mas possui lóbulos secundários com atenuação assintótica de apenas $-13.3\text{ dB}$, tornando-o subótimo quando o objetivo exclusivo é a seletividade em frequência, porém excelente para filtragem no domínio do tempo.

---

## 4. Resposta ao Degrau e Tempo de Subida

Ao aplicar um degrau ideal unitário $s[n] = u[n]$, a resposta do filtro é a convolução com $h[n]$:

$$
y_{\text{degrau}}[n] = \sum_{k=-\infty}^{\infty} u[k] h[n - k] = \sum_{k=0}^{n} h[k]
$$

Para $0 \le n \lt M$, a saída cresce linearmente como uma rampa:

$$
y_{\text{degrau}}[n] = \frac{n + 1}{M}
$$

Para $n \ge M - 1$, a saída atinge o patamar estável $y_{\text{degrau}}[n] = 1$.

Portanto, o tempo de subida total de $0\%$ a $100\%$ é de exatamente $M$ amostras:

$$
t_r = M \cdot T_s
$$

O atraso de grupo $\tau_g = \frac{M - 1}{2}$ coincide exatamente com o instante no qual o degrau atinge $50\%$ da sua amplitude final, demonstrando a perfeita consistência geométrica entre a resposta no tempo e a derivada de fase linear.

---

## 5. Teoria e Dedução do Filtro de Kalman (1D)

O filtro de Kalman aborda o problema de filtragem sob a ótica da estimação estatística ótima em espaço de estados. Para um sinal degrau sob ruído aditivo, o modelo escalar é:

$$
x_k = x_{k-1} + w_k, \quad w_k \sim \mathcal{N}(0, Q)
$$

$$
z_k = x_k + v_k, \quad v_k \sim \mathcal{N}(0, R)
$$

Onde $Q$ representa a incerteza do processo (permitindo saltos transitórios de degrau) e $R = \sigma_w^2$ é a covariância do ruído de observação.

### Dedução do Ganho de Kalman Ótimo ($K_k$)
A estimativa a posteriori é procurada como uma combinação linear da estimativa a priori $\hat{x}_k^-$ e da nova medição $z_k$:

$$
\hat{x}_k = \hat{x}_k^- + K_k (z_k - \hat{x}_k^-) = (1 - K_k) \hat{x}_k^- + K_k z_k
$$

O erro de estimação resultante é dado por:

$$
e_k = x_k - \hat{x}_k = x_k - \left[\hat{x}_k^- + K_k (x_k + v_k - \hat{x}_k^-)\right] = (1 - K_k)(x_k - \hat{x}_k^-) - K_k v_k
$$

Calculando a covariância do erro $P_k = \mathbb{E}[e_k^2]$, sabendo que o erro a priori $e_k^- = x_k - \hat{x}_k^-$ e o ruído de medição $v_k$ são mutuamente descorrelacionados:

$$
P_k = (1 - K_k)^2 P_k^- + K_k^2 R
$$

Para encontrar o ganho $K_k$ que minimiza o Erro Quadrático Médio (MMSE), derivamos $P_k$ em relação a $K_k$ e igualamos a zero:

$$
\frac{dP_k}{dK_k} = -2(1 - K_k) P_k^- + 2 K_k R = 0
$$

$$
-P_k^- + K_k (P_k^- + R) = 0 \implies K_k = \frac{P_k^-}{P_k^- + R}
$$

Substituindo $K_k$ de volta na equação de covariância, obtém-se a forma canônica reduzida:

$$
P_k = (1 - K_k) P_k^-
$$

### Vantagem Dinâmica no Sinal Degrau
Nos trechos patamares onde o sinal é constante, $P_k$ decresce rapidamente para um valor mínimo de regime permanente, fazendo $K_k$ diminuir e atenuando o ruído tão eficientemente quanto uma média móvel de janela longa. Durante a transição abrupta do degrau, o resíduo $(z_k - \hat{x}_k^-)$ torna-se grande, acelerando a correção do estado sem a latência simétrica inerente à média móvel.

---

## 6. Denoising por Transformada Wavelet (DWT Multi-escala)

Ao contrário das transformadas de Fourier e das médias temporais puras, a Transformada Wavelet Discreta (DWT) opera com localização conjunta no tempo e na frequência, decomponto o sinal em bases ortogonais de suporte compacto.

### Decomposição Piramidal de Mallat
Em cada nível de escala $j$, o sinal passa por um banco de filtros espelho em quadratura (QMF) seguido de dizimação por $2$:

$$
a_j[k] = \sum_n a_{j-1}[n] h_0[2k - n] \quad (\text{Coeficientes de Aproximacao})
$$

$$
d_j[k] = \sum_n a_{j-1}[n] h_1[2k - n] \quad (\text{Coeficientes de Detalhe})
$$

### Propriedade de Esparsidade do Degrau
Um sinal degrau é extremamente suave em quase todo o domínio, com uma única descontinuidade isolada. Portanto:
- O ruído branco de entrada distribui-se uniformemente por todos os coeficientes de detalhe $d_j[k]$ com amplitudes baixas proporcionais a $\sigma_w$.
- O degrau gera coeficientes de detalhe de altíssima magnitude concentrados exclusivamente na coordenada temporal do salto.

### Estimador Robusto MAD e Limiar VisuShrink
Donoho e Johnstone (1994) demonstraram que o desvio padrão do ruído pode ser estimado de forma imune a saltos determinísticos pela mediana dos desvios absolutos (MAD) no primeiro nível:

$$
\hat{\sigma} = \frac{\text{mediana}(|d_1|)}{0.6745}
$$

O limiar universal assintótico de VisuShrink que garante ausência de artefatos espúrios com probabilidade tendendo a $1$ quando $N \to \infty$ é:

$$
\lambda = \hat{\sigma} \sqrt{2 \ln(N)}
$$

Aplicando a limiarização suave (*Soft-Thresholding*):

$$
\eta_{\text{soft}}(d, \lambda) = \text{sgn}(d) \cdot \max(0, |d| - \lambda)
$$

Reconstruindo o sinal via Transformada Wavelet Inversa (IDWT), os patamares têm o ruído branco removido, enquanto o salto do degrau é reconstituído em uma única amostra ($t_r \approx 1$), superando a limitação fundamental de dispersão temporal da média móvel.
