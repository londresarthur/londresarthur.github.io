# 🌐 Topologia no $\mathbb{R}^2$ e a Gênese das Integrais Duplas

> **Módulo:** Cálculo Diferencial e Integral III / Avançado — USP  
> **Data:** 24 de Agosto  
> **Tópico:** Fundamentos Topológicos do Plano, Definição Formal por Somas de Riemann e Condição de Integrabilidade

---

## 1. O Ponto de Partida: O Problema Real da Chapa Metálica

Imagine que você é um engenheiro e precisa calcular a **massa total** de uma chapa metálica plana.

* O formato da chapa no plano $xy$ é um disco circular $D = \{ (x, y) \in \mathbb{R}^2 \mid x^2 + y^2 \le 4 \}$.
* A chapa não é homogênea: a densidade de material varia ponto a ponto segundo a função $f(x, y) = 10 + x^2 + y^2$ (em $\text{g/cm}^2$).

```text
              Plano xy: A Chapa Metálica (Domínio D)
                         y ^
                           │      ╭──────────╮
                           │    ╭╯  Chapa D   ╰╮
                           │   │  f(x,y) > 0   │
                           │   │  (tem massa)  │
                           │    ╰╮            ╭╯
                           │      ╰──────────╯
                     ──────┼───────────────────────> x
                           │   (Aqui fora NÃO há chapa:
                           │    f(x,y) nem existe aqui!)
```

#### Quem é quem nessa história?
* **O Domínio $D$:** É o corpo físico da chapa (a região onde a chapa existe).
* **A Função Original $f(x, y)$:** É a grandeza física (a densidade) definida **exclusivamente dentro da chapa $D$**. Fora de $D$ não há metal, logo $f(x, y)$ não existe fora de $D$.

O objetivo físico é calcular a massa total da chapa através da integral dupla:

$$
M = \iint_D f(x, y) \, dA
$$

---

## 2. Conceitos Fundamentais de Topologia no $\mathbb{R}^2$

Para estabelecer quais regiões $D$ são matematicamente válidas, precisamos da linguagem da Topologia Euclidiana. Seja $(x_0, y_0) \in \mathbb{R}^2$ e $r > 0$.

### 2.1. Bola Aberta (Vizinhança)
A **bola aberta** (ou disco aberto) de centro $(x_0, y_0)$ e raio $r$ é o conjunto:

$$
B_r(x_0, y_0) = \{ (x, y) \in \mathbb{R}^2 \mid (x - x_0)^2 + (y - y_0)^2 < r^2 \}
$$

Intuitivamente, $B_r(x_0, y_0)$ contém todos os pontos cuja distância euclidiana ao centro é estritamente menor que $r$.

---

### 2.2. Classificação de Pontos em Relação a um Subconjunto $A \subset \mathbb{R}^2$

Dado um conjunto $A \subset \mathbb{R}^2$ e um ponto $P = (x_0, y_0) \in \mathbb{R}^2$:

| Classificação | Notação | Definição Formal | Intuição Geométrica |
| :--- | :---: | :--- | :--- |
| **Ponto Interno** | $P \in \text{int}(A)$ | Existe um raio $r > 0$ tal que $B_r(P) \subset A$. | O ponto está folgado dentro de $A$; pode-se mover em qualquer direção e continuar em $A$. |
| **Ponto Externo** | $P \in \text{ext}(A)$ | Existe um raio $r > 0$ tal que $B_r(P) \cap A = \emptyset$. | O ponto está totalmente fora de $A$; há uma vizinhança que não encosta em $A$. |
| **Ponto de Fronteira** | $P \in \partial A$ | Para todo raio $r > 0$, a bola $B_r(P)$ contém pontos de $A$ e pontos fora de $A$. | O ponto está exatamente na linha divisória ou contorno de $A$. |

