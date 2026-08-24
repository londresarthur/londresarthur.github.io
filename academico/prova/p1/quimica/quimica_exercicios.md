<a id="topo"></a>

---
> **Navegação Rápida:**  
> [⬅️ Voltar ao README](../README.md) | [📘 Resumo Teórico](./quimica_resumo.md) | [🎯 Roteiro de Resolução](./quimica_roteiro.md) | [📝 Lista de Exercícios](./quimica_exercicios.md) | [🚨 Plano de Emergência](../plano_estudos_emergencia.md)
---

# Lista de Exercícios Resolvidos: Química de Semicondutores (Lista 01)

> [!NOTE]
> **Material Didático de Resolução Completa:** Resoluções detalhadas dos exercícios de Oxidação, Polimento Químico-Mecânico (CMP), Balanceamento Redox e Eletrodeposição de Cobre.

---

## Exercício 1: Espessura de Silício Consumido na Oxidação Seca

**Enunciado:** Em um processo de oxidação seca descrito pela reação $\text{Si} + \text{O}_2 \to \text{SiO}_2$, foi crescida uma camada de $\text{SiO}_2$ com $25\text{ nm}$ de espessura. Obtenha a espessura do silício consumido ($x_{\text{Si}}$), sabendo-se que:
- Densidade do $\text{SiO}_2$: $d_{\text{SiO}_2} = 2{,}65\text{ g/cm}^3$
- Densidade atômica do Silício: $NV_{\text{Si}} = 5 \times 10^{22}\text{ átomos/cm}^3$
- Massa molar do Silício: $M_{\text{Si}} = 28{,}08\text{ g/mol}$
- Massa molar do $\text{SiO}_2$: $M_{\text{SiO}_2} = 60{,}08\text{ g/mol}$
- Número de Avogadro: $N_A = 6{,}022 \times 10^{23}\text{ átomos/mol}$

---

### **Resolução Passo a Passo:**

1. **Consideração de Área Unitária ($A = 1\text{ cm}^2$):**
   - Espessura de $\text{SiO}_2$ formada: $x_{\text{SiO}_2} = 25\text{ nm} = 25 \times 10^{-7}\text{ cm}$.
   - Volume de $\text{SiO}_2$ formado: $V_{\text{SiO}_2} = A \cdot x_{\text{SiO}_2} = 1\text{ cm}^2 \times 25 \times 10^{-7}\text{ cm} = 25 \times 10^{-7}\text{ cm}^3$.

2. **Cálculo da Massa de $\text{SiO}_2$ Formada:**

$$
m_{\text{SiO}_2} = d_{\text{SiO}_2} \cdot V_{\text{SiO}_2} = 2{,}65\text{ g/cm}^3 \times 25 \times 10^{-7}\text{ cm}^3 = 6{,}625 \times 10^{-6}\text{ g}
$$

3. **Cálculo do Número de Mols e Átomos de Silício Requeridos:**
   Pela estequiometria $\text{Si} + \text{O}_2 \to \text{SiO}_2$, $1\text{ mol}$ de $\text{SiO}_2$ contém exatamente $1\text{ mol}$ de átomos de $\text{Si}$.
   - Mols de $\text{SiO}_2$: $n = \frac{m_{\text{SiO}_2}}{M_{\text{SiO}_2}} = \frac{6{,}625 \times 10^{-6}\text{ g}}{60{,}08\text{ g/mol}} = 1{,}1027 \times 10^{-7}\text{ mol}$.
   - Número total de átomos de $\text{Si}$ consumidos:

$$
N_{\text{atomos}(\text{Si})} = n \cdot N_A = 1{,}1027 \times 10^{-7}\text{ mol} \times 6{,}022 \times 10^{23}\text{ atomos/mol} = 6{,}6404 \times 10^{16}\text{ atomos}
$$

4. **Cálculo da Espessura de Silício Consumido ($x_{\text{Si}}$):**
   Sabendo que $NV_{\text{Si}} = 5 \times 10^{22}\text{ atomos/cm}^3$:

$$
V_{\text{Si}} = \frac{N_{\text{atomos}(\text{Si})}}{NV_{\text{Si}}} = \frac{6{,}6404 \times 10^{16}\text{ atomos}}{5 \times 10^{22}\text{ atomos/cm}^3} = 1{,}32808 \times 10^{-6}\text{ cm}^3
$$

   Como $V_{\text{Si}} = A \cdot x_{\text{Si}}$ (com $A = 1\text{ cm}^2$):

