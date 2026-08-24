# Caderno de Exercícios Resolvidos: EDOs de 1ª e 2ª Ordem (Escalares e Vetoriais)

> **Resolução Didática Completa com Método de Euler Explícito e Método de Taylor de 2ª Ordem**

---

## Sumário dos 6 Exemplos

1. **Exemplo 1** — EDO de 1ª Ordem Escalar Linear: $y' = 2t - y$
2. **Exemplo 2** — EDO de 1ª Ordem Vetorial (Sistema 2×2 — Oscilador Harmônico Simples)
3. **Exemplo 3** — EDO de 2ª Ordem Escalar Reduzida a Sistema de 1ª Ordem (Oscilador Amortecido)
4. **Exemplo 4** — EDO de 2ª Ordem Vetorial / Sistema 4D (Massas Acopladas por Molas)
5. **Exemplo 5** — EDO de 1ª Ordem Escalar via Método de Taylor de 2ª Ordem: $y' = ty + 1$
6. **Exemplo 6** — EDO de 2ª Ordem Não-Linear (Pêndulo Simples: $\theta'' + \sin\theta = 0$)

---

## 1. Exemplo 1: EDO de 1ª Ordem Escalar Linear

### Enunciado

Considere o PVI escalar de 1ª ordem:

$$\begin{cases} y'(t) = 2t - y(t), \quad t \in [0, 0.3] \\ y(0) = 1 \end{cases}$$

Utilize o **Método de Euler Explícito** com passo $h = 0.1$ para determinar as aproximações de $y(0.1)$, $y(0.2)$ e $y(0.3)$. Compare com a solução analítica exata $y(t) = 2t - 2 + 3e^{-t}$.

---

### Ingredientes

- $f(t, y) = 2t - y$
- $t_0 = 0,\ y_0 = 1$
- $h = 0.1 \implies t_n \in \{0.0,\ 0.1,\ 0.2,\ 0.3\}$
- Fórmula de Euler: $y_{n+1} = y_n + 0.1 \times (2t_n - y_n)$

---

### Solução Passo a Passo

#### Iteração $n = 0$ ($t_0 = 0.0 \to t_1 = 0.1$)

$$t_0 = 0.0, \quad y_0 = 1.000000$$

$$f(0.0,\ 1.0) = 2(0.0) - 1.0 = -1.000000$$

$$\Delta y = 0.1 \times (-1.000000) = -0.100000$$

$$y_1 = 1.000000 + (-0.100000) = \mathbf{0.900000}$$

$$y_{\text{exato}}(0.1) = 2(0.1) - 2 + 3e^{-0.1} = 0.2 - 2 + 3(0.904837) = \mathbf{0.914512}$$

$$E_{\text{abs}} = |0.914512 - 0.900000| = \mathbf{0.014512} \quad (1.59\%)$$

---

#### Iteração $n = 1$ ($t_1 = 0.1 \to t_2 = 0.2$)

$$t_1 = 0.1, \quad y_1 = 0.900000$$

$$f(0.1,\ 0.9) = 2(0.1) - 0.9 = 0.2 - 0.9 = -0.700000$$

$$\Delta y = 0.1 \times (-0.700000) = -0.070000$$

$$y_2 = 0.900000 + (-0.070000) = \mathbf{0.830000}$$

$$y_{\text{exato}}(0.2) = 2(0.2) - 2 + 3e^{-0.2} = 0.4 - 2 + 3(0.818731) = \mathbf{0.856192}$$

$$E_{\text{abs}} = |0.856192 - 0.830000| = \mathbf{0.026192} \quad (3.06\%)$$

---

#### Iteração $n = 2$ ($t_2 = 0.2 \to t_3 = 0.3$)

$$t_2 = 0.2, \quad y_2 = 0.830000$$

$$f(0.2,\ 0.83) = 2(0.2) - 0.83 = 0.4 - 0.83 = -0.430000$$

$$\Delta y = 0.1 \times (-0.430000) = -0.043000$$

$$y_3 = 0.830000 + (-0.043000) = \mathbf{0.787000}$$

$$y_{\text{exato}}(0.3) = 2(0.3) - 2 + 3e^{-0.3} = 0.6 - 2 + 3(0.740818) = \mathbf{0.822454}$$

$$E_{\text{abs}} = |0.822454 - 0.787000| = \mathbf{0.035454} \quad (4.31\%)$$

---

### Tabela Consolidada (Exemplo 1)

