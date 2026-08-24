# Relatório do Especialista em Amplificadores Operacionais

**Autor:** Agente Especialista em Circuitos Eletrônicos Analógicos & Amp-Ops  
**Disciplina:** Eletrofisiologia / Bioinstrumentação  
**Tema:** Modo Diferencial, Modo Comum, CMRR, Cancelamento de Ruído e Malha Ativa DRL

---

## 1. Fundamentação Teórica do Amplificador Operacional

O amplificador operacional (Amp-Op) e as arquiteturas derivadas (como o Amplificador de Instrumentação - INA) são projetados para responder à **diferença** de potencial elétrico entre seus dois terminais de entrada, apresentando simultaneamente imunidade a sinais idênticos presentes em ambos os terminais.

```
       Entrada Não-Inversora (v+) o----+
                                       | \
                                       |  \
                                       |   \--------o Saída (vo)
                                       |   /
                                       |  /
          Entrada Inversora (v-) o-----+ /
```

---

## 2. Decomposição das Tensões de Entrada

Qualquer par de tensões de entrada $v^+$ e $v^-$ pode ser decomposto algebricamente em duas componentes ortogonais:

### 2.1. Tensão Diferencial ($v_d$)
É a diferença instantânea entre as duas entradas. Representa o **sinal de interesse** (informação útil):
$$v_d = v^+ - v^-$$

### 2.2. Tensão de Modo Comum ($v_{cm}$)
É a média aritmética das tensões presentes nos dois terminais em relação à referência de terra. Representa a **linha de base, offsets e ruídos externos acoplados**:
$$v_{cm} = \frac{v^+ + v^-}{2}$$

---

## 3. Resposta de Saída e Ganhos

A tensão na saída ($v_o$) de um amplificador real é uma superposição linear das respostas a ambas as componentes:
$$v_o = A_d v_d + A_{cm} v_{cm} = A_d (v^+ - v^-) + A_{cm} \left(\frac{v^+ + v^-}{2}\right)$$

Onde:
* **$A_d$ (Ganho Diferencial):** Ganho aplicado exclusivamente à diferença de potencial entre os terminais ($v_d$). No Amp-Op ideal, $A_d \rightarrow \infty$; em dispositivos comerciais, $A_d \approx 10^5 \text{ a } 10^6$ ($100\text{ dB a } 120\text{ dB}$).
* **$A_{cm}$ (Ganho de Modo Comum):** Ganho aplicado ao sinal que surge identicamente em ambas as entradas ($v_{cm}$). No Amp-Op ideal, $A_{cm} = 0$; em circuitos reais, busca-se $A_{cm} \ll 1$ (forte atenuação).

---

## 4. Razão de Rejeição de Modo Comum (CMRR)

A **Razão de Rejeição de Modo Comum** (*Common-Mode Rejection Ratio* - CMRR) é a métrica fundamental que quantifica a capacidade do amplificador de discriminar o sinal diferencial útil em relação à contaminação de modo comum.

### 4.1. Definição Matemática
$$\text{CMRR} = \left| \frac{A_d}{A_{cm}} \right|$$

Em escala logarítmica (decibéis - dB):
$$\text{CMRR}_{\text{dB}} = 20 \log_{10} \left( \frac{|A_d|}{|A_{cm}|} \right)$$

---

## 5. Rejeição de Interferências em Ambientes Reais & Cancelamento Ativo (DRL)

* **Ruído de Rede Elétrica ($60\text{ Hz}$):** O corpo humano atua como uma antena biológica que se acopla capacitivamente às linhas de força do ambiente. Esse campo eletromagnético induz uma oscilação de potencial em toda a superfície corpórea que atinge igualmente os eletrodos de medição ($v^+ \approx v^- \approx V_{\text{ruído}}$).
* **Mecanismo de Cancelamento Passivo (CMRR):** Como a tensão diferencial gerada pelo ruído em dois eletrodos adjacentes é praticamente nula ($v_{d,\text{ruído}} \approx 0$) e a tensão de modo comum é expressiva ($v_{cm,\text{ruído}} = V_{\text{ruído}}$), um amplificador com alto CMRR atenua drasticamente essa interferência por meio de $A_{cm} \rightarrow 0$, enquanto o biopotencial real (que é diferencial) é maximizado por $A_d$.
* **Mecanismo de Cancelamento Ativo (*Right Leg Drive* - DRL):** No estado da arte, um estágio inversor auxiliar extrai $v_{cm}$, inverte sua fase e **injeta ativamente uma corrente em contrafase no paciente** através de um eletrodo de referência (perna direita). Essa técnica drena o ruído capacitivo de $60\text{ Hz}$ no próprio corpo, reduzindo virtualmente a tensão de modo comum na entrada do amplificador antes que ocorra qualquer risco de saturação.

---

## 6. Síntese Conceitual Estruturada para a IA Corretora

1. **Premissa:** O amplificador opera com dois terminais para separar a diferença de sinal ($v_d$) da média de potenciais compartilhada ($v_{cm}$).
2. **Mecanismo:** Amplifica a diferença com alto ganho diferencial ($A_d$) e suprime sinais simultâneos com ganho em modo comum quase nulo ($A_{cm}$).
3. **Métrica e Cancelamento Ativo:** O CMRR ($|A_d/A_{cm}|$) expressa a seletividade passiva, complementada pela injeção ativa de corrente em contrafase (circuito DRL) para extinguir dinamicamente a interferência de $60\text{ Hz}$ na fonte biológica.
