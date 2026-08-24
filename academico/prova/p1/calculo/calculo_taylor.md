<a id="topo"></a>

---
> **Navegação Rápida:**  
> [⬅️ Voltar ao README](../README.md) | [📘 Resumo Teórico](./calculo_resumo.md) | [⚡ Macetes Algébricos](./calculo_macetes.md) | [📐 Polinômios de Taylor (1 e 2 var)](./calculo_taylor.md) | [🎯 Roteiro](./calculo_roteiro.md) | [📝 Exercícios](./calculo_exercicios.md) | [🚨 Plano de Emergência](../plano_estudos_emergencia.md)
---

# 📐 Aproximação e Polinômios de Taylor (1 e 2 Variáveis)

> [!IMPORTANT]
> **Dica do Professor para a Prova:** Guia definitivo sobre como aproximar funções de 1 variável $f(x)$ e de 2 variáveis $f(x,y)$ por Polinômios e Séries de Taylor (e Maclaurin), com fórmulas, Matriz Hessiana e macetes de resolução.

---

## 1. 🎯 Aproximação de Taylor para 1 Variável ($f(x)$)

### A) Fórmula Geral do Polinômio de Taylor em torno de $x_0$
O Polinômio de Taylor de grau $N$ de uma função $f(x)$ em torno do ponto $x = x_0$ é dado por:

$$
P_N(x) = f(x_0) + f'(x_0)(x - x_0) + \frac{f''(x_0)}{2!}(x - x_0)^2 + \frac{f'''(x_0)}{3!}(x - x_0)^3 + \dots + \frac{f^{(N)}(x_0)}{N!}(x - x_0)^N
$$

Em notação de somatório:

$$
P_N(x) = \sum_{n=0}^{N} \frac{f^{(n)}(x_0)}{n!} (x - x_0)^n
$$

> [!NOTE]
> Quando o centro é $x_0 = 0$, o Polinômio de Taylor recebe o nome especial de **Polinômio de Maclaurin**.

---

### B) Séries Notáveis de Maclaurin ($x_0 = 0$) — **Memorização Obrigatória**

Na prova, **não calcule derivadas sucessivas** para estas funções fundamentais; use diretamente as séries padrão:

| Função $f(x)$ | Série de Maclaurin em torno de $x_0 = 0$ | Termos Iniciais ($P_4(x)$ ou $P_5(x)$) | Raio $R$ |
| :--- | :--- | :--- | :--- |
| **$e^x$** | $\sum_{n=0}^{\infty} \frac{x^n}{n!}$ | $1 + x + \frac{x^2}{2} + \frac{x^3}{6} + \frac{x^4}{24} + \dots$ | $\infty$ |
| **$\cos x$** | $\sum_{n=0}^{\infty} \frac{(-1)^n x^{2n}}{(2n)!}$ | $1 - \frac{x^2}{2} + \frac{x^4}{24} - \frac{x^6}{720} + \dots$ | $\infty$ |
| **$\operatorname{sen} x$** | $\sum_{n=0}^{\infty} \frac{(-1)^n x^{2n+1}}{(2n+1)!}$ | $x - \frac{x^3}{6} + \frac{x^5}{120} - \dots$ | $\infty$ |
| **$\frac{1}{1-x}$** | $\sum_{n=0}^{\infty} x^n$ | $1 + x + x^2 + x^3 + x^4 + \dots$ | $1$ |
| **$\ln(1+x)$** | $\sum_{n=1}^{\infty} \frac{(-1)^{n-1} x^n}{n}$ | $x - \frac{x^2}{2} + \frac{x^3}{3} - \frac{x^4}{4} + \dots$ | $1$ |
| **$\cosh x$** | $\sum_{n=0}^{\infty} \frac{x^{2n}}{(2n)!}$ | $1 + \frac{x^2}{2} + \frac{x^4}{24} + \dots$ | $\infty$ |
| **$\sinh x$** | $\sum_{n=0}^{\infty} \frac{x^{2n+1}}{(2n+1)!}$ | $x + \frac{x^3}{6} + \frac{x^5}{120} + \dots$ | $\infty$ |

