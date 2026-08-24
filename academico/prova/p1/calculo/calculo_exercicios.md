<a id="topo"></a>

---
> **Navegação Rápida:**  
> [⬅️ Voltar ao README](../README.md) | [📘 Resumo Teórico](./calculo_resumo.md) | [⚡ Macetes Algébricos](./calculo_macetes.md) | [🎯 Roteiro de Resolução](./calculo_roteiro.md) | [📝 Lista de Exercícios](./calculo_exercicios.md) | [🚨 Plano de Emergência](../plano_estudos_emergencia.md)
---

# Lista de Exercícios Resolvidos: Cálculo II (Questões 1 a 3)

> [!NOTE]
> **Material Didático de Resolução Completa:** Todas as resoluções contêm justificativas passo a passo, identificação do centro, raio de convergência e análise das extremidades.

---

## Questão 1
**Para cada uma das séries abaixo, determine seu intervalo de convergência.**

### (a) $\sum_{n=0}^{\infty} \frac{(-1)^n n^2 x^{3n}}{n! 2^{n+1}}$

#### **Resolução Passo a Passo:**

1. **Identificação do termo geral:**

$$
u_n(x) = \frac{(-1)^n n^2 x^{3n}}{n! 2^{n+1}}
$$

2. **Aplicação do Teste da Razão:**

$$
\left| \frac{u_{n+1}(x)}{u_n(x)} \right| = \left| \frac{(-1)^{n+1} (n+1)^2 x^{3(n+1)}}{(n+1)! 2^{(n+1)+1}} \cdot \frac{n! 2^{n+1}}{(-1)^n n^2 x^{3n}} \right|
$$

3. **Simplificação Algébrica:**
   - Termo alternado: $|(-1)^{n+1} / (-1)^n| = 1$.
   - Variável $x$: $\left| \frac{x^{3n+3}}{x^{3n}} \right| = |x|^3$.
   - Fatorial: $\frac{n!}{(n+1)!} = \frac{n!}{(n+1)n!} = \frac{1}{n+1}$.
   - Potências de 2: $\frac{2^{n+1}}{2^{n+2}} = \frac{1}{2}$.
   - Fator polinomial: $\frac{(n+1)^2}{n^2}$.

   Juntando os termos:

$$
\left| \frac{u_{n+1}(x)}{u_n(x)} \right| = \left( \frac{n+1}{n} \right)^2 \cdot \frac{1}{n+1} \cdot \frac{1}{2} \cdot |x|^3 = \frac{n+1}{n^2} \cdot \frac{|x|^3}{2}
$$

4. **Cálculo do Limite $L$:**

$$
L = \lim_{n \to \infty} \left| \frac{u_{n+1}(x)}{u_n(x)} \right| = \lim_{n \to \infty} \left( \frac{n+1}{n^2} \right) \frac{|x|^3}{2} = 0 \cdot \frac{|x|^3}{2} = 0
$$

5. **Conclusão:**
   Como $L = 0 < 1$ para todo $x \in \mathbb{R}$, o Teste da Razão garante a convergência absoluta em toda a reta real.

> [!IMPORTANT]
> - **Raio de Convergência ($R$):** $R = \infty$
> - **Intervalo de Convergência:** $(-\infty, \infty)$ ou $\mathbb{R}$

---

### (b) $\sum_{n=0}^{\infty} \frac{x^{2n+1}}{4^{2n+1}}$

#### **Resolução Passo a Passo:**

1. **Método 1: Reconhecimento de Série Geométrica**
   Reescrevendo a série:

$$
\sum_{n=0}^{\infty} \frac{x^{2n+1}}{4^{2n+1}} = \sum_{n=0}^{\infty} \left( \frac{x}{4} \right)^{2n+1} = \frac{x}{4} \sum_{n=0}^{\infty} \left( \frac{x^2}{16} \right)^n
$$

   Esta é uma série geométrica com razão $r = \frac{x^2}{16}$.
   A série geométrica converge se e somente se $|r| < 1$:

$$
\left| \frac{x^2}{16} \right| < 1 \iff x^2 < 16 \iff |x| < 4 \iff -4 < x < 4
$$

2. **Método 2: Teste da Razão (Confirmação)**

$$
u_n(x) = \frac{x^{2n+1}}{4^{2n+1}}
$$

$$
\left| \frac{u_{n+1}(x)}{u_n(x)} \right| = \left| \frac{x^{2(n+1)+1}}{4^{2(n+1)+1}} \cdot \frac{4^{2n+1}}{x^{2n+1}} \right| = \left| \frac{x^{2n+3}}{x^{2n+1}} \cdot \frac{4^{2n+1}}{4^{2n+3}} \right| = \frac{|x|^2}{4^2} = \frac{x^2}{16}
$$

   $L = \lim_{n \to \infty} \frac{x^2}{16} = \frac{x^2}{16}$. Impondo $L < 1 \implies \frac{x^2}{16} < 1 \implies -4 < x < 4$.