| $n$ | $t_n$ | $y_n$ (Euler) | $f(t_n, y_n)$ | $\Delta y = h \cdot f$ | $y(t_n)$ (Exato) | Erro Absoluto | Erro Rel (%) |
|:---:|:-----:|:-------------:|:-------------:|:---------------------:|:----------------:|:-------------:|:------------:|
| 0 | 0.0 | 1.000000 | -1.000000 | -0.100000 | 1.000000 | 0.000000 | 0.00% |
| 1 | 0.1 | 0.900000 | -0.700000 | -0.070000 | 0.914512 | 0.014512 | 1.59% |
| 2 | 0.2 | 0.830000 | -0.430000 | -0.043000 | 0.856192 | 0.026192 | 3.06% |
| 3 | 0.3 | 0.787000 | — | — | 0.822454 | 0.035454 | 4.31% |

---

## 2. Exemplo 2: EDO de 1ª Ordem Vetorial (Sistema 2×2 Linear)

### Enunciado

Considere o sistema de 1ª ordem acoplado:

$$\begin{cases}
\dfrac{dy_1}{dt} = y_2 \\
\dfrac{dy_2}{dt} = -y_1
\end{cases}, \quad
\begin{cases} y_1(0) = 1 \\ y_2(0) = 0 \end{cases}$$

Aplique o **Método de Euler Vetorial** com $h = 0.1$ para 2 passos ($t \in [0, 0.2]$).

*Solução analítica exata*: $y_1(t) = \cos(t)$, $y_2(t) = -\sin(t)$.

---

### Formulação Vetorial

$$\mathbf{y} = \begin{bmatrix} y_1 \\ y_2 \end{bmatrix}, \quad
\mathbf{f}(t, \mathbf{y}) = \begin{bmatrix} y_2 \\ -y_1 \end{bmatrix}$$

$$\mathbf{y}_{n+1} = \mathbf{y}_n + h \cdot \mathbf{f}(t_n, \mathbf{y}_n) = \begin{bmatrix} y_{1,n} + h \cdot y_{2,n} \\ y_{2,n} - h \cdot y_{1,n} \end{bmatrix}$$

---

### Solução Passo a Passo

#### Passo 0 ($t_0 = 0.0 \to t_1 = 0.1$)

$$\mathbf{y}_0 = \begin{bmatrix} 1.000000 \\ 0.000000 \end{bmatrix}$$

$$\mathbf{f}(0, \mathbf{y}_0) = \begin{bmatrix} 0.000000 \\ -1.000000 \end{bmatrix}$$

$$\Delta\mathbf{y}_0 = 0.1 \times \begin{bmatrix} 0.0 \\ -1.0 \end{bmatrix} = \begin{bmatrix} 0.000000 \\ -0.100000 \end{bmatrix}$$

$$\mathbf{y}_1 = \begin{bmatrix} 1.000000 \\ 0.000000 \end{bmatrix} + \begin{bmatrix} 0.000000 \\ -0.100000 \end{bmatrix} = \mathbf{\begin{bmatrix} 1.000000 \\ -0.100000 \end{bmatrix}}$$

$$\mathbf{y}_{\text{exato}}(0.1) = \begin{bmatrix} \cos(0.1) \\ -\sin(0.1) \end{bmatrix} = \begin{bmatrix} 0.995004 \\ -0.099833 \end{bmatrix}$$

$$E_{y_1} = |0.995004 - 1.000000| = \mathbf{0.004996}, \quad E_{y_2} = |-0.099833 - (-0.100000)| = \mathbf{0.000167}$$

---

#### Passo 1 ($t_1 = 0.1 \to t_2 = 0.2$)

$$\mathbf{y}_1 = \begin{bmatrix} 1.000000 \\ -0.100000 \end{bmatrix}$$

$$\mathbf{f}(0.1, \mathbf{y}_1) = \begin{bmatrix} -0.100000 \\ -1.000000 \end{bmatrix}$$

$$\Delta\mathbf{y}_1 = 0.1 \times \begin{bmatrix} -0.1 \\ -1.0 \end{bmatrix} = \begin{bmatrix} -0.010000 \\ -0.100000 \end{bmatrix}$$

$$\mathbf{y}_2 = \begin{bmatrix} 1.000000 \\ -0.100000 \end{bmatrix} + \begin{bmatrix} -0.010000 \\ -0.100000 \end{bmatrix} = \mathbf{\begin{bmatrix} 0.990000 \\ -0.200000 \end{bmatrix}}$$

