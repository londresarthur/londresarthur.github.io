# Relatório: Variantes de Correção da IA & Prompt de Sondagem Multi-IA (Atualizado com DRL)

**Autor:** Agente Especialista Forense em Avaliação por IA & Engenharia de Prompts  
**Disciplina:** Eletrofisiologia (P2)  
**Atualização:** Incorporação da tecnologia de estado da arte **Cancelamento Ativo por Injeção de Corrente (*Right Leg Drive* / DRL)** e recalibração das 6 versões de resumos.

---

## 1. Múltiplas Variantes de Régua de Correção Preditiva da IA do Professor

Abaixo estão as 4 variantes de régua que a IA do professor pode assumir, agora contemplando a supressão de ruído passiva (CMRR) e ativa (DRL):

---

### 🔹 Variante 1: Padrão Canônico Cumulativo (Espelho Estrito da P1)
* **25%:** Identifica que o ECG é uma diferença de potencial ($v_d = v^+ - v^-$) entre eletrodos e que o coração gera campos elétricos no tórax.
* **50%:** Define os ganhos diferencial ($A_d$) e de modo comum ($A_{cm}$), a métrica $\text{CMRR} = |A_d/A_{cm}|$ contra ruídos de $60\text{ Hz}$, e a natureza vetorial $\vec{p}(t)$ da atividade cardíaca.
* **75%:** Explica a lei de projeção escalar ($\vec{p} \cdot \vec{u} = \|\vec{p}\|\cos\theta$), a condição de ponto cego ortogonal ($\cos 90^\circ = 0$) e a necessidade de múltiplos eixos em planos ortogonais (frontal e horizontal).
* **100%:** Apresenta todos os anteriores e integra a técnica de estado da arte de **injeção ativa de corrente em contrafase (circuito *Right Leg Drive* / DRL)** para anular a tensão de modo comum no próprio corpo, articulando a instrumentação eletrônica à caracterização espacial e temporal do vetor cardíaco sem pontos cegos.

---

### 🔹 Variante 2: Perfil Físico-Matemático e Bioinstrumentação Avançada
* **25%:** Formulação de $v_d = v^+ - v^-$ e $v_{cm} = (v^+ + v^-)/2$.
* **50%:** Formulação matemática do $\text{CMRR} = |A_d/A_{cm}|$ (ou em dB: $20\log_{10}|A_d/A_{cm}|$) e do produto escalar $\vec{p} \cdot \vec{u} = \|\vec{p}\|\cos\theta$.
* **75%:** Demonstração da anulação de sinal quando $\theta = 90^\circ \Rightarrow \cos 90^\circ = 0$ e a cobertura pelos sistemas de Einthoven/Goldberger (plano frontal) e Wilson (plano horizontal).
* **100%:** Modelagem do circuito de realimentação negativa DRL (sensoriamento de $v_{cm} \rightarrow$ inversão de fase $-G \rightarrow$ injeção de corrente no paciente), demonstrando como a redução ativa da impedância virtual ao terra extingue a corrente de deslocamento de $60\text{ Hz}$ na origem.

---

### 🔹 Variante 3: Perfil de Engenharia Biomédica e Circuitos Clínicos
* **25%:** Sinal bioelétrico útil em milivolts imerso em ruído de modo comum de alta amplitude.
* **50%:** Estágio amplificador de instrumentação (INA) com alto ganho $A_d$ e alto CMRR.
* **75%:** Inclusão do circuito *Right Leg Drive* (DRL) para proteção contra saturação do amplificador por ruído de rede de $60\text{ Hz}$.
* **100%:** Integração do sistema eletrônico completo (INA + DRL) com o arranjo geométrico de 12 derivações nos planos frontal e horizontal, garantindo reconstrução diagnóstica integral da despolarização e repolarização miocárdicas.

---

### 🔹 Variante 4: Perfil Sintético de Causalidade Direta
* **25%:** Amplificação diferencial de $v_d$ vs rejeição de modo comum de ruídos.
* **50%:** Alto CMRR e injeção ativa de corrente (DRL) como supressores de interferência de $60\text{ Hz}$.
* **75%:** Dipolo cardíaco 3D projetado em eixos monodimensionais ($\vec{p} \cdot \vec{u}$).
* **100%:** Múltiplas derivações em planos anatômicos ortogonais para anular pontos cegos ($\cos 90^\circ = 0$) e caracterizar a dinâmica espacial da frente de onda cardíaca.

