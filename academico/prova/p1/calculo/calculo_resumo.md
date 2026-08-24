<a id="topo"></a>

---
> **Navegação Rápida:**  
> [⬅️ Voltar ao README](../README.md) | [📘 Resumo Teórico](./calculo_resumo.md) | [⚡ Macetes Algébricos](./calculo_macetes.md) | [📐 Taylor (1 e 2 var)](./calculo_taylor.md) | [🎯 Roteiro de Resolução](./calculo_roteiro.md) | [📝 Lista de Exercícios](./calculo_exercicios.md) | [🚨 Plano de Emergência](../plano_estudos_emergencia.md)
---

# Resumo Teórico: Séries de Potências e Convergência (Cálculo II)

> [!IMPORTANT]
> **Objetivo:** Dominar os conceitos essenciais de Séries de Potências, Raio de Convergência, Intervalo de Convergência e Testes de Convergência para a prova.

---

## 1. O que é uma Série de Potências?

Uma **Série de Potências** centrada em $x_0$ é uma série da forma:

$$
\sum_{n=0}^{\infty} c_n (x - x_0)^n = c_0 + c_1(x - x_0) + c_2(x - x_0)^2 + \dots
$$

- $c_n$: coeficientes da série.
- $x_0$: centro da série (frequentemente $x_0 = 0$).
- $x$: variável real.

---

## 2. Teorema Fundamental da Convergência de Séries de Potências

> [!NOTE]
> Para qualquer série de potências $\sum_{n=0}^{\infty} c_n (x - x_0)^n$, ocorre exatamente **uma** das três situações a seguir:

1. A série converge **apenas** em $x = x_0$ (Raio de convergência $R = 0$).
2. A série converge **absolutamente** para todos os números reais $x \in (-\infty, \infty)$ (Raio de convergência $R = \infty$).
3. Existe um número positivo $R > 0$ (o **Raio de Convergência**) tal que:
   - A série converge absolutamente para $|x - x_0| < R$, ou seja, $x \in (x_0 - R, x_0 + R)$.
   - A série diverge para $|x - x_0| > R$.
   - Nas extremidades $x = x_0 - R$ e $x = x_0 + R$, a série pode convergir ou divergir (deve ser testada separadamente!).

---

## 3. Testes Principais para Determinar o Raio de Convergência

### A) Teste da Razão (D'Alembert)
Dada a série $\sum u_n(x)$, calcula-se o limite da razão entre termos consecutivos:

$$
L = \lim_{n \to \infty} \left| \frac{u_{n+1}(x)}{u_n(x)} \right|
$$

- Se $L < 1$: a série converge absolutamente.
- Se $L > 1$: a série diverge.
- Se $L = 1$: o teste é inconclusivo (utilizado para achar a condição sobre $x$).

Se a série for escrita na forma $\sum c_n (x - x_0)^n$, o raio $R$ é dado por:

$$
R = \lim_{n \to \infty} \left| \frac{c_n}{c_{n+1}} \right|
$$

### B) Teste da Raiz (Cauchy)

$$
L = \lim_{n \to \infty} \sqrt[n]{|u_n(x)|}
$$

Ou para o raio $R$:

$$
R = \frac{1}{\limsup_{n \to \infty} \sqrt[n]{|c_n|}}
$$

### C) Séries Geométricas
Uma série da forma $\sum_{n=0}^{\infty} a \cdot r^n$ converge se e somente se $|r| < 1$. Sua soma é $S = \frac{a}{1 - r}$.

---

## 4. Análise de Fronteira (Extremidades do Intervalo)

> [!TIP]
> Quando temos a região de convergência interior $x \in (x_0 - R, x_0 + R)$, devemos obrigatoriamente testar os pontos finais:

1. Substituir $x = x_0 - R$ na série original e testar a série numérica resultante (usando Teste das Séries Alternadas, Teste da Comparação, Série $p$, etc.).
2. Substituir $x = x_0 + R$ na série original e testar a série numérica resultante.

### Resumo dos Principais Testes de Séries Numéricas para as Fronteiras:
- **Série $p$ ($\sum \frac{1}{n^p}$):** Converge se $p > 1$, diverge se $p \le 1$.
- **Teste das Séries Alternadas (Leibniz):** $\sum (-1)^n b_n$ converge se $b_n \ge 0$, $b_{n+1} \le b_n$ e $\lim_{n \to \infty} b_n = 0$.
- **Teste do Termo Geral (Divergência):** Se $\lim_{n \to \infty} a_n \neq 0$, a série diverge imediatamente.

---
> **Navegação Rápida:**  
> [⬅️ Voltar ao README](../README.md) | [📘 Resumo Teórico](./calculo_resumo.md) | [⚡ Macetes Algébricos](./calculo_macetes.md) | [🎯 Roteiro de Resolução](./calculo_roteiro.md) | [📝 Lista de Exercícios](./calculo_exercicios.md) | [🔝 Voltar ao Topo](#topo)