3. **Análise das Extremidades ($x = \pm 4$):**
   - Para $x = 4$: $\sum_{n=0}^{\infty} \frac{4^{2n+1}}{4^{2n+1}} = \sum_{n=0}^{\infty} 1 = 1 + 1 + 1 + \dots$ (Diverge, $\lim 1 \neq 0$).
   - Para $x = -4$: $\sum_{n=0}^{\infty} \frac{(-4)^{2n+1}}{4^{2n+1}} = \sum_{n=0}^{\infty} (-1) = -1 - 1 - 1 - \dots$ (Diverge, $\lim (-1) \neq 0$).

> [!IMPORTANT]
> - **Raio de Convergência ($R$):** $R = 4$
> - **Intervalo de Convergência:** $(-4, 4)$

---

## Questão 2
**Determine os valores de $x$ para os quais a série a seguir é convergente:**

$$
\sum_{n=0}^{\infty} \frac{(x-2)^{2n}}{4^n}
$$

#### **Resolução Passo a Passo:**

1. **Reorganização do termo geral:**

$$
u_n(x) = \frac{(x-2)^{2n}}{4^n} = \left[ \frac{(x-2)^2}{4} \right]^n
$$

2. **Aplicação do Critério da Série Geométrica:**
   A série é do tipo $\sum r^n$, com $r = \frac{(x-2)^2}{4}$.
   Uma série geométrica converge se e somente se $|r| < 1$.

3. **Resolução da Inequação:**

$$
\left| \frac{(x-2)^2}{4} \right| < 1 \iff \frac{(x-2)^2}{4} < 1 \iff (x-2)^2 < 4
$$

$$
\iff |x - 2| < 2
$$

$$
-2 < x - 2 < 2 \iff 0 < x < 4
$$

4. **Teste das Extremidades:**
   - Se $x = 0$: $r = \frac{(0-2)^2}{4} = \frac{4}{4} = 1 \implies \sum_{n=0}^{\infty} 1^n = \sum 1$ (Diverge).
   - Se $x = 4$: $r = \frac{(4-2)^2}{4} = \frac{4}{4} = 1 \implies \sum_{n=0}^{\infty} 1^n = \sum 1$ (Diverge).

> [!IMPORTANT]
> - **Valores de $x$ para os quais a série é convergente:** $x \in (0, 4)$ (ou $0 < x < 4$).

---

## Questão 3
**Determine o raio de convergência das séries a seguir:**

> [!NOTE]
> **Método Padrão do Teste da Razão:** Para encontrar o raio de convergência $R$, escrevemos o termo geral $u_n(x)$, calculamos o limite $L = \lim_{n \to \infty} \left| \frac{u_{n+1}(x)}{u_n(x)} \right|$ e impomos $L < 1$.

---

### (a) $\sum_{n=2}^{\infty} (-1)^n \frac{x^n}{4^n \ln n}$

#### **Resolução com o Teste da Razão no Limite:**

1. **Termo geral da série:**

$$
u_n(x) = (-1)^n \frac{x^n}{4^n \ln n}
$$

2. **Montando o limite da razão $\left| \frac{u_{n+1}(x)}{u_n(x)} \right|$:**

$$
\left| \frac{u_{n+1}(x)}{u_n(x)} \right| = \left| \frac{(-1)^{n+1} x^{n+1}}{4^{n+1} \ln(n+1)} \cdot \frac{4^n \ln n}{(-1)^n x^n} \right|
$$

$$
\left| \frac{u_{n+1}(x)}{u_n(x)} \right| = \frac{|x|^{n+1}}{|x|^n} \cdot \frac{4^n}{4^{n+1}} \cdot \frac{\ln n}{\ln(n+1)} = |x| \cdot \frac{1}{4} \cdot \frac{\ln n}{\ln(n+1)}
$$

3. **Calculando o Limite $L$ quando $n \to \infty$:**

