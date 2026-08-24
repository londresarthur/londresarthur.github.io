# 🛠️ Guia Prático: Como Adicionar e Analisar Funções Customizadas

> **Quadrante Diátaxis:** How-To Guide (Orientado a Tarefas)  
> **Objetivo:** Ensinar a compilar expressões matemáticas arbitrárias para análise de Fourier no simulador.

---

## 1. Entrada de Fórmulas no Compilador

No campo de texto **$f(x) =$** do painel de controle, digite qualquer expressão matemática suportada.

### Tabela de Sintaxe e Funções Aceitas

| Operação / Função | Sintaxe no Fourier Studio | Exemplo |
| :--- | :--- | :--- |
| **Valor Absoluto** | `abs(x)` | `abs(x)` ou `abs(sin(x))` |
| **Potenciação** | `x^2` ou `x**2` | `x^2 - x` |
| **Exponencial** | `exp(x)` | `exp(-abs(x))` |
| **Trigonométricas** | `sin(x)`, `cos(x)`, `tan(x)` | `sin(3*x) + cos(2*x)` |
| **Raiz Quadrada** | `sqrt(x)` | `sqrt(abs(x))` |
| **Sinal (degrau bipolar)** | `sign(x)` | `sign(x)` |
| **Degrau Unitário (Heaviside)** | `step(x)` ou `heaviside(x)` | `step(x)` |
| **Condicional Ternário** | `x > 0 ? 1 : -1` | `x > 0 && x < 1 ? 1 : 0` |
| **Constantes** | `pi`, `e` | `pi - x` |

---

## 2. Passo a Passo para Plotar uma Nova Função

1. Digite a fórmula desejada no campo de texto (ex: `exp(-abs(x)) * cos(3*x)`).
2. Pressione a tecla **Enter** ou clique no botão **Plotar**.
3. O motor recompilará a função, integrará numericamente os coeficientes de Euler-Fourier via Quadratura de Gauss-Legendre (16 nós) e atualizará imediatamente o gráfico e os relatórios de Parseval.

---

## 3. Configurando Extensões de Meia Onda

Se a sua função estiver definida apenas no semi-intervalo $[0, L]$, use o menu dropdown **Simetria / Meia Onda**:
- **Extensão Par (Cossenos):** Força $f(-x) = f(x)$, zerando todos os coeficientes $b_n = 0$.
- **Extensão Ímpar (Senos):** Força $f(-x) = -f(x)$, zerando todos os coeficientes $a_n = 0$ e $a_0 = 0$.
- **Intervalo Completo $[-L, L]$:** Avaliação direta sem forçar simetrias.
