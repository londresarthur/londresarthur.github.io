<a id="topo"></a>

---
> **Navegação Rápida:**  
> [⬅️ Voltar ao README](../README.md) | [📘 Resumo Teórico](./calculo_resumo.md) | [⚡ Macetes Algébricos](./calculo_macetes.md) | [🎯 Roteiro](./calculo_roteiro.md) | [📝 Exercícios](./calculo_exercicios.md) | [🚨 Plano de Emergência](../plano_estudos_emergencia.md)
---

# 🚀 Guias e Macetes de Manipulação Algébrica (Cálculo II)

> [!IMPORTANT]
> **Salva-Vidas de Prova:** Guia rápido de simplificação algébrica para resolver limites do Teste da Razão, Teste da Raiz e Fronteiras em 99% do tempo sem travar na conta.

---

## 1. ✂️ Fatoriais: Simplificação Instantânea

O fatorial é a operação de multiplicação regressiva: $n! = n \cdot (n-1) \cdot (n-2) \dots 1$.

### Macetes de Cancelamento na Razão $\left|\frac{u_{n+1}}{u_n}\right|$:
- **Caso 1:** $(n+1)! = (n+1) \cdot n!$

$$
\frac{n!}{(n+1)!} = \frac{n!}{(n+1)n!} = \frac{1}{n+1} \xrightarrow{n \to \infty} 0
$$

- **Caso 2:** Passo Duplo $(2n+2)!$ (atenção: substitua $n \to n+1 \implies 2(n+1) = 2n+2$):

$$
(2n+2)! = (2n+2) \cdot (2n+1) \cdot (2n)!
$$

$$
\frac{(2n)!}{(2n+2)!} = \frac{1}{(2n+2)(2n+1)} \approx \frac{1}{4n^2} \xrightarrow{n \to \infty} 0
$$

- **Caso 3 (Hierarquia dos Infinitos):**
  > [!TIP]
  > O fatorial $n!$ **cresce infinitamente mais rápido** do que qualquer polinômio $n^k$ e qualquer exponencial $a^n$.

$$
\lim_{n \to \infty} \frac{n^k}{n!} = 0, \quad \lim_{n \to \infty} \frac{a^n}{n!} = 0
$$

  > **Conclusão de Prova:** Se aparecer $n!$ no denominador sem outro fatorial para compensar, o limite da razão dá $0$ e o raio de convergência é $R = \infty$!

---

## 2. ⚡ Potências e Exponenciais: Desmembramento Rápido

Na razão $\left|\frac{u_{n+1}}{u_n}\right|$, abra as potências para cancelar os termos com $n$ e isolar os termos constantes ou em $x$.

### Regras de Desmembramento:
1. **Separar exponenciais compostas:**

$$
x^{3(n+1)} = x^{3n+3} = x^{3n} \cdot x^3 \implies \frac{x^{3n+3}}{x^{3n}} = x^3
$$

$$
4^{2(n+1)+1} = 4^{2n+3} = 4^{2n+1} \cdot 4^2 = 16 \cdot 4^{2n+1} \implies \frac{4^{2n+1}}{4^{2n+3}} = \frac{1}{16}
$$

2. **Fatorar o Coeficiente da Variável $x$ para Achar o Centro $x_0$:**
   Se a série tiver um termo como $(2x + 3)^n$:

$$
(2x + 3)^n = \left[ 2 \left( x + \frac{3}{2} \right) \right]^n = 2^n \cdot \left( x + \frac{3}{2} \right)^n
$$

   > [!NOTE]
   > O centro da série é $x_0 = -\frac{3}{2}$. Ao aplicar a inequação $2 |x + 3/2| < 1$, o raio em $x$ fica $R = \frac{1}{2}$.

---

## 3. 🪵 Logaritmos: Propriedades e Limites Fundamentais

Logaritmos aparecem frequentemente em denominadores de séries como $\sum \frac{x^n}{n \ln n}$.