$$\mathbf{y}_{\text{exato}}(0.2) = \begin{bmatrix} \cos(0.2) \\ -\sin(0.2) \end{bmatrix} = \begin{bmatrix} 0.980067 \\ -0.198669 \end{bmatrix}$$

$$E_{y_1} = |0.980067 - 0.990000| = \mathbf{0.009933}, \quad E_{y_2} = |-0.198669 - (-0.200000)| = \mathbf{0.001331}$$

---

### Tabela Consolidada (Exemplo 2)

| $n$ | $t_n$ | $y_{1,n}$ (Euler) | $y_{2,n}$ (Euler) | $y_1(t_n)$ Exato | $y_2(t_n)$ Exato | Erro $y_1$ | Erro $y_2$ |
|:---:|:-----:|:-----------------:|:-----------------:|:----------------:|:----------------:|:----------:|:----------:|
| 0 | 0.0 | 1.000000 | 0.000000 | 1.000000 | 0.000000 | 0.000000 | 0.000000 |
| 1 | 0.1 | 1.000000 | -0.100000 | 0.995004 | -0.099833 | 0.004996 | 0.000167 |
| 2 | 0.2 | 0.990000 | -0.200000 | 0.980067 | -0.198669 | 0.009933 | 0.001331 |

---

## 3. Exemplo 3: EDO de 2ª Ordem Escalar Reduzida a Sistema de 1ª Ordem

### Enunciado

Considere o PVI de 2ª ordem referente a um **oscilador amortecido**:

$$\begin{cases} y'' + 3y' + 2y = 0 \\ y(0) = 1, \quad y'(0) = 0 \end{cases}$$

1. Reduza o PVI de 2ª ordem a um sistema equivalente de 1ª ordem.
2. Execute 2 passos do Método de Euler com $h = 0.1$ para aproximar $y(0.2)$ e $y'(0.2)$.

*Solução analítica exata*: $y(t) = 2e^{-t} - e^{-2t}$, $y'(t) = -2e^{-t} + 2e^{-2t}$.

---

### Passo 1: Redução de Ordem

Definimos as variáveis de estado:
- $u_1 = y$ (posição)
- $u_2 = y'$ (velocidade)

Derivando em relação ao tempo:
- $u_1' = y' = u_2$
- $u_2' = y'' = -3y' - 2y = -3u_2 - 2u_1$

O sistema vetorial de 1ª ordem resultante é:

$$\begin{bmatrix} u_1 \\ u_2 \end{bmatrix}' = \begin{bmatrix} u_2 \\ -2u_1 - 3u_2 \end{bmatrix}, \quad
\begin{bmatrix} u_1(0) \\ u_2(0) \end{bmatrix} = \begin{bmatrix} 1 \\ 0 \end{bmatrix}$$

---

### Passo 2: Relações de Euler

$$\begin{cases}
u_{1,\, n+1} = u_{1,n} + h \cdot u_{2,n} \\
u_{2,\, n+1} = u_{2,n} + h \cdot (-2u_{1,n} - 3u_{2,n})
\end{cases}$$

---

### Solução Passo a Passo

#### Passo 0 ($t_0 = 0.0 \to t_1 = 0.1$)

Condição inicial: $u_{1,0} = 1.000000,\ u_{2,0} = 0.000000$

$$u_{1,0}' = u_{2,0} = 0.000000$$

$$u_{2,0}' = -2(1.0) - 3(0.0) = -2.000000$$

$$u_{1,1} = 1.000000 + 0.1 \times 0.000000 = \mathbf{1.000000}$$

$$u_{2,1} = 0.000000 + 0.1 \times (-2.000000) = \mathbf{-0.200000}$$

Exato em $t = 0.1$:

$$y(0.1) = 2e^{-0.1} - e^{-0.2} = 2(0.904837) - 0.818731 = \mathbf{0.990943}$$

$$y'(0.1) = -2e^{-0.1} + 2e^{-0.2} = -2(0.904837) + 2(0.818731) = \mathbf{-0.172212}$$

