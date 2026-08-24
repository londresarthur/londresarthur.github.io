<a id="topo"></a>

---
> **Navegação Rápida:**  
> [⬅️ Voltar ao README](./README.md) | [📘 Resumo Teórico](./calculo_resumo.md) | [⚡ Macetes Algébricos](./calculo_macetes.md) | [🎯 Roteiro de Resolução](./calculo_roteiro.md) | [📝 Exercícios Resolvidos](./calculo_exercicios.md)
---

# 🚀 Guias e Macetes de Manipulação Algébrica (Cálculo II - P2)

> [!IMPORTANT]
> **Salva-Vidas de Prova:** Guia rápido de simplificação e atalhos para resolver exercícios de Séries de Potências, Séries de Maclaurin, Integração/Derivação Termo a Termo e Estimativa de Erro sem travar nas contas.

---

## 1. ✂️ Fatoriais e Hierarquia dos Infinitos

O fatorial é a operação de multiplicação regressiva: $n! = n \cdot (n-1) \cdot (n-2) \dots 1$.

### Macetes de Cancelamento Imediato no Teste da Razão $\left|\frac{a_{n+1}}{a_n}\right|$:
- **Passo Simples:**
  $$\frac{n!}{(n+1)!} = \frac{n!}{(n+1)n!} = \frac{1}{n+1} \xrightarrow{n \to \infty} 0$$

- **Passo Duplo $(2n+2)!$:**
  $$(2n+2)! = (2n+2)(2n+1)(2n)! \implies \frac{(2n)!}{(2n+2)!} = \frac{1}{(2n+2)(2n+1)} \approx \frac{1}{4n^2} \xrightarrow{n \to \infty} 0$$

- **Hierarquia dos Infinitos:**
  > [!TIP]
  > O fatorial $n!$ **cresce infinitamente mais rápido** do que qualquer potência $n^k$ e qualquer exponencial $a^n$:
  > $$\lim_{n \to \infty} \frac{n^k}{n!} = 0, \quad \lim_{n \to \infty} \frac{a^n}{n!} = 0$$
  > **Conclusão de Prova:** Se aparecer $n!$ isolado no denominador, o limite da razão é sempre $0$ e o raio é imediatamente $\mathbf{R = \infty}$!

---

## 2. ⚡ Desmembramento de Potências e Fatoração do Centro

Ao montar a razão $\left|\frac{a_{n+1}}{a_n}\right|$, desmembre as potências para isolar a variável $x$:

### Regras Práticas:
1. **Separar expoentes compostos:**
   $$x^{3(n+1)} = x^{3n+3} = x^{3n} \cdot x^3 \implies \frac{x^{3n+3}}{x^{3n}} = x^3$$
   $$4^{2(n+1)+1} = 4^{2n+3} = 4^{2n+1} \cdot 4^2 = 16 \cdot 4^{2n+1} \implies \frac{4^{2n+1}}{4^{2n+3}} = \frac{1}{16}$$

2. **Fatorar o Coeficiente de $x$ para identificar o Raio Real:**
   Se aparecer $(ax + b)^n$:
   $$(ax + b)^n = \left[ a \left( x + \frac{b}{a} \right) \right]^n = a^n \cdot \left( x + \frac{b}{a} \right)^n$$
   > [!NOTE]
   > Ao impor $a \left| x + \frac{b}{a} \right| < 1$, o raio de convergência em relação à variável $x$ é $R = \frac{1}{|a|}$, centrado em $x_0 = -\frac{b}{a}$.

---

## 3. 🪵 Logaritmos e Limites Fundamentais

Logaritmos aparecem com frequência em denominadores como $\sum \frac{x^n}{n \ln n}$ ou $\sum \frac{x^n}{4^n \ln n}$.

### O Limite de Ouro do Logaritmo:
> [!IMPORTANT]
> No cálculo da razão de convergência, a fração $\frac{\ln n}{\ln(n+1)}$ **sempre tende a 1**:
> $$\lim_{n \to \infty} \frac{\ln n}{\ln(n+1)} = 1$$
> **Conclusão:** Logaritmos não alteram o raio de convergência $R$.

---

## 4. 🎯 As 6 Séries de Maclaurin Fundamentais ($x_0 = 0$)

Nunca calcule derivadas $f'(0), f''(0)$ para funções elementares na prova. Use substituição direta na tabela:

| Função | Série de Maclaurin | Raio ($R$) | Intervalo ($I$) |
| :--- | :--- | :---: | :---: |
| $\mathbf{e^u}$ | $\sum_{n=0}^{\infty} \frac{u^n}{n!} = 1 + u + \frac{u^2}{2!} + \frac{u^3}{3!} + \dots$ | $\infty$ | $(-\infty, \infty)$ |
| $\mathbf{\cos(u)}$ | $\sum_{n=0}^{\infty} (-1)^n \frac{u^{2n}}{(2n)!} = 1 - \frac{u^2}{2!} + \frac{u^4}{4!} - \dots$ | $\infty$ | $(-\infty, \infty)$ |
| $\mathbf{\sin(u)}$ | $\sum_{n=0}^{\infty} (-1)^n \frac{u^{2n+1}}{(2n+1)!} = u - \frac{u^3}{3!} + \frac{u^5}{5!} - \dots$ | $\infty$ | $(-\infty, \infty)$ |
| $\mathbf{\cosh(u)}$ | $\sum_{n=0}^{\infty} \frac{u^{2n}}{(2n)!} = 1 + \frac{u^2}{2!} + \frac{u^4}{4!} + \dots$ | $\infty$ | $(-\infty, \infty)$ |
| $\mathbf{\sinh(u)}$ | $\sum_{n=0}^{\infty} \frac{u^{2n+1}}{(2n+1)!} = u + \frac{u^3}{3!} + \frac{u^5}{5!} + \dots$ | $\infty$ | $(-\infty, \infty)$ |
| $\mathbf{\frac{1}{1-u}}$ | $\sum_{n=0}^{\infty} u^n = 1 + u + u^2 + u^3 + \dots$ | $1$ | $(-1, 1)$ |
| $\mathbf{\frac{1}{1+u}}$ | $\sum_{n=0}^{\infty} (-1)^n u^n = 1 - u + u^2 - u^3 + \dots$ | $1$ | $(-1, 1)$ |

### Macete da Fatoração de Potências Externas:
Para funções do tipo $\frac{x^k}{1 \pm a x^m}$:
1. Isole o numerador: $x^k \cdot \left(\frac{1}{1 \pm ax^m}\right)$.
2. Expanda a PG com $u = \mp a x^m$.
3. Multiplique o $x^k$ somando $+k$ no expoente de $x$ dentro do somatório ($x^k \cdot x^{mn} = x^{mn+k}$).

---

## 5. 📐 Integração Termo a Termo e a "Mágica" dos Limites $[0, 1]$

Ao integrar uma série de potências $\sum c_n x^k$ no intervalo $[0, 1]$:
$$\int_0^1 \left( \sum_{n=0}^{\infty} c_n x^k \right) dx = \sum_{n=0}^{\infty} c_n \left[ \frac{x^{k+1}}{k+1} \right]_0^1$$

- **No limite superior ($x = 1$):** $1^{k+1} = 1 \implies \text{sobra apenas } \frac{c_n}{k+1}$.
- **No limite inferior ($x = 0$):** como $k+1 \ge 1$, $0^{k+1} = 0 \implies \text{zera todos os termos}$.
- **Resultado Direto:**
  $$\int_0^1 f(x)\,dx = \sum_{n=0}^{\infty} \frac{c_n}{k+1}$$

---

## 6. 🔍 Estimativa de Erro com Séries Alternadas (Resto de Leibniz)

Seja $S = \sum_{n=0}^{\infty} (-1)^n b_n$ uma série alternada convergente com $b_n > 0$ decrescente.

> [!IMPORTANT]
> **Teorema da Estimativa de Leibniz:**
> $$|\text{Erro}| = |S - S_N| \le b_{N+1}$$
> O erro cometido ao truncar a série na soma parcial $S_N$ é **menor ou igual ao módulo do primeiro termo descartado** ($b_{N+1}$).

### Algoritmo de Resolução Rápida para Erro $< \varepsilon$:
1. Calcule numericamente os termos $b_0, b_1, b_2, b_3, \dots$
2. Encontre o primeiro índice $k$ tal que $b_k < \varepsilon$ (ex: $b_k < 0{,}001$).
3. **A aproximação desejada é a soma de todos os termos ANTERIORES a $k$ ($S_{k-1} = b_0 - b_1 + b_2 - \dots \pm b_{k-1}$).**

---

## 7. 🧩 O Truque da "Função Oculta" (Reconhecimento via Derivada/Integral)

Quando o enunciado der uma série com coeficientes crescendo linearmente (como $(2n+2)x^{2n+1}$ ou $(n+1)x^n$):

1. **Abra os primeiros termos** para visualizar a série:
   $$2x - 4x^3 + 6x^5 - 8x^7 + \dots$$
2. **Integre termo a termo:** os coeficientes multiplicativos se cancelam com os expoentes:
   $$\int (2x - 4x^3 + 6x^5 - \dots) dx = x^2 - x^4 + x^6 - x^8 + \dots$$
3. **Identifique a PG Infinita:**
   $$S_{\text{PG}} = \frac{a_1}{1 - q} = \frac{x^2}{1 - (-x^2)} = \frac{x^2}{1 + x^2}$$
4. **Derive o resultado de volta** para obter a função original $f(x)$:
   $$f(x) = \frac{d}{dx} \left( \frac{x^2}{1 + x^2} \right) = \frac{2x}{(1 + x^2)^2}$$

---
> **Navegação Rápida:**  
> [⬅️ Voltar ao README](./README.md) | [📘 Resumo Teórico](./calculo_resumo.md) | [⚡ Macetes Algébricos](./calculo_macetes.md) | [🎯 Roteiro de Resolução](./calculo_roteiro.md) | [📝 Exercícios Resolvidos](./calculo_exercicios.md) | [🔝 Voltar ao Topo](#topo)