---

### C) Macete de Substituição Direta

Para encontrar a série de funções compostas como $e^{-x^2}$ ou $\cos(x^2)$, basta substituir a variável na série notável:

1. **Série de $f(x) = e^{-x^2}$:**
   Troque $x$ por $(-x^2)$ na série de $e^x$:

$$
e^{-x^2} = \sum_{n=0}^{\infty} \frac{(-x^2)^n}{n!} = \sum_{n=0}^{\infty} \frac{(-1)^n x^{2n}}{n!} = 1 - x^2 + \frac{x^4}{2} - \frac{x^6}{6} + \dots
$$

2. **Série de $f(x) = \cos(x^2)$:**
   Troque $x$ por $(x^2)$ na série do $\cos x$:

$$
\cos(x^2) = \sum_{n=0}^{\infty} \frac{(-1)^n (x^2)^{2n}}{(2n)!} = \sum_{n=0}^{\infty} \frac{(-1)^n x^{4n}}{(2n)!} = 1 - \frac{x^4}{2} + \frac{x^8}{24} - \dots
$$

3. **Integração Termo a Termo ($\int_0^1 e^{-x^2} dx$ com erro $< 0,001$):**

$$
\int_0^1 e^{-x^2} dx = \int_0^1 \left( 1 - x^2 + \frac{x^4}{2} - \frac{x^6}{6} + \dots \right) dx = \left[ x - \frac{x^3}{3} + \frac{x^5}{10} - \frac{x^7}{42} + \dots \right]_0^1
$$

$$
= 1 - \frac{1}{3} + \frac{1}{10} - \frac{1}{42} + \dots \approx 1 - 0,3333 + 0,1 - 0,0238 = 0,7428
$$

   Como é uma série alternada convergente, o erro de truncamento no termo $N$ é estritamente menor que o valor absoluto do primeiro termo omitido ($|R_N| \le b_{N+1}$).

---

## 2. 🌌 Aproximação de Taylor para 2 Variáveis ($f(x, y)$)

Para funções de duas variáveis $f(x, y)$ em torno de um ponto $(x_0, y_0)$, construímos aproximações polinomiais usando **Derivadas Parciais**.

---

### A) Aproximação Linear / Taylor de Ordem 1 (Plano Tangente)

$$
P_1(x, y) = f(x_0, y_0) + \frac{\partial f}{\partial x}(x_0, y_0)(x - x_0) + \frac{\partial f}{\partial y}(x_0, y_0)(y - y_0)
$$

- **Significado Geométrico:** É a equação do **Plano Tangente** à superfície $z = f(x, y)$ no ponto $(x_0, y_0)$.

---

### B) Aproximação Quadrática / Taylor de Ordem 2 (Com Matriz Hessiana)
O Polinômio de Taylor de 2ª ordem incorpora as curvaturas (derivadas parciais de 2ª ordem):

$$
P_2(x, y) = f(x_0, y_0) + \left[ f_x(x_0, y_0)(x - x_0) + f_y(x_0, y_0)(y - y_0) \right] + \frac{1}{2} \left[ f_{xx}(x_0, y_0)(x - x_0)^2 + 2 f_{xy}(x_0, y_0)(x - x_0)(y - y_0) + f_{yy}(x_0, y_0)(y - y_0)^2 \right]
$$

Onde:
- $f_x = \frac{\partial f}{\partial x}$, $f_y = \frac{\partial f}{\partial y}$
- $f_{xx} = \frac{\partial^2 f}{\partial x^2}$, $f_{yy} = \frac{\partial^2 f}{\partial y^2}$
- $f_{xy} = \frac{\partial^2 f}{\partial x \partial y}$ (Derivada mista, igual a $f_{yx}$ pelo Teorema de Schwarz).

---

### C) Forma Matricial Elegante (Vetor Gradiente e Matriz Hessiana)

