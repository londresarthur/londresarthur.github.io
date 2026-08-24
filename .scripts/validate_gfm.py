#!/usr/bin/env python3
"""
Validador oficial e rigoroso de GitHub Flavored Markdown (GFM) e GitHub Math (KaTeX/MathJax).
Baseado estritamente nas especificações oficiais do GitHub Docs:
- https://docs.github.com/pt/get-started/writing-on-github
- https://docs.github.com/en/get-started/writing-on-github/working-with-advanced-formatting/writing-mathematical-expressions
- https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax
"""

import sys
import re
from pathlib import Path

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")
if hasattr(sys.stderr, "reconfigure"):
    sys.stderr.reconfigure(encoding="utf-8")

VALID_ALERTS = {"[!NOTE]", "[!TIP]", "[!IMPORTANT]", "[!WARNING]", "[!CAUTION]"}

def validate_gfm_file(filepath: Path) -> list[str]:
    errors = []
    content = filepath.read_text(encoding="utf-8")
    lines = content.splitlines()

    in_code_block = False
    in_math_code_block = False
    in_display_math_block = False
    display_math_start_line = 0
    last_list_item_line = 0
    last_list_item_text = ""

    for i, line in enumerate(lines, 1):
        stripped = line.strip()

        # 1. Rastrear blocos de código ```
        if stripped.startswith("```"):
            if stripped.startswith("```math"):
                in_math_code_block = not in_math_code_block
                in_code_block = in_math_code_block
            else:
                in_code_block = not in_code_block
            continue

        if in_code_block and not in_math_code_block:
            continue

        # Rastrear se a linha anterior era um item de lista
        if not in_display_math_block:
            if stripped.startswith("* ") or stripped.startswith("- ") or stripped.startswith("+ ") or re.match(r"^\d+\.\s", stripped):
                last_list_item_line = i
                last_list_item_text = stripped
            elif stripped != "" and not stripped.startswith("$$"):
                # Linha de texto comum quebra a adjacência com a lista
                last_list_item_line = 0

        # 2. Rastrear blocos de display math $$
        if stripped == "$$":
            in_display_math_block = not in_display_math_block
            if in_display_math_block:
                display_math_start_line = i
                # Checar se o $$ está imediatamente subordinado a um item de lista
                if last_list_item_line > 0 and (i - last_list_item_line <= 2):
                    errors.append(
                        f"Linha {i}: Bloco '$$' imediatamente após o item de lista da linha {last_list_item_line} ('{last_list_item_text[:40]}...'). "
                        f"No GitHub, o CommonMark mescla o '$$' dentro da tag <li> do item de lista, impedindo a renderização do bloco. "
                        f"Solução: Substitua o marcador de lista por um subtítulo ('####') ou use matemática inline ('$...$') dentro do item."
                    )
            continue

        # 3. Se estiver dentro de bloco de display math $$
        if in_display_math_block:
            # 3.1 Checar colisão de sintaxe do CommonMark dentro do $$:
            if stripped.startswith("- "):
                errors.append(
                    f"Linha {i}: Linha dentro de '$$' inicia com '- ' (hífen seguido de espaço). "
                    f"O CommonMark interpretará isso como item de lista não ordenada (bullet point), quebrando o MathJax. "
                    f"Correção: remova o espaço após o sinal de menos (ex: '-n') ou use bloco '```math'."
                )
            if stripped.startswith("* "):
                errors.append(
                    f"Linha {i}: Linha dentro de '$$' inicia com '* ' (asterisco seguido de espaço), que vira lista no CommonMark."
                )
            if stripped.startswith("+ "):
                errors.append(
                    f"Linha {i}: Linha dentro de '$$' inicia com '+ ' (mais seguido de espaço), que vira lista no CommonMark."
                )
            if re.match(r"^\d+\.\s", stripped):
                errors.append(
                    f"Linha {i}: Linha dentro de '$$' inicia com número e ponto ('1. '), que vira lista numerada no CommonMark."
                )
            if stripped.startswith("> "):
                errors.append(
                    f"Linha {i}: Linha dentro de '$$' inicia com '> ' (citação Markdown dentro de bloco math)."
                )

            # 3.2 Checar se fechamento de $$ foi colocado no fim da linha de conteúdo em vez de linha própria
            if "$$" in stripped:
                errors.append(
                    f"Linha {i}: '$$' encontrado na mesma linha que a equação matemática. "
                    f"O delimitador de fechamento '$$' DEVE ficar em sua própria linha isolada."
                )

            # 3.3 Checar macros problemáticas como \AA desprotegido
            if r"\AA" in line and r"\text{\AA}" not in line and r"\text{Å}" not in line:
                errors.append(
                    f"Linha {i}: Macro '\\AA' utilizada fora de '\\text{{...}}'. "
                    f"O KaTeX do GitHub pode renderizar '\\AA' em vermelho como erro de sintaxe. Use 'Å' ou '\\text{{Å}}'."
                )

            # 3.4 Checar acentos dentro de \text{}
            text_accent_matches = re.findall(r"\\text\{[^}]*[áéíóúãõâêîôûçÁÉÍÓÚÃÕÂÊÎÔÛÇ][^}]*\}", line)
            if text_accent_matches:
                for match in text_accent_matches:
                    errors.append(
                        f"Linha {i}: Caractere acentuado dentro de '\\text{{...}}' ({match}). "
                        f"O KaTeX do GitHub quebra a renderização com acentos em \\text{{}}. Remova os acentos."
                    )

            # 3.5 Checar quebra de linha com argumento opcional de espaçamento \\[...\]
            if re.search(r"\\\\\[[^\]]*\]", line):
                errors.append(
                    f"Linha {i}: Quebra de linha com argumento opcional de espaçamento ('\\\\[...\]'). "
                    f"No GitHub Markdown, o parser CommonMark interpreta '\\\\[' como escape de caractere antes de entregar ao KaTeX, "
                    f"fazendo o KaTeX imprimir o texto literal '\\[...\]' e quebrar a separação de linhas. "
                    f"Correção: Use apenas '\\\\' simples sem colchetes ou use bloco '```math'."
                )
            continue

        # 4. Fora de display math: '$$' NÃO pode estar misturado com texto na mesma linha (ex: '1. Item: $$ expr $$')
        clean_outside = re.sub(r"`[^`]+`", "", line)
        if "$$" in clean_outside:
            errors.append(
                f"Linha {i}: Delimitador '$$' misturado com texto na mesma linha. "
                f"No GitHub, '$$' DEVE ficar isolado em sua própria linha. Para equações na mesma linha, use '$...$' simples."
            )

        # 5. Checar alertas oficiais do GitHub
        if stripped.startswith("> [!"):
            alert_match = re.match(r"^>\s*(\[![\w]+\])", stripped)
            if alert_match:
                alert_type = alert_match.group(1).upper()
                if alert_type not in VALID_ALERTS:
                    errors.append(
                        f"Linha {i}: Alerta do GitHub inválido '{alert_type}'. "
                        f"Tipos oficiais suportados: {', '.join(sorted(VALID_ALERTS))}."
                    )

        # 6. Checar links contendo '$' no texto visível [texto](#)
        link_matches = re.findall(r"\[([^\]]*\$[^\]]*)\]\([^\)]+\)", line)
        if link_matches:
            for match in link_matches:
                errors.append(
                    f"Linha {i}: Link Markdown contém '$' no texto visível ({match}). "
                    f"Use texto puro ou Unicode em âncoras/links (ex: a₀/2)."
                )

        # 7. Validar inline math com sintaxe $...$ ou $`...`$
        line_clean = re.sub(r"\$`[^`]+`\$", "__GITHUB_INLINE_BACKTICK_MATH__", line)
        line_clean = re.sub(r"`[^`]+`", "__INLINE_CODE__", line_clean)
        line_clean = re.sub(r"\\\$", "", line_clean)

        parts = line_clean.split("$")
        if len(parts) % 2 == 0:
            errors.append(f"Linha {i}: Delimitador '$' não fechado na mesma linha para fórmula inline.")
        else:
            for idx in range(1, len(parts), 2):
                math_expr = parts[idx]
                if not math_expr.strip():
                    errors.append(f"Linha {i}: Fórmula inline vazia '$$'.")
                    continue
                if math_expr.startswith(" ") or math_expr.endswith(" "):
                    errors.append(
                        f"Linha {i}: Espaço nas extremidades do LaTeX inline '${math_expr}$'. "
                        f"O GitHub exige '$expr$' sem espaços nas bordas."
                    )
                if r"\AA" in math_expr and r"\text{\AA}" not in math_expr and r"\text{Å}" not in math_expr:
                    errors.append(
                        f"Linha {i}: Macro '\\AA' em fórmula inline. Use 'Å' ou '\\text{{Å}}'."
                    )
                if re.search(r"\\\\\[[^\]]*\]", math_expr):
                    errors.append(
                        f"Linha {i}: Quebra de linha com argumento opcional de espaçamento ('\\\\[...\]') em fórmula inline. Use apenas '\\\\' simples."
                    )
                text_accent_matches = re.findall(r"\\text\{[^}]*[áéíóúãõâêîôûçÁÉÍÓÚÃÕÂÊÎÔÛÇ][^}]*\}", math_expr)
                if text_accent_matches:
                    for match in text_accent_matches:
                        errors.append(f"Linha {i}: Caractere acentuado dentro de '\\text{{...}}' ({match}) na fórmula inline.")

    # 8. Checar se algum bloco $$ ficou aberto no fim do arquivo
    if in_display_math_block:
        errors.append(
            f"Fim do arquivo: Bloco de display math '$$' aberto na linha {display_math_start_line} não foi fechado."
        )

    return errors

def main():
    if len(sys.argv) < 2:
        target_dir = Path(".")
        files = list(target_dir.rglob("*.md"))
    else:
        files = [Path(p) for p in sys.argv[1:]]

    all_passed = True
    checked_count = 0

    for file in files:
        if any(skip in str(file) for skip in [".system_generated", "node_modules", ".git", ".gemini"]):
            continue
        checked_count += 1
        errors = validate_gfm_file(file)
        if errors:
            all_passed = False
            print(f"\n[ERRO] Problemas em: {file}")
            for err in errors:
                print(f"  * {err}")
        else:
            print(f"[OK] Valido (100% GFM Oficial): {file}")

    if not all_passed:
        print(f"\n[FALHA] Foram encontrados erros de compatibilidade com a documentacao oficial do GitHub.")
        sys.exit(1)
    else:
        print(f"\n[SUCESSO] Todos os {checked_count} arquivos Markdown estao 100% compativeis com as especificacoes oficiais do GitHub Docs!")

if __name__ == "__main__":
    main()
