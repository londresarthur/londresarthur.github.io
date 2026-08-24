---
name: gfm-math-linter
description: Valida e assegura a conformidade estrita de arquivos Markdown (.md) com as especificações oficiais do GitHub Docs (GFM e GitHub Math com MathJax/KaTeX), conforme documentado em https://docs.github.com/pt/get-started/writing-on-github.
---

# GitHub Flavored Markdown & Math (KaTeX/MathJax) Validator Skill

Esta skill aplica as normas e especificações técnicas oficiais publicadas pelo GitHub em:
* [Writing on GitHub - Documentação Oficial](https://docs.github.com/pt/get-started/writing-on-github)
* [Writing mathematical expressions](https://docs.github.com/en/get-started/writing-on-github/working-with-advanced-formatting/writing-mathematical-expressions)
* [Basic writing and formatting syntax](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax)

---

## 📐 Regras Oficiais do GitHub para Expressões Matemáticas

### 1. Fórmulas Inline (na mesma linha de texto ou em itens de lista)
O GitHub suporta duas sintaxes válidas para matemática inline:
* **Sintaxe com Cifrão Simples:** `$expressao$`
  * **Regra Crítica:** NUNCA deixe espaços entre o delimitador e a expressão (ex: `$x = 0$`, nunca com espaços nas extremidades).
* **Sintaxe com Backticks:** `` $`expressao`$ ``
  * **Uso Recomendado:** Quando a fórmula contiver caracteres que colidam com Markdown (colchetes, sublinhados, asteriscos).

---

### 2. Expressões em Bloco (Display Math) e Precedência do CommonMark
O GitHub aceita duas formas para blocos de equações centralizados:
* **Forma A — Delimitadores Isolados:**
  * O bloco deve iniciar em uma nova linha com delimitador duplo isolado e terminar em uma nova linha isolada.
  * **Proibição em Listas:** NUNCA posicione blocos `$$` imediatamente após itens de lista (`*`, `-`, `+`, `1.`). O CommonMark do GitHub mescla o bloco dentro da tag `<li>`, quebrando a renderização. Para listas, use matemática inline `$x = 1$` no próprio item ou converta o item em subtítulo (`####`).
  * **Regra Anti-Colisão de Hífen:** NUNCA inicie uma linha dentro do bloco com hífen e espaço (como `- n`). Escreva sem espaço (`-n`) ou use a Forma B.
* **Forma B — Bloco de Código com identificador math:**
  * Bloco de código com três crases e `math` (imune a qualquer colisão de Markdown):
    ````text
    ```math
    \left( \sum_{k=1}^n a_k b_k \right)^2 \leq \left( \sum_{k=1}^n a_k^2 \right) \left( \sum_{k=1}^n b_k^2 \right)
    ```
    ````

---

### 3. Proibição de Argumentos de Espaçamento com Colchetes em Quebras de Linha (`\\[...\]`)
> [!WARNING]
> **Artefato Crítico de Renderização KaTeX no GitHub:**  
> NUNCA utilize argumentos opcionais de espaçamento em colchetes após quebras de linha em ambientes matemáticos (ex.: `\\[1.2em]`, `\\[6pt]`).  
> **Causa:** O parser CommonMark do GitHub processa `\\[` como escape de caractere antes de entregar a expressão ao KaTeX/MathJax, transformando `\\[1.2em]` no texto literal `\[1.2em]`. Isso destrói a quebra de linha (juntando todas as equações na mesma linha horizontal) e imprime o texto `\[1.2em]` na tela.  
> **Correção Mandatória:** Utilize exclusivamente quebras de linha limpas `\\` sem colchetes:
> ```latex
> % ❌ ERRADO (Gera artefato no GitHub):
> \begin{cases}
> a_0 = \int f(x)dx \\[1.2em]
> a_n = \int f(x)\cos(nx)dx
> \end{cases}
> 
> % ✅ CORRETO:
> \begin{cases}
> a_0 = \int f(x)dx \\
> a_n = \int f(x)\cos(nx)dx
> \end{cases}
> ```

---

### 4. Normas Vetoriais e Barras Duplas (`\lVert` e `\rVert`)
> [!NOTE]
> **Escape de Barra de Tabela:**  
> Nunca use `\|` para representar normas vetoriais em fórmulas Markdown, pois o CommonMark interpreta `\|` como pipe escapado de tabela e o converte para barra simples `$|x|$`.  
> **Uso Obrigatório:** Use sempre `\lVert x \rVert` ou `\left\lVert x \right\rVert`.

---

### 5. Símbolos Especiais e Acentos
* **Acentos em `\text{}`:** O KaTeX do GitHub quebra a renderização com caracteres acentuados dentro de `\text{...}`. Remova os acentos (ex.: use `\text{impar}`, `\text{par}`, `\text{caso contrario}`).
* **Angström:** Use o caractere Unicode direto `Å` ou `\text{Å}`. Nunca use a macro `\AA` desprotegida fora de `\text{}`.
* **Escape de Cifrões:** Em texto, use a tag `<span>$</span>`.

---

### 6. Padrões Vetoriais para SVGs Didáticos no GitHub
Ao gerar gráficos matemáticos em SVG:
1. **Zero Emojis em `<text>`:** Emojis dentro de tags `<text>` do SVG causam sobreposição de caracteres ou caixas de glifo ausente no visualizador do GitHub.
2. **Fontes Cross-Platform:** Use fontes universais `-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif` em vez de fontes locais como `Cambria Math`.
3. **Entidades XML Válidas:** Escape rigorosamente caracteres reservados (`&amp;`, `&lt;`, `&gt;`).

---

### 7. Alertas Oficiais Suportados pelo GitHub
Use exclusivamente os 5 tipos canônicos de alertas:
* `> [!NOTE]`
* `> [!TIP]`
* `> [!IMPORTANT]`
* `> [!WARNING]`
* `> [!CAUTION]`

---

## 🛠️ Como Executar a Validação Pré-Commit:

Execute sempre o validador antes de commitar e dar push:
```bash
python .scripts/validate_gfm.py calculo/2008/teorema_convergencia_fourier.md
```
*(Após a validação, siga a skill `git-commit`, garantindo `git commit` seguido imediatamente de `git push`)*
