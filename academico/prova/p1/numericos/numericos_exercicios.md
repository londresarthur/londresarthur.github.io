<a id="topo"></a>

---
> **Navegação Rápida:**  
> [⬅️ Voltar ao README](../README.md) | [📘 Resumo Teórico](./numericos_resumo.md) | [🎯 Roteiro de Resolução](./numericos_roteiro.md) | [📝 Lista de Exercícios](./numericos_exercicios.md) | [🚨 Plano de Emergência](../plano_estudos_emergencia.md)
---

# Lista de Exercícios Resolvidos Mastigada: Métodos Numéricos (MAP2220)

---

## Exercício 1: Modelo de Dinâmica Populacional Não-Linear de 2ª Ordem

Considere a seguinte EDO de 2ª ordem que modela o crescimento de uma população com resistência ambiental:

$$
\frac{d^2 N}{dt^2} + \gamma \frac{dN}{dt} = r N \left(1 - \frac{N}{K}\right) + g(t), \quad t \in [t_0, T]
$$

com condições iniciais $N(t_0) = N_0$ e $\frac{dN}{dt}(t_0) = v_0$.

---

### Item 1) Unidades Métricas e Análise Dimensional Mastigada

#### **Resolução Passo a Passo Simples:**

1. **Definindo as unidades conhecidas:**
   - População $N(t)$: $[\text{ind}]$ (indivíduos).
   - Tempo $t$: $[\text{s}]$ (segundos).
   - Derivada 1ª $N'(t)$: $\frac{[\text{ind}]}{[\text{s}]} = [\text{ind} \cdot \text{s}^{-1}]$ (Velocidade populacional).
   - Derivada 2ª $N''(t)$: $\frac{[\text{ind}]}{[\text{s}]^2} = [\text{ind} \cdot \text{s}^{-2}]$ (Aceleração populacional).

2. **Descobrindo a unidade de cada parâmetro:**
   - O termo de maior ordem é $N''$, com unidade $[\text{ind} \cdot \text{s}^{-2}]$. **Todos os outros termos devem ter essa mesma unidade!**
   - **Parâmetro $\gamma$:** No termo $\gamma N'$, queremos $[\gamma] \cdot [\text{ind} \cdot \text{s}^{-1}] = [\text{ind} \cdot \text{s}^{-2}] \implies [\gamma] = [\text{s}^{-1}]$.
   - **Parâmetro $K$:** Na fração $\frac{N}{K}$, para a fração ser sem unidade, $K$ precisa ter a mesma unidade de $N \implies [K] = [\text{ind}]$ (capacidade máxima de suporte).
   - **Parâmetro $r$:** No termo $r N$, queremos $[r] \cdot [\text{ind}] = [\text{ind} \cdot \text{s}^{-2}] \implies [r] = [\text{s}^{-2}]$.
   - **Função $g(t)$:** É o termo ambiental solto $\implies [g(t)] = [\text{ind} \cdot \text{s}^{-2}]$.

> [!IMPORTANT]
> **Conclusão:** Todos os termos têm unidade de aceleração populacional $[\text{ind} \cdot \text{s}^{-2}]$. A equação está dimensionalmente correta e consistente!

---

### Item 2) Reescrita na Forma Normal (Reduzindo para 1ª Ordem)

#### **Resolução Passo a Passo:**

1. **Isole a maior derivada $N''$:**

$$
N'' = -\gamma N' + r N \left(1 - \frac{N}{K}\right) + g(t)
$$

2. **Crie as variáveis de 1ª ordem:**
   - $y_1(t) = N(t)$ (Tamanho da população)
   - $y_2(t) = N'(t)$ (Taxa de variação / Velocidade)

3. **Escreva as derivadas:**
   - $\frac{dy_1}{dt} = y_2$
   - $\frac{dy_2}{dt} = -\gamma y_2 + r y_1 \left(1 - \frac{y_1}{K}\right) + g(t)$

> [!IMPORTANT]
> **Forma Normal Final para a Prova:**

$$
\begin{cases}
\frac{dy_1}{dt} = y_2 \\
\frac{dy_2}{dt} = -\gamma y_2 + r y_1 \left(1 - \frac{y_1}{K}\right) + g(t)
\end{cases}
$$

Com o vetor inicial $\begin{bmatrix} y_1(t_0) \\ y_2(t_0) \end{bmatrix} = \begin{bmatrix} N_0 \\ v_0 \end{bmatrix}$.

---

### Item 3) Discretização pelo Método de Euler Explícito

#### **Resolução Fórmulas Prontas:**

**Forma Componente a Componente (linha por linha):**

$$
\begin{cases}
y_{1, n+1} = y_{1,n} + h \cdot y_{2,n} \\
y_{2, n+1} = y_{2,n} + h \cdot \left[ -\gamma y_{2,n} + r y_{1,n} \left(1 - \frac{y_{1,n}}{K}\right) + g(t_n) \right]
\end{cases}
$$

---

## Exercício 2: Teste Prático de Consistência e Ordem de Métodos (Roma et al., Exercício 2.1)

