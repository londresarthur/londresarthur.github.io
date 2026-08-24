<a id="topo"></a>

---
> **Navegação Rápida:**  
> [⬅️ Voltar ao README](./README.md) | [📘 Resumo Teórico](./calculo_resumo.md) | [⚡ Macetes Algébricos](./calculo_macetes.md) | [🎯 Roteiro de Resolução](./calculo_roteiro.md) | [📝 Exercícios Resolvidos](./calculo_exercicios.md)
---

# 📝 Lista de Exercícios Resolvidos (Cálculo II - Turma 2025 Piloto Elétrica)
### Semana de 10 de Agosto de 2026

> [!NOTE]
> **Resolução Completa e Detalhada:** Todas as 7 questões resolvidas passo a passo, com identificação do termo geral, simplificação de limites, teste de extremidades, expansões de Maclaurin, integrações termo a termo e estimativas de erro.

---

## Questão 1
**Para cada uma das séries abaixo, determine seu intervalo de convergência.**

### (a) $\sum_{n=0}^{\infty} \frac{(-1)^n n^2 x^{3n}}{n! 2^{n+1}}$

#### **Resolução Passo a Passo:**

1. **Termo geral da série:**
   $$u_n(x) = \frac{(-1)^n n^2 x^{3n}}{n! 2^{n+1}}$$

2. **Aplicação do Teste da Razão:**
   $$\left| \frac{u_{n+1}(x)}{u_n(x)} \right| = \left| \frac{(-1)^{n+1} (n+1)^2 x^{3(n+1)}}{(n+1)! 2^{(n+1)+1}} \cdot \frac{n! 2^{n+1}}{(-1)^n n^2 x^{3n}} \right|$$

3. **Simplificação Algébrica:**
   - Termo alternado: $\left| \frac{(-1)^{n+1}}{(-1)^n} \right| = 1$.
   - Potência de $x$: $\left| \frac{x^{3n+3}}{x^{3n}} \right| = |x|^3$.
   - Fatorial: $\frac{n!}{(n+1)!} = \frac{n!}{(n+1)n!} = \frac{1}{n+1}$.
   - Potências de 2: $\frac{2^{n+1}}{2^{n+2}} = \frac{1}{2}$.
   - Termo polinomial: $\frac{(n+1)^2}{n^2}$.

   Juntando os fatores:
   $$\left| \frac{u_{n+1}(x)}{u_n(x)} \right| = \frac{(n+1)^2}{n^2} \cdot \frac{1}{n+1} \cdot \frac{1}{2} \cdot |x|^3 = \frac{n+1}{n^2} \cdot \frac{|x|^3}{2}$$

4. **Cálculo do Limite $L$ quando $n \to \infty$:**
   $$L = \lim_{n \to \infty} \left| \frac{u_{n+1}(x)}{u_n(x)} \right| = \left( \lim_{n \to \infty} \frac{n+1}{n^2} \right) \frac{|x|^3}{2} = 0 \cdot \frac{|x|^3}{2} = 0$$

5. **Conclusão:**
   Como $L = 0 < 1$ para todo $x \in \mathbb{R}$, o Teste da Razão garante convergência absoluta em toda a reta real.

> [!IMPORTANT]
> - **Raio de Convergência ($R$):** $R = \infty$
> - **Intervalo de Convergência ($I$):** $(-\infty, \infty)$ ou $\mathbb{R}$

---

### (b) $\sum_{n=0}^{\infty} \frac{x^{2n+1}}{4^{2n+1}}$

#### **Resolução Passo a Passo:**

1. **Reconhecimento como Série Geométrica:**
   $$\sum_{n=0}^{\infty} \frac{x^{2n+1}}{4^{2n+1}} = \sum_{n=0}^{\infty} \left( \frac{x}{4} \right)^{2n+1} = \frac{x}{4} \sum_{n=0}^{\infty} \left( \frac{x^2}{16} \right)^n$$