Escrevendo $\Delta \mathbf{x} = \begin{bmatrix} x - x_0 \\ y - y_0 \end{bmatrix}$, o vetor Gradiente $\nabla f$ e a Matriz Hessiana $H_f$:

$$
\nabla f(x_0, y_0) = \begin{bmatrix} f_x(x_0, y_0) \\ f_y(x_0, y_0) \end{bmatrix}, \quad H_f(x_0, y_0) = \begin{bmatrix} f_{xx}(x_0, y_0) & f_{xy}(x_0, y_0) \\ f_{yx}(x_0, y_0) & f_{yy}(x_0, y_0) \end{bmatrix}
$$

$$
P_2(x, y) = f(x_0, y_0) + \nabla f(x_0, y_0)^T \Delta \mathbf{x} + \frac{1}{2} \Delta \mathbf{x}^T H_f(x_0, y_0) \Delta \mathbf{x}
$$

---

### D) Macete de Multiplicação de Séries para 2 Variáveis em torno de $(0,0)$

Para achar a aproximação de $f(x,y)$ em torno de $(0,0)$ sem calcular derivadas parciais pesadas, **multiplique as séries de Maclaurin de 1 variável**:

#### **Exemplo Clássico de Prova:** Achar o Polinômio de Taylor de 2ª Ordem de $f(x, y) = e^x \operatorname{sen} y$ em torno de $(0,0)$.

1. Escreva as séries de Maclaurin de cada fator até a ordem desejada:
   - $e^x = 1 + x + \frac{x^2}{2} + O(x^3)$
   - $\operatorname{sen} y = y - \frac{y^3}{6} + O(y^5)$

2. Multiplique os polinômios mantendo apenas os termos de grau total $\le 2$:

$$
f(x, y) = \left( 1 + x + \frac{x^2}{2} \right) \cdot \left( y - \frac{y^3}{6} \right) = 1 \cdot y + x \cdot y + \dots = y + xy
$$

3. **Polinômio de Taylor de Ordem 2:**

$$
P_2(x, y) = y + xy
$$

---

## 3. 📝 Resumo Comparativo: 1 Variável vs 2 Variáveis

| Propriedade | 1 Variável ($f(x)$) | 2 Variáveis ($f(x, y)$) |
| :--- | :--- | :--- |
| **Centro** | $x_0$ | $(x_0, y_0)$ |
| **Ordem 1** | $f(x_0) + f'(x_0)(x - x_0)$ (Reta Tangente) | $f(x_0, y_0) + f_x \Delta x + f_y \Delta y$ (Plano Tangente) |
| **Ordem 2** | $+ \frac{f''(x_0)}{2}(x - x_0)^2$ | $+ \frac{1}{2} \left[ f_{xx}\Delta x^2 + 2f_{xy}\Delta x \Delta y + f_{yy}\Delta y^2 \right]$ |
| **Matriz Associada** | Derivada 2ª escalar $f''(x_0)$ | **Matriz Hessiana** $H_f = \begin{bmatrix} f_{xx} & f_{xy} \\ f_{xy} & f_{yy} \end{bmatrix}$ |

---

## 4. ⏱️ Séries de Taylor com Passo $h$ (Formulação Discreta)

Nas aplicações de Engenharia e Métodos Numéricos, em vez de usar a distância $(x - x_0)$, escrevemos $x = x_0 + h$, onde $h$ representa o **passo de integração ou incremento**.

---

### A) 1 Variável com Passo $h$ ($x = x_0 + h$)

Substituindo $x - x_0 = h$ na expansão clássica:

$$
f(x_0 + h) = f(x_0) + f'(x_0) \cdot h + \frac{f''(x_0)}{2!} \cdot h^2 + \frac{f'''(x_0)}{3!} \cdot h^3 + \dots + \frac{f^{(N)}(x_0)}{N!} \cdot h^N + O(h^{N+1})
$$