```text
                  Plano R²
   ───────────────────────────────────────
           • P_ext (Ponto Externo)
                (bola B_r não toca A)
  
          ╭────────────────────────╮
          │   • P_int (Interno)    │
          │   (bola B_r ⊂ A)       │
          │                        │
          │             • P_front  │ ◄── (Ponto de Fronteira)
          ╰─────────────┼──────────╯     (qualquer bola B_r pega
                        ▼                 dentro e fora)
                   Fronteira ∂A
   ───────────────────────────────────────
```

---

### 2.3. Tipologia de Conjuntos

* **Conjunto Aberto:** $A$ é aberto se todo ponto de $A$ é ponto interno ($A = \text{int}(A)$). Não contém nenhum de seus pontos de fronteira ($\partial A \cap A = \emptyset$).
* **Conjunto Fechado:** $A$ é fechado se contém toda a sua fronteira ($\partial A \subset A$), ou seja, o complementar $A^c = \mathbb{R}^2 \setminus A$ é aberto.
* **Conjunto Limitado:** $A$ é limitado se cabe dentro de uma bola grande de raio finito $R$ ($A \subset B_R(0, 0)$).
* **Conjunto Compacto:** No $\mathbb{R}^2$, pelo Teorema de Heine-Borel, um conjunto é **compacto se, e somente se, é fechado e limitado**.

---

## 3. O Impasse da Geometria e o Golpe da Função Estendida $\tilde{f}$

### 3.1. Por que a Grade de Riemann Falha em Domínios Curvilíneos?
Bernhard Riemann formulou a integração dividindo o espaço em uma grade retangular ortogonal (papel milimetrado).
* Em um retângulo, a grade encaixa com perfeição.
* Em uma chapa circular ou curva, os quadradinhos que cruzam a borda são cortados em pedaços irregulares. Como a fórmula de Riemann só sabe multiplicar a área de retângulos completos ($\Delta x \cdot \Delta y$), ela não consegue computar pedaços curvos diretamente.

### 3.2. A Solução: A Função Estendida $\tilde{f}$

Para contornar esse obstáculo:

#### Passo 1: A Moldura Retangular
Encerramos a região limitada $D$ dentro de um retângulo auxiliar grande $R = [a, b] \times [c, d]$, tal que $D \subset R$.

#### Passo 2: O Preenchimento por Vácuo
Definimos a **função estendida** $\tilde{f}: R \to \mathbb{R}$, que assume a função real onde há chapa e zero onde só há ar:

$$
\tilde{f}(x, y) = \begin{cases} f(x, y), & \text{se } (x, y) \in D \\ 0, & \text{se } (x, y) \in R \setminus D \end{cases}
$$

```text
       MOLDURA RETANGULAR R COM A FUNÇÃO ESTENDIDA f̃
       
       ┌───────────────────────────────────────────────┐
       │ Retângulo R                                   │
       │                                               │
       │            f̃(x,y) = 0 (vácuo)                 │
       │                                               │
       │             ╭───────────────────╮             │
       │             │   Chapa D         │             │
       │             │   f̃(x,y) = f(x,y) │             │
       │             │   (densidade real)│             │
       │             ╰───────────────────╯             │
       │                                               │
       │            f̃(x,y) = 0 (vácuo)                 │
       │                                               │
       └───────────────────────────────────────────────┘
```

---

## 4. A Definição Formal: O Limite da Dupla Soma de Riemann

Agora que o domínio é o retângulo perfeito $R = [a, b] \times [c, d]$, podemos construir com total rigor a partição bidimensional de Riemann.