2. **Condição de Convergência da PG:**
   Uma série geométrica de razão $r = \frac{x^2}{16}$ converge se e somente se $|r| < 1$:
   $$\left| \frac{x^2}{16} \right| < 1 \iff x^2 < 16 \iff |x| < 4 \iff -4 < x < 4$$

3. **Análise das Extremidades ($x = \pm 4$):**
   - **Para $x = 4$:** $\sum_{n=0}^{\infty} \left(\frac{4}{4}\right)^{2n+1} = \sum_{n=0}^{\infty} 1 = 1 + 1 + 1 + \dots$ (Diverge, pois $\lim 1 \neq 0$).
   - **Para $x = -4$:** $\sum_{n=0}^{\infty} \left(\frac{-4}{4}\right)^{2n+1} = \sum_{n=0}^{\infty} (-1) = -1 - 1 - 1 - \dots$ (Diverge, pois $\lim (-1) \neq 0$).

> [!IMPORTANT]
> - **Raio de Convergência ($R$):** $R = 4$
> - **Intervalo de Convergência ($I$):** $(-4, 4)$

---

## Questão 2
**Determine os valores de $x$ para os quais a série a seguir é convergente:**
$$\sum_{n=0}^{\infty} \frac{(x-2)^{2n}}{4^n}$$

#### **Resolução Passo a Passo:**

1. **Reorganização do termo geral:**
   $$u_n(x) = \frac{(x-2)^{2n}}{4^n} = \left[ \frac{(x-2)^2}{4} \right]^n$$

2. **Aplicação do Critério da Série Geométrica:**
   A série é da forma $\sum r^n$, com razão $r = \frac{(x-2)^2}{4}$. A convergência ocorre se e somente se $|r| < 1$:
   $$\frac{(x-2)^2}{4} < 1 \iff (x-2)^2 < 4 \iff |x-2| < 2$$
   $$-2 < x - 2 < 2 \iff 0 < x < 4$$

3. **Análise dos Extremos ($x = 0$ e $x = 4$):**
   - Em $x = 0$: $r = \frac{(-2)^2}{4} = 1 \implies \sum 1^n = \sum 1$ (Diverge).
   - Em $x = 4$: $r = \frac{2^2}{4} = 1 \implies \sum 1^n = \sum 1$ (Diverge).

> [!IMPORTANT]
> - **Valores de $x$ para convergência:** $x \in (0, 4)$ (ou $0 < x < 4$).

---

## Questão 3
**Determine o raio de convergência das séries a seguir:**

---

### (a) $\sum_{n=2}^{\infty} (-1)^n \frac{x^n}{4^n \ln n}$

1. **Razão entre termos consecutivos:**
   $$\left| \frac{u_{n+1}(x)}{u_n(x)} \right| = \left| \frac{(-1)^{n+1} x^{n+1}}{4^{n+1} \ln(n+1)} \cdot \frac{4^n \ln n}{(-1)^n x^n} \right| = |x| \cdot \frac{1}{4} \cdot \frac{\ln n}{\ln(n+1)}$$

2. **Cálculo do Limite:**
   Como $\lim_{n \to \infty} \frac{\ln n}{\ln(n+1)} = 1$, temos:
   $$L = \lim_{n \to \infty} \left| \frac{u_{n+1}(x)}{u_n(x)} \right| = \frac{|x|}{4}$$

3. **Impondo $L < 1$:**
   $$\frac{|x|}{4} < 1 \iff |x| < 4$$

> [!IMPORTANT]
> - **Raio de Convergência ($R$):** $R = 4$

---

### (b) $\sum_{n=1}^{\infty} \frac{n(x-4)^n}{n^3+1}$

1. **Razão entre termos consecutivos:**
   $$\left| \frac{u_{n+1}(x)}{u_n(x)} \right| = \left| \frac{(n+1)(x-4)^{n+1}}{(n+1)^3+1} \cdot \frac{n^3+1}{n(x-4)^n} \right| = |x-4| \cdot \frac{n+1}{n} \cdot \frac{n^3+1}{n^3+3n^2+3n+2}$$