$$
x_{\text{Si}} = 1{,}32808 \times 10^{-6}\text{ cm} = 13{,}2808\text{ nm}
$$

> [!IMPORTANT]
> **Resposta:** A espessura do silício consumido é de aproximadamente **$13{,}28\text{ nm}$** (representando cerca de $53{,}1\%$ da espessura total do óxido de $\text{SiO}_2$ formado).

> [!NOTE]
> ### 📋 Legenda de Símbolos e Análise Dimensional do Exercício 1
> 
> | Símbolo | Nome da Grandeza | Valor / Unidade Utilizada | Dimensão Física ($[M, L, T, N]$) |
> | :--- | :--- | :--- | :--- |
> | **$x_{\text{Si}}$** | Espessura de Silício consumido | **$13{,}28\text{ nm}$** ($1{,}328 \times 10^{-6}\text{ cm}$) | $[L]$ (Comprimento) |
> | **$x_{\text{SiO}_2}$** | Espessura de $\text{SiO}_2$ crescida | **$25\text{ nm}$** ($2{,}5 \times 10^{-6}\text{ cm}$) | $[L]$ (Comprimento) |
> | **$d_{\text{SiO}_2}$** | Densidade do $\text{SiO}_2$ | **$2{,}65\text{ g/cm}^3$** | $[M \cdot L^{-3}]$ (Massa / Volume) |
> | **$NV_{\text{Si}}$** | Densidade atômica do $\text{Si}$ | **$5 \times 10^{22}\text{ atomos/cm}^3$** | $[L^{-3}]$ (Volume inverso) |
> | **$M_{\text{SiO}_2}$** | Massa molar do $\text{SiO}_2$ | **$60{,}08\text{ g/mol}$** | $[M \cdot N^{-1}]$ (Massa / Quant. Matéria) |
> | **$M_{\text{Si}}$** | Massa molar do $\text{Si}$ | **$28{,}08\text{ g/mol}$** | $[M \cdot N^{-1}]$ (Massa / Quant. Matéria) |
> | **$N_A$** | Número de Avogadro | **$6{,}022 \times 10^{23}\text{ atomos/mol}$** | $[N^{-1}]$ (Quantidade de Matéria inversa) |
> | **$A$** | Área da lâmina considerada | **$1\text{ cm}^2$** | $[L^2]$ (Área) |
> 
> **Verificação de Consistência Dimensional:**

$$
\text{Dimensao}[x_{\text{Si}}] = \frac{[\text{g/cm}^3] \cdot [\text{atomos/mol}] \cdot [\text{cm}]}{[\text{g/mol}] \cdot [\text{atomos/cm}^3]} = \frac{\frac{\text{g} \cdot \text{cm}}{\text{cm}^3 \cdot \text{mol}}}{\frac{\text{g}}{\text{mol} \cdot \text{cm}^3}} = [\text{cm}] \quad \checkmark
$$

---

## Exercício 2: Processo Damasceno Dual e CMP no Cobre

**Enunciado:** Explique o processo Damasceno dual de polimento químico-mecânico (CMP) em superfícies de cobre destacando os mecanismos mecânico e químico do processo.

---

### **Resolução Didática:**

O **Processo Dual Damascene** é a técnica utilizada para fabricar as linhas de interconexão metálica de Cobre em circuitos integrados avançados. Como o Cobre não pode ser facilmente gravado por plasma (*reactive ion etching*), a técnica cria primeiro as cavidades (vias e trincheiras) no dielétrico isolante, preenche-as com Cobre e depois remove o excesso da superfície via **Polimento Químico-Mecânico (CMP)**.

#### **Mecanismos do CMP:**

1. **Mecanismo Químico:**
   - A pasta de polimento (*slurry*) contém um **agente oxidante** (como $\text{H}_2\text{O}_2$) e um **meio ácido/complexante**.
   - O oxigênio reage com a superfície do cobre metálico denso ($\text{Cu}^0$), oxidando-o para íons $\text{Cu}^{2+}$ e formando uma película superficial passivada e macia de óxido/hidróxido de cobre.