$$
L = \lim_{n \to \infty} \left| \frac{u_{n+1}(x)}{u_n(x)} \right| = \frac{|x|}{4} \cdot \lim_{n \to \infty} \frac{\ln n}{\ln(n+1)}
$$

   Como $\lim_{n \to \infty} \frac{\ln n}{\ln(n+1)} = 1$ (aplicando L'Hôpital: $\frac{1/n}{1/(n+1)} = \frac{n+1}{n} \to 1$):

$$
L = \frac{|x|}{4} \cdot 1 = \frac{|x|}{4}
$$

4. **Impondo o Critério da Razão ($L < 1$):**

$$
L < 1 \iff \frac{|x|}{4} < 1 \iff |x| < 4
$$

5. **Conclusão:** O raio de convergência é a distância do centro $x_0 = 0$ até a borda.

> [!IMPORTANT]
> - **Raio de Convergência ($R$):** $R = 4$

---

### (b) $\sum_{n=1}^{\infty} \frac{n(x-4)^n}{n^3+1}$

#### **Resolução com o Teste da Razão no Limite:**

1. **Termo geral da série:**

$$
u_n(x) = \frac{n(x-4)^n}{n^3+1}
$$

2. **Montando a razão $\left| \frac{u_{n+1}(x)}{u_n(x)} \right|$:**

$$
\left| \frac{u_{n+1}(x)}{u_n(x)} \right| = \left| \frac{(n+1)(x-4)^{n+1}}{(n+1)^3+1} \cdot \frac{n^3+1}{n(x-4)^n} \right|
$$

$$
\left| \frac{u_{n+1}(x)}{u_n(x)} \right| = |x-4| \cdot \frac{n+1}{n} \cdot \frac{n^3+1}{n^3+3n^2+3n+2}
$$

3. **Calculando o Limite $L$ quando $n \to \infty$:**

$$
L = \lim_{n \to \infty} \left| \frac{u_{n+1}(x)}{u_n(x)} \right| = |x-4| \cdot \left( \lim_{n \to \infty} \frac{n+1}{n} \right) \cdot \left( \lim_{n \to \infty} \frac{n^3+1}{n^3+3n^2+3n+2} \right)
$$

$$
L = |x-4| \cdot 1 \cdot 1 = |x-4|
$$

4. **Impondo $L < 1$:**

$$
|x - 4| < 1
$$

> [!IMPORTANT]
> - **Raio de Convergência ($R$):** $R = 1$

---

### (c) $\sum_{n=1}^{\infty} (-1)^n \frac{(x+2)^n}{n 2^n}$

#### **Resolução com o Teste da Razão no Limite:**

1. **Termo geral da série:**

$$
u_n(x) = (-1)^n \frac{(x+2)^n}{n 2^n}
$$

2. **Montando a razão $\left| \frac{u_{n+1}(x)}{u_n(x)} \right|$:**

$$
\left| \frac{u_{n+1}(x)}{u_n(x)} \right| = \left| \frac{(-1)^{n+1}(x+2)^{n+1}}{(n+1)2^{n+1}} \cdot \frac{n 2^n}{(-1)^n(x+2)^n} \right|
$$

$$
\left| \frac{u_{n+1}(x)}{u_n(x)} \right| = |x+2| \cdot \frac{2^n}{2^{n+1}} \cdot \frac{n}{n+1} = |x+2| \cdot \frac{1}{2} \cdot \frac{n}{n+1}
$$

3. **Calculando o Limite $L$ quando $n \to \infty$:**

$$
L = \lim_{n \to \infty} \left| \frac{u_{n+1}(x)}{u_n(x)} \right| = \frac{|x+2|}{2} \cdot \lim_{n \to \infty} \frac{n}{n+1} = \frac{|x+2|}{2} \cdot 1 = \frac{|x+2|}{2}
$$

4. **Impondo $L < 1$:**

$$
L < 1 \iff \frac{|x+2|}{2} < 1 \iff |x + 2| < 2
$$

> [!IMPORTANT]
> - **Raio de Convergência ($R$):** $R = 2$

---

### (d) $\sum_{n=2}^{\infty} (-1)^n \frac{(2x+3)^n}{n \ln n}$

#### **Resolução com o Teste da Razão no Limite:**

1. **Termo geral da série:**

$$
u_n(x) = (-1)^n \frac{(2x+3)^n}{n \ln n}
$$

2. **Montando a razão $\left| \frac{u_{n+1}(x)}{u_n(x)} \right|$:**

$$
\left| \frac{u_{n+1}(x)}{u_n(x)} \right| = \left| \frac{(-1)^{n+1}(2x+3)^{n+1}}{(n+1)\ln(n+1)} \cdot \frac{n \ln n}{(-1)^n (2x+3)^n} \right|
$$

$$
\left| \frac{u_{n+1}(x)}{u_n(x)} \right| = |2x+3| \cdot \frac{n}{n+1} \cdot \frac{\ln n}{\ln(n+1)}
$$

3. **Calculando o Limite $L$ quando $n \to \infty$:**

$$
L = \lim_{n \to \infty} \left| \frac{u_{n+1}(x)}{u_n(x)} \right| = |2x+3| \cdot 1 \cdot 1 = |2x+3|
$$

4. **Impondo $L < 1$:**

$$
|2x + 3| < 1 \iff \left| 2\left(x + \frac{3}{2}\right) \right| < 1 \iff 2 \left| x + \frac{3}{2} \right| < 1 \iff \left| x + \frac{3}{2} \right| < \frac{1}{2}
$$

5. **Conclusão:** O raio de convergência $R$ é a distância em relação à variável $x$ centrada em $x_0 = -3/2$.

> [!IMPORTANT]
> - **Raio de Convergência ($R$):** $R = \frac{1}{2}$

---
> **Navegação Rápida:**  
> [⬅️ Voltar ao README](../README.md) | [📘 Resumo Teórico](./calculo_resumo.md) | [⚡ Macetes Algébricos](./calculo_macetes.md) | [🎯 Roteiro de Resolução](./calculo_roteiro.md) | [📝 Lista de Exercícios](./calculo_exercicios.md) | [🔝 Voltar ao Topo](#topo)