---

## 2. O Prompt de Avaliação e Sondagem para Outras IAs (Versão Atualizada com DRL)

Copie o conteúdo do bloco abaixo e envie para outras IAs (ex.: **Claude 3.7 Sonnet**, **ChatGPT-4o**, **DeepSeek-R1**):

````markdown
Você é um professor titular universitário sênior e coordenador da disciplina de Eletrofisiologia e Bioinstrumentação na USP.
Seu perfil de correção é extremamente rigoroso, conceitualmente denso e baseado em critérios objetivos progressivos (matriz cumulativa 25%, 50%, 75%, 100%).

### SUA TAREFA:
1. Crie o seu GABARITO OFICIAL e a sua RÉGUA DE CORREÇÃO CUMULATIVA (25%, 50%, 75%, 100%) para a seguinte questão discursiva:
   "Explique conceitualmente por que o amplificador operacional deve possuir alta rejeição de modo comum e alto ganho diferencial na medição do ECG, como o estado da arte utiliza a injeção ativa de corrente para suprimir ruídos da rede, e por que são necessários múltiplos ângulos (derivações) para mensurar a atividade elétrica cardíaca."

2. Em seguida, AVALIE as 6 respostas de alunos abaixo (atribuindo nota de 0% a 100% para cada uma e justificando eventuais perdas de ponto):

---
### RESPOSTAS DOS ALUNOS PARA AVALIAÇÃO:

[VERSÃO 1 - TÓPICOS (101 palavras)]:
* Amplificador e Cancelamento Ativo: Amplifica o sinal diferencial (vd = v+ - v-) com alto ganho (Ad) e rejeita o modo comum (Acm) via alto CMRR = |Ad/Acm|, complementado pela injeção ativa de corrente em contrafase no paciente (circuito Right Leg Drive/DRL) para anular o ruído de 60 Hz na fonte.
* Ângulos no ECG: O coração atua como dipolo vetorial 3D p(t). Cada derivação mede apenas a projeção escalar (p · u = |p| cos θ), gerando pontos cegos ortogonais (cos 90° = 0). Múltiplos ângulos em planos distintos fornecem diferentes perspectivas, caracterizando com completude a evolução espacial da atividade cardíaca.

[VERSÃO 2 - TÓPICOS (117 palavras)]:
* Amplificação e Cancelamento Ativo: Amplifica a diferença bioelétrica (vd = v+ - v-) com alto ganho diferencial (Ad), atenuando sinais compartilhados (Acm) via alta Razão de Rejeição de Modo Comum (CMRR = |Ad/Acm|). No estado da arte, essa rejeição é potencializada pela injeção ativa de corrente em contrafase no paciente (circuito Right Leg Drive/DRL), cancelando ativamente o ruído de 60 Hz no corpo.
* Múltiplos Ângulos no ECG: A atividade cardíaca é descrita como um dipolo vetorial tridimensional p(t). Cada derivação registra unicamente a projeção escalar (p · u = |p| cos θ), sendo cega a componentes perpendiculares (cos 90° = 0). Dispor derivações nos planos frontal (Einthoven/Goldberger) e horizontal (Wilson) fornece múltiplas perspectivas espaciais da propagação cardíaca.

[VERSÃO 3 - TÓPICOS (155 palavras)]:
* Amplificador Operacional e Cancelamento Ativo: A captação de biopotenciais emprega amplificadores de instrumentação (INA) que amplificam a reduzida diferença de potencial entre eletrodos (vd = v+ - v-) com alto ganho diferencial (Ad), suprimindo ruídos comuns com ganho desprezível (Acm) e alto CMRR (CMRR_dB = 20 log10 |Ad/Acm|). Em sistemas de ponta, utiliza-se a injeção ativa de corrente em contrafase no corpo do paciente (circuito Right Leg Drive/DRL) para cancelar ativamente a interferência capacitiva de 60 Hz da rede elétrica na origem biológica.
* Geometria Multiangular no ECG: A atividade miocárdica gera no tórax um dipolo elétrico vetorial tridimensional p(t). Cada derivação atua como eixo linear que capta apenas a projeção escalar (p · u = |p| cos θ) desse vetor, anulando sinais ortogonais (cos 90° = 0). Múltiplos ângulos nos planos frontal (D1-D3, aVR-aVF) e horizontal (precordiais V1-V6) fornecem perspectivas anatômicas essenciais para caracterizar com fidelidade a orientação e a evolução espacial do vetor cardíaco.