2. **Mecanismo Mecânico:**
   - A pasta contém **nanopartículas abrasivas** (como sílica $\text{SiO}_2$ ou alumina $\text{Al}_2\text{O}_3$) suspensas.
   - Um feltro de polimento macio e rotativo pressiona a lâmina. As partículas abrasivas desgastam e removem por fricção a camada macia de óxido recém-formada.
   - A remoção mecânica ocorre preferencialmente nas regiões salientes (topografia alta). Assim que o óxido é removido mecanicamente, o agente químico oxida a nova camada exposta, repetindo o ciclo até que toda a superfície fique perfeitamente plana e nivelada com o dielétrico.

---

## Exercício 3: Balanceamento Redox da Reação de Polimento/Etching

**Enunciado:** Sabendo-se que foi feito um processo Damasceno dual utilizando uma pasta amolecedora contendo $10\%$ em peso de sílica e $3\%$ em peso de água oxigenada ($\text{H}_2\text{O}_2$) em solução de ácido fraco de acordo com a reação química:

$$
\text{Cu} + x \text{H}_2\text{O}_2 + y \text{H}^+ \to \text{Cu}^{2+} + z \text{H}_2\text{O}
$$

Faça o balanceamento dos índices estequiométricos ($x, y, z$).

---

### **Resolução Passo a Passo pelo Método Íon-Elétron:**

1. **Identificação dos estados de oxidação:**
   - Cobre metálico: $\text{Cu}^0 \to \text{Cu}^{2+}$ (Oxidação: perde 2 elétrons).
   - Peróxido de hidrogênio: O oxigênio no $\text{H}_2\text{O}_2$ tem NOX $-1$ e passa a NOX $-2$ na água $\text{H}_2\text{O}$ (Redução: ganha elétrons).

2. **Semi-reação de Oxidação (Cobre):**

$$
\text{Cu} \to \text{Cu}^{2+} + 2e^-
$$

3. **Semi-reação de Redução (Água Oxigenada em Meio Ácido):**

$$
\text{H}_2\text{O}_2 + 2\text{H}^+ + 2e^- \to 2 \text{H}_2\text{O}
$$

4. **Somatório das Semi-reações (Cancelamento dos elétrons $2e^-$):**

$$
(\text{Cu} \to \text{Cu}^{2+} + 2e^-) + (\text{H}_2\text{O}_2 + 2\text{H}^+ + 2e^- \to 2 \text{H}_2\text{O})
$$

$$
\text{Cu} + \text{H}_2\text{O}_2 + 2\text{H}^+ \to \text{Cu}^{2+} + 2 \text{H}_2\text{O}
$$

5. **Identificação dos Índices Estequiométricos:**
   - $x = 1$ (coeficiente do $\text{H}_2\text{O}_2$)
   - $y = 2$ (coeficiente do $\text{H}^+$)
   - $z = 2$ (coeficiente da $\text{H}_2\text{O}$)

> [!IMPORTANT]
> **Resposta:** A equação balanceada é **$\text{Cu} + 1 \text{H}_2\text{O}_2 + 2 \text{H}^+ \to \text{Cu}^{2+} + 2 \text{H}_2\text{O}$**, logo $x = 1, y = 2, z = 2$.

---

## Exercício 4: Cálculo Eletroquímico da Deposição de Cobre

**Enunciado:** Dado o sistema eletroquímico com dois eletrodos tendo como eletrólito solução $0{,}3\text{ M } \text{CuSO}_4$.  
Dados: $M_{\text{Cu}} = 63{,}55\text{ g/mol}$, $N_A = 6{,}022 \times 10^{23}\text{ atomos/mol}$, $q = 1{,}602 \times 10^{-19}\text{ C}$, $n = 2$.  
Corrente elétrica constante $I = 600\ \mu\text{A} = 600 \times 10^{-6}\text{ A}$. Eletrodo de aço polido com área de $A = 1\text{ cm}^2$.

---

### **(a) Determine a massa depositada em gramas após $t = 10\text{ min}$.**

#### **Resolução:**
1. **Conversão de unidades:**
   - Tempo em segundos: $t = 10\text{ min} \times 60\text{ s/min} = 600\text{ s}$.
   - Corrente em Amperes: $I = 600 \times 10^{-6}\text{ A} = 6{,}0 \times 10^{-4}\text{ A}$.

2. **Cálculo da Constante de Faraday ($F$):**

$$
F = q \cdot N_A = 1{,}602 \times 10^{-19}\text{ C} \times 6{,}022 \times 10^{23}\text{ /mol} = 96.472{,}44\text{ C/mol}
$$