2. **Cálculo do Limite:**
   $$L = |x-4| \cdot \lim_{n \to \infty} \left( \frac{n+1}{n} \right) \cdot \lim_{n \to \infty} \left( \frac{n^3+1}{n^3+3n^2+3n+2} \right) = |x-4| \cdot 1 \cdot 1 = |x-4|$$

3. **Impondo $L < 1$:**
   $$|x - 4| < 1$$

> [!IMPORTANT]
> - **Raio de Convergência ($R$):** $R = 1$

---

### (c) $\sum_{n=1}^{\infty} (-1)^n \frac{(x+2)^n}{n 2^n}$

1. **Razão entre termos consecutivos:**
   $$\left| \frac{u_{n+1}(x)}{u_n(x)} \right| = \left| \frac{(-1)^{n+1}(x+2)^{n+1}}{(n+1)2^{n+1}} \cdot \frac{n 2^n}{(-1)^n(x+2)^n} \right| = |x+2| \cdot \frac{1}{2} \cdot \frac{n}{n+1}$$

2. **Cálculo do Limite:**
   $$L = \frac{|x+2|}{2} \cdot \lim_{n \to \infty} \frac{n}{n+1} = \frac{|x+2|}{2} \cdot 1 = \frac{|x+2|}{2}$$

3. **Impondo $L < 1$:**
   $$\frac{|x+2|}{2} < 1 \iff |x + 2| < 2$$

> [!IMPORTANT]
> - **Raio de Convergência ($R$):** $R = 2$

---

### (d) $\sum_{n=2}^{\infty} (-1)^n \frac{(2x+3)^n}{n \ln n}$

1. **Razão entre termos consecutivos:**
   $$\left| \frac{u_{n+1}(x)}{u_n(x)} \right| = \left| \frac{(-1)^{n+1}(2x+3)^{n+1}}{(n+1)\ln(n+1)} \cdot \frac{n \ln n}{(-1)^n (2x+3)^n} \right| = |2x+3| \cdot \frac{n}{n+1} \cdot \frac{\ln n}{\ln(n+1)}$$

2. **Cálculo do Limite:**
   $$L = |2x+3| \cdot 1 \cdot 1 = |2x+3|$$

3. **Impondo $L < 1$:**
   $$|2x + 3| < 1 \iff \left| 2\left(x + \frac{3}{2}\right) \right| < 1 \iff 2 \left| x + \frac{3}{2} \right| < 1 \iff \left| x + \frac{3}{2} \right| < \frac{1}{2}$$

> [!IMPORTANT]
> - **Raio de Convergência ($R$):** $R = \frac{1}{2}$

---

## Questão 4
**Obtenha as funções abaixo como séries de potências em torno de $x_0 = 0$.**

---

### (a) $f(x) = e^{-x^2}$
- **Série Base:** $e^u = \sum_{n=0}^{\infty} \frac{u^n}{n!} \quad \forall u \in \mathbb{R}$
- **Substituição $u = -x^2$:**
  $$f(x) = \sum_{n=0}^{\infty} \frac{(-x^2)^n}{n!} = \sum_{n=0}^{\infty} \frac{(-1)^n}{n!} x^{2n}$$
- **Termos abertos:** $1 - x^2 + \frac{x^4}{2} - \frac{x^6}{6} + \frac{x^8}{24} - \dots$
- **Raio:** $R = \infty$

---

### (b) $f(x) = \cos(x^2)$
- **Série Base:** $\cos(u) = \sum_{n=0}^{\infty} (-1)^n \frac{u^{2n}}{(2n)!} \quad \forall u \in \mathbb{R}$
- **Substituição $u = x^2$:**
  $$f(x) = \sum_{n=0}^{\infty} (-1)^n \frac{(x^2)^{2n}}{(2n)!} = \sum_{n=0}^{\infty} \frac{(-1)^n}{(2n)!} x^{4n}$$
- **Termos abertos:** $1 - \frac{x^4}{2} + \frac{x^8}{24} - \frac{x^{12}}{720} + \dots$
- **Raio:** $R = \infty$

---