### Propriedades Essenciais de Manipulação:
- $\ln(a \cdot b) = \ln a + \ln b$
- $\ln\left(\frac{a}{b}\right) = \ln a - \ln b$
- $\ln(a^k) = k \cdot \ln a$

### O Limite de Ouro do Logaritmo:
> [!IMPORTANT]
> Em 99% dos testes da razão, você encontrará a fração $\frac{\ln n}{\ln(n+1)}$. **O limite dessa fração quando $n \to \infty$ é sempre igual a 1!**

$$
\lim_{n \to \infty} \frac{\ln n}{\ln(n+1)} = 1
$$

> **Demonstração Rápida (L'Hôpital):**

$$
\lim_{n \to \infty} \frac{\frac{d}{dn}(\ln n)}{\frac{d}{dn}(\ln(n+1))} = \lim_{n \to \infty} \frac{1/n}{1/(n+1)} = \lim_{n \to \infty} \frac{n+1}{n} = 1
$$

---

## 4. 🎯 Limites Notáveis de Raiz $n$-ésima (para o Teste da Raiz)

> [!IMPORTANT]
> ### ⚠️ Cuidado de Prova: Quando o Raio $R$ é o inverso do limite?
> 
> 1. **No Critério da Raiz (Cauchy):** **SIM!**  
>    Se $L = \lim_{n \to \infty} \sqrt[n]{|c_n|}$, então o raio de convergência é exatamente o inverso: **$R = \frac{1}{L}$** (Fórmula de Cauchy-Hadamard).
> 
> 2. **No Critério da Razão (D'Alembert):** **SIM!**  
>    Se $L = \lim_{n \to \infty} \left| \frac{c_{n+1}}{c_n} \right|$, então o raio é exatamente o inverso: **$R = \frac{1}{L} = \lim_{n \to \infty} \left| \frac{c_n}{c_{n+1}} \right|$**.
> 
> 3. **No Critério da Comparação no Limite:** **NÃO!**  
>    O Critério da Comparação no Limite ($\lim \frac{a_n}{b_n} = C > 0$) serve para comparar o comportamento de duas séries. Se duas séries de potências satisfazem $\lim_{n \to \infty} \left|\frac{a_n}{b_n}\right| = C > 0$, elas têm o **MESMO raio de convergência** ($R_a = R_b$), e não o inverso!

Ao aplicar o Teste da Raiz $L = \lim_{n \to \infty} \sqrt[n]{|u_n(x)|}$, memorize estes **5 limites universais**:

| Expressão | Limite quando $n \to \infty$ | Macete de Prova |
| :--- | :--- | :--- |
| $\lim \sqrt[n]{n}$ | **$1$** | Raiz de $n$ vira 1 |
| $\lim \sqrt[n]{C}$ (para $C > 0$) | **$1$** | Raiz de constante vira 1 |
| $\lim \sqrt[n]{P(n)}$ (polinômio) | **$1$** | Polinômios dentro da raiz viram 1 |
| $\lim \sqrt[n]{\ln n}$ | **$1$** | Logaritmo dentro da raiz vira 1 |
| $\lim \left(1 + \frac{k}{n}\right)^n$ | **$e^k$** | Definição de Euler |

---

## 5. 📊 Dominância de Graus em Frações Polinomiais

Na razão $\left|\frac{c_{n+1}}{c_n}\right|$, quando sobra uma fração entre polinômios $\frac{P(n)}{Q(n)}$:

1. **Mesmo Grau ($\text{grau}(P) = \text{grau}(Q)$):**

$$
\lim_{n \to \infty} \frac{a n^k + \dots}{b n^k + \dots} = \frac{a}{b}
$$

   *Exemplo:* $\frac{(n+1)^2}{n^2} = \frac{n^2+2n+1}{n^2} \to 1$.

2. **Grau do Denominador Maior ($\text{grau}(P) < \text{grau}(Q)$):**

$$
\lim_{n \to \infty} \frac{n+1}{n^2} = 0
$$

---

## 6. 💡 Tabela Macete para Testar as Fronteiras ($x = x_0 \pm R$)

Substituindo $x$ pelos extremos, olhe para a série resultante e identifique o teste imediato:

| Série Resultante na Fronteira | Classificação / Teste | Resultado |
| :--- | :--- | :--- |
| $\sum \frac{1}{n}$ | Série Harmônica ($p=1$) | **Diverge** |
| $\sum \frac{(-1)^n}{n}$ | Série Harmônica Alternada | **Converge** (por Leibniz) |
| $\sum \frac{1}{n^p}$ com $p > 1$ (ex: $1/n^2$) | Série $p$ ($p > 1$) | **Converge** |
| $\sum \frac{1}{n \ln n}$ | Teste da Integral | **Diverge** |
| $\sum \frac{(-1)^n}{n \ln n}$ | Teste de Leibniz | **Converge** |
| $\sum 1^n$ ou $\sum (-1)^n$ | Teste do Termo Geral ($\lim a_n \neq 0$) | **Diverge** |

---

## 7. 📐 O Critério/Teste da Integral (Explicação Completa)

> [!IMPORTANT]
> **Quando usar na prova?** Sempre que os testes da razão e da raiz forem inconclusivos e a série numérica da fronteira for positiva, contínua e decrescente da forma $f(n)$, especialmente quando contiver logaritmos como $\sum \frac{1}{n \ln n}$.

### 1. As 3 Condições Obrigatórias (Hipóteses):
Para aplicar o Teste da Integral em $\sum_{n=k}^{\infty} a_n$, a função $f(x)$ tal que $f(n) = a_n$ deve ser no intervalo $[k, \infty)$:
1. **Contínua**
2. **Positiva** ($f(x) > 0$)
3. **Decrescente** ($f'(x) < 0$ ou $f(x+1) \le f(x)$)

### 2. O Teorema:

$$
\sum_{n=k}^{\infty} a_n \quad \text{e} \quad \int_{k}^{\infty} f(x) \, dx \quad \mathbf{\text{têm exatamente o mesmo comportamento!}}
$$

- Se $\int_{k}^{\infty} f(x) \, dx$ **CONVERGE** (resultado finito) $\implies \sum a_n$ **CONVERGE**.
- Se $\int_{k}^{\infty} f(x) \, dx$ **DIVERGE** (resultado $\infty$) $\implies \sum a_n$ **DIVERGE**.

> [!WARNING]
> **Pegadinha Clássica de Prova:** O valor numérico da integral **NÃO é igual** à soma da série ($\sum a_n \neq \int f(x)dx$). A integral serve APENAS para testar a convergência/divergência.

### 3. Exemplo Prático de Prova ($\sum_{n=2}^{\infty} \frac{1}{n \ln n}$):
1. Função $f(x) = \frac{1}{x \ln x}$ para $x \ge 2$ (contínua, positiva e decrescente).
2. Monte a integral imprópria:

$$
\int_{2}^{\infty} \frac{1}{x \ln x} \, dx = \lim_{t \to \infty} \int_{2}^{t} \frac{1}{x \ln x} \, dx
$$

3. Faça a substituição $u = \ln x \implies du = \frac{1}{x} \, dx$:

$$
\int \frac{du}{u} = \ln|u| = \ln(\ln x)
$$

4. Avalie nos limites de $2$ a $t$:

$$
\lim_{t \to \infty} [\ln(\ln t) - \ln(\ln 2)] = \infty - \text{constante} = \infty
$$

5. **Conclusão:** Como a integral imprópria **diverge para $\infty$**, a série $\sum_{n=2}^{\infty} \frac{1}{n \ln n}$ **DIVERGE**!

---
> **Navegação Rápida:**  
> [⬅️ Voltar ao README](../README.md) | [📘 Resumo Teórico](./calculo_resumo.md) | [⚡ Macetes Algébricos](./calculo_macetes.md) | [🎯 Roteiro](./calculo_roteiro.md) | [📝 Exercícios](./calculo_exercicios.md) | [🔝 Voltar ao Topo](#topo)