3. **Cálculo da Carga Elétrica Total ($Q$):**

$$
Q = I \cdot t = (6{,}0 \times 10^{-4}\text{ A}) \times 600\text{ s} = 0{,}36\text{ C}
$$

4. **Aplicação da 1ª Lei de Faraday:**

$$
m = \frac{M_{\text{Cu}} \cdot Q}{n \cdot F} = \frac{63{,}55\text{ g/mol} \times 0{,}36\text{ C}}{2 \times 96.472{,}44\text{ C/mol}}
$$

$$
m = \frac{22{,}878}{192.944{,}88} = 1{,}1857 \times 10^{-4}\text{ g}
$$

> [!IMPORTANT]
> **Resposta (a):** A massa de cobre depositada é de **$1{,}1857 \times 10^{-4}\text{ g}$** (ou aproximadamente $0{,}1186\text{ mg}$).

---

### **(b) Determine a taxa de deposição em $\text{nm/s}$ sabendo que a densidade do cobre depositado é $d = 8{,}95\text{ g/cm}^3$.**

#### **Resolução:**

1. **Cálculo do Volume de Cobre Depositado ($V$):**

$$
V = \frac{m}{d} = \frac{1{,}1857 \times 10^{-4}\text{ g}}{8{,}95\text{ g/cm}^3} = 1{,}3248 \times 10^{-5}\text{ cm}^3
$$

2. **Cálculo da Espessura da Camada ($\Delta x$):**
   Como a área do eletrodo é $A = 1\text{ cm}^2$:

$$
\Delta x = \frac{V}{A} = \frac{1{,}3248 \times 10^{-5}\text{ cm}^3}{1\text{ cm}^2} = 1{,}3248 \times 10^{-5}\text{ cm}
$$

   Convertendo para nanômetros ($1\text{ cm} = 10^7\text{ nm}$):

$$
\Delta x = 1{,}3248 \times 10^{-5} \times 10^7\text{ nm} = 132{,}48\text{ nm}
$$

3. **Cálculo da Taxa de Deposição ($v_{\text{dep}}$):**

$$
v_{\text{dep}} = \frac{\Delta x}{t} = \frac{132{,}48\text{ nm}}{600\text{ s}} = 0{,}2208\text{ nm/s}
$$

> [!IMPORTANT]
> **Resposta (b):** A taxa de deposição de cobre é de **$0{,}2208\text{ nm/s}$**.

---

## Exercício 5: Etapas do Processo de Eletrodeposição Dual Damascene

**Enunciado:** Explique passo a passo de forma sucinta como é feita a eletroposição de cobre utilizando o processo Damasceno dual.

---

### **Resolução Passo a Passo:**

1. **Corrosão/Abertura dos Moldes (*Etching*):** Abertura de vias e trincheiras na camada dielétrica de óxido via fotolitografia e corrosão seca por plasma.
2. **Deposição de Barreira (*Barrier Layer*):** Deposição de uma camada ultra-fina de Nitreto de Tântalo / Tântalo ($\text{TaN}/\text{Ta}$) para evitar que o Cobre se difunda para o Silício (o que destruiria os transistores).
3. **Deposição da Camada Semente (*Seed Layer*):** Deposição de uma fina camada de Cobre por PVD (Deposição Física de Vapor) para conferir condutividade elétrica à superfície.
4. **Eletrodeposição de Cobre (ECD / *Electroplating*):** Imersão em banho eletrolítico com $\text{CuSO}_4$, $\text{H}_2\text{SO}_4$ e aditivos químicos (aceleradores, supressores e niveladores). Aplica-se corrente contínua para preencher as cavidades de baixo para cima sem formar vazios (efeito *superfilling* ou *bottom-up filling*).
5. **Polimento Químico-Mecânico (CMP):** Remoção do excesso de cobre (*overfill*) e da barreira por polimento químico-mecânico, isolando as interconexões condutoras perfeitamente niveladas na lâmina.

---
> **Navegação Rápida:**  
> [⬅️ Voltar ao README](../README.md) | [📘 Resumo Teórico](./quimica_resumo.md) | [🎯 Roteiro de Resolução](./quimica_roteiro.md) | [📝 Lista de Exercícios](./quimica_exercicios.md) | [🔝 Voltar ao Topo](#topo)