Descubra a Ordem de Consistência $q$ do **Método de Euler Aprimorado (Heun)**:

$$
y_{k+1} = y_k + \frac{h}{2} \left[ f(t_k, y_k) + f(t_k + h, y_k + h f(t_k, y_k)) \right]
$$

---

### Resolução Mastigada:

1. **O que é o Erro Local $\tau_k$?**
   É a diferença entre a derivada real da solução por Taylor e a inclinação calculada pela fórmula.

2. **Expandindo a solução exata por Taylor até ordem 2:**

$$
\frac{y(t_k + h) - y(t_k)}{h} = y'(t_k) + \frac{h}{2} y''(t_k) + O(h^2) = f + \frac{h}{2} (f_t + f_y f) + O(h^2)
$$

3. **Expandindo a inclinação da fórmula por Taylor:**

$$
\Phi(t_k, y_k, h) = \frac{1}{2} f + \frac{1}{2} \left[ f + h f_t + h f_y f + O(h^2) \right] = f + \frac{h}{2} (f_t + f_y f) + O(h^2)
$$

4. **Subtraindo as duas expressões:**

$$
\tau_k = \left[ f + \frac{h}{2} (f_t + f_y f) + O(h^2) \right] - \left[ f + \frac{h}{2} (f_t + f_y f) + O(h^2) \right] = O(h^2)
$$

> [!IMPORTANT]
> **Conclusão:** Como o termo em $h^1$ se cancelou perfeitamente, sobrou apenas o termo $O(h^2)$. Isso prova que o Método de Euler Aprimorado é **consistente de 2ª ORDEM ($q = 2$)**!

---

## Exercício 3: Exemplo Numérico Prático — Taylor (T2) vs Runge-Kutta (RK4)

Considere a EDO bem simples:

$$
\dot{y}(t) = t + y(t), \quad y(0) = 1
$$

Queremos dar **UM PASSO DE TEMPO** de $h = 0{,}1$ para calcular $y(0{,}1)$ usando:
1. Método da Série de Taylor de 2ª Ordem ($T_2$).
2. Método de Runge-Kutta de 4ª Ordem ($RK4$).

*(Dado: A solução exata dessa EDO é $y(t) = 2e^t - t - 1$, e o valor exato no tempo $t=0{,}1$ é $y(0{,}1) = 1{,}110342$).*

---

### Solução Passo a Passo:

#### **1. Aplicando a Série de Taylor de 2ª Ordem ($T_2$)**
- Função $f(t,y) = t + y$.
- Derivada total $D f = f_t + f_y f = 1 + 1 \cdot (t + y) = 1 + t + y$.
- Fórmula do $T_2$:

$$
y_1 = y_0 + h f(t_0, y_0) + \frac{h^2}{2} D f(t_0, y_0)
$$

- Substituindo os números ($t_0 = 0, y_0 = 1, h = 0{,}1$):
  - $f(0, 1) = 0 + 1 = 1$
  - $D f(0, 1) = 1 + 0 + 1 = 2$
  - $y_1 = 1 + 0{,}1(1) + \frac{0{,}01}{2}(2) = 1 + 0{,}1 + 0{,}01 = \mathbf{1{,}110000}$

*Erro do $T_2$: $|1{,}110342 - 1{,}110000| = 0{,}000342$ (muito pequeno!).*

---

#### **2. Aplicando o Runge-Kutta de 4ª Ordem ($RK4$)**
Calculando as 4 inclinações para $h = 0{,}1, t_0 = 0, y_0 = 1$:

1. $\kappa_1 = f(0, 1) = 0 + 1 = 1{,}000000$
2. $\kappa_2 = f(0 + 0{,}05, 1 + 0{,}05(1)) = f(0{,}05, 1{,}05) = 0{,}05 + 1{,}05 = 1{,}100000$
3. $\kappa_3 = f(0 + 0{,}05, 1 + 0{,}05(1{,}1)) = f(0{,}05, 1{,}055) = 0{,}05 + 1{,}055 = 1{,}105000$
4. $\kappa_4 = f(0{,}1, 1 + 0{,}1(1{,}105)) = f(0{,}1, 1{,}1105) = 0{,}1 + 1{,}1105 = 1{,}210500$

Agora tirando a média ponderada do RK4:

$$
y_1 = 1 + \frac{0{,}1}{6} \left( 1{,}000000 + 2(1{,}100000) + 2(1{,}105000) + 1{,}210500 \right)
$$

$$
y_1 = 1 + \frac{0{,}1}{6} (6{,}620500) = \mathbf{1{,}11034167}
$$

*Erro do RK4: $|1{,}110342 - 1{,}11034167| = 0{,}0000003$ (precisão absurda de 6 casas decimais em um único passo sem derivar nada!).*

---

---
> **Navegação Rápida:**  
> [⬅️ Voltar ao README](../README.md) | [📘 Resumo Teórico](./numericos_resumo.md) | [🎯 Roteiro de Resolução](./numericos_roteiro.md) | [📝 Lista de Exercícios](./numericos_exercicios.md) | [🔝 Voltar ao Topo](#topo)