$$E_y = |0.990943 - 1.000000| = \mathbf{0.009057}, \quad E_{y'} = |-0.172212 - (-0.200000)| = \mathbf{0.027788}$$

---

#### Passo 1 ($t_1 = 0.1 \to t_2 = 0.2$)

Estado atual: $u_{1,1} = 1.000000,\ u_{2,1} = -0.200000$

$$u_{1,1}' = u_{2,1} = -0.200000$$

$$u_{2,1}' = -2(1.000000) - 3(-0.200000) = -2.0 + 0.6 = -1.400000$$

$$u_{1,2} = 1.000000 + 0.1 \times (-0.200000) = \mathbf{0.980000}$$

$$u_{2,2} = -0.200000 + 0.1 \times (-1.400000) = \mathbf{-0.340000}$$

Exato em $t = 0.2$:

$$y(0.2) = 2e^{-0.2} - e^{-0.4} = 2(0.818731) - 0.670320 = \mathbf{0.967142}$$

$$y'(0.2) = -2e^{-0.2} + 2e^{-0.4} = -2(0.818731) + 2(0.670320) = \mathbf{-0.296822}$$

$$E_y = |0.967142 - 0.980000| = \mathbf{0.012858}, \quad E_{y'} = |-0.296822 - (-0.340000)| = \mathbf{0.043178}$$

---

### Tabela Consolidada (Exemplo 3)

| $n$ | $t_n$ | $u_{1,n}$ ($y$ Euler) | $u_{2,n}$ ($y'$ Euler) | $y(t_n)$ Exato | $y'(t_n)$ Exato | Erro $y$ | Erro $y'$ |
|:---:|:-----:|:--------------------:|:---------------------:|:--------------:|:---------------:|:--------:|:---------:|
| 0 | 0.0 | 1.000000 | 0.000000 | 1.000000 | 0.000000 | 0.000000 | 0.000000 |
| 1 | 0.1 | 1.000000 | -0.200000 | 0.990943 | -0.172212 | 0.009057 | 0.027788 |
| 2 | 0.2 | 0.980000 | -0.340000 | 0.967142 | -0.296822 | 0.012858 | 0.043178 |

---

## 4. Exemplo 4: EDO de 2ª Ordem Vetorial (Massas Acopladas)

### Enunciado

Considere o sistema acoplado de 2ª ordem para duas massas ligadas por molas:

$$\begin{cases}
x'' = -2x + y \\
y'' = x - 2y
\end{cases}, \quad
\begin{cases} x(0) = 1, & x'(0) = 0 \\ y(0) = 0, & y'(0) = 0 \end{cases}$$

1. Reduza o sistema a um sistema vetorial de 1ª ordem de dimensão 4.
2. Execute 1 passo do Método de Euler com $h = 0.1$.

---

### Passo 1: Redução para Espaço de Estados 4D

Definimos o vetor de estado:

$$\mathbf{u} = \begin{bmatrix} u_1 \\ u_2 \\ u_3 \\ u_4 \end{bmatrix} = \begin{bmatrix} x \\ x' \\ y \\ y' \end{bmatrix}$$

$$\begin{cases}
u_1' = u_2 \\
u_2' = -2u_1 + u_3 \\
u_3' = u_4 \\
u_4' = u_1 - 2u_3
\end{cases}, \quad
\mathbf{u}(0) = \begin{bmatrix} 1 \\ 0 \\ 0 \\ 0 \end{bmatrix}$$

---

### Passo 2: Execução da Iteração 0 ($t_0 = 0.0 \to t_1 = 0.1$)

**Estado Inicial:**

$$\mathbf{u}_0 = \begin{bmatrix} 1.000000 \\ 0.000000 \\ 0.000000 \\ 0.000000 \end{bmatrix}$$

**Avaliação das Derivadas $\mathbf{f}(t_0, \mathbf{u}_0)$:**

$$\begin{cases}
u_{1,0}' = u_{2,0} = 0.000000 \\
u_{2,0}' = -2(1.0) + (0.0) = -2.000000 \\
u_{3,0}' = u_{4,0} = 0.000000 \\
u_{4,0}' = (1.0) - 2(0.0) = 1.000000
\end{cases}
\implies
\mathbf{f}(0, \mathbf{u}_0) = \begin{bmatrix} 0.000000 \\ -2.000000 \\ 0.000000 \\ 1.000000 \end{bmatrix}$$

**Incremento $\Delta\mathbf{u}_0 = h \cdot \mathbf{f}(0, \mathbf{u}_0)$:**

$$\Delta\mathbf{u}_0 = 0.1 \times \begin{bmatrix} 0.0 \\ -2.0 \\ 0.0 \\ 1.0 \end{bmatrix} = \begin{bmatrix} 0.000000 \\ -0.200000 \\ 0.000000 \\ 0.100000 \end{bmatrix}$$

**Novo Estado $\mathbf{u}_1 = \mathbf{u}_0 + \Delta\mathbf{u}_0$:**

$$\mathbf{u}_1 = \begin{bmatrix} 1.000000 \\ 0.000000 \\ 0.000000 \\ 0.000000 \end{bmatrix} + \begin{bmatrix} 0.000000 \\ -0.200000 \\ 0.000000 \\ 0.100000 \end{bmatrix} = \mathbf{\begin{bmatrix} 1.000000 \\ -0.200000 \\ 0.000000 \\ 0.100000 \end{bmatrix}}$$

#### Interpretação Física em $t = 0.1$

- **Posição da massa 1** ($x$): 1.0000 — ainda não se moveu significativamente
- **Velocidade da massa 1** ($x'$): −0.2000 — começando a acelerar para a esquerda
- **Posição da massa 2** ($y$): 0.0000 — em repouso inicial
- **Velocidade da massa 2** ($y'$): +0.1000 — sendo puxada pela mola conectada à massa 1

---

## 5. Exemplo 5: EDO de 1ª Ordem Escalar via Método de Taylor de 2ª Ordem

### Enunciado

Considere a EDO escalar não-autônoma:

$$\begin{cases} y' = t \cdot y + 1 \\ y(0) = 1 \end{cases}$$

Calcule $y(0.1)$ e $y(0.2)$ utilizando o **Método de Taylor de 2ª Ordem** com $h = 0.1$.

---

### Fundamentação da Derivada Total de 2ª Ordem

A fórmula do Método de Taylor de 2ª Ordem é:

$$y_{n+1} = y_n + h \, y'_n + \frac{h^2}{2} \, y''_n$$

Sabemos que $y' = f(t, y) = ty + 1$.

Calculamos a derivada segunda total $y'' = \frac{d}{dt}(y')$ pela regra da cadeia e do produto:

$$y'' = \frac{d}{dt}(ty + 1) = 1 \cdot y + t \cdot y' + 0 = y + t(ty + 1) = \mathbf{y(1 + t^2) + t}$$

---

### Solução Passo a Passo

#### Passo 0 ($t_0 = 0.0 \to t_1 = 0.1$, com $y_0 = 1.0$)

$$y'_0 = f(0.0,\ 1.0) = (0.0)(1.0) + 1 = 1.000000$$

$$y''_0 = 1.0(1 + 0.0^2) + 0.0 = 1.000000$$

$$y_1 = y_0 + h \, y'_0 + \frac{h^2}{2} \, y''_0$$

$$y_1 = 1.000000 + (0.1)(1.000000) + \frac{(0.1)^2}{2}(1.000000)$$

$$y_1 = 1.000000 + 0.100000 + 0.005000 = \mathbf{1.105000}$$

---

#### Passo 1 ($t_1 = 0.1 \to t_2 = 0.2$, com $y_1 = 1.105$)

$$y'_1 = f(0.1,\ 1.105) = (0.1)(1.105) + 1 = 0.110500 + 1 = 1.110500$$

$$y''_1 = 1.105(1 + 0.1^2) + 0.1 = 1.105(1.01) + 0.1 = 1.116050 + 0.1 = 1.216050$$

$$y_2 = y_1 + h \, y'_1 + \frac{h^2}{2} \, y''_1$$

$$y_2 = 1.105000 + (0.1)(1.110500) + \frac{0.01}{2}(1.216050)$$

$$y_2 = 1.105000 + 0.111050 + 0.006080 = \mathbf{1.222130}$$

---

### Tabela Consolidada (Exemplo 5 — Taylor 2ª Ordem)

| $n$ | $t_n$ | $y_n$ | $y'_n = t_n y_n + 1$ | $y''_n = y_n(1+t_n^2) + t_n$ | Termo $h y'$ | Termo $\frac{h^2}{2} y''$ | $y_{n+1}$ |
|:---:|:-----:|:--------:|:--------------------:|:---------------------------:|:------------:|:------------------------:|:--------:|
| 0 | 0.0 | 1.000000 | 1.000000 | 1.000000 | 0.100000 | 0.005000 | 1.105000 |
| 1 | 0.1 | 1.105000 | 1.110500 | 1.216050 | 0.111050 | 0.006080 | 1.222130 |

---

## 6. Exemplo 6: EDO de 2ª Ordem Não-Linear (Pêndulo Simples)

### Enunciado

Considere a EDO não-linear que governa as oscilações de um **Pêndulo Simples**:

$$\begin{cases}
\theta'' + \sin(\theta) = 0 \\
\theta(0) = \dfrac{\pi}{6} \approx 0.523599\text{ rad}, \quad \theta'(0) = 0
\end{cases}$$

1. Reduza o problema a um sistema de 1ª ordem.
2. Execute 1 passo do **Método de Euler Explícito Vetorial** com $h = 0.1$.
3. Execute 1 passo do **Método de Taylor Vetorial de 2ª Ordem** com $h = 0.1$ e compare os dois resultados.

---

### Passo 1: Redução a Sistema de 1ª Ordem

Definindo $u_1 = \theta$ (ângulo) e $u_2 = \omega = \theta'$ (velocidade angular):

$$\begin{cases}
u_1' = u_2 \\
u_2' = -\sin(u_1)
\end{cases}, \quad
\begin{bmatrix} u_1(0) \\ u_2(0) \end{bmatrix} = \begin{bmatrix} \pi/6 \approx 0.523599 \\ 0 \end{bmatrix}$$

---

### Passo 2: Execução do Método de Euler (1 Passo)

**Estado Inicial:** $u_{1,0} = 0.523599$, $u_{2,0} = 0.000000$

$$u_{1,0}' = u_{2,0} = 0.000000$$

$$u_{2,0}' = -\sin(0.523599) = -0.500000$$

**Atualizações de Euler:**

$$u_{1,1}^{\text{Euler}} = 0.523599 + 0.1 \times (0.000000) = \mathbf{0.523599 \text{ rad}}$$

$$u_{2,1}^{\text{Euler}} = 0.000000 + 0.1 \times (-0.500000) = \mathbf{-0.050000 \text{ rad/s}}$$

---

### Passo 3: Execução do Método de Taylor de 2ª Ordem (1 Passo)

Para o sistema vetorial, calculamos as derivadas segundas $u_1''$ e $u_2''$:

$$u_1'' = \frac{d}{dt}(u_2) = u_2' = -\sin(u_1)$$

$$u_2'' = \frac{d}{dt}(-\sin(u_1)) = -\cos(u_1) \cdot u_1' = -u_2 \cos(u_1)$$

Avaliando em $t_0$:

$$u_{1,0}'' = -\sin(0.523599) = -0.500000$$

$$u_{2,0}'' = -(0.0) \times \cos(0.523599) = 0.000000$$

**Para a Posição Angular $u_1$:**

$$u_{1,1}^{\text{Taylor 2}} = u_{1,0} + h \cdot u_{1,0}' + \frac{h^2}{2} \cdot u_{1,0}''$$

$$u_{1,1}^{\text{Taylor 2}} = 0.523599 + (0.1)(0.000000) + \frac{0.01}{2}(-0.500000)$$

$$u_{1,1}^{\text{Taylor 2}} = 0.523599 + 0.000000 - 0.002500 = \mathbf{0.521099 \text{ rad}}$$

**Para a Velocidade Angular $u_2$:**

$$u_{2,1}^{\text{Taylor 2}} = u_{2,0} + h \cdot u_{2,0}' + \frac{h^2}{2} \cdot u_{2,0}''$$

$$u_{2,1}^{\text{Taylor 2}} = 0.000000 + (0.1)(-0.500000) + \frac{0.01}{2}(0.000000) = \mathbf{-0.050000 \text{ rad/s}}$$

---

### Comparação Crítica em $t = 0.1\text{ s}$

| Variável | Euler (Ordem 1) | Taylor 2ª Ordem | Diferença / Impacto da Curvatura |
|:---:|:---:|:---:|:---|
| **Ângulo** $\theta(0.1)$ | 0.523599 rad (30.00°) | **0.521099 rad (29.85°)** | Euler ignora que o pêndulo começou a acelerar para baixo desde o instante zero! |
| **Velocidade** $\omega(0.1)$ | -0.050000 rad/s | **-0.050000 rad/s** | Coincidem no 1º passo porque $u_2''(0) = 0$ quando $\omega(0)=0$. |

> **Conclusão Didática**: O Método de Euler assumiu erroneamente que a posição angular não se alterou no primeiro passo ($\theta_1 = \theta_0$), pois a velocidade inicial era zero. O Método de Taylor de 2ª ordem percebeu a gravidade atuando ($u_1'' = -\sin\theta_0 = -0.5$) e corrigiu a posição para $0.521099\text{ rad}$, demonstrando por que Taylor de 2ª ordem é mais fiel à física do problema!