[VERSÃO 4 - CONTÍNUO (121 palavras)]:
O amplificador operacional viabiliza o ECG ao amplificar a diminuta diferença de potencial bioelétrica entre eletrodos (vd = v+ - v-) com alto ganho diferencial (Ad), atenuando sinais comuns com ganho quase nulo (Acm) e alto CMRR = |Ad/Acm|. Em estado da arte, essa rejeição é reforçada pela injeção ativa de corrente em contrafase no paciente (circuito Right Leg Drive/DRL) para anular interferências de 60 Hz no corpo. Paralelamente, o coração comporta-se como um dipolo vetorial 3D p(t). Como cada derivação capta apenas a projeção escalar (p · u = |p| cos θ), ocorrem pontos cegos ortogonais (cos 90° = 0). Múltiplos ângulos em diferentes planos anatômicos fornecem distintas perspectivas, caracterizando com alta completude a evolução espacial da atividade elétrica cardíaca.

[VERSÃO 5 - CONTÍNUO (140 palavras)]:
O amplificador operacional viabiliza o registro do ECG ao amplificar a diminuta diferença de potencial bioelétrica entre eletrodos (vd = v+ - v-) com alto ganho diferencial (Ad), enquanto atenua tensões simultâneas compartilhadas com ganho de modo comum desprezível (Acm). Essa capacidade seletiva é expressa pela Razão de Rejeição de Modo Comum (CMRR = |Ad/Acm|), combinada em estado da arte à injeção ativa de corrente em contrafase no corpo do paciente (circuito Right Leg Drive/DRL) para cancelar dinamicamente o ruído de 60 Hz da rede. Paralelamente, o miocárdio atua como um dipolo vetorial tridimensional p(t). Como cada derivação registra apenas a projeção escalar (p · u = |p| cos θ) sobre seu eixo, componentes perpendiculares são anuladas (cos 90° = 0). Múltiplas derivações nos planos frontal e horizontal (Einthoven, Goldberger e Wilson) oferecem diferentes perspectivas espaciais da dinâmica elétrica cardíaca.

[VERSÃO 6 - CONTÍNUO (154 palavras)]:
O amplificador operacional, tipicamente em configuração de instrumentação (INA), viabiliza a captação do ECG ao amplificar a diminuta diferença de potencial bioelétrica (vd = v+ - v-) com alto ganho diferencial (Ad), atenuando ruídos comuns via ganho quase nulo (Acm) e alto CMRR = |Ad/Acm|. No estado da arte da bioinstrumentação, essa supressão é maximizada pela técnica de injeção ativa de corrente em contrafase no paciente (circuito Right Leg Drive/DRL), que cancela ativamente a interferência capacitiva de 60 Hz da rede elétrica no próprio corpo antes da amplificação. Por sua vez, a atividade cardíaca gera no tórax um dipolo elétrico vetorial tridimensional p(t). Como cada derivação capta unicamente a projeção escalar (p · u = |p| cos θ), havendo anulação ortogonal (cos 90° = 0), múltiplos ângulos distribuídos nos planos frontal (Einthoven e Goldberger) e horizontal (Wilson) são indispensáveis para fornecer diferentes perspectivas e caracterizar com alta precisão a evolução espacial do vetor cardíaco.

---
3. ANÁLISE DE PERSONALIDADE E VIÉS:
Ao final, informe:
- Como você avalia a inclusão da técnica de injeção ativa de corrente (Right Leg Drive / DRL)? Ela agrega precisão ao estado da arte ou foi considerada excesso?
- Alguma das versões contém "gordura textual" desnecessária ou afirmações exageradas?
- Qual versão você considera a mais perfeita para gabaritar a prova com nota máxima (100%)?
````