### (c) $f(x) = \frac{x}{1+x^3}$
- **Série Base:** $\frac{1}{1-u} = \sum_{n=0}^{\infty} u^n \quad (|u| < 1)$
- **Com $u = -x^3$:** $\frac{1}{1+x^3} = \sum_{n=0}^{\infty} (-x^3)^n = \sum_{n=0}^{\infty} (-1)^n x^{3n}$
- **Multiplicando por $x$:**
  $$f(x) = x \sum_{n=0}^{\infty} (-1)^n x^{3n} = \sum_{n=0}^{\infty} (-1)^n x^{3n+1}$$
- **Termos abertos:** $x - x^4 + x^7 - x^{10} + x^{13} - \dots$
- **Raio:** $|-x^3| < 1 \iff |x| < 1 \implies R = 1$

---

### (d) $f(x) = \sinh(x)$
- **Definição:** $\sinh(x) = \frac{e^x - e^{-x}}{2}$
- **Substituição:**
  $$\sinh(x) = \sum_{n=0}^{\infty} \frac{x^{2n+1}}{(2n+1)!}$$
- **Termos abertos:** $x + \frac{x^3}{6} + \frac{x^5}{120} + \frac{x^7}{5040} + \dots$
- **Raio:** $R = \infty$

---

### (e) $f(x) = \cosh(x)$
- **Definição:** $\cosh(x) = \frac{e^x + e^{-x}}{2}$
- **Substituição:**
  $$\cosh(x) = \sum_{n=0}^{\infty} \frac{x^{2n}}{(2n)!}$$
- **Termos abertos:** $1 + \frac{x^2}{2} + \frac{x^4}{24} + \frac{x^6}{720} + \dots$
- **Raio:** $R = \infty$

---

## Questão 5
**Obtenha a série de potências de uma primitiva da função $f(x) = \cos(x^2)$ e obtenha a expressão de $\int_0^1 \cos(x^2)\,dx$ como série numérica.**

#### **Resolução Passo a Passo:**

1. **Série de $f(x) = \cos(x^2)$:**
   $$\cos(x^2) = \sum_{n=0}^{\infty} \frac{(-1)^n}{(2n)!} x^{4n}$$

2. **Cálculo da Primitiva Geral $F(x) = \int \cos(x^2)\,dx$:**
   $$F(x) = C + \sum_{n=0}^{\infty} \frac{(-1)^n}{(2n)!} \int x^{4n} \, dx = C + \sum_{n=0}^{\infty} \frac{(-1)^n}{(4n+1)(2n)!} x^{4n+1}$$

3. **Cálculo da Integral Definida $\int_0^1 \cos(x^2)\,dx$:**
   $$\int_0^1 \cos(x^2)\,dx = \left[ \sum_{n=0}^{\infty} \frac{(-1)^n}{(4n+1)(2n)!} x^{4n+1} \right]_0^1$$
   - Em $x = 1 \implies 1^{4n+1} = 1$.
   - Em $x = 0 \implies 0^{4n+1} = 0 \quad (\forall n \ge 0)$.

4. **Série Numérica Resultante:**
   $$\int_0^1 \cos(x^2)\,dx = \sum_{n=0}^{\infty} \frac{(-1)^n}{(4n+1)(2n)!}$$
   $$= 1 - \frac{1}{10} + \frac{1}{216} - \frac{1}{9360} + \dots$$

---

## Questão 6
**Avalie $\int_0^1 e^{-x^2}\,dx$ com erro menor do que $0,001$.**

#### **Resolução Passo a Passo:**

1. **Expressão em Série Numérica:**
   $$e^{-x^2} = \sum_{n=0}^{\infty} \frac{(-1)^n}{n!} x^{2n} \implies \int_0^1 e^{-x^2}\,dx = \sum_{n=0}^{\infty} \frac{(-1)^n}{(2n+1) n!}$$