### 4.1. Construção da Partição do Retângulo $R$
1. Dividimos o intervalo $[a, b]$ do eixo $x$ em $n$ subintervalos: $a = x_0 < x_1 < x_2 < \dots < x_n = b$, com $\Delta x_i = x_i - x_{i-1}$.
2. Dividimos o intervalo $[c, d]$ do eixo $y$ em $m$ subintervalos: $c = y_0 < y_1 < y_2 < \dots < y_m = d$, com $\Delta y_j = y_j - y_{j-1}$.
3. O produto dessas partições decompõe $R$ em $n \times m$ sub-retângulos elementares: $R_{ij} = [x_{i-1}, x_i] \times [y_{j-1}, y_j]$.
4. A área de cada sub-retângulo elementar é dada por: $\Delta A_{ij} = \Delta x_i \Delta y_j$.
5. A **norma da partição** $\|\mathcal{P}\|$ (ou diâmetro da malha) é a maior diagonal entre todos os sub-retângulos: $\|\mathcal{P}\| = \max_{i,j} \sqrt{(\Delta x_i)^2 + (\Delta y_j)^2}$.

---

### 4.2. A Dupla Soma de Riemann
Escolhemos um ponto de amostragem arbitrário $(x_{ij}^*, y_{ij}^*)$ dentro de cada sub-retângulo $R_{ij}$. A **dupla soma de Riemann** de $\tilde{f}$ sobre $R$ associada à partição $\mathcal{P}$ é dada por:

$$
S(\tilde{f}, \mathcal{P}) = \sum_{i=1}^n \sum_{j=1}^m \tilde{f}(x_{ij}^*, y_{ij}^*) \, \Delta A_{ij} = \sum_{i=1}^n \sum_{j=1}^m \tilde{f}(x_{ij}^*, y_{ij}^*) \, \Delta x_i \Delta y_j
$$

Cada termo $\tilde{f}(x_{ij}^*, y_{ij}^*) \Delta A_{ij}$ representa o volume de uma coluna prismática vertical 3D de base $\Delta A_{ij}$ e altura $\tilde{f}(x_{ij}^*, y_{ij}^*)$.

```text
                 3 TIPOS DE COLUNAS 3D (PRISMAS)
                 
         z ^
           │         ┌────────┐ ◄── COLUNA INTERNA (R_ij ⊂ int(D)):
           │         │ f(x,y) │     Altura real da superfície,
           │         │        │     volume = f(x_ij*, y_ij*) * ΔA
           │    ┌────┤        ├────┐
           │    │    │        │    │◄── COLUNAS DA BORDA (R_ij ∩ ∂D ≠ ∅):
           │    │ ?  │        │  ? │    Corta a borda (salto de f para 0).
           │  ──┴────┴────────┴────┴──> (x,y)
           │    COLUNAS EXTERNAS (R_ij ⊂ ext(D)):
           │    Altura = 0, Volume = 0
```

---

### 4.3. A Condição Fundamental de Integrabilidade

> [!IMPORTANT]
> **Definição Formal de Integrabilidade:**  
> Dizemos que a função $f$ é **integrável à Riemann em $D$** se a função estendida $\tilde{f}$ for integrável no retângulo $R$, o que significa que o limite das duplas somas de Riemann existe e é finito, resultando no mesmo valor numérico $L \in \mathbb{R}$, independentemente da forma da partição e da escolha dos pontos amostrais.

O limite formal é expresso por:

$$
\lim_{\|\mathcal{P}\| \to 0} \sum_{i=1}^n \sum_{j=1}^m \tilde{f}(x_{ij}^*, y_{ij}^*) \, \Delta x_i \Delta y_j = L \in \mathbb{R}
$$

Quando esse limite existe e é finito, esse valor é chamado de **Integral Dupla de $f$ sobre $D$**:

$$
\iint_D f(x, y) \, dA \equiv \lim_{\|\mathcal{P}\| \to 0} \sum_{i=1}^n \sum_{j=1}^m \tilde{f}(x_{ij}^*, y_{ij}^*) \, \Delta A_{ij}
$$

---

## 5. O Papel da Fronteira $\partial D$ no Cálculo do Limite

Por que esse limite finito tem garantia de existir mesmo com a descontinuidade brusca de $\tilde{f}$ na borda?

