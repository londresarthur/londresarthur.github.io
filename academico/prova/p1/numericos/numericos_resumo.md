<a id="topo"></a>

---
> **Navegação Rápida:**  
> [⬅️ Voltar ao README](../README.md) | [📘 Resumo Teórico](./numericos_resumo.md) | [🎯 Roteiro de Resolução](./numericos_roteiro.md) | [📝 Lista de Exercícios](./numericos_exercicios.md) | [🚨 Plano de Emergência](../plano_estudos_emergencia.md)
---

# Resumo Teórico Mastigado: Métodos Numéricos para EDOs (MAP2220)

> [!IMPORTANT]
> **Acesso Rápido e Sem Complicação:** Este guia traduz a matemática formal de Roma et al. (Capítulos 2 e 3) para uma linguagem direta, intuitiva e acessível de graduação. Sem enrolação acadêmica, focado no que você precisa entender e aplicar na prova!

---

## 1. Redução para a Forma Normal (Sistemas de 1ª Ordem)

### 💡 Por que fazemos isso?
> Computadores e métodos numéricos clássicos (como Euler e Runge-Kutta) **só sabem andar um passinho no tempo por vez** usando EDOs de 1ª ordem (taxa de variação direta).  
> Quando temos uma EDO de 2ª ordem ou mais (que envolve aceleração), a gente "quebra" a equação em um sistema simples de várias variáveis de 1ª ordem.

### 🚘 A Analogia Perfeita do Carro

Imagine que você está analisando a física de um carro em movimento:

| Variável | Significado na Física | Significado na EDO |
| :--- | :--- | :--- |
| **$y_1(t) = y(t)$** | **Posição** do carro | Variável principal (População, Tensão, etc.) |
| **$y_2(t) = y'(t)$** | **Velocidade** do carro | 1ª Derivada ($\frac{dy}{dt}$) |
| **$y_2'(t) = y''(t)$** | **Aceleração** do carro | 2ª Derivada ($\frac{d^2y}{dt^2}$) dada pela EDO |

### 🛠️ Passo a Passo para Montar a Forma Normal

Dada uma EDO de 2ª ordem qualquer:

$$
y''(t) = f(t, y(t), y'(t))
$$

1. **Defina as variáveis de estado:**

$$
\begin{cases}
y_1 = y \\
y_2 = y'
\end{cases}
$$

2. **Escreva as derivadas de cada uma:**
   - A derivada de $y_1$ é a velocidade $y_2$: $\frac{dy_1}{dt} = y_2$
   - A derivada de $y_2$ é a aceleração dada pela EDO: $\frac{dy_2}{dt} = f(t, y_1, y_2)$

3. **Junte tudo no Sistema na Forma Normal:**

$$
\begin{cases}
\frac{dy_1}{dt} = y_2 \\
\frac{dy_2}{dt} = f(t, y_1, y_2)
\end{cases}
$$

---

## 2. Erro de Discretização Local e Consistência (Descomplicado)

### 🎯 O que é o Erro de Discretização Local ($\tau_k$)?
> Imagine que você está usando um GPS. No instante $t_k$, o GPS te dá a sua posição exata no planeta. Você dá **UM ÚNICO PASSO** de tempo $h$ usando a fórmula do computador.  
> O **Erro Local $\tau_k$** é a "mancada" ou imprecisão que a fórmula comete **nesse único passo de tempo**, assumindo que você partiu do lugar 100% correto.

Fórmula do Erro Local em um passo:

$$
\tau_k(h) = \frac{y(t_k + h) - y(t_k)}{h} - \Phi(t_k, y(t_k), h)
$$

onde $\Phi$ é a "inclinação" que a fórmula numérica calcula.

### 🔍 O que é Consistência? (O teste do passo super curto)
- **Ideia Intuitiva:** Um método é **consistente** se, ao fazer o tamanho do passo $h$ encolher até virar quase zero ($h \to 0$), o erro cometido em cada passo desaparece!
- **Ordem de Consistência ($q$):** É a velocidade com que o erro local encolhe quando você diminui $h$:
  - Se $\tau_k \propto h^1 \implies$ **1ª Ordem de Consistência ($q = 1$)** (Método de Euler).
  - Se $\tau_k \propto h^2 \implies$ **2ª Ordem de Consistência ($q = 2$)** (Euler Aprimorado / Ponto Médio).
  - Se $\tau_k \propto h^4 \implies$ **4ª Ordem de Consistência ($q = 4$)** (Runge-Kutta RK4).

---

## 3. Erro de Discretização Global e Convergência (Sem Mistério)

### 🧳 O que é o Erro Global ($e_k$)?
> É o **erro acumulado na viagem inteira**! É a diferença entre onde o seu método numérico te levou no final da simulação ($y_k$) e onde a solução exata da matemática realmente está ($y(t_k)$).

$$
\text{Erro Global } e_k = y(t_k) - y_k
$$

### 🔄 Diferença Prática entre Consistência e Convergência

| Conceito | Pergunta que ele responde | Como se mede? |
| :--- | :--- | :--- |
| **Consistência ($q$)** | *A fórmula do computador erra muito em 1 único passo curto?* | Avalia o erro em 1 passo de tamanho $h$ ($\tau_k \le C h^q$). |
| **Convergência ($p$)** | *Se eu fizer a simulação inteira até o final, o resultado numérico vai grudar na curva real quando $h \to 0$?* | Avalia a diferença acumulada no final ($e_k \to 0$). |

> [!TIP]
> **Regra de Ouro de Roma et al.:**  
> Se o seu método é **consistente de ordem $q$** e a função não tem comportamentos malucos (é Lipschitziana), então ele **COM CERTEZA É CONVERGENTE**, e a ordem de precisão global é $p = q$!

---

## 4. Métodos da Série de Taylor (Aprenda a Usar)

### 💡 Qual é a ideia?
Para prever onde uma função vai estar no futuro próximo, usamos a Série de Taylor da derivada:

$$
y(t + h) \approx y(t) + h \cdot y'(t) + \frac{h^2}{2} \cdot y''(t)
$$

### 📝 O Método da Série de Taylor de 2ª Ordem ($T_2$)
Como a EDO nos dá $y'(t) = f(t,y)$, para achar a 2ª derivada $y''(t)$ usamos a regra da cadeia no papel:

$$
y''(t) = \frac{d}{dt} f(t, y(t)) = \frac{\partial f}{\partial t} + \frac{\partial f}{\partial y} \cdot f(t, y)
$$

A fórmula de atualização do **Método $T_2$** fica mastigada assim:

$$
y_{k+1} = y_k + h \cdot f(t_k, y_k) + \frac{h^2}{2} \cdot \left[ f_t(t_k, y_k) + f_y(t_k, y_k) \cdot f(t_k, y_k) \right]
$$

- **Vantagem:** É super preciso (2ª ordem, erro $O(h^2)$).
- **Desvantagem:** Exige que você derive $f(t,y)$ no papel. Se a função for horrível, a derivada vira um pesadelo!

---

## 5. Métodos de Runge-Kutta (O "Truque de Mestre" dos Engenheiros)

### 🚀 Por que todo mundo ama o Runge-Kutta?
> **O Grande Truque:** O Runge-Kutta consegue a **mesma precisão alta da Série de Taylor**, mas **SEM VOCÊ PRECISAR DERIVAR NADA NO PAPEL**!  
> Como ele faz essa mágica? Em vez de calcular derivadas $f_t$ e $f_y$, ele simplesmente calcula o valor da função $f(t,y)$ em 2, 3 ou 4 pontos intermediários e tira uma **média ponderada inteligente**!

---

### 🟢 1. Métodos de Runge-Kutta de 2ª Ordem (RK2)

Existem duas formas famosas de fazer isso com 2 pontos (estágios):

#### **A) Método de Euler Aprimorado (ou Método de Heun)**
- **Como funciona:** Calcula a velocidade na largada ($\kappa_1$), dá um pulo prévio até o final do passo para estimar a velocidade lá ($\kappa_2$), e tira a média aritmética exata das duas velocidades!

$$
\kappa_1 = f(t_k, y_k) \quad \text{(Velocidade na largada)}
$$

$$
\kappa_2 = f(t_k + h, y_k + h \cdot \kappa_1) \quad \text{(Velocidade estimada no final)}
$$

$$
y_{k+1} = y_k + \frac{h}{2} (\kappa_1 + \kappa_2) \quad \text{(Atualizacao pela media)}
$$

#### **B) Método de Euler Modificado (ou Método do Ponto Médio)**
- **Como funciona:** Calcula a velocidade na largada ($\kappa_1$), usa ela para andar até o **meio do caminho** ($t_k + h/2$), calcula a velocidade exatamente no meio ($\kappa_2$), e usa essa velocidade do meio para dar o passo inteiro!

$$
\kappa_1 = f(t_k, y_k)
$$

$$
\kappa_2 = f\left(t_k + \frac{h}{2}, y_k + \frac{h}{2} \cdot \kappa_1\right) \quad \text{(Velocidade no meio do caminho)}
$$

$$
y_{k+1} = y_k + h \cdot \kappa_2
$$

---

### 🌟 2. O Famoso Runge-Kutta Clássico de 4ª Ordem (RK4)

> É o método mais famoso de toda a matemática aplicada para EDOs! Ele atinge precisão de 4ª ordem (erro global $O(h^4)$) avaliando $f$ em 4 pontos:

$$
\begin{cases}
\kappa_1 = f(t_k, y_k) \quad \text{(Inicio do passo)} \\
\kappa_2 = f\left(t_k + \frac{h}{2}, y_k + \frac{h}{2} \kappa_1\right) \quad \text{(1ª estimativa no meio)} \\
\kappa_3 = f\left(t_k + \frac{h}{2}, y_k + \frac{h}{2} \kappa_2\right) \quad \text{(2ª estimativa no meio)} \\
\kappa_4 = f(t_k + h, y_k + h \kappa_3) \quad \text{(Fim do passo)}
\end{cases}
$$

A atualização é a média ponderada (dando peso duplo para o meio do caminho):

$$
y_{k+1} = y_k + \frac{h}{6} \left( \kappa_1 + 2\kappa_2 + 2\kappa_3 + \kappa_4 \right)
$$

---

## 📊 Tabela Comparativa Mastigada para a Prova

| Método Numérico | Tipo | Ordem de Precisão Global | Precisa derivar $f$ no papel? | Quantas vezes avalia $f$ por passo? |
| :--- | :---: | :---: | :---: | :---: |
| **Euler Explícito** | Passo Único | 1ª Ordem ($O(h)$) | ❌ Não | 1 vez |
| **Série de Taylor (T2)** | Passo Único | 2ª Ordem ($O(h^2)$) | ⚠️ **SIM** ($f_t, f_y$) | 1 vez |
| **Euler Aprimorado (Heun)** | Runge-Kutta | 2ª Ordem ($O(h^2)$) | ❌ Não | 2 vezes |
| **Ponto Médio (Euler Mod.)** | Runge-Kutta | 2ª Ordem ($O(h^2)$) | ❌ Não | 2 vezes |
| **Runge-Kutta Clássico (RK4)**| Runge-Kutta | 4ª Ordem ($O(h^4)$) | ❌ Não | 4 vezes |

---

---
> **Navegação Rápida:**  
> [⬅️ Voltar ao README](../README.md) | [📘 Resumo Teórico](./numericos_resumo.md) | [🎯 Roteiro de Resolução](./numericos_roteiro.md) | [📝 Lista de Exercícios](./numericos_exercicios.md) | [🔝 Voltar ao Topo](#topo)