2. **Cálculo dos Termos $b_n = \frac{1}{(2n+1) n!}$:**
   - $n = 0: \quad b_0 = \frac{1}{1 \cdot 1} = 1$
   - $n = 1: \quad b_1 = \frac{1}{3 \cdot 1} = \frac{1}{3} \approx 0{,}33333$
   - $n = 2: \quad b_2 = \frac{1}{5 \cdot 2} = \frac{1}{10} = 0{,}10000$
   - $n = 3: \quad b_3 = \frac{1}{7 \cdot 6} = \frac{1}{42} \approx 0{,}02381$
   - $n = 4: \quad b_4 = \frac{1}{9 \cdot 24} = \frac{1}{216} \approx 0{,}00463$
   - $n = 5: \quad b_5 = \frac{1}{11 \cdot 120} = \frac{1}{1320} \approx 0{,}00076$

3. **Aplicação do Critério de Leibniz:**
   Como $b_5 = \frac{1}{1320} < \frac{1}{1000} = 0{,}001$, o erro ao somar até $n = 4$ é menor que $0{,}001$:
   $$|\text{Erro}| = |S - S_4| \le b_5 < 0{,}001$$

4. **Soma Parcial $S_4$:**
   $$S_4 = 1 - \frac{1}{3} + \frac{1}{10} - \frac{1}{42} + \frac{1}{216} = \frac{5651}{7560} \approx \mathbf{0{,}7475}$$

> [!IMPORTANT]
> - **Valor Aproximado:** $\int_0^1 e^{-x^2}dx \approx \mathbf{0{,}747}$ (ou $\frac{5651}{7560}$).

---

## Questão 7
**Para que valores de $x$ a série $\sum_{n=0}^{\infty} (-1)^n (2n+2) x^{2n+1}$ é convergente? Qual é a função da variável $x$ que é representada por esta série?**

#### **Resolução Passo a Passo:**

### Parte 1: Intervalo de Convergência
1. **Teste da Razão:**
   $$L = \lim_{n\to\infty} \left| \frac{(-1)^{n+1}(2n+4)x^{2n+3}}{(-1)^n(2n+2)x^{2n+1}} \right| = \lim_{n\to\infty} \left( \frac{2n+4}{2n+2} \right) |x|^2 = |x|^2$$
   Para convergência absoluta: $|x|^2 < 1 \iff |x| < 1 \implies R = 1$.

2. **Extremos ($x = \pm 1$):**
   - Para $x = 1$: $\sum (-1)^n (2n+2)$ diverge ($\lim a_n \neq 0$).
   - Para $x = -1$: $\sum (-1)^{n+1} (2n+2)$ diverge ($\lim a_n \neq 0$).

> [!IMPORTANT]
> - **Conjunto de Convergência:** $x \in (-1, 1)$ (ou seja, $-1 < x < 1$).

---

### Parte 2: Função Representada $f(x)$
1. Note que $(x^{2n+2})' = (2n+2)x^{2n+1}$.
2. Integrando termo a termo:
   $$\int f(x)\,dx = \sum_{n=0}^{\infty} (-1)^n x^{2n+2} + C = x^2 \sum_{n=0}^{\infty} (-x^2)^n + C$$
3. Aplicando a soma da Série Geométrica para $|x| < 1$:
   $$\sum_{n=0}^{\infty} (-x^2)^n = \frac{1}{1 - (-x^2)} = \frac{1}{1+x^2} \implies \int f(x)\,dx = \frac{x^2}{1+x^2} + C$$
4. Derivando pela Regra do Quociente:
   $$f(x) = \frac{d}{dx} \left( \frac{x^2}{1+x^2} \right) = \frac{2x(1+x^2) - x^2(2x)}{(1+x^2)^2} = \frac{2x}{(1+x^2)^2}$$

> [!IMPORTANT]
> - **Função Representada:** $f(x) = \dfrac{2x}{(1+x^2)^2}$

---
> **Navegação Rápida:**  
> [⬅️ Voltar ao README](./README.md) | [📘 Resumo Teórico](./calculo_resumo.md) | [⚡ Macetes Algébricos](./calculo_macetes.md) | [🎯 Roteiro de Resolução](./calculo_roteiro.md) | [📝 Exercícios Resolvidos](./calculo_exercicios.md) | [🔝 Voltar ao Topo](#topo)
