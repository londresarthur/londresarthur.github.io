---
name: git-commit
description: Diretrizes e fluxo obrigatório para operações de commit e sincronização Git no repositório. Garante validações pré-commit, mensagens semânticas (Conventional Commits) e PUSH obrigatório e automático para o repositório remoto sempre que um commit for solicitado.
---

# 🚀 Git Commit & Push Workflow Skill

Esta skill define o protocolo padrão e mandatório para criação de commits e sincronização com o repositório remoto.

---

## ⚡ Regra de Ouro: Push Obrigatório

> [!IMPORTANT]
> **SEMPRE que um commit for solicitado, o `git push` deve ser executado IMEDIATAMENTE após o `git commit`.**
> Nunca deixe commits locais pendentes sem sincronizar com a branch remota (`origin/main` ou branch ativa).

---

## 📋 Fluxo Padrão de Execução de Commit

Sempre que o usuário solicitar commitar alterações, siga rigorosamente a sequência:

### 1. Validação Pré-Commit (Linter & Checagens)
Antes de adicionar arquivos modificados, execute as validações necessárias para assegurar a integridade do código/documentação:
* Se houver arquivos Markdown modificados, execute o linter GFM:
  ```bash
  python .scripts/validate_gfm.py <arquivos-modificados.md>
  ```
* Garanta que não existam erros ou quebras de sintaxe antes de prosseguir.

### 2. Stage Cirúrgico dos Arquivos
Adicione apenas os arquivos relacionados à alteração solicitada:
```bash
git add <arquivos-especificos>
```

### 3. Commit Semântico (Conventional Commits)
Gere mensagens claras, concisas e padronizadas em português, seguindo o formato:
`tipo(escopo): descrição clara da mudança`

**Tipos permitidos:**
* `feat`: Nova funcionalidade, apostila, notas de aula ou módulo didático.
* `fix`: Correção de erro matemático, renderização GFM, ajuste de formatação ou bug.
* `docs`: Atualizações de documentação, READMEs, roteiros de estudo.
* `style`: Ajustes estéticos, identação ou formatação sem alteração de conteúdo.
* `refactor`: Reestruturação ou simplificação de material existente.

```bash
git commit -m "tipo(escopo): mensagem descritiva"
```

### 4. Push Imediato e Mandatório
Sincronize imediatamente com a branch remota:
```bash
git push origin <branch-atual>
```

### 5. Verificação de Integridade Remota
Confirme que a branch local está 100% sincronizada e limpa:
```bash
git status
```
