# 🛠️ Guia Prático: Como Exportar Expressões LaTeX, Imagens e Áudio

> **Quadrante Diátaxis:** How-To Guide (Orientado a Tarefas)  
> **Objetivo:** Ensinar a extrair resultados analíticos em formato LaTeX, exportar capturas gráficas em alta resolução e utilizar o sintetizador de áudio.

---

## 1. Copiar a Fórmula Analítica em LaTeX

Para incluir a série de Fourier truncada diretamente em relatórios, artigos ou provas:

1. No painel **Expressão Analítica Truncada $S_N(x)$**, visualize a fórmula renderizada dinamicamente pelo KaTeX.
2. Clique no botão **Copiar LaTeX** no canto superior direito do painel.
3. O código LaTeX puro da expressão truncada (ex: `S_{10}(x) = 1.571 - 1.273\cos(x) - 0.141\cos(3x) + \cdots`) será copiado para a sua área de transferência com notificação visual.

---

## 2. Exportar Imagem Gráfica em Alta Resolução (PNG)

1. Enquadre o gráfico no nível de zoom e pan desejados usando o mouse ou touch.
2. No cabeçalho superior direito da página, clique no ícone de imagem (**Exportar Imagem PNG**).
3. O navegador baixará automaticamente o arquivo no formato `fourier_[preset]_N[N].png` com resolução HiDPI nítida para uso acadêmico.

---

## 3. Síntese e Ajuste de Áudio Harmônico

1. No cabeçalho superior, clique em **Ouvir Fourier (Áudio)** para ativar a `AudioContext` da Web Audio API.
2. No painel **Sintetizador de Áudio Harmônico**:
   - Ajuste a **Frequência Fundamental** (entre 55 Hz e 880 Hz) para alterar o tom da nota base (padrão: 220 Hz — A3).
   - Ajuste o **Volume** conforme o nível desejado.
3. Altere o número de harmônicos $N$ para escutar a evolução do timbre acústico.
