<a id="topo"></a>

---
> **Navegação Rápida:**  
> [⬅️ Voltar ao README](./README.md) | [📘 Resumo Teórico](./calculo_resumo.md) | [⚡ Macetes Algébricos](./calculo_macetes.md) | [🎯 Roteiro de Resolução](./calculo_roteiro.md) | [📝 Exercícios Resolvidos](./calculo_exercicios.md)
---

# 🎯 Roteiro de Resolução Passo a Passo (Cálculo II - P2)

> [!NOTE]
> **Como usar este guia:** Escolha o tipo de questão que você está enfrentando na lista ou na prova e siga o algoritmo correspondente para resolver sem erro.

---

## 📌 Tipo 1: Raio e Intervalo de Convergência (Q1, Q2, Q3)

```mermaid
graph TD
    A["Identificar termo u_n(x)"] --> B["Calcular razão |u_{n+1}/u_n|"]
    B --> C["Calcular limite L quando n -> infinito"]
    C --> D{"Impor L < 1"}
    D -->|"L = 0"| E["R = infinito, I = (-inf, inf)"]
    D -->|"L = C|x - x0|^k < 1"| F["Isolar |x - x0| < R"]
    F --> G{"O exercício pediu apenas RAIO ou INTERVALO?"}
    G -->|"Apenas Raio"| H["FIM: Responder R"]
    G -->|"Pediu Intervalo"| I["Testar x = x0 - R e x = x0 + R"]
```

### Checklist de Execução:
1. **Termo Geral:** Identifique $u_n(x)$ com todos os sinais e índices.
2. **Montar Razão:** $\left|\frac{u_{n+1}(x)}{u_n(x)}\right| = |u_{n+1}(x)| \cdot \frac{1}{|u_n(x)|}$.
3. **Cancelar:** Fatoriais $\to \frac{1}{n+1}$, potências $\to x^k$, polinômios/logaritmos $\to 1$.
4. **Impor $L < 1$:** Isole $|x - x_0| < R$.
5. **Se pediu Intervalo:** Substitua cada extremo e use Leibniz, Série $p$ ou Teste da Divergência.

---

## 📌 Tipo 2: Obter Séries de Potências em torno de $x_0 = 0$ (Q4)

```mermaid
graph TD
    A["Função f(x)"] --> B{"Qual é a base fundamental?"}
    B -->|"e^u, cos(u), sin(u), cosh(u), sinh(u)"| C["Substituição direta de u = g(x)"]
    B -->|"Fração racional x^k / (1 ± ax^m)"| D["Fatorar x^k e aplicar PG: 1/(1 - u)"]
    C --> E["Organizar potências e sinais (-1)^n"]
    D --> E
    E --> F["Indicar o Raio de Convergência R"]
```

### Checklist de Execução:
1. Isole potências externas multiplicando a fração: $f(x) = x^k \cdot \left(\frac{1}{1 \pm a x^m}\right)$.
2. Troque a variável $u$ na série fundamental correspondente.
3. Distribua potências de $x$: $x^k \cdot x^{mn} = x^{mn+k}$.
4. Escreva tanto a forma somatório ($\sum$) quanto os primeiros 3 a 4 termos abertos.

---

## 📌 Tipo 3: Integração Termo a Termo e Série Numérica (Q5)

```mermaid
graph TD
    A["Função no integrando f(x)"] --> B["Expandir f(x) em Série de Potências"]
    B --> C["Integrar monômio por monômio: int x^k dx = x^{k+1}/(k+1)"]
    C --> D["Somar constante C para a Primitiva Geral"]
    D --> E["Para integral definida [0, 1]: substituir x = 1 e subtrair x = 0"]
    E --> F["Resultado: Série Numérica pura (sem x)"]
```

---

## 📌 Tipo 4: Avaliação Numérica com Erro Menor que $\varepsilon$ (Q6)

```mermaid
graph TD
    A["Integral Definida"] --> B["Obter Série Alternada: sum (-1)^n b_n"]
    B --> C["Calcular termos b_0, b_1, b_2, b_3, ..."]
    C --> D{"b_n < erro?"}
    D -->|"Não"| C
    D -->|"Sim! (índice k)"| E["Truncar a soma: S ≈ b_0 - b_1 + ... ± b_{k-1}"]
    E --> F["Somar as frações para obter o valor aproximado"]
```

---

## 📌 Tipo 5: Achar a Função Oculta de uma Série (Q7)

```mermaid
graph TD
    A["Série sum (-1)^n (an + b) x^k"] --> B["Abrir primeiros termos numéricos"]
    B --> C["Integrar termo a termo para eliminar coeficientes"]
    C --> D["Identificar a PG infinita e aplicar S = a1 / (1 - q)"]
    D --> E["Derivar a fração resultante pela Regra do Quociente"]
    E --> F["Resultado: Função algébrica f(x)"]
```

---
> **Navegação Rápida:**  
> [⬅️ Voltar ao README](./README.md) | [📘 Resumo Teórico](./calculo_resumo.md) | [⚡ Macetes Algébricos](./calculo_macetes.md) | [🎯 Roteiro de Resolução](./calculo_roteiro.md) | [📝 Exercícios Resolvidos](./calculo_exercicios.md) | [🔝 Voltar ao Topo](#topo)
