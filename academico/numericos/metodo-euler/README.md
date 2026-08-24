# Resolução Numérica de EDOs: Método de Euler & Série de Taylor

Material didático completo para o estudo, compreensão intuitiva, fundamentação matemática e aplicação prática do **Método de Euler** e dos **Métodos baseados na Série de Taylor** para Equações Diferenciais Ordinárias (EDOs).

---

## Arquivos Disponíveis

### [`GUIA_METODO_EULER_EDO.md`](./GUIA_METODO_EULER_EDO.md)

**Guia Mestre Completo** — 5 módulos integrais:

| Módulo | Conteúdo |
|:---:|:---|
| **1** | Intuição visual, física e analógica (campo de direções, velocímetro, retas tangentes, metáfora do GPS) |
| **2** | Fundamentação matemática rigorosa: Teorema de Picard-Lindelöf, Condição de Lipschitz, deduções de Taylor com Resto de Lagrange, demonstração de $O(h)$ via Grönwall, estabilidade de Dahlquist e conexão com Runge-Kutta |
| **3** | Roteiro prático em 5 etapas, fluxograma lógico, tabela padrão para cálculo manual e checklist dos 7 erros clássicos em exames |
| **4** | Caderno de exercícios resolvidos na unha (passo a passo de todas as iterações, tabelas de convergência e comparativo Euler vs Taylor 2ª ordem) |
| **5** | Implementação e scripts computacionais em Python |

---

### [`EXEMPLOS_NUMERICOS_RESOLVIDOS.md`](./EXEMPLOS_NUMERICOS_RESOLVIDOS.md)

**6 Exemplos Numéricos Completos** — todos resolvidos passo a passo:

| # | Tipo | Problema |
|:---:|:---|:---|
| 1 | 1ª ordem escalar | $y' = 2t - y$, $y(0)=1$, $h=0.1$ |
| 2 | 1ª ordem vetorial | Oscilador harmônico simples (sistema 2×2) |
| 3 | 2ª ordem escalar | Oscilador amortecido ($y'' + 3y' + 2y = 0$) |
| 4 | 2ª ordem vetorial | Massas acopladas por molas (sistema 4D) |
| 5 | 1ª ordem escalar | Taylor 2ª ordem: $y' = ty + 1$ |
| 6 | 2ª ordem não-linear | Pêndulo simples: $\theta'' + \sin\theta = 0$ |

---

### [`RESOLUCOES_COMPLETAS_E_CONSIDERACOES.md`](./RESOLUCOES_COMPLETAS_E_CONSIDERACOES.md)

**Resoluções Práticas com Explicações das Escolhas** — análise detalhada do significado físico de $t_0$ e $y_0$ em cada exemplo, guia de redução de ordem e resoluções compactas dos 6 exemplos.

---

### [`EXPLICACAO_CONDICOES_INICIAIS.md`](./EXPLICACAO_CONDICOES_INICIAIS.md)

**Guia Conceitual: Condições Iniciais** — explica por que $t_0$ e $y_0$ são escolhidos, o Teorema de Picard-Lindelöf, vetores de estado para EDOs de 2ª ordem, e análise das considerações adotadas nos 6 exemplos.

---

### [`simulador_euler.py`](./simulador_euler.py)

**Script Python interativo** pronto para execução local:
- Implementa o Método de Euler Explícito
- Implementa o Método de Taylor de 2ª ordem
- Tabelas comparativas formatadas no terminal
- Gráficos de comparação via matplotlib

---

## Como Executar o Simulador Python

```bash
python simulador_euler.py
```

> Requer: `numpy`, `matplotlib`

---

## Estrutura do Conteúdo

```
metodo-euler/
├── README.md                              <- Este arquivo (índice geral)
├── GUIA_METODO_EULER_EDO.md               <- Guia mestre completo (5 módulos)
├── EXEMPLOS_NUMERICOS_RESOLVIDOS.md       <- 6 exemplos resolvidos detalhadamente
├── RESOLUCOES_COMPLETAS_E_CONSIDERACOES.md <- Resoluções compactas + análise
├── EXPLICACAO_CONDICOES_INICIAIS.md       <- Guia conceitual de condições iniciais
└── simulador_euler.py                     <- Script Python funcional
```