> [!TIP]
> **Conexão com Diferenças Finitas (Métodos Numéricos):**
> 
> 1. **Diferença Avançada (Euler Explícito):** Truncando na 1ª ordem ($O(h)$):

$$
f(x_0 + h) \approx f(x_0) + h \cdot f'(x_0) \implies f'(x_0) \approx \frac{f(x_0+h) - f(x_0)}{h} \quad (\text{Erro } O(h))
$$

> 2. **Diferença Centrada da 1ª Derivada:** Subtraindo $f(x_0+h) - f(x_0-h)$:

$$
f'(x_0) \approx \frac{f(x_0+h) - f(x_0-h)}{2h} \quad (\text{Erro } O(h^2))
$$

> 3. **Diferença Centrada da 2ª Derivada:** Somando $f(x_0+h) + f(x_0-h)$:

$$
f''(x_0) \approx \frac{f(x_0+h) - 2f(x_0) + f(x_0-h)}{h^2} \quad (\text{Erro } O(h^2))
$$

---

### B) 2 Variáveis com Passos $h$ e $k$ ($\Delta x = h, \Delta y = k$)

Para $f(x_0 + h, y_0 + k)$, onde $h$ é o incremento em $x$ e $k$ é o incremento em $y$:

$$
f(x_0 + h, y_0 + k) = f(x_0, y_0) + \left[ h \frac{\partial f}{\partial x} + k \frac{\partial f}{\partial y} \right]_{(x_0, y_0)} + \frac{1}{2!} \left[ h^2 \frac{\partial^2 f}{\partial x^2} + 2hk \frac{\partial^2 f}{\partial x \partial y} + k^2 \frac{\partial^2 f}{\partial y^2} \right]_{(x_0, y_0)} + O((h^2+k^2)^{3/2})
$$

#### **1. Notação de Operadores Diferenciais:**

$$
f(x_0 + h, y_0 + k) = \sum_{n=0}^{N} \frac{1}{n!} \left( h \frac{\partial}{\partial x} + k \frac{\partial}{\partial y} \right)^n f(x_0, y_0) + R_N
$$

- Para $n=1$: $\left( h \frac{\partial}{\partial x} + k \frac{\partial}{\partial y} \right) f = h f_x + k f_y$
- Para $n=2$: $\left( h \frac{\partial}{\partial x} + k \frac{\partial}{\partial y} \right)^2 f = h^2 f_{xx} + 2hk f_{xy} + k^2 f_{yy}$

#### **2. Notação Matricial Vetorial (Vetor Passo $\mathbf{h} = \begin{bmatrix} h \\ k \end{bmatrix}$):**

$$
f(\mathbf{x}_0 + \mathbf{h}) = f(\mathbf{x}_0) + \nabla f(\mathbf{x}_0)^T \mathbf{h} + \frac{1}{2} \mathbf{h}^T H_f(\mathbf{x}_0) \mathbf{h} + O(\|\mathbf{h}\|^3)
$$

Onde:
- $\mathbf{x}_0 = \begin{bmatrix} x_0 \\ y_0 \end{bmatrix}$ (Ponto de expansão)
- $\mathbf{h} = \begin{bmatrix} h \\ k \end{bmatrix}$ (Vetor de passo/incremento)
- $\nabla f(\mathbf{x}_0) = \begin{bmatrix} f_x \\ f_y \end{bmatrix}$ (Vetor Gradiente)
- $H_f(\mathbf{x}_0) = \begin{bmatrix} f_{xx} & f_{xy} \\ f_{yx} & f_{yy} \end{bmatrix}$ (Matriz Hessiana)

---
> **Navegação Rápida:**  
> [⬅️ Voltar ao README](../README.md) | [📘 Resumo Teórico](./calculo_resumo.md) | [⚡ Macetes Algébricos](./calculo_macetes.md) | [📐 Polinômios de Taylor (1 e 2 var)](./calculo_taylor.md) | [🎯 Roteiro](./calculo_roteiro.md) | [📝 Exercícios](./calculo_exercicios.md) | [🔝 Voltar ao Topo](#topo)
