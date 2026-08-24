---
name: didactic-content-creator
description: Metodologia e padrões de produção de conteúdo didático de excelência acadêmica no padrão USP, 100% aderente ao GitHub Docs (https://docs.github.com/pt/get-started/writing-on-github). Exige concisão, rastreabilidade matemática total (justificativa de cada passagem e explicitação de substituições audazes), intuição física profunda, tabelas de grandezas e conformidade com GitHub Flavored Markdown (GFM).
---

# 🎓 Didactic Content Creator Skill

Esta skill define as diretrizes pedagógicas e técnicas para a criação de materiais didáticos (apostilas, notas de aula, resumos executivos e guias de estudo) de alta retenção cognitiva no padrão acadêmico da USP, respeitando integralmente as especificações de [Writing on GitHub](https://docs.github.com/pt/get-started/writing-on-github).

---

## 🏛️ 1. Princípios Pedagógicos Centrais

### 1.1 Concisão com Densidade de Informação (Zero Prolixidade)
* Seja estritamente sucinto e direto ao ponto. Elimine frases vazias ou enrolações introdutórias.
* Prefira frases ativas, estruturas em tópicos e tabelas comparativas que transmitam o máximo de conceito no menor tempo de leitura.

### 1.2 Rastreabilidade Total e Justificativa de Passagens (Sem "Fórmulas Mágicas")
* **Nenhuma expressão surge do nada:** Conecte cada fórmula ao seu ponto de partida (definição fundamental, lei de conservação ou princípio físico).
* **Explicitação de Substituições Audazes:** Sempre que uma demonstração exigir um truque algébrico, mudança de variável não trivial, linearização por Taylor (ex: $\sinh(u) \approx u$ para $u \ll 1$) ou simplificação de fronteira:
  1. **Nomeie a manobra:** Identifique o que está sendo feito.
  2. **Declare a condição de validade:** Explique sob quais condições físicas essa substituição é legítima.
* **Estrutura de Demonstração em 3 Tempos:**
  1. *Ponto de Partida:* Equação fundamental / Definição física.
  2. *A Manobra / Substituição:* A justificativa clara e concisa da mudança.
  3. *Resultado Obtido:* A nova equação acompanhada do seu significado físico imediato.

### 1.3 Intuição Antes da Fórmula (Intuition-First)
* Contextualize o *problema físico real* que motivou a criação do modelo antes de apresentar o formalismo.

### 1.4 Dicionário Interdisciplinar
* Conecte a linguagem molecular da **Química** com os conceitos de campo da **Física** e a modelagem da **Engenharia Elétrica/Computação**.

---

## 📐 2. Regras Estritas de Formatação GitHub Docs

Conforme as especificações de [Writing mathematical expressions no GitHub](https://docs.github.com/en/get-started/writing-on-github/working-with-advanced-formatting/writing-mathematical-expressions):

1. **Equações em Listas Numeradas ou Texto Corrido:**
   * NUNCA utilize blocos de display math (`$$`) imediatamente após itens de lista (`*`, `-`, `+`, `1.`).
   * Use **matemática inline** `$x = 1$` ou `` $`x = 1`$ `` para fórmulas dentro de listas.
   * Se a equação for longa, use subtítulo (`#### Passo:`) seguido de bloco `$$` isolado ou use bloco de código `math`.

2. **Equações em Bloco e Precedência CommonMark:**
   * Delimitadores de bloco devem estar em linhas isoladas, com linhas em branco antes e depois.
   * NUNCA inicie uma linha dentro do bloco com hífen e espaço (como `- n`). Escreva sem espaço (`-n`) ou use bloco de código `math`.

3. **Proibição de Argumentos de Quebra com Colchetes (`\\[...\\]`):**
   * NUNCA use `\\[1.2em]` ou qualquer argumento com colchetes após quebras de linha em blocos matemáticos (`cases`, `aligned`, `matrix`).
   * O CommonMark trata `\\[` como escape, fazendo o KaTeX imprimir o texto `\[1.2em]` e quebrar a separação de linhas.
   * Use exclusivamente `\\` simples.

4. **Símbolos Especiais e Acentos:**
   * Use sempre `Å` ou `\text{Å}` para Angström. Nunca use a macro `\AA` solta.
   * Nunca utilize acentos dentro de `\text{...}` no KaTeX (ex: use `\text{impar}`, `\text{par}`).

5. **Colchetes e Concentrações Químicas:**
   * Nunca deixe colchetes de concentração com sobrescritos soltos no Markdown (ex.: `[Zn²⁺]`), pois o parser pode interpretar como link Markdown quebrado. Use sempre `$[\text{Zn}^{2+}]$`.

6. **Alertas Oficiais:**
   * Use apenas `> [!NOTE]`, `> [!TIP]`, `> [!IMPORTANT]`, `> [!WARNING]`, `> [!CAUTION]`.

---

## 📋 3. Checklist de Qualidade antes de Publicar

- [ ] Todas as passagens algébricas e substituições não óbvias estão explicadas e justificadas.
- [ ] Nenhum bloco `$$` está subordinado diretamente a itens de lista (`*` ou `1.`).
- [ ] Nenhuma linha de display math inicia com hífen e espaço (`- `).
- [ ] Nenhuma quebra de linha matemática contém colchetes com argumentos opcionais (`\\[...\\]`).
- [ ] Nenhum `\text{}` contém caracteres acentuados.
- [ ] O símbolo de Angström está em Unicode `Å` ou `\text{Å}`.
- [ ] O script de validação `.scripts/validate_gfm.py` foi executado e retornou SUCESSO.
- [ ] Os símbolos possuem legenda explícita com suas respectivas grandezas e unidades.
- [ ] Há pelo menos 1 diagrama Mermaid ilustrando o fluxo ou arquitetura do conceito.