Pelo critério das Somas de Darboux (Soma Superior $S$ e Soma Inferior $s$):
1. Para sub-retângulos $R_{ij}$ no **interior** de $D$: a oscilação de $f$ tende a zero porque $f$ é contínua.
2. Para sub-retângulos $R_{ij}$ no **exterior** de $D$: $\tilde{f} = 0$, oscilação é zero.
3. Para sub-retângulos $R_{ij}$ na **fronteira** $\partial D$: a oscilação é no máximo $M = \sup |f|$.

A incerteza máxima total é limitada por:

$$
S(\tilde{f}, \mathcal{P}) - s(\tilde{f}, \mathcal{P}) \le \varepsilon_{\text{int}} + M \sum_{R_{ij} \cap \partial D \neq \emptyset} \text{Area}(R_{ij})
$$

Se a fronteira $\partial D$ tiver **conteúdo nulo de Jordan (área 2D zero)**, ao refinarmos a malha ($\|\mathcal{P}\| \to 0$), a soma das áreas de todos os retângulos que interceptam a fronteira tende a zero:

$$
\lim_{\|\mathcal{P}\| \to 0} \sum_{R_{ij} \cap \partial D \neq \emptyset} \text{Area}(R_{ij}) = 0
$$

O erro na borda é completamente **esmagado para zero**, assegurando a existência e unicidade do limite finito!

---

## 6. Propriedades Fundamentais da Integral Dupla

Sendo $f$ e $g$ funções integráveis sobre $D \subset \mathbb{R}^2$, e $c, k \in \mathbb{R}$:

#### 1. Linearidade
$$
\iint_D [c f(x, y) + k g(x, y)] \, dA = c \iint_D f(x, y) \, dA + k \iint_D g(x, y) \, dA
$$

#### 2. Monotonicidade (Preservação de Ordem)
Se $f(x, y) \le g(x, y)$ para todo $(x, y) \in D$, então:

$$
\iint_D f(x, y) \, dA \le \iint_D g(x, y) \, dA
$$

Em particular, se $f(x, y) \ge 0$, então $\iint_D f(x, y) \, dA \ge 0$.

#### 3. Aditividade de Domínio
Se $D = D_1 \cup D_2$, onde $D_1$ e $D_2$ se interceptam no máximo em suas fronteiras ($\text{Area}(D_1 \cap D_2) = 0$):

$$
\iint_D f(x, y) \, dA = \iint_{D_1} f(x, y) \, dA + \iint_{D_2} f(x, y) \, dA
$$

#### 4. Cálculo de Área Plana
Se integrarmos a função constante $f(x, y) = 1$ sobre $D$:

$$
\text{Area}(D) = \iint_D 1 \, dA
$$

---

## 7. Tabela Sinótica Consolidada

| Conceito | Representação Matemática | Significado no Cálculo 2D |
| :--- | :--- | :--- |
| **Domínio $D$** | $D \subset \mathbb{R}^2$ limitado | Região compacta onde a grandeza física existe. |
| **Função Estendida $\tilde{f}$** | $\tilde{f}(x,y) = f$ em $D$, $0$ fora | Extensão que permite usar caixas retangulares $R$. |
| **Dupla Soma de Riemann** | $\sum \sum \tilde{f}(x_{ij}^*, y_{ij}^*) \Delta x_i \Delta y_j$ | Soma dos volumes dos prismas retangulares 3D. |
| **Condição de Integrabilidade** | $\lim_{\|\mathcal{P}\| \to 0} S(\tilde{f}, \mathcal{P}) = L \in \mathbb{R}$ | O limite das somas existe e é finito e único. |
| **Fronteira $\partial D$** | $\text{Area}(\partial D) = 0$ | A borda tem área nula, esmagando o erro para zero. |
| **Aberto vs. Fechado** | $\iint_{\text{int}(D)} f = \iint_{\bar{D}} f$ | Como a borda tem área nula, a borda não altera o valor da integral. |
