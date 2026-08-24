# Resoluções Completas e Análise de Considerações Adotadas

> **Guia de Resoluções Práticas: EDOs de 1ª e 2ª Ordem (Escalares e Vetoriais) via Método de Euler e Taylor de 2ª Ordem**

---

## Sumário das Resoluções e Conceitos

1. [Entendendo as Considerações Adotadas ($t_0$ e $y_0$)](#1-entendendo-as-considerações-adotadas-t_0-e-y_0)
2. [Guia de Redução de EDOs de 2ª Ordem para Sistemas de 1ª Ordem](#2-guia-de-redução-de-edos-de-2ª-ordem-para-sistemas-de-1ª-ordem)
3. [Exemplo 1: EDO de 1ª Ordem Escalar Linear](#3-exemplo-1-edo-de-1ª-ordem-escalar-linear)
4. [Exemplo 2: EDO de 1ª Ordem Vetorial (Sistema 2×2)](#4-exemplo-2-edo-de-1ª-ordem-vetorial-sistema-2x2)
5. [Exemplo 3: EDO de 2ª Ordem Escalar Reduzida (Oscilador Amortecido)](#5-exemplo-3-edo-de-2ª-ordem-escalar-reduzida-a-sistema)
6. [Exemplo 4: EDO de 2ª Ordem Vetorial / Sistema 4D (Massas Acopladas)](#6-exemplo-4-edo-de-2ª-ordem-vetorial-sistema-4d-massas-acopladas)
7. [Exemplo 5: EDO de 1ª Ordem Escalar via Método de Taylor de 2ª Ordem](#7-exemplo-5-edo-de-1ª-ordem-escalar-via-método-de-taylor-de-2ª-ordem)
8. [Exemplo 6: EDO de 2ª Ordem Não-Linear (Pêndulo Simples)](#8-exemplo-6-edo-de-2ª-ordem-escalar-não-linear-pêndulo-simples)

---

## 1. Entendendo as Considerações Adotadas ($t_0$ e $y_0$)

### O que são $t_0$ e $y_0$?

Uma Equação Diferencial Ordinária (EDO) indica apenas a **regra de variação** da quantidade investigada. Ela **não sabe onde você está**, apenas **para onde você vai**.

Por isso, uma EDO sozinha possui infinitas soluções possíveis — uma "família de curvas", representadas pela constante $+C$ da integração.

A condição inicial $y(t_0) = y_0$ é a **âncora física e geométrica**:
- **$t_0$**: instante de início da simulação/experimento (normalmente $t_0 = 0$).
- **$y_0$**: estado inicial da variável (posição inicial, temperatura inicial, população inicial...).

### Para EDOs de 2ª Ordem:

Uma EDO de 2ª ordem exige duas condições iniciais no tempo $t_0$:

$$\mathbf{u}_0 = \begin{bmatrix} y(t_0) \\ y'(t_0) \end{bmatrix} = \begin{bmatrix} y_0 \\ y'_0 \end{bmatrix}$$

Isto é, a **posição inicial** e a **velocidade inicial**.

---

## 2. Guia de Redução de EDOs de 2ª Ordem para Sistemas de 1ª Ordem

Sempre que a EDO for de 2ª ordem no formato $y'' = g(t, y, y')$, defina:
- $u_1 = y$ (posição)
- $u_2 = y'$ (velocidade)

O sistema equivalente de 1ª ordem é:

$$\begin{cases} u_1' = u_2 \\ u_2' = g(t, u_1, u_2) \end{cases}, \quad \text{com } \mathbf{u}(t_0) = \begin{bmatrix} y(t_0) \\ y'(t_0) \end{bmatrix}$$

---

## 3. Exemplo 1: EDO de 1ª Ordem Escalar Linear

**EDO e Condições:**

$$\begin{cases} y' = 2t - y, \quad t \in [0, 0.3] \\ y(0) = 1 \end{cases}, \quad h = 0.1$$

- **Consideração adotada**: $t_0 = 0.0,\ y_0 = 1.0$
- **Solução Exata**: $y(t) = 2t - 2 + 3e^{-t}$
- **Recorrência de Euler**: $y_{n+1} = y_n + 0.1 \times (2t_n - y_n)$

**Resolução Passo a Passo:**

**Passo 0** ($t_0 = 0.0,\ y_0 = 1.0$):

$$f(0.0,\ 1.0) = 2(0.0) - 1.0 = -1.000000$$

$$\Delta y = 0.1 \times (-1.000000) = -0.100000$$

$$y_1 = 1.000000 - 0.100000 = \mathbf{0.900000}$$

$$y_{\text{exato}}(0.1) = 2(0.1) - 2 + 3e^{-0.1} = \mathbf{0.914512} \quad (E_{\text{abs}} = 0.014512)$$

---

**Passo 1** ($t_1 = 0.1,\ y_1 = 0.9$):

$$f(0.1,\ 0.9) = 2(0.1) - 0.9 = -0.700000$$

$$\Delta y = 0.1 \times (-0.700000) = -0.070000$$

$$y_2 = 0.900000 - 0.070000 = \mathbf{0.830000}$$

$$y_{\text{exato}}(0.2) = 2(0.2) - 2 + 3e^{-0.2} = \mathbf{0.856192} \quad (E_{\text{abs}} = 0.026192)$$

---

**Passo 2** ($t_2 = 0.2,\ y_2 = 0.83$):

$$f(0.2,\ 0.83) = 2(0.2) - 0.83 = -0.430000$$

$$\Delta y = 0.1 \times (-0.430000) = -0.043000$$

$$y_3 = 0.830000 - 0.043000 = \mathbf{0.787000}$$

$$y_{\text{exato}}(0.3) = 2(0.3) - 2 + 3e^{-0.3} = \mathbf{0.822454} \quad (E_{\text{abs}} = 0.035454)$$

---

## 4. Exemplo 2: EDO de 1ª Ordem Vetorial (Sistema 2×2)

**EDO e Condições:**

$$\begin{cases} y_1' = y_2 \\ y_2' = -y_1 \end{cases}, \quad
\mathbf{y}(0) = \begin{bmatrix} 1 \\ 0 \end{bmatrix}, \quad h = 0.1$$

- **Consideração física**: Oscilador harmônico simples. Posição inicial $y_1(0) = 1$ (deslocado) e velocidade inicial $y_2(0) = 0$ (solto do repouso).
- **Solução Exata**: $y_1(t) = \cos(t),\ y_2(t) = -\sin(t)$

**Resolução Passo a Passo:**

**Passo 0** ($t_0 = 0.0$): $\mathbf{y}_0 = \begin{bmatrix} 1.0 \\ 0.0 \end{bmatrix}$

$$\mathbf{f}(0, \mathbf{y}_0) = \begin{bmatrix} 0.0 \\ -1.0 \end{bmatrix} \implies \Delta\mathbf{y} = 0.1 \begin{bmatrix} 0.0 \\ -1.0 \end{bmatrix} = \begin{bmatrix} 0.000 \\ -0.100 \end{bmatrix}$$

$$\mathbf{y}_1 = \begin{bmatrix} 1.0 \\ 0.0 \end{bmatrix} + \begin{bmatrix} 0.0 \\ -0.1 \end{bmatrix} = \mathbf{\begin{bmatrix} 1.000000 \\ -0.100000 \end{bmatrix}}$$

$$\text{Exato em } t=0.1: \begin{bmatrix} \cos(0.1) \\ -\sin(0.1) \end{bmatrix} = \begin{bmatrix} 0.995004 \\ -0.099833 \end{bmatrix}$$

---

**Passo 1** ($t_1 = 0.1$): $\mathbf{y}_1 = \begin{bmatrix} 1.0 \\ -0.1 \end{bmatrix}$

$$\mathbf{f}(0.1, \mathbf{y}_1) = \begin{bmatrix} -0.1 \\ -1.0 \end{bmatrix} \implies \Delta\mathbf{y} = 0.1 \begin{bmatrix} -0.1 \\ -1.0 \end{bmatrix} = \begin{bmatrix} -0.010 \\ -0.100 \end{bmatrix}$$

$$\mathbf{y}_2 = \begin{bmatrix} 1.0 \\ -0.1 \end{bmatrix} + \begin{bmatrix} -0.01 \\ -0.10 \end{bmatrix} = \mathbf{\begin{bmatrix} 0.990000 \\ -0.200000 \end{bmatrix}}$$

$$\text{Exato em } t=0.2: \begin{bmatrix} \cos(0.2) \\ -\sin(0.2) \end{bmatrix} = \begin{bmatrix} 0.980067 \\ -0.198669 \end{bmatrix}$$

---

## 5. Exemplo 3: EDO de 2ª Ordem Escalar Reduzida a Sistema

**EDO e Condições:**

$$\begin{cases} y'' + 3y' + 2y = 0 \\ y(0) = 1, \quad y'(0) = 0 \end{cases}, \quad h = 0.1$$

- **Consideração física**: Sistema mecânico amortecido solto da posição $y = 1$ com velocidade inicial zero.

**Redução para Sistema 1ª Ordem:** seja $u_1 = y$ e $u_2 = y'$:

$$\begin{cases} u_1' = u_2 \\ u_2' = -2u_1 - 3u_2 \end{cases}, \quad \mathbf{u}_0 = \begin{bmatrix} 1 \\ 0 \end{bmatrix}$$

**Resolução Passo a Passo:**

**Passo 0** ($t_0 = 0.0$): $u_{1,0} = 1.0,\ u_{2,0} = 0.0$

$$u_1' = 0.0, \quad u_2' = -2(1.0) - 3(0.0) = -2.0$$

$$u_{1,1} = 1.0 + 0.1(0.0) = \mathbf{1.000000} \quad \text{(Posição em } t=0.1\text{)}$$

$$u_{2,1} = 0.0 + 0.1(-2.0) = \mathbf{-0.200000} \quad \text{(Velocidade em } t=0.1\text{)}$$

---

**Passo 1** ($t_1 = 0.1$): $u_{1,1} = 1.0,\ u_{2,1} = -0.2$

$$u_1' = -0.2, \quad u_2' = -2(1.0) - 3(-0.2) = -1.4$$

$$u_{1,2} = 1.0 + 0.1(-0.2) = \mathbf{0.980000} \quad \text{(Posição em } t=0.2\text{)}$$

$$u_{2,2} = -0.2 + 0.1(-1.4) = \mathbf{-0.340000} \quad \text{(Velocidade em } t=0.2\text{)}$$

---

## 6. Exemplo 4: EDO de 2ª Ordem Vetorial / Sistema 4D (Massas Acopladas)

**EDO e Condições:**

$$\begin{cases} x'' = -2x + y \\ y'' = x - 2y \end{cases}, \quad
\begin{cases} x(0)=1, & x'(0)=0 \\ y(0)=0, & y'(0)=0 \end{cases}, \quad h = 0.1$$

- **Consideração física**: Massa 1 ($x$) puxada e solta; massa 2 ($y$) em repouso na origem.

**Vetor de Estado 4D:**

$$\mathbf{u} = \begin{bmatrix} x \\ x' \\ y \\ y' \end{bmatrix} = \begin{bmatrix} u_1 \\ u_2 \\ u_3 \\ u_4 \end{bmatrix} \implies
\begin{cases}
u_1' = u_2 \\
u_2' = -2u_1 + u_3 \\
u_3' = u_4 \\
u_4' = u_1 - 2u_3
\end{cases}, \quad
\mathbf{u}_0 = \begin{bmatrix} 1 \\ 0 \\ 0 \\ 0 \end{bmatrix}$$

**Passo 0** ($t_0 = 0.0 \to t_1 = 0.1$):

$$\mathbf{f}(0, \mathbf{u}_0) = \begin{bmatrix} u_2 \\ -2u_1 + u_3 \\ u_4 \\ u_1 - 2u_3 \end{bmatrix} = \begin{bmatrix} 0.0 \\ -2.0 \\ 0.0 \\ 1.0 \end{bmatrix}$$

$$\mathbf{u}_1 = \begin{bmatrix} 1.0 \\ 0.0 \\ 0.0 \\ 0.0 \end{bmatrix} + 0.1 \begin{bmatrix} 0.0 \\ -2.0 \\ 0.0 \\ 1.0 \end{bmatrix} = \mathbf{\begin{bmatrix} 1.0000 \text{ (pos x)} \\ -0.2000 \text{ (vel x)} \\ 0.0000 \text{ (pos y)} \\ 0.1000 \text{ (vel y)} \end{bmatrix}}$$

---

## 7. Exemplo 5: EDO de 1ª Ordem Escalar via Método de Taylor de 2ª Ordem

**EDO e Condições:**

$$\begin{cases} y' = t \cdot y + 1 \\ y(0) = 1 \end{cases}, \quad h = 0.1$$

**Derivada Segunda Total ($y''$):**

$$y'' = \frac{d}{dt}(ty + 1) = y + t \, y' = y + t(ty + 1) = \mathbf{y(1 + t^2) + t}$$

**Fórmula de Taylor de 2ª Ordem:**

$$y_{n+1} = y_n + h \cdot y'_n + \frac{h^2}{2} \cdot y''_n$$

**Resolução Passo a Passo:**

**Passo 0** ($t_0 = 0.0,\ y_0 = 1.0$):

$$y'_0 = 0.0(1.0) + 1 = 1.000000, \quad y''_0 = 1.0(1 + 0.0^2) + 0.0 = 1.000000$$

$$y_1 = 1.0 + 0.1(1.0) + \frac{0.01}{2}(1.0) = 1.0 + 0.1 + 0.005 = \mathbf{1.105000}$$

---

**Passo 1** ($t_1 = 0.1,\ y_1 = 1.105$):

$$y'_1 = (0.1)(1.105) + 1 = 1.110500, \quad y''_1 = 1.105(1 + 0.1^2) + 0.1 = 1.216050$$

$$y_2 = 1.105 + 0.1(1.1105) + \frac{0.01}{2}(1.216050) = 1.105 + 0.11105 + 0.00608 = \mathbf{1.222130}$$

---

## 8. Exemplo 6: EDO de 2ª Ordem Escalar Não-Linear (Pêndulo Simples)

**EDO e Condições:**

$$\begin{cases}
\theta'' + \sin(\theta) = 0 \\
\theta(0) = \dfrac{\pi}{6} \approx 0.523599\text{ rad}, \quad \theta'(0) = 0
\end{cases}, \quad h = 0.1$$

- **Consideração física**: Pêndulo levantado a $30^\circ$ ($\pi/6$ rad) e solto do repouso.

**Sistema de 1ª Ordem:** seja $u_1 = \theta$ e $u_2 = \omega = \theta'$:

$$\begin{cases} u_1' = u_2 \\ u_2' = -\sin(u_1) \end{cases}$$

**Comparativo em $t = 0.1\text{ s}$:**

**Método de Euler:**

$$\theta_1^{\text{Euler}} = 0.523599 + 0.1(0.0) = \mathbf{0.523599\text{ rad}} \quad (30^\circ)$$

$$\omega_1^{\text{Euler}} = 0.0 + 0.1(-\sin(0.523599)) = \mathbf{-0.050000\text{ rad/s}}$$

---

**Método de Taylor de 2ª Ordem:**

$$u_1'' = -\sin(u_1) \implies u_{1,0}'' = -\sin(0.523599) = -0.500000$$

$$\theta_1^{\text{Taylor 2}} = 0.523599 + 0.1(0.0) + \frac{0.01}{2}(-0.500000) = \mathbf{0.521099\text{ rad}} \quad (29.85^\circ)$$

$$\omega_1^{\text{Taylor 2}} = -0.050000\text{ rad/s}$$

> **Conclusão Didática**: O Método de Euler ignorou a gravidade acelerando o pêndulo no primeiro passo (porque a velocidade inicial era zero). O Método de Taylor de 2ª Ordem incorporou a aceleração angular $u_1'' = -0.5$ e corrigiu o ângulo para $29.85^\circ$, mostrando a superioridade da expansão de Taylor!
