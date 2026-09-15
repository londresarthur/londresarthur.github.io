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
