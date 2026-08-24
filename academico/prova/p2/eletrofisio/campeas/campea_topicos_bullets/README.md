# 🥈 CAMPEÃ EM TÓPICOS (Bullet Points)

> [!TIP]
> **Classificação:** Vencedora na Categoria Tópicos Estruturados  
> **Nota na Triangulação:** **100% no Claude** e **100% no GPT**  
> **Contagem Oficial de Palavras:** **162 palavras** (Teto: $\le 175$ palavras)  
> **Formato:** Tópicos Estruturados (Renderização Direta GFM + LaTeX)  
> **Diferencial Técnico:** Resposta-gabarito máxima consagrada pelo Claude com 100% de nota, incluindo INA, CMRR em dB, DRL e derivações nominais completas.

---

## 📝 Resposta-Gabarito Pronta para a Prova

* **Amplificador Operacional e Cancelamento Ativo:** A captação de ECG utiliza amplificadores de instrumentação (INA) que amplificam a pequena diferença bioelétrica entre eletrodos ($v_d = v^+ - v^-$) com alto ganho diferencial ($A_d$), atenuando o modo comum com ganho quase nulo ($A_{cm}$) e alto CMRR ($\text{CMRR}_{\text{dB}} = 20\log_{10}|A_d/A_{cm}|$). Essa proteção é complementada pelo circuito *Right Leg Drive* (DRL), que capta o modo comum e reinjeta corrente em contrafase no paciente, reduzindo ativamente o ruído de $60\text{ Hz}$ no corpo antes da amplificação.

* **Geometria Multiangular no ECG:** A atividade cardíaca gera no tórax um dipolo elétrico vetorial tridimensional $\vec{p}(t)$. Cada derivação atua como eixo que registra a projeção escalar ($\vec{p} \cdot \vec{u} = \|\vec{p}\|\cos\theta$) desse vetor, tendo projeção nula em componentes perpendiculares ($\cos 90^\circ = 0$). Múltiplos ângulos no plano frontal (Einthoven D1–D3, Goldberger aVR, aVL, aVF) e horizontal (precordiais de Wilson V1–V6) fornecem perspectivas anatômicas que caracterizam com alta fidelidade a orientação e a evolução espacial do vetor cardíaco.

---

## 🎯 Por Que Esta é a Campeã em Tópicos?

1. **Gabarito Oficial do Claude (100%):** O Claude identificou esta resposta como o gabarito de referência perfeito pela presença do termo INA, CMRR em decibéis e todas as derivações nominais.
2. **Calibração de Rigor Físico do GPT (100%):** Ajustada para explicitar que o DRL atua *reduzindo o ruído no corpo antes da amplificação* e que componentes ortogonais *têm projeção nula ($\cos 90^\circ = 0$)* sobre aquele eixo.
3. **Divisão Visual Ótima:** Separa claramente o bloco de instrumentação eletrônica do bloco de geometria biofísica.

---

## 📊 Métricas e Termos-Gatilho

| Parâmetro | Valor |
| :--- | :--- |
| **Total de Palavras** | **162 palavras** |
| **Margem de Segurança** | 13 palavras abaixo do teto de 175 |
| **Gatilhos de Bioinstrumentação** | `INA`, `$v_d = v^+ - v^-$`, `$A_d$`, `$A_{cm}$`, `$\text{CMRR}_{\text{dB}} = 20\log_{10}|A_d/A_{cm}|$`, `Right Leg Drive (DRL)`, `$60\text{ Hz}$` |
| **Gatilhos de Geometria do ECG** | `$\vec{p}(t)$`, `$\vec{p} \cdot \vec{u} = \|\vec{p}\|\cos\theta$`, `$\cos 90^\circ = 0$`, `Einthoven D1–D3`, `Goldberger aVR, aVL, aVF`, `Wilson V1–V6` |
